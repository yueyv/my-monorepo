import { ref } from 'vue';
import { defineStore } from 'pinia';
import { type RouteRecordRaw } from 'vue-router';
import store from '..';
import {
  importRemoteComponent,
  isRemoteComponent
} from '../../utils/federation';
import { getViewModule } from '../../utils/views';

export const usePermissionStore = defineStore('admin-permission', () => {
  const menus = ref<StandardMenu[]>([]);
  const routes = ref<RouteRecordRaw[]>([]);
  // 是否使用 history 模式
  const useHistory = ref(false);

  const enableHistory = (history: boolean) => {
    useHistory.value = history;
  };

  const setMenus = (systemMenus: StandardMenu[]) => {
    menus.value = systemMenus;
    routes.value = [];
    createDynamicRoute(systemMenus);
  };

  function createDynamicRoute(menus: StandardMenu[]) {
    return menus.forEach((menu) => {
      if (menu.children && menu.children.length > 0) {
        createDynamicRoute(menu.children);
      } else {
        let component = null;
        const path = menu.meta.path!;
        if (isRemoteComponent(path)) {
          component = () => importRemoteComponent(path);
        } else {
          // 引用相对目录下的 vue 文件
          component = getViewModule(path);
        }
        if (component) {
          const route: RouteRecordRaw = {
            name: menu.name,
            path: menu.path,
            meta: menu.meta,
            // 引用相对目录下的 vue 文件
            component: component
          };
          routes.value.push(route);
        }
      }
    });
  }

  return { routes, setMenus, menus, useHistory, enableHistory };
});

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
