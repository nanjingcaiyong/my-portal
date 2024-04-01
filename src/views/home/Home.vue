<template>
  <a-layout class="content h-[100vh]">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <router-link to="/app1/page1">
            app1
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <router-link to="/app1/page2">
            app2
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <video-camera-outlined />
          <router-link to="/app2/page1">
            app2_page1
          </router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <video-camera-outlined />
          <router-link to="/app2/page2">
            app2_page2
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
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
import { ref } from 'vue';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(false);
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
