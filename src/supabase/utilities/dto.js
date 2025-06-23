import { DTO_TYPE } from "./config";

// User data 매핑용 함수
export const changeFromDto = ({ type, dto }) => {
  switch (type) {
    case DTO_TYPE.user:
      const { user_metadata: userInfo } = dto?.user;
      return {
        user: {
          id: userInfo.id || userInfo.sub,
          email: userInfo.email,
          userName:
            userInfo.userName ??
            userInfo.full_name ??
            (userInfo.email ? userInfo.email.split("@")[0] : "알 수 없음"),
          profileImageUrl:
            userInfo.avatar_url || userInfo.profileImageUrl || null,
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
