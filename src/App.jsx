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
import OAuthGoogleCallback from "./pages/OAuthGoogleCallback";
import { useUserInfo } from "./contexts/UserInfoContext";
import { useIsLogin } from "./contexts/IsLoginContext";

function App() {
  const { getUserInfo } = useSupabaseAuth();
  const [_, setUserInfo] = useUserInfo();
  const [__, setIsLogin] = useIsLogin();

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserInfo();
      if (data) {
        setUserInfo(data.user);
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    };

    setTimeout(fetchUser, 100);
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
      <Route path="/oauth/google" element={<OAuthGoogleCallback />} />
    </Routes>
  );
}

export default App;
