import { Work } from '@/types/work';
import { Article } from '@/types';
import siteData from '@/data/site.json';

export function generateWorkStructuredData(work: Work) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: work.title,
    description: work.description,
    image: work.cover,
    datePublished: work.publishedAt,
    author: {
      '@type': 'Person',
      name: siteData.author.name,
    },
    keywords: work.tags.join(','),
    url: `${siteData.url}/works/${work.slug}`,
  };
}

export function generateArticleStructuredData(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    image: article.coverImage,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Person',
      name: siteData.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: article.sourceName,
    },
    url: article.sourceUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteData.url}/articles/${article.slug}`,
    },
  };
}

export function generateSiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteData.name,
    description: siteData.description,
    url: siteData.url,
    author: {
      '@type': 'Person',
      name: siteData.author.name,
    },
  };
}
