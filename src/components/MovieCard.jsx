import { TMDB_IMAGE_BASE_URL } from "../constants/imageBaseUrl";

export default function MovieCard({ poster, title, score }) {
  return (
    <div className="flex flex-col w-50 border border-[#ccc]">
      {/* 포스터 이미지 */}
      <div>
        <img src={TMDB_IMAGE_BASE_URL + poster} alt={title} />
      </div>
      {/* 텍스트 영역 */}
      <div className="flex flex-col justify-between h-16 p-2">
        <h3 className="font-bold">{title}</h3>
        <p className="font-light text-[#666] text-sm">평점: {score}</p>
      </div>
    </div>
  );
}
