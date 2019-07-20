<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
					<router-link :to="'/home/newsItem/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h3>{{item.title}}</h3>
							<p class='mui-ellipsis'>
                                <span>创建时间：{{item.add_time | dataFormat}}</span>
                                <span>点击次数:{{item.click}}</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            newsList:[],
        }
    },
    methods:{
        getNewsList(){
            this.$http.get("api/getnewslist")
            .then(res=>{
                // console.log(res.body)
                if(res.body.status==0){
                    this.newsList=res.body.message;
                }
            })
        }
    },
    created(){
        this.getNewsList();
    }
}
</script>
<style lang="less">
    .mui-table-view{
        li {
            h3{
                font-size:14px;

            }
            .mui-ellipsis{
                display:flex;
                color:skyblue;
                font-size:12px;
                justify-content: space-between;
            }
        }
    }
</style>
