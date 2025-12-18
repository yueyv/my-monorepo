<template>
  <canvas id="canvas" ref="canvas"></canvas>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useFirstScene } from '../hooks/firstScene';
const canvas = ref(null);
onMounted(() => {
  const { animate } = useFirstScene(canvas.value);
  animate();
});
</script>
<style scoped lang="scss"></style>
