import { useState } from "react";
import dummy from "./data/movieListData.json";

function App() {
  const [movieData, setMovieData] = useState(dummy);

  return (
    <>
      {/* 영화 카드 목록 */}
      <section></section>
    </>
  );
}

export default App;
