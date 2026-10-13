# Mechanics check — baseline-fidelity-2026-10-12T14-30-29

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | defender-8-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 7/7 | 8/8 |
| Warpath Ball | 2 (2014) | 2014 | skirmisher-8-hurler | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/6 |
| Brinewrack Marrowdow | 4 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 1/6 |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Thrall Sovereign | 8 | 2024 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Bog Lurker | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/6 |
| Stillstone Gargoyle | 4 | 2024 | lurker-2-trap | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Staffsore | 3 (2014) | 2014 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | ok | soft (2) | 2/2 | 2/2 |
| Mudsnapper Leviathan | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |
| Pikachu | 2 | 2024 | caster-6 | ok | ok | ok | ok | SOFT: languages-type, lint:beast-intelligence | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Lost Sock Heap | 3 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 2/3 | 2/4 |
| Grandmother Ash | 7 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | ok | soft (2) | 6/7 | 7/7 |
| Iron Bull | 12 | 2024 | brute-11-charger | ok | SOFT: band, hot | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | soft (2) | 6/6 | 6/7 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Skittergrasp | 0.5 (2014) | 2014 | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |

**Dropped 3 of 39 user clauses** (coverage 92%); concept share 79% (61/77 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Meshrin (CR 8, 2014)
- bands · SOFT · band: reads CR 6.5 (print at 8 reads 2–8.5, n=10)
- read: def 5 / off 8 → 6.5; sustained 51 (3 × Tail Swipe); nova none; dmg 51

## Warpath Ball (CR 2, 2014)
- bands · SOFT · aim-dpr: damage 14 a round is 22% under the table's 18
- bands · SOFT · band: reads CR 0.625 (print at 2 reads 0.125–2.5, n=43)
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Hooked Blades); nova Blade Burst 11; dmg 14

## Brinewrack Marrowdow (CR 4)
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Claw); nova none; dmg 26

## Troll (CR 5, 2014)
- clean
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 3 / off 5 → 4; sustained 34 (2 × Rend); nova none; dmg 34

## Thrall Sovereign (CR 8)
- clean
- read: def 6 / off 10 → 8; sustained 63 (3 × Grave Strike); nova none; dmg 63

## Bog Lurker (CR 1, 2014)
- clean
- donor · note · print-row-exception: Traits/Reed Stride rides on: the seat the user's words named
- donor · note · print-row-exception: Actions/Marsh Charge rides on: the seat the user's words named
- donor · note · print-row-exception: Actions/Snagging Scour rides on: seed the user's words keyed
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Scimitar); nova Marsh Charge 6; dmg 11

## Stillstone Gargoyle (CR 4)
- clean
- read: def 2 / off 4 → 3; sustained 26 (1 × Claw); nova none; dmg 26

## Staffsore (CR 3, 2014)
- bands · SOFT · band: reads CR 1.75 (print at 3 reads 0.125–6.5, n=23)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Staff
- donor · note · print-row-exception: Actions/Staff Bind rides on: seed the user's words keyed
- read: def 1/2 / off 3 → 1.75; sustained 22 (2 × Staff); nova none; dmg 22

## Mudsnapper Leviathan (CR 9)
- clean
- bands · note · user-set: user-set: AC 22 · reads CR 12.5
- read: def 10 / off 15 → 12.5; sustained 98 (2 × Bite); nova none; dmg 98

## Pikachu (CR 2)
- headerBody · SOFT · languages-type: a Beast that speaks (Common)
- headerBody · SOFT · lint:beast-intelligence: type Beast with INT 17 — beasts cap at INT 8 (Giant Owl); a genius predator is a Monstrosity
- read: def 1/4 / off 2 → 1.125; sustained 14 (2 × Spark); nova none; dmg 14

## Sir Reginald Pemberton-Hughes (CR 5, 2014)
- clean
- donor · note · print-row-exception: Traits/Avian Terror rides on: seed the user's words keyed
- read: def 4 / off 6 → 5; sustained 40 (2 × Greatsword); nova none; dmg 40

## Lost Sock Heap (CR 3)
- bands · SOFT · band: reads CR 1.75 (print at 3 reads 0.375–5, n=83)
- read: def 1/2 / off 3 → 1.75; sustained 24 (2 × Fold); nova none; dmg 24

## Grandmother Ash (CR 7, 2014)
- bands · SOFT · band: reads CR 5.5 (print at 7 reads 4.5–8.5, n=6)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Nails
- donor · note · print-row-exception: Traits/Heated Body rides on: seed the user's words keyed
- donor · note · print-row-exception: Actions/Noxious Spew rides on: seed the user's words keyed
- read: def 4 / off 7 → 5.5; sustained 50 (2 × Nails); nova Noxious Spew 22; dmg 50

## Iron Bull (CR 12)
- bands · SOFT · band: reads CR 15.5 (print at 12 reads 8–14, n=15)
- bands · SOFT · hot: reads CR 15.5, more than three over — the user's own immunity line drives the defensive read (user-set)
- headerBody · SOFT · lint:bps-immunity: Immunity to all three physical types — 0/329 printed blocks have it; the physical types are stripped from Immunities
- read: def 16 / off 15 → 15.5; sustained 92 (2 × Gore); nova Steam Shriek 42; dmg 92

## Owlbear (CR 3)
- clean
- bands · note · print-numbers: Owlbear's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/2 / off 4 → 2.25; sustained 26 (1 × Rend); nova none; dmg 26

## Skittergrasp (CR 0.5, 2014)
- clean
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Hand Crossbow); nova none; dmg 10
