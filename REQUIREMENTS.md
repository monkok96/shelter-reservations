# Shelter Volunteer Walk Coordination — Requirements

> How to use this file:
> - Requirements have IDs (R1, R2, ...) so you can reference them in chat
> - In chat, say: "/project:implement R4" or "implement R4 and R5"
> - Mark done requirements with ✅

---

## Business case
A group of shelter volunteers take dogs on walks. They need to coordinate who
walks which dog and when, so that:
- dogs get walked without two volunteers showing up for the same dog at once (clashes),
- everyone can see the shared schedule,
- volunteers can flag the dogs they especially care for ("podopieczni").

Shelter staff/workers are NOT users of this app (out of scope for now).
The app is for the closed volunteer group only — not the public.

---

## Roles
- **Volunteer** — the only user. Registered dog walker. All volunteers are equal.
- **Admin** — DEFERRED. May add later (manage dogs, manage members) if the group wants it.

---

## Build order — start as simple as possible
Build **Phase 1 (MVP)** first — the smallest version that's actually useful
(register, add dogs, sign up for a walk without clashes, see the schedule).
Everything else is Phase 2+ and only built once the MVP works and the group likes it.

- **Phase 1 (MVP):** R1, R2, R4, R5, R6, R8, R10, R11, R12, R14
- **Phase 2:** R3 (rotate code), R7 (inactive dogs), R9 (dog detail), R13 (my walks),
  R15–R17 (podopieczni), R21 (invite link), R22–R23 (home board), R24 (log past walk),
  R25–R26 (dog labels), R27–R28 (opiekunowie)
- **Phase 3:** R18, R19 (PWA + offline), R20 (keep-alive ping), R29 (daily intent signalling)

---

## Features

### Access & accounts
- [ ] R1: A volunteer can register with email + password + a shared **invite code**
- [ ] R2: Registration is rejected if the invite code is wrong
- [ ] R3: The invite code can be changed without affecting already-registered volunteers
- [ ] R4: A volunteer can log in and log out
- [ ] R5: No part of the app is accessible without being logged in (no public pages)
- [ ] R21: Any logged-in volunteer can generate & share an invite link to the group
      (Splitwise-style) — not just an admin. The link carries the current invite code.

### Dogs
- [ ] R6: Any volunteer can add a dog (name, age, photo, short notes)
- [ ] R7: Any volunteer can mark a dog inactive (adopted / no longer at shelter)
- [ ] R8: Volunteers can browse the list of active dogs with photo + notes
- [ ] R9: Volunteers can view a single dog's detail page (info + upcoming walks)

### Home board / dashboard
- [ ] R22: On opening the app, a logged-in volunteer lands on a home board that surfaces the
      dogs that most need a walk — dogs with no walk registered (for today) shown at the top.
- [ ] R23: The board is sorted by walk-need: no walk yet at the top, then dogs walked only
      earlier in the day, etc.; reactive / special-handling dogs (see R26) pushed toward the bottom.

### Walks (the core)
- [ ] R10: A volunteer can sign up to walk a dog for a coarse slot — a date + time-of-day
      **bucket** (morning / afternoon / evening), in one tap from the list. No exact time or
      duration. Each bucket maps to display hours (e.g. morning 7–12, afternoon 12–17,
      evening 17–21 — exact hours configurable, see open questions).
- [ ] R11: A dog can have at most ONE walk per bucket. Reserving a bucket already taken for
      that dog is BLOCKED — this is the clash we prevent. (If volunteers go together, one signs
      up; they've coordinated offline. Group walks deferred.) A walk in a DIFFERENT bucket the
      same day is allowed, but the dog is then deprioritized on the home board (R23).
- [ ] R12: A volunteer can see the full upcoming walk schedule (all dogs, all volunteers)
- [ ] R13: A volunteer can see "my walks" (just their own upcoming walks)
- [ ] R14: A volunteer can cancel a walk they signed up for
- [ ] R24: A volunteer can mark a dog as walked after the fact (log a completed walk),
      not only reserve future ones — so the schedule reflects spontaneous, unplanned walks too.

### Dog attributes & labels
- [ ] R25: A dog can have custom handling labels/notes — e.g. reactive, hard to get out of the
      cage (warczy / bites the leash), very strong, needs a "wybieg" before the walk, doesn't
      toilet in the cage. Labels are custom/addable, not a fixed list.
- [ ] R26: Reactive / special-handling dogs are sorted toward the bottom of the "to walk"
      section so they're not grabbed by just anyone (feeds R23 sorting).

### Podopieczni / opiekunowie
- [ ] R15: A volunteer can mark/unmark a dog as one of their "podopieczni" (favorite/label only)
- [ ] R16: A volunteer can see a list of their podopieczni
- [ ] R17: (purely visual) dogs show who their podopieczni-volunteers are
- [ ] R27: A dog can have up to ~2–3 "opiekunowie" (caretakers) — the dog-side view of
      podopieczni. They're the responsible carers, but ANY volunteer can still walk the dog.
- [ ] R28: Dogs with no opiekun (e.g. newly arrived) are surfaced so they don't get overlooked.

### Intent signalling
- [ ] R29: A volunteer can loosely signal a day's intent without a firm reservation —
      "planning to come today" / "not coming today" — visible to others (walks are often
      spontaneous, so this is lighter than R10's reservation).

### PWA & infra
- [ ] R18: App is installable on mobile ("Add to Home Screen" on iOS/Android)
- [ ] R19: App works offline for browsing the schedule (cached); shows "no connection" when signing up offline
- [ ] R20: A free daily keep-alive ping (Vercel Cron) hits the app so Supabase never pauses from inactivity

---

## Non-functional requirements
- Mobile-first (volunteers will mostly use phones)
- Tailwind, responsive
- Single shelter (not multi-tenant)
- Deployed on Vercel (public URL, but content gated by login)
- All times stored UTC, displayed in shelter local time

---

## Deferred / maybe-later (not now)
- Group walks (multiple volunteers on one dog/slot, with their own coordination features)
- Admin role + permissions
- Podopieczni granting priority or exclusive rights on their dogs
- Notifications (email / push) when a dog has no walks scheduled
- Fair-distribution stats (who's walked how much)
- Adoption processing (opiekunowie handle adoptions — not an app feature for now)

---

## Decided
- ✅ Walk model: coarse buckets (date + morning/afternoon/evening), one tap. (R10)
- ✅ Second walk same day: allowed but deprioritized, not blocked. Same-bucket = blocked clash. (R11)

## Open questions
- [ ] What timezone is the shelter in, and what exact hours should each bucket map to?
- [ ] **Importing dogs**: can we import from the shelter's existing webpage, or is manual
      adding the realistic path? Needs to know if that page has structured data/an API.
