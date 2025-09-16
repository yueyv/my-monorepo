<template>
  <div class="w-full h-full p-4 flex">
    <div class="w-1/3 h-full">
      <div class="h-1/2">
        <file-tree :header="false" :data="treeData"></file-tree>
      </div>
      <div class="flex-grow">
        <file-tree :header="true" title="组织树" :data="treeData"></file-tree>
      </div>
    </div>
    <div class="flex-grow flex flex-col">
      <div class="w-full flex justify-center content-center">
        <el-form label-width="180px">
          <el-form-item label="核算标准">
            <el-select value-key="" placeholder="" clearable filterable @change=""></el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="flex-grow">
        <FormulaTemplate :data="formula"></FormulaTemplate>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import FileTree from '@/components/FileTree.vue';
import FormulaTemplate from '@/components/FormulaTemplate.vue';
import { ref } from 'vue';
const treeData = ref([
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
]);
const formula = ref({
  label: '输配电损失引起的二氧化碳排放总量',
  formula: '(v1*区域电网年平均供电排放因子)',
  children: [
    {
      label: 'v1:电损量',
      formula: '(v1-v2)',
      children: [
        { label: 'v1:供电量' },
        {
          label: 'v2:售电量',
        },
      ],
    },
  ],
});
</script>
<style scoped lang="scss"></style>
