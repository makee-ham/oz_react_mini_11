import { useEffect, useRef, useState } from "react";
import MovieCard from "../components/MovieCard";
import { Link, useSearchParams } from "react-router-dom";
import { TMDB_API_OPTIONS } from "../constants/apiOptions";
import MovieCardSkeleton from "../components/skeletons/MovieCardSkeleton";
import getSearchURL from "../utils/getSearchURL";

export default function SearchResults() {
  const [movieData, setMovieData] = useState([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  const fetchMovies = async (query, page) => {
    setIsFetching(true);
    try {
      const url = getSearchURL(query, page);
      const res = await fetch(url, TMDB_API_OPTIONS);
      const data = await res.json();

      if (data.results) {
        setMovieData((prev) => [...prev, ...data.results]);
        if (page >= data.total_pages) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (query) {
      setMovieData([]);
      setPage(1);
      setHasMore(true);
    }
  }, [query]);

  useEffect(() => {
    if (query && hasMore) {
      fetchMovies(query, page);
    }
  }, [query, page]);

  useEffect(() => {
    const target = observerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (target) observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [isFetching, hasMore]);

  return (
    <>
      <section className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-6 w-full max-w-[1800px] mx-auto mt-30 px-6">
        {movieData.length === 0 && !isFetching && (
          <p className="col-span-full text-center mt-20 text-lg text-(--text-sub)">
            찾으시는 영화가 없습니다.
            <br />
            검색어를 다시 입력해보세요.
          </p>
        )}

        {movieData.map((movie) => (
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
      </section>
      <div ref={observerRef} className="h-8 mt-10" />
    </>
  );
}
