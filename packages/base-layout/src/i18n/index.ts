import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  silentFallbackWarn: true,
  silentTranslationWarn: true,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {},
  legacy: false,
});

export default i18n;
