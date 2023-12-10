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
 * Array, or not yet
 */
export type Arrayable<T> = T | Array<T>;

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
