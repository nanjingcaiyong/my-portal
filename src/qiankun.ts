import { loadMicroApp } from 'qiankun';
import { Menu } from '@src/apis/models/MenuModel';
import { LOGIN_PAGE_PATH, HOME_PAGE_PATH } from '@src/utils';
import { initGlobalState, MicroAppStateActions } from 'qiankun';
const notLoadAppPages = [LOGIN_PAGE_PATH, HOME_PAGE_PATH];// 不需要接入微应用的页面 


const store: Record<string, any> = {
  token: ''
}

export const actions = initGlobalState(store) as MicroAppStateActions & Record<string, any>;

/**
 * @description 监听数据变化
 */
actions.onGlobalStateChange((state, prevState) => {
  for(const key in state) {
    store[key] = state[key]
  }
})

actions.getGlobalState = (key: string) => {
  return key ? store[key] : store
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

/**
 * @description 页面加载微应用
 * @param to 
 * @param menus 菜单
 */ 
export const pageLoadMicroApp = (menus?: Menu | Menu[]) => {
  if (menus === undefined) return;
  registerSystem(Array.isArray(menus) ? menus : [menus])
}