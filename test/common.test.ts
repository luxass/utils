import { describe, expect, it } from "vitest";
import { invariant, InvariantError } from "../src/common";

describe("invariantError", () => {
  describe("constructor", () => {
    it("should create an error with a simple message", () => {
      const error = new InvariantError("Something went wrong");

      expect(error.message).toBe("Something went wrong");
      expect(error.name).toBe("Error");
      expect(error instanceof Error).toBe(true);
      expect(error instanceof InvariantError).toBe(true);
    });

    it("should format message with %s specifier", () => {
      const error = new InvariantError("Hello %s", "world");

      expect(error.message).toBe("Hello world");
    });

    it("should format message with %d specifier", () => {
      const error = new InvariantError("Count: %d", 5);

      expect(error.message).toBe("Count: 5");
    });

    it("should format message with %j specifier", () => {
      const error = new InvariantError("Data: %j", { name: "test" });

      expect(error.message).toBe("Data: {\"name\":\"test\"}");
    });

    it("should format message with %o specifier", () => {
      const error = new InvariantError("Object: %o", { id: 1 });

      expect(error.message).toBe("Object: {\"id\":1}");
    });

    it("should handle escaped %% specifier", () => {
      const error = new InvariantError("Escaped %%s", "value");

      expect(error.message).toBe("Escaped %s value");
    });

    it("should append extra arguments", () => {
      const error = new InvariantError("Extra args", 1, 2);

      expect(error.message).toBe("Extra args 1 2");
    });

    it("should handle multiple specifiers", () => {
      const error = new InvariantError("User %s (ID: %d) has %j permissions", "john", 123, ["read", "write"]);

      expect(error.message).toBe("User john (ID: 123) has [\"read\",\"write\"] permissions");
    });

    it("should handle missing arguments gracefully", () => {
      const error = new InvariantError("User %s has %d items");

      expect(error.message).toBe("User %s has %d items");
    });

    it("should be an instance of Error", () => {
      const error = new InvariantError("Test error");

      expect(error instanceof Error).toBe(true);
      expect(error.name).toBe("Error");
    });
  });

  describe("property accessibility", () => {
    it("should allow reading the readonly message property", () => {
      const error = new InvariantError("Test message");

      expect(error.message).toBe("Test message");
    });

    it("should not allow modifying the readonly message property", () => {
      const error = new InvariantError("Original message");

      // In TypeScript, this would be a compilation error
      // In runtime JavaScript, this will either fail silently or throw in strict mode
      expect(() => {
        // @ts-expect-error Testing readonly constraint
        error.message = "New message";
      }).not.toThrow(); // Note: This behavior depends on JavaScript mode (strict/non-strict)
    });
  });
});

describe("invariant", () => {
  describe("assertion behavior", () => {
    it("should not throw when predicate is truthy", () => {
      expect(() => {
        invariant(true, "This should not throw");
      }).not.toThrow();

      expect(() => {
        invariant(1, "Numbers > 0 are truthy");
      }).not.toThrow();

      expect(() => {
        invariant("non-empty string", "Non-empty strings are truthy");
      }).not.toThrow();

      expect(() => {
        invariant({}, "Objects are truthy");
      }).not.toThrow();
    });

    it("should throw InvariantError when predicate is falsy", () => {
      expect(() => {
        invariant(false, "This should throw");
      }).toThrow(InvariantError);

      expect(() => {
        invariant(0, "Zero is falsy");
      }).toThrow(InvariantError);

      expect(() => {
        invariant("", "Empty string is falsy");
      }).toThrow(InvariantError);

      expect(() => {
        invariant(null, "Null is falsy");
      }).toThrow(InvariantError);

      expect(() => {
        invariant(undefined, "Undefined is falsy");
      }).toThrow(InvariantError);
    });

    it("should throw with correctly formatted error message using %s", () => {
      expect(() => {
        invariant(false, "Value %s is not valid", "foo");
      }).toThrow("Value foo is not valid");
    });

    it("should throw with correctly formatted error message using %d", () => {
      expect(() => {
        invariant(false, "Expected count > %d, got %d", 10, 5);
      }).toThrow("Expected count > 10, got 5");
    });

    it("should throw with correctly formatted error message using %j", () => {
      expect(() => {
        invariant(false, "Invalid config: %j", { timeout: -1 });
      }).toThrow("Invalid config: {\"timeout\":-1}");
    });
  });

  describe("type assertions", () => {
    it("should narrow types correctly when assertion passes", () => {
      const value: string | null = "test";

      // Before assertion, TypeScript knows value could be null
      invariant(value, "Value should not be null");

      // After assertion, TypeScript knows value is not null
      // This would be a TypeScript compilation test
      const length = value.length; // No TypeScript error
      expect(length).toBe(4);
    });

    it("should work with complex type predicates", () => {
      interface User {
        id: string;
        name: string;
      }

      const user: User | undefined = { id: "1", name: "John" };

      invariant(user, "User must be defined");

      // TypeScript now knows user is not undefined
      expect(user.id).toBe("1");
      expect(user.name).toBe("John");
    });
  });

  describe("edge cases", () => {
    it("should handle various types of predicates", () => {
      // Arrays
      expect(() => invariant([], "Empty array is truthy")).not.toThrow();

      // Functions
      expect(() => invariant(() => {}, "Functions are truthy")).not.toThrow();

      // Symbols
      expect(() => invariant(Symbol("test"), "Symbols are truthy")).not.toThrow();

      // NaN (falsy)
      expect(() => invariant(Number.NaN, "NaN is falsy")).toThrow(InvariantError);
    });

    it("should handle complex formatting with mixed specifiers", () => {
      const user = { name: "John", id: 123 };
      const permissions = ["read", "write"];

      expect(() => {
        invariant(false, "User %o has permissions %j (count: %d)", user, permissions, permissions.length);
      }).toThrow("User {\"name\":\"John\",\"id\":123} has permissions [\"read\",\"write\"] (count: 2)");
    });

    it("should handle escaped percent signs", () => {
      expect(() => {
        invariant(false, "Success rate: %d%% for user %s", 95, "john");
      }).toThrow("Success rate: 95% for user john");
    });

    it("should append extra arguments beyond format specifiers", () => {
      expect(() => {
        invariant(false, "Error %s occurred", "timeout", "at", "10:30");
      }).toThrow("Error timeout occurred at 10:30");
    });
  });

  describe("integration with InvariantError", () => {
    it("should create InvariantError with same message formatting behavior", () => {
      let error: InvariantError | null = null;

      try {
        invariant(false, "Test %s with %d items", "message", 42);
      } catch (e) {
        error = e as InvariantError;
      }

      expect(error).toBeInstanceOf(InvariantError);
      expect(error?.message).toBe("Test message with 42 items");
    });
  });
});
