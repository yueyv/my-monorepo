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
      <el-menu :default-active="activeRoute" class="navigation-menu" @select="handleMenuSelect">
        <template v-for="item in menuItems" :key="item.path">
          <!-- 有子菜单 -->
          <el-sub-menu v-if="item.children && item.children.length" :index="item.path">
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
              <el-icon v-if="child.icon">
                <component :is="child.icon" />
              </el-icon>
              <span>{{ child.title }}</span>
            </el-menu-item>
          </el-sub-menu>

          <!-- 无子菜单 -->
          <el-menu-item v-else-if="item?.hidden !== true" :index="item.path">
            <template #default>
              <el-icon v-if="item.icon">
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 抽屉显示状态
const drawerVisible = ref(false);

// 当前激活的路由
const activeRoute = computed(() => route.path);

// 生成菜单项
const menuItems = computed<MenuItem[]>(() => {
  const routes = router.getRoutes();
  const items: MenuItem[] = [];

  routes.forEach((route) => {
    // 跳过没有 path 或者是布局路由的
    if (!route.path || route.path.includes('__nuxt_error')) {
      return;
    }

    // 如果配置为隐藏，则跳过
    if (/:/.test(route.path)) {
      return;
    }

    // 生成菜单标题
    const title = (route.meta?.title as string) || route.name?.toString() || route.path;

    const menuItem: MenuItem = {
      path: route.path,
      title,
      icon: route.meta?.icon || ElIconHomeFilled,
      order: (route.meta?.order as number) || 999,
    };

    items.push(menuItem);
  });

  // 按 order 排序
  return items.sort((a, b) => (a.order || 999) - (b.order || 999));
});

// 处理菜单选择
const handleMenuSelect = (path: string) => {
  navigateTo(path);
  // 延迟关闭抽屉，让导航完成
  setTimeout(() => {
    drawerVisible.value = false;
  }, 300);
};

// 监听路由变化
watch(
  () => route.path,
  () => {
    // 路由改变时可以做一些事情
  }
);
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
</style>
