import type {
  ElementOf,
  InferArguments,
  Prettify,
  RemoveIndexSignature,
} from "../src/types";
import { expectTypeOf, it } from "vitest";

it("should infer the element type of an array", () => {
  expectTypeOf<ElementOf<string[]>>().toEqualTypeOf<string>();
});

it("should infer the arguments type of a function", () => {
  expectTypeOf<InferArguments<(a: string, b: number) => void>>().toEqualTypeOf<[a: string, b: number]>();
});

it("should infer the arguments type of a function with rest parameters", () => {
  expectTypeOf<InferArguments<(a: string, ...b: number[]) => void>>().toEqualTypeOf<[a: string, ...b: number[]]>();
});

it("should infer the arguments type of a function with optional parameters", () => {
  expectTypeOf<InferArguments<(a: string, b?: number) => void>>().toEqualTypeOf<[a: string, b?: number]>();
});

it("should infer the arguments type of a function with optional and rest parameters", () => {
  expectTypeOf<InferArguments<(a: string, b?: number, ...c: boolean[]) => void>>().toEqualTypeOf<[a: string, b?: number, ...c: boolean[]]>();
});

it("should prettify the type", () => {
  expectTypeOf<Prettify<{
    a: string;
    b: number;
  } & {
    c: boolean;
  } & {
    d?: number;
  }>>().toEqualTypeOf<{
    a: string;
    b: number;
    c: boolean;
    d?: number;
  }>();
});

it("should remove index signature", () => {
  expectTypeOf<RemoveIndexSignature<{
    [key: string]: string;
    a: string;
  }>>().toEqualTypeOf<{
    a: string;
  }>();

  expectTypeOf<RemoveIndexSignature<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
    [x: `head-${string}`]: string;
    [x: `${string}-tail`]: string;
    [x: `head-${string}-tail`]: string;
    [x: `${bigint}`]: string;
    [x: `embedded-${number}`]: string;
    optional?: string;
  }>>().toEqualTypeOf<{
    optional?: string;
  }>();
});
