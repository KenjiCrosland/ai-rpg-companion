# Blocks — harness part 2: skips, partial replay, readable misses

Branch `statblock-enhancments-part-2`, on top of `982934d`. No product code changed.

**All 15 sheets this round generated are here, marked as they are: none threw and none timed out.**
They are the live-from-the-audit-call run, three rolls each on five frozen sheets. The strict replay
of the forty made no model calls and generated no new sheets, so it has none to commit.

`BLOCKS-harness-2026-11-16.md` is the branch's opening forty and stays, as do the three files that
record what shipped.

```
# strict (the default): a miss fails
node scripts/smoke-statblock.mjs --replay <recording-dir>

# pass-through: a hit is served, a miss goes live, the result is written to a NEW recording
node scripts/smoke-statblock.mjs --replay <recording-dir> --pass-through

# live from a named call, re-rolled: everything before it is served, it and everything after goes live
node scripts/smoke-statblock.mjs --replay <recording-dir> --live-from audit --rolls 3
```

## Strict replay now ends clean, twice

```
REPLAY: 37 of 37 reproduced EXACTLY, 3 skipped (not replayable)     exit 0
REPLAY: 37 of 37 reproduced EXACTLY, 3 skipped (not replayable)     exit 0
```

106 and 107 seconds. No model calls.

**How a generation is marked not replayable.** A `replay` object in its own recording file, which is
the only place that knows:

```json
"replay": { "skip": true, "why": "a blank form rolls its whole creature — type, traits, energy, naming (buildRandomConceptSeed)" }
```

Strict replay prints the sheet as `SKIPPED — <why>`, counts it apart, and does not run it. The two
live modes still do. The three:

| sheet | why |
|---|---|
| 21 Owlbear | a post-save enrichment call, outside generation, mutates the saved sheet; its timing is a race |
| 22 Goblin Boss | the CR the user did not set is rolled locally (`rollRandomCR`) and lands in the route prompt |
| 36 (blank) | a blank form rolls its whole creature — type, traits, energy, naming (`buildRandomConceptSeed`) |

The dice are not seeded and the post-save call is untouched, per the ruling.

## The thirteen calls, and how each is recognised

Read off the recorded forty rather than guessed from the code: **all 434 of its calls start with one
of these lines, and none was unrecognised.** The line is a literal in the builder, not assembled
from the concept, which is why it is a safe handle.

| call | builder | opening line |
|---|---|---|
| `path` | `buildPathPrompt` | A game master filled in a monster form |
| `route` | `buildRoutePrompt` | Route this D&D monster concept onto ONE chassis |
| `seed` | `buildSeedSynthesisPrompt` | Fuse these randomly rolled traits |
| `identity` | `buildIdentityPrompt` | Sketch this D&D monster concept's combat identity |
| `reskin` | `buildReskinPrompt` | You are reskinning a mechanical monster chassis |
| `idea` | `buildIdeaPrompt` | You are inventing the SIGNATURE ability |
| `fit` | `buildFitPrompt` | A monster's signature ability has been described in plain words |
| `seat` | `buildSeatPrompt` | You are writing ONE ability for a D&D monster |
| `audit` | `buildAuditPrompt` | You are auditing a D&D |
| `repair` | `buildRepairPrompt` | You are repairing the ABILITIES |
| `free-row-fix` | `buildFreeRowFixPrompt` | You are REPAIRING one ability |
| `legacy` | `fromLegacyModel` | You are converting D&D statblock entries |
| `enrichment` | `buildEnrichmentPrompt` | You are generating creature intelligence data |

Their counts across the forty: fit 73, seat 48, route 40, enrichment 40, identity 39, reskin 39,
idea 39, audit 39, path 27, free-row-fix 25, legacy 19, repair 4, seed 2.

## A miss a person can read

From a deliberate one-word change — `MECHANICAL defects` to `STRUCTURAL defects` in the audit
prompt:

```
[harness] REPLAY MISS — the audit call (buildAuditPrompt) — first differs at line 1 of 265
  nearest recorded prompt: the same call in this generation, 57 characters shared
  -   1 | You are auditing a D&D 2024-format monster statblock for STRUCTURAL defects.
  +   1 | You are auditing a D&D 2024-format monster statblock for MECHANICAL defects.
      2 | Deterministic checks (math, DCs, damage bands, known formatting rules) have
[harness] the whole prompt, and every recorded one, is in 01-REPLAY-MISS.txt
```

It names the call by its builder, finds the nearest recorded prompt of the **same family** (so a
changed prompt is never compared against a different call that happens to share a word), gives the
first line that differs with a line of context, and says how much the two share. The whole prompt
and every recorded prompt of that generation go to a file beside the sheet.

**A miss can no longer open the circuit breaker, in any mode.** `recordFailure` in `ai-client.mjs`
fires on a non-2xx, an error-shaped body, or a thrown fetch, and three of those open a breaker that
is **persisted in localStorage** — which is how a 500 once stamped `degraded: true` on every later
sheet and made 17 sheets of a forty differ for a reason unrelated to the code. A miss now answers
**200** with a well-formed provider envelope whose content fails the caller's own validator, so the
call fails as a validation failure and the breaker is never touched. The breaker key is also cleared
before every entry, as a second line. In the live modes a miss does not arise at all: it goes live.

## What the tape was cut against

Each recording now stores, once, the **system turn** and the **model** the request carried, and
replay says plainly when either differs from what the page sends now — the key is the user turn
only, so a changed system turn would otherwise be invisible while every answer on the tape was given
under the old one.

The forty was recorded before the field existed. Rather than assume its values I recovered what the
tape itself proves: **the provider echoes the model in every response**, so `model: "deepseek-flash"`
is read back from the 434 recorded answers. The system turn is not echoed, so it is stored as `null`
with a note, and replay says `this tape does not record the system turn it was cut against — only
the model could be checked`. Recordings cut from now on carry both, including the fifteen below.

## Live from the audit call: tape against live, and how much one step varies

| sheet | from the tape | live | rolls identical |
|---|---|---|---|
| Bog Hound (CR 1) | 7 | 4 | **1 of 3** |
| Swarmshear (CR 13) | 8 | 5 | **1 of 3** |
| Scythe-Brood Horror (CR 9) | 9 | 3 | **2 of 3** |
| Chrismal Ossuary (CR 9) | 9 | 5 | **1 of 3** |
| Unyielded Champion (CR 5) | 9 | 4 | **1 of 3** |

**On four of five frozen sheets, re-rolling from the audit onward gave a different sheet every
time.** That is the first measure of how much one step varies with everything before it held
constant, and it is worth reading before any later step is judged by a forty: a difference of this
size is the audit and repair, not the change under test.

One case is worth naming. **Scythe-Brood Horror rolls 8 and 9 produced an identical sheet from
different audit complaints** — roll 8 faulted Caustic Shell and Spitting Maw, roll 9 faulted
Brood-Limb Pin, Caustic Shell and Horrid Display — because nothing was repaired on either. The
audit's findings vary more than the sheet does wherever the repair declines to act.

## The three rolls side by side

One step re-rolled on a frozen sheet: everything up to the audit call is served from the tape,
the audit call and everything after it goes live. So the only thing that varies is the audit,
the repair, and the passes that follow them.

### Bog Hound — `a mud-caked bog hound that drags fishermen under`

**7 calls from the tape, 4 live.** **1 of 3 rolls produced an identical sheet.**

| roll | sheet | rows the audit faulted | rows the repair rewrote | rows renamed |
|---|---|---|---|---|
| 1 | `fb4c5964` | Drag Prone, Mud-Caked Hide | Mud-Caked Hide | — |
| 2 | `66e94472` | Mud-Caked Hide | Mud-Caked Hide | — |
| 3 | `73753629` | Mud-Caked Hide | Mud-Caked Hide | — |

### Swarmshear — `a plague-bearing archon of flies that commands lesser swarms`

**8 calls from the tape, 5 live.** **1 of 3 rolls produced an identical sheet.**

| roll | sheet | rows the audit faulted | rows the repair rewrote | rows renamed |
|---|---|---|---|---|
| 4 | `bb28f18f` | Contemptuous Sway, Plague Aura, Swarmwright's Command | Plague Aura, Swarmwright's Command | — |
| 5 | `97025710` | Plague Aura, Swarmwright's Command | Plague Aura, Swarmwright's Command | — |
| 6 | `9a1a9d49` | Multiattack, Plague Aura, Swarmwright's Command | Plague Aura, Swarmwright's Command | — |

### Scythe-Brood Horror — `A Large insectile horror. It has four scythe-arms, a spitting ma`

**9 calls from the tape, 3 live.** **2 of 3 rolls produced an identical sheet.**

| roll | sheet | rows the audit faulted | rows the repair rewrote | rows renamed |
|---|---|---|---|---|
| 7 | `dddc2a87` | Brood-Limb Pin, Caustic Shell, Spitting Maw | — | — |
| 8 | `39266e80` | Caustic Shell, Spitting Maw | — | — |
| 9 | `39266e80` | Brood-Limb Pin, Caustic Shell, Horrid Display | — | — |

### Chrismal Ossuary — `a cathedral-vault ooze that digests reliquaries`

**9 calls from the tape, 5 live.** **1 of 3 rolls produced an identical sheet.**

| roll | sheet | rows the audit faulted | rows the repair rewrote | rows renamed |
|---|---|---|---|---|
| 10 | `120c6cc0` | Fouling Residue | Fouling Residue | — |
| 11 | `94d2d6fc` | Fouling Residue | Fouling Residue, Reliquary Swallow (Recharge 5-6) | — |
| 12 | `fca5ea07` | Fouling Residue | Fouling Residue, Reliquary Swallow (Recharge 5-6) | — |

### Unyielded Champion — `a skeleton with a greatsword`

**9 calls from the tape, 4 live.** **1 of 3 rolls produced an identical sheet.**

| roll | sheet | rows the audit faulted | rows the repair rewrote | rows renamed |
|---|---|---|---|---|
| 13 | `439793dc` | Closing Blade | Closing Blade | — |
| 14 | `4e14bbc7` | — | — | — |
| 15 | `04b6bf47` | Closing Blade | Closing Blade | — |



# The fifteen sheets — three rolls each, live from the audit call

Every sheet as it is. **15 sheets, 0 threw, 0 timed out.** Each carries its `[concept] identity:`
and `[concept] lore:` lines uncut. The frozen half of every generation is byte-identical to the
recorded forty; only the audit call onward was live.

`smoke-out/audit-2026-11-16T20-51-23`

---

## 01. Bog Hound — CR 1

**Input:** `a mud-caked bog hound that drags fishermen under`
**Donor:** brute-5-grappler -> CR 1
**Signature:** library · **elapsed** 14s

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
[reskin] free row repaired: "Mud-Caked Hide": "While the bog hound remains motionless, it is indistinguishable from t" -> "While the bog hound remains motionless and has used its action to flatten itself into the "
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

Mud-Caked Hide.While the bog hound remains motionless and has used its action to flatten itself into the mud or riverbank, the bog hound is indistinguishable from the terrain until it moves or attacks, and a creature notices it only by succeeding on a Wisdom (Perception) check against a DC of DC 13.

Actions
Multiattack: The bog hound makes two Bite attacks. It can replace one attack with a use of Trampling Shove.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained.
Trampling Shove: Each creature in a 15-foot cone must make a DC 13 Strength saving throw. On a failed save, the target is pushed up to 15 feet away from the bog hound and is knocked prone.
```

---

## 02. Bog Hound — CR 1

**Input:** `a mud-caked bog hound that drags fishermen under`
**Donor:** brute-5-grappler -> CR 1
**Signature:** library · **elapsed** 8s

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
[reskin] free row repaired: "Mud-Caked Hide": "While the bog hound remains motionless, it is indistinguishable from t" -> "While the bog hound remains motionless, the bog hound is indistinguishable from the mud or"
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

Mud-Caked Hide.While the bog hound remains motionless, the bog hound is indistinguishable from the mud or riverbank it lies in; a creature using a Search action within 30 feet can spot it with a Wisdom (Perception) check against DC 13, and the bog hound has advantage on the first Bite attack made against a creature that has not noticed it.

Actions
Multiattack: The bog hound makes two Bite attacks. It can replace one attack with a use of Drag prone.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained.
Drag Prone: Each creature in a 15-foot cone must make a DC 13 Strength saving throw. On a failed save, the target is pushed up to 15 feet away from the bog hound and is knocked prone.
```

---

## 03. Bog Hound — CR 1

**Input:** `a mud-caked bog hound that drags fishermen under`
**Donor:** brute-5-grappler -> CR 1
**Signature:** library · **elapsed** 8s

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
[reskin] free row repaired: "Mud-Caked Hide": "While the bog hound remains motionless, it is indistinguishable from t" -> "While the bog hound remains motionless, a creature within 30 feet can notice the bog hound"
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

Mud-Caked Hide.While the bog hound remains motionless, a creature within 30 feet can notice the bog hound only by succeeding on a Wisdom (Perception) check against DC 13; on a failure, the bog hound is invisible against that creature until it moves.

Actions
Multiattack: The bog hound makes two Bite attacks. It can replace one attack with a use of Drag prone.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained.
Drag Prone: Each creature in a 15-foot cone must make a DC 13 Strength saving throw. On a failed save, the target is pushed up to 15 feet away from the bog hound and is knocked prone.
```

---

## 04. Swarmshear — CR 13

**Input:** `a plague-bearing archon of flies that commands lesser swarms`
**Donor:** skirmisher-13-winged -> CR 13 (invented — no printed peer)
**Signature:** library · **elapsed** 19s

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
[reskin] free row repaired: "Swarmwright's Command": "*Constitution Saving Throw*: DC 17, each creature in a 30-foot Cone. *" -> "*Constitution Saving Throw*: DC 17, each creature in a 30-foot Cone. *Failure:* 35 (10d6) "
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

Skewering Dive (Recharge 5-6). The swarmshear flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Dexterity Saving Throw: DC 17. Failure: 66 (12d10) Piercing damage, and the target has the Prone condition. Success: Half damage.

Swarmwright's Command. Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: 35 (10d6) Poison damage, and the target has the Poisoned condition until the end of its next turn.

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

## 05. Swarmshear — CR 13

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
[reskin] free row repaired: "Swarmwright's Command": "*Constitution Saving Throw*: DC 17, each creature in a 30-foot Cone. *" -> "*Constitution Saving Throw*: DC 17, each creature in a 30-foot Cone. *Failure:* The target"
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

## 06. Swarmshear — CR 13

**Input:** `a plague-bearing archon of flies that commands lesser swarms`
**Donor:** skirmisher-13-winged -> CR 13 (invented — no printed peer)
**Signature:** library · **elapsed** 10s

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
[reskin] free row repaired: "Swarmwright's Command": "*Constitution Saving Throw*: DC 17, each creature in a 30-foot Cone. *" -> "*Constitution Saving Throw*: DC 17, each creature in a 30-foot Cone. *Failure:* 35 (10d6) "
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

Swarmwright's Command. Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: 35 (10d6) Poison damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.

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

## 07. Scythe-Brood Horror — CR 9

**Input:** `A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.`
**Donor:** brute-8-grappler -> CR 9
**Signature:** library · **elapsed** 11s

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
Scythe-Limb Pin. Melee Attack Roll: +8, reach 5 ft. 17 (3d8 + 4) Piercing damage, and the target has the Restrained condition until the end of its next turn.
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

Multiattack. The scythe-brood horror makes two attacks, using Spitting Maw or Scythe-Limb Pin in any combination. It can replace one attack with a use of Horrid Display.

Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 17 (3d8 + 4) Piercing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).

Horrid Display. Wisdom Saving Throw: DC 15, each creature of the scythe-brood horror's choice in a 30-foot Emanation originating from the scythe-brood horror that can see or hear it. Failure: The target has the Frightened condition until the end of its next turn. Success: The target is immune to this creature's terror for 24 hours.

Scythe-Limb Pin. Melee Attack Roll: +8, reach 5 ft. 17 (3d8 + 4) Piercing damage, and the target has the Restrained condition until the end of its next turn.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

## 08. Scythe-Brood Horror — CR 9

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

## 09. Scythe-Brood Horror — CR 9

**Input:** `A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.`
**Donor:** brute-8-grappler -> CR 9
**Signature:** library · **elapsed** 5s

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

## 10. Chrismal Ossuary — CR 9

**Input:** `a cathedral-vault ooze that digests reliquaries`
**Donor:** ooze-9 -> CR 9 (invented — no printed peer)
**Signature:** library · **elapsed** 13s

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
Caustic Reliquary Lash (Recharge 5-6): One creature within 10 feet must succeed on a DC 15 Dexterity saving throw or take 27 (6d8) acid damage and be restrained until the end of its next turn.
```

---

## 11. Chrismal Ossuary — CR 9

**Input:** `a cathedral-vault ooze that digests reliquaries`
**Donor:** ooze-9 -> CR 9 (invented — no printed peer)
**Signature:** library · **elapsed** 13s

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
[reskin] free row repaired: "Reliquary Swallow (Recharge 5-6)": "*Dexterity Saving Throw*: DC 15, one creature within 10 feet. *Failure" -> "*Dexterity Saving Throw*: DC 15, one creature within 10 feet. *Failure:* 28 (8d6) Acid dam"
[reskin] free row repaired: "Fouling Residue": "A space the ossuary moves through becomes difficult terrain for 1 hour" -> "At the start of each of the ossuary's turns, the space the ossuary occupies becomes diffic"
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

Fouling Residue.At the start of each of the ossuary's turns, the space the ossuary occupies becomes difficult terrain for 1 hour, and any object of gold, bone, silver, or lacquer that begins a turn in that space is destroyed.
Amorphous.The ossuary can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form.A creature that touches the ossuary or hits it with a melee attack while within 5 feet of it takes 9 (2d8) acid damage.
Spider Climb.The ossuary can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The ossuary makes two Engulfing Pseudopod attacks.
Engulfing Pseudopod: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 11 (2d10) acid damage.
Reliquary Swallow (Recharge 5-6): One creature within 10 feet of the ossuary must make a DC 15 Dexterity saving throw, taking 28 (8d6) acid damage on a failed save. On a failed save, the target is also restrained until the end of its next turn.
```

---

## 12. Chrismal Ossuary — CR 9

**Input:** `a cathedral-vault ooze that digests reliquaries`
**Donor:** ooze-9 -> CR 9 (invented — no printed peer)
**Signature:** library · **elapsed** 14s

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
[reskin] free row repaired: "Reliquary Swallow (Recharge 5-6)": "*Dexterity Saving Throw*: DC 15, one creature within 10 feet. *Failure" -> "*Dexterity Saving Throw*: DC 15, one creature within 10 feet. *Failure:* 28 (8d6) Acid dam"
[reskin] free row repaired: "Fouling Residue": "A space the ossuary moves through becomes difficult terrain for 1 hour" -> "When a creature touches the ossuary or hits it with a melee attack while within 5 feet of "
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

Fouling Residue.When a creature touches the ossuary or hits it with a melee attack while within 5 feet of it, or when the ossuary moves through a space, the touching or striking creature takes 14 (4d6) acid damage and one of its nonmagical worn or carried gold, bone, silver, or lacquer objects is corroded, and spaces the ossuary moves through on its turn are fouled.
Amorphous.The ossuary can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form.A creature that touches the ossuary or hits it with a melee attack while within 5 feet of it takes 9 (2d8) acid damage.
Spider Climb.The ossuary can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The ossuary makes two Engulfing Pseudopod attacks.
Engulfing Pseudopod: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 11 (2d10) acid damage.
Reliquary Swallow (Recharge 5-6): One creature within 10 feet must make a DC 15 Dexterity saving throw, taking 28 (8d6) acid damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also pulled up to 5 feet straight toward the ossuary and is restrained until the end of its next turn.
```

---

## 13. Unyielded Champion — CR 6

**Input:** `a skeleton with a greatsword`
**Donor:** brute-5 -> CR 6
**Signature:** library · **elapsed** 11s

**Type line:** `Medium Undead, Lawful Evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a skeleton with a greatsword
[path] twist — Skeleton (is) — "skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead typeFrom=the route call themes=grave/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
[reskin] free row repaired: "Closing Blade": "While the champion is moving toward a creature it has damaged within t" -> "While the champion is moving toward a creature it can see that is Bloodied, the champion's"
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

Closing Blade. While the champion is moving toward a creature it can see that is Bloodied, the champion's Speed can't be reduced and Difficult Terrain doesn't cost it extra movement.

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

## 14. Unyielded Champion — CR 6

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

## 15. Unyielded Champion — CR 6

**Input:** `a skeleton with a greatsword`
**Donor:** brute-5 -> CR 6
**Signature:** library · **elapsed** 5s

**Type line:** `Medium Undead, Lawful Evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a skeleton with a greatsword
[path] twist — Skeleton (is) — "skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead typeFrom=the route call themes=grave/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: none — the twist path takes no class kit
[reskin] free row repaired: "Closing Blade": "While the champion is moving toward a creature it has damaged within t" -> "While the champion is moving toward a creature it can see, the champion's Speed can't be r"
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

Closing Blade. While the champion is moving toward a creature it can see, the champion's Speed can't be reduced by any effect, and Difficult Terrain doesn't cost it extra movement.

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
