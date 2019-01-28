<template>
    <div>
        <header id="header" class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">注册</h1>
		</header>
        <div class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row mobliDiv">
					<label>手机号</label>
					<input id='account' type="tel" v-model="mobile"  class="mui-input" placeholder="请输入手机号">
                    <timer-btn ref="timerbtn" class="identify"   v-on:run="sendCode" ></timer-btn>
                </div>
                <div class="mui-input-row">
					<label>验证码</label>
					<input  type="text"  v-model="code" class="" placeholder="请输入账号">
                </div>
				<div class="mui-input-row">
					<label>设置密码</label>
					<input v-model='password' type="password"  class="mui-input-password" placeholder="请输入密码">
				</div>
			</form>
			<div class="mui-content-padded">
				<a  @click="RegisterSuccess"><button id='login' class="mui-btn mui-btn-danger mui-btn-outlined">注册</button></a>
			</div>
        </div>    
    </div>
</template>

<script>
    import timerBtn from '../../../components/identifyingCode/identifyCode.vue'
    import { RegisterCode,Register } from '../../../api/index.js'
    export default {
        data() {
            return {
                mobile:'',
                code:'',
                password:'',
            }
        },
        components:{
            timerBtn
        },
        mounted(){
            mui('.mui-input-row input').input();
            mui(".mui-icon-eye").each(function(){
                this.style.top="50%";   
                this.style.transform="translateY(-50%)";   
                this.style.height="20px";   
            }); 
        },
        methods:{
            // 验证码发送
            sendCode:function(){
                this.$refs.timerbtn.setDisabled(true); //设置按钮不可用
                var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
                if(this.mobile==''){
                    mui.toast("请输入手机号码");
                    this.$refs.timerbtn.setDisabled(false);
                }else if(!reg.test(this.mobile)){
                    mui.toast("手机格式不正确");
                    this.$refs.timerbtn.setDisabled(false);
                }else{
                    let params = { mobile:this.mobile }
                    RegisterCode(params).then(res=>{
                        if(res.code == 0){
                            this.$refs.timerbtn.start(); //启动倒计时
                        }else{
                            this.$refs.timerbtn.stop(); //停止倒计时
                        }
                    })
                }
            },
            RegisterSuccess(){
                var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
                var paw =  /^.{6,20}$/;
                if(this.mobile==''){
                    mui.toast("请输入手机号码");
                    this.$refs.timerbtn.setDisabled(false);
                }else if(!reg.test(this.mobile)){
                    mui.toast("手机格式不正确");
                }else if(!paw.test(this.password)){
                    mui.toast("密码长度6-20位");
                }else{
                    let params = { 
                        mobile: this.mobile, 
                        code: this.code,
                        password: this.password
                    }
                    Register(params).then(res=>{
                        mui.toast(res.msg);
                        // this.mobile = '';
                        // this.code = '';
                        // this.password = ''
                        // this.$refs.timerbtn.stop(); //停止倒计时
                        if(res.code == 0){
                            this.$router.push({ path: '/login' })
                        }
                    })
                }    
            },
        }
    }
</script>

<style scoped lang='less'>
    // 头部导航
    #header{
        @headerBg: #ff0000;
        @headerHeight: 50px;
        background: @headerBg;
        height: @headerHeight; 
        .mui-title{
            color: #fff;
            height: @headerHeight;
            line-height: @headerHeight;
        }
        .mui-pull-left{
            height: @headerHeight;
            line-height: 32px;
            color: #fff;
        }
    }
    .mui-content{
        margin-top: 0.3rem!important;
        .mui-input-row{
            height: 1rem;         
            box-sizing: border-box;
            label{
            line-height: 1rem;
            padding: 0;
            width: 20%;
            }
            input{
                width: 80%;
                height: 1rem;
                // line-height: 1.1rem;
                padding: 0;
            }
            #account{
                padding-right: 36%;
            }
        }
        .mui-input-row:after{
            left: 0;
        }
        .mui-content-padded{
            margin-top: 0.8rem;
            #login{
                width: 100%;
                border: 2px solid #f00;
                padding: 0.25rem 0;
                color: #ff0000;
                font-weight: bold;
                font-size: 0.3rem;
            }
            .link-area{
                margin-top: 0.28rem;
            }
            
        }
        // 验证吗
        .mobliDiv{
            position: relative;
            .identify{
                position: absolute;
                right: 0.28rem;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
</style>