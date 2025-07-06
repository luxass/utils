const FULL_WHITESPACE_RE = /^\s*$/;

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

/**
 * Removes leading and trailing whitespace from each line of a string
 * @param {TemplateStringsArray | string} literals - The string to dedent
 * @returns {string} The dedented string
 * @example ```ts
 * dedent`
 *   This is a test.
 *   This is another line.
 * `
 * // "This is a test.\nThis is another line."
 * ```
 */
export function dedent(literals: string): string;
export function dedent(strings: TemplateStringsArray, ...values: unknown[]): string;
export function dedent(
  strings: TemplateStringsArray | string,
  ...values: unknown[]
): string {
  return internal_dedent(strings, values, false);
}

dedent.raw = dedentRaw;

/**
 * Removes leading and trailing whitespace from each line of a string
 * @param {TemplateStringsArray | string} literals - The string to dedent
 * @returns {string} The dedented string
 * @example ```ts
 * dedent`
 *   This is a test.
 *   This is another line.
 * `
 * // "This is a test.\nThis is another line."
 * ```
 */
export function dedentRaw(literals: string): string;
export function dedentRaw(strings: TemplateStringsArray, ...values: unknown[]): string;
export function dedentRaw(
  strings: TemplateStringsArray | string,
  ...values: unknown[]
): string {
  return internal_dedent(strings, values, true);
}

/** @internal */
function internal_dedent(
  strings: TemplateStringsArray | string,
  values: unknown[],
  raw: boolean = false,
): string {
  const _raw = typeof strings === "string" ? [strings] : raw ? strings.raw : strings;
  let result = "";

  for (let i = 0; i < _raw.length; i++) {
    const next = _raw[i];
    result += next;

    if (i < values.length) {
      result += values[i];
    }
  }

  const lines = result.split("\n");
  const whitespaceLines = lines.map((line) => FULL_WHITESPACE_RE.test(line));
  const commonIndent = lines
    .reduce((min, line, idx) => {
      if (whitespaceLines[idx]) {
        return min;
      }
      const indent = line.match(/^\s*/)?.[0].length;
      return indent === undefined ? min : Math.min(min, indent);
    }, Number.POSITIVE_INFINITY);

  const firstNonWhitespaceLine = whitespaceLines.findIndex((isWhitespace) => !isWhitespace);
  const lastNonWhitespaceLine = whitespaceLines.lastIndexOf(false);

  // skip empty lines at the beginning and end
  return lines
    .slice(
      firstNonWhitespaceLine >= 0 ? firstNonWhitespaceLine : 0,
      lastNonWhitespaceLine >= 0 ? lastNonWhitespaceLine + 1 : lines.length,
    )
    .map((line) => line.slice(commonIndent))
    .join("\n");
}

/**
 * Ensures a string is a valid JavaScript identifier by prefixing with an underscore if necessary
 * @param {string} str - The string to sanitize
 * @returns {string} A valid JavaScript identifier
 * @example
 * ```ts
 * sanitizeIdentifier("validName") // "validName"
 * sanitizeIdentifier("123invalid") // "_123invalid"
 * sanitizeIdentifier("$valid") // "$valid"
 * sanitizeIdentifier("_valid") // "_valid"
 * ```
 */
export function sanitizeIdentifier(str: string): string {
  const cleaned = str.replace(/[^\w$]/g, "");
  return /^[A-Z_$]/i.test(cleaned) ? cleaned : `_${cleaned}`;
}

const POSITION_REGEX = /(%?)(%([sdijo]))/g;

type Flag = "s" | "d" | "i" | "j" | "o";

/** @internal */
function serializePositional(positional: unknown, flag: Flag): any {
  if (flag === "s") {
    return positional;
  }

  if (flag === "d" || flag === "i") {
    return Number(positional);
  }

  if (flag === "j") {
    return JSON.stringify(positional);
  }

  if (flag === "o") {
    // preserve strings to prevent extra quotes around them.
    if (typeof positional === "string") {
      return positional;
    }

    const json = JSON.stringify(positional);

    // if the positional isn't serializable, return it as-is.
    if (json === "{}" || json === "[]" || /^\[object .+?\]$/.test(json)) {
      return positional;
    }

    return json;
  }
}

/**
 * Formats a string by replacing placeholders with positional values
 * @param {string} message - The string containing placeholders to be replaced
 * @param {...any} positionals - The values to insert into the placeholders
 * @returns {string} The formatted string
 *
 * @example
 * ```ts
 * formatStr("Hello %s", "world") // "Hello world"
 * formatStr("Count: %d", 5) // "Count: 5"
 * formatStr("Data: %j", { name: "test" }) // "Data: {"name":"test"}"
 * formatStr("Object: %o", { id: 1 }) // "Object: {"id":1}"
 * formatStr("Escaped %%s", "value") // "Escaped %s"
 * formatStr("Extra args", 1, 2) // "Extra args 1 2"
 * ```
 */
export function formatStr(message: string, ...positionals: unknown[]): string {
  if (!positionals.length) {
    return message;
  }

  let positionalIndex = 0;
  let formattedMessage = message.replace(
    POSITION_REGEX,
    (match, isEscaped, _, flag) => {
      const positional = positionals[positionalIndex];
      const value = serializePositional(positional, flag);

      if (!isEscaped) {
        positionalIndex++;
        return value;
      }

      return match;
    },
  );

  // append unresolved positionals to string as-is.
  if (positionalIndex < positionals.length) {
    formattedMessage += ` ${positionals.slice(positionalIndex).join(" ")}`;
  }

  formattedMessage = formattedMessage.replace(/%{2}/g, "%");

  return formattedMessage;
}
