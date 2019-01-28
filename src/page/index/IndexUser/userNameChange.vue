<template>
    <div>
        <header id="header" class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">用户名</h1>
		</header>
        <div class="mui-content">
            <div class="mui-card">
                <form class="mui-input-group">
                    <div class="mui-input-row">
                        <label>用户名</label>
                        <input type="text" v-model="name" class="mui-input-clear" placeholder="请输入内容">
                    </div>
                </form>
            </div>
        </div>
        <div class="sureBefore" @click="submitName"> 确定修改 </div>
    </div>

</template>

<script>
    import { IndexUserName } from '../../../api/index.js'
    export default {
        data() {
            return {
                name: '',
            }
        },
        methods:{
            submitName(){
                var reg = /^\s*$/g;
                if(this.name == "" || reg.test(this.name)){
                    mui.toast('请输入内容',{ duration:2000 })
                }else{
                    let params = { name: this.name }
                    IndexUserName(params).then(res=>{
                        mui.toast(res.msg,{ duration:2000 })
                        if(res.code == 0){
                            this.$router.push({ path: '/indexUser/userinfo' })
                        }
                    })
                }
            },
        }
    }
</script>

<style scoped lang="less">
    #header{
        height: 50px;
        .mui-title{
            height: 50px;
            line-height: 50px;
            font-weight: bold;
        }
        .mui-action-back{
            font-size: 30px;
            color: #070707;
        }
    }
    .mui-card{
        margin: 0;
        padding: 0.3rem 0.28rem;
        form{
            .mui-input-row label{
                font-size: 0.3rem;
                width: 18%;
                padding-left: 0;
                padding-right: 0;
            }
        }
    }
    .sureBefore{
        height: 1rem;
        margin-top: 1rem;
        background: url(../../../assets/images/CouldEnter/user/userName-btn.png) no-repeat center;
        background-size: 80% 100%;
        color: #fff;
        font-size: 0.32rem;
        line-height: 1rem;
    }
    .sureAfter{
        height: 1rem;
        margin-top: 1rem;
        color: #fff;
        font-size: 0.32rem;
        line-height: 1rem;
        border-radius: 25px;
        margin-left: 10%;
        margin-right: 10%;
        background-color: rgba(168,168,168,0.71);
    }
</style>