# Mechanics check — clausebudget-2026-11-08T22-36-41

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | FAIL: gate-fit | ok | FAIL (1) | 1/1 | 3/4 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | FAIL: engine-needs-key | ok | FAIL (1) | 1/1 | 6/6 |
| Drowned Choir | 10 (2014) | 2014 | caster-10-warpriest | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/4 |
| Plague Archon | 13 | 2024 | skirmisher-13-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 7/7 |
| Brass Tyrant | 17 | 2024 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 6/9 |
| Pit Fiend | 20 | 2024 | caster-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 8/8 |
| Trench Leviathan | 24 | 2024 | brute-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 5/7 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Sumpflesh Scythehusk | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/5 | 5/5 |
| Reliquary Rot | 9 (2014) | 2014 | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | SOFT: type-damage-affinity, type-damage-affinity, type-damage-affinity | ok | ok | soft (2) | 0/1 | 0/5 |
| Stormcrust Drake | 4 | 2024 | brute-2-charger | ok | SOFT: single-target-ceiling, band | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | FAIL: gate-fit | ok | FAIL (1) | 0/0 | 0/3 |
| Hedged Sellsword | 5 (2014) | 2014 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | SOFT: print-rows | SOFT: inline-weapon-collision | ok | ok | soft (2) | 2/2 | 5/5 |

**Dropped 9 of 16 GM clauses** (coverage 44%); concept share 80% (49/61 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-2 / reader: 1
- brute-9 / reader: 1
- brute-2-charger / reader: 1


## Dire Wolf (CR 1)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Take Down
- reader · FAIL · gate-fit: Actions/Take Down: an at-will condition action with no Multiattack to join — a shed use limit needs one
- bands · note · print-numbers: Dire Wolf's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Rime-Caked Hide rides on: seed from the fallback library — no word of the user's keyed it
- read: def 1/8 / off 1 → 0.5625; sustained 8 (1 × Bite); nova none; dmg 8

## Stone Golem (CR 10)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Pull and Crush
- reader · FAIL · engine-needs-key: Actions/Pull and Crush: a grapple or engulf engine with no key in the words
- bands · note · print-numbers: Stone Golem's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 11 / off 9 → 10; sustained 48 (2 × Slam); nova none; dmg 48

## Drowned Choir (CR 10, 2014)
- clean
- read: def 8 / off 10 → 9; sustained 58 (2 × Cudgel-Hand); nova Unison Tide 42; dmg 67

## Plague Archon (CR 13)
- clean
- read: def 9 / off 15 → 12; sustained 72 (3 × Talon); nova Stooping Descent 66; dmg 92

## Brass Tyrant (CR 17)
- bands · SOFT · hot-offense: offense alone reads CR 22, 5 over; the HP axis pulls the read to 17.5
- read: def 13 / off 22 → 17.5; sustained 165 (2 × Fist + legendary Trample Down); nova Molten Blast 66; dmg 165

## Pit Fiend (CR 20)
- clean
- bands · note · print-numbers: Pit Fiend's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 21 / off 18 → 19.5; sustained 104 (4 × Devilish Claw); nova none; dmg 104

## Trench Leviathan (CR 24)
- bands · SOFT · aim-dpr: damage 180 a round is 28% under the card's 250
- bands · SOFT · band: reads CR 25.5 (print at 24 reads 17.5–25.5, n=5)
- read: def 26 / off 25 → 25.5; sustained 180 (2 × Bite + legendary Rolling Lunge); nova Drowning Song 78; dmg 180

## Owlbear (CR 3)
- clean
- bands · note · print-numbers: Owlbear's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/2 / off 5 → 2.75; sustained 28 (2 × Rend); nova none; dmg 28

## Sumpflesh Scythehusk (CR 9)
- clean
- read: def 7 / off 9 → 8; sustained 60 (2 × Spitting Maw); nova none; dmg 60

## Reliquary Rot (CR 9, 2014)
- bands · SOFT · band: reads CR 6.5 (print at 9 reads 5.5–13, n=8)
- adjudicability · SOFT · type-damage-affinity: the 2024 model: type-damage-affinity: Traits/Corrosive Form: Necrotic damage on Ooze — no official Ooze deals Necrotic; re-theme the damage to the creature's substance (or the type itself is wrong)
- adjudicability · SOFT · type-damage-affinity: the 2024 model: type-damage-affinity: Actions/Engulfing Slap: Necrotic damage on Ooze — no official Ooze deals Necrotic; re-theme the damage to the creature's substance (or the type itself is wrong)
- adjudicability · SOFT · type-damage-affinity: the 2024 model: type-damage-affinity: Actions/Relic Draught (Recharge 5-6): Necrotic damage on Ooze — no official Ooze deals Necrotic; re-theme the damage to the creature's substance (or the type itself is wrong)
- read: def 5 / off 8 → 6.5; sustained 56 (2 × Engulfing Slap); nova Relic Snare 27; dmg 56

## Stormcrust Drake (CR 4)
- bands · SOFT · single-target-ceiling: Actions/Fist: 35 damage to one target in one action at CR 4 — print's hardest single hit in this band is 31 (1.13x), and a gate does not excuse it (print's are ungated)
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 1–6, n=66)
- gates · SOFT · control-aoe-ungated: Actions/Line Shove: at-will multi-target control with no stated area — all 21 of print's at-will control rows name a Cone or an Emanation
- reader · FAIL · gate-fit: Actions/Line Shove: an at-will condition action with no Multiattack to join — a shed use limit needs one
- read: def 1 / off 4 → 2.5; sustained 28 (1 × Fist); nova none; dmg 28

## Hedged Sellsword (CR 5, 2014)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Two Blades, One Rhythm
- adjudicability · SOFT · inline-weapon-collision: the 2024 model: inline-weapon-collision: header/inline: "the sellsword" is the weapon "longsword" — its own rows will read as the weapon's
- bands · note · print-numbers: Gladiator's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Handaxe rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Shortsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Reactions/Riposte rides on: the user's own part, feature or species
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Handaxe); nova none; dmg 33


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 8
- `multiattack` ×10
- `bite` ×3
- `legendary resistance` ×3
- `magic resistance` ×2
- `spellcasting` ×2
- `fear aura` ×2
- `fist` ×2
- `legendary action uses: 3` ×2

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
