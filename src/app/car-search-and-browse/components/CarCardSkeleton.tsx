export default function CarCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 bg-muted" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-3 w-20 bg-muted rounded" />
          </div>
          <div className="h-6 w-16 bg-muted rounded" />
        </div>
        <div className="h-3 w-24 bg-muted rounded" />
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 4 })?.map((_, i) => (
            <div key={i} className="h-3 w-full bg-muted rounded" />
          ))}
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: 3 })?.map((_, i) => (
            <div key={i} className="h-5 w-16 bg-muted rounded-full" />
          ))}
        </div>
        <div className="flex gap-2 pt-1">
          <div className="flex-1 h-10 bg-muted rounded-lg" />
          <div className="w-10 h-10 bg-muted rounded-lg" />
        </div>
      </div>
    </div>
  );
}