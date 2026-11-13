# Smoke: v-route (2026-11-13T20-53-44)

- 01 Big Bob — ok, signature: dropped
- 02 Old Marta — ok, signature: library
- 03 Pitchcatapult Ogre — ok, signature: library
- 04 Ashpit Retiarius — ok, signature: library
- 05 Rafter Broodmother — ok, signature: library
- 06 Sister Maudra — ok, signature: library
- 07 Skyburner — ok, signature: library
- 08 Bramblejack — ok, signature: library
- 09 Vhalgrin — ok, signature: library
- 10 Orsolya — ok, signature: library

---

## 01. Big Bob — CR 9

**Input:** `name: big bob | giant who throws boulders | role: artillery`
**Donor:** skirmisher-8-hurler -> CR 9 (invented — no printed peer)
**Signature:** dropped · **elapsed** 29s

### Block
```
Big Bob
Huge giant, neutral
Armor Class

16 (natural armor)

Hit Points: 

161 (14d12 + 70)

Speed: 

40 ft.

STR	DEX	CON	INT	WIS	CHA


23 (+6)

	

16 (+3)

	

20 (+5)

	

10 (+0)

	

12 (+1)

	

9 (-1)

Skills: 

Perception +5, Stealth +7

Saving Throws: 

DEX +7, WIS +5

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Giant

Challenge

9 (5,000 XP)

Proficiency Bonus:

+4

Deflect Missile (Recharge 5-6) (Reaction).When Bob is hit by a ranged attack roll and takes Bludgeoning, Piercing, or slashing damage from it, Bob reduces the damage it takes from the attack by 11 (1d10 + 6), and if that damage is reduced to 0, Bob can redirect some of the attack's force. One creature Bob can see within 60 feet must make a DC 18 Dexterity saving throw, taking 11 (1d10 + 6) force damage on a failed save.

Actions
Multiattack: Bob makes three attacks, using Stone Club or Boulder.
Stone Club: Melee Weapon Attack: +7 to hit, reach 15 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage.
Boulder: Ranged Weapon Attack: +7 to hit, range 60/240 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage.
```

### Trace
```
[path] twist — Stone Giant (is) — "giant" (call)
[route] skirmisher-hurler type=Giant mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-hurler: ✓ ("throws boulders") | skirmisher-hurler: key "throws" (class verb)
[concept] name: "big bob" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: hurler→style ✓ ("giant who throws boulders")
[concept] resolve: archetype=skirmisher type=Giant themes=bestial/elemental mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "big bob"
[concept] mechanics: thrown-weapon
[concept] signature elements: hurls boulders from range [behavior] | a giant's stone-thick hide and mass [body] | a hoarded pile of throwing stones [object]
[concept] identity: Big Bob opens a fight by ripping a boulder out of the ground and hurling it at the most distant target he can see, laughing as he does it, then keeps at that range — circling, scooping up fresh ammunition, and lofting stones in lazy arcs over cover so prey never gets a straight line to him. He is a keen-eyed, mean-spirited giant who fights like a siege engine with a temper: he targets spellcasters and archers first, and rather than closing to brawl when pressed he retreats upslope or behind a ridge to keep the high ground and the throwing lane, only grudgingly letting a foe get inside his reach.
[concept] lore: Big Bob is a hill giant cast out of his clan for throwing rocks at the chief, and he now haunts a rocky valley collecting boulders the way other giants collect trophies — he wants a fight he can win from far away and a pile of stones big enough to never run out.
[reskin] print canon array: STR 23, DEX 16, CON 20, INT 10, WIS 12, CHA 9 — the Stone Giant's, DEX fitted to +7
[reskin] donor: skirmisher-8-hurler -> CR 9 (invented — no printed peer)
[reskin] seats: package <- "a giant's stone-thick hide and mass"
[reskin] [path] decides: twist on the Stone Giant (the matcher would have said homebrew)
[reskin] print canon: "big bob — giant who throws boulders" heads on the Stone Giant — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Mobility Trait" takes the shelf's own row name "Sure Footing" — that name belongs to a template this sheet may still receive; choose another
[reskin] class kit: none — the twist path takes no class kit
[reskin] proper noun: "big bob" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Bob" — the call's own answer (person), built from the name; the rules would have said "the big bob"
[reskin] inline on kit rows: "big" -> "Bob"
[reskin] inline form: "Bob" — the model's own reading of the name
[reskin] returning clause dropped: "Boulder" throws a boulder — the call did not say this projectile is a single object the creature must recover (projectile_supply: ambient), so it stays where it lands; print writes a returning weapon 4 times in 1291 rows
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] the sheet's declared ask: burst — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "throws boulders" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "throws boulders" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "big bob — giant" -> has (descriptive), head | "throws boulders" -> has (mechanical) [asked: at_will/at_will/attack]
[reskin] open asks handed to the idea call: "throws boulders" (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "Bob slams a fistful of stone into the ground at his feet, and a jagged" answers the GM's "throws boulders"
[reskin] idea unanchored: trait — "Stone-Skinned. Bob's hide is packed with grit and old rock; when he ta" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 29 of 29 answered; not true of this body: snare, shield-bash, snare-bolt, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "throws boulders", so role and style do not filter the menu (legality still does); 13 template(s) offered
[reskin] menu pruned: action — thrown-burst-seed, push-prone (the sheet cannot render them)
[reskin] signature idea (action): "Bob slams a fistful of stone into the ground at his feet, and a jagged wave of splintered rock erupts outward in a line toward a point he can see, flinging shards of boulder through everything in its path. Each creature caught in the eruption has the Prone condition as the ground buckles under it." [action/save/condition] [family: nova] — menu: condition-payoff, throw-retrieve, lure, sensory-strike, disarm, exploiter, execute, pacify, escalating-dread, terror-pulse, slow-bolt, curse-debt, reveal (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, rampage, lay-on-hands, snap-shot, riposte, answering-strike, stunning-strike, charge-push, pounce, isolation, bolt-mark, bolt-restrain, bolt-drag, charge)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — burst: throw-retrieve
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: throw-retrieve (always/damage), lure (save/condition), sensory-strike (save/condition)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=attack when=at_will often=at_will
[reskin] word match declined by the call: lure, sensory-strike, exploiter, pacify, escalating-dread, terror-pulse, reveal, condition-payoff, disarm, execute, slow-bolt, curse-debt — the key word does not mean the mechanic here
[reskin] closest refused: action — "throw-retrieve" was named nearest, but the call declined it for already_answered ("already_answered") — the sheet already answers this; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: hurls stone for ranged damage without losing the projectile or halving)
[reskin] decline reason: action — the call answered none and names it "already_answered"
[reskin] signature miss: action — "Bob slams a fistful of stone into the ground at his feet, and a jagged wave of splintered rock erupts outward in a line toward a point he can see, flinging shards of boulder through everything in its path. Each creature caught in the eruption has the Prone condition as the ground buckles under it." [action/save/condition] — the model found no template that holds it (offered: throw-retrieve, lure, sensory-strike, exploiter, pacify, escalating-dread, terror-pulse, reveal, condition-payoff, disarm, execute, slow-bolt, curse-debt)
[reskin] fallback respects the call: condition-payoff, sensory-strike, disarm, exploiter left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the fit call read the finished sheet and declined for already_answered — the mechanic is on this sheet already, so nothing stands in for it
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Stone-Skinned. Bob's hide is packed with grit and old rock; when he takes Bludgeoning or Piercing damage from a nonmagical weapon, he takes only half the damage, as chips of stone shear away instead of flesh." [trait/always/defense] [family: body-reaction] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] composed candidates: none trait — the body-reaction family has no payload that does "defense" (it offers damage, condition, movement)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=attack when=at_will often=at_will
[reskin] word match declined by the call: assassinate, bloodied-fury, guarded-stance — the key word does not mean the mechanic here
[reskin] closest refused: trait — "assassinate" was named nearest, but the call declined it for already_answered ("already_answered") — the sheet already answers this; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: bonus damage of a chosen type rider on ranged attacks the creature alr)
[reskin] decline reason: trait — the call answered none and names it "already_answered"
[reskin] signature miss: trait — "Stone-Skinned. Bob's hide is packed with grit and old rock; when he takes Bludgeoning or Piercing damage from a nonmagical weapon, he takes only half the damage, as chips of stone shear away instead of flesh." [trait/always/defense] — the model found no template that holds it (offered: bloodied-fury, death-restoration, shielded-mind, evasion, guarded-stance, undead-fortitude, spider-climb, phobia, terrain-walk, blood-frenzy, pack-tactics, berserk, relentless-pursuit, bound, assassinate, truth-aura, fear-aura)
[reskin] weapons answered: Fist = none; Boulder = none; Boulder Toss = none; Hook and Haul = none
[reskin] weapon table: "Boulder" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] chassis nova: "Boulder Toss (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: dropped Climb 40 ft. — the concept's movement set decides
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Stone Giant's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Fist" -> "Stone Club" — the Stone Giant's own row
[reskin] print canon: chassis row leaves — Actions/"Boulder Toss (Recharge 5-6)" is the seat's nova, not the Stone Giant's
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Stone Giant's
[reskin] print canon: chassis row leaves — Traits/"Ridge Runner" is the seat's, not the Stone Giant's
[reskin] print canon row: Reactions/Deflect Missile (Recharge 5-6) — the Stone Giant's own
[reskin] asked but unanswered: "throws boulders" asked for at_will/at_will and no row binds the clause
[reskin] lint: 0 findings
audit finding below confidence gate: Stone Club A Huge Giant's melee reach of 15 ft. is fine per se, but paired with a 60/240 ft. thrown Boulder this is the published body's own row and not ours; no defect to report here beyond noting the name 'Big Bob' is a generic personal nickname that says nothing about the creature's nature or abilities.
[reskin] audit: nothing flagged
[reskin] [gap] hurls stone for ranged damage without losing the projectile or halving speed after the throw — "Bob slams a fistful of stone into the ground at his feet, and a jagged wave of splintered rock erupts outward in a line toward a point he can see, flinging shards of boulder through everything in its path. Each creature caught in the eruption has the Prone condition as the ground buckles under it." — Big Bob [seat: action [action/save/condition]] (closest offered: throw-retrieve) [effect: damage] [menu: throw-retrieve lure sensory-strike exploiter pacify escalating-dread terror-pulse reveal condition-payoff disarm execute slow-bolt curse-debt] [same-cell unoffered: swallow gaze-single snare seal shield-bash random-ray snare-bolt push-prone] [same-seat rejected: swallow:hold-shape trample:style leap:denied-clause thrown-burst:nova-taken gaze-single:style snare:body-verdict reel:hold-shape seal:role shield-bash:body-verdict hook-drag:role active-toll:role pull-through:role random-ray:body-verdict ground-burst:nova-taken spew:body-verdict burrow-ambush:movement obstacle-pull:role snare-bolt:body-verdict push-prone:role herd:role drain:role wind-up:role blighted-ground:role] [row dropped]
[reskin] [gap] bonus damage of a chosen type rider on ranged attacks the creature already makes — "Stone-Skinned. Bob's hide is packed with grit and old rock; when he takes Bludgeoning or Piercing damage from a nonmagical weapon, he takes only half the damage, as chips of stone shear away instead of flesh." — Big Bob [seat: trait [trait/always/defense]] (closest offered: assassinate) [effect: damage] [menu: bloodied-fury death-restoration shielded-mind evasion guarded-stance undead-fortitude spider-climb phobia terrain-walk blood-frenzy pack-tactics berserk relentless-pursuit bound assassinate truth-aura fear-aura] [same-cell unoffered: false-appearance shell-withdraw uncanny-sense patient-defense sealed-body relic-object mimicry blurred-form] [same-seat rejected: false-appearance:denied-clause adhesive:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement marking-light:body-verdict sealed-body:role relic-object:body-verdict mimicry:body-verdict blurred-form:body-verdict death-burst:body-verdict kill-denial:body-verdict] [row dropped]
[reskin] signature outcome: 2 of 2 accepted signature pick(s) never reached the sheet — 2x the call named no template for the pick
[reskin] signature tally: 1 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 2 of 2 (2x the call named no template for the pick) · path twist
[reskin] done: "Big Bob" — donor skirmisher-8-hurler, CR 9
[reskin] 2014 conversion: one lint-gated call — both printings saved
```

---

## 02. Old Marta — CR 5

**Input:** `name: Old Marta | ballista crew sergeant, fires a siege crossbow | role: artillery`
**Donor:** skirmisher-3 -> CR 5
**Signature:** library · **elapsed** 29s

### Block
```
Old Marta

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

Actions

Multiattack. Marta makes three Longsword attacks. It can replace one attack with a use of Siege Crossbow.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Siege Crossbow. Ranged Attack Roll: +5, range 80/320 ft. 13 (2d10 + 2) Piercing damage, and Marta has Advantage on its next attack roll against the target before the end of its next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Marta can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Riposte. Trigger: A creature within 5 feet of Marta misses it with a melee attack roll. Response: Marta makes one Longsword attack against that creature.

Sighted Line. Trigger: A creature Marta can see moves to within 5 feet of it. Response: Marta makes one Siege Crossbow attack against that creature.

Parry. Trigger: Marta is hit by a melee attack roll while holding a weapon. Response: Marta adds 3 to its AC against that attack, possibly causing it to miss.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

### Trace
```
[path] class_npc — class fighter — "crew sergeant" (call)
[route] skirmisher-archer type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: on the GM's own words "fires a siege crossbow" | is_a_swarm: the call reads none in these words | skirmisher-archer: ✓ ("fires a siege crossbow") | skirmisher-archer: key "crossbow" (class noun)
[concept] name: "Old Marta" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/uncanny mind=sapient style=archer energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Old Marta"
[concept] mechanics: thrown-weapon
[concept] signature elements: siege crossbow volleys [object] | sight-and-fire crew discipline [behavior] | hard-nosed sergeant's defiance [behavior]
[concept] identity: Old Marta anchors herself behind cover and spends the opening rounds sighting her siege crossbow on the biggest target, loosing a bolt that punches through armor and shield alike. Every round after that she re-winds, re-aims, and fires from a new notch of cover, calling the range and daring the line to break before she does. If pressed into melee she curses, jams a bolt into a would-be grappler's ribs, and falls back to the crew — she is too stubborn to flee while the crew stands, but she will not die for a bad position.
[concept] lore: Old Marta has outlived three crews and two sieges behind the same siege crossbow, and she wants nothing more than one last wall to breach before the muster disbands and her name rusts with the rest.
[reskin] [path] class body: the fighter stands on the Gladiator — the class's own print block, nearest CR 5
[reskin] print canon route: the Gladiator's body outranks the archer seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 90 -> 112, AC 16 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +7, DC 15 (print's)
[reskin] donor: skirmisher-3 -> CR 5
[reskin] seats: action <- "sight-and-fire crew discipline" | trait <- "siege crossbow volleys"
[reskin] [path] decides: class_npc on the Gladiator · class fighter (the matcher would have said homebrew)
[reskin] print canon: "Old Marta — ballista crew sergeant, fires a siege crossbow" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Spiked Bolt" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade
[reskin] named parts: Siege Crossbow (slot, ranged) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] features: Vex on Siege Crossbow — the feature table, no call
[reskin] class kit: fighter — "crew sergeant": Riposte (riposte)
[reskin] proper noun: "Old Marta" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Marta" — the call's own answer (person), built from the name
[reskin] inline form: "Marta" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: limit "at_will" stands on "fires a siege crossbow" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Old Marta — ballista crew sergeant" -> has (descriptive), head | "fires a siege crossbow" -> has (mechanical) [asked: at_will/at_will/attack]
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "Marta levels the crossbow along a line she has already sighted — a cre" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Marta reads a battlefield before she fires: on her first turn in a fig" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 30 of 30 answered; not true of this body: gaze-single, snare, shield-bash, random-ray, spew, snare-bolt, blink, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "Marta levels the crossbow along a line she has already sighted — a crease, a stair, a courtyard — and when a foe enters that line before her next turn, she looses the bolt as a Reaction: the target must make a Dexterity saving throw, and on a failure it is knocked Prone as the bolt punches through shield, plate and all into the ground at its feet." [reaction/on_being_hit/condition] [family: sentinel] — menu: snap-shot (+ shelf: throw-retrieve, lure, ground-burst, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, affliction, contagion, stunning-strike, charge-push, pounce, isolation, bolt-mark, charge)
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_being_hit/does condition; leading: snap-shot (on_being_hit/damage), bolt-mark (on_hit/condition), thrown-burst-seed (save/damage)
[reskin] classification handed to the fit call: mechanic=thrown-weapon
[reskin] word match declined by the call: bolt-mark, thrown-burst-seed, focus — the key word does not mean the mechanic here
[reskin] seat answered, but: the call said "when a foe enters that line before her next turn, she looses the bolt as a Reaction" is carried by "Sighted Line", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write a reaction for "Marta levels the crossbow along a line she has already sighted — a cre" and wrote no row of that kind (refused: "Sighted Line" — the call counts 1 number(s) the row promises and only 0 are written — a promised amount, area or bonus with no number cannot be run); the nearest template stands in
[reskin] closest accepted: action — the call refused every template but named "snap-shot" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: a Reaction that forces a Dexterity saving throw and knocks the entering creature)
[reskin] pick kept on the GM's own words: action — "snap-shot" has no key-table verb, but the call quotes "fires a siege crossbow" from the description
[reskin] signature template: snap-shot -> Reactions/"Sighted Line" ("The idea is a readied-line reaction that forces a Dexterity save and knocks the  [shape fit, no verb match]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Marta reads a battlefield before she fires: on her first turn in a fight she may Study a creature she can see — a Heavy or larger creature, or one she has seen fight — and thereafter she has Advantage on attack rolls against it and ignores Half Cover from its shield or from any object it holds." [trait/start_of_turn/defense] [family: mark] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] verb gate stands down: trait — no template shares a verb, but "Old Marta — ballista crew sergeant" is a clause the sheet has not answered; the GM's own words are the warrant
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does defense; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), bloodied-fury (always/defense)
[reskin] classification handed to the fit call: mechanic=thrown-weapon
[reskin] word match declined by the call: assassinate, blood-frenzy, berserk, pack-tactics — the key word does not mean the mechanic here
[reskin] clause already answered: "Old Marta — ballista crew sergeant" is carried by "Sighted Line" — the seat read the sheet and declined to write a second row for it
[reskin] seat authored the row: trait — the call refused every template for no_fit ("Study a chosen target on first turn to gain Advantage on attacks again") and wrote a trait instead: "Sighted Line" -> Traits. On Marta's first turn in a fight, when she can see a Heavy or larger creature or a creature she has seen fight, Marta St
[reskin] authored row numbers: "Sighted Line" — the call declared 0 number(s) promised
[reskin] trait declined — the name is taken: "Sighted Line" already names a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one, so the row leaves and the fallback stands in
[reskin] weapons answered: Spiked Bolt = none; Siege Crossbow = heavy crossbow
[reskin] weapon kept: "Spiked Bolt": the call answered none, but the GM typed crossbow — the weapon is the ask
[reskin] weapon refused: "Spiked Bolt" reads crossbow, but the row has no range — a launcher is ranged-only, so the row carries no weapon
[reskin] weapon declared: "Siege Crossbow" is a heavy crossbow — the call's own answer (the name alone read crossbow)
[reskin] weapon dice follow the weapon: the GM's "Siege Crossbow" is a heavy crossbow (d10) — "17 (3d8 + 4)" becomes "15 (2d10 + 4)"
[reskin] weapon table: "Siege Crossbow" rolls Dexterity — +7 → +5
[reskin] weapon table: "Siege Crossbow" damage off Dexterity — 15 (2d10 + 4) → 13 (2d10 + 2)
[reskin] weapon table: "Siege Crossbow" — a launcher, never thrown, range 80/320
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Spiked Bolt" -> "Spear" — the Gladiator's own row
[reskin] print canon multiattack: "Marta makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon saves: proficient in STR, DEX, CON, WIS — the Gladiator's own set, at this sheet's stats and PB 3 (changed STR, CON, WIS)
[reskin] print canon skills: "Perception +4, Stealth +5" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon: chassis row leaves — Traits/"Duck and Weave" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] print canon row: Reactions/Parry — the Gladiator's own
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a fighter fights with a longsword, not the Gladiator's
[reskin] multiattack reconciled: "Shield Bash" is no row on this sheet — the Multiattack cites "Siege Crossbow" instead
[reskin] free-row budget by card size: CR 5 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] ask vs row ok: "fires a siege crossbow" -> "Siege Crossbow" — trigger at_will, limit at_will
[reskin] lint: 0 findings
[reskin] audit: [Sighted Line: A siege crossbow reaction firing at …ne Siege Crossbow attack against that creature."), Siege Crossbow: The signature action's rider grant…nst the target before the end of its next turn.")]
[reskin] audit finding on the body: Reactions/"Sighted Line" [snap-shot] — A siege crossbow reaction firing at a target that has just closed to 5 feet contradicts th. a catalog row: the fix belongs in the template, once, for every creature on this body
[reskin] row repair not offered: Actions/"Siege Crossbow" is an attack row, and this path carries no attack form — the audit's fault stands on the sheet (The signature action's rider grants Advantage on the next at)
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Riposte" carries "crew sergeant" which is not a whole clause — the seat surgery cut it; resolved to cl_9dw448
[reskin] [gap] a Reaction that forces a Dexterity saving throw and knocks the entering creature Prone — "Marta levels the crossbow along a line she has already sighted — a crease, a stair, a courtyard — and when a foe enters that line before her next turn, she looses the bolt as a Reaction: the target must make a Dexterity saving throw, and on a failure it is knocked Prone as the bolt punches through shield, plate and all into the ground at its feet." — Old Marta [seat: action [reaction/on_being_hit/condition]] (closest offered: snap-shot) [effect: condition] [menu: snap-shot bolt-mark thrown-burst-seed focus] [same-cell unoffered: none] [same-seat rejected: ward-retaliation:requires-style riposte:owned answering-strike:engine-family interpose:requires-style] [landed: snap-shot]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 1 · path class_npc
[reskin] done: "Old Marta" — donor skirmisher-3, CR 5
```

---

## 03. Pitchcatapult Ogre — CR 6

**Input:** `catapult ogre that lobs burning pitch | role: artillery`
**Donor:** skirmisher-8-hurler -> CR 6 (invented — no printed peer)
**Signature:** library · **elapsed** 34s

### Block
```
Pitchcatapult Ogre
Large giant, neutral evil
Armor Class

15 (natural armor)

Hit Points: 

110 (13d10 + 39)

Speed: 

50 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

16 (+3)

	

16 (+3)

	

10 (+0)

	

14 (+2)

	

10 (+0)

Skills: 

Perception +5, Stealth +6

Saving Throws: 

DEX +6, WIS +5

Damage Resistances: 

fire

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Common

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Stone-Thick Frame.While the ogre isn't below half its hit point maximum, melee attack rolls against it are made with disadvantage.
Siege Footing.The ogre ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility (Bonus Action).The ogre takes the Dash or Disengage action.

Actions
Multiattack: The ogre makes three attacks, using Pitch Arm or Clay Pot. It can replace one attack with a use of Overhead Lob.
Pitch Arm: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) bludgeoning damage plus 4 (1d8) fire damage.
Clay Pot: Ranged Weapon Attack: +6 to hit, range 20/60 ft., one target. Hit: 7 (1d8 + 3) fire damage.
Pitch Shards (Recharge 5-6): The ogre hurls a clay pot at a point it can see within 90 feet. Each creature in a 5-foot-radius sphere centered on that point must make a DC 15 Dexterity saving throw, taking 36 (8d8) fire damage on a failed save, or half as much damage on a successful one. On a failed save, a target that is Large or smaller is also knocked prone.
Overhead Lob: One creature within 30 feet must make a DC 15 Dexterity saving throw, taking 13 (3d8) fire damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
```

### Trace
```
[path] homebrew — "catapult ogre that lobs burning pitch" (call)
[route] skirmisher-hurler type=Giant mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-hurler: ✓ ("catapult ogre that lobs burning pitch") | skirmisher-hurler: key "lobs" (class verb)
[concept] hints: hurler→style ✓ (""lobs burning pitch" — hurler thrower")
[concept] resolve: archetype=skirmisher type=Giant themes=elemental/armed mind=sapient style=hurler energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: lobbing pots of burning pitch [behavior] | high-arc bombardment over cover [behavior] | stone-thick ogre frame [body]
[concept] identity: A catapult ogre opens the fight by bracing its squat, stone-thick body and hurling a clay pot of burning pitch in a high arc that shatters into a clinging fire-slick. Every round after it reloads with practiced, brute efficiency — a second pot, then a third — waddling a few paces to keep the range open and shield itself behind its own hip-high stone wall of a back. When pressed it swings its pitch-slick arms in a clumsy sweep and shoves its way free to re-open the distance, refusing to be cornered and fighting to the death only once its stock of fire is spent.
[concept] lore: A siege-giant bred by mountain warlords to burn out walled holds from beyond bowshot, the catapult ogre lives for the shrieking arc of its pots and the wall of flame that tells it the work is done.
[reskin] donor: skirmisher-8-hurler -> CR 6 (invented — no printed peer)
[reskin] seats: action <- "high-arc bombardment over cover" | trait <- "stone-thick ogre frame"
[reskin] [path] decides: homebrew (the matcher would have said twist Ogre)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the ogre" — the call's own answer (kind), built from the name
[reskin] inline form: "the ogre" — the model's own reading of the name
[reskin] returning clause dropped: "Clay Pot" throws a clay pot — the call did not say this projectile is a single object the creature must recover (projectile_supply: ambient), so it stays where it lands; print writes a returning weapon 4 times in 1291 rows
[reskin] the sheet's declared ask: burst — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "catapult ogre" -> has (descriptive), head | "lobs burning pitch" -> has (mechanical) [asked: save_area] [askMechanic: burst]
[reskin] open asks handed to the idea call: "lobs burning pitch" [burst] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The ogre's practiced arm lets it lob a pot of burning pitch in a high " answers the GM's "lobs burning pitch"
[reskin] idea unanchored: trait — "Its squat, stone-thick frame is a hip-high wall of its own: while the " names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 29 of 29 answered; not true of this body: snare, shield-bash, snare-bolt, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "lobs burning pitch", so role and style do not filter the menu (legality still does); 12 template(s) offered
[reskin] menu pruned: action — thrown-burst-seed, push-prone (the sheet cannot render them)
[reskin] signature idea (action): "The ogre's practiced arm lets it lob a pot of burning pitch in a high arc so it shatters over the cover its foes are hiding behind. The pot is lobbed at a point it can see overhead rather than at a creature, and any creature in the space beneath the burst that has cover must still make a Dexterity saving throw or take Fire damage and have the Prone condition as the slick fire pours down over its s" [action/save/damage] [family: nova] — menu: condition-payoff, throw-retrieve, sensory-strike, disarm, exploiter, execute, pacify, escalating-dread, terror-pulse, slow-bolt, curse-debt, reveal (+ shelf: lure, delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, rampage, lay-on-hands, snap-shot, riposte, answering-strike, stunning-strike, charge-push, pounce, isolation, bolt-mark, bolt-restrain, bolt-drag, charge)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — burst: throw-retrieve
[reskin] menu ordered by the idea's stamps: action — idea fires save/does damage; leading: throw-retrieve (always/damage), condition-payoff (save/damage), execute (save/damage)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=save_area
[reskin] word match declined by the call: throw-retrieve, condition-payoff, curse-debt, exploiter — the key word does not mean the mechanic here
[reskin] authored row answers the GM: action — "Overhead Lob" was written for "lobs burning pitch", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("hits a point in the air and bursts over creatures beneath cover, impos") and wrote an action instead: "Overhead Lob" -> Actions. *Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* 13 (3d8) Fire damage, and the target has the Pr
[reskin] authored row numbers: "Overhead Lob" — the call declared (unanswered) number(s) promised
[reskin] value check: "Overhead Lob" EV 8.7 vs floor 5.7 (one attack of 3) — worth the trade
[reskin] signature authored: no template — the seat wrote it -> Actions/"Overhead Lob" ("The ogre's practiced arm lets it lob a pot of burning pitch in a high arc so it shatters over the cover its foes are hiding behind. The pot is lobbed at a point [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Its squat, stone-thick frame is a hip-high wall of its own: while the ogre has not moved since the end of its last turn, ranged attacks against it are made with Disadvantage, and it ignores being pushed or knocked Prone by anything smaller than a Large creature. Once it waddles a few paces, the wall opens and it is exposed again." [trait/always/defense] [family: sentinel] — menu: adhesive, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] keys would have bound: trait — adhesive (pitch)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=save_area
[reskin] free signature row: trait — "guarded-stance" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "stone-thick ogre frame" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] free signature row: "Stone-Thick Frame" — the trait seat cannot quote the GM, but the call names the element it expresses: "stone-thick ogre frame". Earns no clause credit; the homebrew path allows 1 and this is number 2
[reskin] signature template (trait): guarded-stance -> Traits/"Stone-Thick Frame" ("While the creature isn't Bloodied, melee attack rolls against it are made with D [shape fit, no verb match]")
[reskin] weapons answered: Pitch-Slick Arm = none; Clay Pot = none; Pitch Shards = none; Ogre's Shove = none
[reskin] weapon table: "Clay Pot" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] chassis nova: "Pitch Shards (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] defenses by material: a pitch body is vulnerable to Fire and never resists, absorbs, or ignores it (named by the GM's words, the call having named no material the table knows) — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] element immunity withheld: Fire — the body's material is vulnerable to it
[reskin] resistances derived: Fire
[reskin] name-canon stands down: the path answered homebrew on "catapult ogre that lobs burning pitch" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Overhead Lob.
[reskin] free-row budget by card size: CR 6 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Stone-Thick Frame" [trait/always/defense]
[reskin] lint: 0 findings
[reskin] element expressed: Stone-Thick Frame carries "stone-thick ogre frame" — "melee attack rolls against it are made with Disadvantage"
audit finding below confidence gate: Clay Pot Clay Pot is a pure 1d8 Fire ranged attack with no rider or trait interaction, making it strictly a downgrade from Pitch-Slick Arm in every Multiattack combination.
[reskin] audit: [Pitch-Slick Arm: The name promises a slick, clingi…fire payload. (about: "plus 4 (1d8) Fire damage"), Pitch Shards (Recharge 5-6): The entry is an area …s Large or smaller, it has the Prone condition."), Overhead Lob: Overhead Lob is an attack-roll-style…ing Throw*: DC 15, one creature within 30 feet."), Overhead Lob: Overhead Lob costs a full attack slo…damage, and the target has the Prone condition.")]
[reskin] audit rename: "Pitch-Slick Arm" -> "Pitch Arm"
[reskin] audit finding on the body: Actions/"Pitch Shards" [chassis] — The entry is an area Sphere effect but refers to 'the target' as if single-target, and the. a catalog row: the fix belongs in the donor, once, for every creature on this body
[reskin] row repair: "Overhead Lob" [authored] — the audit faults it (Overhead Lob is an attack-roll-style throw with no attack roll and no … (about: "*Dexterity Saving Throw*: DC 15, one creature within 30 feet.") | Overhead Lob costs a full attack slot but deals less than a single Cla… (about: "13 (3d8) Fire damage, and the target has the Prone condition.")); re-authored through the forms rather than evicted (the owner's ruling: a flagged row is repaired)
[reskin] free row repaired: "Overhead Lob": "*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure" -> "*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* 13 (3d8) Fire dam"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Pitchcatapult Ogre" — donor skirmisher-8-hurler, CR 6
[reskin] 2014 conversion: one lint-gated call — both printings saved
```

---

## 04. Ashpit Retiarius — CR 4

**Input:** `net-and-trident arena fighter who pins people | role: controller`
**Donor:** skirmisher-8-hurler -> CR 4 (invented — no printed peer)
**Signature:** library · **elapsed** 32s

### Block
```
Ashpit Retiarius

Medium Humanoid, Neutral

AC 16
Initiative +4 (14)

HP 75 (10d8 + 30)

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
18
+4
+6
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

Skills Perception +4, Stealth +6

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Pack Tactics. The retiarius has Advantage on an attack roll against a target if at least one of the retiarius's allies is within 5 feet of that target and the ally doesn't have the Incapacitated condition.

Ring Footwork. The retiarius ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The retiarius makes two Trident attacks. It can replace one attack with a use of Net Reel.

Trident. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 20/60 ft. 13 (2d8 + 4) Piercing damage, and the target is subjected to the following effect. Strength Saving Throw: DC 14. Failure: The target has the Prone condition.

Cast Net (Recharge 5-6). The retiarius hurls its weighted net at a point it can see within 90 feet. Dexterity Saving Throw: DC 13, each creature in a 5-foot-radius Sphere centered on that point. Failure: 24 (7d6) Bludgeoning damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Net Reel. Strength Saving Throw: DC 13, one creature within 30 feet. Failure: The target is pulled up to 20 feet straight toward the retiarius by weighted net and has the Grappled condition (escape DC 14).

Bonus Actions

Fleet Agility. The retiarius takes the Dash or Disengage action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

### Trace
```
[path] homebrew — "net-and-trident arena fighter who pins people" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon, snare — casts: the call reads no worked magic here | hold_shape: reach on the GM's own words "net-and-trident arena fighter who pins p" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-hurler: ✓ ("net-and-trident arena fighter") | skirmisher-hurler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/grasping mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon, snare
[concept] signature elements: hurled weighted net pinning the target [object] | three-tined trident thrusts at a snared foe [object] | ring-circling showman who fights to the death [behavior]
[concept] identity: The net-fighter opens by hurling his weighted arena net to tangle a foe's arms and legs, then closes to punish the pinned target with a three-tined trident, disengaging and circling to re-throw whenever the net slips. Every round he keeps one foe snared while probing with the trident at reach, and under pressure he fights to the death — an arena fighter who knows the crowd only cheers a finish.
[concept] lore: Forged in the blood-sand pits of a fallen arena, this fighter still performs for a crowd that died long ago, netting and tridenting any who wander onto the old floor as if the games had never ended.
[reskin] donor: skirmisher-8-hurler -> CR 4 (invented — no printed peer)
[reskin] seats: action <- "ring-circling showman who fights to the death" | trait <- "three-tined trident thrusts at a snared foe"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] named parts: Trident (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] ranged row off: "Weighted Net" leaves — the thrown part is the ranged row
[reskin] features: Topple on Trident — the feature table, no call
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the retiarius" — the call's own answer (kind), built from the name
[reskin] inline form: "the retiarius" — the model's own reading of the name
[reskin] final price: the chassis's Multiattack: the round ran 22 against the card's 30 — the attack rows re-solve at 136% (2 attacks on an authored sheet, under the card)
[reskin] the sheet's declared ask: snare — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "net-and-trident arena fighter" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "net-and-trident arena fighter" -> has (mechanical) [asked: at_will/attack] | "pins people" -> has (mechanical) [asked: on_hit/condition] [askMechanic: snare]
[reskin] open asks handed to the idea call: "pins people" [snare]
[reskin] idea anchored: action — "The retiarius casts its net and then reels — a creature Restrained by " answers the GM's "pins people"
[reskin] idea unanchored: trait — "Net-craft is in the hands, not the net: the retiarius can re-throw its" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 23 of 23 answered; not true of this body: coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst
[reskin] menu: taste stands down — action answers the GM's "pins people", so role and style do not filter the menu (legality still does); 16 template(s) offered
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The retiarius casts its net and then reels — a creature Restrained by its net can be hauled toward the retiarius on the retiarius's turn, dragged across the blood-sand into trident reach. Each pull leaves the snared foe Prone at the retiarius's feet if it cannot keep its footing." [action/save/movement] [family: drag] — menu: snare, condition-payoff, lure, snare-bolt, sensory-strike, disarm, exploiter, execute, hook-drag, obstacle-pull, pacify, escalating-dread, terror-pulse, slow-bolt, curse-debt, reveal (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, rampage, lay-on-hands, bolt-mark, bolt-restrain, bolt-drag)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — snare: snare, snare-bolt
[reskin] menu ordered by the idea's stamps: action — idea fires save/does movement; leading: snare (save/condition), snare-bolt (save/condition), disarm (save/movement)
[reskin] keys would have bound: action — snare-bolt, snare, bolt-restrain (net, pins)
[reskin] classification handed to the fit call: mechanic=thrown-weapon, snare shape=attack when=at_will
[reskin] word match declined by the call: snare, snare-bolt, disarm, obstacle-pull, slow-bolt, condition-payoff, bolt-drag — the key word does not mean the mechanic here
[reskin] seat authoring refused: action — the authored row imposes Prone, which two rows on this sheet already impose, and no printed block imposes one condition three ways (0 of 329); the nearest template stands in
[reskin] closest accepted: action — the call refused every template but named "hook-drag" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: pulls a snared or restrained creature toward the thrower and leaves it prone at )
[reskin] value check: "Net Reel" EV 5.5 vs floor 5.2 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Net Reel" ("the idea wants a throw that snags a foe and then hauls it in; no offered row ree [verb: drag:idea, reel:idea, pull:idea, haul:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Net-craft is in the hands, not the net: the retiarius can re-throw its weighted net a second time before the old one returns, and while a foe is caught in it the retiarius reads every twitch of the cords — the Restrained creature cannot hide from its eye, and the retiarius knows exactly which way it will lurch before it moves." [trait/always/condition] [family: mark] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (always/condition): phobia, berserk, kill-denial; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), berserk (always/condition), kill-denial (always/condition)
[reskin] classification handed to the fit call: mechanic=thrown-weapon, snare shape=attack when=at_will
[reskin] word match declined by the call: phobia, berserk, kill-denial, bloodied-fury, blood-frenzy, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, assassinate, truth-aura, fear-aura — the key word does not mean the mechanic here
[reskin] seat answered, but: the call said "Net-craft is in the hands, not the net: the retiarius can re-throw its weighted net a second time before the old one ret" is carried by "Cord Reading", and no such row is on this sheet — the clause stays open
[reskin] seat authoring refused: trait — the authored row needs its target to have Restrained and no row on this sheet imposes it, so its trigger could never fire (the Chalk-Hound's Daubing Cling, forty #2); the nearest template stands in
[reskin] closest accepted: trait — the call refused every template but named "pack-tactics" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: marks a creature caught in its net so the retiarius has Advantage attacking it)
[reskin] pick kept on the GM's own words: trait — "pack-tactics" has no key-table verb, but the call quotes "net and trident arena fighter who pins people" from the description
[reskin] signature template (trait): pack-tactics -> Traits/"Net Reader" ("The idea is about pinning a foe with a thrown net and reading its twitches, but  [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Net Reader" -> "Pack Tactics" — this row is pack-tactics and does what every pack-tactics row does; a bespoke name would promise more than the text delivers
[reskin] repair: 1 clause(s) with no row — "pins people"; one targeted call with the sheet as context
[reskin] authored trait refused: "Weighted Pin" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence; the clause folds to description
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [{"clause":"pins people","row":"Net Reel"}], unplaced ["description:pins people"]
[reskin] clause already answered: "pins people" is carried by "Net Reel" in different words — the call read the sheet and declined to answer it twice
[reskin] clause answered in prose: "pins people" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Trident = trident; Weighted Net = none; Cast Net = none; Dragnet Tangle = none
[reskin] chassis nova: "Cast Net (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "net-and-trident arena fighter who pins p" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Net Reel.
[reskin] free-row budget by card size: CR 4 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] payoff left unenabled: "Net Reel" requires Restrained and no body-part melee row on this sheet can carry the rider
[reskin] ask vs row ok: "net-and-trident arena fighter" -> "Trident" — trigger at_will
[reskin] ask vs row MISMATCH: "pins people" -> "Net Reel" — trigger: asked on_hit, row reads at_will
[reskin] save re-derived after a retype: Actions/Trident — a Constitution save for a condition the row IMPOSES, which calls for Strength or Dexterity (A2: a condition the row merely requires does not pick the stat)
[reskin] lint: 0 findings
audit finding below confidence gate: Pack Tactics Pack Tactics rewards a retiarius fighting shoulder-to-shoulder with allies, but the creature's kit (90-foot Cast Net, 30-foot Net Reel, ranged Trident, Fleet Agility kiting) is built for a solo skirmisher that uses the net to hold enemies at distance; the trait contradicts how the block is actually played.
[reskin] audit: [Net Reel: Net Reel imposes Grappled with an escape… and has the Grappled condition (escape DC 13)."), Trident: A trident hit forcing a Strength save aga… *Failure:* The target has the Prone condition.")]
[reskin] audit finding on the body: Actions/"Net Reel" [hook-drag] — Net Reel imposes Grappled with an escape DC but never states a range or that the net persi. a catalog row: the fix belongs in the template, once, for every creature on this body
[reskin] row repair not offered: Actions/"Trident" is an attack row, and this path carries no attack form — the audit's fault stands on the sheet (A trident hit forcing a Strength save against Prone on every)
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] pulls a snared or restrained creature toward the thrower and leaves it prone at its feet — "The retiarius casts its net and then reels — a creature Restrained by its net can be hauled toward the retiarius on the retiarius's turn, dragged across the blood-sand into trident reach. Each pull leaves the snared foe Prone at the retiarius's feet if it cannot keep its footing." — Ashpit Retiarius [seat: action [action/save/movement]] (closest offered: hook-drag) [effect: movement] [menu: snare snare-bolt disarm hook-drag obstacle-pull slow-bolt condition-payoff lure sensory-strike exploiter execute pacify escalating-dread terror-pulse curse-debt reveal bolt-drag rampage] [same-cell unoffered: reel pull-through aggro-curse] [same-seat rejected: swallow:deny-type trample:style leap:condition-three-ways thrown-burst:cr-range gaze-single:style reel:condition-three-ways seal:role shield-bash:condition-three-ways active-toll:role pull-through:role random-ray:body-verdict ground-burst:nova-taken spew:body-verdict burrow-ambush:movement push-prone:role herd:role thrown-burst-seed:denied-clause drain:role wind-up:role blighted-ground:role] [landed: hook-drag]
[reskin] [gap] marks a creature caught in its net so the retiarius has Advantage attacking it — "Net-craft is in the hands, not the net: the retiarius can re-throw its weighted net a second time before the old one returns, and while a foe is caught in it the retiarius reads every twitch of the cords — the Restrained creature cannot hide from its eye, and the retiarius knows exactly which way it will lurch before it moves." — Ashpit Retiarius [seat: trait [trait/always/condition]] (closest offered: pack-tactics) [effect: condition] [menu: phobia berserk kill-denial bloodied-fury blood-frenzy pack-tactics shielded-mind evasion relentless-pursuit bound relic-object guarded-stance undead-fortitude assassinate truth-aura fear-aura] [same-cell unoffered: adhesive faultless-tracker marking-light] [same-seat rejected: false-appearance:body-verdict adhesive:body-verdict spider-climb:body-verdict terrain-walk:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict death-restoration:cr-range uncanny-sense:body-verdict earth-glide:movement tunneler:movement marking-light:body-verdict sealed-body:role mimicry:body-verdict blurred-form:body-verdict death-burst:body-verdict] [landed: pack-tactics]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 2 · path homebrew
[reskin] one mechanic, at most twice: "Net Reel" keeps its Prone rider — the strip has no pattern for how this row words it (recorded as shed_blocked): *Strength Saving Throw:* DC 13, one creature within 30 feet. *Failure:* The target is pulled up to 20 feet straight towa
[reskin] record reconciled: "Net Reel" no longer imposes Prone — the clause left, so the record goes with it
[reskin] escape dc: Net Reel → DC 14 (8 + PB + STR; a late row wore another number)
[reskin] done: "Ashpit Retiarius" — donor skirmisher-8-hurler, CR 4
```

---

## 05. Rafter Broodmother — CR 5

**Input:** `giant spider that webs up the whole room | role: controller`
**Donor:** brute-5 -> CR 5
**Signature:** library · **elapsed** 31s

### Block
```
Rafter Broodmother
Large beast, unaligned
Armor Class

13

Hit Points: 

97 (15d10 + 15)

Speed: 

30 ft., climb 30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

16 (+3)

	

12 (+1)

	

2 (-4)

	

11 (+0)

	

4 (-3)

Skills: 

Athletics +6, Perception +3

Saving Throws: 

STR +6, CON +4

Senses: 

darkvision 60 ft., tremorsense 30 ft., passive Perception 13

Languages: 

None

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Silk Tread.While moving through difficult terrain made of webbing or silk, the broodmother ignores that difficult terrain.
Spider Climb.The broodmother can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Web Walker.The broodmother ignores movement restrictions caused by webs, and it knows the location of any other creature in contact with the same web.

Actions
Multiattack: The broodmother makes two Bite attacks.
Bite: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage plus 7 (2d6) poison damage.
Silk Curtain (1/Day): One Large or smaller creature the broodmother can see within 60 feet must make a DC 14 Dexterity saving throw. On a failed save, the target is caught in web and is restrained until the web is destroyed (AC 10; HP 10; Vulnerability to fire damage; Immunity to Poison and psychic damage).
Web (Recharge 5-6): One creature the broodmother can see within 60 feet must make a DC 14 Dexterity saving throw. On a failed save, the target is restrained until the web is destroyed (AC 10; HP 5; Vulnerability to fire damage; Immunity to Poison and psychic damage).
```

### Trace
```
[path] twist — Giant Spider (is) — "giant spider" (call)
[route] brute-grappler type=Beast mechanics=grapple, engulf, snare — casts: the call reads no worked magic here | hold_shape: reach on the GM's own words "webs up the whole room" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("webs up the whole room") | brute-grappler: no line key in the words — the model's read of its quote
[concept] hints: spider→canon ✓ ("a giant spider that webs")
[concept] resolve: archetype=brute type=Beast themes=bestial/grasping mind=bestial style=grappler energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf, snare
[concept] signature elements: webbing every surface of the room into a trap [behavior] | cocooning and lingering-binding prey in silk [behavior] | a solid chitinous body with poisoned bite [body]
[concept] identity: The webspinner opens a fight by seeding the room with anchoring strands before prey is even aware, then closes to seize and wrap whatever it has already hobbled. Each round it alternates between hauling new silk across escape routes and lunging to bind a limb or torso in a tightening cocoon, keeping the fight in spaces it has already made its own. Cornered or bloodied, it does not flee — it cuts its own anchor lines and drops the ceiling webs onto whatever is beneath, treating its whole web as a weapon it can spend. Its favourite tactic is to hang victims from the rafters, then snip the line and let the fall do the rest.
[concept] lore: This giant arachnid hatches in the rafters of sealed cellars and abandoned halls, and it spends its life turning every inch of a room into snare so that nothing — prey, rival, or intruder — can leave without asking its permission.
[reskin] print canon route: the Giant Spider's body outranks the grappler seat — no verb in the words names it; the plain brute line
[reskin] print canon array: STR 16, DEX 16, CON 12, INT 2, WIS 11, CHA 4 — the Giant Spider's, STR fitted to +6
[reskin] donor: brute-5 -> CR 5
[reskin] seats: action <- "webbing every surface of the room into a trap" | trait <- "a solid chitinous body with poisoned bite"
[reskin] [path] decides: twist on the Giant Spider (the matcher agrees)
[reskin] print canon: "giant spider that webs up the whole room" heads on the Giant Spider — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the broodmother" — the call's own answer (kind), built from the name; the rules would have said "Rafter"
[reskin] inline on kit rows: "Rafter" -> "the broodmother"
[reskin] inline form: "the broodmother" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: snare — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "webs up the whole room" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "webs up the whole room" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "giant spider" -> has (descriptive), head | "webs up the whole room" -> has (mechanical) [asked: at_will/at_will/save_single] [askMechanic: snare]
[reskin] open asks handed to the idea call: "webs up the whole room" [snare]
[reskin] idea anchored: action — "The broodmother drags a curtain of silk across every surface within re" answers the GM's "webs up the whole room"
[reskin] idea unanchored: trait — "The broodmother walks on its own silk as easily as on stone, ignoring " names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: shield-bash, active-toll, random-ray, herd, drain, shell-withdraw, rally, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, terrain-walk, aberrant-ground, faultless-tracker, energy-aura, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, life-drain
[reskin] menu: taste stands down — action answers the GM's "webs up the whole room", so role and style do not filter the menu (legality still does); 23 template(s) offered
[reskin] signature idea (action): "The broodmother drags a curtain of silk across every surface within reach, anchoring lines overhead and along the floor; each creature of its choice in that area must succeed on a Dexterity saving throw or become Restrained by the webbing until it escapes or the broodmother's web is torn down." [action/save/condition] [family: zone] — menu: trample, leap, hook-drag, ground-burst, spew, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, snare, reel, execute, lure, pull-through, obstacle-pull, pacify, snare-bolt, slow-bolt, sensory-strike, disarm, curse-debt, reveal (+ shelf: delayed-brand, rampage, second-wind, aggro-curse, self-invisibility, focus, coating, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge, isolation)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] declared mechanic leads the menu: action — snare: snare, snare-bolt
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: snare (save/condition), snare-bolt (save/condition), escalating-dread (save/condition)
[reskin] keys would have bound: action — snare-bolt, snare (web)
[reskin] classification handed to the fit call: mechanic=grapple, engulf, snare shape=save_single when=at_will often=at_will
[reskin] word match declined by the call: snare-bolt, hook-drag, obstacle-pull — the key word does not mean the mechanic here
[reskin] signature template: snare -> Actions/"Silk Curtain (Recharge 5-6)" ("each creature of its choice in that area must succeed on a Dexterity saving thro [verb: web:concept, silk:idea]")
[reskin] keys spent by the action: web
[reskin] signature idea (trait): "The broodmother walks on its own silk as easily as on stone, ignoring webbing and …-covered ground as difficult terrain and able to hang inverted from a single strand at will." [trait/always/movement] [family: breach] — menu: adhesive, spider-climb, phobia, web-walker, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), web-walker (always/movement), relentless-pursuit (always/movement)
[reskin] keys would have bound: trait — web-walker (web, webs, spider)
[reskin] classification handed to the fit call: mechanic=grapple, engulf, snare shape=save_single when=at_will often=at_will
[reskin] word match declined by the call: spider-climb, web-walker, relentless-pursuit, bound — the key word does not mean the mechanic here
[reskin] seat answered, but: the call said "The broodmother walks on its own silk as easily as on stone, ignoring webbing and web-covered ground as difficult terrai" is carried by "Silk Tread", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("coats the area in web so creatures entering it are restrained") and wrote a trait instead: "Silk Tread" -> Traits. Rafter ignores difficult terrain made of webbing or silk, and while touching any strand of its silk it can hang inverted
[reskin] authored row numbers: "Silk Tread" — the call declared 0 number(s) promised
[reskin] seat takes its clause: "Silk Tread" is HANDED "webs up the whole room" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Silk Tread" ("The broodmother walks on its own silk as easily as on stone, ignoring webbing and …-covered ground as difficult terrain and able to hang inverted from a single  [authored: the catalog held no shape for it]")
[reskin] weapons answered: Fangs = none
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] print canon speed: 40 ft. -> 30 ft. — the Giant Spider's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 30 ft. — the Giant Spider's own
[reskin] print canon attack: "Fangs" -> "Bite" — the Giant Spider's own row
[reskin] languages held: None stands — INT 2 on a Beast speaks nothing, whatever the mind read said
[reskin] name-canon trait stamped: Spider Climb (the name says so; print says what it does)
[reskin] print canon trait: Spider Climb — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Web Walker — "giant spider that webs up the whole room" is the Giant Spider (print's own row)
[reskin] print canon row: Actions/Web (Recharge 5-6) — the Giant Spider's own
[reskin] one recharge die: Actions/"Silk Curtain (Recharge 5-6)" becomes "Silk Curtain (1/Day)" — the Giant Spider already fields a Recharge row, and 0 of print's 329 blocks field two
[reskin] free-row budget by card size: CR 5 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Silk Tread" [no template]
[reskin] row binds its clause: "Silk Curtain" answers "webs up the whole room" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "webs up the whole room" -> "Silk Curtain" — limit: asked at_will, row reads per_day
[reskin] lint: spell-name-collision: "Web" is an SRD spell name on a non-spell entry — rename it
[reskin] element expressed: Silk Tread carries "webbing every surface of the room into a trap" — "Rafter ignores difficult terrain made of webbing or silk, and while touching any"
audit finding below confidence gate: Web Web lacks the 'Large or smaller' restriction Silk Curtain carries, but nothing in the block establishes a web that can restrain a larger target than its own silk-curtain; the two web effects are inconsistent about what they can catch.
[reskin] audit: [Silk Tread: The trait refers to the creature as 'R…nores difficult terrain made of webbing or silk"), Silk Tread: The clause grants a climbing/hanging c… hang inverted or climb without using its hands"), Silk Curtain (1/Day): The web Restrained by Silk C…damage; Immunity to Poison and Psychic damage).")]
[reskin] audit finding on the body: Actions/"Silk Curtain" [snare] — The web Restrained by Silk Curtain is described as being destroyed but, unlike Web, no loc. a catalog row: the fix belongs in the template, once, for every creature on this body
[reskin] row repair: "Silk Tread" [free row] — the audit faults it (The trait refers to the creature as 'Rafter', which is not this statbl… (about: "Rafter ignores difficult terrain made of webbing or silk") | The clause grants a climbing/hanging capacity the block gives no way t… (about: "while touching any strand of its silk it can hang inverted or climb without using its hands")); re-authored through the forms rather than evicted (the owner's ruling: a flagged row is repaired)
[reskin] free row repaired: "Silk Tread": "Rafter ignores difficult terrain made of webbing or silk, and while to" -> "While moving through difficult terrain made of webbing or silk, the broodmother ignores th"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause unresolved: "Silk Tread" carries "The broodmother walks on its own silk as easily as on st", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Rafter Broodmother" — donor brute-5, CR 5
[reskin] 2014 conversion: one lint-gated call — both printings saved
```

---

## 06. Sister Maudra — CR 7

**Input:** `name: Sister Maudra | cleric of the drowned god | role: controller`
**Donor:** caster-6 -> CR 7
**Signature:** library · **elapsed** 30s

### Block
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

Divine Aid (3/Day) (Bonus Action).Maudra casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Maudra makes three Radiant Flame attacks. It can replace one attack with a use of Chilling Regard.
Radiant Flame: Ranged Weapon Attack: +6 to hit, range 120 ft., one target. Hit: 17 (4d6 + 3) radiant damage.
Spellcasting: Maudra casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14): - At will: Light, Thaumaturgy, Detect Magic
1/day each: Spirit Guardians, Hold Person
Chilling Regard: One creature within 60 feet must succeed on a DC 15 Constitution saving throw or take 17 (5d6) cold damage.
```

### Trace
```
[path] class_npc — class cleric — "Sister" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "cleric of the drowned god" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("cleric of the drowned god") | caster-warpriest: key "cleric" (class noun)
[concept] name: "Sister Maudra" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: warpriest→style ✓ ("the concept names her a cleric outright")
[concept] resolve: archetype=caster type=Humanoid themes=aquatic/grave mind=sapient style=warpriest energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Sister Maudra"
[concept] mechanics: none claimed
[concept] signature elements: brine-soaked iron mace [object] | drowning benediction that follows enemies [behavior] | pressure of the drowned god's regard [aura]
[concept] identity: Sister Maudra wades into battle behind a wall of brine-soaked iron, her mace swinging in slow, deliberate arcs that leave trailing ribbons of saltwater. Each round she marks a new target with a dripping benediction, forcing enemies to choose between closing on her armored bulk and choking on the cold pressure of her god's regard. She never breaks; bloodied only makes her sermons louder, and she fights to the last breath, certain the drowned god will simply take her home.
[concept] lore: Sister Maudra was the last survivor of a cloister swallowed by the tide, and she now walks the shore roads looking for converts—or for anyone the drowned god might accept as a substitute offering.
[reskin] energy withheld: Cold on a Humanoid with no Cold in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the cleric stands on the Priest — the class's own print block, nearest CR 7
[reskin] print canon route: the Priest's body outranks the warpriest seat — no verb in the words names it; the plain caster line
[reskin] print canon casting stat: the Priest casts with WIS; the caster line's INT striker reseats there
[reskin] print canon array: STR 16, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, WIS fitted to +6
[reskin] donor: caster-6 -> CR 7
[reskin] seats: action <- "drowning benediction that follows enemies" | trait <- "brine-soaked iron mace"
[reskin] [path] decides: class_npc on the Priest · class cleric (the matcher would have said twist Priest)
[reskin] print canon: "Sister Maudra — cleric of the drowned god" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: cleric — "Sister": Divine Aid (3/Day) (Priest/Divine Aid)
[reskin] proper noun: "Sister Maudra" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Maudra" — the call's own answer (person), built from the name; the rules would have said "the sister"
[reskin] inline on kit rows: "the sister" -> "Maudra"
[reskin] inline form: "Maudra" — the model's own reading of the name
[reskin] control spell gated to daily — Hold Person (level 2 control at will is print's CR 13+ shape; at CR 7 it is 1/Day)
[reskin] daily spell dropped — Blight (36 avg vs 15 per-hit; print's only daily damage spell is the Adult Red's Fireball at ~1.1x)
[reskin] spell DC coherence: Intelligence 13 -> 18 so DC 15 derives
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Sister Maudra — cleric of the drowned god" -> has (mechanical) [asked: condition] [askMechanic: curse]
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "Maudra flings a bead of brine at one creature she can see, which cling" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Maudra's mace is thick with accumulated brine and iron scale; when she" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 34 of 34 answered; not true of this body: snare, zone, seal, active-toll, random-ray, spew, snare-bolt, drain, zone-seed, blighted-ground, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, spider-climb, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Maudra flings a bead of brine at one creature she can see, which clings to it as a glistening benediction. Until the end of her next turn, the target is marked, and whenever it moves, the brine floods its lungs; it must succeed on a Constitution saving throw or take Cold damage and have its Speed reduced to 0 until the start of its next turn, as the drowned god's regard fills its chest with seawat" [action/save/condition] [family: mark] — menu: thrown-burst, gaze-single, execute, wail, lure, ground-burst, pacify, escalating-dread, slow-bolt, sensory-strike, herd, thrown-burst-seed, curse-debt, reveal, wind-up, terror-pulse, push-prone (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, bolt-restrain, bolt-drag, bolt-mark)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: gaze-single (save/condition), lure (save/condition), pacify (save/condition)
[reskin] classification handed to the fit call: shape=condition
[reskin] word match declined by the call: gaze-single, lure, pacify, escalating-dread, sensory-strike, slow-bolt, bolt-mark — the key word does not mean the mechanic here
[reskin] seat answered, but: the call said "Maudra flings a bead of brine at one creature she can see, which clings to it as a glistening benediction. Until the end" is carried by "Seawater Regard", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("a brand that only triggers damage and a speed lock when the marked tar") and wrote an action instead: "Seawater Regard" -> Actions. *Constitution Saving Throw*: DC 15, one creature within 60 feet. *Failure:* 17 (5d6) Cold damage.
[reskin] authored row numbers: "Seawater Regard" — the call declared (unanswered) number(s) promised
[reskin] free signature row: "Seawater Regard" — a print body takes only what the user's words ask, but the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit; the budget settles on the finished sheet
[reskin] signature authored: no template — the seat wrote it -> Actions/"Seawater Regard" ("Maudra flings a bead of brine at one creature she can see, which clings to it as a glistening benediction. Until the end of her next turn, the target is marked, [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Maudra's mace is thick with accumulated brine and iron scale; when she hits with it, saltwater shears off the weapon and clings to the wound, and the target must succeed on a Constitution saving throw or be Poisoned until the end of its next turn as the brine seeps into its lungs." [trait/always/condition] [family: body-reaction] — menu: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, berserk
[reskin] composed candidates on the menu: trait — composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened (the body-reaction family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), berserk (always/condition), terrain-walk (always/movement)
[reskin] classification handed to the fit call: shape=condition
[reskin] word match declined by the call: composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t2:poisoned, phobia, berserk — the key word does not mean the mechanic here
[reskin] seat answered, but: the call said "Maudra's mace is thick with accumulated brine and iron scale; when she hits with it, saltwater shears off the weapon and" is carried by "Brine-Laden Strikes", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Maudra's mace is thick with accumulated brine and iron scale; when she" and wrote no row of that kind (refused: "Brine-Laden Strikes" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description); the nearest template stands in
[reskin] closest refused — subject flipped: trait — the call named "composed:body-reaction:condition:t0:pois" nearest and judged its subject FLIPPED against the clause (save-gated Poisoned rider on the creature's own melee hit, not on bein); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Maudra's mace is thick with accumulated brine and iron scale; when she hits with it, saltwater shears off the weapon and clings to the wound, and the target must succeed on a Constitution saving throw or be Poisoned until the end of its next turn as the brine seeps into its lungs." [trait/always/condition] — the model found no template that holds it (offered: phobia, berserk, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened)
[reskin] weapons answered: Mace = mace
[reskin] weapon dice follow the weapon: "Mace" is a mace (d6) — "16 (3d8 + 3)" becomes "17 (4d6 + 3)", print's rule of keeping the die and scaling the count
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Priest's own type stands
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Mace — a chassis row already carries the Priest's own row name, so it IS that row: claimed as print's rather than skipped (it would otherwise leave as filler on a closed path)
[reskin] print canon attack: "Mace" -> "Radiant Flame" — the Priest's own ranged row
[reskin] resistance withheld: Cold — the energy was withheld; a name is not a warrant
[reskin] print canon: chassis row leaves — Reactions/"Protective Magic (3/Day)" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon: spell list topped up — the Priest's list is written for CR 2 and this sheet is CR 7; print's own spells stand and the chassis's add Detect Magic, Hold Person to reach print's dedicated-caster size at this CR (5 at will, 4 daily)
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] multiattack replacement clause: It can replace one attack with a use of Seawater Regard.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Seawater Regard" [no template]
[reskin] lint: 0 findings
[reskin] element claim revoked: "Seawater Regard" claims "drowning benediction that follows enemies" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Seawater Regard")
[reskin] audit: [Seawater Regard: The name promises a drowning or s…ithin 60 feet. *Failure:* 17 (5d6) Cold damage.")]
[reskin] audit rename: "Seawater Regard" -> "Chilling Regard"
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 14 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] clause unresolved: "Chilling Regard" carries "Maudra flings a bead of brine at one creature she can se", which matches no clause on the sheet — no coverage credit by id
[reskin] clause id by substring: "Divine Aid (3/Day)" carries "Sister" which is not a whole clause — the seat surgery cut it; resolved to cl_15iahn1
[reskin] [gap] save-gated Poisoned rider on the creature's own melee hit, not on being hit — "Maudra's mace is thick with accumulated brine and iron scale; when she hits with it, saltwater shears off the weapon and clings to the wound, and the target must succeed on a Constitution saving throw or be Poisoned until the end of its next turn as the brine seeps into its lungs." — Sister Maudra [seat: trait [trait/always/condition]] (closest offered: composed:body-reaction:condition:t0:pois — NOT ON THE MENU) [effect: condition] [menu: phobia berserk terrain-walk bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind relentless-pursuit bound relic-object undead-fortitude truth-aura fear-aura composed:body-reaction:condition:t0:poisoned composed:body-reaction:condition:t0:deafened composed:body-reaction:condition:t1:poisoned composed:body-reaction:condition:t1:deafened composed:body-reaction:condition:t2:poisoned composed:body-reaction:condition:t2:deafened] [same-cell unoffered: adhesive faultless-tracker marking-light kill-denial] [same-seat rejected: false-appearance:body-verdict adhesive:role spider-climb:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement evasion:role marking-light:body-verdict sealed-body:body-verdict guarded-stance:role mimicry:body-verdict assassinate:role blurred-form:body-verdict death-burst:body-verdict kill-denial:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] done: "Sister Maudra" — donor caster-6, CR 7
[reskin] 2014 conversion: one lint-gated call — both printings saved
```

---

## 07. Skyburner — CR 8

**Input:** `storm sorcerer who rains lightning | role: artillery`
**Donor:** caster-6 -> CR 8
**Signature:** library · **elapsed** 25s

### Block
```
Skyburner

Medium Humanoid, Neutral

AC 16
Initiative +2 (12)

HP 117 (26d8)

Speed 30 ft.

MOD
SAVE
STR
9
-1
-1
INT
20
+5
+8
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

Skills Arcana +8, Perception +4

Resistances Lightning

Senses Passive Perception 14

Languages Common and any three languages

CR 8 (XP 3,900; PB +3)

Actions

Multiattack. The skyburner makes three Arcane Burst attacks.

Spellcasting. The skyburner casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 16):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Lightning Discharge (Recharge 5-6). Dexterity Saving Throw: DC 16, each creature in a 15-foot Emanation originating from the skyburner. Failure: 18 (4d8) Lightning damage. Success: Half damage.

Arcane Burst. Melee or Ranged Attack Roll: +8, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Static Aura. Constitution Saving Throw: DC 16, each creature in a 10-foot Emanation originating from the skyburner. Failure: 24 (7d6) Lightning damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Bonus Actions

Misty Step (3/Day). The skyburner casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Trigger: The skyburner is hit by an attack roll. Response: The skyburner casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

### Trace
```
[path] class_npc — class mage — "sorcerer" (call)
[route] caster (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "storm sorcerer" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("storm sorcerer who rains lightning") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid themes=elemental/terror mind=sapient style=— energy=Lightning mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: rains forked lightning from a personal storm cloud [behavior] | crackling static aura that arcs between nearby foes [aura] | the gathering black storm-cloud crown [body]
[concept] identity: The storm sorcerer opens by calling down forked lightning from a bank of black cloud, striking from well beyond a swordsman's reach and never once closing to trade blows. Each round it repositions — hovering a step above the ground, wreathed in crackling static — and hurls another bolt or a thunderclap at the farthest gathered group it can see. It is proud and cruel, gloating as it rains, and only breaks from its killing rhythm to flee when its own storm is spent and its body is bloodied.
[concept] lore: A sorcerer whose blood quickened with the storm and who now wanders the roads of the world, gathering a personal tempest overhead because the only thing it loves is watching lightning find what people are standing on.
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 8
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 20, WIS 12, CHA 11 — the Mage's, INT fitted to +8
[reskin] donor: caster-6 -> CR 8
[reskin] seats: action <- "rains forked lightning from a personal storm cloud" | trait <- "crackling static aura that arcs between nearby foes"
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said twist Mage)
[reskin] print canon: "storm sorcerer who rains lightning" heads on the Mage — print's rows ride along; the seat stays
[reskin] name_element answered: Storm Bolt = literal; Forked Lightning = literal
[reskin] repair round 1: 1 defect(s) — name "Storm Bolt" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "sorcerer": nothing to add — the sheet already answers it
[reskin] inline declared: "the skyburner" — the call's own answer (kind), built from the name; the rules would have said "Skyburner"
[reskin] inline form: "the skyburner" — the model's own reading of the name
[reskin] spell DC coherence: DC 15 -> 16 off Intelligence 20 (the stat makes the attack rolls)
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + Intelligence's 5) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "storm sorcerer" -> has (mechanical) [asked: save_area] | "rains lightning" -> has (mechanical) [asked: attack]
[reskin] open asks handed to the idea call: "rains lightning"
[reskin] idea anchored: action — "The skyburner raises a hand and the black bank above forks downward — " answers the GM's "rains lightning"
[reskin] idea unanchored: trait — "Crackling static seethes around the skyburner in a hovering aura; at t" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 34 of 34 answered; not true of this body: gaze-single, snare, seal, wail, active-toll, random-ray, spew, snare-bolt, herd, drain, blighted-ground, rally, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, spider-climb, terrain-walk, faultless-tracker, web-walker, uncanny-sense, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial
[reskin] menu: taste stands down — action answers the GM's "rains lightning", so role and style do not filter the menu (legality still does); 18 template(s) offered
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The skyburner raises a hand and the black bank above forks downward — each creature it can see beneath the cloud must make a Dexterity saving throw, taking Lightning damage on a failure and half on a success as the branches split toward the nearest clustered foes. The bolts leap from target to target, so standing shoulder to shoulder beneath its storm is worse than standing apart." [action/save/damage] [family: nova] — menu: thrown-burst, zone, execute, lure, ground-burst, pacify, escalating-dread, slow-bolt, sensory-strike, thrown-burst-seed, curse-debt, zone-seed, reveal, wind-up, throw-retrieve, terror-pulse, disarm, push-prone (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rampage, patient-defense, second-wind, focus, feint-slip, bolt-restrain, bolt-drag, bolt-mark)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does damage; leading: thrown-burst (save/damage), execute (save/damage), ground-burst (save/damage)
[reskin] keys would have bound: action — wind-up (storm)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: thrown-burst, thrown-burst-seed, curse-debt, wind-up, execute — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "ground-burst" has no key-table verb, but the call quotes "rains lightning" from the description
[reskin] signature template: ground-burst -> Actions/"Skyfall Lightning (Recharge 5-6)" ("Each creature beneath the cloud makes a Dexterity save, taking Lightning damage  [shape fit, no verb match]")
[reskin] signature idea (trait): "Crackling static seethes around the skyburner in a hovering aura; at the start of each of its turns, one creature it can see within the aura that is holding or wearing metal must make a Constitution saving throw or be unable to take reactions until the skyburner's next turn, the arcs finding the iron on their body." [trait/start_of_turn/condition] [family: zone] — menu: phobia, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, truth-aura, fear-aura
[reskin] verb gate stands down: trait — no template shares a verb, but 2 template(s) whose declared stamps match the idea (start_of_turn/condition): truth-aura, fear-aura; the declared data is the warrant and the call is worth making
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: truth-aura, fear-aura — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:zone:condition:deafened: the call picked it off the menu (what no printed template did: unstated)
[reskin] free signature row: trait — "composed:zone:condition:deafened" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "crackling static aura that arcs between nearby foes" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] free signature row: "Static Aura" — the trait seat cannot quote the GM, but the call names the element it expresses: "crackling static aura that arcs between nearby foes". Earns no clause credit; the twist/class path allows 1 and this is number 2
[reskin] seat takes its clause: "Static Aura" is HANDED "rains lightning" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): composed:zone:condition:deafened -> Traits/"Static Aura" ("an aura that forces a Constitution save on creatures in range at the start of th [shape fit, no verb match]")
[reskin] weapons answered: Storm Bolt = none; Forked Lightning = none
[reskin] weapon declined: "Storm Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Storm Bolt" — a launcher, never thrown, range 80/320
[reskin] print canon modes: fly off — the Mage has no such mode and the words name none
[reskin] speed by concept: dropped Fly 30 ft. (hover) — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon row: Actions/Arcane Burst — the Mage's own melee row, added (the chassis carried none to rename)
[reskin] ranged row off: "Storm Bolt" leaves — the Mage carries no ranged row and the words name none
[reskin] multiattack re-read — "Storm Bolt" left; "Multiattack" now reads "The skyburner makes three attacks."
[reskin] resistances derived: Lightning
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] multiattack normalised: "The skyburner makes three Arcane Burst attacks."
[reskin] free-row budget by card size: CR 8 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Static Aura" [no template]
[reskin] lint: attack-mod-coherence: Actions/Arcane Burst: flat damage bonus +3 matches none of the creature's STR/DEX/INT/WIS/CHA modifiers — attack damage bonuses derive from the attack ability
[reskin] element expressed: Static Aura carries "crackling static aura that arcs between nearby foes" — "The target has the Deafened condition until the start of its next turn."
[reskin] audit: [Static Aura: A crackling static aura's only payloa…ned condition until the start of its next turn."), Skyfall Lightning (Recharge 5-6): The name promise…tered on the caster. (about: "Skyfall Lightning")]
[reskin] audit rename: "Skyfall Lightning (Recharge 5-6)" -> "Lightning Discharge (Recharge 5-6)"
[reskin] row repair: "Static Aura" [free row] — the audit faults it (A crackling static aura's only payload is Deafened — a condition that … (about: "The target has the Deafened condition until the start of its next turn.")); re-authored through the forms rather than evicted (the owner's ruling: a flagged row is repaired)
[reskin] free row moved: "Static Aura" Traits -> Actions — the repair answered with an action, and being the wrong shape for its section was the defect
[reskin] free row repaired: "Static Aura": "*Constitution Saving Throw*: DC 16, any creature that starts its turn " -> "*Constitution Saving Throw*: DC 16, each creature in a 10-foot Emanation originating from "
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "sorcerer" which is not a whole clause — the seat surgery cut it; resolved to cl_7q4aym
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] done: "Skyburner" — donor caster-6, CR 8
```

---

## 08. Bramblejack — CR 3

**Input:** `name: Bramblejack |  | role: lurker`
**Donor:** lurker-2 -> CR 3
**Signature:** library · **elapsed** 30s

### Block
```
Bramblejack

Medium Plant, Neutral

AC 14
Initiative +3 (13)

HP 45 (7d8 + 14)

Speed 30 ft., Climb 30 ft.

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

Traits

Thornshroud. While the bramblejack remains motionless, it is indistinguishable from thorn and shadow.

Actions

Multiattack. The bramblejack makes two Thorn Whip attacks.

Thorn Whip. Melee Attack Roll: +5 (with Advantage during the first round of each combat), reach 10 ft. 12 (2d8 + 3) Slashing damage.

Pulling Thorns (Recharge 5-6). Strength Saving Throw: DC 12, one creature within 5 feet. Failure: 13 (3d8) Slashing damage, and the target has the Restrained condition until the end of its next turn.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the bramblejack takes the Hide action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

### Trace
```
[concept] thin concept expanded before routing: Bramblejack — Bramblejack is a thorned mass of trailing briar that haunts hedgerows and overgrown ruins, waiting flat and low against the earth until prey wanders within reach — then it whips its living vines around ankles and knees, dragging its catch into the brush. Once it has a grip it does not 
[path] homebrew — "Bramblejack" (call)
[route] lurker type=Plant mechanics=grapple — casts: the call reads no worked magic here | hold_shape refused: the call answered reach but quoted "it whips its living vines arou", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-trap: ✓ ("waiting flat and low against the earth u") | lurker-trap: no line key in the words — the model's read of its quote | lurker-trap -> lurker: a trap is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it | bane refused: the words carry no weakness clause and the call did not claim one, so "Fire" is a guess from what the creature is, not the GM's ask
[concept] resolve: archetype=lurker type=Plant themes=verdant/grasping mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple
[concept] signature elements: thorned vines that lash out and coil around prey [body] | lying flat and low until prey comes within reach [behavior] | dragging its catch into the thicket to feed [behavior]
[concept] identity: Bramblejack is a thorned mass of trailing briar that haunts hedgerows and overgrown ruins, waiting flat and low against the earth until prey wanders within reach — then it whips its living vines around ankles and knees, dragging its catch into the brush. Once it has a grip it does not release, tightening thorn-loops round and round while it feeds, and it retreats into the densest thicket only when its vines are hacked apart faster than they can regrow.
[concept] lore: Born where a dying druid's blood soaked into a blackthorn hedge, Bramblejack is a knot of hungry briar that believes every warm body that passes belongs to its root-soil.
[reskin] donor: lurker-2 -> CR 3
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] seats: action <- "lying flat and low until prey comes within reach" | trait <- "thorned vines that lash out and coil around prey"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the bramblejack" — the call's own answer (kind), built from the name
[reskin] inline form: "the bramblejack" — the model's own reading of the name
[reskin] the sheet's declared ask: snare — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "retreats into the densest thicket" quotes nothing the user typed
[reskin] clauses: "Bramblejack" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "Each vine the bramblejack lashes leaves a thorned loop that pulls taut" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The bramblejack lies flat and low among roots and briar, indistinguish" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 38 of 38 answered; not true of this body: gaze-single, seal, wail, active-toll, random-ray, spew, drain, zone-seed, blighted-ground, blink, shell-withdraw, coating, phase-slip, heated-body, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, life-drain
[reskin] signature idea (action): "Each vine the bramblejack lashes leaves a thorned loop that pulls taut: on a hit, the target is Restrained by the vine until it escapes, and while Restrained in this way it takes piercing damage at the start of each of its turns as the thorns tighten around it." [rider/on_hit/condition] [family: sentinel] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation (+ shelf: execute, lure, pull-through, ground-burst, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, delayed-brand, patient-defense, self-invisibility, focus, feint-slip, riposte, answering-strike)
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — snare: snare-bolt
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: snare-bolt (save/condition), affliction (on_hit/condition), contagion (on_hit/condition)
[reskin] classification handed to the fit call: mechanic=grapple
[reskin] word match declined by the call: snare-bolt, contagion, pounce, hook-rider — the key word does not mean the mechanic here
[reskin] seat answered, but: the call said "Each vine the bramblejack lashes leaves a thorned loop that pulls taut: on a hit, the target is Restrained by the vine u" is carried by "Pulling Thorns", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("an escape-check Restrained condition that also deals piercing damage a") and wrote an action instead: "Pulling Thorns" -> Actions. *Strength Saving Throw*: DC 12, one creature within 5 feet. *Failure:* 13 (3d8) Piercing damage, and the target has the 
[reskin] authored row numbers: "Pulling Thorns" — the call declared (unanswered) number(s) promised
[reskin] value check: "Pulling Thorns (Recharge 5-6)" EV 13.8 vs floor 6.2 (one attack of 2) — over the ceiling — gated Recharge 5-6
[reskin] signature authored: no template — the seat wrote it -> Actions/"Pulling Thorns (Recharge 5-6)" ("Each vine the bramblejack lashes leaves a thorned loop that pulls taut: on a hit, the target is Restrained by the vine until it escapes, and while Restrained in [authored: the catalog held no shape for it]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 14 already beats print's 13 at CR 3, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The bramblejack lies flat and low among roots and briar, indistinguishable from the hedgerow until it moves; a creature that has not yet seen it act has no reason to suspect it is anything but thorn and shadow." [trait/always/defense] [family: zone] — menu: false-appearance, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, assassinate, sealed-body, guarded-stance
[reskin] composed candidates: none trait — the zone family has no payload that does "defense" (it offers damage, condition, movement)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: false-appearance (always/defense), bloodied-fury (always/defense), uncanny-sense (always/defense)
[reskin] classification handed to the fit call: mechanic=grapple
[reskin] word match declined by the call: false-appearance — the key word does not mean the mechanic here
[reskin] seat answered, but: the call said "a hit that seizes and holds the target so it can't move away" is carried by "Snaring Bramble", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The bramblejack lies flat and low among roots and briar, indistinguish" and wrote no row of that kind (refused: "Snaring Bramble" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description); the nearest template stands in
[reskin] closest accepted: trait — the call refused every template but named "false-appearance" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: a hit that seizes and holds the target so it can't move away)
[reskin] pick kept on the GM's own words: trait — "false-appearance" has no key-table verb, but the call quotes "bramblejack" from the description
[reskin] signature template (trait): false-appearance -> Traits/"Bramble Snare" ("The idea is about the bramblejack being indistinguishable from a hedgerow while  [shape fit, no verb match]")
[reskin] weapons answered: Thorn Whip = whip
[reskin] weapon dice keep the budget's die: "Thorn Whip" is a whip (d4), but 4d4 passes print's largest d4 attack row (3d4) — "12 (2d8 + 3)" stands
[reskin] weapon reach follows the weapon: "Thorn Whip" is a whip — reach 5 ft becomes 10 ft (the table's own)
[reskin] chassis nova: "Pulling Thorns (Recharge 5-6)" — the lurker-2's own nova row; geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] attack name by anatomy: "Thorn Whip" -> "Thorn Whip" — whip deals Slashing, not Piercing
[reskin] name-canon stands down: the path answered homebrew on "Bramblejack" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Pulling Thorns" [no template]
[reskin] lint: 0 findings
[reskin] element expressed: Pulling Thorns carries "thorned vines that lash out and coil around prey" — "the target has the Restrained condition until the end of its next turn"
audit finding below confidence gate: Umbral Step The name 'Umbral Step' promises movement or shadow-teleport, but the text only takes the Hide action in place, a name/text mismatch.
[reskin] audit: [Pulling Thorns (Recharge 5-6): The row coils aroun…rained condition until the end of its next turn"), Bramble Snare: The trait is named for a snare but …about: "indistinguishable from thorn and shadow")]
[reskin] audit rename: "Bramble Snare" -> "Thornshroud"
[reskin] row repair: "Pulling Thorns (Recharge 5-6)" [free row] — the audit faults it (The row coils around prey (Restrained) but the damage type is plain Pi… (about: "13 (3d8) Piercing damage, and the target has the Restrained condition until the end of its next turn")); re-authored through the forms rather than evicted (the owner's ruling: a flagged row is repaired)
[reskin] free row repaired: "Pulling Thorns (Recharge 5-6)": "*Strength Saving Throw*: DC 12, one creature within 5 feet. *Failure:*" -> "*Strength Saving Throw*: DC 12, one creature within 5 feet. *Failure:* 13 (3d8) Slashing d"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause unresolved: "Pulling Thorns (Recharge 5-6)" carries "Each vine the bramblejack lashes leaves a thorned loop t", which matches no clause on the sheet — no coverage credit by id
[reskin] [gap] a hit that seizes and holds the target so it can't move away — "The bramblejack lies flat and low among roots and briar, indistinguishable from the hedgerow until it moves; a creature that has not yet seen it act has no reason to suspect it is anything but thorn and shadow." — Bramblejack [seat: trait [trait/always/defense]] (closest offered: false-appearance) [effect: condition] [menu: false-appearance bloodied-fury uncanny-sense shielded-mind evasion undead-fortitude sealed-body guarded-stance phobia terrain-walk blood-frenzy pack-tactics relentless-pursuit bound assassinate truth-aura fear-aura] [same-cell unoffered: shell-withdraw death-restoration patient-defense relic-object mimicry blurred-form] [same-seat rejected: adhesive:body-verdict spider-climb:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict death-restoration:cr-range earth-glide:movement tunneler:movement berserk:role marking-light:body-verdict relic-object:body-verdict mimicry:body-verdict blurred-form:body-verdict death-burst:body-verdict kill-denial:body-verdict] [landed: false-appearance]
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 1 · path homebrew
[reskin] done: "Bramblejack" — donor lurker-2, CR 3
```

---

## 09. Vhalgrin — CR 6

**Input:** `name: Vhalgrin |  | role: artillery`
**Donor:** skirmisher-8-hurler -> CR 6 (invented — no printed peer)
**Signature:** library · **elapsed** 33s

### Block
```
Vhalgrin

Medium Construct, Neutral

AC 16
Initiative +4 (14)

HP 97 (13d8 + 39)

Speed 40 ft., Fly 40 ft. (hover)

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
+7
WIS
14
+2
+5
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

Skills Perception +5, Stealth +7

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Shatterlight. While Vhalgrin is in Dim Light or Darkness, Vhalgrin sheds a faint glimmer that casts Dim Light in a 10-foot Emanation and can take the Hide action even when only lightly obscured, its body bending the surrounding glare; in Bright Light this trait grants nothing.

Glass Glide. Vhalgrin ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Vhalgrin makes three attacks, using Slam or Glass Bolt in any combination. It can replace one attack with a use of Cracked-Core Strike.

Slam. Melee Attack Roll: +7, reach 5 ft. 8 (1d8 + 4) Bludgeoning damage plus 4 (1d8) Radiant damage.

Glass Bolt. Ranged Attack Roll: +7, range 80/320 ft. 8 (1d8 + 4) Piercing damage.

Shard Burst (Recharge 5-6). Vhalgrin hurls a glass shard at a point it can see within 90 feet. Dexterity Saving Throw: DC 14, each creature in a 5-foot-radius Sphere centered on that point. Failure: 36 (8d8) Radiant damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Cracked-Core Strike. Vhalgrin strikes where the target cannot guard. Dexterity Saving Throw: DC 14, one creature within 30 feet. Failure: 16 (3d10) Radiant damage. If the target already has the Prone condition, it also has the Prone condition. Success: Half damage.

Bonus Actions

Fleet Agility. Vhalgrin takes the Dash or Disengage action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

### Trace
```
[concept] thin concept expanded before routing: Vhalgrin — Vhalgrin opens combat by hurling searing bolts of glass from its floating, orbiting shards, then glides to a new vantage to fire again, never closing to melee. When cornered, it detonates a shard in a burst of radiant shrapnel and retreats to reclaim its range, its body shattering and ref
[path] homebrew — "Vhalgrin" (call)
[route] skirmisher-hurler type=Construct mechanics=thrown-weapon, teleport — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: the call reads no worked magic in these words (the artillery role does not make it one) | skirmisher-hurler: ✓ ("opens combat by hurling searing bolts of") | skirmisher-hurler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Construct themes=celestial mind=sapient style=hurler energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Vhalgrin"
[concept] mechanics: thrown-weapon, teleport
[concept] signature elements: searing glass shard volleys [behavior] | floating shard-glass body around a cracked radiant core [body] | shard detonation and retreat [behavior]
[concept] identity: Vhalgrin opens combat by hurling searing bolts of glass from its floating, orbiting shards, then glides to a new vantage to fire again, never closing to melee. When cornered, it detonates a shard in a burst of radiant shrapnel and retreats to reclaim its range, its body shattering and reforming around its cracking glass core. It fights to the death only if its core glass is threatened, otherwise it plays a patient, taunting artillery duel from high ground.
[concept] lore: Vhalgrin was shaped in a celestial glassworks from a failed guardian's sanctified pane, and it now hunts those who trespass on the high places it has claimed as its firing line.
[reskin] donor: skirmisher-8-hurler -> CR 6 (invented — no printed peer)
[reskin] seats: action <- "searing glass shard volleys" | trait <- "floating shard-glass body around a cracked radiant core"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] proper noun: "Vhalgrin" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline by rule: "Vhalgrin" — the call answered "the vhalgrin" (kind), which the name does not support
[reskin] inline form: "the vhalgrin" — the model's own reading of the name
[reskin] returning clause dropped: "Glass Bolt" throws a glass shard — the call did not say this projectile is a single object the creature must recover (projectile_supply: ambient), so it stays where it lands; print writes a returning weapon 4 times in 1291 rows
[reskin] damage type by the row's own noun: "Shard" Slashing -> Piercing
[reskin] the sheet's declared ask: burst — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Vhalgrin" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "When Vhalgrin hits a creature with Shard, slivers of glass lodge in th" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Vhalgrin's orbiting shards drink the light around it, so that while it" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 29 of 29 answered; not true of this body: snare, shield-bash, snare-bolt, coating, phase-slip, heated-body, false-appearance, absorption, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "When Vhalgrin hits a creature with Shard, slivers of glass lodge in the wound and keep burning; until the end of Vhalgrin's next turn, the target glows with searing radiant light, and any creature that starts its turn within reach of the target has Disadvantage on its next attack roll as the glittering glare stings its eyes." [rider/on_hit/condition] [family: mark] — menu: affliction, contagion, stunning-strike, charge-push, pounce, isolation, bolt-mark, bolt-restrain (+ shelf: condition-payoff, throw-retrieve, lure, sensory-strike, disarm, delayed-brand, exploiter, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, snap-shot, riposte, answering-strike)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: affliction (on_hit/condition), contagion (on_hit/condition), stunning-strike (on_hit/condition)
[reskin] classification handed to the fit call: mechanic=thrown-weapon, teleport
[reskin] word match declined by the call: affliction, contagion, stunning-strike, pounce, bolt-restrain, charge-push, isolation, lure, sensory-strike — the key word does not mean the mechanic here
[reskin] seat answered, but: the call said "When Vhalgrin hits a creature with Shard, slivers of glass lodge in the wound and keep burning; until the end of Vhalgri" is carried by "Lodged Slivers", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write an action for "When Vhalgrin hits a creature with Shard, slivers of glass lodge in th" and wrote no row of that kind; the nearest template stands in
[reskin] closest accepted: action — the call refused every template but named "bolt-mark" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: leaves a burning shard that makes the target glow and gives Disadvantage to near)
[reskin] free signature row: action — "bolt-mark" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] rider declined: "Lodged Slivers" — a rider rides the user's own attack, so it needs the user's own ask; the call offered no quote, and the key table finds no verb either (the gong's bandaged concussion, 2026-10-01)
[reskin] fallback respects the call: sensory-strike left the shelf — the call declined it for this sheet
[reskin] fallback skipped: thrown-burst-seed (the sheet cannot render it)
[reskin] one nova: "Merciless Strike" — the seed's gate leaves; the chassis nova stands
[reskin] value check: "Merciless Strike" EV 13.9 vs floor 14.3 (one attack of 3) — priced at the floor: dice 11 → 16 (the cap binds; the cap is the price)
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Vhalgrin's orbiting shards drink the light around it, so that while it is in dim light or darkness it sheds a faint glimmer and can Hide even in plain sight against a bright backdrop, its glass body bending the glare into a blinding mirror." [trait/always/movement] [family: payoff] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate, death-burst (+ shelf: bloodied-burst, resonant-body)
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] declared mechanic leads the menu: trait — burst: death-burst, bloodied-burst
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: death-burst (always/damage), bloodied-burst (on_being_hit/damage), relentless-pursuit (always/movement)
[reskin] classification handed to the fit call: mechanic=thrown-weapon, teleport
[reskin] word match declined by the call: relentless-pursuit, bound, marking-light — the key word does not mean the mechanic here
[reskin] seat answered, but: the call said "Vhalgrin's orbiting shards drink the light around it, so that while it is in dim light or darkness it sheds a faint glim" is carried by "Shatterlight", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("lets the creature hide in plain sight while it sheds faint light") and wrote a trait instead: "Shatterlight" -> Traits. While Vhalgrin is in Dim Light or Darkness, Vhalgrin sheds a faint glimmer, casting Dim Light for 10 feet, yet it can ta
[reskin] authored row numbers: "Shatterlight" — the call declared 1 number(s) promised
[reskin] free signature row: "Shatterlight" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Shatterlight" ("Vhalgrin's orbiting shards drink the light around it, so that while it is in dim light or darkness it sheds a faint glimmer and can Hide even in plain sight aga [authored: the catalog held no shape for it]")
[reskin] weapons answered: Shard = none; Glass Bolt = none; Shard Burst = none; Radiant Detonation = none
[reskin] weapon declined: "Glass Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Glass Bolt" — a launcher, never thrown, range 80/320
[reskin] chassis nova: "Shard Burst (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: dropped Climb 40 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] attack name by anatomy: "Shard" -> "Slam" — shard is a ranged noun on a melee row
[reskin] rename propagated: "Shard" -> "Slam" in "Multiattack"
[reskin] attack name by anatomy: "Slam" -> "Slam" — a slam deals Bludgeoning, not Piercing
[reskin] defenses by material: a glass body is vulnerable to Thunder and never resists, absorbs, or ignores it (named by the call's own material field) — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "Vhalgrin" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Thunder" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Merciless Strike.
[reskin] free-row budget by card size: CR 6 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Shatterlight" [no template]
[reskin] lint fixed: prone-duration — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] element expressed: Shatterlight carries "floating shard-glass body around a cracked radiant core" — "Vhalgrin sheds a faint glimmer, casting Dim Light for 10 feet"
[reskin] audit: [Merciless Strike: The rider re-applies Prone to a …one condition, it also has the Prone condition."), Merciless Strike: The name is a generic stand-in t…a compromised target. (about: "Merciless Strike"), Shatterlight: The open-ended 'even when… in plain … sight, its body bending the surrounding glare.")]
[reskin] audit rename: "Merciless Strike" -> "Cracked-Core Strike"
[reskin] row repair: "Shatterlight" [free row] — the audit faults it (The open-ended 'even when… in plain sight' Hide permission has no area… (about: "yet it can take the Hide action even when only lightly obscured or in plain sight, its body bending the surrounding glare.")); re-authored through the forms rather than evicted (the owner's ruling: a flagged row is repaired)
[reskin] free row repaired: "Shatterlight": "While Vhalgrin is in Dim Light or Darkness, Vhalgrin sheds a faint gli" -> "While Vhalgrin is in Dim Light or Darkness, Vhalgrin sheds a faint glimmer that casts Dim "
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Cracked-Core Strike) — the sameness metric
[reskin] clause id by substring: "Shatterlight" carries "Vhalgrin's orbiting shards drink the light aroun" which is not a whole clause — the seat surgery cut it; resolved to cl_446gy5
[reskin] [gap] leaves a burning shard that makes the target glow and gives Disadvantage to nearby attackers' next attack roll — "When Vhalgrin hits a creature with Shard, slivers of glass lodge in the wound and keep burning; until the end of Vhalgrin's next turn, the target glows with searing radiant light, and any creature that starts its turn within reach of the target has Disadvantage on its next attack roll as the glittering glare stings its eyes." — Vhalgrin [seat: action [rider/on_hit/condition]] (closest offered: bolt-mark) [effect: condition] [menu: affliction contagion stunning-strike pounce bolt-mark bolt-restrain charge-push isolation lure sensory-strike] [same-cell unoffered: life-drain snatch] [same-seat rejected: hook-rider:body-verdict life-drain:body-verdict snatch:engine-key bolt-drag:role charge:style] [VETOED AFTER ACCEPTANCE: bolt-mark never reached the sheet — died at the weld (a rider needs the GM's own ask) (Lodged Slivers)]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the weld (a rider needs the GM's own ask)
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the weld (a rider needs the GM's own ask)) · path homebrew
[reskin] done: "Vhalgrin" — donor skirmisher-8-hurler, CR 6
```

---

## 10. Orsolya — CR 6

**Input:** `name: Orsolya |  | role: controller`
**Donor:** caster-6 -> CR 6
**Signature:** library · **elapsed** 29s

### Block
```
Orsolya
Medium undead, neutral
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

Damage Immunities: 

cold, poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

Common and any three languages

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Misty Step (3/Day) (Bonus Action).Orsolya casts Misty Step, using the same spellcasting ability as Spellcasting.
Choking Haze (1/Day) (Bonus Action).Orsolya creates a choking haze in a 20-foot radius originating from itself. The effect lasts while Orsolya maintains Concentration on it, up to 10 minutes. Each creature in the area has disadvantage on attack rolls.
Protective Magic (3/Day) (Reaction).Orsolya casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Orsolya makes three Arcane Burst attacks.
Arcane Burst: Melee or Ranged Spell Attack: +6 to hit, reach 5 ft. or range 120 ft., one target. Hit: 16 (3d8 + 3) force damage.
Spellcasting: Orsolya casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14): - At will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
2/day each: Fireball, Invisibility
1/day each: Cone of Cold, Fly
```

### Trace
```
[concept] thin concept expanded before routing: Orsolya — Orsolya drifts through the mist on a chill wind, her presence dragging a lock of an intruder's hair or a fingernail into her glacial lattice with a whispered command that roots their feet to the frost. Once a foe is snared, she drifts round them at the edge of reach, peeling away warmth an
[path] class_npc — "Orsolya" (call)
[route] brute type=Undead mechanics=snare — casts refused: the call answered yes but quoted "with a whispered command that ", which is not in the GM's words — the word table decides | hold_shape refused: the call answered medium but quoted "her presence dragging a lock o", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-phantom: outside the user's controller role | caster-binder: a caster line needs a magic word in the words — none here (the controller role does not make it one) | caster: a caster line needs a magic word in the words — none here (the controller role does not make it one) | caster: the family itself needs a magic word in the words — the fallback leaves it (the controller role does not make it one) | fell to brute-grappler's plain line | brute-grappler: no line key in the words — the model's read of its quote | brute-grappler -> brute: a grappler is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] resolve: archetype=brute type=Undead themes=fey/grasping mind=sapient style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Orsolya"
[concept] mechanics: snare
[concept] signature elements: whispered command that roots a foe in frost [behavior] | a lattice of icy shards holding tokens of her captives [body] | chill wind that shelters and carries her and turns aside harm [aura]
[concept] identity: Orsolya drifts through the mist on a chill wind, her presence dragging a lock of an intruder's hair or a fingernail into her glacial lattice with a whispered command that roots their feet to the frost. Once a foe is snared, she drifts round them at the edge of reach, peeling away warmth and courage with wailing cold while the frozen shards she's collected tangle in their limbs — and she retreats into her mist the moment the fight turns against her, because losing one frost-bound soul is worse to her than ending the fight.
[concept] lore: Orsolya is the hoarfrost spirit of a drowned valley's winter court, a fey who binds lost travelers by stealing a token of their warmth and keeping it sheathed in her ice until they forget which way is home.
[reskin] [path] class body: a person with no class stands on the Mage — print's own people, nearest CR 6 (the title is "Orsolya")
[reskin] the concept outranks the alias: the Mage is a Humanoid and the concept reads Undead — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from brute, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 114 -> 81, AC 14 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +6 -> +6, DC 14 (print's)
[reskin] donor: caster-6 -> CR 6
[reskin] seats: action <- "whispered command that roots a foe in frost" | trait <- "a lattice of icy shards holding tokens of her captives"
[reskin] [path] decides: class_npc on the Mage (the matcher would have said homebrew)
[reskin] print canon: "Orsolya" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: none — the class_npc path takes no class kit
[reskin] proper noun: "Orsolya" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Orsolya" — the call's own answer (person), built from the name
[reskin] inline form: "Orsolya" — the model's own reading of the name
[reskin] control spell gated to daily — Hold Person (level 2 control at will is print's CR 13+ shape; at CR 6 it is 1/Day)
[reskin] daily spell dropped — Cone of Cold (36 avg vs 13 per-hit; print's only daily damage spell is the Adult Red's Fireball at ~1.1x)
[reskin] spell DC coherence: DC 15 -> 14 off Intelligence 17 (print's array stays)
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + Intelligence's 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: snare — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Orsolya" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "Orsolya whispers a command that roots a creature's shadow to the hoarf" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Orsolya's glacial lattice drinks the warmth from the air around her; t" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 37 of 37 answered; not true of this body: seal, active-toll, random-ray, spew, herd, blighted-ground, rally, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, spider-climb, terrain-walk, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Orsolya whispers a command that roots a creature's shadow to the hoarfrost underfoot. One creature she can see makes a Wisdom saving throw; on a failure it is Restrained, and its feet crackle with frozen rime as long as Orsolya holds concentration." [action/save/condition] [family: mark] — menu: thrown-burst, gaze-single, snare, zone, execute, wail, lure, ground-burst, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, shield-bash, terror-pulse, push-prone (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, bolt-restrain, bolt-drag, bolt-mark)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — snare: snare, snare-bolt
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: snare (save/condition), snare-bolt (save/condition), gaze-single (save/condition)
[reskin] classification handed to the fit call: mechanic=snare
[reskin] word match declined by the call: snare, snare-bolt, gaze-single, lure, pacify — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "zone" has no key-table verb, but the call quotes "orsolya" from the description
[reskin] free signature row: "Shadow Root (1/Day)" — a print body takes only what the user's words ask, but the call names the element it expresses: "whispered command that roots a foe in frost". Earns no clause credit; the budget settles on the finished sheet
[reskin] signature template: zone -> Actions/"Shadow Root (1/Day)" ("roots a creature's shadow to the hoarfrost underfoot; on a failed Wisdom save it [shape fit, no verb match]")
[reskin] signature idea (trait): "Orsolya's glacial lattice drinks the warmth from the air around her; the ground she hovers over silvering with frost. The ground within a short radius of her is difficult terrain for other creatures, as numbing cold seeps upward into their limbs." [trait/always/movement] [family: zone] — menu: phobia, aberrant-ground, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura (+ shelf: resonant-body)
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (always/movement): aberrant-ground, relentless-pursuit, bound; the declared data is the warrant and the call is worth making
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: aberrant-ground (always/movement), relentless-pursuit (always/movement), bound (always/movement)
[reskin] classification handed to the fit call: mechanic=snare
[reskin] pick kept on the GM's own words: trait — "aberrant-ground" has no key-table verb, but the call quotes "orsolya" from the description
[reskin] trait declined: "Glacial Lattice" — a print body takes only what the user's words ask; the call quotes "orsolya", which only names the creature itself — on the twist path the ask is the twist clause
[reskin] weapons answered: Ice Shard = none
[reskin] print canon modes: fly off — the Mage has no such mode and the words name none
[reskin] speed by concept: dropped Fly 30 ft. (hover) — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon type: Undead stays — the Mage is the class's BODY on this path, not this creature's kind (print's own NPC blocks are all Humanoid)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Ice Shard" -> "Arcane Burst" — the Mage's own row
[reskin] defenses by material: an ice body is vulnerable to Fire and never resists, absorbs, or ignores it (named by the call's own material field) — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] element immunity: Cold — the call read this creature's energy as Cold and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Cold (merged into the header write)
[reskin] immunities stamped for type: Undead -> Cold, Poison; Exhaustion, Poisoned
[reskin] print canon skills: "Arcana +6, Perception +4" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Reactions/"Protective Magic (3/Day)" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] print canon row: Reactions/Protective Magic (3/Day) — the Mage's own
[reskin] dead control row: "Shadow Root (1/Day)" moves to Bonus Actions — no damage, no save, no KO condition
[reskin] multiattack replacement clause: It can replace one attack with a use of Spellcasting to cast *Ice Knife*.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Shadow Root" [action/once_per_fight/condition]
[reskin] replacement clause re-read: "Spellcasting to cast Ice Knife" is not on this sheet, so the clause leaves entirely — print's commonest Multiattack carries none
[reskin] lint: 0 findings
[reskin] element expressed: Shadow Root carries "whispered command that roots a foe in frost" — "Orsolya creates a choking haze in a 20-foot Emanation originating from itself."
[reskin] audit: [Shadow Root (1/Day): The name promises rooting a f…e in the area has Disadvantage on attack rolls."), Shadow Root (1/Day): The haze applies Disadvantage…e in the area has Disadvantage on attack rolls.")]
[reskin] audit rename: "Shadow Root (1/Day)" -> "Choking Haze (1/Day)"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] done: "Orsolya" — donor caster-6, CR 6
[reskin] 2014 conversion: one lint-gated call — both printings saved
```
