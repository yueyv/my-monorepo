<template>
  <div>
    <h1>Animate</h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'ZRender 演示',
  icon: ElIconDataLine,
  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },
});
</script>
