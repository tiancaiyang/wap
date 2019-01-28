import Vue from 'vue'
// 注册 vuex
import Vuex from 'vuex';

import carC from './modules/b2c/carC'
import carB from './modules/b2b/carB'
import combination from './modules/index/combination'
import combinationB from './modules/b2b/activeCombinationB'
import Login from './modules/index/login'
Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    carC, //b2c购物车
    carB, //b2b购物车
    combination, //组合活动商品
    combinationB,//b2b组合活动商品
    Login,//登录页
  },

})