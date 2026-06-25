'use client';
import Link from 'next/link';
import GradientButton from '@/components/ui/GradientButton';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-accent">404</h1>
        <h2 className="text-2xl font-semibold text-text-primary">页面未找到</h2>
        <p className="text-text-secondary max-w-md mx-auto">
          你访问的页面可能已被移除、名称变更，或暂时不可用
        </p>
        <GradientButton href="/" variant="solid">
          返回首页
        </GradientButton>
      </div>
    </div>
  );
}
