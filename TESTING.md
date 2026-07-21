# Testing

## Automated tests (Vitest + Testing Library)

```bash
npm test           # run once
npm run test:watch # re-run on file changes
```

What's covered so far:

| File | What it checks |
|------|----------------|
| `lib/domain/inviteCode.test.ts` | invite code accept/reject, whitespace, case-sensitivity, fail-closed |
| `lib/domain/buckets.test.ts` | bucket order, lookup, hour formatting, no gaps/overlaps |
| `lib/validation/auth.test.ts` | register schema — valid input + each error key |
| `components/RegisterForm.test.tsx` | invite field shown/hidden, Polish vs English copy |
| `lib/auth/routes.test.ts` | which paths are public vs gated (login redirect logic) |
| `components/LoginForm.test.tsx` | login fields, register link, PL vs EN copy |

Convention: unit-test domain logic in `lib/` (the important seam). Component tests
render with `NextIntlClientProvider` and mock server-only modules.

---

## Manual test checklist (click-through)

Run the app first:

```bash
npm run dev   # http://localhost:3000
```

> Invite code for testing is whatever `INVITE_CODE` is in `.env.local`.
> Changing `.env.local` requires restarting `npm run dev`.

### Registration via invite link (R1)
- [ ] Open `/register/<your-invite-code>` → the invite-code field is **hidden**
- [ ] Fill a real email + password (8+ chars) → submit → "Check your email" message
- [ ] Check the inbox → a Supabase confirmation email arrives → link works
- [ ] Try submitting with a password shorter than 8 chars → validation error shown
- [ ] Try an invalid email (e.g. `abc`) → validation error shown

### Registration with a wrong code (R2)
- [ ] Open `/register/wrong-code` → submit valid email/password → "invite code isn't valid"
- [ ] Open `/register` (manual) → type a wrong code → same rejection
- [ ] Open `/register` → leave code empty → "invite code is required"

### Login & logout (R4)
- [ ] Register + confirm an account, then open `/login` → log in with those credentials → lands on home ("Hi, <email>")
- [ ] Wrong password → "Wrong email or password"
- [ ] Invalid email format → validation error
- [ ] Click "Log out" on the home page → returns to `/login`

### Gating — no access without login (R5)
- [ ] While logged out, open `/` directly → redirected to `/login`
- [ ] While logged out, `/login`, `/register`, `/register/<code>` still load (public)
- [ ] Log in, then open `/` → loads normally (no redirect)
- [ ] Log out, press browser back → still redirected to `/login` (no stale access)

### Language (R31)
- [ ] On `/register`, the PL/EN switcher (top-right) flips all copy
- [ ] Pick EN, reload the page → still English (cookie remembered)
- [ ] Delete the `NEXT_LOCALE` cookie / open a private window → shows your browser's language
- [ ] Switch to PL → labels read "E-mail", "Hasło", "Kod zaproszenia", "Załóż konto"

### General
- [ ] App works on a narrow (phone-width) screen — form is usable, nothing overflows
- [ ] No console errors in the browser devtools on load
