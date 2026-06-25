'use client';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import GradientText from '@/components/ui/GradientText';
import GradientButton from '@/components/ui/GradientButton';
import profileData from '@/data/profile.json';
import { MapPin, Mail, GitBranch, Globe, MessageCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-8 text-accent">关于我</h1>

        {/* Profile Card */}
        <GlassCard className="mb-8" gradientBorder>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-accent-light flex items-center justify-center text-4xl shrink-0">
              👨‍💻
            </div>
            <div className="space-y-3 text-center md:text-left flex-1">
              <h2 className="text-2xl font-bold text-text-primary">{profileData.name}</h2>
              <p className="text-accent font-medium">{profileData.tagline}</p>
              <p className="text-text-secondary leading-relaxed">{profileData.longBio}</p>
              <div className="flex items-center gap-2 text-text-secondary text-sm justify-center md:justify-start">
                <MapPin size={14} /> {profileData.contact.location}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Skills */}
        <GlassCard className="mb-8" gradientBorder>
          <h2 className="text-xl font-semibold text-text-primary mb-6">技能专长</h2>
          <div className="space-y-4">
            {profileData.skills.map((skill) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-text-primary">{skill.name}</span>
                  <span className="text-text-secondary">{skill.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-surface-alt border border-border overflow-hidden">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Timeline */}
        <GlassCard className="mb-8" gradientBorder>
          <h2 className="text-xl font-semibold text-text-primary mb-6">经历</h2>
          <div className="space-y-6">
            {profileData.experience.map((exp, i) => (
              <div key={i} className="relative pl-8">
                {/* Dot */}
                <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-accent" />
                {/* Line */}
                {i < profileData.experience.length - 1 && (
                  <div className="absolute left-[5px] top-4 w-0.5 h-full bg-border" />
                )}
                <div>
                  <span className="text-accent text-sm font-medium">{exp.year}</span>
                  <h3 className="text-text-primary font-semibold mt-1">{exp.title}</h3>
                  <p className="text-text-secondary text-sm mt-1">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Social Links */}
        <GlassCard className="text-center">
          <h2 className="text-xl font-semibold text-text-primary mb-4">联系方式</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={`mailto:${profileData.contact.email}`} className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors">
              <Mail size={16} /> {profileData.contact.email}
            </a>
            <a href={profileData.contact.github} target="_blank" className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors">
              <GitBranch size={16} /> GitHub
            </a>
            <a href={profileData.contact.twitter} target="_blank" className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors">
              <Globe size={16} /> Twitter
            </a>
            <span className="flex items-center gap-2 text-text-secondary">
              <MessageCircle size={16} /> 微信: {profileData.contact.wechat}
            </span>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
