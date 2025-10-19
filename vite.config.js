import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(new URL("./src", import.meta.url).pathname),
      "@/components": path.resolve(
        new URL("./src/components", import.meta.url).pathname,
      ),
      "@/context": path.resolve(
        new URL("./src/context", import.meta.url).pathname,
      ),
      "@/types": path.resolve(new URL("./src/types", import.meta.url).pathname),
    },
  },
});
