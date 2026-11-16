# Mechanics check — ship-eight-2026-11-16T00-34-43

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Headless Horseman | 11 | 2024 | skirmisher-8-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/7 |
| Pumpkin King | 10 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Forge Knife Ball | 5 | 2024 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | SOFT: inline-weapon-collision | ok | ok | soft (1) | 1/1 | 4/4 |
| Warp Warren Sorcerer | 2 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Tome Custodian | 3 | 2024 | skirmisher-3 | SOFT: hit-die | ok | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/3 |
| Silver-Tongued Toad | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | SOFT: inline-consistency | ok | soft (1) | 0/1 | 2/3 |
| Drowned Pike | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | SOFT: inline-weapon-collision | ok | ok | soft (1) | 1/1 | 0/2 |

**Dropped 1 of 7 GM clauses** (coverage 86%); concept share 76% (22/29 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Headless Horseman (CR 11)
- clean
- read: def 8 / off 14 → 11; sustained 66 (3 × Saber); nova Hooves 66; dmg 88

## Pumpkin King (CR 10)
- clean
- read: def 8 / off 11 → 9.5; sustained 69 (3 × Scythe Arm); nova Harvest Sweep 24; dmg 69

## Forge Knife Ball (CR 5)
- adjudicability · SOFT · inline-weapon-collision: inline-weapon-collision: header/inline: "the knife ball" is the weapon "dagger" — its own rows will read as the weapon's
- read: def 5 / off 7 → 6; sustained 42 (2 × Knife); nova Knife Burst 26; dmg 45

## Warp Warren Sorcerer (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Skull-Crack Squeeze
- donor · note · print-row-exception: Actions/Quarterstaff rides on: print rules row
- donor · note · print-row-exception: Reactions/Protective Magic rides on: the user's own part, feature or species
- read: def 3 / off 2 → 2.5; sustained 14 (2 × Quarterstaff); nova none; dmg 14

## Tome Custodian (CR 3)
- derivation · SOFT · hit-die: d8 on a Small body (d6)
- bands · note · print-numbers: Mummy's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Tome Burst rides on: seed keyed on the user's words (burst, throw)
- read: def 1 / off 5 → 3; sustained 36 (2 × Rotting Fist); nova Tome Burst 13; dmg 36

## Silver-Tongued Toad (CR 2)
- reader · SOFT · inline-consistency: Traits/Throat-Stolen Words says "the toad" beside the sheet's inline "the silver-tongued toad"
- read: def 2 / off 2 → 2; sustained 13 (1 × Tongue); nova none; dmg 13

## Drowned Pike (CR 3)
- adjudicability · SOFT · inline-weapon-collision: inline-weapon-collision: header/inline: "the pike" is the weapon "pike" — its own rows will read as the weapon's
- read: def 2 / off 4 → 3; sustained 26 (2 × Bite); nova none; dmg 26


## Audit findings dismissed on print rows

**2** finding(s) dismissed across 7 sheet(s) that carry the record.

- Tome Custodian · Actions/"Dreadful Glare" — The success rider refers to the creature as a mummy, a name that is not this block's own. — Replace the referent with the custodian's own name. (about: "The target is immune to this mummy's Dreadful Glare for 24 hours.")
- Tome Custodian · Actions/"Rotting Fist" — The curse imposes a permanent, escalating Hit Point maximum drain with no listed escape, removal, or duration, leaving the target no rules-legal path out. — Add an end condition or escape (a repeat save, a removal clause, or a stated end) to the curse. (about: "it is cursed. While cursed, the target can't regain Hit Points, its Hit Point maximum doesn't return to normal when finishing a Long Rest, and its Hit Point maximum decreases by 10 (3d6) every 24 hours that elapse.")

Reporting only: none of these raised a FAIL or changed a sheet.


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 1
- `multiattack` ×6

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
