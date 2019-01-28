<template>
  <div>
    <!-- 头部 -->
    <header id="header" class="mui-bar mui-bar-nav header">
        <router-link to="/" tag="a" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
        <h1 class="mui-title">发现好物</h1>
        <router-link to="/searchc" tag="a" class="mui-icon mui-icon-search mui-pull-right"></router-link>
		</header>
    <!-- 轮播图 -->
    <home-swiper :list="swiperList"></home-swiper>
    <!-- 布局 -->
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
    <!-- 必买清单 -->
    <div class="buy">
      <div class="order">今日必买清单</div>
      <ul>
        <li v-for="item in mustBuyList" :key="item.ad_id" @click="mustBuyHref(item)">
          <img :src="item.media_file_path" alt="">
        </li>
      </ul>
    </div>
    <!-- 品质推荐 -->
    <div class="buy2"  >
      <div class="order2">品质好货</div>
      <div class="order-details" style="overflow-x: scroll;" >
        <router-link :to="'/shopdetailC/'+ item.product_id" tag="div" class="order-layout" v-for="item in qualityGoods" :key="item.product_id">
            <img :src="item.thumb" alt="">
            <span class="span1">{{item.price}}</span>
            <span class="span2 mui-ellipsis">{{item.title}}</span>
        </router-link>
      </div>
    </div>
    <!--精选活动-->
    <div class="activity">
      <span>精选活动—夏季专享</span>
      <ul class="mui-clearfix">
        <li v-for="item in activityList" :key="item.ad_id" @click="activityListHref(item)">
          <img :src="item.media_file_path" alt="">
        </li>
      </ul>
    </div>
    <!-- 8、推荐板块 -->
    <div class="cloudGoods">
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
                    <img src="../../../assets/images/CouldEnter/flag.png" alt="">
                    <span class="witer">到底了~往上飞吧</span>
                </div>  
            </div>
		</div>
    <!-- 底部 -->
    <tabbarc></tabbarc>
  </div>
</template>

<script>
  import HomeSwiper from '../../../components/Swiper.vue'
  import Tabbarc from '../../../components/Tabbarc'
  import { b2cHome } from '../../../api/index.js'
  export default {
      name: 'Home',
      data(){
          return{
              swiperList: [],//轮播图列表
              cateBanner:[],//九宫格数据
              mustBuyList:[],//必买列表
              qualityGoods:[],//品质好货
              activityList:[],//夏季专享
              recommendList:[],//推荐列表
                  
          }
      },
      created(){
          this.getHomeInfo();
      },
      methods:{
          getHomeInfo(){
            b2cHome().then(res=>{
              this.swiperList = res.data.home_banner
              this.cateBanner = res.data.menu_list
              this.mustBuyList = res.data.must_buy_list
              this.qualityGoods = res.data.quality_goods
              this.activityList = res.data.activity_list
              this.recommendList = res.data.product_list
            })
          },
          // 九宫格分类跳转
          gridHref(item){
            if(item.type == 'brand'){
                this.$router.push({ name: 'Homelist', query:{cid:item.cid,title:item.name,type:item.type} }) 
              }else if(item.type == 'cat'){
                this.$router.push({ name: 'Classificationlist', query:{cid:item.cid,title:item.name,type:item.type} })
            }
          },
          // 今日必买好货---路径跳转
          mustBuyHref(item){
            if(item.link_type == 1){
              console.log(item.link_type)
            }else if(item.link_type == 2){
              this.$router.push({ name: 'Shopdetailc', params:{ id:item.link } })
            }else if(item.link_type == 3){
              this.$router.push({ name: 'BrandNameListC', query:{ cid:item.link,  title:item.link_name } })
            }else if(item.link_type == 4){
              this.$router.push({ name: 'Classificationlist', query:{cid:item.link,title:item.link_name,type:'cat'} })
            }else if(item.link_type == 5){
              this.$router.push({ name: 'Homelist', query:{cid:item.link,name:item.link_name,type:'brand'} })
            }else if(item.link_type == 6){//秒杀
              this.$router.push({ path: '/cloudentrance/titmeLimit' })
            }else if(item.link_type == 7){//特价
              this.$router.push({ path: '/cloudentrance/goodsale' })
            }
          },
          // 夏季活动专享--路径跳转
          activityListHref(item){
            if(item.link_type == 1){
              window.location.href = item.link
            }else if(item.link_type == 2){
              this.$router.push({ name: 'Shopdetailc', params:{ id:item.link } })
            }else if(item.link_type == 3){
              this.$router.push({ name: 'BrandNameListC', query:{ cid:item.link,  title:item.link_name } })
            }else if(item.link_type == 4){
              this.$router.push({ name: 'Classificationlist', query:{cid:item.link,title:item.link_name,type:'cat'} })
            }else if(item.link_type == 5){
              this.$router.push({ name: 'Homelist', query:{cid:item.link,name:item.link_name,type:'brand'} })
            }else if(item.link_type == 6){//秒杀
              this.$router.push({ path: '/cloudentrance/titmeLimit' })
            }else if(item.link_type == 7){//特价
              this.$router.push({ path: '/cloudentrance/goodsale' })
            } 
          }
      },
      components: {
        HomeSwiper,
        Tabbarc,
      },

  }
</script>


<style scoped lang="less">
  ul,li{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .header{
    @headerBg: #ff5836;
    @headerHeight: 50px;
    background: @headerBg;
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
  // 今日必买清单
  .buy{
      width: 100%;
      background: #ffffff;
      margin-top: .15rem;
      @height-order:1rem;
      .order{
        text-align: left;
        height: @height-order;
        line-height: @height-order;
        margin-left: .3rem;
        font-size: .32rem;
        color: #151515;
        font-weight: bold;
      }
      ul{
        display: flex;
        flex-wrap: wrap;
        li{
          width: 50%;
          height: 2.2rem;
          img{
            max-width: 100%;
            height: 100%;
          }
        }
      }
  }
  // 品质好货
  @height-order:1rem;
  .buy2{
    width: 100%;
    height: auto;
    padding-top: 0.28rem;
    background: #ffffff;
    @height-order:1rem;
    .order2{
      text-align: left;
      height: @height-order;
      line-height: @height-order;
      margin-left: .3rem;
      font-size: .32rem;
      font-weight: bold;
      color: #151515;
    }
    .order-details{
      width: 100%;
      // height: 3.6rem;
      padding-bottom: 0.2rem;
      display: flex;
      flex-direction:row;
      &::-webkit-scrollbar { //去除滚动条，设置滚动条的背景颜色为透明 
        background-color: transparent;
        display:none;
      }
      .order-layout{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 3.08rem;
          span{
            padding-top: 0.1rem;
            color: #151515;
            font-size: 0.28rem;
          }
          .span1{
            font-weight: bold;
          }
          .span2{
            width: 90%;
          }
          img{
            width: 2.6rem;
            height: 2.6rem;
            margin: 0 .24rem 0 .24rem;
          }
      }
    }
  }
  //活动列表，夏季专享
  .activity{
    margin: 0.25rem 0 0;
    padding-top: 0.5rem; 
    background-color: #fff;
    position: relative;
    span{
      position: absolute;
      top: 0;
      display: block;
      // margin: 0.25rem 0 0 0.28rem;
      padding: 0.2rem 0.25rem;
      width: 50%;
      text-align: left;
      color: #fff;
      font-size: 0.32rem;
      font-weight: bold;
      border-radius: 0 0.5rem 0.5rem 0;
      background: -webkit-linear-gradient(left, #ff7e29 , #ff2c00);
      background: -o-linear-gradient(right, #ff7e29 , #ff2c00);
      background: -moz-linear-gradient(right, #ff7e29 , #ff2c00);
      background: linear-gradient(to right, #ff7e29 , #ff2c00);
    }
    ul{
      padding: 0 0.28rem;
      text-align: left;
      li:nth-child(1){
        float: left;
        width: 70%;
        height: 4rem;
        margin-bottom: 0.2rem;
        img{
          max-width: 100%;
          height: 100%;
        }
      }
      li:nth-child(2),li:nth-child(3){
        width: 29%;
        height: 2rem;
        float: right;
        img{
          max-width: 100%;
          height: 100%;
        }
      }
      li:nth-child(4){
        width: 49%;
        height: 2rem;
        float: left;
        img{
          max-width: 100%;
          height: 100%;
        }
      }
      li:nth-child(5){
        width: 49%;
        height: 2rem;
        float: right;
        img{
          max-width: 100%;
          height: 100%;
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
