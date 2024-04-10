import { createRouter, createWebHistory } from 'vue-router';
import { Home, Login} from '../views';
import type { Menu } from '@src/apis/models/MenuModel';
import { Layout } from '@src/views';
import { PORTAL_TOKEN_KEY } from '@src/utils';
import { AUTO_LOGIN_KEY } from '@src/utils/constants';
import {  loadMicroApp } from 'qiankun';
import actions from '@src/store';

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/login', 
    component: Login
  }, {
    path: '/home', 
    component: Home
  }]
})

/**
 * @description 注册路由
 * @param menus 菜单
 */
export const registerRootes = async (menus: Menu[] = []) => {
  let index = -1;
  if (menus.length === 0) return;
  while(++index < menus.length) {
    let menu = menus[index];
    menu.children = menu.children || [];
    if (menu.children.length === 0) continue;
    menu.children.forEach(subMenu => {
      router.addRoute({ path: subMenu.path, component: Layout })
    })
  }
  router.beforeEach((to, from, next) => {
    const isAuthenticated = Boolean(localStorage.getItem(PORTAL_TOKEN_KEY))
    const isAutoLogin = Boolean(localStorage.getItem(AUTO_LOGIN_KEY) === '1');
    if (!to.matched.some(path => ['/login', '/home'].includes(path.path))) {
      registerSystem(menus)
    }
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
        path: '/home',
      });
    }
    // 如果路由不需要鉴权，直接允许导航
    next();
  })
  return menus
}

/**
 * @description 注册系统
 * @param menus 菜单
 */
const registerSystem = (menus: Menu[] = []) => {
  menus.forEach((menu: any) => {
    loadMicroApp({
      name: menu.code,
      entry: menu.path,
      container: `#${menu.code}`,
      props: {
        route: `/${menu.code}`,
        getGlobalState: actions.getGlobalState
      }
    });
  })
}


export default router;