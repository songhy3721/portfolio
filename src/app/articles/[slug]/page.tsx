import { getArticleBySlug, getAllArticles } from '@/lib/data/articles';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
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
    title: `${article.title} - 一人公司`,
    description: article.summary,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Back */}
      <Link href="/articles" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-6 text-sm">
        <ArrowLeft size={16} /> 返回文章列表
      </Link>

      {/* Header */}
      <div className="space-y-4 mb-8">
        {article.category && (
          <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-medium bg-accent/10 text-accent border border-accent/20">
            {article.category}
          </span>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary leading-tight">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-text-secondary text-sm">
          <span className="flex items-center gap-1"><Calendar size={14} /> {article.publishedAt}</span>
          {article.readTime && (
            <span className="flex items-center gap-1"><Clock size={14} /> {article.readTime} 分钟阅读</span>
          )}
          {article.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded text-xs bg-surface-alt text-text-secondary border border-border">{tag}</span>
          ))}
        </div>
      </div>

      {/* Summary */}
      <GlassCard className="mb-8" gradientBorder>
        <p className="text-text-primary text-base sm:text-lg leading-relaxed">{article.summary}</p>
      </GlassCard>

      {/* Content */}
      {article.content && (
        <div className="prose max-w-none text-text-primary">
          <div className="text-text-secondary leading-relaxed space-y-4 text-sm sm:text-base"
               dangerouslySetInnerHTML={{
                 __html: article.content
                   .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-text-primary mt-6 mb-3">$1</h3>')
                   .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-text-primary mt-8 mb-4">$1</h2>')
                   .replace(/^- (.+)$/gm, '<li class="ml-4 mb-1">$1</li>')
                   .replace(/^\*\*(.+)\*\*$/gm, '<p class="font-bold">$1</p>')
                   .replace(/\n\|\s(.+)\s\|/g, '\n<table class="w-full text-sm"><tr><td class="border px-2 py-1">$1</td></tr></table>')
                   .replace(/\n\n/g, '<br/>')
                   .replace(/\d+\.\s\*\*(.+?)\*\*(.+)/g, '<p class="mb-2"><span class="font-semibold text-accent">$1</span>$2</p>')
                   .replace(/\d+\.\s(.+)/g, '<p class="mb-1 ml-4">$1</p>')
               }}
          />
        </div>
      )}

      {/* Bottom nav */}
      <div className="text-center mt-10 pt-8 border-t border-border">
        <GradientButton href="/articles" variant="outline">
          查看全部文章
        </GradientButton>
      </div>
    </div>
  );
}
