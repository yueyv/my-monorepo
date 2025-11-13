<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="width"
    append-to-body
    :close-on-click-modal="false"
    :custom-class="customClass"
    :show-close="showClose"
    :modal="modal"
    draggable
    top="32px"
  >
    <slot name="default"></slot>
    <slot name="footer" v-if="footer">
      <div class="w-full flex justify-end">
        <el-button @click="visible = false"> 取消 </el-button>
        <el-button type="primary" @click="confirm" :loading="btnLoading" :disabled="disabled">
          确定
        </el-button>
      </div>
    </slot>
  </el-dialog>
</template>
<script lang="ts" setup>
import { computed, PropType } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: Object as PropType<String | Number>,
    default: '550px',
  },
  footer: {
    type: Boolean,
    default: true,
  },
  customClass: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  modal: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['confirm', 'update:modelValue']);

const btnLoading = computed(() => props.loading);

const disabled = computed(() => {
  return props.disabled;
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
