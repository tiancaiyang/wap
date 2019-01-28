<template>
    <div>
        <!-- 头部 -->
        <header id="header" class="mui-bar mui-bar-nav header">
          <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
          <h1 class="mui-title" v-if="orderData.refund_type == 1">退货退款详情</h1>
          <h1 class="mui-title" v-if="orderData.refund_type == 2">退款详情</h1>
        </header>
        <!-- 发货 -->
        <div  class="set">
            <ul>
                <!-- 退货退款 -->
                <li class="big" v-if="orderData.refund_type == 1">{{ orderData.refund_status | orderStatus1 }}</li>
                <!-- 仅退款 -->
                <li class="big" v-if="orderData.refund_type == 2">{{ orderData.refund_status | orderStatus2 }}</li>
                <li class="small" v-if="orderData.refund_status == 0 || orderData.refund_status == 3">剩余{{ orderData.res_day }}天{{ orderData.res_hour }}时{{ orderData.res_min }}分</li>      
                <!-- <li class="small" v-if="orderData.refund_status == 0"></li>       -->
            </ul>
        </div>
        <!-- 退款 -->
        <div class="tui">
            退款总金额<span class="mui-pull-right">￥{{ orderData.refund_amount }}</span>
            <!-- 仅退款，未处理 -->
            <div class="tuiMessage" v-if="orderData.refund_type == 2 && orderData.refund_status == 0">
                <p class="tuiStatus">您已成功发起退款申请，请耐心等待商家处理。</p>
                <p>如果商家同意或者超时未处理，将自动退款给您</p>
                <p>如果商家拒绝，您可以投诉或者联系商家进行协商处理。</p>
            </div>
            <!-- 仅退款，卖家同意退款 -->
            <div class="tuiMessage" v-if="orderData.refund_type == 2 && orderData.refund_status == 3">
                <p class="tuiStatus">卖家同意了本次售后服务申请。</p>
                <p>如果商家同意或者超时未处理，将自动退款给您</p>
            </div>
            <!-- 仅退款，卖家拒绝退款 -->
            <div class="tuiMessage" v-if="orderData.refund_type == 2 && orderData.refund_status == 2">
                <p class="tuiStatus">卖家拒绝了本次售后服务申请。</p>
                <p>拒绝原因：{{ orderData.refuse_reason}}</p>
            </div>

            <!-- 退货退款，未处理 -->
            <div class="tuiMessage" v-if="orderData.refund_type == 1 && orderData.refund_status == 0">
                <p class="tuiStatus">您已成功发起退货退款申请，请耐心等待商家处理。</p>
                <p>如商家拒绝，您可修改申请，卖家会重新处理</p>
                <p>如果商家拒绝，您可以投诉或者联系商家进行协商处理。</p>
            </div>
            <!-- 退货退款，卖家同意申请，待退货 -->
            <div class="tuiMessage" v-if="orderData.refund_type == 1 && orderData.refund_status == 3">
                <p class="tuiStatus">卖家同意了本次售后服务申请。</p>
                <p>退货地址：{{ orderData.refund_address}}</p>
                <p>说明：退货完成后请点击“退货”填写物流信息，逾期未填，申请关闭。</p>
            </div>
            <!-- 退货退款，卖家拒绝退货退款 -->
            <div class="tuiMessage" v-if="orderData.refund_type == 1 && orderData.refund_status == 2">
                <p class="tuiStatus">卖家拒绝了本次售后服务申请。</p>
                <p>拒绝原因：{{ orderData.refuse_reason}}</p>
            </div>
            <!-- 退货退款，已提交物流单号 -->
            <div class="tuiMessage" v-if="orderData.refund_type == 1 && orderData.refund_status == 4">
                <p class="tuiStatus">您已成功提交物流单号，请耐心等待商家处理。</p>
                <p>商家收到货物后会进行退款。如果商家同意或者超时未处理，将自动退款给您。</p>
            </div>
            
            <!-- 当商家已经退款或者退货完成了status为1就不显示按钮 -->
            <div class="confirm" v-if="orderData.refund_status == 1? false:true">
                
                <span class="wu" v-if="orderData.refund_type != 1 || orderData.refund_status != 3" @click="complain">投诉</span>
                <span class="wu threeWu" v-if="orderData.refund_type != 1 || orderData.refund_status != 4" @tap="closeReturn">撤销申请</span>
                <span class="shou" v-if="orderData.refund_type != 1 || orderData.refund_status != 3" @click="contactSeller">联系卖家</span> 
                 <!-- 当商家已同意退款退货了，就填写物流单号 -->
                <span class="wu threeWu" v-if="orderData.refund_type == 1 && orderData.refund_status == 3" @click="contactSeller">联系卖家</span>
                <router-link :to="'/logisticsc/'+ this.orderNo +'/'+this.id" tag="span" class="shou" v-if="orderData.refund_type == 1 && orderData.refund_status == 3">退货</router-link>
            </div>
        </div>
          <!-- 详情 -->
        <div class="mui-content">
		    <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
		        <li class="mui-table-view-cell"  v-for="item in orderData.product" :key="item.product_id">
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-10">
                            <div class="infoheader">
                                <img class="img-small mui-pull-left" src="../../../assets/images/b2c/evaluatec/yao_03.png"/>
                                <span class="text-content">{{ orderData.brand_store_name }}</span>
                            </div>
                            <div class="mui-pull-left"><img :src="item.thumb" class="ni" alt=""></div>
		                    <h3 class="mui-span">{{ item.title }}</h3>
		                    <div class="mui-h6 mui-ellipsis" id="mui">
                                <div class="red-class"><span class="red">￥{{ item.price }}</span></div>
                                <div class="grey-class"><span class="grey">x{{ item.num }}</span></div>  
                            </div>
		                </div>
		            </div>
		        </li>
		    </ul>
		</div>
        <!-- 退款原因 -->
        <div class="message">
            <p v-if="orderData.refund_type == 2">退款原因：<span>{{ orderData.refund_reason }}</span></p>
            <p v-if="orderData.refund_type == 2">退款说明：<span>{{ orderData.comment }}</span></p>
            <p v-if="orderData.refund_type == 1">退货原因：<span>{{ orderData.refund_reason }}</span></p>
            <p v-if="orderData.refund_type == 1">退货说明：<span>{{ orderData.comment }}</span></p>
            <p>退款金额：<span>￥{{ orderData.refund_amount }}</span></p>
            <p>申请时间： <span>{{ orderData.create_time }}</span></p>
            <p v-if="orderData.refund_type == 2">退款编号：<span>{{ orderData.refund_no }}</span></p>
            <p v-if="orderData.refund_type == 1">退货编号：<span>{{ orderData.refund_no }}</span></p>
        </div>
    </div>
</template>

<script>
import { b2cOrderReturnShopInfo ,CloseReturnShop} from "../../../api/index.js";
export default {
    data() {
        return {
            orderNo: this.$route.params.orderNo,
            id: this.$route.params.id,
            type: 2,//订单类型：1：B2B；2：B2C
            orderData:[],//订单数据
        };
    },
    created() {
        this.getReturnInfo();
    },
    filters:{
        // 不同状态展示不同文字--退货退款
        // B2C 0=未处理1=已退款2=申请被拒绝3=申请通过4=已提交物流信息5=商户自行取消申请6=退款中 ,
        orderStatus1(refund_status){
            var res = ''
            if(refund_status == 0){
                res = '未处理'
            }else if(refund_status == 1){
                res = '已退款退货'
            }else if(refund_status == 2){
                res = '拒绝退款退货'
            }else if(refund_status == 3){
                res = '申请通过'
            }else if(refund_status == 4){
                res = '已提交物流单号'
            }else if(refund_status == 5){
                res = '商户自行取消申请'
            }else if(refund_status == 6){
                res = '退款中'
            }
            return res;
        },
        // 不同状态展示不同文字 --仅退款
        orderStatus2(refund_status){
            var res = ''
            if(refund_status == 0){
                res = '未处理'
            }else if(refund_status == 1){
                res = '已退款'
            }else if(refund_status == 2){
                res = '拒绝退款'
            }else if(refund_status == 3){
                res = '申请通过'
            }else if(refund_status == 5){
                res = '商户自行取消申请'
            }else if(refund_status == 6){
                res = '退款中'
            }
            return res;
        }
    },
    methods: {
        getReturnInfo() {
            let params = {
                order_no: this.orderNo,
                detail_id: this.id,
                type: this.type
            };
            b2cOrderReturnShopInfo(params).then(res => {
                this.orderData = res.data
                console.log(res)
            });
        },
        // 撤销申请
        closeReturn( ){
            var that = this
            mui.confirm('您确定要撤销申请吗？','提示','',function(e){
                if(e.index == 1) {
                    let params = {order_no : that.orderNo , type:that.type,detail_id: that.id }
                    CloseReturnShop(params).then(res=>{
                        if(res.code == 0){
                            mui.toast('撤销成功')
                            // 应该再次刷新下页面
                        }
                    })
                }
            })
            
        },
        // 投诉
        complain(){
            mui.confirm('0371-67618866','提示','')
        },
        // 联系卖家
        contactSeller(){
            mui.confirm( this.orderData.mobile,'提示','')
        }
    }
};
</script>

<style scoped lang="less">
//  头部
#header {
  @headerBg: #fff;
  @headerHeight: 50px;
  background: @headerBg;
  height: @headerHeight;
  .mui-pull-left {
    height: @headerHeight;
    line-height: 32px;
    color: #333;
  }
  .mui-title {
    color: #333;
    font-weight: bold;
    height: @headerHeight;
    line-height: @headerHeight;
  }
  .mui-pull-right {
    height: @headerHeight;
    line-height: 50px;
    color: #333;
  }
}
// 店铺名称
.infoheader{
    height: 0.8rem;
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
        color: #333;
        padding-left: .2rem;
    }
}
// 退款完成
    ul{
        li {
            list-style: none;
            margin: 0;
            padding: 0;
        }
    } 
    .set {
        background: #ff5500;
        width: 100%;
        height: 1.2rem;
        margin-top: 50px;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: center;    
    }
    .big {
        font-size: 0.36rem;
        color: #ffffff;
        font-weight: bold;
    }
    .small {
        font-size: 0.24rem;
        color: #ffffff;
    }
    .tui {
        text-align: left;
        background: #fff;
        font-size: 0.35rem;
        color: #151515;
        padding:  0.28rem;
        span {
            font-weight: bold;
        }
        .tuiMessage{
            padding-top: 0.28rem;
            p{
                margin-bottom: 0;
            }
        }
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
                margin-left: 0.25rem;
            }
            .shou{ 
                color: #e51616;
                border: 1px solid #e51616;
                margin-left: .25rem
            }
        }
    }

//  详情
.mui-content{
    padding-top: 0;
    margin-bottom: 0.2rem;
    .mui-table-view::after {
        height: 0;
    }
    .mui-table-view::before {
        height: 0;
    }
    .mui-table-view{
        padding: 0 0.28rem 0.28rem;
    }
    .mui-span {
        color: #151515;
        font-size: 0.28rem;
        text-align: left;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
        line-height: 0.4rem;
    }
    #mui {
        display: flex;
        flex-direction: row;
    }
    #mui span b {
        display: inline-block;
    }
    .mui-h6 div {
        width: 2rem;
        height: 0.5rem;
        width: 50%;
    }

    .mui-h6 div span {
        font-weight: bold;
        margin: -0.1rem 0.1rem 0 0;
        text-decoration: none;
    }
}
.red {
  color: #ff2400;
  font-size: 0.36rem;
  font-weight: bold;
}
.red2 {
  color: #ff2400;
  font-size: 0.24rem;
}
.grey {
  color: #666666;
  font-size: 0.28rem;
  font-weight: bold;
  text-align: right;
}
.grey-class {
  text-align: right;
}
.red-class {
  text-align: left;
}
.ni {
  width: 1.71rem;
  height: 1.41rem;
  padding-right: 0.2rem;
  box-sizing: border-box;
}

// 退款原因
.message {
  width: 100%;
  height: auto;
  background: #ffffff;
  display: flex;
  flex: 1;
  flex-direction: column;
  border-bottom: 1px solid #f3f3f3;
  padding-top: 0.28rem;
}
.message p {
  text-align: left;
  width: 100%;
  line-height: 0.6rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  color: #151515;
  font-size: 0.32rem;
}
</style>