<template>
    <div>
        <header id="header" class="mui-bar mui-bar-nav header">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">订单详情</h1>
        </header>
        <!-- 卖家已发货 -->
        <div  class="set">
            <ul>
                <li class="big">{{ orderInfo.order_status | orderStatus }}</li>
                <!-- <li class="small">还剩7天2时自动确认</li>    -->
            </ul>
        </div>
        <!-- 商品详情 -->
        <div class="mui-content">
		    <ul>
		        <li class="goodsInfo">
                    <router-link :to="'/shopdetailB/' + item.product_id" tag="div" class="goodsDiv mui-clearfix"  v-for="item in orderInfo.product" :key="item.order_id">
                        <div class="goodsInfoImg mui-pull-left">
                            <img :src="item.thumb"  alt="">
                        </div>    
                        <div class="goodsInfoProduct">
                            <h3>{{ item.title }}</h3>
                            <div class="priceNum">
                                <span class="red mui-pull-left">￥{{ item.price }}</span>
                                <span class="grey mui-pull-right">x{{ item.num }}</span>
                            </div> 
                        </div>
                    </router-link>
                    <div class="Gift" v-if="this.giftsData.length == 0 ? false : true">
                        赠品:
                        <ul>
                            <li v-for="(data,i) in giftsData" :key="i">
                                <span>{{ data.title }}</span>
                                <div>
                                    <img :src="data.thumb" alt="">
                                    <span>x {{ data.num }}</span>
                                </div>
                            </li>
                        </ul> 
                    </div>
                    <div class="brandName mui-clearfix">
                        <img class="mui-pull-left" src="../../../assets/images/b2c/details/house_06.png" alt="">
                        <h3 @click="BrandHref" class="brand-store">{{ orderInfo.brand_store_name }}</h3>
                     </div>
		        </li>
		    </ul>
		</div>
        <!-- 订单信息 -->
        <div class="mui-content orderData">
		    <ul class="mui-table-view mui-clearfix">
		        <li class="mui-table-view-cell">
                    实付款 <span class="mui-pull-right price">{{ orderInfo.price_total}}</span>
		        </li>
                <li class="mui-table-view-cell">
                    买家留言 <span class="mui-pull-right">{{ orderInfo.comment}}</span>
		        </li>
                <!-- 收货地址 -->
                <li class="mui-table-view-cell" v-if="orderAddress!== null ? true : false">
                    <div class="addressDiv">
                        <img src="../../../assets/images/b2c/details/house_11.png" alt="">
                        <div class="box">
                            <p class="name"><span>收货人：{{ orderAddress.name}}</span> <b class="mui-pull-right">{{ orderAddress.mobile}}</b></p>
                            <p class="address">收货地址：{{ orderAddress.address}}{{ orderAddress.area}}</p>
                        </div>
                    </div>
		        </li>
                <!-- 订单编号 -->
                <li class="mui-table-view-cell">
		            <div class="orderNmuber">
                        <p>订单编号: <span>{{ orderInfo.trade_no }}</span></p>
                        <p>交易单号: <span>{{ orderInfo.order_no }}</span></p>
                        <p>下单时间: <span>{{ orderInfo.create_time }}</span></p>
                        <p>支付方式: <span>{{ orderInfo.pay_type | payType }}</span></p>
		            </div>
		        </li>
		    </ul>
		</div>
    </div>
</template>

<script>
    import { b2bOrderInfo } from '../../../api/index.js'
    export default {
        data() {
            return {
                orderNo:  this.$route.params.orderNo,
                orderInfo:[],//订单详情列表
                orderAddress:[],//地址
                giftsData:[],//赠品
            }
        },
        created(){
            this.getOrderInfo();
        },
        methods:{
            // 获取数据
            getOrderInfo(){
                let params = { order_no: this.orderNo }
                b2bOrderInfo(params).then(res=>{
                    this.orderInfo = res.data
                    this.giftsData = res.data.gifts
                    this.orderAddress = res.data.address
                    console.log(res.data)
                })
            },
            // 进入店铺
            BrandHref(){
                this.$router.push({ name: 'brandNameListB', query:{ cid:this.orderInfo.brand_member_id,  title:this.orderInfo.brand_store_name } })
            }
        },
        filters:{
            // 不同状态展示不同文字
            orderStatus(order_status){
                var res = ''
                if(order_status == 6){
                    res = '退款'
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
            //支付方式
            payType(num){
                var res = ''
                if(num == 1){
                    res = '支付宝'
                }else if(num == 2){
                    res = '微信'
                }else if(num == 3){
                    res = '银行卡'
                }else if(num == 4){
                    res = '货到付款'
                }
                return res;
            }
        },
    }
</script>

<style scoped lang="less">
    ul,li{
        list-style: none;
        padding: 0;
        margin: 0;
    }
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
        font-weight: bold;
        height: @headerHeight;
        line-height: @headerHeight;
      }
    }
    // 订单状态
    .set{
        background: #ff5500;
        margin-top: 50px;
        width: 100%;
        height: 1.3rem;
        line-height: 1.3rem;
        text-align: left;
        ul,li{
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .big{
            font-size: 0.36rem;
            color: #fff;
            font-weight: bold;
            padding-left: 0.5rem;
        }
        .small{
            font-size: .24rem;
            color: #fff;
        }

    }
    // 商品信息
    .mui-content{
        padding-top: 0!important;
        margin-bottom: 0.2rem;
        .goodsInfo{
            background-color: #fafafa;
            .goodsDiv{
                width: 100%;
                padding: 0.28rem;
                .goodsInfoImg{
                    width: 1.8rem;
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
            .brandName{
                background-color: #fff;
                padding: 0.28rem;
                text-align: left;
                img{
                    width: 0.5rem;
                }
                .brand-store{
                    font-size: 0.28rem;
                    color: #333;
                    padding: 0.04rem  0.28rem 0;
                }
            }
        }
        
        
    }
    // 订单信息
    .orderData{
        margin-bottom: 50px;
        .mui-table-view{
            .mui-table-view-cell{
                padding: 0.3rem 0.28rem;
                text-align: left;
                .price{
                    color: #f00;
                    font-weight: bold;
                }
            }
        }
    }
    // 收货人
    .addressDiv{
        display: flex;
        align-items: center;
        img{
            width: 0.45rem;
        }
        .box{
            width: 100%;
            text-align: left;
            p{
                font-weight: bold;
                color: #666;
                font-size: 0.28rem;
            }

        }

    }
    // 订单编号
    .orderNmuber{
        text-align: left;  
    }  
</style>