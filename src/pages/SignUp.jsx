import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import bg from "../assets/formbg.webp";

export default function SignUp() {
  return (
    <section className="relative w-full h-screen flex justify-center items-center overflow-hidden bg-[#0f0f0f] text-[#f1f1f1]">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm opacity-60"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      {/* 로그인 카드 */}
      <div className="relative z-10 flex flex-col gap-5 p-8 rounded-2xl bg-[#0f0f0f]/70 backdrop-blur-md shadow-lg w-[90%] max-w-sm">
        <Link to="/" className="self-center">
          <h1 className="text-3xl sm:text-4xl font-logo tracking-widest">
            Cine
            <span className="text-[#00ffff] text-4xl sm:text-5xl ml-1">V</span>
            isor
          </h1>
        </Link>

        <h2 className="text-xl text-center font-semibold">회원가입</h2>

        <FormInput label="이메일" type="email" placeholder="이메일 형식 사용" />
        <FormInput
          label="이름"
          type="text"
          placeholder="2~8자 사이 숫자, 한글, 영어만 사용"
        />
        <FormInput
          label="비밀번호"
          type="password"
          placeholder="영어 대문자/소문자 + 숫자의 조합 사용"
        />
        <FormInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 일치 여부 확인"
        />

        <button className="bg-linear-to-r from-cyan-500 to-blue-500 text-black font-bold py-2 rounded hover:opacity-90 transition">
          회원가입
        </button>

        <div className="text-sm text-center text-[--text-sub]">
          이미 가입하셨나요?{" "}
          <Link
            to="/login"
            className="text-[#ff5f5f] font-semibold hover:underline"
          >
            로그인하기
          </Link>
        </div>
      </div>
    </section>
  );
}
