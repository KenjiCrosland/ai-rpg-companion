# Smoke: v-route (2026-11-13T20-23-54)

- 01 Big Bob — ok, signature: library
- 02 Old Marta — ok, signature: library
- 03 Cinderpot Marauder — ok, signature: library
- 04 Salthusk Champion — ok, signature: library
- 05 Loom Hall Orb-Weaver — ok, signature: library
- 06 Sister Maudra — ok, signature: library
- 07 Skyfeud — ok, signature: library
- 08 Bramblejack — ok, signature: library

---

## 01. Big Bob — CR 9

**Input:** `name: big bob | giant who throws boulders | role: artillery`
**Donor:** skirmisher-8-hurler -> CR 9 (invented — no printed peer)
**Signature:** library · **elapsed** 31s

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

Blood Frenzy.Bob has advantage on attack rolls against any creature that doesn't have all its hit points.
Deflect Missile (Recharge 5-6) (Reaction).When Bob is hit by a ranged attack roll and takes Bludgeoning, Piercing, or slashing damage from it, Bob reduces the damage it takes from the attack by 11 (1d10 + 6), and if that damage is reduced to 0, Bob can redirect some of the attack's force. DC 18, one creature Bob can see within 60 feet. 11 (1d10 + 6) force damage.

Actions
Multiattack: Bob makes three attacks, using Stone Club or Stone Discus.
Stone Club: Melee Weapon Attack: +7 to hit, reach 15 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage.
Stone Discus: Bob hurls a great slab of stone. Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. The weapon lands in an unoccupied space within 5 feet of the target; until Bob spends 5 feet of movement in that space to recover it, Bob's Speed is halved and it can't use this action.
```

### Trace
```
[path] twist — Stone Giant (is) — "giant" (call)
[route] skirmisher-hurler type=Giant mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-hurler: ✓ ("giant who throws boulders") | skirmisher-hurler: key "throws" (class verb)
[concept] name: "big bob" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: hurler→style ✓ ("giant who throws boulders")
[concept] resolve: archetype=skirmisher type=Giant themes=elemental/bestial mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "big bob"
[concept] mechanics: thrown-weapon
[concept] signature elements: hurling boulders from range [behavior] | a giant's stone-and-hide bulk [body] | quarried rock as ammunition [object]
[concept] identity: Big Bob opens a fight from the high ground, hurling a boulder the size of a wagon to break formations and crater shield walls before the enemy can close. Every round after that he lobs again — alternating aimed rocks with blind, punishing throws that scatter anything trying to flank him — while retreating uphill and never letting a foe inside arm's reach. He is a patient, deliberate artilleryman who fights to the death once bloodied, too proud and too slow to run, preferring to bury prey under rubble rather than suffer a charge.
[concept] lore: Big Bob is a hill giant who hauled stone for a mountain quarry until the foremen vanished, and now he claims every road and valley within sight of his ridge, demanding tribute in food and growing richer in ammunition with every wagon he buries.
[reskin] print canon array: STR 23, DEX 16, CON 20, INT 10, WIS 12, CHA 9 — the Stone Giant's, DEX fitted to +7
[reskin] donor: skirmisher-8-hurler -> CR 9 (invented — no printed peer)
[reskin] seats: package <- "a giant's stone-and-hide bulk"
[reskin] [path] decides: twist on the Stone Giant (the matcher would have said homebrew)
[reskin] print canon: "big bob — giant who throws boulders" heads on the Stone Giant — print's rows ride along; the seat stays
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
[reskin] idea anchored: action — "Bob rips a great slab of stone from the ground or from the rubble arou" answers the GM's "throws boulders"
[reskin] idea unanchored: trait — "Bob's quarrier's eye never loses a stone in flight — he ignores Half C" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 29 of 29 answered; not true of this body: snare, shield-bash, snare-bolt, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "throws boulders", so role and style do not filter the menu (legality still does); 13 template(s) offered
[reskin] menu pruned: action — thrown-burst-seed, push-prone (the sheet cannot render them)
[reskin] signature idea (action): "Bob rips a great slab of stone from the ground or from the rubble around him and hurls it flat like a discus, so that it bursts apart on impact — every creature within the scattered stone's reach takes the splintering shrapnel and must save or be knocked Prone as the ground under them heaves." [action/save/condition] [family: nova] — menu: condition-payoff, throw-retrieve, lure, sensory-strike, disarm, exploiter, execute, pacify, escalating-dread, terror-pulse, slow-bolt, curse-debt, reveal (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, rampage, lay-on-hands, snap-shot, riposte, answering-strike, stunning-strike, charge-push, pounce, isolation, bolt-mark, bolt-restrain, bolt-drag, charge)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — burst: throw-retrieve
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: throw-retrieve (always/damage), lure (save/condition), sensory-strike (save/condition)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=attack when=at_will often=at_will
[reskin] word match declined by the call: lure, sensory-strike, exploiter, pacify, escalating-dread, terror-pulse, reveal, disarm, execute, slow-bolt, curse-debt — the key word does not mean the mechanic here
[reskin] clause already answered: "throws boulders" is carried by "Boulder" — the seat read the sheet and declined to write a second row for it
[reskin] seat stands down: action — "throws boulders" is already carried by a row on this sheet; no second row is written for it
[reskin] closest accepted: action — the call refused every template but named "throw-retrieve" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: hurls a stone so it bursts on impact, damaging and knocking down every creature )
[reskin] free signature row: action — "throw-retrieve" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Stone Discus" is HANDED "big bob — giant" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] slot yields: ranged — the chassis's "Boulder" leaves; "Stone Discus" holds the slot
[reskin] multiattack re-read — "Boulder" left; "Multiattack" now reads "Bob makes three Fist attacks."
[reskin] signature template: throw-retrieve -> Actions/"Stone Discus" ("Bob rips a great slab of stone from the ground or from the rubble around him and hurls it flat like a discus, so that it bursts apart on impact — every creature [shape fit, no verb match]")
[reskin] signature idea (trait): "Bob's quarrier's eye never loses a stone in flight — he ignores Half Cover when hurling a boulder, and any creature he can see within range of his ammunition has no concealment from his throws." [trait/always/defense] [family: payoff] — menu: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] verb gate stands down: trait — no template shares a verb, but 6 template(s) whose declared stamps match the idea (always/defense): bloodied-fury, death-restoration, shielded-mind, evasion, guarded-stance, undead-fortitude; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=attack when=at_will often=at_will
[reskin] word match declined by the call: bloodied-fury, guarded-stance, relentless-pursuit — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "blood-frenzy" has no key-table verb, but the call quotes "throws boulders" from the description
[reskin] signature template (trait): blood-frenzy -> Traits/"Quarrier's Eye" ("Advantage on attack rolls against creatures that don't have all their Hit Points [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Quarrier's Eye" -> "Blood Frenzy" — this row is blood-frenzy and does what every blood-frenzy row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Fist = none; Boulder = none; Cratering Throw = none; Burial Haul = none
[reskin] chassis nova: "Cratering Throw (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Stone Giant's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Giant" — the Stone Giant's
[reskin] print canon speed: 50 ft. -> 40 ft. — the Stone Giant's walk; the concept's other modes stay
[reskin] print canon attack: "Fist" -> "Stone Club" — the Stone Giant's own row
[reskin] print canon yields: "Stone Discus" is the seat's own row — print's name never lands on a template's body (see the melee loop)
[reskin] print canon: chassis row leaves — Actions/"Cratering Throw (Recharge 5-6)" is the seat's nova, not the Stone Giant's
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Stone Giant's
[reskin] print canon: chassis row leaves — Traits/"Surefooted" is the seat's, not the Stone Giant's
[reskin] print canon row: Reactions/Deflect Missile (Recharge 5-6) — the Stone Giant's own
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Stone Discus" [action/always/damage]
[reskin] asked but unanswered: "throws boulders" asked for at_will/at_will and no row binds the clause
[reskin] lint: 0 findings
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Stone Discus")
audit finding below confidence gate: Stone Club The club is a stone weapon but Stone Discus removes Bob's weapon by hurling it and has him recover it with movement, yet Stone Club still functions while Discus has been thrown — the block never says whether Club depends on holding the hurled stone.
[reskin] audit: [Stone Discus: The recovery clause is unplayable: i…s Speed is halved and it can't use this action.")]
[reskin] row repair not offered: Actions/"Stone Discus" is an attack row, and this path carries no attack form — the audit's fault stands on the sheet (The recovery clause is unplayable: if the slab lands in a sp)
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] hurls a stone so it bursts on impact, damaging and knocking down every creature in a small area — "Bob rips a great slab of stone from the ground or from the rubble around him and hurls it flat like a discus, so that it bursts apart on impact — every creature within the scattered stone's reach takes the splintering shrapnel and must save or be knocked Prone as the ground under them heaves." — Big Bob [seat: action [action/save/condition]] (closest offered: throw-retrieve) [effect: damage] [menu: throw-retrieve lure sensory-strike exploiter pacify escalating-dread terror-pulse reveal condition-payoff disarm execute slow-bolt curse-debt] [same-cell unoffered: swallow gaze-single snare seal shield-bash random-ray snare-bolt push-prone] [same-seat rejected: swallow:hold-shape trample:style leap:nova-taken thrown-burst:nova-taken gaze-single:style snare:body-verdict reel:hold-shape seal:role shield-bash:body-verdict hook-drag:role active-toll:role pull-through:role random-ray:body-verdict ground-burst:nova-taken spew:body-verdict burrow-ambush:movement obstacle-pull:role snare-bolt:body-verdict push-prone:role herd:role drain:role wind-up:role blighted-ground:role] [landed: throw-retrieve]
[reskin] signature tally: 1 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 1 · path twist
[reskin] multiattack re-read — "Stone Discus" joins the combination; "Bob makes three attacks, using Stone Club or Stone Discus in any combination."
[reskin] done: "Big Bob" — donor skirmisher-8-hurler, CR 9
[reskin] 2014 conversion: one lint-gated call — both printings saved
```

---

## 02. Old Marta — CR 5

**Input:** `name: Old Marta | ballista crew sergeant, fires a siege crossbow | role: artillery`
**Donor:** skirmisher-3 -> CR 5
**Signature:** library · **elapsed** 32s

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

Traits

Planted Sight. While Marta has not moved since her last Siege Crossbow attack against a creature, Marta ignores the bonus from Half Cover and Three-Quarters Cover when she makes a Siege Crossbow attack against that creature; only Full Cover protects against the shot.

Actions

Multiattack. Marta makes three Longsword attacks. It can replace one attack with a use of Siege Crossbow.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Siege Crossbow. Ranged Attack Roll: +5, range 80/320 ft. 13 (2d10 + 2) Piercing damage, and Marta has Advantage on its next attack roll against the target before the end of its next turn.

Ranging Bolt. Dexterity Saving Throw: DC 15, one creature within 60 feet. Failure: 11 (2d10) Piercing damage, and until the end of Marta's next turn the target sheds dim light in a 10-foot radius, it can't benefit from the Invisible condition, and attack rolls against it have Advantage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Marta can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Riposte. Trigger: A creature within 5 feet of Marta misses it with a melee attack roll. Response: Marta makes one Longsword attack against that creature.

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
[path] class_npc — class fighter — "sergeant" (call)
[route] skirmisher-archer type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: on the GM's own words "fires a siege crossbow" | is_a_swarm: the call reads none in these words | skirmisher-archer: ✓ ("fires a siege crossbow") | skirmisher-archer: key "crossbow" (class noun)
[concept] name: "Old Marta" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/forged mind=sapient style=archer energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Old Marta"
[concept] mechanics: none claimed
[concept] signature elements: siege crossbow on a fixed rest [object] | ranging a target before the killing shot [behavior] | hard iron discipline that holds the firing line [behavior]
[concept] identity: Old Marta sets up behind cover at extreme range, planting her siege crossbow on its rest and spending her first rounds finding the range while the line holds in front of her. Every round after that she looses one grinding, armor-piercing bolt and re-cranks, and when pressed she keeps shooting rather than brawling — she gives ground to her next firing position and lets the crew's discipline buy the seconds, fighting to the death only if the line collapses around her.
[concept] lore: A ballista crew sergeant who has outlived every crew she trained, Old Marta keeps an iron tally of the bolts she has fired and refuses to leave the field while anyone on it still needs ranging.
[reskin] [path] class body: the fighter stands on the Gladiator — the class's own print block, nearest CR 5
[reskin] print canon route: the Gladiator's body outranks the archer seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 90 -> 112, AC 16 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +7, DC 15 (print's)
[reskin] donor: skirmisher-3 -> CR 5
[reskin] seats: action <- "ranging a target before the killing shot" | trait <- "siege crossbow on a fixed rest"
[reskin] [path] decides: class_npc on the Gladiator · class fighter (the matcher would have said homebrew)
[reskin] print canon: "Old Marta — ballista crew sergeant, fires a siege crossbow" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Crossbow Stock" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade
[reskin] named parts: Siege Crossbow (slot, ranged) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] features: Vex on Siege Crossbow — the feature table, no call
[reskin] class kit: fighter — "sergeant": Riposte (riposte)
[reskin] proper noun: "Old Marta" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Marta" — the call's own answer (person), built from the name
[reskin] inline form: "Marta" — the model's own reading of the name
[reskin] the sheet's declared ask: burst — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "fires a siege crossbow" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "fires a siege crossbow" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Old Marta — ballista crew sergeant" -> has (descriptive), head | "fires a siege crossbow" -> has (mechanical) [asked: at_will/at_will/attack]
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "Old Marta looses a ranging bolt to find the mark, then visits the kill" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Once Old Marta has planted her siege crossbow and found the range agai" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 30 of 30 answered; not true of this body: gaze-single, snare, shield-bash, random-ray, spew, snare-bolt, blink, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "Old Marta looses a ranging bolt to find the mark, then visits the killing shot on the same creature before the end of her next turn: the target must make a Dexterity saving throw or be knocked Prone as the bolt punches through armor and stance alike." [action/save/condition] [family: mark] — menu: throw-retrieve, lure, ground-burst, sensory-strike, disarm, thrown-burst-seed, pacify, escalating-dread, terror-pulse, push-prone, reveal (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, snap-shot, affliction, contagion, stunning-strike, charge-push, pounce, isolation, bolt-mark, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — burst: throw-retrieve, ground-burst, thrown-burst-seed
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: throw-retrieve (always/damage), ground-burst (save/damage), thrown-burst-seed (save/damage)
[reskin] word match declined by the call: bolt-mark, push-prone, throw-retrieve — the key word does not mean the mechanic here
[reskin] signature template: reveal -> Actions/"Ranging Bolt" ("the ranging bolt that punishes the target: damage plus the target being marked s [verb: mark:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Once Old Marta has planted her siege crossbow and found the range against a creature, she ignores Half Cover and Three-Quarters Cover for her Siege Crossbow attacks against it, and her bolts grind through — no cover bonus, only full cover, counts against the shot." [trait/always/defense] [family: mark] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] verb gate stands down: trait — no template shares a verb, but 6 template(s) whose declared stamps match the idea (always/defense): bloodied-fury, death-restoration, shielded-mind, evasion, relic-object, undead-fortitude; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] word match declined by the call: bloodied-fury, guarded-stance, evasion, relentless-pursuit, pack-tactics, assassinate, bound — the key word does not mean the mechanic here
[reskin] seat answered, but: the call said "Once Old Marta has planted her siege crossbow and found the range against a creature, she ignores Half Cover and Three-Q" is carried by "Planted Sight", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("ignores partial cover bonuses for a chosen target once aimed, leaving ") and wrote a trait instead: "Planted Sight" -> Traits. While Marta has not moved since her last Siege Crossbow attack against a creature, Marta ignores the bonus from Half Cov
[reskin] authored row numbers: "Planted Sight" — the call declared 0 number(s) promised
[reskin] free signature row: "Planted Sight" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Planted Sight" is HANDED "Old Marta — ballista crew sergeant" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Planted Sight" ("Once Old Marta has planted her siege crossbow and found the range against a creature, she ignores Half Cover and Three-Quarters Cover for her Siege Crossbow att [authored: the catalog held no shape for it]")
[reskin] weapons answered: Crossbow Stock = club; Siege Crossbow = heavy crossbow
[reskin] weapon declared: "Crossbow Stock" is a club — the call's own answer (the name alone read crossbow)
[reskin] weapon dice keep the budget's die: "Crossbow Stock" is a club (d4), but 5d4 passes print's largest d4 attack row (3d4) — "17 (3d8 + 4)" stands
[reskin] weapon declared: "Siege Crossbow" is a heavy crossbow — the call's own answer (the name alone read crossbow)
[reskin] weapon dice follow the weapon: the GM's "Siege Crossbow" is a heavy crossbow (d10) — "17 (3d8 + 4)" becomes "15 (2d10 + 4)"
[reskin] weapon table: "Siege Crossbow" rolls Dexterity — +7 → +5
[reskin] weapon table: "Siege Crossbow" damage off Dexterity — 15 (2d10 + 4) → 13 (2d10 + 2)
[reskin] weapon table: "Siege Crossbow" — a launcher, never thrown, range 80/320
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Crossbow Stock" -> "Spear" — the Gladiator's own row
[reskin] print canon multiattack: "Marta makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon saves: proficient in STR, DEX, CON, WIS — the Gladiator's own set, at this sheet's stats and PB 3 (changed STR, CON, WIS)
[reskin] print canon skills: "Perception +4, Stealth +5" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon: chassis row leaves — Traits/"Relay Steps" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] print canon row: Reactions/Parry — the Gladiator's own
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a fighter fights with a longsword, not the Gladiator's
[reskin] multiattack reconciled: "Shield Bash" is no row on this sheet — the Multiattack cites "Siege Crossbow" instead
[reskin] free-row budget by card size: CR 5 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Planted Sight" [no template]
[reskin] ask vs row ok: "fires a siege crossbow" -> "Siege Crossbow" — trigger at_will, limit at_will
[reskin] lint: 0 findings
[reskin] element expressed: Planted Sight carries "ranging a target before the killing shot" — "While Marta has not moved since her last Siege Crossbow attack against a creatur"
[reskin] audit: [Ranging Bolt: A 'bolt' that fires from a crossbow … the target sheds dim light in a 10-foot radius"), Planted Sight: The trait has no defined action cos…r last Siege Crossbow attack against a creature"), Multiattack: The block switches referent mid-entry…. (about: "Marta makes three Longsword attacks.")]
[reskin] audit finding on the body: Actions/"Ranging Bolt" [reveal] — A 'bolt' that fires from a crossbow cannot make its target glows; the emission of light ha. a catalog row: the fix belongs in the template, once, for every creature on this body
[reskin] audit finding on the body: Actions/"Multiattack" [chassis] — The block switches referent mid-entry ('Marta' then 'It'), and the creature is a named Med. a catalog row: the fix belongs in the donor, once, for every creature on this body
[reskin] row repair: "Planted Sight" [free row] — the audit faults it (The trait has no defined action cost and no end condition keyed to an … (about: "While Marta has not moved since her last Siege Crossbow attack against a creature")); re-authored through the forms rather than evicted (the owner's ruling: a flagged row is repaired)
[reskin] free row repair declined: "Planted Sight" — the repair would make this sheet fail lint:unknown-action-ref, which it does not fail now; a flagged row beats a differently-flagged one, so the standing text keeps its place
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] clause unresolved: "Planted Sight" carries "Once Old Marta has planted her siege crossbow and found ", which matches no clause on the sheet — no coverage credit by id
[reskin] clause id by substring: "Riposte" carries "sergeant" which is not a whole clause — the seat surgery cut it; resolved to cl_9dw448
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] done: "Old Marta" — donor skirmisher-3, CR 5
```

---

## 03. Cinderpot Marauder — CR 6

**Input:** `catapult ogre that lobs burning pitch | role: artillery`
**Donor:** skirmisher-8-hurler -> CR 6 (invented — no printed peer)
**Signature:** library · **elapsed** 35s

### Block
```
Cinderpot Marauder
Large giant, chaotic evil
Armor Class

15 (natural armor)

Hit Points: 

110 (13d10 + 39)

Speed: 

40 ft.

STR	DEX	CON	INT	WIS	CHA


19 (+4)

	

16 (+3)

	

16 (+3)

	

5 (-3)

	

7 (-2)

	

7 (-2)

Skills: 

Perception +1, Stealth +6

Saving Throws: 

DEX +6, WIS +1

Damage Resistances: 

fire

Senses: 

darkvision 60 ft., passive Perception 11

Languages: 

Common, Giant

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Actions
Multiattack: The marauder makes three attacks, using Greatclub or Javelin. It can replace one attack with a use of Tar Snatch.
Greatclub: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage.
Javelin: Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 7 (1d8 + 3) piercing damage.
Tar Snatch: One creature within 30 feet must make a DC 15 Dexterity saving throw, taking 13 (3d8) fire damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also restrained until the end of its next turn.
```

### Trace
```
[path] twist — Ogre (is) — "ogre" (call)
[route] skirmisher-hurler type=Giant mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-hurler: ✓ ("lobs burning pitch") | skirmisher-hurler: key "lobs" (class verb)
[concept] hints: hurler→style ✓ ("lobs burning pitch")
[concept] resolve: archetype=skirmisher type=Giant themes=elemental/forged mind=sapient style=hurler energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: lobbing burning pitch pots [behavior] | magma-cracked hide and fire-scarred arms [body] | crude gut-and-sinew sling [object]
[concept] identity: The catapult ogre lumbers into position and plants its massive stone-flanged frame, using a crude gut-and-sinew sling to hurl clay pots of burning pitch in high arcs that burst into clinging fire on impact. Every round it reloads with practiced, stubborn rhythm, preferring to keep foes at a distance and punish any who cluster, and it fights to the death rather than abandon its stockpile of pitch. Its hide is cracked and fire-scarred, and its eyes gleam with a dull, stubborn cunning that knows only the joy of a well-aimed throw.
[concept] lore: Born in the volcanic badlands where pitch seeps from cracked earth, these ogres learned to harvest and hurl the burning tar, and they now guard their sticky caches with jealous, explosive fury.
[reskin] print canon array: STR 19, DEX 16, CON 16, INT 5, WIS 7, CHA 7 — the Ogre's, DEX fitted to +6
[reskin] donor: skirmisher-8-hurler -> CR 6 (invented — no printed peer)
[reskin] seats: package <- "magma-cracked hide and fire-scarred arms"
[reskin] [path] decides: twist on the Ogre (the matcher agrees)
[reskin] print canon: "catapult ogre that lobs burning pitch" heads on the Ogre — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the marauder" — the call's own answer (kind), built from the name
[reskin] inline form: "the marauder" — the model's own reading of the name
[reskin] returning clause dropped: "Pitchpot" throws a clay pitchpot — the call did not say this projectile is a single object the creature must recover (projectile_supply: ambient), so it stays where it lands; print writes a returning weapon 4 times in 1291 rows
[reskin] the sheet's declared ask: burst — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "lobs burning pitch" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "catapult ogre" -> has (descriptive), head | "lobs burning pitch" -> has (mechanical) [asked: at_will/save_area] [askMechanic: burst]
[reskin] open asks handed to the idea call: "lobs burning pitch" [burst] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The marauder hurls a pitchpot that bursts not on impact but in a cling" answers the GM's "lobs burning pitch"
[reskin] idea unanchored: trait — "The marauder's hide is cracked and fire-scarred, weeping thin lines of" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 29 of 29 answered; not true of this body: snare, shield-bash, snare-bolt, phase-slip, false-appearance, absorption, resonant-body, spider-climb, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, warded-mending, mimicry, gaze-aura, blurred-form, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "lobs burning pitch", so role and style do not filter the menu (legality still does); 13 template(s) offered
[reskin] menu pruned: action — thrown-burst-seed, push-prone (the sheet cannot render them)
[reskin] signature idea (action): "The marauder hurls a pitchpot that bursts not on impact but in a clinging sheet of burning tar. Each creature in a sphere must make a Dexterity saving throw; on a failure it takes Fire damage and has the Restrained condition (escape DC equal to the marauder's Pitchburst DC) as the tar pins it to the ground, and on a success it takes half damage and is not Restrained." [action/save/condition] [family: nova] — menu: condition-payoff, throw-retrieve, lure, sensory-strike, disarm, exploiter, execute, pacify, escalating-dread, terror-pulse, slow-bolt, curse-debt, reveal (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, rampage, lay-on-hands, snap-shot, riposte, answering-strike, stunning-strike, charge-push, pounce, isolation, bolt-mark, bolt-restrain, bolt-drag, charge)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — burst: throw-retrieve
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: throw-retrieve (always/damage), lure (save/condition), sensory-strike (save/condition)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=save_area when=at_will
[reskin] word match declined by the call: throw-retrieve, lure, sensory-strike, exploiter, pacify, escalating-dread, terror-pulse, reveal, condition-payoff, disarm, execute, slow-bolt, pounce — the key word does not mean the mechanic here
[reskin] authored row answers the GM: action — "Tar Snatch" was written for "lobs burning pitch", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("an area Dexterity save that restrains those who fail it") and wrote an action instead: "Tar Snatch" -> Actions. *Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* 13 (3d8) Fire damage, and the target has the Re
[reskin] authored row numbers: "Tar Snatch" — the call declared (unanswered) number(s) promised
[reskin] signature authored: no template — the seat wrote it -> Actions/"Tar Snatch" ("The marauder hurls a pitchpot that bursts not on impact but in a clinging sheet of burning tar. Each creature in a sphere must make a Dexterity saving throw; on [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The marauder's hide is cracked and fire-scarred, weeping thin lines of burning pitch. Whenever it takes Piercing or Slashing damage, searing tar sprays from the wound: each creature within 5 feet of it takes Fire damage." [trait/on_being_hit/damage] [family: body-reaction] — menu: heated-body, bloodied-burst (+ shelf: adhesive, phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate, death-burst, kill-denial)
[reskin] composed candidates on the menu: trait — composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2 (the body-reaction family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — burst: bloodied-burst
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does damage; leading: bloodied-burst (on_being_hit/damage), heated-body (on_being_hit/damage), composed:body-reaction:damage:t0 (on_being_hit/damage)
[reskin] keys would have bound: trait — heated-body, adhesive (burn, pitch)
[reskin] classification handed to the fit call: mechanic=thrown-weapon
[reskin] word match declined by the call: bloodied-burst, heated-body, composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2, adhesive, bloodied-fury — the key word does not mean the mechanic here
[reskin] seat answered, but: the call said "Whenever it takes Piercing or Slashing damage, searing tar sprays from the wound: each creature within 5 feet of it take" is carried by "Weeping Pitch", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The marauder's hide is cracked and fire-scarred, weeping thin lines of" and wrote no row of that kind (refused: "Weeping Pitch" — the call counts 3 number(s) the row promises and only 2 are written — a promised amount, area or bonus with no number cannot be run) (it belongs in the description); the nearest template stands in
[reskin] closest refused — subject flipped: trait — the call named "heated-body" nearest and judged its subject FLIPPED against the clause (sprays Fire damage at creatures within 5 feet when it takes Piercing o); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key heated-body, adhesive, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "heated-body" is keyed by the GM's burn and was on the call's menu, which the call read as a collision, not the mechanic; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "The marauder's hide is cracked and fire-scarred, weeping thin lines of burning pitch. Whenever it takes Piercing or Slashing damage, searing tar sprays from the wound: each creature within 5 feet of it takes Fire damage." [trait/on_being_hit/damage] — the model found no template that holds it (offered: bloodied-burst, heated-body, composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2, adhesive, bloodied-fury)
[reskin] weapons answered: Fist = none; Pitchpot = none; Pitchburst = none; Tar Snatch = none
[reskin] weapon table: "Pitchpot" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] chassis nova: "Pitchburst (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon type: the call answered type_source=user for giant, but the GM's words do not name it — the Ogre's own type stands
[reskin] print canon alignment: Neutral Evil -> Chaotic Evil — the Ogre's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Giant" — the Ogre's
[reskin] print canon speed: 50 ft. -> 40 ft. — the Ogre's walk; the concept's other modes stay
[reskin] print canon row frame: "Javelin" keeps print's thrown frame — reach 5 ft. or range 30/120 ft.
[reskin] print canon row: Actions/Javelin — the Ogre's second melee row, beside the chassis's
[reskin] rider folded: "Fist" keeps its budget — the chassis's rider half (4) folds into the base; the Ogre pays no damage rider of its own
[reskin] print canon attack: "Fist" -> "Greatclub" — the Ogre's own row
[reskin] ranged row off: "Pitchpot" leaves — the Ogre carries no ranged row and the words name none
[reskin] multiattack re-read — "Pitchpot" left; "Multiattack" now reads "The marauder makes three attacks, using Greatclub, or Javelin in any combination."
[reskin] defenses by material: a pitch body is vulnerable to Fire and never resists, absorbs, or ignores it (named by the GM's words, the call having named no material the table knows) — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] element immunity withheld: Fire — the body's material is vulnerable to it
[reskin] resistances derived: Fire
[reskin] print canon: chassis row leaves — Actions/"Pitchburst (Recharge 5-6)" is the seat's nova, not the Ogre's
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Ogre's
[reskin] print canon: chassis row leaves — Traits/"Unstoppable Lumber" is the seat's, not the Ogre's
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Tar Snatch.
[reskin] multiattack normalised: "The marauder makes three attacks, using Greatclub or Javelin in any combination. It can repl"
[reskin] ask vs row ok: "lobs burning pitch" -> "Tar Snatch" — trigger at_will
[reskin] lint: 0 findings
[reskin] audit: [Tar Snatch: Tar Snatch is a Dexterity save that im… of sight. (about: "one creature within 30 feet"), Tar Snatch: The name promises a snatch — grabbing,…ar as the described medium. (about: "Tar Snatch"), Tar Snatch: Restrained applied by Tar Snatch is th…rained condition until the end of its next turn")]
[reskin] audit rename blocked — "Burning Grip" promises the Grappled condition that "Tar Snatch" does not deliver
[reskin] row repair: "Tar Snatch" [authored] — the audit faults it (Tar Snatch is a Dexterity save that imposes Restrained, but nothing co… (about: "one creature within 30 feet") | Restrained applied by Tar Snatch is the marauder's signature pay-off, … (about: "The target has the Restrained condition until the end of its next turn")); re-authored through the forms rather than evicted (the owner's ruling: a flagged row is repaired)
[reskin] free row repaired: "Tar Snatch": "*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure" -> "*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* 13 (3d8) Fire dam"
[reskin] [gap] sprays Fire damage at creatures within 5 feet when it takes Piercing or Slashing damage, triggered by the damage type it — "The marauder's hide is cracked and fire-scarred, weeping thin lines of burning pitch. Whenever it takes Piercing or Slashing damage, searing tar sprays from the wound: each creature within 5 feet of it takes Fire damage." — Cinderpot Marauder [seat: trait [trait/on_being_hit/damage]] (closest offered: heated-body) [effect: damage] [menu: bloodied-burst heated-body composed:body-reaction:damage:t0 composed:body-reaction:damage:t1 composed:body-reaction:damage:t2 adhesive bloodied-fury] [same-cell unoffered: resonant-body ward-retaliation snap-shot riposte answering-strike] [same-seat rejected: absorption:body-verdict resonant-body:body-verdict weapon-lodge:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 1 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Cinderpot Marauder" — donor skirmisher-8-hurler, CR 6
[reskin] 2014 conversion: one lint-gated call — both printings saved
```

---

## 04. Salthusk Champion — CR 4

**Input:** `net-and-trident arena fighter who pins people | role: controller`
**Donor:** skirmisher-8-hurler -> CR 4 (invented — no printed peer)
**Signature:** library · **elapsed** 32s

### Block
```
Salthusk Champion

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

Ring Footwork. When a creature within the champion's reach misses it with an attack, the champion shifts up to half its Speed without provoking Opportunity Attacks; if it ends this shift within reach of the creature that missed, it can make one Trident attack against that creature, which deals an extra 5 (1d10) Piercing damage on a hit.

Sandfoot. The champion ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The champion makes two Trident attacks. It can replace one attack with a use of Binding Snare.

Trident. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 20/60 ft. 13 (2d8 + 4) Piercing damage, and the target is subjected to the following effect. Strength Saving Throw: DC 14. Failure: The target has the Prone condition.

Weighted Cast (Recharge 5-6). The champion hurls its weighted net at a point it can see within 90 feet. Dexterity Saving Throw: DC 13, each creature in a 5-foot-radius Sphere centered on that point. Failure: 24 (7d6) Bludgeoning damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Binding Snare. Dexterity Saving Throw: DC 13, one Large or smaller creature the champion can see within 60 feet. Failure: The target is caught in binding and has the Restrained condition until the binding is destroyed (AC 10; HP 10; Vulnerability to Fire damage; Immunity to Poison and Psychic damage).

Bonus Actions

Fleet Agility. The champion takes the Dash or Disengage action.

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
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon, snare — casts: the call reads no worked magic here | hold_shape: reach on the GM's own words "net-and-trident arena fighter who pins p" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-hurler: ✓ ("net-and-trident arena fighter who pins p") | skirmisher-hurler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=grasping/armed mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon, snare
[concept] signature elements: net-throwing to pin and restrain [object] | trident work at reach [object] | arena showman's timing and goading [behavior]
[concept] identity: The arena fighter opens by hurling its weighted net over a cluster of foes, then closes on the tangled target with its trident, using the three prongs to pin limbs and clothes to the ground while it circles and goads the crowd. It fights at reach, stepping back out of a pinned enemy's swing and re-throwing the net at anyone who breaks free, threading the trident through the mesh to keep prey helpless; if badly bloodied it retreats behind its net and fights with the desperate precision of a performer who knows a loss means the sand.
[concept] lore: A retired pit champion of the coastal fighting rings, it still carries the salt-stained net and trident of a hundred bouts and takes any challenger it meets as one more match to be won before a crowd only it can see.
[reskin] donor: skirmisher-8-hurler -> CR 4 (invented — no printed peer)
[reskin] seats: action <- "arena showman's timing and goading" | trait <- "trident work at reach"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] named parts: Trident (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] ranged row off: "Net" leaves — the thrown part is the ranged row
[reskin] features: Topple on Trident — the feature table, no call
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the champion" — the call's own answer (kind), built from the name
[reskin] inline form: "the champion" — the model's own reading of the name
[reskin] final price: the chassis's Multiattack: the round ran 22 against the card's 30 — the attack rows re-solve at 136% (2 attacks on an authored sheet, under the card)
[reskin] the sheet's declared ask: snare — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "net-and-trident arena fighter" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "net-and-trident arena fighter" -> has (mechanical) [asked: at_will/attack] | "pins people" -> has (mechanical) [asked: on_hit/condition] [askMechanic: snare]
[reskin] open asks handed to the idea call: "pins people" [snare]
[reskin] idea anchored: action — "The champion whips its trident up and gives a barked arena taunt at a " answers the GM's "pins people"
[reskin] idea unanchored: trait — "Sandfoot and the ring's old footwork: the champion moves along the edg" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 23 of 23 answered; not true of this body: coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial
[reskin] menu: taste stands down — action answers the GM's "pins people", so role and style do not filter the menu (legality still does); 8 template(s) offered
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The champion whips its trident up and gives a barked arena taunt at a creature it can see: the target makes a Wisdom saving throw. On a failure it has the Frightened condition until the end of its next turn, and it must spend its movement on its turn moving straight toward the champion, unable to end that move farther from it than it started." [bonus_action/save/condition] [family: mark] — menu: patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, rampage, lay-on-hands (+ shelf: snare, condition-payoff, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, execute, hook-drag, obstacle-pull, pacify, escalating-dread, terror-pulse, slow-bolt, curse-debt, reveal, bolt-mark, bolt-restrain, bolt-drag)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: aggro-curse (save/movement), execute (save/damage), patient-defense (always/defense)
[reskin] keys would have bound: action — snare, snare-bolt, bolt-restrain (net, pins)
[reskin] classification handed to the fit call: mechanic=thrown-weapon, snare shape=attack when=at_will
[reskin] word match declined by the call: aggro-curse, feint-slip — the key word does not mean the mechanic here
[reskin] authored row answers the GM: action — "Arena's Beckon" was written for "pins people", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("fixes a frightened target's movement to close on the taunter instead o") and wrote a bonus action instead: "Arena's Beckon" -> Bonus Actions. *Wisdom Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has the Frightened condition until the 
[reskin] authored row numbers: "Arena's Beckon" — the call declared (unanswered) number(s) promised
[reskin] value check: "Arena's Beckon" EV 1.4 vs floor 1.6 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Arena's Beckon" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: aggro-curse left the shelf — the call declined it for this sheet
[reskin] one nova: "Binding Snare" — the seed's gate leaves; the chassis nova stands
[reskin] value check: "Binding Snare" EV 5.5 vs floor 5.2 (one attack of 2) — worth the trade
[reskin] library seed drawn: snare -> Actions/"Binding Snare" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Sandfoot and the ring's old footwork: the champion moves along the edges of a fight, and whenever a creature within its reach misses it with an attack, the champion can step into the opening, shifting up to half its speed without provoking Opportunity Attacks." [trait/always/movement] [family: sentinel] — menu: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), relentless-pursuit (always/movement), bound (always/movement)
[reskin] classification handed to the fit call: mechanic=thrown-weapon, snare shape=attack when=at_will
[reskin] word match declined by the call: terrain-walk, relentless-pursuit, bound, blood-frenzy, pack-tactics — the key word does not mean the mechanic here
[reskin] seat answered, but: the call said "Sandfoot and the ring's old footwork: the champion moves along the edges of a fight, and whenever a creature within its " is carried by "Ring Footwork", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("an attack that pins or restrains the target it hits") and wrote a trait instead: "Ring Footwork" -> Traits. When a creature within the champion's reach misses it with an attack, the champion shifts up to half its Speed without p
[reskin] authored row numbers: "Ring Footwork" — the call declared 1 number(s) promised
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Ring Footwork" ("Sandfoot and the ring's old footwork: the champion moves along the edges of a fight, and whenever a creature within its reach misses it with an attack, the cham [authored: the catalog held no shape for it]")
[reskin] repair: 1 clause(s) with no row — "pins people"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [{"clause":"pins people","row":"Binding Snare"}], unplaced []
[reskin] clause already answered: "pins people" is carried by "Binding Snare" in different words — the call read the sheet and declined to answer it twice
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Trident = trident; Net = none; Weighted Cast = none; Pinning Prongs = trident
[reskin] chassis nova: "Weighted Cast (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "net-and-trident arena fighter who pins p" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Binding Snare.
[reskin] free-row budget by card size: CR 4 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Ring Footwork" [no template]
[reskin] ask vs row ok: "net-and-trident arena fighter" -> "Trident" — trigger at_will
[reskin] ask vs row MISMATCH: "pins people" -> "Binding Snare" — trigger: asked on_hit, row reads at_will
[reskin] save re-derived after a retype: Actions/Trident — a Constitution save for a condition the row IMPOSES, which calls for Strength or Dexterity (A2: a condition the row merely requires does not pick the stat)
[reskin] lint: 0 findings
[reskin] element claim revoked: "Ring Footwork" claims "net-throwing to pin and restrain" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Ring Footwork")
[reskin] audit: [Ring Footwork: The name promises evasive footwork …t turn deals an extra 5 (1d10) Piercing damage."), Ring Footwork: The granted shift has no built-in p…its Speed without provoking Opportunity Attacks")]
[reskin] audit rename blocked — "Ring Footwork" -> "Counterstep" would drop the GM's own words "ring", "footwork" from a row bound to "Sandfoot and the ring's old footwork: the champion moves along the edges of a fight, and whenever a creature within its "; the mechanic would stay and the receipt would not
[reskin] row repair: "Ring Footwork" [free row] — the audit faults it (The granted shift has no built-in payoff at this creature's reach and … (about: "the champion shifts up to half its Speed without provoking Opportunity Attacks")); re-authored through the forms rather than evicted (the owner's ruling: a flagged row is repaired)
[reskin] free row repaired: "Ring Footwork": "When a creature within the champion's reach misses it with an attack, " -> "When a creature within the champion's reach misses it with an attack, the champion shifts "
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Binding Snare) — the sameness metric
[reskin] clause unresolved: "Ring Footwork" carries "Sandfoot and the ring's old footwork: the champion moves", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Salthusk Champion" — donor skirmisher-8-hurler, CR 4
```

---

## 05. Loom Hall Orb-Weaver — CR 5

**Input:** `giant spider that webs up the whole room | role: controller`
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 29s

### Block
```
Loom Hall Orb-Weaver
Large beast, unaligned
Armor Class

13 (natural armor)

Hit Points: 

93 (11d10 + 33)

Speed: 

30 ft., climb 30 ft.

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

Senses: 

darkvision 60 ft., tremorsense 30 ft., passive Perception 13

Languages: 

None

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Web Walker.The orb-weaver ignores movement restrictions caused by webs, and the orb-weaver knows the location of any other creature in contact with the same web.

Actions
Multiattack: The orb-weaver makes two Bite attacks.
Bite: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage plus 7 (2d6) poison damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained.
Venom Burst (Recharge 5-6): Each creature in a 15-foot-radius sphere centered on a point within 60 feet must make a DC 14 Dexterity saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one.
```

### Trace
```
[path] homebrew — "giant spider that webs up the whole room" (call)
[route] brute-grappler type=Beast mechanics=grapple, engulf, snare — casts: the call reads no worked magic here | hold_shape: reach on the GM's own words "webs up the whole room" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("webs up the whole room") | brute-grappler: no line key in the words — the model's read of its quote
[concept] hints: spider→canon ✓ ("giant spider that webs up")
[concept] resolve: archetype=brute type=Beast themes=bestial/grasping mind=bestial style=grappler energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf, snare
[concept] signature elements: webs up the whole room into a killing lattice [behavior] | thick silk dragline nooses and gummed sheets [body] | venom-dripping fangs for pinned prey [body]
[concept] identity: The giant spider opens by seeding the room with thick, load-bearing sheets of silk, then reels prey into whatever lattice it has already anchored — harrying, tripping, and pinning with dragline nooses rather than closing to bite. It is a patient trapper that repositions its web-fortress each round, denying ground and forcing foes through strand tangles; when wounded it retreats up its own retreat lines, never abandoning a still-standing snare, and fights to the death only to defend its egg-heavy labyrinth.
[concept] lore: An overgrown orb-weaver that hollowed a dungeon hall into a silk labyrinth and now rules it as a living cat's-cradle, feeding on whatever stumbles into the sweet-smelling dark.
[reskin] donor: brute-5-grappler -> CR 5
[reskin] seats: action <- "webs up the whole room into a killing lattice" | trait <- "thick silk dragline nooses and gummed sheets"
[reskin] [path] decides: homebrew (the matcher would have said twist Giant Spider)
[reskin] engulf engine: Cocoon — the body's own verb
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the orb-weaver" — the call's own answer (kind), built from the name
[reskin] inline form: "the orb-weaver" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: snare — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "webs up the whole room" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "giant spider" -> has (descriptive), head | "webs up the whole room" -> has (mechanical) [asked: at_will/save_area] [askMechanic: zone]
[reskin] open asks handed to the idea call: "webs up the whole room" [zone] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The orb-weaver flings a wide, anchoring sheet of silk that unfurls int" answers the GM's "webs up the whole room"
[reskin] idea unanchored: trait — "The orb-weaver moves through its own webbing without penalty, and whil" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 32 of 32 answered; not true of this body: shield-bash, active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, terrain-walk, aberrant-ground, faultless-tracker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, life-drain
[reskin] engulf engine withheld: Bonus Actions/"Cocoon" leaves — the route call read this creature's hold as reach, not contain; the grapple stands and citations of the row are swept
[reskin] menu: taste stands down — action answers the GM's "webs up the whole room", so role and style do not filter the menu (legality still does); 21 template(s) offered
[reskin] menu pruned: action — exploiter (the sheet cannot render them)
[reskin] signature idea (action): "The orb-weaver flings a wide, anchoring sheet of silk that unfurls into a broad square centered on a point it can see, filling that area with thick, load-bearing webbing. Each creature in the area must succeed on a Dexterity saving throw or have the Restrained condition (escape DC equal to the weaver's escape DC) until it destroys the webbing or is freed; the sheet remains for the duration, creati" [action/save/condition] [family: zone] — menu: leap, condition-payoff, hook-drag, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, trample, reel, execute, lure, pull-through, obstacle-pull, pacify, slow-bolt, sensory-strike, disarm, curse-debt, reveal (+ shelf: delayed-brand, second-wind, aggro-curse, self-invisibility, focus, coating, rampage, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte, affliction, contagion, stunning-strike, charge-push, pounce, isolation, charge)
[reskin] lead by this seat's own clause: action — "zone" from the clause this seat serves, not the sheet's "snare"
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: escalating-dread (save/condition), terror-pulse (save/condition), push-prone (save/condition)
[reskin] classification handed to the fit call: mechanic=grapple, engulf, snare shape=save_area when=at_will
[reskin] word match declined by the call: escalating-dread, terror-pulse, push-prone, lure, pacify, sensory-strike, reveal, condition-payoff, hook-drag, ground-burst, thrown-burst-seed, wind-up, trample, reel, execute, pull-through, obstacle-pull, slow-bolt, disarm, curse-debt — the key word does not mean the mechanic here
[reskin] seat authoring refused: action — the authored row re-imposes Restrained, which this sheet's own attack row already applies; that fiction belongs in the attack's rider and the nearest template stands in
[reskin] closest accepted: action — the call refused every template but named "thrown-burst-seed" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: flings a sheet that stays put and restrains anyone caught in the square, rather )
[reskin] value check: "Room-Webbing Sheet (Recharge 5-6)" EV 18.6 vs floor 18.8 (the whole Multiattack (2 attacks)) — dice 17 → 19 (nova budget); priced at the floor: dice 19 → 24 (the cap binds; the cap is the price)
[reskin] signature template: thrown-burst-seed -> Actions/"Room-Webbing Sheet (Recharge 5-6)" ("The idea is a wide-area silk sheet that restrains creatures in a square; none of [verb: throw:idea]")
[reskin] signature idea (trait): "The orb-weaver moves through its own webbing without penalty, and while touching a web it has spun or anchored, it can use a bonus action to reel itself along a strand up to its speed without provoking opportunity attacks—its body is built to traverse the killing lattice it has seeded." [trait/always/movement] [family: breach] — menu: adhesive, spider-climb, phobia, web-walker, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), web-walker (always/movement), relentless-pursuit (always/movement)
[reskin] keys would have bound: trait — web-walker (web, webs, spider)
[reskin] classification handed to the fit call: mechanic=grapple, engulf, snare shape=save_area when=at_will
[reskin] word match declined by the call: adhesive, spider-climb, bound — the key word does not mean the mechanic here
[reskin] signature template (trait): web-walker -> Traits/"Web Walker" ("The creature ignores movement restrictions caused by webs and knows the location [verb: web:concept, webs:concept, spider:concept, webbing:idea, strand:idea, strands:idea, weaver:idea]")
[reskin] weapons answered: Bite = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Beast speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "giant spider that webs up the whole room" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] row binds its clause: "Web Walker" answers "webs up the whole room" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "webs up the whole room" -> "Web Walker" — trigger at_will
[reskin] lint: 0 findings
audit finding below confidence gate: Bite Bite applies Grappled and Restrained but does not describe any silk binding or pulling the target to the weaver, so the grapple lacks the body the fiction implies.
[reskin] audit: [Room-Webbing Sheet (Recharge 5-6): The webbing she…24 (7d6) Poison damage. *Success:* Half damage."), Web Walker: Nothing in the block creates a web for…any other creature in contact with the same web")]
[reskin] audit rename: "Room-Webbing Sheet (Recharge 5-6)" -> "Venom Burst (Recharge 5-6)"
[reskin] audit finding on the body: Traits/"Web Walker" [web-walker] — Nothing in the block creates a web for creatures to be 'in contact with,' so the trait's s. a catalog row: the fix belongs in the template, once, for every creature on this body
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] flings a sheet that stays put and restrains anyone caught in the square, rather than a one-shot burst — "The orb-weaver flings a wide, anchoring sheet of silk that unfurls into a broad square centered on a point it can see, filling that area with thick, load-bearing webbing. Each creature in the area must succeed on a Dexterity saving throw or have the Restrained condition (escape DC equal to the weaver's escape DC) until it destroys the webbing or is freed; the sheet remains for the duration, creati" — Loom Hall Orb-Weaver [seat: action [action/save/condition]] (closest offered: thrown-burst-seed) [effect: condition] [menu: escalating-dread terror-pulse push-prone lure pacify sensory-strike reveal leap condition-payoff hook-drag ground-burst thrown-burst-seed wind-up trample reel execute pull-through obstacle-pull slow-bolt disarm curse-debt] [same-cell unoffered: swallow gaze-single snare seal shield-bash random-ray snare-bolt exploiter] [same-seat rejected: swallow:hold-shape thrown-burst:style gaze-single:role snare:role seal:role shield-bash:body-verdict active-toll:body-verdict random-ray:body-verdict spew:body-verdict burrow-ambush:movement snare-bolt:role herd:body-verdict drain:body-verdict blighted-ground:role] [landed: thrown-burst-seed]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 1 · path homebrew
[reskin] done: "Loom Hall Orb-Weaver" — donor brute-5-grappler, CR 5
[reskin] 2014 conversion: one lint-gated call — both printings saved
```

---

## 06. Sister Maudra — CR 7

**Input:** `name: Sister Maudra | cleric of the drowned god | role: controller`
**Donor:** caster-6 -> CR 7
**Signature:** library · **elapsed** 31s

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
Multiattack: Maudra makes three attacks, using Radiant Flame or Mace. It can replace one attack with a use of Drowned God's Hymn.
Radiant Flame: Ranged Weapon Attack: +6 to hit, range 120 ft., one target. Hit: 16 (3d8 + 3) radiant damage.
Spellcasting: Maudra casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14): - At will: Light, Thaumaturgy, Fog Cloud, Detect Magic
1/day each: Spirit Guardians, Blindness/Deafness
Drowned God's Hymn: Each creature within 30 feet of the sister must succeed on a DC 15 Wisdom saving throw or be charmed until the end of its next turn.
Mace: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
```

### Trace
```
[path] class_npc — class cleric — "cleric" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "cleric of the drowned god" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("cleric of the drowned god") | caster-warpriest: key "cleric" (class noun)
[concept] name: "Sister Maudra" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: warpriest→style ✓ ("armored battle-cleric with mace and cens")
[concept] resolve: archetype=caster type=Humanoid themes=aquatic/grave mind=sapient style=warpriest energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Sister Maudra"
[concept] mechanics: none claimed
[concept] signature elements: suffocating brine-fog [aura] | drowned god's hymn [behavior] | salt-crusted censer [object]
[concept] identity: Sister Maudra wades into battle behind a wall of brine-soaked prayer, her iron censer trailing clouds of suffocating salt-mist that blind and choke her foes. Every round she anchors a zone of drowning pressure, forcing enemies to fight through holy fog while her mace cracks those who close. She does not flee; she retreats only to reposition her fog, singing hymns to the drowned god as she drowns the field.
[concept] lore: Once a temple orphan saved from a shipwreck, Maudra now preaches that the sea's embrace is the only true baptism, gathering a flock of the desperate to drown the dry world in the god's name.
[reskin] energy withheld: Cold on a Humanoid with no Cold in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the cleric stands on the Priest — the class's own print block, nearest CR 7
[reskin] print canon route: the Priest's body outranks the warpriest seat — no verb in the words names it; the plain caster line
[reskin] print canon casting stat: the Priest casts with WIS; the caster line's INT striker reseats there
[reskin] print canon array: STR 16, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, WIS fitted to +6
[reskin] donor: caster-6 -> CR 7
[reskin] seats: action <- "drowned god's hymn" | trait <- "suffocating brine-fog"
[reskin] [path] decides: class_npc on the Priest · class cleric (the matcher would have said twist Priest)
[reskin] print canon: "Sister Maudra — cleric of the drowned god" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: cleric — "cleric": Divine Aid (3/Day) (Priest/Divine Aid)
[reskin] proper noun: "Sister Maudra" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Maudra" — the call's own answer (person), built from the name; the rules would have said "the sister"
[reskin] inline on kit rows: "the sister" -> "Maudra"
[reskin] inline form: "Maudra" — the model's own reading of the name
[reskin] control spell gated to daily — Blindness/Deafness (level 2 control at will is print's CR 13+ shape; at CR 7 it is 1/Day)
[reskin] daily spell dropped — Cone of Cold (36 avg vs 15 per-hit; print's only daily damage spell is the Adult Red's Fireball at ~1.1x)
[reskin] spell DC coherence: Intelligence 13 -> 18 so DC 15 derives
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Sister Maudra — cleric of the drowned god" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "Maudra raises her voice in the drowned god's hymn, and the air around " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Maudra's censer trails a wake of stinging salt-mist that clings to her" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 34 of 34 answered; not true of this body: gaze-single, snare, seal, active-toll, random-ray, snare-bolt, drain, blighted-ground, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, spider-climb, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Maudra raises her voice in the drowned god's hymn, and the air around her becomes a choir of brine. Each enemy within the hymn's reach must succeed on a Wisdom saving throw or be Frightened until the end of its next turn; while Frightened in this way, it cannot speak or cast spells with verbal components as salt water fills its throat." [action/save/condition] [family: zone] — menu: thrown-burst, zone, execute, wail, lure, ground-burst, spew, pacify, escalating-dread, slow-bolt, sensory-strike, herd, thrown-burst-seed, curse-debt, zone-seed, reveal, wind-up, terror-pulse, push-prone (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, bolt-restrain, bolt-drag, bolt-mark)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), pacify (save/condition), escalating-dread (save/condition)
[reskin] word match declined by the call: lure, escalating-dread, sensory-strike, pacify, wail, herd — the key word does not mean the mechanic here
[reskin] seat answered, but: the call said "Each enemy within the hymn's reach must succeed on a Wisdom saving throw or be Frightened until the end of its next turn" is carried by "Drowned God's Hymn", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("Riders the Frightened condition with muted voice (no speaking, no verb") and wrote an action instead: "Drowned God's Hymn" -> Actions. *Wisdom Saving Throw*: DC 15, each creature in a 30-foot Emanation originating from the sister. *Failure:* The target ha
[reskin] authored row numbers: "Drowned God's Hymn" — the call declared (unanswered) number(s) promised
[reskin] seat takes its clause: "Drowned God's Hymn" is HANDED "Sister Maudra — cleric of the drowned god" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Drowned God's Hymn" ("Maudra raises her voice in the drowned god's hymn, and the air around her becomes a choir of brine. Each enemy within the hymn's reach must succeed on a Wisdom  [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Maudra's censer trails a wake of stinging salt-mist that clings to her. The space she moves through is lightly obscured and leaves a residue of brine; a creature that starts its turn in this residue must succeed on a Constitution saving throw or be Poisoned until the start of its next turn." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura
[reskin] verb gate stands down: trait — no template shares a verb, but 2 template(s) whose declared stamps match the idea (start_of_turn/condition): truth-aura, fear-aura; the declared data is the warrant and the call is worth making
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] row composed from the family's own options: trait — composed:zone:condition:poisoned: the call picked it off the menu (what no printed template did: unstated)
[reskin] free signature row: trait — "composed:zone:condition:poisoned" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "suffocating brine-fog" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 2
[reskin] free signature row: "Brine Wake" — the trait seat cannot quote the GM, but the call names the element it expresses: "suffocating brine-fog". Earns no clause credit; the twist/class path allows 1 and this is number 3
[reskin] seat takes its clause: "Brine Wake" is HANDED "Sister Maudra — cleric of the drowned god" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): composed:zone:condition:poisoned -> Traits/"Brine Wake" ("the idea's salt-mist residue poisons creatures that start their turn in it; the  [shape fit, no verb match]")
[reskin] weapons answered: Iron Censer = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Neutral Evil -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Mace — the Priest's own melee row, added (the chassis carried none to rename)
[reskin] print canon attack: "Iron Censer" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon: chassis row leaves — Reactions/"Protective Magic (3/Day)" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon: spell list topped up — the Priest's list is written for CR 2 and this sheet is CR 7; print's own spells stand and the chassis's add Fog Cloud, Detect Magic, Blindness/Deafness to reach print's dedicated-caster size at this CR (5 at will, 4 daily)
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Drowned God's Hymn.
[reskin] free row over budget: Traits/"Brine Wake" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Drowned God's Hymn" [no template]
[reskin] lint: 0 findings
[reskin] element expressed: Drowned God's Hymn carries "drowned god's hymn" — "The target has the Frightened condition until the end of its next turn."
[reskin] audit: [Drowned God's Hymn: A 'Drowned God's Hymn' that on… 30-foot Emanation originating from the sister."), Drowned God's Hymn: The row frightens every creatu…a 30-foot Emanation originating from the sister")]
[reskin] row repair: "Drowned God's Hymn" [free row] — the audit faults it (A 'Drowned God's Hymn' that only frightens nearby creatures is a fear … (about: "*Wisdom Saving Throw*: DC 15, each creature in a 30-foot Emanation originating from the sister.") | The row frightens every creature in the emanation, including allies, y… (about: "each creature in a 30-foot Emanation originating from the sister")); re-authored through the forms rather than evicted (the owner's ruling: a flagged row is repaired)
[reskin] free row repaired: "Drowned God's Hymn": "*Wisdom Saving Throw*: DC 15, each creature in a 30-foot Emanation ori" -> "*Wisdom Saving Throw*: DC 15, each creature in a 30-foot Emanation originating from the si"
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 14 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] clause unresolved: "Drowned God's Hymn" carries "Maudra raises her voice in the drowned god's hymn, and t", which matches no clause on the sheet — no coverage credit by id
[reskin] clause id by substring: "Divine Aid (3/Day)" carries "cleric" which is not a whole clause — the seat surgery cut it; resolved to cl_15iahn1
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] multiattack re-read — "Mace" joins the combination; "Maudra makes three attacks, using Radiant Flame or Mace in any combination. It can replace"
[reskin] done: "Sister Maudra" — donor caster-6, CR 7
[reskin] 2014 conversion: one lint-gated call — both printings saved
```

---

## 07. Skyfeud — CR 8

**Input:** `storm sorcerer who rains lightning | role: artillery`
**Donor:** caster-6 -> CR 8
**Signature:** library · **elapsed** 30s

### Block
```
Skyfeud

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

Traits

Brine-Shell. While Skyfeud isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. Skyfeud makes three Arcane Burst attacks. It can replace one attack with a use of Lightning Sheeting.

Arcane Burst. Melee or Ranged Attack Roll: +8, reach 5 ft. or range 120 ft. 18 (3d8 + 5) Force damage.

Spellcasting. Skyfeud casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 16):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Lightning Sheeting. Constitution Saving Throw: DC 16, one creature within 30 feet. Failure: 21 (6d6) Lightning damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Bonus Actions

Misty Step (3/Day). Skyfeud casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Trigger: Skyfeud is hit by an attack roll. Response: Skyfeud casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
[route] caster (artillery) type=Humanoid mechanics=none — casts: on the GM's own words "storm sorcerer who rains lightning" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("storm sorcerer who rains lightning") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid themes=elemental/aerial mind=sapient style=— energy=Lightning mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: raining lightning from above [behavior] | storm-shell of brine and thunder [body] | circling squall that repositions between strikes [aura]
[concept] identity: A storm sorcerer who has traded flesh for living storm, this figure opens combat by hurling crackling lightning bolts from the sky before settling into a steady rhythm of thunderous blasts at range, keeping its distance and repositioning rather than brawling. It fights with cold, calculating malice, singling out the most dangerous foes with concentrated strikes and fleeing bloodied only when its storm-shell is truly spent — otherwise it toys with prey by raining bolts in widening arcs until none remain standing.
[concept] lore: Born of a shipwreck-drowned sorcerer whose dying curse fused her spirit with the squall that claimed her, she now wanders the open sky seeking the tempest that birthed her new form, eager to share its thunder with anyone who crosses her path.
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 8
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 20, WIS 12, CHA 11 — the Mage's, INT fitted to +8
[reskin] donor: caster-6 -> CR 8
[reskin] seats: action <- "raining lightning from above" | trait <- "storm-shell of brine and thunder"
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said twist Mage)
[reskin] print canon: "storm sorcerer who rains lightning" heads on the Mage — print's rows ride along; the seat stays
[reskin] name_element answered: Lightning Lash = literal
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "sorcerer": nothing to add — the sheet already answers it
[reskin] inline by rule: "Skyfeud" — the call answered "the Skyfeud" (kind), which the name does not support
[reskin] inline on kit rows: "the skyfeud" -> "Skyfeud"
[reskin] spell DC coherence: DC 15 -> 16 off Intelligence 20 (the stat makes the attack rolls)
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + Intelligence's 5) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "rains lightning" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "rains lightning" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "storm sorcerer" -> has (descriptive), head | "rains lightning" -> has (mechanical) [asked: at_will/at_will/attack] [askMechanic: burst]
[reskin] open asks handed to the idea call: "rains lightning" [burst] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "Lightning Sheeting. Skyfeud raises her hands and the sky answers: a cy" answers the GM's "rains lightning"
[reskin] idea unanchored: trait — "Brine-Shell of Living Storm. Skyfeud's body is a shell of churning sto" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 34 of 34 answered; not true of this body: gaze-single, snare, seal, active-toll, random-ray, spew, snare-bolt, herd, drain, zone-seed, blighted-ground, rally, phase-slip, false-appearance, bloodied-burst, resonant-body, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial
[reskin] menu: taste stands down — action answers the GM's "rains lightning", so role and style do not filter the menu (legality still does); 18 template(s) offered
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Lightning Sheeting. Skyfeud raises her hands and the sky answers: a cylinder of driving rain and leaping bolts descends upon her enemies. Each creature in a Cylinder centered above a point within 120 feet of her makes a Dexterity saving throw, taking Lightning damage on a failure and half as much on a success; on a failed save, the creature is also Deafened until the end of its next turn as the th" [action/save/damage] [family: nova] — menu: thrown-burst, zone, execute, wail, lure, ground-burst, pacify, escalating-dread, slow-bolt, sensory-strike, thrown-burst-seed, curse-debt, reveal, wind-up, throw-retrieve, terror-pulse, disarm, push-prone (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rampage, patient-defense, second-wind, focus, feint-slip, bolt-restrain, bolt-drag, bolt-mark)
[reskin] lead by this seat's own clause: action — "burst" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — burst: thrown-burst, ground-burst, thrown-burst-seed, throw-retrieve
[reskin] menu ordered by the idea's stamps: action — idea fires save/does damage; leading: thrown-burst (save/damage), ground-burst (save/damage), thrown-burst-seed (save/damage)
[reskin] keys would have bound: action — wind-up (storm)
[reskin] classification handed to the fit call: shape=attack when=at_will often=at_will
[reskin] word match declined by the call: thrown-burst, thrown-burst-seed, throw-retrieve, wind-up, wail, reveal, disarm — the key word does not mean the mechanic here
[reskin] authored row answers the GM: action — "Lightning Sheeting" was written for "rains lightning", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("an at-will lightning strike that descends from the sky onto a point, h") and wrote an action instead: "Lightning Sheeting" -> Actions. *Dexterity Saving Throw*: DC 16, one creature within 30 feet. *Failure:* 21 (6d6) Lightning damage, and the target has t
[reskin] authored row numbers: "Lightning Sheeting" — the call declared (unanswered) number(s) promised
[reskin] seat takes its clause: "Lightning Sheeting" is HANDED "rains lightning" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Lightning Sheeting" ("Lightning Sheeting. Skyfeud raises her hands and the sky answers: a cylinder of driving rain and leaping bolts descends upon her enemies. Each creature in a Cyl [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Brine-Shell of Living Storm. Skyfeud's body is a shell of churning storm-cloud and salt brine: whenever she takes Thunder or Lightning damage, she regains an equal number of hit points instead of being harmed by it. When her storm-shell is spent — while she is Bloodied — this healing no longer functions, and her form flickers and dims." [trait/always/defense] [family: heal] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, evasion, guarded-stance (+ shelf: absorption)
[reskin] composed candidates: none trait — the heal family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] word match declined by the call: bloodied-fury, death-restoration, undead-fortitude, evasion, shielded-mind, phobia, bound — the key word does not mean the mechanic here
[reskin] seat answered, but: the call said "Brine-Shell of Living Storm. Skyfeud's body is a shell of churning storm-cloud and salt brine: whenever she takes Thunde" is carried by "Brine-Shell of Living Storm", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Brine-Shell of Living Storm. Skyfeud's body is a shell of churning sto" and wrote no row of that kind (refused: "Brine-Shell of Living Storm" — the call counts 1 number(s) the row promises and only 0 are written — a promised amount, area or bonus with no number cannot be run) (it belongs in the description); the nearest template stands in
[reskin] closest accepted: trait — the call refused every template but named "guarded-stance" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: regains hit points when it takes Thunder or Lightning damage, until Bloodied)
[reskin] pick kept on the GM's own words: trait — "guarded-stance" has no key-table verb, but the call quotes "storm sorcerer who rains lightning" from the description
[reskin] seat takes its clause: "Brine-Shell" is HANDED "storm sorcerer" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): guarded-stance -> Traits/"Brine-Shell" ("The idea is a damage-type absorption (Thunder/Lightning healing) that switches o [shape fit, no verb match]")
[reskin] weapons answered: Lightning Lash = none
[reskin] print canon modes: fly off — the Mage has no such mode and the words name none
[reskin] speed by concept: dropped Fly 30 ft. (hover) — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Mage's own type stands
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Lightning Lash" -> "Arcane Burst" — the Mage's own row
[reskin] resistances derived: Lightning
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Lightning Sheeting.
[reskin] free-row budget by card size: CR 8 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] ask vs row ok: "rains lightning" -> "Lightning Sheeting" — trigger at_will, limit at_will
[reskin] save re-derived after a retype: Actions/Lightning Sheeting — a Dexterity save for a condition the row IMPOSES, which calls for Constitution (A2: a condition the row merely requires does not pick the stat)
[reskin] lint: 0 findings
[reskin] audit: [Brine-Shell: The name promises a brine/water shell…ress a brine/shell nature. (about: "Brine-Shell"), Protective Magic (3/Day): The reaction names and d…es. (about: "Skyfeud casts *Shield* in response")]
[reskin] audit rename blocked — "Brine-Shell" -> "Brined Carapace" would drop the GM's own words "brine", "shell" from a row bound to "storm-shell of brine and thunder"; the mechanic would stay and the receipt would not
[reskin] audit finding on the body: Reactions/"Protective Magic" [chassis] — The reaction names and describes casting Shield, but Skyfeud's Spellcasting entry does not. a catalog row: the fix belongs in the donor, once, for every creature on this body
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "sorcerer" which is not a whole clause — the seat surgery cut it; resolved to cl_7q4aym
[reskin] [gap] regains hit points when it takes Thunder or Lightning damage, until Bloodied — "Brine-Shell of Living Storm. Skyfeud's body is a shell of churning storm-cloud and salt brine: whenever she takes Thunder or Lightning damage, she regains an equal number of hit points instead of being harmed by it. When her storm-shell is spent — while she is Bloodied — this healing no longer functions, and her form flickers and dims." — Skyfeud [seat: trait [trait/always/defense]] (closest offered: guarded-stance) [effect: defense] [menu: bloodied-fury death-restoration shielded-mind undead-fortitude evasion guarded-stance phobia blood-frenzy pack-tactics relentless-pursuit bound truth-aura fear-aura] [same-cell unoffered: false-appearance shell-withdraw uncanny-sense patient-defense sealed-body relic-object mimicry blurred-form] [same-seat rejected: false-appearance:body-verdict adhesive:role spider-climb:body-verdict terrain-walk:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement berserk:role marking-light:body-verdict sealed-body:body-verdict relic-object:body-verdict mimicry:body-verdict assassinate:role blurred-form:body-verdict death-burst:body-verdict kill-denial:body-verdict] [landed: guarded-stance]
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 1 · path class_npc
[reskin] done: "Skyfeud" — donor caster-6, CR 8
```

---

## 08. Bramblejack — CR 3

**Input:** `name: Bramblejack |  | role: lurker`
**Donor:** lurker-2-trap -> CR 3
**Signature:** library · **elapsed** 27s

### Block
```
Bramblejack

Medium Plant, Neutral Evil

AC 12
Initiative +1 (11)

HP 78 (12d8 + 24)

Speed 20 ft.

MOD
SAVE
STR
17
+3
+5
INT
5
-3
-3
MOD
SAVE
DEX
12
+1
+1
WIS
13
+1
+1
MOD
SAVE
CON
15
+2
+2
CHA
8
-1
-1

Skills Stealth +5

Senses tremorsense 30 ft.; Passive Perception 11

Languages None

CR 3 (XP 700; PB +2)

Traits

Adhesive Hide. The bramblejack adheres to anything that touches it. A Huge or smaller creature adhered to the bramblejack has the Grappled condition (escape DC 13).

Actions

Thornwhip. Melee Attack Roll: +5 (with Advantage if the target is Grappled by the bramblejack), reach 10 ft. 12 (2d8 + 3) Slashing damage plus 9 (2d8) Poison damage.

Briar Snare (Recharge 5-6). Dexterity Saving Throw: DC 12, one Large or smaller creature the bramblejack can see within 60 feet. Failure: The target is caught in brambles and has the Restrained condition until the brambles is destroyed (AC 10; HP 10; Vulnerability to Fire damage; Immunity to Poison and Psychic damage).

Bonus Actions

False Form. The bramblejack shape-shifts to resemble a Medium or Small object while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from an ordinary object.

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
[concept] thin concept expanded before routing: Bramblejack — A Bramblejack lies in wait as a patch of innocent hedgerow, then erupts the moment prey passes: thorned whips lash out to snare a leg or throat and drag the victim down into the root-mass to be slowly crushed and drained. Every round it anchors its catch and lashes any rescuer with hoo
[path] homebrew — "Bramblejack" (call)
[route] lurker-trap type=Plant mechanics=snare, grapple — casts: the call reads no worked magic here | hold_shape refused: the call answered reach but quoted "thorned whips lash out to snar", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-trap: ✓ ("lies in wait as a patch of innocent hedg") | lurker-trap: key "lies in wait" (class verb) | bane refused: the words carry no weakness clause and the call did not claim one, so "fire" is a guess from what the creature is, not the GM's ask
[concept] resolve: archetype=lurker type=Plant themes=verdant/grasping mind=bestial style=trap energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: snare, grapple
[concept] signature elements: lying in wait disguised as hedgerow [behavior] | thorned whips that snare and drag prey down [body] | a thicket rooted over a hoard of buried bones [aura]
[concept] identity: A Bramblejack lies in wait as a patch of innocent hedgerow, then erupts the moment prey passes: thorned whips lash out to snare a leg or throat and drag the victim down into the root-mass to be slowly crushed and drained. Every round it anchors its catch and lashes any rescuer with hooked briars, and it will not chase a fleeing quarry far — it is territorial, rooting itself to its patch and fighting to the death rather than abandoning its hunting ground.
[concept] lore: A Bramblejack grows where a murder was buried in a hedgerow: the spilled blood feeds the roots, and the bramble learns to hunt, hoarding the bones of its catches beneath a thicket that never sheds its leaves.
[reskin] donor: lurker-2-trap -> CR 3
[reskin] row gated out: Swallow (engulf) — the concept did not claim this mechanic
[reskin] seats: action <- "lying in wait disguised as hedgerow" | trait <- "thorned whips that snare and drag prey down"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] repair round 1: 1 defect(s) — rename for "Signature Slot" takes the shelf's own row name "Hooked Lash" — that name belongs to a template this sheet may still receive; choose another
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the bramblejack" — the call's own answer (kind), built from the name
[reskin] inline form: "the bramblejack" — the model's own reading of the name
[reskin] the sheet's declared ask: snare — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Bramblejack" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "The bramblejack lashes out with a hooked briar-whip at a creature it c" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The bramblejack's thorned vines instinctively lash out at any creature" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 34 of 34 answered; not true of this body: seal, wail, active-toll, random-ray, spew, zone-seed, blighted-ground, shell-withdraw, phase-slip, heated-body, absorption, bloodied-burst, resonant-body, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial
[reskin] menu pruned: action — exploiter (the sheet cannot render them)
[reskin] signature idea (action): "The bramblejack lashes out with a hooked briar-whip at a creature it can see within reach; on a failed Dexterity saving throw, the target is snared and dragged to the ground, taking piercing damage and gaining the Prone condition as roots and thorns yank it down." [action/save/condition] [family: drag] — menu: condition-payoff, lure, pull-through, ground-burst, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, gaze-single, snare, shield-bash, push-prone, reveal (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, answering-strike, affliction, contagion, charge-push, hook-rider, pounce, isolation, life-drain)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — snare: snare-bolt, snare
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: snare-bolt (save/condition), snare (save/condition), lure (save/condition)
[reskin] classification handed to the fit call: mechanic=snare, grapple
[reskin] word match declined by the call: snare-bolt, reveal, shield-bash, push-prone — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "snare" has no key-table verb, but the call quotes "bramblejack" from the description
[reskin] value check: "Briar Snare (Recharge 5-6)" EV 12.7 vs floor 12 (the whole Multiattack (1 attacks)) — worth the trade
[reskin] signature template: snare -> Actions/"Briar Snare (Recharge 5-6)" ("lashes out with a hooked briar-whip... the target is snared and dragged to the g [shape fit, no verb match]")
[reskin] signature idea (trait): "The bramblejack's thorned vines instinctively lash out at any creature that tries to flee its reach, snapping at the first opportunity." [trait/always/damage] [family: sentinel] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), assassinate (always/damage)
[reskin] classification handed to the fit call: mechanic=snare, grapple
[reskin] seat answered, but: the call said "The bramblejack's thorned vines instinctively lash out at any creature that tries to flee its reach, snapping at the fir" is carried by "Briar Lash", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The bramblejack's thorned vines instinctively lash out at any creature" and wrote no row of that kind; the nearest template stands in
[reskin] closest accepted: trait — the call refused every template but named "blood-frenzy" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: reactive lash that punishes a creature for leaving the bramblejack's reach)
[reskin] free signature row: trait — "blood-frenzy" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat owes nothing: the trap line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] free signature row: "Reaching Thorns" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): blood-frenzy -> Traits/"Reaching Thorns" ("The bramblejack's thorned vines instinctively lash out at any creature that tries to flee its reach, snapping at the first opportunity. [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Reaching Thorns" -> "Blood Frenzy" — this row is blood-frenzy and does what every blood-frenzy row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Thornwhip = whip
[reskin] weapon dice keep the budget's die: "Thornwhip" is a whip (d4), but 4d4 passes print's largest d4 attack row (3d4) — "12 (2d8 + 3)" stands
[reskin] weapon reach follows the weapon: "Thornwhip" is a whip — reach 5 ft becomes 10 ft (the table's own)
[reskin] languages held: None stands — INT 5 on a Plant speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "Bramblejack" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
[reskin] free row over budget: Traits/"Blood Frenzy" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 0 kept (budget 1)
[reskin] lint: 0 findings
audit finding below confidence gate: False Form The bramblejack is a Medium creature, so shifting into a Small object is a size change the trait's fiction ('retaining its game statistics') does not address, and a motionless transformed plant is indistinguishable from an ordinary object only if it is not also required to be a plausible object type, which is never specified.
[reskin] audit: [Adhesive Hide: The trait states the creature adher…jack has the Grappled condition (escape DC 13)."), Briar Snare (Recharge 5-6): The brambles are refer…acked. (about: "until the brambles is destroyed"), Briar Snare (Recharge 5-6): Subject-verb disagreem…ement. (about: "until the brambles is destroyed")]
[reskin] audit rewrite blocked — "Briar Snare (Recharge 5-6)" is engine-authored (priced catalog composition); only a row the model wrote may be rewritten
[reskin] audit finding on the body: Traits/"Adhesive Hide" [chassis] — The trait states the creature adheres to anything that touches it but never defines the tr. a catalog row: the fix belongs in the donor, once, for every creature on this body
[reskin] audit finding on the body: Actions/"Briar Snare" [snare] — The brambles are referenced as an object to be destroyed but nothing states where they app. a catalog row: the fix belongs in the template, once, for every creature on this body
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] reactive lash that punishes a creature for leaving the bramblejack's reach — "The bramblejack's thorned vines instinctively lash out at any creature that tries to flee its reach, snapping at the first opportunity." — Bramblejack [seat: trait [trait/always/damage]] (closest offered: blood-frenzy) [effect: damage] [menu: blood-frenzy pack-tactics assassinate spider-climb phobia bloodied-fury uncanny-sense shielded-mind evasion relentless-pursuit bound undead-fortitude truth-aura fear-aura] [same-cell unoffered: throw-retrieve death-burst zone-seed coating] [same-seat rejected: false-appearance:engine-family adhesive:engine-family terrain-walk:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict death-restoration:cr-range earth-glide:movement tunneler:movement berserk:role marking-light:body-verdict sealed-body:role relic-object:body-verdict guarded-stance:role mimicry:body-verdict blurred-form:body-verdict death-burst:body-verdict kill-denial:body-verdict] [VETOED AFTER ACCEPTANCE: blood-frenzy never reached the sheet — died at the free-row budget (only 1 free row(s) allowed on this sheet)]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the free-row budget
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the free-row budget) · path homebrew
[reskin] done: "Bramblejack" — donor lurker-2-trap, CR 3
```
