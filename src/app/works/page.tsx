'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import GradientBadge from '@/components/ui/GradientBadge';
import TabFilter from '@/components/ui/TabFilter';
import SortSelect from '@/components/ui/SortSelect';
import { getAllWorks, sortWorks } from '@/lib/data/works';
import { Work, WorkType, WORK_TYPE_LABELS } from '@/types/work';
import { Eye, Calendar, Users } from 'lucide-react';

const typeFilters: { key: WorkType | 'all'; label: string }[] = [
  { key: 'all', label: '全部' },
  ...Object.entries(WORK_TYPE_LABELS).map(([key, label]) => ({
    key: key as WorkType,
    label,
  })),
];

const sortOptions = [
  { key: 'time', label: '最新发布' },
  { key: 'views', label: '最多浏览' },
  { key: 'featured', label: '精选优先' },
];

export default function WorksPage() {
  const [activeType, setActiveType] = useState<WorkType | 'all'>('all');
  const [sortBy, setSortBy] = useState('time');

  let works = getAllWorks();
  if (activeType !== 'all') {
    works = works.filter((w) => w.type === activeType);
  }
  works = sortWorks(works, sortBy as 'time' | 'views' | 'featured');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-2 text-accent">作品集</h1>
        <p className="text-text-secondary mb-8">签约品牌设计与创意项目</p>

        {/* Filter & Sort */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <TabFilter items={typeFilters} activeKey={activeType} onChange={setActiveType} allKey="all" />
          <SortSelect value={sortBy} onChange={setSortBy} options={sortOptions} />
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work, i) => (
            <motion.div
              key={work.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard href={`/works/${work.slug}`} gradientBorder>
                {/* Cover */}
                <div className="w-full h-48 rounded-xl bg-accent-light mb-4 flex items-center justify-center">
                  <span className="text-4xl text-accent/30">🎨</span>
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
                    <span className="flex items-center gap-1"><Users size={12} /> {work.partner}</span>
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
