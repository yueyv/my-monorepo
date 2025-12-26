<template>
  <header class="w-full px-4 header-container flex items-center justify-end">
    <UIThemeSwitch />
  </header>
</template>

<script setup lang="ts">
// Header 组件逻辑
</script>
<style lang="scss" scoped>
.text-primary-color {
  color: $secondary-color;
  text-decoration: underline;
}

.header-container {
  height: $header-height;
}
</style>

<style lang="scss">
/* 全局样式：响应暗色主题 */
html.dark {
  .header-container {
    background-color: $dark-header-bg-color;
  }
  .text-color {
    color: $dark-text-color;
  }
}
</style>
