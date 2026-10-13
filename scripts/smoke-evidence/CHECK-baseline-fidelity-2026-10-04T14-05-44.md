# Mechanics check — baseline-fidelity-2026-10-04T14-05-44

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | brute-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 4/7 | 2/3 |
| Grinding Knife Ball | 2 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/0 | 0/4 |
| Bog Widow | 4 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 0/0 | 0/5 |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/0 | 0/4 |
| Pale Castellan | 8 | 2024 | skirmisher-8 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 0/0 | 0/8 |
| Fenrider Gloomcroak | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/6 |
| Warden Gargoyle | 4 | 2024 | lurker-2-trap | ok | SOFT: band | SOFT: payoff-producer | ok | ok | ok | SOFT: print-rows | ok | soft (3) | 1/1 | 3/4 |
| Staffdrub Scholar | 3 (2014) | 2014 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/5 |
| Crunchmire | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/2 | 0/3 |
| Pikachu | 2 | 2024 | caster-6 | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | soft (1) | 0/0 | 0/4 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 0/3 |
| Damp Lint | 3 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 2/3 | 1/4 |
| Grandmother Ash | 7 (2014) | 2014 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 3/3 | 6/6 |
| Vault Sentinel | 12 | 2024 | brute-11-charger | ok | ok | ok | ok | ok | ok | ok | ok | clean | 3/5 | 1/6 |
| Lantern Drowned | 6 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/3 | 1/6 |
| Owlbear | 3 | 2024 | brute-2 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | soft (1) | 0/0 | 0/1 |
| Grubscar the Tunneler | 0.5 (2014) | 2014 | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 1/4 |
| Apiary Dread | 10 | 2024 | dragon-8 | ok | SOFT: aim-dpr | ok | ok | ok | ok | ok | ok | soft (1) | 0/0 | 0/3 |

**Dropped 12 of 29 user clauses** (coverage 59%); concept share 40% (20/50 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Meshrin (CR 8, 2014)
- bands · SOFT · band: reads CR 6.5 (print at 8 reads 2–8.5, n=10)
- read: def 5 / off 8 → 6.5; sustained 52 (2 × Greatsword); nova none; dmg 52

## Grinding Knife Ball (CR 2, 2014)
- clean
- read: def 1/8 / off 2 → 1.0625; sustained 20 (2 × Blade Cage); nova none; dmg 20

## Bog Widow (CR 4)
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Claw); nova none; dmg 26

## Troll (CR 5, 2014)
- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Rend); nova none; dmg 34

## Pale Castellan (CR 8)
- bands · SOFT · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 48 (3 × Grave Strike); nova none; dmg 48

## Fenrider Gloomcroak (CR 1, 2014)
- clean
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Scimitar); nova Bounding Ride-By 6; dmg 11

## Warden Gargoyle (CR 4)
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- structure · SOFT · payoff-producer: Actions/Stillstone Ambush pays off the Blinded condition but nothing on the sheet imposes it
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Adhesive Hide, Bonus Actions/False Form
- donor · note · print-row-exception: Actions/Stillstone Ambush rides on: seed the user's words keyed
- read: def 1 / off 4 → 2.5; sustained 26 (1 × Claw); nova none; dmg 26

## Staffdrub Scholar (CR 3, 2014)
- bands · SOFT · band: reads CR 1.75 (print at 3 reads 0.125–6.5, n=23)
- read: def 1/2 / off 3 → 1.75; sustained 22 (2 × Staff Crack); nova none; dmg 22

## Crunchmire (CR 9)
- clean
- read: def 7 / off 9 → 8; sustained 62 (2 × Bite); nova none; dmg 62

## Pikachu (CR 2)
- bands · SOFT · aim-hp: HP 35 is 22% under the card's 45
- read: def 1/8 / off 3 → 1.5625; sustained 14 (2 × Sparkfang); nova Forked Static Arc 11; dmg 17

## Sir Reginald Pemberton-Hughes (CR 5, 2014)
- clean
- read: def 4 / off 4 → 4; sustained 32 (2 × Lance); nova none; dmg 32

## Damp Lint (CR 3)
- bands · SOFT · band: reads CR 1.75 (print at 3 reads 0.375–5, n=83)
- read: def 1/2 / off 3 → 1.75; sustained 24 (2 × Sleeve); nova none; dmg 24

## Grandmother Ash (CR 7, 2014)
- bands · SOFT · band: reads CR 5 (print at 7 reads 4.5–8.5, n=6)
- read: def 4 / off 6 → 5; sustained 39 (3 × Nails); nova Noxious Spew 14; dmg 39

## Vault Sentinel (CR 12)
- clean
- donor · note · print-row-exception: Actions/Gore rides on: the seat the user's words named
- donor · note · print-row-exception: Actions/Shockwave rides on: seed the user's words keyed
- donor · note · print-row-exception: Bonus Actions/Trample rides on: the seat the user's words named
- donor · note · print-row-exception: Traits/Scalding Heat rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Immutable Form rides on: the seat the user's words named
- donor · note · print-row-exception: Traits/Magic Resistance rides on: the seat the user's words named
- read: def 10 / off 14 → 12; sustained 80 (2 × Gore); nova Shockwave 42; dmg 81

## Lantern Drowned (CR 6, 2014)
- clean
- read: def 6 / off 6 → 6; sustained 42 (2 × Numbing Grasp); nova none; dmg 42

## Owlbear (CR 3)
- bands · SOFT · aim-atk: attack +7 against the aim's +5
- read: def 1/2 / off 4 → 2.25; sustained 26 (1 × Rend); nova none; dmg 26

## Grubscar the Tunneler (CR 0.5, 2014)
- clean
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Dagger); nova none; dmg 10

## Apiary Dread (CR 10)
- bands · SOFT · aim-dpr: damage 57 a round is 24% under the card's 75
- read: def 9 / off 10 → 9.5; sustained 30 (3 × Rend); nova Poison Breath 55; dmg 57
