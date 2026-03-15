# Collector Site

本地内容采集系统的查询站，基于 Next.js 构建，用于展示和查询 `collector-v1` 导出的静态 JSON 数据。

## 功能特性

- 📋 **首页**: 展示最近更新的 20 条内容和统计信息
- 🔍 **搜索**: 支持按标题、摘要、标签、类型搜索
- 📚 **归档**: 按年/月/日分组浏览全部内容
- 📄 **详情页**: 查看完整的 Markdown 内容

## 技术栈

- Next.js 15 (App Router)
- TypeScript
- React Markdown
- 静态导出 (Static Export)

## 快速开始

### 1. 安装依赖

```bash
npm install
# 或
pnpm install
# 或
yarn install
```

### 2. 准备数据

将 `collector-v1` 导出的数据复制到 `data/` 目录：

```bash
# 在 collector-v1 项目中导出数据
cd /path/to/collector-v1
python export_site_data.py

# 复制到 collector-site
cp -r site-data/* /path/to/collector-site/data/
```

数据目录结构应该是：
```
collector-site/
  data/
    index.json
    stats.json
    docs/
      <id1>.json
      <id2>.json
      ...
```

### 3. 本地运行

```bash
npm run dev
```

访问 http://localhost:3000

### 4. 构建生产版本

```bash
npm run build
```

构建后的静态文件在 `out/` 目录。

## 部署到 Vercel

### 方式一：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 方式二：通过 GitHub

1. 将项目推送到 GitHub
2. 在 Vercel 中导入项目
3. Vercel 会自动检测 Next.js 项目并部署

### 注意事项

- 确保 `data/` 目录包含所有必要的 JSON 文件
- 项目配置为静态导出模式 (`output: 'export'`)
- 每次更新数据后需要重新构建和部署

## 项目结构

```
collector-site/
  app/                    # Next.js App Router 页面
    layout.tsx           # 根布局
    page.tsx             # 首页
    search/              # 搜索页
    archive/             # 归档页
    docs/[id]/           # 详情页
    not-found.tsx        # 404 页面
  components/            # React 组件
    site-header.tsx      # 网站头部
    site-footer.tsx      # 网站底部
    doc-card.tsx         # 文档卡片
    search-bar.tsx       # 搜索栏
    archive-group.tsx    # 归档分组
    markdown-viewer.tsx  # Markdown 渲染器
    tag-list.tsx         # 标签列表
    stats-cards.tsx      # 统计卡片
    empty-state.tsx      # 空状态
  lib/                   # 工具函数
    data.ts              # 数据读取
    search.ts            # 搜索逻辑
    archive.ts           # 归档分组
    types.ts             # TypeScript 类型
    utils.ts             # 工具函数
  data/                  # 数据目录（需要手动创建）
    index.json
    stats.json
    docs/
```

## 数据格式

### index.json
```json
[
  {
    "id": "20260315-171421-426650",
    "title": "标题",
    "type": "video",
    "summary": "摘要",
    "tags": ["标签1", "标签2"],
    "status": "processed",
    "created_at": "2026-03-15T17:24:19.707604+08:00",
    "updated_at": "2026-03-15T17:24:19.707604+08:00",
    "source": "来源",
    "detail_path": "/docs/20260315-171421-426650"
  }
]
```

### stats.json
```json
{
  "total_docs": 6,
  "by_type": {
    "video": 2,
    "web": 4
  },
  "updated_at": "2026-03-15T19:07:55.375475+08:00"
}
```

### docs/<id>.json
```json
{
  "id": "...",
  "title": "...",
  "type": "video",
  "markdown": "# 标题\n\n正文...",
  "markdown_missing": false,
  ...
}
```

## License

MIT
# Deployment Test
