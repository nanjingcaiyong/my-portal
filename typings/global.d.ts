// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Router } from 'vue-router';
import { UnwrapNestedRefs } from 'vue';
import { AxiosRequestConfig } from 'axios';

type Method = 'get'| 'delete'| 'post'| 'put'| 'cancelGet' | 'cancelPost';

declare global {
  interface Window {
    router: {
      [key: string]: any
    }
  }
  type createStore = <T>(target: T) => UnwrapNestedRefs<T>

  const router: Router

  type API = {
    AUTH: {
      [key: string]: <T>(params: any, resetConfig?: AxiosRequestConfig ) => Promise<T>
    },
    MENU: {
      [key: string]: <T>(params?: any, resetConfig?: AxiosRequestConfig ) => Promise<T>
    }
  }

  const $API: API

 type ApiConfig = {
    name: string,
    path: string,
    type: Method,
    moduleName?: string
  }
}



declare module 'axios' {
  export interface AxiosInstance {
    [key: string]: any;
  }
}

export {};