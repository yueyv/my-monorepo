<template>
  <canvas id="canvas" ref="canvas"></canvas>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useSecondScene } from '../hooks/secondScene';
const canvas = ref(null);
onMounted(() => {
  const { animate } = useSecondScene(canvas.value);
  animate();
});
</script>
<style scoped lang="scss"></style>
