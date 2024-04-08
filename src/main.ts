import { createApp } from 'vue';
import App from './App.vue';
import Router from './router';
import 'tailwindcss/tailwind.css';
import actions from '@src/store';
import { initI18n } from '@src/languages';
import { Home } from '@src/views'
import type { Menu } from '@src/apis/models/MenuModel'

import { 
  loadMicroApp,
  start
} from 'qiankun';

/**
 * @description 挂载应用
 * @param menus 菜单
 */
const bootstrap = (menus: Menu[] = []) => {
  const app = createApp(App, {menus})
    .use(Router)
    .use(initI18n())
    .mount('#app')
    return menus
}

/**
 * @description 注册路由
 * @param menus 菜单
 */
const registerRootes = async (menus: Menu[] = []) => {
  let index = -1;
  if (menus.length === 0) return;
  while(++index < menus.length) {
    let menu = menus[index];
    menu.children = menu.children || [];
    if (menu.children.length === 0) continue;
    menu.children.forEach(subMenu => {
      Router.addRoute({ path: subMenu.path, component: Home })
    })
  }
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

/**
 * @description 请求菜单数据
 * @returns 
 */
const queryMenuList = async () => {
  const res = await $API.MENU.queryList<MenuModel>()
  if (res.success && res.data.length) {
    return res.data;
  }
  return []
}

queryMenuList()
  .then(registerRootes)
  .then(bootstrap)
  .then(registerSystem)

start();






