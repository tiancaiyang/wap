// b2b购物车
var carb = [];
const carB = {
    state :{
        carb: carb
    },
    mutations:{
        // 商品添加到购物车
        addB2bCar(state, goodsInfo){
            var flag = true
            if (flag) {
                state.carb = goodsInfo;
            }
        },
        // 修改购物车数量
        updatecar(state,goodsCount){
            for( var i = 0, len = state.carb.length; i < len; i++ ) {
                var list = state.carb[i]['goods'];
                list.forEach(function(item, index, arr) {
                    if(item.product_id == goodsCount.id){
                        item.num = parseInt(goodsCount.count);
                        return true
                    }
                });
            }
        }

    },
    getters:{
        // 计算商品总价
        priceAll(state){
            var that = this;
            var o = {
                count: 0,
                amount: 0
            };
            for( var i = 0, len = state.carb.length; i < len; i++ ) {
                var list = state.carb[i]['goods'];
                list.forEach(function(item, index, arr) {
                    if ( list[index]['checked'] ) {
                        o.count += item.num;
                        o.amount += parseFloat(item.price) * parseFloat(item.num);
                    }
                });
            }
            return o;
        }
    }
}
export default carB