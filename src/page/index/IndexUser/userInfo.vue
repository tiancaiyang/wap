<template>
  <div>
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">个人资料</h1>
    </header>
    <div class="info">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell headerLi">
          <a href="#picture">
            个人头像
            <img  v-if="!headerImg" src="../../../assets/images/CouldEnter/user/header.png" class="mui-pull-right">
            <img v-else :src="headerImg" class="mui-pull-right">
           
            <span class="mui-navigate-right"></span>
          </a>
          <input type="file" id="upload_btn" @change="add_img" ref="input_btn">
        </li>
        <router-link to="/indexUser/userinfo/userchangename" tag="li" class="mui-table-view-cell">
          用户名
          <span class="mui-pull-right" v-if="!userData.name">{{ userData.mobile }}</span>
          <span class="mui-pull-right" v-else>{{ userData.name }}</span>
          <span class="mui-navigate-right"></span>
        </router-link>
        <router-link to="/defaultAddress" tag="li" class="mui-table-view-cell">
          收货地址
          <span class="mui-pull-right mui-navigate-right">修改/添加</span>
          <span class="mui-navigate-right"></span>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
  import {
    userInfo,
    IndexUserBirthday,
    IndexUserHeaderImg,
  } from '../../../api/index.js'
  export default {
    data() {
      return {
        token:'',
        userData: [], //用户数据
        size: 0,
        limit: 1, //限制图片上传的数量
        flag: false,
        headerImg: ''
      }
    },
    created() {
      this.token = localStorage.getItem('User-Token')
      this.getUserInfo()
    },
    methods: {
      //获取用户信息--如果用户登录了
      getUserInfo(){
          let params = { token: this.token }
          userInfo(params).then(res=>{
              this.userData = res.data
              console.log(res.data)
              this.headerImg = res.data.head_image
          })
      },
      add_img() {
        let img1 = this.$refs.input_btn.files[0];
        var fd = new FormData();
        fd.append('file', img1);
        IndexUserHeaderImg(fd).then(res => {
          mui.toast('图片上传中，请稍后')
          this.headerImg = res.data
          console.log(res)
        })
      }
    }
  }

</script>

<style scoped lang="less">
  #header {
    height: 50px;

    .mui-title {
      height: 50px;
      line-height: 50px;
      font-weight: bold;
    }

    .mui-action-back {
      font-size: 30px;
      color: #070707;
    }
  }

  .info {
    ul {
      height: 100%;
      margin-top: 50px;

      .mui-table-view-cell {
        padding: 0;
        padding-left: 0.28rem;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: left;
        font-size: 0.32rem;
        color: #666;

        .mui-pull-right {
          margin-right: 0.65rem;
          color: #333;
        }
      }

      .headerLi {
        height: 100%;
        position: relative;

        a {
          margin: 0;
          padding: 0;
          display: block;
          height: 1.5rem;
          line-height: 1.5rem;

          img {
            width: 1rem;
            height: 1rem;
            margin-top: 0.2rem;
            border-radius: 50%;
            background-color: #ccc;
          }
        }

        // 图片上传的 input
        #upload_btn {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          opacity: 0;
        }
      }
    }
  }

  .upload_warp_text {
    text-align: left;
    margin-bottom: 10px;
    padding-top: 10px;
    text-indent: 14px;
    border-top: 1px solid #ccc;
    font-size: 14px;
  }

  .upload_warp_right {
    float: left;
    width: 57%;
    margin-left: 2%;
    height: 100%;
    border: 1px dashed #999;
    border-radius: 4px;
    line-height: 130px;
    color: #999;
  }

  .upload_warp_left img {
    height: 35px;
  }

  .upload_warp_left {
    height: 100%;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
  }

  .upload_warp {
    margin: 5px;
    height: 35px;
  }

  .upload {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 4px;
  }

</style>
