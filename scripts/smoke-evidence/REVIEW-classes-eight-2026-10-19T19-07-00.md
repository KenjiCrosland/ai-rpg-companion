# Review batch — classes-eight-2026-10-19T19-07-00

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Warren Nerve-Striker | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 6/6 |
| Sable Gutter | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Sergeant Bram Coldewe | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Vaultbreaker Hildr | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Vareth Solmane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Aeldric Stonevow | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Sorn Vaelith | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Thurivald | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Sister Halvane | 8 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 2/2 | 6/7 |
| Nameless Shade | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/6 |
| Deep Timber Dire Wolf | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Quill | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Maze-herder | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Hollow Vow | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Whisperveil | 3 | 2024 | skirmisher-3 | ok | ok | SOFT: multiattack-count | ok | ok | ok | ok | ok | FAIL: attack-in-multiattack, attack-in-multiattack | ok | FAIL (1) | 0/1 | 4/4 |

**Dropped 4 of 19 user clauses** (coverage 79%); concept share 93% (69/74 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3 / reader: 1



---

## Deep Timber Dire Wolf — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Deep Timber Dire Wolf | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "hunts in a pack"
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Deep Timber Dire Wolf

Large Beast, Unaligned

AC 15
Initiative +3 (13)

HP 60 (8d10 + 16)

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
15
+2
+2
CHA
7
-2
-2

Skills Perception +3, Stealth +5

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 3 (XP 700; PB +2)

Traits

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The dire wolf makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — print's own row

**Engine trace**

```
[path] twist — Dire Wolf (is) — "a dire wolf" (call)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("hunts in a pack") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/terror mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: pack-coordinated flanking hunt [behavior] | slashing bite that cripples and drags down [body] | thick dire-hide ruff [body]
[concept] identity: The dire wolf shadows its prey at the edge of the treeline, letting the pack fan wide so the kill comes from whichever side the quarry isn't watching. Every round it darts in for a snapping bite at hamstring or throat and wheels back out before retaliation lands, peeling away bloody and returning once the pack has the target ringed and spent. It is patient, coordinated, and utterly unafraid to retreat — a coward only to the solitary, a killer when the pack is whole.
[concept] lore: Dire wolves of the deep timber are matriarch-led and territorial, hunting not for hunger but to keep the hunting grounds clear of anything that might challenge the pack's claim.
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-3 -> CR 3
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the dire wolf" — the call's own answer (kind), built from the name
[reskin] inline form: "the dire wolf" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a dire wolf" -> has (descriptive), head | "hunts in a pack" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the wolf bites a foe that one of its packmates is already harrying that round, it does not just rake and let go — it locks on and hauls backward, dragging the prey off its feet and toward the open treeline. A creature dragged this way is left sprawled and exposed, easy meat for the rest of the pack rushing in from the sides." [rider/on_hit/movement] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] fit declined: "Pack Drag" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Dire Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 15 already beats print's AC 13 at CR 3, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The wolf's bite tears at tendon and hamstring, so anything it wounds moves slower and less surely on its feet until the wound is tended, making it easier for the pack to run it down." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] word match declined by the call: faultless-tracker — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "relentless-pursuit" has no key-table verb, but the call quotes "a dire wolf that hunts in a pack" from the description
[reskin] trait declined: "Hamstring Pursuit" — a print body takes only what the user's words ask; the call quotes "a dire wolf that hunts in a pack", which is the creature itself, a header directive, the half of a clause the lack sweep takes away, or the weapon a part row already carries
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a dire wolf that hunts in a pack" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Shadow" is the seat's, not the Dire Wolf's
```


---

## Sister Halvane — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sister Halvane | 8 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Guard Aura
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Longsword); nova none; dmg 54

```
Sister Halvane

Medium Humanoid, Neutral

AC 20
Initiative +2 (12)

HP 120 (16d8 + 48)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+8
INT
10
+0
+0
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
16
+3
+6
CHA
15
+2
+2

Skills Athletics +8, Perception +4

Senses Passive Perception 14

Languages Common, Celestial

CR 8 (XP 3,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Halvane, Halvane and its allies have Advantage on attack rolls and saving throws, provided Halvane doesn't have the Incapacitated condition.

Guard Aura. While in a 10-foot Emanation originating from Halvane, Halvane's allies have Advantage on saving throws, provided Halvane doesn't have the Incapacitated condition.

Actions

Multiattack. Halvane makes two Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Slashing damage.

Shield Bash. Strength Saving Throw: DC 16, one creature within 5 feet that Halvane can see. Failure: 27 (6d8) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

Bonus Actions

Lay on Hands (2/Day). Halvane touches a creature within 5 feet of itself and restores 27 (6d8) Hit Points to it.

Divine Smite (2/Day). Halvane charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 14 (4d6) Radiant damage.

Oathbound Mending (2/Day). Each ally within 30 feet of Halvane gains 14 (4d6) Temporary Hit Points.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Traits/Aura of Authority — paladin kit; the GM's clause "oathsworn crusader"
- Traits/Guard Aura — the chassis
- Actions/Multiattack — the chassis
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Bash — print's own row
- Bonus Actions/Lay on Hands — template lay-on-hands; paladin kit; the GM's clause "mends her soldiers"
- Bonus Actions/Divine Smite — template coating; paladin kit; the GM's clause "smites the unclean"; energy Radiant
- Bonus Actions/Oathbound Mending — template rally; library draw (seed unstamped); the GM's clause "mends her soldiers"; binds the GM's words: mend+prayer

**Engine trace**

```
[path] class_npc — class paladin — "oathsworn crusader" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=aura — casts: implied by the kind — "an oathsworn crusader who smites the unc" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("an oathsworn crusader who smites the unc") | caster-warpriest: key "smites" (class verb)
[concept] name: provided_name rejected — "an oathsworn crusader who smites the unc…" is the description, not a name
[concept] hints: warpriest→style ✓ ("smites the unclean")
[concept] resolve: archetype=caster type=Humanoid themes=armed/celestial mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: holy smites on the unclean [behavior] | battlefield healing of her soldiers [behavior] | iron plate and iron resolve [body]
[concept] identity: An armored crusader advances behind a raised shield, calling down radiant smites on the unclean while her soldiers press close enough to fall under her battlefield prayer. Each round she alternates offense with restoration, spending her own vigor to mend her wounded line, then stepping back into the front rank to punish whatever broke through. Under pressure she does not flee — she plants, prays, and fights to the death, convinced that her oath and her soldiers' lives are worth more than her own.
[concept] lore: Sworn to a militant holy order, she believes the field itself is her chapel and that keeping her soldiers alive to fight another dawn is the purest act of worship.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] print canon route: the Gladiator is not a caster first and keys STR 18 over DEX 15 — it casts no spells — the caster family stands down for the plain defender line
[reskin] print canon array: STR 20, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +8
[reskin] donor: defender-5 -> CR 8
[reskin] style unserved: "warpriest" has no defender line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "an oathsworn crusader who smites the unclean and mends her soldiers" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] kit energy: "Divine Smite" deals Radiant, not Bludgeoning — the shape's own fiction
[reskin] class kit: paladin — "oathsworn crusader": Aura of Authority (Hobgoblin Captain/Aura of Authority), Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] inline declared: "Halvane" — the call's own answer (person), built from the name; the rules would have said "the sister"
[reskin] inline on kit rows: "the sister" -> "Halvane"
[reskin] inline form: "Halvane" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an oathsworn crusader" -> has (descriptive), head | "smites the unclean" -> has (mechanical) [asked: attack] | "mends her soldiers" -> has (mechanical) [asked: heal]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When Halvane strikes an unclean foe and her smite lands, the prayer over it carries to her soldiers: every ally close enough to stand under her battlefield prayer mends a little of their wounds as the strike lands. It only happens on the smite, so the mending is tied to the punishment, not handed out freely." [rider/on_hit/resource] — menu: stunning-strike, charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] signature template: rally -> Bonus Actions/"Oathbound Mending (2/Day)" ("The idea is that when the smite lands, allies under her battlefield prayer mend  [verb: mend:concept, prayer:idea]")
[reskin] keys spent by the action: mend
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's AC 16 at CR 8, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Halvane plants, prays, and keeps fighting past the point where her body should give out — as her wounds mount she steadies rather than falters, and she refuses to fall while soldiers still stand in her prayer. The closer she is to death, the harder it is to put her down." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] trait declined: "Oathbound Endurance" — bound only on the idea's own words (keeps fighting:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Longsword = longsword; Sling = sling
[reskin] weapon table: "Sling" rolls Dexterity — +8 → +5
[reskin] weapon table: "Sling" damage off Dexterity — 27 (5d8 + 5) → 24 (5d8 + 2)
[reskin] weapon table: "Sling" — a launcher, never thrown, range 30/120
[reskin] print canon alignment: Lawful Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Celestial" -> "Common, Celestial" — the Gladiator's plus the concept's Celestial
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Longsword" -> "Spear" — the Gladiator's own row
[reskin] ranged row off: "Sling" leaves — the Gladiator carries no ranged row and the words name none
[reskin] multiattack re-read — "Sling" left; "Multiattack" now reads "Halvane makes two Spear attacks."
[reskin] print canon row priced: Shield Bash — dice 9 → 27
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack re-read — "Spear" left; "Multiattack" now reads "Halvane makes two attacks."
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] multiattack normalised: "Halvane makes two Longsword attacks. It can replace one attack with a use of Shield Bash."
[reskin] row binds its clause: "Oathbound Mending" answers "mends her soldiers" — the keys it matched came from that clause, so the coverage credit has a receipt
```


---

## Sergeant Bram Coldewe — a 2014 sheet

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sergeant Bram Coldewe | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 10 → 7; sustained 66 (3 × Longsword); nova none; dmg 66

```
Sergeant Bram Coldewe
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

STR +7, CON +6

Senses: 

passive Perception 11

Languages: 

Common

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Second Wind (2/Day). As a bonus action, Bram regains 19 (3d12) hit points.
Riposte (Reaction). When a creature within 5 feet of Bram misses it with a melee attack roll, Bram makes one Longsword attack against that creature.

Actions
Multiattack: Bram makes three Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) slashing damage, and the target has disadvantage on its next attack roll before the start of Bram's next turn.
Shield Bash: One creature within 5 feet that Bram can see must succeed on a DC 15 Strength saving throw or take 10 (3d6) bludgeoning damage, and if the target is Medium or smaller, it is knocked prone.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Longsword — authored for this sheet; a named part; a declared feature; the GM's clause "a veteran soldier with a longsword"; weapon longsword
- Actions/Shield Bash — template shield-bash; fighter kit; the GM's clause "bashes with a buckler"
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "soldier"
- Bonus Actions/Second Wind — template second-wind; fighter kit; the GM's clause "soldier"

**Engine trace**

```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792434810733:1436:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792434810733:1275:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792434810733:657:5)
!! [ENRICHMENT] Failed to enrich Dame Oriel: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792434810733:1436:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792434810733:1275:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792434810733:657:5)
[path] class_npc — class fighter — "soldier" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a veteran soldier with a longsword who b") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: longsword cut and thrust [object] | buckler bash that shoves and pins [object] | holds the line, punishes movement past him [behavior]
[concept] identity: A drilled line-fighter who opens by advancing behind his buckler to pin the nearest enemy in place, then works the longsword in short, economical cuts while keeping his shield between himself and the next blade. Every round he holds ground and punishes anyone who tries to slip past him, bashing the buckler into faces and knees to shove them back into the fight. He is a professional, not a fanatic: wounded badly he falls back in good order, cutting to cover his retreat rather than dying for a patch of dirt.
[concept] lore: A career soldier who outlived three banners and every officer who ever gave him an order, he now fights for whoever pays in coin and lets him keep his old sword-and-buckler drill.
[reskin] [path] class body: the fighter stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon defenses: HP 114 -> 112, AC 18 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class fighter (the matcher would have said twist Warrior Infantry)
[reskin] print canon: "a veteran soldier with a longsword who bashes with a buckler" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Buckler Bash" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "soldier": Riposte (riposte), Shield Bash (shield-bash), Second Wind (2/Day) (second-wind)
[reskin] inline declared: "Bram" — the call's own answer (person), built from the name; the rules would have said "the sergeant"
[reskin] inline on kit rows: "the sergeant" -> "Bram"
[reskin] inline form: "Bram" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a veteran soldier with a longsword" -> has (descriptive), head | "bashes with a buckler" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "When a foe tries to maneuver around or slip past Bram, he steps into its path and drives the buckler's rim into its knee or chest, dumping it to the ground and halting the move where it stands. It only works on someone he can see turning to leave his reach, and only when he has not already spent his moment punishing another's escape that round." [reaction/on_being_hit/condition] — menu: EMPTY (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: herd, own-turn-punisher — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When a foe tries to maneuver around or slip past Bram, he steps into its path and drives the buckler's rim into its knee or chest, dumping it to the ground and halting the move where it stands. It only works on someone he can see turning to leave his reach, and only when he has not already spent his moment punishing another's escape that round." [reaction/on_being_hit/condition] — the model found no template that holds it (offered: herd, own-turn-punisher)
[reskin] fallback respects the call: own-turn-punisher, herd left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Bram never wastes his cuts: when a foe is knocked down or off balance by his own weapon work, his follow-up longsword strokes come faster and land where the guard is open, so a foe he has already staggered pays double for staying in his reach." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: guarded-stance, shielded-mind — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Bram never wastes his cuts: when a foe is knocked down or off balance by his own weapon work, his follow-up longsword strokes come faster and land where the guard is open, so a foe he has already staggered pays double for staying in his reach." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] weapons answered: Longsword = longsword; Buckler Bash = buckler
[reskin] print canon multiattack: "Bram makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] multiattack re-read — "Longsword" joins the combination; "Bram makes three attacks, using Spear or Longsword in any combination. It can replace one "
[reskin] multiattack re-read: "Spear" is not on this sheet, so the combination now reads "Bram makes three Longsword attacks. It can replace one attack with a use of Shie"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Warren Nerve-Striker — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Warren Nerve-Striker | 5 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "strikes pressure points with an open hand"
- read: def 5 / off 7 → 6; sustained 48 (2 × Unarmed Strike); nova none; dmg 48

```
Warren Nerve-Striker

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 90 (20d8)

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
16
+3
+6
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

Skills Perception +5, Stealth +6

Senses Passive Perception 15

Languages Common plus one other language, Draconic

CR 5 (XP 1,800; PB +3)

Traits

Hold Breath. The nerve-striker can hold its breath for 15 minutes.

Marsh Stride. Difficult Terrain composed of mud doesn't cost the nerve-striker extra movement, and the nerve-striker can move across mud without needing to make an ability check.

Actions

Multiattack. The nerve-striker makes two attacks, using Unarmed Strike or Dart in any combination.

Unarmed Strike. Melee Attack Roll: +6, reach 5 ft. 24 (4d6 + 3) Bludgeoning damage. Once on each of Nerve-Striker's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of Nerve-Striker's next turn.

Dart. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Patient Defense. The nerve-striker takes the Dodge action.

Cunning Action. The nerve-striker takes the Dash, Disengage, or Hide action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Traits/Hold Breath — lizardfolk kit; the GM's clause "monk"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "monk"
- Actions/Multiattack — the chassis
- Actions/Unarmed Strike — print's own row, renamed; a declared feature; the GM's clause "monk"
- Actions/Dart — print's own row, renamed; weapon dart
- Bonus Actions/Patient Defense — template patient-defense; monk kit; the GM's clause "monk"
- Bonus Actions/Cunning Action — print's own row

**Engine trace**

```
[path] class_npc — class monk — species lizardfolk — "monk" (call)
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("strikes pressure points with an open han") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: open-hand pressure-point strikes [behavior] | dart in, sting, dart out [behavior] | scaled lizardfolk hide and clawed open palm [body]
[concept] identity: The pressure-point monk opens a fight by circling at the edge of reach, reading the stance of the nearest foe, then darts in to land a single open-palm strike at a joint or nerve cluster before slipping back out of range. Every round after that is the same rhythm — feint, close, sting a pressure point to stagger or numb a limb, retreat before the reply — and it prefers to work in a pack, using its kin to pin attention while it hunts the weak seam. Under pressure it does not fight to the death; it disengages, re-reads the field, and keeps harrying until its prey is slow enough to finish.
[concept] lore: A lizardfolk warren that keeps no written history trains its swiftest young in the old nerve-strike arts, and this monk wanders the swamp margin seeking worthy bodies on which to test what its elders taught.
[reskin] [path] class body: the monk stands on the Spy — the class's own print block, nearest CR 5
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 5
[reskin] [path] decides: class_npc on the Spy · class monk (the matcher would have said homebrew)
[reskin] print canon: "a lizardfolk monk who strikes pressure points with an open hand" heads on the Spy — print's rows ride along; the seat stays
[reskin] row evicted for the cap: Traits/"Slip Away" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "monk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Open Palm), Patient Defense (patient-defense)
[reskin] inline declared: "the nerve-striker" — the call's own answer (kind), built from the name; the rules would have said "Nerve-Striker"
[reskin] inline on kit rows: "Nerve-Striker" -> "the nerve-striker"
[reskin] inline form: "the nerve-striker" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "strikes pressure points with an open hand" names no absence — nothing in it takes anything away
[reskin] asked field dropped: the call answered limit "at_will" for "strikes pressure points with an open hand" but offered no quote
[reskin] clauses: "a lizardfolk monk" -> has (descriptive), head | "strikes pressure points with an open hand" -> has (mechanical) [asked: on_hit/condition]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The nerve-striker reads a foe's stance through its open hand — after striking with Open Palm, it twists the follow-through into a stinging jab at a joint that numbs the whole limb, making the target clumsy and slow-footed for a short while. This sting only lands on an enemy the open palm has already staggered that round, so the pattern is strike, then sting the limb the first strike exposed. It wo" [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown riposte, which the GM's words keyed
[reskin] key match declined: action — "riposte" was ranked first on the call's own menu for opening, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The nerve-striker reads a foe's stance through its open hand — after striking with Open Palm, it twists the follow-through into a stinging jab at a joint that numbs the whole limb, making the target clumsy and slow-footed for a short while. This sting only lands on an enemy the open palm has already staggered that round, so the pattern is strike, then sting the limb the first strike exposed. It wo" [rider/on_hit/condition] — the model found no template that holds it (offered: riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, disarm, feint-slip)
[reskin] fallback stands down: the class_npc path has no shelf — the Spy's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Nerve-strikers train in pairs to hunt the seam their pack leaves open: whenever an ally is engaging a foe in melee and the nerve-striker also strikes that same foe, the strike bites deeper as the foe's guard is split between two threats. Alone, it never gets this — the monk is a pack hunter and its art assumes a warren at its shoulder." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Nerve-strikers train in pairs to hunt the seam their pack leaves open: whenever an ally is engaging a foe in melee and the nerve-striker also strikes that same foe, the strike bites deeper as the foe's guard is split between two threats. Alone, it never gets this — the monk is a pack hunter and its art assumes a warren at its shoulder." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] weapons answered: Open Palm = none; Nerve Jolt = none
[reskin] weapon table: "Nerve Jolt" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] print canon modes: swim off — the Spy has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Swim 40 ft. — the concept's movement set decides
[reskin] languages by mind: "Draconic, telepathy 30 ft. (swamp warren empathy)" -> "Common, Draconic" (sapient)
[reskin] print canon languages: "Common, Draconic" -> "Common plus one other language, Draconic" — the Spy's plus the concept's Draconic
[reskin] print canon attack: "Open Palm" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Nerve Jolt" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] print canon row: Bonus Actions/Cunning Action — the Spy's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Spy's Cunning Action
[reskin] multiattack re-read — "Shortsword" left; "Multiattack" now reads "The nerve-striker makes two Hand Crossbow attacks."
[reskin] class weapon: Actions/"Shortsword" -> "Unarmed Strike" — a monk fights with its hands, not the Spy's; the body's rider folds in (+7)
[reskin] multiattack re-read — "Hand Crossbow" left; "Multiattack" now reads "The nerve-striker makes two attacks."
[reskin] class weapon: Actions/"Hand Crossbow" -> "Dart" — a monk fights with a dart, not the Spy's
[reskin] multiattack normalised: "The nerve-striker makes two attacks, using Unarmed Strike or Dart in any combination."
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 15" -> "Passive Perception 15")
[reskin] asked but unanswered: "strikes pressure points with an open hand" asked for on_hit and no row binds the clause
[reskin] species kit: Swim 30 ft. — the lizardfolk's
```


---

## Sable Gutter — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sable Gutter | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 34 (2 × Shortsword); nova none; dmg 34

```
Sable Gutter

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
15
+2
+2
INT
14
+2
+2
MOD
SAVE
DEX
16
+3
+6
WIS
11
+0
+0
MOD
SAVE
CON
14
+2
+2
CHA
14
+2
+2

Skills Perception +3, Stealth +9

Resistances Fire

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Thieves' cant, Infernal

CR 5 (XP 1,800; PB +3)

Traits

Assassinate. During the first round of each combat, Sable has Advantage on attack rolls against any creature that hasn't taken a turn. If Sable hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Evasion. If Sable is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Sable instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Sable makes two attacks, using Shortsword or Shortbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Sable takes the Dash, Disengage, or Hide action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Traits/Assassinate — template assassinate; rogue kit; the GM's clause "stalks the rooftops of the old quarter"
- Traits/Evasion — template evasion; rogue kit; the GM's clause "rogue"
- Actions/Multiattack — the chassis
- Actions/Shortsword — print's own row, renamed; weapon shortsword
- Actions/Shortbow — print's own row, renamed; weapon shortbow
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "rogue"

**Engine trace**

```
[path] class_npc — class rogue — species tiefling — "rogue" (call)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("stalks the rooftops of the old quarter") | skirmisher-skulker: key "stalks" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=terror/armed mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: striking from hiding on the rooftops [behavior] | a climbing, tailed tiefling frame built for eave-work [body] | a silent blade in the dark [object]
[concept] identity: A tiefling rogue opens by dropping from the old quarter's roofline onto a distracted mark, striking from hiding with advantage, then melts back over the eaves before the fight can form around her. Each round she circles along gutters and chimney-stacks to re-establish concealment and strike again, never trading blows in the open. Bloodied or outnumbered she retreats without shame, baiting pursuers onto a height only her balance and tail can safely cross — but cornered, she fights to kill, patient and mocking to the last.
[concept] lore: Born into a family of dispossessed tiefling tenement-lords, she took to the rooftops of the old quarter after the guilds seized their holdings, and now she robs the merchants who financed their ruin — one exposed purse at a time — to buy back what was hers.
[reskin] [path] class body: the rogue stands on the Bandit Captain — the class's own print block, nearest CR 5
[reskin] print canon array: STR 15, DEX 16, CON 14, INT 14, WIS 11, CHA 14 — the Bandit Captain's, DEX fitted to +6
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Bandit Captain · class rogue (the matcher would have said twist Spy)
[reskin] print canon: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Bandit Captain — print's rows ride along; the seat stays
[reskin] species kit: tiefling — "rogue": header lines only; darkvision 60 ft.; resistance Fire
[reskin] class kit: Cunning Action — the sheet already carries it, so the rogue kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: rogue — "rogue": Evasion (evasion), Assassinate (assassinate)
[reskin] inline declared: "Sable" — the call's own answer (person), built from the name
[reskin] inline form: "Sable" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tiefling rogue" -> has (descriptive), head | "stalks the rooftops of the old quarter" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When Sable strikes from concealment, she marks the victim as her quarry and slips away along the roofline; while that mark lasts, the target cannot quietly shake her pursuit, and any move it makes is announced to her — she trails the mark through the quarter by shadow and instinct." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] word match declined by the call: bolt-mark, focus, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, aggro-curse, feint-slip — the key word does not mean the mechanic here
[reskin] fit declined: "Quarry Brand" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: focus left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Bandit Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Sable is at home where the footing fails: she can keep her balance and move freely across narrow ledges, sloped tiles, and sagging gutters that would send a pursuer tumbling, and her tail lets her catch herself from a slip that would drop anyone else." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] word match declined by the call: faultless-tracker, spider-climb, aberrant-ground — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Sable is at home where the footing fails: she can keep her balance and move freely across narrow ledges, sloped tiles, and sagging gutters that would send a pursuer tumbling, and her tail lets her catch herself from a slip that would drop anyone else." [trait/always/movement] — the model picked "terrain-walk" (no verb, and it quotes nothing the GM typed) over a concept-verb template (faultless-tracker)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Dagger = dagger; Crossbow = hand crossbow
[reskin] weapon declared: "Crossbow" is a hand crossbow — the call's own answer (the name alone read crossbow)
[reskin] weapon table: "Crossbow" — a launcher, never thrown, range 80/320
[reskin] print canon modes: climb off — the Bandit Captain has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Bandit Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Infernal" -> "Common, Thieves' cant, Infernal" — the Bandit Captain's plus the concept's Infernal
[reskin] print canon attack: "Dagger" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon attack: "Crossbow" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] on-hit extra retyped: "Assassinate" adds Slashing, not Bludgeoning — the hit's own type (Scimitar)
[reskin] print canon: chassis row leaves — Traits/"Gutter-Runner" is the seat's, not the Bandit Captain's
[reskin] on-hit extra retyped: "Assassinate" adds Piercing, not Slashing — the class weapon's own type (Shortsword)
[reskin] multiattack re-read — "Scimitar" left; "Multiattack" now reads "Sable makes two Pistol attacks."
[reskin] class weapon: Actions/"Scimitar" -> "Shortsword" — a rogue fights with a shortsword, not the Bandit Captain's
[reskin] multiattack re-read — "Pistol" left; "Multiattack" now reads "Sable makes two attacks."
[reskin] class weapon: Actions/"Pistol" -> "Shortbow" — a rogue fights with a shortbow, not the Bandit Captain's
[reskin] multiattack normalised: "Sable makes two attacks, using Shortsword or Shortbow in any combination."
[reskin] species kit: darkvision 60 ft. — the tiefling's
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Rooftop Stalker" [catalog: terrain-walk]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, Sable has Advantage on attack rolls against any creature that hasn't taken a turn. If Sable hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.
Traits / AFTER   Rooftop Stalker: Difficult Terrain composed of rooftops, ledges, and narrow walls doesn't cost Sable extra movement, and Sable can move across rooftops, ledges, and narrow walls without needing to make an ability check.
provenance: catalog template "terrain-walk"
```


---

## Vareth Solmane — one marked soft

**Concept:** name: Vareth Solmane | a templar priest of the dawn who blesses her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Solmane | 6 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Guard Aura
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Longsword); nova none; dmg 33

```
Vareth Solmane

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
+2
WIS
12
+1
+1
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

Languages Common, Celestial

CR 6 (XP 2,300; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Vareth, Vareth and its allies have Advantage on attack rolls and saving throws, provided Vareth doesn't have the Incapacitated condition.

Guard Aura. While in a 10-foot Emanation originating from Vareth, Vareth's allies have Advantage on saving throws, provided Vareth doesn't have the Incapacitated condition.

Actions

Multiattack. Vareth makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Vareth can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Bonus Actions

Dawn-Blessed Troops (2/Day). Each ally within 30 feet of Vareth gains 11 (2d10) Temporary Hit Points.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Traits/Aura of Authority — paladin kit; the GM's clause "templar"
- Traits/Guard Aura — the chassis
- Actions/Multiattack — the chassis
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Bash — print's own row
- Bonus Actions/Dawn-Blessed Troops — template rally; library draw (seed unstamped); the GM's clause "blesses her soldiers"; binds the GM's words: blessing+bless+prayer+troops

**Engine trace**

```
[harness] the page did not come up — retrying once
[path] class_npc — class paladin — "templar" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=aura — casts: implied by the kind — "blesses her soldiers" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("a templar priest of the dawn who blesses") | caster-warpriest: key "blesses" (class verb)
[concept] name: "Vareth Solmane" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=caster type=Humanoid themes=armed/voice mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Vareth Solmane"
[concept] mechanics: aura
[concept] signature elements: blessing her soldiers with dawn-prayers [behavior] | an iron-clad templar's mace and shield [object] | radiant benediction aura around her formation [aura]
[concept] identity: Vareth Solmane opens battle behind a wall of her own soldiers, laying radiant benedictions on their blades and shields before stepping into the line herself. Each round she alternates between a holy-charged mace stroke and a prayer that mends or empowers her allies, keeping her troops standing far past where they should fall. When bloodied she does not run — she plants herself at the center of her formation and spends her last breaths on one final blessing, fighting to the death for the dawn she serves.
[concept] lore: Vareth Solmane was a templar of the dawn-chapel who took her vows as a field-priest when the chapel's knights were cut down around her, and she now wanders with whatever faithful she can gather, believing every soldier she blesses is a candle lit against the dark.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon route: the Gladiator is not a caster first and keys STR 18 over DEX 15 — it casts no spells — the caster family stands down for the plain defender line
[reskin] print canon defenses: HP 91 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +7 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] style unserved: "warpriest" has no defender line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said twist Priest)
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 2 defect(s) — "Searing Prayer" deals Radiant on a Humanoid whose concept names no Radiant — a name is not a warrant; use a physical type | name "Searing Prayer" claims an element its damage (Radiant) does not pay
[reskin] repair round 2: 1 defect(s) — "Blessed Mace Throw" deals Radiant on a Humanoid whose concept names no Radiant — a name is not a warrant; use a physical type
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] proper noun: "Vareth Solmane" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vareth" — the call's own answer (person), built from the name
[reskin] inline form: "Vareth" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] energy withheld on a base row: "Blessed Mace Throw" Radiant -> Bludgeoning (the row's own noun; a Humanoid deals no Radiant its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Vareth Solmane — a templar priest of the dawn" -> has (descriptive), head | "blesses her soldiers" -> has (mechanical) [asked: buff_ally]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Vareth lays a dawn-prayer on her soldiers' weapons, lighting their blades until the prayer fades. Each of her allies who strikes a foe while blessed finds that the light flares, searing the darkness with radiant force and keeping the wounded standing a moment longer. She can only keep so many candles lit at once, and the light gutters out one by one as her troops spend it." [action/always/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] signature template: rally -> Bonus Actions/"Dawn-Blessed Troops (2/Day)" ("Vareth blesses her soldiers with a dawn-prayer, and each blessed ally who strike [verb: blessing:concept, bless:concept, prayer:idea, troops:idea]")
[reskin] keys spent by the action: blessing, bless
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Each … Vareth gives leaves a lingering thread of dawn-light in the one she touched; when that ally is struck down, the light flares from their body, searing the attacker and steadying the nearest of her faithful. Every candle she lights is a vow that its death will not go unanswered." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: web-walker, absorption, resonant-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Each … Vareth gives leaves a lingering thread of dawn-light in the one she touched; when that ally is struck down, the light flares from their body, searing the attacker and steadying the nearest of her faithful. Every candle she lights is a vow that its death will not go unanswered." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, web-walker)
[reskin] weapons answered: Mace = mace; Searing Prayer = none
[reskin] print canon alignment: Lawful Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Celestial" -> "Common, Celestial" — the Gladiator's plus the concept's Celestial
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Mace" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Blessed Mace Throw leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon multiattack: "Vareth makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack re-read — "Spear" left; "Multiattack" now reads "Vareth makes three attacks. It can replace one attack with a use of Shield Bash."
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] multiattack normalised: "Vareth makes three Longsword attacks. It can replace one attack with a use of Shield Bash."
[reskin] row binds its clause: "Dawn-Blessed Troops" answers "blesses her soldiers" — the keys it matched came from that clause, so the coverage credit has a receipt
[harness] re-rolled Actions/"Longsword" -> "Longsword" [the call's own text]
```

**Re-roll — one entry, replaced**

```
Actions / BEFORE  Longsword: *Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.
Actions / AFTER   Longsword: *Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Radiant damage.
provenance: none — the call wrote the text itself
```


---

## Dame Oriel — in the run

**Concept:** name: Dame Oriel | a knight who holds the line with a shield and a longsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dame Oriel | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 10 → 7; sustained 66 (3 × Longsword); nova none; dmg 66

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
+2
WIS
12
+1
+1
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

Guarded Stance. While Dame Oriel isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. Dame Oriel makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage, and the target has Disadvantage on its next attack roll before the start of Dame Oriel's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Dame Oriel can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Riposte. Trigger: A creature within 5 feet of Dame Oriel misses it with a melee attack roll. Response: Dame Oriel makes one Longsword attack against that creature.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Traits/Guarded Stance — template guarded-stance; fighter kit; the GM's clause "keeps the line with a shield and a longsword"
- Actions/Multiattack — the chassis
- Actions/Longsword — authored for this sheet; a named part; a declared feature; the GM's clause "keeps the line with a shield and a longsword"; weapon longsword
- Actions/Shield Bash — print's own row
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "knight"

**Engine trace**

```
[path] class_npc — class fighter — "knight" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("keeps the line") | defender: key "keeps the line" (class verb)
[concept] name: "Dame Oriel" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Dame Oriel"
[concept] mechanics: none claimed
[concept] signature elements: holding a chokepoint against all comers [behavior] | the shield-wall stance [behavior] | longsword and shield [object]
[concept] identity: Dame Oriel plants herself in a doorway or chokepoint and makes it a wall — shield up, longsword waiting, daring the front rank to commit — then punishes anyone who tries to slip around or past her with a brutal counterstroke across the flank. She gives ground only on her own terms, retreating step by step to a better line rather than breaking, and answers taunts and insults in the same flat, patient voice until the enemy tires and makes a mistake.
[concept] lore: A veteran of a dozen losing sieges, Dame Oriel was left standing when her order fell and now keeps her sword-oath to a gate that no longer has a wall — she holds any line she is given, and holds it against all comers.
[reskin] [path] class body: the fighter stands on the Gladiator — the class's own print block, nearest CR 5
[reskin] print canon defenses: HP 78 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 5
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class fighter (the matcher would have said homebrew)
[reskin] print canon: "Dame Oriel — a knight who keeps the line with a shield and a longsword" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Held-Line Throw" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "knight": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] proper noun: "Dame Oriel" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Dame Oriel" — the call's own answer (person), built from the name
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "keeps the line with a shield and a longsword" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "keeps the line with a shield and a longsword" but offered no quote
[reskin] clauses: "Dame Oriel — a knight" -> has (descriptive), head | "keeps the line with a shield and a longsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "When an enemy tries to slip past Dame Oriel along her line — moving through the space she holds or crowding the reach of her blade — she pivots and drives her longsword across their flank before they get clear. It only answers committed movement past her guard, so foes who stay squared up in front of her never see it; it is her punishment for anyone who thinks the doorway is a way around her and n" [reaction/on_being_hit/damage] — menu: EMPTY (+ shelf: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for shield, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When an enemy tries to slip past Dame Oriel along her line — moving through the space she holds or crowding the reach of her blade — she pivots and drives her longsword across their flank before they get clear. It only answers committed movement past her guard, so foes who stay squared up in front of her never see it; it is her punishment for anyone who thinks the doorway is a way around her and n" [reaction/on_being_hit/damage] — the model found no template that holds it (offered: rally, herd, own-turn-punisher)
[reskin] fallback respects the call: rally left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Dame Oriel takes her time and keeps her shield between herself and whoever she has already cut, so a wounded foe who presses her finds her harder to land a blow against than the first exchange suggested. When she is yet unhurt, her guard is absolute — but once blood is drawn from her she stops giving ground and starts spending it." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: bloodied-burst, bloodied-fury, uncanny-sense — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Dame Oriel takes her time and keeps her shield between herself and whoever she has already cut, so a wounded foe who presses her finds her harder to land a blow against than the first exchange suggested. When she is yet unhurt, her guard is absolute — but once blood is drawn from her she stops giving ground and starts spending it." [trait/on_being_hit/defense] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, bloodied-fury, uncanny-sense)
[reskin] weapons answered: Longsword = longsword; Shield Bash = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "Dame Oriel makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
audit finding below confidence gate: Shield Bash Shield Bash imposes the Prone condition but names its rider Shield Bash while the save is described only as a Strength Saving Throw with no action/attack framing, and the entry name promises a shield while the block's shield is never otherwise referenced; more specifically, the name does not match the mechanics of a forced knockdown tied to a Strength save.
[reskin] audit rewrite blocked — "Longsword" is engine-authored chassis text
[reskin] multiattack re-read — "Longsword" joins the combination; "Dame Oriel makes three attacks, using Spear or Longsword in any combination. It can replac"
[reskin] multiattack re-read: "Spear" is not on this sheet, so the combination now reads "Dame Oriel makes three Longsword attacks. It can replace one attack with a use o"
(enrichment did not settle within 20s — moving on)
```


---

## Vaultbreaker Hildr — in the run

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vaultbreaker Hildr | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

```
Vaultbreaker Hildr

Medium Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 150 (20d8 + 60)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+8
INT
10
+0
+0
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
16
+3
+6
CHA
15
+2
+2

Skills Athletics +8, Perception +4

Senses Passive Perception 14

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Berserk. Whenever Hildr starts its turn Bloodied, roll 1d6. On a 6, Hildr goes berserk. On each of its turns while berserk, Hildr attacks the nearest creature it can see. If no creature is near enough to move to and attack, Hildr attacks an object. Once Hildr goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, Hildr has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost Hildr extra movement, and Hildr can move across ice or snow without needing to make an ability check.

Actions

Multiattack. Hildr makes two Greataxe attacks. It can replace one attack with a use of Shield Bash.

Greataxe. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Slashing damage.

Shield Bash. Strength Saving Throw: DC 16, one creature within 5 feet that Hildr can see. Failure: 27 (6d8) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

Bonus Actions

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Hildr moves up to half its Speed without provoking Opportunity Attacks, and it makes one Greataxe attack.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Greataxe — print's own row, renamed; weapon greataxe
- Actions/Shield Bash — print's own row
- Traits/Berserk — template berserk; barbarian kit; the GM's clause "loses control when wounded"
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "berserker"
- Traits/Mountain Stride — goliath kit; the GM's clause "berserker"
- Bonus Actions/Rampage — template rampage; barbarian kit; the GM's clause "berserker"

**Engine trace**

```
[path] class_npc — class barbarian — species goliath — "berserker" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a goliath berserker") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=bestial/terror mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: furor that swells with every wound taken [behavior] | slab-muscled stone-hide and an oversized axe [body] | uncontrolled, fearless, fight-to-the-death rage [behavior]
[concept] identity: The goliath berserker lopes into reach behind a greataxe that is nearly a cart-axle, trading blows openly while counting its own wounds; each cut it takes is paid back with doubled ferocity as the rage builds, until the brute drops its guard entirely and wades through the line swinging for skulls. It does not stalk or scheme — it welcomes the enemy's steel, and once its blood runs freely it will not retreat from anything that stands within arm's reach.
[concept] lore: Mountain-bred and raised to believe pain is a debt the body owes, this goliath seeks a death that will finally be worth its lineage — and finds it in the nearest enemy stronghold, wound by wound.
[reskin] [path] class body: the barbarian stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] the concept outranks the alias: the Gladiator is a Humanoid and the concept reads Giant — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 20, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +8
[reskin] donor: brute-5 -> CR 8
[reskin] [path] decides: class_npc on the Gladiator · class barbarian (the matcher would have said homebrew)
[reskin] print canon: "a goliath berserker who loses control when wounded" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] species kit: goliath — "berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Rampage (1/Day) (rampage), Berserk (berserk)
[reskin] inline declared: "Hildr" — the call's own answer (person), built from the name
[reskin] inline form: "Hildr" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a goliath berserker" -> has (descriptive), head | "loses control when wounded" -> has (mechanical) [asked: buff_self]
[reskin] signature idea (action): "When Hildr strikes a foe, the wound itself feeds its fury: the nearer Hildr is to death, the harder the axe bites, so every exchange of blood makes the next swing heavier. The deeper its own wounds run, the more the blow swells with force, so trading cuts with it is a losing bargain." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — affliction (wound)
[reskin] word match declined by the call: affliction, throw-retrieve, drain, wind-up, contagion, stunning-strike, charge-push, hook-rider, pounce, charge — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown affliction, which the GM's words keyed
[reskin] key match declined: action — "affliction" was ranked first on the call's own menu for wound, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When Hildr strikes a foe, the wound itself feeds its fury: the nearer Hildr is to death, the harder the axe bites, so every exchange of blood makes the next swing heavier. The deeper its own wounds run, the more the blow swells with force, so trading cuts with it is a losing bargain." [rider/on_hit/damage] — the model found no template that holds it (offered: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge, throw-retrieve, drain, wind-up)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Hildr's slab-muscled hide turns the edge of what strikes it, and the harder it is struck the more it gives back — each blow landed on it stokes the rage already building in its chest, letting it surge forward and swing again sooner. Pain is a debt it insists on repaying at once." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-fury, bloodied-burst (wounded)
[reskin] word match declined by the call: bloodied-fury — the key word does not mean the mechanic here
[reskin] trait ceiling: "Wounded Outburst" does not ship — 3 traits already, and print's ceiling for a meat body is 3
[reskin] weapons answered: Greataxe = greataxe; Handaxe = handaxe
[reskin] weapon table: "Handaxe" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the words say giant ("a dire wolf but undead", 2026-10-01)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Greataxe" -> "Spear" — the Gladiator's own row
[reskin] ranged row off: "Handaxe" leaves — the Gladiator carries no ranged row and the words name none
[reskin] multiattack re-read — "Handaxe" left; "Multiattack" now reads "Hildr makes two Spear attacks."
[reskin] print canon row priced: Shield Bash — dice 9 → 27
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack re-read — "Spear" left; "Multiattack" now reads "Hildr makes two attacks."
[reskin] dead wildcard name swept — "Spear" cited in "Rampage (1/Day)" now reads "Greataxe" — the keeper owns the throw
[reskin] class weapon: Actions/"Spear" -> "Greataxe" — a barbarian fights with a greataxe, not the Gladiator's
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] multiattack normalised: "Hildr makes two Greataxe attacks. It can replace one attack with a use of Shield Bash."
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 14" -> "Passive Perception 14")
audit finding below confidence gate: Berserk Berserk end condition is tied to no-longer-Bloodied, but nothing in the block lets Hildr regain HP, so the GM must track a state whose exit can never occur; combined with mandatory attack redirection this creates a branchy mid-combat command the GM must resolve each turn.
[reskin] species kit: Large -> Medium — a goliath is Medium (the words name no other size)
```


---

## Aeldric Stonevow — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Aeldric Stonevow | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 30 (2 × Longsword); nova none; dmg 30

```
Aeldric Stonevow

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
+4
MOD
SAVE
CON
16
+3
+5
CHA
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Aeldric, Aeldric and its allies have Advantage on attack rolls and saving throws, provided Aeldric doesn't have the Incapacitated condition.

Actions

Multiattack. The guard makes two attacks, using Longsword or Mace in any combination.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Aeldric's next turn.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage, and the target has Disadvantage on its next attack roll before the start of Aeldric's next turn.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Traits/Aura of Authority — paladin kit; the GM's clause "templar"
- Actions/Multiattack — the chassis
- Actions/Mace — authored for this sheet; a named part; a declared feature; the GM's clause "a templar priest with a mace"; weapon mace
- Actions/Longsword — print's own row; authored for this sheet; a named part; a declared feature; the GM's clause "a templar priest with a mace"; weapon longsword

**Engine trace**

```
[path] class_npc — class paladin — "templar" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: planted shield-and-mace defensive line [behavior] | mundane iron mace and shield [object] | the vow of the held doorway [behavior]
[concept] identity: A templar sworn to no god but the line itself, this armored priest plants his shield in a doorway or corridor and makes that spot a wall of iron and faith, opening with a braced stance and a mace held ready to meet the first charge. Each round he trades blows from behind his guard, shoving to break shields and snapping the haft of his mace into the face of anyone who tries to slip past him, punishing every attempt to flank or retreat. He does not chase and he does not flee — bloodied or not, he holds until the ground beneath him is won or his armor caves in.
[concept] lore: Their orders dissolved and their gods silent, these former temple guards took the oldest vow they had left — that a doorway held is a prayer answered — and now they stand in the ruins of shrines and the halls of warlords, selling their stubbornness to whoever needs a line that will not break.
[reskin] [path] class body: the paladin stands on the Guard Captain — the class's own print block, nearest CR 4
[reskin] print canon defenses: HP 65 -> 75, AC 19 -> 18 — the Guard Captain's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 18 (breastplate, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 14, CON 16, INT 12, WIS 14, CHA 13 — the Guard Captain's at its own CR; attack +6 -> +6, DC 14 (print's)
[reskin] donor: defender-3 -> CR 4
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] class array: CHA 13 -> 14 — a paladin casts off it
[reskin] [path] decides: class_npc on the Guard Captain · class paladin (the matcher would have said twist Priest)
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Guard Captain — print's rows ride along; the seat stays
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "Aeldric" — the call's own answer (person), built from the name
[reskin] inline form: "Aeldric" — the model's own reading of the name
[reskin] lacks asked: "no magic at all"
[reskin] asked field dropped: the call answered trigger "at_will" for "no magic at all" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "no magic at all" but offered no quote
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] signature idea (action): "When Aeldric has his shield set and plants his feet, he becomes a doorway no one passes. Any enemy that tries to move past him or push through the space he guards is stopped cold and knocked back by a braced shield shove, and if it presses the attempt he snaps the mace haft across its face. So long as he holds the spot he holds it — the wall does not get walked around." [reaction/on_being_hit/movement] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] fit declined: "Sundering Shove" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the class_npc path has no shelf — the Guard Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 18 already beats print's AC 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "There is no spell in Aeldric, only muscle, ash, and oath; his mace and shield are ordinary iron swung by a man who has swung them every day of his life. That plainness is the point — nothing about his blows is magical, and nothing about his guard is conjured, so it answers to no one and cannot be dispelled." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: guarded-stance, resonant-body, terrain-walk — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "There is no spell in Aeldric, only muscle, ash, and oath; his mace and shield are ordinary iron swung by a man who has swung them every day of his life. That plainness is the point — nothing about his blows is magical, and nothing about his guard is conjured, so it answers to no one and cannot be dispelled." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
[reskin] weapons answered: Mace = mace; Crossbow = light crossbow
[reskin] weapon declared: "Crossbow" is a light crossbow — the call's own answer (the name alone read crossbow)
[reskin] weapon table: "Crossbow" rolls Dexterity — +6 → +4
[reskin] weapon table: "Crossbow" damage off Dexterity — 13 (2d8 + 4) → 11 (2d8 + 2)
[reskin] weapon table: "Crossbow" — a launcher, never thrown, range 80/320
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Guard Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon row: Actions/Longsword — the Guard Captain's second melee row, beside the chassis's
[reskin] print canon multiattack: "The guard makes two attacks, using Javelin or Longsword in any combination." — the Guard Captain's own
[reskin] ranged row off: "Crossbow" leaves — the Guard Captain carries no ranged row and the words name none
[reskin] multiattack normalised: "The guard makes two attacks, using Longsword or Mace in any combination."
```


---

## Sorn Vaelith — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sorn Vaelith | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (3 × Arcane Burst); nova none; dmg 48

```
Sorn Vaelith

Medium Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 81 (18d8)

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

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Sorn makes three Arcane Burst attacks.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Sorn casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). Sorn casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Trigger: Sorn is hit by an attack roll. Response: Sorn casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Arcane Burst — print's own row, renamed
- Actions/Spellcasting — print's own row
- Reactions/Protective Magic — mage kit; the GM's clause "wizard"
- Bonus Actions/Misty Step — mage kit; the GM's clause "is never where you struck and steps away"

**Engine trace**

```
[path] class_npc — class mage — "wizard" (call)
[route] skirmisher-skulker type=Humanoid mechanics=teleport — casts: implied by the kind — "a court wizard who is never where you st" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("never where you struck and steps away") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=arcane/uncanny mind=sapient style=skulker energy=Force mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: never where the blow lands; a half-step already taken [behavior] | a body of woven shadow-silk folded around hard anchors [body] | arcane anchors it steps between [object]
[concept] identity: A court wizard whose body is a thin shell of living shadow-silk over planted arcane anchors, so every blow that lands finds only a folded afterimage already half a step elsewhere. It opens by cloaking itself and its anchors in gloom, then strikes from an angle its opponent had dismissed — a cane-tip of cold shadow-force delivered with advantage and a step that was never where it seemed. Under pressure it keeps trading ground and misdirection rather than blood, only slipping away for good when the fight is truly lost.
[concept] lore: A palace mage who traded his flesh for a mantle of woven shadow so no assassin's blade would ever find the mark, now bound to the throne room's anchors and stepping between them to guard secrets no one remembers entrusting him.
[reskin] energy withheld: Force on a Humanoid with no Force in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 6
[reskin] print canon route: the Mage's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from skirmisher, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 89 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-6 -> CR 6
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said twist Mage)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Shadow Cane" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] inline declared: "Sorn" — the call's own answer (person), built from the name
[reskin] inline form: "Sorn" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "is never where you struck and steps away" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a court wizard" -> has (descriptive), head | "is never where you struck and steps away" -> has (mechanical) [asked: on_being_hit/movement]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Sorn's cane strikes, and the wound itself unravels into a length of shadow-silk that stays lashed to the victim, one end still trailing back to Sorn. While that thread holds, every fold of him around it hums to his senses, so his cane finds its way to that foe as though the target stood at the end of a rope he is holding. He can cut the silk at any moment, and once it is severed the wound goes col" [rider/on_hit/condition] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] word match declined by the call: phase-slip, snare, bolt-drag, bolt-restrain, snare-bolt, bolt-mark, execute — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown phase-slip, which the GM's words keyed
[reskin] key match declined: action — "phase-slip" was ranked first on the call's own menu for step, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Sorn's cane strikes, and the wound itself unravels into a length of shadow-silk that stays lashed to the victim, one end still trailing back to Sorn. While that thread holds, every fold of him around it hums to his senses, so his cane finds its way to that foe as though the target stood at the end of a rope he is holding. He can cut the silk at any moment, and once it is severed the wound goes col" [rider/on_hit/condition] — the model found no template that holds it (offered: phase-slip, bolt-restrain, bolt-drag, bolt-mark, snare, execute, ground-burst, pacify, snare-bolt)
[reskin] fallback respects the call: phase-slip, snare, snare-bolt, execute left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Mage's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Sorn's flesh is woven silk, and it remembers every mark left in it; a wound closes a moment after it lands, pulling its edges back toward the anchors that hold his shape. Wounds that would have killed a man knit themselves shut while his mantle still has weave to give, but each such repair frays the silk and leaves him nearer to bare nothing." [trait/always/defense] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] word match declined by the call: evasion — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown evasion, which the GM's words keyed
[reskin] key match declined: trait — "evasion" was ranked first on the call's own menu for never where, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Sorn's flesh is woven silk, and it remembers every mark left in it; a wound closes a moment after it lands, pulling its edges back toward the anchors that hold his shape. Wounds that would have killed a man knit themselves shut while his mantle still has weave to give, but each such repair frays the silk and leaves him nearer to bare nothing." [trait/always/defense] — the model found no template that holds it (offered: evasion, false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, bloodied-burst, warded-mending)
[reskin] concept-first trait skipped: evasion — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Shadow Cane = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Shadow Cane" -> "Arcane Burst" — the Mage's own row
[reskin] print canon skills: "Arcana +6, Perception +4" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] ask vs row MISMATCH: "is never where you struck and steps away" -> "Misty Step" — trigger: asked on_being_hit, row reads at_will
```


---

## Thurivald — in the run

**Concept:** name: Thurivald | a skald who sings his warband into a fury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Guard Aura
- read: def 3 / off 7 → 5; sustained 45 (3 × Hand Crossbow); nova none; dmg 45

```
Thurivald
Medium humanoid, neutral
Armor Class

17 (splint)

Hit Points: 

84 (13d8 + 26)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


10 (+0)

	

18 (+4)

	

14 (+2)

	

10 (+0)

	

14 (+2)

	

17 (+3)

Skills: 

Acrobatics +7, Perception +5

Saving Throws: 

STR +3, CON +5

Senses: 

passive Perception 15

Languages: 

Common plus one other language

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Guard Aura. While in a 10-foot-radius sphere centered on Thurivald, Thurivald's allies have advantage on saving throws, provided Thurivald isn't incapacitated.
Captain's Charm (Bonus Action). One creature Thurivald can see within 30 feet must succeed on a DC 14 Wisdom saving throw or be charmed until the start of Thurivald's next turn.
Bolstering Cry (2/Day). As a bonus action, Thurivald lets out a bolstering cry. Each ally within 30 feet of Thurivald gains 10 (3d6) temporary hit points.

Actions
Multiattack: The thurivald makes three attacks, using Rapier or Hand Crossbow.
Rapier: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage, and the thurivald has advantage on the next attack roll it makes before the end of this turn.
Hand Crossbow: Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 15 (2d10 + 4) piercing damage.
```

**Where each row came from**

- Traits/Guard Aura — the chassis
- Actions/Multiattack — the chassis
- Actions/Rapier — print's own row, renamed; weapon rapier
- Actions/Hand Crossbow — print's own row; weapon hand crossbow
- Bonus Actions/Captain's Charm — bard kit; the GM's clause "skald"
- Bonus Actions/Bolstering Cry — template rally; bard kit; the GM's clause "skald"

**Engine trace**

```
[path] class_npc — class bard — "skald" (call)
[route] defender-leader type=Humanoid mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] name: "Thurivald" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=voice/armed mind=sapient style=leader energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Thurivald"
[concept] mechanics: aura
[concept] signature elements: the war-chant that drives allies into fury [behavior] | a shield-wall fought from the center, never the rear [behavior] | a voice iron-hard and pitched to carry over steel [body]
[concept] identity: Thurivald opens by planting himself beside his warband and splitting the air with a war-chant, and from then on he is a fixed center his allies orbit — the dirge drives them into a blood-fury while he parries and shoves, never leaving the knot of bodies he has welded into a choir. Under pressure he redoubles the song instead of retreating, dragging the wounded back into the rhythm, so killing him means cutting the voice out of a shield-wall that fights harder the longer he sings. He is a warlord of the throat and the shield, not a skirmisher.
[concept] lore: Thurivald was a war-band's skald who learned that a song kept alive in the throat outlives the singer, and now he walks from battlefield to battlefield recruiting the grieving into a chorus that only knows how to march.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the bard stands on the Pirate Captain — the class's own print block, nearest CR 6
[reskin] print canon route: the Pirate Captain's body outranks the leader seat — no verb in the words names it; the plain defender line
[reskin] print canon defenses: HP 114 -> 84, AC 18 -> 17 — the Pirate Captain's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 10, DEX 18, CON 14, INT 10, WIS 14, CHA 17 — the Pirate Captain's at its own CR; attack +6 -> +7, DC 14 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] [path] decides: class_npc on the Pirate Captain · class bard (the matcher would have said homebrew)
[reskin] print canon: "Thurivald — a skald who sings his warband into a fury" heads on the Pirate Captain — print's rows ride along; the seat stays
[reskin] repair round 1: 2 defect(s) — name "War Horn" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear) | "War Horn" deals Thunder on a Humanoid whose concept names no Thunder — a name is not a warrant; use a physical type
[reskin] class kit: bard — "skald": Captain's Charm (Pirate Captain/Captain's Charm), Bolstering Cry (2/Day) (rally)
[reskin] proper noun: "Thurivald" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Thurivald" — the call's own answer (person), built from the name
[reskin] inline form: "Thurivald" — the model's own reading of the name
[reskin] energy withheld on a base row: "War Horn" Thunder -> Piercing (the row's own noun; a Humanoid deals no Thunder its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Thurivald — a skald" -> has (descriptive), head | "sings his warband into a fury" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Thurivald pitches the war-chant up into a driving verse, and every ally who can hear him is swept into fury — their blows come faster and landing a hit only stokes the chant louder. It runs until the singing stops, so the warband fights hardest while he stands at their center, but each ally only catches the fury once per battle." [action/always/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, riposte, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: terror-pulse, active-toll, herd — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Thurivald pitches the war-chant up into a driving verse, and every ally who can hear him is swept into fury — their blows come faster and landing a hit only stokes the chant louder. It runs until the singing stops, so the warband fights hardest while he stands at their center, but each ally only catches the fury once per battle." [action/always/damage] — the model found no template that holds it (offered: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter)
[reskin] fallback respects the call: herd, terror-pulse left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Pirate Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 17 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "His voice is pitched to carry over steel: any ally who can hear the chant is goaded onward and presses the attack even when wounded, and an enemy who tries to shut him up finds the song outlasts the blow." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] word match declined by the call: bloodied-fury, resonant-body, mimicry — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-fury, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-fury" was ranked first on the call's own menu for fury, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "His voice is pitched to carry over steel: any ally who can hear the chant is goaded onward and presses the attack even when wounded, and an enemy who tries to shut him up finds the song outlasts the blow." [trait/always/movement] — the model found no template that holds it (offered: bloodied-fury, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst, resonant-body)
[reskin] weapons answered: Cudgel = club; War Horn = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Pirate Captain's
[reskin] print canon row: Actions/Pistol — the Pirate Captain's own ranged row, added (the chassis carried none to rename)
[reskin] print canon attack: "Cudgel" -> "Rapier" — the Pirate Captain's own row
[reskin] print canon multiattack: "The pirate makes three attacks, using Rapier or Pistol in any combination." — the Pirate Captain's own
[reskin] print canon skills: "Athletics +3, Perception +5" -> "Acrobatics +7, Perception +5" — the Pirate Captain's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"War Horn" — the Pirate Captain prints no row for it and no path stage claimed it
[reskin] multiattack re-read — "Pistol" left; "Multiattack" now reads "The pirate makes three Rapier attacks."
[reskin] class weapon: Actions/"Pistol" -> "Hand Crossbow" — a bard fights with a hand crossbow, not the Pirate Captain's
[reskin] multiattack re-read — "Hand Crossbow" joins the combination; "The pirate makes three attacks, using Rapier or Hand Crossbow in any combination."
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Nameless Shade — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Nameless Shade | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "moves through the shadows"
- read: def 5 / off 5 → 5; sustained 34 (2 × Shortsword); nova none; dmg 34

```
Nameless Shade

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
15
+2
+2
INT
14
+2
+2
MOD
SAVE
DEX
16
+3
+6
WIS
11
+0
+0
MOD
SAVE
CON
14
+2
+2
CHA
14
+2
+2

Skills Perception +3, Stealth +9

Senses Passive Perception 13

Languages Common, Thieves' cant

CR 5 (XP 1,800; PB +3)

Traits

Assassinate. During the first round of each combat, the shade has Advantage on attack rolls against any creature that hasn't taken a turn. If the shade hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Evasion. If the shade is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the shade instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The shade makes two attacks, using Shortsword or Shortbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. The shade takes the Dash, Disengage, or Hide action.

Shadowmarked Prey. Wisdom Saving Throw: DC 13, one creature within 30 feet. Failure: Until the start of the shade's next turn, the target has Disadvantage on attack rolls against creatures other than the shade.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Traits/Assassinate — template assassinate; rogue kit; the GM's clause "strikes unseen"
- Traits/Evasion — template evasion; rogue kit; the GM's clause "ninja"
- Actions/Multiattack — the chassis
- Actions/Shortsword — print's own row, renamed; weapon shortsword
- Actions/Shortbow — print's own row, renamed; weapon shortbow
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "ninja"
- Bonus Actions/Shadowmarked Prey — template aggro-curse; library draw (seed unstamped); binds the GM's words: mark

**Engine trace**

```
[path] class_npc — class rogue — "ninja" (call)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("moves through the shadows and strikes un") | skirmisher-skulker: key "unseen" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=uncanny/armed mind=sapient style=skulker energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: strikes unseen from hidden shadow [behavior] | body of woven living shadow [body] | poisoned blade and smoke vanishing [object]
[concept] identity: A shadow-bound assassin opens combat already hidden, folding out of darkness behind the nearest target to strike with a poisoned blade before anyone marks its position. Each round it flits from concealment to concealment, trading one unseen strike with advantage for a fresh hide, and will vanish entirely if pressed. Wounded and cornered, it does not stand and die — it drops a smoke of shadow and melts into the dark to be found again another night.
[concept] lore: Sworn to a shadow-cult that shaves away its members' names and pasts, this ninja kills on order and considers a target marked only when the body is never found.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the rogue stands on the Bandit Captain — the class's own print block, nearest CR 5
[reskin] print canon array: STR 15, DEX 16, CON 14, INT 14, WIS 11, CHA 14 — the Bandit Captain's, DEX fitted to +6
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Bandit Captain · class rogue (the matcher would have said homebrew)
[reskin] print canon: "a ninja who moves through the shadows and strikes unseen" heads on the Bandit Captain — print's rows ride along; the seat stays
[reskin] class kit: Cunning Action — the sheet already carries it, so the rogue kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: rogue — "ninja": Evasion (evasion), Assassinate (assassinate)
[reskin] inline declared: "the shade" — the call's own answer (kind), built from the name; the rules would have said "Shade"
[reskin] inline on kit rows: "Shade" -> "the shade"
[reskin] inline form: "the shade" — the model's own reading of the name
[reskin] energy rider withheld: Poison on a Humanoid with no Poison in the concept's own words
[reskin] damage type by the row's own noun: "Blade" Piercing -> Slashing
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a ninja" -> has (descriptive), head | "moves through the shadows" -> has (mechanical) [asked: movement] | "strikes unseen" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the shade strikes a creature it is hidden from, the wound weeps living shadow instead of blood: on its next turn the victim is wracked by darkness bleeding out of the cut and cannot call for help or shout a warning, and the shade hears its heartbeat from anywhere on the field, marking it as the one prey it will not lose. The mark fades only if the shade is slain or another victim is cut, and " [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — self-invisibility (unseen)
[reskin] word match declined by the call: self-invisibility, bolt-mark, affliction, delayed-brand, rampage — the key word does not mean the mechanic here
[reskin] signature template: aggro-curse -> Bonus Actions/"Shadowmarked Prey" ("The shade marks the one victim it will not lose, fixing its attention on that ta [verb: mark:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The shade has no true body where light falls: it can only be seen where it chooses to stand. Anything besides the shade's own attacks that aims at it from outside dim light or darkness finds nothing to strike, and when the shade ends its turn out of the light it simply ceases to be present, unseen even to those watching for it, until it steps back into shadow." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The shade has no true body where light falls: it can only be seen where it chooses to stand. Anything besides the shade's own attacks that aims at it from outside dim light or darkness finds nothing to strike, and when the shade ends its turn out of the light it simply ceases to be present, unseen even to those watching for it, until it steps back into shadow." [trait/always/defense] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] weapons answered: Blade = sword; Dart = dart
[reskin] weapon table: "Dart" — thrown, range 20/60
[reskin] print canon modes: climb off — the Bandit Captain has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Neutral Evil -> Neutral — the Bandit Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Thieves' cant" — the Bandit Captain's
[reskin] print canon attack: "Blade" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon attack: "Dart" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] on-hit extra retyped: "Assassinate" adds Slashing, not Bludgeoning — the hit's own type (Scimitar)
[reskin] print canon: chassis row leaves — Traits/"Shadowstep" is the seat's, not the Bandit Captain's
[reskin] on-hit extra retyped: "Assassinate" adds Piercing, not Slashing — the class weapon's own type (Shortsword)
[reskin] multiattack re-read — "Scimitar" left; "Multiattack" now reads "The shade makes two Pistol attacks."
[reskin] class weapon: Actions/"Scimitar" -> "Shortsword" — a rogue fights with a shortsword, not the Bandit Captain's
[reskin] multiattack re-read — "Pistol" left; "Multiattack" now reads "The shade makes two attacks."
[reskin] class weapon: Actions/"Pistol" -> "Shortbow" — a rogue fights with a shortbow, not the Bandit Captain's
[reskin] multiattack normalised: "The shade makes two attacks, using Shortsword or Shortbow in any combination."
audit finding below confidence gate: Nameless Shade A 'Shade' that fights with shadow magic and an assassination feature reads as an Undead spirit, not a living Humanoid, and nothing in the block expresses living-humanoid substance.
audit finding below confidence gate: Evasion The doubled word 'the shade is subjected' is not harmful, but the sentence leaves the reader parsing a subjectless opening; the doubled phrasing 'the shade is subjected' is ambiguous only if read as a second subjectless clause.
[reskin] audit type correction refused: Humanoid stands — the GM's words name the type
```


---

## Quill — in the run

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Quill | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Devil's Due
- read: def 3 / off 4 → 3.5; sustained 30 (2 × Sting); nova none; dmg 30

```
Quill

Small Fiend, Lawful Evil

AC 16
Initiative +4 (14)

HP 67 (15d6 + 15)

Speed 20 ft., Fly 40 ft. (hover)

MOD
SAVE
STR
6
-2
-2
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
13
+1
+1
CHA
14
+2
+2

Skills Perception +3, Stealth +6

Resistances Cold

Immunities Fire, Poison; Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Infernal

CR 4 (XP 1,100; PB +2)

Traits

Devil's Due. When Quill makes a Dexterity check to pick a lock, Quill rolls with Advantage if the lock was set by a devil.

Magic Resistance. Quill has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. Quill makes two Sting attacks.

Sting. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 7 (2d6) Poison damage.

Shape-Shift. Quill shape-shifts to resemble a rat (Speed 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.

Invisibility. Quill casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Traits/Devil's Due — authored for this sheet; the GM's clause "picks locks for a devil"
- Traits/Magic Resistance — print's own row
- Actions/Multiattack — the chassis
- Actions/Sting — print's own row, renamed
- Actions/Shape-Shift — print's own row
- Actions/Invisibility — print's own row

**Engine trace**

```
[path] twist — Imp (is) — class rogue — "imp" (call)
[route] skirmisher-skulker type=Fiend mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("an imp rogue who picks locks for a devil") | skirmisher-skulker: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "omit" answers a question nobody asked
[concept] resolve: archetype=skirmisher type=Fiend themes=fiendish/uncanny mind=sapient style=skulker energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: picking locks and wards for a devil [behavior] | ash-smoke shroud and ember puffs [body] | thieves' tools scaled to a clawed hand [object]
[concept] identity: A soot-blackened imp slips into the room behind a shroud of its own smoke, picks the lock or the ward, and is already behind the wizard when the door opens — every round it re-hides in the murk of its own making and strikes from concealment for the soft spot the devil paid it to find. Under pressure it does not flee; it laughs, drops a blinding puff of ember-smoke, and scurries up wall or rafter to let the fight come to its claws.
[concept] lore: Forged in a brimstone workshop and bound by a contract-pact to a devil who needs doors opened, this imp trades its clever fingers and quicker lies for a place in its master's ledgers, and it counts every lock it picks as a line of credit toward its own ascension.
[reskin] print canon route: the Imp's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 6, DEX 18, CON 13, INT 11, WIS 12, CHA 14 — the Imp's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 4
[reskin] [path] decides: twist on the Imp · class rogue (the matcher agrees)
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Imp — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "Quill" — the call's own answer (person), built from the name
[reskin] inline form: "Quill" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered limit "at_will" for "picks locks for a devil" but offered no quote
[reskin] clauses: "an imp rogue" -> has (descriptive), head | "picks locks for a devil" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Quill exhales a clinging cloud of ember-smoke from its soot-black body, thick enough to break every line of sight through it and stinging the eyes of anyone caught inside. Quill can see and move through the swelling haze unharmed, so it hides in the murk it made, crosses the room unseen, and strikes at exposed foes from concealment on the same turn or the next. The puff drifts and thins quickly, s" [bonus_action/always/condition] — menu: rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] word match declined by the call: spew — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Quill exhales a clinging cloud of ember-smoke from its soot-black body, thick enough to break every line of sight through it and stinging the eyes of anyone caught inside. Quill can see and move through the swelling haze unharmed, so it hides in the murk it made, crosses the room unseen, and strikes at exposed foes from concealment on the same turn or the next. The puff drifts and thins quickly, s" [bonus_action/always/condition] — the model found no template that holds it (offered: rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, gaze-single, spew, delayed-brand)
[reskin] fallback stands down: the twist path has no shelf — the Imp's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Where Quill's claws have seared something, the ash clings to the victim like soot on a chimney. As long as those glowing cinders still cling, Quill can sense exactly where the burned creature is, tracking it through smoke, darkness, and cover, and its locks cracked by fire let no clever hiding place suffice." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] word match declined by the call: sealed-body — the key word does not mean the mechanic here
[reskin] trait declined: "Cinder Scent" — bound only on the idea's own words (track:idea, tracks:idea, tracking:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] repair: 1 clause(s) with no row — "picks locks for a devil"; one targeted call with the sheet as context
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Claw = none
[reskin] print canon modes: climb off — the Imp has no such mode and the words name none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Imp's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: 40 ft. -> 20 ft. — the Imp's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Sting" — the Imp's own row
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Imp's own header lines
[reskin] resistances derived withheld: print's Imp owns the line (Cold)
[reskin] print canon trait: Magic Resistance — "an imp rogue who picks locks for a devil" is the Imp (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Imp's
[reskin] print canon: chassis row leaves — Traits/"Sootstep" is the seat's, not the Imp's
[reskin] print canon row: Actions/Shape-Shift — the Imp's own
[reskin] print canon row: Actions/Invisibility — the Imp's own
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
```


---

## Maze-herder — in the run

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Maze-herder | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Greataxe); nova none; dmg 44

```
Maze-herder

Large Monstrosity, Chaotic Neutral

AC 14
Initiative -1 (9)

HP 119 (14d10 + 42)

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

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The maze-herder makes two attacks, using Greataxe or Stomp in any combination.

Greataxe. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Slashing damage.

Stomp. Ranged Attack Roll: +7, range 60/240 ft. 17 (3d8 + 4) Bludgeoning damage.

Bonus Actions

Charge. The maze-herder moves up to half its Speed straight toward an enemy it can see.

Herding Bellow (Recharge 5-6). Wisdom Saving Throw: DC 14, each creature of the maze-herder's choice within 30 feet. Failure: The target immediately moves up to half its Speed in a direction of the maze-herder's choice, using the safest available route.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Greataxe — weapon greataxe
- Actions/Stomp — the chassis
- Bonus Actions/Charge — minotaur kit; the GM's clause "a minotaur reaver who herds prey into the maze"
- Bonus Actions/Herding Bellow — template herd; library draw (seed unstamped); the GM's clause "herds prey into the maze"; binds the GM's words: herd+call

**Engine trace**

```
[path] refused: print_body "Minotaur" is not in the corpus
[path] homebrew — species minotaur — "a minotaur reaver who herds prey into the maze" (call)
[route] brute type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-charger: ✓ ("who herds prey into the maze") | brute-charger: no line key in the words — the model's read of its quote | brute-charger -> brute: a charger is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] resolve: archetype=brute type=Humanoid themes=subterranean/bestial mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: driving prey into the maze [behavior] | shoving and herding in tight corridors [behavior] | curved horns and heavy axe [body]
[concept] identity: The minotaur reaver opens a fight by positioning itself between prey and the open ground, bellowing and stamping to drive the quarry down the corridor it wants, then charges to close the last gap with its greataxe. Every round after that it trades blows in the choke of a passage, shoving and herding stragglers deeper rather than killing outright, because the maze does its work for it. It fights to the death once bloodied, enraged that anything escaped the corridors it built its whole hunt around.
[concept] lore: Cursed by a labyrinth-god to never leave the walls it haunts, the reaver has learned that the maze is a better weapon than its axe and drives travelers down paths that end in its own hooves.
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] species kit: minotaur — "a minotaur reaver who herds prey into the maze": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the maze-herder" — the call's own answer (kind), built from the name; the rules would have said "Maze-herder"
[reskin] inline form: "the maze-herder" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "herds prey into the maze" but offered no quote
[reskin] clauses: "a minotaur reaver" -> has (descriptive), head | "herds prey into the maze" -> has (mechanical) [asked: movement]
[reskin] signature idea (action): "The maze-herder slams its axe flat against the ground and lets out a building bellow, stamping in a widening arc as the sound rolls over the prey. Those caught in the rumble are driven back the way the minotaur wants them to go—their feet carry them away from the open ground and toward the passages behind it, and they cannot turn back until the echo fades. It can only call up this herding roar so " [action/save/movement] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — herd (herd)
[reskin] word match declined by the call: rally — the key word does not mean the mechanic here
[reskin] value check: "Herding Bellow (2/Day)" EV 8.2 vs floor 35.5 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature re-slotted: "Herding Bellow" moves to a bonus action, Recharge-gated because it reaches an area (print: the Centaur Trooper's Trampling Charge) — EV 8.2 vs floor 3.4 there; the GM's verb keeps its row
[reskin] signature template: herd -> Bonus Actions/"Herding Bellow (Recharge 5-6)" ("the bellow drives prey to move in a direction the minotaur chooses, herding them [verb: herd:concept, call:idea]")
[reskin] keys spent by the action: herd
[reskin] signature idea (trait): "The maze-herder fights best in narrow places and in the press of a hunt: whenever its prey has nowhere to flee or is already hemmed by walls, its axe strokes land harder and truer. Cornered quarry only feeds its certainty that the maze is on its side." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, faultless-tracker, relentless-pursuit, spider-climb — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The maze-herder fights best in narrow places and in the press of a hunt: whenever its prey has nowhere to flee or is already hemmed by walls, its axe strokes land harder and truer. Cornered quarry only feeds its certainty that the maze is on its side." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, absorption, bloodied-burst)
[reskin] weapons answered: Greataxe = greataxe; Stomp = none
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] row binds its clause: "Herding Bellow" answers "herds prey into the maze" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Herding Bellow Requires the GM to adjudicate 'safest available route' on an ad hoc basis in the middle of combat, with no fallback if the path is ambiguous or partially blocked.
```


---

## Hollow Vow — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hollow Vow | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Longsword); nova none; dmg 52

```
Hollow Vow

Medium Humanoid, Neutral

AC 19
Initiative +2 (12)

HP 105 (14d8 + 42)

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
+2
WIS
12
+1
+1
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

Skills Athletics +7, Perception +4

Senses Passive Perception 14

Languages Common

CR 7 (XP 2,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the hollow vow, the hollow vow and its allies have Advantage on attack rolls and saving throws, provided the hollow vow doesn't have the Incapacitated condition.

Actions

Multiattack. The hollow vow makes two Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet that the hollow vow can see. Failure: 24 (7d6) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

Bonus Actions

Bolstering Cry (2/Day). Each ally within 30 feet of the hollow vow gains 13 (3d8) Temporary Hit Points.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Traits/Aura of Authority — paladin kit; the GM's clause "knight-errant"
- Actions/Multiattack — the chassis
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Bash — print's own row
- Bonus Actions/Bolstering Cry — template rally; library draw (seed unstamped); the GM's clause "shields the weak"; binds the GM's words: shield+orders+ward

**Engine trace**

```
[path] class_npc — class paladin — "knight-errant" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("shields the weak") | defender: key "knight" (class verb)
[concept] name: provided_name rejected — "a knight-errant of the fallen order who …" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: planting the shield between the helpless and the threat [behavior] | dented iron plate carried like a wall [body] | striking low at anyone who tries to slip past [behavior]
[concept] identity: A scarred knight-errant in dented iron plate plants himself between the helpless and whoever comes for them, opening with a shield shove and a leveled blade to buy time, then holding a single line and striking low at anyone who tries to slip past to the wounded behind him. Every round he presses the shield forward, grinds down the aggressor's reach, and refuses to yield ground while there are still people to guard; he fights to the death without drama, only ever stepping back where the retreat keeps his wards behind him.
[concept] lore: A sworn shield of a broken order, he wanders the ruined roads looking for the vulnerable he failed to save, and he will not leave a single one behind again.
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 7
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +7
[reskin] donor: defender-5 -> CR 7
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "a knight-errant of the fallen order who shields the weak" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] class kit: paladin — "knight-errant": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "the hollow vow" — the call's own answer (kind), built from the name
[reskin] inline form: "the hollow vow" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a knight-errant of the fallen order" -> has (descriptive), head | "shields the weak" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The vow plants his battered shield and becomes the wall his wards need. For as long as he holds that stance, anyone behind him is sheltered, and would-be attackers find the shield shoved into their way, slowing their advance toward the wounded and dragging at anyone trying to slip around him. He cannot chase while holding the line; the stance breaks the moment he moves away from where he planted h" [trait/start_of_turn/defense] — menu: warded-mending (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] signature template: rally -> Bonus Actions/"Bolstering Cry (2/Day)" ("planting the shield to shelter those behind him grants protection to nearby ward [verb: shield:concept, orders:concept, ward:idea]")
[reskin] keys spent by the action: shield
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's AC 15 at CR 7, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Dented iron remembers every blow it turned. Each time an enemy strikes the hollow vow and fails to break through him, some of that force is caught in the plate and pressed back into the next … shove he makes at that same attacker, so the line grows harder to move the longer it is tested." [trait/on_being_hit/resource] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: resonant-body, absorption, bloodied-burst — the key word does not mean the mechanic here
[reskin] trait declined: "Dented Retort" — a shape fit with no verb match on a Humanoid body; a meat body earns its trait by a verb
[reskin] weapons answered: Battered Shield = shield; Grounded Longsword = longsword
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Battered Shield" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Grounded Longsword leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon row priced: Shield Bash — dice 9 → 24
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack re-read — "Spear" left; "Multiattack" now reads "The hollow vow makes two attacks."
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] multiattack normalised: "The hollow vow makes two Longsword attacks. It can replace one attack with a use of Shield B"
[reskin] row binds its clause: "Bolstering Cry" answers "shields the weak" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Aura of Authority The aura's area is stated but the entry never restricts or ends the effect; more importantly it grants the hollow vow Advantage on its own saving throws, but the trigger for the aura being active is only its own Incapacitated condition, which is adjudicable — however the emanation benefits the vow itself, meaning the aura is a self-buff with no target-definition problem. This is fine; withdrawn.
```


---

## Whisperveil — in the run

**Concept:** a tabaxi cutpurse who slips through the market crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Whisperveil | 3 | skirmisher-3 | ok | ok | SOFT: multiattack-count | ok | ok | ok | ok | ok | FAIL: attack-in-multiattack, attack-in-multiattack | ok |

- structure · soft · multiattack-count: Multiattack says 2 but names no rows
- reader · fail · attack-in-multiattack: Actions/Shortsword is an attack row the Multiattack never names — a GM who reads the Multiattack never uses it
- reader · fail · attack-in-multiattack: Actions/Shortbow is an attack row the Multiattack never names — a GM who reads the Multiattack never uses it
- **dropped clause:** "slips through the market crowd"
- read: def 3 / off 3 → 3; sustained 16 (2 × Shortbow); nova none; dmg 16

```
Whisperveil

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 52 (8d8 + 16)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
15
+2
+2
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
11
+0
+0
MOD
SAVE
CON
14
+2
+2
CHA
14
+2
+2

Skills Athletics +4, Deception +4

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Thieves' cant

CR 3 (XP 700; PB +2)

Traits

Evasion. If the whisperveil is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the whisperveil instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The bandit makes two attacks, using in any combination.

Shortsword. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 8 (1d10 + 3) Piercing damage.

Bonus Actions

Cunning Action. The whisperveil takes the Dash, Disengage, or Hide action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Traits/Evasion — template evasion; rogue kit; the GM's clause "cutpurse"
- Actions/Multiattack — the chassis
- Actions/Shortsword — print's own row, renamed; weapon shortsword
- Actions/Shortbow — print's own row, renamed; weapon shortbow
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "cutpurse"

**Engine trace**

```
[path] class_npc — class rogue — species tabaxi — "cutpurse" (call)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("slips through the market crowd") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=grasping/bestial mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: stealing through the crowd [behavior] | a cutpurse's blade [object] | vanishing into the market throng [behavior]
[concept] identity: The cutpurse works the market as cover, brushing past marks until a purse comes loose, then melts into the press of bodies before the cry goes up. Once cornered, it fights in that same crowd—ducking behind stalls and bystanders, opening with a sudden low knife-thrust from cover and never trading blows in the open. It is a coward with a plan: bloodied, it bolts for the nearest alley and rooftops, cares nothing for a stand-up fight, and only turns vicious when escape is truly cut off.
[concept] lore: A guild-trained tabaxi thief who learned that a crowded market is the finest hiding place ever built—every shoulder a shield, every scream a distraction, every alley a door.
[reskin] [path] class body: the rogue stands on the Bandit Captain — the class's own print block, nearest CR 3
[reskin] print canon route: the Bandit Captain's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 60 -> 52, AC 15 -> 15 — the Bandit Captain's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 15 (studded leather) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 15, DEX 16, CON 14, INT 14, WIS 11, CHA 14 — the Bandit Captain's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: skirmisher-3 -> CR 3
[reskin] [path] decides: class_npc on the Bandit Captain · class rogue (the matcher would have said homebrew)
[reskin] print canon: "a tabaxi cutpurse who slips through the market crowd" heads on the Bandit Captain — print's rows ride along; the seat stays
[reskin] species kit: Cat's Dash — "Fleet Agility" already grants Dash; one mechanic, one row
[reskin] species kit: tabaxi — "cutpurse": header lines only; Climb 30 ft.; darkvision 60 ft.
[reskin] class kit: rogue — "cutpurse": Cunning Action (Assassin/Cunning Action), Evasion (evasion)
[reskin] inline declared: "the whisperveil" — the call's own answer (kind), built from the name; the rules would have said "Whisperveil"
[reskin] inline form: "the whisperveil" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tabaxi cutpurse" -> has (descriptive), head | "slips through the market crowd" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the whisperveil moves through a press of people, it can ghost past a mark and lift what they carry without breaking stride — a stolen purse, a snatch of gear, even a weapon pulled from a belt. The trick only works while bodies crowd close around it and the mark is distracted, and the theft goes unnoticed until the thief is already gone; if anyone is watching closely, the hand comes back empty" [action/always/resource] — menu: trample, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, exploiter (+ shelf: leap, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — feint-slip (slip)
[reskin] word match declined by the call: feint-slip, disarm, delayed-brand, aggro-curse, bolt-mark — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown feint-slip, which the GM's words keyed
[reskin] key match declined: action — "feint-slip" was ranked first on the call's own menu for slip, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the whisperveil moves through a press of people, it can ghost past a mark and lift what they carry without breaking stride — a stolen purse, a snatch of gear, even a weapon pulled from a belt. The trick only works while bodies crowd close around it and the mark is distracted, and the theft goes unnoticed until the thief is already gone; if anyone is watching closely, the hand comes back empty" [action/always/resource] — the model found no template that holds it (offered: feint-slip, trample, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, exploiter, delayed-brand, aggro-curse, bolt-mark)
[reskin] fallback respects the call: feint-slip, disarm left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Bandit Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 15 already beats print's AC 13 at CR 3, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Its blade bites deepest when it strikes from cover — from behind a stall, a shoulder, a crowd's confusion. Anyone who turns their back on it in the press feels the thrust before they see the hand that made it, and the wound bleeds badly and refuses to close cleanly while the thief slips away." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Its blade bites deepest when it strikes from cover — from behind a stall, a shoulder, a crowd's confusion. Anyone who turns their back on it in the press feels the thrust before they see the hand that made it, and the wound bleeds badly and refuses to close cleanly while the thief slips away." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] weapons answered: Knife = dagger; Sling = sling
[reskin] weapon table: "Sling" — a launcher, never thrown, range 30/120
[reskin] print canon modes: climb off — the Bandit Captain has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] print canon languages: "Common" -> "Common, Thieves' cant" — the Bandit Captain's
[reskin] print canon attack: "Knife" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon multiattack: "The bandit makes two attacks, using Scimitar and Pistol in any combination." — the Bandit Captain's own
[reskin] print canon attack: "Pistol" is print's own row — +5, 8 (1d10 + 3), range 30/90 ft. (an exact body at print's CR)
[reskin] print canon attack: "Sling" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] print canon skills: "Perception +2, Stealth +5" -> "Athletics +4, Deception +4" — the Bandit Captain's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Bandit Captain's
[reskin] print canon: chassis row leaves — Traits/"Crowd Step" is the seat's, not the Bandit Captain's
[reskin] multiattack re-read — "Scimitar" left; "Multiattack" now reads "The bandit makes two attacks, using and Pistol in any combination."
[reskin] class weapon: Actions/"Scimitar" -> "Shortsword" — a rogue fights with a shortsword, not the Bandit Captain's
[reskin] multiattack re-read — "Pistol" left; "Multiattack" now reads "The bandit makes two attacks, using in any combination."
[reskin] class weapon: Actions/"Pistol" -> "Shortbow" — a rogue fights with a shortbow, not the Bandit Captain's
[reskin] species kit: Climb 30 ft. — the tabaxi's
[reskin] species kit: darkvision 60 ft. — the tabaxi's
```
