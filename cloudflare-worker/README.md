# Gitalk Cloudflare Worker 代理

解决 Gitalk 在浏览器中调用 GitHub OAuth Token 接口的 CORS 问题。

## 部署步骤

### 1. 注册/登录 Cloudflare

打开 https://dash.cloudflare.com/ ，注册或登录账号。

### 2. 进入 Workers

左侧菜单点击 **Workers & Pages** → 点击 **Create application** → 选择 **Create Worker**。

### 3. 部署 Worker

1. 给 Worker 起个名字（比如 `gitalk-proxy`），点击 **Deploy**
2. 进入刚创建的 Worker，点击 **Edit code**
3. 把 `index.js` 的内容**全部复制粘贴**进去（替换掉默认代码）
4. 点击 **Deploy**

### 4. 获取 Worker URL

部署成功后，页面顶部会显示你的 Worker 地址，格式类似：

```
https://gitalk-proxy.你的用户名.workers.dev
```

把这个地址填到 `home/js/main.js` 的 Gitalk 配置里：

```js
proxy: 'https://gitalk-proxy.你的用户名.workers.dev',
```

### 5. 完成

刷新页面，GitHub 登录应该就能正常使用了。

## 注意事项

- `client_id` 和 `client_secret` 来自你的 GitHub OAuth App，必须和 `main.js` 里的一致
- Cloudflare Worker 免费版每天有 10 万次请求，个人博客完全够用
- 敏感信息（client_secret）在 Worker 代码里是暴露的，但 Worker 只处理 token 交换，风险可控
