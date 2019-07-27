<template>
  <div class="shopcar-container">
    <div class="goodsList">
      <div class="mui-card" v-for="item in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getChecked[item.id]" @change="change(item.id)"></mt-switch>
            <img :src="item.thumb_path" alt />
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">&yen;{{item.sell_price}}</span>
                <numbox ></numbox>
                <a href="javascript:;" @click.prevent="del(item.id)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="totalPrice">
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 <span class="red"></span> 件,总价 <span class="red">￥</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import numbox from "../subCompents/shopCar_numbox.vue";
import { MessageBox } from "mint-ui";
export default {
    data(){
        return {
            goodslist:[],
        }
    },
    created(){
        this.getShopCar()
    },
    methods:{
        
        getShopCar(){
            let arr = [];
            this.$store.state.shopCar.forEach(item=>arr.push(item.id));
            if(arr.length<=0){
                return;
            }
             // 获取购物车商品列表
            this.$http
                .get("api/goods/getshopcarlist/" + arr.join(","))
                .then(result => {
                if (result.body.status === 0) {
                    this.goodslist = result.body.message;
                }
            });
        },
        del(id){
            MessageBox.confirm('确定执行此操作?').then(action => {
                this.goodslist.some((item,i)=>{
                    if(item.id===id){
                        this.goodslist.splice(i,1);
                        this.$store.commit("delToCar",id);
                        return true;
                    }
                });
            });      
        },
        change(id){
            // console.log(this.$store.getters.getChecked[id]);
            this.$store.commit("midifySelect",{id:id,selected:this.$store.getters.getChecked[id]})
        }
    },
    components:{
        numbox,
    }
};
</script>
<style lang="less">
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goodsList {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
