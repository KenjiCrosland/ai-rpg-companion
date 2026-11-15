# Blocks — the ship gate for the enhancement release

**Frozen commit: `0e44391`.** 48 sheets, generated once each as they would ship: the regression
forty (`sweep.json`) and the eight added (`ship-eight.json`). **Every sheet is here, marked as
it is. None threw.** This file is a milestone: it is the record of what shipped.

```
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs sweep
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs ship-eight
node --import ./scripts/alias-loader.mjs scripts/check-run.mjs <run>
npx jest --maxWorkers=2 --silent     # whole repo: 308 suites, 7374 passed, 26 skipped
npm run build                        # built in 5.86s
```

## The verdict

| blocker | result |
|---|---|
| 1 did not generate | **none** — 48 of 48 built, no throw, no timeout, no failed path |
| 2 wrong creature | none seen; the owner reads all 48 |
| 3 new checker FAIL vs 12 Nov | **ONE, by the letter: Drowned Choir.** Cause traced below and it is NOT from this branch |
| 4 broken text | **none** — 0 hits scanning every row of all 48 for `{token}`, undefined, null, NaN, or empty |
| 5 printed monster off print | **none** — all three `exact` sheets match print's array, AC and HP |
| 6 build or suite | **none** — whole repo 308 suites / 7374 passed; build clean |

### The checker, against 12 November

| | 12 Nov | this run |
|---|---|---|
| sweep FAILs | **2 of 40** — Hatchery Warden `vocab-2024-in-2014`, Krennik Skullstandard `print-range` | **1 of 40** — Drowned Choir `attack-in-multiattack` |
| ship-eight | no baseline (new batch) | 1 of 8 — Headless Horseman `attack-stat` |

The count fell from 2 to 1, and both 12 November failures cleared. The identity changed, so
Drowned Choir trips blocker 3 by its letter.

### Drowned Choir — why it is not a regression from this branch

```
repair round 1: name "Grasping Hands" promises the Grappled condition but the row never delivers it
name follows content: "Grasping Hands" -> "Strike Hands"
multiattack re-read — "Grasping Hands" left; "Multiattack" now reads "The choir makes three attacks."
```

The row was **renamed**, not removed, and the re-read treated it as departed instead of following
the rename — so the Multiattack went generic and no longer names the attack a GM would use. The
sweep already owns the mechanism for this (`keepBare`, which re-points a citation at the row that
replaced it) and its own comment records a prior hit: *"a use of Petrifying Gaze lost its row to a
rename and the sweep took only the name"*. Nothing on this branch touches either pass. Whether it
shows depends on whether the audit renames a Multiattack-cited row on that roll, so **a user can
hit this on today's build**. Wiring the rename's old-to-new pair across those two passes is not a
small change on a frozen branch, so it is reported and not fixed.

### Headless Horseman — `attack-stat`, with no 12 November baseline

`+9 derives from DEX, but an attack row rolls STR`. STR 16, DEX 20, PB 4: the saber's +9 and its
+5 damage both key to DEX 20 while the row reads as a STR weapon. **The mind tiers cannot cause
this** — they move only INT, WIS and CHA, and this sheet's record shows exactly that
(`moved: INT 15, WIS 20, CHA 20`, nothing held). It is the donor's own striker choice on
`skirmisher-8-mounted`. It is a new prompt, so blocker 3 has nothing to compare it against.

## The 48, with every `[path]` line as printed

### sweep

| # | input | `[path]` as printed |
|---|---|---|
| 01 | name: Dire Wolf | with a frost-rimed hide | `[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)` |
| 02 | a mud-caked bog hound that drags fishermen u | `[path] homebrew — "a mud-caked bog hound that drags fishermen under" (call)` |
| 03 | name: Owlbear | that has learned to climb | `[path] twist — Owlbear (is) — "Name field: Owlbear" (code)` |
| 04 | a chapel bell-ringer's ghost that tolls for  | `[path] twist — Ghost (is) — "ghost" (call)` |
| 05 | name: Air Elemental | that carries stolen vo | `[path] twist — Air Elemental (is) — "Name field: Air Elemental" (code)` |
| 06 | a quarry-pit thing of living scree that buri | `[path] homebrew — "a quarry-pit thing of living scree that buries what it catc` |
| 07 | name: Hydra | whose stumps smoke instead of  | `[path] twist — Hydra (is) — "Name field: Hydra" (code)` |
| 08 | a siege-engine golem of lashed timber that s | `[path] homebrew — "a siege-engine golem of lashed timber that shoulders throug` |
| 09 | name: Stone Golem | carved as a weeping sain | `[path] twist — Stone Golem (is) — "Name field: Stone Golem" (code)` |
| 10 | a drowned cathedral choir that sings in one  | `[path] homebrew — "a drowned cathedral choir that sings in one voice" (call)` |
| 11 | name: Vampire | who keeps a garden of thorns | `[path] twist — Vampire (is) — "Name field: Vampire" (code)` |
| 12 | a plague-bearing archon of flies that comman | `[path] homebrew — title archon — "a plague-bearing archon of flies that comman` |
| 13 | name: Purple Worm | that swallowed a war-ban | `[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)` |
| 14 | a glacier's heart given legs, trailing a wak | `[path] homebrew — "a glacier's heart given legs, trailing a wake of killing co` |
| 15 | name: Adult Red Dragon | blind in one eye fr | `[path] twist — Adult Red Dragon (is) — "Name field: Adult Red Dragon" (code)` |
| 16 | a tyrant of burning brass who rules a city o | `[path] homebrew — title tyrant — "a tyrant of burning brass who rules a city o` |
| 17 | name: Pit Fiend | who collects the oaths of  | `[path] twist — Pit Fiend (is) — "Name field: Pit Fiend" (code)` |
| 18 | an archlich enthroned on a sun of bone | `[path] twist — Lich (is) — "archlich" (call)` |
| 19 | name: Ancient Gold Dragon |  | `[path] exact — Ancient Gold Dragon (is) — "Ancient Gold Dragon" (code)` |
| 20 | a leviathan of the trench whose song drowns  | `[path] homebrew — "a leviathan of the trench whose song drowns fleets" (call)` |
| 21 | name: Owlbear |  | `[path] exact — Owlbear (is) — "Owlbear" (code)` |
| 22 | name: Goblin Boss |  | `[path] exact — Goblin Boss (is) — "Goblin Boss" (code)` |
| 23 | name: Vashka the Red | A hobgoblin warlord i | `[path] class_npc — Hobgoblin Warrior (is) — class fighter — "warlord" (call)` |
| 24 | A Large insectile horror. It has four scythe | `[path] homebrew — "A Large insectile horror." (call)` |
| 25 | a sentinel of black iron, AC 20, Huge, speed | `[path] homebrew — "a sentinel of black iron" (call)` |
| 26 | a marsh witch who curses trespassers, cr 7 | `[path] class_npc — class mage — "witch" (call)` |
| 27 | a templar priest with a mace and no magic at | `[path] class_npc — class paladin — "templar" (call)` |
| 28 | name: Ilvareth Dusksong | An elf archmage wh | `[path] class_npc — class mage — "archmage" (call)` |
| 29 | a swarm of funeral bells that ring themselve | `[path] homebrew — "a swarm of funeral bells that ring themselves over the dyin` |
| 30 | a cathedral-vault ooze that digests reliquar | `[path] homebrew — "a cathedral-vault ooze that digests reliquaries" (call)` |
| 31 | a young storm drake whose breath is a rollin | `[path] homebrew — "a young storm drake whose breath is a rolling wall of thund` |
| 32 | a stone giant exile who speaks only Giant an | `[path] twist — Stone Giant (is) — "stone giant exile" (call)` |
| 33 | lizardfolk monk | `[path] class_npc — class monk — species lizardfolk — "monk" (call)` |
| 34 | name: Krennik Skullstandard | riding a worg | `[path] homebrew — "riding a worg" (call)` |
| 35 | name: the thing in the well |  | `[path] homebrew — "the thing in the well" (call)` |
| 36 |  | role: brute | `[path] blank — "role: brute" (code)` |
| 37 | name: Meshrin | Large lizard folk, 30 feet o | `[path] class_npc — class barbarian — species lizardfolk — "barbarian" (call)` |
| 38 | a skeleton with a greatsword | `[path] twist — Skeleton (is) — "skeleton" (call)` |
| 39 | a sellsword who hurls a handaxe and closes w | `[path] class_npc — class fighter — "sellsword" (call)` |
| 40 | name: Brother Halric |  | `[path] class_npc — class cleric — "Brother" (call)` |

### ship-eight

| # | input | `[path]` as printed |
|---|---|---|
| 01 | name: Headless Horseman |  | `[path] homebrew — "Headless Horseman" (call)` |
| 02 | name: Pumpkin King |  | `[path] homebrew — title King — "Pumpkin King" (call)` |
| 03 | name: Knife Ball |  | `[path] homebrew — "Knife Ball" (call)` |
| 04 | goblin wizard | `[path] class_npc — Goblin Warrior (is) — class mage — "wizard" (call)` |
| 05 | kobold sorcerer | `[path] class_npc — Kobold Warrior (is) — class mage — "sorcerer" (call)` |
| 06 | mummy librarian | `[path] twist — Mummy (is) — "mummy" (call)` |
| 07 | a silver-tongued toad the size of a pony | `[path] homebrew — Giant Toad (resembles) — "a silver-tongued toad the size of ` |
| 08 | a giant river pike | `[path] homebrew — "a giant river pike" (call)` |

## The checker's table — sweep


```
(table not found)
```

## The checker's table — ship-eight


```
(table not found)
```

# The sheets — sweep

---

## 01. Dire Wolf — CR 1
**Input:** `name: Dire Wolf | with a frost-rimed hide`
**Donor:** skirmisher-1 -> CR 1
**Signature:** library · **elapsed** 27s

**`[path]`, donor and the mind tiers**
```
**Donor:** skirmisher-1 -> CR 1
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
```

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
+2
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

Immunities Cold

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 1 (XP 200; PB +2)

Traits

Rime-crackle. The dire wolf has Advantage on Dexterity (Stealth) checks, and its movement makes no sound that can reveal it through hearing alone.

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

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

## 02. Bog Hound — CR 1
**Input:** `a mud-caked bog hound that drags fishermen under`
**Donor:** brute-5-grappler -> CR 1
**Signature:** library · **elapsed** 25s

**`[path]`, donor and the mind tiers**
```
**Donor:** brute-5-grappler -> CR 1
[path] homebrew — "a mud-caked bog hound that drags fishermen under" (call)
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 1
[reskin] mind tier: CHA 4 -> 10 — the call read this creature as ordinary at CR 1
```

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

	

15 (+2)

	

10 (+0)

Skills: 

Athletics +3, Perception +4

Saving Throws: 

STR +3

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

None

Challenge

1 (200 XP)

Proficiency Bonus:

+2

Fen-Bodied.Difficult terrain made of mud, marsh or standing water costs the bog hound no extra movement, and it leaves no trail through soft earth.

Actions
Multiattack: The bog hound makes two Bite attacks.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained. If the bog hound moved at least 20 feet straight toward the target immediately before the hit and the target is Large or smaller, the target is knocked prone, and the bog hound can make one Bite attack against it as a bonus action.
```

---

## 03. Owlbear — CR 3
**Input:** `name: Owlbear | that has learned to climb`
**Donor:** brute-2 -> CR 3
**Signature:** library · **elapsed** 26s

**`[path]`, donor and the mind tiers**
```
**Donor:** brute-2 -> CR 3
[path] twist — Owlbear (is) — "Name field: Owlbear" (code)
```

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
Multiattack: The owlbear makes two Rend attacks. It can replace one attack with a use of Rattling Roar.
Rend: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.
Rattling Roar: One creature within 60 feet must make a DC 15 Constitution saving throw. On a failed save, the target's Speed is halved and it can't take Reactions until the end of the owlbear's next turn.
```

---

## 04. Knellwright — CR 3
**Input:** `a chapel bell-ringer's ghost that tolls for the dying`
**Donor:** lurker-2 -> CR 3
**Signature:** library · **elapsed** 36s

**`[path]`, donor and the mind tiers**
```
**Donor:** lurker-2 -> CR 3
[path] twist — Ghost (is) — "ghost" (call)
```

```
Knellwright

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

Open Chapel. The knellwright can move through creatures and objects as if they were Difficult Terrain, and it cannot be Grappled or Restrained.

Ethereal Sight. The knellwright can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The knellwright can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The knellwright makes two Withering Touch attacks. It can replace one attack with a use of Dirge of the Named Hour.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Dirge of the Named Hour. Wisdom Saving Throw: DC 13, each creature in a 30-foot Emanation originating from the knellwright. Failure: The target has the Frightened condition until the end of its next turn.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the knellwright and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the knellwright's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the knellwright can see within 5 feet. Failure: The target is possessed by the knellwright; the knellwright disappears, and the target has the Incapacitated condition and loses control of its body. The knellwright now controls the body, but the target retains awareness. The knellwright can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The knellwright's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the knellwright leaves as a Bonus Action. When the possession ends, the knellwright appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The knellwright casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The knellwright is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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

## 05. Air Elemental — CR 5
**Input:** `name: Air Elemental | that carries stolen voices`
**Donor:** brute-5 -> CR 5
**Signature:** library · **elapsed** 28s

**`[path]`, donor and the mind tiers**
```
**Donor:** brute-5 -> CR 5
[path] twist — Air Elemental (is) — "Name field: Air Elemental" (code)
```

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
+5
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

Skills Athletics +5, Perception +3

Resistances Bludgeoning, Lightning, Piercing, Slashing

Immunities Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious

Senses darkvision 60 ft.; Passive Perception 13

Languages Primordial (Auran)

CR 5 (XP 1,800; PB +3)

Traits

Air Form. The air elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The air elemental makes two Thunderous Slam attacks. It can replace one attack with a use of Chorus of Silence.

Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.

Chorus of Silence. Constitution Saving Throw: DC 13, one creature within 60 feet. Failure: The target has the Blinded condition until the end of its next turn.

Whirlwind (Recharge 4-6). Strength Saving Throw: DC 13, one Medium or smaller creature in the air elemental's space. Failure: 24 (4d10 + 2) Thunder damage, and the target is pushed up to 20 feet straight away from the air elemental and has the Prone condition. Success: Half damage only.

Answered Howl. Constitution Saving Throw: DC 13, one creature within 60 feet. Failure: The target has the Deafened condition until the end of its next turn.

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

## 06. Sloughing Barrow — CR 5
**Input:** `a quarry-pit thing of living scree that buries what it catches`
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 30s

**`[path]`, donor and the mind tiers**
```
**Donor:** brute-5-grappler -> CR 5
[path] homebrew — "a quarry-pit thing of living scree that buries what it catches" (call)
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as mindless, and the card's 4 is already that dim
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 5
[reskin] mind tier: CHA 4 -> 10 — the call read this creature as ordinary at CR 5
[reskin] alignment by mind: "Neutral" -> Unaligned — a Elemental the call reads as mindless at INT 4 holds no ethics (owner's ruling, 2026-11-15)
```

```
Sloughing Barrow
Large elemental, unaligned
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

	

15 (+2)

	

10 (+0)

Skills: 

Athletics +6, Perception +5

Saving Throws: 

STR +6

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

tremorsense 60 ft., passive Perception 15

Languages: 

None

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Entomb (Bonus Action).The barrow entombs one Medium or smaller creature it is grappling. While entombed, the target is blinded and restrained, has Total Cover against attacks and other effects outside the barrow, and takes 7 (2d6) bludgeoning damage at the start of each of the barrow's turns. The barrow can have only one creature entombed at a time. If the barrow takes 15 damage or more in a single turn from the entombed creature, the barrow must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the barrow. If the barrow dies, an entombed creature breaks free prone by using 5 feet of movement.

Actions
Multiattack: The barrow makes two Avalanche Slam attacks.
Avalanche Slam: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained.
Rubble Shove: Each creature in a 30-foot-long, 5-foot-wide line must succeed on a DC 14 Strength saving throw or be pushed up to 5 feet straight away from the barrow and be knocked prone.
```

---

## 07. Hydra — CR 8
**Input:** `name: Hydra | whose stumps smoke instead of regrowing`
**Donor:** brute-5 -> CR 8
**Signature:** dropped · **elapsed** 26s

**`[path]`, donor and the mind tiers**
```
**Donor:** brute-5 -> CR 8
[path] twist — Hydra (is) — "Name field: Hydra" (code)
```

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

Scalding Smoke.A creature that touches the hydra or hits it with a melee attack while within 5 feet of it takes 7 (2d6) poison damage.
Hold Breath.The hydra can hold its breath for 1 hour.
Multiple Heads.The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead.
Reactive Heads.For each head the hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks.

Actions
Multiattack: The hydra makes as many Bite attacks as it has heads.
Bite: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.
```

---

## 08. Unfinished Wallbreaker — CR 8
**Input:** `a siege-engine golem of lashed timber that shoulders through walls`
**Donor:** brute-5-juggernaut -> CR 8
**Signature:** library · **elapsed** 22s

**`[path]`, donor and the mind tiers**
```
**Donor:** brute-5-juggernaut -> CR 8
[path] homebrew — "a siege-engine golem of lashed timber that shoulders through walls" (call)
[reskin] mind tier held: INT stays 6 against "feeble" — the card's 6 is already feeble
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
```

```
Unfinished Wallbreaker

Huge Construct, Neutral

AC 15
Initiative -1 (9)

HP 152 (16d12 + 48)

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

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Wreckage Stride. Difficult Terrain composed of rubble, wreckage, or broken walls doesn't cost the wallbreaker extra movement, and the wallbreaker can move across rubble, wreckage, or broken walls without needing to make an ability check.

Immutable Form. The wallbreaker can't shape-shift.

Magic Resistance. The wallbreaker has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The wallbreaker makes two Battering Slam attacks.

Battering Slam. Melee Attack Roll: +8, reach 10 ft. 27 (5d8 + 5) Bludgeoning damage.

Trample (Recharge 5-6). The wallbreaker moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Dexterity Saving Throw: DC 16. Failure: 27 (6d8) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

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

## 09. Stone Golem — CR 10
**Input:** `name: Stone Golem | carved as a weeping saint`
**Donor:** brute-9 -> CR 10
**Signature:** library · **elapsed** 27s

**`[path]`, donor and the mind tiers**
```
**Donor:** brute-9 -> CR 10
[path] twist — Stone Golem (is) — "Name field: Stone Golem" (code)
[reskin] alignment by body: Lawful Neutral -> Unaligned — a Construct at INT 3 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at
```

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
+6
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
+5
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

Trail of Stone Tears. When the golem moves along the ground, the ground within 5 feet of the path it traveled becomes rubble-strewn Difficult Terrain for other creatures until the end of the golem's next turn; the golem ignores this Difficult Terrain.

Immutable Form. The golem can't shape-shift.

Magic Resistance. The golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The golem makes two attacks, using Slam or Force Bolt in any combination.

Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.

Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.

Stone Burst (1/Day). Constitution Saving Throw: DC 17, each creature in a 15-foot Emanation originating from the golem. Failure: 35 (10d6) Bludgeoning damage. Success: Half damage.

Bonus Actions

Slow (Recharge 5-6). The golem casts the Slow spell, requiring no spell components and using Constitution as the spellcasting ability (spell save DC 17).

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

## 10. Drowned Choir — CR 10
**Input:** `a drowned cathedral choir that sings in one voice`
**Donor:** lurker-8 -> CR 10
**Signature:** library · **elapsed** 34s

**`[path]`, donor and the mind tiers**
```
**Donor:** lurker-8 -> CR 10
[path] homebrew — "a drowned cathedral choir that sings in one voice" (call)
[reskin] mind tier: INT 13 -> 15 — the call read this creature as capable at CR 10
[reskin] mind tier: WIS 14 -> 20 — the call read this creature as formidable at CR 10
[reskin] mind tier: CHA 11 -> 20 — the call read this creature as formidable at CR 10
```

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


12 (+1)

	

16 (+3)

	

17 (+3)

	

15 (+2)

	

20 (+5)

	

20 (+5)

Skills: 

Perception +9, Stealth +11

Saving Throws: 

DEX +7, INT +6

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

blindsight 30 ft. (blind beyond this radius), passive Perception 19

Languages: 

Common plus the languages it knew in life

Challenge

10 (5,900 XP)

Proficiency Bonus:

+4

Fear Aura.The choir emanates an aura in a 20-foot radius while it is not incapacitated. Any enemy that starts its turn in the aura must make a DC 15 Wisdom saving throw. On a failed save, the target is frightened until the end of its next turn. On a successful save, the target is immune to this creature's aura for 24 hours.
Umbral Step (Bonus Action).While in Dim Light or Darkness, the choir takes the Hide action.

Actions
Multiattack: The choir makes three attacks. It can replace one attack with a use of Unified Hymn.
Strike Hands: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage plus 7 (2d6) necrotic damage.
Unified Hymn: Each creature of the choir's choice in a 60-foot radius originating from the choir that can see or hear the choir must make a DC 15 Wisdom saving throw. On a failed save, the target is charmed until the start of its next turn, and while charmed this way, it must move toward the choir by the safest available route on its turn and can't take Reactions. On a successful save, the target is immune to this creature's lure for 24 hours.
```

---

## 11. Vampire — CR 13
**Input:** `name: Vampire | who keeps a garden of thorns`
**Donor:** lurker-13 -> CR 13
**Signature:** library · **elapsed** 37s

**`[path]`, donor and the mind tiers**
```
**Donor:** lurker-13 -> CR 13
[path] twist — Vampire (is) — "Name field: Vampire" (code)
```

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

DEX +9, CON +9, WIS +7, CHA +9

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

Briar Communion.While the vampire is in dim light or darkness, at the start of each of its turns, each creature restrained by the vampire's Thorn-Sown Wound takes 13 (3d8) piercing damage, and the vampire regains hit points equal to the damage dealt.
Legendary Resistance (3/Day).If the vampire fails a saving throw, it can choose to succeed instead.
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
Multiattack (Vampire Form Only): The vampire makes two Grave Strike attacks and uses Bite. It can replace one attack with a use of Thorn-Sown Wound.
Grave Strike: Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) from one of two hands.
Thorn-Sown Wound: One creature within 5 feet of the vampire must succeed on a DC 17 Strength saving throw or be restrained until the end of its next turn.
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that has the grappled, incapacitated, or restrained condition must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) piercing damage on a failed save, plus 13 (3d8) necrotic damage. The target's Hit Point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a Vampire Spawn under the vampire's control.
Legendary Actions

The vampire can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The vampire regains spent legendary actions at the start of its turn.

Deathless Strike: The vampire moves up to half its Speed, and it makes one Grave Strike attack.
Beguile: The vampire casts Command, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17). The vampire can't take this action again until the start of its next turn.
```

---

## 12. Pestilent Archon — CR 13
**Input:** `a plague-bearing archon of flies that commands lesser swarms`
**Donor:** skirmisher-13-winged -> CR 13 (invented — no printed peer)
**Signature:** library · **elapsed** 33s

**`[path]`, donor and the mind tiers**
```
**Donor:** skirmisher-13-winged -> CR 13 (invented — no printed peer)
[path] homebrew — title archon — "a plague-bearing archon of flies that commands lesser swarms" (call)
[reskin] mind tier: INT 10 -> 15 — the call read this creature as capable at CR 13
[reskin] mind tier: WIS 16 -> 20 — the call read this creature as formidable at CR 13
[reskin] mind tier: CHA 12 -> 20 — the call read this creature as formidable at CR 13
```

```
Pestilent Archon

Large Aberration, Neutral Evil

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
15
+2
+2
MOD
SAVE
DEX
20
+5
+10
WIS
20
+5
+10
MOD
SAVE
CON
18
+4
+4
CHA
20
+5
+5

Skills Perception +10, Stealth +10

Senses darkvision 120 ft.; Passive Perception 20

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Hive Wells. Whenever a creature within the archon's reach is reduced to 0 Hit Points, the archon regains 13 (3d8) Hit Points as the brood feeds.

Swarm Veil. The archon doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.

Brood Skitter. When a creature the archon can see ends its turn within 5 feet of it, the archon can move up to 10 feet without provoking Opportunity Attacks.

Actions

Multiattack. The archon makes three Proboscis attacks. It can replace one attack with a use of Brood Command.

Proboscis. Melee Attack Roll: +10, reach 10 ft. 14 (2d8 + 5) Piercing damage plus 10 (3d6) Poison damage. If the archon flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 7 (2d6) Piercing damage and, if it is Large or smaller, has the Prone condition.

Plague Swoop (Recharge 5-6). The archon flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Dexterity Saving Throw: DC 17. Failure: 66 (12d10) Poison damage, and the target has the Prone condition. Success: Half damage.

Brood Command. Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Blinded condition until the start of its next turn.

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

---

## 13. Purple Worm — CR 15
**Input:** `name: Purple Worm | that swallowed a war-band's armoury`
**Donor:** brute-13 -> CR 15 (invented — no printed peer)
**Signature:** library · **elapsed** 28s

**`[path]`, donor and the mind tiers**
```
**Donor:** brute-13 -> CR 15 (invented — no printed peer)
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
```

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
+9
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
+4
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

Immunities Acid

Senses tremorsense 60 ft.; Passive Perception 14

Languages None

CR 15 (XP 13,000; PB +5)

Traits

Lodged Armoury. When a creature hits the purple worm with a nonmagical weapon, the weapon lodges in the purple worm's body, and the attacker no longer has that weapon. The purple worm can have two weapons lodged in it at a time. A lodged weapon can be pulled free by a creature within reach that succeeds on a DC 21 Strength (Athletics) check as an action.

Tunneler. The purple worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The purple worm makes one Bite attack and one Tail Stinger attack. It can replace one attack with a use of Swallow.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

Swallow. Dexterity Saving Throw: DC 21, one Large or smaller creature within 10 feet that the purple worm hit with a melee attack this turn. Failure: The target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the purple worm, and takes 21 (6d6) Acid damage at the start of each of the purple worm's turns. If the purple worm takes 40 damage or more on a single turn from a creature inside it, it must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the purple worm and has the Prone condition. If the purple worm dies, a swallowed creature is no longer Restrained and can escape from the corpse using 15 feet of movement, exiting with the Prone condition.

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

## 14. Glacier Heart — CR 15
**Input:** `a glacier's heart given legs, trailing a wake of killing cold`
**Donor:** brute-9-juggernaut -> CR 15
**Signature:** library · **elapsed** 30s

**`[path]`, donor and the mind tiers**
```
**Donor:** brute-9-juggernaut -> CR 15
[path] homebrew — "a glacier's heart given legs, trailing a wake of killing cold" (call)
[reskin] mind tier held: INT stays 6 against "feeble" — the call read this creature as bestial, and the card's 6 is already that dim
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier: CHA 4 -> 15 — the call read this creature as capable at CR 15
[reskin] alignment by mind: "Neutral" -> Unaligned — a Elemental the call reads as bestial at INT 6 holds no ethics (owner's ruling, 2026-11-15)
```

```
Glacier Heart
Huge elemental, unaligned
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

	

15 (+2)

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

Killing Cold Wake.At the end of each of the heart's turns, each creature in a 5-foot radius originating from the heart takes 13 (3d8) cold damage.
Cold Absorption.Whenever the heart is subjected to cold damage, it takes no damage and instead regains a number of hit points equal to the cold damage dealt.
Siege Monster.The heart deals double damage to objects and structures.

Actions
Multiattack: The heart makes two Slam attacks. It can replace one attack with a use of Heartchill Lance.
Slam: Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage plus 13 (3d8) cold damage.
Killing Cold (Recharge 5-6): Each creature in a 30-foot cone must make a DC 17 Constitution saving throw, taking 66 (12d10) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also deafened until the end of its next turn.
Heartchill Lance: The heart strikes where the target cannot guard. One creature within 60 feet must make a DC 17 Dexterity saving throw, taking 31 (9d6) cold damage on a failed save, or half as much damage on a successful one.
```

---

## 15. Adult Red Dragon — CR 17
**Input:** `name: Adult Red Dragon | blind in one eye from an old lance`
**Donor:** dragon-15 -> CR 17
**Signature:** library · **elapsed** 33s

**`[path]`, donor and the mind tiers**
```
**Donor:** dragon-15 -> CR 17
[path] twist — Adult Red Dragon (is) — "Name field: Adult Red Dragon" (code)
```

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

Legendary Resistance (3/Day).If the red dragon fails a saving throw, it can choose to succeed instead.
Searing Furrow.When the red dragon moves at least 20 feet in a straight line, flying or on the ground, it leaves a stationary 20-foot-radius burning zone centered on a point it passed through, persisting until the end of the dragon's next turn; a creature that starts its turn in the zone takes 13 (3d8) fire damage.
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

---

## 16. Brass Tyrant — CR 17
**Input:** `a tyrant of burning brass who rules a city of forges`
**Donor:** brute-17-juggernaut -> CR 17
**Signature:** library · **elapsed** 31s

**`[path]`, donor and the mind tiers**
```
**Donor:** brute-17-juggernaut -> CR 17
[path] homebrew — title tyrant — "a tyrant of burning brass who rules a city of forges" (call)
[reskin] mind tier: INT 6 -> 15 — the call read this creature as capable at CR 17
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 17
[reskin] mind tier: CHA 4 -> 20 — the call read this creature as formidable at CR 17
```

```
Brass Tyrant

Huge Construct, Lawful Evil

AC 19
Initiative -1 (9)

HP 230 (20d12 + 100)

Speed 30 ft.

MOD
SAVE
STR
22
+6
+12
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
20
+5
+5
MOD
SAVE
CON
20
+5
+11
CHA
20
+5
+5

Skills Athletics +12, Perception +11

Immunities Fire, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 120 ft.; Passive Perception 21

Languages Common

CR 17 (XP 18,000; PB +6)

Traits

Fear Aura. The brass tyrant emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 19, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Legendary Resistance (3/Day). If the brass tyrant fails a saving throw, it can choose to succeed instead.

Immutable Form. The brass tyrant can't shape-shift.

Siege Monster. The brass tyrant deals double damage to objects and structures.

Actions

Multiattack. The brass tyrant makes two Furnace Fist attacks. It can replace one attack with a use of Molten Brand.

Furnace Fist. Melee Attack Roll: +12, reach 10 ft. 19 (3d8 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.

Molten Spray (Recharge 5-6). Constitution Saving Throw: DC 19, each creature in a 60-foot Cone. Failure: 66 (12d10) Fire damage. Success: Half damage only.

Molten Brand. Constitution Saving Throw: DC 19, one creature within 60 feet. Failure: 36 (8d8) Fire damage. Success: Half damage only.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the brass tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Wade Through. The brass tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Furnace Fist attack.

Rend Walls. The brass tyrant moves up to half its Speed without provoking Opportunity Attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.

Quake Step. Strength Saving Throw: DC 19, each creature within 10 feet of the brass tyrant. Failure: The target has the Prone condition.

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

## 17. Pit Fiend — CR 20
**Input:** `name: Pit Fiend | who collects the oaths of dying knights`
**Donor:** defender-17 -> CR 20 (invented — no printed peer)
**Signature:** library · **elapsed** 31s

**`[path]`, donor and the mind tiers**
```
**Donor:** defender-17 -> CR 20 (invented — no printed peer)
[path] twist — Pit Fiend (is) — "Name field: Pit Fiend" (code)
```

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
+8
INT
22
+6
+6
MOD
SAVE
DEX
14
+2
+8
WIS
18
+4
+10
MOD
SAVE
CON
24
+7
+7
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

Oathbrand Shield. While the pit fiend wields its oath-branded shield, the pit fiend regains 14 (4d6) Hit Points at the start of each of its turns; if the shield is destroyed, dropped, or taken from the pit fiend's grasp, it regains no Hit Points until it wields the shield again.

Legendary Resistance (3/Day). If the pit fiend fails a saving throw, it can choose to succeed instead.

Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend's aura for 24 hours.

Magic Resistance. The pit fiend has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack. It can replace one attack with a use of Oathbrand Smash.

Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Oathbrand Smash. Dexterity Saving Throw: DC 21, one creature within 10 feet. Failure: 32 (5d12) Bludgeoning damage.

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

---

## 18. Bone Sun Archlich — CR 20
**Input:** `an archlich enthroned on a sun of bone`
**Donor:** caster-21 -> CR 20
**Signature:** library · **elapsed** 38s

**`[path]`, donor and the mind tiers**
```
**Donor:** caster-21 -> CR 20
[path] twist — Lich (is) — "archlich" (call)
```

```
Bone Sun Archlich
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

DEX +9, CON +9, INT +11, WIS +8

Damage Resistances: 

cold, lightning

Damage Immunities: 

necrotic, poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, poisoned

Senses: 

darkvision 120 ft., passive Perception 18

Languages: 

All

Challenge

20 (25,000 XP)

Proficiency Bonus:

+6

Bone Sun Throne.The archlich keeps its sun of bone within 30 feet of itself. That object has AC 17, HP 25, and Resistance to all damage. While it is intact, the archlich regains 20 hit points at the start of each of its turns.
Legendary Resistance (3/Day).If the archlich fails a saving throw, it can choose to succeed instead.
Spirit Jar.If destroyed, the archlich reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the archlich's lair.
Protective Magic (Reaction).The archlich casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: The archlich makes three attacks, using Eldritch Burst or Paralyzing Touch. It can replace one attack with a use of (A) Throne-Bone Binding or (B) Spellcasting to cast Fear.
Eldritch Burst: Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 31 (4d12 + 5) force damage.
Paralyzing Touch: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed until the start of the archlich's next turn.
Spellcasting: The archlich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19): - At will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
2/day each: Animate Dead, Dimension Door, Plane Shift
1/day each: Chain Lightning, Finger of Death, Power Word Kill, Scrying
Throne-Bone Binding: One creature within 60 feet of the archlich must succeed on a DC 19 Strength saving throw or be restrained until the end of its next turn.
Legendary Actions

The archlich can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The archlich regains spent legendary actions at the start of its turn.

Deathly Teleport: The archlich teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an Undead in a 20-foot radius originating from the archlich must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one.
Frightening Gaze: The archlich casts Fear, using the same spellcasting ability as Spellcasting. The archlich can't take this action again until the start of its next turn.
```

---

## 19. Ancient Gold Dragon — CR 24
**Input:** `name: Ancient Gold Dragon | `
**Donor:** —
**Signature:** — · **elapsed** 11s

**`[path]`, donor and the mind tiers**
```
**Donor:** —
[path] exact — Ancient Gold Dragon (is) — "Ancient Gold Dragon" (code)
```

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

---

## 20. Trench Leviathan — CR 24
**Input:** `a leviathan of the trench whose song drowns fleets`
**Donor:** brute-21 -> CR 24 (invented — no printed peer)
**Signature:** library · **elapsed** 30s

**`[path]`, donor and the mind tiers**
```
**Donor:** brute-21 -> CR 24 (invented — no printed peer)
[path] homebrew — "a leviathan of the trench whose song drowns fleets" (call)
[reskin] mind tier: INT 10 -> 15 — the call read this creature as capable at CR 24
[reskin] mind tier: WIS 14 -> 20 — the call read this creature as formidable at CR 24
[reskin] mind tier: CHA 14 -> 20 — the call read this creature as formidable at CR 24
```

```
Trench Leviathan

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
15
+2
+2
MOD
SAVE
DEX
10
+0
+0
WIS
20
+5
+12
MOD
SAVE
CON
24
+7
+14
CHA
20
+5
+5

Skills Athletics +16, Perception +12

Senses blindsight 120 ft., darkvision 240 ft.; Passive Perception 22

Languages Common

CR 24 (XP 62,000; PB +7)

Traits

Amphibious. The leviathan can breathe air and water.

Legendary Resistance (3/Day). If the leviathan fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The leviathan makes two Tail attacks. It can replace one attack with a use of Sundering Note (Recharge 5-6).

Tail. Melee Attack Roll: +16, reach 15 ft. 36 (6d8 + 9) Bludgeoning damage.

Trench Song (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Sundering Note. Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 38 (11d6) Thunder damage, and the target has the Deafened condition until the end of its next turn.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the leviathan can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Surge and Strike. The leviathan moves up to half its Speed without provoking Opportunity Attacks, and it makes one Tail attack.

Brined Slam. Strength Saving Throw: DC 24, each creature within 10 feet of the leviathan. Failure: The target has the Prone condition.

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

## 21. Owlbear — CR 3
**Input:** `name: Owlbear | `
**Donor:** brute-2 -> CR 3
**Signature:** dropped · **elapsed** 13s

**`[path]`, donor and the mind tiers**
```
**Donor:** brute-2 -> CR 3
[path] exact — Owlbear (is) — "Owlbear" (code)
```

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
+5
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

---

## 22. Goblin Boss — CR auto
**Input:** `name: Goblin Boss | `
**Donor:** skirmisher-1 -> CR 1
**Signature:** dropped · **elapsed** 21s

**`[path]`, donor and the mind tiers**
```
**Donor:** skirmisher-1 -> CR 1
[path] exact — Goblin Boss (is) — "Goblin Boss" (code)
```

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

Senses: 

darkvision 60 ft., passive Perception 9

Languages: 

Common, Goblin

Challenge

1 (200 XP)

Proficiency Bonus:

+2

Nimble Escape (Bonus Action).The goblin boss takes the Disengage or Hide action.
Redirect Attack (Reaction).When a creature the goblin boss can see makes an attack roll against it, the goblin boss chooses a Small or Medium ally within 5 feet of itself. The goblin boss and that ally swap places, and the ally becomes the target of the attack instead.

Actions
Multiattack: The goblin boss makes two attacks, using Scimitar or Shortbow.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had advantage.
Shortbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.
```

---

## 23. Vashka the Red — CR 6
**Input:** `name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.`
**Donor:** defender-5 -> CR 6
**Signature:** library · **elapsed** 30s

**`[path]`, donor and the mind tiers**
```
**Donor:** defender-5 -> CR 6
[path] refused: species "hobgoblin" has no kit
[path] class_npc — Hobgoblin Warrior (is) — class fighter — "warlord" (call)
```

```
Vashka the Red

Medium Humanoid, Lawful Evil

AC 19
Initiative +1 (11)

HP 93 (17d8 + 17)

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
12
+1
+1
WIS
10
+0
+0
MOD
SAVE
CON
12
+1
+4
CHA
9
-1
-1

Skills Athletics +7, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Goblin

CR 6 (XP 2,300; PB +3)

Traits

Pack Tactics. Vashka has Advantage on an attack roll against a creature if at least one of Vashka's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. Vashka makes two attacks, using Longsword or Longbow in any combination. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Longbow. Ranged Attack Roll: +7, range 150/600 ft. 22 (4d8 + 4) Piercing damage.

Shield Bash. Strength Saving Throw: DC 15, one creature of Vashka's choice within 5 feet. Failure: The target is pushed up to 5 feet straight away from Vashka, and the target has the Prone condition.

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

---

## 24. Hiveshell Hatchery Drone — CR 9
**Input:** `A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.`
**Donor:** brute-8-grappler -> CR 9
**Signature:** library · **elapsed** 31s

**`[path]`, donor and the mind tiers**
```
**Donor:** brute-8-grappler -> CR 9
[path] homebrew — "A Large insectile horror." (call)
[reskin] mind tier held: INT stays 4 — the call gave no usable tier
[reskin] mind tier held: CHA stays 6 against "feeble" — the card's 6 is already feeble
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 9
```

```
Hiveshell Hatchery Drone

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
15
+2
+2
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

Skills Athletics +8, Perception +6

Immunities Acid

Senses darkvision 60 ft.; Passive Perception 16

Languages None

CR 9 (XP 5,000; PB +4)

Traits

Caustic Shell. When a creature starts its turn Grappled by the hatchery drone or while it has the hatchery drone Grappled, the creature takes 16 (3d10) Acid damage.

Actions

Multiattack. The hatchery drone makes two attacks, using Spitting Maw or Scythe-Arms in any combination.

Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 17 (3d8 + 4) Piercing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16). Once on each of the hatchery drone's turns when it hits with this attack, the target is subjected to the following effect. Strength Saving Throw: DC 15. Failure: The target has the Stunned condition until the end of its next turn.

Scythe-Arms. Melee Attack Roll: +8, reach 5 ft. 17 (3d8 + 4) Slashing damage.

Two-Armed Pin. Strength Saving Throw: DC 15, one creature within 5 feet. Failure: The target has the Restrained condition until the end of its next turn.

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

## 25. Ironward Sentinel — CR 11
**Input:** `a sentinel of black iron, AC 20, Huge, speed 20 feet`
**Donor:** defender-7-warden -> CR 11
**Signature:** library · **elapsed** 31s

**`[path]`, donor and the mind tiers**
```
**Donor:** defender-7-warden -> CR 11
[path] homebrew — "a sentinel of black iron" (call)
[reskin] mind tier held: INT stays 7 against "feeble" — the card's 7 is already feeble
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 11
[reskin] mind tier: CHA 3 -> 10 — the call read this creature as ordinary at CR 11
```

```
Ironward Sentinel
Huge construct, lawful neutral
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

	

20 (+5)

	

10 (+0)

Skills: 

Perception +9

Saving Throws: 

CON +8

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

darkvision 120 ft., passive Perception 19

Languages: 

Common

Challenge

11 (7,200 XP)

Proficiency Bonus:

+4

Grinding Watch.While the ironward sentinel is within reach of its ward, the ironward sentinel and its ward cannot be moved against their will; any effect that would push, pull, or drag either of them fails, and the ironward sentinel cannot be made to leave its current space.
Ward Bond.The ironward sentinel is magically bound to a ward of its choosing, and it can have only one ward at a time. While the ironward sentinel is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the ironward sentinel.
Regeneration.The ironward sentinel regains 10 hit points at the start of each of its turns if it has at least 1 Hit Point.

Actions
Multiattack: The ironward sentinel makes two Warhammer attacks.
Warhammer: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage.
Iron Bulwark (2/Day): The ironward sentinel targets itself or one creature it can see within 60 feet. The target gains 24 (7d6) temporary hit points, and it gains a +2 bonus to AC until the end of the ironward sentinel's next turn.
```

---

## 26. Mirebound Hedgewitch — CR auto
**Input:** `a marsh witch who curses trespassers, cr 7`
**Donor:** caster-8-binder -> CR 7
**Signature:** library · **elapsed** 31s

**`[path]`, donor and the mind tiers**
```
**Donor:** caster-8-binder -> CR 7
[path] class_npc — class mage — "witch" (call)
```

```
Mirebound Hedgewitch

Medium Fey, Neutral

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

Senses darkvision 60 ft.; Passive Perception 14

Languages Common and any three languages, Sylvan

CR 7 (XP 2,900; PB +3)

Traits

Fear Aura. The hedgewitch emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 14, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Actions

Multiattack. The hedgewitch makes three Arcane Burst attacks. It can replace one attack with a use of Vengeful Glamour.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. The hedgewitch casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Vengeful Glamour. Charisma Saving Throw: DC 14, one creature within 60 feet. Failure: The target is cursed until the end of the hedgewitch's next turn. The first time the cursed target deals damage to any creature before then, it takes 10 (3d6) Psychic damage.

Trespasser's Curse. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: 19 (3d12) Psychic damage, and the target has the Frightened condition until the end of its next turn.

Bonus Actions

Misty Step (3/Day). The hedgewitch casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). The hedgewitch casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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

## 27. Ironbound Templar — CR 6
**Input:** `a templar priest with a mace and no magic at all`
**Donor:** defender-5 -> CR 6
**Signature:** library · **elapsed** 28s

**`[path]`, donor and the mind tiers**
```
**Donor:** defender-5 -> CR 6
[path] class_npc — class paladin — "templar" (call)
```

```
Ironbound Templar

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

CR 6 (XP 2,300; PB +3)

Traits

Broken Oath's Weight. When the templar hits a creature that has the Prone condition, the mace deals an extra 11 (2d10) Bludgeoning damage to the target.

Aura of Authority. While in a 10-foot Emanation originating from the templar, the templar and its allies have Advantage on attack rolls and saving throws, provided the templar doesn't have the Incapacitated condition.

Actions

Multiattack. The templar makes three Mace attacks.

Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the templar's next turn, and the target has the Prone condition.

Reactions

Parry. Trigger: The templar is hit by a melee attack roll while holding a weapon. Response: The templar adds 3 to its AC against that attack, possibly causing it to miss.

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

## 28. Ilvareth Dusksong — CR 12
**Input:** `name: Ilvareth Dusksong | An elf archmage who bends shadow and steps between places.`
**Donor:** caster-12 -> CR 12
**Signature:** library · **elapsed** 37s

**`[path]`, donor and the mind tiers**
```
**Donor:** caster-12 -> CR 12
[path] class_npc — class mage — "archmage" (call)
```

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

Split Between Moments.While a creature outside 5 feet of Ilvareth attacks him, or when Ilvareth takes damage from an attack while the afterimage is active, attacks from beyond 5 feet have disadvantage, but a creature can spend its action on a Wisdom (DC 17) Perception check to see through the afterimage and ignore this trait until Ilvareth's next turn; taking damage from an attack ends the afterimage's benefit until the start of Ilvareth's next turn.
Magic Resistance.Ilvareth has advantage on saving throws against spells and other magical effects.
Misty Step (3/Day) (Bonus Action).Ilvareth casts Misty Step, using the same spellcasting ability as Spellcasting.
Protective Magic (3/Day) (Reaction).When Ilvareth is hit by an attack roll, Ilvareth casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Ilvareth makes four Arcane Burst attacks.
Arcane Burst: Melee or Ranged Spell Attack: +9 to hit, reach 5 ft. or range 150 ft., one target. Hit: 27 (4d10 + 5) force damage.
Spellcasting: Ilvareth casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17): - At will: Detect Magic, Detect Thoughts, Disguise Self, Invisibility, Light, Mage Armor, Mage Hand, Prestidigitation
2/day each: Fly, Lightning Bolt
1/day each: Cone of Cold, Mind Blank, Scrying, Teleport
```

---

## 29. Swarm of Funeral Bells — CR 13
**Input:** `a swarm of funeral bells that ring themselves over the dying`
**Donor:** swarm-9 -> CR 13 (invented — no printed peer)
**Signature:** dropped · **elapsed** 33s

**`[path]`, donor and the mind tiers**
```
**Donor:** swarm-9 -> CR 13 (invented — no printed peer)
[path] homebrew — "a swarm of funeral bells that ring themselves over the dying" (call)
[reskin] mind tier: INT 4 -> 10 — the call read this creature as ordinary at CR 13
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 13
[reskin] mind tier: CHA 2 -> 20 — the call read this creature as formidable at CR 13
```

```
Swarm of Funeral Bells

Medium Swarm of Tiny Constructs, Neutral

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
10
+0
+0
MOD
SAVE
DEX
20
+5
+5
WIS
15
+2
+2
MOD
SAVE
CON
18
+4
+4
CHA
20
+5
+5

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned

Senses darkvision 60 ft.; Passive Perception 12

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Blood Frenzy. While the swarm is missing any Hit Points, or while a creature within 5 feet of it is missing any Hit Points, the swarm has Advantage on attack rolls against any creature that is below its Hit Point maximum.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Multiattack. The swarm makes two Toll attacks.

Toll. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Thunder damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Thunder damage if the swarm is Bloodied.

Death Knell Peal (Recharge 5-6). Constitution Saving Throw: DC 17, one creature within 30 feet. Failure: 31 (9d6) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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

## 30. Reliquary Vault Ooze — CR 9
**Input:** `a cathedral-vault ooze that digests reliquaries`
**Donor:** ooze-9 -> CR 9 (invented — no printed peer)
**Signature:** library · **elapsed** 33s

**`[path]`, donor and the mind tiers**
```
**Donor:** ooze-9 -> CR 9 (invented — no printed peer)
[path] homebrew — "a cathedral-vault ooze that digests reliquaries" (call)
[reskin] mind tier held: INT stays 2 against "feeble" — the call read this creature as mindless, and the card's 2 is already that dim
[reskin] mind tier: WIS 8 -> 15 — the call read this creature as capable at CR 9
[reskin] mind tier: CHA 1 -> 10 — the call read this creature as ordinary at CR 9
```

```
Reliquary Vault Ooze
Large ooze, unaligned
Armor Class

10 (natural armor)

Hit Points: 

153 (18d10 + 54)

Speed: 

20 ft., climb 20 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

6 (-2)

	

16 (+3)

	

2 (-4)

	

15 (+2)

	

10 (+0)

Damage Immunities: 

acid

Condition Immunities: 

charmed, deafened, exhaustion, frightened, grappled, prone, restrained

Senses: 

blindsight 60 ft. (blind beyond this radius), passive Perception 12

Languages: 

None

Challenge

9 (5,000 XP)

Proficiency Bonus:

+4

Eaten-Away Sanctity.At the start of the vault ooze's turn, each nonmagical object the vault ooze is in contact with that is not being worn or carried takes 14 (4d6) acid damage, and this damage ignores the object's damage thresholds and immunities, dissolving it as the ooze moves on.
Amorphous.The vault ooze can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form.A creature that touches the vault ooze or hits it with a melee attack while within 5 feet of it takes 9 (2d8) acid damage.
Spider Climb.The vault ooze can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The vault ooze makes two Tendril attacks. It can replace one attack with a use of Caustic Burst.
Tendril: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 11 (2d10) acid damage.
Caustic Burst: One creature within 5 feet of the vault ooze must succeed on a DC 15 Dexterity saving throw or take 28 (8d6) acid damage.
```

---

## 31. Thunderhead Drake — CR 7
**Input:** `a young storm drake whose breath is a rolling wall of thunder`
**Donor:** dragon-2 -> CR 7
**Signature:** dropped · **elapsed** 27s

**`[path]`, donor and the mind tiers**
```
**Donor:** dragon-2 -> CR 7
[path] refused: print_body "Dragon" is not in the corpus
[path] refused: species "dragonborn" offered no receipt from the GM's words
[path] homebrew — "a young storm drake whose breath is a rolling wall of thunder" (call)
[reskin] mind tier: INT 12 -> 15 — the call read this creature as capable at CR 7
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 7
[reskin] mind tier: CHA 14 -> 18 — the call read this creature as formidable at CR 7
```

```
Thunderhead Drake

Large Dragon, Chaotic Neutral

AC 18
Initiative +1 (11)

HP 105 (14d10 + 28)

Speed 30 ft., Fly 60 ft.

MOD
SAVE
STR
18
+4
+4
INT
15
+2
+2
MOD
SAVE
DEX
12
+1
+4
WIS
15
+2
+5
MOD
SAVE
CON
15
+2
+2
CHA
18
+4
+4

Skills Perception +5, Stealth +4

Immunities Thunder

Senses blindsight 30 ft., darkvision 120 ft.; Passive Perception 15

Languages Common, Draconic

CR 7 (XP 2,900; PB +3)

Traits

Storm-Fed Hide. When the thunderhead drake takes Thunder damage from any source, the drake swells with stolen charge; until the end of its next turn, its Thunder Wall deals an additional 9 (2d8) Thunder damage.

Actions

Multiattack. The thunderhead drake makes two Talons attacks.

Talons. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage plus 7 (2d6) Thunder damage.

Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

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

## 32. Ordning Exile — CR 9
**Input:** `a stone giant exile who speaks only Giant and understands no Common`
**Donor:** brute-9 -> CR 9
**Signature:** library · **elapsed** 30s

**`[path]`, donor and the mind tiers**
```
**Donor:** brute-9 -> CR 9
[path] twist — Stone Giant (is) — "stone giant exile" (call)
```

```
Ordning Exile
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

Deflect Missile (Recharge 5-6) (Reaction).When the exile is hit by a ranged attack roll and takes Bludgeoning, Piercing, or slashing damage from it, the exile reduces the damage it takes from the attack by 11 (1d10 + 6), and if that damage is reduced to 0, the exile can redirect some of the attack's force. One creature the exile can see within 60 feet must make a DC 18 Dexterity saving throw, taking 11 (1d10 + 6) force damage on a failed save.

Actions
Multiattack: The exile makes two attacks: one with its Stone Club and one with its Boulder. It can replace one attack with a use of Word of the Ordning.
Stone Club: Melee Weapon Attack: +10 to hit, reach 15 ft., one target. Hit: 30 (7d6 + 6) bludgeoning damage.
Boulder: Ranged Weapon Attack: +10 to hit, range 60/240 ft., one target. Hit: 24 (4d8 + 6) bludgeoning damage.
Word of the Ordning: One creature within 60 feet must succeed on a DC 18 Wisdom saving throw or be frightened of the exile until the end of its next turn.
```

---

## 33. Marsh Reed Monk — CR 5
**Input:** `lizardfolk monk`
**Donor:** skirmisher-3 -> CR 5
**Signature:** library · **elapsed** 32s

**`[path]`, donor and the mind tiers**
```
**Donor:** skirmisher-3 -> CR 5
[path] class_npc — class monk — species lizardfolk — "monk" (call)
```

```
Marsh Reed Monk
Medium humanoid, neutral
Armor Class

15

Hit Points: 

94 (21d8)

Speed: 

30 ft., climb 30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


10 (+0)

	

16 (+3)

	

10 (+0)

	

12 (+1)

	

14 (+2)

	

16 (+3)

Skills: 

Perception +5, Stealth +6

Saving Throws: 

DEX +6

Senses: 

passive Perception 15

Languages: 

Common plus one other language, Draconic

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Hold Breath.The reed monk can hold its breath for 15 minutes.
Marsh Stride.Difficult Terrain composed of mud doesn't cost the reed monk extra movement, and the reed monk can move across mud without needing to make an ability check.
Patient Defense (Bonus Action).The reed monk takes the Dodge action.

Actions
Multiattack: The reed monk makes two attacks: one with its Unarmed Strike and one with its Dart.
Unarmed Strike: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage. Once on each of the reed monk's turns when it hits with this attack, the target is subjected to the following effect. The target must make a DC 14 Constitution saving throw. On a failed save, the target is stunned until the end of the reed monk's next turn.
Dart: Ranged Weapon Attack: +6 to hit, range 20/60 ft., one target. Hit: 12 (2d8 + 3) piercing damage.
```

---

## 34. Krennik Skullstandard — CR 4
**Input:** `name: Krennik Skullstandard | riding a worg`
**Donor:** skirmisher-3-mounted -> CR 4 (invented — no printed peer)
**Signature:** library · **elapsed** 27s

**`[path]`, donor and the mind tiers**
```
**Donor:** skirmisher-3-mounted -> CR 4 (invented — no printed peer)
[path] homebrew — "riding a worg" (call)
[reskin] mind tier held: INT stays 8 against "ordinary" — the card's 8 is already ordinary
[reskin] mind tier held: CHA stays 8 against "ordinary" — the card's 8 is already ordinary
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 4
```

```
Krennik Skullstandard
Medium humanoid, neutral
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

	

15 (+2)

	

8 (-1)

Skills: 

Perception +4, Stealth +5

Saving Throws: 

DEX +5

Senses: 

passive Perception 14

Languages: 

Common

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Crag Rider.Krennik ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Mounted Agility (Bonus Action).Krennik takes the Dash or Disengage action.
Spur the Beast (1/Day) (Bonus Action).Immediately after dealing damage to a creature that is already below half its hit point maximum, Krennik moves up to half its Speed, and it makes one Saber attack.

Actions
Multiattack: Krennik makes two attacks: one with Saber and one with Javelin.
Saber: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) slashing damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is knocked prone.
Javelin: Ranged Weapon Attack: +5 to hit, range 30/120 ft., one target. Hit: 6 (1d6 + 3) piercing damage.
Worg Charge (Recharge 5-6): Krennik moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Each creature whose space it enters must make a DC 13 Dexterity saving throw, taking 24 (7d6) bludgeoning damage on a failed save. On a failed save, the target is also knocked prone.
```

---

## 35. Well Drowned — CR 5
**Input:** `name: the thing in the well | `
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 34s

**`[path]`, donor and the mind tiers**
```
**Donor:** brute-5-grappler -> CR 5
[path] homebrew — "the thing in the well" (call)
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 5
[reskin] mind tier: CHA 4 -> 10 — the call read this creature as ordinary at CR 5
[reskin] alignment by mind: "Neutral Evil" -> Unaligned — a Elemental the call reads as bestial at INT 4 holds no ethics (owner's ruling, 2026-11-15)
```

```
Well Drowned

Medium Elemental, Unaligned

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

Skills Athletics +6, Perception +5

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Living Brine. The Well Drowned ignores the extra movement cost of climbing on difficult surfaces, including ceilings, and can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The drowned makes two Tendril attacks. It can replace one attack with a use of Creeping Dread.

Tendril. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Creeping Dread. Wisdom Saving Throw: DC 13, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the drowned's next turn. If the target was already Frightened by this ability, it also takes 18 (4d8) Psychic damage.

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

## 36. Mournglut — CR 4
**Input:** ` | role: brute`
**Donor:** brute-5-juggernaut -> CR 4
**Signature:** library · **elapsed** 26s

**`[path]`, donor and the mind tiers**
```
**Donor:** brute-5-juggernaut -> CR 4
[path] blank — "role: brute" (code)
[reskin] mind tier: INT 6 -> 15 — the call read this creature as capable at CR 4
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 4
[reskin] mind tier: CHA 4 -> 10 — the call read this creature as ordinary at CR 4
```

```
Mournglut

Medium Ooze, Neutral Evil

AC 14
Initiative -1 (9)

HP 82 (11d8 + 33)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
18
+4
+6
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
15
+2
+2
MOD
SAVE
CON
16
+3
+5
CHA
10
+0
+0

Skills Athletics +6, Perception +4

Immunities Acid, Lightning; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained

Senses blindsight 30 ft.; Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Spider Climb. The mournglut can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Lightning Absorption. Whenever the mournglut is subjected to Lightning damage, it takes no damage and instead regains a number of Hit Points equal to the Lightning damage dealt.

Magic Resistance. The mournglut has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The mournglut makes two Mudfist attacks. It can replace one attack with a use of Mortar Splatter.

Mudfist. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage.

Mortar Splatter. Constitution Saving Throw: DC 13, each creature in a 15-foot Cone. Failure: The target has the Blinded condition until the end of its next turn.

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

## 37. Meshrin — CR 8
**Input:** `name: Meshrin | Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages. Give him a frightening roar. AC 16, 120 hit points.`
**Donor:** skirmisher-8-hurler -> CR 8 (invented — no printed peer)
**Signature:** library · **elapsed** 29s

**`[path]`, donor and the mind tiers**
```
**Donor:** skirmisher-8-hurler -> CR 8 (invented — no printed peer)
[path] class_npc — class barbarian — species lizardfolk — "barbarian" (call)
```

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
Parry (Reaction).When Meshrin is hit by a melee attack roll while holding a weapon, Meshrin adds 3 to its AC against that attack, possibly causing it to miss.

Actions
Multiattack: Meshrin makes three attacks, using Greataxe or Javelin. It can replace one attack with a use of Frightening Roar.
Greataxe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (2d12 + 4) slashing damage.
Javelin: Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 18 (4d6 + 4) piercing damage.
Frightening Roar: Each creature of Meshrin's choice in a 30-foot radius originating from Meshrin that can see or hear it must make a DC 15 Wisdom saving throw. On a failed save, the target is frightened until the end of its next turn. On a successful save, the target is immune to this creature's terror for 24 hours.
```

---

## 38. Barrow Duelist — CR 6
**Input:** `a skeleton with a greatsword`
**Donor:** brute-5 -> CR 6
**Signature:** dropped · **elapsed** 29s

**`[path]`, donor and the mind tiers**
```
**Donor:** brute-5 -> CR 6
[path] twist — Skeleton (is) — "skeleton" (call)
[reskin] alignment by mind: "Neutral" -> Unaligned — a Undead the call reads as mindless at INT 6 holds no ethics (owner's ruling, 2026-11-15)
```

```
Barrow Duelist

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

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 12

Languages Understands Common plus one other language but can't speak

CR 6 (XP 2,300; PB +3)

Traits

Grinding Follow-Through. When the duelist's Greatsword attack misses a creature within its reach, the missed creature has Disadvantage on its next attack roll before the end of its next turn.

Great Weapon Master. When the duelist hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The duelist makes two attacks, using Greatsword or Hurled Greatsword in any combination.

Greatsword. Melee Attack Roll: +7, reach 5 ft. 21 (5d6 + 4) Slashing damage.

Hurled Greatsword. Ranged Attack Roll: +7, range 60/240 ft. 18 (4d6 + 4) Slashing damage.

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

## 39. Hired Axe — CR 5
**Input:** `a sellsword who hurls a handaxe and closes with a shortsword`
**Donor:** skirmisher-8-hurler -> CR 5 (invented — no printed peer)
**Signature:** library · **elapsed** 36s

**`[path]`, donor and the mind tiers**
```
**Donor:** skirmisher-8-hurler -> CR 5 (invented — no printed peer)
[path] class_npc — class fighter — "sellsword" (call)
```

```
Hired Axe
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

STR +7, DEX +5, CON +6, WIS +4

Senses: 

passive Perception 11

Languages: 

Common

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Follow-Through Throw.When the hired axe hits a creature with a shortsword attack, the hired axe makes one handaxe attack as a ranged attack against a different creature it can see; the thrown handaxe returns to its grasp at the start of its next turn.
Riposte (Reaction).When a creature within 5 feet of the hired axe misses it with a melee attack roll, the hired axe makes one Handaxe attack against that creature.
Parry (Reaction).When the hired axe is hit by a melee attack roll while holding a weapon, the hired axe adds 3 to its AC against that attack, possibly causing it to miss.

Actions
Multiattack: The hired axe makes three Handaxe attacks. It can replace one attack with a use of Shortsword.
Handaxe: Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) slashing damage, and the hired axe has advantage on its next attack roll against the target before the end of its next turn.
Shortsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage. Immediately after the attack, a handaxe returns to the hired axe's grasp, and the hired axe has advantage on its next attack roll against the target before the end of its next turn. Once on each of the hired axe's turns when it hits with this attack, the target is subjected to the following effect. The target must make a DC 15 Constitution saving throw. On a failed save, the target is stunned until the end of its next turn.
Shield Bash: One creature within 5 feet that the hired axe can see must make a DC 15 Strength saving throw, taking 9 (2d4 + 4) bludgeoning damage on a failed save. On a failed save, if the target is a Medium or smaller creature, it is knocked prone.
```

---

## 40. Brother Halric — CR 3
**Input:** `name: Brother Halric | `
**Donor:** defender-3 -> CR 3
**Signature:** library · **elapsed** 35s

**`[path]`, donor and the mind tiers**
```
**Donor:** defender-3 -> CR 3
[path] class_npc — class cleric — "Brother" (call)
```

```
Brother Halric
Medium construct, neutral
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

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Common plus one other language

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Divine Aid (3/Day) (Bonus Action).Halric casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame. It can replace one attack with a use of Hook and Reel.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Hook and Reel: One creature within 30 feet must make a DC 13 Strength saving throw, taking 13 (3d8) piercing damage on a failed save, or half as much damage on a successful one. On a failed save, the target is pulled up to 30 feet straight toward the brother and is grappled (escape DC 13).
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
```

# The sheets — ship-eight

---

## 01. Headless Horseman — CR 11
**Input:** `name: Headless Horseman | `
**Donor:** skirmisher-8-mounted -> CR 11 (invented — no printed peer)
**Signature:** library · **elapsed** 31s

**`[path]`, donor and the mind tiers**
```
**Donor:** skirmisher-8-mounted -> CR 11 (invented — no printed peer)
[path] homebrew — "Headless Horseman" (call)
[reskin] mind tier: INT 10 -> 15 — the call read this creature as capable at CR 11
[reskin] mind tier: WIS 14 -> 20 — the call read this creature as formidable at CR 11
[reskin] mind tier: CHA 10 -> 20 — the call read this creature as formidable at CR 11
```

```
Headless Horseman

Medium Undead, Neutral Evil

AC 17
Initiative +5 (15)

HP 180 (24d8 + 72)

Speed 50 ft.

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
20
+5
+9
WIS
20
+5
+9
MOD
SAVE
CON
17
+3
+3
CHA
20
+5
+5

Skills Perception +9, Stealth +9

Immunities Poison; Exhaustion, Poisoned, Blinded

Senses darkvision 60 ft.; Passive Perception 19

Languages Common plus the languages it knew in life

CR 11 (XP 7,200; PB +4)

Traits

Galloping Stride. The headless horseman ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The headless horseman makes three Grave-Iron Saber attacks.

Grave-Iron Saber. Melee Attack Roll: +9, reach 5 ft. 14 (2d8 + 5) Slashing damage plus 7 (2d6) Necrotic damage. If the headless horseman moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 5 (1d10) Slashing damage and, if it is Large or smaller, has the Prone condition.

Hoofbeat Charge (Recharge 5-6). The headless horseman moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Dexterity Saving Throw: DC 17. Failure: 66 (12d10) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

Bonus Actions

Mounted Agility. The headless horseman takes the Dash or Disengage action.

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

## 02. Pumpkin King — CR 10
**Input:** `name: Pumpkin King | `
**Donor:** brute-9 -> CR 10
**Signature:** library · **elapsed** 26s

**`[path]`, donor and the mind tiers**
```
**Donor:** brute-9 -> CR 10
[path] homebrew — title King — "Pumpkin King" (call)
[reskin] mind tier: INT 8 -> 15 — the call read this creature as capable at CR 10
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 10
[reskin] mind tier: CHA 8 -> 20 — the call read this creature as formidable at CR 10
```

```
Pumpkin King

Large Undead, Neutral Evil

AC 15
Initiative -1 (9)

HP 178 (21d10 + 63)

Speed 40 ft.

MOD
SAVE
STR
20
+5
+9
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
15
+2
+2
MOD
SAVE
CON
17
+3
+7
CHA
20
+5
+5

Skills Athletics +9, Perception +6

Immunities Fire, Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 16

Languages Common plus the languages it knew in life

CR 10 (XP 5,900; PB +4)

Traits

Vile Appearance. Wisdom Saving Throw: DC 17, any creature that starts its turn within 30 feet of the pumpkin king and can see it. Failure: The target has the Frightened condition until the end of its next turn. Success: The target is immune to this creature's gaze for 24 hours.

Actions

Multiattack. The pumpkin king makes two attacks, using Scythe or Jack-o'-Lantern in any combination.

Scythe. Melee Attack Roll: +9, reach 10 ft. 18 (3d8 + 5) Slashing damage plus 14 (4d6) Fire damage.

Jack-o'-Lantern. Ranged Attack Roll: +9, range 60/240 ft. 29 (7d6 + 5) Fire damage.

Bursting Crown (Recharge 5-6). Dexterity Saving Throw: DC 17, one creature within 30 feet. Failure: 31 (9d6) Fire damage, and the target has the Prone condition. Success: Half damage only.

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

## 03. Knife Ball — CR 5
**Input:** `name: Knife Ball | `
**Donor:** brute-5-juggernaut -> CR 5
**Signature:** library · **elapsed** 28s

**`[path]`, donor and the mind tiers**
```
**Donor:** brute-5-juggernaut -> CR 5
[path] homebrew — "Knife Ball" (call)
[reskin] mind tier held: INT stays 6 against "feeble" — the call read this creature as mindless, and the card's 6 is already that dim
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
```

```
Knife Ball

Medium Construct, Unaligned

AC 14
Initiative -1 (9)

HP 97 (13d8 + 39)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+6
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

Skills Athletics +6, Perception +3

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Understands the languages of its creator but can't speak

CR 5 (XP 1,800; PB +3)

Traits

Immutable Form. The knife ball can't shape-shift.

Magic Resistance. The knife ball has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The knife ball makes two Blade Shell attacks.

Blade Shell. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Slashing damage.

Blade Burst (Recharge 5-6). Dexterity Saving Throw: DC 14, each creature in a 10-foot Emanation originating from the knife ball. Failure: 26 (4d12) Piercing damage. Success: Half damage.

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

## 04. Skittering Spellthief — CR 3
**Input:** `goblin wizard`
**Donor:** skirmisher-3 -> CR 3
**Signature:** library · **elapsed** 24s

**`[path]`, donor and the mind tiers**
```
**Donor:** skirmisher-3 -> CR 3
[path] class_npc — Goblin Warrior (is) — class mage — "wizard" (call)
```

```
Skittering Spellthief

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

Actions

Multiattack. The spellthief makes two attacks, using Quarterstaff or Shortbow in any combination.

Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage if the attack roll had Advantage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.

Spellcasting. The spellthief casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Nimble Escape. The spellthief takes the Disengage or Hide action.

Reactions

Protective Magic (3/Day). The spellthief casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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

## 05. Wyrm-Touched Warrenling — CR 2
**Input:** `kobold sorcerer`
**Donor:** skirmisher-1 -> CR 2
**Signature:** library · **elapsed** 31s

**`[path]`, donor and the mind tiers**
```
**Donor:** skirmisher-1 -> CR 2
[path] refused: species "kobold" has no kit
[path] refused: species "kobold" has no kit, but print carries it as Kobold Warrior — the body stands so the people is not erased
[path] class_npc — Kobold Warrior (is) — class mage — "sorcerer" (call)
```

```
Wyrm-Touched Warrenling

Small Humanoid, Neutral

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

Scavenged-Treasure Warding. While the warrenling is within reach of its stash of talismans or of a cowering ally, when an attack against the warrenling hits, the attack instead finds a charm and the warrenling rerolls the attack against itself.

Pack Tactics. The warrenling has Advantage on an attack roll against a creature if at least one of the warrenling's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Sunlight Sensitivity. While in sunlight, the warrenling has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The warrenling makes two Quarterstaff attacks.

Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Bludgeoning damage.

Spellcasting. The warrenling casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Reactions

Protective Magic (3/Day). The warrenling casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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

## 06. Index — CR 3
**Input:** `mummy librarian`
**Donor:** skirmisher-3 -> CR 3
**Signature:** library · **elapsed** 31s

**`[path]`, donor and the mind tiers**
```
**Donor:** skirmisher-3 -> CR 3
[path] twist — Mummy (is) — "mummy" (call)
```

```
Index

Small Undead, Lawful Evil

AC 11
Initiative -1 (9)

HP 58 (9d8 + 18)

Speed 20 ft.

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
12
+1
+1

Skills Perception +3, Stealth +1

Vulnerabilities Fire

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned

Senses tremorsense 30 ft.; Passive Perception 13

Languages Common plus two other languages

CR 3 (XP 700; PB +2)

Traits

Blinding Wrappings. Constitution Saving Throw: DC 11, any creature that starts its turn in a 5-foot Emanation originating from the index. Failure: The target has the Blinded condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Actions

Multiattack. The index makes two Rotting Fist attacks and uses Dreadful Glare.

Rotting Fist. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Bludgeoning damage plus 10 (3d6) Necrotic damage. If the target is a creature, it is cursed. While cursed, the target can't regain Hit Points, its Hit Point maximum doesn't return to normal when finishing a Long Rest, and its Hit Point maximum decreases by 10 (3d6) every 24 hours that elapse. A creature dies and turns to dust if reduced to 0 Hit Points by this attack.

Sight-Rotting Glare. Constitution Saving Throw: DC 11, each creature in a 30-foot Emanation originating from the index. Failure: The target has the Blinded condition until the end of its next turn.

Dreadful Glare. Wisdom Saving Throw: DC 11, one creature the index can see within 60 feet. Failure: The target has the Frightened condition until the end of the index's next turn. Success: The target is immune to this mummy's Dreadful Glare for 24 hours.

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

## 07. Coin-Eyed Beguiler — CR 2
**Input:** `a silver-tongued toad the size of a pony`
**Donor:** skirmisher-3-skulker -> CR 2
**Signature:** library · **elapsed** 29s

**`[path]`, donor and the mind tiers**
```
**Donor:** skirmisher-3-skulker -> CR 2
[path] homebrew — Giant Toad (resembles) — "a silver-tongued toad the size of a pony" (call)
[reskin] mind tier: INT 8 -> 15 — the call read this creature as capable at CR 2
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 2
[reskin] mind tier: CHA 8 -> 18 — the call read this creature as formidable at CR 2
[reskin] sapient is no Beast: Beast -> Monstrosity — the call reads this creature as sapient, and print's Beasts are Unaligned and speechless (owner's ruling, 2026-11-15)
[reskin] alignment by mind: Unaligned -> Neutral — a Beast with INT 15 can hold an ethic (print: 0 of 329 Unaligned blocks speak)
```

```
Coin-Eyed Beguiler

Medium Monstrosity, Neutral

AC 15
Initiative +3 (13)

HP 44 (8d8 + 8)

Speed 40 ft., Swim 40 ft.

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

Reed-Hook Tongue. When the beguiler hits a Medium or smaller creature with its Tongue attack, the target is pulled up to 10 feet straight toward the beguiler into the slick reeds.

Marsh Skulk. The beguiler ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The beguiler makes two Tongue attacks.

Tongue. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage.

Bonus Actions

Nimble Escape. The beguiler takes the Disengage or Hide action.

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

## 08. Drowned Ford Pike — CR 3
**Input:** `a giant river pike`
**Donor:** brute-5-grappler -> CR 3
**Signature:** library · **elapsed** 26s

**`[path]`, donor and the mind tiers**
```
**Donor:** brute-5-grappler -> CR 3
[path] homebrew — "a giant river pike" (call)
[reskin] mind tier held: INT stays 4 against "feeble" — the card's 4 is already feeble
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 3
[reskin] mind tier: CHA 4 -> 10 — the call read this creature as ordinary at CR 3
[reskin] sapient is no Beast: Beast -> Monstrosity — the call reads this creature as sapient, and print's Beasts are Unaligned and speechless (owner's ruling, 2026-11-15)
```

```
Drowned Ford Pike

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

Sunken Timber. While the ford pike remains motionless, a creature that can see the ford pike can discern it is a living creature only with a successful Wisdom (Perception) check against DC 12; until it does, the pike has Advantage on its first attack roll against that creature.

Actions

Multiattack. The ford pike makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.

Jaws of the Ford (Recharge 5-6). Dexterity Saving Throw: DC 12, one Large or smaller creature the ford pike can see within 60 feet. Failure: The target is caught in jaws and has the Restrained condition until the jaws is destroyed (AC 10; HP 10; Vulnerability to Slashing damage; Immunity to Poison and Psychic damage).

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

