<script lang="ts" setup>
import { isExternal } from '../../utils/validate';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

interface Props {
  to: string;
}

const props = defineProps<Props>();
const route = useRoute();

const to = computed(() => {
  const query = route.query || {};
  return {
    path: props.to,
    query: { ...query },
  };
});
</script>

<template>
  <a v-if="isExternal(props.to)" :href="props.to" target="_blank" rel="noopener">
    <slot />
  </a>
  <router-link v-else :to="to">
    <slot />
  </router-link>
</template>
