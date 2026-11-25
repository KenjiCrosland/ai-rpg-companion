# HANDOFF — a one-creature row stays on one creature and gains half a hit

2026-11-25 · branch `statblock-enhancments-part-2`

**The current recording is `baseline-2026-11-25`.**
**Suite:** 283 suites, 6,046 passed, 26 skipped, **exit 0**.
**Replay:** `baseline-2026-11-25` — **38 of 38 reproduced EXACTLY, 2 skipped.**
**Diff:** four sheets differ — s02, s06, s25, s29 — and **34 of 38 are identical.** No other sheet.

## 10. The commits — five

| # | Commit | What |
|---|---|---|
| 1 | `2272639` | the rung: half a hit, not a cone (12 new tests, 11 existing changed) |
| 2 | `852c9d3` | the reference-sweep test deleted, with the reason in its place |
| 3 | — | the forty re-recorded |
| 4 | — | the blocks file and this report |

## 1. The four rows, three times each

| | s02 Muck-Lunge | s06 Scree Snare | s25 Iron Advance | s29 The Last Note Is For You |
|---|---|---|---|---|
| **as the seat wrote it** | *Strength Saving Throw*: DC 13, one creature within 5 feet. *Failure:* The target is pulled up to 5 feet straight toward the hound, **and the target has the Prone condition** | *Strength Saving Throw*: DC 14, one creature within 5 feet. *Failure:* The target has the Prone condition | *(not in the trace — only the value check's verdict)* | *Wisdom Saving Throw*: DC 17, one creature within 5 feet. *Failure:* Frightened |
| **as it shipped before** | each creature in a **15-foot cone** … pulled 5 feet and prone | each creature in a **30-foot cone** … knocked prone | each creature in a **30-foot cone** … pushed 15 feet and prone | **30-foot Cone** … Frightened |
| **as it ships now** | **one creature within 5 feet** … **3 (1d6) piercing** damage, and pulled 5 feet and prone | **one creature within 5 feet** … **9 (2d8) bludgeoning** damage and knocked prone | **one creature within 5 feet** … **13 (3d8) bludgeoning** on a failed save, then pushed and prone | **one creature within 5 feet**. *Failure:* **24 (7d6) Bludgeoning** damage, and Frightened |
| **measured against** | a 6-damage Bite | an 18-damage Rubble Lash | a 26-damage attack | a 48-damage attack |
| **type, and whose** | Piercing, the Bite's | Bludgeoning, the Rubble Lash's | Bludgeoning | Bludgeoning |
| **still under the floor?** | no — it clears | no — it clears | no — it clears | no — it clears |

All four clear their floors on half a hit, so the "floor keeps what it cannot lift" branch was not
needed on any of them.

## 2. Where Prone on s02's Muck-Lunge came from

**The seat wrote it.** The trace's full line reads `… "Muck-Lunge" -> Actions. *Strength Saving
Throw*: DC 13, one creature within 5 feet. *Failure:* The target is pulled up to 5 feet straight
toward the hound, and the target has the Prone condition`. My table last round truncated that text
at the pull, which is why it looked as though Prone arrived later. Nothing added it and nothing
removed it.

## 3. Did the rung let a Reaction through?

**Yes, and it does not now.** The condition read `section !== 'Traits'`, so a Reaction reached it.
It is excluded explicitly, with a test, and s25's Oathkeeper's Backhand — a Reaction on one of the
four changed sheets — still deals no damage.

## 4. The existing tests that changed — eleven

Ten in `widen-rather-than-drop.spec.js`: the five "widens and clears the floor" cases (encoding that
a soft row became a Cone **and had to clear the floor** — it now gains half a hit, and clearing is
no longer required since the floor keeps what it cannot lift); "keeps print's singular failure
clause" (the Cone's target clause was rewritten and the failure left singular — now the damage goes
in front of the effect); "takes print's flat sizes, 15 feet below CR 5 and 30 above" (print's flat
Cone sizes — no Cone is written now, so it asserts the lift is half a hit at every CR); and the four
"widens without gaining a Success clause" cases (the owner's 28 October "if someone makes the save
they aren't pushed" — still true, now asserted on the damage path). A Reaction case was added where
none existed.

One in `n4-lints.spec.js`: "the value ladder declares when it widened a row to an area" (N4,
2 November — the mark the rename reads, so a changed row is not handed the template's name). The
mark is kept for the same reason; the test now reads the damage instead of the Cone.

## 5. Widened rows in `fixtures/runs` — counted only, folder untouched

That folder holds sheets, not traces, so there is no "widened to a Cone" line to count. Counting the
**shape** instead — a no-damage Cone row with a minor effect, which is what the rung produced:

| | Count |
|---|---|
| Carrying a template or seed id (catalog rows) | **16** |
| Carrying neither (seat-written) | **13** |
| **Total** | **29** |

Examples: Sundering Shove, Crowd-Press Shove, Stolen Joy, Haul Line. **Catalog rows are the
majority**, which is the evidence for treating them the same way, as your reading says.

## 6. Every sheet that differs

Four: s02, s06, s25, s29 — the four you predicted and no others. 34 of 38 identical. s25 also has
its Oathkeeper's Backhand reworded past its 255th character by the 2014 conversion, which re-ran
because that sheet missed; it is a Reaction and still deals no damage.

## 7. The reference-sweep test

**Deleted, with the reason written in its place**, as the order allows. The fix is unchanged and is
one call to a function that already works four lines down.

You were right that my first version proved nothing. My second version read the removed row's name
out of the captured trace and named it from a seat-written trait — the trace captures fine, 29 lines
— but the Skeleton case produces **no "chassis row leaves" line at all**: a CR 5 brute skeleton
driven by that stub has no chassis nova for print canon to remove, so the removal never fires and
nothing can dangle. I could not build the case through `generateReskin`.

## 8. Anything a change made worse, and how the types read

**s02's Piercing is the one to look at.** Muck-Lunge is a mud lunge that drags, and it now deals
*piercing* damage because the Bog Hound's Bite is piercing — the rule is "the damage type of the
attack the row stands in place of", and the Bite is that attack. It is defensible and it reads
slightly off. The other three read cleanly: bludgeoning for the Lurker's rubble, bludgeoning for the
Bulwark's iron, bludgeoning for the bells.

**Nothing else got worse.** All four rows keep their own name's picture now — a lunge is a lunge, a
snare is a snare, a note "for you" is for one creature — which is what the two Bog Hound marks were
about.

## 9. The lint

40 sheets. **All eight sheet rules at zero**, unchanged. Outside the eight and unchanged:
`orphan-condition-ref` ×2 on s11, `at-will-inline` ×1 on s15.

---

## Carried from your third section

**A probe's blocks file carries its traces from now on.** Noted; the Kobold files are not redone.
