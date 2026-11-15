# Blocks — unthinking creatures, an animal's INT, and a people with a class

Twelve sheets, generated once each as they would ship. **Every sheet this round generated is
here**, marked as it is. None threw.

```
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs v-unthinking
node --import ./scripts/alias-loader.mjs scripts/probe-peoples-body.mjs 5
```

Batch `scripts/smoke-batches/v-unthinking.json`; run `v-unthinking-2026-11-15T18-21-52`.

## Two corrections to the last round's marks

Carried forward because `BLOCKS-rulings-2026-11-15.md` is replaced by this file.

- **Sheet 3, the wise old bear, WAS evidence and was green.** I marked it "no evidence". "Bear"
  is not a printed name, so the body was refused and the sheet went homebrew — which is a
  normal route, not a declined answer. The call read it sapient and the rule fired:
  `sapient is no Beast: Beast -> Monstrosity`, Neutral, speaks Common.
- **Only sheet 12 stood on a people's body.** I reported that all three caster sheets did. The
  `[path]` lines say otherwise: sheets 8 and 11 read `class_npc — class mage` with **no body**
  and carry the Mage's own scores; only sheet 12 read `class_npc — Hobgoblin Warrior (is)`. The
  crash fix was proven by the stubbed runs, but "kobold sorcerer" shipped as a small mage and
  not as a kobold. Ruling C is the answer to that.

## The path probe for ruling C

```
  kobold sorcerer    want Kobold Warrior   5/5   class_npc:Kobold Warrior x5
  goblin wizard      want Goblin Warrior   5/5   class_npc:Goblin Warrior x5
  dispatched to the people's body on 10 of 10
```

## The twelve

| # | prompt | `[path]` as printed | type / alignment / INT / languages | verdict |
|---|---|---|---|---|
| 1 | a giant river pike | `[path] homebrew — "a giant river pike" (call)` | Large Monstrosity / Unaligned / INT 4 / None | **FLAGGED** |
| 2 | a knot of eels in a man's coat | `[path] homebrew — "a knot of eels in a man's coat" (` | Medium Monstrosity / Unaligned / INT 4 / None | **GREEN** |
| 3 | something large moving under the i | `[path] homebrew — "something large moving under the ` | Large Monstrosity / Neutral / INT 13 / None | **GREEN** |
| 4 | a pack of starving wolves | `[path] homebrew — Wolf (resembles) — "a pack of star` | Medium Beast / Unaligned / INT 8 / None | **GREEN** |
| 5 | clockwork spider | `[path] homebrew — "clockwork spider" (call)` | Medium Construct / Unaligned / INT 8 / Understands the lan | **GREEN** |
| 6 | a hound of smoke that hunts oathbr | `[path] homebrew — "a hound of smoke that hunts oathb` | Medium Monstrosity / Lawful Neutral / INT 11 / None | **GREEN** |
| 7 | a wise old bear who guards the mou | `[path] homebrew — "a wise old bear who guards the mo` | Large Monstrosity / Neutral / INT 15 / Common | **GREEN** |
| 8 | winter wolf | `[path] exact — Winter Wolf (is) — "Winter Wolf" (cod` | Large Monstrosity / Neutral Evil / INT 7 / Common, Giant | **GREEN** |
| 9 | kobold sorcerer | `[path] twist — Kobold Warrior (is) — "kobold" (call)` | Small Dragon / Neutral / INT 8 / Common, Draconic | **NO EVIDENCE for ruling C** |
| 10 | goblin wizard | `[path] class_npc — Goblin Warrior (is) — class mage ` | Small Humanoid / Chaotic Neutral / INT 14 / Common, Goblin | **GREEN** |
| 11 | bugbear monk | `[path] class_npc — Bugbear Warrior (is) — class monk` | Medium Humanoid / Chaotic Evil / INT 8 / Common, Goblin | **GREEN** |
| 12 | a wizard who hunts goblins | `[path] class_npc — class mage — "wizard" (call)` | Medium Humanoid / Neutral / INT 17 / Common and any three  | **GREEN** |

Ten green, one flagged, one no evidence for its ruling.

---

## 1. a giant river pike — **FLAGGED**

> **FLAGGED.** `[path] homebrew` with no body, and the call typed it **Monstrosity**, not Beast. Rulings A and B both read right (Unaligned, INT 4, no language) but the type is the call's own answer, not something this round touched. The "Beast" in what I was reading for did not happen.

*Read for:* Beast, Unaligned, INT 3 or a card score of 7 or lower

**`[path]` as printed**
```
[path] homebrew — "a giant river pike" (call)
```

**Path, donor and the rulings' own trace lines**
```
**Donor:** brute-5-grappler -> CR 3
[reskin] mind tier held: INT stays 4 against "feeble" — the card's 4 is already feeble
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 3
[reskin] mind tier: CHA 4 -> 10 — the call read this creature as ordinary at CR 3
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] sapient is no Beast: Beast -> Monstrosity — the call reads this creature as sapient, and print's Beasts are Unaligned and speechless (owner's ruling, 2026-11-15)
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
```

**The sheet**
```
River Pike

Large Monstrosity, Unaligned

AC 13
Initiative -1 (9)

HP 68 (8d10 + 24)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
16
+3
+5
INT
4
-3
-3
MOD
SAVE
DEX
8
-1
-1
WIS
15
+2
+2
MOD
SAVE
CON
16
+3
+3
CHA
10
+0
+0

Skills Athletics +5, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages None

CR 3 (XP 700; PB +2)

Traits

Still Water. The pike can't be detected by tremorsense, and it can use the Hide action in murky water or among reeds even when only lightly obscured.

Actions

Multiattack. The pike makes two Jaws attacks.

Jaws. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.

Breaching Lunge (Recharge 5-6). The pike spends 5 feet of movement to jump to a space within 15 feet that contains one or more Large or smaller creatures. Dexterity Saving Throw: DC 12, each creature in the destination space. Failure: 13 (3d8) Bludgeoning damage, and the target has the Prone condition. Success: Half damage, and the target is pushed 5 feet straight away.

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

## 2. a knot of eels in a man's coat — **GREEN**

*Read for:* Unaligned

**`[path]` as printed**
```
[path] homebrew — "a knot of eels in a man's coat" (call)
```

**Path, donor and the rulings' own trace lines**
```
**Donor:** brute-5-grappler -> CR 1
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 1
[reskin] mind tier: CHA 4 -> 10 — the call read this creature as ordinary at CR 1
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] alignment by mind: "Neutral" -> Unaligned — a Monstrosity the call reads as bestial at INT 4 holds no ethics (owner's ruling, 2026-11-15)
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
```

**The sheet**
```
Eelcoat

Medium Monstrosity, Unaligned

AC 13
Initiative -1 (9)

HP 30 (4d8 + 12)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
14
+2
+4
INT
4
-3
-3
MOD
SAVE
DEX
8
-1
-1
WIS
15
+2
+2
MOD
SAVE
CON
16
+3
+3
CHA
10
+0
+0

Skills Athletics +4, Perception +4

Immunities Lightning

Senses darkvision 60 ft.; Passive Perception 14

Languages None

CR 1 (XP 200; PB +2)

Actions

Multiattack. The eelcoat makes two Eel attacks.

Eel. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 12). While Grappled, the target has the Restrained condition.

Coils Tighten (Recharge 5-6). The eelcoat begins gathering destructive power, a knot of eels in a man's coat. At the end of its next turn, after it has moved, the power erupts. Dexterity Saving Throw: DC 13, each creature in a 20-foot Emanation originating from the eelcoat at that moment. Failure: 7 (2d6) Lightning damage. Success: Half damage.

Bonus Actions

Smother. The eelcoat smothers one Medium or smaller creature it is grappling. While smothered, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the eelcoat, and takes 3 (1d6) Lightning damage at the start of each of the eelcoat's turns. The eelcoat can have only one creature smothered at a time. If the eelcoat takes 5 damage or more in a single turn from the smothered creature, the eelcoat must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the eelcoat. If the eelcoat dies, a smothered creature pulls free Prone by using 5 feet of movement.

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

## 3. something large moving under the ice — **GREEN**

*Read for:* mind, INT, alignment and languages agree, whichever way the call reads it

**`[path]` as printed**
```
[path] homebrew — "something large moving under the ice" (call)
```

**Path, donor and the rulings' own trace lines**
```
**Donor:** lurker-8 -> CR 8
[reskin] mind tier held: INT stays 13 — the call gave no usable tier
[reskin] mind tier held: WIS stays 14 against "capable" — the card's 14 is already capable
[reskin] mind tier: CHA 11 -> 6 — the call read this creature as feeble at CR 8
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] alignment by mind: Unaligned -> Neutral — a Monstrosity with INT 13 can hold an ethic (print: 0 of 329 Unaligned blocks speak)
```

**The sheet**
```
Lake Griever

Large Monstrosity, Neutral

AC 16
Initiative +5 (15)

HP 114 (12d12 + 36)

Speed 30 ft., Burrow 30 ft., Swim 30 ft.

MOD
SAVE
STR
12
+1
+1
INT
13
+1
+4
MOD
SAVE
DEX
20
+5
+8
WIS
14
+2
+2
MOD
SAVE
CON
16
+3
+3
CHA
6
-2
-2

Skills Perception +5, Stealth +11

Immunities Cold

Senses tremorsense 60 ft.; Passive Perception 15

Languages None

CR 8 (XP 3,900; PB +3)

Traits

Frozen False Surface. While the griever remains motionless, it is indistinguishable from a pressure ridge or frozen snout of ice.

Actions

Multiattack. The griever makes three Bite attacks. It can replace one attack with a use of Through the Crust.

Bite. Melee Attack Roll: +8, reach 10 ft. 9 (1d8 + 5) Piercing damage plus 7 (2d6) Cold damage.

Through the Crust. Strength Saving Throw: DC 16, each creature in a 15-foot Emanation originating from the griever. Failure: 24 (7d6) Cold damage, and the target is pulled up to 10 feet straight toward the griever, and the target has the Prone condition. Success: Half damage only.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the griever takes the Hide action.

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

## 4. a pack of starving wolves — **GREEN**

*Read for:* Unaligned, no language

**`[path]` as printed**
```
[path] homebrew — Wolf (resembles) — "a pack of starving wolves" (call)
```

**Path, donor and the rulings' own trace lines**
```
**Donor:** skirmisher-1 -> CR 2
[reskin] mind tier held: INT stays 8 against "ordinary" — the call read this creature as bestial, so only "feeble" could lower its INT
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 2
[reskin] mind tier: CHA 8 -> 6 — the call read this creature as feeble at CR 2
[reskin] class kit: none — the homebrew path takes no class kit
```

**The sheet**
```
Starving Pack

Medium Beast, Unaligned

AC 15
Initiative +3 (13)

HP 44 (8d8 + 8)

Speed 30 ft.

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
6
-2
-2

Skills Perception +4, Stealth +5

Senses darkvision 60 ft.; Passive Perception 14

Languages None

CR 2 (XP 450; PB +2)

Traits

Starved Sinew. While the pack has half its Hit Points or fewer, the pack has Advantage on attack rolls against any creature that has the Prone or Restrained condition.

Wheeling Flanks. The pack ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The pack makes two Bite attacks. It can replace one attack with a use of Crescent Pin.

Bite. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage.

Crescent Pin. Strength Saving Throw: DC 12, each creature in a 15-foot Cone. Failure: The target has the Prone condition.

Bonus Actions

Fleet Agility. The pack takes the Dash or Disengage action.

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

## 5. clockwork spider — **GREEN**

*Read for:* Unaligned

**`[path]` as printed**
```
[path] homebrew — "clockwork spider" (call)
```

**Path, donor and the rulings' own trace lines**
```
**Donor:** skirmisher-1 -> CR 2
[reskin] mind tier held: INT stays 8 against "ordinary" — the call read this creature as mindless, so only "feeble" could lower its INT
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 2
[reskin] mind tier: CHA 8 -> 6 — the call read this creature as feeble at CR 2
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] languages by body: a trap-line Construct with no voice in the concept
```

**The sheet**
```
Mainspring Reeler

Medium Construct, Unaligned

AC 15
Initiative +3 (13)

HP 44 (8d8 + 8)

Speed 30 ft., Climb 30 ft.

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
6
-2
-2

Skills Perception +4, Stealth +5

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages Understands the languages of its creator but can't speak

CR 2 (XP 450; PB +2)

Traits

Wallscuttle. The reeler ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The reeler makes two Fangs attacks.

Fangs. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage.

Alchemical Thread (Recharge 5-6). Dexterity Saving Throw: DC 12, one Large or smaller creature the reeler can see within 30 feet. Failure: The target is caught in thread and has the Restrained condition until the thread is destroyed (AC 10; HP 5; Vulnerability to Fire damage; Immunity to Poison and Psychic damage).

Bonus Actions

Fleet Agility. The reeler takes the Dash or Disengage action.

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

## 6. a hound of smoke that hunts oathbreakers — **GREEN**

*Read for:* mind, INT, alignment and languages agree

**`[path]` as printed**
```
[path] homebrew — "a hound of smoke that hunts oathbreakers" (call)
```

**Path, donor and the rulings' own trace lines**
```
**Donor:** lurker-2 -> CR 4
[reskin] mind tier held: INT stays 11 against "capable" — the call read this creature as bestial, so only "feeble" could lower its INT
[reskin] mind tier held: CHA stays 12 against "ordinary" — the card's 12 is already ordinary
[reskin] mind tier: WIS 12 -> 18 — the call read this creature as formidable at CR 4
[reskin] class kit: none — the homebrew path takes no class kit
```

**The sheet**
```
Ashbound Hound

Medium Monstrosity, Lawful Neutral

AC 15
Initiative +4 (14)

HP 52 (8d8 + 16)

Speed 30 ft., Fly 30 ft. (hover)

MOD
SAVE
STR
12
+1
+1
INT
11
+0
+0
MOD
SAVE
DEX
18
+4
+6
WIS
18
+4
+4
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

Skills Perception +6, Stealth +8

Senses darkvision 60 ft.; Passive Perception 16

Languages None

CR 4 (XP 1,100; PB +2)

Traits

Scent of the Forsworn. The hound has Advantage on Wisdom (Survival) checks to track any creature that has broken an oath, and it always knows the direction to the nearest such oathbreaker within a mile, as a cold pull in its smoke.

Actions

Multiattack. The ashbound hound makes two Bite attacks. It can replace one attack with a use of Seam of the Broken Oath.

Bite. Melee Attack Roll: +6 (with Advantage during the first round of each combat), reach 5 ft. 8 (1d8 + 4) Piercing damage plus 6 (1d12) Necrotic damage.

Seam of the Broken Oath. Wisdom Saving Throw: DC 14, each creature in a 15-foot Cone. Failure: The target has the Frightened condition until the end of its next turn.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the ashbound hound takes the Hide action.

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

## 7. a wise old bear who guards the mountain pass — **GREEN**

*Read for:* CONTROL: still a Monstrosity with an alignment

**`[path]` as printed**
```
[path] refused: print_body "Bear" is not in the corpus
[path] homebrew — "a wise old bear who guards the mountain pass" (call)
```

**Path, donor and the rulings' own trace lines**
```
**Donor:** defender-5 -> CR 5
[reskin] mind tier: INT 11 -> 15 — the call read this creature as capable at CR 5
[reskin] mind tier: WIS 13 -> 18 — the call read this creature as formidable at CR 5
[reskin] mind tier: CHA 14 -> 10 — the call read this creature as ordinary at CR 5
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] sapient is no Beast: Beast -> Monstrosity — the call reads this creature as sapient, and print's Beasts are Unaligned and speechless (owner's ruling, 2026-11-15)
[reskin] alignment by mind: Unaligned -> Neutral — a Beast with INT 15 can hold an ethic (print: 0 of 329 Unaligned blocks speak)
[reskin] languages by mind: "None" -> "Common" (sapient)
```

**The sheet**
```
Old Passbear

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

Traits

Pass Walker. Difficult Terrain composed of stone, scree, snow, or ice doesn't cost the passbear extra movement, and the passbear can move across stone, scree, snow, or ice without needing to make an ability check.

Actions

Multiattack. The passbear makes two attacks, using Claw or Shoulder Maul in any combination. It can replace one attack with a use of Mountainside Shove.

Claw. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Slashing damage.

Shoulder Maul. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage.

Mountainside Shove. Dexterity Saving Throw: DC 13, each creature in a 30-foot Cone. Failure: The target has the Prone condition.

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

## 8. winter wolf — **GREEN**

*Read for:* CONTROL: the printed block, print's alignment

**`[path]` as printed**
```
[path] exact — Winter Wolf (is) — "Winter Wolf" (code)
```

**Path, donor and the rulings' own trace lines**
```
**Donor:** skirmisher-3 -> CR 3
[reskin] class kit: none — the exact path takes no class kit
[reskin] alignment by mind: Unaligned -> Neutral — a Monstrosity with INT 7 can hold an ethic (print: 0 of 329 Unaligned blocks speak)
[reskin] languages by mind: "None" -> "Common" (sapient)
```

**The sheet**
```
Winter Wolf

Large Monstrosity, Neutral Evil

AC 13
Initiative +1 (11)

HP 75 (10d10 + 20)

Speed 50 ft.

MOD
SAVE
STR
18
+4
+4
INT
7
-2
-2
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
14
+2
+2
CHA
8
-1
-1

Skills Perception +5, Stealth +5

Immunities Cold

Senses Passive Perception 15

Languages Common, Giant

CR 3 (XP 700; PB +2)

Traits

Pack Tactics. The winter wolf has Advantage on an attack roll against a creature if at least one of the winter wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Bite. Melee Attack Roll: +6, reach 5 ft. 11 (2d6 + 4) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Cold Breath (Recharge 5-6). Constitution Saving Throw: DC 12, each creature in a 15-foot Cone. Failure: 18 (4d8) Cold damage. Success: Half damage.

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

## 9. kobold sorcerer — **NO EVIDENCE for ruling C**

> **NO EVIDENCE for ruling C.** `[path] twist — Kobold Warrior (is)`. The call answered a **body and no class**, so ruling C's fill never ran and `dispatch` correctly made it a twist. It stands on the kobold — Small Dragon, Draconic — but with none of the mage on top. The ruling's own evidence is the path probe below, 5 of 5.

*Read for:* the kobold's own type, senses and traits, with the mage's rows on top

**`[path]` as printed**
```
[path] twist — Kobold Warrior (is) — "kobold" (call)
```

**Path, donor and the rulings' own trace lines**
```
**Donor:** skirmisher-1 -> CR 2
[reskin] class kit: none — the twist path takes no class kit
[reskin] languages by mind: "Draconic" -> "Common, Draconic" (sapient)
```

**The sheet**
```
Siremarked Kobold

Small Dragon, Neutral

AC 15
Initiative +3 (13)

HP 45 (18d6 - 18)

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
16
+3
+5
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

Skills Perception +0, Stealth +5

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Draconic

CR 2 (XP 450; PB +2)

Traits

Blood-Memory Shriek. When the kobold is first Bloodied, the kobold shrieks; each ally of the kobold within 60 feet that can hear it can immediately move up to its Speed toward the kobold's attacker.

Pack Tactics. The kobold has Advantage on an attack roll against a creature if at least one of the kobold's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Sunlight Sensitivity. While in sunlight, the kobold has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The kobold makes two Dagger attacks.

Dagger. Melee or Ranged Attack Roll: +5, reach 5 ft. or range 20/60 ft. 7 (1d8 + 3) Piercing damage.

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

## 10. goblin wizard — **GREEN**

*Read for:* the goblin's own body, with a Spellcasting DC from this sheet's casting score

**`[path]` as printed**
```
[path] refused: the head clause names the Goblin Warrior, a people — a mage who is visibly one stands on its printed body (owner's ruling, 2026-11-15)
[path] class_npc — Goblin Warrior (is) — class mage — "wizard" (call)
```

**Path, donor and the rulings' own trace lines**
```
**Donor:** skirmisher-3 -> CR 3
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Goblin Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "wizard": Protective Magic (3/Day) (Mage/Protective Magic)
```

**The sheet**
```
Gribble the Unraided

Small Humanoid, Chaotic Neutral

AC 15
Initiative +3 (13)

HP 59 (17d6)

Speed 30 ft.

MOD
SAVE
STR
8
-1
-1
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
8
-1
-1
MOD
SAVE
CON
10
+0
+0
CHA
8
-1
-1

Skills Perception +1, Stealth +5

Senses darkvision 60 ft.; Passive Perception 11

Languages Common, Goblin

CR 3 (XP 700; PB +2)

Traits

Crawling Residue. When a creature is hit by Gribble's Shortbow, the creature crackles faintly with static until the end of Gribble's next turn, and while it crackles it is treated as having no cover against spells Gribble casts with Spellcasting.

Actions

Multiattack. Gribble makes two attacks, using Quarterstaff or Shortbow in any combination.

Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage if the attack roll had Advantage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.

Spellcasting. Gribble casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Nimble Escape. Gribble takes the Disengage or Hide action.

Reactions

Protective Magic (3/Day). Gribble casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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

## 11. bugbear monk — **GREEN**

*Read for:* the bugbear's own body, with the monk's rows on top

**`[path]` as printed**
```
[path] class_npc — Bugbear Warrior (is) — class monk — "monk" (call)
```

**Path, donor and the rulings' own trace lines**
```
**Donor:** skirmisher-3 -> CR 3
[reskin] class kit: stunning-strike — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: monk — "monk": Patient Defense (patient-defense)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Goblin — the concept names the species; print's NPCs of it speak it
```

**The sheet**
```
Silent Knuckle

Medium Humanoid, Chaotic Evil

AC 15
Initiative +3 (13)

HP 60 (11d8 + 11)

Speed 30 ft.

MOD
SAVE
STR
15
+2
+2
INT
8
-1
-1
MOD
SAVE
DEX
16
+3
+5
WIS
11
+0
+0
MOD
SAVE
CON
13
+1
+1
CHA
9
-1
-1

Skills Perception +2, Stealth +5

Senses darkvision 60 ft.; Passive Perception 12

Languages Common, Goblin

CR 3 (XP 700; PB +2)

Traits

Dead Still. While it moves at half Speed, the knuckle can Hide as part of moving at half Speed without spending an action, and the concealment lasts until it moves at full Speed, attacks, or loses cover or light obscurement, or until a creature searching for it succeeds on a Wisdom (Perception) check against its Stealth check.

Abduct. The knuckle needn't spend extra movement to move a creature it is grappling.

Actions

Multiattack. The knuckle makes two Unarmed Strike attacks.

Unarmed Strike. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 12).

Unarmed Strike. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Bonus Actions

Patient Defense. The knuckle takes the Dodge action.

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

## 12. a wizard who hunts goblins — **GREEN**

*Read for:* CONTROL: no people's body — the goblins are hunted, not the creature

**`[path]` as printed**
```
[path] class_npc — class mage — "wizard" (call)
```

**Path, donor and the rulings' own trace lines**
```
**Donor:** caster-6 -> CR 5
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "wizard": nothing to add — the sheet already answers it
```

**The sheet**
```
Ledger Keeper

Medium Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 81 (18d8)

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
+6
MOD
SAVE
DEX
14
+2
+2
WIS
12
+1
+4
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

Skills Arcana +6, History +6, Perception +4

Senses Passive Perception 14

Languages Common and any three languages, Goblin

CR 5 (XP 1,800; PB +3)

Traits

Erased Warren Ledger. When a creature the keeper can see is reduced to 0 Hit Points, the keeper records the kill, regains a use of Protective Magic, and gains Advantage on its next attack roll against any goblin it can see before the end of its next turn. Once per turn.

Actions

Multiattack. The keeper makes three Arcane Burst attacks.

Spellcasting. The keeper casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Bonus Actions

Misty Step (3/Day). The keeper casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Trigger: The keeper is hit by an attack roll. Response: The keeper casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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

