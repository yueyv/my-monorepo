<template>
  <el-dialog append-to-body draggable v-model="visible" width="60%" @close="">
    <template #title>
      <div class="flex content-center">
        <el-text>{{ title }}</el-text>
        <el-icon><ArrowRight /></el-icon>
        <el-text>{{ type == OP_TYPE.UPDATE ? '编辑' : '' }}</el-text>
      </div>
    </template>
    <!-- TODO 写成传参 -->
    <el-form label-width="140px" :label-suffix="':'" :inline="true">
      <el-form-item label="碳活动名称">光伏发电量</el-form-item>
      <el-form-item label="单位">kWh</el-form-item>
      <el-form-item label="数据来源">能量云</el-form-item>
      <el-form-item>
        <el-tooltip content="刷新" placement="top">
          <el-button type="success" size="large" @click="" link>
            <el-icon :size="24"><Refresh /></el-icon>
          </el-button>
        </el-tooltip>
      </el-form-item>
    </el-form>
    <el-tabs class="px-16" :stretch="true" v-model="activeDateRange">
      <el-tab-pane label="日" name="daterange"></el-tab-pane>
      <el-tab-pane label="月" name="monthrange"></el-tab-pane>
      <el-tab-pane label="年" name="yearrange"></el-tab-pane>
      <el-tab-pane :disabled="true">
        <template #label>
          选择时间范围：
          <div class="w-65">
            <el-date-picker
              v-model="queryParams.timeRange"
              style="width: 100%"
              :type="activeDateRange"
            />
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane :disabled="true">
        <template #label>
          <el-tooltip content="下载" placement="top">
            <el-button type="success" size="large" @click="" link>
              <el-icon :size="24"><Download /></el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip content="上传" placement="top">
            <el-button type="success" size="large" @click="" link>
              <el-icon :size="24"><Upload /></el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip content="新增" placement="top">
            <el-button type="primary" size="large" @click="" link>
              <el-icon :size="24"><Plus /></el-icon>
            </el-button>
          </el-tooltip>
        </template>
      </el-tab-pane>
    </el-tabs>
    <div class="px-16 flex h-80">
      <div class="w-4/5 min-h-0 h-full">
        <div style="width: 100%; height: 100%">
          <v-chart
            :option="option"
            :update-options="{ notMerge: true }"
            :loading="chartLoading"
            autoresize
          />
        </div>
      </div>
      <div class="flex flex-grow h-full">
        <el-table :data="tableData" height="100%" border stripe>
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column prop="label" label="值"></el-table-column>
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { ArrowRight, Download, Plus, Refresh, Upload } from '@element-plus/icons-vue';
import { ref, computed } from 'vue';
import { OP_TYPE } from '@/constants';
import VChart from '@my-monorepo/base-layout/components/vue-echarts/index.ts';
const activeDateRange = ref('daterange');
const queryParams = ref<{
  timeRange?: any[];
}>({});
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: OP_TYPE.DEFAULT,
  },
});
const tableData = ref<any[]>([
  { date: '2023-01-01', value: 100 },
  { date: '2023-01-02', value: 200 },
  { date: '2023-01-02', value: 200 },
  { date: '2023-01-02', value: 200 },
  { date: '2023-01-02', value: 200 },
  { date: '2023-01-02', value: 200 },
  { date: '2023-01-02', value: 200 },
  { date: '2023-01-02', value: 200 },
  { date: '2023-01-02', value: 200 },
]);
const emits = defineEmits(['update:modelValue']);

const visible = computed({
  get: () => {
    return props.modelValue;
  },
  set: (v: any) => {
    emits('update:modelValue', v);
  },
});
const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52, 200, 334, 390, 330, 220],
    },
  ],
});
const chartLoading = ref(false);
</script>
<style scoped lang="scss"></style>
