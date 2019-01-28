<template>
    <div class="messageBox">
        <header id="header" class="mui-bar mui-bar-nav">
			<h1 class="mui-title">消息中心</h1>
            <span class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @click="removeAll">删除</span>
		</header>
        <!-- 卡片 -->
        <div class="mui-content">
           <ul id="OA_task_1" class="mui-table-view">
				<li class="mui-table-view-cell" v-for="(item,index) in messagelist" :key="item.id">
					<div class="mui-slider-right mui-disabled">
						<a class="mui-btn" @click.prevent="removeList(item.message_id, index)">删除</a>
					</div>
					<div class="mui-slider-handle">
						<div class="title">
                            <img class="mui-pull-left Icon" :src="'http://www.silutianyu.com'+item.icon" alt="">
                            <span class="name">{{ item.type_title }}</span>
                            <span class="mui-pull-right time">{{ item.create_time }}</span>
                        </div>
                        <div class="content">
                            <p class="mui-ellipsis-2"><b>{{ item.title }}</b>{{ item.content }}</p>
                        </div>
                        <router-link :to="'/indexmessage/Messageinfo/'+ item.message_id" tag="div" class="watchInfo">
                            查看详情
                            <span class="mui-icon mui-icon-arrowright mui-pull-right"></span>
                        </router-link>
					</div>
				</li>
                <div  class="flagStyle" v-show="flag">暂无消息</div>
                <span v-if="isToken" class="flagStyle"> 您还没有登录，<router-link to="/login" tag="a" href="javascript">去登录</router-link></span> 
           </ul>   
        </div>
        <!-- 底部tab栏 -->
        <smallTabbar></smallTabbar>
    </div>
</template>

<script>
    import smallTabbar from '../../../components/SmallTabbar.vue';
    import mui from '../../../../static/mui/js/mui.min.js'
    import { messageList, messageDelet,messageDeletAll } from '../../../api/index.js'
    export default {
        data() {
            return {
                isToken:false,//是否登录
                messagelist:[],//消息详情
                flag: false,
                token:'',
            }
        },
        created(){
            this.token = localStorage.getItem('User-Token')
            if(this.token){
               this.getMessageList() // 获取消息列表
            }else{
                this.isToken = true
            }
        },
        mounted(){
            mui.init()
        },
        methods:{
                // 获取消息列表
                getMessageList(){
                    messageList().then(res=>{
                        if(res.code == 0){
                            this.isToken = false;
                            this.messagelist = res.data
                            if(this.messagelist.length == 0){
                                this.flag = !this.flag
                            }
                        }
                    })
                },
                removeList(id, index){
                    this.messagelist.splice(index, 1);
                    let params = { message_id: id }
                    messageDelet(params).then(res=>{
                        mui.toast(res.msg,{ duration:500 })
                        if(this.messagelist.length == 0){
                            this.flag = !this.flag
                        }
                    })
                },
                removeAll(){
                    var self = this;
                    mui.confirm('确定删除全部消息吗？', function(e) {
                        if (e.index == 1) {
                            messageDeletAll().then(res=>{
                                self.messagelist = '',
                                self.flag = !self.flag
                                console.log(res)
                            })
                        } else {
                                
                        }
                        
                    });
                }
        },
        components:{
            smallTabbar,
        }
    }
</script>

<style scoped lang="less">
    .messageBox{
        #header{
            height: 50px;
            background-color: #fff!important;
            .mui-title{
                height: 50px;
                line-height: 50px;
            }
            .mui-action-back{
                font-size: 30px;
                color: #070707;
            }
            .mui-btn-link{
                line-height: 50px;
                color: #666;
            }
        }
    }
    .mui-content{
        padding-bottom: 50px!important;
    }
    .mui-table-view{
        padding: 0 0.28rem 0;
        background-color: #efeff4;
    }
    .mui-table-view:before,.mui-table-view:after{
        height: 0;
    }
    .mui-table-view-cell:after{
        height: 0;
    }
    .mui-table-view-cell{
        background-color:#fff;
        margin-bottom: 10px;
        .mui-disabled{
            a{
                color: red;
                background-color: #efeff4;
            }
        }
        .mui-slider-handle{
            .title{
                text-align: left;
                vertical-align: middle;
                .Icon{
                    width: 0.38rem;
                    margin-right: 0.1rem;
                }
                .name{
                    color: #666;
                }
                .time{
                    color: #999;
                    font-size: 0.28rem;
                }
            }
            .content{
                padding: 0.25rem 0;
                border-bottom: 1px solid #ececec;
                p{
                    text-align: left;
                    font-size: 0.32rem;
                    color: #333;
                    line-height: 0.6rem;
                }
            }
            .watchInfo{
                padding-top: 0.2rem;
                text-align: left;
                color: #999;
                font-size: 0.28rem;
                .mui-icon-arrowright{
                    color: #999;
                }
            }

        }
    }
    .flagStyle{
        position: absolute;
        top: 100px;
        left: 50%;
        transform: translateX(-50%)
    }

</style>