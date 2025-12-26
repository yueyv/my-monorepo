import { SYSTEM_THEME_KEY, SYSTEM_THEME_LIGHT, SYSTEM_THEME_DARK } from '../constant';

export const useSystemStore = defineStore('systemStore', {
  state: () => ({
    theme: SYSTEM_THEME_LIGHT,
  }),
  actions: {
    initTheme() {
      if (import.meta.client) {
        const savedTheme = localStorage.getItem(SYSTEM_THEME_KEY);
        if (savedTheme === SYSTEM_THEME_DARK || savedTheme === SYSTEM_THEME_LIGHT) {
          this.theme = savedTheme;
        }
      }
      this.applyTheme();
    },
    setTheme(theme: string) {
      this.theme = theme;
      if (import.meta.client) {
        localStorage.setItem(SYSTEM_THEME_KEY, theme);
      }
      this.applyTheme();
    },
    applyTheme() {
      if (import.meta.client) {
        if (this.theme === SYSTEM_THEME_DARK) {
          document.documentElement.classList.toggle('dark', true);
        } else {
          document.documentElement.classList.toggle('dark', false);
        }
      }
    },
  },
});
