<template>
    <div>
        <header id="header" class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">好货特卖</h1>
		</header>
        <div class="mui-content">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media" v-for="item in saleList" :key="item.product_id">
                    <a href="javascript:;">
                        <img class="mui-media-object mui-pull-left" :src="item.thumb">
                        <div class="mui-media-body">
                            <h4>{{ item.title }}</h4>
                            <div class="info mui-clearfix">
                                <div class="price mui-pull-left">
                                    <p class="nowPrice"  :style="'color:'+(item.ratio == 100 ? 'gray':'#ea0000')+';'">￥<b>128.6</b></p>
                                    <p class="oldPrice"><del>￥256</del></p>
                                </div>
                                <div class="mui-pull-right">
                                    <router-link :to="'/shopdetailB/' + item.product_id"  tag="button" type="button" class="mui-btn mui-btn-danger" v-if="item.ratio != 100">立即抢购</router-link>
                                    <button type="button" class="mui-btn mui-btn-gray" v-else-if="item.ratio == 100">立即抢购</button>
                                    <process-container :total="item.ratio" :barwidth="item.ratio"></process-container>  
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
               
            </ul>    
        </div>
    </div>
</template>

<script>
    import mui from '../../../../../static/mui/js/mui.min.js'
    import { b2bSaleActivity  } from '../../../../api/index.js'
    import ProcessContainer from '../../../../components/ProgressContainer.vue'
    export default {
        data() {
            return {
                saleList:[],//数据列表
            }
        },
        created(){
            this.getb2bSaleData()
        },
        methods:{
            getb2bSaleData(){
                b2bSaleActivity().then(res=>{
                    this.saleList = res.data
                    console.log(this.saleList);
                })
            }
        },
        components:{
            ProcessContainer
        }
    }
</script>

<style scoped lang='less'>
    #header{
        height: 50px;
        background-color: #f33026;
        .mui-title{
            height: 50px;
            line-height: 50px;
            font-weight: bold;
            color: #fff;
        }
        .mui-action-back{
            font-size: 30px;
            color: #fff;
        }
    }
    .mui-content{
        padding-top: 50px!important;
        .mui-table-view:first-child {
            margin-top: 0;
        }
        .mui-table-view{
            .mui-table-view-cell{
                a{
                    padding: 0.3rem 15px;
                    text-align: left;
                    .mui-media-object{
                        // margin-top: 0.25rem;
                        // margin-bottom: 0.25rem;
                        width: 26%;
                        max-width: 26%;
                        height: 90%;
                        
                    }
                    .mui-media-body{
                        h4{
                            color: #222;
                            font-size: 0.32rem;
                            line-height: 0.4rem;
                            font-weight: normal;
                            margin-bottom: 0.2rem;
                        }
                        .info{
                            .price{
                               padding-top: 0.25rem;
                                p{
                                    margin-bottom: 0;
                                    text-align: left;
                                }
                                .nowPrice{
                                    color: #e51616;
                                    b{
                                        font-size: 0.34rem;
                                    }
                                }
                                .oldPrice{
                                    color: #999;
                                }
                            }
                            .mui-btn-danger{
                                border: 0;
                                padding: 0.1rem 0.2rem;
                                font-size: 0.25rem;
                            }
                            .mui-btn-gray{
                                background-color: gray;
                                color: #fff;
                            }
                        }
                        .mui-demo-container{
                            p{
                                margin-top: 0.2rem;
                                height: 8px;
                                span{
                                    background-color: red;
                                }
                            }
                        }

                    }
                }
            }
            .mui-table-view-cell>a:not(.mui-btn){
                white-space: normal;
            }
        }
        .mui-table-view .mui-media-body{
            overflow: visible;
        }
    }
    
</style>