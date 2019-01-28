<template>
    <div>
        <!--头部  -->
        <header id="header" class="mui-bar mui-bar-nav">
          <h1 class="mui-title">我的订单</h1>
		</header>
        <div class="mui-content">
            <div id="slider" class="mui-slider mui-fullscreen">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper topScroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll   tapScroll">
						<a class="mui-control-item mui-active"  @tap="changeStatus0()">
							全部
						</a>
                        <a class="mui-control-item"  @tap="changeStatus2()">
							待付款
                            <span class="mui-badge" v-if="orderNum.count1 != 0">{{ orderNum.count1 }}</span>
						</a>
						<a class="mui-control-item"  @tap="changeStatus1()">
							待发货
                            <span class="mui-badge" v-if="orderNum.count2 != 0">{{ orderNum.count2 }}</span>
						</a>
						<a class="mui-control-item"  @tap="changeStatus3()">
							待收货
                            <span class="mui-badge" v-if="orderNum.count3 != 0">{{ orderNum.count3 }}</span>
						</a>
                        <a class="mui-control-item"  @tap="changeStatus4()">
							待评价
                            <span class="mui-badge" v-if="orderNum.count4 != 0">{{ orderNum.count4 }}</span>
						</a>
						<a class="mui-control-item"  @tap="changeStatus5()">
							退款
						</a>
					</div>
				</div>
				<div class="mui-slider-group">
                    <!-- 全部 -->
					<div  class="mui-slider-item mui-control-content mui-active">
						<div id="scroll1" class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<ul class="mui-table-view">
									<li class="mui-table-view-cell" v-for="(item,index) in orderListAll" :key="index">
										<div class="order-details-header">
                                            <img class="img-small mui-pull-left" src="../../../assets/images/b2c/evaluatec/yao_03.png"/>
                                            <span class="text-content">{{ item.brand_store_name }}</span>
                                            <span class="dai mui-pull-right" v-if="item.order_status != 6">{{ item.order_status | orderStatus }}</span>
                                            <span class="dai mui-pull-right" v-else>{{ item.refund_status | returnStatus }}</span>
										</div>
                                        <div class="order-details-content mui-clearfix">
                                            <router-link  :to="'/details/'+item.order_no" tag="div" class="contain" v-for="itemProduct in item.product" :key="itemProduct.id">
                                                <div class="content-left">
                                                    <img :src="itemProduct.thumb" class="img-big" alt="">
                                                </div>
                                                <div class="content-right">
                                                    <div class="content-right-text">{{ itemProduct.title }}</div>
                                                    <div class="productAttr"><span>{{ itemProduct.product_attr }}</span></div>
                                                    <div class="pricec">
                                                        <span class="right-red">￥{{ itemProduct.price }}</span><span class="right-grey">x{{ itemProduct.num }}</span>
                                                    </div>
                                                </div>
                                            </router-link>
                                            <div class="Gift" v-if="item.gifts.length == 0 ? false : true">
                                                赠品:
                                                <ul>
                                                    <li v-for="(data,i) in item.gifts" :key="i">
                                                        <span>{{ data.title }}</span>
                                                        <div>
                                                            <img :src="data.thumb" alt="">
                                                            <span>x {{ data.num }}</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="orderlist atherDiv">共{{ item.num_total }}件商品  合计：￥{{ item.price_total }}</div>
                                            <div class="confirm">
                                                <!-- 待收货  ===> 4 -->
                                                <router-link :to="'/logisticsdetailc/'+item.order_no" tag="span" class="wu threeWu" v-if="item.order_status == 4 ? true : false" @click="orderSure(item.order_no)">查看物流</router-link>
                                                <router-link :to="'/returnshopListc/' +item.order_no " tag="span" class="wu"  v-if="item.order_status == 4 || item.order_status == 3 ? true : false">申请退款</router-link>
                                                <span class="shou" v-if="item.order_status == 4 ? true : false" @click="orderSure(item.order_no)">确认收货</span>
                                                <!-- 退款和已完成的状态有查看详情 ===> -1 -->
                                                <router-link :to="'/userb/detailsB/' +item.order_no " tag="span" class="wu"  v-if="item.order_status == 1 ? true : false" >查看详情</router-link>
                                                <!-- 待付款 ===> 2 -->
                                                <span class="wu"  v-if="item.order_status == 2 ? true : false" @click="orderConcal(item.order_no)">取消订单</span>
                                                <span class="shou"  v-if="item.order_status == 2 ? true : false"><a href="#picture" class="payMoney"  @tap="orderPay(item.order_no)">付款</a></span>
                                                <!-- 待评价 ===> 5 -->
                                                <router-link :to="'/evaluationListC/'+item.order_no" tag="span" class="shou" v-if="item.order_status == 5 ? true : false">评价</router-link>
                                                <!-- 待发货 ===> 3 -->
                                                <span class="shou" v-if="item.order_status == 3 ? true : false" @click="orderWarn(item.order_no)">提醒发货</span>
                                                <!-- 已取消===> 0 -->
                                                <span class="shou" v-if="item.order_status == 0 || item.order_status == 1 ? true : false" @click="orderDelete(item.order_no)">删除订单</span>
                                                <!-- 退货退款===> 6 -->
                                                <span  class="wu" v-if="item.order_status == 6 ? true : false" @click="closeReturn(item.order_no,item.detail_id)">撤销申请</span>
                                                <router-link :to="'/pricedetailc/'+item.order_no+'/'+item.detail_id" tag="span"  class="shou" v-if="item.order_status == 6 ? true : false" >查看详情</router-link>

                                            </div>
                                        </div>
									</li>
								</ul>
                                <!-- 加载更多 -->
                                <div class="loadingMore"  v-if="orderListAll.length == 0 || orderListAll.length < 10? false : true" >
                                    <button  class="mui-btn mui-btn-danger mui-btn-outlined" @click="morePage()">加载更多</button>
                                </div>
                                <!-- 当没有订单时 -->
                                <null-order v-if="orderListAll.length == 0 ? true : false"></null-order>
							</div>
						</div>
					</div>
				</div>
            </div>
        </div>
        <!-- 选择支付方式模态框 -->
        <div id="picture" class="mui-popover mui-popover-action mui-popover-bottom">
           <div class="selectModel">
            <h3>选择支付方式</h3>
            <a  href="#picture" class="mui-icon mui-icon-closeempty"></a>
            <ul class="mui-table-view mui-table-view-radio ">
				<li class="mui-table-view-cell  mui-selected" item='1'>
					<a class="mui-navigate-right">支付宝</a>
				</li>
				<!-- <li class="mui-table-view-cell" item='2'>
					<a class="mui-navigate-right">微信</a>
				</li> -->
			</ul>
           </div>
			<ul class="mui-table-view foot">
				<li class="mui-table-view-cell">
					<a href="#picture" @tap="surePayOrder"><b>确定支付</b></a>
				</li>
			</ul>
		</div> 
        <!-- 引入tabbar -->
        <tabbarc></tabbarc>
    </div>
</template>

<script>
import tabbarc from '../../../components/Tabbarc.vue'
import nullOrder from '../../../components/nullOrder.vue'
// import mui from '../../../../static/mui/js/mui.min.js'
import { orderNum, b2cOrder, b2bOrderSure, b2bOrderConcal, b2bOrderDelete, b2bOrderWarn, CloseReturnShop,b2bAliPay,b2bWechatPay } from '../../../api/index.js'
export default {
    inject :['reload'],
    data() {
        return {
            status: '', //订单状态 ，需要传递的参数
            limit: 10, //每页传多少数据，可不传，默认为10
            page: 0,   //页码，可不传，默认为0
            orderType:2,//订单类型：1：B2B；2：B2C
            orderListAll:[],//全部商品订单列表
            productList:[],//商品列表
            gidtList:[],//赠品列表
            statusOrder: '',//订单状态显示文字
            dataLength:'',//数据长度
            orderNum:[],//订单数字角标
            pay_type:1,//支付方式 1 为支付宝
            everyorderNo:'',//选中的某一个orderNo
        }
    },
    created(){
        this.getOrderNum()
        this.getOrderData()
    },
    mounted(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
        // 选择支付种类
        var that = this
        var list = document.querySelector('.mui-table-view.mui-table-view-radio');
        list.addEventListener('selected',function(e){
            that.pay_type = e.detail.el.getAttribute("item")
        });    
    },
    filters:{
        // 不同状态展示不同文字
        orderStatus(order_status){
            var res = ''
            if(order_status == 6){
                res = '退货/退款'
            }else if(order_status == 5){
                res = '待评价'
            }else if(order_status == 4){
                res = '待收货'
            }else if(order_status == 3){
                res = '待发货'
            }else if(order_status == 2){
                res = '待付款'
            }else if(order_status == 1){
                res = '已完成'
            }else if(order_status == 0){
                res = '已取消'
            }
            return res;
        },
        // 退款显示不同状态
        returnStatus(refund_status){
            var res = ''
            if(refund_status == 0){
                res = '未处理'
            }else if(refund_status == 1){
                res = '已处理'
            }else if(refund_status == 2){
                res = '拒绝申请'
            }else if(refund_status == 3){
                res = '待处理'
            }else if(refund_status == 4){
                res = '待处理'
            }
            return res;
        }
    },
    methods:{
        changeStatus0(){
            this.status = '';
            this.page = 0;
            this.orderListAll.length = 0;
            this.getOrderData();
            mui('#scroll1').scroll().scrollTo(0,0,0);
        },
        changeStatus1(){
            this.status = 3;
            this.page = 0;
            this.orderListAll.length = 0;
            this.getOrderData();
            mui('#scroll1').scroll().scrollTo(0,0,0);
        },
        changeStatus2(){
            this.status = 2;
            this.page = 0;
            this.orderListAll.length = 0;
            this.getOrderData();
            mui('#scroll1').scroll().scrollTo(0,0,0);
        },
        changeStatus3(){
            this.status = 4;
            this.page = 0;
            this.orderListAll.length = 0;
            this.getOrderData();
            mui('#scroll1').scroll().scrollTo(0,0,0);
        },
        changeStatus4(){
            this.status = 5;
            this.page = 0;
            this.orderListAll.length = 0;
            this.getOrderData();
            mui('#scroll1').scroll().scrollTo(0,0,0);
        },
        changeStatus5(){
            this.status = 6;
            this.page = 0;
            this.orderListAll.length = 0;
            this.getOrderData();
            mui('#scroll1').scroll().scrollTo(0,0,0);
        },
        // 订单头部数字角标
        getOrderNum(){
            let params = { type: this.orderType }
            orderNum(params).then(res=>{
                this.orderNum = res.data
            })
        },
        getOrderData(){
            let params = { status: this.status,limit: this.limit,page: this.page }
            b2cOrder(params).then(res=>{
                this.orderListAll = this.orderListAll.concat(res.data)
                this.dataLength = res.data.length;
            })
        },
        // 加载更多
        morePage(){
           if(this.dataLength < 10){
               this.dataLength = ''
               mui.toast('没有更多订单了')
           }else{
               this.page++
               this.getOrderData()
           }
        },
        // 确认订单按钮
        orderSure( orderNo ){
            let params = {order_no : orderNo,  type:this.orderType}
            b2bOrderSure(params).then(res=>{
                mui.toast('收货成功',{ duration:500 })
                // 应该再次刷新下页面
                 this.reload()
            })
        },
        // 取消订单
        orderConcal( orderNo ){
            let params = {order_no : orderNo , type:this.orderType}
            b2bOrderConcal(params).then(res=>{
                mui.toast('订单已取消',{ duration:500 })
                // 应该再次刷新下页面
                this.reload()
            })
        },
        //删除订单
        orderDelete( orderNo ){
            let params = {order_no : orderNo , type:this.orderType }
            b2bOrderDelete(params).then(res=>{
                 mui.toast('订单已删除',{ duration:500 })
                // 应该再次刷新下页面
                 this.reload()
            })
        },
        // 提醒发货
        orderWarn( orderNo ){
            let params = {order_no : orderNo , type:this.orderType }
            b2bOrderWarn(params).then(res=>{
                mui.toast('已成功提醒卖家',{ duration:500 })
                // 应该再次刷新下页面
                //  this.reload()
            })
        },
        // 撤销申请
        closeReturn( orderNo,detailId ){
            var that = this
            mui.confirm('您确定要撤销申请吗？','提示','',function(e){
                if(e.index == 1) {
                    let params = {order_no : orderNo , type:that.orderType,detail_id: detailId}
                    CloseReturnShop(params).then(res=>{
                        if(res.code == 0){
                            mui.toast('撤销成功')
                            // 应该再次刷新下页面
                            this.reload()
                        }
                    })
                }
            })

        },
        // 付款
        orderPay(orderNo){
            this.everyorderNo = orderNo
        },
        // 支付
        surePayOrder(){
            let orderNo = this.everyorderNo
            if(this.pay_type == 1){
                // 调取支付宝支付
                let param ={
                    order_no : orderNo,
                    type: 2,
                }
                b2bAliPay(param).then(res=>{
                    const div = document.createElement('div');
                    div.innerHTML = (res.data);  //res.data是返回的表单
                    document.body.appendChild(div);
                    document.forms.alipaysubmit.submit();
                })
                        
            }else if(this.pay_type == 2){
                // 调取微信支付
                let param ={
                    order_no : orderNo,
                    type: 2,
                }
                b2bWechatPay(param).then(res=>{
                    window.location.href = res.data.mweb_url
                })
                // that.$router.push({name:'paymentB', query:{ price_total: that.allTotalPrice } })
            }
        }

    },
    components:{
        nullOrder,
        tabbarc
    }
}
</script>

<style scoped lang="less">
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
    }
    ul,li{
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .mui-content{
        padding-top: 50px!important;
            .mui-slider.mui-fullscreen{
               top: 50px;
               .mui-scroll-wrapper{
                   background-color: #fff;
                   .mui-control-item{
                        color: #333;
                        font-size: 0.3rem;
                        font-weight: bold;
                        height: 1rem;
                        line-height: 1.1rem;
                        font-weight: bold;
                    }
                    .mui-control-item.mui-active{
                        color: #e51616;
                    }
               }

            }
            .topScroll-wrapper{
                height: 1rem;
                a{
                    position: relative;
                    .mui-badge{
                        position: absolute;
                        top: 0.23rem;
                        right: 0.12rem;
                        background-color: #fff;
                        border: 1px solid #e51616;
                        color: #e51616;
                        padding: 0.04rem 0.1rem;
                    }
                }
            }
            // 列表
            .mui-slider-group{
                top: 1rem;
                padding-bottom: 50px;
                .mui-table-view{
                    background-color: #efefef;
                    .mui-table-view-cell{
                        padding: 0;
                        margin-bottom: 0.2rem;
                        background-color: #fff;
                        .order-details-header{
                            height: 1rem;
                            line-height: 1rem;
                            text-align: left;
                            padding: 0 0.28rem;
                            background-color: #f9f9f9;
                            .img-small{
                                width: .41rem;
                                height: .37rem;
                                margin-top: 0.27rem;
                            }
                            .text-content{
                                font-size: .28rem;
                                font-weight: bold;
                                color: #333333;
                                padding-left: .4rem;
                            }
                            .dai{
                                font-size: .28rem;
                                color: #666666;
                            }
                        }
                        // 内容区域
                        .order-details-content{
                            padding: 0.28rem 0.28rem;
                            .contain{
                                width: 100%;
                                display: flex;
                                justify-content: space-between;
                            }
                            .content-left{
                                width: 30%;
                                .img-big{
                                    width: 100%;
                                }
                            }
                            .content-right{
                                width: 70%;
                                display: flex;
                                flex-direction: column;
                                height: 100%;
                                .content-right-text{
                                    font-size: .28rem;
                                    color: #333333;
                                    height:1rem;
                                    margin-bottom: .2rem;;
                                    line-height: .4rem;
                                    text-align: left;
                                    overflow: hidden;
                                    font-weight: bold;
                                    padding-left: .2rem;
                                    padding-right: .2rem;
                                }
                                .productAttr{
                                    padding-left: .2rem;
                                    text-align: left;
                                }
                                .pricec{
                                    width: 100%;
                                    display: flex;
                                    flex-direction: row;
                                     .right-red{
                                        color: #e51616;
                                        font-size: .34rem;
                                        font-weight: bold;
                                        padding-left: .2rem;
                                        display: inline-block;
                                        width: 50%;
                                        text-align: left;
                                    }
                                    .right-grey{
                                        color: #666666;
                                        font-size: .28rem;
                                        font-weight: bold;
                                        display: inline-block;
                                        width: 50%;
                                        text-align: right;
                                    }
                                }

                            }
                            // 赠品
                            .Gift{
                                text-align: left;
                                padding: 0.2rem;
                                color: #e51616;
                                font-size: 0.28rem;
                                font-weight: bold;
                                background-color: #f9f9f9;
                                ul{
                                    li{
                                        height: 0.8rem;
                                        padding-bottom: 0.1rem;
                                        display: flex;
                                        justify-content: space-between;
                                        align-items: center;
                                        img{
                                            width: 0.6rem;
                                            vertical-align: middle;
                                            margin-right: 0.2rem;
                                        }
                                    }
                                }
                                span{
                                    color: #666;
                                    font-weight: normal;
                                }
                            }
                            .orderlist{
                                font-size: .28rem;
                                color: #666666;
                            }
                            // 全部的商品共计在右侧
                            .atherDiv{
                                 text-align: right;
                            }
                        }
                        // 确认订单
                        .confirm{
                            margin-top: 0.2rem;
                            padding-top: 0.3rem;
                            border-top: 1px solid #dcdcdc;
                            text-align: right;
                            span{
                                padding: 0.05rem 0.2rem;
                                border: 1px solid #bbbbbb;
                                border-radius: .5rem;
                                font-size: .28rem;
                                color: #333333;
                                font-weight: bold;
                            }
                            .threeWu{
                                margin-right: 0.25rem;
                            }
                            .shou{
                                color: #e51616;
                                border: 1px solid #e51616;
                                margin-left: .25rem;
                                .payMoney{
                                    color: #e51616;
                                }
                            }
                        }
                    }
                }
            }

            // 退款售后  标记
            .afterSealDiv{
                text-align: left;
                img{
                    width: .37rem;
                    height:.46rem;
                    vertical-align: middle;
                }
            }
            // 加载更多按钮
            .loadingMore{
                margin-bottom: 1rem;
               button{
                   width: 80%;
               }
            }
    }
    // 选择支付方式模态框
    #picture{
        .foot{
            margin: 0;
            background-color: #e51616;
            .mui-table-view-cell{
                padding: 0;
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
                padding: 0.25rem 0;
                background-color: #fff;
                width: 100%;
                height: 7rem;
                .mui-icon-closeempty{
                    position: absolute;
                    right: 0.28rem;
                    top: 0.28rem;
                    font-size: 0.7rem;
                    color: #333;
                }
                h3{
                    color: #151515;
                    font-size: 0.3rem;
                    font-weight: bold;
                    margin-top: 0.3rem;
                }
                .mui-table-view-cell{
                    padding: 0;
                    a{
                        text-align: left;
                        width: 100%;
                        margin: 0;
                        padding: 0.28rem;
                        font-size: 0.32rem;
                        color: #151515;
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