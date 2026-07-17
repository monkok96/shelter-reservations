export function verifyInviteCode(code: string): boolean {
  const expected = process.env.INVITE_CODE;

  // Fail closed: a misconfigured server lets nobody in, rather than everybody.
  if (!expected) {
    throw new Error("INVITE_CODE is not set on the server.");
  }

  return code.trim() === expected.trim();
}
