# Handoff — item 2, fix 1 and the guard's relocation

For Fable 5.2, 2026-11-13 evening. Assumes no conversation history.

**State:** fix 1 and the weld guard are committed at `c795acd`. The two corrections from your
review are written and tested but **not yet committed**. Fixes 2 to 6 are **not started** — the
next session begins at fix 2 (the condition rider onto the attack).

**Suite:** 5155 tests, 209 suites. Print: 0 `save-unrollable` findings across all 329 monsters of
`srd52-monsters.json`. 2014: 1 of 970 rows, down from 2, and the survivor is a true positive.

---

## Your main point: the guard was upstream of the bug. Accepted, and moved.

Your diagnosis was exact. The monk's rider was complete when it was welded; the print-canon strip
then cut its Failure sentence and left the frame. A guard at the weld could not have fired on any of
the three monks — `kitImposes` is what saves them — and every other rider through that strip could
still lose its outcome.

The refusal now sits at the strip, in the shape you described:

```js
if (dropped.length && !saveIsUnrollable(beforeC) && saveIsUnrollable(e.text)) {
  trace('print canon rider kept — the strip would have broken it:', …);
  e.text = beforeC;
  dropped.length = 0;   // nothing dropped, so the rename owes nothing
}
```

The pass already kept `beforeC`, so this compares the row with itself through the one shared
predicate. No surgery, no new grammar. The weld guard stays for a rider that arrives half-built,
with a comment on it saying which of the two actually saves the monk, so nobody later mistakes the
guard for the fix.

Your framing — that the dangling save was created by existing string surgery in the first place — is
written into the comment at the site, because it is the reason the refusal belongs there and not
three steps earlier.

## Your 2014 sweep: one was mine, one is a real find

I reproduced both. **`src/data/srd-monsters.json` is the 2014 corpus** — 327 monsters, 970 rows — if
you want to re-run it yourself.

**The Rust Monster was my bug.** Its outcome is stated, in 2014's infinitive idiom:

> the creature can make a DC 11 Dexterity saving throw **to avoid** the rust monster's touch.

2014 also writes "or be knocked prone" and "taking 13 damage on a failed save". Enumerating those
would be the word list this engine does not write, so the outcome arm now judges the **labelled**
skeleton only — 2024's `*Dexterity Saving Throw*: DC 17, …`, where there is exactly one place for an
outcome and its absence is structural. The DC's position tells the two apart: 2024 labels the save
and then gives the DC, 2014 gives the DC and then names the ability. Both idioms are pinned in the
spec so the arm cannot quietly widen again.

**The Water Elemental is a defect in our data, not a false positive.** Whelm reads:

> A creature within 5 feet of the elemental can pull a creature or object out of it by taking an
> action to make a DC 14 Strength **and succeeding**.

Our 2014 copy dropped the word **check**. The rule noticed a genuine hole and merely described it as
a save problem. Same class as the Stone Giant, in the other corpus. **Not repaired** — it is a
one-word fix with the same script pattern, and it is the owner's call whether it happens now.

## Your other three

- **The alarm is still not wired to the gate.** Owed, and deliberately held: `save-unrollable` is
  `audit`, and `check-run` does not count it. I would rather repair Whelm first, or the first gated
  2014 run fails on a data defect rather than a generation defect, which is the worst way to
  introduce a gate.
- **The two-saves blind spot** — a row whose second save dangles still passes. Noted in neither code
  nor spec yet, deliberately: it has no known-bad sheet, and I would rather it waited for one than
  be fixed on a guess.
- **The naming nit** — taken. The guard's spec is now
  `a-half-built-rider-is-never-attached.spec.js`; the survival assertion lives in `pipelines.spec.js`
  beside the monk test whose harness it uses.

Thank you for confirming the test categories and the `pipelines.spec.js` placement. Both are settled
and I will not re-litigate them.

## Carried forward, unchanged and unstarted

- **The donor-matches-routed-line check on the block rung.** Still not written. It belongs on the
  `v-small` block rung, which has not run.
- **Item 4:** should a print body outrank an explicit role pick? The same rule gave the spider its
  web and gave Old Marta three Longswords, and Big Bob's STR 23 with a +7 attack off DEX sits with
  it.
- **Item 6:** `closest accepted` shipped a refused template on 4 of 8 sheets in the first v-route
  run. That path is what the honest exit replaces.

## What the next session does

Fix 2, then 3, 4, 5, with fix 6 last because it is the only one with a call-level rung. The batch is
`v-small.json`; every entry's `green` field states its own pass. The block rung runs once, at the
end, with the donor check added to it.
