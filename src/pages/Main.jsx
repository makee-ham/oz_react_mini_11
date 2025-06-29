import { useEffect } from "react";
import TopMoviesSlider from "@mainpage/TopMoviesSlider/TopMoviesSlider";
import GenresSlider from "@mainpage/GenreSection/GenresSlider";
import PopularMoviesList from "@mainpage/PopularMoviesList";
import NowPlayingSlider from "@components/mainpage/NowPlayingSlider/NowPlayingSlider";
import Meta from "@components/common/Meta";

export default function Main() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Meta />
      <NowPlayingSlider />
      <TopMoviesSlider />
      <GenresSlider />
      <PopularMoviesList />
    </>
  );
}
