import KakaoLogo from "../../assets/KakaoLogo";
import { useSupabaseAuth } from "../../supabase";

export default function KakaoBtn({ label }) {
  const { loginWithKakao } = useSupabaseAuth();

  const handleLogin = () => {
    loginWithKakao("http://localhost:5173/oauth/kakao");
    // loginWithKakao("https://oz-react-mini-11-nine.vercel.app/oauth/kakao");
  };

  return (
    <button
      onClick={handleLogin}
      className="flex justify-center gap-2 items-center font-sans text-[#000000]/85 font-medium px-4 py-2 rounded-[12px] bg-[#FEE500] hover:opacity-90 transition"
    >
      <KakaoLogo />
      {label}
    </button>
  );
}
