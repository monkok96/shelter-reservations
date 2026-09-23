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
- volunteers can flag the dogs they especially care for ("podopieczni"),
- volunteers can coordinate dogs that share a kennel ("boks"), which are usually walked together.

Shelter staff/workers are NOT users of this app (out of scope for now).
The app is for the closed volunteer group only — not the public.

---

## Roles
- **Volunteer** — the only user. Registered dog walker. All volunteers are equal.
- **Admin** — DEFERRED. May add later (manage dogs, manage members) if the group wants it.

---

## Coordination model (decided) — exception-based, minimal daily effort
The shelter churns fast: adoptions, new dogs, and (most often) workers reshuffling kennels.
Workers will NOT use the app. Volunteers keep it current, so every action must be near-effortless.
The app is **exception-based**: it assumes opiekunowie cover their own dogs, and only surfaces
what needs attention. A dog appears on the "needs help today" board only when:
- its opiekun signals **"I'm out"** for that day (the primary daily action — a *negative* signal,
  rarer and lighter than logging every walk), or
- it has **no opiekun**, or
- an opiekun **asks for help** (e.g. too many dogs in one kennel that day).
Most days, most volunteers do nothing. Positive "I'll take it" claims (R10) are OPTIONAL — used
mainly to stop two helpers showing up for the same dog.

**Opiekun priority (soft):** an opiekun's dogs are not shown as "open for anyone" unless the
opiekun signals absence or asks for help. No hard permissions — any volunteer can still help.

**Kennels replace the WhatsApp groups' *state* (not chat).** Volunteers follow/join kennels,
browse dogs, and see who covers them — this is how new volunteers catch up without being manually
added anywhere. Chat stays in WhatsApp for now (app complements it; no in-app chat/notifications yet).

**Far future (noted, not now):** a worker-facing dog-matching panel (size/temperament pairing).

---

## Build order — start as simple as possible
Build **Phase 1 (MVP)** first — the smallest version that's actually useful
(register, add dogs, sign up for a walk without clashes, see the schedule).
Everything else is Phase 2+ and only built once the MVP works and the group likes it.

- **Phase 1 (MVP):** R1, R2, R4, R5, R6, R8, R10, R11, R12, R14
- **Phase 2:** R3 (rotate code), R7 (inactive dogs), R9 (dog detail), R13 (my walks),
  R15–R17 (podopieczni), R21 (invite link), R32–R33 (kennels + assignment),
  R27–R28 (opiekunowie + soft priority), R38 (follow/join kennel — onboarding)
- **Phase 2.5 (exception-based coordination — the heart of the app):**
  R29 ("I'm out" signal), R37 ("needs help"), R22–R23 (needs-attention board),
  R34–R36 (kennel grouping/coordination/coverage), R10 (optional claim), R24 (log past walk),
  R25–R26 (dog labels)
- **Phase 3:** R18, R19 (PWA + offline), R20 (keep-alive ping)

---

## Features

### Access & accounts
- [x] R1: A volunteer can register with email + password + a shared **invite code** ✅
- [x] R2: Registration is rejected if the invite code is wrong ✅
- [ ] R3: The invite code can be changed without affecting already-registered volunteers
- [x] R4: A volunteer can log in and log out ✅
- [x] R5: No part of the app is accessible without being logged in (no public pages) ✅
- [ ] R21: Any logged-in volunteer can generate & share an invite link to the group
      (Splitwise-style) — not just an admin. The link carries the current invite code.

### Dogs
- [ ] R6: Any volunteer can add a dog (name, age, photo, short notes)
- [ ] R7: Any volunteer can mark a dog inactive (adopted / no longer at shelter)
- [ ] R8: Volunteers can browse the list of active dogs with photo + notes
- [ ] R9: Volunteers can view a single dog's detail page (info + upcoming walks)

### Home board / dashboard (exception-based)
- [ ] R22: On opening the app, a logged-in volunteer lands on a "needs attention today" board:
      dogs whose opiekun signalled "I'm out" (R29), dogs with no opiekun (R28), and dogs flagged
      "needs help" (R37). It is NOT a log of every walk — only the exceptions that need a human.
- [ ] R23: The board is sorted by urgency: no-opiekun and explicit help requests at the top,
      then opiekun-absent dogs; grouped by kennel (R34); reactive / special-handling dogs (R26)
      carry a clear warning so they aren't grabbed by just anyone.

### Walks (the core)
- [ ] R10: A volunteer can OPTIONALLY claim a walk ("I'll take it") for a dog + coarse slot — a
      date + time-of-day **bucket** (morning / afternoon / evening), in one tap. No exact time or
      duration. Not required daily (see Coordination model); mainly used so two helpers don't show
      up for the same dog. Each bucket maps to display hours (morning 7–12, afternoon 12–17,
      evening 17–21 — configurable, see open questions).
- [ ] R11: A dog can have at most ONE walk per bucket. Reserving a bucket already taken for
      that dog is BLOCKED — this is the clash we prevent. (If volunteers go together, one signs
      up; they've coordinated offline. Group walks deferred.) A walk in a DIFFERENT bucket the
      same day is allowed, but the dog is then deprioritized on the home board (R23).
- [ ] R12: A volunteer can see the full upcoming walk schedule (all dogs, all volunteers)
- [ ] R13: A volunteer can see "my walks" (just their own upcoming walks)
- [ ] R14: A volunteer can cancel a walk they signed up for
- [ ] R24: A volunteer can mark a dog as walked after the fact (log a completed walk),
      not only reserve future ones — so the schedule reflects spontaneous, unplanned walks too.

### Kennels (boksy) — grouping & walk coordination
Several dogs often share a **kennel** (PL "boks"). Dogs in a kennel are usually walked at the
same time (volunteers meet, head out and come back together, sometimes splitting mid-walk).
Reservations stay PER-DOG (no single group reservation — one person can't know when others are
free); the app's job is to make converging on the same slot easy.
- [ ] R32: A kennel is an entity (name/number). Any volunteer can create, rename, or remove a kennel.
- [ ] R33: Each dog can be assigned to one kennel (or none — e.g. new dogs). Any volunteer can
      move a dog to a different kennel when the shelter switches dogs around.
- [ ] R34: Dogs are grouped by kennel on the board/list, so boks-mates are visible together.
- [ ] R35: Coordination view — for a kennel + date + bucket, a volunteer sees which dogs already
      have a walk (and by whom) and which still need one, and can "join" by signing up for a
      remaining dog in the SAME date+bucket in one tap. Still per-dog reservations (R10/R11 apply).
- [ ] R36: A kennel shows an at-a-glance coverage summary for a slot, e.g. "Boks 5 — rano: 2/3",
      so volunteers can tell if a kennel is fully arranged for that time.

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
      podopieczni. They carry SOFT priority: their dogs aren't shown as "open for anyone" unless
      the opiekun signals absence (R29) or asks for help (R37). No hard permission — anyone can help.
- [ ] R28: Dogs with no opiekun (e.g. newly arrived) always surface on the needs-attention board.

### Signals & coordination (exception-based)
- [ ] R29: An opiekun can signal **"I'm out"** for a day (all their dogs, or a specific kennel/dog).
      Those dogs then surface on the needs-attention board (R22) as needing cover that day. This
      negative signal is the primary daily action — lighter than logging every walk.
- [ ] R37: An opiekun (or any volunteer) can flag a dog or a whole kennel as **"needs help"** for
      a day (e.g. too many dogs in the kennel to walk alone) — it surfaces prominently on R22.
- [ ] R38: A volunteer can **follow/join a kennel** (like joining its WhatsApp group). Browsing
      kennels and their dogs is the onboarding path: a new volunteer sees the current dogs and who
      covers them, and joins — no manual adding, no catching up on months of chat.

### Auth extras & i18n
- [ ] R30: Volunteers can sign up / log in with Google (OAuth), alongside email+password.
      The invite gate still applies: a first-time Google user must come through a valid invite
      link (code carried through the OAuth flow) — introduces a volunteer-profile concept.
- [x] R31: Bilingual UI (Polish + English) via next-intl — defaults to system/browser language,
      overridable in-app (NEXT_LOCALE cookie). ✅

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
- In-app chat / per-kennel announcements (chat stays in WhatsApp for now)
- Worker-facing dog-matching panel (size/temperament pairing) — far future
- "Walk again later today" nudge / second-walk emphasis — later; focus is one walk/day first
- Fair-distribution stats (who's walked how much)
- Adoption processing (opiekunowie handle adoptions — not an app feature for now)

---

## Decided
- ✅ **Primary goal: at least ONE walk per day per dog.** Most dogs walk once/day. A dog counts
  as "handled today" if it has ≥1 walk or its opiekun is covering it. This is what the
  needs-attention board is built around.
- ✅ Walk model: coarse buckets (date + morning/afternoon/evening), one tap. (R10)
- ✅ Second walk same day: allowed but deprioritized, not blocked. Same-bucket = blocked clash.
  A "you can walk this dog again this evening" nudge is a minor LATER nicety, not a focus. (R11)

## Open questions
- [ ] What timezone is the shelter in, and what exact hours should each bucket map to?
- [ ] **Importing dogs**: can we import from the shelter's existing webpage, or is manual
      adding the realistic path? Needs to know if that page has structured data/an API.
