# Mechanics check — branch-nova-2026-10-16T09-17-50

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dirge Swarm | 13 | 2024 | swarm-9 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | FAIL: alignment-fit | FAIL (1) | 0/1 | 3/3 |
| Altarstone Warden | 11 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 2/2 | 5/7 |
| Plaguecarrion Mote | 8 | 2024 | skirmisher-8-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Stormcore Detonant | 15 | 2024 | brute-13 | ok | FAIL: hot | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 3/3 |
| Hornwold Warden | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic | FAIL (1) | 1/2 | 1/3 |
| Bog Cauldron | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: engine-needs-key, engine-needs-key | FAIL (1) | 1/1 | 3/4 |

**Dropped 3 of 8 user clauses** (coverage 63%); concept share 72% (18/25 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- swarm-9 / reader: 1
- brute-13 / bands: 1
- defender-5 / reader: 1
- brute-8-grappler / reader: 1


## Dirge Swarm (CR 13)
- bands · SOFT · hot-offense: offense alone reads CR 17, 4 over; the HP axis pulls the read to 13.5
- reader · FAIL · alignment-fit: Unaligned on a Swarm of Tiny Constructs with INT 4 that speaks Understands the languages of its creator but can't speak — Unaligned is for a creature with no capacity for ethics
- read: def 10 / off 17 → 13.5; sustained 90 (1 × Tolling); nova Cathedral Knell 67; dmg 105

## Altarstone Warden (CR 11)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Magic Resistance
- bands · note · print-numbers: Stone Golem's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Bonus Actions/Guardian's Pursuit rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Martyr's Embers rides on: seed the user's words keyed
- read: def 10 / off 11 → 10.5; sustained 66 (2 × Slam); nova none; dmg 66

## Plaguecarrion Mote (CR 8)
- clean
- read: def 5 / off 9 → 7; sustained 45 (3 × Talon); nova Swooping Pass 44; dmg 59

## Stormcore Detonant (CR 15)
- bands · SOFT · band: reads CR 18.5 (print at 15 reads 6.5–17.5, n=12)
- bands · FAIL · hot: reads CR 18.5, more than three over
- bands · SOFT · hot-offense: offense alone reads CR 20, 5 over; the HP axis pulls the read to 18.5
- read: def 17 / off 20 → 18.5; sustained 84 (2 × Thunderous Slam); nova Whirlwind 71; dmg 123

## Hornwold Warden (CR 7)
- reader · FAIL · name-mechanic: Actions/Trampling Charge: the name promises movement the text lacks
- read: def 6 / off 8 → 7; sustained 52 (2 × Gore); nova none; dmg 52

## Bog Cauldron (CR 9)
- reader · FAIL · engine-needs-key: Actions/Boiling Ladle: a grapple or engulf engine with no key in the words
- reader · FAIL · engine-needs-key: Bonus Actions/Swallow: a grapple or engulf engine with no key in the words
- read: def 7 / off 9 → 8; sustained 62 (2 × Boiling Ladle); nova none; dmg 62
