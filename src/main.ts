import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

//浏览器默认样式样式清空
import "./assets/css/reset.css"
//ajax请求插件
import axios from 'axios'
import Vueaxios from 'vue-axios'
Vue.use(Vueaxios, axios)

//ajax数据格式转换
import qs from 'qs'
Vue.prototype.qs= qs

//移动端自适应
import 'lib-flexible/flexible.js'

//引入公用函数
import common from "@/assets/js/common.js"
Vue.prototype.common= common



// //引入转盘函数
// import giftwheel from "./assets/js/giftWheel.js"
// Vue.prototype.giftwheel = giftwheel

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
