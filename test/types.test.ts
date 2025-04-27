import type { Arrayable, Awaitable, ElementOf, InferArguments, Nullable, Nullish } from "../src/types";
import { expectTypeOf, it } from "vitest";

it("should return T or Promise<T>", () => {
  expectTypeOf<Awaitable<string>>().toEqualTypeOf<string | PromiseLike<string>>();
});

it("should return T or null", () => {
  expectTypeOf<Nullable<string>>().toEqualTypeOf<string | null>();
});

it("should return T, undefined, or null", () => {
  expectTypeOf<Nullish<string>>().toEqualTypeOf<string | undefined | null>();
});

it("should return T or Array<T>", () => {
  expectTypeOf<Arrayable<string>>().toEqualTypeOf<string | Array<string>>();
});

it("should infer the element type of an array", () => {
  expectTypeOf<ElementOf<string[]>>().toEqualTypeOf<string>();
});

it("should infer the arguments type of a function", () => {
  expectTypeOf<InferArguments<(a: string, b: number) => void>>().toEqualTypeOf<[a: string, b: number]>();
});
