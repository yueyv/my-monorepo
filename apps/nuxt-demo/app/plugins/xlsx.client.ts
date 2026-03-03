import * as xlsx from 'xlsx';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('xlsx', xlsx);
});

// 下面是类型声明，让 TS 知道有 $xlsx

declare module '#app' {
  interface NuxtApp {
    $xlsx: typeof xlsx;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $xlsx: typeof xlsx;
  }
}
