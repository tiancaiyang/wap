<template>
    <div>
        <!-- b2c商品数量选择框 -->
        <div class="mui-numbox" data-numbox-min= "1" :data-numbox-max= "everNum">
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input id="test" class="mui-input-numbox" type="number" @change="countChanged" ref="numbox"  :value="min" />
			<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
    </div>
</template>

<script>
    import mui from '../../static/mui/js/mui.min.js'
    export default {
        data() {
            return {};
        },
        props: ["max" , "min", "everNum"],
        mounted () {
            // 初始化数字选择框组件
            mui(".mui-numbox").numbox();
        },
        methods:{
            // 每当文本框的数据被修改的时候，立即把最新的数据通过事件调用传递给父组件
            countChanged(){
                this.$emit('getcount',parseInt(this.$refs.numbox.value))
            }
        },
        watch:{
            // 属性监听
            everNum:function(newVal,oldVal){
               mui(".mui-numbox").numbox().setOption("max", newVal);
            }
        }
    };
</script>

<style scoped>
</style>
