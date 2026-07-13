---
description: 项目导航首页，展示和管理所有GitHub项目的总览文件
created: 2026-07-13
last_modified: 2026-07-13
---

# 🚀 项目导航首页

一个简洁、高端、丝滑的项目导航首页，用于展示和管理所有 GitHub 项目。

## ✨ 特性

- 🎨 **亮色简约设计** - 清新优雅的渐变和动画效果
- 🔍 **项目搜索** - 快速找到你需要的项目
- 📊 **状态展示** - 清晰显示项目开发状态
- 💬 **留言系统** - 基于 GitHub Issues 的留言功能
- 📱 **响应式设计** - 完美适配各种设备

## 📁 子项目汇总

### 已完成项目

| 项目名称 | 项目标题 | 项目类型 | 仓库地址 | 网址首页 | 演示界面 | 最后更新 |
|----------|----------|----------|----------|----------|----------|----------|
| aj-report-mine-page | AJ-Report 自定义页面 | web | ✅ 已提供 | ✅ 已完成 | ✅ 已完成 | 2026-07-09 |
| nodejs-mysql-sequelize | Node.js MySQL Sequelize 示例 | web | ✅ 已提供 | ✅ 已完成 | ✅ 已完成 | 2026-07-09 |
| spend-note | 记账本 | web | ✅ 已提供 | ✅ 已完成 | ✅ 已完成 | 2026-07-09 |
| write-helper | 写作助手 | web | ✅ 已提供 | ✅ 已完成 | ✅ 已完成 | 2026-07-09 |
| vue3-ts-model | Vue3 TypeScript 模版 | template | ✅ 已提供 | ✅ 已完成 | ✅ 已完成 | 2026-07-13 |
| jquery-svg-d3-demo | jQuery SVG D3 Demo | web | ✅ 已提供 | ✅ 已完成 | ✅ 已完成 | 2026-07-13 |
| student_club | 社团管理系统 | web | ✅ 已提供 | ✅ 已完成 | ✅ 已完成 | 2026-07-13 |
| hugoBasicExample | Hugo 基础示例 | web | ✅ 已提供 | ✅ 已完成 | ✅ 已完成 | 2026-07-13 |

### 待完善项目

暂无

## 🎯 项目整体规划

### 设计原则

1. **明亮简约**：使用浅色背景，避免深色主题
2. **内容充实**：避免大量留白，信息密度适中
3. **跨项目差异化**：不同项目间主题样式可以不同
4. **项目内一致性**：同一项目的项目网址和演示网址风格一致

### 目录结构规范

所有子项目遵循统一的目录结构：

```
project-name/
├── index.html          # 项目主页（介绍页面）
├── css/
│   └── style.css       # 主样式文件
├── js/
│   └── main.js         # 主脚本文件
├── img/                # 图片资源目录
└── demo/               # 演示目录
    ├── index.html      # 演示页面
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── screenshots/    # 截图目录
```

### 页面类型说明

1. **项目主页（index.html）**：介绍性页面，展示项目特性、功能、截图等
2. **演示页面（demo/index.html）**：安装使用教程，包含截图和步骤说明

### 项目状态定义

| 状态 | 说明 | 样式类 |
|------|------|--------|
| completed | 已完成 | status-completed |
| development | 进行中 | status-development |
| stopped | 停工 | status-stopped |
| practice | 练习项目 | status-practice |

## 📂 项目结构

```
git-home-page/
├── home/                           # 首页目录
│   ├── index.html                  # 首页
│   ├── css/
│   │   └── style.css              # 首页样式
│   └── js/
│       └── main.js                # 首页逻辑
├── aj-report-mine-page/            # AJ-Report 自定义页面
├── nodejs-mysql-sequelize/         # Node.js MySQL Sequelize 示例
├── spend-note/                     # 记账本
├── write-helper/                   # 写作助手
├── hugoBasicExample/               # Hugo 基础示例
├── jquery-svg-d3-demo/             # jQuery SVG D3 Demo
├── student_club/                   # 社团管理系统
├── vue3-ts-model/                  # Vue3 TypeScript 模版
├── docs/                           # 文档目录
│   ├── project-management.md       # 项目管理规范
│   └── 修改记录/                   # 修改记录
└── README.md                       # 项目说明文件
```

## 🔧 添加新项目

### 步骤 1：创建项目目录

在项目根目录下创建子项目目录，按照标准目录结构初始化：

```bash
mkdir project-name
cd project-name
mkdir css js img demo
touch index.html css/style.css js/main.js
```

### 步骤 2：创建子项目 README

在子项目目录下创建 `README.md` 文件，记录项目状态、链接、完成情况等信息。

### 步骤 3：更新主页项目数据

编辑 `home/js/main.js` 文件，在 `projects` 数组中添加新项目：

```javascript
{
    id: 9,
    name: 'project-name',
    title: '项目标题',
    description: '项目描述...',
    status: 'completed',
    statusText: '已完成',
    tags: ['标签1', '标签2'],
    icon: 'fas fa-icon-name',
    repo: 'https://github.com/Cong0925/repo',
    homepage: '../project-name/',
    demo: '../project-name/demo/',
    lastUpdated: '2026-07-13'
}
```

### 步骤 4：更新根目录 README

在子项目汇总表格中添加新项目信息。

## 🎨 主题样式规范

### 整体风格要求

1. **色调明亮**：使用浅色背景（白色、浅灰、米色等）
2. **简约设计**：界面简洁，重点突出
3. **内容丰富**：充分展示项目特性，不要有大量留白区域
4. **信息密度**：合理布局，让页面内容充实但不拥挤

### 跨项目样式规范

1. **不同项目间**：主题样式可以不同，鼓励创新和个性化
2. **同一项目内**：项目网址和演示网址必须保持主题风格一致

## 📊 技术栈

- HTML5
- CSS3
- JavaScript
- Font Awesome 图标库
- GitHub Issues 留言系统

## 📝 更新日志

| 日期 | 更新内容 |
|------|----------|
| 2026-07-13 | 项目初始化，创建基础结构 |
| 2026-07-13 | 添加项目管理规范文档 |
| 2026-07-13 | 添加子项目 README 文件规范 |
| 2026-07-13 | 更新项目导航首页 |

---

**Made with ❤️ by Cong0925**
