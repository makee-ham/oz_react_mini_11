import { createContext, useContext } from "react";
import { supabaseEnv } from "../utilities";
import { createClient } from "@supabase/supabase-js";

// supabase 로그인 유지 세션 생성
export const supabaseClient = createClient(
  supabaseEnv.projectURL,
  supabaseEnv.apiKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

const SUPABASE = createContext(null);

// supabase client를 사용하기 위한 provider 생성
export const SupabaseProvider = ({ children }) => {
  return <SUPABASE value={supabaseClient}>{children}</SUPABASE>;
};

export const useSupabase = () => {
  const supabase = useContext(SUPABASE);

  if (!supabase) {
    throw new Error("supabase가 초기화 되지 않았습니다.");
  }
  return supabase;
};
