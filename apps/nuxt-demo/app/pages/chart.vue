<template>
  <div class="content-container">
    <v-chart :option="option" />
  </div>
</template>
<script setup lang="ts">
const option = ref({
  title: {
    text: 'ECharts Example',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
      ],
    },
  ],
});
definePageMeta({
  title: 'EChart 演示',
  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },
});
</script>
<style lang="scss" scoped>
.content-container {
  height: $content-height;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
