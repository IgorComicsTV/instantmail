import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Mail.tm / Mail.gw do not send CORS headers, so the browser reaches them through this proxy.
    proxy: {
      "/api/mailtm": {
        target: "https://api.mail.tm",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/mailtm/, ""),
      },
      "/api/mailgw": {
        target: "https://api.mail.gw",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/mailgw/, ""),
      },
    },
  },
});
