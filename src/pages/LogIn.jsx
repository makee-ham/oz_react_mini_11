import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import bg from "../assets/formbg.webp";
import { useRef, useState } from "react";

export default function LogIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

        <h2 className="text-xl text-center font-semibold">로그인</h2>

        <FormInput
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
        />
        <FormInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />

        <button className="bg-linear-to-r from-cyan-500 to-blue-500 text-black font-bold py-2 rounded hover:opacity-90 transition">
          로그인
        </button>

        <div className="text-sm text-center text-[#aaaaaa]">
          아직 계정이 없으신가요?{" "}
          <Link
            to="/signup"
            className="text-[#ff5f5f] font-semibold hover:underline"
          >
            간편 가입하기
          </Link>
        </div>
      </div>
    </section>
  );
}
