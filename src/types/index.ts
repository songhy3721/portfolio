export interface Article {
  slug: string;
  title: string;
  summary: string;
  content?: string;
  category?: string;
  tags: string[];
  author?: string;
  publishedAt: string;
  coverImage?: string;
  sourceName: string;
  sourceUrl: string;
  featured?: boolean;
  readTime?: number;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
    tagline: string;
  };
  colors: {
    gradientPrimary: string;
    gradientSecondary: string;
    gradientTertiary: string;
    darkBase: string;
    darkMid: string;
    darkTop: string;
    glassBg: string;
    glassBorder: string;
    textPrimary: string;
    textSecondary: string;
  };
  seo: {
    keywords: string[];
    ogImage: string;
  };
  social: {
    wechat: string;
    github: string;
    twitter?: string;
    email: string;
  };
  nav: { label: string; path: string }[];
}

export interface Profile {
  name: string;
  avatar: string;
  tagline: string;
  bio: string;
  longBio: string;
  skills: { name: string; level: number; color: string }[];
  experience: { year: string; title: string; desc: string }[];
  contact: {
    email: string;
    wechat: string;
    github: string;
    twitter?: string;
    location: string;
  };
}
