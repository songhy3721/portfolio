'use client';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import GradientText from '@/components/ui/GradientText';
import GradientButton from '@/components/ui/GradientButton';
import siteData from '@/data/site.json';
import { Mail, GitBranch } from 'lucide-react';

export default function ContactCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <GlassCard className="text-center py-8 sm:py-12 px-4 sm:px-8" gradientBorder>
          <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-accent">加入一人公司社区</h2>
          <p className="text-text-secondary mb-6">
            分享你的创业故事，交流工具与经验，我们一起成长
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <GradientButton href={`mailto:${siteData.social.email}`} variant="solid" size="md">
              <Mail size={16} className="mr-2" /> 联系我
            </GradientButton>
            <GradientButton href={siteData.social.github} variant="outline" size="md">
              <GitBranch size={16} className="mr-2" /> GitHub
            </GradientButton>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
