export default function TopMovieCardSkeleton({ width = 220 }) {
  // 랭킹 영역 너비 조정
  const getRankingWidth = (cardWidth) => {
    if (cardWidth >= 220) return "min-w-[40px]";
    if (cardWidth >= 180) return "min-w-[35px]";
    if (cardWidth >= 150) return "min-w-[30px]";
    return "min-w-[25px]";
  };

  // 랭킹 폰트 크기 조정
  const getRankingFontSize = (cardWidth) => {
    if (cardWidth >= 220) return "text-5xl";
    if (cardWidth >= 180) return "text-4xl";
    if (cardWidth >= 150) return "text-3xl";
    return "text-2xl";
  };

  return (
    <div
      className="flex justify-center items-end gap-4 shrink-0 animate-pulse"
      style={{ width: `${width}px` }}
    >
      <div
        className={`${getRankingFontSize(width)} pb-2 ${getRankingWidth(width)} text-right bg-(--skeleton-bg-secondary) h-8 rounded`}
      />
      <div className="aspect-[2/3] w-full bg-(--skeleton-bg-primary) rounded" />
    </div>
  );
}
