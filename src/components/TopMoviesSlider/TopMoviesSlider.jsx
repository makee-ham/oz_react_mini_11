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
  const [dimensions, setDimensions] = useState({
    cardWidth: 220,
    gap: 24,
    containerPadding: 40, // 양옆에 카드가 살짝 보이도록 하는 패딩
  });

  // 반응형 설정 업데이트
  const updateResponsiveSettings = () => {
    const screenWidth = window.innerWidth;
    let newItemsPerPage, newCardWidth, newGap, newContainerPadding;

    if (screenWidth >= 1200) {
      // PC
      newItemsPerPage = 5;
      newCardWidth = 220;
      newGap = 24;
      newContainerPadding = 60;
    } else if (screenWidth >= 900) {
      // 태블릿 (큰)
      newItemsPerPage = 4;
      newCardWidth = 200;
      newGap = 20;
      newContainerPadding = 50;
    } else if (screenWidth >= 600) {
      // 태블릿 (작은)
      newItemsPerPage = 3;
      newCardWidth = 180;
      newGap = 16;
      newContainerPadding = 40;
    } else {
      // 모바일
      newItemsPerPage = 2;
      newCardWidth = 150;
      newGap = 12;
      newContainerPadding = 30;
    }

    setItemsPerPage(newItemsPerPage);
    setDimensions({
      cardWidth: newCardWidth,
      gap: newGap,
      containerPadding: newContainerPadding,
    });
  };

  const throttledResizeHandler = useThrottle(updateResponsiveSettings, 300);

  useEffect(() => {
    updateResponsiveSettings();
    window.addEventListener("resize", throttledResizeHandler);
    return () => window.removeEventListener("resize", throttledResizeHandler);
  }, []);

  // 슬라이드 계산
  const totalPages = useMemo(
    () => Math.ceil(topMovies.length / itemsPerPage),
    [topMovies, itemsPerPage]
  );

  // 한 페이지 전체 너비 (카드들 + 갭들)
  const SLIDE_UNIT = (dimensions.cardWidth + dimensions.gap) * itemsPerPage;

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
        <div className="relative group w-full overflow-hidden">
          {/* 좌측 그라데이션 오버레이 */}
          <div className="absolute left-0 top-0 h-full w-16 rounded-r-full bg-gradient-to-r from-[#00ffff]/20 to-transparent z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm" />

          {/* 우측 그라데이션 오버레이 */}
          <div className="absolute right-0 top-0 h-full w-16 rounded-l-full bg-gradient-to-l from-[#00ffff]/20 to-transparent z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm" />

          {/* 좌측 화살표 */}
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              className="flex justify-center items-center absolute left-4 top-1/2 -translate-y-1/2 w-8 h-full opacity-0 group-hover:opacity-100 transition duration-300 z-30"
            >
              <ChevronLeft />
            </button>
          )}

          {/* 우측 화살표 */}
          {currentPage < totalPages - 1 && (
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              className="flex justify-center items-center absolute right-4 top-1/2 -translate-y-1/2 w-8 h-full opacity-0 group-hover:opacity-100 transition duration-300 z-30"
            >
              <ChevronRight />
            </button>
          )}

          {/* 슬라이더 컨테이너 */}
          <div
            className="overflow-hidden"
            style={{
              paddingLeft: `${dimensions.containerPadding}px`,
              paddingRight: `${dimensions.containerPadding}px`,
            }}
          >
            <div
              className={`flex transition-transform ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              } ${offsetX !== 0 ? "duration-300 ease-out" : "duration-500 ease-in-out"}`}
              style={{
                gap: `${dimensions.gap}px`,
                transform: `translateX(calc(-${SLIDE_UNIT * currentPage}px + ${offsetX}px))`,
              }}
              {...bindDrag}
            >
              {loading
                ? Array.from({ length: 20 }).map((_, idx) => (
                    <TopMovieCardSkeleton
                      key={idx}
                      width={dimensions.cardWidth}
                    />
                  ))
                : topMovies.map((movie, idx) => (
                    <TopMovieCard
                      key={movie.id}
                      data={movie}
                      ranking={idx + 1}
                      isClickPrevented={isClickPrevented}
                      width={dimensions.cardWidth}
                    />
                  ))}
            </div>
          </div>
        </div>

        {/* 페이지네이션 인디케이터 */}
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
