import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from './router'

import './assets/common.css'
// 安装

// 引入模块
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入公共样式

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
