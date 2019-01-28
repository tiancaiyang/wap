<template>
    <div class="timeTow">
        <span>距结束 </span><b>{{ day }}</b> : <b>{{ hr }}</b> : <b>{{ min }}</b> : <b>{{ sec }}</b>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                day: 0, hr: 0, min: 0, sec: 0
            }
        },
        props:['seckillTime'],
        created(){
            this.countdown()
        },
        methods:{
            // 倒计时
            countdown: function () {
                const endTime = this.seckillTime
                const end =  endTime * 1000
                const now = Date.parse(new Date())
                const msec = end - now
                if(msec > 0){
                    let day = parseInt(msec / 1000 / 60 / 60 / 24)
                    let hr = parseInt(msec / 1000 / 60 / 60 % 24)
                    let min = parseInt(msec / 1000 / 60 % 60)
                    let sec = parseInt(msec / 1000 % 60)
                    this.day = day
                    this.hr = hr > 9 ? hr : '0' + hr;
                    this.min = min > 9 ? min : '0' + min;
                    this.sec = sec > 9 ? sec : '0' + sec;
                    const that = this
                    setTimeout(function () {
                        that.countdown()
                    },1000)
                }
            }, 
        }
    }
</script>

<style scoped lang="less">
    .timeTow{
        color: #000;
        font-weight: bold;
        span{
            font-weight: normal;
            color: #888;
        }
        b{
            background-color: rgb(26, 25, 25);
            color: #fff;
            padding: 0.06rem;
            border-radius: 0.1rem;
            font-weight: normal;
        }
    }
</style>