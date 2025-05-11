import { formatStr } from "./string";

export class InvariantError extends Error {
  constructor(public readonly message: string, ...positionals: any[]) {
    super(message);
    this.message = formatStr(message, ...positionals);
  }
}

/**
 * Asserts that a condition is truthy. If the condition is falsy, throws an InvariantError.
 * This function is useful for ensuring invariants and preconditions in code.
 *
 * @param {unknown} predicate - The condition to check
 * @param {string} message - Error message to display if the condition fails
 * @param {unknown[]} positionals - Values to substitute into the error message using formatStr
 * @throws {InvariantError} Throws when the predicate is falsy
 */
export function invariant(
  predicate: unknown,
  message: string,
  ...positionals: unknown[]
): asserts predicate {
  if (!predicate) {
    throw new InvariantError(message, ...positionals);
  }
}
