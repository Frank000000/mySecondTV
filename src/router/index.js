import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/user-agreement',
    name: 'UserAgreement',
    component: () => import('@/views/UserAgreement.vue'),
    meta: {
      title: '用户协议'
    }
  },
  {
    path: '/heart-rate',
    name: 'HeartRate',
    component: () => import('@/views/HeartRate.vue'),
    meta: {
      title: '心率'
    }
  },
  {
    path: '/member',
    name: 'Member',
    component: () => import('@/views/Member.vue'),
    meta: {
      title: '家庭成员'
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('@/views/Help.vue'),
    meta: {
      title: '帮助'
    }
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
