import { createWebHistory, createRouter, RouteRecordRaw, RouteLocationNormalized } from 'vue-router';
import NProgress from 'nprogress';
import { getUser } from '@/utils';
import { ElMessage } from 'element-plus';

/**
 * authentication: boolean 是否需要登录才能访问这个路由
 */

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('@/views/index/index.vue') },
  { path: '/login', component: () => import('@/views/login/index.vue') },
  { path: '/search', component: () => import('@/views/search/index.vue') },
  { path: '/detail/:id', component: () => import('@/views/search/detail.vue'), meta: { authentication: true } },
  { path: '/publish', component: () => import('@/views/publish/index.vue') },
  {
    path: '/user',
    component: () => import('@/views/user/index.vue'),
    children: [
      // 个人中心
      { path: 'profile', component: () => import('@/views/user/profile/index.vue') },
      // 填写个人资料
      { path: 'profile-form', component: () => import('@/views/user/profile/profile-form.vue') },
      // 我的道具
      { path: 'item', component: () => import('@/views/user/item/index.vue') },
      // 会员特权
      { path: 'vip', component: () => import('@/views/user/vip.vue') },
      // 我的动态
      { path: 'project', component: () => import('@/views/user/record/index.vue') },
      // 修改手机号
      { path: 'change-phone', component: () => import('@/views/user/profile/profile-form.vue') },
      // 修改密码
      { path: 'change-password', component: () => import('@/views/user/profile/profile-form.vue') },
      // 我的收藏
      { path: 'favorite', component: () => import('@/views/user/favorite.vue') },
      // 担保记录
      { path: 'guarantee', component: () => import('@/views/user/guarantee/index.vue') },
      // 我的好友
      { path: 'friend', component: () => import('@/views/user/friend/index.vue') },
      // 人脉管理
      { path: 'friend-apply', component: () => import('@/views/user/friend/apply.vue') },
      // 修改手机号
      { path: 'phone', component: () => import('@/views/user/account/phone.vue') },
      // 修改密码
      { path: 'password', component: () => import('@/views/user/account/password.vue') },
    ],
    meta: { authentication: true },
  },
  // 购买VIP、道具
  { path: '/buy', component: () => import('@/views/buy/index.vue'), meta: { authentication: true } },
  {
    path: '/message',
    component: () => import('@/views/message/index.vue'),
    children: [
      // 通知
      { path: 'inform', component: () => import('@/views/message/inform.vue') },
      // 好友
      { path: 'friends', component: () => import('@/views/message/friends.vue') },
      // 私信
      { path: 'chat-list', component: () => import('@/views/message/chat-list.vue') },
      // 聊天
      { path: 'chat', component: () => import('@/views/message/friends_info.vue') },
    ],
    meta: { authentication: true },
  },
  // 平台交易
  { path: '/deal', component: () => import('@/views/deal/index.vue'), meta: { authentication: true } },
  // 发起交易
  { path: '/deal-form', component: () => import('@/views/deal/form.vue') },
  // 人脉列表
  { path: '/contacts-list', component: () => import('@/views/contacts/list.vue') },
];

// 创建路由
export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

// 注册拦截器
// 前置拦截器
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  NProgress.start();
  // 检查token
  if (to.meta && to.meta.authentication) {
    if (!getUser()) {
      ElMessage.error('请先登录');
      return {
        path: '/login',
        replace: true,
      };
    }
  }
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
});
// 后置拦截器
router.afterEach(() => {
  NProgress.done();
});
