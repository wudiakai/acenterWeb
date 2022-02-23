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
      },
      {
        path: '/user', // 数据管理
        name: 'user',
        component: () => import('../views/home/user/IndexView.vue')
      },
      {
        path: '/wms', // 信息管理
        name: 'wms',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/home/wms/IndexView.vue'),
        children: [
          {
            path: '/wms/list',
            name: 'wmsList',
            component: () => import('../views/home/wms/ListView.vue')
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
