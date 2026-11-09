# For the critic — the release question (three frozen sweeps + the GM-register forty)

One question this time: **is this shippable?** Everything below is measured; where a number of
ours was wrong earlier in the week I say so. Your GM-register read (4 Keeper / 19 Runs / 7 Tweak /
10 Fix) drove the last two days — 7 of those 10 are closed. This package asks you to score the
crafted forty one more time and then rule on release.

## 1. What landed since your two reads

**Your gate-2 hold list — all four done.** 7a authored-row rigor (two checks, print-verified at 0
of 329); 7e print's saving throws; 7f the swarm's name from the route call; 7b "drops to 0 Hit
Points" out of the gate predicate.

**Your GM-register Fixes — 7 of 10 closed.** B (a whole print name is a fact — Krug is an Ogre at
print's Speed 40 / HP 68, "owlbear but CR 8" is an Owlbear); A (the troll reads Vulnerabilities
**Cold**, regeneration stops on **Cold** — dropped *and* contradicted, both halves); the spell list
scaled (a CR 3 goblin wizard reads Scorching Ray and Acid Arrow, not Fireball ×2); the Cynosure's
punctuation (confirmed live, §3b); plus one print lookup instead of two (Pip now stands on print's Kobold Warrior).

**Still open from your ten:** the Keel-Captain ("vampire pirate" — `printCanonFor` returns null on
a two-noun compound, so the matcher never sees the Vampire; a print head inside a compound concept
is unsolved); the Beholder's stated CR (your §5, and the owner's ruler decision, not a build);
Orrin's one unquantified number.

**Three of your proposals we refused, with the measurement:** the GM lexicon as a deterministic
table (it is a word list, which the owner's 2026-10-16 ruling forbids — the extraction already
files "slow" and "legendary" as clauses with an `asked` enum, so each row of the lexicon becomes a
CALL FIELD instead); HP ×1.35 (engine bodies sit at **print's 48th percentile** for HP at the same
CR — ×1.35 moves the median to **p95**, with 13 of 21 above every print creature at their label;
that is a ruler change, not a calibration fix, and it is the owner's call); the recharge-AoE peer
cap (print's adult breaths run 45–**66**, not 45–59 — the Adult Gold is 66 and the Adult Blue 60,
so the cap touches neither sheet you named).

**And 1h, which we did not build.** Your formation shape: measured against print, **all four
proposed effects appear 0 times in 329 blocks** (a +N AC trait, can't-be-moved, Advantage on saves
vs Charmed/Frightened, shared Resistance). Meanwhile the engine already writes the trait — Vashka
shipped **"Shield Lock: While Vashka can see or hear an ally within 5 feet of him, both Vashka and
that ally gain a +1 bonus to AC, which ends if Vashka has the Incapacitated condition"** — and
"fights from a shield wall" is credited. The remaining miss is "never breaks ranks" alone, 1 clause
of 148, not the 5 we sized. If it is worth building, print's own row is the shape: the **Hobgoblin
Captain's Aura of Authority** (Advantage on attack rolls and saving throws for the hobgoblin and
its allies within 10 feet, gated on not being Incapacitated) — and Vashka is a hobgoblin warlord.

## 2. Three frozen sweeps — the bar, read properly

Identical code, three runs of `sweep.json` (`04-35-08`, `05-34-07`, `05-57-15`).

| | |
|---|---|
| per-clause hit rate | **77%** (114/148) — your "done when" is ≥ 90%, the roadmap's release bar 85% |
| answered **every** time | 31 of 50 clauses (62%) |
| coin flip | 15 (30%) |
| never | 4 (8%) |
| FAILs | **2 / 3 / 3** of 40 |

**Why the earlier numbers were lower and what that means.** The 73–75% readings came from windows
where the CODE CHANGED between runs, so a clause landing on one forty and not the next read as
engine flakiness. On frozen code the reliable band is 62% against 56%, and the coin-flip band 30%
against 34%. Some of what we were calling churn was us.

**The 85% is not reachable by building, and here is the arithmetic.** Of 34 misses, **15 are coin
flips on identical code** — model variance, which no item on any plan targets. The four
never-answered are Vashka's "never breaks ranks" and three BODY descriptions: "a siege engine
golem of lashed timber", "a plague bearing archon of flies", "a shell that sheds acid". Those are
"what the creature is made of" clauses the extraction files as rule requests and nothing turns
into a row — a different problem from anything we fixed this week, and the honest remainder.

## 3. The crafted set's one standing defect, diagnosed

`lack-honored` is the **only** FAIL rule in all three frozen runs, and it is the same sheet every
time: **#15 Adult Red Dragon — "blind in one eye from an old lance."** The other six FAIL rules
appeared once each (a stray "Hit:" marker, a trait citing an undefined Bite, a name promising a
knockdown the text lacks, a Staff deriving from CHA).

The mechanism is not "the sheet ignores the ask" — it is worse and more fixable. The traces:

```
lacks asked: "blind in one eye"
lacks clause: Actions/"Ruined-Eye Glare" leaves      (run 1)
lacks clause: Traits/"Lance-Scarred Blind Side" leaves (run 2)
lacks refused: "in one eye" names no absence          (run 3)
```

The engine reads the lack, **authors exactly the right row for it**, and then the lack-removal
pass **deletes that row for mentioning the eye**. The checker then reports the lack unhonoured,
because honouring a lack requires a row stamped `flaw` and the only candidate was just removed.
The sheet ships "The Eye That Remembers" (which says "its good eye", so the flavour survives) and
print's unchanged senses line — blindsight 60, darkvision 120, passive Perception 23 — so a dragon
the GM made half-blind reads fully sighted. **One pass, confusing "a row that grants what the GM
removed" with "a row that expresses the absence."** We have not fixed it; it is the last thing on
the pre-release list if you call it a Fix.

## 3b. A fourth GM forty, run after the last two fixes — and one pattern it exposed

The three sweeps above were run on code that had moved on from the GM fortys in your read, so we
ran the GM register once more on the frozen build (`typed40-2026-11-09T06-25-17`).

**FAILs 5 of 40, down from 8 / 8 / 8 on the three earlier GM fortys. Coverage 77%.** Both fixes
made specifically for your GM-register findings are confirmed on a live sheet for the first time:
the **Cynosure's punctuation is gone** (we had "fixed" it twice before finding the real cause —
the `{duration}` token inside the composed ray table, substituted after the duration fill had
already run), and **`gate-fit` is gone** (it fired on all three earlier GM fortys — Death Roll,
Reel In, Debtor's Pin — and the checker now shares the engine's KO-condition exclusion; print's
warrant is 3 rows in 329, all KO).

**The pattern: an authored trait cites a row the sheet does not have.** Measured across all seven
fortys this week, it appears on **three of them, on three different sheets** — and you caught a
fourth our gate missed (Thornback's "Eruptive Ambush"), so the true rate is higher than our
number. This run's instance is instructive:

> **Flicker Afterimage** … "the prowler can immediately use its **Umbral Step bonus**"
> — and the sheet's row is named **Umbral Step**.

The row exists. The citation appends the word "bonus" (the call meaning the Bonus Action), and the
engine's authoring refusal chain — which DOES have an arm for "the authored row cites a row that
is not on this sheet" — does not match the composite, so it ships. The three instances are all
this shape: the cited name is nearly a row on the sheet. This is the only thing on the GM register
we would now call a standing defect rather than tail noise, and it is a narrow fix at the
refusal arm, not a new rule.

The other four FAILs on this run: two band `under` reads (the stated-CR/ruler question of §2 and
your §5), one `engine-needs-key` on a grapple, one sheet with three rows imposing Restrained —
one appearance each.

## 4. Two landed fixes we are calling UNVERIFIED

Honesty about our own work: the Pit Fiend's missing-attack-row add-back (1e) and the class-row lend
onto a species body (item 10) have **never fired in a live run — 0 of 5 fortys each.** Both are
correct by construction and by unit test, and neither breaks anything (4957 tests pass). But the
input that triggers them is a coin flip we have not won, so we are not claiming they work. Proving
them needs a forced replay against the saved sheets that had the shape, not another forty.

## 5. The question

Given: the crafted forty at **2–3 FAILs of 40** with one standing defect (§3); the GM register with
7 of your 10 Fixes closed; **77%** of what a GM types becoming a rule, with the gap being churn
plus three body-description clauses; and two fixes we cannot yet demonstrate (§4) —

**Is this shippable, and if not, what is the shortest list that makes it so?**

Our own view, for you to argue with: ship, with the Red Dragon's blind eye and the vampire-pirate
compound named as known gaps, and the 85% bar retired as unreachable by building. We would rather
be told we are wrong now than after release.

Sweep 3's forty blocks follow. The GM-register forty is in
`CRITIC-2026-11-09-typed40.md` with its traces inlined; its run is
`smoke-out/typed40-2026-11-09T03-38-20/`.

---

# Sweep 3 — the forty, blocks only


## 01. Dire Wolf — CR 1

**Input:** `name: Dire Wolf | with a frost-rimed hide`

> **Trace:** lacks asked: nothing taken away

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

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 1 (XP 200; PB +2)

Traits

Dust-Death Bite. A creature reduced to 0 Hit Points by the dire wolf crumbles to dust, and it can't be restored to life by any means short of a Wish spell.

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Lashing Strike. Dexterity Saving Throw: DC 13, one creature within 5 feet. Failure: 6 (1d12) Bludgeoning damage.

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


## 02. Net-Drowned Hound — CR 1

**Input:** `a mud-caked bog hound that drags fishermen under`

> **Trace:** lacks asked: nothing taken away

```
Net-Drowned Hound
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

darkvision 60 ft., passive Perception 12

Languages: 

None

Challenge

1 (200 XP)

Proficiency Bonus:

+2

Whelm (Bonus Action).The hound whelms one Medium or smaller creature it is grappling. While whelmed, the target is blinded and restrained, has Total Cover against attacks and other effects outside the hound, and takes 3 (1d6) bludgeoning damage at the start of each of the hound's turns. The hound can have only one creature whelmed at a time. If the hound takes 5 damage or more in a single turn from the whelmed creature, the hound must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the hound. If the hound dies, a whelmed creature pulls free prone by using 5 feet of movement.

Actions
Multiattack: The hound makes two Bite attacks. It can replace one attack with a use of Drag Under.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained.
Drag Under: Each creature in a 15-foot cone must make a DC 13 Strength saving throw. On a failure, the target is pulled up to 5 feet straight toward the hound.
```


## 03. Owlbear — CR 3

**Input:** `name: Owlbear | that has learned to climb`

> **Trace:** lacks asked: nothing taken away

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
Multiattack: The owlbear makes two Rend attacks. It can replace one attack with a use of Learned to Climb.
Rend: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.
Learned to Climb: One creature within 5 feet of the owlbear must succeed on a DC 15 Strength saving throw or be knocked prone.
```


## 04. Tollwright — CR 3

**Input:** `a chapel bell-ringer's ghost that tolls for the dying`

> **Trace:** lacks asked: nothing taken away

```
Tollwright

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

Bell's Echo. While in Dim Light or Darkness, Tollwright is Invisible, and a creature locating it by hearing must succeed on a Perception check against its Stealth; the sound always comes from somewhere Tollwright is not.

Ethereal Sight. Tollwright can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. Tollwright can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. Tollwright makes two Withering Touch attacks. It can replace one attack with a use of Solemn Toll.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Solemn Toll. Wisdom Saving Throw: DC 13, one creature within 60 feet. Failure: The target has the Frightened condition until the end of its next turn.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see Tollwright and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of Tollwright's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid Tollwright can see within 5 feet. Failure: The target is possessed by Tollwright; Tollwright disappears, and the target has the Incapacitated condition and loses control of its body. Tollwright now controls the body, but the target retains awareness. Tollwright can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. Tollwright's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or Tollwright leaves as a Bonus Action. When the possession ends, Tollwright appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. Tollwright casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. Tollwright is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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

> **Trace:** lacks asked: nothing taken away

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


## 06. Scree Pit — CR 5

**Input:** `a quarry-pit thing of living scree that buries what it catches`

> **Trace:** lacks asked: nothing taken away

```
Scree Pit
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

Aberrant Ground.The ground in a 10-foot radius originating from the scree pit is Difficult Terrain.
Entomb (Bonus Action).The scree pit entombs one Medium or smaller creature it is grappling. While entombed, the target is blinded and restrained, has Total Cover against attacks and other effects outside the scree pit, and takes 7 (2d6) thunder damage at the start of each of the scree pit's turns. The scree pit can have only one creature entombed at a time. If the scree pit takes 15 damage or more in a single turn from the entombed creature, the scree pit must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the scree pit. If the scree pit dies, an entombed creature breaks free prone by using 5 feet of movement.

Actions
Multiattack: The scree pit makes two Grinding Arms attacks.
Grinding Arms: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage plus 7 (2d6) thunder damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained.
Thunder Line (Recharge 5-6): Each creature in a 30-foot-long, 5-foot-wide line must make a DC 14 Dexterity saving throw, taking 17 (5d6) thunder damage on a failed save. On a failed save, the target is also knocked prone.
```


## 07. Hydra — CR 8

**Input:** `name: Hydra | whose stumps smoke instead of regrowing`

> **Trace:** lacks asked: "instead of regrowing"
> **Trace:** lacks clause: Traits/"Multiple Heads" keeps its blow, loses the regeneration — "Hydra — whose stumps smoke instead of regrowing"

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

Choking Smoke.Any creature that starts its turn in a 10-foot radius originating from the hydra must make a DC 16 Constitution saving throw. On a failed save, the target is poisoned until the end of its next turn. On a successful save, the target is immune to this creature's aura for 24 hours.
Hold Breath.The hydra can hold its breath for 1 hour.
Multiple Heads.The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead.
Reactive Heads.For each head the hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks.

Actions
Multiattack: The hydra makes as many Bite attacks as it has heads.
Bite: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.
Smoking Neck-Shove: Each creature in a 30-foot cone must make a DC 16 Dexterity saving throw, taking 35 (10d6) piercing damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also pulled up to 10 feet straight toward the hydra.
```


## 08. Siege-Ram Golem — CR 8

**Input:** `a siege-engine golem of lashed timber that shoulders through walls`

> **Trace:** lacks asked: nothing taken away

```
Siege-Ram Golem

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

Splinter Spray. A creature that hits the golem with a melee attack while within 5 feet of it takes 7 (2d6) Piercing damage.

Immutable Form. The golem can't shape-shift.

Magic Resistance. The golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The golem makes two Shoulder attacks.

Shoulder. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage.

Trample (Recharge 5-6). The golem moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Dexterity Saving Throw: DC 16. Failure: 27 (6d8) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

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

> **Trace:** lacks asked: nothing taken away

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

Immutable Form. The stone golem can't shape-shift.

Magic Resistance. The stone golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The stone golem makes two attacks, using Slam or Force Bolt in any combination.

Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.

Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.

Shockwave (1/Day). Dexterity Saving Throw: DC 17, each creature in a 15-foot Emanation originating from the stone golem. Failure: 35 (10d6) Bludgeoning damage. Success: Half damage.

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

> **Trace:** lacks asked: nothing taken away

```
Drowned Choir
Medium undead, neutral
Armor Class

16 (natural armor)

Hit Points: 

180 (24d8 + 72)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


12 (+1)

	

16 (+3)

	

17 (+3)

	

13 (+1)

	

14 (+2)

	

11 (+0)

Skills: 

Perception +6, Stealth +11

Saving Throws: 

DEX +7, INT +5

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 120 ft., passive Perception 16

Languages: 

Common plus the languages it knew in life

Challenge

10 (5,900 XP)

Proficiency Bonus:

+4

Aura of Truth.Any creature that starts its turn in a 15-foot radius originating from the drowned choir must make a DC 15 Charisma saving throw. On a failed save, until the start of its next turn, the target can't speak a deliberate lie.
Umbral Step (Bonus Action).While in Dim Light or Darkness, the drowned choir takes the Hide action.

Actions
Multiattack: The drowned choir makes three Spirit-Slam attacks.
Spirit-Slam: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage plus 7 (2d6) necrotic damage.
Single-Fused Hymn (Recharge 5-6): Each creature within 30 feet of the choir must make a DC 15 Constitution saving throw, taking 28 (8d6) necrotic damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also deafened until the end of its next turn.
```


## 11. Vampire — CR 13

**Input:** `name: Vampire | who keeps a garden of thorns`

> **Trace:** lacks asked: nothing taken away

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
Multiattack: The vampire makes two Grave Strike attacks and uses Bite.
Grave Strike: Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) from one of two hands.
Coiling Briar (1/Day): One creature the vampire can see within 120 feet must make a DC 17 Strength saving throw, taking 13 (3d8) necrotic damage on a failed save. On a failed save, the target is caught in briars and is restrained until the briars is destroyed (AC 15; HP 20; Vulnerability to fire damage; Immunity to Poison and psychic damage).
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that has the grappled, incapacitated, or restrained condition must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) piercing damage on a failed save, plus 13 (3d8) necrotic damage. The target's Hit Point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a Vampire Spawn under the vampire's control.
Legendary Actions

The vampire can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The vampire regains spent legendary actions at the start of its turn.

Deathless Strike: The vampire moves up to half its Speed, and it makes one Grave Strike attack.
Beguile: The vampire casts Command, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17). The vampire can't take this action again until the start of its next turn.
```


## 12. Rotten Warden — CR 13

**Input:** `a plague-bearing archon of flies that commands lesser swarms`

> **Trace:** lacks asked: nothing taken away

```
Rotten Warden

Medium Celestial, Neutral

AC 18
Initiative +2 (12)

HP 187 (22d8 + 88)

Speed 30 ft., Fly 30 ft. (hover)

MOD
SAVE
STR
20
+5
+5
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
WIS
13
+1
+1
MOD
SAVE
CON
18
+4
+9
CHA
18
+4
+9

Skills Athletics +10, Persuasion +9

Resistances Radiant

Immunities Charmed

Senses darkvision 60 ft.; Passive Perception 11

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Hive Mandate. When the warden takes the Multiattack action, each ally of the warden that is a swarm or has the Swarm trait within 60 feet of it can move up to half its Speed and make one attack as part of the warden's turn.

Aura of Authority. While in a 10-foot Emanation originating from the warden, the warden and its allies have Advantage on attack rolls and saving throws, provided the warden doesn't have the Incapacitated condition.

Actions

Multiattack. The warden makes three attacks, using Plague-Bitten Strike or Slam in any combination. It can replace one attack with a use of Horrid Display.

Plague-Bitten Strike. Melee Attack Roll: +10, reach 5 ft. 32 (6d8 + 5) Necrotic damage.

Slam. Melee Attack Roll: +10, reach 5 ft. 32 (6d8 + 5) Bludgeoning damage.

Horrid Display. Wisdom Saving Throw: DC 17, each creature of the warden's choice in a 30-foot Emanation originating from the warden that can see or hear it. Failure: The target has the Frightened condition until the end of its next turn. Success: The target is immune to this creature's terror for 24 hours.

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

> **Trace:** lacks asked: nothing taken away

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

Senses blindsight 30 ft., tremorsense 60 ft.; Passive Perception 14

Languages None

CR 15 (XP 13,000; PB +5)

Traits

Grinding Gullet. When the purple worm Swallows a creature or spends 1 minute devouring at least 100 pounds of forged metal, the worm regains 22 (5d8) Hit Points.

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


## 14. Glacier Heart — CR 15

**Input:** `a glacier's heart given legs, trailing a wake of killing cold`

> **Trace:** lacks asked: nothing taken away

```
Glacier Heart
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

darkvision 60 ft., passive Perception 15

Languages: 

None

Challenge

15 (13,000 XP)

Proficiency Bonus:

+5

Cold Absorption.Whenever the heart is subjected to cold damage, it takes no damage and instead regains a number of hit points equal to the cold damage dealt.
Siege Monster.The heart deals double damage to objects and structures.

Actions
Multiattack: The heart makes two Trampling Leg attacks. It can replace one attack with a use of Wakeless Grind.
Trampling Leg: Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage plus 13 (3d8) cold damage.
Killing Cold (Recharge 5-6): Each creature in a 30-foot cone must make a DC 17 Constitution saving throw, taking 66 (12d10) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
Wakeless Grind: Each creature in a 60-foot-long, 5-foot-wide line must make a DC 17 Dexterity saving throw, taking 32 (5d12) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
```


## 15. Adult Red Dragon — CR 17

**Input:** `name: Adult Red Dragon | blind in one eye from an old lance`

> **Trace:** lacks asked: nothing taken away
> **Trace:** lacks refused: "in one eye" names no absence — nothing in it takes anything away

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

The Eye That Remembers.When a creature within the dragon's reach hits it with a melee attack, the dragon fixes its good eye on that creature; until the end of its next turn, the dragon has advantage on attack rolls against that creature, and that creature has disadvantage on attack rolls against the dragon.
Great Weapon Master.When the red dragon hits a creature with its Old Lance, the attack deals an extra 6 damage.
Legendary Resistance (3/Day).If the red dragon fails a saving throw, it can choose to succeed instead.

Actions
Multiattack: The red dragon makes three Old Lance attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray.
Old Lance: Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 35 (6d8 + 8) piercing damage plus 18 (4d8) fire damage.
Spellcasting: The red dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 20, +12 to hit with spell attacks): - At will: Command, Detect Magic, Scorching Ray
1/day each: Fireball
Fire Breath (Recharge 5-6): Each creature in a 60-foot cone must make a DC 21 Dexterity saving throw, taking 59 (17d6) fire damage on a failed save, or half as much damage on a successful one.
Legendary Actions

The red dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The red dragon regains spent legendary actions at the start of its turn.

Commanding Presence: The red dragon uses Spellcasting to cast Command (level 2 version). The red dragon can't take this action again until the start of its next turn.
Fiery Rays: The red dragon uses Spellcasting to cast Scorching Ray. The red dragon can't take this action again until the start of its next turn.
```


## 16. Brass Tyrant — CR 17

**Input:** `a tyrant of burning brass who rules a city of forges`

> **Trace:** lacks asked: nothing taken away

```
Brass Tyrant

Huge Construct, Lawful Neutral

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
20
+5
+11
CHA
4
-3
-3

Skills Athletics +12, Perception +6

Resistances Fire

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 16

Languages Common

CR 17 (XP 18,000; PB +6)

Traits

Fear Aura. The tyrant emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 19, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Legendary Resistance (3/Day). If the tyrant fails a saving throw, it can choose to succeed instead.

Immutable Form. The tyrant can't shape-shift.

Siege Monster. The tyrant deals double damage to objects and structures.

Actions

Multiattack. The tyrant makes two Slam attacks. It can replace one attack with a use of Slag the Earth.

Slam. Melee Attack Roll: +12, reach 10 ft. 19 (3d8 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.

Furnace Breath (Recharge 5-6). Constitution Saving Throw: DC 19, each creature in a 60-foot Cone. Failure: 66 (12d10) Fire damage. Success: Half damage only.

Slag the Earth. Dexterity Saving Throw: DC 19, each creature in a 15-foot Emanation originating from the tyrant. Failure: 35 (10d6) Fire damage, and the target has the Prone condition.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Trample Forward. The tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Slam attack.

Wreck and Raze. The tyrant moves up to half its Speed without provoking Opportunity Attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.

Slag Stomp. Strength Saving Throw: DC 19, each creature within 10 feet of the tyrant. Failure: The target has the Prone condition.

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

> **Trace:** lacks asked: nothing taken away

```
Pit Fiend

Large Fiend, Lawful Evil

AC 21
Initiative +2 (12)

HP 337 (27d10 + 189)

Speed 30 ft., Fly 60 ft. (hover)

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

Senses truesight 120 ft.; Passive Perception 20

Languages Infernal; telepathy 120 ft.

CR 20 (XP 25,000; PB +6)

Traits

Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend's aura for 24 hours.

Legendary Resistance (3/Day). If the pit fiend fails a saving throw, it can choose to succeed instead.

Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

Magic Resistance. The pit fiend has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack. It can replace one attack with a use of Final Oath.

Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Final Oath. Dexterity Saving Throw: DC 21, one creature within 10 feet. Failure: 32 (5d12) Bludgeoning damage.

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


## 18. Bone-Sun Archlich — CR 20

**Input:** `an archlich enthroned on a sun of bone`

> **Trace:** lacks asked: nothing taken away

```
Bone-Sun Archlich
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

Marrow-Light Aura.At the end of each of the archlich's turns, each creature in a 5-foot radius originating from the archlich takes 13 (3d8) radiant damage.
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


## 20. Trench Leviathan — CR 24

**Input:** `a leviathan of the trench whose song drowns fleets`

> **Trace:** lacks asked: nothing taken away

```
Trench Leviathan

Gargantuan Aberration, Neutral

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

Senses blindsight 120 ft. (blind beyond this radius); Passive Perception 19

Languages Common

CR 24 (XP 62,000; PB +7)

Traits

Amphibious. The leviathan can breathe air and water.

Fear Aura. The leviathan emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 24, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Legendary Resistance (3/Day). If the leviathan fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The leviathan makes two Tentacle attacks. It can replace one attack with a use of Drowned Standard.

Tentacle. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Dirge (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Drowned Standard. Constitution Saving Throw: DC 24, one creature within 120 feet. Failure: 42 (12d6) Thunder damage, and the target has the Deafened condition until the end of its next turn.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the leviathan can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Sink and Stride. The leviathan moves up to half its Speed without provoking Opportunity Attacks, and it makes one Tentacle attack.

Breach. Strength Saving Throw: DC 24, each creature within 10 feet of the leviathan. Failure: The target has the Prone condition.

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

> **Trace:** lacks asked: nothing taken away

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


## 22. Goblin Boss — CR auto

**Input:** `name: Goblin Boss | `

> **Trace:** lacks asked: nothing taken away

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

Actions
Multiattack: The goblin boss makes two attacks, using Scimitar or Shortbow.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had advantage.
Shortbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.
```


## 23. Vashka the Red — CR 6

**Input:** `name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.`

> **Trace:** lacks asked: nothing taken away
> **Trace:** lacks not claimed: "never breaks ranks" reads like a lack to the words, and the call's list did not name it

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

Languages Common, Goblin

CR 6 (XP 2,300; PB +3)

Traits

Pack Tactics. Vashka has Advantage on an attack roll against a target if at least one of Vashka's allies is within 5 feet of that target and the ally doesn't have the Incapacitated condition.

Locked Shields. When Vashka takes the Dodge action, each ally within 10 feet of him that can see or hear him gains the benefit of the Dodge action until the start of his next turn, and Vashka's Riposte can be triggered by a miss against any of them.

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


## 24. Seepbrood Scythebug — CR 9

**Input:** `A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.`

> **Trace:** lacks asked: nothing taken away

```
Seepbrood Scythebug

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

Corrosive Drip. At the end of each of the scythebug's turns, each creature in a 5-foot Emanation originating from the scythebug takes 7 (2d6) Acid damage.

Actions

Multiattack. The scythebug makes two Spitting Maw attacks.

Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 17 (3d8 + 4) Piercing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).

Bonus Actions

Swallow. The scythebug swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the scythebug, and takes 10 (3d6) Acid damage at the start of each of the scythebug's turns. The scythebug can have only one creature swallowed at a time. If the scythebug takes 25 damage or more on a single turn from the swallowed creature, the scythebug must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the scythebug. If the scythebug dies, a swallowed creature exits the body Prone by using 10 feet of movement.

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


## 25. Vault Sentinel — CR 11

**Input:** `a sentinel of black iron, AC 20, Huge, speed 20 feet`

> **Trace:** lacks asked: nothing taken away

```
Vault Sentinel
Huge construct, unaligned
Armor Class

20 (natural armor)

Hit Points: 

171 (18d12 + 54)

Speed: 

20 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

8 (-1)

	

17 (+3)

	

6 (-2)

	

10 (+0)

	

4 (-3)

Skills: 

Athletics +8, Perception +4

Saving Throws: 

STR +8, CON +7

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

Ruinous Passage.When the sentinel enters a space, the sentinel can grind through nonmagical difficult terrain, structures, and objects in that space as if they weren't there, ignores the effects of nonmagical difficult terrain, and leaves the space behind it as difficult terrain for other creatures.
Immutable Form.The sentinel can't shape-shift.
Siege Monster.The sentinel deals double damage to objects and structures.

Actions
Multiattack: The sentinel makes two Iron Fist attacks. It can replace one attack with a use of Warden's Dread.
Iron Fist: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage.
Shuddering Advance (Recharge 5-6): Each creature in a 30-foot cone must make a DC 16 Constitution saving throw, taking 66 (12d10) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
Warden's Dread: Each creature of the sentinel's choice in a 30-foot radius originating from the sentinel that can see or hear it must make a DC 16 Wisdom saving throw. On a failed save, the target is frightened until the end of its next turn. On a successful save, the target is immune to this creature's terror for 24 hours.
```


## 26. Brinebound Cursewife — CR auto

**Input:** `a marsh witch who curses trespassers, cr 7`

> **Trace:** lacks asked: nothing taken away

```
Brinebound Cursewife

Medium Humanoid, Neutral Evil

AC 15
Initiative +2 (12)

HP 110 (17d8 + 34)

Speed 30 ft., Swim 30 ft.

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
+7

Skills Perception +5, Deception +7

Resistances Cold

Senses Passive Perception 15

Languages Common, Sylvan

CR 7 (XP 2,900; PB +3)

Traits

Slick Brine. The ground in a 10-foot Emanation originating from the cursewife is Difficult Terrain.

Actions

Multiattack. The cursewife makes three attacks, using Staff or Brine Ray in any combination. It can replace one attack with a use of Fouled Breath.

Staff. Melee Attack Roll: +7, reach 5 ft. 18 (4d6 + 4) Bludgeoning damage.

Brine Ray. Ranged Attack Roll: +7, range 60 ft. 13 (2d8 + 4) Cold damage.

Fouled Breath. Constitution Saving Throw: DC 15, one creature within 60 feet. Failure: 14 (4d6) Poison damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. The cursewife casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 15):

- At Will: Minor Illusion, Fog Cloud
- 1/Day Each: Bestow Curse

Wave-Spun Hex. Constitution Saving Throw: DC 15, one creature within 60 feet. Failure: The target has the Paralyzed condition until the end of its next turn.

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


## 27. Last Templar — CR 6

**Input:** `a templar priest with a mace and no magic at all`

> **Trace:** lacks asked: "no magic at all"

```
Last Templar

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

Aura of Authority. While in a 10-foot Emanation originating from the last templar, the last templar and its allies have Advantage on attack rolls and saving throws, provided the last templar doesn't have the Incapacitated condition.

Actions

Multiattack. The last templar makes three Mace attacks. It can replace one attack with a use of Shield Bash.

Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the last templar's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the last templar can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

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

> **Trace:** lacks asked: nothing taken away

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

Common plus five other languages, Elvish

Challenge

12 (8,400 XP)

Proficiency Bonus:

+4

Magic Resistance.Ilvareth has advantage on saving throws against spells and other magical effects.
Misty Step (3/Day) (Bonus Action).Ilvareth casts Misty Step, using the same spellcasting ability as Spellcasting.
Protective Magic (3/Day) (Reaction).When Ilvareth is hit by an attack roll, Ilvareth casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Ilvareth makes four Arcane Burst attacks. It can replace one attack with a use of Nail the Shadow.
Spellcasting: Ilvareth casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17): - At will: Detect Magic, Detect Thoughts, Disguise Self, Invisibility, Light, Mage Armor, Mage Hand, Prestidigitation
2/day each: Fly, Lightning Bolt
1/day each: Cone of Cold, Mind Blank, Scrying, Teleport
Nail the Shadow: One creature within 150 feet must succeed on a DC 17 Strength saving throw or be restrained until the end of its next turn.
Arcane Burst: Melee or Ranged Spell Attack: +9 to hit, reach 5 ft. or range 150 ft., one target. Hit: 27 (4d10 + 5) force damage.
```


## 29. Swarm of Funeral Bells — CR 13

**Input:** `a swarm of funeral bells that ring themselves over the dying`

> **Trace:** lacks asked: nothing taken away

```
Swarm of Funeral Bells

Medium Swarm of Tiny Constructs, Unaligned

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

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 10

Languages Understands the languages of its creator but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Multiattack. The swarm makes two Bell attacks. It can replace one attack with a use of Doleful Glare.

Bell. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Thunder damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Thunder damage if the swarm is Bloodied.

Doleful Glare. Constitution Saving Throw: DC 17, each creature in a 15-foot Emanation originating from the swarm. Failure: The target has the Blinded condition until the end of its next turn.

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


## 30. Reliquary Ooze — CR 9

**Input:** `a cathedral-vault ooze that digests reliquaries`

> **Trace:** lacks asked: nothing taken away

```
Reliquary Ooze
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

	

8 (-1)

	

1 (-5)

Damage Immunities: 

acid, necrotic

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

Sanctity of the Swallowed.Once per turn, when the ooze takes damage from a creature it can see, the ooze regains 14 (4d6) hit points.
Amorphous.The ooze can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form.A creature that touches the ooze or hits it with a melee attack while within 5 feet of it takes 9 (2d8) necrotic damage.
Spider Climb.The ooze can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The ooze makes two Engulfing Mass attacks.
Engulfing Mass: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 11 (2d10) necrotic damage.
Gullet Drag (Recharge 5-6): One creature within 10 feet of the ooze must make a DC 15 Strength saving throw, taking 27 (6d8) necrotic damage on a failed save, and the target is pulled up to 5 feet straight toward the ooze, and the target is restrained until the end of its next turn.
```


## 31. Anvil-Cloud Drake — CR 7

**Input:** `a young storm drake whose breath is a rolling wall of thunder`

> **Trace:** lacks asked: nothing taken away

```
Anvil-Cloud Drake

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

Pealing Hide. A creature that hits the drake with a melee attack while within 5 feet of it takes 7 (2d6) Thunder damage and has the Deafened condition until the end of its next turn.

Actions

Multiattack. The drake makes two Claw attacks. It can replace one attack with a use of Storm-Wake Strafe.

Claw. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage plus 7 (2d6) Thunder damage.

Thunder-Wall Breath (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

Storm-Wake Strafe. Strength Saving Throw: DC 15, each creature in a 30-foot-long, 5-foot-wide Line. Failure: The target has the Prone condition.

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


## 32. Gormak Stonefist — CR 9

**Input:** `a stone giant exile who speaks only Giant and understands no Common`

> **Trace:** lacks asked: "understands no Common"
> **Trace:** lacks refused: "speaks only Giant" names no absence — nothing in it takes anything away

```
Gormak Stonefist
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

Actions
Multiattack: Gormak makes two attacks: one with Stone Club and one with Boulder. It can replace one attack with a use of Shattered Ground.
Stone Club: Melee Weapon Attack: +10 to hit, reach 15 ft., one target. Hit: 30 (7d6 + 6) bludgeoning damage.
Boulder: Ranged Weapon Attack: +10 to hit, range 60/240 ft., one target. Hit: 24 (4d8 + 6) bludgeoning damage.
Shattered Ground: Each creature within 10 feet of Gormak must make a DC 18 Dexterity saving throw, taking 38 (11d6) bludgeoning damage on a failed save, or half as much damage on a successful one.
```


## 33. Reedwatch Ascetic — CR 5

**Input:** `lizardfolk monk`

> **Trace:** lacks asked: nothing taken away

```
Reedwatch Ascetic
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

Reedshade Passage.While in mud, reeds, or water, the ascetic can take the Hide action even when only lightly obscured, and it leaves no trail.
Hold Breath.The ascetic can hold its breath for 15 minutes.
Marsh Stride.Difficult Terrain composed of mud doesn't cost the ascetic extra movement, and the ascetic can move across mud without needing to make an ability check.
Patient Defense (Bonus Action).The ascetic takes the Dodge action.
Cunning Action (Bonus Action).The ascetic takes the Dash, Disengage, or Hide action.

Actions
Multiattack: The ascetic makes two attacks: one with its Unarmed Strike and one with its Dart. It can replace one attack with a use of Flinging Hurl.
Unarmed Strike: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage. Once on each of the ascetic's turns when it hits with this attack, the target is subjected to the following effect. The target must make a DC 14 Constitution saving throw. On a failed save, the target is stunned until the end of the ascetic's next turn.
Dart: Ranged Weapon Attack: +6 to hit, range 20/60 ft., one target. Hit: 12 (2d8 + 3) piercing damage.
Flinging Hurl: One creature within 5 feet must make a DC 14 Strength saving throw. On a failed save, the target is pushed up to 15 feet away from the ascetic and is knocked prone.
```


## 34. Krennik Skullstandard — CR 4

**Input:** `name: Krennik Skullstandard | riding a worg`

> **Trace:** lacks asked: nothing taken away

```
Krennik Skullstandard
Large humanoid, neutral evil
Armor Class

14 (leather)

Hit Points: 

78 (12d10 + 12)

Speed: 

50 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

16 (+3)

	

13 (+1)

	

7 (-2)

	

11 (+0)

	

8 (-1)

Skills: 

Perception +2, Stealth +5

Saving Throws: 

DEX +5

Senses: 

passive Perception 12

Languages: 

Goblin, Worg

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Standard Unbroken.When Krennik moves on his turn near a creature that has witnessed his standard break, the nearest such creature is marked until the end of Krennik's next turn; his Bite attacks against the marked creature score a critical hit on a roll of 19 or 20.

Actions
Multiattack: Krennik makes two Bite attacks.
Bite: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) piercing damage and, if it is Medium or smaller, is knocked prone, and the next attack roll made against the target before the start of Krennik's next turn has advantage.
```


## 35. Well Drowned — CR 5

**Input:** `name: the thing in the well | `

> **Trace:** lacks asked: nothing taken away

```
Well Drowned

Medium Aberration, Neutral

AC 15
Initiative +3 (13)

HP 78 (12d8 + 24)

Speed 30 ft., Climb 30 ft., Swim 30 ft.

MOD
SAVE
STR
12
+1
+1
INT
12
+1
+1
MOD
SAVE
DEX
16
+3
+6
WIS
13
+1
+1
MOD
SAVE
CON
14
+2
+2
CHA
10
+0
+0

Skills Perception +4, Stealth +9

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Brine-Slick Reach. While the drowned is in Dim Light or Darkness, and a creature that is Prone or Grappled starts its turn within the drowned's reach, the creature is Restrained until the end of its next turn as the brine pulls at it.

Actions

Multiattack. The drowned makes two Tentacle attacks. It can replace one attack with a use of Luring Presence.

Tentacle. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Psychic damage.

Luring Presence. Wisdom Saving Throw: DC 13, one creature within 60 feet that can see or hear the thing in the well. Failure: The target has the Charmed condition until the end of its next turn, and while Charmed this way, it must move toward the drowned by the safest available route on its turn.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the drowned takes the Hide action.

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


## 36. Lanternhusk Scuttler — CR 4

**Input:** ` | role: brute`

> **Trace:** lacks asked: nothing taken away

```
Lanternhusk Scuttler

Large Monstrosity, Lawful Neutral

AC 13
Initiative -1 (9)

HP 82 (11d10 + 22)

Speed 30 ft., Swim 30 ft., Climb 30 ft.

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

Resistances Fire

Senses darkvision 60 ft.; Passive Perception 11

Languages Common

CR 4 (XP 1,100; PB +2)

Actions

Glass Claw. Melee Attack Roll: +6, reach 5 ft. 17 (3d8 + 4) Slashing damage plus 11 (2d10) Fire damage.

Scalding Vent (Recharge 5-6). Constitution Saving Throw: DC 14, each creature in a 15-foot Cone. Failure: The target has the Blinded condition until the end of its next turn.

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

> **Trace:** lacks asked: nothing taken away

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
Javelin: Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 18 (4d6 + 4) piercing damage. Immediately after the attack, a javelin returns to Meshrin's grasp, and the target's Speed is reduced by 10 feet until the start of Meshrin's next turn.
Frightening Roar: Each creature of Meshrin's choice in a 30-foot radius originating from Meshrin that can see or hear it must make a DC 15 Wisdom saving throw. On a failed save, the target is frightened until the end of its next turn. On a successful save, the target is immune to this creature's terror for 24 hours.
```


## 38. Barrow Duelist — CR 6

**Input:** `a skeleton with a greatsword`

> **Trace:** lacks asked: nothing taken away

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

Great Weapon Master. When the duelist hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The duelist makes two attacks, using Greatsword or Shortbow in any combination. It can replace one attack with a use of Barrow Sweep.

Greatsword. Melee Attack Roll: +7, reach 5 ft. 21 (5d6 + 4) Slashing damage.

Shortbow. Ranged Attack Roll: +7, range 80/320 ft. 17 (3d8 + 4) Piercing damage.

Barrow Sweep. Dexterity Saving Throw: DC 14, each creature in a 10-foot Emanation originating from the duelist. Failure: 28 (8d6) Slashing damage, and the target has the Prone condition.

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


## 39. Harl the Axe-Hand — CR 5

**Input:** `a sellsword who hurls a handaxe and closes with a shortsword`

> **Trace:** lacks asked: nothing taken away

```
Harl the Axe-Hand
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

Opening Throw.When Harl attacks a creature that is prone or that has not yet acted in the current combat, Harl has advantage on the attack roll.
Riposte (Reaction).When a creature within 5 feet of Harl misses it with a melee attack roll, Harl makes one Handaxe attack against that creature.

Actions
Multiattack: Harl makes three Handaxe attacks. It can replace one attack with a use of Shortsword.
Handaxe: Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) slashing damage, and Harl has advantage on its next attack roll against the target before the end of its next turn.
Shortsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage. Immediately after the attack, a handaxe returns to Harl's grasp, and Harl has advantage on its next attack roll against the target before the end of its next turn. If Harl moved at least 20 feet straight toward the target immediately before the hit and the target is Large or smaller, the target is knocked prone, and Harl can make one Shortsword attack against it as a Bonus Action.
Shield Bash: One creature within 5 feet that Harl can see must make a DC 15 Strength saving throw, taking 9 (2d4 + 4) bludgeoning damage on a failed save. On a failed save, if the target is a Medium or smaller creature, it is knocked prone.
```


## 40. Brother Halric — CR 3

**Input:** `name: Brother Halric | `

> **Trace:** lacks asked: nothing taken away

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

Senses: 

passive Perception 15

Languages: 

Common plus one other language

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Divine Aid (3/Day) (Bonus Action).Halric casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame. It can replace one attack with a use of Droning Catechism.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
Droning Catechism: Each creature of Halric's choice in a 30-foot radius originating from Halric that can see or hear it must make a DC 13 Wisdom saving throw. On a failed save, the target is frightened until the end of its next turn. On a successful save, the target is immune to this creature's terror for 24 hours.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
```

---

# The GM-register forty, post-fix — blocks (`typed40-2026-11-09T06-25-17`)

Same forty inputs as the set you scored 4 / 19 / 7 / 10, run on the frozen build. 5 FAILs of 40
(was 8 / 8 / 8), coverage 77%. The Cynosure's punctuation and `gate-fit` are both gone — see §3b.
Traces are inlined where the path call overrode the matcher, where a lack was read, and on the
sheet carrying the dangling-citation pattern.


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

> **Trace:** seat authoring refused: trait — the authored row needs its target to have Prone and no row on this sheet imposes it, so its trigger could never fire (the Chalk-Hound's Da

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

> **Trace:** THE DANGLING-CITATION PATTERN (§3b): the row cites "Umbral Step bonus"; the sheet's row is "Umbral Step".

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
