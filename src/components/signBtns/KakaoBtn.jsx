import KakaoLogo from "../../assets/KakaoLogo";

export default function KakaoBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex justify-center gap-2 items-center font-sans text-[#000000]/85 font-medium px-4 py-2 rounded-[12px] bg-[#FEE500] hover:opacity-90 transition"
    >
      <KakaoLogo />
      Sign in with Kakao
    </button>
  );
}
