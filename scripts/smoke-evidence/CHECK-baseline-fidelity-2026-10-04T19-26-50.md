# Mechanics check — baseline-fidelity-2026-10-04T19-26-50

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | brute-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 7/7 | 4/5 |
| Scrapmaw Knifewheel | 2 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 0/4 |
| Mire Crone | 4 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/5 |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Crimson Vicar | 8 | 2024 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 8/8 |
| Croakrider | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/6 |
| Vault Sentinel | 4 | 2024 | lurker-2-trap | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 2/4 |
| Staff Wizard Rodrin | 3 (2014) | 2014 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/2 |
| Leviathan Terrapin | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/2 |
| Pikachu | 2 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 1/3 |
| Sock Rot | 3 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 2/3 | 4/4 |
| Grandmother Ash | 7 (2014) | 2014 | lurker-5-phantom | ok | SOFT: aim-dpr, band | ok | SOFT: rider-no-save | ok | ok | ok | ok | soft (2) | 7/7 | 6/6 |
| Iron Bull | 12 | 2024 | brute-11-charger | ok | SOFT: aim-dpr | ok | ok | ok | ok | ok | ok | soft (1) | 6/6 | 6/7 |
| Lantern Drowned | 6 (2014) | 2014 | lurker-5-phantom | ok | SOFT: aim-dpr | ok | SOFT: ko-at-will, rider-no-save, rider-no-save | ok | ok | ok | ok | soft (2) | 5/6 | 6/6 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Grubtail | 0.5 (2014) | 2014 | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Beedragon | 10 | 2024 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 7 of 46 user clauses** (coverage 85%); concept share 78% (62/79 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Meshrin (CR 8, 2014)
- bands · SOFT · band: reads CR 5.5 (print at 8 reads 2–8.5, n=10)
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Shoulder Slam); nova none; dmg 44

## Scrapmaw Knifewheel (CR 2, 2014)
- clean
- read: def 1/8 / off 2 → 1.0625; sustained 20 (2 × Blades); nova none; dmg 20

## Mire Crone (CR 4)
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Brine Claw); nova none; dmg 26

## Troll (CR 5, 2014)
- clean
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 3 / off 5 → 4; sustained 34 (2 × Rend); nova none; dmg 34

## Crimson Vicar (CR 8)
- clean
- read: def 6 / off 8 → 7; sustained 48 (3 × Grave Strike); nova none; dmg 48

## Croakrider (CR 1, 2014)
- clean
- donor · note · print-row-exception: Traits/Bounding Stride rides on: the seat the user's words named
- donor · note · print-row-exception: Actions/Croaking Onslaught rides on: the seat the user's words named
- donor · note · print-row-exception: Actions/Tangling Net rides on: seed the user's words keyed
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Scimitar); nova Croaking Onslaught 6; dmg 11

## Vault Sentinel (CR 4)
- bands · SOFT · aim-dpr: damage 17 a round is 43% under the card's 30
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 2 / off 3 → 2.5; sustained 17 (1 × Stone Claw); nova none; dmg 17

## Staff Wizard Rodrin (CR 3, 2014)
- bands · SOFT · band: reads CR 1.75 (print at 3 reads 0.125–6.5, n=23)
- donor · note · print-row-exception: Actions/Iron-Shod Staff rides on: print rules row
- donor · note · print-row-exception: Actions/Staff Siphon rides on: seed the user's words keyed
- read: def 1/2 / off 3 → 1.75; sustained 22 (2 × Iron-Shod Staff); nova none; dmg 22

## Leviathan Terrapin (CR 9)
- clean
- bands · note · user-set: user-set: AC 22 · reads CR 12.5
- read: def 10 / off 15 → 12.5; sustained 98 (2 × Bite); nova none; dmg 98

## Pikachu (CR 2)
- clean
- read: def 1/4 / off 3 → 1.625; sustained 14 (2 × Static Bolt); nova Overcharge Burst 11; dmg 17

## Sir Reginald Pemberton-Hughes (CR 5, 2014)
- bands · SOFT · aim-dpr: damage 20 a round is 44% under the table's 36
- bands · SOFT · band: reads CR 3.5 (print at 5 reads 2.5–9.5, n=25)
- read: def 4 / off 3 → 3.5; sustained 20 (2 × Knightly Longsword); nova none; dmg 20

## Sock Rot (CR 3)
- bands · SOFT · band: reads CR 1.75 (print at 3 reads 0.375–5, n=83)
- read: def 1/2 / off 3 → 1.75; sustained 24 (2 × Sock Whip); nova none; dmg 24

## Grandmother Ash (CR 7, 2014)
- bands · SOFT · aim-dpr: damage 24 a round is 50% under the table's 48
- bands · SOFT · band: reads CR 5.5 (print at 7 reads 4.5–8.5, n=6)
- gates · SOFT · rider-no-save: Actions/Rotting Nails: a Poisoned rider on every hit with no save
- read: def 7 / off 4 → 5.5; sustained 24 (2 × Rotting Nails); nova none; dmg 24

## Iron Bull (CR 12)
- bands · SOFT · aim-dpr: damage 71 a round is 21% under the card's 90
- read: def 10 / off 12 → 11; sustained 48 (2 × Gore); nova Scalding Steam 58; dmg 71

## Lantern Drowned (CR 6, 2014)
- bands · SOFT · aim-dpr: damage 24 a round is 43% under the table's 42
- gates · SOFT · ko-at-will: Actions/Numbing Touch: Paralyzed at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- gates · SOFT · rider-no-save: Actions/Numbing Touch: a Paralyzed rider on every hit with no save
- gates · SOFT · rider-no-save: Actions/Lantern Swing: a Charmed rider on every hit with no save
- read: def 6 / off 4 → 5; sustained 24 (2 × Numbing Touch); nova none; dmg 24

## Owlbear (CR 3)
- clean
- bands · note · print-numbers: Owlbear's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/2 / off 4 → 2.25; sustained 26 (1 × Rend); nova none; dmg 26

## Grubtail (CR 0.5, 2014)
- clean
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Caltrop Fling); nova none; dmg 10

## Beedragon (CR 10)
- clean
- bands · note · print-numbers: Young Gold Dragon's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Poison Breath rides on: print rules row
- read: def 9 / off 10 → 9.5; sustained 30 (3 × Rend); nova Poison Breath 55; dmg 57
