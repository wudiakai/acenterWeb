import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import IndexView from '../views/home/index/IndexView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: IndexView,
    children: [
      {
        path: '/stats', // 数据管理
        name: 'stats',
        component: () => import('../views/home/stats/IndexView.vue')
      }
      // {
      //   path: '/user', // 数据管理
      //   name: 'user',
      //   component: () => import('../views/home/user/IndexView.vue')
      // },
      // {
      //   path: '/modules', // 功能模块
      //   name: 'modules',
      //   component: () => import('../views/home/modules/IndexView.vue'),
      //   children: [
      //     {
      //       path: '/modules/inputView',
      //       name: 'inputView',
      //       component: () => import('../views/home/modules/InputView.html')
      //     },
      //     {
      //       path: '/modules/vms',
      //       name: 'vms',
      //       component: () => import('../views/home/modules/VMS.html')
      //     }
      //   ]
      // }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
