import { useNavigate } from "react-router-dom";
import { TMDB_IMAGE_BASE_URL } from "../../constants/imageBaseUrl";

export default function TopMovieCard({
  data,
  ranking,
  isClickPrevented,
  width = 220,
}) {
  const navigate = useNavigate();

  // 랭킹 폰트 크기도 카드 크기에 맞춰 조정
  const getRankingFontSize = (cardWidth) => {
    if (cardWidth >= 220) return "text-5xl";
    if (cardWidth >= 180) return "text-4xl";
    if (cardWidth >= 150) return "text-3xl";
    return "text-2xl";
  };

  // 랭킹 영역 너비도 조정
  const getRankingWidth = (cardWidth) => {
    if (cardWidth >= 220) return "min-w-[40px]";
    if (cardWidth >= 180) return "min-w-[35px]";
    if (cardWidth >= 150) return "min-w-[30px]";
    return "min-w-[25px]";
  };

  return (
    <div
      className="flex justify-center items-end gap-4 shrink-0"
      style={{ width: `${width}px` }}
      onClick={() => {
        if (isClickPrevented.current) return;
        navigate(`/details/${data.id}`);
      }}
    >
      <h2
        className={`${getRankingFontSize(width)} pb-2 ${getRankingWidth(width)} text-right`}
      >
        {ranking}
      </h2>
      <div className="aspect-[2/3] w-full h-full overflow-hidden cursor-pointer rounded">
        <img
          className="w-full h-full object-cover"
          src={TMDB_IMAGE_BASE_URL + data.poster_path}
          alt={data.title}
        />
      </div>
    </div>
  );
}
