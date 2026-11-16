# Blocks — the ship run for the enhancement release

**MILESTONE.** Round of 2026-11-15/16, on top of `c33b885` plus the four fixes below. This file
**replaces `BLOCKS-ship-2026-11-15.md` and `BLOCKS-people-class-2026-11-15.md`** as the record of
what shipped; both are deleted in their own commit.

**Every sheet this round generated is here, marked as it is — 81 across twelve runs.** That
includes the two batches that were generated TWICE, because fix A leaked on the first pass and the
pre-patch sheets are the evidence of the leak.

```
npx jest src/tools/statblock-generator src/util --maxWorkers=2 --silent  # 227 suites, 5351 passed, 26 skipped
npx jest --maxWorkers=2 --silent                                        # whole repo: 310 suites, 7416 passed
npm run build                                                           # built in 6.33s
node --import ./scripts/alias-loader.mjs scripts/reference-lend-checks.mjs      # exit 0
node --import ./scripts/alias-loader.mjs scripts/reference-class-on-people.mjs  # exit 0
node --import ./scripts/alias-loader.mjs scripts/reference-mind-dc-sweep.mjs    # exit 0
node --import ./scripts/alias-loader.mjs scripts/probe-peoples-body.mjs 20      # 40 of 40
node --import ./scripts/alias-loader.mjs scripts/scan-ship-rows.mjs <12 runs>   # 7 findings, all one class
```

## The four fixes

**Fix A — a bare name with a class is a Humanoid.** "Brother Halric", a name and nothing else, came
out seven ways in one day: three Humanoid, two Undead, **two Construct** carrying Immunity to Poison
and the whole construct condition package. Every roll took the same path, `class_npc — class cleric`
with no body, so the path was never the variable; the type was. A bare name is thin, so the identity
call runs unconditioned before routing and answers a creature type with nothing in the GM's words to
go on. The decision now lives in one named, tested function — `humanoidForABareNamedClass` — and is
settled after the route and before the sheet is built, because the immunities are written by a pass
that reads the type.

*The scope is narrow on purpose:* a class must be named. The owner's ruling is broader, and widening
it is a later choice. See the blocker below — Old Marga is that remainder, now seen on sheets.

**Fix B — the body is the species.** Sheet 03 of last round read `class_npc — Kobold Warrior (is) —
class mage — species lizardfolk` and shipped Medium, with Hold Breath, Marsh Stride and a swim speed
on top of the kobold's own Pack Tactics and Sunlight Sensitivity. The call had answered lizardfolk,
its nearest kit for a scaled people, and the kit was applied although the body already said what the
creature was. When the body is a declared people, that body IS the species, so the species answer is
dropped. A species with no body is untouched — that is the case the kit exists for.

**Fix C — a named people wins over a job block.** The path probe read 9 of 10; on the miss the call
answered the **Mage** as the body, so the class was right and the kobold was lost, about one roll in
twenty. The receipt check cannot catch it, because a receipt only has to be a SPAN of the GM's words
and "sorcerer" is a true span of "kobold sorcerer" that says nothing about the Mage. So a JOB yields
to a PEOPLE — and "job" is print's own answer, not a list of ours: a block print types Humanoid that
is not one of the declared peoples. A MONSTER body still stands ("a kobold riding an owlbear"), and
two peoples in the words change nothing. **The probe now reads 20 of 20.**

**Fix D — a cited ability takes its usage parenthetical with it.** The Stone Golem shipped "It can
replace one attack with  (Recharge 5-6)." — the only garbled sentence in the 107 sheets read that
day. `sweepDeadName` strips the recharge suffix off the dead name before it searches, so its
fallback removed "a use of Splintering Charge" and left the parenthetical that followed it; the
stump cleanup added on 2026-10-23 wanted a clause ending at "with.", so a stump holding a
parenthetical slipped past. Both halves are fixed, and `sweepDeadName` is now exported so the rule
can be tested instead of found on a sheet afterwards.

## Traces

Four, and they change no behaviour. The Halric question could not be settled from the old evidence,
because the lines that would settle it were cut or missing.

1. **The expansion, in parts and uncut.** `[concept] expansion answered:` prints the type, its
   source, the material, size and mind; `expansion attack mode` and `expansion signature` follow.
   The joined line is still cut at 300 characters and the body material sat past the cut.
2. **Which step set the type.** `[concept] resolve:` now carries `typeFrom=`, and fix A says what it
   replaced. This is how "the call answered Elemental for Captain Vane" is now readable.
3. **The `[route]` line** is in each sheet's decision block below.
4. **A fill is not a refusal.** The fills rode the `refused` channel, so every class-on-a-people
   sheet read `[path] refused:` above a path that had worked. They have their own channel now and
   print as `[path] filled:`.

## What the numbers came out at

| | |
|---|---|
| statblock + util | 227 suites, **5351 passed**, 26 skipped |
| whole repo | 310 suites, **7416 passed**, 26 skipped |
| build | clean, 6.33s |
| `reference-lend-checks` | exit 0 — 0 of 72 off-CR spells, 0 fused riders |
| `reference-class-on-people` | exit 0 — 96 cases, 0 throws, 24 of 24 Spellcasting rows, 0 using the lender's noun |
| `reference-mind-dc-sweep` | exit 0 — 0 rows above the card's DC |
| path probe, `kobold sorcerer` ×20 | **20 of 20** (40 of 40 with `goblin wizard`) |
| Brother Halric ×5, after the patch | **5 of 5 Humanoid** (was 3/2/2 across seven rolls) |
| the forty | 40 sheets, no throws, **5 FAIL of 40** |
| the widened scan, 81 sheets | **7 findings, all one class** — 2 real, 4 controls, 1 pre-patch |

### The forty's five failures, each checked against the diff

| sheet | FAIL | from these fixes? |
|---|---|---|
| Hydra, Stone Golem | `engine-needs-key` — a grapple engine with no key in the words | **No.** A checker rule on grapples. The Golem's Multiattack is clean and complete this roll: "It can replace one attack with a use of Stone Grip." |
| Marsh Grip Adept | `kit-lands` — the monk kit landed no row | **No.** No `print_body`, so fix B never fires. The kit landed Stunning Strike as a rider on Claw; the checker counts rows. |
| Krennik Skullstandard | `multiattack-row`, `multiattack-combination` | **No.** No `dead name` or `name follows content` line on the sheet, so `sweepDeadName` never ran. The Multiattack named a mashed compound of two row names, which the audit caught itself. |
| Well Drowned Thing | `vocab-2014-in-2024`, rider-save phrasing | **No.** Edition wording. |

5 of 40 is the top of the documented 2–5 band (`BACKLOG-reskin-2026-10-21.md:66-72`), with the
near-total population turnover that file describes: ten different creatures across the last four
forties. **All eight class-NPC sheets in the forty are Humanoid**, Brother Halric included.

## Blockers

**Two, neither from these fixes, both on a path a user reaches.**

**1. A goblin wizard throws, about 1 in 6.** `ship-eight` sheet 04 shipped an empty block:
`GENERATION THREW — unrenamed entry: "Signature Slot"`. The repair proposed "Hex of the Open Ear"
for that slot in both rounds, the over-4-words rule refused it both times, and the unrenamed
placeholder failed loudly. Re-rolled five times after the fact: **0 of 5 threw**, so the observed
rate is 1 of 6. Not from this work — the `generate.mjs` diff is lines 650–708 only, and the refusal
(`generate.mjs:1622`) and the loud failure (`generate.mjs:3763`) are untouched. The engine already
has the fallback this needs a few lines away: when no honest noun is free, a row takes its
template's own name. That path is simply not reached when the refusal is "over 4 words".

**2. A bare name with NO class named is still unstable.** "Old Marga" read `Medium Fey` on one run
and `Medium Plant` on the next. Her path is `class_npc — "Old Marga" (call)` with no class, so fix
A's scope — which requires a class, as narrowed — does not reach her. This is the widening the
handoff reserved for the owner, now seen on sheets twice.

**Not blockers, stated so they are not mistaken for clean:**

- **Captain Vane has two rows named "Longsword"** (`duplicate-row`, 1 FAIL of 6 in bare-names). One
  is the sheet's own, one is print's Guard Captain riding along. **Ruled out as fix A's doing:** the
  PRE-PATCH Captain Vane had the same two rows, and fix A did not fire on that roll — the route had
  already said Humanoid. It is the known duplicate-row class.
- **The four control hits in the scan** (`clockwork friar` → Construct ×2, `an undead priest` →
  Undead ×2) are the controls behaving correctly. The scan rule cannot tell a bare name from a
  worded concept, so it prints the GM's words and the reader judges.
- **`halric5` roll 03 of the PRE-PATCH run** read `Medium undead`. That was fix A leaking, and the
  cause was mine: the call answered `type_source: "user"` for a bare name — a claim those two words
  cannot support — and the first version of the fix honoured it, so the route's Undead stood. The
  guard is gone; the emptiness test is the check, because a type word the GM wrote would be one of
  the words left over. The post-patch batch reads 5 of 5.

### A note on the scan itself

It reported four classes of false positive on its first pass and was corrected before it was
trusted: it swallowed section headings and UI text into the row above, counted a people's OWN print
trait (Nimble Escape, Sunlight Sensitivity) as a foreign species kit, flagged print's legitimate
conditional-damage row on the Chapel Bell Ghost, and read `/NaN/i` inside "reve**nan**t". It was
then **replayed against last round's 46 sheets, where it found exactly 6 findings and every one
belonged to a fix in this batch** — three from B, two from D, one from A — and nothing else.


# Batch 1 — bare names, after the patch (fix A)

Three names alone and three controls. **Captain Vane and Sister Ilse are Humanoid by fix A** —
the call had answered Elemental for Vane. The controls keep the call's type, because the GM's
words carry material: `clockwork friar` stays a Construct and `an undead priest` stays Undead.
**Old Marga is blocker 2.**  1 FAIL of 6 — Captain Vane's duplicate Longsword, ruled out above.

`smoke-out/bare-names-2026-11-16T01-23-23`

---

## 01. Captain Vane — CR 4

**Input:** `name: Captain Vane | `
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 30s

**Type line:** `Medium Humanoid, Neutral` — **set by** unset

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Captain Vane — Captain Vane opens a fight by talking — cutting a bargain mid-parley, then calling the wind into his sails to drive his blade home behind words already half-believed. Every round after, he circles with salt-crusted steel and a barbed tongue, baiting enemies to swing at the truth so th
[concept] expansion answered: type=Humanoid (type_source=user) material=brine size=Medium mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: aura
[path] class_npc — class fighter — "Captain Vane" (call)
[concept] type settled: Elemental -> Humanoid — the words are a name and the class word and nothing else, and a person with a class and no named body is a Humanoid (owner's ruling, 2026-11-15); the route call had answered Elemental
[concept] resolve: archetype=defender type=Humanoid typeFrom=fix A (a bare name with a class) themes=beguiling/elemental mind=sapient style=leader energy=Lightning mix=both identity=✓ lore=✓
[reskin] class kit: fighter — "Captain Vane": Riposte (riposte)
[reskin] class weapon: Actions/"Javelin" -> "Longsword" — a fighter fights with a longsword, not the Guard Captain's
[reskin] multiattack re-read — "Whispered Bargain" left; "Multiattack" now reads "Vane makes two Longsword attacks."
```

**Every attack row**
```
Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.
Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.
```

```
Captain Vane

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

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
14
+2
+2
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
13
+1
+1

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Salt-Tongued. When Vane makes a Longsword attack against a creature, Vane has Advantage on that attack roll if the target has dealt damage to Vane since the end of Vane's last turn.

Actions

Multiattack. Vane makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

Reactions

Riposte. Trigger: A creature within 5 feet of Vane misses it with a melee attack roll. Response: Vane makes one Longsword attack against that creature.

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

## 02. Sister Ilse — CR 2

**Input:** `name: Sister Ilse | `
**Donor:** brute-2 -> CR 2
**Signature:** library · **elapsed** 28s

**Type line:** `Medium Humanoid, Neutral` — **set by** unset

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Sister Ilse — Sister Ilse opens a fight softly, stepping from the treeline or out of a doorway already singing a hymn, and any foe who hears it out feels the pull of her glamoured hospitality before steel is drawn. Every round after that she keeps the hymn going and falls back on her thorned hands —
[concept] expansion answered: type=Fey (type_source=inferred) material=thorn size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: snare
[path] class_npc — class cleric — "Sister" (call)
[concept] type settled: Fey -> Humanoid — the words are a name and the class word and nothing else, and a person with a class and no named body is a Humanoid (owner's ruling, 2026-11-15); the route call had answered Fey
[concept] resolve: archetype=brute type=Humanoid typeFrom=fix A (a bare name with a class) themes=fey/beguiling mind=sapient style=grappler energy=Psychic mix=both identity=✓ lore=✓
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Sister": nothing to add — the sheet already answers it
```

**The Spellcasting row, in full**
```
Spellcasting. Sister Ilse casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):
- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians
```

**Every attack row**
```
Mace. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.
Radiant Flame. Ranged Attack Roll: +5, range 60 ft. 11 (2d10) Radiant damage.
```

```
Sister Ilse

Medium Humanoid, Neutral

AC 13
Initiative +0 (10)

HP 38 (7d8 + 7)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
13
+1
+1
MOD
SAVE
DEX
10
+0
+0
WIS
16
+3
+3
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

Skills Medicine +7, Perception +5, Religion +5

Senses Passive Perception 15

Languages Common plus one other language

CR 2 (XP 450; PB +2)

Actions

Multiattack. Sister Ilse makes two attacks, using Mace or Radiant Flame in any combination. It can replace one attack with a use of Glamouring Hymn.

Mace. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.

Glamouring Hymn. Wisdom Saving Throw: DC 13, one creature within 30 feet. Failure: The target has the Charmed condition until the end of its next turn.

Radiant Flame. Ranged Attack Roll: +5, range 60 ft. 11 (2d10) Radiant damage.

Spellcasting. Sister Ilse casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Bonus Actions

Divine Aid (3/Day). Sister Ilse casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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

## 03. Old Marga — CR 1

**Input:** `name: Old Marga | `
**Donor:** brute-2 -> CR 1
**Signature:** library · **elapsed** 31s

**Type line:** `Medium Plant, Neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Old Marga — Old Marga opens by rooting herself in the path and letting her hollow, fungus-stuffed trunk gape — a false burrow mouth that smells of wet rot and sweet sap — so the curious and the hungry step within reach of her thorn-vines. Every round after she fights like a thing that has waited a c
[concept] expansion answered: type=Plant (type_source=inferred) material=thorn size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: snare
[path] class_npc — "Old Marga" (call)
[concept] resolve: archetype=brute type=Plant typeFrom=the route call themes=verdant/grasping mind=sapient style=grappler energy=Poison mix=both identity=✓ lore=✓
[reskin] class kit: none — the class_npc path takes no class kit
```

**Every attack row**
```
Shortsword. Melee Attack Roll: +4, reach 5 ft. 5 (1d6 + 2) Piercing damage plus 7 (2d6) Poison damage.
Hand Crossbow. Ranged Attack Roll: +4, range 30/120 ft. 5 (1d6 + 2) Piercing damage.
```

```
Old Marga

Medium Plant, Neutral

AC 12
Initiative +2 (12)

HP 27 (6d8)

Speed 30 ft., Climb 30 ft.

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
15
+2
+2
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

Skills Deception +5, Insight +4, Investigation +5, Perception +6, Sleight of hand +4, Stealth +6

Senses blindsight 30 ft. (blind beyond this radius); Passive Perception 16

Languages Common plus one other language

CR 1 (XP 200; PB +2)

Actions

Shortsword. Melee Attack Roll: +4, reach 5 ft. 5 (1d6 + 2) Piercing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +4, range 30/120 ft. 5 (1d6 + 2) Piercing damage.

Bonus Actions

Cunning Action. Marga takes the Dash, Disengage, or Hide action.

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

## 04. Pyx-Cantering Reliquary — CR 3

**Input:** `clockwork friar`
**Donor:** brute-2 -> CR 3
**Signature:** library · **elapsed** 31s

**Type line:** `Medium Construct, Neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: clockwork friar — A clockwork friar opens by pacing a slow, measured circuit of the room, tolling its own brass bell-mouth to lay a hollow, droning chime over all who hear it before closing to hand out penance with a flanged iron pyx-hand. Every round after that it works the room in metronomic rhyth
[concept] expansion answered: type=Construct (type_source=inferred) material=iron size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: aura
[path] class_npc — class cleric — "friar" (call)
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=forged/voice mind=sapient style=juggernaut energy=Thunder mix=both identity=✓ lore=✓
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "friar": nothing to add — the sheet already answers it
```

**The Spellcasting row, in full**
```
Spellcasting. The reliquary casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):
- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians
```

**Every attack row**
```
Mace. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.
Radiant Flame. Ranged Attack Roll: +5, range 60 ft. 11 (2d10) Radiant damage.
```

```
Pyx-Cantering Reliquary

Medium Construct, Neutral

AC 13
Initiative +0 (10)

HP 38 (7d8 + 7)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
13
+1
+1
MOD
SAVE
DEX
10
+0
+0
WIS
16
+3
+3
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

Skills Medicine +7, Perception +5, Religion +5

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Common plus one other language

CR 3 (XP 700; PB +2)

Actions

Multiattack. The reliquary makes two attacks, using Mace or Radiant Flame in any combination.

Mace. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.

Radiant Flame. Ranged Attack Roll: +5, range 60 ft. 11 (2d10) Radiant damage.

Spellcasting. The reliquary casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Bonus Actions

Divine Aid (3/Day). The reliquary casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Chimed Beat (1/Day). The reliquary creates a tolling, staggering chime that keeps the beat in a 15-foot Emanation originating from itself. The effect lasts while the reliquary maintains Concentration on it, up to 10 minutes. Each creature in the area has Disadvantage on attack rolls.

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

## 05. Litany Wight — CR 3

**Input:** `an undead priest`
**Donor:** caster-6 -> CR 3
**Signature:** library · **elapsed** 33s

**Type line:** `Medium Undead, Neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: an undead priest — An undead priest opens a fight by raising a hand and chanting a dirge that hollows the air with necrotic force, then closes to lay grave-cold hands on the living while its voice keeps the weak-willed frozen where they stand. It spends every round pacing its curse between the bolde
[concept] expansion answered: type=Undead (type_source=user) material=grave size=Medium mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: aura
[path] class_npc — class cleric — "priest" (call)
[concept] resolve: archetype=caster type=Undead typeFrom=the route call themes=grave/voice mind=sapient style=binder energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: cleric — "priest": Divine Aid (3/Day) (Priest/Divine Aid)
```

**The Spellcasting row, in full**
```
Spellcasting. The wight casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):
- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians
```

**Every attack row**
```
Radiant Flame. Ranged Attack Roll: +5, range 60 ft. 11 (2d10) Radiant damage.
Mace. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.
```

```
Litany Wight

Medium Undead, Neutral

AC 13
Initiative +0 (10)

HP 38 (7d8 + 7)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
13
+1
+1
MOD
SAVE
DEX
10
+0
+0
WIS
16
+3
+3
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

Skills Medicine +7, Perception +5, Religion +5

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Common plus one other language

CR 3 (XP 700; PB +2)

Traits

Flickering Shroud Evasion. While the wight is more than 5 feet from a creature attacking it, the attacker has Disadvantage on the attack roll unless it has spent a full round watching the wight without being distracted since the start of its last turn.

Actions

Multiattack. The wight makes two attacks, using Mace or Radiant Flame in any combination. It can replace one attack with a use of Hollowing Dirge.

Spellcasting. The wight casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Hollowing Dirge. Dexterity Saving Throw: DC 13, each creature of the wight's choice in a 30-foot Emanation originating from the wight. Failure: 4 (1d8) Necrotic damage, and the target immediately moves up to half its Speed in a direction of the wight's choice, using the safest available route.

Radiant Flame. Ranged Attack Roll: +5, range 60 ft. 11 (2d10) Radiant damage.

Mace. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.

Bonus Actions

Divine Aid (3/Day). The wight casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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

## 06. Drowned Midwife — CR 5

**Input:** `a marsh witch who curses trespassers`
**Donor:** caster-8-binder -> CR 5
**Signature:** library · **elapsed** 28s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[path] class_npc — class mage — "witch" (call)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/grave mind=sapient style=binder energy=Necrotic mix=energy identity=✓ lore=✓
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
```

**The Spellcasting row, in full**
```
Spellcasting. The midwife casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly
```

**Every attack row**
```
Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.
```

```
Drowned Midwife

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

Languages Common and any three languages

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The midwife makes three Arcane Burst attacks.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. The midwife casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). The midwife casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). The midwife casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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


# Batch 2 — Brother Halric ×5, after the patch (fix A)

**5 of 5 Humanoid**, three of them by fix A and two where the route already said so. 0 FAIL of 5.
Across the day this input has gone from three Humanoid, two Undead and two Construct to five of
five.

`smoke-out/halric5-2026-11-16T01-20-55`

---

## 01. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** caster-6 -> CR 3
**Signature:** library · **elapsed** 35s

**Type line:** `Medium humanoid, neutral` — **set by** unset

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Brother Halric — Brother Halric opens a fight by calling out a blessing over the road and closing in behind a heavy iron-shod cudgel, using his shield to funnel prey toward rough ground. Every round after that he works the crowd like a shepherd, striking low to lame and high to daze, and he position
[concept] expansion answered: type=Humanoid (type_source=inferred) material=iron size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: —
[path] class_npc — class cleric — "Brother" (call)
[concept] type settled: Construct -> Humanoid — the words are a name and the class word and nothing else, and a person with a class and no named body is a Humanoid (owner's ruling, 2026-11-15); the route call had answered Construct
[concept] resolve: archetype=caster type=Humanoid typeFrom=fix A (a bare name with a class) themes=armed/terror mind=sapient style=warpriest energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: cleric — "Brother": Divine Aid (3/Day) (Priest/Divine Aid)
```

**The Spellcasting row, in full**
```
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
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

Divine Aid (3/Day) (Bonus Action).Halric casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame.
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
Buckle the Earth (Recharge 5-6): Each creature in a 10-foot radius originating from the brother must make a DC 13 Dexterity saving throw, taking 14 (4d6) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is knocked prone.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
```

---

## 02. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** caster-6 -> CR 3
**Signature:** library · **elapsed** 28s

**Type line:** `Medium humanoid, neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Brother Halric — Brother Halric opens by preaching — a sermon of honeyed venom that sows doubt and pins the faithful in place while he wades in with his heavy censer, swinging it in slow ritual arcs. Each round he keeps the sermon going, mixing healing-word and hellfire so allies feel saved and enem
[concept] expansion answered: type=Humanoid (type_source=inferred) material=venom size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: aura
[path] class_npc — class cleric — "Brother" (call)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=venomous/voice mind=sapient style=warpriest energy=Poison mix=both identity=✓ lore=✓
[reskin] class kit: cleric — "Brother": Divine Aid (3/Day) (Priest/Divine Aid)
```

**The Spellcasting row, in full**
```
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
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

Divine Aid (3/Day) (Bonus Action).Halric casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame. It can replace one attack with a use of Censer Choke.
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
Censer Choke: One creature within 5 feet of Halric must succeed on a DC 13 Constitution saving throw or be poisoned until the end of its next turn.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
```

---

## 03. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** caster-6 -> CR 3
**Signature:** library · **elapsed** 28s

**Type line:** `Medium humanoid, neutral` — **set by** unset

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Brother Halric — Brother Halric opens by preaching — a low, droning litany that coils into the minds of the faithful and the fearful — then closes with a rusted censer swung like a flail, laying down a choking shroud of grave-ash so his congregation cannot scatter. He never charges; he advances at a
[concept] expansion answered: type=Undead (type_source=inferred) material=grave size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: aura
[path] class_npc — class cleric — "Brother" (call)
[concept] type settled: Undead -> Humanoid — the words are a name and the class word and nothing else, and a person with a class and no named body is a Humanoid (owner's ruling, 2026-11-15); the route call had answered Undead
[concept] resolve: archetype=caster type=Humanoid typeFrom=fix A (a bare name with a class) themes=grave/beguiling mind=sapient style=warpriest energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: cleric — "Brother": Divine Aid (3/Day) (Priest/Divine Aid)
```

**The Spellcasting row, in full**
```
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
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

Funeral Litany.Any creature that starts its turn in a 5-foot radius originating from Halric must make a DC 13 Constitution saving throw. On a failed save, the target is deafened until the start of its next turn. On a successful save, the target is immune to this creature's aura for 24 hours.
Divine Aid (3/Day) (Bonus Action).Halric casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame.
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
```

---

## 04. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** caster-6 -> CR 3
**Signature:** library · **elapsed** 31s

**Type line:** `Medium humanoid, neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Brother Halric — Brother Halric fights as an inquisitor of the flock: he opens by reading the souls before him and pinning the guiltiest with a booming, accusing sermon that staggers and brands the unfaithful, then wades in with a hooked censer that trails scalding incense, hooking and dragging the
[concept] expansion answered: type=Undead (type_source=inferred) material=grave size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: aura
[path] class_npc — class cleric — "Brother" (call)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=grave/voice mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: cleric — "Brother": Divine Aid (3/Day) (Priest/Divine Aid)
```

**The Spellcasting row, in full**
```
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
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

Divine Aid (3/Day) (Bonus Action).Halric casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame. It can replace one attack with a use of Brand of Guilt.
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
Brand of Guilt: Each creature within 30 feet of the brother must succeed on a DC 13 Wisdom saving throw or be frightened of him until the end of its next turn.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
```

---

## 05. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** brute-2 -> CR 3
**Signature:** library · **elapsed** 25s

**Type line:** `Medium humanoid, neutral` — **set by** unset

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Brother Halric — Brother Halric opens by closing distance behind a wall of droning prayer, then works the fight as a wrestling match — seizing a limb, bearing the target down, and hammering doctrine into bone with his iron-bound knuckles. He never stops talking: he argues, diagnoses, and forgives hi
[concept] expansion answered: type=Humanoid (type_source=inferred) material=iron size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: grapple
[path] class_npc — class cleric — "Brother" (call)
[concept] type settled: Construct -> Humanoid — the words are a name and the class word and nothing else, and a person with a class and no named body is a Humanoid (owner's ruling, 2026-11-15); the route call had answered Construct
[concept] resolve: archetype=brute type=Humanoid typeFrom=fix A (a bare name with a class) themes=armed/mind mind=sapient style=grappler energy=Thunder mix=both identity=✓ lore=✓
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Brother": nothing to add — the sheet already answers it
```

**The Spellcasting row, in full**
```
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
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

Divine Aid (3/Day) (Bonus Action).Halric casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame. It can replace one attack with a use of Verdict of the Iron Seal.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
Verdict of the Iron Seal: One creature within 5 feet of Halric must succeed on a DC 13 Strength saving throw or be grappled (escape DC 13).
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
```


# Batch 3 — a class on a people's body (fixes B and C)

0 FAIL of 6. No species kit on any people's body and no wrong size — the defects sheet 03 carried
last round. Sheet 06 is the control: `kobold warrior` stays the exact printed block, typed Dragon
as print types it, with no class filled.

`smoke-out/people-class-2026-11-16T00-31-54`

---

## 01. Sniv — CR 3

**Input:** `goblin wizard`
**Donor:** skirmisher-3 -> CR 3
**Signature:** dropped · **elapsed** 33s

**Type line:** `Small Humanoid, Chaotic Neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: goblin wizard
[path] filled: the head clause names the mage's "wizard" and the call named no class — a Goblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Goblin Warrior (is) — class mage — "wizard" (call)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/bestial mind=sapient style=— energy=Force mix=energy identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 3 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Goblin Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "wizard": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] class weapon: Actions/"Scimitar" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Goblin Warrior's
```

**The Spellcasting row, in full**
```
Spellcasting. Sniv casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.
Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.
```

```
Sniv

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

Pre-Ranged Trajectory. Sniv makes a Shortbow attack against a creature that has no cover from Sniv and can't see Sniv, the attack is a Critical Hit, and the target is Deafened until the end of its next turn as the shot whistles past its ear; if Sniv has the Frightened condition, the attack is not a Critical Hit but the target is still Deafened.

Actions

Multiattack. Sniv makes two attacks, using Quarterstaff or Shortbow in any combination.

Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.

Spellcasting. Sniv casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation

Bonus Actions

Nimble Escape. Sniv takes the Disengage or Hide action.

Reactions

Protective Magic (3/Day). Sniv casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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

## 02. Grubnik the Scrap-Spell — CR 1

**Input:** `goblin wizard`
**Donor:** skirmisher-1 -> CR 1
**Signature:** library · **elapsed** 24s

**Type line:** `Small Humanoid, Chaotic Neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: goblin wizard
[path] filled: the head clause names the Goblin Warrior, a people — a mage who is visibly one stands on its printed body (owner's ruling, 2026-11-15)
[path] filled: the head clause names the mage's "wizard" and the call named no class — a Goblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Goblin Warrior (is) — class mage — "wizard" (call)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/bestial mind=sapient style=— energy=Force mix=energy identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 1 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Goblin Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "wizard": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] class weapon: Actions/"Scimitar" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Goblin Warrior's
```

**The Spellcasting row, in full**
```
Spellcasting. Grubnik casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
Quarterstaff. Melee Attack Roll: +4, reach 5 ft. 7 (2d4 + 2) Bludgeoning damage.
Shortbow. Ranged Attack Roll: +4, range 80/320 ft. 5 (1d6 + 2) Piercing damage.
```

```
Grubnik the Scrap-Spell

Small Humanoid, Chaotic Neutral

AC 15
Initiative +2 (12)

HP 31 (9d6)

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
15
+2
+4
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

Skills Perception +1, Stealth +4

Senses darkvision 60 ft.; Passive Perception 11

Languages Common, Goblin

CR 1 (XP 200; PB +2)

Actions

Multiattack. Grubnik makes two attacks, using Quarterstaff or Shortbow in any combination. It can replace one attack with a use of Scrap Burst (Recharge 5-6).

Quarterstaff. Melee Attack Roll: +4, reach 5 ft. 7 (2d4 + 2) Bludgeoning damage.

Shortbow. Ranged Attack Roll: +4, range 80/320 ft. 5 (1d6 + 2) Piercing damage.

Spellcasting. Grubnik casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation

Scrap Burst (Recharge 5-6). Dexterity Saving Throw: DC 12, each creature in a 15-foot Emanation originating from Grubnik. Failure: 7 (2d6) Piercing damage.

Bonus Actions

Nimble Escape. Grubnik takes the Disengage or Hide action.

Reactions

Protective Magic (3/Day). Grubnik casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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

## 03. Emberhatched Vaultwarden — CR 2

**Input:** `kobold sorcerer`
**Donor:** skirmisher-1 -> CR 2
**Signature:** dropped · **elapsed** 30s

**Type line:** `Small Humanoid, Neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: kobold sorcerer
[path] filled: the head clause names the Kobold Warrior, a people — a mage who is visibly one stands on its printed body (owner's ruling, 2026-11-15)
[path] filled: the head clause names the mage's "sorcerer" and the call named no class — a Kobold Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Kobold Warrior (is) — class mage — "sorcerer" (call)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=draconic/subterranean mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 2 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Kobold Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "sorcerer": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] multiattack re-read — "Ember Bolt" left; "Multiattack" now reads "The vaultwarden makes two Dagger attacks."
[reskin] class weapon: Actions/"Dagger" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Kobold Warrior's
```

**The Spellcasting row, in full**
```
Spellcasting. The vaultwarden casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage.
```

```
Emberhatched Vaultwarden

Small Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 45 (18d6 - 18)

Speed 30 ft., Climb 30 ft.

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

Spider Climb. The vaultwarden can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Pack Tactics. The vaultwarden has Advantage on an attack roll against a creature if at least one of the vaultwarden's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Sunlight Sensitivity. While in sunlight, the vaultwarden has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The vaultwarden makes two Quarterstaff attacks.

Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage.

Spellcasting. The vaultwarden casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation

Reactions

Protective Magic (3/Day). The vaultwarden casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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

## 04. Vexick the Quiet — CR 3

**Input:** `goblin assassin`
**Donor:** skirmisher-3 -> CR 3
**Signature:** library · **elapsed** 25s

**Type line:** `Small Humanoid, Chaotic Neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: goblin assassin — The goblin assassin opens by picking its mark from shadow and striking with a poisoned blade for the throat before the fight truly begins, then uses its small size and every scrap of terrain to break line of sight and re-strike from cover while prey is confused. It is a patient, ca
[concept] expansion answered: type=Humanoid (type_source=user) material=venom size=Small mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: snare
[path] filled: the head clause names the rogue's "assassin" and the call named no class — a Goblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Goblin Warrior (is) — class rogue — "assassin" (call)
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=venomous/subterranean mind=sapient style=skulker energy=Poison mix=both identity=✓ lore=✓
[reskin] class kit: rogue — "assassin": Cunning Action (Assassin/Cunning Action), Evasion (evasion), Surprise Attack (assassinate)
[reskin] class weapon: Actions/"Scimitar" -> "Shortsword" — a rogue fights with a shortsword, not the Goblin Warrior's
```

**Every attack row**
```
Shortsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.
Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.
```

```
Vexick the Quiet

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

Surprise Attack. During the first round of each combat, Vexick has Advantage on attack rolls against any creature that hasn't taken a turn. If Vexick hits a creature during that round, the target takes an extra 6 (1d12) Piercing damage.

Evasion. If Vexick is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Vexick instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Vexick makes two attacks, using Shortsword or Shortbow in any combination.

Shortsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.

Bonus Actions

Nimble Escape. Vexick takes the Disengage or Hide action.

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

## 05. Karn Voth — CR 4

**Input:** `hobgoblin priest`
**Donor:** defender-3 -> CR 4
**Signature:** dropped · **elapsed** 35s

**Type line:** `Medium Humanoid, Lawful Evil` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: hobgoblin priest — The hobgoblin priest opens by planting its iron-shod staff and raising a war-chant that hardens every soldier around it with divine fervor, then wades into the line swinging that same staff in brutal, economical arcs. Each round it reads the battlefield and re-sites its blessing w
[concept] expansion answered: type=Humanoid (type_source=user) material=iron size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: aura
[path] filled: the head clause names the Hobgoblin Warrior, a people — a cleric who is visibly one stands on its printed body (owner's ruling, 2026-11-15)
[path] filled: the head clause names the cleric's "priest" and the call named no class — a Hobgoblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Hobgoblin Warrior (is) — class cleric — "priest" (call)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=armed/voice mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: Spellcasting lent by the Priest — this sheet stands on the Hobgoblin Warrior, a body that carries no spellcasting, and a cleric without it is not a cleric
[reskin] class kit: cleric — "priest": Divine Aid (3/Day) (Priest/Divine Aid)
[reskin] class weapon: Actions/"Longsword" -> "Mace" — a cleric fights with a mace, not the Hobgoblin Warrior's
```

**The Spellcasting row, in full**
```
Spellcasting. Karn casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):
- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians
```

**Every attack row**
```
Mace. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Bludgeoning damage.
Longbow. Ranged Attack Roll: +6, range 150/600 ft. 13 (2d8 + 4) Piercing damage.
```

```
Karn Voth

Medium Humanoid, Lawful Evil

AC 19
Initiative +1 (11)

HP 66 (12d8 + 12)

Speed 30 ft.

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
12
+1
+1
WIS
16
+3
+5
MOD
SAVE
CON
12
+1
+3
CHA
9
-1
-1

Skills Athletics +6, Perception +5

Senses Passive Perception 15

Languages Common, Goblin

CR 4 (XP 1,100; PB +2)

Traits

Pack Tactics. Karn has Advantage on an attack roll against a creature if at least one of Karn's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. Karn makes two attacks, using Mace or Longbow in any combination.

Mace. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Bludgeoning damage.

Longbow. Ranged Attack Roll: +6, range 150/600 ft. 13 (2d8 + 4) Piercing damage.

Spellcasting. Karn casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Bonus Actions

Divine Aid (3/Day). Karn casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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

## 06. Kobold Warrior — CR 1

**Input:** `kobold warrior`
**Donor:** skirmisher-1 -> CR 1
**Signature:** dropped · **elapsed** 21s

**Type line:** `Small Dragon, Neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: kobold warrior
[path] exact — Kobold Warrior (is) — "Kobold Warrior" (code)
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=bestial/grasping mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the exact path takes no class kit
[reskin] multiattack re-read — "Dart" left; "Multiattack" now reads "The kobold warrior makes two Dagger attacks."
```

**Every attack row**
```
Dagger. Melee or Ranged Attack Roll: +4, reach 5 ft. or range 20/60 ft. 7 (2d4 + 2) Piercing damage.
```

```
Kobold Warrior

Small Dragon, Neutral

AC 15
Initiative +2 (12)

HP 30 (12d6 - 12)

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

Pack Tactics. The kobold warrior has Advantage on an attack roll against a creature if at least one of the kobold warrior's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Sunlight Sensitivity. While in sunlight, the kobold warrior has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The kobold warrior makes two Dagger attacks.

Dagger. Melee or Ranged Attack Roll: +4, reach 5 ft. or range 20/60 ft. 7 (2d4 + 2) Piercing damage.

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


# Batch 4 — the ship gate eight

0 FAIL of 7 read. **Sheet 04 threw and shipped an empty block — blocker 1.** The other seven are
whole.

`smoke-out/ship-eight-2026-11-16T00-34-43`

---

## 01. Headless Horseman — CR 11

**Input:** `name: Headless Horseman | `
**Donor:** skirmisher-8-mounted -> CR 11 (invented — no printed peer)
**Signature:** library · **elapsed** 27s

**Type line:** `Medium Undead, Neutral Evil` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Headless Horseman — The Headless Horseman rides down the road at a gallop, hurling its severed head ahead of it as a screaming missile that bursts in a wave of grave-cold terror before it closes to saber range. Every round it wheels and charges, trampling and cutting, and it never fights on foot if
[concept] expansion answered: type=Undead (type_source=user) material=grave size=Medium mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: gaze
[path] homebrew — "Headless Horseman" (call)
[concept] resolve: archetype=skirmisher type=Undead typeFrom=the route call themes=grave/terror mind=sapient style=mounted energy=Necrotic mix=both identity=✓ lore=✓
[reskin] mind tier held: WIS stays 14 against "capable" — the card's 14 is already capable
[reskin] mind tier: INT 10 -> 15 — the call read this creature as capable at CR 11
[reskin] mind tier: CHA 10 -> 20 — the call read this creature as formidable at CR 11
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Saber. Melee Attack Roll: +9, reach 5 ft. 15 (3d6 + 5) Slashing damage plus 7 (2d6) Necrotic damage. If the headless horseman moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 5 (1d10) Slashing damage and, if it is Large or smaller, has the Prone condition.
Head. Ranged Attack Roll: +9, range 20/60 ft. 18 (3d8 + 5) Necrotic damage.
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
14
+2
+6
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

Skills Perception +6, Stealth +9

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 16

Languages Common plus the languages it knew in life

CR 11 (XP 7,200; PB +4)

Traits

Marked Prey. The headless horseman knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Gallop. The headless horseman ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The headless horseman makes three attacks, using Saber or Head in any combination. It can replace one attack with a use of Grave-Terror Gaze.

Saber. Melee Attack Roll: +9, reach 5 ft. 15 (3d6 + 5) Slashing damage plus 7 (2d6) Necrotic damage. If the headless horseman moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 5 (1d10) Slashing damage and, if it is Large or smaller, has the Prone condition.

Head. Ranged Attack Roll: +9, range 20/60 ft. 18 (3d8 + 5) Necrotic damage.

Hooves (Recharge 5-6). The headless horseman moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Dexterity Saving Throw: DC 17. Failure: 66 (12d10) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

Grave-Terror Gaze. Wisdom Saving Throw: DC 17, one creature the headless horseman can see within 60 feet. Failure: 11 (2d10) Necrotic damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage only.

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
**Donor:** defender-8-leader -> CR 10 (invented — no printed peer)
**Signature:** library · **elapsed** 26s

**Type line:** `Large Plant, Neutral Evil` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Pumpkin King — The Pumpkin King opens with a bellowing royal decree that roots lesser foes in fear, then wades in swinging its scythe-like arms and seed-spewing gourd-head while its hollowed subjects pour from the soil to drag prey down. It is a tyrant of the harvest: it never retreats, but it toys
[concept] expansion answered: type=Plant (type_source=inferred) material=thorn size=Large mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: aura
[path] homebrew — title King — "Pumpkin King" (call)
[concept] resolve: archetype=defender type=Plant typeFrom=the route call themes=verdant/terror mind=sapient style=leader energy=Fire mix=both identity=✓ lore=✓
[reskin] mind tier held: CHA stays 18 against "formidable" — the card's save DC 16 derives from CHA 18 and from no physical score
[reskin] mind tier: INT 12 -> 15 — the call read this creature as capable at CR 10
[reskin] mind tier: WIS 13 -> 15 — the call read this creature as capable at CR 10
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Scythe Arm. Melee Attack Roll: +9, reach 5 ft. 14 (2d8 + 5) Slashing damage plus 9 (2d8) Fire damage.
Gourd Slam. Melee Attack Roll: +9, reach 5 ft. 23 (4d8 + 5) Bludgeoning damage.
```

```
Pumpkin King

Large Plant, Neutral Evil

AC 17
Initiative +2 (12)

HP 161 (19d10 + 57)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+5
INT
15
+2
+2
MOD
SAVE
DEX
14
+2
+2
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
18
+4
+8

Skills Athletics +9, Persuasion +8

Immunities Fire

Senses Passive Perception 12

Languages Common

CR 10 (XP 5,900; PB +4)

Traits

Pumpkin Court's Favor. While in a 10-foot Emanation originating from the pumpkin king, the pumpkin king and its allies have Advantage on attack rolls and saving throws, provided the pumpkin king doesn't have the Incapacitated condition.

Actions

Multiattack. The pumpkin king makes three attacks, using Scythe Arm or Gourd Slam in any combination.

Scythe Arm. Melee Attack Roll: +9, reach 5 ft. 14 (2d8 + 5) Slashing damage plus 9 (2d8) Fire damage.

Gourd Slam. Melee Attack Roll: +9, reach 5 ft. 23 (4d8 + 5) Bludgeoning damage.

Harvest Sweep (Recharge 5-6). Dexterity Saving Throw: DC 16, each creature in a 10-foot Emanation originating from the pumpkin king. Failure: 24 (7d6) Slashing damage, and the target has the Prone condition. Success: Half damage only.

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

## 03. Forge Knife Ball — CR 5

**Input:** `name: Knife Ball | `
**Donor:** brute-5-juggernaut -> CR 5
**Signature:** library · **elapsed** 26s

**Type line:** `Medium Construct, Unaligned` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Knife Ball — A Knife Ball rolls into the fray as a churning sphere of honed, overlapping blades, then launches a volley of spinning knives that arc back to rejoin its mass, keeping prey pinned at range between salvos. Every round it reconfigures—splitting a fresh edge outward, wheeling to present a
[concept] expansion answered: type=Construct (type_source=inferred) material=iron size=Medium mind=mindless
[concept] expansion attack mode: mixed
[concept] expansion signature: thrown-weapon
[path] homebrew — "Knife Ball" (call)
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=forged/armed mind=mindless style=juggernaut energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 6 against "feeble" — the call read this creature as mindless, and the card's 6 is already that dim
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Knife. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Piercing damage, and the knife ball has Advantage on its next attack roll against the target before the end of its next turn.
```

```
Forge Knife Ball

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

Multiattack. The knife ball makes two Knife attacks.

Knife. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Piercing damage, and the knife ball has Advantage on its next attack roll against the target before the end of its next turn.

Knife Burst (Recharge 5-6). The knife ball begins gathering destructive power, the knives curve back in a wide arc. At the end of its next turn, after it has moved, the power erupts. Dexterity Saving Throw: DC 14, each creature in a 20-foot Emanation originating from the knife ball at that moment. Failure: 26 (4d12) Piercing damage. Success: Half damage.

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

## 04. goblin wizard — CR 3  [GENERATION THREW — Statblock generation failed: unrenamed entry: "Signature Slot" — failing loudly per spec]

**Input:** `goblin wizard`
**Donor:** skirmisher-3 -> CR 3
**Signature:** — · **elapsed** 10s

**Type line:** `(none — the sheet threw)` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: goblin wizard
[path] filled: the head clause names the Goblin Warrior, a people — a mage who is visibly one stands on its printed body (owner's ruling, 2026-11-15)
[path] filled: the head clause names the mage's "wizard" and the call named no class — a Goblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Goblin Warrior (is) — class mage — "wizard" (call)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/subterranean mind=sapient style=— energy=Force mix=both identity=✓ lore=✓
```

**Every attack row**
```
(no attack row)
```

```

```

---

## 05. Warp Warren Sorcerer — CR 2

**Input:** `kobold sorcerer`
**Donor:** skirmisher-1 -> CR 2
**Signature:** library · **elapsed** 34s

**Type line:** `Small Humanoid, Neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: kobold sorcerer
[path] refused: species "kobold" has no kit
[path] filled: species "kobold" has no kit, but print carries it as Kobold Warrior — the body stands so the people is not erased
[path] filled: the head clause names the mage's "sorcerer" and the call named no class — a Kobold Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Kobold Warrior (is) — class mage — "sorcerer" (call)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/subterranean mind=sapient style=— energy=Force mix=energy identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 2 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Kobold Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "sorcerer": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] multiattack re-read — "Spellscrap Bolt" left; "Multiattack" now reads "The sorcerer makes two Dagger attacks."
[reskin] class weapon: Actions/"Dagger" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Kobold Warrior's
[reskin] multiattack re-read — "Rubble-Spray Backlash" left; "Multiattack" now reads "The sorcerer makes two Quarterstaff attacks."
```

**The Spellcasting row, in full**
```
Spellcasting. The sorcerer casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage.
```

```
Warp Warren Sorcerer

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

Skull-Crack Squeeze. The sorcerer can move through a gap or opening no wider than its skull without slowing, treating such a space as normal terrain and leaving behind a narrow, impassable crack.

Pack Tactics. The sorcerer has Advantage on an attack roll against a creature if at least one of the sorcerer's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Sunlight Sensitivity. While in sunlight, the sorcerer has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The sorcerer makes two Quarterstaff attacks.

Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage.

Spellcasting. The sorcerer casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation

Reactions

Protective Magic (3/Day). The sorcerer casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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

## 06. Tome Custodian — CR 3

**Input:** `mummy librarian`
**Donor:** skirmisher-3 -> CR 3
**Signature:** library · **elapsed** 26s

**Type line:** `Small Undead, Lawful Evil` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: mummy librarian — The mummy librarian opens by shuffling into the aisle between it and intruders, raising one grave-wrapped arm to hurl a heavy, dust-caked tome with uncanny aim; thereafter it fights at range, flinging catalogued volumes in precise, punishing volleys while backing toward its shelves
[concept] expansion answered: type=Undead (type_source=inferred) material=grave size=Medium mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: thrown-weapon
[path] twist — Mummy (is) — "mummy" (call)
[concept] resolve: archetype=skirmisher type=Undead typeFrom=the route call themes=grave/armed mind=sapient style=hurler energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**Every attack row**
```
Rotting Fist. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Bludgeoning damage plus 10 (3d6) Necrotic damage. If the target is a creature, it is cursed. While cursed, the target can't regain Hit Points, its Hit Point maximum doesn't return to normal when finishing a Long Rest, and its Hit Point maximum decreases by 10 (3d6) every 24 hours that elapse. A creature dies and turns to dust if reduced to 0 Hit Points by this attack.
```

```
Tome Custodian

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

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus two other languages

CR 3 (XP 700; PB +2)

Actions

Multiattack. The custodian makes two Rotting Fist attacks and uses Dreadful Glare.

Rotting Fist. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Bludgeoning damage plus 10 (3d6) Necrotic damage. If the target is a creature, it is cursed. While cursed, the target can't regain Hit Points, its Hit Point maximum doesn't return to normal when finishing a Long Rest, and its Hit Point maximum decreases by 10 (3d6) every 24 hours that elapse. A creature dies and turns to dust if reduced to 0 Hit Points by this attack.

Tome Burst (Recharge 5-6). Dexterity Saving Throw: DC 11, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. Failure: 13 (3d8) Necrotic damage. Success: Half damage.

Dreadful Glare. Wisdom Saving Throw: DC 11, one creature the custodian can see within 60 feet. Failure: The target has the Frightened condition until the end of the custodian's next turn. Success: The target is immune to this mummy's Dreadful Glare for 24 hours.

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

## 07. Silver-Tongued Toad — CR 2

**Input:** `a silver-tongued toad the size of a pony`
**Donor:** brute-2 -> CR 2
**Signature:** library · **elapsed** 34s

**Type line:** `Medium Beast, Unaligned` — **set by** the route call

**`[path]` and the lines that decided it**
```
[path] homebrew — "a silver-tongued toad the size of a pony" (call)
[concept] resolve: archetype=brute type=Beast typeFrom=the route call themes=voice/beguiling mind=bestial style=— energy=Thunder mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 6 against "ordinary" — the call read this creature as bestial, so only "feeble" could lower its INT
[reskin] mind tier: WIS 8 -> 15 — the call read this creature as capable at CR 2
[reskin] mind tier: CHA 6 -> 18 — the call read this creature as formidable at CR 2
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Tongue. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage plus 6 (1d12) Thunder damage.
```

```
Silver-Tongued Toad

Medium Beast, Unaligned

AC 12
Initiative -1 (9)

HP 52 (8d8 + 16)

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
15
+2
+2
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

Skills Athletics +5, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages None

CR 2 (XP 450; PB +2)

Traits

Throat-Stolen Words. When a creature fails its save against the toad's Silvered Croak, the creature is Deafened and cannot speak until the end of its next turn, and the toad can thereafter speak in that creature's exact voice, calling its allies closer or drowning out any order given within 60 feet of the toad.

Actions

Tongue. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage plus 6 (1d12) Thunder damage.

Silvered Croak (Recharge 5-6). Wisdom Saving Throw: DC 12, one creature within 30 feet that can see or hear the toad's silvered, croaking call. Failure: The target has the Charmed condition until the start of the silver-tongued toad's next turn, and while Charmed this way, it must move toward the silver-tongued toad by the safest available route on its turn.

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

## 08. Drowned Pike — CR 3

**Input:** `a giant river pike`
**Donor:** brute-5-grappler -> CR 3
**Signature:** library · **elapsed** 29s

**Type line:** `Huge Beast, Unaligned` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: a giant river pike — The giant river pike holds still in the current, a log-shaped silhouette, then explodes forward to seize the nearest swimmer or boat-dangler in a single lunging bite and drag them under. Every round after that it worries the grappled prey deeper and shakes it, using the river's
[concept] expansion answered: type=Beast (type_source=inferred) material=bone size=Huge mind=bestial
[concept] expansion attack mode: melee
[concept] expansion signature: grapple
[path] homebrew — "a giant river pike" (call)
[concept] resolve: archetype=brute type=Beast typeFrom=the route call themes=aquatic/devouring mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 3
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] multiattack re-read — "Lunging Strike" left; "Multiattack" now reads "The pike makes two Bite attacks."
```

**Every attack row**
```
Bite. Melee Attack Roll: +6, reach 10 ft. 13 (2d8 + 4) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.
```

```
Drowned Pike

Huge Beast, Unaligned

AC 13
Initiative -1 (9)

HP 66 (7d12 + 21)

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
4
-3
-3

Skills Athletics +6, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages None

CR 3 (XP 700; PB +2)

Actions

Multiattack. The pike makes two Bite attacks.

Bite. Melee Attack Roll: +6, reach 10 ft. 13 (2d8 + 4) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Thrashing Roll. Strength Saving Throw: DC 12, one creature within 10 feet. Failure: 13 (3d8) Bludgeoning damage.

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


# Batch 5 — the regression forty

40 sheets, no throws, 5 FAIL of 40, each checked against the diff in the table above and none
from these fixes.

`smoke-out/sweep-2026-11-16T00-38-16`

---

## 01. Dire Wolf — CR 1

**Input:** `name: Dire Wolf | with a frost-rimed hide`
**Donor:** brute-2 -> CR 1
**Signature:** dropped · **elapsed** 29s

**`[path]` and the lines that decided it**
```
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[concept] resolve: archetype=brute type=Beast typeFrom=the route call themes=bestial/elemental mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

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

Blood on the Snow. While a creature the dire wolf can see is missing Hit Points, the dire wolf has Advantage on Wisdom (Perception) checks to track that creature, and difficult terrain of snow and ice doesn't cost it extra movement while it moves toward that creature.

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
**Signature:** library · **elapsed** 33s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a mud-caked bog hound that drags fishermen under" (call)
[concept] resolve: archetype=brute type=Beast typeFrom=the route call themes=aquatic/grasping mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 1
[reskin] class kit: none — the homebrew path takes no class kit
```

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

	

4 (-3)

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

Mire-Born.While the bog hound is in difficult terrain or immersed in water, the bog hound ignores the movement cost of difficult terrain and water and can hide there with advantage, and a submerged hound is unseen by a creature that fails a DC 13 Wisdom (Perception) check until the hound attacks or the creature's next turn begins.

Actions
Multiattack: The bog hound makes two Bite attacks. It can replace one attack with a use of Repel Prey.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained.
Repel Prey: Each creature in a 15-foot cone must make a DC 13 Strength saving throw. On a failed save, the target is pushed up to 15 feet away from the bog hound and is knocked prone.
```

---

## 03. Owlbear — CR 3

**Input:** `name: Owlbear | that has learned to climb`
**Donor:** brute-2 -> CR 3
**Signature:** library · **elapsed** 26s

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: Owlbear — that has learned to climb
[path] twist — Owlbear (is) — "Name field: Owlbear" (code)
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=bestial/subterranean mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

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
Multiattack: The owlbear makes two Rend attacks. It can replace one attack with a use of Hamstringing Swipe.
Rend: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.
Hamstringing Swipe: One creature within 60 feet must make a DC 15 Constitution saving throw. On a failed save, the target's Speed is halved and it can't take Reactions until the end of the owlbear's next turn.
```

---

## 04. Bellwright Thedric — CR 3

**Input:** `a chapel bell-ringer's ghost that tolls for the dying`
**Donor:** lurker-2 -> CR 3
**Signature:** library · **elapsed** 31s

**`[path]` and the lines that decided it**
```
[path] twist — Ghost (is) — "ghost" (call)
[concept] resolve: archetype=lurker type=Undead typeFrom=the route call themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**Every attack row**
```
Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.
```

```
Bellwright Thedric

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

Ethereal Sight. Thedric can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. Thedric can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. Thedric makes two Withering Touch attacks. It can replace one attack with a use of Grave-Soil Toll.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Grave-Soil Toll. Constitution Saving Throw: DC 13, one creature within 5 feet. Failure: 13 (3d8) Necrotic damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see Thedric and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of Thedric's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid Thedric can see within 5 feet. Failure: The target is possessed by Thedric; Thedric disappears, and the target has the Incapacitated condition and loses control of its body. Thedric now controls the body, but the target retains awareness. Thedric can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. Thedric's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or Thedric leaves as a Bonus Action. When the possession ends, Thedric appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. Thedric casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. Thedric is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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
**Donor:** lurker-5 -> CR 5
**Signature:** library · **elapsed** 29s

**`[path]` and the lines that decided it**
```
[path] twist — Air Elemental (is) — "Name field: Air Elemental" (code)
[concept] resolve: archetype=lurker type=Elemental typeFrom=the route call themes=elemental/voice mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

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

Skills Perception +3, Stealth +11

Resistances Bludgeoning, Lightning, Piercing, Slashing

Immunities Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious

Senses blindsight 30 ft.; Passive Perception 13

Languages Primordial (Auran)

CR 5 (XP 1,800; PB +3)

Traits

Air Form. The air elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The air elemental makes two Thunderous Slam attacks. It can replace one attack with a use of Wailing Fear.

Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.

Wailing Fear. Wisdom Saving Throw: DC 13, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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

## 06. Living Scree — CR 5

**Input:** `a quarry-pit thing of living scree that buries what it catches`
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 25s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a quarry-pit thing of living scree that buries what it catches" (call)
[concept] resolve: archetype=brute type=Elemental typeFrom=the route call themes=elemental/subterranean mind=mindless style=grappler energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as mindless, and the card's 4 is already that dim
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
(no attack row)
```

```
Living Scree
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

Engulf (Bonus Action).The living scree engulfs one Medium or smaller creature it is grappling. While engulfed, the target is blinded and restrained, has Total Cover against attacks and other effects outside the living scree, and takes 7 (2d6) acid damage at the start of each of the living scree's turns. The living scree can have only one creature engulfed at a time. If the living scree takes 15 damage or more in a single turn from the engulfed creature, the living scree must expel the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the living scree. If the living scree dies, an engulfed creature pulls free of the mass prone by using 5 feet of movement.

Actions
Multiattack: The living scree makes two Stone Tumble attacks.
Stone Tumble: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained. If the living scree moved at least 20 feet straight toward the target immediately before the hit and the target is Large or smaller, the target is knocked prone, and the living scree can make one Stone Tumble attack against it as a bonus action.
```

---

## 07. Hydra — CR 8

**Input:** `name: Hydra | whose stumps smoke instead of regrowing`
**Donor:** brute-5 -> CR 8
**Signature:** library · **elapsed** 27s

**`[path]` and the lines that decided it**
```
[path] twist — Hydra (is) — "Name field: Hydra" (code)
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=bestial/venomous mind=bestial style=regenerator energy=Fire mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

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

Damage Resistances: 

fire

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
Multiattack: The hydra makes as many Bite attacks as it has heads. It can replace one attack with a use of Cauterizing Grip.
Bite: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.
Cauterizing Grip: One creature within 10 feet of the hydra must succeed on a DC 16 Strength saving throw or take 28 (8d6) fire damage and be grappled (escape DC 16).
```

---

## 08. Lashed Rampart — CR 8

**Input:** `a siege-engine golem of lashed timber that shoulders through walls`
**Donor:** brute-5-juggernaut -> CR 8
**Signature:** library · **elapsed** 25s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a siege-engine golem of lashed timber that shoulders through walls" (call)
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=forged/terror mind=mindless style=juggernaut energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 6 against "feeble" — the call read this creature as mindless, and the card's 6 is already that dim
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Timber Shoulder. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage.
```

```
Lashed Rampart

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

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Understands the languages of its creator but can't speak

CR 8 (XP 3,900; PB +3)

Traits

Bound. The lashed rampart is bound to its ordered line. It can't willingly move more than 120 feet from its ordered line, and it always knows the direction and distance to its ordered line.

Immutable Form. The lashed rampart can't shape-shift.

Magic Resistance. The lashed rampart has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The lashed rampart makes two Timber Shoulder attacks.

Timber Shoulder. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage.

Trample (Recharge 5-6). The lashed rampart moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Dexterity Saving Throw: DC 16. Failure: 27 (6d8) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

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
**Signature:** library · **elapsed** 26s

**`[path]` and the lines that decided it**
```
[path] twist — Stone Golem (is) — "Name field: Stone Golem" (code)
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=grave/forged mind=sapient style=juggernaut energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

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

Immutable Form. The stone golem can't shape-shift.

Magic Resistance. The stone golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The stone golem makes two attacks, using Slam or Force Bolt in any combination. It can replace one attack with a use of Stone Grip.

Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.

Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.

Stone Grip. Strength Saving Throw: DC 17, one creature within 10 feet. Failure: The target has the Grappled condition (escape DC 18).

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

## 10. Drowned Nave Choir — CR 10

**Input:** `a drowned cathedral choir that sings in one voice`
**Donor:** brute-9 -> CR 10
**Signature:** library · **elapsed** 30s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a drowned cathedral choir that sings in one voice" (call)
[concept] resolve: archetype=brute type=Undead typeFrom=the route call themes=grave/aquatic mind=sapient style=— energy=Cold mix=both identity=✓ lore=✓
[reskin] mind tier: INT 8 -> 15 — the call read this creature as capable at CR 10
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 10
[reskin] mind tier: CHA 8 -> 20 — the call read this creature as formidable at CR 10
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
(no attack row)
```

```
Drowned Nave Choir
Huge undead, neutral
Armor Class

15 (natural armor)

Hit Points: 

180 (19d12 + 57)

Speed: 

40 ft., swim 40 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

8 (-1)

	

17 (+3)

	

15 (+2)

	

20 (+5)

	

20 (+5)

Skills: 

Athletics +8, Perception +9

Saving Throws: 

STR +8, CON +7

Damage Immunities: 

cold, poison

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

Actions
Multiattack: The choir makes two Bell attacks. It can replace one attack with a use of Drowned Hymn.
Bell: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 31 (6d8 + 4) bludgeoning damage.
Drowned Hymn: Each creature of the choir's choice in a 30-foot radius originating from the choir that can see or hear it must make a DC 15 Wisdom saving throw. On a failed save, the target is frightened until the start of its next turn. On a successful save, the target is immune to this creature's terror for 24 hours.
```

---

## 11. Vampire — CR 13

**Input:** `name: Vampire | who keeps a garden of thorns`
**Donor:** brute-13 -> CR 13 (invented — no printed peer)
**Signature:** library · **elapsed** 38s

**`[path]` and the lines that decided it**
```
[path] twist — Vampire (is) — "Name field: Vampire" (code)
[concept] resolve: archetype=brute type=Undead typeFrom=the route call themes=grave/grasping mind=sapient style=regenerator energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

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

Thornburst Wounds.A creature that touches the vampire or hits it with a melee attack while within 5 feet of it takes 10 (3d6) necrotic damage.
Cultivated Thicket.While the vampire is on the ground, black bramble fills a 10-foot-radius sphere around the vampire as difficult terrain for creatures other than the vampire and those it designates as allies, dealing 14 (4d6) piercing damage to any other creature that begins its turn there, and it vanishes while the vampire is airborne.
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
Multiattack (Vampire Form Only): The vampire makes two Grave Strike attacks and uses Bite.
Grave Strike: Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) from one of two hands.
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that has the grappled, incapacitated, or restrained condition must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) piercing damage on a failed save, plus 13 (3d8) necrotic damage. The target's Hit Point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a Vampire Spawn under the vampire's control.
Legendary Actions

The vampire can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The vampire regains spent legendary actions at the start of its turn.

Deathless Strike: The vampire moves up to half its Speed, and it makes one Grave Strike attack.
Beguile: The vampire casts Command, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17). The vampire can't take this action again until the start of its next turn.
```

---

## 12. Corpsepallid Archon — CR 13

**Input:** `a plague-bearing archon of flies that commands lesser swarms`
**Donor:** defender-8-leader -> CR 13 (invented — no printed peer)
**Signature:** library · **elapsed** 34s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a plague-bearing archon of flies that commands lesser swarms" (call)
[concept] resolve: archetype=defender type=Fiend typeFrom=the route call themes=fiendish/venomous mind=sapient style=leader energy=Poison mix=both identity=✓ lore=✓
[reskin] mind tier held: CHA stays 18 against "formidable" — the card's 18 is already formidable
[reskin] mind tier: INT 12 -> 15 — the call read this creature as capable at CR 13
[reskin] mind tier: WIS 13 -> 20 — the call read this creature as formidable at CR 13
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Fetid Flail. Melee Attack Roll: +10, reach 5 ft. 18 (3d8 + 5) Bludgeoning damage plus 13 (3d8) Poison damage.
Bone Blade. Melee Attack Roll: +10, reach 5 ft. 32 (6d8 + 5) Slashing damage.
```

```
Corpsepallid Archon

Medium Fiend, Neutral Evil

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
15
+2
+2
MOD
SAVE
DEX
14
+2
+2
WIS
20
+5
+5
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

Resistances Cold

Immunities Poison; Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the archon, the archon and its allies have Advantage on attack rolls and saving throws, provided the archon doesn't have the Incapacitated condition.

Actions

Multiattack. The archon makes three attacks, using Fetid Flail or Bone Blade in any combination. It can replace one attack with a use of Word of Blindness.

Fetid Flail. Melee Attack Roll: +10, reach 5 ft. 18 (3d8 + 5) Bludgeoning damage plus 13 (3d8) Poison damage.

Bone Blade. Melee Attack Roll: +10, reach 5 ft. 32 (6d8 + 5) Slashing damage.

Word of Blindness. Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Blinded condition until the end of its next turn.

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
**Signature:** library · **elapsed** 32s

**`[path]` and the lines that decided it**
```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=subterranean/devouring mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

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

Senses tremorsense 60 ft.; Passive Perception 14

Languages None

CR 15 (XP 13,000; PB +5)

Traits

Studded Hide. When a creature hits the purple worm with a melee attack, the jagged spines studding its hide twist and stab the attacker, dealing 22 (5d8) Piercing damage to it.

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

## 14. Heart of the Glacier — CR 15

**Input:** `a glacier's heart given legs, trailing a wake of killing cold`
**Donor:** brute-9-juggernaut -> CR 15
**Signature:** library · **elapsed** 28s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a glacier's heart given legs, trailing a wake of killing cold" (call)
[concept] resolve: archetype=brute type=Elemental typeFrom=the route call themes=elemental/terror mind=mindless style=juggernaut energy=Cold mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 6 against "feeble" — the call read this creature as mindless, and the card's 6 is already that dim
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 15
[reskin] mind tier: CHA 4 -> 20 — the call read this creature as formidable at CR 15
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
(no attack row)
```

```
Heart of the Glacier
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

	

15 (+2)

	

20 (+5)

Skills: 

Athletics +9, Perception +7

Saving Throws: 

STR +9, CON +9

Damage Immunities: 

cold, poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

tremorsense 60 ft., passive Perception 17

Languages: 

None

Challenge

15 (13,000 XP)

Proficiency Bonus:

+5

Sure Footing.Difficult Terrain composed of ice and snow doesn't cost the heart extra movement, and the heart can move across ice and snow without needing to make an ability check.
Cold Absorption.Whenever the heart is subjected to cold damage, it takes no damage and instead regains a number of hit points equal to the cold damage dealt.
Siege Monster.The heart deals double damage to objects and structures.

Actions
Multiattack: The heart makes two Crystalline Fist attacks. It can replace one attack with a use of Wake of Black Ice.
Crystalline Fist: Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage plus 13 (3d8) cold damage.
Killing Cold (Recharge 5-6): Each creature in a 30-foot cone must make a DC 18 Constitution saving throw, taking 66 (12d10) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
Wake of Black Ice: One creature within 30 feet of the heart must succeed on a DC 18 Strength saving throw or take 31 (9d6) cold damage and be knocked prone.
```

---

## 15. Adult Red Dragon — CR 17

**Input:** `name: Adult Red Dragon | blind in one eye from an old lance`
**Donor:** dragon-15 -> CR 17
**Signature:** library · **elapsed** 39s

**`[path]` and the lines that decided it**
```
[path] twist — Adult Red Dragon (is) — "Name field: Adult Red Dragon" (code)
[concept] resolve: archetype=dragon type=Dragon typeFrom=the route call themes=draconic/terror mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**The Spellcasting row, in full**
```
Spellcasting: The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 20, +12 to hit with spell attacks): - At will: Command, Detect Magic, Scorching Ray
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

Condition Immunities: 

blinded

Senses: 

blindsight 60 ft., darkvision 120 ft., passive Perception 23

Languages: 

Common, Draconic

Challenge

17 (18,000 XP)

Proficiency Bonus:

+6

Legendary Resistance (3/Day).If the dragon fails a saving throw, it can choose to succeed instead.
Sight Weakness.The dragon has disadvantage on Wisdom (Perception) checks that rely on sight.

Actions
Multiattack: The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray.
Rend: Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 13 (1d10 + 8) slashing damage plus 5 (2d4) fire damage.
Spellcasting: The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 20, +12 to hit with spell attacks): - At will: Command, Detect Magic, Scorching Ray
1/day each: Fireball
Lance-Scarred Flank: Each creature within 20 feet of the dragon must succeed on a DC 21 Wisdom saving throw or be frightened until the end of its next turn.
Fire Breath (Recharge 5-6): Each creature in a 60-foot cone must make a DC 21 Dexterity saving throw, taking 59 (17d6) fire damage on a failed save, or half as much damage on a successful one.
Legendary Actions

The dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The dragon regains spent legendary actions at the start of its turn.

Commanding Presence: The dragon uses Spellcasting to cast Command (level 2 version). The dragon can't take this action again until the start of its next turn.
Fiery Rays: The dragon uses Spellcasting to cast Scorching Ray. The dragon can't take this action again until the start of its next turn.
Pounce: The dragon moves up to half its Speed, and it makes one Rend attack.
```

---

## 16. Brass Tyrant — CR 17

**Input:** `a tyrant of burning brass who rules a city of forges`
**Donor:** brute-17-juggernaut -> CR 17
**Signature:** library · **elapsed** 31s

**`[path]` and the lines that decided it**
```
[path] homebrew — title tyrant — "a tyrant of burning brass who rules a city of forges" (call)
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=forged/elemental mind=sapient style=juggernaut energy=Fire mix=both identity=✓ lore=✓
[reskin] mind tier: INT 6 -> 10 — the call read this creature as ordinary at CR 17
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 17
[reskin] mind tier: CHA 4 -> 20 — the call read this creature as formidable at CR 17
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Piston Fist. Melee Attack Roll: +12, reach 10 ft. 19 (3d8 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.
```

```
Brass Tyrant

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
10
+0
+0
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
20
+5
+11
CHA
20
+5
+5

Skills Athletics +12, Perception +8

Immunities Fire, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 18

Languages Common

CR 17 (XP 18,000; PB +6)

Traits

Molten Vents. A creature that touches the tyrant or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Legendary Resistance (3/Day). If the tyrant fails a saving throw, it can choose to succeed instead.

Immutable Form. The tyrant can't shape-shift.

Siege Monster. The tyrant deals double damage to objects and structures.

Actions

Multiattack. The tyrant makes two Piston Fist attacks. It can replace one attack with a use of Molten Breach.

Piston Fist. Melee Attack Roll: +12, reach 10 ft. 19 (3d8 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.

Forge Gust (Recharge 5-6). Constitution Saving Throw: DC 19, each creature in a 60-foot Cone. Failure: 66 (12d10) Fire damage. Success: Half damage only.

Molten Breach. Dexterity Saving Throw: DC 19, one creature within 60 feet. Failure: The target is cursed until the end of the tyrant's next turn. The first time the cursed target deals damage to any creature before then, it takes 35 (10d6) Fire damage. Success: Half damage only.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Hammerfall. The tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Piston Fist attack.

Breach Wall. The tyrant moves up to half its Speed without provoking Opportunity Attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.

Quake Slam. Strength Saving Throw: DC 19, each creature within 10 feet of the tyrant. Failure: The target has the Prone condition.

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
**Signature:** library · **elapsed** 41s

**`[path]` and the lines that decided it**
```
[path] twist — Pit Fiend (is) — "Name field: Pit Fiend" (code)
[concept] resolve: archetype=defender type=Fiend typeFrom=the route call themes=fiendish/grave mind=sapient style=leader energy=Fire mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**Every attack row**
```
(no attack row)
```

```

```

---

## 18. Ossuar the Sun-Bound — CR 20

**Input:** `an archlich enthroned on a sun of bone`
**Donor:** caster-21 -> CR 20
**Signature:** library · **elapsed** 38s

**`[path]` and the lines that decided it**
```
[path] twist — Lich (is) — "archlich" (call)
[concept] resolve: archetype=caster type=Undead typeFrom=the route call themes=grave/arcane mind=sapient style=— energy=Necrotic mix=energy identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**The Spellcasting row, in full**
```
Spellcasting: Ossuar casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19): - At will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
```

**Every attack row**
```
(no attack row)
```

```
Ossuar the Sun-Bound
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

Throne of Last Light.Whenever a creature dies within Ossuar's reach, Ossuar regains 13 (3d8) hit points and the throne's light flares visibly.
Legendary Resistance (3/Day).If Ossuar fails a saving throw, it can choose to succeed instead.
Spirit Jar.If destroyed, Ossuar reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within Ossuar's lair.
Protective Magic (Reaction).Ossuar casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Ossuar makes three attacks, using Eldritch Burst or Paralyzing Touch.
Eldritch Burst: Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 31 (4d12 + 5) force damage.
Paralyzing Touch: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed until the start of Ossuar's next turn.
Spellcasting: Ossuar casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19): - At will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
2/day each: Animate Dead, Dimension Door, Plane Shift
1/day each: Chain Lightning, Finger of Death, Power Word Kill, Scrying
Umbral Burst (Recharge 5-6): Ossuar pins its shadow to the ground. One creature within 60 feet must make a DC 19 Strength saving throw, taking 24 (7d6) necrotic damage on a failed save, or half as much damage on a successful one.
Legendary Actions

Ossuar can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. Ossuar regains spent legendary actions at the start of its turn.

Deathly Teleport: Ossuar teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an Undead in a 20-foot radius originating from Ossuar must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one.
Frightening Gaze: Ossuar casts Fear, using the same spellcasting ability as Spellcasting. Ossuar can't take this action again until the start of its next turn.
```

---

## 19. Ancient Gold Dragon — CR 24  [TIMED OUT / no save]

**Input:** `name: Ancient Gold Dragon | `
**Donor:** —
**Signature:** — · **elapsed** 1230s

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: Ancient Gold Dragon
[path] exact — Ancient Gold Dragon (is) — "Ancient Gold Dragon" (code)
```

**Every attack row**
```
(no attack row)
```

```


Actions
```

---

## 20. Trench Leviathan — CR 24

**Input:** `a leviathan of the trench whose song drowns fleets`
**Donor:** brute-21 -> CR 24 (invented — no printed peer)
**Signature:** library · **elapsed** 35s

**`[path]` and the lines that decided it**
```
[concept] resolve: archetype=dragon type=Dragon typeFrom=the route call themes=none mind=? style=— energy=— mix=—
[path] homebrew — "a leviathan of the trench whose song drowns fleets" (call)
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=voice/aquatic mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[reskin] mind tier: INT 10 -> 15 — the call read this creature as capable at CR 24
[reskin] mind tier: WIS 14 -> 20 — the call read this creature as formidable at CR 24
[reskin] mind tier: CHA 14 -> 20 — the call read this creature as formidable at CR 24
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Battering Maw. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Piercing damage plus 14 (4d6) Thunder damage.
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

Abyssal Osmosis. At the start of each of its turns while fully submerged in water, the leviathan regains 19 (3d12) Hit Points unless it has taken Fire damage since the end of its last turn.

Legendary Resistance (3/Day). If the leviathan fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The leviathan makes two Battering Maw attacks. It can replace one attack with a use of Drowning Dirge Echo.

Battering Maw. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Piercing damage plus 14 (4d6) Thunder damage.

Shattering Roar (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Drowning Dirge Echo. Wisdom Saving Throw: DC 24, one creature within 60 feet. Failure: The target has the Frightened condition until the end of its next turn. If the target was already Frightened by this ability, it also takes 38 (11d6) Thunder damage.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the leviathan can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Brine Lash. The leviathan moves up to half its Speed without provoking Opportunity Attacks, and it makes one Battering Maw attack.

Deep Surge. Strength Saving Throw: DC 24, each creature within 10 feet of the leviathan. Failure: The target has the Prone condition.

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
**Signature:** dropped · **elapsed** 14s

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: Owlbear
[path] exact — Owlbear (is) — "Owlbear" (code)
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=bestial/grasping mind=sapient style=grappler energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the exact path takes no class kit
```

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

## 22. Goblin Boss — CR auto

**Input:** `name: Goblin Boss | `
**Donor:** skirmisher-1 -> CR 1
**Signature:** dropped · **elapsed** 21s

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: Goblin Boss
[path] exact — Goblin Boss (is) — "Goblin Boss" (code)
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=bestial/terror mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the exact path takes no class kit
```

**Every attack row**
```
(no attack row)
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
**Signature:** library · **elapsed** 32s

**`[path]` and the lines that decided it**
```
[path] class_npc — Hobgoblin Warrior (is) — class fighter — "warlord" (call)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/terror mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: guarded-stance yields — AC 19 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] class kit: fighter — "warlord": Riposte (riposte)
```

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

Never Breaks Ranks. While Vashka is not Grappled, Prone, or otherwise unable to move, Vashka cannot be forced to move from its space by any effect, and it ignores difficult terrain and any effect that would push, pull, or slide it.

Pack Tactics. Vashka has Advantage on an attack roll against a creature if at least one of Vashka's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. Vashka makes two attacks, using Longsword or Longbow in any combination.

Longsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Longbow. Ranged Attack Roll: +7, range 150/600 ft. 21 (5d6 + 4) Piercing damage.

Bonus Actions

Close The Line (2/Day). Each ally within 30 feet of Vashka gains 11 (2d10) Temporary Hit Points.

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

## 24. Carrion Scythe — CR 9

**Input:** `A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.`
**Donor:** brute-8-grappler -> CR 9
**Signature:** library · **elapsed** 33s

**`[path]` and the lines that decided it**
```
[path] homebrew — "A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell t" (call)
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=bestial/venomous mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 9
[reskin] mind tier: CHA 6 -> 10 — the call read this creature as ordinary at CR 9
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 17 (3d8 + 4) Piercing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).
```

```
Carrion Scythe

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

Caustic Shell. A creature that grapples the carrion scythe or is Grappled by it takes 7 (2d6) Acid damage.

Actions

Multiattack. The carrion scythe makes two Spitting Maw attacks. It can replace one attack with a use of Shearing Rake.

Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 17 (3d8 + 4) Piercing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).

Shearing Rake. Strength Saving Throw: DC 15, each creature in a 30-foot Cone. Failure: The target has the Prone condition.

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

## 25. Blackiron Warden — CR 11

**Input:** `a sentinel of black iron, AC 20, Huge, speed 20 feet`
**Donor:** defender-7-warden -> CR 11
**Signature:** library · **elapsed** 34s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a sentinel of black iron, AC 20, Huge, speed 20 feet" (call)
[concept] resolve: archetype=defender type=Construct typeFrom=the route call themes=forged/armed mind=sapient style=warden energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier: INT 7 -> 15 — the call read this creature as capable at CR 11
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 11
[reskin] mind tier: CHA 3 -> 10 — the call read this creature as ordinary at CR 11
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
(no attack row)
```

```
Blackiron Warden
Huge construct, neutral
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

	

15 (+2)

	

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

Ward Bond.The warden is magically bound to a ward of its choosing, and it can have only one ward at a time. While the warden is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the warden.
Regeneration.The warden regains 10 hit points at the start of each of its turns if it has at least 1 Hit Point.
Interpose (Reaction).When a creature within 5 feet of the warden that it guards is hit by an attack roll, the attack hits the warden instead, and the warden has Resistance to the attack's damage.

Actions
Multiattack: The warden makes two Gauntlet attacks.
Gauntlet: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage.
Shellward (2/Day): The warden targets itself or one creature it can see within 60 feet. The target gains 24 (7d6) temporary hit points, and it gains a +2 bonus to AC until the end of the warden's next turn.
Trample (Recharge 5-6): The warden moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters must make a DC 17 Dexterity saving throw, taking 24 (7d6) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is knocked prone.
```

---

## 26. Maren of the Drowned Shrine — CR auto

**Input:** `a marsh witch who curses trespassers, cr 7`
**Donor:** caster-8-binder -> CR 7
**Signature:** library · **elapsed** 33s

**`[path]` and the lines that decided it**
```
[path] class_npc — class mage — "witch" (call)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=uncanny/arcane mind=sapient style=binder energy=Necrotic mix=energy identity=✓ lore=✓
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
```

**The Spellcasting row, in full**
```
Spellcasting. Maren casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly
```

**Every attack row**
```
Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.
```

```
Maren of the Drowned Shrine

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

Languages Common and any three languages

CR 7 (XP 2,900; PB +3)

Traits

Bound. Maren is bound to the cursed creature's blighted trail. It can't willingly move more than 120 feet from the cursed creature's blighted trail, and it always knows the direction and distance to the cursed creature's blighted trail.

Actions

Multiattack. Maren makes three Arcane Burst attacks. It can replace one attack with a use of Marsh Burst.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Maren casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Marsh Burst. Dexterity Saving Throw: DC 14, one creature within 60 feet. Failure: 19 (3d12) Bludgeoning damage.

Bonus Actions

Misty Step (3/Day). Maren casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Maren casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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

## 27. Offert the Unanswered — CR 6

**Input:** `a templar priest with a mace and no magic at all`
**Donor:** defender-5 -> CR 6
**Signature:** library · **elapsed** 25s

**`[path]` and the lines that decided it**
```
[path] class_npc — class paladin — "templar" (call)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
```

**Every attack row**
```
Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Offert's next turn.
```

```
Offert the Unanswered

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

Aura of Authority. While in a 10-foot Emanation originating from Offert, Offert and its allies have Advantage on attack rolls and saving throws, provided Offert doesn't have the Incapacitated condition.

Actions

Multiattack. Offert makes three Mace attacks. It can replace one attack with a use of Shield Bash.

Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Offert's next turn.

Shield Slam. Strength Saving Throw: DC 15, one creature within 5 feet. Failure: The target is pushed up to 15 feet away from Offert and has the Prone condition.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Offert can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Parry. Trigger: Offert is hit by a melee attack roll while holding a weapon. Response: Offert adds 3 to its AC against that attack, possibly causing it to miss.

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
**Signature:** library · **elapsed** 42s

**`[path]` and the lines that decided it**
```
[path] class_npc — class mage — "archmage" (call)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/uncanny mind=sapient style=— energy=Necrotic mix=energy identity=✓ lore=✓
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "archmage": Misty Step (3/Day) (Mage/Misty Step)
```

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

Common plus five other languages, Elvish, Deep Speech

Challenge

12 (8,400 XP)

Proficiency Bonus:

+4

Dusksong Mire.While a creature is within 5 feet of Ilvareth, the area within 5 feet of it is difficult terrain for other creatures, and a creature there cannot take reactions.
Magic Resistance.Ilvareth has advantage on saving throws against spells and other magical effects.
Misty Step (3/Day) (Bonus Action).Ilvareth casts Misty Step, using the same spellcasting ability as Spellcasting.
Blink Step (Recharge 4-6) (Bonus Action).Ilvareth teleports up to 60 feet to an unoccupied space it can see.
Protective Magic (3/Day) (Reaction).When Ilvareth is hit by an attack roll, Ilvareth casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Ilvareth makes four Arcane Burst attacks.
Spellcasting: Ilvareth casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17): - At will: Detect Magic, Detect Thoughts, Disguise Self, Invisibility, Light, Mage Armor, Mage Hand, Prestidigitation
2/day each: Fly, Lightning Bolt
1/day each: Cone of Cold, Mind Blank, Scrying, Teleport
Arcane Burst: Melee or Ranged Spell Attack: +9 to hit, reach 5 ft. or range 150 ft., one target. Hit: 27 (4d10 + 5) force damage.
```

---

## 29. Swarm of Funeral Bells — CR 13

**Input:** `a swarm of funeral bells that ring themselves over the dying`
**Donor:** swarm-9 -> CR 13 (invented — no printed peer)
**Signature:** dropped · **elapsed** 37s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a swarm of funeral bells that ring themselves over the dying" (call)
[concept] resolve: archetype=swarm type=Construct typeFrom=the route call themes=grave/forged mind=mindless style=— energy=Necrotic mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as mindless, and the card's 4 is already that dim
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 13
[reskin] mind tier: CHA 2 -> 15 — the call read this creature as capable at CR 13
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Iron Bell. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.
```

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

Blood Frenzy. The swarm has Advantage on attack rolls against any creature that doesn't have all its Hit Points.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Multiattack. The swarm makes two Iron Bell attacks.

Iron Bell. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.

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

## 30. Sacristy Tide — CR 9

**Input:** `a cathedral-vault ooze that digests reliquaries`
**Donor:** ooze-9 -> CR 9 (invented — no printed peer)
**Signature:** library · **elapsed** 30s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a cathedral-vault ooze that digests reliquaries" (call)
[concept] resolve: archetype=ooze type=Ooze typeFrom=the route call themes=none mind=? style=— energy=— mix=— identity=✓
[reskin] mind tier held: INT stays 2 against "feeble" — the card's 2 is already feeble
[reskin] mind tier held: CHA stays 1 against "feeble" — the card's 1 is already feeble
[reskin] mind tier: WIS 8 -> 15 — the call read this creature as capable at CR 9
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
(no attack row)
```

```
Sacristy Tide
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

Processional Advance.The tide ignores difficult terrain made of rubble, pews, or other church furnishings.
Amorphous.The tide can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form.A creature that touches the tide or hits it with a melee attack while within 5 feet of it takes 9 (2d8) acid damage.
Spider Climb.The tide can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The tide makes two Pseudopod attacks. It can replace one attack with a use of Crushing Roll.
Pseudopod: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 27 (7d6 + 3) acid damage.
Crushing Roll: One creature within 5 feet of the tide must make a DC 15 Dexterity saving throw, taking 28 (8d6) bludgeoning damage on a failed save.
```

---

## 31. Cumulonimbus Drake — CR 7

**Input:** `a young storm drake whose breath is a rolling wall of thunder`
**Donor:** dragon-2 -> CR 7
**Signature:** library · **elapsed** 28s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a young storm drake whose breath is a rolling wall of thunder" (call)
[concept] resolve: archetype=dragon type=Dragon typeFrom=the route call themes=draconic/breath mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 12 against "ordinary" — the card's 12 is already ordinary
[reskin] mind tier held: CHA stays 14 against "capable" — the card's 14 is already capable
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 7
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] name follows content: Actions/"Ground-Swelling Thunder" carries Thunder the row never deals — "Ground-Swelling Shove" (the element word drops; the call's own noun stays)
[reskin] multiattack re-read — "Ground-Swelling Thunder" left; "Multiattack" now reads "The drake makes two Claw attacks."
```

**Every attack row**
```
Claw. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Slashing damage.
```

```
Cumulonimbus Drake

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
14
+2
+2

Skills Perception +5, Stealth +4

Immunities Thunder

Senses blindsight 30 ft., darkvision 120 ft.; Passive Perception 15

Languages Draconic

CR 7 (XP 2,900; PB +3)

Actions

Multiattack. The drake makes two Claw attacks.

Claw. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Slashing damage.

Thunder Burst (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

Buffeting Shove. Strength Saving Throw: DC 15, each creature in a 30-foot-long, 5-foot-wide Line. Failure: The target is pushed up to 10 feet straight away from the drake, and the target has the Prone condition.

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

## 32. Hearthless Mordag — CR 9

**Input:** `a stone giant exile who speaks only Giant and understands no Common`
**Donor:** brute-9 -> CR 9
**Signature:** library · **elapsed** 35s

**`[path]` and the lines that decided it**
```
[path] twist — Stone Giant (is) — "stone giant" (call)
[concept] resolve: archetype=brute type=Giant typeFrom=the route call themes=bestial/terror mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**Every attack row**
```
(no attack row)
```

```
Hearthless Mordag
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

Stone-Hard Pin.While Mordag is standing and has a creature grappled, that creature is restrained, and Mordag has advantage on attack rolls against it.
Deflect Missile (Recharge 5-6) (Reaction).When Mordag is hit by a ranged attack roll and takes Bludgeoning, Piercing, or slashing damage from it, Mordag reduces the damage it takes from the attack by 11 (1d10 + 6), and if that damage is reduced to 0, Mordag can redirect some of the attack's force. One creature Mordag can see within 60 feet must make a DC 18 Dexterity saving throw, taking 11 (1d10 + 6) force damage on a failed save.

Actions
Multiattack: Mordag makes two attacks: one with Stone Club and one with Boulder.
Stone Club: Melee Weapon Attack: +10 to hit, reach 15 ft., one target. Hit: 30 (7d6 + 6) bludgeoning damage.
Boulder: Ranged Weapon Attack: +10 to hit, range 60/240 ft., one target. Hit: 24 (4d8 + 6) bludgeoning damage. If the target is a Large or smaller creature, it is restrained until the end of Mordag's next turn. This effect can be applied only once per turn.
```

---

## 33. Marsh Grip Adept — CR 5

**Input:** `lizardfolk monk`
**Donor:** brute-5 -> CR 5
**Signature:** library · **elapsed** 34s

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: lizardfolk monk — A lizardfolk monk opens by closing distance in a low, weaving stalk, then spends every round locking a limb and trading reach for leverage — tail-whips to unbalance, claw-hand joint locks, and a bite saved for when the hold is sure. Patient and disciplined rather than savage, it fi
[concept] expansion answered: type=Humanoid (type_source=inferred) material=hide size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: grapple
[path] class_npc — class monk — species lizardfolk — "monk" (call)
[concept] resolve: archetype=brute type=Humanoid typeFrom=the route call themes=bestial/armed mind=sapient style=grappler energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: patient-defense — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Claw)
[reskin] class weapon: Actions/"Shortsword" -> "Unarmed Strike" — a monk fights with its hands, not the Spy's; the body's rider folds in (+7)
[reskin] class weapon: "Dart" rolls Dexterity — a launcher is DEX in print: +6 -> +5
[reskin] class weapon: Actions/"Hand Crossbow" -> "Dart" — a monk fights with a dart, not the Spy's
```

**Every attack row**
```
(no attack row)
```

```
Marsh Grip Adept
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

Hold Breath.The grip adept can hold its breath for 15 minutes.

Actions
Multiattack: The grip adept makes two attacks: one with its Unarmed Strike and one with its Dart. It can replace one attack with a use of Wrist Lock.
Unarmed Strike: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage. Once on each of the grip adept's turns when it hits with this attack, the target is subjected to the following effect. The target must make a DC 14 Constitution saving throw. On a failed save, the target is stunned until the end of the grip adept's next turn.
Dart: Ranged Weapon Attack: +5 to hit, range 20/60 ft., one target. Hit: 12 (3d6 + 2) piercing damage.
Wrist Lock: One creature within 10 feet must succeed on a DC 14 Strength saving throw or be grappled (escape DC 14).
```

---

## 34. Krennik Skullstandard — CR 4

**Input:** `name: Krennik Skullstandard | riding a worg`
**Donor:** skirmisher-3-mounted -> CR 4 (invented — no printed peer)
**Signature:** library · **elapsed** 32s

**`[path]` and the lines that decided it**
```
[path] homebrew — "riding a worg" (call)
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=terror/armed mind=sapient style=mounted energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 8 against "ordinary" — the card's 8 is already ordinary
[reskin] mind tier held: CHA stays 8 against "ordinary" — the card's 8 is already ordinary
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 4
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
(no attack row)
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

War-Road Sprint.Krennik ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Mounted Agility (Bonus Action).Krennik takes the Dash or Disengage action.

Actions
Multiattack: Krennik makes two Bearded Axe-Hurl attacks. It can replace one attack with a use of Skull Standard Shriek.
Bearded Axe: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) slashing damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is prone.
Axe-Hurl: Ranged Weapon Attack: +5 to hit, range 20/60 ft., one target. Hit: 6 (1d6 + 3) slashing damage.
Wheeling Gallop (Recharge 5-6): Krennik moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Each creature whose space it enters must make a DC 13 Dexterity saving throw, taking 24 (7d6) bludgeoning damage on a failed save. On a failed save, the target is also prone.
Skull Standard Shriek: Each creature of Krennik's choice in a 30-foot radius originating from Krennik that can see or hear it must make a DC 13 Wisdom saving throw. On a failed save, the target is frightened until the start of Krennik's next turn. On a successful save, the target is immune to this creature's terror for 24 hours.
```

---

## 35. Well Drowned Thing — CR 5

**Input:** `name: the thing in the well | `
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 34s

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: the thing in the well — The thing in the well opens with patience — a fine tendril of slick brine striking from below at any limb come to draw water, dragging the victim down into the flooded shaft. Once prey is grappled it coils and drowns, crushing and irrigating in the dark while it shapes the wa
[concept] expansion answered: type=Aberration (type_source=inferred) material=brine size=Large mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: grapple
[path] homebrew — "the thing in the well" (call)
[concept] resolve: archetype=brute type=Aberration typeFrom=the route call themes=aquatic/terror mind=sapient style=grappler energy=Cold mix=both identity=✓ lore=✓
[reskin] mind tier: INT 4 -> 15 — the call read this creature as capable at CR 5
[reskin] mind tier: WIS 10 -> 18 — the call read this creature as formidable at CR 5
[reskin] mind tier: CHA 4 -> 10 — the call read this creature as ordinary at CR 5
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Brine Tendril. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.
```

```
Well Drowned Thing

Medium Aberration, Neutral Evil

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
10
+0
+0

Skills Athletics +6, Perception +7

Immunities Cold

Senses darkvision 60 ft.; Passive Perception 17

Languages Common

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The drowned thing makes two Brine Tendril attacks.

Brine Tendril. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Reactions

Gout of Brine and Silt. Trigger: The drowned thing is Grappled by a creature or struck by a creature while in the water. Response: The drowned thing exhales brine and silt into that creature's mouth and lungs; the creature must succeed on a DC 13 Constitution saving throw or have the Poisoned condition until the end of its next turn, its throat scoured salt-blind and unable to call for help.

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

## 36. Frigid Sapspider — CR 4

**Input:** ` | role: brute`
**Donor:** brute-5-grappler -> CR 4
**Signature:** library · **elapsed** 35s

**`[path]` and the lines that decided it**
```
[path] blank — "role: brute" (code)
[reskin] mind tier: INT 4 -> 15 — the call read this creature as capable at CR 4
[reskin] mind tier: WIS 10 -> 18 — the call read this creature as formidable at CR 4
[reskin] mind tier: CHA 4 -> 10 — the call read this creature as ordinary at CR 4
[reskin] class kit: none — the blank path takes no class kit
```

**Every attack row**
```
Thorn Limb. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 6 (1d12) Poison damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.
```

```
Frigid Sapspider

Large Plant, Neutral Evil

AC 14
Initiative -1 (9)

HP 85 (10d10 + 30)

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
10
+0
+0

Skills Athletics +6, Perception +6

Senses Passive Perception 16

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Barbed Grasp. A creature that grapples the sapspider or is Grappled by it has the Poisoned condition until the end of its next turn.

Actions

Multiattack. The sapspider makes two Thorn Limb attacks. It can replace one attack with a use of Barbed Cord.

Thorn Limb. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 6 (1d12) Poison damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Barbed Cord. Strength Saving Throw: DC 13, one creature within 30 feet. Failure: The target is pulled up to 20 feet straight toward the sapspider by barbed thorn and has the Grappled condition (escape DC 14).

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
**Signature:** library · **elapsed** 34s

**`[path]` and the lines that decided it**
```
[path] class_npc — class barbarian — species lizardfolk — "barbarian" (call)
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=bestial/terror mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: rampage — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: barbarian — "barbarian": Bloodied Frenzy (Berserker/Bloodied Frenzy)
[reskin] class weapon: Actions/"Shield Bash" leaves with the shield — a greataxe is two-handed and print pairs a shield with no heavy melee weapon (0 of 329 gear lines)
```

**Every attack row**
```
(no attack row)
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

## 38. Oathbound Revenant — CR 6

**Input:** `a skeleton with a greatsword`
**Donor:** brute-5 -> CR 6
**Signature:** library · **elapsed** 28s

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a skeleton with a greatsword
[path] twist — Skeleton (is) — "skeleton" (call)
[concept] resolve: archetype=brute type=Undead typeFrom=the route call themes=grave/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
[reskin] multiattack re-read — "Hurled Debris" joins the combination; "The revenant makes two attacks, using Greatsword or Hurled Debris in any combination. It c"
```

**Every attack row**
```
Greatsword. Melee Attack Roll: +7, reach 5 ft. 21 (5d6 + 4) Slashing damage.
Hurled Debris. Ranged Attack Roll: +7, range 60/240 ft. 18 (4d6 + 4) Slashing damage.
```

```
Oathbound Revenant

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

Great Weapon Master. When the revenant hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The revenant makes two attacks, using Greatsword or Hurled Debris in any combination. It can replace one attack with a use of Grinding Arc.

Greatsword. Melee Attack Roll: +7, reach 5 ft. 21 (5d6 + 4) Slashing damage.

Hurled Debris. Ranged Attack Roll: +7, range 60/240 ft. 18 (4d6 + 4) Slashing damage.

Grinding Arc. Dexterity Saving Throw: DC 14, each creature in a 15-foot Cone. Failure: 28 (8d6) Slashing damage, and the target has the Prone condition. Success: Half damage only.

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

## 39. Garsk the Hired Hand — CR 5

**Input:** `a sellsword who hurls a handaxe and closes with a shortsword`
**Donor:** skirmisher-8-hurler -> CR 5 (invented — no printed peer)
**Signature:** dropped · **elapsed** 35s

**`[path]` and the lines that decided it**
```
[path] class_npc — class fighter — "sellsword" (call)
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: fighter — "sellsword": Riposte (riposte)
```

**Every attack row**
```
(no attack row)
```

```
Garsk the Hired Hand
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

Riposte (Reaction).When a creature within 5 feet of Garsk misses it with a melee attack roll, Garsk makes one Handaxe attack against that creature.
Parry (Reaction).When Garsk is hit by a melee attack roll while holding a weapon, Garsk adds 3 to its AC against that attack, possibly causing it to miss.

Actions
Multiattack: Garsk makes three Handaxe attacks. It can replace one attack with a use of Shortsword.
Handaxe: Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) slashing damage, and Garsk has advantage on its next attack roll against the target before the end of its next turn.
Shortsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage. Immediately after the attack, its handaxe returns to Garsk's grasp, and Garsk has advantage on its next attack roll against the target before the end of its next turn.
Shield Bash: One creature within 5 feet that Garsk can see must make a DC 15 Strength saving throw, taking 9 (2d4 + 4) bludgeoning damage on a failed save. On a failed save, if the target is a Medium or smaller creature, it is knocked prone.
```

---

## 40. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** skirmisher-3 -> CR 3
**Signature:** library · **elapsed** 33s

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Brother Halric — Brother Halric opens by naming the trespasser's sins aloud in a mild, reasonable voice, and the words themselves are the trap — those who answer him find their own confessions coiling around their limbs like rope. Every round after he keeps his distance and tightens the snare, quoti
[concept] expansion answered: type=Undead (type_source=inferred) material=grave size=Medium mind=sapient
[concept] expansion attack mode: ranged
[concept] expansion signature: snare
[path] class_npc — class cleric — "Brother" (call)
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=grave/voice mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Brother": nothing to add — the sheet already answers it
```

**The Spellcasting row, in full**
```
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
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

Divine Aid (3/Day) (Bonus Action).Halric casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame. It can replace one attack with a use of Naming of Sin.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Naming of Sin: One creature within 60 feet must make a DC 13 Wisdom saving throw. On a failed save, the target is frightened until the end of its next turn.
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
```


# Batch 6 — bare names, BEFORE the patch (the leak's evidence)

Kept because fix A leaked here and these are the sheets that show it. Sister Ilse is Humanoid by
fix A; **Old Marga read `Medium Fey` on this run and `Medium Plant` on the next**, which is what
makes blocker 2 a pattern rather than one roll.

`smoke-out/bare-names-2026-11-16T00-26-32`

---

## 01. Captain Vane — CR 4

**Input:** `name: Captain Vane | `
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 34s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Captain Vane — Captain Vane is a grizzled freebooter who opens every fight with a shouted challenge and a hurled boarding axe, then closes to press the wounded and the hesitant while his crew's steel does the rest. Each round he reads the field, repositions to keep a victim between himself and the n
[concept] expansion answered: type=Undead (type_source=inferred) material=brine size=Medium mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: thrown-weapon
[path] class_npc — class fighter — "Captain" (call)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=grave/aquatic mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: fighter — "Captain": Riposte (riposte)
[reskin] class weapon: Actions/"Javelin" -> "Longsword" — a fighter fights with a longsword, not the Guard Captain's
```

**Every attack row**
```
Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.
Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.
```

```
Captain Vane

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

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
14
+2
+2
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
13
+1
+1

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. Vane makes two Longsword attacks. It can replace one attack with a use of Drowned Challenge.

Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

Drowned Challenge. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: 14 (4d6) Psychic damage, and the target has the Frightened condition until the end of its next turn.

Reactions

Riposte. Trigger: A creature within 5 feet of Vane misses it with a melee attack roll. Response: Vane makes one Longsword attack against that creature.

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

## 02. Sister Ilse — CR 2

**Input:** `name: Sister Ilse | `
**Donor:** defender-1 -> CR 2
**Signature:** library · **elapsed** 30s

**Type line:** `Medium Humanoid, Neutral` — **set by** unset

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Sister Ilse — Sister Ilse does not ambush from the dark — she steps into the road, lantern-soft and smiling, and asks the party to confess before she will let them pass; every round after, she pins the nearest soul with a question it cannot help answering, peeling secrets and strength away in the sa
[concept] expansion answered: type=Undead (type_source=inferred) material=shadow size=Medium mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: gaze
[path] class_npc — class cleric — "Sister" (call)
[concept] type settled: Undead -> Humanoid — the words are a name and the class word and nothing else, and a person with a class and no named body is a Humanoid (owner's ruling, 2026-11-15); the route call had answered Undead
[concept] resolve: archetype=defender type=Humanoid typeFrom=fix A (a bare name with a class) themes=grave/voice mind=sapient style=leader energy=Psychic mix=both identity=✓ lore=✓
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Sister": nothing to add — the sheet already answers it
[reskin] multiattack re-read — "Lantern-Soft Confession" left; "Multiattack" now reads "Sister Ilse makes two attacks, using Mace or Radiant Flame in any combination."
```

**The Spellcasting row, in full**
```
Spellcasting. Sister Ilse casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):
- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians
```

**Every attack row**
```
Mace. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.
Radiant Flame. Ranged Attack Roll: +5, range 60 ft. 11 (2d10) Radiant damage.
```

```
Sister Ilse

Medium Humanoid, Neutral

AC 13
Initiative +0 (10)

HP 38 (7d8 + 7)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
13
+1
+1
MOD
SAVE
DEX
10
+0
+0
WIS
16
+3
+3
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

Skills Medicine +7, Perception +5, Religion +5

Senses Passive Perception 15

Languages Common plus one other language

CR 2 (XP 450; PB +2)

Traits

Stitched Shadow. As a Bonus Action, Sister Ilse moves her detached shadow up to 30 feet across any surface within 120 feet of her, and she perceives and hears through it as if standing in its place.

Actions

Multiattack. Sister Ilse makes two attacks, using Mace or Radiant Flame in any combination.

Mace. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.

Radiant Flame. Ranged Attack Roll: +5, range 60 ft. 11 (2d10) Radiant damage.

Spellcasting. Sister Ilse casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Bonus Actions

Divine Aid (3/Day). Sister Ilse casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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

## 03. Old Marga — CR 1

**Input:** `name: Old Marga | `
**Donor:** skirmisher-1 -> CR 1
**Signature:** library · **elapsed** 31s

**Type line:** `Medium Fey, Neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Old Marga — Old Marga is a hunched, bog-soaked fey crone who burrows up through the mire beneath a traveler's feet and fights to entangle, not to kill quickly — every round she drags one winding, sodden root-limb across the ground to snare ankles and drag prey down into the water. She toys with what
[concept] expansion answered: type=Fey (type_source=inferred) material=brine size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: snare
[path] class_npc — "Old Marga" (call)
[concept] resolve: archetype=skirmisher type=Fey typeFrom=the route call themes=beguiling/grasping mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the class_npc path takes no class kit
[reskin] multiattack re-read — "Mire Snare" left; "Multiattack" now reads "Marga makes two attacks, using Shortsword or Hand Crossbow in any combination."
```

**Every attack row**
```
Shortsword. Melee Attack Roll: +4, reach 5 ft. 5 (1d6 + 2) Piercing damage plus 7 (2d6) Poison damage.
Hand Crossbow. Ranged Attack Roll: +4, range 30/120 ft. 5 (1d6 + 2) Piercing damage.
```

```
Old Marga

Medium Fey, Neutral

AC 12
Initiative +2 (12)

HP 27 (6d8)

Speed 30 ft., Climb 30 ft.

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
15
+2
+2
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

Skills Deception +5, Insight +4, Investigation +5, Perception +6, Sleight of hand +4, Stealth +6

Senses darkvision 60 ft.; Passive Perception 16

Languages Common plus one other language

CR 1 (XP 200; PB +2)

Traits

Drowned Ground. When Marga moves, the ground along a continuous 10-foot-wide band of Marga's path becomes Difficult Terrain for the creatures she chooses at that moment until the start of her next turn.

Actions

Multiattack. Marga makes two attacks, using Shortsword or Hand Crossbow in any combination.

Shortsword. Melee Attack Roll: +4, reach 5 ft. 5 (1d6 + 2) Piercing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +4, range 30/120 ft. 5 (1d6 + 2) Piercing damage.

Bonus Actions

Cunning Action. Marga takes the Dash, Disengage, or Hide action.

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

## 04. Tolling Friar — CR 3

**Input:** `clockwork friar`
**Donor:** brute-2 -> CR 3
**Signature:** dropped · **elapsed** 31s

**Type line:** `Medium Construct, Neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: clockwork friar — The clockwork friar trundles forward on its iron-shod feet, one arm swinging a heavy censer trailing scalding, alchemical incense-smoke — its opening move is to fill the corridor with acrid fog and force the fight to happen inside it. Every round after that it circles through its o
[concept] expansion answered: type=? (type_source=?) material=— size=— mind=—
[concept] expansion attack mode: —
[concept] expansion signature: —
[path] class_npc — class cleric — "friar" (call)
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=none mind=? style=charger energy=— mix=— identity=✓
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "friar": nothing to add — the sheet already answers it
```

**The Spellcasting row, in full**
```
Spellcasting. The friar casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):
- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians
```

**Every attack row**
```
Mace. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.
Radiant Flame. Ranged Attack Roll: +5, range 60 ft. 11 (2d10) Radiant damage.
```

```
Tolling Friar

Medium Construct, Neutral

AC 13
Initiative +0 (10)

HP 38 (7d8 + 7)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
13
+1
+1
MOD
SAVE
DEX
10
+0
+0
WIS
16
+3
+3
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

Skills Medicine +7, Perception +5, Religion +5

Resistances Fire

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Common plus one other language

CR 3 (XP 700; PB +2)

Traits

Overwound Tally. At the start of each of its turns, and again whenever it is bloodied, the friar advances one notch on its tally; when the tally fills, it can make one extra Mace attack this turn; while bloodied, it instead hurls its censer at the nearest foe within 30 feet, dealing 13 (3d8) Fire damage on a failed DC 13 Dexterity save, and its tally counts two notches each turn.

Actions

Multiattack. The friar makes two attacks, using Mace or Radiant Flame in any combination.

Mace. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.

Radiant Flame. Ranged Attack Roll: +5, range 60 ft. 11 (2d10) Radiant damage.

Spellcasting. The friar casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Bonus Actions

Divine Aid (3/Day). The friar casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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

## 05. Graveless Rite — CR 3

**Input:** `an undead priest`
**Donor:** caster-6 -> CR 3
**Signature:** library · **elapsed** 31s

**Type line:** `Medium Undead, Neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: an undead priest — It opens by reciting a funeral rite over the living, its grave-cold voice settling on the nearest foe like a shroud while grave-dirt pools in its empty sleeves. Every round after that it wades in among the wounded, striking with a mace-hardened fist of packed grave-soil and draggi
[concept] expansion answered: type=Undead (type_source=user) material=grave size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: aura
[path] class_npc — class cleric — "priest" (call)
[concept] resolve: archetype=caster type=Undead typeFrom=the route call themes=grave/voice mind=sapient style=warpriest energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: cleric — "priest": Divine Aid (3/Day) (Priest/Divine Aid)
```

**The Spellcasting row, in full**
```
Spellcasting. The rite casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):
- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians
```

**Every attack row**
```
Radiant Flame. Ranged Attack Roll: +5, range 60 ft. 11 (2d10) Radiant damage.
Mace. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.
```

```
Graveless Rite

Medium Undead, Neutral

AC 13
Initiative +0 (10)

HP 38 (7d8 + 7)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
13
+1
+1
MOD
SAVE
DEX
10
+0
+0
WIS
16
+3
+3
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

Skills Medicine +7, Perception +5, Religion +5

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Common plus one other language

CR 3 (XP 700; PB +2)

Actions

Multiattack. The rite makes two attacks, using Mace or Radiant Flame in any combination. It can replace one attack with a use of Burial Psalm.

Spellcasting. The rite casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Burial Psalm. Dexterity Saving Throw: DC 13, one creature within 60 feet. Failure: 13 (3d8) Necrotic damage.

Radiant Flame. Ranged Attack Roll: +5, range 60 ft. 11 (2d10) Radiant damage.

Mace. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.

Bonus Actions

Divine Aid (3/Day). The rite casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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

## 06. Mirrow Fenwife — CR 5

**Input:** `a marsh witch who curses trespassers`
**Donor:** caster-8-binder -> CR 5
**Signature:** library · **elapsed** 31s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[path] class_npc — class mage — "witch" (call)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=beguiling/aquatic mind=sapient style=binder energy=Poison mix=both identity=✓ lore=✓
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
```

**The Spellcasting row, in full**
```
Spellcasting. Mirrow casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly
```

**Every attack row**
```
Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.
```

```
Mirrow Fenwife

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

Languages Common and any three languages

CR 5 (XP 1,800; PB +3)

Traits

Marsh Witch. Difficult Terrain composed of mud, mire, and standing water doesn't cost Mirrow extra movement, and Mirrow can move across mud, mire, and standing water without needing to make an ability check.

Actions

Multiattack. Mirrow makes three Arcane Burst attacks. It can replace one attack with a use of Bog Oath.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Mirrow casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bog Oath. Strength Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Restrained condition until the end of its next turn.

Bonus Actions

Misty Step (3/Day). Mirrow casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Mirrow casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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


# Batch 7 — Brother Halric ×5, BEFORE the patch (the leak's evidence)

Roll 03 read `Medium undead`. The trace line that explains it is
`[concept] expansion answered: type=Humanoid (type_source=user)` — the call claiming the GM's
words named the type, for a bare name. The first version of fix A honoured that claim and stood
down, so the route's Undead shipped. Trace 1 is why that line exists to read.

`smoke-out/halric5-2026-11-16T00-29-41`

---

## 01. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** brute-2 -> CR 3
**Signature:** library · **elapsed** 31s

**Type line:** `Medium humanoid, neutral` — **set by** unset

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Brother Halric — Brother Halric fights like the thing he became: he opens by hurling a broken shard of his own iron-swollen flesh, then wades in to clinch and crush whatever it lodges in, using the nails of his broken coffin as a maul. He is patient and methodical, born of grave-iron and slow rust,
[concept] expansion answered: type=Construct (type_source=inferred) material=iron size=Medium mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: thrown-weapon
[path] class_npc — class cleric — "Brother" (call)
[concept] type settled: Monstrosity -> Humanoid — the words are a name and the class word and nothing else, and a person with a class and no named body is a Humanoid (owner's ruling, 2026-11-15); the route call had answered Monstrosity
[concept] resolve: archetype=brute type=Humanoid typeFrom=fix A (a bare name with a class) themes=forged/grave mind=sapient style=grappler energy=Poison mix=both identity=✓ lore=✓
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Brother": nothing to add — the sheet already answers it
```

**The Spellcasting row, in full**
```
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
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

Divine Aid (3/Day) (Bonus Action).Halric casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame. It can replace one attack with a use of Coffin-Nail Grip.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
Coffin-Nail Grip: One creature within 5 feet of Halric must succeed on a DC 13 Strength saving throw or be grappled (escape DC 13).
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
```

---

## 02. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** caster-6 -> CR 3
**Signature:** library · **elapsed** 28s

**Type line:** `Medium humanoid, neutral` — **set by** unset

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Brother Halric — Brother Halric opens with a low, droning catechism that gnaws at the will of anyone in earshot, then presses in with a burning censer swung like a war-flail. Every round he keeps a wounded foe in reach of his contempt, using his censer's scalding smoke to herd and isolate the weakes
[concept] expansion answered: type=Undead (type_source=inferred) material=ash size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: aura
[path] class_npc — class cleric — "Brother" (call)
[concept] type settled: Undead -> Humanoid — the words are a name and the class word and nothing else, and a person with a class and no named body is a Humanoid (owner's ruling, 2026-11-15); the route call had answered Undead
[concept] resolve: archetype=caster type=Humanoid typeFrom=fix A (a bare name with a class) themes=grave/terror mind=sapient style=warpriest energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: cleric — "Brother": Divine Aid (3/Day) (Priest/Divine Aid)
```

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
Multiattack: Brother Halric makes two attacks: one with Mace and one with Radiant Flame. It can replace one attack with a use of Droning Catechism.
Spellcasting: Brother Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
Droning Catechism: One creature within 60 feet must make a DC 13 Wisdom saving throw, taking 13 (3d8) psychic damage on a failed save. On a failed save, the target is charmed until the end of its next turn.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
```

---

## 03. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** defender-3 -> CR 3
**Signature:** library · **elapsed** 29s

**Type line:** `Medium undead, neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Brother Halric — Brother Halric opens with a warm, welcoming sermon that pulls listeners into his wake, and every round after he uses the crowd's devotion as a shield and a weapon — stepping forward to shelter an ally and laying a curse of nagging guilt on whoever strikes him. He is patient and self
[concept] expansion answered: type=Humanoid (type_source=user) material=ash size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: aura
[path] class_npc — class cleric — "Brother" (call)
[concept] resolve: archetype=defender type=Undead typeFrom=the route call themes=voice/grave mind=sapient style=leader energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Brother": nothing to add — the sheet already answers it
```

**The Spellcasting row, in full**
```
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
```

**Every attack row**
```
(no attack row)
```

```
Brother Halric
Medium undead, neutral
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

exhaustion, poisoned

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
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame. It can replace one attack with a use of Debt of Sin.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Debt of Sin: One creature within 60 feet of Halric must succeed on a DC 13 Wisdom saving throw or take 13 (3d8) radiant damage and be charmed until the end of its next turn.
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
```

---

## 04. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** lurker-2 -> CR 3
**Signature:** library · **elapsed** 23s

**Type line:** `Medium humanoid, neutral` — **set by** unset

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Brother Halric — Brother Halric opens by taking the measure of a room — reading which soul is closest to breaking and addressing that one by name before a single blow lands. Every round after, he trades on that reading: pressing the wavering with quiet, precise violence while the steadfast find thei
[concept] expansion answered: type=Undead (type_source=inferred) material=shadow size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: gaze
[path] class_npc — class cleric — "Brother" (call)
[concept] type settled: Undead -> Humanoid — the words are a name and the class word and nothing else, and a person with a class and no named body is a Humanoid (owner's ruling, 2026-11-15); the route call had answered Undead
[concept] resolve: archetype=lurker type=Humanoid typeFrom=fix A (a bare name with a class) themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Brother": nothing to add — the sheet already answers it
[reskin] multiattack re-read — "Naming Gaze" left; "Multiattack" now reads "Halric makes two attacks, using Mace or Radiant Flame in any combination."
```

**The Spellcasting row, in full**
```
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
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

Divine Aid (3/Day) (Bonus Action).Halric casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
```

---

## 05. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** defender-3 -> CR 3
**Signature:** library · **elapsed** 22s

**Type line:** `Medium humanoid, neutral` — **set by** unset

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Brother Halric — Brother Halric opens a fight by hailing the party softly from the shrine's shadow, staff planted, until one of them steps within the marked ground — then he closes like a door and lets his packed, grave-damp body soak the blow. Every round after he fights patient and rooted, taking
[concept] expansion answered: type=Undead (type_source=inferred) material=grave size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: snare
[path] class_npc — class cleric — "Brother" (call)
[concept] type settled: Undead -> Humanoid — the words are a name and the class word and nothing else, and a person with a class and no named body is a Humanoid (owner's ruling, 2026-11-15); the route call had answered Undead
[concept] resolve: archetype=defender type=Humanoid typeFrom=fix A (a bare name with a class) themes=grave/uncanny mind=sapient style=warden energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Brother": nothing to add — the sheet already answers it
```

**The Spellcasting row, in full**
```
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
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

Grave-Damp Ground.While Halric is alive and on the ground, the ground in a 10-foot radius originating from Halric is Difficult Terrain, and it stops being Difficult Terrain when Halric dies or is not on it.
Divine Aid (3/Day) (Bonus Action).Halric casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
```


# Batch 8.1 — the goblin wizard, re-roll 1 of 5 (blocker 1's rate)

One entry, re-rolled to measure how often it throws. None of the five threw; with the one in
the ship run that is 1 of 6.

`smoke-out/ship-eight-2026-11-16T01-26-24`

---

## 01. Gribble Nosewitch — CR 3

**Input:** `goblin wizard`
**Donor:** skirmisher-3 -> CR 3
**Signature:** library · **elapsed** 35s

**Type line:** `Small Humanoid, Chaotic Neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: goblin wizard
[path] filled: the head clause names the mage's "wizard" and the call named no class — a Goblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Goblin Warrior (is) — class mage — "wizard" (call)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/uncanny mind=sapient style=— energy=Force mix=energy identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 3 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Goblin Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "wizard": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] class weapon: Actions/"Scimitar" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Goblin Warrior's
[reskin] multiattack re-read — "Curdling Spite" left; "Multiattack" now reads "Gribble makes two attacks, using Quarterstaff or Shortbow in any combination."
```

**The Spellcasting row, in full**
```
Spellcasting. Gribble casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.
Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.
```

```
Gribble Nosewitch

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

Clinging Shadow. When Gribble takes the Hide action in Dim Light or Darkness, Gribble leaves a smear of clinging shadow in the space he hid in that lasts until the end of the encounter or until bright light shines on it, and while it lasts Gribble has Advantage on Dexterity (Stealth) checks to hide again in that area.

Actions

Multiattack. Gribble makes two attacks, using Quarterstaff or Shortbow in any combination.

Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.

Spellcasting. Gribble casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation

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


# Batch 8.2 — the goblin wizard, re-roll 2 of 5 (blocker 1's rate)

One entry, re-rolled to measure how often it throws. None of the five threw; with the one in
the ship run that is 1 of 6.

`smoke-out/ship-eight-2026-11-16T01-27-00`

---

## 01. Wandrat — CR 3

**Input:** `goblin wizard`
**Donor:** skirmisher-3 -> CR 3
**Signature:** library · **elapsed** 30s

**Type line:** `Small Humanoid, Chaotic Neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: goblin wizard
[path] filled: the head clause names the mage's "wizard" and the call named no class — a Goblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Goblin Warrior (is) — class mage — "wizard" (call)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/grasping mind=sapient style=— energy=Force mix=energy identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 3 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Goblin Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "wizard": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] class weapon: Actions/"Scimitar" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Goblin Warrior's
```

**The Spellcasting row, in full**
```
Spellcasting. The wandrat casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.
Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.
```

```
Wandrat

Small Humanoid, Chaotic Neutral

AC 15
Initiative +3 (13)

HP 59 (17d6)

Speed 30 ft., Climb 30 ft.

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

Senses Passive Perception 11

Languages Common, Goblin

CR 3 (XP 700; PB +2)

Actions

Multiattack. The wandrat makes two attacks, using Quarterstaff or Shortbow in any combination. It can replace one attack with a use of Blinding Crack.

Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.

Spellcasting. The wandrat casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation

Blinding Crack. Constitution Saving Throw: DC 12, one creature within 60 feet. Failure: The target has the Blinded condition until the end of its next turn.

Bonus Actions

Nimble Escape. The wandrat takes the Disengage or Hide action.

Reactions

Protective Magic (3/Day). The wandrat casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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


# Batch 8.3 — the goblin wizard, re-roll 3 of 5 (blocker 1's rate)

One entry, re-rolled to measure how often it throws. None of the five threw; with the one in
the ship run that is 1 of 6.

`smoke-out/ship-eight-2026-11-16T01-27-31`

---

## 01. Skritch the Scavenger — CR 3

**Input:** `goblin wizard`
**Donor:** skirmisher-3 -> CR 3
**Signature:** library · **elapsed** 29s

**Type line:** `Small Humanoid, Chaotic Neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: goblin wizard
[path] filled: the head clause names the Goblin Warrior, a people — a mage who is visibly one stands on its printed body (owner's ruling, 2026-11-15)
[path] filled: the head clause names the mage's "wizard" and the call named no class — a Goblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Goblin Warrior (is) — class mage — "wizard" (call)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/subterranean mind=sapient style=— energy=Force mix=energy identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 3 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Goblin Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "wizard": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] class weapon: Actions/"Scimitar" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Goblin Warrior's
[reskin] name follows content: Actions/"Chain Lightning Bolts" carries Lightning the row never deals — "Chain Bolts" (the element word drops; the call's own noun stays)
```

**The Spellcasting row, in full**
```
Spellcasting. Skritch casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.
Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.
```

```
Skritch the Scavenger

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

Multiattack. Skritch makes two attacks, using Quarterstaff or Shortbow in any combination.

Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.

Spellcasting. Skritch casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation

Chain Bolts (Recharge 5-6). Dexterity Saving Throw: DC 12, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. Failure: 13 (3d8) Piercing damage. Success: Half damage.

Bonus Actions

Nimble Escape. Skritch takes the Disengage or Hide action.

Reactions

Protective Magic (3/Day). Skritch casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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


# Batch 8.4 — the goblin wizard, re-roll 4 of 5 (blocker 1's rate)

One entry, re-rolled to measure how often it throws. None of the five threw; with the one in
the ship run that is 1 of 6.

`smoke-out/ship-eight-2026-11-16T01-28-00`

---

## 01. Snaggletooth Hexer — CR 3

**Input:** `goblin wizard`
**Donor:** skirmisher-3 -> CR 3
**Signature:** library · **elapsed** 31s

**Type line:** `Small Humanoid, Chaotic Neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: goblin wizard
[path] filled: the head clause names the Goblin Warrior, a people — a mage who is visibly one stands on its printed body (owner's ruling, 2026-11-15)
[path] filled: the head clause names the mage's "wizard" and the call named no class — a Goblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Goblin Warrior (is) — class mage — "wizard" (call)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/venomous mind=sapient style=— energy=Force mix=energy identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 3 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Goblin Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "wizard": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] class weapon: Actions/"Scimitar" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Goblin Warrior's
```

**The Spellcasting row, in full**
```
Spellcasting. The hexer casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.
Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.
```

```
Snaggletooth Hexer

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

Spiteful Frenzy. While the hexer is Bloodied, each of the hexer's attacks deals an extra 6 (1d12) Force damage.

Actions

Multiattack. The hexer makes two attacks, using Quarterstaff or Shortbow in any combination.

Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.

Spellcasting. The hexer casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation

Bonus Actions

Nimble Escape. The hexer takes the Disengage or Hide action.

Reactions

Protective Magic (3/Day). The hexer casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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


# Batch 8.5 — the goblin wizard, re-roll 5 of 5 (blocker 1's rate)

One entry, re-rolled to measure how often it throws. None of the five threw; with the one in
the ship run that is 1 of 6.

`smoke-out/ship-eight-2026-11-16T01-28-32`

---

## 01. Gribble the Scrap-Wizard — CR 3

**Input:** `goblin wizard`
**Donor:** skirmisher-3 -> CR 3
**Signature:** library · **elapsed** 34s

**Type line:** `Small Humanoid, Chaotic Neutral` — **set by** the route call

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: goblin wizard
[path] filled: the head clause names the mage's "wizard" and the call named no class — a Goblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Goblin Warrior (is) — class mage — "wizard" (call)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/bestial mind=sapient style=— energy=Force mix=both identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 3 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Goblin Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "wizard": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] class weapon: Actions/"Scimitar" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Goblin Warrior's
```

**The Spellcasting row, in full**
```
Spellcasting. Gribble casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.
Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.
```

```
Gribble the Scrap-Wizard

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

Nook Glamour. While Gribble has not moved or taken an action since the end of his last turn in Dim Light, Darkness, or behind Cover, Gribble is Invisible; a creature can reveal him only by using its action to make a Wisdom (Perception) check against DC 12, and magical senses (such as Truesight or See Invisibility) reveal him automatically; the glamour ends immediately if Gribble moves, attacks, or casts a spell.

Actions

Multiattack. Gribble makes two attacks, using Quarterstaff or Shortbow in any combination.

Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.

Spellcasting. Gribble casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation

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
