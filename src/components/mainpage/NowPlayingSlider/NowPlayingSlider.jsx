import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import useFetch from "@hooks/useFetch";
import { TMDB_API_OPTIONS } from "@constants/apiOptions";
import { NOW_PLAYING_MOVIES_DATA_URL } from "@constants/tmdbUrl";
import { addBookmark, removeBookmark, getBookmarks } from "@utils/bookmarkAPI";
import { SliderSkeleton, SliderError } from "./NowPlayingLoadingComponents";
import { useSupabaseAuth } from "@/supabase";

export default function NowPlayingSlider() {
  const { data, loading, error } = useFetch(
    NOW_PLAYING_MOVIES_DATA_URL,
    TMDB_API_OPTIONS
  );
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const { getUserInfo } = useSupabaseAuth();
  const [userId, setUserId] = useState(null);

  const filteredMovies = data?.results?.filter(
    (movie) => movie.adult === false
  );

  useEffect(() => {
    (async () => {
      const user = await getUserInfo();
      if (!user?.user?.id) return;

      setUserId(user.user.id);
      const { data: bookmarks } = await getBookmarks(user.user.id);
      if (bookmarks) {
        const bookmarkIds = bookmarks.map((item) => item.movie_id);
        setBookmarkedMovies(bookmarkIds);
      }
    })();
  }, [filteredMovies]);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  const goToSlide = (index) => {
    swiperRef.current?.slideToLoop(index);
  };

  const handleBookmarkToggle = async (e, movie) => {
    e.stopPropagation();

    if (!userId) {
      alert("해당 기능은 로그인 후 이용하실 수 있습니다.");
      navigate("/login");
      return;
    }

    const isAlreadyBookmarked = bookmarkedMovies.includes(movie.id);

    try {
      if (isAlreadyBookmarked) {
        await removeBookmark(userId, movie.id);
        setBookmarkedMovies((prev) => prev.filter((id) => id !== movie.id));
      } else {
        await addBookmark(userId, {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
        });
        setBookmarkedMovies((prev) => [...prev, movie.id]);
      }
    } catch (error) {
      console.error("북마크 처리 중 오류 발생:", error);
    }
  };

  if (loading) return <SliderSkeleton />;
  if (error) return <SliderError onRetry={() => window.location.reload()} />;

  return (
    <section className="w-full h-[90vh] lg:h-[85vh] md:h-[75vh] relative mt-16 lg:mt-20 overflow-hidden">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ el: ".swiper-progress", type: "progressbar" }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        loop
        speed={1000}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="w-full h-full"
      >
        {filteredMovies?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="w-full h-full relative cursor-pointer group"
              onClick={() => navigate(`/details/${movie.id}`)}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  className="object-cover w-full h-full transition-transform duration-[4000ms] group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-black/30 z-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0f0f] z-20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-25" />

              <div className="absolute bottom-8 lg:bottom-12 xl:bottom-16 left-4 lg:left-6 xl:left-12 text-[#f1f1f1] z-30 max-w-[90%] lg:max-w-2xl">
                <div className="mb-2 lg:mb-3 flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-1 lg:px-3 lg:py-1 bg-(--point-color) text-black text-xs font-semibold rounded-full">
                    NOW PLAYING
                  </span>
                  <div className="flex items-center text-yellow-400">
                    <svg
                      className="w-3 h-3 lg:w-4 lg:h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs lg:text-sm font-medium">
                      {movie.vote_average?.toFixed(1)}
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 lg:mb-4 leading-tight">
                  {movie.title}
                </h2>

                <p className="line-clamp-2 lg:line-clamp-3 text-sm lg:text-base xl:text-lg leading-relaxed text-[#aaaaaa] mb-4 lg:mb-6">
                  {movie.overview}
                </p>

                <div className="flex items-center gap-2 lg:gap-4">
                  <button
                    className="px-4 py-2 lg:px-6 lg:py-3 bg-(--point-color) text-black text-sm lg:text-base font-semibold rounded-lg hover:bg-(--point-color)/90 transition-all duration-300 transform hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/details/${movie.id}`);
                    }}
                  >
                    자세히 보기
                  </button>
                  <button
                    className="px-4 py-2 lg:px-6 lg:py-3 border-2 border-white/30 text-[#f1f1f1] text-sm lg:text-base font-semibold rounded-lg hover:bg-[#1a1a1a]/50 transition-all duration-300 hidden lg:inline-flex items-center gap-2"
                    onClick={(e) => handleBookmarkToggle(e, movie)}
                  >
                    {bookmarkedMovies.includes(movie.id) ? (
                      <>
                        <svg
                          className="w-4 h-4 fill-current text-(--point-sub-color)"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                        </svg>
                        북마크됨
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"
                          />
                        </svg>
                        북마크
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 프로그레스 바 */}
      <div className="absolute top-0 left-0 w-full h-1 bg-(--line-color) z-40">
        <div className="swiper-progress h-full transition-all duration-300" />
      </div>

      {/* Dot indicator 데스크톱 버전 */}
      <div className="hidden lg:flex absolute bottom-6 left-1/2 transform -translate-x-1/2 space-x-3 z-40">
        {filteredMovies?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-(--point-color) scale-125"
                : "bg-[#aaaaaa]/40 hover:bg-[#aaaaaa]/60"
            }`}
          />
        ))}
      </div>

      {/* Dot indicator 모바일/태블릿 버전 */}
      <div className="lg:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 z-40">
        {filteredMovies?.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-(--point-color) w-8"
                : "bg-[#aaaaaa]/40 w-2"
            }`}
          />
        ))}
      </div>

      {/* 이전 페이지로 */}
      <button className="swiper-button-prev-custom hidden xl:flex absolute left-4 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-black/40 transition-all duration-300 group">
        <svg
          className="w-6 h-6 transform group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* 다음 페이지로 */}
      <button className="swiper-button-next-custom hidden xl:flex absolute right-4 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-black/40 transition-all duration-300 group">
        <svg
          className="w-6 h-6 transform group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* 우측 상단 현재 페이지/전체 페이지 */}
      <div className="hidden lg:block absolute top-6 right-6 z-40 px-4 py-2 bg-black/20 backdrop-blur-sm rounded-full border border-white/20">
        <span className="text-[#f1f1f1] text-sm font-medium">
          {activeIndex + 1} / {filteredMovies?.length || 0}
        </span>
      </div>
    </section>
  );
}
