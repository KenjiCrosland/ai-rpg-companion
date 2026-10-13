# Mechanics check — baseline-fidelity-2026-10-04T17-39-51

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | brute-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 7/7 | 5/5 |
| Carnicutter | 2 (2014) | 2014 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 0/5 |
| Mother Fenbramble | 4 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 0/5 |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Lord Vaudrecourt | 8 | 2024 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 8/8 |
| Marsh Netter | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Vigil Stone | 4 | 2024 | lurker-2-trap | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Iron-Shod Truant | 3 (2014) | 2014 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 1/1 |
| Fenmaw Shellback | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | clean | 1/2 | 0/2 |
| Pikachu | 2 | 2024 | caster-6 | ok | ok | ok | ok | SOFT: lint:beast-intelligence | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/2 | 1/3 |
| Sockpile | 3 | 2024 | brute-5-grappler | ok | SOFT: aim-dpr, band | ok | SOFT: rider-no-save | ok | ok | ok | FAIL: grapple-no-escape | FAIL (1) | 3/3 | 3/4 |
| Grandmother Ash | 7 (2014) | 2014 | caster-8-binder | ok | SOFT: aim-dpr, band | ok | SOFT: rider-no-save, rider-no-save | ok | ok | ok | ok | soft (2) | 5/7 | 6/6 |
| Vault Bull | 12 | 2024 | brute-11-charger | ok | SOFT: aim-dpr, band | ok | ok | FAIL: lint:defense-restated | ok | ok | FAIL: adjudicable-resolution | FAIL (2) | 4/6 | 6/8 |
| Lantern Drowned | 6 (2014) | 2014 | lurker-5-phantom | ok | SOFT: aim-dpr | ok | SOFT: ko-at-will, rider-no-save, control-aoe-ungated | ok | ok | ok | ok | soft (2) | 4/6 | 5/5 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Hive Wyrm | 10 | 2024 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 12 of 44 user clauses** (coverage 73%); concept share 74% (55/74 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-5-grappler / adjudicability: 1
- brute-11-charger / headerBody: 1
- brute-11-charger / adjudicability: 1


## Meshrin (CR 8, 2014)
- bands · SOFT · band: reads CR 5.5 (print at 8 reads 2–8.5, n=10)
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Tail Swipe); nova none; dmg 44

## Carnicutter (CR 2, 2014)
- clean
- read: def 1/8 / off 2 → 1.0625; sustained 20 (2 × Slice); nova none; dmg 20

## Mother Fenbramble (CR 4)
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Claw); nova none; dmg 26

## Troll (CR 5, 2014)
- clean
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 3 / off 5 → 4; sustained 34 (2 × Rend); nova none; dmg 34

## Lord Vaudrecourt (CR 8)
- clean
- read: def 6 / off 8 → 7; sustained 48 (3 × Grave Strike); nova none; dmg 48

## Marsh Netter (CR 1, 2014)
- clean
- donor · note · print-row-exception: Traits/Bounding rides on: the seat the user's words named
- donor · note · print-row-exception: Actions/Frog Bounding Charge rides on: the seat the user's words named
- donor · note · print-row-exception: Actions/Hooked Net Snare rides on: seed the user's words keyed
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Scimitar); nova Frog Bounding Charge 6; dmg 11

## Vigil Stone (CR 4)
- bands · SOFT · aim-dpr: damage 17 a round is 43% under the card's 30
- bands · SOFT · band: reads CR 2 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 3 → 2; sustained 17 (1 × Stone Claw); nova none; dmg 17

## Iron-Shod Truant (CR 3, 2014)
- bands · SOFT · band: reads CR 1.75 (print at 3 reads 0.125–6.5, n=23)
- donor · note · print-row-exception: Actions/Staff Cudgel rides on: print rules row
- read: def 1/2 / off 3 → 1.75; sustained 22 (2 × Staff Cudgel); nova none; dmg 22

## Fenmaw Shellback (CR 9)
- clean
- bands · note · user-set: user-set: AC 22 · reads CR 12.5
- read: def 10 / off 15 → 12.5; sustained 98 (2 × Bite); nova none; dmg 98

## Pikachu (CR 2)
- headerBody · SOFT · lint:beast-intelligence: type Beast with INT 17 — beasts cap at INT 8 (Giant Owl); a genius predator is a Monstrosity
- read: def 1/4 / off 2 → 1.125; sustained 14 (2 × Hurled Debris); nova none; dmg 14

## Sir Reginald Pemberton-Hughes (CR 5, 2014)
- clean
- read: def 4 / off 4 → 4; sustained 32 (2 × Longsword); nova none; dmg 32

## Sockpile (CR 3)
- bands · SOFT · aim-dpr: damage 14 a round is 44% under the card's 25
- bands · SOFT · band: reads CR 1.25 (print at 3 reads 0.375–5, n=83)
- gates · SOFT · rider-no-save: Actions/Cryptic Stench: a Poisoned rider on every hit with no save
- adjudicability · FAIL · grapple-no-escape: Actions/Cryptic Stench: applies the Grappled condition with no escape DC
- read: def 1/2 / off 2 → 1.25; sustained 14 (2 × Smothering Sleeve); nova none; dmg 14

## Grandmother Ash (CR 7, 2014)
- bands · SOFT · aim-dpr: damage 36 a round is 25% under the table's 48
- bands · SOFT · band: reads CR 4.5 (print at 7 reads 4.5–8.5, n=6)
- gates · SOFT · rider-no-save: Actions/Rotting Nails: a Poisoned rider on every hit with no save
- gates · SOFT · rider-no-save: Actions/Ashen Choke: a Poisoned rider on every hit with no save
- read: def 4 / off 5 → 4.5; sustained 36 (3 × Crow's Warning); nova none; dmg 36

## Vault Bull (CR 12)
- bands · SOFT · aim-dpr: damage 48 a round is 47% under the card's 90
- bands · SOFT · band: reads CR 9.5 (print at 12 reads 8–14, n=15)
- headerBody · FAIL · lint:defense-restated: Traits/Adamant Immunities: this trait only restates the Resistances/Immunities lines — the lines already carry it; replace it with a real mechanic or drop it
- adjudicability · FAIL · adjudicable-resolution: Traits/Adamant Immunities: deals damage or imposes a condition but states no trigger, attack roll, or save
- read: def 10 / off 9 → 9.5; sustained 48 (2 × Gore); nova none; dmg 48

## Lantern Drowned (CR 6, 2014)
- bands · SOFT · aim-dpr: damage 24 a round is 43% under the table's 42
- gates · SOFT · ko-at-will: Actions/Numbing Touch: Paralyzed at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- gates · SOFT · rider-no-save: Actions/Numbing Touch: a Paralyzed rider on every hit with no save
- gates · SOFT · control-aoe-ungated: Actions/Lantern's Lure: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- read: def 6 / off 4 → 5; sustained 24 (2 × Numbing Touch); nova none; dmg 24

## Owlbear (CR 3)
- clean
- bands · note · print-numbers: Owlbear's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/2 / off 4 → 2.25; sustained 26 (1 × Rend); nova none; dmg 26

## Hive Wyrm (CR 10)
- clean
- bands · note · print-numbers: Young Gold Dragon's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Poison Breath rides on: print rules row
- read: def 9 / off 10 → 9.5; sustained 30 (3 × Rend); nova Poison Breath 55; dmg 57
