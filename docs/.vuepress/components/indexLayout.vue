<template>
    <div class="sejta_guide_container">
        <div v-for="(item,index) in pages" :key="index" class="sejta_guide_colum">
            <div class="sejta_article_tile" @click="goBook(item)">
                <div>{{item.title}}</div>
                <div class="sejta_tag_container">
                    <div class="sejta_tag" v-for="(obj,index) in item.frontmatter.meta">{{obj.tag}}</div>
                </div>
            </div>
            <div class="sejta_article_excerpt">{{evalStr(item.excerpt)}}</div>
        </div>
    </div>
</template>
<style scoped>
    .sejta_tag{
        display: flex;
        align-items: center;
        margin-left: 10px;
        padding: 0px 5px;
        border-radius: 1em 1em;
        font-size: 5px;
        color: white;
        font-weight: bold;
        background: rgba(74,191,138,.7);
        border: 1px solid rgba(74,191,138,1);
    }
    .sejta_tag_container{
        line-height: 5px;
        display: flex;
        margin-left: 10px;
    }
    .sejta_article_excerpt{
        margin-top: 20px;
        font-size: 0.7em;
        line-height: 1.5em;
        color: #aaaaaa;
    }
    .sejta_article_tile{
        cursor: pointer;
        display: flex;
    }
    .sejta_guide_container{
        margin-top: 30px;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .sejta_guide_colum{
        width: 60%;
        padding: 20px 0px;
        border-bottom: 1px solid #F1F5F6;

    }
</style>
<script>
    export default {
            data(){
                return{
                    page:'',
                    site:'',
                    path:'',
                    pages:[],
                }
            },
        created(){
            this.path=this.$page.path
            this.site=this.$site
            this.site.pages.map(obj=>{
                if(obj.title!='导航'&&obj.title!='Home'){
                        this.pages.push(obj);
                }
            });
        },
        methods:{
            goBook(item){
                this.$router.push(item.path);
            },
            evalStr(val){
                if(val) {
                    let tmp=val.replace(/<.{1,2}>/g, '');
                    return tmp.replace(/<!--/,'').replace(/-->/,'');
                }else{
                    return '';
                }
            }
        }
    }
</script>