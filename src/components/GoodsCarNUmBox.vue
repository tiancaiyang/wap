<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from "../../static/mui/js/mui.min.js";
    import { b2bcaredit } from '../api/index.js'
    export default {
        mounted() {
            // 初始化数字选择框组件
            mui(".mui-numbox").numbox();
            // console.log(this.initcount);
        },
        props: ['initcount','goodsid',"cartId"],
        methods: {
            countChanged() {
                // 购物车数据改变了
                // console.log(this.$refs.numbox.value);
                // 每当数量值改变，则立即把最新的数量同步到 购物车的  store 中，覆盖之前的数量值
                // this.$store.commit("updateB2ccar", {
                //     id: this.goodsid,
                //     count: this.$refs.numbox.value
                // })
                this.$store.commit("updatecar", {
                    id: this.goodsid,
                    count: this.$refs.numbox.value
                })
                let params ={
                    cart_id: this.cartId, 
                    num: this.$refs.numbox.value,
                    product_id: this.goodsid 
                }
                b2bcaredit(params).then(res=>{
                    console.log(res)
                 });
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>
