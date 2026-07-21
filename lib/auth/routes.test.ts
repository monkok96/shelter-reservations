import { describe, it, expect } from "vitest";
import { isPublicPath } from "./routes";

describe("isPublicPath", () => {
  it("treats auth pages as public", () => {
    expect(isPublicPath("/login")).toBe(true);
    expect(isPublicPath("/register")).toBe(true);
    expect(isPublicPath("/register/some-code")).toBe(true);
    expect(isPublicPath("/auth/callback")).toBe(true);
  });

  it("treats app pages as private", () => {
    expect(isPublicPath("/")).toBe(false);
    expect(isPublicPath("/dogs")).toBe(false);
    expect(isPublicPath("/walks")).toBe(false);
  });

  it("does not match on prefix collisions", () => {
    expect(isPublicPath("/login-history")).toBe(false);
    expect(isPublicPath("/registered-dogs")).toBe(false);
  });
});
