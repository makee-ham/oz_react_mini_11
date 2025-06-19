import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import toggleTheme from "../utils/toggleTheme";
import Dark from "../assets/Dark";
import Light from "../assets/Light";

export default function NavBar() {
  const [query, setQuery] = useState("");
  const [_, setTheme] = useState("라이트모드");
  const navigate = useNavigate();

  const handleTheme = () => {
    toggleTheme();
    if (document.documentElement.classList.contains("light")) {
      setTheme("다크모드");
    } else {
      setTheme("라이트모드");
    }
  };

  const debouncedQuery = useDebounce(query);

  // TODO 검색어 없으면 검색 페이지에서 안내하도록 (지금은 home으로 가게 해둠)
  useEffect(() => {
    if (debouncedQuery.trim().replace(/(\s*)/g, "")) {
      navigate(`/search?query=${encodeURIComponent(debouncedQuery)}`);
    } else {
      navigate("/");
    }
  }, [debouncedQuery]);

  // TODO 검색하다가 타이틀 누르거나 해서 홈 페이지 갔을 때 검색어 지워져야
  return (
    <header className="fixed top-0 left-0 w-full h-[80px] z-50 bg-(--bg-secondary)">
      <div className="flex items-center justify-between w-full h-full text-(--text-default) px-4 py-4">
        <Link to="/">
          <h1 className="text-3xl font-logo tracking-wider">
            Cine<span className="text-(--point-color) text-4xl">V</span>isor
          </h1>
        </Link>
        <div className="flex-1 max-w-5xl mx-20">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-5xl rounded-full px-4 py-2 bg-(--text-default) outline-none text-(--bg-secondary) text-sm focus:ring-2 focus:ring-(--point-color) transition"
          />
        </div>
        <button onClick={handleTheme}>
          {document.documentElement.classList.contains("light") ? (
            <Dark />
          ) : (
            <Light />
          )}
        </button>
        <div className="flex gap-2">
          {/* 로그인 텍스트 호버시 검은계열 */}
          <button
            type="button"
            className="px-3 py-1 rounded text-sm text-(--text-default) hover:bg-(--point-color) hover:text-[#333] transition duration-200"
          >
            로그인
          </button>
          <button
            type="button"
            className="px-3 py-1 rounded text-sm text-(--text-default) hover:bg-(--point-color) hover:text-[#333] transition duration-200"
          >
            회원가입
          </button>
        </div>
      </div>
    </header>
  );
}
