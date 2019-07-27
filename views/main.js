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

//注册vuex 数据保存状态管理工具
import Vuex from "vuex";
Vue.use(Vuex);
//创建vuex 实例
let shopCar = JSON.parse(localStorage.getItem("shopCar") || "[]");
let store = new Vuex.Store({
        state: {
            shopCar: shopCar,
            // total: 0,
        },
        mutations: {
            //添加到购物车
            addToCar(state, goodsInfo) {
                //如果购物车之前有商品
                let flag = state.shopCar.some(item => {
                    if (item.id === goodsInfo.id) {
                        item.count += goodsInfo.count;
                        return true
                    }
                });
                //如果添加的商品购物车中没有
                if (!flag) {
                    state.shopCar.push(goodsInfo)
                }
                console.log(state.shopCar);
                localStorage.setItem("shopCar", JSON.stringify(state.shopCar));
            },
            //删除购物车的物品
            delToCar(state, id) {
                state.shopCar.some((item, i) => {
                    if (item.id === id) {
                        state.shopCar.splice(i, 1);
                        return true
                    }
                });
                localStorage.setItem("shopCar", JSON.stringify(state.shopCar));
            },
            //修改选中状态
            midifySelect(state, status) {
                state.shopCar.some((item, i) => {
                    if (item.id === status.id) {
                        item.selected = status.selected;
                        return true
                    }
                });
                localStorage.setItem("shopCar", JSON.stringify(state.shopCar));
            }

        },
        getters: {
            getAllCount(state) {
                let count = 0;
                state.shopCar.forEach(item => {
                    count += item.count;
                });
                return count;
            },
            getChecked(state) {
                let o = {}
                state.shopCar.forEach(item => {
                    o[item.id] = item.selected;
                })
                return o
            }
        }
    })
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
    store, //挂载vuex实例
    render: c => c(app),
})