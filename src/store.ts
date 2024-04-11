import { initGlobalState, MicroAppStateActions } from 'qiankun';
import { reactive } from 'vue';
import { Menu } from '@src/apis/models/MenuModel';

const store: Record<string, any> = {
  token: ''
}

const actions = initGlobalState(store) as MicroAppStateActions & Record<string, any>;

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

export const rootStore = reactive<{
  menus: Menu[], 
  account: Record<string, any>,
  updateAccount: (account: Record<string, any>) => void
}>({
  menus: [],
  account: {},
  updateAccount: (account: Record<string, any>) => {
    debugger
    rootStore.account = account
  }
})

export default actions;