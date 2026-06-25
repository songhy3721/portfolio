'use client';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import siteData from '@/data/site.json';
import profileData from '@/data/profile.json';
import { Mail, GitBranch, Globe, MessageCircle, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-2 text-accent">联系我</h1>
        <p className="text-text-secondary mb-8">合作洽谈、工具反馈、内容交流 — 期待你的来信</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <GlassCard gradientBorder>
            <h2 className="text-xl font-semibold text-text-primary mb-6">联系方式</h2>
            <div className="space-y-4">
              <a href={`mailto:${profileData.contact.email}`} className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-surface-alt border border-border flex items-center justify-center group-hover:bg-accent-light group-hover:border-accent transition-all">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-text-primary font-medium">邮箱</p>
                  <p className="text-sm">{profileData.contact.email}</p>
                </div>
              </a>
              <div className="flex items-center gap-3 text-text-secondary">
                <div className="w-10 h-10 rounded-xl bg-surface-alt border border-border flex items-center justify-center">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <p className="text-text-primary font-medium">微信</p>
                  <p className="text-sm">{profileData.contact.wechat}</p>
                </div>
              </div>
              <a href={profileData.contact.github} target="_blank" className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-surface-alt border border-border flex items-center justify-center group-hover:bg-accent-light group-hover:border-accent transition-all">
                  <GitBranch size={18} />
                </div>
                <div>
                  <p className="text-text-primary font-medium">GitHub</p>
                  <p className="text-sm">{profileData.contact.github}</p>
                </div>
              </a>
              <div className="flex items-center gap-3 text-text-secondary">
                <div className="w-10 h-10 rounded-xl bg-surface-alt border border-border flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-text-primary font-medium">位置</p>
                  <p className="text-sm">{profileData.contact.location}</p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Message Form */}
          <GlassCard gradientBorder>
            <h2 className="text-xl font-semibold text-text-primary mb-6">发送消息</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-text-secondary text-sm block mb-1">姓名</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="你的名字"
                />
              </div>
              <div>
                <label className="text-text-secondary text-sm block mb-1">邮箱</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-text-secondary text-sm block mb-1">消息</label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent h-32 resize-none"
                  placeholder="你想说的..."
                />
              </div>
              <GradientButton variant="solid" size="md" className="w-full">
                <Send size={16} className="mr-2" /> 发送
              </GradientButton>
            </form>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  );
}
