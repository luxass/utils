/**
 * Clamp a value between a min and max value.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number} the clamped value
 *
 * @example
 * ```ts
 * clamp(5, 0, 10)
 * // 5
 *
 * clamp(5, 10, 20)
 * // 10
 *
 * clamp(5, 0, 4)
 * // 4
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
