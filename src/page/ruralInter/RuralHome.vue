<template>
    <div>
        <header id="header" class="mui-bar mui-bar-transparent">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">乡村互联</h1>
            <router-link to="/ruralHome/searrchr" class="mui-icon mui-icon-search mui-pull-right"></router-link>
		</header>
        <div class="topBg">
            <img :src="cityInfo.image" alt="">
            <div class="areaDiv">
                <div class="area">
                    <span>{{ cityInfo.city }}</span>
                    <span>{{ cityInfo.district }}</span>
                    <h2 class="areaName">{{ cityInfo.township }} <span @click="changeCity" class="mui-icon-extra mui-icon-extra-arrowrightcricle"></span></h2>
                </div>
                <div class="weather">
                    <img src="../../assets/images/RualInter/rain.png" alt="">
                    <p>{{ cityInfo.temperature }}&#176;C</p>
                </div>
                <div class="areaInfo">
                    <p class="mui-ellipsis-2">{{ cityInfo.introduce }}</p>
                </div>
            </div>
        </div>
        <!-- 当地人文横向轮播 -->
        <div class="local">
            <h2>当地人文</h2>
        </div>
        <div class="localHumanities">
            <div class="localScroll" style="overflow-x: scroll;">
                <div class="localitem" v-for="item in localList" :key="item.local_id" @click="LocalInfo(item.local_id)">
                    <img :src="item.image" alt="">
                    <p class="localName">{{ item.title }}</p>
                    <p class="localAttribute">{{ item.localCatname }}</p>
                </div>
            </div>
        </div>
        <!-- 切换导航 -->
        <div class="recomment">
            <div class="mui-content">
                <div id="slider" class="mui-slider mui-fullscreen">
                    <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                        <div class="mui-scroll">
                            <a :class=" item.id == 0 ? 'mui-active': ''" class="mui-control-item" v-for="item in ArticalId" :key="item.id" @tap="ChangeAtricalList(item.id)">
                                {{ item.name }}
                            </a>
                        </div>     
                    </div>
                    <div class="mui-slider-group">
                        <div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
                            <div id="scroll1" class="mui-scroll-wrapper">
                                <div class="mui-scroll">
                                    <ul class="mui-table-view">
                                        <router-link :to="'/ruralHome/Searchinfor/'+ item.article_id" tag="li" class="mui-table-view-cell" v-for="item in ArticalList" :key="item.article_id">
                                            <p class="recomTitle" >{{ item.title }}</p>
                                            <img :src=" item.thumb " alt="">  
                                            <div class="time">
                                                <span>{{ item.create_time }}</span>
                                                <span class="mui-pull-right read">{{ item.read_number }}阅</span>
                                            </div>                       
                                        </router-link>
                                    </ul>
                                    <!-- 加载更多 router-link :to="'/ruralHome/Searchinfor/'+ item.article_id" tag="p"-->
                                    <div class="loadingMore"  v-if="ArticalList.length == 0 || ArticalList.length < 10? false : true" >
                                        <button  class="mui-btn mui-btn-danger mui-btn-outlined" @click="morePage()">加载更多</button>
                                    </div>
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
    import { ruralArticalList ,ruralCityInfo, ruralArticalId } from '../../api/index.js'
    export default {
        data() {
            return {
                getlonlat: '',//经纬度拼接
                cityInfo: '',//城市信息
                localList: '',//当地人文列表
                ArticalId: [],//文章分类id
                ruralarticalid: 0,//文章分类id
                ArticalList:[],//文章列表
                dataLength:'',//每一次的数据长度
                page:0,
                limit:10,
            }
        },
        created(){
            mui.init()
            this.getlonlat = localStorage.getItem('getcity')
        },
        mounted(){
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                 scrollY: false,
                 scrollX: true, 
                //  bounce: true //是否启用回弹
            }); 
            this.getCityInfo()   
            this.getArtical()
        },
        methods:{
            // 城市信息
            getCityInfo(){
                let params = { switch_lonlat: this.getlonlat }
                ruralCityInfo(params).then(res=>{
                    this.cityInfo = res.data
                    this.localList = res.data.local
                    this.getAtricalList(0)
                    console.log(this.cityInfo)
                })
            },
            // 城市切换
            changeCity(){
                this.$router.push({ path: '/ruralHomec/cityList' })
            },
            // 进入人文详情
            LocalInfo(localId){
                let param = { localId: localId}
                this.$router.push({ path: '/ruralHomec/loncalInfo', query: param })
            },
            // 文章分类
            getArtical(){
                ruralArticalId().then(res=>{
                    this.ArticalId = res.data
                })
            },
            // 文章顶部切换
            ChangeAtricalList(id){
                this.ruralarticalid = id;
                this.page = 0;
                this.ArticalList = [];
                this.getAtricalList()
            },
            // 文章列表
            getAtricalList(id){
                let params = { 
                    category_id: this.ruralarticalid,
                    towncode:this.cityInfo.towncode,
                    page: this.page,
                    limit: this.limit
                }
                ruralArticalList(params).then(res=>{
                    this.ArticalList = this.ArticalList.concat(res.data)
                    this.dataLength = res.data.length
                    console.log(this.ArticalList)
                })
            },
            // 加载更多
            morePage(){
                if(this.dataLength < 10){
                    mui.toast('没有更多了')
                }else{
                    this.page++
                    this.getAtricalList()
                }
            },
        }
    }
</script>
<style lang="less" scoped>
    #header{
        height: 50px;
        // position: static;
        .mui-action-back.mui-icon.mui-icon-left-nav.mui-pull-left{
           font-size: 30px;
           color: #fff;
        }
        .mui-title{
            height: 50px;
            line-height: 50px;
            color: #fff;
        }
        .mui-icon-search{
            color: #fff;
        }
        
    }
    .mui-bar.mui-bar-transparent.mui-active{
        background-color: #159478!important;
    }
    // 大背景图片
    .topBg{
        height: 4rem;
        // margin-top: -50px;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
        .areaDiv{
            color: #fff;
           .area{
                position: absolute;
                top: 1.5rem;
                left: 0.28rem;
                span{
                    font-size: 0.26rem;
                }
                .areaName{
                    text-align: left;
                }
           }
           .weather{
               position: absolute;
               top: 1.7rem;
               right: 0.28rem;
               img{
                   width: 0.4rem;
                   height: 0.4rem;
               }
               p{
                   color: #fff;
               }
            }
            .areaInfo{
                position: absolute;
                bottom: 0;
                left: 0.28rem;
                right: 0.28rem;
                height: 0.9rem;
                p{
                    color: #fff;
                    font-size: 0.25rem;
                    text-align: left;
                }
            }

        }
    }
    // 横向轮播
    .local{
        background-color: #fff;
        h2{
            margin: 0;
            font-size: 0.32rem;
            text-align: left;
            padding: 0.5rem 0 0.3rem 0.28rem;
        }
    }
    .localHumanities{
        background-color: #fff;
        .mui-control-item.mui-active{
            border-bottom: 0;
        }
        height: 4rem;
        .localScroll{
            display: flex;
            &::-webkit-scrollbar { //去除滚动条，设置滚动条的背景颜色为透明 
                background-color: transparent;
                display:none;
            }
        }
        .localitem{
            padding: 0 0 0 0.28rem;
            &:nth-last-child(1){
                padding-right: 0.28rem;
            }
           img{
               height: 2.5rem;
           }
           p{
               margin-bottom: 0;
               text-align: left;
               height: 0.4rem;
               line-height: 0.4rem;
           }
           .localName{
               color: #333;
               font-size: 0.28rem;
           }
           .localAttribute{
               color: #666;
               font-size: 0.25rem;
           }
        }
        
    }
    // 切换导航
    .recomment{
        position: relative;
        .mui-content{
            .mui-slider{
               top: 0.2rem; 
               overflow: visible;
               #sliderSegmentedControl{
                    height: 1rem;
                    background-color: #fff;
                   a{
                      height: 1rem;
                      line-height: 1rem;
                      color: #999;
                      font-size: 0.3rem;
                   }
                   .mui-active{
                        color: #159478;
                        border-bottom: 2px solid #159478;
                        font-weight: bold;
                    }
                  
               }
                //列表
               .mui-slider-group{
                   #item1mobile{
                       .mui-scroll-wrapper{
                           overflow: visible;
                       }
                        .mui-scroll{
                            margin-bottom: 0.5rem;
                            .mui-table-view{
                                .mui-table-view-cell{
                                    text-align: left;
                                    margin-top: 0.3rem;
                                    .recomTitle{
                                        font-size: 0.35rem; 
                                        color: #232323;
                                        font-weight: bold;
                                    }
                                    img{
                                        height: 3.6rem;
                                        margin: 0.28rem 0;
                                    }
                                    .time{
                                        font-size: 0.25rem;
                                        color: #777;
                                        .read{
                                            color: #999;
                                        }
                                        .read::before{
                                            content: ""; 
                                            display: inline-block; 
                                            width: 0.4rem;
                                            height: 0.4rem; 
                                            vertical-align: middle;
                                            background: url(../../assets/images/RualInter/read.png) no-repeat;
                                        }
                                    }
                                }
                            }
                        }
                    }
                  
                }
            }
            // 加载更多按钮
            .loadingMore{
                margin-top: 0.28rem;
                margin-bottom: 1rem;
            button{
                width: 80%;
            }
            }
        }
    }
</style>