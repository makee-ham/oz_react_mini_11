import { useNavigate } from "react-router-dom";
import { TMDB_IMAGE_BASE_URL } from "../../constants/imageBaseUrl";

export default function TopMovieCard({ data, ranking, isClickPrevented }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-center items-end gap-4 w-[220px] shrink-0"
      onClick={() => {
        if (isClickPrevented.current) return;
        navigate(`/details/${data.id}`);
      }}
    >
      <h2 className="text-5xl pb-2 min-w-[40px] text-right">{ranking}</h2>
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
