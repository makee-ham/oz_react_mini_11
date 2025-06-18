// 평점순(vote_average) Top 20, 페이지네이션
// 마우스 드래그, 터치 스와이프 가능
// 좌우 Arrows 구현 (호버 시 보이고 아니면 숨겨짐)

import { useEffect, useMemo, useState } from "react";
import getTopRatedMovies from "../../utils/getTopRatedMovies";
import TopMovieCard from "./TopMovieCard";
import useThrottle from "../../hooks/useThrottle.js";
import useSliderDrag from "../../hooks/useSliderDrag.js";
import ChevronLeft from "../../assets/ChevronLeft.jsx";
import ChevronRight from "../../assets/ChevronRight.jsx";
import useFetch from "../../hooks/useFetch.js";
import { TMDB_API_OPTIONS } from "../../constants/apiOptions.js";
import { TOP_RATED_MOVIES_DATA_URL } from "../../constants/tmdbUrl.js";
import TopMovieCardSkeleton from "../skeletons/TopMovieCardSkeleton";

export default function TopMoviesSlider() {
  const [topMovies, setTopMovies] = useState([]);

  const { loading, data, error } = useFetch(
    TOP_RATED_MOVIES_DATA_URL,
    TMDB_API_OPTIONS
  );

  useEffect(() => {
    if (data && data.results) {
      const top = getTopRatedMovies(data.results, 20);
      setTopMovies(top);
    }
  }, [data]);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const CARD_WIDTH = 220;
  const GAP = 24;

  // 슬라이드 이동 거리를 카드 한 페이지 전체 너비와 일치하게 둠으로써
  // currentPage 증가 시 딱 그만큼 묶음을 이동시켜
  // 맨 앞 카드가, 예를 들어 itemsPerPage가 5라면 1, 6, 11,... 처럼 인덱스 고정
  const totalPages = useMemo(
    () => Math.ceil(topMovies.length / itemsPerPage),
    [topMovies, itemsPerPage]
  );
  const SLIDE_UNIT = (CARD_WIDTH + GAP) * itemsPerPage;

  const updateItemsPerPage = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) setItemsPerPage(5);
    else if (screenWidth >= 900) setItemsPerPage(4);
    else if (screenWidth >= 600) setItemsPerPage(3);
    else setItemsPerPage(2);
  };

  const throttledResizeHandler = useThrottle(updateItemsPerPage, 300);

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", throttledResizeHandler);
    return () => window.removeEventListener("resize", throttledResizeHandler);
  }, []);

  const { bindDrag, offsetX, isDragging, isClickPrevented } = useSliderDrag(
    currentPage,
    setCurrentPage,
    totalPages
  );

  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(Math.max(totalPages - 1, 0));
    }
  }, [currentPage, totalPages]);

  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <section className="mt-30">
      <h2 className="text-2xl font-bold ml-10 mb-5">평점순 TOP 20</h2>
      <div
        className="flex flex-col gap-8 overflow-hidden select-none w-full"
        onDragStart={(e) => e.preventDefault()}
      >
        <div className="relative group w-full overflow-hidden px-6 md:px-10">
          <div className="absolute -left-6 top-0 h-full w-16 rounded-r-full bg-gradient-to-r from-[#00ffff]/20 to-transparent z-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm" />
          <div className="absolute -right-6 top-0 h-full w-16 rounded-l-full bg-gradient-to-l from-[#00ffff]/20 to-transparent z-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm" />
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            className="flex justify-center items-center absolute left-2 top-1/2 -translate-y-1/2 w-6 h-full opacity-0 group-hover:opacity-100 transition duration-300 z-10"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            className="flex justify-center items-center absolute right-2 top-1/2 -translate-y-1/2 w-6 h-full opacity-0 group-hover:opacity-100 transition duration-300 z-10"
          >
            <ChevronRight />
          </button>

          <div
            className={`flex gap-6 transition-transform ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            } ${offsetX !== 0 ? "duration-300 ease-out" : "duration-500 ease-in-out"}`}
            style={{
              transform: `translateX(calc(-${SLIDE_UNIT * currentPage}px + ${offsetX}px))`,
            }}
            {...bindDrag}
          >
            {loading
              ? Array.from({ length: 20 }).map((_, idx) => (
                  <TopMovieCardSkeleton key={idx} />
                ))
              : topMovies.map((movie, idx) => (
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
              className={`w-2 h-2 rounded-full cursor-pointer transition duration-300 ${
                idx === currentPage ? "bg-(--point-color)" : "bg-(--text-sub)"
              }`}
              onClick={() => setCurrentPage(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
