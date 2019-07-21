<template>
    <div class="goodslist">
        <ul v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
            infinite-scroll-immediate-check="false">
            <li v-for="item in goodsList" :key="item.id">
                <img :src="item.img_url" alt="">
                <h3>{{item.title}}</h3>
              <div class="sellInfo">
                    <div class="price">
                        <span class="now">￥{{item.sell_price}}</span>
                        <span class="old">￥{{item.market_price}}</span>
                    </div>
                    <div class="sell">
                        <span>热卖中</span>
                        <span>剩余{{item.stock_quantity}}台</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            goodsList:[],
            num:1,
            loading:false,
        }
    },
    created(){
        this.getGoods();
    },
    methods:{
        getGoods(){
            this.$http.get("api/getgoods?pageindex="+this.num).then(res=>{
                if(res.body.status==0){
                    // console.log(res);
                    this.goodsList=this.goodsList.concat(res.body.message);
                    if(res.body.message.length!=10){
                        this.loading=true;
                    }else{
                        this.loading=false;
                    }
                }
            })
        },
        loadMore(){
            this.loading=true;
            this.num++;
            this.getGoods();
        }
    }
}
</script>
<style lang="less">
    .goodslist{
        ul{
            list-style:none;
            display:flex;
            flex-wrap: wrap;
            justify-content:space-between;
            margin:0;
            padding:7px;

            max-height: 100vh;//与屏幕一样高度
            overflow-y: auto;
            li{
                display:flex;
                flex-direction: column;
                justify-content:space-between;
                width:49%;
                border:1px solid #ccc;
                padding:2px;
                margin:3px 0;
                box-shadow: 0 0 7px #ccc;
                min-height:249px;
                h3{
                    font-size:14px;
                }
                img{
                    width:100%;
                    min-height:150px;
                }
                .sellInfo{
                    background: #eee;
                    .price{
                        font-size:14px;
                        .now{
                            color: red;
                            font-weight: bold;
                            font-size: 16px;
                        }
                        .old{
                            text-decoration: line-through;
                            font-size: 12px;
                            margin-left: 10px;
                        }
                    }
                    .sell{
                        display:flex;
                        justify-content: space-between;
                        font-size:12px;
                    }
                }
       
            }
        }
    }
</style>
