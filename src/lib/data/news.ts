import newsData from '@/data/news-data.json';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  category: string;
  language: string;
  publishedAt: string;
  heat: number;
  tags: string[];
}

export interface NewsData {
  lastUpdated: string;
  updateInterval: number;
  items: NewsItem[];
}

const data = newsData as NewsData;

export function getAllNews(): NewsItem[] {
  return data.items;
}

export function getNewsByCategory(category: string): NewsItem[] {
  return data.items.filter(item => item.category === category);
}

export function searchNews(keyword: string): NewsItem[] {
  const lower = keyword.toLowerCase();
  return data.items.filter(item =>
    item.title.toLowerCase().includes(lower) ||
    item.summary.toLowerCase().includes(lower) ||
    item.tags.some(tag => tag.toLowerCase().includes(lower)) ||
    item.source.toLowerCase().includes(lower)
  );
}

export function getNewsSortedByTime(): NewsItem[] {
  return [...data.items].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getNewsSortedByHeat(): NewsItem[] {
  return [...data.items].sort((a, b) => b.heat - a.heat);
}

export function getCategories(): string[] {
  const cats = new Set(data.items.map(item => item.category));
  return Array.from(cats).sort();
}

export function getLastUpdated(): string {
  return data.lastUpdated;
}

export function getUpdateInterval(): number {
  return data.updateInterval;
}
