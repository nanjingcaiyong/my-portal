import { createApp } from 'vue';
import App from './App.vue';
import Router from './router';
import 'tailwindcss/tailwind.css';
import actions from '@src/store';
import { initI18n } from '@src/languages';

import { 
  registerMicroApps, 
  start,
  setDefaultMountApp
} from 'qiankun'

function bootstrap() {
  const app = createApp(App)
    .use(Router)
    .use(initI18n())
    .mount('#app')
}

const apps = [{
  name: 'app1', // 必选，微应用的名称，微应用之间必须确保唯一。
  entry: '//localhost:5174', // 微应用的入口
  container: '#app1', // 必选，微应用的容器节点的选择器或者 Element 实例
  activeRule: '/app1', // 必选，微应用的激活规则
  props: {
    route: '/app1',
    getGlobalState: actions.getGlobalState
  }
}, {
  name: 'app2', // 必选，微应用的名称，微应用之间必须确保唯一。
  entry: '//localhost:5175', // 微应用的入口
  container: '#app2', // 必选，微应用的容器节点的选择器或者 Element 实例
  activeRule: '/app2', // 必选，微应用的激活规则
  props: {
    route: '/app2',
    getGlobalState: actions.getGlobalState
  }
}]

bootstrap()
registerMicroApps(apps)
start()







