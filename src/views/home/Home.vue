<template>
  <a-layout class="content h-[100vh]">
    <a-layout-sider v-model:collapsed="store.collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu 
        v-if="store.items.length" 
        v-model:selectedKeys="store.selectedKeys" 
        theme="dark" 
        mode="inline"
        :router="true"
        :items="store.items"
        @click="onClickMenuItem"
      >
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="store.collapsed"
          class="trigger"
          @click="() => (store.collapsed = !store.collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (store.collapsed = !store.collapsed)" />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <div id="app1"></div>
        <div id="app2"></div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref, reactive, VueElement, h } from 'vue';
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import type { MenuProps, ItemType } from 'ant-design-vue';
const store = reactive<{
  items: ItemType[],
  selectedKeys: string[],
  collapsed: boolean
}>({
  items: [],
  selectedKeys: ['1'],
  collapsed: false
})

/**
 * @description 数据转菜单参数格式
 * @param label 文案
 * @param key id
 * @param to 链接
 * @param icon 图标
 * @param children 
 * @param type 
 */
function getItem(label: VueElement | string, key: string, to: string, icon?: any, children?: ItemType[], type?: 'group',): ItemType {
  return { key, icon, to, children, label, type } as ItemType;
}

/**
 * @description list 转 tree
 * @param menuList 菜单列表
 */
function menuToTree(menuList: any[] = []): any {
  if (menuList.length === 0) return undefined;
  return menuList.map(t => {
    const args = [t.menuName, t.id, t.path, () => h(UserOutlined), menuToTree(t.children)]
    return getItem.apply(null, args as any)
  })
}

/**
 * @description 菜单点击
 * @param item 菜单
 */
const onClickMenuItem = (item: any) => {
  router.push({
    path: item.item.to
  })
}

const main = async () => {
  const res = await $API.MENU.queryList<any>()
  if (res.success && res.data.length) {
    store.items = menuToTree(res.data);
  }
}
main()
</script>
<style lang="less">
.content {
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }

  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }

  .site-layout .site-layout-background {
    background: #fff;
  }
}

</style>
