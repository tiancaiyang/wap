// b2b组合活动类型四的vuex价格计算
var acComB = [];
var groupNum = [];
const activeCombinationB = {
    state:{
        acComB:acComB,
        groupNum : groupNum,
    },
    mutations:{
        // 接收商品数据列表
        giveB2BcombinationData(state,goodsInfo){
            state.acComB = goodsInfo;
            // console.log(state.acComB)
        },
        giveB2BGroupCount(state,count){
            state.groupNum = count
        },
        //2、 修改了组合商品的数量
        updatecombationCountB(state, goodsInfo){
            state.acComB.some(item=>{
                item.goods.some(data=>{
                    if(data.product_id == goodsInfo.id){
                        data.count = parseInt(goodsInfo.count);
                        return true;
                    }                    
                })
            })
        },
        // 3、修改组合商品的组数数量  
        updatGroupNumB(state,goodsInfo){
            state.groupNum = goodsInfo.count;
        },
    },
    getters:{
        // 设置一个对象用来保存商品对应的id与其数量
        getFourCombationnum(state){
            var o = {};
            state.acComB.forEach(item=>{
                o[item.product_id] = item.count;
            })
            return o;
        },
        // 设置一个对象用来保存商品对应的id与其数量
        getFourcombationGoods(state){
            var o = {};
            o = state.acComB
            return o;
        },
        // 组数数量
        getGroupCount(state){
            var o = state.groupNum
            return o;
        },
        // 计算组合商品的总数量
        getAllCombationCountB(state){
            var o = {
                count: 0,
                amount: 0,
                everycount:0,
            };
            state.acComB.forEach(item => {
                item.goods.forEach(data =>{
                    o.count += data.count* state.groupNum
                    o.amount += (data.price * data.count)*state.groupNum
                    o.everycount += data.count
                })
            });
            return o;
        }
    }
}
export default activeCombinationB