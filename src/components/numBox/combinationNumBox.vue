<template>
    <div class="mui-numbox" data-numbox-min='1' >
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../../static/mui/js/mui.min.js'
    export default {
        data() {
            return {
            }
        },
        mounted() {
            // 初始化数字选择框组件
            mui(".mui-numbox").numbox();
            // console.log(this.max);
        },
        props: ['initcount','goodsid'],
        methods: {
            // 组合活动组数数量选择框
            countChanged() {
                // 数据改变了
                // 每当 文本框的数据被修改的时候，立即把 最新的数据，通过事件调用，传递给父组件
                this.$emit("getcount", parseInt(this.$refs.numbox.value));
                this.$store.commit("updatGroupNumB", {
                    id: this.goodsid,
                    count: this.$refs.numbox.value,
                })
            }
        }
    }
</script>

<style scoped lang="less">
    
</style>