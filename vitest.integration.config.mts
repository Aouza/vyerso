import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Testes contra o Supabase DEV remoto. Decisão pragmática do ambiente atual (ADR-016),
// não dependência permanente: migrar para Supabase local/CI quando disponível.
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["tests/integration/**/*.test.ts"],
    setupFiles: ["tests/integration/setup-env.ts"],
    testTimeout: 30_000,
    hookTimeout: 60_000,
    fileParallelism: false,
  },
});
