<template>
    <div>
        <div class="title">
            <h3>{{msg.title}}</h3>
            <p>
                <span>发表时间：{{msg.add_time | dataFormat}}</span>
                <span>浏览次数：{{msg.click}}</span>
            </p>
        </div>
        <div class="previewImg">
            <vue-preview :slides="preImg"></vue-preview>
        </div>
        <div class="content" v-html="msg.content"></div>
        <comment :id="id"></comment>
    </div>
</template>
<script>
import comment from "../subCompents/comment.vue"
export default {
    data(){
        return {
            id:this.$route.params.id,
            msg:{},
            preImg:[],
        }
    },
    methods:{
        getPhotoInfo(){
            this.$http.get("api/getimageInfo/"+this.id).then(res=>{
                if(res.body.status==0){
                    this.msg=res.body.message[0];
                }
            })
        },
        //获取图片预览图
        getPhotoPre(){
            this.$http.get("api/getthumimages/"+this.id).then(res=>{
                if(res.body.status==0){
                    res.body.message.forEach(item => {
                        item.w=600;
                        item.h=400;
                        item.msrc=item.src;
                    });
                    this.preImg = res.body.message;
                }
            })
        }
    },
    created(){
        this.getPhotoInfo();
        this.getPhotoPre();
    },
    components:{
        comment,
    }

}
</script>
<style lang="less">
    .title{
        border-bottom: 1px solid #eee;
        h3 {
            font-size:16px;
            text-align:center;
        }
        p{
            display:flex;
            justify-content: space-between;
        }
    }
    .content{
        text-indent:2em;
        font-size:14px;
        padding:5px;
    }
    .previewImg{
        overflow:hidden;
        figure{
            float: left;
            width:120px;
            margin:0;
            img{
                width:100%;
            }
        }
    }

</style>