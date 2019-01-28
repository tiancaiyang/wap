<template>
    <div>
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item-llbB" tag="a" to="/homeb">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-llbB" tag="a" to="/assementb">
                 <span class="mui-icon-extra mui-icon-extra-class"></span>
                <span class="mui-tab-label">分类</span>
            </router-link>
            <router-link class="mui-tab-item-llbB" tag="a" to="/carb">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge mui-badge-danger" v-if="flagPoint"></span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-llbB" tag="a" to="/userb">
                <span class="mui-icon-extra mui-icon-extra-order"></span>
                <span class="mui-tab-label">订单</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    import { b2bCartRedPoint } from '../api/index.js'
    export default {
        data() {
            return {
                flagPoint:false,
            }
        },
        created(){
            this.getCartPoint()
        },
        methods:{
            getCartPoint(){
               b2bCartRedPoint().then(res=>{
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
    .mui-bar-tab .mui-tab-item-llbB.mui-active {
        color: #f00;
        font-weight: bold;
    }
    .mui-bar{
        -webkit-box-shadow: 0 0 2px rgba(0,0,0,.3);
    }
    .mui-bar-tab .mui-tab-item-llbB {
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

    .mui-bar-tab .mui-tab-item-llbB .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item-llbB .mui-tab-label {
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