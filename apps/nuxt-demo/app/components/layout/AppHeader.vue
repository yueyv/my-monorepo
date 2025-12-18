<template>
  <header class="w-full px-4 header-container bg-red-100 flex items-center justify-end">
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
