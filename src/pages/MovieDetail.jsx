import { useState } from "react";
import dummy from "../data/movieDetailData.json";
import { TMDB_IMAGE_BASE_URL } from "../constants/imageBaseUrl";

export default function MovieDetail() {
  const [detailData, _] = useState(dummy);
  return (
    <section>
      <article>
        <img
          src={TMDB_IMAGE_BASE_URL + detailData.poster_path}
          alt={detailData.title}
        />
      </article>
      <article>
        <div>
          <h2>{detailData.title}</h2>
          <h3>{detailData.vote_average}</h3>
        </div>
        <div>
          {detailData.genres.map((genre, idx) => (
            <span key={idx}>{genre.name}</span>
          ))}
        </div>
        <div>
          <p>{detailData.overview}</p>
        </div>
      </article>
    </section>
  );
}
