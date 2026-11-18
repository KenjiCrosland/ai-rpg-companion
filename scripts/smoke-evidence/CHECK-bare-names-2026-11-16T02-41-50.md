# Mechanics check — bare-names-2026-11-16T02-41-50

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Captain Vane | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Sister Ilse | 2 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Old Marga | 1 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Clockwork Friar | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 5/5 |
| Father Ossic | 3 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 4/5 |
| Hedge-Witch of the Fen | 5 | 2024 | caster-8-binder | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Grik | 1 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | SOFT: print-rows | ok | ok | ok | soft (2) | 1/1 | 5/5 |
| Old Marga | 1 | 2024 | skirmisher-1 | SOFT: hit-die | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (2) | 1/1 | 3/4 |
| Old Scuttlesnape | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Grimjaw | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |

**Dropped 1 of 11 GM clauses** (coverage 91%); concept share 85% (39/46 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Captain Vane (CR 4)
- clean
- bands · note · print-numbers: Guard Captain's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Captain's Dread rides on: seed drawn for the user's clause
- donor · note · print-row-exception: Reactions/Riposte rides on: the user's own part, feature or species
- read: def 5 / off 4 → 4.5; sustained 30 (2 × Longsword); nova none; dmg 30

## Sister Ilse (CR 2)
- clean
- bands · note · print-numbers: Priest's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1 / off 3 → 2; sustained 22 (2 × Radiant Flame); nova none; dmg 22

## Old Marga (CR 1)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Grey Spores
- bands · note · print-numbers: Spy's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 2 / off 3 → 2.5; sustained 24 (2 × Shortsword); nova none; dmg 24

## Clockwork Friar (CR 3)
- clean
- bands · note · print-numbers: Priest's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Tolling Judgment rides on: seed keyed on the user's words (toll, ring, chime, deafen)
- read: def 1 / off 4 → 2.5; sustained 22 (2 × Mace); nova Tolling Judgment 24; dmg 31

## Father Ossic (CR 3)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Rite of the Snare Soil
- bands · note · print-numbers: Priest's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1 / off 3 → 2; sustained 22 (2 × Radiant Flame); nova none; dmg 22

## Hedge-Witch of the Fen (CR 5)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Trespasser's Tithe
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Marsh Rot rides on: seed from the fallback library — no word of the user's keyed it
- read: def 5 / off 8 → 6.5; sustained 48 (3 × Arcane Burst); nova Cone of Cold 36; dmg 56

## Grik (CR 1)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Hooked Pinning
- bands · note · print-numbers: Spy's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 2 / off 3 → 2.5; sustained 24 (2 × Shortsword); nova none; dmg 24

## Dame Oriel (CR 5)
- gates · SOFT · control-aoe-ungated: Actions/Oath-Light Burst: a 15-foot at-will Emanation of control with no way out — print's three Emanations past 10 feet all grant immunity for 24 hours on a success (Pit Fiend 20 ft, Cloaker 60 ft, Harpy 300 ft), which is how it can hand out a 300-foot Charm at CR 1
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Oath-Light Burst
- bands · note · print-numbers: Gladiator's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Aura of Authority rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Longsword rides on: print rules row
- read: def 5 / off 5 → 5; sustained 33 (3 × Longsword); nova none; dmg 33

## Old Marga (CR 1)
- derivation · SOFT · hit-die: d8 on a Large body (d10)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Beak Hook
- bands · note · print-numbers: Spy's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 2 / off 3 → 2.5; sustained 24 (2 × Shortsword); nova none; dmg 24

## Old Scuttlesnape (CR 3)
- clean
- read: def 3 / off 3 → 3; sustained 24 (2 × Hooked Claw); nova Ruption Lunge 13; dmg 24

## Grimjaw (CR 3)
- clean
- read: def 3 / off 3 → 3; sustained 24 (2 × Bite); nova Erupting Ambush 6; dmg 24


## Audit findings dismissed on print rows

**2** finding(s) dismissed across 11 sheet(s) that carry the record.

- Sister Ilse · Actions/"Spellcasting" — The listed spell list says '1/Day Each' but contains only a single spell, leaving 'Each' dangling with no referent. — Fix the list heading to match the single spell it introduces, or add the spells the heading implies. (about: "1/Day Each: Spirit Guardians")
- Clockwork Friar · Actions/"Multiattack" — The body refers to itself as 'the friar', which is not the creature's name (Clockwork Friar) — a referent inconsistency. — Refer to the creature by its own name, as published statblocks do. (about: "the friar makes two attacks")

Reporting only: none of these raised a FAIL or changed a sheet.


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 9
- `multiattack` ×11
- `spellcasting` ×4
- `radiant flame` ×3
- `mace` ×3
- `divine aid` ×3
- `shortsword` ×3
- `hand crossbow` ×3
- `cunning action` ×3

**Byte-identical row texts across sheets: 1**
- 07-grik.json / Hooked Pinning  ==  09-old-marga.json / Beak Hook

**One template, two mechanics across sheets: 0** ✓
