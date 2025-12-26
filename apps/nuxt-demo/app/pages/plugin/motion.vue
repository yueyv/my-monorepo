<template>
  <ClientOnly>
    <div class="motion-demo">
      <h1>Motion-V 动画示例</h1>

      <!-- 淡入动画 -->
      <motion.div
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 1 }"
        class="demo-card"
      >
        <h3>淡入效果</h3>
        <p>从透明到不透明</p>
      </motion.div>

      <!-- 滑动进入 -->
      <motion.div
        :initial="{ x: -100, opacity: 0 }"
        :animate="{ x: 0, opacity: 1 }"
        :transition="{ duration: 0.8, delay: 0.2 }"
        class="demo-card"
      >
        <h3>滑动进入</h3>
        <p>从左侧滑入</p>
      </motion.div>

      <!-- 缩放动画 -->
      <motion.div
        :initial="{ scale: 0 }"
        :animate="{ scale: 1 }"
        :transition="{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 260, damping: 20 }"
        class="demo-card"
      >
        <h3>弹簧缩放</h3>
        <p>带弹性的缩放效果</p>
      </motion.div>

      <!-- 旋转 + 移动 -->
      <motion.div
        :initial="{ y: 50, rotate: -180, opacity: 0 }"
        :animate="{ y: 0, rotate: 0, opacity: 1 }"
        :transition="{ duration: 1, delay: 0.6 }"
        class="demo-card"
      >
        <h3>旋转进入</h3>
        <p>旋转 + 向上移动</p>
      </motion.div>

      <!-- 悬停交互 -->
      <motion.button
        :whileHover="{ scale: 1.1, backgroundColor: '#409eff' }"
        :whileTap="{ scale: 0.95 }"
        :transition="{ duration: 0.2 }"
        class="interactive-btn"
      >
        悬停我试试
      </motion.button>

      <!-- 列表动画 -->
      <div class="list-container">
        <motion.div
          v-for="(item, index) in items"
          :key="item"
          :initial="{ x: -50, opacity: 0 }"
          :animate="{ x: 0, opacity: 1 }"
          :transition="{ duration: 0.5, delay: index * 0.1 + 0.8 }"
          class="list-item"
        >
          {{ item }}
        </motion.div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { motion } from 'motion-v';

definePageMeta({
  title: 'Motion 演示',
  icon: ElIconVideoCamera,
});

const items = ['列表项 1', '列表项 2', '列表项 3', '列表项 4', '列表项 5'];
</script>

<style lang="scss" scoped>
.motion-demo {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    text-align: center;
    margin-bottom: 40px;
    color: #303133;
  }

  .demo-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    h3 {
      margin: 0 0 10px 0;
      font-size: 24px;
    }

    p {
      margin: 0;
      opacity: 0.9;
      font-size: 16px;
    }
  }

  .interactive-btn {
    width: 100%;
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    background: #67c23a;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    margin: 30px 0;
    box-shadow: 0 4px 12px rgba(103, 194, 58, 0.3);
  }

  .list-container {
    margin-top: 30px;

    .list-item {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      font-size: 16px;
      color: #303133;
      border-left: 4px solid #409eff;
    }
  }
}
</style>
