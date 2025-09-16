<template>
  <table-layout>
    <template #header>
      <el-form-item label="申报时间">
        <el-date-picker type="datetimerange" />
      </el-form-item>
      <el-form-item label="更新时间">
        <el-date-picker type="datetimerange" />
      </el-form-item>
      <el-form-item label="申报主体">
        <el-select value-key="" placeholder="" clearable filterable @change=""></el-select>
      </el-form-item>
      <el-form-item>
        <el-checkbox></el-checkbox>
      </el-form-item>
      <el-form-item label="买入"></el-form-item>
      <el-form-item>
        <el-checkbox></el-checkbox>
      </el-form-item>
      <el-form-item label="卖出"></el-form-item>
      <el-form-item label="订单状态">
        <el-select value-key="" placeholder="" clearable filterable @change=""></el-select>
      </el-form-item>
      <el-form-item label="碳配量">
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
      <el-form-item label="总价">
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
      </el-form-item>
    </template>
    <el-table v-loading="tableLoading" :data="tableData" class="custom-table" height="100%">
      <el-table-column label="申报时间" align="center"></el-table-column>
      <el-table-column label="更新时间" align="center"></el-table-column>
      <el-table-column prop="name" label="申报主体" align="center"></el-table-column>
      <el-table-column label="交易类型" align="center"></el-table-column>
      <el-table-column label="碳配额(吨)" align="center"></el-table-column>
      <el-table-column label="单价(元/吨）" align="center"></el-table-column>
      <el-table-column label="总价(元)" align="center"></el-table-column>
      <el-table-column label="订单状态" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button type="primary" link @click="editDialog(row)">买入</el-button>
          <el-button type="danger" link @click="">撤销</el-button>
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
          <el-text>碳交易市场</el-text>
          <el-icon><ArrowRight /></el-icon>
          <el-text v-if="dialogTitle == '申报'">申报</el-text>
          <el-text v-else>卖出</el-text>
        </div>
      </template>
      <el-form
        :model="form"
        ref="formRef"
        class="w-full p-4"
        label-position="left"
        label-width="80px"
      >
        <el-form-item label="交易类型">
          <div>
            <el-radio-group>
              <el-radio value="buy">买入</el-radio>
              <el-radio value="send">卖出</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="申报主体">
          <el-select value-key="" placeholder="" clearable filterable @change=""></el-select>
        </el-form-item>
        <el-form-item label="碳配额">
          <el-input placeholder="" clearable @change=""><template #suffix>kg</template></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input placeholder="" clearable @change=""><template #suffix>元</template></el-input>
        </el-form-item>
        <el-form-item label="总价"></el-form-item>
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
import { ref, nextTick } from 'vue';
import { Search, Plus, ArrowRight } from '@element-plus/icons-vue';
import TableLayout from '@my-monorepo/base-layout/components/TableLayout.vue';
import { ElPagination } from 'element-plus';
import { cloneDeep } from 'lodash-es';
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
const dialogVisible = ref(false);
const form = ref({});
const formRef = ref();
const dialogTitle = ref('');
const addDialog = async () => {
  dialogTitle.value = '申报';
  dialogVisible.value = true;
  await nextTick();
  formRef.value?.resetFields();
};
const editDialog = async (row: any) => {
  dialogVisible.value = true;
  dialogTitle.value = '卖出';
  await nextTick();
  formRef.value?.resetFields();
  form.value = cloneDeep(row);
};
</script>
<style scoped lang="scss">
.el-input--prefix {
  & > .el-select {
    width: 30px !important;
  }
}
</style>
