<template>
  <el-sub-menu
    v-if="menuItem.children && menuItem.children.length > 0"
    :index="menuItem.name"
    teleported
  >
    <template #title>
      <ElementIcon v-show="menuItem.meta?.icon" :icon="menuItem.meta?.icon" :size="20" />
      <span v-if="menuItem.meta?.title">{{ menuItem.meta?.title }}</span>
    </template>
    <sidebar-item :menuItem="childItem" v-for="childItem in menuItem.children" />
  </el-sub-menu>
  <template v-else>
    <SidebarItemLink :to="resolvePath(menuItem.path)">
      <el-menu-item :index="menuItem.path">
        <ElementIcon v-show="menuItem.meta?.icon" :icon="menuItem.meta?.icon" :size="20" />
        <template #title>
          {{ menuItem.meta?.title }}
        </template>
      </el-menu-item>
    </SidebarItemLink>
  </template>
</template>
<script lang="ts" setup>
import { isExternal } from '../../utils/validate';
import SidebarItemLink from './SidebarItemLink.vue';
import { resolve } from '../../utils';
import ElementIcon from '../ElementIcon.vue';

interface Props {
  menuItem: StandardMenu;
}

defineOptions({
  name: 'SidebarItem',
});

const props = defineProps<Props>();

/** 解析路径 */
const resolvePath = (routePath: string) => {
  switch (true) {
    case isExternal(routePath):
      return routePath;
    case isExternal(props.menuItem.path):
      return props.menuItem.path;
    default:
      return resolve(props.menuItem.path, routePath);
  }
};
</script>
<style lang="scss" scoped>
.el-icon {
  width: 1em;
  margin-right: 12px;
  font-size: 18px;
}
</style>
