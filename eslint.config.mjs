import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist",
      "coverage",
      "node_modules",
      // Foreign-project paths injected by the shared-folder provisioner
      // (Next.js/Supabase/LiveKit code — not part of this app).
      "src/lib",
      "src/types",
      "src/proxy.ts",
      "src/app/(auth)",
      "src/app/(app)",
      "src/app/auth",
      "src/app/onboarding",
      "src/app/layout.tsx",
      "src/app/page.tsx",
      "src/app/globals.css",
      "src/components/auth",
      "src/components/discovery",
      "src/components/profile",
      "src/components/app-header.tsx",
      "src/components/ui/button.tsx",
      "src/components/ui/input.tsx",
      "src/components/ui/label.tsx",
      "src/components/ui/brand.tsx",
      "src/components/ui/notice.tsx",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
  {
    files: ["**/*.{js,mjs}"],
    languageOptions: {
      globals: globals.node,
    },
  },
  prettierConfig,
);
