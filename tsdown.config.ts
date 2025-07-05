import { defineConfig } from "tsdown";

export default defineConfig({
  entry: [
    "./src/index.ts",
    "./src/string.ts",
    "./src/types.ts",
    "./src/guards.ts",
    "./src/number.ts",
    "./src/object.ts",
  ],
  format: "esm",
  clean: true,
  dts: true,
  exports: true,
  treeshake: true,
  publint: true,
});
