import { type App as VueApp, createApp } from 'vue';
import App from './App.vue';
import store from '@my-monorepo/base-layout/store/index.ts';
import { loadPlugins } from '@my-monorepo/base-layout/plugins/index.ts';
import i18n from './i18n';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  TitleComponent,
  ToolboxComponent,
  MarkAreaComponent,
} from 'echarts/components';
import { PieChart, LineChart, BarChart, CustomChart, GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
// import ECharts from 'vue-echarts';
import { use } from 'echarts/core';
import 'virtual:uno.css';
import 'normalize.css';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import '@my-monorepo/base-layout/styles/index.scss';
import router from './router';
import * as echarts from 'echarts';
use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  GaugeChart,
  LineChart,
  PieChart,
  LegendComponent,
  DataZoomComponent,
  TitleComponent,
  CustomChart,
  ToolboxComponent,
  MarkAreaComponent,
]);

let app: VueApp | null;

async function initApp() {
  app = createApp(App);
  // 预测平台网关接口
  // window.gatewayPrefix = '/my-monorepo/my-monorepo-auth/';

  window.echarts = echarts;
  app.use(store);
  app.use(i18n);
  // app.component('v-chart', ECharts);
  loadPlugins(app);
  app.use(router);

  // setMenus(menus);
  app.mount('#app');
}

window.mount = () => {
  initApp();
};

window.unmount = () => {
  app?.unmount();
  app = null;
};
// @ts-ignore
if (!window.__MICRO_APP_ENVIRONMENT__) {
  // @ts-ignore
  window.mount();
}
