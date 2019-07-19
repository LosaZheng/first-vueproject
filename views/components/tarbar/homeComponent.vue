<template>
    <div>
        <mt-swipe :auto="4000" :defaultIndex="1" >
            <mt-swipe-item v-for="item in lunBoList" :key="item.id">
                <img :src="item.img" />
            </mt-swipe-item>
        </mt-swipe>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <a href="#">
                    <img src="../../images/menu1.png" alt />
                    <div class="mui-media-body">新闻资讯</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <a href="#">
                    <img src="../../images/menu2.png" alt />
                    <div class="mui-media-body">图片分享</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <a href="#">
                    <img src="../../images/menu3.png" alt />
                    <div class="mui-media-body">商品购买</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <a href="#">
                    <img src="../../images/menu4.png" alt />
                    <div class="mui-media-body">留言反馈</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <a href="#">
                    <img src="../../images/menu5.png" alt />
                    <div class="mui-media-body">视频专区</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <a href="#">
                    <img src="../../images/menu6.png" alt />
                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                lunBoList: [],
            };
        },
        methods: {
            getLunbo() {
                this.$http
                    .get("http://www.liulongbin.top:3005/api/getlunbo")
                    .then(result => {
                        // console.log(result)
                        if (result.body.status == 0) {
                            this.lunBoList = result.body.message;
                        } else {}
                    });
            },
            //轮播图切换时触发
            // handleChange(index) {
            //     console.log(index);
            // }
        },
        created() {
            this.getLunbo();
        }
    };
</script>
<style lang="less" scoped>
    .mint-swipe {
        height: 200px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    
    .mui-table-view.mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border: 0;
        .mui-table-view-cell {
            border: 0;
            img {
                width: 60px;
            }
        }
    }
</style>