# 项目记忆 - Portfolio Website

## 项目概况
- Next.js 静态导出网站 (`output: 'export'`)
- 热点资讯功能：数据源为 `src/data/news-data.json`，客户端组件直接导入JSON
- 因静态导出限制，**无法使用API路由**，需直接更新JSON文件来添加新闻

## 新闻数据更新流程
1. WebSearch 搜索各分类最新资讯
2. 读取 `src/data/news-data.json` 现有ID进行去重
3. 新条目插入 items 数组开头，更新 lastUpdated 时间戳
4. 验证JSON有效性 + dev server 可访问性

## 自动化任务
- automation-1782354165204: 热点资讯自动抓取与更新 (每小时执行)
