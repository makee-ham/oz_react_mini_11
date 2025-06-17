import { useState } from "react";
import dummy from "../data/movieDetailData.json";
import { TMDB_IMAGE_BASE_URL } from "../constants/imageBaseUrl";

export default function MovieDetail() {
  const [detailData, _] = useState(dummy);

  return (
    <section className="flex justify-center items-start gap-10 w-full max-w-6xl mx-auto mt-24 p-8">
      {/* 왼쪽: 포스터 */}
      <article className="w-[300px] aspect-[2/3] shrink-0 overflow-hidden rounded shadow-lg">
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

        {/* 장르 */}
        <div className="flex flex-wrap gap-2">
          {detailData.genres.map((genre, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-(--line-color) text-sm rounded-full"
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* 줄거리 */}
        <div className="bg-(--bg-secondary) p-4 rounded text-sm leading-relaxed">
          <p>{detailData.overview}</p>
        </div>
      </article>
    </section>
  );
}
