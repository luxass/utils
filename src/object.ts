/**
 * Checks if an object has a specific property as its own property (not inherited).
 *
 * @param {object} obj - The object to check
 * @param {string} key - The property key to check for
 * @returns {boolean} `true` if the object has the property as its own property, `false` otherwise
 *
 * @example
 * ```typescript
 * import { hasOwnProperty } from '@luxass/utils/object';
 *
 * const obj = { name: 'John' };
 * hasOwnProperty(obj, 'name'); // true
 * hasOwnProperty(obj, 'toString'); // false (inherited)
 * ```
 */
export function hasOwnProperty(obj: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Safely gets an own property value from an object, returning undefined if the property doesn't exist.
 *
 * This function provides type-safe property access with multiple overloads:
 * - For objects with known key-value types, returns the value type or undefined
 * - For generic objects, returns the property value type or undefined
 * - Fallback returns unknown type
 *
 * @param {object} obj - The object to get the property from
 * @param {string} key - The property key to retrieve
 * @returns {unknown} The property value if it exists as an own property, undefined otherwise
 *
 * @example
 * ```typescript
 * import { getOwnProperty } from '@luxass/utils/object';
 *
 * const obj = { name: 'John', age: 30 };
 * getOwnProperty(obj, 'name'); // 'John'
 * getOwnProperty(obj, 'missing'); // undefined
 * ```
 */
export function getOwnProperty<K extends string, V>(
  obj: Partial<Record<K, V>>,
  key: K,
): V | undefined;
export function getOwnProperty<O extends object>(obj: O, key: string): O[keyof O] | undefined;
export function getOwnProperty(obj: object, key: string): unknown;
export function getOwnProperty(obj: object, key: string): unknown {
  if (!hasOwnProperty(obj, key)) {
    return undefined;
  }
  // @ts-expect-error we know the property exists
  return obj[key];
}

/**
 * Compares two objects and returns an array of keys where the values differ.
 *
 * Uses Object.is() for comparison, which handles special cases like NaN and -0/+0 correctly.
 * Only checks keys that exist in the first object.
 *
 * @template T - The type of objects being compared
 * @param {T} obj1 - The first object to compare
 * @param {T} obj2 - The second object to compare
 * @returns {(keyof T)[]} An array of keys where the values differ between the two objects
 *
 * @example
 * ```typescript
 * import { getChangedKeys } from '@luxass/utils/object';
 *
 * const obj1 = { name: 'John', age: 30, city: 'NYC' };
 * const obj2 = { name: 'John', age: 31, city: 'NYC' };
 * getChangedKeys(obj1, obj2); // ['age']
 * ```
 */
export function getChangedKeys<T extends object>(obj1: T, obj2: T): (keyof T)[] {
  const result: (keyof T)[] = [];
  for (const key in obj1) {
    if (!Object.is(obj1[key], obj2[key])) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a new object with specified keys omitted from the original object.
 *
 * This function creates a shallow copy of the input object and removes the specified keys.
 * The original object is not modified.
 *
 * @param {Record<string, unknown>} obj - The source object to omit keys from
 * @param {ReadonlyArray<string>} keys - An array of key names to omit from the object
 * @returns {Record<string, unknown>} A new object with the specified keys removed
 *
 * @example
 * ```typescript
 * import { omit } from '@luxass/utils/object';
 *
 * const obj = { name: 'John', age: 30, city: 'NYC', country: 'USA' };
 * omit(obj, ['age', 'country']); // { name: 'John', city: 'NYC' }
 * ```
 */
export function omit(
  obj: Record<string, unknown>,
  keys: ReadonlyArray<string>,
): Record<string, unknown> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}
