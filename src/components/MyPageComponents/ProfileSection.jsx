import { useState, useRef, useEffect } from "react";
import defaultThumb from "../../assets/user.webp";
import { useUserInfo } from "../../contexts/UserInfoContext";
import { validateName } from "../../utils/validation";

export default function ProfileSection() {
  const [userInfo, setUserInfo] = useUserInfo();
  const [profileImage, setProfileImage] = useState(
    userInfo?.profileImageUrl || defaultThumb
  );
  const [nickname, setNickname] = useState(userInfo?.userName || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [editMode, setEditMode] = useState(false);
  const [nicknameError, setNicknameError] = useState("");
  const inputFileRef = useRef(null);

  useEffect(() => {
    setProfileImage(userInfo?.profileImageUrl || defaultThumb);
    setNickname(userInfo?.userName || "");
    setEmail(userInfo?.email || "");
  }, [userInfo]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setUserInfo((prev) => ({ ...prev, profileImageUrl: reader.result }));
      };

      // TODO 지금은 base64 문자열 상태 -> 추후 배포 시 Supabase 서버에 업로드한 뒤 이미지 URL을 저장하는 방식으로 바꿀 것
      reader.readAsDataURL(file);
    }
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

  const handleSave = () => {
    if (!validateName(nickname)) {
      setNicknameError("닉네임 형식을 확인해주세요.");
      return;
    }
    setUserInfo((prev) => ({ ...prev, userName: nickname }));
    alert(`닉네임이 "${nickname}"(으)로 저장되었습니다.`);
    setEditMode(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12">
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-(--line-color)">
        <img
          src={profileImage}
          alt="프로필 사진"
          className="w-full h-full object-cover"
        />
        <button
          className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition"
          onClick={() => inputFileRef.current.click()}
        >
          <span className="text-sm text-(--text-default)">이미지 변경</span>
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
          className={`mt-2 px-4 py-2 w-fit ${editMode ? "bg-(--point-color) text-[#333]" : "bg-transparent text-(--text-default) border border-(--text-default)"}  rounded hover:opacity-90 transition text-sm`}
        >
          {editMode ? "저장하기" : "수정하기"}
        </button>
      </div>
    </div>
  );
}
