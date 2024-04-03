import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from "@vitejs/plugin-vue";
import Components from 'unplugin-vue-components/vite'
import {
  AntDesignVueResolver,
} from 'unplugin-vue-components/resolvers'
import inject from '@rollup/plugin-inject';
import path from 'path';
import { Plugin, UserConfig } from 'vite';

const resolve = (filePath: string) => path.resolve(__dirname, filePath);
const API_ENTRY_PATH = resolve('../src/apis/index.ts')
const STORE_ENTRY_PATH = resolve('../src/utils/reactive.ts');
const ROUTER_ENTRY_PATH = resolve('../src/router')

const plugins: Plugin[] = [
  vue(),
  vueJsx({}),
  inject({  // 全局注入。类似于 webpack 的 ProvidePlugin 属性
    $API: API_ENTRY_PATH,
    createStore: STORE_ENTRY_PATH,
    router: ROUTER_ENTRY_PATH
  }),
  Components({
    resolvers: [
      AntDesignVueResolver({
        importStyle: false,
      }),
    ],
  }),
]
const config: UserConfig = {
  base: '/',
  plugins,
  resolve: {
    extensions: [".js", ".jsx", ".mjs", ".ts", ".tsx", ".vue", ".json"],
    alias: {
      '@src': path.resolve(__dirname, '..' ,'src')
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import $API from '@/apis';`
  }
}

export default config