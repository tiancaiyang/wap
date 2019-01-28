<template>
  <div class="application_state">
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">商家申请</h1>
    </header>
    <div class="state_msg">
      <div class="success_msg">
        <p class="msg_title">
          <img src="../../../../assets/images/CouldEnter/user/success.png" v-if="data !=4 ">
          <img src="../../../../assets/images/CouldEnter/user/fail.png" v-else>
          <span>{{ data | statusInfo }}</span>
        </p>
        <div class="msg_content" v-if="this.data == 1">
          <p>{{ auditReasons }}</p>
        </div>
        <div class="msg_content" v-else-if="this.data == 2">
          <p>{{ auditReasons }}</p>
        </div>
        <div class="msg_content" v-else-if="this.data == 3">
          <p>{{ auditReasons }}</p>
        </div>
        <div class="msg_content" v-else-if="this.data == 4">
          <p>{{ auditReasons }}</p>
        </div>
        <div class="state_msg_btn" v-if="this.data == 3">
          <div >重新登录</div>
          <img src="../../../../assets/images/CouldEnter/user/btn-bg.png" alt="" @click="goLogin">
        </div>
        <div class="state_msg_btn" v-else-if="this.data == 4">
          <div  @click="goApplication">重新申请</div>
          <img src="../../../../assets/images/CouldEnter/user/btn-bg.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import { userApplicationStatus } from '../../../../api/index.js'
  export default {
    data() {
      return {
        indentity:'',//用户是b端还是c端
        data: '',  // 上个页面后台返回的状态的编码
        title: '',  // 状态语
        statusInfo: '',  // 状态的描述
        auditReasons:'',//审核提示
      }
    },
    created() {
      this.getStatus()
    },
    filters:{
      // 不同状态展示不同文字
      statusInfo(data){
        var res = ''
        if(data == 1){
          res = '申请已提交'
        }else if(data == 2){
          res = '审核中'
        }else if(data == 3){
          res = '审核已通过'
        }else if(data == 4){
          res = '审核未通过'
        }
        return res;
      }
    },
    methods: {
      getStatus(){
        userApplicationStatus().then(res=>{
          this.data = res.data.apply_status
          this.auditReasons = res.data.remark
        })
      },
      goLogin() {
        this.$router.push({path:'/login'})
      },
      goApplication(){
        this.$router.push({path:'/indexUser/application',query:{data:this.data}})
      }
    }
  }

</script>

<style lang="less" scoped>
  .application_state {
    #header {
      @headerBg: #fff;
      @headerHeight: 50px;
      background: @headerBg;
      height: @headerHeight;

      .mui-pull-left {
        height: @headerHeight;
        line-height: 32px;
        color: #333;
        font-size: 30px;
        font-weight: 400;
      }

      .mui-title {
        color: #333;
        font-weight: bold;
        height: @headerHeight;
        line-height: @headerHeight;
      }
    }

    .state_msg {
      margin-top: 2.8rem;

      .success_msg{
        p {
          margin-bottom: 0;
          padding: 0 1rem;
          font-size: .32rem;
          text-align: left;
        }

        .msg_title {
          height: 0.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: .6rem;

          img {
            width: .54rem;
            height: 0.54rem;
            margin-right: .15rem;
          }

          span {
            display: inline-block;
            font-size: .54rem;
            margin-left: .15rem;
          }
        }

        .state_msg_btn {
          display: block;
          margin-top: 3rem;
          position: relative;

          div {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            z-index: 999;
            line-height: 0.95rem;
            color: #fff;
            font-size: .21rem;

          }

          img {
            width: 4.6rem;
            // height: .9rem;
            border-radius: 0.5rem;
            vertical-align: middle;
          }
        }
      }
    }
  }

</style>
