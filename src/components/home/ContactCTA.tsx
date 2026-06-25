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
          <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-accent">与我联系</h2>
          <p className="text-text-secondary mb-6">
            合作洽谈、工具反馈、内容交流 — 期待你的来信
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <GradientButton href="/contact" variant="solid" size="md">
              <Mail size={16} className="mr-2" /> 发送邮件
            </GradientButton>
            <GradientButton href={`https://github.com/${siteData.social.github.split('/').pop()}`} variant="outline" size="md">
              <GitBranch size={16} className="mr-2" /> GitHub
            </GradientButton>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
