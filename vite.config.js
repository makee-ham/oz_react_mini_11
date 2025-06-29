import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@assets", replacement: "/src/assets" },
      { find: "@components", replacement: "/src/components" },
      { find: "@common", replacement: "/src/components/common" },
      { find: "@detailpage", replacement: "/src/components/detailpage" },
      { find: "@mainpage", replacement: "/src/components/mainpage" },
      { find: "@mypage", replacement: "/src/components/mypage" },
      { find: "@navbar", replacement: "/src/components/navbar" },
      { find: "@signpages", replacement: "/src/components/signpages" },
      { find: "@skeletons", replacement: "/src/components/skeletons" },
      { find: "@constants", replacement: "/src/constants" },
      { find: "@contexts", replacement: "/src/contexts" },
      { find: "@data", replacement: "/src/data" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@layout", replacement: "/src/layout" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@utils", replacement: "/src/utils" },
    ],
  },
});
