<template>
  <div class="konva-page">
    <div class="header">
      <h1>Konva 画布演示</h1>
      <p>你可以拖动画布上的图形元素</p>
      <div class="controls">
        <el-button @click="addCircle" type="primary">添加圆形</el-button>
        <el-button @click="addRect" type="success">添加矩形</el-button>
        <el-button @click="addStar" type="warning">添加星形</el-button>
        <el-button @click="clearCanvas" type="danger">清空画布</el-button>
      </div>
    </div>

    <div class="canvas-container">
      <client-only>
        <v-stage
          ref="stage"
          :config="stageConfig"
          @mousedown="handleStageMouseDown"
          @touchstart="handleStageMouseDown"
        >
          <v-layer ref="layer">
            <!-- 背景网格 -->
            <v-line v-for="line in gridLines" :key="line.id" :config="line.config" />

            <!-- 动态添加的图形 -->
            <v-circle v-for="circle in circles" :key="circle.id" :config="circle.config" />

            <v-rect v-for="rect in rects" :key="rect.id" :config="rect.config" />

            <v-star v-for="star in stars" :key="star.id" :config="star.config" />

            <!-- 示例文字 -->
            <v-text :config="textConfig" />
          </v-layer>
        </v-stage>
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

definePageMeta({
  title: 'Konva 演示',
});

// 画布配置
const stageConfig = ref({
  width: 800,
  height: 600,
});

// 文字配置
const textConfig = ref({
  x: 20,
  y: 20,
  text: '欢迎使用 Konva！拖动图形试试看 🎨',
  fontSize: 20,
  fontFamily: 'Arial',
  fill: '#333',
});

// 动态图形数组
const circles = ref<any[]>([]);
const rects = ref<any[]>([]);
const stars = ref<any[]>([]);

// 生成网格线
const gridLines = computed(() => {
  const lines: any[] = [];
  const gridSize = 50;

  // 竖线
  for (let i = 0; i <= stageConfig.value.width; i += gridSize) {
    lines.push({
      id: `v-${i}`,
      config: {
        points: [i, 0, i, stageConfig.value.height],
        stroke: '#e0e0e0',
        strokeWidth: 1,
      },
    });
  }

  // 横线
  for (let i = 0; i <= stageConfig.value.height; i += gridSize) {
    lines.push({
      id: `h-${i}`,
      config: {
        points: [0, i, stageConfig.value.width, i],
        stroke: '#e0e0e0',
        strokeWidth: 1,
      },
    });
  }

  return lines;
});

// 添加圆形
const addCircle = () => {
  const id = `circle-${Date.now()}`;
  circles.value.push({
    id,
    config: {
      x: Math.random() * (stageConfig.value.width - 100) + 50,
      y: Math.random() * (stageConfig.value.height - 100) + 50,
      radius: 30 + Math.random() * 30,
      fill: getRandomColor(),
      stroke: '#000',
      strokeWidth: 2,
      draggable: true,
      shadowBlur: 10,
      shadowColor: 'rgba(0,0,0,0.3)',
      shadowOffset: { x: 5, y: 5 },
    },
  });
};

// 添加矩形
const addRect = () => {
  const id = `rect-${Date.now()}`;
  rects.value.push({
    id,
    config: {
      x: Math.random() * (stageConfig.value.width - 100) + 50,
      y: Math.random() * (stageConfig.value.height - 100) + 50,
      width: 60 + Math.random() * 40,
      height: 60 + Math.random() * 40,
      fill: getRandomColor(),
      stroke: '#000',
      strokeWidth: 2,
      draggable: true,
      shadowBlur: 10,
      shadowColor: 'rgba(0,0,0,0.3)',
      shadowOffset: { x: 5, y: 5 },
      rotation: Math.random() * 360,
    },
  });
};

// 添加星形
const addStar = () => {
  const id = `star-${Date.now()}`;
  stars.value.push({
    id,
    config: {
      x: Math.random() * (stageConfig.value.width - 100) + 50,
      y: Math.random() * (stageConfig.value.height - 100) + 50,
      numPoints: 5,
      innerRadius: 20,
      outerRadius: 40,
      fill: getRandomColor(),
      stroke: '#000',
      strokeWidth: 2,
      draggable: true,
      shadowBlur: 10,
      shadowColor: 'rgba(0,0,0,0.3)',
      shadowOffset: { x: 5, y: 5 },
      rotation: Math.random() * 360,
    },
  });
};

// 清空画布
const clearCanvas = () => {
  circles.value = [];
  rects.value = [];
  stars.value = [];
};

// 获取随机颜色
const getRandomColor = () => {
  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E2',
    '#F8B4D9',
    '#A8E6CF',
    '#FFD3B6',
    '#FFAAA5',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// 点击舞台背景
const handleStageMouseDown = (e: any) => {
  // 点击背景时可以添加逻辑
  if (e.target === e.target.getStage()) {
    console.log('点击了画布背景');
  }
};

// 初始化时添加一些示例图形
onMounted(() => {
  // 响应式调整画布大小
  const updateSize = () => {
    const container = document.querySelector('.canvas-container');
    if (container) {
      const width = Math.min(container.clientWidth - 40, 1200);
      const height = Math.min(window.innerHeight - 250, 600);
      stageConfig.value.width = width;
      stageConfig.value.height = height;
    }
  };

  updateSize();
  window.addEventListener('resize', updateSize);

  // 添加初始图形
  addCircle();
  addRect();
  addStar();
});
</script>

<style lang="scss" scoped>
.konva-page {
  height: $content-height;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 30px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 20px;
    opacity: 0.9;
  }

  .controls {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
  }
}

.canvas-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  max-width: 1240px;

  :deep(canvas) {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}
</style>
