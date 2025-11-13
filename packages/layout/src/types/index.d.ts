declare module 'vue-symbol-icon' {
  const SvgIcon: any;
  export default SvgIcon;
}

interface Window {
  baseURL: string;
  rootApp: any;
  gatewayPrefix: string; // 网关配置接口前缀
  sassTag: string; // 平台标签
  echarts: any;
  mount: Function;
  unmount: Function;
}
