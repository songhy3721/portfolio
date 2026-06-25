interface AccentTextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
}

export default function GradientText({
  children,
  as = 'span',
  className = '',
}: AccentTextProps) {
  const Tag = as;
  return (
    <Tag className={`gradient-text ${className}`}>
      {children}
    </Tag>
  );
}
