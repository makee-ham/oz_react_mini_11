import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../supabase";
import { useUserInfo } from "../contexts/UserInfoContext";
import { useIsLogin } from "../contexts/IsLoginContext";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { getUserInfo } = useSupabaseAuth();
  const [_, setUserInfo] = useUserInfo();
  const [__, setIsLogin] = useIsLogin();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const userData = await getUserInfo();
        setUserInfo(userData.user);
        setIsLogin(true);

        alert(
          `환영합니다, ${userData.user?.nickname ?? userData.user?.userName ?? "사용자"} 님!`
        );
        navigate("/");
      } catch (error) {
        console.error("OAuth 처리 실패", error);
        alert("로그인 중 오류가 발생했어요: " + error.message);
        navigate("/login");
      }
    };

    fetchSession();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <div className="w-12 h-12 border-4 border-[#00ffff] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm text-(--text-sub)">로그인 처리 중입니다...</p>
    </div>
  );
}
