<template>
  <canvas id="canvas" ref="canvas"></canvas>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useThreeScene } from '../../hook/threeScene';
const canvas = ref(null);
onMounted(() => {
  const { animate } = useThreeScene(canvas.value);
  animate();
});
</script>
<style scoped lang="scss"></style>
