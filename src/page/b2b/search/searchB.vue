<template>
    <div>
        <header id="header" class="mui-bar mui-bar-nav">
            <span class="mui-icon mui-icon-left-nav mui-action-back "></span>
            <div class="searchInput">
                <input type="text" name="" id="" v-model="value"  @change="getSearch">
                <span class="mui-icon mui-icon-close" @click="closeValue"></span>
            </div>
            <span class="searchBtn">搜索</span>
		</header>
             
       <!-- 搜索结果展示 -->
       <div class="searchDiv">
           <search-resoult :listData="searchList"></search-resoult>
            <!-- 加载更多 -->
            <div class="loadingMore"  v-if="searchList.length == 0 || searchList.length < 10? false : true" >
                <button  class="mui-btn mui-btn-danger mui-btn-outlined" @click="morePage()">加载更多</button>
            </div>
           <span v-if="resoultNull">暂无更多内容</span>
       </div>
        
    </div>
</template>

<script>
    import searchResoult from '../../../components/RecommentList.vue'
    import mui from '../../../../static/mui/js/mui.min.js'
    import { b2bSearch } from '../../../api/index.js'
    export default {
        data() {
            return {
                value:'',
                limit: 10, //每页传多少数据，可不传，默认为10
                page: 0,   //页码，可不传，默认为0
                dataLength:'',//每一次的数据长度
                resoultNull:false,
                searchList:[],//搜索结果显示
            }
        },
        components:{
            searchResoult,
        },
        watch:{
            // 监听value值的变化
            value(oldVal,newVal){
                var reg = /^\s*$/g;
                if(oldVal == "" || reg.test(oldVal)){
                    this.searchList.length = 0;
                    this.page = 0;
                    this.resoultNull = false
                }
            }
        },
        methods:{
            closeValue(){
                this.value = '',
                this.resoultNull = false
            },
            getSearch(){
                var reg = /^\s*$/g;
                if(this.value == "" || reg.test(this.value)){
                    this.searchList.length = 0;
                    this.page = 0;
                    mui.toast('请输入要搜索的内容！')
                }else{
                    let params = {search: this.value , page: this.page, limit: this.limit}
                    b2bSearch(params).then(res=>{
                        this.searchList = this.searchList.concat(res.data)
                        this.dataLength = res.data.length
                        console.log(this.searchList)
                        if(res.data.length == 0){
                            this.resoultNull = true
                        }
                    }) 
                }
            },
            // 加载更多
            morePage(){
                if(this.dataLength < 10){
                    mui.toast('没有更多了')
                }else{
                    this.page++
                    this.getSearch()
                }
            },
                        
        }
    }
</script>

<style scoped lang="less">
    ul,li{
        list-style: none;
        margin: 0;
        padding: 0;
    }
    #header{
        height: 50px;
        line-height: 50px;
        text-align: left;
        box-sizing: border-box;
        background: #ededef;
        display: flex;
        justify-content: space-between;
        .mui-icon-left-nav {
            height: 50px;
            line-height: 32px;
            color: #333;
        }
        .searchInput{
            width: 80%;
            position: relative;
            input[type=text]{
                // width: 100%;
                height: 30px;
                padding: 0 12% 0 5%;
                background-color: #fff;
                margin-bottom: 0;
                border-radius: 24px;
                border: 0;
            }
            .mui-icon-close{
                position: absolute;
                right: 2%;
                top: 5%;
            }
        }
        .searchBtn{
            font-size: 0.32rem;
            color: #333;
        }
    }
    .searchDiv{
        margin-top: 1.2rem;
    }
    // 加载更多按钮
    .loadingMore{
        margin-bottom: 1rem;
       button{
           width: 80%;
       }
    }  
</style>