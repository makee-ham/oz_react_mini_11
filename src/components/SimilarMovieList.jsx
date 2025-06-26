import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TMDB_API_OPTIONS } from "../constants/apiOptions";
import getSimilarMoviesURL from "../utils/getSimilarMoviesURL";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./skeletons/MovieCardSkeleton";

export default function SimilarMovieList({ movieId }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    setMovies([]);
    setHasMore(true);
    setIsFetching(false);
    setPage(1);

    window.scrollTo(0, 0);
  }, [movieId]);

  useEffect(() => {
    if (!movieId || page < 1) return;

    const fetchMovies = async () => {
      setIsFetching(true);
      const url = getSimilarMoviesURL(movieId, page);
      const res = await fetch(url, TMDB_API_OPTIONS);
      const data = await res.json();

      if (data.results) {
        setMovies((prev) => [...prev, ...data.results]);
        setHasMore(data.page < data.total_pages);
      }
      setIsFetching(false);
    };

    fetchMovies();
  }, [page, movieId]);

  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, isFetching]);

  return (
    <section className="w-full mt-20 max-w-5xl mx-auto px-4 md:px-8">
      <h3 className="text-2xl font-semibold mb-5">비슷한 영화</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Link to={`/details/${movie.id}`} key={movie.id}>
            <MovieCard
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title}
              score={Math.round(movie.vote_average * 10) / 10}
            />
          </Link>
        ))}

        {isFetching &&
          Array.from({ length: 8 }).map((_, idx) => (
            <MovieCardSkeleton key={`skeleton-${idx}`} />
          ))}
      </div>

      {hasMore && <div ref={observerRef} className="h-12" />}
    </section>
  );
}
