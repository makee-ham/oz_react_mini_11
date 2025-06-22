import { Route, Routes } from "react-router-dom";
import MovieCardsList from "./pages/MovieCardsList";
import MovieDetail from "./pages/MovieDetail";
import Layout from "./layout/Layout";
import SearchResults from "./pages/SearchResults";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { useSupabaseAuth } from "./supabase";
import { useEffect } from "react";
import OAuthKakaoCallback from "./pages/OAuthKakaoCallback";

function App() {
  const { getUserInfo } = useSupabaseAuth();

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MovieCardsList />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/details/:id" element={<MovieDetail />} />
      </Route>

      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />

      <Route path="/oauth/kakao" element={<OAuthKakaoCallback />} />
    </Routes>
  );
}

export default App;
