<template>
  <div class="flex mt-2">
    <div v-for="(item, index) in breadcrumbList.entries()">
      <div v-if="showBreadcrumbList(item, index)" class="mr-1">
        <el-text class="breadcrumb-item" @click="changeBreadcrumbList(item, index)">
          {{ item[1] }}<el-icon><ArrowRight /></el-icon
        ></el-text>
      </div>
    </div>
    <div>
      <el-text class="breadcrumb-item">{{ type }}</el-text>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, PropType, ref, onMounted } from 'vue';
import { ElText } from 'element-plus';
import { ArrowRight } from '@element-plus/icons-vue';
import { isEmpty } from 'lodash-es';
const props = defineProps({
  modelValue: {
    type: Object as PropType<Map<string, string>>,
    default: () => {},
  },
});
const emit = defineEmits(['update:modelValue', 'changeLevel']);
const breadcrumbList = computed({
  get: () => {
    return props.modelValue;
  },
  set: (val) => emit('update:modelValue', val),
});
const type = ref('当前选择');
const showBreadcrumbList = (item: [string, string], index: number) => {
  if (!isEmpty(item[1])) {
    type.value = Array.from(breadcrumbList.value.keys())[index + 1];
    return true;
  }
  return false;
};
const changeBreadcrumbList = (item: [string, string], index: number) => {
  let flag = false;
  for (const [key, _] of breadcrumbList.value.entries()) {
    if (key === item[0]) {
      emit('changeLevel', index + 1);
      type.value = item[0];
      flag = true;
    }
    if (flag) {
      breadcrumbList.value.set(key, '');
    }
  }
};
onMounted(() => {
  // 拿初始值
  type.value = Array.from(breadcrumbList.value.keys())
    .map((item) => {
      if (isEmpty(breadcrumbList.value.get(item))) {
        return item;
      } else {
        return '';
      }
    })
    .flat()
    .filter((item) => !isEmpty(item))[0];
});
</script>
<style scoped lang="scss">
.breadcrumb-item {
  font-size: 0.8875rem;
  &:hover {
    color: #c5c5c5;
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
