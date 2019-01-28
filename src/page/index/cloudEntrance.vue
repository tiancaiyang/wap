<template>
    <div class="cloudHome">
        <!-- 平台入口页面 -->
        <!-- 1、顶部导航栏 -->
         <header id="header" class="mui-bar mui-bar-nav">
			<div class="hearderSearch">
                <span class="mui-icon mui-icon-search" @click="indexSearch">牛栏山 二锅头</span>
            </div>
		</header>
        <!-- 2、引入轮播图 -->
        <swiper :list="swiperList" v-if="!b2bflag"></swiper>
        <swiperb :list="swiperList" v-if="b2bflag"></swiperb>
        <!-- 3、九宫格 -->
        <div class="grid">
            <ul>
                <router-link tag="li" to="/homeb" v-if="indentity == 2"><img src="../../assets/images/CouldEnter/b2b.png" alt=""><p>订货平台</p></router-link>
                <li @click="ToChangeBuser" v-else><img src="../../assets/images/CouldEnter/b2b.png" alt=""><p>订货平台</p></li>
                <router-link tag="li" to="/homec"><img src="../../assets/images/CouldEnter/b2c.png" alt=""><p>发现好物</p></router-link>
                <router-link tag="li" to="/ruralHome"><img src="../../assets/images/CouldEnter/ruralR.png" alt=""><p>乡村互联</p></router-link>
                <router-link tag="li" to="/preferential"><img src="../../assets/images/CouldEnter/concessionCenter.png" alt=""><p>优惠中心</p></router-link>
            </ul>
        </div>
        <!-- 4、丝路天语快讯 -->
        <div class="marquee">
            <div class="marquee_title">
                <img src="../../assets/images/CouldEnter/newsLogo.png" alt="">
            </div>
            <div class="marquee_box">
                <ul class="marquee_list">
                    <router-link :to="'/indexmessage/Messageinfo/'+item.message_id" tag="li" v-for="item in marqueeList" :key="item.message_id">{{item.title}}</router-link>
                </ul>
            </div>
        </div>
        <!-- 5、卡片 -->
        <div class="mui-content" v-if="!b2bflag">
                <div class="mui-card">
                    <div class="mui-card-content">
                        <div class="mui-card-content-inner">
                            <!-- 秒杀活动 -->
                            <div class="timeLimitDiv">
                                <router-link to="/cloudentrance/titmeLimit" tag="div" class="timeLimit">
                                    <div class="limitLogo mui-pull-left">
                                        <img src="../../assets/images/CouldEnter/titmeLimitLogo.png" alt="">
                                        <span>爆款直降</span>
                                    </div>
                                    <p class="mui-pull-right"><span>距结束:</span><b>{{ day }}</b>:<b>{{ hr }}</b>:<b>{{ min }}</b>:<b>{{ sec }}</b></p>
                                </router-link>
                                <div class="timeLimitContent">
                                    <ul>
                                        <router-link :to="'/limitShopSetailC/'+item.product_id+'/'+item.seckill_id" tag="li"  v-for="item in seckillList" :key="item.product_id">
                                            <img :src="item.thumb" alt="">
                                            <p>￥{{ item.seckill_price }}</p>
                                            <p><del>￥{{ item.price }}</del></p>
                                        </router-link>
                                    </ul>
                                </div>
                            </div>	
                            <!-- 特价优惠/组合活动 -->
                            <div class="comSpecialDiv">
                                <a v-for="item in masterImg" :key="item.ad_id" @tap="masterHref(item)">
                                    <img :src="item.media_file_path" alt="">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
        </div> 
        <div class="mui-content" v-if="b2bflag">
                <div class="mui-card">
                    <div class="mui-card-content">
                        <div class="mui-card-content-inner">
                            <!-- 秒杀活动 -->
                            <div class="timeLimitDiv">
                                <router-link to="/TitmeLimitB" tag="div" class="timeLimit">
                                    <div class="limitLogo mui-pull-left">
                                        <img src="../../assets/images/CouldEnter/titmeLimitLogo.png" alt="">
                                        <span>爆款直降</span>
                                    </div>
                                    <p class="mui-pull-right"><span>距结束:</span><b>{{ day }}</b>:<b>{{ hr }}</b>:<b>{{ min }}</b>:<b>{{ sec }}</b></p>
                                </router-link>
                                <div class="timeLimitContent">
                                    <ul>
                                        <router-link :to="'/limitShopDteailB/'+item.product_id+'/'+item.seckill_id" tag="li" v-for="item in seckillList" :key="item.product_id">
                                            <img :src="item.thumb" alt="">
                                            <p>￥{{ item.seckill_price }}</p>
                                            <p><del>￥{{ item.price }}</del></p>
                                        </router-link>
                                    </ul>
                                </div>
                            </div>	
                            <!-- 特价优惠/组合活动 -->
                            <div class="comSpecialDiv">
                                <a v-for="item in masterImg" :key="item.ad_id" @tap="masterHref(item)">
                                    <img :src="item.media_file_path" alt="">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
        </div> 
        <!-- 6、小轮播图    -->
        <slide-swiper :list="slideList" v-if="!b2bflag"></slide-swiper>
        <slide-swiperb :list="slideList" v-if="b2bflag"></slide-swiperb>
        <!-- 7、精品推荐 -->
        <div class="cloudGoods" v-if="!b2bflag">
            <p class="cloudGoodsTitle">精品推荐</p>
            <!--数据列表-->
            <div class="refreshContainer">
                <ul class="goodsUl">
                    <li class="goodsList" v-for="item in recommendList" :key="item.id">
                        <router-link :to="'/shopdetailC/' + item.product_id" tag="a">
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
                    <img src="../../assets/images/CouldEnter/flag.png" alt="">
                    <span class="witer">到底了~往上飞吧</span>
                </div>  
            </div>
        </div>
        <div class="cloudGoods" v-if="b2bflag">
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
                    <img src="../../assets/images/CouldEnter/flag.png" alt="">
                    <span class="witer">到底了~往上飞吧</span>
                </div> 
            </div>
        </div>
        <!-- 8、平台入口tabbar -->
        <small-tabbar></small-tabbar>  
    </div>
</template>

<script>
    import mui from '../../../static/mui/js/mui.min.js';
    import swiper from '../../components/Swiper.vue';
    import swiperb from '../../components/SwiperB.vue'
    import smallTabbar from '../../components/SmallTabbar.vue';
    import SlideSwiper from '../../components/Slide.vue'
    import SlideSwiperb from '../../components/SlideB.vue'
    import Swiper from 'swiper';
    import { IndexHome,IndexHomeBus, IndexUserName } from '../../api/index.js'
    export default {
        data() {
            return {
                getlonlat:'',//经纬度
                swiperList: [],  //轮播图列表 
                slideList:[], //小轮播图列表
                marqueeList: [],//消息列表
                seckillList:[],//秒杀活动
                seckillTime:'',//秒杀结束时间
                masterImg:[],//特价，组合活动图
                recommendList:[],//推荐列表
                token:'', //获取localstorage里面是否存在token
                indentity:'',//用户类型
                b2bflag: false,//判断b2b的标志
                day: 0, hr: 0, min: 0, sec: 0

            }
        },
        created(){
            this.getlonlat = localStorage.getItem('getcity');
            this.token = localStorage.getItem('User-Token')
            this.indentity = localStorage.getItem('indentity')
        },
        mounted(){
            this.getHomeData()//首页数据列表
        },
        methods:{
            getHomeData(){
                // 如果存在token 判断是b2b还是b2c用户
                if(this.token){
                    if(this.indentity == 1){
                        // b2c用户
                        IndexHome().then(res=>{
                            this.swiperList = res.data.home_banner
                            this.marqueeList = res.data.message
                            this.masterImg = res.data.activity_master_img
                            this.seckillList = res.data.seckill_list
                            this.slideList = res.data.activity_list 
                            this.recommendList = res.data.product_list
                            this.seckillList.forEach((item,index)=>{
                                if(index == 0){
                                    this.seckillTime = item.over_time
                                }
                            })
                            this.countdown()
                        }) 
                    }else if(this.indentity == 2){
                        // b2b用户
                        this.b2bflag = true;
                        IndexHomeBus().then(res=>{
                            this.swiperList = res.data.home_banner
                            this.marqueeList = res.data.message
                            this.seckillList = res.data.seckill_list
                            this.masterImg = res.data.activity_master_img
                            this.slideList = res.data.activity_list 
                            this.recommendList = res.data.product_list
                            this.seckillList.forEach((item,index)=>{
                                if(index == 0){
                                    this.seckillTime = item.over_time
                                }
                            })
                            this.countdown()
                        })
                    }
                }else{
                    // b2c用户
                    IndexHome().then(res=>{
                        this.swiperList = res.data.home_banner
                        this.marqueeList = res.data.message
                        this.seckillList = res.data.seckill_list
                        this.masterImg = res.data.activity_master_img
                        this.slideList = res.data.activity_list 
                        this.recommendList = res.data.product_list
                        this.seckillList.forEach((item,index)=>{
                            if(index == 0){
                                this.seckillTime = item.over_time
                            }
                        })
                        this.countdown()
                    }) 
                }
                
            }, 
            // 倒计时
            countdown: function () {
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
            // 首页搜索分类进入
            indexSearch(){
                if(this.indentity == 2){
                    // b2b用户
                    this.$router.push({ name: 'searchB' })
                }else{
                    this.$router.push({ name: 'Searchc' })
                }
            },
            // 如果不是b端用户，就提示
            ToChangeBuser(){
                mui.confirm('您还未开通商户,请到个人中心开通吧!')
            },
            // 特价和组合活动链接跳转
            masterHref(item){
                if(this.indentity == 2){
                    if(item.link_type == 7){
                        this.$router.push({ path: '/GoodSaleB' })
                    }else if(item.link_type == 8){
                        this.$router.push({ path: '/CombinationListB' })
                    }
                }else{
                    if(item.link_type == 7){//特价
                        this.$router.push({ path: '/cloudentrance/goodsale' })
                    }else if(item.link_type == 6){//秒杀
                        this.$router.push({ path: '/cloudentrance/titmeLimit' })
                    }else if(item.link_type == 5){//品牌商品列表
                        this.$router.push({ name: 'Homelist', query:{cid:item.link,name:item.link_name,type:'brand'} })
                    }else if(item.link_type == 4){//分类商品列表
                         this.$router.push({ name: 'Classificationlist', query:{cid:item.link,title:item.link_name,type:'cat'} })
                    }else if(item.link_type == 3){//品牌商商品列表
                        this.$router.push({ name: 'BrandNameListC', query:{ cid:item.link,  title:item.link_name } })
                    }else if(item.link_type == 2){//商品详情
                       this.$router.push({ name: 'Shopdetailc', params:{ id:item.link } })
                    }else if(item.link_type == 1){//web页面
                        window.location.href = item.link
                    }
                }
            }
        },
        components:{
            swiper,
            swiperb,
            smallTabbar,
            SlideSwiper,
            SlideSwiperb
        }
    }
</script>

<style scoped lang="less">
    ul ,li{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .cloudHome{
        margin-bottom: 51px;
    }
    #header {
        background-color: #f42c26;
        height: 50px;
        .hearderSearch{
            position: absolute;
            left: 5%;
            right: 5%;
            top: 50%;
            transform: translateY(-50%);
            background-color: #fff;
            border-radius: 24px;
            span{
                font-size: 0.3rem;
                color: #b5b5b5;
                padding: 0.07rem 0 0.06rem;
                vertical-align: middle;
            }
            .mui-icon-search:before {
                font-size: 0.4rem;
                color: rgb(53, 51, 51);
            }
        }
    }
    // 九宫格样式
    .grid{
        background-color: #fff;
        ul{
            margin: 0;
            padding: 0.28rem 0;
            display: flex;
            justify-content: space-around;
            li{
                width: 25%;
                img{
                   height: 1.2rem;
                   width: 1.2rem;
                   border-radius: 50%
                }
                p{
                    font-size: 0.24rem;
                    color: #000;
                }
            }
        }
    }
    // 咨询快报样式
    .marquee{
        margin-top: 0.2rem;
        width: 100%;
        height: 40px;
        line-height: 40px;
        align-items: center;
        color: #3A3A3A;
        display: flex;
        box-sizing: border-box;
    }
    .marquee_title{
        img{
            width: 100%;
            vertical-align: text-bottom;
        }
        padding: 2px 20px;
        width: 28%;
        height: 40px;
        font-size: 14px;
        border-right: 1px solid #d8d8d8;
        align-items: center;
        background-color: #fff;
    }
    .marquee_box{
        display: block;
        position: relative;
        width: 72%;
        height: 40px;
        overflow: hidden;
        background-color: #fff;
    }
    .marquee_list{
        width: 100%;
        display: block;
        margin: 0;
        padding: 0 20px;
        position: absolute;
        top:0;
        left: 0;
    }
    .marquee_top{transition: top 0.5s ;}
    .marquee_list li{
        list-style: none;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 40px;
        line-height: 40px;
        font-size: 0.25rem;
    }

    // 卡片样式
    .mui-content{
        padding-top: 0.2rem!important;
       .mui-card:first-child{
           margin-top: 0;
       }
        .mui-card{
            margin: 0;
            .mui-card-content-inner{
                padding: 0;
            }
            // 限时秒杀
            .timeLimitDiv{
                background: url(../../assets/images/CouldEnter/seckillbg.png) no-repeat center;
                padding: 0.28rem 0.28rem 0; 
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
                margin: 0.28rem 0.28rem;
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
        }
    }
    // 精品推荐样式
    .cloudGoodsTitle{
        margin-top: 20px;
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
        background: url(../../assets/images/CouldEnter/before.png) no-repeat;
    }
    .cloudGoodsTitle::after{
        content: ""; 
        display: inline-block; 
        width: 0.45rem;
        height: 0.45rem; 
        vertical-align: middle;
        margin-left: 5px;
        background: url(../../assets/images/CouldEnter/after.png) no-repeat;
    }
    .cloudGoods{
        position: relative;
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
    }

</style>