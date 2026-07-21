import { describe, it, expect } from "vitest";
import { registerSchema, loginSchema } from "./auth";

const valid = {
  email: "ola@example.com",
  password: "haslo1234",
  inviteCode: "secret-code",
};

describe("registerSchema", () => {
  it("accepts valid input", () => {
    expect(registerSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an invalid email with the right key", () => {
    const result = registerSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("errors.invalidEmail");
    }
  });

  it("rejects a short password with the right key", () => {
    const result = registerSchema.safeParse({ ...valid, password: "short" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("errors.passwordTooShort");
    }
  });

  it("rejects a missing invite code with the right key", () => {
    const result = registerSchema.safeParse({ ...valid, inviteCode: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("errors.inviteRequired");
    }
  });
});

describe("loginSchema", () => {
  it("accepts valid input", () => {
    expect(loginSchema.safeParse({ email: "ola@example.com", password: "x" }).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({ email: "nope", password: "x" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("errors.invalidEmail");
    }
  });

  it("rejects an empty password", () => {
    const result = loginSchema.safeParse({ email: "ola@example.com", password: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("errors.passwordRequired");
    }
  });
});
