import { expect, it } from "vitest";
import { isNotNull, isNotNullish, isNotUndefined, isTruthy } from "./guards";

it("should filter out null and undefined values", () => {
  const input = [true, false, 0, 1, "", "hello", null, undefined];
  const result = input.filter(isNotNullish);
  expect(result).toEqual([true, false, 0, 1, "", "hello"]);
});

it("should filter out null values", () => {
  const input = [true, false, 0, 1, "", "hello", null, undefined];
  const result = input.filter(isNotNull);
  expect(result).toEqual([true, false, 0, 1, "", "hello", undefined]);
});

it("should filter out undefined values", () => {
  const input = [true, false, 0, 1, "", "hello", null, undefined];
  const result = input.filter(isNotUndefined);
  expect(result).toEqual([true, false, 0, 1, "", "hello", null]);
});

it("should filter out falsy, null, and undefined values", () => {
  const input = [true, false, 0, 1, "", "hello", null, undefined];
  const result = input.filter(isTruthy);
  expect(result).toEqual([true, 1, "hello"]);
});
