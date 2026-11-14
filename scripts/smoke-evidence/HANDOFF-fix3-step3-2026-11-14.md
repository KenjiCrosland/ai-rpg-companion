# Handoff — fix 3's patch, and item 5a step 3

For Fable 5.2, 2026-11-14. Assumes no conversation history. Blocks are in
`BLOCKS-fix3-2026-11-14.md` beside this file; read those first.

**Owner's standing rule, from today:** any fix or feature needs block evidence before it is
committed, and the blocks go in a committed doc. This is that doc, and the honest headline is that
**the blocks did not reproduce the defect**, so the fix's evidence remains your deterministic sweep.

---

## What is in this commit

| | |
|---|---|
| your patch | `fix3-blind-payoff.patch`, applied — the consumed condition resolved before the guards, scoped to templates whose frame carries the slot |
| your test | `a-blind-payoff-knows-its-trigger.spec.js`, 16 cases, 3 fail without the fix |
| step 3 (mine) | the three source-text guards rewritten to call the renderer; a new structural guard that every shape field reaches its catalog entry |

**5192 tests, 214 suites.**

## The blocks, and why they prove nothing either way

Both known-bad sheets were re-run after the patch. **Neither drew the `condition-payoff` template
this roll**, so the row the fix repairs never appeared.

- **`sweep --only 14`, Heart of the Glacier (CR 15).** The idea call produced a slowing-ice idea,
  the menu led with `slow-bolt`, and the trace reads
  `word match declined by the call: slow-bolt, condition-payoff, pacify, sensory-strike`. The sheet
  shipped `Frozen Wake` — a cone that halves Speed. No payoff row.
- **`v-route --only 9`, Vhalgrin (CR 6).** A bare-name input, so the concept expands differently
  each roll; this one became a thorn creature with `Thorn Claw`, `Spine Quill` and `Thorn Volley`.
  No payoff row.

Both cards are recorded in full in the blocks file.

**This is the same wall you hit.** The defect lives inside one template's render, and whether that
template is drawn depends on the idea call. A prompt cannot force it without being written
backwards from the fix, which is the tuning we agreed not to do. On the rolls where it HAS been
drawn — Vhalgrin on 11-13, the Thawless Heart on 11-12 — the row shipped the doubled condition, so
the defect is real; it simply is not reproducible on demand from an input.

**So the evidence that stands is yours, and it is stronger than a block for this defect:** 91 blind
renders, 13 conditions at 7 CRs, none rewarding its own trigger — exhaustive where a block is
sampled. I verified your table independently before the patch and reproduced it exactly.

## Step 3: the guards that could not fail

Three tests asserted that `templates.mjs` **contains the line**
`if (t.rewardsCondition) vocab.push(`. They passed for weeks while the behaviour was absent. I
stubbed the push site to check: all three stayed green. They now call `buildFitPrompt` and assert on
its output, and with the push site stubbed **3 tests fail**.

Confirmed behaviourally what the flag does — it adds the line the model never sees today:

```
WITHOUT: …{condition_minor} ∈ Prone/Poisoned/Deafened/Frightened/Blinded
WITH:    …; "escalation" ∈ condition/exhaustion/damage/mark — what finding the target
         ALREADY afflicted adds … The engine writes every number and duration
```

**`a-shape-field-reaches-its-template.spec.js`** is the general form you asked for: it compares every
shape's declared fields against its catalog entry, so a field added to a shape and forgotten in the
builder fails there instead of going dark. The sweep **narrows** your finding rather than widening
it — four fields are dropped, and three are harmless:

| dropped | read at runtime? |
|---|---|
| `invented` (34 shapes) | read as `donor.invented`, never off a template |
| `swallow_tick`, `composing` | not read off a template at all |
| **`rewardsCondition`** | **the only dropped field anything reads** |

Each documented drop carries its reason in the test, so none becomes folklore.

Both files **assert the dark state as a fact** rather than hoping: `rewardsCondition` is `undefined`
on the shipped entry, and the escalation line is absent from the real fit prompt. Step 4 flips both.
That is what keeps the suite green between steps 3 and 4 without anything pretending to work.

## Your CR-gate evidence, verified

Checked against `srd52-monsters.json`, below CR 10: **Paralyzed 7** (Ghoul at CR 1, Ghast 2, Phase
Spider 3, Chuul 4), **Petrified 4** (Cockatrice at CR 1/2, Basilisk 3, Gorgon 5, Medusa 6),
**Stunned 2**, **Unconscious 5**. My Incapacitated count runs higher than your 11 because my pattern
catches precondition clauses like Pack Tactics' "unless incapacitated"; yours is the stricter and
better number. The ruling stands on solid ground.

## Your environment note — confirmed, and it is ours to fix

Six spec files read `smoke-out/`, which is gitignored at `.gitignore:52`:
`r9-release-pass`, `offlist-spell-repair`, `sheet-lints`, `kit-stood-down`, `r8-authored-quality`,
`sheet-budgets`. They pass here only because the folder exists on this machine. Our green has been
partly local, and your fresh clone was right to fail. Not fixed in this commit; it needs a decision
about whether those tests get committed fixtures or get skipped when the folder is absent.

## Next, in your stated order

Step 2 (reconcile with 10-27) is next, and the damage-type fit list is assigned to me — I will
measure which conditions print pairs with which damage types rather than propose one from taste.
Then step 4 carries the flag, and step 5 settles the six tests against the signed-off ladder.
