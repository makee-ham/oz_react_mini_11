export default function TopMovieCardSkeleton() {
  return (
    <div className="flex justify-center items-end gap-4 w-[220px] shrink-0 animate-pulse">
      <div className="text-5xl pb-2 min-w-[40px] text-right bg-neutral-700 h-8 rounded" />
      <div className="aspect-[2/3] w-full bg-neutral-800 rounded" />
    </div>
  );
}
