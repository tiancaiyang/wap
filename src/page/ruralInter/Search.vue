<template>
    <div class="search">
        <header id="header" class="mui-bar mui-bar-nav">
            <span class="mui-icon mui-icon-search "></span>
            <input type="text" name="" id="" v-model="value">
            <span class="mui-icon mui-icon-close" @click="closeValue"></span>
            <span class="mui-pull-right closeSearch" @click="toSearch">搜索</span>
		</header>
        <!-- 筛选框 -->
        <div class="recomment">
            <div class="mui-content">
                <div id="slider" class="mui-slider mui-fullscreen">
                    <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                        <div class="mui-scroll">
                            <a :class=" item.id == 0 ? 'mui-active': ''" class="mui-control-item" v-for="item in ArticalId" :key="item.id" @tap="getAtricalList(item.id)">
                                {{ item.name }}
                            </a>
                        </div>     
                    </div>
                </div>
            </div>        
        </div>            
       <!-- 搜索盒子 -->
        <div class="searchbox">
            <!-- 历史搜索 -->
            <div class="searchDiv searchHistory mui-clearfix">
                <p>历史搜索 <span class="mui-pull-right mui-icon mui-icon-trash" @click=" closeSearchHostory"></span> </p>
                <ul class="searchList">
                    <li class="searchLi"  v-for="(item,index) in searchHostory" :key="item.id">
                       <a @click="historySearch(item)">  {{ item }} </a>
                        <span class="mui-icon mui-icon-close delHistory" @click="delHistory(item,index)"></span>
                    </li>
                </ul>
                <span class="flagStyle" v-if="searchHostory.length ==0">暂无搜索记录</span>
            </div>
            <!-- 热门推荐 -->
            <div class="searchDiv mui-clearfix">
                <p>热门推荐 </p>
                <ul class="searchList">
                    <li class="searchLi" v-for="item in hotWords" :key="item.index" @click="wordSearch(item)">{{ item }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { ruralArticalId, ruralSearch ,ruralSearchIndex , ruralSearchClear ,ruralDelHistory} from '../../api/index.js'
    export default {
        data() {
            return {
                value:'',
                ArticalId: [],//文章分类id
                hotWords:[],//热门推荐词
                ruralarticalid: 0,//文章分类id
                searchHostory:[],//历史搜索表
            }
        },
        created(){
            this.getArtical()
            this.getSearchHostory()
        },
        mounted(){
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                 scrollY: false,
                 scrollX: true, 
                //  bounce: true //是否启用回弹
            });
        },
        methods:{
             // 文章分类
            getArtical(){
                ruralArticalId().then(res=>{
                    this.ArticalId = res.data
                })
            },
            // 选择分类
            getAtricalList(id){
                this.ruralarticalid = id
            },
            // 搜索接口
            toSearch(){
                if(this.value == ''){
                    mui.toast('请输入搜索关键字',{ duration:500 })
                }else{
                    this.$router.push({name:'SearchResoultr', query:  { word: this.value, category_id: this.ruralarticalid }  })
                }
            },
            closeValue(){
                this.value = ''
            },
            // 清空历史搜索
            closeSearchHostory(){
                this.searchHostory = '';
                ruralSearchClear().then(res=>{
                    mui.toast('删除成功',{ duration:500 })
                })
            },
            //单个删除历史搜索
            delHistory(item,index){
                let params = { word:  item }
                ruralDelHistory(params).then(res=>{
                    if(res.code == 0){
                        this.searchHostory.splice(index,1)
                    }
                })
            },
            getSearchHostory(){
                ruralSearchIndex().then(res=>{
                    this.searchHostory = res.data.search_history
                    this.hotWords = res.data.hotwords
                    console.log(res)
                })
            },
            // 点击关键词搜索
            wordSearch(item){
                this.value = item
                this.toSearch()
            },
            // 历史关键词搜索
            historySearch(item){
                this.value = item
                this.toSearch()
            }
                        
        }
    }
</script>

<style scoped lang="less">
    ul,li{
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .search{
        background-color: #fff;
        position: absolute;
        height: 100%;
    }
    #header{
        height: 50px;
        line-height: 50px;
        text-align: left;
        box-sizing: border-box;
        .mui-icon-search{
            position: absolute;
            left: 5%;
            top: 5%;
            color: #000;
        }
        input[type=text]{
            width: 86%;
            height: 40px;
            padding: 0 10%;
            background-color: #ededef;
            margin-bottom: 0;
            border-radius: 24px;
            margin-right: 0.1rem;
            border: 0;
        }
        .mui-icon-close{
            position: absolute;
            right: 18%;
            top: 5%;
        }
        .closeSearch{
            width: 12%;
            color: #159478;
            font-size: 0.4rem;
        }
    }
    // 历史搜索
    .searchDiv{
        p{
            text-align: left;
            color: #333;
            font-size: 0.3rem;
            padding: 0.4rem 0.28rem;
            margin-bottom: 0;
        }
        .flagStyle{
            font-size: 0.27rem;
            color: #8a8a8a; 
        }
        .searchList{
            padding: 0 0.28rem;
            .searchLi{
                float: left;
                margin-right: 0.3rem;
                margin-bottom: 0.6rem;
                border-radius: 0.2rem;
                box-sizing: border-box;
                position: relative;
                a{
                    font-size: 0.27rem;
                    color: #8a8a8a;
                    padding: 0.25rem 0.4rem;
                    background-color: #f5f5f5;
                }
                .delHistory{
                    font-size: 0.4rem;
                    position: absolute;
                    top: -0.4rem;
                    right: -0.3rem;
                }
            }
        }
    }

    // 筛选框       
    .recomment{
        .mui-content{
            .mui-slider{
               margin-top: 50px;
               overflow: visible;
               position: static;
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
                    }
                  
               }
            }
        }    
    }    
            
</style>