<template>
    <div class="combinaInfo">
        <header id="header" class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">组合详情</h1>
		</header>
        <div class="nui-content">
            <div class="mui-card">
                <div class="top">
                    <h4>{{ groupData.group_name }}</h4>
                    <ul class="mui-clearfix" v-if="groupData.is_given == 0">
                        <li>单笔组合数量不超过{{ groupData.ratio }}件</li>
                        <li>限购2项单品</li>
                        <li>每项单品限购10件</li>
                    </ul>
                </div>
                <div class="content"  v-for="item in groupDataGoods" :key="item.index">
                    <p class="countP" v-if="item.group_status == 1">必选商品 此板块商品总数量不大于{{ item.group_num }}件</p>
                    <p class="countP" v-else-if="item.group_status == 2">选买商品 此板块单品种类不少于{{ item.type_num }}种</p>
                    <div class="contentList" v-for="list in item.goods" :key="list.product_id">
                        <img class="ListImg" :src="list.thumb" alt="">
                        <div class="listInfo">                         
                            <h5>{{ list.title }}</h5>  
                            <p class="specifi">规格: {{ list.guige }}</p>
                            <div class="listSelect">
                                <span class="price">￥<b>{{ list.price }}</b></span>
                                <info-numbox @getFourCount="getSelectCount" :min='list.min' :initcount="$store.getters.getFourCombationnum[item.id]"  :max="list.max" :goodsId="list.product_id"></info-numbox>
                            </div>    
                        </div>
                    </div>
                </div>
                <!-- 组数和件数 -->
                <div class="gropsDiv">
                    <span class="num">共计: {{ $store.getters.getAllCombationCountB.count }}件</span>
                    <div class="numBox">
                        <span>组数:</span>
                        <commation-numbox @getcount="getZcount" :goodsid="groupData.group_id"></commation-numbox>
                    </div>
                </div>
            </div>
            <!-- 赠品 -->
            <div class="mui-card">
                <h4 class="giftTitle">赠品 <span>若对赠品有特殊要求，请添加备注</span></h4>
                <!-- 多个选择 -->
                <div class="giftInfo" v-for="(gift,index) in groupDataGift" :key="gift.gift_id">
                    <div class="mui-input-row mui-checkbox mui-left">
                        <label></label>
                        <input name="checkbox" value="Item 1" type="checkbox" v-model="gift.checked" v-on:tap="choose(index)">
                    </div>
                    <img :src="gift.thumb" alt="">
                    <div class="info">
                        <h3 class="mui-ellipsis-2">{{ gift.title }}</h3>
                        <div class="price-num">
                            <span>￥{{ gift.price }}</span>
                            <div class="mui-pull-right">
                                <combation-gift-box  :max="groupCount"  :goodsid="gift.gift_id"></combation-gift-box>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 备注 -->
            <div class="mui-card">
                <div class="remarks">
                    <label>备注</label>
                    <input type="text"  v-model="conment">
                    <img src="../../../../assets/images/CouldEnter/Active/beizhu.png" alt="">
                </div>
            </div>
        </div>
        <!-- 结算区域 -->
        <div class="settlement">
            <span class="moneyAll">合计: ￥<span ref="priceTotal">{{ $store.getters.getAllCombationCountB.amount | strip}}</span></span>
            <span class="submitOrder"  @tap="submitCombinationOrder">提交订单</span>
        </div>
    </div>
</template>

<script>
    import mui from '../../../../../static/mui/js/mui.min.js'
    import InfoNumbox from '../../../../components/numBox/combinationNumboxB.vue'
    import commationNumbox from '../../../../components/numBox/combinationNumBox.vue'
    import combationGiftBox from '../../../../components/numBox/combinationGiftbox.vue'
    import { b2bCombinationAcctiveInfo } from '../../../../api/index.js'
    export default {
        inject :['reload'],
        data() {
            return {
                groupId: this.$route.query.id,
                groupType: this.$route.query.groupType,//组合类型
                groupData: [],//组合数据列表
                groupDataGoods:[],//组合数据商品
                groupDataGift:[],//组合数据赠品
                param:1,//赠品默认选中第一个
                selectedCount: 1 , //保存用户选中的商品数量，默认，用户买一个
                groupCount: 1, //组数数量，默认为1
                conment:'',//备注
                brandMemberId:'',// 品牌商id
                brandPosId:'',// 业务员id
            }
        },
        components:{
            InfoNumbox,
            commationNumbox,
            combationGiftBox
        },
        created(){
            this.getGroupData()//从后台获取数据
        },
        methods:{
            // 将子组件选中的商品数量传递给父组件的时候，把选中的值保存到data上。
            getSelectCount(count){
               this.selectedCount = count; 
            },
            getZcount(count){
               this.groupCount = count; 
               //当一组的数量超过ratio值时
                let everyGroupCount = this.$store.getters.getAllCombationCountB.everycount
                if(everyGroupCount !== this.groupData.ratio){
                    mui.toast('一组的商品数量为'+this.groupData.ratio+'件',{ duration:2000 })
                    //刷新页面--暂定
                    this.reload()//刷新页面
                }else{
                    this.groupCount = count;
                }

            },
            // 获取数据列表
            getGroupData(){
                let params = { group_id : this.groupId }
                b2bCombinationAcctiveInfo(params).then(res=>{
                    this.groupData = res.data
                    this.groupDataGoods = res.data.goods
                    this.groupDataGift = res.data.gift
                    this.brandMemberId = this.groupData.brand_member_id
                    this.brandPosId = this.groupData.brand_member_pos_id
                    console.log(this.groupDataGoods)
                    //向vuex仓库存储值
                    this.$store.commit('giveB2BcombinationData', this.groupDataGoods);
                    this.$store.commit('giveB2BGroupCount', this.groupCount);
                    this.$store.commit('addGiftCombination', this.groupDataGift);
                })
            },
            // 单个选择--赠品选择
            choose(index){
                this.groupDataGift[index]['checked'] = !this.groupDataGift[index]['checked'];
            },
            // 提交订单
            submitCombinationOrder(){
                // 新建一个新的对象用来存储用户选中的商品
                let submitGoods = [];
                // 从vuex中拿到修改的商品
                let goods = this.$store.getters.getFourcombationGoods
                // 循环商品
                goods.forEach(item => {
                    if(item.group_status == 1){
                        // 必买商品
                        item.goods.forEach(list=>{
                            let listCount = 0 //一个必买组内的商品的总数量
                            listCount += list.count
                            if( parseInt(list.min) <= listCount  && listCount < parseInt(item.group_num)){ //必买块内商品的数量要和限制数量group_num 保持一致
                                submitGoods.push(list)// 将数量大于0的数据存入新的对象中
                            }else{
                                mui.toast('必买商品组总数量为'+item.group_num+'件',{ duration:3000 })
                                // 暂定刷新
                                this.reload()//刷新页面
                            }
                        })
                    }
                    if(item.group_status == 2){
                        //限制种类--type_num:必买几种最小限制
                        item.goods.forEach(list=>{
                            let typeList = []
                            if(list.count > 0){
                                typeList.push(list)
                                if( typeList.length >= parseInt(item.type_num) ){
                                    submitGoods.push(list)
                                }else{
                                    mui.toast('此商品板块单品种类不低于'+item.type_num+'件',{ duration:2000 })
                                }
                            }
                        })
                    }
                    
                });
                console.log(submitGoods)
                
                if(submitGoods.length !== 0 ){
                    // 赠品--当选择了商品再判断赠品数
                    // 新建一个新的对象用来存储用户选中的赠品
                    let submitGift = [];
                    // 从vuex中拿到修改的赠品
                    let giftData = this.$store.getters.getGiftCombination
                    let giftAllNum = 0  // 获取赠品的总数量
                    giftData.forEach((item,index)=>{
                        if(item.checked && item.count > 0 ){
                            submitGift.push(item)
                            giftAllNum += item.count 
                        }
                    })

                    let priceTotal = this.$refs.priceTotal.innerText;//接收价格
                    if(giftAllNum == this.groupCount){
                        let submitGoodsB = JSON.stringify(submitGoods);
                        let submitGiftB = JSON.stringify(submitGift);
                        let params = {
                            submitGoods:submitGoodsB,//商品数组
                            submitGift: submitGiftB,//赠品数组
                            groupCount: this.groupCount,  //组数
                            conment: this.conment,  //备注
                            groupId: this.groupId,//组合活动id
                            brandMemberId : this.brandMemberId,
                            brandPosId : this.brandPosId,
                            priceTotal: priceTotal,//总价格
                        }
                        console.log(params)
                        //跳转到组合活动订单提交页面
                        this.$router.push({path:'/CombinationListB/CombinationBuyB',query: params })
                    }else{
                        mui.toast('请选择赠品数量与组数一致',{ duration:1000 })
                    }
                }else{
                    mui.toast('请选择购买商品',{ duration:500 })
                };    
            }
        },
    }
</script>

<style scoped lang="less">
    .combinaInfo{
        position: relative;
    }
    #header{
        height: 50px;
        background-color: #f33026;
        .mui-title{
            height: 50px;
            line-height: 50px;
            font-weight: bold;
            color: #fff;
        }
        .mui-action-back{
            font-size: 30px;
            color: #fff;
        }
        
    }
    ul,li{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .nui-content{
        padding-top: 50px;
        padding-bottom: 1.2rem;
        .mui-card{
            text-align: left;
            padding: 15px;
            // 头部
            .top{
                h4{
                    color: #222;
                    font-size: 0.36rem;
                    line-height: 0.5rem;
                }
                ul{
                    width: 100%;
                    li{
                        float: left;
                        // width: 50%;
                        color: #777;
                        margin-right: 0.5rem;
                        font-size: 0.25rem;
                    }
                    li::before{
                        content: ""; 
                        display: inline-block; 
                        width: 0.15rem;
                        height: 0.15rem;
                        border-radius: 0.05rem;
                        background-color: #f84528;
                        margin-right: 0.1rem;
                    }
                }
            }
            // 主体列表
            .content{
                margin-top: 0.3rem;
                border-top: 1px solid #ececec;
                border-bottom: 1px solid #ececec;
                padding: 0;
                .countP{
                    margin-bottom: 0;
                    padding-top: 0.2rem;
                    color: #151515;
                }
                .contentList{
                    padding: 0.3rem 0;
                    display: flex;
                    align-items: center;
                    // 图片
                    .ListImg{
                        width: 20%;
                        height: 1.3rem;
                        margin-right: 0.3rem;
                    }
                    // 信息
                    .listInfo{
                        width: 80%;
                        h5{
                            font-size: 0.32rem;
                            color: #222;
                            span{
                                color:#fd7359;
                                font-size: 0.2rem;
                                border: 1px solid #fd7359;
                                padding: 0.02rem 0.1rem;
                                border-radius: 0.05rem;
                                background-color: rgba(253,115,89,0.2);
                            }
                        }
                        // 规格
                        .specifi{
                            color: #999;
                            font-size: 0.25rem;
                            margin-bottom: 0;
                        }
                        .listSelect{
                            display: flex;
                            align-items: flex-end;
                            justify-content: space-between;
                            .price{
                                color: #e51616;
                                font-size: 0.25rem;
                                b{
                                    font-size: 0.32rem;
                                }
                            
                            }
                        }
                    }
                }
            }
            // 组数和件数
            .gropsDiv{
                padding: 0.4rem 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .num{
                    color: #333;
                    font-size: 0.32rem;
                    font-weight: bold;
                }
                .numBox{
                    span{
                        color: #666;
                        font-size: 0.28rem;
                    }
                }
            }

        }
    }
    // 赠品
    .mui-card{
        .giftTitle{
            font-size: 0.3rem;
            color: #222;
            span{
                color: #e09f0d;
                font-size: 0.2rem;
                background-color: rgba(254,182,38,0.2);
                padding: 0.02rem 0.1rem;
                border-radius: 0.05rem;
                border: 1px solid #e09f0d;
            }
        }
        .giftInfo{
            padding: 0.25rem 0 0.2rem;
            display: flex;
            align-items: center;
            img{
                width: 1rem;
                height: 1rem;
                margin: 0 0.2rem ;
            }
            .info{
                width: 100%;
                h3{
                    color: #222;
                    font-size: 0.3rem;
                    margin-bottom: 0;
                    font-weight: normal;
                }
                .price-num{
                    color: #e51616;
                    font-size: 0.28rem;
                    margin-bottom: 0;
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
            }
            input{
                position: absolute;
                top: 0;
                left: 0;
                display: inline-block;
                width: 28px;
                height: 26px;  
                -webkit-user-select: auto;
            }
            input[type=checkbox]:checked:before{
                color: #ff2400;
                font-size: 26px;
            }
            input[type=checkbox]:before{
                font-size: 26px;
            }
        }
    }
    // 备注
    .mui-card{
        .remarks{
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            position: relative;
            label{
                color: #222;
                font-size: 0.3rem;
            }
            input{
                width: 90%;
               color: #666;
               font-size: 0.28rem;
               padding-right: 0.5rem;
               margin-bottom: 0;
               border: 0;
            }
            img{
                width: 0.5rem;
                position: absolute;
                top: 0.1rem;
                right: 0;
            }
        }
    }

    // 结算
    .settlement{
        width: 100%;
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        
        .moneyAll{
            width: 58%;
            color: #222;
            font-size: 0.32rem;
            font-weight: bold;
            text-align: left;
            padding-left: 15px;
            display: inline-block;
        }
        .submitOrder{
            display: inline-block;
            width: 40%;
            background-color:#f33026;
            color: #fff;
            font-size: 0.32rem;
            font-weight: bold;
        }
    }
</style>