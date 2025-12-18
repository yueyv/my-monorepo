<template>
  <canvas id="canvas" ref="canvas"></canvas>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useThirdScene } from '../hooks/thirdScene';
const canvas = ref(null);
onMounted(() => {
  const { animate } = useThirdScene(canvas.value);
  animate();
});
</script>
<style scoped lang="scss"></style>
