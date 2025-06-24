import { useNavigate } from "react-router-dom";

export default function GenreCard({ genre, onClick }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={(e) => {
        if (onClick) onClick(e);
        if (!e.defaultPrevented) navigate(`/genres/${genre.id}`);
      }}
      className={`aspect-square w-24 min-w-24 max-w-24
        rounded-xl text-[#f1f1f1] flex items-center justify-center text-sm font-semibold
        bg-gradient-to-br ${genre.gradientBg}
        hover:scale-105 transition-transform cursor-pointer shadow-md`}
    >
      {genre.name}
    </div>
  );
}
