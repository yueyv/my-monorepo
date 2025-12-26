<template>
  <div>
    <!-- 浮动按钮 -->
    <div class="app-nav-button" @click="drawerVisible = true">
      <el-icon :size="20">
        <ElIconMenu />
      </el-icon>
    </div>

    <!-- 导航抽屉 -->
    <el-drawer v-model="drawerVisible" title="导航菜单" :size="280" direction="ltr">
      <div ref="menuContainer"></div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ElMenuItem, ElSubMenu, ElMenu, ElIcon } from 'element-plus';
import { render, h } from 'vue';
import 'element-plus/es/components/menu/style/css';
import 'element-plus/es/components/menu-item/style/css';
import 'element-plus/es/components/menu-item-group/style/css';
import { useSystemStore } from '@/store';

const systemStore = useSystemStore();
const router = useRouter();
const route = useRoute();

// 抽屉显示状态
const drawerVisible = ref(false);
const menuContainer = ref<HTMLElement | null>(null);

// 当前激活的路由
const activeRoute = computed(() => route.path);

// 生成菜单项列表
const menuItems = computed(() => {
  const routes = router.getRoutes();
  return generateMenuItems(routes);
});

// 根据路由生成菜单项（支持嵌套路由结构）
const generateMenuItems = (routes: any[]): MenuItem[] => {
  const menuItems: MenuItem[] = [];
  const routeMap = new Map<string, MenuItem>();

  // 第一遍：过滤并创建所有菜单项
  routes.forEach((route) => {
    // 跳过没有 path 或者是布局路由的
    if (!route.path || route.path.includes('__nuxt_error')) {
      return;
    }

    // 跳过动态路由（包含 : 或 [ 的路由），但保留父路由结构
    if (route.path.includes(':') || route.path.includes('[')) {
      return;
    }

    const meta = route.meta || {};

    // 跳过隐藏的路由
    if (meta.hidden) {
      return;
    }

    // 生成菜单标题
    const title = (meta.title as string) || route.name?.toString() || route.path;

    const menuItem: MenuItem = {
      path: route.path,
      title,
      icon: meta.icon,
      order: (meta.order as number) ?? 999,
      hidden: meta.hidden,
      children: [],
    };

    routeMap.set(route.path, menuItem);
  });

  // 第二遍：构建菜单树结构（动态规划路由关系）
  routeMap.forEach((menuItem, path) => {
    if (path === '/') {
      // 根路径直接添加到顶级
      menuItems.push(menuItem);
      return;
    }

    // 检查是否有父路由
    const pathParts = path.split('/').filter(Boolean);
    if (pathParts.length > 1) {
      // 查找父路由
      const parentPath = '/' + pathParts.slice(0, -1).join('/');
      const parent = routeMap.get(parentPath);
      if (parent) {
        // 如果父路由存在，添加到父路由的 children
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(menuItem);
        return;
      }
    }
    // 顶级菜单项（没有父路由或父路由不存在）
    menuItems.push(menuItem);
  });

  // 按 order 排序
  const sortMenuItems = (items: MenuItem[]) => {
    items.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    items.forEach((item) => {
      if (item.children && item.children.length > 0) {
        sortMenuItems(item.children);
      }
    });
  };

  sortMenuItems(menuItems);
  return menuItems;
};

// 渲染菜单项（递归渲染，支持嵌套）
const renderMenuItem = (item: MenuItem): any => {
  // 如果隐藏，不渲染
  if (item.hidden) {
    return null;
  }

  if (item.children && item.children.length > 0) {
    // 子菜单
    const children = item.children
      .map((child) => renderMenuItem(child))
      .filter((child) => child !== null);

    if (children.length === 0) {
      return null;
    }

    return h(
      ElSubMenu,
      {
        index: item.path,
        key: item.path,
      },
      {
        title: () => [
          item.icon ? h(ElIcon, { key: 'icon' }, () => h(item.icon as any)) : null,
          h('span', { key: 'title' }, item.title),
        ],
        default: () => children,
      }
    );
  } else {
    // 普通菜单项
    return h(
      ElMenuItem,
      {
        index: item.path,
        key: item.path,
      },
      {
        default: () => [
          item.icon ? h(ElIcon, { key: 'icon' }, () => h(item.icon as any)) : null,
          h('span', { key: 'title' }, item.title),
        ],
      }
    );
  }
};

// 生成菜单 VNode
const menuVnode = computed(() => {
  const items = menuItems.value.map((item) => renderMenuItem(item)).filter((item) => item !== null);
  return h(
    ElMenu,
    {
      class: 'navigation-menu',
      defaultActive: activeRoute.value,
      onSelect: handleMenuSelect,
    },
    {
      default: () => items,
    }
  );
});

// 处理菜单选择
const handleMenuSelect = (path: string) => {
  navigateTo(path);
  // 延迟关闭抽屉，让导航完成
  setTimeout(() => {
    drawerVisible.value = false;
  }, 300);
};

const renderMenu = async () => {
  await nextTick();
  if (menuContainer.value) {
    render(menuVnode.value, menuContainer.value);
  }
};
const menuEffectscope = effectScope();

onMounted(() => {
  renderMenu();
  menuEffectscope.run(() => {
    watch(
      () => route.path,
      () => {
        renderMenu();
      }
    );

    watch(
      () => drawerVisible.value,
      (visible) => {
        if (visible) {
          renderMenu();
        }
      }
    );
  });
});
onUnmounted(() => {
  menuEffectscope.stop();
});
</script>

<style lang="scss" scoped>
.app-nav-button {
  position: fixed;
  left: 2rem;
  bottom: 2rem;
  height: 3.5rem;
  width: 3.5rem;
  background: linear-gradient(135deg, #667eea 0%, #99f8fd 100%);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px 0 rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  z-index: 999;
  color: white;
  gap: 0.125rem;

  .button-text {
    font-size: 0.625rem;
    font-weight: 500;
    margin-top: -0.125rem;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px 0 rgba(102, 126, 234, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }
}

.navigation-menu {
  border-right: none;

  :deep(.el-menu-item),
  :deep(.el-sub-menu__title) {
    height: 48px;
    line-height: 48px;

    &:hover {
      background-color: #f5f7fa;
    }
  }

  :deep(.el-menu-item.is-active) {
    background-color: #ecf5ff;
    color: #409eff;
    font-weight: 600;
  }
}

.drawer-footer {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0;
}

:deep(.el-drawer__header) {
  margin-bottom: 0;
}

:deep(.el-menu) {
  border-right: 0;
}
:deep(.el-menu-item.is-active) {
  background-color: var(--el-color-primary-light-9) !important;
}
</style>
