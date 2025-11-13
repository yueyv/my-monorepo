<template>
  <div class="navigation-bar">
    <Logo v-if="isLogo" :collapse="false" class="logo" />
    <Hamburger
      v-if="!isTop || isMobile"
      :is-active="appStore.sidebarOpened"
      class="hamburger"
      @toggle-click="toggleSidebar"
    />
    <Breadcrumb v-if="!isTop || isMobile" class="breadcrumb" />
    <Sidebar v-if="isTop && !isMobile" class="sidebar" />
    <div class="right-menu">
      <SearchMenu v-if="showSearchMenu" class="right-menu-item" />
      <Screenfull v-if="showScreenfull" class="right-menu-item" />
      <Notify v-if="showNotify" class="right-menu-item" />
      <el-dropdown class="right-menu-item">
        <div class="right-menu-avatar">
          <el-avatar :src="userStore.avatar" :size="30" />
          <span>{{ userStore.username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="configSettings">
              <span style="display: block">系统配置</span>
            </el-dropdown-item>
            <el-dropdown-item @click="logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '../store/modules/app';
import { useSettingsStore } from '../store/modules/settings';
import { useUserStore } from '../store/modules/user';
import Hamburger from '../components/Hamburger.vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import Sidebar from './Sidebar/index.vue';
import Notify from '../components/Notify/index.vue';
import Screenfull from '../components/Screenfull.vue';
import SearchMenu from '../components/SearchMenu/index.vue';
import { useDevice } from '../hooks/useDevice';
import { useLayoutMode } from '../hooks/useLayoutMode';
import Logo from '../components/Logo.vue';

const { isMobile } = useDevice();
const { isTop, isLeftTop } = useLayoutMode();
const appStore = useAppStore();
const userStore = useUserStore();
const settingsStore = useSettingsStore();
const { showNotify, showScreenfull, showSearchMenu, showLogo } = storeToRefs(settingsStore);

const { settingOpened } = storeToRefs(appStore);

/** 切换侧边栏 */
const toggleSidebar = () => {
  appStore.toggleSidebar(false);
};

/** 登出 */
const logout = () => {
  userStore.logout();
};

const configSettings = () => {
  settingOpened.value = true;
};

const isLogo = computed(() => (isTop.value || isLeftTop.value) && showLogo.value);
</script>
<style lang="scss" scoped>
.navigation-bar {
  height: var(--admin-navigationbar-height);
  overflow: hidden;
  color: var(--admin-navigationbar-text-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    width: var(--admin-sidebar-width);
    background-color: var(--el-color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 15px;
    cursor: pointer;
  }
  .breadcrumb {
    flex: 1;
    // 参考 Bootstrap 的响应式设计将宽度设置为 576
    @media screen and (max-width: 576px) {
      display: none;
    }
  }
  .sidebar {
    flex: 1;
    // 设置 min-width 是为了让 Sidebar 里的 el-menu 宽度自适应
    min-width: 0px;
    :deep(.el-menu) {
      background-color: transparent;
    }
    :deep(.el-sub-menu) {
      &.is-active {
        .el-sub-menu__title {
          color: var(--el-color-primary) !important;
        }
      }
    }
  }
  .right-menu {
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;

    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;
      .right-menu-avatar {
        display: flex;
        align-items: center;
        .el-avatar {
          margin-right: 10px;
        }
        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
