<template>
  <div :class="layoutClasses" class="app-wrapper">
    <!-- mobile 端侧边栏遮罩层 -->
    <div
      v-if="layoutClasses.mobile && layoutClasses.openSidebar"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <!-- 左侧边栏 -->
    <Sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <!-- 头部导航栏和标签栏 -->
      <div :class="{ 'fixed-header': fixedHeader }" class="layout-header">
        <NavigationBar />
        <TagsView v-show="showTagsView" />
      </div>
      <!-- 页面主体内容 -->
      <AppMain class="app-main" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Sidebar from '../components/Sidebar/index.vue';
import AppMain from '../components/AppMain.vue';
import TagsView from '../components/TagsView.vue';
import NavigationBar from '../components/NavigationBar.vue';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '../store/modules/app';
import { useSettingsStore } from '../store/modules/settings';
import { useDevice } from '../hooks/useDevice';

const { isMobile } = useDevice();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const { showTagsView, fixedHeader } = storeToRefs(settingsStore);

const layoutClasses = computed(() => {
  return {
    hideSidebar: !appStore.sidebarOpened,
    openSidebar: appStore.sidebarOpened,
    withoutAnimation: appStore.sidebarWithoutAnimation,
    mobile: isMobile.value,
  };
});

/** 用于处理点击 mobile 端侧边栏遮罩层的事件 */
const handleClickOutside = () => {
  appStore.closeSidebar(false);
};
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';
$transition-time: 0.35s;

.app-wrapper {
  @extend %clearfix;
  position: relative;
  width: 100%;
}

.drawer-bg {
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.sidebar-container {
  background-color: var(--admin-sidebar-menu-bg-color);
  transition: width $transition-time;
  width: var(--admin-sidebar-width) !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  border-right: var(--admin-sidebar-border-right);
}

.main-container {
  min-height: 100%;
  transition: margin-left $transition-time;
  margin-left: var(--admin-sidebar-width);
  position: relative;
}

.fixed-header {
  position: fixed !important;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - var(--admin-sidebar-width));
  transition: width $transition-time;
}

.layout-header {
  position: relative;
  z-index: 9;
  background-color: var(--admin-header-bg-color);
  box-shadow: var(--admin-header-box-shadow);
  border-bottom: var(--admin-header-border-bottom);
}

.app-main {
  min-height: calc(100vh - var(--admin-navigationbar-height));
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: var(--admin-navigationbar-height);
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh - var(--admin-header-height));
  }
  .fixed-header + .app-main {
    padding-top: var(--admin-header-height);
  }
}

.hideSidebar {
  .sidebar-container {
    width: var(--admin-sidebar-hide-width) !important;
  }
  .main-container {
    margin-left: var(--admin-sidebar-hide-width);
  }
  .fixed-header {
    width: calc(100% - var(--admin-sidebar-hide-width));
  }
}

// 适配 mobile 端
.mobile {
  .sidebar-container {
    transition: transform $transition-time;
    width: var(--admin-sidebar-width) !important;
  }
  .main-container {
    margin-left: 0px;
  }
  .fixed-header {
    width: 100%;
  }
  &.openSidebar {
    position: fixed;
    top: 0;
  }
  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(calc(0px - var(--admin-sidebar-width)), 0, 0);
    }
  }
}

.withoutAnimation {
  .sidebar-container,
  .main-container {
    transition: none;
  }
}
</style>
