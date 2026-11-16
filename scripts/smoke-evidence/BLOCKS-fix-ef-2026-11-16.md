# Blocks — fixes E and F, and the sheet the timeout ate

Round of 2026-11-16, on top of `0e1569d`. **All 29 sheets this round generated are here, marked as
they are: none threw and none timed out.** `BLOCKS-ship-2026-11-16.md` is a milestone and stays;
the two files together are the record of what shipped.

Each sheet also carries its **`[concept] identity:` and `[concept] lore:` lines uncut**, at the
owner's request — he is weighing whether to show a short description on the sheet after the ship and
wants to read what the engine writes today. This changes no behaviour and nothing on the sheet.

```
npx jest src/tools/statblock-generator src/util --maxWorkers=2 --silent  # 227 suites, 5359 passed, 26 skipped
npx jest --maxWorkers=2 --silent                                        # whole repo: 310 suites, 7425 passed
npm run build                                                           # built in 6.75s
scripts/reference-lend-checks.mjs       exit 0   0 of 72 off-CR spells, 0 fused riders
scripts/reference-class-on-people.mjs   exit 0   96 cases, 0 throws, 24 of 24 Spellcasting rows
scripts/reference-mind-dc-sweep.mjs     exit 0   0 rows above the card's DC
scripts/reference-one-name-one-row.mjs  exit 0   576 sheets, 0 with two rows of one name
scripts/scan-ship-rows.mjs <5 runs>              1 finding, and it is a control
```

## The two fixes

**Fix E — a person with no named body is a Humanoid.** Fix A required a class to be named. "Old
Marga", a name and nothing else, read `[path] class_npc — "Old Marga" (call)` on both of last
round's runs and came out `Medium Fey` once and `Medium Plant` once — the Plant being a spy with a
shortsword, a hand crossbow, Cunning Action and blindsight. The path had already said she is a
person: `dispatch` returns class_npc with no class only when the call says so AND the words are a
proper name of three words or fewer. So the class requirement is gone and everything else stands —
no printed body, no species, the call's type not already Humanoid, and the GM's words empty once the
class receipt (if any) and the typed name are removed. The function is renamed
`humanoidForAPersonWithNoBody`.

It does not decide who is a person. It fires only after the path call has answered class_npc, which
is the point at which the engine builds a person's sheet whatever the type line says.

**Fix F — the class's weapon lands on one row.** Captain Vane shipped two rows named Longsword with
different damage under a Multiattack reading "two Longsword attacks": the Guard Captain's body
already carries a Longsword, and the class-weapon pass renamed its Javelin to a second one.

*The rule.* If the body already carries a row with the class weapon's name, nothing is renamed.
Otherwise exactly one row takes it, per slot — a melee weapon on one melee row, a ranged weapon on
one ranged row.

**Which row: the first eligible one in section order.** Print lists a body's primary attack first
and its Multiattack cites that row, so renaming the first keeps the citation pointing at the row
that was already primary, and the body's secondary weapon keeps its own name *and print's own
numbers*. Every edit in the pass happens after the guard, so a skipped row is left exactly as print
had it.

### Fix F, measured on 576 sheets

Every person body print carries (36, by `isPersonBody` — a superset of the owner's 26) × 8 classes ×
2 CRs, built with a stubbed model, run at `0e1569d` and again with the fix, dumping every row both
times.

| | `0e1569d` | with fix F |
|---|---|---|
| sheets with two rows of one name | **48** | **0** |
| Multiattack citations naming no row | 0 | 0 |
| sheets that changed at all | — | **48 — exactly the 48 that had duplicates** |

No sheet without a duplicate moved. On the 48, the formerly-duplicated row and its Multiattack
citation changed, and no damage moved:

```
BEFORE  Longsword: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.
        Multiattack: Pip makes two Longsword attacks.
AFTER   Javelin:   +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.
        Multiattack: Pip makes two attacks, using Javelin or Longsword in any combination.
```

Two corrections to the harness along the way, both mine: it first reported `threw 576` (a null
archetype, which the engine refuses by design — "no silent default") and then 20 false citation
failures (the regex captured "Shortsword or Morningstar" as one name, because a row name may hold
spaces and "or" is letters). It now exits non-zero rather than printing a meaningless zero.

## The bare names, every one

| sheet | input | `[path]` | type line | set by |
|---|---|---|---|---|
| 01 Captain Vane | `Captain Vane` | `class_npc — class fighter` | Medium Humanoid | **fix A/E** |
| 02 Sister Ilse | `Sister Ilse` | `class_npc — class cleric` | Medium Humanoid | **fix A/E** |
| 03 Old Marga | `Old Marga` | `class_npc — "Old Marga"` | Medium Humanoid | **fix A/E** |
| 04 Clockwork Friar | `clockwork friar` | `class_npc — class cleric` | Medium Construct | the route call |
| 05 Father Ossic | `an undead priest` | `class_npc — Priest (is) — class cleric` | Medium Undead | the route call |
| 06 Hedge-Witch of the Fen | `a marsh witch who curses trespassers` | `class_npc — class mage` | Medium Humanoid | the route call |
| 07 Grik | `Grik` | `class_npc — "Grik"` | Medium Humanoid | **fix A/E** |
| 08 Dame Oriel | `Dame Oriel` | `class_npc — class paladin` | Medium Humanoid | **fix A/E** |
| 09 Old Marga | `Old Marga` | `class_npc — "Old Marga"` | Large Humanoid | **fix A/E** |
| 10 Old Scuttlesnape | `Old Scuttlesnape` | `homebrew — "Old Scuttlesnape"` | Large Monstrosity | the route call |
| 11 Grimjaw | `Grimjaw` | `homebrew — "Grimjaw"` | Large Beast | the route call |

**No mix.** Every sheet the path called a person is Humanoid. The two controls that keep a word —
`clockwork friar` and `an undead priest` — keep the call's type, and the undead priest also names a
printed body (`Priest (is)`), which stands the rule down on its own. Both monster-sounding names
took homebrew this run and kept the call's type (Monstrosity and Beast), which is the branch the
owner's ruling allows; on the previous run Grimjaw took class_npc and came out a Humanoid, the other
allowed branch. What is not acceptable — a person's sheet under a type that is not Humanoid — does
not appear.

**A note on the trace line.** It read "a person **with a class** and no named body is a Humanoid",
which is untrue of Old Marga, who has none. It now names the class only when there is one, and this
batch was re-run so the sheets here carry the line the shipped code writes rather than one that
lies.

## The numbers

| | |
|---|---|
| the run | **29 sheets, 0 threw, 0 timed out** |
| check-run | **1 FAIL of 29** — the Vigilant Warden, read below |
| two rows of one name, on the run | **0 of 29** |
| two rows of one name, stubbed grid | **0 of 576** (48 before) |
| the widened scan | 1 finding, and it is the `clockwork friar` control |

### The one failure

| sheet | FAIL | read |
|---|---|---|
| one-name, Vigilant Warden | `multiattack-integrity`: "The warden makes two attacks." on a sheet with no attack row at all | **Not fix F — measured, not assumed.** Below. |

The bare-names batch was re-run after the trace-line correction below, and its two earlier failures
— a Nettle Whip deriving +6 from CHA, and a pincer dealing Slashing — did not recur on the new
rolls. Neither was from these fixes (no fix here touches a derivation or a damage type), and both
are recorded here rather than dropped, because they happened.

### The Vigilant Warden, measured both ways

"A guard captain turned paladin" shipped a Multiattack and no attack rows. Fix F is what stops that
body's Javelin becoming a second Longsword, so it could not be waved off.

- On the stubbed grid, `Guard Captain | paladin | CR 4` holds **two attack rows before and after**
  the fix, so the fix does not remove rows.
- Live, the same entry re-rolled: **with fix F, 1 / 2 / 0 / 1 attack rows** across four rolls; at
  `0e1569d`, **1 / 0 / 0 / 1 / 1** across five. Two of five empty before, one of four after.

So the collapse is **pre-existing and if anything marginally rarer now**. Its chain is in the
trace and no part of it is fix F: the chassis row leaves because "the Guard Captain prints no row
for it (2 melee, 0 ranged)", the Javelin is narrowed to melee, renamed to "Slam" by anatomy, and
then Slam and Longsword are each swept by a Multiattack re-read until nothing is left. It is on the
owner's own ship path and is the one blocker I would raise by my own read.

## The goblin's broken trait — a pass ate the word

Report only, as asked. Sheet 01 of last round's people-class six, "goblin wizard" (Sniv), shipped
`Pre-Ranged Trajectory` with its opening "When" gone. **The model wrote the row whole, with the
word; the free-row repair rewrote it and dropped it:**

```
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Pre-Ranged Trajectory"
    ("Sniv has already scouted the bolt's path: when it makes a Wand attack against a creature…")
[reskin] row repair: "Pre-Ranged Trajectory" [free row] — the audit faults it (The Frightened
    carve-out is incoherent: the trigger already requires t… | The payload is a single extra damage die…)
[reskin] free row repaired: "Pre-Ranged Trajectory":
    "When Sniv makes a Shortbow attack against a creature that has no cover"
 -> "Sniv makes a Shortbow attack against a creature that has no cover from Sniv and can't see "
```

So it is the second of the two readings: **a pass wrote it, and the pass is the free-row repair.**
The audit asked it to fix two things — an incoherent Frightened carve-out and a payload that is a
single extra damage die — and its rewrite dropped the subordinating conjunction while *keeping* the
critical hit the audit had just complained about. This belongs with the repair, not with the
free-form abilities work: the repair checks only emptiness, raw tokens and dangling references, so a
sentence that has lost its "When" passes it untouched.


# Batch 1 — the bare names, eleven (fix E)

Three names alone that are new, the two monster-sounding names, a second Old Marga, and the three
controls. **0 FAIL of 11.** The table above reads every type line against its path line.

`smoke-out/bare-names-2026-11-16T02-41-50`

---

## 01. Captain Vane — CR 4

**Input:** `name: Captain Vane | `
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 30s

**Type line:** `Medium Humanoid, Neutral` — **set by** fix A/E (a person with no named body)

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Captain Vane — Captain Vane opens a fight by boarding with a thrown boarding axe and a bellowed command that rallies his spectral crew to flank and pin. Every round he stabs from behind a wall of undead sailors, spending their bodies as cover and shoving a live captive into the line to soak a blow m
[concept] expansion answered: type=Undead (type_source=user) material=grave size=Medium mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: summon
[path] class_npc — class fighter — "Captain" (call)
[route] defender-leader type=Undead mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("a bellowed command that rallies his spec") | defender-leader: key "rallies" (class verb)
[concept] type settled: Undead -> Humanoid — the GM's words are a name and the class word and nothing else, and a person with no named body is a Humanoid (owner's ruling, 2026-11-15, widened 2026-11-16); the route call had answered Undead
[concept] resolve: archetype=defender type=Humanoid typeFrom=fix A/E (a person with no named body) themes=grave/voice mind=sapient style=leader energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: fighter — "Captain": Riposte (riposte)
[reskin] class weapon: "longsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] class weapon: Actions/"Javelin" keeps its own name — "longsword" is already a row on this sheet (fix F: one name, one row)
```

**`[concept] identity:`**, uncut

> Captain Vane opens a fight by boarding with a thrown boarding axe and a bellowed command that rallies his spectral crew to flank and pin. Every round he stabs from behind a wall of undead sailors, spending their bodies as cover and shoving a live captive into the line to soak a blow meant for him. When bloodied he offers a grinning bargain — quarter for a share of the plunder — and if refused he simply vanishes into his fog-wrapped hull to fight another day.

**`[concept] lore:`**, uncut

> Captain Vane drowned with his crew in a mutiny over cursed silver and rises each foggy night to reclaim his lost ship and ransom his drowned men from the sea's debt.

**Every attack row**
```
Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.
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

Multiattack. Vane makes two attacks, using Javelin or Longsword in any combination. It can replace one attack with a use of Captain's Dread.

Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

Captain's Dread. Wisdom Saving Throw: DC 14, one creature Vane can see within 60 feet. Failure: The target has the Frightened condition until the end of its next turn. Success: The target is immune to this creature's gaze for 24 hours.

Reactions

Riposte. Trigger: A creature within 5 feet of Vane misses it with a melee attack roll. Response: Vane makes one Javelin attack against that creature.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
**Donor:** caster-6 -> CR 2
**Signature:** dropped · **elapsed** 24s

**Type line:** `Medium Humanoid, Neutral` — **set by** fix A/E (a person with no named body)

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Sister Ilse — Sister Ilse opens a fight by singing a hymn that binds one listener's feet to the spot, then closes with a silver-edged blade and a shepherd's crook while her flock of grave-wax candles scatters to blind and panic the rest. Every round she trades a cut for a whispered promise, hooking
[concept] expansion answered: type=Undead (type_source=inferred) material=bone size=Medium mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: snare
[path] class_npc — class cleric — "Sister" (call)
[route] caster-binder (controller) type=Undead mechanics=none — casts: implied by the kind — "singing a hymn that binds one listener's" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: ✓ ("singing a hymn that binds one listener's") | skirmisher-skulker: the call read "stalks" as not meaning that mechanic here — no override | lurker: the call read "stalks" as not meaning that mechanic here — no override | caster-binder stands: every key that would override it was read as a figure of speech | caster-binder: no line key in the words — the model's read of its quote
[concept] type settled: Undead -> Humanoid — the GM's words are a name and the class word and nothing else, and a person with no named body is a Humanoid (owner's ruling, 2026-11-15, widened 2026-11-16); the route call had answered Undead
[concept] resolve: archetype=caster type=Humanoid typeFrom=fix A/E (a person with no named body) themes=grave/beguiling mind=sapient style=binder energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: cleric — "Sister": Divine Aid (3/Day) (Priest/Divine Aid)
[reskin] class weapon: "mace" already names a row on this body — no row is renamed to it (fix F: one name, one row)
```

**`[concept] identity:`**, uncut

> Sister Ilse opens a fight by singing a hymn that binds one listener's feet to the spot, then closes with a silver-edged blade and a shepherd's crook while her flock of grave-wax candles scatters to blind and panic the rest. Every round she trades a cut for a whispered promise, hooking a panicked soul toward her lantern so it can be harvested later; cornered and bloodied, she does not flee — she snuffs her lantern, lets the dark take the room, and croons the last verses as she stalks the survivors by the sound of their breathing.

**`[concept] lore:`**, uncut

> A village midwife who promised the wrong saint she would never let a child of her parish die unbaptized, Ilse kept the bargain after death by turning her flock into candles and her patience into a lure.

**The Spellcasting row, in full**
```
Spellcasting. Sister Ilse casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):
- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians
```

**Every attack row**
```
Radiant Flame. Ranged Attack Roll: +5, range 60 ft. 11 (2d10) Radiant damage.
Mace. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.
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

Multiattack. Sister Ilse makes two attacks, using Mace or Radiant Flame in any combination.

Spellcasting. Sister Ilse casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Radiant Flame. Ranged Attack Roll: +5, range 60 ft. 11 (2d10) Radiant damage.

Mace. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.

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
**Donor:** lurker-2 -> CR 1
**Signature:** library · **elapsed** 31s

**Type line:** `Medium Humanoid, Neutral` — **set by** fix A/E (a person with no named body)

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Old Marga — Old Marga opens a fight by drifting through the undergrowth as a cloud of grey spores, coaxing prey to stand still and breathe deep before her thorned brambles close. Every round after that she slaps with thorned canes and keeps sowing spores until the whole grove sickens, patient as rot
[concept] expansion answered: type=Plant (type_source=inferred) material=thorn size=Large mind=bestial
[concept] expansion attack mode: melee
[concept] expansion signature: snare
[path] class_npc — "Old Marga" (call)
[route] lurker type=Plant mechanics=snare — casts: the call reads no worked magic here | hold_shape refused: the call answered reach but quoted "her thorned brambles close", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-trap: ✓ ("roots where she is and lets the intruder") | lurker-trap: no line key in the words — the model's read of its quote | lurker-trap -> lurker: a trap is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] type settled: Plant -> Humanoid — the GM's words are a name and nothing else, and a person with no named body is a Humanoid (owner's ruling, 2026-11-15, widened 2026-11-16); the route call had answered Plant
[concept] resolve: archetype=lurker type=Humanoid typeFrom=fix A/E (a person with no named body) themes=verdant mind=bestial style=— energy=Poison mix=both identity=✓ lore=✓
[reskin] class kit: none — the class_npc path takes no class kit
[reskin] multiattack re-read — "Hand Crossbow" joins the combination; "The marga makes two attacks, using Shortsword or Hand Crossbow in any combination. It can "
```

**`[concept] identity:`**, uncut

> Old Marga opens a fight by drifting through the undergrowth as a cloud of grey spores, coaxing prey to stand still and breathe deep before her thorned brambles close. Every round after that she slaps with thorned canes and keeps sowing spores until the whole grove sickens, patient as rot itself. She has no chase in her and no retreat either — she roots where she is and lets the intruder's own legs betray him.

**`[concept] lore:`**, uncut

> Old Marga is an old hedge-witch's garden that outlived its keeper, now a knot of thorn and spore that grows its own fence one victim at a time and wants nothing more than the quiet of a full, undisturbed wood.

**Every attack row**
```
Shortsword. Melee Attack Roll: +4, reach 5 ft. 5 (1d6 + 2) Piercing damage plus 7 (2d6) Poison damage.
Hand Crossbow. Ranged Attack Roll: +4, range 30/120 ft. 5 (1d6 + 2) Piercing damage.
```

```
Old Marga

Medium Humanoid, Neutral

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

Senses Passive Perception 16

Languages Common plus one other language

CR 1 (XP 200; PB +2)

Actions

Multiattack. The marga makes two attacks, using Shortsword or Hand Crossbow in any combination. It can replace one attack with a use of Grey Spores.

Shortsword. Melee Attack Roll: +4, reach 5 ft. 5 (1d6 + 2) Piercing damage plus 7 (2d6) Poison damage.

Grey Spores. Constitution Saving Throw: DC 12, one creature within 30 feet. Failure: The target has the Poisoned condition until the end of its next turn.

Hand Crossbow. Ranged Attack Roll: +4, range 30/120 ft. 5 (1d6 + 2) Piercing damage.

Bonus Actions

Cunning Action. The marga takes the Dash, Disengage, or Hide action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 04. Clockwork Friar — CR 3

**Input:** `clockwork friar`
**Donor:** brute-2 -> CR 3
**Signature:** library · **elapsed** 28s

**Type line:** `Medium Construct, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: clockwork friar — The clockwork friar clanks forward ringing its brass alms-bell, and every blow it lands tolls against the target's bones as a chime of sonic judgment. It fights in patient rounds, alternately swinging its iron-bound breviary like a mace and winding a crank that drives a punishing,
[concept] expansion answered: type=Construct (type_source=user) material=iron size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: aura
[path] class_npc — class cleric — "friar" (call)
[route] brute-juggernaut type=Construct mechanics=aura — casts: implied by the kind — "all while preaching a fixed homily at it" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("its body is iron") | brute-grappler: the call read "seize" as not meaning that mechanic here — no override | brute-juggernaut stands: every key that would override it was read as a figure of speech | brute-juggernaut: no line key in the words — the model's read of its quote | asked_mechanic "aura" is not in the list
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=forged/voice mind=sapient style=juggernaut energy=Thunder mix=both identity=✓ lore=✓
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "friar": nothing to add — the sheet already answers it
[reskin] class weapon: "mace" already names a row on this body — no row is renamed to it (fix F: one name, one row)
```

**`[concept] identity:`**, uncut

> The clockwork friar clanks forward ringing its brass alms-bell, and every blow it lands tolls against the target's bones as a chime of sonic judgment. It fights in patient rounds, alternately swinging its iron-bound breviary like a mace and winding a crank that drives a punishing, reverberating peal from its chest casing, all while preaching a fixed homily at its foes. Under pressure its gears seize into a defensive catechism—it stops swinging and rings contritely, weathering hits behind a sanctified brass guard until its springs rewind, never retreating but never breaking its script.

**`[concept] lore:`**, uncut

> A monastery's prayer machine, built to ring the hours without fail and never repaired for the sin it witnessed, the clockwork friar still keeps its office—and now tolls its bell over the skulls of any who trespass on holy ground, counting them as the congregation it was denied.

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
Clockwork Friar

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

Multiattack. The friar makes two attacks, using Mace or Radiant Flame in any combination.

Mace. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.

Tolling Judgment (Recharge 5-6). Constitution Saving Throw: DC 13, each creature in a 15-foot Emanation originating from the friar. Failure: 24 (7d6) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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

## 05. Father Ossic — CR 3

**Input:** `an undead priest`
**Donor:** caster-6 -> CR 3
**Signature:** library · **elapsed** 32s

**Type line:** `Medium Undead, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: an undead priest — The undead priest opens by raising a trembling hand and cursing the nearest living soul with a mumbled rite, then works the room from behind a wall of the congregation it has already buried, spending every round mending its own grave-flesh and calling the dead up out of the floor.
[concept] expansion answered: type=Undead (type_source=user) material=grave size=Medium mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: summon
[path] class_npc — Priest (is) — class cleric — "priest" (call)
[route] caster-binder (controller) type=Undead mechanics=none — casts: implied by the kind — "cursing the nearest living soul with a m" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: ✓ ("cursing the nearest living soul with a m") | caster-warpriest: "priest" is a noun (a title), not a verb — no override | caster-binder: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Undead typeFrom=the route call themes=grave/voice mind=sapient style=binder energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: cleric — "priest": Divine Aid (3/Day) (Priest/Divine Aid)
[reskin] class weapon: "mace" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] name follows content: Actions/"Rite of the Grasping Soil" promises the Grappled condition the row never delivers — "Rite of the Snare Soil" (the call's modifier kept, the claim word swapped for a noun the row earns)
[reskin] multiattack re-read — "Rite of the Grasping Soil" left; "Multiattack" now reads "Father Ossic makes two attacks, using Mace or Radiant Flame in any combination."
[reskin] free row repaired: "Rite of the Snare Soil": "*Strength Saving Throw*: DC 13, one creature within 30 feet. *Failure:" -> "*Dexterity Saving Throw*: DC 13, one creature within 30 feet. *Failure:* 13 (3d8) Necrotic"
```

**`[concept] identity:`**, uncut

> The undead priest opens by raising a trembling hand and cursing the nearest living soul with a mumbled rite, then works the room from behind a wall of the congregation it has already buried, spending every round mending its own grave-flesh and calling the dead up out of the floor. It is a coward made bold by company: it will not stand and trade blows, but it will not flee either, and while the last of its flock still crawls toward you it keeps preaching.

**`[concept] lore:`**, uncut

> A parish priest who broke a burial oath to keep a congregation that had stopped attending, it still holds services in the crypt and wants nothing more than a fresh, listening flock.

**The Spellcasting row, in full**
```
Spellcasting. Father Ossic casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):
- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians
```

**Every attack row**
```
Radiant Flame. Ranged Attack Roll: +5, range 60 ft. 11 (2d10) Radiant damage.
Mace. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.
```

```
Father Ossic

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

Multiattack. Father Ossic makes two attacks, using Mace or Radiant Flame in any combination.

Spellcasting. Father Ossic casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Rite of the Snare Soil. Dexterity Saving Throw: DC 13, one creature within 30 feet. Failure: 13 (3d8) Necrotic damage, and the target has the Restrained condition until the end of its next turn.

Radiant Flame. Ranged Attack Roll: +5, range 60 ft. 11 (2d10) Radiant damage.

Mace. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.

Bonus Actions

Divine Aid (3/Day). Father Ossic casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 06. Hedge-Witch of the Fen — CR 5

**Input:** `a marsh witch who curses trespassers`
**Donor:** caster-8-binder -> CR 5
**Signature:** library · **elapsed** 34s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class mage — "witch" (call)
[route] caster-binder (controller) type=Humanoid mechanics=none — casts: implied by the kind — "curses trespassers" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: ✓ ("curses trespassers") | caster-binder: key "curses" (class verb)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/subterranean mind=sapient style=binder energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] free row repaired: "Trespasser's Tithe": "*Dexterity Saving Throw*: DC 14, one creature within 60 feet. *Failure" -> "*Dexterity Saving Throw*: DC 14, one creature within 60 feet. *Failure:* 13 (3d8) Necrotic"
```

**`[concept] identity:`**, uncut

> The marsh witch opens a fight from the reeds and fog, laying a trespasser-cursing hex across the ground before the first blade is drawn, so that anyone who comes for her does so already diminished. Every round after that she keeps her distance and spends her actions stripping the party's: a rotting curse for the fighter, a binding of root and mud for the archer, a bewildering word for the cleric, letting the swamp finish what she starts. Pressured, she withdraws into the water and fog rather than trade blows, patient and vindictive, and she does not flee — she repositions, waiting for the curse to do its work.

**`[concept] lore:`**, uncut

> A hedge-witch who drowned in the fen and bargained her way back out, she now claims the marsh as her parish and hexes every stranger who crosses its boundary as payment owed.

**The Spellcasting row, in full**
```
Spellcasting. The hedge-witch casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly
```

**Every attack row**
```
Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.
```

```
Hedge-Witch of the Fen

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

Marsh Rot. A creature that hits the hedge-witch with a melee attack while within 5 feet of it has the Poisoned condition until the end of its next turn.

Actions

Multiattack. The hedge-witch makes three Arcane Burst attacks. It can replace one attack with a use of Trespasser's Tithe.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. The hedge-witch casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Trespasser's Tithe. Dexterity Saving Throw: DC 14, one creature within 60 feet. Failure: 13 (3d8) Necrotic damage.

Bonus Actions

Misty Step (3/Day). The hedge-witch casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). The hedge-witch casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 07. Grik — CR 1

**Input:** `name: Grik | `
**Donor:** lurker-2 -> CR 1
**Signature:** library · **elapsed** 30s

**Type line:** `Medium Humanoid, Neutral` — **set by** fix A/E (a person with no named body)

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Grik — Grik opens a fight by skittering up a wall or across a ceiling to drop onto the largest target, driving thorn-studded forelimbs into shoulders and neck before the prey can turn; every round after it circles just out of reach, testing with quick feints and stabbing lunges until it finds an ope
[concept] expansion answered: type=Monstrosity (type_source=inferred) material=thorn size=Small mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: grapple
[path] class_npc — "Grik" (call)
[route] lurker type=Monstrosity mechanics=grapple — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but quoted "driving thorn-studded forelimb", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-trap: ✓ ("drop onto the largest target, driving th") | lurker-trap: no line key in the words — the model's read of its quote | lurker-trap -> lurker: a trap is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] type settled: Monstrosity -> Humanoid — the GM's words are a name and nothing else, and a person with no named body is a Humanoid (owner's ruling, 2026-11-15, widened 2026-11-16); the route call had answered Monstrosity
[concept] resolve: archetype=lurker type=Humanoid typeFrom=fix A/E (a person with no named body) themes=subterranean mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the class_npc path takes no class kit
[reskin] free row repaired: "Hooked Pinning": "*Strength Saving Throw*: DC 12, one creature within 5 feet. *Failure:*" -> "*Strength Saving Throw*: DC 12, one creature within 5 feet. *Failure:* The target has the "
[reskin] multiattack re-read — "Hand Crossbow" joins the combination; "Grik makes two attacks, using Shortsword or Hand Crossbow in any combination. It can repla"
```

**`[concept] identity:`**, uncut

> Grik opens a fight by skittering up a wall or across a ceiling to drop onto the largest target, driving thorn-studded forelimbs into shoulders and neck before the prey can turn; every round after it circles just out of reach, testing with quick feints and stabbing lunges until it finds an opening. Under pressure it is a cornered animal, shrieking and fighting to the death if it cannot scramble back into its burrow — it never toys with prey and never flees the lair it guards.

**`[concept] lore:`**, uncut

> Grik is what the old mine's darkness grew teeth: a thorn-backed burrowing predator that nests in collapsed shafts and dead-end warrens, hunting whatever wanders down the wrong tunnel and dragging the bones back to line its den.

**Every attack row**
```
Shortsword. Melee Attack Roll: +4, reach 5 ft. 5 (1d6 + 2) Piercing damage plus 7 (2d6) Poison damage.
Hand Crossbow. Ranged Attack Roll: +4, range 30/120 ft. 5 (1d6 + 2) Piercing damage.
```

```
Grik

Medium Humanoid, Neutral

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

Senses Passive Perception 16

Languages Common plus one other language

CR 1 (XP 200; PB +2)

Actions

Multiattack. Grik makes two attacks, using Shortsword or Hand Crossbow in any combination. It can replace one attack with a use of Hooked Pinning.

Shortsword. Melee Attack Roll: +4, reach 5 ft. 5 (1d6 + 2) Piercing damage plus 7 (2d6) Poison damage.

Hooked Pinning. Strength Saving Throw: DC 12, one creature within 5 feet. Failure: The target has the Grappled condition (escape DC 10).

Hand Crossbow. Ranged Attack Roll: +4, range 30/120 ft. 5 (1d6 + 2) Piercing damage.

Bonus Actions

Cunning Action. Grik takes the Dash, Disengage, or Hide action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 08. Dame Oriel — CR 5

**Input:** `name: Dame Oriel | `
**Donor:** defender-5 -> CR 5
**Signature:** library · **elapsed** 31s

**Type line:** `Medium Humanoid, Neutral` — **set by** fix A/E (a person with no named body)

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Dame Oriel — Dame Oriel opens a fight from concealment, striking from the mist with a warding blow meant to drive trespassers back before they ever reach her charge. Each round after she weaves between foes, bodying them with her glass-limbed reach and laying small, precise wounds that glow where he
[concept] expansion answered: type=Celestial (type_source=inferred) material=glass size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: aura
[path] class_npc — class paladin — "Dame" (call)
[route] defender-warden type=Construct mechanics=aura — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-warden: ✓ ("a sworn guardian fights to the last of h") | defender-warden: no line key in the words — the model's read of its quote
[concept] type settled: Construct -> Humanoid — the GM's words are a name and the class word and nothing else, and a person with no named body is a Humanoid (owner's ruling, 2026-11-15, widened 2026-11-16); the route call had answered Construct
[concept] resolve: archetype=defender type=Humanoid typeFrom=fix A/E (a person with no named body) themes=celestial/grave mind=sapient style=warden energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "Dame": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
```

**`[concept] identity:`**, uncut

> Dame Oriel opens a fight from concealment, striking from the mist with a warding blow meant to drive trespassers back before they ever reach her charge. Each round after she weaves between foes, bodying them with her glass-limbed reach and laying small, precise wounds that glow where her oath-light seeps through the cracks. She does not toy and she does not flee: a sworn guardian fights to the last of her light, and if the intruders press on she grows brighter, harder to look at, until her body itself becomes the wall.

**`[concept] lore:`**, uncut

> Dame Oriel was a knight who swore to hold a threshold to the end; when she fell, her oath and the stained glass of her chapel took her up, and she still stands watch, judging each newcomer against the promise she cannot stop keeping.

**Every attack row**
```
Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.
```

```
Dame Oriel

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

CR 5 (XP 1,800; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Dame Oriel, Dame Oriel and its allies have Advantage on attack rolls and saving throws, provided Dame Oriel doesn't have the Incapacitated condition.

Actions

Multiattack. Dame Oriel makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Oath-Light Burst. Constitution Saving Throw: DC 15, each creature in a 15-foot Emanation originating from Dame Oriel. Failure: The target has the Blinded condition until the end of its next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Dame Oriel can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Parry. Trigger: Dame Oriel is hit by a melee attack roll while holding a weapon. Response: Dame Oriel adds 3 to its AC against that attack, possibly causing it to miss.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 09. Old Marga — CR 1

**Input:** `name: Old Marga | `
**Donor:** skirmisher-1 -> CR 1
**Signature:** library · **elapsed** 21s

**Type line:** `Large Humanoid, Neutral` — **set by** fix A/E (a person with no named body)

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Old Marga — Old Marga waits beneath the muck for something to step onto her shell, then lunges up with a snapping beak before dragging the victim down into the water; every round after, she clamps and rolls, grinding prey under her armored bulk while retreating into a murk she can see through and he
[concept] expansion answered: type=Beast (type_source=inferred) material=hide size=Large mind=bestial
[concept] expansion attack mode: melee
[concept] expansion signature: grapple
[path] class_npc — "Old Marga" (call)
[route] skirmisher-skulker type=Beast mechanics=grapple — casts: the call reads no worked magic here | hold_shape refused: the call answered contain but quoted "dragging the victim down into ", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-trap: a Beast sets traps; it is not one | brute-grappler: ✓ ("every round after, she clamps and rolls,") | brute-grappler -> skirmisher-skulker: the concept's VERB outranks the noun (key "hide", class verb) | skirmisher-skulker: key "hide" (class verb)
[concept] type settled: Beast -> Humanoid — the GM's words are a name and nothing else, and a person with no named body is a Humanoid (owner's ruling, 2026-11-15, widened 2026-11-16); the route call had answered Beast
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=fix A/E (a person with no named body) themes=bestial/aquatic mind=bestial style=skulker energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the class_npc path takes no class kit
```

**`[concept] identity:`**, uncut

> Old Marga waits beneath the muck for something to step onto her shell, then lunges up with a snapping beak before dragging the victim down into the water; every round after, she clamps and rolls, grinding prey under her armored bulk while retreating into a murk she can see through and her prey cannot; wounded, she does not flee but sinks and waits, patient enough to outlast a search.

**`[concept] lore:`**, uncut

> Old Marga is an ancient river turtle grown huge and mean from a century of swallowed hooks and lost children, and she wants only a quiet stretch of mud and the warm things that wander into it.

**Every attack row**
```
Shortsword. Melee Attack Roll: +4, reach 5 ft. 5 (1d6 + 2) Piercing damage plus 7 (2d6) Poison damage.
Hand Crossbow. Ranged Attack Roll: +4, range 30/120 ft. 5 (1d6 + 2) Piercing damage.
```

```
Old Marga

Large Humanoid, Neutral

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

Senses Passive Perception 16

Languages Common plus one other language

CR 1 (XP 200; PB +2)

Actions

Multiattack. The marga makes two attacks, using Shortsword or Hand Crossbow in any combination. It can replace one attack with a use of Beak Hook.

Shortsword. Melee Attack Roll: +4, reach 5 ft. 5 (1d6 + 2) Piercing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +4, range 30/120 ft. 5 (1d6 + 2) Piercing damage.

Beak Hook. Strength Saving Throw: DC 12, one creature within 5 feet. Failure: The target has the Grappled condition (escape DC 10).

Bonus Actions

Cunning Action. The marga takes the Dash, Disengage, or Hide action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 10. Old Scuttlesnape — CR 3

**Input:** `name: Old Scuttlesnape | `
**Donor:** brute-5-grappler -> CR 3
**Signature:** library · **elapsed** 30s

**Type line:** `Large Monstrosity, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Old Scuttlesnape — Old Scuttlesnape hauls its barnacled bulk from the shallows and anchors a fight on its own terms, slamming a hooked forelimb down to pin prey before its beak grinds through armor. Every round after, it drags the caught creature toward the waterline, mulching anything that stays in
[concept] expansion answered: type=Monstrosity (type_source=inferred) material=chitin size=Large mind=bestial
[concept] expansion attack mode: melee
[concept] expansion signature: grapple
[path] homebrew — "Old Scuttlesnape" (call)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but quoted "slamming a hooked forelimb dow", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("a hooked forelimb down to pin prey") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=aquatic/grasping mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "capable" — the call read this creature as bestial, so only "feeble" could lower its INT
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 3
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] free row repaired: "Ruption Lunge (Recharge 5-6)": "*Dexterity Saving Throw*: DC 12, one creature within 15 feet. *Failure" -> "*Dexterity Saving Throw*: DC 12, one creature within 15 feet. *Failure:* 13 (3d8) Bludgeon"
```

**`[concept] identity:`**, uncut

> Old Scuttlesnape hauls its barnacled bulk from the shallows and anchors a fight on its own terms, slamming a hooked forelimb down to pin prey before its beak grinds through armor. Every round after, it drags the caught creature toward the waterline, mulching anything that stays in reach with serrated mandibles while its crusted shell turns blades aside. It is a patient ambusher that gives ground only when badly bloodied, retreating into muddy water rather than dying on dry stone.

**`[concept] lore:`**, uncut

> Old Scuttlesnape is an ancient crab grown bloated and canny on the drowned offerings of a forgotten river shrine, and it wants only to drag one more warm thing down into its hoard of silt and bones.

**Every attack row**
```
Hooked Claw. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.
```

```
Old Scuttlesnape

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
4
-3
-3

Skills Athletics +5, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages None

CR 3 (XP 700; PB +2)

Actions

Multiattack. The scuttlesnape makes two Hooked Claw attacks.

Hooked Claw. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.

Ruption Lunge (Recharge 5-6). Dexterity Saving Throw: DC 12, one creature within 15 feet. Failure: 13 (3d8) Bludgeoning damage, and the target has the Prone condition.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 11. Grimjaw — CR 3

**Input:** `name: Grimjaw | `
**Donor:** brute-5-grappler -> CR 3
**Signature:** library · **elapsed** 27s

**Type line:** `Large Beast, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Grimjaw — Grimjaw hunts by sound and scent in the dark, a low burrowing ambusher that erupts from the earth under a traveller's feet to seize a leg in its oversized jaws. Once locked on, it worries and drags its prize downward into the dirt, grinding bone between flat crushing molars rather than sla
[concept] expansion answered: type=Monstrosity (type_source=inferred) material=bone size=Medium mind=bestial
[concept] expansion attack mode: melee
[concept] expansion signature: grapple
[path] homebrew — "Grimjaw" (call)
[route] brute-grappler type=Beast mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but quoted "seize a leg in its oversized j", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("seize a leg in its oversized jaws") | brute-grappler: key "seize" (class verb)
[concept] resolve: archetype=brute type=Beast typeFrom=the route call themes=subterranean/grasping mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 — the call gave no usable tier
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 3
[reskin] mind tier: CHA 4 -> 10 — the call read this creature as ordinary at CR 3
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] free row repaired: "Churning Wake": "When the grimjaw burrows, the grimjaw ignores Difficult Terrain made o" -> "While the grimjaw is burrowing, the grimjaw ignores Difficult Terrain made of loose earth,"
```

**`[concept] identity:`**, uncut

> Grimjaw hunts by sound and scent in the dark, a low burrowing ambusher that erupts from the earth under a traveller's feet to seize a leg in its oversized jaws. Once locked on, it worries and drags its prize downward into the dirt, grinding bone between flat crushing molars rather than slashing. It is a patient, territorial animal that fights to the death over a kill and retreats only to heal, never to spare prey.

**`[concept] lore:`**, uncut

> Grimjaw is a deep-soil predator pushed up from the underdark warrens, and it wants nothing more than to fill its larder with whatever warm thing strays near its burrow.

**Every attack row**
```
Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.
```

```
Grimjaw

Large Beast, Unaligned

AC 13
Initiative -1 (9)

HP 68 (8d10 + 24)

Speed 30 ft., Burrow 30 ft.

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

Senses tremorsense 30 ft.; Passive Perception 14

Languages None

CR 3 (XP 700; PB +2)

Traits

Churning Wake. While the grimjaw is burrowing, the grimjaw ignores Difficult Terrain made of loose earth, sand, gravel, or rubble, and the 10-foot-wide, 10-foot-deep patch of ground it leaves behind becomes Difficult Terrain for other creatures until the end of the grimjaw's next turn.

Actions

Multiattack. The grimjaw makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.

Erupting Ambush (Recharge 5-6). If the grimjaw is burrowing, it erupts from the ground at a point within 5 feet of one creature. Dexterity Saving Throw: DC 12, that creature. Failure: 6 (1d12) Bludgeoning damage, and the target has the Prone condition. The grimjaw then makes one Bite attack against the target.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```


# Batch 2 — the two bodies that shipped a duplicate (fix F)

The Bugbear Warrior and the Guard Captain are the only bodies that did it. **No sheet here holds
two rows with one name.** 1 FAIL of 3 — the Vigilant Warden's empty Multiattack, measured both
ways above and pre-existing.

`smoke-out/one-name-2026-11-16T02-21-05`

---

## 01. Silent Elder — CR 3

**Input:** `bugbear monk`
**Donor:** skirmisher-3 -> CR 3
**Signature:** library · **elapsed** 29s

**Type line:** `Medium Humanoid, Chaotic Evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: bugbear monk — A bugbear who has folded monastic discipline into its people's natural ambush cunning, it opens a fight from hiding with a silent stunning strike to shut down the loudest threat before the rest of the pack closes. Every round after that it flows through flurries of unarmed strikes and
[concept] expansion answered: type=Humanoid (type_source=inferred) material=bone size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: grapple
[path] filled: the head clause names the Bugbear Warrior, a people — a monk who is visibly one stands on its printed body (owner's ruling, 2026-11-15)
[path] filled: the head clause names the monk's "monk" and the call named no class — a Bugbear Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Bugbear Warrior (is) — class monk — "monk" (call)
[route] skirmisher-skulker type=Humanoid mechanics=grapple — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but quoted "a grappled and thrown foe", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-skulker: ✓ ("opens a fight from hiding with a silent ") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=subterranean/uncanny mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: stunning-strike — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: monk — "monk": Patient Defense (patient-defense)
[reskin] multiattack re-read — "Sling" left; "Multiattack" now reads "The elder makes two attacks, using Grab, or Light Hammer in any combination."
[reskin] class weapon: Actions/"Grab" -> "Unarmed Strike" — a monk fights with its hands, not the Bugbear Warrior's
[reskin] class weapon: Actions/"Light Hammer" keeps its own name — "unarmed strike" is already a row on this sheet (fix F: one name, one row)
```

**`[concept] identity:`**, uncut

> A bugbear who has folded monastic discipline into its people's natural ambush cunning, it opens a fight from hiding with a silent stunning strike to shut down the loudest threat before the rest of the pack closes. Every round after that it flows through flurries of unarmed strikes and a grappled and thrown foe, stepping between targets of opportunity and using its long reach to punish anyone who repositions. Under pressure it does not panic or flee; it goes still, patient, and cruel, picking the moment it can isolate and break one enemy at a time, because surrender is not in its discipline.

**`[concept] lore:`**, uncut

> Bugbear monasteries are rare and short-lived, founded by exiles who mastered the stillness their kin could not, but the order always reverts to old habits, and its monks still teach that the perfect ambush is the only honest prayer.

**Every attack row**
```
Unarmed Strike. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 12).
Light Hammer. Melee or Ranged Attack Roll: +5, reach 10 ft. or range 20/60 ft. 12 (2d8 + 3) Bludgeoning damage.
```

```
Silent Elder

Medium Humanoid, Chaotic Evil

AC 15
Initiative +3 (13)

HP 60 (11d8 + 11)

Speed 30 ft.

MOD
SAVE
STR
15
+2
+2
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
11
+0
+0
MOD
SAVE
CON
13
+1
+1
CHA
9
-1
-1

Skills Perception +2, Stealth +5

Senses darkvision 60 ft.; Passive Perception 12

Languages Common, Goblin

CR 3 (XP 700; PB +2)

Traits

Abduct. The elder needn't spend extra movement to move a creature it is grappling.

Actions

Multiattack. The elder makes two attacks, using Unarmed Strike or Light Hammer in any combination. It can replace one attack with a use of Stunning Palm.

Unarmed Strike. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 12).

Light Hammer. Melee or Ranged Attack Roll: +5, reach 10 ft. or range 20/60 ft. 12 (2d8 + 3) Bludgeoning damage.

Stunning Palm. Constitution Saving Throw: DC 12, one creature within 5 feet. Failure: The target has the Stunned condition until the end of its next turn.

Bonus Actions

Patient Defense. The elder takes the Dodge action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 02. Border Raid Sergeant — CR 3

**Input:** `bugbear fighter`
**Donor:** defender-3 -> CR 3
**Signature:** library · **elapsed** 28s

**Type line:** `Medium Humanoid, Chaotic Evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: bugbear fighter — A bugbear fighter opens a fight by throwing a heavy javelin from the dark, then closes with a flail and shield, using its long reach to hammer an isolated opponent from beyond their guard. Every round after that it presses the same chosen target with measured, disciplined strikes,
[concept] expansion answered: type=Humanoid (type_source=user) material=iron size=Medium mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: thrown-weapon
[path] filled: the head clause names the fighter's "fighter" and the call named no class — a Bugbear Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Bugbear Warrior (is) — class fighter — "fighter" (call)
[route] defender-leader type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("shouting orders to others of its warband") | defender-leader: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/terror mind=sapient style=leader energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: fighter — "fighter": Riposte (riposte)
[reskin] multiattack re-read — "Javelin" left; "Multiattack" now reads "The sergeant makes two attacks, using Grab, or Light Hammer in any combination."
[reskin] class weapon: Actions/"Grab" -> "Longsword" — a fighter fights with a longsword, not the Bugbear Warrior's
[reskin] class weapon: Actions/"Light Hammer" keeps its own name — "longsword" is already a row on this sheet (fix F: one name, one row)
```

**`[concept] identity:`**, uncut

> A bugbear fighter opens a fight by throwing a heavy javelin from the dark, then closes with a flail and shield, using its long reach to hammer an isolated opponent from beyond their guard. Every round after that it presses the same chosen target with measured, disciplined strikes, shoving them back to keep a bruiser's space. Under pressure it is a soldier, not a beast — it retreats bloodied to cover, dragging its wounded and shouting orders to others of its warband.

**`[concept] lore:`**, uncut

> Bugbear warband sergeants earn their scars in the border raiding companies, and they want only to bring back loot and living prisoners for their chief's tribute.

**Every attack row**
```
Longsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 13).
Light Hammer. Melee or Ranged Attack Roll: +5, reach 10 ft. or range 20/60 ft. 12 (2d8 + 3) Bludgeoning damage.
```

```
Border Raid Sergeant

Medium Humanoid, Chaotic Evil

AC 18
Initiative +2 (12)

HP 49 (9d8 + 9)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
8
-1
-1
MOD
SAVE
DEX
14
+2
+2
WIS
11
+0
+2
MOD
SAVE
CON
13
+1
+3
CHA
9
-1
-1

Skills Athletics +5, Perception +2

Senses darkvision 60 ft.; Passive Perception 12

Languages Common, Goblin

CR 3 (XP 700; PB +2)

Traits

Abduct. The sergeant needn't spend extra movement to move a creature it is grappling.

Actions

Multiattack. The sergeant makes two attacks, using Longsword or Light Hammer in any combination. It can replace one attack with a use of Shield Press.

Longsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 13).

Light Hammer. Melee or Ranged Attack Roll: +5, reach 10 ft. or range 20/60 ft. 12 (2d8 + 3) Bludgeoning damage.

Shield Press. Strength Saving Throw: DC 12, one creature within 5 feet. Failure: 13 (3d8) Bludgeoning damage, and the target is pushed up to 5 feet straight away from the sergeant.

Reactions

Riposte. Trigger: A creature within 5 feet of the sergeant misses it with a melee attack roll. Response: The sergeant makes one Longsword attack against that creature.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 03. Vigilant Warden — CR 4

**Input:** `a guard captain turned paladin`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 30s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "guard captain turned paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("guard captain turned paladin") | defender-leader: "captain" is a noun (a title), not a verb — no override | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "The warden makes two Javelin attacks."
[reskin] multiattack re-read — "Slam" left; "Multiattack" now reads "the warden makes two Longsword attacks."
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "the warden makes two attacks."
```

**`[concept] identity:`**, uncut

> The captain opens by planting their shield and calling out a challenge, daring enemies to break the line they hold. Each round they lock down one foe with disciplined strikes and a redeeming smite, punishing anyone who tries to slip past to softer targets. They are relentless but not suicidal, falling back to the last defensible chokepoint when bloodied and fighting to the death only to cover an ally's retreat.

**`[concept] lore:`**, uncut

> Once a city guard captain who took a holy oath after a failed defense, this paladin now wanders as a living bulwark, offering shelter to the weak and judgment to those who break faith.

**Every attack row**
```
(no attack row)
```

```
Vigilant Warden

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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Shielded Stance. While the warden is not Incapacitated, the warden gains a bonus to its AC equal to its Proficiency Bonus against Opportunity Attacks, and moving out of an enemy's reach does not provoke Opportunity Attacks from that enemy.

Aura of Authority. While in a 10-foot Emanation originating from the warden, the warden and its allies have Advantage on attack rolls and saving throws, provided the warden doesn't have the Incapacitated condition.

Actions

Multiattack. The warden makes two attacks.

Bonus Actions

Shield Interpose (2/Day). Each ally within 30 feet of the warden gains 7 (2d6) Temporary Hit Points.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```


# Batch 3 — a class on a people's body

0 FAIL of 6. Fixes B and C still hold, and no sheet carries a species kit or a wrong size.

`smoke-out/people-class-2026-11-16T02-22-33`

---

## 01. Snagrat — CR 3

**Input:** `goblin wizard`
**Donor:** skirmisher-3 -> CR 3
**Signature:** dropped · **elapsed** 35s

**Type line:** `Small Humanoid, Chaotic Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: goblin wizard
[path] filled: the head clause names the Goblin Warrior, a people — a mage who is visibly one stands on its printed body (owner's ruling, 2026-11-15)
[path] filled: the head clause names the mage's "wizard" and the call named no class — a Goblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Goblin Warrior (is) — class mage — "wizard" (call)
[route] caster (artillery) type=Humanoid mechanics=none — casts: on the GM's own words "goblin wizard" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("goblin wizard") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/grasping mind=sapient style=— energy=Force mix=energy identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 3 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Goblin Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "wizard": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] class weapon: Actions/"Scimitar" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Goblin Warrior's
[reskin] free row repaired: "Nerve Breaks": "While Bloodied, or when a hostile creature starts its turn within 5 fe" -> "When a hostile creature starts its turn within 5 feet of Snagrat while Snagrat is Bloodied"
```

**`[concept] identity:`**, uncut

> A skittering goblin arcanist opens a fight from cover at range, hurling crackling force-arcs and hurling cheap spellfire while it backpedals to keep a wall or a bigger ally between itself and the enemy. Each round it trades ground for distance, spending its weakest bolt to buy time and saving its one real hammer-blow spell for when a foe closes to arm's length. Bloodied, it panics and bolts for the nearest bolt-hole rather than die for a cause, though cornered it turns vicious and will burn its last magic point-blank in a spiteful screech.

**`[concept] lore:`**, uncut

> A goblin who stole a dead apprentice's spellbook and puzzled out just enough of it to be feared by its own tribe, it wants to be the one giving orders for once — and to never be caught without an escape hole again.

**The Spellcasting row, in full**
```
Spellcasting. Snagrat casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.
Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.
```

```
Snagrat

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

Nerve Breaks. When a hostile creature starts its turn within 5 feet of Snagrat while Snagrat is Bloodied, Snagrat can move up to its Speed away from that creature, ending in the nearest unoccupied space it can reach without passing through a hostile creature's space; if no such space exists, Snagrat doesn't move.

Actions

Multiattack. Snagrat makes two attacks, using Quarterstaff or Shortbow in any combination.

Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.

Spellcasting. Snagrat casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation

Bonus Actions

Nimble Escape. Snagrat takes the Disengage or Hide action.

Reactions

Protective Magic (3/Day). Snagrat casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 02. Kreegle Snagtooth — CR 1

**Input:** `goblin wizard`
**Donor:** skirmisher-1 -> CR 1
**Signature:** library · **elapsed** 36s

**Type line:** `Small Humanoid, Chaotic Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: goblin wizard
[path] filled: the head clause names the mage's "wizard" and the call named no class — a Goblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Goblin Warrior (is) — class mage — "wizard" (call)
[route] caster (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "goblin wizard" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("goblin wizard") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/bestial mind=sapient style=— energy=Force mix=both identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 1 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Goblin Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "wizard": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] class weapon: Actions/"Scimitar" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Goblin Warrior's
[reskin] free row repaired: "Hexen Brand": "When Kreegle hits a creature with Quarterstaff, the target is branded " -> "*Wisdom Saving Throw*: DC 12, one creature within 5 feet. *Failure:* 6 (1d12) Bludgeoning "
```

**`[concept] identity:`**, uncut

> A goblin wizard opens from cover with a hurled bolt and a shrieked incantation, then keeps scrambling between rocks and rubble to loose another blast, never holding one spot for two rounds. When bloodied it does not stand and trade blows — it spends its last spell to break line of sight and flees toward whatever hole or warren it came from, but a cornered one fights with scrappy, spiteful magic until it drops. All of it rides on a small, wiry body that fights far above its weight only because it never lets anything get close enough to swing.

**`[concept] lore:`**, uncut

> Born into a warren where the cleverest runt gets fed and the rest get eaten, this goblin stole its spellbook from a dead hedge-wizard and now trades petty hexes for status among its kin — and will happily ambush travelers for the reagents to keep learning more.

**The Spellcasting row, in full**
```
Spellcasting. Kreegle casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
Quarterstaff. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Bludgeoning damage.
Shortbow. Ranged Attack Roll: +4, range 80/320 ft. 5 (1d6 + 2) Piercing damage.
```

```
Kreegle Snagtooth

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

Actions

Multiattack. Kreegle makes two attacks, using Quarterstaff or Shortbow in any combination.

Quarterstaff. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Bludgeoning damage.

Shortbow. Ranged Attack Roll: +4, range 80/320 ft. 5 (1d6 + 2) Piercing damage.

Spellcasting. Kreegle casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation

Hexen Brand. Wisdom Saving Throw: DC 12, one creature within 5 feet. Failure: 6 (1d12) Bludgeoning damage.

Bonus Actions

Nimble Escape. Kreegle takes the Disengage or Hide action.

Reactions

Protective Magic (3/Day). Kreegle casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 03. Emberhatched — CR 2

**Input:** `kobold sorcerer`
**Donor:** skirmisher-1 -> CR 2
**Signature:** library · **elapsed** 30s

**Type line:** `Small Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: kobold sorcerer
[path] filled: the head clause names the mage's "sorcerer" and the call named no class — a Kobold Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Kobold Warrior (is) — class mage — "sorcerer" (call)
[route] caster (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "kobold sorcerer" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("kobold sorcerer") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=draconic/arcane mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 2 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Kobold Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "sorcerer": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] multiattack re-read — "Force Bolt" left; "Multiattack" now reads "The emberhatched makes two Dagger attacks."
[reskin] class weapon: Actions/"Dagger" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Kobold Warrior's
[reskin] free row repaired: "Spiteful Arcs (Recharge 5-6)": "The emberhatched begins gathering destructive power, its whole frame t" -> "*Dexterity Saving Throw*: DC 12, each creature in a 20-foot Emanation originating from the"
```

**`[concept] identity:`**, uncut

> The kobold sorcerer is a small, iron-scaled schemer who opens combat from cover at range, hurling bolts of sorcerous force while it shrieks orders at its allies to keep the pressure on. Every round after that it relocates, never standing where it last cast, letting its draconic blood-fueled magic do the work its frail body cannot. Under pressure it does not brawl — it flees toward its burrow or its tribe, and returns with a bigger blast and a grudge.

**`[concept] lore:`**, uncut

> Hatched in the warrens beneath a dragon's territory, a kobold sorcerer wakes one day with its ancestor's fire in its veins and spends its life trying to prove its tribe's worth — and its own — to the wyrm it worships.

**The Spellcasting row, in full**
```
Spellcasting. The emberhatched casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage.
```

```
Emberhatched

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

Pack Tactics. The emberhatched has Advantage on an attack roll against a creature if at least one of the emberhatched's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Sunlight Sensitivity. While in sunlight, the emberhatched has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The emberhatched makes two Quarterstaff attacks.

Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage.

Spellcasting. The emberhatched casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation

Spiteful Arcs (Recharge 5-6). Dexterity Saving Throw: DC 12, each creature in a 20-foot Emanation originating from the emberhatched. Failure: 10 (3d6) Lightning damage. Success: Half damage only.

Reactions

Protective Magic (3/Day). The emberhatched casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 04. Goblin Assassin — CR 3

**Input:** `goblin assassin`
**Donor:** skirmisher-3 -> CR 3
**Signature:** library · **elapsed** 34s

**Type line:** `Small Humanoid, Chaotic Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: goblin assassin — The goblin assassin shadows the pack's mark through alleys and underbrush, opening with a thrown blade or a sudden venom-laced knife from concealment before the target knows it's being hunted. Each round it darts in to stab and scuttles back out of reach, picking apart lone straggl
[concept] expansion answered: type=Humanoid (type_source=user) material=venom size=Small mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: thrown-weapon
[path] filled: the head clause names the rogue's "assassin" and the call named no class — a Goblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Goblin Warrior (is) — class rogue — "assassin" (call)
[route] skirmisher-skulker type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-skulker: ✓ ("a sudden venom-laced knife from concealm") | skirmisher-skulker: key "vanishes" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=venomous/bestial mind=sapient style=skulker energy=Poison mix=both identity=✓ lore=✓
[reskin] class kit: rogue — "assassin": Cunning Action (Assassin/Cunning Action), Evasion (evasion), Surprise Attack (assassinate)
[reskin] class weapon: "shortbow" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] class weapon: Actions/"Scimitar" -> "Shortsword" — a rogue fights with a shortsword, not the Goblin Warrior's
[reskin] free row repaired: "Venom-Coated Blade": "*Constitution Saving Throw*: DC 13, one creature within 5 feet. *Failu" -> "*Constitution Saving Throw*: DC 13, one creature within 5 feet. *Failure:* 13 (3d8) Poison"
```

**`[concept] identity:`**, uncut

> The goblin assassin shadows the pack's mark through alleys and underbrush, opening with a thrown blade or a sudden venom-laced knife from concealment before the target knows it's being hunted. Each round it darts in to stab and scuttles back out of reach, picking apart lone stragglers and using every bit of cover, height, and distraction the terrain offers. If the fight turns against it while it still has fight left, it breaks for the shadows and vanishes, only to rejoin the hunt later — it kills for pay or blood, not for glory, so it never trades blows it hasn't already stacked in its favor.

**`[concept] lore:`**, uncut

> Goblin assassins are the knife-wielders of the warren, goblins who turned their pack's cunning from brawling to murder-for-hire, taking payment in trinkets and territory to end a mark that some stronger goblin wants gone.

**Every attack row**
```
Shortsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.
Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (3d4 + 3) Piercing damage.
```

```
Goblin Assassin

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

Surprise Attack. During the first round of each combat, the goblin assassin has Advantage on attack rolls against any creature that hasn't taken a turn. If the goblin assassin hits a creature during that round, the target takes an extra 6 (1d12) Piercing damage.

Evasion. If the goblin assassin is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the goblin assassin instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The goblin assassin makes two attacks, using Shortsword or Shortbow in any combination. It can replace one attack with a use of Venom-Coated Blade.

Shortsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (3d4 + 3) Piercing damage.

Venom-Coated Blade. Constitution Saving Throw: DC 13, one creature within 5 feet. Failure: 13 (3d8) Poison damage, and the target has the Poisoned condition until the end of its next turn.

Bonus Actions

Nimble Escape. The goblin assassin takes the Disengage or Hide action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 05. War-Chant Ossian — CR 4

**Input:** `hobgoblin priest`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 30s

**Type line:** `Medium Humanoid, Lawful Evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: hobgoblin priest — A hobgoblin priest opens by planting its iron-shod staff and calling down a column of searing radiance on the rank that most needs breaking, then wades in behind its own soldiers, hammering with the staff and barking orders that knit the warband back into formation. Every round it
[concept] expansion answered: type=Humanoid (type_source=inferred) material=iron size=Medium mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: summon
[path] filled: the head clause names the Hobgoblin Warrior, a people — a cleric who is visibly one stands on its printed body (owner's ruling, 2026-11-15)
[path] filled: the head clause names the cleric's "priest" and the call named no class — a Hobgoblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Hobgoblin Warrior (is) — class cleric — "priest" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "calling down a column of searing radianc" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("spending its faith like ammunition — hea") | defender-leader: "sergeant" is a noun (a title), not a verb — no override | caster-warpriest: key "priest" (class noun)
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=armed/voice mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: Spellcasting lent by the Priest — this sheet stands on the Hobgoblin Warrior, a body that carries no spellcasting, and a cleric without it is not a cleric
[reskin] class kit: cleric — "priest": Divine Aid (3/Day) (Priest/Divine Aid)
[reskin] class weapon: Actions/"Longsword" -> "Mace" — a cleric fights with a mace, not the Hobgoblin Warrior's
[reskin] free row repaired: "Barked Order": "*Wisdom Saving Throw*: DC 13, one creature Ossian can see within 60 fe" -> "*Wisdom Saving Throw*: DC 13, one creature within 60 feet. *Failure:* The target has the F"
```

**`[concept] identity:`**, uncut

> A hobgoblin priest opens by planting its iron-shod staff and calling down a column of searing radiance on the rank that most needs breaking, then wades in behind its own soldiers, hammering with the staff and barking orders that knit the warband back into formation. Every round it fights as a sergeant of the divine, spending its faith like ammunition — healing the line, cursing the enemy's champion, and never once standing where the fighting is not. It is a zealot who believes the battle itself is the sacrament, and it will not flee while a single soldier of its legion still stands; wounded, it fights harder and louder, saving its last miracle for whoever struck it.

**`[concept] lore:`**, uncut

> Hobgoblin priests are drilled from the acolyte-pits of the war-camps, where the legion's god is taught as a drill-manual, and they march to prove that victory is the only prayer worth answering.

**The Spellcasting row, in full**
```
Spellcasting. Ossian casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):
- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians
```

**Every attack row**
```
Mace. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Bludgeoning damage.
Longbow. Ranged Attack Roll: +3, range 150/600 ft. 10 (2d8 + 1) Piercing damage.
```

```
War-Chant Ossian

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

Senses darkvision 60 ft.; Passive Perception 15

Languages Common, Goblin

CR 4 (XP 1,100; PB +2)

Traits

Pack Tactics. Ossian has Advantage on an attack roll against a creature if at least one of Ossian's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. Ossian makes two attacks, using Mace or Longbow in any combination. It can replace one attack with a use of Barked Order.

Mace. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Bludgeoning damage.

Longbow. Ranged Attack Roll: +3, range 150/600 ft. 10 (2d8 + 1) Piercing damage.

Spellcasting. Ossian casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Barked Order. Wisdom Saving Throw: DC 13, one creature within 60 feet. Failure: The target has the Frightened condition until the end of its next turn.

Bonus Actions

Divine Aid (3/Day). Ossian casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
**Signature:** dropped · **elapsed** 19s

**Type line:** `Small Dragon, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: kobold warrior
[path] exact — Kobold Warrior (is) — "Kobold Warrior" (code)
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher: ✓ ("kobold warrior") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=bestial/subterranean mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the exact path takes no class kit
[reskin] multiattack re-read — "Sling" left; "Multiattack" now reads "The kobold warrior makes two Dagger attacks."
```

**`[concept] identity:`**, uncut

> A kobold warrior opens the fight from cover, hurling a weighted dart or sling stone to wound and scatter before its packmates close; every round after that it circles at the edge of reach, darting in for a quick jab at a flanked or distracted foe and scrambling back out of the retaliation. Squeezed or bloodied, it does not stand — it shrieks, breaks for the nearest tunnel, crack, or barricade, and trusts the warren and its pack to swallow the pursuer.

**`[concept] lore:`**, uncut

> Kobold warriors are the warren's first and last line, hatchlings grown lean on tunnel-fungus and drilled since weaning to bleed intruders in the dark and vanish before the intruder can swing.

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

**0 FAIL of 8, and all eight generated** — last round's sheet 04 threw on an unrenamed
"Signature Slot". That throw is stochastic at about 1 in 6 and is first on the list after the
ship, by the owner's decision.

`smoke-out/ship-eight-2026-11-16T02-25-37`

---

## 01. Headless Horseman — CR 11

**Input:** `name: Headless Horseman | `
**Donor:** skirmisher-8-mounted -> CR 11 (invented — no printed peer)
**Signature:** library · **elapsed** 31s

**Type line:** `Medium Undead, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Headless Horseman — The Horseman opens by riding down a single mark from beyond bowshot, loosing a thrown pumpkin-head that bursts into a blinding reek before he closes with a swinging blade; every round after that he circles at a gallop, splitting his attention between hurling the next head and cut
[concept] expansion answered: type=Undead (type_source=inferred) material=bone size=Medium mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: thrown-weapon
[path] homebrew — "Headless Horseman" (call)
[route] skirmisher-mounted type=Undead mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-mounted: ✓ ("he circles at a gallop, splitting his at") | skirmisher-mounted: key "rides" (class verb) | asked_mechanic "mount up?" is not in the list | bane refused: the words carry no weakness clause and the call did not claim one, so "running water or con" is a guess from what the creature is, not the GM's ask
[concept] resolve: archetype=skirmisher type=Undead typeFrom=the route call themes=grave/terror mind=sapient style=mounted energy=Necrotic mix=both identity=✓ lore=✓
[reskin] mind tier: INT 10 -> 15 — the call read this creature as capable at CR 11
[reskin] mind tier: WIS 14 -> 20 — the call read this creature as formidable at CR 11
[reskin] mind tier: CHA 10 -> 15 — the call read this creature as capable at CR 11
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> The Horseman opens by riding down a single mark from beyond bowshot, loosing a thrown pumpkin-head that bursts into a blinding reek before he closes with a swinging blade; every round after that he circles at a gallop, splitting his attention between hurling the next head and cutting down anything that comes within reach. He is patient, methodical, and never breaks off the hunt — bloodied, he simply rides off into mist and returns when his quarry sleeps, for his temper is not rage but appointment-keeping.

**`[concept] lore:`**, uncut

> A soldier who was beheaded on a battlefield and whose severed head was never given back to him, this rider now patrols the old road with a carved pumpkin in its place, harvesting the heads of travelers one each night until he finds the right one to wear.

**Every attack row**
```
Saber. Melee Attack Roll: +9, reach 5 ft. 22 (5d6 + 5) Slashing damage. If the headless horseman moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 5 (1d10) Slashing damage and, if it is Large or smaller, has the Prone condition.
Pumpkin Head. Ranged Attack Roll: +9, range 20/60 ft. 18 (3d8 + 5) Bludgeoning damage. Until the end of the headless horseman's next turn, the headless horseman has Advantage on attack rolls against the target, and the target can't take the Hide action.
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
15
+2
+2

Skills Perception +9, Stealth +9

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 19

Languages Common plus the languages it knew in life

CR 11 (XP 7,200; PB +4)

Traits

Rider's Grace. The headless horseman ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The headless horseman makes three attacks, using Saber or Pumpkin Head in any combination.

Saber. Melee Attack Roll: +9, reach 5 ft. 22 (5d6 + 5) Slashing damage. If the headless horseman moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 5 (1d10) Slashing damage and, if it is Large or smaller, has the Prone condition.

Pumpkin Head. Ranged Attack Roll: +9, range 20/60 ft. 18 (3d8 + 5) Bludgeoning damage. Until the end of the headless horseman's next turn, the headless horseman has Advantage on attack rolls against the target, and the target can't take the Hide action.

Hoofcharge (Recharge 5-6). The headless horseman moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Dexterity Saving Throw: DC 17. Failure: 66 (12d10) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

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
**Donor:** brute-8-grappler -> CR 10
**Signature:** library · **elapsed** 33s

**Type line:** `Large Plant, Neutral Evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Pumpkin King — The Pumpkin King opens with its grin — a Gaze of hollow fire that freezes a foe in place while candle-smoke thickens into a reeking aura around it. Every round after, it fights like a harvest sovereign: pumpkin-flesh splits open to spew seed and boiling pulp at range, and its great ca
[concept] expansion answered: type=Plant (type_source=inferred) material=rot size=Large mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: gaze
[path] homebrew — title King — "Pumpkin King" (call)
[route] brute-grappler type=Plant mechanics=grapple, engulf, gaze, aura, thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("carved claws hammer and drag the nearest") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Plant typeFrom=the route call themes=verdant/gaze mind=sapient style=grappler energy=Fire mix=both identity=✓ lore=✓
[reskin] mind tier: INT 4 -> 15 — the call read this creature as capable at CR 10
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 10
[reskin] mind tier: CHA 6 -> 20 — the call read this creature as formidable at CR 10
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] free row repaired: "Searing Carapace": "At the end of each of the pumpkin king's turns, each creature in a 5-f" -> "*Constitution Saving Throw*: DC 17, each creature in a 5-foot Emanation originating from t"
```

**`[concept] identity:`**, uncut

> The Pumpkin King opens with its grin — a Gaze of hollow fire that freezes a foe in place while candle-smoke thickens into a reeking aura around it. Every round after, it fights like a harvest sovereign: pumpkin-flesh splits open to spew seed and boiling pulp at range, and its great carved claws hammer and drag the nearest foe toward the flame inside its own head. It never flees — cornered, it blooms brightest, splitting its rind to draw attackers into the burning hollow shell, patient only in the way an autumn field is patient with what it has already decided to reap.

**`[concept] lore:`**, uncut

> A king carved from the harvested dead of a thousand October fields and lit by a fire that was never meant to go out, it strides the rustling rows of its own making and wants only that every living thing join its lantern-lit court.

**Every attack row**
```
Carved Claw. Melee Attack Roll: +9, reach 10 ft. 18 (3d8 + 5) Slashing damage plus 14 (4d6) Fire damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17). While Grappled, the target has the Restrained condition.
```

```
Pumpkin King

Large Plant, Neutral Evil

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

Immunities Fire

Senses Passive Perception 16

Languages Common

CR 10 (XP 5,900; PB +4)

Actions

Multiattack. The pumpkin king makes two Carved Claw attacks. It can replace one attack with a use of Hollow Gaze.

Carved Claw. Melee Attack Roll: +9, reach 10 ft. 18 (3d8 + 5) Slashing damage plus 14 (4d6) Fire damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17). While Grappled, the target has the Restrained condition.

Hollow Gaze. Wisdom Saving Throw: DC 17, one creature the pumpkin king can see within 60 feet. Failure: 31 (9d6) Fire damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage only.

Searing Carapace. Constitution Saving Throw: DC 17, each creature in a 5-foot Emanation originating from the pumpkin king. Failure: 49 (14d6) Fire damage. Success: Half damage only.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
**Signature:** library · **elapsed** 33s

**Type line:** `Medium Construct, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Knife Ball — A Knife Ball rolls into the fight as a whirring sphere of jutting blades, opening by barreling through the nearest cluster of foes to shred everything in its path. Every round after, it ricochets off walls and ceilings to strike from unexpected angles, forcing enemies to scatter or be c
[concept] expansion answered: type=Construct (type_source=inferred) material=iron size=Medium mind=mindless
[concept] expansion attack mode: melee
[concept] expansion signature: thrown-weapon
[path] homebrew — "Knife Ball" (call)
[route] brute-juggernaut type=Construct mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("its body is iron") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=forged/armed mind=mindless style=juggernaut energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 6 against "feeble" — the call read this creature as mindless, and the card's 6 is already that dim
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] free row repaired: "Blade Roll (Recharge 5-6)": "*Dexterity Saving Throw*: DC 14, each creature in a 30-foot-long, 5-fo" -> "*Dexterity Saving Throw*: DC 14, one creature within 30 feet. *Failure:* 21 (6d6) Slashing"
```

**`[concept] identity:`**, uncut

> A Knife Ball rolls into the fight as a whirring sphere of jutting blades, opening by barreling through the nearest cluster of foes to shred everything in its path. Every round after, it ricochets off walls and ceilings to strike from unexpected angles, forcing enemies to scatter or be cut to ribbons. It has no fear and no strategy beyond momentum — it fights until broken, spinning faster as it takes damage.

**`[concept] lore:`**, uncut

> Forged by a paranoid artificer who wanted a guardian no thief could disarm, the Knife Ball escaped its vault and now rolls the corridors of the world, seeking anything warm to slice.

**Every attack row**
```
Knife. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Piercing damage, and the knife ball has Advantage on its next attack roll against the target before the end of its next turn.
```

```
Knife Ball

Medium Construct, Unaligned

AC 14
Initiative -1 (9)

HP 97 (13d8 + 39)

Speed 30 ft., Climb 30 ft.

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

Senses blindsight 30 ft. (blind beyond this radius); Passive Perception 13

Languages Understands the languages of its creator but can't speak

CR 5 (XP 1,800; PB +3)

Traits

Bloodied Fury. While Bloodied, the knife ball has Advantage on attack rolls.

Immutable Form. The knife ball can't shape-shift.

Magic Resistance. The knife ball has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The knife ball makes two Knife attacks.

Knife. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Piercing damage, and the knife ball has Advantage on its next attack roll against the target before the end of its next turn.

Blade Roll (Recharge 5-6). Dexterity Saving Throw: DC 14, one creature within 30 feet. Failure: 21 (6d6) Slashing damage, and the target has the Prone condition. Success: Half damage only.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 04. Sparkgrub — CR 3

**Input:** `goblin wizard`
**Donor:** skirmisher-3 -> CR 3
**Signature:** library · **elapsed** 31s

**Type line:** `Small Humanoid, Chaotic Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: goblin wizard
[path] filled: the head clause names the mage's "wizard" and the call named no class — a Goblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Goblin Warrior (is) — class mage — "wizard" (call)
[route] caster (artillery) type=Humanoid mechanics=none — casts: on the GM's own words "goblin wizard" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("goblin wizard") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/bestial mind=sapient style=— energy=Lightning mix=energy identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 3 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Goblin Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "wizard": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] class weapon: Actions/"Scimitar" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Goblin Warrior's
[reskin] free row repaired: "Arcing Fingers": "When the sparkgrub casts a spell that deals Lightning damage, sparks a" -> "When the sparkgrub casts a spell or hits with Quarterstaff or Shortbow, sparks arc from it"
```

**`[concept] identity:`**, uncut

> A goblin wizard opens from cover at range, hurling a crackling arcane bolt before the enemy closes, then spends every round repositioning behind trash, allies, and tight corners while snapping off cantrips and one or two prepared blasts. It is a cowardly skirmisher with a sharp little mind — it flees screaming the moment it is bloodied and cornered, but will gleefully electrocute a downed foe from ten feet away if the fight is going its way.

**`[concept] lore:`**, uncut

> Cast out of its warren for hoarding stolen spellbook pages, this goblin wizard survives by selling cheap curses and cheaper lightning to whatever tribe will feed it.

**The Spellcasting row, in full**
```
Spellcasting. The sparkgrub casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.
Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage. Until the end of the sparkgrub's next turn, the sparkgrub has Advantage on attack rolls against the target, and the target can't take the Hide action.
```

```
Sparkgrub

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

Arcing Fingers. When the sparkgrub casts a spell or hits with Quarterstaff or Shortbow, sparks arc from its fingertips, and one creature of its choice within 5 feet of the target takes 6 (1d12) Lightning damage.

Actions

Multiattack. The sparkgrub makes two attacks, using Quarterstaff or Shortbow in any combination.

Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage. Until the end of the sparkgrub's next turn, the sparkgrub has Advantage on attack rolls against the target, and the target can't take the Hide action.

Spellcasting. The sparkgrub casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation

Bonus Actions

Nimble Escape. The sparkgrub takes the Disengage or Hide action.

Reactions

Protective Magic (3/Day). The sparkgrub casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 05. Copperwrit Sorcerer — CR 2

**Input:** `kobold sorcerer`
**Donor:** skirmisher-1 -> CR 2
**Signature:** library · **elapsed** 31s

**Type line:** `Small Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: kobold sorcerer
[path] filled: the head clause names the Kobold Warrior, a people — a mage who is visibly one stands on its printed body (owner's ruling, 2026-11-15)
[path] filled: the head clause names the mage's "sorcerer" and the call named no class — a Kobold Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Kobold Warrior (is) — class mage — "sorcerer" (call)
[route] caster (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "kobold sorcerer" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("kobold sorcerer") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=draconic/venomous mind=sapient style=— energy=Lightning mix=energy identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 2 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Kobold Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "sorcerer": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] multiattack re-read — "Dragonbolt" left; "Multiattack" now reads "The sorcerer makes two Dagger attacks."
[reskin] class weapon: Actions/"Dagger" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Kobold Warrior's
```

**`[concept] identity:`**, uncut

> A Small kobold sorcerer who opens with a jittering bolt of draconic lightning loosed from talon-cupped hands, then skitters and vaults to keep rubble and packmates between itself and steel. Every round it trades distance for safety, hexing pursuers who close and shrieking for the warren to arrive before the fight can become a melee. Bloodied, it does not flee so much as collapse the tunnel behind itself and let the dark finish the argument.

**`[concept] lore:`**, uncut

> Hatched from a clutch steeped in a wyrmling's runoff, this kobold trades its hoarded copper to any dragon-kin that will spit a spark into its scales, wanting only to one day be small enough for something enormous to notice.

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
Copperwrit Sorcerer

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

Venomous Film. A creature that touches the sorcerer or hits it with a melee attack while within 5 feet of it has the Poisoned condition until the end of its next turn.

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

## 06. Dustbound Curator — CR 3

**Input:** `mummy librarian`
**Donor:** defender-3 -> CR 3
**Signature:** library · **elapsed** 31s

**Type line:** `Small Undead, Lawful Evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: mummy librarian — The mummy librarian opens a fight not by charging but by cataloguing: it reads the intruder aloud and hurls dust-choked scrolls from its shelves, each bearing a curse suited to the reader's fear. Every round it re-sorts the fight, shelving itself into a choking cloud of grave-dust
[concept] expansion answered: type=Undead (type_source=inferred) material=grave size=Medium mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: gaze
[path] twist — Mummy (is) — "mummy" (call)
[route] caster-binder (controller) type=Undead mechanics=thrown-weapon — casts refused: the call answered yes but quoted "each bearing a curse suited to", which is not in the GM's words — the word table decides | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: ✓ ("each bearing a curse suited to the reade") | caster-binder: key "reads" (class verb)
[concept] resolve: archetype=caster type=Undead typeFrom=the route call themes=grave/uncanny mind=sapient style=binder energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
```

**`[concept] identity:`**, uncut

> The mummy librarian opens a fight not by charging but by cataloguing: it reads the intruder aloud and hurls dust-choked scrolls from its shelves, each bearing a curse suited to the reader's fear. Every round it re-sorts the fight, shelving itself into a choking cloud of grave-dust to escape melee, then resuming its annotated assault from range. It fights with the patience of an archivist defending a collection — never bloodied into retreat, but coldly certain that everything in its stacks returns to its proper shelf eventually.

**`[concept] lore:`**, uncut

> Wrapped and interred beside its beloved archive, this dead scribe rose when its collection was first disturbed and now curates it with lethal precision, filing every intruder away under 'misfiled.'

**Every attack row**
```
Rotting Fist. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Bludgeoning damage plus 10 (3d6) Necrotic damage. If the target is a creature, it is cursed. While cursed, the target can't regain Hit Points, its Hit Point maximum doesn't return to normal when finishing a Long Rest, and its Hit Point maximum decreases by 10 (3d6) every 24 hours that elapse. A creature dies and turns to dust if reduced to 0 Hit Points by this attack.
```

```
Dustbound Curator

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

Skills Athletics +5, Perception +3

Vulnerabilities Fire

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus two other languages

CR 3 (XP 700; PB +2)

Actions

Multiattack. The curator makes two Rotting Fist attacks and uses Dreadful Glare. It can replace one attack with a use of Tome Slam.

Rotting Fist. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Bludgeoning damage plus 10 (3d6) Necrotic damage. If the target is a creature, it is cursed. While cursed, the target can't regain Hit Points, its Hit Point maximum doesn't return to normal when finishing a Long Rest, and its Hit Point maximum decreases by 10 (3d6) every 24 hours that elapse. A creature dies and turns to dust if reduced to 0 Hit Points by this attack.

Tome Slam. Dexterity Saving Throw: DC 11, one creature within 60 feet. Failure: 13 (3d8) Bludgeoning damage.

Dreadful Glare. Wisdom Saving Throw: DC 11, one creature the curator can see within 60 feet. Failure: The target has the Frightened condition until the end of the curator's next turn. Success: The target is immune to this mummy's Dreadful Glare for 24 hours.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 07. Reliquary Toad — CR 2

**Input:** `a silver-tongued toad the size of a pony`
**Donor:** skirmisher-3-skulker -> CR 2
**Signature:** library · **elapsed** 32s

**Type line:** `Medium Monstrosity, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a silver-tongued toad the size of a pony" (call)
[route] skirmisher-skulker type=Monstrosity mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: the call reads no worked magic in these words | skirmisher-skulker: ✓ ("silver-tongued toad") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Monstrosity typeFrom=the route call themes=beguiling/venomous mind=sapient style=skulker energy=Poison mix=both identity=✓ lore=✓
[reskin] mind tier: INT 8 -> 15 — the call read this creature as capable at CR 2
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 2
[reskin] mind tier: CHA 8 -> 18 — the call read this creature as formidable at CR 2
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] free row repaired: "Coldstill Venom": "When the toad hits a target with its Tongue Lash, the target's Speed i" -> "When the toad hits a target with its Tongue Lash, the target's Speed is halved, it can't t"
```

**`[concept] identity:`**, uncut

> It slinks into a skirmish hidden and silent, then lashes out its long, silver-glazed tongue — a whip that flickers to a target's unguarded side and leaves a numbing chill — before melting back into cover with a satisfied, throaty croak. Round after round it plays hide-and-strike, favoring the confused and the isolated, and it never fights fairly: it leads with its voice, sowing hesitation and false trust before the tongue answers. Under pressure it does not panic but simply repositions, vanishing into the brush and re-emerging where prey has stopped watching.

**`[concept] lore:`**, uncut

> Hatchery-priests of stagnant marsh temples breed silver-tongued toads to guard their reliquaries, and the creatures learn early that a pretty voice opens more doors than a strong jaw.

**Every attack row**
```
Tongue Lash. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage.
```

```
Reliquary Toad

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

Senses darkvision 30 ft.; Passive Perception 14

Languages Common

CR 2 (XP 450; PB +2)

Traits

Coldstill Venom. When the toad hits a target with its Tongue Lash, the target's Speed is halved, it can't take Reactions, and it can't speak or cast spells that require verbal components until the end of its next turn; this does not prevent casting spells that lack verbal components.

Marsh Slipper. The toad ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The toad makes two Tongue Lash attacks.

Tongue Lash. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage.

Silver Glimmer (Recharge 5-6). Wisdom Saving Throw: DC 12, each creature in a 30-foot Emanation originating from the toad. Failure: The target has the Charmed condition until the end of its next turn.

Bonus Actions

Nimble Escape. The toad takes the Disengage or Hide action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 08. Oxbow Greeder — CR 3

**Input:** `a giant river pike`
**Donor:** brute-5-grappler -> CR 3
**Signature:** library · **elapsed** 29s

**Type line:** `Huge Beast, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: a giant river pike — The giant river pike glides in near-invisible through murky shallows and opens with a single explosive rush, seizing prey in a vise of needle teeth and dragging it down into deeper water. Every round after it thrashes and worries its catch, death-rolling to tear flesh and keep t
[concept] expansion answered: type=Beast (type_source=inferred) material=bone size=Huge mind=bestial
[concept] expansion attack mode: melee
[concept] expansion signature: grapple
[path] homebrew — "a giant river pike" (call)
[route] brute-grappler type=Beast mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but quoted "seizing prey in a vise of need", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("seizing prey in a vise of needle teeth a") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Beast typeFrom=the route call themes=bestial/aquatic mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 3
[reskin] mind tier: CHA 4 -> 10 — the call read this creature as ordinary at CR 3
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> The giant river pike glides in near-invisible through murky shallows and opens with a single explosive rush, seizing prey in a vise of needle teeth and dragging it down into deeper water. Every round after it thrashes and worries its catch, death-rolling to tear flesh and keep the victim submerged and off-balance, and it never breaks off a hold it has sunk teeth into. It is territorial and greedy but not brave — when bloodied it will release its grip and bolt for the weed-beds and silt, to lurk and strike again rather than die.

**`[concept] lore:`**, uncut

> Older than the river is wide, the giant pike was grown fat on generations of drowned men and stolen nets, and it now claims the whole oxbow lake as its larder, hunting anything that floats or wades.

**Every attack row**
```
Bite. Melee Attack Roll: +6, reach 10 ft. 13 (2d8 + 4) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.
```

```
Oxbow Greeder

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
10
+0
+0

Skills Athletics +6, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages None

CR 3 (XP 700; PB +2)

Traits

Murky Shallows. While the oxbow greeder is in water, the oxbow greeder can take the Hide action even when only lightly obscured.

Actions

Multiattack. The oxbow greeder makes two Bite attacks.

Bite. Melee Attack Roll: +6, reach 10 ft. 13 (2d8 + 4) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Jaw Trap (Recharge 5-6). Dexterity Saving Throw: DC 12, one Large or smaller creature the oxbow greeder can see within 60 feet. Failure: The target is caught in teeth and has the Restrained condition until the teeth is destroyed (AC 10; HP 10; Vulnerability to Slashing damage; Immunity to Poison and Psychic damage).

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```


# Batch 5 — the Ancient Gold Dragon, filling the slot the timeout left

Sheet 19 of the 2026-11-16 forty read `[TIMED OUT / no save]` after 1,230 seconds with the owner's
machine idling. Re-run here on its own with a 900-second budget: **it generates.** 0 FAIL of 1.

`smoke-out/gold-dragon-2026-11-16T02-29-49`

---

## 01. Ancient Gold Dragon — CR 24

**Input:** `name: Ancient Gold Dragon | `
**Donor:** dragon-22 -> CR 24
**Signature:** dropped · **elapsed** 25s

**Type line:** `Gargantuan Dragon, Lawful Good` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: Ancient Gold Dragon
[path] exact — Ancient Gold Dragon (is) — "Ancient Gold Dragon" (code)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | dragon: ✓ ("Ancient Gold Dragon") | dragon: key "dragon" (class body)
[concept] resolve: archetype=dragon type=Dragon typeFrom=the route call themes=draconic/terror mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[reskin] class kit: none — the exact path takes no class kit
```

**`[concept] identity:`**, uncut

> An ancient gold dragon opens a fight by circling high and breathing a cone of scouring, molten-gold fire that washes over a whole formation, then descends to fight in melee with claws and jaws still trailing liquid flame — it is a regal, patient hunter that would rather parley first and only commits to slaughter when its terms are refused. Under pressure it never flees; it rises, repositions, and toys with its quarry for hours, testing whether they are worth the kill. Its molten hide and breath are kingdom-melting, and it knows the value of everything it burns.

**`[concept] lore:`**, uncut

> Somewhere in the high passes a gold hoard-king has slept on its treasure for a thousand years, its body slowly fusing with the metal it guards, and now it wakes only to answer insult or to collect the interest on debts no one living remembers owing.

**The Spellcasting row, in full**
```
Spellcasting. The gold dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 24, +16 to hit with spell attacks):
- At Will: Detect Magic, Guiding Bolt, Shapechange
- 1/Day Each: Flame Strike, Word of Recall, Zone of Truth
```

**Every attack row**
```
Rend. Melee Attack Roll: +17, reach 15 ft. 19 (2d8 + 10) Slashing damage plus 9 (2d8) Fire damage.
```

```
Ancient Gold Dragon

Gargantuan Dragon, Lawful Good

AC 22
Initiative +2 (12)

HP 546 (28d20 + 252)

Speed 40 ft., Fly 80 ft., Swim 40 ft.

MOD
SAVE
STR
30
+10
+10
INT
18
+4
+4
MOD
SAVE
DEX
14
+2
+9
WIS
17
+3
+10
MOD
SAVE
CON
29
+9
+9
CHA
28
+9
+9

Skills Insight +10, Perception +17, Persuasion +16, Stealth +9

Immunities Fire

Senses blindsight 60 ft., darkvision 120 ft.; Passive Perception 27

Languages Common, Draconic

CR 24 (XP 62,000; PB +7)

Traits

Legendary Resistance (4/Day). If the gold dragon fails a saving throw, it can choose to succeed instead.

Amphibious. The gold dragon can breathe air and water.

Actions

Multiattack. The gold dragon makes three Rend attacks. It can replace one attack with a use of (A) Spellcasting to cast Guiding Bolt (level 4 version) or (B) Weakening Breath.

Rend. Melee Attack Roll: +17, reach 15 ft. 19 (2d8 + 10) Slashing damage plus 9 (2d8) Fire damage.

Spellcasting. The gold dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 24, +16 to hit with spell attacks):

- At Will: Detect Magic, Guiding Bolt, Shapechange
- 1/Day Each: Flame Strike, Word of Recall, Zone of Truth

Fire Breath (Recharge 5-6). Dexterity Saving Throw: DC 24, each creature in a 90-foot Cone. Failure: 71 (13d10) Fire damage. Success: Half damage.

Weakening Breath. Strength Saving Throw: DC 24, each creature that isn't currently affected by this breath in a 90-foot Cone. Failure: The target has Disadvantage on Strength-based D20 Test and subtracts 5 (1d10) from its damage rolls. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the gold dragon can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Banish. Charisma Saving Throw: DC 24, one creature the gold dragon can see within 120 feet. Failure: 24 (7d6) Force damage, and the target has the Incapacitated condition and is transported to a harmless demiplane until the start of the gold dragon's next turn, at which point it reappears in an unoccupied space of the gold dragon's choice within 120 feet of the gold dragon. Failure or Success: the gold dragon can't take this action again until the start of its next turn.

Guiding Light. The gold dragon uses Spellcasting to cast Guiding Bolt (level 4 version).

Pounce. The gold dragon moves up to half its Speed, and it makes one Rend attack.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```


# The Pit Fiend, recovered

Sheet 17 of the 2026-11-16 forty saved an EMPTY block fence, so `BLOCKS-ship-2026-11-16.md`
carried its trace and nothing under it. The run's own `17-pit-fiend.json` still held the sheet,
and this is it, rebuilt from that file. The checker had read it all along — which is why it
reported rows (Fiery Mace, Infernal Command) for a sheet whose markdown looked blank.

`smoke-out/sweep-2026-11-16T00-38-16/17-pit-fiend.json`

```
Pit Fiend
Large Fiend, Lawful Evil

AC 21
HP 337
Hit Points 27d10 + 189
Speed 30 ft., Fly 60 ft. (hover)
Senses darkvision 120 ft.; Passive Perception 20
Languages Infernal; telepathy 120 ft.
CR 20

STR 26  DEX 14  CON 24  INT 22  WIS 18  CHA 24

Traits
Fear Aura. The fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. *Wisdom Saving Throw*: DC 21, any enemy that starts its turn in the aura. *Failure:*  The target has the Frightened condition until the start of its next turn. *Success:*  The target is immune to this pit fiend's aura for 24 hours.
Legendary Resistance (3/Day). If the fiend fails a saving throw, it can choose to succeed instead.
Diabolical Restoration. If the fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.
Magic Resistance. The fiend has Advantage on saving throws against spells and other magical effects.

Actions
Multiattack. The fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack. It can replace one attack with a use of Infernal Command.
Bite. *Melee Attack Roll:* +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. *Constitution Saving Throw*: DC 21. *Failure:*  The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.
Fiery Mace. *Melee Attack Roll:* +14, reach 10 ft. 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.
Devilish Claw. *Melee Attack Roll:* +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.
Infernal Command. *Wisdom Saving Throw*: DC 21, one creature within 60 feet. *Failure:* The target has the Charmed condition until the end of its next turn.
Hellfire Spellcasting (Recharge 4-6). The fiend casts *Fireball* (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21). It can replace one *Fireball* with *Hold Monster* (level 7 version) or *Wall of Fire*.
```
