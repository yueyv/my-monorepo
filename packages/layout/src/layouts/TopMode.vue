<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '../store/modules/settings';
import AppMain from '../components/AppMain.vue';
import NavigationBar from '../components/NavigationBar.vue';
import TagsView from '../components/TagsView.vue';

const settingsStore = useSettingsStore();
const { showTagsView } = storeToRefs(settingsStore);
</script>

<template>
  <div class="app-wrapper">
    <!-- 头部导航栏和标签栏 -->
    <div class="fixed-header layout-header">
      <div class="content">
        <NavigationBar class="navigation-bar" />
      </div>
      <TagsView v-show="showTagsView" />
    </div>
    <!-- 主容器 -->
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <!-- 页面主体内容 -->
      <AppMain class="app-main" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/mixins.scss';
$transition-time: 0.35s;

.app-wrapper {
  @extend %clearfix;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  z-index: 1002;
  width: 100%;
  .logo {
    width: var(--admin-sidebar-width);
    background-color: var(--el-color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    display: flex;
    .navigation-bar {
      flex: 1;
    }
  }
}

.layout-header {
  background-color: var(--admin-header-bg-color);
  box-shadow: var(--admin-header-box-shadow);
  border-bottom: var(--admin-header-border-bottom);
}

.main-container {
  min-height: 100%;
}

.app-main {
  transition: padding-left $transition-time;
  padding-top: var(--admin-navigationbar-height);
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    padding-top: var(--admin-header-height);
  }
}
</style>
