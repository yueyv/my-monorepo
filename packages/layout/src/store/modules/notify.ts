import { defineStore } from 'pinia';
import { ref } from 'vue';
import store from '../index';

type TabName = '通知' | '消息' | '待办';

type ListItem = {
  vnode: any;
};

interface DataItem {
  name: TabName;
  type: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  list: ListItem[];
  toView: (params: DataItem) => void; // 跳转到通知历史页面
}

// 存储未处理的通知消息
export const useNotifyStore = defineStore('admin-notify', () => {
  // 通知消息列表
  const notifyData = ref<DataItem[]>([]);

  // 调用此方法认为系统支持消息显示
  function setNotifyData(data: DataItem[]) {
    notifyData.value = data;
  }

  return {
    notifyData,
    setNotifyData,
  };
});

/** 在 setup 外使用 */
export function useNotifyStoreHook() {
  return useNotifyStore(store);
}
