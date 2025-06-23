import { DTO_TYPE } from "./config";

// User data 매핑용 함수
export const changeFromDto = ({ type, dto }) => {
  switch (type) {
    case DTO_TYPE.user:
      const user = dto?.user;

      // 로컬스토리지에서 이미 커스텀된 구조라면, 그냥 반환 (그니까 프로필 수정한 거면)
      if (
        user?.id &&
        user?.email &&
        user?.userName &&
        user?.profileImageUrl !== undefined
      ) {
        return { user }; // 재가공하지 않고 그대로 리턴
      }

      const { user_metadata: userInfo } = user || {};

      // 로그인 방식에 따른 사용자 정보 추출
      let id, email, userName, profileImageUrl;

      // 이메일 로그인 (일반 회원가입)
      if (
        !user.app_metadata?.provider ||
        user.app_metadata?.provider === "email"
      ) {
        id = user.id;
        email = user.email;
        userName =
          userInfo?.userName || user.email?.split("@")[0] || "알 수 없음";
        profileImageUrl = userInfo?.profileImageUrl || null;
      }
      // Google 로그인
      else if (user.app_metadata?.provider === "google") {
        id = user.id;
        email = user.email;
        userName =
          userInfo?.full_name ||
          userInfo?.name ||
          user.email?.split("@")[0] ||
          "알 수 없음";
        profileImageUrl = userInfo?.avatar_url || userInfo?.picture || null;
      }
      // Kakao 로그인
      else if (user.app_metadata?.provider === "kakao") {
        id = user.id;
        email = user.email;
        userName =
          userInfo?.full_name ||
          userInfo?.name ||
          userInfo?.nickname ||
          user.email?.split("@")[0] ||
          "알 수 없음";
        profileImageUrl =
          userInfo?.avatar_url || userInfo?.profile_image_url || null;
      }
      // 기타 OAuth 로그인
      else {
        id = user.id;
        email = user.email;
        userName =
          userInfo?.full_name ||
          userInfo?.name ||
          userInfo?.userName ||
          user.email?.split("@")[0] ||
          "알 수 없음";
        profileImageUrl =
          userInfo?.avatar_url || userInfo?.profileImageUrl || null;
      }

      return {
        user: {
          id,
          email,
          userName,
          profileImageUrl,
        },
      };

    case DTO_TYPE.error:
      if (!dto.error) {
        return {
          error: {
            status: 500,
            message:
              "DTO_TYPE ERROR를 확인해주세요. 데이터 내부 error 객체가 없습니다.",
          },
        };
      }
      const { error: rawError } = dto;

      return {
        error: {
          status: rawError.status,
          message: rawError.message,
        },
      };

    default:
      new Error("wrong type accessed");
      return;
  }
};
