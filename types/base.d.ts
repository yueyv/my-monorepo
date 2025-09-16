// 平台标准菜单
interface StandardMenu {
  path: string;
  name: string;
  meta: {
    icon?: string;
    title: string;
    hidden?: boolean;
    path?: string;
    openNewPage?: boolean; // 打开新页面
  };
  children?: StandardMenu[];
}

// 平台权限
interface PlatMenu {
  productId: number;
  menuUrl: string;
  menuType: number;
  menuParentId?: number | null;
  menuOrder: number;
  menuName: string;
  menuId: number;
  menuIcon: string;
  children?: PlatMenu[];
}

// 产品信息
interface ProductInfo {
  productOrder: number;
  productName: string;
  productLevel: number;
  productId: number;
  productIcon: string;
  productCode: string;
  defaultPath: string;
}
