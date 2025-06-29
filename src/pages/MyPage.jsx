import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsLogin } from "@contexts/IsLoginContext";
import ProfileSection from "@mypage/ProfileSection";
import BookmarkSection from "@mypage/BookmarkSection";
import Meta from "../components/common/Meta";

export default function MyPage() {
  const [isLogin] = useIsLogin();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isLogin === false) {
      alert("해당 페이지는 로그인 후 이용하실 수 있습니다.");
      navigate("/login");
    }
  }, [isLogin]);

  if (isLogin === null) return null;

  return (
    <>
      <Meta title={"마이페이지 | CineVisor"} robots="noindex, follow" />
      <section className="w-full min-h-screen bg-(--bg-primary) text-(--text-default) px-6 py-10 flex flex-col items-center mt-20">
        <h1 className="text-2xl sm:text-3xl mb-8 pb-2 w-full max-w-4xl">
          마이페이지
        </h1>
        <div className="w-full max-w-4xl">
          <ProfileSection />
          <BookmarkSection />
        </div>
      </section>
    </>
  );
}
