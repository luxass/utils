import { describe, expect, it } from "vitest";
import { capitalize, dedent, toCamelCase, toKebabCase, toPascalCase, toSnakeCase } from "../src/string";

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
  it("should handle escaped newlines", () => {
    const input = `
      hello\
      world
    `;
    const expected = "helloworld";
    expect(dedent.escape(input)).toEqual(expected);
  });

  it("should handle escaped backticks", () => {
    const input = `
      const code = \`hello\`;
    `;
    const expected = "const code = `hello`;";
    expect(dedent.escape(input)).toEqual(expected);
  });

  it("should handle escaped interpolation", () => {
    const input = String.raw`
      \${notVariable}
      \${123}
    `;
    const expected = String.raw`\${notVariable}
\${123}`;
    expect(dedent.escape(input)).toEqual(expected);
  });

  it("should handle escaped curly braces", () => {
    const input = `
      function test() \{
        return true;
      \}
    `;
    const expected = "function test() {\n  return true;\n}";
    expect(dedent.escape(input)).toEqual(expected);
  });

  it("should handle mixed escaped and unescaped content", () => {
    const name = "world";
    const input = dedent.escape`
      hello \${escaped}
      ${name} \`code\`
      \{object\}
    `;
    const expected = String.raw`hello \${escaped}
world \`code\`
{object}`;
    expect(input).toEqual(expected);
  });
});
