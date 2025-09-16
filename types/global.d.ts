interface Window {
  baseURL: string;
  rootApp: any;
  gatewayPrefix: string;
  sassTag: string; // 平台标签
  _disableInitQueryParams: boolean;
  echarts: any;
  mount: Function;
  unmount: Function;
  microApp: any;
  __MICRO_APP_ENVIRONMENT__: any;
}
