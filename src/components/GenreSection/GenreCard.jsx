import { useNavigate } from "react-router-dom";

export default function GenreCard({ genre, onClick }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={(e) => {
        if (onClick) onClick(e);
        if (!e.defaultPrevented) navigate(`/genres/${genre.id}`);
      }}
      className={`relative aspect-square w-24 min-w-24 max-w-24 rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-105 shadow-md`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${genre.gradientBg}`}
      />

      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 text-[#f1f1f1] font-semibold text-sm pt-3 pl-3">
        {genre.name}
      </div>
    </div>
  );
}
