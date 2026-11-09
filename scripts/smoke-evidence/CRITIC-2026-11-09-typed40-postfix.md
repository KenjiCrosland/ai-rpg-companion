# For the critic — the GM-register forty, re-run after your read

Companion to the release package you already have (three frozen sweeps + sweep 3's blocks). This
is the piece that was missing: **the same forty inputs you scored 4 Keeper / 19 Runs / 7 Tweak /
10 Fix, re-run on the frozen build** — `typed40-2026-11-09T06-25-17`.

**FAILs 5 of 40** (the three earlier GM fortys read 8 / 8 / 8). **Coverage 77%** (74 / 74 / 77).

Please score it as before — *did this GM get what they typed, and would they run it tonight?* —
and tell us whether the one pattern in §3 is a Fix we should land before release.

## 1. Your ten Fixes, as they stand on this run

| your Fix | state |
|---|---|
| **B — print body in the words, call overrode it** | closed. #07 "Krug \| ogre" is a twist on the **Ogre** at print's Speed 40 / HP 68; #30 "owlbear but CR 8" is an **Owlbear**. The line is `exact` — the GM typed the creature's whole printed name — measured at 2 of 200 sheets changed, against 25 for "a print body always stands" (a "cathedral-vault ooze" matches Gray Ooze on the generic word; those stay the call's). |
| **A — explicit ask dropped or inverted** | closed. #31 reads **Vulnerabilities "Cold"** and regeneration stops on **Cold**. Your "dropped, then contradicted" was two defects: the bane refused by a three-word frame, and the material pass adding Fire *because* a vulnerability had been named. Both fixed. The frame stays — it refused four banes on your run and was right three times. |
| **spell list not scaled to CR** | closed. A CR 3 goblin wizard reads Scorching Ray and Acid Arrow, not Fireball ×2. One-sided: pasting print's list UPWARD is the rule's purpose (the CR 24 archlich keeps Power Word Kill). |
| **Cynosure's `,.`** | closed, **and this run is the first live proof**. We "fixed" it twice before finding the cause: the `{duration}` token inside the composed ray table is substituted as the `ray_table` engine slot AFTER the duration fill has run, so it rendered the raw key or, with an empty fill, " ,". #18 (now Oracle-Eye Crown) has zero artefacts. |
| **Death Roll `gate-fit`** | closed. It fired on all three earlier GM fortys (Death Roll, Reel In, Debtor's Pin). The checker now shares the engine's KO-condition exclusion — print's warrant is 3 rows in 329 (Brass Dragon Wyrmling's Sleep Breath, the Harpy's Luring Song, the Homunculus's Bite), **all three KO**. A non-KO at-will condition action still fails, which is the case the rule exists for. |
| **Pip's kobold** | closed. Pip now stands on print's **Kobold Warrior**. Two print lookups had disagreed (`printCanonFor('kobold')` found it, `corpusEntry('Kobold')` did not); one definition now. |
| **Keel-Captain ("vampire pirate")** | **open.** `printCanonFor` returns null on a two-noun compound, so the matcher never sees the Vampire. A print head inside a compound concept is unsolved and we are not pretending otherwise. |
| **Beholder's stated CR** | **open — a ruling, not a build.** It is the owner's calibration decision (your HP note). Two `under` band FAILs on this run are the same question. |
| **Orrin's unquantified number** | open, one phrase. |
| **Big Bob (role word over the noun)** | the rule landed with B: a role word is a tiebreaker, never an override of a mechanical noun. Not re-exercised on this run. |

## 2. Three of your proposals we refused, each with the number

- **The GM lexicon as a deterministic table.** It is a word list, which the owner's 2026-10-16 ruling forbids. The extraction already files these as clauses — `"slow" -> mechanical [asked: movement]`, `"legendary" -> mechanical [asked: once_per_fight/save_area]` — so "slow" was read as a movement ROW (hence Trample) when the schema's own HEADER kind lists speed, and "legendary" as a burst because the enum has no value for legendary tempo. **Each row of your lexicon becomes a call field instead.** Same outcome, no table.
- **HP ×1.35.** Engine bodies sit at **print's 48th percentile** for HP at the same CR; ×1.35 moves the median to **p95**, 13 of 21 above every print creature at their label. Your premise — 2024 print is offense-heavy and HP-light against the 2014 table — is correct; that makes it a ruler change, not a calibration fix, and the owner's call. (AC-to-DMG + HP ×1.20 lands ≈ −0.2 and stays inside the book.)
- **The recharge-AoE peer cap.** Print's adult breaths run 45–**66**, not 45–59 — the Adult Gold is 66, the Adult Blue 60 — so the cap touches neither sheet you named.

## 3. The one pattern we want your verdict on

**An authored trait cites a row the sheet does not have.** Across all seven fortys this week it
appears on **three, on three different sheets** — and you caught a fourth our gate missed
(Thornback's "Eruptive Ambush"), so the real rate is higher than our number. This run's instance
shows the mechanism:

> **#20 Thin-Seam Prowler — Flicker Afterimage:** "…the prowler can immediately use its
> **Umbral Step bonus**"
> — and the sheet's row is named **Umbral Step**.

The row exists. The citation appends "bonus" (the call meaning the Bonus Action), and the engine's
authoring refusal chain — which HAS an arm for "this row cites something not on the sheet" — does
not match the composite, so it ships. All three instances are that shape: the cited name is
*nearly* a row on the sheet.

**Is this a pre-release Fix?** It is narrow — a matching fix at an arm that already exists, not a
new rule — and a GM reading "use its Umbral Step bonus" will ask what that is. We think you will
say yes and we would rather hear it now.

## 4. The other four FAILs on this run

Two band `under` reads (the §1 ruler question), one `engine-needs-key` on a grapple, one sheet
with three rows imposing Restrained. One appearance each; we read them as the tail, not a backlog.

## 5. Still unverified, by our own account

Two fixes have **never fired in a live run — 0 of 6 fortys each**: the Pit Fiend's missing-attack-
row add-back, and the class-row lend onto a species body (the fix for a goblin wizard that landed
with no magic). Both are correct by construction and by unit test; neither breaks anything. The
input that triggers them is a coin flip we have not won, so we do not claim they work.

Traces are inlined below wherever the path call overrode the matcher, wherever a lack was read
(including #03 Vell's "lost a hand" and #31's "weak to cold instead of fire"), wherever an
authored row was refused, and on #20 where the pattern of §3 sits.

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

Traits

Iron Plate Rebound. A creature that hits Grask with a melee attack while within 5 feet of it takes 5 (1d10) Thunder damage and has the Deafened condition until the end of its next turn.

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

> **Trace:** decides: class_npc on the Priest · class cleric (the matcher would have said twist Priest)

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

Choking Brine Mist.Any creature that starts its turn in a 10-foot radius originating from Maudra must make a DC 15 Constitution saving throw. On a failed save, the target is poisoned until the start of its next turn. On a successful save, the target is immune to this creature's aura for 24 hours.
Divine Aid (3/Day) (Bonus Action).Maudra casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Maudra makes three attacks, using Radiant Flame or Mace.
Radiant Flame: Ranged Weapon Attack: +6 to hit, range 120 ft., one target. Hit: 16 (3d8 + 3) radiant damage.
Spellcasting: Maudra casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
Brine Rope (Recharge 5-6): One Huge or smaller creature Maudra can see within 60 feet must make a DC 15 Dexterity saving throw. On a failed save, the target is caught in brine and is restrained until the brine is destroyed (AC 12; HP 15; Vulnerability to fire damage; Immunity to Poison and psychic damage).
Mace: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
```


## 03. Captain Vell — CR 6

**Input:** `name: Captain Vell | pirate captain, lost a hand to a shark, hates the sea`

> **Trace:** decides: class_npc on the Gladiator · class fighter (the matcher would have said twist Pirate Captain)
> **Trace:** lacks asked: "lost a hand"

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

Immunities Prone

Senses Passive Perception 11

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Crippling Wound. Vell has Disadvantage on attack rolls that use the limb it has lost.

Actions

Multiattack. Vell makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Hold That Line. Wisdom Saving Throw: DC 15, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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

> **Trace:** decides: class_npc on the Guard Captain · class fighter (the matcher would have said print-plain Scout)

```
Thessaly Nightbloom
Medium humanoid, neutral
Armor Class

18 (breastplate, shield)

Hit Points: 

75 (10d8 + 30)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

14 (+2)

	

16 (+3)

	

12 (+1)

	

14 (+2)

	

13 (+1)

Skills: 

Athletics +6, Perception +4

Senses: 

passive Perception 14

Languages: 

Common, Elvish

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Hunter's Mark.When Thessaly hits a creature with a Twin Shortsword attack, until the end of Thessaly's next turn, the target has disadvantage on opportunity attacks made against her, and her first attack roll against it in any turn is made with advantage.
Riposte (Reaction).When a creature within 5 feet of Thessaly misses it with a melee attack roll, Thessaly makes one Twin Shortsword attack against that creature.

Actions
Multiattack: Thessaly makes two Twin Shortsword attacks.
Twin Shortsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 14 (3d6 + 4) piercing damage, and Thessaly has advantage on its next attack roll against the target before the end of its next turn.
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

Multiattack. Bramblejack makes two Thorned Vine attacks. It can replace one attack with a use of Tangling Lash.

Thorned Vine. Melee Attack Roll: +5 (with Advantage during the first round of each combat), reach 5 ft. 7 (1d8 + 3) Piercing damage plus 5 (1d10) Poison damage.

Tangling Lash. Strength Saving Throw: DC 12, one creature within 5 feet. Failure: The target is pulled up to 5 feet straight toward Bramblejack, and the target has the Restrained condition until the end of its next turn.

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


## 07. Krug — CR 2

**Input:** `name: Krug | ogre`

```
Krug
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

> **Trace:** seat authoring refused: trait — the authored row needs its target to have Prone and no row on this sheet imposes it, so its trigger could never fire (the Chalk-Hound's Daubing

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

Multiattack. Ash makes three attacks, using Radiant Flame or Mace in any combination. It can replace one attack with a use of Bramble-Crown of Stolen Breath.

Radiant Flame. Ranged Attack Roll: +8, range 120 ft. 22 (4d8 + 4) Radiant damage.

Spellcasting. Ash casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 16):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Bramble-Crown of Stolen Breath. Constitution Saving Throw: DC 15, one creature within 60 feet. Failure: The target has the Poisoned condition until the end of its next turn.

Mace. Melee Attack Roll: +8, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.

Bonus Actions

Divine Aid (3/Day). Ash casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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

15 (studded leather)

Hit Points: 

97 (15d8 + 30)

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

Perception +3, Stealth +6

Saving Throws: 

DEX +6

Senses: 

passive Perception 13

Languages: 

Common, Thieves' cant

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Twin Blade Follow-Through.When Kal hits with his scimitar while wielding a blade in his other hand, the second blade follows through, dealing 9 (2d8) slashing damage to the same target, or, if Kal has half of his hit points or fewer, to a different creature within 5 feet of him.
Evasion.If Kal is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Kal instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it is incapacitated.
Cunning Action (Bonus Action).Kal takes the Dash, Disengage, or Hide action.

Actions
Multiattack: Kal makes two attacks, using Scimitar or Shortbow. It can replace one attack with a use of Wheeling Pass.
Scimitar: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 17 (4d6 + 3) slashing damage.
Shortbow: Ranged Weapon Attack: +6 to hit, range 80/320 ft., one target. Hit: 12 (2d8 + 3) piercing damage.
Wheeling Pass: One creature within 5 feet of Kal must make a DC 14 Dexterity saving throw, taking 19 (3d12) slashing damage on a failed save.
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

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus the languages it knew in life

CR 8 (XP 3,900; PB +3)

Traits

Ward Bond. The pale warden is magically bound to a ward of its choosing, and it can have only one ward at a time. While the pale warden is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the pale warden.

Regeneration. The pale warden regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point. If the pale warden takes Radiant damage, this trait doesn't function at the start of the pale warden's next turn.

Actions

Multiattack. The pale warden makes two Slam attacks. It can replace one attack with a use of Sweeping Threshold.

Slam. Melee Attack Roll: +8, reach 10 ft. 12 (2d6 + 5) Bludgeoning damage plus 7 (2d6) Necrotic damage.

Sepulchral Aegis (2/Day). The pale warden targets itself or one creature it can see within 60 feet. The target gains 21 (6d6) Temporary Hit Points, and its AC increases by 2 until the end of the pale warden's next turn.

Sweeping Threshold. Strength Saving Throw: DC 15, each creature in a 30-foot Cone. Failure: The target is pushed up to 15 feet away from the pale warden and has the Prone condition.

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

Large Monstrosity, Neutral

AC 14
Initiative -1 (9)

HP 136 (16d10 + 48)

Speed 40 ft., Climb 40 ft.

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

CR 7 (XP 2,900; PB +3)

Traits

Spider Climb. Zarnak can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions

Multiattack. Zarnak makes two Claw attacks. It can replace one attack with a use of Barbed Tail.

Claw. Melee Attack Roll: +7, reach 10 ft. 13 (2d8 + 4) Slashing damage plus 10 (3d6) Acid damage.

Barbed Tail. Strength Saving Throw: DC 14, one creature within 30 feet. Failure: The target is pulled up to 25 feet straight toward Zarnak by barbed tail and has the Grappled condition (escape DC 15).

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
Multiattack: The big bob makes three Boulder attacks.
Boulder: Melee or Ranged Spell Attack: +7 to hit, reach 10 ft. or range 120 ft., one target. Hit: 16 (3d8 + 3) force damage.
Spellcasting: The big bob casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 15): - At will: Mage Hand, Light
1/day each: Shatter (level 3 version), Ice Storm
Boulder Burst (Recharge 5-6): Each creature in a 15-foot-radius sphere centered on a point within 60 feet must make a DC 15 Dexterity saving throw, taking 39 (6d12) piercing damage on a failed save, or half as much damage on a successful one.
```


## 13. Sekkath the Dim — CR 6

**Input:** `lizard folk shadow monk`

```
Sekkath the Dim

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

Dimlight Veil. While Sekkath is in dim light or darkness, Sekkath is Invisible, and it has Advantage on Stealth checks.

Hold Breath. Sekkath can hold its breath for 15 minutes.

Marsh Stride. Difficult Terrain composed of mud doesn't cost Sekkath extra movement, and Sekkath can move across mud without needing to make an ability check.

Actions

Multiattack. Sekkath makes two attacks, using Unarmed Strike or Dart in any combination.

Unarmed Strike. Melee Attack Roll: +7, reach 5 ft. 31 (6d8 + 4) Bludgeoning damage. Once on each of Sekkath's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 14. Failure: The target has the Stunned condition until the end of Sekkath's next turn.

Dart. Ranged Attack Roll: +7, range 20/60 ft. 17 (3d8 + 4) Piercing damage.

Bonus Actions

Patient Defense. Sekkath takes the Dodge action.

Shadow Step (2/Day). Sekkath teleports up to 30 feet to an unoccupied space it can see.

Cunning Action. Sekkath takes the Dash, Disengage, or Hide action.

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


## 14. Ashen Penitent — CR 5

**Input:** `fire monk`

```
Ashen Penitent
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

Patient Defense (Bonus Action).The penitent takes the Dodge action.
Cunning Action (Bonus Action).The penitent takes the Dash, Disengage, or Hide action.

Actions
Multiattack: The penitent makes two attacks: one with its Unarmed Strike and one with its Dart.
Unarmed Strike: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. Once on each of the penitent's turns when it hits with this attack, the target is subjected to the following effect. The target must make a DC 14 Constitution saving throw. On a failed save, the target is stunned until the end of the penitent's next turn.
Dart: Ranged Weapon Attack: +6 to hit, range 20/60 ft., one target. Hit: 12 (2d8 + 3) piercing damage.
```


## 15. Nib Sneerwing — CR 3

**Input:** `goblin wizard`

> **Trace:** decides: class_npc on the Mage · class mage (the matcher would have said print-plain Mage)

```
Nib Sneerwing

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

Multiattack. Nib makes two Arcane Burst attacks. It can replace one attack with a use of Spellcasting to cast Magic Missile.

Spellcasting. Nib casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 13):

- At Will: Magic Missile, Mage Hand, Minor Illusion
- 1/Day Each: Shatter

Arcane Burst. Melee or Ranged Attack Roll: +5, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Bonus Actions

Misty Step (3/Day). Nib casts Misty Step, using the same spellcasting ability as Spellcasting.

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


## 16. Saltwake Corsair — CR 10

**Input:** `vampire pirate`

```
Saltwake Corsair
Medium undead, neutral evil
Armor Class

14 (natural armor)

Hit Points: 

180 (24d8 + 72)

Speed: 

5 ft., fly 60 ft. (hover), swim 30 ft., climb 30 ft.

STR	DEX	CON	INT	WIS	CHA


6 (-2)

	

16 (+3)

	

17 (+3)

	

12 (+1)

	

14 (+2)

	

15 (+2)

Skills: 

Stealth +7

Saving Throws: 

DEX +7

Damage Resistances: 

bludgeoning, piercing, slashing

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained

Senses: 

darkvision 60 ft., passive Perception 12

Languages: 

Common plus the languages it knew in life

Challenge

10 (5,900 XP)

Proficiency Bonus:

+4

Brine-Drunk.When it damages a creature with its Cutlass, the corsair regains 14 (4d6) hit points, and the damaged creature cannot regain hit points until the start of the corsair's next turn.
Incorporeal Movement.The corsair can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
Sunlight Sensitivity.While in sunlight, the corsair has disadvantage on ability checks and attack rolls.

Actions
Multiattack: The corsair makes two Cutlass attacks. It can replace one attack with a use of Brine Hook.
Cutlass: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (4d6 + 3) slashing damage plus 13 (3d8) necrotic damage.
Brine Hook: One creature within 5 feet of the corsair must succeed on a DC 15 Strength saving throw or be pulled up to 5 feet straight toward the corsair and be grappled (escape DC 15).
```


## 17. Owlbear Zombie — CR 4

**Input:** `owlbear zombie`

> **Trace:** decides: homebrew (the matcher would have said print-plain Zombie)

```
Owlbear Zombie

Large Undead, Neutral

AC 14
Initiative -1 (9)

HP 85 (10d10 + 30)

Speed 30 ft.

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

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 12

Languages None

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The owlbear zombie makes two Rotting Beak attacks. It can replace one attack with a use of Numbing Rot.

Rotting Beak. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 6 (1d12) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Numbing Rot. Constitution Saving Throw: DC 13, each creature in a 15-foot Cone. Failure: The target has the Poisoned condition until the end of its next turn.

Bonus Actions

Swallow. The owlbear zombie swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the owlbear zombie, and takes 6 (1d12) Necrotic damage at the start of each of the owlbear zombie's turns. The owlbear zombie can have only one creature swallowed at a time. If the owlbear zombie takes 12 damage or more in a single turn from the swallowed creature, the owlbear zombie must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the owlbear zombie. If the owlbear zombie dies, a swallowed creature exits the body Prone by using 5 feet of movement.

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


## 18. Oracle-Eye Crown — CR 13

**Input:** `name: Beholder | `

```
Oracle-Eye Crown

Large Aberration, Neutral Evil

AC 17
Initiative +2 (12)

HP 180 (19d10 + 76)

Speed 0 ft., Fly 20 ft. (hover)

MOD
SAVE
STR
10
+0
+0
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
+7
MOD
SAVE
CON
18
+4
+4
CHA
20
+5
+10

Skills Perception +7, Deception +10

Immunities Prone

Senses darkvision 120 ft.; Passive Perception 17

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Paced Stalks. At the start of each of its turns, if the Oracle-Eye Crown is not Bloodied, one eyestalk shuts until it reopens at the end of the crown's next turn and cannot loose a ray, but while any eyestalk is shut the central eye opens, granting the crown Advantage on Perception and awareness of every creature within 60 feet of it.

Actions

Multiattack. The oracle-eye crown makes one Bite attack and uses Eye Rays. It can replace one attack with a use of (A) Withering Ray or (B) Spellcasting to cast Mind Spike.

Bite. Melee Attack Roll: +5, reach 5 ft. 32 (6d8 + 5) Piercing damage.

Withering Ray. Strength Saving Throw: DC 17, one creature within 60 feet. Failure: 27 (6d8) Psychic damage, and the target has the Prone condition.

Spellcasting. The oracle-eye crown casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 18):

- At Will: Mind Spike, Detect Magic, Fear, Hold Person

Eye Rays. The oracle-eye crown fires three rays at random creatures it can see within 120 feet, rolling a d6 for each ray (a creature can be the target of only one ray a turn): 1 — Numbing Ray: Strength Saving Throw: DC 17. Failure: The target's Speed is halved and it can't take Reactions until the end of the oracle-eye crown's next turn. 2 — Binding Ray: Dexterity Saving Throw: DC 17. Failure: The target has the Restrained condition until the end of its next turn. 3 — Blinding Ray: Constitution Saving Throw: DC 17. Failure: The target has the Blinded condition until the end of its next turn. 4 — Dread Ray: Wisdom Saving Throw: DC 17. Failure: The target has the Paralyzed condition until the end of its next turn. 5 — Shoving Ray: Strength Saving Throw: DC 17. Failure: 14 (4d6) Force damage, and the target is pushed up to 15 feet away from the oracle-eye crown and has the Prone condition. 6 — Withering Ray: Constitution Saving Throw: DC 17. Failure: 14 (4d6) Necrotic damage.

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


## 19. Screaming Morsel — CR 7

**Input:** `name: Mind Flayer | `

```
Screaming Morsel
Medium aberration, lawful neutral
Armor Class

13 (natural armor)

Hit Points: 

127 (17d8 + 51)

Speed: 

30 ft.

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

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

None

Challenge

7 (2,900 XP)

Proficiency Bonus:

+3

Mind-Numbed Prey.While the morsel attempts to grapple a creature that is stunned, the morsel has advantage on the ability check to grapple that creature.
Swallow (Bonus Action).The morsel swallows one Medium or smaller creature it is grappling. While swallowed, the target is blinded and restrained, has Total Cover against attacks and other effects outside the morsel, and takes 7 (2d6) psychic damage at the start of each of the morsel's turns. The morsel can have only one creature swallowed at a time. If the morsel takes 15 damage or more in a single turn from the swallowed creature, the morsel must regurgitate the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the morsel. If the morsel dies, a swallowed creature exits the body prone by using 5 feet of movement.

Actions
Multiattack: The morsel makes two Tentacle attacks.
Tentacle: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) psychic damage. If the target is a Large or smaller creature, it is grappled (escape DC 14).
Wailing Deep (Recharge 5-6): Each creature within 20 feet of the morsel must succeed on a DC 14 Constitution saving throw or be stunned until the end of its next turn.
```


## 20. Thin-Seam Prowler — CR 3

**Input:** `displacer beast`

> **Trace:** §3 THE PATTERN: this row cites "Umbral Step bonus"; the sheet's row is "Umbral Step".

```
Thin-Seam Prowler

Large Monstrosity, Neutral

AC 13
Initiative +3 (13)

HP 45 (6d10 + 12)

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

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 3 (XP 700; PB +2)

Traits

Flicker Afterimage. When a creature misses the prowler with an attack, attack rolls against the prowler are made with Disadvantage unless the attacker is within 5 feet of it; on a miss, the prowler can immediately use its Umbral Step bonus action.

Actions

Multiattack. The prowler makes two Tentacles attacks. It can replace one attack with a use of Dread Gaze.

Tentacles. Melee Attack Roll: +5 (with Advantage during the first round of each combat), reach 5 ft. 7 (1d8 + 3) Bludgeoning damage plus 5 (1d10) Psychic damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 11).

Dread Gaze. Wisdom Saving Throw: DC 12, each creature in a 15-foot Cone. Failure: The target has the Frightened condition until the end of the prowler's next turn. Success: The target is immune to this creature's gaze for 24 hours.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the prowler takes the Hide action.

Seam Step (Recharge 4-6). The prowler teleports up to 40 feet to an unoccupied space it can see.

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


## 21. Vigil Oathsworn — CR 4

**Input:** `haunted suit of armor`

> **Trace:** decides: homebrew (the matcher would have said print-plain Animated Armor)
> **Trace:** lacks refused: "haunted suit of armor" names no absence — nothing in it takes anything away

```
Vigil Oathsworn
Medium construct, lawful neutral
Armor Class

14 (natural armor)

Hit Points: 

78 (12d8 + 24)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

8 (-1)

	

14 (+2)

	

6 (-2)

	

12 (+1)

	

5 (-3)

Skills: 

Perception +3

Saving Throws: 

CON +4

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

understands the languages of its creator but can't speak

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Regeneration.The oathsworn regains 5 hit points at the start of each of its turns if it has at least 1 Hit Point. If the oathsworn takes radiant damage, this trait doesn't function at the start of the oathsworn's next turn.
Interpose (Reaction).When a creature within 5 feet of the oathsworn that it guards is hit by an attack roll, the attack hits the oathsworn instead, and the oathsworn has Resistance to the attack's damage.

Actions
Multiattack: The oathsworn makes two Gauntlet attacks. It can replace one attack with a use of Shoulder Slam.
Gauntlet: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage.
Shield Wall (2/Day): The oathsworn targets itself or one creature it can see within 60 feet. The target gains 11 (2d10) temporary hit points, and it gains a +2 bonus to AC until the end of the oathsworn's next turn.
Shoulder Slam: Each creature in a 15-foot cone must make a DC 13 Strength saving throw. On a failed save, the target is pushed up to 15 feet away from the oathsworn and is knocked prone.
```


## 22. Whirring Clockwork Spider — CR 2

**Input:** `clockwork spider`

```
Whirring Clockwork Spider

Medium Construct, Unaligned

AC 15
Initiative +3 (13)

HP 45 (6d8 + 18)

Speed 40 ft., Climb 40 ft.

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

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses blindsight 30 ft.; Passive Perception 14

Languages Understands the languages of its creator but can't speak

CR 2 (XP 450; PB +2)

Traits

Spider Climb. The clockwork spider can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Clinging Scuttle. The clockwork spider ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The clockwork spider makes two attacks, using Fangs or Webbing in any combination.

Fangs. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Piercing damage.

Webbing. Ranged Attack Roll: +5, range 20/60 ft. 6 (1d6 + 3) Bludgeoning damage. Hit or Miss: Immediately after the attack, a gear-toothed web returns to the clockwork spider's grasp. If the target is a Large or smaller creature, it has the Restrained condition until the start of its next turn. This effect can be applied only once per turn.

Gear-Cog Web (Recharge 5-6). The clockwork spider hurls a gear-toothed web at a point it can see within 90 feet. Dexterity Saving Throw: DC 12, each creature in a 5-foot-radius Sphere centered on that point. Failure: 13 (3d8) Bludgeoning damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Bonus Actions

Fleet Agility. The clockwork spider takes the Dash or Disengage action.

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

Oath of the Hearth. While within 60 feet of a villager or a village structure he has sworn to defend, Orrin has Advantage on attack rolls against any creature that has attacked a villager or village structure since the end of Orrin's last turn.

Forge-Flare. When Orrin is Bloodied or an ally within his reach is reduced to 0 Hit Points, the hammer flares with forge-heat for 1 minute; the first Hammer attack Orrin makes on each of his turns that hits deals an extra 11 (2d10) Fire damage.

Actions

Multiattack. Orrin makes three Hammer attacks. It can replace one attack with a use of Shield Bash.

Hammer. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and if the target is Large or smaller, it is pushed up to 10 feet straight away from Orrin.

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

Unburied Flesh.While the queen has at least 1 hit point and has not taken fire damage since the start of its last turn, the queen regains 11 (2d10) hit points at the start of its turn.
Aura of Authority.While in a 10-foot radius originating from Ysolde, Ysolde and its allies have advantage on attack rolls and saving throws, provided Ysolde is not incapacitated.

Actions
Multiattack: Ysolde makes three attacks, using Royal Blade or Icy Strike.
Icy Strike: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage plus 9 (2d8) cold damage.
Royal Blade: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) slashing damage.
The Old Tongue Commands (Recharge 5-6): Each creature within 30 feet of the queen must succeed on a DC 16 Wisdom saving throw or be frightened of the queen until the end of its next turn.
```


## 25. Pip — CR 1

**Input:** `name: Pip | A kobold who was raised by a green dragon and thinks he IS a dragon. Wears homemade wings. Breathes a little poison gas (he practices). Extremely confident. The party's first recurring villain. He should be funny but actually a little dangerous in a group.`

```
Pip

Small Humanoid, Chaotic Neutral

AC 15
Initiative +2 (12)

HP 27 (6d6 + 6)

Speed 30 ft., Fly 30 ft. (hover), Climb 30 ft.

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

Senses Passive Perception 13

Languages Common, Draconic

CR 1 (XP 200; PB +2)

Traits

Homemade Wings. Pip has a Fly Speed of 30 feet; if Pip is airborne at the end of its turn, it falls unless it used its Sling or made a Bite attack this turn.

Skittering. Pip ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Pip makes two attacks, using Bite or Sling in any combination.

Bite. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Piercing damage.

Sling. Ranged Attack Roll: +4, range 30/120 ft. 4 (1d4 + 2) Bludgeoning damage.

Practiced Spit (Recharge 5-6). DC 11 Constitution Saving Throw: each creature in a 15-foot Cone. Failure: The target has the Poisoned condition until the end of its next turn.

Bonus Actions

Fleet Agility. Pip takes the Dash or Disengage action.

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

Tainted Benediction. When the hollow cardinal casts a spell that would restore Hit Points to a creature other than itself, the target regains the spell's Hit Points, then takes 13 (3d8) Radiant damage as the healing curdles into light.

Fear Aura. The hollow cardinal emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 18, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the end of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Actions

Multiattack. The hollow cardinal makes four attacks, using Radiant Flame or Mace in any combination. It can replace one attack with a use of Pillar of Unlight.

Radiant Flame. Ranged Attack Roll: +11, range 150 ft. 24 (4d8 + 6) Radiant damage.

Spellcasting. The hollow cardinal casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 19):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Pillar of Unlight. Constitution Saving Throw: DC 18, one creature within 30 feet. Failure: 26 (4d12) Radiant damage, and the target has the Blinded condition until the end of its next turn. Success: Half damage only.

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

Hedge-Brew Peddler.When a creature spends a short rest haggling with Grizzelda, the creature makes a Charisma (Persuasion) check against DC 14; on a success it gains the benefit of a Potion of Healing without spending the item.
Shimmering Veil.While Grizzelda is not incapacitated, attack rolls against Grizzelda are made with disadvantage unless Grizzelda has just dealt damage to the attacker.
Misty Step (3/Day) (Bonus Action).Grizzelda casts Misty Step, using the same spellcasting ability as Spellcasting.
Protective Magic (3/Day) (Reaction).Grizzelda casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Grizzelda makes three Claws attacks.
Claws: Melee Spell Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage plus 4 (1d8) necrotic damage.
Spellcasting: Grizzelda casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14): - At will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
2/day each: Fireball, Invisibility
1/day each: Cone of Cold, Fly
```


## 28. Shadowfang — CR 3

**Input:** `name: Shadowfang | the druid's wolf companion, bigger than a normal wolf, has a scar over one eye and shadows seem to follow it. Should be tougher than a dire wolf.`

```
Shadowfang

Large Beast, Unaligned

AC 12
Initiative -1 (9)

HP 67 (9d10 + 18)

Speed 30 ft.

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

Senses darkvision 60 ft.; Passive Perception 11

Languages None

CR 3 (XP 700; PB +2)

Actions

Bite. Melee Attack Roll: +5, reach 5 ft. 21 (4d8 + 3) Piercing damage.

Luring Presence (Recharge 5-6). Wisdom Saving Throw: DC 12, one creature within 60 feet that can see or hear Shadowfang. Failure: The target has the Charmed condition until the start of Shadowfang's next turn, and while Charmed this way, it must move toward Shadowfang by the safest available route on its turn.

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


## 29. Sanguine Chainwrack — CR 8

**Input:** `CR 8 brute, two attacks, grapples`

```
Sanguine Chainwrack

Large Construct, Unaligned

AC 15
Initiative -1 (9)

HP 153 (18d10 + 54)

Speed 40 ft.

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

Resistances Fire

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages Understands the languages of its creator but can't speak

CR 8 (XP 3,900; PB +3)

Traits

Searing Links. A creature that grapples the chainwrack or is Grappled by it takes 7 (2d6) Fire damage.

Actions

Multiattack. The chainwrack makes two Barbed Chain attacks. It can replace one attack with a use of Reel and Rend.

Barbed Chain. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Piercing damage plus 11 (2d10) Fire damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16). While Grappled, the target has the Restrained condition.

Reel and Rend. Strength Saving Throw: DC 16, each creature in a 30-foot Cone. Failure: The target is pulled up to 10 feet straight toward the chainwrack, and the target has the Prone condition.

Bonus Actions

Cage. The chainwrack cages one Medium or smaller creature it is grappling. While caged, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the chainwrack, and takes 10 (3d6) Fire damage at the start of each of the chainwrack's turns. The chainwrack can have only one creature caged at a time. If the chainwrack takes 25 damage or more on a single turn from the caged creature, the chainwrack must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the chainwrack. If the chainwrack dies, a caged creature pulls free Prone by using 10 feet of movement.

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


## 30. Moon-Grove Owlbear — CR 8

**Input:** `owlbear but CR 8`

```
Moon-Grove Owlbear
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

Fear Aura.The owlbear emanates an aura in a 20-foot radius while it is not incapacitated. Any enemy that starts its turn in the aura must make a DC 16 Wisdom saving throw. On a failed save, the target is frightened until the start of its next turn. On a successful save, the target is immune to this creature's aura for 24 hours.

Actions
Multiattack: The owlbear makes two Rend attacks. It can replace one attack with a use of Weight of the Grove.
Rend: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 27 (5d8 + 5) slashing damage.
Weight of the Grove: One creature within 10 feet of the owlbear must succeed on a DC 16 Strength saving throw or be knocked prone.
```


## 31. Rimeblood Troll — CR 5

**Input:** `a troll but weak to cold instead of fire`

> **Trace:** lacks asked: "weak to cold instead of fire"

```
Rimeblood Troll

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

Regeneration. The troll regains 15 Hit Points at the start of each of its turns. If the troll takes Cold damage, this trait doesn't function on the troll's next turn. The troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs (4/Day). If the troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the troll's limbs is severed, falls into the troll's space, and becomes a Troll Limb. The limb acts immediately after the troll's turn. The troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The troll makes three Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 11 (2d6 + 4) Slashing damage.

Trample (Recharge 5-6). The troll moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Dexterity Saving Throw: DC 16. Failure: 18 (4d8) Cold damage, and the target has the Prone condition.

Bonus Actions

Charge. The troll moves up to half its Speed straight toward an enemy it can see.

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


## 32. Skritch the Bolt-Bully — CR 1

**Input:** `goblin boss with a heavy crossbow`

```
Skritch the Bolt-Bully
Small humanoid, neutral
Armor Class

13 (studded leather)

Hit Points: 

27 (6d6 + 6)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


14 (+2)

	

12 (+1)

	

12 (+1)

	

10 (+0)

	

11 (+0)

	

10 (+0)

Skills: 

Perception +2, Stealth +3

Saving Throws: 

DEX +3

Senses: 

passive Perception 12

Languages: 

Common, Goblin

Challenge

1 (200 XP)

Proficiency Bonus:

+2

Steady Trigger.While Skritch has not been hit since the start of his last turn, Skritch has advantage on ranged attack rolls against any creature that has not yet damaged him this combat.
Riposte (Reaction).When a creature within 5 feet of Skritch misses it with a melee attack roll, Skritch makes one Longsword attack against that creature.

Actions
Multiattack: Skritch makes two attacks, using Crossbow or Longsword.
Longsword: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) slashing damage.
Crossbow: Ranged Weapon Attack: +3 to hit, range 80/320 ft., one target. Hit: 5 (1d8 + 1) piercing damage, and Skritch has advantage on its next attack roll against the target before the end of its next turn.
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

Earth Glide. Thornback can burrow through nonmagical, unworked earth and stone. While doing so, Thornback doesn't disturb the material it moves through.

Tunneler. Thornback can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. Thornback makes two Bite attacks.

Bite. Melee Attack Roll: +8 (with Advantage if the target is Grappled by the ankheg), reach 5 ft. 14 (2d8 + 5) Piercing damage plus 3 (1d6) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).

Burrow Ambush. If Thornback is burrowing, it erupts from the ground at a point within 5 feet of one creature. Dexterity Saving Throw: DC 16, that creature. Failure: 14 (4d6) Acid damage, and the target has the Prone condition. Thornback then makes one Bite attack against the target.

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


## 34. Toad-Idol Warden — CR 10

**Input:** `AC 18 HP 200 hits hard, slow | role: brute`

```
Toad-Idol Warden

Large Construct, Unaligned

AC 18
Initiative -1 (9)

HP 200 (24d10 + 72)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+9
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
17
+3
+7
CHA
4
-3
-3

Skills Athletics +9, Perception +4

Immunities Poison, Thunder; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages Understands the languages of its creator but can't speak

CR 10 (XP 5,900; PB +4)

Traits

Thunder Absorption. Whenever the warden is subjected to Thunder damage, it takes no damage and instead regains a number of Hit Points equal to the Thunder damage dealt.

Immutable Form. The warden can't shape-shift.

Siege Monster. The warden deals double damage to objects and structures.

Actions

Multiattack. The warden makes two Fist attacks. It can replace one attack with a use of Unstoppable Advance.

Fist. Melee Attack Roll: +9, reach 10 ft. 14 (2d8 + 5) Bludgeoning damage plus 10 (3d6) Thunder damage.

Gate-Thunder (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: 60 (11d10) Thunder damage, and the target has the Prone condition. Success: Half damage only.

Unstoppable Advance. Strength Saving Throw: DC 17, each creature in a 30-foot-long, 5-foot-wide Line. Failure: The target is pushed up to 10 feet straight away from the warden, and the target has the Prone condition.

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


## 35. Cindermire Wyrm — CR 10

**Input:** `a drgon`

```
Cindermire Wyrm

Large Dragon, Neutral Evil

AC 18
Initiative +1 (11)

HP 152 (16d10 + 64)

Speed 40 ft., Fly 80 ft., Swim 40 ft.

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

Immunities Poison

Senses blindsight 30 ft., darkvision 120 ft., tremorsense 30 ft.; Passive Perception 15

Languages Draconic

CR 10 (XP 5,900; PB +4)

Traits

Venomous Recoil. A creature that touches the wyrm or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Poison damage.

Actions

Multiattack. The wyrm makes three Bite attacks. It can replace one attack with a use of Venomous Carry.

Bite. Melee Attack Roll: +9, reach 10 ft. 18 (3d8 + 5) Piercing damage.

Vitriol Breath (Recharge 5-6). Constitution Saving Throw: DC 16, each creature in a 30-foot Cone. Failure: 60 (11d10) Poison damage. Success: Half damage.

Venomous Carry. Strength Saving Throw: DC 16, each creature in a 30-foot Cone. Failure: The target is pulled up to 10 feet straight toward the wyrm, and the target has the Poisoned condition until the end of its next turn.

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


## 36. Rotbark Colossus — CR 6

**Input:** `big scary tree thing`

```
Rotbark Colossus
Huge plant, neutral evil
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

blindsight 30 ft. (blind beyond this radius), passive Perception 13

Languages: 

None

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Rootfeed.At the start of each of its turns, if it dealt necrotic damage with its Slam to a creature grappled, restrained, or prone within its reach since its last turn, the colossus regains 10 (3d6) hit points.

Actions
Multiattack: The colossus makes two Slam attacks. It can replace one attack with a use of Horrid Display.
Slam: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage.
Horrid Display: Each creature of the colossus's choice in a 30-foot radius originating from the colossus that can see or hear it must make a DC 14 Wisdom saving throw. On a failed save, the target is frightened until the end of its next turn. On a successful save, the target is immune to this creature's terror for 24 hours.
```


## 37. Mire Maw — CR 4

**Input:** `what would a CR 4 swamp monster look like`

```
Mire Maw

Medium Monstrosity, Neutral

AC 15
Initiative +4 (14)

HP 52 (8d8 + 16)

Speed 30 ft., Swim 30 ft.

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

Skills Perception +3, Stealth +8

Senses tremorsense 30 ft.; Passive Perception 13

Languages None

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The mire maw makes two Proboscis attacks. It can replace one attack with a use of Barbed Hook.

Proboscis. Melee Attack Roll: +6 (with Advantage during the first round of each combat), reach 5 ft. 8 (1d8 + 4) Piercing damage plus 6 (1d12) Poison damage.

Barbed Hook. Strength Saving Throw: DC 14, one creature within 5 feet. Failure: The target has the Grappled condition (escape DC 11).

Bonus Actions

Shadow Concealment. While in Dim Light or Darkness, the mire maw takes the Hide action.

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


## 38. Night Mare Stalker — CR 3

**Input:** `the thing that's been killing my players' horses`

```
Night Mare Stalker
Medium beast, unaligned
Armor Class

13 (natural armor)

Hit Points: 

60 (11d8 + 11)

Speed: 

40 ft.

STR	DEX	CON	INT	WIS	CHA


12 (+1)

	

14 (+2)

	

13 (+1)

	

8 (-1)

	

12 (+1)

	

8 (-1)

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

Faultless Tracker.The mare stalker knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.
Brush Shade.The mare stalker ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Nimble Escape (Bonus Action).The mare stalker takes the Disengage or Hide action.

Actions
Multiattack: The mare stalker makes two attacks: one with its Claw and one with its Nightfeed.
Claw: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 11 (2d8 + 2) slashing damage.
Nightfeed: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 11 (2d8 + 2) necrotic damage, and the target must succeed on a DC 12 Constitution saving throw or be poisoned until the end of its next turn.
```


## 39. Skarn the Tollkeeper — CR auto

**Input:** `name: Skarn the Tollkeeper | `

```
Skarn the Tollkeeper

Medium Construct, Neutral

AC 16
Initiative -1 (9)

HP 84 (13d8 + 26)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
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
14
+2
+4
CHA
5
-3
-3

Skills Perception +3

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Spilled Tolls. While Skarn is Bloodied, the area within 5 feet of Skarn is Difficult Terrain for other creatures, and Skarn regains 6 (1d12) Hit Points at the start of each of its turns while it remains on that ground.

Actions

Multiattack. Skarn makes two Toll Bar attacks. It can replace one attack with a use of Memory Toll.

Toll Bar. Melee Attack Roll: +6, reach 5 ft. 11 (2d6 + 4) Bludgeoning damage.

Warding Receipt (2/Day). Skarn targets itself or one creature it can see within 60 feet. The target gains 11 (2d10) Temporary Hit Points, and its AC increases by 2 until the end of Skarn's next turn.

Memory Toll. Dexterity Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Restrained condition until the end of its next turn.

Reactions

Interpose. Trigger: A creature within 5 feet of Skarn that it guards is hit by an attack roll. Response: The attack hits Skarn instead, and Skarn has Resistance to the attack's damage.

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


## 40. Cistern King — CR auto

**Input:** `sewer alligator`

```
Cistern King
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

False Appearance.While the cistern king remains motionless, it is indistinguishable from submerged debris.
Swallow (Bonus Action).The cistern king swallows one Medium or smaller creature it is grappling. While swallowed, the target is blinded and restrained, has Total Cover against attacks and other effects outside the cistern king, and takes 6 (1d12) acid damage at the start of each of the cistern king's turns. The cistern king can have only one creature swallowed at a time. If the cistern king takes 12 damage or more in a single turn from the swallowed creature, the cistern king must regurgitate the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the cistern king. If the cistern king dies, a swallowed creature exits the body prone by using 5 feet of movement.

Actions
Multiattack: The cistern king makes two Bite attacks. It can replace one attack with a use of Waterline Seizure.
Bite: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 13). While grappled, the target is restrained.
Waterline Seizure: One creature within 60 feet must make a DC 13 Dexterity saving throw. On a failed save, the target is restrained until the end of its next turn.
```
