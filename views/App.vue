<template>
  <div class="app-container">
    <mt-header fixed title="黑马案例"></mt-header>
 
    <transition @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave">    
      <router-view ></router-view>    
    </transition>
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-myItem" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-myItem" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-myItem" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-myItem" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {
  methods:{
      beforeEnter (el) {
        // ... opacity: 0;
        el.style.opacity=0;
        el.style.transform= "translateX(100%)";
      },
      enter(el,done){
        el.offsetWidth;
        el.style.opacity =1;
        el.style.transform= "translateX(0)";
        el.style.transition="all .5s ease";
        done();
      },
      leave(el,done){
        el.offsetWidth;
        el.style.opacity =0;
        el.style.transform= "translateX(-100)%";
        el.style.transition="all .5s ease";
        done()
      },
      activated() {
    　　// keep-alive组件 页面进入的时候设置滚动高度
        document.querySelector(".app-container").scrollTop = 0;
      },
  }
}
</script>
<style lang="less" scoped>
.app-container {
  padding-top: 40px;
  overflow-x: hidden;
  padding-bottom:50px;
}
//顶部可以滑动之后，底部Tab不能切换原因：
// Tab样式（也是MUI的）与MUI的JS文件冲突，具体什么冲突不清楚，有兴趣可以看源码，我还晕乎乎的
// 解决方法：
// 找到Tab栏mui-tab-item的所有样式，复制一份，重新赋予新的样式类名，如mui-tab-item-my
.mui-bar-tab .mui-tab-myItem{
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
    .mui-tab-label{
      font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis
    }
    .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }
    &.mui-active{
      color: #007aff;
    }
}
.mint-header{
  z-index:999;
}
// .v-enter {
//   opacity: 0;
//   transform: translateX(100%);
// }
// .v-leave-to {
//   opacity: 0;
//   position:absolute; 
//   transform: translateX(-100%);
  
// }
// .v-enter-active,
// .v-leave-active {
// 	transition: all .5s ease;
// }
</style>