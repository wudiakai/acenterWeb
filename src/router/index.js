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
    component: () => import('@/views/SolutionView.vue')
  },
  {
    path: '/home/:name', // 模块管理
    name: 'home',
    component: () => import('@/views/SolutionView.vue')
  },
  {
    path: '/module', // 模块管理
    name: 'module',
    component: () => import('@/views/ModuleView.vue')
  },
  {
    path: '/module/:name', // 模块管理
    name: 'module',
    component: () => import('@/views/ModuleView.vue')
  },
  {
    path: '/tools', // 工具管理
    name: 'tools',
    component: () => import('@/views/ToolsView.vue'),
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
      },
      {
        path: '/audiofocus',
        name: 'audiofocus',
        component: () => import('@/views/tools/AudiofocusTool.vue')
      },
      {
        path: '/audiomix',
        name: 'audiomix',
        component: () => import('@/views/tools/AudiomixTool.vue')
      }
    ]

  },
  {
    path: '/api', // Android doc
    name: 'api',
    component: () => import('@/views/ApiView.vue'),

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
