<template>
  <div class="w-full h-full p-4 flex">
    <div class="w-1/3 h-full">
      <el-form label-width="80px">
        <el-form-item label="核算主体">
          <el-select value-key="" placeholder="" clearable filterable @change=""></el-select>
        </el-form-item>
      </el-form>
      <div class="flex-grow">
        <file-tree @edit="showEdit()" :header="true" title="分类树" :data="treeData"></file-tree>
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
    <el-dialog append-to-body v-model="dialogVisible" top="30vh" draggable width="450px">
      <template #title>
        <div class="flex content-center">
          <el-text>分类</el-text>
          <el-icon><ArrowRight /></el-icon>
          <el-text v-if="dialogTitle == '新增'">新增</el-text>
          <el-text v-else>编辑</el-text>
        </div>
      </template>
      <el-form
        :model="form"
        ref="formRef"
        class="w-full p-4"
        label-position="left"
        label-width="80px"
      >
        <el-form-item label="名称">
          <el-input placeholder="请输入名称" class="w-full" clearable />
        </el-form-item>
        <el-form-item label="父分类">
          <el-select value-key="" placeholder="" clearable filterable @change=""></el-select>
        </el-form-item>
        <el-form-item label="经度">
          <el-input placeholder="请输入" class="w-full" clearable />
        </el-form-item>
        <el-form-item label="维度">
          <el-input placeholder="请输入" class="w-full" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <div>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import FileTree from '@/components/FileTree.vue';
import FormulaTemplate from '@/components/FormulaTemplate.vue';
import { ref, nextTick } from 'vue';
const dialogVisible = ref(false);
const form = ref({});
const formRef = ref();
const dialogTitle = ref('');
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

const showEdit = async () => {
  dialogVisible.value = true;
  dialogTitle.value = '编辑';
  await nextTick();
  formRef.value?.resetFields();
};
</script>
<style scoped lang="scss"></style>
