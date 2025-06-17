import { TMDB_IMAGE_BASE_URL } from "../../constants/imageBaseUrl";

export default function TopMovieCard({ data, ranking }) {
  return (
    <div className="flex items-end-safe gap-2 min-w-50">
      <h2 className="text-5xl pb-2">{ranking}</h2>
      <div className="aspect-[2/3] w-full overflow-hidden">
        <img src={TMDB_IMAGE_BASE_URL + data.poster_path} alt={data.title} />
      </div>
    </div>
  );
}
