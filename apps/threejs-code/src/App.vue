<template>
  <div class="w-full h-full flex justify-center items-center">
    <!-- <SecondScene /> -->
    <ThirdScene />
  </div>
</template>
<script setup lang="ts">
import SecondScene from './components/SecondScene.vue';
import ThirdScene from './components/ThirdScene.vue';
</script>

<style scoped>
.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
.flex {
  display: flex;
}
.justify-center {
  justify-content: center;
}
.items-center {
  align-items: center;
}
</style>
