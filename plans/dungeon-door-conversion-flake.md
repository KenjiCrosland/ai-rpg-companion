# Dungeon door-conversion invariant flake

**Trigger:** any work touching `src/tools/dungeon-generator` room/door
generation, or the next time `generate-dungeon.spec.js` fails in CI/full runs.

**Problem:** the randomized invariant test in
`src/tools/dungeon-generator/__tests__/generate-dungeon.spec.js` fails at low
probability with:

```
INVARIANT FAILED (run 36): key room 2 still has a locked door — door-conversion missed it
```

Observed once during a full `npm test` on 2026-07-27 (statblock-only session —
no dungeon code was touched); the spec passed on immediate re-runs. The test
generates many random layouts per run, so this is a REAL latent bug in the
door-conversion pass that only certain layouts expose — roughly: a key room
can retain a locked door after conversion, presumably when [layout condition
unknown — the failing seed was not captured].

**Recommended approach:**
1. Make the failure reproducible first: log/derive the RNG seed per run in the
   invariant harness so a failing layout can be replayed (the current failure
   message dumps rooms but not the seed).
2. Then trace the door-conversion pass for the case where a key room's locked
   door survives — likely an ordering issue between key placement and door
   conversion, or a room reached via multiple doors where only one is
   converted.
3. Do NOT loosen the invariant — it caught a genuine reachability bug class
   (player could be locked out of a key room).
