'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  hover?: boolean;
  gradientBorder?: boolean;
}

export default function GlassCard({
  children,
  href,
  className = '',
  hover = true,
  gradientBorder = false,
}: GlassCardProps) {
  const baseClassName = `${gradientBorder ? 'gradient-border' : 'glass'} ${hover ? 'hover-glow' : ''} p-6 ${className}`;

  if (href) {
    return (
      <motion.div
        whileHover={hover ? { y: -2 } : undefined}
        transition={{ duration: 0.2 }}
      >
        <Link href={href} className={baseClassName}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
      className={baseClassName}
    >
      {children}
    </motion.div>
  );
}
