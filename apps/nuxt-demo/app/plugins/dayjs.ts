declare module '#app' {
  interface NuxtApp {
    $dayjs: typeof dayjs;
  }
}
// @ts-ignore
import dayjs from 'dayjs';
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('dayjs', dayjs);
});
