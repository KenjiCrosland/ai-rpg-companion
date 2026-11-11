# Mechanics check — gate-h-hold-2026-11-11T05-44-38

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gelatinous Cube | 2 | 2024 | ooze-1 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Tar Pool Ooze | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 2/3 |
| Pond Gulper | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |
| Mire Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/3 |
| Oxbow Lurker | 2 | 2024 | brute-5-grappler | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 1/3 |
| Cove Bull Eel | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | FAIL: grapple-no-escape | ok | ok | FAIL (1) | 0/1 | 2/3 |
| Under-Muck Troll | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | SOFT: print-rows | SOFT: motionless-invisible, orphan-condition-ref | ok | ok | soft (2) | 1/1 | 6/6 |
| Fenwrack Hag | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 0/1 | 6/6 |
| Tollroad Gullet | 9 | 2024 | brute-8-grappler | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 1/4 |
| Cave Roper | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | FAIL: vocab-2014-in-2024 | ok | SOFT: prone-duration | ok | ok | FAIL (1) | 1/1 | 3/3 |
| Silkreef Ettercap | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Brine Spawn | 6 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 5 of 14 GM clauses** (coverage 64%); concept share 84% (43/51 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-5-grappler / adjudicability: 1
- brute-5-grappler / edition: 1


## Gelatinous Cube (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Amorphous, Traits/Corrosive Form
- bands · note · print-numbers: Gelatinous Cube's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/4 / off 2 → 1.125; sustained 12 (1 × Pseudopod); nova Engulf 10; dmg 15

## Tar Pool Ooze (CR 3)
- clean
- read: def 2 / off 3 → 2.5; sustained 24 (2 × Pseudopod); nova none; dmg 24

## Pond Gulper (CR 1)
- clean
- read: def 1 / off 1 → 1; sustained 12 (2 × Bite); nova none; dmg 12

## Mire Hound (CR 1, 2014)
- clean
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Bite); nova none; dmg 10

## Oxbow Lurker (CR 2)
- gates · SOFT · rider-no-save: Actions/Undertow Drag: a Restrained rider on every hit with no save
- read: def 2 / off 2 → 2; sustained 14 (2 × Bite); nova none; dmg 14

## Cove Bull Eel (CR 3)
- adjudicability · FAIL · grapple-no-escape: Traits/Pearlescent Slime: applies the Grappled condition with no escape DC
- read: def 3 / off 3 → 3; sustained 24 (2 × Bite); nova none; dmg 24

## Under-Muck Troll (CR 5)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Muck-Buried
- adjudicability · SOFT · motionless-invisible: motionless-invisible: Traits/Muck-Buried: motionless disguise written as the Invisible condition — a still creature is indistinguishable from an object, not unseen; use "is indistinguishable from an ordinary <object>"
- adjudicability · SOFT · orphan-condition-ref: orphan-condition-ref: "Grappled" is referenced as a state but nothing on the sheet applies it
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Muck Maw rides on: seed from the fallback library — no word of the user's keyed it
- read: def 6 / off 5 → 5.5; sustained 33 (3 × Rend); nova none; dmg 33

## Fenwrack Hag (CR 6)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Mire Step
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Cloying Mire rides on: seed from the fallback library — no word of the user's keyed it
- read: def 5 / off 8 → 6.5; sustained 48 (3 × Arcane Burst); nova Cone of Cold 36; dmg 56

## Tollroad Gullet (CR 9)
- bands · SOFT · aim-atk: attack +11 against the aim's +8
- read: def 7 / off 12 → 9.5; sustained 68 (2 × Jaws); nova none; dmg 68

## Cave Roper (CR 5)
- edition · FAIL · vocab-2014-in-2024: 2014 wording in a 2024 block: "must succeed on a DC"
- adjudicability · SOFT · prone-duration: prone-duration: Traits/Wall Anchored: Prone carries a duration — officials never duration Prone (standing up is the exit); the duration is stripped
- read: def 4 / off 4 → 4; sustained 32 (2 × Tendril); nova none; dmg 32

## Silkreef Ettercap (CR 2)
- clean
- bands · note · print-numbers: Ettercap's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Fangs rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Web Snare rides on: seed keyed on the user's words (web, strand)
- donor · note · print-row-exception: Traits/Adhesive rides on: seed from the fallback library — no word of the user's keyed it
- read: def 2 / off 1 → 1.5; sustained 12 (1 × Fangs); nova none; dmg 12

## Brine Spawn (CR 6)
- clean
- read: def 5 / off 6 → 5.5; sustained 40 (2 × Grasping Tentacles); nova none; dmg 40


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 5
- `multiattack` ×11
- `bite` ×4
- `pseudopod` ×2
- `engulf` ×2
- `swallow` ×2

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
