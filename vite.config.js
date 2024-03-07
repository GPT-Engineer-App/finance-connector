import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: "8080",
    proxy: {
      '/api': 'http://localhost:3001', // Proxy API requests to Express server
    },
  },
  plugins: [react()],
  base: ""
});
