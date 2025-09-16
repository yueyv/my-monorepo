import { getAppHost } from '@deri/request';
import { h } from 'vue';

// vite里加载webpack module federation实现

// 多个相同的script加载时，只加载一次
let scriptPending = new Map<string, any[]>();

/**
 * 加载远程js文件
 * @param source
 * @param async
 * @returns
 */
export function getScript(source: string, async = true) {
  return new Promise(function (resolve: (param: void) => void, reject) {
    if (scriptPending.has(source)) {
      scriptPending.get(source)?.push(resolve);
    } else {
      scriptPending.set(source, [resolve]);
      let script: any = document.createElement('script');
      if (async) {
        script.async = 1;
      }
      document.body.appendChild(script);
      script.onerror = reject;
      script.onload = script.onreadystatechange = function (_: any, isAbort: boolean) {
        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
          if (!isAbort) {
            script.parentNode.removeChild(script);
            scriptPending.get(source)?.forEach((resolve) => {
              resolve();
            });
            scriptPending.delete(source);
          }
          script.onload = script.onreadystatechange = null;
          script = null;
        }
      };

      script.src = source;
    }
  });
}

let sharedScope: Record<string, any>;
export async function createSharedScope() {
  if (!sharedScope) {
    const Vue = await import('vue');
    const VueI18n = await import('vue-i18n');
    const Pinia = await import('pinia');
    const VueRouter = await import('vue-router');
    sharedScope = {
      vue: {
        default: {
          get: () => () => Vue,
          eager: true,
        },
      },
      'vue-i18n': {
        default: {
          get: () => () => VueI18n,
          eager: true,
        },
      },
      pinia: {
        default: {
          get: () => () => Pinia,
          eager: true,
        },
      },
      'vue-router': {
        default: {
          get: () => () => VueRouter,
          eager: true,
        },
      },
    };
  }
  return sharedScope;
}

/**
 * 导入组件
 * @param modulePath
 * @param name
 * @param moduleName
 */
export async function importComponent(modulePath: string, name: string, moduleName: string) {
  try {
    // @ts-ignore
    if (!window[moduleName]) {
      await getScript(modulePath);
    }
    const sharedScope = await createSharedScope();
    // @ts-ignore
    await window[moduleName].init(sharedScope);
    // @ts-ignore
    const loadModule = await window[moduleName].get(`./${name}`);
    const module = loadModule();
    return module.default || module;
  } catch (e) {
    return h('div', { style: { width: '100%', height: '100%' } });
  }
}

// 根据路径判断是否为需要远程加载的组件
export function isRemoteComponent(path: string) {
  return /\w+:\w+@\w+/.test(path);
}

/**
 * 远程加载组件
 * @param path
 * @returns
 */
export function importRemoteComponent(path: string) {
  // path: 域名或前缀:模块名称@组件名称
  const [url, componentName] = path.split('@');
  const [appName, moduleName] = url.split(':');
  const modulePath = `${getAppHost(appName)}/${moduleName}.js`;
  return importComponent(modulePath, componentName, moduleName);
}
