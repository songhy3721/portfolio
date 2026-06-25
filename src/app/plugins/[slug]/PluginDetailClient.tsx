'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import GradientBadge from '@/components/ui/GradientBadge';
import GradientButton from '@/components/ui/GradientButton';
import { PLUGIN_CATEGORY_LABELS } from '@/types/plugin';
import type { Plugin } from '@/types/plugin';
import { Eye, ExternalLink, ArrowLeft, Maximize2, RotateCcw, Download } from 'lucide-react';
import Link from 'next/link';

interface Props {
  plugin: Plugin;
}

export default function PluginDetailClient({ plugin }: Props) {
  const [iframeFullscreen, setIframeFullscreen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back */}
      <Link href="/plugins" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-6 text-sm">
        <ArrowLeft size={16} /> 返回工具列表
      </Link>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 mb-8">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{plugin.icon}</span>
          <div>
            <h1 className="text-3xl font-bold text-text-primary">{plugin.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <GradientBadge>{PLUGIN_CATEGORY_LABELS[plugin.category]}</GradientBadge>
              {plugin.featured && <GradientBadge>精选</GradientBadge>}
            </div>
          </div>
        </div>
        <p className="text-text-secondary">{plugin.description}</p>
        <div className="flex flex-wrap items-center gap-4 text-text-secondary text-sm">
          <span className="flex items-center gap-1"><Eye size={14} /> {plugin.views.toLocaleString()} 次浏览</span>
          <a href={plugin.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-accent hover:text-accent-hover">
            <ExternalLink size={14} /> 源代码
          </a>
        </div>
      </motion.div>

      {/* Sandbox */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="glass rounded-2xl overflow-hidden mb-8">
          {/* Controls bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
            <span className="text-text-secondary text-sm font-medium">在线体验</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const iframe = document.querySelector('#plugin-sandbox') as HTMLIFrameElement;
                  if (iframe) iframe.src = plugin.demoUrl;
                }}
                className="p-2 rounded-lg bg-surface-alt text-text-secondary hover:text-accent transition-colors border border-border"
                title="重置"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => setIframeFullscreen(!iframeFullscreen)}
                className="p-2 rounded-lg bg-surface-alt text-text-secondary hover:text-accent transition-colors border border-border"
                title="全屏"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
          {/* iframe */}
          <div className={`transition-all duration-300 ${iframeFullscreen ? 'fixed inset-0 z-50' : 'relative'}`}>
            <iframe
              id="plugin-sandbox"
              src={plugin.demoUrl}
              sandbox="allow-scripts allow-same-origin"
              className={`w-full border-0 ${iframeFullscreen ? 'h-screen' : 'h-[500px]'}`}
              title={`${plugin.title} - 在线体验`}
            />
          </div>
        </div>
      </motion.div>

      {/* Instructions */}
      <GlassCard className="mb-8" gradientBorder>
        <h2 className="text-xl font-semibold text-text-primary mb-4">使用说明</h2>
        <div className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
          {plugin.instructions}
        </div>
      </GlassCard>

      {/* Features */}
      <GlassCard className="mb-8" gradientBorder>
        <h2 className="text-xl font-semibold text-text-primary mb-4">功能特点</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {plugin.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-text-secondary text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              {feature}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Download CTA */}
      <div className="text-center mt-8 flex flex-wrap gap-4 justify-center">
        <GradientButton href={plugin.downloadUrl} variant="solid">
          <Download size={16} className="mr-2" /> 下载工具
        </GradientButton>
        <GradientButton href={plugin.sourceUrl} variant="outline">
          <ExternalLink size={16} className="mr-2" /> 查看源码
        </GradientButton>
      </div>
    </div>
  );
}
