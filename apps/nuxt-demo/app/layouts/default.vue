<template>
  <div class="flex flex-col h-screen w-screen justify-between items-center">
    <LayoutAppHeader />

    <el-scrollbar class="content-container" wrap-class="app-main-scrollbar">
      <slot />
    </el-scrollbar>
    <LayoutAppNav />
    <LayoutAppFooter />
  </div>
</template>
<script setup lang="ts">
const route = useRoute();

useHead({
  meta: [{ property: 'og:title', content: `应用名称 - ${route.meta.title}` }],
});
</script>
<style lang="scss" scoped>
.content-container {
  height: $content-height;
  width: 100%;
}
</style>
