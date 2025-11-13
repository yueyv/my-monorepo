<template>
  <el-drawer
    v-model="visible"
    :title="title"
    :size="size"
    append-to-body
    :close-on-click-modal="false"
    class="custom-drawer"
  >
    <div class="h-full flex flex-col gap-4">
      <el-scrollbar v-if="defaultScrollbar" class="flex-1 overflow-auto">
        <slot></slot>
      </el-scrollbar>
      <div v-else class="flex-1 overflow-hidden">
        <slot></slot>
      </div>
      <slot name="footer" v-if="footer">
        <div class="flex justify-center">
          <el-button type="primary" @click="confirm" :loading="btnLoading" :disabled="disabled">
            {{ btnText }}
          </el-button>
        </div>
      </slot>
    </div>
  </el-drawer>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  direction: {
    type: String,
    default: 'rtl',
  },
  size: {
    type: [Number, String],
    default: 400,
  },
  footer: {
    type: Boolean,
    default: true,
  },
  btnText: {
    type: String,
    default: '保存',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  defaultScrollbar: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['confirm', 'update:modelValue']);

const btnLoading = computed(() => {
  return props.loading;
});

const visible = computed({
  get: () => {
    return props.modelValue;
  },
  set: (v) => {
    emit('update:modelValue', v);
  },
});

// 确认
const confirm = () => {
  emit('confirm');
};
</script>
<style lang="scss" scoped></style>
