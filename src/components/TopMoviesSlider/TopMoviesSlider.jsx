// 평점순(vote_average) Top 20, 페이지네이션
// 마우스 드래그, 터치 스와이프 가능
// 좌우 Arrows 구현 (호버 시 보이고 아니면 숨겨짐)

import { useEffect, useRef, useState } from "react";
import getTopRatedMovies from "../../utils/getTopRatedMovies";
import movieData from "../../data/movieListData.json";
import TopMovieCard from "./TopMovieCard";

export default function TopMoviesSlider() {
  const topMovies = getTopRatedMovies(movieData.results, 20);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const CARD_WIDTH = 220;
  const GAP = 24;

  const totalPages = Math.ceil(topMovies.length / itemsPerPage);
  const SLIDE_UNIT = (CARD_WIDTH + GAP) * itemsPerPage;

  // TODO 여기 throttle
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) setItemsPerPage(5);
      else if (screenWidth >= 900) setItemsPerPage(4);
      else if (screenWidth >= 600) setItemsPerPage(3);
      else setItemsPerPage(2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const isClickPrevented = useRef(false);

  const handleDragStart = (e) => {
    setStartX(e.clientX || e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleDragMove = (e) => {
    if (!isDragging || startX === null) return;
    const currentX = e.clientX || e.touches[0].clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 10) {
      isClickPrevented.current = true;
    }

    if (diff > 50) {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
      setIsDragging(false);
    } else if (diff < -50) {
      setCurrentPage((prev) => Math.max(prev - 1, 0));
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setStartX(null);

    setTimeout(() => {
      isClickPrevented.current = false;
    }, 50);
  };

  return (
    <section className="mt-30">
      <h2 className="text-2xl font-bold ml-10 mb-5">평점순 TOP 20</h2>
      <div
        className="flex flex-col gap-8 overflow-hidden select-none w-full"
        onDragStart={(e) => e.preventDefault()}
      >
        <div className="relative group w-full overflow-hidden px-6 md:px-10">
          {/* TODO 버튼 예쁘게 호버 */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-full opacity-0 group-hover:opacity-100 transition z-10"
          >
            {"<"}
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-full opacity-0 group-hover:opacity-100 transition z-10"
          >
            {">"}
          </button>

          <div
            className={`flex gap-6 transition-transform duration-500 ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{
              transform: `translateX(-${SLIDE_UNIT * currentPage}px)`,
            }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {topMovies.map((movie, idx) => (
              <TopMovieCard
                key={movie.id}
                data={movie}
                ranking={idx + 1}
                isClickPrevented={isClickPrevented}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                idx === currentPage ? "bg-(--text-default)" : "bg-(--text-sub)"
              }`}
              onClick={() => setCurrentPage(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
