import { App, MaybeRefOrGetter, computed, toValue } from 'vue';
import { provideGlobalConfig, ConfigProviderContext } from 'element-plus';
import zhCnEle from 'element-plus/es/locale/lang/zh-cn';

export const useElementConfig = (
  config: MaybeRefOrGetter<ConfigProviderContext> = {},
  app?: App<any>
) => {
  const elementConfig = computed(() => {
    return {
      locale: zhCnEle,
      valueOnClear: () => null,
      ...toValue(config),
    };
  });

  provideGlobalConfig(elementConfig, app);
};
