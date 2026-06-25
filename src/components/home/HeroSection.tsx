'use client';

import { motion } from 'framer-motion';
import GradientText from '@/components/ui/GradientText';
import GradientButton from '@/components/ui/GradientButton';

export default function HeroSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 tracking-tight">
            <GradientText>创意工坊</GradientText>
          </h1>
          <p className="text-xl sm:text-2xl text-text-secondary mb-2 font-medium">
            用代码创造，用设计表达
          </p>
          <p className="text-base text-text-tertiary max-w-2xl mx-auto mb-10">
            汇集签约作品、自制工具与深度文章，探索创意与技术的交汇点
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <GradientButton href="/works" size="lg" variant="solid">
            浏览作品
          </GradientButton>
          <GradientButton href="/plugins" size="lg" variant="outline">
            体验工具
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
}
