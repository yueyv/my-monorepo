import { SYSTEM_THEME_KEY, SYSTEM_THEME_LIGHT, SYSTEM_THEME_DARK } from '../constant';

export const useSystemStore = defineStore('systemStore', {
  state: () => ({
    theme: SYSTEM_THEME_LIGHT,
  }),
  actions: {
    // 初始化主题，从 localStorage 读取
    initTheme() {
      // 只在客户端环境中访问 localStorage
      if (import.meta.client) {
        const savedTheme = localStorage.getItem(SYSTEM_THEME_KEY);
        if (savedTheme === SYSTEM_THEME_DARK || savedTheme === SYSTEM_THEME_LIGHT) {
          this.theme = savedTheme;
        }
      }
      this.applyTheme();
    },
    // 设置主题
    setTheme(theme: string) {
      this.theme = theme;
      // 只在客户端环境中访问 localStorage
      if (import.meta.client) {
        localStorage.setItem(SYSTEM_THEME_KEY, theme);
      }
      this.applyTheme();
    },
    // 应用主题到 document
    applyTheme() {
      // 只在客户端环境中操作 DOM
      if (import.meta.client) {
        if (this.theme === SYSTEM_THEME_DARK) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
  },
});
