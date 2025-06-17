import { TMDB_IMAGE_BASE_URL } from "../../constants/imageBaseUrl";

export default function TopMovieCard({ data, ranking }) {
  return (
    <div>
      <h2>{ranking}</h2>
      <div>
        <img src={TMDB_IMAGE_BASE_URL + data.poster_path} alt={data.title} />
      </div>
    </div>
  );
}
