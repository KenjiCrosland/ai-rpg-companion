# Probe B — the hallmark as a seat: eight sheets

For Fable 5.2 and the owner, 2026-11-14. Nothing shipped. Four prompts, each **once with the
element injected and once without**, all on a **pinned homebrew** path.

```
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs v-probeb
```
Batch `scripts/smoke-batches/v-probeb.json`; run `v-probeb-2026-11-15T02-59-40`.

The injection is a localStorage override (`statblock-inject-elements`) read beside the edition,
the legacy flag and `statblock-pin-path`. Nothing in the product sets it and every run that
uses it prints `[probe] SIGNATURE ELEMENT INJECTED … this is an evidence run, not product
behaviour`.

**A trap worth recording: the smoke runner SETS flags and never clears them.** The first run of
this batch had all eight sheets injected, because each baseline entry inherited the previous
entry's element. The baselines now set the flag to `""` explicitly. Any future batch that
toggles a flag has to do the same.

| # | prompt | element | sheet |
|---|---|---|---|
| 01 | clockwork spider | fires a line of tar that binds prey like a web | Brass Vermin-Catcher |
| 02 | clockwork spider | — (baseline) | Escaped Watchmaker's Hunter |
| 03 | medusa sculptor | a gaze that turns the living to stone | Ysolde the Quarrier |
| 04 | medusa sculptor | — (baseline) | Vessaline the Gallery |
| 05 | vampire pirate | drinks blood and is mended by it | Mother Bile |
| 06 | vampire pirate | — (baseline) | Brinebound Corsair |
| 07 | mummy librarian | a rotting touch that will not heal | Overdue Curator |
| 08 | mummy librarian | — (baseline) | Callix the Stacks |

---


## 01. Brass Vermin-Catcher — CR 2

**Input:** `clockwork spider`
**Donor:** brute-5-juggernaut -> CR 2
**Signature:** library · **elapsed** 30s

### Block
```
Brass Vermin-Catcher

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

Immunities Lightning, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 12

Languages Understands the languages of its creator but can't speak

CR 2 (XP 450; PB +2)

Traits

Mainspring Rewind. While it is not grappling or restraining a creature, the vermin-catcher's movement never spends a separate resource of its own; its Speed is unaffected by Difficult Terrain, the Prone condition, or a failed save against being knocked back.

Lightning Absorption. Whenever the vermin-catcher is subjected to Lightning damage, it takes no damage and instead regains a number of Hit Points equal to the Lightning damage dealt.

Immutable Form. The vermin-catcher can't shape-shift.

Magic Resistance. The vermin-catcher has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The vermin-catcher makes two Fangs attacks.

Fangs. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage.

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


**Seat and signature trace**
```
[reskin] seats: package <- "fires a line of tar that binds prey like a web"
[reskin] signature idea (action): "The vermin-catcher fires a braided wire cable that splashes into a bead of black tar, which snaps taut and spreads across the target's limbs, Restraining it. The line stays fast to the 
[reskin] value check: "Caught Line (Recharge 5-6)" EV 3.9 vs floor 3.6 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: snare -> Actions/"Caught Line (Recharge 5-6)" ("fires a braided wire cable that snaps taut and spreads across the target's limbs [shape fit, no verb match]")
[reskin] signature idea (trait): "The vermin-catcher's mainspring is slack only a moment: while it is not grappling or restraining a creature, it spends its movement winding itself back up, and any speed lost this way ca
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Mainspring Rewind" ("The vermin-catcher's mainspring is slack only a moment: while it is not grappling or restraining a creature, it spends 
[reskin] free-row budget by card size: CR 2 sits in band 0-2, where print runs 1-4 rows (p20-p90, Multiattack excluded); this card already carries 4 fixed row(s), so the free-row budget is 0 rather than 1 — the card is a
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Mainspring Rewind" [no template]
[reskin] signature tally: 1 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
```

---

## 02. Escaped Watchmaker's Hunter — CR 2

**Input:** `clockwork spider`
**Donor:** brute-5-juggernaut -> CR 2
**Signature:** library · **elapsed** 29s

### Block
```
Escaped Watchmaker's Hunter

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

Immutable Form. The watchmaker's hunter can't shape-shift.

Magic Resistance. The watchmaker's hunter has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The watchmaker's hunter makes two Mandible attacks.

Mandible. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage.

Brass Snare (Recharge 5-6). Dexterity Saving Throw: DC 13, one Large or smaller creature the watchmaker's hunter can see within 30 feet. Failure: The target is caught in wire and has the Restrained condition until the wire is destroyed (AC 10; HP 5; Vulnerability to Force damage; Immunity to Poison and Psychic damage).

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


**Seat and signature trace**
```
[reskin] seats: action <- "reeling snared prey off their feet" | trait <- "hardened wire spinneret"
[reskin] signature idea (action): "The hunter fires a looping filament of hardened brass wire whose end snags the target's legs; on a failed Strength saving throw the creature is Restrained as the wire binds its shins to
[reskin] value check: "Brass Snare (Recharge 5-6)" EV 3.9 vs floor 3.6 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: snare -> Actions/"Brass Snare (Recharge 5-6)" ("a looping filament snags the target's legs and Restrains it; the wire holds fast [verb: bind:idea]")
[reskin] signature idea (trait): "Brass hooks and clinging spinneret pads let the watchmaker's hunter move up sheer walls and across ceilings without a check, its trailing wire anchoring it as it scuttles sideways over a
[reskin] signature miss: trait — "Brass hooks and clinging spinneret pads let the watchmaker's hunter move up sheer walls and across ceilings without a check, its trailing wire anchoring it as it scuttles sideways over a
[reskin] free-row budget by card size: CR 2 sits in band 0-2, where print runs 1-4 rows (p20-p90, Multiattack excluded); this card already carries 4 fixed row(s), so the free-row budget is 0 rather than 1 — the card is a
[reskin] [gap] grab and reel the target in with the wire instead of only granting the creature surface movement — "Brass hooks and clinging spinneret pads let the watchmaker's hunter move up sheer walls and across ceilin
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
```

---

## 03. Ysolde the Quarrier — CR 6

**Input:** `medusa sculptor`
**Donor:** skirmisher-3-skulker -> CR 6
**Signature:** library · **elapsed** 28s

### Block
```
Ysolde the Quarrier

Medium Monstrosity, Neutral

AC 16
Initiative +4 (14)

HP 104 (16d8 + 32)

Speed 40 ft.

MOD
SAVE
STR
12
+1
+1
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
8
-1
-1

Skills Perception +4, Stealth +10

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Gallery Stride. Ysolde ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Ysolde makes two Chisel Claw attacks.

Chisel Claw. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Glare Stare. Wisdom Saving Throw: DC 15, one creature Ysolde can see within 60 feet. Failure: The target has the Frightened condition until the end of Ysolde's next turn. Success: The target is immune to this creature's gaze for 24 hours.

Dread Gaze. Wisdom Saving Throw: DC 15, each creature in a 30-foot Cone. Failure: The target has the Frightened condition until the end of Ysolde's next turn. Success: The target is immune to this creature's gaze for 24 hours.

Bonus Actions

Nimble Escape. Ysolde takes the Disengage or Hide action.

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


**Seat and signature trace**
```
[reskin] seats: package <- "a gaze that turns the living to stone"
[reskin] signature idea (action): "Ysolde fixes her gaze on a creature she can see and its flesh begins to seize and grey — *Constitution Saving Throw*. On a failure, the target is Restrained as its joints stiffen into c
[reskin] value check: "Quarrying Gaze" EV 2.9 vs floor 10.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Quarrying Gaze" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Dread Gaze" EV 23.1 vs floor 10.9 (one attack of 2) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage,
[reskin] library seed drawn: gaze-single -> Actions/"Dread Gaze" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Ysolde moves through her gallery as if it were empty air: when she starts her turn adjacent to a statue or similar stone object, she can vanish behind it, taking the Hide action even whi
[reskin] signature miss: trait — "Ysolde moves through her gallery as if it were empty air: when she starts her turn adjacent to a statue or similar stone object, she can vanish behind it, taking the Hide action even whi
[reskin] free-row budget by card size: CR 6 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is a
[reskin] signature tally: 1 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path homebrew
```

---

## 04. Vessaline the Gallery — CR 6

**Input:** `medusa sculptor`
**Donor:** skirmisher-8-hurler -> CR 6 (invented — no printed peer)
**Signature:** library · **elapsed** 30s

### Block
```
Vessaline the Gallery

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

False Appearance. While Vessaline remains motionless, Vessaline is indistinguishable from an ordinary gallery statue, and it blends seamlessly with any statue created by its Setting Gaze.

Sliding Stride. Vessaline ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Vessaline makes three attacks, using Chisel or Calipers in any combination. It can replace one attack with a use of Setting Gaze.

Chisel. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage.

Calipers. Ranged Attack Roll: +7, range 20/60 ft. 8 (1d8 + 4) Piercing damage. Hit or Miss: Immediately after the attack, a stone caliper returns to Vessaline's grasp.

Shattering Toss (Recharge 5-6). Vessaline hurls a stone caliper at a point it can see within 90 feet. Dexterity Saving Throw: DC 14, each creature in a 5-foot-radius Sphere centered on that point. Failure: 36 (8d8) Bludgeoning damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Setting Gaze. Dexterity Saving Throw: DC 14, one Huge or smaller creature Vessaline can see within 60 feet. Failure: The target is caught in stone and has the Restrained condition until the stone is destroyed (AC 12; HP 15; Vulnerability to Bludgeoning damage; Immunity to Poison and Psychic damage).

Bonus Actions

Fleet Agility. Vessaline takes the Dash or Disengage action.

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


**Seat and signature trace**
```
[reskin] seats: action <- "pose-by-pose petrification into a gallery" | trait <- "the serpent-crowned sculptress"
[reskin] signature idea (action): "Vessaline fixes her gaze on one creature she can see and begins posing it: the target makes a Constitution saving throw as stone creeps up from wherever it was last struck. On a failure
[reskin] value check: "Setting Gaze" EV 6.1 vs floor 5.7 (one attack of 3) — worth the trade
[reskin] signature template: snare -> Actions/"Setting Gaze" ("fixing her gaze on one creature and posing it while stone creeps over it, restra [shape fit, no verb match]")
[reskin] signature idea (trait): "Vessaline can pass without trace as an ordinary gallery statue whenever she holds perfectly still, and she is always aware of any creature within her gallery that has been turned to ston
[reskin] signature template (trait): false-appearance -> Traits/"False Appearance" ("Vessaline can pass without trace as an ordinary gallery statue whenever she hold [verb: statue:idea, still:idea, stone:idea, ordinary:i
[reskin] free-row budget by card size: CR 6 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is a
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "False Appearance" [trait/always/defense]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
```

---

## 05. Mother Bile — CR 8

**Input:** `vampire pirate`
**Donor:** brute-8-grappler -> CR 8
**Signature:** library · **elapsed** 31s

### Block
```
Mother Bile

Medium Undead, Neutral Evil

AC 15
Initiative -1 (9)

HP 150 (20d8 + 60)

Speed 40 ft., Swim 40 ft.

MOD
SAVE
STR
20
+5
+8
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
12
+1
+1
MOD
SAVE
CON
17
+3
+6
CHA
6
-2
-2

Skills Athletics +8, Perception +4

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages None

CR 8 (XP 3,900; PB +3)

Traits

Blood-Tide Sense. Mother Bile can pinpoint the location of open wounds and Poisoned blood within 60 feet of itself.

Actions

Multiattack. Mother Bile makes two Drowned Saber attacks.

Drowned Saber. Melee Attack Roll: +8, reach 5 ft. 15 (3d6 + 5) Slashing damage plus 11 (2d10) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16). While Grappled, the target has the Restrained condition. If the target is a creature and isn't already Poisoned by this creature, it is subjected to the following effect. Constitution Saving Throw: DC 16. Failure: The target has the Poisoned condition. While Poisoned this way, the target can't regain Hit Points. The condition lasts until the target finishes a Long Rest or is cured by the Lesser Restoration spell or similar magic. Success: The target is immune to this creature's contagion for 24 hours.

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


**Seat and signature trace**
```
[reskin] seats: package <- "drinks blood and is mended by it"
[reskin] signature idea (action): "When the Drowned Saber attack hits a creature that has the Grappled or Restrained condition, Mother Bile's grave-tainted spittle floods the wound: the target must make a Constitution sa
[reskin] signature rider: contagion -> Drowned Saber (appended; Constitution save on hit or the target is Poisoned, and while Poisoned this way  [shape fit, no verb match])
[reskin] signature idea (trait): "Mother Bile senses the blood-tide in living veins, so it has no trouble finding a wounded creature: it always knows the direction and distance to any creature within range that is Bloodi
[reskin] signature template (trait): uncanny-sense -> Traits/"Blood-Tide Sense" ("The idea is that Mother Bile always knows the direction and distance to Bloodied [verb: senses:idea, blood:idea]")
[reskin] [gap] senses the direction and distance to wounded or poisoned creatures through walls and fog — "Mother Bile senses the blood-tide in living veins, so it has no trouble finding a wounded creature: it always kno
[reskin] signature tally: 1 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 1 · path homebrew
```

---

## 06. Brinebound Corsair — CR 8

**Input:** `vampire pirate`
**Donor:** skirmisher-8-hurler -> CR 8 (invented — no printed peer)
**Signature:** library · **elapsed** 40s

### Block
```
Brinebound Corsair

Medium Undead, Neutral Evil

AC 17
Initiative +5 (15)

HP 135 (18d8 + 54)

Speed 40 ft., Swim 40 ft.

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

Saltcured Mending. While the corsair is submerged or in a square of water, at the start of each of its turns, the corsair regains 7 (2d6) Hit Points.

Tideborne Stride. The corsair ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The corsair makes three attacks, using Cutlass or Grappling Hook in any combination. It can replace one attack with a use of Brine-Drunk Cut.

Cutlass. Melee Attack Roll: +8, reach 5 ft. 8 (1d6 + 5) Slashing damage plus 6 (1d12) Necrotic damage.

Grappling Hook. Ranged Attack Roll: +8, range 20/60 ft. 14 (2d8 + 5) Piercing damage. Hit or Miss: Immediately after the attack, its barbed grappling hook returns to the corsair's grasp.

Hooked Chain (Recharge 5-6). The corsair hurls its barbed grappling hook at a point it can see within 90 feet. Dexterity Saving Throw: DC 15, each creature in a 5-foot-radius Sphere centered on that point. Failure: 49 (14d6) Piercing damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Brine-Drunk Cut. Constitution Saving Throw: DC 15, one creature within 5 feet. Failure: 17 (5d6) Necrotic damage, and the target has the Poisoned condition until the end of its next turn.

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


**Seat and signature trace**
```
[reskin] seats: action <- "dragging prey down to be drained" | trait <- "salt-cured undead corsair"
[reskin] signature idea (action): "The corsair rakes its cutlass across a creature it has hooked or that is already bleeding, and the brine in the wound drinks deep — the target makes a Constitution saving throw; on a fa
[reskin] value check: "Brine-Drunk Cut" EV 11.4 vs floor 7.8 (one attack of 3) — worth the trade
[reskin] signature authored: no template — the seat wrote it -> Actions/"Brine-Drunk Cut" ("The corsair rakes its cutlass across a creature it has hooked or that is already bleeding, and the brine in the wound drinks dee
[reskin] signature idea (trait): "The corsair's brine-cured hide is a dead, salt-crusted thing that neither bleeds nor burns clean; whenever it starts its turn in contact with the sea — submerged, drenched by surf or rai
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Saltcured Mending" ("The corsair's brine-cured hide is a dead, salt-crusted thing that neither bleeds nor burns clean; whenever it starts it
[reskin] free-row budget by card size: CR 8 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is a
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Saltcured Mending" [no template]
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
```

---

## 07. Overdue Curator — CR 3

**Input:** `mummy librarian`
**Donor:** skirmisher-8-hurler -> CR 3 (invented — no printed peer)
**Signature:** library · **elapsed** 34s

### Block
```
Overdue Curator

Medium Undead, Lawful Neutral

AC 15
Initiative +3 (13)

HP 60 (8d8 + 24)

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
16
+3
+5
WIS
14
+2
+4
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

Skills Perception +4, Stealth +5

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages Common plus the languages it knew in life

CR 3 (XP 700; PB +2)

Traits

Seeped Rot. If the curator starts its turn within reach of a creature that has the Frightened or Poisoned condition or the Prone condition, the curator regains 4 (1d8) Hit Points.

Shelf Stalker. The curator ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The curator makes two attacks, using Bandaged Fist or Cataloged Tablet in any combination.

Bandaged Fist. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 3 (1d6) Necrotic damage.

Cataloged Tablet. Ranged Attack Roll: +5, range 20/60 ft. 7 (1d8 + 3) Bludgeoning damage.

Shelf Collapse (Recharge 5-6). The curator hurls a cataloged tablet at a point it can see within 90 feet. Dexterity Saving Throw: DC 12, each creature in a 5-foot-radius Sphere centered on that point. Failure: 18 (4d8) Necrotic damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Bonus Actions

Fleet Agility. The curator takes the Dash or Disengage action.

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


**Seat and signature trace**
```
[reskin] seats: package <- "a rotting touch that will not heal"
[reskin] signature idea (action): "The curator presses a dry, bandage-wrapped palm to a creature's wound and intones the archive's rejection of a damaged folio. *Constitution Saving Throw*: Failure leaves the target's fl
[reskin] value check: "Rejected Folio" EV 5 vs floor 4.2 (one attack of 2) — worth the trade
[reskin] signature authored: no template — the seat wrote it -> Actions/"Rejected Folio" ("The curator presses a dry, bandage-wrapped palm to a creature's wound and intones the archive's rejection of a damaged folio. *Co
[reskin] signature idea (trait): "Its body refuses to dry out fully: if the curator starts its turn within reach of a creature that is Frightened, Poisoned, or has the Prone condition, the stolen rot seeps back into it a
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Seeped Rot" ("Its body refuses to dry out fully: if the curator starts its turn within reach of a creature that is Frightened, Poisoned, or 
[reskin] free-row budget by card size: CR 3 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is a
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Seeped Rot" [no template]
[reskin] signature tally: 1 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
```

---

## 08. Callix the Stacks — CR 3

**Input:** `mummy librarian`
**Donor:** caster-8-binder -> CR 3
**Signature:** library · **elapsed** 30s

### Block
```
Callix the Stacks

Medium Undead, Lawful Neutral

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

Multiattack. Callix makes two attacks, using Tomb-Tablet or Strike Wraps in any combination. It can replace one attack with a use of Grave-Cold Catalog.

Strike Wraps. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage plus 5 (1d10) Necrotic damage.

Tomb-Tablet. Ranged Attack Roll: +5, range 60 ft. 10 (2d6 + 3) Necrotic damage.

Grave-Cold Catalog. Constitution Saving Throw: DC 12, one creature within 60 feet. Failure: 11 (2d10) Necrotic damage, and the target has the Deafened condition until the end of its next turn.

Spellcasting. Callix casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 13):

- At Will: Mage Hand, Detect Magic
- 1/Day Each: Bestow Curse, Hold Person

Cerecloth Snare (Recharge 5-6). Dexterity Saving Throw: DC 12, one Large or smaller creature Callix can see within 60 feet. Failure: The target is caught in cerecloth and has the Restrained condition until the cerecloth is destroyed (AC 10; HP 10; Vulnerability to Fire damage; Immunity to Poison and Psychic damage).

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


**Seat and signature trace**
```
[reskin] seats: action <- "recited funerary formula that curses and entangles" | trait <- "dried ceremonial wrappings that bind and strangle"
[reskin] signature idea (action): "Callix unwinds a strip of its own cerecloth and reads a name from the tomb-index aloud, and the loose linen leaps to that trespasser, whipping around wrists and throat. The target is Re
[reskin] value check: "Cerecloth Snare (Recharge 5-6)" EV 6.6 vs floor 6.2 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: snare -> Actions/"Cerecloth Snare (Recharge 5-6)" ("loose linen leaps to the trespasser, whipping around wrists and throat; the targ [verb: bind:idea]")
[reskin] signature idea (trait): "Callix's wrappings remember the shape of every corpse they have catalogued; when it is Bloodied, the loose ends stiffen into grasping cords, and any creature that starts its turn within 
[reskin] signature miss: trait — "Callix's wrappings remember the shape of every corpse they have catalogued; when it is Bloodied, the loose ends stiffen into grasping cords, and any creature that starts its turn within 
[reskin] free-row budget by card size: CR 3 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is a
[reskin] [gap] a start-of-turn aura whose failed save Restrains the target instead of applying a minor listed condition — "Callix's wrappings remember the shape of every corpse they have catalogued; when it is Bloodied, 
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
```

---
