import { Work, WorkType } from '@/types/work';
import auroraBrand from '@/data/works/aurora-brand.json';
import nebulaApp from '@/data/works/nebula-app.json';
import flowMotion from '@/data/works/flow-motion.json';
import dataVizKit from '@/data/works/data-viz-kit.json';

const workFiles: Record<string, Work> = {
  'aurora-brand': auroraBrand as Work,
  'nebula-app': nebulaApp as Work,
  'flow-motion': flowMotion as Work,
  'data-viz-kit': dataVizKit as Work,
};

export function getAllWorks(): Work[] {
  return Object.values(workFiles).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeaturedWorks(): Work[] {
  return getAllWorks().filter((w) => w.featured);
}

export function getWorkBySlug(slug: string): Work | undefined {
  return workFiles[slug];
}

export function getWorksByType(type: WorkType): Work[] {
  return getAllWorks().filter((w) => w.type === type);
}

export function getAllWorkTags(): string[] {
  const tags = new Set<string>();
  getAllWorks().forEach((w) => w.tags.forEach((t) => tags.add(t)));
  return Array.from(tags);
}

export function sortWorks(works: Work[], sort: 'time' | 'views' | 'featured'): Work[] {
  const sorted = [...works];
  switch (sort) {
    case 'time':
      return sorted.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    case 'views':
      return sorted.sort((a, b) => b.views - a.views);
    case 'featured':
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    default:
      return sorted;
  }
}
