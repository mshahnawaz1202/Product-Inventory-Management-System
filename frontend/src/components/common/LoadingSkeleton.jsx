export function TableSkeleton({ rows = 5, cols = 5 }) {
  return (
    <div className="w-full space-y-3">
      {Array.from({ length: rows }).map((_, rIdx) => (
        <div
          key={rIdx}
          className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border animate-pulse"
        >
          {Array.from({ length: cols }).map((_, cIdx) => (
            <div
              key={cIdx}
              className="h-4 bg-muted rounded-md flex-1"
              style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
/**--------------------------------------------------------------- */

export function CardSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="p-5 rounded-2xl bg-card border border-border space-y-3 animate-pulse"
        >
          <div className="flex justify-between items-center">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="w-10 h-10 bg-muted rounded-xl" />
          </div>
          <div className="h-8 w-32 bg-muted rounded-lg" />
          <div className="h-3 w-20 bg-muted rounded" />
        </div>
      ))}
    </div>
  );
}
/**--------------------------------------------------------------- */
