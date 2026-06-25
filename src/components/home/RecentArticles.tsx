'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { getRecentArticles } from '@/lib/data/articles';
import { Calendar, ExternalLink } from 'lucide-react';

export default function RecentArticles() {
  const articles = getRecentArticles(3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-2 text-accent">最新文章</h2>
        <p className="text-text-secondary mb-8">来自微信公众号的深度内容</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard href={`/articles/${article.slug}`}>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="wechat-badge">公众号</span>
                    <span className="text-text-tertiary text-xs">{article.sourceName}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary line-clamp-1">{article.title}</h3>
                  <p className="text-text-secondary text-sm line-clamp-2">{article.summary}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-text-tertiary"><Calendar size={12} /> {article.publishedAt}</span>
                    <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-accent hover:text-accent-hover">
                      <ExternalLink size={12} /> 原文
                    </a>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/articles" className="text-accent hover:text-accent-hover transition-colors text-sm font-medium">
            查看全部文章 →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
