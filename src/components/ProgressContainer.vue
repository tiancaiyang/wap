<template>
    <div class="progressContainer">
       <span class="Tishi" v-html="flag">已抢{{barwidth}}%</span> <div class="progressItem" :style="{width:barwidth + '%' }"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                flag: '已抢光'
            }
        },
        props:[ 'total','rest',"barwidth"],
        created(){
            this.barwidthOver()
        },
        methods:{
            barwidthOver(){
                if( this.barwidth != 100){
                    this.flag = '已抢'+ this.barwidth + '%';
                }
            }
        }
    }
</script>

<style scoped>
    .progressContainer{
        margin-top: 0.2rem;
        position: relative;
        height: 0.2rem;
        width: 100%;
        border: 1px solid red;
        border-radius: 5px;
    }
    .Tishi{
        position: absolute;
        top: -0.12rem;
        left: -1.2rem;
        font-size: 0.2rem;
        color: #999;
    }
    .progressItem{
        position: absolute;
        top: -1px;
        height: 0.2rem;
        width: 100%;
        background-color: red;
        border-radius: 5px;
        border-radius: 1px solid red;
    }
</style>