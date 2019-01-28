<template>
    <div class="indexMessage">
        <header id="header" class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">消息详情</h1>
		</header>
        <div class="content">
           <h1>{{ messageInfo.title }}</h1>
           <p class="time">{{ messageInfo.create_time }}</p>
           <div class="artical">
               <div v-html="messageInfo.content"></div>
               <img :src="'http://www.silutianyu.com'+messageInfo.img_path" alt="">
           </div>
        </div>
       
            
    </div>
</template>

<script>
    import mui from '../../../../static/mui/js/mui.min.js'
    import { messageDetail } from '../../../api/index.js'
    export default {
        data() {
            return {
                id: this.$route.params.id,
                messageInfo:[]
            }
        },
        created(){
            this.getDetail()
        },
        methods:{
           getDetail(){
               let params = { message_id: this.id }
               messageDetail(params).then(res=>{
                   this.messageInfo = res.data
                   console.log(this.messageInfo)
               })
           }
        }
      
    }
</script>

<style lang='less'>
    .indexMessage{
        background-color: #fff;
        position: relative;
        #header{
            height: 50px;
            .mui-title{
                height: 50px;
                line-height: 50px;
            }
            .mui-action-back{
                font-size: 30px;
                color: #070707;
            }
        }
        .content{
            padding: 50px 0.28rem 20px 0.28rem;
            // padding-left: 0.28rem;
            // padding-right: 0.28rem;
            // background-color: #fff;
            h1{
                font-size: 0.5rem;
                line-height: 0.7rem;
                text-align: left;
                padding: 0.5rem 0 0.28rem;
                color: #232323;
            }
            .time{
                text-align: left;
                color: #bababa;
                font-size: 0.32rem;
            }
            .artical{
                margin-top: 0.7rem;
                p{
                    color: #666;
                    text-align: left;
                    font-size: 0.34rem;
                    line-height: 0.6rem;
                    text-indent: 2em;
                    a{
                        font-size: 0.34rem!important;   
                    }
                }
                img{
                    width: 100%;
                    margin-bottom: 10px;
                }
            }

        }
    }
    
   
</style>