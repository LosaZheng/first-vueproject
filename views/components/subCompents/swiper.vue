<template>
    <div>
        <mt-swipe :auto="4000" :defaultIndex="1" >
            <mt-swipe-item v-for="item in lubolist" :key="item.id">
                <img :src="item.img || item.src" />
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    props:["lubolist"]
}
</script>
<style lang="less" scoped>
       .mint-swipe {
        height: 200px;
        text-align: center;
        img {
            height: 100%;           
        }
    }
</style>
