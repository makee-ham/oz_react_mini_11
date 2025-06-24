import { Route, Routes } from "react-router-dom";
import MovieCardsList from "./pages/MovieCardsList";
import MovieDetail from "./pages/MovieDetail";
import Layout from "./layout/Layout";
import SearchResults from "./pages/SearchResults";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { useSupabase, useSupabaseAuth } from "./supabase";
import { useEffect } from "react";
import { useUserInfo } from "./contexts/UserInfoContext";
import { useIsLogin } from "./contexts/IsLoginContext";
import MyPage from "./pages/MyPage";
import OAuthCallback from "./pages/OAuthCallback";

function App() {
  const { getUserInfo } = useSupabaseAuth();
  const [_, setUserInfo] = useUserInfo();
  const [__, setIsLogin] = useIsLogin();
  const supabase = useSupabase();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const data = await getUserInfo();
  //     if (data?.user) {
  //       setUserInfo(data.user);
  //       setIsLogin(true);
  //     } else {
  //       setUserInfo(null);
  //       setIsLogin(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      // ✅ 세션이 준비될 때까지 기다림
      for (let i = 0; i < 5; i++) {
        const { data } = await supabase.auth.getSession();
        if (data?.session) break;
        await new Promise((r) => setTimeout(r, 100));
      }

      const data = await getUserInfo();
      if (data?.user) {
        setUserInfo(data.user);
        setIsLogin(true);
      } else {
        setUserInfo(null);
        setIsLogin(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MovieCardsList />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>

      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />

      <Route path="/oauth/kakao" element={<OAuthCallback />} />
      <Route path="/oauth/google" element={<OAuthCallback />} />
    </Routes>
  );
}

export default App;
