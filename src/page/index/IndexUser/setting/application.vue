<template>
  <div class="application">
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">商家申请</h1>
    </header>
    <!-- 商家信息列表 -->
    <div class="mui-input-group" id="input_example">
      <div class="mui-input-row">
        <label>联系人</label>
        <input type="text" class="mui-input-clear" placeholder="请输入联系人真实姓名" v-model="name">
      </div>
      <div class="mui-input-row">
        <label>联系人电话</label>
        <input type="text" class="mui-input-clear" placeholder="请输入联系人电话" v-model="mobile">
      </div>
      <div class="mui-input-row">
        <label>店铺名称</label>
        <input type="text" class="mui-input-clear" placeholder="请输入店铺名称" v-model="store_name">
      </div>
      <div class="mui-input-row">
        <label>店铺地址</label>
        <p id="addressSelect" >{{ addressInfo }}</p>
        <!-- <div id='cityResult3' class="ui-alert"></div>
        <span class="mui-icon mui-icon-arrowright"></span> -->
      </div>
      <div class="mui-input-row">
        <label>详细地址</label>
        <input type="text" class="mui-input-clear" placeholder="例: 平安大道101号" v-model="address">
      </div>
    </div>
    <div class="upload_img">
      <div class="upload_img_l">店铺图片</div>
      <div class="upload_img_r">
        <div class="shop_img">
          <h4>上传门头照片</h4>
          <p>必须能看见完整的门匾、门框</p>
          <img src="../../../../assets/images/CouldEnter/user/upload.png" class="add_img">
          <input class="upload_input" type="file" @change='add_mall_img' ref="input_btn">
          <img src="" id="img_show1" v-show="flag"> 
        </div>
        <div class="business_licence">
          <h4>上传营业执照</h4>
          <p>上传清晰完整的营业执照或其它有效证件</p>
          <img src="../../../../assets/images/CouldEnter/user/upload.png" class="add_img">
          <input class="upload_input" type="file" @change='add_photo' ref="input_btn2">
          <img src="" id="img_show2" v-show="flag1">
        </div>
      </div>
    </div>

    <!-- 用户服务协议 -->
    <div class="agreement">
      <div class="mui-input-row mui-checkbox mui-left ">
        <label></label>
        <input name="checkbox1" value="Item 1" type="checkbox" id="checkbox">
      </div>
      <div>
        <p>我已阅读并同意<router-link to="/indexUser/userAgreement" tag="a">《掌柜当家用户服务协议》</router-link>
        </p>
      </div>
    </div>
    <!-- 提交按钮 -->
    <div class="sub_btn">
      <a href="javascript:void(0);">
        <img src="../../../../assets/images/CouldEnter/user/sub_btn.png" @click="submit">
      </a>
    </div>
  </div>
</template>

<script>
  import mui from '../../../../../static/mui/js/mui.min.js'
  // import '../../../../../static/mui/js/mui.picker.js'
  // import cityData3 from '../../../../../static/mui/js/city.data-3.js'
  import {
    userApplication,
    userApplicationImg1,
    userAgainApplication
  } from '../../../../api/index.js'
  export default {
    data() {
      return {
        // formData: new FormData(),
        flag: false,
        flag1: false,
        name: '',
        mobile: '',
        store_name: '',
        address: '',
        store_pic: '',
        license_pic: '',
        getlonlat:'',//定位信息
        getlon:'',
        getlat:'',
        addressInfo:'',//定位详细地址
        data:'',//判断是从商家申请状态页面过来的
      }
    },
    created(){
      this.getlonlat = localStorage.getItem('getcity');
      var strs= new Array();
      strs=this.getlonlat.split(",");
      this.getlon = strs[0],
      this.getlat = strs[1],
      this.data = this.$route.query.data
      console.log(this.data)
    },
    mounted(){
      // 获取经纬度
        mui.init();
        var that = this
        AMap.plugin('AMap.Geocoder', function () {
          var geocoder = new AMap.Geocoder({
              radius: 1000,
              extensions: "all"
            });
            geocoder.getAddress([that.getlon,that.getlat], function (status, result) {
              if (status === 'complete' && result.info === 'OK') {
                if (result && result.regeocode) {
                   that.addressInfo = result.regeocode.formattedAddress
                }
              }
            });
        })

    },
    methods: {
      // 选择地址
        // selectAddress() {
        //   var picker = new mui.PopPicker({
        //     layer: 3
        //   });
        //   picker.setData(cityData3)
        //   var _getParam = function (obj, param) {
        //     return obj[param] || '';
        //   };
        //   picker.show(function (SelectedItem) {
        //     document.getElementById('addressSelect').value = _getParam(SelectedItem[0], 'text') + ' ' + _getParam(
        //       SelectedItem[1], 'text') + ' ' + _getParam(SelectedItem[2], 'text');
        //   })
        // },
      //门头图片上传
      add_mall_img() {
        this.flag = true;
        let img1 = this.$refs.input_btn.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(img1);
        reader.onloadend = function (e) {
          let img = document.getElementById("img_show1")
          img.src = e.target.result
        }
        var fd = new FormData();
        fd.append('image', img1);
        userApplicationImg1(fd).then(res => {
          this.store_pic = res.data
        })
      },
      // 营业执照上传
      add_photo() {
        this.flag1 = true;
        let img2 = this.$refs.input_btn2.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(img2);
        reader.onloadend = function (e) {
          let img = document.getElementById("img_show2")
          img.src = e.target.result
        }
        var fd = new FormData();
        fd.append('image', img2);
        userApplicationImg1(fd).then(res => {
          this.license_pic = res.data
        })
      },
      // 点击加号图 调用input file
      fileClick() {
        this.$refs.upload_input.click();
      },
      // 提交申请
      submit() {
        var area = document.getElementById('addressSelect').value;
        let params = {
          name: this.name,
          mobile: this.mobile,
          store_name: this.store_name,
          address: this.address,
          area_path: area,
          store_pic: this.store_pic,
          license_pic: this.license_pic,
        }
        // 表单验证
        var reg = /^\s*$/g; //空的正则
        var check = true;
        mui("#input_example input").each(function () {
          //若当前input为空，则alert提醒
          if (!this.value || this.value.trim() == "") {
            var label = this.previousElementSibling;
            mui.alert(label.innerText + "不允许为空");
            check = false;
            return false;
          }
        });
        //校验通过，继续执行业务逻辑
        var checkbox = document.getElementById("checkbox");
        if (check) {
          // if (this.license_pic == "" || reg.test(this.license_pic)) {
          //   mui.alert("请上传营业执照图片")
          // } else if (this.store_pic == "" || reg.test(this.store_pic)) {
          //   mui.alert("请上传店铺门头图片")
          // } else 
          if (checkbox.checked == false) {
            mui.alert("请阅读并同意协议")
          }else if( this.data == 4){
            userAgainApplication(params).then(res=>{
              if(res.code != 0) {
                mui.alert(res.msg)
              } else {
                this.$router.push({name: 'applicationState'})
              }
            })
          }else{
            userApplication(params).then(res => {
              if(res.code != 0) {
                mui.alert(res.msg)
              } else {
                this.$router.push({name: 'applicationState'})
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

  ul,
  li {
    list-style: none;
  }

  // 商家申请信息列表
  .mui-input-group {
    margin-top: 50px;

    .mui-input-row {
      height: 1.32rem;
      padding: 0.3rem 0.28rem;
      label {
        padding-left: 0;
        width: 30%;
        text-align: left;
        font-size: 0.32rem;
        color: #666;
      }
      input[type='text'] {
        width: 68%;
        float: left;
        font-size: 0.32rem;
        padding: 0;
        color: #222;
        font-weight: normal;
      }
      .mui-icon-arrowright {
        position: absolute;
        top: 50%;
        right: 0.28rem;
        transform: translateY(-50%);
        color: #999;
      }
      #addressSelect{
        font-size: 0.32rem;
        color: #666;
        text-align: left;
      }
      
    }

    .mui-input-row:after {
      right: 15px;
    }
  }

  .mui-input-group:after {
    left: 15px;
    right: 15px;
  }

  // 上传商铺图片
  .upload_img {
    height: 6.61rem;
    overflow: hidden;
    padding: 0.3rem 0.28rem;
    background-color: #fff;

    .upload_img_l {
      float: left;
      width: 30%;
      height: 100%;
      text-align: left;
      font-size: 0.32rem;
      color: #666;
    }

    .upload_img_r {
      width: 70%;
      float: left;
      height: 100%;
      text-align: left;

      .shop_img,
      .business_licence {
        height: 50%;
        width: 100%;
        position: relative;

        h4 {
          margin-top: 0;
          font-size: 0.32rem;
          color: #222;
          font-weight: normal;
        }

        p {
          font-size: 0.24rem;
          color: #999;
        }

        .add_img {
          width: 1.4rem;
          height: 1.4rem;
          border-radius: 4px;
        }

        .upload_input {
          width: 1.4rem;
          height: 1.4rem;
          background-color: red;
          position: absolute;
          // font-size: 100px;
          left: 0;
          top: 1.2rem;
          opacity: 0;
          filter: alpha(opacity=0);
          cursor: pointer;
        }

        #img_show1,
        #img_show2 {
          width: 1.4rem;
          height: 1.4rem;
          border: 0;
          // background-color: red;
        }
      }
    }
  }

  // 用户协议
  .agreement {
    height: 0.5rem;
    padding: 0 0.28rem;
    font-size: 0.3rem;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;

    .mui-input-row.mui-checkbox {
      position: relative;
      width: 30px;
      height: 30px;

      label {
        padding: 0;
        position: absolute;
        top: 0;
        left: 0px;
        width: 28px;
        height: 26px;
        z-index: 2;
      }

      input {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 28px;
        height: 26px;
      }

      input[type='checkbox']:checked:before {
        color: #ff2400;
        font-size: 26px;
      }

      input[type='checkbox']:before {
        font-size: 26px;
      }
    }

    p {
      margin-bottom: 0;
    }

    a {
      color: #eb2a23;
    }
  }

  // 单选框选中样式的更改
  .mui-checkbox input[type='checkbox']:checked:before,
  .mui-radio input[type='radio']:checked:before {
    color: #eb2a23;
  }

  .sub_btn {
    margin: 0.96rem 0;

    a {
      display: inline-block;

      img {
        width: 4.6rem;
        // height: .9rem;
        border-radius: 0.5rem;
        vertical-align: middle;
      }
    }
  }

</style>
