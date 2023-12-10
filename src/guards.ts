/**
 * Checks if a value is not null or undefined.
 *
 * @template T - The type of the input value.
 * @param {T | null | undefined} v - The value to check for not being null or undefined.
 * @returns {v is NonNullable<T>} - True if the value is not null or undefined, false otherwise.
 *
 * @example
 * ```ts
 * [true, false, 0, 1, "", "hello", null, undefined].filter(isNotNullish)
 * // [true, false, 0, 1, "", "hello"]
 * ```
 */
export function isNotNullish<T>(v: T | null | undefined): v is NonNullable<T> {
  return v != null;
}

/**
 * Checks if a value is not null.
 *
 * @template T - The type of the input value.
 * @param {T | null} v - The value to check for not being null.
 * @returns {v is Exclude<T, null>} True if the value is not null, false otherwise.
 *
 * @example
 * ```ts
 * [true, false, 0, 1, "", "hello", null, undefined].filter(isNotNull)
 * // [true, false, 0, 1, "", "hello", undefined]
 * ```
 */
export function isNotNull<T>(v: T | null): v is Exclude<T, null> {
  return v !== null;
}

/**
 * Checks if a value is defined.
 *
 * @template T - The type of the input value.
 * @param {T} v - The value to check for being defined.
 * @returns {v is Exclude<T, undefined>} True if the value is defined, false otherwise.
 *
 * @example
 * ```ts
 * [true, false, 0, 1, "", "hello", null, undefined].filter(isDefined)
 * // [true, false, 0, 1, "", "hello", null]
 * ```
 */
export function isNotUndefined<T>(v: T): v is Exclude<T, undefined> {
  return v !== undefined;
}

/**
 * Checks if a value is truthy, excluding null and undefined.
 *
 * @template T - The type of the input value.
 * @param {T} v - The value to check for truthiness.
 * @returns {v is NonNullable<T>} True if the value is truthy, false otherwise.
 *
 * @example
 * ```ts
 * [true, false, 0, 1, "", "hello", null, undefined].filter(isTruthy)
 * // [true, 1, "hello"]
 * ```
 */
export function isTruthy<T>(v: T): v is NonNullable<T> {
  return Boolean(v);
}
