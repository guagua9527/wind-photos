import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../pages/Home.vue'
import Portfolio from '../pages/Portfolio.vue'
import Photos from '../pages/Photos.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio
  },
  {
    path: '/photos',
    name: 'Photos',
    component: Photos
  },
  // 在这里添加其他路由
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router