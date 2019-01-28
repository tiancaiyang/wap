<template>
    <div>
        <span :endTime="endTime"  :endText="endText">
            <slot>
                {{content}}
                <!-- <span>距结束:</span><b>{{ day }}</b>:<b>{{ hr }}</b>:<b>{{ min }}</b>:<b>{{ sec }}</b> -->
            </slot>
        </span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                content: '',
                // day: 0, hr: 0, min: 0, sec: 0
            }
        },
        props:{
            endTime:{
                default :''
            },
            endText:{
               type : String,
               default:'已结束'
            },
            
        },
        mounted () {
          this.countdowm(this.endTime)
        },
        methods: {
           countdowm(timestamp){
            let self = this;
            let timer = setInterval(function(){
                let nowTime = new Date();
                let endTime = new Date(timestamp * 1000);
                let t = endTime.getTime() - nowTime.getTime();
                if(t>0){
                    let day = Math.floor(t/86400000);
                    let hour=Math.floor((t/3600000)%24);
                    let min=Math.floor((t/60000)%60);
                    let sec=Math.floor((t/1000)%60);
                    hour = hour < 10 ? "0" + hour : hour;
                    min = min < 10 ? "0" + min : min;
                    sec = sec < 10 ? "0" + sec : sec;
                    let format = '';
                    if(day > 0){
                       format =  `距结束${day}:${hour}:${min}:${sec}`;
                    }
                    if(day <= 0 && hour > 0 ){
                       format = `${hour}:${min}:${sec}`;
                    }
                    if(day <= 0 && hour <= 0){
                       format =`${min}:${sec}:`;
                    }
                    self.content = format;

                    }else{
                      clearInterval(timer);
                      self.content = self.endText;
                      self._callback();
                    }
                 },1000);
               },
               _callback(){
               if(this.callback && this.callback instanceof Function){
                    this.callback(...this);
                }
            }
        }
    }
</script>

<style scoped lang="less">
    p{
                        color: #000;
                        span{
                            color: #888;
                        }
                        b{
                            background-color: rgb(14, 13, 13);
                            color: #fff;
                            padding: 0.09rem;
                            border-radius: 0.1rem;
                        }
                    }
</style>