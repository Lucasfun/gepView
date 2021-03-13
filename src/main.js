import Vue from 'vue'
import App from './App.vue'
import router from './router'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
//Vue.prototype.HOST = '/apis';

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
