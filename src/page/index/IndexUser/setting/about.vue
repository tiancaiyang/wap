<template>
  <div class="about">
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">关于我们</h1>
    </header>
    <div class="content" v-html="msg"></div>
  </div>
</template>

<script>
  import {
    userAboutUs
  } from '../../../../api/index.js'
  export default {
    data() {
      return {
        msg: ''
      }
    },
    mounted() {
      userAboutUs().then(res => {
        console.log(res.data.content)
        this.msg = res.data.content
        console.log(this.msg)
      })
    }
  }

</script>

<style lang="less">
  .about {
    #header {
      @headerBg: #fff;
      @headerHeight: 50px;
      background: @headerBg;
      height: @headerHeight;

      .mui-pull-left {
        height: @headerHeight;
        line-height: 30px;
        font-size: 30px;
        font-weight: 400;
        color: #333;
      }

      .mui-title {
        color: #333;
        font-weight: bold;
        height: @headerHeight;
        line-height: @headerHeight;
      }
    }

    .content {
      p {
        width: 100%;
        text-align: center;
        img {
          display: block;
          width: 100% !important;
          height: 100% !important;
        }
      }
    }
  }
</style>
