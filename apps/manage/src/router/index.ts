import { createRouter, createWebHashHistory } from 'vue-router';
// 由 vite-plugin-pages 生成的基于文件系统的路由
import { routes } from 'vue-router/auto-routes';

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});
export default router;
