import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";

export default function LogIn() {
  return (
    <section>
      <div>
        <Link to="/">
          <h1 className="text-2xl sm:text-3xl font-logo tracking-wider">
            Cine
            <span className="text-(--point-color) text-3xl sm:text-4xl">V</span>
            isor
          </h1>
        </Link>

        <h2>로그인</h2>
        <FormInput />
        <FormInput />
        <button>로그인</button>
        <p>아직 계정이 없으신가요?</p>
        <Link to="/signup">간편 가입하기</Link>
      </div>
    </section>
  );
}
