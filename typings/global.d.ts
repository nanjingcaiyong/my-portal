// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Router } from 'vue-router';
import { UnwrapNestedRefs } from 'vue';

declare global {
  interface Window {
    router: {
      [key: string]: any
    }
  }
  type createStore = <T>(target: T) => UnwrapNestedRefs<T>

  const router: Router
}



declare module 'axios' {
  export interface AxiosInstance {
    [key: string]: any;
  }
}

export {};