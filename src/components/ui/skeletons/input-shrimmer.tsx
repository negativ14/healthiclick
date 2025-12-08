export function DetailedShimmerInput() {
  return (
    <div className="w-full rounded-lg border border-input bg-background p-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
        </div>

        <div className="h-10 w-10 bg-muted rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
