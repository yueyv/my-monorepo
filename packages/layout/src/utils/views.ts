const modules = import.meta.glob(['@/views/*.vue', '@/views/**/*.vue']);

export function getViewModule(name: string): any {
  // 配置的文件路径中包含文件扩展名
  const module = modules[`/src/views/${name}`];
  if (!module) {
    return '';
  }
  return module;
}
