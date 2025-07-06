import { describe, expect, it } from "vitest";
import {
  appendTrailingSlash,
  joinURL,
  prependLeadingSlash,
  trimLeadingSlash,
  trimTrailingSlash,
} from "../src/path";

describe("trimTrailingSlash", () => {
  it("should remove trailing slashes from strings", () => {
    expect(trimTrailingSlash("path/to/file/")).toBe("path/to/file");
    expect(trimTrailingSlash("path/to/file")).toBe("path/to/file");
    expect(trimTrailingSlash("/path/to/file/")).toBe("/path/to/file");
    expect(trimTrailingSlash("/path/to/file")).toBe("/path/to/file");
  });

  it("should handle strings with multiple trailing slashes", () => {
    expect(trimTrailingSlash("path/to/file///")).toBe("path/to/file");
    expect(trimTrailingSlash("/path/to/file///")).toBe("/path/to/file");
  });

  it("should not modify strings without trailing slashes", () => {
    expect(trimTrailingSlash("path/to/file")).toBe("path/to/file");
    expect(trimTrailingSlash("/path/to/file")).toBe("/path/to/file");
  });

  it("should handle empty strings", () => {
    expect(trimTrailingSlash("")).toBe("/");
  });
});

describe("trimLeadingSlash", () => {
  it("should remove leading slashes from strings", () => {
    expect(trimLeadingSlash("/path/to/file")).toBe("path/to/file");
    expect(trimLeadingSlash("path/to/file")).toBe("path/to/file");
    expect(trimLeadingSlash("//path/to/file")).toBe("path/to/file");
    expect(trimLeadingSlash("/path/to/file/")).toBe("path/to/file/");
  });

  it("should handle strings with multiple leading slashes", () => {
    expect(trimLeadingSlash("//path/to/file")).toBe("path/to/file");
    expect(trimLeadingSlash("///path/to/file")).toBe("path/to/file");
  });

  it("should not modify strings without leading slashes", () => {
    expect(trimLeadingSlash("path/to/file")).toBe("path/to/file");
    expect(trimLeadingSlash("/path/to/file/")).toBe("path/to/file/");
  });

  it("should handle empty strings", () => {
    expect(trimLeadingSlash("")).toBe("/");
  });
});

describe("appendTrailingSlash", () => {
  it("should append a trailing slash if not present", () => {
    expect(appendTrailingSlash("path/to/file")).toBe("path/to/file/");
    expect(appendTrailingSlash("/path/to/file")).toBe("/path/to/file/");
  });

  it("should not modify strings that already have a trailing slash", () => {
    expect(appendTrailingSlash("path/to/file/")).toBe("path/to/file/");
    expect(appendTrailingSlash("/path/to/file/")).toBe("/path/to/file/");
  });

  it("should modify empty strings", () => {
    expect(appendTrailingSlash("")).toBe("/");
  });
});

describe("prependLeadingSlash", () => {
  it("should prepend a leading slash if not present", () => {
    expect(prependLeadingSlash("path/to/file")).toBe("/path/to/file");
    expect(prependLeadingSlash("path/to/file/")).toBe("/path/to/file/");
  });

  it("should not modify strings that already have a leading slash", () => {
    expect(prependLeadingSlash("/path/to/file")).toBe("/path/to/file");
    expect(prependLeadingSlash("/path/to/file/")).toBe("/path/to/file/");
  });

  it("should modify empty strings", () => {
    expect(prependLeadingSlash("")).toBe("/");
  });
});

describe("joinURL", () => {
  it("should join two URL paths without slashes", () => {
    expect(joinURL("api", "users")).toBe("api/users");
    expect(joinURL("path", "to")).toBe("path/to");
  });

  it("should handle base path with trailing slash", () => {
    expect(joinURL("api/", "users")).toBe("api/users");
    expect(joinURL("path/", "to")).toBe("path/to");
  });

  it("should handle path with leading slash", () => {
    expect(joinURL("api", "/users")).toBe("api/users");
    expect(joinURL("path", "/to")).toBe("path/to");
  });

  it("should handle both base with trailing slash and path with leading slash", () => {
    expect(joinURL("api/", "/users")).toBe("api/users");
    expect(joinURL("path/", "/to")).toBe("path/to");
  });

  it("should handle empty base path", () => {
    expect(joinURL("", "users")).toBe("users");
    expect(joinURL("", "/users")).toBe("/users");
  });

  it("should handle empty path", () => {
    expect(joinURL("api", "")).toBe("api");
    expect(joinURL("api/", "")).toBe("api/");
  });

  it("should handle root base path", () => {
    expect(joinURL("/", "users")).toBe("users");
    expect(joinURL("/", "/users")).toBe("/users");
  });

  it("should handle root path", () => {
    expect(joinURL("api", "/")).toBe("api");
    expect(joinURL("api/", "/")).toBe("api/");
  });

  it("should handle both undefined paths", () => {
    expect(joinURL(undefined, undefined)).toBe("/");
  });

  it("should handle undefined base path", () => {
    expect(joinURL(undefined, "users")).toBe("users");
    expect(joinURL(undefined, "/users")).toBe("/users");
  });

  it("should handle undefined path", () => {
    expect(joinURL("api", undefined)).toBe("api");
    expect(joinURL("api/", undefined)).toBe("api/");
  });
});
