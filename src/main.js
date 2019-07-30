import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from './router'

import axios from 'axios'

// 引入公共样式
import './assets/common.css'

// 引入模块
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

// 处理axios 问题
// 一基准地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 二axios引入
Vue.prototype.$axios = axios
// 三token
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  return Promise.reject(error)
})

// 解决token过期问题
axios.interceptors.response.use(function (response) {
  // Do something with response data
  // if (response.data.meta.status === 10011) {
  //   this.$router.push('/login')
  // }

  // if (response.data.meta.status === 10010 && response.data.token) {
  //   localStorage.setItem('token', response.data.token)
  // }

  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
