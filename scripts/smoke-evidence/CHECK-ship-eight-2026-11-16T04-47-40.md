# Mechanics check — ship-eight-2026-11-16T04-47-40

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Headless Horseman | 11 | 2024 | skirmisher-8-mounted | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 5/7 |
| Pumpkin King | 10 | 2024 | brute-9-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/5 |
| Knife Ball | 5 | 2024 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | SOFT: inline-weapon-collision | ok | ok | soft (1) | 1/1 | 4/5 |
| Goblin Wizard | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Skitterbolt Sorcerer | 2 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 5/6 |
| Overdue Scribe | 3 | 2024 | caster-8-binder | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/6 |
| Coinpurse Croaker | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 0/2 |
| Deepchannel Pike | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | SOFT: inline-weapon-collision | ok | ok | soft (1) | 1/1 | 0/2 |

**Dropped 1 of 8 GM clauses** (coverage 88%); concept share 56% (22/39 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-8-mounted / derivation: 1


## Headless Horseman (CR 11)
- derivation · FAIL · attack-stat: Saber: +9 derives from DEX, but an attack row rolls STR
- read: def 8 / off 14 → 11; sustained 69 (3 × Saber); nova Hoofcharge 66; dmg 90

## Pumpkin King (CR 10)
- clean
- read: def 8 / off 11 → 9.5; sustained 48 (2 × Gourd Blade); nova Harvest Flame 60; dmg 72

## Knife Ball (CR 5)
- adjudicability · SOFT · inline-weapon-collision: inline-weapon-collision: header/inline: "the knife ball" is the weapon "dagger" — its own rows will read as the weapon's
- read: def 5 / off 6 → 5.5; sustained 30 (3 × Knives); nova Knife Burst 31; dmg 41

## Goblin Wizard (CR 3)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Shadow-Wrapped
- donor · note · print-row-exception: Actions/Quarterstaff rides on: print rules row
- donor · note · print-row-exception: Reactions/Protective Magic rides on: the user's own part, feature or species
- read: def 5 / off 3 → 4; sustained 24 (2 × Quarterstaff); nova none; dmg 24

## Skitterbolt Sorcerer (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Shocking Bolt
- donor · note · print-row-exception: Actions/Quarterstaff rides on: print rules row
- donor · note · print-row-exception: Reactions/Protective Magic rides on: the user's own part, feature or species
- read: def 3 / off 2 → 2.5; sustained 14 (2 × Quarterstaff); nova none; dmg 14

## Overdue Scribe (CR 3)
- clean
- read: def 2 / off 3 → 2.5; sustained 24 (2 × Papercut); nova none; dmg 24

## Coinpurse Croaker (CR 2)
- clean
- read: def 2 / off 2 → 2; sustained 12 (1 × Tongue Lash); nova none; dmg 12

## Deepchannel Pike (CR 3)
- adjudicability · SOFT · inline-weapon-collision: inline-weapon-collision: header/inline: "the pike" is the weapon "pike" — its own rows will read as the weapon's
- read: def 2 / off 4 → 3; sustained 26 (2 × Jaws); nova none; dmg 26


## Audit findings dismissed on print rows

**1** finding(s) dismissed across 8 sheet(s) that carry the record.

- Goblin Wizard · Actions/"Spellcasting" — The Spellcasting entry offers no offensive spells, only utility cantrips, while the creature is built as a combatant; the entry name promises spellcasting power the list never delivers in a fight. — Either add a combat-relevant spell to the list or rename/reframe the entry so the name matches the actual utility-only payload. (about: "The goblin wizard casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):")

Reporting only: none of these raised a FAIL or changed a sheet.


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 4
- `multiattack` ×7
- `spellcasting` ×3
- `quarterstaff` ×2
- `protective magic` ×2

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
