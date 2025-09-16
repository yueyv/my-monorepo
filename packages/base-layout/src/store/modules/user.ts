import { defineStore } from 'pinia';
import { ref } from 'vue';
import store from '..';
import { ElMessageBox } from 'element-plus';
import { logoutSystem, getUserInfo } from '@deri/request';
import { getImageDataURL } from '../../utils';

const DEFAULT_AVATAR =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjU2Mjk4NTMyNjc1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM2Mjc3IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPkBmb250LWZhY2UgeyBmb250LWZhbWlseTogZmVlZGJhY2staWNvbmZvbnQ7IHNyYzogdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzEwMzExNThfdTY5dzh5aHhkdS53b2ZmMj90PTE2MzAwMzM3NTk5NDQiKSBmb3JtYXQoIndvZmYyIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xMDMxMTU4X3U2OXc4eWh4ZHUud29mZj90PTE2MzAwMzM3NTk5NDQiKSBmb3JtYXQoIndvZmYiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzEwMzExNThfdTY5dzh5aHhkdS50dGY/dD0xNjMwMDMzNzU5OTQ0IikgZm9ybWF0KCJ0cnVldHlwZSIpOyB9DQo8L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTE0IDExNC4zYy0yMTkuOSAwLTM5OC44IDE3OC45LTM5OC44IDM5OC44IDAgMjIwIDE3OC45IDM5OC45IDM5OC44IDM5OC45czM5OC44LTE3OC45IDM5OC44LTM5OC45YzAtMjE5LjgtMTc4LjktMzk4LjgtMzk4LjgtMzk4Ljh6IG0wIDcwMS42Yy0xNjYuOSAwLTMwMi43LTEzNS44LTMwMi43LTMwMi43UzM0Ny4xIDIxMC41IDUxNCAyMTAuNXMzMDIuNyAxMzUuOCAzMDIuNyAzMDIuN1M2ODAuOSA4MTUuOSA1MTQgODE1Ljl6IiBmaWxsPSIjQkREMkVGIiBwLWlkPSIzNjI3OCIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC43NzgxMDY5LjAuaTMiIGNsYXNzPSJzZWxlY3RlZCI+PC9wYXRoPjxwYXRoIGQ9Ik01MTQgMzQ2LjNtLTE1NS4yIDBhMTU1LjIgMTU1LjIgMCAxIDAgMzEwLjQgMCAxNTUuMiAxNTUuMiAwIDEgMC0zMTAuNCAwWiIgZmlsbD0iIzU5N0ZGNyIgcC1pZD0iMzYyNzkiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guNzc4MTA2OS4wLmkxIiBjbGFzcz0ic2VsZWN0ZWQiPjwvcGF0aD48cGF0aCBkPSJNNjI2LjkgNDk3LjljLTMxLjUgMjMuNS03MC42IDM3LjQtMTEyLjkgMzcuNHMtODEuNC0xMy45LTExMi45LTM3LjRjLTcwLjIgMzAuNy0xMjUuNSA4OS0xNTIuMSAxNjEuMyA1MS42IDkzLjMgMTUxIDE1Ni43IDI2NSAxNTYuN3MyMTMuNC02My40IDI2NS4xLTE1Ni43Yy0yNi43LTcyLjMtODItMTMwLjYtMTUyLjItMTYxLjN6IiBmaWxsPSIjNTk3RkY3IiBwLWlkPSIzNjI4MCIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC43NzgxMDY5LjAuaTAiIGNsYXNzPSJzZWxlY3RlZCI+PC9wYXRoPjwvc3ZnPg==';

export const useUserStore = defineStore('admin-user', () => {
  // 用户名
  const username = ref('');
  // 用户头像
  const avatar = ref(DEFAULT_AVATAR);

  const info = getUserInfo();
  username.value = info.alias;
  getImageDataURL(info.avatar, DEFAULT_AVATAR).then((data) => {
    avatar.value = data;
  });

  const logout = () => {
    ElMessageBox.confirm('确认退出登录?', '提示', {
      type: 'info',
    }).then(() => {
      // 退出登录
      logoutSystem();
    });
  };

  return {
    username,
    logout,
    avatar,
  };
});

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store);
}
