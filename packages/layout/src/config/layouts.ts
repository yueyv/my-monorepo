import { getConfigLayout } from '../utils/cache';
import { LayoutModeEnum } from '../constants';

/** 项目配置类型 */
export interface LayoutSettings {
  /** 是否显示 Settings Panel */
  showSettings: boolean;
  /** 布局模式 */
  layoutMode: LayoutModeEnum;
  /** 是否显示标签栏 */
  showTagsView: boolean;
  /** 是否显示 Logo */
  showLogo: boolean;
  /** 是否固定 Header */
  fixedHeader: boolean;
  /** 是否显示消息通知 */
  showNotify: boolean;
  /** 是否显示切换主题按钮 */
  showThemeSwitch: boolean;
  /** 是否显示全屏按钮 */
  showScreenfull: boolean;
  /** 是否显示搜索按钮 */
  showSearchMenu: boolean;
  /** 是否缓存标签栏 */
  cacheTagsView: boolean;
}

/** 默认配置 */
const defaultSettings: LayoutSettings = {
  layoutMode: LayoutModeEnum.Left,
  showSettings: true,
  showTagsView: true,
  fixedHeader: true,
  showLogo: true,
  showNotify: true,
  showThemeSwitch: true,
  showScreenfull: true,
  showSearchMenu: true,
  cacheTagsView: false,
};

/** 项目配置 */
export const layoutSettings: LayoutSettings = {
  ...defaultSettings,
  ...getConfigLayout(),
};
