<template>
    <div>
        <!-- 1、头部导航栏开始 -->
        <header id="header" class="mui-bar mui-bar-nav">
			<router-link to="/" tag="a" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">订货平台</h1>
            <router-link to="/searchB" tag="a" class="mui-icon mui-icon-search mui-pull-right"></router-link>
		</header>
        <!--2、引入轮播图开始 -->
        <swiperb :list="swiperList"></swiperb>
        <!-- 3、九宫格开始-->
        <div class="grid">
            <ul>
                <li v-for="item in cateBanner" :key="item.cid" @click="gridHref(item)">
                    <div class="imgDiv">
                        <img :src="item.logo" alt="">
                    </div>
                    <p>{{ item.name }}</p>
                </li>
            </ul>
        </div>
        <!-- 4、优惠活动 -->
        <div class="mui-content">
			<div class="mui-card">
                <div class="mui-card-header">活动专区</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <!-- 秒杀活动 -->
                         <div class="timeLimitDiv">
                                <div class="timeLimit">
                                    <router-link to="/TitmeLimitB" tag="div" class="limitLogo mui-pull-left">
                                        <img src="../../../assets/images/b2b/titmeLimitLogo.png" alt="">
                                        <span>爆款直降</span>
                                    </router-link>
                                    <p class="mui-pull-right"><span>距结束:</span><b>{{ day }}</b>:<b>{{ hr }}</b>:<b>{{ min }}</b>:<b>{{ sec }}</b></p>
                                </div>
                                <div class="timeLimitContent">
                                    <ul>
                                        <router-link :to="'/limitShopDteailB/'+item.product_id+'/'+item.seckill_id" tag="li" v-for="item in seckill" :key="item.product_id">
                                            <img :src="item.thumb" alt="">
                                            <p>￥{{ item.seckill_price }}</p>
                                            <p><del>￥{{ item.price }}</del></p>
                                        </router-link>
                                    </ul>
                                </div>
                            </div>
                        <!-- 特价优惠/组合活动 -->
                        <div class="comSpecialDiv">
                            <router-link to="/CombinationListB" tag="a">
                                <img src="http://www.silutianyu.com/data/upload/group.jpg" alt="">
                            </router-link>
                            <router-link to="/GoodSaleB" tag="a">
                                <img src="http://www.silutianyu.com/data/upload/special.jpg" alt="">
                            </router-link>
                        </div>
                        <!-- 今日必买-->
                        <div class="activityAD">
                           <p>今日必买—好货聚居地</p>
                           <ul>
                               <li v-for="item in activityList" :key="item.ad_id">
                                   <a  @tap="masterHref(item)">
                                       <img :src="item.media_file_path" alt="">
                                   </a>
                               </li>
                           </ul>
                        </div>
					</div>
				</div>
			</div>
        </div> 
        <!-- 5、推荐板块 -->
        <div class="cloudGoods">
            <p class="cloudGoodsTitle">精品推荐</p>
            <!--数据列表-->
            <div class="refreshContainer">
                 <ul class="goodsUl">
                    <li class="goodsList" v-for="item in recommendList" :key="item.id">
                        <router-link :to="'/shopdetailB/' + item.product_id" tag="a">
                            <span class="activeIcon" v-if="item.activity_type == 1">特价</span>
                            <img :src="item.thumb" alt=""> 
                            <div class="listInfo">
                                <p>{{ item.title }}</p>
                                <span>￥<b>{{ item.price }}</b></span>
                            </div>
                        </router-link>
                    </li>
                 </ul>
                <div class="listFoot">
                    <img src="../../../assets/images/CouldEnter/flag.png" alt="">
                    <span class="witer">到底了~往上飞吧</span>
                </div>    
            </div>
		</div>
        <!-- 6、引入tabbar -->
        <tabbar></tabbar>
    </div>
</template>

<script>
import swiperb from '../../../components/SwiperB.vue'
import tabbar from '../../../components/Tabbar.vue'
import { b2bHome } from '../../../api/index.js'
export default {
    name:'Home',
    data() {
        return {
            swiperList: [],  //轮播图列表  
            cateBanner:[],   // 九宫格数据列表
            seckill:[],      //秒杀区数据列表
            seckillTime:'',//秒杀结束时间
            recommendList: [], //商品推荐板块列表 
            activityList:[], //好货聚集地列表
            day: 0, hr: 0, min: 0, sec: 0
        }
    },
    created(){
        // 倒计时
        // this.countdown();
        this.getSwiperList();
    },
    methods:{
        getSwiperList(){
            b2bHome().then(res=>{
                if(res.code == 0){
                    this.swiperList = res.data.home_banner;
                    this.recommendList = res.data.product_list;
                    this.cateBanner = res.data.menu_list;
                    this.seckill = res.data.seckill_list;
                    this.activityList = res.data.activity_list;
                    this.seckill.forEach((item,index)=>{
                        if(index == 0){
                            this.seckillTime = item.over_time
                        }
                    })
                    console.log(this.seckill)
                    this.countdown()
                }
            })
        },
        // 九宫格分类跳转
        gridHref(item){
            if(item.type == 'brand'){
                this.$router.push({ name: 'assestCoodsListB', query:{cid:item.cid,title:item.name,type:item.type} }) 
              }else if(item.type == 'cat'){
                this.$router.push({ name: 'brandGoodsListB', query:{cid:item.cid,title:item.name,type:item.type} })
            }
        },
        // 今日好货必买
        masterHref(item){
            if(item.link_type == 1){
                window.location.href = item.link
            }else if(item.link_type == 2){
                this.$router.push({ name: 'ShopdetailB', params:{ id:item.link } })
            }else if(item.link_type == 3){
                this.$router.push({ name: 'brandNameListB', query:{ cid:item.link,  title:item.link_name } })
            }else if(item.link_type == 4){
                this.$router.push({ name: 'assestCoodsListB', query:{cid:item.link,title:item.link_name,type:'cat'} })
            }else if(item.link_type == 5){
                this.$router.push({ name: 'brandGoodsListB', query:{cid:item.link,title:item.link_name,type:'brand'} })
            }else if(item.link_type == 6){//秒杀
                this.$router.push({ path: '/TitmeLimitB' })
            }else if(item.link_type == 7){//特价
                this.$router.push({ path: '/GoodSaleB' })
            }else if(item.link_type == 8){//组合活动
                this.$router.push({ path: '/CombinationListB' })
            }
        },
        // 2、倒计时
        countdown() {
            const endTime = this.seckillTime
            const end =  endTime * 1000
            const now = Date.parse(new Date())
            const msec = end - now
            if(msec > 0){
                let day = parseInt(msec / 1000 / 60 / 60 / 24)
                let hr = parseInt(msec / 1000 / 60 / 60 % 24)
                let min = parseInt(msec / 1000 / 60 % 60)
                let sec = parseInt(msec / 1000 % 60)
                this.day = day
                this.hr = hr > 9 ? hr : '0' + hr;
                this.min = min > 9 ? min : '0' + min;
                this.sec = sec > 9 ? sec : '0' + sec;
                const that = this
                setTimeout(function () {
                    that.countdown()
                },1000)
            }
            
        },   
    },
    components:{
        tabbar,
        swiperb,
    }
}
</script>

<style  scoped lang="less">
    // 头部导航
    #header{
        @headerHeight: 50px;
        background: -webkit-gradient(linear, 0 0, 0 100%, from(#f33a2f), to(#ea0000));
        height: @headerHeight; 
        .mui-pull-left{
            height: @headerHeight;
            line-height: 32px;
            color: #fff;
        }
        .mui-title{
            color: #fff;
            height: @headerHeight;
            line-height: @headerHeight;
        }
        .mui-pull-right{
            height: @headerHeight;
            line-height: 32px;
            color: #fff;
        }
    }
    ul,li{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    // 轮播图到顶部的距离
    .wrapper{
        margin-top: 50px;
    }
    // 九宫格样式
    .grid{
        height: 100%;
        background-color: #fff;
        ul{
            margin: 0;
            padding: 0.28rem 0;
            display: flex;
            justify-content: space-around;
            li{
                .imgDiv{
                    height: 1.2rem;
                    width: 1.2rem;
                    margin-bottom: 0.1rem;
                    border-radius: 50%;
                    background-color: #dcdcdc;
                }
                img{
                   height: auto;
                   max-width: 100%;
                   margin-top: 50%;
                   transform: translateY(-50%);
                }
                p{
                    font-size: 0.28rem;
                    font-weight: bold;
                    color: #000;
                }
            }
        }
    }
   // 卡片样式
   .mui-bar-nav~.mui-content{
       padding-top: 0;
   }
   .mui-content>.mui-card:first-child{
       margin-top: 10px;
   }
   .mui-card-header{
       padding-bottom: 0;
       font-weight: bold;
   }
   .mui-card-footer:before, .mui-card-header:after{
       height: 0;
   }
    .mui-content{
        .mui-card{
            margin: 0;
            box-shadow: 0;
            .mui-card-content-inner{
                padding-top: 0;
            }
            // 限时秒杀
            .timeLimitDiv{
                // background-color: #f9f7f8;
                background: url(../../../assets/images/CouldEnter/seckillbg.png) no-repeat center;
                // padding: 0.28rem; 
                .timeLimit{
                    padding-top: 0.15rem;
                    height: 0.9rem;
                    .limitLogo{
                        img{
                            width: 1.6rem;
                            vertical-align: middle;
                        }
                        span{
                            color: red;
                        }
                    }
                    p{
                        color: #000;
                        span{
                            color: #888;
                        }
                        b{
                            background-color: rgb(14, 13, 13);
                            color: #fff;
                            padding: 0.09rem;
                            border-radius: 0.1rem;
                        }
                    }
                }
                .timeLimitContent{
                    width: 100%;  
                    padding: 0 0.2rem 0;                
                    ul {
                        display: flex;
                        li {
                            width: 25%;
                            img{
                                width: 80%;
                            }
                            p{
                                color: #e51616;
                                font-size: 0.28rem;
                                margin-bottom: 0;
                                font-weight: bold;
                                del{
                                    color: #999;
                                    font-size: 0.25rem;
                                    font-weight: normal;
                                }
                            }
                        }
                    }
                }
            }
            // 特价优惠/组合活动
            .comSpecialDiv{
                margin-top: 15px;
                display: flex;
                justify-content: space-between;
               a{ 
                   height: 3rem;
                   width: 48%;
                   img{
                       height: 100%;
                       width: 100%;
                   }   
               }
            }
             // 今日必买样式
            .activityAD{
                margin-top: 10px;
                p{
                    color: #333;
                    font-size: 0.32rem;
                    text-align-last: left;
                    font-weight: bold;
                }
                ul{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    li{
                        width: 49%;
                        height: 2rem;
                        margin-bottom: 0.2rem;
                        a{
                            img{
                                height: auto;
                                max-width: 100%;
                            }
                        }
                        &:nth-child(1){
                            width: 70%;
                        }
                        &:nth-child(2){
                            width: 30%; 
                        }
                    }
                }
            }
        }
    }
   
    // 精品推荐样式
    .cloudGoodsTitle{
        height: 45px;
        line-height: 45px;
        font-weight: bold;
        color: #242121;
        background-color: #fff;
    }
    .cloudGoodsTitle::before{
        content: ""; 
        display: inline-block; 
        width: 0.45rem;
        height: 0.45rem; 
        vertical-align: middle;
        margin-right: 5px;
        background: url(../../../assets/images/CouldEnter/before.png) no-repeat;
    }
    .cloudGoodsTitle::after{
        content: ""; 
        display: inline-block; 
        width: 0.45rem;
        height: 0.45rem; 
        vertical-align: middle;
        margin-left: 5px;
        background: url(../../../assets/images/CouldEnter/after.png) no-repeat;
    }
    // 列表内容
    .refreshContainer{
        // padding: 0 0.28rem;
        margin-bottom: 50px;
        .goodsUl{
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .goodsList{
                width: 49%;
                text-align: left;
                background-color: #fff;
                margin-bottom: 0.25rem;
                a{
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
                        p{
                            color: #222;
                            font-size: 0.28rem;
                            font-weight: bold;
                            margin-bottom: 0;
                        }
                        span{
                            color: #e51616;
                            font-size: 0.25rem;
                            font-weight: normal;
                            b{
                                font-size: 0.28rem;
                            }
                        }
                    }
                }
            }
        }
        // 底部内容
        .listFoot{
            padding-bottom: 0.3rem;
            img{
              height: 0.3rem;
            }
            .witer{
              color: #999;
            }
        }
    }
    

</style>