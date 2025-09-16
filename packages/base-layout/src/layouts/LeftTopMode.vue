<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '../store/modules/app';
import { useSettingsStore } from '../store/modules/settings';
import AppMain from '../components/AppMain.vue';
import NavigationBar from '../components/NavigationBar.vue';
import Sidebar from '../components/Sidebar/index.vue';
import TagsView from '../components/TagsView.vue';

const appStore = useAppStore();
const settingsStore = useSettingsStore();
const { showTagsView } = storeToRefs(settingsStore);

/** 定义计算属性 layoutClasses，用于控制布局的类名 */
const layoutClasses = computed(() => {
  return {
    hideSidebar: !appStore.sidebarOpened,
  };
});
</script>

<template>
  <div :class="layoutClasses" class="app-wrapper">
    <!-- 头部导航栏和标签栏 -->
    <div class="fixed-header layout-header">
      <div class="content">
        <NavigationBar />
        <TagsView v-show="showTagsView" />
      </div>
    </div>
    <!-- 主容器 -->
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <!-- 左侧边栏 -->
      <Sidebar class="sidebar-container" />
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
  display: flex;
  .content {
    flex: 1;
    position: relative;
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

.sidebar-container {
  transition: width $transition-time;
  width: var(--admin-sidebar-width) !important;
  height: 100%;
  position: fixed;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  border-right: var(--admin-sidebar-border-right);
  padding-top: var(--admin-navigationbar-height);
}

.app-main {
  transition: padding-left $transition-time;
  padding-top: var(--admin-navigationbar-height);
  padding-left: var(--admin-sidebar-width);
  height: 100vh;
  overflow: auto;
}

.hideSidebar {
  .sidebar-container {
    width: var(--admin-sidebar-hide-width) !important;
  }
  .app-main {
    padding-left: var(--admin-sidebar-hide-width);
  }
}

.hasTagsView {
  .sidebar-container {
    padding-top: var(--admin-header-height);
  }
  .app-main {
    padding-top: var(--admin-header-height);
  }
}
</style>
