<template>
   <div>    
        <!-- b2c根据分类选品牌  头部 -->
        <header id="header" class="mui-bar mui-bar-nav header">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{ title }}</h1>
        </header>
         <!-- 选项卡 -->
         <div class="mui-content">
            <div id="slider" class="mui-slider mui-fullscreen">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper topScroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
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
                            <li><a href="#picture">品牌</a></li>
                        </ul>
                    </div>
				</div>
				<div class="mui-slider-group">
					<div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
						<div id="scroll1" class="mui-scroll-wrapper ListInfoWrapper">
							<div class="mui-scroll">
								<ul class="mui-table-view">
									<li class="mui-table-view-cell" v-for="items in productList" :key="items.index">
										<router-link :to="'/shopdetailC/' + items.product_id" tag="a">
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

         <!-- 选择品牌分类模态框 -->
        <div id="picture" class="mui-popover">
            <div class="selectModel">
                <div class="mui-scroll-wrapper scrollDiv">
				    <div class="mui-scroll">
                        <ul class="mui-table-view mui-table-view-radio ">
                            <li class="mui-table-view-cell" v-for="item in topData" :key="item.check_id">
                                <a class="mui-navigate-right" @click="changeCheckId(item.check_id)">{{ item.name }}</a>
                            </li>
                        </ul>
                    </div>
			    </div> 
                <ul class="mui-table-view foot">
                    <li class="mui-table-view-cell footLIF">
                        <a href="#picture" @click="closeCheckId()"><b>取消</b></a>
                    </li>
                    <li class="mui-table-view-cell footLIS">
                        <a href="#picture" @click="getb2caccresProduct()"><b>确认</b></a>
                    </li>
                </ul>    
            </div>
		</div>  
    </div>
</template>

<script>
    import { b2caccressList, b2caccressProductList } from '../../../api/index.js'
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
            this.getb2caccressList()
            this.getb2caccresProduct()
        }, 
        mounted(){
            this.isactive=true;
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
                this.getb2caccresProduct();
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
                this.getb2caccresProduct();
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
                this.getb2caccresProduct();
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
                this.getb2caccresProduct();
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
                this.getb2caccresProduct();
                mui('#scroll1').scroll().scrollTo(0,0,0);
            },
            // 品牌id切换
            changeCheckId(id){
                this.productList = [];
                this.page = 0;
                this.checkId = id;
                mui('#scroll1').scroll().scrollTo(0,0,0);
            },
            closeCheckId(){
                this.checkId = '';
                this.productList = [];
                this.page = 0;
                this.getb2caccresProduct()
            },
            // 列表头部导航数据
            getb2caccressList(){
                let params = {type: this.type, cid: this.cid, page: this.page, limit: this.limit }
                b2caccressList(params).then(res=>{
                    this.topData = res.data;
                })
            },
            // 商品列表数据
            getb2caccresProduct(){
                let params = {
                        type: this.type, 
                        cid: this.cid, 
                        page: this.page,
                        limit: this.limit,
                        check_id: this.checkId,
                        sort_type: this.sortType,
                    }
                b2caccressProductList(params).then(res=>{
                    this.productList = this.productList.concat(res.data);
                    console.log(this.productList)
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
                    this.getb2caccresProduct()
                }
            },
            
           
        },
        components:{
            nullList
        }

    }
</script>

<style scoped  lang="less">
    .header{
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
                background-color: #efefef;
                // 筛选框
                .screen{
                    border-top: 1px solid #faf7f7;
                    ul{
                        padding: 0.2rem 0;
                        display: flex;
                        justify-content: space-around;
                        background-color: #fff;
                        li{
                            width: 1.4rem;
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
                  top: 1.2rem!important;
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
                            a{
                                margin: 0;
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
                                    max-width: 100%;
                                }
                                .listInfo{
                                    padding: 0 0.25rem 0.25rem;
                                    h4{
                                        color: #222;
                                        font-size: 0.28rem;
                                        font-weight: bold;
                                        padding-top: 0.1rem;
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
                        .mui-table-view-cell:after{
                            height: 0;
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
    // 选择属性模态框
    #picture{
        height: 50%;
        width: 100%;
        left: 0!important;
        .mui-scroll-wrapper{
            margin-bottom: 1rem;
        }
        .foot{
            position: absolute;
            bottom: 0.2rem;
            left: 10%;
            right: 10%;
            margin: 0.2rem 0 0;
            .mui-table-view-cell{
                padding: 0;
                border-radius: 8px;
                a{
                    padding: 0.15rem 0.28rem;
                    display: block;
                    font-size: 0.32rem;
                    margin: 0;
                    background-color: #e51616;
                    height: 0.8rem;
                    b{
                        color: #fff;
                        font-weight: normal;
                    }
                }
            }
            .footLIF{
                float: left;
                a{
                    background-color: #ececec;
                    b{
                        color: #666;
                    }
                }
            } 
            .footLIS{
                float: right;
            }
        }
        .selectModel{
            padding: 0.25rem 0;
            background-color: #fff;
            width: 100%;
            .scrollDiv{
                .mui-table-view{
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                   .mui-table-view-cell{
                        padding: 0;
                        width: 50%;
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
                }
                .mui-navigate-right:after, .mui-push-right:after{
                    background-color: #f00;
                    color: #fff;
                    border-radius: 50%;
                    font-size: 0.4rem;
                }
            }
                
        }
    } 
</style>