# Mechanics check — regress-five-2026-10-21T21-18-56

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Brother Halric | 3 | 2024 | caster-6 | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 5/5 |
| Amberbark Sap-Keeper | 5 | 2024 | brute-5-regenerator | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/3 |
| Ossuar Vane | 14 | 2024 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Priest | 4 | 2024 | caster-6 | ok | SOFT: aim-dpr | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 6/6 |
| Crypt Warden | 11 | 2024 | brute-9-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |

**Dropped 2 of 5 user clauses** (coverage 60%); concept share 93% (25/27 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Brother Halric (CR 3)
- gates · SOFT · control-aoe-ungated: Actions/Bell of Judgment: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- bands · note · print-numbers: Priest's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Bell of Judgment rides on: seed the user's words keyed
- read: def 1/4 / off 3 → 1.625; sustained 22 (2 × Radiant Flame); nova none; dmg 22

## Amberbark Sap-Keeper (CR 5)
- structure · SOFT · reach: Actions/Branch: reach 10 on a Medium body with no tether word
- read: def 3 / off 5 → 4; sustained 36 (3 × Branch); nova none; dmg 36

## Ossuar Vane (CR 14)
- clean
- donor · note · print-row-exception: Traits/Seizing Touch rides on: seed the user's words keyed
- read: def 10 / off 16 → 13; sustained 96 (4 × Eldritch Burst); nova none; dmg 96

## Priest (CR 4)
- bands · SOFT · aim-dpr: damage 22 a round is 27% under the card's 30
- donor · note · print-row-exception: Traits/Knuckle Reliquary rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Reliquary Ward rides on: seed the user's words keyed
- read: def 2 / off 4 → 3; sustained 22 (2 × Radiant Flame); nova none; dmg 22

## Crypt Warden (CR 11)
- clean
- read: def 9 / off 12 → 10.5; sustained 58 (2 × Slab Arm); nova Sweeping Gaze 59; dmg 78
