// https://nuxt.com/docs/api/configuration/nuxt-config
import pkg from './package.json';
import { resolve } from 'path';

export default defineNuxtConfig({
  hooks: {
    ready: (nuxt) => {},
  },

  nitro: {
    alias: {
      '@': resolve(__dirname, './app'),
    },
  },

  app: {
    head: {
      title: 'Nuxt test',
      meta: [{ name: 'description', content: 'Nuxt test project' }],
      htmlAttrs: {
        lang: 'zh-cn',
      },
      script: [],
    },

    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },

    // layoutTransition: {
    //   name: 'layout',
    //   mode: 'out-in',
    // },
  },

  echarts: {
    charts: ['PieChart', 'LineChart', 'ScatterChart', 'BarChart'],
    components: [
      'GridComponent',
      'TooltipComponent',
      'LegendComponent',
      'DataZoomComponent',
      'MarkAreaComponent',
      'MarkLineComponent',
      'MarkPointComponent',
      'VisualMapComponent',
      'TimelineComponent',
      'TitleComponent',
    ],
  },
  vite: {
    server: {
      // @ts-ignore
      allowedHosts: ['local.dev.energy.cloud', '127.0.0.1'],
    },
    vueJsx: {
      mergeProps: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/style/theme.scss" as *;`,
        },
      },
    },
  },
  postcss: {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 16,
        propList: ['*'],
        replace: true, // 直接更换成rem
        mediaQuery: true, // 是否要在媒体查询中转换px
      },
    },
  },
  alias: {
    '@': resolve(__dirname, './app'),
  },

  runtimeConfig: {
    apiSecret: 'test',
    redis: {
      // 默认值
      host: '',
      port: 0,
      /* 其他 redis 连接选项 */
    },
    public: {
      apiBase: '/api',
    },
  },

  modules: [
    '@element-plus/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxt/test-utils/module',
    'nuxt-echarts',
    'motion-v/nuxt',
  ],

  css: ['@csstools/normalize.css', 'animate.css', '@/assets/style/index.scss'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    port: pkg.config.nuxt.port,
    host: pkg.config.nuxt.host,
  },
  $production: {
    devtools: { enabled: false },
    routeRules: {},
  },
  $development: {
    devtools: { enabled: true },
  },
  $test: {
    devtools: { enabled: true },
  },
  $env: {},
});
