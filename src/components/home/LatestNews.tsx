'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { getNewsSortedByTime } from '@/lib/data/news';
import { Clock, TrendingUp, Zap, Globe } from 'lucide-react';

const CATEGORY_COLORS: Record<string, string> = {
  '国际': 'bg-blue-50 text-blue-700 border-blue-200',
  '科技': 'bg-purple-50 text-purple-700 border-purple-200',
  'AI': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  '财经': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  '政策': 'bg-amber-50 text-amber-700 border-amber-200',
  '汽车': 'bg-rose-50 text-rose-700 border-rose-200',
  '体育': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  '教育': 'bg-violet-50 text-violet-700 border-violet-200',
  '生活': 'bg-teal-50 text-teal-700 border-teal-200',
  '商业': 'bg-orange-50 text-orange-700 border-orange-200',
};

const HEAT_BADGE = (heat: number) => {
  if (heat >= 90) return { text: '爆', cls: 'bg-red-500 text-white' };
  if (heat >= 80) return { text: '热', cls: 'bg-amber-500 text-white' };
  if (heat >= 70) return { text: '新', cls: 'bg-blue-500 text-white' };
  return { text: '', cls: 'hidden' };
};

const formatTime = (dateStr: string) => {
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

export default function LatestNews() {
  const allNews = getNewsSortedByTime();
  const news = allNews.slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* Section Header — compact on mobile */}
        <div className="flex items-end justify-between mb-5 sm:mb-7">
          <div>
            <div className="flex items-center gap-2 sm:gap-3">
              <h2 className="text-xl sm:text-3xl font-bold text-accent">最新资讯</h2>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                <Globe size={12} /> 全网热点
              </span>
            </div>
            <p className="text-text-secondary text-xs sm:text-sm mt-0.5 sm:mt-1">多源聚合 · 实时追踪科技与产业动态</p>
          </div>
          <Link
            href="/news"
            className="text-accent hover:text-accent/80 transition-colors text-sm font-medium shrink-0"
          >
            全部 →
          </Link>
        </div>

        {/* News Grid — 1 column mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {news.map((item, i) => {
            const heatInfo = HEAT_BADGE(item.heat);
            const catColor = CATEGORY_COLORS[item.category] || 'bg-gray-50 text-gray-700 border-gray-200';
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.06, 0.3) }}
              >
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass hover-glow block"
                >
                  {/* === Mobile: Compact row === */}
                  <div className="sm:hidden flex items-start gap-3 p-3">
                    <span className={`shrink-0 mt-0.5 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${catColor}`}>
                      {item.category}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-sm font-semibold text-text-primary line-clamp-2 leading-snug">
                          {item.title}
                        </span>
                        {heatInfo.text && (
                          <span className={`shrink-0 px-1 py-0.5 rounded text-[10px] font-bold leading-none ${heatInfo.cls}`}>
                            {heatInfo.text}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-text-tertiary text-[11px]">
                        <span className="flex items-center gap-0.5">
                          <Zap size={10} className="text-accent" /> {item.source}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5">
                          <Clock size={10} /> {formatTime(item.publishedAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* === Desktop: Full card === */}
                  <div className="hidden sm:block p-4 sm:p-5 space-y-3">
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${catColor}`}>
                        {item.category}
                      </span>
                      <div className="flex items-center gap-2">
                        {heatInfo.text && (
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold leading-none ${heatInfo.cls}`}>
                            {heatInfo.text}
                          </span>
                        )}
                        <span className="text-text-tertiary text-xs flex items-center gap-0.5">
                          <Clock size={10} /> {formatTime(item.publishedAt)}
                        </span>
                      </div>
                    </div>
                    {/* Title */}
                    <h3 className="text-base font-semibold text-text-primary line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    {/* Summary */}
                    <p className="text-text-secondary text-sm line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                    {/* Tags + Source */}
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-border">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-1.5 py-0.5 rounded text-[11px] bg-surface-alt text-text-tertiary border border-border">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-text-tertiary flex items-center gap-1 shrink-0">
                        <Zap size={10} className="text-accent" /> {item.source}
                      </span>
                    </div>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Stats bar — compact on mobile */}
        <div className="mt-6 sm:mt-8 p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-surface-alt border border-border">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: '全网资讯', value: allNews.length },
              { label: '权威来源', value: new Set(allNews.map(n => n.source)).size },
              { label: '热门资讯', value: allNews.filter(n => n.heat >= 80).length },
            ].map((stat, i) => (
              <div key={stat.label} className={i < 2 ? 'border-r border-border' : ''}>
                <div className="text-base sm:text-lg font-bold text-accent">{stat.value}</div>
                <div className="text-text-tertiary text-[11px] sm:text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
