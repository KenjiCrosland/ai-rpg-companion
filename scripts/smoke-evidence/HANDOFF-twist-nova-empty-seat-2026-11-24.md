# HANDOFF — a twist keeps its named nova, and an empty seat stays empty

2026-11-24 · branch `statblock-enhancments-part-2` · for the owner and for Fable

**The current recording is `baseline-2026-11-24`.** Four commits plus this one, ready to push.

| # | Commit | What |
|---|---|---|
| 1 | `8b8ce0a` | item 1 — a twist keeps the area attack the model named for it |
| 2 | `cd203aa` | item 2 — nothing stands in for a seat that failed |
| 3 | `b5a1e4f` | and the floor keeps what it cannot lift |
| 4 | — | the forty re-recorded |
| 5 | — | the blocks file and this report |

**Suite:** 281 suites, 6,032 passed, 26 skipped, **exit 0**.
**Replay:** `baseline-2026-11-24` — **38 of 38 reproduced EXACTLY, 2 skipped.**
**Step 7's diff:** four sheets differ — s12, s13, s34, s35 — and **34 of 38 are identical.**

---

## 0. Two things to read before the sheets

**The ruling costs the Kobold its invisibility, and I think you should see that before it ships.**
"Can turn invisible once per day" is the GM's own words; the fallback's verb ranking drew the
`vanish` seed to answer it (form-ten, 2026-10-01), and with the draw gone **nothing answers it**.
Your stated reason for the ruling is that the three seeds on the forty "had nothing to do with what
was typed" — this one did. Two of the twelve changed tests are that case. If you want the draw
carved back for words the GM typed, it is a narrow carve: keep only the verb-ranked head, drop the
style default and the hash. The original assertions are in git at `9e6fb2d`.

**Two draws on the TRAIT side remain, and the ruling as written does not reach them.** A trait a
style or archetype OWES by default, and the "concept-first" bind where the GM's words key a trait and
the idea path had nothing. Both still set `library: true`. I left them because the ruling names one
site (8262-8349, the one ending in "library seed drawn: … a proven shape stands in") and those are
different mechanisms, neither standing in for a seat that failed. Say the word if they should go too.

## 1. s12 Plague Archon, in full, before and after

**Before** — the seat's row was dropped by the floor and `Bolstering Presence (2/Day)`, the `rally`
seed, stood in. **After** — nothing stands in, and the row the ladder could not lift stays:

> **Plague Herald's Command.** *Constitution Saving Throw*: DC 17, one creature within 60 feet.
> *Failure:* The target has the Poisoned condition until the end of its next turn.

word for word, as the model wrote it. It is a Bonus Action, EV 4.1 against a floor of 4.9 — a
shortfall of 0.8 — and the trace now reads `signature under the floor, and kept`.

The sheet: Pack Tactics, Aura of Authority; Multiattack, Lightblade, **Flyblown Swarm**;
Plague Herald's Command. `Bolstering Presence` is gone, and with it the forty's only
`stock-template-name` lint finding.

One thing that is not the ruling: the melee row was `Plaguebite` and is now `Flyblown Swarm`. The
re-record went live at the seat call, which is where s12 missed, so the seat named that row again.

**This is the part you flagged as your reading rather than his**, so: it is a row that does
something — a save, a condition, a duration — and it is 0.8 short of the floor for a bonus action.
It is not a row that does nothing.

## 2. s13 Purple Worm, and Shrapnel Spray's damage type

**The only change is the row that stays:**

> **Shrapnel Spray (Recharge 5-6).** *Constitution Saving Throw*: DC 22, each creature in a 60-foot
> Cone. *Failure:* 66 (12d10) **Acid** damage, and the target has the Poisoned condition until the
> end of its next turn. *Success:* Half damage only.

**The damage type is Acid, not Bludgeoning.** You asked me to report it and not force it, so I have
not. He has said twice he wants Bludgeoning for what the worm throws up; this is the naming call's
own choice, and the Poisoned rider comes with the chassis's row.

**The card runs 6 rows against print's high end of 10** for band 13-16, so it is well inside.
The sheet: Multiattack, Bite, Tail Stinger, Shrapnel Spray, Swallow, Vented Armoury (a Reaction),
Tunneler.

## 3. s34 and s35

**s34 Krennik** — `Rampage (1/Day)` gone, nothing in its place. Fear Aura, Worgrider's Arc;
Multiattack, Boar Spear, Javelin, Ride-Down (Recharge 5-6); Mounted Agility. Ride-Down is reworded
by the re-run audit — "its speed" to "its Speed", same mechanics.

**s35 Well Drowned** — `Rampage (1/Day)` gone, and the Bonus Actions section with it. Multiattack,
Slam; Brine Flow. Brine Flow is reworded by the re-rolled seat: "the ground it moves through becomes
slick brine that is difficult terrain" is now "the ground it passes over becomes difficult terrain".
**Still nothing drags anyone into the well** — the action seat still ends empty, which is your note
on this sheet and is now visible rather than papered over by a Rampage.

## 4. Where item 1 fired

**s13 and nowhere else**, confirmed by a strict replay over all 38 replayable sheets before anything
was recorded. The four it must not reach, and why each fails a condition:

| Sheet | Why not |
|---|---|
| s15 Adult Red Dragon | print's dragon HAS Fire Breath — condition 2 |
| s18 Bone-Sun Archlich | concept is all description ("an archlich enthroned on a sun of bone"), no name field — condition 1 |
| s38 Oathsworn Gravebound | same: "a skeleton with a greatsword" — condition 1 |
| s37, s39 | the class-NPC path, and the typed name is not the print body — condition 1 |
| s07 Hydra | Choking Reek is already on it, kept for the GM's clause — condition 4 |

## 5. Sheets with no row from either signature seat

**Three before, three after: s19, s21 and s22** — the printed creatures typed by name alone, which
never invent anything. **No sheet lost its only invented row to the ruling.** All three sheets that
lost a seed still carry one of their own: s12's Plague Herald's Command, s34's Standard Lance and
Ride-Down, s35's Brine Flow.

(The count reads 2 off the run directory because s22 cannot be replayed and is carried forward; it
is 3 on the forty as shipped.)

## 6. The diff of step 7

Four sheets differ and 34 of 38 are identical. Every difference is listed in §1-3: three rows gone
(two Rampage, one Bolstering Presence), two rows that stay (Plague Herald's Command, Shrapnel
Spray), and three rewordings on sheets whose calls were re-rolled from the point they missed
(s12's melee row renamed, s34's Ride-Down, s35's Brine Flow).

## 7. The existing tests that changed, and the ruling each encoded

Thirteen. Twelve for item 2 and one for the floor.

| Test | The ruling it encoded |
|---|---|
| `templates.spec.js` — the fit lands as a proven row | the floor BLOCKED a weak gaze so a seed could stand in; the row now stays |
| `templates.spec.js` — a "none" from the fit | a seed stood in so the block still shipped a signature |
| `generate.spec.js` — an unrepairable wildcard | a seed stood in and the audit heard no fallback brief |
| `generate.spec.js` — a dead wildcard draws from the shelf | "the workhorse posture" — the draw with no pivot call |
| `generate.spec.js` — a lying rename loses to the seed | a claiming rename lost to the seed's own name |
| `generate.spec.js` — the weapon table / rank-titled name | the `rally` style-default seed gave Temporary Hit Points |
| `generate.spec.js` — concept-key first | the verb ranking drew `volley-order` rather than `rally` |
| `generate.spec.js` — hold 5 | a drawn row carried its seed id so no site offered the shape twice |
| `generate.spec.js` — form-ten, the Kobold | **the GM's own words drew the `vanish` seed** |
| `canaries.spec.js` — the Kobold's Vanish | **the same, as provenance on the row** |
| `pipelines.spec.js` — the twist path | the twist path has no fallback shelf (still true, now true of every path) |
| `pipelines.spec.js` — the class-NPC path | the same for the class-NPC path |

Every one keeps its other subject; none of the rulings they encode has changed except where the new
ruling supersedes it, and each says so in a comment beside the assertion.

## 8. The two small things from the probe

**s35's `citation-gate-mismatch`: neither the lint nor the sheet is wrong — my report was.** The
sheet reads "a use of Dragged Under if available", the lint's rule reads exactly that, and the
**stored findings on the shipped sheet are empty**. The line I quoted came from the TRACE, logged by
a pass that ran before "if available" was appended; the ship-time recompute (21 November) had
already corrected it. I read the trace instead of the stored findings and reported a finding that
did not exist. The corrected answer: 0 findings on that sheet.

**Why `sweepDeadName` did not follow Shrapnel Spray.** The print-canon removal at
`generate.mjs:10321` never calls it. After `esA.splice(i, 1)` it hand-patches **only** the
Multiattack's citation:

```js
for (const e2 of Object.values(sections).flat())
  if (e2.name === 'Multiattack' && new RegExp(`\\b${bareN}\\b`).test(e2.text ?? '')) …
```

`closedPathFillerLeaves`, four lines down, does call `sweepDeadName` — which is why a row that
leaves THERE is followed and a row that leaves HERE is not. Gizzard of Ruin named Shrapnel Spray and
nothing swept it. Item 1 keeps the row on s13 so this sheet no longer shows the hole, **and the hole
is still there for the next row that leaves at that site.** One line to fix; not in this round's
order, so not done.

## 9. Anything a change made worse

**The Kobold, in §0.** It is the one thing I would put in front of him before this ships.

**And two first cuts that were wrong, both caught by replay, both fixed in their commits.** Item 1
stamped `chassisNova`/`renamedFrom` on every chassis nova and changed eight sheets this round must
not touch — the same fault as the ribbon round's `generation.ribbon` record. And it kept the row at
the print-canon pass only for `closedPathFillerLeaves` to take it four lines later, so the trace
said the row stayed and the sheet shipped without it: the row now carries the path stage's claim.

**Nothing else on the forty got worse.** No card runs past print's high end, no sheet lost its only
invented row, and the lint went down by one.

## 10. The lint, the suite, the replay

40 sheets; 39 linted (s19 is print-exact with `calls: 0`).

| Rule | Findings |
|---|---|
| `uncited-replacement-row` | 0 |
| `ungated-turn-denial` | 0 |
| `citation-gate-mismatch` | 0 |
| `deafened-alone` | 0 |
| `rider-without-an-attack` | 0 |
| `strike-adds-nothing` | 0 |
| **`stock-template-name`** | **0** — was 1, and the ruling removed it |
| `two-recharge-rows` | 0 |

**All eight at zero for the first time.** The one finding was s12's `Bolstering Presence`, a stock
template name — exactly the sameness the ruling is aimed at. Outside the eight, unchanged:
`orphan-condition-ref` ×2 on s11, `at-will-inline` ×1 on s15.

**The suite:** 281 suites, 6,032 passed, 26 skipped, **exit 0**.
**The replays:** 4 of 38 missed with both items in — s12, s13, s34, s35, two at the audit call and
two at the seat call, inside your limit of eight. After the re-record and the floor change,
**38 of 38 reproduced EXACTLY, 2 skipped.**

---

## What I did not do

- **Nothing was pushed.** Five commits.
- **No button, no second roll inside the engine, and nothing from the queue.**
- **The two trait-side draws are still there** (§0), and the `sweepDeadName` hole at 10321 is
  reported and not fixed (§8).
- **Shrapnel Spray's Acid is not forced to Bludgeoning** (§2).
