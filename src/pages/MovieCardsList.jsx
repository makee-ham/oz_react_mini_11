import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import TopMoviesSlider from "../components/TopMoviesSlider/TopMoviesSlider";
import useFetch from "../hooks/useFetch";
import { POPULAR_MOVIES_DATA_URL } from "../constants/tmdbUrl";
import { TMDB_API_OPTIONS } from "../constants/apiOptions";
import MovieCardSkeleton from "../components/skeletons/MovieCardSkeleton";

export default function MovieCardsList() {
  const [movieData, setMovieData] = useState([]);
  // const [page, setPage] = useState(1);
  // const [isFetching, setIsFetching] = useState(false);
  // const [hasMore, setHasMore] = useState(true);

  // const fetchMovies = async (page) => {
  //   setIsFetching(true);

  //   try {
  //     const response = await fetch(
  //       `${POPULAR_MOVIES_DATA_URL}&page=${page}`,
  //       TMDB_API_OPTIONS
  //     );
  //     const data = await response.json();
  //     const filtered = data.results.filter((movie) => movie.adult === false);

  //     setMovieData((prev) => [...prev, ...filtered]);

  //     if (page >= data.total_pages) setHasMore(false);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setIsFetching(false);
  //   }
  // };

  const { loading, data, error } = useFetch(
    POPULAR_MOVIES_DATA_URL,
    TMDB_API_OPTIONS
  );

  useEffect(() => {
    if (data && data.results) {
      const filtered = data.results.filter((movie) => movie.adult === false);
      setMovieData(filtered);
    }
  }, [data]);

  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <>
      <TopMoviesSlider />
      <section className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-6 w-full max-w-[1800px] mx-auto mt-10 px-6">
        {loading
          ? Array.from({ length: 16 }).map((_, idx) => (
              <MovieCardSkeleton key={idx} />
            ))
          : movieData.map((movie) => (
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
