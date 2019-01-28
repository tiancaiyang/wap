<template>
    <div>
        <header id="header" class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">银行卡详情</h1>
            <a href="#picture" class="mui-icon mui-icon-more  mui-pull-right"></a>
		</header>
        <div class="mui-content">
            <div class="brankBg">
               <img src="../../../../assets/images/CouldEnter/user/guangdaBg.png" alt="">
                <div class="brankInfo">
                    <p class="title">中国光大银行</p>
                    <p class="cal">储蓄卡</p>
                    <p class="num">**** &nbsp;&nbsp; **** &nbsp;&nbsp; **** &nbsp;&nbsp; 5833</p>
                </div>
            </div>
            <div class="quota">
                <p>单笔限额 <span class="mui-pull-right">￥6000</span></p>
                <p>每日限额 <span class="mui-pull-right">￥6000</span></p>
            </div>

        </div>  

         <!-- 更换图像模态框 -->
        <div id="picture" class="mui-popover mui-popover-action mui-popover-bottom">
            <ul class="mui-table-view">
				<li class="mui-table-view-cell">
                    <a href="#picture">解除绑定</a>
				</li>
			</ul>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a href="#picture"><b>取消</b></a>
				</li>
			</ul>
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
        .mui-icon-more{
            height: 50px;
            padding-top: 0;
            line-height: 50px;
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
        .quota{
            padding: 0 0.32rem;
            text-align: left;
            p{
                height: 1rem;
                line-height: 1rem;
                margin-bottom: 0;
                color: #333;
                font-size: 0.28rem;
                border-bottom: 1px solid #ececec;
                span{
                    font-weight: bold;
                }
            }
        }
    }
</style>