import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  // TODO 최하단 여백 필요 혹은 푸터
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
