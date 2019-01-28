<template>
    <div>
        <!-- b2c品牌商商品列表 -->
        <header id="header" class="mui-bar mui-bar-nav">
            <router-link to="/" tag="a" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
            <h1 class="mui-title">优惠中心</h1>
        </header>
        <div class="content">
            <img src="../../assets/images/Preferential/err_msg_empty.png" alt="">
            <p>暂无优惠活动，敬请期待~</p>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
           return {

           }
        },
    }
</script>

<style scoped lang="less">
    #header{
        @headerBg: #fff;
        @headerHeight: 50px;
        background: @headerBg;
        height: @headerHeight; 
        .mui-pull-left{
            height: @headerHeight;
            line-height: 32px;
            color: #333;
        }
        .mui-title{
            color: #333;
            height: @headerHeight;
            line-height: @headerHeight;
            font-weight: bold;
        }
    }
    .content{
        margin-top: 50px;
        padding-top: 0.5rem;
        img{
            width: 4rem;
        }
    }           
</style>