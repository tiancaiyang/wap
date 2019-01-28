<template>
    <div>
        <header id="header" class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">评价列表</h1>
		</header>
        <div class="mui-content">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media" v-for="item in evaluationOrder" :key="item.order_detail_id">
                    <a href="javascript:;">
                        <img class="mui-media-object mui-pull-left" :src="item.thumb">
                        <div class="mui-media-body">
                            <h4 class="mui-ellipsis-2">{{ item.title }}</h4>
                            <div class="info mui-clearfix">
                                <button @click="mastEvaluation(item)" type="button" class="mui-btn mui-btn-danger" v-if="item.is_assess == 0">立即评价</button>
                                <button type="button" class="mui-btn mui-btn-gray" v-else-if="item.is_assess == 1">已评价</button>  
                            </div>
                        </div>
                    </a>
                </li>
               
            </ul>    
        </div>
    </div>
</template>

<script>
    import mui from '../../../../static/mui/js/mui.min.js'
    import { b2bEvaluationOrder  } from '../../../api/index.js'
    export default {
        data() {
            return {
                order_no: this.$route.params.orderNo,
                evaluationOrder:[],//数据列表
            }
        },
        created(){
            this.getb2bEvaluationOrder()
        },
        methods:{
            getb2bEvaluationOrder(){
                let params = { order_no: this.order_no }
                b2bEvaluationOrder(params).then(res=>{
                    this.evaluationOrder = res.data
                    console.log(this.evaluationOrder);
                })
            },
            // 立即评价按钮
            mastEvaluation(item){
                let param = {
                    order_no: this.order_no,
                    order_detail_id : item.order_detail_id,
                    product_id : item.product_id,
                    product_name : item.title,
                    thumb : item.thumb,
                }
                this.$router.push({ name: 'Evaluationc',query: param })
            }
        },
    }
</script>

<style scoped lang='less'>
    #header{
        height: 50px;
        background-color: #fff;
        .mui-title{
            height: 50px;
            line-height: 50px;
            font-weight: bold;
            color: #333;
        }
        .mui-action-back{
            font-size: 30px;
            color: #333;
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
                        height: 100%;
                        h4{
                            color: #222;
                            font-size: 0.32rem;
                            line-height: 0.4rem;
                            font-weight: normal;
                            margin-bottom: 0.2rem;
                        }
                        .info{
                            position: absolute;
                            right: 0.28rem;
                            bottom: 0.28rem;
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