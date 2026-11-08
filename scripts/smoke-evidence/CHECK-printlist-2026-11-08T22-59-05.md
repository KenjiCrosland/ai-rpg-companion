# Mechanics check — printlist-2026-11-08T22-59-05

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 0/1 | 9/9 |
| Pit Fiend | 20 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 9/9 |
| Dire Wolf | 1 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | FAIL: gate-fit | ok | FAIL (1) | 1/1 | 4/4 |
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Ossuary Bladebearer | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | SOFT: inline-weapon-collision | ok | ok | soft (2) | 1/1 | 4/4 |
| Threshold Bones | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 3/5 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Goblin Boss | 1 (2014) | 2014 | defender-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Vampire | 13 (2014) | 2014 | lurker-13 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | SOFT: orphan-condition-ref, orphan-condition-ref | ok | ok | soft (2) | 1/1 | 11/11 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | SOFT: at-will-inline | ok | ok | soft (2) | 1/1 | 8/8 |
| Storm Warden | 4 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/0 | 0/3 |

**Dropped 3 of 11 GM clauses** (coverage 73%); concept share 97% (59/61 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-2 / reader: 1


## Pit Fiend (CR 20)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Reap the Sworn Oath
- bands · note · print-numbers: Pit Fiend's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 21 / off 10 → 15.5; sustained 43 (1 × Fiery Mace); nova none; dmg 43

## Pit Fiend (CR 20)
- clean
- bands · note · print-numbers: Pit Fiend's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Oath-Seizing Curse rides on: seed keyed on the user's words (oath, curse)
- read: def 21 / off 10 → 15.5; sustained 43 (1 × Fiery Mace); nova none; dmg 43

## Dire Wolf (CR 1)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Frost Shoulder Shove
- reader · FAIL · gate-fit: Actions/Frost Shoulder Shove: an at-will condition action with no Multiattack to join — a shed use limit needs one
- bands · note · print-numbers: Dire Wolf's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Rime Aura rides on: seed from the fallback library — no word of the user's keyed it
- read: def 1/8 / off 1 → 0.5625; sustained 8 (1 × Bite); nova none; dmg 8

## Dire Wolf (CR 1)
- clean
- bands · note · print-numbers: Dire Wolf's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Frost-Rimed Hide rides on: seed keyed on the user's words (snow, freezes, freeze)
- read: def 1/8 / off 1 → 0.5625; sustained 8 (1 × Bite); nova none; dmg 8

## Ossuary Bladebearer (CR 6)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Long Reach
- adjudicability · SOFT · inline-weapon-collision: inline-weapon-collision: header/inline: "the bladebearer" is the weapon "longsword" — its own rows will read as the weapon's
- donor · note · print-row-exception: Actions/Greatsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Great Weapon Master rides on: the user's own part, feature or species
- read: def 4 / off 6 → 5; sustained 42 (2 × Greatsword); nova none; dmg 42

## Threshold Bones (CR 6)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Sweeping Bones
- donor · note · print-row-exception: Actions/Greatsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Relentless Advance rides on: seed from the fallback library — no word of the user's keyed it
- donor · note · print-row-exception: Traits/Great Weapon Master rides on: the user's own part, feature or species
- read: def 4 / off 6 → 5; sustained 42 (2 × Greatsword); nova none; dmg 42

## Owlbear (CR 3)
- clean
- bands · note · print-numbers: Owlbear's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/2 / off 5 → 2.75; sustained 28 (2 × Rend); nova none; dmg 28

## Goblin Boss (CR 1, 2014)
- clean
- bands · note · print-numbers: Goblin Boss's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 2 / off 1 → 1.5; sustained 10 (2 × Scimitar); nova none; dmg 10

## Vampire (CR 13, 2014)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Sap-Bleed Briars
- adjudicability · SOFT · orphan-condition-ref: the 2024 model: orphan-condition-ref: "Charmed" is referenced as a state but nothing on the sheet applies it
- adjudicability · SOFT · orphan-condition-ref: the 2024 model: orphan-condition-ref: "Restrained" is referenced as a state but nothing on the sheet applies it
- bands · note · print-numbers: Vampire's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Legendary Actions/Deathless Strike rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Beguile rides on: print rules row
- read: def 10 / off 12 → 11; sustained 75 (2 × Grave Strike + legendary Deathless Strike); nova none; dmg 75

## Purple Worm (CR 15)
- clean
- derivation · note · dc-float: Actions/Swallow: DC 21 sits one off the derived DC (the chassis ±1 float)
- derivation · note · dc-float: Actions/Swallow: DC 21 sits one off the derived DC (the chassis ±1 float)
- bands · note · print-numbers: Purple Worm's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 12 / off 11 → 11.5; sustained 51 (1 × Tail Stinger); nova none; dmg 51

## Adult Red Dragon (CR 17, 2014)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Sight Weakness
- adjudicability · SOFT · at-will-inline: the 2024 model: at-will-inline: Actions/Spellcasting: a 2024 spell bullet survived into a 2014 block
- bands · note · print-numbers: Adult Red Dragon's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Legendary Actions/Commanding Presence rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Fiery Rays rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Pounce rides on: print rules row
- read: def 14 / off 20 → 17; sustained 108 (3 × Rend + legendary Pounce); nova Fire Breath 59; dmg 111

## Storm Warden (CR 4)
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 1–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 28 (2 × Grit Slam); nova none; dmg 28


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 15
- `multiattack` ×10
- `bite` ×6
- `legendary resistance` ×4
- `shortbow` ×3
- `diabolical restoration` ×2
- `fear aura` ×2
- `magic resistance` ×2
- `fiery mace` ×2

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
