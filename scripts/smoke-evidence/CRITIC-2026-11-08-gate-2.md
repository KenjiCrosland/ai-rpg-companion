# For the critic — gate 2, 2026-11-08 (forty `sweep-2026-11-08T23-27-58`)

Your last read said: *"landing §2a ships at 0 Fix."* Everything in §2a is now landed, plus 1d
and 1e. This forty is the first generated with all of it in. It tests your claim; it is not a
request for a second opinion on the same blocks.

Run: `smoke-out/sweep-2026-11-08T23-27-58/` (40 sheets). Gate: `scripts/smoke-evidence/CHECK-sweep-2026-11-08T23-27-58.md`.
Every number below is **measured** on saved runs unless marked *(recalled)*.

## 1. What landed since your gate, and which of your Fixes each closes

| item | your Fix | what changed | proof |
|---|---|---|---|
| 1a sheet lints reach the pipeline | #18, #26 | `lintSheet` runs in the pipeline; a replace option is dead by its spell | `offlist-spell-repair.spec.js`, `sheet-lints.spec.js` |
| 1b an authored Emanation names its origin | #25 | `originating from <anchor>` on both printings; Cone/Line NOT anchored — print refuses it 0/55 and 0/24 | `emanation-anchor.spec.js` |
| 1c an authored row that is not free can still be repaired | #16 | repair selects `freeRow \|\| authored` | `r4-seat-authors.spec.js` |
| **1d the GM's ask is not a free row** | #17 (§6) | a seat-authored row answering `idea.clause` is never marked free; the free-row budget cannot evict it; card ceiling still governs | `sheet-budgets.spec.js` (4 tests) |
| **1e print's attack list is locked on a print body** | #17 (§2b), #01 | print's unmapped tail attack rows are added before the Multiattack is pasted (twist/exact only); a chassis Multiattack is stripped where print has none AND print's CR governs | `print-attack-list.spec.js` (7 tests) |

Earlier the same day, from your §1: the pool form for a shed row (#17), the audit rewrite arm
(dead since written), flaw-row credit, the gated floor at 0.85, the subject-flip gate.

## 2. The forty's gate: 4 reports, 0 real defects of the kind you score

`check-run` says **4 blocks with a FAIL of 40** (the prior gate was 1). I traced all four before
sending. None of the four rules fired on any of the three prior fortys (0/0/0 each), so I treated
them as suspect and read the mechanism, not the label.

| sheet | rule | what actually happened | class |
|---|---|---|---|
| **#29** Swarm of Peal of the Dyings (CR 13) | `dangling-ref`: Multiattack cites "Peal", not a row | the row is **"Peal for the Dying"**, present and correct — a row 1d now protects. The checker's citation regex lists the connectors `of/the/and/in/to/from/at/on/with/upon` and **lacks `for`**, so it cut the name. Print has 0 row names containing " for ", so this path was never exercised. 2 such names in 160 sheets. | checker false positive |
| **#31** Rolling Thunder Drake (CR 7) | `two-novas`: Thunder Wall + Thunder Dive | the engine's one-nova rule un-gated "Thunder Dive (1/Day)" to "Thunder Dive" and traced it. The checker still reads it as a nova because `TEXT_GATE` matches **"drops to 0 Hit Points"** — which here is the *execute* template's EFFECT, not a use limit. Engine (`nameGateOf`) and checker (`gateOf \|\| TEXT_GATE`) hold two copies of the predicate. 1 instance in 160. | engine/checker disagreement — **your call below** |
| **#33** Reed-Temple Watcher (CR 5, 2014) | `kit-lands`: the monk kit landed no row | it did: **Unarmed Strike carries the Stunning Strike clause**. The kit stamped its receipt on "Claw"; print canon renamed Claw → Shortsword, the class-weapon pass renamed Shortsword → Unarmed Strike, and the `kit` stamp did not follow. The sheet is right; the receipt is lost. Pre-existing ordering class (kit pass before print canon). | checker false positive |
| **#28** Ilvareth Dusksong (CR 12, 2014) | `vocab-register`: "may" | an authored trait ("Umbral Unseen") whose 2024 copy says "may" where its 2014 copy says "can" — the two printings of one row disagree. 1 instance. | real, minor prose slip |

**1d is implicated in exactly one of these — #29 — and only by putting a correct row on the
sheet that the checker could not read.** 1e's strip fired once this forty (Dire Wolf #01,
soft, no FAIL). The Pit Fiend (#17) carries Bite, Devilish Claw and Fiery Mace.

I will fix the `for` connector and the lost `kit` stamp as checker/receipt repairs. I am not
touching #31 or #28 without your read.

## 3. The number the bar reads: 73% → 78%, sweep 1 of 3

`clause-rate.mjs 3` over T05 / T09 / **T23**: **109/140 = 78%** (27 always, 19 coin-flip, 3 never).
Before 1d it read 107/146 = 73%. 1d's predicted prize was 7 hits over three sweeps = +5 points;
this is the first post-1d sweep in the window, so the direction is right and the size is not
yet proven. Two more sweeps before anyone calls it.

Never-answered is **3** (bar ≤ 2): #08 Breachwrought "a siege engine golem of lashed timber",
#14 Winterheart "a glacier's heart given legs", #16 Brass Anvil-Tyrant "a tyrant of burning
brass". All three are body/material descriptions the extraction files mechanical. *(recalled:
the 11-06 scoping ruling excludes descriptive; these are labelled mechanical, so they count.)*

## 4. Three of our own premises we refuted today, with the numbers

You asked us last time to say which of your items we refuted; this time it is three of ours.

- **1d's first count was wrong.** I reported "26 of 34 free-row evictions threw away a GM-asked
  row." That conflated *seat-authored* with *answers a GM clause*. Read off
  `checkBlock().fidelity.dropped` — the list the bar scores — **7 of 34** evictions cost a clause
  hit (6 were credited anyway by another row, 13 carried no clause). Prize 7 of 39 misses, not 26.
- **The Skeleton was not an exposure for 1e.** The handoff named it 3 of 3 for "ships a
  Multiattack print lacks". Those sheets are CR 6 on a `brute-5` donor borrowing only the
  Skeleton's row NAMES; the pool Multiattack is correct for CR 6. The strip is gated on
  `nearPrintCr` because of this. Real exposure: the Dire Wolf alone.
- **1f's diagnosis is wrong.** The plan said class beats route by fixed precedence. Same input
  ("a chapel bell-ringer's ghost that tolls for the dying") three runs: the PATH CALL decided
  "twist on the Ghost" twice and "class_npc on the Priest" once. The engine honours the call;
  the call flips. The proposed discriminator (non-Humanoid route type) is 4 of 120 sheets and
  **3 of the 4 are Brother Halric**, whom the item itself says rightly gets the Priest. 1f is a
  prompt fix with exposure 1 in 120.

## 5. Questions for you

1. **Is an execute row a nova?** (#31) Thunder Dive: save, damage, "if the target has 18 HP or
   fewer it drops to 0". The engine's one-nova rule treated it as a second nova and un-gated it;
   the checker reads the execute effect as a gate and reports two. If execute is NOT a nova, the
   checker's `TEXT_GATE` should not read "drops to 0 Hit Points" as a limit. If it IS, the
   engine should refuse to un-gate it. One predicate, not two — which?
2. **The handed tier.** 2 of the 7 clause-costing evictions came through `gmAsked`'s third tier
   (a seat HANDED an unanswered clause), whose own trace says it "buys no coverage credit". 1d
   does not reach them. Should a handed clause protect a row the way a quoted one does? Worth 2
   hits over three sweeps.
3. **1h next?** Ally-adjacency clauses (shield wall, never breaks ranks, sings in one voice) are
   classified mechanical 8 of 9 times and nothing answers them. 5 of the 39 misses. The plan's
   shape is one trait template, `effect: 'defense'`, print's grammar (Pack Tactics / Aura of
   Authority are the pieces). Your view on the shape before Opus builds it.

## 6. Where to look

- Pit Fiend with all three rows: `smoke-out/sweep-2026-11-08T23-27-58/17-*.md` lines near
  `print canon attack:` / `print canon row:`.
- 1d protecting a row: grep `authored row answers the GM` — 10 sheets this forty.
- The four FAILs: #28, #29, #31, #33 in the same directory; the mechanisms above are read from
  their traces and JSON, not inferred.

---

# 7. The forty — blocks only, traces stripped

Same order as `sweep.json`. Each block is the shipped sheet; the trace for any of them is in `smoke-out/sweep-2026-11-08T23-27-58/<nn>-*.md` under `### Trace`. Gate verdicts per block are in the CHECK file named in §2.

## 01. Dire Wolf — CR 1

**Input:** `name: Dire Wolf | with a frost-rimed hide`

```
Dire Wolf

Large Beast, Unaligned

AC 14
Initiative +2 (12)

HP 22 (3d10 + 6)

Speed 50 ft.

MOD
SAVE
STR
17
+3
+3
INT
3
-4
-4
MOD
SAVE
DEX
15
+2
+4
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
7
-2
-2

Skills Perception +5, Stealth +4

Resistances Cold

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 1 (XP 200; PB +2)

Traits

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Concussive Slam. Constitution Saving Throw: DC 13, one creature within 5 feet. Failure: 6 (1d12) Bludgeoning damage.

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

## 02. Bog Hound — CR 1

**Input:** `a mud-caked bog hound that drags fishermen under`

```
Bog Hound
Medium beast, unaligned
Armor Class

11 (natural armor)

Hit Points: 

22 (3d8 + 9)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


12 (+1)

	

8 (-1)

	

16 (+3)

	

4 (-3)

	

10 (+0)

	

4 (-3)

Skills: 

Athletics +3, Perception +2

Saving Throws: 

STR +3

Senses: 

darkvision 30 ft., passive Perception 12

Languages: 

None

Challenge

1 (200 XP)

Proficiency Bonus:

+2

Mud-Caked Hide.While in bog or marsh terrain, the bog hound has advantage on Dexterity (Stealth) checks made to hide, and it can move through difficult terrain made of mud, water, or reeds without expending extra movement.
Whelm (Bonus Action).The bog hound whelms one Medium or smaller creature it is grappling. While whelmed, the target is blinded and restrained, has Total Cover against attacks and other effects outside the bog hound, and takes 3 (1d6) bludgeoning damage at the start of each of the bog hound's turns. The bog hound can have only one creature whelmed at a time. If the bog hound takes 5 damage or more in a single turn from the whelmed creature, the bog hound must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the bog hound. If the bog hound dies, a whelmed creature pulls free prone by using 5 feet of movement.

Actions
Multiattack: The bog hound makes two Bite attacks.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained.
```

## 03. Owlbear — CR 3

**Input:** `name: Owlbear | that has learned to climb`

```
Owlbear
Large monstrosity, unaligned
Armor Class

13 (natural armor)

Hit Points: 

59 (7d10 + 21)

Speed: 

40 ft., climb 30 ft.

STR	DEX	CON	INT	WIS	CHA


20 (+5)

	

12 (+1)

	

17 (+3)

	

3 (-4)

	

12 (+1)

	

7 (-2)

Skills: 

Perception +5

Saving Throws: 

DEX +3

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

None

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Spider Climb.The owlbear can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The owlbear makes two Rend attacks. It can replace one attack with a use of Hooking Gaze.
Rend: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.
Hooking Gaze: One creature within 60 feet must make a DC 15 Constitution saving throw. On a failed save, the target's Speed is halved and it can't take Reactions until the end of the owlbear's next turn.
```

## 04. Chapel Bell-Ringer — CR 3

**Input:** `a chapel bell-ringer's ghost that tolls for the dying`

```
Chapel Bell-Ringer

Medium Undead, Neutral

AC 11
Initiative +1 (11)

HP 45 (10d8)

Speed 5 ft., Fly 40 ft. (hover)

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

Skills Perception +3, Stealth +5

Resistances Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus one other language

CR 3 (XP 700; PB +2)

Traits

Aura of Truth. Charisma Saving Throw: DC 13, any creature that starts its turn in a 15-foot Emanation originating from the chapel bell-ringer. Failure: Until the start of its next turn, the target can't speak a deliberate lie.

Ethereal Sight. The chapel bell-ringer can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The chapel bell-ringer can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The chapel bell-ringer makes two Withering Touch attacks. It can replace one attack with a use of Funeral Knell.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Funeral Knell. Dexterity Saving Throw: DC 13, one creature within 60 feet. Failure: 13 (3d8) Necrotic damage.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the chapel bell-ringer and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the chapel bell-ringer's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the chapel bell-ringer can see within 5 feet. Failure: The target is possessed by the chapel bell-ringer; the chapel bell-ringer disappears, and the target has the Incapacitated condition and loses control of its body. The chapel bell-ringer now controls the body, but the target retains awareness. The chapel bell-ringer can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The chapel bell-ringer's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the chapel bell-ringer leaves as a Bonus Action. When the possession ends, the chapel bell-ringer appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The chapel bell-ringer casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The chapel bell-ringer is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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

## 05. Air Elemental — CR 5

**Input:** `name: Air Elemental | that carries stolen voices`

```
Air Elemental

Large Elemental, Neutral

AC 15
Initiative +5 (15)

HP 90 (12d10 + 24)

Speed 10 ft., Fly 90 ft. (hover)

MOD
SAVE
STR
14
+2
+2
INT
6
-2
-2
MOD
SAVE
DEX
20
+5
+8
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
6
-2
-2

Skills Perception +3, Stealth +11

Resistances Bludgeoning, Lightning, Piercing, Slashing

Immunities Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious

Senses darkvision 60 ft.; Passive Perception 13

Languages Primordial (Auran)

CR 5 (XP 1,800; PB +3)

Traits

Chorus of the Dying Breath. A creature dies within the air elemental's reach, the air elemental regains 9 (2d8) Hit Points, its Thunderous Slam deals extra Thunder damage until the end of its next turn, and it gains Advantage on Charisma (Intimidation) checks and can mimic that creature's voice as long as the chorus lasts.

Air Form. The air elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The air elemental makes two Thunderous Slam attacks.

Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.

Whirlwind (Recharge 4-6). Strength Saving Throw: DC 13, one Medium or smaller creature in the air elemental's space. Failure: 24 (4d10 + 2) Thunder damage, and the target is pushed up to 20 feet straight away from the air elemental and has the Prone condition. Success: Half damage only.

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

## 06. Scree Tide — CR 5

**Input:** `a quarry-pit thing of living scree that buries what it catches`

```
Scree Tide
Large elemental, neutral
Armor Class

13 (natural armor)

Hit Points: 

93 (11d10 + 33)

Speed: 

30 ft., burrow 30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

8 (-1)

	

16 (+3)

	

4 (-3)

	

10 (+0)

	

4 (-3)

Skills: 

Athletics +6, Perception +3

Saving Throws: 

STR +6

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

tremorsense 60 ft., passive Perception 13

Languages: 

None

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Burial Churn.While the tide has a creature grappled, the tide grinds the caught creature into the stone: at the start of each of the tide's turns, the grappled creature takes 9 (2d8) bludgeoning damage and is pulled up to 5 feet into the earth or rubble beneath the tide.
Earth Glide.The tide can burrow through nonmagical, unworked earth and stone. While doing so, the tide doesn't disturb the material it moves through. It can move through a space as narrow as 1 inch without expending extra movement to do so.
Smother (Bonus Action).The tide smothers one Medium or smaller creature it is grappling. While smothered, the target is blinded and restrained, has Total Cover against attacks and other effects outside the tide, and takes 7 (2d6) thunder damage at the start of each of the tide's turns. The tide can have only one creature smothered at a time. If the tide takes 15 damage or more in a single turn from the smothered creature, the tide must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the tide. If the tide dies, a smothered creature pulls free prone by using 5 feet of movement.

Actions
Multiattack: The tide makes two Rubble Grasp attacks.
Rubble Grasp: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained.
Scree Slide (Recharge 5-6): Each creature in a 5-foot-long, 5-foot-wide line must make a DC 14 Strength saving throw, taking 17 (5d6) bludgeoning damage on a failed save. On a failed save, the target is also pushed up to 5 feet straight away from the tide and is knocked prone.
```

## 07. Hydra — CR 8

**Input:** `name: Hydra | whose stumps smoke instead of regrowing`

```
Hydra
Huge monstrosity, unaligned
Armor Class

15 (natural armor)

Hit Points: 

184 (16d12 + 80)

Speed: 

40 ft., swim 40 ft.

STR	DEX	CON	INT	WIS	CHA


20 (+5)

	

12 (+1)

	

20 (+5)

	

2 (-4)

	

10 (+0)

	

7 (-2)

Skills: 

Perception +6

Saving Throws: 

STR +8, CON +8

Condition Immunities: 

blinded, charmed, deafened, frightened, stunned, unconscious

Senses: 

darkvision 60 ft., passive Perception 16

Languages: 

None

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Smoking Stumps.Any creature that starts its turn in a 10-foot radius originating from the hydra must make a DC 16 Constitution saving throw. On a failed save, the target is poisoned until the end of its next turn. On a successful save, the target is immune to this creature's aura for 24 hours.
Hold Breath.The hydra can hold its breath for 1 hour.
Multiple Heads.The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead.
Reactive Heads.For each head the hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks.

Actions
Multiattack: The hydra makes as many Bite attacks as it has heads.
Bite: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.
Stump Smog: The hydra fills a 15-foot-radius sphere centered on a point it can see within 60 feet. The area is Lightly Obscured and Difficult Terrain until the start of the hydra's next turn. A creature that enters the area or starts its turn there takes 13 (3d8) poison damage.
```

## 08. Breaching Timber Golem — CR 8

**Input:** `a siege-engine golem of lashed timber that shoulders through walls`

```
Breaching Timber Golem

Large Construct, Neutral

AC 15
Initiative -1 (9)

HP 153 (18d10 + 54)

Speed 30 ft.

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
4
-3
-3

Skills Athletics +8, Perception +3

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Understands the languages of its creator but can't speak

CR 8 (XP 3,900; PB +3)

Traits

Immutable Form. The timber golem can't shape-shift.

Magic Resistance. The timber golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The timber golem makes two Timber Slam attacks.

Timber Slam. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage.

Shoulder Shove. Strength Saving Throw: DC 16, each creature in a 30-foot Cone. Failure: The target is pushed up to 15 feet away from the timber golem and has the Prone condition.

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

## 09. Stone Golem — CR 10

**Input:** `name: Stone Golem | carved as a weeping saint`

```
Stone Golem

Large Construct, Unaligned

AC 18
Initiative -1 (9)

HP 220 (21d10 + 105)

Speed 30 ft.

MOD
SAVE
STR
22
+6
+10
INT
3
-4
-4
MOD
SAVE
DEX
9
-1
-1
WIS
11
+0
+0
MOD
SAVE
CON
20
+5
+9
CHA
1
-5
-5

Skills Athletics +10, Perception +4

Immunities Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages Understands Common plus two other languages but can't speak

CR 10 (XP 5,900; PB +4)

Traits

Immutable Form. The stone golem can't shape-shift.

Magic Resistance. The stone golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The stone golem makes two attacks, using Slam or Force Bolt in any combination. It can replace one attack with a use of Toppling Blow.

Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.

Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.

Toppling Blow. Dexterity Saving Throw: DC 17, one creature within 30 feet. Failure: The target has the Prone condition.

Bonus Actions

Slow (Recharge 5-6). The stone golem casts the Slow spell, requiring no spell components and using Constitution as the spellcasting ability (spell save DC 17).

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

## 10. Drowned Choir — CR 10

**Input:** `a drowned cathedral choir that sings in one voice`

```
Drowned Choir
Large undead, neutral
Armor Class

16 (natural armor)

Hit Points: 

178 (21d10 + 63)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


14 (+2)

	

15 (+2)

	

17 (+3)

	

14 (+2)

	

15 (+2)

	

16 (+3)

Skills: 

Perception +6, Deception +7

Saving Throws: 

WIS +6, CHA +7

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

blindsight 60 ft. (blind beyond this radius), passive Perception 16

Languages: 

Common plus the languages it knew in life

Challenge

10 (5,900 XP)

Proficiency Bonus:

+4

Airless Antiphon.While a creature within 60 feet can hear the choir, the creature must hold its breath or take 10 (3d6) psychic damage at the start of each of its turns as phantom water fills its lungs.

Actions
Multiattack: The drowned choir makes three attacks, using Spectral Hands or Drowning Hymn. It can replace one attack with a use of Lung-Flooding Chord.
Spectral Hands: Melee Spell Attack: +7 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) necrotic damage.
Drowning Hymn: Ranged Spell Attack: +7 to hit, range 60 ft., one target. Hit: 16 (3d8 + 3) necrotic damage.
Lung-Flooding Chord: One creature within 60 feet must succeed on a DC 15 Constitution saving throw or take 18 (4d8) necrotic damage and be deafened until the end of its next turn.
Spellcasting: The drowned choir casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 15): - 1/day each: Blindness/Deafness, Hold Person, Fear, Hypnotic Pattern
One-Voice Hymn: Each creature of the drowned choir's choice in a 60-foot radius originating from the drowned choir that can see or hear the drowned choir must make a DC 15 Wisdom saving throw. On a failed save, the target is charmed until the end of its next turn, and while charmed this way, it must move toward the drowned choir by the safest available route on its turn and can't take Reactions. On a successful save, the target is immune to this creature's lure for 24 hours.
```

## 11. Vampire — CR 13

**Input:** `name: Vampire | who keeps a garden of thorns`

```
Vampire
Medium undead, lawful evil
Armor Class

16 (natural armor)

Hit Points: 

195 (23d8 + 92)

Speed: 

40 ft., climb 40 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

18 (+4)

	

18 (+4)

	

17 (+3)

	

15 (+2)

	

18 (+4)

Skills: 

Perception +7, Stealth +9

Saving Throws: 

STR +9, CON +9

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

13 (10,000 XP)

Proficiency Bonus:

+5

Legendary Resistance (3/Day, or 4/Day in Lair).If the vampire fails a saving throw, it can choose to succeed instead.
Misty Escape.If the vampire drops to 0 hit points outside its resting place, the vampire uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 hit points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and is paralyzed until it regains any hit points, and it regains 1 Hit Point after spending 1 hour there.
Spider Climb.The vampire can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Vampire Weakness.The vampire has these weaknesses: Forbiddance: the vampire can't enter a residence without an invitation from an occupant.
Running Water: the vampire takes 20 acid damage if it ends its turn in running water.
Stake to the Heart: If a weapon that deals piercing damage is driven into the vampire's heart while the vampire is incapacitated in its resting place, the vampire is paralyzed until the weapon is removed.
Sunlight: the vampire takes 20 radiant damage if it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks.
Shape-Shift (Bonus Action).If the vampire isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the vampire can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the vampire can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.
Charm (Recharge 5-6) (Bonus Action).The vampire casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The charmed target is a willing recipient of the vampire's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was charmed by the vampire.

Actions
Multiattack: The vampire makes two Grave Strike attacks and uses Bite.
Grave Strike: Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) from one of two hands.
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that has the grappled, incapacitated, or restrained condition must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) piercing damage on a failed save, plus 13 (3d8) necrotic damage. The target's Hit Point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a Vampire Spawn under the vampire's control.
Legendary Actions

The vampire can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The vampire regains spent legendary actions at the start of its turn.

Deathless Strike: The vampire moves up to half its Speed, and it makes one Grave Strike attack.
Beguile: The vampire casts Command, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17). The vampire can't take this action again until the start of its next turn.
```

## 12. Plague Archon — CR 13

**Input:** `a plague-bearing archon of flies that commands lesser swarms`

```
Plague Archon

Large Celestial, Lawful Neutral

AC 18
Initiative +5 (15)

HP 190 (20d10 + 80)

Speed 40 ft., Fly 80 ft.

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
+10
WIS
16
+3
+8
MOD
SAVE
CON
18
+4
+4
CHA
12
+1
+1

Skills Perception +8, Stealth +10

Resistances Radiant

Immunities Charmed

Senses darkvision 60 ft.; Passive Perception 18

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Plague Miasma. Constitution Saving Throw: DC 17, any creature that starts its turn in a 20-foot Emanation originating from the archon. Failure: The target has the Poisoned condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Skittering Flight. The archon doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.

Skittering Retreat. When a creature the archon can see ends its turn within 5 feet of it, the archon can move up to 10 feet without provoking Opportunity Attacks.

Actions

Multiattack. The archon makes three Claw attacks. It can replace one attack with a use of Scream of the Swarm.

Claw. Melee Attack Roll: +10, reach 10 ft. 14 (2d8 + 5) Slashing damage plus 10 (3d6) Necrotic damage. If the archon flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 7 (2d6) Slashing damage and, if it is Large or smaller, has the Prone condition.

Plague Dive (Recharge 5-6). The archon flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Dexterity Saving Throw: DC 17. Failure: 66 (12d10) Necrotic damage, and the target has the Prone condition. Success: Half damage.

Scream of the Swarm. Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Poisoned condition until the end of its next turn.

Bonus Actions

Aerial Agility. The archon takes the Dash or Disengage action.

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

## 13. Purple Worm — CR 15

**Input:** `name: Purple Worm | that swallowed a war-band's armoury`

```
Purple Worm

Gargantuan Monstrosity, Unaligned

AC 18
Initiative -2 (8)

HP 247 (15d20 + 90)

Speed 50 ft., Burrow 50 ft.

MOD
SAVE
STR
28
+9
+14
INT
1
-5
-5
MOD
SAVE
DEX
7
-2
-2
WIS
8
-1
-1
MOD
SAVE
CON
22
+6
+11
CHA
4
-3
-3

Skills Athletics +14, Perception +4

Senses blindsight 30 ft., tremorsense 60 ft.; Passive Perception 14

Languages None

CR 15 (XP 13,000; PB +5)

Traits

Grinding Gullet. When the worm starts its turn with a creature swallowed, the swallowed creature takes 22 (5d8) Piercing damage, and the worm regains Hit Points equal to half that damage.

Tunneler. The worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The worm makes one Bite attack and one Tail Stinger attack. It can replace one attack with a use of Swallow.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

Swallow. Dexterity Saving Throw: DC 21, one Large or smaller creature within 10 feet that the worm hit with a melee attack this turn. Failure: The target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the worm, and takes 21 (6d6) Acid damage at the start of each of the worm's turns. If the worm takes 40 damage or more on a single turn from a creature inside it, it must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the worm and has the Prone condition. If the worm dies, a swallowed creature is no longer Restrained and can escape from the corpse using 15 feet of movement, exiting with the Prone condition.

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

## 14. Glacier's Heart — CR 15

**Input:** `a glacier's heart given legs, trailing a wake of killing cold`

```
Glacier's Heart
Huge elemental, neutral
Armor Class

16 (natural armor)

Hit Points: 

210 (20d12 + 80)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

8 (-1)

	

19 (+4)

	

6 (-2)

	

10 (+0)

	

4 (-3)

Skills: 

Athletics +9, Perception +5

Saving Throws: 

STR +9, CON +9

Damage Immunities: 

cold, poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

tremorsense 60 ft., passive Perception 15

Languages: 

None

Challenge

15 (13,000 XP)

Proficiency Bonus:

+5

Fear Aura.The glacier's heart emanates an aura in a 20-foot radius while it is not incapacitated. Any enemy that starts its turn in the aura must make a DC 17 Wisdom saving throw. On a failed save, the target is frightened until the start of its next turn. On a successful save, the target is immune to this creature's aura for 24 hours.
Cold Absorption.Whenever the glacier's heart is subjected to cold damage, it takes no damage and instead regains a number of hit points equal to the cold damage dealt.
Siege Monster.The glacier's heart deals double damage to objects and structures.

Actions
Multiattack: The glacier's heart makes two Slam attacks. It can replace one attack with a use of Trailing Rime.
Slam: Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage plus 13 (3d8) cold damage.
Killing Cold (Recharge 5-6): Each creature in a 30-foot cone must make a DC 17 Constitution saving throw, taking 66 (12d10) cold damage on a failed save, or half as much damage on a successful one.
Trailing Rime: Each creature in a 30-foot cone must make a DC 17 Constitution saving throw. On a failed save, the target's Speed is halved and it can't take Reactions until the end of the glacier's heart's next turn.
```

## 15. Adult Red Dragon — CR 17

**Input:** `name: Adult Red Dragon | blind in one eye from an old lance`

```
Adult Red Dragon
Huge dragon, chaotic evil
Armor Class

19 (natural armor)

Hit Points: 

256 (19d12 + 133)

Speed: 

40 ft., fly 80 ft., climb 40 ft.

STR	DEX	CON	INT	WIS	CHA


27 (+8)

	

10 (+0)

	

25 (+7)

	

16 (+3)

	

13 (+1)

	

23 (+6)

Skills: 

Perception +13, Stealth +6

Saving Throws: 

DEX +6, WIS +7

Damage Immunities: 

fire

Senses: 

blindsight 60 ft., darkvision 120 ft., passive Perception 23

Languages: 

Common, Draconic

Challenge

17 (18,000 XP)

Proficiency Bonus:

+6

Scar-Socket Vigil.When a creature enters the red dragon's reach, or starts its turn there, the red dragon makes one Rend attack against that creature; it can't use this trait again until the start of its next turn.
Legendary Resistance (3/Day).If the red dragon fails a saving throw, it can choose to succeed instead.
Sight Weakness.The red dragon has disadvantage on Wisdom (Perception) checks that rely on sight.

Actions
Multiattack: The red dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray.
Rend: Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 13 (1d10 + 8) slashing damage plus 5 (2d4) fire damage.
Spellcasting: The red dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 20, +12 to hit with spell attacks): - At will: Command, Detect Magic, Scorching Ray
1/day each: Fireball
Fire Breath (Recharge 5-6): Each creature in a 60-foot cone must make a DC 21 Dexterity saving throw, taking 59 (17d6) fire damage on a failed save, or half as much damage on a successful one.
Legendary Actions

The red dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The red dragon regains spent legendary actions at the start of its turn.

Commanding Presence: The red dragon uses Spellcasting to cast Command (level 2 version). The red dragon can't take this action again until the start of its next turn.
Fiery Rays: The red dragon uses Spellcasting to cast Scorching Ray. The red dragon can't take this action again until the start of its next turn.
Pounce: The red dragon moves up to half its Speed, and it makes one Rend attack.
```

## 16. Brass Tyrant — CR 17

**Input:** `a tyrant of burning brass who rules a city of forges`

```
Brass Tyrant

Huge Construct, Lawful Neutral

AC 20
Initiative +2 (12)

HP 241 (21d12 + 105)

Speed 30 ft.

MOD
SAVE
STR
22
+6
+6
INT
14
+2
+2
MOD
SAVE
DEX
14
+2
+2
WIS
16
+3
+3
MOD
SAVE
CON
20
+5
+11
CHA
20
+5
+11

Skills Athletics +12, Persuasion +11

Resistances Fire

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 120 ft.; Passive Perception 13

Languages Common

CR 17 (XP 18,000; PB +6)

Traits

Molten Brass Aura. At the end of each of the tyrant's turns, each creature in a 5-foot Emanation originating from the tyrant takes 13 (3d8) Fire damage.

Legendary Resistance (3/Day). If the tyrant fails a saving throw, it can choose to succeed instead.

Aura of Authority. While in a 10-foot Emanation originating from the tyrant, the tyrant and its allies have Advantage on attack rolls and saving throws, provided the tyrant doesn't have the Incapacitated condition.

Actions

Multiattack. The tyrant makes two Brass Blade attacks.

Brass Blade. Melee Attack Roll: +12, reach 10 ft. 15 (2d8 + 6) Slashing damage plus 13 (3d8) Fire damage.

Bonus Actions

Inevitability of the Tyrant. Wisdom Saving Throw: DC 19, one creature within 30 feet. Failure: Until the start of the tyrant's next turn, the target has Disadvantage on attack rolls against creatures other than the tyrant.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Lock Blades. The tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Brass Blade attack.

Forge Order. One ally of the tyrant that can see or hear it can immediately use its Reaction to move up to half its Speed or to make one attack.

Stoke Legion. The tyrant and each of its allies within 10 feet of it that can see or hear it end the Charmed and Frightened conditions on themselves.

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

## 17. Pit Fiend — CR 20

**Input:** `name: Pit Fiend | who collects the oaths of dying knights`

```
Pit Fiend

Large Fiend, Lawful Evil

AC 21
Initiative +2 (12)

HP 337 (27d10 + 189)

Speed 30 ft., Fly 60 ft.

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

Skills Perception +10, Persuasion +19

Resistances Cold

Immunities Fire, Poison; Poisoned

Senses darkvision 120 ft.; Passive Perception 20

Languages Infernal; telepathy 120 ft.

CR 20 (XP 25,000; PB +6)

Traits

Final Oath, Paid in Full. Whenever a creature within the pit fiend's reach drops to 0 Hit Points, the pit fiend regains 14 (4d6) Hit Points, and its Bite attacks deal an extra 14 (4d6) Fire damage until the end of its next turn.

Legendary Resistance (3/Day). If the pit fiend fails a saving throw, it can choose to succeed instead.

Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend's aura for 24 hours.

Magic Resistance. The pit fiend has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack.

Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Hellfire Spellcasting (Recharge 4-6). The pit fiend casts Fireball (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21). It can replace one Fireball with Hold Monster (level 7 version) or Wall of Fire.

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

## 18. Bone-Sun Throned Archlich — CR 20

**Input:** `an archlich enthroned on a sun of bone`

```
Bone-Sun Throned Archlich
Medium undead, neutral evil
Armor Class

20 (natural armor)

Hit Points: 

315 (42d8 + 126)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


11 (+0)

	

16 (+3)

	

16 (+3)

	

21 (+5)

	

14 (+2)

	

16 (+3)

Skills: 

Arcana +17, History +11, Insight +8, Perception +8

Saving Throws: 

CON +9, INT +11, WIS +8

Damage Resistances: 

cold, lightning

Damage Immunities: 

necrotic, poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, poisoned

Senses: 

darkvision 60 ft., passive Perception 18

Languages: 

All

Challenge

20 (25,000 XP)

Proficiency Bonus:

+6

Bone-Sun Radiance.At the end of each of the archlich's turns, each creature in a 5-foot radius originating from the archlich takes 13 (3d8) necrotic damage.
Legendary Resistance (3/Day).If the archlich fails a saving throw, it can choose to succeed instead.
Spirit Jar.If destroyed, the archlich reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the archlich's lair.
Protective Magic (3/Day) (Reaction).When the archlich is hit by an attack roll, the archlich casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: The archlich makes three attacks, using Eldritch Burst or Paralyzing Touch.
Eldritch Burst: Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 31 (4d12 + 5) force damage.
Paralyzing Touch: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed until the start of the archlich's next turn.
Spellcasting: The archlich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19): - At will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
2/day each: Animate Dead, Dimension Door, Plane Shift
1/day each: Chain Lightning, Finger of Death, Power Word Kill, Scrying
Legendary Actions

The archlich can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The archlich regains spent legendary actions at the start of its turn.

Deathly Teleport: The archlich teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an Undead in a 20-foot radius originating from the archlich must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one.
Frightening Gaze: The archlich casts Fear, using the same spellcasting ability as Spellcasting. The archlich can't take this action again until the start of its next turn.
```

## 19. Ancient Gold Dragon — CR 24

**Input:** `name: Ancient Gold Dragon | `

```
Ancient Gold Dragon
Gargantuan dragon, lawful good
Armor Class

22 (Natural Armor)

Hit Points: 

546 (28d20 + 252)

Speed: 

40 ft., fly 80 ft., swim 40 ft.

STR	DEX	CON	INT	WIS	CHA


30 (+10)

	

14 (+2)

	

29 (+9)

	

18 (+4)

	

17 (+3)

	

28 (+9)

Skills: 

Insight +10, Perception +17, Persuasion +16, Stealth +9

Saving Throws: 

DEX +9, CON +16, WIS +10, CHA +16

Damage Immunities: 

Fire

Senses: 

Blindsight 60 ft., Darkvision 120 ft., Passive Perception 27

Languages: 

Common, Draconic

Challenge

24

Proficiency Bonus:

+7

Amphibious.The dragon can breathe air and water.
Legendary Resistance (3/Day).If the dragon fails a saving throw, it can choose to succeed instead.

Actions
Multiattack: The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.
Bite: Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10 + 10) piercing damage.
Claw: Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 17 (2d6 + 10) slashing damage.
Tail: Melee Weapon Attack: +17 to hit, reach 20 ft., one target. Hit: 19 (2d8 + 10) bludgeoning damage.
Frightful Presence: Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 24 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.
Breath Weapons (Recharge 5–6): The dragon uses one of the following breath weapons.
Fire Breath: The dragon exhales fire in a 90-foot cone. Each creature in that area must make a DC 24 Dexterity saving throw, taking 71 (13d10) fire damage on a failed save, or half as much damage on a successful one.
Weakening Breath: The dragon exhales gas in a 90-foot cone. Each creature in that area must succeed on a DC 24 Strength saving throw or have disadvantage on Strength-based attack rolls, Strength checks, and Strength saving throws for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
Change Shape: The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice).

In a new form, the dragon retains its alignment, hit points, Hit Dice, ability to speak, proficiencies, Legendary Resistance, lair actions, and Intelligence, Wisdom, and Charisma scores, as well as this action. Its statistics and capabilities are otherwise replaced by those of the new form, except any class features or legendary actions of that form.
Legendary Actions

The ancient gold dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The ancient gold dragon regains spent legendary actions at the start of its turn.

Detect: The dragon makes a Wisdom (Perception) check.
Tail Attack: The dragon makes a tail attack.
Wing Attack (Costs 2 Actions): The dragon beats its wings. Each creature within 15 feet of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.
```

## 20. Trenchsong Leviathan — CR 24

**Input:** `a leviathan of the trench whose song drowns fleets`

```
Trenchsong Leviathan

Gargantuan Monstrosity, Neutral

AC 21
Initiative +0 (10)

HP 542 (31d20 + 217)

Speed 40 ft., Swim 40 ft.

MOD
SAVE
STR
28
+9
+16
INT
10
+0
+0
MOD
SAVE
DEX
10
+0
+0
WIS
14
+2
+9
MOD
SAVE
CON
24
+7
+14
CHA
14
+2
+2

Skills Athletics +16, Perception +9

Senses blindsight 120 ft., darkvision 300 ft.; Passive Perception 19

Languages Common

CR 24 (XP 62,000; PB +7)

Traits

Amphibious. The leviathan can breathe air and water.

Legendary Resistance (3/Day). If the leviathan fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The leviathan makes two Maw attacks. It can replace one attack with a use of Drowning Call.

Maw. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Piercing damage plus 14 (4d6) Thunder damage.

Abyssal Note (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Drowning Call. Constitution Saving Throw: DC 24, one creature within 30 feet. Failure: 42 (12d6) Bludgeoning damage.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the leviathan can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Surge and Bite. The leviathan moves up to half its Speed without provoking Opportunity Attacks, and it makes one Maw attack.

Slam Down. Strength Saving Throw: DC 24, each creature within 10 feet of the leviathan. Failure: The target has the Prone condition.

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

## 21. Owlbear — CR 3

**Input:** `name: Owlbear | `

```
Owlbear

Large Monstrosity, Unaligned

AC 13
Initiative +1 (11)

HP 59 (7d10 + 21)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
20
+5
+7
INT
3
-4
-4
MOD
SAVE
DEX
12
+1
+1
WIS
12
+1
+1
MOD
SAVE
CON
17
+3
+3
CHA
7
-2
-2

Skills Perception +5

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 3 (XP 700; PB +2)

Actions

Multiattack. The owlbear makes two Rend attacks.

Rend. Melee Attack Roll: +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.

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

## 22. Goblin Boss — CR auto

**Input:** `name: Goblin Boss | `

```
Goblin Boss
Small humanoid, chaotic neutral
Armor Class

17 (chain shirt, shield)

Hit Points: 

21 (6d6)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


10 (+0)

	

15 (+2)

	

10 (+0)

	

10 (+0)

	

8 (-1)

	

10 (+0)

Skills: 

Stealth +6

Saving Throws: 

DEX +4

Senses: 

darkvision 60 ft., passive Perception 9

Languages: 

Common, Goblin

Challenge

1 (200 XP)

Proficiency Bonus:

+2

Nimble Escape (Bonus Action).The boss takes the Disengage or Hide action.

Actions
Multiattack: The boss makes two attacks, using Scimitar or Shortbow.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had advantage.
Shortbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.
```

## 23. Vashka the Red — CR 6

**Input:** `name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.`

```
Vashka the Red

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
+2
WIS
12
+1
+1
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

Languages Common, Goblin, Infernal

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Vashka makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Vashka can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Riposte. Trigger: A creature within 5 feet of Vashka misses it with a melee attack roll. Response: Vashka makes one Longsword attack against that creature.

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

## 24. Hollowpick Hivewidow — CR 9

**Input:** `A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.`

```
Hollowpick Hivewidow

Large Monstrosity, Unaligned

AC 15
Initiative -1 (9)

HP 161 (19d10 + 57)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
18
+4
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
+7
CHA
6
-2
-2

Skills Athletics +8, Perception +5

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 9 (XP 5,000; PB +4)

Traits

Flaking Shell. When a creature hits the hivewidow with a melee attack while within 10 feet of it, the attacker takes 16 (3d10) Acid damage from searing flakes of shell.

Actions

Multiattack. The hivewidow makes two Spitting Maw attacks. It can replace one attack with a use of Scythe-Lock.

Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 17 (3d8 + 4) Piercing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).

Scythe-Lock. Strength Saving Throw: DC 15, one creature within 10 feet. Failure: The target has the Restrained condition until the end of its next turn.

Bonus Actions

Cocoon. The hivewidow cocoons one Medium or smaller creature it is grappling. While cocooned, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the hivewidow, and takes 10 (3d6) Acid damage at the start of each of the hivewidow's turns. The hivewidow can have only one creature cocooned at a time. If the hivewidow takes 25 damage or more on a single turn from the cocooned creature, the hivewidow must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the hivewidow. If the hivewidow dies, a cocooned creature tears free Prone by using 10 feet of movement.

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

## 25. Black Iron Warden — CR 11

**Input:** `a sentinel of black iron, AC 20, Huge, speed 20 feet`

```
Black Iron Warden
Huge construct, unaligned
Armor Class

20 (natural armor)

Hit Points: 

168 (16d12 + 64)

Speed: 

20 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

8 (-1)

	

18 (+4)

	

7 (-2)

	

10 (+0)

	

3 (-4)

Skills: 

Perception +4

Saving Throws: 

CON +8

Damage Resistances: 

fire

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

understands the languages of its creator but can't speak

Challenge

11 (7,200 XP)

Proficiency Bonus:

+4

Slag Heat.At the end of each of the iron warden's turns, each creature in a 5-foot radius originating from the iron warden takes 10 (3d6) fire damage.
Ward Bond.The iron warden is magically bound to a ward of its choosing, and it can have only one ward at a time. While the iron warden is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the iron warden.
Regeneration.The iron warden regains 10 hit points at the start of each of its turns if it has at least 1 Hit Point. If the iron warden takes cold damage, this trait doesn't function at the start of the iron warden's next turn.
Challenging Gaze (Bonus Action).One creature within 30 feet must make a DC 16 Wisdom saving throw. On a failed save, until the start of the iron warden's next turn, the target has disadvantage on attack rolls against creatures other than the iron warden.
Interpose (Reaction).When a creature within 5 feet of the iron warden that it guards is hit by an attack roll, the attack hits the iron warden instead, and the iron warden has Resistance to the attack's damage.

Actions
Multiattack: The iron warden makes two Slam attacks.
Slam: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage.
Iron Aegis (2/Day): The iron warden targets itself or one creature it can see within 60 feet. The target gains 24 (7d6) temporary hit points, and it gains a +2 bonus to AC until the end of the iron warden's next turn.
```

## 26. Mire Hag — CR auto

**Input:** `a marsh witch who curses trespassers, cr 7`

```
Mire Hag

Medium Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 81 (18d8)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
9
-1
-1
INT
17
+3
+3
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
+3

Skills Arcana +6, History +6, Perception +4

Senses Passive Perception 14

Languages Common and any three languages

CR 7 (XP 2,900; PB +3)

Traits

Fen Stride. Difficult Terrain composed of swamp and marsh doesn't cost the hag extra movement, and the hag can move across swamp and marsh without needing to make an ability check.

Actions

Multiattack. The hag makes three Arcane Burst attacks. It can replace one attack with a use of Fen-Curse.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. The hag casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Fen-Curse. Dexterity Saving Throw: DC 14, one creature within 60 feet. Failure: 19 (3d12) Bludgeoning damage.

Bonus Actions

Misty Step (3/Day). The hag casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). The hag casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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

## 27. Unshriven Templar — CR 6

**Input:** `a templar priest with a mace and no magic at all`

```
Unshriven Templar

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
+2
WIS
12
+1
+1
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

CR 6 (XP 2,300; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the templar, the templar and its allies have Advantage on attack rolls and saving throws, provided the templar doesn't have the Incapacitated condition.

Actions

Multiattack. The templar makes three Mace attacks. It can replace one attack with a use of Shield Bash.

Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the templar's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the templar can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

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

## 28. Ilvareth Dusksong — CR 12

**Input:** `name: Ilvareth Dusksong | An elf archmage who bends shadow and steps between places.`

```
Ilvareth Dusksong
Medium humanoid, neutral
Armor Class

17

Hit Points: 

170 (31d8 + 31)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


10 (+0)

	

14 (+2)

	

12 (+1)

	

20 (+5)

	

15 (+2)

	

16 (+3)

Skills: 

Arcana +13, History +9, Perception +6

Saving Throws: 

INT +9, WIS +6

Damage Immunities: 

psychic, charmed ((with mind blank))

Senses: 

passive Perception 16

Languages: 

Common plus five other languages, Elvish, Undercommon

Challenge

12 (8,400 XP)

Proficiency Bonus:

+4

Umbral Unseen.While Ilvareth is in dim light or darkness, a creature relying on sight or sound to track or locate Ilvareth must succeed on a DC 17 Wisdom (Perception) check; on a failure it loses track of him until the start of his next turn, when it can try again.
Magic Resistance.Ilvareth has advantage on saving throws against spells and other magical effects.
Misty Step (3/Day) (Bonus Action).Ilvareth casts Misty Step, using the same spellcasting ability as Spellcasting.
Shadow Step (2/Day) (Bonus Action).Ilvareth teleports up to 30 feet to an unoccupied space it can see.
Protective Magic (3/Day) (Reaction).When Ilvareth is hit by an attack roll, Ilvareth casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Ilvareth makes four Arcane Burst attacks.
Spellcasting: Ilvareth casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17): - At will: Detect Magic, Detect Thoughts, Disguise Self, Invisibility, Light, Mage Armor, Mage Hand, Prestidigitation
2/day each: Fly, Lightning Bolt
1/day each: Cone of Cold, Mind Blank, Scrying, Teleport
Arcane Burst: Melee or Ranged Spell Attack: +9 to hit, reach 5 ft. or range 150 ft., one target. Hit: 27 (4d10 + 5) force damage.
```

## 29. Swarm of Peal of the Dyings — CR 13

**Input:** `a swarm of funeral bells that ring themselves over the dying`

```
Swarm of Peal of the Dyings

Medium Swarm of Tiny Undead, Neutral

AC 15
Initiative +5 (15)

HP 178 (21d8 + 84)

Speed 40 ft., Fly 30 ft. (hover)

MOD
SAVE
STR
8
-1
-1
INT
4
-3
-3
MOD
SAVE
DEX
20
+5
+5
WIS
10
+0
+0
MOD
SAVE
CON
18
+4
+4
CHA
2
-4
-4

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned

Senses darkvision 60 ft.; Passive Perception 10

Languages None

CR 13 (XP 10,000; PB +5)

Traits

Rotting Toll. When a wounded creature starts its turn within 5 feet of the swarm, the creature takes 24 (7d6) Necrotic damage, and the swarm regains Hit Points equal to the damage dealt.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Multiattack. The swarm makes two Bell attacks. It can replace one attack with a use of Peal for the Dying.

Bell. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.

Peal for the Dying. Wisdom Saving Throw: DC 17, each creature in a 20-foot Emanation originating from the swarm. Failure: The target has the Frightened condition until the end of its next turn.

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

## 30. Reliquary Vault Ooze — CR 9

**Input:** `a cathedral-vault ooze that digests reliquaries`

```
Reliquary Vault Ooze
Huge ooze, unaligned
Armor Class

10 (natural armor)

Hit Points: 

161 (17d12 + 51)

Speed: 

20 ft., climb 20 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

6 (-2)

	

16 (+3)

	

2 (-4)

	

8 (-1)

	

1 (-5)

Damage Immunities: 

acid

Condition Immunities: 

charmed, deafened, exhaustion, frightened, grappled, prone, restrained

Senses: 

blindsight 60 ft. (blind beyond this radius), passive Perception 9

Languages: 

None

Challenge

9 (5,000 XP)

Proficiency Bonus:

+4

Caustic Wake.While a creature stands on ground the vault ooze has moved across, the vault ooze has advantage on attack rolls against that creature.
Amorphous.The vault ooze can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form.A creature that touches the vault ooze or hits it with a melee attack while within 5 feet of it takes 9 (2d8) acid damage.
Spider Climb.The vault ooze can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The vault ooze makes two Tar Pseudopod attacks. It can replace one attack with a use of Crushing Slam.
Tar Pseudopod: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 17 (3d8 + 4) bludgeoning damage plus 11 (2d10) acid damage.
Crushing Slam: One creature within 10 feet must make a DC 15 Strength saving throw, taking 28 (8d6) bludgeoning damage on a failed save.
```

## 31. Rolling Thunder Drake — CR 7

**Input:** `a young storm drake whose breath is a rolling wall of thunder`

```
Rolling Thunder Drake

Medium Dragon, Chaotic Neutral

AC 18
Initiative +1 (11)

HP 110 (17d8 + 34)

Speed 30 ft., Fly 60 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
12
+1
+4
WIS
12
+1
+4
MOD
SAVE
CON
15
+2
+2
CHA
14
+2
+2

Skills Perception +4, Stealth +4

Immunities Thunder

Senses blindsight 30 ft., darkvision 120 ft.; Passive Perception 14

Languages Draconic

CR 7 (XP 2,900; PB +3)

Traits

Charged Wake. While the drake flies or moves, the drake's space and the path it travels count as difficult terrain for other creatures, and a creature that starts its turn in that charged trail takes 9 (2d8) Thunder damage.

Actions

Multiattack. The thunder drake makes two Bite attacks.

Bite. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.

Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

Thunder Dive. Dexterity Saving Throw: DC 15, one Bloodied creature the thunder drake can see within 60 feet. Failure: If the target has 18 Hit Points or fewer, it drops to 0 Hit Points. Otherwise, it takes 18 (4d8) Thunder damage. Success: Half damage only.

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

## 32. Kragmar the Unanswered — CR 9

**Input:** `a stone giant exile who speaks only Giant and understands no Common`

```
Kragmar the Unanswered
Huge giant, neutral
Armor Class

14 (natural armor)

Hit Points: 

161 (14d12 + 70)

Speed: 

40 ft.

STR	DEX	CON	INT	WIS	CHA


23 (+6)

	

15 (+2)

	

20 (+5)

	

10 (+0)

	

12 (+1)

	

9 (-1)

Skills: 

Athletics +10, Perception +5

Saving Throws: 

STR +10, CON +9

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Giant

Challenge

9 (5,000 XP)

Proficiency Bonus:

+4

Unbroken Strata.Kragmar ignores difficult terrain, and rubble, scree, and shattered earth do not slow his movement.

Actions
Multiattack: Kragmar makes two attacks: one with Stone Club and one with Boulder.
Stone Club: Melee Weapon Attack: +10 to hit, reach 15 ft., one target. Hit: 30 (7d6 + 6) bludgeoning damage.
Boulder: Ranged Weapon Attack: +10 to hit, range 60/240 ft., one target. Hit: 24 (4d8 + 6) bludgeoning damage.
```

## 33. Reed-Temple Watcher — CR 5

**Input:** `lizardfolk monk`

```
Reed-Temple Watcher
Medium humanoid, neutral
Armor Class

13

Hit Points: 

94 (21d8)

Speed: 

30 ft., climb 30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

15 (+2)

	

10 (+0)

	

12 (+1)

	

14 (+2)

	

16 (+3)

Skills: 

Athletics +6, Perception +5

Saving Throws: 

STR +6, CON +3

Senses: 

passive Perception 15

Languages: 

Common plus one other language, Draconic

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Reed-Venom Grasp.A creature that grapples the watcher or is grappled by it is poisoned until the end of its next turn.
Hold Breath.The watcher can hold its breath for 15 minutes.
Cunning Action (Bonus Action).The watcher takes the Dash, Disengage, or Hide action.

Actions
Multiattack: The watcher makes two attacks: one with its Unarmed Strike and one with its Dart. It can replace one attack with a use of Joint-Venom Spasm.
Unarmed Strike: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage. Once on each of the watcher's turns when it hits with this attack, the target is subjected to the following effect. The target must make a DC 14 Constitution saving throw. On a failed save, the target is stunned until the end of the watcher's next turn.
Dart: Ranged Weapon Attack: +5 to hit, range 20/60 ft., one target. Hit: 11 (2d8 + 2) piercing damage.
Joint-Venom Spasm: One creature within 10 feet must succeed on a DC 14 Constitution saving throw or be poisoned until the end of its next turn.
```

## 34. Krennik Skullstandard — CR 4

**Input:** `name: Krennik Skullstandard | riding a worg`

```
Krennik Skullstandard
Medium humanoid, neutral evil
Armor Class

14 (leather)

Hit Points: 

78 (12d8 + 24)

Speed: 

50 ft.

STR	DEX	CON	INT	WIS	CHA


14 (+2)

	

16 (+3)

	

14 (+2)

	

8 (-1)

	

12 (+1)

	

8 (-1)

Skills: 

Perception +3, Stealth +5

Saving Throws: 

DEX +5

Senses: 

passive Perception 13

Languages: 

Common, Goblin

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Pack Tactics.Krennik has advantage on an attack roll against a target if at least one of Krennik's allies is within 5 feet of that target and the ally is not incapacitated.
Ride-By.Krennik ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Mounted Agility (Bonus Action).Krennik takes the Dash or Disengage action.
Bloody Follow-Through (1/Day) (Bonus Action).Immediately after dealing damage to a creature that is already below half its hit point maximum, Krennik moves up to half its Speed, and it makes one Scythe attack.

Actions
Multiattack: Krennik makes two attacks: one with Scythe and one with Hurled Scythe.
Scythe: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) piercing damage and, if it is Medium or smaller, is knocked prone.
Hurled Scythe: Ranged Weapon Attack: +5 to hit, range 20/60 ft., one target. Hit: 7 (1d8 + 3) piercing damage.
Ride-Down (Recharge 5-6): Krennik moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Each creature whose space Krennik enters must make a DC 13 Dexterity saving throw, taking 24 (7d6) bludgeoning damage on a failed save. On a failed save, the target is also knocked prone.
```

## 35. Well-Drowned Threefold — CR 5

**Input:** `name: the thing in the well | `

```
Well-Drowned Threefold

Medium Monstrosity, Neutral

AC 14
Initiative -1 (9)

HP 97 (13d8 + 39)

Speed 30 ft., Swim 30 ft., Climb 30 ft.

MOD
SAVE
STR
16
+3
+6
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

Skills Athletics +6, Perception +3

Resistances Cold

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The well-drowned threefold makes two Arm attacks. It can replace one attack with a use of Impossible Reach.

Arm. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Impossible Reach. Strength Saving Throw: DC 14, one creature within 10 feet. Failure: The target is pulled up to 10 feet straight toward the well-drowned threefold, and the target has the Grappled condition (escape DC 14).

Bonus Actions

Whelm. The well-drowned threefold whelms one Medium or smaller creature it is grappling. While whelmed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the well-drowned threefold, and takes 7 (2d6) Cold damage at the start of each of the well-drowned threefold's turns. The well-drowned threefold can have only one creature whelmed at a time. If the well-drowned threefold takes 15 damage or more in a single turn from the whelmed creature, the well-drowned threefold must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the well-drowned threefold. If the well-drowned threefold dies, a whelmed creature pulls free Prone by using 5 feet of movement.

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

## 36. Othlua — CR 4

**Input:** ` | role: brute`

```
Othlua

Large Fey, Lawful Neutral

AC 14
Initiative -1 (9)

HP 85 (10d10 + 30)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
18
+4
+6
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

Skills Athletics +6, Perception +2

Resistances Fire

Senses darkvision 60 ft.; Passive Perception 12

Languages Sylvan

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The othlua makes two Sinew Lash attacks.

Sinew Lash. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Fire damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Molten Slick (2/Day). The othlua corrupts a 15-foot-radius area of ground centered on a point within 60 feet. The area is Difficult Terrain until the start of the othlua's next turn. Constitution Saving Throw: DC 13, each creature in the area when it appears. Failure: 21 (6d6) Fire damage. Success: Half damage.

Bonus Actions

Whelm. The othlua whelms one Medium or smaller creature it is grappling. While whelmed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the othlua, and takes 6 (1d12) Fire damage at the start of each of the othlua's turns. The othlua can have only one creature whelmed at a time. If the othlua takes 12 damage or more in a single turn from the whelmed creature, the othlua must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the othlua. If the othlua dies, a whelmed creature pulls free Prone by using 5 feet of movement.

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

## 37. Meshrin — CR 8

**Input:** `name: Meshrin | Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages. Give him a frightening roar. AC 16, 120 hit points.`

```
Meshrin
Large humanoid, neutral
Armor Class

16 (breastplate)

Hit Points: 

120 (14d10 + 42)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

15 (+2)

	

16 (+3)

	

10 (+0)

	

12 (+1)

	

15 (+2)

Skills: 

Perception +4, Stealth +5

Saving Throws: 

DEX +5, WIS +4

Senses: 

passive Perception 14

Languages: 

Common, Draconic

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Wounded Frenzy.While below half its hit point maximum, Meshrin has advantage on attack rolls and saving throws.
Hold Breath.Meshrin can hold its breath for 15 minutes.
Great Weapon Master.When Meshrin hits a creature with its Greataxe, the attack deals an extra 3 damage.
Marsh Stride.Difficult Terrain composed of mud doesn't cost Meshrin extra movement, and Meshrin can move across mud without needing to make an ability check.

Actions
Multiattack: Meshrin makes three attacks, using Greataxe or Javelin. It can replace one attack with a use of Frightening Roar.
Greataxe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (2d12 + 4) slashing damage.
Javelin: Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 18 (4d6 + 4) piercing damage. Immediately after the attack, its javelin returns to Meshrin's grasp, and the target's Speed is reduced by 10 feet until the start of Meshrin's next turn.
Frightening Roar: Each creature of Meshrin's choice in a 30-foot radius originating from Meshrin that can see or hear it must make a DC 15 Wisdom saving throw. On a failed save, the target is frightened until the end of its next turn. On a successful save, the target is immune to this creature's terror for 24 hours.
```

## 38. Oathbone Revenant — CR 6

**Input:** `a skeleton with a greatsword`

```
Oathbone Revenant

Medium Undead, Lawful Evil

AC 14
Initiative +3 (13)

HP 117 (18d8 + 36)

Speed 30 ft.

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
16
+3
+3
WIS
8
-1
-1
MOD
SAVE
CON
15
+2
+5
CHA
5
-3
-3

Skills Athletics +7, Perception +2

Vulnerabilities Bludgeoning

Immunities Poison; Exhaustion, Poisoned, Frightened

Senses darkvision 60 ft.; Passive Perception 12

Languages Understands Common plus one other language but can't speak

CR 6 (XP 2,300; PB +3)

Traits

Great Weapon Master. When the revenant hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The revenant makes two attacks, using Greatsword or Shortbow in any combination. It can replace one attack with a use of Gravefurrow Lunge.

Greatsword. Melee Attack Roll: +7, reach 5 ft. 14 (3d6 + 4) Slashing damage plus 7 (2d6) Necrotic damage.

Shortbow. Ranged Attack Roll: +7, range 80/320 ft. 17 (3d8 + 4) Piercing damage.

Gravefurrow Lunge. Dexterity Saving Throw: DC 14, each creature in a 30-foot-long, 5-foot-wide Line. Failure: The target has the Prone condition.

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

## 39. Veteran Sellsword — CR 5

**Input:** `a sellsword who hurls a handaxe and closes with a shortsword`

```
Veteran Sellsword
Medium humanoid, neutral
Armor Class

16 (studded leather, shield)

Hit Points: 

112 (15d8 + 45)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

15 (+2)

	

16 (+3)

	

10 (+0)

	

12 (+1)

	

15 (+2)

Skills: 

Athletics +10, Performance +5

Saving Throws: 

DEX +5, WIS +4

Senses: 

passive Perception 11

Languages: 

Common

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Sell the Ground.While it has half of its hit points or fewer, the sellsword can take the Disengage action as a bonus action, its speed increases by 15 feet, and it must end its turn farther from every hostile creature than it began.
Riposte (Reaction).When a creature within 5 feet of the sellsword misses it with a melee attack roll, the sellsword makes one Handaxe attack against that creature.

Actions
Multiattack: The sellsword makes three Handaxe attacks. It can replace one attack with a use of Shortsword.
Handaxe: Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) slashing damage, and the sellsword has advantage on its next attack roll against the target before the end of its next turn. Until the end of the sellsword's next turn, the sellsword has advantage on attack rolls against the target, and the target can't take the Hide action.
Shortsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage. Immediately after the attack, a handaxe returns to the sellsword's grasp, and the sellsword has advantage on its next attack roll against the target before the end of its next turn.
Shield Bash: One creature within 5 feet that the sellsword can see must make a DC 15 Strength saving throw, taking 9 (2d4 + 4) bludgeoning damage on a failed save. On a failed save, if the target is a Medium or smaller creature, it is knocked prone.
```

## 40. Brother Halric — CR 3

**Input:** `name: Brother Halric | `

```
Brother Halric
Medium humanoid, neutral
Armor Class

13 (chain shirt)

Hit Points: 

38 (7d8 + 7)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

10 (+0)

	

12 (+1)

	

13 (+1)

	

16 (+3)

	

13 (+1)

Skills: 

Medicine +7, Perception +5, Religion +5

Saving Throws: 

INT +3, WIS +5

Senses: 

passive Perception 15

Languages: 

Common plus one other language

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Ash of the Guilty.When a creature is hit by Halric's Radiant Flame, the creature sheds a faint smoldering glimmer until the end of its next turn, and while it glimmers it cannot hide from Halric.
Divine Aid (3/Day) (Bonus Action).Halric casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame.
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
```

