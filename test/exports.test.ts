import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";
import { getPackageExportsManifest } from "vitest-package-exports";

it("exports-snapshot", async () => {
  const manifest = await getPackageExportsManifest({
    importMode: "src",
    cwd: fileURLToPath(import.meta.url),
  });

  expect(manifest.exports).toStrictEqual({
    ".": {
      appendTrailingSlash: "function",
      InvariantError: "function",
      capitalize: "function",
      clamp: "function",
      dedent: "function",
      dedentRaw: "function",
      formatStr: "function",
      getChangedKeys: "function",
      getOwnProperty: "function",
      hasOwnProperty: "function",
      invariant: "function",
      isNotNull: "function",
      isNotNullish: "function",
      isNotUndefined: "function",
      isTruthy: "function",
      omit: "function",
      prependLeadingSlash: "function",
      promiseRetry: "function",
      sanitizeIdentifier: "function",
      toCamelCase: "function",
      toKebabCase: "function",
      toPascalCase: "function",
      toSnakeCase: "function",
      trimLeadingSlash: "function",
      trimTrailingSlash: "function",
    },
    "./guards": {
      isNotNull: "function",
      isNotNullish: "function",
      isNotUndefined: "function",
      isTruthy: "function",
    },
    "./number": {
      clamp: "function",
    },
    "./object": {
      getChangedKeys: "function",
      getOwnProperty: "function",
      hasOwnProperty: "function",
      omit: "function",
    },
    "./string": {
      appendTrailingSlash: "function",
      capitalize: "function",
      dedent: "function",
      dedentRaw: "function",
      formatStr: "function",
      prependLeadingSlash: "function",
      sanitizeIdentifier: "function",
      toCamelCase: "function",
      toKebabCase: "function",
      toPascalCase: "function",
      toSnakeCase: "function",
      trimLeadingSlash: "function",
      trimTrailingSlash: "function",
    },
    "./types": {},
  });
});
