<script setup lang="ts">
import { requestCommon } from '@/request';

// 测试能量云auth服务
requestCommon('/mgec/auth-v3/common/getSelfZone', 'get').then(({ data }) => {
  console.log(data);
});

requestCommon(
  '/mgec/auth-v3/role/getIdByCodeAndToken',
  'get',
  {
    code: 'MGEC',
  },
  {
    headers: {
      projectid: '1',
    },
  },
).then(({ data }) => {
  console.log(data);
});

// 测试能量云网关
requestCommon(
  '/mgec/api/v3/bff/product_info/query',
  'post',
  { code: 'MGEC' },
  {
    headers: {
      projectid: '1',
      productid: '104',
    },
  },
).then(({ data }) => {
  console.log(data);
});
</script>

<template>
  <div></div>
</template>

<style scoped></style>
