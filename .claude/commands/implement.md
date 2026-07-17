Implement the requirements from REQUIREMENTS.md identified by the IDs given in the arguments (e.g. "R1 R3").

Steps:
1. Read REQUIREMENTS.md and find the listed requirements
2. Read CLAUDE.md to confirm the stack and conventions
3. Implement each requirement one at a time, in order
4. Write tests for each requirement (per CLAUDE.md "tests are part of every feature"):
   unit tests for any domain logic, a component test for important UI behaviour, and
   update the manual checklist in TESTING.md
5. Run `npm test` — all tests must pass
6. After each one: show what files were created/changed and briefly explain any React/Next.js concept used
7. Mark each requirement as ✅ in REQUIREMENTS.md ONLY once its tests pass
8. Do not implement anything beyond what is listed — ask if unclear

Arguments: $ARGUMENTS
