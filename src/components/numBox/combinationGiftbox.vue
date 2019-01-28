<template>
    <div class="mui-numbox giftNumbox" data-numbox-min='0'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="0" @change="countChanged" ref="numbox" readonly />
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
        },
        props: ['goodsid',],
        methods: {
            countChanged() {
                // 数据改变了
                // 每当数量值改变，则立即把最新的数量同步到 购物车的  store 中，覆盖之前的数量值
                this.$store.commit("updatGiftNUmB", {
                    id: this.goodsid,
                    count: this.$refs.numbox.value,
                })
            }
        },
        watch: {
            // 属性监听
            // max: function(newVal, oldVal) {
            //     // 使用 JS API 设置 numbox 的最大值
            //     mui(".giftNumbox")
            //         .numbox()
            //         .setOption("max", newVal);
            // }
        },
    }
</script>

<style scoped lang="less">
    
</style>