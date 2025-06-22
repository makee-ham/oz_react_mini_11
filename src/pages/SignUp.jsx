import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import bg from "../assets/formbg.webp";
import { useRef, useState } from "react";
import {
  validateName,
  validateEmail,
  validatePassword,
  passwordsMatch,
} from "../utils/validation";

export default function SignUp() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleSubmit = () => {
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirm = confirmRef.current.value.trim();

    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirm: "",
    };

    let valid = true;

    if (!name) {
      newErrors.name = "이름을 입력해주세요.";
      valid = false;
    } else if (!validateName(name)) {
      newErrors.name = "2~8자 숫자/한글/영어만 사용 가능합니다.";
      valid = false;
    }

    if (!email) {
      newErrors.email = "이메일을 입력해주세요.";
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
      valid = false;
    }

    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요.";
      valid = false;
    } else if (!validatePassword(password)) {
      newErrors.password = "영문 대소문자 + 숫자 조합 8자 이상이어야 합니다.";
      valid = false;
    }

    if (!confirm) {
      newErrors.confirm = "비밀번호 확인란을 입력해주세요.";
      valid = false;
    } else if (!passwordsMatch(password, confirm)) {
      newErrors.confirm = "비밀번호가 일치하지 않습니다.";
      valid = false;
    }

    setErrors(newErrors);

    // valid함. 회원가입 요청 및 가입 가능한 데이터인지 보내기.
    if (valid) {
      // 회원가입 요청- API 요청 or 상태 업데이트(정보 유효 여부 등)
    }
  };

  // 경고된 input 수정 시 경고 해제
  const handleInput = (field) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

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

        <FormInput
          label="이메일"
          type="email"
          placeholder="이메일 형식 사용"
          inputRef={emailRef}
          validation={errors.email}
          onInput={() => handleInput("email")}
        />
        <FormInput
          label="이름"
          type="text"
          placeholder="2~8자 사이 숫자, 한글, 영어만 사용"
          inputRef={nameRef}
          validation={errors.name}
          onInput={() => handleInput("name")}
        />
        <FormInput
          label="비밀번호"
          type="password"
          placeholder="영어 대소문자 + 숫자의 조합 8자 이상"
          inputRef={passwordRef}
          validation={errors.password}
          onInput={() => handleInput("password")}
        />
        <FormInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 일치 여부 확인"
          inputRef={confirmRef}
          validation={errors.confirm}
          onInput={() => handleInput("confirm")}
        />

        <button
          onClick={handleSubmit}
          className="bg-linear-to-r from-cyan-500 to-blue-500 text-black font-bold py-2 rounded hover:opacity-90 transition"
        >
          회원가입
        </button>

        <div className="text-sm text-center text-[#aaaaaa]">
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
