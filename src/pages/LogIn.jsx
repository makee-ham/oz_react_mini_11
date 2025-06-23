import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { validateEmail, validatePassword } from "../utils/validation";
import bg from "../assets/formbg.webp";
import { useSupabaseAuth } from "../supabase";
import { useUserInfo } from "../contexts/UserInfoContext";
import { useIsLogin } from "../contexts/IsLoginContext";
import KakaoBtn from "../components/signBtns/KakaoBtn";
import GoogleBtn from "../components/signBtns/GoogleBtn";
import { USER_INFO_KEY, localStorageUtils } from "../supabase/utilities";

export default function LogIn() {
  const navigate = useNavigate();
  const { login } = useSupabaseAuth();
  const [_, setUserInfo] = useUserInfo();
  const { getUserInfo } = useSupabaseAuth();

  const [__, setIsLogin] = useIsLogin();

  const emailRef = useRef();
  const passwordRef = useRef();

  const { setItemToLocalStorage } = localStorageUtils();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // 경고 후 입력 시 에러 메시지 등 제거
  const handleInput = (field) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    const newErrors = {
      email: "",
      password: "",
    };

    let isValid = true;

    if (!email) {
      newErrors.email = "이메일을 입력해주세요.";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요.";
      isValid = false;
    } else if (!validatePassword(password)) {
      newErrors.password = "영문 대소문자 + 숫자 조합 8자 이상이어야 합니다.";
      isValid = false;
    }

    setErrors(newErrors);

    // 로그인 요청
    if (isValid) {
      try {
        const result = await login({ email, password });
        const localUserData = await getUserInfo();
        setUserInfo(localUserData.user);
        setItemToLocalStorage(USER_INFO_KEY.sbKey, { user: result.user });
        setIsLogin(true);

        alert(
          `환영합니다, ${result.user?.nickname ?? result.user?.userName ?? "사용자"} 님!`
        );
        navigate("/");
      } catch (err) {
        console.error("로그인 실패", err);
        alert("로그인 중 오류가 발생했어요: " + err.message);
        navigate("/login");
      }
    }
  };

  return (
    <section className="relative w-full h-screen flex justify-center items-center overflow-hidden bg-[#0f0f0f] text-[#f1f1f1]">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm opacity-60"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      <div className="relative z-10 flex flex-col gap-5 p-8 rounded-2xl bg-[#0f0f0f]/70 backdrop-blur-md shadow-lg w-[90%] max-w-sm">
        <Link to="/" className="self-center">
          <h1 className="text-3xl sm:text-4xl font-logo tracking-widest">
            Cine
            <span className="text-[#00ffff] text-4xl sm:text-5xl ml-1">V</span>
            isor
          </h1>
        </Link>

        <FormInput
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          inputRef={emailRef}
          validation={errors.email}
          onInput={() => handleInput("email")}
        />
        <FormInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          inputRef={passwordRef}
          validation={errors.password}
          onInput={() => handleInput("password")}
        />

        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold py-2 rounded hover:opacity-90 transition"
        >
          로그인
        </button>

        <div className="text-sm text-center text-[#aaaaaa]">
          아직 계정이 없으신가요?{" "}
          <Link
            to="/signup"
            className="text-[#00ffff] font-semibold hover:underline"
          >
            간편 가입하기
          </Link>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#aaaaaa]/70 my-4">
          <hr className="flex-grow border-t border-[#aaaaaa]/45" />
          <span>또는</span>
          <hr className="flex-grow border-t border-[#aaaaaa]/45" />
        </div>

        <KakaoBtn label="Sign in with Kakao" />
        <GoogleBtn label="Sign in with Google" />
      </div>
    </section>
  );
}
