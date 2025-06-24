import { useSupabase } from "..";
import {
  changeFromDto,
  DTO_TYPE,
  localStorageUtils,
  USER_INFO_KEY,
} from "../utilities";
import userImg from "../../assets/user.webp";

export const useEmailAuth = () => {
  const supabase = useSupabase();
  const { setItemToLocalStorage } = localStorageUtils();

  const signUp = async ({ email, password, ...userData }) => {
    try {
      // 1. 회원가입
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              avatar_url: userImg,
              ...userData,
            },
          },
        });

      if (signUpError || !signUpData?.user) {
        throw new Error(signUpError?.message || "회원가입 실패");
      }

      // ✅ 2. 바로 로그인도 시도!
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError || !signInData?.user) {
        throw new Error(signInError?.message || "로그인 실패");
      }

      // ✅ 세션이 완전히 준비될 때까지 기다림!
      for (let i = 0; i < 5; i++) {
        const { data } = await supabase.auth.getSession();
        if (data?.session) break;
        await new Promise((r) => setTimeout(r, 100));
      }

      const id = signInData.user.id;

      // 3. user-profile에서 nickname, profilepic 조회
      const { data: profileData } = await supabase
        .from("user-profile")
        .select("*")
        .eq("uuid", id)
        .maybeSingle();

      // 4. 유저 정보 정리
      const userInfo = {
        user: {
          id,
          email: signInData.user.email,
          userName:
            signInData.user.user_metadata?.userName ?? email.split("@")[0],
          profileImageUrl: signInData.user.user_metadata?.avatar_url ?? userImg,
        },
      };

      // 4. 로컬 저장
      setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo);

      return userInfo;
    } catch (error) {
      throw new Error(error);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.user) {
        throw new Error(error?.message || "로그인 실패");
      }

      const authUser = data.user;

      // ✅ user-profile 테이블에서 nickname, profilepic 가져오기
      const { data: profileData, error: profileError } = await supabase
        .from("user-profile")
        .select("*")
        .eq("uuid", authUser.id)
        .maybeSingle();

      if (profileError) {
        console.warn("⚠️ user-profile 조회 실패:", profileError.message);
      }

      const userInfo = {
        user: {
          id: authUser.id,
          email: authUser.email,
          userName:
            profileData?.nickname ??
            authUser.user_metadata?.userName ??
            authUser.email?.split("@")[0],
          profileImageUrl:
            profileData?.profilepic ??
            authUser.user_metadata?.avatar_url ??
            userImg,
        },
      };

      setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo);
      return userInfo;
    } catch (error) {
      throw new Error(error);
    }
  };

  return { signUp, login };
};
