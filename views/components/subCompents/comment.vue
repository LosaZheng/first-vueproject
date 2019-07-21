<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model="content"></textarea>

    <mt-button type="primary" size="large" @click ="addContent">发表评论</mt-button>

    <div class="cmt-list">
       <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="false"
       :bottom-distance="50"  :bottom-pull-text="bottomPullText"
       :bottom-drop-text="bottomDropText" >
          <ul>
             <li class="cmt-item" v-for="(item,i) in comments" :key="i">
                <div class="cmt-title">
                  第{{ i+1 }}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dataFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content= item.content.trim()==""?"随意说":item.content}}
                </div>
            </li>
          </ul>
       </mt-loadmore>
    </div>

    <!-- <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button> -->
  </div>
</template>

<script>
    import {Toast} from "mint-ui";

    export default {
        data() {
            return {
                pageCount:1,
               comments:[],
               content:"",
               allLoaded:false,
               topStatus :"",
               bottomPullText:"刷新",
               bottomDropText:"更新",
               bottomStatus:'',
            };
        },
        created() {
          this.getComments();
        },
        methods: {
          //获取评论
          getComments(){
            this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageCount)
            .then(res=>{
              if(res.body.status==0){
                // console.log(res);
                if(res.body.message.length==0){
                  this.allLoaded=true;
                }else{
                   this.comments=this.comments.concat(res.body.message);
                    this.$refs.loadmore.onBottomLoaded();               
                }
                
              }
            })
          },
          loadBottom(){

            this.pageCount++;
            setTimeout(()=>{
              this.getComments();
            },2000)      
          },
           handleBottomChange(status) {
              this.topStatus = status;
          },
          addContent(){
             if(this.content.trim()==""){
               return Toast("评论不能为空");
             }else{
               this.$http.post("api/postcomment/"+this.id,{
                 content:this.content
               }).then(res=>{
                 if(res.body.status==0){

                   let info={
                     user_name:"匿名",
                     add_time:Date.now(),
                      content:this.content,
                   }
                   this.comments.unshift(info);
                   this.content="" ;                 
                 }else{
                   Toast("评论失败,请重试")
                 }
               })
             }
          },
          getMore(){
            this.pageCount++;
            this.getComments();
          },

        },
        props:["id"]
    };
</script>

<style lang="less" scoped>
    .cmt-container {
        h3 {
            font-size: 18px;
        }
        textarea {
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list {
            margin: 5px 0;
            overflow:scroll;
            height:500px;
            .cmt-item {
                font-size: 13px;
                .cmt-title {
                    line-height: 30px;
                    background-color: #fff;
                }
                .cmt-body {
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
            ul{
              list-style:none;
              padding:0;
              margin:0;
            }
        }
    }
</style>