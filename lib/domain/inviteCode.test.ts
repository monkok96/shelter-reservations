import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { verifyInviteCode } from "./inviteCode";

describe("verifyInviteCode", () => {
  const original = process.env.INVITE_CODE;

  beforeEach(() => {
    process.env.INVITE_CODE = "secret-code";
  });

  afterEach(() => {
    process.env.INVITE_CODE = original;
  });

  it("accepts the exact code", () => {
    expect(verifyInviteCode("secret-code")).toBe(true);
  });

  it("ignores surrounding whitespace", () => {
    expect(verifyInviteCode("  secret-code  ")).toBe(true);
  });

  it("rejects a wrong code", () => {
    expect(verifyInviteCode("nope")).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(verifyInviteCode("")).toBe(false);
  });

  it("is case-sensitive", () => {
    expect(verifyInviteCode("SECRET-CODE")).toBe(false);
  });

  it("throws if the server has no code configured (fail closed)", () => {
    delete process.env.INVITE_CODE;
    expect(() => verifyInviteCode("anything")).toThrow();
  });
});
