import useFetch from "@hooks/useFetch";
import getCreditsURL from "@utils/getCreditsURL";
import { TMDB_API_OPTIONS } from "@constants/apiOptions";
import { useEffect, useRef, useState } from "react";
import useFreeSliderDrag from "@hooks/useFreeSliderDrag";
import noProfile from "@assets/user.webp";
import { TMDB_IMAGE_BASE_URL } from "../../constants/imageBaseUrl";
import CreditSliderSkeleton from "../skeletons/CreditSliderSkeleton";
import { useNavigate } from "react-router-dom";

export default function CreditSlider({ movieId }) {
  const castSliderRef = useRef(null);
  const { bindDrag, isClickPrevented } = useFreeSliderDrag();
  const [credits, setCredits] = useState({ director: null, cast: [] });
  const navigate = useNavigate();

  const { loading, data, error } = useFetch(
    getCreditsURL(movieId),
    TMDB_API_OPTIONS
  );

  useEffect(() => {
    if (!data || !data.crew || !data.cast) return;

    const director =
      data.crew?.find((person) => person.job === "Director") ?? null;
    const cast =
      data.cast
        ?.filter((person) => person.known_for_department === "Acting")
        .slice(0, 10) ?? [];

    if (director || cast.length > 0) {
      setCredits({ director, cast });
    }
  }, [data]);

  const handleCardClick = (person) => {
    if (isClickPrevented.current) return;
    navigate(`/person/${person.id}`);
  };

  if (loading)
    return (
      <section className="w-full max-w-5xl mx-auto px-4 md:px-8 mt-10">
        <CreditSliderSkeleton title="감독" />
        <CreditSliderSkeleton title="출연진" />
      </section>
    );
  if (error)
    return (
      <section className="w-full max-w-5xl mx-auto px-4 md:px-8 mt-10">
        <p className="text-center text-(--point-sub-color)">
          출연진 정보를 불러오지 못했어요.
        </p>
      </section>
    );

  return (
    <section className="w-full max-w-5xl mx-auto px-4 md:px-8">
      {credits.director && (
        <article className="w-full mt-10">
          <h3 className="text-xl font-semibold mb-4">감독</h3>
          <div className="flex gap-3 overflow-x-hidden">
            <div
              key={credits.director.id}
              onClick={() => handleCardClick(credits.director)}
              className="shrink-0 w-[120px] flex flex-col items-center text-center cursor-pointer"
            >
              <img
                src={
                  credits.director.profile_path
                    ? TMDB_IMAGE_BASE_URL + credits.director.profile_path
                    : noProfile
                }
                alt={credits.director.name}
                draggable="false"
                className="w-24 h-24 rounded-full object-cover mb-2 select-none"
              />
              <span className="text-sm font-medium">
                {credits.director.name}
              </span>
              <span className="text-xs text-(--text-sub)">감독</span>
            </div>
          </div>
        </article>
      )}

      {credits.cast.length > 0 && (
        <article className="w-full mt-10">
          <h3 className="text-xl font-semibold mb-4">출연진</h3>
          <div
            ref={castSliderRef}
            {...bindDrag(castSliderRef)}
            className={`flex gap-3 overflow-x-hidden scrollbar-hide select-none cursor-grab active:cursor-grabbing`}
          >
            {credits.cast.map((person) => (
              <div
                key={person.id}
                onClick={() => handleCardClick(person)}
                className="shrink-0 w-[120px] flex flex-col items-center text-center cursor-pointer"
              >
                <img
                  src={
                    person.profile_path
                      ? TMDB_IMAGE_BASE_URL + person.profile_path
                      : noProfile
                  }
                  alt={person.name}
                  draggable="false"
                  className="w-24 h-24 rounded-full object-cover mb-2 select-none"
                />
                <span className="text-sm font-medium">{person.name}</span>
                {person.character && (
                  <span className="text-xs text-(--text-sub)">
                    {person.character}
                  </span>
                )}
              </div>
            ))}
          </div>
        </article>
      )}
    </section>
  );
}
