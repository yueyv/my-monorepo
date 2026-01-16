<template>
  <div id="chart"></div>
</template>

<script setup lang="ts">
import * as zrender from 'zrender';
onMounted(() => {
  const chart = zrender.init(document.getElementById('chart'), {
    renderer: 'canvas',
  });
  const line = new zrender.Line({
    shape: {
      x1: 0,
      y1: 0,
      x2: 800,
      y2: 800,
    },
    style: {
      stroke: 'red',
      lineWidth: 10,
    },
    draggable: true,
  });

  const circle = new zrender.Circle({
    shape: {
      cx: 100,
      cy: 100,
      r: 50,
    },
    style: {
      fill: 'blue',
      lineWidth: 10,
      opacity: 0.5,
      shadowBlur: 10,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowOffsetX: 10,
      shadowOffsetY: 10,
    },
    draggable: true,
  });

  chart.add(circle);

  // 添加 Circle 动画
  // 位置动画：从 (100, 100) 移动到 (400, 300)
  circle
    .animate('shape')
    .when(1000, { cx: 400, cy: 300 })
    .done(function () {
      console.log('位置动画完成');
      // 动画完成后，开始大小动画
      circle
        .animate('shape', false)
        .when(800, { r: 80 })
        .when(1600, { r: 50 })
        .done(function () {
          console.log('大小动画完成');
          // 大小动画完成后，开始样式动画
          circle
            .animate('style', true)
            .when(1000, {
              fill: 'green',
              opacity: 1,
            })
            .when(2000, {
              fill: 'blue',
              opacity: 0.5,
            })
            .done(function () {
              console.log('样式动画完成');
            })
            .start();
        })
        .start();
    })
    .start();

  chart.add(line);

  line
    .animate('style', false)
    .delay(1000)
    .when(2000, { stroke: 'green' })
    .done(function () {
      // Animation done
      console.log('动画结束');
    })
    .start();
  line.animateTo(
    {
      style: {
        stroke: 'green',
        lineWidth: 1,
      },
      shape: {
        x2: 2000,
        y2: 800,
      },
    },
    {
      duration: 2000,
      done: function () {
        console.log('动画结束');
      },
    }
  );
});
</script>
<style scoped lang="scss">
#chart {
  width: 100%;
  height: $content-height;
}
</style>
