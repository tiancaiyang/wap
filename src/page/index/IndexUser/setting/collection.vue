<template>
    <div>
        <!-- 头部 -->
        <header id="header" class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">收藏列表</h1>
        </header>
         <div class="mui-content">
            <div id="slider" class="mui-slider mui-fullscreen">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper topScroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a  class="mui-control-item mui-active" @tap="goodsCollection">
                            商品收藏
						</a>
						<a  class="mui-control-item" @tap="atricalCollection">
                            文章收藏
						</a>
					</div>
				</div>
				<div class="mui-slider-group">
					<div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
						<div id="scroll1" class="mui-scroll-wrapper">
							<div class="mui-scroll">
                                <ul id="OA_task_1" class="mui-table-view">
                                    <li class="mui-table-view-cell"  v-if="!articalFlag"  v-for="(item,index) in collectionData" :key="item.collection_id">
                                        <div class="mui-slider-right mui-disabled">
                                            <a class="mui-btn mui-btn-red" @tap="delGoods(item,index)">删除</a>
                                        </div>
                                        <div class="mui-slider-handle"  @click="goodsInfoHref(item)">
                                            <a href="javascript:;">
                                                <img :src="item.thumb">
                                                <div class="info">
                                                    <h4 class="mui-ellipsis-2">{{ item.title }}</h4>
                                                    <div class="price">
                                                        <!-- <p>规格：{{ item.guide }}</p> -->
                                                        <p class="nowPrice">￥<b>{{ item.price }}</b></p>
                                                    </div>    
                                                </div>
                                            </a>
                                        </div>
                                    </li>
                                    <li class="mui-table-view-cell" v-if="articalFlag"  v-for="(item,index) in collecArticalData" :key="item.index">
										<div class="mui-slider-right mui-disabled">
                                            <a class="mui-btn mui-btn-red" @tap="delArtical(item,index)">删除</a>
                                        </div>
                                        <div class="mui-slider-handle">
                                            <router-link tag="a" :to="'/ruralHome/Searchinfor/'+item.article_id">
                                                <img :src="item.thumb">
                                                <div class="info">
                                                    <h4 class="mui-ellipsis-2">{{ item.title }}</h4>
                                                    <div class="price">
                                                        <p>{{ item.create_time }}</p>
                                                    </div>    
                                                </div>
                                            </router-link>
                                        </div>
                                    </li>
                                </ul> 
                                <null-collection v-if="nullCollFlag"></null-collection>
							</div>
						</div>
					</div>
				</div>
            </div>        
        </div>   

    </div>
</template>

<script>
    import { userCollection, userArticalCollection ,b2bCollecst,ruralArticalCollection} from '../../../../api/index.js'
    import mui from '../../../../../static/mui/js/mui.min.js'
    import nullCollection from '../../../../components/nullCollection.vue'
    export default {
        inject :['reload'],
        data() {
            return {
                limit : 10,
                page : 0,
                articalFlag:false,
                collectionData:[],//收藏列表数据
                collecArticalData:[],
                nullCollFlag: false, // 显示是否为空
            }
        },
        created(){
            this.getb2baccresProduct();
        },
        mounted(){
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        components:{
            nullCollection
        },
        methods:{
            // 商品收藏导航切换
            goodsCollection(){
                mui('#scroll1').scroll().scrollTo(0,0,0);
                this.nullCollFlag = false
                this.getb2baccresProduct();
            },
            // 文章收藏导航切换
            atricalCollection(){
                mui('#scroll1').scroll().scrollTo(0,0,0);
                this.nullCollFlag = false
                this.getB2bArtical();
            },
            // 商品列表数据
            getb2baccresProduct(){
                this.articalFlag = false
                let params ={ limit: this.limit, page : this.page }
                userCollection(params).then(res=>{
                    this.collectionData = res.data
                    if(this.collectionData.length == 0){
                        this.nullCollFlag = true
                    }
                })
            },
            getB2bArtical(){
                this.articalFlag = true
                let params ={ limit: this.limit, page : this.page }
                userArticalCollection(params).then(res=>{
                    this.collecArticalData = res.data
                    if(this.collecArticalData.length == 0){
                        this.nullCollFlag = true
                    }
                })
            },
            // 商品详情跳转
            goodsInfoHref(item){
                if(item.product_type == 1){//B端 
                    this.$router.push({ name: 'ShopdetailB' ,params:{ id:item.collect_product_id } })
                }else if(item.product_type == 2){//C端
                    this.$router.push({ name: 'Shopdetailc' ,params:{ id:item.collect_product_id } })
                }
            },
            // 删除商品收藏
            delGoods(item,index){
                if(item.product_type == 1){//B端 
                    let params ={
                       product_id: item.collect_product_id,
                       collect_type : 2,//取消收藏
                       product_type: item.product_type,
                    }
                    b2bCollecst(params).then(res=>{
                        if(res.code == 0){
                            mui.toast('删除成功',{ duration:500 })
                            this.reload()
                        }
                    })
                }else if(item.product_type == 2){//C端
                    let params ={
                       product_id: item.collect_product_id,
                       collect_type : 2,//取消收藏
                       product_type: item.product_type,
                    }
                    b2bCollecst(params).then(res=>{
                        if(res.code == 0){
                            mui.toast('删除成功',{ duration:500 })
                            this.reload()
                        }
                    })
                }
            },
            // 删除文章收藏
            delArtical(item,index){
                let params = {
                    article_id: item.article_id
                }
                ruralArticalCollection(params).then(res=>{
                    if(res.code == 0){
                        mui.toast('取消收藏',{ duration:500 })
                        this.reload()
                    }
                })
            }
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
            // 列表
            .mui-slider-group{
                margin-top: 0.28rem;
               .mui-table-view{
                    .mui-table-view-cell{
                        padding: 0.28rem 0.28rem;
                        text-align: left;
                        a{
                            display: flex;
                            img{
                                width: 2rem;
                                height: 2rem;
                                margin-right: 0.15rem;
                            }
                            .info{
                                display: flex;
                                justify-content: space-between;
                                flex-direction: column;
                                h4{
                                    color: #222;
                                    font-size: 0.32rem;
                                    font-weight: normal;
                                    line-height: 0.4rem;
                                }
                                .price{
                                    p{
                                        margin-bottom: 0;
                                        text-align: left;
                                        color: #999;
                                        font-size: 0.25rem;
                                    }
                                    .nowPrice{
                                        color: #e51616;
                                        b{
                                            font-size: 0.34rem;
                                        }
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
    }            
</style>