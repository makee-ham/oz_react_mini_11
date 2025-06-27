import { useEffect } from "react";
import TopMoviesSlider from "@mainpage/TopMoviesSlider/TopMoviesSlider";
import GenresSlider from "@mainpage/GenreSection/GenresSlider";
import PopularMoviesList from "@mainpage/PopularMoviesList";
import NowPlayingSlider from "../components/mainpage/NowPlayingSlider/NowPlayingSlider";

export default function Main() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NowPlayingSlider />
      <TopMoviesSlider />
      <GenresSlider />
      <PopularMoviesList />
    </>
  );
}
