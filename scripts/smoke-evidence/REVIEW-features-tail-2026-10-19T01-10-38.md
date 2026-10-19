# Review batch — features-tail-2026-10-19T01-10-38

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Black Fletching Archer | 6 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Chiming Skitterer | 4 | 2024 | lurker-2 | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | ok | soft (1) | 18/19 | 7/7 |
| Grik | 1 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Sinkhole Troll | 3 (2014) | 2014 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/3 |
| Thurivald | 9 | 2024 | skirmisher-8-hurler | ok | user-set: AC 17, HP 180 · reads CR 10 | ok | ok | ok | ok | ok | ok | ok | clean | 5/7 | 8/8 |

**Dropped 3 of 30 user clauses** (coverage 90%); concept share 89% (24/27 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Grik — lowest CR

**Concept:** name: Grik | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Grik | 1 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 1 → 1; sustained 12 (2 × Strike Blade); nova none; dmg 12

```
Grik

Small Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 31 (7d6 + 7)

Speed 30 ft., Climb 50 ft.

MOD
SAVE
STR
12
+1
+1
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

Skills Perception +3, Stealth +6

Senses Passive Perception 13

Languages Common

CR 1 (XP 200; PB +2)

Traits

Ratlike Scurry. Grik ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Grik makes two attacks, using Hurled Knife or Strike Blade in any combination.

Strike Blade. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Slashing damage.

Hurled Knife. Ranged Attack Roll: +4, range 20/60 ft. 5 (1d6 + 2) Piercing damage.

Bonus Actions

Cunning Action. Grik takes the Dash, Disengage, or Hide action.

Honed Cut (2/Day). Grik charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 3 (1d6) Slashing damage.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

- Traits/Ratlike Scurry — the chassis
- Actions/Multiattack — the chassis
- Actions/Strike Blade — weapon dagger
- Actions/Hurled Knife — weapon dagger
- Bonus Actions/Cunning Action — the chassis
- Bonus Actions/Honed Cut — template coating; library draw (seed unstamped); binds the GM's words: coating+coat+venom

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("Grik") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=venomous/grasping mind=sapient style=skulker energy=Poison mix=both identity=✓ lore=✓
[concept] name: provided "Grik"
[concept] mechanics: none claimed
[concept] signature elements: the hidden strike from cover [behavior] | a blade slicked with its own venom [object] | skulking through drains and crawlspaces [behavior]
[concept] identity: Grik opens a fight from a hidden angle, slipping out of cover to drive a poisoned blade into a flank and then breaking line before the wound is even felt. Every round after, it circles, feints, and waits for an ally or a shadow to open its next advantage, only committing when the odds are its own. Wounded and exposed, it panics and bolts for the nearest dark hole — unless cornered, at which point it turns and fights with the frantic, venomous spite of a rat in a trap.
[concept] lore: Grik is a runt who learned that a small knife in the right place feeds a goblin better than any war-band, and now it haunts the drains and back alleys of the warren looking for someone careless enough to bleed alone.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3-skulker -> CR 1
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] name_element answered: Poisoned Blade = literal
[reskin] implied class refused: the call answered "rogue" but quoted "slipping out of cover to drive a poisoned blade into a flank", which is not the GM's own words
[reskin] proper noun: "Grik" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Grik" — the call's own answer (person), built from the name
[reskin] inline form: "Grik" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Grik" -> has (descriptive), head
[reskin] extraction: 12 of 13 model clauses quote nothing the user typed and leave the record ("opens a fight from a hidden angle", "slipping out of cover", "drive a poisoned blade into a flank", …)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Grik strikes from hiding with a blade it has been quietly coating, and the cut keeps weeping: the wound stays slicked with venom so the victim bleeds slower to close and easier to hit while its guard is down. It only works on a target Grik attacked before it had been seen this fight, so the goblin must earn the first cut from cover before the venom turns any wound into a lasting nuisance." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: snare, throw-retrieve, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] word match declined by the call: delayed-brand, rampage, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark — the key word does not mean the mechanic here
[reskin] value check: "Coated Cut (2/Day)" EV 1.7 vs floor 0.8 (a bonus action (free)) — worth the trade
[reskin] signature template: coating -> Bonus Actions/"Coated Cut (2/Day)" ("charges its next strike with quietly applied venom; the first hit lands an extra [verb: coating:idea, coat:idea, venom:idea]")
[reskin] signature idea (trait): "Grik's knives are never clean — it licks and wipes them between fights, so anyone who grabs or grapples the little goblin comes away with slick, burning fingers and a creeping numbness that saps their grip and makes them fumble the hold." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] seat owes nothing: the skulker line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] trait declined: "Greased Grip" — bound only on the idea's own words (sap:idea, grip:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Poisoned Blade = dagger; Hurled Knife = dagger
[reskin] weapon declared: "Poisoned Blade" is a dagger — the call's own answer (the name alone read longsword)
[reskin] weapon table: "Hurled Knife" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: added Climb 50 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] attack name by anatomy: "Poisoned Blade" -> "Poisoned Blade" — blade deals Slashing, not Piercing
[reskin] on-hit extra retyped: "Coated Cut (2/Day)" adds Slashing, not Bludgeoning — the hit's own type (Poisoned Blade)
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 13" -> "Passive Perception 13")
[reskin] name follows content: Actions/"Poisoned Blade" promises Poison the row never delivers — "Strike Blade" (the call's modifier kept, the claim word swapped for a noun the row earns)
[reskin] multiattack re-read — "Poisoned Blade" left; "Multiattack" now reads "Grik makes two Hurled Knife attacks."
[reskin] audit rename: "Coated Cut (2/Day)" -> "Honed Cut (2/Day)"
[reskin] multiattack re-read — "Strike Blade" joins the combination; "Grik makes two attacks, using Hurled Knife or Strike Blade in any combination."
```


---

## Thurivald — highest CR

**Concept:** name: Thurivald | A Huge frost giant jarl. He throws boulders, swings a greataxe, and his roar freezes the blood. AC 17, 180 hit points, cr 9.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 9 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "He throws boulders"
- **dropped clause:** "his roar freezes the blood"
- read: def 8 / off 12 → 10; sustained 66 (3 × Greataxe); nova Boulder Toss 49; dmg 77

```
Thurivald

Huge Giant, Neutral Evil

AC 17
Initiative +4 (14)

HP 180 (19d12 + 57)

Speed 50 ft.

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
18
+4
+8
WIS
14
+2
+6
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

Skills Perception +6, Stealth +8

Resistances Cold

Senses darkvision 60 ft.; Passive Perception 16

Languages Giant

CR 9 (XP 5,000; PB +4)

Traits

Frozen Roar. The first time Thurivald is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 15, each creature in a 15-foot Emanation originating from Thurivald. Failure: 18 (4d8) Cold damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.

Great Weapon Master. When Thurivald hits a creature with its Greataxe, the attack deals an extra 4 damage.

Long Stride. Thurivald ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Thurivald makes three attacks, using Greataxe or Boulder in any combination. It can replace one attack with a use of Trip Attack.

Greataxe. Melee Attack Roll: +8, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Boulder. Ranged Attack Roll: +8, range 20/60 ft. 17 (3d8 + 4) Bludgeoning damage.

Boulder Toss (Recharge 5-6). Thurivald hurls a boulder at a point it can see within 90 feet. Dexterity Saving Throw: DC 15, each creature in a 5-foot-radius Sphere centered on that point. Failure: 49 (14d6) Bludgeoning damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Trip Attack. Strength Saving Throw: DC 15, one creature within 30 feet that is Prone. Failure: 14 (4d6) Cold damage. Success: Half damage.

Bonus Actions

Fleet Agility. Thurivald takes the Dash or Disengage action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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

- Traits/Frozen Roar — template bloodied-burst; library draw (seed unstamped); binds the GM's words: bloodied+wounded+erupt
- Traits/Great Weapon Master — a declared feature; the GM's clause "swings a greataxe"
- Traits/Long Stride — the chassis
- Actions/Multiattack — the chassis
- Actions/Greataxe — authored for this sheet; a named part; the GM's clause "swings a greataxe"; weapon greataxe
- Actions/Boulder — the chassis
- Actions/Boulder Toss — the chassis
- Actions/Trip Attack — library seed exploiter
- Bonus Actions/Fleet Agility — the chassis

**Engine trace**

```
[route] skirmisher-hurler type=Giant mechanics=thrown-weapon, aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-hurler: ✓ ("He throws boulders") | skirmisher-hurler: key "throws" (class verb)
[concept] name: "Thurivald" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: hurler→style ✓ ("he throws boulders")
[concept] resolve: archetype=skirmisher type=Giant themes=elemental/terror mind=sapient style=hurler energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Thurivald"
[concept] mechanics: thrown-weapon, aura
[concept] signature elements: hurled boulders of packed ice and stone [behavior] | a greataxe swung at the end of a long winter arm [object] | a roar that freezes the blood [aura]
[concept] identity: Thurivald opens by ripping a boulder from the tundra and hurling it into the enemy line, then paces forward with his greataxe to keep the survivors pinned between falling stone and closing steel. Each round he alternates hurled rock and axe sweep, bellowing a roar that rimes the air with frost and slows the warm-bloods around him. He is a jarl to the marrow — proud, patient, and cruel enough to toy with a broken foe rather than finish it, but he does not run; wounded, he plants his feet and roars louder.
[concept] lore: Thurivald rules a drifting ice-shelf clan whose jarls are owed tribute in iron and meat, and he came south to collect what the thaw claimed was his.
[reskin] nova capped: "Hurled Burst" 54 → 49 (the chassis nova obeys the cap: 50 at CR 9)
[reskin] donor: skirmisher-8-hurler -> CR 9 (invented — no printed peer)
[reskin] named parts: Greataxe (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] proper noun: "Thurivald" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Thurivald" — the call's own answer (person), built from the name
[reskin] inline form: "Thurivald" — the model's own reading of the name
[reskin] final price: the round ran 51 against the card's 70 — the attack rows re-solve at 137% (3 attacks on an authored sheet, under the card)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Thurivald — A Huge frost giant jarl" -> has (header) | "He throws boulders" -> has (mechanical) [asked: attack] | "swings a greataxe" -> has (mechanical) [asked: attack] | "his roar freezes the blood" -> has (mechanical) [asked: condition] | "AC 17" -> has (header) | "180 hit points" -> has (header) | "cr 9" -> has (header)
[reskin] extraction: 2 of 8 model clauses quote nothing the user typed and leave the record ("AC 17", "cr 9")
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Thurivald digs in his heels and lets out a jarl's bellow that rimes the air with frost, washing over everything close around him before he moves. The cold clings to those caught in it, slowing their feet and stiffening their limbs so they cannot easily close with him or flee from the axe that follows. He can only summon the roar so often, but he loves to use it after the ground is already slick wi" [action/always/condition] — menu: snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, pacify, slow-bolt (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, bolt-restrain)
[reskin] signature bound to the concept's verb: action — slow-bolt (freeze, frost)
[reskin] word match declined by the call: slow-bolt, pacify, condition-payoff — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown slow-bolt, which the GM's words keyed
[reskin] key match declined: action — "slow-bolt" was ranked first on the call's own menu for freeze+frost, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Thurivald digs in his heels and lets out a jarl's bellow that rimes the air with frost, washing over everything close around him before he moves. The cold clings to those caught in it, slowing their feet and stiffening their limbs so they cannot easily close with him or flee from the axe that follows. He can only summon the roar so often, but he loves to use it after the ground is already slick wi" [action/always/condition] — the model found no template that holds it (offered: slow-bolt, snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, pacify)
[reskin] fallback respects the call: slow-bolt, pacify, condition-payoff left the shelf — the call declined them for this sheet
[reskin] fallback skipped: thrown-burst-seed (the sheet cannot render it)
[reskin] fallback skipped by the floor: sensory-strike (EV 2.5 vs 9.4)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 9.4)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.4 (one attack of 3) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 17 already beats print's AC 16 at CR 9, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "When Thurivald is wounded badly enough to be roused, the frost in his blood erupts; his roar carries farther, colder, and any who hear it feel the winter settle into their bones and slow them. It happens the moment he is bloodied, and then he is harder to escape and harder to approach." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (freezes, freeze)
[reskin] word match declined by the call: terrain-walk, heated-body — the key word does not mean the mechanic here
[reskin] signature template (trait): bloodied-burst -> Traits/"Frozen Roar" ("The frost in his blood erupts the moment he is bloodied, a burst that slows/chil [verb: bloodied:concept, wounded:idea, erupt:idea]")
[reskin] feature name: "Opportunist's Lash" -> "Trip Attack" — the card that is this feature takes its name
[reskin] weapons answered: Greataxe = greataxe; Boulder = none; Boulder Toss = none
[reskin] weapon table: "Boulder" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] chassis nova: "Boulder Toss (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] defenses by material: a ice body is vulnerable to Fire and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] resistances derived: Cold
[reskin] multiattack replacement clause: It can replace one attack with a use of Trip Attack.
audit finding below confidence gate: Frozen Roar The name 'Frozen Roar' and Cold damage imply a freezing effect, but the rider is Poisoned, which is inconsistent with a cold-natured creature's signature state and overlaps awkwardly with Trip Attack's unrelated cold rider.
audit finding below confidence gate: Boulder The Boulder action has no range/area distinction problem, but it duplicates Boulder Toss's thrown-rock identity without any trait explaining how Thurivald carries or sources boulders, creating an unresolved resource question for the GM.
audit finding below confidence gate: Trip Attack A melee-centric giant's trip follow-up against an already-Prone target at 30 feet requires the GM to track Prone state across turns with no reminder of how prone targets are generated, slowing adjudication.
[reskin] user-set: HP 152 -> 180 — a declared field (Resolution 3)
[reskin] multiattack re-read — "Boulder" joins the combination; "Thurivald makes three attacks, using Greataxe or Boulder in any combination. It can replac"
```


---

## Black Fletching Archer — a 2014 sheet

**Concept:** an archer of the black fletching who never misses the eye

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Black Fletching Archer | 6 (2014) | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 6 → 6; sustained 42 (2 × Shortsword); nova none; dmg 42

```
Black Fletching Archer
Medium humanoid, neutral
Armor Class

15 (chain shirt)

Hit Points: 

115 (21d8 + 21)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


11 (+0)

	

16 (+3)

	

12 (+1)

	

11 (+0)

	

13 (+1)

	

11 (+0)

Skills: 

Perception +4, Stealth +6

Saving Throws: 

DEX +6

Senses: 

passive Perception 14

Languages: 

Common plus one other language

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Evasion. If the archer is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the archer instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it is incapacitated.
Cunning Action. As a bonus action, the archer takes the Dash, Disengage, or Hide action.

Actions
Multiattack: The archer makes two attacks, using Shortsword or Longbow.
Shortsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
Longbow: Ranged Weapon Attack: +6 to hit, range 150/600 ft., one target. Hit: 16 (3d8 + 3) piercing damage.
```

**Where each row came from**

- Traits/Evasion — template evasion; rogue kit; the GM's clause "never misses the eye"
- Actions/Multiattack — the chassis
- Actions/Shortsword — print's own row, renamed; weapon shortsword
- Actions/Longbow — print's own row; weapon longbow
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "never misses the eye"

**Engine trace**

```
[route] skirmisher-archer type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: on the GM's own words "an archer of the black fletching" | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-archer: ✓ ("an archer of the black fletching") | skirmisher-archer: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "an archer of the black fletching who nev…" is the description, not a name
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/terror mind=sapient style=archer energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the black-fletched arrow that finds the eye [object] | unblinking patience: stalking, repositioning, waiting to take the one shot [behavior] | each shot a sworn debt collected in eyes [aura]
[concept] identity: The Archer of the Black Fletching opens a fight from cover, loosing a single black-fletched shaft before the target knows a bowstring has been drawn; every shot is aimed at the eye, and it counts a miss across a lifetime as a personal wound. Each round it repositions in short, silent bursts, refusing the melee it knows it would lose, and against a near-miss or a bloodied enemy it does not flee — it goes still, breathes slow, and takes the same unblinking shot until the eye is pierced.
[concept] lore: A human marksman who swore each of the black-fletched arrows to the memory of someone killed before an audience, the archer now keeps the vow literally, stalking chosen targets and gathering their eyes as proof of the debt settled.
[reskin] print canon route: the Scout's body outranks the archer seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 11, DEX 16, CON 12, INT 11, WIS 13, CHA 11 — the Scout's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 6
[reskin] print canon: "an archer of the black fletching who never misses the eye" heads on the Scout — print's rows ride along; the seat stays
[reskin] implied class kept: "rogue" on the GM's own words "never misses the eye" — the key table found none
[reskin] row evicted for the cap: Traits/"Silent Strides" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "never misses the eye": Cunning Action (Assassin/Cunning Action), Evasion (evasion)
[reskin] inline declared: "the archer" — the call's own answer (kind), built from the name
[reskin] inline form: "the archer" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "never misses the eye" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "an archer of the black fletching" -> has (descriptive), head | "never misses the eye" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the archer has gone still and let a full breath pass without moving or attacking, its next longbow shot at a creature it has been stalking ignores everything between them — cover, concealment, even the blur of motion — and seeks the eye. If that shot lands, the target is left reeling from the wound to its sight, unable to aim true until it shakes off the sting. The archer may only hold this p" [trait/start_of_turn/condition] — menu: warded-mending (+ shelf: trample, leap, thrown-burst, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — gaze-single (eye, eyes)
[reskin] word match declined by the call: gaze-single, patient-defense, feint-slip, affliction — the key word does not mean the mechanic here
[reskin] fit declined: "Stilled Eye (2/Day)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: gaze-single, patient-defense left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "an archer of the black fletching who never misses the eye" heads on the Scout and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The black-fletched arrow remembers the eye it was sworn to. Once the archer has wounded a creature with its longbow, every later longbow shot against that same creature finds its mark more easily, and the archer cannot bring itself to abandon that quarry for another until the debt is settled or the target is beyond reach." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: relentless-pursuit, bloodied-fury, bloodied-burst — the key word does not mean the mechanic here
[reskin] trait declined: "Sworn Quarry" — bound only on the idea's own words (quarry:idea, marked:idea, its mark:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Dagger = dagger; Longbow = longbow
[reskin] weapon table: "Longbow" — a launcher, never thrown, range 150/600
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Scout's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Scout's
[reskin] print canon attack: "Dagger" -> "Shortsword" — the Scout's own row
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Scout's
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Chiming Skitterer — a 2024 sheet

**Concept:**  | role: lurker

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Chiming Skitterer | 4 | lurker-2 | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-hp: HP 52 is 31% under the card's 75
- **dropped clause:** "it flees only a verdict it cannot win"
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Glass Leg); nova Chiming Toll 14; dmg 27

```
Chiming Skitterer

Medium Monstrosity, Lawful Neutral

AC 15
Initiative +4 (14)

HP 52 (8d8 + 16)

Speed 30 ft., Swim 30 ft., Climb 30 ft.

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

Resistances Cold

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Amphibious. The skitterer can breathe air and water.

Bloodied Burst. The first time the skitterer is Bloodied in a fight, it releases a burst. Wisdom Saving Throw: DC 14, each creature in a 15-foot Emanation originating from the skitterer. Failure: 7 (2d6) Cold damage, and the target has the Frightened condition until the end of its next turn.

Assassinate. During the first round of each combat, the skitterer has Advantage on attack rolls against any creature that hasn't taken a turn. If the skitterer hits a creature during that round, the target takes an extra 7 (2d6) Cold damage.

Evasion. If the skitterer is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the skitterer instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The skitterer makes two Glass Leg attacks.

Glass Leg. Melee Attack Roll: +6 (with Advantage during the first round of each combat), reach 5 ft. 13 (2d8 + 4) Cold damage.

Chiming Toll (Recharge 5-6). Constitution Saving Throw: DC 14, each creature in a 15-foot Emanation originating from the skitterer. Failure: 14 (4d6) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Bonus Actions

Nimble Escape. The skitterer takes the Disengage or Hide action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
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
- Actions/Glass Leg — the chassis
- Actions/Chiming Toll — template active-toll; library draw (seed unstamped); the GM's clause "chime as they carry it down drowned colonnades"; binds the GM's words: ring+chime
- Bonus Actions/Nimble Escape — rogue kit; the GM's clause "skirmishing pack hunter that harries withdraws and circles back"
- Traits/Amphibious — print's own row
- Traits/Bloodied Burst — template bloodied-burst; library draw (seed unstamped); the GM's clause "ringing its limbs against the stone to terrify its mark into a misturn"; binds the GM's words: ring+bloodied
- Traits/Assassinate — template assassinate; rogue kit; the GM's clause "It opens from ambush in a circling pack"
- Traits/Evasion — template evasion; rogue kit; the GM's clause "skirmishing pack hunter that harries withdraws and circles back"

**Engine trace**

```
[route] lurker type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker: ✓ ("It opens from ambush in a circling pack,") | lurker-phantom: the call read "drowned" as not meaning that mechanic here — no override | lurker stands: every key that would override it was read as a figure of speech | lurker: no line key in the words — the model's read of its quote | bane: "Radiant" on the GM's own words "pale sanctified glass"
[concept] synthesis (blank roll): archetype=lurker type=Monstrosity themes=celestial/aquatic mind=sapient style=— lore=✓
[concept] synthesis text: A Lindiren is a single, sapient huntsman of the deep cloisters — a lean, stone-hided skitterer whose many legs are shafts of pale sanctified glass that tick and chime as they carry it down drowned colonnades and up temple walls, its faceted flanks rimed with the cold of old submerged prayer. It opens from ambush in a circling pack, one hunter breaking cover to draw the eye while the others scuttle the colonnade walls and flank, then withdraws on clicking glass limbs the moment a quarry turns to face it, harrying and returning until reach and nerve are spent. Bound by holy purpose, it will not slay the unaware but will not break off a hunt it has judged: at blood it only redoubles the circling, ringing its limbs against the stone to terrify its mark into a misturn, and it flees only a verdict it cannot win. It is fully sapient (INT 10-14), and it is a skirmishing pack-hunter that harries, withdraws, and circles back.
[concept] signature elements: circling pack-hunter that withdraws and returns [behavior] | many-legged skittering glass-limbed body [body] | bone-riming cold of drowned prayer [aura]
[concept] name proposal: Lindiren
[concept] lore: When the sunken temple of the glass cloister drowned, its many-legged wardens were left to guard a congregation long since dust, and they still judge and take any trespasser who enters the flooded nave as a quarry owed to the altar.
[reskin] donor: lurker-2 -> CR 4
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] implied class kept: "rogue" on the GM's own words "skirmishing pack hunter that harries withdraws and circles back" — the key table found none
[reskin] row evicted for the cap: Bonus Actions/"Umbral Step" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "skirmishing pack hunter that harries withdraws and circles back": Cunning Action (Assassin/Cunning Action), Evasion (evasion), Assassinate (assassinate)
[reskin] inline declared: "the skitterer" — the call's own answer (kind), built from the name
[reskin] inline form: "the skitterer" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: "will not slay the unaware"
[reskin] asked field dropped: the call answered trigger "at_will" for "It opens from ambush in a circling pack" but offered no quote
[reskin] lacks not claimed: "will not break off a hunt it has judged: at blood it only redoubles the circling" reads like a lack to the words, and the call's list did not name it
[reskin] asked field dropped: the call answered trigger "at_will" for "will not break off a hunt it has judged: at blood it only redoubles the circling" but offered no quote
[reskin] lacks not claimed: "it flees only a verdict it cannot win" reads like a lack to the words, and the call's list did not name it
[reskin] asked field dropped: the call answered trigger "at_will" for "it is a skirmishing pack-hunter that harries" but offered no quote
[reskin] clauses: "A Lindiren is a single" -> has (descriptive), head | "sapient huntsman of the deep cloisters — a lean" -> has (descriptive) | "stone-hided skitterer whose many legs are shafts of pale sanctified glass that tick" -> has (descriptive) | "chime as they carry it down drowned colonnades" -> has (descriptive) | "up temple walls" -> has (descriptive) | "its faceted flanks rimed with the cold of old submerged prayer" -> has (descriptive) | "It opens from ambush in a circling pack" -> has (mechanical) | "one hunter breaking cover to draw the eye while the others scuttle the colonnade walls and flank" -> has (descriptive) | "withdraws on clicking glass limbs the moment a quarry turns to face it" -> has (descriptive) | "harrying and returning until reach" -> has (mechanical) | "nerve are spent" -> has (descriptive) | "Bound by holy purpose" -> has (descriptive) | "it will not slay the unaware" -> LACKS (mechanical) | "will not break off a hunt it has judged: at blood it only redoubles the circling" -> has (mechanical) | "ringing its limbs against the stone to terrify its mark into a misturn" -> has (descriptive) | "it flees only a verdict it cannot win" -> has (mechanical) | "It is fully sapient (INT 10-14)" -> has (descriptive) | "it is a skirmishing pack-hunter that harries" -> has (mechanical) | "withdraws" -> has (descriptive) | "circles back" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the skitterer strikes a foe that is already wounded, it rings its glass limbs against the nearest stone and the chime carries through the colonnade, and every other skitterer that can hear it converges on that mark, closing the circle and gaining ground on the wounded quarry. The ringing also drags the hunted creature's eye toward the sound, so its next faltering step takes it further from es" [rider/on_hit/movement] — menu: charge-push, hook-rider, pounce, isolation (+ shelf: leap, gaze-single, condition-payoff, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, exploiter, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, rampage, rally, riposte)
[reskin] signature bound to the concept's verb: action — rampage, gaze-single, active-toll, sensory-strike (bloodied, blood, eye, eyes, ring, chime)
[reskin] word match declined by the call: rampage, gaze-single, sensory-strike, obstacle-pull, hook-rider, blighted-ground, charge-push, pounce, isolation — the key word does not mean the mechanic here
[reskin] value check: "Chiming Toll (Recharge 5-6)" EV 37.1 vs floor 23.7 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: active-toll -> Actions/"Chiming Toll (Recharge 5-6)" ("The wounds trigger the ringing of glass limbs against stone — an audible chime t [verb: ring:concept, chime:concept]")
[reskin] keys spent by the action: ring, chime
[reskin] signature idea (trait): "The skitterer's sanctified glass limbs … faintly as it moves, and when it withdraws from reach after harrying a mark, the sound coils back through the stone and tells it exactly where the hunted thing stands, so it can slip away unseen and return to the circling with its prey still fixed in mind." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (quarry, hunts, hunted, marked, its mark)
[reskin] word match declined by the call: spider-climb, false-appearance, faultless-tracker, uncanny-sense — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for quarry+hunts+hunted+marked+its mark, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The skitterer's sanctified glass limbs … faintly as it moves, and when it withdraws from reach after harrying a mark, the sound coils back through the stone and tells it exactly where the hunted thing stands, so it can slip away unseen and return to the circling with its prey still fixed in mind." [trait/always/defense] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] concept-first trait skipped: spider-climb — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] trait bound to the concept's verb (concept-first): bloodied-burst — ring+bloodied in the user's words; the idea path had nothing
[reskin] signature template (trait): bloodied-burst -> Traits/"Bloodied Burst" ("exact concept match [verb: ring:concept, bloodied:concept]")
[reskin] weapons answered: Glass Leg = none
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] defenses by material: a glass body is vulnerable to Thunder and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] resistances derived: Cold
[reskin] row binds its clause: "Chiming Toll" answers "chime as they carry it down drowned colonnades" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Bloodied Burst" answers "ringing its limbs against the stone to terrify its mark into a misturn" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] save re-derived after a retype: Traits/Bloodied Burst — a Constitution save for an effect that calls for Wisdom or Charisma; the save follows the condition
audit finding below confidence gate: Bloodied Burst The save is triggered by the skitterer becoming Bloodied but the text never says the skitterer can't be among the creatures in the Emanation, and more importantly nothing states whether the burst requires an action, reaction, or happens automatically; the trigger 'the first time the skitterer is Bloodied' does give timing implicitly, but the forced save lacks any statement that it occurs without an action cost. This is adjudicable enough that I should not flag it — dropping.
```


---

## Sinkhole Troll — one marked soft

**Concept:** a cave troll that speaks only Giant and understands no Common

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sinkhole Troll | 3 (2014) | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.125–6.5, n=23)
- read: def 1/2 / off 3 → 1.75; sustained 23 (1 × Slam); nova none; dmg 23

```
Sinkhole Troll
Large giant, neutral
Armor Class

10 (natural armor)

Hit Points: 

60 (8d10 + 16)

Speed: 

30 ft., climb 30 ft.

STR	DEX	CON	INT	WIS	CHA


14 (+2)

	

8 (-1)

	

15 (+2)

	

6 (-2)

	

8 (-1)

	

6 (-2)

Skills: 

Athletics +4, Perception +1

Saving Throws: 

STR +4

Senses: 

darkvision 60 ft., passive Perception 11

Languages: 

Speaks only Giant

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Regeneration. The troll regains 10 hit points at the start of each of its turns. If the troll takes acid or fire damage, this trait doesn't function on the troll's next turn. The troll dies only if it starts its turn with 0 hit points and doesn't regenerate.
Rampage (1/Day) (Bonus Action). Immediately after dealing damage to a creature that has half of its hit points or fewer, the troll moves up to half its speed, and it makes one slam attack.

Actions
Slam: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 23 (6d6 + 2) bludgeoning damage.
```

**Where each row came from**

- Actions/Slam — the chassis
- Bonus Actions/Rampage — library seed rampage
- Traits/Regeneration — the chassis

**Engine trace**

```
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a cave troll") | brute: no line key in the words — the model's read of its quote
[concept] hints: troll→canon ✓ ("a cave troll that speaks only Giant")
[concept] resolve: archetype=brute type=Giant themes=subterranean/bestial mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: thick cave-troll hide that turns blades [body] | blocks the tunnel and will not yield [behavior] | roaring in Giant, deaf to Common [behavior]
[concept] identity: A hulking cave troll that can only roar and bellow in Giant, opening fights by charging the nearest creature it hears speak and swinging a stone-thick arm in a wide, crushing arc. Every round it plants its hide-wrapped frame between the loudest threat and the exit, trading blow for blow and refusing to give ground. Wounded, it goes quiet and utterly vicious, fighting to the death and hammering anything that tries to slip past it.
[concept] lore: Raised in the lightless sinkholes beneath the hills, a cave troll claims a stretch of tunnel and wants only to be left in silence, driving out every intruder whose tongue it cannot understand.
[reskin] donor: brute-2 -> CR 3
[reskin] inline declared: "the troll" — the call's own answer (kind), built from the name
[reskin] inline form: "the troll" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 12 (8 + PB 2 + the sheet's best 2) — no stat on the sheet reached it
[reskin] lacks asked: "understands no Common"
[reskin] clauses: "a cave troll" -> has (descriptive), head | "speaks only Giant" -> has (header) | "understands no Common" -> LACKS (mechanical)
[reskin] signature idea (action): "The troll drives its fists and shoulders into the tunnel walls and floor, collapsing the passage into a pile of loose stone and rubble. Anyone caught in the cave-in is buried and pinned where they stand, forced to claw their own way out while the troll looms over them; the troll can do this only where there is true earth and rock to tear apart, never open ground or finished stone." [action/save/condition] — menu: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, charge-push, hook-rider, pounce, charge)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The troll drives its fists and shoulders into the tunnel walls and floor, collapsing the passage into a pile of loose stone and rubble. Anyone caught in the cave-in is buried and pinned where they stand, forced to claw their own way out while the troll looms over them; the troll can do this only where there is true earth and rock to tear apart, never open ground or finished stone." [action/save/condition] — the model found no template that holds it (offered: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up)
[reskin] fallback skipped by the floor: herd (EV 8.6 vs 18.6)
[reskin] value check: "Rampage (1/Day)" EV 18.6 vs floor 3.6 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When the troll plants itself in a passage and braces, it fills the tunnel shoulder to shoulder, and anyone trying to push past or slip around it is shoved back and slowed to a crawl; nothing gets by while it stands there." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "When the troll plants itself in a passage and braces, it fills the tunnel shoulder to shoulder, and anyone trying to push past or slip around it is shoved back and slowed to a crawl; nothing gets by while it stands there." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] weapons answered: Slam = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "Giant" -> "None" (bestial)
[reskin] name-canon trait stamped: Regeneration (the name says so; print says what it does)
[reskin] header clause: Languages "None" -> "Speaks only Giant" — the user typed it
[reskin] 2014 conversion: one lint-gated call — both printings saved
```
