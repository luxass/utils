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
 * // Basic path joining
 * joinURL("api", "users") // "api/users"
 * joinURL("api/", "users") // "api/users"
 * joinURL("api", "/users") // "api/users"
 * joinURL("api/", "/users") // "api/users"
 *
 * // URL joining with protocol
 * joinURL("https://api.example.com", "v1/users") // "https://api.example.com/v1/users"
 * joinURL("https://api.example.com/", "/v1/users") // "https://api.example.com/v1/users"
 *
 * // Multiple slash normalization (POSIX-like)
 * joinURL("api//v1/", "//users///") // "api/v1/users/"
 * joinURL("base///", "///path") // "base/path"
 *
 * // Empty and undefined handling
 * joinURL("", "users") // "users"
 * joinURL("api", "") // "api"
 * joinURL(undefined, undefined) // "/"
 * ```
 */
export function joinURL(base: string | undefined, path: string | undefined): string {
  if (!base && !path) return "/";
  if (!base || base === "/") return path || "/";
  if (!path || path === "/") return base;

  const normalize = (s: string): string => s.replace(/\/+/g, "/");
  const joinPaths = (b: string, p: string): string => {
    b = normalize(b);
    p = normalize(p);
    if (b.endsWith("/") && b !== "/") b = b.slice(0, -1);
    if (p.startsWith("/")) p = p.slice(1);
    return p ? `${b}/${p}` : b;
  };

  try {
    const url = new URL(base);
    url.pathname = joinPaths(url.pathname, path);
    return url.toString();
  } catch {
    return joinPaths(base, path);
  }
}
