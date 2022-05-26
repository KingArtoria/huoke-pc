import { createWebHistory, createRouter, RouteRecordRaw, RouteLocationNormalized } from 'vue-router'
import { TOKEN } from '@/utils/const'
const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('@/views/index/index.vue') },
  { path: '/login', component: () => import('@/views/login/index.vue') },
]

// 创建路由
export const router = createRouter({
  history: createWebHistory(),
  routes
})

// 注册拦截器
// 前置拦截器
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {

  // 检查token
  // if (!sessionStorage.getItem(TOKEN) && !localStorage.getItem(TOKEN)) {
  //   if (to.path !== '/login') {
  //     return {
  //       path: '/login',
  //       replace: true
  //     }
  //   }
  // }
  // return false 取消导航
  // 不返回或返回 true 放行
})
// 后置拦截器