/**
 * Infers the element type of an array
 * @template T
 * @returns {T extends (infer E)[] ? E : never} The inferred element type
 *
 * @example
 * ```ts
 * import { ElementOf } from "@luxass/utils/types";
 *
 * type A = ElementOf<string[]>
 * // string
 * ```
 */
export type ElementOf<T> = T extends (infer E)[] ? E : never;

/**
 * Infers the arguments type of a function
 * @template T
 * @returns {T extends ((...args: infer A) => any) ? A : never} The inferred arguments type
 *
 * @example
 * ```ts
 * import { InferArguments } from "@luxass/utils/types";
 *
 * type A = InferArguments<(a: string, b: number) => void>
 * // [string, number]
 * ```
 */
export type InferArguments<T> = T extends ((...args: infer A) => any) ? A : never;

/**
 * Makes complex nested types more readable in editor tooltips by flattening
 * the type to a simple object type with all properties
 * @template T
 * @returns {{ [K in keyof T]: T[K] } & {}} A simplified representation of the same type
 *
 * @example
 * ```ts
 * import { Prettify } from "@luxass/utils/types";
 *
 * type Messy = { a: string } & { b: number } & { c: boolean }
 * type Clean = Prettify<Messy>
 * // { a: string; b: number; c: boolean }
 * ```
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * Removes index signatures from a type while preserving specific properties
 * @template T
 * @returns {{ [K in keyof T as {} extends Record<K, 1> ? never : K]: T[K] }} A new type without index signatures
 *
 * @example
 * ```ts
 * import { RemoveIndexSignature } from "@luxass/utils/types";
 *
 * type WithIndex = { id: number; [key: string]: any }
 * type Clean = RemoveIndexSignature<WithIndex>
 * // { id: number }
 * ```
 */
export type RemoveIndexSignature<T> = {
  // eslint-disable-next-line ts/no-empty-object-type
  [K in keyof T as {} extends Record<K, 1> ? never : K]: T[K]
};
