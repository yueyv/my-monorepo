// 菜单项类型定义
interface MenuItem {
  path: string;
  title: string;
  icon?: string;
  order?: number;
  children?: MenuItem[];
}

// 路由配置类型
interface RouteConfig {
  title: string;
  icon?: string;
  order?: number;
  hidden?: boolean;
}
