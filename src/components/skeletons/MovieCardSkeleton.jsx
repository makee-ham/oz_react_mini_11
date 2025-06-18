export default function MovieCardSkeleton() {
  return (
    <div className="flex flex-col w-50 h-84 rounded-lg overflow-hidden bg-neutral-800 animate-pulse">
      {/* 포스터 영역 */}
      <div className="h-[269.66px] w-full bg-neutral-700" />

      {/* 텍스트 영역 */}
      <div className="flex flex-col justify-between h-[66.34px] p-2 bg-neutral-800">
        <div className="h-4 bg-neutral-700 rounded w-3/4 mb-2" />
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-neutral-600 rounded-full" />{" "}
          <div className="w-full h-2 bg-neutral-700 rounded" />
          <div className="w-6 h-3 bg-neutral-700 rounded" />
        </div>
      </div>
    </div>
  );
}
