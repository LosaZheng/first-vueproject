<template>
<!-- 问题： 我们不知道什么时候能够拿到 max 值，但是，总归有一刻，会得到一个真正的 max 值 -->
<!-- 我们可以 使用 watch 属性监听，来 监听 父组件传递过来的 max 值，不管 watch 会被触发几次，但是，最后一次，肯定是一个 合法的 max 数值 -->
  <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1' style="height:20px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <!-- change事件监听值得变化 -->
    <input id="test" class="mui-input-numbox" type="number" value="1" ref="count" >
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>

  <!-- 分析： 子组件什么时候把 数据传递给父组件 -->
  <!--  -->
</template>

<script>
import mui from "../../lib/mui/js/mui.js";

export default {
  props:["max"],
  mounted() {
    // 初始化数字选择框组件
    mui(".mui-numbox").numbox();
    //页面加载完成后为undefined,因为父组件请求数据时，是异步对象，请求的数据可能还没获取到
    // console.log(this.max);
  },
  methods:{
    getCount(){

    }
  },
};
</script>

<style lang="scss" scoped>

</style>
