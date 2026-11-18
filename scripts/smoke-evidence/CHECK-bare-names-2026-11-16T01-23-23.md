# Mechanics check — bare-names-2026-11-16T01-23-23

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Captain Vane | 4 | 2024 | defender-3 | ok | ok | FAIL: duplicate-row | ok | ok | ok | SOFT: print-rows | SOFT: duplicate-name, duplicate-row-name | ok | ok | FAIL (1) | 1/1 | 4/4 |
| Sister Ilse | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Old Marga | 1 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Pyx-Cantering Reliquary | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Litany Wight | 3 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 4/6 |
| Drowned Midwife | 5 | 2024 | caster-8-binder | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |

**Dropped 1 of 6 GM clauses** (coverage 83%); concept share 85% (23/27 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- defender-3 / structure: 1


## Captain Vane (CR 4)
- structure · FAIL · duplicate-row: two rows named "Longsword"
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Salt-Tongued
- adjudicability · SOFT · duplicate-name: duplicate-name: Actions/Longsword: two entries in this section share a name — identical copies are dropped; a genuinely different second ability must be renamed
- adjudicability · SOFT · duplicate-row-name: duplicate-row-name: Actions/longsword: two rows share this name
- bands · note · print-numbers: Guard Captain's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Reactions/Riposte rides on: the user's own part, feature or species
- read: def 5 / off 4 → 4.5; sustained 30 (2 × Longsword); nova none; dmg 30

## Sister Ilse (CR 2)
- clean
- bands · note · print-numbers: Priest's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Glamouring Hymn rides on: seed keyed on the user's words (hymn)
- read: def 1 / off 3 → 2; sustained 22 (2 × Mace); nova none; dmg 22

## Old Marga (CR 1)
- clean
- bands · note · print-numbers: Spy's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 2 / off 1 → 1.5; sustained 12 (1 × Shortsword); nova none; dmg 12

## Pyx-Cantering Reliquary (CR 3)
- clean
- bands · note · print-numbers: Priest's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Bonus Actions/Chimed Beat rides on: seed from the fallback library — no word of the user's keyed it
- read: def 1 / off 3 → 2; sustained 22 (2 × Mace); nova none; dmg 22

## Litany Wight (CR 3)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Flickering Shroud Evasion
- bands · note · print-numbers: Priest's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Hollowing Dirge rides on: seed from the fallback library — no word of the user's keyed it
- read: def 1 / off 3 → 2; sustained 22 (2 × Radiant Flame); nova none; dmg 22

## Drowned Midwife (CR 5)
- clean
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 5 / off 8 → 6.5; sustained 48 (3 × Arcane Burst); nova Cone of Cold 36; dmg 56


## Audit findings dismissed on print rows

**0** finding(s) dismissed across 6 sheet(s) that carry the record.

- none


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 5
- `multiattack` ×5
- `spellcasting` ×4
- `mace` ×3
- `radiant flame` ×3
- `divine aid` ×3

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
