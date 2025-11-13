<template>
  <div :class="{ collapse: props.collapse, 'layout-mode-left': isLeft }">
    <router-link v-if="props.collapse" key="collapse" to="/">
      <div class="p2">
        <img :src="appLogo" class="layout-logo" />
      </div>
    </router-link>
    <router-link v-else key="expand" to="/">
      <div class="flex items-center justify-center p-2">
        <div class="layout-logo-text">{{ appName }}</div>
      </div>
    </router-link>
  </div>
</template>
<script lang="ts" setup>
import { useLayoutMode } from '../hooks/useLayoutMode';
import { useAppStore } from '../store/modules/app';

interface Props {
  collapse?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  collapse: true,
});

const { isLeft } = useLayoutMode();

const { appName, appLogo } = useAppStore();
</script>
<style lang="scss">
.layout-logo {
  height: 30px;
}
.collapse {
  .layout-logo {
    width: 100%;
    height: unset;
  }
}
.layout-logo-text {
  font-size: 2rem;
}
.layout-mode-left .layout-logo-text {
  color: rgb(207, 211, 220);
}
.layout-logo-text {
  color: white;
}
</style>
