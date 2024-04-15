import { reactive } from 'vue';

export const rootStore = reactive<{
  menus: IMenu[], 
  account: Record<string, any>,
  updateAccount: (account: Record<string, any>) => void
}>({
  menus: [],
  account: {},
  updateAccount: (account: Record<string, any>) => {
    rootStore.account = account
  }
})