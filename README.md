# 🚀 Cong0925 项目导航首页

一个简洁、高端、丝滑的项目导航首页，用于展示和管理你的所有GitHub项目。

## ✨ 特性

- 🎨 **亮色蓝色系设计** - 清新优雅的渐变和动画效果
- 🔍 **项目搜索** - 快速找到你需要的项目
- 📊 **状态展示** - 清晰显示项目开发状态
- 💬 **留言系统** - 基于GitHub Issues的留言功能
- 📱 **响应式设计** - 完美适配各种设备

## 📁 项目结构

```
Cong0925.github.io/
├── home/                           # 首页目录
│   ├── index.html                  # 首页
│   ├── css/
│   │   └── style.css              # 首页样式
│   └── js/
│       └── main.js                # 首页逻辑
├── write-helper-index-master/      # Write Helper 项目页面
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── img/
├── spend-note-index-main/          # Spend Note 项目页面
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── img/
└── README.md
```

## 🚀 访问地址

- **首页**: https://cong0925.github.io/home/
- **Write Helper**: https://cong0925.github.io/write-helper-index-master/
- **Spend Note**: https://cong0925.github.io/spend-note-index-main/

## 🔧 添加新项目

编辑 `home/js/main.js` 文件，在 `projects` 数组中添加新项目：

```javascript
{
    id: 3,
    name: 'project-name',
    title: '项目标题',
    description: '项目描述...',
    status: 'completed',  // completed, development, planning
    statusText: '已完成',
    tags: ['标签1', '标签2'],
    icon: 'fas fa-icon-name',
    repo: 'https://github.com/Cong0925/repo',  // 开源仓库地址，留空则显示"未开源"
    homepage: '../project-folder/',  // 项目页面地址
    demo: ''  // 演示地址，留空则禁用
}
```

## 🎯 图标参考

常用Font Awesome图标：

- 写作/文档: `fas fa-pen-fancy`, `fas fa-file-alt`
- 工具: `fas fa-tools`, `fas fa-cog`
- 应用: `fas fa-mobile-alt`, `fas fa-laptop-code`
- 数据: `fas fa-database`, `fas fa-chart-bar`

---

**Made with ❤️ by Cong0925**
