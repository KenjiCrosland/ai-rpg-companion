# For the critic — the fifth GM forty (`typed40-2026-11-09T21-04-40`)

The same forty inputs you scored on `06-25-17` at **Keeper 7 · Runs 19 · Tweak 8 · Fix 6**, re-run on
commit `1cc043e`. Your 06-25-17 read is the baseline; the per-sheet table below shows what moved.

**What changed in the engine between the two runs:**
1. **Print's rules rows now win a name collision** on exact/twist (Bonus Actions and Reactions too, not
   only novas) — unless the sheet's row answers a GM clause. The guard fired 3× this run, all on
   "Protective Magic (3/Day)", where the "GM clause" on the row was the whole concept ("necromancer").
2. **The returning-weapon clause is gone** unless the call says the projectile is a single object the
   creature must recover. 8 sheets carry thrown attacks; 0 returning clauses shipped. Print writes it
   4 times in 1291 rows, all magic weapons.
3. An at-will area row swapped into a Multiattack takes Recharge 5-6 (print: 0 of 24 such rows
   out-damage the attack they replace). Didn't draw this run.
4. "use its X bonus action" resolves to row X (your Umbral Step).
5. The lack-removal pass keeps the row it authored for the lack (the Red Dragon — in `sweep`, not here).

**Our instrument's read:** 5 FAILs of 40 (was 5), no FAIL rule repeats; coverage 70% (was 77 — the
lowest of five GM fortys). `gate-fit` 0 for the fourth run; citation FAILs 0.

**Calibration work in progress, for context:** the checker's defensive read uses the 2014 DMG HP
column literally (print itself sits at 71% of it); the donor's to-hit modifier runs 1–2 under print's
from CR 5; menu casters carry 2 at-will + 2 daily at every CR where print grows 2/5/8. The next build
carries those three. The owner is holding his own read for that build.

**Per-sheet delta below:** path and name vs 06-25-17 and the checker's FAILs on each, so you can go
straight to the sheets that moved. Blocks follow.

| # | sheet now | path | was (06-25-17) | path was | checker now |
|---|---|---|---|---|---|
| 01 | Grask Ironjaw | class_npc | Grask Ironjaw | class_npc | ok |
| 02 | Sister Maudra | class_npc | Sister Maudra | class_npc | ok |
| 03 | Captain Vell | class_npc | Captain Vell | class_npc | ok |
| 04 | Thessaly Nightbloom | class_npc | Thessaly Nightbloom | class_npc | ok |
| 05 | Lord Vexmoor | class_npc | Lord Vexmoor | class_npc | ok |
| 06 | Bramblejack | homebrew | Bramblejack | homebrew | ok |
| 07 | Ogre | homebrew **path changed** | Krug | twist | ok |
| 08 | Mother Ash | class_npc | Mother Ash | class_npc | ok |
| 09 | Dervish Kal | homebrew **path changed** | Dervish Kal | class_npc | ok |
| 10 | Pale Warden | homebrew | Pale Warden | homebrew | ok |
| 11 | Zarnak | homebrew | Zarnak | homebrew | ok |
| 12 | Big Bob | homebrew | Big Bob | homebrew | ok |
| 13 | Vaskis Sshar | class_npc | Sekkath the Dim | class_npc | ok |
| 14 | Cinder Ashen | class_npc | Ashen Penitent | class_npc | ok |
| 15 | Nib Wickwhistle | homebrew **path changed** | Nib Sneerwing | class_npc | ok |
| 16 | Tidewretch Corsair | twist **path changed** | Saltwake Corsair | homebrew | ok |
| 17 | Owlbear Zombie | twist **path changed** | Owlbear Zombie | homebrew | ok |
| 18 | Gazing Crown | homebrew | Oracle-Eye Crown | homebrew | ok |
| 19 | Tidecrawler Morkhal | homebrew | Screaming Morsel | homebrew | ok |
| 20 | Desplazado | homebrew | Thin-Seam Prowler | homebrew | ok |
| 21 | Oathbroken Sentinel | homebrew | Vigil Oathsworn | homebrew | ok |
| 22 | Brass Loomspinner | homebrew | Whirring Clockwork Spider | homebrew | ok |
| 23 | Orrin Blackwell | class_npc | Orrin Blackwell | class_npc | ok |
| 24 | Queen Ysolde the Unburied | homebrew | Queen Ysolde the Unburied | homebrew | ok |
| 25 | Pip | twist **path changed** | Pip | homebrew | ok |
| 26 | Hollow Cardinal | class_npc | Hollow Cardinal | class_npc | ok |
| 27 | Grizzelda | class_npc | Grizzelda | class_npc | ok |
| 28 | Shadowfang | homebrew | Shadowfang | homebrew | ok |
| 29 | Quarrybound Grist | homebrew | Sanguine Chainwrack | homebrew | ok |
| 30 | Shricking Owlbear | twist | Moon-Grove Owlbear | twist | ok |
| 31 | Rimevent Maw | twist | Rimeblood Troll | twist | ok |
| 32 | Skritch the Crossbow Boss | twist **path changed** | Skritch the Bolt-Bully | class_npc | ok |
| 33 | Thornback | twist | Thornback | twist | ok |
| 34 | Petrified Seam | homebrew | Toad-Idol Warden | homebrew | ok |
| 35 | Emberscale Tyrant | homebrew | Cindermire Wyrm | homebrew | ok |
| 36 | Gallows-Root | ? **path changed** | Rotbark Colossus | homebrew | ok |
| 37 | Bog-Strangler | homebrew | Mire Maw | homebrew | ok |
| 38 | Bone-Yard Culler | homebrew | Night Mare Stalker | homebrew | ok |
| 39 | Skarn the Tollkeeper | homebrew | Skarn the Tollkeeper | homebrew | ok |
| 40 | Sewer Alligator | homebrew | Cistern King | homebrew | ok |

---

# The forty — blocks


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
Multiattack: Maudra makes three attacks, using Radiant Flame or Mace. It can replace one attack with a use of Driving Bellow.
Radiant Flame: Ranged Weapon Attack: +6 to hit, range 120 ft., one target. Hit: 17 (4d6 + 3) radiant damage.
Spellcasting: Maudra casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
Driving Bellow: Each creature of Maudra's choice in a 30-foot radius originating from Maudra must make a DC 15 Dexterity saving throw, taking 5 (1d10) piercing damage on a failed save. On a failed save, the target immediately moves up to half its Speed in a direction of Maudra's choice, using the safest available route.
Mace: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
```


## 03. Captain Vell — CR 6

**Input:** `name: Captain Vell | pirate captain, lost a hand to a shark, hates the sea`

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

Closing Grip. When the captain hits a creature with his Longsword, the target has the Grappled condition, escaping with a successful DC 15 check, and while the captain has a creature Grappled this way he can't use the Longsword to attack another target.

Crippling Wound. Vell has Disadvantage on attack rolls that use the limb it has lost.

Actions

Multiattack. Vell makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Vell can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Bonus Actions

Captain's Command (2/Day). Each ally within 30 feet of Vell gains 11 (2d10) Temporary Hit Points.

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

Ledger of the Deserving.When Thessaly hits a creature with a Twin Shortsword attack, Thessaly has advantage on its next attack roll against that creature before the end of the same turn.
Evasion.If Thessaly is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Thessaly instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it is incapacitated.
Cunning Action (Bonus Action).Thessaly takes the Dash, Disengage, or Hide action.

Actions
Multiattack: Thessaly makes two attacks, using Twin Shortsword or Shortbow.
Twin Shortsword: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 13 (3d6 + 3) piercing damage, and Thessaly has advantage on its next attack roll against the target before the end of its next turn.
Shortbow: Ranged Weapon Attack: +5 to hit, range 80/320 ft., one target. Hit: 12 (2d8 + 3) piercing damage. Until the end of Thessaly's next turn, Thessaly has advantage on attack rolls against the target, and the target can't take the Hide action.
```


## 05. Lord Vexmoor — CR 12

**Input:** `name: Lord Vexmoor | necromancer BBEG, raises the party's fallen allies`

> **Trace:** print canon row withheld: Reactions/"Protective Magic (3/Day)" — the sheet's row of that name answers the GM ("necromancer"), and the GM's words outrank print's name

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

Languages Common plus five other languages

CR 12 (XP 8,400; PB +4)

Traits

Grave Revenant. When a Humanoid dies within 30 feet of Vexmoor, the corpse rises at the start of Vexmoor's next turn as a spectral servant that fights for him for 1 minute before crumbling; it cannot be raised again by this trait.

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

Medium Plant, Unaligned

AC 14
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

Senses tremorsense 30 ft.; Passive Perception 13

Languages None

CR 3 (XP 700; PB +2)

Traits

Thicket Guise. While Bramblejack remains motionless, it is indistinguishable from brambles, thorns, or hedge.

Actions

Multiattack. Bramblejack makes two Thorns attacks.

Thorns. Melee Attack Roll: +5 (with Advantage during the first round of each combat), reach 5 ft. 7 (1d8 + 3) Piercing damage plus 5 (1d10) Poison damage. If the target is a creature and doesn't already have a barbed thorn wound, it is subjected to the following effect. Constitution Saving Throw: DC 12. Failure: The target receives a barbed thorn wound. While wounded, the target loses 5 (1d10) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, succeeding on a DC 12 Wisdom (Medicine) check.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, Bramblejack takes the Hide action.

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


## 07. Ogre — CR 2

**Input:** `name: Krug | ogre`

> **Trace:** PATH CHANGED: was twist on 06-25-17 — the dice, not the engine, unless a trace above says otherwise

```
Ogre
Large giant, chaotic evil
Armor Class

11 (natural armor)

Hit Points: 

68 (8d10 + 24)

Speed: 

40 ft.

STR	DEX	CON	INT	WIS	CHA


19 (+4)

	

8 (-1)

	

16 (+3)

	

5 (-3)

	

7 (-2)

	

7 (-2)

Skills: 

Perception +0, Stealth +1

Senses: 

darkvision 60 ft., passive Perception 10

Languages: 

Common, Giant

Challenge

2 (450 XP)

Proficiency Bonus:

+2

Actions
Greatclub: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage.
Javelin: Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 11 (2d6 + 4) piercing damage.
```


## 08. Mother Ash — CR 9

**Input:** `name: Mother Ash | hag midwife`

```
Mother Ash

Medium Humanoid, Neutral

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

Senses Passive Perception 18

Languages Common plus one other language, Sylvan

CR 9 (XP 5,000; PB +4)

Traits

Thorns Drink the Cries. When Mother Ash hits a Restrained or Grappled creature with Radiant Flame, and while any creature she has bound remains within reach, the target takes 11 (2d10) Psychic damage at the start of each of its turns while Restrained or Grappled by the mother; while any creature she has bound remains within reach, she has Advantage on attacks against it.

Actions

Multiattack. Mother Ash makes three attacks, using Radiant Flame or Mace in any combination.

Radiant Flame. Ranged Attack Roll: +8, range 120 ft. 22 (4d8 + 4) Radiant damage.

Spellcasting. Mother Ash casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 16):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

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

> **Trace:** PATH CHANGED: was class_npc on 06-25-17 — the dice, not the engine, unless a trace above says otherwise

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

Dust Veil.When Kal ends the move granted by Partner's Exit with no creature within 5 feet of him, Kal is hidden from the last creature he attacked until the start of his next turn.
Partner's Exit.When Kal moves on his turn after making an attack, Kal's first 5 feet of movement that turn can be made while still within the reach of the attack he just made, and he can pivot a half-turn as part of it; he can only do so if he ends that move farther from every creature that attacked him this round than he started it.
Desert Footwork.Kal ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility (Bonus Action).Kal takes the Dash or Disengage action.

Actions
Multiattack: Kal makes two attacks: one with Scimitar and one with Hurled Debris. It can replace one attack with a use of Wide Guard.
Scimitar: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 17 (4d6 + 3) slashing damage.
Hurled Debris: Ranged Weapon Attack: +6 to hit, range 20/60 ft., one target. Hit: 12 (2d8 + 3) slashing damage.
Wide Guard: One creature within 5 feet of Kal must make a DC 14 Dexterity saving throw, taking 19 (3d12) bludgeoning damage on a failed save.
```


## 10. Pale Warden — CR 8

**Input:** `name: The Pale Warden | guardian of the crypt door | role: defender`

```
Pale Warden

Large Undead, Lawful Neutral

AC 18
Initiative -1 (9)

HP 161 (17d10 + 68)

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

Senses blindsight 30 ft.; Passive Perception 13

Languages Common plus the languages it knew in life

CR 8 (XP 3,900; PB +3)

Traits

Bound. The pale warden is bound to the crypt door it guards. It can't willingly move more than 120 feet from the crypt door it guards, and it always knows the direction and distance to the crypt door it guards.

Ward Bond. The pale warden is magically bound to a ward of its choosing, and it can have only one ward at a time. While the pale warden is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the pale warden.

Regeneration. The pale warden regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point. If the pale warden takes Radiant damage, this trait doesn't function at the start of the pale warden's next turn.

Actions

Multiattack. The pale warden makes two Coffin Nail attacks. It can replace one attack with a use of Threshold Shove.

Coffin Nail. Melee Attack Roll: +8, reach 10 ft. 12 (2d6 + 5) Piercing damage plus 7 (2d6) Necrotic damage.

Grave Ward (2/Day). The pale warden targets itself or one creature it can see within 60 feet. The target gains 21 (6d6) Temporary Hit Points, and its AC increases by 2 until the end of the pale warden's next turn.

Threshold Shove. Strength Saving Throw: DC 15, each creature in a 30-foot Cone. Failure: The target is pushed up to 15 feet away from the pale warden and has the Prone condition.

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

Large Monstrosity, Neutral Evil

AC 16
Initiative +4 (14)

HP 120 (16d10 + 32)

Speed 40 ft., Climb 30 ft.

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

Senses darkvision 120 ft.; Passive Perception 14

Languages None

CR 7 (XP 2,900; PB +3)

Traits

Skulker. Zarnak ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Zarnak makes two Bite attacks.

Bite. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Piercing damage plus 10 (3d6) Poison damage.

Bonus Actions

Nimble Escape. Zarnak takes the Disengage or Hide action.

Blood-Scent Lunge (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Zarnak moves up to half its Speed without provoking Opportunity Attacks, and it makes one Bite attack.

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
Huge giant, neutral
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

Protective Magic (3/Day) (Reaction).When Bob is hit by an attack roll, Bob casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Bob makes three Boulder attacks.
Boulder: Melee or Ranged Spell Attack: +7 to hit, reach 10 ft. or range 120 ft., one target. Hit: 16 (3d8 + 3) force damage.
Spellcasting: Bob casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 15): - At will: Light, Mage Hand
1/day each: Shatter (level 3 version), Ice Storm
Shattering Boulder (Recharge 5-6): Bob hurls a boulder at a point it can see within 90 feet. Each creature in a 5-foot-radius sphere centered on that point must make a DC 15 Dexterity saving throw, taking 18 (4d8) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, if the target is Large or smaller, it is knocked prone.
```


## 13. Vaskis Sshar — CR 6

**Input:** `lizard folk shadow monk`

```
Vaskis Sshar

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

Gloamskin. While in dim light or darkness, Vaskis is Invisible to any creature that is relying on darkvision to see it.

Hold Breath. Vaskis can hold its breath for 15 minutes.

Marsh Stride. Difficult Terrain composed of mud doesn't cost Vaskis extra movement, and Vaskis can move across mud without needing to make an ability check.

Actions

Multiattack. Vaskis makes two attacks, using Unarmed Strike or Dart in any combination.

Unarmed Strike. Melee Attack Roll: +7, reach 5 ft. 31 (6d8 + 4) Bludgeoning damage. Once on each of Vaskis's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 14. Failure: The target has the Stunned condition until the end of Vaskis's next turn.

Dart. Ranged Attack Roll: +7, range 20/60 ft. 17 (3d8 + 4) Piercing damage.

Bonus Actions

Patient Defense. Vaskis takes the Dodge action.

Shadow Step (Recharge 4-6). Vaskis teleports up to 60 feet to an unoccupied space it can see.

Cunning Action. Vaskis takes the Dash, Disengage, or Hide action.

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


## 14. Cinder Ashen — CR 5

**Input:** `fire monk`

```
Cinder Ashen
Medium humanoid, neutral
Armor Class

13

Hit Points: 

94 (21d8)

Speed: 

30 ft., climb 30 ft.

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

Common plus one other language, Primordial

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Cunning Action (Bonus Action).Cinder takes the Dash, Disengage, or Hide action.

Actions
Multiattack: Dart makes two attacks: one with Unarmed Strike and one with Dart. It can replace one attack with a use of Ash Burst.
Unarmed Strike: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. Once on each of Dart's turns when it hits with this attack, the target is subjected to the following effect. The target must make a DC 14 Constitution saving throw. On a failed save, the target is stunned until the end of Dart's next turn.
Dart: Ranged Weapon Attack: +5 to hit, range 20/60 ft., one target. Hit: 11 (2d8 + 2) piercing damage.
Ash Burst: Each creature within 15 feet of Dart must succeed on a DC 14 Dexterity saving throw or be knocked prone.
```


## 15. Nib Wickwhistle — CR 3

**Input:** `goblin wizard`

> **Trace:** PATH CHANGED: was class_npc on 06-25-17 — the dice, not the engine, unless a trace above says otherwise

```
Nib Wickwhistle

Small Humanoid, Neutral

AC 14
Initiative +2 (12)

HP 49 (11d6 + 11)

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
13
+1
+1
CHA
11
+0
+0

Skills Arcana +5, Perception +3

Senses Passive Perception 13

Languages Common, Goblin

CR 3 (XP 700; PB +2)

Actions

Multiattack. Nib makes two attacks. It can replace one attack with a use of (A) Skittering Hex or (B) Spellcasting to cast Magic Missile.

Bolt Strike. Ranged Attack Roll: +5, range 80/320 ft. 12 (2d8 + 3) Psychic damage.

Spellcasting. Nib casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 13):

- At Will: Magic Missile, Mage Hand, Minor Illusion, Misty Step

Skittering Hex. Wisdom Saving Throw: DC 12, each creature in a 15-foot Cone. Failure: The target has the Frightened condition until the end of its next turn.

Reactions

Protective Magic (3/Day). Trigger: Nib is hit by an attack roll. Response: Nib casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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


## 16. Tidewretch Corsair — CR 10

**Input:** `vampire pirate`

> **Trace:** PATH CHANGED: was homebrew on 06-25-17 — the dice, not the engine, unless a trace above says otherwise

```
Tidewretch Corsair
Medium undead, lawful evil
Armor Class

17 (natural armor)

Hit Points: 

178 (21d8 + 84)

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

Perception +6, Stealth +8

Saving Throws: 

DEX +8, WIS +6

Damage Resistances: 

necrotic

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 60 ft., passive Perception 16

Languages: 

Common plus two other languages

Challenge

10 (5,900 XP)

Proficiency Bonus:

+4

Saltbound Dead.The corsair doesn't need to breathe and is unaffected by the drowning rules, and it can drink brine in place of blood: once per turn when it hits a creature that doesn't have all its hit points with Grave Strike, it regains 9 (2d8) hit points.
Gravechill.When a creature takes necrotic damage from the corsair, the target's speed is reduced by 10 feet until the end of its next turn as frost locks its limbs.
Legendary Resistance (3/Day, or 4/Day in Lair).If the corsair fails a saving throw, it can choose to succeed instead.
Misty Escape.If the corsair drops to 0 hit points outside its resting place, the corsair uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 hit points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and is paralyzed until it regains any hit points, and it regains 1 Hit Point after spending 1 hour there.
Spider Climb.The corsair can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Vampire Weakness.The corsair has these weaknesses: Forbiddance: the corsair can't enter a residence without an invitation from an occupant.
Running Water: the corsair takes 20 acid damage if it ends its turn in running water.
Stake to the Heart: If a weapon that deals piercing damage is driven into the corsair's heart while the corsair is incapacitated in its resting place, the corsair is paralyzed until the weapon is removed.
Sunlight: the corsair takes 20 radiant damage if it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks.
Shape-Shift (Bonus Action).If the corsair isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the corsair can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the corsair can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.
Charm (Recharge 5-6) (Bonus Action).The corsair casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 16), and the duration is 24 hours. The charmed target is a willing recipient of the corsair's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was charmed by the corsair.

Actions
Multiattack: The corsair makes three Grave Strike attacks. It can replace one attack with a use of Bite (Bat or Vampire Form Only).
Grave Strike: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 16) from one of two hands.
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that has the grappled, incapacitated, or restrained condition must make a DC 16 Constitution saving throw, taking 17 (5d6) piercing damage on a failed save, or half as much damage on a successful one. On a failed save, plus 13 (3d8) necrotic damage. The target's Hit Point maximum decreases by an amount equal to the necrotic damage taken, and the corsair regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a Vampire Spawn under the corsair's control.
Legendary Actions

The corsair can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The corsair regains spent legendary actions at the start of its turn.

Deathless Strike: The corsair moves up to half its Speed, and it makes one Grave Strike attack.
Beguile: The corsair casts Command, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 16). The corsair can't take this action again until the start of its next turn.
```


## 17. Owlbear Zombie — CR 4

**Input:** `owlbear zombie`

> **Trace:** PATH CHANGED: was homebrew on 06-25-17 — the dice, not the engine, unless a trace above says otherwise

```
Owlbear Zombie

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

Necromantic Refuse. At the start of each of its turns, unless a creature has dealt Radiant damage to it since its last turn, the owlbear zombie regains 14 (4d6) Hit Points.

Undead Fortitude. If damage reduces the owlbear zombie to 0 Hit Points, it makes a Constitution saving throw (DC 5 plus the damage taken) unless the damage is Radiant or from a Critical Hit. On a successful save, the owlbear zombie drops to 1 Hit Point instead.

Actions

Multiattack. The owlbear zombie makes two Rend attacks. It can replace one attack with a use of Corpse Drag.

Rend. Melee Attack Roll: +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.

Corpse Drag. Strength Saving Throw: DC 15, one creature within 30 feet. Failure: The target is pulled up to 20 feet straight toward the owlbear zombie by its dead bulk and has the Grappled condition (escape DC 15).

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


## 18. Gazing Crown — CR 13

**Input:** `name: Beholder | `

```
Gazing Crown

Large Aberration, Neutral Evil

AC 17
Initiative +0 (10)

HP 209 (22d10 + 88)

Speed 0 ft., Fly 20 ft. (hover)

MOD
SAVE
STR
10
+0
+5
INT
20
+5
+5
MOD
SAVE
DEX
10
+0
+0
WIS
12
+1
+1
MOD
SAVE
CON
19
+4
+9
CHA
14
+2
+2

Skills Perception +6

Immunities Prone

Senses darkvision 120 ft.; Passive Perception 16

Languages Common

CR 13 (XP 10,000; PB +5)

Actions

Multiattack. The gazing crown makes one Bite attack and uses Eye Rays.

Bite. Melee Attack Roll: +5, reach 10 ft. 18 (3d8 + 5) Piercing damage plus 14 (4d6) Psychic damage.

Eye Rays. The gazing crown fires three rays at random creatures it can see within 120 feet, rolling a d6 for each ray (a creature can be the target of only one ray a turn): 1 — Numbing Ray: Strength Saving Throw: DC 17. Failure: The target's Speed is halved and it can't take Reactions until the end of the gazing crown's next turn. 2 — Binding Ray: Dexterity Saving Throw: DC 17. Failure: The target has the Restrained condition until the end of its next turn. 3 — Blinding Ray: Constitution Saving Throw: DC 17. Failure: The target has the Blinded condition until the end of its next turn. 4 — Dread Ray: Wisdom Saving Throw: DC 17. Failure: The target has the Paralyzed condition until the end of its next turn. 5 — Shoving Ray: Strength Saving Throw: DC 17. Failure: 17 (5d6) Force damage, and the target is pushed up to 15 feet away from the gazing crown and has the Prone condition. 6 — Withering Ray: Constitution Saving Throw: DC 17. Failure: 17 (5d6) Necrotic damage.

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


## 19. Tidecrawler Morkhal — CR 7

**Input:** `name: Mind Flayer | `

```
Tidecrawler Morkhal
Medium aberration, neutral evil
Armor Class

14 (natural armor)

Hit Points: 

130 (20d8 + 40)

Speed: 

30 ft., fly 30 ft. (hover), swim 30 ft., climb 30 ft.

STR	DEX	CON	INT	WIS	CHA


14 (+2)

	

15 (+2)

	

15 (+2)

	

14 (+2)

	

15 (+2)

	

16 (+3)

Skills: 

Perception +5, Deception +6

Saving Throws: 

WIS +5, CHA +6

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Common

Challenge

7 (2,900 XP)

Proficiency Bonus:

+3

Spider Climb.Morkhal can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: Morkhal makes three attacks, using Tentacle or Psychic Lance. It can replace one attack with a use of (A) Mind Shriek or (B) Spellcasting to cast Mind Spike.
Tentacle: Melee Spell Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) psychic damage. If the target is a Large or smaller creature, it is grappled (escape DC 13).
Psychic Lance: Ranged Spell Attack: +6 to hit, range 60 ft., one target. Hit: 16 (3d8 + 3) psychic damage.
Mind Shriek: One creature within 60 feet must succeed on a DC 14 Constitution saving throw or take 14 (4d6) psychic damage and be deafened until the end of its next turn.
Spellcasting: Morkhal casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 14): - At will: Mind Spike, Mage Hand
1/day each: Sleep, Hold Person
Unblinking Gaze: One creature within 60 feet must succeed on a DC 14 Constitution saving throw or be stunned until the end of its next turn.
```


## 20. Desplazado — CR 3

**Input:** `displacer beast`

```
Desplazado

Large Monstrosity, Neutral

AC 14
Initiative +3 (13)

HP 45 (6d10 + 12)

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

Languages Common

CR 3 (XP 700; PB +2)

Actions

Multiattack. The desplazado makes two Tentacles attacks. It can replace one attack with a use of Lurching Swipe.

Tentacles. Melee Attack Roll: +5 (with Advantage during the first round of each combat), reach 5 ft. 7 (1d8 + 3) Bludgeoning damage plus 5 (1d10) Psychic damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 11).

Lurching Swipe. Strength Saving Throw: DC 12, each creature in a 15-foot Cone. Failure: The target has the Prone condition.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the desplazado takes the Hide action.

Shimmer Step (Recharge 4-6). The desplazado teleports up to 40 feet to an unoccupied space it can see.

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


## 21. Oathbroken Sentinel — CR 4

**Input:** `haunted suit of armor`

```
Oathbroken Sentinel
Medium construct, neutral
Armor Class

12 (natural armor)

Hit Points: 

75 (10d8 + 30)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

8 (-1)

	

16 (+3)

	

6 (-2)

	

10 (+0)

	

4 (-3)

Skills: 

Athletics +5, Perception +2

Saving Throws: 

STR +5, CON +5

Damage Immunities: 

necrotic, poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

darkvision 60 ft., passive Perception 12

Languages: 

Common

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Necrotic Absorption.Whenever the sentinel is subjected to necrotic damage, it takes no damage and instead regains a number of hit points equal to the necrotic damage dealt.
Immutable Form.The sentinel can't shape-shift.
Magic Resistance.The sentinel has advantage on saving throws against spells and other magical effects.

Actions
Multiattack: The sentinel makes two Rusted Blade attacks. It can replace one attack with a use of Oathbound Grasp.
Rusted Blade: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage plus 6 (1d12) necrotic damage.
Oathbound Grasp: One creature within 5 feet of the sentinel must succeed on a DC 13 Strength saving throw or be grappled (escape DC 13).
```


## 22. Brass Loomspinner — CR 2

**Input:** `clockwork spider`

```
Brass Loomspinner

Medium Construct, Unaligned

AC 12
Initiative -1 (9)

HP 52 (8d8 + 16)

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

Skills Athletics +5, Perception +1

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 11

Languages Understands the languages of its creator but can't speak

CR 2 (XP 450; PB +2)

Traits

Spider Climb. The loomspinner can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions

Mandibles. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Brass Snare (Recharge 5-6). Dexterity Saving Throw: DC 12, one Large or smaller creature the loomspinner can see within 30 feet. Failure: The target is caught in brass wire and has the Restrained condition until the brass wire is destroyed (AC 10; HP 5; Vulnerability to Fire damage; Immunity to Poison and Psychic damage).

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

Warden of the Village. While Orrin is within 30 feet of a villager that is not disguised as or allied with an intruder, Orrin has Advantage on attack rolls against any creature that has attacked a villager since the end of Orrin's last turn.

Actions

Multiattack. Orrin makes three Hammer attacks. It can replace one attack with a use of Shield Bash.

Hammer. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and if the target is Large or smaller, it is pushed up to 10 feet straight away from Orrin.

Forge-Pact Brand. Constitution Saving Throw: DC 15, one creature within 5 feet. Failure: 24 (7d6) Fire damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Orrin can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

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
Medium undead, neutral
Armor Class

17 (natural armor)

Hit Points: 

165 (22d8 + 66)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

14 (+2)

	

17 (+3)

	

12 (+1)

	

13 (+1)

	

18 (+4)

Skills: 

Athletics +8, Persuasion +8

Saving Throws: 

CON +7, CHA +8

Damage Resistances: 

cold

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 60 ft., passive Perception 11

Languages: 

Speaks only the old tongue

Challenge

11 (7,200 XP)

Proficiency Bonus:

+4

Unburied Mending.At the start of each of Ysolde's turns, Ysolde regains 11 (2d10) hit points; if she has taken fire damage since the end of her last turn, she instead regains no hit points and her speed is halved until the start of her next turn, and she gains no benefit from this trait while she is incapacitated.
Aura of Authority.While in a 10-foot radius originating from Ysolde, Ysolde and its allies have advantage on attack rolls and saving throws, provided Ysolde is not incapacitated.

Actions
Multiattack: Ysolde makes three attacks, using Sword or Grave Strike.
Sword: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage plus 9 (2d8) cold damage.
Grave Strike: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) necrotic damage.
```


## 25. Pip — CR 1

**Input:** `name: Pip | A kobold who was raised by a green dragon and thinks he IS a dragon. Wears homemade wings. Breathes a little poison gas (he practices). Extremely confident. The party's first recurring villain. He should be funny but actually a little dangerous in a group.`

> **Trace:** PATH CHANGED: was homebrew on 06-25-17 — the dice, not the engine, unless a trace above says otherwise

```
Pip

Small Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 27 (11d6 - 11)

Speed 30 ft., Fly 30 ft. (hover)

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

Green Ward of the Wyrm-Mother. Pip is immune to Poison damage and cannot be given the Poisoned condition.

Wing-Fold Dodge. While Pip isn't Incapacitated and has moved at least 10 feet this turn, Pip can take the Dodge action as a Bonus Action.

Pack Tactics. Pip has Advantage on an attack roll against a creature if at least one of Pip's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Sunlight Sensitivity. While in sunlight, Pip has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. Pip makes two Dagger attacks.

Dagger. Melee or Ranged Attack Roll: +4, reach 5 ft. or range 20/60 ft. 6 (1d8 + 2) Piercing damage.

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

Medium Humanoid, Neutral

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

Senses darkvision 120 ft.; Passive Perception 21

Languages Common plus one other language, Deep Speech

CR 14 (XP 11,500; PB +5)

Actions

Multiattack. The hollow cardinal makes four attacks, using Radiant Flame or Mace in any combination. It can replace one attack with a use of Blinding Benediction.

Radiant Flame. Ranged Attack Roll: +11, range 150 ft. 24 (4d8 + 6) Radiant damage.

Spellcasting. The hollow cardinal casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 19):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Blinding Benediction. Constitution Saving Throw: DC 18, each creature in a 30-foot Emanation originating from the hollow cardinal. Failure: The target has the Blinded condition until the end of its next turn.

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

> **Trace:** print canon row withheld: Reactions/"Protective Magic (3/Day)" — the sheet's row of that name answers the GM ("swamp witch npc"), and the GM's words outrank print's name

```
Grizzelda
Medium fey, neutral
Armor Class

15 (natural armor)

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

darkvision 60 ft., passive Perception 14

Languages: 

Common and any three languages, Sylvan

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Hag in Hiding.When a creature observes Grizzelda or tries to discern her true nature, it perceives her as she chooses; that creature must succeed on a DC 14 Wisdom check to see through the illusion and recognize her as a hag.
Misty Step (3/Day) (Bonus Action).Grizzelda casts Misty Step, using the same spellcasting ability as Spellcasting.
Protective Magic (3/Day) (Reaction).Grizzelda casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Grizzelda makes three Claws attacks. It can replace one attack with a use of Mire-Spite Hex.
Claws: Melee Spell Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage plus 4 (1d8) poison damage.
Spellcasting: Grizzelda casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14): - At will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
2/day each: Fireball, Invisibility
1/day each: Cone of Cold, Fly
Mire-Spite Hex: One creature within 60 feet of Grizzelda must succeed on a DC 14 Constitution saving throw or take 13 (3d8) poison damage and be poisoned until the end of its next turn.
```


## 28. Shadowfang — CR 3

**Input:** `name: Shadowfang | the druid's wolf companion, bigger than a normal wolf, has a scar over one eye and shadows seem to follow it. Should be tougher than a dire wolf.`

```
Shadowfang

Large Beast, Unaligned

AC 15
Initiative +3 (13)

HP 58 (9d10 + 9)

Speed 50 ft.

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

Wolfsblood Endurance. Once per turn, when Shadowfang takes damage other than Radiant damage, Shadowfang takes 6 (1d12) less of that damage, .

The Dark Remembers. While Shadowfang is in Dim Light or Darkness, shadowfang's movement leaves a lingering wake of shadow; a creature that enters the wake has its Speed halved and cannot take the Dash action until it leaves the area.

Shadow Step. Shadowfang ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Shadowfang makes two Bite attacks. It can replace one attack with a use of Shadow Mark.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Shadow Mark. Dexterity Saving Throw: DC 13, one creature within 60 feet. Failure: 7 (2d6) Necrotic damage, and until the end of Shadowfang's next turn the target sheds dim light in a 10-foot radius, it can't benefit from the Invisible condition, and attack rolls against it have Advantage. Success: Half damage only.

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


## 29. Quarrybound Grist — CR 8

**Input:** `CR 8 brute, two attacks, grapples`

```
Quarrybound Grist

Large Construct, Unaligned

AC 15
Initiative -1 (9)

HP 153 (18d10 + 54)

Speed 40 ft., Burrow 30 ft.

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

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses tremorsense 60 ft.; Passive Perception 14

Languages Understands the languages of its creator but can't speak

CR 8 (XP 3,900; PB +3)

Traits

Blood Frenzy. The grist has Advantage on attack rolls against any creature that doesn't have all its Hit Points.

Actions

Multiattack. The grist makes two Slam attacks. It can replace one attack with a use of Boulder Hurl.

Slam. Melee Attack Roll: +8, reach 10 ft. 27 (5d8 + 5) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16). While Grappled, the target has the Restrained condition.

Boulder Hurl. Dexterity Saving Throw: DC 16, one creature within 30 feet. Failure: 28 (8d6) Bludgeoning damage, and the target has the Prone condition.

Bonus Actions

Smother. The grist smothers one Medium or smaller creature it is grappling. While smothered, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the grist, and takes 10 (3d6) Bludgeoning damage at the start of each of the grist's turns. The grist can have only one creature smothered at a time. If the grist takes 25 damage or more on a single turn from the smothered creature, the grist must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the grist. If the grist dies, a smothered creature pulls free Prone by using 10 feet of movement.

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


## 30. Shricking Owlbear — CR 8

**Input:** `owlbear but CR 8`

```
Shricking Owlbear
Large monstrosity, unaligned
Armor Class

14 (natural armor)

Hit Points: 

136 (16d10 + 48)

Speed: 

40 ft., climb 40 ft.

STR	DEX	CON	INT	WIS	CHA


20 (+5)

	

12 (+1)

	

17 (+3)

	

3 (-4)

	

12 (+1)

	

7 (-2)

Skills: 

Athletics +8, Perception +4

Saving Throws: 

STR +8, CON +6

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

None

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Actions
Multiattack: The owlbear makes two Rend attacks. It can replace one attack with a use of Crushing Pounce.
Rend: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 27 (5d8 + 5) slashing damage.
Crushing Pounce: One creature within 10 feet of the owlbear must succeed on a DC 16 Strength saving throw or take 28 (8d6) slashing damage and be knocked prone.
```


## 31. Rimevent Maw — CR 5

**Input:** `a troll but weak to cold instead of fire`

```
Rimevent Maw

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

Vulnerabilities Cold

Senses darkvision 60 ft.; Passive Perception 15

Languages Giant

CR 5 (XP 1,800; PB +3)

Traits

Regeneration. The maw regains 15 Hit Points at the start of each of its turns. If the maw takes Cold damage, this trait doesn't function on the maw's next turn. The maw dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs (4/Day). If the maw ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the maw's limbs is severed, falls into the maw's space, and becomes a Troll Limb. The limb acts immediately after the maw's turn. The maw has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The maw makes three Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 11 (2d6 + 4) Slashing damage.

Bonus Actions

Charge. The maw moves up to half its Speed straight toward an enemy it can see.

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


## 32. Skritch the Crossbow Boss — CR 1

**Input:** `goblin boss with a heavy crossbow`

> **Trace:** PATH CHANGED: was class_npc on 06-25-17 — the dice, not the engine, unless a trace above says otherwise

```
Skritch the Crossbow Boss
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

Nimble Escape (Bonus Action).Skritch takes the Disengage or Hide action.

Actions
Multiattack: Skritch makes two attacks, using Crossbow or Scimitar.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had advantage.
Crossbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 6 (1d8 + 2) piercing damage, and Skritch has advantage on its next attack roll against the target before the end of its next turn. If the target is a Large or smaller creature, it is restrained until the end of its next turn. This effect can be applied only once per turn.
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

Senses tremorsense 30 ft.; Passive Perception 14

Languages None

CR 8 (XP 3,900; PB +3)

Traits

Legendary Nature. Thornback can take 14 (4d6) Legendary Actions after another creature's turn, choosing from the options below.

Tunneler. Thornback can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. Thornback makes two Bite attacks. It can replace one attack with a use of Earth Rejects the Prey.

Bite. Melee Attack Roll: +8 (with Advantage if the target is Grappled by the ankheg), reach 5 ft. 14 (2d8 + 5) Piercing damage plus 3 (1d6) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).

Earth Rejects the Prey. Strength Saving Throw: DC 16, one creature within 10 feet. Failure: The target has the Grappled condition (escape DC 16).

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


## 34. Petrified Seam — CR 10

**Input:** `AC 18 HP 200 hits hard, slow | role: brute`

```
Petrified Seam

Large Monstrosity, Unaligned

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

Senses tremorsense 30 ft.; Passive Perception 15

Languages None

CR 10 (XP 5,900; PB +4)

Traits

Fossil-Bone Knuckles. When the seam's Slam scores a critical hit, the target is knocked Prone.

Actions

Multiattack. The seam makes two Slam attacks. It can replace one attack with a use of Plow Through.

Slam. Melee Attack Roll: +9, reach 10 ft. 32 (6d8 + 5) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17). While Grappled, the target has the Restrained condition.

Plow Through. Strength Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target is pushed up to 10 feet straight away from Seam, and the target has the Prone condition.

Bonus Actions

Entomb. The seam entombs one Medium or smaller creature it is grappling. While entombed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the seam, and takes 10 (3d6) Bludgeoning damage at the start of each of the seam's turns. The seam can have only one creature entombed at a time. If the seam takes 25 damage or more on a single turn from the entombed creature, the seam must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the seam. If the seam dies, an entombed creature breaks free Prone by using 10 feet of movement.

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


## 35. Emberscale Tyrant — CR 10

**Input:** `a drgon`

```
Emberscale Tyrant

Large Dragon, Chaotic Neutral

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

Languages Draconic

CR 10 (XP 5,900; PB +4)

Actions

Multiattack. The tyrant makes three Bite attacks.

Bite. Melee Attack Roll: +9, reach 10 ft. 9 (1d8 + 5) Piercing damage plus 7 (2d6) Fire damage.

Ember Breath (Recharge 5-6). Dexterity Saving Throw: DC 16, each creature in a 30-foot Cone. Failure: 60 (11d10) Fire damage. Success: Half damage.

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


## 36. Gallows-Root — CR 6

**Input:** `big scary tree thing`

> **Trace:** PATH CHANGED: was homebrew on 06-25-17 — the dice, not the engine, unless a trace above says otherwise

```
Gallows-Root
Huge plant, neutral
Armor Class

14 (natural armor)

Hit Points: 

110 (13d12 + 26)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

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

tremorsense 30 ft., passive Perception 14

Languages: 

None

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Umbral Step (Bonus Action).While in Dim Light or Darkness, the gallows-root takes the Hide action.

Actions
Multiattack: The gallows-root makes two Root Lash attacks. It can replace one attack with a use of Lagging Dark.
Root Lash: Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage.
Lagging Dark: Each creature in a 30-foot cone must succeed on a DC 14 Wisdom saving throw or be frightened until the end of its next turn.
```


## 37. Bog-Strangler — CR 4

**Input:** `what would a CR 4 swamp monster look like`

```
Bog-Strangler

Large Monstrosity, Neutral

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

Senses tremorsense 30 ft.; Passive Perception 12

Languages None

CR 4 (XP 1,100; PB +2)

Traits

Muck-Vanish. When the bog-strangler starts its turn in darkness or in water at least waist-deep, it can take the Hide action, and creatures relying on sight cannot find it, while those with Darkvision see only an ordinary mound of floating moss until it attacks or moves.

Actions

Multiattack. The bog-strangler makes two Tendril attacks.

Tendril. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Bonus Actions

Whelm. The bog-strangler whelms one Medium or smaller creature it is grappling. While whelmed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the bog-strangler, and takes 6 (1d12) Bludgeoning damage at the start of each of the bog-strangler's turns. The bog-strangler can have only one creature whelmed at a time. If the bog-strangler takes 12 damage or more in a single turn from the whelmed creature, the bog-strangler must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the bog-strangler. If the bog-strangler dies, a whelmed creature pulls free Prone by using 5 feet of movement.

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


## 38. Bone-Yard Culler — CR 3

**Input:** `the thing that's been killing my players' horses`

```
Bone-Yard Culler
Large beast, unaligned
Armor Class

10 (natural armor)

Hit Points: 

60 (8d10 + 16)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


14 (+2)

	

8 (-1)

	

15 (+2)

	

6 (-2)

	

8 (-1)

	

6 (-2)

Skills: 

Athletics +4, Perception +1

Saving Throws: 

STR +4

Senses: 

darkvision 60 ft., passive Perception 11

Languages: 

None

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Grind the Fallen.While a creature is prone, the culler has advantage on attack rolls against that creature, and its Slam deals an extra 11 (2d10) bludgeoning damage to it.

Actions
Slam: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 20 (4d8 + 2) bludgeoning damage. If the culler moved at least 20 feet straight toward the target immediately before the hit and the target is Large or smaller, the target is knocked prone, and the culler can make one Slam attack against it as a bonus action.
```


## 39. Skarn the Tollkeeper — CR auto

**Input:** `name: Skarn the Tollkeeper | `

```
Skarn the Tollkeeper

Medium Construct, Lawful Neutral

AC 13
Initiative -1 (9)

HP 84 (13d8 + 26)

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

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 11

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Blood Toll. When a creature escapes Skarn's grapple, the escapee tears itself free of the barbed hook, taking 14 (4d6) Slashing damage and leaving a bloody wound behind.

Actions

Reaper's Hook. Melee Attack Roll: +6, reach 5 ft. 17 (3d8 + 4) Slashing damage plus 11 (2d10) Necrotic damage.

Hooked Lash. Strength Saving Throw: DC 14, one creature within 30 feet. Failure: The target is pulled up to 20 feet straight toward Skarn by the reaper's hook and has the Grappled condition (escape DC 14).

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

12 (natural armor)

Hit Points: 

76 (9d10 + 27)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

8 (-1)

	

16 (+3)

	

4 (-3)

	

10 (+0)

	

4 (-3)

Skills: 

Athletics +5, Perception +2

Saving Throws: 

STR +5

Senses: 

darkvision 60 ft., passive Perception 12

Languages: 

None

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Caustic Slime.A creature that grapples the alligator or is grappled by it takes 5 (1d10) acid damage.
Whelm (Bonus Action).The alligator whelms one Medium or smaller creature it is grappling. While whelmed, the target is blinded and restrained, has Total Cover against attacks and other effects outside the alligator, and takes 6 (1d12) acid damage at the start of each of the alligator's turns. The alligator can have only one creature whelmed at a time. If the alligator takes 12 damage or more in a single turn from the whelmed creature, the alligator must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the alligator. If the alligator dies, a whelmed creature pulls free prone by using 5 feet of movement.

Actions
Multiattack: The alligator makes two Bite attacks.
Bite: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 13). While grappled, the target is restrained.
```
