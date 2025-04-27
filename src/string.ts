/**
 * Capitalizes the first character of a string and converts the rest to lowercase
 * @param {string} str - The string to capitalize
 * @returns {string} The capitalized string
 * @example
 * ```ts
 * capitalize("hello") // "Hello"
 * capitalize("hELLO") // "Hello"
 * capitalize("") // ""
 * ```
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str[0]!.toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Converts a string to camelCase format
 * @param {string} str - The string to convert to camelCase
 * @returns {string} The string in camelCase format
 * @example
 * ```ts
 * toCamelCase("hello world") // "helloWorld"
 * toCamelCase("hello-world") // "helloWorld"
 * toCamelCase("hello_world") // "helloWorld"
 * toCamelCase("HelloWorld") // "helloWorld"
 * toCamelCase("") // ""
 * ```
 */
export function toCamelCase(str: string): string {
  if (!str) return "";

  str = str.trim().replace(/\s+/g, " ");
  const words = str.split(/[\s\-_]+/);

  // single-character inputs should just be lowercase in camelCase
  if (words.length === 1 && words[0]?.length === 1) {
    return words[0].toLowerCase();
  }

  let result = words[0]?.toLowerCase() || "";
  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    if (!word) continue;

    const hasCamelCase = word.match(/[a-z][A-Z]/g);

    result += hasCamelCase
      ? word.charAt(0).toUpperCase() + word.slice(1)
      : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  return result;
}

/**
 * Converts a string to kebab-case format
 * @param {string} str - The string to convert to kebab-case
 * @returns {string} The string in kebab-case format
 * @example
 * ```ts
 * toKebabCase("hello world") // "hello-world"
 * toKebabCase("helloWorld") // "hello-world"
 * toKebabCase("hello_world") // "hello-world"
 * toKebabCase("HelloWorld") // "hello-world"
 * toKebabCase("") // ""
 * ```
 */
export function toKebabCase(str: string): string {
  if (!str) return "";

  return str.trim()
    .replace(/_/g, "-")
    .replace(/\s+/g, " ")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

/**
 * Converts a string to PascalCase format
 * @param {string} str - The string to convert to PascalCase
 * @returns {string} The string in PascalCase format
 * @example
 * ```ts
 * toPascalCase("hello world") // "HelloWorld"
 * toPascalCase("hello-world") // "HelloWorld"
 * toPascalCase("hello_world") // "HelloWorld"
 * toPascalCase("helloWorld") // "HelloWorld"
 * toPascalCase("") // ""
 * ```
 */
export function toPascalCase(str: string): string {
  if (!str) return "";

  return str.trim()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .replace(/(\d+)([a-z])/gi, "$1 $2")
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

/**
 * Converts a string to snake_case format
 * @param {string} str - The string to convert to snake_case
 * @returns {string} The string in snake_case format
 * @example
 * ```ts
 * toSnakeCase("hello world") // "hello_world"
 * toSnakeCase("helloWorld") // "hello_world"
 * toSnakeCase("hello-world") // "hello_world"
 * toSnakeCase("HelloWorld") // "hello_world"
 * toSnakeCase("") // ""
 * ```
 */
export function toSnakeCase(str: string): string {
  if (!str) return "";

  return str.trim()
    .replace(/-/g, "_")
    .replace(/\s+/g, " ")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .toLowerCase();
}
