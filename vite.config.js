import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [react(), svgr()],
  base: "/weather-forecast-app/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/context": path.resolve(__dirname, "./src/context"),
      "@/types": path.resolve(__dirname, "./src/types"),
    },
  },
});
