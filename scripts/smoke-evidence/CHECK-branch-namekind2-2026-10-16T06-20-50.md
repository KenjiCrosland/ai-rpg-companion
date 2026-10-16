# Mechanics check — branch-namekind2-2026-10-16T06-20-50

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sable Nefret | 5 | 2024 | skirmisher-3 | ok | SOFT: band, hot-offense | ok | SOFT: rider-no-save | ok | ok | SOFT: print-rows | ok | ok | soft (3) | 1/1 | 6/6 |
| Coral Vurthax | 5 | 2024 | defender-3-leader | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 3/4 |
| Blackreed Stalker | 5 | 2024 | lurker-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Coinbound Sellsword | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Old Road Warden | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Sable Nefret | 5 | 2024 | skirmisher-3 | ok | SOFT: band, hot-offense | ok | SOFT: rider-no-save | ok | ok | SOFT: print-rows | ok | ok | soft (3) | 1/1 | 7/7 |
| Coral Vurthax | 5 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Blackreed Stalker | 5 | 2024 | lurker-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Coinbound Sellsword | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Old Road Warden | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |

**Dropped 0 of 10 user clauses** (coverage 100%); concept share 94% (44/47 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- defender-3-leader / structure: 1


## Sable Nefret (CR 5)
- bands · SOFT · band: reads CR 7 (print at 5 reads 2–8, n=52)
- bands · SOFT · hot-offense: offense alone reads CR 11, 6 over; the HP axis pulls the read to 7
- gates · SOFT · rider-no-save: Actions/Shortsword: a Poisoned rider on every hit with no save
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Bonus Actions/Fleet Agility
- donor · note · print-row-exception: Traits/Assassinate rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Throwing Knife rides on: print rules row
- read: def 3 / off 11 → 7; sustained 70 (2 × Shortsword); nova none; dmg 70

## Coral Vurthax (CR 5)
- structure · FAIL · lint:duplicate-entry: Actions/Coral Shield: identical text to "Trident" — two names, one ability; rewrite this entry into something distinct
- read: def 3 / off 5 → 4; sustained 34 (2 × Trident); nova none; dmg 34

## Blackreed Stalker (CR 5)
- clean
- bands · note · print-numbers: Invisible Stalker's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Bonus Actions/Predatory Focus rides on: seed the user's words keyed
- read: def 6 / off 6 → 6; sustained 44 (2 × Wind Swipe); nova none; dmg 44

## Coinbound Sellsword (CR 5)
- clean
- donor · note · print-row-exception: Reactions/Riposte rides on: the user's own part, feature or species
- read: def 4 / off 5 → 4.5; sustained 34 (2 × Greatsword); nova none; dmg 34

## Old Road Warden (CR 5)
- clean
- read: def 4 / off 6 → 5; sustained 40 (2 × Fist); nova none; dmg 40

## Sable Nefret (CR 5)
- bands · SOFT · band: reads CR 7 (print at 5 reads 2–8, n=52)
- bands · SOFT · hot-offense: offense alone reads CR 11, 6 over; the HP axis pulls the read to 7
- gates · SOFT · rider-no-save: Actions/Shortsword: a Poisoned rider on every hit with no save
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Bonus Actions/Fleet Agility
- donor · note · print-row-exception: Traits/Assassinate rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Throwing Knife rides on: print rules row
- donor · note · print-row-exception: Actions/Assassin's Mark rides on: seed the user's words keyed
- read: def 3 / off 11 → 7; sustained 70 (2 × Shortsword); nova none; dmg 70

## Coral Vurthax (CR 5)
- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Serrated Claw); nova none; dmg 34

## Blackreed Stalker (CR 5)
- clean
- bands · note · print-numbers: Invisible Stalker's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Creeping Dread rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Faultless Tracker rides on: seed the user's words keyed
- read: def 6 / off 5 → 5.5; sustained 36 (2 × Wind Swipe); nova none; dmg 36

## Coinbound Sellsword (CR 5)
- clean
- donor · note · print-row-exception: Reactions/Riposte rides on: the user's own part, feature or species
- read: def 4 / off 5 → 4.5; sustained 34 (2 × Greatsword); nova none; dmg 34

## Old Road Warden (CR 5)
- clean
- donor · note · print-row-exception: Traits/Toll Snare rides on: seed the user's words keyed
- read: def 4 / off 6 → 5; sustained 40 (2 × Fist); nova none; dmg 40
