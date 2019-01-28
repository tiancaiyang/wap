<template>
    <div>
        <header id="header" class="mui-bar mui-bar-nav header">
          <h1 class="mui-title">分类</h1>
          <router-link to="/searchc" tag="a" class="mui-icon mui-icon-search mui-pull-right"></router-link>
		</header>
        <div class="assortDiv mui-clearfix">
            <!-- 左侧 -->
            <div class="left">
               <div class="mui-scroll-wrapper">
                    <div class="mui-scroll">
                        <!--这里放置真实显示的DOM内容-->
                        <ul class="mui-table-view mui-table-view-chevron">
                            <li class="mui-table-view-cell" v-for="(item,index) in leftList" :key="item.cid" v-on:click="addClass(index,item.cid)" v-bind:class="{ active:index==current}" >
                                 <a>{{ item.name }}</a>
                            </li>   
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 右侧 -->
            <div class="right">
               <div class="lunbo"><swiper :list="bannerList"></swiper></div>
                <div class="mui-scroll-wrapper">
                    <div class="mui-scroll">
                        <ul class="firsttUl">
                            <li v-for="item in rightList.cat" :key="item.index">
                                <p class="name">{{ item.title }}</p>
                                <div class="goodsList">
                                    <a  v-for="items in item.data_list" :key="items.cid" @click="toAssementInfo(items.cid,items.name,items.type)">
                                        <div class="imgDiv"><img :src="items.logo" alt=""></div>
                                        <p>{{ items.name }}</p>
                                    </a>
                                </div>     
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!--底部  -->
        <tabbarc></tabbarc>
</div>
</template>

<script>
   import mui from '../../../../static/mui/js/mui.min.js'
   import Tabbarc from '../../../components/Tabbarc'
   import swiper from '../../../components/Swiper.vue'

   import { b2caccress,b2caccresscategory } from '../../../api/index.js'
    export default {
        components: {
            swiper,
            Tabbarc
        },
        data() {
            return {
                bannerList:[],//轮播图数据列表
                current:0,
                cId:'',
                leftList:[],//左侧分类
                rightList:[],//右侧分类
            }
        },
        created(){
            this.getData();
        },
        methods:{
            // 更改点击时的样式
            addClass(index,itemcid){
                this.current=index;
                this.cId = itemcid;
                this.getDataCategory()
            },
            // 左侧分类
            getData(){
                b2caccress().then(res=>{
                    this.leftList = res.data
                    this.cId = res.data[0].cid
                    this.getDataCategory()
                });
            },
            // 右侧分类
            getDataCategory(){
                let params = { cid: this.cId }
                b2caccresscategory(params).then(res=>{
                    this.rightList = res.data
                    this.bannerList = res.data.banner
                    console.log(res)
                })
            },
            // 点击跳转
            toAssementInfo(cid,name,type){
                if(type == 'brand'){
                    this.$router.push({ name: 'Homelist', query:{cid:cid,name:name,type:type} }) 
                }else if(type == 'cat'){
                    this.$router.push({ name: 'Classificationlist', query:{cid:cid,title:name,type:type} })
                }
            }
        },
        mounted(){
             mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
    }
</script>

<style scoped lang="less">
    .header{
        @headerBg: #fff;
        @headerHeight: 50px;
        background: @headerBg;
        height: @headerHeight; 
        z-index: 9999;
        .mui-title{
            color: #333;
            height: @headerHeight;
            line-height: @headerHeight;
            font-weight: bold;
        }
        .mui-pull-right{
            height: @headerHeight;
            line-height: 32px;
            color: #000;
        }
    }
    // 左侧
    .left{
        width: 30%;
        height: 100%;
        .mui-scroll-wrapper{
            top: 50px;
            width: 30%;
            bottom: 50px;
        }
        .mui-table-view-cell:after{
            height: 0;
        }
        .mui-table-view:before{
            height: 0;
        }
        .mui-table-view:after{
            height: 0;
        }
        .mui-scroll{
            width: 100%;
            border-right: 1px solid #ddd;
            background-color: #fff;
            .mui-table-view-chevron {
                .mui-table-view-cell{
                    margin: 0.5rem 0.28rem;
                    padding: 0;
                    text-align: center;
                    color: #333;
                    border: 1px solid #fff;
                    a{
                       font-size: 0.3rem;
                       margin: 0;
                    }
                }
                .active{
                    border-radius: 0.5rem;
                    border: 1px solid #ff2400;
                    a{
                        color: #ff2e05;
                        font-weight: bold;
                    }
                }
            }
            
        }
    }
    // 右侧
    .right{
        width: 70%;
        float: right;
        box-sizing: border-box;
        background-color: #fff;
       .wrapper{
           margin-top: 50px;
           height: 2.2rem!important;
           background-color: #dcdcdc;
           z-index: 999;
       }
        .mui-scroll-wrapper{
            width: 70%;
            left: 30%;
            top: 3.2rem;
            bottom: 50px;
            background-color: #fff;
            .firsttUl{
                padding-left: 0.2rem;
                li{
                    .name{
                        color: #333;
                        font-size: 0.32rem;
                        font-weight: bold;
                        margin-top: 10px;
                        padding-left: 10px;
                        text-align: left;
                    }
                    .goodsList{
                       padding: 0.3rem 0;
                       display: flex;
                       flex-wrap: wrap;
                       a{
                           width: 33.33%;
                           margin-bottom: 0.3rem;
                           .imgDiv{
                               width: 1.5rem;
                               height: 1.5rem;
                                img{
                                    max-width: 100%;
                                    max-height: 100%;
                                    margin-top: 50%;
                                    transform: translateY(-50%);
                                }
                           }
                          
                           p{
                               margin-top: 0.1rem;
                               margin-bottom: 0;
                               color: #333;
                               font-size: 0.25rem;
                           }
                       }
                    }
                }
            }
        }
        
    } 
</style>