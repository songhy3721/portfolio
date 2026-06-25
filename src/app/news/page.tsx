'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { getAllNews, getNewsSortedByTime, getNewsSortedByHeat, getCategories, getLastUpdated, getUpdateInterval, searchNews } from '@/lib/data/news';
import { Clock, ExternalLink, TrendingUp, RefreshCw, Search, Filter, Globe, Zap } from 'lucide-react';

const CATEGORY_ICONS: Record<string, string> = {
  '国际': '🌍',
  '科技': '🔬',
  'AI': '🤖',
  '财经': '💰',
  '政策': '📋',
  '汽车': '🚗',
  '体育': '⚽',
  '教育': '🎓',
  '生活': '🌿',
  '商业': '📊',
};

const CATEGORY_COLORS: Record<string, string> = {
  '国际': 'bg-blue-100 text-blue-700 border-blue-200',
  '科技': 'bg-purple-100 text-purple-700 border-purple-200',
  'AI': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  '财经': 'bg-green-100 text-green-700 border-green-200',
  '政策': 'bg-amber-100 text-amber-700 border-amber-200',
  '汽车': 'bg-red-100 text-red-700 border-red-200',
  '体育': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  '教育': 'bg-violet-100 text-violet-700 border-violet-200',
  '生活': 'bg-teal-100 text-teal-700 border-teal-200',
  '商业': 'bg-orange-100 text-orange-700 border-orange-200',
};

const HEAT_LABELS = (heat: number) => {
  if (heat >= 90) return { text: '爆', color: 'bg-red-500 text-white' };
  if (heat >= 80) return { text: '热', color: 'bg-amber-500 text-white' };
  if (heat >= 70) return { text: '新', color: 'bg-blue-500 text-white' };
  return { text: '冷', color: 'bg-gray-400 text-white' };
};

type SortMode = 'time' | 'heat';

export default function NewsPage() {
  const allNews = getAllNews();
  const categories = getCategories();
  const lastUpdated = getLastUpdated();
  const interval = getUpdateInterval();

  const [sortMode, setSortMode] = useState<SortMode>('time');
  const [activeCategory, setActiveCategory] = useState<string>('全部');
  const [keyword, setKeyword] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [nextRefresh, setNextRefresh] = useState(interval * 60);

  const getFilteredNews = useCallback(() => {
    let news = sortMode === 'time' ? getNewsSortedByTime() : getNewsSortedByHeat();
    if (activeCategory !== '全部') {
      news = news.filter(item => item.category === activeCategory);
    }
    if (keyword.trim()) {
      const lower = keyword.toLowerCase();
      news = news.filter(item =>
        item.title.toLowerCase().includes(lower) ||
        item.summary.toLowerCase().includes(lower) ||
        item.tags.some(tag => tag.toLowerCase().includes(lower))
      );
    }
    return news;
  }, [sortMode, activeCategory, keyword]);

  const filteredNews = getFilteredNews();

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  // Auto-refresh countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setNextRefresh(prev => {
        if (prev <= 1) {
          handleRefresh();
          return interval * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [interval]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const formatPublishTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffH = Math.floor(diffMs / 3600000);
    const diffD = Math.floor(diffMs / 86400000);

    if (diffH < 1) return '刚刚';
    if (diffH < 24) return `${diffH}小时前`;
    if (diffD < 7) return `${diffD}天前`;
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-accent">热点资讯</h1>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-accent-light text-accent border border-accent/20">
                <Globe size={14} /> 全网聚合
              </span>
            </div>
            <p className="text-text-secondary">
              多源聚合 · 实时更新 · 自动去重 · 每{interval}分钟刷新
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-text-tertiary">
              <Clock size={14} /> 更新于 {new Date(lastUpdated).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-accent-light text-accent text-xs font-medium">
              <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} /> {formatTime(nextRefresh)}
            </span>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="搜索关键词、标题、标签..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSortMode('time')}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                sortMode === 'time'
                  ? 'bg-accent text-white shadow-sm'
                  : 'bg-surface text-text-secondary border border-border hover:border-accent hover:text-accent'
              }`}
            >
              <Clock size={14} /> 按时间
            </button>
            <button
              onClick={() => setSortMode('heat')}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                sortMode === 'heat'
                  ? 'bg-accent text-white shadow-sm'
                  : 'bg-surface text-text-secondary border border-border hover:border-accent hover:text-accent'
              }`}
            >
              <TrendingUp size={14} /> 按热度
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('全部')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeCategory === '全部'
                ? 'bg-accent text-white shadow-sm'
                : 'bg-surface text-text-secondary border border-border hover:border-accent hover:text-accent'
            }`}
          >
            全部 ({allNews.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-accent text-white shadow-sm'
                  : 'bg-surface text-text-secondary border border-border hover:border-accent hover:text-accent'
              }`}
            >
              {CATEGORY_ICONS[cat] || '📌'} {cat} ({getAllNews().filter(n => n.category === cat).length})
            </button>
          ))}
        </div>

        {/* News Count */}
        <div className="text-text-tertiary text-sm mb-6">
          共 {filteredNews.length} 条资讯
          {activeCategory !== '全部' && ` · ${activeCategory}分类`}
          {keyword.trim() && ` · 匹配"${keyword}"`}
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-text-secondary text-lg">暂无匹配的资讯</p>
            <p className="text-text-tertiary text-sm mt-2">试试更换筛选条件或关键词</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item, i) => {
              const heatInfo = HEAT_LABELS(item.heat);
              const catColor = CATEGORY_COLORS[item.category] || 'bg-gray-100 text-gray-700 border-gray-200';
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <GlassCard href={item.sourceUrl} hover={true}>
                    <div className="space-y-3">
                      {/* Category + Heat + Time */}
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${catColor}`}>
                          {CATEGORY_ICONS[item.category] || '📌'} {item.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${heatInfo.color}`}>
                            {heatInfo.text}
                          </span>
                          <span className="text-text-tertiary text-xs flex items-center gap-0.5">
                            <Clock size={10} /> {formatPublishTime(item.publishedAt)}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-semibold text-text-primary line-clamp-2 leading-snug">
                        {item.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-text-secondary text-sm line-clamp-3 leading-relaxed">
                        {item.summary}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 4).map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded text-xs bg-surface-alt text-text-secondary border border-border">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer: Source + Heat score */}
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-border">
                        <span className="text-text-tertiary flex items-center gap-1">
                          <Zap size={10} className="text-accent" /> {item.source}
                        </span>
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-accent hover:text-accent-hover transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={12} /> 原文
                        </a>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Bottom Stats */}
        <div className="mt-12 p-6 gradient-border text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl font-bold text-accent">{allNews.length}</div>
              <div className="text-text-secondary text-sm">资讯总数</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">{categories.length}</div>
              <div className="text-text-secondary text-sm">覆盖分类</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">{allNews.filter(n => n.language === 'zh').length}</div>
              <div className="text-text-secondary text-sm">中文源</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">{interval}min</div>
              <div className="text-text-secondary text-sm">刷新周期</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
