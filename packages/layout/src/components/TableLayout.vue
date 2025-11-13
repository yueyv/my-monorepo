<template>
  <div
    class="table-layout"
    :class="{
      'is-mobile': isMobile,
    }"
  >
    <el-form
      v-if="showHeader"
      class="table-layout-header"
      inline
      :label-suffix="formConfig.labelSuffix"
      :size="isMobile ? 'small' : 'default'"
      :label-width="formConfig.labelWidth"
      :label-position="formConfig.labelPosition"
      @submit.native.prevent
    >
      <slot name="header"
    /></el-form>
    <div class="w-full flex-1 overflow-auto">
      <slot />
    </div>
    <div v-if="showFooter" class="mt-4 overflow-x-auto">
      <el-scrollbar>
        <div class="w-full flex items-center justify-center gap-2">
          <slot name="footer"></slot>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType, computed, useSlots } from 'vue';
import { useDevice } from '../hooks/useDevice';

const props = defineProps({
  header: {
    type: Boolean,
    default: false,
  },
  footer: {
    type: Boolean,
    default: false,
  },
  headerConfig: {
    type: Object as PropType<{
      labelWidth?: string;
      labelPosition?: string;
      labelSuffix?: string;
    }>,
    default() {
      return {
        labelWidth: '',
        labelPosition: 'left',
        labelSuffix: '',
      };
    },
  },
});

const formConfig = computed(() => {
  return Object.assign(
    {
      labelWidth: '',
      labelPosition: 'left',
      labelSuffix: '',
    },
    props.headerConfig || {}
  );
});

const device = useDevice();

const slots = useSlots();
const isMobile = computed(() => {
  return device.isMobile.value;
});

const showHeader = computed(() => {
  return slots.header || props.header;
});

const showFooter = computed(() => {
  return slots.footer || props.footer;
});
</script>
<style lang="scss">
.table-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  .table-layout-header {
    .el-form-item {
      margin-right: 0.5rem !important;
      margin-left: 0 !important;
      .el-form-item__label {
        font-size: 1.0875rem !important;
        font-family: Source Han Sans CN Regular !important;
      }
    }
  }
}
.table-layout.is-mobile {
  .table-layout-header {
    .el-form-item {
      margin-bottom: 0.25rem;
    }
  }
}
</style>
