<template>
  <div class="w-full h-full flex flex-col">
    <div v-if="props.header" class="w-full flex items-center justify-center px-2 h-10">
      <div>
        {{ props.title }}
      </div>
      <div class="flex-grow"></div>
      <div>
        <el-tooltip content="新增文件" placement="top">
          <el-button type="primary" size="large" @click="" link>
            <el-icon :size="24"><Plus /></el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip content="新增文件夹" placement="top">
          <el-button type="primary" size="large" @click="" link>
            <el-icon :size="24"><FolderAdd /></el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip content="编辑" placement="top">
          <el-button type="success" size="large" @click="editFunction()" link>
            <el-icon :size="24"><Edit /></el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip content="删除" placement="top">
          <el-button type="danger" size="large" @click="" link>
            <el-icon :size="24"><Delete /></el-icon>
          </el-button>
        </el-tooltip>
      </div>
    </div>
    <div class="py-2">
      <el-input v-model="filterText" placeholder="请输入过滤条件" clearable></el-input>
    </div>
    <div class="flex-grow pt-2">
      <el-scrollbar>
        <el-tree
          ref="treeRef"
          :data="props.data"
          :filter-node-method="filterNode"
          :props="{
            children: 'children',
            label: 'label',
          }"
          default-expand-all
          highlight-current
          node-key="id"
        >
          <template #default="{ data }">
            <div class="flex w-full justify-between items-center">
              <div class="flex">
                <div v-if="data?.children?.length">
                  <el-icon><FolderOpened /></el-icon>
                </div>
                <div v-else>
                  <el-icon><Document /></el-icon>
                </div>
                <div class="px-2">{{ data.label }}</div>
              </div>
              <!-- 定义插槽功能 -->
              <div>
                <slot name="function" :isChild="!data.children?.length"></slot>
              </div>
            </div>
          </template>
        </el-tree>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { Delete, Edit, FolderAdd, Plus, FolderOpened, Document } from '@element-plus/icons-vue';
import { ElTree } from 'element-plus';
const filterText = ref('');
const treeRef = ref<InstanceType<typeof ElTree>>();
const props = defineProps({
  header: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  data: {
    type: Array,
    default: {},
  },
});
const emits = defineEmits(['update:modelValue', 'edit']);
const editFunction = () => {
  emits('edit');
};
watch(
  () => filterText.value,
  (val) => {
    treeRef.value!.filter(val);
  }
);
const filterNode = (value: string, data: any) => {
  if (!value) return true;
  return data.label.includes(value);
};
</script>
<style scoped lang="scss"></style>
