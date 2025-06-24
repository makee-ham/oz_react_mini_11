export default function GenreCard({ genre }) {
  return (
    <div
      className={`aspect-square w-24 rounded-xl text-white flex items-center justify-center text-sm font-semibold
        bg-gradient-to-br ${genre.gradientBg}
        hover:scale-105 transition-transform cursor-pointer shadow-md`}
    >
      {genre.name}
    </div>
  );
}
