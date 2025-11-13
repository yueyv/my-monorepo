import { type App } from 'vue';
import { loadElementPlusIcon } from './element-plus-icon';

export function loadPlugins(app: App) {
  loadElementPlusIcon(app);
}
