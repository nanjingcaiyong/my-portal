import { RouteLocationNormalized } from 'vue-router';
import type { Menu } from '@src/apis/models/MenuModel';
import { Layout } from '@src/views';
import { PORTAL_TOKEN_KEY } from '@src/utils';
import { AUTO_LOGIN_KEY, LOGIN_PAGE_PATH, HOME_PAGE_PATH } from '@src/utils/constants';
import router from './routes'

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
    if (to.path === '/') {
      return next({
        path: LOGIN_PAGE_PATH
      })
    }
    // 需要授权的页面未授权跳转登录页
    if (isRequiredAuth(to) && !isAuthenticated()) {
      return next({ path: LOGIN_PAGE_PATH, query: { redirect: to.fullPath }});
    }
    if (isTo(to, LOGIN_PAGE_PATH) && isAuthenticated() && isAutoLogin()) {
      return next({ path: HOME_PAGE_PATH});
    }
    // 如果路由不需要鉴权，直接允许导航
    next();
  })
}

/**
 * @description 注册路由
 * @param menus 菜单
 */
export const registerRoutes = async (menus: Menu[] = []) => {
  let index = -1;
  if (menus.length === 0) return;
  while(++index < menus.length) {
    let menu = menus[index];
    menu.children = menu.children || [];
    if (menu.children.length === 0)  {
      router.addRoute({path: menu.path, component: Layout, meta: { requiresAuth: true }})
      continue
    }
    menu.children.forEach(subMenu => {
      router.addRoute({ path: subMenu.path, component: Layout, meta: { requiresAuth: true } })
    })
  }
  routerInterceptor(menus)
  return menus
}

export default router;