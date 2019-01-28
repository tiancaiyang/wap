<template>
    <div id="recommentListDiv">
        <div class="recomendList">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell" v-for="item in listData" :key="item.product_id">
                    <router-link :to="'/shopdetailB/' + item.product_id" tag="a" @click.native="refresh">
                        <span class="activeIcon" v-if="item.activity_type == 1">特价</span>
                        <img :src="item.thumb" alt=""> 
                        <div class="listInfo">
                            <h4 class="mui-ellipsis-2">{{ item.title }}</h4>
                            <p class="price">￥<b>{{ item.price }}</b></p>
                        </div>
                    </router-link>
                </li>
            </ul>
            <!-- 如果没有数据 -->
            <null-list v-if="JSON.stringify(listData) == {}"></null-list>
        </div>     
    </div>
</template>

<script>
    import nullList from './nullGoodsList.vue'
    export default {
        data() {
            return {
                
            }
        },
        props: { listData:{} },
        methods:{
    　　　　refresh(){
    　　　　　　this.$router.go(0);  
    　　　　}
    　　},
        components:{
            nullList
        }
    }
</script>

<style scoped lang="less">
    #recommentListDiv{
        // 相关推荐商品列表
        ul,li{
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .recomendList{
            margin-top: 0.28rem;
            // padding: 0 0.28rem;
            .mui-table-view{
                background-color: #efefef;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                .mui-table-view-cell{
                    width: 49%;
                    text-align: left;
                    background-color: #fff;
                    margin-bottom: 0.25rem;
                    a{
                        margin: 0;
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
                            background-color: #fff;
                            h4{
                                color: #222;
                                font-size: 0.28rem;
                                font-weight: bold;
                                padding-top: 0.1rem;
                            }
                            p{
                                color: #e51616;
                                font-size: 0.3rem;
                                font-weight: normal;
                                b{
                                    font-size: 0.28rem;
                                }
                                span{
                                    color: #999;
                                    font-size: 0.28rem;
                                }
                            }
                        }
                    }
                }
                .mui-table-view-cell:after{
                    height: 0;
                }
            }
            .mui-table-view:before{
                height: 0;
            }  
            .mui-table-view:after{
                height: 0;
            }
        }
    }
    
</style>