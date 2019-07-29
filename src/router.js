import Vue from 'vue'

import VueRouter from 'vue-router'

import home from './components/Home/home.vue'
import login from './components/Login/login.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/home', component: home },
    { path: '/login', component: login }
  ]
})
