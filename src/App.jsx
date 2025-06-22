import { Route, Routes } from "react-router-dom";
import MovieCardsList from "./pages/MovieCardsList";
import MovieDetail from "./pages/MovieDetail";
import Layout from "./layout/Layout";
import SearchResults from "./pages/SearchResults";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MovieCardsList />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/details/:id" element={<MovieDetail />} />
      </Route>

      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
    </Routes>
  );
}

export default App;
