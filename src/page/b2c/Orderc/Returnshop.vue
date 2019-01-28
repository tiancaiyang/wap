<template>
    <div>   
        <!-- 头部 -->
        <header id="header" class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">申请退款</h1>
        </header>
        <div class="mui-content">
		    <ul>
		        <li class="goodsInfo">
                    <div class="goodsDiv mui-clearfix">
                        <div class="goodsInfoImg mui-pull-left">
                            <img :src="orderInfo.thumb" alt="">
                        </div>    
                        <div class="goodsInfoProduct">
                            <h3>{{ orderInfo.title }}</h3>
                            <div class="priceNum">
                                <span class="red mui-pull-left">￥{{ orderInfo.price }}</span>
                                <span class="grey mui-pull-right">x{{ orderInfo.num }}</span>
                            </div> 
                        </div>
                    </div>
		        </li>
                <li class="reasonsRefunds mui-table-view-cell">
                    <a href="#picture1" class="mui-navigate-right">
                        退款类型 <span id="infoType"></span>
                    </a>
                </li>
                <li class="reasonsRefunds mui-table-view-cell">
                    <a href="#picture" class="mui-navigate-right">
                        退款原因 <span id="infoRefund" v-text="reasonsRefund"></span>
                    </a>
                </li>
                <li class="refunds">
                   退款说明:
                   <input type="text" name="" id="" maxlength="50" v-model="returnComment">
                </li>
                <li class="refundsAmount"> 
                    退款金额: <span>￥{{ orderInfo.price * orderInfo.num  | strip }}</span>
                </li>
		    </ul>
		</div>
        <!-- 退款确定 -->
        <div class="confirm" @click="commitReturnShop">确定</div>
        <!-- 退款原因模态框 -->
        <div id="picture" class="mui-popover mui-popover-action mui-popover-bottom">
           <div class="selectModel">
            <h3>退款原因</h3>
            <ul class="mui-table-view mui-table-view-radio">
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">
						卖家缺货
					</a>
				</li>
				<li class="mui-table-view-cell mui-selected">
					<a class="mui-navigate-right">
						与描述不符
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">
						不想要了
					</a>
				</li>
                <li class="mui-table-view-cell">
					<a class="mui-navigate-right">
						未按约定时间发货
					</a>
				</li>
                <li class="mui-table-view-cell">
					<a class="mui-navigate-right">
						其他
					</a>
				</li>
			</ul>
           </div>
			<ul class="mui-table-view foot">
				<li class="mui-table-view-cell">
					<a href="#picture"><b>关闭</b></a>
				</li>
			</ul>
		</div>
        <!-- 退款方式 -->
        <div id="picture1" class="mui-popover mui-popover-action mui-popover-bottom">
           <div class="selectModel">
            <h3>退款方式</h3>
            <ul class="mui-table-view mui-table-view-radio">
				<li class="mui-table-view-cell" item='1'>
					<a class="mui-navigate-right">
						退货退款
					</a>
				</li>
				<li class="mui-table-view-cell mui-selected" item='2'>
					<a class="mui-navigate-right">
						仅退款
					</a>
				</li>
			</ul>
           </div>
			<ul class="mui-table-view foot">
				<li class="mui-table-view-cell">
					<a href="#picture1"><b>关闭</b></a>
				</li>
			</ul>
		</div>
    </div>
</template>

<script>
    import { b2cOrderReturnShop  } from '../../../api/index.js'
    export default {
        data() {
            return {
               orderInfo:[],//订单详情数据
               reasonsRefund: '', //原因
               reasonsType:'',//退款类型 退款方式：1=退货退款 2=仅退款
               type:2,//退款订单类型1：b2b； 2：b2c
               returnComment:'',//说明
            }
        },
        created(){
            this.orderInfo = this.$route.params
        },
        mounted(){
            var that = this
            var info = document.getElementById("infoRefund");
            var list = document.querySelector('#picture .mui-table-view.mui-table-view-radio');
            list.addEventListener('selected',function(e){
                info.innerHTML = e.detail.el.innerText;
                that.reasonsRefund = e.detail.el.innerText;
            });
            var infoType = document.getElementById("infoType");
            var listType = document.querySelector('#picture1 .mui-table-view.mui-table-view-radio');
            listType.addEventListener('selected',function(e){
                infoType.innerHTML = e.detail.el.innerText;
                that.reasonsType = e.detail.el.getAttribute("item")
            });
        },
        methods:{
            commitReturnShop(){
                let params = { 
                    order_no: this.orderInfo.orderNo,
                    detail_id: this.orderInfo.detail_id,
                    refund_reason: this.reasonsRefund,
                    type: this.type,
                    refund_type: this.reasonsType,
                    comment: this.returnComment,
                }
                console.log(params)
                b2cOrderReturnShop(params).then(res=>{
                    if(res.code == 0){
                        mui.toast(res.msg)
                        let param = {
                            orderNo: this.orderInfo.orderNo,
                            id: this.orderInfo.detail_id, 
                        }
                        this.$router.push({ name: 'Pricedetailc',params: param })
                    }else{
                        mui.toast(res.msg)
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
// 头部
    #header{
        @headerBg: #fff;
        @headerHeight: 50px;
        background: @headerBg;
        height: @headerHeight; 
        .mui-title{
            color: #333;
            height: @headerHeight;
            line-height: @headerHeight;
            font-weight: bold;
        }
        .mui-action-back{
            color: #333;
            height: @headerHeight;
            line-height: 32px;
        }
    }
    ul,li{
        padding: 0;
        margin: 0;
        list-style: none;
    }
// 商品信息
    .mui-content{
        padding-top: 50px;
        margin-bottom: 0.2rem;
        .goodsInfo{
            background-color: #fafafa;
            margin-bottom: 0.2rem;
            .goodsDiv{
                width: 100%;
                padding: 0.28rem;
                .goodsInfoImg{
                    width: 1.8rem;
                    margin-right: 0.2rem;
                    img{
                        width: 100%;
                    }
                }
                .goodsInfoProduct{
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    h3{
                        font-size: 0.3rem;
                        line-height: 1.2;
                        color: #151515;
                    }
                    .priceNum{
                        padding-top: 0.2rem;
                        .red{
                            color: #f00;
                            font-weight: bold;
                            font-size: 0.34rem;
                        }
                        .grey{
                            font-size: 0.28rem;
                            color: #666;
                        }
                    }
                }
            }
            .brandName{
                background-color: #fff;
                padding: 0.28rem;
                text-align: left;
                vertical-align: middle;
                img{
                    width: 0.5rem;
                }
                .brand-store{
                    font-size: 0.28rem;
                    color: #333;
                    padding-left: 0.25rem;
                }
            }
        }
        .mui-table-view-cell:after{
            height: 0;
        }
        // 退款原因
        .reasonsRefunds{
            text-align: left;
            padding: 0.3rem 0.28rem;
            background-color: #fff;
            a{
                color: #151515;
                font-size: 0.32rem;
            }
            span{
                margin-left: 0.2rem;
                font-size: 0.28rem;
            }
        }
        // 退款说明
        .refunds{
            text-align: left;
            padding: 0.3rem 0.28rem;
            margin-top: 0.2rem;
            font-weight: bold;
            font-size: 0.28rem;
            color: #151515;
            background-color: #fff;
            input{
                width: 80%;
                color: #333;
                border: 0;
                margin-bottom: 0;
            }
        }
        // 退款金额
        .refundsAmount{
            text-align: left;
            padding: 0.3rem 0.28rem;
            font-weight: bold;
            font-size: 0.28rem;
            color: #151515;
            background-color: #fff;
        }
    }
// 确定
.confirm{
      height:1rem;
      width: 100%;
      line-height: 1rem;
      background: url(../../../assets/images/b2c/returnshop/background.png)  no-repeat 0 0;
      background-size: 7.5rem 1.02rem;
      text-align: center;
      color:#ffffff;
      font-size: .34rem;
      font-weight: bold;
      position: fixed;
      bottom:0;
      left: 0;
}
// 选择属性模态框
    .mui-popover{
        .foot{
            margin: 0;
            background: -webkit-gradient(linear, 0% 25%, 75% 100%, from(#ff0300), to(#fd4415));
            .mui-table-view-cell{
                a{
                    display: block;
                    height: 50px;
                    line-height: 50px;
                    font-size: 0.32rem;
                    margin: 0;
                    b{
                        color: #fff;
                        font-weight: normal;
                    }
                }
            } 
        }
        .selectModel{
            padding: 0.25rem 0.28rem;
            background-color: #fff;
            width: 100%;
            height: 7rem;
            h3{
                color: #151515;
                font-size: 0.34rem;
                font-weight: bold;
                margin-top: 0.3rem;
                margin-bottom: 0.5rem;
            }
            .mui-table-view-cell{
                padding-right: 0;
                a{
                    text-align: left;
                    width: 100%;
                    margin: 0;
                    padding: 0.28rem;
                    font-weight: bold;
                    font-size: 0.32rem;
                    color: #333;
                    background-color: #fff;
                }
            }
            .mui-navigate-right:after, .mui-push-right:after{
                background-color: #f00;
                color: #fff;
                border-radius: 50%;
                font-size: 0.4rem;
            }
        }
    }

</style>