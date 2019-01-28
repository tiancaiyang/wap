<template>
    <div>
        <!--头部  -->
        <header id="header" class="mui-bar mui-bar-nav header">
            <h1 class="mui-title">购物车</h1>
            <div class="complete mui-pull-right">
                <img src="../../../assets/images/b2c/car/write.png"  class="write" v-show="trueactive" alt=""  @tap="write">
                <span v-show="!trueactive" @tap="write">完成</span>
            </div>
        </header>
        <!-- 结算页面 -->
        <div class="mui-content">
            <div class="everyShop"   v-for="(item, index) in goodsCarList" :key="item.shop_id">
                <div class="listTop mui-clearfix">
                    <!-- 店铺全选 -->
                    <div class="mui-input-row mui-checkbox mui-left mui-pull-left"  >
                        <label></label>
                        <input name="checkbox" value="Item 1" type="checkbox"  v-on:click="chooseShopGoods(index)" v-model="item.checked" >
                    </div>
                    <div class="shop">
                        <img :src=" item.head_img " alt="">
                        <span class="shopName">{{ item.shop_name }}</span>
                    </div>
                </div>
                <ul id="OA_task_1" class="mui-table-view">
                    <li class="mui-table-view-cell"  v-for="(data,datatIndex) in item.goods" :key="data.datatIndex">
                        <div class="mui-slider-right mui-disabled">
                            <a class="mui-btn mui-btn-red" @click.prevent="removeList(index, datatIndex,data.cart_id)">删除</a>
                        </div>
                        <div class="mui-slider-handle">
                            <div class="listInfo">
                                <!-- 单个选择 -->
                                <div class="mui-input-row mui-checkbox mui-left" >
                                    <label></label>
                                    <input name="checkbox" value="Item 1" type="checkbox" v-on:click="choose(index, datatIndex)" v-model="data.checked">
                                </div>
                                <img :src="data.thumb" alt="">
                                <div class="info">
                                    <router-link  :to="'/shopdetailC/' + data.product_id" tag="h3" class="mui-ellipsis-2">{{ data.title }}</router-link>
                                    <div class="price-num">
                                        <span>￥{{ data.price }}</span>
                                        <span v-if='data.options' class="secOption">{{ data.options.product_attr }}</span>
                                        <car-num-box :initcount="data.num" :goodsid="data.product_id" :cartId ="data.cart_id"></car-num-box>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul> 
            </div>      
        </div>
        <!-- 全选区域 -->
        <div class="allchoose" v-if="!goodsCarList.length == 0">
                <div class="mui-input-row mui-checkbox mui-left">
                    <label></label>
                    <input name="checkbox" value="Item 1" type="checkbox" v-on:click="chooseAllGoods()"   v-model="allChecked">
                </div>
             <span class="grey">全选</span>
             <span class="red"  v-show="trueactive">￥<i>{{ $store.getters.priceAllC.amount | strip }}</i></span>
             <div class="order" v-show="trueactive" @click="sumbitCartBuy">结算</div>
             <div class="order" v-show="!trueactive" @click="removeAll">删除选中</div>
        </div>
        <null-car v-if="goodsCarList.length == 0"></null-car>
        <!-- 底部 -->
        <Tabbarc></Tabbarc>
    </div>
</template>

<script>
    import Tabbarc from "../../../components/Tabbarc.vue"
    import CarNumBox from '../../../components/GoodsCarNumBoxC.vue'
    import NullCar from '../../../components/nullCar.vue'
    import mui from '../../../../static/mui/js/mui.min.js'
    import { b2ccar,b2cCarDel,b2cCarDelAll } from '../../../api/index.js'
    export default {
        inject :['reload'],
        name: 'car',
        components:{
            Tabbarc,
            CarNumBox,
            NullCar
        },
        data() {
            return {
                trueactive:true,
                goodsCarList:[],// 购物车数据列表
                allChecked : false,
                totalMoney:0, //商品总价格
            }               
        },
        created(){
            this.getCarList();
        },
        mounted(){
            mui('.mui-input-row input').input();
        },
        methods:{
            // 编辑按钮切换
            write(){
               this.trueactive=!this.trueactive;
            },
            // 获取购物车列表
            getCarList(){
                b2ccar().then(res=>{
                    this.goodsCarList = res.data;
                    this.$store.commit("addB2cCar",res.data)
                    console.log(this.goodsCarList)
                })
            },
            // 删除商品
            removeList(objIndex, index,cartid){
                var that = this;
                let params = { cart_id : cartid }
                b2cCarDel(params).then(res=>{
                    // 删除之后刷新页面
                    that.goodsCarList[objIndex]['goods'].splice(index, 1);
                    if(that.goodsCarList[objIndex]['goods'].length == 0){
                        //全部删除  
                        that.goodsCarList.splice(objIndex, 1);             
                    }
                })
            },
            removeAll(){
                // 删除了全部的 ---》删除选中的
                var that = this;
                var cid = [];
                var cart_id = '';
                for( var i = 0, len = that.goodsCarList.length; i < len; i++ ) {
                    var list = that.goodsCarList[i]['goods'];
                    list.forEach(function(item, index, arr) {
                        if ( list[index]['checked'] ) {
                            cid.push(item.cart_id)
                            cart_id = cid.join(',')
                        }
                    });
                }
                let param = { cart_id : cart_id }
                mui.confirm('确定删除选中？', function(e) {
                    if (e.index == 1) {
                        // b2cCarDelAll().then(res=>{
                        //     that.goodsCarList.length = 0;
                        //     that.trueactive = !that.trueactive;
                        //     that.allChecked = false;
                        // })
                        if(cart_id.length == 0){
                            mui.toast('请选择要删除的商品')
                        }else{
                            b2cCarDel(param).then(res=>{
                                if(res.code == 0){
                                    mui.toast('删除成功',{ duration:2000 });
                                    that.reload()
                                }  
                            })
                        }
                    } else {
                            
                    }
                       
				}); 
            },
            // 全部商品全选
            chooseAllGoods() {
                var flag = true;
                if ( this.allChecked ) {
                    flag = false;
                }
                for ( var i = 0, len = this.goodsCarList.length; i < len; i++ ) {
                    this.goodsCarList[i]['checked'] = flag;
                    var list = this.goodsCarList[i]['goods'];
                    for ( var k = 0, len1 = list.length; k < len1; k++ ) {
                        list[k]['checked'] = flag;
                    }
                }
                this.allChecked = !this.allChecked;
            },
            // 每个店铺全选
            chooseShopGoods( index) {
                console.log(this.goodsCarList)
                var list = this.goodsCarList[index]['goods'],
                    len = list.length;
                if ( this.goodsCarList[index]['checked'] ) {
                    for (var i = 0; i < len; i++ ) {
                        list[i]['checked'] = false;
                    }
                } else {
                    for (var i = 0; i < len; i++ ) {
                        list[i]['checked'] = true;
                    }
                }
                this.goodsCarList[index]['checked'] = !this.goodsCarList[index]['checked'];
                // 判断是否选择所有商品的全选
                this.isChooseAll();
            },
            // 单个选择
            choose( index1, index) {
                var list = this.goodsCarList[index1]['goods'],
                    len = list.length;
                if ( list[index]['checked'] ) {
                    this.goodsCarList[index1]['checked'] = false;
                    this.allChecked = false;
                    list[index]['checked'] = !list[index]['checked'];
                } else {
                    list[index]['checked'] = !list[index]['checked'];
                    // 判断是否选择当前店铺的全选
                    var flag = true;
                    for (var i = 0; i < len; i++ ) {
                        if ( list[i]['checked'] == false ) {
                            flag = false;
                            break;
                        }
                    }
                    flag == true ? this.goodsCarList[index1]['checked'] = true : this.goodsCarList[index1]['checked'] = false;
                }
            
                // 判断是否选择所有商品的全选
                this.isChooseAll();
            },
            // 判断是否选择所有商品的全选
            isChooseAll() {
                var flag1 = true;
                for ( var i = 0, len = this.goodsCarList.length; i < len; i++ ) {
                    if ( this.goodsCarList[i]['checked'] == false ) {
                        flag1 = false;
                        break;
                    }
                }
                flag1 == true ? this.allChecked = true : this.allChecked = false;
            },
            // 立即购买--结算
            sumbitCartBuy(){
                var that = this;
                var cid = [];
                var cart_id = '';
                for( var i = 0, len = that.goodsCarList.length; i < len; i++ ) {
                    var list = that.goodsCarList[i]['goods'];
                    list.forEach(function(item, index, arr) {
                        if ( list[index]['checked'] ) {
                            cid.push(item.cart_id)
                            cart_id = cid.join(',')
                        }
                    });
                }
                var param = { cid : cart_id }
                this.$router.push({name:'CarBuyC', query: param })
            }
        
        }
    }
</script>

<style scoped lang="less">
    //  头部
    #header{
        @headerBg: #fff;
        @headerHeight: 50px;
        background: @headerBg;
        height: @headerHeight; 
        .mui-title{
            height: 50px;
            line-height: 50px;
            font-weight: bold;
            color: #151515;
        }
        .complete{
            height: @headerHeight;
            img{
                margin-top: 25px;
                transform: translateY(-50%);
            }
            span{
                line-height: @headerHeight;
            }
            .write{
                width: .44rem;
                height: .44rem;
            }   
        }
        
    } 

    // 选择框的定位
    .mui-input-row.mui-checkbox{
        position: relative;
        width: 40px;
        height: 30px;
        label{
            padding: 0;
            position: absolute;
            top: 0;
            left: 0px;
            width: 28px;
            height: 26px;
            z-index: 2;
            pointer-events: none;
        }
        input{
            position: absolute;
            top: 0;
            left: 0!important;
            display: inline-block;
            width: 28px;
            height: 26px; 
        }
        input[type=checkbox]:checked:before{
            color: #ff2400;
            font-size: 26px;
        }
        input[type=checkbox]:before{
            font-size: 26px;
        }

    }
    // 列表页面
    .mui-content{
        padding-top: 50px!important;
        margin-bottom: 100px;
        background-color: #efefef;
        .everyShop{
             padding: 0; 
             margin-bottom: 0.2rem;
            .listTop{
                    text-align: left;
                    background-color: #f9f9f9;
                    padding:  0.28rem;
                    display: flex;
                    align-items: center;
                    .shop{
                        img{
                            width: 0.4rem;
                            vertical-align: middle;
                        }
                        .shopName{
                            color: #333;
                            font-size: 0.28rem;
                            font-weight: bold;
                        }
                    }
                    
            }
        }
        // 列表的线
        .mui-table-view:before{
            height: 0;
        }
        .mui-table-view-cell:after{
            height: 0;
        }
        .mui-table-view:after{
            height: 0;
        }
        #OA_task_1{
            .mui-table-view-cell{ 
                padding-top: 0;
                .listInfo{
                    padding: 0;
                    display: flex;
                    align-items: center;
                    img{
                        width: 1.5rem;
                        height: 1.4rem;
                        margin-right: 0.2rem;
                        margin-right: 0.25rem;
                    }
                    .info{
                        width: 100%;
                        h3{
                            color: #151515;
                            font-size: 0.28rem;
                            line-height: 1.2;
                            text-align: left;
                        }
                        .price-num{
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            span{
                                color: #ff2400;
                                font-weight: bold;
                            }
                            .secOption{
                                color: #333;
                                font-size: 0.2rem;
                            }
                        }
                    }
                }
            }
        }
    }
    //  全选
    .allchoose{
        width:100%;
        height: 1rem;
        display: flex;
        flex-direction: row;
        position: fixed;
        bottom:50px;
        background: #fff;
        padding-left: 0.28rem;
        align-items: center;
        justify-content: space-between;
        span{
            flex: 1
        }
        .grey{
            font-size: .28rem;
            color: #666666;
            font-weight: bold;
            text-align: left;
        }
        .red{
                font-style: normal;
                color: #ff2400;
                font-size: .36rem;
                font-weight:bold; 
                text-align: right;
                i{
                    font-style: normal;
                }
        }
        .order{
            width: 1.6rem;
            height: .7rem;
            background: #ff2400;
            border-radius:.05rem; 
            text-align: center;
            font-size: .28rem;
            color: #ffffff;
            font-weight: bold;
            line-height: .7rem;
            margin-right: .3rem;
            margin-left: .8rem;
        }
    }



</style>