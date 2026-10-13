# Mechanics check — baseline-fidelity-2026-10-04T14-24-06

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | brute-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 4/6 | 2/3 |
| Knellwheel | 2 (2014) | 2014 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 0/2 |
| Mirewydd | 4 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 0/5 |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Thrallcrown | 8 | 2024 | skirmisher-8 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 8/8 |
| Fenhook Rider | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Stillward Watcher | 4 | 2024 | lurker-2-trap | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 1/5 |
| Unspelled | 3 (2014) | 2014 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Marshjaw Hullback | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 0/3 |
| Pikachu | 2 | 2024 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 1/3 |
| Lintwretch Stitcher | 3 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 2/4 | 1/4 |
| Grandmother Ash | 7 (2014) | 2014 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 3/6 | 6/6 |
| Iron Warden Bull | 12 | 2024 | brute-11-charger | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/5 | 5/6 |
| Lantern Drowned | 6 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/5 | 5/5 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Snagfuse Cinderpot | 0.5 (2014) | 2014 | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/4 |
| Hoardbrood Hivewyrm | 10 | 2024 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 20 of 41 user clauses** (coverage 51%); concept share 65% (51/78 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Meshrin (CR 8, 2014)
- bands · SOFT · band: reads CR 6.5 (print at 8 reads 2–8.5, n=10)
- read: def 5 / off 8 → 6.5; sustained 52 (2 × Greatsword); nova none; dmg 52

## Knellwheel (CR 2, 2014)
- clean
- read: def 1/8 / off 2 → 1.0625; sustained 19 (1 × Blades); nova none; dmg 19

## Mirewydd (CR 4)
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Nails); nova none; dmg 26

## Troll (CR 5, 2014)
- clean
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 3 / off 5 → 4; sustained 34 (2 × Rend); nova none; dmg 34

## Thrallcrown (CR 8)
- bands · SOFT · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 48 (3 × Grave Strike); nova none; dmg 48

## Fenhook Rider (CR 1, 2014)
- clean
- donor · note · print-row-exception: Traits/Bounding Leap rides on: the seat the user's words named
- donor · note · print-row-exception: Actions/Hopping Charge rides on: the seat the user's words named
- donor · note · print-row-exception: Actions/Rein Tangle rides on: seed the user's words keyed
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Scimitar); nova Hopping Charge 6; dmg 11

## Stillward Watcher (CR 4)
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (1 × Claw); nova none; dmg 26

## Unspelled (CR 3, 2014)
- bands · SOFT · band: reads CR 1.75 (print at 3 reads 0.125–6.5, n=23)
- donor · note · print-row-exception: Actions/Staff Strike rides on: print rules row
- read: def 1/2 / off 3 → 1.75; sustained 22 (2 × Staff Strike); nova none; dmg 22

## Marshjaw Hullback (CR 9)
- clean
- read: def 7 / off 9 → 8; sustained 62 (2 × Bite); nova none; dmg 62

## Pikachu (CR 2)
- clean
- read: def 1/2 / off 3 → 1.75; sustained 12 (2 × Incisors); nova Stone Fling 11; dmg 15

## Sir Reginald Pemberton-Hughes (CR 5, 2014)
- clean
- read: def 4 / off 4 → 4; sustained 32 (2 × Longsword); nova none; dmg 32

## Lintwretch Stitcher (CR 3)
- bands · SOFT · band: reads CR 1.75 (print at 3 reads 0.375–5, n=83)
- read: def 1/2 / off 3 → 1.75; sustained 24 (2 × Stitched Grasp); nova none; dmg 24

## Grandmother Ash (CR 7, 2014)
- bands · SOFT · band: reads CR 5 (print at 7 reads 4.5–8.5, n=6)
- read: def 4 / off 6 → 5; sustained 39 (3 × Rot Nails); nova Shardscream Spew 14; dmg 39

## Iron Warden Bull (CR 12)
- clean
- read: def 10 / off 14 → 12; sustained 84 (2 × Gore); nova Scalding Vent 42; dmg 84

## Lantern Drowned (CR 6, 2014)
- clean
- read: def 6 / off 6 → 6; sustained 42 (2 × Numbing Grasp); nova none; dmg 42

## Owlbear (CR 3)
- clean
- bands · note · print-numbers: Owlbear's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/2 / off 4 → 2.25; sustained 26 (1 × Rend); nova none; dmg 26

## Snagfuse Cinderpot (CR 0.5, 2014)
- clean
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Hurled Scythe); nova none; dmg 10

## Hoardbrood Hivewyrm (CR 10)
- clean
- bands · note · print-numbers: Young Gold Dragon's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Poison Breath rides on: print rules row
- read: def 9 / off 10 → 9.5; sustained 30 (3 × Rend); nova Poison Breath 55; dmg 57
