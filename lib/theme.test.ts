import { describe, it, expect } from "vitest";
import { isTheme } from "./theme";

describe("isTheme", () => {
  it("accepts known themes", () => {
    expect(isTheme("light")).toBe(true);
    expect(isTheme("dark")).toBe(true);
  });

  it("rejects unknown or empty values", () => {
    expect(isTheme("blue")).toBe(false);
    expect(isTheme("")).toBe(false);
    expect(isTheme(undefined)).toBe(false);
    expect(isTheme(null)).toBe(false);
  });
});
