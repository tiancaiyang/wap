<template>
    <div class="searchinfo">
        <header id="header" class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">人文详情</h1>
		</header>
        <div class="content">
           <h1>{{ articleInfo.title }}</h1>
           <p class="time">{{ articleInfo.create_time }}</p>
           <div class="artical" v-html="articleInfo.content"></div>
        </div>
        <div class="collShar">
            <a href="#picture">
                <span class="mui-icon mui-icon-paperplane">分享</span> 
            </a>
        </div>
        <!-- 模态框 -->
        <div id="picture" class="mui-popover mui-popover-action mui-popover-bottom">
            <div class="sharingModel">
                <!-- <p class="title">分享至</p>
                <div class="mui-slider-item">
                	<ul class="mui-table-view mui-grid-view mui-grid-9">
						<li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
							<a href="#">
								<img src="../../assets/images/RualInter/wechat.png" alt="">
								<div class="mui-media-body">微信</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
							<a href="#">
								<img src="../../assets/images/RualInter/wechatFriends.png" alt="">
								<div class="mui-media-body">朋友圈</div>
							</a>
						</li>
                        <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
							<a class="-mob-share-qq">
                                <img src="../../assets/images/RualInter/qq.png" alt="">
								<div class="mui-media-body">QQ好友</div>
                            </a>
						</li>
                        <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
							<a href="#">
								<img src="../../assets/images/RualInter/copyHref.png" alt="">
								<div class="mui-media-body">复制链接</div>
							</a>
						</li>
                	</ul>  -->
                    <p>请使用浏览器进行分享</p>
                <!-- </div>            -->
            </div>
			<ul class="mui-table-view foot">
				<li class="mui-table-view-cell">
					<a href="#picture"><b>取消</b></a>
				</li>
			</ul>
		</div>      
    </div>
</template>

<script>
    import { ruralLocalInfo, ruralArticalCollection } from '../../api/index.js'
    export default {
        data() {
            return {
                id: this.$route.query.localId,//文章id
                articleInfo:[],//文章详情
            }
        },
        created(){
            this.getArticleInfo()
        },
        methods:{
            // 获取文章详情
            getArticleInfo(){
                let params = { local_id: this.id }
                ruralLocalInfo(params).then(res=>{
                    this.articleInfo = res.data
                    console.log(res.data)
                })
            }
        }
      
    }
</script>

<style  lang='less'>
    .searchinfo{
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
        
    }
   
    .content{
        padding: 50px 0.28rem 100px 0.28rem;
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
            margin-top: 0.5rem;
           p{
                color: #666;
                text-align: left;
                font-size: 0.34rem;
                line-height: 0.6rem;
                // text-indent: 2em;
                img{
                    width: 100%;
                }
           }
        }

    }
    // 收藏分享
    .collShar{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f9f7f8;
        height: 50px;
        line-height: 50px;
        display: flex;
        a{
            width: 100%;
            height: 50px;
            color: #616163;
            font-size: 0.33rem;
            text-align: center;
            span{
                color: #616163;
                font-size: 0.33rem;
            }
            .mui-icon-extra.mui-icon-extra-heart-filled:before{
                font-size: 0.38rem;
            }
            .mui-icon-paperplane:before{
                font-size: 0.5rem;
            }
        }
        .collecCss{
            color: #159478;
            &:before{
                color: #159478;
                
            }
        }
    }
    // 分享模态框
    #picture{
        .sharingModel{
            background-color: #fff;
            padding: 0.28rem;
            .title{
                font-size: 0.38rem;
                color: #333;
                font-weight: bold;
                text-align: left;
            }
            .mui-slider-item{
                .mui-table-view {
                    margin: 0;
                    border: 0;
                    background-color: #fff;
                    .mui-table-view-cell{
                        border-bottom: 0;
                        border: 0;
                        a{
                            img{
                                width: 1rem;
                            }
                        }
                    }
                    .mui-table-view-cell:after{
                        height: 0;
                    }
                }
            
            }
                
        }
        .foot{
            margin: 0;
            border-top: 1px solid #ececec;
            border-radius: 0;
            .mui-table-view-cell{
                a{
                    height: 1rem;
                    line-height: 0.5rem;
                    b{
                        color: #333;
                    }
                }
                
            }
        }
    }
   
</style>