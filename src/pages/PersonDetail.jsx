import { useNavigate, useParams } from "react-router-dom";
import useFetch from "@hooks/useFetch";
import { TMDB_API_OPTIONS } from "@constants/apiOptions";
import { PERSON_URL } from "../constants/tmdbUrl";
import MovieCard from "@common/MovieCard";

export default function PersonDetail() {
  const { id } = useParams();
  const url = `${PERSON_URL}${id}/movie_credits?language=ko`;
  const { data, loading, error } = useFetch(url, TMDB_API_OPTIONS);
  const navigate = useNavigate();

  const personInfoUrl = `${PERSON_URL}${id}?language=ko`;
  const { data: personInfo } = useFetch(personInfoUrl, TMDB_API_OPTIONS);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <div className="w-12 h-12 border-4 border-[#00ffff] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-(--text-sub)">
          관련 작품 정보를 불러오는 중이에요...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <div className="text-2xl text-red-400">🚫 에러 발생</div>
        <p className="text-sm text-(--text-sub)">
          작품 정보를 불러오는 중 문제가 발생했어요.
          <br />
          잠시 후 다시 시도해 주세요.
        </p>
      </div>
    );

  const directed = data.crew?.filter((c) => c.job === "Director") ?? [];
  const acted = data.cast ?? [];

  return (
    <section className="max-w-5xl mx-auto px-4 md:px-8 mt-30">
      <h1 className="text-2xl font-bold mb-4">
        {personInfo?.name} 님의 작품들
      </h1>

      {directed.length > 0 && (
        <div className="bg-[rgba(255,255,255,0.02)] p-6 rounded-xl mb-12 shadow-md">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 border-(--line-color) flex items-center gap-2">
            연출작
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {directed.map((movie) => (
              <li
                key={movie.id}
                onClick={() => navigate(`/details/${movie.id}`)}
                className="cursor-pointer"
              >
                <MovieCard
                  id={movie.id}
                  poster={movie.poster_path}
                  title={movie.title}
                  score={Math.round(movie.vote_average * 10) / 10}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {acted.length > 0 && (
        <div className="bg-[rgba(255,255,255,0.015)] p-6 rounded-xl mb-12 shadow-inner">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 border-(--line-color) flex items-center gap-2">
            출연작
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {acted.map((movie) => (
              <li
                key={movie.id}
                onClick={() => navigate(`/details/${movie.id}`)}
                className="cursor-pointer"
              >
                <MovieCard
                  id={movie.id}
                  poster={movie.poster_path}
                  title={movie.title}
                  score={Math.round(movie.vote_average * 10) / 10}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="h-8"></div>
    </section>
  );
}
