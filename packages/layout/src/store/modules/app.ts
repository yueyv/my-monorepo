import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { DeviceEnum, SIDE_BAR_OPENED_KEY } from '../../constants';
import store from '../index';
import logo from '../../assets/deri.png';

export const useAppStore = defineStore('admin-app', () => {
  /** 侧边栏状态 */
  const sidebarOpened = useStorage(SIDE_BAR_OPENED_KEY, true, localStorage);
  const sidebarWithoutAnimation = ref(false);
  const appName = ref('');
  const appLogo = ref(logo);

  /** 设备类型 */
  const device = ref<DeviceEnum>(DeviceEnum.Desktop);

  /** 切换侧边栏 */
  const toggleSidebar = (withoutAnimation: boolean) => {
    sidebarOpened.value = !sidebarOpened.value;
    sidebarWithoutAnimation.value = withoutAnimation;
  };
  /** 关闭侧边栏 */
  const closeSidebar = (withoutAnimation: boolean) => {
    sidebarOpened.value = false;
    sidebarWithoutAnimation.value = withoutAnimation;
  };
  /** 切换设备类型 */
  const toggleDevice = (value: DeviceEnum) => {
    device.value = value;
  };

  /** 设置应用名称 */
  const setAppName = (name: string) => {
    appName.value = name;
  };

  const setAppLogo = (value: string) => {
    appLogo.value = value;
  };

  const settingOpened = ref(false);

  return {
    device,
    sidebarOpened,
    sidebarWithoutAnimation,
    toggleSidebar,
    closeSidebar,
    toggleDevice,
    appName,
    setAppName,
    settingOpened,
    appLogo,
    setAppLogo
  };
});

/** 在 setup 外使用 */
export function useAppStoreHook() {
  return useAppStore(store);
}
