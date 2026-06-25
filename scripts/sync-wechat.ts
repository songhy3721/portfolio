/**
 * 微信公众号文章半自动同步 CLI 脚本
 * 
 * 使用方式：
 * 1. 单篇同步: npx tsx scripts/sync-wechat.ts <url>
 * 2. 手动导入: npx tsx scripts/sync-wechat.ts --import <html-file>
 * 3. 批量同步: npx tsx scripts/sync-wechat.ts --batch <urls-file>
 */

import { JSDOM } from 'jsdom';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// ==========================================
// 微信 HTML 解析器
// ==========================================

interface WechatArticleData {
  title: string;
  description: string;
  summary: string;
  content: string; // 清洗后的HTML
  cover: string;
  publishedAt: string;
  sourceName: string;
  tags: string[];
  slug: string;
}

function parseWechatHTML(html: string, url: string): WechatArticleData {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // 提取标题
  const titleEl = doc.querySelector('#activity-name') || doc.querySelector('.rich_media_title');
  const title = titleEl?.textContent?.trim() || '未知标题';

  // 提取描述/摘要
  const descEl = doc.querySelector('.rich_media_desc') || doc.querySelector('#meta_content');
  const description = descEl?.textContent?.trim() || title;

  // 提取作者/来源
  const authorEl = doc.querySelector('#js_name') || doc.querySelector('.rich_media_meta_nickname');
  const sourceName = authorEl?.textContent?.trim() || '微信公众号';

  // 提取发布时间
  const timeEl = doc.querySelector('#publish_time') || doc.querySelector('.rich_media_meta_text');
  const publishedAt = timeEl?.textContent?.trim() || new Date().toISOString().split('T')[0];

  // 提取正文
  const contentEl = doc.querySelector('#js_content') || doc.querySelector('.rich_media_content');
  let content = contentEl?.innerHTML || '';

  // 清洗HTML
  content = cleanWechatHTML(content);

  // 提取封面图
  const coverEl = contentEl?.querySelector('img') || doc.querySelector('.rich_media_thumb');
  const cover = coverEl?.getAttribute('data-src') || coverEl?.getAttribute('src') || '';

  // 生成slug
  const slug = title
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50)
    || crypto.createHash('md5').update(url).digest('hex').slice(0, 8);

  // 从内容提取标签（简单实现）
  const tags = extractTags(content);

  // 截取摘要
  const summary = content
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 150) + '...';

  return {
    title,
    description,
    summary,
    content,
    cover,
    publishedAt,
    sourceName,
    tags,
    slug,
  };
}

function cleanWechatHTML(html: string): string {
  // 移除微信特定的data-*属性
  html = html.replace(/data-[a-z-]+="[^"]*"/gi, '');
  
  // 简化inline style - 只保留color和background
  html = html.replace(/style="([^"]*)"/gi, (_, styles) => {
    const keep = styles.split(';').filter(s => {
      const prop = s.trim().toLowerCase();
      return prop.startsWith('color') || prop.startsWith('background') || prop.startsWith('text-align');
    });
    return keep.length > 0 ? `style="${keep.join(';')}"` : '';
  });

  // 移除空的class
  html = html.replace(/class=""/g, '');
  
  // 替换微信图片URL为本地路径占位
  html = html.replace(
    /<img[^>]*?(?:data-src|src)="([^"]+?mmbiz[^"]*)"[^>]*?>/gi,
    (_, url) => `<img src="/images/articles/wechat-${crypto.createHash('md5').update(url).digest('hex').slice(0, 8)}.jpg" alt="" />`
  );

  // 移除script标签
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  
  return html;
}

function extractTags(content: string): string[] {
  const tagKeywords: Record<string, string[]> = {
    '设计': ['设计', 'UI', 'UX', '视觉', '配色', '交互', '渐变'],
    '开发': ['开发', '代码', 'React', 'Next.js', '前端', 'JavaScript', 'TypeScript'],
    '工具': ['工具', '效率', '插件', '自动化'],
    '创意': ['创意', '灵感', '作品', '品牌'],
  };

  const text = content.replace(/<[^>]*>/g, '').toLowerCase();
  const tags: string[] = [];

  for (const [tag, keywords] of Object.entries(tagKeywords)) {
    if (keywords.some(kw => text.includes(kw.toLowerCase()))) {
      tags.push(tag);
    }
  }

  return tags.length > 0 ? tags : ['微信'];
}

// ==========================================
// JSON 数据保存
// ==========================================

function saveArticleData(article: WechatArticleData, sourceUrl: string): string {
  const dataDir = path.join(process.cwd(), 'src', 'data', 'articles');
  const filePath = path.join(dataDir, `${article.slug}.json`);

  const articleData = {
    slug: article.slug,
    title: article.title,
    description: article.description,
    summary: article.summary,
    cover: article.cover || '/images/articles/default.jpg',
    source: 'wechat',
    sourceUrl,
    sourceName: article.sourceName,
    tags: article.tags,
    publishedAt: article.publishedAt,
    views: 0,
    contentPreview: article.summary,
    content: article.content,
  };

  // 检查是否已存在
  if (fs.existsSync(filePath)) {
    console.log(`⚠ 文章已存在: ${article.slug}.json，将更新`);
  }

  fs.writeFileSync(filePath, JSON.stringify(articleData, null, 2));
  console.log(`✅ 已保存: ${filePath}`);
  
  return filePath;
}

// ==========================================
// 主流程
// ==========================================

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('使用方式:');
    console.log('  npx tsx scripts/sync-wechat.ts <wechat-url>    # 单篇同步（需手动提供HTML）');
    console.log('  npx tsx scripts/sync-wechat.ts --import <file> # 手动导入HTML文件');
    console.log('  npx tsx scripts/sync-wechat.ts --batch <file>  # 批量导入');
    return;
  }

  if (args[0] === '--import') {
    // 手动导入HTML文件
    const htmlFile = args[1];
    const sourceUrl = args[2] || 'https://mp.weixin.qq.com/s/manual-import';
    
    if (!htmlFile || !fs.existsSync(htmlFile)) {
      console.error('❌ 请提供有效的HTML文件路径');
      return;
    }

    const html = fs.readFileSync(htmlFile, 'utf-8');
    const article = parseWechatHTML(html, sourceUrl);
    saveArticleData(article, sourceUrl);
    return;
  }

  if (args[0] === '--batch') {
    // 批量导入
    const batchFile = args[1];
    if (!batchFile || !fs.existsSync(batchFile)) {
      console.error('❌ 请提供批量导入文件路径（JSON格式: [{url, htmlPath}]）');
      return;
    }

    const batch = JSON.parse(fs.readFileSync(batchFile, 'utf-8'));
    for (const item of batch) {
      const html = fs.readFileSync(item.htmlPath, 'utf-8');
      const article = parseWechatHTML(html, item.url);
      saveArticleData(article, item.url);
    }
    return;
  }

  // 单篇 - 需要手动提供HTML（微信有反爬机制）
  console.log('⚠ 微信公众号有反爬机制，建议使用以下方式:');
  console.log('  1. 手动复制网页HTML保存为文件');
  console.log('  2. 使用 --import 参数导入HTML文件');
  console.log('  3. 使用管理界面 (/admin/sync) 粘贴HTML内容');
  console.log('');
  console.log('URL:', args[0]);
  console.log('请将此URL的HTML内容保存后使用 --import 参数导入');
}

main().catch(console.error);
