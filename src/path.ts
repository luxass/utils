/**
 * Removes trailing slashes from a string
 * @param {string} path - The string to remove trailing slashes from
 * @returns {string} The string with trailing slashes removed
 *
 * @example
 * ```ts
 * import { trimTrailingSlash } from "@luxass/utils/path";
 *
 * trimTrailingSlash("path/to/file/") // "path/to/file"
 * trimTrailingSlash("path/to/file///") // "path/to/file"
 * trimTrailingSlash("path/to/file") // "path/to/file"
 * trimTrailingSlash("") // ""
 * ```
 */
export function trimTrailingSlash(path: string | undefined): string {
  if (!path || path === "/") {
    return "/";
  }

  return path.replace(/\/+$/, "");
}

/**
 * Removes leading slashes from a string
 * @param {string} path - The string to remove leading slashes from
 * @returns {string} The string with leading slashes removed
 *
 * @example
 * ```ts
 * import { trimLeadingSlash } from "@luxass/utils/path";
 *
 * trimLeadingSlash("/path/to/file") // "path/to/file"
 * trimLeadingSlash("///path/to/file") // "path/to/file"
 * trimLeadingSlash("path/to/file") // "path/to/file"
 * trimLeadingSlash("") // ""
 * ```
 */
export function trimLeadingSlash(path: string | undefined): string {
  if (!path || path === "/") {
    return "/";
  }

  return path.replace(/^\/+/, "");
}

/**
 * Ensures a string ends with a trailing slash
 * @param {string} path - The string to append a trailing slash to
 * @returns {string} The string with a trailing slash appended if not already present
 *
 * @example
 * ```ts
 * import { appendTrailingSlash } from "@luxass/utils/path";
 *
 * appendTrailingSlash("path/to/file") // "path/to/file/"
 * appendTrailingSlash("path/to/file/") // "path/to/file/"
 * appendTrailingSlash("") // ""
 * ```
 */
export function appendTrailingSlash(path: string | undefined): string {
  if (!path || path === "/") {
    return "/";
  }

  return path.endsWith("/") ? path : `${path}/`;
}

/**
 * Ensures a string starts with a leading slash
 * @param {string} path - The string to prepend a leading slash to
 * @returns {string} The string with a leading slash prepended if not already present
 *
 * @example
 * ```ts
 * import { prependLeadingSlash } from "@luxass/utils/path";
 *
 * prependLeadingSlash("path/to/file") // "/path/to/file"
 * prependLeadingSlash("/path/to/file") // "/path/to/file"
 * prependLeadingSlash("") // ""
 * ```
 */
export function prependLeadingSlash(path: string | undefined): string {
  if (!path || path === "/") {
    return "/";
  }

  return path[0] === "/" ? path : `/${path}`;
}

/**
 * Joins two URL paths together, handling trailing and leading slashes appropriately
 * @param {string | undefined} base - The base URL path
 * @param {string | undefined} path - The path to append to the base
 * @returns {string} The joined URL path
 *
 * @example
 * ```ts
 * import { joinURL } from "@luxass/utils/path";
 *
 * joinURL("api", "users") // "api/users"
 * joinURL("api/", "users") // "api/users"
 * joinURL("api", "/users") // "api/users"
 * joinURL("api/", "/users") // "api/users"
 * joinURL("", "users") // "users"
 * joinURL("api", "") // "api"
 * joinURL("/", "users") // "users"
 * joinURL("api", "/") // "api"
 * ```
 */
export function joinURL(
  base: string | undefined,
  path: string | undefined,
): string {
  if (!base || base === "/") {
    return path || "/";
  }
  if (!path || path === "/") {
    return base || "/";
  }

  const baseHasTrailing = base[base.length - 1] === "/";
  const pathHasLeading = path[0] === "/";
  if (baseHasTrailing && pathHasLeading) {
    return base + path.slice(1);
  }
  if (!baseHasTrailing && !pathHasLeading) {
    return `${base}/${path}`;
  }
  return base + path;
}
