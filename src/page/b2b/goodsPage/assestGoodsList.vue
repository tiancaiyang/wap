<template>
    <div>
        <!-- b2b根据分类选品牌头部 -->
        <header id="header" class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{ title }}</h1>
        </header>
         <div class="mui-content">
            <div id="slider" class="mui-slider mui-fullscreen">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper topScroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll   tapScroll">
						<a class="mui-control-item" v-for="item in topData" :key="item.check_id" @tap="changeCheckId(item.check_id)">
							{{ item.name }}
						</a>
					</div>
                    <div class="screen">
                        <ul>
                            <li :class="screenStyle1 ? 'screenLi': ''" @click="changecreen1">综合</li>
                            <li :class="screenStyle2 ? 'screenLi': ''" @click="changecreen2">销量</li>
                            <li class="screenPriceDiv" :class="screenStyle3 ? 'screenLi': ''">
                               价格
                               <div class="screenPrice">
                                   <span :class=" flagPriceA ? 'flagPriceA':''" @click="getPriceAdd"></span>
                                   <span :class="flagPriceM ? 'flagPriceM':''" @click="getPriceM"></span>
                               </div>
                            </li>
                            <li :class="screenStyle4 ? 'screenLi': ''" @click="changecreen5">新品</li>
                        </ul>
                    </div>
				</div>
				<div class="mui-slider-group">
					<div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
						<div id="scroll1" class="mui-scroll-wrapper ListInfoWrapper">
							<div class="mui-scroll">
								<ul class="mui-table-view">
									<li class="mui-table-view-cell" v-for="items in productList" :key="items.index">
										<router-link :to="'/shopdetailB/' + items.product_id" tag="a">
                                            <span class="activeIcon" v-if="items.activity_type == 1">特价</span>
                                            <img :src="items.thumb" alt=""> 
                                            <div class="listInfo">
                                                <h4 class="mui-ellipsis-2">{{ items.title }}</h4>
                                                <p class="price">￥<b>{{ items.price }}</b> <span class="mui-pull-right">已售{{ items.sale }}件</span></p>
                                            </div>
                                        </router-link>
									</li>
								</ul>
                                <!-- 如果没有数据 -->
                                <null-list v-if="productList.length == 0"></null-list>
                                <!-- 加载更多 -->
                                <div class="loadingMore"  v-if="productList.length == 0 || productList.length < 20? false : true" >
                                    <button  class="mui-btn mui-btn-danger mui-btn-outlined" @click="morePage()">加载更多</button>
                                </div>
							</div>
						</div>
					</div>
				</div>
            </div>        

        </div>   

    </div>
</template>

<script>
    import { b2baccressList, b2baccressProductList } from '../../../api/index.js'
    import nullList from '../../../components/nullGoodsList.vue'
    export default {
        data() {
            return {
                cid: this.$route.query.cid,
                type: this.$route.query.type,
                title: this.$route.query.title,
                page: 0,//第一页 0 参数传递
                limit: 20,//每页多少条，默认20 参数传递
                dataLength:'',//数据长度
                checkId: '',//选中头部导航传递参数
                sortType: '',//类型切换
                topData:[], //顶部导航分类数据
                productList: [], //产品列表数据
                flagPriceA:false,
                flagPriceM:false,
                screenStyle1: false,
                screenStyle2: false,
                screenStyle3: false,
                screenStyle4: false,
            }
        },
        created(){
            this.getb2baccressList();
            this.getb2baccresProduct();
        },
        mounted(){
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            }); 
        },
        methods:{
            // 综合
            changecreen1(){
                this.sortType = 1;
                this.screenStyle1 = true;
                this.screenStyle2 = false;
                this.screenStyle3 = false;
                this.screenStyle4 = false;
                this.flagPriceM = false;
                this.flagPriceA = false;
                this.productList = [];
                this.page = 0;
                this.getb2baccresProduct();
                mui('#scroll1').scroll().scrollTo(0,0,0);
            },
            // 销量
            changecreen2(){
                this.sortType = 2;
                this.screenStyle2 = true;
                this.screenStyle1 = false;
                this.screenStyle3 = false;
                this.screenStyle4 = false;
                this.flagPriceM = false;
                this.flagPriceA = false;
                this.productList = [];
                this.page = 0;
                this.getb2baccresProduct();
                mui('#scroll1').scroll().scrollTo(0,0,0);
            },
            // 价格高
            getPriceAdd(){
                this.flagPriceA = !this.flagPriceA;
                this.flagPriceM = false;
                this.sortType = 3;
                this.screenStyle3 = true;
                this.screenStyle2 = false;
                this.screenStyle1 = false;
                this.screenStyle4 = false;
                this.productList = [];
                this.page = 0;
                this.getb2baccresProduct();
                mui('#scroll1').scroll().scrollTo(0,0,0);
            },
            // 价格低
            getPriceM(){
                this.flagPriceM = !this.flagPriceM;
                this.flagPriceA = false;
                this.sortType = 4;
                this.screenStyle3 = true;
                this.screenStyle2 = false;
                this.screenStyle1 = false;
                this.screenStyle4 = false;
                this.productList = [];
                this.page = 0;
                this.getb2baccresProduct();
                mui('#scroll1').scroll().scrollTo(0,0,0);
            },
            // 新品
            changecreen5(){
                this.sortType = 5;
                this.screenStyle4 = true;
                this.screenStyle2 = false;
                this.screenStyle3 = false;
                this.screenStyle1 = false;
                this.flagPriceM = false;
                this.flagPriceA = false;
                this.productList = [];
                this.page = 0;
                this.getb2baccresProduct();
                mui('#scroll1').scroll().scrollTo(0,0,0);
            },
            // 头部导航切换
            changeCheckId(id){
                this.checkId = id;
                this.productList = [];
                this.page = 0;
                this.getb2baccresProduct();
                mui('#scroll1').scroll().scrollTo(0,0,0);
            },
            // 列表头部导航数据
            getb2baccressList(){
                let params = {type: this.type, cid: this.cid, page: this.page, limit: this.limit }
                b2baccressList(params).then(res=>{
                    this.topData = res.data;
                })
            },
            // 商品列表数据
            getb2baccresProduct(){
                let params = {
                        type: this.type, 
                        cid: this.cid, 
                        page: this.page,
                        limit: this.limit,
                        check_id: this.checkId,
                        sort_type: this.sortType,
                    }
                b2baccressProductList(params).then(res=>{
                    this.productList = this.productList.concat(res.data);
                    this.dataLength = res.data.length;
                }) 
            },
            // 加载更多
            morePage(){
                if(this.dataLength < 20){
                    this.dataLength = ''
                    mui.toast('没有更多了')
                }else{
                    this.page++
                    this.getb2baccresProduct()
                }
            },
        },
        components:{
            nullList
        }
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
    ul,li{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .mui-content{
        padding-top: 50px;
            .mui-slider.mui-fullscreen{
               top: 50px; 
               .topScroll-wrapper{
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
                        color: #f00;
                    }
               }
                
            }
            .topScroll-wrapper{
                height: 1rem;
            }
            // 筛选框
            .screen{
                margin-top: 1rem;
                border-top: 1px solid #dcdcdc;
                ul{
                    padding: 0.2rem 0;
                    display: flex;
                    justify-content: space-around;
                    li{
                        width: 1.5rem;
                        height: 0.7rem;
                        line-height: 0.7rem;
                        color: #666;
                        font-size: 0.28rem;
                        background-color: #f5f5f5;
                    }
                    .screenLi{
                        color: #f00;
                    }
                }
                .screenPriceDiv{
                    display: flex;
                    justify-content: center;
                    .screenPrice{
                       display: flex;
                       flex-direction: column;
                       justify-content: center;
                       align-items: center;
                       margin-left: 0.1rem;
                        span{
                            width: 0;
                            height: 0;
                           &:nth-child(1){
                                margin-bottom: 0.05rem;
                                border-right: 0.09rem solid transparent;
                                border-left: 0.09rem solid transparent;
                                border-bottom: 0.12rem solid #979797;
                           }
                           &:nth-child(2){
                                border-right: 0.09rem solid transparent;
                                border-left: 0.09rem solid transparent;
                                border-top: 0.11rem solid #979797;
                           }
                        }
                        .flagPriceA{
                            border-bottom-color: #ff2400!important;
                        }
                        .flagPriceM{
                             border-top-color: #ff2400!important;
                        }
                    }
                }
            }
            // 列表
            .mui-slider-group{
                top: 2.3rem!important;
               .mui-table-view{
                    // padding: 0 0.28rem;
                    background-color: #efefef;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    .mui-table-view-cell{
                        width: 49%;
                        text-align: left;
                        background-color: #fff;
                        margin-bottom: 0.25rem;
                        padding: 0 0.25rem 0.25rem;
                        a{
                            padding-top: 0.6rem;
                            position: relative;
                            // 活动图标
                            .activeIcon{
                                position: absolute;
                                right: 0;
                                background-color: #f42c26;
                                height: 0.4rem;
                                line-height: 0.44rem;
                                color: #fff;
                                font-size: 0.25rem;
                                padding: 0 0.15rem;
                                border-radius: 0.4rem;
                            }
                            img{
                                width: 100%;
                                height: 2.8rem;
                            }
                            .listInfo{
                                h4{
                                    color: #222;
                                    font-size: 0.28rem;
                                    font-weight: bold;
                                }
                                p{
                                    color: #e51616;
                                    font-size: 0.3rem;
                                    font-weight: normal;
                                    b{
                                        font-size: 0.28rem;
                                    }
                                    span{
                                        color: #999;
                                        font-size: 0.28rem;
                                    }
                                }
                            }
                        }
                    }
               }        
            }
            .mui-slider .mui-segmented-control.mui-segmented-control-inverted~.mui-slider-group .mui-slider-item{
                border-top: 0;
                border-bottom: 0;
            } 
            // 加载更多按钮
            .loadingMore{
                margin-bottom: 1rem;
                button{
                    width: 80%;
                }
            } 
    }            
</style>