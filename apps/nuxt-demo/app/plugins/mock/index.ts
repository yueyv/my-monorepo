// Mock 数据生成工具 - 基于 Mock.js
import Mock from 'mockjs';

interface MockUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  address: string;
  age: number;
  gender: 'male' | 'female';
  createdAt: string;
}

interface MockPost {
  id: number;
  title: string;
  content: string;
  author: string;
  authorId: number;
  cover: string;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

interface MockComment {
  id: number;
  postId: number;
  userId: number;
  userName: string;
  content: string;
  likes: number;
  createdAt: string;
}

// 扩展 Mock.Random 添加自定义占位符
Mock.Random.extend({
  // 中文姓名
  chineseName() {
    const firstNames = [
      '王',
      '李',
      '张',
      '刘',
      '陈',
      '杨',
      '赵',
      '黄',
      '周',
      '吴',
      '徐',
      '孙',
      '胡',
      '朱',
      '高',
      '林',
      '何',
      '郭',
      '马',
      '罗',
    ];
    const lastNames = [
      '伟',
      '芳',
      '娜',
      '秀英',
      '敏',
      '静',
      '丽',
      '强',
      '磊',
      '军',
      '洋',
      '勇',
      '艳',
      '杰',
      '涛',
      '明',
      '超',
      '鹏',
      '斌',
      '华',
      '玲',
      '飞',
      '红',
      '霞',
      '辉',
      '波',
      '刚',
      '平',
      '俊',
      '凯',
    ];
    const firstName = Mock.Random.pick(firstNames);
    const lastName =
      Mock.Random.pick(lastNames) + (Math.random() > 0.5 ? Mock.Random.pick(lastNames) : '');
    return firstName + lastName;
  },

  // 中国城市
  chineseCity() {
    const cities = [
      '北京',
      '上海',
      '广州',
      '深圳',
      '杭州',
      '成都',
      '重庆',
      '武汉',
      '西安',
      '南京',
      '苏州',
      '天津',
      '郑州',
      '长沙',
      '沈阳',
      '青岛',
      '宁波',
      '东莞',
      '厦门',
      '福州',
    ];
    return Mock.Random.pick(cities);
  },

  // 技术标签
  techTag() {
    const tags = [
      '前端',
      '后端',
      'Vue',
      'React',
      'Angular',
      'Node.js',
      'TypeScript',
      'JavaScript',
      'CSS',
      'HTML',
      'Nuxt',
      'Next.js',
      'Webpack',
      'Vite',
      '开发',
      '教程',
      '实战',
      '源码分析',
      'UI设计',
      '性能优化',
    ];
    return Mock.Random.pick(tags);
  },

  // 技术文章标题
  techTitle() {
    const titles = [
      '深入理解Vue 3响应式原理',
      'TypeScript最佳实践指南',
      'Nuxt 3全面解析与实战',
      '前端性能优化技巧大全',
      'CSS动画完全指南',
      '构建现代化的前端工程体系',
      'JavaScript设计模式详解',
      'React Hooks实战指南',
      '微前端架构实践',
      'Webpack配置优化秘籍',
      'Vite构建工具深度解析',
      '手写Promise源码实现',
      '前端工程化最佳实践',
      'Node.js全栈开发实战',
      '移动端适配方案总结',
      'Canvas绘图完全教程',
      '前端安全防护指南',
      'HTTP协议详解与应用',
      '浏览器渲染原理分析',
      '算法与数据结构入门',
    ];
    return Mock.Random.pick(titles);
  },

  // 评论内容
  commentContent() {
    const comments = [
      '这是一个非常有价值的技术分享。',
      '通过这篇文章，我学到了很多新知识。',
      '作者的讲解非常清晰透彻。',
      '希望能看到更多这类高质量的内容。',
      '文章的案例很实用，可以直接应用到项目中。',
      '感谢分享，收藏了！',
      '写得太好了，期待后续更新。',
      '这个方案解决了我的痛点问题。',
      '代码示例很清晰，容易理解。',
      '建议可以补充更多的实战案例。',
      '讲解得很详细，赞一个！',
      '学习了,感谢作者的分享。',
      '这个思路很不错，值得借鉴。',
      '正好遇到这个问题，太及时了。',
      '文章质量很高，点赞支持！',
    ];
    return Mock.Random.pick(comments);
  },
});

class MockDataGenerator {
  // 获取 Mock.js 实例
  get Mock() {
    return Mock;
  }

  // 生成单个用户
  generateUser(id: number): MockUser {
    return Mock.mock({
      id,
      name: '@chineseName',
      email: '@email',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
      phone: /^1[3-9]\d{9}$/,
      address: '@chineseCity市@county@chineseName街道@natural(1, 200)号',
      'age|18-65': 1,
      gender: '@pick(["male", "female"])',
      createdAt: '@datetime',
    });
  }

  // 生成多个用户
  generateUsers(count: number = 10): MockUser[] {
    return Mock.mock({
      [`list|${count}`]: [
        {
          'id|+1': 1,
          name: '@chineseName',
          email: '@email',
          avatar: function () {
            return `https://api.dicebear.com/7.x/avataaars/svg?seed=${Mock.Random.natural(
              1,
              10000
            )}`;
          },
          phone: /^1[3-9]\d{9}$/,
          address: '@chineseCity市@county@chineseName街道@natural(1, 200)号',
          'age|18-65': 1,
          gender: '@pick(["male", "female"])',
          createdAt: '@datetime',
        },
      ],
    }).list;
  }

  // 生成单篇文章
  generatePost(id: number, userId?: number): MockPost {
    return Mock.mock({
      id,
      title: '@techTitle',
      content: '@cparagraph(5, 10)',
      author: '@chineseName',
      authorId: userId || '@natural(1, 100)',
      cover: `https://picsum.photos/seed/${id}/1200/630`,
      'views|100-50000': 1,
      'likes|10-5000': 1,
      'comments|0-500': 1,
      'tags|1-5': ['@techTag'],
      status: '@pick(["draft", "published", "archived"])',
      createdAt: '@datetime',
      updatedAt: '@datetime',
    });
  }

  // 生成多篇文章
  generatePosts(count: number = 20): MockPost[] {
    return Mock.mock({
      [`list|${count}`]: [
        {
          'id|+1': 1,
          title: '@techTitle',
          content: '@cparagraph(5, 10)',
          author: '@chineseName',
          'authorId|1-100': 1,
          cover: function () {
            return `https://picsum.photos/seed/${Mock.Random.natural(1, 10000)}/1200/630`;
          },
          'views|100-50000': 1,
          'likes|10-5000': 1,
          'comments|0-500': 1,
          'tags|1-5': ['@techTag'],
          status: '@pick(["draft", "published", "archived"])',
          createdAt: '@datetime',
          updatedAt: '@now',
        },
      ],
    }).list;
  }

  // 生成单条评论
  generateComment(id: number, postId: number, userId?: number): MockComment {
    return Mock.mock({
      id,
      postId,
      userId: userId || '@natural(1, 100)',
      userName: '@chineseName',
      content: '@commentContent',
      'likes|0-500': 1,
      createdAt: '@datetime',
    });
  }

  // 生成多条评论
  generateComments(postId: number, count: number = 10): MockComment[] {
    return Mock.mock({
      [`list|${count}`]: [
        {
          'id|+1': 1,
          postId,
          'userId|1-100': 1,
          userName: '@chineseName',
          content: '@commentContent',
          'likes|0-500': 1,
          createdAt: '@datetime',
        },
      ],
    }).list;
  }

  // 生成列表数据（带分页）
  generateList<T>(
    generator: (id: number) => T,
    total: number,
    page: number = 1,
    pageSize: number = 10
  ) {
    const start = (page - 1) * pageSize;
    const end = Math.min(start + pageSize, total);
    const items = Array.from({ length: end - start }, (_, i) => generator(start + i + 1));

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      hasNext: page < Math.ceil(total / pageSize),
      hasPrev: page > 1,
    };
  }

  // 生成表格数据
  generateTableData(rows: number = 50) {
    return Mock.mock({
      [`list|${rows}`]: [
        {
          'id|+1': 1,
          name: '@chineseName',
          'age|18-65': 1,
          city: '@chineseCity',
          email: '@email',
          phone: /^1[3-9]\d{9}$/,
          status: '@pick(["active", "inactive", "pending"])',
          createdAt: '@datetime',
        },
      ],
    }).list;
  }

  // 生成树形数据
  generateTreeData(depth: number = 3, childrenPerNode: number = 3) {
    const generateNode = (id: string, level: number): any => {
      const node: any = {
        id,
        label: `节点 ${id}`,
        level,
      };

      if (level < depth) {
        node.children = Array.from({ length: childrenPerNode }, (_, i) =>
          generateNode(`${id}-${i + 1}`, level + 1)
        );
      }

      return node;
    };

    return Array.from({ length: childrenPerNode }, (_, i) => generateNode(`${i + 1}`, 1));
  }

  // 直接使用 Mock.mock 方法 - 支持自定义模板
  mock<T = any>(template: any): T {
    return Mock.mock(template);
  }
}

// 创建单例实例
const mockGenerator = new MockDataGenerator();

declare module '#app' {
  interface NuxtApp {
    $mock: typeof mockGenerator;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('mock', mockGenerator);
});

export { mockGenerator, MockDataGenerator, Mock };
export type { MockUser, MockPost, MockComment };
