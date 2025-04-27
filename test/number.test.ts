import { expect, it } from "vitest";

import { clamp } from "../src/number";

it("should clamp a value between a min and max value", () => {
  expect(clamp(5, 0, 10)).toEqual(5);
  expect(clamp(5, 10, 20)).toEqual(10);
  expect(clamp(5, 0, 4)).toEqual(4);
});
