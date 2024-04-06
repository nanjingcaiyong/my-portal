import { createI18n } from 'vue-i18n';
import zhCN from './zh-CN.json';
import enUS from './en-US.json';

export const initI18n = () => {
  return createI18n({
    legacy: false,
    locale: 'en-US',
    messages: {
      'zh-CN': zhCN,
      'en-US': enUS
    }
  })
}
