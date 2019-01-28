<template>
  <div>
    <header id="header" class="mui-bar mui-bar-nav">
      <h1 class="mui-title">登录</h1>
      <a :href="tel" class="mui-icon mui-icon-contact mui-pull-right"></a>
    </header>
    <div class="mui-content">
      <form id='login-form' class="mui-input-group">
        <div class="mui-input-row">
          <label>账号</label>
          <input id='account' type="text" v-model="name" class="mui-input-clear mui-input" placeholder="请输入账号">
        </div>
        <div class="mui-input-row">
          <label>密码</label>
          <input id='password' type="password" v-model="pwd" class="mui-input-clear mui-input" placeholder="请输入密码">
        </div>
      </form>
      <div class="mui-content-padded">
        <a @click="loginSuccess"><button id='login' class="mui-btn mui-btn-danger mui-btn-outlined">登录</button></a>
        <div class="link-area">
          <router-link to="/repassword" tag="a" id='forgetPassword'><button type="button" class="mui-btn mui-btn-outlined mui-pull-left">忘记密码</button></router-link>
          <router-link to="/register" tag="a" id='forgetPassword'><button type="button" class="mui-btn mui-btn-outlined mui-pull-right">立即注册</button></router-link>
        </div>
      </div>


      <!-- 第三方登录 -->
      <!-- <div class="otherLogin">
        <div class="otherTitle">第三方登录</div>
          <ul>
            <li>
                <img src="../../../assets/images/CouldEnter/wechat.png" alt="">
                <p>微信</p>
            </li>
            <li id="qq_login_btn" @click="otherLoginQQ">
                <img src="../../../assets/images/CouldEnter/qq.png" alt="">
                <p>QQ</p>
            </li>
            <li>
                <img src="../../../assets/images/CouldEnter/weibo.png" alt="">
                <p>微博</p>
            </li>
          </ul>
      </div> -->
    </div>
  </div>
</template>

<script>
  import {
    checkUser,
    ContactCustomerService
  } from '../../../api/index.js'
  export default {
    data() {
      return {
        name: '',
        pwd: '',
        error: '',
        tel:'',
      }
    },
    created(){
      this.getServiceTel()
    },
    methods: {
      loginSuccess() {
        let params = {
          mobile: this.name,
          password: this.pwd
        }
        checkUser(params).then(res => {
          if (res.code == 0) {
            // this.$store.commit('setStorage', res.data);
            localStorage.setItem('User-Token', res.data.token)
            localStorage.setItem('indentity', res.data.identity)
            // this.name = ''
            // this.pwd = ''
            // this.$router.push({ path: 'cloudentrance' })
            let redirect = decodeURIComponent(this.$route.query.redirect || '/');
            this.$router.push({
              path: redirect
            })
          } else {
            mui.toast('账号密码错误');
          }
        })
      },
      // 联系客服
      // contactService() {
      //   var that = this
      //   ContactCustomerService().then(res => {
      //     mui.alert('客服热线:' + ' ' +res.data, '联系客服', function () {
            
      //     });
      //   })
      // },
      // 获取客服电话
      getServiceTel(){
          ContactCustomerService().then(res=>{
              this.tel= 'tel:'+ res.data
          })
      },
      
    }
  }

</script>

<style scoped lang="less">
  // 头部导航
  #header {
    @headerBg: #ff0000;
    @headerHeight: 50px;
    background: @headerBg;
    height: @headerHeight;

    .mui-title {
      color: #fff;
      height: @headerHeight;
      line-height: @headerHeight;
    }

    .mui-pull-right {
      height: @headerHeight;
      line-height: 32px;
      color: #fff;
    }
  }

  .mui-content {
    margin-top: 0.3rem !important;

    .mui-input-row {
      height: 1rem;
      box-sizing: border-box;

      label {
        line-height: 1rem;
        padding: 0;
        width: 20%;
      }

      input {
        width: 80%;
        height: 1rem;
        // line-height: 1.1rem;
        padding: 0;
      }
    }

    .mui-input-row:after {
      left: 0;
    }

    .mui-content-padded {
      margin-top: 0.8rem;

      #login {
        width: 100%;
        border: 2px solid #f00;
        padding: 0.25rem 0;
        color: #ff0000;
        font-weight: bold;
        font-size: 0.3rem;
      }

      .link-area {
        margin-top: 0.28rem;
      }

    }

    // 第三方登录
    .otherLogin{
      position: absolute;
      bottom: 0;
      left: 10%;
      right: 10%;
      .otherTitle{
        font-size: 0.32rem;
        color: #666;
      }
      ul{
        display: flex;
        justify-content: space-around;
        padding-left: 0;
        li{
          list-style: none;
          img{
            width: 0.8rem;
            height: 0.8rem;
          }
        }
      }
    }
  }

</style>
