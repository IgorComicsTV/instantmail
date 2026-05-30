import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/catchmail": {
        target: "https://api.catchmail.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/catchmail/, ""),
      },
    },
  },
});
