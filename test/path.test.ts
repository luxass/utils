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
  describe("basic joining", () => {
    it("should join two URL paths without slashes", () => {
      expect(joinURL("api", "users")).toBe("api/users");
      expect(joinURL("path", "to")).toBe("path/to");
      expect(joinURL("v1", "endpoint")).toBe("v1/endpoint");
    });

    it("should join multiple segments properly", () => {
      expect(joinURL("api/v1", "users")).toBe("api/v1/users");
      expect(joinURL("base", "path/to/file")).toBe("base/path/to/file");
    });
  });

  describe("slash handling", () => {
    it("should handle base path with trailing slash", () => {
      expect(joinURL("api/", "users")).toBe("api/users");
      expect(joinURL("path/", "to")).toBe("path/to");
      expect(joinURL("base/", "endpoint")).toBe("base/endpoint");
    });

    it("should handle path with leading slash", () => {
      expect(joinURL("api", "/users")).toBe("api/users");
      expect(joinURL("path", "/to")).toBe("path/to");
      expect(joinURL("base", "/endpoint")).toBe("base/endpoint");
    });

    it("should handle both base with trailing slash and path with leading slash", () => {
      expect(joinURL("api/", "/users")).toBe("api/users");
      expect(joinURL("path/", "/to")).toBe("path/to");
      expect(joinURL("base/", "/endpoint")).toBe("base/endpoint");
    });

    it("should handle multiple trailing slashes in base", () => {
      expect(joinURL("api//", "users")).toBe("api/users");
      expect(joinURL("path///", "to")).toBe("path/to");
    });

    it("should handle multiple leading slashes in path", () => {
      expect(joinURL("api", "//users")).toBe("api/users");
      expect(joinURL("path", "///to")).toBe("path/to");
    });
  });

  describe("empty and undefined values", () => {
    it("should handle empty strings", () => {
      expect(joinURL("", "users")).toBe("users");
      expect(joinURL("", "/users")).toBe("/users");
      expect(joinURL("", "")).toBe("/");
      expect(joinURL("api", "")).toBe("api");
      expect(joinURL("api/", "")).toBe("api/");
    });
  });

  describe("root path handling", () => {
    it("should handle root base path", () => {
      expect(joinURL("/", "users")).toBe("/users");
      expect(joinURL("/", "/users")).toBe("/users");
      expect(joinURL("/", "")).toBe("/");
    });

    it("should handle root path parameter by appending trailing slash", () => {
      expect(joinURL("api", "/")).toBe("api/");
      expect(joinURL("api/", "/")).toBe("api/");
      expect(joinURL("", "/")).toBe("/");
    });
  });

  describe("special characters and encoding", () => {
    it("should handle paths with special characters", () => {
      expect(joinURL("api", "user%20name")).toBe("api/user%20name");
      expect(joinURL("files", "document.pdf")).toBe("files/document.pdf");
      expect(joinURL("search", "query?param=value")).toBe("search/query?param=value");
    });

    it("should handle paths with spaces", () => {
      expect(joinURL("my folder", "my file")).toBe("my folder/my file");
      expect(joinURL("path with spaces/", "/file with spaces")).toBe("path with spaces/file with spaces");
    });

    it("should handle paths with query parameters", () => {
      expect(joinURL("api", "users?limit=10")).toBe("api/users?limit=10");
      expect(joinURL("base/", "/search?q=test&sort=date")).toBe("base/search?q=test&sort=date");
    });

    it("should handle paths with fragments", () => {
      expect(joinURL("docs", "page#section")).toBe("docs/page#section");
      expect(joinURL("guide/", "/intro#getting-started")).toBe("guide/intro#getting-started");
    });
  });

  describe("complex scenarios", () => {
    it("should handle deeply nested paths", () => {
      expect(joinURL("api/v1/users", "123/profile/settings")).toBe("api/v1/users/123/profile/settings");
      expect(joinURL("/app/admin/", "/users/edit/form")).toBe("/app/admin/users/edit/form");
    });

    it("should handle mixed slash patterns", () => {
      expect(joinURL("api//v1/", "//users///")).toBe("api/v1/users/");
      expect(joinURL("base///", "///path")).toBe("base/path");
    });

    it("should maintain URL structure integrity", () => {
      expect(joinURL("https://api.example.com", "v1/users")).toBe("https://api.example.com/v1/users");
      expect(joinURL("https://api.example.com/", "/v1/users")).toBe("https://api.example.com/v1/users");
      expect(joinURL("https://api.example.com/v1", "users/123")).toBe("https://api.example.com/v1/users/123");
      expect(joinURL("https://api.example.com/v1/", "/users/123")).toBe("https://api.example.com/v1/users/123");
    });
  });
});
