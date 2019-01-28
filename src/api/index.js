import axios from 'axios'
import qs from 'qs'
import router from '../router'
const baseUrl = 'http://sapi.silutianyu.com/'
axios.defaults.baseURL = baseUrl
// 初始化默认post header
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [params => qs.stringify(params)];
// 添加请求拦截器
axios.interceptors.request.use(function(config){
    let token = localStorage.getItem('User-Token')
    // let token = '429850dcabc3084439a6ecc0e3b0c294';
    if(token){
        config.headers['User-Token'] = token
    }
    return config
},function(error){
    return Promise.reject(error)
})
// token失效时的拦截器
axios.interceptors.response.use(
    response => {
        // 如果token失效了
        if(response.data.code == 3){
            localStorage.clear();
            router.currentRoute.path !== 'login' &&
            router.replace({
                path: 'login',
                query: { redirect: router.currentRoute.path },
            })
        }
      return response
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // 401 清除token信息并跳转到登录页面
            localStorage.clear();
            // store.commit(types.LOGOUT)
            // 只有在当前路由不是登录页面才跳转
            router.currentRoute.path !== 'login' &&
              router.replace({
                path: 'login',
                query: { redirect: router.currentRoute.path },
              })
        }
      }
      // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
      return Promise.reject(error.response.data)
    },
)

// 登录验证
export const checkUser = params=>{
    return axios.post('login/user',params,
    {transformRequest: [function (params) {
        let ret = ''
        for (let it in params) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
        }
        return ret
      }]}).then(res=>res.data)
}
// 获取用户信息的数据接口
export const userInfo = params=>{
    return axios.post('login/getuserinfo',params).then(res=>res.data)
}
// b2b
    // b2b首页
    export const b2bHome = params=>{
        return axios.post('home/business').then(res=>res.data)
    }
    // b2b搜索
    export const b2bSearch = params=>{
        return axios.post('home/businessSearch',params).then(res=>res.data)
    }
    // b2b秒杀列表
    export const b2bTimeLimit = params=>{
        return axios.post('filterProduct/productseckill').then(res=>res.data)
    }
    // b2b组合活动---头部分类
    export const b2bCombinationGetcat = params=>{
        return axios.post('filterProduct/getcat').then(res=>res.data)
    }
    // b2b组合列表
    export const b2bCombinationAcctive = params=>{
        return axios.post('filterProduct/combinationactivity',params).then(res=>res.data)
    }
    // b2b组合活动详情
    export const b2bCombinationAcctiveInfo = params=>{
        return axios.post('filterProduct/getgroup',params).then(res=>res.data)
    }
    // b2b组合提交订单
    export const b2bCombinationOrder = params=>{
        return axios.post('Submit/businessGroupSubmitOrder',params).then(res=>res.data)
    }
    // b2b好货特卖
    export const b2bSaleActivity = params=>{
        return axios.post('filterProduct/saleproductlist').then(res=>res.data)
    }
    // b2b相关推荐列表
    export const b2bRecommentList = params=>{
        return axios.post('FilterProduct/businessProductList').then(res=>res.data)
    }
    // b2b商品详情
    export const b2bshopInfo = params=>{
        return axios.post('product/businessproductview',params).then(res=>res.data)
    }
     // b2b商品--立即购买
     export const b2bSubmitOrder = params=>{
        return axios.post('Submit/businessSubmitOrder',params).then(res=>res.data)
    }
    // b2b商品详情收藏
    export const b2bCollecst = params=>{
        return axios.post('product/productCollect',params).then(res=>res.data)
    }
    // b2b加入购物车
    export const b2bAddCart = params=>{
        return axios.post('bcart/addcart',params).then(res=>res.data)
    }
    // b2b购物车--结算到确认订单
    export const b2bConfirmOrder = params=>{
        return axios.post('Confirm/businessCartConfirmOrder',params).then(res=>res.data)
    }
    // b2b 购物车--立即购买--确认订单
    export const b2bSubmitCart = params=>{
        return axios.post('Submit/businessCartSubmitOrder',params).then(res=>res.data)
    }
    // b2b分类页面
    export const b2baccress = params=>{
        return axios.post('cat/businesscat').then(res=>res.data)
    }
    export const b2baccresscategory = params=>{
        return axios.post('cat/businesscategory',params).then(res=>res.data)
    }
    // b2b分类-品牌头部导航列表
    export const b2baccressList = params=>{
        return axios.post('FilterProduct/businessBrandCat',params).then(res=>res.data)
    }
    // b2b分类-品牌产品列表
    export const b2baccressProductList = params=>{
        return axios.post('FilterProduct/businessBrandCatProductList',params).then(res=>res.data)
    }
    // b2b分类-品牌商商品列表
    export const b2bBrandNameList = params=>{
        return axios.post('FilterProduct/businessMemberProductList',params).then(res=>res.data)
    }
    // b2b购物车---获取页面
    export const b2bcar = params=>{
        return axios.post('bcart/getcart').then(res=>res.data)
    }
    // b2b购物车---修改购物车商品数量
    export const b2bcaredit = params=>{
        return axios.post('bcart/editcart',params).then(res=>res.data)
    }
    // b2b购物车---删除商品
    export const b2bCarDel = params=>{
        return axios.post('bcart/delcart',params).then(res=>res.data)
    }
    // b2b购物车---删除全部
    export const b2bCarDelAll = params=>{
        return axios.post('bcart/delallcart').then(res=>res.data)
    }
    // b2b购物车--小红点
    export const b2bCartRedPoint = params=>{
        return axios.post('Bcart/cart',params).then(res=>res.data)
    }
    // b2b订单列表
    export const b2bOrder =  params=>{
        return axios.post('order/getList',params).then(res=>res.data)
    }
    // 订单 详情
    export const b2bOrderInfo =  params=>{
        return axios.post('order/getdetail',params).then(res=>res.data)
    }
    // 订单---物流详情
    export const orderLogisticsDetail =  params=>{
        return axios.post('order/getpersonaldetaillist',params).then(res=>res.data)
    }
    // b2b订单 确认收货
    export const b2bOrderSure =  params=>{
        return axios.post('order/confirm',params).then(res=>res.data)
    }
    // b2b订单 取消订单
    export const b2bOrderConcal =  params=>{
        return axios.post('order/cancel',params).then(res=>res.data)
    }
    // b2b订单 删除订单
    export const b2bOrderDelete =  params=>{
        return axios.post('order/deleteOne',params).then(res=>res.data)
    }
    // b2b订单 提醒发货
    export const b2bOrderWarn =  params=>{
        return axios.post('order/warn',params).then(res=>res.data)
    }
    // b2b订单 申请退款
    export const b2bOrderRefund =  params=>{
        return axios.post('order/applyRefund',params).then(res=>res.data)
    }
    // b2b订单---评价晒单列表
    export const b2bEvaluationOrder =  params=>{
        return axios.post('assess/getbassess',params).then(res=>res.data)
    }
    // b2b商品评价---全部评价
    export const b2bEvaluationAll =  params=>{
        return axios.post('assess/listbforproduct',params).then(res=>res.data)
    }
    // b2b订单 支付宝支付
    export const b2bAliPay =  params=>{
        return axios.post('pay/aliPayWap',params).then(res=>res.data)
    }
    // b2b订单 微信支付
    export const b2bWechatPay =  params=>{
        return axios.post('payorder/wxhpay',params).then(res=>res.data)
    }

    // b2b/b2c公用订单 申请退款--1B2C
    export const CloseReturnShop =  params=>{
        return axios.post('order/refundDetailclose',params).then(res=>res.data)
    }
    // b2b/b2c公用订单 数字角标--0B1C
    export const orderNum =  params=>{
        return axios.post('order/getordernum',params).then(res=>res.data)
    }
//b2c
    // b2c首页
    export const b2cHome = params=>{
        return axios.post('home/personal').then(res=>res.data)
    }
     // b2c分类页面
    export const b2caccress = params=>{
        return axios.post('cat/personalcat').then(res=>res.data)
    }
    export const b2caccresscategory = params=>{
        return axios.post('cat/personalcategory',params).then(res=>res.data)
    }
    // b2c分类-品牌头部导航列表
    export const b2caccressList = params=>{
        return axios.post('FilterProduct/personalBrandCat',params).then(res=>res.data)
    }
    // b2c分类-品牌产品列表
    export const b2caccressProductList = params=>{
        return axios.post('FilterProduct/personalBrandCatProductList',params).then(res=>res.data)
    }
    // b2c分类-品牌商商品列表
    export const b2cBrandNameList = params=>{
        return axios.post('FilterProduct/personalMemberProductList',params).then(res=>res.data)
    }
    // b2c商品详情
    export const b2cShopdetail = params=>{
        return axios.post('product/personalProductView',params).then(res=>res.data)
    }
    // b2c商品详情收藏
    export const b2cCollecst = params=>{
        return axios.post('product/productCollect',params).then(res=>res.data)
    }
    // b2c加入购物车
    export const b2cAddCart = params=>{
        return axios.post('ccart/addcart',params).then(res=>res.data)
    }
    // b2c商品详情--立即购买
    export const b2cSubmitOrder = params=>{
        return axios.post('Submit/personalSubmitOrder',params).then(res=>res.data)
    }
    // b2c商品详情--获取运费
    export const b2cTransExpenses = params=>{
        return axios.post('Confirm/confirmOrderTransExpenses',params).then(res=>res.data)
    }
    // b2c购物车---获取页面
    export const b2ccar = params=>{
        return axios.post('ccart/getcart').then(res=>res.data)
    }
    // b2c购物车---修改购物车商品数量
    export const b2ccaredit = params=>{
        return axios.post('ccart/editcart',params).then(res=>res.data)
    }
    // b2c购物车---删除商品
    export const b2cCarDel = params=>{
        return axios.post('ccart/delcart',params).then(res=>res.data)
    }
    // b2c购物车---删除全部
    export const b2cCarDelAll = params=>{
        return axios.post('ccart/delallcart').then(res=>res.data)
    }
    // b2c购物车---结算到确认订单
    export const b2cConfirmOrder = params=>{
        return axios.post('Confirm/personalCartConfirmOrder',params).then(res=>res.data)
    }
    // b2c购物车--立即购买-提交订单
    export const b2cSubmitCart = params=>{
        return axios.post('Submit/personalCartSubmitOrder',params).then(res=>res.data)
    }
    // b2c购物车--小红点
    export const b2cCartRedPoint = params=>{
        return axios.post('Ccart/cart',params).then(res=>res.data)
    }
    // b2c订单列表
    export const b2cOrder =  params=>{
        return axios.post('order/getpersonallist',params).then(res=>res.data)
    }
    // b2c商品评价---全部评价
    export const b2cEvaluationAll =  params=>{
        return axios.post('assess/listForProduct',params).then(res=>res.data)
    }
    // b2c订单---评价晒单列表
    export const b2cEvaluationOrder =  params=>{
        return axios.post('assess/listForMember',params).then(res=>res.data)
    }
    // b2c订单---评价发布
    export const b2cEvaluationAdd =  params=>{
        return axios.post('order/personalAssessAdd',params).then(res=>res.data)
    }
    // b2c订单详情
    export const b2cOrderInfo =  params=>{
        return axios.post('order/getpersonaldetail',params).then(res=>res.data)
    }
    // b2c订单---查看物流
    export const b2cOrderLogistics =  params=>{
        return axios.post('orderkd/getkdcontent',params).then(res=>res.data)
    }
    // b2c订单---退款商品列表
    export const b2cOrderReturnShopList =  params=>{
        return axios.post('order/listfororder',params).then(res=>res.data)
    }
    // b2c订单---退款提交
    export const b2cOrderReturnShop =  params=>{
        return axios.post('order/applyRefund',params).then(res=>res.data)
    }
    // b2c订单---退货退款详情
    export const b2cOrderReturnShopInfo =  params=>{
        return axios.post('order/refundDetail',params).then(res=>res.data)
    }
    // b2c订单---提交物流单号
    export const b2cOrderSubmitLogistics =  params=>{
        return axios.post('order/refundexpress',params).then(res=>res.data)
    }
    // b2c首页搜索
    export const b2cOHomeSearch =  params=>{
        return axios.post('home/personalSearch',params).then(res=>res.data)
    }

// 首页
    // 首页数据home/homePersonal
    export const IndexHome = params=>{
        return axios.post('home/homePersonal',params).then(res=>res.data)
    }
    // 首页数据home/homeBusiness
    export const IndexHomeBus = params=>{
        return axios.post('home/homeBusiness',params).then(res=>res.data)
    }
    // 大首页和b2c秒杀列表
    export const b2cTimeLimit = params=>{
        return axios.post('filterProduct/personalseckill').then(res=>res.data)
    }
    // b2b好货特卖
    export const b2cSaleActivity = params=>{
        return axios.post('filterProduct/salecproductlist').then(res=>res.data)
    }
    // 首页消息页面
    export const messageList = params=>{
        return axios.post('message/getlist').then(res=>res.data)
    }
    // 首页消息删除的单个
    export const messageDelet = params=>{
        return axios.post('message/delete',params).then(res=>res.data)
    }
    // 首页消息删除全部
    export const messageDeletAll = params=>{
        return axios.post('message/deleteAll',params).then(res=>res.data)
    }
    // 首页消息--详情
    export const messageDetail = params=>{
        return axios.post('message/getDetail',params).then(res=>res.data)
    }
    // 个人设置--收货地址
    export const IndexAddress = params=>{
        return axios.post('user/addressList').then(res=>res.data)
    }
    // 个人设置--收货地址--添加
    export const IndexAddressAdd = params=>{
        return axios.post('user/addressAdd',params).then(res=>res.data)
    }
    // 个人设置--收货地址--编辑
    export const IndexAddressEdit = params=>{
        return axios.post('user/addressedit',params).then(res=>res.data)
    }
    // 个人设置--收货地址--默认
    export const IndexAddressDefault = params=>{
        return axios.post('user/setDefault',params).then(res=>res.data)
    }
    // 个人设置--收货地址删除
    export const IndexAddressDelete = params=>{
        return axios.post('user/addressDelete',params).then(res=>res.data)
    }
    // 个人设置--修改用户名
    export const IndexUserName = params=>{
        return axios.post('user/name',params).then(res=>res.data)
    }
    // 个人设置--头像上传
    export const IndexUserHeaderImg = params=>{
        return axios.post('user/headImage', params, { headers: { 'Content-Type': 'multipart/form-data' }, transformRequest: [params => params] }).then(res=>res.data)
    }
    // 登录注册--发送验证码
    export const RegisterCode = params=>{
        return axios.post('login/code',params).then(res=>res.data)
    }
    // 登录注册--注册
    export const Register = params=>{
        return axios.post('login/register',params).then(res=>res.data)
    }
    // 登录注册--找回密码
    export const RePassword = params=>{
        return axios.post('login/repassword',params).then(res=>res.data)
    }
    // 登录注册--修改密码
    export const ChangePassword = params=>{
        return axios.post('user/updatepassword',params).then(res=>res.data)
    }
    // 登录注册--联系客服
    export const ContactCustomerService = params => {
      return axios.post('home/hotline', params).then(res => res.data)
    }
    // 个人设置--收藏商品列表
    export const userCollection = params=>{
        return axios.post('user/getcollectionlist',params).then(res=>res.data)
    }
    // 个人设置--收藏文章列表
    export const userArticalCollection = params=>{
        return axios.post('user/getArticleCollectionList',params).then(res=>res.data)
    }
    // 个人设置--钱包余额
    export const userMoneyBall = params=>{
        return axios.post('user/wallet',params).then(res=>res.data)
    }
    // 个人设置--账单明细
    export const userMoneyRecord = params=>{
        return axios.post('user/record',params).then(res=>res.data)
    }
    // 个人设置--关于我们
    export const userAboutUs = params => {
        return axios.post('user/aboutUs', params).then(res => res.data)
    }
    // 个人设置--浏览记录
    export const userBrowseRecord = params => {
        return axios.post('user/getbrowserecords', params).then(res => res.data)
    }
    // 个人设置--清空浏览记录
    export const clearBrowseRecord = params => {
        return axios.post('user/delbrowserecords', params).then(res => res.data)
    }
    // 个人设置--意见反馈
    export const userOpinionBack = params => {
        return axios.post('user/feedBack', params).then(res => res.data)
    }
    // 个人设置--评价
    export const userEvaluateList = params => {
        return axios.post('user/userAssessProductList', params).then(res => res.data)
    }
    // 个人设置--商家申请
    export const userApplication = params => {
      return axios.post('user/memberStoreAdd', params).then(res => res.data)
    }
    // 个人设置--重新修改后的商家申请
    export const userAgainApplication = params => {
      return axios.post('user/memberStoreUpdateSave', params).then(res => res.data)
    }
    //个人设置--商家申请状态
    export const userApplicationStatus = params => {
      return axios.post('user/memberStoreStatus', params).then(res => res.data)
    }
    // 个人设置--商家申请--上传门头照片
    export const userApplicationImg1 = params => {
        return axios.post('upload/image', params, { headers: { 'Content-Type': 'multipart/form-data' }, transformRequest: [params => params]}).then(res => res.data)
    }
// 乡村互联
    //乡村互联--城市地址
    export const ruralCityAddress = params=>{
        return axios.post('Xchl/address',params).then(res=>res.data)
    }
    //乡村互联--城市列表
    export const ruralCityList = params=>{
        return axios.post('xchl/switchAddress',params).then(res=>res.data)
    }
    // 乡村互联--城市天气
    export const ruralCityWeather = params=>{
        return axios.post('Xchl/getWeather',params).then(res=>res.data)
    }
    // 乡村互联--城市详情
     export const ruralCityInfo = params=>{
        return axios.post('Xchl/getTowninfo',params).then(res=>res.data)
    }
    // 乡村互联--推荐分类
     export const ruralArticalId = params=>{
        return axios.post('Xchl/getArticleCategory',params).then(res=>res.data)
    }
    // 乡村互联--推荐分类列表
    export const ruralArticalList = params=>{
        return axios.post('Xchl/listForIndex',params).then(res=>res.data)
    }
    // 乡村互联--文章详情
    export const ruralArticalInfo = params=>{
        return axios.post('Xchl/detail',params).then(res=>res.data)
    }
    // 乡村互联--人文详情
    export const ruralLocalInfo = params=>{
        return axios.post('Xchl/localDetail',params).then(res=>res.data)
    }
    // 乡村互联--文章收藏
    export const ruralArticalCollection = params=>{
        return axios.post('xchl/collection',params).then(res=>res.data)
    }
    // 乡村互联--搜索接口
    export const ruralSearch = params=>{
        return axios.post('Xchl/search',params).then(res=>res.data)
    }
    // 乡村互联--历史搜索+热门推荐
    export const ruralSearchIndex = params=>{
        return axios.post('Xchl/searchIndex',params).then(res=>res.data)
    }
    // 乡村互联--历史搜索清除
    export const ruralSearchClear = params=>{
        return axios.post('Xchl/searchClear',params).then(res=>res.data)
    }
    // 乡村互联--历史搜索单个删除
    export const ruralDelHistory = params=>{
        return axios.post('Xchl/searchDelete',params).then(res=>res.data)
    }


