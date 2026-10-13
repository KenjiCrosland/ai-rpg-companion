# Mechanics check — baseline-fidelity-2026-10-12T21-31-00

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 7/7 | 6/6 |
| Knife Ball | 2 (2014) | 2014 | skirmisher-8-hurler | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/7 |
| Mirel Dreen | 4 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 0/5 |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Crossroads Tyrant | 8 | 2024 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/9 |
| Marsh Skipper | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/6 |
| Vigil Stone | 4 | 2024 | lurker-2-trap | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Staffmage | 3 (2014) | 2014 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 1/1 |
| Muckjaw Leviathan | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |
| Pikachu | 2 | 2024 | caster-6 | ok | ok | ok | ok | SOFT: lint:beast-intelligence | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Hamperwretch | 3 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 3/3 | 1/4 |
| Grandmother Ash | 7 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 6/7 | 5/5 |
| Iron Bull Golem | 12 | 2024 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | soft (2) | 6/6 | 6/7 |
| Lantern Drowned | 6 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | clean | 5/6 | 6/6 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Caltrop Runner | 0.5 (2014) | 2014 | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Apiarch | 10 | 2024 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 3 of 46 user clauses** (coverage 93%); concept share 79% (65/82 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Meshrin (CR 8, 2014)
- clean
- read: def 7 / off 8 → 7.5; sustained 52 (2 × Greatsword); nova none; dmg 52

## Knife Ball (CR 2, 2014)
- bands · SOFT · aim-dpr: damage 14 a round is 22% under the table's 18
- bands · SOFT · band: reads CR 0.625 (print at 2 reads 0.125–2.5, n=43)
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Core Slam); nova Knife Scatter 11; dmg 14

## Mirel Dreen (CR 4)
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Claw); nova none; dmg 26

## Troll (CR 5, 2014)
- clean
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 3 / off 5 → 4; sustained 33 (3 × Rend); nova none; dmg 33

## Crossroads Tyrant (CR 8)
- clean
- donor · note · print-row-exception: Actions/Creeping Dread rides on: seed the user's words keyed
- read: def 6 / off 10 → 8; sustained 63 (3 × Grave Strike); nova none; dmg 63

## Marsh Skipper (CR 1, 2014)
- clean
- donor · note · print-row-exception: Traits/Slippery rides on: the seat the user's words named
- donor · note · print-row-exception: Actions/Bounding Leap rides on: the seat the user's words named
- donor · note · print-row-exception: Actions/Snaring Skein rides on: seed the user's words keyed
- read: def 1/8 / off 1 → 0.5625; sustained 12 (2 × Scimitar); nova Bounding Leap 6; dmg 12

## Vigil Stone (CR 4)
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 28 (1 × Slam); nova none; dmg 28

## Staffmage (CR 3, 2014)
- bands · SOFT · band: reads CR 1.75 (print at 3 reads 0.125–6.5, n=23)
- donor · note · print-row-exception: Actions/Staff rides on: the user's own part or feature
- read: def 1/2 / off 3 → 1.75; sustained 22 (2 × Staff); nova none; dmg 22

## Muckjaw Leviathan (CR 9)
- clean
- bands · note · user-set: user-set: AC 22 · reads CR 12.5
- read: def 10 / off 15 → 12.5; sustained 98 (2 × Bite); nova none; dmg 98

## Pikachu (CR 2)
- headerBody · SOFT · lint:beast-intelligence: type Beast with INT 17 — beasts cap at INT 8 (Giant Owl); a genius predator is a Monstrosity
- read: def 1/4 / off 2 → 1.125; sustained 14 (2 × Spark); nova none; dmg 14

## Sir Reginald Pemberton-Hughes (CR 5, 2014)
- clean
- donor · note · print-row-exception: Traits/Phobia rides on: seed the user's words keyed
- read: def 3 / off 6 → 4.5; sustained 40 (2 × Greatsword); nova none; dmg 40

## Hamperwretch (CR 3)
- bands · SOFT · band: reads CR 1.75 (print at 3 reads 0.375–5, n=83)
- read: def 1/2 / off 3 → 1.75; sustained 24 (2 × Sodden Wrap); nova none; dmg 24

## Grandmother Ash (CR 7, 2014)
- bands · SOFT · band: reads CR 5 (print at 7 reads 4.5–8.5, n=6)
- donor · note · print-row-exception: Traits/Toxic Reek rides on: seed the user's words keyed
- donor · note · print-row-exception: Actions/Nails rides on: the user's own part or feature
- donor · note · print-row-exception: Actions/Choking Miasma rides on: seed the user's words keyed
- read: def 4 / off 6 → 5; sustained 42 (2 × Nails); nova Choking Miasma 22; dmg 43

## Iron Bull Golem (CR 12)
- bands · SOFT · band: reads CR 15 (print at 12 reads 8–14, n=15)
- headerBody · SOFT · lint:bps-immunity: Immunity to all three physical types — 0/329 printed blocks have it; the physical types are stripped from Immunities
- read: def 16 / off 14 → 15; sustained 84 (2 × Gore); nova Shockwave 42; dmg 84

## Lantern Drowned (CR 6, 2014)
- clean
- read: def 6 / off 6 → 6; sustained 42 (2 × Dripping Hand); nova none; dmg 42

## Owlbear (CR 3)
- clean
- bands · note · print-numbers: Owlbear's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/2 / off 5 → 2.75; sustained 28 (2 × Rend); nova none; dmg 28

## Caltrop Runner (CR 0.5, 2014)
- clean
- read: def 1/8 / off 1/2 → 0.3125; sustained 8 (2 × Hand Crossbow); nova none; dmg 8

## Apiarch (CR 10)
- clean
- bands · note · print-numbers: Young Gold Dragon's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Poison Breath rides on: print rules row
- read: def 9 / off 10 → 9.5; sustained 30 (3 × Rend); nova Poison Breath 55; dmg 57
