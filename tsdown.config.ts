import { defineConfig } from "tsdown";

export default defineConfig({
  entry: [
    "./src/index.ts",
    "./src/string.ts",
    "./src/types.ts",
    "./src/guards.ts",
    "./src/number.ts",
  ],
  format: ["esm", "cjs"],
  clean: true,
  dts: true,
  treeshake: true,
  publint: true,
});
