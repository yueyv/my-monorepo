import { createApp, h } from 'vue';
import App from './App.vue';
import store from '@base-layout/store';
import { initRouter } from './router';
import { usePermissionStoreHook } from '@base-layout/store/modules/permission';
import { useNotifyStoreHook } from '@base-layout/store/modules/notify';
import { loadPlugins } from '@base-layout/plugins';
import { ElCard, ElButton } from 'element-plus';
import 'virtual:uno.css';
import 'normalize.css';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import '@base-layout/styles/index.scss';
import menu from './menu';
import i18n from './i18n';

// TODO: 通知列表
function createNotifyList(notifyList: any[]): any[] {
  return notifyList.map((v) =>
    h(
      ElCard,
      {},
      {
        default: () => {
          return [
            h('div', v.description),
            h('div', { style: { display: 'flex', justifyContent: 'end' } }, v.datetime),
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  justifyContent: 'center',
                },
              },
              [
                h(ElButton, { type: 'primary' }, '通过'),
                h(ElButton, { style: { marginLeft: '10px' } }, '拒绝'),
              ]
            ),
          ];
        },
      }
    )
  );
}

const app = createApp(App);
window.rootApp = app;
app.use(store);
app.use(i18n);
app.use(initRouter());
loadPlugins(app);
const { setMenus } = usePermissionStoreHook();
// 设置菜单
setMenus(menu);
// 设置消息
const { setNotifyData } = useNotifyStoreHook();
setNotifyData([
  {
    name: '通知',
    type: 'primary',
    list: createNotifyList([
      {
        title: '测试',
        datetime: '2024-12-12 12:12:12',
        description: '【李小逊】为【德睿办公楼】项目申请扩容【10】个用户',
      },
    ]),
    toView: () => {
      // 路由跳转
    },
  },
]);
app.mount('#app');
