# Mechanics check — baseline-fidelity-2026-10-04T21-33-13

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | brute-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 7/7 | 5/5 |
| Grenwyth the Mirebound | 4 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 0/5 |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Skrog the Netcaster | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/6 |
| Vault Sentinel | 4 | 2024 | lurker-2 | ok | SOFT: aim-hp, band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 1/6 |
| Roderick the Unsparked | 3 (2014) | 2014 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 1/1 |
| Mere Behemoth | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/2 |
| Pikachu | 2 | 2024 | caster-6 | ok | ok | ok | ok | SOFT: lint:beast-intelligence | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Lint Sovereign | 3 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 3/3 | 2/2 |
| Grandmother Ash | 7 (2014) | 2014 | caster-8-binder | ok | SOFT: band | ok | SOFT: rider-no-save, rider-no-save | ok | ok | ok | ok | soft (2) | 7/7 | 7/7 |
| Ironhorn Reliquary | 12 | 2024 | brute-11-charger | ok | SOFT: hot-offense | ok | ok | FAIL: lint:defense-restated | ok | ok | ok | FAIL (1) | 5/6 | 6/9 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Hobnail the Warren Tollkeeper | 0.5 (2014) | 2014 | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Apiary Wyrm | 10 | 2024 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 2 of 36 user clauses** (coverage 94%); concept share 69% (41/59 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-11-charger / headerBody: 1


## Meshrin (CR 8, 2014)
- bands · SOFT · band: reads CR 5.5 (print at 8 reads 2–8.5, n=10)
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Tail Swipe); nova none; dmg 44

## Grenwyth the Mirebound (CR 4)
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Verdigris Claw); nova none; dmg 26

## Troll (CR 5, 2014)
- clean
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 3 / off 5 → 4; sustained 34 (2 × Rend); nova none; dmg 34

## Skrog the Netcaster (CR 1, 2014)
- clean
- donor · note · print-row-exception: Traits/Slippery rides on: the seat the user's words named
- donor · note · print-row-exception: Actions/Bounding Frog Charge rides on: the seat the user's words named
- donor · note · print-row-exception: Actions/Tangling Snap-Net rides on: seed the user's words keyed
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Scimitar); nova Bounding Frog Charge 6; dmg 11

## Vault Sentinel (CR 4)
- bands · SOFT · aim-hp: HP 52 is 31% under the card's 75
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Slam); nova none; dmg 26

## Roderick the Unsparked (CR 3, 2014)
- bands · SOFT · band: reads CR 1.75 (print at 3 reads 0.125–6.5, n=23)
- donor · note · print-row-exception: Actions/Staff Thump rides on: print rules row
- read: def 1/2 / off 3 → 1.75; sustained 22 (2 × Staff Thump); nova none; dmg 22

## Mere Behemoth (CR 9)
- clean
- bands · note · user-set: user-set: AC 22 · reads CR 12.5
- read: def 10 / off 15 → 12.5; sustained 98 (2 × Bite); nova none; dmg 98

## Pikachu (CR 2)
- headerBody · SOFT · lint:beast-intelligence: type Beast with INT 17 — beasts cap at INT 8 (Giant Owl); a genius predator is a Monstrosity
- read: def 1/4 / off 2 → 1.125; sustained 14 (2 × Static Cheeks); nova none; dmg 14

## Lint Sovereign (CR 3)
- bands · SOFT · band: reads CR 1.75 (print at 3 reads 0.375–5, n=83)
- read: def 1/2 / off 3 → 1.75; sustained 24 (2 × Smothering Press); nova none; dmg 24

## Grandmother Ash (CR 7, 2014)
- bands · SOFT · band: reads CR 5.5 (print at 7 reads 4.5–8.5, n=6)
- gates · SOFT · rider-no-save: Actions/Rotting Nails: a Poisoned rider on every hit with no save
- gates · SOFT · rider-no-save: Actions/Ash Cloud: a Blinded rider on every hit with no save
- read: def 4 / off 7 → 5.5; sustained 48 (3 × Ash Cloud); nova none; dmg 48

## Ironhorn Reliquary (CR 12)
- bands · SOFT · hot-offense: offense alone reads CR 16, 4 over; the HP axis pulls the read to 13
- headerBody · FAIL · lint:defense-restated: Traits/Adamantine Bane: this trait only restates the Resistances/Immunities lines — the lines already carry it; replace it with a real mechanic or drop it
- read: def 10 / off 16 → 13; sustained 92 (2 × Charging Gore); nova Scalding Steam 58; dmg 100

## Owlbear (CR 3)
- clean
- bands · note · print-numbers: Owlbear's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/2 / off 4 → 2.25; sustained 26 (1 × Rend); nova none; dmg 26

## Hobnail the Warren Tollkeeper (CR 0.5, 2014)
- clean
- read: def 1/8 / off 1/2 → 0.3125; sustained 8 (2 × Hand Crossbow); nova none; dmg 8

## Apiary Wyrm (CR 10)
- clean
- bands · note · print-numbers: Young Gold Dragon's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Poison Breath rides on: print rules row
- read: def 9 / off 10 → 9.5; sustained 30 (3 × Rend); nova Poison Breath 55; dmg 57
