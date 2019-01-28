<template>
    <div>
        <!-- 头部 -->
        <header id="header" class="mui-bar mui-bar-nav header">
            <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
            <h1 class="mui-title">支付失败</h1>
        </header>
            <!-- 支付金额 -->
            <div class="priceDiv"><i>￥</i><span>{{ price_total }}</span></div>
            <!-- 查看订单 -->
            <div class="tab">
                <router-link to="/userb" tag="a">查看订单</router-link>
                <router-link to="/homeb" tag="a" class="goShopping">继续购物</router-link>
            </div>
            <!-- 相关推荐 -->
            <recomment-list :listData="recommentList"></recomment-list>
    </div>
</template>

<script>
    import RecommentList from '../../../components/RecommentList.vue'
    import { b2bRecommentList } from '../../../api/index.js'
    export default {
        data() {
            return {
                price_total: this.$route.query.price,
                recommentList:[]
            }
        },
        components:{
            RecommentList
        },
        created(){
            this.getRecommentList()
        },
        methods:{
            getRecommentList(){
                b2bRecommentList().then(res=>{
                    this.recommentList = res.data
                    console.log(this.recommentList)
                })
            }
        }
    }
</script>

<style scoped lang="less">
    //  头部
    #header {
        @headerBg: #fff;
        @headerHeight: 50px;
        background: @headerBg;
        height: @headerHeight;
        .mui-title {
            height: 50px;
            line-height: 50px;
            font-weight: bold;
            color: #151515;
        }
        .mui-pull-left {
            height: @headerHeight;
            line-height: 32px;
            color: #333;
        }
    }
    // 金额
    .priceDiv{
       color: #ff2400;
       font-weight: bold;
       width: 100%;
       height: 1.2rem;
       text-align: center;
       margin-top: 50px;
       background: #ffffff;
       line-height: 1.2rem;
       font-size: .4rem;
        i{
            font-style: normal;
            font-size: .3rem;
        }

    }
    .tab{
       width: 100%;
       color: #333333;
       font-size: .3rem;
       font-weight: bold;
       display: flex;
       justify-content: space-around;
       background: #fff;
       padding-bottom: 0.28rem;
       a{
           width: 50%;
           color: #333;
           font-size: 0.3rem;
       }
       .goShopping{
           border-left: 1px solid #ccc;
       }
       
    }
    ul,li{
        list-style: none;
        padding: 0;
        margin: 0;
    }
   
</style>