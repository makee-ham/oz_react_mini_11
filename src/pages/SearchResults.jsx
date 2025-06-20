import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { TMDB_API_OPTIONS } from "../constants/apiOptions";
import MovieCardSkeleton from "../components/skeletons/MovieCardSkeleton";
import getSearchURL from "../utils/getSearchURL";

export default function SearchResults() {
  const [movieData, setMovieData] = useState([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");
  const searchURL = getSearchURL(query);

  const { loading, data, error } = useFetch(searchURL, TMDB_API_OPTIONS);

  useEffect(() => {
    if (data && data.results) {
      setMovieData(data.results);
    }
  }, [data]);

  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <>
      <section className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-6 w-full max-w-[1800px] mx-auto mt-30 px-6">
        {loading ? (
          Array.from({ length: 16 }).map((_, idx) => (
            <MovieCardSkeleton key={idx} />
          ))
        ) : movieData.length === 0 ? (
          <p className="col-span-full text-center text-lg text-(--text-sub) mt-20">
            찾으시는 영화가 없습니다.
            <br />
            검색어를 다시 입력해보세요.
          </p>
        ) : (
          movieData.map((movie) => (
            <Link to={`/details/${movie.id}`} key={movie.id}>
              <MovieCard
                poster={movie.poster_path}
                title={movie.title}
                score={Math.round(movie.vote_average * 10) / 10}
              />
            </Link>
          ))
        )}
      </section>
    </>
  );
}
