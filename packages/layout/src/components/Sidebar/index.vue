<template>
  <div :class="{ 'has-logo': hasLogo }">
    <!-- 需要补充应用logo -->
    <!-- <AppName v-if="isLogo" :collapse="isCollapse" /> -->
    <logo v-if="isLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse && !isTop"
        :background-color="backgroundColor"
        :text-color="textColor"
        :active-text-color="activeTextColor"
        :unique-opened="true"
        :collapse-transition="false"
        :mode="isTop && !isMobile ? 'horizontal' : 'vertical'"
      >
        <SidebarItem v-for="menu in noHiddenRoutes" :menuItem="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useCssVar } from '@vueuse/core';
import SidebarItem from './SidebarItem.vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '../../store/modules/app';
import { usePermissionStore } from '../../store/modules/permission';
import { useDevice } from '../../hooks/useDevice';
import { useLayoutMode } from '../../hooks/useLayoutMode';
import Logo from '../Logo.vue';
import { useSettingsStore } from '../../store/modules/settings';

defineProps({
  hasLogo: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();
const { isMobile } = useDevice();
const { isLeft, isTop } = useLayoutMode();
const appStore = useAppStore();
const permissionStore = usePermissionStore();
const settingsStore = useSettingsStore();

const activeMenu = computed(() => {
  const { path } = route;
  return path;
});

const isCollapse = computed(() => !appStore.sidebarOpened);
const isLogo = computed(() => isLeft.value && settingsStore.showLogo);

const noHiddenRoutes = computed(() => permissionStore.menus.filter((item) => !item.meta.hidden));

const tipLineWidth = computed(() => {
  return !isTop.value ? '2px' : '0px';
});

// 当为顶部模式时隐藏垂直滚动条
const hiddenScrollbarVerticalBar = computed(() => {
  return isTop.value ? 'none' : 'block';
});

const sidebarMenuItemHeight = computed(() => {
  return !isTop.value
    ? 'var(--admin-sidebar-menu-item-height)'
    : 'var(--admin-navigationbar-height)';
});
const sidebarMenuHoverBgColor = computed(() => {
  return !isTop.value ? 'var(--admin-sidebar-menu-hover-bg-color)' : 'transparent';
});

const sidebarMenuActiveTextColor = useCssVar('--admin-sidebar-menu-active-text-color');
const sidebarMenuTextColor = useCssVar('--admin-sidebar-menu-text-color');
const sidebarMenuBgColor = useCssVar('--admin-sidebar-menu-bg-color');

const activeTextColor = computed(() =>
  isLeft.value ? sidebarMenuActiveTextColor.value : undefined
);
const textColor = computed(() => (isLeft.value ? sidebarMenuTextColor.value : undefined));
const backgroundColor = computed(() => (isLeft.value ? sidebarMenuBgColor.value : undefined));
</script>
<style lang="scss" scoped>
%tip-line {
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: v-bind(tipLineWidth);
    height: 100%;
    background-color: var(--admin-sidebar-menu-tip-line-bg-color);
  }
}
.has-logo {
  .el-scrollbar {
    // 多 1% 是为了在左侧模式时侧边栏最底部不显示 1px 左右的白色线条
    height: calc(101% - var(--admin-header-height));
  }
}

.el-scrollbar {
  // 多 1% 是为了在顶部模式时防止垂直滚动
  height: 101%;
  :deep(.scrollbar-wrapper) {
    // 限制水平宽度
    overflow-x: hidden !important;
    .el-scrollbar__view {
      height: 100%;
    }
  }
  // 滚动条
  :deep(.el-scrollbar__bar) {
    &.is-horizontal {
      // 隐藏水平滚动条
      display: none;
    }
    &.is-vertical {
      // 当为顶部模式时隐藏垂直滚动条
      display: v-bind(hiddenScrollbarVerticalBar);
    }
  }
}

.el-menu {
  border: none;
  min-height: 100%;
  width: 100% !important;
}

.el-menu--horizontal {
  height: v-bind(sidebarMenuItemHeight);
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item),
:deep(.el-menu--horizontal .el-menu-item) {
  height: v-bind(sidebarMenuItemHeight);
  line-height: v-bind(sidebarMenuItemHeight);
  &.is-active,
  &:hover {
    background-color: v-bind(sidebarMenuHoverBgColor);
  }
}

:deep(.el-sub-menu) {
  &.is-active {
    > .el-sub-menu__title {
      color: v-bind(activeTextColor) !important;
    }
  }
}

:deep(.el-menu-item.is-active) {
  @extend %tip-line;
}

.el-menu--collapse {
  :deep(.el-sub-menu.is-active) {
    .el-sub-menu__title {
      @extend %tip-line;
    }
  }
}
</style>
