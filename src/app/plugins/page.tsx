'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import GradientBadge from '@/components/ui/GradientBadge';
import TabFilter from '@/components/ui/TabFilter';
import { getAllPlugins } from '@/lib/data/plugins';
import { PluginCategory, PLUGIN_CATEGORY_LABELS } from '@/types/plugin';
import { Eye, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const categoryFilters: { key: PluginCategory | 'all'; label: string }[] = [
  { key: 'all', label: '全部' },
  ...Object.entries(PLUGIN_CATEGORY_LABELS).map(([key, label]) => ({
    key: key as PluginCategory,
    label,
  })),
];

export default function PluginsPage() {
  const [activeCategory, setActiveCategory] = useState<PluginCategory | 'all'>('all');

  let plugins = getAllPlugins();
  if (activeCategory !== 'all') {
    plugins = plugins.filter((p) => p.category === activeCategory);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-2 text-accent">创意工具</h1>
        <p className="text-text-secondary mb-8">自制小工具，在线体验</p>

        {/* Category Filter */}
        <div className="mb-8">
          <TabFilter items={categoryFilters} activeKey={activeCategory} onChange={setActiveCategory} allKey="all" />
        </div>

        {/* Plugins Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plugins.map((plugin, i) => (
            <motion.div
              key={plugin.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard href={`/plugins/${plugin.slug}`} gradientBorder>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{plugin.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">{plugin.title}</h3>
                      <GradientBadge>{PLUGIN_CATEGORY_LABELS[plugin.category]}</GradientBadge>
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm line-clamp-2">{plugin.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {plugin.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded text-xs bg-surface-alt text-text-secondary border border-border">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-text-tertiary"><Eye size={12} /> {plugin.views.toLocaleString()}</span>
                    <Link href={`/plugins/${plugin.slug}`} className="flex items-center gap-1 text-accent hover:text-accent-hover transition-colors">
                      <ExternalLink size={12} /> 在线体验
                    </Link>
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
