//引入Vue
import Vue from "vue";
//引入路由组件
import VueRouter from "vue-router";
// 引入Vue-resource
import VueResource from "vue-resource"
Vue.use(VueResource)
    // 注册路由
Vue.use(VueRouter);
import app from "./App.vue";

import "mint-ui/lib/style.css";
//引入mui样式
import "./lib/mui/css/mui.min.css";
import "./lib/mui/css/icons-extra.css";
//按需引入组件
import { Header, Swipe, SwipeItem } from 'mint-ui';

//引入路由规则
import router from "./router.js";

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

var vm = new Vue({
    el: "#app",
    data: {

    },
    router, //挂载路由规则
    render: c => c(app),
})