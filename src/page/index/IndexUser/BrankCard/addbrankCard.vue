<template>
    <div>
        <header id="header" class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">添加银行卡</h1>
		</header>
        <div class="mui-content">
            <p>请绑定本人的银行卡</p>
            <form class="mui-input-group">
                <div class="box">
                    <div class="mui-input-row">
                        <label>持卡人</label>
                        <input type="text" class="mui-input-clear" placeholder="请输入内容">
                    </div>
                </div>
                 <div class="box">
                    <div class="mui-input-row">
                        <label>卡号</label>
                        <input type="text" maxlength="19" class="mui-input-clear" placeholder="请输入内容" name="bank_account" :value="display_bank_account" @input="handleBankCardInput">
                    </div>
                 </div>
            </form>
             <button type="button" class="mui-btn mui-btn-danger next">下一步</button>
        </div>
    </div>
</template>

<script>
    import mui from '../../../../../static/mui/js/mui.min.js'
    export default {
        data() {
            return {
               bank_account:'',
               display_bank_account:''
            }
        },
        mounted(){
            mui('.mui-input-row input').input();
        },
        methods:{
             handleBankCardInput(e) {
                this.bank_account = e.target.value;
                this.display_bank_account = this.bank_account.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ') 
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
    .mui-content{
        padding-top: 55px;
        p{
            padding: 0.2rem 0.28rem 0;
            text-align: left;
            color: #999;
            font-size: 0.28rem;
        }
        .box{
            padding: 0.3rem 0;
            border-bottom: 1px solid #ececec;
        }
        .mui-input-group .mui-input-row:after{
            height: 0;
        }
        .mui-input-group{
            .mui-input-row{
                font-size: 0.32rem;
                label{
                    padding-left: 0;
                    padding-right: 0;
                    color: #666;
                    width: 25%;
                }
                input{  
                    width: 75%;
                    color: #333;
                }
            }
            
        }
        .next{
            margin-top: 1.8rem;
            margin-bottom: 1rem;
            width: 80%;
            height: 0.8rem;
            font-size: 0.35rem;
            border-radius: 25px;
        }
        
    }
</style>