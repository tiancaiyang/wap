<template>
    <div class="logisticsDiv">
        <!-- 头部 -->
        <header id="header" class="mui-bar mui-bar-nav header">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">填写物流信息</h1>
        </header>
        <!--物流单详情  -->
        <div class="content">
            <div class="logisticscNum">
                <label>物流单号：</label>
                <input type="text" class="text" name="number" v-model="num" placeholder="请输入物流单号" />
            </div>
        </div>
        <!--底部  提交物流申请  -->
        <div class="fixed">
            <div class="submit" @click="submitLogistics">提交物流申请</div>
        </div>
    </div>
</template>

<script>
    import { b2cOrderSubmitLogistics } from '../../../api/index.js'
    export default {
        data() {
            return {
                orderNo: this.$route.params.orderNo,//订单号
                id: this.$route.params.id,//退款号
                num:'',//物流单号
            }
        },
        methods:{
            // 提交物流单号
            submitLogistics(){
                var reg = /^\s*$/g;
                if(this.num == "" || reg.test(this.num)){
                    mui.toast('请输入物流单号！',{ duration:500 })
                }else{
                    let params = { order_no: this.orderNo , express:this.num, detail_id:this.id }
                    b2cOrderSubmitLogistics(params).then(res=>{
                        if(res.code == 0){
                            mui.toast( res.msg)
                            this.num = '';
                            this.$router.push({  name: 'Orderc' })
                        }else{
                            mui.toast( res.msg ,{ duration:500 })
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped lang="less">
.logisticsDiv{
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #fff;
}
//  头部
#header {
  @headerBg: #fff;
  @headerHeight: 50px;
  background: @headerBg;
  height: @headerHeight;
  .mui-pull-left {
    height: @headerHeight;
    line-height: 32px;
    color: #333;
  }
  .mui-title {
    color: #333;
    font-weight: bold;
    height: @headerHeight;
    line-height: @headerHeight;
  }
  .mui-pull-right {
    height: @headerHeight;
    line-height: 50px;
    color: #333;
  }
}
// 内容
.content{
    padding-top: 50px;
    .logisticscNum{
        padding: 0.5rem 0.28rem 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        input{
            width:70%;
            margin-bottom: 0;
        }
    }

}
// 底部
.fixed{
    height: .85rem;
    position: fixed;
    bottom:1rem;
    left: 10%;
    right: 10%;
}
.submit{
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: .34rem;
    line-height: .85rem;
    border-radius:.425rem; 
    background: url(../../../assets/images/b2c/logisticsc/background.png) no-repeat 0 0;
    background-size: 100%;
}
</style>