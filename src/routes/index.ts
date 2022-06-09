import { createWebHistory, createRouter, RouteRecordRaw, RouteLocationNormalized } from 'vue-router'
import { TOKEN } from '@/utils/const'
import NProgress from 'nprogress'
const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('@/views/index/index.vue') },
  { path: '/login', component: () => import('@/views/login/index.vue') },
  { path: '/search', component: () => import('@/views/search/index.vue') },
  { path: '/detail', component: () => import('@/views/search/detail.vue') },
  { path: '/publish', component: () => import('@/views/publish/index.vue') },
  {
    path: '/user', component: () => import('@/views/user/index.vue'),
    children: [
      // 个人中心
      { path: 'profile', component: () => import('@/views/user/profile/index.vue') },
      // 填写个人资料
      { path: 'profile-form', component: () => import('@/views/user/profile/profile-form.vue') },
      // 我的道具
      { path: 'item', component: () => import('@/views/user/profile/profile-form.vue') },
      // 会员特权  
      { path: 'vip', component: () => import('@/views/user/vip.vue') },
      // 我的动态（已发布）
      { path: 'punlish-pass', component: () => import('@/views/user/record/pass.vue') },
      // 我的动态（待审核）
      { path: 'punlish-audit', component: () => import('@/views/user/record/audit.vue') },
      // 我的动态（未通过 ）
      { path: 'punlish-reject', component: () => import('@/views/user/record/reject.vue') },
      // 修改手机号
      { path: 'change-phone', component: () => import('@/views/user/profile/profile-form.vue') },
      // 修改密码  
      { path: 'change-password', component: () => import('@/views/user/profile/profile-form.vue') },
      // 我的收藏  
      { path: 'favorite', component: () => import('@/views/user/profile/profile-form.vue') },
      // 担保记录   
      { path: 'guarantee', component: () => import('@/views/user/profile/profile-form.vue') },
      // 我的好友    
      { path: 'friend', component: () => import('@/views/user/profile/profile-form.vue') },
    ]
  },
  { path: '/buy', component: () => import('@/views/buy/index.vue') },
]

// 创建路由
export const router = createRouter({
  history: createWebHistory(),
  routes
})

// 注册拦截器
// 前置拦截器
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  NProgress.start()
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
router.afterEach(() => {
  NProgress.done()
})