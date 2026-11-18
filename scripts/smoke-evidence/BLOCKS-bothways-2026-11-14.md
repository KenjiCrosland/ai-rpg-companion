# Six sheets — the same prompt routed both ways

For Fable 5.2 and the owner, 2026-11-14. Three prompts had never been seen BOTH ways, because
which path they take is the model's and it flips between runs. Each path here is **PINNED**, so
the two readings sit side by side.

Batch: `scripts/smoke-batches/v-bothways.json`. Run: `v-bothways-2026-11-14T23-42-18`.

```
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs v-bothways
```

**All six are PINNED, not rolled.** The pin is a localStorage override
(`statblock-pin-path`) read in `StatblockGenerator.vue` beside the edition and legacy flags;
nothing in the product sets it, and every pinned run prints a warning line saying so. This was
the "small change" the handoff allowed, and it beat rolling: the three paths that had never
appeared would have needed luck to appear in four rolls each.

| # | prompt | pinned path | sheet |
|---|---|---|---|
| 01 | ogre blacksmith | twist on the Ogre | Forge Keeper Ogre |
| 02 | ogre blacksmith | homebrew | Grond Coalhammer |
| 03 | clockwork spider | twist on the Spider | Scrapgear Broodmother |
| 04 | clockwork spider | homebrew | Spring-Lock Steward |
| 05 | Mother Ash \| hag midwife | twist on the Green Hag | Mother Ash |
| 06 | Mother Ash \| hag midwife | class_npc on the Priest | Mother Ash |

Generated after step 1 (the person rule), so #05 is the path the ruling now produces for a hag
with a job word and #06 is what shipped on all four saved rolls before it.

No cold read from me — these are for the owner and Fable 5.2.

---


## 01. Forge Keeper Ogre — CR 3

**Input:** `ogre blacksmith`
**Donor:** skirmisher-3 -> CR 3
**Signature:** library · **elapsed** 25s

### Block
```
Forge Keeper Ogre

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

Skills Perception +0, Stealth +1

Immunities Fire

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Giant

CR 3 (XP 700; PB +2)

Actions

Greatclub. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage.

Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 11 (2d6 + 4) Piercing damage.

Bone-Shaking Slam (Recharge 5-6). Strength Saving Throw: DC 14, one creature within 5 feet. Failure: The target is pushed up to 15 feet away from the forge keeper ogre and has the Prone condition.

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


**[path]**
```
[path] twist — Ogre (is) — "pinned for evidence" (pinned)
```

---

## 02. Grond Coalhammer — CR 3

**Input:** `ogre blacksmith`
**Donor:** defender-3 -> CR 3
**Signature:** library · **elapsed** 26s

### Block
```
Grond Coalhammer

Large Giant, Neutral

AC 18
Initiative +0 (10)

HP 52 (7d10 + 14)

Speed 30 ft.

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
11
+0
+0
WIS
12
+1
+3
MOD
SAVE
CON
14
+2
+4
CHA
14
+2
+2

Skills Athletics +5, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 3 (XP 700; PB +2)

Traits

Forge Rhythm. When Grond reduces a creature to 0 Hit Points with its Hammer or Tongs, Grond regains 6 (1d12) Hit Points, and the next attack it makes before the end of its turn is made with Advantage.

Actions

Multiattack. Grond makes two attacks, using Hammer or Tongs in any combination. It can replace one attack with a use of Riveting Blow.

Hammer. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Tongs. Ranged Attack Roll: +5, range 30/120 ft. 10 (2d6 + 3) Bludgeoning damage.

Riveting Blow. Strength Saving Throw: DC 12, each creature in a 15-foot Cone. Failure: The target is pushed up to 15 feet away from Grond and has the Prone condition.

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


**[path]**
```
[path] homebrew — "pinned for evidence" (pinned)
```

---

## 03. Scrapgear Broodmother — CR 2

**Input:** `clockwork spider`
**Donor:** brute-2 -> CR 2
**Signature:** library · **elapsed** 22s

### Block
```
Scrapgear Broodmother

Small Beast, Unaligned

AC 12
Initiative +2 (12)

HP 50 (20d6 - 20)

Speed 20 ft., Climb 20 ft.

MOD
SAVE
STR
16
+3
+5
INT
1
-5
-5
MOD
SAVE
DEX
14
+2
+2
WIS
10
+0
+0
MOD
SAVE
CON
8
-1
-1
CHA
2
-4
-4

Skills Athletics +5, Perception +2

Immunities Lightning

Senses darkvision 60 ft.; Passive Perception 12

Languages None

CR 2 (XP 450; PB +2)

Traits

Spider Climb. The broodmother can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Web Walker. The broodmother ignores movement restrictions caused by webs, and the broodmother knows the location of any other creature in contact with the same web.

Actions

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Poison damage.

Wire Snare (Recharge 5-6). Dexterity Saving Throw: DC 12, one Large or smaller creature the broodmother can see within 30 feet. Failure: The target is caught in wire and has the Restrained condition until the wire is destroyed (AC 10; HP 5; Vulnerability to Lightning damage; Immunity to Poison and Psychic damage).

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


**[path]**
```
[path] twist — Spider (is) — "pinned for evidence" (pinned)
```

---

## 04. Spring-Lock Steward — CR 2

**Input:** `clockwork spider`
**Donor:** defender-3-warden -> CR 2 (invented — no printed peer)
**Signature:** library · **elapsed** 26s

### Block
```
Spring-Lock Steward

Small Construct, Unaligned

AC 15
Initiative -1 (9)

HP 49 (11d6 + 11)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
16
+3
+3
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
12
+1
+1
MOD
SAVE
CON
13
+1
+3
CHA
5
-3
-3

Skills Perception +3

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Understands the languages of its creator but can't speak

CR 2 (XP 450; PB +2)

Traits

Spider Climb. The steward can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Regeneration. The steward regains 5 Hit Points at the start of each of its turns if it has at least 1 Hit Point.

Actions

Multiattack. The steward makes two Mandible attacks.

Mandible. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage.

Brass Aegis (2/Day). The steward targets itself or one creature it can see within 60 feet. The target gains 10 (3d6) Temporary Hit Points, and its AC increases by 2 until the end of the steward's next turn.

Pinning Drop (Recharge 5-6). Dexterity Saving Throw: DC 13, one creature within 30 feet. Failure: 7 (2d6) Bludgeoning damage, and the target has the Restrained condition until the end of its next turn.

Reactions

Interpose. Trigger: A creature within 5 feet of the steward that it guards is hit by an attack roll. Response: The attack hits the steward instead, and the steward has Resistance to the attack's damage.

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


**[path]**
```
[path] homebrew — "pinned for evidence" (pinned)
```

---

## 05. Mother Ash — CR 9

**Input:** `name: Mother Ash | hag midwife`
**Donor:** caster-6 -> CR 9
**Signature:** library · **elapsed** 29s

### Block
```
Mother Ash

Medium Fey, Neutral Evil

AC 16
Initiative +1 (11)

HP 127 (17d8 + 51)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
16
+3
+7
MOD
SAVE
DEX
12
+1
+1
WIS
18
+4
+8
MOD
SAVE
CON
16
+3
+3
CHA
14
+2
+2

Skills Arcana +7, Perception +8

Senses darkvision 60 ft.; Passive Perception 18

Languages Common, Elvish, Sylvan

CR 9 (XP 5,000; PB +4)

Traits

Amphibious. Mother Ash can breathe air and water.

Mimicry. Mother Ash can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 14 Wisdom (Insight) check.

Actions

Multiattack. Mother Ash makes three Claw attacks. It can replace one attack with a use of (A) Ashen Binding or (B) Spellcasting to cast Ray of Sickness.

Claw. Melee Attack Roll: +8, reach 5 ft. 22 (4d8 + 4) Slashing damage plus 3 (1d6) Poison damage.

Spellcasting. Mother Ash casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 16, +4 to hit with spell attacks):

- At Will: Dancing Lights, Disguise Self, Invisibility, Minor Illusion, Ray of Sickness
- 1/Day Each: Bestow Curse, Web, Blight

Ashen Binding. Strength Saving Throw: DC 15, one creature within 60 feet. Failure: 24 (7d6) Necrotic damage, and the target has the Restrained condition until the end of its next turn.

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


**[path]**
```
[path] twist — Green Hag (is) — "pinned for evidence" (pinned)
```

---

## 06. Mother Ash — CR 9

**Input:** `name: Mother Ash | hag midwife`
**Donor:** caster-6 -> CR 9
**Signature:** library · **elapsed** 24s

### Block
```
Mother Ash

Medium Fey, Neutral

AC 16
Initiative +0 (10)

HP 126 (23d8 + 23)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
16
+3
+7
MOD
SAVE
DEX
10
+0
+0
WIS
18
+4
+8
MOD
SAVE
CON
12
+1
+1
CHA
13
+1
+1

Skills Arcana +7, Perception +8

Senses darkvision 60 ft.; Passive Perception 18

Languages Common plus one other language, Sylvan

CR 9 (XP 5,000; PB +4)

Actions

Multiattack. Mother Ash makes three attacks, using Radiant Flame or Mace in any combination. It can replace one attack with a use of Midwife's Hex.

Radiant Flame. Ranged Attack Roll: +8, range 120 ft. 22 (4d8 + 4) Radiant damage.

Spellcasting. Mother Ash casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 16):

- At Will: Light, Thaumaturgy, Disguise Self
- 1/Day Each: Spirit Guardians, Bestow Curse, Blight, Hold Person

Midwife's Hex. Constitution Saving Throw: DC 15, one creature within 60 feet. Failure: 24 (7d6) Radiant damage, and the target has the Stunned condition until the end of its next turn.

Mace. Melee Attack Roll: +8, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.

Bonus Actions

Divine Aid (3/Day). Mother Ash casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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


**[path]**
```
[path] class_npc — Priest (is) — class cleric — "pinned for evidence" (pinned)
```

---
