interface GradientBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function GradientBadge({ children, className = '' }: GradientBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-light text-accent ${className}`}
    >
      {children}
    </span>
  );
}
