// 평점순(vote_average) Top 20, 페이지네이션
// 마우스 드래그, 터치 스와이프 가능
// 좌우 Arrows 구현 (호버 시 보이고 아니면 숨겨짐)

import getTopRatedMovies from "../../utils/getTopRatedMovies";
import movieData from "../../data/movieListData.json";
import TopMovieCard from "./TopMovieCard";

export default function TopMoviesSlider() {
  const topMovies = getTopRatedMovies(movieData.results, 20);
  return (
    <section>
      {/* 컨테이너 */}
      <div>
        {/* wrapper */}
        <div>
          {topMovies.map((movie, idx) => (
            <TopMovieCard key={movie.id} data={movie} ranking={idx + 1} />
          ))}
        </div>
      </div>
      {/* 페이지 인디케이터 */}
      <div></div>
    </section>
  );
}
