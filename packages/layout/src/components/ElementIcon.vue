<template>
  <el-icon :size="size">
    <component :is="icons[icon]" />
  </el-icon>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
import * as ElementIcons from '@element-plus/icons-vue';

const icons = ElementIcons as any;

defineProps({
  icon: {
    type: String,
    default: 'Eleme',
  },
  size: {
    type: Object as PropType<String | Number>,
    default: '24px',
  },
});
</script>
<style lang="scss" scoped></style>
