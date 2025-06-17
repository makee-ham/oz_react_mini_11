import { useState } from "react";
import dummy from "../data/movieListData.json";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import TopMoviesSlider from "../components/TopMoviesSlider/TopMoviesSlider";

export default function MovieCardsList() {
  const [movieData, _] = useState(dummy.results);
  return (
    <>
      <TopMoviesSlider />
      <section className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6 w-full max-w-[1800px] mx-auto mt-10 px-6">
        {movieData.map((movie) => (
          <Link to={`/details/${movie.id}`} key={movie.id}>
            <MovieCard
              poster={movie.poster_path}
              title={movie.title}
              score={Math.round(movie.vote_average * 10) / 10}
            />
          </Link>
        ))}
      </section>
    </>
  );
}
