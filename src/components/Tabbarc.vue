<template>
    <div>
        <nav class="mui-bar mui-bar-tab" style="border:none;">
            <router-link class="mui-tab-item-llbc" tag="a" to="/homec">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-llbc" tag="a" to="/assementc">
                <span class="mui-icon-extra mui-icon-extra-class"></span>
                <span class="mui-tab-label">分类</span>
            </router-link>
            <router-link class="mui-tab-item-llbc" tag="a" to="/carc">
                <span class="mui-icon  mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge mui-badge-danger" v-if="flagPoint"></span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-llbc" tag="a" to="/orderc">
                <span class="mui-icon-extra mui-icon-extra-order"></span>
                <span class="mui-tab-label">订单</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    import { b2cCartRedPoint } from '../api/index.js'
    export default {
        data() {
            return {
                flagPoint:false,
            }
        },
        created(){
            var token = localStorage.getItem('User-Token')
            if(token){
                this.getCartPoint()
            }else{
                
            }
            
        },
        methods:{
            getCartPoint(){
               b2cCartRedPoint().then(res=>{
                    if(res.data.type == 0){//无数据
                       this.flagPoint = false
                    }else{
                        this.flagPoint = true
                    }
               })
            }
        }
    }
</script>

<style scoped lang="less">
    // @import '../static/mui/css/icons-extra.css' ;
    .mui-bar-tab .mui-tab-item-llbc.mui-active {
        color: #ff5836;
        font-weight: bold;
    }
    .mui-bar{
        -webkit-box-shadow: 0 0 2px rgba(0,0,0,.3);
    }
    .mui-bar-tab .mui-tab-item-llbc {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #666;
        font-weight: bold;
    }

    .mui-bar-tab .mui-tab-item-llbc .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item-llbc .mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .mui-icon-extra{
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
        position: relative;
    }
    .mui-icon-extra-order:before{
        font-size: 20px;
    }
    .mui-icon-extra-class:before{
        font-size: 20px;
    }
    .mui-icon .mui-badge{
        top:2px;
        left:113%;
        padding: 4px;
    }

</style>