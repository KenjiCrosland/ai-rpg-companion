# Blocks — the three rulings, and the lend fix

Twelve sheets, generated once each as they would ship, at the commit that fixes the
`asInline` crash on a caster class standing on a people's own printed body.

```
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs v-rulings
```

Batch `scripts/smoke-batches/v-rulings.json`; run `v-rulings-2026-11-15T17-26-06`.
**Every sheet this round generated is here**, marked as it is. None threw.

| # | prompt | read for | verdict |
|---|---|---|---|
| 1 | a silver-tongued toad the size of a pony | Monstrosity with an alignment; CHA 18 | **GREEN** |
| 2 | a talking raven that sells secrets | Monstrosity with an alignment | **GREEN** |
| 3 | a wise old bear who guards the mountain  | type and alignment agree with the mind, whichever way  | **NO EVIDENCE** |
| 4 | a giant river pike | stays Beast, Unaligned | **GREEN** |
| 5 | a knot of eels in a man's coat | bestial stays as it was | **FLAGGED** |
| 6 | a drowned scholar who still corrects you | INT 15 | **GREEN** |
| 7 | mummy librarian | INT, whichever path it takes | **GREEN** |
| 8 | kobold sorcerer | class NPC on a kobold body | **GREEN** |
| 9 | satyr bard | class NPC on a satyr body | **GREEN** |
| 10 | kobold warrior | still the exact printed block | **GREEN** |
| 11 | goblin wizard | class_npc on the Goblin Warrior; Spellcasting names th | **GREEN** |
| 12 | hobgoblin priest | class_npc on the Hobgoblin Warrior; Spellcasting names | **GREEN** |

Nine green, one flagged, one no evidence, one green by a different route (see #3's note).

---

## 1. a silver-tongued toad the size of a pony — **GREEN**

*Read for:* Monstrosity with an alignment; CHA 18

```
## 01. Fen Flatterer — CR 2
**Input:** `a silver-tongued toad the size of a pony`
```

**Path, donor and the mind tiers**
```
[path] homebrew — "a silver-tongued toad the size of a pony" (call)
[reskin] mind tier: INT 8 -> 15 — the call read this creature as capable at CR 2
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 2
[reskin] mind tier: CHA 8 -> 18 — the call read this creature as formidable at CR 2
[reskin] donor: skirmisher-3-skulker -> CR 2
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] sapient is no Beast: Beast -> Monstrosity — the call reads this creature as sapient, and print's Beasts are Unaligned and speechless (owner's ruling, 2026-11-15)
```

**The sheet**
```
Fen Flatterer

Medium Monstrosity, Neutral

AC 15
Initiative +3 (13)

HP 44 (8d8 + 8)

Speed 50 ft., Swim 40 ft.

MOD
SAVE
STR
12
+1
+1
INT
15
+2
+2
MOD
SAVE
DEX
16
+3
+5
WIS
15
+2
+2
MOD
SAVE
CON
13
+1
+1
CHA
18
+4
+4

Skills Perception +4, Stealth +7

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 2 (XP 450; PB +2)

Traits

Amphibious Skulk. The flatterer ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The flatterer makes two Tongue attacks. It can replace one attack with a use of Honeyed Croak.

Tongue. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage.

Honeyed Croak. Wisdom Saving Throw: DC 12, one creature within 30 feet that can see or hear the flatterer. Failure: The target has the Charmed condition until the end of the flatterer's next turn, and while Charmed this way, it must move toward the flatterer by the safest available route on its turn.

Bonus Actions

Nimble Escape. The flatterer takes the Disengage or Hide action.

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

---

## 2. a talking raven that sells secrets — **GREEN**

*Read for:* Monstrosity with an alignment

```
## 02. Whisper Broker — CR 1
**Input:** `a talking raven that sells secrets`
```

**Path, donor and the mind tiers**
```
[path] homebrew — "a talking raven that sells secrets" (call)
[reskin] mind tier: INT 8 -> 15 — the call read this creature as capable at CR 1
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 1
[reskin] mind tier: CHA 8 -> 18 — the call read this creature as formidable at CR 1
[reskin] donor: skirmisher-3-winged -> CR 1 (invented — no printed peer)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] sapient is no Beast: Beast -> Monstrosity — the call reads this creature as sapient, and print's Beasts are Unaligned and speechless (owner's ruling, 2026-11-15)
```

**The sheet**
```
Whisper Broker

Tiny Monstrosity, Neutral

AC 15
Initiative +2 (12)

HP 28 (8d4 + 8)

Speed 30 ft., Fly 60 ft.

MOD
SAVE
STR
14
+2
+2
INT
15
+2
+2
MOD
SAVE
DEX
14
+2
+4
WIS
15
+2
+2
MOD
SAVE
CON
12
+1
+1
CHA
18
+4
+4

Skills Perception +4, Stealth +4

Senses darkvision 60 ft.; Passive Perception 14

Languages Common, Auran

CR 1 (XP 200; PB +2)

Traits

Mimicry. When the broker speaks in a mimicked voice to pass itself off as another speaker, a creature that hears the voice can tell it is an imitation only by taking the Search action and succeeding on a DC 11 Wisdom (Insight) check; on a failure it believes the voice is genuine.

Wing Slip. The broker doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.

Actions

Multiattack. The broker makes two Talons attacks. It can replace one attack with a use of Stolen Whisper.

Talons. Melee Attack Roll: +4, reach 5 ft. 5 (1d6 + 2) Slashing damage. If the broker flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) Slashing damage and, if it is Medium or smaller, has the Prone condition.

Swoop (Recharge 5-6). The broker flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Dexterity Saving Throw: DC 11. Failure: 6 (1d12) Slashing damage, and the target has the Prone condition.

Stolen Whisper. Wisdom Saving Throw: DC 11, one creature within 60 feet. Failure: The target has the Frightened condition until the end of its next turn. If the target was already Frightened by this ability, it also takes 3 (1d6) Psychic damage.

Bonus Actions

Aerial Agility. The broker takes the Dash or Disengage action.

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

---

## 3. a wise old bear who guards the mountain pass — **NO EVIDENCE**

> **NO EVIDENCE.** `[path] refused` — part of the routing answer was declined and the sheet was built as plain homebrew, so it tests ruling 2 neither way.

*Read for:* type and alignment agree with the mind, whichever way it reads

```
## 03. Old Pass Warden — CR 5
**Input:** `a wise old bear who guards the mountain pass`
```

**Path, donor and the mind tiers**
```
[path] refused: print_body "Bear" is not in the corpus
[path] homebrew — "a wise old bear who guards the mountain pass" (call)
[reskin] mind tier: INT 11 -> 15 — the call read this creature as capable at CR 5
[reskin] mind tier: WIS 13 -> 18 — the call read this creature as formidable at CR 5
[reskin] mind tier: CHA 14 -> 10 — the call read this creature as ordinary at CR 5
[reskin] donor: defender-5 -> CR 5
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] sapient is no Beast: Beast -> Monstrosity — the call reads this creature as sapient, and print's Beasts are Unaligned and speechless (owner's ruling, 2026-11-15)
```

**The sheet**
```
Old Pass Warden

Large Monstrosity, Neutral

AC 19
Initiative +1 (11)

HP 75 (10d10 + 20)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+6
INT
15
+2
+2
MOD
SAVE
DEX
12
+1
+1
WIS
18
+4
+4
MOD
SAVE
CON
14
+2
+5
CHA
10
+0
+0

Skills Athletics +6, Perception +7

Senses darkvision 60 ft.; Passive Perception 17

Languages Common

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The pass warden makes two attacks, using Bite or Shoulder in any combination. It can replace one attack with a use of Disarming Twist.

Bite. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Piercing damage.

Shoulder. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage.

Disarming Twist. Strength Saving Throw: DC 13, one creature within 5 feet that is holding a weapon or another object. Failure: 14 (4d6) Piercing damage, and the target drops the held object, which lands in its space. Success: Half damage only.

Reactions

The Road Remembers. Trigger: A creature makes a Dexterity (Stealth) check to hide from or sneak past the warden while the warden is conscious. Response: The warden contests that check with its Perception; if the warden wins, the creature gains no benefit from being unseen until the end of its next turn.

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

---

## 4. a giant river pike — **GREEN**

*Read for:* stays Beast, Unaligned

```
## 04. Drowned Bend Lurker — CR 3
**Input:** `a giant river pike`
```

**Path, donor and the mind tiers**
```
[path] homebrew — "a giant river pike" (call)
[reskin] mind tier held: INT stays 11 against "feeble" — the call read this creature as bestial
[reskin] mind tier held: CHA stays 12 against "ordinary" — the card's 12 is already ordinary
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 3
[reskin] donor: lurker-2 -> CR 3
[reskin] class kit: none — the homebrew path takes no class kit
```

**The sheet**
```
Drowned Bend Lurker

Large Beast, Unaligned

AC 14
Initiative +3 (13)

HP 45 (6d10 + 12)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
11
+0
+0
MOD
SAVE
DEX
16
+3
+5
WIS
15
+2
+2
MOD
SAVE
CON
14
+2
+2
CHA
12
+1
+1

Skills Perception +4, Stealth +7

Senses darkvision 60 ft.; Passive Perception 14

Languages None

CR 3 (XP 700; PB +2)

Actions

Multiattack. The lurker makes two Bite attacks. It can replace one attack with a use of Reedmaw Ambush.

Bite. Melee Attack Roll: +5 (with Advantage during the first round of each combat), reach 5 ft. 12 (2d8 + 3) Piercing damage.

Reedmaw Ambush. Strength Saving Throw: DC 12, one creature within 5 feet. Failure: 13 (3d8) Piercing damage, and the target is pulled up to 10 feet straight toward the lurker, and the target has the Grappled condition (escape DC 13).

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the lurker takes the Hide action.

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

---

## 5. a knot of eels in a man's coat — **FLAGGED**

> **FLAGGED.** a bestial swarm with INT 2 shipped Chaotic Neutral. The owner has been asked whether an unthinking creature should always be Unaligned. **Untouched until he rules.**

*Read for:* bestial stays as it was

```
## 05. Swarm of Eels — CR 1
**Input:** `a knot of eels in a man's coat`
```

**Path, donor and the mind tiers**
```
[path] homebrew — "a knot of eels in a man's coat" (call)
[reskin] mind tier held: INT stays 2 against "feeble" — the call read this creature as bestial
[reskin] mind tier: WIS 8 -> 15 — the call read this creature as capable at CR 1
[reskin] mind tier: CHA 1 -> 10 — the call read this creature as ordinary at CR 1
[reskin] donor: swarm-1 -> CR 1
[reskin] class kit: none — the homebrew path takes no class kit
```

**The sheet**
```
Swarm of Eels

Medium Swarm of Tiny Monstrosities, Chaotic Neutral

AC 12
Initiative +2 (12)

HP 27 (5d8 + 5)

Speed 20 ft.

MOD
SAVE
STR
6
-2
-2
INT
2
-4
-4
MOD
SAVE
DEX
14
+2
+2
WIS
15
+2
+2
MOD
SAVE
CON
12
+1
+1
CHA
10
+0
+0

Resistances Bludgeoning, Piercing, Slashing

Immunities Charmed, Frightened, Grappled, Paralyzed, Petrified, Prone, Restrained, Stunned

Senses darkvision 60 ft.; Passive Perception 12

Languages None

CR 1 (XP 200; PB +2)

Traits

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Eelbite. Melee Attack Roll: +4, reach 5 ft. 9 (2d6 + 2) Piercing damage, or 5 (1d6 + 2) Piercing damage if the swarm is Bloodied.

Coat-Burst (Recharge 5-6). Dexterity Saving Throw: DC 11, each creature within 5 feet. Failure: 9 (2d8) Slashing damage, and the target has the Prone condition. Success: Half damage only.

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

---

## 6. a drowned scholar who still corrects your grammar — **GREEN**

*Read for:* INT 15

```
## 06. Drowned Pedant — CR 4
**Input:** `a drowned scholar who still corrects your grammar`
```

**Path, donor and the mind tiers**
```
[path] homebrew — "a drowned scholar who still corrects your grammar" (call)
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier: INT 10 -> 15 — the call read this creature as capable at CR 4
[reskin] mind tier: CHA 11 -> 18 — the call read this creature as formidable at CR 4
[reskin] donor: lurker-1-phantom -> CR 4
[reskin] class kit: none — the homebrew path takes no class kit
```

**The sheet**
```
Drowned Pedant

Medium Undead, Neutral

AC 13
Initiative +4 (14)

HP 52 (8d8 + 16)

Speed 5 ft., Fly 50 ft. (hover)

MOD
SAVE
STR
1
-5
-5
INT
15
+2
+2
MOD
SAVE
DEX
18
+4
+6
WIS
10
+0
+0
MOD
SAVE
CON
14
+2
+2
CHA
18
+4
+4

Skills Stealth +6

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 10

Languages telepathy 60 ft. plus the languages it knew in life

CR 4 (XP 1,100; PB +2)

Traits

Incorporeal Movement. The pedant can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the pedant has Disadvantage on ability checks and attack rolls.

Actions

Ruler. Melee Attack Roll: +6, reach 5 ft. 17 (3d8 + 4) Slashing damage plus 11 (2d10) Necrotic damage.

Scathing Correction. Dexterity Saving Throw: DC 14, one creature within 60 feet. Failure: 24 (7d6) Necrotic damage. Success: Half damage only.

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

---

## 7. mummy librarian — **GREEN**

*Read for:* INT, whichever path it takes

```
## 07. Stacks Archivists — CR 3
**Input:** `mummy librarian`
```

**Path, donor and the mind tiers**
```
[path] homebrew — "mummy librarian" (call)
[reskin] mind tier: INT 6 -> 15 — the call read this creature as capable at CR 3
[reskin] mind tier: WIS 12 -> 18 — the call read this creature as formidable at CR 3
[reskin] mind tier: CHA 5 -> 10 — the call read this creature as ordinary at CR 3
[reskin] donor: defender-3-warden -> CR 3 (invented — no printed peer)
[reskin] class kit: none — the homebrew path takes no class kit
```

**The sheet**
```
Stacks Archivists

Medium Undead, Neutral

AC 15
Initiative -1 (9)

HP 66 (12d8 + 12)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
15
+2
+2
MOD
SAVE
DEX
8
-1
-1
WIS
18
+4
+4
MOD
SAVE
CON
13
+1
+3
CHA
10
+0
+0

Skills Perception +6

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 16

Languages Common plus the languages it knew in life

CR 3 (XP 700; PB +2)

Traits

Regeneration. The archivists regains 5 Hit Points at the start of each of its turns if it has at least 1 Hit Point. If the archivists takes Radiant damage, this trait doesn't function at the start of the archivists's next turn.

Actions

Multiattack. The archivists makes two Wrapped Fist attacks.

Wrapped Fist. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 4 (1d8) Necrotic damage.

Grave-Ward Veil (2/Day). The archivists targets itself or one creature it can see within 60 feet. The target gains 10 (3d6) Temporary Hit Points, and its AC increases by 2 until the end of the archivists's next turn.

Linen Bindings (Recharge 5-6). Dexterity Saving Throw: DC 12, one Large or smaller creature the archivists can see within 60 feet. Failure: The target is caught in bandages and has the Restrained condition until the bandages is destroyed (AC 10; HP 10; Vulnerability to Fire damage; Immunity to Poison and Psychic damage).

Reactions

Interpose. Trigger: A creature within 5 feet of the archivists that it guards is hit by an attack roll. Response: The attack hits the archivists instead, and the archivists has Resistance to the attack's damage.

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

---

## 8. kobold sorcerer — **GREEN**

*Read for:* class NPC on a kobold body

```
## 08. Spark Warren Kin — CR 2
**Input:** `kobold sorcerer`
```

**Path, donor and the mind tiers**
```
[path] class_npc — class mage — "sorcerer" (call)
[reskin] donor: caster-6 -> CR 2
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "sorcerer": nothing to add — the sheet already answers it
```

**The sheet**
```
Spark Warren Kin

Small Humanoid, Neutral

AC 14
Initiative +2 (12)

HP 38 (11d6)

Speed 30 ft.

MOD
SAVE
STR
9
-1
-1
INT
17
+3
+5
MOD
SAVE
DEX
14
+2
+2
WIS
12
+1
+3
MOD
SAVE
CON
11
+0
+0
CHA
11
+0
+0

Skills Arcana +5, Perception +3

Senses Passive Perception 13

Languages Common and any three languages, Draconic

CR 2 (XP 450; PB +2)

Traits

Tunnel Sense. While underground or in a cramped space, the warren kin has Advantage on Dexterity (Stealth) checks, and it always knows the direction of the nearest exit from any enclosed area.

Actions

Multiattack. The warren kin makes two Arcane Burst attacks.

Spellcasting. The warren kin casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 13):

- At Will: Mage Hand, Minor Illusion
- 1/Day Each: Mirror Image

Arcane Burst. Melee or Ranged Attack Roll: +5, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Bonus Actions

Misty Step (3/Day). The warren kin casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Trigger: The warren kin is hit by an attack roll. Response: The warren kin casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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

---

## 9. satyr bard — **GREEN**

*Read for:* class NPC on a satyr body

```
## 09. Revel-Stalker — CR 3
**Input:** `satyr bard`
```

**Path, donor and the mind tiers**
```
[path] class_npc — class bard — species satyr — "bard" (call)
[reskin] donor: skirmisher-3 -> CR 3
[reskin] class kit: rally — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: bard — "bard": Captain's Charm (Pirate Captain/Captain's Charm)
```

**The sheet**
```
Revel-Stalker

Medium Fey, Neutral

AC 15
Initiative +3 (13)

HP 52 (8d8 + 16)

Speed 30 ft.

MOD
SAVE
STR
15
+2
+4
INT
14
+2
+2
MOD
SAVE
DEX
16
+3
+5
WIS
11
+0
+2
MOD
SAVE
CON
14
+2
+2
CHA
14
+2
+2

Skills Athletics +4, Deception +4

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Thieves' cant, Sylvan

CR 3 (XP 700; PB +2)

Traits

Thorn-Song. When the revel-stalker hits a creature with Hand Crossbow, the target is Deafened and Frightened of the revel-stalker until the end of its next turn.

Magic Resistance. The revel-stalker has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The revel-stalker makes two attacks, using Rapier or Hand Crossbow in any combination.

Rapier. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Piercing damage.

Hand Crossbow. Ranged Attack Roll: +5, range 30/120 ft. 8 (1d10 + 3) Piercing damage.

Bonus Actions

Captain's Charm. Wisdom Saving Throw: DC 13, one creature the revel-stalker can see within 30 feet. Failure: The target has the Charmed condition until the start of the revel-stalker's next turn.

Reactions

Parry. Trigger: The revel-stalker is hit by a melee attack roll while holding a weapon. Response: The revel-stalker adds 2 to its AC against that attack, possibly causing it to miss.

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

---

## 10. kobold warrior — **GREEN**

*Read for:* still the exact printed block

```
## 10. Kobold Warrior — CR 1
**Input:** `kobold warrior`
```

**Path, donor and the mind tiers**
```
[path] exact — Kobold Warrior (is) — "Kobold Warrior" (code)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] class kit: none — the exact path takes no class kit
```

**The sheet**
```
Kobold Warrior

Small Dragon, Neutral

AC 15
Initiative +2 (12)

HP 30 (12d6 - 12)

Speed 30 ft.

MOD
SAVE
STR
7
-2
-2
INT
8
-1
-1
MOD
SAVE
DEX
15
+2
+4
WIS
7
-2
-2
MOD
SAVE
CON
9
-1
-1
CHA
8
-1
-1

Skills Perception +0, Stealth +4

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Draconic

CR 1 (XP 200; PB +2)

Traits

Pack Tactics. The kobold warrior has Advantage on an attack roll against a creature if at least one of the kobold warrior's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Sunlight Sensitivity. While in sunlight, the kobold warrior has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The kobold warrior makes two Dagger attacks.

Dagger. Melee or Ranged Attack Roll: +4, reach 5 ft. or range 20/60 ft. 7 (2d4 + 2) Piercing damage.

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

---

## 11. goblin wizard — **GREEN**

*Read for:* class_npc on the Goblin Warrior; Spellcasting names the creature, not the mage

```
## 11. Hex Warren Castoff — CR 3
**Input:** `goblin wizard`
```

**Path, donor and the mind tiers**
```
[path] class_npc — class mage — "wizard" (call)
[reskin] donor: caster-6 -> CR 3
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "wizard": nothing to add — the sheet already answers it
```

**The sheet**
```
Hex Warren Castoff

Small Humanoid, Neutral

AC 14
Initiative +2 (12)

HP 52 (15d6)

Speed 30 ft.

MOD
SAVE
STR
9
-1
-1
INT
17
+3
+5
MOD
SAVE
DEX
14
+2
+2
WIS
12
+1
+3
MOD
SAVE
CON
11
+0
+0
CHA
11
+0
+0

Skills Arcana +5, Perception +3

Senses Passive Perception 13

Languages Common and any three languages, Goblin

CR 3 (XP 700; PB +2)

Actions

Multiattack. The warren castoff makes two Arcane Burst attacks. It can replace one attack with a use of Bloodsmear Bolt.

Arcane Burst. Melee or Ranged Attack Roll: +5, reach 5 ft. or range 20/60 ft. 12 (2d8 + 3) Force damage.

Spellcasting. The warren castoff casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 13):

- At Will: Mage Hand, Minor Illusion
- 1/Day Each: Misty Step, Blindness/Deafness

Bloodsmear Bolt. Constitution Saving Throw: DC 12, one creature within 120 feet. Failure: 13 (3d8) Poison damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.

Bonus Actions

Misty Step (3/Day). The warren castoff casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Trigger: The warren castoff is hit by an attack roll. Response: The warren castoff casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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

---

## 12. hobgoblin priest — **GREEN**

*Read for:* class_npc on the Hobgoblin Warrior; Spellcasting names the creature, not the priest

```
## 12. Iron-Vow Warpriest — CR 4
**Input:** `hobgoblin priest`
```

**Path, donor and the mind tiers**
```
[path] class_npc — Hobgoblin Warrior (is) — class cleric — "priest" (call)
[reskin] donor: defender-3 -> CR 4
[reskin] class kit: Spellcasting lent by the Priest — this sheet stands on the Hobgoblin Warrior, a body that carries no spellcasting, and a cleric without it is not a cleric
[reskin] class kit: cleric — "priest": Divine Aid (3/Day) (Priest/Divine Aid)
```

**The sheet**
```
Iron-Vow Warpriest

Medium Humanoid, Lawful Evil

AC 19
Initiative +1 (11)

HP 66 (12d8 + 12)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
10
+0
+0
MOD
SAVE
DEX
12
+1
+1
WIS
16
+3
+5
MOD
SAVE
CON
12
+1
+3
CHA
9
-1
-1

Skills Athletics +6, Perception +5

Senses Passive Perception 15

Languages Common, Goblin

CR 4 (XP 1,100; PB +2)

Traits

Pack Tactics. The warpriest has Advantage on an attack roll against a creature if at least one of the warpriest's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The warpriest makes two attacks, using Mace or Longbow in any combination.

Mace. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Bludgeoning damage.

Longbow. Ranged Attack Roll: +6, range 150/600 ft. 14 (3d6 + 4) Piercing damage.

Spellcasting. The warpriest casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Bonus Actions

Divine Aid (3/Day). The warpriest casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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

