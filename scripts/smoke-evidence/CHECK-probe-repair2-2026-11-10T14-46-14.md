# Mechanics check — probe-repair2-2026-11-10T14-46-14

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Coinfell Sellsword | 8 (2014) | 2014 | skirmisher-8-hurler | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | SOFT: inline-weapon-collision | ok | ok | soft (3) | 1/2 | 4/5 |
| Mother Ash | 9 | 2024 | brute-8-grappler | ok | ok | SOFT: reach | ok | ok | ok | ok | SOFT: orphan-condition-ref | ok | ok | soft (2) | 2/3 | 4/4 |
| Chalk-Hound | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/4 |
| Contract-Broke Axeman | 8 (2014) | 2014 | skirmisher-8-hurler | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (2) | 1/2 | 4/5 |
| Mother Ash | 9 | 2024 | brute-8-grappler | ok | SOFT: single-target-ceiling | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (2) | 1/3 | 2/2 |
| Limewash Seam-Runt | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 1/3 |
| Merrow Contractblade | 8 (2014) | 2014 | skirmisher-8-hurler | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (2) | 2/2 | 4/5 |
| Mother Ash | 9 | 2024 | brute-8-grappler | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/3 | 3/3 |
| Daubjaw | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 3/4 |

**Dropped 9 of 21 GM clauses** (coverage 57%); concept share 80% (28/35 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Coinfell Sellsword (CR 8, 2014)
- bands · SOFT · band: reads CR 6.5 (print at 8 reads 3–9, n=10)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Flinching Arc
- adjudicability · SOFT · inline-weapon-collision: the 2024 model: inline-weapon-collision: header/inline: "the sellsword" is the weapon "longsword" — its own rows will read as the weapon's
- donor · note · print-row-exception: Actions/Handaxe rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Shortsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Reactions/Riposte rides on: the user's own part, feature or species
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Handaxe); nova none; dmg 54

## Mother Ash (CR 9)
- structure · SOFT · reach: Actions/Claw: reach 10 on a Medium body with no tether word
- adjudicability · SOFT · orphan-condition-ref: orphan-condition-ref: "Grappled" is referenced as a state but nothing on the sheet applies it
- read: def 8 / off 9 → 8.5; sustained 60 (2 × Claw); nova none; dmg 60

## Chalk-Hound (CR 5)
- clean
- read: def 4 / off 4 → 4; sustained 32 (2 × Bite); nova none; dmg 32

## Contract-Broke Axeman (CR 8, 2014)
- bands · SOFT · band: reads CR 6.5 (print at 8 reads 3–9, n=10)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Meant to Make It Look
- donor · note · print-row-exception: Actions/Handaxe rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Shortsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Reactions/Riposte rides on: the user's own part, feature or species
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Handaxe); nova none; dmg 54

## Mother Ash (CR 9)
- bands · SOFT · single-target-ceiling: Actions/Claw: 37 damage to one target in one action at CR 9 — print's hardest single hit in this band is 35 (1.06x), and a gate does not excuse it (print's are ungated)
- structure · SOFT · reach: Actions/Claw: reach 10 on a Medium body with no tether word
- read: def 8 / off 9 → 8.5; sustained 60 (2 × Claw); nova none; dmg 60

## Limewash Seam-Runt (CR 5)
- clean
- read: def 4 / off 4 → 4; sustained 32 (2 × Bite); nova none; dmg 32

## Merrow Contractblade (CR 8, 2014)
- bands · SOFT · band: reads CR 6.5 (print at 8 reads 3–9, n=10)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Nerve Breaks
- donor · note · print-row-exception: Actions/Handaxe rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Shortsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Reactions/Riposte rides on: the user's own part, feature or species
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Handaxe); nova none; dmg 54

## Mother Ash (CR 9)
- structure · SOFT · reach: Actions/Claw: reach 10 on a Medium body with no tether word
- read: def 8 / off 9 → 8.5; sustained 60 (2 × Claw); nova none; dmg 60

## Daubjaw (CR 5)
- clean
- read: def 4 / off 4 → 4; sustained 32 (2 × Bite); nova none; dmg 32


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 9
- `multiattack` ×9
- `smother` ×4
- `handaxe` ×3
- `shortsword` ×3
- `shield bash` ×3
- `riposte` ×3
- `claw` ×3
- `bite` ×3

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
