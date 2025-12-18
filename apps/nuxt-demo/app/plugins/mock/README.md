# Mock 数据生成器使用文档

这是一个基于 **Mock.js** 的强大数据生成工具，专为 Nuxt 3 项目设计，提供丰富的数据模拟功能。

## 🚀 技术栈

- **Mock.js** - 强大的前端数据模拟库
- **TypeScript** - 完整的类型支持
- **Nuxt 3** - 作为 Nuxt 插件集成

## 📦 已安装的依赖

```json
{
  "dependencies": {
    "mockjs": "^1.1.0"
  },
  "devDependencies": {
    "@types/mockjs": "^1.0.10"
  }
}
```

## 🎯 快速开始

### 访问演示页面

启动项目后，访问 `/mock-demo` 路径查看完整的演示和使用示例。

### 基础使用

```vue
<script setup lang="ts">
const { $mock } = useNuxtApp()

// 生成数据
const users = $mock.generateUsers(10)
const posts = $mock.generatePosts(20)
</script>

<template>
  <div>
    <div v-for="user in users" :key="user.id">
      {{ user.name }} - {{ user.email }}
    </div>
  </div>
</template>
```

## 📖 API 文档

### 1. 用户数据

#### generateUser(id: number): MockUser
生成单个用户数据

```typescript
const user = $mock.generateUser(1)
// 返回: { id, name, email, avatar, phone, address, age, gender, createdAt }
```

#### generateUsers(count: number = 10): MockUser[]
生成多个用户数据

```typescript
const users = $mock.generateUsers(50)
```

### 2. 文章数据

#### generatePost(id: number, userId?: number): MockPost
生成单篇文章

```typescript
const post = $mock.generatePost(1, 123) // id=1, authorId=123
```

#### generatePosts(count: number = 20): MockPost[]
生成多篇文章

```typescript
const posts = $mock.generatePosts(100)
```

### 3. 评论数据

#### generateComment(id: number, postId: number, userId?: number): MockComment
生成单条评论

```typescript
const comment = $mock.generateComment(1, 1) // id=1, postId=1
```

#### generateComments(postId: number, count: number = 10): MockComment[]
生成多条评论

```typescript
const comments = $mock.generateComments(1, 20) // 为文章ID=1生成20条评论
```

### 4. 表格数据

#### generateTableData(rows: number = 50)
生成通用表格数据

```typescript
const tableData = $mock.generateTableData(100)
```

### 5. 树形数据

#### generateTreeData(depth: number = 3, childrenPerNode: number = 3)
生成树形结构数据

```typescript
const treeData = $mock.generateTreeData(3, 4)
```

### 6. 分页列表

#### generateList<T>(generator, total, page, pageSize)
生成带分页信息的列表数据

```typescript
const pagedData = $mock.generateList(
  (id) => $mock.generateUser(id),
  100,  // 总条数
  1,    // 当前页
  10    // 每页条数
)
```

## 🎨 Mock.js 高级用法

### 直接使用 Mock.js

插件导出了 Mock.js 实例，你可以直接使用它的所有功能：

```typescript
const { $mock } = useNuxtApp()

// 使用 Mock.js 原生语法
const data = $mock.mock({
  'list|10-20': [{
    'id|+1': 1,
    'name': '@chineseName',
    'age|18-60': 1,
    'score|1-100.1-2': 1
  }]
})
```

### Mock.js 数据模板语法

#### 1. 字符串

```typescript
// 基础占位符
$mock.mock({
  name: '@name',           // 英文名
  cname: '@cname',         // 中文名
  chineseName: '@chineseName', // 自定义中文名
  email: '@email',         // 邮箱
  url: '@url',            // URL
  ip: '@ip',              // IP地址
  guid: '@guid',          // GUID
  id: '@id'               // 身份证号
})

// 日期时间
$mock.mock({
  date: '@date',          // 日期 YYYY-MM-DD
  time: '@time',          // 时间 HH:mm:ss
  datetime: '@datetime',  // 日期时间
  now: '@now'            // 当前时间
})

// 图片
$mock.mock({
  image: '@image(200x100)',           // 图片
  dataImage: '@dataImage(200x100)',   // Base64图片
})
```

#### 2. 数字

```typescript
$mock.mock({
  // 自然数
  'age|18-60': 1,        // 18到60之间的整数
  
  // 浮点数
  'price|1-100.1-2': 1,  // 1到100之间，小数点后1-2位
  
  // 自增ID
  'id|+1': 1000,         // 从1000开始自增
  
  // 随机数
  integer: '@integer(60, 100)',  // 60到100的整数
  float: '@float(60, 100, 3, 5)' // 60到100，3到5位小数
})
```

#### 3. 布尔值

```typescript
$mock.mock({
  'boolean': '@boolean',           // 随机布尔值
  'boolean|1': true,              // 1/2概率为true
  'boolean|1-9': true,            // min/(min+max)概率为true
})
```

#### 4. 数组

```typescript
$mock.mock({
  // 固定长度
  'list|5': ['item'],      // 重复5次
  
  // 随机长度
  'list|1-10': ['item'],   // 1到10个元素
  
  // 从数组中随机选择
  'color': '@pick(["red", "green", "blue"])',
  
  // 打乱数组
  'shuffle': '@shuffle([1, 2, 3, 4, 5])'
})
```

#### 5. 对象

```typescript
$mock.mock({
  // 重复对象属性
  'object|2': {
    '310000': '上海市',
    '320000': '江苏省'
  }
})
```

### 自定义占位符

插件已经添加了以下中文占位符：

```typescript
// 使用示例
$mock.mock({
  name: '@chineseName',      // 中文姓名
  city: '@chineseCity',      // 中国城市
  title: '@techTitle',       // 技术文章标题
  tag: '@techTag',           // 技术标签
  comment: '@commentContent' // 评论内容
})
```

你也可以添加自己的占位符：

```typescript
import { Mock } from '~/plugins/mock'

Mock.Random.extend({
  // 自定义公司名
  companyName() {
    const companies = ['阿里巴巴', '腾讯', '字节跳动', '美团', '拼多多']
    return Mock.Random.pick(companies)
  }
})

// 使用
const data = Mock.mock({
  company: '@companyName'
})
```

## 💡 实际应用场景

### 场景1：用户管理系统

```vue
<script setup lang="ts">
import type { MockUser } from '~/plugins/mock'

const { $mock } = useNuxtApp()

// 分页状态
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(500)

// 加载用户数据
const loadUsers = () => {
  return $mock.generateList(
    (id) => $mock.generateUser(id),
    total.value,
    currentPage.value,
    pageSize.value
  )
}

const userData = ref(loadUsers())
</script>
```

### 场景2：自定义数据结构

```typescript
const { $mock } = useNuxtApp()

// 使用 Mock.js 语法生成商品数据
const products = $mock.mock({
  'list|20': [{
    'id|+1': 1,
    name: '@ctitle(5, 10)',
    'price|99-9999.2': 1,
    'stock|0-1000': 1,
    category: '@pick(["电子产品", "服装", "食品", "图书"])',
    brand: '@pick(["Apple", "华为", "小米", "OPPO", "VIVO"])',
    description: '@cparagraph(2, 4)',
    images: [
      '@image(400x400)',
      '@image(400x400)',
      '@image(400x400)'
    ],
    'rating|1-5': 1,
    'sales|0-10000': 1,
    createdAt: '@datetime',
    'status': '@pick(["在售", "缺货", "下架"])'
  }]
})
```

### 场景3：模拟 API 响应

```typescript
const { $mock } = useNuxtApp()

// 模拟分页响应
const mockApiResponse = $mock.mock({
  code: 200,
  message: 'success',
  data: {
    'list|10': [{
      'id|+1': 1,
      name: '@chineseName',
      email: '@email',
      'age|18-60': 1
    }],
    pagination: {
      page: 1,
      pageSize: 10,
      total: 100,
      totalPages: 10
    }
  },
  timestamp: '@now'
})
```

### 场景4：表单测试数据

```typescript
const { $mock } = useNuxtApp()

// 生成表单数据
const formData = $mock.mock({
  username: '@chineseName',
  email: '@email',
  phone: /^1[3-9]\d{9}$/,
  'gender': '@pick(["male", "female"])',
  birthday: '@date',
  address: {
    province: '@province',
    city: '@chineseCity',
    district: '@county',
    street: '@chineseName街道',
    detail: '@natural(1, 100)号'
  },
  'hobbies|2-4': ['@pick(["阅读", "运动", "旅游", "音乐", "电影", "游戏"])'],
  bio: '@cparagraph(1, 3)'
})
```

### 场景5：图表数据

```typescript
const { $mock } = useNuxtApp()

// 生成图表数据
const chartData = $mock.mock({
  // 柱状图数据
  bar: {
    'categories|7': ['@date("yyyy-MM-dd")'],
    'series|3': [{
      name: '@ctitle(3, 5)',
      'data|7': ['@natural(100, 1000)']
    }]
  },
  
  // 折线图数据
  line: {
    'xAxis|12': ['@date("MM月")'],
    'series|2': [{
      name: '@ctitle(3, 5)',
      'data|12': ['@natural(1000, 5000)']
    }]
  },
  
  // 饼图数据
  'pie|5': [{
    name: '@ctitle(2, 4)',
    'value|100-1000': 1
  }]
})
```

## 🔥 Mock.js 常用占位符速查

### 基础类型
- `@boolean` - 布尔值
- `@natural` - 自然数
- `@integer` - 整数
- `@float` - 浮点数
- `@character` - 字符
- `@string` - 字符串
- `@range` - 整数数组

### 日期时间
- `@date` - 日期
- `@time` - 时间
- `@datetime` - 日期时间
- `@now` - 当前时间

### 图片
- `@image` - 图片URL
- `@dataImage` - Base64图片

### 颜色
- `@color` - 颜色
- `@hex` - 十六进制颜色
- `@rgb` - RGB颜色
- `@rgba` - RGBA颜色
- `@hsl` - HSL颜色

### 文本
- `@paragraph` - 英文段落
- `@cparagraph` - 中文段落
- `@sentence` - 英文句子
- `@csentence` - 中文句子
- `@word` - 英文单词
- `@cword` - 中文字符
- `@title` - 英文标题
- `@ctitle` - 中文标题

### 姓名
- `@first` - 英文名
- `@last` - 英文姓
- `@name` - 英文姓名
- `@cfirst` - 中文名
- `@clast` - 中文姓
- `@cname` - 中文姓名

### 网络
- `@url` - URL
- `@domain` - 域名
- `@protocol` - 协议
- `@ip` - IP地址
- `@email` - 邮箱

### 地址
- `@region` - 大区
- `@province` - 省
- `@city` - 市
- `@county` - 县
- `@zip` - 邮政编码

### 其他
- `@guid` - GUID
- `@id` - 身份证号
- `@increment` - 自增ID

### 辅助方法
- `@pick([...])` - 随机选择
- `@shuffle([...])` - 打乱数组

## 📝 TypeScript 类型支持

```typescript
import type { MockUser, MockPost, MockComment } from '~/plugins/mock'
import { Mock } from '~/plugins/mock'

// 使用类型注解
const users: MockUser[] = $mock.generateUsers(10)
const posts: MockPost[] = $mock.generatePosts(20)

// 直接使用 Mock.js
const customData = Mock.mock({
  'list|10': [{
    'id|+1': 1,
    name: '@cname'
  }]
})
```

## 🎯 最佳实践

### 1. 开发环境使用

```typescript
// composables/useUserData.ts
export const useUserData = () => {
  const { $mock } = useNuxtApp()
  const config = useRuntimeConfig()
  
  const fetchUsers = async () => {
    // 开发环境使用 mock 数据
    if (config.public.dev) {
      return $mock.generateUsers(20)
    }
    
    // 生产环境调用真实 API
    return await $fetch('/api/users')
  }
  
  return {
    fetchUsers
  }
}
```

### 2. 延迟加载模拟

```typescript
// 模拟网络延迟
const loadData = async () => {
  loading.value = true
  
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const data = $mock.generateUsers(20)
  loading.value = false
  
  return data
}
```

### 3. 响应式数据

```typescript
const users = ref<MockUser[]>([])

const refreshData = () => {
  users.value = $mock.generateUsers(20)
}

// 定时刷新
setInterval(refreshData, 5000)
```

## ⚡ 性能提示

1. **大量数据生成**：一次生成超过1000条数据可能影响性能，建议使用分页
2. **缓存数据**：对于不变的数据，可以缓存起来重复使用
3. **按需生成**：使用虚拟滚动时，只生成可见区域的数据

## 🔗 相关资源

- [Mock.js 官方文档](http://mockjs.com/)
- [Mock.js GitHub](https://github.com/nuysoft/Mock)
- [Nuxt 3 插件文档](https://nuxt.com/docs/guide/directory-structure/plugins)

## 🎉 总结

这个 Mock 数据生成器提供了：
- ✅ 基于 Mock.js 的强大功能
- ✅ 6 种常用数据类型的快捷方法
- ✅ 完整的 TypeScript 类型支持
- ✅ 中文友好的数据内容
- ✅ 自定义占位符扩展能力
- ✅ 适用于各种前端开发场景

访问 `/mock-demo` 查看所有示例！
