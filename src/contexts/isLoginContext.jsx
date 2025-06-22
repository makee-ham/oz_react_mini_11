import { createContext, useContext, useState } from "react";

const IsLoginContext = createContext();

export function IsLoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <IsLoginContext value={[isLogin, setIsLogin]}>{children}</IsLoginContext>
  );
}

export function useIsLogin() {
  return useContext(IsLoginContext);
}
