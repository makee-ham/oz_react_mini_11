import { createContext, useContext, useState } from "react";

const isLoginContext = createContext();

export function IsLoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <isLoginContext value={[isLogin, setIsLogin]}>{children}</isLoginContext>
  );
}

export function useIsLogin() {
  return useContext(isLoginContext);
}
