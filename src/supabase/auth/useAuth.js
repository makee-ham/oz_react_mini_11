import { useSupabase } from "..";
import {
  changeFromDto,
  DTO_TYPE,
  localStorageUtils,
  USER_INFO_KEY,
} from "../utilities";

export const useAuth = () => {
  const supabase = useSupabase();
  const {
    getItemFromLocalStorage,
    removeItemFromLocalStorage,
    setItemToLocalStorage,
  } = localStorageUtils();

  // 로그아웃
  const logout = async () => {
    removeItemFromLocalStorage(USER_INFO_KEY.sbKey);
    removeItemFromLocalStorage(USER_INFO_KEY.customKey);
    return await supabase.auth.signOut();
  };

  // user 정보 가져오기
  const getUserInfo = async () => {
    // 1. 세션 먼저 확인
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionError || !sessionData.session) {
      console.warn("세션 없음, 로그아웃 상태입니다.");
      return { user: null };
    }

    // 2. 유저 정보 가져오기
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      console.warn("유저 정보 없음");
      return { user: null };
    }

    const authUser = userData.user;

    // 3. user-profile 테이블에서 추가 정보 조회
    const { data: profileData, error: profileError } = await supabase
      .from("user-profile")
      .select("*")
      .eq("uuid", authUser.id)
      .maybeSingle();

    if (profileError) {
      console.warn("user-profile 테이블 조회 실패", profileError.message);
    }

    const userInfo = {
      id: authUser.id,
      email: authUser.email,
      nickname:
        profileData?.nickname ||
        authUser.userName ||
        authUser.email?.split("@")[0],
      profilepic: profileData?.profilepic || authUser.profileImageUrl || null,
    };

    // 4. 로컬스토리지에 저장
    setItemToLocalStorage(USER_INFO_KEY.customKey, { user: userInfo });

    return { user: userInfo };
  };

  return { logout, getUserInfo };
};
