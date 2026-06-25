'use client';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { getAllArticles } from '@/lib/data/articles';
import { Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-accent">深度文章</h1>
        <p className="text-text-secondary mb-8">一人公司创业指南 · 商业模式分析 · 工具与资源 · 成功案例</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard href={`/articles/${article.slug}`}>
                {/* Cover placeholder */}
                <div className="w-full h-32 rounded-xl bg-accent-light mb-4 flex items-center justify-center">
                  <span className="text-2xl text-accent/30">📖</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {article.category && (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-accent/10 text-accent border border-accent/20">{article.category}</span>
                    )}
                    <span className="text-text-tertiary text-xs">{article.sourceName}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary line-clamp-2">{article.title}</h3>
                  <p className="text-text-secondary text-sm line-clamp-2">{article.summary}</p>
                  <div className="flex flex-wrap gap-1">
                    {article.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded text-xs bg-surface-alt text-text-secondary border border-border">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-text-tertiary"><Calendar size={12} /> {article.publishedAt}</span>
                    <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-accent hover:text-accent-hover transition-colors">
                      <ExternalLink size={12} /> 原文
                    </a>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
