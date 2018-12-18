---
sidebarDepth: 2
prev: false
next: /cssType/2018-12-13-滚动视差Made-In-CSS
meta:
  - tag: jenkins
  - tag: devops
---

<!--作为应用度最广的持续化集成开源引擎，Jenkins已经成为了Devops的一种行业标准。-->
<!-- more -->
# Think In Jenkins

## About Devops
**Devops** (Development & Operations)这个概念最早诞生在2009年的欧洲，源起于运维和交付的流程弊端。对项目开发迭代者来说，他们希望能更加快速地更新功能或者性能模块，并且迅速得到生产线上的反馈信息；对项目运维目的而言，他们希望项目能稳定健壮地运行。

在Devops概念诞生之前，开发团队的很大一部分精力都被用在集成阶段。在这个阶段中，每个独立的开发者或者每个团队将他们开发的各个模块集成为一个可以工作的产品。在这个过程中可能会出现几个月的冲突解决。并且各种问题在这个过程中都会出现而且非常难以解决。最终可能导致发布延迟和其它无法预计的损失。

试想一个简单的场景，开发团队同时开发一个产品的多个模块，模块之间有部分交互。开发人员之间需要频繁解决不同提交代码之间的冲突；每一次代码的交付都要执行**开发环境迭代**、**测试环境部署**、**灰度环境部署**、**生产环境部署**的步骤--这可能要花费巨大的时间和精力代价才能确保每一步都正确执行而没有错误。

不幸的是，快速迭代的需求让这些步骤变成了一个常态；开发或者运维人员需要重复地执行这些流程来确保自己的线上项目产品的稳定和活跃。这是一种低效而且繁重的重复劳动，所幸Devops的出现解决了大部分问题。

一个典型的Devops能力环如下：

<mermaid>
graph TD
H(规划) --> A
A(代码) --> B
B(构建) --> C
C(测试) --> D
D(发布) --> E
E(部署) --> F
F(运营) --> G
G(监控) --> H
</mermaid>


DevOps有效地填补了开发端和运维端之间的信息鸿沟，改善了团队之间的协作关系。不过需要澄清的一点是，从开发到运维，中间还有测试环节。DevOps其实包含了三个部分：开发、测试和运维。DevOps希望做到的是软件产品交付过程中IT工具链的打通，使得各个团队减少时间损耗，更加高效地协同工作。

## Devops的硬件要求
我们罗列一下Devops中常用的工具以及每个工具的应用范围，从而可以看见Devops的功能覆盖范围以及工作流程。

* **项目管理(PM)** : Jira、Asana、Taiga、Trello、Basecamp、Pivotal Tracker
* **代码管理(SCM)** : GitHub、GitLab、BitBucket、SubVersion
* **构建工具**: Maven,Gradle,Node,Ant
* **持续集成(CI)**: Bamboo、Hudson、Jenkins
* **自动部署**：Capistrano、CodeDeploy
* **配置管理**: Ansible、Chef、Puppet、SaltStack、ScriptRock GuardRail
* **容器**: Docker、LXC、第三方厂商如AWS
* **编排**: Kubernetes、Core、Apache Mesos、DC/OS
* **服务注册与发现**: Zookeeper、etcd、Consul
* **脚本语言**: python、ruby、shell
* **应用服务器**:Tomcat、JBoss、Node、Nginx
* **测试**：JMeter、Blaze Meter、loader.io

当然列表里只是一部分的常用工具，不难看出里面有很多近几年才兴起的东西。这也从侧方面说明了Devops发展迅速的一个原因，技术的发展使得DevOps有了更多的配合空间。

## What Is Jenkins
从基本需求上来说，Devops的核心执行引擎需要支持**代码仓库集成**、**构建环境集成**、**构建可配置**、**测试集成**和**部署工具集成**。不同的企业对Devops的功能点需求不尽相同，但是从原则上而言，似乎Linux 系统的Shell脚本就可以完成大多数的Devops需求--实际上，早期的Devops的确是通过系统脚本语言来完成的。工程师通过手写Shell或者Power Shell脚本来完成一系列的持续化集成操作。

2004年至2005年，Sun Microsystems开发了一款名为Hudson的工具产品，意在为Devops提供一个统一的管理工具。2011年，由于Hudson和Oracle之间的纠纷，它从Hudson中分离出来，正式更名为Jenkins。作为一个开源项目，Jenkins提供了一种易于使用的持续集成系统，使开发者从繁杂的集成中解脱出来，专注于更为重要的业务逻辑实现上。同时 Jenkins 能实施监控集成中存在的错误，提供详细的日志文件和提醒功能，还为项目构建的趋势和稳定性提供了数据可视化图表形式。

我们不妨从几个方面，来看看Jenkins的优势和成为业界标准之一的缘由。

#### 开源

[Jenkins On GitHub](https://github.com/jenkinsci/jenkins)

Jenkins代码托管在GitHub上，编写代码为Java，通过Stapler框架集成。开源的价值除了便于学习和参考之外，也意味着活跃的贡献者。超过100个团队为Jenkins提供化代码提交，这导致了Jenkins版本以极快的速度迭代--截止2018年底，Jenkins每周推行一个weekly版本，平均一个月发布一个LTS支持版本。

另外，开源也意味着使用者可以fork代码来完成一些定制化的工作，当然前提是学习代价和兼容Jenkins极速的更新速度。

#### 易用
Jenkins的运行环境依赖于JDK，这给予了它良好的跨平台性。通过Servlet容器、docker容器甚至作为由第三方公司托管的软件服务运行，都可以轻松搭建出Jenkins服务。

有别于Travic CI 或者 GitLab CI，Jenkins作为配置型DevOps引擎可以最大程度地避免构建源代码被额外配置入侵。用户可以轻松地在Jenkins上配置并执行自己的CI或CD任务，而不需要在代码源进行额外的文件编写--Jenkins提供的可视化界面和全面的配置任务类型降低了使用者的学习成本，初学者也可以通过阅读界面引导快速配置自己的项目构建。

当然，Jenkins一样提供类似Travic的配置文件型构建方式，这是一种高级的使用方式，文章的后面会对其进行介绍。

#### 高可用集成
Jenkins自身携带了Master-Slave的分布式高可用集成方案，通过Master节点调度来达到构建的负载均衡。
<mermaid>
graph TD
A{Jenkins Master}-->B(Jenkins Slave)
A{Jenkins Master}-->C(Jenkins Slave)
A{Jenkins Master}-->D(Jenkins Slave)
</mermaid>

考虑到Master节点本身面临的风险性，Jenkins提供了完备的Rest API来驱动任务。这为其他项目集成Jenkins提供了通道，也可以更为方便地搭建高可用Jenkins集群。
<mermaid>
graph TD
A{Server}-->B(Jenkins)
A{Server}-->C(Jenkins)
A{Server}-->D(Jenkins)
</mermaid>

#### 插件横向扩展

Jenkins最重要的事情并不一定是它本身。Jenkins本身提供了一种热插拔的插件扩展机制，这为Jenkins的功能拓展提供了无限的可能性。

Jenkins官方和部分社区为Jenkins本身提供了数百个插件,涵盖了所有流行的源代码管理(SCM)系统，包括Git、Subversion、Mercurial和CVS,流行的构建工具，如Maven、Ant、Gulp和Grunt，日志收集处理，远程调度部署如Ansible，以及测试框架和报告生成器。同时，Jenkins插件为Docker和ECS等技术提供了强大的支持，这些技术支持创建和部署基于云的微服务环境，用于测试和生产部署。

2016年，Jenkins发布了“交付管道”支持，使用Groovy领域特定语言(DSL)，他们称为“管道语言”。Groovy的支持补全了Jenkins之前灵活度欠缺的弱点。对于熟悉Jenkins的用户，他们可以用Jenkins完成所有DevOps中的特性和需求。

#### BlueOcean
2016年，同交付管道一起上线的还有Jenkins BlueOcean。作为Jenkins最强大的插件之一，它提供的最大功能莫过于极大地美化了UI界面。
<div align=center>
![dog](./dogSay.png 'dog')
</div>
* 清晰的可视化，对CI/CD pipelines, 可以快速直观的观察项目pipeline状态。
* pipeline可编辑，可视化编辑pipeline，现在只能通过配置中Pipeline的Pipeline script编辑。
* pipeline精确度，通过UI直接介入pipeline的中间问题。
* 集成代码分支和pull请求。

Blue Ocean强化了pipeline工作流的可视化，为构建执行过程的错误定位抓取和日志分析提供了更快的用户体验。

~~这应该是美工团队无法容忍丑陋的界面于是派人学了Java之后的产物。~~

## Jenkins & Docker

参考[Jenkins On Docker Hub](https://github.com/jenkinsci/docker/blob/master/README.md)

尽管Jenkins本身构建自由支持度很高，然而任何构建都是建立在环境之上的。如果需要构建一个maven结构的java项目，可能需要在Jenkins的机器上配置JDK 6~11的版本；如果需要构建vue或者任何webpack类型的项目，则需要配置node 8~10的环境。如果需要构建安卓项目。。
<div align=center>
![8a6b180bfa5f3cdd5763d10cc4073346.png](./android.png 'Andriod')
</div>
如果需要构建Golang，Swift，OC，C#。。。
<div align=center>
![17a7ed3a458fbec6313eb5bfff08b0f0.jpeg](./maye.jpg 'maye')
</div>
好在Docker为我们提供了一种解决思路。Jenkins本身提供了强大的Docker支持插件，Jenkins Pipeline中也支持使用Shell脚本来操作Docker。
<mermaid>
graph TD
A[Jenkins] -->|挂载WorkSpace| B(构建环境容器)
E[本地依赖]-->|挂载依赖目录|B
B --> C{构建过程}
C-->|摧毁构建容器|D(最终产物)
</mermaid>
使用Docker作为构建环境容器来构建项目，可以保持Jenkins环境的纯净，同时也为各种构建的扩展提供了一种思路，例如以容器为执行节点进行自动化测试：
<mermaid>
graph TD
A[Jenkins] -->|挂载自动测试脚本| B(构建环境容器)
B --> C{测试过程}
C-->|摧毁构建容器|D(测试报告)
</mermaid>
利用Docker容器提供的依赖环境和独立整洁的特点，可以使用Jenkins完成更多的事情。
