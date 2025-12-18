<!-- Mock.js 使用示例文件 -->
<template>
  <div class="mock-example p-6">
    <h2 class="text-2xl font-bold mb-4">Mock.js 快速使用示例</h2>
    
    <!-- 示例 1: 基础用法 -->
    <section class="mb-6">
      <h3 class="text-xl font-bold mb-2">1. 基础用法</h3>
      <el-button @click="example1" type="primary">生成用户数据</el-button>
      <pre v-if="result1" class="mt-2 p-4 bg-gray-100 rounded">{{ result1 }}</pre>
    </section>

    <!-- 示例 2: Mock.js 语法 -->
    <section class="mb-6">
      <h3 class="text-xl font-bold mb-2">2. Mock.js 数据模板语法</h3>
      <el-button @click="example2" type="primary">生成自定义数据</el-button>
      <pre v-if="result2" class="mt-2 p-4 bg-gray-100 rounded">{{ result2 }}</pre>
    </section>

    <!-- 示例 3: 正则表达式 -->
    <section class="mb-6">
      <h3 class="text-xl font-bold mb-2">3. 正则表达式生成</h3>
      <el-button @click="example3" type="primary">生成验证数据</el-button>
      <pre v-if="result3" class="mt-2 p-4 bg-gray-100 rounded">{{ result3 }}</pre>
    </section>
  </div>
</template>

<script setup lang="ts">
const { $mock } = useNuxtApp()

const result1 = ref('')
const result2 = ref('')
const result3 = ref('')

// 示例 1: 使用封装好的方法
const example1 = () => {
  const users = $mock.generateUsers(5)
  result1.value = JSON.stringify(users, null, 2)
}

// 示例 2: 使用 Mock.js 数据模板
const example2 = () => {
  const data = $mock.mock({
    'list|10': [{
      'id|+1': 1,
      name: '@chineseName',
      'age|18-60': 1,
      city: '@chineseCity',
      email: '@email',
      'score|1-100.1-2': 1
    }]
  })
  result2.value = JSON.stringify(data, null, 2)
}

// 示例 3: 使用正则表达式
const example3 = () => {
  const data = $mock.mock({
    phone: /^1[3-9]\d{9}$/,
    idCard: /^[1-9]\d{17}$/,
    plateNumber: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-F0-9]{5}$/
  })
  result3.value = JSON.stringify(data, null, 2)
}
</script>

<style scoped>
pre {
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.5;
}
</style>

