import { TMDB_IMAGE_BASE_URL } from "../constants/imageBaseUrl";

export default function MovieCard({ poster, title, score }) {
  const getScoreColor = (score) => {
    if (score >= 8) return "#ff5f5f";
    if (score >= 6) return "#fb923c";
    return "#facc15";
  };

  return (
    <div className="flex flex-col w-full max-w-[220px] max-h-[370px] rounded-lg overflow-hidden bg-(--bg-secondary) hover:shadow-[0_6px_20px_rgba(0,255,255,0.22)] transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015]">
      <div className="aspect-[2/3] w-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={TMDB_IMAGE_BASE_URL + poster}
          alt={title}
        />
      </div>
      <div className="flex flex-col justify-between min-h-[70px] p-2 bg-(--bg-secondary)">
        <h3 className="font-bold text-sm md:text-base line-clamp-1">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/80">⭐</span>
          <div className="w-full h-2 rounded-full bg-neutral-700 overflow-hidden">
            <div
              className="h-3"
              style={{
                width: `${(score / 10) * 100}%`,
                backgroundColor: getScoreColor(score),
                opacity: 0.9,
              }}
            />
          </div>
          <span className="text-xs md:text-sm text-(--text-sub) font-light">
            {score}
          </span>
        </div>
      </div>
    </div>
  );
}
