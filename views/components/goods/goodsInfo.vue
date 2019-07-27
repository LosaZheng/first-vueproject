<template>
  <div class="goodsInfo">
    <!-- 轮播图 -->
    <div class="mui-card">
   
        <swiper :lubolist="lunBoList"></swiper>
    
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{ goodsInfo.market_price}}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{goodsInfo.sell_price }}</span>
          </p>
          <p>
            购买数量：
            <numbox @getcount="getBuyCount" :max="goodsInfo.stock_quantity"></numbox>
            <!-- :max属性父向子传递最大值 -->
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
              <!-- 分析： 如何实现加入购物车时候，拿到 选择的数量 -->
            <!-- 1. 经过分析发现： 按钮属于 goodsinfo 页面， 数字 属于 numberbox 组件 -->
            <!-- 2. 由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面zhong 中获取到 选中的商品数量值-->
            <!-- 3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） -->
            <!-- 4. 事件调用的本质： 父向子传递方法，子调用这个方法， 同时把 数据当作参数 传递给这个方法 -->
            <mt-button type="danger" size="small" @click="addCar" :disabled="ballFlag">加入购物车</mt-button>
          
          </p>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsInfo.goods_no}}</p>
          <p>库存情况：{{ goodsInfo.stock_quantity}}</p>
          <p>上架时间：{{goodsInfo.add_time | dataFormat("YYYY-MM-DD hh:mm:ss")}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="toGoodsDes(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="toGoodsComments(id)">商品评论</mt-button>
      </div>
    </div>
    <!-- 购物车小球 -->
    <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter">
    <div class="outer" v-show="ballFlag">
        <div class="ball" ref="ball" ></div>
    </div>
        
    </transition>
    
  </div>
</template>
<script>
// y引入轮播组件
import swiper from "../subCompents/swiper.vue";
// 导入 数字选择框 组件
import numbox from "../subCompents/goodsinfo_numbox.vue";
export default {
  data() {
    return {
      lunBoList: [],
      id: this.$route.params.id,
      goodsInfo: {},
      ballFlag:false,
      buyCount:1,
    };
  },
  created() {
    this.getLunbo();
    this.getGoodInfo();
  },
  methods: {
    // 获取详情信息
    getGoodInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(res => {
        if (res.body.status == 0) {
          this.goodsInfo = res.body.message[0];
        }
      });
    },
    // 获取轮播图
    getLunbo() {
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        // console.log(res);
        if (res.body.status == 0) {
          this.lunBoList = res.body.message;
        }
      });
    },
    //商品介绍页
    toGoodsDes(id){
        this.$router.push({name:"goodsDes",params:{id}})
    },
    //商品评论页
    toGoodsComments(id){
        this.$router.push({name:"goodsComments",params:{id}})
    },
    addCar(){ 
      if(!this.ballFlag){
        this.ballFlag =true;
        let goodsInfo = {
          id:this.goodsInfo.id,
          count:this.buyCount,
          price:this.goodsInfo.sell_price,
          selected:true,
        }
        this.$store.commit("addToCar",goodsInfo);
      }   
        
    },
    // 小球半场动画
    beforeEnter(el){
        el.style.opacity =1;       
        el.style.transform="translate(0,0)";
        let inner = document.querySelector(".ball")
        inner.style.transform=`translate(0,0)`
    },
    enter(el,done){
        el.offsetWidth;
        el.style.opacity =1;
        // 小球位移的距离要动态获取，因为屏幕滚动了或手机分辨率不同
        // 1.0获取小球的距离页面的偏移距离
        let ballPosition = el.getBoundingClientRect();
        // 2.0获取购物车标签距离页面的偏移距离
        let badgePosition = document.getElementById("badge").getBoundingClientRect();
        let xOffset = badgePosition.left - ballPosition.left;
        // 外层盒子y轴位移
        let yOffset = badgePosition.top - ballPosition.top;
        el.style.transform=`translate(0,${yOffset}px)`;
        //内层盒子x轴移动
        let inner = document.querySelector(".ball");
        inner.style.transform=`translate(${xOffset}px,0)`
        el.style.transition="all .5s cubic-bezier(0.49, -0.29, 0.75, 0.41)";
        inner.style.transition="all .5s linear";
        el.addEventListener('transitionend', done); 
    },
    afterEnter(el) {
       this.ballFlag = false;   
    },
    // 获取购买的数量
    // 增加数量是子组件,所以需要子向父传值,绑定函数
    getBuyCount(count){
        this.buyCount = count;
        // console.log(this.buyCount)
    }
  },

  components: {
    swiper,
    numbox
  }
};
</script>
<style lang="less"  scoped>
.goodsInfo {
  overflow: hidden;
  background-color: #f8f8f8;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;

    .mint-button {
      margin: 5px 0;
    }
  }
  .outer{
      position: absolute;
      top:378px;
      left:151px;
      z-index:999;
  .ball{
      height:15px;
      width:15px;     
      border-radius: 50%;
      background-color: red;
    
  }
  }

}
</style>
