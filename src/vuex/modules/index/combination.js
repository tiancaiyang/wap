// 大首页组合活动排除类型4的
var combationData =[];
var groupNum = [];
var giftData = [];
const combination = {
    state :{
        combationData: combationData,
        groupNum: groupNum,
        giftData: giftData,
    },
    mutations:{
        // 1、将组合商品中的数据保存在state上
        addToCombination(state,goodsCombationInfo){
            state.combationData = goodsCombationInfo
        },
        // 将组数传递过来
        addToCombinationZ(state,goodsNum){
            state.groupNum =  goodsNum
        },
        //2、 修改了组合商品的数量
        updatecombationCount(state, goodsCombationInfo){
            // console.log(goodsCombationInfo)
            state.combationData.some(item=>{
                if(item.product_id == goodsCombationInfo.id){
                    item.count = parseInt(goodsCombationInfo.count);
                    return true;
                }
            })
        },
        // 3、修改组数
        updatGroupNumB(state,goodsInfo){
            state.groupNum = goodsInfo.count;
        },
        // 4、将赠品的数据保存在state上
        addGiftCombination(state,goodsCombationInfo){
            state.giftData = goodsCombationInfo
        },
        //5、修改赠品
        updatGiftNUmB(state,goodsInfo){
            state.giftData.some(item=>{
                if(item.gift_id == goodsInfo.id){
                    item.count = parseInt(goodsInfo.count);
                    return true;
                }
            })
        }
    },
    getters:{
        // 设置一个对象用来保存商品对应的id与其数量
        getcombationnum(state){
            var o = {};
            state.combationData.forEach(item=>{
                o[item.product_id] = item.count;
            })
            return o;
        },
        // 设置一个对象用来保存商品对应的id与其数量
        getcombationGoods(state){
            var o = {};
            o = state.combationData
            return o;
        },
        //设置一个对象用来保存赠品对应的id与其数量
        getGiftCombination(state){
            var o = {};
            o = state.giftData
            return o;
        },
        // 计算组合商品的总数量
        getAllCombationCount(state){
            var o = {
                count: 0,
                amount: 0,
                everyGroupCount:0,
            };
            state.combationData.forEach(item => {
                o.count += item.count*state.groupNum
                o.amount += (item.price * item.count)*state.groupNum
                o.everyGroupCount += item.count
            });
            return o;
        }
    }
}
export default combination