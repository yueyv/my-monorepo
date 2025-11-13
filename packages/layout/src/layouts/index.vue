<template>
  <div>
    <!-- 左侧模式 -->
    <LeftMode v-if="isLeft || isMobile" />
    <!-- 顶部模式 -->
    <TopMode v-else-if="isTop" />
    <!-- 混合模式 -->
    <LeftTopMode v-else-if="isLeftTop" />
    <!-- 右侧设置面板 -->
    <RightPanel v-if="showSettings">
      <Settings />
    </RightPanel>
  </div>
</template>
<script lang="ts" setup>
import { unref, watchEffect } from 'vue';
import LeftMode from './LeftMode.vue';
import TopMode from './TopMode.vue';
import LeftTopMode from './LeftTopMode.vue';
import Settings from '../components/Settings/index.vue';
import RightPanel from '../components/RightPanel.vue';
import { useDevice } from '../hooks/useDevice';
import { useLayoutMode } from '../hooks/useLayoutMode';
import { useSettingsStore } from '../store/modules/settings';
import { storeToRefs } from 'pinia';
import { useCssVar } from '@vueuse/core';
import useResize from '../hooks/useResize';

useResize();

const { isMobile } = useDevice();
const { isLeft, isTop, isLeftTop } = useLayoutMode();
const settingsStore = useSettingsStore();

const { showSettings, showTagsView } = storeToRefs(settingsStore);

const cssVariableName = '--admin-tagsview-height';
const tagsviewHeight = useCssVar(cssVariableName);
const rawHeight = unref(tagsviewHeight);
watchEffect(() => {
  if (showTagsView.value) {
    tagsviewHeight.value = rawHeight;
  } else {
    tagsviewHeight.value = '0px';
  }
});

// layouts组件需要作为组件使用，所以部分需要在main.ts中引入的组件需要在layouts中引入
</script>
<style lang="scss" scoped></style>
