'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import GradientBadge from '@/components/ui/GradientBadge';
import { getFeaturedWorks } from '@/lib/data/works';
import { WORK_TYPE_LABELS } from '@/types/work';
import { Eye, Calendar } from 'lucide-react';

export default function FeaturedWorks() {
  const works = getFeaturedWorks();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-2 text-accent">精选作品</h2>
        <p className="text-text-secondary mb-8">签约品牌与创意项目</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work, i) => (
            <motion.div
              key={work.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard href={`/works/${work.slug}`} gradientBorder>
                {/* Cover placeholder */}
                <div className="w-full h-48 rounded-xl bg-accent-light mb-4 flex items-center justify-center">
                  <span className="text-4xl text-accent/40">🎨</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <GradientBadge>{WORK_TYPE_LABELS[work.type]}</GradientBadge>
                    {work.featured && <GradientBadge className="bg-accent/10 text-accent">精选</GradientBadge>}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary line-clamp-1">{work.title}</h3>
                  <p className="text-text-secondary text-sm line-clamp-2">{work.description}</p>
                  <div className="flex items-center gap-4 text-text-tertiary text-xs">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {work.publishedAt}</span>
                    <span className="flex items-center gap-1"><Eye size={12} /> {work.views.toLocaleString()}</span>
                  </div>
                  <p className="text-accent text-xs font-medium">合作方: {work.partner}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/works" className="text-accent hover:text-accent-hover transition-colors text-sm font-medium">
            查看全部作品 →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
