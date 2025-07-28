/**
 * Whatever type, or null
 * @template T
 * @returns {T | null} T or null
 *
 * @example
 * ```ts
 * import { Nullable } from "@luxass/utils/types";
 *
 * type A = Nullable<string>
 * // string | null
 * ```
 */
export type Nullable<T> = T | null;

/**
 * Whatever type, null or undefined
 * @template T
 * @returns {T | null | undefined} T, undefined or null
 *
 * @example
 * ```ts
 * import { Nullish } from "@luxass/utils/types";
 *
 * type A = Nullish<string>
 * // string | null | undefined
 * ```
 */
export type Nullish<T> = T | null | undefined;

/**
 * A type that can be an array or a single value.
 * @template T
 * @returns {T | T[]} T or T[]
 *
 * @example
 * ```ts
 * import { MaybeArray } from "@luxass/utils/types";
 *
 * type A = MaybeArray<string>
 * // string | string[]
 * ```
 */
export type MaybeArray<T> = T | T[];

/**
 * A type that can be a value or a promise.
 * @template T
 * @returns {T | Promise<T>} T or Promise<T>
 *
 * @example
 * ```ts
 * import { MaybePromise } from "@luxass/utils/types";
 *
 * type A = MaybePromise<string>
 * // string | Promise<string>
 * ```
 */
export type MaybePromise<T> = T | Promise<T>;

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

/**
 * A safer version of the built-in Omit utility type that ensures the keys
 * being omitted actually exist on the source type
 * @template T
 * @template {keyof T} K
 * @returns {Omit<T, K>} A new type with the specified keys omitted
 *
 * @example
 * ```ts
 * import { SafeOmit } from "@luxass/utils/types";
 *
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 *
 * type UserWithoutEmail = SafeOmit<User, 'email'>
 * // { id: number; name: string }
 *
 * // TypeScript error - 'invalid' is not a key of User
 * type Invalid = SafeOmit<User, 'invalid'>
 * ```
 */
export type SafeOmit<T, K extends keyof T> = Omit<T, K>;
