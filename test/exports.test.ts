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
          "InvariantError": "function",
          "capitalize": "function",
          "clamp": "function",
          "dedent": "function",
          "dedentRaw": "function",
          "formatStr": "function",
          "invariant": "function",
          "isNotNull": "function",
          "isNotNullish": "function",
          "isNotUndefined": "function",
          "isTruthy": "function",
          "promiseRetry": "function",
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
          "formatStr": "function",
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
