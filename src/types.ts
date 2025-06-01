/**
 * Whatever type, or Promise of that type
 * @param T - Type
 * @returns T or Promise<T>
 *
 * @example
 * ```ts
 * type A = Awaitable<string>
 * // string | Promise<string>
 * ```
 */
export type Awaitable<T> = T | PromiseLike<T>;

/**
 * Whatever type, or null
 * @param T - Type
 * @returns T or null
 *
 * @example
 * ```ts
 * type A = Nullable<string>
 * // string | null
 * ```
 */
export type Nullable<T> = T | null;

/**
 * Whatever type, null or undefined
 * @param T - Type
 * @returns T, undefined or null
 *
 * @example
 * ```ts
 * type A = Nullish<string>
 * // string | null | undefined
 * ```
 */
export type Nullish<T> = T | null | undefined;

/**
 * A type that can be an array or a single value.
 */
export type MaybeArray<T> = T | T[];

/**
 * Infers the element type of an array
 * @param T - Array type
 * @returns The inferred element type
 *
 * @example
 * ```ts
 * type A = ElementOf<string[]>
 * // string
 * ```
 */
export type ElementOf<T> = T extends (infer E)[] ? E : never;

/**
 * Infers the arguments type of a function
 * @param T - Function type
 * @returns The inferred arguments type
 *
 * @example
 * ```ts
 * type A = InferArguments<(a: string, b: number) => void>
 * // [string, number]
 * ```
 */
export type InferArguments<T> = T extends ((...args: infer A) => any) ? A : never;

/**
 * Makes complex nested types more readable in editor tooltips by flattening
 * the type to a simple object type with all properties
 * @param T - The type to prettify
 * @returns A simplified representation of the same type
 *
 * @example
 * ```ts
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
 * @param T - The type to remove index signatures from
 * @returns A new type without index signatures
 *
 * @example
 * ```ts
 * type WithIndex = { id: number; [key: string]: any }
 * type Clean = RemoveIndexSignature<WithIndex>
 * // { id: number }
 * ```
 */
export type RemoveIndexSignature<T> = {
  // eslint-disable-next-line ts/no-empty-object-type
  [K in keyof T as {} extends Record<K, 1> ? never : K]: T[K]
};
