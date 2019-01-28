<template>
    <div>
        <header id="header" class="mui-bar mui-bar-nav">
            <span class="mui-icon mui-icon-search "></span>
            <input type="text" name="" id="" v-model="value">
            <span class="mui-icon mui-icon-close" @click="closeValue"></span>
            <span class="mui-pull-right closeSearch" @click="toSearch()">确定</span>
		</header>
         <!-- 切换导航 -->
        <div class="recomment">
             <div class="mui-content">
                <div id="slider" class="mui-slider mui-fullscreen">
                    <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                        <div class="mui-scroll">
                            <a :class=" item.id == 0 ? 'mui-active': ''" class="mui-control-item" v-for="item in ArticalId" :key="item.id" @tap="toSearch(item.id)">
                                {{ item.name }}
                            </a>
                        </div>     
                    </div>
                    <div class="mui-slider-group">
                        <div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
                            <div id="scroll1" class="mui-scroll-wrapper">
                                <div class="mui-scroll">
                                    <ul class="mui-table-view">
                                        <li class="mui-table-view-cell" v-for="item in searchResoult" :key="item.article_id">
                                            <router-link :to="'/ruralHome/Searchinfor/'+ item.article_id" tag="p" class="recomTitle" v-html="item.title"></router-link>
                                            <img :src=" item.thumb " alt="">  
                                            <div class="time">
                                                <span>{{ item.create_time }}</span>
                                                <span class="mui-pull-right read">{{ item.read_number }}阅</span>
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
                  
    </div>
</template>

<script>
    import { ruralArticalId, ruralSearch } from '../../api/index.js'
    export default {
        data() {
            return {
                value: this.$route.query.word,
                ruralarticalid: this.$route.query.category_id,
                ArticalId:[],//分类的id
                searchResoult:[],//搜索结果列表
            }
        },
        created(){
            this.getArtical()
            this.toSearch()
        },
        mounted(){
            var gallery = mui('.mui-slider');
			gallery.slider({
				interval:0//自动轮播周期，若为0则不自动播放，默认为0；
			});
        },
        methods:{
            closeValue(){
                this.value = ''
            },
            changeColor (resultsList) {
                if(resultsList.length !== 0){
                    resultsList.map((item, index) => {
                        // console.log('item', item)
                        if (this.value && this.value.length > 0) {
                            // 匹配关键字正则
                            let replaceReg = new RegExp(this.value, 'g')
                            // 高亮替换v-html值
                            let replaceString ='<span style="color:#159478;">' + this.value + '</span>'
                            resultsList[index].title = item.title.replace(replaceReg,replaceString)
                        }
                    })
                    this.results = []
                    this.results = resultsList
                }
            },
            // 文章分类
            getArtical(){
                ruralArticalId().then(res=>{
                    this.ArticalId = res.data
                })
            },
            // 导航切换

            // 搜索结果
            toSearch(id){
                this.ruralarticalid = id;
                let params = { word: this.value, category_id: this.ruralarticalid }
                ruralSearch(params).then(res=>{
                    this.searchResoult = res.data
                    this.changeColor(this.searchResoult)
                })
            },   
                        
        }
    }
</script>

<style scoped lang="less">
    #header{
        height: 50px;
        line-height: 50px;
        text-align: left;
        box-sizing: border-box;
        .mui-icon-search{
            position: absolute;
            left: 5%;
            top: 5%;
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
    // 切换导航
    .recomment{
        position: relative;
        .mui-content{
            .mui-slider{
               top: 50px; 
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
        }
    }          
</style>