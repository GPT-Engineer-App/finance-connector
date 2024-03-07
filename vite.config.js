import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: "8080",
    // proxy: {
    //   '/api': 'https://bc3rpp-ip-84-209-2-193.tunnelmole.net', // Proxy API requests to Express server
    // },
  },
  plugins: [react()],
  base: ""
});
