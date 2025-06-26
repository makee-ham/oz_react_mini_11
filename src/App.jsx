import { Route, Routes } from "react-router-dom";
import MovieDetail from "./pages/MovieDetail";
import Layout from "./layout/Layout";
import SearchResults from "./pages/SearchResults";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { useSupabaseAuth } from "./supabase";
import { useEffect } from "react";
import { useUserInfo } from "./contexts/UserInfoContext";
import { useIsLogin } from "./contexts/IsLoginContext";
import MyPage from "./pages/MyPage";
import OAuthCallback from "./pages/OAuthCallback";
import GenrePage from "./pages/GenrePage";
import Main from "./pages/Main";

function App() {
  const { getUserInfo } = useSupabaseAuth();
  const [_, setUserInfo] = useUserInfo();
  const [__, setIsLogin] = useIsLogin();

  useEffect(() => {
    const fetchUser = async () => {
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
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/genres/:id" element={<GenrePage />} />
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
