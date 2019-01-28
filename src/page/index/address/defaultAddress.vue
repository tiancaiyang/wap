<template>
    <div class="info">
        <header id="header" class="mui-bar mui-bar-nav header">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">收货地址</h1>
        </header>
        <div class="mui-content">
            <ul id="OA_task_2" class="mui-table-view">
				<li class="mui-table-view-cell" v-for="(item, index) in addressList" :key="item.address_id">
					<div class="mui-slider-right mui-disabled">
						<a class="mui-btn mui-btn-grey" @click="defaultAddress(item.address_id)">设为默认</a>
						<a class="mui-btn mui-btn-red" @click="deleteAddress(item.address_id)">删除</a>
					</div>
					<div class="mui-slider-handle">
						<div class="mui-table-cell">
                            <div class="selectBox">
                                <div class="selectImg mui-pull-left" :class="{changeSelect:index == num}"><img src="../../../assets/images/b2c/Connectpersonc/click.png" alt=""></div>
                                <div class="addressInfo" @click="changeSelect(item,index)">
                                    <h4 class="nameInfo">{{ item.name }}   <b>{{ item.mobile }}</b> <span v-if="item.is_default == 1" class="mui-badge">默认</span></h4>
                                    <p>{{ item.area }}{{ item.address }}</p>
                                </div>
                            </div>
                            <div class="editImg" @click="toConnectpersonEdit(item.address_id, item.is_default,item.name,item.mobile,item.address,item.area)">
                                <img src="../../../assets/images/b2c/Connectpersonc/write.png" alt="">
                            </div>
						</div>
					</div>
				</li>
            </ul>  
            <!-- 新建的按钮 -->
            <router-link to="/connectpersonc" tag="a" class="footer">
                <img src="../../../assets/images/b2c/Connectpersonc/addIcon.png" alt="">
                <span> 新建收货地址</span>
            </router-link>  
        </div>
    </div>    
</template>

<script>
    import mui from '../../../../static/mui/js/mui.min.js'
    import { IndexAddress ,IndexAddressDefault, IndexAddressDelete } from '../../../api/index.js'
export default {
    data() {
        return {
            num:0,
            address:[],//localstorage中是否存在地址
            addressList:[],//从后台获取数据列表
        };
    },
    created(){
        this.address = JSON.parse(localStorage.getItem('Address'))
        this.getAddressData(); //获取数据列表
    },
    methods:{
        // 红色按钮切换地址
        changeSelect(item,index){
            this.num = index;
            localStorage.setItem('Address',JSON.stringify(item))
            // 切换选择后返回上一页
            this.$router.back(-1)
        },
        getAddressData(){
            IndexAddress().then(res=>{
                var that = this
                that.addressList = res.data
                that.addressList.forEach((item,index)=>{
                    // 先判断服务器中有没有存入地址，如果有所存入的地址，判断地址id与此次循环的item的地址id是否一致,如果是让item地址的index 等于选中的num让对号显示处理  如果不存在地址，就选中默认地址
                    if(that.address){
                        if(item.address_id == that.address.address_id){
                            that.num = index
                        }
                    }else{
                        if(item.is_default == 1){
                            that.num = index
                        }
                    }
                })
            })
        },
        // 默认地址
        defaultAddress(id){
            let params = { address_id:id }
            IndexAddressDefault(params).then(res=>{
                mui.toast('设置成功',{ duration:500 })
                // 设置成功后要进行页面刷新
                 this.getAddressData()
            })
        },
        // 删除数据
        deleteAddress(id){
            var that = this
            let params = { address_id:id }
            IndexAddressDelete(params).then(res=>{
                // 并且把localstorage里面的数据同时删除
                if(res.code == 0){
                    if(this.address){
                        if( this.address.address_id == id){
                            localStorage.removeItem("Address");
                        }
                    }
                    mui.toast('删除成功',{ duration:500 })
                    this.getAddressData()
                }else{
                    mui.toast(res.msg,{ duration:500 })
                }
                
            })
        },
        // 修改地址按钮链接
        toConnectpersonEdit(id,is_default,name,mobile,address,area){
            this.$router.push({name:'connectpersoncEdit',params:{  id:id, default:is_default, name:name, mobile:mobile, address:address, area:area } }) 
        }
    }
};
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
        .mui-table-view:after{
            height: 0;
        }
        #OA_task_2{
            margin-top: 0;
            .mui-table-view-cell{
                .mui-slider-handle{
                    .mui-table-cell{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        text-align: left;
                        .selectImg{
                            display: none;
                            margin-right: 0.2rem;
                            img{
                                width: 0.5rem;
                            }
                        }
                        .changeSelect{
                            display: block;
                        }
                        .addressInfo{
                            .nameInfo{
                                font-weight: normal;
                                font-size: 0.34rem;
                                .mui-badge{
                                    background-color: #f00;
                                    color: #fff;
                                    vertical-align: bottom;
                                }
                            }
                            p{
                                color: #333;
                                font-size: 0.28rem;
                            }       
                        }
                        .selectBox{
                            display: flex;
                            align-items: center;
                        }
                        .editImg{
                            img{
                                width: 0.5rem;
                            }
                        }
                    }
                }
            }
        }

        // 底部按钮
        .footer{
            position: absolute;
            bottom: 0.5rem;
            left: 1rem;
            right: 1rem;
            height: 1rem;
            line-height: 1rem;
            background: url(../../../assets/images/b2c/Connectpersonc/background.png) no-repeat;
            background-size: 100% 100%;
            img{
                width: 0.3rem;
            }
            span{
                color: #fff;
                font-size: 0.3rem;
            }
        } 
    }


</style>