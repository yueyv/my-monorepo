<template>
  <div>
    <h1>Animate</h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'UI 效果',
  icon: 'Menu',
  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },
});
</script>
