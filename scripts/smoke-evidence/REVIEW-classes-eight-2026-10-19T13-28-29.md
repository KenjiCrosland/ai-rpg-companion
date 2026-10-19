# Review batch — classes-eight-2026-10-19T13-28-29

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sessrak the Nerve-Taker | 5 | 2024 | skirmisher-3 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 7/7 |
| Vaelith Emberstep | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Ser Aldric Vane | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Gormak the Scarhide | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Ser Warden Aubrec | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Unmet Hour | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Thurivald | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Seraphine Oathbrand | 8 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/6 |
| Long-Chase | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Kessil the Lockpick | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Ser Halric Vow | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Whisker Shade | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |

**Dropped 2 of 15 user clauses** (coverage 87%); concept share 96% (54/56 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Long-Chase — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Long-Chase | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "hunts in a pack"
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Long-Chase

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

Pack Tactics. The long-chase has Advantage on an attack roll against a creature if at least one of the long-chase's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The long-chase makes two Bite attacks.

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
- Actions/Bite — the chassis

**Engine trace**

```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:1146:31
    at callLLM (http://localhost:5173/src/tools/statblock-generator/reskin/generate.mjs?t=1792416438352:1319:24)
    at fitSeat (http://localhost:5173/src/tools/statblock-generator/reskin/generate.mjs?t=1792416438352:3652:30)
    at generateReskin (http://localhost:5173/src/tools/statblock-generator/reskin/generate.mjs?t=1792416438352:3967:64)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:1105:22)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:657:5)
[reskin] network retry: Failed to fetch — retrying the call once
[path] twist — Dire Wolf (is) — "dire wolf" (call)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("hunts in a pack") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/devouring mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: pack tactics [behavior] | harrying hit-and-run [behavior] | bone-crushing jaws [body]
[concept] identity: A dire wolf of the deep hunting runs, it circles in a loose crescent with its pack, letting a flanker draw the prey's eye while it darts across the blind side to hamstring and withdraw before the return swing. Every round it trades ground for angle, snapping at heels and calves to bleed the quarry's speed, then peeling away to let the next wolf take the bite. Bloodied, it does not break alone — it drops back into the pack's cover and keeps harrying until the prey falls or the pack loses its nerve.
[concept] lore: These overgrown wolves den in the old hunting wood and are bred to the chase, valuing a long and exhausting run over a quick kill.
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-3 -> CR 3
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the long-chase" — the call's own answer (kind), built from the name
[reskin] inline form: "the long-chase" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "hunts in a pack" names no absence — nothing in it takes anything away
[reskin] clauses: "a dire wolf" -> has (descriptive), head | "hunts in a pack" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the long-chase snaps at a quarry that is already bleeding or worn down from the chase, it lunges to seize a leg in its jaws and wrenches, dragging the prey off balance and slowing it for a moment so the rest of the pack can close. The bitten creature has to fight free of the grip instead of simply moving away." [rider/on_hit/movement] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] word match declined by the call: hook-rider, affliction, disarm, contagion, charge-push, pounce, isolation, charge, focus — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown focus, which the GM's words keyed
[reskin] key match declined: action — "focus" was ranked first on the call's own menu for hunt, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the long-chase snaps at a quarry that is already bleeding or worn down from the chase, it lunges to seize a leg in its jaws and wrenches, dragging the prey off balance and slowing it for a moment so the rest of the pack can close. The bitten creature has to fight free of the grip instead of simply moving away." [rider/on_hit/movement] — the model found no template that holds it (offered: focus, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge, disarm)
[reskin] fallback respects the call: focus, disarm left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Dire Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 15 already beats print's AC 13 at CR 3, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Its jaws are built to break things held inside them: a creature the long-chase has bitten and not yet shaken loose takes savage crushing damage each moment it stays in the wolf's grip. The harder the prey struggles, the worse the bone-crushing bite bleeds it." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] word match declined by the call: faultless-tracker, bloodied-fury, adhesive — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for hunts+hunted, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Its jaws are built to break things held inside them: a creature the long-chase has bitten and not yet shaken loose takes savage crushing damage each moment it stays in the wolf's grip. The harder the prey struggles, the worse the bone-crushing bite bleeds it." [trait/always/damage] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a dire wolf that hunts in a pack" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Circle" is the seat's, not the Dire Wolf's
```


---

## Seraphine Oathbrand — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Seraphine Oathbrand | 8 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Spear); nova none; dmg 54

```
Seraphine Oathbrand

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

Aura of Authority. While in a 10-foot Emanation originating from Seraphine, Seraphine and its allies have Advantage on attack rolls and saving throws, provided Seraphine doesn't have the Incapacitated condition.

Actions

Multiattack. Seraphine makes two Spear attacks. It can replace one attack with a use of Brand of Vengeance.

Spear. Melee or Ranged Attack Roll: +8, reach 5 ft. or range 20/60 ft. 27 (5d8 + 5) Piercing damage.

Brand of Vengeance. Dexterity Saving Throw: DC 16, one creature within 60 feet. Failure: Until the end of Seraphine's next turn, the target sheds dim light in a 10-foot radius, it can't benefit from the Invisible condition, and attack rolls against it have Advantage.

Shield Bash. Strength Saving Throw: DC 16, one creature within 5 feet that Seraphine can see. Failure: 27 (6d8) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

Bonus Actions

Lay on Hands (2/Day). Seraphine touches a creature within 5 feet of itself and restores 27 (6d8) Hit Points to it.

Divine Smite (2/Day). Seraphine charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 14 (4d6) Radiant damage.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

- Traits/Aura of Authority — paladin kit; the GM's clause "crusader"
- Actions/Multiattack — the chassis
- Actions/Spear — print's own row, renamed; weapon spear
- Actions/Brand of Vengeance — template reveal; library draw (seed unstamped); binds the GM's words: light
- Actions/Shield Bash — print's own row
- Bonus Actions/Lay on Hands — template lay-on-hands; paladin kit; the GM's clause "mends her soldiers"
- Bonus Actions/Divine Smite — template coating; paladin kit; the GM's clause "smites the unclean"; energy Radiant

**Engine trace**

```
[path] class_npc — class paladin — "crusader" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "smites the unclean and mends her soldier" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("smites the unclean and mends her soldier") | caster-warpriest: key "smites" (class verb)
[concept] hints: warpriest→style ✓ (""an oathsworn crusader who smites"")
[concept] resolve: archetype=caster type=Humanoid themes=armed/celestial mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: smiting the unclean with holy-energized weapon strikes [behavior] | spoken prayers that mend her soldiers as war-gear [behavior] | iron-plated oathsworn armor and shield [object]
[concept] identity: Opens by calling down a radiant smite on the most visibly corrupt foe in reach, then settles into a rhythm of shield-wall strikes and spoken prayers that stitch her wounded soldiers back together mid-fight. She holds the line rather than chasing — blade and benediction alternating with every unit in her sight, so the longer the melee runs the harder her side is to break. Under pressure she plants like iron and refuses to yield an inch, fighting to the last of her strength because retreat is an oath she has already sworn never to take.
[concept] lore: A sworn sword of a militant holy order, she took a vow to cleanse the unclean from the battlefield and to spend her own life before she abandons a single soldier to die beside her.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] print canon route: the Gladiator is not a caster first and keys STR 18 over DEX 15 — it casts no spells — the caster family stands down for the plain defender line
[reskin] print canon array: STR 20, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +8
[reskin] donor: defender-5 -> CR 8
[reskin] style unserved: "warpriest" has no defender line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "an oathsworn crusader who smites the unclean and mends her soldiers" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Radiant Smite" deals Radiant on a Humanoid whose concept names no Radiant — a name is not a warrant; use a physical type
[reskin] kit energy: "Divine Smite" deals Radiant, not Bludgeoning — the shape's own fiction
[reskin] class kit: paladin — "crusader": Aura of Authority (Hobgoblin Captain/Aura of Authority), Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] inline declared: "Seraphine" — the call's own answer (person), built from the name
[reskin] inline form: "Seraphine" — the model's own reading of the name
[reskin] energy kept on a base row: "Radiant Smite" Radiant — the row's own noun pays for it
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an oathsworn crusader" -> has (descriptive), head | "smites the unclean" -> has (mechanical) [asked: attack] | "mends her soldiers" -> has (mechanical) [asked: heal]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When Seraphine strikes an unclean or corrupt foe with her holy-charged weapon, the blow brands the target and lights up every enemy near it, and the soldiers fighting beside her surge forward to exploit the opening. Her allies who can see the branded foe find their next strikes against it truer and their footing steadier, as if her oath has briefly made the unclean the only thing in the world wort" [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] word match declined by the call: rally, aggro-curse — the key word does not mean the mechanic here
[reskin] signature template: reveal -> Actions/"Brand of Vengeance (2/Day)" ("the holy-charged blow brands the unclean foe and lights it up, making it the onl [verb: light:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's AC 16 at CR 8, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Seraphine's oathbound plate and shield grow heavier and more unyielding the longer she holds her ground, and every wound her soldiers take in her sight steels her instead of slowing her; the longer the line holds, the harder she becomes to break." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, guarded-stance, undead-fortitude, adhesive, berserk, relentless-pursuit, bound — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Seraphine's oathbound plate and shield grow heavier and more unyielding the longer she holds her ground, and every wound her soldiers take in her sight steels her instead of slowing her; the longer the line holds, the harder she becomes to break." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst, resonant-body)
[reskin] weapons answered: Longsword = longsword; Radiant Smite = none
[reskin] print canon alignment: Lawful Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Celestial" -> "Common, Celestial" — the Gladiator's plus the concept's Celestial
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Longsword" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Radiant Smite leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon row priced: Shield Bash — dice 9 → 27
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] dead control row: "Brand of Vengeance" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Brand of Vengeance.
[reskin] audit rewrite blocked — "Shield Bash" is engine-authored chassis text
[reskin] audit rewrite blocked — "Shield Bash" is engine-authored chassis text
[reskin] audit rename blocked — "Searing Mark" claims an element "Brand of Vengeance" does not pay (no damage)
```


---

## Ser Aldric Vane — a 2014 sheet

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ser Aldric Vane | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 10 → 7; sustained 66 (3 × Longsword); nova none; dmg 66

```
Ser Aldric Vane
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

Athletics +7, Perception +4

Saving Throws: 

STR +7, CON +6

Senses: 

passive Perception 14

Languages: 

Common

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Second Wind (2/Day). As a bonus action, Aldric regains 19 (3d12) hit points.
Riposte (Reaction). When a creature within 5 feet of Aldric misses it with a melee attack, Aldric makes one longsword attack against that creature.

Actions
Multiattack: Aldric makes three Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) slashing damage, and the target has disadvantage on its next attack roll before the start of Aldric's next turn.
Shield Bash: One creature within 5 feet of Aldric that it can see must make a DC 15 Strength saving throw, taking 10 (3d6) bludgeoning damage on a failed save. If the target is Medium or smaller, it is also knocked prone.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Longsword — authored for this sheet; a named part; a declared feature; the GM's clause "a veteran soldier with a longsword"; weapon longsword
- Actions/Shield Bash — template shield-bash; fighter kit; the GM's clause "bashes with a buckler"
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "soldier"
- Bonus Actions/Second Wind — template second-wind; fighter kit; the GM's clause "soldier"

**Engine trace**

```
[path] class_npc — class fighter — "soldier" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a veteran soldier with a longsword who b") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: longsword and buckler worked in tandem [object] | holding a line and punishing those who slip past [behavior]
[concept] identity: A grizzled line-holder who steps into the gap and makes it a wall, opening with a measured longsword thrust before settling into a rhythm of cut, shield-check, cut. Each round the buckler becomes a second weapon — a shoved rim to stagger, a raised guard to deny, a bash to punish anyone who tries to slip past him for softer targets. He gives ground only as a tactical retreat, never a rout; bloodied, he tightens into pure defense and trades strikes for time, preferring to die at his post than abandon it.
[concept] lore: A career soldier who survived every campaign his lords forgot to end, he holds a rented stretch of road or a doorway for whoever last paid him and considers breaking that contract the one dishonor left to him.
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
[reskin] inline declared: "Aldric" — the call's own answer (person), built from the name
[reskin] inline form: "Aldric" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a veteran soldier with a longsword" -> has (descriptive), head | "bashes with a buckler" -> has (descriptive)
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "When Aldric hits a creature with his longsword while his buckler is still up from a shield bash, he drives the rim into the same foe in the same motion, shoving them back a step so they cannot close the gap he just opened. Anyone he shoves this way stays where he puts them until they spend a moment re-squaring their footing, giving his line a breath to hold." [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally)
[reskin] word match declined by the call: rally, patient-defense, herd, charge-push, stunning-strike, hook-rider, own-turn-punisher — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When Aldric hits a creature with his longsword while his buckler is still up from a shield bash, he drives the rim into the same foe in the same motion, shoving them back a step so they cannot close the gap he just opened. Anyone he shoves this way stays where he puts them until they spend a moment re-squaring their footing, giving his line a breath to hold." [rider/on_hit/movement] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, herd, patient-defense, own-turn-punisher, rally)
[reskin] fallback respects the call: own-turn-punisher, herd left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Aldric fights shield-first: whenever a creature slips close to swing at him, the buckler is already between them, and he answers the opening with a quick shield-check that staggers the attacker off balance. He cannot do this if he has just bashed with the same shield, so he must choose each moment between bashing and guarding." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "Aldric fights shield-first: whenever a creature slips close to swing at him, the buckler is already between them, and he answers the opening with a quick shield-check that staggers the attacker off balance. He cannot do this if he has just bashed with the same shield, so he must choose each moment between bashing and guarding." [trait/on_being_hit/condition] — no template on the shelf shares a verb with the concept or the idea (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] weapons answered: Longsword = longsword; Buckler Bash = buckler
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "Aldric makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] multiattack re-read — "Longsword" joins the combination; "Aldric makes three attacks, using Spear or Longsword in any combination. It can replace on"
[reskin] multiattack re-read: "Spear" is not on this sheet, so the combination now reads "Aldric makes three Longsword attacks. It can replace one attack with a use of Sh"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Sessrak the Nerve-Taker — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sessrak the Nerve-Taker | 5 | skirmisher-3 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 8 (print at 5 reads 2–8.5, n=52)
- bands · soft · hot-offense: offense alone reads CR 11, 6 over; the HP axis pulls the read to 8
- **dropped clause:** "strikes pressure points with an open hand"
- read: def 5 / off 11 → 8; sustained 70 (2 × Shortsword); nova none; dmg 70

```
Sessrak the Nerve-Taker

Medium Humanoid, Neutral

AC 16
Initiative +4 (14)

HP 91 (14d8 + 28)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
11
+0
+0
INT
16
+3
+3
MOD
SAVE
DEX
18
+4
+7
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
10
+0
+0

Skills Perception +3, Stealth +7

Resistances Poison

Senses Passive Perception 13

Languages Common, Thieves' cant, Draconic

CR 5 (XP 1,800; PB +3)

Traits

Hold Breath. Sessrak can hold its breath for 15 minutes.

Marsh Stride. Difficult Terrain composed of mud doesn't cost Sessrak extra movement, and Sessrak can move across mud without needing to make an ability check.

Evasion. If Sessrak is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Sessrak instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Sessrak makes two attacks, using Shortsword or Light Crossbow in any combination.

Shortsword. Melee Attack Roll: +7, reach 5 ft. 18 (4d6 + 4) Piercing damage plus 17 (5d6) Poison damage, and the target has the Poisoned condition until the start of the assassin's next turn. Once on each of Sessrak's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of Sessrak's next turn.

Light Crossbow. Ranged Attack Roll: +7, range 80/320 ft. 17 (3d8 + 4) Piercing damage.

Bonus Actions

Patient Defense. Sessrak takes the Dodge action.

Cunning Action. Sessrak takes the Dash, Disengage, or Hide action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
- Traits/Evasion — print's own row
- Actions/Multiattack — the chassis
- Actions/Shortsword — print's own row, renamed; a declared feature; the GM's clause "monk"; weapon shortsword
- Actions/Light Crossbow — print's own row, renamed; weapon light crossbow
- Bonus Actions/Patient Defense — template patient-defense; monk kit; the GM's clause "monk"
- Bonus Actions/Cunning Action — print's own row

**Engine trace**

```
[path] class_npc — class monk — species lizardfolk — "monk" (call)
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("a lizardfolk monk who strikes pressure p") | skirmisher: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a lizardfolk monk who strikes pressure p…" is the description, not a name
[concept] resolve: archetype=skirmisher type=Humanoid themes=venomous/mind mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: open-palm pressure-point strikes [behavior] | cold-blooded reptilian body [body] | dart in, dart out skirmishing [behavior]
[concept] identity: The Pressure-Point Adept opens a fight by circling at the edge of reach, then darts in to land an open-palm strike on a nerve cluster before slipping back out before the target can answer. Every round after, it keeps moving through the scrum—using allies or terrain to break pursuit—looking for the one clean tap that will deaden an arm or drop a foe's knees. It is patient and disciplined rather than savage, fighting to submission but withdrawing into its warren-blooded kin if the exchanges go badly.
[concept] lore: Raised among lizardfolk who learned that the swamp's most feared predators are not the ones with the biggest teeth, it seeks challengers whose bodies it can study and unmake one pressure point at a time.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the monk stands on the Assassin — the class's own print block, nearest CR 5
[reskin] print canon array: STR 11, DEX 18, CON 14, INT 16, WIS 11, CHA 10 — the Assassin's; DEX 18 outranks the card's +6, so the sheet rolls +7 (raise-only)
[reskin] donor: skirmisher-3 -> CR 5
[reskin] [path] decides: class_npc on the Assassin · class monk (the matcher would have said homebrew)
[reskin] print canon: "a lizardfolk monk who strikes pressure points with an open hand" heads on the Assassin — print's rows ride along; the seat stays
[reskin] row evicted for the cap: Traits/"Slip Step" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "monk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] row evicted for the cap: Bonus Actions/"Fleet Agility" (chassis filler) leaves so "Patient Defense" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Palm Strike), Patient Defense (patient-defense)
[reskin] inline declared: "Sessrak" — the call's own answer (person), built from the name
[reskin] inline form: "Sessrak" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a lizardfolk monk" -> has (descriptive), head | "strikes pressure points with an open hand" -> has (mechanical) [asked: on_hit/attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Sessrak takes a breath and reads the nearest foe's body, then darts in and taps one cold nerve cluster with an open palm. The struck foe's limbs go dead and clumsy — its weapon arm sags, or its legs buckle — so it can barely strike or flee, and Sessrak slips back out through the mud before it can answer. This can only be attempted once the target has already been stunned by Sessrak's palm, while t" [rider/on_hit/condition] — menu: charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] word match declined by the call: disarm, feint-slip, throw-retrieve, spew, riposte, charge-push, hook-rider, pounce, isolation, bolt-mark, charge — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown riposte, which the GM's words keyed
[reskin] key match declined: action — "riposte" was ranked first on the call's own menu for opening, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Sessrak takes a breath and reads the nearest foe's body, then darts in and taps one cold nerve cluster with an open palm. The struck foe's limbs go dead and clumsy — its weapon arm sags, or its legs buckle — so it can barely strike or flee, and Sessrak slips back out through the mud before it can answer. This can only be attempted once the target has already been stunned by Sessrak's palm, while t" [rider/on_hit/condition] — the model found no template that holds it (offered: riposte, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, disarm, feint-slip, throw-retrieve, spew)
[reskin] fallback respects the call: feint-slip, disarm left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Assassin's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Sessrak's cold reptile blood lets it stay perfectly still for as long as it likes — it can hold a crouch at the swamp's edge or pressed to a tree for hours without twitching, waiting for a foe to expose a pressure point. Only sudden heat breaks the stillness, forcing it to abandon the ambush and move." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: false-appearance, terrain-walk, assassinate, uncanny-sense — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Sessrak's cold reptile blood lets it stay perfectly still for as long as it likes — it can hold a crouch at the swamp's edge or pressed to a tree for hours without twitching, waiting for a foe to expose a pressure point. Only sudden heat breaks the stillness, forcing it to abandon the ambush and move." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] weapons answered: Palm Strike = none; Stone Sling = sling
[reskin] weapon table: "Stone Sling" — a launcher, never thrown, range 30/120
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "Draconic" -> "Common, Draconic" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Assassin's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Draconic" -> "Common, Thieves' cant, Draconic" — the Assassin's plus the concept's Draconic
[reskin] print canon attack: "Palm Strike" -> "Shortsword" — the Assassin's own row
[reskin] print canon attack: "Stone Sling" -> "Light Crossbow" — the Assassin's own ranged row
[reskin] print canon defenses: resistances none -> Poison — the Assassin's own header lines
[reskin] print canon trait: Evasion — "a lizardfolk monk who strikes pressure points with an open hand" is the Assassin (print's own row)
[reskin] print canon row: Bonus Actions/Cunning Action — the Assassin's own
[reskin] asked but unanswered: "strikes pressure points with an open hand" asked for on_hit and no row binds the clause
audit finding below confidence gate: Shortsword 2014-format condition phrasing ('has the [condition] condition') rather than 2024-format 'is Poisoned until'.
[reskin] species kit: Swim 30 ft. — the lizardfolk's
```


---

## Vaelith Emberstep — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vaelith Emberstep | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 34 (2 × Scimitar); nova none; dmg 34

```
Vaelith Emberstep

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

Assassinate. During the first round of each combat, Vaelith has Advantage on attack rolls against any creature that hasn't taken a turn. If Vaelith hits a creature during that round, the target takes an extra 9 (2d8) Slashing damage.

Evasion. If Vaelith is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Vaelith instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Vaelith makes two attacks, using Scimitar or Pistol in any combination.

Scimitar. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Slashing damage.

Pistol. Ranged Attack Roll: +6, range 30/90 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Vaelith takes the Dash, Disengage, or Hide action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
- Actions/Scimitar — print's own row, renamed; weapon scimitar
- Actions/Pistol — print's own row, renamed; weapon pistol
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "rogue"

**Engine trace**

```
[path] class_npc — class rogue — species tiefling — "rogue" (call)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("stalks the rooftops of the old quarter") | skirmisher-skulker: key "stalks" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=fiendish/armed mind=sapient style=skulker energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: stalking the rooftops unseen [behavior] | strike from hiding with advantage [behavior] | infernal tiefling bloodline [body]
[concept] identity: This tiefling rogue shadows the old quarter's rooftops, opening each fight with a crossbow bolt or a dagger from the dark before her quarry ever hears a footfall. Every round after that she repositions along eaves and gables to strike again with advantage, using the heights to hide and vanish between blows. When bloodied, she retreats across the rooftops rather than press a losing fight, favoring her own skin over the kill.
[concept] lore: Born under a cursed sign in the crowded tenements of the old quarter, she learned the rooftops as a child and now sells her silent work to whoever will pay, guarding her territory from any who would claim it.
[reskin] energy withheld: Fire on a Humanoid with no Fire in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the rogue stands on the Bandit Captain — the class's own print block, nearest CR 5
[reskin] print canon array: STR 15, DEX 16, CON 14, INT 14, WIS 11, CHA 14 — the Bandit Captain's, DEX fitted to +6
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Bandit Captain · class rogue (the matcher would have said twist Spy)
[reskin] print canon: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Bandit Captain — print's rows ride along; the seat stays
[reskin] species kit: tiefling — "rogue": header lines only; darkvision 60 ft.; resistance Fire
[reskin] class kit: Cunning Action — the sheet already carries it, so the rogue kit adopts that row: the cap may no longer read it as filler
[reskin] row evicted for the cap: Traits/"Eave Runner" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "rogue": Evasion (evasion), Assassinate (assassinate)
[reskin] inline declared: "Vaelith" — the call's own answer (person), built from the name
[reskin] inline form: "Vaelith" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tiefling rogue" -> has (descriptive), head | "stalks the rooftops of the old quarter" -> has (mechanical) [asked: at_will/movement]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When Vaelith strikes a creature from hiding, the wound stays quiet and bleeding—the target doesn't notice the blood until the next moment its guard slips, and the pain flares when it tries to act against her. Until it shakes the wound off, every attempt it makes to close on her or call for help staggers short as the cut bites deeper." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] word match declined by the call: rampage, focus, feint-slip — the key word does not mean the mechanic here
[reskin] fit declined: "Quiet Bleed" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: focus, rampage left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Bandit Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Vaelith reads the old quarter's rooftops like a map of her own veins, and any height she reaches becomes her hunting blind—she melts into gables, chimneys, and eaves as easily as open shadow, so quarry who scan the skyline for her find only the city's silhouette." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, gaze-aura)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] word match declined by the call: spider-climb, faultless-tracker — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for stalks+stalk, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Vaelith reads the old quarter's rooftops like a map of her own veins, and any height she reaches becomes her hunting blind—she melts into gables, chimneys, and eaves as easily as open shadow, so quarry who scan the skyline for her find only the city's silhouette." [trait/always/defense] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, blurred-form, death-burst)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Dagger = dagger; Hand Crossbow = hand crossbow
[reskin] weapon table: "Hand Crossbow" — a launcher, never thrown, range 30/120
[reskin] print canon modes: climb off — the Bandit Captain has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] print canon languages: "Common, Infernal" -> "Common, Thieves' cant, Infernal" — the Bandit Captain's plus the concept's Infernal
[reskin] print canon attack: "Dagger" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon attack: "Hand Crossbow" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] on-hit extra retyped: "Assassinate" adds Slashing, not Bludgeoning — the hit's own type (Scimitar)
[reskin] ask vs row MISMATCH: "stalks the rooftops of the old quarter" -> "Assassinate" — trigger: asked at_will, row reads on_hit
audit finding below confidence gate: Assassinate The trigger condition depends on whether the target has taken a turn, so Vaelith's own initiative position relative to targets must be tracked; the block gives no way to resolve 'first round' ordering and an ability usable on its own turn before any target has acted is fine but ambiguous for targets that have not yet had their slot.
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Rooftop Stalker" [catalog: faultless-tracker]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, Vaelith has Advantage on attack rolls against any creature that hasn't taken a turn. If Vaelith hits a creature during that round, the target takes an extra 9 (2d8) Slashing damage.
Traits / AFTER   Rooftop Stalker: Vaelith knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.
provenance: catalog template "faultless-tracker", binds stalks, stalk
```


---

## Unmet Hour — one marked soft

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Unmet Hour | 6 | caster-6 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Slam
- read: def 3 / off 5 → 4; sustained 36 (3 × Slam); nova none; dmg 36

```
Unmet Hour

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

Skills Arcana +6, Perception +4

Senses Passive Perception 14

Languages Common and any three languages

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The unmet hour makes three Slam attacks.

Slam. Melee Attack Roll: +6 reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Spellcasting. The unmet hour casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). The unmet hour casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Trigger: The unmet hour is hit by an attack roll. Response: The unmet hour casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
- Actions/Slam — the chassis
- Actions/Spellcasting — print's own row
- Reactions/Protective Magic — mage kit; the GM's clause "wizard"
- Bonus Actions/Misty Step — mage kit; the GM's clause "is never where you struck and steps away"

**Engine trace**

```
[path] class_npc — class mage — "wizard" (call)
[route] caster (artillery) type=Humanoid mechanics=teleport — casts: implied by the kind — "a court wizard" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("a court wizard") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid themes=arcane/uncanny mind=sapient style=— energy=Force mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: never where the blow lands; steps aside a half-step ahead of the strike [behavior] | arcane bolts and blasts delivered between displacements [behavior] | a body that is thinning into its own shadow [body]
[concept] identity: The court wizard opens by stepping half a pace out of the world, letting the first blow pass through the empty air where it stood, then answers with a precise arcane bolt before drifting further back. Every round it trades ground for distance, never in the spot its foes committed to, until it has bled the fight into a corridor of misses. It is patient and contemptuous, treating the duel as choreography it has already rehearsed, and slips away rather than die.
[concept] lore: A palace mage who learned to keep the one appointment no assassin can plan for, it now serves no court but its own reflection — stepping out of every blow a former patron pays to land.
[reskin] energy withheld: Force on a Humanoid with no Force in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 6
[reskin] print canon defenses: HP 89 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-6 -> CR 6
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said twist Mage)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 2 defect(s) — name "Arcane Bolt" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade | "Arcane Bolt" deals Force on a Humanoid whose concept names no Force — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] inline declared: "the unmet hour" — the call's own answer (kind), built from the name
[reskin] inline form: "the unmet hour" — the model's own reading of the name
[reskin] energy withheld on a base row: "Arcane Bolt" Force -> Piercing (the row's own noun; a Humanoid deals no Force its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "is never where you struck and steps away" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a court wizard" -> has (descriptive), head | "is never where you struck and steps away" -> has (mechanical) [asked: on_being_hit/movement]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The unmet hour fires a bolt that marks where the target stood, and thereafter that spot is where it will not be struck — it flinches one half-step sideways through its own afterimage, leaving the bolt's scar as a decoy. Until the hour's next turn, the first attacker who swings at it mistakes the afterimage for the wizard and their blow lands on empty air." [rider/on_hit/defense] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] word match declined by the call: phase-slip, bolt-mark, bolt-restrain, bolt-drag, snare-bolt, delayed-brand, reveal, aggro-curse — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown phase-slip, which the GM's words keyed
[reskin] key match declined: action — "phase-slip" was ranked first on the call's own menu for step, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The unmet hour fires a bolt that marks where the target stood, and thereafter that spot is where it will not be struck — it flinches one half-step sideways through its own afterimage, leaving the bolt's scar as a decoy. Until the hour's next turn, the first attacker who swings at it mistakes the afterimage for the wizard and their blow lands on empty air." [rider/on_hit/defense] — the model found no template that holds it (offered: phase-slip, bolt-restrain, bolt-drag, bolt-mark, snare-bolt, delayed-brand, reveal, aggro-curse)
[reskin] fallback respects the call: phase-slip, snare-bolt, delayed-brand, aggro-curse left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Mage's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Its body is a shadow the palace forgot to dismiss: whenever it is struck by something it can see, the blow passes into the thinning outline and leaves it sliding a pace toward its own shadow, so the same attack never finds it twice from the same angle. It is always better off against a foe it has already shown its back to." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] word match declined by the call: evasion — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown evasion, which the GM's words keyed
[reskin] key match declined: trait — "evasion" was ranked first on the call's own menu for never where, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Its body is a shadow the palace forgot to dismiss: whenever it is struck by something it can see, the blow passes into the thinning outline and leaves it sliding a pace toward its own shadow, so the same attack never finds it twice from the same angle. It is always better off against a foe it has already shown its back to." [trait/on_being_hit/movement] — the model found no template that holds it (offered: evasion, absorption, bloodied-burst, resonant-body, marking-light)
[reskin] concept-first trait skipped: evasion — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Arcane Bolt = none
[reskin] weapon declined: "Arcane Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Arcane Bolt" — a launcher, never thrown, range 80/320
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon multiattack: "The unmet hour makes three Arcane Burst attacks." — the Mage's own
[reskin] ranged row narrowed, not removed: "Arcane Bolt" is the only attack on the sheet — the Mage carries no ranged row, so the row becomes melee at reach 5 rather than leaving a sheet with nothing to attack with
[reskin] attack name by anatomy: "Arcane Bolt" -> "Slam" — bolt is a ranged noun on a melee row
[reskin] attack name by anatomy: "Slam" -> "Slam" — a slam deals Bludgeoning, not Piercing
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] ask vs row MISMATCH: "is never where you struck and steps away" -> "Misty Step" — trigger: asked on_being_hit, row reads at_will
audit finding below confidence gate: Protective Magic (3/Day) *Shield* has a casting time of 1 reaction, so the 3/Day reaction expenditure and the flat printed +5 bonus double-count the same mechanics and force the GM to reconcile the statblock's limiter with the spell's own rules (plus an escalation question if it upcasts); the entry re-states the spell's effect instead of just enabling the cast.
[reskin] multiattack re-read — "Slam" joins the combination; "The unmet hour makes three attacks, using Arcane Burst or Slam in any combination."
[reskin] multiattack re-read: "Arcane Burst" is not on this sheet, so the combination now reads "The unmet hour makes three Slam attacks."
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

Skills Athletics +7, Perception +4

Senses Passive Perception 14

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
[concept] signature elements: shield planted to hold a line [object] | punishing strikes against anyone who moves past her [behavior] | unbroken drill and battlefield discipline [behavior]
[concept] identity: Dame Oriel plants herself at the choke point and does not move: she opens by advancing shield-first to lock an enemy into her reach, then spends every round cutting at whoever tries to slip past her or strike at her allies, her longsword answering each opening with a measured counter. She is disciplined rather than cruel — she will hold a doorway against a dozen until bloodied, but once the line is truly broken she withdraws in good order, dragging the wounded with her and swearing to return.
[concept] lore: A veteran of a dozen border sieges, Dame Oriel swore an oath over her shield to never again let a charge break behind her, and something in that oath took hold — she now walks the old roads looking for the line that needs holding.
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
[reskin] chassis row off: Actions/"Measured Sword Thrust" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "knight": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] proper noun: "Dame Oriel" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Dame Oriel" — the call's own answer (person), built from the name
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered limit "at_will" for "keeps the line with a shield and a longsword" but offered no quote
[reskin] clauses: "Dame Oriel — a knight" -> has (descriptive), head | "keeps the line with a shield and a longsword" -> has (mechanical) [asked: condition]
[reskin] signature idea (action): "When a foe within her reach tries to disengage and slip away, or darts past her toward her allies, Oriel answers instantly with a hard shield-first shove, slamming the shield's rim into them to knock them off balance and halt their escape. Anyone she catches this way is thrown back a step and left staggered, their flight broken before it starts." [reaction/on_being_hit/movement] — menu: EMPTY (+ shelf: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] fit declined: "Shieldwall Shove" — a print body takes only what the user's words ask; the call quotes "keeps the line with a shield", which is no unanswered twist clause — a head, a header, a lack, or a clause the GM's own weapon already answers (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Oriel keeps her shield planted and her shoulders set; so long as she stays in one place and her guard is whole, anyone who tries to walk past her through her reach finds the shield interposed and their movement snagged to a crawl, as though the air itself had become a wall. If she is ever bloodied, that planted wall falters until she finds her feet again." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-fury, uncanny-sense, bloodied-burst, false-appearance, adhesive, terrain-walk, aberrant-ground, berserk — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Oriel keeps her shield planted and her shoulders set; so long as she stays in one place and her guard is whole, anyone who tries to walk past her through her reach finds the shield interposed and their movement snagged to a crawl, as though the air itself had become a wall. If she is ever bloodied, that planted wall falters until she finds her feet again." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
[reskin] weapons answered: Longsword = longsword; Shield Bash = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "Dame Oriel makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack re-read — "Longsword" joins the combination; "Dame Oriel makes three attacks, using Spear or Longsword in any combination. It can replac"
[reskin] multiattack re-read: "Spear" is not on this sheet, so the combination now reads "Dame Oriel makes three Longsword attacks. It can replace one attack with a use o"
```


---

## Gormak the Scarhide — in the run

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gormak the Scarhide | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Spear); nova none; dmg 54

```
Gormak the Scarhide

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

Berserk. Whenever Gormak starts its turn Bloodied, roll 1d6. On a 6, Gormak goes berserk. On each of its turns while berserk, Gormak attacks the nearest creature it can see. If no creature is near enough to move to and attack, Gormak attacks an object. Once Gormak goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, Gormak has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost Gormak extra movement, and Gormak can move across ice or snow without needing to make an ability check.

Actions

Multiattack. Gormak makes two Spear attacks. It can replace one attack with a use of Shield Bash.

Spear. Melee or Ranged Attack Roll: +8, reach 5 ft. or range 20/60 ft. 27 (5d8 + 5) Piercing damage.

Shield Bash. Strength Saving Throw: DC 16, one creature within 5 feet that Gormak can see. Failure: 27 (6d8) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
- Actions/Spear — print's own row, renamed; weapon spear
- Actions/Shield Bash — print's own row
- Traits/Berserk — template berserk; barbarian kit; the GM's clause "loses control when wounded"
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "berserker"
- Traits/Mountain Stride — goliath kit; the GM's clause "berserker"

**Engine trace**

```
[path] class_npc — class barbarian — species goliath — "berserker" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a goliath berserker") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a goliath berserker who loses control wh…" is the description, not a name
[concept] resolve: archetype=brute type=Giant themes=bestial/terror mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: rage that takes hold once wounded [behavior] | scarred hide-and-trophy wrappings [body] | chipped greatsword swung two-handed in wild arcs [object]
[concept] identity: A hide-wrapped goliath berserker wades in with a chipped greatsword, swinging wide and trading blows shoulder-to-shoulder until a wound lands — then the rage takes the wheel, and it stops guarding entirely, driving forward with windmilling, screaming fury. Wounded, it never retreats and never toys; it fights to the death, redoubling each round until either it or everything in reach is down.
[concept] lore: Mountain-born goliath outcasts bind their shame in scarred hide and wander the low roads picking fights they cannot walk away from, because losing control is the only absolution they know.
[reskin] [path] class body: the barbarian stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] the concept outranks the alias: the Gladiator is a Humanoid and the concept reads Giant — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 20, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +8
[reskin] donor: brute-5 -> CR 8
[reskin] [path] decides: class_npc on the Gladiator · class barbarian (the matcher would have said homebrew)
[reskin] print canon: "a goliath berserker who loses control when wounded" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] species kit: goliath — "berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Berserk (berserk); Rampage yielded to print's row cap 5
[reskin] inline declared: "Gormak" — the call's own answer (person), built from the name
[reskin] inline form: "Gormak" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered limit "at_will" for "loses control when wounded" but offered no quote
[reskin] clauses: "a goliath berserker" -> has (descriptive), head | "loses control when wounded" -> has (mechanical) [asked: when_bloodied/buff_self]
[reskin] signature idea (action): "When a wound lands on Gormak, the rage roars up and it answers immediately by lunging at whoever drew its blood, driving the greatsword home before the enemy can step away. This is a reflex it cannot refuse — every fresh gash just hands it another swing at the one who caused it." [reaction/on_being_hit/damage] — menu: EMPTY (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — rampage, affliction (wound)
[reskin] word match declined by the call: rampage, affliction, terror-pulse, own-turn-punisher — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rampage, affliction, which the GM's words keyed
[reskin] key match declined: action — "rampage" was ranked first on the call's own menu for wound, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When a wound lands on Gormak, the rage roars up and it answers immediately by lunging at whoever drew its blood, driving the greatsword home before the enemy can step away. This is a reflex it cannot refuse — every fresh gash just hands it another swing at the one who caused it." [reaction/on_being_hit/damage] — the model found no template that holds it (offered: rampage, affliction, terror-pulse, own-turn-punisher)
[reskin] fallback respects the call: rampage, terror-pulse, own-turn-punisher left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Gormak's hide wraps are sewn thick with the scars and trophies of every fight it has walked away from, and when the rage ignites, those seams pull tight — the wrappings bind its flesh and keep it swinging past the point where a sane fighter would drop." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury, bloodied-burst (wounded)
[reskin] trait ceiling: "Scar-Bound Fury" does not ship — 3 traits already, and print's ceiling for a meat body is 3
[reskin] weapons answered: Greatsword = greatsword; Handaxe = handaxe
[reskin] weapon table: "Handaxe" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the words say giant ("a dire wolf but undead", 2026-10-01)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Greatsword" -> "Spear" — the Gladiator's own row
[reskin] ranged row off: "Handaxe" leaves — the Gladiator carries no ranged row and the words name none
[reskin] multiattack re-read — "Handaxe" left; "Multiattack" now reads "Gormak makes two Spear attacks."
[reskin] print canon row priced: Shield Bash — dice 9 → 27
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 14" -> "Passive Perception 14")
[reskin] ask vs row MISMATCH: "loses control when wounded" -> "Berserk" — trigger: asked when_bloodied, row reads at_will
[reskin] audit rewrite blocked — "Shield Bash" is engine-authored chassis text
```


---

## Ser Warden Aubrec — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ser Warden Aubrec | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 30 (2 × Longsword); nova none; dmg 30

```
Ser Warden Aubrec

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

Aura of Authority. While in a 10-foot Emanation originating from the aubrec, the aubrec and its allies have Advantage on attack rolls and saving throws, provided the aubrec doesn't have the Incapacitated condition.

Actions

Multiattack. The guard makes two attacks, using Longsword or Mace in any combination.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the aubrec's next turn.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage, and the target has Disadvantage on its next attack roll before the start of the aubrec's next turn.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:1146:31
    at callLLM (http://localhost:5173/src/tools/statblock-generator/reskin/generate.mjs?t=1792416438352:1319:24)
    at generateReskin (http://localhost:5173/src/tools/statblock-generator/reskin/generate.mjs?t=1792416438352:1937:21)
    at generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:1105:28)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:657:5)
[reskin] network retry: Failed to fetch — retrying the call once
[path] class_npc — class paladin — "templar" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: mace and shield, faith without magic [object] | holds the line and punishes anyone who slips past [behavior] | an unbroken vow that steadies those beside him [aura]
[concept] identity: A templar priest who opens by planting his shield and offering truce — then wades in with a mace for any who refuse it, using the shield to shove foes back and keep his line unbroken. Every round he stays shoulder-to-shoulder with his allies, punishing anyone who tries to slip past him with a crushing counterblow. He neither flees nor gloats: he fights to the death as an act of faith, meeting every blow with the same patient, unshakable resolve.
[concept] lore: Stripped of his order's rites and relics, this priest carries his vows in his armor and his mace, guarding the last sanctified ground he remembers until someone worthier releases him from duty.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
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
[reskin] inline by rule: "the aubrec" — the call answered "Ser Warden" (person), which the name does not support
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] signature idea (action): "When a foe tries to move past or away from him while he still stands, he lashes out with the flat of his shield and a follow-up swing of the mace, catching the fleeing enemy mid-stride. Anyone struck this way is staggered and stopped cold, their retreat spoiled, and he simply steps back into his place in the line." [reaction/on_being_hit/damage] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When a foe tries to move past or away from him while he still stands, he lashes out with the flat of his shield and a follow-up swing of the mace, catching the fleeing enemy mid-stride. Anyone struck this way is staggered and stopped cold, their retreat spoiled, and he simply steps back into his place in the line." [reaction/on_being_hit/damage] — the model found no template that holds it (offered: snap-shot, riposte, own-turn-punisher, slow-bolt, patient-defense, rally)
[reskin] fallback stands down: the class_npc path has no shelf — the Guard Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 18 already beats print's AC 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "He plants his shield and offers a truce before the first blow, and those who accept his terms find their weapons strangely heavy against him and his companions standing beside him. The moment anyone in his line is struck, his patience hardens and he answers the attacker with a crushing counterblow on the spot." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] trait declined: "Offered Truce" — a shape fit with no verb match on a Humanoid body; a meat body earns its trait by a verb
[reskin] weapons answered: Mace = mace; Javelin = javelin
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Guard Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon row: Actions/Longsword — the Guard Captain's second melee row, beside the chassis's
[reskin] print canon multiattack: "The guard makes two attacks, using Javelin or Longsword in any combination." — the Guard Captain's own
[reskin] ranged row off: "Javelin" leaves — the Guard Captain carries no ranged row and the words name none
[reskin] multiattack re-read — "Javelin" left; "Multiattack" now reads "The guard makes two Longsword attacks."
[reskin] multiattack re-read — "Mace" joins the combination; "The guard makes two attacks, using Longsword or Mace in any combination."
```


---

## Thurivald — in the run

**Concept:** name: Thurivald | a skald who sings his warband into a fury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Guard Aura, Actions/Skald's Axe Throw
- read: def 3 / off 10 → 6.5; sustained 66 (3 × Skald's Axe Throw); nova none; dmg 66

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

Athletics +3, Perception +5

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

Guard Aura. While within 10 feet of Thurivald, its allies have advantage on saving throws, provided Thurivald isn't incapacitated.
Captain's Charm. As a bonus action, Thurivald targets one creature it can see within 30 feet of it. The target must succeed on a DC 14 Wisdom saving throw or be charmed until the start of Thurivald's next turn.

Actions
Multiattack: The thurivald makes three attacks, using Rapier, Pistol, or Skald's Axe Throw.
Rapier: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage, and the thurivald has advantage on the next attack roll it makes before the end of this turn.
Skald's Axe Throw: Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage.
Pistol: Ranged Weapon Attack: +7 to hit, range 30/90 ft., one target. Hit: 15 (2d10 + 4) piercing damage.
```

**Where each row came from**

- Traits/Guard Aura — the chassis
- Actions/Multiattack — the chassis
- Actions/Rapier — print's own row, renamed; weapon rapier
- Actions/Skald's Axe Throw — weapon scimitar
- Actions/Pistol — print's own row; weapon pistol
- Bonus Actions/Captain's Charm — bard kit; the GM's clause "skald"

**Engine trace**

```
[path] class_npc — class bard — "skald" (call)
[route] defender-leader type=Humanoid mechanics=aura — casts: implied by the kind — "sings his warband into a fury" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] name: "Thurivald" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=voice/armed mind=sapient style=leader energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Thurivald"
[concept] mechanics: aura
[concept] signature elements: war-song that whips his warband into a fury [behavior] | iron-throated skald who sings and fights at once [body]
[concept] identity: Thurivald opens the fight by bellowing a skald's war-song that sets his warband ablaze with fury, then wades into the melee beside them, parrying blows off his shield and striking with a broad axe while his verse keeps the troops pressing forward. Every round he re-weaves the song — shifting its tide from ferocity to feigned retreat — so long as his voice holds, and he fights to the death before he lets an ally hear silence. Under pressure he falls back fighting, hoarding his last stanza for a rally that drags his band back from the brink.
[concept] lore: A Skald of the Iron Choir, Thurivald sold his true name to the verses he now sings, and he wants nothing more than a war that outlives its own singers.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the bard stands on the Pirate Captain — the class's own print block, nearest CR 6
[reskin] print canon route: the Pirate Captain's body outranks the leader seat — no verb in the words names it; the plain defender line
[reskin] print canon defenses: HP 114 -> 84, AC 18 -> 17 — the Pirate Captain's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 10, DEX 18, CON 14, INT 10, WIS 14, CHA 17 — the Pirate Captain's at its own CR; attack +6 -> +7, DC 14 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] [path] decides: class_npc on the Pirate Captain · class bard (the matcher would have said homebrew)
[reskin] print canon: "Thurivald — a skald who sings his warband into a fury" heads on the Pirate Captain — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] class kit: bard — "skald": Captain's Charm (Pirate Captain/Captain's Charm); Bolstering Cry yielded to print's row cap 5
[reskin] proper noun: "Thurivald" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Thurivald" — the call's own answer (person), built from the name
[reskin] inline form: "Thurivald" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Thurivald — a skald" -> has (descriptive), head | "sings his warband into a fury" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Thurivald lets the war-song swell until the air itself carries it: every ally who can hear him surges forward a step and strikes harder until his next turn, and the fury spreads from one singing throat to the whole band. The song cannot lift those already downed, and falls silent the moment his voice does." [action/always/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Thurivald lets the war-song swell until the air itself carries it: every ally who can hear him surges forward a step and strikes harder until his next turn, and the fury spreads from one singing throat to the whole band. The song cannot lift those already downed, and falls silent the moment his voice does." [action/always/movement] — the model found no template that holds it (offered: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter)
[reskin] fallback stands down: the class_npc path has no shelf — the Pirate Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 17 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Thurivald never stops singing — he can weave verse into melee, and anyone who drops him hears the song gurgle into silence, leaving every ally within earshot shaken and less certain of their own strikes until they recover their nerve." [trait/start_of_turn/condition] — menu: warded-mending (+ shelf: false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] trait declined: "Warband Fury" — a print body takes only what the user's words ask; the call quotes "sings his warband into a fury", which is no unanswered twist clause — a head, a header, a lack, or a clause the GM's own weapon already answers
[reskin] weapons answered: Battleaxe = battleaxe; Shield Bash = shield
[reskin] weapon refitted to the array: "Skald's Axe Throw" read handaxe, but the row's +7 is DEX 4 + PB 3 — a scimitar is the finesse slashing weapon
[reskin] weapon table: "Skald's Axe Throw" — thrown, range 20/60
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Pirate Captain's
[reskin] print canon row: Actions/Pistol — the Pirate Captain's own ranged row, added (the chassis carried none to rename)
[reskin] print canon attack: "Battleaxe" -> "Rapier" — the Pirate Captain's own row
[reskin] print canon multiattack: "The pirate makes three attacks, using Rapier or Pistol in any combination." — the Pirate Captain's own
[reskin] multiattack normalised: "The pirate makes three attacks, using Rapier, Pistol, or Skald's Axe Throw in any combinatio"
audit finding below confidence gate: Captain's Charm Save is phrased as a bare 'Wisdom Saving Throw' header with no creature/range subject in 2024 style ('one creature ... must make a Wisdom saving throw'), leaving the save form ambiguous.
[reskin] audit rename blocked — "Cudgel Throw" is a club and "Skald's Axe Throw" is a scimitar; the row's numbers are the scimitar's and a rename may not re-weapon it
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Kessil the Lockpick — in the run

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Kessil the Lockpick | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 30 (2 × Sting); nova none; dmg 30

```
Kessil the Lockpick

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

Senses darkvision 120 ft.; Passive Perception 13

Languages Common, Infernal

CR 4 (XP 1,100; PB +2)

Traits

Magic Resistance. Kessil has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. Kessil makes two Sting attacks.

Sting. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 7 (2d6) Poison damage.

Shape-Shift. Kessil shape-shifts to resemble a rat (Speed 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.

Invisibility. Kessil casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

- Traits/Magic Resistance — print's own row
- Actions/Multiattack — the chassis
- Actions/Sting — print's own row, renamed
- Actions/Shape-Shift — print's own row
- Actions/Invisibility — print's own row

**Engine trace**

```
[path] twist — Imp (is) — class rogue — "imp" (call)
[route] skirmisher-skulker type=Fiend mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("an imp rogue") | skirmisher-skulker: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "silvered or holy wea" answers a question nobody asked
[concept] resolve: archetype=skirmisher type=Fiend themes=fiendish/grasping mind=sapient style=skulker energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: picking locks with deft hands [behavior] | striking from hiding and shadow-stepping away [behavior] | a lockpicks-and-dagger kit of shadow-stuff [object]
[concept] identity: A soot-blackened imp skulks the shadows of a devil's vault, blade-first from hiding — it opens by sneak-attacking its way through a lock-guarded victim or an exposed flank, then shadow-steps away to rehide and re-strike each round. Its fingers are lockpicks and daggers both, and it treats any fight as just another latch to pick, toying with prey while it still has the exits and bolting for the dark the instant it's bloodied.
[concept] lore: Spawned in the shadow-stuff of a greater devil's keep, this imp was set to work beneath the vaults picking every lock its master could not simply burn, and it wants nothing more than an unguarded door — out of the dungeon or into something worth stealing.
[reskin] print canon route: the Imp's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 6, DEX 18, CON 13, INT 11, WIS 12, CHA 14 — the Imp's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 4
[reskin] [path] decides: twist on the Imp · class rogue (the matcher agrees)
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Imp — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] repair round 1: 1 defect(s) — name "Lockpick" repeats the creature's own name — the sheet already says who acts; give the row its own word
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "Kessil" — the call's own answer (person), built from the name
[reskin] inline form: "Kessil" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an imp rogue" -> has (descriptive), head | "picks locks for a devil" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Kessil drives its blade into a lock, latch, or the seam of a foe's gear and twists until the shadow-stuff inside springs loose, spilling a slick coating of living darkness over the target. The target is smeared in that clinging soot-light, which sticks to it and makes it easier for the imp's daggers to find home and harder for it to slip away, until it burns itself clean with a moment's hard effor" [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] word match declined by the call: coating, disarm, feint-slip — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Kessil drives its blade into a lock, latch, or the seam of a foe's gear and twists until the shadow-stuff inside springs loose, spilling a slick coating of living darkness over the target. The target is smeared in that clinging soot-light, which sticks to it and makes it easier for the imp's daggers to find home and harder for it to slip away, until it burns itself clean with a moment's hard effor" [rider/on_hit/condition] — the model found no template that holds it (offered: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge, coating, lure, sensory-strike, disarm, feint-slip, riposte)
[reskin] fallback respects the call: disarm left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Imp's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Kessil's fingers and blades are forged of shadow-stuff, and any latch, hinge, or lock it touches remembers being opened; the imp can spring a mundane lock or bar with a moment's fiddling even in the thick of a fight. Each time it does, a wisp of that shadow stays in the mechanism, so the next time it tries the same lock the thing practically falls open for it." [trait/always/resource] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown sealed-body, which the GM's words keyed
[reskin] key match declined: trait — "sealed-body" was ranked first on the call's own menu for locked, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Kessil's fingers and blades are forged of shadow-stuff, and any latch, hinge, or lock it touches remembers being opened; the imp can spring a mundane lock or bar with a moment's fiddling even in the thick of a fight. Each time it does, a wisp of that shadow stays in the mechanism, so the next time it tries the same lock the thing practically falls open for it." [trait/always/resource] — the model found no template that holds it (offered: sealed-body, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body)
[reskin] weapons answered: Lockpick = none
[reskin] print canon modes: climb off — the Imp has no such mode and the words name none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "Infernal, Telepathy 30 ft." -> "Infernal, telepathy 30 ft." (sapient)
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Imp's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Infernal, telepathy 30 ft." -> "Common, Infernal" — the Imp's
[reskin] print canon speed: 40 ft. -> 20 ft. — the Imp's walk; the concept's other modes stay
[reskin] print canon attack: "Lockpick" -> "Sting" — the Imp's own row
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Imp's own header lines
[reskin] resistances derived withheld: print's Imp owns the line (Cold)
[reskin] print canon trait: Magic Resistance — "an imp rogue who picks locks for a devil" is the Imp (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Imp's
[reskin] print canon: chassis row leaves — Traits/"Sootstep" is the seat's, not the Imp's
[reskin] print canon row: Actions/Shape-Shift — the Imp's own
[reskin] print canon row: Actions/Invisibility — the Imp's own
```


---

## Ser Halric Vow — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ser Halric Vow | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Spear); nova none; dmg 52

```
Ser Halric Vow

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

Aura of Authority. While in a 10-foot Emanation originating from the vow, the vow and its allies have Advantage on attack rolls and saving throws, provided the vow doesn't have the Incapacitated condition.

Actions

Multiattack. The vow makes two Spear attacks. It can replace one attack with a use of Shield Bash.

Spear. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 20/60 ft. 26 (5d8 + 4) Piercing damage.

Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet that the vow can see. Failure: 24 (7d6) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
- Actions/Spear — print's own row, renamed; weapon spear
- Actions/Shield Bash — print's own row

**Engine trace**

```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:1146:31
    at callLLM (http://localhost:5173/src/tools/statblock-generator/reskin/generate.mjs?t=1792416438352:1319:24)
    at generateReskin (http://localhost:5173/src/tools/statblock-generator/reskin/generate.mjs?t=1792416438352:3459:29)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:1105:22)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:657:5)
[reskin] network retry: Failed to fetch — retrying the call once
[path] class_npc — class paladin — "knight-errant" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("who shields the weak") | defender: key "knight" (class verb)
[concept] resolve: archetype=defender type=Humanoid themes=armed/grave mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shield-wall protection of the weak [behavior] | corroded iron plate and shield [object] | oathbound refusal to yield ground [behavior]
[concept] identity: A fallen knight-errant wades into the fight shield-first, planting itself between the weak and whatever comes for them, then punishing any enemy that tries to slip past with a brutal iron riposte. It grinds down attackers round after round with disciplined shieldwork and heavy blows, refusing to yield ground even as its own blood runs. Only when the last of the people it swore to shelter are clear does it consider retreat — and even then it withdraws facing the foe, shield raised.
[concept] lore: When the Order of the Broken Vow was dissolved and its banners burned, one knight kept the oath the order abandoned: to stand between the helpless and the blade, even with no lord left to pay for it.
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 7
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +7
[reskin] donor: defender-5 -> CR 7
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "a knight-errant of the fallen order who shields the weak" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] class kit: paladin — "knight-errant": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline by rule: "the vow" — the call answered "Sir Halric" (person), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a knight-errant of the fallen order" -> has (descriptive), head | "shields the weak" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When a foe moves to slip past the vow toward the people behind it, the vow lashes out with a brutal shield-first riposte — a punishing blow that sends the attacker staggering back and interrupts the advance. This fires at the moment an enemy tries to pass, so the shield itself becomes a wall with teeth, punishing anyone who treats the vow as scenery." [reaction/on_being_hit/damage] — menu: riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] word match declined by the call: riposte — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for shield+orders, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When a foe moves to slip past the vow toward the people behind it, the vow lashes out with a brutal shield-first riposte — a punishing blow that sends the attacker staggering back and interrupts the advance. This fires at the moment an enemy tries to pass, so the shield itself becomes a wall with teeth, punishing anyone who treats the vow as scenery." [reaction/on_being_hit/damage] — the model found no template that holds it (offered: rally, riposte, own-turn-punisher)
[reskin] fallback respects the call: rally left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's AC 15 at CR 7, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The vow's iron plate and shield are corroded and battered, but the vow has learned to turn that ruin into discipline: whenever the vow is struck in melee, the attacker's weapon snags on cracked iron and splintered shield-rim, leaving the foe exposed for a heartbeat. The vow fights better the longer it is hit, its damaged armor teaching it the rhythm of every blow." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: bloodied-burst, resonant-body, aberrant-ground — the key word does not mean the mechanic here
[reskin] trait declined: "Snaring Plate" — a shape fit with no verb match on a Humanoid body; a meat body earns its trait by a verb
[reskin] weapons answered: Broadsword = longsword; Hurlshield = shield
[reskin] print canon alignment: Lawful Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Broadsword" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Hurlshield leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon row priced: Shield Bash — dice 9 → 24
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
```


---

## Whisker Shade — in the run

**Concept:** a tabaxi cutpurse who slips through the market crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Whisker Shade | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 3 → 3; sustained 16 (2 × Pistol); nova none; dmg 16

```
Whisker Shade

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

Skills Perception +2, Stealth +5

Senses darkvision 60 ft.; Passive Perception 12

Languages Common, Thieves' cant

CR 3 (XP 700; PB +2)

Traits

Evasion. If the shade is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the shade instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The bandit makes two attacks, using Scimitar or Pistol in any combination.

Scimitar. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Slashing damage.

Pistol. Ranged Attack Roll: +5, range 30/90 ft. 8 (1d10 + 3) Piercing damage.

Bonus Actions

Cunning Action. The shade takes the Dash, Disengage, or Hide action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
- Actions/Scimitar — print's own row, renamed; weapon scimitar
- Actions/Pistol — print's own row, renamed; weapon pistol
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "cutpurse"

**Engine trace**

```
[path] class_npc — class rogue — species tabaxi — "cutpurse" (call)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("slips through the market crowd") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=grasping/uncanny mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a hidden blade in a crowded market [behavior] | slipping through the crowd unseen [behavior] | tabaxi claws and quick footing [body]
[concept] identity: The cutpurse works the market as cover, brushing past marks to lift purses and open a fight with a dagger driven into an unarmored back from hiding in the throng. Once blood is up it stays inside the crowd, weaving between bodies and stalls to deny a clean stand, and it never sticks around once the takings are grabbed or the odds sour — it's a predator of opportunity, not a soldier. A tabaxi of this trade is quick, clever, and utterly without honor: it taunts a flailing opponent, then slips away laughing before the guard arrives.
[concept] lore: This tabaxi was raised in the city's thieves' guilds, and it works the busiest market squares at midday because a hundred jostling bodies make the perfect hiding place for a quick blade and a quicker hand.
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
[reskin] row evicted for the cap: Traits/"Crowd Slip" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "cutpurse": Cunning Action (Assassin/Cunning Action), Evasion (evasion)
[reskin] inline declared: "the shade" — the call's own answer (kind), built from the name
[reskin] inline form: "the shade" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tabaxi cutpurse" -> has (descriptive), head | "slips through the market crowd" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the shade strikes a foe that has not yet acted in the fight, or one it caught off guard from hiding, its blade finds the gap between ribs and the wound bleeds badly, sapping the victim's strength and slowing them as they stagger. The cut is meant to make a mark look hurt and clumsy, easy to rob and easier to lose in the crowd." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — feint-slip (slip)
[reskin] word match declined by the call: feint-slip — the key word does not mean the mechanic here
[reskin] fit declined: "Rib-Gap Cut" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: feint-slip left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Bandit Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 15 already beats print's AC 13 at CR 3, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The shade never fights from still feet: whenever a foe crowds it or a blade swings close, it twists away through the bodies around it, gaining ground that frustrates pursuit and keeps a mark between itself and danger." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] word match declined by the call: false-appearance, faultless-tracker — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The shade never fights from still feet: whenever a foe crowds it or a blade swings close, it twists away through the bodies around it, gaining ground that frustrates pursuit and keeps a mark between itself and danger." [trait/on_being_hit/movement] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, faultless-tracker, false-appearance, aberrant-ground)
[reskin] weapons answered: Dagger = dagger; Hand Crossbow = hand crossbow
[reskin] weapon table: "Hand Crossbow" — a launcher, never thrown, range 30/120
[reskin] print canon modes: climb off — the Bandit Captain has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Neutral Evil -> Neutral — the Bandit Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Thieves' cant" — the Bandit Captain's
[reskin] print canon attack: "Dagger" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon multiattack: "The bandit makes two attacks, using Scimitar and Pistol in any combination." — the Bandit Captain's own
[reskin] print canon attack: "Pistol" is print's own row — +5, 8 (1d10 + 3), range 30/90 ft. (an exact body at print's CR)
[reskin] print canon attack: "Hand Crossbow" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Bandit Captain's
[reskin] multiattack normalised: "The bandit makes two attacks, using Scimitar or Pistol in any combination."
[reskin] species kit: Climb 30 ft. — the tabaxi's
[reskin] species kit: darkvision 60 ft. — the tabaxi's
```
