export default function MovieDetailSkeleton() {
  return (
    <section className="flex justify-center items-start gap-10 w-full max-w-6xl mx-auto mt-24 p-8 animate-pulse">
      <div className="w-[300px] aspect-[2/3] bg-neutral-700 rounded shadow-lg" />
      <div className="flex flex-col gap-6 flex-1">
        <div className="flex justify-between items-center">
          <div className="h-8 w-2/3 bg-neutral-700 rounded" />
          <div className="h-6 w-16 bg-yellow-600 rounded" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-6 w-20 bg-neutral-600 rounded-full" />
          ))}
        </div>
        <div className="bg-neutral-800 p-4 rounded text-sm leading-relaxed space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 bg-neutral-700 rounded w-full" />
          ))}
        </div>
      </div>
    </section>
  );
}
