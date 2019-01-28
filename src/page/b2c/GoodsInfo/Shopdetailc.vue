<template>
    <div id="shopdetaInfo">
        <header id="header" class="mui-bar mui-bar-nav header">
          <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
          <div class="shareing">
                <a href="#" @click="collection">
                  <img v-show="collect_type == 2" src="../../../assets/images/b2c/shopdetails/shoucang.png" alt="">
                  <img v-show="collect_type == 1" src="../../../assets/images/b2c/shopdetails/shoucang02.png" alt="">
                </a>
              <!-- <a href="#"><img src="../../../assets/images/b2c/shopdetails/fenxiang.png" alt=""></a> -->
          </div>
		</header>
        <div class="mui-content">
            <!-- 轮播图 -->
            <div class="wrapper">
                <swiper :options="swiperOption">
                <swiper-slide v-for="item of shopListData.img" :key="item.id">
                    <img class="swiper-img" :src="item" />
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
                </swiper>
            </div>
            <!-- 商品信息区 -->
            <div class="mui-card">
                <div class="goodsinfo">
                    <!-- 普通商品 -->
                    <h3 v-if="shopListData.activity_type == 0">￥{{ shopListData.price }}</h3>
                    <!-- 特价商品 -->
                    <div class="discountPrice" v-if="shopListData.activity_type== 1">
                        <h3>
                            ￥{{ shopListData.discount_price }}
                            <del>￥{{ shopListData.price }}{{ shopListData.unit }}</del>
                        </h3>
                    </div>
                    
                    <!-- 秒杀商品 -->
                    <div class="seckillPrice PriceDiv"  v-if="shopListData.activity_type== 2">
                        <h3>
                            ￥{{ shopListData.seckill_price }}
                            <!-- /{{ shopListData.unit }}
                            <del>￥{{ shopListData.price }}{{ shopListData.unit }}</del> -->
                            <div class="mui-pull-right seckillTime">
                                <p class="seckillName">秒杀倒计时</p>
                                <p class="time"><b>{{ day }}</b>天<b>{{ hr }}</b>:<b>{{ min }}</b>:<b>{{ sec }}</b></p>
                            </div>
                        </h3>
                    </div>
                    <h4><span class="mui-pull-left activityIcon" v-if="shopListData.activity_type== 1">特价</span> {{ shopListData.title }}</h4>
                    <ul class="goodsInfo-ul mui-clearfix">
                        <li>
                            <span>
                                <img src="../../../assets/images/b2c/shopdetails/car_03.png" alt="">
                                {{ shopListData.product_type_title}}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 商品选择区 -->
            <div class="mui-card">
               <ul class="mui-table-view goodsSelect">
                    <li class="mui-table-view-cell">
                        <a href="#picture" v-if="shopListData.attrs !== undefined && shopListData.attrs.length >0 " class="mui-navigate-right">选择 <span >{{ product_attr }}数量:{{ selectedCount }}</span></a>
                        <a href="#picture2" class="mui-navigate-right" v-else >选择 <span >{{ shopListData.guide }}数量:{{ selectedCount }}</span></a>
                    </li>
                    <li class="mui-table-view-cell">
                        <a>运费 <span>{{ shopListData.trans_expenses }}</span></a>
                    </li>
                    <li class="mui-table-view-cell" v-for="item in shopListData.cat_format" :key="item.id">
                        <a>
                            {{ item.title }}<span>{{ item.val}}</span>
                        </a>
                    </li>
                    <li class="mui-table-view-cell">
                        <!-- <a>条码<span>{{ shopListData.sn}}</span></a> -->
                        <a>条码<span>暂无</span></a>
                    </li>
                </ul>
            </div>
            <div class="mui-card">
                <!-- 评论 -->
                <router-link :to="'/evaluatec/' + productId" tag="div" class="moreComment title" v-if="JSON.stringify(assess) !=='{}'">
                    评价({{assess.assess_count}})
                    <span class="mui-icon mui-icon-arrowright  mui-pull-right"></span>
                </router-link>
                <!-- 当没有评价的时候显示此项 -->
                <div class="moreComment title" v-else-if="JSON.stringify(assess) =='{}'?false:true">
                    评价(0)
                    <span class="mui-icon mui-icon-arrowright  mui-pull-right"></span>
                </div>
                <!-- 评论列表 -->
                <div class="commentList" v-if="JSON.stringify(assess) !=='{}'">
                    <div class="mui-card-header mui-card-media" >
                        <img class="ImgUser" :src="assess.head_image" />
                        <div class="mui-media-body nameUser">
                            <span>{{ assess.username }}</span>
                            <p>发表于 {{ assess.assess_date }}</p>
                        </div>
                    </div>
                    <div class="mui-card-content" >
                        <p>{{ assess.content}}</p>
                    </div>
                </div>
                <div class="commentList" v-else-if="JSON.stringify(assess) =='{}'?false:true">
                    <p style="text-align:center;">暂无更多评论</p>
                </div>
                <!-- 图文详情 -->
                <div class="whiteImg ImgInfo">
                    <p class="title">图文详情</p>
                    <div class="imgDiv" v-html="shopListData.content"></div>
                </div>
                 <!-- 相关推荐 -->
                <div class="whiteImg" v-if="shopListData.productList !== undefined && shopListData.productList.length >0">
                    <p class="title">相关推荐</p>
                </div>
			</div>
        </div>                
		<!-- 商品列表 -->
        <div class="list-goods" v-if="shopListData.productList !== undefined && shopListData.productList.length >0">
            <Recomend-list :listData="shopListData.productList"></Recomend-list>   
        </div> 
         <!-- 底部购物车 -->
         <div class="footer">
             <router-link to="/carc" tag="a"><img src="../../../assets/images/b2c/shopdetails/car.png" alt=""></router-link>
             <div @click="goPaymoney">立即购买</div>
            <div @click="addShopCar">加入购物车</div>
         </div>
        <!-- 选择属性模态框 -->
        <div id="picture" class="picture mui-popover mui-popover-action mui-popover-bottom">
           <div class="selectModel">
              <div class="infoDiv mui-clearfix">
                 <div class="infoImg"><img :src="secImg" alt=""></div>
                  <div class="info">
                      <h4>￥{{ this.price }}</h4>
                      <a href="#picture"> <span class="mui-icon mui-icon-closeempty"></span></a>
                      <p class="kucun">库存: <span>{{ this.max }}</span></p>
                      <p>已选: <span>{{ product_attr }}</span> 数量:<span>{{ selectedCount }}</span></p>
                  </div>
              </div>
              <div class="selectGui" v-for="(option, index) in shopListData.attrs" :key="option.id">
                    <p class="title">{{ option.spec_name }}</p>
                    <div>
                        <div class="row" v-for="(item, ind) in option.business_product_base_spec_info" :key="item.ind" @click="select(index, ind)">
                            <input type="radio" :name="index" :id="item.spec_info_id" value="">
                            <!-- 关键在于name这里设为index，让每一行选项的name一样，属性id和label的for属性一致 -->
                            <label :for="item.spec_info_id">{{item.spec_info_name}}</label>
                        </div>
                    </div>    
              </div>
              <div class="numBox"> 
                  <p class="title">数量</p>
                  <goods-numbox @getcount="getSelectedCount" :max= this.max :min="shopListData.limit_num"></goods-numbox>
              </div>
           </div>
			<ul class="mui-table-view foot">
				<li class="mui-table-view-cell">
					<a href="#picture"><b>确定</b></a>
				</li>
			</ul>
		</div> 
        <!-- 选择数量  -->
        <div id="picture2" class="picture mui-popover mui-popover-action mui-popover-bottom">
           <div class="selectModel">
              <div class="infoDiv mui-clearfix">
                 <div class="infoImg"><img :src="shopListData.thumb" alt=""></div>
                  <div class="info">
                      <h4 v-if="shopListData.activity_type == 0">￥{{ shopListData.price }}</h4>
                      <h4 v-if="shopListData.activity_type == 1">￥{{ shopListData.discount_price }}</h4>
                      <h4 v-if="shopListData.activity_type == 2">￥{{ shopListData.seckill_price }}</h4>
                      <a href="#picture2"> <span class="mui-icon mui-icon-closeempty"></span></a>
                      <p>数量:<span>{{ selectedCount }}</span></p>
                  </div>
              </div>
              <div class="selectGui" v-for="(option, index) in shopListData.attrs" :key="option.id">
                    <p class="title">{{ option.spec_name }}</p>
                    <div>
                        <div class="row" v-for="(item, ind) in option.business_product_base_spec_info" :key="item.ind" @click="select(index, ind)">
                            <input type="radio" :name="index" :id="item.spec_info_id" value="">
                            <!-- 关键在于name这里设为index，让每一行选项的name一样，属性id和label的for属性一致 -->
                            <label :for="item.spec_info_id">{{item.spec_info_name}}</label>
                        </div>
                    </div>    
              </div>
              <div class="numBox"> 
                  <p class="title">数量</p>
                  <goods-numbox @getcount="getSelectedCount" :max= this.max :min ="shopListData.limit_num" ></goods-numbox>
              </div>
           </div>
			<ul class="mui-table-view foot">
				<li class="mui-table-view-cell">
					<a href="#picture2"><b>确定</b></a>
				</li>
			</ul>
		</div>
    </div>
</template>

<script>
    import RecomendList from '../../../components/Shoplist.vue'
    import GoodsNumbox from '../../../components/GoodsNumBox.vue'
    import mui from '../../../../static/mui/js/mui.min.js'
    import { b2cShopdetail ,b2cCollecst ,b2cAddCart} from '../../../api/index.js'
    export default {
        inject :['reload'],
        data() {
            return {
                productId: this.$route.params.id,
                shopListData:[],//数据列表
                swiperOption: {
                    pagination: '.swiper-pagination',
                    loop: true,
                    autoplay: 3000,//页面显示时间
                    speed: 1000,//切换速度
                    autoplayDisableOnInteraction: false,//手动轮播后还能自动轮播
                },// 轮播设置
                specListData:[], // 选择不同规格列表
                specList:[],//规格列表
                selectGui:[],//选中规格的名字
                product_attr:'',//选中规格的字符串拼接
                secImg:'',//选中规格的图片
                id: [],//规格的id拼接保存
                spec:'',//选中的规格id的字符串凭借
                price:'',//选中的商品价格
                max:0,//选择的库存
                goodsId: 1,//选中的规格组合id
                selectedCount: 1, // 保存用户选中的商品数量，
                activityType:'',//商品类型
                day: 0, hr: 0, min: 0, sec: 0,
                assess:[],//评价列表
                collect_type:'',//是否收藏1是，2否
                limitNum:'',//最小数量限制
                token:'',//判断是否登录
            }
        },
        created(){
            this.getGoodsInfoB2C(); 
            this.token = localStorage.getItem('User-Token')
        },
        components: {
            RecomendList,
            GoodsNumbox
        },
        methods:{
            // 商品详情数据获取
            getGoodsInfoB2C(){
                let params = {product_id:this.productId}
                b2cShopdetail(params).then(res=>{
                    if(res.code == 0){
                        this.shopListData = res.data
                        this.specListData = res.data.spec_list
                        this.specList = res.data.attrs
                        this.activityType = res.data.activity_type
                        this.assess = res.data.assess
                        this.collect_type = res.data.collect_type
                        this.limitNum = res.data.limit_num
                        this.selectedCount = res.data.limit_num
                        this.secImg = res.data.thumb
                        this.price = res.data.price
                        console.log(res.data)
                        this.countdown()
                    }
                })
            },
            //点击收藏  
            collection(){
                if(!this.token){
                    mui.toast('请先登录',{ duration:500 })
                }else if(this.token){
                    if(this.collect_type == 1){ 
                        let params = {product_id:this.productId,collect_type:2 ,product_type:2 }
                        b2cCollecst(params).then(res=>{
                            mui.toast('取消收藏',{ duration:500 })
                            this.collect_type = 2;
                        })
                    }else{
                        let params = {product_id:this.productId,collect_type:1,product_type:2}
                        b2cCollecst(params).then(res=>{
                            mui.toast('已收藏',{ duration:500 })
                            this.collect_type = 1; 
                        })
                    }
                }
            },
            select(index, ind) {
                var itemId = this.specList[index].business_product_base_spec_info[ind].spec_info_id; //获取选中的id号
                this.id.splice(index, 1, itemId); //替换数组id[]中对应的元素，获得所有选中的id
                this.spec = this.id.join(); //拼接选中的规格的id_info  
                var itemName = this.specList[index].business_product_base_spec_info[ind].spec_info_name;
                this.selectGui.splice(index,1,itemName);
                this.product_attr = this.selectGui.join(';');
                var that = this;
                this.specListData.forEach(item=>{
                    if(that.spec == item.spec){
                        that.goodsId = item.attr_id;
                        that.max = item.stock;
                        that.price = item.price;
                        that.secImg = item.thumb
                    }
                })
            },
            getSelectedCount(count){
                // 当子组件把选中的数量传递给父组件的时候，把选中的值保存到data上
                this.selectedCount = count;
                if(this.selectedCount < this.limitNum){
                    mui.toast('最低购买数量限制为'+this.limitNum)
                    this.reload()//刷新页面
                }
            },
            // 倒计时
            countdown: function () {
                const endTime = this.shopListData.over_time
                const end =  endTime * 1000
                const now = Date.parse(new Date())
                const msec = end - now
                if(msec > 0){
                    let hr = parseInt(msec / 1000 / 60 / 60 % 24)
                    let min = parseInt(msec / 1000 / 60 % 60)
                    let sec = parseInt(msec / 1000 % 60)
                    this.hr = hr > 9 ? hr : '0' + hr;
                    this.min = min > 9 ? min : '0' + min;
                    this.sec = sec > 9 ? sec : '0' + sec;
                    const that = this
                    setTimeout(function () {
                        that.countdown()
                    },1000)
                }
                
            },
            // 加入购物车
            addShopCar(){
                if(!this.token){
                    mui.toast('请先登录',{ duration:500 })
                }else if(this.token){
                    let params = {
                        product_id: this.productId,
                        num: this.selectedCount,
                        spec: this.spec,
                        product_attr: this.product_attr,
                        // brand_member_pos_id: this.shopListData.brand_member_pos_id,//业务员id
                        activity_type:this.activityType
                    }
                    // 先判断是否存在多项属性，如果存在再判断是否选择了属性，如果选择了才能加入购物车，
                    // 如果不存在多属性，就直接加入购物车，默认数量为1
                    if(this.shopListData.attrs !== undefined && this.shopListData.attrs.length > 0 ){
                        if( this.product_attr == '' ){
                            mui.toast('请选择商品规格',{ duration:500 })
                        }else{
                            b2cAddCart(params).then(res=>{
                                mui.toast('添加购物车成功',{ duration:500 }) 
                            })
                        }
                    }else{
                        b2cAddCart(params).then(res=>{
                            mui.toast('添加购物车成功',{ duration:500 }) 
                        })
                    }
                }
                   
            },
            // 立即购买
            goPaymoney(){
                let params = {
                    product_id: this.productId,//品牌id
                    num: this.selectedCount,//购买数量
                    price: this.shopListData.price,//商品价格0
                    priceDiscount: this.shopListData.discount_price,//商品价格1
                    seckill_price: this.shopListData.seckill_price,//商品价格 2
                    spec: this.spec,//选中的规格字符串
                    title: this.shopListData.title,//商品名称
                    image: this.shopListData.thumb,//商品图片
                    selectPrice: this.price,//选中规格的价格
                    product_attr: this.product_attr,//选中的规格属性
                    selectImg: this.secImg,//选中规格的图片
                    activity_type:this.activityType,//活动的类型 0 1 2 
                    brand_member_id: this.shopListData.brand_member_id,//品牌商id
                }
                // 判断是否选择了属性
                if(this.shopListData.attrs !== undefined && this.shopListData.attrs.length > 0 ){
                    if( this.product_attr == '' ){
                        mui.toast('请选择商品规格',{ duration:500 })
                    }else{
                        this.$router.push({name:'BuyC',query: params })
                    }
                }else{
                    this.$router.push({name:'BuyC',query: params })
                }   
                
            }
        },
    }
</script>

<style  lang="less">
   #shopdetaInfo{
        @color:#ff2400;
        ul,li{
            margin: 0;
            padding: 0;
            list-style: none;
        }
        #header{
            @headerBg: #fff;
            @headerHeight: 50px;
            background: @headerBg;
            height: @headerHeight; 
            .mui-pull-left{
                height: @headerHeight;
                line-height: 32px;
                color: #333;
            }
            .shareing{
                text-align: right;
                a{
                    height: 50px;
                    display: inline-block;
                    margin-top: 25px;
                    margin-left: 0.25rem;
                    img{
                    max-width: 0.44rem;
                    height: .43rem; 
                    transform: translateY(-50%);
                    }
                }
            }
        } 
        .mui-content{
            padding-top: 0px;
            // 轮播图
            .wrapper {
                margin-top: 50px;
                position: relative;
                overflow: hidden;
                width: 100%;
                height: 5rem!important;
                // height:3rem;
                background: #fff;
                .swiper-pagination{
                    position: absolute;
                }
                .swiper-container{
                    height: 100%;
                }
                .swiper-pagination-bullet{
                    background: rgb(10, 0, 0);
                }
                .swiper-pagination-bullet.swiper-pagination-bullet-active{
                    background-color: #fff;
                }
                .swiper-img{
                    max-width: 100%!important;
                }
            }
            .mui-card{
                margin: 0 0 0.2rem;
                box-shadow: 0 1px 2px rgba(0,0,0,0);
                // 商品信息区
                .goodsinfo {
                    text-align: left;
                    h3 {
                        padding: 0.28rem 0.28rem 0;
                        margin: 0;
                        color: @color;
                        font-size: 0.4rem;
                        del {
                            font-size: 0.3rem;
                            color: #999;
                        }
                    }
                    // 活动商品
                    .PriceDiv{
                        height: 1rem;
                        margin-bottom: 0.25rem;
                        background: -webkit-linear-gradient(left, #f34c13 , #ff891a);
                        background: -o-linear-gradient(right, #f34c13 , #ff891a);
                        background: -moz-linear-gradient(right, #f34c13 , #ff891a);
                        background: linear-gradient(to right, #f34c13 , #ff891a);
                        position: relative;
                        h3{
                            color: #fff;
                            padding-top: 0.34rem;
                            del{
                                color: #eee;
                            }
                        }
                        .seckillTime{
                            position: absolute;
                            right: 0.28rem;
                            top: 0.15rem;
                            text-align: right;
                            .seckillName{
                                color: #fff;
                                font-size: 0.25rem;
                                font-weight: normal;
                                margin-bottom: 0.15rem;
                            }
                            .time{
                                color: #fff;
                                b{
                                    background-color: #fff;
                                    color: #f00;
                                    padding: 0.09rem;
                                    border-radius: 0.1rem;
                                    margin-right: 0.05rem;
                                    margin-left: 0.05rem;
                                }
                            }
                        }
                    }
                    h4 {
                        padding: 0 0.28rem 0;
                        font-size: 0.34rem;
                        color: #151515;
                        line-height: 0.5rem;
                        .activityIcon{
                            display: inline-block;
                            background-color: #f42c26;
                            height: 0.4rem;
                            line-height: 0.44rem;
                            color: #fff;
                            font-size: 0.25rem;
                            padding: 0 0.15rem;
                            border-radius: 0.4rem
                        }
                    }
                    .goodsInfo-ul{
                        padding: 0 0.28rem 0.28rem;
                        li{
                            float: left;
                            margin-right: 0.4rem;
                            img{
                                vertical-align: middle;
                                width: 0.3rem;
                            }
                        }
                    }
                }
                // 商品选择区
                .goodsSelect{
                    padding: 0.25rem 0;
                    li{
                        height: 1rem;
                        padding-left: 0.28rem;
                        text-align: left;
                        a{
                            padding: 0;
                            margin: 0;
                            height: 1rem;
                            line-height: 1rem;
                            font-size: 0.30rem;
                            color: #666;
                            span{
                                color: #333;
                                margin-left: 0.4rem;
                                font-weight: bold;
                            }
                        }
                    }
                    .mui-table-view-cell:after{
                        height: 0;
                    }
                }
                // 评论
                .moreComment{
                    padding: 0.4rem 0.28rem 0.25rem;
                    text-align: left;
                    color: #151515;
                    font-weight: bold;
                    font-size: 0.32rem;
                }
                .commentList{
                    padding: 0 0.28rem;
                    text-align: left;
                    .ImgUser{
                        width: 0.7rem;
                        height: 0.7rem;
                        border-radius: 50%;
                    }
                    .mui-card-header:after{
                        height: 0;
                    }
                    .nameUser{
                        span{
                            font-size: 0.28rem;
                            color: #333;
                        }
                        p{
                            font-size: 0.25rem;
                            color: #666;
                        }
                    }
                    .mui-card-content{
                        // padding-top: 0.2rem;
                        p{
                            color: #000;
                            font-size: 0.28rem;
                        }
                        .commentsImg{
                            img{
                                width: 20%;
                            }
                        }    
                    }
                }
                // 图文详情
                .whiteImg{
                    .title{
                        color: #151515;
                        font-size: 0.32rem;
                        text-align: left;
                        padding:  0.28rem;
                        font-weight: bold;
                    }
                    p{
                        margin-bottom: 0;
                    }
                    .imgDiv img{
                        vertical-align: middle;
                        width: 100%;
                    }
                }
        
            }
        }
        // 商品列表
        .list-goods{
            margin-bottom: 1rem;
        }
        // 底部购物车
        .footer{
            width: 100%;
            height: 1rem;
            position: fixed;
            bottom: 0;left: 0;
            background: #fff;
            img{
                float: left;
                width: .62rem;
                height:.56rem;
                margin: .22rem 0 0 .32rem;
            }
            div{
                text-align: center;
                float:right;
                width: 2.6rem;
                height: 1rem;
                line-height: 1rem;
                color: #ffffff;
                font-size: .28rem;
                font-weight: bold;
            }
            div:nth-child(2){
                background: #ff2400;
            }
            div:nth-child(3){
                background: #333;
            }
        }
        // 选择属性模态框
        .picture{
            .foot{
                margin: 0;
                background-color: #ff2323;
                .mui-table-view-cell{
                    a{
                        display: block;
                        height: 50px;
                        line-height: 50px;
                        font-size: 0.32rem;
                        margin: 0;
                        b{
                            color: #fff;
                            font-weight: normal;
                        }
                    }
                } 
            }
            .selectModel{
                text-align: left;
                padding: 0.25rem 0.28rem;
                background-color: #fff;
                width: 100%;
                height: 9rem;
                .infoDiv{
                    position: relative;
                    border-bottom: 1px solid #dcdcdc;
                    .infoImg{
                        position: absolute;
                        top: -0.6rem;
                        width: 1.8rem;
                        height: 2rem;
                        img{
                            max-width: 100%;
                            height: 100%;
                        }
                    }
                    .info{
                        padding-left: 2rem;
                        h4{
                            color: #151515;
                        }
                        a{
                            position: absolute;
                            right: 0;
                            top: 0;
                            span{
                                color: #151515;
                                font-size: 40px;
                            }
                        }
                        p{
                            margin-bottom: 0;
                            color: #333;
                            padding:  0;
                            span{
                                color: #151515;
                            }
                        }
                        .kucun{
                            padding: 0.28rem 0 0;
                            margin-bottom: 0;
                        }
                    }

                }
                .title{
                    color: #151515;
                    font-size: 0.32rem;
                    font-weight: bold;
                    margin-bottom: 0.3rem;
                }
                // 选择规格
                .selectGui{
                    margin-top: 0.2rem;
                    input {
                        display: none;
                    }
        
                    input[type="radio"]+label {
                        /* 默认label的样式 */
                        /* content: "\a0"; */
                        display: inline-block;
                        padding: 0.05rem 0.2rem;
                        margin-left: 0.3rem;
                        color: #666;
                        border: 1px solid #666;
                        border-radius: 0.3rem;
                    }
                    input[type="radio"]:checked+label {
                        /* 当点击label的时候背景颜色发生改变 */
                        border: 1px solid  @color;
                        color: @color;
                    }
                    .row {
                        display: inline-block;
                        margin-bottom: 0.15rem;
                    }
                }
                // 选择数量
                .numBox{
                    margin-top: 0.8rem;
                }
            }
        }
   }
    
</style>