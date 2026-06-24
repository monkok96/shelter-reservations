# Shelter Reservations — Claude Context

## Project
Walk-coordination app for animal shelter volunteers. A closed group of volunteers
sign up to walk specific dogs and pick their walk times. Everyone sees the shared
schedule so walks don't clash (preventing double-booking is the core goal).
Not a public-facing app — access is gated by an invite code at registration.

## Stack
- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Backend/DB/Auth/Storage**: Supabase (PostgreSQL, auth, file storage for animal photos)
- **Supabase client**: `@supabase/supabase-js` + `@supabase/ssr` for Next.js
- **Hosting**: Vercel
- **PWA**: next-pwa (installable on mobile from browser)
- **Auth**: Supabase Auth — volunteers register with email/password + a shared invite code; no public/anonymous access

## Conventions
- TypeScript everywhere, strict mode
- No `any` types
- Component files: PascalCase (`BookingForm.tsx`) inside `app/` or `components/`
- Utility/hook files: camelCase (`useReservations.ts`) inside `lib/` or `hooks/`
- Supabase client lives in `lib/supabase/` — server client and browser client are separate files
- Server components by default — add `"use client"` only when needed (event handlers, hooks)
- Keep components small — extract logic into hooks or server actions
- Tailwind only — no inline styles, no CSS modules
- All dates/times stored as UTC ISO strings, displayed in shelter's local timezone

## Design principles
- Should NOT look like a generic AI-generated app. Restrained, human, purposeful.
- Use emojis sparingly or not at all in the UI — no emoji-as-icon walls.
- Avoid the "AI default" look: giant centered gradient hero, purple-to-pink gradients,
  oversized rounded cards everywhere, generic "Welcome to..." copy, excessive shadows.
- Prefer a calm, practical layout that suits a utility used quickly on a phone.
- Real, specific copy ("3 dogs still need a morning walk"), not filler.
- A small amount of personality is fine (it's about dogs) — just make it feel intentional.

## Code quality / good practices
Guiding balance: **simple now, but easy to extend.** Keep the code minimal, but leave clean
seams so Phase 2/3 features slot in without a rewrite. Use a pattern when it buys real
extensibility or clarity — skip it when it's just ceremony. Bias toward the cheap, high-value
patterns below; avoid heavyweight ones (DI containers, repositories, global state libs) until a
concrete need appears.

- Pragmatic over clever; readability first (beginner-friendly codebase).
- **Domain logic lives in `lib/`, never in components** — clash check, bucket↔hours, board
  sorting/priority. UI calls these. This is the #1 seam: rules change in one place.
- **Data access goes through a thin typed layer** (`lib/queries/`), not raw Supabase calls
  sprinkled in components — so a schema change touches one file, and screens stay declarative.
- **Model domain types as data, open for extension**: buckets, dog-labels, walk-priority are
  config/enums in one module — adding a bucket or label is a one-line change, not a hunt.
- Validate input at the boundary (server actions / API) with zod; trust nothing from the client.
- Small, named, single-purpose functions and components. Extract at a real seam, not on a line count.
- Handle the unhappy path: loading, empty, and error states for every data view.
- Prefer composition over flags: a new variant = a new small component, not another boolean prop.
- Keep secrets in env vars (`.env.local`), never in code or git.
- When a pattern IS introduced, add a one-line comment on *why* — so it teaches, not mystifies.

## What NOT to do
- Do not add features not in REQUIREMENTS.md without asking
- Do not install new dependencies without confirming with user
- Do not commit directly — user reviews all changes
- Do not use `any` in TypeScript

## Testing
Vitest + Testing Library for unit/component tests. Run with `npm test`.

## Running locally
```bash
npm install
npm run dev       # starts at http://localhost:3000
```

## Key domain concepts
- **Volunteer** — a registered user (dog walker). The only type of user. Joins via invite code.
- **Dog** — has name, age, photo, notes, and an active/inactive status (e.g. adopted = inactive)
- **Walk** — a volunteer signs up to walk a dog for a coarse slot: a date + time-of-day
  **bucket** (morning / afternoon / evening). No exact time or duration. Buckets map to
  display hours (configurable). Walks can also be logged after the fact (spontaneous walks).
- **Bucket** — morning / afternoon / evening. A dog has at most one walk per bucket.
- **Podopieczny / opiekun** — a dog a volunteer marks as "their" special-care dog (volunteer
  side: podopieczny; dog side: opiekun, max ~2–3). Currently just a favorite/label for
  visibility — grants NO special permissions; any volunteer can still walk any dog.
- **Clash** — two volunteers reserving the same dog in the same bucket. BLOCKED. A second walk
  in a *different* bucket the same day is allowed, but deprioritizes the dog on the home board.
- **Admin** — deferred. Not built yet. All volunteers are equal for now.
