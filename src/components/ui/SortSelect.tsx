import { ChevronDown } from 'lucide-react';

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { key: string; label: string }[];
  className?: string;
}

export default function SortSelect({
  value,
  onChange,
  options,
  className = '',
}: SortSelectProps) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-surface border border-border px-4 py-2 pr-8 rounded-xl text-sm text-text-primary cursor-pointer hover:border-accent transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
      >
        {options.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
    </div>
  );
}
