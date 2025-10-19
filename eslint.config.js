import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // базовая конфигурация для всех файлов
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
  },

  // правила для JS
  js.configs.recommended,

  // правила для TypeScript
  ...tseslint.configs.recommended,

  // правила для React
  {
    ...react.configs.flat.recommended,
    settings: { react: { version: "detect" } },
  },

  // Prettier — плагин и правило должны быть в одном объекте
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: { prettier: prettierPlugin },
    rules: {
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
]);
