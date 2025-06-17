import { TMDB_IMAGE_BASE_URL } from "../constants/imageBaseUrl";

export default function MovieCard({ poster, title, score }) {
  return (
    <div>
      {/* 포스터 이미지 */}
      <div>
        <img src={TMDB_IMAGE_BASE_URL + poster} alt={title} />
      </div>
      {/* 텍스트 영역 */}
      <div>
        <h3>{title}</h3>
        <p>평점: {score}</p>
      </div>
    </div>
  );
}
