import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { IsLoginProvider } from "./contexts/isLoginContext.jsx";
import { SupabaseProvider } from "./supabase/context/index.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SupabaseProvider>
      <IsLoginProvider>
        <App />
      </IsLoginProvider>
    </SupabaseProvider>
  </BrowserRouter>
);
