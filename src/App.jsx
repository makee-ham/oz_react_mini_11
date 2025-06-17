import { useState } from "react";
import dummy from "./data/movieListData.json";

function App() {
  const [movieData, setMovieData] = useState(dummy.results);

  return (
    <>
      {/* 영화 카드 목록 */}
      <section>{movieData.map()}</section>
    </>
  );
}

export default App;
