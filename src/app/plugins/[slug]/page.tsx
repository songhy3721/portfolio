import { getPluginBySlug, getAllPlugins } from '@/lib/data/plugins';
import { notFound } from 'next/navigation';
import PluginDetailClient from './PluginDetailClient';

export function generateStaticParams() {
  return getAllPlugins().map(p => ({ slug: p.slug }));
}

export default async function PluginDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plugin = getPluginBySlug(slug);
  if (!plugin) notFound();
  return <PluginDetailClient plugin={plugin} />;
}
