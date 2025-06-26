import { useEffect, useState } from "react";
import { useUserInfo } from "../../contexts/UserInfoContext";
import { getBookmarks, removeBookmark } from "../../utils/bookmarkAPI";
import MovieCard from "../MovieCard";
import MovieCardSkeleton from "../skeletons/MovieCardSkeleton";
import { Link } from "react-router-dom";

export default function BookmarkSection() {
  const [userInfo] = useUserInfo();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (!userInfo?.id) return;

    const fetchBookmarks = async () => {
      setLoading(true);
      const { data, error } = await getBookmarks(userInfo.id);
      if (!error) setBookmarks(data);
      setLoading(false);
    };

    fetchBookmarks();
  }, [userInfo]);

  const toggleSelect = (movieId) => {
    setSelected((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  const handleBulkDelete = async () => {
    const confirm = window.confirm(
      "선택한 북마크 목록을 정말 삭제하시겠습니까?"
    );
    if (!confirm) return;

    await Promise.all(
      selected.map((movieId) => removeBookmark(userInfo.id, movieId))
    );

    const { data } = await getBookmarks(userInfo.id);
    setBookmarks(data);
    setSelected([]);
  };

  return (
    <section className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">💖 북마크한 영화</h2>
        {selected.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="px-4 py-2 bg-[#ff5f5f] text-[#f1f1f1] text-sm rounded shadow hover:bg-[#ff5f5f]/80 transition"
          >
            선택 삭제 ({selected.length}개)
          </button>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <MovieCardSkeleton key={idx} />
          ))}
        </div>
      ) : bookmarks.length === 0 ? (
        <p className="text-sm text-(--text-sub)">북마크한 영화가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {bookmarks.map((movie) => (
            <div key={movie.movie_id} className="relative group">
              {/* 체크박스 */}
              <input
                type="checkbox"
                checked={selected.includes(movie.movie_id)}
                onChange={() => toggleSelect(movie.movie_id)}
                className="absolute top-2 left-2 z-10 w-5 h-5 accent-[#ff5f5f]"
              />

              {/* 영화 카드 */}
              <Link to={`/details/${movie.movie_id}`} className="block">
                <MovieCard
                  id={movie.movie_id}
                  title={movie.title}
                  poster={movie.poster_path}
                  score={Math.round(movie.vote_average * 10) / 10}
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
