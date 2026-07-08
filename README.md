# 🚀 Cong0925 项目导航首页

一个简洁、高端、丝滑的项目导航首页，用于展示和管理你的所有GitHub项目。

## ✨ 特性

- 🎨 **亮色蓝色系设计** - 清新优雅的渐变和动画效果
- 🔍 **项目搜索** - 快速找到你需要的项目
- 📊 **状态展示** - 清晰显示项目开发状态
- 💬 **留言系统** - 基于GitHub Issues的留言功能
- 📱 **响应式设计** - 完美适配各种设备
- ✨ **丝滑动画** - 流畅的过渡和交互效果

## 🛠️ 技术栈

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript (ES6+)
- Gitalk (留言系统)

## 📁 项目结构

```
Cong0925.github.io/
├── index.html          # 主页面
├── css/
│   └── style.css      # 样式文件
├── js/
│   └── main.js        # 主逻辑文件
└── README.md          # 项目说明
```

## 🚀 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/Cong0925/Cong0925.github.io.git
cd Cong0925.github.io
```

### 2. 配置留言系统 (可选)

如果你想要留言功能，需要配置GitHub OAuth App：

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 **"New OAuth App"**
3. 填写应用信息：
   - **Application name**: `Cong0925 Project Hub`
   - **Homepage URL**: `https://cong0925.github.io`
   - **Authorization callback URL**: `https://cong0925.github.io`
4. 获取 **Client ID** 和 **Client Secret**
5. 编辑 `js/main.js` 文件，找到 Gitalk 配置部分：
   ```javascript
   const gitalkConfig = {
       clientID: 'YOUR_CLIENT_ID',      // 替换为你的Client ID
       clientSecret: 'YOUR_CLIENT_SECRET', // 替换为你的Client Secret
       // ... 其他配置
   };
   ```

### 3. 添加新项目

编辑 `js/main.js` 文件，在 `projects` 数组中添加新项目：

```javascript
const projects = [
    // 现有项目...
    {
        id: 3,
        name: 'your-project-name',
        title: 'Your Project Title',
        description: '项目描述...',
        status: 'completed', // completed, development, planning
        statusText: '已完成',
        tags: ['标签1', '标签2'],
        link: 'https://github.com/Cong0925/your-project',
        icon: 'fas fa-icon-name' // Font Awesome图标
    }
];
```

### 4. 推送到GitHub

```bash
git add .
git commit -m "feat: 初始化项目导航首页"
git push origin main
```

### 5. 启用GitHub Pages

1. 访问仓库的 **Settings** -> **Pages**
2. 在 **Source** 部分选择 **main** 分支
3. 点击 **Save**
4. 等待几分钟，访问 `https://cong0925.github.io`

## 🎨 自定义

### 修改颜色主题

编辑 `css/style.css` 文件中的 CSS 变量：

```css
:root {
    --primary-color: #4a90e2;      /* 主色调 */
    --primary-dark: #357abd;       /* 深色 */
    --primary-light: #6ba3e8;      /* 浅色 */
    --secondary-color: #5a7fd4;    /* 辅助色 */
    --bg-light: #f8fafc;           /* 背景色 */
}
```

### 修改项目状态

在 `js/main.js` 的 `projects` 数组中修改项目的 `status` 字段：

- `completed` - 已完成 (绿色)
- `development` - 开发中 (橙色)
- `planning` - 规划中 (蓝色)

## 🔧 功能说明

### 项目搜索

- 支持按项目名称、描述、标签搜索
- 实时搜索，无需点击搜索按钮

### 项目筛选

- **全部** - 显示所有项目
- **已完成** - 只显示已完成的项目
- **开发中** - 只显示正在开发的项目
- **规划中** - 只显示规划中的项目

### 留言系统

- 使用Gitalk，基于GitHub Issues
- 需要GitHub账号登录
- 支持Markdown格式
- 所有留言存储在GitHub Issues中

## 📝 添加新项目模板

```javascript
{
    id: 项目ID,                    // 唯一标识
    name: 'github-repo-name',     // GitHub仓库名
    title: '显示标题',              // 页面显示的标题
    description: '项目描述...',     // 简短描述
    status: 'completed',          // 状态：completed/development/planning
    statusText: '已完成',          // 状态显示文本
    tags: ['标签1', '标签2'],       // 标签列表
    link: 'https://github.com/Cong0925/repo', // 项目链接
    icon: 'fas fa-icon-name'      // Font Awesome图标类名
}
```

## 🎯 图标参考

常用Font Awesome图标：

- 写作/文档: `fas fa-pen-fancy`, `fas fa-file-alt`
- 工具: `fas fa-tools`, `fas fa-cog`
- 应用: `fas fa-mobile-alt`, `fas fa-laptop-code`
- 数据: `fas fa-database`, `fas fa-chart-bar`
- AI: `fas fa-robot`, `fas fa-brain`

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

---

**Made with ❤️ by Cong0925**
