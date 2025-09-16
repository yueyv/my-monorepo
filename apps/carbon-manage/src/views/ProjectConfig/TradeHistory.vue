<template>
  <table-layout>
    <template #header>
      <el-form-item label="交易时间">
        <el-date-picker type="datetimerange" />
      </el-form-item>
      <el-form-item label="交易市场">
        <el-select value-key="" placeholder="" clearable filterable @change=""></el-select>
      </el-form-item>
      <el-form-item label="交易产品">
        <el-select value-key="" placeholder="" clearable filterable @change=""></el-select>
      </el-form-item>
      <el-form-item label="交易主体">
        <el-select value-key="" placeholder="" clearable filterable @change=""></el-select>
      </el-form-item>
      <el-form-item label="成交量" class="flex">
        <div class="w-15 mr-1 h-full">
          <el-select
            v-model="queryParams.turnover.label"
            value-key=""
            placeholder=""
            clearable
            filterable
            @change=""
          >
            <el-option :label="'>'" :value="1">></el-option>
          </el-select>
        </div>
        <div class="w-25">
          <el-input placeholder="" clearable @change="">
            <template #suffix>吨</template>
          </el-input>
        </div>
      </el-form-item>
      <el-form-item label="单价">
        <div class="w-15 mr-1 h-full">
          <el-select
            v-model="queryParams.turnover.label"
            value-key=""
            placeholder=""
            filterable
            @change=""
          >
            <el-option :label="'>'" :value="1">></el-option>
          </el-select>
        </div>
        <div class="w-25">
          <el-input placeholder="" clearable @change="">
            <template #suffix>元/吨</template>
          </el-input>
        </div>
      </el-form-item>
      <el-form-item label="成交额">
        <div class="w-15 mr-1 h-full">
          <el-select
            v-model="queryParams.turnover.label"
            value-key=""
            placeholder=""
            filterable
            @change=""
          >
            <el-option :label="'>'" :value="1">></el-option>
          </el-select>
        </div>
        <div class="w-25">
          <el-input placeholder="" @change=""><template #suffix>元</template></el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <el-checkbox></el-checkbox>
      </el-form-item>
      <el-form-item label="买入"></el-form-item>
      <el-form-item>
        <el-checkbox></el-checkbox>
      </el-form-item>
      <el-form-item label="卖出"></el-form-item>
      <el-form-item>
        <el-tooltip content="查询" placement="top">
          <el-button type="success" size="large" @click="" link>
            <el-icon :size="24"><Search /></el-icon>
          </el-button>
        </el-tooltip>
      </el-form-item>
    </template>
    <el-table v-loading="tableLoading" :data="tableData" class="custom-table" height="100%">
      <el-table-column label="交易时间" align="center"></el-table-column>
      <el-table-column prop="name" label="交易市场" align="center"></el-table-column>
      <el-table-column label="交易产品" align="center"></el-table-column>
      <el-table-column label="交易主体" align="center"></el-table-column>
      <el-table-column label="交易类型" align="center"></el-table-column>
      <el-table-column label="成交量(吨)" align="center"></el-table-column>
      <el-table-column label="单价(元/吨）" align="center"></el-table-column>
      <el-table-column label="成交额(元)" align="center"></el-table-column>
      <el-table-column label="申报订单" align="center">
        <template #default="{ row }">
          <el-tooltip content="查看" placement="top">
            <el-button type="primary" size="large" @click="" link>
              <el-icon :size="24"><View /></el-icon>
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
  </table-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { View, Search } from '@element-plus/icons-vue';
import TableLayout from '@my-monorepo/base-layout/components/TableLayout.vue';
import { ElPagination } from 'element-plus';
const queryParams = ref<{
  name?: string;
  turnover: { label: string; value: number };
}>({
  turnover: { label: '>', value: 0 },
});
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
</script>
<style scoped lang="scss">
.el-input--prefix {
  & > .el-select {
    width: 30px !important;
  }
}
</style>
