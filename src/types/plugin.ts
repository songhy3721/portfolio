export interface Plugin {
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: 'design' | 'writing' | 'dev' | 'utility';
  tags: string[];
  demoUrl: string;
  sourceUrl: string;
  downloadUrl: string;
  instructions: string;
  features: string[];
  publishedAt: string;
  updatedAt: string;
  views: number;
  featured: boolean;
}

export type PluginCategory = Plugin['category'];

export const PLUGIN_CATEGORY_LABELS: Record<PluginCategory, string> = {
  design: '设计工具',
  writing: '写作工具',
  dev: '开发工具',
  utility: '实用工具',
};
