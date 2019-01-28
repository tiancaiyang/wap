<template>
    <!-- 组合活动类型四的商品数量选择框 -->
     <div class="mui-numbox" data-numbox-min='0'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount"  @change="countChanged" ref="numbox" readonly/>
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
        props: ['goodsId', 'initcount','max','min'],
        mounted() {
            mui(".mui-numbox").numbox(); // 初始化数字选择框组件
        },
        methods: {
            countChanged() {
                // 每当 文本框的数据被修改的时候，立即把 最新的数据，通过事件调用，传递给父组件
                this.$emit("getFourCount", parseInt(this.$refs.numbox.value));
                this.$store.commit("updatecombationCountB", {
                    id: this.goodsId,
                    count: this.$refs.numbox.value
                });
            },
        },
        
    }
</script>

<style scoped lang="less">
    .mui-numbox{
        background-color: #fff;
        border: 0;
        padding: 0 20px;
        width: 100px;
        button[type=button]{
            // width: 50%;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            border: 1px solid #f42c26;
            color: #f42c26;
            font-size: 0.4rem;
            font-weight: bold;
        }
        input[type=number]{
            border: 0!important;
        }
    }
</style>