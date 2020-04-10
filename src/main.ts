import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

//浏览器默认样式样式清空
import "./assets/css/reset.css";
//ajax请求插件
import axios from "axios";
import Vueaxios from "vue-axios";
Vue.use(Vueaxios, axios);

//ajax数据格式转换
import qs from "qs";
Vue.prototype.qs = qs;

//移动端自适应
import "lib-flexible/flexible.js";

//引入公用函数
import common from "@/assets/js/common.js";
Vue.prototype.common = common;

// //引入转盘函数
// import giftwheel from "./assets/js/giftWheel.js"
// Vue.prototype.giftwheel = giftwheel

Vue.config.productionTip = false;
//监听浏览器宽度的改变
window.onresize = function() {
  let maxWidth: any = window.screen.width;
  if (maxWidth < 750) {
    console.log("移动端");
    // var head = document.getElementsByTagName("head")[0];
    // var link = document.createElement("link");
    // link.type = "text/css";
    // link.rel = "stylesheet";
    // link.href = "xxx.css";
    // head.appendChild(link);
  }
  else{
    console.log("PC端")
  }
};

router.beforeEach((to, from, next) => {
  //测试vue全局钩子函数
  next();
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
