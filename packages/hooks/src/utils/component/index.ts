export function getRemotePath(path: string | undefined) {
  if (!path) {
    return '';
  }
  if (path.startsWith('http')) {
    return path;
  } else if (window.baseURL) {
    return `${window.baseURL}${path}`;
  } else {
    return path;
  }
}
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

async function importLib(filename: string, globalName?: string) {
  const global: any = window;
  const name = globalName || filename;
  if (!global[name]) {
    await getScript(`${getRemotePath(process.env.HUB_PATH)}libs/${filename}.js`);
  }
  return global[name];
}

export function importEcharts(): Promise<any> {
  return importLib('echarts');
}
