export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // 处理错误，例如报告到某个服务
    console.error('Vue Error:', error, info);
  };

  // 也可以这样
  nuxtApp.hook('vue:error', (error, instance, info) => {
    // 处理错误，例如报告到某个服务
    console.error('Vue Error (hook):', error, info);
  });
});
