import { TMDB_IMAGE_BASE_URL } from "../constants/imageBaseUrl";

export default function MovieCard({ poster, title, score }) {
  return (
    <div className="flex flex-col w-50 h-84 rounded-lg overflow-hidden bg-(--bg-secondary) hover:shadow-[0_6px_20px_rgba(0,255,255,0.12)] transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015]">
      {/* 포스터 이미지 */}
      <div className="aspect-[2/3] w-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={TMDB_IMAGE_BASE_URL + poster}
          alt={title}
        />
      </div>
      {/* 텍스트 영역 */}
      <div className="flex flex-col justify-between h-18 p-2 bg-(--bg-secondary)">
        <h3 className="font-bold line-clamp-1">{title}</h3>
        <p className="font-light text-(--text-sub) text-sm">평점: {score}</p>
      </div>
    </div>
  );
}
