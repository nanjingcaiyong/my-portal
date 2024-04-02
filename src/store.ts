import { initGlobalState, MicroAppStateActions } from 'qiankun';

const store: Record<string, any> = {
  token: ''
}

const actions = initGlobalState(store) as MicroAppStateActions & Record<string, any>;

actions.onGlobalStateChange((state, prevState) => {
  console.log('数据变化', state, prevState)
  for(const key in state) {
    store[key] = state[key]
  }
})

actions.getGlobalState = (key: string) => {
  return key ? store[key] : store
}

export default actions;