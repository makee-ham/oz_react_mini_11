// 평점순(vote_average) Top 20, 페이지네이션
// 마우스 드래그, 터치 스와이프 가능
// 좌우 Arrows 구현 (호버 시 보이고 아니면 숨겨짐)

import getTopRatedMovies from "../../utils/getTopRatedMovies";
import movieData from "../../data/movieListData.json";
import TopMovieCard from "./TopMovieCard";

export default function TopMoviesSlider() {
  const topMovies = getTopRatedMovies(movieData.results, 20);

  return (
    <section className="mt-30">
      <h2 className="text-2xl font-bold ml-10 mb-5">평점순 TOP 20</h2>
      <div className="flex flex-col gap-12 overflow-hidden select-none w-full ">
        {/* 버튼과 slide wrapper group용 */}
        <div className="relative group w-full overflow-hidden">
          {/* 왼쪽 버튼 */}
          <button className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition z-10">
            {"<"}
          </button>
          {/* 오른쪽 버튼 */}
          <button className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition z-10">
            {">"}
          </button>

          {/* 카드 슬라이드 wrapper */}
          <div className="flex gap-6 transition-transform duration-500 px-10">
            {topMovies.map((movie, idx) => (
              <TopMovieCard key={movie.id} data={movie} ranking={idx + 1} />
            ))}
          </div>
        </div>

        {/* 페이지 인디케이터 */}
        <div className="flex justify-center gap-2">
          {/* {Array.from({ length: totalPage }).map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full ${idx === currentIndex ? "bg-(--point-color)" : "bg-(--text-sub)"}`}
          />
        ))} */}
        </div>
      </div>
    </section>
  );
}
