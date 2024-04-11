<template>
  <a-watermark :content="store.account?.account">
    <router-view  v-bind="store" />
  </a-watermark>
</template>

<script setup lang="ts">
import type { Menu } from '@src/apis/models/MenuModel';
import { reactive } from 'vue';
import { PORTAL_USER_KEY, getAccount } from '@src/utils'
const props = withDefaults(defineProps<{
  menus: Menu[]
}>(), {
  menus: () => ([])
})

const store = reactive({
  menus: props.menus,
  account: JSON.parse(localStorage.getItem(PORTAL_USER_KEY) || '{}')
})

</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>