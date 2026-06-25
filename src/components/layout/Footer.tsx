import Link from 'next/link';
import { GitBranch, Mail } from 'lucide-react';
import siteData from '@/data/site.json';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-accent mb-3">{siteData.name}</h3>
            <p className="text-text-secondary text-sm">{siteData.description}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-text-primary font-semibold mb-3">导航</h4>
            <div className="space-y-2">
              {siteData.nav.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="block text-text-secondary hover:text-accent transition-colors text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-text-primary font-semibold mb-3">联系</h4>
            <div className="space-y-3">
              <a href={`mailto:${siteData.social.email}`} className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors text-sm">
                <Mail size={16} /> {siteData.social.email}
              </a>
              <a href={siteData.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors text-sm">
                <GitBranch size={16} /> GitHub
              </a>
              <span className="flex items-center gap-2 text-text-secondary text-sm">
                微信: {siteData.social.wechat}
              </span>
            </div>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-border mt-8 pt-6">
          <p className="text-center text-text-tertiary text-xs">
            © {new Date().getFullYear()} {siteData.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
