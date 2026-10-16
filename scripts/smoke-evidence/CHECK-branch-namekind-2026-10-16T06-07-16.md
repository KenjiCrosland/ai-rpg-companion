# Mechanics check — branch-namekind-2026-10-16T06-07-16

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sable Nefret | 5 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/3 |
| Coral Vurthax | 5 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Blackreed Stalker | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | FAIL: inline-form | FAIL (2) | 1/1 | 5/6 |
| Bridgehold Due | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: multiattack-integrity | FAIL (1) | 1/1 | 1/3 |
| Old Road Warden | 5 | 2024 | defender-3-warden | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/6 |
| Sable Nefret | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 3/4 |
| Coral Vurthax | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: inline-form | FAIL (1) | 1/1 | 2/3 |
| Blackreed Stalker | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | FAIL: inline-form | FAIL (2) | 1/1 | 5/6 |
| Coinbound Sellsword | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: inline-form | FAIL (1) | 1/1 | 1/3 |
| Rustbound Halberdier | 5 | 2024 | defender-3-warden | ok | SOFT: band | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (2) | 1/1 | 0/6 |

**Dropped 0 of 10 user clauses** (coverage 100%); concept share 64% (28/44 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- lurker-5 / bands: 3
- lurker-5 / reader: 2
- defender-5 / reader: 2
- brute-5-grappler / reader: 1


## Sable Nefret (CR 5)
- bands · SOFT · band: reads CR 3.5 (print at 5 reads 2–8, n=52)
- read: def 2 / off 5 → 3.5; sustained 38 (2 × Thorned Lash); nova none; dmg 38

## Coral Vurthax (CR 5)
- bands · SOFT · band: reads CR 3.5 (print at 5 reads 2–8, n=52)
- read: def 2 / off 5 → 3.5; sustained 34 (2 × Razor Coral Lattice); nova none; dmg 34

## Blackreed Stalker (CR 5)
- bands · SOFT · aim-hp: HP 65 is 28% under the card's 90
- bands · FAIL · under: effective HP 65 sits under print at CR 5 (75–228, n=52); reads CR 3.5
- reader · FAIL · inline-form: the call called "Blackreed Stalker" a kind and the sheet speaks it as "Stalker" — a kind starts with "the"
- read: def 1 / off 6 → 3.5; sustained 42 (2 × Wind Swipe); nova none; dmg 42

## Bridgehold Due (CR 5)
- reader · FAIL · multiattack-integrity: Multiattack's attack slot names "Shield", which is not an attack row on this sheet
- read: def 4 / off 5 → 4.5; sustained 34 (2 × Greatsword); nova none; dmg 34

## Old Road Warden (CR 5)
- bands · SOFT · aim-dpr: damage 26 a round is 35% under the card's 40
- bands · SOFT · band: reads CR 3.5 (print at 5 reads 2–8, n=52)
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Stone Flail); nova none; dmg 26

## Sable Nefret (CR 5)
- bands · SOFT · aim-hp: HP 65 is 28% under the card's 90
- bands · FAIL · under: effective HP 65 sits under print at CR 5 (75–228, n=52); reads CR 3
- read: def 1 / off 5 → 3; sustained 38 (2 × Scythe Claw); nova Threshold Execute 28; dmg 38

## Coral Vurthax (CR 5)
- reader · FAIL · inline-form: the call called "Coral Vurthax" a kind and the sheet speaks it as "Coral" — a kind starts with "the"
- read: def 3 / off 5 → 4; sustained 38 (2 × Jaws); nova none; dmg 38

## Blackreed Stalker (CR 5)
- bands · SOFT · aim-hp: HP 65 is 28% under the card's 90
- bands · FAIL · under: effective HP 65 sits under print at CR 5 (75–228, n=52); reads CR 3.5
- reader · FAIL · inline-form: the call called "Blackreed Stalker" a kind and the sheet speaks it as "Stalker" — a kind starts with "the"
- read: def 1 / off 6 → 3.5; sustained 42 (2 × Wind Swipe); nova none; dmg 42

## Coinbound Sellsword (CR 5)
- reader · FAIL · inline-form: the call called "Coinbound Sellsword" a kind and the sheet speaks it as "Sellsword" — a kind starts with "the"
- read: def 4 / off 5 → 4.5; sustained 34 (2 × Greatsword); nova none; dmg 34

## Rustbound Halberdier (CR 5)
- bands · SOFT · band: reads CR 3.5 (print at 5 reads 2–8, n=52)
- structure · SOFT · reach: Actions/Halberd: reach 10 on a Medium body with no tether word
- read: def 3 / off 4 → 3.5; sustained 32 (2 × Halberd); nova none; dmg 32
