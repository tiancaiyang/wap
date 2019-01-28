<template>
  <!-- 头部 -->
    <div class="container">
        <header id="header" class="mui-bar mui-bar-nav header">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">全部评价</h1>
        </header>
        <div class="mui-content">
             <!-- 评论列表 -->
				<div class="commentList" v-for="item in evalusteData" :key="item.assess_id">
                    <div class="mui-card-header mui-card-media">
                        <img :src="item.head_image" />
                        <div class="mui-media-body">
                            {{ item.username }}
                            <p>发表于{{ item.create_time }}</p>
                        </div>
                    </div>
                    <div class="mui-card-content" >
                        <p v-if="item.content == '' && item.images.length == 0">默认好评</p>
                        <p v-else>{{ item.content }}</p>
                        <div class="commentsImg" >
                            <img :src="images.image" alt="" v-for="images in item.images" :key="images.index">
                        </div>
				    </div>
				</div>
        </div>
    </div>  
</template>

<script>
    import { b2cEvaluationAll } from '../../../api/index.js'
    export default {
        data() {
            return {
                productId: this.$route.params.productId,//传递过来的商品id
                evalusteData:[],//接收数据
                page:0,
                limit:10,
            }
        },
        created(){
            this.getevaluateData()
        },
        methods:{
            getevaluateData(){
                let params = { product_id: this.productId }
                b2cEvaluationAll(params).then(res=>{
                    this.evalusteData = res.data
                    console.log(this.evalusteData)
                })
            }
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

    // 评价列表
    .mui-content{
        padding-top: 50px;
        margin-bottom: 1rem;
        .commentList{
                padding: 0 0.28rem;
                text-align: left;
                background-color: #fff;
                border-bottom: 1px solid #dcdcdc;
                .mui-card-header:after{
                    height: 0;
                }
                .mui-card-header{
                    padding-left: 0;
                }
                .mui-card-content{
                    p{
                        color: #000;
                    }
                    .commentsImg{
                        display: flex;
                        flex-wrap: wrap;
                        img{
                            width: 30%;
                            margin: 0 0.2rem 0.2rem 0;
                            max-height: 2rem;
                        }
                    }    
                }
        }
    }
</style>