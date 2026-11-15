# Blocks — three fixes for a class on a people's body

Round of 2026-11-15, on top of `b0b4cca`. **Every sheet this round generated is in this file,
marked as it is.** Four batches: the six that are the fixes' own subject, five rolls of one
regression case, the eight of the ship gate rerun, and the regression forty — rerun because two of
the three fixes run on every class-NPC path, not only on a people's body.

```
node --import ./scripts/alias-loader.mjs scripts/reference-lend-checks.mjs   # exit 0
node --import ./scripts/alias-loader.mjs scripts/probe-peoples-body.mjs 10
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs people-class       # 6
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs halric5            # 5
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs ship-eight         # 8
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs sweep              # 40
npx jest src/tools/statblock-generator src/util --maxWorkers=2 --silent     # 225 suites, 5317 passed, 26 skipped
npm run build                                                               # clean
```

## The three fixes, and what each sheet shows

**Fix 1 — a lent Spellcasting row obeys item 7's rule.** A mage or cleric standing on a people's
body has no spellcasting of its own, so the class's own print block lends its row. It lent the
whole thing: a CR 1 goblin wizard carried the CR 6 Mage's Fireball twice a day and a Cone of Cold.
The lend now applies the same CR judgement item 7 already applies to a sheet's own list, with the
owner's one allowance — the lending block's At Will line stands as print's.

**Fix 2 — a rider keeps both halves or loses both.** Print's Goblin Warrior Scimitar reads
"…Slashing damage, plus 2 (1d4) Slashing damage if the attack roll had Advantage". The class-weapon
pass took the rider's *damage* and stopped, so the condition stayed stuck to the base and every
class NPC on that body read "6 (1d8 + 2) Bludgeoning damage if the attack roll had Advantage" — 24
rows, four classes, six CRs. It also folded conditional damage into unconditional damage.

**The choice, stated:** a **conditional** rider is dropped whole and folds nothing; an
**unconditional** rider still folds. The cut is at `generate.mjs:9710` — the regex now consumes the
`if …` clause together with the rider's damage, and the row is normalised to end in a period. The
reasoning is this pass's own: it swaps the *body's* weapon for the *class's*, and the body's rider
belongs to the weapon that just left ("print's Assassin pays 5d6 Poison for its shortsword, a monk
does not"). The Bugbear keeps its own Grappled rider, which is the body's weapon staying put.

**Fix 3 — the mirror of ruling C.** Ruling C fills the body when the call names a class and forgets
the body. This fills the **class** when the call names a declared people as the body and forgets the
class — "kobold sorcerer" shipped as a plain kobold with a dagger and nothing answering "sorcerer".
The class words are the closed table `classes.mjs` already owns; head clause only; exactly one; a
class the call named is never overridden; and the whole printed name still wins first, so
"kobold warrior" stays the exact block.

## What the numbers came out at

| | |
|---|---|
| `reference-lend-checks.mjs` | **exit 0** — cases 144, threw 0; spells outside the class's own CR list **0 of 72**; fused riders **0** |
| suite | 225 suites, **5317 passed**, 26 skipped (+9: the three tests this round) |
| the six | **0 FAIL of 6** |
| path probe, `kobold sorcerer` ×10 | **9 of 10** — see below |
| path probe, `goblin wizard` ×10 | 10 of 10 |

**The probe is 19 of 20, not 20.** The one miss had the call answer the **Mage** print block as the
body. The class was filled; the kobold was lost. Ruling C's fill cannot correct it, because a body
is already named — and the receipt check asks only that the receipt be a *span* of the GM's words,
not that it name the body it justifies ("sorcerer" is a true span of "kobold sorcerer", and it
justifies nothing about the Mage). A second read of 12 raw answers showed it 0 times, so the
observed rate is about 1 in 22. **This is a different defect from the three fixed here and it is
reported, not fixed** — correcting it means deciding whether a named body is refused when the GM's
own words name a declared people instead, which is the owner's call.

## Brother Halric — the type flip, measured

Five rolls of sweep #40 (`Brother Halric`, a person's name alone, 2014, CR 3):

| roll | type line |
|---|---|
| 01 | `Medium humanoid, neutral` |
| 02 | `Medium undead, neutral` |
| 03 | `Medium undead, neutral` |
| 04 | `Medium humanoid, neutral` |
| 05 | `Medium humanoid, neutral` |

**3 Humanoid, 2 Undead, 0 Construct**, and no poison immunity on any creature (roll 04's only
poison immunity belongs to a wax *object*, which is correct for an object). The 12 November
`Medium construct, neutral` did not recur.

**The flip is the expansion's, not the type gate's.** A bare name is a thin concept, so it is
expanded before routing, and the type then follows the expansion — correctly. Two of five
expansions invented an undead priest: *"a hollow-eyed village elder who never quite died"* and
*"a drowned-sweet voice… the grave's cold settle into their bones"*. Rulings A and B are not
implicated; what varies is what the expansion decides Brother Halric is.

## Blast radius, and why the forty was rerun

| fix | gate | reach |
|---|---|---|
| fix 1 | `isClassNpc && pathD?.print_body` | **every class NPC on a print body** |
| fix 2 | `isClassNpc && pathD.class && !printExact` | **every class NPC** |
| fix 3 | a declared people, relation `is`, no class named | class-on-a-people only |

Two of the three reach past the path they were written for, so the regression forty was rerun whole
and is below.


# Batch 1 of 4 — the six sheets the fixes are about

Once each, as they would ship. **0 FAIL of 6.** Sheets 05 and 06 are controls: the hobgoblin
priest was already green before these fixes, and `kobold warrior` must stay the exact printed
block with no class filled.

`smoke-out/people-class-2026-11-15T21-05-57`

---

## 01. Scrap-Pile Hexgoblin — CR 3

**Input:** `goblin wizard`
**Donor:** skirmisher-3 -> CR 3
**Signature:** dropped · **elapsed** 27s

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: goblin wizard
[path] refused: the head clause names the mage's "wizard" and the call named no class — a Goblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Goblin Warrior (is) — class mage — "wizard" (call)
[concept] resolve: archetype=caster type=Humanoid themes=arcane/bestial mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 3 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Goblin Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "wizard": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] class weapon: Actions/"Scimitar" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Goblin Warrior's
```

**The Spellcasting row, in full**
```
Spellcasting. The hexgoblin casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.
Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.
```

```
Scrap-Pile Hexgoblin

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

Senses darkvision 60 ft.; Passive Perception 11

Languages Common, Goblin

CR 3 (XP 700; PB +2)

Traits

Spider Climb. The hexgoblin can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions

Multiattack. The hexgoblin makes two attacks, using Quarterstaff or Shortbow in any combination.

Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.

Spellcasting. The hexgoblin casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation

Bonus Actions

Nimble Escape. The hexgoblin takes the Disengage or Hide action.

Reactions

Protective Magic (3/Day). The hexgoblin casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 02. Skritch the Spurned — CR 1

**Input:** `goblin wizard`
**Donor:** skirmisher-1 -> CR 1
**Signature:** dropped · **elapsed** 28s

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: goblin wizard
[path] refused: the head clause names the Goblin Warrior, a people — a mage who is visibly one stands on its printed body (owner's ruling, 2026-11-15)
[path] refused: the head clause names the mage's "wizard" and the call named no class — a Goblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Goblin Warrior (is) — class mage — "wizard" (call)
[concept] resolve: archetype=caster type=Humanoid themes=arcane/bestial mind=sapient style=— energy=Force mix=both identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 1 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Goblin Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "wizard": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] class weapon: Actions/"Scimitar" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Goblin Warrior's
```

**The Spellcasting row, in full**
```
Spellcasting. Skritch casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
Quarterstaff. Melee Attack Roll: +4, reach 5 ft. 5 (1d6 + 2) Bludgeoning damage.
Shortbow. Ranged Attack Roll: +4, range 80/320 ft. 5 (1d6 + 2) Piercing damage.
```

```
Skritch the Spurned

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

Senses Passive Perception 11

Languages Common, Goblin

CR 1 (XP 200; PB +2)

Traits

Chattering Pages. When Skritch ends its turn without having attacked, Skritch regains one expended use of Protective Magic.

Actions

Multiattack. Skritch makes two attacks, using Quarterstaff or Shortbow in any combination.

Quarterstaff. Melee Attack Roll: +4, reach 5 ft. 5 (1d6 + 2) Bludgeoning damage.

Shortbow. Ranged Attack Roll: +4, range 80/320 ft. 5 (1d6 + 2) Piercing damage.

Spellcasting. Skritch casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation

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

---

## 03. Vessik Ember-Vein — CR 2

**Input:** `kobold sorcerer`
**Donor:** skirmisher-1 -> CR 2
**Signature:** dropped · **elapsed** 34s

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: kobold sorcerer
[path] refused: the head clause names the mage's "sorcerer" and the call named no class — a Kobold Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Kobold Warrior (is) — class mage — species lizardfolk — "sorcerer" (call)
[concept] resolve: archetype=caster type=Humanoid themes=draconic/arcane mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 2 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Kobold Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "sorcerer": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] class weapon: Actions/"Dagger" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Kobold Warrior's
```

**The Spellcasting row, in full**
```
Spellcasting. The vessik ember-vein casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage.
```

```
Vessik Ember-Vein

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 45 (13d8 - 13)

Speed 30 ft., Swim 30 ft.

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

Hold Breath. The vessik ember-vein can hold its breath for 15 minutes.

Marsh Stride. Difficult Terrain composed of mud doesn't cost the vessik ember-vein extra movement, and the vessik ember-vein can move across mud without needing to make an ability check.

Pack Tactics. The vessik ember-vein has Advantage on an attack roll against a creature if at least one of the vessik ember-vein's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Sunlight Sensitivity. While in sunlight, the vessik ember-vein has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The vessik ember-vein makes two Quarterstaff attacks.

Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage.

Spellcasting. The vessik ember-vein casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation

Scalding Blood-Flare. Constitution Saving Throw: DC 12, each creature within 5 feet. Failure: 10 (3d6) Fire damage. Success: Half damage only.

Reactions

Protective Magic (3/Day). The vessik ember-vein casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 04. Venomweb Prowler — CR 3

**Input:** `goblin assassin`
**Donor:** skirmisher-3 -> CR 3
**Signature:** dropped · **elapsed** 25s

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: goblin assassin — This goblin assassin is a venom-soaked blade in the dark: it opens combat by striking from hiding with a poisoned thrust, then fights in a skittering hit-and-run rhythm, retreating and re-striking from cover to let its venom work. It is a calculating, patient killer that flees when
[path] refused: the head clause names the rogue's "assassin" and the call named no class — a Goblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Goblin Warrior (is) — class rogue — "assassin" (call)
[concept] resolve: archetype=skirmisher type=Humanoid themes=venomous mind=sapient style=skulker energy=Poison mix=both identity=✓ lore=✓
[reskin] class kit: rogue — "assassin": Cunning Action (Assassin/Cunning Action), Evasion (evasion), Surprise Attack (assassinate)
[reskin] class weapon: Actions/"Scimitar" -> "Shortsword" — a rogue fights with a shortsword, not the Goblin Warrior's
```

**Every attack row**
```
Shortsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.
Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.
```

```
Venomweb Prowler

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

Surprise Attack. During the first round of each combat, the prowler has Advantage on attack rolls against any creature that hasn't taken a turn. If the prowler hits a creature during that round, the target takes an extra 6 (1d12) Piercing damage.

Evasion. If the prowler is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the prowler instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The prowler makes two attacks, using Shortsword or Shortbow in any combination.

Shortsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.

Bonus Actions

Nimble Escape. The prowler takes the Disengage or Hide action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 05. Legion War-Priest — CR 4

**Input:** `hobgoblin priest`
**Donor:** defender-3 -> CR 4
**Signature:** dropped · **elapsed** 30s

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: hobgoblin priest — The hobgoblin priest opens by fixing its rank behind it with a barked battle-blessing, then works the front line with a mace and a war-prayer that keeps the soldiers standing and the enemy's nerve cracking. Every round it reads the field for the weakest will and spends its wrath t
[path] refused: the head clause names the Hobgoblin Warrior, a people — a cleric who is visibly one stands on its printed body (owner's ruling, 2026-11-15)
[path] refused: the head clause names the cleric's "priest" and the call named no class — a Hobgoblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Hobgoblin Warrior (is) — class cleric — "priest" (call)
[concept] resolve: archetype=caster type=Humanoid themes=armed/voice mind=sapient style=binder energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: Spellcasting lent by the Priest — this sheet stands on the Hobgoblin Warrior, a body that carries no spellcasting, and a cleric without it is not a cleric
[reskin] class kit: cleric — "priest": Divine Aid (3/Day) (Priest/Divine Aid)
[reskin] class weapon: Actions/"Longsword" -> "Mace" — a cleric fights with a mace, not the Hobgoblin Warrior's
```

**The Spellcasting row, in full**
```
Spellcasting. The war-priest casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):
- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians
```

**Every attack row**
```
Mace. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Bludgeoning damage.
Longbow. Ranged Attack Roll: +6, range 150/600 ft. 14 (3d6 + 4) Piercing damage.
```

```
Legion War-Priest

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

Pack Tactics. The war-priest has Advantage on an attack roll against a creature if at least one of the war-priest's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The war-priest makes two attacks, using Mace or Longbow in any combination.

Mace. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Bludgeoning damage.

Longbow. Ranged Attack Roll: +6, range 150/600 ft. 14 (3d6 + 4) Piercing damage.

Spellcasting. The war-priest casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Bonus Actions

Divine Aid (3/Day). The war-priest casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
**Signature:** dropped · **elapsed** 17s

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: kobold warrior
[path] exact — Kobold Warrior (is) — "Kobold Warrior" (code)
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the exact path takes no class kit
```

**Every attack row**
```
Dagger. Melee or Ranged Attack Roll: +4, reach 5 ft. or range 20/60 ft. 5 (1d6 + 2) Piercing damage.
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

Dagger. Melee or Ranged Attack Roll: +4, reach 5 ft. or range 20/60 ft. 5 (1d6 + 2) Piercing damage.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```


# Batch 2 of 4 — Brother Halric, five rolls

Sweep #40's own entry, unchanged: a person's name alone, 2014, CR 3. The question was whether
the 12 November `Medium construct, neutral` with poison immunity recurs. It does not; the type
line is in the table above, and the cause of the flip is the expansion.

`smoke-out/halric5-2026-11-15T21-08-38`

---

## 01. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** caster-6 -> CR 3
**Signature:** library · **elapsed** 28s

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Brother Halric — Brother Halric opens a fight by preaching, fixing one foe with a condemnatory gaze that roots the guilty in place before he closes with a heavy censer on a chain, swinging it in wide burning arcs. Every round after that he alternates between flail-like censer strikes trailing sacred
[path] class_npc — class cleric — "Brother" (call)
[concept] resolve: archetype=caster type=Humanoid themes=grave/voice mind=sapient style=warpriest energy=Fire mix=both identity=✓ lore=✓
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
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame. It can replace one attack with a use of Ashbound Condemnation.
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
Ashbound Condemnation: One creature within 60 feet of Halric must succeed on a DC 13 Strength saving throw or be restrained until the end of its next turn.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
```

---

## 02. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** brute-2 -> CR 3
**Signature:** library · **elapsed** 25s

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Brother Halric — Brother Halric opens a fight by stepping forward with open hands and a drowned-sweet voice, offering a blessing that is really a binding — those who listen feel the grave's cold settle into their bones. Every round after, he shepherds the wounded and the wavering toward his open arm
[path] class_npc — class cleric — "Brother" (call)
[concept] resolve: archetype=brute type=Undead themes=grave/beguiling mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
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
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame. It can replace one attack with a use of Weight of the Sodden Robes.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
Weight of the Sodden Robes: One creature within 30 feet must succeed on a DC 13 Strength saving throw or take 24 (7d6) cold damage and be knocked prone.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
```

---

## 03. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** caster-6 -> CR 3
**Signature:** library · **elapsed** 26s

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Brother Halric — A hollow-eyed village elder who never quite died, Brother Halric shuffles forward muttering the names of the dead, dragging a rusted censer whose smoke begins peeling the breath from living lungs. Every round he hexes the nearest living thing to feel what his own rotting nerves can
[path] class_npc — class cleric — "Brother" (call)
[concept] resolve: archetype=caster type=Undead themes=grave/voice mind=sapient style=binder energy=Necrotic mix=both identity=✓ lore=✓
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
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame. It can replace one attack with a use of Grave Kin Hex.
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
Grave Kin Hex: One creature within 60 feet of Halric must make a DC 13 Constitution saving throw, taking 13 (3d8) necrotic damage on a failed save. On a failed save, the target is also poisoned until the end of its next turn.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
```

---

## 04. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** caster-6 -> CR 3
**Signature:** library · **elapsed** 28s

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Brother Halric — Brother Halric opens combat with a low, patient sermon that turns hostile intent sour in the listener's chest, then steps in behind a shield of chapped, ash-grey hide to lay about with a cudgel and a binding word. Every round he preaches the congregation into place — snaring the nea
[path] class_npc — class cleric — "Brother" (call)
[concept] resolve: archetype=caster type=Humanoid themes=grave/terror mind=sapient style=warpriest energy=Necrotic mix=both identity=✓ lore=✓
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
Grave-Wax Binding (Recharge 5-6): One creature within 60 feet must make a DC 13 Dexterity saving throw. On a failed save, the target is restrained until the end of its next turn.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
```

---

## 05. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** defender-3 -> CR 3
**Signature:** library · **elapsed** 23s

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Brother Halric — Brother Halric opens a fight by stepping into the middle of it and calling out the names of every foe's sins, a rite of censure that leaves the guilty shaken and glowing faintly with the light he has seen in them. He then wades in with his censer-flail, sweeping the burning coals in
[path] class_npc — class cleric — "Brother" (call)
[concept] resolve: archetype=defender type=Humanoid themes=grave/terror mind=sapient style=leader energy=Radiant mix=both identity=✓ lore=✓
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
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame. It can replace one attack with a use of Tolling Censure.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Tolling Censure: One creature within 60 feet must make a DC 13 Wisdom saving throw. On a failed save, the target is frightened until the end of its next turn.
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
```


# Batch 3 of 4 — the ship gate eight, rerun whole

**0 FAIL of 8**, against 1 of 8 on the frozen gate (the Headless Horseman's `attack-stat`
cleared). Sheets 04 and 05 are the two that `BLOCKS-ship-2026-11-15.md` now marks superseded:
both land on the people's own body and carry a list trimmed to their CR.

`smoke-out/ship-eight-2026-11-15T21-10-49`

---

## 01. Headless Horseman — CR 11

**Input:** `name: Headless Horseman | `
**Donor:** skirmisher-8-mounted -> CR 11 (invented — no printed peer)
**Signature:** library · **elapsed** 27s

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Headless Horseman — The Horseman opens by running a rider down on the road — a thundering charge that ends with a thrown pumpkin-head bursting into a blinding grave-light, marking the quarry for the hunt. Every round after, it circles at a gallop, loosing curses and dread from the empty collar of it
[path] homebrew — "Headless Horseman" (call)
[concept] resolve: archetype=skirmisher type=Undead themes=grave/terror mind=sapient style=mounted energy=Necrotic mix=both identity=✓ lore=✓
[reskin] mind tier: INT 10 -> 15 — the call read this creature as capable at CR 11
[reskin] mind tier: WIS 14 -> 20 — the call read this creature as formidable at CR 11
[reskin] mind tier: CHA 10 -> 20 — the call read this creature as formidable at CR 11
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Saber. Melee Attack Roll: +9, reach 5 ft. 15 (3d6 + 5) Slashing damage plus 7 (2d6) Necrotic damage. If the headless horseman moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 5 (1d10) Slashing damage and, if it is Large or smaller, has the Prone condition.
```

```
Headless Horseman

Medium Undead, Neutral

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

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 19

Languages Common plus the languages it knew in life

CR 11 (XP 7,200; PB +4)

Traits

Gallop. The headless horseman ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The headless horseman makes three Saber attacks.

Saber. Melee Attack Roll: +9, reach 5 ft. 15 (3d6 + 5) Slashing damage plus 7 (2d6) Necrotic damage. If the headless horseman moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 5 (1d10) Slashing damage and, if it is Large or smaller, has the Prone condition.

Hooves of the Hunt (Recharge 5-6). The headless horseman moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Dexterity Saving Throw: DC 17. Failure: 66 (12d10) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

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
**Donor:** brute-5-charger -> CR 10
**Signature:** library · **elapsed** 31s

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Pumpkin King — The Pumpkin King opens the harvest fight with a juggernaut charge through its own gourd-court, smashing smaller gourds aside and pinning the nearest foe beneath a crushing, flaming slam. Each round it wades in on vine-wrapped legs, hurling fist-sized seed-gourds that burst into clingi
[path] homebrew — title King — "Pumpkin King" (call)
[concept] resolve: archetype=brute type=Plant themes=verdant/elemental mind=sapient style=charger energy=Fire mix=both identity=✓ lore=✓
[reskin] mind tier held: WIS stays 12 against "ordinary" — the card's 12 is already ordinary
[reskin] mind tier: INT 4 -> 15 — the call read this creature as capable at CR 10
[reskin] mind tier: CHA 4 -> 20 — the call read this creature as formidable at CR 10
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Gnarled Sweep. Melee Attack Roll: +9, reach 5 ft. 14 (2d8 + 5) Bludgeoning damage plus 10 (3d6) Fire damage. If the target is a Large or smaller creature and the king moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) Bludgeoning damage and has the Prone condition.
```

```
Pumpkin King

Large Plant, Neutral

AC 15
Initiative +0 (10)

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
17
+3
+7
CHA
20
+5
+5

Skills Athletics +9, Perception +5

Immunities Fire

Senses Passive Perception 15

Languages Common

CR 10 (XP 5,900; PB +4)

Actions

Multiattack. The king makes two Gnarled Sweep attacks. It can replace one attack with a use of Kindled Seed-Gourd.

Gnarled Sweep. Melee Attack Roll: +9, reach 5 ft. 14 (2d8 + 5) Bludgeoning damage plus 10 (3d6) Fire damage. If the target is a Large or smaller creature and the king moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) Bludgeoning damage and has the Prone condition.

Gourd-Court Shove (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: 60 (11d10) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

Kindled Seed-Gourd. Dexterity Saving Throw: DC 17, one creature within 60 feet. Failure: 28 (8d6) Fire damage. Success: Half damage only.

Bonus Actions

Trample. Dexterity Saving Throw: DC 17, one creature within 5 feet that has the Prone condition. Failure: 13 (3d8) Bludgeoning damage. Success: Half damage.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
**Donor:** skirmisher-3 -> CR 5
**Signature:** library · **elapsed** 27s

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Knife Ball — The Knife Ball opens combat by rolling down a slope or alley and bursting outward into a whirling halo of blades, forcing every nearby creature to scramble out of its arc. Each round after, it re-furls, feints, and tumbles back into a second burst, catching pursuers where the steel ring
[path] homebrew — "Knife Ball" (call)
[concept] resolve: archetype=skirmisher type=Construct themes=forged/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: WIS stays 12 against "ordinary" — the card's 12 is already ordinary
[reskin] mind tier: INT 8 -> 3 — the call read this creature as feeble at CR 5
[reskin] mind tier: CHA 8 -> 6 — the call read this creature as feeble at CR 5
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Blade. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Slashing damage.
```

```
Knife Ball

Small Construct, Unaligned

AC 16
Initiative +3 (13)

HP 88 (16d6 + 32)

Speed 40 ft.

MOD
SAVE
STR
12
+1
+1
INT
3
-4
-4
MOD
SAVE
DEX
16
+3
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
6
-2
-2

Skills Perception +4, Stealth +6

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages Understands the languages of its creator but can't speak

CR 5 (XP 1,800; PB +3)

Traits

Tumbling Roll. The knife ball ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The knife ball makes two Blade attacks.

Blade. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Slashing damage.

Whirling Steel Ring (Recharge 5-6). Dexterity Saving Throw: DC 13, each creature in a 15-foot Emanation originating from the knife ball. Failure: 24 (7d6) Slashing damage, and the target is pushed up to 10 feet straight away from the knife ball, and the target has the Prone condition. Success: Half damage only.

Bonus Actions

Fleet Agility. The knife ball takes the Dash or Disengage action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 04. Snagtooth Cantrip — CR 3

**Input:** `goblin wizard`
**Donor:** skirmisher-3 -> CR 3
**Signature:** library · **elapsed** 27s

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: goblin wizard
[path] refused: the head clause names the Goblin Warrior, a people — a mage who is visibly one stands on its printed body (owner's ruling, 2026-11-15)
[path] refused: the head clause names the mage's "wizard" and the call named no class — a Goblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Goblin Warrior (is) — class mage — "wizard" (call)
[concept] resolve: archetype=caster type=Humanoid themes=arcane/bestial mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 3 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Goblin Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "wizard": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] class weapon: Actions/"Scimitar" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Goblin Warrior's
```

**The Spellcasting row, in full**
```
Spellcasting. The cantrip casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.
Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.
```

```
Snagtooth Cantrip

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

Multiattack. The cantrip makes two attacks, using Quarterstaff or Shortbow in any combination. It can replace one attack with a use of Ash-Choked Cantrip.

Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.

Spellcasting. The cantrip casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation

Ash-Choked Cantrip. Constitution Saving Throw: DC 12, one creature within 30 feet. Failure: The target has the Blinded condition until the end of its next turn.

Bonus Actions

Nimble Escape. The cantrip takes the Disengage or Hide action.

Reactions

Protective Magic (3/Day). The cantrip casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 05. Venomvein Scavenger — CR 2

**Input:** `kobold sorcerer`
**Donor:** skirmisher-1 -> CR 2
**Signature:** library · **elapsed** 29s

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: kobold sorcerer
[path] refused: the head clause names the Kobold Warrior, a people — a mage who is visibly one stands on its printed body (owner's ruling, 2026-11-15)
[path] refused: the head clause names the mage's "sorcerer" and the call named no class — a Kobold Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Kobold Warrior (is) — class mage — "sorcerer" (call)
[concept] resolve: archetype=caster type=Humanoid themes=draconic/venomous mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 2 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Kobold Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "sorcerer": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] class weapon: Actions/"Dagger" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Kobold Warrior's
```

**The Spellcasting row, in full**
```
Spellcasting. The scavenger casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage.
```

```
Venomvein Scavenger

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

Pack Tactics. The scavenger has Advantage on an attack roll against a creature if at least one of the scavenger's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Sunlight Sensitivity. While in sunlight, the scavenger has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The scavenger makes two Quarterstaff attacks. It can replace one attack with a use of Warpvenom Injection.

Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage.

Spellcasting. The scavenger casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation

Warpvenom Injection. Constitution Saving Throw: DC 12, one creature within 5 feet. Failure: 7 (2d6) Poison damage, and the target has the Poisoned condition until the end of its next turn.

Reactions

Protective Magic (3/Day). The scavenger casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 06. Margined Curator — CR 3

**Input:** `mummy librarian`
**Donor:** defender-3-warden -> CR 3 (invented — no printed peer)
**Signature:** library · **elapsed** 29s

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: mummy librarian — The mummy librarian opens a fight by exhaling a cloud of grave-dust from its desiccated lungs, blinding and choking intruders while it shuffles to interpose its brittle body between them and the shelves. Each round after, it fights with the desperate, methodical economy of a schola
[path] homebrew — Mummy (resembles) — "mummy librarian" (call)
[concept] resolve: archetype=defender type=Undead themes=grave/grasping mind=sapient style=warden energy=Necrotic mix=both identity=✓ lore=✓
[reskin] mind tier: INT 6 -> 15 — the call read this creature as capable at CR 3
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 3
[reskin] mind tier: CHA 5 -> 10 — the call read this creature as ordinary at CR 3
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Bandaged Fist. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 4 (1d8) Necrotic damage.
```

```
Margined Curator

Medium Undead, Neutral

AC 15
Initiative -1 (9)

HP 66 (12d8 + 12)

Speed 30 ft.

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
13
+1
+3
CHA
10
+0
+0

Skills Perception +4

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages Common plus the languages it knew in life

CR 3 (XP 700; PB +2)

Traits

Shelf Disguise. While the curator remains motionless, it appears to be a shelving cabinet of its own size and many drawers; a creature can use its action to examine it and make a Wisdom (Perception) check contested by the curator's Dexterity (Stealth) check, seeing through the ruse on a success and foiling the disguise against that creature until the curator moves.

Regeneration. The curator regains 5 Hit Points at the start of each of its turns if it has at least 1 Hit Point. If the curator takes Radiant damage, this trait doesn't function at the start of the curator's next turn.

Actions

Multiattack. The curator makes two Bandaged Fist attacks.

Bandaged Fist. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 4 (1d8) Necrotic damage.

Preserving Resin (2/Day). The curator targets itself or one creature it can see within 60 feet. The target gains 10 (3d6) Temporary Hit Points, and its AC increases by 2 until the end of the curator's next turn.

Grave-Dust Exhalation (Recharge 5-6). Constitution Saving Throw: DC 12, each creature in a 15-foot Cone. Failure: 9 (2d8) Necrotic damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 07. Honeytongue Toad — CR 2

**Input:** `a silver-tongued toad the size of a pony`
**Donor:** brute-2 -> CR 2
**Signature:** library · **elapsed** 25s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a silver-tongued toad the size of a pony" (call)
[concept] resolve: archetype=brute type=Beast themes=beguiling/voice mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: WIS stays 8 against "ordinary" — the card's 8 is already ordinary
[reskin] mind tier: INT 6 -> 15 — the call read this creature as capable at CR 2
[reskin] mind tier: CHA 6 -> 18 — the call read this creature as formidable at CR 2
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Slam. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.
```

```
Honeytongue Toad

Large Monstrosity, Neutral

AC 12
Initiative -1 (9)

HP 52 (7d10 + 14)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
16
+3
+5
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
18
+4
+4

Skills Athletics +5, Perception +1

Senses darkvision 30 ft.; Passive Perception 11

Languages Common

CR 2 (XP 450; PB +2)

Actions

Slam. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Honeyed Croak (Recharge 5-6). Wisdom Saving Throw: DC 12, one creature within 30 feet. Failure: The target is pulled up to 30 feet straight toward the honeytongue toad, and the target has the Charmed condition until the end of its next turn.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 08. Millrace Lurker — CR 3

**Input:** `a giant river pike`
**Donor:** brute-5-grappler -> CR 3
**Signature:** library · **elapsed** 30s

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: a giant river pike — A giant river pike holds to the shaded deep of a bend or sunken log and lunges the moment a shape breaks the surface above it, seizing prey in a vice of needle teeth and dragging it under to thrash and drown. Round after round it strikes, releases, and circles wide to swallow wo
[path] homebrew — "a giant river pike" (call)
[concept] resolve: archetype=brute type=Beast themes=aquatic/devouring mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 3
[reskin] mind tier: CHA 4 -> 10 — the call read this creature as ordinary at CR 3
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.
```

```
Millrace Lurker

Large Beast, Unaligned

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

Murkwake Ambush. While fully submerged in murky water, the lurker has the Invisible condition, and the first Bite it makes on each of its turns is made with Advantage.

Actions

Multiattack. The lurker makes two Bite attacks. It can replace one attack with a use of Creeping Dread.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.

Creeping Dread. Wisdom Saving Throw: DC 12, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the lurker's next turn. If the target was already Frightened by this ability, it also takes 13 (3d8) Psychic damage.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```


# Batch 4 of 4 — the regression forty

Rerun because fixes 1 and 2 reach every class-NPC path. **2 FAIL of 40** — Stone Golem
`dual-recharge` and Seam-Dragger `undefined-attack-ref`. **Neither is on a class path**: Stone
Golem is `twist` and Seam-Dragger is `homebrew`, while all three fixes are gated on
`isClassNpc`. Eight of the forty took `class_npc`, so fix 2 ran on eight sheets and fix 1 on
the one that stands on a print body (Vashka the Red, on the Hobgoblin Warrior). Across all
forty: **0 fused riders, 0 attack rows that do not end as a sentence.**

The FAIL identity changes run to run — 12 Nov read 2 of 40 (Hatchery Warden, Krennik
Skullstandard), the frozen gate 1 of 40 (Drowned Choir), this run 2 of 40 with two more
identities again. Per `BACKLOG-reskin-2026-10-21.md`, a single run's FAIL list is not a work
queue.

`smoke-out/sweep-2026-11-15T21-15-02`

---

## 01. Dire Wolf — CR 1

**Input:** `name: Dire Wolf | with a frost-rimed hide`
**Donor:** skirmisher-1 -> CR 1
**Signature:** library · **elapsed** 24s

**`[path]` and the lines that decided it**
```
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/elemental mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
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

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Snare. Strength Saving Throw: DC 13, one creature within 5 feet. Failure: The target has the Restrained condition until the end of its next turn.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 02. Mire Hound — CR 1

**Input:** `a mud-caked bog hound that drags fishermen under`
**Donor:** brute-5-grappler -> CR 1
**Signature:** library · **elapsed** 29s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a mud-caked bog hound that drags fishermen under" (call)
[concept] resolve: archetype=brute type=Beast themes=grasping/aquatic mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 1
[reskin] mind tier: CHA 4 -> 10 — the call read this creature as ordinary at CR 1
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
(no attack row)
```

```
Mire Hound
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

Actions
Multiattack: The hound makes two Bite attacks. It can replace one attack with a use of Yanking Maw.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained.
Yanking Maw: Each creature in a 15-foot cone must succeed on a DC 13 Strength saving throw or be pulled up to 15 feet straight toward the hound.
```

---

## 03. Owlbear — CR 3

**Input:** `name: Owlbear | that has learned to climb`
**Donor:** skirmisher-3 -> CR 3
**Signature:** dropped · **elapsed** 23s

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: Owlbear — that has learned to climb
[path] twist — Owlbear (is) — "Name field: Owlbear" (code)
[concept] resolve: archetype=skirmisher type=Monstrosity themes=bestial/grasping mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
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
Multiattack: The owlbear makes two Rend attacks.
Rend: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.
```

---

## 04. Chapel Bell Ghost — CR 3

**Input:** `a chapel bell-ringer's ghost that tolls for the dying`
**Donor:** lurker-2 -> CR 3
**Signature:** library · **elapsed** 29s

**`[path]` and the lines that decided it**
```
[path] twist — Ghost (is) — "ghost" (call)
[concept] resolve: archetype=lurker type=Undead themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**Every attack row**
```
Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.
```

```
Chapel Bell Ghost

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

Ethereal Sight. The bell ghost can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The bell ghost can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The bell ghost makes two Withering Touch attacks. It can replace one attack with a use of Death Knell.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Death Knell. Wisdom Saving Throw: DC 13, one creature within 60 feet. Failure: The target has the Frightened condition until the end of its next turn. If the target was already Frightened by this ability, it also takes 6 (1d12) Necrotic damage.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the bell ghost and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the bell ghost's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the bell ghost can see within 5 feet. Failure: The target is possessed by the bell ghost; the bell ghost disappears, and the target has the Incapacitated condition and loses control of its body. The bell ghost now controls the body, but the target retains awareness. The bell ghost can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The bell ghost's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the bell ghost leaves as a Bonus Action. When the possession ends, the bell ghost appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The bell ghost casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The bell ghost is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
**Signature:** library · **elapsed** 22s

**`[path]` and the lines that decided it**
```
[path] twist — Air Elemental (is) — "Name field: Air Elemental" (code)
[concept] resolve: archetype=lurker type=Elemental themes=elemental/voice mind=sapient style=phantom energy=Thunder mix=energy identity=✓ lore=✓
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

Senses darkvision 60 ft.; Passive Perception 13

Languages Primordial (Auran)

CR 5 (XP 1,800; PB +3)

Traits

Mimicry. The air elemental can mimic stolen voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.

Air Form. The air elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The air elemental makes two Thunderous Slam attacks. It can replace one attack with a use of Stolen Voices.

Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.

Stolen Voices. Wisdom Saving Throw: DC 13, one creature within 60 feet that can see or hear the stolen voice it carries. Failure: The target has the Charmed condition until the end of its next turn, and while Charmed this way, it must move toward the air elemental by the safest available route on its turn.

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

## 06. Scree Pit Burier — CR 5

**Input:** `a quarry-pit thing of living scree that buries what it catches`
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 35s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a quarry-pit thing of living scree that buries what it catches" (call)
[concept] resolve: archetype=brute type=Elemental themes=elemental/subterranean mind=mindless style=grappler energy=— mix=physical identity=✓ lore=✓
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
Scree Pit Burier
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

Shifting Scree.When the pit burier moves, the pit burier ignores difficult terrain and can move through the spaces of other creatures, and each 5-foot square it leaves behind becomes difficult terrain for other creatures.
Entomb (Bonus Action).The pit burier entombs one Medium or smaller creature it is grappling. While entombed, the target is blinded and restrained, has Total Cover against attacks and other effects outside the pit burier, and takes 7 (2d6) bludgeoning damage at the start of each of the pit burier's turns. The pit burier can have only one creature entombed at a time. If the pit burier takes 15 damage or more in a single turn from the entombed creature, the pit burier must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the pit burier. If the pit burier dies, an entombed creature breaks free prone by using 5 feet of movement.

Actions
Multiattack: The pit burier makes two Debris Slam attacks.
Debris Slam: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained.
Scree Eruption (Recharge 5-6): If the pit burier is burrowing, it erupts from the ground at a point within 5 feet of one creature. That creature must make a DC 14 Dexterity saving throw, taking 9 (2d8) bludgeoning damage on a failed save. On a failed save, the target is knocked prone. The pit burier then makes one Debris Slam attack against the target.
```

---

## 07. Hydra — CR 8

**Input:** `name: Hydra | whose stumps smoke instead of regrowing`
**Donor:** brute-5 -> CR 8
**Signature:** library · **elapsed** 28s

**`[path]` and the lines that decided it**
```
[path] twist — Hydra (is) — "Name field: Hydra" (code)
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/elemental mind=bestial style=regenerator energy=Fire mix=both identity=✓ lore=✓
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
Multiattack: The hydra makes as many Bite attacks as it has heads. It can replace one attack with a use of Burning Neck-Stumps (Recharge 5-6).
Bite: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.
Burning Neck-Stumps (Recharge 5-6): Each creature within 10 feet of the hydra must make a DC 16 Constitution saving throw, taking 35 (10d6) fire damage on a failed save, or half as much damage on a successful one.
```

---

## 08. Siege Timber Golem — CR 8

**Input:** `a siege-engine golem of lashed timber that shoulders through walls`
**Donor:** brute-5-juggernaut -> CR 8
**Signature:** library · **elapsed** 26s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a siege-engine golem of lashed timber that shoulders through walls" (call)
[concept] resolve: archetype=brute type=Construct themes=forged/armed mind=sapient style=juggernaut energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 6 against "feeble" — the card's 6 is already feeble
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 8
[reskin] mind tier: CHA 4 -> 10 — the call read this creature as ordinary at CR 8
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Slam. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage.
```

```
Siege Timber Golem

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
15
+2
+2
MOD
SAVE
CON
16
+3
+6
CHA
10
+0
+0

Skills Athletics +8, Perception +5

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Immutable Form. The timber golem can't shape-shift.

Magic Resistance. The timber golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The timber golem makes two Slam attacks.

Slam. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage.

Shoulder Breach (Recharge 5-6). Strength Saving Throw: DC 16, each creature in a 30-foot-long, 5-foot-wide Line. Failure: 38 (11d6) Bludgeoning damage, and the target is pushed up to 10 feet straight away from the timber golem, and the target has the Prone condition. Success: Half damage only.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

**`[path]` and the lines that decided it**
```
[path] twist — Stone Golem (is) — "Name field: Stone Golem" (code)
[concept] resolve: archetype=brute type=Construct themes=forged/grave mind=sapient style=juggernaut energy=— mix=physical identity=✓ lore=✓
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

Immutable Form. The golem can't shape-shift.

Magic Resistance. The golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The golem makes two attacks, using Slam or Force Bolt in any combination. It can replace one attack with (Recharge 5-6).

Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.

Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.

Splintering Shove (Recharge 5-6). Dexterity Saving Throw: DC 17, one creature within 30 feet. Failure: 31 (9d6) Bludgeoning damage, and the target is pushed up to 10 feet straight away from the golem, and the target has the Prone condition. Success: Half damage only.

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
**Donor:** lurker-5-phantom -> CR 10
**Signature:** library · **elapsed** 30s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a drowned cathedral choir that sings in one voice" (call)
[concept] resolve: archetype=lurker type=Undead themes=grave/aquatic mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[reskin] mind tier: INT 12 -> 15 — the call read this creature as capable at CR 10
[reskin] mind tier: WIS 14 -> 20 — the call read this creature as formidable at CR 10
[reskin] mind tier: CHA 15 -> 20 — the call read this creature as formidable at CR 10
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
(no attack row)
```

```
Drowned Choir
Huge undead, neutral
Armor Class

14 (natural armor)

Hit Points: 

180 (19d12 + 57)

Speed: 

5 ft., fly 60 ft. (hover), swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


6 (-2)

	

16 (+3)

	

17 (+3)

	

15 (+2)

	

20 (+5)

	

20 (+5)

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

darkvision 60 ft., passive Perception 15

Languages: 

Common plus the languages it knew in life

Challenge

10 (5,900 XP)

Proficiency Bonus:

+4

Dying Breath.When a creature within 60 feet of the drowned choir dies, the drowned choir regains 14 (4d6) hit points as the creature's last breath is drawn into its hymn.
Incorporeal Movement.The drowned choir can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
Sunlight Sensitivity.While in sunlight, the drowned choir has disadvantage on ability checks and attack rolls.

Actions
Multiattack: The drowned choir makes two Dirge attacks. It can replace one attack with a use of Drowning Hymn.
Dirge: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 30 (6d8 + 3) necrotic damage.
Drowning Hymn: One creature within 30 feet must make a DC 15 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one. On a failed save, the drowned choir regains hit points equal to half the damage dealt.
```

---

## 11. Vampire — CR 13

**Input:** `name: Vampire | who keeps a garden of thorns`
**Donor:** lurker-13 -> CR 13
**Signature:** library · **elapsed** 36s

**`[path]` and the lines that decided it**
```
[path] twist — Vampire (is) — "Name field: Vampire" (code)
[concept] resolve: archetype=lurker type=Undead themes=grave/grasping mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
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

Thornwalker.While the vampire is in brambles created by Garden of Thorns, the vampire ignores the brambles' Difficult Terrain, and its movement through the brambles doesn't require an ability check; when the brambles are destroyed, the vampire returns to normal movement.
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
Multiattack (Vampire Form Only): The vampire makes two Grave Strike attacks and uses Bite.
Grave Strike: Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) from one of two hands.
Garden of Thorns (1/Day): One creature the vampire can see within 120 feet must make a DC 17 Strength saving throw, taking 13 (3d8) necrotic damage on a failed save. On a failed save, the target is caught in brambles and is restrained until the brambles is destroyed (AC 15; HP 20; Vulnerability to fire damage; Immunity to Poison and psychic damage).
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that has the grappled, incapacitated, or restrained condition must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) piercing damage on a failed save, plus 13 (3d8) necrotic damage. The target's Hit Point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a Vampire Spawn under the vampire's control.
Legendary Actions

The vampire can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The vampire regains spent legendary actions at the start of its turn.

Deathless Strike: The vampire moves up to half its Speed, and it makes one Grave Strike attack.
Beguile: The vampire casts Command, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17). The vampire can't take this action again until the start of its next turn.
```

---

## 12. Plague Archon — CR 13

**Input:** `a plague-bearing archon of flies that commands lesser swarms`
**Donor:** defender-8-leader -> CR 13 (invented — no printed peer)
**Signature:** library · **elapsed** 26s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a plague-bearing archon of flies that commands lesser swarms" (call)
[concept] resolve: archetype=defender type=Celestial themes=celestial/venomous mind=sapient style=leader energy=Radiant mix=both identity=✓ lore=✓
[reskin] mind tier held: CHA stays 18 against "formidable" — the card's 18 is already formidable
[reskin] mind tier: INT 12 -> 20 — the call read this creature as formidable at CR 13
[reskin] mind tier: WIS 13 -> 15 — the call read this creature as capable at CR 13
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Radiant Sting. Melee Attack Roll: +10, reach 5 ft. 18 (3d8 + 5) Piercing damage plus 13 (3d8) Radiant damage.
Sermon Slam. Melee Attack Roll: +10, reach 5 ft. 32 (6d8 + 5) Bludgeoning damage.
```

```
Plague Archon

Large Celestial, Lawful Neutral

AC 18
Initiative +2 (12)

HP 190 (20d10 + 80)

Speed 30 ft., Fly 30 ft. (hover)

MOD
SAVE
STR
20
+5
+5
INT
20
+5
+5
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

Senses darkvision 60 ft.; Passive Perception 12

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Choir of Flies. Constitution Saving Throw: DC 17, any creature that starts its turn in a 20-foot Emanation originating from the archon. Failure: The target has the Poisoned condition until the start of the archon's next turn. Success: The target is immune to this creature's aura for 24 hours.

Aura of Authority. While in a 10-foot Emanation originating from the archon, the archon and its allies have Advantage on attack rolls and saving throws, provided the archon doesn't have the Incapacitated condition.

Actions

Multiattack. The archon makes three attacks, using Radiant Sting or Sermon Slam in any combination. It can replace one attack with a use of Word of Decay.

Radiant Sting. Melee Attack Roll: +10, reach 5 ft. 18 (3d8 + 5) Piercing damage plus 13 (3d8) Radiant damage.

Sermon Slam. Melee Attack Roll: +10, reach 5 ft. 32 (6d8 + 5) Bludgeoning damage.

Word of Decay. Constitution Saving Throw: DC 17, each creature in a 15-foot Emanation originating from the archon. Failure: The target has the Poisoned condition until the end of its next turn.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
**Signature:** library · **elapsed** 23s

**`[path]` and the lines that decided it**
```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[concept] resolve: archetype=brute type=Monstrosity themes=subterranean/devouring mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
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

Senses blindsight 30 ft., tremorsense 60 ft.; Passive Perception 14

Languages None

CR 15 (XP 13,000; PB +5)

Traits

Tunneler. The worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The worm makes one Bite attack and one Tail Stinger attack.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

Bonus Actions

Swallow. Strength Saving Throw: DC 21, one Large or smaller creature Grappled by the worm (it can have up to three creatures swallowed at a time). Failure: The target is swallowed by the worm, and the Grappled condition ends. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the worm, and takes 17 (5d6) Acid damage at the start of each of the worm's turns.
If the worm takes 30 damage or more on a single turn from a creature inside it, the worm must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the worm and has the Prone condition. If the worm dies, any swallowed creature no longer has the Restrained condition and can escape from the corpse using 20 feet of movement, exiting Prone.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 14. Rimewake Glacier Heart — CR 15

**Input:** `a glacier's heart given legs, trailing a wake of killing cold`
**Donor:** brute-13 -> CR 15 (invented — no printed peer)
**Signature:** library · **elapsed** 33s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a glacier's heart given legs, trailing a wake of killing cold" (call)
[concept] resolve: archetype=brute type=Elemental themes=elemental/terror mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[reskin] mind tier: INT 8 -> 3 — the call read this creature as feeble at CR 15
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 15
[reskin] mind tier: CHA 8 -> 20 — the call read this creature as formidable at CR 15
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
(no attack row)
```

```
Rimewake Glacier Heart
Huge elemental, unaligned
Armor Class

17 (natural armor)

Hit Points: 

210 (20d12 + 80)

Speed: 

40 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

10 (+0)

	

19 (+4)

	

3 (-4)

	

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

Aberrant Ground.The ground in a 10-foot radius originating from the glacier heart is Difficult Terrain.

Actions
Multiattack: The glacier heart makes two Slam attacks.
Slam: Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage plus 13 (3d8) cold damage.
Killing Cold (Recharge 5-6): Each creature in a 60-foot cone must make a DC 18 Constitution saving throw, taking 66 (12d10) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also deafened until the end of its next turn.
Killing Wake: Each creature in a 30-foot cone must make a DC 18 Constitution saving throw. On a failed save, the target's Speed is halved and it can't take Reactions until the end of the glacier heart's next turn.
```

---

## 15. Adult Red Dragon — CR 17

**Input:** `name: Adult Red Dragon | blind in one eye from an old lance`
**Donor:** dragon-15 -> CR 17
**Signature:** library · **elapsed** 33s

**`[path]` and the lines that decided it**
```
[path] twist — Adult Red Dragon (is) — "Name field: Adult Red Dragon" (code)
[concept] resolve: archetype=dragon type=Dragon themes=draconic/breath mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

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
Sight Weakness.The red dragon has disadvantage on Wisdom (Perception) checks that rely on sight.

Actions
Multiattack: The red dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray.
Rend: Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 13 (1d10 + 8) slashing damage plus 5 (2d4) fire damage.
Spellcasting: The red dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 20, +12 to hit with spell attacks): - At will: Command, Detect Magic, Scorching Ray
1/day each: Fireball
Slash Sweep: Each creature within 10 feet of the red dragon must make a DC 21 Dexterity saving throw, taking 35 (10d6) slashing damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
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
**Signature:** library · **elapsed** 30s

**`[path]` and the lines that decided it**
```
[path] homebrew — title tyrant — "a tyrant of burning brass who rules a city of forges" (call)
[concept] resolve: archetype=brute type=Construct themes=forged/elemental mind=sapient style=juggernaut energy=Fire mix=both identity=✓ lore=✓
[reskin] mind tier: INT 6 -> 15 — the call read this creature as capable at CR 17
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 17
[reskin] mind tier: CHA 4 -> 20 — the call read this creature as formidable at CR 17
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Slam. Melee Attack Roll: +12, reach 10 ft. 19 (3d8 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.
```

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

Senses darkvision 60 ft.; Passive Perception 21

Languages Common

CR 17 (XP 18,000; PB +6)

Traits

Resonant Body. A creature that hits the brass tyrant with a melee attack while within 5 feet of it takes 10 (3d6) Thunder damage and has the Deafened condition until the end of its next turn.

Legendary Resistance (3/Day). If the brass tyrant fails a saving throw, it can choose to succeed instead.

Immutable Form. The brass tyrant can't shape-shift.

Siege Monster. The brass tyrant deals double damage to objects and structures.

Actions

Multiattack. The brass tyrant makes two Slam attacks. It can replace one attack with a use of Slagbind Strike.

Slam. Melee Attack Roll: +12, reach 10 ft. 19 (3d8 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.

Furnace Flare (Recharge 5-6). Constitution Saving Throw: DC 19, each creature in a 60-foot Cone. Failure: 66 (12d10) Fire damage. Success: Half damage only.

Slagbind Strike. Dexterity Saving Throw: DC 19, one creature within 5 feet. Failure: The target has the Restrained condition until the end of its next turn.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the brass tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Crushing Advance. The brass tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Slam attack.

Breach the Walls. The brass tyrant moves up to half its Speed without provoking Opportunity Attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.

Tremor Step. Strength Saving Throw: DC 19, each creature within 10 feet of the brass tyrant. Failure: The target has the Prone condition.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
**Signature:** library · **elapsed** 28s

**`[path]` and the lines that decided it**
```
[path] twist — Pit Fiend (is) — "Name field: Pit Fiend" (code)
[concept] resolve: archetype=defender type=Fiend themes=fiendish/armed mind=sapient style=leader energy=Fire mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

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

Senses darkvision 120 ft.; Passive Perception 20

Languages Infernal; telepathy 120 ft.

CR 20 (XP 25,000; PB +6)

Traits

Legendary Resistance (3/Day). If the pit fiend fails a saving throw, it can choose to succeed instead.

Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend's aura for 24 hours.

Magic Resistance. The pit fiend has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack. It can replace one attack with a use of Infernal Command.

Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Infernal Command. Charisma Saving Throw: DC 21, one creature within 60 feet. Failure: The target has the Charmed condition until the end of its next turn.

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
**Signature:** library · **elapsed** 34s

**`[path]` and the lines that decided it**
```
[path] twist — Lich (is) — "archlich" (call)
[concept] resolve: archetype=caster type=Undead themes=grave/arcane mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**The Spellcasting row, in full**
```
Spellcasting: The bone sun archlich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19): - At will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
```

**Every attack row**
```
(no attack row)
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

Legendary Resistance (3/Day).If the bone sun archlich fails a saving throw, it can choose to succeed instead.
Spirit Jar.If destroyed, the bone sun archlich reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the bone sun archlich's lair.
Protective Magic (Reaction).The bone sun archlich casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: The bone sun archlich makes three attacks, using Eldritch Burst or Paralyzing Touch. It can replace one attack with a use of Marrow Pull.
Eldritch Burst: Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 31 (4d12 + 5) force damage.
Paralyzing Touch: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed until the start of the bone sun archlich's next turn.
Spellcasting: The bone sun archlich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19): - At will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
2/day each: Animate Dead, Dimension Door, Plane Shift
1/day each: Chain Lightning, Finger of Death, Power Word Kill, Scrying
Marrow Pull: One creature within 120 feet of the bone sun archlich must succeed on a DC 19 Strength saving throw or be pulled up to 30 feet straight toward the archlich.
Legendary Actions

The bone sun archlich can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The bone sun archlich regains spent legendary actions at the start of its turn.

Deathly Teleport: The bone sun archlich teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an Undead in a 20-foot radius originating from the bone sun archlich must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one.
Frightening Gaze: The bone sun archlich casts Fear, using the same spellcasting ability as Spellcasting. The bone sun archlich can't take this action again until the start of its next turn.
```

---

## 19. Ancient Gold Dragon — CR 24

**Input:** `name: Ancient Gold Dragon | `
**Donor:** —
**Signature:** — · **elapsed** 13s

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: Ancient Gold Dragon
[path] exact — Ancient Gold Dragon (is) — "Ancient Gold Dragon" (code)
[concept] resolve: archetype=dragon type=Dragon themes=draconic/breath mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
```

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

## 20. Hymn of the Trench — CR 24

**Input:** `a leviathan of the trench whose song drowns fleets`
**Donor:** lurker-17 -> CR 24 (invented — no printed peer)
**Signature:** library · **elapsed** 30s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a leviathan of the trench whose song drowns fleets" (call)
[concept] resolve: archetype=lurker type=Monstrosity themes=aquatic/voice mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 16 against "capable" — the card's 16 is already capable
[reskin] mind tier held: WIS stays 18 against "formidable" — the card's 18 is already formidable
[reskin] mind tier: CHA 14 -> 20 — the call read this creature as formidable at CR 24
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Tail Lash. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.
```

```
Hymn of the Trench

Gargantuan Monstrosity, Neutral

AC 20
Initiative +9 (19)

HP 437 (25d20 + 175)

Speed 40 ft., Swim 40 ft.

MOD
SAVE
STR
25
+7
+7
INT
16
+3
+10
MOD
SAVE
DEX
28
+9
+16
WIS
18
+4
+11
MOD
SAVE
CON
24
+7
+7
CHA
20
+5
+5

Skills Perception +11, Stealth +16

Senses blindsight 120 ft., tremorsense 120 ft.; Passive Perception 21

Languages Common

CR 24 (XP 62,000; PB +7)

Traits

Amphibious. The hymn can breathe air and water.

Brine Veil. While the hymn is in water, the hymn has the Invisible condition against creatures that are not in the water with it, and its Tail Lash ignores Half Cover and Three-Quarters Cover.

Legendary Resistance (3/Day). If the hymn fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The hymn makes three Tail Lash attacks.

Tail Lash. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Bonus Actions

Umbral Veil. While in Dim Light or Darkness, the hymn takes the Hide action.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the hymn can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Circle Beneath. The hymn moves up to half its Speed without provoking Opportunity Attacks, and it makes one Tail Lash attack.

Soundless Withdrawal. While in Dim Light or Darkness, the hymn takes the Hide action. The hymn can't take this action again until the start of its next turn.

Drowning Note. Wisdom Saving Throw: DC 24, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
**Signature:** dropped · **elapsed** 12s

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: Owlbear
[path] exact — Owlbear (is) — "Owlbear" (code)
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/grasping mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
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
**Signature:** dropped · **elapsed** 22s

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: Goblin Boss
[path] exact — Goblin Boss (is) — "Goblin Boss" (code)
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/grasping mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
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
**Signature:** dropped · **elapsed** 28s

**`[path]` and the lines that decided it**
```
[path] class_npc — Hobgoblin Warrior (resembles) — class fighter — "warlord" (call)
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
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

## 24. Seam-Dragger — CR 9

**Input:** `A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.`
**Donor:** brute-8-grappler -> CR 9
**Signature:** library · **elapsed** 28s

**`[path]` and the lines that decided it**
```
[path] homebrew — "A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell t" (call)
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/venomous mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier held: CHA stays 6 against "feeble" — the card's 6 is already feeble
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 9
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 17 (3d8 + 4) Piercing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).
```

```
Seam-Dragger

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

Four Scythe-Arms. Whenever it makes a Spitting Maw attack, a second creature within the seam-dragger's reach takes Piercing damage equal to the attack's Piercing damage.

Caustic Shell. A creature that hits the seam-dragger with a melee attack while within 5 feet of it takes 7 (2d6) Acid damage.

Actions

Multiattack. The seam-dragger makes two Spitting Maw attacks. It can replace one attack with a use of Carving Seam.

Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 17 (3d8 + 4) Piercing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).

Carving Seam. Constitution Saving Throw: DC 15, each creature in a 30-foot Cone. Failure: The target's Speed is halved and it can't take Reactions until the end of the seam-dragger's next turn.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 25. Blackiron Doorwarden — CR 11

**Input:** `a sentinel of black iron, AC 20, Huge, speed 20 feet`
**Donor:** defender-7-warden -> CR 11
**Signature:** library · **elapsed** 30s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a sentinel of black iron, AC 20, Huge, speed 20 feet" (call)
[concept] resolve: archetype=defender type=Construct themes=forged/grave mind=mindless style=warden energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 7 against "capable" — the call read this creature as mindless, so only "feeble" could lower its INT
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 11
[reskin] mind tier: CHA 3 -> 10 — the call read this creature as ordinary at CR 11
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
(no attack row)
```

```
Blackiron Doorwarden
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

darkvision 60 ft., passive Perception 19

Languages: 

understands the languages of its creator but can't speak

Challenge

11 (7,200 XP)

Proficiency Bonus:

+4

Tremor Watch.While the doorwarden is standing on a surface, the doorwarden knows the location of every creature touching that same surface within 60 feet, even through walls and closed doors, needing neither sight nor hearing; it cannot sense creatures airborne, hovering, or climbing above it until they strike it.
Ward Bond.The doorwarden is magically bound to a ward of its choosing, and it can have only one ward at a time. While the doorwarden is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the doorwarden.
Regeneration.The doorwarden regains 10 hit points at the start of each of its turns if it has at least 1 Hit Point.
Interpose (Reaction).When a creature within 5 feet of the doorwarden that it guards is hit by an attack roll, the attack hits the doorwarden instead, and the doorwarden has Resistance to the attack's damage.

Actions
Multiattack: The doorwarden makes two Sweeping Arms attacks.
Sweeping Arms: Melee Weapon Attack: +8 to hit, reach 10 ft. Hit: 22 (4d8 + 4) bludgeoning damage.
Iron Bulwark (2/Day): The doorwarden targets itself or one creature it can see within 60 feet. The target gains 24 (7d6) temporary hit points, and it gains a +2 bonus to AC until the end of the doorwarden's next turn.
```

---

## 26. Bogwitch Tally — CR auto

**Input:** `a marsh witch who curses trespassers, cr 7`
**Donor:** caster-8-binder -> CR 7
**Signature:** library · **elapsed** 32s

**`[path]` and the lines that decided it**
```
[path] class_npc — class mage — "witch" (call)
[concept] resolve: archetype=caster type=Humanoid themes=grave/uncanny mind=sapient style=binder energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
```

**The Spellcasting row, in full**
```
Spellcasting. The tally casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly
```

**Every attack row**
```
Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.
```

```
Bogwitch Tally

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

Actions

Multiattack. The tally makes three Arcane Burst attacks. It can replace one attack with a use of Bogrot Spittle.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. The tally casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bogrot Spittle. Constitution Saving Throw: DC 14, one creature within 30 feet. Failure: The target has the Blinded condition until the end of its next turn.

The Fen Repays. Strength Saving Throw: DC 14, each creature in a 15-foot Emanation originating from the tally. Failure: The target has the Restrained condition until the end of its next turn.

Bonus Actions

Misty Step (3/Day). The tally casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). The tally casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 27. Ashvowed Brannor — CR 6

**Input:** `a templar priest with a mace and no magic at all`
**Donor:** defender-5 -> CR 6
**Signature:** library · **elapsed** 31s

**`[path]` and the lines that decided it**
```
[path] class_npc — class paladin — "templar" (call)
[concept] resolve: archetype=defender type=Humanoid themes=armed/terror mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
```

**Every attack row**
```
Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Brannor's next turn.
```

```
Ashvowed Brannor

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

Sworn Ground. While Brannor is standing on ground he has not left since the start of the fight, Brannor can't be moved against his will by any effect, and each creature within 10 feet of him that is hidden or Invisible is revealed to him.

Aura of Authority. While in a 10-foot Emanation originating from Brannor, Brannor and its allies have Advantage on attack rolls and saving throws, provided Brannor doesn't have the Incapacitated condition.

Actions

Multiattack. Brannor makes three Mace attacks. It can replace one attack with a use of Shield Bash.

Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Brannor's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Brannor can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Parry. Trigger: Brannor is hit by a melee attack roll while holding a weapon. Response: Brannor adds 3 to its AC against that attack, possibly causing it to miss.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
**Signature:** library · **elapsed** 31s

**`[path]` and the lines that decided it**
```
[path] class_npc — class mage — "archmage" (call)
[concept] resolve: archetype=caster type=Humanoid themes=arcane/terror mind=sapient style=— energy=Force mix=energy identity=✓ lore=✓
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

Common plus five other languages, Elvish

Challenge

12 (8,400 XP)

Proficiency Bonus:

+4

Magic Resistance.Ilvareth has advantage on saving throws against spells and other magical effects.
Misty Step (3/Day) (Bonus Action).Ilvareth casts Misty Step, using the same spellcasting ability as Spellcasting.
Protective Magic (3/Day) (Reaction).When Ilvareth is hit by an attack roll, Ilvareth casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Ilvareth makes four Arcane Burst attacks. It can replace one attack with a use of Seam of Shadow.
Arcane Burst: Melee or Ranged Spell Attack: +9 to hit, reach 5 ft. or range 150 ft., one target. Hit: 27 (4d10 + 5) force damage.
Spellcasting: Ilvareth casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17): - At will: Detect Magic, Detect Thoughts, Disguise Self, Invisibility, Light, Mage Armor, Mage Hand, Prestidigitation
2/day each: Fly, Lightning Bolt
1/day each: Cone of Cold, Mind Blank, Scrying, Teleport
Seam of Shadow: One creature within 150 feet of Ilvareth must succeed on a DC 17 Constitution saving throw or be blinded until the end of its next turn.
```

---

## 29. Knellwrought Swarm — CR 13

**Input:** `a swarm of funeral bells that ring themselves over the dying`
**Donor:** swarm-9 -> CR 13 (invented — no printed peer)
**Signature:** library · **elapsed** 33s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a swarm of funeral bells that ring themselves over the dying" (call)
[concept] resolve: archetype=swarm type=Construct themes=grave/forged mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[reskin] mind tier: INT 4 -> 10 — the call read this creature as ordinary at CR 13
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 13
[reskin] mind tier: CHA 2 -> 20 — the call read this creature as formidable at CR 13
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Iron Bell. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.
```

```
Knellwrought Swarm

Medium Swarm of Tiny Constructs, Neutral

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
20
+5
+5

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned

Senses blindsight 30 ft. (blind beyond this radius); Passive Perception 15

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Death Knell. When a creature within the swarm's space is Bloodied or drops to 0 Hit Points, the swarm's Iron Bell attacks against that creature deal maximum Necrotic damage.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Multiattack. The swarm makes two Iron Bell attacks. It can replace one attack with a use of The Full Knell.

Iron Bell. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.

The Full Knell. Wisdom Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Frightened condition until the end of its next turn.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

**`[path]` and the lines that decided it**
```
[path] homebrew — "a cathedral-vault ooze that digests reliquaries" (call)
[concept] resolve: archetype=ooze type=Ooze themes=amorphous/devouring mind=mindless style=— energy=Acid mix=energy identity=✓ lore=✓
[reskin] mind tier held: INT stays 2 against "feeble" — the call read this creature as mindless, and the card's 2 is already that dim
[reskin] mind tier: WIS 8 -> 15 — the call read this creature as capable at CR 9
[reskin] mind tier: CHA 1 -> 10 — the call read this creature as ordinary at CR 9
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
(no attack row)
```

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

Seep Through the Sacred.When the vault ooze moves through an opening at least 1 inch wide, the vault ooze does not treat the opening as an impassable barrier; the opening is difficult terrain for it instead.
Amorphous.The vault ooze can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form.A creature that touches the vault ooze or hits it with a melee attack while within 5 feet of it takes 9 (2d8) acid damage.
Spider Climb.The vault ooze can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The vault ooze makes two Pseudopod attacks.
Pseudopod: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 17 (3d8 + 4) bludgeoning damage plus 11 (2d10) acid damage.
Flood the Reliquary (Recharge 5-6): One creature within 10 feet must succeed on a DC 15 Dexterity saving throw or take 28 (8d6) acid damage and be restrained until the end of its next turn.
```

---

## 31. Pealwing Drake — CR 7

**Input:** `a young storm drake whose breath is a rolling wall of thunder`
**Donor:** dragon-2 -> CR 7
**Signature:** library · **elapsed** 23s

**`[path]` and the lines that decided it**
```
[path] homebrew — "a young storm drake whose breath is a rolling wall of thunder" (call)
[concept] resolve: archetype=dragon type=Dragon themes=draconic/breath mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 12 against "ordinary" — the card's 12 is already ordinary
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 7
[reskin] mind tier: CHA 14 -> 18 — the call read this creature as formidable at CR 7
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Bite. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.
```

```
Pealwing Drake

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

Languages Draconic

CR 7 (XP 2,900; PB +3)

Actions

Multiattack. The drake makes two Bite attacks.

Bite. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.

Rolling Thunder (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

Chain Peal. Constitution Saving Throw: DC 15, one Bloodied creature the drake can see within 60 feet. Failure: If the target has 18 Hit Points or fewer, it drops to 0 Hit Points. Otherwise, it takes 18 (4d8) Thunder damage. Success: Half damage only.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 32. Stonefist Exile — CR 9

**Input:** `a stone giant exile who speaks only Giant and understands no Common`
**Donor:** brute-9 -> CR 9
**Signature:** library · **elapsed** 29s

**`[path]` and the lines that decided it**
```
[path] twist — Stone Giant (is) — "stone giant" (call)
[concept] resolve: archetype=brute type=Giant themes=subterranean/terror mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**Every attack row**
```
(no attack row)
```

```
Stonefist Exile
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

Grinding Down.When the exile hits a creature that is prone or grappled with its Stone Club attack, the Stone Club deals an extra 14 (4d6) bludgeoning damage.
Deflect Missile (Recharge 5-6) (Reaction).When the exile is hit by a ranged attack roll and takes Bludgeoning, Piercing, or slashing damage from it, the exile reduces the damage it takes from the attack by 11 (1d10 + 6), and if that damage is reduced to 0, the exile can redirect some of the attack's force. One creature the exile can see within 60 feet must make a DC 18 Dexterity saving throw, taking 11 (1d10 + 6) force damage on a failed save.

Actions
Multiattack: The exile makes two attacks: one with its Stone Club and one with its Boulder.
Stone Club: Melee Weapon Attack: +10 to hit, reach 15 ft., one target. Hit: 30 (7d6 + 6) bludgeoning damage.
Boulder: Ranged Weapon Attack: +10 to hit, range 60/240 ft., one target. Hit: 24 (4d8 + 6) bludgeoning damage.
```

---

## 33. Reed-Calmed Coil — CR 5

**Input:** `lizardfolk monk`
**Donor:** skirmisher-3 -> CR 5
**Signature:** library · **elapsed** 32s

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: lizardfolk monk — Opens with a patient, guard-breaking flurry — scales and claw strike fast, then the tail sweeps to drop a foe as a controlled strike. Every round after is reposition, read the target's weight, and answer with a precise combination; it uses the environment like a weapon and never wa
[path] class_npc — class monk — species lizardfolk — "monk" (call)
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/subterranean mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Claw), Patient Defense (patient-defense)
[reskin] class weapon: Actions/"Shortsword" -> "Unarmed Strike" — a monk fights with its hands, not the Spy's; the body's rider folds in (+7)
[reskin] class weapon: Actions/"Hand Crossbow" -> "Dart" — a monk fights with a dart, not the Spy's
```

**Every attack row**
```
(no attack row)
```

```
Reed-Calmed Coil
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

Reed-Still.While the coil hasn't taken an action, a bonus action, or a reaction since the start of its last turn, the coil has advantage on Dexterity (Stealth) checks to hide, and it leaves no tracks or wakes in mud, still water, or reeds.
Hold Breath.The coil can hold its breath for 15 minutes.
Marsh Stride.Difficult Terrain composed of mud doesn't cost the coil extra movement, and the coil can move across mud without needing to make an ability check.
Patient Defense (Bonus Action).The coil takes the Dodge action.

Actions
Multiattack: The coil makes two attacks: one with its Unarmed Strike and one with its Dart.
Unarmed Strike: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage. Once on each of the coil's turns when it hits with this attack, the target is subjected to the following effect. The target must make a DC 14 Constitution saving throw. On a failed save, the target is stunned until the end of the coil's next turn.
Dart: Ranged Weapon Attack: +6 to hit, range 20/60 ft., one target. Hit: 12 (2d8 + 3) piercing damage.
```

---

## 34. Krennik Skullstandard — CR 4

**Input:** `name: Krennik Skullstandard | riding a worg`
**Donor:** skirmisher-3-mounted -> CR 4 (invented — no printed peer)
**Signature:** library · **elapsed** 30s

**`[path]` and the lines that decided it**
```
[path] homebrew — "riding a worg" (call)
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/bestial mind=sapient style=mounted energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: CHA stays 8 against "ordinary" — the card's 8 is already ordinary
[reskin] mind tier: INT 8 -> 15 — the call read this creature as capable at CR 4
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

Totem-Warden's Way.Krennik always knows the direction to its totem and can sense any creature that has touched the totem within the last day, following that creature's trail without an ability check.
Road-Wise.Krennik ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Mounted Agility (Bonus Action).Krennik takes the Dash or Disengage action.

Actions
Multiattack: Krennik makes two attacks: one with Heavy Lance and one with Javelin.
Heavy Lance: Melee Weapon Attack: +5 to hit, reach 10 ft., one target. Hit: 8 (1d10 + 3) piercing damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) piercing damage and, if it is Medium or smaller, is knocked prone.
Javelin: Ranged Weapon Attack: +5 to hit, range 30/120 ft., one target. Hit: 6 (1d6 + 3) piercing damage.
Sweeping Pass (Recharge 5-6): Krennik moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Each target must make a DC 13 Dexterity saving throw, taking 24 (7d6) bludgeoning damage and being knocked prone on a failed save.
```

---

## 35. Well-Drowned Arm — CR 5

**Input:** `name: the thing in the well | `
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 28s

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: the thing in the well — It begins by reaching up from the dark water with a long, boneless arm to seize the ankles of whoever leans close, dragging them under. Every round after that it strikes from inside its own black well-water, coiling around limbs to pull prey down and crush and drown rather th
[path] homebrew — "the thing in the well" (call)
[concept] resolve: archetype=brute type=Monstrosity themes=aquatic/grasping mind=bestial style=grappler energy=Cold mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "ordinary" — the call read this creature as bestial, so only "feeble" could lower its INT
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 5
[reskin] class kit: none — the homebrew path takes no class kit
```

**Every attack row**
```
Arm. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.
```

```
Well-Drowned Arm

Large Monstrosity, Unaligned

AC 14
Initiative -1 (9)

HP 102 (12d10 + 36)

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
4
-3
-3

Skills Athletics +6, Perception +5

Immunities Cold

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Brine-Coil Climb. The well-drowned arm climbs difficult surfaces, including ceilings, without an ability check, and wet difficult terrain doesn't cost it extra movement.

Actions

Multiattack. The well-drowned arm makes two Arm attacks. It can replace one attack with a use of Well Drag.

Arm. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Well Drag. Strength Saving Throw: DC 13, one Medium or smaller creature the well-drowned arm is touching. Failure: 9 (2d8) Cold damage, and the well-drowned arm drags the target up to 15 feet through a wall, floor, or other solid object it can pass through; the target emerges Prone in the nearest unoccupied space at the far side. If no such space is within 15 feet, the target is not moved. Success: Half damage only.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 36. Tideglass Sentinel — CR 4

**Input:** ` | role: brute`
**Donor:** brute-2 -> CR 4
**Signature:** library · **elapsed** 29s

**`[path]` and the lines that decided it**
```
[path] blank — "role: brute" (code)
[reskin] mind tier held: WIS stays 8 against "ordinary" — the card's 8 is already ordinary
[reskin] mind tier: INT 6 -> 15 — the call read this creature as capable at CR 4
[reskin] mind tier: CHA 6 -> 15 — the call read this creature as capable at CR 4
[reskin] class kit: none — the blank path takes no class kit
```

**Every attack row**
```
Prism Slam. Melee Attack Roll: +6, reach 5 ft. 26 (5d8 + 4) Bludgeoning damage.
```

```
Tideglass Sentinel

Large Construct, Lawful Neutral

AC 13
Initiative -1 (9)

HP 75 (10d10 + 20)

Speed 30 ft., Fly 30 ft. (hover), Swim 30 ft.

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
15
+2
+2

Skills Athletics +6, Perception +1

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses blindsight 30 ft. (blind beyond this radius); Passive Perception 11

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Tremor Refraction. While a creature is in contact with the water or ground within the tideglass sentinel's blindsight, the sentinel pinpoints that creature even through total cover and knows which way it is heading.

Actions

Prism Slam. Melee Attack Roll: +6, reach 5 ft. 26 (5d8 + 4) Bludgeoning damage.

Tideglass Slam (Recharge 5-6). Strength Saving Throw: DC 14, each creature in a 15-foot Cone. Failure: The target is pushed up to 15 feet away from the tideglass sentinel and has the Prone condition.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
**Signature:** library · **elapsed** 30s

**`[path]` and the lines that decided it**
```
[path] class_npc — class barbarian — species lizardfolk — "barbarian" (call)
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/terror mind=sapient style=hurler energy=Thunder mix=both identity=✓ lore=✓
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
Multiattack: Meshrin makes three attacks, using Greataxe or Javelin. It can replace one attack with a use of Dreadful Roar.
Greataxe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (2d12 + 4) slashing damage.
Javelin: Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 18 (4d6 + 4) piercing damage.
Dreadful Roar: Each creature of Meshrin's choice in a 30-foot radius originating from Meshrin that can see or hear it must make a DC 15 Wisdom saving throw. On a failed save, the target is frightened until the start of Meshrin's next turn. On a successful save, the target is immune to this creature's terror for 24 hours.
```

---

## 38. Grave-Sworn Bladebearer — CR 6

**Input:** `a skeleton with a greatsword`
**Donor:** brute-5 -> CR 6
**Signature:** library · **elapsed** 24s

**`[path]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a skeleton with a greatsword
[path] twist — Skeleton (is) — "skeleton" (call)
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=mindless style=— energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**Every attack row**
```
Greatsword. Melee Attack Roll: +7, reach 5 ft. 14 (3d6 + 4) Slashing damage plus 7 (2d6) Necrotic damage.
Hurled Debris. Ranged Attack Roll: +7, range 60/240 ft. 18 (4d6 + 4) Slashing damage.
```

```
Grave-Sworn Bladebearer

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

Great Weapon Master. When the bladebearer hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The bladebearer makes two attacks, using Greatsword or Hurled Debris in any combination. It can replace one attack with a use of Grave-Sweeping Thrust.

Greatsword. Melee Attack Roll: +7, reach 5 ft. 14 (3d6 + 4) Slashing damage plus 7 (2d6) Necrotic damage.

Hurled Debris. Ranged Attack Roll: +7, range 60/240 ft. 18 (4d6 + 4) Slashing damage.

Grave-Sweeping Thrust. Strength Saving Throw: DC 14, one creature within 10 feet. Failure: The target has the Prone condition.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
**Signature:** library · **elapsed** 28s

**`[path]` and the lines that decided it**
```
[path] class_npc — class fighter — "sellsword" (call)
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/forged mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: fighter — "sellsword": Riposte (riposte)
```

**Every attack row**
```
(no attack row)
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

Riposte (Reaction).When a creature within 5 feet of the hired axe misses it with a melee attack roll, the hired axe makes one Handaxe attack against that creature.
Parry (Reaction).When the hired axe is hit by a melee attack roll while holding a weapon, the hired axe adds 3 to its AC against that attack, possibly causing it to miss.

Actions
Multiattack: The hired axe makes three Handaxe attacks. It can replace one attack with a use of Shortsword.
Handaxe: Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) slashing damage, and the hired axe has advantage on its next attack roll against the target before the end of its next turn.
Shortsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage. Immediately after the attack, its handaxe returns to the hired axe's grasp, and the hired axe has advantage on its next attack roll against the target before the end of its next turn.
Hurled Handaxe: One creature within 60 feet must make a DC 15 Strength saving throw, taking 10 (3d6) bludgeoning damage on a failed save.
Shield Bash: One creature within 5 feet that the hired axe can see must make a DC 15 Strength saving throw, taking 9 (2d4 + 4) bludgeoning damage on a failed save. On a failed save, if the target is a Medium or smaller creature, it is knocked prone.
```

---

## 40. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** brute-2 -> CR 3
**Signature:** library · **elapsed** 27s

**`[path]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Brother Halric — Brother Halric opens by preaching peace and offering a blessing of safe passage, then steps inside his visitors' guard to bless them at knuckle and boot while his words keep their blades sheathed. Each round he keeps his hands busy — a grapple, a shove into the pews, a knee to the r
[path] class_npc — class cleric — "Brother" (call)
[concept] resolve: archetype=brute type=Construct themes=voice/beguiling mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
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
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame. It can replace one attack with a use of Offer of Peace.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
Offer of Peace: One creature within 60 feet that can see or hear him must make a DC 13 Wisdom saving throw. On a failed save, the target is charmed until the start of Halric's next turn, and while charmed this way, it must move toward Halric by the safest available route on its turn.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
```
