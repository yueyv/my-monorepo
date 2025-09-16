<template>
  <div class="flex h-full">
    <div class="flex flex-col w-1/3 h-full p-4">
      <file-tree :data="treeData" :header="false">
        <template v-slot:function="slotProps">
          <div v-if="slotProps.isChild">
            <el-tooltip content="编辑" placement="top">
              <el-button type="success" size="large" @click="" link>
                <el-icon><Edit /></el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button type="danger" size="large" @click="" link>
                <el-icon><Delete /></el-icon>
              </el-button>
            </el-tooltip>
          </div>
        </template>
      </file-tree>
    </div>
    <div class="flex-grow h-full flex flex-col border-slate-100 rounded-sm border-solid">
      <formula-template :data="formula"></formula-template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import FormulaTemplate from '@/components/FormulaTemplate.vue';
import { ElTree } from 'element-plus';
import { Delete, Edit } from '@element-plus/icons-vue';
import FileTree from '@/components/FileTree.vue';
const queryParams = ref({
  filterText: '',
});
const formula = ref({
  label: '使用六氟化硫设备修理与退役过程中产生的六氟化硫排放',
  formula: '((v1+v2)*六氟化硫的温室气体潜能)',
  children: [
    {
      label: 'v1:使用六氟化硫设备退役过程产生的六氟化硫排放',
      formula: '(v1-v2)[退役设备数量]',
      children: [
        { label: 'v1:退役设备的六氟化硫容量' },
        {
          label: 'v2:退役设备的六氟化硫实际回收量',
        },
      ],
    },
    {
      label: 'v1:使用六氟化硫设备修理过程产生的六氟化硫排放',
      formula: '(v1-v2)[修理设备数量]',
      children: [
        { label: 'v1:修理设备的六氟化硫容量' },
        {
          label: 'v2:修理设备的六氟化硫实际回收量',
        },
      ],
    },
  ],
});
const treeRef = ref<InstanceType<typeof ElTree>>();
const treeData = [
  {
    id: 1,
    label: '电网企业',
    children: [
      {
        id: 4,
        label: '二氧化碳排放总量',
        children: [
          {
            id: 9,
            label: '使用六氟化硫设备修理与退役过程中产生的六氟化硫排放（吨二氧化碳）',
          },
          {
            id: 10,
            label: '输配电损失引起的二氧化碳排放总量（吨二氧化碳）',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
];
watch(
  () => queryParams.value.filterText,
  (val) => {
    treeRef.value!.filter(val);
  }
);
</script>
<style scoped lang="scss"></style>
