import VueRouter from 'vue-router'

//引入组件
import home from "./components/tarbar/homeComponent.vue";
import member from "./components/tarbar/memberComponent.vue";
import shopcar from "./components/tarbar/shopcarComponent.vue";
import search from "./components/tarbar/searchComponent.vue";
import newsList from "./components/news/newsList.vue";
import newsItem from "./components/news/newsItem.vue";
import photoList from "./components/photos/photoList.vue";
import photoInfo from "./components/photos/photoInfo.vue";
import goodsList from "./components/goods/goodsList.vue";
import goodsInfo from "./components/goods/goodsInfo.vue";
import goodsDes from "./components/goods/goodsDes.vue";
import goodsComments from "./components/goods/goodsComments.vue";

var router = new VueRouter({
    routes: [
        { path: "/", redirect: "/home" },
        { path: "/home", component: home },
        { path: "/member", component: member },
        { path: "/shopcar", component: shopcar },
        { path: "/search", component: search },
        { path: "/home/newsList", component: newsList },
        { path: "/home/newsItem/:id", component: newsItem },
        { path: "/home/photoList", component: photoList },
        { path: "/home/photoInfo/:id", component: photoInfo },
        { path: "/home/goodsList", component: goodsList },
        { path: "/home/goodsInfo/:id", component: goodsInfo, name: "goodsInfo" },
        { path: "/home/goodsDes/:id", component: goodsDes, name: "goodsDes" },
        { path: "/home/goodsComments/:id", component: goodsComments, name: "goodsComments" },

    ],
    linkActiveClass: "mui-active", //修改路由默认类名
})

// 把路由对象暴露出去
export default router