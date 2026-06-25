import { getWorkBySlug, getAllWorks } from '@/lib/data/works';
import { WORK_TYPE_LABELS } from '@/types/work';
import GlassCard from '@/components/ui/GlassCard';
import GradientBadge from '@/components/ui/GradientBadge';
import GradientButton from '@/components/ui/GradientButton';
import GradientText from '@/components/ui/GradientText';
import { Calendar, Eye, Users, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllWorks().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) return { title: '作品不存在' };
  return {
    title: work.title,
    description: work.description,
    openGraph: { title: work.title, description: work.description },
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <Link href="/works" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-6 text-sm">
        <ArrowLeft size={16} /> 返回作品列表
      </Link>

      {/* Cover */}
      <div className="w-full h-64 md:h-80 rounded-2xl bg-accent-light mb-8 flex items-center justify-center">
        <span className="text-6xl text-accent/30">🎨</span>
      </div>

      {/* Header */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-2">
          <GradientBadge>{WORK_TYPE_LABELS[work.type]}</GradientBadge>
          {work.featured && <GradientBadge>精选</GradientBadge>}
          {work.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 rounded-lg text-xs bg-surface-alt text-text-secondary border border-border">{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
          {work.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-text-secondary text-sm">
          <span className="flex items-center gap-1"><Calendar size={14} /> {work.publishedAt}</span>
          <span className="flex items-center gap-1"><Eye size={14} /> {work.views.toLocaleString()} 次浏览</span>
          <span className="flex items-center gap-1"><Users size={14} /> 合作方: {work.partner}</span>
          <a href={work.partnerLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-accent hover:text-accent-hover">
            <ExternalLink size={14} /> {work.partner}
          </a>
        </div>
      </div>

      {/* Description */}
      <GlassCard className="mb-8" gradientBorder>
        <p className="text-text-primary text-lg leading-relaxed">{work.longDescription}</p>
      </GlassCard>

      {/* Gallery */}
      {work.gallery && work.gallery.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4">项目画廊</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {work.gallery.map((img, i) => (
              <div key={i} className="h-48 rounded-xl bg-accent-light flex items-center justify-center">
                <span className="text-2xl text-accent/30">📷 {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="text-center mt-8">
        <GradientButton href="/works" variant="outline">
          浏览更多作品
        </GradientButton>
      </div>
    </div>
  );
}
