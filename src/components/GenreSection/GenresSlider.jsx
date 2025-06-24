export default function GenresSlider() {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold ml-10 mb-5">장르별 영화</h2>
      <div
        className="flex flex-col gap-8 overflow-hidden select-none w-full"
        onDragStart={(e) => e.preventDefault()}
      ></div>
    </section>
  );
}
