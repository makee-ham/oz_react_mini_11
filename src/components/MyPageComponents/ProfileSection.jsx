import { useState, useRef, useEffect } from "react";
import defaultThumb from "../../assets/user.webp";
import { useUserInfo } from "../../contexts/UserInfoContext";
import { validateName } from "../../utils/validation";
import { useSupabase } from "../../supabase";
import { USER_INFO_KEY, localStorageUtils } from "../../supabase/utilities";

export default function ProfileSection() {
  const [userInfo, setUserInfo] = useUserInfo();
  const [profileImage, setProfileImage] = useState(
    userInfo?.profilepic || userInfo?.profileImageUrl || defaultThumb
  );
  const [nickname, setNickname] = useState(
    userInfo?.nickname || userInfo?.userName || ""
  );
  const [email, setEmail] = useState(userInfo?.email || "");
  const [editMode, setEditMode] = useState(false);
  const [nicknameError, setNicknameError] = useState("");
  const inputFileRef = useRef(null);
  const supabase = useSupabase();

  const { setItemToLocalStorage } = localStorageUtils();

  useEffect(() => {
    setProfileImage(
      userInfo?.profilepic || userInfo?.profileImageUrl || defaultThumb
    );
    setNickname(userInfo?.nickname || userInfo?.userName || "");
    setEmail(userInfo?.email || "");
  }, [userInfo]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // TODO 여기 에러랑 이미지 업로드 실패: new row violates row-level security policy 에러
    const { _, error: uploadError } = await supabase.storage
      .from("profile")
      .upload(filePath, file, {
        upsert: true, // 중복 이름 덮어쓰기
      });

    if (uploadError) {
      console.error("🔥 업로드 에러:", uploadError);
      alert("이미지 업로드 실패: " + uploadError.message);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("profile").getPublicUrl(filePath);

    // const { error: updateError } = await supabase.auth.updateUser({
    //   data: {
    //     profileImageUrl: publicUrl,
    //   },
    // });

    // if (updateError) {
    //   alert("유저 정보 업데이트에 실패했어요 🥲");
    //   return;
    // }

    // db user-profile 테이블에 저장
    await supabase.from("user-profile").upsert(
      [
        {
          uuid: userInfo.id,
          nickname: userInfo.userName ?? userInfo.email.split("@")[0],
          // nickname은 null이면 안 되게 설정되어서 같이 넣어줘야 함 (이거 땜에 3시간 날림)
          profilepic: publicUrl,
        },
      ],
      {
        onConflict: "uuid",
      }
    );
    setProfileImage(publicUrl);
    // Context + 로컬 스토리지 갱신
    const updatedUserInfo = { ...userInfo, profilepic: publicUrl };
    setUserInfo(updatedUserInfo);
    setItemToLocalStorage(USER_INFO_KEY.customKey, updatedUserInfo);
  };

  const handleImageReset = async () => {
    // const { error: updateError } = await supabase.auth.updateUser({
    //   data: {
    //     profileImageUrl: null,
    //   },
    // });

    // if (updateError) {
    //   alert("이미지를 초기화하는 데 실패했어요 🥲");
    //   return;
    // }

    setProfileImage(defaultThumb);

    // db user-profile 테이블에 저장
    await supabase.from("user-profile").upsert(
      [
        {
          uuid: userInfo.id,
          profilepic: null,
          nickname: userInfo.userName ?? userInfo.email.split("@")[0],
        },
      ],
      {
        onConflict: "uuid",
      }
    );

    // Context + 로컬 스토리지 갱신
    const updatedUserInfo = { ...userInfo, profilepic: null };
    setUserInfo(updatedUserInfo);
    setItemToLocalStorage(USER_INFO_KEY.customKey, updatedUserInfo);
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);

    if (!validateName(value)) {
      setNicknameError("2~8자, 한글/영어/숫자만 입력할 수 있어요.");
    } else {
      setNicknameError("");
    }
  };

  const handleSave = async () => {
    if (!validateName(nickname)) {
      setNicknameError("닉네임 형식을 확인해주세요.");
      return;
    }

    // 닉네임은 user-profile 테이블에만 저장
    // const { error } = await supabase.auth.updateUser({
    //   data: {
    //     userName: nickname,
    //   },
    // });

    // if (error) {
    //   alert("서버 저장에 실패했어요 🥲");
    //   return;
    // }

    await supabase.from("user-profile").upsert(
      [
        {
          uuid: userInfo.id,
          nickname: nickname,
        },
      ],
      {
        onConflict: "uuid",
      }
    );

    const updatedUserInfo = { ...userInfo, nickname };
    setUserInfo(updatedUserInfo);
    setItemToLocalStorage(USER_INFO_KEY.customKey, updatedUserInfo);

    alert(`닉네임이 "${nickname}"(으)로 저장되었습니다.`);
    setEditMode(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12">
      <div className="relative w-32 h-32">
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-(--line-color)">
          <img
            src={profileImage}
            alt="프로필 사진"
            className="w-full h-full object-cover"
          />
          <button
            className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-[50%] opacity-0 hover:opacity-100 transition"
            onClick={() => inputFileRef.current.click()}
          >
            <span className="text-sm text-(--text-default)">이미지 변경</span>
          </button>
        </div>

        <button
          className="absolute -top-1 -right-1 w-6 h-6 bg-(--line-color)/70 text-(--text-default) text-sm rounded-full hover:bg-(--line-color)/50 transition flex items-center justify-center z-10 shadow-lg"
          onClick={handleImageReset}
        >
          ×
        </button>

        <input
          ref={inputFileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      <div className="flex flex-col items-center sm:items-start gap-4 w-full sm:w-auto">
        <div className="w-full sm:w-64">
          <label className="block text-(--text-sub) text-sm">닉네임</label>
          {editMode ? (
            <>
              <input
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                className={`bg-(--bg-secondary) border border-(--line-color) outline-none focus:ring-1 ${
                  nicknameError
                    ? "focus:ring-(--point-sub-color)"
                    : "focus:ring-(--point-color)"
                } transition rounded px-4 py-2 mt-1 text-(--text-default) w-full`}
              />
              {nicknameError && (
                <p className="mt-1 text-sm text-(--point-sub-color)">
                  {nicknameError}
                </p>
              )}
            </>
          ) : (
            <div className="mt-1 text-(--text-default)">{nickname}</div>
          )}
        </div>

        <div className="w-full sm:w-64">
          <label className="block text-(--text-sub) text-sm">이메일</label>
          <p className="mt-1 text-(--text-default)">{email}</p>
        </div>

        <button
          onClick={editMode ? handleSave : () => setEditMode(true)}
          className={`mt-2 px-4 py-2 w-fit ${
            editMode
              ? "bg-(--point-color) text-[#333]"
              : "bg-transparent text-(--text-default) border border-(--text-default)"
          }  rounded hover:opacity-90 transition text-sm`}
        >
          {editMode ? "저장하기" : "수정하기"}
        </button>
      </div>
    </div>
  );
}
