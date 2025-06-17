import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="fixed top-0 left-0 w-full h-[80px] z-50 bg-(--bg-secondary)">
      <div className="flex items-center justify-between w-full h-full text-(--text-default) px-8 py-4">
        <Link to="/">
          <h1 className="text-3xl font-logo tracking-wider">
            Cine<span className="text-(--point-color) text-4xl">V</span>isor
          </h1>
        </Link>
        <div className="flex-1 max-w-5xl mx-20">
          <input
            type="text"
            className="w-full max-w-5xl rounded-full px-4 py-2 bg-(--text-default) outline-none text-[#333] text-sm focus:ring-2 focus:ring-(--point-color) transition"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="px-3 py-1 rounded text-sm text-(--text-default) hover:bg-(--point-color) hover:text-(--bg-primary) transition duration-200"
          >
            로그인
          </button>
          <button
            type="button"
            className="px-3 py-1 rounded text-sm text-(--text-default) hover:bg-(--point-color) hover:text-(--bg-primary) transition duration-200"
          >
            회원가입
          </button>
        </div>
      </div>
    </header>
  );
}
