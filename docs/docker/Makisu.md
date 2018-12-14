---
sidebarDepth: 2
prev: false
next: /cssType/2018-12-13-滚动视差Made-In-CSS
meta:
  - tag: docker
  - tag: tools
---

<!--适用于Mesos和Kubernetes等无特权的集装箱化环境，快速灵活的Docker镜像构建工具。-->
<!-- more -->

# Makisu
## 来自布鲁塞尔最好的寿司
尽管Uber已经退出了中国，但是这跟Uber的软件工程师是一群吃货没有半点关系。Makisu这个词在Google上通篇的搜索结果都是一家很有腔调的寿司店--当然，他们也许希望Docker构建的过程和寿司一样轻量，优雅而且美好。
Makisu的官方介绍是这样的:适用于Mesos和Kubernetes等无特权的集装箱化环境，快速灵活的Docker镜像构建工具。这个工具的诞生旨在解决Uber因为服务需求增长引起的大规模容器构建需求。传统的Docker构建工具，在面对上万次构建和单次构建工件超过10G的情况下开始显得无力，于是Makisu应运而生：

* 便携式和无权限构建设计。
* 分布式缓存设计。
* 镜像大小优化。

## 无特权构建
传统Docker的构建逻辑依赖于写时复制文件系统来确定构建时层之间的差异，并使用写时复制文件系统（CoW）生成图层，这一逻辑需要提升权限才能在构建容器中装入和卸载目录。

<mermaid>
graph LR
A[Docker构建] -- 扫描 --> B(中间层)
E[Makisu]--构建前扫描--> C((内存))
C--构建后扫描-->H(记录差异)
B -->M(记录差异)
M--生成-->D{新层}
H --生成--> D
</mermaid>

Makisu利用内存而非I\O复制来完成图层的创建，通过记录构造前后的文件差异在内存中直接生成新的镜像层。

## 分布式缓存设计

传统的Docker build构建里，缓存的设计方式是由Docker引擎本身控制的，将缓存分层并用Hash序列的方式记录在本地注册表中。然而Docker引擎本身的层划分缺少复杂情况下的智能性--它会将大量构建依赖工具的安装和构建主要工件(通常而言，是代码工件)划分到一起，在工件执行新的commit之后整个hash码变化会使Docker无法复用原本的缓存，构建结构越复杂，缓存命中率越低。
同时，Docker的缓存都是在引擎机本地的，这意味着在分布式集群的Devops下，构建缓存面临着极低的利用率。
Makisu使用键值存储将给定Dockerfile的行映射到Docker注册表中层的摘要上。键值存储可以由Redis或文件系统支持。Makisu还强制执行缓存TTL，确保缓存条目不会变得太陈旧。在Dockerfile的初始构建期间，Makisu生成图层并异步推送到Docker注册表并进行键值存储。然后，共享相同构建步骤的后续构建可以获取和解压缩高速缓存的层，从而防止冗余步骤执行。
<mermaid>
graph LR
A[Docker构建]  --> B(缓存步骤A)
B-->C((后续步骤))
B-->D{Redis}
C-->E(再次调用A)
D--缓存获取-->E
</mermaid>

## 优化镜像大小
为了控制在构建过程中生成的图像层，Makisu使用一个新的可选提交注释 ```＃!COMMIT```， 它指定Dockerfile中的哪些行可以生成新层。这种机制允许减少容器图像大小（因为一些层可能删除或修改先前层添加的文件）。每个已提交的层也会上载到分布式缓存，这意味着它可以由群集中其他计算机上的构建使用。

<mermaid>
graph LR
A[Docker构建]  --上传A--> B{缓存A}
B-->C(其他调用)
B-->D(其他调用)
B-->E(其他调用)
</mermaid>

在Docker Mutli-stage形式的构建中，较大的镜像有时是由中间层创建和删除或更新文件的结果，即使在后续步骤中删除临时文件，它仍会保留在创建层中占用空间。
```
FROM debian:8 AS build_phase
RUN apt-get install wget #!COMMIT
RUN apt-get install go1.10 #!COMMIT
COPY git-repo git-repo
RUN cd git-repo && make

FROM debian:8 AS run_phase
RUN apt-get install wget #!COMMIT
LABEL service-name=test
COPY –from=build_phase git-repo/binary /binary
ENTRYPOINT /binary
```
看一个官方的Dockerfile例子。
在这种情况下，Mutli-stage构建会安装一些构建时需求（wget 和go1.10 ），在每个层中提交它们，然后继续构建服务代码。一旦构建了这些已提交的层，它们就会上载到分布式缓存并可供其他构建使用，从而提供显着的加速。
在第二阶段，构建再次安装wget ，但这次Makisu重用了构建阶段提交的层。最后，从构建阶段复制服务二进制文件，并生成最终镜像。这种方式生成了一个轻量的最终镜像，构建起来更快捷（由于分布式缓存的好处）并占用更少的空间，如下图所示：
![Makisu下的构建](https://img-blog.csdnimg.cn/20181210173342969.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTExNjYyMjU=,size_16,color_FFFFFF,t_70)