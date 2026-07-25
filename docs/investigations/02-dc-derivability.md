# Task 2: Save-DC Derivability — Recomputed Across All 16 Fixtures

## Method

Script (session scratchpad, `dc-audit.mjs`): for each fixture, parse the CR
line (`CR n (XP ...; PB +p)` / 2014 `CR:n (...)`), compute
`chassisFor(cr).save_dc` and every archetype's `applyArchetype(...).save_dc`
using the real chassis module, then extract every `DC n` occurrence with its
line and classify it (save / escape / check). A DC counts as derivable if it
is within the lint's own bands: ±1 of some archetype's save DC (`dc-band`),
or `[save_dc − 6, save_dc + 1]` for escape DCs (`escape-dc`).

## Result: 31/31 DCs derivable — the defect is not present in the current engine

| Fixture | CR | chassis DC (base / +controller) | DCs found | Verdict |
|---|---|---|---|---|
| 01 shusgh (2014) | 19 | 21 / 22 | 21, 21 | base |
| 02 sussk | 11 | 17 / 18 | 17 save, 17 escape | base |
| 03 silent shard | 27 | 25 / 26 | 25 ×3 | base |
| 04 lasher | 15 | 19 / 20 | 19 ×3 | base |
| 05 dread slammer | 12 | 17 / 18 | 17 | base |
| 06 mournhaunt | 8 | 15 / 16 | 16 | +1 (controller wobble) |
| 07 skittering hive | 22 | 23 / 24 | 23 ×3 | base |
| 08 spore scuttler | 9 | 16 / 17 | 16 ×3 | base |
| 09 scritch | 15 | 19 / 20 | 19 ×3 | base |
| 10 krisk | 29 | 26 / 27 | 26 | base |
| 11 whisper shifter | 23 | 23 / 24 | 23 ×3 | base |
| 12 hollow shardweaver | 14 | 18 / 19 | 19 ×2 | +1 |
| 13 stonemourn mother | 16 | 20 / 21 | 20 | base |
| 14 scuttling jellypack | 5 | 14 / 15 | 14 save, 14 escape | base |
| 15 gromm | 2 | 12 / 13 | 12 | base |
| 16 sporegnash | 22 | 23 / 24 | 24 ×3 | +1 |

Every DC is the chassis `save_dc` exactly or exactly +1; within each block
all save DCs agree with one another; both escape DCs sit at the save DC
(inside the sanctioned asymmetric band). No skill-check DCs appear in any
fixture.

## Where DCs come from (the full provenance chain)

1. `chassisFor(cr).save_dc` — the CR table (`archetype-chassis-spec.json`).
2. `applyArchetype` — controller-class archetypes add `dc_mod` +1 (capped at
   PB + 18, the ability-ceiling gate). Fixtures 06, 12, 16 show the +1.
3. The prompt hard-codes the number into the save skeleton: "Every
   saving-throw effect uses EXACTLY: *<Ability> Saving Throw*: DC
   ${chassis.save_dc}, ..." — the model copies, it does not derive.
4. `dc-band` lint (correctable) rejects any max save DC outside ±1 of the
   chassis; `escape-dc` polices grapple riders on the asymmetric band, with
   the correction landing on `save_dc − 2` (the typical official offset).
5. Spellcasting DC is likewise stamped (`spell save DC ${chassis.save_dc}`,
   with a minimum-score consistency constraint in the caster instruction).

## Root cause / narrowest fix

**No fix required.** The brief's concern ("DCs that can't be recomputed from
the statline") does not reproduce anywhere in the current corpus — the
prompt-skeleton + stamp + band-lint chain closed it. The 16 fixtures were
generated across the sprint's engine versions, so this holds for the oldest
blocks too. Snap-to-derivable would be a no-op on all 31 DCs.

Note the design position (documented in `docs/2024-architecture.md`, the
Slinky Boulder reversal): DCs are budget-derived (CR → save_dc), NOT
ability-derived per save ability. Officials themselves don't keep DC =
8 + PB + mod for every entry, and stamping per-ability DCs inflated
statlines. "Derivable" here therefore means derivable from the CHASSIS, and
a grognard recomputing 8 + PB + ability will still find mismatches on some
blocks — that mirrors official practice and is intentional.

## Blast radius

None — no code changed.

## Residual risk

- `dc-band` checks only the MAXIMUM extracted save DC (deliberate, from the
  Investigation-masking fix). A block could carry one on-budget DC and one
  stray lower DC and pass. The prompt's EXACT skeleton makes this unlikely
  (zero instances in 16 blocks), but a per-instance sweep — flag any save DC
  not in {base, base+1, base−1} — would close it and is a ~5-line lint
  widening if the failure log ever shows it.
- The audit treats "within the lint band" as derivable; a DC at base−1 would
  pass the band while not matching any archetype output. Zero instances
  observed.
- 2014-path DCs ride the same chassis (fixture 01 confirms), but 2014 blocks
  converted FROM old pre-engine saves are out of scope (conversion never
  rebalances numbers by design).
