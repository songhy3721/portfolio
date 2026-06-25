'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface GradientButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline';
  className?: string;
}

export default function GradientButton({
  children,
  href,
  onClick,
  size = 'md',
  variant = 'solid',
  className = '',
}: GradientButtonProps) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variants = {
    solid: 'bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow-md',
    outline: 'border border-border text-text-primary hover:bg-accent-light hover:border-accent hover:text-accent',
  };

  const baseClass = `inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 ${sizes[size]} ${variants[variant]} ${className}`;

  const MotionComponent = href ? motion.create(Link) : motion.button;

  return (
    <MotionComponent
      href={href || ''}
      onClick={onClick}
      className={baseClass}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </MotionComponent>
  );
}
