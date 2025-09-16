<template>
  <div>测试模块</div>
  <TestModule />
</template>
<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';
import { getViewModule } from '../utils/views';

const TestModule = defineAsyncComponent(getViewModule('TestModule/Test.vue'));
</script>
