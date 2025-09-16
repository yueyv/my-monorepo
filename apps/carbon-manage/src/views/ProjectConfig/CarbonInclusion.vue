<template>
  <div class="w-full h-full flex">
    <div class="w-1/3 h-full p-4">
      <div class="flex-grow">
        <file-tree
          @edit="showEdit()"
          :header="true"
          title="碳普惠政策树"
          :data="treeData"
        ></file-tree>
      </div>
    </div>
    <div class="flex-grow flex flex-col">
      <table-layout>
        <template #header>
          <div class="flex">
            <div class="flex-grow"></div>
            <el-form-item label="名称">
              <el-input v-model="queryParams.name" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item>
              <el-tooltip content="查询" placement="top">
                <el-button type="success" size="large" @click="" link>
                  <el-icon :size="24"><Search /></el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip content="新增" placement="top">
                <el-button type="primary" size="large" @click="addDialog()" link>
                  <el-icon :size="24"><Plus /></el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button type="danger" size="large" @click="" link>
                  <el-icon :size="24"><Minus /></el-icon>
                </el-button>
              </el-tooltip>
            </el-form-item>
          </div>
        </template>
        <el-table v-loading="tableLoading" :data="tableData" class="custom-table" height="100%">
          <el-table-column prop="index" label="序号" align="center">
            <template #default="scope">
              <el-checkbox
                v-model="scope.row.checked"
                :label="scope.$index + 1 + (pageInfo.page - 1) * pageInfo.limit"
                :true-value="true"
                :false-value="false"
              />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="活动名称" align="center"></el-table-column>
          <el-table-column label="减排因子" align="center"></el-table-column>
          <el-table-column label="名称" align="center"></el-table-column>
          <el-table-column label="单位" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="{ row }">
              <el-tooltip content="编辑" placement="top">
                <el-button type="success" size="large" @click="editDialog(row)" link>
                  <el-icon :size="24"><Edit /></el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip content="统计" placement="top">
                <el-button type="primary" size="large" @click="showHistogram(row)" link>
                  <el-icon :size="24"><Histogram /></el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button type="danger" size="large" @click="" link>
                  <el-icon :size="24"><Delete /></el-icon>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <template #footer>
          <el-pagination
            background
            v-model:currentPage="pageInfo.page"
            v-model:page-size="pageInfo.limit"
            :total="pageInfo.total"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            @change=""
          ></el-pagination>
        </template>
        <el-dialog append-to-body v-model="dialogVisible" top="30vh" draggable width="450px">
          <template #title>
            <div class="flex content-center">
              <el-text>碳排因子类型</el-text>
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
            <el-form-item label="活动名称">
              <el-input
                v-model.trim="form.name"
                placeholder="请输入名称"
                class="w-full"
                clearable
              />
            </el-form-item>
            <el-form-item label="减排因子">
              <el-select value-key="" placeholder="" clearable filterable @change=""></el-select>
            </el-form-item>
            <el-form-item label="单位">
              <el-select value-key="" placeholder="" clearable filterable @change=""></el-select>
            </el-form-item>
          </el-form>
          <template #footer>
            <div>
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="">确认</el-button>
            </div>
          </template>
        </el-dialog>
      </table-layout>
    </div>
    <histogram-dialog
      v-model="histogramVisible"
      :title="histogramTitle"
      :type="opType"
    ></histogram-dialog>
    <el-dialog append-to-body v-model="dialogVisibleTree" top="30vh" draggable width="450px">
      <template #title>
        <div class="flex content-center">
          <el-text>碳普惠活动</el-text>
          <el-icon><ArrowRight /></el-icon>
          <el-text v-if="dialogTitleTree == '新增'">新增</el-text>
          <el-text v-else>编辑</el-text>
        </div>
      </template>
      <el-form
        :model="formTree"
        ref="formRef"
        class="w-full p-4"
        label-position="left"
        label-width="80px"
      >
        <el-form-item label="政策名称">
          <el-input placeholder="请输入名称" class="w-full" clearable />
        </el-form-item>

        <el-form-item label="积分系数">
          <div class="flex w-full">
            <el-select value-key="" placeholder="" clearable filterable @change=""></el-select>
            <div class="px-2">/</div>
            <el-select value-key="" placeholder="" clearable filterable @change=""></el-select>
          </div>
        </el-form-item>

        <el-form-item label="描述">
          <el-input type="textarea" placeholder="请输入" class="w-full" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <div>
          <el-button @click="dialogVisibleTree = false">取消</el-button>
          <el-button type="primary" @click="">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import FileTree from '@/components/FileTree.vue';
import { nextTick, ref } from 'vue';
import { Delete, Edit, Search, Plus, Minus, ArrowRight, Histogram } from '@element-plus/icons-vue';
import TableLayout from '@my-monorepo/base-layout/components/TableLayout.vue';
import { ElPagination, FormInstance } from 'element-plus';
import { cloneDeep } from 'lodash-es';
import { OP_TYPE } from '../../constants';
import HistogramDialog from '@/components/HistogramDialog.vue';
const opType = ref(OP_TYPE.DEFAULT);
const currentRow = ref();
const histogramVisible = ref(false);
const histogramTitle = ref('碳活动数据');
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

const dialogVisible = ref(false);
const dialogTitle = ref('');
const queryParams = ref<{
  name?: string;
}>({});
const pageInfo = ref<{
  page: number;
  limit: number;
  total?: number;
}>({
  page: 1,
  limit: 10,
  total: 2,
});
const tableData = ref<any[]>([
  {
    name: '矿山企业温室气体排放核算方法与报告指南（试行）',
    checked: true,
  },
  {
    name: '矿山企业温室气体排放核算方法与报告指南（试行）',
    checked: true,
  },
]);
const tableLoading = ref(false);
const form = ref<{
  en: string;
  name: string;
}>({
  name: '',
  en: '',
});
const formRef = ref<FormInstance>();
const addDialog = async () => {
  dialogTitle.value = '新增';
  dialogVisible.value = true;
  await nextTick();
  formRef.value?.resetFields();
};
const editDialog = async (row: any) => {
  dialogVisible.value = true;
  dialogTitle.value = '编辑';
  await nextTick();
  formRef.value?.resetFields();
  form.value = cloneDeep(row);
};
const showHistogram = async (row: any) => {
  histogramVisible.value = true;
  opType.value = OP_TYPE.UPDATE;
  currentRow.value = row;
  await nextTick();
};
const dialogVisibleTree = ref(false);
const formTree = ref({});
const formRefTree = ref();
const dialogTitleTree = ref('');
const showEdit = async () => {
  dialogVisibleTree.value = true;
  dialogTitleTree.value = '编辑';
  await nextTick();
  formRefTree.value?.resetFields();
};
</script>
<style scoped lang="scss"></style>
