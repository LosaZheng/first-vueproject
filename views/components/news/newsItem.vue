<template>
    <div class="newsItem-container">
        <div class="header">
            <h3>{{newsItem.title}}</h3>
            <p>
                <span>{{newsItem.add_time | dataFormat}}</span>
                <span>点击次数：{{newsItem.click}}次</span>
            </p>
        </div>
        <div class="content" v-html="newsItem.content">
            
        </div>
        <comments :id="id"></comments>
    </div>
</template>
<script>
    import comments from "../subCompents/comment.vue"
    export default {
        data() {
            return {
                id: this.$route.params.id,
                newsItem: {},
            }
        },
        created() {
            this.getNewsItem();
        },
        methods: {
            getNewsItem() {

                this.$http.get("api/getnew/" + this.id).then(res => {

                    if (res.body.status == 0) {
                        this.newsItem = res.body.message[0];
                    }
                })
            }
        },
        components: {
            comments,
        }
    }
</script>
<style lang="less">
    .newsItem-container {
        padding: 0 4px;
        .header {
            border-bottom: 1px solid #ccc;
            h3 {
                font-size: 16px;
                text-align: center;
                margin: 15px 0;
                color: red
            }
            p {
                display: flex;
                justify-content: space-between;
                color: skyblue
            }
        }
    }
</style>