---
description: 项目导航首页管理规范，定义项目字段含义和添加流程
created: 2026-07-13
last_modified: 2026-07-13
---

# 项目导航首页管理规范

## 术语定义

| 术语 | 定义 | 说明 |
|------|------|------|
| 项目地址 | GitHub 仓库地址 | 由开发者提供，私有仓库显示"未开源" |
| 网址首页 | 项目介绍页面 | 展示项目特性、功能、截图等介绍性内容 |
| 演示 | 安装使用演示 | 详细介绍安装与使用步骤，包含截图教程 |
| 参考 README | 项目源文件中的 README.md | 开发者提供路径，用于生成演示文档 |

## 项目字段规范

在 `home/js/main.js` 的 `projects` 数组中，每个项目必须包含以下字段：

```javascript
{
    id: Number,                    // 唯一标识，自增
    name: String,                  // 项目名称（kebab-case）
    title: String,                 // 项目标题（显示名称）
    description: String,           // 项目描述（50-150字）
    status: String,                // 状态：completed/development/stopped/practice
    statusText: String,            // 状态文本：已完成/进行中/停工/练习项目
    tags: Array,                   // 标签数组，3-5个
    icon: String,                  // Font Awesome 图标类名
    type: String,                  // 项目类型：desktop/miniprogram/mobile/web/cli/library/template/article/other
    repo: String,                  // 仓库地址（由开发者提供）
    repoPrivate: Boolean,          // 是否私有仓库（可选）
    homepage: String,              // 网址首页路径（如 '../project-name/'）
    demo: String,                  // 演示路径（如 '../project-name/demo/'）
    lastUpdated: String            // 最后修改时间（YYYY-MM-DD）
}
```

## 添加新项目流程

### 步骤 1：获取项目信息
向开发者获取：
- 项目名称和标题
- 项目描述（50-150字）
- 项目类型和状态
- 标签（3-5个）
- 仓库地址（公开/私有）
- 参考 README 文件路径（用于生成演示文档）

### 步骤 2：创建项目目录
按照标准目录结构创建：
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

### 步骤 3：创建项目主页（index.html）
项目主页是**介绍性页面**，包含：
- 项目名称和简介
- 核心特性展示（3-6个）
- 功能截图或演示图
- 下载/使用入口
- 技术栈说明

**页面风格**：参考 `write-helper/index.html` 的设计风格

### 步骤 4：创建演示页面（demo/index.html）
演示页面是**安装使用教程**，必须包含：
- 下载安装步骤
- 初始配置步骤
- 核心功能演示
- 常见问题解答

**详细要求**：
1. **必须有截图**：每个步骤配1-3张截图
2. **步骤清晰**：按章节组织（第一章、第二章...）
3. **文字说明**：每个截图配详细说明文字
4. **提示框**：重要提示使用提示框突出显示
5. **章节导航**：顶部导航栏支持跳转到各章节

**演示页面模板结构**：
```html
<!-- 导航栏 -->
<nav class="navbar">
    <div class="nav-links">
        <a href="#download">下载安装</a>
        <a href="#setup">初始设置</a>
        <a href="#feature">功能演示</a>
        <a class="nav-btn" href="../">返回官网</a>
    </div>
</nav>

<!-- 英雄区域 -->
<section class="hero">
    <h1>项目名称 完整使用演示</h1>
    <p>从下载到精通的完整教程</p>
</section>

<!-- 章节内容 -->
<section class="step-section" id="download">
    <div class="step-card">
        <div class="step-number">1</div>
        <div class="step-content">
            <h3>步骤标题</h3>
            <p>步骤说明</p>
            <div class="screenshot-wrapper">
                <img src="screenshots/xxx.png" alt="截图描述" class="screenshot">
                <div class="screenshot-caption">截图说明文字</div>
            </div>
        </div>
    </div>
</section>
```

### 步骤 5：更新主页项目数据
在 `home/js/main.js` 的 `projects` 数组中添加项目数据。

### 步骤 6：验证链接
确保以下链接正确：
- 项目主页路径与 `homepage` 字段一致
- 演示页面路径与 `demo` 字段一致
- 所有内部链接可正常跳转

## 项目类型说明

| 类型 | 说明 | 图标 |
|------|------|------|
| desktop | 桌面软件 | fas fa-desktop |
| miniprogram | 小程序 | fab fa-weixin |
| mobile | 移动应用 | fas fa-mobile-alt |
| web | 网页应用 | fas fa-globe |
| cli | 终端工具 | fas fa-terminal |
| library | 开源库 | fas fa-book |
| template | 模版类 | fas fa-clone |
| article | 文章管理 | fas fa-newspaper |
| other | 其他 | fas fa-ellipsis-h |

## 项目状态说明

| 状态 | 说明 | 样式类 |
|------|------|--------|
| completed | 已完成 | status-completed |
| development | 进行中 | status-development |
| stopped | 停工 | status-stopped |
| practice | 练习项目 | status-practice |

## 主题样式规范

### 整体风格要求

1. **色调明亮**：使用浅色背景（白色、浅灰、米色等），避免深色主题
2. **简约设计**：界面简洁，重点突出，避免视觉噪音
3. **内容丰富**：充分展示项目特性，不要有大量留白区域
4. **信息密度**：合理布局，让页面内容充实但不拥挤

### 色彩规范

**主色调选择**：
- 推荐使用浅色系：白色 `#FFFFFF`、浅灰 `#F5F5F5`、米色 `#FAFAFA`
- 强调色：可使用项目主题色，建议饱和度适中（60%-80%）
- 辅助色：用于次要信息、标签、图标等，建议使用灰色系 `#666666` `#999999`

**色彩搭配原则**：
- 主背景色与文字对比度 ≥ 4.5:1（确保可读性）
- 同一页面颜色不超过3-4种主色
- 使用同色系不同深浅创造层次感

### 布局密度要求

**避免大量留白**：
- 页面内容区域使用率 ≥ 70%
- 卡片内边距：`padding: 20px-30px`
- 元素间距：`margin: 15px-25px`
- 章节间间距：`padding: 40px-60px`

**内容填充策略**：
- 使用网格布局（Grid/Flex）充分利用空间
- 添加项目截图、特性图标、数据统计等视觉元素
- 使用分割线、背景色块区分不同内容区块
- 适当使用阴影和圆角增加层次感

### 跨项目样式规范

1. **不同项目间**：主题样式可以不同，鼓励创新和个性化
   - 每个项目可以根据自身特点设计独特的主题
   - 可以使用不同的配色方案、布局风格、视觉元素
   - 体现项目的特色和定位

2. **同一项目内**：项目网址和演示网址必须保持主题风格一致
   - 配色方案一致（主色、辅色、强调色）
   - 字体风格一致（标题字体、正文字体）
   - 组件样式一致（按钮、卡片、导航栏等）
   - 整体视觉风格统一

### 组件设计规范

**按钮样式**：
```css
.btn-primary {
  background-color: var(--primary-color);
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
```

**卡片样式**：
```css
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
```

**导航栏**：
```css
.navbar {
  height: 60px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}
```

### 响应式设计要求

**断点设置**：
- 桌面端：≥ 1200px（多列布局）
- 平板端：768px - 1199px（自适应布局）
- 移动端：≤ 767px（单列布局）

**移动端适配**：
- 字体大小：正文字体 ≥ 14px，标题字体 ≥ 18px
- 按钮高度：≥ 44px（触摸友好）
- 内边距：≥ 16px
- 图片宽度：100%自适应

### 样式一致性检查清单

创建项目时，确保以下样式在同一项目的两个页面中保持一致：

| 样式元素 | 检查项 | 验证方法 |
|----------|--------|----------|
| 主色调 | 主色、辅色、强调色是否一致 | 检查 CSS 变量定义 |
| 背景色 | 页面背景、卡片背景、区块背景是否协调 | 对比两个页面的背景色值 |
| 字体 | 标题字体、正文字体、字号层级是否统一 | 检查 font-family 和 font-size |
| 按钮 | 按钮样式、圆角、阴影、hover 效果是否一致 | 对比按钮的 CSS 属性 |
| 卡片 | 卡片边框、圆角、阴影、内边距是否统一 | 检查卡片组件样式 |
| 导航栏 | 导航栏高度、背景、链接样式是否一致 | 对比导航栏高度和背景色 |
| 动画 | 过渡效果、动画时长、缓动函数是否统一 | 检查 transition 和 animation 属性 |
| 间距 | 内外边距、元素间距是否遵循统一的间距系统 | 检查 margin 和 padding 值 |
| 图标 | 图标库、图标大小、颜色是否一致 | 确认使用相同的图标库（如 Font Awesome） |
| 阴影 | 阴影模糊度、扩散度、颜色是否协调 | 检查 box-shadow 属性 |
| 圆角 | 圆角大小是否统一（建议8px/12px/16px） | 检查 border-radius 值 |

**快速验证步骤**：
1. 打开项目网址和演示网址
2. 并排对比两个页面的视觉效果
3. 检查导航栏、卡片、按钮等关键组件
4. 在不同设备上测试响应式效果
5. 使用浏览器开发者工具检查 CSS 属性

### 推荐设计方向

1. **现代简约风**：简洁界面 + 内容充实 + 清晰层级
   - 适用场景：工具类、效率类应用
   - 配色示例：`#667eea` `#764ba2`（渐变蓝紫）
   - 布局特点：卡片式布局，信息密度适中，去除冗余装饰，保留核心功能和内容

2. **科技感风格**：深色背景 + 霓虹色 + 玻璃拟态
   - 适用场景：开发者工具、技术类产品
   - 配色示例：`#0f0f23` `#00d4ff`（深蓝+霓虹蓝）
   - 布局特点：暗色主题，发光效果，透明玻璃卡片

3. **清新自然风**：浅色背景 + 绿色系 + 柔和阴影
   - 适用场景：生活类、健康类应用
   - 配色示例：`#11998e` `#38ef7d`（渐变绿）
   - 布局特点：圆润设计，柔和的阴影效果

4. **专业商务风**：中性色调 + 简洁排版 + 清晰层级
   - 适用场景：企业级应用、管理系统
   - 配色示例：`#2c3e50` `#3498db`（深灰+商务蓝）
   - 布局特点：严谨的网格布局，清晰的信息架构

5. **活泼创意风**：多彩配色 + 不规则布局 + 动态元素
   - 适用场景：创意工具、设计类应用
   - 配色示例：`#ff6b6b` `#feca57` `#48dbfb`（多彩组合）
   - 布局特点：打破常规布局，有趣的交互动画

## 注意事项

1. **目录命名**：使用 kebab-case 格式（如 `vue3-ts-model`、`student-club`）
2. **图片资源**：截图统一放在 `screenshots/` 目录，使用 PNG 格式
3. **样式一致**：项目主页和演示页面的样式参考现有项目
4. **链接路径**：使用相对路径（如 `../project-name/`）
5. **响应式设计**：确保页面在移动端正常显示
6. **参考 README**：开发者提供 README 文件路径后，根据内容生成演示文档
