<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts" setup>
import { onBeforeUnmount } from 'vue';

import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { isEmpty } from 'lodash-es';
function handleMicroAppData(data: any) {
  const rootElement = document.querySelector('#app') as HTMLElement;
  if (!isEmpty(rootElement)) {
    rootElement.style.height = data.containerHeight || '100vh';
  } else {
    return;
  }
}
if (window.__MICRO_APP_ENVIRONMENT__) {
  window.microApp.addDataListener(handleMicroAppData, true);
} else {
  const rootElement = document.querySelector('#app')! as HTMLElement;
  rootElement.style.height = '100vh';
}
onBeforeUnmount(() => {
  window.microApp.clearDataListener();
});
</script>
