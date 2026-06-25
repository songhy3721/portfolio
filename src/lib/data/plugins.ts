import { Plugin, PluginCategory } from '@/types/plugin';
import gradientGenerator from '@/data/plugins/gradient-generator.json';
import colorPicker from '@/data/plugins/color-picker.json';
import markdownEditor from '@/data/plugins/markdown-editor.json';

const pluginFiles: Record<string, Plugin> = {
  'gradient-generator': gradientGenerator as Plugin,
  'color-picker': colorPicker as Plugin,
  'markdown-editor': markdownEditor as Plugin,
};

export function getAllPlugins(): Plugin[] {
  return Object.values(pluginFiles).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeaturedPlugins(): Plugin[] {
  return getAllPlugins().filter((p) => p.featured);
}

export function getPluginBySlug(slug: string): Plugin | undefined {
  return pluginFiles[slug];
}

export function getPluginsByCategory(category: PluginCategory): Plugin[] {
  return getAllPlugins().filter((p) => p.category === category);
}
