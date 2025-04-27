export function capitalize(str: string): string {
  if (!str) return "";
  return str[0]!.toUpperCase() + str.slice(1).toLowerCase();
}

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
