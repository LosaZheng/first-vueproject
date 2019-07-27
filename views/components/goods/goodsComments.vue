<template>
        <div id="goodsComment">
            <comments :id="id"></comments>
        </div>
</template>
<script>
import comments from "../subCompents/comment.vue";
export default {
    data(){
        return{
            id:this.$route.params.id,
        }
    },

    components:{
        comments,
    }
}
</script>
<style lang="less">

</style>
