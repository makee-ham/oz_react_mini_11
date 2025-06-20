import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import toggleTheme from "../utils/toggleTheme";
import Dark from "../assets/Dark";
import Light from "../assets/Light";

export default function NavBar() {
  const [query, setQuery] = useState("");
  const [_, setTheme] = useState("라이트모드");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();

  const handleTheme = () => {
    toggleTheme();
    if (document.documentElement.classList.contains("light")) {
      setTheme("다크모드");
    } else {
      setTheme("라이트모드");
    }
  };

  const handleSearchClick = () => {
    setIsSearchActive(true);
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const debouncedQuery = useDebounce(query);

  // TODO 검색어 없으면 검색 페이지에서 안내하도록 (지금은 home으로 가게 해둠)
  // TODO 왓챠처럼, 검색 페이지로 검색 버튼 누르면 아예 넘어가게 - handleSearchClick에서 navigate("/search"); 하게 하고 페이지 만들고
  // TODO 이건 진짜 하고싶음 하는 건데 모바일 버전 넘어가선 아예 맨 밑에 네비게이션 고정
  useEffect(() => {
    if (debouncedQuery.trim().replace(/(\s*)/g, "")) {
      navigate(`/search?query=${encodeURIComponent(debouncedQuery)}`);
    } else {
      navigate("/");
    }
  }, [debouncedQuery]);

  // TODO 검색하다가 타이틀 누르거나 해서 홈 페이지 갔을 때 검색어 지워져야
  return (
    <header className="fixed top-0 left-0 w-full h-20 z-50 bg-(--bg-secondary)">
      {/* TODO 아래 조건부렌더링은 모바일/태블릿용인데, 추후 버튼이나 검색 방식 등 조정하여 UX/UI 개선하기... */}
      {isSearchActive && (
        <div className="absolute top-0 left-0 w-full h-20 bg-(--bg-secondary) px-4 flex items-center gap-2 z-50 md:hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="영화 제목을 입력해보세요"
            className="flex-1 rounded-full px-4 py-2 bg-(--text-default) text-(--bg-secondary) text-sm focus:ring-2 focus:ring-[var(--point-color)] transition"
          />
          <button
            onClick={() => {
              setIsSearchActive(false);
              setQuery("");
            }}
            className="text-xl"
          >
            {/* TODO 여기 버튼.. svg..로 */}❌
          </button>
        </div>
      )}
      <div className="flex items-center justify-between h-full px-4 text-(--text-default)">
        {/* 로고 */}
        <Link to="/" onClick={() => setQuery("")}>
          <h1 className="text-2xl sm:text-3xl font-logo tracking-wider">
            Cine
            <span className="text-(--point-color) text-3xl sm:text-4xl">V</span>
            isor
          </h1>
        </Link>

        {/* PC/태블릿 검색창 */}
        <div className="hidden md:block flex-1 max-w-5xl mx-20 ">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-5xl rounded-full px-4 py-2 bg-(--text-default) outline-none text-(--bg-secondary) text-sm focus:ring-2 focus:ring-(--point-color) transition"
          />
        </div>

        {/* 모바일: 검색 + 메뉴 버튼 */}
        {/* TODO 검색 버튼 svg 테마따라 만들기 */}
        {/* TODO 햄버거 진짜 햄버거 메뉴로 만들기 (...) */}
        <div className="flex md:hidden items-center gap-3 ml-auto">
          <button onClick={handleSearchClick} className="text-xl">
            🔍
          </button>
          <button
            onClick={handleMenuToggle}
            className={`text-xl transition-transform duration-300 ${
              isMenuOpen ? "rotate-90" : "rotate-0"
            }`}
          >
            🍔
          </button>
        </div>

        {/* PC: 로그인/회원가입 + 테마 */}
        <div className="hidden md:flex gap-2">
          <button className="px-3 py-1 text-sm hover:bg-(--point-color) hover:text-[#333] transition duration-200 rounded">
            로그인
          </button>
          <button className="px-3 py-1 text-sm hover:bg-(--point-color) hover:text-[#333] transition duration-200 rounded">
            회원가입
          </button>
          <button onClick={handleTheme}>
            {document.documentElement.classList.contains("light") ? (
              <Dark />
            ) : (
              <Light />
            )}
          </button>
        </div>
      </div>

      {/*  모바일 메뉴 드롭다운 자연스럽게, 아래로 내려오는 애니메이션 */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 right-4 w-48 bg-(--text-default) text-(--bg-secondary) rounded shadow p-4 z-50 transition-all duration-300">
          <button
            className="block w-full text-left mb-2 hover:text-blue-500"
            onClick={() => {
              navigate("/login");
              setIsMenuOpen(false);
            }}
          >
            로그인
          </button>
          <button
            className="block w-full text-left mb-2 hover:text-blue-500"
            onClick={() => {
              navigate("/signup");
              setIsMenuOpen(false);
            }}
          >
            회원가입
          </button>
          <button
            className="flex items-center gap-2 hover:text-blue-500"
            onClick={() => {
              handleTheme();
              setIsMenuOpen(false);
            }}
          >
            테마 변경
            {document.documentElement.classList.contains("light") ? (
              <Dark />
            ) : (
              <Light />
            )}
          </button>
        </div>
      )}
    </header>
  );
}
