<template>
  <table-layout>
    <template #header>
      <div class="flex">
        <el-form-item label="核算主体">
          <el-select value-key="" placeholder="" clearable filterable @change=""></el-select>
        </el-form-item>

        <el-form-item label="目标年">
          <el-date-picker type="yearrange" />
        </el-form-item>
        <el-form-item label="减排目标类型">
          <el-select value-key="" placeholder="" clearable filterable @change=""></el-select>
        </el-form-item>
        <div class="flex-grow"></div>
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
      <el-table-column prop="name" label="核算主体" align="center"></el-table-column>
      <el-table-column label="目标年" align="center"></el-table-column>
      <el-table-column label="减排目标类型" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-tooltip content="编辑" placement="top">
            <el-button type="success" size="large" @click="editDialog(row)" link>
              <el-icon :size="24"><Edit /></el-icon>
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
    <el-dialog append-to-body v-model="dialogVisible" top="30vh" draggable width="500px">
      <template #title>
        <div class="flex content-center">
          <el-text>减排目标</el-text>
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
        label-width="100px"
      >
        <el-form-item label="核算主体">
          <el-input v-model.trim="form.name" placeholder="请输入名称" class="w-full" clearable />
        </el-form-item>
        <el-form-item label="目标年">
          <el-date-picker type="year" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="减排目标类型">
          <el-tabs
            v-model="activeTab"
            tab-position="top"
            class="w-full"
            :stretch="true"
            @tab-click=""
          >
            <el-tab-pane label="基准年排放" name="baseYearEmissions">
              <el-form-item label="基准年">
                <el-date-picker type="year" style="width: 100%"></el-date-picker>
              </el-form-item>
              <el-form-item label="减少比例">
                <div class="flex w-full">
                  <el-text class="w-1/5">25%</el-text>
                  <div class="w-4/5">
                    <el-slider />
                  </div>
                </div>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="定级" name="grading">
              <el-form-item label="排放量">
                <el-input placeholder="" clearable @change="">
                  <template #suffix>kg</template>
                </el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="基准年强度" name="baseYearIntensity">
              <el-form-item label="基准年">
                <el-date-picker type="year" class="mb-2" style="width: 100%"></el-date-picker>
              </el-form-item>
              <el-form-item label="基准年GDP">
                <el-select
                  value-key=""
                  placeholder=""
                  class="mb-2"
                  clearable
                  filterable
                  @change=""
                ></el-select>
              </el-form-item>
              <el-form-item label="目标年GDP">
                <el-select value-key="" placeholder="" clearable filterable @change=""></el-select>
              </el-form-item>
              <el-form-item label="减少比例">
                <div class="flex w-full">
                  <el-text class="w-1/5">25%</el-text>
                  <div class="w-4/5">
                    <el-slider />
                  </div>
                </div>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="基准情景" name="baselineScenario">
              <el-form-item label="基准年">
                <el-date-picker type="year" style="width: 100%"></el-date-picker>
              </el-form-item>
              <el-form-item label="减少比例">
                <div class="flex w-full">
                  <el-text class="w-1/5">25%</el-text>
                  <div class="w-4/5">
                    <el-slider />
                  </div>
                </div>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
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
</template>
<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { Delete, Edit, Search, Plus, Minus, ArrowRight } from '@element-plus/icons-vue';
import TableLayout from '@my-monorepo/base-layout/components/TableLayout.vue';
import { ElPagination, FormInstance } from 'element-plus';
import { cloneDeep } from 'lodash-es';
const activeTab = ref('baseYearEmissions');
const dialogVisible = ref(false);
const dialogTitle = ref('first');
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
</script>
<style scoped lang="scss"></style>
