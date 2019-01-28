<template>
    <div class="info">
        <header id="header" class="mui-bar mui-bar-nav header">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">组合活动确认订单</h1>
        </header>
        <!-- 内容 -->
        <div class="mui-content">
             <!-- 新建收货地址 -->
            <ul class="mui-table-view">
                <router-link to="/defaultAddress" tag="li" class="mui-table-view-cell" v-if="userData == null">
                    <a class="selectedB mui-navigate-right">新建收货地址</a>
                </router-link>
                <router-link to="/defaultAddress" tag="li" class="mui-table-view-cell" v-if="userData !== null && address == null">
                    <a class="selectedA mui-navigate-right">
                        <p class="contact">{{userData.name}}:{{userData.mobile}}</p>
                        <p class="contactAddress mui-ellipsis-2"><span class="mui-icon mui-icon-location mui-pull-left"></span>{{ userData.area}}{{userData.address}}</p>
                    </a>
                </router-link>
                <router-link to="/defaultAddress" tag="li" class="mui-table-view-cell" v-if="address !== null">
                    <a class="selectedA mui-navigate-right">
                        <p class="contact">{{address.name}}:{{address.mobile}}</p>
                        <p class="contactAddress mui-ellipsis-2"><span class="mui-icon mui-icon-location mui-pull-left"></span>{{ address.area}}{{address.address}}</p>
                    </a>
                </router-link>
            </ul>    
            <!-- 详情 -->
            <ul class="mui-table-view mui-table-Info">
                <li class="mui-table-view-cell" v-for="item in dataList" :key="item.product_id">
                    <div class="mui-table">
                        <div class="mui-table-cell mui-col-xs-10" >
                            <div class="mui-pull-left imgInfo"><img :src="item.thumb" alt=""></div>
                            <h3 class="mui-span">{{ item.title }}</h3>
                            <div class="price_num">
                                <span class="price">￥{{ item.price }}</span>
                                <span class="num mui-pull-right">x{{ item.count * groupCount}}</span>
                                <!-- <p v-if="dataList.product_attr !== '' " style="text-align: left;">规格:{{dataList.product_attr}} </p> -->
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <!-- 赠品 -->
            <ul class="mui-table-view mui-table-Info giftDiv">
                <li class="mui-table-view-cell" v-for="item in giftData" :key="item.gift_id">
                    <div class="mui-table">
                        <div class="mui-table-cell mui-col-xs-10" >
                            <div class="mui-pull-left imgInfo"><img :src="item.thumb" alt=""></div>
                            <h3 class="mui-span">{{ item.title }}</h3>
                            <div class="price_num">
                                <span class="price">￥{{ item.price }}</span>
                                <span class="num mui-pull-right">x{{ item.count}}</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <!-- 备注类 -->
             <ul class="mui-table-view otherInfo">
                <!-- <li class="mui-table-view-cell">
                    <a class="mui-navigate-right">优惠券 <span class="mui-pull-right">暂无可用</span></a>
                </li>
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right">配送方式 <span class="mui-pull-right">快递  免邮</span></a>
                </li> -->
                <li class="mui-table-view-cell">
                    <a>
                        买家留言<textarea name="" v-model="remarks"></textarea>
                    </a>
                </li>
            </ul>
            <!-- 商品金额和运费 -->
            <ul class="mui-table-view moneyInfo">
                <li class="mui-table-view-cell">
                    <a>商品金额 
                        <span class="mui-pull-right">￥{{ priceTotal }}</span>
                    </a>
                </li>
                <li class="mui-table-view-cell">
                    <a>运费 
                        <span class="mui-pull-right">￥0</span>
                    </a>
                </li>
            </ul>    
        </div>
        <!-- 底部固定 -->
        <div class="footer">
            <a class="allMoner">合计金额:
                <span>￥</span><span ref="priceTotal">{{ priceTotal }}</span>
            </a>
            <a class="commitOrder" v-if="userData == null" @click="ifAddress">提交订单</a>
            <a href="#picture" class="commitOrder" v-else>提交订单</a>
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
				<li class="mui-table-view-cell" item='2'>
					<a class="mui-navigate-right">微信</a>
				</li>
				<!-- <li class="mui-table-view-cell" item='3'>
					<a class="mui-navigate-right">货到付款</a>
				</li>
                <li class="mui-table-view-cell" item='4'>
					<a class="mui-navigate-right">银行卡支付</a>
				</li>
                <li class="mui-table-view-cell" item='5'>
					<a class="mui-navigate-right">预付款支付</a>
				</li> -->
			</ul>
           </div>
			<ul class="mui-table-view foot">
				<li class="mui-table-view-cell">
					<a href="#picture" @click="surePayOrder"><b>确定支付</b></a>
				</li>
			</ul>
		</div> 
    </div>    
</template>

<script>
    import { userInfo, IndexAddress , b2bCombinationOrder , b2bAliPay ,b2bWechatPay} from '../../../../api/index.js'
    import mui from '../../../../../static/mui/js/mui.min.js'
    export default {
        data() {
            return {
                token:'',
                groupId: this.$route.query.groupId,//组合活动id
                groupCount: this.$route.query.groupCount,//组数
                priceTotal: this.$route.query.priceTotal,//总价格
                brandMemberId: this.$route.query.brandMemberId,//品牌商id
                brandPosId: this.$route.query.brandPosId,//业务员id
                userData:[],//用户信息获取
                address:[],//地址信息
                dataList:[],//商品数据
                giftData:[],//赠品信息
                remarks: this.$route.query.conment,//备注
                pay_type:1,
                addressId:'',//地址id
                productIdNUm:'',
                giftIdNUm:'',
            }
        },
        created(){
            this.dataList =  JSON.parse(this.$route.query.submitGoods)
            this.giftData =  JSON.parse(this.$route.query.submitGift)
            this.token = localStorage.getItem('User-Token')
            this.address = JSON.parse(localStorage.getItem('Address'))
            this.getUserInfo()
        },
        mounted(){
            // 选择支付种类
            var that = this
            var list = document.querySelector('.mui-table-view.mui-table-view-radio');
            list.addEventListener('selected',function(e){
                that.pay_type = e.detail.el.getAttribute("item")
            });
            this.goodsAndGift()
        },
        methods:{
            //获取用户信息--如果用户登录了
            getUserInfo(){
                let params = { token: this.token }
                userInfo(params).then(res=>{
                    this.userData = res.data.address
                })
            },
            // 如果没有选择收货地址不能提交订单
            ifAddress(){
                mui.toast('请选择收货地址')
            },
            // 拼接商品和赠品
            goodsAndGift(){
                // 获取商品和赠品
                this.dataList.forEach(item=>{
                   this.productIdNUm += item.product_id + ';' +item.count * this.groupCount +',';
                })
                this.productIdNUm = this.productIdNUm.substr(0, this.productIdNUm.length - 1)
                this.giftData.forEach(item=>{
                   this.giftIdNUm += item.gift_id + ';' +item.count +',';
                })
                this.giftIdNUm = this.giftIdNUm.substr(0, this.giftIdNUm.length - 1)
            },
            surePayOrder(){
                var that = this;
                // 接收价格
                var priceTotalAll = that.$refs.priceTotal.innerText;
                // 接收地址id
                if(that.address){
                    that.addressId = that.address.address_id
                }else{
                    that.addressId = this.userData.address_id 
                }
                
                let params = {
                    product_id_num: that.productIdNUm,
                    gift_id_num: that.giftIdNUm,
                    price_total: priceTotalAll,
                    pay_type:  that.pay_type,//付款方式
                    address_id: that.addressId,
                    brand_member_id: that.brandMemberId,
                    brand_member_pos_id: that.brandPosId,
                    comment: that.remarks,
                    group_id: that.groupId,
                    group_num: that.groupCount,
                }
                b2bCombinationOrder(params).then(res=>{
                    if(res.code !== 0){
                        mui.toast( res.msg,{ duration:1000 })
                    }else{
                        if(that.pay_type == 1){
                            // 调取支付宝支付
                            let param ={
                                order_no : res.data,
                                type: 1,
                            }
                            b2bAliPay(param).then(res=>{
                                const div = document.createElement('div');
                                div.innerHTML = (res.data);  //res.data是返回的表单
                                document.body.appendChild(div);
                                document.forms.alipaysubmit.submit();
                            })
                        }else if(that.pay_type == 2){
                            let param ={
                                order_no : res.data.order_no,
                                type: 1,
                            }
                            b2bWechatPay(param).then(res=>{
                                window.location.href = res.data.mweb_url
                            })
                        }
                        // that.$router.push({name:'paymentB', query:{ price_total: priceTotal} })
                    }
                })
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
    .info{
        position: relative;
    }
    // 新建联系人
    .mui-content{
        padding-top: 50px!important;
        padding-bottom: 100px;
        .mui-table-view{
            margin-top: 0;
            .mui-table-view-cell{
                // 新建收货地址
                .selectedB{
                    height: 1.2rem;
                    padding: 0 0.28rem;
                    line-height: 1.2rem;
                    text-align: left;
                    font-size: 0.32rem;
                    font-weight: bold;
                    color: #151515;
                }
                // 选择收货地址
                .selectedA{
                    padding: 0.28rem;
                    text-align: left;
                    .contact{
                        font-size: 0.32rem;
                        font-weight: bold;
                        color: #151515;
                    }
                    .contactAddress{
                        display: flex;
                        align-items: center;
                        font-size: 0.28rem;
                        color: #666;
                        padding: 0.2rem 0.3rem 0 0;
                    }
                }
            }
        }
        // 商品信息类
        .mui-table-Info{
            margin-top: 0.2rem;
            .mui-table{
                .imgInfo{
                    width: 1.7rem;
                    margin-right: 0.28rem;
                    img{
                       width: 100%;
                    }
                }
                h3{
                    font-size: 0.28rem;
                    line-height: 1.3;
                    text-align: left;
                    color: #151515;
                    margin-bottom: 0.28rem;
                }
                .price_num{
                    text-align: left;
                    .price{
                        color: #ff2400;
                        font-weight: bold;
                        font-size: 0.32rem;
                    }
                    .num{
                        color: #666;
                        font-weight: bold;
                        font-size: 0.32rem;
                    }
                }
            }
        }
        //赠品
        .giftDiv{
            margin-top: 0;
            .mui-table{
                .imgInfo{
                    width: 1rem;
                    margin-right: 0.28rem;
                    img{
                       width: 100%;
                    }
                }
                h3{
                    margin-bottom: 0;
                }
            }    
        }
        // 其他类
        .otherInfo{
            margin-top: 0.2rem;
            .mui-table-view-cell{
                a{
                    height: 1.2rem;
                    padding: 0 0.28rem;
                    line-height: 1.2rem;
                    text-align: left;
                    font-weight: bold;
                    color: #151515;
                    font-size: 0.28rem;
                    span{
                        font-size: 0.28rem;
                        margin-right: 0.35rem;
                        color: #333;
                    }
                    textarea{
                        font-size: 0.28rem;
                        font-weight: normal;
                        color: #999;
                        width: 80%;
                        height: 1.2rem;
                        padding: 0.38rem 0.2rem;
                        margin-bottom: 0;
                        vertical-align: top;
                        border: 0;
                    }
                }
            }
        }
        .moneyInfo{
            margin-top: 0.2rem;
            .mui-table-view-cell{
                a{
                    font-weight: normal;
                    height: 1.2rem;
                    padding: 0 0.28rem;
                    line-height: 1.2rem;
                    font-size: 0.28rem;
                    text-align: left;
                    color: #151515;
                }
            }    
        }
    }
    // 底部
    .footer{
        position: fixed;
        right: 0;
        left: 0;
        bottom: 0;
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        background-color: #fff;
        .allMoner{
            width: 60%;
            display: block;
            color: #333;
            font-size: 0.34rem;
            span{
                color: #ff2400;
            }
        }
        .commitOrder{
            width: 40%;
            height: 100%;
            color: #fff;
            font-size: 0.3rem;
            position: absolute;
            right: 0;
            bottom: 0;
            background-color: #ff2400;
        }
    }
    // 选择属性模态框
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