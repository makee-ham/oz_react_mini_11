export default function MovieDetailSkeleton() {
  return (
    <section className="flex flex-col md:flex-row items-center md:items-start gap-10 w-full max-w-6xl mx-auto mt-24 px-4 md:px-8 animate-pulse">
      {/* 포스터 자리 */}
      <div className="w-[70%] md:w-[300px] aspect-[2/3] bg-(--skeleton-bg-secondary) rounded shadow-lg" />

      {/* 텍스트 자리 */}
      <div className="flex flex-col gap-6 flex-1 w-full">
        {/* 제목 + 평점 */}
        <div className="flex justify-between items-center">
          <div className="h-8 w-2/3 bg-(--skeleton-bg-secondary) rounded" />
          <div className="h-6 w-16 bg-yellow-600 rounded" />
        </div>

        {/* 장르 */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-6 w-20 bg-(--skeleton-bg-accent) rounded-full"
            />
          ))}
        </div>

        {/* 줄거리 */}
        <div className="bg-(--skeleton-bg-primary) p-4 rounded space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-(--skeleton-bg-secondary) rounded w-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
