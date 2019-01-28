<template>
    <div>
        <!-- <header id="header" class="mui-bar mui-bar-transparent">
			<h1 class="mui-title">个人中心</h1>
		</header> -->
        <div class="userBg mui-clearfix">
            <div class="userInfo" @click="isTokenurl">
                <div class="userImg">
                    <img v-if="tokenFlag && userdata.head_image" class="mui-pull-left" :src="userdata.head_image" alt="">
                    <img v-else class="mui-pull-left" src="../../../assets/images/CouldEnter/user/header.png" alt="">
                </div>
                <div class="username">
                    <h2 v-if="tokenFlag && userdata.name">{{ userdata.name }}</h2>
                    <h2 v-else-if="tokenFlag && !userdata.name">{{ userdata.mobile }}</h2>
                    <h2 v-else>{{ name }}</h2>
                    <span class="mui-icon mui-icon-forward"></span>
                </div>
            </div>
             <div class="mui-content">
                <div class="mui-card">
                    <div class="moneybox">
                        <ul>
                            <router-link to="/indexUser/userCollection" tag="li">
                                <img src="../../../assets/images/CouldEnter/user/user-coll.png" alt="">
                                <p>收藏</p>
                            </router-link>
                            <!-- <router-link to="/indexUser/moneyball" tag="li">
                                <img src="../../../assets/images/CouldEnter/user/user-money.png" alt="">
                                <p>钱包</p>
                            </router-link> -->
                            <li>
                                <img src="../../../assets/images/CouldEnter/user/user-cardball.png" alt="">
                                <p>卡包</p>
                            </li>
                            <router-link to="/indexUser/browseRecord" tag="li">
                                <img src="../../../assets/images/CouldEnter/user/liuLan.png" alt="">
                                <p>足迹</p>
                            </router-link>
                        </ul>
                    </div>
                    <div class="commonFun">
                        <h3>常用功能</h3>
                        <ul>
                            <router-link to="/indexUser/userEvaluateList" tag="li">
                                <img src="../../../assets/images/CouldEnter/user/user-evaluate.png" alt="">
                                <p>评价</p>
                            </router-link>
                            <!-- <li>
                                <img src="../../../assets/images/CouldEnter/user/user-brandCard.png" alt="">
                                <p>银行卡</p>
                            </li> -->
                            <li>
                                <a :href="tel">
                                    <img src="../../../assets/images/CouldEnter/user/user-customer.png" alt="">
                                    <p>客服</p>
                                </a>
                            </li>
                            <router-link to="/indexUser/indexAbout" tag="li">
                                <img src="../../../assets/images/CouldEnter/user/user-about.png" alt="">
                                <p>关于</p>
                            </router-link>
                            <router-link to="/indexUser/opinionBack" tag="li">
                                <img src="../../../assets/images/CouldEnter/user/user-opinion.png" alt="">
                                <p>意见</p>
                            </router-link>
                            <router-link to="/indexUser/userSetting" tag="li">
                                <img src="../../../assets/images/CouldEnter/user/user-setting.png" alt="">
                                <p>设置</p>
                            </router-link>
                            <li @click="goApplication">
                                <img src="../../../assets/images/CouldEnter/user/user-business.png" alt="">
                                <p>商家申请</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 引入tabbar栏 -->
        <small-tabbar></small-tabbar>
    </div>
</template>

<script>
    import smallTabbar from '../../../components/SmallTabbar.vue'
    import { userInfo, ContactCustomerService, userApplicationStatus } from '../../../api/index.js'
    export default {
        data() {
            return {
                name:'未登录',
                token:'',
                tokenFlag: false,
                userdata:[], //用户数据
                tel:'',
                indentity:'',//用户类型
            }
        },
        created(){
            this.token = localStorage.getItem('User-Token')
            this.indentity = localStorage.getItem('indentity')
            if(this.token){
                this.tokenFlag = true
            }else{
                this.tokenFlag = false
            };
            this.getUserInfo()
            this.getServiceTel()
        },
        components:{
            smallTabbar
        },
        methods:{
            // 获取用户信息--如果用户登录了
            getUserInfo(){
                let params = { token: this.token }
                userInfo(params).then(res=>{
                    this.userdata = res.data
                    console.log(res)
                })
            },
            isTokenurl(){
                if(this.tokenFlag){
                    this.$router.push({ path: '/indexUser/userinfo' })
                }else{
                    this.$router.push({ path: '/login' })
                }
            },
            // 获取客服电话
            getServiceTel(){
                ContactCustomerService().then(res=>{
                    this.tel= 'tel:'+ res.data
                })
            },
            // 跳转到商家申请页面,或者申请状态页面
            goApplication() {
                if(this.tokenFlag){
                    if(this.indentity == 2){
                        mui.alert('您已经是商户了，不能再次申请了')
                    }else {
                        userApplicationStatus().then(res=>{
                        // 0未申请 1申请已提交，2审核中，3审核通过，4审核不通过
                            if( res.data.apply_status == 0) {
                                this.$router.push({path:'/indexUser/application'})
                            }else {
                                this.$router.push({path:'/indexUser/applicationState'})
                            }
                        })
                    }  
                }else{
                    this.$router.push({ path: '/login' })
                }
            }
        }
    }
</script>

<style scoped lang="less">
    ul,li{
        list-style: none;
        margin: 0;
        padding: 0;
    }
    #header{
        .mui-title{
            color: #fff;
            font-weight: bold;
        }
    }
    .userBg{
        position: relative;
        width: 100%;
        height: 3.5rem;
        background: url(../../../assets/images/CouldEnter/user/userTopBg.png) no-repeat;
        .userInfo{
            margin-top: 1rem;
            padding: 0.28rem;
            .userImg{
                width: 1rem;
                height: 1rem;
                float: left;
                margin-right: 0.2rem;
            }
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #ccc;
            }
            .username{
                color: #fff;
                height: 1.2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                h2{
                    font-size: 0.48rem;
                }
            }
        }
        .mui-content>.mui-card:first-child{
            margin-top: 0;
        }
        .mui-content{
            .mui-card{
                padding: 0 0.28rem;
                position: absolute;
                left: 0;
                right: 0;
                box-shadow: 0 -1px 4px rgba(152,152,152,0.72);
                box-shadow: 0 1px 4px rgba(152,152,152,0.72);
                margin-bottom: 1rem;
            }
            .moneybox{
                margin-top: 0.5rem;
                border-bottom: 1px solid #ececec;
                ul{
                    display: flex;
                    justify-content: space-around;
                    li{
                        // width: 30%;
                        img{
                            height: 0.6rem;
                            margin-bottom: 0.25rem;
                        }
                        p{
                            color: #666;
                            font-size: 0.28rem;
                        }
                    }
                }
            }
            .commonFun{
                margin: 0.8rem 0 0;
                h3{
                    color: #333;
                    font-size: 0.32rem;
                    text-align: left;
                    padding-bottom: 0.5rem;
                }
                ul{
                    display: flex;
                    // justify-content: space-around;
                    flex-wrap: wrap;

                    li{
                        width: 25%;
                        margin-bottom: 0.4rem;
                        img{
                            height: 0.5rem;
                            margin-bottom: 0.25rem;
                        }
                        p{
                            color: #666;
                            font-size: 0.28rem;
                        }
                    }
                }
            }

        }
    }

</style>