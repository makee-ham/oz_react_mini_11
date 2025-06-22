import { createContext, useContext, useState } from "react";

const UserInfoContext = createContext();

export function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <UserInfoContext value={[userInfo, setUserInfo]}>
      {children}
    </UserInfoContext>
  );
}

export function useUserInfo() {
  return useContext(UserInfoContext);
}
