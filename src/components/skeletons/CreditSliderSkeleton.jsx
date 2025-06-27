export default function CreditSliderSkeleton({ title = "출연진" }) {
  return (
    <article className="w-full px-4 md:px-8 mt-10">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="flex gap-4 overflow-x-auto">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="shrink-0 w-[120px] flex flex-col items-center text-center animate-pulse"
          >
            <div className="w-24 h-24 rounded-full bg-(--skeleton-bg-secondary) mb-2" />
            <div className="w-16 h-4 bg-(--skeleton-bg-secondary) rounded mb-1" />
            <div className="w-12 h-3 bg-(--skeleton-bg-accent) rounded" />
          </div>
        ))}
      </div>
    </article>
  );
}
