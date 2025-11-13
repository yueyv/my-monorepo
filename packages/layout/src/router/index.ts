import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  createWebHistory,
  Router,
} from 'vue-router';
import { setRouteChange } from '../hooks/useRouteListener';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { usePermissionStoreHook } from '../store/modules/permission';
import { ROOT_LAYOUT_NAME } from '../constants';
import { storeToRefs } from 'pinia';
import NotFound from '../views/NotFound.vue';
import { getCookie, TOKEN_COOKIE, backToLogin } from '@deri/request';

function parsePathname() {
  const pathname = location.pathname;
  const names = pathname.split('/').filter((v) => v !== '');
  return names[0];
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: ROOT_LAYOUT_NAME,
    component: () => import('../layouts/index.vue'),
    children: [
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: {
          title: '404',
        },
      },
      // 404 page
    ],
  },
  {
    path: '/redirect',
    component: () => import('../layouts/index.vue'),
    children: [
      {
        path: ':path(.*)',
        component: () => import('../views/redirect/index.vue'),
      },
    ],
  },
];

function getRouterHistory() {
  const pathname = parsePathname();
  const routerBase = `/${pathname}/`;
  const { useHistory } = storeToRefs(usePermissionStoreHook());
  return useHistory.value ? createWebHistory(routerBase) : createWebHashHistory();
}

NProgress.configure({ showSpinner: false });

function initRoute(router: Router) {
  const { routes } = usePermissionStoreHook();
  routes.forEach((route) => {
    router.addRoute(ROOT_LAYOUT_NAME, route);
  });
  // 默认路由跳转
  if (routes.length > 0) {
    const allRoutes = router.getRoutes();
    const index = allRoutes.findIndex((item) => item.path === '/');
    allRoutes[index].redirect = routes[0].path;
  }
}

export function initRouter() {
  const router = createRouter({
    history: getRouterHistory(),
    routes,
  });

  let routerInitialized = false;

  // 根据菜单配置动态设置路由
  router.beforeEach((to: any) => {
    if (!getCookie(TOKEN_COOKIE)) {
      backToLogin();
    } else {
      NProgress.start();
      if (!routerInitialized) {
        initRoute(router);
        routerInitialized = true;
        return to.fullPath;
      }
    }
  });

  router.afterEach((to: any) => {
    setRouteChange(to);
    NProgress.done();
  });

  return router;
}
