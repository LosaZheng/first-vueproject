<template>
<div>
      <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a v-for="item in photoCata" :key="item.id"  
                :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"
                @click.prevent="getPhotoList(item.id)">
                    {{item.title}}
                </a>
            </div>
        </div>
    </div>
    <ul id="photoList">
        <router-link v-for="item in photoList" :key="item.id" :to="'/home/photoInfo/'+item.id" tag="li">
            <img v-lazy="item.img_url">
            <div class="desc" v-html="item.zhaiyao">

            </div>
        </router-link>
    </ul>
</div>
  
</template>
<script>
import mui from "../../lib/mui/js/mui.js";
export default {
    data(){
        return {
            photoCata:[],//图片分类
            photoList:[]//图片列表
        }
    },
    // 生命周期函数 已渲染到页面 此时才能初始化mui元素
    mounted(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
       
    },
    created(){
        this.getPhotoCata();
        this.getPhotoList(0);
    },
    methods:{
        getPhotoCata(){
            this.$http.get("api/getimgcategory").then(res=>{
                if(res.body.status==0){
                    this.photoCata=res.body.message;
                    let all ={id:0,title:"全部"};
                    this.photoCata.unshift(all);
                }
            })
        },
        getPhotoList(id){
            this.$http.get("api/getimages/"+id).then(res=>{
                if(res.body.status==0){
                    // console.log(res);
                    this.photoList=res.body.message;
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
    * {
        touch-action:pan-y
    }
    #slider {
        #sliderSegmentedControl{
            border-bottom:1px solid #eee
        }
    }
 
    #photoList{
        list-style:none;
        padding:0;
        margin:0;
        li{
            // margin-top:5px;
            position:relative;
            padding:10px;
            // text-align:center;
             img{
                width:100%;
                vertical-align: top
            }
            .desc{
                position:absolute;
                 margin:10px;
                bottom:0;
                left:0;
                // width:100%;
                max-height:60px;      
                background-color: rgba(0,0,0,.5);
                text-indent: 2em;
                display: -webkit-box;//多行文字省略号显示
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
                color:#fff;
                font-size:12px;
                
            }
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
        }
       
    }
</style>
