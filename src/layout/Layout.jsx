import { Outlet } from "react-router-dom";
import NavBar from "@components/navbar/NavBar";

export default function Layout() {
  // TODO 최하단 여백 필요 혹은 푸터
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
        {/* TODO 맨 위로 가기 버튼 */}
      </main>
    </>
  );
}
