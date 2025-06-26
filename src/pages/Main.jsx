import { useEffect } from "react";
import TopMoviesSlider from "../components/TopMoviesSlider/TopMoviesSlider";
import GenresSlider from "../components/GenreSection/GenresSlider";
import PopularMoviesList from "../components/PopularMoviesList";

export default function Main() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TopMoviesSlider />
      <GenresSlider />
      <PopularMoviesList />
    </>
  );
}
