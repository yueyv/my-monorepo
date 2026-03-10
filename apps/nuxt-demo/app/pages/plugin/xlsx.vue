<template>
  <div class="content-container">
    <el-button @click="handleImport" type="primary">导入测试</el-button>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  title: 'Xlsx 演示',
  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },
});
const b = { xx: 1 };
const a = ref(b);
console.log(a.value.xx);
b.xx = 2;
console.log(a.value.xx);
a.value.xx = 3;
console.log(a.value.xx);
b.xx = 4;
a.value = b;
console.log(a.value.xx);
const handleImport = () => {
  const file = document.createElement('input');
  file.type = 'file';
  file.accept = '.xlsx,.xls';
  file.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result;
      };
    }
  };
  file.click();
};
</script>
<style lang="scss" scoped></style>
