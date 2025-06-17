import { useState } from "react";
import dummy from "./data/movieListData.json";
import MovieCard from "./components/MovieCard";

function App() {
  const [movieData, setMovieData] = useState(dummy.results);

  return (
    <>
      {/* 영화 카드 목록 */}
      <section>
        {movieData.map((movie) => (
          <MovieCard
            key={movie.id}
            image={movie.poster_path}
            title={movie.title}
            score={movie.vote_average}
          />
        ))}
      </section>
    </>
  );
}

export default App;
