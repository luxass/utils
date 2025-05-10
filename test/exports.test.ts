import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";
import { getPackageExportsManifest } from "vitest-package-exports";

it("exports-snapshot", async () => {
  const manifest = await getPackageExportsManifest({
    importMode: "src",
    cwd: fileURLToPath(import.meta.url),
  });

  expect(manifest.exports).toMatchInlineSnapshot(`
      {
        ".": {
          "capitalize": "function",
          "clamp": "function",
          "dedent": "function",
          "dedentRaw": "function",
          "isNotNull": "function",
          "isNotNullish": "function",
          "isNotUndefined": "function",
          "isTruthy": "function",
          "sanitizeIdentifier": "function",
          "toCamelCase": "function",
          "toKebabCase": "function",
          "toPascalCase": "function",
          "toSnakeCase": "function",
        },
        "./guards": {
          "isNotNull": "function",
          "isNotNullish": "function",
          "isNotUndefined": "function",
          "isTruthy": "function",
        },
        "./number": {
          "clamp": "function",
        },
        "./string": {
          "capitalize": "function",
          "dedent": "function",
          "dedentRaw": "function",
          "sanitizeIdentifier": "function",
          "toCamelCase": "function",
          "toKebabCase": "function",
          "toPascalCase": "function",
          "toSnakeCase": "function",
        },
        "./types": {},
      }
  `);
});
