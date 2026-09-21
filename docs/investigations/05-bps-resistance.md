# Task 5: Unqualified B/P/S Resistance — IMPLEMENTED

## Root cause (two-part, and partly self-inflicted)

1. **The prompt taught the package.** The 2024 prompt's field-format rule
   used `CORRECT: "resistances": "Bludgeoning, Piercing, Slashing"` as its
   canonical example (and the WRONG slash-example used the same three
   types). We were literally anchoring the model on the exact package the
   2025 MM eliminated.
2. **The defense budget prices it but affords it.** The budget charges 1
   point per physical type (3 for the package), but the budget scales with
   CR — at the mid+ CRs the old uniform CR roll favored (see Task 6), 3
   points is always affordable, and "tough monster = resists weapons" is the
   model's strongest prior. Nothing anywhere said the package was reserved.

Field evidence: 7 of the 16 fixture blocks carry bare B/P/S; 6 are
unqualified (fixtures 03, 04, 05, 06, 11, 12 — construct, two aberrations, a
fey, two elementals), 1 is a legitimate swarm (fixture 07). Fixture 01 is
2014-rules and out of scope. (The brief's count of 8 included partial
physical lines — fixture 09 `Slashing, Fire`, 13 `Acid, Bludgeoning` — which
this rule deliberately does not touch; see Residual risk.)

## Corpus calibration — the whitelist is narrower than the official record

SRD 5.2.1 has **18** unqualified-B/P/S carriers:

| Justification | Blocks |
|---|---|
| Swarm | 7 (all `Swarm of ...` types) |
| Incorporeal | Ghost, Specter, Will-o'-Wisp, Wraith |
| Elemental body | Air Elemental, Fire Elemental, Invisible Stalker |
| No visible marker | Chain Devil, Clay Golem, Couatl, Tarrasque |

The brief's whitelist (swarm + incorporeal) covers only 11/18. A context-free
lint rule with that whitelist would flag 7 official blocks — so the rule is
**chassis-gated**: it only runs on generated blocks (which always carry a
chassis), and the SRD corpus sweep (no chassis) never sees it. Officials are
grandfathered by construction, and the whitelist can stay as strict as the
brief wants. **Elemental type is deliberately NOT whitelisted** — fixtures 11
and 12 are elementals and the brief counts them as violations; if flavor
reviews later disagree, adding `|| /elemental/i.test(monster.type)` is a
one-line widening.

## Narrowest fix (implemented)

Three touchpoints, all in the 2024 path:

1. **Prompt example de-anchored** (`generate.mjs` rule 4): `CORRECT:
   "resistances": "Fire, Cold"`, `WRONG: "Fire/Cold/Lightning"`.
2. **Prompt STRUCTURE line added** (2024 prompt only): "NEVER resist all
   three of Bludgeoning, Piercing, and Slashing — the full physical package
   is reserved for swarms and incorporeal creatures..." The 2014 prompt is
   untouched (the qualified package is legitimate 2014 design and priced by
   `calculateCR`).
3. **Lint rule `bps-resistance`** (`lint.mjs`, chassis block): 2024-only +
   chassis-gated; exempts swarm archetype OR `swarm of` type line OR an
   incorporeal indicator (`/incorporeal|move through (other )?creatures and
   objects/i` over entry names+texts). Correctable with a deterministic fix:
   the resistances line minus its physical tokens (`field: 'resistances'`),
   applied by the existing field-fix path in `applyCorrections` — no LLM fix
   call ever needed.

## Blast radius

- Generated/re-rolled 2024 blocks only. Loaded saved monsters aren't linted;
  the corpus sweep is ungated by construction; 2014 generation unchanged.
- Swarms keep their REQUIRED package (`PASSIVE_SLOT_CHECKS` still demands
  it; the exemption keys on archetype and type line, so both engines agree).
- One existing test updated: the nonmagical-qualifier strip test now uses
  `Fire, Cold` (its purpose was the qualifier, not the package), plus a new
  test pinning the interaction — an unearned qualified package is removed
  outright, not de-qualified.

## Tests

`__tests__/bps-resistance.spec.js` (9 tests, behavioral, runs the real lint
over the real `fixtures/` corpus): exactly {03, 04, 05, 06, 11, 12} flagged;
swarm fixture 07 passes; partial-strip fix preserves `Cold, Poison, Psychic`
on fixture 06; swarm-archetype / incorporeal / 2014 / no-chassis exemptions;
official-shaped carrier legal under the corpus sweep. Full statblock suite:
378 passing.

## Residual risk

- **Partial physical lines are untouched** (fixture 09/13 style, e.g. a lone
  `Slashing`). Officials do this rarely; policing it needs its own corpus
  study and was not in the brief's scope.
- **Edition conversion can still produce a legal-looking bare package**: a
  2014 block with the qualified package converted to 2024 gets the qualifier
  stripped by `CONVERSION_LINT_RULES` but is NOT re-checked for bps (the
  conversion lint is phrasing-only by design — conversion never rebalances).
  This matches how a reprinted legacy monster would read, but it is a
  loophole a purist could notice.
- The incorporeal detector is phrase-based; a ghost concept whose trait
  prose avoids both marker phrasings would get its package stripped. The
  fix call never sees it (deterministic strip), so the block stays legal —
  just less thematic. Failure-log monitoring will show if this recurs.
- The model may compensate with elemental-resist stacks (it must spend its
  budget somewhere); `defense-count` still caps total spend, so this is
  bounded.
