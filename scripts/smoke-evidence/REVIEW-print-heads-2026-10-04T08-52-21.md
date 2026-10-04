# Review batch — print-heads-2026-10-04T08-52-21

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, a legendary, one marked soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Varren Ghul | 15 | 2024 | skirmisher-13 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | soft (1) |
| Lucien Voss | 15 (2014) | 2014 | lurker-8 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | soft (1) |
| Kraken | 24 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Pit Fiend | 20 (2014) | 2014 | defender-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Mortis Anselm | 18 | 2024 | caster-21-warpriest | ok | FAIL: hot-offense | ok | ok | ok | ok | ok | FAIL (1) |
| Ossian Mournhold | 18 (2014) | 2014 | caster-21-warpriest | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Marrowcrown Selerath | 24 | 2024 | caster-21 | ok | SOFT: under | ok | ok | ok | ok | ok | soft (1) |
| Korthos Heliarch | 24 (2014) | 2014 | caster-21 | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok | soft (1) |

**Fails by seat and gate:**
- caster-21-warpriest / bands: 1



---

## Varren Ghul — lowest CR

**Concept:** a vampire lord who commands bats and wolves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Varren Ghul | 15 | skirmisher-13 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 91 a round is 21% under the card's 115
- bands · soft · band: reads CR 12.5 (print at 15 reads 6.5–17.5, n=12)
- read: def 10 / off 15 → 12.5; sustained 66 (3 × Grave Strike); nova Lord's Sweeping Claws 71; dmg 91

```
Varren Ghul

Medium Undead, Neutral Evil

AC 18
Initiative +6 (16)

HP 212 (25d8 + 100)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
18
+4
+4
INT
17
+3
+3
MOD
SAVE
DEX
22
+6
+11
WIS
15
+2
+7
MOD
SAVE
CON
18
+4
+4
CHA
18
+4
+4

Skills Perception +7, Stealth +11

Resistances Necrotic

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 120 ft.; Passive Perception 17

Languages Common plus two other languages

CR 15 (XP 13,000; PB +5)

Traits

Bloodsworn Hunt. Varren knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Flit. When a creature Varren can see ends its turn within 5 feet of it, Varren can move up to 10 feet without provoking Opportunity Attacks.

Legendary Resistance (3/Day). If Varren fails a saving throw, it can choose to succeed instead.

Misty Escape. If Varren drops to 0 Hit Points outside its resting place, Varren uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 Hit Points in mist form, it can't return to its Varren form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its Varren form and has the Paralyzed condition until it regains any Hit Points, and it regains 1 Hit Point after spending 1 hour there.

Spider Climb. Varren can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Vampire Weakness. Varren has these weaknesses:


- Forbiddance: Varren can't enter a residence without an invitation from an occupant.
- Running Water: Varren takes 20 Acid damage if it ends its turn in running water.
- Stake to the Heart: If a weapon that deals Piercing damage is driven into Varren's heart while Varren has the Incapacitated condition in its resting place, Varren has the Paralyzed condition until the weapon is removed.
- Sunlight: Varren takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.

Actions

Multiattack. Varren makes three Grave Strike attacks. It can replace one attack with a use of Bite (Bat or Vampire Form Only).

Grave Strike. Melee Attack Roll: +11, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17) from one of two hands.

Lord's Sweeping Claws (Recharge 5-6). Strength Saving Throw: DC 19, each creature in a 60-foot-long, 5-foot-wide Line. Failure: 71 (13d10) Necrotic damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage only.

Bite (Bat or Vampire Form Only). Constitution Saving Throw: DC 19, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. Failure: 28 (8d6) Piercing damage plus 13 (3d8) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and Varren regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Varren Spawn under Varren's control. Success: Half damage only.

Bonus Actions

Shape-Shift. If Varren isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its Varren form. Anything it is wearing transforms with it.
While in bat form, Varren can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, Varren can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.

Charm (Recharge 5-6). Varren casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The Charmed target is a willing recipient of Varren's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by Varren.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] skirmisher type=Undead mechanics=none — defender-leader: a Undead commands no troops | swarm: a swarm is a mass of many — no mass in the words | skirmisher: ✓ ("wolves") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: commands bats and wolves [behavior] | grave-born vampire lord [body] | feeds on the wounded [behavior]
[reskin] print canon array: STR 18, DEX 22, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's, DEX fitted to +11
[reskin] print canon: "a vampire lord who commands bats and wolves" heads on the Vampire — print's rows ride along; the seat stays
[reskin] signature idea (action): "Varren calls to the swarming court in his blood and the creatures answer in kind — every bat and wolf under his dominion within sight of him converges and strikes as one, each beast snapping at a foe of Varren's choosing, and those beasts that bite latch on and drag their prey toward him until he can close the distance himself. It can only call this way so often before his servants disperse." [action/once_per_fight/condition] — menu: gaze-single, snare, reel, condition-payoff, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation, snatch, charge)
[reskin] signature miss: action — "Varren calls to the swarming court in his blood and the creatures answer in kind — every bat and wolf under his dominion within sight of him converges and strikes as one, each beast snapping at a foe of Varren's choosing, and those beasts that bite latch on and drag their prey toward him until he can close the distance himself. It can only call this way so often before his servants disperse." [action/once_per_fight/condition] — the model found no template that holds it (offered: gaze-single, snare, reel, condition-payoff, lure, snare-bolt, sensory-strike, disarm, exploiter, hook-rider, focus)
[reskin] value check: "Driving Bellow (2/Day)" EV 11.3 vs floor 73.5 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Beasts sworn to Varren's court are bound to him by blood, not loyalty — when he spills his own vitality to feed them, they surge with borrowed hunger and will not flee or falter while he stands. Those he feeds grow bolder and more vicious, and he can always feel through them where wounded prey is hiding." [trait/always/defense] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature template (trait): faultless-tracker -> Traits/"Bloodsworn Hunt" ("The idea's final clause — he can always feel through them where wounded prey is  [shape fit, no verb match]")
[reskin] chassis nova: "Lord's Sweeping Claws (Recharge 5-6)" — the skirmisher-13's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Vampire has no such mode and the words name none
[reskin] print canon languages: "Common" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 50 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Grave Strike" — the Vampire's own row
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon: chassis row leaves — Traits/"Mist Form" is the seat's, not the Vampire's
[reskin] print canon row priced: Bite (Bat or Vampire Form Only) — dice 6 → 28
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
```


---

## Korthos Heliarch — highest CR

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Korthos Heliarch | 24 (2014) | caster-21 | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok |

- gates · soft · rider-no-save: Actions/Eldritch Burst: a Frightened rider on every hit with no save
- read: def 22 / off 24 → 23; sustained 207 (3 × Bone Shard + legendary Deathly Teleport); nova none; dmg 207

```
Korthos Heliarch
Medium undead, neutral evil
Armor Class

19 (natural armor)

Hit Points: 

487 (65d8 + 195)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


11 (+0)

	

16 (+3)

	

16 (+3)

	

18 (+4)

	

14 (+2)

	

16 (+3)

Skills: 

Arcana +11, Perception +9

Saving Throws: 

CON +10, INT +11, WIS +9

Damage Resistances: 

cold

Damage Immunities: 

necrotic, poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, poisoned

Senses: 

truesight 120 ft., passive Perception 19

Languages: 

All

Challenge

24 (62,000 XP)

Proficiency Bonus:

+7

Orbiting Shard Guard. A creature that touches Korthos or hits it with a melee attack while within 5 feet of it takes 14 (4d6) necrotic damage.
Legendary Resistance (3/Day). If Korthos fails a saving throw, it can choose to succeed instead.
Spirit Jar. If destroyed, Korthos reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within Korthos's lair.
Protective Magic (3/Day) (Reaction). When Korthos is hit by an attack roll, Korthos casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Korthos makes three attacks, using Bone Shard, Eldritch Burst, or Paralyzing Touch. It can replace one attack with a use of Spellcasting to cast blindness/deafness.
Bone Shard: Melee or Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 58 (12d8 + 4) necrotic damage.
Eldritch Burst: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 35 (7d8 + 4) force damage, and the target is frightened until the start of Korthos's next turn.
Paralyzing Touch: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 35 (7d8 + 4) cold damage, and the target is frightened until the start of Korthos's next turn.
Spellcasting: Korthos casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 19):

At will: misty step, blindness/deafness
1/day each: blight (cast at 8th level), cloudkill (cast at 9th level)
Legendary Actions

Korthos can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. Korthos regains spent legendary actions at the start of its turn.

Deathly Teleport: Korthos teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an undead within 20 feet of Korthos must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one. Korthos can't take this action again until the start of its next turn.
Frightening Gaze: Korthos casts fear, using the same spellcasting ability as Spellcasting. Korthos can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] caster (artillery) type=Undead mechanics=aura, gaze — caster: ✓ ("an archlich enthroned on a sun of bone") | caster: no line key in the words — the model's read of its quote
[concept] signature elements: throne of fused skulls orbiting a captive lich [body] | solar necrotic blasts from a dead star's marrow [behavior] | phasing between bone orbits to escape melee [behavior]
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 18, WIS 14, CHA 16 — the Lich's, INT fitted to +11
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "The Heliarch wrings a fistful of grave-light from the marrow of its dead star and casts it outward, and that light lingers on every foe it touches as a clinging ember of the void. Anyone still burning with that ember when Korthos next raises its scepter finds the whole sun answering through them — the necrotic fire leaps from the marked to the lich's weapon, and the wound it leaves is that much de" [rider/on_hit/damage] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: gaze-single, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, delayed-brand, curse-debt, zone-seed, reveal, aggro-curse, self-invisibility, rally, snap-shot)
[reskin] signature miss: action — "The Heliarch wrings a fistful of grave-light from the marrow of its dead star and casts it outward, and that light lingers on every foe it touches as a clinging ember of the void. Anyone still burning with that ember when Korthos next raises its scepter finds the whole sun answering through them — the necrotic fire leaps from the marked to the lich's weapon, and the wound it leaves is that much de" [rider/on_hit/damage] — the model found no template that holds it (offered: bolt-restrain, bolt-drag, bolt-mark, delayed-brand, reveal, lure, sensory-strike, aggro-curse)
[reskin] value check: "Transfixing Regard (2/Day)" EV 31.9 vs floor 147 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Transfixing Regard (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Korthos never sits still upon the throne of fused skulls; the whole bone-sun turns with its will, dragging every orbiting shard into a new alignment. Foes who think they have learned the lich's position and its dead angles find the entire array has rotated around them, and any creature that tries to strike the throne itself is met by a shard that has quietly drifted into its path." [trait/always/defense] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature template (trait): heated-body -> Traits/"Orbiting Shard Guard" ("any creature that tries to strike the throne itself is met by a shard that has q [verb: shard:idea]")
[reskin] chassis nova: "Grave Corona (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] print canon size: Gargantuan -> Medium — the Lich's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Crown Scepter" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Grave Corona (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
```


---

## Lucien Voss — a 2014 sheet

**Concept:** a vampire lord who commands bats and wolves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Lucien Voss | 15 (2014) | lurker-8 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 69 a round is 28% under the table's 96
- bands · soft · band: reads CR 10.5 (print at 15 reads 6.25–14.5, n=12)
- read: def 10 / off 11 → 10.5; sustained 69 (3 × Grave Strike); nova none; dmg 69

```
Lucien Voss
Medium undead, neutral evil
Armor Class

17 (natural armor)

Hit Points: 

212 (25d8 + 100)

Speed: 

40 ft., climb 40 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

16 (+3)

	

18 (+4)

	

17 (+3)

	

15 (+2)

	

18 (+4)

Skills: 

Perception +7, Stealth +13

Saving Throws: 

DEX +8, INT +8

Damage Resistances: 

necrotic

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 120 ft., passive Perception 17

Languages: 

Common plus two other languages

Challenge

15 (13,000 XP)

Proficiency Bonus:

+5

Mistborne Evasion. If Lucien is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Lucien instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it is incapacitated.
Legendary Resistance (3/Day). If Lucien fails a saving throw, it can choose to succeed instead.
Misty Escape. If Lucien drops to 0 hit points outside its resting place, Lucien uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 hit points in mist form, it can't return to its Lucien form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its Lucien form and is paralyzed until it regains any hit points, and it regains 1 hit point after spending 1 hour there.
Spider Climb. Lucien can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Vampire Weakness. Lucien has these weaknesses: Forbiddance: Lucien can't enter a residence without an invitation from an occupant.
Running Water: Lucien takes 20 acid damage if it ends its turn in running water.
Stake to the Heart: If a weapon that deals piercing damage is driven into Lucien's heart while Lucien is incapacitated in its resting place, Lucien is paralyzed until the weapon is removed.
Sunlight: Lucien takes 20 radiant damage if it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks.
Shape-Shift (Bonus Action). If Lucien isn't in sunlight or running water, as a bonus action it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its Lucien form. Anything it is wearing transforms with it.
While in bat form, Lucien can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, Lucien can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has resistance to all damage, except the damage it takes from sunlight.
Charm (Recharge 5-6). As a bonus action, Lucien casts charm person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The charmed target is a willing recipient of Lucien's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was charmed by Lucien.

Actions
Multiattack: Lucien makes three Grave Strike attacks. It can replace one attack with a use of Bloodwake Hunger.
Grave Strike: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) by one of two hands.
Bloodwake Hunger: One creature within 30 feet must make a DC 17 Constitution saving throw, taking 28 (8d6) necrotic damage on a failed save, or half as much damage on a successful one. Lucien regains hit points equal to half the damage dealt.
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that is grappled, incapacitated, or restrained must make a DC 17 Constitution saving throw, taking 28 (8d6) piercing damage plus 13 (3d8) necrotic damage on a failed save, or half as much damage on a successful one. The target's hit point maximum decreases by an amount equal to the necrotic damage taken, and Lucien regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a Lucien Spawn under Lucien's control.
```

**Engine trace**

```
[route] lurker type=Undead mechanics=none — skirmisher-shifter: a shifter is named by its words (shape-shifts, turns into, a were-) — none here | defender-leader: a Undead commands no troops | lurker: ✓ ("a vampire lord") | lurker: no line key in the words — the model's read of its quote
[concept] signature elements: commands bats and wolves [behavior] | drains blood to heal [behavior] | turns into a bat swarm [body]
[reskin] print canon array: STR 18, DEX 16, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's, DEX fitted to +8
[reskin] print canon: "a vampire lord who commands bats and wolves" heads on the Vampire — print's rows ride along; the seat stays
[reskin] signature idea (action): "Lucien lets out a piercing whistle that calls every bat and wolf within a mile to his side. These beasts pour from the treeline immediately, forming a snarling, fluttering wall that pins his enemies in place — no one can run, and those caught in the swarm are torn at by fangs and claws each moment they remain. The swarm obeys Lucien's silent commands, shifting to drag down anyone who tries to brea" [action/always/condition] — menu: gaze-single, execute, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, blink, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation, snatch)
[reskin] signature bound to the concept's verb: action — drain (vampire)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into drain
[reskin] value check: "Bloodwake Hunger" EV 21.7 vs floor 15.1 (one attack of 3) — added Success: Half; dice 17 → 28
[reskin] signature template: drain -> Actions/"Bloodwake Hunger" ("The idea's central verb is vampire itself — a vampire lord's own drain; the temp [verb: vampire:concept]")
[reskin] signature idea (trait): "Lucien's body is not truly solid — at any moment, he can unravel into a churning cloud of bats that flows around attacks and reforms where he wills. While in this form, weapons and spells tear through empty air, and he can slip through the smallest cracks, though he cannot strike back until he gathers himself again." [trait/always/defense] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature template (trait): evasion -> Traits/"Swarm Form" ("Lucien unravels into a churning cloud of bats that flows around attacks — weapon [shape fit, no verb match]")
[reskin] print canon modes: fly off — the Vampire has no such mode and the words name none
[reskin] print canon languages: "Common, Abyssal" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Claw" -> "Grave Strike" — the Vampire's own row
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon row priced: Bite (Bat or Vampire Form Only) — dice 6 → 28
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
```


---

## Kraken — a 2024 sheet

**Concept:** a kraken of the black trench

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Kraken | 24 | brute-21 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 22 / off 15 → 18.5; sustained 68 (2 × Tentacle); nova none; dmg 68

```
Kraken

Gargantuan Monstrosity, Neutral

AC 18
Initiative +0 (10)

HP 481 (26d20 + 208)

Speed 30 ft., Swim 120 ft.

MOD
SAVE
STR
30
+10
+17
INT
22
+6
+6
MOD
SAVE
DEX
11
+0
+0
WIS
18
+4
+11
MOD
SAVE
CON
26
+8
+15
CHA
20
+5
+5

Skills Athletics +17, Perception +11

Immunities Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained

Senses truesight 120 ft.; Passive Perception 21

Languages Understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft.

CR 24 (XP 62,000; PB +7)

Traits

Legendary Resistance (3/Day). If the kraken fails a saving throw, it can choose to succeed instead.

Amphibious. The kraken can breathe air and water.

Siege Monster. The kraken deals double damage to objects and structures.

Actions

Multiattack. The kraken makes two Tentacle attacks. It can replace one attack with a use of Fling.

Tentacle. Melee Attack Roll: +17, reach 30 ft. 34 (7d6 + 10) Bludgeoning damage. The target has the Grappled condition (escape DC 25) from one of ten tentacles, and it has the Restrained condition until the grapple ends.

Fling. The kraken throws a Large or smaller creature Grappled by it to a space it can see within 60 feet of itself that isn't in the air. Dexterity Saving Throw: DC 25, the creature thrown and each creature in the destination space. Failure: 18 (4d8) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

Lightning Strike. Dexterity Saving Throw: DC 25, one creature the kraken can see within 120 feet. Failure: 58 (13d8) Lightning damage. Success: Half damage.

Swallow. Dexterity Saving Throw: DC 25, one creature Grappled by the kraken (it can have up to four creatures swallowed at a time). Failure: 23 (3d8 + 10) Piercing damage. If the target is Large or smaller, it is swallowed and no longer Grappled. A swallowed creature has the Restrained condition, has Total Cover against attacks and other effects outside the kraken, and takes 24 (7d6) Acid damage at the start of each of its turns.
If the kraken takes 50 damage or more on a single turn from a creature inside it, the kraken must succeed on a DC 25 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the kraken with the Prone condition. If the kraken dies, any swallowed creature no longer has the Restrained condition and can escape from the corpse using 15 feet of movement, exiting Prone.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the kraken can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Storm Bolt. The kraken uses Lightning Strike.

Toxic Ink. Constitution Saving Throw: DC 25, each creature in a 15-foot Emanation originating from the kraken while it is underwater. Failure: The target has the Blinded and Poisoned conditions until the end of the kraken's next turn. The kraken then moves up to its Speed. Failure or Success: the kraken can't take this action again until the start of its next turn.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("a kraken of the black trench") | brute-grappler: key "kraken" (class body)
[concept] signature elements: abyssal brine hide [body] | crushing tentacle grapple [behavior] | lamprey maw engulf [body]
[reskin] print canon route: "a kraken of the black trench" is the Kraken — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 541 -> 481, AC 21 -> 18 — the Kraken's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 11, CON 26, INT 22, WIS 18, CHA 20 — the Kraken's at its own CR; attack +16 -> +17, DC 25 (print's)
[reskin] print canon: "a kraken of the black trench" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Brine-Surge (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes swim — the Kraken's
[reskin] print canon senses: "truesight 120 ft." — the Kraken's
[reskin] print canon name: "Vhoss'un the Trench Maw" -> "Kraken" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "Common" -> "Understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft." — the Kraken's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Kraken's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 120 ft. — the Kraken's own
[reskin] print canon attack: "Barbed Tentacle" -> "Tentacle" — the Kraken's own row
[reskin] print canon defenses: immunities none -> Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained — the Kraken's own header lines
[reskin] print canon trait: Amphibious — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon trait: Siege Monster — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Brine-Surge (Recharge 5-6)" is the seat's nova, not the Kraken's
[reskin] print canon legendary: Storm Bolt, Toxic Ink — the Kraken's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Fling — the Kraken's own
[reskin] print canon row priced: Lightning Strike — dice 33 → 58
[reskin] print canon row: Actions/Lightning Strike — the Kraken's own
[reskin] print canon row: Actions/Swallow — the Kraken's own
```


---

## Kraken — a print donor

**Concept:** a kraken of the black trench

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Kraken | 24 (2014) | brute-21 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 22 / off 17 → 19.5; sustained 82 (2 × Tentacle); nova none; dmg 82

```
Kraken
Gargantuan monstrosity, unaligned
Armor Class 18 (natural armor)
Hit Points 481 (26d20 + 208)
Speed 30 ft., swim 120 ft.
STR 30 (+10), DEX 11 (+0), CON 26 (+8), INT 22 (+6), WIS 18 (+4), CHA 20 (+5)
Saving Throws STR +17, CON +15, WIS +11
Skills Athletics +17, Perception +11
Damage Immunities cold, lightning
Condition Immunities frightened, grappled, paralyzed, restrained
Senses truesight 120 ft., passive Perception 21
Languages understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft.
Challenge 24 (62,000 XP)
Proficiency Bonus +7

Traits
Legendary Resistance (3/Day): If the kraken fails a saving throw, it can choose to succeed instead.
Amphibious: The kraken can breathe air and water.
Siege Monster: The kraken deals double damage to objects and structures.

Actions
Multiattack: The kraken makes two Tentacle attacks. It can replace one attack with a use of Fling.
Tentacle: Melee Weapon Attack: +17 to hit, reach 30 ft., one target. Hit: 41 (7d8 + 10) bludgeoning damage. The target is grappled (escape DC 25) from one of ten tentacles, and it is restrained until the grapple ends.
Fling: The kraken throws a Large or smaller creature grappled by it to a space it can see within 60 feet of itself that isn't in the air. The creature thrown and each creature in the destination space must make a DC 25 Dexterity saving throw, taking 18 (4d8) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
Lightning Strike: One creature the kraken can see within 120 feet must make a DC 25 Dexterity saving throw, taking 58 (13d8) lightning damage on a failed save, or half as much damage on a successful one.
Swallow: One creature grappled by the kraken (it can have up to four creatures swallowed at a time) must make a DC 25 Dexterity saving throw, taking 23 (3d8 + 10) piercing damage on a failed save. If the target is Large or smaller, it is swallowed and no longer grappled. A swallowed creature is restrained, has total cover against attacks and other effects outside the kraken, and takes 24 (7d6) acid damage at the start of each of its turns.
If the kraken takes 50 damage or more on a single turn from a creature inside it, the kraken must succeed on a DC 25 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls prone in a space within 10 feet of the kraken. If the kraken dies, any swallowed creature is no longer restrained and can escape from the corpse using 15 feet of movement, exiting prone.

Legendary Actions
Storm Bolt: The kraken uses Lightning Strike.
Toxic Ink: Each creature within 15 feet of the kraken while it is underwater must make a DC 25 Constitution saving throw. On a failed save, the target is blinded and poisoned until the end of the kraken's next turn. The kraken then moves up to its Speed. Whether it fails or succeeds, the kraken can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("a kraken of the black trench") | brute-grappler: key "kraken" (class body)
[concept] signature elements: seizing coils that drag prey into a lamprey-maw [behavior] | a body of black trench brine [body] | boiling ink-cloud retreat [behavior]
[reskin] print canon route: "a kraken of the black trench" is the Kraken — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 487 -> 481, AC 19 -> 18 — the Kraken's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 11, CON 26, INT 22, WIS 18, CHA 20 — the Kraken's at its own CR; attack +11 -> +17, DC 25 (print's)
[reskin] print canon: "a kraken of the black trench" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Ink Cloud (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes swim — the Kraken's
[reskin] print canon senses: "truesight 120 ft." — the Kraken's
[reskin] print canon name: "Abyssal Trenchworm" -> "Kraken" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "Common" -> "Understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft." — the Kraken's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Kraken's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 120 ft. — the Kraken's own
[reskin] print canon attack: "Tendril" -> "Tentacle" — the Kraken's own row
[reskin] print canon defenses: immunities none -> Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained — the Kraken's own header lines
[reskin] print canon trait: Amphibious — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon trait: Siege Monster — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Ink Cloud (Recharge 5-6)" is the seat's nova, not the Kraken's
[reskin] print canon legendary: Storm Bolt, Toxic Ink — the Kraken's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Fling — the Kraken's own
[reskin] print canon row priced: Lightning Strike — dice 33 → 58
[reskin] print canon row: Actions/Lightning Strike — the Kraken's own
[reskin] print canon row: Actions/Swallow — the Kraken's own
```


---

## Mortis Anselm — a homebrew with a nova

**Concept:** a death knight who leads a damned legion

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Mortis Anselm | 18 | caster-21-warpriest | ok | FAIL: hot-offense | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 20 (print at 18 reads 12.5–18.5, n=5)
- bands · fail · hot-offense: offense alone reads CR 27, 9 over — past print's own ceiling (the Adult Brass Dragon at +7)
- read: def 13 / off 27 → 20; sustained 260 (2 × Graveblade + legendary Legion Strike); nova War Prayer 72; dmg 260

```
Mortis Anselm

Medium Undead, Lawful Evil

AC 19
Initiative +3 (13)

HP 247 (26d8 + 130)

Speed 40 ft.

MOD
SAVE
STR
22
+6
+6
INT
16
+3
+3
MOD
SAVE
DEX
16
+3
+3
WIS
24
+7
+13
MOD
SAVE
CON
21
+5
+11
CHA
20
+5
+11

Skills Perception +13, Religion +9

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 120 ft.; Passive Perception 23

Languages Common, Infernal

CR 18 (XP 20,000; PB +6)

Traits

Legendary Resistance (3/Day). If the mortis anselm fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The mortis anselm makes two Graveblade attacks. It can replace one attack with a use of Spellcasting to cast Bestow Curse.

Graveblade. Melee or Ranged Attack Roll: +13, reach 5 ft. or range 120 ft. 52 (10d8 + 7) Slashing damage. Hit or Miss: The weapon magically returns to the mortis anselm's hand.

War Prayer (Recharge 5-6). Constitution Saving Throw: DC 20, each creature in a 20-foot Emanation originating from the mortis anselm. Failure: 72 (16d8) Necrotic damage. Success: Half damage only.

Spellcasting. The mortis anselm casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 21):

- At Will: Bestow Curse, Fear
- 1/Day Each: Blight (level 7 version), Cloudkill (level 9 version)

Bonus Actions

Bolstering Cry (2/Day). Each ally within 30 feet of the mortis anselm gains 26 (4d12) Temporary Hit Points.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the mortis anselm can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Legion Strike. The mortis anselm makes one Graveblade attack.

Black March. The mortis anselm moves up to half its Speed without provoking Opportunity Attacks.

Martyr's Cry. Wisdom Saving Throw: DC 20, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] caster-warpriest (artillery) type=Undead mechanics=none — defender-leader: a Undead commands no troops | caster-warpriest: ✓ ("death knight") | caster-warpriest: no line key in the words — the model's read of its quote
[concept] signature elements: commands a damned legion of undead [behavior] | profane war-prayers and smites [object] | undying fanaticism [behavior]
[reskin] signature idea (action): "The mortis anselm plants its blade and issues a command that calls a handful of damned soldiers up out of the ground around it. They fight on its behalf, and whenever the mortis strikes down a foe, another soldier claws its way free from the corpse to join the legion." [action/save/damage] — menu: condition-payoff, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature miss: action — "The mortis anselm plants its blade and issues a command that calls a handful of damned soldiers up out of the ground around it. They fight on its behalf, and whenever the mortis strikes down a foe, another soldier claws its way free from the corpse to join the legion." [action/save/damage] — the model found no template that holds it (offered: condition-payoff, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal, rally)
[reskin] value check: "Bolstering Cry (2/Day)" EV 14.3 vs floor 8.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Damned soldiers answer only to their commander, not to pain: when one of its legion falls, the mortis anselm simply spends a moment of command to raise another in its place, so the legion never truly shrinks until the commander himself is destroyed." [trait/always/resource] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — death-burst (death)
[reskin] signature miss: trait — "Damned soldiers answer only to their commander, not to pain: when one of its legion falls, the mortis anselm simply spends a moment of command to raise another in its place, so the legion never truly shrinks until the commander himself is destroyed." [trait/always/resource] — the model found no template that holds it (offered: death-burst)
[reskin] chassis nova: "War Prayer (Recharge 5-6)" — the caster-21-warpriest's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Pit Fiend — a legendary

**Concept:** a pit fiend general

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Pit Fiend | 20 | defender-17 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 19 / off 22 → 20.5; sustained 156 (3 × Bite + legendary Spiteful Parry); nova none; dmg 156

```
Pit Fiend

Large Fiend, Lawful Evil

AC 21
Initiative +2 (12)

HP 337 (27d10 + 189)

Speed 30 ft., Fly 60 ft. (hover)

MOD
SAVE
STR
26
+8
+14
INT
22
+6
+6
MOD
SAVE
DEX
14
+2
+2
WIS
18
+4
+10
MOD
SAVE
CON
24
+7
+13
CHA
24
+7
+7

Skills Athletics +14, Perception +10

Resistances Cold

Immunities Fire, Poison; Poisoned

Senses truesight 120 ft.; Passive Perception 20

Languages Infernal; telepathy 120 ft.

CR 20 (XP 25,000; PB +6)

Traits

Legendary Resistance (3/Day). If the pit fiend fails a saving throw, it can choose to succeed instead.

Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend's aura for 24 hours.

Magic Resistance. The pit fiend has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The pit fiend makes three attacks, using Bite, Devilish Claw, or Fiery Mace in any combination.

Bite. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Force damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Hellfire Spellcasting (Recharge 4-6). The pit fiend casts Fireball (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21). It can replace one Fireball with Hold Monster (level 7 version) or Wall of Fire.

- At Will:

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the pit fiend can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Spiteful Parry. The pit fiend makes one Bite attack.

Iron Discipline. The pit fiend takes the Dodge action. The pit fiend can't take this action again until the start of its next turn.

Warding Shove. Strength Saving Throw: DC 21, one creature within 5 feet. Failure: The target is pushed up to 15 feet away from the pit fiend and has the Prone condition.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] defender-leader type=Fiend mechanics=none — defender-leader: ✓ ("a pit fiend general") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: aura of absolute command [aura] | fights beside its troops [behavior] | parries and punishes [behavior]
[reskin] print canon route: "a pit fiend general" is the Pit Fiend — the leader seat stands down for the plain line
[reskin] print canon defenses: HP 281 -> 337, AC 22 -> 21 — the Pit Fiend's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 26, DEX 14, CON 24, INT 22, WIS 18, CHA 24 — the Pit Fiend's at its own CR; attack +14 -> +14, DC 21 (print's)
[reskin] print canon: "a pit fiend general" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes fly — the Pit Fiend's
[reskin] print canon senses: "truesight 120 ft." — the Pit Fiend's
[reskin] print canon name: "Pit Fiend General" -> "Pit Fiend" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "Common, Infernal, telepathy 120 ft." -> "Infernal; telepathy 120 ft." — the Pit Fiend's
[reskin] print canon speed: Fly -> 60 ft. — the Pit Fiend's own
[reskin] print canon row: Actions/Devilish Claw — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon row: Actions/Fiery Mace — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon attack: "Greataxe" -> "Bite" — the Pit Fiend's own row
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Pit Fiend's own header lines
[reskin] print canon trait: Diabolical Restoration — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon trait: Fear Aura — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon trait: Magic Resistance — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon row: Actions/Hellfire Spellcasting (Recharge 4-6) — the Pit Fiend's own
```


---

## Ossian Mournhold — one marked soft

**Concept:** a death knight who leads a damned legion

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Ossian Mournhold | 18 (2014) | caster-21-warpriest | ok | SOFT: hot-offense | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 24, 6 over; the HP axis pulls the read to 18.5
- read: def 13 / off 24 → 18.5; sustained 200 (2 × Graveblade + legendary Graveblade Swing); nova Black Hymn 72; dmg 200

```
Ossian Mournhold
Medium undead, neutral
Armor Class

19 (natural armor)

Hit Points: 

256 (27d8 + 135)

Speed: 

40 ft.

STR	DEX	CON	INT	WIS	CHA


22 (+6)

	

16 (+3)

	

21 (+5)

	

16 (+3)

	

18 (+4)

	

20 (+5)

Skills: 

Perception +10, Religion +9

Saving Throws: 

CON +11, WIS +10, CHA +11

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 120 ft., passive Perception 20

Languages: 

Common plus the languages it knew in life

Challenge

18 (20,000 XP)

Proficiency Bonus:

+6

Legendary Resistance (3/Day). If Ossian fails a saving throw, it can choose to succeed instead.
Mournhold Dirge (2/Day). As a bonus action, Ossian grants each ally within 30 feet of it 21 (6d6) temporary hit points.

Actions
Multiattack: Ossian makes two Graveblade attacks. It can replace one attack with a use of Spellcasting to cast fear.
Graveblade: Melee or Melee or Ranged Spell Attack: +10 to hit, reach 5 ft. or range 120 ft., one target. Hit: 40 (8d8 + 4) slashing damage. The weapon magically returns to Ossian's hand.
Black Hymn (Recharge 5-6): Each creature within 20 feet of Ossian must make a DC 19 Constitution saving throw, taking 72 (16d8) necrotic damage on a failed save, or half as much damage on a successful one.
Spellcasting: Ossian casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 18): -

At will: detect magic, fear, bestow curse

1/day each: blight (cast at 5th level)
Legendary Actions

Ossian can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. Ossian regains spent legendary actions at the start of its turn.

Graveblade Swing: Ossian makes one Graveblade attack.
Legion Advance: Ossian moves up to half its speed without provoking opportunity attacks.
Cull the Fearful: One creature within 30 feet of Ossian must succeed on a DC 19 Wisdom saving throw or be frightened of Ossian until the end of its next turn.
```

**Engine trace**

```
[route] caster-warpriest (artillery) type=Undead mechanics=none — defender-leader: a Undead commands no troops | caster-warpriest: ✓ ("a death knight") | caster-warpriest: no line key in the words — the model's read of its quote
[concept] signature elements: commands a damned legion [behavior] | profane war-prayers [behavior] | ash-and-bone chassis [body]
[reskin] signature idea (action): "Ossian raises his Graveblade and utters a command that splits the air like a cracking tombstone. One fallen creature he can see—whether dead from this fight or any other, or a corpse he has claimed—rises as a lesser legionnaire that obeys him until destroyed, and it has the same foul weapon and undead resilience as its master in miniature. He can keep no more than a handful of such wretches animat" [action/always/resource] — menu: condition-payoff, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature miss: action — "Ossian raises his Graveblade and utters a command that splits the air like a cracking tombstone. One fallen creature he can see—whether dead from this fight or any other, or a corpse he has claimed—rises as a lesser legionnaire that obeys him until destroyed, and it has the same foul weapon and undead resilience as its master in miniature. He can keep no more than a handful of such wretches animat" [action/always/resource] — the model found no template that holds it (offered: condition-payoff, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal, rally)
[reskin] value check: "Bolstering Cry (2/Day)" EV 11.6 vs floor 6.7 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Ossian's body is a siege engine of burnt bone and compacted ash. When a weapon strikes him, some of his attacker's conviction flakes away in black motes that stream into his wounds, closing them slightly; the harder they try to bring him down, the more his smashed frame knits itself from their hate." [trait/on_being_hit/defense] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — death-burst (death)
[reskin] signature miss: trait — "Ossian's body is a siege engine of burnt bone and compacted ash. When a weapon strikes him, some of his attacker's conviction flakes away in black motes that stream into his wounds, closing them slightly; the harder they try to bring him down, the more his smashed frame knits itself from their hate." [trait/on_being_hit/defense] — the model found no template that holds it (offered: death-burst)
[reskin] chassis nova: "Black Hymn (Recharge 5-6)" — the caster-21-warpriest's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Marrowcrown Selerath — bands soft

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Marrowcrown Selerath | 24 | caster-21 | ok | SOFT: under | ok | ok | ok | ok | ok |

- bands · soft · under: effective HP 442 sits under print at CR 24 (468–546, n=5); the read holds at 24, within print's own ±1
- read: def 22 / off 26 → 24; sustained 207 (3 × Throne Splinter + legendary Deathly Teleport); nova none; dmg 207

```
Marrowcrown Selerath

Medium Undead, Neutral Evil

AC 21
Initiative +3 (13)

HP 442 (59d8 + 177)

Speed 30 ft.

MOD
SAVE
STR
11
+0
+0
INT
28
+9
+16
MOD
SAVE
DEX
16
+3
+3
WIS
14
+2
+9
MOD
SAVE
CON
16
+3
+10
CHA
16
+3
+3

Skills Arcana +16, Perception +9

Resistances Cold

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned

Senses truesight 120 ft.; Passive Perception 19

Languages All

CR 24 (XP 62,000; PB +7)

Traits

Mote of Unmaking. A creature Selerath damages sheds Dim Light in a 5-foot radius until the end of Selerath's next turn and can't benefit from the Invisible condition while it does.

Legendary Resistance (3/Day). If Selerath fails a saving throw, it can choose to succeed instead.

Spirit Jar. If destroyed, Selerath reforms in 1d10 days if it has a spirit jar, reviving with all its Hit Points. The new body appears in an unoccupied space within Selerath's lair.

Actions

Multiattack. Selerath makes three attacks, using Throne Splinter, Eldritch Burst, or Rime Touch in any combination. It can replace one attack with a use of Vitality Leech.

Throne Splinter. Melee or Ranged Attack Roll: +16, reach 5 ft. or range 120 ft. 58 (11d8 + 9) Necrotic damage.

Eldritch Burst. Melee Attack Roll: +16, reach 5 ft. 58 (11d8 + 9) Force damage, and the target has the Prone condition until the start of Selerath's next turn.

Rime Touch. Melee Attack Roll: +16, reach 5 ft. 58 (11d8 + 9) Cold damage, and the target has the Prone condition until the start of Selerath's next turn.

Spellcasting. Selerath casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 24):

- At Will: Detect Magic, Light
- 1/Day Each: Blight (level 8 version), Wall of Fire (level 9 version)

Vitality Leech. Constitution Saving Throw: DC 24, one creature within 30 feet. Failure: 58 (13d8) Necrotic damage, and Selerath regains Hit Points equal to half the damage dealt. Success: Half damage only.

Reactions

Protective Magic (3/Day). Trigger: Selerath is hit by an attack roll. Response: Selerath casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, Selerath can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Deathly Teleport. Selerath teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) Necrotic damage.

Disrupt Life. Constitution Saving Throw: DC 24, each creature that isn't an Undead in a 20-foot Emanation originating from Selerath. Failure: 31 (9d6) Necrotic damage. Success: Half damage. Failure or Success: Selerath can't take this action again until the start of its next turn.

Frightening Gaze. Selerath casts Fear, using the same spellcasting ability as Spellcasting. Selerath can't take this action again until the start of its next turn.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] caster (artillery) type=Undead mechanics=none — defender-leader: a Undead commands no troops | caster: ✓ ("archlich") | caster: no line key in the words — the model's read of its quote
[concept] signature elements: a throne of fossilized starlight [object] | necrotic solar flares [behavior] | the cold light of a dead sun [aura]
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 28, WIS 14, CHA 16 — the Lich's, INT fitted to +16
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "Selerath tears a gout of half-fused stellar marrow from its own throne and hurls it at a point in the air it can see, where it bursts into a slow-spreading cloud of burning white-gold dust. Every living thing caught in the bloom feels its warmth and its own life pulled outward as the dust drinks at them, and the cloud stays, a patch of clinging false starlight, until Selerath raises its hand to sn" [action/always/damage] — menu: gaze-single, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] value check: "Vitality Leech" EV 45 vs floor 29.6 (one attack of 3) — added Success: Half; dice 35 → 58
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The throne is not furniture but a captive star, and Selerath draws on it constantly: whenever it harms a living creature, a thread of the victim's stolen warmth runs back to the throne and leaves a faint floating mote of corpse-light orbiting Selerath. Those motes are the unmaking itself waiting to happen — and when Selerath finally rises from the throne, every mote it has gathered detonates outwa" [trait/always/damage] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature template (trait): marking-light -> Traits/"Mote of Unmaking" ("whenever it harms a living creature, a thread of the victim's stolen warmth runs [shape fit, no verb match]")
[reskin] chassis nova: "Osseous Pulse (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] print canon size: Huge -> Medium — the Lich's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Claw" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Osseous Pulse (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
```
