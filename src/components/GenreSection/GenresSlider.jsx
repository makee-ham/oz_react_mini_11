import { useRef } from "react";
import { genreData } from "../../data/genreData";
import GenreCard from "./GenreCard";
import useFreeSliderDrag from "../../hooks/useFreeSliderDrag";

export default function GenresSlider() {
  const containerRef = useRef(null);
  const { bindDrag, isClickPrevented } = useFreeSliderDrag();

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold ml-10 mb-5">장르별 영화</h2>
      <div
        className="flex flex-col gap-8 overflow-hidden select-none w-full"
        onDragStart={(e) => e.preventDefault()}
      >
        <div
          ref={containerRef}
          className="flex items-center gap-4 overflow-x-hidden px-10 pb-2 h-[110px] cursor-grab active:cursor-grabbing transition-transform will-change-transform"
          {...bindDrag(containerRef)}
        >
          {genreData.map((genre) => (
            <GenreCard
              key={genre.id}
              genre={genre}
              onClick={(e) => {
                if (isClickPrevented.current) {
                  e.stopPropagation();
                  e.preventDefault();
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
