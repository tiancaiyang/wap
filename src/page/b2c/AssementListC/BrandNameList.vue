<template>
    <div>
        <!-- b2c品牌商商品列表 -->
        <header id="header" class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{ title }}</h1>
        </header>
        <div class="mui-content">
            <shop-list :listData="productList"></shop-list>
            <!-- 加载更多 -->
            <div class="loadingMore"  v-if="productList.length == 0 || productList.length < 10? false : true" >
                <button  class="mui-btn mui-btn-danger mui-btn-outlined" @click="morePage()">加载更多</button>
            </div>
        </div>   

    </div>
</template>

<script>
    import {  b2cBrandNameList } from '../../../api/index.js'
    import ShopList from '../../../components/Shoplist.vue'
    export default {
        data() {
            return {
                cid: this.$route.query.cid,
                title: this.$route.query.title,
                page: 0,//第一页 0 参数传递
                limit: 20,//每页多少条，默认20 参数传递
                dataLength:'',//数据长度
                productList: [], //产品列表数据
            }
        },
        components:{
            ShopList
        },
        created(){
            this.getb2caccresProduct();
        },
        methods:{
            // 商品列表数据
            getb2caccresProduct(){
                let params = {
                        brand_member_id: this.cid, 
                        page: this.page,
                        limit: this.limit,
                    }
                b2cBrandNameList(params).then(res=>{
                    this.productList = this.productList.concat(res.data);
                    this.dataLength = res.data.length;
                    console.log(res)
                }) 
            },
            // 加载更多
            morePage(){
                if(this.dataLength < 20){
                    this.dataLength = ''
                    mui.toast('没有更多了')
                }else{
                    this.page++
                    this.getb2caccresProduct()
                }
            },
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
        // 加载更多按钮
        .loadingMore{
            margin-bottom: 1rem;
            button{
                width: 80%;
            }
        } 
    }            
</style>