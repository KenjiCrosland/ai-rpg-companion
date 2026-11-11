# Mechanics check — gate-b-engulf-2026-11-10T20-31-09

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gelatinous Cube | 2 | 2024 | ooze-1 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Black Vat Ooze | 3 | 2024 | ooze-1 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 3/5 |
| Gorgebellied Marshfrog | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/4 |
| Silt Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 3/4 |
| Fenmire Gravehound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/3 |
| Scarreled Deathroll | 2 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/2 |
| Drowned Lure Eel | 3 | 2024 | brute-5-grappler | FAIL: escape-dc | ok | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 2/3 |
| Muckhold Troll | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | SOFT: orphan-condition-ref | ok | ok | soft (1) | 0/1 | 4/4 |
| Weed-Saddled Drowner | 4 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/3 |
| Mire Parish Witch | 6 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/3 |
| Binding Cord | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 0/3 |
| Dunegorge Sandmaw | 9 | 2024 | brute-8-grappler | FAIL: escape-dc | SOFT: aim-atk | ok | ok | ok | FAIL: lint:phrasing-surprised | ok | ok | ok | ok | FAIL (2) | 2/2 | 1/4 |

**Dropped 6 of 15 GM clauses** (coverage 60%); concept share 59% (26/44 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-5-grappler / derivation: 1
- brute-8-grappler / derivation: 1
- brute-8-grappler / edition: 1


## Gelatinous Cube (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Amorphous, Traits/Corrosive Form
- bands · note · print-numbers: Gelatinous Cube's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/4 / off 2 → 1.125; sustained 12 (1 × Pseudopod); nova Engulf 10; dmg 15

## Black Vat Ooze (CR 3)
- bands · SOFT · band: reads CR 1.75 (print at 3 reads 0.625–5, n=83)
- read: def 1/2 / off 3 → 1.75; sustained 21 (1 × Slam); nova none; dmg 21

## Gorgebellied Marshfrog (CR 1)
- clean
- read: def 1 / off 1 → 1; sustained 12 (2 × Tongue); nova none; dmg 12

## Silt Hound (CR 1, 2014)
- gates · SOFT · rider-no-save: Actions/Drag Under: a Restrained rider on every hit with no save
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Bite); nova none; dmg 10

## Fenmire Gravehound (CR 1)
- clean
- read: def 1 / off 1 → 1; sustained 12 (2 × Jaws); nova none; dmg 12

## Scarreled Deathroll (CR 2)
- clean
- read: def 2 / off 2 → 2; sustained 14 (2 × Bite); nova none; dmg 14

## Drowned Lure Eel (CR 3)
- derivation · FAIL · escape-dc: Actions/Bite: escape DC 13, derived 14
- read: def 2 / off 4 → 3; sustained 26 (2 × Bite); nova none; dmg 26

## Muckhold Troll (CR 5)
- adjudicability · SOFT · orphan-condition-ref: orphan-condition-ref: "Grappled" is referenced as a state but nothing on the sheet applies it
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 5 / off 5 → 5; sustained 33 (3 × Rend); nova none; dmg 33

## Weed-Saddled Drowner (CR 4)
- clean
- read: def 3 / off 4 → 3.5; sustained 28 (2 × Kick); nova none; dmg 28

## Mire Parish Witch (CR 6)
- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mire Hand); nova none; dmg 44

## Binding Cord (CR 5)
- clean
- read: def 4 / off 5 → 4.5; sustained 38 (2 × Thorned Tendril); nova none; dmg 38

## Dunegorge Sandmaw (CR 9)
- derivation · FAIL · escape-dc: Actions/Bite: escape DC 16, derived 19
- bands · SOFT · aim-atk: attack +11 against the aim's +8
- edition · FAIL · lint:phrasing-surprised: Traits/Trembling Depths references "surprised" — 2024 has no surprised state (surprise gives Disadvantage on initiative); phrase the trigger as "a creature that hasn't taken a turn in combat yet"
- read: def 7 / off 12 → 9.5; sustained 68 (2 × Bite); nova none; dmg 68


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 6
- `multiattack` ×10
- `bite` ×4
- `amorphous` ×2
- `corrosive form` ×2
- `engulf` ×2
- `swallow` ×2

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
