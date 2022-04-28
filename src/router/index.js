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
    component: () => import('@/views/home/ModuleView.vue')
  },
  {
    path: '/tools', // 工具管理
    name: 'tools',
    component: () => import('@/views/home/ToolsView.vue'),
    redirect: '/configtool',

    children: [
      {
        path: '/configtool',
        name: 'configtool',
        component: () => import('@/views/tools/ConfigTool.vue')
      },
      {
        path: '/signtool',
        name: 'signtool',
        component: () => import('@/views/tools/SignTool.vue')
      },
      {
        path: '/vhaltool',
        name: 'vhaltool',
        component: () => import('@/views/tools/VhalTool.vue')
      }
    ]

  },
  {
    path: '/api', // Android doc
    name: 'api',
    component: () => import('@/views/home/ApiView.vue'),

    children: [
      {
        path: '/androiddoc',
        name: 'androiddoc',
        meta: {
          title: '',
          link: 'www.163.com'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
