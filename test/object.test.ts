import { describe, expect, it } from "vitest";
import { getChangedKeys, getOwnProperty, hasOwnProperty, omit } from "../src/object";

describe("hasOwnProperty", () => {
  it("should return true for own properties", () => {
    const obj = { name: "John", age: 30 };
    expect(hasOwnProperty(obj, "name")).toBe(true);
    expect(hasOwnProperty(obj, "age")).toBe(true);
  });

  it("should return false for inherited properties", () => {
    const obj = { name: "John" };
    expect(hasOwnProperty(obj, "toString")).toBe(false);
    expect(hasOwnProperty(obj, "hasOwnProperty")).toBe(false);
  });

  it("should return false for non-existent properties", () => {
    const obj = { name: "John" };
    expect(hasOwnProperty(obj, "missing")).toBe(false);
  });

  it("should work with empty objects", () => {
    const obj = {};
    expect(hasOwnProperty(obj, "anything")).toBe(false);
  });

  it("should work with objects created with null prototype", () => {
    const obj = Object.create(null);
    obj.name = "John";
    expect(hasOwnProperty(obj, "name")).toBe(true);
    expect(hasOwnProperty(obj, "toString")).toBe(false);
  });
});

describe("getOwnProperty", () => {
  it("should return the property value for own properties", () => {
    const obj = { name: "John", age: 30 };
    expect(getOwnProperty(obj, "name")).toBe("John");
    expect(getOwnProperty(obj, "age")).toBe(30);
  });

  it("should return undefined for inherited properties", () => {
    const obj = { name: "John" };
    expect(getOwnProperty(obj, "toString")).toBeUndefined();
  });

  it("should return undefined for non-existent properties", () => {
    const obj = { name: "John" };
    expect(getOwnProperty(obj, "missing")).toBeUndefined();
  });

  it("should handle falsy values correctly", () => {
    const obj = { zero: 0, empty: "", nullValue: null, undefinedValue: undefined };
    expect(getOwnProperty(obj, "zero")).toBe(0);
    expect(getOwnProperty(obj, "empty")).toBe("");
    expect(getOwnProperty(obj, "nullValue")).toBeNull();
    expect(getOwnProperty(obj, "undefinedValue")).toBeUndefined();
  });

  it("should work with complex values", () => {
    const obj = {
      array: [1, 2, 3],
      nested: { key: "value" },
      func: () => "test",
    };
    expect(getOwnProperty(obj, "array")).toEqual([1, 2, 3]);
    expect(getOwnProperty(obj, "nested")).toEqual({ key: "value" });
    expect(typeof getOwnProperty(obj, "func")).toBe("function");
  });

  it("should work with empty objects", () => {
    const obj = {};
    expect(getOwnProperty(obj, "anything")).toBeUndefined();
  });
});

describe("getChangedKeys", () => {
  it("should return keys where values differ", () => {
    const obj1 = { name: "John", age: 30, city: "NYC" };
    const obj2 = { name: "John", age: 31, city: "NYC" };
    expect(getChangedKeys(obj1, obj2)).toEqual(["age"]);
  });

  it("should return multiple changed keys", () => {
    const obj1 = { name: "John", age: 30, city: "NYC" };
    const obj2 = { name: "Jane", age: 31, city: "NYC" };
    expect(getChangedKeys(obj1, obj2)).toEqual(["name", "age"]);
  });

  it("should return empty array when objects are identical", () => {
    const obj1 = { name: "John", age: 30, city: "NYC" };
    const obj2 = { name: "John", age: 30, city: "NYC" };
    expect(getChangedKeys(obj1, obj2)).toEqual([]);
  });

  it("should handle special values with Object.is comparison", () => {
    const obj1 = { nan: Number.NaN, negZero: -0, posZero: +0 };
    const obj2 = { nan: Number.NaN, negZero: +0, posZero: -0 };
    expect(getChangedKeys(obj1, obj2)).toEqual(["negZero", "posZero"]);
  });

  it("should handle null and undefined correctly", () => {
    const obj1 = { a: null, b: undefined };
    const obj2 = { a: undefined, b: null };
    expect(
      getChangedKeys(
        obj1,
        // @ts-expect-error They are not the same type, but we want to test the function
        obj2,
      ),
    ).toEqual(["a", "b"]);
  });

  it("should only check keys from first object", () => {
    const obj1 = { name: "John" };
    const obj2 = { name: "John", age: 30 };
    expect(getChangedKeys(obj1, obj2)).toEqual([]);
  });

  it("should work with empty objects", () => {
    const obj1 = {};
    const obj2 = {};
    expect(getChangedKeys(obj1, obj2)).toEqual([]);
  });
});

describe("omit", () => {
  it("should omit specified keys", () => {
    const obj = { name: "John", age: 30, city: "NYC", country: "USA" };
    const result = omit(obj, ["age", "country"]);
    expect(result).toEqual({ name: "John", city: "NYC" });
  });

  it("should return a new object without modifying the original", () => {
    const obj = { name: "John", age: 30, city: "NYC" };
    const result = omit(obj, ["age"]);
    expect(obj).toEqual({ name: "John", age: 30, city: "NYC" });
    expect(result).toEqual({ name: "John", city: "NYC" });
  });

  it("should handle non-existent keys gracefully", () => {
    const obj = { name: "John", age: 30 };
    const result = omit(obj, ["missing", "age"]);
    expect(result).toEqual({ name: "John" });
  });

  it("should work with empty key array", () => {
    const obj = { name: "John", age: 30 };
    const result = omit(obj, []);
    expect(result).toEqual({ name: "John", age: 30 });
  });

  it("should work with empty object", () => {
    const obj = {};
    const result = omit(obj, ["anything"]);
    expect(result).toEqual({});
  });

  it("should omit all keys when all are specified", () => {
    const obj = { name: "John", age: 30 };
    const result = omit(obj, ["name", "age"]);
    expect(result).toEqual({});
  });

  it("should handle complex values", () => {
    const obj = {
      simple: "string",
      array: [1, 2, 3],
      nested: { key: "value" },
      func: () => "test",
    };
    const result = omit(obj, ["array", "func"]);
    expect(result).toEqual({
      simple: "string",
      nested: { key: "value" },
    });
  });
});
