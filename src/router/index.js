import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

// 平台入口页面
  import cloudEntrance from '../page/index/cloudEntrance.vue'
  import IndexMessage from '../page/index/IndexTabbar/message.vue'
  import IndexUser from '../page/index/IndexTabbar/indexUser.vue'
  import Login from '../page/index/Login/login.vue'
  import Register from '../page/index/Login/register.vue'
  import RepPassword from '../page/index/Login/repassword.vue'
  // 消息详情
  import MessageInfoI from  '../page/index/IndexMessage/messageInfo.vue'
  // 个人资料
  import UserInfo  from '../page/index/IndexUser/userInfo.vue'
  import userChangeName from '../page/index/IndexUser/userNameChange.vue'
  //收藏列表
  import userCollection from '../page/index/IndexUser/setting/collection.vue'
  // 设置
  import userSetting from '../page/index/IndexUser/setting/userSetting.vue'
  //修改密码
  import ChangePassword from '../page/index/Login/changePassword.vue'
  //意见反馈
  import opinionBack from '../page/index/IndexUser/setting/opinionBack.vue'
  //关于我们
  import indexAbout from '../page/index/IndexUser/setting/about.vue'
  //浏览记录
  import browseRecord from '../page/index/IndexUser/setting/browseRecord.vue'
  //商家申请
  import application from '../page/index/IndexUser/setting/application.vue'
  //商家申请状态
  import applicationState from '../page/index/IndexUser/setting/applicationState.vue'
  // 用户协议
  import userAgreement from '../page/index/IndexUser/setting/userAgreement.vue'
  // 个人中心-评价
  import userEvaluateList from '../page/index/IndexUser/setting/EvaluateList.vue'
  // 银行卡
  import BrankCard from '../page/index/IndexUser/BrankCard/brankCard.vue'
  import BrankCardInfo from '../page/index/IndexUser/BrankCard/brankCardInfo.vue'
  import AddBrankCard from '../page/index/IndexUser/BrankCard/addbrankCard.vue'
  // 活动页面
  import TitmeLimit from '../page/index/Active/TitmeLimit/titmeLimit.vue'
  import GoodSale from '../page/index/Active/goodSale/goodSale.vue'
  // 收货地址页面
  import  ConnectpersonEdit from '../page/index/address/ConnectpersonEdit.vue'
  import  Connectperson from '../page/index/address/Connectperson.vue'
  import  DefaultAddress from '../page/index/address/defaultAddress.vue'
  // 微信支付中间页
  import wechat from '../components/wechatPay.vue'

// b2b页面
  import Homeb from '../page/b2b/tabbar/home.vue'
  import Assementb from '../page/b2b/tabbar/assestment.vue'
  import Userb from '../page/b2b/tabbar/user.vue'
  import Carb from '../page/b2b/tabbar/car.vue'
  import assestCoodsListB from '../page/b2b/goodsPage/assestGoodsList.vue'
  import brandGoodsListB from '../page/b2b/goodsPage/brandGoodsList.vue'
  import brandNameListB  from '../page/b2b/goodsPage/brandNameB.vue'
  import  DetailsB   from '../page/b2b/orderB/DetailsB.vue'
  import  ReturnshopB   from '../page/b2b/orderB/ReturnshopB.vue'
  import  PricedetailcB   from '../page/b2b/orderB/PricedetailcB.vue'
  import  ReturnShopBList from '../page/b2b/orderB/ReturnShopBList.vue'
  import  TalkcompleteB   from '../page/b2b/EvaluateB/TalkcompleteB.vue'
  import  EvaluationB   from '../page/b2b//EvaluateB/EvaluationB.vue'
  import  EvaluateAllB  from '../page/b2b/EvaluateB/EvaluateB.vue'
  import  EvaluationListB  from '../page/b2b/EvaluateB/EvaluationListB.vue'
  import  ShopdetailB from '../page/b2b/goodsPage/goodsInfo/ShopdetailB.vue'
  import  LimitShopDteailB from '../page/b2b/goodsPage/goodsInfo/LimitShopDteailB.vue'
  import  PaymentB from '../page/b2b/goodsPage/PaymentB.vue'
  import  PaymentfailB from '../page/b2b/goodsPage/PaymentfailB.vue'
  import  BuyB from '../page/b2b/orderB/BuyB.vue'
  import  CartBuyB from '../page/b2b/orderB/cartbuy.vue'
  import  searchB from '../page/b2b/search/searchB.vue'
  // 活动页面
  import TitmeLimitB from '../page/b2b/Active/TitmeLimit/titmeLimitB.vue'
  import GoodSaleB from '../page/b2b/Active/goodSale/goodSaleB.vue'
  import CombinationListB from '../page/b2b/Active/combinationDiscount/combinationListB.vue'
  import CombinationInfoB from '../page/b2b/Active/combinationDiscount/combinationInfoB.vue'
  import CombinationInfoType from '../page/b2b/Active/combinationDiscount/combinationInfoType.vue'
  import CombinationBuyB from '../page/b2b/Active/combinationDiscount/combinationBuy.vue'
// b2c页面
  import HomeC from '../page/b2c/B2Ctabbar/Homec.vue'
  import Assementc from '../page/b2c/B2Ctabbar/Assementc.vue'
  import Carc from '../page/b2c/B2Ctabbar/Carc.vue'
  import CarBuyC from '../page/b2c/buy/CarBuyC.vue'
  import Orderc  from '../page/b2c/B2Ctabbar/Orderc.vue'
  import Homelist  from '../page/b2c/AssementListC/HomeAssementList.vue'
  import Classificationlist  from '../page/b2c/AssementListC/Classificationlist.vue'
  import BrandNameListC from '../page/b2c/AssementListC/BrandNameList.vue'
  import Shopdetailc  from '../page/b2c/GoodsInfo/Shopdetailc.vue'
  import LimitShopSetailC  from '../page/b2c/GoodsInfo/limitShopSetailC.vue'
  import Logisticsdetailc from '../page/b2c/Orderc/Logisticsdetailc.vue'
  import Pricedetailc from '../page/b2c/Orderc/Pricedetailc.vue'
  import Returnshop from '../page/b2c/Orderc/Returnshop.vue'
  import ReturnshopListC from '../page/b2c/Orderc/ReturnshopListc.vue'
  import Talkcompletec from '../page/b2c/Evaluatec/Talkcompletec.vue'
  import Logisticsc from '../page/b2c/Orderc/Logisticsc.vue'
  import Details from '../page/b2c/Orderc/Details.vue'
  import BuyC from '../page/b2c/buy/BuyC.vue'

  import Evaluatec  from '../page/b2c/Evaluatec/Evaluatec.vue'
  import Evaluationc  from '../page/b2c/Evaluatec/Evaluationc.vue'
  import EvaluationListC from '../page/b2c/Evaluatec/EvaluationListC.vue'

  import SearchC from '../page/b2c/SearchC/searchC.vue'
  import Paymentc from '../page/b2c/paymentc/Paymentc.vue'
  import Paymentfailc from '../page/b2c/paymentc/Paymentfailc.vue'



// 乡村互联页面
  import RuralHome from '../page/ruralInter/RuralHome.vue'
  import Searrchr from '../page/ruralInter/Search.vue'
  import SearchResoultr from '../page/ruralInter/SearchResoult.vue'
  import SearchInfor from '../page/ruralInter/SearchInfo.vue'
  import CityList from '../page/ruralInter/CityList.vue'
  import LoncalInfo from '../page/ruralInter/loncalInfo.vue'
// 优惠中心页面
  import preferential from '../page/preferentialActivities/preferentAct.vue'

Vue.use(Router)
export default new Router({
  routes: [
    { path: '/', redirect: '/cloudentrance'},
    { path: '/cloudentrance',name:'cloudEntrance', component: cloudEntrance },
    { path: '/indexmessage',component: IndexMessage},
    { path: '/indexUser',component: IndexUser},
    { path: '/login',component: Login},
    { path: '/register',component: Register,name:'register'},
    { path: '/repassword',component: RepPassword,name:'repassword'},
    { path: '/changePassword',component: ChangePassword,name:'changePassword'},

    { path: '/indexmessage/Messageinfo/:id',meta: { requireAuth: true }, component: MessageInfoI},//个人中心消息详情

    { path: '/indexUser/userinfo',meta: { requireAuth: true }, component: UserInfo},//个人资料
    { path: '/indexUser/userinfo/userchangename',component: userChangeName},
    { path: '/indexUser/userCollection', meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },component: userCollection},//收藏列表

    { path: '/indexUser/userSetting',meta: { requireAuth: true },component: userSetting},//设置
    { path: '/indexUser/browseRecord',meta: { requireAuth: true },component: browseRecord},//浏览记录
    { path: '/indexUser/indexAbout',component: indexAbout},//关于我们
    { path: '/indexUser/opinionBack',component: opinionBack},//意见反馈
    { path: '/indexUser/application',component: application},//商家申请
    { path: '/indexUser/applicationState',component: applicationState,name:'applicationState'},//商家申请状态
    { path: '/indexUser/userAgreement',component: userAgreement},// 用户协议
    { path: '/indexUser/userEvaluateList',meta: { requireAuth: true },component: userEvaluateList},// 个人中心-评价


    { path: '/indexUser/brankCard',component: BrankCard},
    { path: '/indexUser/brankCard/brankcardinfo',component: BrankCardInfo},
    { path: '/indexUser/brankCard/addbrankcard',component: AddBrankCard},

    { path: '/cloudentrance/titmeLimit',name:'TitmeLimit', component: TitmeLimit},//大首页和C端限时秒杀
    { path: '/cloudentrance/goodsale',component: GoodSale},//大首页和C端好货特卖
    { path: '/connectpersoncEdit', component: ConnectpersonEdit,name:'connectpersoncEdit' },//编辑收货人
    { path: '/connectpersonc', component: Connectperson },//新建收货人
    { path: '/defaultAddress', component: DefaultAddress, name:'defaultAddress'},//收货地址

    { path: '/wechat', component: wechat, name:'wechat'},//微信支付中间页

    // b2b页面
    { path: '/homeb', component: Homeb ,meta: { requireAuth: true }, name: 'Home'},
    { path: '/assementb',meta: { requireAuth: true }, component: Assementb },
    { path: '/userb',meta: { requireAuth: true }, component: Userb },
    { path: '/carb',meta: { requireAuth: true }, component: Carb },
    { path: '/assementb/assestCoodsListB',name:'assestCoodsListB',meta: { requireAuth: true }, component: assestCoodsListB },//分类品牌详情
    { path: '/assementb/brandGoodsListB/:cid/:type/:title',name:'brandGoodsListB',meta: { requireAuth: true }, component: brandGoodsListB },//品牌分类详情
    { path: '/assementb/brandGoodsListB/:cid/:title',name:'brandNameListB',meta: { requireAuth: true }, component: brandNameListB },//品牌商商品列表
    { path: '/userb/detailsB/:orderNo',meta: { requireAuth: true }, component: DetailsB},//订单详情
    { path: '/userb/returnshopB/:id',name:'ReturnshopB',meta: { requireAuth: true }, component: ReturnshopB},//申请退款
    { path: '/userb/ReturnShopBList/:orderNo',meta: { requireAuth: true }, component: ReturnShopBList},//申请退款列表
    { path: '/userb/pricedetailcB/:orderNo/:id',name:'PricedetailcB',meta: { requireAuth: true }, component: PricedetailcB},//退款详情
    { path: '/userb/talkcompleteB',meta: { requireAuth: true }, component: TalkcompleteB},//感谢评价
    { path: '/userb/evaluationB',meta: { requireAuth: true }, component: EvaluationB},//去评价
    { path: '/userb/evaluationB/EvaluationListB/:orderNo',meta: { requireAuth: true }, component: EvaluationListB},//订单全部评价列表
    { path: '/evaluateAllB/:productId',meta: { requireAuth: true }, component: EvaluateAllB},//商品全部评价
    { path: '/shopdetailB/:id', component: ShopdetailB,meta: { requireAuth: true }, name: 'ShopdetailB' },//商品详情
    { path: '/limitShopDteailB/:id/:seckillId',meta: { requireAuth: true }, component: LimitShopDteailB, name: 'LimitShopDteailB' },//秒杀商品详情
    { path: '/paymentB/:price', component: PaymentB, name: 'PaymentB'},//支付成功
    { path: '/PaymentfailB', component: PaymentfailB, name: 'PaymentfailB'},//支付失败
    { path: '/buyB', component: BuyB,meta: { requireAuth: true }, name:'buyB'},//确认订单
    { path: '/cartBuyB', component: CartBuyB,meta: { requireAuth: true }, name:'cartBuyB'},//确认订单
    { path: '/searchB', name:'searchB',meta: { requireAuth: true }, component: searchB},//搜索页面
    { path: '/TitmeLimitB',meta: { requireAuth: true }, component: TitmeLimitB},//b2b限时秒杀页面
    { path: '/GoodSaleB',meta: { requireAuth: true }, component: GoodSaleB},//b2b特价好货页面
    { path: '/CombinationListB',meta: { requireAuth: true }, component: CombinationListB},//b2b组合活动页面
    { path: '/CombinationListB/CombinationInfoB',meta: { requireAuth: true }, name: 'CombinationInfoB',component: CombinationInfoB},//b2b组合活动详情类型4
    { path: '/CombinationListB/CombinationInfoType',meta: { requireAuth: true }, name: 'CombinationInfoType',component: CombinationInfoType},//b2b组合活动详情类型123
    { path: '/CombinationListB/CombinationBuyB',meta: { requireAuth: true }, name: 'CombinationBuyB',component: CombinationBuyB},//b2b组合活动立即购买

    // b2c页面
    { path: '/homec', component: HomeC},
    { path: '/assementc',name: 'Assementc',component:Assementc},//分类
    { path: '/classificationlist/:cid/:type/:title',name: 'Classificationlist',component:Classificationlist},//根据分类选品牌
    { path: '/assementc/homelist',name: 'Homelist',component:Homelist}, // 根据品牌选分类
    { path: '/assementc/brandNameListC',name: 'BrandNameListC',component:BrandNameListC}, //品牌商商品列表
    { path: '/shopdetailC/:id',name: 'Shopdetailc',component:Shopdetailc},//商品详情
    { path: '/limitShopSetailC/:id/:seckillId',name: 'LimitShopSetailC',component:LimitShopSetailC},//秒杀商品详情
    { path: '/buyC',name: 'BuyC',meta: { requireAuth: true }, component:BuyC},//立即购买
    { path: '/carc',name: 'Carc',meta: { requireAuth: true }, component:Carc},//购物车
    { path: '/carBuyC',name: 'CarBuyC',component:CarBuyC},//购物车--提交确认订单
    { path: '/orderc',name: 'Orderc',meta: { requireAuth: true },component:Orderc },//订单
    { path: '/details/:orderNo',name: 'Details',component:Details},//订单详情
    { path: '/evaluationc',name: 'Evaluationc',component:Evaluationc},//发布评价
    { path: '/evaluationListC/:orderNo',name: 'EvaluationListC',component:EvaluationListC },//评价晒单列表
    { path: '/talkcompletec',name: 'Talkcompletec',component:Talkcompletec},//评价完成
    { path: '/evaluatec/:productId',name: 'Evaluatec',component:Evaluatec},//全部评价
    { path: '/returnshopC',name: 'Returnshop',component:Returnshop},//申请--退货/款详情
    { path: '/returnshopListc/:orderNo',name: 'ReturnshopListC',component:ReturnshopListC},//退款商品列表
    { path: '/pricedetailc/:orderNo/:id',name: 'Pricedetailc',component:Pricedetailc},//退款详情
    { path: '/logisticsc/:orderNo/:id',name: 'Logisticsc',component:Logisticsc},//填写物流信息
    { path: '/logisticsdetailc/:orderNo',name: 'Logisticsdetailc',component:Logisticsdetailc},//物流详情
    { path: '/searchc',name: 'Searchc',component:SearchC},//搜索
    { path: '/paymentc/:price',name: 'Paymentc',component:Paymentc},//支付成功
    { path: '/Paymentfailc',name: 'Paymentfailc',component:Paymentfailc},//支付失败

    // 乡村互联
    { path: '/ruralHome', component: RuralHome },//乡村互联首页
    { path: '/ruralHome/searrchr', component: Searrchr },//乡村互联搜索页面
    { path: '/ruralHome/SearchResoultr', component: SearchResoultr, name: 'SearchResoultr'},//乡村互联搜索结果页面
    { path: '/ruralHome/Searchinfor/:id', component: SearchInfor },//文章详情页面
    { path: '/ruralHomec/cityList', component: CityList },//乡村互联列表
    { path: '/ruralHomec/loncalInfo', component: LoncalInfo },//人文详情
    // 优惠中心
    { path: '/preferential', component: preferential },//优惠中心
  ],
  // 路由导航样式切换
  linkActiveClass:'mui-active'
})
