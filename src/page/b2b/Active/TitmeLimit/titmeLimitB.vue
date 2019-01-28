<template>
    <div>
        <header id="header" class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">限时秒杀</h1>
		</header>  
        <div class="mui-content">
            <div class="mui-card" v-for="item in titmeLimit" :key="item.index">
				<div class="mui-card-header">
                     <!-- <div class="statesImg">{{ item.is_begin | orderStatus }}</div> -->
                     <div  :class="item.seckill_status == 0 ? 'overImg':'statesImg'">{{ item.seckill_status | orderStatus }}</div>
                     <!-- <p class="mui-pull-right"  v-if="item.seckill_status == 1" ><count-down :endTime = item.over_time endText="已经结束了"></count-down></p> -->
                     <p class="mui-pull-right"  v-if="item.seckill_status == 1" ><time-tow :seckillTime="item.over_time"></time-tow></p>
                </div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<img :src="item.thumb" alt="">
                        <h4>{{ item.title }}</h4>
                    </div>
				</div>
				<div class="mui-card-footer">
                   <div class="price">
                        <p class="nowPrice">￥<b>{{ item.seckill_price }}</b> <span class="linitNum">限购{{ item.every_num }}</span></p>
                        <p class="oldPrice"><del>￥{{ item.price }}</del></p>
                   </div>
                    <div class="mui-pull-right">
                        <router-link :to="'/limitShopDteailB/'+item.product_id+'/'+item.seckill_id" tag="button" type="button" class="mui-btn mui-btn-danger" v-if="item.seckill_status == 1">立即抢购</router-link>
                        <button type="button" class="mui-btn mui-btn-gray" v-else-if="item.seckill_status != 1">立即抢购</button>
                    </div>
                </div>
			</div>
        </div>                 
    </div>
</template>

<script>
    import mui from '../../../../../static/mui/js/mui.min.js'
    import CountDown from '../../../../components/Time.vue'
    import timeTow from '../../../../components/timeTow.vue'
    import { b2bTimeLimit } from '../../../../api/index.js'
    export default {
        data() {
            return {
                titmeLimit:[],//限时数据列表
            }
        },
        created(){
           this.getTitmeLimit()
        },
        filters:{
            // 不同状态展示不同文字
            orderStatus(seckill_status){
                var res = ''
                if(seckill_status == -1){
                    res = '未开始'
                }else if(seckill_status == 0){
                    res = '已抢完'
                }else if(seckill_status == 1){
                    res = '正在进行'
                }else if(seckill_status == 2){
                    res = '已参与'
                }
                return res;
            }
        },
        methods:{
           getTitmeLimit(){
               b2bTimeLimit().then(res=>{
                   this.titmeLimit = res.data
                   console.log(res)
               })
           }
        },
        components:{
            CountDown,
            timeTow
        }
    }
</script>

<style scoped lang="less">
    #header{
        height: 50px;
        background-color: #e51616;
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
        padding-top: 50px;
    }
    .mui-card{
        margin: 0.25rem 0;
        .mui-card-header{
            .statesImg{
                width: 1.3rem;
                height: 0.4rem;
                line-height: 0.4rem;
                background: url(../../../../assets/images/CouldEnter/Active/statesImg.png) no-repeat;
                background-size: 100% 100%;
                color: #fff;
                font-size: 0.25rem;
                font-weight: bold;
            }
            .overImg{
                width: 1.3rem;
                height: 0.4rem;
                line-height: 0.4rem;
                background: url(../../../../assets/images/CouldEnter/Active/statesImg02.png) no-repeat;
                background-size: 100% 100%;
                color: #fff;
                font-size: 0.25rem;
                font-weight: bold;
            }
            img{
                width: 1.2rem;
                height: 0.4rem;
            }
            p{
                color: #000;
                margin-bottom: 0;
            }
        }
        .mui-card-header:after{
            height: 0;
        } 
        .mui-card-content{
            .mui-card-content-inner{
                padding-bottom: 0;
                img{
                    height: 2.3rem;
                }
                h4{
                    text-align: left;
                    color: #222;
                }
            }
        }
        .mui-card-footer{
            .price{
                p{
                    margin-bottom: 0;
                    text-align: left;
                }
                .nowPrice{
                    color: #e51616;
                    b{
                        font-size: 0.34rem;
                    }
                    .linitNum{
                        font-weight: normal;
                        font-size: 0.2rem;
                        color: #e51616;
                        padding: 0.04rem 0.1rem;
                        background-color: #f3c9bd;
                        border:1px solid #e51616;
                        border-radius: 0.08rem;
                    }
                }
                .oldPrice{
                    color: #999;
                }
            }
            .mui-btn-gray{
                background-color: gray;
                color: #fff;
            }
        }
        .mui-card-footer:before{
            height: 0;
        }
    }


    
</style>