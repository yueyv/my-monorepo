<template>
  <div>
    <div>{{ Page }}</div>
    <h1>Post {{ id }}</h1>
    <NuxtLink to="/"> <el-button type="primary" size="large"> Back </el-button> </NuxtLink>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const { id } = route.params;
const nuxtApp = useNuxtApp();
const Page = ref('Page');
const data = ref<any>(null);

async function test() {
  const res = await useFetch('https://jsonplaceholder.typicode.com/posts/1');
  data.value = res.data.value;
}

// test();

nuxtApp.hook('page:start', async () => {
  Page.value = 'Page start';
  // 模拟耗时操作，触发加载进度条
});

nuxtApp.hook('page:finish', async () => {
  Page.value = 'Page finish';
});

await new Promise((resolve) => setTimeout(resolve, 1000));

definePageMeta({
  pageTransition: {
    name: 'rotate',
  },
  //   middleware(to, from) {
  //     if (to.meta.pageTransition && typeof to.meta.pageTransition !== 'boolean')
  //       to.meta.pageTransition.name =
  //         +to.params.id! > +from.params.id! ? 'slide-left' : 'slide-right';
  //   },
});

// 如果需要动态设置页面标题，使用 useHead
useHead({
  title: `Post ${id}`,
});
</script>
