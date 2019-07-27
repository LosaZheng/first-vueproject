<template>
    <div class="goodsdesc-container">
        <h3 v-text="des.title"></h3>
        <hr>
        <div class="descontent" v-html="des.content"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            des:{},
            offsetTop:0,
        }
    },

    created(){
        this.getGoodsDes();
    },
    methods:{
        getGoodsDes(){
            this.$http.get("api/goods/getdesc/"+this.$route.params.id).then(res=>{
                if(res.body.status ===0 ){
                    this.des = res.body.message[0];
                }
            })
        }     
    }
}
</script>

<style lang="less">
.goodsdesc-container {
  padding: 4px;
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .descontent{
    
    img {
      width: 100%;
    }
  }
}
</style>
  
