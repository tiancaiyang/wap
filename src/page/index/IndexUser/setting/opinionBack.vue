<template>
  <div class="opinion">
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">意见反馈</h1>
    </header>

    <div class="upload">
      <div class="upload-title">
        <textarea name="" id="" placeholder="感谢您向我们提出宝贵意见,我们会及时改正" v-model="msg" maxlength="300">
        </textarea>
      </div>
    </div>

    <div class="upload_button">
      <button type="button" class="mui-btn mui-btn-danger" @click="subOpinion">提交</button>
    </div>
  </div>
</template>

<script>
  import mui from '../../../../../static/mui/js/mui.min.js'
  import {
    userOpinionBack
  } from '../../../../api/index.js'
  export default {
    data() {
      return {
        msg: '',
        token: '' //获取localstorage里面是否存在token
      }
    },
    created() {
      this.token = localStorage.getItem('User-Token')
    },
    methods: {
      subOpinion() {
        let params = {
          feed_back_info: this.msg
        }
        let reg = /^\s*$/g;
        if (!this.token) {
          mui.toast('您还未登录',{ duration:2000 });
        } else {
          if (this.msg == "" || reg.test(this.msg)) {
            mui.toast('请输入内容',{ duration:2000 });
          } else {
            userOpinionBack(params).then(res => {
              if (res.code == 0) {
                mui.toast('提交成功',{ duration:2000 });
                this.msg = ""
                this.$router.push({path:'/indexUser'})
              } else if (res.code == 1) {
                mui.toast('提交失败',{ duration:2000 });
              }
            })
          }
        }
      }
    }
  }

</script>

<style lang="less" scoped>
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

  .opinion {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #fff;
  }

  .upload {
    width: 100%;
    height: 5.4rem;
    background-color: #ffffff;
    margin-top: 50px;

    .upload-title {
      textarea {
        height: 4rem;
        font-size: .28rem;
        color: #999999;
        text-align: left;
        padding-top: .25rem;
        border: 0;
      }
    }

    .position-picture {
      width: 100%;
      position: relative;
      text-align: left;
      padding-left: .2rem;

      a {
        display: inline-block;
        margin-right: 0.25rem;
        width: 1.9rem;
        height: 1.9rem;

        .uploadimg {
          display: block;
          width: 1.9rem;
          height: 1.9rem;
          position: absolute;
        }

        .upload_input {
          position: absolute;
          top: 0.1rem;
          left: 0.3rem;
          display: block;
          width: 1.6rem;
          height: 1.6rem;
        }
      }
    }
  }

  .upload_button {
    width: 100%;
    height: 0.7rem;
    margin-top: 1.6rem;

    button {
      width: 68%;
      height: 100%;
      font-size: .3rem;
      border-radius: .5rem;
    }
  }

</style>
