import { createRouter, createWebHistory } from 'vue-router';
import { Login } from '@src/views'
import { PORTAL_TOKEN_KEY } from '@src/utils';
import { AUTO_LOGIN_KEY } from '@src/utils/constants'

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/login', 
    component: Login
  }]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = Boolean(localStorage.getItem(PORTAL_TOKEN_KEY))
  const isAutoLogin = Boolean(localStorage.getItem(AUTO_LOGIN_KEY) === '1')
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // 如果用户未登录，重定向到登录页面
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  }
  // 自动登录
  if (to.path === '/login' && isAuthenticated && isAutoLogin) {
    next({
      path: '/app1/page1',
    });
  }
  // 如果路由不需要鉴权，直接允许导航
  next();
})

export default router;