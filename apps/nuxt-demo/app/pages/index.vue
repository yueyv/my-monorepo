<template>
  <div class="text-blue-500 h-2000 bg-green-100">
    <h1 class="text-primary-color">Demo</h1>
    <p>This is a demo page</p>
    <p>{{ testStore.getTest }}</p>
    <div class="flex gap-2">
      <NuxtLink to="/posts/1">
        <el-button type="primary" size="large"> Post 1 </el-button>
      </NuxtLink>
      <NuxtLink to="/posts/2">
        <el-button type="primary" size="large"> Post 2 </el-button>
      </NuxtLink>
      <NuxtLink to="/chart">
        <el-button type="primary" size="large"> Chart </el-button>
      </NuxtLink>
      <NuxtLink to="/konva">
        <el-button type="primary" size="large"> Konva </el-button>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useTestStore } from '@/store/useTestStore';
const testStore = useTestStore();

testStore.setTest('test');
definePageMeta({
  title: 'Index',
  order: 1,
});
</script>
<style lang="scss" scoped>
.text-primary-color {
  color: $secondary-color;
  text-decoration: underline;
}
</style>
