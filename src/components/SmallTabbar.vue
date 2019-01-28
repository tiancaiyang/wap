<template>
    <div>
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item-llb" tag="a" to="/cloudentrance">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-llb" tag="a" to="/indexmessage">
                <span class="mui-icon mui-icon-email"></span>
                <span class="mui-tab-label">消息</span>
            </router-link>
            <router-link class="mui-tab-item-llb" tag="a" to="/indexUser">
               <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">个人中心</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
    }
</script>

<style scoped lang="less">
    .mui-bar-tab .mui-tab-item-llb.mui-active {
        color: red;
    }
    .mui-bar-tab .mui-tab-item-llb {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
    }

    .mui-bar-tab .mui-tab-item-llb .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>