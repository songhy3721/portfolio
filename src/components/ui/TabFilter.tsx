interface TabFilterProps<T extends string> {
  items: { key: T; label: string }[];
  activeKey: T;
  onChange: (key: T) => void;
  allKey?: T;
  allLabel?: string;
}

export default function TabFilter<T extends string>({
  items,
  activeKey,
  onChange,
  allKey,
  allLabel = '全部',
}: TabFilterProps<T>) {
  const allItems = allKey ? [{ key: allKey, label: allLabel }, ...items] : items;

  return (
    <div className="flex flex-wrap gap-2">
      {allItems.map((item) => (
        <button
          key={item.key}
          onClick={() => onChange(item.key)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            activeKey === item.key
              ? 'bg-accent text-white shadow-sm'
              : 'bg-surface text-text-secondary hover:bg-surface-alt hover:text-text-primary border border-border'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
