# Collector Site - 快速启动指南

## 项目已完成 ✅

✅ Next.js 15 + TypeScript 项目脚手架
✅ 所有页面和组件
✅ 数据已从 collector-v1 复制
✅ 已修复 Next.js 15 类型兼容问题
✅ 已修复静态导出构建问题
✅ 构建测试通过

## 立即运行

### 1. 安装依赖

```bash
cd D:\openclaw\workspaces\think-tank\collector-site
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问: http://localhost:3000

## 页面说明

### 首页 `/`
- 展示统计卡片（总文档数、各类型数量）
- 显示最近更新的 20 条内容
- 每条内容显示：标题、类型、摘要、标签、创建时间

### 搜索页 `/search`
- 搜索框支持实时搜索
- 匹配字段：标题、摘要、标签、类型
- 显示搜索结果数量
- 空状态提示

### 归档页 `/archive`
- 按年 -> 月 -> 日三级折叠展示
- 可展开/折叠各级分组
- 每条记录显示标题、类型、链接

### 详情页 `/docs/[id]`
- 显示完整元信息（类型、时间、标签、来源等）
- 使用 react-markdown 渲染 Markdown 内容
- 如果 markdown_missing=true，显示友好提示

## 数据更新流程

当 collector-v1 有新内容时：

```bash
# 1. 在 collector-v1 导出最新数据
cd D:\openclaw\workspaces\think-tank\collector-v1
python export_site_data.py

# 2. 复制到 collector-site
cp -r site-data/* ../collector-site/data/

# 3. 重新构建（如果已部署）
cd ../collector-site
npm run build
```

## 部署到 Vercel

### 首次部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
cd D:\openclaw\workspaces\think-tank\collector-site
vercel
```

### 后续更新

```bash
# 更新数据后
vercel --prod
```

## 项目特点

- ✅ 纯静态站点，无需数据库
- ✅ 使用 Server Components，性能优秀
- ✅ 响应式设计，移动端友好
- ✅ 简洁的文档站风格
- ✅ 支持 Markdown 渲染
- ✅ 类型安全（TypeScript）

## 故障排查

### 数据未显示
检查 `data/` 目录是否包含：
- index.json
- stats.json
- docs/*.json

### 构建失败
确保所有依赖已安装：
```bash
rm -rf node_modules package-lock.json
npm install
```

### 端口被占用
修改端口：
```bash
npm run dev -- -p 3001
```
