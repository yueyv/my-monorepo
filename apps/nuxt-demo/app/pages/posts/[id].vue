<template>
  <div>
    <div>{{ Page }}</div>
    <h1>Post {{ id }}</h1>
    <NuxtLink to="/"> <el-button type="primary" size="large"> Back </el-button> </NuxtLink>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const { id } = route.params ?? 0;
const nuxtApp = useNuxtApp();
const Page = ref('Page');

nuxtApp.hook('page:start', async () => {
  Page.value = 'Page start';
});

nuxtApp.hook('page:finish', async () => {
  Page.value = 'Page finish';
});

await new Promise((resolve) => setTimeout(resolve, 1000));

definePageMeta({
  pageTransition: {
    name: 'rotate',
  },
});

// 如果需要动态设置页面标题，使用 useHead
useHead({
  title: `动态标题${id}`,
});
</script>
