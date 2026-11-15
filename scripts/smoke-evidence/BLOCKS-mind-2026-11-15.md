# Item 4 — the ship side of the evidence run (18 sheets)

Generated on the new code as it would ship. **The paired withheld half is NOT run** — see the report.

```
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs v-mind-a
```


## 01. Clockwork Spider — CR 2

**Input:** `clockwork spider`
**Donor:** brute-5-juggernaut -> CR 2
**Signature:** library · **elapsed** 23s

### Block
```
Clockwork Spider

Medium Construct, Unaligned

AC 13
Initiative -1 (9)

HP 52 (7d8 + 21)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
16
+3
+5
INT
6
-2
-2
MOD
SAVE
DEX
8
-1
-1
WIS
13
+1
+1
MOD
SAVE
CON
16
+3
+5
CHA
4
-3
-3

Skills Athletics +5, Perception +3

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Understands the languages of its creator but can't speak

CR 2 (XP 450; PB +2)

Traits

Spider Climb. The spider can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Immutable Form. The spider can't shape-shift.

Magic Resistance. The spider has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The spider makes two Mandibles attacks.

Mandibles. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage.

Wire Snare (Recharge 5-6). Dexterity Saving Throw: DC 13, one Large or smaller creature the spider can see within 30 feet. Failure: The target is caught in wire and has the Restrained condition until the wire is destroyed (AC 10; HP 5; Vulnerability to Lightning damage; Immunity to Poison and Psychic damage).

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


**Path, donor and the mind tiers**
```
[path] homebrew — "clockwork spider" (call)
[reskin] mind tier held: INT stays 6 against "ordinary" — the call read this creature as mindless
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] mind tier: WIS 10 -> 13 — the call read this creature as capable at CR 2
[reskin] donor: brute-5-juggernaut -> CR 2
```

---

## 02. Medusa Sculptor — CR 6

**Input:** `medusa sculptor`
**Donor:** brute-5 -> CR 6
**Signature:** library · **elapsed** 32s

### Block
```
Medusa Sculptor

Medium Monstrosity, Lawful Evil

AC 15
Initiative +3 (13)

HP 127 (17d8 + 51)

Speed 30 ft.

MOD
SAVE
STR
10
+0
+0
INT
12
+1
+1
MOD
SAVE
DEX
17
+3
+3
WIS
13
+1
+4
MOD
SAVE
CON
16
+3
+3
CHA
15
+2
+2

Skills Deception +5, Perception +4, Stealth +6

Senses darkvision 60 ft.; Passive Perception 14

Languages Common plus one other language

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The medusa sculptor makes two Claw attacks and one Snake Hair attack, or it makes three Poison Ray attacks. It can replace one attack with a use of Pinioning Glance.

Claw. Melee Attack Roll: +6, reach 5 ft. 10 (2d6 + 3) Slashing damage.

Snake Hair. Melee Attack Roll: +6, reach 5 ft. 5 (1d4 + 3) Piercing damage plus 14 (4d6) Poison damage.

Poison Ray. Ranged Attack Roll: +5, range 150 ft. 11 (2d8 + 2) Poison damage.

Pinioning Glance. Strength Saving Throw: DC 13, one creature within 60 feet. Failure: The target has the Restrained condition until the end of its next turn.

Bonus Actions

Petrifying Gaze (Recharge 5-6). Constitution Saving Throw: DC 13, each creature in a 30-foot Cone. If the medusa sculptor sees its reflection in the Cone, the medusa sculptor must make this save. First Failure The target has the Restrained condition and repeats the save at the end of its next turn if it is still Restrained, ending the effect on itself on a success. Second Failure The target has the Petrified condition instead of the Restrained condition.

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


**Path, donor and the mind tiers**
```
[path] twist — Medusa (is) — "medusa" (call)
[reskin] donor: brute-5 -> CR 6
```

---

## 03. Saltwake Mutineer — CR 8

**Input:** `vampire pirate`
**Donor:** brute-5 -> CR 8
**Signature:** library · **elapsed** 30s

### Block
```
Saltwake Mutineer

Medium Undead, Lawful Evil

AC 15
Initiative +4 (14)

HP 153 (18d8 + 72)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
20
+5
+8
INT
17
+3
+3
MOD
SAVE
DEX
18
+4
+4
WIS
15
+2
+2
MOD
SAVE
CON
18
+4
+7
CHA
18
+4
+4

Skills Athletics +8, Perception +5

Resistances Necrotic

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Common plus two other languages

CR 8 (XP 3,900; PB +3)

Traits

False Lights. Constitution Saving Throw: DC 15, any creature that starts its turn in a 10-foot Emanation originating from the mutineer. Failure: The target has the Blinded condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Misty Escape. If the mutineer drops to 0 Hit Points outside its resting place, the mutineer uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 Hit Points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and has the Paralyzed condition until it regains any Hit Points, and it regains 1 Hit Point after spending 1 hour there.

Spider Climb. The mutineer can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Vampire Weakness. The mutineer has these weaknesses:


- Forbiddance: the mutineer can't enter a residence without an invitation from an occupant.
- Running Water: the mutineer takes 20 Acid damage if it ends its turn in running water.
- Stake to the Heart: If a weapon that deals Piercing damage is driven into the mutineer's heart while the mutineer has the Incapacitated condition in its resting place, the mutineer has the Paralyzed condition until the weapon is removed.
- Sunlight: the mutineer takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.

Actions

Multiattack. The mutineer makes two Grave Strike attacks. It can replace one attack with a use of Dead-Light Lure.

Grave Strike. Melee Attack Roll: +8, reach 5 ft. 15 (3d6 + 5) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16) from one of two hands.

Dead-Light Lure. Wisdom Saving Throw: DC 15, one creature within 60 feet that can see or hear the dead-light glass. Failure: The target has the Charmed condition until the end of its next turn, and while Charmed this way, it must move toward the mutineer by the safest available route on its turn and can't take Reactions.

Bite (Bat or Vampire Form Only). Constitution Saving Throw: DC 15, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. Failure: 27 (6d8) Piercing damage plus 13 (3d8) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the mutineer regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Vampire Spawn under the mutineer's control. Success: Half damage only.

Bonus Actions

Shape-Shift. If the mutineer isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the mutineer can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the mutineer can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.

Charm (Recharge 5-6). The mutineer casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 15), and the duration is 24 hours. The Charmed target is a willing recipient of the mutineer's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by the mutineer.

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


**Path, donor and the mind tiers**
```
[path] twist — Vampire (is) — "vampire" (call)
[reskin] donor: brute-5 -> CR 8
```

---

## 04. Mournbrood Nurse — CR 9

**Input:** `hag midwife`
**Donor:** brute-9 -> CR 9
**Signature:** library · **elapsed** 27s

### Block
```
Mournbrood Nurse

Medium Fiend, Neutral

AC 15
Initiative +0 (10)

HP 165 (30d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+8
INT
13
+1
+1
MOD
SAVE
DEX
10
+0
+0
WIS
16
+3
+3
MOD
SAVE
CON
12
+1
+5
CHA
13
+1
+1

Skills Athletics +8, Perception +7

Resistances Cold

Immunities Poison; Poisoned

Senses darkvision 60 ft.; Passive Perception 17

Languages Common plus one other language

CR 9 (XP 5,000; PB +4)

Traits

Nursing Caul. While a creature is Restrained by the nurse, the nurse has Advantage on attack rolls against that creature, and regains 16 (3d10) Hit Points at the start of each of her turns for as long as she holds it.

Actions

Multiattack. The nurse makes two attacks, using Mace or Radiant Flame in any combination.

Mace. Melee Attack Roll: +8, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.

Radiant Flame. Ranged Attack Roll: +8, range 60 ft. 26 (5d8 + 4) Radiant damage.

Spellcasting. The nurse casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 15):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Bonus Actions

Divine Aid (3/Day). The nurse casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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


**Path, donor and the mind tiers**
```
[path] class_npc — class cleric — "midwife" (call)
[reskin] donor: brute-9 -> CR 9
```

---

## 05. Ledger Warden — CR 3

**Input:** `mummy librarian`
**Donor:** caster-8-binder -> CR 3
**Signature:** library · **elapsed** 23s

### Block
```
Ledger Warden

Medium Undead, Neutral

AC 14
Initiative +2 (12)

HP 55 (10d8 + 10)

Speed 30 ft.

MOD
SAVE
STR
14
+2
+2
INT
14
+2
+2
MOD
SAVE
DEX
15
+2
+2
WIS
16
+3
+5
MOD
SAVE
CON
13
+1
+1
CHA
16
+3
+5

Skills Perception +5, Deception +5

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Common plus the languages it knew in life

CR 3 (XP 700; PB +2)

Actions

Multiattack. The warden makes two attacks, using Wrapping Strip or Dusty Whisper in any combination. It can replace one attack with a use of Overdue Curse.

Wrapping Strip. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage plus 5 (1d10) Necrotic damage.

Dusty Whisper. Ranged Attack Roll: +5, range 60 ft. 10 (2d6 + 3) Necrotic damage.

Overdue Curse. Wisdom Saving Throw: DC 12, one creature within 60 feet. Failure: 11 (2d10) Necrotic damage, and the target has the Frightened condition until the end of its next turn.

Spellcasting. The warden casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 13):

- At Will: Detect Magic, Mage Hand
- 1/Day Each: Bestow Curse, Slow

Grave-Wrap Lash (Recharge 5-6). Dexterity Saving Throw: DC 12, one Large or smaller creature the warden can see within 60 feet. Failure: The target is caught in grave-wrap and has the Restrained condition until the grave-wrap is destroyed (AC 10; HP 10; Vulnerability to Slashing damage; Immunity to Poison and Psychic damage).

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


**Path, donor and the mind tiers**
```
[path] homebrew — "mummy librarian" (call)
[reskin] mind tier held: INT stays 14 against "capable" — the card's 14 is already capable
[reskin] mind tier held: CHA stays 16 against "ordinary" — CHA is the attacking score
[reskin] mind tier: WIS 15 -> 16 — the call read this creature as formidable at CR 3
[reskin] donor: caster-8-binder -> CR 3
```

---

## 06. Plaguepit Gravedigger — CR 5

**Input:** `ghoul gravedigger`
**Donor:** lurker-5 -> CR 5
**Signature:** library · **elapsed** 30s

### Block
```
Plaguepit Gravedigger

Medium Undead, Neutral Evil

AC 15
Initiative +3 (13)

HP 78 (12d8 + 24)

Speed 30 ft., Burrow 30 ft.

MOD
SAVE
STR
12
+1
+1
INT
12
+1
+1
MOD
SAVE
DEX
16
+3
+6
WIS
13
+1
+1
MOD
SAVE
CON
14
+2
+2
CHA
10
+0
+0

Skills Perception +4, Stealth +9

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages Common plus the languages it knew in life

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The gravedigger makes two attacks.

Strike. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Slashing damage plus 7 (2d6) Necrotic damage.

Mire of the Wake. Strength Saving Throw: DC 13, each creature in a 15-foot Emanation originating from the gravedigger. Failure: The target has the Prone condition.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the gravedigger takes the Hide action.

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


**Path, donor and the mind tiers**
```
[path] homebrew — "ghoul gravedigger" (call)
[reskin] mind tier held: INT stays 12 against "capable" — the card's 12 is already capable
[reskin] mind tier held: WIS stays 13 against "capable" — the card's 13 is already capable
[reskin] mind tier held: CHA stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] donor: lurker-5 -> CR 5
```

---

## 07. Chapel Knell — CR 3

**Input:** `a chapel bell-ringer's ghost that tolls for the dying`
**Donor:** lurker-2 -> CR 3
**Signature:** library · **elapsed** 30s

### Block
```
Chapel Knell

Medium Undead, Neutral

AC 11
Initiative +1 (11)

HP 45 (10d8)

Speed 5 ft., Fly 40 ft.

MOD
SAVE
STR
7
-2
-2
INT
10
+0
+0
MOD
SAVE
DEX
13
+1
+1
WIS
12
+1
+1
MOD
SAVE
CON
10
+0
+0
CHA
17
+3
+3

Skills Perception +3, Stealth +5

Resistances Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus one other language

CR 3 (XP 700; PB +2)

Traits

Fear Aura. The knell emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 13, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the end of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Ethereal Sight. The knell can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The knell can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The knell makes two Withering Touch attacks. It can replace one attack with a use of Death Knell.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Death Knell. Constitution Saving Throw: DC 13, one creature within 60 feet. Failure: 13 (3d8) Necrotic damage.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the knell and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the knell's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the knell can see within 5 feet. Failure: The target is possessed by the knell; the knell disappears, and the target has the Incapacitated condition and loses control of its body. The knell now controls the body, but the target retains awareness. The knell can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The knell's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the knell leaves as a Bonus Action. When the possession ends, the knell appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The knell casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The knell is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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


**Path, donor and the mind tiers**
```
[path] twist — Ghost (is) — "ghost" (call)
[reskin] donor: lurker-2 -> CR 3
```

---

## 08. Bellows Ogre — CR 3

**Input:** `ogre blacksmith`
**Donor:** brute-2 -> CR 3
**Signature:** library · **elapsed** 27s

### Block
```
Bellows Ogre

Large Giant, Chaotic Evil

AC 11
Initiative -1 (9)

HP 68 (8d10 + 24)

Speed 40 ft.

MOD
SAVE
STR
19
+4
+4
INT
5
-3
-3
MOD
SAVE
DEX
8
-1
-1
WIS
7
-2
-2
MOD
SAVE
CON
16
+3
+3
CHA
7
-2
-2

Skills Athletics +6, Perception +0

Immunities Fire

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Giant

CR 3 (XP 700; PB +2)

Actions

Greatclub. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage.

Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 11 (2d6 + 4) Piercing damage.

Forgebrand Hold. Strength Saving Throw: DC 14, one creature within 5 feet. Failure: 24 (7d6) Fire damage, and the target has the Grappled condition (escape DC 14).

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


**Path, donor and the mind tiers**
```
[path] twist — Ogre (is) — class fighter — "ogre" (call)
[reskin] donor: brute-2 -> CR 3
```

---

## 09. Barker of the Long Midway — CR 6

**Input:** `a carnival barker who talks you into standing still`
**Donor:** defender-5 -> CR 6
**Signature:** library · **elapsed** 27s

### Block
```
Barker of the Long Midway

Medium Humanoid, Neutral

AC 17
Initiative +4 (14)

HP 84 (13d8 + 26)

Speed 30 ft.

MOD
SAVE
STR
10
+0
+3
INT
10
+0
+0
MOD
SAVE
DEX
18
+4
+7
WIS
14
+2
+5
MOD
SAVE
CON
14
+2
+2
CHA
17
+3
+6

Skills Acrobatics +7, Perception +5

Senses Passive Perception 15

Languages Common plus one other language

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Barker makes three attacks, using Rapier or Hand Crossbow in any combination.

Rapier. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Piercing damage, and Barker has Advantage on the next attack roll it makes before the end of this turn.

Hand Crossbow. Ranged Attack Roll: +7, range 30/120 ft. 15 (2d10 + 4) Piercing damage.

Bonus Actions

Captain's Charm. Wisdom Saving Throw: DC 14, one creature Barker can see within 30 feet. Failure: The target has the Charmed condition until the start of Barker's next turn.

Reactions

Riposte. Trigger: Barker is hit by a melee attack roll while holding a weapon. Response: Barker adds 3 to its AC against that attack, possibly causing it to miss. On a miss, Barker makes one Rapier attack against the triggering creature if within range.

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


**Path, donor and the mind tiers**
```
[path] class_npc — class bard — "carnival barker" (call)
[reskin] donor: defender-5 -> CR 6
```

---

## 10. Coin-Sworn Sellsword — CR 5

**Input:** `a sellsword who hurls a handaxe and closes with a shortsword`
**Donor:** skirmisher-8-hurler -> CR 5 (invented — no printed peer)
**Signature:** dropped · **elapsed** 28s

### Block
```
Coin-Sworn Sellsword

Medium Humanoid, Neutral

AC 16
Initiative +2 (12)

HP 112 (15d8 + 45)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
10
+0
+0
MOD
SAVE
DEX
15
+2
+5
WIS
12
+1
+4
MOD
SAVE
CON
16
+3
+6
CHA
15
+2
+2

Skills Athletics +10, Performance +5

Senses Passive Perception 11

Languages Common

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The sellsword makes three Handaxe attacks. It can replace one attack with a use of Shortsword.

Handaxe. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 20/60 ft. 14 (3d6 + 4) Slashing damage, and the sellsword has Advantage on its next attack roll against the target before the end of its next turn.

Shortsword. Melee Attack Roll: +7, reach 5 ft. 7 (1d6 + 4) Piercing damage. Hit or Miss: Immediately after the attack, its handaxe returns to the sellsword's grasp, and the sellsword has Advantage on its next attack roll against the target before the end of its next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the sellsword can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Riposte. Trigger: A creature within 5 feet of the sellsword misses it with a melee attack roll. Response: The sellsword makes one Handaxe attack against that creature.

Parry. Trigger: The sellsword is hit by a melee attack roll while holding a weapon. Response: The sellsword adds 3 to its AC against that attack, possibly causing it to miss.

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


**Path, donor and the mind tiers**
```
[path] class_npc — class fighter — "sellsword" (call)
[reskin] donor: skirmisher-8-hurler -> CR 5 (invented — no printed peer)
```

---

## 11. Drowned Coat — CR 1

**Input:** `a knot of eels in a man's coat`
**Donor:** skirmisher-1 -> CR 1
**Signature:** library · **elapsed** 31s

### Block
```
Drowned Coat

Medium Monstrosity, Unaligned

AC 15
Initiative +2 (12)

HP 27 (5d8 + 5)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
10
+0
+0
INT
8
-1
-1
MOD
SAVE
DEX
14
+2
+4
WIS
12
+1
+1
MOD
SAVE
CON
12
+1
+1
CHA
8
-1
-1

Skills Perception +3, Stealth +4

Immunities Lightning

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 1 (XP 200; PB +2)

Traits

The Knot Comes Loose. When the drowned coat is reduced to half its Hit Points or fewer, the sleeves and hem go slack and it loses the benefits of Eel-Writhe until the end of its next turn while the eels pour back into shape, and any creature Grappling it at that moment is flung Prone as the coat comes apart in its hands.

Eel-Writhe. The drowned coat ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The drowned coat makes two Fangs attacks. It can replace one attack with a use of Sleeve Flurry.

Fangs. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Piercing damage.

Sleeve Flurry. Dexterity Saving Throw: DC 11, each creature in a 5-foot Emanation originating from Coat. Failure: 7 (2d6) Slashing damage, and the target has the Prone condition.

Bonus Actions

Fleet Agility. The drowned coat takes the Dash or Disengage action.

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


**Path, donor and the mind tiers**
```
[path] homebrew — "a knot of eels in a man's coat" (call)
[reskin] mind tier held: INT stays 8 against "feeble" — the call read this creature as bestial
[reskin] mind tier held: WIS stays 12 against "capable" — the card's 12 is already capable
[reskin] mind tier held: CHA stays 8 against "ordinary" — the card's 8 is already ordinary
[reskin] donor: skirmisher-1 -> CR 1
```

---

## 12. Well Thing — CR 5

**Input:** `the thing in the well`
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 32s

### Block
```
Well Thing

Large Aberration, Neutral Evil

AC 14
Initiative -1 (9)

HP 102 (12d10 + 36)

Speed 30 ft., Swim 30 ft., Climb 30 ft.

MOD
SAVE
STR
16
+3
+6
INT
13
+1
+1
MOD
SAVE
DEX
8
-1
-1
WIS
16
+3
+3
MOD
SAVE
CON
16
+3
+3
CHA
4
-3
-3

Skills Athletics +6, Perception +6

Immunities Cold

Senses darkvision 120 ft.; Passive Perception 16

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Adhesive. The thing adheres to anything that touches it. A Huge or smaller creature adhered to the thing is also Grappled by it (escape DC 14). Ability checks made to escape this grapple have Disadvantage.

Actions

Multiattack. The thing makes two Wet Grip attacks.

Wet Grip. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Rend the Guard (Recharge 5-6). The thing strikes where the target cannot guard. Constitution Saving Throw: DC 14, one creature within 30 feet. Failure: 18 (4d8) Cold damage. If the target already has the Grappled condition, it also has the Deafened condition until the end of its next turn. Success: Half damage.

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


**Path, donor and the mind tiers**
```
[path] homebrew — "the thing in the well" (call)
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] mind tier: INT 4 -> 13 — the call read this creature as capable at CR 5
[reskin] mind tier: WIS 10 -> 16 — the call read this creature as formidable at CR 5
[reskin] donor: brute-5-grappler -> CR 5
```

---

## 13. Silver Tongue Toad — CR 2

**Input:** `a silver-tongued toad the size of a pony`
**Donor:** brute-5-grappler -> CR 2
**Signature:** library · **elapsed** 28s

### Block
```
Silver Tongue Toad

Medium Beast, Unaligned

AC 13
Initiative -1 (9)

HP 52 (7d8 + 21)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
16
+3
+5
INT
13
+1
+1
MOD
SAVE
DEX
8
-1
-1
WIS
10
+0
+0
MOD
SAVE
CON
16
+3
+3
CHA
16
+3
+3

Skills Athletics +5, Perception +2

Senses darkvision 30 ft.; Passive Perception 12

Languages Common

CR 2 (XP 450; PB +2)

Actions

Multiattack. The toad makes two Tongue attacks.

Tongue. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.

Spitting Lash (Recharge 5-6). The toad strikes where the target cannot guard. Dexterity Saving Throw: DC 13, one creature within 30 feet. Failure: 13 (3d8) Bludgeoning damage. Success: Half damage.

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


**Path, donor and the mind tiers**
```
[path] homebrew — "a silver-tongued toad the size of a pony" (call)
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier: INT 4 -> 13 — the call read this creature as capable at CR 2
[reskin] mind tier: CHA 4 -> 16 — the call read this creature as formidable at CR 2
[reskin] donor: brute-5-grappler -> CR 2
```

---

## 14. Drowned Pedant — CR 4

**Input:** `a drowned scholar who still corrects your grammar`
**Donor:** lurker-1-phantom -> CR 4
**Signature:** library · **elapsed** 31s

### Block
```
Drowned Pedant

Medium Undead, Neutral Evil

AC 13
Initiative +4 (14)

HP 52 (8d8 + 16)

Speed 5 ft., Fly 50 ft. (hover), Swim 30 ft.

MOD
SAVE
STR
1
-5
-5
INT
13
+1
+1
MOD
SAVE
DEX
18
+4
+6
WIS
16
+3
+3
MOD
SAVE
CON
14
+2
+2
CHA
13
+1
+1

Skills Stealth +6

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus the languages it knew in life

CR 4 (XP 1,100; PB +2)

Traits

Incorporeal Movement. The pedant can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the pedant has Disadvantage on ability checks and attack rolls.

Actions

Chalk-Dusted Claw. Melee Attack Roll: +6, reach 5 ft. 17 (3d8 + 4) Slashing damage plus 11 (2d10) Necrotic damage.

Unasked-For Correction. Dexterity Saving Throw: DC 13, one creature within 30 feet. Failure: 24 (7d6) Bludgeoning damage.

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


**Path, donor and the mind tiers**
```
[path] homebrew — "a drowned scholar who still corrects your grammar" (call)
[reskin] mind tier: INT 10 -> 13 — the call read this creature as capable at CR 4
[reskin] mind tier: WIS 10 -> 16 — the call read this creature as formidable at CR 4
[reskin] mind tier: CHA 11 -> 13 — the call read this creature as capable at CR 4
[reskin] donor: lurker-1-phantom -> CR 4
```

---

## 15. Mirebulk — CR 6

**Input:** `a brute of a swamp giant, slow-witted and easily led`
**Donor:** brute-5 -> CR 6
**Signature:** library · **elapsed** 22s

### Block
```
Mirebulk

Huge Giant, Neutral

AC 14
Initiative -1 (9)

HP 114 (12d12 + 36)

Speed 40 ft., Swim 40 ft.

MOD
SAVE
STR
18
+4
+7
INT
6
-2
-2
MOD
SAVE
DEX
8
-1
-1
WIS
10
+0
+0
MOD
SAVE
CON
16
+3
+6
CHA
6
-2
-2

Skills Athletics +7, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Slick Wake. The ground in a 10-foot Emanation originating from the mirebulk is Difficult Terrain.

Actions

Multiattack. The mirebulk makes two attacks, using Fist or Mudball in any combination. It can replace one attack with a use of Handler's Command.

Fist. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Bludgeoning damage.

Mudball. Ranged Attack Roll: +7, range 60/240 ft. 17 (3d8 + 4) Bludgeoning damage.

Handler's Command. Wisdom Saving Throw: DC 14, one creature within 60 feet that can see or hear the mirebulk. Failure: The target has the Charmed condition until the end of its next turn, and while Charmed this way, it must move toward the mirebulk by the safest available route on its turn and can't take Reactions.

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


**Path, donor and the mind tiers**
```
[path] homebrew — "a brute of a swamp giant, slow-witted and easily led" (call)
[reskin] mind tier held: INT stays 6 against "feeble" — the card's 6 is already feeble
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: CHA stays 6 against "feeble" — the card's 6 is already feeble
[reskin] donor: brute-5 -> CR 6
```

---

## 16. Marsh Oathbreaker — CR 6

**Input:** `a pale rider on the marsh road`
**Donor:** skirmisher-3-mounted -> CR 6 (invented — no printed peer)
**Signature:** library · **elapsed** 27s

### Block
```
Marsh Oathbreaker

Medium Undead, Neutral

AC 16
Initiative +4 (14)

HP 104 (16d8 + 32)

Speed 50 ft.

MOD
SAVE
STR
14
+2
+2
INT
8
-1
-1
MOD
SAVE
DEX
18
+4
+7
WIS
12
+1
+1
MOD
SAVE
CON
15
+2
+2
CHA
16
+3
+3

Skills Perception +4, Stealth +7

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages Common plus the languages it knew in life

CR 6 (XP 2,300; PB +3)

Traits

Marsh Stride. Difficult Terrain composed of marsh, standing water, and reed beds doesn't cost the oathbreaker extra movement, and the oathbreaker can move across marsh, standing water, and reed beds without needing to make an ability check.

Mist Stride. The oathbreaker ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The oathbreaker makes two Fen Lance attacks.

Fen Lance. Melee Attack Roll: +7, reach 10 ft. 9 (1d10 + 4) Piercing damage plus 6 (1d12) Necrotic damage. If the oathbreaker moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) Piercing damage and, if it is Medium or smaller, has the Prone condition.

Marsh Gallop (Recharge 5-6). The oathbreaker moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Dexterity Saving Throw: DC 14. Failure: 36 (8d8) Bludgeoning damage, and the target has the Prone condition.

Bonus Actions

Mounted Agility. The oathbreaker takes the Dash or Disengage action.

Sworn Quarry. Wisdom Saving Throw: DC 14, one creature within 30 feet. Failure: Until the start of the oathbreaker's next turn, the target has Disadvantage on attack rolls against creatures other than the oathbreaker.

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


**Path, donor and the mind tiers**
```
[path] homebrew — "a pale rider on the marsh road" (call)
[reskin] mind tier held: INT stays 8 against "ordinary" — the card's 8 is already ordinary
[reskin] mind tier held: WIS stays 12 against "capable" — the card's 12 is already capable
[reskin] mind tier: CHA 8 -> 16 — the call read this creature as formidable at CR 6
[reskin] donor: skirmisher-3-mounted -> CR 6 (invented — no printed peer)
```

---

## 17. Floe Shadow — CR 8

**Input:** `something large moving under the ice`
**Donor:** brute-5 -> CR 8
**Signature:** library · **elapsed** 28s

### Block
```
Floe Shadow

Large Beast, Unaligned

AC 15
Initiative -1 (9)

HP 152 (16d12 + 48)

Speed 40 ft., Burrow 30 ft., Swim 40 ft.

MOD
SAVE
STR
20
+5
+8
INT
6
-2
-2
MOD
SAVE
DEX
8
-1
-1
WIS
13
+1
+1
MOD
SAVE
CON
16
+3
+6
CHA
6
-2
-2

Skills Athletics +8, Perception +4

Immunities Cold

Senses tremorsense 60 ft.; Passive Perception 14

Languages None

CR 8 (XP 3,900; PB +3)

Traits

Earth Glide. While the shadow is burrowing through nonmagical, unworked earth and stone, the shadow doesn't disturb the material it moves through, can attempt to hide even while in plain sight of the creature it is hiding from, and has Advantage on its next attack roll against a creature that hasn't seen it move through the ground.

Actions

Multiattack. The shadow makes two Bone-Plated Skull attacks.

Bone-Plated Skull. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Bludgeoning damage plus 11 (2d10) Cold damage.

Ice Breach (Recharge 5-6). If the shadow is burrowing, it erupts from the ground at a point within 5 feet of one creature. Dexterity Saving Throw: DC 16, that creature. Failure: 14 (4d6) Cold damage, and the target has the Prone condition. The shadow then makes one Bone-Plated Skull attack against the target.

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


**Path, donor and the mind tiers**
```
[path] homebrew — "something large moving under the ice" (call)
[reskin] mind tier held: INT stays 6 against "feeble" — the call read this creature as mindless
[reskin] mind tier held: CHA stays 6 against "feeble" — the card's 6 is already feeble
[reskin] mind tier: WIS 10 -> 13 — the call read this creature as capable at CR 8
[reskin] donor: brute-5 -> CR 8
```

---

## 18. Peeled Tollman — CR 3

**Input:** `a toll collector with too many hands`
**Donor:** brute-5-grappler -> CR 3
**Signature:** library · **elapsed** 26s

### Block
```
Peeled Tollman

Medium Monstrosity, Neutral

AC 13
Initiative -1 (9)

HP 67 (9d8 + 27)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+5
INT
13
+1
+1
MOD
SAVE
DEX
8
-1
-1
WIS
10
+0
+0
MOD
SAVE
CON
16
+3
+3
CHA
4
-3
-3

Skills Athletics +5, Perception +2

Senses darkvision 60 ft.; Passive Perception 12

Languages Common

CR 3 (XP 700; PB +2)

Actions

Multiattack. The tollman makes two Palm-Strike attacks. It can replace one attack with a use of Ledger's Due.

Palm-Strike. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.

Ledger's Due. Wisdom Saving Throw: DC 13, each creature in a 60-foot Emanation originating from Tollman. Failure: The target has the Frightened condition until the end of its next turn.

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


**Path, donor and the mind tiers**
```
[path] homebrew — "a toll collector with too many hands" (call)
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] mind tier: INT 4 -> 13 — the call read this creature as capable at CR 3
[reskin] donor: brute-5-grappler -> CR 3
```

---
