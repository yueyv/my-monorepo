<template>
  <footer class="w-full footer-container bg-blue-100 flex items-center justify-center">
    <p class="text-sm">© 2025 Nuxt Demo</p>
  </footer>
</template>

<script setup lang="ts">
// Footer 组件逻辑
</script>
<style lang="scss" scoped>
.footer-container {
  height: $footer-height;
}
</style>
<style lang="scss">
/* 全局样式：响应暗色主题 */
html.dark {
  .footer-container {
    background-color: $dark-bottom-bg-color;
    color: $dark-text-color;
  }
}
</style>
