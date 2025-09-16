<template>
  <div class="flex h-full">
    <div class="w-1/3 p-4 flex flex-col">
      <div class="flex justify-between items-center">
        <p>碳交易市场列表</p>
        <div class="my-4">
          <el-tooltip content="新增" placement="top">
            <el-button type="primary" size="large" @click="addMarketDialog" link>
              <el-icon :size="24"><Plus /></el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip content="编辑" placement="top">
            <el-button type="success" size="large" @click="editMarketDialog" link>
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
      <el-scrollbar wrap-class="border-slate-100 rounded-sm border-solid">
        <el-table :data="listData" :show-header="false" highlight-current-row height="100%">
          <el-table-column label="市场" prop="market" align="center"></el-table-column>
        </el-table>
      </el-scrollbar>
    </div>
    <div class="flex-grow-1 flex flex-col h-full p-4">
      <div class="flex justify-between items-center">
        <p></p>
        <div class="my-4">
          <el-tooltip content="新增" placement="top">
            <el-button type="primary" size="large" @click="" link>
              <el-icon :size="24"><Plus /></el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button type="danger" size="large" @click="" link>
              <el-icon :size="24"><Delete /></el-icon>
            </el-button>
          </el-tooltip>
        </div>
      </div>

      <el-table v-loading="tableLoading" :data="tableData" class="custom-table min-h-0">
        <el-table-column prop="index" label="序号" align="center">
          <template #default="scope">
            <el-checkbox
              v-model="scope.row.checked"
              :label="scope.$index + 1"
              :true-value="true"
              :false-value="false"
              @change="
                () => {
                  console.log(scope);
                }
              "
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="交易产品名称" align="center"></el-table-column>
        <el-table-column label="繁体中文" align="center"></el-table-column>
        <el-table-column label="英文" align="center"></el-table-column>
        <el-table-column label="日文" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-tooltip content="编辑" placement="top">
              <el-button type="success" size="large" @click="" link>
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
    </div>
    <el-dialog append-to-body v-model="dialogVisible" top="30vh" draggable width="450px">
      <template #title>
        <div class="flex content-center">
          <el-text>碳活动数据源</el-text>
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
          <el-input v-model.trim="form.name" placeholder="请输入名称" class="w-full" clearable />
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
import { ref, nextTick } from 'vue';
import { Plus, Delete, Edit } from '@element-plus/icons-vue';
import { ElScrollbar, FormInstance } from 'element-plus';
import { cloneDeep } from 'lodash-es';
const dialogVisible = ref(false);
const dialogTitle = ref('');
const listData = ref([
  {
    market: '内部市场',
  },
  {
    market: '外部市场',
  },
]);
const tableData = ref([
  {
    name: 'test',
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
const addMarketDialog = async () => {
  dialogVisible.value = true;
  dialogTitle.value = '新增';
  formRef.value?.resetFields();
  await nextTick();
};
const editMarketDialog = async (row: any) => {
  dialogVisible.value = true;
  dialogTitle.value = '编辑';
  formRef.value?.resetFields();
  form.value = cloneDeep(row);
  await nextTick();
};
</script>
<style scoped lang="scss"></style>
