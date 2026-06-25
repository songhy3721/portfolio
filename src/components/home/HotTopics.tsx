'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, LineChart, Wrench, Star, TrendingUp } from 'lucide-react';

const TOPICS = [
  {
    label: '创业指南',
    path: '/guide',
    icon: BookOpen,
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    iconBg: 'bg-indigo-100 text-indigo-600',
    desc: '从0到1的一人公司启动方法论与避坑指南',
  },
  {
    label: '商业模式',
    path: '/business-model',
    icon: LineChart,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconBg: 'bg-emerald-100 text-emerald-600',
    desc: 'SaaS、知识付费、DTC等盈利模式深度拆解',
  },
  {
    label: '工具资源',
    path: '/tools',
    icon: Wrench,
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    iconBg: 'bg-purple-100 text-purple-600',
    desc: 'AI工具、自动化、效率应用推荐与实测',
  },
  {
    label: '成功案例',
    path: '/cases',
    icon: Star,
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    iconBg: 'bg-amber-100 text-amber-600',
    desc: '全球一人公司创业者的真实故事与经验',
  },
  {
    label: '行业趋势',
    path: '/trends',
    icon: TrendingUp,
    color: 'bg-rose-50 text-rose-700 border-rose-200',
    iconBg: 'bg-rose-100 text-rose-600',
    desc: 'AI、数字游民、创作者经济等前沿趋势',
  },
];

export default function HotTopics() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-xl sm:text-3xl font-bold text-accent mb-1">热门主题</h2>
        <p className="text-text-secondary text-sm mb-5 sm:mb-7">探索一人公司的五大核心板块</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {TOPICS.map((topic, i) => {
            const Icon = topic.icon;
            return (
              <motion.div
                key={topic.path}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={topic.path}
                  className={`block p-4 sm:p-5 rounded-xl border ${topic.color} hover:shadow-md transition-all duration-200 group`}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${topic.iconBg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold mb-1">{topic.label}</h3>
                  <p className="text-text-tertiary text-[11px] sm:text-xs leading-relaxed">{topic.desc}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
