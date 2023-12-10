import { expect, it } from "vitest";
import { capitalize, toCamelCase, toKebabCase, toPascalCase, toSnakeCase } from "./string";

it("capitalize", () => {
  expect(capitalize("hello World")).toEqual("Hello world");
  expect(capitalize("123")).toEqual("123");
  expect(capitalize("中国")).toEqual("中国");
  expect(capitalize("āÁĂÀ")).toEqual("Āáăà");
  expect(capitalize("\a")).toEqual("A");
});

it("toCamelCase", () => {
  expect(toCamelCase("some_text_here")).toEqual("someTextHere");
  expect(toCamelCase("another-Example")).toEqual("anotherExample");
  expect(toCamelCase("kebab_case")).toEqual("kebabCase");
  expect(toCamelCase("CAPITALIZED_WORDS")).toEqual("capitalizedWords");
});

it("toKebabCase", () => {
  expect(toKebabCase("someTextHere")).toEqual("some-text-here");
  expect(toKebabCase("anotherExample")).toEqual("another-example");
  expect(toKebabCase("kebabCase")).toEqual("kebab-case");
  expect(toKebabCase("CAPITALIZED_WORDS")).toEqual("capitalized-words");
});

it("toPascalCase", () => {
  expect(toPascalCase("some_text_here")).toEqual("SomeTextHere");
  expect(toPascalCase("another-Example")).toEqual("AnotherExample");
  expect(toPascalCase("kebab_case")).toEqual("KebabCase");
  expect(toPascalCase("CAPITALIZED_WORDS")).toEqual("CapitalizedWords");
});

it("toSnakeCase", () => {
  expect(toSnakeCase("someTextHere")).toEqual("some_text_here");
  expect(toSnakeCase("anotherExample")).toEqual("another_example");
  expect(toSnakeCase("kebabCase")).toEqual("kebab_case");
  expect(toSnakeCase("CAPITALIZED_WORDS")).toEqual("capitalized_words");
});
