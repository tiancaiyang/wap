<template>
    <div class="brank">
        <header id="header" class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">银行卡</h1>
		</header>
        <div class="mui-content">
            <router-link to="/indexUser/brankCard/brankcardinfo" tag="div" class="brankBg">
               <img src="../../../../assets/images/CouldEnter/user/guangdaBg.png" alt="">
                <div class="brankInfo">
                    <p class="title">中国光大银行</p>
                    <p class="cal">储蓄卡</p>
                    <p class="num">**** &nbsp;&nbsp; **** &nbsp;&nbsp; **** &nbsp;&nbsp; 5833</p>
                </div>
            </router-link>
            <div class="brankBg">
               <img src="../../../../assets/images/CouldEnter/user/pinganBg.png" alt="">
                <div class="brankInfo">
                    <p class="title">平安银行</p>
                    <p class="cal">储蓄卡</p>
                    <p class="num">**** &nbsp;&nbsp; **** &nbsp;&nbsp; **** &nbsp;&nbsp; 5833</p>
                </div>
            </div>
             <div class="brankBg">
               <img src="../../../../assets/images/CouldEnter/user/pinganBg.png" alt="">
                <div class="brankInfo">
                    <p class="title">平安银行</p>
                    <p class="cal">储蓄卡</p>
                    <p class="num">**** &nbsp;&nbsp; **** &nbsp;&nbsp; **** &nbsp;&nbsp; 5833</p>
                </div>
            </div>
        </div>
         <router-link to="/indexUser/brankCard/addbrankcard" tag="button" type="button" class="mui-btn mui-btn-danger addCard">添加银行卡</router-link>
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
    .brank{
        width: 100%;
        height: 100%;
        background: #fff;
        position: absolute;
    }
    #header{
        height: 50px;
        .mui-title{
            height: 50px;
            line-height: 50px;
            font-weight: bold;
        }
        .mui-action-back{
            font-size: 30px;
            color: #070707;
        }
    }
    .mui-content{
        padding-top: 50px;
        background-color: #fff;
        .brankBg{
            padding: 0 0.28rem;
            height: 2.4rem;
            position: relative;
            img{
                width: 100%;
                height: 100%;
            }
            .brankInfo{
                width: 70%;
                text-align: left;
                position: absolute;
                top: 20%;
                left: 22%;
                p{
                    color: #fff;
                }
                .title{
                    font-size: 0.32rem;
                    font-weight: bold;
                    margin-bottom: 0;
                }
                .cal{
                    font-size: 0.28rem;
                    margin-bottom:  0.2rem;
                }
                .num{
                    font-size: 0.35rem;
                }
            }
        }
    }
    .addCard{
        position: fixed;
        bottom: 30px;
        width: 80%;
        left: 10%;
        right: 10%;
        height: 0.8rem;
        font-size: 0.32rem;
        border-radius: 25px;
    }
</style>