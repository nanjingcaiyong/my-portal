import { reactive } from 'vue';
import type { Menu } from '@src/apis/models/MenuModel';

export const rootStore = reactive<{
  menus: Menu[], 
  account: Record<string, any>,
  updateAccount: (account: Record<string, any>) => void
}>({
  menus: [],
  account: {},
  updateAccount: (account: Record<string, any>) => {
    rootStore.account = account
  }
})