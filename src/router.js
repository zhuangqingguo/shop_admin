import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './components/Home/home.vue'
import login from './components/Login/login.vue'

import users from './components/Users/users.vue'
import roles from './components/Roles/roles.vue'
import rights from './components/Rights/rights.vue'
import categories from './components/Categories/categories.vue'
import goods from './components/Goods/goods.vue'
import goodsAdd from './components/Goods/good-add.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/home',
      component: home,
      children: [
        { path: '/users', component: users },
        { path: '/roles', component: roles },
        { path: '/rights', component: rights },
        { path: '/categories', component: categories },
        { path: '/goods', component: goods },
        { path: '/good-add', component: goodsAdd }
      ]
    },
    { path: '/login', component: login }

  ]
})

router.beforeEach((to, form, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})

export default router
