<template>
    <div>
        <!-- 乡村互联列表 -->
        <header id="header" class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">乡村列表</h1>
		</header>
        <div class="mui-content">
			<div id='list' class="mui-indexed-list">
				<div class="mui-search mui-input-row mui-search searchInput">
					<input type="search" class="mui-input-clear mui-indexed-list-search-input" placeholder="搜索">
				</div>
				<div class="mui-indexed-list-alert"></div>
				<div class="mui-indexed-list-inner">
					<ul class="mui-table-view">
						<li @click="changeCity(item.lonlat,item.towncode)" class="mui-table-view-divider mui-indexed-list-group" v-for="item in cityListData"  :key="item.towncode">
                            {{ item.city }}
                            {{ item.district }}
                            {{ item.township }}
                        </li>	
					</ul>
				</div>
			</div>
        </div>
    </div>
</template>

<script>
    import { ruralCityList } from '../../api/index.js'
    export default {
        data() {
            return {
                cityListData:[],
            }
        },
        created(){
            this.getList()
        },
        mounted(){
            mui('.mui-input-row input').input(); 
        },
        methods:{
            getList(){
                ruralCityList().then(res=>{
                    this.cityListData = res.data
                    console.log(res)
                })
            },
            // 切换城市的经纬度
            changeCity(lonlat,towncode){
                let param ={ towncode :towncode}
                localStorage.setItem('getcity',lonlat)
                this.$router.push({ path: '/ruralHome'})
            }
        }
    }
</script>

<style scoped lang="less">
    #header{
        height: 50px;
        background-color: #fff;
        .mui-title{
            height: 50px;
            line-height: 50px;
        }
        .mui-action-back{
            font-size: 30px;
            color: #070707;
        }
    }
    .mui-content{
        padding-top: 55px!important;
        padding-bottom: 1rem;
        background-color: #fff;
        .searchInput{
            margin: 0 0.28rem;
        }
        .mui-indexed-list{
            height: 100%;
            text-align: left;
            .mui-indexed-list-inner{
                ul{
                    li{
                        padding: 0.2rem 0.28rem;
                        font-size: 0.32rem;
                        color: #151515;
                    }
                }
            }
        }
    }
</style>