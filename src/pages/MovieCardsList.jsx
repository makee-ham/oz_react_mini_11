import { useState } from "react";
import dummy from "../data/movieListData.json";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

export default function MovieCardsList() {
  const [movieData, _] = useState(dummy.results);
  return (
    <section className="flex flex-wrap justify-center gap-6 mt-24">
      {movieData.map((movie) => (
        <Link to="/details" key={movie.id}>
          <MovieCard
            poster={movie.poster_path}
            title={movie.title}
            score={movie.vote_average}
          />
        </Link>
      ))}
    </section>
  );
}
