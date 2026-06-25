'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import GradientBadge from '@/components/ui/GradientBadge';
import { getFeaturedPlugins } from '@/lib/data/plugins';
import { PLUGIN_CATEGORY_LABELS } from '@/types/plugin';
import { Eye, ExternalLink } from 'lucide-react';

export default function FeaturedPlugins() {
  const plugins = getFeaturedPlugins();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2 text-accent">自制工具</h2>
        <p className="text-text-secondary text-sm sm:text-base mb-5 sm:mb-8">在线体验创意小工具</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {plugins.map((plugin, i) => (
            <motion.div
              key={plugin.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard href={`/plugins/${plugin.slug}`} gradientBorder>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{plugin.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">{plugin.title}</h3>
                      <GradientBadge>{PLUGIN_CATEGORY_LABELS[plugin.category]}</GradientBadge>
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm line-clamp-2">{plugin.description}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1 text-text-tertiary"><Eye size={12} /> {plugin.views.toLocaleString()}</span>
                    <a href={plugin.demoUrl} className="flex items-center gap-1 text-accent hover:text-accent-hover"><ExternalLink size={12} /> 在线体验</a>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/plugins" className="text-accent hover:text-accent-hover transition-colors text-sm font-medium">
            查看全部工具 →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
