import { RouteLocationNormalized, createRouter, createWebHistory } from 'vue-router';
import { Home, Login} from '../views';
import type { Menu } from '@src/apis/models/MenuModel';
import { Layout } from '@src/views';
import { PORTAL_TOKEN_KEY } from '@src/utils';
import { AUTO_LOGIN_KEY } from '@src/utils/constants';
import {  loadMicroApp } from 'qiankun';
import actions from '@src/store';

const LOGIN_PAGE_PATH = '/login'; // 登陆页地址
const HOME_PAGE_PATH = '/home';   // 首页地址
const notLoadAppPages = [LOGIN_PAGE_PATH, HOME_PAGE_PATH];// 不需要接入微应用的页面 

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: LOGIN_PAGE_PATH, 
    component: Login
  }, {
    path: HOME_PAGE_PATH, 
    component: Home
  }]
})

/**
 * @description 页面加载微应用
 * @param to 
 * @param menus 菜单
 */
const pageLoadMicroApp = (to: RouteLocationNormalized, menus: Menu[]) => {
  if (!to.matched.some(t => notLoadAppPages.includes(t.path))) {
    registerSystem(menus)
  }
}

/**
 * @description 用户是否授权
 * @returns 
 */
const isAuthenticated = () => {
  return Boolean(localStorage.getItem(PORTAL_TOKEN_KEY))
}

/**
 * @description 是否设置自动登录
 * @returns 
 */
const isAutoLogin = () => {
  return Boolean(localStorage.getItem(AUTO_LOGIN_KEY) === '1');
}

/**
 * @description 是否需要授权
 * @param to 
 * @returns 
 */
const isRequiredAuth = (to: RouteLocationNormalized) => {
  return to.matched.some(record => record.meta.requiresAuth)
}

/**
 * @description 是否需要跳转到指定路径
 * @param to 
 * @param path 指定路径
 * @returns 
 */
const isTo = (to: RouteLocationNormalized, path: string) => {
  return to.matched.some(record => record.path === path)
}

/**
 * @description 拦截路由
 * @param menus 菜单
 */
const routerInterceptor = (menus: Menu[]) => {
  router.beforeEach((to, from, next) => {
    pageLoadMicroApp(to, menus)
    if (isRequiredAuth(to) && !isAuthenticated()) {
      next({ path: LOGIN_PAGE_PATH, query: { redirect: to.fullPath }});
    }
    if (isTo(to, LOGIN_PAGE_PATH) && isAuthenticated() && isAutoLogin()) {
      next({ path: HOME_PAGE_PATH});
    }
    // 如果路由不需要鉴权，直接允许导航
    next();
  })
}

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
    if (menu.children.length === 0)  {
      router.addRoute({path: menu.path, component: Layout})
      continue
    }
    menu.children.forEach(subMenu => {
      router.addRoute({ path: subMenu.path, component: Layout })
    })
  }
  routerInterceptor(menus)
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