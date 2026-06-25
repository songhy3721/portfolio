import { Article } from '@/types';
import gradientGuide from '@/data/articles/gradient-design-guide.json';
import creativeTools from '@/data/articles/creative-tools-dev.json';
import darkModeUx from '@/data/articles/dark-mode-ux.json';
import spacexCursor from '@/data/articles/spacex-cursor-600b-acquisition.json';
import waic2026 from '@/data/articles/waic-2026-300-ai-products-launch.json';
import siliconflow from '@/data/articles/siliconflow-2b-token-factory.json';
import carChips from '@/data/articles/car-makers-self-designed-chips-2026.json';
import healthTuning from '@/data/articles/health-tuning-2026-consumer-shift.json';
import claudeDesign from '@/data/articles/claude-design-major-update-designer-developer-merge.json';
import aiImageTools from '@/data/articles/ai-image-generation-tools-comparison-2026.json';
import sunoV55 from '@/data/articles/suno-v5-5-release-grade-music-workflow.json';
import googleFlow from '@/data/articles/google-flow-visual-tool-generator.json';
import designToolsWar from '@/data/articles/ardot-claude-design-figma-ai-2026-design-tools-war.json';

const articleFiles: Record<string, Article> = {
  'gradient-design-guide': gradientGuide as Article,
  'creative-tools-dev': creativeTools as Article,
  'dark-mode-ux': darkModeUx as Article,
  'spacex-cursor-600b-acquisition': spacexCursor as Article,
  'waic-2026-300-ai-products-launch': waic2026 as Article,
  'siliconflow-2b-token-factory': siliconflow as Article,
  'car-makers-self-designed-chips-2026': carChips as Article,
  'health-tuning-2026-consumer-shift': healthTuning as Article,
  'claude-design-major-update-designer-developer-merge': claudeDesign as Article,
  'ai-image-generation-tools-comparison-2026': aiImageTools as Article,
  'suno-v5-5-release-grade-music-workflow': sunoV55 as Article,
  'google-flow-visual-tool-generator': googleFlow as Article,
  'ardot-claude-design-figma-ai-2026-design-tools-war': designToolsWar as Article,
};

export function getAllArticles(): Article[] {
  return Object.values(articleFiles).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getRecentArticles(limit: number = 3): Article[] {
  return getAllArticles().slice(0, limit);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articleFiles[slug];
}
