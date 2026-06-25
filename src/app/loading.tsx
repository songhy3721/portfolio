export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="w-12 h-12 rounded-full bg-accent animate-[pulse_1.5s_ease-in-out_infinite] mx-auto" />
        <p className="text-text-secondary animate-pulse">加载中...</p>
      </div>
    </div>
  );
}
