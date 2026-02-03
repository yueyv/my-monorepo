import { defineConfig, presetAttributify, presetUno } from 'unocss';

export default defineConfig({
  /** 预设 */
  presets: [
    /** 属性化模式 & 无值的属性模式 */
    presetAttributify(),
    /** 默认预设 */
    presetUno(),
  ],
  /** 自定义规则 */
  rules: [],
  /** 自定义快捷方式 */
  shortcuts: {},
  theme: {
    breakpoints: {
      '2k': '2560px',
      '4k': '3840px',
    },
  },
});
