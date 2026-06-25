'use client';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import GradientText from '@/components/ui/GradientText';
import GradientButton from '@/components/ui/GradientButton';
import profileData from '@/data/profile.json';
import { MapPin } from 'lucide-react';

export default function AboutPreview() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <GlassCard className="max-w-3xl mx-auto" gradientBorder>
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-accent-light flex items-center justify-center text-3xl shrink-0">
              👨‍💻
            </div>
            <div className="space-y-3 text-center md:text-left">
              <h3 className="text-xl font-bold">
                <GradientText>{profileData.name}</GradientText>
              </h3>
              <p className="text-accent text-sm font-medium">{profileData.tagline}</p>
              <p className="text-text-secondary text-sm">{profileData.bio}</p>
              <div className="flex items-center gap-2 text-text-secondary text-xs justify-center md:justify-start">
                <MapPin size={14} /> {profileData.contact.location}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {profileData.skills.map((skill) => (
              <span key={skill.name} className="px-3 py-1 rounded-full text-xs bg-surface-alt text-text-secondary border border-border">
                {skill.name}
              </span>
            ))}
          </div>

          <div className="mt-6 text-center">
            <GradientButton href="/about" variant="outline" size="sm">
              了解更多
            </GradientButton>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
