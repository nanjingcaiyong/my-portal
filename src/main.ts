import { createApp } from 'vue';
import App from './App.vue';
import Router, { registerRoutes } from '@src/router';
import 'tailwindcss/tailwind.css';
import { initI18n } from '@src/languages';
import type { Menu } from '@src/apis/models/MenuModel'
import { rootStore } from '@src/store'


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
 * @description 请求菜单数据
 * @returns 
 */
const queryMenuList = async () => {
  const res = await $API.MENU.queryList<MenuModel>();
  if (res.success && res.data.length) {
    rootStore.menus = res.data;
    return res.data;
  }
  return []
}

queryMenuList()
  .then(registerRoutes)
  .then(bootstrap)






