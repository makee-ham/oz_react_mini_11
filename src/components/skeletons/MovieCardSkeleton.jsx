export default function MovieCardSkeleton() {
  return (
    <div className="flex flex-col w-50 h-84 rounded-lg overflow-hidden bg-(--skeleton-bg-primary) animate-pulse">
      {/* 포스터 영역 */}
      <div className="h-[269.66px] w-full bg-(--skeleton-bg-secondary)" />

      {/* 텍스트 영역 */}
      <div className="flex flex-col justify-between h-[66.34px] p-2 bg-(--skeleton-bg-primary)">
        <div className="h-4 bg-(--skeleton-bg-secondary) rounded w-3/4 mb-2" />
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-(--skeleton-bg-accent)rounded-full" />{" "}
          <div className="w-full h-2 bg-(--skeleton-bg-secondary) rounded" />
          <div className="w-6 h-3 bg-(--skeleton-bg-secondary) rounded" />
        </div>
      </div>
    </div>
  );
}
