import { Outlet } from "react-router-dom";
import NavBar from "@components/navbar/NavBar";
import ScrollToTop from "../components/common/ScrollToTop";

export default function Layout() {
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
