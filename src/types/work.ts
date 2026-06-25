export interface Work {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  cover: string;
  gallery: string[];
  type: 'brand' | 'app' | 'creative' | 'tool';
  tags: string[];
  partner: string;
  partnerLink: string;
  publishedAt: string;
  views: number;
  featured: boolean;
}

export type WorkType = Work['type'];

export interface WorkFilter {
  type?: WorkType;
  tag?: string;
  sort?: 'time' | 'views' | 'featured';
}

export const WORK_TYPE_LABELS: Record<WorkType, string> = {
  brand: '品牌设计',
  app: 'App设计',
  creative: '创意作品',
  tool: '开发工具',
};
