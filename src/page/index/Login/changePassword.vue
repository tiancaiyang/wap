<template>
    <div>
        <header id="header" class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">修改密码</h1>
		</header>
        <div class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row mobliDiv">
					<input v-model="oldPasseord" type="password"  class="mui-input-password" placeholder="请输入原密码">
                </div>
				<div class="mui-input-row">
					<input v-model='newPassword' type="password"  class="mui-input-password" placeholder="请输入新密码">
				</div>
			</form>
			<div class="mui-content-padded">
				<a  @click="changeSuccess"><button id='login' class="mui-btn mui-btn-danger mui-btn-outlined">确定</button></a>
			</div>
        </div>    
    </div>
</template>

<script>
    import { ChangePassword } from '../../../api/index.js'
    export default {
        data() {
            return {
                oldPasseord:'',
                newPassword:'',
            }
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
            changeSuccess(){
                var reg = /^\s*$/g;
                var paw =  /^.{6,20}$/;
                if(this.oldPasseord == "" || reg.test(this.oldPasseord)){
                    mui.toast('请输入原密码！')
                }else if(this.newPassword == "" || reg.test(this.newPassword)){
                    mui.toast('请输入新密码!')
                }else if(!paw.test(this.newPassword)){
                    mui.toast('密码长度6-20位')
                }else{
                    let params = {
                        pwd: this.oldPasseord,
                        newpwd: this.newPassword
                    }
                    ChangePassword(params).then(res=>{
                        if(res.code == 1){
                            mui.toast(res.msg)
                            // this.oldPasseord = ""
                            // this.newPassword = ""
                        }else{
                            // this.oldPasseord = ""
                            // this.newPassword = ""
                            mui.toast(res.msg)
                            this.$router.push({ path: '/indexUser/userSetting' })
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
    }
</style>