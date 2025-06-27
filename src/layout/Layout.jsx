import { Outlet } from "react-router-dom";
import NavBar from "@components/navbar/NavBar";
import ScrollToTop from "../components/common/ScrollToTop";

export default function Layout() {
  // TODO 최하단 여백 필요 혹은 푸터
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
        <ScrollToTop />
      </main>
    </>
  );
}
