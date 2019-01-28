<template>
    <div>
        <header id="header" class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">组合优惠</h1>
		</header>
        <div class="mui-content">
			<div id="slider" class="mui-slider mui-fullscreen">
				<div id="sliderSegmentedControl" class=" tapDiv mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll tapList">
						<a  :class=" item.cid == -1 ? 'mui-active': ''" class="mui-control-item" v-for="item in b2bTopGetcat" :key="item.cid" @tap="changecid(item.cid)">
							{{ item.name }}
						</a>
					</div>
				</div>
				<div class="mui-slider-group">
					<div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
						<div id="scroll1" class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<ul class="mui-table-view">
									<li class="mui-table-view-cell" v-for="items in b2bCombinationData" :key="items.group_id">
										<img class="goodsImg" :src="items.thumb">
                                        <div class="CombinatList">
                                            <h4 class="mui-ellipsis-2">{{ items.group_name}}</h4>
                                            <div class="info">
                                                <div class="price  mui-pull-right">
                                                    <!-- <p class="nowPrice" >￥<b>128.6</b></p> -->
                                                    <button type="button" @click="toInfo(items.group_id,items.group_type)" class="mui-btn mui-btn-danger">立即抢购</button>
                                                </div>
                                                <div class="giftDiv">
                                                    <p class="mui-ellipsis">赠品:{{ items.gift_title }}</p>
                                                    <img :src="items.gift_thumb" alt="">
                                                </div>
                                            </div>
                                        </div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>                              
    </div>
</template>

<script>
    import mui from '../../../../../static/mui/js/mui.min.js'
    import { b2bCombinationGetcat , b2bCombinationAcctive } from '../../../../api/index.js'
    export default {
        data() {
            return {
                cid: -1,
                b2bTopGetcat:[],//b2b组合活动头部分类
                b2bCombinationData:[],//b2b组合活动数据列表
            }
        },
        created(){
            this.getb2bcombinationTop();
            this.getb2bcombinationData();
        },
        mounted(){
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
            var gallery = mui('.mui-slider');
			gallery.slider({
				interval:0//自动轮播周期，若为0则不自动播放，默认为0；
			});
        },
        methods:{
            // 导航id切换
            changecid(cid){
                this.cid  = cid;
                this.getb2bcombinationData();
            },
            getb2bcombinationTop(){
                b2bCombinationGetcat().then(res=>{
                    this.b2bTopGetcat = res.data
                })
            },
            getb2bcombinationData(){
                let params = { cid : this.cid}
                b2bCombinationAcctive(params).then(res=>{
                    this.b2bCombinationData = res.data
                    console.log(this.b2bCombinationData)
                })
            },
            // 页面跳转
            toInfo(groupId,groupType){
                if(groupType == 4){
                    this.$router.push({ name: 'CombinationInfoB',query: { id:groupId,groupType:groupType } })
                }else{
                    this.$router.push({ name: 'CombinationInfoType',query: { id:groupId,groupType:groupType } })
                }
            }
        }
    }
</script>

<style scoped lang="less">
    #header{
        height: 50px;
        background-color: #f33026;
        .mui-title{
            height: 50px;
            line-height: 50px;
            font-weight: bold;
            color: #fff;
        }
        .mui-action-back{
            font-size: 30px;
            color: #fff;
        }
        
    }
    .mui-bar-nav{
            box-shadow: 0 0px 0px #ccc;
    }
    .mui-content{
        padding-top: 50px;
        .mui-slider.mui-fullscreen{
            top: 50px;
            .tapDiv{
                height: 60px;
                background-color: #f33026;
                .tapList{
                    height: 60px;
                    background-color: #f33026;
                    a{
                        height: 55px;
                        line-height: 60px;
                        color: #fff;
                        font-size: 0.32rem;
                    }
                    .mui-active{
                        border-bottom: 3px solid #fff;
                    }
                }
            }
            // 列表
            .mui-slider-group{
               top: 60px;
               background-color: #fff;
               .mui-table-view{
                   .mui-table-view-cell{
                       text-align: left;
                       display: flex;
                       align-content:center;
                       justify-content: space-between;
                       .goodsImg{
                            width: 2rem;
                            height: 2rem;
                            max-width: 2rem;
                            margin-right: 0.28rem;
                       }
                       .CombinatList{
                           h4{
                            color: #222;
                            font-size: 0.32rem;
                            line-height: 0.4rem;
                            font-weight: normal;
                            margin-bottom: 0.2rem;
                            }
                            .info{
                                // padding-top: 0.25rem;
                                .price{
                                    display: flex;
                                    justify-content: space-between;
                                    align-items:flex-end;
                                    .nowPrice{
                                        margin-bottom: 0;
                                        text-align: left;
                                        color: #e51616;
                                        font-size: 0.25rem;
                                        b{
                                            font-size: 0.34rem;
                                        }
                                    }
                                    .mui-btn-danger{
                                        border: 0;
                                        padding: 0.1rem 0.2rem;
                                        font-size: 0.25rem;
                                    }
                                }
                                .giftDiv{
                                    width: 100%;
                                    padding-top: 0.2rem;
                                    display: flex;
                                    align-items:center;
                                    justify-content: space-between;
                                    p{
                                        width: 3.6rem;
                                        color: #f42d26;
                                        font-size: 0.28rem;
                                    }
                                    img{
                                        width: 0.7rem;
                                        height: 0.7rem;
                                    }
                                }
                                
                            }
                       }    
                    }
                }
            }
        }
    }
        
</style>