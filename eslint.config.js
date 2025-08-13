import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  {
    plugins: {
      react: pluginReact
    },
    rules: { //ここを追加
      "react/react-in-jsx-scope": "off", //ここを追加
      "react/jsx-uses-react": "off",
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  },
];