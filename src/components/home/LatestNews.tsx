'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { getNewsSortedByTime } from '@/lib/data/news';
import { Clock, ExternalLink, TrendingUp, Zap, Globe } from 'lucide-react';

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

const HEAT_LABELS = (heat: number) => {
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
  const news = getNewsSortedByTime().slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-accent">最新资讯</h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                <Globe size={12} /> 全网热点
              </span>
            </div>
            <p className="text-text-secondary text-sm">多源聚合 · 实时追踪科技与产业动态</p>
          </div>
          <Link
            href="/news"
            className="hidden sm:inline-flex items-center gap-1 text-accent hover:text-accent/80 transition-colors text-sm font-medium"
          >
            查看全部资讯 <ExternalLink size={14} />
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {news.map((item, i) => {
            const heatInfo = HEAT_LABELS(item.heat);
            const catColor = CATEGORY_COLORS[item.category] || 'bg-gray-50 text-gray-700 border-gray-200';
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassCard>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block space-y-3"
                  >
                    {/* Top: Category + Heat + Time */}
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${catColor}`}>
                        {CATEGORY_ICONS[item.category] || '📌'} {item.category}
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
                    <h3 className="text-base font-semibold text-text-primary line-clamp-2 leading-snug group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-text-secondary text-sm line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[11px] bg-surface-alt text-text-tertiary border border-border"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-border">
                      <span className="text-text-tertiary flex items-center gap-1">
                        <Zap size={10} className="text-accent" /> {item.source}
                      </span>
                      <span className="flex items-center gap-1 text-accent text-xs">
                        查看 <ExternalLink size={10} />
                      </span>
                    </div>
                  </a>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile view-all link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-accent hover:text-accent/80 transition-colors text-sm font-medium"
          >
            查看全部资讯 <ExternalLink size={14} />
          </Link>
        </div>

        {/* Stats bar */}
        <div className="mt-10 p-5 rounded-2xl bg-surface-alt border border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-accent">{getNewsSortedByTime().length}</div>
              <div className="text-text-tertiary text-xs mt-0.5">全网资讯</div>
            </div>
            <div>
              <div className="text-lg font-bold text-accent">
                {new Set(getNewsSortedByTime().map(n => n.source)).size}
              </div>
              <div className="text-text-tertiary text-xs mt-0.5">权威来源</div>
            </div>
            <div>
              <div className="text-lg font-bold text-accent flex items-center justify-center gap-1">
                <TrendingUp size={16} />
                {(() => {
                  const highs = getNewsSortedByTime().filter(n => n.heat >= 80).length;
                  return highs;
                })()}
              </div>
              <div className="text-text-tertiary text-xs mt-0.5">热门资讯</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
