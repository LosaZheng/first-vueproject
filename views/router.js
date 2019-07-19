import VueRouter from 'vue-router'

//引入组件
import home from "./components/tarbar/homeComponent.vue";
import member from "./components/tarbar/memberComponent.vue";
import shopcar from "./components/tarbar/shopcarComponent.vue";
import search from "./components/tarbar/searchComponent.vue";
// 3. 创建路由对象
var router = new VueRouter({
    routes: [
        { path: "/", redirect: "/home" },
        { path: "/home", component: home },
        { path: "/member", component: member },
        { path: "/shopcar", component: shopcar },
        { path: "/search", component: search },
    ],
    linkActiveClass: "mui-active", //修改路由默认类名
})

// 把路由对象暴露出去
export default router