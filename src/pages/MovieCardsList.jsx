import { useState } from "react";
import dummy from "../data/movieListData.json";
import MovieCard from "../components/MovieCard";

export default function MovieCardsList() {
  const [movieData, _] = useState(dummy.results);
  return (
    <section className="flex flex-wrap justify-center gap-6 mt-6">
      {movieData.map((movie) => (
        <MovieCard
          key={movie.id}
          poster={movie.poster_path}
          title={movie.title}
          score={movie.vote_average}
        />
      ))}
    </section>
  );
}
