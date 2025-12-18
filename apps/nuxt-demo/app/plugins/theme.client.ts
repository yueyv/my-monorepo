import { useSystemStore } from '@/store';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:beforeMount', () => {
    const systemStore = useSystemStore();
    // 在应用启动时立即初始化主题
    systemStore.initTheme();
  });
});
