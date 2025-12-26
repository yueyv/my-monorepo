<template>
  <div class="text-blue-500 h-2000">
    <h1 class="text-primary-color">Demo</h1>
    <p>This is a demo page</p>
  </div>
</template>
<script setup lang="ts">
import { useTestStore } from '@/store/useTestStore';
const testStore = useTestStore();

testStore.setTest('test');
definePageMeta({
  hidden: true,
  title: '首页',
  order: 1,
});
</script>
<style lang="scss" scoped>
.text-primary-color {
  color: $secondary-color;
  text-decoration: underline;
}
</style>
