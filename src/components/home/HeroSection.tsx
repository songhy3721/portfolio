'use client';

import { motion } from 'framer-motion';
import GradientText from '@/components/ui/GradientText';
import GradientButton from '@/components/ui/GradientButton';
import { TrendingUp, Lightbulb } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="py-14 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/8 border border-accent/15 text-accent text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Lightbulb size={14} />
            独立创业者的资讯与工具指南
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 tracking-tight leading-tight">
            <GradientText>一人公司</GradientText>
          </h1>
          <p className="text-base sm:text-xl text-text-secondary mb-1 font-medium">
            一个人，也可以是一家公司
          </p>
          <p className="text-sm sm:text-base text-text-tertiary max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
            AI赋能个体 · 工具替代团队 · 全球化的个人商业时代已经到来
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <GradientButton href="/guide" size="lg" variant="solid">
            开始探索
          </GradientButton>
          <GradientButton href="/trends" size="lg" variant="outline">
            <TrendingUp size={16} className="mr-1" />
            行业趋势
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
}
