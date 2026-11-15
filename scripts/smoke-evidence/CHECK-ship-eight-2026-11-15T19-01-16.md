# Mechanics check — ship-eight-2026-11-15T19-01-16

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Headless Horseman | 11 | 2024 | skirmisher-8-mounted | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 4/4 |
| Pumpkin King | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/4 |
| Knife Ball | 5 | 2024 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | SOFT: inline-weapon-collision | ok | ok | soft (1) | 1/1 | 3/4 |
| Skittering Spellthief | 3 | 2024 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Wyrm-Touched Warrenling | 2 | 2024 | skirmisher-1 | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (2) | 1/1 | 5/6 |
| Index | 3 | 2024 | skirmisher-3 | SOFT: hit-die | ok | ok | SOFT: control-aoe-ungated | ok | ok | SOFT: print-rows | ok | ok | ok | soft (3) | 1/1 | 2/4 |
| Coin-Eyed Beguiler | 2 | 2024 | skirmisher-3-skulker | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 0/4 |
| Drowned Ford Pike | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | SOFT: inline-weapon-collision | ok | ok | soft (1) | 1/1 | 2/3 |

**Dropped 1 of 8 GM clauses** (coverage 88%); concept share 65% (22/34 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-8-mounted / derivation: 1


## Headless Horseman (CR 11)
- derivation · FAIL · attack-stat: Grave-Iron Saber: +9 derives from DEX, but an attack row rolls STR
- read: def 8 / off 13 → 10.5; sustained 63 (3 × Grave-Iron Saber); nova Hoofbeat Charge 66; dmg 86

## Pumpkin King (CR 10)
- clean
- read: def 8 / off 11 → 9.5; sustained 64 (2 × Scythe); nova Bursting Crown 31; dmg 64

## Knife Ball (CR 5)
- adjudicability · SOFT · inline-weapon-collision: inline-weapon-collision: header/inline: "the knife ball" is the weapon "dagger" — its own rows will read as the weapon's
- read: def 5 / off 6 → 5.5; sustained 32 (2 × Blade Shell); nova Blade Burst 26; dmg 39

## Skittering Spellthief (CR 3)
- bands · SOFT · band: reads CR 6 (print at 3 reads 0.625–5, n=83)
- donor · note · print-row-exception: Actions/Quarterstaff rides on: print rules row
- donor · note · print-row-exception: Reactions/Protective Magic rides on: the user's own part, feature or species
- read: def 6 / off 6 → 6; sustained 24 (2 × Quarterstaff); nova Cone of Cold 36; dmg 40

## Wyrm-Touched Warrenling (CR 2)
- bands · SOFT · band: reads CR 4.5 (print at 2 reads 0.5–5, n=94)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Scavenged-Treasure Warding
- donor · note · print-row-exception: Actions/Quarterstaff rides on: print rules row
- donor · note · print-row-exception: Reactions/Protective Magic rides on: the user's own part, feature or species
- read: def 4 / off 5 → 4.5; sustained 16 (2 × Quarterstaff); nova Cone of Cold 36; dmg 35

## Index (CR 3)
- derivation · SOFT · hit-die: d8 on a Small body (d6)
- gates · SOFT · control-aoe-ungated: Actions/Sight-Rotting Glare: a 30-foot at-will Emanation of control with no way out — print's three Emanations past 10 feet all grant immunity for 24 hours on a success (Pit Fiend 20 ft, Cloaker 60 ft, Harpy 300 ft), which is how it can hand out a 300-foot Charm at CR 1
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Sight-Rotting Glare
- bands · note · print-numbers: Mummy's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Blinding Wrappings rides on: seed from the fallback library — no word of the user's keyed it
- read: def 1 / off 5 → 3; sustained 36 (2 × Rotting Fist); nova none; dmg 36

## Coin-Eyed Beguiler (CR 2)
- bands · SOFT · band: reads CR 3.5 (print at 2 reads 0.5–5, n=94)
- read: def 5 / off 2 → 3.5; sustained 14 (2 × Tongue); nova none; dmg 14

## Drowned Ford Pike (CR 3)
- adjudicability · SOFT · inline-weapon-collision: inline-weapon-collision: header/inline: "the ford pike" is the weapon "pike" — its own rows will read as the weapon's
- read: def 3 / off 3 → 3; sustained 24 (2 × Bite); nova none; dmg 24


## Audit findings dismissed on print rows

**4** finding(s) dismissed across 8 sheet(s) that carry the record.

- Skittering Spellthief · Actions/"Quarterstaff" — The published Quarterstaff row normally deals plain damage; here the damage is conditional on having Advantage with no alternate damage given, so a normal-hit Quarterstaff deals nothing, and the conditional also creates a rider the Multiattack/attack flow never guarantees. This contradicts the STANDARD official row it is supposed to be. — Restore the unconditional damage clause so the staff deals damage on any hit, and if a bonus-on-Advantage is desired, make it additive rather than a replacement. (about: "12 (2d8 + 3) Bludgeoning damage if the attack roll had Advantage.")
- Skittering Spellthief · Actions/"Spellcasting" — Protective Magic reuses Counterspell and Shield 'using the same spellcasting ability as Spellcasting', but neither spell appears in the Spellcasting list, so the reaction references spells the block never grants. — Either add Counterspell and Shield to the Spellcasting list or state them as innate to Protective Magic with their own save DC. (about: "**2/Day Each:** *Fireball*, *Invisibility*")
- Index · Actions/"Dreadful Glare" — The official row is broken by our assembly: it refers to 'this mummy', but the statblock is an 'index' and carries no mummy identity anywhere. — Restore the published referent to the creature itself (the index) so the success rider names the creature that owns the action. (about: "The target is immune to this mummy's Dreadful Glare for 24 hours.")
- Index · Actions/"Rotting Fist" — The curse imposes a permanent, escalating HP-maximum drain with no stated escape, removal, or end condition anywhere in the entry, so neither the player nor the GM has a rules-legal path out. — Add an interior-escape clause (a repeat save, a remove-curse clause, or a fixed duration) so the curse can be ended by rules already written in the entry. (about: "While cursed, the target can't regain Hit Points, its Hit Point maximum doesn't return to normal when finishing a Long Rest, and its Hit Point maximum decreases by 10 (3d6) every 24 hours that elapse.")

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
