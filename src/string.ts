/**
 * First letter uppercase, other lowercase
 * @param {string} str - The string to capitalize
 * @returns {string} The capitalized string
 * @throws {TypeError} If `str` is not string
 *
 * @example
 * ```ts
 * capitalize("hello")
 * // "Hello"
 * ```
 */
export function capitalize(str: string): string {
  if (typeof str !== "string") throw new TypeError("Expected a string");
  if (str.trim().length === 0) return "";
  return str[0]!.toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Converts a string to camel case.
 * @param {string} str - The input string to be converted.
 * @returns {string} The camel cased string.
 * @throws {TypeError} If the input is not a string.
 *
 * @example
 * ```ts
 * toCamelCase("some_text_here")
 * // "someTextHere"
 *
 * toCamelCase("another-Example")
 * // "anotherExample"
 * ```
 */
export function toCamelCase(str: string): string {
  if (typeof str !== "string") throw new TypeError("Expected a string");
  if (str.trim().length === 0) return "";
  return str.toLowerCase().replace(/[-_](.)/g, (_, c) => c.toUpperCase());
}

/**
 * Converts a string to kebab case.
 * @param {string} str - The input string to be converted.
 * @returns {string} The kebab cased string.
 * @throws {TypeError} If the input is not a string.
 *
 * @example
 * ```ts
 * toKebabCase("someTextHere")
 * // "some-text-here"
 *
 * toKebabCase("anotherExample")
 * // "another-example"
 * ```
 */
export function toKebabCase(str: string): string {
  if (typeof str !== "string") throw new TypeError("Expected a string");
  if (str.trim().length === 0) return "";
  return str.replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

/**
 * Converts a string to pascal case.
 * @param {string} str - The input string to be converted.
 * @returns {string} The pascal cased string.
 * @throws {TypeError} If the input is not a string.
 *
 * @example
 * ```ts
 * toPascalCase("some_text_here")
 * // "SomeTextHere"
 *
 * toPascalCase("another-Example")
 * // "AnotherExample"
 * ```
 */
export function toPascalCase(str: string): string {
  if (typeof str !== "string") throw new TypeError("Expected a string");
  if (str.trim().length === 0) return "";
  return str.toLowerCase().replace(/[-_](.)/g, (_, c) => c.toUpperCase()).replace(/^[a-z]/, (c) => c.toUpperCase());
}

/**
 * Converts a string to snake case.
 * @param {string} str - The input string to be converted.
 * @returns {string} The snake cased string.
 * @throws {TypeError} If the input is not a string.
 *
 * @example
 * ```ts
 * toSnakeCase("someTextHere")
 * // "some_text_here"
 *
 * toSnakeCase("anotherExample")
 * // "another_example"
 * ```
 */
export function toSnakeCase(str: string): string {
  if (typeof str !== "string") throw new TypeError("Expected a string");
  if (str.trim().length === 0) return "";
  return str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}
