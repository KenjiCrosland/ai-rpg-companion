# Reskin sprint — outstanding work, in priority order

**Trigger:** picking up the reskin sprint after 2026-10-21. Read this first to
choose what to work on; each item says where its context lives.

## Standing

| forty | FAIL | what failed |
|---|---|---|
| `sweep-2026-10-21T15-19-47` | 3 of 40 | duplicate-mechanic (false positive), + 2 |
| `sweep-2026-10-21T15-59-59` | 3 of 40 | owed-clause ×2, control-aoe-ungated |
| `sweep-2026-10-21T16-48-01` | 3 of 40 | two-novas, save-fit, lack-honored |

Three runs, 3 FAIL each, and **no FAIL repeats across them**. That is the thing
to understand before chasing any single one: the rate is ~7% and the population
is a long tail of one-off defects, not a few recurring bugs. Two classes were
genuinely closed today (duplicate-mechanic false positives, owed-clause) and the
count did not move, because a different three surfaced. Expect that again.

The 10-20 forty read 0 FAIL. That was NOT better — it predates the
`owed-clause`, `control-aoe-ungated` and `duplicate-mechanic` gates, which
surface defects that were shipping unseen.

## P1 — Composition: one row carrying two templates' effects

**Now the top item.** The owner asked for this during the gap-list work and it is
still untouched. It is also what the remaining owed-clause pressure reduces to.

Evidence it is the right next thing:

- **Purple Worm** (`sweep-...15-59-59`) formed a correct idea for "swallowed a
  war-band's armoury" — "spearheads and mail fused into the hide gouge anything
  that presses against it" — and hit `[gap]`: no template expresses damage on
  MAINTAINED CONTACT (grappling, clinging, swallowed). `resonant-body` covers "a
  creature that HITS it", a different trigger.
- **The `on_being_hit/condition` family** — 17 of 185 recorded gaps, 0 templates.
  The only gap claim that survived every revision of that analysis.
- **Seat capacity.** Vashka the Red's concept produced THREE signature elements
  and there are TWO seats (action, trait); "punishing anyone who breaks ranks
  past the line" never got a seat. On a print body print's rows hold the sheet,
  so the GM's third ask has nowhere to go. More seats would break print fidelity;
  one row carrying two effects would not.

Data to work from: the `closest` / `missing` / `missing_effect` fields the
decline schema collects on every refusal (`templates.mjs`), and
`plans/RELEASE-case-pipelines-2026-10-20.md`.

## P2 — The long tail of one-off reader/structure FAILs

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

## P3 — A soft report on the repair call's own verdicts

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
