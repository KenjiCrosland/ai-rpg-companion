# The runner clears its flags; the budget stops evicting the templated row

For Fable 5.2 and the owner, 2026-11-14.

```
npx jest src/tools/statblock-generator src/util --maxWorkers=2 --silent
  221 suites, 5240 passed, 26 skipped
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs v-regress
node --import ./scripts/alias-loader.mjs scripts/check-run.mjs smoke-out/v-regress-2026-11-15T03-26-57
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs v-budgetfix
```

## 1. The runner, in one line

`scripts/smoke-statblock.mjs` now takes the **union of every flag key in the batch file** and
removes all of them before each entry, then applies that entry's own flags. Carry-over is
impossible rather than remembered, and the union is read from the whole file so a `--only` run
starts just as clean.

## 2. The budget fix

**Within one receipt rank, a row that sits on a template beats one that does not; sheet order
breaks only what is left.** `receiptRank` still decides first and always, so this is a
tie-break inside the 10-29 ruling, not a change to it — and I see no conflict with it.

Replayed from probe B #01's two rows:

```
free-row order: "Caught Line" [element, snare] > "Mainspring Rewind" [element, no template]
free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Caught Line"
```

The trace line now carries each row's template (or "no template") so the choice is auditable.

### The lint

`holds-nothing`, at `audit` — reports, never rewrites, as the owner ruled for a dangling save.
It fires when a row turns on **this creature** grappling or restraining and nothing on the
sheet imposes Grappled or Restrained.

The sheet half is declared: `imposedConditions`, the same reader the weld and
`advantageReachable` use. The row half reads the row's own sentence — text matching on a
finished row, which the owner asked for here by name; it is the narrowest pattern that covers
the shipped case, and it is the only part of this change that reads finished text.

## 3. Tests — categories proposed and written

| category | written |
|---|---|
| a tie within a rank keeps the templated row (probe B #01 replayed) | yes (2) |
| a receipt still beats a decoration, templated or not | yes (1) |
| a budget with room keeps both | yes (1) |
| the lint fires on #01's shipped sheet and stays quiet on #02 | yes (3) |

`the-budget-keeps-the-templated-row.spec.js`, 7 tests. The second of the first pair flips which
row carries the template and shows the trait winning, so the test cannot pass on sheet order.

**One correction to category 3 as specified.** "A budget above 1 keeps both" cannot be shown at
CR 2: that band settles the budget at 1 however bare the card, so at the spider's own CR the
tie-break *is* the whole decision. The test shows both rows kept at CR 6, 12 and 18, and the
templated one kept at CR 2.

## 4. Blocks

**`v-regress`, 8 blocks — `CHECK-v-regress-2026-11-15T03-26-57.md`**

| | |
|---|---|
| FAILs | **0 of 8** |
| `holds-nothing` | quiet on all 8 |
| audit findings dismissed on print rows | 1 across 8 sheets |

The one order line that fired shows the ruling intact — a clause row with no template still
beats a borrowed row that has one:

```
free-row order: "Boulder Bowling" [clause, no template] > "Stonehide Snatch" [borrowed, terrain-walk]
```

**The injected clockwork spider — the element reached the sheet:**

```
Mandibles. …7 (1d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has
           the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.
Tar Web (Recharge 5-6). Dexterity Saving Throw: DC 13, one Large or smaller creature within 30 feet.
           Failure: The target is caught in tar and has the Restrained condition until the tar is
           destroyed (AC 10; HP 5; Vulnerability to Fire damage; Immunity to Poison and Psychic damage).
```

**Stated plainly: this block does not demonstrate the tie-break.** No free-row budget line fired
on it at all — the trait that landed this roll (`Scalding Steam`) came from a template too, so
there was no tie to break and `Tar Web` shipped because nothing competed with it. The
tie-break's evidence is the replay test, which uses #01's actual two rows. A block cannot be
made to reproduce the tie on demand, for the same reason probe B's #01 was a single roll.

`holds-nothing` is correctly quiet on this sheet: `Scalding Steam` turns on *a creature*
grappling the spider, which anyone may do, not on the spider holding something.

## 5. Probe C — not started

This session has run roughly 2,250 live model calls across probes A and B, the budget fix's
blocks and four earlier routing rounds. Probe C needs a scope read across ~15 gate sites, a
third print-record grade behind a flag, a donor pin, and 8 sheets. Starting it at the end of
this sitting would mean reporting a scope judgement I had not read carefully, which is the one
thing the box is for.

It is unblocked and nothing in it depends on A, B or this fix. The amendments are noted and
will be carried: inject nothing, hold the donor still, and the clockwork spider's model is the
**Giant Spider** (the CR 0 Spider has STR 2 and no web).

## Recorded, not built — unchanged from probe B's report

The hallmark feed (signature sentence, joins rather than replaces, must not reach
`creature_type`); `signature_mechanic` answered 5/5 and read nowhere; the stock gaze with the
wrong condition (item 5a's ladder); the vocabulary gaps (a drain that mends, healing denial
that does not route, a start-of-turn restraining aura, an authored climbing trait); and the 23
regex cues in `lexicon.mjs`, of which the 5 creature words retire first if the model-creature
layer lands.
