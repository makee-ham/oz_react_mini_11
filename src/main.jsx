import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { IsLoginProvider } from "./contexts/IsLoginContext.jsx";
import { SupabaseProvider } from "./supabase/context/index.jsx";
import { UserInfoProvider } from "./contexts/UserInfoContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SupabaseProvider>
      <UserInfoProvider>
        <IsLoginProvider>
          <App />
        </IsLoginProvider>
      </UserInfoProvider>
    </SupabaseProvider>
  </BrowserRouter>
);
