import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import http from "../utils/axiosConfig.js";


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI)


Vue.prototype.$axios = http;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");