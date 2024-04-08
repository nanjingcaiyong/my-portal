<template>
  <a-watermark content="蔡勇">
    <router-view :menus="menus"></router-view>
  </a-watermark>
</template>

<script setup lang="ts">
import type { Menu } from '@src/apis/models/MenuModel';
withDefaults(defineProps<{
  menus: Menu[]
}>(), {
  menus: () => ([])
})
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>