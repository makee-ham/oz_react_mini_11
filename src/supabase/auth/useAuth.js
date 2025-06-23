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
    // 1. 먼저 로컬스토리지 확인
    const local = getItemFromLocalStorage(USER_INFO_KEY.sbKey);
    if (local) {
      const userInfo = changeFromDto({
        type: local.user ? DTO_TYPE.user : DTO_TYPE.error,
        dto: local,
      });
      if (userInfo.user) {
        setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo);
      }
      return userInfo;
    }

    // 2. Supabase 세션 먼저 확인
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      console.warn("세션 없음, 로그아웃 상태입니다.");
      return { user: null };
    }

    // 3. 세션 유효 → 유저 정보 가져오기
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      console.warn("유저 정보 없음");
      return { user: null };
    }

    const userInfo = changeFromDto({
      type: DTO_TYPE.user,
      dto: { user: userData.user },
    });

    if (userInfo.user) {
      setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo);
    }

    return userInfo;
  };
  return { logout, getUserInfo };
};
