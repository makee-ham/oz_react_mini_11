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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            avatar_url: userImg,
            ...userData,
          },
        },
      });

      if (error || !data?.user) {
        throw new Error(error?.message || "회원가입 실패");
      }

      const id = data.user.id;

      const userInfo = {
        user: {
          id,
          email: data.user.email,
          userName: data.user.user_metadata?.userName ?? email.split("@")[0],
          profileImageUrl: data.user.user_metadata?.avatar_url ?? userImg,
        },
      };

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
      const userInfo = changeFromDto({
        type: !error ? DTO_TYPE.user : DTO_TYPE.error,
        dto: { user: data.user, error },
      });
      if (userInfo.user) {
        setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo);
        return userInfo;
      } else {
        throw new Error(
          `status: ${userInfo.error.status}, message: ${userInfo.error.message}`
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return { signUp, login };
};
