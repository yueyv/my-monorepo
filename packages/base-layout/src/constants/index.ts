/** 设备类型 */
export enum DeviceEnum {
  Mobile,
  Desktop,
}

/** 布局模式 */
export enum LayoutModeEnum {
  Left = 'left',
  Top = 'top',
  LeftTop = 'left-top',
}

/** 侧边栏打开状态常量 */
export const SIDEBAR_OPENED = 'opened';
/** 侧边栏关闭状态常量 */
export const SIDEBAR_CLOSED = 'closed';

export const ROOT_LAYOUT_NAME = 'HomeLayout';

// storeage key
export const SIDE_BAR_OPENED_KEY = `forecast@SIDE_BAR_OPENED`;
export const LAYOUT_STATE_KEY = `forecast@LAYOUT_STATE`;
export const VISITED_VIEWS_KEY = `forecast@VISITED_VIEWS`;
export const CACHED_VIEWS = `forecast@CACHED_VIEWS`;

export type SidebarOpened = typeof SIDEBAR_OPENED;
export type SidebarClosed = typeof SIDEBAR_CLOSED;
