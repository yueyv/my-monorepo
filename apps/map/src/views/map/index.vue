<template>
  <div class="w-full h-full">
    <canvas id="mapCanvas" ref="mapCanvas" :width="width" :height="height"></canvas>
    <div id="infoTip"></div>
  </div>
</template>

<script setup lang="ts">
// 1. 获取DOM元素
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import mapJson from '@/assets/map/100000_full.json';

import { useMap } from '@/hooks/useMap';
const width = ref(window.innerWidth);
const height = ref(window.innerHeight);
const mapCanvas = ref<HTMLCanvasElement | null>();

const mapConfig = {
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  defaultFill: 'rgba(3, 10, 32, 0.31)', // 统一使用 rgba 格式，透明度 0.31 (50/255 ≈ 0.31)
  hoverFill: 'rgba(64, 158, 255, 0.8)', // 设置适当的透明度
  strokeColor: 'rgba(53, 213, 210, 1)', // 边框保持不透明
  strokeWidth: 1,
};

const { initMap, cleanup } = useMap(mapJson, mapCanvas, mapConfig);

// 防抖函数
let resizeTimer: NodeJS.Timeout | null = null;

const handleResize = async () => {
  width.value = window.innerWidth;
  height.value = window.innerHeight;

  await nextTick();

  // 确保canvas尺寸已更新
  if (mapCanvas.value) {
    mapCanvas.value.width = width.value;
    mapCanvas.value.height = height.value;
  }

  // 重新初始化地图
  initMap();
};

onMounted(() => {
  initMap();
});

window.addEventListener('resize', () => {
  if (resizeTimer) {
    clearTimeout(resizeTimer);
  }
  resizeTimer = setTimeout(handleResize, 100);
});

onUnmounted(() => {
  cleanup();
  if (resizeTimer) {
    clearTimeout(resizeTimer);
  }
});
</script>

<style scoped lang="scss">
/* 画布样式：居中显示，添加边框 */
#mapCanvas {
  display: block;
  background: #515e5d;
}
/* 信息提示框：鼠标hover时显示区域名称 */
#infoTip {
  position: absolute;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  pointer-events: none; /* 避免遮挡鼠标事件 */
  opacity: 0;
  transition: opacity 0.2s;
}
</style>
