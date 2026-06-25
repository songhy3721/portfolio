import { getArticleBySlug, getAllArticles } from '@/lib/data/articles';
import GlassCard from '@/components/ui/GlassCard';
import GradientText from '@/components/ui/GradientText';
import GradientButton from '@/components/ui/GradientButton';
import { Calendar, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: '文章不存在' };
  return {
    title: article.title,
    description: article.description,
    openGraph: { title: article.title, description: article.description },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back */}
      <Link href="/articles" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-6 text-sm">
        <ArrowLeft size={16} /> 返回文章列表
      </Link>

      {/* Cover */}
      <div className="w-full h-48 rounded-2xl bg-accent-light mb-8 flex items-center justify-center">
        <span className="text-4xl text-accent/30">📖</span>
      </div>

      {/* Header */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="wechat-badge">公众号</span>
          <span className="text-text-secondary text-xs">{article.sourceName}</span>
        </div>
        <h1 className="text-3xl font-bold text-text-primary">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-text-secondary text-sm">
          <span className="flex items-center gap-1"><Calendar size={14} /> {article.publishedAt}</span>
          <span>{article.views.toLocaleString()} 次阅读</span>
          {article.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 rounded-lg text-xs bg-surface-alt text-text-secondary border border-border">{tag}</span>
          ))}
        </div>
      </div>

      {/* Content Preview */}
      <GlassCard className="mb-8" gradientBorder>
        <div className="prose max-w-none">
          <p className="text-text-primary text-lg leading-relaxed">{article.contentPreview}</p>
          {article.content ? (
            <div className="mt-6 text-text-secondary" dangerouslySetInnerHTML={{ __html: article.content }} />
          ) : (
            <p className="mt-6 text-text-secondary italic">
              完整内容请前往微信公众号原文阅读
            </p>
          )}
        </div>
      </GlassCard>

      {/* External Link CTA */}
      <div className="text-center mt-8">
        <GradientButton href={article.sourceUrl} variant="solid">
          <ExternalLink size={16} className="mr-2" /> 阅读原文
        </GradientButton>
      </div>
    </div>
  );
}
