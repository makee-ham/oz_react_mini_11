import { Route, Routes } from "react-router-dom";
import MovieCardsList from "./pages/MovieCardsList";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MovieCardsList />} />
      <Route path="/details" element={<MovieDetail />} />
    </Routes>
  );
}

export default App;
