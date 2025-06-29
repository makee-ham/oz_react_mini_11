import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "@common/MovieCard";
import { Link } from "react-router-dom";
import { TMDB_API_OPTIONS } from "@constants/apiOptions";
import MovieCardSkeleton from "@skeletons/MovieCardSkeleton";
import { genreData } from "@data/genreData";
import { detailedKeywords } from "@constants/metaKeywords";
import Meta from "@components/common/Meta";

export default function GenrePage() {
  const { id } = useParams();
  const genreName = genreData.find((g) => g.id === Number(id))?.name || "";

  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchMovies = async (genreId, page) => {
    setIsFetching(true);
    try {
      const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=ko-KR&page=${page}`;
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
    if (id) {
      setMovieData([]);
      setPage(1);
      setHasMore(true);
    }
  }, [id]);

  useEffect(() => {
    if (id && hasMore) {
      fetchMovies(id, page);
    }
  }, [id, page]);

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
      <Meta
        title={`${genreName} | CineVisor`}
        url={`https://oz-react-mini-11-nine.vercel.app/genres/${id}`}
        description={`${genreName} 장르 영화`}
        keywords={detailedKeywords(genreName)}
      />
      <h2 className="text-2xl font-bold mt-30 ml-4 mb-6 px-6">
        {genreName} 장르 영화
      </h2>
      <section className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-6 w-full max-w-[1800px] mx-auto px-6">
        {movieData.length === 0 && !isFetching && (
          <p className="col-span-full text-center mt-20 text-lg text-(--text-sub)">
            해당하는 장르가 없습니다.
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
          Array.from({ length: 18 }).map((_, idx) => (
            <MovieCardSkeleton key={`skeleton-${idx}`} />
          ))}
      </section>
      <div ref={observerRef} className="h-8 mt-10" />
    </>
  );
}
