// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import fastClick from 'fastclick'
import moment from 'moment'
// 注册 vuex
import Vuex from 'vuex';
Vue.use(Vuex);

Vue.use(VueRouter)
Vue.use(VueResource)
fastClick.attach(document.body)
//vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import "swiper/dist/css/swiper.css"
Vue.use(VueAwesomeSwiper)


import App from './App'
import router from './router'
import store from './vuex'

// 导入mui包
import "../static/mui/css/mui.min.css"
import "../static/mui/css/icons-extra.css"
import "../static/mui/css/mui.picker.all.css"
import "../static/mui/css/mui.indexedlist.css"
// 定义全局的过滤器
Vue.filter('dateFormat', function(dataStr, pattern = 'YYYY-MM-DD') {
  return moment(dataStr).format(pattern)
})
Vue.filter('dateFormatAll', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
})
// 浮点数过滤器
Vue.filter('strip',function( num , precision = 12){
  return +parseFloat(num.toPrecision(precision));
})
// 导入字体js包
import "../src/assets/js/rem.js"
// 去掉警告
Vue.config.productionTip = false

 //加载地图，调用浏览器定位服务----高德地图
var map, geolocation;
map = new AMap.Map('container', {
    resizeEnable: true
});
map.plugin('AMap.Geolocation', function() {
    geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 1, //超过0秒后停止定位，默认：无穷大
        buttonPosition: 'RB'
    });
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', function onComplete(data) {
        var getLongitude = data.position.getLng();
        var getLatitude = data.position.getLat();
        localStorage.setItem('getcity',getLongitude+','+getLatitude )
        // alert(getLongitude+'---'+getLatitude+'我的天') //弹出获得的经纬度
    }); //返回定位信息
}); 
// 登录拦截
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      let token = localStorage.getItem('User-Token')
      if (token) {  // 通过vuex state获取当前的token是否存在
           next();
      }else{
          next({
              path: '/login',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
    }
    else {
        next();
    }
})
router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
})
Vue.directive('mui', {         //v-mui="input" 自动获取，然后input后面的图标会加上。就相当于在这个div所在的元素上添加一个input事件。
     bind: function (el, props) {
          setTimeout(() => { mui(el)[props.value](); })
     }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
