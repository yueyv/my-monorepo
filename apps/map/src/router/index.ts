import { createRouter, createWebHashHistory } from 'vue-router';

export const routes: any = [
  {
    path: '/',
    redirect: '/map',
  },
  {
    name: 'Map',
    path: '/map',
    component: () => import('../views/map/index.vue'),
  },
];
const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});
export default router;
