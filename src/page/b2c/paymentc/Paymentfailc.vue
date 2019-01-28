<template>
    <div>
        <!-- 头部 -->
        <header id="header" class="mui-bar mui-bar-nav header">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">支付失败</h1>
        </header>
            <!-- 支付金额 -->
            <div class="price">支付失败</div>
            <!-- 查看订单 -->
            <div class="tab">
                <div class="look">查看订单</div>
                <router-link to="/homec" tag="div">继续购物</router-link>
            </div>
           <div class="back"></div>
           <!-- 列表 -->
            <div class="position">
               <shoplist></shoplist>
            </div>
           
           
    </div>
</template>

<script>
import Shoplist from '../../../components/Shoplist'
    export default {
        components:{
          Shoplist
        },

        data() {
            return {
                
            }
        },
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
    .price{
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
       height: .38rem;
       line-height: .38rem;
       color: #333333;
       font-size: .3rem;
       font-weight: bold;
       display: flex;
       flex-direction: row;
       background: #ffffff;
       div{
           width: 50%;
           text-align: center;

       }
       .look{
           border-right:2px solid #eeeeee; 
       }
    }
    .back{
        width: 100%;
       height: .4rem;
       background: #ffffff;
    }
    .position{
        margin-top: -2.7rem;
    }
    
</style>