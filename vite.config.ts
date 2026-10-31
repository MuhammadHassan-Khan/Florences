import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    // Scoped to this project's test locations so stray test files injected
    // by unrelated projects in this shared folder never run here.
    include: [
      "src/test/**/*.test.{ts,tsx}",
      "src/pages/**/*.test.{ts,tsx}",
      "src/templates/**/*.test.{ts,tsx}",
      "src/components/**/*.test.{ts,tsx}",
      "src/utils/**/*.test.{ts,tsx}",
    ],
  },
});
