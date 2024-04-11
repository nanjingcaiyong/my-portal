import { createApp, reactive } from 'vue';
import App from './App.vue';
import Router, { registerRoutes } from './router';
import 'tailwindcss/tailwind.css';
import { initI18n } from '@src/languages';
import type { Menu } from '@src/apis/models/MenuModel'
import { start } from 'qiankun';

const store = reactive<{
  menus: Menu[], 
  account: Record<string, any>,
  updateAccount: (account: Record<string, any>) => void
}>({
  menus: [],
  account: {},
  updateAccount: (account: Record<string, any>) => {
    store.account = account
  }
})

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
  const res = await $API.MENU.queryList<MenuModel>()
  if (res.success && res.data.length) {
    store.menus = res.data;
    return res.data;
  }
  return []
}

queryMenuList()
  .then(registerRoutes)
  .then(bootstrap)

start();






