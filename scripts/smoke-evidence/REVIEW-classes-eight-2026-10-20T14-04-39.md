# Review batch — classes-eight-2026-10-20T14-04-39

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sarnek Thiss | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 6/6 |
| Vesper Krell | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Harl Sedgewick | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Ravik Stormscar | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Vareth Solmane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Brother Anselm | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/2 |
| Lucien Marrow | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Thurivald | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Mother Vane | 8 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/5 |
| Kaelen Vor | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/5 |
| Bloodbound Dire Wolf | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Hooklock Imp | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/5 |
| Mazegoad Reaver | 6 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Sir Cael of the Broken Vow | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Snikt Ravell | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |

**Dropped 5 of 19 user clauses** (coverage 74%); concept share 93% (66/71 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Bloodbound Dire Wolf — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bloodbound Dire Wolf | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "hunts in a pack"
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Bloodbound Dire Wolf

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
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/grasping mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: pack-coordinated hit-and-run hunting [behavior] | bone-crushing jaws and lean rangy frame [body]
[concept] identity: The dire wolf circles with its pack in a loose crescent, each wolf feinting and withdrawing so the prey never knows which shadow will commit; then the nearest one lunges, jaws closing on a hamstring, and is gone before the retaliation lands. Every round repeats the exchange — a feint, a bite, a retreat the pack closes behind — while the lead wolf waits for a target to stumble and, bloodied, the pack still presses but begins herding the wounded toward the treeline rather than dying for the kill.
[concept] lore: Deep-forest dire wolves run in blood-bound packs whose matriarch remembers every trail her kin have taken, and they hunt not for hunger alone but to drive intruders from the old range their ancestors claimed.
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
[reskin] signature idea (action): "When the wolf and its packmates have a foe surrounded, the wolf snaps and darts at one side to draw the prey's guard, leaving its flank and footing open — the next wolf to strike that prey bites deeper for the opening. The wolf can only do this to a creature already pressed by another of its kind, and never twice in a row against the same prey." [bonus_action/always/condition] — menu: rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] word match declined by the call: focus — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown focus, which the GM's words keyed
[reskin] key match declined: action — "focus" was ranked first on the call's own menu for hunt, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the wolf and its packmates have a foe surrounded, the wolf snaps and darts at one side to draw the prey's guard, leaving its flank and footing open — the next wolf to strike that prey bites deeper for the opening. The wolf can only do this to a creature already pressed by another of its kind, and never twice in a row against the same prey." [bonus_action/always/condition] — the model found no template that holds it (offered: focus, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, feint-slip, coating, lure, riposte)
[reskin] fallback respects the call: focus left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Dire Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 15 already beats print's 13 at CR 3, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Its jaws are built to break bone, not just tear flesh; prey that survives a bite carries the crushed damage with it and falters, moving and striking more slowly until it has shaken off the shock." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] word match declined by the call: faultless-tracker — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for hunts+hunted, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Its jaws are built to break bone, not just tear flesh; prey that survives a bite carries the crushed damage with it and falters, moving and striking more slowly until it has shaken off the shock." [trait/always/condition] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a dire wolf that hunts in a pack" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Harrier" is the seat's, not the Dire Wolf's
```


---

## Mother Vane — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Mother Vane | 8 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Longsword); nova none; dmg 54

```
Mother Vane

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

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Mother Vane, Mother Vane and its allies have Advantage on attack rolls and saving throws, provided Mother Vane doesn't have the Incapacitated condition.

Actions

Multiattack. Mother Vane makes two Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Slashing damage.

Shield Bash. Strength Saving Throw: DC 16, one creature within 5 feet that Mother Vane can see. Failure: 27 (6d8) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

Bonus Actions

Lay on Hands (2/Day). Mother Vane touches a creature within 5 feet of itself and restores 27 (6d8) Hit Points to it.

Divine Smite (2/Day). Mother Vane charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 14 (4d6) Radiant damage.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Bash — print's own row
- Bonus Actions/Lay on Hands — template lay-on-hands; paladin kit; the GM's clause "mends her soldiers"
- Bonus Actions/Divine Smite — template coating; paladin kit; the GM's clause "smites the unclean"; energy Radiant

**Engine trace**

```
[path] class_npc — class paladin — "crusader" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "an oathsworn crusader who smites the unc" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("an oathsworn crusader who smites the unc") | caster-warpriest: key "smites" (class verb)
[concept] hints: warpriest→style ✓ ("smites the unclean and mends")
[concept] resolve: archetype=caster type=Humanoid themes=armed/celestial mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: radiant smites upon the unclean [behavior] | oathbound prayers that mend her soldiers [behavior] | blessed blade and heavy iron plate [object]
[concept] identity: An oathsworn crusader in heavy iron plate opens the fight by charging the nearest unclean foe, her sanctified blade breaking the line while she calls down radiant judgment on the wicked. Each round she parries with her shield and drives her blade home, then turns a brief prayer inward or outward to knit her soldiers' wounds shut, so a hard-pressed squad fights on where it should break. Under pressure she does not flee — she plants herself as a wall between her troops and the enemy, growing only more furious as her oathmates bleed, and fights to the last vow.
[concept] lore: She swore her oath over the graves of a massacred garrison and now walks the border as chaplain, judge, and shield, gathering reformed soldiers under her banner to smite the unclean and never again be the one who arrives too late.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] print canon route: the Gladiator is not a caster first and keys STR 18 over DEX 15 — it casts no spells — the caster family stands down for the plain defender line
[reskin] print canon array: STR 20, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +8
[reskin] donor: defender-5 -> CR 8
[reskin] style unserved: "warpriest" has no defender line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "an oathsworn crusader who smites the unclean and mends her soldiers" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] kit energy: "Divine Smite" deals Radiant, not Bludgeoning — the shape's own fiction
[reskin] class kit: paladin — "crusader": Aura of Authority (Hobgoblin Captain/Aura of Authority), Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] inline declared: "Mother Vane" — the call's own answer (person), built from the name; the rules would have said "the mother"
[reskin] inline on kit rows: "the mother" -> "Mother Vane"
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an oathsworn crusader" -> has (descriptive), head | "smites the unclean" -> has (mechanical) [asked: attack] | "mends her soldiers" -> has (mechanical) [asked: heal]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Mother Vane plants her shield and calls out a battlefield prayer that reaches every sworn soldier who can see or hear her, steadying them and driving them back into the fight. Her troops shrug off their fear and exhaustion for a moment, stepping forward instead of breaking — the prayer spreads outward from where she stands and holds only as long as she remains standing." [action/once_per_fight/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] word match declined by the call: rally, herd, aggro-curse — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for mend, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Mother Vane plants her shield and calls out a battlefield prayer that reaches every sworn soldier who can see or hear her, steadying them and driving them back into the fight. Her troops shrug off their fear and exhaustion for a moment, stepping forward instead of breaking — the prayer spreads outward from where she stands and holds only as long as she remains standing." [action/once_per_fight/condition] — the model found no template that holds it (offered: rally, throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, aggro-curse)
[reskin] fallback respects the call: coating (already on the sheet), rally, herd left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's 16 at CR 8, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Every wound her oathmates take lands on her ledger: whenever an ally within reach is struck, Mother Vane's fury sharpens and her next blow against that enemy bites deeper, as if the strike were answered in kind. The more her soldiers bleed, the more terrible her blade becomes." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Every wound her oathmates take lands on her ledger: whenever an ally within reach is struck, Mother Vane's fury sharpens and her next blow against that enemy bites deeper, as if the strike were answered in kind. The more her soldiers bleed, the more terrible her blade becomes." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst, resonant-body)
[reskin] weapons answered: Longsword = longsword; Warhammer = warhammer
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Longsword" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Warhammer leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon row priced: Shield Bash — dice 9 → 27
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
audit finding below confidence gate: Divine Smite The GM must track a pending charge state across turns (armed-until-end-of-next-turn) with no token or listed condition attached, and adjudicate which of Mother Vane's hits counts as "first" when it makes a Multiattack — several branches to resolve mid-combat for a short entry.
[reskin] audit rename blocked — "Shield Bash" is the user's own part name, a kit feature's real name, or print's own row
```


---

## Harl Sedgewick — a 2014 sheet

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Harl Sedgewick | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 39 (3 × Longsword); nova none; dmg 39

```
Harl Sedgewick
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

Second Wind (2/Day). As a bonus action, Harl regains 19 (3d12) hit points.
Riposte (Reaction). When a creature within 5 feet of Harl misses it with a melee attack, Harl makes one Longsword attack against that creature.

Actions
Multiattack: Harl makes three Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage, and the target has disadvantage on its next attack roll before the start of Harl's next turn.
Shield Bash: One creature within 5 feet that Harl can see must make a DC 15 Strength saving throw. On a failed save, it takes 10 (3d6) bludgeoning damage, and if the target is Medium or smaller, it is knocked prone.
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
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("bashes with a buckler") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: longsword drill-work [object] | buckler bash to open guards [behavior] | holds the line and punishes those who slip past [behavior]
[concept] identity: A drilled line-holder who opens by stepping inside reach to slam a buckler boss into a face, then grinds the fight down to bite-and-bash exchanges — sword probing for the opening the shield-strike creates. Under pressure it does not break; it plants, weathers, and punishes anyone who tries to slip past or crowd it, selling ground only when ordered, never when frightened.
[concept] lore: A career soldier who survived every campaign by never once giving up the ground he was told to hold, now fighting for whoever still pays in a world that has run short of causes.
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
[reskin] inline declared: "Harl" — the call's own answer (person), built from the name
[reskin] inline form: "Harl" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a veteran soldier with a longsword" -> has (descriptive), head | "bashes with a buckler" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "When a foe Harl can see tries to slip around or past him rather than face him squarely, he pivots and drives his buckler boss into their side, stopping the move cold and leaving them stumbling and exposed to his blade. It only answers movement that would take a creature out of his reach or carry it behind him, never a foe already trading blows with him." [reaction/on_being_hit/condition] — menu: EMPTY (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When a foe Harl can see tries to slip around or past him rather than face him squarely, he pivots and drives his buckler boss into their side, stopping the move cold and leaving them stumbling and exposed to his blade. It only answers movement that would take a creature out of his reach or carry it behind him, never a foe already trading blows with him." [reaction/on_being_hit/condition] — the model found no template that holds it (offered: own-turn-punisher, slow-bolt, disarm, herd, reveal)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Harl's drill-work lets him read the gap his own shield-strike opens: the first time in a fight a creature he has just bashed turns its attention elsewhere or tries to back away, his blade is already moving into the opening." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] verb gate stands down: trait — no template shares a verb, but "a veteran with a longsword" is a clause the sheet has not answered; the GM's own words are the warrant
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Harl's drill-work lets him read the gap his own shield-strike opens: the first time in a fight a creature he has just bashed turns its attention elsewhere or tries to back away, his blade is already moving into the opening." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] weapons answered: Longsword = longsword; Buckler Bash = buckler
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon multiattack: "Harl makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] multiattack reconciled: "Spear" is no row on this sheet — the Multiattack cites "Longsword" instead
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
[reskin] final price: print's Multiattack: the round ran 66 against the card's 42 — the attack rows re-solve at 67% (3 attacks off one row after a supersede)
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Sarnek Thiss — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sarnek Thiss | 5 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "strikes pressure points with an open hand"
- read: def 5 / off 7 → 6; sustained 48 (2 × Unarmed Strike); nova none; dmg 48

```
Sarnek Thiss

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

Hold Breath. Sarnek can hold its breath for 15 minutes.

Marsh Stride. Difficult Terrain composed of mud doesn't cost Sarnek extra movement, and Sarnek can move across mud without needing to make an ability check.

Actions

Multiattack. Sarnek makes two attacks, using Unarmed Strike or Dart in any combination.

Unarmed Strike. Melee Attack Roll: +6, reach 5 ft. 24 (4d6 + 3) Bludgeoning damage. Once on each of Sarnek's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of Sarnek's next turn.

Dart. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Patient Defense. Sarnek takes the Dodge action.

Cunning Action. Sarnek takes the Dash, Disengage, or Hide action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
[concept] signature elements: open-palm strikes on pressure points [behavior] | dart in, strike, dart out [behavior] | scaled reptilian monk's body [body]
[concept] identity: The lizardfolk monk opens by circling just outside reach, then snaps in to land a single open-palm strike on a pressure point — neck, armpit, knee, throat — before springing back out of the reply. It fights in rounds of dart-and-touch, never trading blows, seeking the joint and nerve clusters that stiffen a limb or steal a breath, and it reads an opponent's guard the way other hunters read tracks. When bloodied and cornered it stops being surgical, committing to crippling strikes at the hips and spine so its pursuer cannot follow, and it will die before it lets itself be pinned — its patience on the approach is its weapon, and it has none left once that patience is spent.
[concept] lore: A trainee expelled from a lizardfolk temple for striking a master too hard, it now wanders the swamp roads testing its hand-pressure doctrine on anyone it meets — and it wants to prove that a palm can stop a heart.
[reskin] [path] class body: the monk stands on the Spy — the class's own print block, nearest CR 5
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 5
[reskin] [path] decides: class_npc on the Spy · class monk (the matcher would have said homebrew)
[reskin] print canon: "a lizardfolk monk who strikes pressure points with an open hand" heads on the Spy — print's rows ride along; the seat stays
[reskin] row evicted for the cap: Traits/"Shed Step" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "monk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Open Palm), Patient Defense (patient-defense)
[reskin] inline declared: "Sarnek" — the call's own answer (person), built from the name
[reskin] inline form: "Sarnek" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a lizardfolk monk" -> has (descriptive), head | "strikes pressure points with an open hand" -> has (mechanical) [asked: condition]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When Sarnek lands an open-palm strike on a foe's joint or nerve cluster, it can read the guard from the recoil instead of following through — pivoting on that touch into a sudden retreat that leaves the struck enemy momentarily slow and off-balance, as though their limb forgot how to answer. The foe's next attempt to close or swing at Sarnek comes a beat late, giving Sarnek the room it wants." [rider/on_hit/movement] — menu: charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown riposte, which the GM's words keyed
[reskin] key match declined: action — "riposte" was ranked first on the call's own menu for opening, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When Sarnek lands an open-palm strike on a foe's joint or nerve cluster, it can read the guard from the recoil instead of following through — pivoting on that touch into a sudden retreat that leaves the struck enemy momentarily slow and off-balance, as though their limb forgot how to answer. The foe's next attempt to close or swing at Sarnek comes a beat late, giving Sarnek the room it wants." [rider/on_hit/movement] — the model found no template that holds it (offered: riposte, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, feint-slip)
[reskin] fallback stands down: the class_npc path has no shelf — the Spy's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Sarnek's scaled hide and cold amphibious blood let it read pressure through skin contact, so when a foe's strike glances harmlessly off its scales it senses the tension in that limb and can answer with an instant, surgical touch of its own — a palm jab that stiffens the attacker's arm before they can pull it back." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Sarnek's scaled hide and cold amphibious blood let it read pressure through skin contact, so when a foe's strike glances harmlessly off its scales it senses the tension in that limb and can answer with an instant, surgical touch of its own — a palm jab that stiffens the attacker's arm before they can pull it back." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, uncanny-sense, bloodied-fury)
[reskin] weapons answered: Open Palm = none; Spine Shot = none
[reskin] weapon table: "Spine Shot" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Draconic — the concept names the species; print's NPCs of it speak it
[reskin] print canon languages: "Common, Draconic" -> "Common plus one other language, Draconic" — the Spy's plus the concept's Draconic
[reskin] print canon attack: "Open Palm" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Spine Shot" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Bonus Actions/Cunning Action — the Spy's own
[reskin] class weapon: Actions/"Shortsword" -> "Unarmed Strike" — a monk fights with its hands, not the Spy's; the body's rider folds in (+7)
[reskin] class weapon: Actions/"Hand Crossbow" -> "Dart" — a monk fights with a dart, not the Spy's
[reskin] species kit: Swim 30 ft. — a lizardfolk's own
```


---

## Vesper Krell — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vesper Krell | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 5 → 5.5; sustained 34 (2 × Shortsword); nova none; dmg 34

```
Vesper Krell

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

Assassinate. During the first round of each combat, Vesper has Advantage on attack rolls against any creature that hasn't taken a turn. If Vesper hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Evasion. If Vesper is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Vesper instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Vesper makes two attacks, using Shortsword or Shortbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Vesper takes the Dash, Disengage, or Hide action.

Vanishing Strike (1/Day). Vesper casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
- Bonus Actions/Vanishing Strike — template self-invisibility; library draw (seed unstamped); binds the GM's words: vanish+vanishes

**Engine trace**

```
[path] class_npc — class rogue — species tiefling — "rogue" (call)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("stalks the rooftops of the old quarter") | skirmisher-skulker: key "stalks" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=terror/armed mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: strikes from concealment and vanishes [behavior] | the old quarter's rooftops as hunting ground [aura] | tiefling heritage and its stalking cunning [body]
[concept] identity: The rooftop stalker opens by dropping from shadowed eaves onto an unaware target, its blade already finding the seam between ribs before the victim knows it is hunted. Each round after it strikes once and is gone — over a ledge, behind a chimney, through a skylight — using the old quarter's dense skyline as a second body, and it never trades blows if it can help it. Bloodied or cornered, it breaks the fight into a running chase across slate and gutter, harrying and doubling back, and only fights to the death when there is no roof left above it.
[concept] lore: A tiefling who learned the old quarter's roofs before its streets, it runs the rooftops as a private kingdom, selling the silence between chimneys to whoever pays and treating any trespasser on the skyline as prey.
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
[reskin] inline declared: "Vesper" — the call's own answer (person), built from the name
[reskin] inline form: "Vesper" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tiefling rogue" -> has (descriptive), head | "stalks the rooftops of the old quarter" -> has (mechanical) [asked: movement]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Vesper vanishes from sight the instant its blade lands, slipping behind cover and stilling itself against the stone — only there is no cover needed, because what the victim sees afterward is a shadow shaped like Vesper lingering where it stood, drawing eyes and shots while the real hunter has already moved. The decoy lasts only a breath and cannot be conjured again until Vesper has completely brok" [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] word match declined by the call: focus, gaze-single, affliction, spew, patient-defense, feint-slip, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark — the key word does not mean the mechanic here
[reskin] seat takes its clause: "Vanishing Strike (1/Day)" answers "a tiefling" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: self-invisibility -> Bonus Actions/"Vanishing Strike (1/Day)" ("the idea's core is Vesper vanishing from sight the instant the blade lands, leav [verb: vanish:idea, vanishes:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Vesper treats the old quarter's skyline as its true hunting ground: whenever it is above its prey — on a ledge, a rooftop, abeam overhead — it reads every shift in their footing and has no trouble tracking or moving unseen against them. This holds only while Vesper stays off the ground; drop it into the street and it is just another tiefling with a knife." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] word match declined by the call: faultless-tracker, aberrant-ground, spider-climb — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for stalks+stalk, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Vesper treats the old quarter's skyline as its true hunting ground: whenever it is above its prey — on a ledge, a rooftop, abeam overhead — it reads every shift in their footing and has no trouble tracking or moving unseen against them. This holds only while Vesper stays off the ground; drop it into the street and it is just another tiefling with a knife." [trait/always/defense] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Dagger = dagger; Hand Crossbow = hand crossbow
[reskin] weapon table: "Hand Crossbow" — a launcher, never thrown, range 30/120
[reskin] print canon modes: climb off — the Bandit Captain has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] print canon alignment: Neutral Evil -> Neutral — the Bandit Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Infernal" -> "Common, Thieves' cant, Infernal" — the Bandit Captain's plus the concept's Infernal
[reskin] print canon attack: "Dagger" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon attack: "Hand Crossbow" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] on-hit extra retyped: "Assassinate" adds Slashing, not Bludgeoning — the hit's own type (Scimitar)
[reskin] print canon: chassis row leaves — Traits/"Skyline Stalker" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] on-hit extra retyped: "Assassinate" adds Piercing, not Slashing — the class weapon's own type (Shortsword)
[reskin] class weapon: Actions/"Scimitar" -> "Shortsword" — a rogue fights with a shortsword, not the Bandit Captain's
[reskin] class weapon: Actions/"Pistol" -> "Shortbow" — a rogue fights with a shortbow, not the Bandit Captain's
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Rooftop Stalker" [catalog: terrain-walk]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, Vesper has Advantage on attack rolls against any creature that hasn't taken a turn. If Vesper hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.
Traits / AFTER   Rooftop Stalker: Difficult Terrain composed of mud doesn't cost Vesper extra movement, and Vesper can move across mud without needing to make an ability check.
provenance: catalog template "terrain-walk"
```


---

## Sir Cael of the Broken Vow — one marked soft

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sir Cael of the Broken Vow | 7 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Shield of the Broken Vow
- read: def 6 / off 8 → 7; sustained 52 (2 × Longsword); nova none; dmg 52

```
Sir Cael of the Broken Vow

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

Shield of the Broken Vow. While an ally within 5 feet of Sir Cael is hit by an attack, Sir Cael interposes its shield, granting that ally a bonus to AC against the triggering attack, potentially causing it to miss.

Aura of Authority. While in a 10-foot Emanation originating from Sir Cael, Sir Cael and its allies have Advantage on attack rolls and saving throws, provided Sir Cael doesn't have the Incapacitated condition.

Actions

Multiattack. Sir Cael makes two Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet that Sir Cael can see. Failure: 24 (7d6) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

- Traits/Shield of the Broken Vow — authored for this sheet; the GM's clause "shields the weak"
- Traits/Aura of Authority — paladin kit; the GM's clause "knight-errant"
- Actions/Multiattack — the chassis
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Bash — print's own row

**Engine trace**

```
[path] class_npc — class paladin — "knight-errant" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("shields the weak") | defender: key "knight" (class verb)
[concept] resolve: archetype=defender type=Humanoid themes=armed/grave mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shield-wall guardian stance [behavior] | an order's fallen banner and oath [object] | unbroken iron resolve [aura]
[concept] identity: A front-line defender who plants its shield between the weak and the blow, then answers any foe that tries to flow around it with a brutal punishing strike. Each round it holds ground, pulls the wounded behind its guard, and forces enemies to break on it rather than pass it. It does not flee when bloodied — it backs onto whoever it protects and fights to the last, the shield wall come to one body.
[concept] lore: When the fallen order broke, a handful of knights refused the rout and swore to stand by the helpless instead, and their iron vows outlived the banners they once obeyed.
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 7
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +7
[reskin] donor: defender-5 -> CR 7
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "a knight-errant of the fallen order who shields the weak" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] class kit: paladin — "knight-errant": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "Sir Cael" — the call's own answer (person), built from the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a knight-errant of the fallen order" -> has (descriptive), head | "shields the weak" -> has (mechanical) [asked: buff_ally]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Sir Cael plants his shield and becomes a living wall, drawing every hostile eye and blow toward himself so the weak behind him go untouched. While he holds the stance, any foe that tries to slip past him, strike at someone he shields, or retreat from his reach invites a savage answering blow. The stance breaks the moment he abandons the ground he holds, but never because he was wounded." [bonus_action/always/defense] — menu: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] word match declined by the call: obstacle-pull, own-turn-punisher — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for shield+orders, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Sir Cael plants his shield and becomes a living wall, drawing every hostile eye and blow toward himself so the weak behind him go untouched. While he holds the stance, any foe that tries to slip past him, strike at someone he shields, or retreat from his reach invites a savage answering blow. The stance breaks the moment he abandons the ground he holds, but never because he was wounded." [bonus_action/always/defense] — the model found no template that holds it (offered: rally, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, obstacle-pull)
[reskin] fallback respects the call: rally, own-turn-punisher left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's 15 at CR 7, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The banner of the fallen order still hangs over Sir Cael in spirit: when he or an ally in his aura falls, the oath roars through him and he lashes out at the foe that struck the blow, and he fights on that much harder while bloodied rather than yielding ground. The broken vow answers suffering with iron, not retreat." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: bloodied-burst, resonant-body, false-appearance, uncanny-sense — the key word does not mean the mechanic here
[reskin] trait declined: "Bloodied Fury" — bound only on the idea's own words (bloodied:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] repair: 1 clause(s) with no row — "shields the weak"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Longsword = longsword; Shield Bash = shield; Iron Vow = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Longsword" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Vow-Taught Rebuke leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon row priced: Shield Bash — dice 9 → 24
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
```


---

## Dame Oriel — in the run

**Concept:** name: Dame Oriel | a knight who holds the line with a shield and a longsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dame Oriel | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 39 (3 × Longsword); nova none; dmg 39

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

Aura of Authority. While in a 10-foot Emanation originating from Dame Oriel, Dame Oriel and its allies have Advantage on attack rolls and saving throws, provided Dame Oriel doesn't have the Incapacitated condition.

Actions

Multiattack. Dame Oriel makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Slashing damage, and the target has Disadvantage on its next attack roll before the start of Dame Oriel's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Dame Oriel can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

- Traits/Aura of Authority — paladin kit; the GM's clause "Dame"
- Actions/Multiattack — the chassis
- Actions/Longsword — authored for this sheet; a named part; a declared feature; the GM's clause "keeps the line with a shield and a longsword"; weapon longsword
- Actions/Shield Bash — print's own row

**Engine trace**

```
[path] class_npc — class paladin — "Dame" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("keeps the line with a shield") | defender: key "keeps the line" (class verb)
[concept] name: "Dame Oriel" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Dame Oriel"
[concept] mechanics: none claimed
[concept] signature elements: holds the line with shield and longsword [behavior] | shield and longsword [object] | punishes anyone who tries to move past her [behavior]
[concept] identity: Dame Oriel plants herself in the narrowest passage and opens the fight by taking the measure of the field behind her shield, inviting the first charge onto her blade. Every round she holds the line with shield-high parries and longsword ripostes, punishing any foe who tries to slip past her with a hard shoulder-check and a follow-up cut. Under pressure she refuses to give ground — she fights to the death, only yielding the corridor when she is dragged from it.
[concept] lore: A veteran sworn to a border keep whose garrison has long since rotted away, Dame Oriel still stands her post and turns back every traveler who tries to pass the ruin she was told to hold.
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 5
[reskin] print canon defenses: HP 78 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 5
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "Dame Oriel — a knight who keeps the line with a shield and a longsword" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Hilt and Hauberk Blow" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: paladin — "Dame": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] proper noun: "Dame Oriel" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Dame Oriel" — the call's own answer (person), built from the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dame Oriel — a knight" -> has (descriptive), head | "keeps the line with a shield and a longsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "When a foe tries to slip past her to reach the weaker fighters behind, Dame Oriel pivots and drives her shield's rim into them, then follows with a low cut meant to put them back where they started. The struck foe is thrown backward and knocked off balance, landing prone on the ground she refuses to yield, so it costs them their whole next turn to get back up and come at her again." [reaction/on_being_hit/movement] — menu: riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] signature miss: action — "When a foe tries to slip past her to reach the weaker fighters behind, Dame Oriel pivots and drives her shield's rim into them, then follows with a low cut meant to put them back where they started. The struck foe is thrown backward and knocked off balance, landing prone on the ground she refuses to yield, so it costs them their whole next turn to get back up and come at her again." [reaction/on_being_hit/movement] — the model picked "riposte" (no verb, and it quotes nothing the GM typed) over a concept-verb template (rally)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Dame Oriel reads every blow against her shield and turns it into an opening. Whenever a foe's attack fails to get through her guard, she answers instantly with a riposte from her longsword before that foe can recover." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] verb gate stands down: trait — no template shares a verb, but "Oriel — a knight" is a clause the sheet has not answered; the GM's own words are the warrant
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Dame Oriel reads every blow against her shield and turns it into an opening. Whenever a foe's attack fails to get through her guard, she answers instantly with a riposte from her longsword before that foe can recover." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge)
[reskin] concept-first trait skipped: guarded-stance — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329); the same gate the seat's menu and the class kit use
[reskin] weapons answered: Longsword = longsword; Shield Bash = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "Dame Oriel makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack reconciled: "Spear" is no row on this sheet — the Multiattack cites "Longsword" instead
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
[reskin] final price: print's Multiattack: the round ran 66 against the card's 40 — the attack rows re-solve at 64% (3 attacks off one row after a supersede)
```


---

## Ravik Stormscar — in the run

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ravik Stormscar | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

```
Ravik Stormscar

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

Berserk. Whenever Ravik starts its turn Bloodied, roll 1d6. On a 6, Ravik goes berserk. On each of its turns while berserk, Ravik attacks the nearest creature it can see. If no creature is near enough to move to and attack, Ravik attacks an object. Once Ravik goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, Ravik has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost Ravik extra movement, and Ravik can move across ice or snow without needing to make an ability check.

Actions

Multiattack. Ravik makes two Greataxe attacks.

Greataxe. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Slashing damage.

Bonus Actions

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Ravik moves up to half its Speed without provoking Opportunity Attacks, and it makes one Greataxe attack.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
- Traits/Berserk — template berserk; barbarian kit; the GM's clause "loses control when wounded"
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "berserker"
- Traits/Mountain Stride — goliath kit; the GM's clause "berserker"
- Bonus Actions/Rampage — template rampage; barbarian kit; the GM's clause "berserker"

**Engine trace**

```
[path] class_npc — class barbarian — species goliath — "berserker" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a goliath berserker who loses control wh") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=bestial/terror mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: berserk rage that erupts when wounded [behavior] | massive cleaver swung in reckless overhand chops [object] | scarred, storm-weathered goliath hide [body]
[concept] identity: A scarred goliath berserker wades in with a massive cleaver, opening fights with a reckless overhand chop that leaves its guard down and its temper frayed. Every round it trades blow for blow, and each wound it takes only widens its grin — the pain strips away restraint until it's swinging in a red frenzy that cares nothing for defense. Under pressure it never flees; bloodied, it fights harder and uglier, daring foes to hit it again.
[concept] lore: High in the storm-scoured crags, goliath war-bands exile their own once a fighter's battle-rage starts spilling over into slaughter, and the outcast wanders the lowlands itching for the next wound that will finally set it loose.
[reskin] [path] class body: the barbarian stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] the concept outranks the alias: the Gladiator is a Humanoid and the concept reads Giant — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 20, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +8
[reskin] donor: brute-5 -> CR 8
[reskin] [path] decides: class_npc on the Gladiator · class barbarian (the matcher would have said homebrew)
[reskin] print canon: "a goliath berserker who loses control when wounded" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] species kit: goliath — "berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Rampage (1/Day) (rampage), Berserk (berserk)
[reskin] inline declared: "Ravik" — the call's own answer (person), built from the name
[reskin] inline form: "Ravik" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a goliath berserker" -> has (descriptive), head | "loses control when wounded" -> has (mechanical) [asked: when_bloodied/buff_self]
[reskin] signature idea (action): "When Ravik lands a blow, the wound it opens becomes a knot of pressure its rage can yank loose later — he marks that foe as his. Any moment he chooses during the fight, the pressure bursts and that foe is staggered and reeling for a short while, as if Ravik's fury had reached across the distance to seize them." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — affliction (wound)
[reskin] word match declined by the call: aggro-curse, stunning-strike, hook-rider — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown affliction, which the GM's words keyed
[reskin] key match declined: action — "affliction" was ranked first on the call's own menu for wound, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When Ravik lands a blow, the wound it opens becomes a knot of pressure its rage can yank loose later — he marks that foe as his. Any moment he chooses during the fight, the pressure bursts and that foe is staggered and reeling for a short while, as if Ravik's fury had reached across the distance to seize them." [rider/on_hit/condition] — the model found no template that holds it (offered: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge, ground-burst, thrown-burst, thrown-burst-seed, aggro-curse)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Ravik fights best against an opponent already bleeding — when he strikes a wounded foe, the sight of it drives him into a fresh surge, letting him press the advantage with another swing. The more hurt his enemy looks, the harder he comes at them." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury, bloodied-burst (wounded)
[reskin] trait ceiling: "Bloodied Surge" does not ship — 3 traits already, and print's ceiling for a meat body is 3
[reskin] weapons answered: Cleaver = greataxe; Hurlaxe = handaxe
[reskin] weapon declared: "Cleaver" is a greataxe — the call's own answer
[reskin] weapon table: "Hurlaxe" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the words say giant ("a dire wolf but undead", 2026-10-01)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Cleaver" -> "Spear" — the Gladiator's own row
[reskin] ranged row off: "Hurlaxe" leaves — the Gladiator carries no ranged row and the words name none
[reskin] multiattack re-read — "Hurlaxe" left; "Multiattack" now reads "Ravik makes two Spear attacks."
[reskin] print canon row priced: Shield Bash — dice 9 → 27
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Shield Bash" leaves with the shield — a greataxe is two-handed and print pairs a shield with no heavy melee weapon (0 of 329 gear lines)
[reskin] class weapon: Actions/"Spear" -> "Greataxe" — a barbarian fights with a greataxe, not the Gladiator's
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 14" -> "Passive Perception 14")
[reskin] ask vs row MISMATCH: "loses control when wounded" -> "Berserk" — trigger: asked when_bloodied, row reads at_will
audit finding below confidence gate: Berserk The GM is told Ravik attacks but not how the attack resolves or whether the GM controls the target selection after the initial roll, leaving the berserk turn under-specified.
[reskin] species kit: Large -> Medium — a goliath is Medium (the words name no other size)
```


---

## Vareth Solmane — in the run

**Concept:** name: Vareth Solmane | a templar priest of the dawn who blesses her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Solmane | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
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

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Vareth, Vareth and its allies have Advantage on attack rolls and saving throws, provided Vareth doesn't have the Incapacitated condition.

Actions

Multiattack. Vareth makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Vareth can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Bonus Actions

Dawn Blessing (2/Day). Each ally within 30 feet of Vareth gains 11 (2d10) Temporary Hit Points.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Bash — print's own row
- Bonus Actions/Dawn Blessing — template rally; library draw (seed unstamped); the GM's clause "blesses her soldiers"; binds the GM's words: blessing+bless+shield+prayer

**Engine trace**

```
[path] class_npc — class paladin — "templar" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "blesses her soldiers" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("blesses her soldiers") | caster-warpriest: key "blesses" (class verb)
[concept] name: "Vareth Solmane" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=caster type=Humanoid themes=celestial/armed mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Vareth Solmane"
[concept] mechanics: none claimed
[concept] signature elements: blessing soldiers with dawn-light [behavior] | the chanting of war-prayers [behavior] | iron plate and blessed mace [object]
[concept] identity: Vareth Solmane opens by raising her blessed standard and chanting the Dawn Prayer, washing her soldiers in Radiant light that hardens their resolve and sears any who strike them. Each round she wades in beside her line, her mace landing with dawn-charged force while she calls down fresh benedictions on the wounded and the wavering. She is patient and unshakable — she does not flee a bloodied field, cutting her way to the standard-bearer's side and spending her last prayer to keep the formation standing.
[concept] lore: Sworn to a militant dawn-order that holds the eastern pass, Vareth believes every sunrise is a battle already won and rides out to prove it, blessing the faithful until her god's light breaks the dark line.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon route: the Gladiator is not a caster first and keys STR 18 over DEX 15 — it casts no spells — the caster family stands down for the plain defender line
[reskin] print canon defenses: HP 91 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +7 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] style unserved: "warpriest" has no defender line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said twist Priest)
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] name_element answered: Radiant Lance = literal
[reskin] repair round 1: 1 defect(s) — "Radiant Lance" deals Radiant on a Humanoid whose concept names no Radiant — a name is not a warrant; use a physical type
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] proper noun: "Vareth Solmane" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vareth" — the call's own answer (person), built from the name
[reskin] inline form: "Vareth" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] energy withheld on a base row: "Radiant Lance" Radiant -> Piercing (the row's own noun; a Humanoid deals no Radiant its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Vareth Solmane — a templar priest of the dawn" -> has (descriptive), head | "blesses her soldiers" -> has (mechanical) [asked: buff_ally]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Vareth raises her blessed standard and chants the Dawn Prayer, washing her soldiers in Radiant light that hardens their resolve and sears any who strike them. Every ally fighting near her is shielded by the dawn for a short while, and enemies who land blows on those shielded soldiers take Radiant damage in return. The blessing fades quickly, so she must renew it each round to keep the formation st" [action/always/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] signature template: rally -> Bonus Actions/"Dawn Blessing (2/Day)" ("Vareth blesses her soldiers, granting nearby allies a short-lived defensive bles [verb: blessing:concept, bless:concept, shield:idea, prayer:idea]")
[reskin] keys spent by the action: blessing, bless
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Vareth's mace strikes carry the charge of the coming dawn: each morning she blesses her weapon, and its blows flare with Radiant light that leaves the faithful steady and the enemy reeling. The light clings to her shield-arm too, so any blow she turns aside flashes back at the attacker." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: marking-light, guarded-stance — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Vareth's mace strikes carry the charge of the coming dawn: each morning she blesses her weapon, and its blows flare with Radiant light that leaves the faithful steady and the enemy reeling. The light clings to her shield-arm too, so any blow she turns aside flashes back at the attacker." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
[reskin] weapons answered: Mace = mace; Radiant Lance = none
[reskin] weapon declined: "Radiant Lance" reads lance from its name, but the call answered none — the row carries no weapon
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Mace" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Radiant Lance leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon multiattack: "Vareth makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
[reskin] row binds its clause: "Dawn Blessing" answers "blesses her soldiers" — the keys it matched came from that clause, so the coverage credit has a receipt
[harness] re-rolled Actions/"Longsword" -> "Longsword" [the call's own text]
```

**Re-roll — one entry, replaced**

```
Actions / BEFORE  Longsword: *Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.
Actions / AFTER   Longsword: *Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Radiant damage, and the next attack roll made against the target before the start of Vareth's next turn is made with Advantage.
provenance: none — the call wrote the text itself
```


---

## Brother Anselm — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Brother Anselm | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Mace); nova none; dmg 26

```
Brother Anselm

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

Aura of Authority. While in a 10-foot Emanation originating from Anselm, Anselm and its allies have Advantage on attack rolls and saving throws, provided Anselm doesn't have the Incapacitated condition.

Actions

Multiattack. The guard makes two Mace attacks.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Anselm's next turn.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

**Engine trace**

```
[path] class_npc — class paladin — "templar" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a templar priest with a mace and no magi…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: mace and shield line-holder [object] | no magic, only muscle and iron [behavior] | refuses to yield ground [behavior]
[concept] identity: A blunt, dogged line-holder who plants his shield and lets the mace do the talking: he opens by anchoring a choke point, then meets every advance with a shield-bash to shove the target back and a heavy downward mace blow on anyone who insists on closing. He has no spells to fall back on, so he fights the whole battle on stamina and stubbornness, refusing to yield ground until he is physically dragged off it — and even bloodied, he keeps swinging rather than flee.
[concept] lore: A lay brother of a militant order who took a vow of poverty so literally he forsook every blessing but his own arm, he now stands guard over relics and thresholds no one else will hold, trusting iron and armor where faith alone failed.
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
[reskin] inline declared: "Anselm" — the call's own answer (person), built from the name; the rules would have said "the brother"
[reskin] inline on kit rows: "the brother" -> "Anselm"
[reskin] inline form: "Anselm" — the model's own reading of the name
[reskin] lacks asked: "no magic at all"
[reskin] asked field dropped: the call answered limit "at_will" for "a templar priest with a mace" but offered no quote
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] signature idea (action): "Anselm slams his shield forward, and every foe close enough to threaten his line is driven back a step and left staggered, struggling to swing true. He can plant himself this way instead of swinging the mace, which makes advancing on him a losing trade." [action/save/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] word match declined by the call: rally — the key word does not mean the mechanic here
[reskin] fit declined: "Shield Shove" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the class_npc path has no shelf — the Guard Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 18 already beats print's 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Every blow Anselm lands with his mace rattles the target's guard, so that for a moment they can't keep their footing against the shield line — anyone staggered by his shield slam and then struck with the mace is pinned in place and unable to slip away from him." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: guarded-stance, aberrant-ground, adhesive — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Every blow Anselm lands with his mace rattles the target's guard, so that for a moment they can't keep their footing against the shield line — anyone staggered by his shield slam and then struck with the mace is pinned in place and unable to slip away from him." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] weapons answered: Mace = mace; Bash = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Guard Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon row: Actions/Longsword — the Guard Captain's second melee row, beside the chassis's
[reskin] print canon multiattack: "The guard makes two attacks, using Javelin or Longsword in any combination." — the Guard Captain's own
[reskin] ranged row off: "Bash" leaves — the Guard Captain carries no ranged row and the words name none
[reskin] class weapon: Actions/"Longsword" yields — the GM named a melee weapon, and the GM's weapon replaces print's rather than riding beside it
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "The guard makes two Javelin attacks."
[reskin] multiattack reconciled: "Javelin" is no row on this sheet — the Multiattack cites "Mace" instead
```


---

## Lucien Marrow — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Lucien Marrow | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (3 × Arcane Burst); nova none; dmg 48

```
Lucien Marrow

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

Traits

Slip the Blow. If Lucien is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Lucien instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Lucien makes three Arcane Burst attacks.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Lucien casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). Lucien casts Misty Step, using the same spellcasting ability as Spellcasting.

Ash Double (2/Day). Lucien teleports up to 30 feet to an unoccupied space it can see.

Reactions

Protective Magic (3/Day). Trigger: Lucien is hit by an attack roll. Response: Lucien casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
- Bonus Actions/Ash Double — template phase-slip; library draw (seed unstamped); the GM's clause "is never where you struck and steps away"; binds the GM's words: step+slip
- Traits/Slip the Blow — template evasion; library draw (seed unstamped); the GM's clause "is never where you struck and steps away"; binds the GM's words: never where

**Engine trace**

```
[path] class_npc — class mage — "wizard" (call)
[route] skirmisher type=Humanoid mechanics=teleport — casts: implied by the kind — "a court wizard who is never where you st" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("never where you struck and steps away") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=arcane/uncanny mind=sapient style=— energy=Force mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: never being where the blow lands — a displacing afterimage step [behavior] | a body of dissolving ash that reassembles elsewhere [body] | courtly spell-thrusts delivered from an unexpected quarter [behavior]
[concept] identity: The court wizard opens by stepping half out of the world — a blur of ash and afterimage where the strike lands a heartbeat late — then circles the fight in patient, measured increments, reeling out one spell-thrust from a new angle each round and sliding out of reach before the reply comes. Every attack is aimed where it was, never where it is; it spends the fight letting enemies exhaust themselves against its displacement, and under real pressure it cuts its losses, stepping away through walls of its own dissolving body rather than trading blows. It toys only with those it can strand, and it flees bloodied without shame.
[concept] lore: A royal arcanist who bargained away the flesh that could be struck, this one still keeps the court's appointments—arriving unseen, leaving before verdicts, and settling old accounts on the sovereign's behalf.
[reskin] energy withheld: Force on a Humanoid with no Force in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 6
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from skirmisher, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 89 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-6 -> CR 6
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said twist Mage)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Afterimage" deals Force on a Humanoid whose concept names no Force — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] inline declared: "Lucien" — the call's own answer (person), built from the name; the rules would have said "Marrow"
[reskin] inline on kit rows: "Marrow" -> "Lucien"
[reskin] inline form: "Lucien" — the model's own reading of the name
[reskin] energy withheld on a base row: "Afterimage" Force -> Piercing (the body's physical type; a Humanoid deals no Force its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "is never where you struck and steps away" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a court wizard" -> has (descriptive), head | "is never where you struck and steps away" -> has (mechanical) [asked: on_being_hit/resist]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Lucien peels off a duplicate made of drifting ash and leaves it standing where he was, a perfect likeness that only looks solid. Anyone who strikes it sees their blow pass through a dissolving smear, and for a moment the attacker's attention and stance are committed to an empty place — enough for Lucien to slip away or line up his next thrust untouched. Only one such decoy can hang in the air at a" [bonus_action/always/defense] — menu: lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] word match declined by the call: blighted-ground — the key word does not mean the mechanic here
[reskin] signature template: phase-slip -> Bonus Actions/"Ash Double (2/Day)" ("leaves a decoy standing where he was so he is never where struck and slips away  [verb: step:concept, slip:idea]")
[reskin] keys spent by the action: step
[reskin] signature idea (trait): "Whenever a blow lands on Lucien, he does not bleed so much as flake apart: a cloud of warm ash clings to the attacker, smoking their eyes until they can blink it clear. This does not stop the hit — it punishes the one who committed to it, so enemies learn that connecting with him costs them their next clean swing." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] signature template (trait): evasion -> Traits/"Slip the Blow" ("Lucien is never where a blow lands — he slips aside from the strike entirely, ta [verb: never where:concept]")
[reskin] weapons answered: Afterimage = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Afterimage" -> "Arcane Burst" — the Mage's own row
[reskin] print canon skills: "Arcana +6, Perception +4" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] row binds its clause: "Ash Double" answers "is never where you struck and steps away" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Slip the Blow" answers "is never where you struck and steps away" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "is never where you struck and steps away" -> "Misty Step" — trigger: asked on_being_hit, row reads at_will
[reskin] audit rename blocked — "Ember Step" claims an element "Ash Double (2/Day)" does not pay (no damage)
```


---

## Thurivald — in the run

**Concept:** name: Thurivald | a skald who sings his warband into a fury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
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

Death-Song Fury. While it has half of its hit points or fewer, Thurivald has advantage on attack rolls.
Captain's Charm (Bonus Action). One creature Thurivald can see within 30 feet must succeed on a DC 14 Wisdom saving throw or be charmed until the start of Thurivald's next turn.
Bolstering Cry (2/Day). As a bonus action, Thurivald grants each ally within 30 feet of it 10 (3d6) temporary hit points.

Actions
Multiattack: The pirate makes three attacks, using Rapier or Hand Crossbow. It can replace one attack with a use of Warband Surge.
Rapier: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage, and Thurivald has advantage on the next attack roll it makes before the end of this turn.
Warband Surge: Each creature of Thurivald's choice within 30 feet must make a DC 14 Wisdom saving throw. On a failed save, the target immediately moves up to half its speed in a direction of Thurivald's choice, using the safest available route.
Hand Crossbow: Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 15 (2d10 + 4) piercing damage.
```

**Where each row came from**

- Traits/Death-Song Fury — template bloodied-fury; library draw (seed unstamped); the GM's clause "sings his warband into a fury"; binds the GM's words: fury+wounded+savage
- Actions/Multiattack — the chassis
- Actions/Rapier — print's own row, renamed; weapon rapier
- Actions/Warband Surge — template herd; library draw (seed unstamped); binds the GM's words: call
- Actions/Hand Crossbow — print's own row; weapon hand crossbow
- Bonus Actions/Captain's Charm — bard kit; the GM's clause "skald"
- Bonus Actions/Bolstering Cry — template rally; bard kit; the GM's clause "skald"

**Engine trace**

```
[path] class_npc — class bard — "skald" (call)
[route] defender-leader type=Humanoid mechanics=aura — casts: implied by the kind — "sings his warband into a fury" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] name: "Thurivald" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=voice/armed mind=sapient style=leader energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Thurivald"
[concept] mechanics: aura
[concept] signature elements: a war-song that drives his warband into fury [behavior] | the skald's axe and shield, swung at the front line [object] | an aura of emboldening song around his troops [aura]
[concept] identity: Thurivald opens by planting his feet and raising a war-song that knots his warband into a single furious fist, then wades in beside them — shield up and axe swinging — so his song never breaks and his troops never falter. Each round he holds the line at the front, trading verses for blows and shouting his companions forward over the din, and he only truly sings loudest when the fight turns against him, growing more savage and harder to put down the more blood he has spilled. He does not flee; a skald's last verse is his death-song, and he means to finish it with his band still standing.
[concept] lore: Thurivald is a wandering war-skald who sells his throat to whichever warband will feed him, and what he wants is a battle worthy of the song he'll be remembered by.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the bard stands on the Pirate Captain — the class's own print block, nearest CR 6
[reskin] print canon route: the Pirate Captain's body outranks the leader seat — no verb in the words names it; the plain defender line
[reskin] print canon defenses: HP 114 -> 84, AC 18 -> 17 — the Pirate Captain's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 10, DEX 18, CON 14, INT 10, WIS 14, CHA 17 — the Pirate Captain's at its own CR; attack +6 -> +7, DC 14 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] [path] decides: class_npc on the Pirate Captain · class bard (the matcher would have said homebrew)
[reskin] print canon: "Thurivald — a skald who sings his warband into a fury" heads on the Pirate Captain — print's rows ride along; the seat stays
[reskin] class kit: bard — "skald": Captain's Charm (Pirate Captain/Captain's Charm), Bolstering Cry (2/Day) (rally)
[reskin] proper noun: "Thurivald" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Thurivald" — the call's own answer (person), built from the name
[reskin] inline form: "Thurivald" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Thurivald — a skald" -> has (descriptive), head | "sings his warband into a fury" -> has (mechanical) [asked: buff_ally]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Thurivald calls the charge: every ally who can hear him lurches forward a short distance with axes and shields raised, and the first blow any of them lands in that surge carries the force of the whole warband's shout behind it, striking harder than it should. He uses it to break the enemy line in one crashing swell rather than a slow grind." [action/always/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature template: herd -> Actions/"Warband Surge (2/Day)" ("Thurivald calls the charge and every ally who can hear him lurches forward a sho [verb: call:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 17 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Thurivald's song rises as he bleeds; the more wounds he carries, the more savage and relentless his axe-strokes become, and the greater the fury he pours into his warband's ears. When he is badly hurt the verse turns from a marching song into a death-song, and the band fights like men with nothing left to lose." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] signature template (trait): bloodied-fury -> Traits/"Death-Song Fury" ("The idea is that Thurivald grows savage and relentless as he takes wounds — the  [verb: fury:concept, wounded:idea, savage:idea]")
[reskin] weapons answered: Handaxe = handaxe; Thrown Axe = handaxe
[reskin] weapon table: "Thrown Axe" — thrown, range 20/60
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Pirate Captain's
[reskin] print canon row: Actions/Pistol — the Pirate Captain's own ranged row, added (the chassis carried none to rename)
[reskin] print canon attack: "Handaxe" -> "Rapier" — the Pirate Captain's own row
[reskin] print canon multiattack: "The pirate makes three attacks, using Rapier or Pistol in any combination." — the Pirate Captain's own
[reskin] print canon skills: "Athletics +3, Perception +5" -> "Acrobatics +7, Perception +5" — the Pirate Captain's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Thrown Axe" — the Pirate Captain prints no row for it and no path stage claimed it
[reskin] print canon: chassis row leaves — Traits/"Guard Aura" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] class weapon: Actions/"Pistol" -> "Hand Crossbow" — a bard fights with a hand crossbow, not the Pirate Captain's
[reskin] dead control row: "Warband Surge" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Warband Surge.
[reskin] row binds its clause: "Death-Song Fury" answers "sings his warband into a fury" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rename blocked — "Rallying Shove" promises a push or a knockdown that "Warband Surge" does not deliver
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Kaelen Vor — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Kaelen Vor | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "moves through the shadows"
- read: def 5 / off 5 → 5; sustained 34 (2 × Shortsword); nova none; dmg 34

```
Kaelen Vor

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

Assassinate. During the first round of each combat, Kaelen has Advantage on attack rolls against any creature that hasn't taken a turn. If Kaelen hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Evasion. If Kaelen is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Kaelen instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Kaelen makes two attacks, using Shortsword or Shortbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Kaelen takes the Dash, Disengage, or Hide action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

**Engine trace**

```
[path] class_npc — class rogue — "ninja" (call)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("moves through the shadows and strikes un") | skirmisher-skulker: key "unseen" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=uncanny/armed mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: striking unseen from shadow [behavior] | vanishing into darkness between strikes [behavior] | concealing shadow-stuff woven into its garb and body [body]
[concept] identity: The Shadow Ninja opens combat by melting into any patch of dim light and reappearing behind the nearest foe, delivering a single precise blade strike from absolute concealment. Each round after, it flits between shadowed hiding places, striking once and vanishing again before the target can turn, never staying in the open. Under pressure it becomes a cruel opportunist, toying with prey and picking off the wounded one at a time, but it will slip away entirely when truly cornered rather than fight evenly.
[concept] lore: Drilled in a hidden mountain cloister devoted to the art of the unseen strike, this ninja sells its silence to whoever pays in secrets and shadow, and it wants only the next perfect kill and the dark that makes it possible.
[reskin] [path] class body: the rogue stands on the Bandit Captain — the class's own print block, nearest CR 5
[reskin] print canon array: STR 15, DEX 16, CON 14, INT 14, WIS 11, CHA 14 — the Bandit Captain's, DEX fitted to +6
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Bandit Captain · class rogue (the matcher would have said homebrew)
[reskin] print canon: "a ninja who moves through the shadows and strikes unseen" heads on the Bandit Captain — print's rows ride along; the seat stays
[reskin] class kit: Cunning Action — the sheet already carries it, so the rogue kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: rogue — "ninja": Evasion (evasion), Assassinate (assassinate)
[reskin] inline declared: "Kaelen" — the call's own answer (person), built from the name; the rules would have said "Vor"
[reskin] inline on kit rows: "Vor" -> "Kaelen"
[reskin] inline form: "Kaelen" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "strikes unseen" names no absence — nothing in it takes anything away
[reskin] clauses: "a ninja" -> has (descriptive), head | "moves through the shadows" -> has (mechanical) [asked: at_will/at_will/movement] | "strikes unseen" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Kaelen lashes out at a foe it is hidden from, and the wound itself becomes a door: on the next round, from any shadowed place, it steps back to that same bleeding mark and strikes there again without warning, so no shadow ever feels safe twice. A creature struck this way cannot shake the sense of being watched from the dark." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — self-invisibility (unseen)
[reskin] word match declined by the call: self-invisibility, affliction, bolt-mark, delayed-brand, rampage, aggro-curse, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown self-invisibility, which the GM's words keyed
[reskin] key match declined: action — "self-invisibility" was ranked first on the call's own menu for unseen, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Kaelen lashes out at a foe it is hidden from, and the wound itself becomes a door: on the next round, from any shadowed place, it steps back to that same bleeding mark and strikes there again without warning, so no shadow ever feels safe twice. A creature struck this way cannot shake the sense of being watched from the dark." [rider/on_hit/damage] — the model found no template that holds it (offered: self-invisibility, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, delayed-brand, rampage, aggro-curse)
[reskin] fallback respects the call: self-invisibility, rampage left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Bandit Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Kaelen's garb and skin are woven with living shadow-stuff, so that light around it dims and its concealment deepens wherever darkness already exists. Foes who lose track of it in the gloom find the shadows themselves seem to lean toward their backs." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Kaelen's garb and skin are woven with living shadow-stuff, so that light around it dims and its concealment deepens wherever darkness already exists. Foes who lose track of it in the gloom find the shadows themselves seem to lean toward their backs." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] weapons answered: Tanto = dagger; Shuriken = dart
[reskin] weapon declared: "Tanto" is a dagger — the call's own answer
[reskin] weapon declared: "Shuriken" is a dart — the call's own answer
[reskin] weapon table: "Shuriken" — thrown, range 20/60
[reskin] print canon modes: climb off — the Bandit Captain has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Neutral Evil -> Neutral — the Bandit Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Thieves' cant" — the Bandit Captain's
[reskin] print canon attack: "Tanto" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon attack: "Shuriken" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] on-hit extra retyped: "Assassinate" adds Slashing, not Bludgeoning — the hit's own type (Scimitar)
[reskin] print canon: chassis row leaves — Traits/"Shadowstep" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] on-hit extra retyped: "Assassinate" adds Piercing, not Slashing — the class weapon's own type (Shortsword)
[reskin] class weapon: Actions/"Scimitar" -> "Shortsword" — a rogue fights with a shortsword, not the Bandit Captain's
[reskin] class weapon: Actions/"Pistol" -> "Shortbow" — a rogue fights with a shortbow, not the Bandit Captain's
[reskin] asked but unanswered: "moves through the shadows" asked for at_will/at_will and no row binds the clause
```


---

## Hooklock Imp — in the run

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hooklock Imp | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "picks locks for a devil"
- read: def 3 / off 6 → 4.5; sustained 40 (2 × Sting); nova none; dmg 40

```
Hooklock Imp

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

Magic Resistance. The hooklock imp has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The hooklock imp makes two Sting attacks. It can replace one attack with a use of Disarming Prick.

Sting. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Piercing damage plus 7 (2d6) Poison damage.

Disarming Prick. Strength Saving Throw: DC 14, one creature within 5 feet that is holding a weapon or another object. Failure: The target drops the held object, which lands in its space.

Shape-Shift. The hooklock imp shape-shifts to resemble a rat (Speed 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.

Invisibility. The hooklock imp casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
- Actions/Disarming Prick — template disarm; library draw (seed unstamped); binds the GM's words: strip+weapon
- Actions/Shape-Shift — print's own row
- Actions/Invisibility — print's own row

**Engine trace**

```
[path] twist — Imp (is) — "imp" (call)
[route] skirmisher-skulker type=Fiend mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("an imp rogue who picks locks for a devil") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Fiend themes=fiendish/grasping mind=sapient style=skulker energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: picks locks for a devil [behavior] | shadow-body that slips through keyholes [body] | fiendish lockpicks and barbed tools [object]
[concept] identity: The imp opens by vanishing into shadow and reappearing behind the lock it was sent to break, its first strike aimed at the hinge of a guard's knee or the clasp of a warded chest. Every round after, it flits between pockets of darkness, picks the fight apart with precise, brass-key jabs, and taunts its foes into wasting their strength on empty air. Under pressure it turns coward and broker at once: it offers its services, then flees through a keyhole or a crack in the flagstones, never fighting a battle it cannot pick clean.
[concept] lore: A lesser devil's tool and errand-runner, this imp was forged in the brimstone smithies of a deeper hell to open what its master cannot reach and pick clean the locks of mortal vaults.
[reskin] print canon route: the Imp's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 6, DEX 18, CON 13, INT 11, WIS 12, CHA 14 — the Imp's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 4
[reskin] [path] decides: twist on the Imp (the matcher agrees)
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Imp — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the hooklock imp" — the call's own answer (kind), built from the name
[reskin] inline form: "the hooklock imp" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an imp rogue" -> has (descriptive), head | "picks locks for a devil" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The imp jabs at a foe's gear rather than its flesh — buckles, straps, clasps, and latches. On a hit, the target's armor or held implement comes loose: a shield slides off an arm, a belt or bandolier spills, a weapon's grip loosens so the next swing goes wild. The imp chooses whether to strip the foe's guard or spoil its next attack, and the damage is dealt as normal on top." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] seat takes its clause: "Latchpick Strike" answers "an rogue" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: disarm -> Actions/"Latchpick Strike" ("The imp jabs at a foe's gear rather than its flesh — buckles, straps, clasps, an [verb: strip:idea, weapon:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The imp can squeeze its shadow-body through any gap a key could pass — keyholes, cracks in flagstones, the space beneath a door. While it stays still in shadow, it reads the workings of any lock or latch it can see, learning how to open it and where it is weakest, so its first strike against that lock or the guard beside it lands true." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] word match declined by the call: sealed-body, false-appearance — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "collision" after being shown sealed-body, which the GM's words keyed
[reskin] key match declined: trait — "sealed-body" was ranked first on the call's own menu for locked, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The imp can squeeze its shadow-body through any gap a key could pass — keyholes, cracks in flagstones, the space beneath a door. While it stays still in shadow, it reads the workings of any lock or latch it can see, learning how to open it and where it is weakest, so its first strike against that lock or the guard beside it lands true." [trait/always/defense] — the model found no template that holds it (offered: sealed-body, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] weapons answered: Pick = none
[reskin] print canon modes: climb off — the Imp has no such mode and the words name none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] print canon languages: "Infernal, Common" -> "Common, Infernal" — the Imp's
[reskin] print canon speed: 40 ft. -> 20 ft. — the Imp's walk; the concept's other modes stay
[reskin] print canon attack: "Pick" -> "Sting" — the Imp's own row
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Imp's own header lines
[reskin] resistances derived withheld: print's Imp owns the line (Cold)
[reskin] print canon trait: Magic Resistance — "an imp rogue who picks locks for a devil" is the Imp (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Imp's
[reskin] print canon: chassis row leaves — Traits/"Slippery" is the seat's, not the Imp's
[reskin] print canon row: Actions/Shape-Shift — the Imp's own
[reskin] print canon row: Actions/Invisibility — the Imp's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Latchpick Strike.
audit finding below confidence gate: Shape-Shift The entry offers three form options plus a return clause and speed exceptions in one paragraph, forcing the GM to parse branching options mid-combat.
[reskin] audit rename: "Latchpick Strike" -> "Disarming Prick"
```


---

## Mazegoad Reaver — in the run

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Mazegoad Reaver | 6 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Rib Spike); nova none; dmg 44

```
Mazegoad Reaver

Large Monstrosity, Neutral

AC 16
Initiative +2 (12)

HP 105 (14d10 + 28)

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
11
+0
+0
MOD
SAVE
CON
15
+2
+5
CHA
15
+2
+5

Skills Athletics +7, Persuasion +5

Senses darkvision 60 ft.; Passive Perception 10

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the reaver, the reaver and its allies have Advantage on attack rolls and saving throws, provided the reaver doesn't have the Incapacitated condition.

Actions

Multiattack. The reaver makes two Rib Spike attacks.

Rib Spike. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Piercing damage.

Bonus Actions

Charge. The reaver moves up to half its Speed straight toward an enemy it can see.

Goring Retort. One creature within 5 feet that hit the reaver with an attack roll since the end of the reaver's last turn takes 7 (2d6) Bludgeoning damage.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Rib Spike — the chassis
- Bonus Actions/Charge — minotaur kit; the GM's clause "a minotaur reaver who herds prey into the maze"
- Bonus Actions/Goring Retort — library seed own-turn-punisher

**Engine trace**

```
[path] refused: print_body "Minotaur" is not in the corpus
[path] homebrew — species minotaur — "a minotaur reaver who herds prey into the maze" (call)
[route] defender-leader type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("herds prey into the maze") | defender-leader: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "the minotaur reaver who herds prey into …" is the description, not a name
[concept] resolve: archetype=defender type=Monstrosity themes=bestial/terror mind=sapient style=leader energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: herding prey deeper into the maze [behavior] | hooked bone-tipped horns and goad [object] | the maze itself as its weapon [aura]
[concept] identity: The minotaur reaver opens a fight by bellowing and slamming the maze's first corner shut behind its quarry, then drives them down the warren with hooked horns and a bone-tipped goad, parrying at each junction so no one slips past back toward daylight. Every round it presses the herd toward the deepest dead end, using the maze itself as its ally — never charging blind, always one step behind the panicked runners. Under pressure it does not flee; it laughs, takes the nearest corner, and lets the corridors do its killing until only the strongest prey remains.
[concept] lore: Born from a line of labyrinth-wardens who ate the god they were sworn to guard, the reaver keeps a maze not as a home but as a larder, driving travelers deeper each season and letting hunger — its own and its herd's — do the harvest.
[reskin] donor: defender-3-leader -> CR 6
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: "Hybrid Attack" keeps its melee half only
[reskin] species kit: minotaur — "a minotaur reaver who herds prey into the maze": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the reaver" — the call's own answer (kind), built from the name
[reskin] inline form: "the reaver" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a minotaur reaver" -> has (descriptive), head | "herds prey into the maze" -> has (descriptive)
[reskin] signature idea (action): "The reaver lowers its head and sweeps its hooked horns in a wide arc across everything in front of it, catching the panicked runners shoulder to shoulder and dragging them along with the sweep. Creatures caught in the arc are hauled forward with the horns and dumped in a heap just past the reaver, out of position and deeper into the dark, where the goad and the corridor can finish sorting them. Th" [action/save/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — herd (herd)
[reskin] value check: "Sweeping Horns" EV 2.9 vs floor 10.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sweeping Horns" — the ladder could not lift it; the fallback stands in
[reskin] fallback skipped by the floor: herd (EV 8.2 vs 35.5)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 10.9)
[reskin] fallback skipped by the floor: push-prone (EV 2.9 vs 10.9)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The bone-tipped goad and horns leave shallow hooked wounds that snag on fleeing movement — a creature the reaver has struck recently finds the wound tearing every time it tries to break away, so turning tail costs it, while standing and facing the horns costs it more. The hurt fades on its own if the reaver lets up for a moment." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The bone-tipped goad and horns leave shallow hooked wounds that snag on fleeing movement — a creature the reaver has struck recently finds the wound tearing every time it tries to break away, so turning tail costs it, while standing and facing the horns costs it more. The hurt fades on its own if the reaver lets up for a moment." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
[reskin] weapons answered: Horns = none; Goad = none
[reskin] languages by mind: "None" -> "Common" (sapient)
audit finding below confidence gate: Charge A Bonus Action labeled Charge grants movement but states no attack, damage, or effect that occurs at the end, so the action's resolution is unclear at the table.
[reskin] audit rename: "Answering Sting" -> "Goring Retort"
[reskin] audit rename: "Goad" -> "Rib Spike"
[reskin] dead name still carried — "Horns" names a row that is still on the sheet; no sweep
[reskin] identical row leaves: Actions/"Horns" reads word for word as Actions/"Rib Spike" — one ability, one name
[reskin] multiattack re-read: "Horns" is not on this sheet, so the combination now reads "The reaver makes two Rib Spike attacks."
```


---

## Snikt Ravell — in the run

**Concept:** a tabaxi cutpurse who slips through the market crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Snikt Ravell | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "slips through the market crowd"
- read: def 3 / off 3 → 3; sustained 16 (2 × Shortbow); nova none; dmg 16

```
Snikt Ravell

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

Evasion. If Snikt is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Snikt instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The bandit makes two attacks, using Shortsword or Shortbow in any combination.

Shortsword. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 8 (1d10 + 3) Piercing damage.

Bonus Actions

Cunning Action. Snikt takes the Dash, Disengage, or Hide action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
[concept] resolve: archetype=skirmisher type=Humanoid themes=grasping/uncanny mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: slipping through the market crowd [behavior] | the cut purse [object] | catlike agility over stalls and rooftops [body]
[concept] identity: A tabaxi cutpurse works the market as cover, drifting between stalls and shoppers until a mark's purse is exposed, then darting in to slash the strings and vanish into the press before the victim can shout. Round after round it shadow-dances through the crowd — dipping behind a cart or a broad-shouldered merchant to gain concealment, then lunging with a quick blade for the flank or the hamstring. It is a coward at heart: once bloodied or cornered it hurls caltrops or a stolen lantern and bolts for the nearest alley, trading a fight it can't win for another day's pickpocketing.
[concept] lore: A denizen of the city's crowded bazaar, this tabaxi learned the cutpurse's trade in the shadow of a crime guild and skims a tithe from every careless shopper, wanting nothing more than enough coin to buy its way into something better.
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
[reskin] inline declared: "Snikt" — the call's own answer (person), built from the name
[reskin] inline form: "Snikt" — the model's own reading of the name
[reskin] damage type by the row's own noun: "Knife" Slashing -> Piercing
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tabaxi cutpurse" -> has (descriptive), head | "slips through the market crowd" -> has (mechanical) [asked: at_will/movement]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the crowd is thick, Snikt ducks behind a stall or a broad-shouldered shopper and comes up in a different spot along the same press of bodies, blade already swinging. It can trade places with a nearby person or cover, ending up where they stood, and the sudden shuffle leaves the person it swapped with stumbling and unable to follow where it went." [action/always/movement] — menu: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, exploiter (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — feint-slip (slip)
[reskin] signature miss: action — "When the crowd is thick, Snikt ducks behind a stall or a broad-shouldered shopper and comes up in a different spot along the same press of bodies, blade already swinging. It can trade places with a nearby person or cover, ending up where they stood, and the sudden shuffle leaves the person it swapped with stumbling and unable to follow where it went." [action/always/movement] — the model picked "leap" (no verb, and it quotes nothing the GM typed) over a concept-verb template (feint-slip)
[reskin] fallback stands down: the class_npc path has no shelf — the Bandit Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 15 already beats print's 13 at CR 3, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Snikt's fingers are quicker than eyes. Anything Snikt is carrying or wearing that someone tries to grab, hold, or pull free comes away in Snikt's hand instead — the grabber is left holding a fistful of nothing while Snikt is already two steps into the crowd." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] verb gate stands down: trait — no template shares a verb, but "a tabaxi" is a clause the sheet has not answered; the GM's own words are the warrant
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Snikt's fingers are quicker than eyes. Anything Snikt is carrying or wearing that someone tries to grab, hold, or pull free comes away in Snikt's hand instead — the grabber is left holding a fistful of nothing while Snikt is already two steps into the crowd." [trait/on_being_hit/defense] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body)
[reskin] weapons answered: Knife = dagger; Sling = sling
[reskin] weapon table: "Sling" — a launcher, never thrown, range 30/120
[reskin] print canon modes: climb off — the Bandit Captain has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Bandit Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Thieves' cant" — the Bandit Captain's
[reskin] print canon attack: "Knife" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon multiattack: "The bandit makes two attacks, using Scimitar and Pistol in any combination." — the Bandit Captain's own
[reskin] print canon attack: "Pistol" is print's own row — +5, 8 (1d10 + 3), range 30/90 ft. (an exact body at print's CR)
[reskin] print canon attack: "Sling" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] print canon skills: "Perception +2, Stealth +5" -> "Athletics +4, Deception +4" — the Bandit Captain's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon: chassis row leaves — Traits/"Crowd Slip" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] class weapon: Actions/"Scimitar" -> "Shortsword" — a rogue fights with a shortsword, not the Bandit Captain's
[reskin] class weapon: Actions/"Pistol" -> "Shortbow" — a rogue fights with a shortbow, not the Bandit Captain's
[reskin] multiattack normalised: "The bandit makes two attacks, using Shortsword or Shortbow in any combination."
[reskin] asked but unanswered: "slips through the market crowd" asked for at_will and no row binds the clause
[reskin] species kit: Climb 30 ft. — a tabaxi's own
[reskin] species kit: darkvision 60 ft. — the tabaxi's
```
