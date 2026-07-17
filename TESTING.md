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

### Language (R31)
- [ ] On `/register`, the PL/EN switcher (top-right) flips all copy
- [ ] Pick EN, reload the page → still English (cookie remembered)
- [ ] Delete the `NEXT_LOCALE` cookie / open a private window → shows your browser's language
- [ ] Switch to PL → labels read "E-mail", "Hasło", "Kod zaproszenia", "Załóż konto"

### General
- [ ] App works on a narrow (phone-width) screen — form is usable, nothing overflows
- [ ] No console errors in the browser devtools on load
