import { useEffect, useState } from "react";
import { TMDB_IMAGE_BASE_URL } from "../constants/imageBaseUrl";
import useFetch from "../hooks/useFetch";
import getMovieDetailsURL from "../utils/getMovieDetails";
import { useNavigate, useParams } from "react-router-dom";
import { TMDB_API_OPTIONS } from "../constants/apiOptions";
import MovieDetailSkeleton from "../components/skeletons/MovieDetailSkeleton";
import {
  addBookmark,
  removeBookmark,
  isBookmarked,
} from "../utils/bookmarkAPI";
import { useSupabaseAuth } from "../supabase";

export default function MovieDetail() {
  const params = useParams();
  const [detailData, setDetailData] = useState({});
  const [bookmarked, setBookmarked] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const { getUserInfo } = useSupabaseAuth();

  const url = getMovieDetailsURL(params.id);
  const { loading, data, error } = useFetch(url, TMDB_API_OPTIONS);

  useEffect(() => {
    if (data) setDetailData(data);
  }, [data]);

  useEffect(() => {
    (async () => {
      const user = await getUserInfo();
      if (!user?.user?.id) return;
      setUserId(user.user.id);

      const exists = await isBookmarked(user.user.id, Number(params.id));
      setBookmarked(exists);
    })();
  }, [params.id]);

  const handleBookmarkToggle = async () => {
    if (!userId) {
      alert("해당 기능은 로그인 후 이용하실 수 있습니다.");
      navigate("/login");
      return;
    }

    if (!detailData.id) return;

    if (bookmarked) {
      await removeBookmark(userId, detailData.id);
      setBookmarked(false);
    } else {
      await addBookmark(userId, {
        id: detailData.id,
        title: detailData.title,
        poster_path: detailData.poster_path,
        vote_average: detailData.vote_average,
      });
      setBookmarked(true);
    }
  };

  if (loading) return <MovieDetailSkeleton />;
  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <section className="flex flex-col md:flex-row items-center md:items-start gap-10 w-full max-w-6xl mx-auto mt-24 px-4 md:px-8">
      {/* 왼쪽: 포스터 */}
      <article className="w-[70%] md:w-[300px] aspect-[2/3] shrink-0 overflow-hidden rounded shadow-lg">
        <img
          src={TMDB_IMAGE_BASE_URL + detailData.poster_path}
          alt={detailData.title}
          className="w-full h-full object-cover"
        />
      </article>

      {/* 오른쪽: 텍스트 정보 */}
      <article className="flex flex-col gap-6 flex-1">
        {/* 제목 + 평점 */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">{detailData.title}</h2>
          <span className="text-lg text-yellow-500 font-semibold">
            ⭐ {Math.round(detailData.vote_average * 10) / 10}
          </span>
        </div>

        {/* TODO (선택) 장르 클릭 시 카테고리 필터된 목록 이동 */}
        {/* 장르 + 하트 */}
        <div className="flex justify-between items-center">
          {/* 장르들 */}
          <div className="flex flex-wrap gap-2">
            {detailData.genres?.map((genre, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-(--line-color) text-sm rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* 북마크 하트 */}
          <button onClick={handleBookmarkToggle} className="text-2xl shrink-0">
            {bookmarked ? "❤️" : "🤍"}
          </button>
        </div>

        {/* 줄거리 */}
        <div className="bg-(--bg-secondary) p-4 rounded text-sm leading-relaxed">
          <p>{detailData.overview}</p>
        </div>
      </article>
    </section>
  );
}
