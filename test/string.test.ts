import { describe, expect, it } from "vitest";
import {
  capitalize,
  dedent,
  dedentRaw,
  formatStr,
  sanitizeIdentifier,
  toCamelCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
} from "../src/string";

describe("capitalize", () => {
  it.each([
    ["hello world", "Hello world"],
    ["hello World", "Hello world"],
    ["123", "123"],
    ["中国", "中国"],
    ["āÁĂÀ", "Āáăà"],
    ["\a", "A"],
    ["", ""],
    ["already Capitalized", "Already capitalized"],
    ["multiple   spaces", "Multiple   spaces"],
  ])("capitalize(%s) = %s", (input, expected) => {
    expect(capitalize(input)).toEqual(expected);
  });
});

describe("toCamelCase", () => {
  it.each([
    ["hello world", "helloWorld"],
    ["hello_world", "helloWorld"],
    ["hello-world", "helloWorld"],
    ["Hello World", "helloWorld"],
    ["123", "123"],
    ["中国", "中国"],
    ["āÁĂÀ", "āáăà"],
    ["a", "a"],
    ["CAPITALIZED_WORDS", "capitalizedWords"],
    ["", ""],
    ["multiple   spaces", "multipleSpaces"],
    ["mixed-Case_string", "mixedCaseString"],
    ["already-camelCase", "alreadyCamelCase"],
    ["  trimmed  string  ", "trimmedString"],
  ])("toCamelCase(%s) = %s", (input, expected) => {
    expect(toCamelCase(input)).toEqual(expected);
  });
});

describe("toKebabCase", () => {
  it.each([
    ["someTextHere", "some-text-here"],
    ["anotherExample", "another-example"],
    ["kebabCase", "kebab-case"],
    ["CAPITALIZED_WORDS", "capitalized-words"],
    ["", ""],
    ["already-kebab-case", "already-kebab-case"],
    ["Mixed_Case_And-Dashes", "mixed-case-and-dashes"],
    ["  trimmed  string  ", "trimmed-string"],
    ["multipleCAPSInside", "multiple-caps-inside"],
    ["numbers123inside", "numbers123inside"],
    ["WITH_UNDERSCORE", "with-underscore"],
  ])("toKebabCase(%s) = %s", (input, expected) => {
    expect(toKebabCase(input)).toEqual(expected);
  });
});

describe("toPascalCase", () => {
  it.each([
    ["some_text_here", "SomeTextHere"],
    ["another-Example", "AnotherExample"],
    ["kebab_case", "KebabCase"],
    ["CAPITALIZED_WORDS", "CapitalizedWords"],
    ["", ""],
    ["AlreadyPascalCase", "AlreadyPascalCase"],
    ["mixed_Case_and-dashes", "MixedCaseAndDashes"],
    ["  trimmed  string  ", "TrimmedString"],
    ["multipleCAPSInside", "MultipleCapsInside"],
    ["numbers123inside", "Numbers123Inside"],
    ["special_CAPS_Case", "SpecialCapsCase"],
  ])("toPascalCase(%s) = %s", (input, expected) => {
    expect(toPascalCase(input)).toEqual(expected);
  });
});

describe("toSnakeCase", () => {
  it.each([
    ["someTextHere", "some_text_here"],
    ["anotherExample", "another_example"],
    ["kebabCase", "kebab_case"],
    ["CAPITALIZED_WORDS", "capitalized_words"],
    ["", ""],
    ["already_snake_case", "already_snake_case"],
    ["Mixed-Case-And_Dashes", "mixed_case_and_dashes"],
    ["  trimmed  string  ", "trimmed_string"],
    ["multipleCAPSInside", "multiple_caps_inside"],
    ["numbers123inside", "numbers123inside"],
    ["with-dashes", "with_dashes"],
  ])("toSnakeCase(%s) = %s", (input, expected) => {
    expect(toSnakeCase(input)).toEqual(expected);
  });
});

describe("dedent", () => {
  it("should remove common indentation from a string", () => {
    const input = `
      hello
        world
          !
    `;
    const expected = "hello\n  world\n    !";
    expect(dedent(input)).toEqual(expected);
  });

  it("should handle template strings", () => {
    const input = dedent`
      hello
        world
          !
    `;
    const expected = "hello\n  world\n    !";
    expect(input).toEqual(expected);
  });

  it("should handle empty strings", () => {
    expect(dedent("")).toEqual("");
  });

  it("should remove leading and trailing empty lines", () => {
    const input = `

      hello
        world

    `;
    const expected = "hello\n  world";
    expect(dedent(input)).toEqual(expected);
  });

  it("should handle strings with no indentation", () => {
    const input = "hello\nworld\n!";
    expect(dedent(input)).toEqual("hello\nworld\n!");
  });

  it("should handle strings with inconsistent indentation", () => {
    const input = `
      hello
    world
        !
    `;
    const expected = "  hello\nworld\n    !";
    expect(dedent(input)).toEqual(expected);
  });

  it("should handle strings with tabs", () => {
    const input = `
\t\thello
\t\t\tworld
\t\t!
    `;
    const expected = "hello\n\tworld\n!";
    expect(dedent(input)).toEqual(expected);
  });

  it("should preserve empty lines within content", () => {
    const input = `
      hello

      world
    `;
    const expected = "hello\n\nworld";
    expect(dedent(input)).toEqual(expected);
  });

  it("should be able to use interpolated values", () => {
    const name = "world";
    const input = dedent`
      hello
        ${name}
          !
    `;
    const expected = "hello\n  world\n    !";
    expect(input).toEqual(expected);
  });

  it("should handle text with unicode spaces", () => {
    const input = `
      hello\u200B
        world\u200B
          !
    `;

    const expected = "hello\u200B\n  world\u200B\n    !";
    expect(dedent(input)).toEqual(expected);
  });
});

describe("dedentEscape", () => {
  it("should handle string literals", () => {
    const input = `
      const str = "hello";
      console.log(str);
    `;
    const expected = "const str = \"hello\";\nconsole.log(str);";
    expect(dedentRaw(input)).toEqual(expected);
  });

  it("should handle template literals", () => {
    const name = "world";
    const input = dedentRaw`
      const greeting = "hello ${name}";
      console.log(greeting);
    `;
    const expected = "const greeting = \"hello world\";\nconsole.log(greeting);";
    expect(input).toEqual(expected);
  });

  it("should handle raw template strings", () => {
    const input = String.raw`
      const regex = /\d+/;
      const str = "hello\nworld";
    `;
    const expected = "const regex = /\\d+/;\nconst str = \"hello\\nworld\";";
    expect(dedentRaw(input)).toEqual(expected);
  });

  it("should handle mixed indentation", () => {
    const input = `
      // 2 spaces
        // 4 spaces
      // back to 2
    `;
    const expected = "// 2 spaces\n  // 4 spaces\n// back to 2";
    expect(dedentRaw(input)).toEqual(expected);
  });

  it("should handle empty strings", () => {
    expect(dedentRaw("")).toEqual("");
  });

  it("should handle single line strings", () => {
    expect(dedentRaw("  hello  ")).toEqual("hello  ");
  });

  it("should preserve empty lines in the middle", () => {
    const input = `
      line1

      line2
    `;
    const expected = "line1\n\nline2";
    expect(dedentRaw(input)).toEqual(expected);
  });

  it("should handle strings with only whitespace", () => {
    const input = "  \n    \n  ";
    expect(dedentRaw(input)).toEqual("\n\n");
  });

  it("should handle strings with unicode whitespace", () => {
    const input = `
      hello\u200B
        world\u200B
    `;
    const expected = "hello\u200B\n  world\u200B";
    expect(dedentRaw(input)).toEqual(expected);
  });

  it("should handle template literals with expressions", () => {
    const a = 1;
    const b = 2;
    const input = dedentRaw`
      ${a} + ${b} = ${a + b}
        nested ${a + b} math
    `;
    const expected = "1 + 2 = 3\n  nested 3 math";
    expect(input).toEqual(expected);
  });
});

describe("sanitizeIdentifier", () => {
  it.each([
    ["validName", "validName"],
    ["$valid", "$valid"],
    ["_valid", "_valid"],
    ["PascalCase", "PascalCase"],
    ["camelCase", "camelCase"],
    ["_123", "_123"],
    ["$123", "$123"],
    ["123invalid", "_123invalid"],
    ["1abc", "_1abc"],
    ["42x", "_42x"],
    ["9_underscore", "_9_underscore"],
    ["", "_"],
    ["0", "_0"],
    ["9", "_9"],
    ["12@asd*", "_12asd"],
  ])("sanitizeIdentifier(%s) = %s", (input, expected) => {
    expect(sanitizeIdentifier(input)).toEqual(expected);
  });

  describe("should make invalid identifiers valid JavaScript identifiers", () => {
    it.each([
      "123test",
      "456var",
      "789const",
    ])("sanitizeIdentifier(%s) = %s", (input) => {
      const sanitized = sanitizeIdentifier(input);
      // Test if the sanitized identifier is a valid JavaScript identifier
      expect(/^[A-Z_$][\w$]*$/i.test(sanitized)).toBe(true);
    });
  });

  describe("should not modify already valid identifiers", () => {
    it.each([
      "test",
      "_test",
      "$test",
      "Test",
    ])("sanitizeIdentifier(%s) = %s", (input) => {
      expect(sanitizeIdentifier(input)).toEqual(input);
    });
  });
});

describe("formatStr", () => {
  it("should handle string placeholders (%s)", () => {
    expect(formatStr("Hello %s", "world")).toBe("Hello world");
    expect(formatStr("%s %s", "hello", "world")).toBe("hello world");
    expect(formatStr("Start %s end", "middle")).toBe("Start middle end");
  });

  it("should handle number placeholders (%d, %i)", () => {
    expect(formatStr("Count: %d", 5)).toBe("Count: 5");
    expect(formatStr("Integer: %i", 42)).toBe("Integer: 42");
    expect(formatStr("Values: %d and %i", 10, 20)).toBe("Values: 10 and 20");
    expect(formatStr("Conversion: %d", "123")).toBe("Conversion: 123");
  });

  it("should handle JSON placeholders (%j)", () => {
    expect(formatStr("Data: %j", { name: "test" })).toBe("Data: {\"name\":\"test\"}");
    expect(formatStr("Array: %j", [1, 2, 3])).toBe("Array: [1,2,3]");
    expect(formatStr("JSON: %j", { nested: { value: true } }))
      .toBe("JSON: {\"nested\":{\"value\":true}}");
  });

  it("should handle object placeholders (%o)", () => {
    expect(formatStr("Object: %o", { id: 1 })).toBe("Object: {\"id\":1}");
    expect(formatStr("String with %o", "test")).toBe("String with test");

    expect(formatStr("Object with string: %o", {}))
      .toBe("Object with string: [object Object]");
  });

  it("should handle escaped percent signs", () => {
    expect(formatStr("Escaped %%s", "value")).toBe("Escaped %s value");
    expect(formatStr("Multiple %% signs %% in %s", "text")).toBe("Multiple % signs % in text");
  });

  it("should handle extra positional arguments", () => {
    expect(formatStr("Extra args", 1, 2)).toBe("Extra args 1 2");
    expect(formatStr("One arg: %s", "first", "second", "third"))
      .toBe("One arg: first second third");
    expect(formatStr("No placeholders", "a", "b", "c")).toBe("No placeholders a b c");
  });

  it("should handle null and undefined values", () => {
    expect(formatStr("Null: %s", null)).toBe("Null: null");
    expect(formatStr("Undefined: %s", undefined)).toBe("Undefined: undefined");
    expect(formatStr("Null number: %d", null)).toBe("Null number: 0");
    expect(formatStr("Null JSON: %j", null)).toBe("Null JSON: null");
  });

  it("should not modify strings without placeholders", () => {
    expect(formatStr("No placeholders")).toBe("No placeholders");
    expect(formatStr("100% complete")).toBe("100% complete");
    expect(formatStr("Text with % but no placeholder")).toBe("Text with % but no placeholder");
  });

  it("should handle mixed placeholders", () => {
    expect(formatStr("Mixed %s, %d, %j", "string", 42, { key: "value" }))
      .toBe("Mixed string, 42, {\"key\":\"value\"}");
  });
});
