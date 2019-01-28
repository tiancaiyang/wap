<template>
    <div>
        <header id="header" class="mui-bar mui-bar-nav header">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">物流详情</h1>
        </header>
        <!-- 详情 -->
        <div class="mui-content">
            <!-- 物流信息 -->
            <div class="show-postion">
                <span>物流信息</span>
                <div  v-for="(item,index) in logisticList" :key="item.index" :class="['line-message' ,index == 0? 'active':'' ]">
                    <img src="../../../assets/images/b2c/logisticsdetailc/line_3.png" class="line_3" alt="">
                    <img src="../../../assets/images/b2c/logisticsdetailc/line_2.png" class="line_2" alt="" v-if="index !== logisticList.length-1">
                    <div class="address-text">{{ item.context }}</div>
                    <div class="time-text">{{ item.ftime }}</div>
                    <div class="line-text" v-if="index !== logisticList.length-1"></div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
    import { b2cOrderLogistics } from '../../../api/index.js'
    export default {
        data() {
            return {
                orderNo: this.$route.params.orderNo,
                express_no: 283188533834,
                logisticList:[],//数据列表
            }
        },
        created(){
            this.getLogisticsDetail()
        },
        mounted(){
            //  document.body.style.overflowX='hidden'
        },
        methods:{
            getLogisticsDetail(){
                let params = { express_no: this.express_no }
                b2cOrderLogistics(params).then(res=>{
                    this.logisticList = res.data
                    console.log(this.logisticList)
                })
            }
        }
    }
</script>

<style scoped lang="less">

      //  头部
    html{
        position: relative;
    }
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
        font-weight: bold;
        height: @headerHeight;
        line-height: @headerHeight;
      }
    }
    .mui-content{
        padding-top: 50px;
        padding-bottom: 1rem;
        background-color: #fff;
    }
// 物流信息
.show-postion{
    width: 100%;
    height: auto;
    margin-top: .2rem;
    padding: 0 0.28rem;
    span{
        width: 100%;
        padding: .3rem 0 .3rem 0;
        text-align: left; 
        float: left;
        background: #fff;
        color: #666;
        border-bottom:1px solid #f0f0f0;
    }
    .line-message{
        display: flex;
        width: 100%;
        margin: 0;
        flex: 1;
        flex-direction: column;
        position: relative;
        font-size: .32rem;
    
    }
    .active{
        color: #ff2400;
    }
    .line-message div{
        height:auto;
        flex: 1;
        margin-left: .2rem;
        flex-wrap: wrap;
        text-align:left;
        font-size: .28rem;
        line-height: .4rem;
    }


    .line_3{
        position: absolute;
        left: 0;
        top: .3rem;
        width: .18rem;
        height: .18rem;
    }
    .line_2{
        position: absolute;
        top: .5rem;
        width: .2rem;
        height: 100%;
        bottom: 0;
    }
    .address-text{
        width: 98%;
        margin-top: .2rem;
    }
    .time-text{
        width: 95%;
    }
    .line-text{
        width: 100%;
        border-bottom:1px solid #f0f0f0;
        margin: .2rem 0 .2rem 0;
    }
}
    
</style>