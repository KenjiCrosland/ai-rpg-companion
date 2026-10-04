# Review batch — verify-six-2026-10-04T09-40-00

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Bone Sun | 24 (2014) | 2014 | caster-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | soft (1) |
| Solgrave Sovereign | 24 | 2024 | caster-21 | ok | SOFT: aim-dpr, under | ok | ok | ok | ok | ok | soft (1) |
| Thunderlands Herder | 13 (2014) | 2014 | defender-8-leader | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Vasarek of the Pass | 19 | 2024 | skirmisher-18 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Valdris Nocturne | 15 (2014) | 2014 | skirmisher-13 | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Thunderhead Vastion | 20 | 2024 | skirmisher-18-hurler | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |

**Fails by seat and gate:**
- none



---

## Thunderlands Herder — lowest CR

**Concept:** a storm-herder who commands a stampede of thunder-elk

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Thunderlands Herder | 13 (2014) | defender-8-leader | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 10.5 (print at 13 reads 5.5–13.5, n=6)
- read: def 9 / off 12 → 10.5; sustained 78 (3 × Staff); nova none; dmg 78

```
Thunderlands Herder
Medium humanoid, neutral
Armor Class

18 (plate)

Hit Points: 

187 (22d8 + 88)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

14 (+2)

	

18 (+4)

	

12 (+1)

	

13 (+1)

	

18 (+4)

Skills: 

Athletics +8, Persuasion +9

Saving Throws: 

CON +9, CHA +9

Senses: 

darkvision 60 ft., passive Perception 11

Languages: 

Common

Challenge

13 (10,000 XP)

Proficiency Bonus:

+5

Aura of Authority. While in a 10-foot-radius sphere originating from the thunderlands herder, the thunderlands herder and its allies have advantage on attack rolls and saving throws, provided the thunderlands herder isn't incapacitated.
Bolstering Cry (2/Day). As a bonus action, the thunderlands herder grants each ally within 30 feet of it 13 (3d8) temporary hit points.

Actions
Multiattack: The thunderlands herder makes three attacks: one with its Staff and one with its Thunderbolt Javelin, or two with its Staff and one with its Thunderbolt Javelin, or one with its Staff and two with its Thunderbolt Javelin, or three with its Staff, or three with its Thunderbolt Javelin.
Staff: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 10 (3d6) thunder damage.
Thunderbolt Javelin: Melee or Ranged Weapon Attack: +8 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 25 (5d8 + 3) thunder damage.
```

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("commands a stampede of thunder-elk") | defender-leader: key "commands" (class verb)
[concept] signature elements: commanding a stampede of thunder-elk [behavior] | thunder charge that drives the herd [aura] | hide-and-bone herder with a parry staff [body]
[reskin] signature idea (action): "The herder plants his staff and bellows the herd-call down a straight line of the battlefield, and the lead thunder-elk answers by charging that lane — a rolling stampede that plows through every enemy caught in the path, shoving them off their feet and dragging them along in the crush. Any enemy knocked down by the charge is left flat and easy for the rest of the herd, and one peeled-off elk then" [action/always/movement] — menu: throw-retrieve, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: shell-withdraw, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — herd (command, stampede)
[reskin] value check: "Stampede Call (2/Day)" EV 10.1 vs floor 65.9 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Stampede Call (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.2 vs floor 4.2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The herd is more than beasts — they are the herder's extended will, so every thunder-elk that charges within his voice can carry its trampling momentum into the next, and any creature struck by that rolling charge is marked by the thunder that trails behind it. That mark lingers, drawing the herd's next pass and letting the herder read the field through his beasts' hooves." [trait/always/condition] — menu: adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: false-appearance, absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
```


---

## Solgrave Sovereign — highest CR

**Concept:** a sun-crowned archlich who binds the dead of a whole kingdom

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Solgrave Sovereign | 24 | caster-21 | ok | SOFT: aim-dpr, under | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 168 a round is 33% under the card's 250
- bands · soft · under: effective HP 442 sits under print at CR 24 (468–546, n=5); the read holds at 23, within print's own ±1
- read: def 22 / off 24 → 23; sustained 168 (3 × Hurled Scythe + legendary Deathly Teleport); nova none; dmg 168

```
Solgrave Sovereign

Medium Undead, Lawful Evil

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

Senses darkvision 120 ft., truesight 30 ft.; Passive Perception 19

Languages All

CR 24 (XP 62,000; PB +7)

Traits

Grave Dust. A creature that touches the solgrave sovereign or hits it with a melee attack while within 5 feet of it takes 14 (4d6) Necrotic damage.

Legendary Resistance (3/Day). If the solgrave sovereign fails a saving throw, it can choose to succeed instead.

Spirit Jar. If destroyed, the solgrave sovereign reforms in 1d10 days if it has a spirit jar, reviving with all its Hit Points. The new body appears in an unoccupied space within the solgrave sovereign's lair.

Actions

Multiattack. The solgrave sovereign makes three attacks, using Hurled Scythe, Eldritch Burst, or Paralyzing Touch in any combination. It can replace one attack with a use of (A) Binding Edict or (B) Spellcasting to cast Bestow Curse.

Hurled Scythe. Melee or Ranged Attack Roll: +16, reach 5 ft. or range 120 ft. 45 (8d8 + 9) Necrotic damage.

Eldritch Burst. Melee Attack Roll: +16, reach 5 ft. 27 (4d8 + 9) Force damage.

Paralyzing Touch. Melee Attack Roll: +16, reach 5 ft. 27 (4d8 + 9) Cold damage, and the target has the Paralyzed condition until the start of the solgrave sovereign's next turn.

Spellcasting. The solgrave sovereign casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 24):

- At Will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
- 2/Day Each: Animate Dead, Dimension Door, Plane Shift
- 1/Day Each: Chain Lightning, Finger of Death, Power Word Kill, Scrying

Binding Edict. Dexterity Saving Throw: DC 24, one creature within 60 feet. Failure: The target has the Restrained condition until the end of the solgrave sovereign's next turn.

Reactions

Protective Magic (3/Day). Trigger: The solgrave sovereign is hit by an attack roll. Response: The solgrave sovereign casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the solgrave sovereign can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Deathly Teleport. The solgrave sovereign teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) Necrotic damage.

Disrupt Life. Constitution Saving Throw: DC 24, each creature that isn't an Undead in a 20-foot Emanation originating from the solgrave sovereign. Failure: 31 (9d6) Necrotic damage. Success: Half damage. Failure or Success: the solgrave sovereign can't take this action again until the start of its next turn.

Frightening Gaze. The solgrave sovereign casts Fear, using the same spellcasting ability as Spellcasting. The solgrave sovereign can't take this action again until the start of its next turn.

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
[route] caster-binder (controller) type=Undead mechanics=none — caster-binder: ✓ ("binds the dead of a whole kingdom") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: binding the dead of a kingdom [behavior] | sun-crowned staff [object] | skeletal army [behavior]
[reskin] print canon route: the Lich's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 28, WIS 14, CHA 16 — the Lich's, INT fitted to +16
[reskin] print canon: "a sun-crowned archlich who binds the dead of a whole kingdom" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "The Sovereign seizes the shadow of every doomed creature that has already failed against it and pulls, turning those shadows into a marching cortege. Each of those creatures rises as a silent shade bound to its will for a time, and while at least one such shade remains, the Sovereign can spend its legendary actions through them instead of itself." [action/always/resource] — menu: gaze-single, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — snare-bolt, bolt-restrain (bind, binds)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into snare-bolt, bolt-restrain
[reskin] value check: "Binding Edict" EV 31.4 vs floor 29.6 (one attack of 3) — worth the trade
[reskin] signature template: snare-bolt -> Actions/"Binding Edict" ("the idea's own verb is 'bind' — the sovereign binds the dead of a kingdom; snare [verb: bind:concept]")
[reskin] signature idea (trait): "When the Sovereign's undead bindings are broken or its servants are destroyed near it, they leave behind grave-dust that clings to its enemies and deepens the Sovereign's hold on them. Creatures standing in that dust find their wounds slow to close and their minds increasingly open to the Sovereign's commands." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form)
[reskin] signature template (trait): heated-body -> Traits/"Grave Dust" ("The idea is that grave-dust clings to enemies, and those standing in that dust a [shape fit, no verb match]")
[reskin] chassis nova: "Crown Nova (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Scepter" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "a sun-crowned archlich who binds the dead of a whole kingdom" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Crown Nova (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---

## Bone Sun — a 2014 sheet

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Bone Sun | 24 (2014) | caster-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 165 a round is 35% under the table's 255
- bands · soft · band: reads CR 22 (print at 24 reads 20.5–24.5, n=5)
- read: def 22 / off 22 → 22; sustained 165 (3 × Death Ray + legendary Deathly Teleport); nova none; dmg 165

```
Bone Sun
Medium undead, neutral
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

darkvision 120 ft., passive Perception 19

Languages: 

All

Challenge

24 (62,000 XP)

Proficiency Bonus:

+7

Legendary Resistance (3/Day). If the bone sun fails a saving throw, it can choose to succeed instead.
Spirit Jar. If destroyed, the bone sun reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the bone sun's lair.
Protective Magic (3/Day) (Reaction). When the bone sun is hit by an attack roll, the bone sun casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: The bone sun makes three attacks, using Death Ray, Eldritch Burst, or Paralyzing Touch. It can replace one attack with a use of Spellcasting to cast mind spike.
Death Ray: Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 44 (9d8 + 4) necrotic damage.
Eldritch Burst: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 26 (5d8 + 4) force damage.
Paralyzing Touch: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 26 (5d8 + 4) cold damage, and the target is paralyzed until the start of the bone sun's next turn.
Spellcasting: The bone sun casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 19):

At will: detect magic, detect thoughts, dispel magic, fireball, invisibility, lightning bolt, mage hand, prestidigitation
2/day each: animate dead, dimension door, plane shift
1/day each: chain lightning, finger of death, power word kill, scrying
Legendary Actions

The bone sun can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The bone sun regains spent legendary actions at the start of its turn.

Deathly Teleport: The bone sun teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an undead within 20 feet of the bone sun must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one. Whether it fails or succeeds, the bone sun can't take this action again until the start of its next turn.
Frightening Gaze: The bone sun casts fear, using the same spellcasting ability as Spellcasting. The bone sun can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] caster (artillery) type=Undead mechanics=aura — caster: ✓ ("archlich") | caster: no line key in the words — the model's read of its quote
[concept] signature elements: a sun of bone that orbits and shelters [body] | casting from a bone-throne at a distance [behavior] | phylactery-bound refusal to die [aura]
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 18, WIS 14, CHA 16 — the Lich's, INT fitted to +11
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "The bone sun opens wide, revealing that its core is not solid but a cage of ribs around a ravenous singularity of borrowed spellcraft. It inhales every magical effect clinging to its enemies, tearing spells from their bodies; those stripped of their magic are left vacant and numb, their minds unable to form new thoughts for a time." [action/always/condition] — menu: gaze-single, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature miss: action — "The bone sun opens wide, revealing that its core is not solid but a cage of ribs around a ravenous singularity of borrowed spellcraft. It inhales every magical effect clinging to its enemies, tearing spells from their bodies; those stripped of their magic are left vacant and numb, their minds unable to form new thoughts for a time." [action/always/condition] — the model found no template that holds it (offered: gaze-single, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal)
[reskin] value check: "Disarming Twist" EV 0 vs floor 30.2 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The bone sun is a living orrery, and the bones of its throne orbit it in endless revolution. Each time a foe is gravely wounded or felled, its skeleton is drawn into that orbit, thickening the bulwark and hastening the spin until the sun's rays grow denser and crueler." [trait/always/defense] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The bone sun is a living orrery, and the bones of its throne orbit it in endless revolution. Each time a foe is gravely wounded or felled, its skeleton is drawn into that orbit, thickening the bulwark and hastening the spin until the sun's rays grow denser and crueler." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, bloodied-burst)
[reskin] chassis nova: "Solar Flare (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] print canon size: Large -> Medium — the Lich's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Bone Shard" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Solar Flare (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---

## Vasarek of the Pass — a 2024 sheet

**Concept:** a vampire lord who rules a mountain court and commands the bats and wolves of the pass

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Vasarek of the Pass | 19 | skirmisher-18 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 23, 4 over; the HP axis pulls the read to 19.5
- read: def 16 / off 23 → 19.5; sustained 162 (3 × Grave Strike + legendary Deathless Strike); nova Howling Gale 72; dmg 162

```
Vasarek of the Pass

Medium Undead, Neutral Evil

AC 19
Initiative +7 (17)

HP 306 (36d8 + 144)

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
24
+7
+13
WIS
15
+2
+8
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

Skills Perception +8, Stealth +13

Resistances Necrotic

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 120 ft.; Passive Perception 18

Languages Common plus two other languages

CR 19 (XP 22,000; PB +6)

Traits

Creeping Gloam. Constitution Saving Throw: DC 21, any creature that starts its turn in a 20-foot Emanation originating from Vasarek. Failure: The target has the Blinded condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Legendary Resistance (3/Day). If Vasarek fails a saving throw, it can choose to succeed instead.

Shadow Slip. When a creature Vasarek can see ends its turn within 5 feet of it, Vasarek can move up to 15 feet without provoking Opportunity Attacks.

Misty Escape. If Vasarek drops to 0 Hit Points outside its resting place, Vasarek uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 Hit Points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and has the Paralyzed condition until it regains any Hit Points, and it regains 1 Hit Point after spending 1 hour there.

Spider Climb. Vasarek can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Vampire Weakness. Vasarek has these weaknesses:


- Forbiddance: Vasarek can't enter a residence without an invitation from an occupant.
- Running Water: Vasarek takes 20 Acid damage if it ends its turn in running water.
- Stake to the Heart: If a weapon that deals Piercing damage is driven into Vasarek's heart while Vasarek has the Incapacitated condition in its resting place, Vasarek has the Paralyzed condition until the weapon is removed.
- Sunlight: Vasarek takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.

Actions

Multiattack. Vasarek makes three Grave Strike attacks. It can replace one attack with a use of Bite (Bat or Vampire Form Only).

Grave Strike. Melee Attack Roll: +13, reach 5 ft. 20 (3d8 + 7) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 18) from one of two hands.

Howling Gale (Recharge 5-6). Strength Saving Throw: DC 21, each creature in a 60-foot-long, 10-foot-wide Line. Failure: 72 (16d8) Necrotic damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage only.

Bite (Bat or Vampire Form Only). Constitution Saving Throw: DC 21, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. Failure: 35 (10d6) Piercing damage plus 13 (3d8) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and Vasarek regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Vampire Spawn under Vasarek's control. Success: Half damage only.

Bonus Actions

Shape-Shift. If Vasarek isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, Vasarek can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, Vasarek can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.

Charm (Recharge 5-6). Vasarek casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 18), and the duration is 24 hours. The Charmed target is a willing recipient of Vasarek's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by Vasarek.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, Vasarek can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Deathless Strike. Vasarek moves up to half its Speed, and it makes one Grave Strike attack.

Beguile. Vasarek casts Command, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 21). Vasarek can't take this action again until the start of its next turn.

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
[route] caster-binder (controller) type=Undead mechanics=none — defender-leader: a Undead commands no troops | skirmisher-shifter: a shifter is named by its words (shape-shifts, turns into, a were-) — none here | caster-binder: ✓ ("a vampire lord") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: commands the bats and wolves of the pass [behavior] | curse-laden gaze that steals an enemy's actions [behavior] | a body of living shadow and mountain mist [body]
[reskin] print canon route: the Vampire's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Vampire is not a caster first — it casts no spells — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 18, DEX 24, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's, DEX fitted to +13
[reskin] print canon: "a vampire lord who rules a mountain court and commands the bats and wolves of the pass" heads on the Vampire — print's rows ride along; the seat stays
[reskin] signature idea (action): "Vasarek's voice drops to a growl that the mountain's beasts already know, and the pass answers. Every bat and wolf sworn to his court that can perceive him converges on a target he chooses, tearing at it from the dark until they break off and scatter back into shadow. He can call the whole court down on one intruder, but the beasts will not answer again until they have had time to regather." [action/once_per_fight/damage] — menu: gaze-single, snare, reel, condition-payoff, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature miss: action — "Vasarek's voice drops to a growl that the mountain's beasts already know, and the pass answers. Every bat and wolf sworn to his court that can perceive him converges on a target he chooses, tearing at it from the dark until they break off and scatter back into shadow. He can call the whole court down on one intruder, but the beasts will not answer again until they have had time to regather." [action/once_per_fight/damage] — the model found no template that holds it (offered: gaze-single, snare, reel, condition-payoff, lure, snare-bolt, sensory-strike, disarm, exploiter, blink, aggro-curse)
[reskin] value check: "Horrid Display (2/Day)" EV 37.4 vs floor 86.2 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Vasarek's body is a knot of shadow and mountain mist, so being in his presence means the dark itself is always reaching for you. Though he is not in front of you, he is always at the edge of your sight, a sliver of cold that eats at flesh and focus the moment it lands, and it clings there for a breath after." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature template (trait): noxious-aura -> Traits/"Creeping Gloam" ("the dark itself is always reaching for you, always at the edge of your sight, a  [verb: presence:idea]")
[reskin] chassis nova: "Howling Gale (Recharge 5-6)" — the skirmisher-18's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon languages: "Common, Sylvan" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 60 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Claw" -> "Grave Strike" — the Vampire's own row
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Misty Escape — "a vampire lord who rules a mountain court and commands the bats and wolves of the pass" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire lord who rules a mountain court and commands the bats and wolves of the pass" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire lord who rules a mountain court and commands the bats and wolves of the pass" is the Vampire (print's own row)
[reskin] print canon legendary: Deathless Strike, Beguile — the Vampire's own kit stands where the chassis's stood
[reskin] print canon: chassis row leaves — Traits/"Mist Step" is the seat's, not the Vampire's
[reskin] print canon row priced: Bite (Bat or Vampire Form Only) — dice 6 → 35
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
```


---

## Valdris Nocturne — a print donor

**Concept:** a vampire lord who commands bats and wolves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Valdris Nocturne | 15 (2014) | skirmisher-13 | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 11.5 (print at 15 reads 6.25–14.5, n=12)
- read: def 10 / off 13 → 11.5; sustained 57 (3 × Grave Strike); nova Sanguine Lash 71; dmg 85

```
Valdris Nocturne
Medium undead, neutral evil
Armor Class

18 (natural armor)

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

Perception +7, Stealth +8

Saving Throws: 

DEX +8, WIS +7

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

Batstep. When a creature Valdris can see ends its turn within 5 feet of it, Valdris can move up to 10 feet without provoking opportunity attacks.
Legendary Resistance (3/Day). If Valdris fails a saving throw, it can choose to succeed instead.
Misty Escape. If Valdris drops to 0 hit points outside its resting place, Valdris uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 hit points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and is paralyzed until it regains any hit points, and it regains 1 hit point after spending 1 hour there.
Spider Climb. Valdris can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Vampire Weakness. Valdris has these weaknesses: Forbiddance: Valdris can't enter a residence without an invitation from an occupant.
Running Water: Valdris takes 20 acid damage if it ends its turn in running water.
Stake to the Heart: If a weapon that deals piercing damage is driven into Valdris's heart while Valdris is incapacitated in its resting place, Valdris is paralyzed until the weapon is removed.
Sunlight: Valdris takes 20 radiant damage if it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks.
Shape-Shift. As a bonus action, if Valdris isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, Valdris can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, Valdris can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has resistance to all damage, except the damage it takes from sunlight.
Charm (Recharge 5-6). As a bonus action, Valdris casts charm person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The charmed target is a willing recipient of Valdris's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was charmed by Valdris.

Actions
Multiattack: Valdris makes three Grave Strike attacks. It can replace one attack with a use of Bite (Bat or Vampire Form Only).
Grave Strike: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) by one of two hands.
Sanguine Lash (Recharge 5-6): Each creature in a 60-foot-long, 5-foot-wide line must make a DC 17 Strength saving throw, taking 71 (13d10) necrotic damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also frightened until the end of its next turn.
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that is grappled, incapacitated, or restrained must make a DC 17 Constitution saving throw, taking 24 (7d6) piercing damage plus 13 (3d8) necrotic damage on a failed save, or half as much damage on a successful one. The target's hit point maximum decreases by an amount equal to the necrotic damage taken, and Valdris regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a Vampire Spawn under Valdris's control.
```

**Engine trace**

```
[route] caster-binder (controller) type=Undead mechanics=none — defender-leader: a Undead commands no troops | skirmisher-shifter: a shifter is named by its words (shape-shifts, turns into, a were-) — none here | caster-binder: ✓ ("a vampire lord") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: commands bats and wolves as extensions of his will [behavior] | curses that steal actions and cripple the living [behavior] | blood-fed immortality [body]
[reskin] print canon route: the Vampire's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Vampire is not a caster first — it casts no spells — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 18, DEX 16, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's, DEX fitted to +8
[reskin] print canon: "a vampire lord who commands bats and wolves" heads on the Vampire — print's rows ride along; the seat stays
[reskin] signature idea (action): "Valdris weaves a command into the air, calling forth a whirling throng of bats and a pack of shadow-wolves that claw out of the night. The swarm splits between his foes: the bats pour over one victim to blind and confuse it, while the wolves drag another to the ground and pin it there. The beasts remain as long as he keeps his attention on them, but they scatter if he is badly wounded or if his co" [action/save/condition] — menu: snare, reel, condition-payoff, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: gaze-single, delayed-brand, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation, snatch, charge)
[reskin] signature miss: action — "Valdris weaves a command into the air, calling forth a whirling throng of bats and a pack of shadow-wolves that claw out of the night. The swarm splits between his foes: the bats pour over one victim to blind and confuse it, while the wolves drag another to the ground and pin it there. The beasts remain as long as he keeps his attention on them, but they scatter if he is badly wounded or if his co" [action/save/condition] — the model found no template that holds it (offered: snare, reel, condition-payoff, lure, snare-bolt, sensory-strike, disarm, exploiter, hook-rider, pounce, blink, feint-slip)
[reskin] value check: "Sundering Shove" EV 3.3 vs floor 12.5 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sundering Shove" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "When Valdris feeds on a living creature, the stolen blood sustains him: he regains vitality, and for a short time his wounds knit and his necrotic power surges. This stolen life also makes his command over beasts harder to resist, as they sense his renewed mastery. But the hunger never fades—if he goes too long without feeding, his control weakens." [trait/always/resource] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "When Valdris feeds on a living creature, the stolen blood sustains him: he regains vitality, and for a short time his wounds knit and his necrotic power surges. This stolen life also makes his command over beasts harder to resist, as they sense his renewed mastery. But the hunger never fades—if he goes too long without feeding, his control weakens." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst, warded-mending)
[reskin] chassis nova: "Sanguine Lash (Recharge 5-6)" — the skirmisher-13's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Vampire has no such mode and the words name none
[reskin] print canon languages: "Common, Sylvan, telepathy 120 ft." -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 50 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon attack: "Bite" -> "Grave Strike" — the Vampire's own row
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon: chassis row leaves — Traits/"Mist Form" is the seat's, not the Vampire's
[reskin] print canon row priced: Bite (Bat or Vampire Form Only) — dice 6 → 24
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
```


---

## Thunderhead Vastion — a homebrew with a nova

**Concept:** a storm titan who walks the thunderhead and hurls lightning at the drowned

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Thunderhead Vastion | 20 | skirmisher-18-hurler | ok | SOFT: hot-offense | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 25, 5 over; the HP axis pulls the read to 21
- read: def 17 / off 25 → 21; sustained 210 (3 × Stomp + legendary Storm Dash); nova Lightning Fall 76; dmg 210

```
Thunderhead Vastion

Huge Giant, Neutral Evil

AC 20
Initiative +8 (18)

HP 325 (26d12 + 156)

Speed 70 ft., Fly 60 ft. (hover)

MOD
SAVE
STR
20
+5
+5
INT
14
+2
+2
MOD
SAVE
DEX
26
+8
+14
WIS
18
+4
+10
MOD
SAVE
CON
22
+6
+6
CHA
16
+3
+3

Skills Perception +10, Stealth +14

Vulnerabilities Thunder

Resistances Lightning

Senses darkvision 120 ft., tremorsense 60 ft.; Passive Perception 20

Languages Common

CR 20 (XP 25,000; PB +6)

Traits

Legendary Resistance (3/Day). If the storm titan fails a saving throw, it can choose to succeed instead.

Storm Stride. The storm titan ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Thunder Wake. When a creature the storm titan can see ends its turn within 5 feet of it, the storm titan can move up to 15 feet without provoking Opportunity Attacks.

Actions

Multiattack. The storm titan makes three attacks, using Stomp or Thunderbolt in any combination.

Stomp. Melee Attack Roll: +14, reach 10 ft. 21 (3d8 + 8) Bludgeoning damage plus 14 (4d6) Lightning damage.

Thunderbolt. Ranged Attack Roll: +14, range 60/180 ft. 30 (5d8 + 8) Lightning damage. Hit or Miss: Immediately after the attack, a thunderbolt returns to the storm titan's grasp.

Lightning Fall (Recharge 5-6). The storm titan hurls a thunderbolt at a point it can see within 300 feet. Dexterity Saving Throw: DC 22, each creature in a 15-foot-radius Sphere centered on that point. Failure: 76 (17d8) Lightning damage. Success: Half damage.

Bonus Actions

Fleet Agility. The storm titan takes the Dash or Disengage action.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the storm titan can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Storm Dash. The storm titan moves up to half its Speed without provoking Opportunity Attacks, and it makes one Stomp attack.

Sky Splitter. The storm titan makes one Thunderbolt attack. The storm titan can't take this action again until the start of its next turn.

Withdraw. The storm titan takes the Dash or Disengage action.

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
[route] skirmisher-hurler type=Giant mechanics=thrown-weapon — skirmisher-hurler: ✓ ("hurls lightning at the drowned") | skirmisher-hurler: key "hurls" (class verb)
[concept] signature elements: hurling lightning at the drowned [behavior] | walking the thunderhead [body] | the storm-wreathed titan body [body]
[reskin] signature idea (action): "The storm titan charges its thunderbolt with the storm's heart and hurls it at the ground, where it detonates in a rolling thunderclap. Every creature caught in the blast is slammed by the shockwave and hurled away, and the thunderclap leaves a crackling storm-line seared across the ground, a lingering field of lightning that punishes any who cross it." [action/always/damage] — menu: snare, throw-retrieve, lure, snare-bolt, sensory-strike, disarm (+ shelf: delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, charge-push, hook-rider, pounce, isolation, snatch, bolt-mark)
[reskin] signature miss: action — "The storm titan charges its thunderbolt with the storm's heart and hurls it at the ground, where it detonates in a rolling thunderclap. Every creature caught in the blast is slammed by the shockwave and hurled away, and the thunderclap leaves a crackling storm-line seared across the ground, a lingering field of lightning that punishes any who cross it." [action/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: snare, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, charge-push, hook-rider, pounce, isolation, snatch, bolt-mark)
[reskin] value check: "Horrid Display (2/Day)" EV 38.5 vs floor 88.7 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The storm titan walks the thunderhead: the air around it churns with static, and any creature that strikes it in melee is jolted by a backlash of lightning that leaps from the titan's body." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (lightning, storm)
[reskin] chassis nova: "Lightning Fall (Recharge 5-6)" — the skirmisher-18-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
```
