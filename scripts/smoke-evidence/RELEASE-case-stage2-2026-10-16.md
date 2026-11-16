# The case for the critic — stage 1, 1b and the stage 2 measurements

2026-10-16, second package of the day. The first worked your read of 2026-10-16
hold by hold. This one closes the owner's five-stage fix order through stage 2.

**This is not a general block read.** The blocks below are evidence for one
narrow claim — that six named ship blockers are gone. The substance of this
package is the **measurements**, and three of them reverse the premise of the
move-set brief you reviewed. Those are what we want attacked.

Everything re-runs from the archive: `scripts/signature-baseline.mjs`,
`pattern-label.mjs`, `pattern-count-generated.mjs`, `signature-demand.mjs`,
`by-print-audit.mjs`, `decline-sample.mjs`. Print labels are frozen in
`src/data/print-patterns.json`.

Gate: `npx jest` 70 suites / 2,759 passed. `npm run build` clean.

---

## Part 1 — six ship blockers, with the run that proves each

Sheets that failed at the table while every gate passed them.

| # | what shipped | fix | proof |
|---|---|---|---|
| 1 | **Courtier Unseen had no attack row at all** and "makes three attacks" over it; the reader printed off 0 | print's last attack is narrowed to melee, never deleted; `multiattack-integrity` now fails a sheet with zero attack rows | `stage1-2026-10-16T14-40-36` 01: one hybrid attack row present |
| 2 | **Dirge Swarm killed a full-HP caster at CR 13** — 75-HP threshold beside a capped 67 damage, so the kill branch beat the damage | threshold keys to Bloodied (print: Sea Hag/Death Glare takes "one Frightened creature") and re-derives after the cap | template data pinned; see the gap note below |
| 3 | **Plaguecarrion Mote offered three saves a turn** against Poisoned-with-no-healing until a Long Rest | print's immunity-on-success clause | template data pinned; see the gap note |
| 4 | **Bone-Labyrinth Reaver forced area movement every turn** after a re-slot made it a bonus action | Recharge-gated when the re-slotted row reaches an area | `stage1` 04: "Driving Bellow (Recharge 5-6)" |
| 5 | **"Thing in the Well" spoke as "the well"** — the place, not the creature | any contiguous run legal incl. the whole name; a run past *any* preposition refused; a refused person form falls back to a person | `stage1b-2026-10-16T14-47-47` 04 |
| 6 | **Broken Wall Sentinel shipped two byte-identical rows** | the call's shield answer survives the reserved-name repair | `stage1` 06: no duplicate text |

Verification: `stage1` 12 blocks **0 FAIL**; `stage1b` 5 blocks, 1 FAIL
(`save-fit` on a Strength save for a poison — pre-existing, unrelated).

Stage 1b landed six more: one key definition for the router and the gate (the
Bog Cauldron failed `engine-needs-key` on "climbs in", a key the router had used
to route it); the audit protects kit feature names (Divine Smite had shipped as
"Oathbound Strike"); `alignment-fit` reads "understands but can't speak" as mute
(it would have failed print's own Stone Golem); low-INT Constructs stop speaking
Common; a title-case name with particles stays the GM's; and the energy trace
stops hard-coding "a Humanoid".

**Two fixes diverge from the owner's brief and print is why.** Both were
confirmed by the owner before landing.

- Item 3 asked for the once-per-turn "Stunning Strike" gate. **Print uses it in 0
  of 329 SRD 5.2 rows.** Print's three real answers are immunity on a successful
  save (Werewolf/Bite: "immune to this werewolf's curse for 24 hours"), a
  prerequisite (Phase Spider, only on a drop to 0), or no save at all — the
  latter being this template's own cite, Mummy/Rotting Fist, which the Mummy
  applies twice a turn because re-applying is a no-op. We took the Werewolf's.
- Item 4 gates the re-slotted row only when it reaches an **area**. Print has 51
  ungated bonus actions; its two area ones are Recharge-gated (Centaur Trooper)
  or single-target with a prerequisite (Ettercap).

**An honest gap.** Items 2 and 3 never drew in three live batches — the execute
and contagion templates did not come up — so they are pinned on template data
and verified by replay, not by a generated sheet. Do not take them as
field-confirmed.

---

## Part 2 — the three claims we want attacked

### Claim A: our sheets are NOT flat by the brief's own metric. They are over-patterned.

3,403 generated 2024 sheets, frozen print predicates both sides:

| CR band | ours | print | gap | meat-only (ours) | meat-only (print) |
|---|---|---|---|---|---|
| 0–1 | **2.19** | 0.81 | **+1.38** | 3% | **48%** |
| 2–4 | **2.56** | 1.41 | +1.15 | 5% | 31% |
| 5–8 | 2.64 | 1.83 | +0.81 | 7% | 12% |
| 9–12 | **3.28** | 2.22 | +1.06 | 4% | 13% |
| 13–16 | 3.00 | 2.89 | +0.11 | 6% | 0% |
| 17+ | **4.80** | 4.10 | +0.70 | 0% | 0% |

We carry more patterns than print at every band. The inflation is **chassis
filler**: our commonest pattern is `hit-and-run` at **31% of sheets against
print's 6%**, and it is **84% filler** — Fleet Agility, Cunning Action, the
terrain-walk traits. `clock` we never generate; every instance is a print row
riding along.

If this holds, "flat" means *many generic patterns with the distinctive row
missing*, the signature slot's 17% hit rate is the real deficit, and **the
brief's step-10 flat metric would score a filler-rich sheet as rich** unless
filler comes out of its denominator.

**Attack this first.** It reverses the brief's framing, the labels are ours, and
the predicates are ours. The specific thing to doubt: whether a mechanical
labeller that counts "Cunning Action" as `hit-and-run` is measuring anything a
player would feel.

### Claim B: four of five "owed by print" seat defaults name rows SRD 5.2 does not contain.

A seat that OWES a trait seats it **before the idea**.

| seat owes | print row by that name? |
|---|---|
| skulker owes `assassinate` | **none — SRD 5.2's Assassin has Evasion + Cunning Action** |
| lurker owes `assassinate` | **none** |
| trap owes `false-appearance` | **none — the Mimic has Adhesive + Shape-Shift; the Gargoyle has Flyby** |
| warden owes `interpose` | **none — the Shield Guardian has Bound, Regeneration, Spell Storing, Fist** |
| skulker owes `evasion` | 1 block (the Assassin) |

They fire on **7% of 1,066 blocks** and they displace the GM. **Four separate "a
ninja who moves through the shadows and strikes unseen" sheets** seated
`assassinate` + `evasion`, after which the GM's own trait idea missed:

- "The shinobi's semi-incorporeal body is one with darkness…"
- "As long as the shade is in dim light or darkness, it can slip through the shadows…"
- "Kanagi's body is woven from the dark between worlds…"
- "The assassin's body is partially composed of living shadow…"

Also **10 of 47 template cites are broken**: `heated-body` cites Remorhaz/Heated
Body (renamed **Heat Aura**); `pounce` cites Tiger/Pounce (**removed** — which
also explains the Lion); `assassinate`, `false-appearance` ×2, `interpose` and
`ward-retaliation` cite rows 5.2 removed; `shell-withdraw`, `phobia` and
`bloodied-fury` cite Tortle, Scarecrow and Sahuagin, **none of which are in SRD
5.2**. `MECHANIC_OWED_TRAIT.gaze → gaze-aura` is the one that holds (4 print Gaze
rows).

This is the same stale-2014 error class as the brief's own example table. Print
settles it; please check the receipts.

### Claim C: 56% of empty signatures are the print-body "nothing invented" ruling.

Scoped to current code (427 blocks since 2026-10-15), with "nothing" defined as
no signature row of any kind — action, rider, seed, trait or wildcard:

| cause | share |
|---|---|
| **print body: "nothing invented"** | **56%** |
| the trait seat landed, the action seat did not | 17% |
| the call was asked and found no fit | 15% |
| no idea produced | 6% |
| no shelf template shared a verb (no call made) | 3% |
| the value floor | 2% |
| a post-call veto | 1% |

More than half of all empty signatures trace to one 2026-10-01 ruling.

---

## Part 3 — the rest of stage 2, briefly

- **Item 4: the value floor prices out print's second-commonest pattern.** Of
  floor drops carrying a pattern at all, **64 of 65 are `save control`** (23% of
  print). The other half of the drops are passive templates with no EV by
  construction — correctly skipped.
- **Item 6: 62% of all signature misses are TRAIT seats** (trait/always 44%,
  trait/on_being_hit 18%), which the candidate design does not address. Demand by
  effect tag is spread across all five, so a successor keyed on `effect` needs
  every shelf stocked.
- **Item 1: 19 `no_fit`, 1 `already_answered`, 0 `collision`**, and of the ten
  declines on templates the GM's own words had keyed, **7 are right, 1 wrong, 2
  borderline**. The right ones name a catalog gap, not a call gap: a skald
  asking to fury his **warband** was offered self-only `bloodied-fury`; a
  crusader asking to **mend her soldiers** was offered `warded-mending`, which
  *prevents* healing.
- **Item 2: 30% false-refusal rate** on real asks, hand-judged over all 20
  refusals. Cause: the call quotes **its own idea text**, not the GM's. The
  engine now extracts the longest verbatim GM span from the answer.
- **Hypothesis 6 flipped between metrics.** Refuted against signature held-rate
  (17% seat-survived vs 19% stood-down); **confirmed against pattern count**
  (2.97 vs 2.28, and 2.71 vs 1.97 within CR 5–8 alone). Both readings are on the
  record with the metric each used.

---

## Two asks only a second reader can serve

- **Item 8 — a blind label check.** 30 random SRD 5.2 blocks labelled against the
  pattern vocabulary by someone who has not seen the predicates. Our 21-of-21
  spot-check was fitted to the brief's own examples and should be read as such.
- **Item 9 — the eleven rewritten pins.** A fresh read of the diffs with only the
  print block each cites, looking for an expectation that encodes a defect's
  output rather than a law.

We wrote the predicates and the pins. Neither check can be self-served.

---

## What we got wrong this round, for your calibration

Six errors, all caught in-session, four of them in the measurements themselves:

1. **Item 1's first run reported 27 of 27 declines unanswered.** The prompt half
   of the field landed and the `parseFit` half silently did not, so the answer
   was discarded before anything counted it. We nearly reported "the call ignores
   the field" as a finding.
2. **Item 2's cause was misattributed first.** Reported as an over-strict check;
   the check was behaving correctly and the call was quoting itself. Only a trace
   that separated the two failures settled it.
3. **Item 7's first pass put 64% of empty signatures in "other"** because it
   counted a missing *action* signature as "nothing" — 11% of those had landed a
   trait and 12% a wildcard.
4. **"No idea produced" looked like the biggest cause at 33%** across the whole
   archive. It is **0% on 2026-10-16** and concentrated in September runs from
   before the seat existed. An archive artifact read as a defect.
5. **The pattern labeller's CLI ran on import**, printing its whole report into
   every importing script's stdout.
6. **A trace we added this morning says "a Dragon the concept never called
   thunder"** for a concept reading "a rolling wall of thunder". The engine keeps
   the rider correctly; the trace misdescribes why. Stage 3 retires that rule.

The pattern across 1–4 is the same: **a measurement that agreed with a prior
belief got reported before its own classifier was checked.** Claim A agrees with
nothing we expected, which is weak evidence for it and no substitute for your
read.
