import { formatStr } from "./string";

export class InvariantError extends Error {
  constructor(public readonly message: string, ...positionals: any[]) {
    super(message);
    this.message = formatStr(message, ...positionals);
  }
}

export function invariant(
  predicate: unknown,
  message: string,
  ...positionals: unknown[]
): asserts predicate {
  if (!predicate) {
    throw new InvariantError(message, ...positionals);
  }
}
