<script lang="ts" setup>
interface Props {
  list: any[];
}

const props = defineProps<Props>();

function NotifyList() {
  return props.list;
}
</script>

<template>
  <el-empty v-if="props.list.length === 0" />
  <!-- 使用外部传入的vnode渲染 -->
  <NotifyList />
</template>

<style lang="scss" scoped>
.card-container {
  margin-bottom: 10px;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .card-title {
      font-weight: bold;
      margin-right: 10px;
    }
    .card-time {
      font-size: 12px;
      color: var(--el-text-color-secondary);
    }
    .card-avatar {
      display: flex;
      align-items: center;
    }
  }
  .card-body {
    font-size: 12px;
  }
}
</style>
