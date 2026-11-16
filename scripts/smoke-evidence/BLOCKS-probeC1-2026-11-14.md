# Probe C step 1 — the twelve sheets

Six pairs, flag on and off, each pair on the same donor card. Nothing injected.
```
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs v-probec1
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs v-probec1b
```


## 01. Clockwork Spider — CR 2

**Input:** `clockwork spider`
**Donor:** brute-5-juggernaut -> CR 2
**Signature:** library · **elapsed** 29s

### Block
```
Clockwork Spider

Small Construct, Unaligned

AC 13
Initiative +3 (13)

HP 49 (11d6 + 11)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
14
+2
+4
INT
2
-4
-4
MOD
SAVE
DEX
16
+3
+3
WIS
11
+0
+0
MOD
SAVE
CON
12
+1
+3
CHA
4
-3
-3

Skills Athletics +4, Perception +2

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 12

Languages Understands the languages of its creator but can't speak

CR 2 (XP 450; PB +2)

Traits

Wall-Clinger. While the clockwork spider is climbing or clinging to a wall or ceiling, it moves across sheer surfaces without an ability check, and it can use its movement on its turn to drop onto a creature below it, landing in that creature's space without provoking Opportunity Attacks.

Immutable Form. The clockwork spider can't shape-shift.

Magic Resistance. The clockwork spider has Advantage on saving throws against spells and other magical effects.

Spider Climb. The clockwork spider can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions

Multiattack. The clockwork spider makes two Forelimb attacks.

Forelimb. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage.

Webbing Cable (Recharge 5-6). Dexterity Saving Throw: DC 12, one Large or smaller creature the clockwork spider can see within 30 feet. Failure: The target is caught in cable and has the Restrained condition until the cable is destroyed (AC 10; HP 5; Vulnerability to Fire damage; Immunity to Poison and Psychic damage).

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


**Flag, donor, path and the rows a later pass dropped**
```
[path] homebrew — Giant Spider (resembles) — "pinned for probe C" (pinned)
[reskin] value check: "Webbing Cable (Recharge 5-6)" EV 3.9 vs floor 3.6 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: snare -> Actions/"Webbing Cable (Recharge 5-6)" ("fires a length of brass-spun webbing cable at a creature, which is Restrained un [shape fit, no verb match]")
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Wall-Clinger" ("The clockwork spider clings to sheer walls and ceilings without a check, and it can drop onto a creature
[reskin] free-row budget by card size: CR 2 sits in band 0-2, where print runs 1-4 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather th
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Wall-Clinger" [no template]
```

---

## 02. Rafter Recluse — CR 2

**Input:** `clockwork spider`
**Donor:** brute-5-juggernaut -> CR 2
**Signature:** library · **elapsed** 30s

### Block
```
Rafter Recluse

Small Construct, Unaligned

AC 13
Initiative -1 (9)

HP 52 (8d6 + 24)

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
10
+0
+0
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

Skills Athletics +5, Perception +2

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 12

Languages Understands the languages of its creator but can't speak

CR 2 (XP 450; PB +2)

Traits

Spider Climb. The recluse can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Immutable Form. The recluse can't shape-shift.

Magic Resistance. The recluse has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The recluse makes two Mandibles attacks.

Mandibles. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage.

Snare Filament (Recharge 5-6). Dexterity Saving Throw: DC 13, one creature within 30 feet. Failure: The target has the Restrained condition until the end of its next turn.

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


**Flag, donor, path and the rows a later pass dropped**
```
[path] homebrew — Giant Spider (resembles) — "pinned for probe C" (pinned)
[reskin] value check: "Snare Filament (Recharge 5-6)" EV 3.9 vs floor 3.6 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: snare -> Actions/"Snare Filament (Recharge 5-6)" ("the target must make a Dexterity saving throw or be Restrained as spring-loaded  [shape fit, no verb match]")
[reskin] signature template (trait): spider-climb -> Traits/"Rafter Climbing" ("The idea says it can climb sheer surfaces and hang upside down from ceilings and [verb: spider:concept, climb:idea, clim
[reskin] free-row budget by card size: CR 2 sits in band 0-2, where print runs 1-4 rows (p20-p90, Multiattack excluded); this card already carries 4 fixed row(s), so the free-row budget is 0 rather th
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Snare Filament" [action/save/condition]
```

---

## 03. Marisan the Gaze — CR 6

**Input:** `medusa sculptor`
**Donor:** skirmisher-8-hurler -> CR 6 (invented — no printed peer)
**Signature:** library · **elapsed** 38s

### Block
```
Marisan the Gaze

Medium Monstrosity, Neutral

AC 16
Initiative +3 (13)

HP 105 (14d8 + 42)

Speed 40 ft., Climb 40 ft.

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
+6
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

Skills Perception +4, Stealth +6

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Soul Listener. While Marisan searches for or tracks a creature, Marisan knows the location of each creature it has turned to stone, wherever that creature is, and has Advantage on Wisdom (Perception) and Wisdom (Survival) checks made to find such a creature.

Gallery Slip. Marisan ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Marisan makes three attacks, using Sculptor's Chisel or Hurled Chisel in any combination.

Sculptor's Chisel. Melee Attack Roll: +7, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 4 (1d8) Poison damage.

Hurled Chisel. Ranged Attack Roll: +7, range 20/60 ft. 8 (1d8 + 4) Poison damage. Hit or Miss: Immediately after the attack, its chisel returns to Marisan's grasp.

Stone Shard (Recharge 5-6). Marisan hurls its chisel at a point it can see within 90 feet. Dexterity Saving Throw: DC 14, each creature in a 5-foot-radius Sphere centered on that point. Failure: 36 (8d8) Bludgeoning damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Bonus Actions

Fleet Agility. Marisan takes the Dash or Disengage action.

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


**Flag, donor, path and the rows a later pass dropped**
```
[path] homebrew — Medusa (resembles) — "pinned for probe C" (pinned)
[reskin] value check: "Marble Stare" EV 6.1 vs floor 5.7 (one attack of 3) — worth the trade
[reskin] signature authored: no template — the seat wrote it -> Actions/"Marble Stare" ("Marisan fixes its stare on one creature it can see, and the flesh beneath that gaze goes hard and heavy as work
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Soul Listener" ("Marisan can always tell a statue it carved from living flesh from one carved from mindless stone — and 
[reskin] free-row budget by card size: CR 6 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather th
[reskin] free row over budget: Actions/"Marble Stare" leaves at ship — this sheet's free-row budget (0) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Soul Listener" [no template]
```

---

## 04. Stone Gallery Medusa — CR 6

**Input:** `medusa sculptor`
**Donor:** skirmisher-8-hurler -> CR 6 (invented — no printed peer)
**Signature:** library · **elapsed** 31s

### Block
```
Stone Gallery Medusa

Medium Monstrosity, Neutral

AC 16
Initiative +4 (14)

HP 105 (14d8 + 42)

Speed 40 ft.

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
16
+3
+3
CHA
10
+0
+0

Skills Perception +5, Stealth +7

Senses darkvision 60 ft.; Passive Perception 15

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Slithering Stalk. The medusa ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The medusa makes three attacks, using Serpent Fangs or Hurl Statue Shard in any combination.

Serpent Fangs. Melee Attack Roll: +7, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 4 (1d8) Poison damage.

Hurl Statue Shard. Ranged Attack Roll: +7, range 20/60 ft. 8 (1d8 + 4) Piercing damage.

Shattering Statue (Recharge 5-6). The medusa hurls a shattered statue at a point it can see within 90 feet. Dexterity Saving Throw: DC 14, each creature in a 5-foot-radius Sphere centered on that point. Failure: 36 (8d8) Bludgeoning damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Creeping Snare. Strength Saving Throw: DC 14, one creature within 30 feet. Failure: The target has the Restrained condition until the end of its next turn.

Bonus Actions

Fleet Agility. The medusa takes the Dash or Disengage action.

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


**Flag, donor, path and the rows a later pass dropped**
```
[path] homebrew — Medusa (resembles) — "pinned for probe C" (pinned)
[reskin] value check: "Creeping Petrifaction" EV 6.1 vs floor 5.7 (one attack of 3) — worth the trade
[reskin] signature authored: no template — the seat wrote it -> Actions/"Creeping Petrifaction" ("The medusa fixes her stare on one creature she can see, and it must make a Constitution saving throw a
[reskin] signature miss: trait — "The serpent-hair is not vanity but a guard: whenever a creature within reach of the medusa averts its eyes — or is Blinded, or otherwise unable to meet her gaze — the
[reskin] free-row budget by card size: CR 6 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather th
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Creeping Petrifaction" [no template]
```

---

## 05. Brinewrack Corsair — CR 8

**Input:** `vampire pirate`
**Donor:** skirmisher-8-hurler -> CR 8 (invented — no printed peer)
**Signature:** library · **elapsed** 35s

### Block
```
Brinewrack Corsair

Medium Undead, Neutral Evil

AC 17
Initiative +4 (14)

HP 136 (16d8 + 64)

Speed 40 ft., Climb 40 ft., Swim 40 ft.

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
18
+4
+7
WIS
15
+2
+5
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

Skills Perception +5, Stealth +7

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Common plus the languages it knew in life

CR 8 (XP 3,900; PB +3)

Traits

Last Warm Breath. When a creature the corsair can see drops to 0 Hit Points within 5 feet of it, the corsair regains 7 (2d6) Hit Points, and it does not provoke Opportunity Attacks while moving up to 30 feet toward the fallen creature.

Tide Patience. The corsair ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The corsair makes three attacks, using Cutlass or Briny Spray in any combination.

Cutlass. Melee Attack Roll: +8, reach 5 ft. 8 (1d6 + 5) Slashing damage plus 6 (1d12) Necrotic damage. If the target is a creature and doesn't already have a breathless wound, it is subjected to the following effect. Constitution Saving Throw: DC 15. Failure: The target receives a breathless wound. While wounded, the target loses 7 (2d6) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, succeeding on a DC 15 Wisdom (Medicine) check.

Briny Spray. Ranged Attack Roll: +8, range 20/60 ft. 14 (2d8 + 5) Necrotic damage.

Grave Brine (Recharge 5-6). The corsair hurls a gout of brine at a point it can see within 90 feet. Dexterity Saving Throw: DC 15, each creature in a 5-foot-radius Sphere centered on that point. Failure: 49 (14d6) Necrotic damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Drowned Buccaneer's Hunger. Constitution Saving Throw: DC 15, each creature within 5 feet. Failure: 21 (6d6) Necrotic damage. Success: Half damage only.

Bonus Actions

Fleet Agility. The corsair takes the Dash or Disengage action.

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


**Flag, donor, path and the rows a later pass dropped**
```
[path] homebrew — Vampire (resembles) — "pinned for probe C" (pinned)
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Last Warm Breath" ("The corsair sucks the last warm breath from anyone who falls near it — when a creature drops to 0 hi
[reskin] free-row budget by card size: CR 8 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather th
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Last Warm Breath" [no template]
```

---

## 06. Drowned Captain Vask — CR 8

**Input:** `vampire pirate`
**Donor:** skirmisher-8-hurler -> CR 8 (invented — no printed peer)
**Signature:** library · **elapsed** 32s

### Block
```
Drowned Captain Vask

Medium Undead, Neutral Evil

AC 17
Initiative +5 (15)

HP 135 (18d8 + 54)

Speed 40 ft., Climb 40 ft., Swim 40 ft.

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
20
+5
+8
WIS
14
+2
+5
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

Skills Perception +5, Stealth +8

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Common plus the languages it knew in life

CR 8 (XP 3,900; PB +3)

Traits

Dead Man's Draught. When Vask reduces a creature to 0 Hit Points with an attack, Vask regains 7 (2d6) Hit Points.

Brine-Stitched Hide. While Vask is immersed in water or in lightly obscured air created by fog, Vask regains 7 (2d6) Hit Points at the start of each of its turns.

Rigging Slip. Vask ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Vask makes three attacks, using Cutlass or Flintlock in any combination.

Cutlass. Melee Attack Roll: +8, reach 5 ft. 8 (1d6 + 5) Slashing damage plus 6 (1d12) Necrotic damage. If the target is a creature and doesn't already have a brine-soaked wound, it is subjected to the following effect. Constitution Saving Throw: DC 15. Failure: The target receives a brine-soaked wound. While wounded, the target loses 7 (2d6) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, succeeding on a DC 15 Wisdom (Medicine) check.

Flintlock. Ranged Attack Roll: +8, range 30/90 ft. 16 (2d10 + 5) Piercing damage. Hit or Miss: Immediately after the attack, its flintlock returns to Vask's grasp.

Powder Crush (Recharge 5-6). Vask hurls its flintlock at a point it can see within 90 feet. Dexterity Saving Throw: DC 15, each creature in a 5-foot-radius Sphere centered on that point. Failure: 49 (14d6) Necrotic damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Bonus Actions

Fleet Agility. Vask takes the Dash or Disengage action.

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


**Flag, donor, path and the rows a later pass dropped**
```
[path] homebrew — Vampire (resembles) — "pinned for probe C" (pinned)
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Brine-Stitched Hide" ("Vask's body is soaked in brine and stitched with seaweed; it has advantage on saving throws again
[reskin] free-row budget by card size: CR 8 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather th
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Brine-Stitched Hide" [no template]
```

---

## 07. Mother Ash — CR 9

**Input:** `name: Mother Ash | hag midwife`
**Donor:** caster-8-binder -> CR 9
**Signature:** library · **elapsed** 32s

### Block
```
Mother Ash

Medium Fey, Neutral Evil

AC 16
Initiative +1 (11)

HP 135 (18d8 + 54)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
13
+1
+1
MOD
SAVE
DEX
12
+1
+1
WIS
14
+2
+6
MOD
SAVE
CON
16
+3
+3
CHA
16
+3
+7

Skills Perception +6, Deception +7

Senses darkvision 60 ft.; Passive Perception 16

Languages Common

CR 9 (XP 5,000; PB +4)

Actions

Multiattack. Mother Ash makes three attacks, using Needle or Withering Ash in any combination. It can replace one attack with a use of Choking Caul.

Needle. Melee Attack Roll: +8, reach 5 ft. 13 (2d8 + 4) Piercing damage plus 7 (2d6) Poison damage.

Withering Ash. Ranged Attack Roll: +8, range 60 ft. 17 (3d8 + 4) Poison damage.

Choking Caul. Constitution Saving Throw: DC 15, one creature within 60 feet. Failure: 19 (3d12) Poison damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. Mother Ash casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 15):

- At Will: Disguise Self
- 1/Day Each: Misty Step, Cloudkill, Blindness/Deafness

Stolen First-Breath. Constitution Saving Throw: DC 15, one creature within 60 feet. Failure: 24 (7d6) Bludgeoning damage, and the target has the Stunned condition until the end of its next turn.

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


**Flag, donor, path and the rows a later pass dropped**
```
[path] homebrew — Green Hag (resembles) — "pinned for probe C" (pinned)
[reskin] value check: "Stolen First-Breath" EV 13.2 vs floor 10.9 (one attack of 3) — worth the trade
[reskin] signature authored: no template — the seat wrote it -> Actions/"Stolen First-Breath" ("Mother Ash whispers a stolen first-breath back into a foe's lungs as a curse of stilled time: one creatu
[reskin] signature template (trait): false-appearance -> Traits/"False Appearance" ("veiled in drifting ash, lightly obscured and able to hide while observed — the a [shape fit, no verb match]")
[reskin] free row over budget: Traits/"False Appearance" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Stolen First-Breath" [no template]
```

---

## 08. Cataloguing Mummy — CR 3

**Input:** `mummy librarian`
**Donor:** caster-8-binder -> CR 3
**Signature:** library · **elapsed** 27s

### Block
```
Cataloguing Mummy

Medium Undead, Lawful Neutral

AC 14
Initiative -1 (9)

HP 52 (8d8 + 16)

Speed 30 ft.

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
+3
MOD
SAVE
CON
15
+2
+2
CHA
14
+2
+4

Skills Perception +3, Deception +4

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus the languages it knew in life

CR 3 (XP 700; PB +2)

Actions

Multiattack. The mummy makes two attacks, using Claws or Grave Dust in any combination. It can replace one attack with a use of Mouldering Choke.

Claws. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Necrotic damage.

Grave Dust. Ranged Attack Roll: +5, range 60 ft. 10 (2d6 + 3) Necrotic damage.

Mouldering Choke. Constitution Saving Throw: DC 12, one creature within 60 feet. Failure: 11 (2d10) Necrotic damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. The mummy casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 12):

- At Will: Silent Image, Minor Illusion, Fog Cloud
- 1/Day Each: Web

Binding Chain (Recharge 5-6). Dexterity Saving Throw: DC 12, one Large or smaller creature the mummy can see within 60 feet. Failure: The target is caught in chain and has the Restrained condition until the chain is destroyed (AC 10; HP 10; Vulnerability to Slashing damage; Immunity to Poison and Psychic damage).

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


**Flag, donor, path and the rows a later pass dropped**
```
[path] homebrew — Mummy (resembles) — "pinned for probe C" (pinned)
[reskin] value check: "Binding Chain (Recharge 5-6)" EV 6.6 vs floor 6.2 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: snare -> Actions/"Binding Chain (Recharge 5-6)" ("a looped strap of shelf-chain and gummed book-spines binds fast around one creat [verb: snare:idea, bind:idea, chain:idea
[reskin] free-row budget by card size: CR 3 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather th
```

---

## 09. Archive Keeper — CR 3

**Input:** `mummy librarian`
**Donor:** caster-8-binder -> CR 3
**Signature:** library · **elapsed** 28s

### Block
```
Archive Keeper

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
15
+2
+4
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

Skills Perception +4, Deception +5

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages Common plus the languages it knew in life

CR 3 (XP 700; PB +2)

Actions

Multiattack. The keeper makes two attacks, using Shelf Slam or Scroll Dart in any combination. It can replace one attack with a use of Sepulchral Whisper.

Shelf Slam. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Necrotic damage.

Scroll Dart. Ranged Attack Roll: +5, range 20/60 ft. 10 (2d6 + 3) Necrotic damage.

Sepulchral Whisper. Constitution Saving Throw: DC 12, one creature within 60 feet. Failure: 11 (2d10) Necrotic damage, and the target has the Deafened condition until the end of its next turn.

Spellcasting. The keeper casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 13):

- At Will: Minor Illusion, Darkness
- 1/Day Each: Silence, Web

Shroud Lash. Strength Saving Throw: DC 12, one creature within 30 feet. Failure: The target has the Restrained condition until the end of its next turn.

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


**Flag, donor, path and the rows a later pass dropped**
```
[path] homebrew — Mummy (resembles) — "pinned for probe C" (pinned)
[reskin] value check: "Shroud Lash" EV 6.6 vs floor 6.2 (one attack of 2) — worth the trade
[reskin] signature authored: no template — the seat wrote it -> Actions/"Shroud Lash" ("The keeper flings a length of its own unraveling linen bindings like a lash, wrapping the target. The target mus
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Shroud Lash" [no template]
```

---

## 10. Hollow Bell Acolyte — CR 3

**Input:** `a chapel bell-ringer's ghost that tolls for the dying`
**Donor:** lurker-1-phantom -> CR 3
**Signature:** library · **elapsed** 28s

### Block
```
Hollow Bell Acolyte

Medium Undead, Neutral

AC 12
Initiative +1 (11)

HP 45 (10d8)

Speed 5 ft., Fly 50 ft. (hover)

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
+3
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

Skills Stealth +3

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 11

Languages Common plus the languages it knew in life

CR 3 (XP 700; PB +2)

Traits

Fear Aura. The bell acolyte emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 13, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Incorporeal Movement. The bell acolyte can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the bell acolyte has Disadvantage on ability checks and attack rolls.

Actions

Clapper. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 9 (2d8) Necrotic damage.

Funeral Peal. Constitution Saving Throw: DC 13, one creature within 60 feet. Failure: 24 (7d6) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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


**Flag, donor, path and the rows a later pass dropped**
```
[path] homebrew — Ghost (resembles) — "pinned for probe C" (pinned)
[reskin] value check: "Funeral Peal" EV 13.2 vs floor 12 (one attack of 1) — worth the trade
[reskin] signature authored: no template — the seat wrote it -> Actions/"Funeral Peal" ("The acolyte's clapper strikes an unseen bell, and one creature within earshot that can hear it is tolled for th
[reskin] signature template (trait): fear-aura -> Traits/"Fear Aura" ("the acolyte's toll frightens those near death with a Wisdom save until the start [verb: frightens:idea, frightening:idea, presenc
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Fear Aura" [trait/start_of_turn/condition]
```

---

## 01. Mother Ash — CR 9

**Input:** `name: Mother Ash | hag midwife`
**Donor:** caster-8-binder -> CR 9
**Signature:** library · **elapsed** 27s

### Block
```
Mother Ash

Medium Fey, Neutral

AC 16
Initiative +2 (12)

HP 135 (18d8 + 54)

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
15
+2
+6
MOD
SAVE
CON
16
+3
+3
CHA
18
+4
+8

Skills Perception +6, Deception +8

Senses darkvision 60 ft.; Passive Perception 16

Languages Common, Sylvan

CR 9 (XP 5,000; PB +4)

Actions

Multiattack. Mother Ash makes three attacks, using Thorn Nails or Bitter Milk in any combination. It can replace one attack with a use of (A) Rotten Umbilical or (B) Spellcasting to cast Ray of Sickness.

Thorn Nails. Melee Attack Roll: +8, reach 5 ft. 13 (2d8 + 4) Piercing damage plus 7 (2d6) Poison damage.

Bitter Milk. Ranged Attack Roll: +8, range 60 ft. 17 (3d8 + 4) Poison damage.

Rotten Umbilical. Constitution Saving Throw: DC 15, one creature within 60 feet. Failure: 19 (3d12) Poison damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. Mother Ash casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16, +8 to hit with spell attacks):

- At Will: Ray of Sickness
- 1/Day Each: Bestow Curse, Blight, Cloudkill

Barbed Afterbirth Tether (Recharge 5-6). Strength Saving Throw: DC 15, one creature within 30 feet. Failure: 24 (7d6) Poison damage, and the target has the Restrained condition until the end of its next turn.

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


**Flag, donor, path and the rows a later pass dropped**
```
[path] homebrew — Green Hag (resembles) — "pinned for probe C" (pinned)
[reskin] value check: "Barbed Afterbirth Tether (Recharge 5-6)" EV 23.1 vs floor 10.9 (one attack of 3) — dice 24 → 21 (scaled down to the ceiling); over the ceiling — gated Recharge 5-6
[reskin] signature authored: no template — the seat wrote it -> Actions/"Barbed Afterbirth Tether (Recharge 5-6)" ("Mother Ash points a thorn-nailed finger at a creature within 30 feet, and a knot of 
[reskin] signature miss: trait — "Mother Ash's body is a woven lattice of living thorn. When a creature within 5 feet hits her with a melee attack, the attacker must succeed on a Dexterity saving thro
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Barbed Afterbirth Tether" [no template]
```

---

## 02. Knell of the Plague-Bell — CR 3

**Input:** `a chapel bell-ringer's ghost that tolls for the dying`
**Donor:** lurker-1-phantom -> CR 3
**Signature:** library · **elapsed** 29s

### Block
```
Knell of the Plague-Bell

Medium Undead, Neutral

AC 12
Initiative +3 (13)

HP 44 (8d8 + 8)

Speed 5 ft., Fly 50 ft. (hover)

MOD
SAVE
STR
1
-5
-5
INT
10
+0
+0
MOD
SAVE
DEX
16
+3
+5
WIS
10
+0
+0
MOD
SAVE
CON
13
+1
+1
CHA
11
+0
+0

Skills Stealth +5

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 10

Languages Common plus the languages it knew in life

CR 3 (XP 700; PB +2)

Traits

Incorporeal Movement. The knell can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the knell has Disadvantage on ability checks and attack rolls.

Actions

Bell-Hands. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 9 (2d8) Necrotic damage.

Dirge of the Dying (Recharge 5-6). Constitution Saving Throw: DC 13, each creature in a 15-foot Cone. Failure: The target has the Deafened condition until the end of its next turn.

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


**Flag, donor, path and the rows a later pass dropped**
```
[path] homebrew — Ghost (resembles) — "pinned for probe C" (pinned)
[reskin] value check: "Dirge of the Dying" EV 25.3 vs floor 12 (one attack of 1) — widened to a 15-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but
[reskin] signature authored: no template — the seat wrote it -> Actions/"Dirge of the Dying" ("The knell tolls the name of one creature it can see within 60 feet. The target makes a Charisma saving th
[reskin] signature miss: trait — "When the knell hits a creature with its Bell-Hands attack, the target must succeed on a Constitution saving throw or have its hit point maximum reduced by an amount e
```

---
