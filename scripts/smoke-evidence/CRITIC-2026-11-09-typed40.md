# For the critic — the GM-register forty (`typed40-2026-11-09T00-58-04`)

**This is a different forty and needs a different read.** `sweep.json` is forty crafted
sentences — 31 of 40 polished prose, one two-word concept. Every number the release has been
measured on comes from it. The owner typed "knife ball" and hit a bug four sweeps never saw, so
this set was written the way GMs actually type, with the owner's model of them: **almost always a
name and a CR, often a combat role, sometimes a short NPC note from their prep, sometimes a pasted
bio.** 22 of 40 are named; 38 state a CR; 7 picked a role; 12 are one or two words; 7 are bios of
60–100 words; 3 are non-SRD print names (Beholder, Mind Flayer, displacer beast); 6 are
rules-speak ("owlbear but CR 8"); 4 are casual ("a drgon", "the thing that's been killing my
players' horses"). Not real logs — we have none — but each entry is one a GM would plausibly type.

**The question for each block is not "is it print" or "concept per clause".** It is: *did this GM
get what they asked for, and would they use it tonight?* A bio dump has no clauses to tick; it has
an NPC the GM already knows. Please score Keeper / Runs / Tweak / Fix as usual, but say in a word
what the GM asked for and whether they got it. Where my rubric below is wrong for this register,
say so — that is half the point of the run.

## Gate (our instrument, for reference)

7 FAILs of 40 (sweep reads 1–4). Check-run coverage **75%** — higher than sweep's 56% on the same
instrument, because GM asks are concrete and land. 0 generation failures. Non-SRD names handled
as designed: Product Identity is aliased to a functional description before any pass reads it,
built as homebrew, and a gate keeps the word off the sheet — the GM gets a legal beholder under
another name (#18 "Marrowgaze Cynosure", #19 "Cranium Prowler").

## What I think the two Fix-class findings are — your call

**A. The engine overruled the call on an explicit ask (#31).** "a troll but weak to cold instead
of fire." The route call read `bane: cold`. A regex frame (`unless|except|only`) then refused it:
*"the words carry no weakness clause, so 'cold' answers a question nobody asked."* The troll
shipped with print's Acid-or-Fire regeneration. **In fairness to the frame:** it refused four banes
this forty and was RIGHT three times — Bramblejack (#06), Mother Ash (#08) and the Clockwork
Spider (#22) asked for no weakness and the call volunteered one. So the fix is not to drop the
frame; it is to let the call's own quote open the door — the call names the GM's words that make
it a weakness ("weak to cold instead of fire"), the engine checks that quote is really in the
GM's words, and the regex stays as the fallback when the call offers no quote. One explicit
mechanical request on the forty, silently dropped; three invented ones correctly refused.

**B. A named SRD monster lost to the path call (#30, #07, #03; and #08 as the 1f shape).** The
matcher — print's own names, a closed fact — found the creature each time; the path call talked it
out of it, and the call wins by design:

| # | typed | matcher | call decided | shipped |
|---|---|---|---|---|
| 30 | owlbear but CR 8 | exact Owlbear | homebrew | "Larder Stalker", Monstrosity — no owlbear |
| 07 | Krug \| ogre | exact Ogre | homebrew | CR 2 Giant, skirmisher-hurler |
| 03 | Captain Vell \| pirate captain… | twist Pirate Captain | class fighter → Gladiator | a Gladiator |
| 08 | Mother Ash \| hag midwife | — | class cleric (keyed on "Mother") → Priest | a Fey Priest, no hag |

4 of 40. Sweep reads 0 of 160 because nobody there types a bare SRD noun with a twist. Proposed
rule: when the matcher finds an exact/twist print body in the GM's words and the call says
otherwise, the call must quote the words that overrule it or the print body stands.

## Things I judged NOT Fix — please check me

- **#03, #23 `print-rows` FAIL** — three authored rows each on a Gladiator class-NPC built from a
  bio ("Hates the Sea", "Crippling Wound", "Flintlock Shot"). Those rows are the GM's own
  paragraph. The gate's FAIL threshold (>2 off-print rows) was calibrated for twist/exact, where
  extra rows are drift. I read these as the gate, not the sheet. Do the rows play?
- **#25 Pip the kobold → homebrew Humanoid.** `corpusEntry` matches a print name INSIDE the typed
  phrase, never the reverse, so "kobold" never finds *Kobold Warrior*. Real; one direction.
- **#40 Death Roll `gate-fit`** — an at-will grapple-and-drag with no Multiattack. Print's
  Crocodile does exactly this. Our checker rule lacks the engine's KO exclusion. Checker, not sheet.
- **#18 Beholder reads CR 8 at a typed 13** (39 damage a round vs print's 72–126 band). The
  stated-CR case from your §5 — a GM typed 13 and got 8. Is that a Fix when the label was theirs?
- **#32 heavy crossbow → light crossbow's 80/320.** The GM said heavy.
- **#22 Clockwork Spider, three rows impose Restrained.** One instance.

## Four questions

1. **Are A and B Fixes?** Both are "the GM asked, the engine overrode." If you'd score them Runs
   because the sheet that shipped is playable, say so — that changes what blocks release.
2. **Does the GM-register rubric hold?** For the 7 bio dumps (#23–#28, #33), does the sheet read
   as THAT NPC — Orrin's forge-pact hammer, Ysolde's wights and cold, Pip's homemade wings and
   small poison breath? Where it doesn't, which fact of the bio was dropped?
3. **The non-SRD trio (#18, #19, #20).** A GM typed Beholder and got "Marrowgaze Cynosure" with a
   central eye and eyestalk rays. Legally necessary. Is it a Keeper as a beholder, or does the
   name change alone cost it the table?
4. **Rules-speak (#29–#34).** "CR 8 brute, two attacks, grapples" / "AC 18 HP 200 hits hard,
   slow" / "an ankheg but legendary, boss fight for level 5" — does the engine speak GM? #33's
   Thornback is the one to look at hardest.

Numbers above are measured on the run's traces and JSON unless marked. Trace lines are inlined
under the six blocks where the call and the matcher disagreed, so the attribution is on the page.

---

# The forty — blocks, with path traces where the call overrode the matcher


## 01. Grask Ironjaw — CR 5

**Input:** `name: Grask Ironjaw | orc war chief`

```
Grask Ironjaw

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

Senses darkvision 120 ft.; Passive Perception 11

Languages Common, Orc

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. Grask makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Grask can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Bonus Actions

Relentless Rush. Grask takes the Dash action.

Reactions

Riposte. Trigger: A creature within 5 feet of Grask misses it with a melee attack roll. Response: Grask makes one Longsword attack against that creature.

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


## 02. Sister Maudra — CR 7

**Input:** `name: Sister Maudra | cleric of the drowned god | role: controller`


```
Sister Maudra
Medium humanoid, neutral
Armor Class

14 (breastplate)

Hit Points: 

126 (23d8 + 23)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

10 (+0)

	

12 (+1)

	

18 (+4)

	

16 (+3)

	

13 (+1)

Skills: 

Arcana +7, Perception +6

Saving Throws: 

INT +7, WIS +6

Senses: 

passive Perception 16

Languages: 

Common plus one other language

Challenge

7 (2,900 XP)

Proficiency Bonus:

+3

Divine Aid (3/Day) (Bonus Action).Maudra casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Maudra makes three Radiant Flame attacks. It can replace one attack with a use of Brine Undertow.
Radiant Flame: Ranged Weapon Attack: +6 to hit, range 120 ft., one target. Hit: 17 (4d6 + 3) radiant damage.
Spellcasting: Maudra casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
Brine Undertow: Each creature in a 30-foot-long, 5-foot-wide line must make a DC 15 Dexterity saving throw, taking 21 (6d6) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
```


## 03. Captain Vell — CR 6

**Input:** `name: Captain Vell | pirate captain, lost a hand to a shark, hates the sea`

> **Trace:** decides: class_npc on the Gladiator · class fighter (the matcher would have said twist Pirate Captain)

```
Captain Vell

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

Hates the Sea. Vell refuses to willingly enter water deeper than its waist; if knocked into deep water it must spend its movement each turn making for the nearest shore or deck, and while immersed it takes a -2 penalty to attack rolls.

Crippling Wound. Vell has Disadvantage on attack rolls that use the limb it has lost.

Actions

Multiattack. Vell makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Flintlock Shot. Dexterity Saving Throw: DC 15, one creature within 30 feet. Failure: 24 (7d6) Bludgeoning damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Vell can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Riposte. Trigger: A creature within 5 feet of Vell misses it with a melee attack roll. Response: Vell makes one Longsword attack against that creature.

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


## 04. Thessaly Nightbloom — CR 4

**Input:** `name: Thessaly Nightbloom | elf ranger, twin shortswords`

> **Trace:** decides: class_npc on the Bandit Captain · class rogue (the matcher would have said print-plain Scout)

```
Thessaly Nightbloom
Medium humanoid, neutral
Armor Class

14 (leather)

Hit Points: 

78 (12d8 + 24)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


15 (+2)

	

16 (+3)

	

14 (+2)

	

14 (+2)

	

11 (+0)

	

14 (+2)

Skills: 

Perception +2, Stealth +5

Saving Throws: 

DEX +5

Senses: 

passive Perception 12

Languages: 

Common, Thieves' cant, Elvish

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Hunter's Ground.When Thessaly takes the Hide action, she remains hidden while moving toward a creature that is unaware of her, provided that creature's passive Perception doesn't beat her Stealth check, closing from cover to cover without being seen.
Evasion.If Thessaly is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Thessaly instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it is incapacitated.
Cunning Action (Bonus Action).Thessaly takes the Dash, Disengage, or Hide action.

Actions
Multiattack: Thessaly makes two attacks, using Twin Shortsword or Shortbow.
Twin Shortsword: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 13 (3d6 + 3) piercing damage, and Thessaly has advantage on its next attack roll against the target before the end of its next turn.
Shortbow: Ranged Weapon Attack: +5 to hit, range 80/320 ft., one target. Hit: 12 (2d8 + 3) piercing damage. Until the end of Thessaly's next turn, Thessaly has advantage on attack rolls against the target, and the target can't take the Hide action.
```


## 05. Lord Vexmoor — CR 12

**Input:** `name: Lord Vexmoor | necromancer BBEG, raises the party's fallen allies`

```
Lord Vexmoor

Medium Humanoid, Neutral

AC 17
Initiative +2 (12)

HP 170 (31d8 + 31)

Speed 30 ft.

MOD
SAVE
STR
10
+0
+0
INT
20
+5
+9
MOD
SAVE
DEX
14
+2
+2
WIS
15
+2
+6
MOD
SAVE
CON
12
+1
+1
CHA
16
+3
+3

Skills Arcana +13, History +9, Perception +6

Immunities Psychic; Charmed ((with Mind Blank))

Senses Passive Perception 16

Languages Common plus five other languages, Abyssal

CR 12 (XP 8,400; PB +4)

Traits

Wake of the Grave. When Lord Vexmoor moves, each corpse or set of bones he passes within 5 feet of rises to follow him as a shambling husk, obeying his silent command.

Magic Resistance. Vexmoor has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. Vexmoor makes four Arcane Burst attacks.

Spellcasting. Vexmoor casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17):

- At Will: Detect Magic, Detect Thoughts, Disguise Self, Invisibility, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fly, Lightning Bolt
- 1/Day Each: Cone of Cold, Mind Blank, Scrying, Teleport

Arcane Burst. Melee or Ranged Attack Roll: +9, reach 5 ft. or range 150 ft. 27 (4d10 + 5) Force damage.

Bonus Actions

Misty Step (3/Day). The mage casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Trigger: Vexmoor is hit by an attack roll. Response: Vexmoor casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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


## 06. Bramblejack — CR 3

**Input:** `name: Bramblejack |  | role: lurker`


```
Bramblejack

Medium Plant, Neutral Evil

AC 14
Initiative +3 (13)

HP 45 (7d8 + 14)

Speed 30 ft.

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
16
+3
+5
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
12
+1
+1

Skills Perception +3, Stealth +7

Senses tremorsense 30 ft.; Passive Perception 13

Languages None

CR 3 (XP 700; PB +2)

Actions

Multiattack. The bramblejack makes two Thorned Vine attacks.

Thorned Vine. Melee Attack Roll: +5 (with Advantage during the first round of each combat), reach 5 ft. 7 (1d8 + 3) Piercing damage plus 5 (1d10) Poison damage.

Barbed Snare (Recharge 5-6). Dexterity Saving Throw: DC 12, one Large or smaller creature the bramblejack can see within 60 feet. Failure: The target is caught in brambles and has the Restrained condition until the brambles is destroyed (AC 10; HP 10; Vulnerability to Slashing damage; Immunity to Poison and Psychic damage).

Bonus Actions

Shadow Concealment. While in Dim Light or Darkness, the bramblejack takes the Hide action.

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


## 07. Krug — CR 2

**Input:** `name: Krug | ogre`

> **Trace:** decides: homebrew (the matcher would have said exact Ogre)

```
Krug
Large giant, neutral
Armor Class

13 (natural armor)

Hit Points: 

42 (5d10 + 15)

Speed: 

50 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

12 (+1)

	

16 (+3)

	

10 (+0)

	

14 (+2)

	

10 (+0)

Skills: 

Perception +4, Stealth +3

Saving Throws: 

DEX +3, WIS +4

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

Common

Challenge

2 (450 XP)

Proficiency Bonus:

+2

Slippery Footing.Krug ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility (Bonus Action).Krug takes the Dash or Disengage action.

Actions
Multiattack: Krug makes two attacks: one with Club and one with Boulder. It can replace one attack with a use of Splintering Follow-Through.
Club: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 6 (2d4 + 1) bludgeoning damage.
Boulder: Ranged Weapon Attack: +3 to hit, range 20/60 ft., one target. Hit: 5 (1d8 + 1) bludgeoning damage.
Boulder Toss (Recharge 5-6): Krug hurls a boulder at a point it can see within 90 feet. Each creature in a 5-foot-radius sphere centered on that point must make a DC 13 Dexterity saving throw, taking 13 (3d8) bludgeoning damage on a failed save, or half as much damage on a successful one. If the target is Large or smaller, it is knocked prone.
Splintering Follow-Through: Each creature within 15 feet of Krug must make a DC 13 Constitution saving throw, taking 7 (2d6) thunder damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
```


## 08. Mother Ash — CR 9

**Input:** `name: Mother Ash | hag midwife`

> **Trace:** decides: class_npc on the Priest · class cleric (the matcher would have said homebrew)

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

Resistances Fire

Senses darkvision 60 ft.; Passive Perception 18

Languages Common plus one other language

CR 9 (XP 5,000; PB +4)

Traits

Death Burst. Mother Ash explodes when it dies. Dexterity Saving Throw: DC 15, each creature in a 10-foot Emanation originating from Mother Ash. Failure: 21 (6d6) Fire damage. Success: Half damage.

Actions

Multiattack. Mother Ash makes three attacks, using Radiant Flame or Mace in any combination. It can replace one attack with a use of Midwife's Hush.

Radiant Flame. Ranged Attack Roll: +8, range 120 ft. 22 (4d8 + 4) Radiant damage.

Spellcasting. Mother Ash casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 16):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Midwife's Hush. Constitution Saving Throw: DC 15, one creature within 60 feet. Failure: The target has the Stunned condition until the end of its next turn.

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


## 09. Dervish Kal — CR 5

**Input:** `name: Dervish Kal | fast, two scimitars, hit and run | role: skirmisher`

```
Dervish Kal
Medium humanoid, neutral
Armor Class

15 (chain shirt)

Hit Points: 

97 (15d8 + 30)

Speed: 

40 ft.

STR	DEX	CON	INT	WIS	CHA


12 (+1)

	

16 (+3)

	

14 (+2)

	

8 (-1)

	

12 (+1)

	

8 (-1)

Skills: 

Perception +4, Stealth +6

Saving Throws: 

DEX +6

Senses: 

passive Perception 14

Languages: 

Common

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Twin Blade Follow-Through.When Kal misses with a scimitar attack, Kal's next scimitar attack against that same target made on the same turn has advantage.
Whirling Step.Kal ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility (Bonus Action).Kal takes the Dash or Disengage action.
Whirling Crosscut (Bonus Action).Kal takes the Disengage action, and the next attack roll made against it before the start of its next turn has disadvantage.

Actions
Multiattack: Kal makes two attacks: one with Scimitar and one with Hurled Scimitar.
Scimitar: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 17 (4d6 + 3) slashing damage.
Hurled Scimitar: Ranged Weapon Attack: +6 to hit, range 20/60 ft., one target. Hit: 13 (3d6 + 3) slashing damage.
```


## 10. Pale Warden — CR 8

**Input:** `name: The Pale Warden | guardian of the crypt door | role: defender`

```
Pale Warden

Medium Undead, Neutral

AC 18
Initiative -1 (9)

HP 161 (19d8 + 76)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+5
INT
7
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
18
+4
+7
CHA
3
-4
-4

Skills Perception +3

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 8 (XP 3,900; PB +3)

Traits

Ward Bond. The pale warden is magically bound to a ward of its choosing, and it can have only one ward at a time. While the pale warden is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the pale warden.

Regeneration. The pale warden regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point. If the pale warden takes Radiant damage, this trait doesn't function at the start of the pale warden's next turn.

Actions

Multiattack. The pale warden makes two Grave Claw attacks.

Grave Claw. Melee Attack Roll: +8, reach 10 ft. 12 (2d6 + 5) Slashing damage plus 7 (2d6) Necrotic damage.

Grave Hardening (2/Day). The pale warden targets itself or one creature it can see within 60 feet. The target gains 21 (6d6) Temporary Hit Points, and its AC increases by 2 until the end of the pale warden's next turn.

Threshold Chill (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Emanation originating from the pale warden. Failure: 21 (6d6) Bludgeoning damage. Success: Half damage only.

Reactions

Interpose. Trigger: A creature within 5 feet of the pale warden that it guards is hit by an attack roll. Response: The attack hits the pale warden instead, and the pale warden has Resistance to the attack's damage.

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


## 11. Zarnak — CR 7

**Input:** `name: Zarnak | basically a xenomorph`

```
Zarnak

Medium Monstrosity, Neutral

AC 14
Initiative -1 (9)

HP 135 (18d8 + 54)

Speed 30 ft., Swim 30 ft., Climb 30 ft.

MOD
SAVE
STR
18
+4
+7
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

Skills Athletics +7, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 7 (XP 2,900; PB +3)

Traits

Skull Ram Charge. If Zarnak moves at least 20 feet in a straight line toward a creature and its Tail Stab hits that creature on the same turn, the target is knocked Prone in addition to any other effects of the Tail Stab.

Actions

Multiattack. Zarnak makes two Tail Stab attacks.

Tail Stab. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Piercing damage plus 10 (3d6) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15). While Grappled, the target has the Restrained condition.

Bonus Actions

Swallow. Zarnak swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside Zarnak, and takes 7 (2d6) Acid damage at the start of each of Zarnak's turns. Zarnak can have only one creature swallowed at a time. If Zarnak takes 15 damage or more in a single turn from the swallowed creature, Zarnak must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of Zarnak. If Zarnak dies, a swallowed creature exits the body Prone by using 5 feet of movement.

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


## 12. Big Bob — CR 9

**Input:** `name: big bob | giant who throws boulders | role: artillery`

```
Big Bob
Huge giant, chaotic neutral
Armor Class

15 (natural armor)

Hit Points: 

161 (17d12 + 51)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

14 (+2)

	

16 (+3)

	

17 (+3)

	

12 (+1)

	

11 (+0)

Skills: 

Arcana +7, Perception +5

Saving Throws: 

INT +7, WIS +5

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Common

Challenge

9 (5,000 XP)

Proficiency Bonus:

+4

Protective Magic (3/Day) (Reaction).When the big bob is hit by an attack roll, the big bob casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: The big bob makes three Boulder attacks. It can replace one attack with a use of Spellcasting to cast Ice Knife.
Boulder: Melee or Ranged Spell Attack: +7, reach 10 ft. or range 120 ft. 16 (3d8 + 3) force damage.
Spellcasting: The big bob casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 15, +7 to hit with spell attacks): - At will: Ice Knife, Mage Hand, Minor Illusion
1/day each: Shatter (level 3 version)
Crushing Boulder (Recharge 5-6): The big bob hurls a slab of stone torn from the ground at a point it can see within 90 feet. Each creature in a 5-foot-radius sphere centered on that point must make a DC 15 Dexterity saving throw, taking 18 (4d8) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, if the target is Large or smaller, it is knocked prone.
```


## 13. Sethix Veilscale — CR 6

**Input:** `lizard folk shadow monk`

```
Sethix Veilscale

Medium Humanoid, Neutral

AC 16
Initiative +4 (14)

HP 103 (23d8)

Speed 30 ft., Climb 30 ft., Swim 30 ft.

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
18
+4
+7
WIS
14
+2
+2
MOD
SAVE
CON
10
+0
+0
CHA
16
+3
+3

Skills Perception +5, Stealth +7

Senses Passive Perception 15

Languages Common plus one other language, Draconic

CR 6 (XP 2,300; PB +3)

Traits

Veilscale Slip. While in dim light or darkness, Sethix leaves no mundane trace, cannot be tracked by nonmagical means, sight-based Perception and attack rolls against it are made with Disadvantage, and as a bonus action it can teleport to an unoccupied space it can see within 60 feet that is in dim light or darkness.

Hold Breath. Sethix can hold its breath for 15 minutes.

Marsh Stride. Difficult Terrain composed of mud doesn't cost Sethix extra movement, and Sethix can move across mud without needing to make an ability check.

Actions

Multiattack. Sethix makes two attacks, using Unarmed Strike or Dart in any combination.

Unarmed Strike. Melee Attack Roll: +7, reach 5 ft. 31 (6d8 + 4) Bludgeoning damage. Once on each of Sethix's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 14. Failure: The target has the Stunned condition until the end of Sethix's next turn.

Dart. Ranged Attack Roll: +7, range 20/60 ft. 17 (3d8 + 4) Piercing damage.

Bonus Actions

Patient Defense. Sethix takes the Dodge action.

Shadow Step (Recharge 4-6). Sethix teleports up to 60 feet to an unoccupied space it can see.

Cunning Action. Sethix takes the Dash, Disengage, or Hide action.

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


## 14. Ember Vow — CR 5

**Input:** `fire monk`

```
Ember Vow
Medium humanoid, neutral
Armor Class

15

Hit Points: 

94 (21d8)

Speed: 

30 ft., climb 30 ft.

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

Damage Resistances: 

fire

Senses: 

passive Perception 15

Languages: 

Common plus one other language, Primordial

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Broken Ember.When the ember vow has half of its hit points or fewer, the ember vow sheds bright light in a 10-foot radius, and any creature that starts its turn within the aura takes 9 (2d8) fire damage, and the vow's Unarmed Strike deals an additional 9 (2d8) fire damage.
Patient Defense (Bonus Action).The ember vow takes the Dodge action.
Cunning Action (Bonus Action).The ember vow takes the Dash, Disengage, or Hide action.

Actions
Multiattack: The ember vow makes two attacks: one with its Unarmed Strike and one with its Dart.
Unarmed Strike: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. Once on each of the ember vow's turns when it hits with this attack, the target is subjected to the following effect. The target must make a DC 14 Constitution saving throw. On a failed save, the target is stunned until the end of the ember vow's next turn.
Dart: Ranged Weapon Attack: +6 to hit, range 20/60 ft., one target. Hit: 12 (2d8 + 3) piercing damage.
```


## 15. Snag Sootstave — CR 3

**Input:** `goblin wizard`


```
Snag Sootstave

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

Multiattack. Snag makes two Arcane Burst attacks.

Arcane Burst. Melee or Ranged Attack Roll: +5, reach 5 ft. or range 120 ft. 13 (3d6 + 3) Force damage.

Spellcasting. Snag casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 13):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Goblin Curse Shriek (1/Day). Constitution Saving Throw: DC 12, each creature in a 30-foot Emanation originating from Snag that can hear it. Failure: 6 (1d12) Psychic damage, and if the target has 6 Hit Points or fewer after taking this damage, it drops to 0 Hit Points. Success: Half damage only.

Bonus Actions

Misty Step (3/Day). Snag casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Trigger: Snag is hit by an attack roll. Response: Snag casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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


## 16. Drowned Keel-Captain — CR 10

**Input:** `vampire pirate`

```
Drowned Keel-Captain
Medium undead, neutral evil
Armor Class

15 (natural armor)

Hit Points: 

180 (24d8 + 72)

Speed: 

40 ft., swim 40 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

8 (-1)

	

17 (+3)

	

4 (-3)

	

12 (+1)

	

6 (-2)

Skills: 

Athletics +7, Perception +5

Saving Throws: 

STR +7, CON +7

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 120 ft., passive Perception 15

Languages: 

None

Challenge

10 (5,900 XP)

Proficiency Bonus:

+4

Whelm (Bonus Action).The keel-captain whelms one Medium or smaller creature it is grappling. While whelmed, the target is blinded and restrained, has Total Cover against attacks and other effects outside the keel-captain, and takes 10 (3d6) necrotic damage at the start of each of the keel-captain's turns. The keel-captain can have only one creature whelmed at a time. If the keel-captain takes 25 damage or more on a single turn from the whelmed creature, the keel-captain must release the target at the end of that turn, and the target exits prone in an unoccupied space within 10 feet of the keel-captain. If the keel-captain dies, a whelmed creature pulls free prone by using 10 feet of movement.

Actions
Multiattack: The keel-captain makes two Cutlass attacks. It can replace one attack with a use of Draining Bite.
Cutlass: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (4d6 + 3) slashing damage plus 13 (3d8) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 15). While grappled, the target is restrained.
Draining Bite: One creature within 30 feet must make a DC 15 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one. On a failed save, the keel-captain regains hit points equal to half the damage dealt.
```


## 17. Rotmaw Owlbear — CR 4

**Input:** `owlbear zombie`

```
Rotmaw Owlbear

Large Undead, Unaligned

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

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 4 (XP 1,100; PB +2)

Traits

Corpse-Musk. While a creature is Grappled or Restrained by the rotmaw owlbear, that creature is also Poisoned for as long as it remains Grappled or Restrained by the owlbear.

Undead Fortitude. If damage reduces the rotmaw owlbear to 0 Hit Points, it makes a Constitution saving throw (DC 5 plus the damage taken) unless the damage is Radiant or from a Critical Hit. On a successful save, the rotmaw owlbear drops to 1 Hit Point instead.

Actions

Multiattack. The rotmaw owlbear makes two Rend attacks. It can replace one attack with a use of Rotting Grip.

Rend. Melee Attack Roll: +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.

Rotting Grip. Strength Saving Throw: DC 15, one creature within 30 feet. Failure: The target is pulled up to 20 feet straight toward the rotmaw owlbear by the beak's dead, grinding grip and has the Grappled condition (escape DC 15).

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


## 18. Marrowgaze Cynosure — CR 13

**Input:** `name: Beholder | `

```
Marrowgaze Cynosure

Large Aberration, Neutral Evil

AC 16
Initiative +5 (15)

HP 161 (17d10 + 68)

Speed 0 ft., Fly 20 ft. (hover)

MOD
SAVE
STR
10
+0
+0
INT
18
+4
+4
MOD
SAVE
DEX
20
+5
+10
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
18
+4
+9

Skills Perception +7, Stealth +10, Acrobatics +10

Immunities Prone

Senses darkvision 120 ft.; Passive Perception 17

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Restless Crown. At the start of each of the cynosure's turns, one eyestalk fires a ray from its Eye Rays at a creature it can see within 120 feet; that ray cannot be chosen again until the cynosure's next turn, and if every ray has been spent this turn no stalk fires.

Legendary Resistance (3/Day). If the cynosure fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The cynosure makes one Bite attack and uses Eye Rays.

Bite. Melee Attack Roll: +5, reach 5 ft. 14 (2d8 + 5) Piercing damage plus 11 (2d10) Force damage.

Eye Rays. The cynosure fires three rays at random creatures it can see within 120 feet, rolling a d6 for each ray (a creature can be the target of only one ray a turn): 1 — Numbing Ray: Strength Saving Throw: DC 17. Failure: The target's Speed is halved and it can't take Reactions until the end of the cynosure's next turn. 2 — Binding Ray: Dexterity Saving Throw: DC 17. Failure: The target has the Restrained condition ,. 3 — Blinding Ray: Constitution Saving Throw: DC 17. Failure: The target has the Blinded condition ,. 4 — Dread Ray: Wisdom Saving Throw: DC 17. Failure: The target has the Paralyzed condition ,. 5 — Shoving Ray: Strength Saving Throw: DC 17. Failure: 14 (4d6) Force damage, and the target is pushed up to 15 feet away from the cynosure and has the Prone condition. 6 — Withering Ray: Constitution Saving Throw: DC 17. Failure: 14 (4d6) Necrotic damage.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the cynosure takes the Hide action.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the cynosure can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Backward Drift. The cynosure moves up to half its Speed without provoking Opportunity Attacks.

Legendary Ray. The cynosure fires one ray from its Eye Rays at a random creature it can see within 120 feet.

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


## 19. Cranium Prowler — CR 7

**Input:** `name: Mind Flayer | `

```
Cranium Prowler
Medium aberration, neutral evil
Armor Class

14 (natural armor)

Hit Points: 

130 (20d8 + 40)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


12 (+1)

	

16 (+3)

	

15 (+2)

	

12 (+1)

	

13 (+1)

	

10 (+0)

Skills: 

Perception +4, Stealth +9

Saving Throws: 

DEX +6

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

Common

Challenge

7 (2,900 XP)

Proficiency Bonus:

+3

Umbral Step (Bonus Action).While in Dim Light or Darkness, the prowler takes the Hide action.

Actions
Multiattack: The prowler makes two Tentacle attacks.
Tentacle: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) psychic damage. If the target is a Large or smaller creature, it is grappled (escape DC 12).
Pulse Glare: Each creature of the prowler's choice in a 30-foot radius originating from the prowler that can see or hear it must make a DC 14 Wisdom saving throw. On a failed save, the target is frightened until the end of its next turn. On a successful save, the target is immune to this creature's terror for 24 hours.
Skull Feast: One creature within 5 feet of the prowler must make a DC 14 Constitution saving throw, taking 24 (7d6) psychic damage on a failed save. On a failed save, the target is also stunned until the end of its next turn.
```


## 20. Fold Stalker — CR 3

**Input:** `displacer beast`

```
Fold Stalker

Medium Monstrosity, Neutral

AC 13
Initiative +3 (13)

HP 45 (7d8 + 14)

Speed 30 ft., Climb 30 ft.

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
16
+3
+5
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
12
+1
+1

Skills Perception +3, Stealth +7

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 3 (XP 700; PB +2)

Traits

Flickering Outline. While the stalker is not Incapacitated, attack rolls against the stalker that rely on sight are made with Disadvantage.

Actions

Multiattack. The stalker makes two Tentacles attacks. It can replace one attack with a use of Drifting Echo.

Tentacles. Melee Attack Roll +5 (with Advantage during the first round of each combat), reach 5 ft. 7 (1d8 + 3) Bludgeoning damage plus 5 (1d10) Psychic damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 11).

Drifting Echo. Wisdom Saving Throw: DC 12, one creature within 60 feet that can see or hear the displaced echo of the stalker's image. Failure: The target has the Charmed condition until the start of its next turn, and while Charmed this way, it must move toward the stalker by the safest available route on its turn.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the stalker takes the Hide action.

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


## 21. Hollow Vigil — CR 4

**Input:** `haunted suit of armor`

```
Hollow Vigil
Medium undead, lawful neutral
Armor Class

17 (natural armor)

Hit Points: 

78 (12d8 + 24)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

11 (+0)

	

14 (+2)

	

11 (+0)

	

12 (+1)

	

14 (+2)

Skills: 

Athletics +5, Perception +3

Saving Throws: 

CON +4, WIS +3

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Common plus the languages it knew in life

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

False Appearance.While the hollow vigil remains motionless, it is indistinguishable from an ordinary suit of armor.

Actions
Multiattack: The hollow vigil makes two Rusted Gauntlet attacks. It can replace one attack with a use of Corroded Grasp.
Rusted Gauntlet: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) bludgeoning damage plus 6 (1d12) necrotic damage.
Corroded Grasp: One creature within 5 feet of the hollow vigil must succeed on a DC 13 Strength saving throw or be grappled (escape DC 13).
```


## 22. Clockwork Spider — CR 2

**Input:** `clockwork spider`


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

Skills Athletics +5, Perception +2

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 12

Languages Understands the languages of its creator but can't speak

CR 2 (XP 450; PB +2)

Traits

Looming Strands. When the spider moves, the spaces the spider crosses during its move become clinging webbing; a creature that moves into that webbing has its Speed halved until the end of its turn, and the spider ignores the effect of its own webbing.

Actions

Multiattack. The spider makes two Forelimb attacks. It can replace one attack with a use of Tension Silk.

Forelimb. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.

Tension Silk. Dexterity Saving Throw: DC 13, one creature within 60 feet. Failure: The target has the Restrained condition until the end of its next turn.

Bonus Actions

Cocoon. The spider cocoons one Medium or smaller creature it is grappling. While cocooned, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the spider, and takes 3 (1d6) Bludgeoning damage at the start of each of the spider's turns. The spider can have only one creature cocooned at a time. If the spider takes 6 damage or more in a single turn from the cocooned creature, the spider must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the spider. If the spider dies, a cocooned creature tears free Prone by using 5 feet of movement.

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


## 23. Orrin Blackwell — CR 6

**Input:** `name: Orrin Blackwell | Orrin was the village's blacksmith until the war took his sons. He made a pact with something under the forge and now his hammer glows when he's angry. He protects the village but the villagers are afraid of him. He fights with the hammer and can heat metal armor with a touch. Loyal to the party if they help the village.`

```
Orrin Blackwell

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

Warden of the Hearth-Fires. If a creature within 10 feet of Orrin targets a villager, a building, or another creature with an attack, Orrin can force the attack to target it instead, and gains a bonus to the AC of any villager, building, or creature it is guarding within 10 feet.

Forge-Pact Ember. While Orrin is Bloodied, each of Orrin's Hammer attacks deals an extra 11 (2d10) Fire damage that ignores the target's armor.

Actions

Multiattack. Orrin makes three Hammer attacks. It can replace one attack with a use of Shield Bash.

Hammer. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and if the target is Large or smaller, it is pushed up to 10 feet straight away from Orrin.

Forgehand Seizure. Strength Saving Throw: DC 15, one creature within 5 feet. Failure: 24 (7d6) Fire damage, and the target has the Restrained condition until the end of its next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Orrin can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Riposte. Trigger: A creature within 5 feet of Orrin misses it with a melee attack roll. Response: Orrin makes one Hammer attack against that creature.

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


## 24. Queen Ysolde the Unburied — CR 11

**Input:** `name: Queen Ysolde the Unburied | Ancient queen of the barrow kings, dead 400 years, woke when the players took the crown. She commands the wights in the barrow. Cold aura, regenerates unless hit with fire, speaks only the old tongue. AC 17, about 150 hp. She wants the crown back and will bargain.`

```
Queen Ysolde the Unburied
Medium undead, neutral evil
Armor Class

17 (natural armor)

Hit Points: 

170 (20d8 + 80)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

12 (+1)

	

18 (+4)

	

6 (-2)

	

8 (-1)

	

6 (-2)

Skills: 

Athletics +8, Perception +3

Saving Throws: 

STR +8, CON +8

Damage Resistances: 

cold

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Speaks only the old tongue

Challenge

11 (7,200 XP)

Proficiency Bonus:

+4

Grave-Rime Aura.At the end of each of Ysolde's turns, each creature in a 5-foot radius originating from Ysolde takes 10 (3d6) cold damage. It can enter a creature's space and stop there.
Regeneration.Ysolde regains 15 hit points at the start of each of its turns. If Ysolde takes fire damage, this trait doesn't function on Ysolde's next turn. Ysolde dies only if it starts its turn with 0 hit points and doesn't regenerate.

Actions
Multiattack: Ysolde makes three Rime Touch attacks. It can replace one attack with a use of Sundering Shove.
Rime Touch: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) cold damage.
Sundering Shove: Each creature in a 30-foot cone must make a DC 16 Strength saving throw. On a failed save, the target is pushed up to 15 feet away from Ysolde and is knocked prone.
```


## 25. Pip — CR 1

**Input:** `name: Pip | A kobold who was raised by a green dragon and thinks he IS a dragon. Wears homemade wings. Breathes a little poison gas (he practices). Extremely confident. The party's first recurring villain. He should be funny but actually a little dangerous in a group.`

```
Pip

Small Humanoid, Chaotic Neutral

AC 15
Initiative +2 (12)

HP 27 (6d6 + 6)

Speed 30 ft., Fly 60 ft.

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

Senses Passive Perception 13

Languages Common, Draconic

CR 1 (XP 200; PB +2)

Traits

Wing Dart. Pip doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.

Actions

Multiattack. Pip makes two attacks, using Claws or Tail Sling in any combination. It can replace one attack with a use of Sputtering Hiss.

Claws. Melee Attack Roll: +4, reach 5 ft. 5 (1d6 + 2) Slashing damage. If Pip flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) Slashing damage and, if it is Medium or smaller, has the Prone condition.

Tail Sling. Ranged Attack Roll: +4, range 30/120 ft. 4 (1d4 + 2) Bludgeoning damage.

Wing Swoop (Recharge 5-6). Pip flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Dexterity Saving Throw: DC 11. Failure: 6 (1d12) Bludgeoning damage, and the target has the Prone condition.

Sputtering Hiss. Constitution Saving Throw: DC 11, each creature in a 15-foot Cone. Failure: 4 (1d8) Poison damage, and the target has the Poisoned condition until the end of its next turn.

Bonus Actions

Aerial Agility. Pip takes the Dash or Disengage action.

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


## 26. Hollow Cardinal — CR 14

**Input:** `name: The Hollow Cardinal | Leader of the Church of the Empty Throne. A human priest whose faith was hollowed out and filled by an Aberration from beyond the stars. Looks normal until his face splits open. Casts divine spells but they come out wrong - healing that hurts, light that blinds. Has a retinue of brainwashed acolytes. Wants to open the throne room door at the bottom of the cathedral. | role: controller`

```
Hollow Cardinal

Medium Aberration, Neutral

AC 17
Initiative +0 (10)

HP 192 (35d8 + 35)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
20
+5
+10
MOD
SAVE
DEX
10
+0
+0
WIS
22
+6
+11
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

Skills Arcana +10, Perception +11

Senses darkvision 60 ft.; Passive Perception 21

Languages Common plus one other language

CR 14 (XP 11,500; PB +5)

Traits

Fear Aura. The hollow cardinal emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 18, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Actions

Multiattack. The hollow cardinal makes four attacks, using Radiant Flame or Mace in any combination. It can replace one attack with a use of Blinding Benediction.

Radiant Flame. Ranged Attack Roll: +11, range 150 ft. 24 (4d8 + 6) Radiant damage.

Spellcasting. The hollow cardinal casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 19):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Blinding Benediction. Constitution Saving Throw: DC 18, one creature within 60 feet. Failure: The target has the Blinded condition until the end of its next turn.

Mace. Melee Attack Roll: +11, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.

Bonus Actions

Divine Aid (3/Day). The hollow cardinal casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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


## 27. Grizzelda — CR 5

**Input:** `name: Grizzelda | swamp witch npc, sells potions, secretly a hag. if the pcs attack her she reveals her true form. claws, curses, can turn invisible. has a cauldron that she can summon things from 1/day`

```
Grizzelda
Medium humanoid, neutral
Armor Class

15

Hit Points: 

81 (18d8)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


9 (-1)

	

14 (+2)

	

11 (+0)

	

17 (+3)

	

12 (+1)

	

11 (+0)

Skills: 

Arcana +6, History +6, Perception +4

Saving Throws: 

INT +6, WIS +4

Senses: 

passive Perception 14

Languages: 

Common and any three languages, Sylvan

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

The Old Potion-Seller.While Grizzelda has not yet been hit or taken damage in the encounter, or had her cauldron's contents seen, Grizzelda reads as an ordinary swamp herbalist to any observer, and only violence or the sight of her cauldron's contents forces the reveal.
Misty Step (3/Day) (Bonus Action).Grizzelda casts Misty Step, using the same spellcasting ability as Spellcasting.
Protective Magic (3/Day) (Reaction).Grizzelda casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Grizzelda makes three Claws attacks. It can replace one attack with a use of Binding Hex.
Claws: Melee Spell Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage plus 4 (1d8) poison damage.
Spellcasting: Grizzelda casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14): - At will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
2/day each: Fireball, Invisibility
1/day each: Cone of Cold, Fly
Binding Hex: One creature within 60 feet of Grizzelda must make a DC 14 Dexterity saving throw, taking 13 (3d8) bludgeoning damage on a failed save.
```


## 28. Shadowfang — CR 3

**Input:** `name: Shadowfang | the druid's wolf companion, bigger than a normal wolf, has a scar over one eye and shadows seem to follow it. Should be tougher than a dire wolf.`

```
Shadowfang

Large Beast, Unaligned

AC 15
Initiative +3 (13)

HP 58 (9d10 + 9)

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
16
+3
+5
WIS
12
+1
+1
MOD
SAVE
CON
13
+1
+1
CHA
8
-1
-1

Skills Perception +3, Stealth +5

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 3 (XP 700; PB +2)

Traits

Fading Step. Shadowfang ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Shadowfang makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Bonus Actions

Fleet Agility. Shadowfang takes the Dash or Disengage action.

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


## 29. Bog Grudge — CR 8

**Input:** `CR 8 brute, two attacks, grapples`

```
Bog Grudge

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

Fen Lurker. While submerged in a bog, marsh, or pool, the grudge is Invisible to creatures more than 30 feet away and can hold its breath indefinitely, and it can surface as part of its movement without spending an action.

Actions

Multiattack. The grudge makes two Weed-Wrapped Arm attacks. It can replace one attack with a use of Sweeping Undertow.

Weed-Wrapped Arm. Melee Attack Roll: +8, reach 10 ft. 27 (5d8 + 5) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16). While Grappled, the target has the Restrained condition.

Sweeping Undertow. Strength Saving Throw: DC 16, each creature in a 30-foot Cone. Failure: The target has the Prone condition.

Bonus Actions

Whelm. The grudge whelms one Medium or smaller creature it is grappling. While whelmed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the grudge, and takes 10 (3d6) Necrotic damage at the start of each of the grudge's turns. The grudge can have only one creature whelmed at a time. If the grudge takes 25 damage or more on a single turn from the whelmed creature, the grudge must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the grudge. If the grudge dies, a whelmed creature pulls free Prone by using 10 feet of movement.

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


## 30. Larder Stalker — CR 8

**Input:** `owlbear but CR 8`

> **Trace:** decides: homebrew (the matcher would have said exact Owlbear)

```
Larder Stalker
Large monstrosity, neutral evil
Armor Class

14 (natural armor)

Hit Points: 

136 (16d10 + 48)

Speed: 

40 ft., climb 40 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

8 (-1)

	

16 (+3)

	

6 (-2)

	

10 (+0)

	

6 (-2)

Skills: 

Athletics +7, Perception +3

Saving Throws: 

STR +7, CON +6

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

None

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Blood Frenzy.The stalker has advantage on attack rolls against any creature that doesn't have all its hit points.

Actions
Multiattack: The stalker makes two Talons attacks. It can replace one attack with a use of Crushing Pounce.
Talons: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 26 (5d8 + 4) slashing damage.
Crushing Pounce: One creature within 10 feet of the stalker must succeed on a DC 15 Strength saving throw or be grappled (escape DC 15).
```


## 31. Rime-Bound Troll — CR 5

**Input:** `a troll but weak to cold instead of fire`

> **Trace:** decides: twist on the Troll (the matcher agrees)
> **Trace:** bane refused: the words carry no weakness clause, so "cold" answers a question nobody asked

```
Rime-Bound Troll

Large Giant, Chaotic Evil

AC 15
Initiative +1 (11)

HP 94 (9d10 + 45)

Speed 30 ft.

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
9
-1
-1
MOD
SAVE
CON
20
+5
+5
CHA
7
-2
-2

Skills Perception +5

Vulnerabilities Cold, Fire

Senses darkvision 60 ft.; Passive Perception 15

Languages Giant

CR 5 (XP 1,800; PB +3)

Traits

Regeneration. The rime-bound troll regains 15 Hit Points at the start of each of its turns. If the rime-bound troll takes Acid or Fire damage, this trait doesn't function on the rime-bound troll's next turn. The rime-bound troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs (4/Day). If the rime-bound troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the rime-bound troll's limbs is severed, falls into the rime-bound troll's space, and becomes a Troll Limb. The limb acts immediately after the rime-bound troll's turn. The rime-bound troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The rime-bound troll makes three Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 11 (2d6 + 4) Slashing damage.

Bonus Actions

Charge. The rime-bound troll moves up to half its Speed straight toward an enemy it can see.

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


## 32. Goblin Bolt-Boss — CR 1

**Input:** `goblin boss with a heavy crossbow`

```
Goblin Bolt-Boss
Small humanoid, chaotic neutral
Armor Class

13 (leather)

Hit Points: 

24 (7d6)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


8 (-1)

	

15 (+2)

	

10 (+0)

	

10 (+0)

	

8 (-1)

	

8 (-1)

Skills: 

Perception +1, Stealth +4

Saving Throws: 

DEX +4

Senses: 

darkvision 60 ft., passive Perception 11

Languages: 

Common, Goblin

Challenge

1 (200 XP)

Proficiency Bonus:

+2

Nimble Escape (Bonus Action).The bolt-boss takes the Disengage or Hide action.

Actions
Multiattack: The bolt-boss makes two attacks, using Crossbow, Scimitar, or Hurled Bolt.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had advantage.
Crossbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 6 (1d8 + 2) piercing damage, and the bolt-boss has advantage on its next attack roll against the target before the end of its next turn.
Hurled Bolt: The bolt-boss hurls a heavy crossbow bolt. Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 6 (1d8 + 2) bludgeoning damage. The weapon lands in an unoccupied space within 5 feet of the target; until the bolt-boss spends 5 feet of movement in that space to recover it, the bolt-boss's Speed is halved and it can't use this action.
```


## 33. Thornback — CR 8

**Input:** `name: Thornback | an ankheg but legendary, boss fight for level 5`

```
Thornback

Large Monstrosity, Unaligned

AC 15
Initiative +0 (10)

HP 150 (20d10 + 40)

Speed 30 ft., Burrow 10 ft.

MOD
SAVE
STR
20
+5
+8
INT
1
-5
-5
MOD
SAVE
DEX
11
+0
+0
WIS
13
+1
+1
MOD
SAVE
CON
14
+2
+5
CHA
6
-2
-2

Skills Athletics +8, Perception +4

Senses tremorsense 60 ft.; Passive Perception 14

Languages None

CR 8 (XP 3,900; PB +3)

Traits

Boss of the Bramble Warrens. While Thornback is Bloodied, thornback's Bite and Eruptive Ambush each deal an extra 14 (4d6) Poison damage, and its Snagging Spines check is made with DC 16 becoming a harder DC.

Snagging Spines. While Thornback is grappling a creature, or a creature is grappling Thornback, the creature is Restrained as well as held, and at the start of each of its turns it must make a DC 16 Strength check or take 14 (4d6) Piercing damage as the barbs tear deeper.

Tunneler. Thornback can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. Thornback makes two Bite attacks.

Bite. Melee Attack Roll: +8 (with Advantage if the target is Grappled by the ankheg), reach 5 ft. 14 (2d8 + 5) Piercing damage plus 3 (1d6) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).

Acid Spray (Recharge 6). Dexterity Saving Throw: DC 16, each creature in a 30-foot-long, 5-foot-wide Line. Failure: 39 (6d12) Acid damage. Success: Half damage.

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


## 34. Rustwrought Warden — CR 10

**Input:** `AC 18 HP 200 hits hard, slow | role: brute`

```
Rustwrought Warden

Large Construct, Unaligned

AC 18
Initiative -1 (9)

HP 200 (24d10 + 72)

Speed 40 ft.

MOD
SAVE
STR
20
+5
+9
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

Skills Athletics +9, Perception +5

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Understands the languages of its creator but can't speak

CR 10 (XP 5,900; PB +4)

Traits

Crushing Hold. While the warden is grappling a creature, the Grappled creature's Speed is reduced by 10 feet, and it can't take the Dash action.

Actions

Multiattack. The warden makes two Wrecking Arm attacks.

Wrecking Arm. Melee Attack Roll: +9, reach 10 ft. 32 (6d8 + 5) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17). While Grappled, the target has the Restrained condition.

Trample (Recharge 5-6). The warden moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Dexterity Saving Throw: DC 17. Failure: 35 (10d6) Bludgeoning damage, and the target has the Prone condition. Success: Half damage, and the target is pushed 5 feet straight away.

Bonus Actions

Smother. The warden smothers one Medium or smaller creature it is grappling. While smothered, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the warden, and takes 10 (3d6) Bludgeoning damage at the start of each of the warden's turns. The warden can have only one creature smothered at a time. If the warden takes 25 damage or more on a single turn from the smothered creature, the warden must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the warden. If the warden dies, a smothered creature pulls free Prone by using 10 feet of movement.

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


## 35. Cindermaw Wyrm — CR 10

**Input:** `a drgon`

```
Cindermaw Wyrm

Large Dragon, Neutral

AC 18
Initiative +1 (11)

HP 152 (16d10 + 64)

Speed 40 ft., Fly 80 ft.

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
12
+1
+5
WIS
12
+1
+5
MOD
SAVE
CON
18
+4
+4
CHA
16
+3
+3

Skills Perception +5, Stealth +5

Immunities Fire

Senses blindsight 30 ft., darkvision 120 ft.; Passive Perception 15

Languages Common, Draconic

CR 10 (XP 5,900; PB +4)

Traits

Scalding Ash Wake. At the end of each of the cindermaw wyrm's turns, each creature in a 5-foot Emanation originating from the cindermaw wyrm takes 10 (3d6) Fire damage. It can enter a creature's space and stop there.

Actions

Multiattack. The cindermaw wyrm makes three Cinder Claw attacks. It can replace one attack with a use of Sootfall Shroud.

Cinder Claw. Melee Attack Roll: +9, reach 10 ft. 9 (1d8 + 5) Slashing damage plus 7 (2d6) Fire damage.

Ash Breath (Recharge 5-6). Dexterity Saving Throw: DC 16, each creature in a 30-foot Cone. Failure: 60 (11d10) Fire damage. Success: Half damage.

Sootfall Shroud. Constitution Saving Throw: DC 16, each creature in a 15-foot Emanation originating from the cindermaw wyrm. Failure: The target has the Blinded condition until the end of its next turn.

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


## 36. Bloodroot Elder — CR 6

**Input:** `big scary tree thing`

```
Bloodroot Elder
Huge plant, unaligned
Armor Class

13 (natural armor)

Hit Points: 

114 (12d12 + 36)

Speed: 

40 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

8 (-1)

	

16 (+3)

	

6 (-2)

	

10 (+0)

	

6 (-2)

Skills: 

Athletics +7, Perception +3

Saving Throws: 

STR +7, CON +6

Senses: 

tremorsense 60 ft., passive Perception 13

Languages: 

None

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Root-Rent Passage.Difficult Terrain composed of mud doesn't cost the elder extra movement, and the elder can move across mud without needing to make an ability check.

Actions
Multiattack: The elder makes two Branch attacks.
Branch: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage.
Rootsunder (Recharge 5-6): Each creature within 20 feet of the elder must succeed on a DC 14 Strength saving throw or be knocked prone.
```


## 37. Sourmire Rotmaw — CR 4

**Input:** `what would a CR 4 swamp monster look like`

```
Sourmire Rotmaw

Large Monstrosity, Unaligned

AC 13
Initiative -1 (9)

HP 82 (11d10 + 22)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
18
+4
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
8
-1
-1
MOD
SAVE
CON
15
+2
+2
CHA
6
-2
-2

Skills Athletics +6, Perception +1

Senses darkvision 60 ft.; Passive Perception 11

Languages None

CR 4 (XP 1,100; PB +2)

Traits

Festering Venom. When the rotmaw hits a creature with an attack, the target has the Poisoned condition, and its Hit Points cannot be restored by any means until the condition is removed or the rotmaw is slain.

Actions

Arms. Melee Attack Roll: +6, reach 5 ft. 17 (3d8 + 4) Piercing damage plus 11 (2d10) Poison damage.

Stinging Bile (Recharge 5-6). Constitution Saving Throw: DC 14, each creature in a 15-foot Cone. Failure: The target has the Blinded condition until the end of its next turn.

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


## 38. Marrowleg Widow — CR 3

**Input:** `the thing that's been killing my players' horses`

```
Marrowleg Widow
Medium monstrosity, neutral evil
Armor Class

12

Hit Points: 

58 (9d8 + 18)

Speed: 

30 ft., climb 30 ft.

STR	DEX	CON	INT	WIS	CHA


12 (+1)

	

14 (+2)

	

14 (+2)

	

11 (+0)

	

12 (+1)

	

12 (+1)

Skills: 

Perception +3, Stealth +6

Saving Throws: 

DEX +4

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

None

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Bone Lattice.While motionless in dim light or darkness, or while climbing a sheer surface or hanging upside down, the widow climbs sheer surfaces and hangs upside down without a check, and while motionless in dim light or darkness it is indistinguishable from a skeletal brace or support beam.
Umbral Step (Bonus Action).While in Dim Light or Darkness, the widow takes the Hide action.

Actions
Multiattack: The widow makes two Bite attacks.
Bite: Melee Weapon Attack: +4 to hit (with advantage during the first round of each combat), reach 5 ft., one target. Hit: 11 (2d8 + 2) piercing damage.
Marrow Dart (1/Day): One creature the widow can see within 60 feet must make a DC 12 Dexterity saving throw. On a failed save, if the target has 11 hit points or fewer, it is unconscious for 1 hour, until it takes damage, or until a creature within 5 feet of it takes an action to wake it. Otherwise, it takes 11 (2d10) bludgeoning damage.
```


## 39. Skarn the Tollkeeper — CR auto

**Input:** `name: Skarn the Tollkeeper | `

```
Skarn the Tollkeeper

Medium Construct, Neutral

AC 14
Initiative -1 (9)

HP 82 (11d8 + 33)

Speed 30 ft.

MOD
SAVE
STR
18
+4
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
+5
CHA
4
-3
-3

Skills Athletics +6, Perception +2

Immunities Poison, Thunder; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 12

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Thunder Absorption. Whenever Skarn is subjected to Thunder damage, it takes no damage and instead regains a number of Hit Points equal to the Thunder damage dealt.

Immutable Form. Skarn can't shape-shift.

Magic Resistance. Skarn has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. Skarn makes two Maul attacks. It can replace one attack with a use of Marked Debt.

Maul. Melee Attack Roll: +6, reach 5 ft. 7 (1d6 + 4) Bludgeoning damage plus 6 (1d12) Thunder damage.

Marked Debt. Strength Saving Throw: DC 13, each creature in a 15-foot Cone. Failure: The target has the Prone condition.

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


## 40. Sewer Alligator — CR auto

**Input:** `sewer alligator`

```
Sewer Alligator
Large beast, unaligned
Armor Class

11 (natural armor)

Hit Points: 

75 (10d10 + 20)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

8 (-1)

	

15 (+2)

	

6 (-2)

	

8 (-1)

	

6 (-2)

Skills: 

Athletics +5, Perception +1

Saving Throws: 

STR +5

Senses: 

darkvision 60 ft., passive Perception 11

Languages: 

None

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Sewer Muck Camouflage.While the alligator remains motionless in sewage or murky water, its filth-caked hide blends into the sludge, so the ambush comes without warning: it has advantage on Dexterity (Stealth) checks made to hide, and creatures have disadvantage on Wisdom (Perception) checks to spot it.

Actions
Bite: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) piercing damage plus 11 (2d10) acid damage.
Death Roll: One creature within 30 feet must make a DC 13 Strength saving throw. On a failed save, the target is pulled up to 20 feet straight toward the alligator by its jaws and is grappled (escape DC 13).
```
