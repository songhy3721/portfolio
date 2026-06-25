import type { Metadata } from 'next';
import siteData from '@/data/site.json';

export function generatePageMetadata(
  title: string,
  description: string,
  path: string,
  image?: string
): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteData.url}${path}`,
      siteName: siteData.name,
      images: image ? [{ url: image, width: 1200, height: 630 }] : [{ url: siteData.seo.ogImage }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export const defaultMetadata: Metadata = {
  title: {
    default: siteData.title,
    template: `%s | ${siteData.name}`,
  },
  description: siteData.description,
  keywords: siteData.seo.keywords,
  authors: [{ name: siteData.author.name }],
  creator: siteData.author.name,
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: siteData.url,
    title: siteData.title,
    description: siteData.description,
    siteName: siteData.name,
    images: [{ url: siteData.seo.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteData.title,
    description: siteData.description,
  },
  robots: { index: true, follow: true },
};
