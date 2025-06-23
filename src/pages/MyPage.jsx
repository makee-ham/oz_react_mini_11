import { useNavigate } from "react-router-dom";
import { useIsLogin } from "../contexts/IsLoginContext";

export default function MyPage() {
  // 비로그인 유저 차단
  const [isLogin] = useIsLogin();
  const navigate = useNavigate();
  if (isLogin === false) {
    navigate("/login");
    alert("해당 페이지는 로그인 후 이용하실 수 있습니다.");
  }
}
