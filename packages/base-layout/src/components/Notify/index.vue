<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { Bell } from '@element-plus/icons-vue';
import NotifyList from './NotifyList.vue';
import { useNotifyStore } from '../../store/modules/notify';
import { storeToRefs } from 'pinia';

const { notifyData } = storeToRefs(useNotifyStore());

/** 角标当前值 */
const badgeValue = computed(() => {
  return notifyData.value.reduce((sum: any, item: any) => sum + item.list.length, 0);
});
/** 角标最大值 */
const badgeMax = 99;
/** 面板宽度 */
const popoverWidth = 350;
/** 当前 Tab */
const activeName = ref<string>('');

watch(
  () => notifyData.value,
  (value) => {
    if (value.length > 0) {
      activeName.value = value[0].name;
    }
  }
);

const handleHistory = () => {
  if (activeName.value) {
    const notify = notifyData.value.find((v) => v.name === activeName.value);
    notify?.toView(notify);
  }
};
</script>

<template>
  <div class="notify">
    <el-popover placement="bottom" :width="popoverWidth" trigger="click">
      <template #reference>
        <el-badge :value="badgeValue" :max="badgeMax" :hidden="badgeValue === 0">
          <el-tooltip effect="dark" content="消息通知" placement="bottom">
            <el-icon :size="20">
              <Bell />
            </el-icon>
          </el-tooltip>
        </el-badge>
      </template>
      <template #default>
        <el-tabs v-model="activeName" class="demo-tabs" stretch v-if="notifyData.length > 1">
          <el-tab-pane v-for="(item, index) in notifyData" :name="item.name" :key="index">
            <template #label>
              {{ item.name }}
              <el-badge :value="item.list.length" :max="badgeMax" :type="item.type" />
            </template>
            <el-scrollbar max-height="400px">
              <NotifyList :list="item.list" />
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>
        <template v-else-if="notifyData.length > 0">
          <el-scrollbar max-height="400px">
            <NotifyList :list="notifyData[0].list" />
          </el-scrollbar>
          <div class="notify-history">
            <el-button link @click="handleHistory">查看{{ activeName }}历史</el-button>
          </div>
        </template>
      </template>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.notify {
  margin-right: 10px;
}

.notify-history {
  text-align: center;
  padding-top: 12px;
  border-top: 1px solid var(--el-border-color);
}
</style>
