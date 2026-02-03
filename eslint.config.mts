import tseslint from 'typescript-eslint';

import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.vite/**',
      '**/coverage/**',
      '**/*.config.{js,ts,mjs,cjs}',
      '**/pnpm-lock.yaml',
      '**/package-lock.json',
      '**/yarn.lock',
      '**/amap.d.ts',
      '**/ht.d.ts',
      '**/handsontable.d.ts',
      '**/*.js',
      '**/*.mjs',
      '**/*.cjs',
      'apps/vpp-management/src/components/VirtualTable.vue',
    ],
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ['**/*.{ts,mts,cts,vue,tsx}'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
]);
