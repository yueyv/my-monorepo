<template>
  <router-view />
</template>
<script lang="ts" setup>
import { useElementConfig } from './hooks/useElementConfig';
import { useAppStore } from './store/modules/app';

useElementConfig({}, window.rootApp);

const appStore = useAppStore();
// TODO 根据实际查询
appStore.setAppName('项目管理');
</script>
<style lang="scss"></style>
