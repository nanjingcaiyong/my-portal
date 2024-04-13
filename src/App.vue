<template>
  <router-view v-bind="store" />
</template>

<script setup lang="ts">
import type { Menu } from '@src/apis/models/MenuModel';
import { reactive } from 'vue';
import { getAccount } from '@src/utils';
const props = withDefaults(defineProps<{
  menus: Menu[]
}>(), {
  menus: () => ([])
})

const store = reactive({
  menus: props.menus,
  account: getAccount()
})

</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>