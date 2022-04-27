import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home', // 模块管理
    name: 'home',
    component: () => import('../views/home/index/IndexView.vue')
  },
  {
    path: '/homeIndex', // 数据管理
    name: 'homeIndex',
    component: () => import('../views/home/index/homeIndex.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
