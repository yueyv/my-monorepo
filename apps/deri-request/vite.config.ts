import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@base-layout': path.resolve('../../packages/base-layout', './src'),
    },
  },
  server: {
    host: true,
    port: 3200,
    /** 预热常用文件，提高初始页面加载速度 */
    warmup: {
      clientFiles: ['./src/layouts/**/*.vue'],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
          element: ['element-plus', '@element-plus/icons-vue'],
        },
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    UnoCSS(),
  ],
});
