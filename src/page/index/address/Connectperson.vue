<template>
    <div class="info">
       <!-- 头部 -->
        <header id="header" class="mui-bar mui-bar-nav header">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">新建收货人</h1>
        </header>
        <!-- 内容 -->
        <div class="mui-content">
           <ul class="mui-table-view">
                <li class="mui-table-view-cell addressName">
                    <a>
                        收货人: <input type="text" v-model="name">
                    </a>
                </li>
                <li class="mui-table-view-cell addressNum">
                    <a>
                        联系方式:  <input type="tel" v-model="mobile">
                    </a>
                </li>
                <li class="mui-table-view-cell selectAddressDiv">
                    <a id='showCityPicker3' class="mui-navigate-right" @click="selectAddress">
                         所在地区: <!-- <span id="addressSelect"></span> -->
                         <input type="text" name="" id="addressSelect" disabled>
				        <div id='cityResult3' class="ui-alert"></div>
                    </a>
                </li>
                <li class="mui-table-view-cell infoAddress">
                    <a>
                        详细地址:  <input type="text" v-model="address">
                    </a>
                </li>
                <li class="mui-table-view-cell defaultAddress">
                    <a class="">
                        设为默认地址:   
                    </a>
                    <div class="mui-switch mui-active" @click="setDefault">
                        <div class="mui-switch-handle"></div>
                    </div>
                </li>
            </ul>  
            <!-- 选择联系人图片-->
            <div class="selectImg">
                <img src="../../../assets/images/b2c/Connectpersonc/person.png" alt="">
            </div>
        </div>
        <!-- 底部保存并使用 -->
        <div class="footer" @click="addAddressData">
            <span>保存并使用</span>
        </div>  
    </div>
</template>

<script>
    import mui from '../../../../static/mui/js/mui.min.js'
    // import  PopPicker from '../../../../static/mui/js/mui.picker.js'
    import poppicker from '../../../../static/mui/js/mui.poppicker.js'
    import  cityData3 from '../../../../static/mui/js/city.data-3.js'
    import { IndexAddressAdd } from '../../../api/index.js'
    export default {
        data() {
            return {
                name:'',
                mobile:'',
                address:'',
                default: 1,
            }
        },
        mounted(){
            mui.init();
            // mui('.mui-switch')['switch']();
            mui('.mui-switch').each(function() {
                mui(this).switch();
            });
        },
        methods:{
            selectAddress(){
                var picker = new mui.PopPicker({
                    layer: 3
                });
                picker.setData(cityData3)
                var _getParam = function(obj, param) {
						return obj[param] || '';
				};
                picker.show(function(SelectedItem) {
                    document.getElementById('addressSelect').value = _getParam(SelectedItem[0], 'text') + _getParam(SelectedItem[1], 'text')  + _getParam(SelectedItem[2], 'text');
                })
            },
            setDefault(){
                var that = this;
                mui('.mui-switch').each(function() {
                    var isActive = this.classList.contains('mui-active')
                    if(isActive){
                        that.default = 1;
                        mui.toast('设置为默认地址',{ duration:1000 })
                    }else{
                        that.default = 0;
                         mui.toast('取消默认地址',{ duration:1000 })
                    }
                })
            },
            // 添加收货地址
            addAddressData(){
                var area = document.getElementById('addressSelect').value;
                let param = { 
                                name: this.name,
                                mobile: this.mobile,
                                address: this.address,
                                area: area,
                                default: this.default,
                            }     
                IndexAddressAdd(param).then(res=>{
                    //返回上一页
                    mui.toast('保存成功',{ duration:500 });
                    this.$router.push({ path: 'defaultAddress' }) 
                })
            }
        }
           
        
    }
</script>

<style scoped lang="less">
    //  头部
    #header {
        @headerBg: #fff;
        @headerHeight: 50px;
        background: @headerBg;
        height: @headerHeight;
        .mui-title {
            height: 50px;
            line-height: 50px;
            font-weight: bold;
            color: #151515;
        }
        .mui-pull-left {
            height: @headerHeight;
            line-height: 32px;
            color: #333;
        }
    }
    .info{
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: #fff;
    }
    .mui-content{
        padding-top: 50px;
        position: relative;
        .mui-table-view{
            margin-top: 0;
            .mui-table-view-cell{
                // 新建收货地址
                a{
                    height: 1.2rem;
                    padding: 0 0.28rem;
                    line-height: 1.2rem;
                    text-align: left;
                    font-size: 0.32rem;
                    color: #666;
                    input{
                        width: 70%;
                        color: #151515;
                        font-size: 0.32rem;
                        border: 0;
                    }
                }
            }
            // 姓名
            .addressName{
                width: 70%;
            }
            // 电话
            .addressNum{
                a{
                    input{
                        width: 50%;
                    }
                }
            }
            .selectAddressDiv{
                 // 所在地区
                #addressSelect{
                    margin-left: 0.3rem;
                    color: #151515;
                    font-size: 0.32rem;
                }
            }
            // 详细地址
            .infoAddress{
                a{
                    height: 1.5rem;
                    line-height: 1.5rem;
                    input{
                        width: 80%;
                        font-size: 0.28rem;
                        text-align: left;
                        color: #151515;
                        // border: 0;
                    }
                }
            }
            // 默认选中滑块样式
            .defaultAddress{
                .mui-switch{
                    background-color: #fff;
                }
                .mui-switch.mui-active{
                    background-color: #f00;
                    border: 2px solid #f00;
                }
            }
        }
        .mui-table-view:after{
            height: 0;
        }
        // 选择联系人
        .selectImg{
            position: absolute;
            right: 0;
            top: 70px;
            width: 30%;
            background-color: #fff;
            img{
                height: 1.5rem;
            }
        }
    } 
     // 底部按钮
        .footer{
            // position: absolute;
            // bottom: 0.5rem;
            // left: 1rem;
            // right: 1rem;
            // text-align: center;
            width: 80%;
            margin: 1rem  auto;
            height: 1rem;
            line-height: 1rem;
            background: url(../../../assets/images/b2c/Connectpersonc/background.png) no-repeat;
            background-size: 100% 100%;
            span{
                color: #fff;
                font-size: 0.3rem;
            }
        }   

</style>