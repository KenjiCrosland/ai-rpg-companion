# Mechanics check — ship-eight-2026-11-16T02-25-37

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Headless Horseman | 11 | 2024 | skirmisher-8-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Pumpkin King | 10 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |
| Knife Ball | 5 | 2024 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | SOFT: inline-weapon-collision | ok | ok | soft (1) | 1/1 | 4/5 |
| Sparkgrub | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 5/6 |
| Copperwrit Sorcerer | 2 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Dustbound Curator | 3 | 2024 | defender-3 | SOFT: hit-die | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (2) | 1/1 | 2/3 |
| Reliquary Toad | 2 | 2024 | skirmisher-3-skulker | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/5 |
| Oxbow Greeder | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/3 |

**Dropped 0 of 8 GM clauses** (coverage 100%); concept share 78% (28/36 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Headless Horseman (CR 11)
- clean
- read: def 8 / off 14 → 11; sustained 66 (3 × Saber); nova Hoofcharge 66; dmg 88

## Pumpkin King (CR 10)
- clean
- read: def 8 / off 11 → 9.5; sustained 64 (2 × Carved Claw); nova none; dmg 64

## Knife Ball (CR 5)
- adjudicability · SOFT · inline-weapon-collision: inline-weapon-collision: header/inline: "the knife ball" is the weapon "dagger" — its own rows will read as the weapon's
- read: def 5 / off 6 → 5.5; sustained 42 (2 × Knife); nova Blade Roll 21; dmg 42

## Sparkgrub (CR 3)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Arcing Fingers
- donor · note · print-row-exception: Actions/Quarterstaff rides on: print rules row
- donor · note · print-row-exception: Reactions/Protective Magic rides on: the user's own part, feature or species
- read: def 5 / off 3 → 4; sustained 24 (2 × Quarterstaff); nova none; dmg 24

## Copperwrit Sorcerer (CR 2)
- clean
- donor · note · print-row-exception: Traits/Venomous Film rides on: seed from the fallback library — no word of the user's keyed it
- donor · note · print-row-exception: Actions/Quarterstaff rides on: print rules row
- donor · note · print-row-exception: Reactions/Protective Magic rides on: the user's own part, feature or species
- read: def 3 / off 2 → 2.5; sustained 14 (2 × Quarterstaff); nova none; dmg 14

## Dustbound Curator (CR 3)
- derivation · SOFT · hit-die: d8 on a Small body (d6)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Tome Slam
- bands · note · print-numbers: Mummy's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1 / off 5 → 3; sustained 36 (2 × Rotting Fist); nova none; dmg 36

## Reliquary Toad (CR 2)
- bands · SOFT · band: reads CR 3.5 (print at 2 reads 0.5–5, n=94)
- read: def 5 / off 2 → 3.5; sustained 14 (2 × Tongue Lash); nova none; dmg 14

## Oxbow Greeder (CR 3)
- clean
- read: def 2 / off 4 → 3; sustained 26 (2 × Bite); nova none; dmg 26


## Audit findings dismissed on print rows

**3** finding(s) dismissed across 8 sheet(s) that carry the record.

- Sparkgrub · Actions/"Spellcasting" — The list carries no spell that deals damage, so the Sparkgrub's signature offense (arcing sparks) has no engine — the creature is a skirmisher with no working trait payload. — Add an offensive at-will spell that matches the lightning identity so the spellcasting and Arcing Fingers entries cohere. (about: "**At Will:** *Detect Magic*, *Light*, *Mage Armor*, *Mage Hand*, *Prestidigitation*")
- Dustbound Curator · Actions/"Dreadful Glare" — The official row refers to itself as 'this mummy' but the creature is a Dustbound Curator, a referent inconsistency introduced by assembling a mummy row onto this sheet. — Replace the misattributed self-reference with a reference to the curator. (about: "this mummy's Dreadful Glare")
- Dustbound Curator · Actions/"Rotting Fist" — The curse states no duration or end condition, so the GM has no rules-legal way to know when it ends or how to remove it. — State how the curse ends (a removal condition such as a spell, a save, or a fixed duration). (about: "If the target is a creature, it is cursed. While cursed, the target can't regain Hit Points, its Hit Point maximum doesn't return to normal when finishing a Long Rest, and its Hit Point maximum decreases by 10 (3d6) every 24 hours that elapse.")

Reporting only: none of these raised a FAIL or changed a sheet.


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 5
- `multiattack` ×8
- `quarterstaff` ×2
- `spellcasting` ×2
- `nimble escape` ×2
- `protective magic` ×2

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
