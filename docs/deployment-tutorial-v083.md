---
description: WriteHelper v0.8.3 Windows 服务器部署完整教程，涵盖环境准备、一键安装、手动部署、常见问题排查
created: 2026-07-13
last_modified: 2026-07-13
---

# WriteHelper v0.8.3 Windows 服务器部署教程

> 本教程面向需要在 Windows 服务器上部署 WriteHelper 的用户，涵盖从零开始的完整部署流程。

---

## 目录

1. [环境准备](#1-环境准备)
2. [获取项目代码](#2-获取项目代码)
3. [方式一：一键脚本部署（推荐）](#3-方式一键脚本部署推荐)
4. [方式二：手动分步部署](#4-方式二手动分步部署)
5. [部署后验证](#5-部署后验证)
6. [日常运维管理](#6-日常运维管理)
7. [常见问题与排查](#7-常见问题与排查)
8. [附录：端口与路径速查](#8-附录端口与路径速查)

---

## 1. 环境准备

### 1.1 必需软件

| 软件 | 最低版本 | 推荐版本 | 用途 |
|------|---------|---------|------|
| Node.js | 18.0.0 | 20.x LTS | JavaScript 运行时 |
| npm | 8.0.0 | 10.x | 包管理器 |
| Git | 2.0.0 | 最新版 | 拉取项目代码 |
| PM2 | 5.0.0 | 最新版 | Node.js 进程管理器（生产环境必需） |

### 1.2 安装 Node.js

1. 访问 https://nodejs.org/ 下载 **LTS 版本**（推荐 20.x）
2. 运行安装程序，勾选 "Automatically install the necessary tools"（可选）
3. 安装完成后打开 PowerShell，验证安装：

```powershell
node -v    # 应输出 v20.x.x
npm -v     # 应输出 10.x.x
```

### 1.3 安装 Git

1. 访问 https://git-scm.com/download/win 下载 Windows 版
2. 安装时选择默认选项即可
3. 验证安装：

```powershell
git --version   # 应输出 git version 2.xx.x
```

### 1.4 安装 PM2

```powershell
npm install -g pm2
pm2 -v   # 验证安装
```

### 1.5 配置 npm 镜像（国内加速）

```powershell
npm config set registry https://registry.npmmirror.com
```

---

## 2. 获取项目代码

### 2.1 克隆仓库

```powershell
# 选择一个合适的目录，例如 D:\Projects
cd D:\
mkdir Projects
cd Projects

# 克隆项目
git clone https://github.com/Cong0925/write-helper.git
cd write-helper
```

### 2.2 切换到 v0.8.3 版本

```powershell
# 查看所有标签
git tag -l

# 切换到 v0.8.3
git checkout v0.8.3

# 如果 v0.8.3 标签不存在，切换到最新 main 分支
git checkout main
git pull origin main
```

### 2.3 项目目录结构说明

```
write-helper/
├── front/                  # 前端项目（Vue3 + Vite）
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/                 # 后端项目（Express + better-sqlite3）
│   ├── src/
│   ├── migrations/         # 数据库迁移脚本
│   ├── data/               # SQLite 数据库文件（运行时自动创建）
│   ├── ecosystem.config.cjs # PM2 配置
│   └── package.json
├── install.bat             # Windows 一键安装脚本
├── start.bat               # Windows 一键启动脚本
├── stop.bat                # Windows 一键停止脚本
├── update.bat              # Windows 一键更新脚本
└── deploy-windows.bat      # Windows 服务器完整部署脚本
```

---

## 3. 方式一：一键脚本部署（推荐）

适用于快速部署，脚本会自动完成所有步骤。

### 3.1 首次部署

**双击运行 `install.bat`**，或在命令行执行：

```powershell
cd D:\Projects\write-helper
.\install.bat
```

该脚本会自动执行：
- 安装前端依赖（`npm install` in `front/`）
- 安装后端依赖（`npm install` in `server/`）
- 构建前端生产版本（`npm run build` in `front/`）

等待执行完成，看到 "安装完成" 提示即可。

### 3.2 启动服务

**双击运行 `start.bat`**，或在命令行执行：

```powershell
.\start.bat
```

该脚本会自动执行：
- 通过 PM2 启动后端服务
- 首次启动时自动运行数据库迁移（创建表和默认管理员）
- 显示服务访问地址

### 3.3 访问系统

启动成功后，在浏览器中打开：

```
http://localhost:3000
```

默认管理员账号：`admin` / `admin123`

### 3.4 完整部署脚本

如果需要一次性完成安装+启动，可以使用：

```powershell
.\deploy-windows.bat
```

---

## 4. 方式二：手动分步部署

适用于需要自定义配置或排查问题的场景。

### 4.1 安装前端依赖并构建

```powershell
cd D:\Projects\write-helper\front

# 安装依赖
npm install

# 构建生产版本
npm run build

# 确认构建产物
ls dist/    # 应看到 index.html 和 assets 目录
```

### 4.2 安装后端依赖

```powershell
cd ..\server

# 安装依赖
npm install

# 确认关键依赖已安装
ls node_modules\better-sqlite3    # SQLite 驱动
ls node_modules\jsonwebtoken      # JWT 认证
```

### 4.3 配置环境变量（可选）

在 `server/` 目录下创建 `.env` 文件：

```ini
# 服务端口（默认 3000）
PORT=3000

# JWT 密钥（生产环境务必修改！）
JWT_SECRET=your-secure-secret-key-here

# 数据库路径（使用绝对路径更可靠）
DB_PATH=D:\Projects\write-helper\server\data\writehelper.db

# 运行环境
NODE_ENV=production
```

> **安全提示**：生产环境中 `JWT_SECRET` 必须修改为随机字符串，否则存在安全风险。

### 4.4 使用 PM2 启动后端

```powershell
# 方式 A：使用 ecosystem.config.cjs 配置文件（推荐）
cd D:\Projects\write-helper
pm2 start server/ecosystem.config.cjs

# 方式 B：手动指定参数
pm2 start server/src/index.js --name write-helper-server --cwd server
```

### 4.5 验证启动状态

```powershell
pm2 list
```

应看到类似输出：

```
┌─────┬──────────────────────────┬─────┬─────────┬─────────┐
│ id  │ name                     │ mode│ ↺ │ status│ cpu │
├─────┼──────────────────────────┼─────┼─────────┼─────────┤
│ 0   │ write-helper-server      │ fork│ 0       │ online  │ 0%  │
└─────┴──────────────────────────┴─────┴─────────┴─────────┘
```

### 4.6 设置 PM2 开机自启

```powershell
# 保存当前进程列表
pm2 save

# 设置 Windows 开机自启
pm2-startup install

# 或者在 Git Bash 中执行：
pm2 startup
# 按照输出提示执行对应命令
pm2 save
```

---

## 5. 部署后验证

### 5.1 基本功能检查

| 检查项 | 预期结果 | 检查方法 |
|--------|---------|---------|
| 服务启动 | PM2 状态为 online | `pm2 list` |
| 数据库创建 | `server/data/writehelper.db` 文件存在 | `dir server\data\` |
| 前端构建 | `front/dist/` 目录包含文件 | `dir front\dist\` |
| 首页访问 | 浏览器显示登录页面 | 访问 `http://localhost:3000` |
| 管理员登录 | 成功登录后台管理界面 | 使用 admin/admin123 登录 |

### 5.2 数据库检查

```powershell
# 查看数据库文件大小
dir server\data\writehelper.db

# 如果安装了 sqlite3 命令行工具
sqlite3 server/data/writehelper.db ".tables"
# 应看到：users, articles, categories 等表
```

### 5.3 日志检查

```powershell
# 查看实时日志
pm2 logs write-helper-server

# 查看最近 50 行日志
pm2 logs write-helper-server --lines 50

# 查看错误日志
pm2 logs write-helper-server --err
```

正常日志应包含：
- `Server is running on port 3000`
- `Database initialized successfully`
- `Running migrations...`
- `Migrations completed successfully`

### 5.4 API 健康检查

```powershell
# 测试 API 是否响应（需要 curl 或 Invoke-WebRequest）
curl http://localhost:3000/api/health

# PowerShell 用户
Invoke-WebRequest -Uri http://localhost:3000/api/health
```

---

## 6. 日常运维管理

### 6.1 常用 PM2 命令

```powershell
# 查看进程状态
pm2 list

# 查看实时日志
pm2 logs write-helper-server

# 重启服务
pm2 restart write-helper-server

# 停止服务
pm2 stop write-helper-server

# 删除进程
pm2 delete write-helper-server

# 监控面板（实时 CPU/内存）
pm2 monit
```

### 6.2 版本更新

**使用更新脚本（推荐）：**

```powershell
.\update.bat
```

**手动更新：**

```powershell
# 1. 拉取最新代码
git pull origin main

# 2. 重新安装前端依赖并构建
cd front
npm install
npm run build
cd ..

# 3. 重新安装后端依赖
cd server
npm install
cd ..

# 4. 重启服务（数据库迁移会自动执行）
pm2 restart write-helper-server
```

### 6.3 数据备份

```powershell
# 备份数据库文件
copy server\data\writehelper.db server\data\writehelper_backup_%date:~0,4%%date:~5,2%%date:~8,2%.db

# 或使用 PowerShell
Copy-Item -Path "server\data\writehelper.db" -Destination "server\data\backup_$(Get-Date -Format yyyyMMdd_HHmmss).db"
```

### 6.4 修改端口

如果 3000 端口被占用，需要修改两处：

1. **后端端口**：修改 `server/ecosystem.config.cjs` 或 `.env` 文件中的 `PORT`
2. **前端 API 地址**：修改 `front/vite.config.js` 中的代理配置

```powershell
# 重启生效
pm2 restart write-helper-server
```

---

## 7. 常见问题与排查

### 7.1 npm install 速度慢或失败

**现象**：安装依赖时卡住或报错。

**解决方案**：

```powershell
# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com

# 清除缓存后重试
npm cache clean --force
npm install
```

### 7.2 PM2 启动后立即退出（errored 状态）

**现象**：`pm2 list` 显示 status 为 errored。

**排查步骤**：

```powershell
# 查看详细错误日志
pm2 logs write-helper-server --err --lines 100
```

**常见原因**：

| 错误信息 | 原因 | 解决方案 |
|---------|------|---------|
| `Cannot find module 'xxx'` | 依赖未安装完整 | `cd server && npm install` |
| `EADDRINUSE: port 3000` | 端口被占用 | 修改端口或关闭占用程序 |
| `SQLITE_CANTOPEN` | 数据库目录权限问题 | 检查 `server/data/` 目录权限 |
| `ENOENT: no such file` | 文件路径错误 | 检查 `.env` 中的 `DB_PATH` 配置 |

### 7.3 端口 3000 被占用

```powershell
# 查找占用端口的进程
netstat -ano | findstr :3000

# 根据 PID 找到进程名
tasklist | findstr <PID>

# 终止占用进程
taskkill /PID <PID> /F

# 或修改 WriteHelper 使用其他端口
```

### 7.4 浏览器访问显示空白页

**现象**：`http://localhost:3000` 页面空白。

**排查**：

```powershell
# 1. 确认前端已构建
dir front\dist\

# 2. 确认后端服务正在运行
pm2 list

# 3. 重启服务
pm2 restart write-helper-server
```

### 7.5 数据库迁移失败

**现象**：日志中出现 migration 相关错误。

**解决方案**：

```powershell
# 查看迁移日志
pm2 logs write-helper-server --lines 50

# 如果数据库损坏，可以删除后重建（会丢失数据！）
pm2 stop write-helper-server
del server\data\writehelper.db
pm2 restart write-helper-server   # 会自动创建新数据库
```

### 7.6 Windows 防火墙阻止访问

如果需要从其他机器访问：

```powershell
# 以管理员身份运行 PowerShell
New-NetFirewallRule -DisplayName "WriteHelper" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
```

---

## 8. 附录：端口与路径速查

### 8.1 默认端口

| 服务 | 端口 | 说明 |
|------|------|------|
| 后端 API | 3000 | Express 服务器 |
| 前端（开发） | 5173 | Vite 开发服务器 |
| 前端（生产） | 3000 | 由后端 Express 静态托管 |

### 8.2 关键文件路径

| 文件 | 路径 | 说明 |
|------|------|------|
| 后端入口 | `server/src/index.js` | Express 服务器主文件 |
| PM2 配置 | `server/ecosystem.config.cjs` | PM2 进程配置 |
| 数据库文件 | `server/data/writehelper.db` | SQLite 数据库 |
| 数据库迁移 | `server/migrations/` | 迁移脚本目录 |
| 前端构建产物 | `front/dist/` | 生产版本文件 |
| 前端配置 | `front/vite.config.js` | Vite 构建配置 |
| 环境变量 | `server/.env` | 后端环境配置（可选） |

### 8.3 快速命令参考

```powershell
# 一键安装
.\install.bat

# 一键启动
.\start.bat

# 一键停止
.\stop.bat

# 一键更新
.\update.bat

# 完整部署
.\deploy-windows.bat

# PM2 状态查看
pm2 list

# PM2 实时日志
pm2 logs write-helper-server

# PM2 重启
pm2 restart write-helper-server
```

---

> **提示**：如果遇到本教程未覆盖的问题，请查看项目 [GitHub Issues](https://github.com/Cong0925/write-helper/issues) 或联系项目维护者。
