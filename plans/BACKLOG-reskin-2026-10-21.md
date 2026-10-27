# Reskin sprint — outstanding work, in priority order

**Trigger:** picking up the reskin sprint after 2026-10-21. Read this first to
choose what to work on; each item says where its context lives.

## Carried forward from the plans of 2026-10-27 (those files are deleted; this is what survived them)

**The spare slot is still one family — it MOVED, it did not shrink.** The blind
seat default and the keyword injection are gone (commit "the spare slot"), and
the retaliation templates fell from 3 of 4 family rows to 1 — but `energy-aura`
rose from 1 to 4 on the same ten. It reaches the menu LEGITIMATELY: it declares
`start_of_turn/damage`, so `orderByStamps` puts it at tier 1 for any trait idea
firing `always`/`start_of_turn` (interchangeable for traits since the aura
re-tag). On two of four sheets the call chose it over `spider-climb`, `phobia`
and `aberrant-ground` when the idea had asked for movement or a resource. That
is the CALL choosing, and no gate fixes it.

The cause is a thin pool: **`templatesFor` offers 10 candidates for an always-on
trait**, and most are narrow (`undead-fortitude`, `truth-aura`, `bound`,
`relentless-pursuit`), so for a generic "its body does something all the time"
idea the aura is the only broadly-applicable answer. The fix is MORE always-on
trait shapes that are not auras — senses, terrain, how it fights, what it
ignores — the same conclusion the composed-row work reached for actions. Print
has 105 distinct trait names and its commonest are exactly that shape: Pack
Tactics 18, Spider Climb 14, Amphibious 31, Flyby 7, Hold Breath 6.

Do not re-measure this on one ten and call it moved: at n≈10 the family share
swings ±15 points. It needs a forty.

**The signature PLUMBING is done; what is left are shelf gaps.** The plans of
2026-10-26 (aura tags, fit-by-stamps, composed candidates, the two compose-the-row
grammars) all landed and are deleted. Their joint conclusion, worth keeping:
ideas now reach the fit call, the menu is ordered by what the idea DECLARES, and
the catalog's tags match its frames. The decoration rows that remain are the
catalog not having the shape the idea asked for — a loose-gravel body became a
`swallow`, a stored-charge body became `weapon-lodge` — which is
`plans/tail-build-print-memorable-mechanics-2026-10-26.md`'s work, not a
plumbing defect. (`weapon-lodge` as the catch-all has since gone to 0 of 40 per
the critic's forty read.)

**The FORM mechanism was refused and must not be rebuilt.** The body-reaction
plan proposed asking the call to fill a family's blank form when no template
fits ("if none fits, fill this form instead"). The owner refused it; composed
candidates ride the ordinary fit MENU instead, as closed options with their own
ids (`composedCandidates`, `composedTemplate`). Anyone reaching for a
fill-in-the-form call should read that history first.

**The seat↔clause link is still word-counting.** `leadForSeat` (templates.mjs)
matches a seat to its clause by counting shared words over three letters. It was
replayed against the sheet that looked like a misfire and cleared — the `seats:`
trace that seemed to contradict it is printed from a THROWAWAY `assignSeats` at
chassis time, while `seatsT` runs later with a wider `covered` list — so this is
debt, not a bug. The declared replacement now exists: shipped rows carry
`clauseId` and `clause`, so whichever call runs second can name the clause an
element came from, and the counting goes away. Do this before anything else
leans on `leadForSeat`.

## Standing

| forty | FAIL | what failed |
|---|---|---|
| `sweep-2026-10-21T15-19-47` | 3 of 40 | duplicate-mechanic (false positive), + 2 |
| `sweep-2026-10-21T15-59-59` | 3 of 40 | owed-clause ×2, control-aoe-ungated |
| `sweep-2026-10-21T16-48-01` | 3 of 40 | two-novas, save-fit, lack-honored |
| `sweep-2026-10-21T17-45-29` | 3 of 40 | two-novas, lack-honored, save-fit (after the `effectOnly` fix; read 5 before it) |
| `sweep-2026-10-21T18-15-11` | **2 of 40** | lint:dangling-use-ref + undefined-attack-ref (one block), speaks-by-int |
| `sweep-2026-10-21T22-17-49` | 5 of 40 | two-novas ×2, condition-duration (new gate, correct), duplicate-mechanic, control-aoe-ungated + name-mechanic |

Six runs, 2-5 FAIL each, and **the population turns over almost completely
between runs**. `lack-honored` (Adult Red Dragon) repeated twice and then
vanished on the next run from the same fixed batch, so an apparent repeat can be
variance rather than a deterministic defect. The rate is ~5-7% and it is mostly a
long tail. **But do not generalise that to every class**: tallied over all six
runs, `two-novas` fired four times in three runs on three different creatures,
and it is a real defect (see P1). A repeat is variance until the tally says
otherwise — so tally. Three classes were genuinely closed on 2026-10-21
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
- `two-novas` — **NOT a one-off; this is the frequency pick.** Four firings in
  three of six forties, on three different creatures across both editions:
  Knell Swarm ("Tolling Peal" + "Whirlwind"), the Air Elemental (2024,
  `lurker-5`, "Chorus Barrage" + "Whirlwind") and Rimeheart Stalker (2014,
  `brute-9-juggernaut`, "Killing Cold" + "Threshold Execute"). The gate is
  corpus-sound — 0 of 329 print blocks carry two Recharge Action rows, 72 carry
  exactly one (`checker.mjs:456`). See the run read in
  `critic-response-2026-10-21.md`.
- `control-aoe-ungated` — Adult Red Dragon (2014): `Scarred Visage` is at-will
  multi-target control with no damage, no gate and nothing traded for it.
- `escape-dc` — Stirge Swarm: `Proboscis` states escape DC 13 against a derived 8.
- `name-mechanic` — Canyon Gore-Wyrm: `Canyon Charge` promises movement its text
  lacks.

Pick by frequency across runs, not by the most recent forty. Every class here
has appeared once **except `two-novas`**, which is tallied above and is the
standing pick.

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

## SUPERSEDED on priorities — read `critic-response-2026-10-22.md` first

The critic's package-six review (`sweep-2026-10-21T22-17-49`: 6 ship / 27
fix-lite / 7 fix) replaced the priority order again. The `expresses` element
receipt shipped in package six **failed** the claim it was offered on: membership
is not expression. Free rows are now the main sameness source — 12 of 13 from
three templates — and the owner has ruled on invented-element rows (allowed,
capped by template family, counted in the metric).

`two-novas` (the standing pick below) is **confirmed by the critic** as a real
defect, and now sits behind instrument honesty and element provenance in the
critic's order.
