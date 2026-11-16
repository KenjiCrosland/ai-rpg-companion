# Blocks — what the audit and repair do to a finished sheet

Branch `statblock-enhancments-part-2`, on top of `d1115e3`. An experiment. **No product code
changed**, nothing ships from it, and it fixes nothing.

**All 114 sheets this round generated are here, marked as they are: none threw and none timed out.**
Three arms that generate, 38 sheets each. The Today arm is the taped forty and is not repeated.

`BLOCKS-harness-2026-11-16.md` is the branch's opening forty and stays, as do the three files that
record what shipped. `BLOCKS-harness2-2026-11-16.md` is superseded by this file and goes in its own
commit.

```
node scripts/smoke-statblock.mjs --replay <tape> --arm none            # 38, no model calls
node scripts/smoke-statblock.mjs --replay <tape> --arm high            # 38, no model calls
node scripts/smoke-statblock.mjs --replay <tape> --arm no-look-again   # 38, live from the audit
node scripts/analyse-arms.mjs <tape> <arm-dir>...                      # the two tables below
npx jest src/tools/statblock-generator src/util --maxWorkers=2 --silent  # 231 suites, 5399 passed, 26 skipped
npx jest --maxWorkers=2 --silent                                        # whole repo: 314 suites, 7465 passed
npm run build                                                           # built in 6.30s
```

## First, a correction to the last round

**Stopping the enrichment call showed that one of the three "not replayable" sheets never was.**

```
REPLAY: 38 of 38 reproduced EXACTLY, 2 skipped (not replayable)     twice
```

Sheet 21, the Owlbear, reproduces exactly. Two things I had wrong in the tape I committed:

- **Enrichment cannot mutate the saved sheet.** It writes to its own localStorage key,
  `creature-intelligence`, never to `monsters`. My skip reason said the opposite.
- **It was never a determinism problem.** It was noise *from the call being attempted*: its prompt
  embeds the finished sheet, so the moment a sheet changed it missed the tape, and the miss's
  knock-on effects were what made the sheet differ.

The Owlbear's skip is removed. Two sheets remain genuinely not replayable, both the product's own
dice: **22** (the CR the user did not set is rolled locally and lands in the route prompt) and
**36** (a blank form rolls its whole creature).

**And it was the whole cost of an arm.** The harness waited up to 20 seconds per sheet for an
enrichment write that, in an experiment, was never coming — twelve wasted minutes an arm. A replay
now answers the enrichment request instantly and offline and does not wait for it: **22s a sheet
became 2s.** Recording still runs it normally, so a real run is unaffected.

## The counts, per arm, across the 38

| arm | findings | high | med | low | on a model row | not | unclassified | audits with findings | repair calls | engine rounds | rows changed | removed | added | damage moved | scan hits |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **none** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 of 38 | 4 | 5 | 0 | 0 | 0 | 0 | 0 |
| **today** | 95 | 30 | 45 | 20 | 44 | 31 | 20 | 36 of 38 | 29 | — (no trace) | 10 | 4 | 4 | 5 | 0 |
| **high** | 30 | 30 | 0 | 0 | 12 | 10 | 8 | 24 of 38 | 10 | 5 | 4 | 2 | 2 | 0 | 0 |
| **no-look-again** | 79 | 27 | 39 | 13 | 31 | 24 | 24 | 33 of 38 | 21 | 5 | 8 | 6 | 6 | 1 | 0 |

Rows changed, removed, added and damage moved are measured **against the None arm's sheet**, so the
None row is zero by definition. No row was renamed in any arm.

Three things in the table are worth reading carefully.

- **"Repair calls" and "engine rounds" are different things, and the None arm proves it.** With no
  findings at all it still makes **4 repair calls and 5 engine rounds** — those come from the
  engine's own defect pass ("name *Nettle Claw* is a natural weapon on a Humanoid whose concept
  gives it none"), not from the audit. Counting trace lines alone would have conflated the two.
  Today's engine-round cell is empty because the tape carries no trace, not because it is zero.
- **"Unclassified" is honest, not missing.** A sheet carries no provenance — the flags live in the
  engine during generation — so a finding is counted as being on a model-written row only when the
  trace's own authoring lines name that row. 20 of Today's 95 could not be classified either way.
- **The widened scan found nothing on any arm's sheets**, with `DC of DC` and doubled words added
  to it. That is not the scan failing; see below.

## The garble: where it actually is, and what writes it

`DC of DC` appears in **1 of the 45 re-roll recordings, not 4** — twice within that one file, in
the Bog Hound's *Mud-Caked Hide* and its 2014 rendering. It appears in **zero model answers**.

What the recording shows is a collision, not a model writing nonsense. The **free-row-fix** call
returned the row with the engine's own token in it:

> …succeeding on a Wisdom (Perception) check against a DC of **{dc}**; …

and the engine then filled `{dc}` with **`DC 13`**, giving "against a DC of DC 13". The repair wrote
`a DC of {dc}`; the substitution inserted a value that already carries the letters. Neither half is
wrong alone.

So the arms' sheets are clean of it because it needs a **live** repair to appear, and two of the
three arms make no repair call live at all.

## The changed rows

Thirty-one rows differ from the None arm across the 38 sheets. The full table — the sheet, the row,
its text in None, its text in each other arm, and the finding that caused the change — is in
`ARMS-changed-rows-2026-11-16.txt` beside this file, because the row text is long and the point is
to read it whole.

## What I would conclude — kept apart from the counts

The counts are above and stand on their own. This is my reading, and nothing here is a
recommendation to ship.

**The audit is not idle, and it is not obviously wrong.** On 36 of 38 sheets it finds something,
2.5 findings a sheet, and 30 of 95 are marked high. Removing the "look again" sentence moved that
to 33 of 38 and 79 findings — **a 17% reduction, not a collapse.** If the sentence were the whole
reason the audit always finds something, dropping it should have emptied far more audits than it
did. On this evidence the sentence is a contributor, not the cause.

**The rule that acts on every finding is the bigger lever.** Holding the audit's own roll still and
keeping only its high-confidence findings cut repair calls from 29 to 10 and rows changed from 10 to
4 — a two-thirds reduction in what the step does to a finished sheet, with the audit unchanged.

**The step is not free, and five rows gained or lost damage after the sheet was priced.** Today
moves damage on 5 rows against None; High only moves none at all. I would want to know whether any
of those five was re-checked against the budget before I called the step safe.

**What I cannot tell you from this round:** whether the changes are improvements. That is the
owner's read of the changed-row table, which is why the full text is beside this file rather than
summarised here.


# Arm "none" — 38 sheets

the audit's findings emptied — the sheet as the engine built it, before the audit and repair touched it. **0 threw, 0 timed out.**

`smoke-out/arm-none-2026-11-16T21-43-07`

---

## 01. Dire Wolf — CR 1

**Input:** `name: Dire Wolf | with a frost-rimed hide`
**Donor:** skirmisher-1 -> CR 1
**Signature:** library · **elapsed** 2s

**Type line:** `Large Beast, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher: ✓ ("Dire Wolf") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause and the call did not claim one, so "fire" is a guess from what the creature is, not the GM's ask
[concept] resolve: archetype=skirmisher type=Beast typeFrom=the route call themes=bestial mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> A frost-rimed dire wolf opens with a bounding rush from the flank, its packmates fanning wide before it darts in to tear at a hamstring and wheels back out of reach, rime flaking from its hide in its wake. It circles and re-commits every round, never standing and trading, and its cold breath and crusted coat make each close pass cost the prey a little more speed than the last. Pressed and bloodied, it does not break — it falls back toward the pack, letting the boldest of its kin soak the attention while it lines up the next run.

**`[concept] lore:`**, uncut

> Frost-rimed dire wolves den in the blue shadow of glaciers, and a pack that has fed on nothing but frozen carrion for a winter grows a hide of living rime that it uses to run down anything warm enough to be worth the chase.

**Every attack row**
```
Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.
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

Crusted Wake. A creature starts its turn within 5 feet of the wolf, rime crusts the ground around that creature, reducing its Speed by 10 feet until the end of its turn.

Pack Tactics. The wolf has Advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

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
**Signature:** library · **elapsed** 2s

**Type line:** `Medium beast, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a mud-caked bog hound that drags fishermen under" (call)
[route] brute-grappler type=Beast mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape: grip on the GM's own words "drags fishermen under" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("drags fishermen under") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Beast typeFrom=the route call themes=grasping/aquatic mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 1
[reskin] mind tier: CHA 4 -> 10 — the call read this creature as ordinary at CR 1
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> The bog hound waits half-submerged at the water's edge, mud-caked hide indistinguishable from the bank, then lunges to seize a fisherman's leg in its jaws and drags him thrashing into the silt. Every round after, it does not let go — it plants its heavy body, hauls backward toward deeper water, and holds prey under until it stops fighting. It is a pure ambush predator that will not abandon a grabbed kill; wounded, it tightens its grip and sinks rather than flee.

**`[concept] lore:`**, uncut

> Born in the choked shallows where drowned fishermen are buried in silt, a bog hound is a hunger that learned to wear the riverbank as a coat, and it wants only to add another body to the mud.

**Every attack row**
```
(no attack row)
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

Mud-Caked Hide.While the bog hound remains motionless, it is indistinguishable from the mud or riverbank it lies in.

Actions
Multiattack: The bog hound makes two Bite attacks. It can replace one attack with a use of Drag Prone.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While Grappled, the target is restrained.
Drag Prone: Each creature in a 15-foot cone must make a DC 13 Strength saving throw. On a failed save, the target is pushed up to 15 feet away from the bog hound and is knocked prone.
```

---

## 03. Owlbear — CR 3

**Input:** `name: Owlbear | that has learned to climb`
**Donor:** skirmisher-3 -> CR 3
**Signature:** library · **elapsed** 1s

**Type line:** `Large monstrosity, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: Owlbear — that has learned to climb
[path] twist — Owlbear (is) — "Name field: Owlbear" (code)
[route] skirmisher type=Monstrosity mechanics=none — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but offered no quote | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher: ✓ ("that has learned to climb") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Monstrosity typeFrom=the route call themes=bestial/aerial mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> An owlbear that has learned to climb opens from above, dropping off a trunk or ledge onto prey with crushing weight before raking and withdrawing up the nearest vertical surface. Every round it circles at height, feints a drop to scatter the group, then commits when one target is isolated and bleeding. Under pressure it does not flee — it climbs out of reach, waits, and descends again, patient and vindictive.

**`[concept] lore:`**, uncut

> Hatched in a forest of tall pines and stone bluffs, this owlbear learned that the canopy is a hunting ground and now claims the vertical wilderness as its own, taking prey that forgets to look up.

**Every attack row**
```
(no attack row)
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
Multiattack: The owlbear makes two Rend attacks. It can replace one attack with a use of Learned to Climb.
Rend: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.
Learned to Climb: The owlbear spends 5 feet of movement to jump to a space within 15 feet that contains one or more Large or smaller creatures. Each creature in the destination space must make a DC 15 Dexterity saving throw, taking 11 (2d10) slashing damage on a failed save, or half as much damage on a successful one. On a failed save, the target is knocked prone.
```

---

## 04. Chapel Bell-Ringer — CR 3

**Input:** `a chapel bell-ringer's ghost that tolls for the dying`
**Donor:** lurker-2 -> CR 3
**Signature:** library · **elapsed** 2s

**Type line:** `Medium Undead, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Ghost (is) — "ghost" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-phantom: ✓ ("a chapel bell-ringer's ghost") | lurker-phantom: key "ghost" (class body)
[concept] resolve: archetype=lurker type=Undead typeFrom=the route call themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> The bell-ringer's ghost opens by tolling its spectral bell, marking the living as dying and draining vitality from those who hear it. Every round after, it drifts through walls to stay at the edge of light, swinging its heavy bell-clapper on a chain to strike and stun those who try to flee its knell. It fights to the death with the grim patience of one who has already died once, never fleeing but fading into shadows only to return when the light fails.

**`[concept] lore:`**, uncut

> Killed when the chapel bell crushed him during a storm, the ringer's spirit now tolls for anyone whose time it believes has come, dragging them toward the grave by ringing their death even before they fall.

**Every attack row**
```
Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.
```

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

Ethereal Sight. The chapel bell-ringer can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The chapel bell-ringer can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The chapel bell-ringer makes two Withering Touch attacks. It can replace one attack with a use of Grave Knell.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Grave Knell. Constitution Saving Throw: DC 13, one creature within 30 feet. Failure: 7 (2d6) Necrotic damage, and the chapel bell-ringer regains Hit Points equal to half the damage dealt.

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

---

## 05. Air Elemental — CR 5

**Input:** `name: Air Elemental | that carries stolen voices`
**Donor:** brute-5 -> CR 5
**Signature:** library · **elapsed** 1s

**Type line:** `Large Elemental, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Air Elemental (is) — "Name field: Air Elemental" (code)
[route] brute-juggernaut type=Elemental mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("Air Elemental") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental typeFrom=the route call themes=elemental/voice mind=sapient style=juggernaut energy=Thunder mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> The Air Elemental opens by swelling into a howling vortex and loosing a chorus of stolen voices—screams, pleas, and taunts torn from past victims—so the battlefield is drowned in sound before it ever strikes. Every round after, it lashes with compressed air that carries those same voices as a psychic shriek, hammering bodies and nerves at once while it drifts and reforms around blows. Under pressure it does not retreat—it remembers every voice it took and grows more savage, throwing the loudest of them at the prey that hurt it, fighting to the last because a voice lost is a self diminished.

**`[concept] lore:`**, uncut

> An air elemental that drifted through a massacre and swallowed every dying sound, it now hunts the living to fill its hollow chorus with one more voice—and will not rest until every scream in its keeping has been answered.

**Every attack row**
```
Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.
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

Echo of the Stolen Chorus. Whenever it is struck by a creature, the wound releases the loudest stolen voice it holds as a shrieking echo, and until the end of the elemental's next turn, any creature that dealt it damage has Disadvantage on its next attack roll as the scream claws at its nerves. The voice is spent and lost from the chorus.

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

---

## 06. Scree Pit — CR 5

**Input:** `a quarry-pit thing of living scree that buries what it catches`
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 2s

**Type line:** `Large elemental, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a quarry-pit thing of living scree that buries what it catches" (call)
[route] brute-grappler type=Elemental mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape: contain on the GM's own words "burles what it catches" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("buries what it catches") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental typeFrom=the route call themes=elemental/subterranean mind=mindless style=grappler energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as mindless, and the card's 4 is already that dim
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> A pit of living scree that hauls itself up out of abandoned quarry floors, opening with a grinding lunge to seize a victim in its gravel limbs and drag them down into the loose stone at its base; every round after, it constricts and endlessly pours scree over the caught, piling weight until the prey is buried. It is a patient, mindless grave that never retreats — only stone left after quarrymen moved on, wanting nothing but more rubble to swallow.

**`[concept] lore:`**, uncut

> Born when the spilled spoil of a worked-out quarry grew long enough to remember every stone that fell into it, the scree-pit haunts the pit's own floor, endlessly dragging new rubble — and new bodies — into its hoard of buried things.

**Every attack row**
```
(no attack row)
```

```
Scree Pit
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

Entomb (Bonus Action).The scree pit entombs one Medium or smaller creature it is grappling. While entombed, the target is blinded and restrained, has Total Cover against attacks and other effects outside the scree pit, and takes 7 (2d6) bludgeoning damage at the start of each of the scree pit's turns. The scree pit can have only one creature entombed at a time. If the scree pit takes 15 damage or more in a single turn from the entombed creature, the scree pit must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the scree pit. If the scree pit dies, an entombed creature breaks free prone by using 5 feet of movement.

Actions
Multiattack: The scree pit makes two Scree attacks. It can replace one attack with a use of Stone Flood.
Scree: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained.
Stone Flood: Each creature in a 30-foot cone must make a DC 14 Strength saving throw. On a failed save, the target is pulled up to 10 feet straight toward the scree pit, and the target is knocked prone.
```

---

## 07. Hydra — CR 8

**Input:** `name: Hydra | whose stumps smoke instead of regrowing`
**Donor:** brute-5 -> CR 8
**Signature:** library · **elapsed** 2s

**Type line:** `Huge monstrosity, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Hydra (is) — "Name field: Hydra" (code)
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-regenerator: ✓ ("stumps smoke instead of regrowing") | brute-regenerator: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause and the call did not claim one, so "fire" is a guess from what the creature is, not the GM's ask
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=venomous/terror mind=bestial style=regenerator energy=Poison mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> A hydra whose cauterized stumps vent scalding caustic smoke rather than regrowing heads — each severed neck becomes a smoking wound that keeps closing and splitting around the blade. It wades in low and wide, sweeping its remaining heads in a many-angled rush and letting attackers choke on the plumes it trails, absorbing punishment as its flesh stitches shut. It is a hateful, patient hunter that does not tire or flee; it only fights harder as it is cut, because every wound is another furnace lit.

**`[concept] lore:`**, uncut

> Sparked in a marsh where brimstone seeps through drowned peat, this hydra's blood turned to caustic vapor, and it now broods in the reeds waiting to bathe intruders in its own burning breath.

**Every attack row**
```
(no attack row)
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

Hold Breath.The hydra can hold its breath for 1 hour.
Multiple Heads.The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead.
Reactive Heads.For each head the hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks.

Actions
Multiattack: The hydra makes as many Bite attacks as it has heads.
Bite: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.
Caustic Vapor (Recharge 5-6): Each creature in a 30-foot cone must make a DC 16 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one. On a failed save, the target is blinded until the end of its next turn.
```

---

## 08. Orchard Ram-Golem — CR 8

**Input:** `a siege-engine golem of lashed timber that shoulders through walls`
**Donor:** brute-5-juggernaut -> CR 8
**Signature:** library · **elapsed** 2s

**Type line:** `Large Construct, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a siege-engine golem of lashed timber that shoulders through walls" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("siege-engine golem of lashed timber") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=forged/terror mind=mindless style=juggernaut energy=Thunder mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 6 against "feeble" — the call read this creature as mindless, and the card's 6 is already that dim
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> A lashed-timber siege golem that opens by shouldering straight through the nearest wall, showering splinters and stone on whoever sheltered behind it, then pivots to pound the defenders it just exposed. Every round it advances along the shortest line to the biggest obstruction, splintering doors, barricades, and load-bearing walls and swinging its battering bulk at anything that gets in the way. It has no fear and no retreat — a mindless engine that only stops when its timber is broken apart.

**`[concept] lore:`**, uncut

> Built by a besieging army from felled orchards and iron banding, the ram-golem was left behind half-animated when the siege lifted, and it still walks the ruined walls trying to reach a gate that is no longer there.

**Every attack row**
```
Timber Ram. Melee Attack Roll: +8, reach 5 ft. 14 (2d8 + 5) Bludgeoning damage plus 11 (2d10) Thunder damage.
```

```
Orchard Ram-Golem

Large Construct, Unaligned

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

Immunities Poison, Thunder; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Understands the languages of its creator but can't speak

CR 8 (XP 3,900; PB +3)

Traits

Thunder Absorption. Whenever the ram-golem is subjected to Thunder damage, it takes no damage and instead regains a number of Hit Points equal to the Thunder damage dealt.

Immutable Form. The ram-golem can't shape-shift.

Magic Resistance. The ram-golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The ram-golem makes two Timber Ram attacks.

Timber Ram. Melee Attack Roll: +8, reach 5 ft. 14 (2d8 + 5) Bludgeoning damage plus 11 (2d10) Thunder damage.

Trample (Recharge 5-6). The ram-golem moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Dexterity Saving Throw: DC 16. Failure: 27 (6d8) Thunder damage, and the target has the Prone condition. Success: Half damage only.

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
**Signature:** dropped · **elapsed** 1s

**Type line:** `Large Construct, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Stone Golem (is) — "Name field: Stone Golem" (code)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("carved as a weeping saint") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=grave/forged mind=sapient style=juggernaut energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> The Weeping Saint opens by walking in a straight line through whatever the party hides behind, stone fists swinging with the slow, terrible certainty of a falling cathedral, while tears of wet mortar streak its carved cheeks. Every round it advances on the most faithful-looking target first — the one kneeling, praying, or holding a holy symbol — and beats the ground into rubble around it, never breaking stride. It does not flee and it does not gloat; it endures, patient as stone, until every supplicant is still.

**`[concept] lore:`**, uncut

> A cathedral mason carved a saint to weep for the sins of a dying town, and when the town began to worship the statue's tears instead of its god, the stone answered the prayer wrongly and rose to make mourning permanent.

**Every attack row**
```
Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.
Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.
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

Weeping Saint. While the stone golem remains motionless, it is indistinguishable from a carved weeping saint.

Immutable Form. The stone golem can't shape-shift.

Magic Resistance. The stone golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The stone golem makes two attacks, using Slam or Force Bolt in any combination.

Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.

Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.

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

---

## 10. Drowned Choir — CR 10

**Input:** `a drowned cathedral choir that sings in one voice`
**Donor:** lurker-8 -> CR 10
**Signature:** library · **elapsed** 2s

**Type line:** `Medium undead, neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a drowned cathedral choir that sings in one voice" (call)
[route] lurker type=Undead mechanics=aura — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-phantom: a Huge body is not incorporeal — print's incorporeals are Medium and smaller | swarm: a swarm is a mass of many — the call reads one creature, not a mass | fell to lurker's plain line | lurker: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause and the call did not claim one, so "radiant" is a guess from what the creature is, not the GM's ask
[concept] resolve: archetype=lurker type=Undead typeFrom=the route call themes=grave/aquatic mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[reskin] mind tier: INT 13 -> 15 — the call read this creature as capable at CR 10
[reskin] mind tier: WIS 14 -> 20 — the call read this creature as formidable at CR 10
[reskin] mind tier: CHA 11 -> 20 — the call read this creature as formidable at CR 10
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> It waits submerged and silent in the flooded nave until prey is within the choir's reach, then breaks the water in a single choral strike that hits as one drowning voice — salt-thick sound and grave-cold pressure arriving together. Every round after, it circles half-seen beneath the surface, answering attacks with staggered phrases of the same hymn so each note lands as a blow until its target's breath and footing give way, and under pressure it will sink into the flooded dark to re-form the chord before striking again rather than trade blows. It does not flee in panic; it withdraws the way a conductor quiets an orchestra — only to bring the full volume back where the enemy is weakest.

**`[concept] lore:`**, uncut

> When the cathedral drowned, its choir kept its final note, and the congregation of dead singers still believes the service is unfinished, dragging the living under the water to fill the empty stalls.

**Every attack row**
```
(no attack row)
```

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

darkvision 60 ft., passive Perception 19

Languages: 

Common plus the languages it knew in life

Challenge

10 (5,900 XP)

Proficiency Bonus:

+4

Umbral Step (Bonus Action).While in Dim Light or Darkness, the choir takes the Hide action.

Actions
Multiattack: The choir makes three Grave-Chill Voice attacks. It can replace one attack with a use of Drowning Chord.
Grave-Chill Voice: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage plus 7 (2d6) necrotic damage.
Drowning Chord: Each creature of the choir's choice in a 60-foot radius originating from the choir that can see or hear the choir must make a DC 15 Wisdom saving throw. On a failed save, the target is charmed until the start of the choir's next turn, and while charmed this way, it must move toward the choir by the safest available route on its turn and can't take Reactions. On a successful save, the target is immune to this creature's lure for 24 hours.
```

---

## 11. Vampire — CR 13

**Input:** `name: Vampire | who keeps a garden of thorns`
**Donor:** lurker-13 -> CR 13
**Signature:** library · **elapsed** 1s

**Type line:** `Medium undead, lawful evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Vampire (is) — "Name field: Vampire" (code)
[route] lurker type=Undead mechanics=snare — casts: the call reads no worked magic here | hold_shape: reach on the GM's own words "keeps a garden of thorns" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-trap: ✓ ("keeps a garden of thorns") | lurker-trap: no line key in the words — the model's read of its quote | lurker-trap -> lurker: a trap is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] resolve: archetype=lurker type=Undead typeFrom=the route call themes=grave/grasping mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> A bloodless gardener-vampire who moves unseen among its thorn hedges and opens with a single impaling strike from the brambles before melting back into cover. Each round thereafter it circles, prunes, and re-enters on its own terms, its living walls of thorn reaching out to snare any prey that guesses where it hides. It toys with intruders rather than fleeing — patient, vain, and delighted by the slow bleed of anything that trespasses in its garden.

**`[concept] lore:`**, uncut

> Once a noble who could not bear to lose the sunlight, it rooted its coffin in the soil of its own estate and grew a garden of thorn that feeds on blood so that it need never leave the dark.

**Every attack row**
```
(no attack row)
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
Multiattack (Vampire Form Only): The vampire makes two Grave Strike attacks and uses Bite. It can replace one attack with a use of Binding Lash.
Grave Strike: Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) from one of two hands.
Binding Lash: One creature within 60 feet must make a DC 17 Dexterity saving throw. On a failed save, the target is restrained until the end of its next turn.
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that has the grappled, incapacitated, or restrained condition must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) piercing damage on a failed save, plus 13 (3d8) necrotic damage. The target's Hit Point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a Vampire Spawn under the vampire's control.
Legendary Actions

The vampire can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The vampire regains spent legendary actions at the start of its turn.

Deathless Strike: The vampire moves up to half its Speed, and it makes one Grave Strike attack.
Beguile: The vampire casts Command, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17). The vampire can't take this action again until the start of its next turn.
```

---

## 12. Swarmshear — CR 13

**Input:** `a plague-bearing archon of flies that commands lesser swarms`
**Donor:** skirmisher-13-winged -> CR 13 (invented — no printed peer)
**Signature:** library · **elapsed** 2s

**Type line:** `Medium Celestial, Lawful Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — title archon — "a plague-bearing archon of flies that commands lesser swarms" (call)
[route] skirmisher-winged type=Celestial mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-winged: ✓ ("archon of flies") | skirmisher-winged: key "flies" (class verb)
[concept] resolve: archetype=skirmisher type=Celestial typeFrom=the route call themes=celestial/venomous mind=sapient style=winged energy=Poison mix=both identity=✓ lore=✓
[reskin] mind tier: INT 10 -> 15 — the call read this creature as capable at CR 13
[reskin] mind tier: WIS 16 -> 20 — the call read this creature as formidable at CR 13
[reskin] mind tier: CHA 12 -> 20 — the call read this creature as formidable at CR 13
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> The Plague-Archon opens by loosing its retinue — a whirling mantle of fly-swarms that boils off its luminous carapace to blind and poison — then dives on wings of buzzing, glittering light to snatch a target and drop it from height, harrying and bleeding the field with rot between strikes. It is a patient, contemptuous commander, never quite landing, always repositioning its swarms to shepherd prey, and it withdraws aloft only when the Host itself is threatened. It does not fight to the death out of fear — it fights to the death out of duty, but it will flee the field bloodied and return with a fresh wave of the plagued, for its purpose outlives its body.

**`[concept] lore:`**, uncut

> Sent by the higher heavens to quarantine a corrupt world, the Plague-Archon is a mercy-warrior whose cure is contagion — it spreads the holy rot that scours sin, hoarding the swarms it commands as both weapon and congregation.

**Every attack row**
```
Talons. Melee Attack Roll: +10, reach 10 ft. 14 (2d8 + 5) Slashing damage plus 10 (3d6) Poison damage. If the swarmshear flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 7 (2d6) Slashing damage and, if it is Large or smaller, has the Prone condition.
```

```
Swarmshear

Medium Celestial, Lawful Neutral

AC 18
Initiative +5 (15)

HP 187 (22d8 + 88)

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

Resistances Radiant

Immunities Charmed

Senses darkvision 120 ft.; Passive Perception 20

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Plague Aura. Constitution Saving Throw: DC 17, any creature that starts its turn in a 20-foot Emanation originating from the swarmshear. Failure: The target has the Poisoned condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Wing Drift. The swarmshear doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.

Contemptuous Sway. When a creature the swarmshear can see ends its turn within 5 feet of it, the swarmshear can move up to 10 feet without provoking Opportunity Attacks.

Actions

Multiattack. The swarmshear makes three Talons attacks. It can replace one attack with a use of Swarmwright's Command.

Talons. Melee Attack Roll: +10, reach 10 ft. 14 (2d8 + 5) Slashing damage plus 10 (3d6) Poison damage. If the swarmshear flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 7 (2d6) Slashing damage and, if it is Large or smaller, has the Prone condition.

Retinue Dive (Recharge 5-6). The swarmshear flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Dexterity Saving Throw: DC 17. Failure: 66 (12d10) Piercing damage, and the target has the Prone condition. Success: Half damage.

Swarmwright's Command. Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Poisoned condition until the end of its next turn.

Bonus Actions

Aerial Agility. The swarmshear takes the Dash or Disengage action.

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
**Signature:** dropped · **elapsed** 2s

**Type line:** `Gargantuan Monstrosity, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape: contain on the GM's own words "that swallowed a war-band's armoury" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("that swallowed a war-band's armoury") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=devouring/subterranean mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> A purple worm whose gullet is a fused mass of swallowed mail, blades, and spearheads — it breaches from below, seizes a foe in its churning maw, and grinds the prey against the armoury-lining of its throat before sliding it whole into a stomach of corroded steel. Every round it coils and repositions like a constrictor, dragging one victim inward while its plated hide shrugs off blows; the blades it has eaten erupt from its flesh as jagged spurs that shred anything pressing close. It does not flee bloodied — pain makes it swallow harder, bucking and thrashing to keep anything already half-down its gullet from escaping.

**`[concept] lore:`**, uncut

> A war-band's caravan and the full weight of its armoury went down a sinkhole into a purple worm's tunnel, and the creature ate it all — plate, mail, blades, and the warriors still wearing them — until its gut grew a second, honed skeleton of stolen steel.

**Every attack row**
```
Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.
Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.
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

Senses blindsight 60 ft., tremorsense 120 ft.; Passive Perception 14

Languages None

CR 15 (XP 13,000; PB +5)

Traits

Churning Armoury. At the start of each of the purple worm's turns, each creature inside the purple worm takes 22 (5d8) Acid damage, and the purple worm gains Temporary Hit Points equal to half the damage dealt.

Tunneler. The purple worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The purple worm makes one Bite attack and one Tail Stinger attack.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

Bonus Actions

Swallow. Strength Saving Throw: DC 21, one Large or smaller creature Grappled by the purple worm (it can have up to three creatures swallowed at a time). Failure: The target is swallowed by the purple worm, and the Grappled condition ends. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the purple worm, and takes 17 (5d6) Acid damage at the start of each of the purple worm's turns.
If the purple worm takes 30 damage or more on a single turn from a creature inside it, the purple worm must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the purple worm and has the Prone condition. If the purple worm dies, any swallowed creature no longer has the Restrained condition and can escape from the corpse using 20 feet of movement, exiting Prone.

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

## 14. Glacier-Heart — CR 15

**Input:** `a glacier's heart given legs, trailing a wake of killing cold`
**Donor:** brute-9-juggernaut -> CR 15
**Signature:** library · **elapsed** 2s

**Type line:** `Huge elemental, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a glacier's heart given legs, trailing a wake of killing cold" (call)
[route] brute-juggernaut type=Elemental mechanics=aura — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("a glacier's heart given legs") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental typeFrom=the route call themes=elemental/terror mind=bestial style=juggernaut energy=Cold mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 6 against "feeble" — the call read this creature as bestial, and the card's 6 is already that dim
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier: CHA 4 -> 15 — the call read this creature as capable at CR 15
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> A glacier's heart on stumpy, cracking legs, it announces itself with a hoarsely grinding roar and begins to walk — every stride it takes kills the ground behind it and the air ahead of it. Its combat loop is advance and abrade: it swings limbs of blue-black ice like falling seracs, letting the killing cold of its wake do the rest, and it loathes being made to stop, pressing through walls, roots, and creatures alike as though they were only weather. Under pressure it does not retreat; the cold grows deeper, its crust thickens, and it redoubles its march until it is the only thing left moving in a frozen silence.

**`[concept] lore:`**, uncut

> Something deep in the ice-age heart of a glacier woke and decided it wanted to move, so it tore its core free of the mountain and grew a crooked body of frozen stone around it; now it walks south, and it will not know it has finished until the whole valley is white.

**Every attack row**
```
(no attack row)
```

```
Glacier-Heart
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

Cold Absorption.Whenever the glacier-heart is subjected to cold damage, it takes no damage and instead regains a number of hit points equal to the cold damage dealt.
Siege Monster.The glacier-heart deals double damage to objects and structures.
Rimewake.At the start of each of its turns, the ground within 15 feet of the glacier-heart coats in rime and becomes difficult terrain; a creature that begins its turn in that frozen area takes 16 (3d10) cold damage and has its speed halved until the end of its next turn.

Actions
Multiattack: The glacier-heart makes two Slam attacks.
Slam: Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage plus 13 (3d8) cold damage.
Killing Cold (Recharge 5-6): Each creature in a 30-foot cone must make a DC 17 Constitution saving throw, taking 66 (12d10) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also deafened until the end of its next turn.
```

---

## 15. Adult Red Dragon — CR 17

**Input:** `name: Adult Red Dragon | blind in one eye from an old lance`
**Donor:** dragon-15 -> CR 17
**Signature:** library · **elapsed** 1s

**Type line:** `Huge dragon, chaotic evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Adult Red Dragon (is) — "Name field: Adult Red Dragon" (code)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | dragon: ✓ ("Adult Red Dragon") | dragon: key "dragon" (class body)
[concept] resolve: archetype=dragon type=Dragon typeFrom=the route call themes=draconic/terror mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> An adult red dragon with one eye scarred shut by an old lance wound, it opens by announcing itself with a roar of frightful presence and a searing cone of flame, then closes to kill with bite and claws wherever it can pin prey down. Every round after, it uses its blind-side handicap deliberately — favoring angles where its ruined eye doesn't cost it, punishing flankers with wing and tail, and refusing to be baited into a blind rush. Wounded and cornered, it fights to the death with a furious, methodical spite, withdrawing only to heal and re-engage, never truly fleeing.

**`[concept] lore:`**, uncut

> This dragon lost its eye to a hero's lance and has spent decades hunting the bloodline of the one who blinded it, hoarding their heirlooms in its burning lair.

**The Spellcasting row, in full**
```
Spellcasting: The red dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 20, +12 to hit with spell attacks): - At will: Command, Detect Magic, Scorching Ray
```

**Every attack row**
```
(no attack row)
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

## 16. Molten King — CR 17

**Input:** `a tyrant of burning brass who rules a city of forges`
**Donor:** brute-17-juggernaut -> CR 17
**Signature:** library · **elapsed** 2s

**Type line:** `Large Construct, Lawful Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — title tyrant — "a tyrant of burning brass who rules a city of forges" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("a tyrant of burning brass") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=forged/terror mind=sapient style=juggernaut energy=Fire mix=both identity=✓ lore=✓
[reskin] mind tier: INT 6 -> 15 — the call read this creature as capable at CR 17
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 17
[reskin] mind tier: CHA 4 -> 20 — the call read this creature as formidable at CR 17
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> The Brass Tyrant does not duel; it processes. It opens by wading through the front rank to reach the biggest threat, trusting molten brass skin and the crushing weight of its fists to turn anything that tries to stop it, and every round after it advances, grabs, and forges a lesson out of the nearest obstacle or the loudest dissenter. Wounded, it does not flee — it bellows a decree, plants itself like a furnace door, and fights to the death, spending its final heat in a detonation of molten slag rather than suffer a challenger to outlive it.

**`[concept] lore:`**, uncut

> Poured into a throne of living brass by the first smiths of the forge-city, the Tyrant was made to rule the forges and has never stopped believing the city owes it obedience.

**Every attack row**
```
Fist. Melee Attack Roll: +12, reach 10 ft. 19 (3d8 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.
```

```
Molten King

Large Construct, Lawful Neutral

AC 19
Initiative -1 (9)

HP 231 (22d10 + 110)

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

Molten Brass Skin. A creature that touches the molten king or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Legendary Resistance (3/Day). If the molten king fails a saving throw, it can choose to succeed instead.

Immutable Form. The molten king can't shape-shift.

Siege Monster. The molten king deals double damage to objects and structures.

Actions

Multiattack. The molten king makes two Fist attacks. It can replace one attack with a use of Seize the Unforged.

Fist. Melee Attack Roll: +12, reach 10 ft. 19 (3d8 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.

Furnace Flare (Recharge 5-6). Constitution Saving Throw: DC 19, each creature in a 60-foot Cone. Failure: 66 (12d10) Fire damage. Success: Half damage only.

Seize the Unforged. Strength Saving Throw: DC 19, one creature within 10 feet. Failure: The target has the Grappled condition (escape DC 20).

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the molten king can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Advance and Strike. The molten king moves up to half its Speed without provoking Opportunity Attacks, and it makes one Fist attack.

Trample Forge. The molten king moves up to half its Speed without provoking Opportunity Attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.

Shuddering Step. Strength Saving Throw: DC 19, each creature within 10 feet of the molten king. Failure: The target has the Prone condition.

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
**Donor:** brute-21 -> CR 20 (invented — no printed peer)
**Signature:** dropped · **elapsed** 2s

**Type line:** `Large Fiend, Lawful Evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Pit Fiend (is) — "Name field: Pit Fiend" (code)
[route] brute type=Fiend mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("collects the oaths of dying knights") | defender: the call read "knights" as not meaning that mechanic here — no override | brute stands: every key that would override it was read as a figure of speech | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Fiend typeFrom=the route call themes=fiendish/grave mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> The Pit Fiend fights as an oath-broker in brute flesh: it opens by hurling its iron chain-hook to drag a knight within reach, then plants itself and trades blows with a massive shackle-flail, and each dying oath the fallen speak is swallowed mid-swing to grow heavier and harder to wound. It never flees; it fights to the death, and it toys with prey by letting weakened foes crawl toward escape only to reel them back by the chain and demand one more broken promise before the kill.

**`[concept] lore:`**, uncut

> Forged in the oath-pits of a hellish archive where every promise spoken at death is pressed into iron, it walks the battlefields of the living to harvest the last words of dying knights — each collected oath a link in the chain it one day intends to hang across the gates of its own infernal jailers.

**Every attack row**
```
Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.
Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.
Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.
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

Chain of Broken Oaths. When a creature dies within 10 feet of the pit fiend, the pit fiend gains Temporary Hit Points, and until the end of its next turn its Bite attacks deal an extra 14 (4d6) Fire damage.

Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend's aura for 24 hours.

Legendary Resistance (3/Day). If the pit fiend fails a saving throw, it can choose to succeed instead.

Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

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

---

## 18. Bone-Sun Archlich — CR 20

**Input:** `an archlich enthroned on a sun of bone`
**Donor:** caster-21 -> CR 20
**Signature:** library · **elapsed** 2s

**Type line:** `Medium undead, neutral evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Lich (is) — "archlich" (call)
[route] caster (artillery) type=Undead mechanics=aura — casts: implied by the kind — "archlich" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("archlich") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Undead typeFrom=the route call themes=grave/arcane mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> The archlich opens by rising from its bone throne-sun into the air, hurling bolts of bone-shard and searing radiance while its throne sheds orbiting splinters that screen it from reprisal. Every round it drifts and repositions the sun, spending spell slots on blasts and bone-walls to keep the distance its fragile frame needs, and it never lets an enemy close without paying in a storm of flying bone. Under pressure it does not flee — it detonates a shell of the throne, retreats inside a cage of splinters, and keeps casting, coldly certain that the dead have already won the long fight.

**`[concept] lore:`**, uncut

> A lich who bound its soul not to a phylactery but to a sun of fused bone raised from the graves of an empire, it drifts through the void feeding that star with the skeletons of the living so it never burns out.

**The Spellcasting row, in full**
```
Spellcasting: The archlich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19): At will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
```

**Every attack row**
```
(no attack row)
```

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

Shrieking Halo.Any creature that starts its turn in a 15-foot radius originating from the archlich must make a DC 19 Charisma saving throw. On a failed save, until the start of its next turn, the target can't speak a deliberate lie.
Legendary Resistance (3/Day).If the archlich fails a saving throw, it can choose to succeed instead.
Spirit Jar.If destroyed, the archlich reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the archlich's lair.
Protective Magic (Reaction).The archlich casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: The archlich makes three attacks, using Eldritch Burst or Paralyzing Touch. It can replace one attack with a use of Throne-Sun Volley (Recharge 5-6).
Eldritch Burst: Melee or Ranged Weapon Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 31 (4d12 + 5) force damage.
Paralyzing Touch: Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed until the start of the archlich's next turn.
Spellcasting: The archlich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19): At will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
2/day each: Animate Dead, Dimension Door, Plane Shift
1/day each: Chain Lightning, Finger of Death, Power Word Kill, Scrying
Throne-Sun Volley (Recharge 5-6): Each creature in a 120-foot-long, 5-foot-wide Line must make a DC 19 Dexterity saving throw, taking 35 (10d6) piercing damage on a failed save. On a failed save, the target is restrained until the end of its next turn.
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
**Signature:** — · **elapsed** 2s

**Type line:** `Gargantuan dragon, lawful good` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: Ancient Gold Dragon
[path] exact — Ancient Gold Dragon (is) — "Ancient Gold Dragon" (code)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | dragon: ✓ ("Ancient Gold Dragon") | dragon: key "dragon" (class body)
[concept] resolve: archetype=dragon type=Dragon typeFrom=the route call themes=draconic/arcane mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
```

**`[concept] identity:`**, uncut

> An ancient gold dragon opens with its weakening breath and Frightful Presence, then wades in as a spellcasting bruiser, weaving arcane wards while its claws and bite carry searing fire. Each round it presses with a multiattack and repositions by flight, forcing casters to choose between the dragon and its breath. It is patient and calculating, tempted to toy with worthy prey but fleeing only when truly bloodied and outmatched, never in panic.

**`[concept] lore:`**, uncut

> Hoarded beneath sun-baked mountain halls, the Ancient Gold Dragon guards a treasury of relics it believes are the last memory of a fallen age, and it will burn any who claim them.

**Every attack row**
```
(no attack row)
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
**Signature:** library · **elapsed** 2s

**Type line:** `Gargantuan Monstrosity, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a leviathan of the trench whose song drowns fleets" (call)
[route] brute type=Beast mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: the call reads no worked magic in these words | caster: the family itself needs a magic word in the words — the fallback leaves it | fell to brute's plain line | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Beast typeFrom=the route call themes=aquatic/voice mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[reskin] mind tier: INT 10 -> 15 — the call read this creature as capable at CR 24
[reskin] mind tier: WIS 14 -> 20 — the call read this creature as formidable at CR 24
[reskin] mind tier: CHA 14 -> 20 — the call read this creature as formidable at CR 24
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> The leviathan opens by letting its subsonic song roll out ahead of it, drowning the crews of whole fleets in confusion and despair before its bulk ever breaches the water. Every round after, it circles beneath the hulls and strikes with crushing coils and tide-swamping limbs, using its song to turn the sea itself against the ships around it. It is patient and possessive of its trench, and when bloodied it does not flee — it drags the fight down into the dark where its voice is strongest.

**`[concept] lore:`**, uncut

> It sleeps in the lightless trench below the shipping lanes and wakes only when the surface world grows too loud, singing the fleets down to feed the quiet it hoards.

**Every attack row**
```
Coils. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.
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

Senses blindsight 120 ft.; Passive Perception 22

Languages Common

CR 24 (XP 62,000; PB +7)

Traits

Amphibious. The leviathan can breathe air and water.

Bone-Ringing Coils. Once on each of the leviathan's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 24. Failure: The target has the Stunned condition until the start of its next turn.

Legendary Resistance (3/Day). If the leviathan fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The leviathan makes two Coils attacks. It can replace one attack with a use of Fathom Chorus.

Coils. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Drowning Song (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Fathom Chorus. Constitution Saving Throw: DC 24, each creature in a 30-foot Emanation originating from the leviathan. Failure: The target has the Poisoned condition until the end of its next turn.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the leviathan can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Undertow Lunge. The leviathan moves up to half its Speed without provoking Opportunity Attacks, and it makes one Coils attack.

Swell Surge. Strength Saving Throw: DC 24, each creature within 10 feet of the leviathan. Failure: The target has the Prone condition.

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
**Signature:** dropped · **elapsed** 2s

**Type line:** `Large Monstrosity, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: Owlbear
[path] exact — Owlbear (is) — "Owlbear" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but offered no quote | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("Owlbear") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=bestial/grasping mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the exact path takes no class kit
```

**`[concept] identity:`**, uncut

> A hulking bear-framed thing feathered in dirty owl plumage, it opens with a silent rushing pounce from cover, driving both forelimbs down to pin and crush a single target before its beak finds the throat. Every round after that it stays latched on that one hold — raking with its rear claws while the hooked beak tears — and it will haul struggling prey off its feet and drag it into the brush rather than release it. Under pressure it does not retreat; a wounded owlbear redoubles the grapple and fights to the death, too stupid and too enraged to know when it is losing.

**`[concept] lore:`**, uncut

> Wizards' old crossing of owl and bear bred true and escaped, and now these savage hybrids den in the deep woods, wanting only meat and the silence of unbroken territory.

**Every attack row**
```
Rend. Melee Attack Roll: +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.
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

## 23. Vashka the Red — CR 6

**Input:** `name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.`
**Donor:** defender-5 -> CR 6
**Signature:** library · **elapsed** 2s

**Type line:** `Medium Humanoid, Lawful Evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] filled: the head clause names the Hobgoblin Warrior, a people — a fighter who is visibly one stands on its printed body (owner's ruling, 2026-11-15)
[path] class_npc — Hobgoblin Warrior (is) — class fighter — "warlord" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("A hobgoblin warlord") | defender-leader -> defender: the concept's VERB outranks the noun (key "shield wall", class verb) | defender: key "shield wall" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: guarded-stance yields — AC 19 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] class kit: fighter — "warlord": Riposte (riposte)
[reskin] class weapon: "longsword" and "longbow" already names a row on this body — no row is renamed to it (fix F: one name, one row)
```

**`[concept] identity:`**, uncut

> Vashka the Red opens by planting the shield wall and letting the enemy come to her, her lacquered plate a red wall that does not move. Every round she fights as a hinge of that wall — holding her ground, punishing anyone who tries to slip past her guard, and barking orders that keep the line dressed even as blades bite. Under pressure she does not break ranks: she tightens the formation, spends the wounded as shields, and if forced to retreat she withdraws in step behind the wall rather than flee alone.

**`[concept] lore:`**, uncut

> Vashka the Red rose from a hobgoblin legion's shield companies, lacquering her plate the color of the regiment's banner, and now sells the discipline of her unbreakable wall to whichever warlord pays — but she never sells the wall itself.

**Every attack row**
```
Longsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage.
Longbow. Ranged Attack Roll: +7, range 150/600 ft. 21 (5d6 + 4) Piercing damage.
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

Senses Passive Perception 13

Languages Common, Goblin

CR 6 (XP 2,300; PB +3)

Traits

Shield-Locked. While Vashka is standing shoulder-to-shoulder with an ally, Vashka has a +2 bonus to AC against attacks that come from the side of her ally.

Dress the Line. Once per turn, when a creature within 5 feet of Vashka that can hear her is hit by an attack roll, that creature gains a + bonus to its AC until the start of Vashka's next turn, provided it is standing shoulder-to-shoulder with Vashka or another ally.

Pack Tactics. Vashka has Advantage on an attack roll against a creature if at least one of Vashka's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. Vashka makes two attacks, using Longsword or Longbow in any combination.

Longsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Longbow. Ranged Attack Roll: +7, range 150/600 ft. 21 (5d6 + 4) Piercing damage.

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

## 24. Scythe-Brood Horror — CR 9

**Input:** `A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.`
**Donor:** brute-8-grappler -> CR 9
**Signature:** library · **elapsed** 2s

**Type line:** `Large Monstrosity, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell t" (call)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf, breath — casts: the call reads no worked magic here | hold_shape: grip on the GM's own words "pinning prey with two arms" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("pinning prey with two arms and carving w") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=venomous/grasping mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 9
[reskin] mind tier: CHA 6 -> 10 — the call read this creature as ordinary at CR 9
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> The horror opens by rushing the nearest target and locking it down with two scythe-arms, pinning it in place while the other two arms carve it apart; every round it keeps a victim pinned and bleeding, favoring the largest or most armored target to hold rather than chase skirmishers. Its acid-shedding shell punishes anyone who grapples it or strikes it in melee, and when badly wounded it does not flee but throws itself into the thickest of the fight, spitting caustic bile and dragging the nearest prey under a rain of cuts.

**`[concept] lore:`**, uncut

> Hatched from a clutch buried in a battlefield's churned soil, it carries the acid of a dissolved carcass in its shell and wants only to pin warm bodies to the ground and cut until nothing moves.

**Every attack row**
```
Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 17 (3d8 + 4) Piercing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).
Brood-Limb Pin. Melee Attack Roll: +8, reach 5 ft. 17 (3d8 + 4) Piercing damage, and the target has the Restrained condition until the end of its next turn.
```

```
Scythe-Brood Horror

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
10
+0
+0

Skills Athletics +8, Perception +6

Immunities Acid

Senses darkvision 60 ft.; Passive Perception 16

Languages None

CR 9 (XP 5,000; PB +4)

Traits

Caustic Shell. A creature that touches the scythe-brood horror or hits it with a melee attack while within 5 feet of it has the Poisoned condition until the end of its next turn.

Actions

Multiattack. The scythe-brood horror makes two attacks, using Spitting Maw or Brood-Limb Pin in any combination. It can replace one attack with a use of Horrid Display.

Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 17 (3d8 + 4) Piercing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).

Horrid Display. Wisdom Saving Throw: DC 15, each creature of the scythe-brood horror's choice in a 30-foot Emanation originating from the scythe-brood horror that can see or hear it. Failure: The target has the Frightened condition until the end of its next turn. Success: The target is immune to this creature's terror for 24 hours.

Brood-Limb Pin. Melee Attack Roll: +8, reach 5 ft. 17 (3d8 + 4) Piercing damage, and the target has the Restrained condition until the end of its next turn.

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

## 25. Black Iron Sentinel — CR 11

**Input:** `a sentinel of black iron, AC 20, Huge, speed 20 feet`
**Donor:** defender-7-warden -> CR 11
**Signature:** library · **elapsed** 2s

**Type line:** `Huge construct, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a sentinel of black iron" (call)
[route] defender-warden type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-warden: ✓ ("a sentinel of black iron") | defender-warden stands on the homebrew path: the call ranked it and quoted "a sentinel of black iron" — the key "sentinel" is the menu, not the decision (step 7) | defender-warden: no line key in the words — the model's read of its quote | asked_mechanic harden: quote not found
[concept] resolve: archetype=defender type=Construct typeFrom=the route call themes=forged/grave mind=mindless style=warden energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 7 against "ordinary" — the call read this creature as mindless, so only "feeble" could lower its INT
[reskin] mind tier held: CHA stays 3 against "feeble" — the card's 3 is already feeble
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 11
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> A slab-bodied sentinel of black iron that plants itself in front of what it guards and does not move again voluntarily; it opens by walking its slow 20-foot pace into the narrowest ground it can hold, then grinds down anything that comes within reach with a single crushing iron limb. Every round it endures — taking blows meant for its charge on its own scarred plate — and only shifts its stance to redirect a threat away from the thing behind it, fighting to the death without anger or speech because it has nowhere else to be.

**`[concept] lore:`**, uncut

> Forged in a dead foundry and bolted upright over a tomb, a vault, or a pass it was ordered to hold, the black-iron sentinel still obeys the last command it was given and will not kneel until its frame is broken apart.

**Every attack row**
```
(no attack row)
```

```
Black Iron Sentinel
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

	

15 (+2)

	

3 (-4)

Skills: 

Perception +6

Saving Throws: 

CON +8

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

darkvision 60 ft., passive Perception 16

Languages: 

understands the languages of its creator but can't speak

Challenge

11 (7,200 XP)

Proficiency Bonus:

+4

Ward Bond.The iron sentinel is magically bound to a ward of its choosing, and it can have only one ward at a time. While the iron sentinel is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the iron sentinel.
Regeneration.The iron sentinel regains 10 hit points at the start of each of its turns if it has at least 1 Hit Point.
Interpose (Reaction).When a creature within 5 feet of the iron sentinel that it guards is hit by an attack roll, the attack hits the iron sentinel instead, and the iron sentinel has Resistance to the attack's damage.

Actions
Multiattack: The iron sentinel makes two Fist attacks. It can replace one attack with a use of Iron Sweep.
Fist: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage.
Stand Fast (2/Day): The iron sentinel targets itself or one creature it can see within 60 feet. The target gains 24 (7d6) temporary hit points, and it gains a +2 bonus to AC until the end of the iron sentinel's next turn.
Iron Sweep: Each creature in a 30-foot cone must make a DC 16 Strength saving throw. On a failed save, the target is pushed up to 15 feet away from the iron sentinel and is knocked prone.
```

---

## 26. Grendhilde the Marsh Witch — CR auto

**Input:** `a marsh witch who curses trespassers, cr 7`
**Donor:** caster-8-binder -> CR 7
**Signature:** library · **elapsed** 2s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class mage — "witch" (call)
[route] caster-binder (controller) type=Humanoid mechanics=none — casts: implied by the kind — "a marsh witch who curses trespassers" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: ✓ ("curses trespassers") | caster-binder: key "curses" (class verb)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/beguiling mind=sapient style=binder energy=Poison mix=both identity=✓ lore=✓
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
```

**`[concept] identity:`**, uncut

> The marsh witch opens by laying a layered hedge of curses across the whole trespassing party — old words worked into the mud of her fen, foul humours that sap the will and slow the limbs as surely as any snare. Each round she works another one, hexing sight so that eyes can no longer find their footing, hexing Strength so that swords fall slack, and only then turning to fell things with a rotten darting word, keeping her lines to the water and the reeds. She is patient and wilful to the end, retreating into the drowned reeds she has woven with her curses and never fighting fair or fighting alone in the open, and she does not flee her own marsh — she lets it swallow those who follow.

**`[concept] lore:`**, uncut

> A fen-bound hag who bargained her blood to the black water for the power to work curses, and who now spells her marsh's every boundary with binding rotten humours to punish any who cross uninvited.

**The Spellcasting row, in full**
```
Spellcasting. Grendhilde casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly
```

**Every attack row**
```
Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.
```

```
Grendhilde the Marsh Witch

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

Languages Common and any three languages, Sylvan

CR 7 (XP 2,900; PB +3)

Actions

Multiattack. Grendhilde makes three Arcane Burst attacks. It can replace one attack with a use of Fenwater Binding.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Grendhilde casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Fenwater Binding. Constitution Saving Throw: DC 14, one creature within 30 feet. Failure: 19 (3d12) Bludgeoning damage.

Bonus Actions

Misty Step (3/Day). Grendhilde casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Grendhilde casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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

## 27. Unanswered Templar — CR 6

**Input:** `a templar priest with a mace and no magic at all`
**Donor:** defender-5 -> CR 6
**Signature:** dropped · **elapsed** 1s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "templar" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("a templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/grave mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
```

**`[concept] identity:`**, uncut

> A veteran templar who has buried every prayer that ever answered, this priest opens a fight by planting his shield and standing squarely in the doorway, letting the mace dare anyone to come at him. Every round he holds the line with disciplined shield-work and answers any enemy who tries to slip past or strike an ally with a crushing, deliberate blow — never fast, never flashy, just patient and impossible to dislodge. He does not flee when bloodied; he tightens his grip, digs in, and fights to the last because retreat would betray the only vow he still keeps.

**`[concept] lore:`**, uncut

> A templar whose god went silent stripped the sanctity out of his rites and left only the discipline of the order, so he keeps his post and his mace and guards the faithful with iron and stubbornness instead of miracles.

**Every attack row**
```
Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the templar's next turn.
```

```
Unanswered Templar

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

Shoulder Square. While the templar is standing on ground he has not moved from since the start of his last turn, attack rolls made against the templar have Disadvantage, and the templar can't be moved against his will from that spot.

Aura of Authority. While in a 10-foot Emanation originating from the templar, the templar and its allies have Advantage on attack rolls and saving throws, provided the templar doesn't have the Incapacitated condition.

Actions

Multiattack. The templar makes three Mace attacks. It can replace one attack with a use of Shield Bash.

Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the templar's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the templar can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

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
**Signature:** library · **elapsed** 3s

**Type line:** `Medium humanoid, neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class mage — "archmage" (call)
[route] caster (artillery) type=Humanoid mechanics=teleport — casts: on the GM's own words "An elf archmage who bends shadow and ste" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("An elf archmage who bends shadow") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/uncanny mind=sapient style=— energy=Necrotic mix=energy identity=✓ lore=✓
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "archmage": Misty Step (3/Day) (Mage/Misty Step)
```

**`[concept] identity:`**, uncut

> Ilvareth opens from darkness, guttering the lights around the party before hurling a lance of shadow from an angle no one is covering, then steps through the next pool of gloom the moment anyone closes the distance. Every round after that is a duel of angles: blast, reposition via shadow, blast again, using the battlefield's own darkness as a corridor while keeping the party at the far end of it. He is a patient, vain tactician who toys with prey and only slips away bloodied if truly cornered, preferring to leave an insult and a shadow where he stood.

**`[concept] lore:`**, uncut

> An elven archmage who traded his name to the shadow between places, Ilvareth Dusksong now collects the last lights of dying courts and vanishing kingdoms, hoarding them in the dark he walks through.

**The Spellcasting row, in full**
```
Spellcasting: Ilvareth casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17): At will: Detect Magic, Detect Thoughts, Disguise Self, Invisibility, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
(no attack row)
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

Gloaming Shift.When Ilvareth is in dim light or darkness, Ilvareth can take the Hide action even when only lightly obscured, and can teleport up to 30 feet to an unoccupied space he can see that is in dim light or darkness, leaving a smear of deepening gloom in the space he left.
Magic Resistance.Ilvareth has advantage on saving throws against spells and other magical effects.
Misty Step (3/Day) (Bonus Action).Ilvareth casts Misty Step, using the same spellcasting ability as Spellcasting.
Shadow Step (Recharge 4-6) (Bonus Action).Ilvareth teleports up to 60 feet to an unoccupied space it can see.
Protective Magic (3/Day) (Reaction).When Ilvareth is hit by an attack roll, Ilvareth casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Ilvareth makes four Arcane Burst attacks.
Arcane Burst: Melee or Ranged Weapon Attack: +9 to hit, reach 5 ft. or range 150 ft., one target. Hit: 27 (4d10 + 5) force damage.
Spellcasting: Ilvareth casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17): At will: Detect Magic, Detect Thoughts, Disguise Self, Invisibility, Light, Mage Armor, Mage Hand, Prestidigitation
2/day each: Fly, Lightning Bolt
1/day each: Cone of Cold, Mind Blank, Scrying, Teleport
```

---

## 29. Unblessed Bell Swarm — CR 13

**Input:** `a swarm of funeral bells that ring themselves over the dying`
**Donor:** swarm-9 -> CR 13 (invented — no printed peer)
**Signature:** library · **elapsed** 3s

**Type line:** `Medium Swarm of Tiny Constructs, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a swarm of funeral bells that ring themselves over the dying" (call)
[route] swarm type=Construct mechanics=aura — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a swarm of funeral bells" | swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] resolve: archetype=swarm type=Construct typeFrom=the route call themes=grave/uncanny mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the card's 4 is already feeble
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 13
[reskin] mind tier: CHA 2 -> 15 — the call read this creature as capable at CR 13
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> A cloud of tarnished funeral bells hangs in the air over the dying, waiting with the patience of a thing that has never once been wrong about who is next. When prey still moves, the swarm descends and rings in a shrieking, overlapping clamor that rattles bone and drowns out last words, each bell striking with the weight of a swung censer. It does not pursue the healthy: it waits, tolls, and multiplies its tolling until the body beneath it has been rung still, then settles to drink the silence it made.

**`[concept] lore:`**, uncut

> Each bell in the swarm was cast for a funeral that never happened — a grave interrupted, a body never blessed — and the bells now seek the dying to finish what the living abandoned, ringing the rites over anyone whose death goes unwitnessed.

**Every attack row**
```
Censer Swing. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.
```

```
Unblessed Bell Swarm

Medium Swarm of Tiny Constructs, Unaligned

AC 15
Initiative +5 (15)

HP 178 (21d8 + 84)

Speed 30 ft., Fly 30 ft. (hover)

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
20
+5
+5
MOD
SAVE
CON
18
+4
+4
CHA
15
+2
+2

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned

Senses blindsight 30 ft. (blind beyond this radius); Passive Perception 15

Languages Understands the languages of its creator but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Tolling Rot. Once on each of the swarm's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 17. Failure: The target has the Stunned condition until the end of its next turn.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Multiattack. The swarm makes two Censer Swing attacks.

Censer Swing. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.

Ringing Ground (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 45 (13d6) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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

## 30. Chrismal Ossuary — CR 9

**Input:** `a cathedral-vault ooze that digests reliquaries`
**Donor:** ooze-9 -> CR 9 (invented — no printed peer)
**Signature:** library · **elapsed** 2s

**Type line:** `Large ooze, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a cathedral-vault ooze that digests reliquaries" (call)
[route] ooze type=Ooze mechanics=none — casts: the call reads no worked magic here | hold_shape: contain on the GM's own words "digests reliquaries" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | ooze: ✓ ("cathedral-vault ooze") | ooze: no line key in the words — the model's read of its quote
[concept] resolve: archetype=ooze type=Ooze typeFrom=the route call themes=amorphous/devouring mind=mindless style=— energy=Acid mix=energy identity=✓ lore=✓
[reskin] mind tier held: INT stays 2 against "feeble" — the call read this creature as mindless, and the card's 2 is already that dim
[reskin] mind tier held: CHA stays 1 against "feeble" — the card's 1 is already feeble
[reskin] mind tier: WIS 8 -> 15 — the call read this creature as capable at CR 9
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> A cathedral-vault ooze seeps down the nave as a slow, greasy rot that spreads across the flagstones and rears into a vaulting column of itself to swallow whole reliquaries — and anyone clutching one. Every round it engulfs what it can reach, its rot dissolving gold, bone, and lacquer alike while it drags the sanctified mass down into its body, and wounded, it simply collapses into the cracks of the crypt to ooze back up elsewhere, patient and relentless rather than clever.

**`[concept] lore:`**, uncut

> It grew from spilled chrism and generations of decay in a sealed reliquary vault, and it wants only to take the holy dead into itself, one shrine at a time.

**Every attack row**
```
(no attack row)
```

```
Chrismal Ossuary
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

	

1 (-5)

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

Fouling Residue.A space the ossuary moves through becomes difficult terrain for 1 hour, and any object of gold, bone, silver, or lacquer left in that space is destroyed within the hour.
Amorphous.The ossuary can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form.A creature that touches the ossuary or hits it with a melee attack while within 5 feet of it takes 9 (2d8) acid damage.
Spider Climb.The ossuary can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The ossuary makes two Engulfing Pseudopod attacks.
Engulfing Pseudopod: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 11 (2d10) acid damage.
Reliquary Swallow (Recharge 5-6): One creature within 10 feet must make a DC 15 Dexterity saving throw, taking 27 (6d8) acid damage on a failed save. On a failed save, the target is restrained until the end of its next turn.
```

---

## 31. Thunderhead Drake — CR 7

**Input:** `a young storm drake whose breath is a rolling wall of thunder`
**Donor:** dragon-2 -> CR 7
**Signature:** dropped · **elapsed** 2s

**Type line:** `Large Dragon, Chaotic Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a young storm drake whose breath is a rolling wall of thunder" (call)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | dragon: ✓ ("a young storm drake whose breath is a ro") | dragon: key "drake" (class body)
[concept] resolve: archetype=dragon type=Dragon typeFrom=the route call themes=draconic/breath mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[reskin] mind tier: INT 12 -> 15 — the call read this creature as capable at CR 7
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 7
[reskin] mind tier: CHA 14 -> 18 — the call read this creature as formidable at CR 7
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> The storm drake opens by climbing above the fray and letting its thunder-wall breath roll downhill through the enemy line, scattering formations before it ever lands a claw. Each round after, it stoops to bite and rake a broken straggler, then beats back up out of reach to line up another rolling peal. Under pressure it fights to the death, roaring louder as it bleeds — a young drake that has not yet learned fear.

**`[concept] lore:`**, uncut

> Hatched in the squall-clouds that roost on high crags, a storm drake rides the front edge of every thunderstorm, claiming the rolling boom as its own voice and the lightning-lit valley as its hunting ground.

**Every attack row**
```
Bite. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.
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

Stormfront Sense. While the thunderhead drake is airborne and above every enemy within sight, the drake has Advantage on Perception checks, and creatures that can hear it have Disadvantage on Perception checks made to track it through the storm it brings.

Actions

Multiattack. The thunderhead drake makes two Bite attacks.

Bite. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.

Rolling Peal (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

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

## 32. Pass-Father Grondel — CR 9

**Input:** `a stone giant exile who speaks only Giant and understands no Common`
**Donor:** brute-9 -> CR 9
**Signature:** library · **elapsed** 2s

**Type line:** `Huge giant, neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Stone Giant (is) — "stone giant" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("a stone giant exile") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant typeFrom=the route call themes=elemental/bestial mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> A mountain of scarred stone-flesh that answers strangers only in Giant, the exile closes ground in a flat, unhurried charge and swings a chunk of broken cliff like a club until the fight is over. Each round it trades blows deliberately, shrugging off hits that would fell smaller things, and it hurls loose boulders at anyone who tries to skirmish out of reach. It does not flee and does not toy — bloodied, it plants its feet, digs in, and grinds the fight down to whoever is left standing. That it cannot understand Common never softens it: it reads intent from stance and sound, so a shouted parley buys only the time it takes to close.

**`[concept] lore:`**, uncut

> Cast out of its clan's caves for some forgotten stone-law transgression, this exile wanders the high passes and scree fields, seeking either a way to earn a place back or a death heavy enough to be worth remembering.

**Every attack row**
```
(no attack row)
```

```
Pass-Father Grondel
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

Stone Splinters.When Grondel takes bludgeoning, piercing, or slashing damage from a melee attack, the attacker takes 14 (4d6) piercing damage as stone splinters bite into them.
Deflect Missile (Recharge 5-6) (Reaction).When Grondel is hit by a ranged attack roll and takes Bludgeoning, Piercing, or slashing damage from it, Grondel reduces the damage it takes from the attack by 11 (1d10 + 6), and if that damage is reduced to 0, Grondel can redirect some of the attack's force. One creature Grondel can see within 60 feet must make a DC 18 Dexterity saving throw, taking 11 (1d10 + 6) force damage on a failed save.

Actions
Multiattack: Grondel makes two attacks: one with Stone Club and one with Boulder.
Stone Club: Melee Weapon Attack: +10 to hit, reach 15 ft., one target. Hit: 28 (5d8 + 6) bludgeoning damage.
Boulder: Ranged Weapon Attack: +10 to hit, range 60/240 ft., one target. Hit: 24 (4d8 + 6) bludgeoning damage.
```

---

## 33. Steamclaw Ascetic — CR 5

**Input:** `lizardfolk monk`
**Donor:** defender-5 -> CR 5
**Signature:** dropped · **elapsed** 2s

**Type line:** `Medium humanoid, neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: lizardfolk monk — A scarred lizardfolk ascetic who reads an opponent's stance before the first blow and answers it with a chain of drilled, bone-hard strikes — tailsweep, elbow, claw — that flow into one another without pause. Every round it keeps the pressure on, stepping into the reach of larger f
[concept] expansion answered: type=Humanoid (type_source=?) material=bone size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: —
[path] class_npc — class monk — species lizardfolk — "monk" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("stepping into the reach of larger foes t") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=bestial/uncanny mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Tail Lash), Patient Defense (patient-defense)
[reskin] class weapon: Actions/"Shortsword" -> "Unarmed Strike" — a monk fights with its hands, not the Spy's; the body's rider folds in (+7)
[reskin] class weapon: "Dart" rolls Dexterity — a launcher is DEX in print: +6 -> +5
[reskin] class weapon: Actions/"Hand Crossbow" -> "Dart" — a monk fights with a dart, not the Spy's
```

**`[concept] identity:`**, uncut

> A scarred lizardfolk ascetic who reads an opponent's stance before the first blow and answers it with a chain of drilled, bone-hard strikes — tailsweep, elbow, claw — that flow into one another without pause. Every round it keeps the pressure on, stepping into the reach of larger foes to deny them their strength and parrying claws and blades off its scaled forearms. It fights with cold patience, never taunting, and yields ground only when the fight is truly lost — a disciplined survivor, not a butcher.

**`[concept] lore:`**, uncut

> Raised in a marsh-side cloister of scalding steam-vents, this lizardfolk abandoned its tribe's crude raiding to master an old, silent order of unarmed discipline, and now walks the world testing its forms against any warrior worth the lesson.

**Every attack row**
```
(no attack row)
```

```
Steamclaw Ascetic
Medium humanoid, neutral
Armor Class

18

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

Hold Breath.The ascetic can hold its breath for 15 minutes.
Patient Defense (Bonus Action).The ascetic takes the Dodge action.

Actions
Multiattack: The ascetic makes two attacks: one with its Unarmed Strike and one with its Dart.
Unarmed Strike: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage. Once on each of the ascetic's turns when it hits with this attack, the target is subjected to the following effect. The target must make a DC 14 Constitution saving throw. On a failed save, the target is stunned until the end of the ascetic's next turn.
Dart: Ranged Weapon Attack: +5 to hit, range 20/60 ft., one target. Hit: 15 (3d8 + 2) piercing damage.
```

---

## 34. Krennik Skullstandard — CR 4

**Input:** `name: Krennik Skullstandard | riding a worg`
**Donor:** skirmisher-3-mounted -> CR 4 (invented — no printed peer)
**Signature:** library · **elapsed** 2s

**Type line:** `Medium humanoid, neutral evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "riding a worg" (call)
[route] skirmisher-mounted type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=armed/terror mind=sapient style=mounted energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: CHA stays 8 against "ordinary" — the card's 8 is already ordinary
[reskin] mind tier: INT 8 -> 15 — the call read this creature as capable at CR 4
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 4
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> Krennik opens a fight by putting his worg into a full gallop and riding down the nearest foe, his skull-topped standard shrieking overhead as the beast's jaws snap past; he hits, carries through, and turns wide to line up a second pass rather than ever standing to trade. Under pressure he circles at range, using the worg's speed and his standard's din to break formation and pick off the stragglers, and he flees mounted only when the beast falls under him.

**`[concept] lore:`**, uncut

> A sellsword captain who sold his warband's souls to a goblin-market warlock for a banner that never lets its bearer retreat, Krennik now rides the border roads collecting the tolls his standard demands.

**Every attack row**
```
(no attack row)
```

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

	

15 (+2)

	

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

Skull Standard's Din.While Krennik is mounted and not Incapacitated, any enemy that starts its turn within 30 feet of Krennik and can see the standard has disadvantage on Opportunity Attacks made against Krennik or his mount.
Running Pass.Krennik ignores Difficult Terrain, and Opportunity Attacks against it are made with disadvantage.
Mounted Agility (Bonus Action).Krennik takes the Dash or Disengage action.

Actions
Multiattack: Krennik makes two attacks, using Saber or Javelin. It can replace one attack with a use of Skull Standard Cry.
Saber: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is knocked prone.
Javelin: Ranged Weapon Attack: +5 to hit, range 30/120 ft., one target. Hit: 6 (1d6 + 3) piercing damage.
Galloping Charge (Recharge 5-6): Krennik moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters must make a DC 13 Dexterity saving throw, taking 24 (7d6) bludgeoning damage on a failed save. On a failed save, the target is knocked prone.
Skull Standard Cry: Each creature of Krennik's choice in a 30-foot radius originating from Krennik that can see or hear it must make a DC 13 Wisdom saving throw. On a failed save, the target is frightened until the end of its next turn. On a successful save, the target is immune to this creature's terror for 24 hours.
```

---

## 35. Well-Drowned — CR 5

**Input:** `name: the thing in the well | `
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 2s

**Type line:** `Medium Aberration, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: the thing in the well — It opens a fight by calling from the dark below, its voice stealing down the well-shaft to lure the thirsty into leaning too far over the stones; then it surges up the wet masonry on hooked brine-slick limbs to seize and drag its victim down into the black water. Every round
[concept] expansion answered: type=Aberration (type_source=inferred) material=brine size=Large mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: grapple
[path] homebrew — "the thing in the well" (call)
[route] brute-grappler type=Aberration mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but quoted "surges up the wet masonry on h", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("seize and drag its victim down into the ") | brute-grappler: key "seize" (class verb)
[concept] resolve: archetype=brute type=Aberration typeFrom=the route call themes=aquatic/grasping mind=sapient style=grappler energy=Cold mix=both identity=✓ lore=✓
[reskin] mind tier: INT 4 -> 15 — the call read this creature as capable at CR 5
[reskin] mind tier: WIS 10 -> 18 — the call read this creature as formidable at CR 5
[reskin] mind tier: CHA 4 -> 15 — the call read this creature as capable at CR 5
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> It opens a fight by calling from the dark below, its voice stealing down the well-shaft to lure the thirsty into leaning too far over the stones; then it surges up the wet masonry on hooked brine-slick limbs to seize and drag its victim down into the black water. Every round after it retreats a little, coiling in the deep and striking only when a head or hand comes near, patient and certain that anything at the rim must eventually come to the water.

**`[concept] lore:`**, uncut

> Something drowned in the old well and never rose, and now it reaches up through the water only to pull down anyone who comes to draw or to listen.

**Every attack row**
```
Brine Hook. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Piercing damage plus 7 (2d6) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.
```

```
Well-Drowned

Medium Aberration, Neutral

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
18
+4
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

Skills Athletics +6, Perception +7

Immunities Cold

Senses darkvision 60 ft.; Passive Perception 17

Languages Common

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The well-drowned makes two Brine Hook attacks. It can replace one attack with a use of Drowning Hymn.

Brine Hook. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Piercing damage plus 7 (2d6) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Drowning Hymn. Strength Saving Throw: DC 13, each creature in a 60-foot Emanation originating from the well-drowned. Failure: The target is pulled up to 15 feet straight toward the well-drowned, and the target has the Frightened condition until the end of its next turn.

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
**Signature:** library · **elapsed** 3s

**Type line:** `Large humanoid, chaotic neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Lizardfolk (is) — class barbarian — species lizardfolk — "lizard folk" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("Wields a greataxe two-handed") | brute -> skirmisher-hurler: the concept's VERB outranks the noun (key "throw", class verb) | skirmisher-hurler: key "throw" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=bestial/terror mind=sapient style=hurler energy=Thunder mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: WIS stays 14 against "capable" — the card's 14 is already capable
[reskin] mind tier: CHA 10 -> 18 — the call read this creature as formidable at CR 8
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> Meshrin opens by roaring — a bone-shaking challenge that freezes the nerve of anyone in earshot — then hurls his javelin to drop a runner before closing with the greataxe in a red haze. Every round after that he is a storm of rage: he presses the nearest foe, shrugs off wounds that would drop a lesser warrior, and lets the axe speak. Under pressure he does not withdraw; he goes deeper into the rage, fighting to the death and dragging down as many as he can.

**`[concept] lore:`**, uncut

> A river-war veteran of the lizardfolk raiding bands, Meshrin dipped his blades in blood and his spirit in fury until he grew too large for the marsh and too loud for any chief to command — now he marches alone, screaming for a worthy fight.

**Every attack row**
```
(no attack row)
```

```
Meshrin
Large humanoid, chaotic neutral
Armor Class

16 (breastplate)

Hit Points: 

120 (14d10 + 42)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

18 (+4)

	

16 (+3)

	

10 (+0)

	

14 (+2)

	

18 (+4)

Skills: 

Perception +5, Stealth +7

Saving Throws: 

DEX +7, WIS +5

Senses: 

passive Perception 15

Languages: 

Common, Draconic

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Barbarian Rage.While Meshrin is not wearing heavy armor, it can enter a rage as a Bonus Action, while raging, Meshrin's attacks deal an extra 7 (2d6) damage of the weapon's type and it has advantage on Strength checks and saves.
Hold Breath.Meshrin can hold its breath for 15 minutes.
Great Weapon Master.When Meshrin hits a creature with its Greataxe, the attack deals an extra 3 damage.
Marsh Stride.Difficult Terrain composed of mud doesn't cost Meshrin extra movement, and Meshrin can move across mud without needing to make an ability check.
Fleet Agility (Bonus Action).Meshrin takes the Dash or Disengage action.
Binding Mark (Bonus Action).One creature within 30 feet must make a DC 15 Wisdom saving throw. On a failed save, until the start of Meshrin's next turn, the target has disadvantage on attack rolls against creatures other than Meshrin.

Actions
Multiattack: Meshrin makes three attacks, using Greataxe or Javelin.
Greataxe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (2d12 + 4) slashing damage.
Javelin: Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 18 (4d6 + 4) piercing damage.
Terror Roar (Recharge 5-6): One creature within 30 feet must make a DC 15 Wisdom saving throw. On a failed save, the target is frightened until the end of its next turn.
```

---

## 38. Unyielded Champion — CR 6

**Input:** `a skeleton with a greatsword`
**Donor:** brute-5 -> CR 6
**Signature:** library · **elapsed** 2s

**Type line:** `Medium Undead, Lawful Evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a skeleton with a greatsword
[path] twist — Skeleton (is) — "skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead typeFrom=the route call themes=grave/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
[reskin] multiattack re-read — "Shortbow" joins the combination; "The champion makes two attacks, using Greatsword or Shortbow in any combination."
```

**`[concept] identity:`**, uncut

> It opens the fight with a two-handed overhead cut from a dead stop, its silence the only warning a player gets, then keeps up a relentless hewing rhythm — step, cleave, reset — trading blows it has no flesh to lose. It never flinches, never tires and never feints; it simply advances, and only the total collapse of its frame will stop the greatsword's arc.

**`[concept] lore:`**, uncut

> A champion who swore to win a duel then died before the terms were met, the skeleton stands where the field was and keeps fighting the same fight against anyone who crosses it, unwilling to admit the contest is over.

**Every attack row**
```
Greatsword. Melee Attack Roll: +7, reach 5 ft. 21 (5d6 + 4) Slashing damage.
Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 16 (3d8 + 3) Piercing damage.
```

```
Unyielded Champion

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

Closing Blade. While the champion is moving toward a creature it has damaged within the last 24 hours, the champion's Speed can't be reduced and Difficult Terrain doesn't cost it extra movement.

Great Weapon Master. When the champion hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The champion makes two attacks, using Greatsword or Shortbow in any combination.

Greatsword. Melee Attack Roll: +7, reach 5 ft. 21 (5d6 + 4) Slashing damage.

Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 16 (3d8 + 3) Piercing damage.

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

## 39. Orrin Sable — CR 5

**Input:** `a sellsword who hurls a handaxe and closes with a shortsword`
**Donor:** skirmisher-8-hurler -> CR 5 (invented — no printed peer)
**Signature:** library · **elapsed** 2s

**Type line:** `Medium humanoid, neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class fighter — "sellsword" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-hurler: ✓ ("hurls a handaxe") | skirmisher-hurler: key "hurls" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: fighter — "sellsword": Riposte (riposte)
```

**`[concept] identity:`**, uncut

> The sellsword opens by hurling a handaxe from just outside reach, then uses the moment the enemy flinches or closes to rush in with a shortsword and finish the exchange at arm's length. Every round thereafter it dances between the two distances — throw, step in, cut, peel back — reading the opponent and refusing to stay planted. It is a paid fighter, not a fanatic: once bloodied it looks for an angle to withdraw and live to collect, but it will spend every trick it has before conceding ground.

**`[concept] lore:`**, uncut

> A down-on-his-luck blade from the trade roads, this sellsword takes contracts no banner company will and wants nothing more than to walk away from the fight with his purse and his hide intact.

**Every attack row**
```
(no attack row)
```

```
Orrin Sable
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

Find the Angle.When Orrin hits a creature within 5 feet of it with a Handaxe attack, Orrin can move up to 10 feet without provoking an Opportunity Attack from that creature.
Riposte (Reaction).When a creature within 5 feet of Orrin misses it with a melee attack roll, Orrin makes one Handaxe attack against that creature.
Parry (Reaction).When Orrin is hit by a melee attack roll while holding a weapon, Orrin adds 3 to its AC against that attack, possibly causing it to miss.

Actions
Multiattack: Orrin makes three Handaxe attacks. It can replace one attack with a use of Shortsword.
Handaxe: Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) slashing damage, and Orrin has advantage on its next attack roll against the target before the end of its next turn.
Shortsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage.
Shield Bash: One creature within 5 feet that Orrin can see must make a DC 15 Strength saving throw, taking 9 (2d4 + 4) bludgeoning damage on a failed save. On a failed save, if the target is a Medium or smaller creature, it is knocked prone.
```

---

## 40. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** defender-3 -> CR 3
**Signature:** library · **elapsed** 1s

**Type line:** `Medium humanoid, neutral` — **set by** fix A/E (a person with no named body)

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Brother Halric — Brother Halric was a village healer who poisoned his own flock and rose as a plague-bearing revenant wrapped in soiled grave-wrappings, and he opens a fight with a wet, contagion-laden lunge that leaves the wound putrid. Every round after he works the fight like a shepherd — herding
[concept] expansion answered: type=Undead (type_source=inferred) material=grave size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: aura
[path] class_npc — class cleric — "Brother" (call)
[route] defender-leader type=Undead mechanics=aura — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but quoted "pressing the sick with rotting", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("works the fight like a shepherd — herdin") | lurker-phantom: the call read "revenant" as not meaning that mechanic here — no override | defender-leader stands: every key that would override it was read as a figure of speech | defender-leader: no line key in the words — the model's read of its quote
[concept] type settled: Undead -> Humanoid — the GM's words are a name and the class word and nothing else, and a person with no named body is a Humanoid (owner's ruling, 2026-11-15, widened 2026-11-16); the route call had answered Undead
[concept] resolve: archetype=defender type=Humanoid typeFrom=fix A/E (a person with no named body) themes=grave/mind mind=sapient style=leader energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Brother": nothing to add — the sheet already answers it
[reskin] class weapon: "mace" already names a row on this body — no row is renamed to it (fix F: one name, one row)
```

**`[concept] identity:`**, uncut

> Brother Halric was a village healer who poisoned his own flock and rose as a plague-bearing revenant wrapped in soiled grave-wrappings, and he opens a fight with a wet, contagion-laden lunge that leaves the wound putrid. Every round after he works the fight like a shepherd — herding foes into narrow ground, then pressing the sick with rotting hands while muttering diagnoses of their sin — and he does not break and run; bloodied, he retreats only to reposition, patient and didactic to the last, treating the fight as a sermon that must be finished.

**`[concept] lore:`**, uncut

> Halric tended the sick until he began deciding who deserved to live, and now he walks the plague-road looking for congregations to 'heal' — his touch spreads the very rot that killed his village.

**The Spellcasting row, in full**
```
Spellcasting: Brother Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
```

**Every attack row**
```
(no attack row)
```

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

Seeping Wrappings.A creature that grapples Brother Halric or is grappled by it is poisoned until the end of its next turn.
Divine Aid (3/Day) (Bonus Action).Brother Halric casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Brother Halric makes two attacks: one with Mace and one with Radiant Flame.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage. Until the end of Brother Halric's next turn, Brother Halric has advantage on attack rolls against the target, and the target can't take the Hide action.
Spellcasting: Brother Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
```


# Arm "high" — 38 sheets

only the findings marked high kept — the engine rule, with the audit's roll held still. **0 threw, 0 timed out.**

`smoke-out/arm-high-2026-11-16T21-44-22`

---

## 01. Dire Wolf — CR 1

**Input:** `name: Dire Wolf | with a frost-rimed hide`
**Donor:** skirmisher-1 -> CR 1
**Signature:** library · **elapsed** 2s

**Type line:** `Large Beast, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher: ✓ ("Dire Wolf") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause and the call did not claim one, so "fire" is a guess from what the creature is, not the GM's ask
[concept] resolve: archetype=skirmisher type=Beast typeFrom=the route call themes=bestial mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> A frost-rimed dire wolf opens with a bounding rush from the flank, its packmates fanning wide before it darts in to tear at a hamstring and wheels back out of reach, rime flaking from its hide in its wake. It circles and re-commits every round, never standing and trading, and its cold breath and crusted coat make each close pass cost the prey a little more speed than the last. Pressed and bloodied, it does not break — it falls back toward the pack, letting the boldest of its kin soak the attention while it lines up the next run.

**`[concept] lore:`**, uncut

> Frost-rimed dire wolves den in the blue shadow of glaciers, and a pack that has fed on nothing but frozen carrion for a winter grows a hide of living rime that it uses to run down anything warm enough to be worth the chase.

**Every attack row**
```
Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.
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

Crusted Wake. A creature starts its turn within 5 feet of the wolf, rime crusts the ground around that creature, reducing its Speed by 10 feet until the end of its turn.

Pack Tactics. The wolf has Advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

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
**Signature:** library · **elapsed** 2s

**Type line:** `Medium beast, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a mud-caked bog hound that drags fishermen under" (call)
[route] brute-grappler type=Beast mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape: grip on the GM's own words "drags fishermen under" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("drags fishermen under") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Beast typeFrom=the route call themes=grasping/aquatic mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 1
[reskin] mind tier: CHA 4 -> 10 — the call read this creature as ordinary at CR 1
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> The bog hound waits half-submerged at the water's edge, mud-caked hide indistinguishable from the bank, then lunges to seize a fisherman's leg in its jaws and drags him thrashing into the silt. Every round after, it does not let go — it plants its heavy body, hauls backward toward deeper water, and holds prey under until it stops fighting. It is a pure ambush predator that will not abandon a grabbed kill; wounded, it tightens its grip and sinks rather than flee.

**`[concept] lore:`**, uncut

> Born in the choked shallows where drowned fishermen are buried in silt, a bog hound is a hunger that learned to wear the riverbank as a coat, and it wants only to add another body to the mud.

**Every attack row**
```
(no attack row)
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

Mud-Caked Hide.While the bog hound remains motionless, it is indistinguishable from the mud or riverbank it lies in.

Actions
Multiattack: The bog hound makes two Bite attacks. It can replace one attack with a use of Mud Sweep.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While Grappled, the target is restrained.
Mud Sweep: Each creature in a 15-foot cone must make a DC 13 Strength saving throw. On a failed save, the target is pushed up to 15 feet away from the bog hound and is knocked prone.
```

---

## 03. Owlbear — CR 3

**Input:** `name: Owlbear | that has learned to climb`
**Donor:** skirmisher-3 -> CR 3
**Signature:** library · **elapsed** 1s

**Type line:** `Large monstrosity, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: Owlbear — that has learned to climb
[path] twist — Owlbear (is) — "Name field: Owlbear" (code)
[route] skirmisher type=Monstrosity mechanics=none — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but offered no quote | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher: ✓ ("that has learned to climb") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Monstrosity typeFrom=the route call themes=bestial/aerial mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> An owlbear that has learned to climb opens from above, dropping off a trunk or ledge onto prey with crushing weight before raking and withdrawing up the nearest vertical surface. Every round it circles at height, feints a drop to scatter the group, then commits when one target is isolated and bleeding. Under pressure it does not flee — it climbs out of reach, waits, and descends again, patient and vindictive.

**`[concept] lore:`**, uncut

> Hatched in a forest of tall pines and stone bluffs, this owlbear learned that the canopy is a hunting ground and now claims the vertical wilderness as its own, taking prey that forgets to look up.

**Every attack row**
```
(no attack row)
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
Multiattack: The owlbear makes two Rend attacks. It can replace one attack with a use of Crashing Pounce.
Rend: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.
Crashing Pounce: The owlbear spends 5 feet of movement to jump to a space within 15 feet that contains one or more Large or smaller creatures. Each creature in the destination space must make a DC 15 Dexterity saving throw, taking 11 (2d10) slashing damage on a failed save, or half as much damage on a successful one. On a failed save, the target is knocked prone.
```

---

## 04. Chapel Bell-Ringer — CR 3

**Input:** `a chapel bell-ringer's ghost that tolls for the dying`
**Donor:** lurker-2 -> CR 3
**Signature:** library · **elapsed** 3s

**Type line:** `Medium Undead, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Ghost (is) — "ghost" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-phantom: ✓ ("a chapel bell-ringer's ghost") | lurker-phantom: key "ghost" (class body)
[concept] resolve: archetype=lurker type=Undead typeFrom=the route call themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> The bell-ringer's ghost opens by tolling its spectral bell, marking the living as dying and draining vitality from those who hear it. Every round after, it drifts through walls to stay at the edge of light, swinging its heavy bell-clapper on a chain to strike and stun those who try to flee its knell. It fights to the death with the grim patience of one who has already died once, never fleeing but fading into shadows only to return when the light fails.

**`[concept] lore:`**, uncut

> Killed when the chapel bell crushed him during a storm, the ringer's spirit now tolls for anyone whose time it believes has come, dragging them toward the grave by ringing their death even before they fall.

**Every attack row**
```
Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.
```

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

Ethereal Sight. The chapel bell-ringer can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The chapel bell-ringer can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The chapel bell-ringer makes two Withering Touch attacks. It can replace one attack with a use of Grave Knell.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Grave Knell. Constitution Saving Throw: DC 13, one creature within 30 feet. Failure: 7 (2d6) Necrotic damage, and the chapel bell-ringer regains Hit Points equal to half the damage dealt.

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

---

## 05. Air Elemental — CR 5

**Input:** `name: Air Elemental | that carries stolen voices`
**Donor:** brute-5 -> CR 5
**Signature:** library · **elapsed** 1s

**Type line:** `Large Elemental, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Air Elemental (is) — "Name field: Air Elemental" (code)
[route] brute-juggernaut type=Elemental mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("Air Elemental") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental typeFrom=the route call themes=elemental/voice mind=sapient style=juggernaut energy=Thunder mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> The Air Elemental opens by swelling into a howling vortex and loosing a chorus of stolen voices—screams, pleas, and taunts torn from past victims—so the battlefield is drowned in sound before it ever strikes. Every round after, it lashes with compressed air that carries those same voices as a psychic shriek, hammering bodies and nerves at once while it drifts and reforms around blows. Under pressure it does not retreat—it remembers every voice it took and grows more savage, throwing the loudest of them at the prey that hurt it, fighting to the last because a voice lost is a self diminished.

**`[concept] lore:`**, uncut

> An air elemental that drifted through a massacre and swallowed every dying sound, it now hunts the living to fill its hollow chorus with one more voice—and will not rest until every scream in its keeping has been answered.

**Every attack row**
```
Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.
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

Echo of the Stolen Chorus. Whenever it is struck by a creature, the wound releases the loudest stolen voice it holds as a shrieking echo, and until the end of the elemental's next turn, any creature that dealt it damage has Disadvantage on its next attack roll as the scream claws at its nerves. The voice is spent and lost from the chorus.

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

---

## 06. Scree Pit — CR 5

**Input:** `a quarry-pit thing of living scree that buries what it catches`
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 5s

**Type line:** `Large elemental, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a quarry-pit thing of living scree that buries what it catches" (call)
[route] brute-grappler type=Elemental mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape: contain on the GM's own words "burles what it catches" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("buries what it catches") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental typeFrom=the route call themes=elemental/subterranean mind=mindless style=grappler energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as mindless, and the card's 4 is already that dim
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> A pit of living scree that hauls itself up out of abandoned quarry floors, opening with a grinding lunge to seize a victim in its gravel limbs and drag them down into the loose stone at its base; every round after, it constricts and endlessly pours scree over the caught, piling weight until the prey is buried. It is a patient, mindless grave that never retreats — only stone left after quarrymen moved on, wanting nothing but more rubble to swallow.

**`[concept] lore:`**, uncut

> Born when the spilled spoil of a worked-out quarry grew long enough to remember every stone that fell into it, the scree-pit haunts the pit's own floor, endlessly dragging new rubble — and new bodies — into its hoard of buried things.

**Every attack row**
```
(no attack row)
```

```
Scree Pit
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

Entomb (Bonus Action).The scree pit entombs one Medium or smaller creature it is grappling. While entombed, the target is blinded and restrained, has Total Cover against attacks and other effects outside the scree pit, and takes 7 (2d6) bludgeoning damage at the start of each of the scree pit's turns. The scree pit can have only one creature entombed at a time. If the scree pit takes 15 damage or more in a single turn from the entombed creature, the scree pit must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the scree pit. If the scree pit dies, an entombed creature breaks free prone by using 5 feet of movement.

Actions
Multiattack: The scree pit makes two Scree attacks. It can replace one attack with a use of Stone Flood.
Scree: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained.
Stone Flood: Each creature in a 30-foot cone must make a DC 14 Strength saving throw. On a failed save, the target is pulled up to 10 feet straight toward the scree pit, and the target is knocked prone.
```

---

## 07. Hydra — CR 8

**Input:** `name: Hydra | whose stumps smoke instead of regrowing`
**Donor:** brute-5 -> CR 8
**Signature:** library · **elapsed** 5s

**Type line:** `Huge monstrosity, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Hydra (is) — "Name field: Hydra" (code)
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-regenerator: ✓ ("stumps smoke instead of regrowing") | brute-regenerator: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause and the call did not claim one, so "fire" is a guess from what the creature is, not the GM's ask
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=venomous/terror mind=bestial style=regenerator energy=Poison mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> A hydra whose cauterized stumps vent scalding caustic smoke rather than regrowing heads — each severed neck becomes a smoking wound that keeps closing and splitting around the blade. It wades in low and wide, sweeping its remaining heads in a many-angled rush and letting attackers choke on the plumes it trails, absorbing punishment as its flesh stitches shut. It is a hateful, patient hunter that does not tire or flee; it only fights harder as it is cut, because every wound is another furnace lit.

**`[concept] lore:`**, uncut

> Sparked in a marsh where brimstone seeps through drowned peat, this hydra's blood turned to caustic vapor, and it now broods in the reeds waiting to bathe intruders in its own burning breath.

**Every attack row**
```
(no attack row)
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

Hold Breath.The hydra can hold its breath for 1 hour.
Multiple Heads.The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead.
Reactive Heads.For each head the hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks.

Actions
Multiattack: The hydra makes as many Bite attacks as it has heads.
Bite: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.
Caustic Vapor (Recharge 5-6): Each creature in a 30-foot cone must make a DC 16 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one. On a failed save, the target is blinded until the end of its next turn.
```

---

## 08. Orchard Ram-Golem — CR 8

**Input:** `a siege-engine golem of lashed timber that shoulders through walls`
**Donor:** brute-5-juggernaut -> CR 8
**Signature:** library · **elapsed** 3s

**Type line:** `Large Construct, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a siege-engine golem of lashed timber that shoulders through walls" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("siege-engine golem of lashed timber") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=forged/terror mind=mindless style=juggernaut energy=Thunder mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 6 against "feeble" — the call read this creature as mindless, and the card's 6 is already that dim
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> A lashed-timber siege golem that opens by shouldering straight through the nearest wall, showering splinters and stone on whoever sheltered behind it, then pivots to pound the defenders it just exposed. Every round it advances along the shortest line to the biggest obstruction, splintering doors, barricades, and load-bearing walls and swinging its battering bulk at anything that gets in the way. It has no fear and no retreat — a mindless engine that only stops when its timber is broken apart.

**`[concept] lore:`**, uncut

> Built by a besieging army from felled orchards and iron banding, the ram-golem was left behind half-animated when the siege lifted, and it still walks the ruined walls trying to reach a gate that is no longer there.

**Every attack row**
```
Timber Ram. Melee Attack Roll: +8, reach 5 ft. 14 (2d8 + 5) Bludgeoning damage plus 11 (2d10) Thunder damage.
```

```
Orchard Ram-Golem

Large Construct, Unaligned

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

Immunities Poison, Thunder; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Understands the languages of its creator but can't speak

CR 8 (XP 3,900; PB +3)

Traits

Thunder Absorption. Whenever the ram-golem is subjected to Thunder damage, it takes no damage and instead regains a number of Hit Points equal to the Thunder damage dealt.

Immutable Form. The ram-golem can't shape-shift.

Magic Resistance. The ram-golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The ram-golem makes two Timber Ram attacks.

Timber Ram. Melee Attack Roll: +8, reach 5 ft. 14 (2d8 + 5) Bludgeoning damage plus 11 (2d10) Thunder damage.

Trample (Recharge 5-6). The ram-golem moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Dexterity Saving Throw: DC 16. Failure: 27 (6d8) Thunder damage, and the target has the Prone condition. Success: Half damage only.

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
**Signature:** dropped · **elapsed** 2s

**Type line:** `Large Construct, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Stone Golem (is) — "Name field: Stone Golem" (code)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("carved as a weeping saint") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=grave/forged mind=sapient style=juggernaut energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> The Weeping Saint opens by walking in a straight line through whatever the party hides behind, stone fists swinging with the slow, terrible certainty of a falling cathedral, while tears of wet mortar streak its carved cheeks. Every round it advances on the most faithful-looking target first — the one kneeling, praying, or holding a holy symbol — and beats the ground into rubble around it, never breaking stride. It does not flee and it does not gloat; it endures, patient as stone, until every supplicant is still.

**`[concept] lore:`**, uncut

> A cathedral mason carved a saint to weep for the sins of a dying town, and when the town began to worship the statue's tears instead of its god, the stone answered the prayer wrongly and rose to make mourning permanent.

**Every attack row**
```
Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.
Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.
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

Weeping Saint. While the stone golem remains motionless, it is indistinguishable from a carved weeping saint.

Immutable Form. The stone golem can't shape-shift.

Magic Resistance. The stone golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The stone golem makes two attacks, using Slam or Force Bolt in any combination.

Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.

Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.

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

---

## 10. Drowned Choir — CR 10

**Input:** `a drowned cathedral choir that sings in one voice`
**Donor:** lurker-8 -> CR 10
**Signature:** library · **elapsed** 2s

**Type line:** `Medium undead, neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a drowned cathedral choir that sings in one voice" (call)
[route] lurker type=Undead mechanics=aura — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-phantom: a Huge body is not incorporeal — print's incorporeals are Medium and smaller | swarm: a swarm is a mass of many — the call reads one creature, not a mass | fell to lurker's plain line | lurker: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause and the call did not claim one, so "radiant" is a guess from what the creature is, not the GM's ask
[concept] resolve: archetype=lurker type=Undead typeFrom=the route call themes=grave/aquatic mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[reskin] mind tier: INT 13 -> 15 — the call read this creature as capable at CR 10
[reskin] mind tier: WIS 14 -> 20 — the call read this creature as formidable at CR 10
[reskin] mind tier: CHA 11 -> 20 — the call read this creature as formidable at CR 10
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> It waits submerged and silent in the flooded nave until prey is within the choir's reach, then breaks the water in a single choral strike that hits as one drowning voice — salt-thick sound and grave-cold pressure arriving together. Every round after, it circles half-seen beneath the surface, answering attacks with staggered phrases of the same hymn so each note lands as a blow until its target's breath and footing give way, and under pressure it will sink into the flooded dark to re-form the chord before striking again rather than trade blows. It does not flee in panic; it withdraws the way a conductor quiets an orchestra — only to bring the full volume back where the enemy is weakest.

**`[concept] lore:`**, uncut

> When the cathedral drowned, its choir kept its final note, and the congregation of dead singers still believes the service is unfinished, dragging the living under the water to fill the empty stalls.

**Every attack row**
```
(no attack row)
```

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

darkvision 60 ft., passive Perception 19

Languages: 

Common plus the languages it knew in life

Challenge

10 (5,900 XP)

Proficiency Bonus:

+4

Umbral Step (Bonus Action).While in Dim Light or Darkness, the choir takes the Hide action.

Actions
Multiattack: The choir makes three Grave-Chill Voice attacks. It can replace one attack with a use of Drowning Chord.
Grave-Chill Voice: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage plus 7 (2d6) necrotic damage.
Drowning Chord: Each creature of the choir's choice in a 60-foot radius originating from the choir that can see or hear the choir must make a DC 15 Wisdom saving throw. On a failed save, the target is charmed until the start of the choir's next turn, and while charmed this way, it must move toward the choir by the safest available route on its turn and can't take Reactions. On a successful save, the target is immune to this creature's lure for 24 hours.
```

---

## 11. Vampire — CR 13

**Input:** `name: Vampire | who keeps a garden of thorns`
**Donor:** lurker-13 -> CR 13
**Signature:** library · **elapsed** 2s

**Type line:** `Medium undead, lawful evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Vampire (is) — "Name field: Vampire" (code)
[route] lurker type=Undead mechanics=snare — casts: the call reads no worked magic here | hold_shape: reach on the GM's own words "keeps a garden of thorns" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-trap: ✓ ("keeps a garden of thorns") | lurker-trap: no line key in the words — the model's read of its quote | lurker-trap -> lurker: a trap is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] resolve: archetype=lurker type=Undead typeFrom=the route call themes=grave/grasping mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> A bloodless gardener-vampire who moves unseen among its thorn hedges and opens with a single impaling strike from the brambles before melting back into cover. Each round thereafter it circles, prunes, and re-enters on its own terms, its living walls of thorn reaching out to snare any prey that guesses where it hides. It toys with intruders rather than fleeing — patient, vain, and delighted by the slow bleed of anything that trespasses in its garden.

**`[concept] lore:`**, uncut

> Once a noble who could not bear to lose the sunlight, it rooted its coffin in the soil of its own estate and grew a garden of thorn that feeds on blood so that it need never leave the dark.

**Every attack row**
```
(no attack row)
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
Multiattack (Vampire Form Only): The vampire makes two Grave Strike attacks and uses Bite. It can replace one attack with a use of Binding Lash.
Grave Strike: Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) from one of two hands.
Binding Lash: One creature within 60 feet must make a DC 17 Dexterity saving throw. On a failed save, the target is restrained until the end of its next turn.
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that has the grappled, incapacitated, or restrained condition must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) piercing damage on a failed save, plus 13 (3d8) necrotic damage. The target's Hit Point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a Vampire Spawn under the vampire's control.
Legendary Actions

The vampire can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The vampire regains spent legendary actions at the start of its turn.

Deathless Strike: The vampire moves up to half its Speed, and it makes one Grave Strike attack.
Beguile: The vampire casts Command, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17). The vampire can't take this action again until the start of its next turn.
```

---

## 12. Swarmshear — CR 13

**Input:** `a plague-bearing archon of flies that commands lesser swarms`
**Donor:** skirmisher-13-winged -> CR 13 (invented — no printed peer)
**Signature:** library · **elapsed** 2s

**Type line:** `Medium Celestial, Lawful Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — title archon — "a plague-bearing archon of flies that commands lesser swarms" (call)
[route] skirmisher-winged type=Celestial mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-winged: ✓ ("archon of flies") | skirmisher-winged: key "flies" (class verb)
[concept] resolve: archetype=skirmisher type=Celestial typeFrom=the route call themes=celestial/venomous mind=sapient style=winged energy=Poison mix=both identity=✓ lore=✓
[reskin] mind tier: INT 10 -> 15 — the call read this creature as capable at CR 13
[reskin] mind tier: WIS 16 -> 20 — the call read this creature as formidable at CR 13
[reskin] mind tier: CHA 12 -> 20 — the call read this creature as formidable at CR 13
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> The Plague-Archon opens by loosing its retinue — a whirling mantle of fly-swarms that boils off its luminous carapace to blind and poison — then dives on wings of buzzing, glittering light to snatch a target and drop it from height, harrying and bleeding the field with rot between strikes. It is a patient, contemptuous commander, never quite landing, always repositioning its swarms to shepherd prey, and it withdraws aloft only when the Host itself is threatened. It does not fight to the death out of fear — it fights to the death out of duty, but it will flee the field bloodied and return with a fresh wave of the plagued, for its purpose outlives its body.

**`[concept] lore:`**, uncut

> Sent by the higher heavens to quarantine a corrupt world, the Plague-Archon is a mercy-warrior whose cure is contagion — it spreads the holy rot that scours sin, hoarding the swarms it commands as both weapon and congregation.

**Every attack row**
```
Talons. Melee Attack Roll: +10, reach 10 ft. 14 (2d8 + 5) Slashing damage plus 10 (3d6) Poison damage. If the swarmshear flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 7 (2d6) Slashing damage and, if it is Large or smaller, has the Prone condition.
```

```
Swarmshear

Medium Celestial, Lawful Neutral

AC 18
Initiative +5 (15)

HP 187 (22d8 + 88)

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

Resistances Radiant

Immunities Charmed

Senses darkvision 120 ft.; Passive Perception 20

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Plague Aura. Constitution Saving Throw: DC 17, any creature that starts its turn in a 20-foot Emanation originating from the swarmshear. Failure: The target has the Poisoned condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Wing Drift. The swarmshear doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.

Contemptuous Sway. When a creature the swarmshear can see ends its turn within 5 feet of it, the swarmshear can move up to 10 feet without provoking Opportunity Attacks.

Actions

Multiattack. The swarmshear makes three Talons attacks. It can replace one attack with a use of Swarmwright's Command.

Talons. Melee Attack Roll: +10, reach 10 ft. 14 (2d8 + 5) Slashing damage plus 10 (3d6) Poison damage. If the swarmshear flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 7 (2d6) Slashing damage and, if it is Large or smaller, has the Prone condition.

Retinue Dive (Recharge 5-6). The swarmshear flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Dexterity Saving Throw: DC 17. Failure: 66 (12d10) Piercing damage, and the target has the Prone condition. Success: Half damage.

Swarmwright's Command. Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: Failure: The target has the Poisoned condition until the end of its next turn.

Bonus Actions

Aerial Agility. The swarmshear takes the Dash or Disengage action.

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
**Signature:** dropped · **elapsed** 2s

**Type line:** `Gargantuan Monstrosity, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape: contain on the GM's own words "that swallowed a war-band's armoury" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("that swallowed a war-band's armoury") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=devouring/subterranean mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> A purple worm whose gullet is a fused mass of swallowed mail, blades, and spearheads — it breaches from below, seizes a foe in its churning maw, and grinds the prey against the armoury-lining of its throat before sliding it whole into a stomach of corroded steel. Every round it coils and repositions like a constrictor, dragging one victim inward while its plated hide shrugs off blows; the blades it has eaten erupt from its flesh as jagged spurs that shred anything pressing close. It does not flee bloodied — pain makes it swallow harder, bucking and thrashing to keep anything already half-down its gullet from escaping.

**`[concept] lore:`**, uncut

> A war-band's caravan and the full weight of its armoury went down a sinkhole into a purple worm's tunnel, and the creature ate it all — plate, mail, blades, and the warriors still wearing them — until its gut grew a second, honed skeleton of stolen steel.

**Every attack row**
```
Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.
Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.
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

Senses blindsight 60 ft., tremorsense 120 ft.; Passive Perception 14

Languages None

CR 15 (XP 13,000; PB +5)

Traits

Churning Armoury. At the start of each of the purple worm's turns, each creature inside the purple worm takes 22 (5d8) Acid damage, and the purple worm gains Temporary Hit Points equal to half the damage dealt.

Tunneler. The purple worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The purple worm makes one Bite attack and one Tail Stinger attack.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

Bonus Actions

Swallow. Strength Saving Throw: DC 21, one Large or smaller creature Grappled by the purple worm (it can have up to three creatures swallowed at a time). Failure: The target is swallowed by the purple worm, and the Grappled condition ends. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the purple worm, and takes 17 (5d6) Acid damage at the start of each of the purple worm's turns.
If the purple worm takes 30 damage or more on a single turn from a creature inside it, the purple worm must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the purple worm and has the Prone condition. If the purple worm dies, any swallowed creature no longer has the Restrained condition and can escape from the corpse using 20 feet of movement, exiting Prone.

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

## 14. Glacier-Heart — CR 15

**Input:** `a glacier's heart given legs, trailing a wake of killing cold`
**Donor:** brute-9-juggernaut -> CR 15
**Signature:** library · **elapsed** 4s

**Type line:** `Huge elemental, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a glacier's heart given legs, trailing a wake of killing cold" (call)
[route] brute-juggernaut type=Elemental mechanics=aura — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("a glacier's heart given legs") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental typeFrom=the route call themes=elemental/terror mind=bestial style=juggernaut energy=Cold mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 6 against "feeble" — the call read this creature as bestial, and the card's 6 is already that dim
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier: CHA 4 -> 15 — the call read this creature as capable at CR 15
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> A glacier's heart on stumpy, cracking legs, it announces itself with a hoarsely grinding roar and begins to walk — every stride it takes kills the ground behind it and the air ahead of it. Its combat loop is advance and abrade: it swings limbs of blue-black ice like falling seracs, letting the killing cold of its wake do the rest, and it loathes being made to stop, pressing through walls, roots, and creatures alike as though they were only weather. Under pressure it does not retreat; the cold grows deeper, its crust thickens, and it redoubles its march until it is the only thing left moving in a frozen silence.

**`[concept] lore:`**, uncut

> Something deep in the ice-age heart of a glacier woke and decided it wanted to move, so it tore its core free of the mountain and grew a crooked body of frozen stone around it; now it walks south, and it will not know it has finished until the whole valley is white.

**Every attack row**
```
(no attack row)
```

```
Glacier-Heart
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

Cold Absorption.Whenever the glacier-heart is subjected to cold damage, it takes no damage and instead regains a number of hit points equal to the cold damage dealt.
Siege Monster.The glacier-heart deals double damage to objects and structures.
Rimewake.At the start of each of its turns, the ground within 15 feet of the glacier-heart coats in rime and becomes difficult terrain; a creature that begins its turn in that frozen area takes 16 (3d10) cold damage and has its speed halved until the end of its next turn.

Actions
Multiattack: The glacier-heart makes two Slam attacks.
Slam: Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage plus 13 (3d8) cold damage.
Killing Cold (Recharge 5-6): Each creature in a 30-foot cone must make a DC 17 Constitution saving throw, taking 66 (12d10) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also deafened until the end of its next turn.
```

---

## 15. Adult Red Dragon — CR 17

**Input:** `name: Adult Red Dragon | blind in one eye from an old lance`
**Donor:** dragon-15 -> CR 17
**Signature:** library · **elapsed** 5s

**Type line:** `Huge dragon, chaotic evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Adult Red Dragon (is) — "Name field: Adult Red Dragon" (code)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | dragon: ✓ ("Adult Red Dragon") | dragon: key "dragon" (class body)
[concept] resolve: archetype=dragon type=Dragon typeFrom=the route call themes=draconic/terror mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
[reskin] free row repaired: "Ruined Eye, Wary Ear": "While a creature makes an attack against the red dragon from its blind" -> "When a creature attacks the red dragon from a 90-degree arc on the dragon's left side, the"
```

**`[concept] identity:`**, uncut

> An adult red dragon with one eye scarred shut by an old lance wound, it opens by announcing itself with a roar of frightful presence and a searing cone of flame, then closes to kill with bite and claws wherever it can pin prey down. Every round after, it uses its blind-side handicap deliberately — favoring angles where its ruined eye doesn't cost it, punishing flankers with wing and tail, and refusing to be baited into a blind rush. Wounded and cornered, it fights to the death with a furious, methodical spite, withdrawing only to heal and re-engage, never truly fleeing.

**`[concept] lore:`**, uncut

> This dragon lost its eye to a hero's lance and has spent decades hunting the bloodline of the one who blinded it, hoarding their heirlooms in its burning lair.

**The Spellcasting row, in full**
```
Spellcasting: The red dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 20, +12 to hit with spell attacks): - At will: Command, Detect Magic, Scorching Ray
```

**Every attack row**
```
(no attack row)
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

## 16. Molten King — CR 17

**Input:** `a tyrant of burning brass who rules a city of forges`
**Donor:** brute-17-juggernaut -> CR 17
**Signature:** library · **elapsed** 3s

**Type line:** `Large Construct, Lawful Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — title tyrant — "a tyrant of burning brass who rules a city of forges" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("a tyrant of burning brass") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=forged/terror mind=sapient style=juggernaut energy=Fire mix=both identity=✓ lore=✓
[reskin] mind tier: INT 6 -> 15 — the call read this creature as capable at CR 17
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 17
[reskin] mind tier: CHA 4 -> 20 — the call read this creature as formidable at CR 17
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> The Brass Tyrant does not duel; it processes. It opens by wading through the front rank to reach the biggest threat, trusting molten brass skin and the crushing weight of its fists to turn anything that tries to stop it, and every round after it advances, grabs, and forges a lesson out of the nearest obstacle or the loudest dissenter. Wounded, it does not flee — it bellows a decree, plants itself like a furnace door, and fights to the death, spending its final heat in a detonation of molten slag rather than suffer a challenger to outlive it.

**`[concept] lore:`**, uncut

> Poured into a throne of living brass by the first smiths of the forge-city, the Tyrant was made to rule the forges and has never stopped believing the city owes it obedience.

**Every attack row**
```
Fist. Melee Attack Roll: +12, reach 10 ft. 19 (3d8 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.
```

```
Molten King

Large Construct, Lawful Neutral

AC 19
Initiative -1 (9)

HP 231 (22d10 + 110)

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

Molten Brass Skin. A creature that touches the molten king or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Legendary Resistance (3/Day). If the molten king fails a saving throw, it can choose to succeed instead.

Immutable Form. The molten king can't shape-shift.

Siege Monster. The molten king deals double damage to objects and structures.

Actions

Multiattack. The molten king makes two Fist attacks. It can replace one attack with a use of Seize the Unforged.

Fist. Melee Attack Roll: +12, reach 10 ft. 19 (3d8 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.

Furnace Flare (Recharge 5-6). Constitution Saving Throw: DC 19, each creature in a 60-foot Cone. Failure: 66 (12d10) Fire damage. Success: Half damage only.

Seize the Unforged. Strength Saving Throw: DC 19, one creature within 10 feet. Failure: The target has the Grappled condition (escape DC 20).

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the molten king can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Advance and Strike. The molten king moves up to half its Speed without provoking Opportunity Attacks, and it makes one Fist attack.

Trample Forge. The molten king moves up to half its Speed without provoking Opportunity Attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.

Shuddering Step. Strength Saving Throw: DC 19, each creature within 10 feet of the molten king. Failure: The target has the Prone condition.

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
**Donor:** brute-21 -> CR 20 (invented — no printed peer)
**Signature:** dropped · **elapsed** 2s

**Type line:** `Large Fiend, Lawful Evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Pit Fiend (is) — "Name field: Pit Fiend" (code)
[route] brute type=Fiend mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("collects the oaths of dying knights") | defender: the call read "knights" as not meaning that mechanic here — no override | brute stands: every key that would override it was read as a figure of speech | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Fiend typeFrom=the route call themes=fiendish/grave mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
[reskin] free row repaired: "Chain of Broken Oaths": "When a creature dies within 10 feet of the pit fiend, the pit fiend ga" -> "When a creature dies within 10 feet of the pit fiend, the pit fiend gains Temporary Hit Po"
```

**`[concept] identity:`**, uncut

> The Pit Fiend fights as an oath-broker in brute flesh: it opens by hurling its iron chain-hook to drag a knight within reach, then plants itself and trades blows with a massive shackle-flail, and each dying oath the fallen speak is swallowed mid-swing to grow heavier and harder to wound. It never flees; it fights to the death, and it toys with prey by letting weakened foes crawl toward escape only to reel them back by the chain and demand one more broken promise before the kill.

**`[concept] lore:`**, uncut

> Forged in the oath-pits of a hellish archive where every promise spoken at death is pressed into iron, it walks the battlefields of the living to harvest the last words of dying knights — each collected oath a link in the chain it one day intends to hang across the gates of its own infernal jailers.

**Every attack row**
```
Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.
Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.
Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.
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

Chain of Broken Oaths. When a creature dies within 10 feet of the pit fiend, the pit fiend gains Temporary Hit Points equal to, and until the end of its next turn its Bite attacks deal an extra 14 (4d6) Fire damage.

Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend's aura for 24 hours.

Legendary Resistance (3/Day). If the pit fiend fails a saving throw, it can choose to succeed instead.

Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

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

---

## 18. Bone-Sun Archlich — CR 20

**Input:** `an archlich enthroned on a sun of bone`
**Donor:** caster-21 -> CR 20
**Signature:** library · **elapsed** 3s

**Type line:** `Medium undead, neutral evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Lich (is) — "archlich" (call)
[route] caster (artillery) type=Undead mechanics=aura — casts: implied by the kind — "archlich" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("archlich") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Undead typeFrom=the route call themes=grave/arcane mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> The archlich opens by rising from its bone throne-sun into the air, hurling bolts of bone-shard and searing radiance while its throne sheds orbiting splinters that screen it from reprisal. Every round it drifts and repositions the sun, spending spell slots on blasts and bone-walls to keep the distance its fragile frame needs, and it never lets an enemy close without paying in a storm of flying bone. Under pressure it does not flee — it detonates a shell of the throne, retreats inside a cage of splinters, and keeps casting, coldly certain that the dead have already won the long fight.

**`[concept] lore:`**, uncut

> A lich who bound its soul not to a phylactery but to a sun of fused bone raised from the graves of an empire, it drifts through the void feeding that star with the skeletons of the living so it never burns out.

**The Spellcasting row, in full**
```
Spellcasting: The archlich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19): At will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
```

**Every attack row**
```
(no attack row)
```

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

Compelling Halo.Any creature that starts its turn in a 15-foot radius originating from the archlich must make a DC 19 Charisma saving throw. On a failed save, until the start of its next turn, the target can't speak a deliberate lie.
Legendary Resistance (3/Day).If the archlich fails a saving throw, it can choose to succeed instead.
Spirit Jar.If destroyed, the archlich reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the archlich's lair.
Protective Magic (Reaction).The archlich casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: The archlich makes three attacks, using Eldritch Burst or Paralyzing Touch. It can replace one attack with a use of Throne-Sun Volley (Recharge 5-6).
Eldritch Burst: Melee or Ranged Weapon Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 31 (4d12 + 5) force damage.
Paralyzing Touch: Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed until the start of the archlich's next turn.
Spellcasting: The archlich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19): At will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
2/day each: Animate Dead, Dimension Door, Plane Shift
1/day each: Chain Lightning, Finger of Death, Power Word Kill, Scrying
Throne-Sun Volley (Recharge 5-6): Each creature in a 120-foot-long, 5-foot-wide Line must make a DC 19 Dexterity saving throw, taking 35 (10d6) piercing damage on a failed save. On a failed save, the target is restrained until the end of its next turn.
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
**Signature:** — · **elapsed** 2s

**Type line:** `Gargantuan dragon, lawful good` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: Ancient Gold Dragon
[path] exact — Ancient Gold Dragon (is) — "Ancient Gold Dragon" (code)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | dragon: ✓ ("Ancient Gold Dragon") | dragon: key "dragon" (class body)
[concept] resolve: archetype=dragon type=Dragon typeFrom=the route call themes=draconic/arcane mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
```

**`[concept] identity:`**, uncut

> An ancient gold dragon opens with its weakening breath and Frightful Presence, then wades in as a spellcasting bruiser, weaving arcane wards while its claws and bite carry searing fire. Each round it presses with a multiattack and repositions by flight, forcing casters to choose between the dragon and its breath. It is patient and calculating, tempted to toy with worthy prey but fleeing only when truly bloodied and outmatched, never in panic.

**`[concept] lore:`**, uncut

> Hoarded beneath sun-baked mountain halls, the Ancient Gold Dragon guards a treasury of relics it believes are the last memory of a fallen age, and it will burn any who claim them.

**Every attack row**
```
(no attack row)
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
**Signature:** library · **elapsed** 3s

**Type line:** `Gargantuan Monstrosity, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a leviathan of the trench whose song drowns fleets" (call)
[route] brute type=Beast mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: the call reads no worked magic in these words | caster: the family itself needs a magic word in the words — the fallback leaves it | fell to brute's plain line | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Beast typeFrom=the route call themes=aquatic/voice mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[reskin] mind tier: INT 10 -> 15 — the call read this creature as capable at CR 24
[reskin] mind tier: WIS 14 -> 20 — the call read this creature as formidable at CR 24
[reskin] mind tier: CHA 14 -> 20 — the call read this creature as formidable at CR 24
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> The leviathan opens by letting its subsonic song roll out ahead of it, drowning the crews of whole fleets in confusion and despair before its bulk ever breaches the water. Every round after, it circles beneath the hulls and strikes with crushing coils and tide-swamping limbs, using its song to turn the sea itself against the ships around it. It is patient and possessive of its trench, and when bloodied it does not flee — it drags the fight down into the dark where its voice is strongest.

**`[concept] lore:`**, uncut

> It sleeps in the lightless trench below the shipping lanes and wakes only when the surface world grows too loud, singing the fleets down to feed the quiet it hoards.

**Every attack row**
```
Coils. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.
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

Senses blindsight 120 ft.; Passive Perception 22

Languages Common

CR 24 (XP 62,000; PB +7)

Traits

Amphibious. The leviathan can breathe air and water.

Bone-Ringing Coils. Once on each of the leviathan's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 24. Failure: The target has the Stunned condition until the start of its next turn.

Legendary Resistance (3/Day). If the leviathan fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The leviathan makes two Coils attacks. It can replace one attack with a use of Fathom Chorus.

Coils. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Abyssal Roar (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Fathom Chorus. Constitution Saving Throw: DC 24, each creature in a 30-foot Emanation originating from the leviathan. Failure: The target has the Poisoned condition until the end of its next turn.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the leviathan can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Undertow Lunge. The leviathan moves up to half its Speed without provoking Opportunity Attacks, and it makes one Coils attack.

Swell Surge. Strength Saving Throw: DC 24, each creature within 10 feet of the leviathan. Failure: The target has the Prone condition.

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
**Signature:** dropped · **elapsed** 2s

**Type line:** `Large Monstrosity, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: Owlbear
[path] exact — Owlbear (is) — "Owlbear" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but offered no quote | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("Owlbear") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=bestial/grasping mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the exact path takes no class kit
```

**`[concept] identity:`**, uncut

> A hulking bear-framed thing feathered in dirty owl plumage, it opens with a silent rushing pounce from cover, driving both forelimbs down to pin and crush a single target before its beak finds the throat. Every round after that it stays latched on that one hold — raking with its rear claws while the hooked beak tears — and it will haul struggling prey off its feet and drag it into the brush rather than release it. Under pressure it does not retreat; a wounded owlbear redoubles the grapple and fights to the death, too stupid and too enraged to know when it is losing.

**`[concept] lore:`**, uncut

> Wizards' old crossing of owl and bear bred true and escaped, and now these savage hybrids den in the deep woods, wanting only meat and the silence of unbroken territory.

**Every attack row**
```
Rend. Melee Attack Roll: +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.
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

## 23. Vashka the Red — CR 6

**Input:** `name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.`
**Donor:** defender-5 -> CR 6
**Signature:** library · **elapsed** 2s

**Type line:** `Medium Humanoid, Lawful Evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] filled: the head clause names the Hobgoblin Warrior, a people — a fighter who is visibly one stands on its printed body (owner's ruling, 2026-11-15)
[path] class_npc — Hobgoblin Warrior (is) — class fighter — "warlord" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("A hobgoblin warlord") | defender-leader -> defender: the concept's VERB outranks the noun (key "shield wall", class verb) | defender: key "shield wall" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: guarded-stance yields — AC 19 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] class kit: fighter — "warlord": Riposte (riposte)
[reskin] class weapon: "longsword" and "longbow" already names a row on this body — no row is renamed to it (fix F: one name, one row)
```

**`[concept] identity:`**, uncut

> Vashka the Red opens by planting the shield wall and letting the enemy come to her, her lacquered plate a red wall that does not move. Every round she fights as a hinge of that wall — holding her ground, punishing anyone who tries to slip past her guard, and barking orders that keep the line dressed even as blades bite. Under pressure she does not break ranks: she tightens the formation, spends the wounded as shields, and if forced to retreat she withdraws in step behind the wall rather than flee alone.

**`[concept] lore:`**, uncut

> Vashka the Red rose from a hobgoblin legion's shield companies, lacquering her plate the color of the regiment's banner, and now sells the discipline of her unbreakable wall to whichever warlord pays — but she never sells the wall itself.

**Every attack row**
```
Longsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage.
Longbow. Ranged Attack Roll: +7, range 150/600 ft. 21 (5d6 + 4) Piercing damage.
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

Senses Passive Perception 13

Languages Common, Goblin

CR 6 (XP 2,300; PB +3)

Traits

Shield-Locked. While Vashka is standing shoulder-to-shoulder with an ally, Vashka has a +2 bonus to AC against attacks that come from the side of her ally.

Dress the Line. Once per turn, when a creature within 5 feet of Vashka that can hear her is hit by an attack roll, that creature gains a + bonus to its AC until the start of Vashka's next turn, provided it is standing shoulder-to-shoulder with Vashka or another ally.

Pack Tactics. Vashka has Advantage on an attack roll against a creature if at least one of Vashka's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. Vashka makes two attacks, using Longsword or Longbow in any combination.

Longsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Longbow. Ranged Attack Roll: +7, range 150/600 ft. 21 (5d6 + 4) Piercing damage.

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

## 24. Scythe-Brood Horror — CR 9

**Input:** `A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.`
**Donor:** brute-8-grappler -> CR 9
**Signature:** library · **elapsed** 2s

**Type line:** `Large Monstrosity, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell t" (call)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf, breath — casts: the call reads no worked magic here | hold_shape: grip on the GM's own words "pinning prey with two arms" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("pinning prey with two arms and carving w") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=venomous/grasping mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 9
[reskin] mind tier: CHA 6 -> 10 — the call read this creature as ordinary at CR 9
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> The horror opens by rushing the nearest target and locking it down with two scythe-arms, pinning it in place while the other two arms carve it apart; every round it keeps a victim pinned and bleeding, favoring the largest or most armored target to hold rather than chase skirmishers. Its acid-shedding shell punishes anyone who grapples it or strikes it in melee, and when badly wounded it does not flee but throws itself into the thickest of the fight, spitting caustic bile and dragging the nearest prey under a rain of cuts.

**`[concept] lore:`**, uncut

> Hatched from a clutch buried in a battlefield's churned soil, it carries the acid of a dissolved carcass in its shell and wants only to pin warm bodies to the ground and cut until nothing moves.

**Every attack row**
```
Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 17 (3d8 + 4) Piercing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).
Brood-Limb Pin. Melee Attack Roll: +8, reach 5 ft. 17 (3d8 + 4) Piercing damage, and the target has the Restrained condition until the end of its next turn.
```

```
Scythe-Brood Horror

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
10
+0
+0

Skills Athletics +8, Perception +6

Immunities Acid

Senses darkvision 60 ft.; Passive Perception 16

Languages None

CR 9 (XP 5,000; PB +4)

Traits

Caustic Shell. A creature that touches the scythe-brood horror or hits it with a melee attack while within 5 feet of it has the Poisoned condition until the end of its next turn.

Actions

Multiattack. The scythe-brood horror makes two attacks, using Spitting Maw or Brood-Limb Pin in any combination. It can replace one attack with a use of Horrid Display.

Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 17 (3d8 + 4) Piercing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).

Horrid Display. Wisdom Saving Throw: DC 15, each creature of the scythe-brood horror's choice in a 30-foot Emanation originating from the scythe-brood horror that can see or hear it. Failure: The target has the Frightened condition until the end of its next turn. Success: The target is immune to this creature's terror for 24 hours.

Brood-Limb Pin. Melee Attack Roll: +8, reach 5 ft. 17 (3d8 + 4) Piercing damage, and the target has the Restrained condition until the end of its next turn.

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

## 25. Black Iron Sentinel — CR 11

**Input:** `a sentinel of black iron, AC 20, Huge, speed 20 feet`
**Donor:** defender-7-warden -> CR 11
**Signature:** library · **elapsed** 3s

**Type line:** `Huge construct, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a sentinel of black iron" (call)
[route] defender-warden type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-warden: ✓ ("a sentinel of black iron") | defender-warden stands on the homebrew path: the call ranked it and quoted "a sentinel of black iron" — the key "sentinel" is the menu, not the decision (step 7) | defender-warden: no line key in the words — the model's read of its quote | asked_mechanic harden: quote not found
[concept] resolve: archetype=defender type=Construct typeFrom=the route call themes=forged/grave mind=mindless style=warden energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 7 against "ordinary" — the call read this creature as mindless, so only "feeble" could lower its INT
[reskin] mind tier held: CHA stays 3 against "feeble" — the card's 3 is already feeble
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 11
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> A slab-bodied sentinel of black iron that plants itself in front of what it guards and does not move again voluntarily; it opens by walking its slow 20-foot pace into the narrowest ground it can hold, then grinds down anything that comes within reach with a single crushing iron limb. Every round it endures — taking blows meant for its charge on its own scarred plate — and only shifts its stance to redirect a threat away from the thing behind it, fighting to the death without anger or speech because it has nowhere else to be.

**`[concept] lore:`**, uncut

> Forged in a dead foundry and bolted upright over a tomb, a vault, or a pass it was ordered to hold, the black-iron sentinel still obeys the last command it was given and will not kneel until its frame is broken apart.

**Every attack row**
```
(no attack row)
```

```
Black Iron Sentinel
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

	

15 (+2)

	

3 (-4)

Skills: 

Perception +6

Saving Throws: 

CON +8

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

darkvision 60 ft., passive Perception 16

Languages: 

understands the languages of its creator but can't speak

Challenge

11 (7,200 XP)

Proficiency Bonus:

+4

Ward Bond.The iron sentinel is magically bound to a ward of its choosing, and it can have only one ward at a time. While the iron sentinel is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the iron sentinel.
Regeneration.The iron sentinel regains 10 hit points at the start of each of its turns if it has at least 1 Hit Point.
Interpose (Reaction).When a creature within 5 feet of the iron sentinel that it guards is hit by an attack roll, the attack hits the iron sentinel instead, and the iron sentinel has Resistance to the attack's damage.

Actions
Multiattack: The iron sentinel makes two Fist attacks. It can replace one attack with a use of Iron Sweep.
Fist: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage.
Stand Fast (2/Day): The iron sentinel targets itself or one creature it can see within 60 feet. The target gains 24 (7d6) temporary hit points, and it gains a +2 bonus to AC until the end of the iron sentinel's next turn.
Iron Sweep: Each creature in a 30-foot cone must make a DC 16 Strength saving throw. On a failed save, the target is pushed up to 15 feet away from the iron sentinel and is knocked prone.
```

---

## 26. Grendhilde the Marsh Witch — CR auto

**Input:** `a marsh witch who curses trespassers, cr 7`
**Donor:** caster-8-binder -> CR 7
**Signature:** library · **elapsed** 3s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class mage — "witch" (call)
[route] caster-binder (controller) type=Humanoid mechanics=none — casts: implied by the kind — "a marsh witch who curses trespassers" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: ✓ ("curses trespassers") | caster-binder: key "curses" (class verb)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/beguiling mind=sapient style=binder energy=Poison mix=both identity=✓ lore=✓
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
```

**`[concept] identity:`**, uncut

> The marsh witch opens by laying a layered hedge of curses across the whole trespassing party — old words worked into the mud of her fen, foul humours that sap the will and slow the limbs as surely as any snare. Each round she works another one, hexing sight so that eyes can no longer find their footing, hexing Strength so that swords fall slack, and only then turning to fell things with a rotten darting word, keeping her lines to the water and the reeds. She is patient and wilful to the end, retreating into the drowned reeds she has woven with her curses and never fighting fair or fighting alone in the open, and she does not flee her own marsh — she lets it swallow those who follow.

**`[concept] lore:`**, uncut

> A fen-bound hag who bargained her blood to the black water for the power to work curses, and who now spells her marsh's every boundary with binding rotten humours to punish any who cross uninvited.

**The Spellcasting row, in full**
```
Spellcasting. Grendhilde casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly
```

**Every attack row**
```
Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.
```

```
Grendhilde the Marsh Witch

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

Languages Common and any three languages, Sylvan

CR 7 (XP 2,900; PB +3)

Actions

Multiattack. Grendhilde makes three Arcane Burst attacks. It can replace one attack with a use of Fenwater Lash.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Grendhilde casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Fenwater Lash. Constitution Saving Throw: DC 14, one creature within 30 feet. Failure: 19 (3d12) Bludgeoning damage.

Bonus Actions

Misty Step (3/Day). Grendhilde casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Grendhilde casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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

## 27. Unanswered Templar — CR 6

**Input:** `a templar priest with a mace and no magic at all`
**Donor:** defender-5 -> CR 6
**Signature:** dropped · **elapsed** 1s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "templar" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("a templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/grave mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] free row repaired: "Shoulder Square": "While the templar is standing on ground he has not moved from since th" -> "While the templar has not moved from his space since the start of his last turn, attack ro"
```

**`[concept] identity:`**, uncut

> A veteran templar who has buried every prayer that ever answered, this priest opens a fight by planting his shield and standing squarely in the doorway, letting the mace dare anyone to come at him. Every round he holds the line with disciplined shield-work and answers any enemy who tries to slip past or strike an ally with a crushing, deliberate blow — never fast, never flashy, just patient and impossible to dislodge. He does not flee when bloodied; he tightens his grip, digs in, and fights to the last because retreat would betray the only vow he still keeps.

**`[concept] lore:`**, uncut

> A templar whose god went silent stripped the sanctity out of his rites and left only the discipline of the order, so he keeps his post and his mace and guards the faithful with iron and stubbornness instead of miracles.

**Every attack row**
```
Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the templar's next turn.
```

```
Unanswered Templar

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

Shoulder Square. While the templar has not moved from his space since the start of his last turn, attack rolls made against the templar have Disadvantage, and the templar can't be moved against his will from that space. This ends immediately when the templar moves, is moved, or is knocked Prone.

Aura of Authority. While in a 10-foot Emanation originating from the templar, the templar and its allies have Advantage on attack rolls and saving throws, provided the templar doesn't have the Incapacitated condition.

Actions

Multiattack. The templar makes three Mace attacks. It can replace one attack with a use of Shield Bash.

Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the templar's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the templar can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

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
**Signature:** library · **elapsed** 2s

**Type line:** `Medium humanoid, neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class mage — "archmage" (call)
[route] caster (artillery) type=Humanoid mechanics=teleport — casts: on the GM's own words "An elf archmage who bends shadow and ste" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("An elf archmage who bends shadow") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/uncanny mind=sapient style=— energy=Necrotic mix=energy identity=✓ lore=✓
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "archmage": Misty Step (3/Day) (Mage/Misty Step)
```

**`[concept] identity:`**, uncut

> Ilvareth opens from darkness, guttering the lights around the party before hurling a lance of shadow from an angle no one is covering, then steps through the next pool of gloom the moment anyone closes the distance. Every round after that is a duel of angles: blast, reposition via shadow, blast again, using the battlefield's own darkness as a corridor while keeping the party at the far end of it. He is a patient, vain tactician who toys with prey and only slips away bloodied if truly cornered, preferring to leave an insult and a shadow where he stood.

**`[concept] lore:`**, uncut

> An elven archmage who traded his name to the shadow between places, Ilvareth Dusksong now collects the last lights of dying courts and vanishing kingdoms, hoarding them in the dark he walks through.

**The Spellcasting row, in full**
```
Spellcasting: Ilvareth casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17): At will: Detect Magic, Detect Thoughts, Disguise Self, Invisibility, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
(no attack row)
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

Gloaming Shift.When Ilvareth is in dim light or darkness, Ilvareth can take the Hide action even when only lightly obscured, and can teleport up to 30 feet to an unoccupied space he can see that is in dim light or darkness, leaving a smear of deepening gloom in the space he left.
Magic Resistance.Ilvareth has advantage on saving throws against spells and other magical effects.
Misty Step (3/Day) (Bonus Action).Ilvareth casts Misty Step, using the same spellcasting ability as Spellcasting.
Shadow Step (Recharge 4-6) (Bonus Action).Ilvareth teleports up to 60 feet to an unoccupied space it can see.
Protective Magic (3/Day) (Reaction).When Ilvareth is hit by an attack roll, Ilvareth casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Ilvareth makes four Arcane Burst attacks.
Arcane Burst: Melee or Ranged Weapon Attack: +9 to hit, reach 5 ft. or range 150 ft., one target. Hit: 27 (4d10 + 5) force damage.
Spellcasting: Ilvareth casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17): At will: Detect Magic, Detect Thoughts, Disguise Self, Invisibility, Light, Mage Armor, Mage Hand, Prestidigitation
2/day each: Fly, Lightning Bolt
1/day each: Cone of Cold, Mind Blank, Scrying, Teleport
```

---

## 29. Unblessed Bell Swarm — CR 13

**Input:** `a swarm of funeral bells that ring themselves over the dying`
**Donor:** swarm-9 -> CR 13 (invented — no printed peer)
**Signature:** library · **elapsed** 2s

**Type line:** `Medium Swarm of Tiny Constructs, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a swarm of funeral bells that ring themselves over the dying" (call)
[route] swarm type=Construct mechanics=aura — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a swarm of funeral bells" | swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] resolve: archetype=swarm type=Construct typeFrom=the route call themes=grave/uncanny mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the card's 4 is already feeble
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 13
[reskin] mind tier: CHA 2 -> 15 — the call read this creature as capable at CR 13
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> A cloud of tarnished funeral bells hangs in the air over the dying, waiting with the patience of a thing that has never once been wrong about who is next. When prey still moves, the swarm descends and rings in a shrieking, overlapping clamor that rattles bone and drowns out last words, each bell striking with the weight of a swung censer. It does not pursue the healthy: it waits, tolls, and multiplies its tolling until the body beneath it has been rung still, then settles to drink the silence it made.

**`[concept] lore:`**, uncut

> Each bell in the swarm was cast for a funeral that never happened — a grave interrupted, a body never blessed — and the bells now seek the dying to finish what the living abandoned, ringing the rites over anyone whose death goes unwitnessed.

**Every attack row**
```
Censer Swing. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.
```

```
Unblessed Bell Swarm

Medium Swarm of Tiny Constructs, Unaligned

AC 15
Initiative +5 (15)

HP 178 (21d8 + 84)

Speed 30 ft., Fly 30 ft. (hover)

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
20
+5
+5
MOD
SAVE
CON
18
+4
+4
CHA
15
+2
+2

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned

Senses blindsight 30 ft. (blind beyond this radius); Passive Perception 15

Languages Understands the languages of its creator but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Tolling Rot. Once on each of the swarm's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 17. Failure: The target has the Stunned condition until the end of its next turn.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Multiattack. The swarm makes two Censer Swing attacks.

Censer Swing. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.

Ringing Ground (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 45 (13d6) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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

## 30. Chrismal Ossuary — CR 9

**Input:** `a cathedral-vault ooze that digests reliquaries`
**Donor:** ooze-9 -> CR 9 (invented — no printed peer)
**Signature:** library · **elapsed** 3s

**Type line:** `Large ooze, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a cathedral-vault ooze that digests reliquaries" (call)
[route] ooze type=Ooze mechanics=none — casts: the call reads no worked magic here | hold_shape: contain on the GM's own words "digests reliquaries" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | ooze: ✓ ("cathedral-vault ooze") | ooze: no line key in the words — the model's read of its quote
[concept] resolve: archetype=ooze type=Ooze typeFrom=the route call themes=amorphous/devouring mind=mindless style=— energy=Acid mix=energy identity=✓ lore=✓
[reskin] mind tier held: INT stays 2 against "feeble" — the call read this creature as mindless, and the card's 2 is already that dim
[reskin] mind tier held: CHA stays 1 against "feeble" — the card's 1 is already feeble
[reskin] mind tier: WIS 8 -> 15 — the call read this creature as capable at CR 9
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> A cathedral-vault ooze seeps down the nave as a slow, greasy rot that spreads across the flagstones and rears into a vaulting column of itself to swallow whole reliquaries — and anyone clutching one. Every round it engulfs what it can reach, its rot dissolving gold, bone, and lacquer alike while it drags the sanctified mass down into its body, and wounded, it simply collapses into the cracks of the crypt to ooze back up elsewhere, patient and relentless rather than clever.

**`[concept] lore:`**, uncut

> It grew from spilled chrism and generations of decay in a sealed reliquary vault, and it wants only to take the holy dead into itself, one shrine at a time.

**Every attack row**
```
(no attack row)
```

```
Chrismal Ossuary
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

	

1 (-5)

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

Fouling Residue.A space the ossuary moves through becomes difficult terrain for 1 hour, and any object of gold, bone, silver, or lacquer left in that space is destroyed within the hour.
Amorphous.The ossuary can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form.A creature that touches the ossuary or hits it with a melee attack while within 5 feet of it takes 9 (2d8) acid damage.
Spider Climb.The ossuary can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The ossuary makes two Engulfing Pseudopod attacks.
Engulfing Pseudopod: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 11 (2d10) acid damage.
Reliquary Swallow (Recharge 5-6): One creature within 10 feet must make a DC 15 Dexterity saving throw, taking 27 (6d8) acid damage on a failed save. On a failed save, the target is restrained until the end of its next turn.
```

---

## 31. Thunderhead Drake — CR 7

**Input:** `a young storm drake whose breath is a rolling wall of thunder`
**Donor:** dragon-2 -> CR 7
**Signature:** dropped · **elapsed** 3s

**Type line:** `Large Dragon, Chaotic Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a young storm drake whose breath is a rolling wall of thunder" (call)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | dragon: ✓ ("a young storm drake whose breath is a ro") | dragon: key "drake" (class body)
[concept] resolve: archetype=dragon type=Dragon typeFrom=the route call themes=draconic/breath mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[reskin] mind tier: INT 12 -> 15 — the call read this creature as capable at CR 7
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 7
[reskin] mind tier: CHA 14 -> 18 — the call read this creature as formidable at CR 7
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> The storm drake opens by climbing above the fray and letting its thunder-wall breath roll downhill through the enemy line, scattering formations before it ever lands a claw. Each round after, it stoops to bite and rake a broken straggler, then beats back up out of reach to line up another rolling peal. Under pressure it fights to the death, roaring louder as it bleeds — a young drake that has not yet learned fear.

**`[concept] lore:`**, uncut

> Hatched in the squall-clouds that roost on high crags, a storm drake rides the front edge of every thunderstorm, claiming the rolling boom as its own voice and the lightning-lit valley as its hunting ground.

**Every attack row**
```
Bite. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.
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

Stormfront Sense. While the thunderhead drake is airborne and above every enemy within sight, the drake has Advantage on Perception checks, and creatures that can hear it have Disadvantage on Perception checks made to track it through the storm it brings.

Actions

Multiattack. The thunderhead drake makes two Bite attacks.

Bite. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.

Rolling Peal (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

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

## 32. Pass-Father Grondel — CR 9

**Input:** `a stone giant exile who speaks only Giant and understands no Common`
**Donor:** brute-9 -> CR 9
**Signature:** library · **elapsed** 3s

**Type line:** `Huge giant, neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Stone Giant (is) — "stone giant" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("a stone giant exile") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant typeFrom=the route call themes=elemental/bestial mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> A mountain of scarred stone-flesh that answers strangers only in Giant, the exile closes ground in a flat, unhurried charge and swings a chunk of broken cliff like a club until the fight is over. Each round it trades blows deliberately, shrugging off hits that would fell smaller things, and it hurls loose boulders at anyone who tries to skirmish out of reach. It does not flee and does not toy — bloodied, it plants its feet, digs in, and grinds the fight down to whoever is left standing. That it cannot understand Common never softens it: it reads intent from stance and sound, so a shouted parley buys only the time it takes to close.

**`[concept] lore:`**, uncut

> Cast out of its clan's caves for some forgotten stone-law transgression, this exile wanders the high passes and scree fields, seeking either a way to earn a place back or a death heavy enough to be worth remembering.

**Every attack row**
```
(no attack row)
```

```
Pass-Father Grondel
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

Stone Splinters.When Grondel takes bludgeoning, piercing, or slashing damage from a melee attack, the attacker takes 14 (4d6) piercing damage as stone splinters bite into them.
Deflect Missile (Recharge 5-6) (Reaction).When Grondel is hit by a ranged attack roll and takes Bludgeoning, Piercing, or slashing damage from it, Grondel reduces the damage it takes from the attack by 11 (1d10 + 6), and if that damage is reduced to 0, Grondel can redirect some of the attack's force. One creature Grondel can see within 60 feet must make a DC 18 Dexterity saving throw, taking 11 (1d10 + 6) force damage on a failed save.

Actions
Multiattack: Grondel makes two attacks: one with Stone Club and one with Boulder.
Stone Club: Melee Weapon Attack: +10 to hit, reach 15 ft., one target. Hit: 28 (5d8 + 6) bludgeoning damage.
Boulder: Ranged Weapon Attack: +10 to hit, range 60/240 ft., one target. Hit: 24 (4d8 + 6) bludgeoning damage.
```

---

## 33. Steamclaw Ascetic — CR 5

**Input:** `lizardfolk monk`
**Donor:** defender-5 -> CR 5
**Signature:** dropped · **elapsed** 3s

**Type line:** `Medium humanoid, neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: lizardfolk monk — A scarred lizardfolk ascetic who reads an opponent's stance before the first blow and answers it with a chain of drilled, bone-hard strikes — tailsweep, elbow, claw — that flow into one another without pause. Every round it keeps the pressure on, stepping into the reach of larger f
[concept] expansion answered: type=Humanoid (type_source=?) material=bone size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: —
[path] class_npc — class monk — species lizardfolk — "monk" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("stepping into the reach of larger foes t") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=bestial/uncanny mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Tail Lash), Patient Defense (patient-defense)
[reskin] class weapon: Actions/"Shortsword" -> "Unarmed Strike" — a monk fights with its hands, not the Spy's; the body's rider folds in (+7)
[reskin] class weapon: "Dart" rolls Dexterity — a launcher is DEX in print: +6 -> +5
[reskin] class weapon: Actions/"Hand Crossbow" -> "Dart" — a monk fights with a dart, not the Spy's
```

**`[concept] identity:`**, uncut

> A scarred lizardfolk ascetic who reads an opponent's stance before the first blow and answers it with a chain of drilled, bone-hard strikes — tailsweep, elbow, claw — that flow into one another without pause. Every round it keeps the pressure on, stepping into the reach of larger foes to deny them their strength and parrying claws and blades off its scaled forearms. It fights with cold patience, never taunting, and yields ground only when the fight is truly lost — a disciplined survivor, not a butcher.

**`[concept] lore:`**, uncut

> Raised in a marsh-side cloister of scalding steam-vents, this lizardfolk abandoned its tribe's crude raiding to master an old, silent order of unarmed discipline, and now walks the world testing its forms against any warrior worth the lesson.

**Every attack row**
```
(no attack row)
```

```
Steamclaw Ascetic
Medium humanoid, neutral
Armor Class

18

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

Hold Breath.The ascetic can hold its breath for 15 minutes.
Patient Defense (Bonus Action).The ascetic takes the Dodge action.

Actions
Multiattack: The ascetic makes two attacks: one with its Unarmed Strike and one with its Dart.
Unarmed Strike: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage. Once on each of the ascetic's turns when it hits with this attack, the target is subjected to the following effect. The target must make a DC 14 Constitution saving throw. On a failed save, the target is stunned until the end of the ascetic's next turn.
Dart: Ranged Weapon Attack: +5 to hit, range 20/60 ft., one target. Hit: 15 (3d8 + 2) piercing damage.
```

---

## 34. Krennik Skullstandard — CR 4

**Input:** `name: Krennik Skullstandard | riding a worg`
**Donor:** skirmisher-3-mounted -> CR 4 (invented — no printed peer)
**Signature:** library · **elapsed** 3s

**Type line:** `Medium humanoid, neutral evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "riding a worg" (call)
[route] skirmisher-mounted type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=armed/terror mind=sapient style=mounted energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: CHA stays 8 against "ordinary" — the card's 8 is already ordinary
[reskin] mind tier: INT 8 -> 15 — the call read this creature as capable at CR 4
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 4
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> Krennik opens a fight by putting his worg into a full gallop and riding down the nearest foe, his skull-topped standard shrieking overhead as the beast's jaws snap past; he hits, carries through, and turns wide to line up a second pass rather than ever standing to trade. Under pressure he circles at range, using the worg's speed and his standard's din to break formation and pick off the stragglers, and he flees mounted only when the beast falls under him.

**`[concept] lore:`**, uncut

> A sellsword captain who sold his warband's souls to a goblin-market warlock for a banner that never lets its bearer retreat, Krennik now rides the border roads collecting the tolls his standard demands.

**Every attack row**
```
(no attack row)
```

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

	

15 (+2)

	

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

Skull Standard's Din.While Krennik is mounted and not Incapacitated, any enemy that starts its turn within 30 feet of Krennik and can see the standard has disadvantage on Opportunity Attacks made against Krennik or his mount.
Running Pass.Krennik ignores Difficult Terrain, and Opportunity Attacks against it are made with disadvantage.
Mounted Agility (Bonus Action).Krennik takes the Dash or Disengage action.

Actions
Multiattack: Krennik makes two attacks, using Saber or Javelin. It can replace one attack with a use of Skull Standard Cry.
Saber: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is knocked prone.
Javelin: Ranged Weapon Attack: +5 to hit, range 30/120 ft., one target. Hit: 6 (1d6 + 3) piercing damage.
Galloping Charge (Recharge 5-6): Krennik moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters must make a DC 13 Dexterity saving throw, taking 24 (7d6) bludgeoning damage on a failed save. On a failed save, the target is knocked prone.
Skull Standard Cry: Each creature of Krennik's choice in a 30-foot radius originating from Krennik that can see or hear it must make a DC 13 Wisdom saving throw. On a failed save, the target is frightened until the end of its next turn. On a successful save, the target is immune to this creature's terror for 24 hours.
```

---

## 35. Well-Drowned — CR 5

**Input:** `name: the thing in the well | `
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 2s

**Type line:** `Medium Aberration, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: the thing in the well — It opens a fight by calling from the dark below, its voice stealing down the well-shaft to lure the thirsty into leaning too far over the stones; then it surges up the wet masonry on hooked brine-slick limbs to seize and drag its victim down into the black water. Every round
[concept] expansion answered: type=Aberration (type_source=inferred) material=brine size=Large mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: grapple
[path] homebrew — "the thing in the well" (call)
[route] brute-grappler type=Aberration mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but quoted "surges up the wet masonry on h", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("seize and drag its victim down into the ") | brute-grappler: key "seize" (class verb)
[concept] resolve: archetype=brute type=Aberration typeFrom=the route call themes=aquatic/grasping mind=sapient style=grappler energy=Cold mix=both identity=✓ lore=✓
[reskin] mind tier: INT 4 -> 15 — the call read this creature as capable at CR 5
[reskin] mind tier: WIS 10 -> 18 — the call read this creature as formidable at CR 5
[reskin] mind tier: CHA 4 -> 15 — the call read this creature as capable at CR 5
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> It opens a fight by calling from the dark below, its voice stealing down the well-shaft to lure the thirsty into leaning too far over the stones; then it surges up the wet masonry on hooked brine-slick limbs to seize and drag its victim down into the black water. Every round after it retreats a little, coiling in the deep and striking only when a head or hand comes near, patient and certain that anything at the rim must eventually come to the water.

**`[concept] lore:`**, uncut

> Something drowned in the old well and never rose, and now it reaches up through the water only to pull down anyone who comes to draw or to listen.

**Every attack row**
```
Brine Hook. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Piercing damage plus 7 (2d6) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.
```

```
Well-Drowned

Medium Aberration, Neutral

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
18
+4
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

Skills Athletics +6, Perception +7

Immunities Cold

Senses darkvision 60 ft.; Passive Perception 17

Languages Common

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The well-drowned makes two Brine Hook attacks. It can replace one attack with a use of Drowning Hymn.

Brine Hook. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Piercing damage plus 7 (2d6) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Drowning Hymn. Strength Saving Throw: DC 13, each creature in a 60-foot Emanation originating from the well-drowned. Failure: The target is pulled up to 15 feet straight toward the well-drowned, and the target has the Frightened condition until the end of its next turn.

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
**Signature:** library · **elapsed** 3s

**Type line:** `Large humanoid, chaotic neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Lizardfolk (is) — class barbarian — species lizardfolk — "lizard folk" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("Wields a greataxe two-handed") | brute -> skirmisher-hurler: the concept's VERB outranks the noun (key "throw", class verb) | skirmisher-hurler: key "throw" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=bestial/terror mind=sapient style=hurler energy=Thunder mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: WIS stays 14 against "capable" — the card's 14 is already capable
[reskin] mind tier: CHA 10 -> 18 — the call read this creature as formidable at CR 8
[reskin] class kit: none — the twist path takes no class kit
[reskin] free row repaired: "Barbarian Rage": "While Meshrin is not wearing heavy armor, it can enter a rage as a Bon" -> "While Meshrin is not wearing heavy armor, Meshrin can enter a rage as a Bonus Action; whil"
```

**`[concept] identity:`**, uncut

> Meshrin opens by roaring — a bone-shaking challenge that freezes the nerve of anyone in earshot — then hurls his javelin to drop a runner before closing with the greataxe in a red haze. Every round after that he is a storm of rage: he presses the nearest foe, shrugs off wounds that would drop a lesser warrior, and lets the axe speak. Under pressure he does not withdraw; he goes deeper into the rage, fighting to the death and dragging down as many as he can.

**`[concept] lore:`**, uncut

> A river-war veteran of the lizardfolk raiding bands, Meshrin dipped his blades in blood and his spirit in fury until he grew too large for the marsh and too loud for any chief to command — now he marches alone, screaming for a worthy fight.

**Every attack row**
```
(no attack row)
```

```
Meshrin
Large humanoid, chaotic neutral
Armor Class

16 (breastplate)

Hit Points: 

120 (14d10 + 42)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

18 (+4)

	

16 (+3)

	

10 (+0)

	

14 (+2)

	

18 (+4)

Skills: 

Perception +5, Stealth +7

Saving Throws: 

DEX +7, WIS +5

Senses: 

passive Perception 15

Languages: 

Common, Draconic

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Barbarian Rage.While Meshrin is not wearing heavy armor, Meshrin can enter a rage as a Bonus Action; while raging, its attacks deal an extra 7 (2d6) damage of the weapon's type, it has advantage on Strength checks and saves, and the rage ends at the end of its next turn or, if it takes damage before then, at the end of its following turn.
Hold Breath.Meshrin can hold its breath for 15 minutes.
Great Weapon Master.When Meshrin hits a creature with its Greataxe, the attack deals an extra 3 damage.
Marsh Stride.Difficult Terrain composed of mud doesn't cost Meshrin extra movement, and Meshrin can move across mud without needing to make an ability check.
Fleet Agility (Bonus Action).Meshrin takes the Dash or Disengage action.
Binding Mark (Bonus Action).One creature within 30 feet must make a DC 15 Wisdom saving throw. On a failed save, until the start of Meshrin's next turn, the target has disadvantage on attack rolls against creatures other than Meshrin.

Actions
Multiattack: Meshrin makes three attacks, using Greataxe or Javelin.
Greataxe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (2d12 + 4) slashing damage.
Javelin: Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 18 (4d6 + 4) piercing damage.
Terror Roar (Recharge 5-6): One creature within 30 feet must make a DC 15 Wisdom saving throw. On a failed save, the target is frightened until the end of its next turn.
```

---

## 38. Unyielded Champion — CR 6

**Input:** `a skeleton with a greatsword`
**Donor:** brute-5 -> CR 6
**Signature:** library · **elapsed** 3s

**Type line:** `Medium Undead, Lawful Evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a skeleton with a greatsword
[path] twist — Skeleton (is) — "skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead typeFrom=the route call themes=grave/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
[reskin] multiattack re-read — "Shortbow" joins the combination; "The champion makes two attacks, using Greatsword or Shortbow in any combination."
```

**`[concept] identity:`**, uncut

> It opens the fight with a two-handed overhead cut from a dead stop, its silence the only warning a player gets, then keeps up a relentless hewing rhythm — step, cleave, reset — trading blows it has no flesh to lose. It never flinches, never tires and never feints; it simply advances, and only the total collapse of its frame will stop the greatsword's arc.

**`[concept] lore:`**, uncut

> A champion who swore to win a duel then died before the terms were met, the skeleton stands where the field was and keeps fighting the same fight against anyone who crosses it, unwilling to admit the contest is over.

**Every attack row**
```
Greatsword. Melee Attack Roll: +7, reach 5 ft. 21 (5d6 + 4) Slashing damage.
Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 16 (3d8 + 3) Piercing damage.
```

```
Unyielded Champion

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

Closing Blade. While the champion is moving toward a creature it has damaged within the last 24 hours, the champion's Speed can't be reduced and Difficult Terrain doesn't cost it extra movement.

Great Weapon Master. When the champion hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The champion makes two attacks, using Greatsword or Shortbow in any combination.

Greatsword. Melee Attack Roll: +7, reach 5 ft. 21 (5d6 + 4) Slashing damage.

Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 16 (3d8 + 3) Piercing damage.

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

## 39. Orrin Sable — CR 5

**Input:** `a sellsword who hurls a handaxe and closes with a shortsword`
**Donor:** skirmisher-8-hurler -> CR 5 (invented — no printed peer)
**Signature:** library · **elapsed** 3s

**Type line:** `Medium humanoid, neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class fighter — "sellsword" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-hurler: ✓ ("hurls a handaxe") | skirmisher-hurler: key "hurls" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: fighter — "sellsword": Riposte (riposte)
```

**`[concept] identity:`**, uncut

> The sellsword opens by hurling a handaxe from just outside reach, then uses the moment the enemy flinches or closes to rush in with a shortsword and finish the exchange at arm's length. Every round thereafter it dances between the two distances — throw, step in, cut, peel back — reading the opponent and refusing to stay planted. It is a paid fighter, not a fanatic: once bloodied it looks for an angle to withdraw and live to collect, but it will spend every trick it has before conceding ground.

**`[concept] lore:`**, uncut

> A down-on-his-luck blade from the trade roads, this sellsword takes contracts no banner company will and wants nothing more than to walk away from the fight with his purse and his hide intact.

**Every attack row**
```
(no attack row)
```

```
Orrin Sable
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

Find the Angle.When Orrin hits a creature within 5 feet of it with a Handaxe attack, Orrin can move up to 10 feet without provoking an Opportunity Attack from that creature.
Riposte (Reaction).When a creature within 5 feet of Orrin misses it with a melee attack roll, Orrin makes one Handaxe attack against that creature.
Parry (Reaction).When Orrin is hit by a melee attack roll while holding a weapon, Orrin adds 3 to its AC against that attack, possibly causing it to miss.

Actions
Multiattack: Orrin makes three Handaxe attacks. It can replace one attack with a use of Shortsword.
Handaxe: Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) slashing damage, and Orrin has advantage on its next attack roll against the target before the end of its next turn.
Shortsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage.
Shield Bash: One creature within 5 feet that Orrin can see must make a DC 15 Strength saving throw, taking 9 (2d4 + 4) bludgeoning damage on a failed save. On a failed save, if the target is a Medium or smaller creature, it is knocked prone.
```

---

## 40. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** defender-3 -> CR 3
**Signature:** library · **elapsed** 1s

**Type line:** `Medium humanoid, neutral` — **set by** fix A/E (a person with no named body)

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Brother Halric — Brother Halric was a village healer who poisoned his own flock and rose as a plague-bearing revenant wrapped in soiled grave-wrappings, and he opens a fight with a wet, contagion-laden lunge that leaves the wound putrid. Every round after he works the fight like a shepherd — herding
[concept] expansion answered: type=Undead (type_source=inferred) material=grave size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: aura
[path] class_npc — class cleric — "Brother" (call)
[route] defender-leader type=Undead mechanics=aura — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but quoted "pressing the sick with rotting", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("works the fight like a shepherd — herdin") | lurker-phantom: the call read "revenant" as not meaning that mechanic here — no override | defender-leader stands: every key that would override it was read as a figure of speech | defender-leader: no line key in the words — the model's read of its quote
[concept] type settled: Undead -> Humanoid — the GM's words are a name and the class word and nothing else, and a person with no named body is a Humanoid (owner's ruling, 2026-11-15, widened 2026-11-16); the route call had answered Undead
[concept] resolve: archetype=defender type=Humanoid typeFrom=fix A/E (a person with no named body) themes=grave/mind mind=sapient style=leader energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Brother": nothing to add — the sheet already answers it
[reskin] class weapon: "mace" already names a row on this body — no row is renamed to it (fix F: one name, one row)
```

**`[concept] identity:`**, uncut

> Brother Halric was a village healer who poisoned his own flock and rose as a plague-bearing revenant wrapped in soiled grave-wrappings, and he opens a fight with a wet, contagion-laden lunge that leaves the wound putrid. Every round after he works the fight like a shepherd — herding foes into narrow ground, then pressing the sick with rotting hands while muttering diagnoses of their sin — and he does not break and run; bloodied, he retreats only to reposition, patient and didactic to the last, treating the fight as a sermon that must be finished.

**`[concept] lore:`**, uncut

> Halric tended the sick until he began deciding who deserved to live, and now he walks the plague-road looking for congregations to 'heal' — his touch spreads the very rot that killed his village.

**The Spellcasting row, in full**
```
Spellcasting: Brother Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
```

**Every attack row**
```
(no attack row)
```

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

Seeping Wrappings.A creature that grapples Brother Halric or is grappled by it is poisoned until the end of its next turn.
Divine Aid (3/Day) (Bonus Action).Brother Halric casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Brother Halric makes two attacks: one with Mace and one with Radiant Flame.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage. Until the end of Brother Halric's next turn, Brother Halric has advantage on attack rolls against the target, and the target can't take the Hide action.
Spellcasting: Brother Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
```


# Arm "no-look-again" — 38 sheets

a live audit whose prompt drops the one "look again" sentence. **0 threw, 0 timed out.**

`smoke-out/arm-no-look-again-2026-11-16T21-46-04`

---

## 01. Dire Wolf — CR 1

**Input:** `name: Dire Wolf | with a frost-rimed hide`
**Donor:** skirmisher-1 -> CR 1
**Signature:** library · **elapsed** 3s

**Type line:** `Large Beast, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher: ✓ ("Dire Wolf") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause and the call did not claim one, so "fire" is a guess from what the creature is, not the GM's ask
[concept] resolve: archetype=skirmisher type=Beast typeFrom=the route call themes=bestial mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> A frost-rimed dire wolf opens with a bounding rush from the flank, its packmates fanning wide before it darts in to tear at a hamstring and wheels back out of reach, rime flaking from its hide in its wake. It circles and re-commits every round, never standing and trading, and its cold breath and crusted coat make each close pass cost the prey a little more speed than the last. Pressed and bloodied, it does not break — it falls back toward the pack, letting the boldest of its kin soak the attention while it lines up the next run.

**`[concept] lore:`**, uncut

> Frost-rimed dire wolves den in the blue shadow of glaciers, and a pack that has fed on nothing but frozen carrion for a winter grows a hide of living rime that it uses to run down anything warm enough to be worth the chase.

**Every attack row**
```
Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.
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

Crusted Wake. A creature starts its turn within 5 feet of the wolf, rime crusts the ground around that creature, reducing its Speed by 10 feet until the end of its turn.

Pack Tactics. The wolf has Advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

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
**Signature:** library · **elapsed** 5s

**Type line:** `Medium beast, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a mud-caked bog hound that drags fishermen under" (call)
[route] brute-grappler type=Beast mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape: grip on the GM's own words "drags fishermen under" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("drags fishermen under") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Beast typeFrom=the route call themes=grasping/aquatic mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 1
[reskin] mind tier: CHA 4 -> 10 — the call read this creature as ordinary at CR 1
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> The bog hound waits half-submerged at the water's edge, mud-caked hide indistinguishable from the bank, then lunges to seize a fisherman's leg in its jaws and drags him thrashing into the silt. Every round after, it does not let go — it plants its heavy body, hauls backward toward deeper water, and holds prey under until it stops fighting. It is a pure ambush predator that will not abandon a grabbed kill; wounded, it tightens its grip and sinks rather than flee.

**`[concept] lore:`**, uncut

> Born in the choked shallows where drowned fishermen are buried in silt, a bog hound is a hunger that learned to wear the riverbank as a coat, and it wants only to add another body to the mud.

**Every attack row**
```
(no attack row)
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

Mud-Caked Hide.While the bog hound remains motionless, it is indistinguishable from the mud or riverbank it lies in.

Actions
Multiattack: The bog hound makes two Bite attacks. It can replace one attack with a use of Drag prone.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained.
Drag Prone: Each creature in a 15-foot cone must make a DC 13 Strength saving throw. On a failed save, the target is pushed up to 15 feet away from the bog hound and is knocked prone.
```

---

## 03. Owlbear — CR 3

**Input:** `name: Owlbear | that has learned to climb`
**Donor:** skirmisher-3 -> CR 3
**Signature:** library · **elapsed** 6s

**Type line:** `Large monstrosity, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: Owlbear — that has learned to climb
[path] twist — Owlbear (is) — "Name field: Owlbear" (code)
[route] skirmisher type=Monstrosity mechanics=none — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but offered no quote | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher: ✓ ("that has learned to climb") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Monstrosity typeFrom=the route call themes=bestial/aerial mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> An owlbear that has learned to climb opens from above, dropping off a trunk or ledge onto prey with crushing weight before raking and withdrawing up the nearest vertical surface. Every round it circles at height, feints a drop to scatter the group, then commits when one target is isolated and bleeding. Under pressure it does not flee — it climbs out of reach, waits, and descends again, patient and vindictive.

**`[concept] lore:`**, uncut

> Hatched in a forest of tall pines and stone bluffs, this owlbear learned that the canopy is a hunting ground and now claims the vertical wilderness as its own, taking prey that forgets to look up.

**Every attack row**
```
(no attack row)
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
Multiattack: The owlbear makes two Rend attacks. It can replace one attack with a use of Crashing Pounce.
Rend: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.
Crashing Pounce: The owlbear spends 5 feet of movement to jump to a space within 15 feet that contains one or more Large or smaller creatures. Each creature in the destination space must make a DC 15 Dexterity saving throw, taking 11 (2d10) slashing damage on a failed save, or half as much damage on a successful one. On a failed save, the target is knocked prone.
```

---

## 04. Chapel Bell-Ringer — CR 3

**Input:** `a chapel bell-ringer's ghost that tolls for the dying`
**Donor:** lurker-2 -> CR 3
**Signature:** library · **elapsed** 4s

**Type line:** `Medium Undead, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Ghost (is) — "ghost" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-phantom: ✓ ("a chapel bell-ringer's ghost") | lurker-phantom: key "ghost" (class body)
[concept] resolve: archetype=lurker type=Undead typeFrom=the route call themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> The bell-ringer's ghost opens by tolling its spectral bell, marking the living as dying and draining vitality from those who hear it. Every round after, it drifts through walls to stay at the edge of light, swinging its heavy bell-clapper on a chain to strike and stun those who try to flee its knell. It fights to the death with the grim patience of one who has already died once, never fleeing but fading into shadows only to return when the light fails.

**`[concept] lore:`**, uncut

> Killed when the chapel bell crushed him during a storm, the ringer's spirit now tolls for anyone whose time it believes has come, dragging them toward the grave by ringing their death even before they fall.

**Every attack row**
```
Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.
```

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

Ethereal Sight. The chapel bell-ringer can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The chapel bell-ringer can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The chapel bell-ringer makes two Withering Touch attacks. It can replace one attack with a use of Grave Knell.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Grave Knell. Constitution Saving Throw: DC 13, one creature within 30 feet. Failure: 7 (2d6) Necrotic damage, and the chapel bell-ringer regains Hit Points equal to half the damage dealt.

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

---

## 05. Air Elemental — CR 5

**Input:** `name: Air Elemental | that carries stolen voices`
**Donor:** brute-5 -> CR 5
**Signature:** library · **elapsed** 8s

**Type line:** `Large Elemental, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Air Elemental (is) — "Name field: Air Elemental" (code)
[route] brute-juggernaut type=Elemental mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("Air Elemental") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental typeFrom=the route call themes=elemental/voice mind=sapient style=juggernaut energy=Thunder mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
[reskin] free row repaired: "Echo of the Stolen Chorus": "Whenever it is struck by a creature, the wound releases the loudest st" -> "When a creature strikes the air elemental with a melee attack and is within 10 feet of it,"
```

**`[concept] identity:`**, uncut

> The Air Elemental opens by swelling into a howling vortex and loosing a chorus of stolen voices—screams, pleas, and taunts torn from past victims—so the battlefield is drowned in sound before it ever strikes. Every round after, it lashes with compressed air that carries those same voices as a psychic shriek, hammering bodies and nerves at once while it drifts and reforms around blows. Under pressure it does not retreat—it remembers every voice it took and grows more savage, throwing the loudest of them at the prey that hurt it, fighting to the last because a voice lost is a self diminished.

**`[concept] lore:`**, uncut

> An air elemental that drifted through a massacre and swallowed every dying sound, it now hunts the living to fill its hollow chorus with one more voice—and will not rest until every scream in its keeping has been answered.

**Every attack row**
```
Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.
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

Echo of the Stolen Chorus. When a creature strikes the air elemental with a melee attack and is within 10 feet of it, the wound releases a shrieking echo: that creature has the Deafened condition and Disadvantage on attack rolls until the end of the elemental's next turn.

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

---

## 06. Scree Pit — CR 5

**Input:** `a quarry-pit thing of living scree that buries what it catches`
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 11s

**Type line:** `Large elemental, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a quarry-pit thing of living scree that buries what it catches" (call)
[route] brute-grappler type=Elemental mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape: contain on the GM's own words "burles what it catches" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("buries what it catches") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental typeFrom=the route call themes=elemental/subterranean mind=mindless style=grappler energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as mindless, and the card's 4 is already that dim
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] free row repaired: "Stone Flood": "*Strength Saving Throw*: DC 14, each creature in a 30-foot Cone. *Fail" -> "*Strength Saving Throw*: DC 14, each creature in a 30-foot Cone. *Failure:* The target is "
```

**`[concept] identity:`**, uncut

> A pit of living scree that hauls itself up out of abandoned quarry floors, opening with a grinding lunge to seize a victim in its gravel limbs and drag them down into the loose stone at its base; every round after, it constricts and endlessly pours scree over the caught, piling weight until the prey is buried. It is a patient, mindless grave that never retreats — only stone left after quarrymen moved on, wanting nothing but more rubble to swallow.

**`[concept] lore:`**, uncut

> Born when the spilled spoil of a worked-out quarry grew long enough to remember every stone that fell into it, the scree-pit haunts the pit's own floor, endlessly dragging new rubble — and new bodies — into its hoard of buried things.

**Every attack row**
```
(no attack row)
```

```
Scree Pit
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

Entomb (Bonus Action).The scree pit entombs one Medium or smaller creature it is grappling. While entombed, the target is blinded and restrained, has Total Cover against attacks and other effects outside the scree pit, and takes 7 (2d6) bludgeoning damage at the start of each of the scree pit's turns. The scree pit can have only one creature entombed at a time. If the scree pit takes 15 damage or more in a single turn from the entombed creature, the scree pit must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the scree pit. If the scree pit dies, an entombed creature breaks free prone by using 5 feet of movement.

Actions
Multiattack: The scree pit makes two Scree attacks. It can replace one attack with a use of Stone Flood.
Scree: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained.
Stone Flood: Each creature in a 30-foot cone must make a DC 14 Strength saving throw. On a failed save, the target is pulled up to 10 feet straight toward the scree pit and is knocked prone.
```

---

## 07. Hydra — CR 8

**Input:** `name: Hydra | whose stumps smoke instead of regrowing`
**Donor:** brute-5 -> CR 8
**Signature:** library · **elapsed** 5s

**Type line:** `Huge monstrosity, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Hydra (is) — "Name field: Hydra" (code)
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-regenerator: ✓ ("stumps smoke instead of regrowing") | brute-regenerator: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause and the call did not claim one, so "fire" is a guess from what the creature is, not the GM's ask
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=venomous/terror mind=bestial style=regenerator energy=Poison mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> A hydra whose cauterized stumps vent scalding caustic smoke rather than regrowing heads — each severed neck becomes a smoking wound that keeps closing and splitting around the blade. It wades in low and wide, sweeping its remaining heads in a many-angled rush and letting attackers choke on the plumes it trails, absorbing punishment as its flesh stitches shut. It is a hateful, patient hunter that does not tire or flee; it only fights harder as it is cut, because every wound is another furnace lit.

**`[concept] lore:`**, uncut

> Sparked in a marsh where brimstone seeps through drowned peat, this hydra's blood turned to caustic vapor, and it now broods in the reeds waiting to bathe intruders in its own burning breath.

**Every attack row**
```
(no attack row)
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

Hold Breath.The hydra can hold its breath for 1 hour.
Multiple Heads.The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead.
Reactive Heads.For each head the hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks.

Actions
Multiattack: The hydra makes as many Bite attacks as it has heads.
Bite: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.
Caustic Vapor (Recharge 5-6): Each creature in a 30-foot cone must make a DC 16 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one. On a failed save, the target is blinded until the end of its next turn.
```

---

## 08. Orchard Ram-Golem — CR 8

**Input:** `a siege-engine golem of lashed timber that shoulders through walls`
**Donor:** brute-5-juggernaut -> CR 8
**Signature:** library · **elapsed** 6s

**Type line:** `Large Construct, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a siege-engine golem of lashed timber that shoulders through walls" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("siege-engine golem of lashed timber") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=forged/terror mind=mindless style=juggernaut energy=Thunder mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 6 against "feeble" — the call read this creature as mindless, and the card's 6 is already that dim
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] free row repaired: "Trample (Recharge 5-6)": "The ram-golem moves up to its Speed without provoking Opportunity Atta" -> "*Dexterity Saving Throw*: DC 16, each creature in a 20-foot Emanation originating from the"
```

**`[concept] identity:`**, uncut

> A lashed-timber siege golem that opens by shouldering straight through the nearest wall, showering splinters and stone on whoever sheltered behind it, then pivots to pound the defenders it just exposed. Every round it advances along the shortest line to the biggest obstruction, splintering doors, barricades, and load-bearing walls and swinging its battering bulk at anything that gets in the way. It has no fear and no retreat — a mindless engine that only stops when its timber is broken apart.

**`[concept] lore:`**, uncut

> Built by a besieging army from felled orchards and iron banding, the ram-golem was left behind half-animated when the siege lifted, and it still walks the ruined walls trying to reach a gate that is no longer there.

**Every attack row**
```
Timber Ram. Melee Attack Roll: +8, reach 5 ft. 14 (2d8 + 5) Bludgeoning damage plus 11 (2d10) Thunder damage.
```

```
Orchard Ram-Golem

Large Construct, Unaligned

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

Immunities Poison, Thunder; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Understands the languages of its creator but can't speak

CR 8 (XP 3,900; PB +3)

Traits

Thunder Absorption. Whenever the ram-golem is subjected to Thunder damage, it takes no damage and instead regains a number of Hit Points equal to the Thunder damage dealt.

Immutable Form. The ram-golem can't shape-shift.

Magic Resistance. The ram-golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The ram-golem makes two Timber Ram attacks.

Timber Ram. Melee Attack Roll: +8, reach 5 ft. 14 (2d8 + 5) Bludgeoning damage plus 11 (2d10) Thunder damage.

Trample (Recharge 5-6). Dexterity Saving Throw: DC 16, each creature in a 20-foot Emanation originating from the ram-golem. Failure: 38 (11d6) Thunder damage, and the target has the Prone condition. Success: Half damage only.

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
**Signature:** dropped · **elapsed** 3s

**Type line:** `Large Construct, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Stone Golem (is) — "Name field: Stone Golem" (code)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("carved as a weeping saint") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=grave/forged mind=sapient style=juggernaut energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> The Weeping Saint opens by walking in a straight line through whatever the party hides behind, stone fists swinging with the slow, terrible certainty of a falling cathedral, while tears of wet mortar streak its carved cheeks. Every round it advances on the most faithful-looking target first — the one kneeling, praying, or holding a holy symbol — and beats the ground into rubble around it, never breaking stride. It does not flee and it does not gloat; it endures, patient as stone, until every supplicant is still.

**`[concept] lore:`**, uncut

> A cathedral mason carved a saint to weep for the sins of a dying town, and when the town began to worship the statue's tears instead of its god, the stone answered the prayer wrongly and rose to make mourning permanent.

**Every attack row**
```
Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.
Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.
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

Weeping Saint. While the stone golem remains motionless, it is indistinguishable from a carved weeping saint.

Immutable Form. The stone golem can't shape-shift.

Magic Resistance. The stone golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The stone golem makes two attacks, using Slam or Force Bolt in any combination.

Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.

Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.

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

---

## 10. Drowned Choir — CR 10

**Input:** `a drowned cathedral choir that sings in one voice`
**Donor:** lurker-8 -> CR 10
**Signature:** library · **elapsed** 8s

**Type line:** `Medium undead, neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a drowned cathedral choir that sings in one voice" (call)
[route] lurker type=Undead mechanics=aura — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-phantom: a Huge body is not incorporeal — print's incorporeals are Medium and smaller | swarm: a swarm is a mass of many — the call reads one creature, not a mass | fell to lurker's plain line | lurker: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause and the call did not claim one, so "radiant" is a guess from what the creature is, not the GM's ask
[concept] resolve: archetype=lurker type=Undead typeFrom=the route call themes=grave/aquatic mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[reskin] mind tier: INT 13 -> 15 — the call read this creature as capable at CR 10
[reskin] mind tier: WIS 14 -> 20 — the call read this creature as formidable at CR 10
[reskin] mind tier: CHA 11 -> 20 — the call read this creature as formidable at CR 10
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> It waits submerged and silent in the flooded nave until prey is within the choir's reach, then breaks the water in a single choral strike that hits as one drowning voice — salt-thick sound and grave-cold pressure arriving together. Every round after, it circles half-seen beneath the surface, answering attacks with staggered phrases of the same hymn so each note lands as a blow until its target's breath and footing give way, and under pressure it will sink into the flooded dark to re-form the chord before striking again rather than trade blows. It does not flee in panic; it withdraws the way a conductor quiets an orchestra — only to bring the full volume back where the enemy is weakest.

**`[concept] lore:`**, uncut

> When the cathedral drowned, its choir kept its final note, and the congregation of dead singers still believes the service is unfinished, dragging the living under the water to fill the empty stalls.

**Every attack row**
```
(no attack row)
```

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

darkvision 60 ft., passive Perception 19

Languages: 

Common plus the languages it knew in life

Challenge

10 (5,900 XP)

Proficiency Bonus:

+4

Umbral Step (Bonus Action).While in Dim Light or Darkness, the choir takes the Hide action.

Actions
Multiattack: The choir makes three Grave-Chill Voice attacks. It can replace one attack with a use of Drowning Chord.
Grave-Chill Voice: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage plus 7 (2d6) necrotic damage.
Drowning Chord: Each creature of the choir's choice in a 60-foot radius originating from the choir that can see or hear the choir must make a DC 15 Wisdom saving throw. On a failed save, the target is charmed until the start of the choir's next turn, and while charmed this way, it must move toward the choir by the safest available route on its turn and can't take Reactions. On a successful save, the target is immune to this creature's lure for 24 hours.
```

---

## 11. Vampire — CR 13

**Input:** `name: Vampire | who keeps a garden of thorns`
**Donor:** lurker-13 -> CR 13
**Signature:** library · **elapsed** 10s

**Type line:** `Medium undead, lawful evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Vampire (is) — "Name field: Vampire" (code)
[route] lurker type=Undead mechanics=snare — casts: the call reads no worked magic here | hold_shape: reach on the GM's own words "keeps a garden of thorns" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-trap: ✓ ("keeps a garden of thorns") | lurker-trap: no line key in the words — the model's read of its quote | lurker-trap -> lurker: a trap is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] resolve: archetype=lurker type=Undead typeFrom=the route call themes=grave/grasping mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> A bloodless gardener-vampire who moves unseen among its thorn hedges and opens with a single impaling strike from the brambles before melting back into cover. Each round thereafter it circles, prunes, and re-enters on its own terms, its living walls of thorn reaching out to snare any prey that guesses where it hides. It toys with intruders rather than fleeing — patient, vain, and delighted by the slow bleed of anything that trespasses in its garden.

**`[concept] lore:`**, uncut

> Once a noble who could not bear to lose the sunlight, it rooted its coffin in the soil of its own estate and grew a garden of thorn that feeds on blood so that it need never leave the dark.

**Every attack row**
```
(no attack row)
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
Multiattack (Vampire Form Only): The vampire makes two Grave Strike attacks and uses Bite. It can replace one attack with a use of Binding Lash.
Grave Strike: Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) from one of two hands.
Binding Lash: One creature within 60 feet must make a DC 17 Dexterity saving throw. On a failed save, the target is restrained until the end of its next turn.
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that has the grappled, incapacitated, or restrained condition must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) piercing damage on a failed save, plus 13 (3d8) necrotic damage. The target's Hit Point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a Vampire Spawn under the vampire's control.
Legendary Actions

The vampire can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The vampire regains spent legendary actions at the start of its turn.

Deathless Strike: The vampire moves up to half its Speed, and it makes one Grave Strike attack.
Beguile: The vampire casts Command, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17). The vampire can't take this action again until the start of its next turn.
```

---

## 12. Swarmshear — CR 13

**Input:** `a plague-bearing archon of flies that commands lesser swarms`
**Donor:** skirmisher-13-winged -> CR 13 (invented — no printed peer)
**Signature:** library · **elapsed** 8s

**Type line:** `Medium Celestial, Lawful Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — title archon — "a plague-bearing archon of flies that commands lesser swarms" (call)
[route] skirmisher-winged type=Celestial mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-winged: ✓ ("archon of flies") | skirmisher-winged: key "flies" (class verb)
[concept] resolve: archetype=skirmisher type=Celestial typeFrom=the route call themes=celestial/venomous mind=sapient style=winged energy=Poison mix=both identity=✓ lore=✓
[reskin] mind tier: INT 10 -> 15 — the call read this creature as capable at CR 13
[reskin] mind tier: WIS 16 -> 20 — the call read this creature as formidable at CR 13
[reskin] mind tier: CHA 12 -> 20 — the call read this creature as formidable at CR 13
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> The Plague-Archon opens by loosing its retinue — a whirling mantle of fly-swarms that boils off its luminous carapace to blind and poison — then dives on wings of buzzing, glittering light to snatch a target and drop it from height, harrying and bleeding the field with rot between strikes. It is a patient, contemptuous commander, never quite landing, always repositioning its swarms to shepherd prey, and it withdraws aloft only when the Host itself is threatened. It does not fight to the death out of fear — it fights to the death out of duty, but it will flee the field bloodied and return with a fresh wave of the plagued, for its purpose outlives its body.

**`[concept] lore:`**, uncut

> Sent by the higher heavens to quarantine a corrupt world, the Plague-Archon is a mercy-warrior whose cure is contagion — it spreads the holy rot that scours sin, hoarding the swarms it commands as both weapon and congregation.

**Every attack row**
```
Talons. Melee Attack Roll: +10, reach 10 ft. 14 (2d8 + 5) Slashing damage plus 10 (3d6) Poison damage. If the swarmshear flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 7 (2d6) Slashing damage and, if it is Large or smaller, has the Prone condition.
```

```
Swarmshear

Medium Celestial, Lawful Neutral

AC 18
Initiative +5 (15)

HP 187 (22d8 + 88)

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

Resistances Radiant

Immunities Charmed

Senses darkvision 120 ft.; Passive Perception 20

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Plague Aura. Constitution Saving Throw: DC 17, any creature that starts its turn in a 20-foot Emanation originating from the swarmshear. Failure: The target has the Poisoned condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Wing Drift. The swarmshear doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.

Contemptuous Sway. When a creature the swarmshear can see ends its turn within 5 feet of it, the swarmshear can move up to 10 feet without provoking Opportunity Attacks.

Actions

Multiattack. The swarmshear makes three Talons attacks. It can replace one attack with a use of Virulent Exhalation.

Talons. Melee Attack Roll: +10, reach 10 ft. 14 (2d8 + 5) Slashing damage plus 10 (3d6) Poison damage. If the swarmshear flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 7 (2d6) Slashing damage and, if it is Large or smaller, has the Prone condition.

Retinue Dive (Recharge 5-6). The swarmshear flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Dexterity Saving Throw: DC 17. Failure: 66 (12d10) Piercing damage, and the target has the Prone condition. Success: Half damage.

Virulent Exhalation. Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Poisoned condition until the end of its next turn.

Bonus Actions

Aerial Agility. The swarmshear takes the Dash or Disengage action.

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
**Signature:** dropped · **elapsed** 3s

**Type line:** `Gargantuan Monstrosity, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape: contain on the GM's own words "that swallowed a war-band's armoury" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("that swallowed a war-band's armoury") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=devouring/subterranean mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> A purple worm whose gullet is a fused mass of swallowed mail, blades, and spearheads — it breaches from below, seizes a foe in its churning maw, and grinds the prey against the armoury-lining of its throat before sliding it whole into a stomach of corroded steel. Every round it coils and repositions like a constrictor, dragging one victim inward while its plated hide shrugs off blows; the blades it has eaten erupt from its flesh as jagged spurs that shred anything pressing close. It does not flee bloodied — pain makes it swallow harder, bucking and thrashing to keep anything already half-down its gullet from escaping.

**`[concept] lore:`**, uncut

> A war-band's caravan and the full weight of its armoury went down a sinkhole into a purple worm's tunnel, and the creature ate it all — plate, mail, blades, and the warriors still wearing them — until its gut grew a second, honed skeleton of stolen steel.

**Every attack row**
```
Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.
Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.
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

Senses blindsight 60 ft., tremorsense 120 ft.; Passive Perception 14

Languages None

CR 15 (XP 13,000; PB +5)

Traits

Churning Armoury. At the start of each of the purple worm's turns, each creature inside the purple worm takes 22 (5d8) Acid damage, and the purple worm gains Temporary Hit Points equal to half the damage dealt.

Tunneler. The purple worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The purple worm makes one Bite attack and one Tail Stinger attack.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

Bonus Actions

Swallow. Strength Saving Throw: DC 21, one Large or smaller creature Grappled by the purple worm (it can have up to three creatures swallowed at a time). Failure: The target is swallowed by the purple worm, and the Grappled condition ends. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the purple worm, and takes 17 (5d6) Acid damage at the start of each of the purple worm's turns.
If the purple worm takes 30 damage or more on a single turn from a creature inside it, the purple worm must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the purple worm and has the Prone condition. If the purple worm dies, any swallowed creature no longer has the Restrained condition and can escape from the corpse using 20 feet of movement, exiting Prone.

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

## 14. Glacier-Heart — CR 15

**Input:** `a glacier's heart given legs, trailing a wake of killing cold`
**Donor:** brute-9-juggernaut -> CR 15
**Signature:** library · **elapsed** 9s

**Type line:** `Huge elemental, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a glacier's heart given legs, trailing a wake of killing cold" (call)
[route] brute-juggernaut type=Elemental mechanics=aura — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("a glacier's heart given legs") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental typeFrom=the route call themes=elemental/terror mind=bestial style=juggernaut energy=Cold mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 6 against "feeble" — the call read this creature as bestial, and the card's 6 is already that dim
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier: CHA 4 -> 15 — the call read this creature as capable at CR 15
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> A glacier's heart on stumpy, cracking legs, it announces itself with a hoarsely grinding roar and begins to walk — every stride it takes kills the ground behind it and the air ahead of it. Its combat loop is advance and abrade: it swings limbs of blue-black ice like falling seracs, letting the killing cold of its wake do the rest, and it loathes being made to stop, pressing through walls, roots, and creatures alike as though they were only weather. Under pressure it does not retreat; the cold grows deeper, its crust thickens, and it redoubles its march until it is the only thing left moving in a frozen silence.

**`[concept] lore:`**, uncut

> Something deep in the ice-age heart of a glacier woke and decided it wanted to move, so it tore its core free of the mountain and grew a crooked body of frozen stone around it; now it walks south, and it will not know it has finished until the whole valley is white.

**Every attack row**
```
(no attack row)
```

```
Glacier-Heart
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

Cold Absorption.Whenever the glacier-heart is subjected to cold damage, it takes no damage and instead regains a number of hit points equal to the cold damage dealt.
Siege Monster.The glacier-heart deals double damage to objects and structures.
Rimewake.At the start of each of its turns, the ground within 15 feet of the glacier-heart coats in rime and becomes difficult terrain; a creature that begins its turn in that frozen area takes 16 (3d10) cold damage and has its speed halved until the end of its next turn.

Actions
Multiattack: The glacier-heart makes two Slam attacks.
Slam: Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage plus 13 (3d8) cold damage.
Killing Cold (Recharge 5-6): Each creature in a 30-foot cone must make a DC 17 Constitution saving throw, taking 66 (12d10) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also deafened until the end of its next turn.
```

---

## 15. Adult Red Dragon — CR 17

**Input:** `name: Adult Red Dragon | blind in one eye from an old lance`
**Donor:** dragon-15 -> CR 17
**Signature:** library · **elapsed** 9s

**Type line:** `Huge dragon, chaotic evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Adult Red Dragon (is) — "Name field: Adult Red Dragon" (code)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | dragon: ✓ ("Adult Red Dragon") | dragon: key "dragon" (class body)
[concept] resolve: archetype=dragon type=Dragon typeFrom=the route call themes=draconic/terror mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
[reskin] free row repaired: "Ruined Eye, Wary Ear": "While a creature makes an attack against the red dragon from its blind" -> "When a creature the red dragon can't see makes an attack against it, that attack is made w"
```

**`[concept] identity:`**, uncut

> An adult red dragon with one eye scarred shut by an old lance wound, it opens by announcing itself with a roar of frightful presence and a searing cone of flame, then closes to kill with bite and claws wherever it can pin prey down. Every round after, it uses its blind-side handicap deliberately — favoring angles where its ruined eye doesn't cost it, punishing flankers with wing and tail, and refusing to be baited into a blind rush. Wounded and cornered, it fights to the death with a furious, methodical spite, withdrawing only to heal and re-engage, never truly fleeing.

**`[concept] lore:`**, uncut

> This dragon lost its eye to a hero's lance and has spent decades hunting the bloodline of the one who blinded it, hoarding their heirlooms in its burning lair.

**The Spellcasting row, in full**
```
Spellcasting: The red dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 20, +12 to hit with spell attacks): - At will: Command, Detect Magic, Scorching Ray
```

**Every attack row**
```
(no attack row)
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

## 16. Molten King — CR 17

**Input:** `a tyrant of burning brass who rules a city of forges`
**Donor:** brute-17-juggernaut -> CR 17
**Signature:** library · **elapsed** 4s

**Type line:** `Large Construct, Lawful Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — title tyrant — "a tyrant of burning brass who rules a city of forges" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("a tyrant of burning brass") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=forged/terror mind=sapient style=juggernaut energy=Fire mix=both identity=✓ lore=✓
[reskin] mind tier: INT 6 -> 15 — the call read this creature as capable at CR 17
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 17
[reskin] mind tier: CHA 4 -> 20 — the call read this creature as formidable at CR 17
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> The Brass Tyrant does not duel; it processes. It opens by wading through the front rank to reach the biggest threat, trusting molten brass skin and the crushing weight of its fists to turn anything that tries to stop it, and every round after it advances, grabs, and forges a lesson out of the nearest obstacle or the loudest dissenter. Wounded, it does not flee — it bellows a decree, plants itself like a furnace door, and fights to the death, spending its final heat in a detonation of molten slag rather than suffer a challenger to outlive it.

**`[concept] lore:`**, uncut

> Poured into a throne of living brass by the first smiths of the forge-city, the Tyrant was made to rule the forges and has never stopped believing the city owes it obedience.

**Every attack row**
```
Fist. Melee Attack Roll: +12, reach 10 ft. 19 (3d8 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.
```

```
Molten King

Large Construct, Lawful Neutral

AC 19
Initiative -1 (9)

HP 231 (22d10 + 110)

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

Molten Brass Skin. A creature that touches the molten king or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Legendary Resistance (3/Day). If the molten king fails a saving throw, it can choose to succeed instead.

Immutable Form. The molten king can't shape-shift.

Siege Monster. The molten king deals double damage to objects and structures.

Actions

Multiattack. The molten king makes two Fist attacks. It can replace one attack with a use of Seize the Unforged.

Fist. Melee Attack Roll: +12, reach 10 ft. 19 (3d8 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.

Furnace Flare (Recharge 5-6). Constitution Saving Throw: DC 19, each creature in a 60-foot Cone. Failure: 66 (12d10) Fire damage. Success: Half damage only.

Seize the Unforged. Strength Saving Throw: DC 19, one creature within 10 feet. Failure: The target has the Grappled condition (escape DC 20).

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the molten king can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Advance and Strike. The molten king moves up to half its Speed without provoking Opportunity Attacks, and it makes one Fist attack.

Trample Forge. The molten king moves up to half its Speed without provoking Opportunity Attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.

Shuddering Step. Strength Saving Throw: DC 19, each creature within 10 feet of the molten king. Failure: The target has the Prone condition.

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
**Donor:** brute-21 -> CR 20 (invented — no printed peer)
**Signature:** dropped · **elapsed** 6s

**Type line:** `Large Fiend, Lawful Evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Pit Fiend (is) — "Name field: Pit Fiend" (code)
[route] brute type=Fiend mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("collects the oaths of dying knights") | defender: the call read "knights" as not meaning that mechanic here — no override | brute stands: every key that would override it was read as a figure of speech | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Fiend typeFrom=the route call themes=fiendish/grave mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
[reskin] free row repaired: "Chain of Broken Oaths": "When a creature dies within 10 feet of the pit fiend, the pit fiend ga" -> "When a creature dies within 10 feet of the pit fiend, the pit fiend gains Temporary Hit Po"
```

**`[concept] identity:`**, uncut

> The Pit Fiend fights as an oath-broker in brute flesh: it opens by hurling its iron chain-hook to drag a knight within reach, then plants itself and trades blows with a massive shackle-flail, and each dying oath the fallen speak is swallowed mid-swing to grow heavier and harder to wound. It never flees; it fights to the death, and it toys with prey by letting weakened foes crawl toward escape only to reel them back by the chain and demand one more broken promise before the kill.

**`[concept] lore:`**, uncut

> Forged in the oath-pits of a hellish archive where every promise spoken at death is pressed into iron, it walks the battlefields of the living to harvest the last words of dying knights — each collected oath a link in the chain it one day intends to hang across the gates of its own infernal jailers.

**Every attack row**
```
Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.
Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.
Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.
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

Chain of Broken Oaths. When a creature dies within 10 feet of the pit fiend, the pit fiend gains Temporary Hit Points, and until the end of its next turn its Bite attacks deal an extra 14 (4d6) Fire damage.

Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend's aura for 24 hours.

Legendary Resistance (3/Day). If the pit fiend fails a saving throw, it can choose to succeed instead.

Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

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

---

## 18. Bone-Sun Archlich — CR 20

**Input:** `an archlich enthroned on a sun of bone`
**Donor:** caster-21 -> CR 20
**Signature:** library · **elapsed** 9s

**Type line:** `Medium undead, neutral evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Lich (is) — "archlich" (call)
[route] caster (artillery) type=Undead mechanics=aura — casts: implied by the kind — "archlich" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("archlich") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Undead typeFrom=the route call themes=grave/arcane mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> The archlich opens by rising from its bone throne-sun into the air, hurling bolts of bone-shard and searing radiance while its throne sheds orbiting splinters that screen it from reprisal. Every round it drifts and repositions the sun, spending spell slots on blasts and bone-walls to keep the distance its fragile frame needs, and it never lets an enemy close without paying in a storm of flying bone. Under pressure it does not flee — it detonates a shell of the throne, retreats inside a cage of splinters, and keeps casting, coldly certain that the dead have already won the long fight.

**`[concept] lore:`**, uncut

> A lich who bound its soul not to a phylactery but to a sun of fused bone raised from the graves of an empire, it drifts through the void feeding that star with the skeletons of the living so it never burns out.

**The Spellcasting row, in full**
```
Spellcasting: The archlich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19): - At will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
```

**Every attack row**
```
(no attack row)
```

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

Halo of Candor.Any creature that starts its turn in a 15-foot radius originating from the archlich must make a DC 19 Charisma saving throw. On a failed save, until the start of its next turn, the target can't speak a deliberate lie.
Legendary Resistance (3/Day).If the archlich fails a saving throw, it can choose to succeed instead.
Spirit Jar.If destroyed, the archlich reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the archlich's lair.
Protective Magic (Reaction).The archlich casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: The archlich makes three attacks, using Eldritch Burst or Paralyzing Touch. It can replace one attack with a use of Throne-Sun Volley (Recharge 5-6).
Eldritch Burst: Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 31 (4d12 + 5) force damage.
Paralyzing Touch: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed until the start of the archlich's next turn.
Spellcasting: The archlich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19): - At will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
2/day each: Animate Dead, Dimension Door, Plane Shift
1/day each: Chain Lightning, Finger of Death, Power Word Kill, Scrying
Throne-Sun Volley (Recharge 5-6): Each creature in a 120-foot-long, 5-foot-wide line must make a DC 19 Dexterity saving throw, taking 35 (10d6) piercing damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also restrained until the end of its next turn.
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
**Signature:** — · **elapsed** 1s

**Type line:** `Gargantuan dragon, lawful good` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: Ancient Gold Dragon
[path] exact — Ancient Gold Dragon (is) — "Ancient Gold Dragon" (code)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | dragon: ✓ ("Ancient Gold Dragon") | dragon: key "dragon" (class body)
[concept] resolve: archetype=dragon type=Dragon typeFrom=the route call themes=draconic/arcane mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
```

**`[concept] identity:`**, uncut

> An ancient gold dragon opens with its weakening breath and Frightful Presence, then wades in as a spellcasting bruiser, weaving arcane wards while its claws and bite carry searing fire. Each round it presses with a multiattack and repositions by flight, forcing casters to choose between the dragon and its breath. It is patient and calculating, tempted to toy with worthy prey but fleeing only when truly bloodied and outmatched, never in panic.

**`[concept] lore:`**, uncut

> Hoarded beneath sun-baked mountain halls, the Ancient Gold Dragon guards a treasury of relics it believes are the last memory of a fallen age, and it will burn any who claim them.

**Every attack row**
```
(no attack row)
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
**Signature:** library · **elapsed** 6s

**Type line:** `Gargantuan Monstrosity, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a leviathan of the trench whose song drowns fleets" (call)
[route] brute type=Beast mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: the call reads no worked magic in these words | caster: the family itself needs a magic word in the words — the fallback leaves it | fell to brute's plain line | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Beast typeFrom=the route call themes=aquatic/voice mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[reskin] mind tier: INT 10 -> 15 — the call read this creature as capable at CR 24
[reskin] mind tier: WIS 14 -> 20 — the call read this creature as formidable at CR 24
[reskin] mind tier: CHA 14 -> 20 — the call read this creature as formidable at CR 24
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> The leviathan opens by letting its subsonic song roll out ahead of it, drowning the crews of whole fleets in confusion and despair before its bulk ever breaches the water. Every round after, it circles beneath the hulls and strikes with crushing coils and tide-swamping limbs, using its song to turn the sea itself against the ships around it. It is patient and possessive of its trench, and when bloodied it does not flee — it drags the fight down into the dark where its voice is strongest.

**`[concept] lore:`**, uncut

> It sleeps in the lightless trench below the shipping lanes and wakes only when the surface world grows too loud, singing the fleets down to feed the quiet it hoards.

**Every attack row**
```
Coils. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.
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

Senses blindsight 120 ft.; Passive Perception 22

Languages Common

CR 24 (XP 62,000; PB +7)

Traits

Amphibious. The leviathan can breathe air and water.

Bone-Ringing Coils. Once on each of the leviathan's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 24. Failure: The target has the Stunned condition until the start of its next turn.

Legendary Resistance (3/Day). If the leviathan fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The leviathan makes two Coils attacks. It can replace one attack with a use of Miasmal Wake.

Coils. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Drowning Song (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Miasmal Wake. Constitution Saving Throw: DC 24, each creature in a 30-foot Emanation originating from the leviathan. Failure: The target has the Poisoned condition until the end of its next turn.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the leviathan can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Undertow Lunge. The leviathan moves up to half its Speed without provoking Opportunity Attacks, and it makes one Coils attack.

Swell Surge. Strength Saving Throw: DC 24, each creature within 10 feet of the leviathan. Failure: The target has the Prone condition.

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
**Signature:** dropped · **elapsed** 3s

**Type line:** `Large Monstrosity, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: Owlbear
[path] exact — Owlbear (is) — "Owlbear" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but offered no quote | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("Owlbear") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=bestial/grasping mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the exact path takes no class kit
```

**`[concept] identity:`**, uncut

> A hulking bear-framed thing feathered in dirty owl plumage, it opens with a silent rushing pounce from cover, driving both forelimbs down to pin and crush a single target before its beak finds the throat. Every round after that it stays latched on that one hold — raking with its rear claws while the hooked beak tears — and it will haul struggling prey off its feet and drag it into the brush rather than release it. Under pressure it does not retreat; a wounded owlbear redoubles the grapple and fights to the death, too stupid and too enraged to know when it is losing.

**`[concept] lore:`**, uncut

> Wizards' old crossing of owl and bear bred true and escaped, and now these savage hybrids den in the deep woods, wanting only meat and the silence of unbroken territory.

**Every attack row**
```
Rend. Melee Attack Roll: +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.
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

## 23. Vashka the Red — CR 6

**Input:** `name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.`
**Donor:** defender-5 -> CR 6
**Signature:** library · **elapsed** 5s

**Type line:** `Medium Humanoid, Lawful Evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] filled: the head clause names the Hobgoblin Warrior, a people — a fighter who is visibly one stands on its printed body (owner's ruling, 2026-11-15)
[path] class_npc — Hobgoblin Warrior (is) — class fighter — "warlord" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("A hobgoblin warlord") | defender-leader -> defender: the concept's VERB outranks the noun (key "shield wall", class verb) | defender: key "shield wall" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: guarded-stance yields — AC 19 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] class kit: fighter — "warlord": Riposte (riposte)
[reskin] class weapon: "longsword" and "longbow" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] free row repaired: "Dress the Line": "Once per turn, when a creature within 5 feet of Vashka that can hear h" -> "A creature within 5 feet of Vashka that can hear her is hit by an attack roll, that creatu"
```

**`[concept] identity:`**, uncut

> Vashka the Red opens by planting the shield wall and letting the enemy come to her, her lacquered plate a red wall that does not move. Every round she fights as a hinge of that wall — holding her ground, punishing anyone who tries to slip past her guard, and barking orders that keep the line dressed even as blades bite. Under pressure she does not break ranks: she tightens the formation, spends the wounded as shields, and if forced to retreat she withdraws in step behind the wall rather than flee alone.

**`[concept] lore:`**, uncut

> Vashka the Red rose from a hobgoblin legion's shield companies, lacquering her plate the color of the regiment's banner, and now sells the discipline of her unbreakable wall to whichever warlord pays — but she never sells the wall itself.

**Every attack row**
```
Longsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage.
Longbow. Ranged Attack Roll: +7, range 150/600 ft. 21 (5d6 + 4) Piercing damage.
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

Senses Passive Perception 13

Languages Common, Goblin

CR 6 (XP 2,300; PB +3)

Traits

Shield Wall. While Vashka is standing shoulder-to-shoulder with an ally, Vashka has a +2 bonus to AC against attacks that come from the side of her ally.

Dress the Line. A creature within 5 feet of Vashka that can hear her is hit by an attack roll, that creature gains a +2 bonus to its AC until the start of Vashka's next turn.

Pack Tactics. Vashka has Advantage on an attack roll against a creature if at least one of Vashka's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. Vashka makes two attacks, using Longsword or Longbow in any combination.

Longsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Longbow. Ranged Attack Roll: +7, range 150/600 ft. 21 (5d6 + 4) Piercing damage.

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

## 24. Scythe-Brood Horror — CR 9

**Input:** `A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.`
**Donor:** brute-8-grappler -> CR 9
**Signature:** library · **elapsed** 6s

**Type line:** `Large Monstrosity, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell t" (call)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf, breath — casts: the call reads no worked magic here | hold_shape: grip on the GM's own words "pinning prey with two arms" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("pinning prey with two arms and carving w") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=venomous/grasping mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 9
[reskin] mind tier: CHA 6 -> 10 — the call read this creature as ordinary at CR 9
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> The horror opens by rushing the nearest target and locking it down with two scythe-arms, pinning it in place while the other two arms carve it apart; every round it keeps a victim pinned and bleeding, favoring the largest or most armored target to hold rather than chase skirmishers. Its acid-shedding shell punishes anyone who grapples it or strikes it in melee, and when badly wounded it does not flee but throws itself into the thickest of the fight, spitting caustic bile and dragging the nearest prey under a rain of cuts.

**`[concept] lore:`**, uncut

> Hatched from a clutch buried in a battlefield's churned soil, it carries the acid of a dissolved carcass in its shell and wants only to pin warm bodies to the ground and cut until nothing moves.

**Every attack row**
```
Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 17 (3d8 + 4) Piercing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).
Brood-Limb Pin. Melee Attack Roll: +8, reach 5 ft. 17 (3d8 + 4) Piercing damage, and the target has the Restrained condition until the end of its next turn.
```

```
Scythe-Brood Horror

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
10
+0
+0

Skills Athletics +8, Perception +6

Immunities Acid

Senses darkvision 60 ft.; Passive Perception 16

Languages None

CR 9 (XP 5,000; PB +4)

Traits

Caustic Shell. A creature that touches the scythe-brood horror or hits it with a melee attack while within 5 feet of it has the Poisoned condition until the end of its next turn.

Actions

Multiattack. The scythe-brood horror makes two attacks, using Spitting Maw or Brood-Limb Pin in any combination. It can replace one attack with a use of Broodscreech Terror.

Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 17 (3d8 + 4) Piercing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).

Broodscreech Terror. Wisdom Saving Throw: DC 15, each creature of the scythe-brood horror's choice in a 30-foot Emanation originating from the scythe-brood horror that can see or hear it. Failure: The target has the Frightened condition until the end of its next turn. Success: The target is immune to this creature's terror for 24 hours.

Brood-Limb Pin. Melee Attack Roll: +8, reach 5 ft. 17 (3d8 + 4) Piercing damage, and the target has the Restrained condition until the end of its next turn.

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

## 25. Black Iron Sentinel — CR 11

**Input:** `a sentinel of black iron, AC 20, Huge, speed 20 feet`
**Donor:** defender-7-warden -> CR 11
**Signature:** library · **elapsed** 7s

**Type line:** `Huge construct, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a sentinel of black iron" (call)
[route] defender-warden type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-warden: ✓ ("a sentinel of black iron") | defender-warden stands on the homebrew path: the call ranked it and quoted "a sentinel of black iron" — the key "sentinel" is the menu, not the decision (step 7) | defender-warden: no line key in the words — the model's read of its quote | asked_mechanic harden: quote not found
[concept] resolve: archetype=defender type=Construct typeFrom=the route call themes=forged/grave mind=mindless style=warden energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 7 against "ordinary" — the call read this creature as mindless, so only "feeble" could lower its INT
[reskin] mind tier held: CHA stays 3 against "feeble" — the card's 3 is already feeble
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 11
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> A slab-bodied sentinel of black iron that plants itself in front of what it guards and does not move again voluntarily; it opens by walking its slow 20-foot pace into the narrowest ground it can hold, then grinds down anything that comes within reach with a single crushing iron limb. Every round it endures — taking blows meant for its charge on its own scarred plate — and only shifts its stance to redirect a threat away from the thing behind it, fighting to the death without anger or speech because it has nowhere else to be.

**`[concept] lore:`**, uncut

> Forged in a dead foundry and bolted upright over a tomb, a vault, or a pass it was ordered to hold, the black-iron sentinel still obeys the last command it was given and will not kneel until its frame is broken apart.

**Every attack row**
```
(no attack row)
```

```
Black Iron Sentinel
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

	

15 (+2)

	

3 (-4)

Skills: 

Perception +6

Saving Throws: 

CON +8

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

darkvision 60 ft., passive Perception 16

Languages: 

understands the languages of its creator but can't speak

Challenge

11 (7,200 XP)

Proficiency Bonus:

+4

Ward Bond.The iron sentinel is magically bound to a ward of its choosing, and it can have only one ward at a time. While the iron sentinel is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the iron sentinel.
Regeneration.The iron sentinel regains 10 hit points at the start of each of its turns if it has at least 1 Hit Point.
Interpose (Reaction).When a creature within 5 feet of the iron sentinel that it guards is hit by an attack roll, the attack hits the iron sentinel instead, and the iron sentinel has Resistance to the attack's damage.

Actions
Multiattack: The iron sentinel makes two Fist attacks. It can replace one attack with a use of Iron Sweep.
Fist: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage.
Stand Fast (2/Day): The iron sentinel targets itself or one creature it can see within 60 feet. The target gains 24 (7d6) temporary hit points, and it gains a +2 bonus to AC until the end of the iron sentinel's next turn.
Iron Sweep: Each creature in a 30-foot cone must make a DC 16 Strength saving throw. On a failed save, the target is pushed up to 15 feet away from the iron sentinel and is knocked prone.
```

---

## 26. Grendhilde the Marsh Witch — CR auto

**Input:** `a marsh witch who curses trespassers, cr 7`
**Donor:** caster-8-binder -> CR 7
**Signature:** library · **elapsed** 4s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class mage — "witch" (call)
[route] caster-binder (controller) type=Humanoid mechanics=none — casts: implied by the kind — "a marsh witch who curses trespassers" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: ✓ ("curses trespassers") | caster-binder: key "curses" (class verb)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/beguiling mind=sapient style=binder energy=Poison mix=both identity=✓ lore=✓
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
```

**`[concept] identity:`**, uncut

> The marsh witch opens by laying a layered hedge of curses across the whole trespassing party — old words worked into the mud of her fen, foul humours that sap the will and slow the limbs as surely as any snare. Each round she works another one, hexing sight so that eyes can no longer find their footing, hexing Strength so that swords fall slack, and only then turning to fell things with a rotten darting word, keeping her lines to the water and the reeds. She is patient and wilful to the end, retreating into the drowned reeds she has woven with her curses and never fighting fair or fighting alone in the open, and she does not flee her own marsh — she lets it swallow those who follow.

**`[concept] lore:`**, uncut

> A fen-bound hag who bargained her blood to the black water for the power to work curses, and who now spells her marsh's every boundary with binding rotten humours to punish any who cross uninvited.

**The Spellcasting row, in full**
```
Spellcasting. Grendhilde casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly
```

**Every attack row**
```
Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.
```

```
Grendhilde the Marsh Witch

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

Languages Common and any three languages, Sylvan

CR 7 (XP 2,900; PB +3)

Actions

Multiattack. Grendhilde makes three Arcane Burst attacks. It can replace one attack with a use of Fenwater Blast.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Grendhilde casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Fenwater Blast. Constitution Saving Throw: DC 14, one creature within 30 feet. Failure: 19 (3d12) Bludgeoning damage.

Bonus Actions

Misty Step (3/Day). Grendhilde casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Grendhilde casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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

## 27. Unanswered Templar — CR 6

**Input:** `a templar priest with a mace and no magic at all`
**Donor:** defender-5 -> CR 6
**Signature:** dropped · **elapsed** 4s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "templar" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("a templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/grave mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
```

**`[concept] identity:`**, uncut

> A veteran templar who has buried every prayer that ever answered, this priest opens a fight by planting his shield and standing squarely in the doorway, letting the mace dare anyone to come at him. Every round he holds the line with disciplined shield-work and answers any enemy who tries to slip past or strike an ally with a crushing, deliberate blow — never fast, never flashy, just patient and impossible to dislodge. He does not flee when bloodied; he tightens his grip, digs in, and fights to the last because retreat would betray the only vow he still keeps.

**`[concept] lore:`**, uncut

> A templar whose god went silent stripped the sanctity out of his rites and left only the discipline of the order, so he keeps his post and his mace and guards the faithful with iron and stubbornness instead of miracles.

**Every attack row**
```
Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the templar's next turn.
```

```
Unanswered Templar

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

Shoulder Square. While the templar is standing on ground he has not moved from since the start of his last turn, attack rolls made against the templar have Disadvantage, and the templar can't be moved against his will from that spot.

Aura of Authority. While in a 10-foot Emanation originating from the templar, the templar and its allies have Advantage on attack rolls and saving throws, provided the templar doesn't have the Incapacitated condition.

Actions

Multiattack. The templar makes three Mace attacks. It can replace one attack with a use of Shield Bash.

Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the templar's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the templar can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

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
**Signature:** library · **elapsed** 10s

**Type line:** `Medium humanoid, neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class mage — "archmage" (call)
[route] caster (artillery) type=Humanoid mechanics=teleport — casts: on the GM's own words "An elf archmage who bends shadow and ste" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("An elf archmage who bends shadow") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/uncanny mind=sapient style=— energy=Necrotic mix=energy identity=✓ lore=✓
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "archmage": Misty Step (3/Day) (Mage/Misty Step)
[reskin] free row repaired: "Gloaming Shift": "When Ilvareth is in dim light or darkness, Ilvareth can take the Hide " -> "While Ilvareth is in dim light or darkness, Ilvareth can Hide while only lightly obscured "
```

**`[concept] identity:`**, uncut

> Ilvareth opens from darkness, guttering the lights around the party before hurling a lance of shadow from an angle no one is covering, then steps through the next pool of gloom the moment anyone closes the distance. Every round after that is a duel of angles: blast, reposition via shadow, blast again, using the battlefield's own darkness as a corridor while keeping the party at the far end of it. He is a patient, vain tactician who toys with prey and only slips away bloodied if truly cornered, preferring to leave an insult and a shadow where he stood.

**`[concept] lore:`**, uncut

> An elven archmage who traded his name to the shadow between places, Ilvareth Dusksong now collects the last lights of dying courts and vanishing kingdoms, hoarding them in the dark he walks through.

**The Spellcasting row, in full**
```
Spellcasting: Ilvareth casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17): - At will: Detect Magic, Detect Thoughts, Disguise Self, Invisibility, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
(no attack row)
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

Gloaming Shift.While Ilvareth is in dim light or darkness, Ilvareth can Hide while only lightly obscured and teleport up to 30 feet to a space in dim light or darkness, leaving a 10-foot-radius sphere of magical darkness where he stood until the start of his next turn.
Magic Resistance.Ilvareth has advantage on saving throws against spells and other magical effects.
Misty Step (3/Day) (Bonus Action).Ilvareth casts Misty Step, using the same spellcasting ability as Spellcasting.
Shadow Step (Recharge 4-6) (Bonus Action).Ilvareth teleports up to 60 feet to an unoccupied space it can see.
Protective Magic (3/Day) (Reaction).When Ilvareth is hit by an attack roll, Ilvareth casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Ilvareth makes four Arcane Burst attacks.
Arcane Burst: Melee or Ranged Spell Attack: +9 to hit, reach 5 ft. or range 150 ft., one target. Hit: 27 (4d10 + 5) force damage.
Spellcasting: Ilvareth casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17): - At will: Detect Magic, Detect Thoughts, Disguise Self, Invisibility, Light, Mage Armor, Mage Hand, Prestidigitation
2/day each: Fly, Lightning Bolt
1/day each: Cone of Cold, Mind Blank, Scrying, Teleport
```

---

## 29. Unblessed Bell Swarm — CR 13

**Input:** `a swarm of funeral bells that ring themselves over the dying`
**Donor:** swarm-9 -> CR 13 (invented — no printed peer)
**Signature:** library · **elapsed** 5s

**Type line:** `Medium Swarm of Tiny Constructs, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a swarm of funeral bells that ring themselves over the dying" (call)
[route] swarm type=Construct mechanics=aura — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a swarm of funeral bells" | swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] resolve: archetype=swarm type=Construct typeFrom=the route call themes=grave/uncanny mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the card's 4 is already feeble
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 13
[reskin] mind tier: CHA 2 -> 15 — the call read this creature as capable at CR 13
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> A cloud of tarnished funeral bells hangs in the air over the dying, waiting with the patience of a thing that has never once been wrong about who is next. When prey still moves, the swarm descends and rings in a shrieking, overlapping clamor that rattles bone and drowns out last words, each bell striking with the weight of a swung censer. It does not pursue the healthy: it waits, tolls, and multiplies its tolling until the body beneath it has been rung still, then settles to drink the silence it made.

**`[concept] lore:`**, uncut

> Each bell in the swarm was cast for a funeral that never happened — a grave interrupted, a body never blessed — and the bells now seek the dying to finish what the living abandoned, ringing the rites over anyone whose death goes unwitnessed.

**Every attack row**
```
Censer Swing. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.
```

```
Unblessed Bell Swarm

Medium Swarm of Tiny Constructs, Unaligned

AC 15
Initiative +5 (15)

HP 178 (21d8 + 84)

Speed 30 ft., Fly 30 ft. (hover)

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
20
+5
+5
MOD
SAVE
CON
18
+4
+4
CHA
15
+2
+2

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned

Senses blindsight 30 ft. (blind beyond this radius); Passive Perception 15

Languages Understands the languages of its creator but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Dolorous Toll. Once on each of the swarm's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 17. Failure: The target has the Stunned condition until the end of its next turn.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Multiattack. The swarm makes two Censer Swing attacks.

Censer Swing. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.

Ringing Ground (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 45 (13d6) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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

## 30. Chrismal Ossuary — CR 9

**Input:** `a cathedral-vault ooze that digests reliquaries`
**Donor:** ooze-9 -> CR 9 (invented — no printed peer)
**Signature:** library · **elapsed** 9s

**Type line:** `Large ooze, unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a cathedral-vault ooze that digests reliquaries" (call)
[route] ooze type=Ooze mechanics=none — casts: the call reads no worked magic here | hold_shape: contain on the GM's own words "digests reliquaries" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | ooze: ✓ ("cathedral-vault ooze") | ooze: no line key in the words — the model's read of its quote
[concept] resolve: archetype=ooze type=Ooze typeFrom=the route call themes=amorphous/devouring mind=mindless style=— energy=Acid mix=energy identity=✓ lore=✓
[reskin] mind tier held: INT stays 2 against "feeble" — the call read this creature as mindless, and the card's 2 is already that dim
[reskin] mind tier held: CHA stays 1 against "feeble" — the card's 1 is already feeble
[reskin] mind tier: WIS 8 -> 15 — the call read this creature as capable at CR 9
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] free row repaired: "Fouling Residue": "A space the ossuary moves through becomes difficult terrain for 1 hour" -> "A space the ossuary occupies or ends its move in becomes fouled — difficult terrain where "
```

**`[concept] identity:`**, uncut

> A cathedral-vault ooze seeps down the nave as a slow, greasy rot that spreads across the flagstones and rears into a vaulting column of itself to swallow whole reliquaries — and anyone clutching one. Every round it engulfs what it can reach, its rot dissolving gold, bone, and lacquer alike while it drags the sanctified mass down into its body, and wounded, it simply collapses into the cracks of the crypt to ooze back up elsewhere, patient and relentless rather than clever.

**`[concept] lore:`**, uncut

> It grew from spilled chrism and generations of decay in a sealed reliquary vault, and it wants only to take the holy dead into itself, one shrine at a time.

**Every attack row**
```
(no attack row)
```

```
Chrismal Ossuary
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

	

1 (-5)

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

Fouling Residue.A space the ossuary occupies or ends its move in becomes fouled — difficult terrain where gold, bone, silver, and lacquer objects are destroyed.
Amorphous.The ossuary can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form.A creature that touches the ossuary or hits it with a melee attack while within 5 feet of it takes 9 (2d8) acid damage.
Spider Climb.The ossuary can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The ossuary makes two Engulfing Pseudopod attacks.
Engulfing Pseudopod: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 11 (2d10) acid damage.
Reliquary Gulp (Recharge 5-6): One creature within 10 feet of the ossuary must succeed on a DC 15 Dexterity saving throw or take 27 (6d8) acid damage and be restrained until the end of its next turn.
```

---

## 31. Thunderhead Drake — CR 7

**Input:** `a young storm drake whose breath is a rolling wall of thunder`
**Donor:** dragon-2 -> CR 7
**Signature:** dropped · **elapsed** 6s

**Type line:** `Large Dragon, Chaotic Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a young storm drake whose breath is a rolling wall of thunder" (call)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | dragon: ✓ ("a young storm drake whose breath is a ro") | dragon: key "drake" (class body)
[concept] resolve: archetype=dragon type=Dragon typeFrom=the route call themes=draconic/breath mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[reskin] mind tier: INT 12 -> 15 — the call read this creature as capable at CR 7
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 7
[reskin] mind tier: CHA 14 -> 18 — the call read this creature as formidable at CR 7
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] free row repaired: "Stormfront Sense": "While the thunderhead drake is airborne and above every enemy within s" -> "While the thunderhead drake is airborne and above every enemy within sight, the drake has "
```

**`[concept] identity:`**, uncut

> The storm drake opens by climbing above the fray and letting its thunder-wall breath roll downhill through the enemy line, scattering formations before it ever lands a claw. Each round after, it stoops to bite and rake a broken straggler, then beats back up out of reach to line up another rolling peal. Under pressure it fights to the death, roaring louder as it bleeds — a young drake that has not yet learned fear.

**`[concept] lore:`**, uncut

> Hatched in the squall-clouds that roost on high crags, a storm drake rides the front edge of every thunderstorm, claiming the rolling boom as its own voice and the lightning-lit valley as its hunting ground.

**Every attack row**
```
Bite. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.
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

Stormfront Sense. While the thunderhead drake is airborne and above every enemy within sight, the drake has Advantage on Perception checks, and each creature within 60 feet of it that can hear it has Disadvantage on Perception checks made to track it.

Actions

Multiattack. The thunderhead drake makes two Bite attacks.

Bite. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.

Rolling Peal (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

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

## 32. Pass-Father Grondel — CR 9

**Input:** `a stone giant exile who speaks only Giant and understands no Common`
**Donor:** brute-9 -> CR 9
**Signature:** library · **elapsed** 8s

**Type line:** `Huge giant, neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Stone Giant (is) — "stone giant" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("a stone giant exile") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant typeFrom=the route call themes=elemental/bestial mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> A mountain of scarred stone-flesh that answers strangers only in Giant, the exile closes ground in a flat, unhurried charge and swings a chunk of broken cliff like a club until the fight is over. Each round it trades blows deliberately, shrugging off hits that would fell smaller things, and it hurls loose boulders at anyone who tries to skirmish out of reach. It does not flee and does not toy — bloodied, it plants its feet, digs in, and grinds the fight down to whoever is left standing. That it cannot understand Common never softens it: it reads intent from stance and sound, so a shouted parley buys only the time it takes to close.

**`[concept] lore:`**, uncut

> Cast out of its clan's caves for some forgotten stone-law transgression, this exile wanders the high passes and scree fields, seeking either a way to earn a place back or a death heavy enough to be worth remembering.

**Every attack row**
```
(no attack row)
```

```
Pass-Father Grondel
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

Stone Splinters.When Grondel takes bludgeoning, piercing, or slashing damage from a melee attack, the attacker takes 14 (4d6) piercing damage as stone splinters bite into them.
Deflect Missile (Recharge 5-6) (Reaction).When Grondel is hit by a ranged attack roll and takes Bludgeoning, Piercing, or slashing damage from it, Grondel reduces the damage it takes from the attack by 11 (1d10 + 6), and if that damage is reduced to 0, Grondel can redirect some of the attack's force. One creature Grondel can see within 60 feet must make a DC 18 Dexterity saving throw, taking 11 (1d10 + 6) force damage on a failed save.

Actions
Multiattack: Grondel makes two attacks: one with Stone Club and one with Boulder.
Stone Club: Melee Weapon Attack: +10 to hit, reach 15 ft., one target. Hit: 28 (5d8 + 6) bludgeoning damage.
Boulder: Ranged Weapon Attack: +10 to hit, range 60/240 ft., one target. Hit: 24 (4d8 + 6) bludgeoning damage.
```

---

## 33. Steamclaw Ascetic — CR 5

**Input:** `lizardfolk monk`
**Donor:** defender-5 -> CR 5
**Signature:** dropped · **elapsed** 4s

**Type line:** `Medium humanoid, neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: lizardfolk monk — A scarred lizardfolk ascetic who reads an opponent's stance before the first blow and answers it with a chain of drilled, bone-hard strikes — tailsweep, elbow, claw — that flow into one another without pause. Every round it keeps the pressure on, stepping into the reach of larger f
[concept] expansion answered: type=Humanoid (type_source=?) material=bone size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: —
[path] class_npc — class monk — species lizardfolk — "monk" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("stepping into the reach of larger foes t") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=bestial/uncanny mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Tail Lash), Patient Defense (patient-defense)
[reskin] class weapon: Actions/"Shortsword" -> "Unarmed Strike" — a monk fights with its hands, not the Spy's; the body's rider folds in (+7)
[reskin] class weapon: "Dart" rolls Dexterity — a launcher is DEX in print: +6 -> +5
[reskin] class weapon: Actions/"Hand Crossbow" -> "Dart" — a monk fights with a dart, not the Spy's
```

**`[concept] identity:`**, uncut

> A scarred lizardfolk ascetic who reads an opponent's stance before the first blow and answers it with a chain of drilled, bone-hard strikes — tailsweep, elbow, claw — that flow into one another without pause. Every round it keeps the pressure on, stepping into the reach of larger foes to deny them their strength and parrying claws and blades off its scaled forearms. It fights with cold patience, never taunting, and yields ground only when the fight is truly lost — a disciplined survivor, not a butcher.

**`[concept] lore:`**, uncut

> Raised in a marsh-side cloister of scalding steam-vents, this lizardfolk abandoned its tribe's crude raiding to master an old, silent order of unarmed discipline, and now walks the world testing its forms against any warrior worth the lesson.

**Every attack row**
```
(no attack row)
```

```
Steamclaw Ascetic
Medium humanoid, neutral
Armor Class

18

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

Hold Breath.The ascetic can hold its breath for 15 minutes.
Patient Defense (Bonus Action).The ascetic takes the Dodge action.

Actions
Multiattack: The ascetic makes two attacks: one with its Unarmed Strike and one with its Dart.
Unarmed Strike: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage. Once on each of the ascetic's turns when it hits with this attack, the target is subjected to the following effect. The target must make a DC 14 Constitution saving throw. On a failed save, the target is stunned until the end of the ascetic's next turn.
Dart: Ranged Weapon Attack: +5 to hit, range 20/60 ft., one target. Hit: 15 (3d8 + 2) piercing damage.
```

---

## 34. Krennik Skullstandard — CR 4

**Input:** `name: Krennik Skullstandard | riding a worg`
**Donor:** skirmisher-3-mounted -> CR 4 (invented — no printed peer)
**Signature:** library · **elapsed** 10s

**Type line:** `Medium humanoid, neutral evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "riding a worg" (call)
[route] skirmisher-mounted type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=armed/terror mind=sapient style=mounted energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: CHA stays 8 against "ordinary" — the card's 8 is already ordinary
[reskin] mind tier: INT 8 -> 15 — the call read this creature as capable at CR 4
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 4
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> Krennik opens a fight by putting his worg into a full gallop and riding down the nearest foe, his skull-topped standard shrieking overhead as the beast's jaws snap past; he hits, carries through, and turns wide to line up a second pass rather than ever standing to trade. Under pressure he circles at range, using the worg's speed and his standard's din to break formation and pick off the stragglers, and he flees mounted only when the beast falls under him.

**`[concept] lore:`**, uncut

> A sellsword captain who sold his warband's souls to a goblin-market warlock for a banner that never lets its bearer retreat, Krennik now rides the border roads collecting the tolls his standard demands.

**Every attack row**
```
(no attack row)
```

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

	

15 (+2)

	

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

Skull Standard's Din.While Krennik is mounted and not incapacitated, any enemy that starts its turn within 30 feet of Krennik and can see the standard has disadvantage on opportunity attacks made against Krennik or his mount.
Running Pass.Krennik ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Mounted Agility (Bonus Action).Krennik takes the Dash or Disengage action.

Actions
Multiattack: Krennik makes two attacks: one with Saber and one with Javelin. It can replace one attack with a use of Skull Standard Cry.
Saber: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is knocked prone.
Javelin: Ranged Weapon Attack: +5 to hit, range 30/120 ft., one target. Hit: 6 (1d6 + 3) piercing damage.
Galloping Charge (Recharge 5-6): Krennik moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Each creature whose space it enters must make a DC 13 Dexterity saving throw, taking 24 (7d6) bludgeoning damage on a failed save and being knocked prone.
Skull Standard Cry: Each creature of Krennik's choice in a 30-foot radius originating from Krennik that can see or hear it must make a DC 13 Wisdom saving throw. On a failed save, the target is frightened until the end of its next turn. On a successful save, the target is immune to this creature's terror for 24 hours.
```

---

## 35. Well-Drowned — CR 5

**Input:** `name: the thing in the well | `
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 6s

**Type line:** `Medium Aberration, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: the thing in the well — It opens a fight by calling from the dark below, its voice stealing down the well-shaft to lure the thirsty into leaning too far over the stones; then it surges up the wet masonry on hooked brine-slick limbs to seize and drag its victim down into the black water. Every round
[concept] expansion answered: type=Aberration (type_source=inferred) material=brine size=Large mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: grapple
[path] homebrew — "the thing in the well" (call)
[route] brute-grappler type=Aberration mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but quoted "surges up the wet masonry on h", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("seize and drag its victim down into the ") | brute-grappler: key "seize" (class verb)
[concept] resolve: archetype=brute type=Aberration typeFrom=the route call themes=aquatic/grasping mind=sapient style=grappler energy=Cold mix=both identity=✓ lore=✓
[reskin] mind tier: INT 4 -> 15 — the call read this creature as capable at CR 5
[reskin] mind tier: WIS 10 -> 18 — the call read this creature as formidable at CR 5
[reskin] mind tier: CHA 4 -> 15 — the call read this creature as capable at CR 5
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] free row repaired: "Drowning Hymn": "*Strength Saving Throw*: DC 13, each creature in a 60-foot Emanation o" -> "*Strength Saving Throw*: DC 13, each creature in a 60-foot Emanation originating from the "
```

**`[concept] identity:`**, uncut

> It opens a fight by calling from the dark below, its voice stealing down the well-shaft to lure the thirsty into leaning too far over the stones; then it surges up the wet masonry on hooked brine-slick limbs to seize and drag its victim down into the black water. Every round after it retreats a little, coiling in the deep and striking only when a head or hand comes near, patient and certain that anything at the rim must eventually come to the water.

**`[concept] lore:`**, uncut

> Something drowned in the old well and never rose, and now it reaches up through the water only to pull down anyone who comes to draw or to listen.

**Every attack row**
```
Brine Hook. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Piercing damage plus 7 (2d6) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.
```

```
Well-Drowned

Medium Aberration, Neutral

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
18
+4
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

Skills Athletics +6, Perception +7

Immunities Cold

Senses darkvision 60 ft.; Passive Perception 17

Languages Common

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The well-drowned makes two Brine Hook attacks. It can replace one attack with a use of Drowning Hymn.

Brine Hook. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Piercing damage plus 7 (2d6) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Drowning Hymn. Strength Saving Throw: DC 13, each creature in a 60-foot Emanation originating from the well-drowned. Failure: The target is pulled up to 15 feet straight toward the well-drowned, and the target has the Frightened condition until the end of its next turn.

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
**Signature:** library · **elapsed** 10s

**Type line:** `Large humanoid, chaotic neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] twist — Lizardfolk (is) — class barbarian — species lizardfolk — "lizard folk" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("Wields a greataxe two-handed") | brute -> skirmisher-hurler: the concept's VERB outranks the noun (key "throw", class verb) | skirmisher-hurler: key "throw" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=bestial/terror mind=sapient style=hurler energy=Thunder mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: WIS stays 14 against "capable" — the card's 14 is already capable
[reskin] mind tier: CHA 10 -> 18 — the call read this creature as formidable at CR 8
[reskin] class kit: none — the twist path takes no class kit
[reskin] free row repaired: "Barbarian Rage": "While Meshrin is not wearing heavy armor, it can enter a rage as a Bon" -> "While raging, if Meshrin ends its turn without having attacked a hostile creature or taken"
```

**`[concept] identity:`**, uncut

> Meshrin opens by roaring — a bone-shaking challenge that freezes the nerve of anyone in earshot — then hurls his javelin to drop a runner before closing with the greataxe in a red haze. Every round after that he is a storm of rage: he presses the nearest foe, shrugs off wounds that would drop a lesser warrior, and lets the axe speak. Under pressure he does not withdraw; he goes deeper into the rage, fighting to the death and dragging down as many as he can.

**`[concept] lore:`**, uncut

> A river-war veteran of the lizardfolk raiding bands, Meshrin dipped his blades in blood and his spirit in fury until he grew too large for the marsh and too loud for any chief to command — now he marches alone, screaming for a worthy fight.

**Every attack row**
```
(no attack row)
```

```
Meshrin
Large humanoid, chaotic neutral
Armor Class

16 (breastplate)

Hit Points: 

120 (14d10 + 42)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

18 (+4)

	

16 (+3)

	

10 (+0)

	

14 (+2)

	

18 (+4)

Skills: 

Perception +5, Stealth +7

Saving Throws: 

DEX +7, WIS +5

Senses: 

passive Perception 15

Languages: 

Common, Draconic

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Barbarian Rage.While raging, if Meshrin ends its turn without having attacked a hostile creature or taken damage since its last turn, the rage ends. Until then, Meshrin's attacks deal an extra 7 (2d6) damage of the weapon's type and it has advantage on Strength checks and saves.
Hold Breath.Meshrin can hold its breath for 15 minutes.
Great Weapon Master.When Meshrin hits a creature with its Greataxe, the attack deals an extra 3 damage.
Marsh Stride.Difficult Terrain composed of mud doesn't cost Meshrin extra movement, and Meshrin can move across mud without needing to make an ability check.
Fleet Agility (Bonus Action).Meshrin takes the Dash or Disengage action.
Binding Mark (Bonus Action).One creature within 30 feet must make a DC 15 Wisdom saving throw. On a failed save, until the start of Meshrin's next turn, the target has disadvantage on attack rolls against creatures other than Meshrin.

Actions
Multiattack: Meshrin makes three attacks, using Greataxe or Javelin.
Greataxe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (2d12 + 4) slashing damage.
Javelin: Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 18 (4d6 + 4) piercing damage.
Terror Roar (Recharge 5-6): One creature within 30 feet of Meshrin must succeed on a DC 15 Wisdom saving throw or be frightened of Meshrin until the end of its next turn.
```

---

## 38. Unyielded Champion — CR 6

**Input:** `a skeleton with a greatsword`
**Donor:** brute-5 -> CR 6
**Signature:** library · **elapsed** 3s

**Type line:** `Medium Undead, Lawful Evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a skeleton with a greatsword
[path] twist — Skeleton (is) — "skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead typeFrom=the route call themes=grave/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
[reskin] multiattack re-read — "Shortbow" joins the combination; "The champion makes two attacks, using Greatsword or Shortbow in any combination."
```

**`[concept] identity:`**, uncut

> It opens the fight with a two-handed overhead cut from a dead stop, its silence the only warning a player gets, then keeps up a relentless hewing rhythm — step, cleave, reset — trading blows it has no flesh to lose. It never flinches, never tires and never feints; it simply advances, and only the total collapse of its frame will stop the greatsword's arc.

**`[concept] lore:`**, uncut

> A champion who swore to win a duel then died before the terms were met, the skeleton stands where the field was and keeps fighting the same fight against anyone who crosses it, unwilling to admit the contest is over.

**Every attack row**
```
Greatsword. Melee Attack Roll: +7, reach 5 ft. 21 (5d6 + 4) Slashing damage.
Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 16 (3d8 + 3) Piercing damage.
```

```
Unyielded Champion

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

Closing Blade. While the champion is moving toward a creature it has damaged within the last 24 hours, the champion's Speed can't be reduced and Difficult Terrain doesn't cost it extra movement.

Great Weapon Master. When the champion hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The champion makes two attacks, using Greatsword or Shortbow in any combination.

Greatsword. Melee Attack Roll: +7, reach 5 ft. 21 (5d6 + 4) Slashing damage.

Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 16 (3d8 + 3) Piercing damage.

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

## 39. Orrin Sable — CR 5

**Input:** `a sellsword who hurls a handaxe and closes with a shortsword`
**Donor:** skirmisher-8-hurler -> CR 5 (invented — no printed peer)
**Signature:** library · **elapsed** 9s

**Type line:** `Medium humanoid, neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class fighter — "sellsword" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-hurler: ✓ ("hurls a handaxe") | skirmisher-hurler: key "hurls" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: fighter — "sellsword": Riposte (riposte)
[reskin] free row repaired: "Find the Angle": "When Orrin hits a creature within 5 feet of it with a Handaxe attack, " -> "When Orrin hits a creature within 5 feet of it with a melee attack, Orrin can move up to 1"
```

**`[concept] identity:`**, uncut

> The sellsword opens by hurling a handaxe from just outside reach, then uses the moment the enemy flinches or closes to rush in with a shortsword and finish the exchange at arm's length. Every round thereafter it dances between the two distances — throw, step in, cut, peel back — reading the opponent and refusing to stay planted. It is a paid fighter, not a fanatic: once bloodied it looks for an angle to withdraw and live to collect, but it will spend every trick it has before conceding ground.

**`[concept] lore:`**, uncut

> A down-on-his-luck blade from the trade roads, this sellsword takes contracts no banner company will and wants nothing more than to walk away from the fight with his purse and his hide intact.

**Every attack row**
```
(no attack row)
```

```
Orrin Sable
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

Find the Angle.When Orrin hits a creature within 5 feet of it with a melee attack, Orrin can move up to 10 feet without provoking an opportunity attack from that creature.
Riposte (Reaction).When a creature within 5 feet of Orrin misses it with a melee attack roll, Orrin makes one Handaxe attack against that creature.
Parry (Reaction).When Orrin is hit by a melee attack roll while holding a weapon, Orrin adds 3 to its AC against that attack, possibly causing it to miss.

Actions
Multiattack: Orrin makes three Handaxe attacks. It can replace one attack with a use of Shortsword.
Handaxe: Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) slashing damage, and Orrin has advantage on its next attack roll against the target before the end of its next turn.
Shortsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage.
Shield Bash: One creature within 5 feet that Orrin can see must make a DC 15 Strength saving throw, taking 9 (2d4 + 4) bludgeoning damage on a failed save. On a failed save, if the target is a Medium or smaller creature, it is knocked prone.
```

---

## 40. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** defender-3 -> CR 3
**Signature:** library · **elapsed** 8s

**Type line:** `Medium humanoid, neutral` — **set by** fix A/E (a person with no named body)

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Brother Halric — Brother Halric was a village healer who poisoned his own flock and rose as a plague-bearing revenant wrapped in soiled grave-wrappings, and he opens a fight with a wet, contagion-laden lunge that leaves the wound putrid. Every round after he works the fight like a shepherd — herding
[concept] expansion answered: type=Undead (type_source=inferred) material=grave size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: aura
[path] class_npc — class cleric — "Brother" (call)
[route] defender-leader type=Undead mechanics=aura — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but quoted "pressing the sick with rotting", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("works the fight like a shepherd — herdin") | lurker-phantom: the call read "revenant" as not meaning that mechanic here — no override | defender-leader stands: every key that would override it was read as a figure of speech | defender-leader: no line key in the words — the model's read of its quote
[concept] type settled: Undead -> Humanoid — the GM's words are a name and the class word and nothing else, and a person with no named body is a Humanoid (owner's ruling, 2026-11-15, widened 2026-11-16); the route call had answered Undead
[concept] resolve: archetype=defender type=Humanoid typeFrom=fix A/E (a person with no named body) themes=grave/mind mind=sapient style=leader energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Brother": nothing to add — the sheet already answers it
[reskin] class weapon: "mace" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] free row repaired: "Seeping Wrappings": "A creature that grapples Brother Halric or is Grappled by it has the P" -> "*Constitution Saving Throw*: DC 13, one creature within 5 feet. *Failure:* The target has "
```

**`[concept] identity:`**, uncut

> Brother Halric was a village healer who poisoned his own flock and rose as a plague-bearing revenant wrapped in soiled grave-wrappings, and he opens a fight with a wet, contagion-laden lunge that leaves the wound putrid. Every round after he works the fight like a shepherd — herding foes into narrow ground, then pressing the sick with rotting hands while muttering diagnoses of their sin — and he does not break and run; bloodied, he retreats only to reposition, patient and didactic to the last, treating the fight as a sermon that must be finished.

**`[concept] lore:`**, uncut

> Halric tended the sick until he began deciding who deserved to live, and now he walks the plague-road looking for congregations to 'heal' — his touch spreads the very rot that killed his village.

**The Spellcasting row, in full**
```
Spellcasting: Brother Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
```

**Every attack row**
```
(no attack row)
```

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

Divine Aid (3/Day) (Bonus Action).Brother Halric casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Brother Halric makes two attacks: one with Mace and one with Radiant Flame.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage. Until the end of Brother Halric's next turn, Brother Halric has advantage on attack rolls against the target, and the target can't take the Hide action.
Spellcasting: Brother Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
Seeping Wrappings: One creature within 5 feet must make a DC 13 Constitution saving throw. On a failed save, the target is poisoned until the end of its next turn.
```
