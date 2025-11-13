import { isString, sortBy, snakeCase, camelCase, upperFirst, replace } from 'lodash-es';
import { ElMessageBox } from 'element-plus';
import { removeConfigLayout } from './cache';
import { parsePathname, requestSSO } from '@deri/request';

/**
 * 获取产品code
 * @returns
 */
export function getProductCode() {
  return parsePathname()?.toUpperCase();
}

/** 重置项目配置 */
export const resetConfigLayout = () => {
  removeConfigLayout();
  location.reload();
};

export function isEmpty(obj: any) {
  if (obj == null) return true;
  if (isString(obj)) return obj.trim().length === 0;
  if (obj.length !== undefined) return obj.length === 0;
  if (Object.prototype.toString.call(obj) === '[object Number]') return false;
  return Object.keys(obj).length === 0;
}

export function validateBlank(_: any, value: any, callback: any) {
  if (isEmpty(value)) {
    callback(new Error('不能为空'));
  } else {
    const val = value.toString().trim();
    if (val == '') {
      callback(new Error('不能为空'));
    } else {
      callback();
    }
  }
}

export async function confirm(msg = '确认执行当前操作吗？', html: boolean = false) {
  try {
    await ElMessageBox.confirm(msg, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      dangerouslyUseHTMLString: html,
    });
    return Promise.resolve({
      data: msg,
    });
  } catch {
    return Promise.reject({
      msg: '取消',
    });
  }
}

/**
 * 去除首尾空格
 * @param str
 * @returns
 */
export function formatSpaceWord(str: string) {
  return str.replace(/^[\ \r\n]+/g, '').replace(/[\ \r\n]+$/g, '');
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path: string, allowAboveRoot?: boolean) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length) code = path.charCodeAt(i);
    else if (code === 47 /*/*/) break;
    else code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (
          res.length < 2 ||
          lastSegmentLength !== 2 ||
          res.charCodeAt(res.length - 1) !== 46 /*.*/ ||
          res.charCodeAt(res.length - 2) !== 46 /*.*/
        ) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0) res += '/..';
          else res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) res += '/' + path.slice(lastSlash + 1, i);
        else res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function assertPath(path: string) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

export function resolve(..._: string[]) {
  var resolvedPath = '';
  var resolvedAbsolute = false;
  var cwd = '/';

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path;
    if (i >= 0) path = arguments[i];
    else {
      path = cwd;
    }

    assertPath(path);

    // Skip empty entries
    if (path.length === 0) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

  if (resolvedAbsolute) {
    if (resolvedPath.length > 0) return '/' + resolvedPath;
    else return '/';
  } else if (resolvedPath.length > 0) {
    return resolvedPath;
  } else {
    return '.';
  }
}

/**
 * 获取图片文件
 * @param params
 * @returns
 */
export function getImageBlob(imgName: string): Promise<any> {
  return requestSSO(
    '/common/getImg',
    'get',
    {
      imgName,
    },
    {
      responseType: 'blob',
    }
  );
}

/**
 * 获取图片
 * @param url
 * @returns
 */
export function getImageDataURL(url: string, defaultImage = ''): Promise<string> {
  return new Promise(async (resolve) => {
    if (url === '' || url === null) {
      resolve(defaultImage);
      return;
    }
    try {
      let imageURL = url.startsWith('/') ? url.slice(1) : url;
      const file: Blob = await getImageBlob(imageURL);
      const dataUrl = await getFileDataUrl(file);
      resolve(dataUrl);
    } catch {
      resolve(defaultImage);
    }
  });
}

/**
 * blob转dataURL
 * @param file
 * @returns
 */
export function getFileDataUrl(file: Blob | File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function () {
      resolve(this.result as string);
    };
    fileReader.onerror = function (error) {
      reject(error);
    };
  });
}

/**
 * 菜单转换
 * @param platMenus
 * @param menus
 * @returns
 */
export function convertMenus(platMenus: PlatMenu[], menus: StandardMenu[]) {
  if (!platMenus) {
    return [];
  }
  let tmenus = sortBy(platMenus, 'menuOrder');
  tmenus.forEach((platMenu) => {
    // 排除按钮
    if (platMenu.menuType !== 3) {
      // 网关切换
      let menu: StandardMenu = !platMenu.menuUrl.includes('@')
        ? {
            path: '/' + snakeCase(platMenu.menuUrl),
            name: upperFirst(camelCase(platMenu.menuUrl)),
            meta: {
              icon: upperFirst(camelCase(replace(platMenu.menuIcon, 'el-icon-', ''))),
              title: platMenu.menuName,
              path: platMenu.menuUrl + '.vue', // 组件文件路径
            },
            children: [],
          }
        : {
            path: '/' + snakeCase(platMenu.menuUrl.replace(/^.*\:/, '').replace('@', '')),
            name: upperFirst(camelCase(platMenu.menuUrl.replace(/^.*\:/, '').replace('@', ''))),
            meta: {
              icon: upperFirst(camelCase(replace(platMenu.menuIcon, 'el-icon-', ''))),
              title: platMenu.menuName,
              path: platMenu.menuUrl, // 路由文件路径
            },
            children: [],
          };
      if (platMenu.children) {
        convertMenus(platMenu.children, menu.children!);
      }
      menus.push(menu);
    }
  });
}
