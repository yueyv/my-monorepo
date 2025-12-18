<template>
  <div>
    <div class="w-full h-300px bg-green-50"></div>

    <div class="side-scrolling" ref="scrollContainer">
      <div class="animate-container">
        <div class="animate-item flex items-center" ref="animateItem">
          <div
            class="text-white text-60px"
            v-for="index in Array.from({ length: 200 }, (_, index) => index)"
            :key="index"
          >
            {{ index }}
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-300px bg-green-50"></div>
  </div>
</template>
<script setup lang="ts">
import { isNil } from 'lodash-es';
definePageMeta({
  title: '垂直滚动模拟横向滚动',
  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },
});

const animateItem = ref<HTMLElement>();
onMounted(() => {
  const scrollContainer = document.querySelector('.app-main-scrollbar') as HTMLElement;

  scrollContainer.addEventListener('scroll', () => {
    window.requestAnimationFrame(() => {
      if (isNil(animateItem.value) || scrollContainer.scrollTop - 300 - 64 <= 0) return;
      animateItem.value.style.transform = `translateX(${300 + 64 - scrollContainer.scrollTop}px)`;
    });
  });
});
</script>
<style lang="scss" scoped>
.side-scrolling {
  height: 5000px;
  width: 100vw;
  background-color: #eddbff;
  .animate-container {
    width: 500px;
    height: 400px;
    // 使用 fixed 定位，配合 GSAP 控制水平移动
    position: sticky;
    top: calc(50% - 200px);
    left: calc(50% - 250px);
    border-radius: 10px;
    box-shadow: 10px 10px 10px 0 #00000030;
    filter: drop-shadow(10px 10px 10px #00000030);
    overflow: hidden;
    .animate-item {
      height: 100%;
      width: 5000px;
      background: linear-gradient(to right, #0408d9, #03c5c2);
    }
  }
}
</style>
