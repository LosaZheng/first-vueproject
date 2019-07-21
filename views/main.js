//引入Vue
import Vue from "vue";
//引入路由组件
import VueRouter from "vue-router";
// 引入Vue-resource
import VueResource from "vue-resource"
Vue.use(VueResource);
Vue.http.options.root = "http://www.liulongbin.top:3005";
// 注册路由
Vue.use(VueRouter);
//引入格式化插件moment
import moment from "moment";
//定义全局过滤器
Vue.filter("dataFormat", function(dataStr, pat = "YYYY-MM-DD HH-mm-ss") {
    return moment(dataStr).format(pat);
})
import app from "./App.vue";

import MintUI from "mint-ui";
Vue.use(MintUI)
import "mint-ui/lib/style.css";
//引入mui样式
import "./lib/mui/css/mui.min.css";
import "./lib/mui/css/icons-extra.css";
//按需引入组件
// import { Header, Swipe, SwipeItem, Button, Loadmore, Spinner, Lazyload } from 'mint-ui';
//引入缩略插件
import VuePreviw from "vue-preview";
Vue.use(VuePreviw);
//引入路由规则
import router from "./router.js";

// import { InfiniteScroll } from 'mint-ui';

// Vue.use(InfiniteScroll);
// Vue.use(Lazyload);
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.component(Loadmore.name, Loadmore);
// Vue.component(Spinner.name, Spinner);

var vm = new Vue({
    el: "#app",
    data: {

    },
    router, //挂载路由规则
    render: c => c(app),
})