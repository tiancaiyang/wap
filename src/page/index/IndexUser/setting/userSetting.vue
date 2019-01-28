<template>
    <div>
        <header id="header" class="mui-bar mui-bar-nav">
			<router-link to="/" tag="a" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">设置</h1>
		</header>
        <div class="info">
            <ul class="mui-table-view">
                <router-link to="/changePassword"  tag="li" class="mui-table-view-cell">
                    修改密码
                    <span class="mui-navigate-right"></span>       
                </router-link>
                 <li class="mui-table-view-cell">
                    当前版本
                    <span class="mui-pull-right">版本1.1.0</span>
                    <span class="mui-navigate-right"></span>       
                </li>
            </ul>  
        </div>

        <div class="closeLogin">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell" @click="returnLogin">
                    退出登录      
                </li>
            </ul>    
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        methods:{
            returnLogin(){
                //清除localstorage里面的token和userdata和indentity数据
                localStorage.removeItem("User-Token");
                localStorage.removeItem("indentity");
                localStorage.removeItem("Address");
                this.$router.push({ path: '/indexUser' })
            }
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
        .mui-pull-left {
            height: 50px;
            line-height: 32px;
            color: #333;
        }
    }
    .info{
        ul{
            height: 100%;
            margin-top: 50px;
            .mui-table-view-cell{
                padding: 0;
                padding-left: 0.28rem;
                height: 1.2rem;
                line-height: 1.2rem;
                text-align: left;
                font-size: 0.32rem;
                color: #666;
                .mui-pull-right{
                    margin-right: 0.65rem;
                    color: #333;
                }
            }
        }
    } 
    .closeLogin{
        margin-top: 0.32rem;
        .mui-table-view{
            .mui-table-view-cell{
                padding: 0;
                height: 1.2rem;
                line-height: 1.2rem;
                color: #333;
                font-size: 0.32rem;
            }
        }
        .mui-table-view:before{
            height: 0;
        }
        .mui-table-view:after{
            height: 0;
        }
    }       
</style>