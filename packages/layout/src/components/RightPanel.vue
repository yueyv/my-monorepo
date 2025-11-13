<script lang="ts" setup>
import { useAppStore } from '../store/modules/app';
import { storeToRefs } from 'pinia';

interface Props {
  buttonTop?: number;
}

const props = withDefaults(defineProps<Props>(), {
  buttonTop: 350,
});

const buttonTopCss = props.buttonTop + 'px';

const { settingOpened } = storeToRefs(useAppStore());
</script>

<template>
  <el-drawer v-model="settingOpened" size="300px" :with-header="false">
    <slot />
  </el-drawer>
</template>

<style lang="scss" scoped>
.handle-button {
  width: 48px;
  height: 48px;
  background-color: var(--admin-rightpanel-button-bg-color);
  position: fixed;
  top: v-bind(buttonTopCss);
  right: 0;
  border-radius: 6px 0 0 6px;
  z-index: 10;
  cursor: pointer;
  pointer-events: auto;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
