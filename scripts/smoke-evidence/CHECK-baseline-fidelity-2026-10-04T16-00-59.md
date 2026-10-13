# Mechanics check — baseline-fidelity-2026-10-04T16-00-59

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 6/6 | 5/5 |
| Ruin Ward | 2 (2014) | 2014 | lurker-2-trap | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 0/4 |
| Bog Witch | 4 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/5 |
| Sanguine Court | 8 | 2024 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 8/8 |
| Mudlurk Netter | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Unfinished Watch | 4 | 2024 | lurker-2-trap | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 0/2 | 0/4 |
| Staffbound Caster | 3 (2014) | 2014 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 4/4 |
| Snapping Maw | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 2/3 |
| Pikachu | 2 | 2024 | caster-6 | ok | ok | ok | ok | SOFT: lint:beast-intelligence | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-3-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/4 |
| Wearwretch | 3 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | SOFT: type-immunities, languages-type | ok | ok | ok | soft (2) | 1/1 | 2/3 |
| Grandmother Ash | 7 (2014) | 2014 | caster-8-binder | ok | SOFT: band | ok | SOFT: rider-no-save | ok | ok | ok | ok | soft (2) | 6/6 | 6/7 |
| Iron Bull | 12 | 2024 | brute-11-charger | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | soft (1) | 4/5 | 6/8 |
| Lantern Drowned | 6 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | clean | 3/4 | 5/5 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Grubnock Scurrier | 0.5 (2014) | 2014 | skirmisher-3-archer | ok | ok | ok | ok | ok | FAIL: lint:phrasing-rider-save | ok | ok | FAIL (1) | 1/1 | 2/5 |
| Caldera Swarm | 10 | 2024 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 6 of 38 user clauses** (coverage 84%); concept share 71% (56/79 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3-archer / edition: 1


## Meshrin (CR 8, 2014)
- clean
- read: def 7 / off 8 → 7.5; sustained 52 (2 × Greatsword); nova none; dmg 52

## Ruin Ward (CR 2, 2014)
- clean
- read: def 1/8 / off 2 → 1.0625; sustained 19 (1 × Blade Shell); nova none; dmg 19

## Bog Witch (CR 4)
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Claw); nova none; dmg 26

## Sanguine Court (CR 8)
- clean
- read: def 6 / off 8 → 7; sustained 48 (3 × Grave Strike); nova none; dmg 48

## Mudlurk Netter (CR 1, 2014)
- clean
- donor · note · print-row-exception: Traits/Bogbound rides on: the seat the user's words named
- donor · note · print-row-exception: Actions/Bounding Charge rides on: the seat the user's words named
- donor · note · print-row-exception: Actions/Binding Lash rides on: seed the user's words keyed
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Scimitar); nova Bounding Charge 6; dmg 11

## Unfinished Watch (CR 4)
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (1 × Claw); nova none; dmg 26

## Staffbound Caster (CR 3, 2014)
- bands · SOFT · band: reads CR 1.75 (print at 3 reads 0.125–6.5, n=23)
- donor · note · print-row-exception: Actions/Staff Strike rides on: print rules row
- read: def 1/2 / off 3 → 1.75; sustained 22 (2 × Staff Strike); nova none; dmg 22

## Snapping Maw (CR 9)
- clean
- read: def 7 / off 9 → 8; sustained 62 (2 × Bite); nova none; dmg 62

## Pikachu (CR 2)
- headerBody · SOFT · lint:beast-intelligence: type Beast with INT 17 — beasts cap at INT 8 (Giant Owl); a genius predator is a Monstrosity
- read: def 1/4 / off 2 → 1.125; sustained 14 (2 × Cheek Bolt); nova none; dmg 14

## Sir Reginald Pemberton-Hughes (CR 5, 2014)
- bands · SOFT · band: reads CR 3.5 (print at 5 reads 2.5–9.5, n=25)
- read: def 3 / off 4 → 3.5; sustained 32 (2 × Knightly Blade); nova none; dmg 32

## Wearwretch (CR 3)
- bands · SOFT · band: reads CR 1.75 (print at 3 reads 0.375–5, n=83)
- headerBody · SOFT · type-immunities: a Ooze without Poison immunity (Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained)
- headerBody · SOFT · languages-type: an Ooze that speaks Common
- read: def 1/2 / off 3 → 1.75; sustained 24 (2 × Smothering Pile); nova none; dmg 24

## Grandmother Ash (CR 7, 2014)
- bands · SOFT · band: reads CR 5 (print at 7 reads 4.5–8.5, n=6)
- gates · SOFT · rider-no-save: Actions/Long Black Nails: a Restrained rider on every hit with no save
- read: def 4 / off 6 → 5; sustained 39 (3 × Long Black Nails); nova Ash-Choked Breath 21; dmg 40

## Iron Bull (CR 12)
- gates · SOFT · control-aoe-ungated: Actions/Ground-Shaking Stomp: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- read: def 10 / off 13 → 11.5; sustained 80 (2 × Charge Gore); nova none; dmg 80

## Lantern Drowned (CR 6, 2014)
- clean
- read: def 6 / off 6 → 6; sustained 42 (2 × Numbing Touch); nova none; dmg 42

## Owlbear (CR 3)
- clean
- bands · note · print-numbers: Owlbear's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/2 / off 4 → 2.25; sustained 26 (1 × Rend); nova none; dmg 26

## Grubnock Scurrier (CR 0.5, 2014)
- edition · FAIL · lint:phrasing-rider-save: 2014 rider-save phrasing in Traits/Bag of Caltrops — rider saves use the skeleton too: "*<Ability> Saving Throw:* DC n, <target>. *Failure:* <effect>"
- read: def 1/8 / off 1/2 → 0.3125; sustained 8 (2 × Hand Crossbow); nova none; dmg 8

## Caldera Swarm (CR 10)
- clean
- bands · note · print-numbers: Young Gold Dragon's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Poison Breath rides on: print rules row
- read: def 9 / off 10 → 9.5; sustained 30 (3 × Rend); nova Poison Breath 55; dmg 57
