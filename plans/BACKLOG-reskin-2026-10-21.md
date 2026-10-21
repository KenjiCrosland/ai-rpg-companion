# Reskin sprint — outstanding work, in priority order

**Trigger:** picking up the reskin sprint after 2026-10-21. Read this first to
choose what to work on; each item says where its context lives.

## Standing

| forty | FAIL | what failed |
|---|---|---|
| `sweep-2026-10-21T15-19-47` | 3 of 40 | duplicate-mechanic (false positive), + 2 |
| `sweep-2026-10-21T15-59-59` | 3 of 40 | owed-clause ×2, control-aoe-ungated |
| `sweep-2026-10-21T16-48-01` | 3 of 40 | two-novas, save-fit, lack-honored |
| `sweep-2026-10-21T17-45-29` | 3 of 40 | two-novas, lack-honored, save-fit (after the `effectOnly` fix; read 5 before it) |
| `sweep-2026-10-21T18-15-11` | **2 of 40** | lint:dangling-use-ref + undefined-attack-ref (one block), speaks-by-int |

Five runs, 2-3 FAIL each, and **the population turns over almost completely
between runs**. `two-novas` (Knell Swarm) and `lack-honored` (Adult Red Dragon)
repeated twice and then vanished on the next run from the same fixed batch, so
even an apparent repeat is variance, not a deterministic defect. The rate is
~5-7% and it is a long tail. Three classes were genuinely closed on 2026-10-21
(duplicate-mechanic false positives, owed-clause, the `effectOnly` save-fit false
positives) and the count barely moved, because different ones surface each time.
Do not read a single forty's FAIL list as a work queue.

The 10-20 forty read 0 FAIL. That was NOT better — it predates the
`owed-clause`, `control-aoe-ungated` and `duplicate-mechanic` gates, which
surface defects that were shipping unseen.

## SUPERSEDED BY THE CRITIC REVIEW — read `critic-response-2026-10-21.md` first

The critic's 2026-10-21 review refuted the measurement this backlog was built on.
`[nearest landed]` was stamped at ACCEPTANCE, not at ship, so "1 row in 41
shipped nothing" was really **23 of 41** — and the OVER-DECLINE / GENUINE-GAP
buckets below measure whether a template EXISTS for the seat, not whether it does
what was wanted. The real bottleneck is the **provenance rules**: 12 of 20 vetoes
were 1d, and six of its kills were the twist itself.

The ruling, the fixes and the remaining order all live in
`plans/critic-response-2026-10-21.md`. The buckets below are kept only for the
two measurement errors recorded with them.

## RESOLVED — the catalog is not the problem (measured 2026-10-21)

Composition was written as P1 here. **It is not supported, and neither is any
catalog build.** The engine now reports, on every `[gap]` line, which same-seat
templates it rejected and at which stage (`role` / `style` / `legality`), because
three separate offline attempts to rebuild a live menu disagreed with the run —
only `templatesFor` holds the context to know. Over the forty
(`sweep-2026-10-21T18-15-11`), 41 gap lines:

| bucket | share | meaning |
|---|---|---|
| OVER-DECLINE | **71%** | a same-seat template WAS on the menu and the call said no |
| ROLE SHELF | 17% | none offered; same-seat ones exist but the role filter cut them |
| LEGALITY | 5% | correctly cut — wrong body type, no host row, wrong style |
| GENUINE GAP | **7%** | the catalog has nothing for that seat |

**The catalog is ~93% complete for observed demand**, and the three genuine gaps
are singletons in three different cells, not a family. The
`on_being_hit/condition` family theory died here too: 4 of 5 genuine gaps one
run, 1 of 3 the next — small-sample noise.

Over-declining is real but largely self-healing: closest-acceptance lands the
call's own named-nearest template, and **1 row in 41 shipped nothing** (it was
22% of blocks at 2026-10-16). If anyone wants to work it, the lever is the FIT
PROMPT — make `no_fit` rarer when the menu already matches the seat's shape —
not the catalog.

### Two measurement errors worth not repeating

1. **The first classification read 79% ROUTING. It ignored `section`.**
   `riposte`, `ward-retaliation` and `snap-shot` are `section=reaction` and were
   being counted as withheld from a TRAIT seat. Match on
   section+trigger+effect, never trigger+effect alone.
2. **Offline reconstruction of a menu does not work.** `heated-body` and
   `hook-drag` both appeared in rebuilt contexts and not in the live ones —
   `owned`, engine families, style and the resolved type all feed the filters.
   Ask the engine; do not re-derive.

## P1 — The long tail of one-off reader/structure FAILs

Not one bug. Current examples, each needing its own diagnosis:

- `lack-honored` — Adult Red Dragon: the GM asked for "blind in one eye from an
  old lance" and the sheet still carries the eye. The lacks path has a hole.
- `save-fit` — "Opportunist's Lash": a Strength save for an effect that calls
  for Wisdom or Charisma.
- `two-novas` — Knell Swarm: "Tolling Peal" and "Whirlwind" both Recharge.
- `control-aoe-ungated` — Adult Red Dragon (2014): `Scarred Visage` is at-will
  multi-target control with no damage, no gate and nothing traded for it.
- `escape-dc` — Stirge Swarm: `Proboscis` states escape DC 13 against a derived 8.
- `name-mechanic` — Canyon Gore-Wyrm: `Canyon Charge` promises movement its text
  lacks.

Pick by frequency across runs, not by the most recent forty — each of these has
appeared once.

## P2 — A soft report on the repair call's own verdicts

The repair call may now say a clause needs no new row, two ways (see
`plans/owed-clause-2026-10-21.md`). Both are recorded on the sheet —
`generation.answered_in_prose` and `generation.answered_by_existing` — but
NOTHING reads them. Add a **soft** checker report so 1e keeps its teeth and a
call that starts routing real mechanics into prose, or crediting GM asks to
generic print rows like `Multiattack`, is visible without having to read traces.

## Deferred, with context preserved

- **`plans/condition-record-2026-10-21.md`** — delete the `that|which|who` word
  rule once record coverage is measured on a fresh forty; the `if` hole for rows
  the engine did NOT write; why the template map must stay hand-declared.
- **`plans/owed-clause-2026-10-21.md`** — what the owed-clause fix was and the
  one measurement that mattered.
- **Section 1e purity / the save-stat text fallback** — logged debt.
- **Section 4's two text-level conversions** — Radiant Flame as a weapon attack;
  "Strength-based d20 tests" on the gold dragon.
- **Gap-list accumulation** — 185 distinct gaps; ordering below the top few is
  still noisy, so gather more before acting on the tail.
