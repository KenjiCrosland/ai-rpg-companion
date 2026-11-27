# BLOCKS — gm40 after Part A (2026-11-27)

Strict replay of `gm40-2026-11-25` after the closing refresh: **39 of 39 reproduced EXACTLY, 1
skipped**, exit 0. Three sheets were re-recorded from the idea call — s23, s26 and s28 — because
the list of open asks is now correct and the idea call sees it.

| # | Sheet | What changed |
|---|---|---|
| 23 | Captain Iress Vane | **HP 157 -> 110 (15d8 + 45)**, the typed figure; a new signature from the idea call |
| 26 | Fen-Barbed Creeper | **Speed 10 ft. -> 30 ft.** — "pulls 10 ft" is no longer read as a walking speed; a new signature |
| 28 | Madame Zolga | **Immunities now carry Charmed**, from "immune to charm"; a new signature |

s26 is still the Assassin. A4 moved to Part C, where the check is the creature's type.

Seven fact entries on this forty, all answered: s23's AC 17, HP 110 and 3 attacks; s27's resistance
read as Bludgeoning, Piercing and Slashing; s28's Charmed.

---

## 01-old-marta

## 01. Old Marta — CR 3

**Input:** `name: Old Marta | innkeeper, retired adventurer, keeps a crossbow under the bar`
**Donor:** skirmisher-3-archer -> CR 3
**Signature:** library

### Block
```
Old Marta

Medium Humanoid, Neutral Good

AC 15
Initiative +3 (13)

HP 60 (11d8 + 11)

Speed 30 ft.

MOD
SAVE
STR
11
+0
+0
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
14
+2
+2
MOD
SAVE
CON
13
+1
+1
CHA
15
+2
+2

Skills Perception +4, Stealth +5

Senses Passive Perception 14

Languages Common

CR 3 (XP 700; PB +2)

Traits

Counter Shift. Marta ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Marta makes two attacks, using Crossbow or Hot Kettle in any combination.

Hot Kettle. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Crossbow. Ranged Attack Roll: +5, range 80/320 ft. 12 (2d8 + 3) Piercing damage, and Marta has Advantage on its next attack roll against the target before the end of its next turn.

Thrown Kettle. Dexterity Saving Throw: DC 12, one creature within 60 feet. Failure: 6 (1d12) Bludgeoning damage, and the target has the Prone condition.

Bonus Actions

Fleet Agility. Marta takes the Dash or Disengage action.

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
[harness] restored 0 taken name(s) the recording carried
[path] refused: class receipt "retired adventurer" names no class and is not in the head clause ("Old Marta innkeeper")
[path] homebrew — "innkeeper, retired adventurer" (call)
[route] skirmisher-archer type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: on the GM's own words "keeps a crossbow under the bar" | is_a_swarm: the call reads none in these words | skirmisher-archer: ✓ ("keeps a crossbow under the bar") | skirmisher-archer: key "crossbow" (class noun)
[concept] name: "Old Marta" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=archer energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Old Marta"
[concept] mechanics: none claimed
[concept] signature elements: the crossbow under the bar [object] | holds the room with furniture and angles, never out in the open [behavior] | won't break when bloodied — falls back to the cellar stair and holds it [behavior]
[concept] identity: Old Marta opens a fight from behind her own bar, dropping one hand below the counter for the crossbow she keeps loaded and using the furniture and the room's angles as cover while she works the bolt. Every round she keeps the counter between herself and the nearest blade, firing and shifting, and she is not above a shouted warning or a hot kettle to buy the second it takes to reload; bloodied, she does not break — she retreats to the cellar door, holds the stair, and makes the last shots count. She has buried better adventurers than this and shoots like a woman who has already decided how the story ends.
[concept] lore: Old Marta hung up her adventuring gear years ago and bought a failing roadhouse, and she wants only to keep her hearth, her regulars, and her cellar-stock out of the hands of whatever trouble walks through her door — but she has kept the crossbow under the bar loaded all these years, just in case.
[reskin] mind tier held: WIS stays 14 against "formidable" — the card's save DC 12 derives from WIS 14 and from no physical score
[reskin] mind tier: INT 11 -> 15 — the call read this creature as capable at CR 3
[reskin] mind tier: CHA 11 -> 15 — the call read this creature as capable at CR 3
[reskin] donor: skirmisher-3-archer -> CR 3
[reskin] seats: action <- "holds the room with furniture and angles, never out in the open" | trait <- "the crossbow under the bar"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] named parts: Crossbow (slot, ranged) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] features: Vex on Crossbow — the feature table, no call
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] proper noun: "Old Marta" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Marta" — the call's own answer (person), built from the name
[reskin] inline form: "Marta" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "keeps a crossbow under the bar" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Old Marta — innkeeper" -> has (descriptive), head | "retired adventurer" -> has (descriptive) | "keeps a crossbow under the bar" -> has (mechanical) [asked: at_will/attack]
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (2 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "Marta barks a warning that snaps one creature she can see within earsh" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The crossbow under the bar is already loaded and already aimed: when M" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 27 of 27 answered; not true of this body: shield-bash, random-ray, spew, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "Marta barks a warning that snaps one creature she can see within earshot into diving for cover — the target must succeed on a Wisdom saving throw or fall Prone and have Disadvantage on its next attack roll, the whole room flinching at her voice. A creature that fails by a wide margin is Frightened of her until the end of her next turn instead, sure the bolt already has its name on it." [action/save/condition] [family: mark] — menu: throw-retrieve, lure, ground-burst, snare-bolt, sensory-strike, disarm, thrown-burst-seed, pacify, escalating-dread, terror-pulse, push-prone, reveal (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, snap-shot, riposte, answering-strike, affliction, contagion, charge-push, pounce, isolation, bolt-mark)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), snare-bolt (save/condition), sensory-strike (save/condition)
[reskin] classification handed to the fit call: shape=attack when=at_will
[reskin] word match declined by the call: lure, terror-pulse, escalating-dread, pacify — the key word does not mean the mechanic here
[reskin] closest refused: action — "push-prone" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: knocks the target prone with a save and spoils its next attack roll)
[reskin] seat answered, but: the call said "Marta barks a warning that snaps one creature she can see within earshot into diving for cover — the target must succeed" is carried by "Duck, You Fool!", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("knocks the target prone with a save and spoils its next attack roll") and wrote an action instead: "Duck, You Fool!" -> Actions. *Wisdom Saving Throw*: DC 12, one creature within 60 feet. *Failure:* The target has the Prone condition.
[reskin] authored row numbers: "Duck, You Fool!" — the call declared (unanswered) number(s) promised
[reskin] value check: "Duck, You Fool!" EV 5 vs floor 6.2 (one attack of 2) — half a hit added: 6 (1d12) Bludgeoning damage on a failed save — half of one 12-damage hit, the attack this row stands in place of; still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature under the floor, and kept: "Duck, You Fool!" — the ladder could not lift it and nothing stands in, so the row the model wrote stays as written
[reskin] signature authored: no template — the seat wrote it -> Actions/"Duck, You Fool!" ("Marta barks a warning that snaps one creature she can see within earshot into diving for cover — the target must succeed on a Wisdom saving throw or fall Prone  [authored: the catalog held no shape for it]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 15 already beats print's 13 at CR 3, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The crossbow under the bar is already loaded and already aimed: when Marta is in cover or behind an ally, her first Crossbow attack each turn is made with Advantage and ignores the Cover bonus of its target. She has been sighting over this counter for years." [trait/always/damage] [family: payoff] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (always/damage): blood-frenzy, pack-tactics, assassinate; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), assassinate (always/damage)
[reskin] classification handed to the fit call: shape=attack when=at_will
[reskin] word match declined by the call: assassinate, blood-frenzy — the key word does not mean the mechanic here
[reskin] free signature row: trait — "pack-tactics" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "the crossbow under the bar" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 2
[reskin] free signature row: "Behind the Bar" — the trait seat cannot quote the GM, but the call names the element it expresses: "the crossbow under the bar". Earns no clause credit; the homebrew path allows 1 and this is number 3
[reskin] signature template (trait): pack-tactics -> Traits/"Behind the Bar" ("when Marta is behind an ally, her first Crossbow attack each turn is made with A [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Behind the Bar" -> "Pack Tactics" — this row is pack-tactics and does what every pack-tactics row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Hot Kettle = none; Crossbow = crossbow; Warning Shot = crossbow
[reskin] weapon dice follow the weapon: the GM's "Crossbow" is a crossbow (d8) — "10 (2d6 + 3)" becomes "12 (2d8 + 3)"
[reskin] weapon table: "Crossbow" — a launcher, never thrown, range 80/320
[reskin] save follows the effect: Actions/"Duck, You Fool!" Wisdom -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] name-canon stands down: the path answered homebrew on "innkeeper, retired adventurer" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Duck, You Fool!.
[reskin] free-row order: "Duck, You Fool!" [clause, no template] > "Pack Tactics" [element, pack-tactics] — a receipt row is never displaced by one without, and within a rank a templated row is never displaced by one without
[reskin] free row over budget: Traits/"Pack Tactics" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Duck, You Fool!" [no template]
[reskin] ask vs row ok: "keeps a crossbow under the bar" -> "Crossbow" — trigger at_will
[reskin] sheet lint: uncited-replacement-row: Actions/Duck, You Fool!: a replacement clause was written for this row and the finished Multiattack does not name it — "Marta makes two Crossbow attacks. It can replace one attack with a use of Duck, You Fool!."
[reskin] lint: uncited-replacement-row: Actions/Duck, You Fool!: a replacement clause was written for this row and the finished Multiattack does not name it — "Marta makes two Crossbow attacks. It can replace one attack with a use of Duck, You Fool!."
[reskin] audit: [Duck, You Fool!: A Dexterity save that knocks a ta…implement. (about: "one creature within 60 feet"), Duck, You Fool!: The name commands the target to d… damage, and the target has the Prone condition")]
[reskin] audit rename: "Duck, You Fool!" -> "Thrown Kettle"
[reskin] clause unresolved: "Thrown Kettle" carries "Marta barks a warning that snaps one creature she can se", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] multiattack re-read — "Hot Kettle" joins the combination; "Marta makes two attacks, using Crossbow or Hot Kettle in any combination. It can replace o"
[reskin] replacement clause re-read: "Duck, You Fool!" is not on this sheet, so the clause leaves entirely — print's commonest Multiattack carries none
[reskin] sheet lint re-read at ship: 1 finding(s) stored before the audit and the derivation, 1 on the finished sheet
[reskin] done: "Old Marta" — donor skirmisher-3-archer, CR 3
[reskin] ledger: 1 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 01-old-marta.json — 1 recorded answer(s) unused
```

---

## 02-sergeant-dunmore

## 02. Sergeant Dunmore — CR 2

**Input:** `name: Sergeant Dunmore | town guard sergeant, halberd, by the book | role: defender`
**Donor:** defender-1 -> CR 2
**Signature:** dropped

### Block
```
Sergeant Dunmore
Medium humanoid, neutral
Armor Class

17 (splint)

Hit Points: 

65 (10d8 + 20)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

13 (+1)

	

14 (+2)

	

10 (+0)

	

11 (+0)

	

10 (+0)

Skills: 

Athletics +5, Perception +2

Senses: 

passive Perception 12

Languages: 

Common plus one other language

Challenge

2 (450 XP)

Proficiency Bonus:

+2

Great Weapon Master.When Dunmore hits a creature with its Halberd, the attack deals an extra 2 damage.
Gate Bar (Reaction).When a creature enters Dunmore's reach or moves while within his reach, Dunmore makes one halberd attack against that creature; on a hit, the creature's speed is reduced to 0 until the end of the current turn.
Riposte (Reaction).When a creature within 5 feet of Dunmore misses it with a melee attack roll, Dunmore makes one Halberd attack against that creature.
Parry (Reaction).When Dunmore is hit by a melee attack roll while holding a weapon, Dunmore adds 2 to its AC against that attack, possibly causing it to miss.

Actions
Multiattack: Dunmore makes two Halberd or Longbow attacks.
Halberd: Melee Weapon Attack: +5 to hit, reach 10 ft., one target. Hit: 7 (1d8 + 3) slashing damage.
Longbow: Ranged Weapon Attack: +3 to hit, range 150/600 ft., one target. Hit: 12 (2d10 + 1) piercing damage.
```

### Trace
```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
!! [ENRICHMENT] Failed to enrich Old Marta: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 1 taken name(s) the recording carried
[path] class_npc — class fighter — "Sergeant" (call)
[route] defender-leader type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("town guard sergeant") | defender-leader: key "sergeant" (class noun)
[concept] name: "Sergeant Dunmore" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=leader energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Sergeant Dunmore"
[concept] mechanics: none claimed
[concept] signature elements: halberd held at reach to bar passage [object] | orders that tighten the guard line [behavior] | aura of unbending procedure [aura]
[concept] identity: Sergeant Dunmore plants himself at the chokepoint and fights like a locked gate — halberd braced, shield of procedure raised, calling out every step of the arrest before he takes it. Each round he holds the line at reach and barks orders that let the guards beside him close ranks and strike as one, punishing anyone who tries to slip past him. He does not chase; he withdraws in good order only when the book says the position is lost, and he never breaks the law of his own formation first.
[concept] lore: An old sergeant of the town watch who has read the same duty manual so many times it is the only voice he trusts, Dunmore wants nothing more than to see every disturbance resolved by the book and every citizen — and every adventurer — standing in the correct square of the street.
[reskin] [path] class body: the fighter stands on the Warrior Veteran — the class's own print block, nearest CR 2
[reskin] print canon route: the Warrior Veteran's body outranks the leader seat — no verb in the words names it; the plain defender line
[reskin] print canon defenses: HP 45 -> 65, AC 15 -> 17 — the Warrior Veteran's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 17 (splint) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 16, DEX 13, CON 14, INT 10, WIS 11, CHA 10 — the Warrior Veteran's at its own CR; attack +3 -> +5, DC 13 (print's)
[reskin] donor: defender-1 -> CR 2
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] seats: action <- "orders that tighten the guard line" | trait <- "halberd held at reach to bar passage"
[reskin] [path] decides: class_npc on the Warrior Veteran · class fighter (the matcher would have said homebrew)
[reskin] print canon: "Sergeant Dunmore — town guard sergeant, halberd, by the book" heads on the Warrior Veteran — print's rows ride along; the seat stays
[reskin] claim gate: CR 2 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] named parts: Halberd (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] features: Great Weapon Master (trait) — the feature table, no call
[reskin] class kit: guarded-stance yields — AC 17 already beats print's 13 at CR 2, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] class kit: fighter — "Sergeant": Riposte (riposte)
[reskin] proper noun: "Sergeant Dunmore" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Dunmore" — the call's own answer (person), built from the name; the rules would have said "the sergeant"
[reskin] inline on stamped rows: "the sergeant" -> "Dunmore" on 2 rows — they were written before the name's form was settled
[reskin] inline form: "Dunmore" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "halberd" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "halberd" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Sergeant Dunmore — town guard sergeant" -> has (descriptive), head | "halberd" -> has (mechanical) [asked: at_will/at_will/attack] | "by the book" -> has (descriptive)
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "Dunmore barks the arrest procedure step by step, and each guard who ca" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Dunmore holds his halberd braced across the street like a gate bar and" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 26 of 26 answered; not true of this body: seal, shield-bash, active-toll, shell-withdraw, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "Dunmore barks the arrest procedure step by step, and each guard who can hear him carries it out as if on parade: as a bonus action, he issues the next order — Close Ranks, Hold the Line, or Take Him Down — and every ally of his within earshot that can see him may immediately move up to its speed toward the named position or make one weapon attack against a creature Dunmore names." [bonus_action/always/movement] [family: sentinel] — menu: patient-defense, lay-on-hands, second-wind, aggro-curse, self-invisibility, rally, focus, feint-slip (+ shelf: terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, charge-push)
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires always/does movement; leading: self-invisibility (always/movement), rally (always/movement), focus (always/movement)
[reskin] word match declined by the call: rally, aggro-curse, disarm — the key word does not mean the mechanic here
[reskin] closest refused: action — "herd" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: lets each ally within earshot move or attack when he gives an order, a)
[reskin] seat authored nothing: action — the call was asked to write a bonus action for "Dunmore barks the arrest procedure step by step, and each guard who ca" and wrote no row of that kind (it belongs in the description)
[reskin] closest refused — subject flipped: action — the call named "herd" nearest and judged its subject FLIPPED against the clause (lets each ally within earshot move or attack when he gives an order, a); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Dunmore barks the arrest procedure step by step, and each guard who can hear him carries it out as if on parade: as a bonus action, he issues the next order — Close Ranks, Hold the Line, or Take Him Down — and every ally of his within earshot that can see him may immediately move up to its speed toward the named position or make one weapon attack against a creature Dunmore names." [bonus_action/always/movement] — the model found no template that holds it (offered: self-invisibility, rally, focus, feint-slip, patient-defense, lay-on-hands, second-wind, aggro-curse, disarm, herd)
[reskin] signature seat empty — no template held the idea and the seat wrote no row; nothing stands in (owner, 2026-11-23)
[reskin] signature idea (trait): "Dunmore holds his halberd braced across the street like a gate bar and gives ground only by regulation: whenever a creature enters his reach or tries to move past him, the first such move each turn provokes his Halberd attack, and a creature hit by it has its speed reduced to 0 until the end of the current turn." [trait/always/condition] [family: sentinel] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] verb gate stands down: trait — no template shares a verb, but 2 template(s) whose declared stamps match the idea (always/condition): phobia, berserk; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), berserk (always/condition), bloodied-fury (always/defense)
[reskin] word match declined by the call: phobia, berserk, bloodied-fury, blood-frenzy, pack-tactics, shielded-mind, bound, undead-fortitude, truth-aura, fear-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "relentless-pursuit" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a reaction that lets him make a halberd attack when a creature enters )
[reskin] seat answered, but: the call said "Dunmore holds his halberd braced across the street like a gate bar and gives ground only by regulation: whenever a creat" is carried by "Gate Bar", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("a reaction that lets him make a halberd attack when a creature enters ") and wrote a trait instead: "Gate Bar" -> Reactions. *Trigger:* A creature enters Dunmore's reach or moves while within his reach. *Response:* Dunmore makes one Halberd atta
[reskin] authored row numbers: "Gate Bar" — the call declared 0 number(s) promised
[reskin] free signature row: "Gate Bar" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Gate Bar" is HANDED "by the book" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Gate Bar" ("Dunmore holds his halberd braced across the street like a gate bar and gives ground only by regulation: whenever a creature enters his reach or tries to move pa [authored: the catalog held no shape for it]")
[reskin] repair: 1 clause(s) with no row — "by the book"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [{"clause":"by the book","row":"Halberd"}], unplaced []
[reskin] clause already answered: "by the book" is carried by "Halberd" in different words — the call read the sheet and declined to answer it twice
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Halberd = halberd; Formal Citation = none
[reskin] weapon dice follow the weapon: the GM's "Halberd" is a halberd (d10) — "21 (4d8 + 3)" becomes "19 (3d10 + 3)"
[reskin] weapon reach follows the weapon: the GM's "Halberd" is a halberd — reach 5 ft becomes 10 ft
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Warrior Veteran's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Warrior Veteran's
[reskin] print canon row: Actions/Heavy Crossbow — the Warrior Veteran's own ranged row, added (the chassis carried none to rename)
[reskin] print canon multiattack: "Dunmore makes two Greatsword or Heavy Crossbow attacks." — the Warrior Veteran's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] print canon attack: "Heavy Crossbow" is print's own row — +3, 12 (2d10 + 1), range 100/400 ft. (an exact body at print's CR)
[reskin] print canon saves: proficient in nothing — the Warrior Veteran's own set, at this sheet's stats and PB 2 (changed CON)
[reskin] print canon row: Reactions/Parry — the Warrior Veteran's own
[reskin] class weapon: Actions/"Heavy Crossbow" -> "Longbow" — a fighter fights with a longbow, not the Warrior Veteran's
[reskin] multiattack reconciled: "Greatsword" is no row on this sheet — the Multiattack cites "Halberd" instead
[reskin] final price: print's Multiattack: the round ran 38 against the card's 18 — the attack rows re-solve at 50% (2 attacks off one row after a supersede)
[reskin] free-row budget by card size: CR 2 sits in band 0-2, where print runs 1-4 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Gate Bar" [no template]
[reskin] ask vs row MISMATCH: "halberd" -> "Great Weapon Master" — trigger: asked at_will, row reads on_hit
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Gate Bar carries "halberd held at reach to bar passage" — "on a hit, the creature's Speed is reduced to 0 until the end of the current turn"
audit finding below confidence gate: Riposte Dunmore's reach is 10 feet, but Riposte only triggers within 5 feet, so a halberd-wielding sergeant can never use it against the reach attacks his own weapon invites, making the reaction largely dead against the enemies it should punish.
[reskin] audit: [Gate Bar: The trigger fires on any movement in rea…Dunmore's reach or moves while within his reach")]
[reskin] audit defect: Reactions/"Gate Bar" [model-written] medium misnamed — The trigger fires on any movement in reach, including a creature moving toward Dunmore or leaving the space behind him, which does not match the fiction of a halberd held across a passage to bar it, and the reach is not a defined barring zone. — Restrict the trigger to a creature moving to leave or pass through the space Dunmore bars, so the effect matches the name. (about: "A creature enters Dunmore's reach or moves while within his reach")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Riposte" carries "Sergeant" which is not a whole clause — the seat surgery cut it; resolved to cl_1t4u9hd
[reskin] [gap] lets each ally within earshot move or attack when he gives an order, acting on his allies rather than forcing enemies to — "Dunmore barks the arrest procedure step by step, and each guard who can hear him carries it out as if on parade: as a bonus action, he issues the next order — Close Ranks, Hold the Line, or Take Him Down — and every ally of his within earshot that can see him may immediately move up to its speed toward the named position or make one weapon attack against a creature Dunmore names." — Sergeant Dunmore [seat: action [bonus_action/always/movement]] (closest offered: herd) [effect: movement] [menu: self-invisibility rally focus feint-slip patient-defense lay-on-hands second-wind aggro-curse disarm herd] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound phase-slip] [same-seat rejected: blink:role shell-withdraw:body-verdict volley-order:requires-style coating:role phase-slip:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] done: "Sergeant Dunmore" — donor defender-1, CR 2
[reskin] ledger: 1 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 1 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 02-sergeant-dunmore.json — 1 recorded answer(s) unused
```

---

## 03-yx-theral

## 03. Yx'theral — CR 8

**Input:** `name: Yx'theral | drow priestess of the spider goddess | role: caster`
**Donor:** caster-6 -> CR 8
**Signature:** library

### Block
```
Yx'theral

Medium Humanoid, Neutral

AC 16
Initiative +0 (10)

HP 115 (21d8 + 21)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
18
+4
+7
MOD
SAVE
DEX
10
+0
+0
WIS
20
+5
+8
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

Skills Arcana +7, Perception +8

Senses Passive Perception 18

Languages Common plus one other language, Elvish, Undercommon

CR 8 (XP 3,900; PB +3)

Traits

Web Walker. Yx'theral ignores movement restrictions caused by webs, and Yx'theral knows the location of any other creature in contact with the same web.

Actions

Multiattack. Yx'theral makes three Radiant Flame attacks. It can replace one attack with a use of Spellcasting to cast Ray of Sickness.

Radiant Flame. Ranged Attack Roll: +8, range 120 ft. 19 (4d6 + 5) Radiant damage.

Spellcasting. Yx'theral casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 16):

- At Will: Light, Thaumaturgy, Ray of Sickness
- 1/Day Each: Spirit Guardians, Web, Hold Person, Cloudkill

Web Snare (Recharge 5-6). Dexterity Saving Throw: DC 15, one Huge or smaller creature Yx'theral can see within 60 feet. Failure: The target is caught in web and has the Restrained condition until the web is destroyed (AC 12; HP 15; Vulnerability to Fire damage; Immunity to Poison and Psychic damage).

Bonus Actions

Divine Aid (3/Day). Yx'theral casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
!! [ENRICHMENT] Failed to enrich Sergeant Dunmore: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 2 taken name(s) the recording carried
[path] class_npc — class cleric — "priestess" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "drow priestess of the spider goddess" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("drow priestess of the spider goddess") | caster-warpriest: key "priestess" (class noun)
[concept] name: "Yx'theral" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: spider→canon ✓ ("priestess of the spider goddess")
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=venomous/subterranean mind=sapient style=warpriest energy=Poison mix=both identity=✓ lore=✓
[concept] name: provided "Yx'theral"
[concept] mechanics: none claimed
[concept] signature elements: venom-anointed mace blows [object] | web snare to bind prey alive [behavior] | spider-goddess war-prayers [aura]
[concept] identity: Yx'theral opens by laying a venom-soaked web snare across the approach, then wades in behind her profane prayers — every mace blow she lands is anointed with the spider goddess's poison, and she reads the battlefield with a high priestess's cold patience. She fights to the death in defense of her rite, using her snare and her venom to isolate and soften the strongest foe first.
[concept] lore: A high priestess of the spider goddess, Yx'theral descends from the drow temple vaults to harvest sacrifices and seed her goddess's brood in the world above; she wants worthy captives bound and living when the young hatch.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the cleric stands on the Priest — the class's own print block, nearest CR 8
[reskin] print canon route: the Priest's body outranks the warpriest seat — no verb in the words names it; the plain caster line
[reskin] print canon casting stat: the Priest casts with WIS; the caster line's INT striker reseats there
[reskin] print canon array: STR 16, DEX 10, CON 12, INT 13, WIS 20, CHA 13 — the Priest's, WIS fitted to +8
[reskin] donor: caster-6 -> CR 8
[reskin] seats: action <- "web snare to bind prey alive" | trait <- "venom-anointed mace blows"
[reskin] [path] decides: class_npc on the Priest · class cleric (the matcher would have said homebrew)
[reskin] print canon: "Yx'theral — drow priestess of the spider goddess" heads on the Priest — print's rows ride along; the seat stays
[reskin] name_element answered: Venom Web = literal
[reskin] class kit: cleric — "priestess": Divine Aid (3/Day) (Priest/Divine Aid)
[reskin] proper noun: "Yx'theral" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Yx'theral" — the call's own answer (person), built from the name
[reskin] inline form: "Yx'theral" — the model's own reading of the name
[reskin] control spell gated to daily — Hold Person (level 2 control at will is print's CR 13+ shape; at CR 8 it is 1/Day)
[reskin] spell DC coherence: Intelligence 13 -> 18 so DC 15 derives
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Yx'theral — drow priestess of the spider goddess" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "Yx'theral hurls a glob of adhesive webbing at one creature she can see" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Webs are Yx'theral's home ground—she ignores movement costs from webs " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 34 of 34 answered; not true of this body: zone, seal, wail, active-toll, random-ray, spew, herd, drain, zone-seed, blighted-ground, rally, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, terrain-walk, aberrant-ground, faultless-tracker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Yx'theral hurls a glob of adhesive webbing at one creature she can see within range. The target must succeed on a Dexterity saving throw or have its speed reduced to 0 until the end of its next turn as the web binds its limbs, and a creature that fails is also Restrained until it escapes." [action/save/condition] [family: mark] — menu: thrown-burst, gaze-single, snare, execute, lure, ground-burst, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, thrown-burst-seed, curse-debt, reveal, wind-up, terror-pulse, push-prone (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, bolt-restrain, bolt-drag, bolt-mark)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: gaze-single (save/condition), snare (save/condition), lure (save/condition)
[reskin] word match declined by the call: snare-bolt, gaze-single, pacify, slow-bolt — the key word does not mean the mechanic here
[reskin] seat takes its clause: "Web Snare (Recharge 5-6)" is HANDED "Yx'theral — drow priestess of the spider goddess" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: snare -> Actions/"Web Snare (Recharge 5-6)" ("The target must succeed on a Dexterity saving throw or be Restrained until it es [verb: web:idea, bind:idea]")
[reskin] signature idea (trait): "Webs are Yx'theral's home ground—she ignores movement costs from webs and can climb sheer surfaces and ceilings without a check, moving through her own snares as if they were open floor." [trait/always/movement] [family: zone] — menu: spider-climb, phobia, web-walker, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), web-walker (always/movement), relentless-pursuit (always/movement)
[reskin] keys would have bound: trait — spider-climb, web-walker (spider)
[reskin] word match declined by the call: spider-climb, bound — the key word does not mean the mechanic here
[reskin] signature template (trait): web-walker -> Traits/"Web Walker" ("The creature ignores movement restrictions caused by webs, moving through its ow [verb: spider:concept, web:idea, webs:idea]")
[reskin] weapons answered: Mace = mace
[reskin] weapon dice follow the weapon: "Mace" is a mace (d6) — "18 (3d8 + 5)" becomes "19 (4d6 + 5)", print's rule of keeping the die and scaling the count
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "Elvish, Undercommon" -> "Common, Elvish, Undercommon" (sapient)
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Priest's own type stands
[reskin] print canon alignment: Neutral Evil -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Elvish, Undercommon" -> "Common plus one other language, Elvish, Undercommon" — the Priest's plus the concept's Elvish, Undercommon
[reskin] print canon row: Actions/Mace — a chassis row already carries the Priest's own row name, so it IS that row: claimed as print's rather than skipped (it would otherwise leave as filler on a closed path)
[reskin] print canon attack: "Mace" -> "Radiant Flame" — the Priest's own ranged row
[reskin] name-canon trait stamped: Spider Climb (the name says so; print says what it does)
[reskin] print canon: chassis row leaves — Reactions/"Protective Magic (3/Day)" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon: chassis row leaves — Traits/"Spider Climb" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon: spell list topped up — the Priest's list is written for CR 2 and this sheet is CR 8; print's own spells stand and the chassis's add Ray of Sickness, Web, Hold Person, Cloudkill to reach print's dedicated-caster size at this CR (5 at will, 4 daily)
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] multiattack replacement clause: It can replace one attack with a use of Spellcasting to cast *Ray of Sickness*.
[reskin] free-row budget by card size: CR 8 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 120 ft.; Passive Perception 18" -> "Passive Perception 18")
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
audit finding below confidence gate: Web Walker The trait grants awareness of creatures in contact with a web, but no entry on this sheet creates a web that other creatures can be in contact with except Web Snare's restraining web, which is itself a combat state rather than terrain, so the passive has no meaningful trigger in play.
audit finding below confidence gate: Web Snare A drow priestess's snare is presented as a 60-foot ranged sighted effect, but nothing in the fiction or traits supports projecting webbing at that range; it reads as a spell-like ranged attack rather than a physical snare, making the name and the mechanic describe different things.
[reskin] audit: [Web Snare (Recharge 5-6): The Restrained condition…damage; Immunity to Poison and Psychic damage).")]
[reskin] audit defect: Actions/"Web Snare" [catalog] medium open_ended — The Restrained condition is applied with no escape DC or repeat save; the only listed exit is destroying the web, but nothing defines whether the caught creature or only other creatures can attack the web, leaving the restrained target with no rules-legal action to free itself. — Add an escape clause (escape DC or repeat save) usable by the caught creature, or state explicitly how a restrained creature attacks the restraining web. (about: "*Failure:* The target is caught in web and has the Restrained condition until the web is destroyed (AC 12; HP 15; Vulnerability to Fire damage; Immunity to Poison and Psychic damage).")
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 16 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Divine Aid (3/Day)" carries "priestess" which is not a whole clause — the seat surgery cut it; resolved to cl_1iv2t1q
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] done: "Yx'theral" — donor caster-6, CR 8
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 03-yx-theral.json — 1 recorded answer(s) unused
```

---

## 04-tobias-crane

## 04. Tobias Crane — CR 5

**Input:** `name: Tobias Crane | bounty hunter, nets and a hand crossbow, takes people alive`
**Donor:** skirmisher-3 -> CR 5
**Signature:** library

### Block
```
Tobias Crane

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

Skills Perception +3, Stealth +6

Senses Passive Perception 13

Languages Common, Thieves' cant

CR 5 (XP 1,800; PB +3)

Traits

Marked Quarry. Tobias knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Evasion. If Tobias is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Tobias instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Tobias makes two attacks, using Net, Hand Crossbow, or Shortsword in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Piercing damage.

Net. Ranged Attack Roll: +6, range 5/15 ft. If the target is Large or smaller, it has the Restrained condition until it escapes (escape DC 13).

Hand Crossbow. Ranged Attack Roll: +6, range 30/120 ft. 17 (4d6 + 3) Piercing damage, and Tobias has Advantage on its next attack roll against the target before the end of its next turn.

Snare Line (Recharge 5-6). Dexterity Saving Throw: DC 13, one Large or smaller creature Tobias can see within 60 feet. Failure: The target is caught in snare line and has the Restrained condition until the snare line is destroyed (AC 10; HP 10; Vulnerability to Slashing damage; Immunity to Poison and Psychic damage).

Bonus Actions

Cunning Action. Tobias takes the Dash, Disengage, or Hide action.

Reactions

Parry. Trigger: Tobias is hit by a melee attack roll while holding a weapon. Response: Tobias adds 2 to its AC against that attack, possibly causing it to miss.

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
!! [ENRICHMENT] Failed to enrich Yx'theral: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 3 taken name(s) the recording carried
[path] class_npc — class rogue — "bounty hunter" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon, snare — casts: the call reads no worked magic here | hold_shape: reach on the GM's own words "nets" | shoots: on the GM's own words "hand crossbow" | is_a_swarm: the call reads none in these words | skirmisher-hurler: ✓ ("nets") | skirmisher-archer: "crossbow" is a noun (a title), not a verb — no override | skirmisher-hurler: no line key in the words — the model's read of its quote
[concept] name: "Tobias Crane" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=armed/grasping mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Tobias Crane"
[concept] mechanics: thrown-weapon, snare
[concept] signature elements: netting and binding marks alive [behavior] | the hand crossbow [object] | hunting a bounty for coin [behavior]
[concept] identity: Tobias Crane opens every hunt from cover, planting a weighted net or a bolas to pin a mark before the fight ever becomes a chase, then works the perimeter with his hand crossbow, calling out each target's price and the exact debt owed. Every round after that he circles, re-slings spent nets, and drives quarry toward narrowing ground, favoring kneecaps and hamstrings over killing blows; under pressure he gives ground in measured retreats, spending hide and patience to wear a mark down, and only breaks contact when the odds turn hopeless, never when a bounty is still breathing.
[concept] lore: A licensed bounty hunter out of a river-town guildhall, Tobias Crane works the back roads for coin and reputation, and he considers every mark a debt to be collected alive and delivered whole.
[reskin] [path] class body: the rogue stands on the Bandit Captain — the class's own print block, nearest CR 5
[reskin] print canon route: the Bandit Captain's body outranks the hurler seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 15, DEX 16, CON 14, INT 14, WIS 11, CHA 14 — the Bandit Captain's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 5
[reskin] seats: action <- "netting and binding marks alive" | trait <- "the hand crossbow"
[reskin] [path] decides: class_npc on the Bandit Captain · class rogue (the matcher would have said homebrew)
[reskin] print canon: "Tobias Crane — bounty hunter, nets and a hand crossbow, takes people alive" heads on the Bandit Captain — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Crossbow Stock" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade
[reskin] named parts: Net (slot, Restrained, ranged), Hand Crossbow (clone, ranged) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] features: Vex on Hand Crossbow — the feature table, no call
[reskin] class kit: rogue — "bounty hunter": Cunning Action (Assassin/Cunning Action), Evasion (evasion)
[reskin] proper noun: "Tobias Crane" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Tobias" — the call's own answer (person), built from the name
[reskin] inline form: "Tobias" — the model's own reading of the name
[reskin] the sheet's declared ask: snare — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Tobias Crane — bounty hunter" -> has (descriptive), head | "nets and a hand crossbow" -> has (mechanical) [asked: attack] | "takes people alive" -> has (descriptive)
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (2 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "Tobias threads a Snare Line at a creature he can see, and on a failed " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Tobias's crossbow keeps a tally: whenever he hits a creature with his " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 30 of 30 answered; not true of this body: gaze-single, shield-bash, random-ray, spew, blink, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, web-walker, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "Tobias threads a Snare Line at a creature he can see, and on a failed Dexterity save the target has the Restrained condition as the cord cinches around a knee or throat; while Restrained this way, the target can't teleport or willingly leave the ground it stands on, and it must succeed on a Strength save at the end of each of its turns to tear free. A creature that tears free leaves the line snapp" [action/save/condition] [family: mark] — menu: snare, reel, condition-payoff, lure, ground-burst, snare-bolt, sensory-strike, disarm, exploiter, pacify, escalating-dread, terror-pulse, push-prone, reveal (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, snap-shot, riposte, answering-strike, affliction, contagion, stunning-strike, charge-push, pounce, isolation, bolt-mark, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — snare: snare, snare-bolt
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: snare (save/condition), snare-bolt (save/condition), lure (save/condition)
[reskin] keys would have bound: action — snare, snare-bolt, disarm (net, take)
[reskin] classification handed to the fit call: mechanic=thrown-weapon, snare
[reskin] word match declined by the call: snare-bolt, lure, sensory-strike, exploiter, pacify, escalating-dread, terror-pulse, push-prone, reveal, reel, condition-payoff, ground-burst, disarm, aggro-curse, bolt-mark, delayed-brand — the key word does not mean the mechanic here
[reskin] seat takes its clause: "Snare Line (Recharge 5-6)" is HANDED "Tobias Crane — bounty hunter" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: snare -> Actions/"Snare Line (Recharge 5-6)" ("threads a Snare Line at a creature, on a failed Dexterity save the target has th [verb: net:concept, snare:idea, thread:idea]")
[reskin] keys spent by the action: net
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Tobias's crossbow keeps a tally: whenever he hits a creature with his Hand Crossbow, the bolt pins cloth, flesh, or boot-sole, and until the end of his next turn he knows exactly where that creature is and can't be surprised by it — it counts as marked, and his attacks against a marked creature ignore Half Cover. He can have only one marked creature at a time; marking a new one frees the last." [trait/always/condition] [family: mark] — menu: phobia, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), faultless-tracker (always/condition), berserk (always/condition)
[reskin] classification handed to the fit call: mechanic=thrown-weapon, snare
[reskin] word match declined by the call: relentless-pursuit, bound, pack-tactics — the key word does not mean the mechanic here
[reskin] free signature row: "Marked Quarry" — the trait seat cannot quote the GM, but the call names the element it expresses: "the hand crossbow". Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Marked Quarry" is HANDED "Tobias Crane — bounty hunter" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): faultless-tracker -> Traits/"Marked Quarry" ("until the end of his next turn he knows exactly where that creature is and can't [verb: knows exactly where:idea, marked:idea]")
[reskin] weapons answered: Crossbow Stock = club; Hand Crossbow = hand crossbow
[reskin] weapon declared: "Crossbow Stock" is a club — the call's own answer (the name alone read crossbow)
[reskin] weapon dice keep the budget's die: "Crossbow Stock" is a club (d4), but 5d4 passes print's largest d4 attack row (3d4) — "16 (3d8 + 3)" stands
[reskin] weapon dice follow the weapon: the GM's "Hand Crossbow" is a hand crossbow (d6) — "16 (3d8 + 3)" becomes "17 (4d6 + 3)"
[reskin] weapon table: "Net" — thrown, range 5/15
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] print canon languages: "Common" -> "Common, Thieves' cant" — the Bandit Captain's
[reskin] print canon attack: "Crossbow Stock" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon: chassis row leaves — Traits/"Circling Stride" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Reactions/Parry — the Bandit Captain's own
[reskin] class weapon: Actions/"Scimitar" -> "Shortsword" — a rogue fights with a shortsword, not the Bandit Captain's
[reskin] multiattack normalised: "Tobias makes two attacks, using Net, Hand Crossbow, or Shortsword in any combination."
[reskin] free-row budget by card size: CR 5 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 7 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Marked Quarry" [trait/always/condition]
[reskin] row binds its clause: "Snare Line" answers "nets and a hand crossbow" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] lint: 0 findings
[reskin] audit sees the ask: 2 row(s) shown with the clause they were written for
[reskin] element claim revoked: "Marked Quarry" claims "the hand crossbow" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Marked Quarry")
[reskin] audit: [Marked Quarry: The tracker requires knowing which …reature it has damaged within the last 24 hours"), Snare Line (Recharge 5-6): The failure clause is u…to. (about: "The target is caught in snare line"), Net: The net imposes Restrained on the target but …ined condition until it escapes (escape DC 13).")]
[reskin] audit defect: Traits/"Marked Quarry" [model-written] high untrackable — The tracker requires knowing which creatures Tobias damaged up to 24 hours ago — history the GM cannot reconstruct mid-combat and that nothing on the sheet records. — Key the tracking to a creature currently bearing a mark the attack applies on hit, or otherwise record the damaged target at the moment of the hit. (about: "Tobias knows the direction and distance to any creature it has damaged within the last 24 hours")
[reskin] audit defect: Actions/"Snare Line" [catalog] medium wording — The failure clause is ungrammatical ("caught in snare line") and the snare line object is never given a location or established in the space, leaving the GM unsure where the destructible object sits relative to the restrained target. — Phrase the failure as the target being caught in a snare line anchored at a stated position the target can be freed from or that the attacker can be tracked to. (about: "The target is caught in snare line")
[reskin] audit defect: Actions/"Net" [model-written] low other — The net imposes Restrained on the target but grants no attack-roll penalty or other effect to the attacker and does not say the net is spent or the attacker loses it, so a bounty hunter's signature restraint reads as free unlimited hard control with no cost or limit named. — State whether the net is consumed/one-use or how it is recovered after a throw, matching the fiction of a physical thrown net. (about: "If the target is Large or smaller, it has the Restrained condition until it escapes (escape DC 13).")
[reskin] seed share: 0 of 3 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Evasion" carries "bounty hunter" which is not a whole clause — the seat surgery cut it; resolved to cl_gtyo06
[reskin] clause id by substring: "Cunning Action" carries "bounty hunter" which is not a whole clause — the seat surgery cut it; resolved to cl_gtyo06
[reskin] signature tally: 2 seat(s) -> 3 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] done: "Tobias Crane" — donor skirmisher-3, CR 5
[reskin] ledger: 1 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 04-tobias-crane.json
```

---

## 05-butcher-of-karrow

## 05. Butcher of Karrow — CR 6

**Input:** `name: The Butcher of Karrow | cult enforcer with a meat cleaver, heals when he kills | role: brute`
**Donor:** brute-5-regenerator -> CR 6
**Signature:** library

### Block
```
Butcher of Karrow
Medium humanoid, neutral evil
Armor Class

13 (studded leather)

Hit Points: 

112 (15d8 + 45)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

12 (+1)

	

16 (+3)

	

10 (+0)

	

15 (+2)

	

15 (+2)

Skills: 

Athletics +6, Perception +5

Saving Throws: 

STR +6, CON +6

Senses: 

passive Perception 15

Languages: 

Common

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Wounded Certainty.Whenever a creature within the butcher's reach is reduced to 0 hit points, the seams on the butcher's flesh glow, and his Cleaver attacks deal an extra 7 (2d6) slashing damage until the end of his next turn.
Regeneration.The butcher regains 10 hit points at the start of each of its turns. If the butcher takes Acid or fire damage, this trait doesn't function on the butcher's next turn. The butcher dies only if it starts its turn with 0 hit points and doesn't regenerate.

Actions
Multiattack: The butcher makes three Cleaver attacks.
Cleaver: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (3d6 + 3) slashing damage.
Cult's Favor (Recharge 5-6): One creature the butcher can see within 60 feet that is below half its hit point maximum must make a DC 14 Dexterity saving throw. On a failed save, if the target has 13 hit points or fewer, it drops to 0 hit points. Otherwise, it takes 13 (3d8) bludgeoning damage. On a successful save, Half damage only.
```

### Trace
```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
!! [ENRICHMENT] Failed to enrich Tobias Crane: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 4 taken name(s) the recording carried
[path] homebrew — "cult enforcer with a meat cleaver, heals when he kills" (call)
[route] brute-regenerator type=Humanoid mechanics=regeneration — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-regenerator: ✓ ("heals when it kills") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] name: "Butcher of Karrow" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Humanoid typeFrom=the route call themes=armed/devouring mind=sapient style=regenerator energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Butcher of Karrow"
[concept] mechanics: regeneration
[concept] signature elements: meat cleaver [object] | heals when it kills [behavior] | wounds knit shut mid-fight [body]
[concept] identity: The Butcher opens by walking straight into the thickest press of bodies, cleaver high, letting the first cuts land so he can answer with a killing blow that knits his wounds shut. Every round after, he works the same brutal engine: trade a hit, take a life, feel the flesh close — mass and edge doing what armor cannot. He is no mindless animal but a cultist-drunk who fights to the death and mistakes the closing wounds for a god's favor, growing louder and more certain the longer the fight draws on.
[concept] lore: The Butcher of Karrow is a cult's chosen hand, a killer whose bled-out victims feed the seam that seals his own flesh, and he wants only to cut until the congregation calls him holy.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] mind tier: INT 6 -> 10 — the call read this creature as ordinary at CR 6
[reskin] mind tier: WIS 8 -> 15 — the call read this creature as capable at CR 6
[reskin] mind tier: CHA 6 -> 15 — the call read this creature as capable at CR 6
[reskin] donor: brute-5-regenerator -> CR 6
[reskin] seats: package <- "meat cleaver"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the butcher" — the call answered "the butcher" (kind), which the name does not support
[reskin] inline form: "the butcher" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: escalate — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "The Butcher of Karrow — cult enforcer with a meat cleaver" -> has (descriptive), head | "heals when he kills" -> has (mechanical) [asked: on_hit/heal] [askMechanic: mend]
[reskin] open asks handed to the idea call: "heals when he kills" [mend] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "When the butcher drops a creature to 0 Hit Points with a Cleaver attac" answers the GM's "heals when he kills"
[reskin] idea unanchored: trait — "The butcher grows louder and more certain as blood spills — whenever a" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 30 of 30 answered; not true of this body: shield-bash, active-toll, random-ray, spew, herd, shell-withdraw, rally, coating, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, hook-rider
[reskin] menu: taste stands down — action answers the GM's "heals when he kills", so role and style do not filter the menu (legality still does); 8 template(s) offered
[reskin] signature idea (action): "When the butcher drops a creature to 0 Hit Points with a Cleaver attack, his wounds knit before the body hits the floor — he regains a chunk of Hit Points and the nearest living foe must make a Wisdom saving throw or be Frightened of him until the end of its next turn, seeing the cult's favor made flesh." [rider/on_hit/resource] [family: heal] — menu: affliction, contagion, stunning-strike, charge-push, pounce, life-drain, isolation, charge (+ shelf: ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, drain, wind-up, thrown-burst, execute, lure, pacify, slow-bolt, sensory-strike, disarm, delayed-brand, curse-debt, reveal, second-wind, aggro-curse, self-invisibility, focus, rampage, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte)
[reskin] composed candidates: none action — the heal family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — escalate: isolation, execute, rampage
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does resource; leading: isolation (on_hit/damage), execute (save/damage), rampage (once_per_fight/damage)
[reskin] keys would have bound: action — lay-on-hands (heal, heals, healing)
[reskin] classification handed to the fit call: mechanic=regeneration shape=heal when=on_hit
[reskin] word match declined by the call: contagion, stunning-strike, life-drain, affliction, isolation — the key word does not mean the mechanic here
[reskin] closest refused: action — "affliction" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: the creature itself regains Hit Points when its attack drops a foe to )
[reskin] clause already answered: "heals when he kills" is carried by "Regeneration" — the seat read the sheet and declined to write a second row for it
[reskin] seat stands down: action — "heals when he kills" is already carried by a row on this sheet; no second row is written for it
[reskin] closest refused — subject flipped: action — the call named "affliction" nearest and judged its subject FLIPPED against the clause (the creature itself regains Hit Points when its attack drops a foe to ); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] the declared ask's own template lands: action — the sheet's declared ask is "escalate", the seat that carries it ended with no row, and "execute" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] value check: "Cult's Favor (1/Day)" EV 17.2 vs floor 21.5 (the whole Multiattack (3 attacks)) — added Success: Half; still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature re-slotted: "Cult's Favor" moves to one attack of the Multiattack — EV 17.2 vs floor 6.8 there; the GM's verb keeps its row
[reskin] signature template: execute -> Actions/"Cult's Favor (Recharge 5-6)" ("the idea's core is the butcher regaining Hit Points on a kill, plus a fear burst [verb: kill:concept, end:idea]")
[reskin] keys spent by the action: kill
[reskin] signature idea (trait): "The butcher grows louder and more certain as blood spills — whenever any creature within reach of him is reduced to 0 Hit Points, the seams on his flesh glow and his Cleaver attacks deal extra Slashing damage until the end of his next turn." [trait/always/damage] [family: kill-growth] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial, assassinate (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the kill-growth family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — escalate: bloodied-fury, blood-frenzy, berserk, assassinate
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: bloodied-fury (always/defense), blood-frenzy (always/damage), berserk (always/condition)
[reskin] classification handed to the fit call: mechanic=regeneration shape=heal when=on_hit
[reskin] word match declined by the call: blood-frenzy, assassinate, pack-tactics, death-restoration, undead-fortitude — the key word does not mean the mechanic here
[reskin] closest refused: trait — "blood-frenzy" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: triggers an extra-damage bonus on the cleaver when a nearby creature d)
[reskin] seat answered, but: the call said "whenever any creature within reach of him is reduced to 0 Hit Points, the seams on his flesh glow and his Cleaver attack" is carried by "Bloodied Certainty", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("triggers an extra-damage bonus on the cleaver when a nearby creature d") and wrote a trait instead: "Bloodied Certainty" -> Traits. Whenever a creature within the butcher's reach is reduced to 0 Hit Points, the seams on the butcher's flesh glow, and hi
[reskin] authored row numbers: "Bloodied Certainty" — the call declared 1 number(s) promised
[reskin] free signature row: "Bloodied Certainty" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Bloodied Certainty" ("The butcher grows louder and more certain as blood spills — whenever any creature within reach of him is reduced to 0 Hit Points, the seams on his flesh glow an [authored: the catalog held no shape for it]")
[reskin] weapons answered: Cleaver = Handaxe
[reskin] weapon declared: "Cleaver" is a handaxe — the call's own answer
[reskin] weapon dice follow the weapon: "Cleaver" is a handaxe (d6) — "12 (2d8 + 3)" becomes "13 (3d6 + 3)", print's rule of keeping the die and scaling the count
[reskin] weapon reach follows the weapon: "Cleaver" is a handaxe — reach 10 ft becomes 5 ft (the table's own)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "cult enforcer with a meat cleaver, heals" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Bloodied Certainty" [no template]
[reskin] threshold re-derived after the cap: Actions/Cult's Favor (Recharge 5-6) — 30 over the row's own 13 damage, so the kill branch beat the damage branch; threshold to 13
[reskin] row binds its clause: "Cult's Favor" answers "heals when he kills" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "heals when he kills" -> "Regeneration" — trigger: asked on_hit, row reads start_of_turn
[reskin] lint: 0 findings
[reskin] element claim revoked: "Bloodied Certainty" claims "heals when it kills" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Bloodied Certainty")
audit finding below confidence gate: Cult's Favor The execute threshold is a flat HP number rather than a fraction tied to the creature's own HP, so it is a variable-cost finisher whose bite shrinks unpredictably with the target's max HP and reads as an instant-kill clause rather than the cult favor damaging its victim.
[reskin] audit: [Cult's Favor (Recharge 5-6): The targeting clause …ied creature the butcher can see within 60 feet"), Cult's Favor (Recharge 5-6): Dropping a creature t…counterplay. (about: "it drops to 0 Hit Points."), Bloodied Certainty: The trigger leaves ambiguous w… the butcher's reach is reduced to 0 Hit Points"), Bloodied Certainty: The flavor text describes fles… (about: "the seams on the butcher's flesh glow")]
[reskin] audit defect: Actions/"Cult's Favor" [catalog] high dead_reference — The targeting clause names Bloodied, but nothing on the sheet defines the Bloodied status or makes it otherwise referenced, leaving the GM a condition with no in-block rules or exit. — Define Bloodied in terms of a HP threshold the block states (e.g., targets at half HP or fewer), or remove the Bloodied qualifier from the targeting line. (about: "one Bloodied creature the butcher can see within 60 feet")
[reskin] audit defect: Actions/"Cult's Favor" [catalog] medium open_ended — Dropping a creature to 0 HP from a single saving throw with no follow-up state is effectively a removal effect that the target cannot respond to; the only out is the one-time save, and there is no stabilization or escape clause afterward. — Either make the drop-to-0 conditional on a failed save with a repeat save on the following turn, or convert it to damage so the target's own hp pool supplies the counterplay. (about: "it drops to 0 Hit Points.")
[reskin] audit defect: Traits/"Bloodied Certainty" [model-written] medium other — The trigger leaves ambiguous whether the butcher is the one reducing the creature to 0 HP or any creature anywhere within his reach; the condition is underdetermined and the trait can fire on environmental deaths. — Specify the reduction must be caused by the butcher's Cleaver attack (or his own action) for the trait to trigger. (about: "Whenever a creature within the butcher's reach is reduced to 0 Hit Points")
[reskin] audit defect: Traits/"Bloodied Certainty" [model-written] low undelivered — The flavor text describes flesh seams glowing but the mechanical effect is bonus Cleaver damage; the name and imagery promise a transformation or healing, yet the trait only buffs damage, slightly mismatching the cult-enforcer 'heals when it kills' brief without delivering or explaining the gap. — Reword the flavor line to match the damage buff (e.g., a sudden surge of blood-fed strength on the cleaver) or attach a token healing effect if the kill-heal is intended. (about: "the seams on the butcher's flesh glow")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause unresolved: "Bloodied Certainty" carries "The butcher grows louder and more certain as blood spill", which matches no clause on the sheet — no coverage credit by id
[reskin] [gap] the creature itself regains Hit Points when its attack drops a foe to 0 — "When the butcher drops a creature to 0 Hit Points with a Cleaver attack, his wounds knit before the body hits the floor — he regains a chunk of Hit Points and the nearest living foe must make a Wisdom saving throw or be Frightened of him until the end of its next turn, seeing the cult's favor made flesh." — Butcher of Karrow [seat: action [rider/on_hit/resource]] (closest offered: affliction) [effect: resource] [menu: isolation execute rampage affliction contagion stunning-strike charge-push pounce life-drain charge thrown-burst-seed thrown-burst] [same-cell unoffered: none] [same-seat rejected: hook-rider:body-verdict snatch:movement bolt-restrain:role bolt-drag:role bolt-mark:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 1 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Butcher of Karrow" — donor brute-5-regenerator, CR 6
[reskin] ledger: 1 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 1 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (3 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 05-butcher-of-karrow.json
```

---

## 06-nib

## 06. Nib — CR 1/2

**Input:** `name: Nib | pixie thief, steals one thing and runs`
**Donor:** skirmisher-1 -> CR 0.5
**Signature:** library

### Block
```
Nib

Tiny Fey, Neutral

AC 13
Initiative +2 (12)

HP 16 (3d8 + 3)

Speed 30 ft.

MOD
SAVE
STR
11
+0
+0
INT
11
+0
+0
MOD
SAVE
DEX
14
+2
+2
WIS
13
+1
+1
MOD
SAVE
CON
12
+1
+1
CHA
11
+0
+0

Skills Nature +4, Perception +5, Stealth +6, Survival +5

Senses darkvision 60 ft.; Passive Perception 15

Languages Common plus one other language

CR 1/2 (XP 100; PB +2)

Traits

Guttering Mote. While Nib is in an area of Dim Light or Darkness, Nib sheds Dim Light in a 5-foot radius and has the Invisible condition; if Nib takes Radiant damage, this light gutters and Nib loses the Invisible condition until the end of her next turn.

Actions

Multiattack. Nib makes two attacks, using Shortsword or Shortbow in any combination. It can replace one attack with a use of Pilfer.

Shortsword. Melee Attack Roll: +4, reach 5 ft. 5 (1d6 + 2) Piercing damage.

Shortbow. Ranged Attack Roll: +4, range 80/320 ft. 6 (1d8 + 2) Piercing damage.

Pilfer. Nib makes one Shortsword attack. If it hits a creature, that creature is subjected to the following effect. Wisdom Saving Throw: DC 12. Failure: The target has the Frightened condition until the end of its next turn.

Bonus Actions

Nimble Escape. Nib takes the Disengage or Hide action.

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
!! [ENRICHMENT] Failed to enrich Butcher of Karrow: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 5 taken name(s) the recording carried
[path] class_npc — class rogue — "thief" (call)
[route] skirmisher-skulker type=Fey mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-skulker: ✓ ("steals one thing and runs") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] name: "Nib" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Fey typeFrom=the route call themes=fey/beguiling mind=sapient style=skulker energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Nib"
[concept] mechanics: none claimed
[concept] signature elements: steals exactly one thing and flees [behavior] | a body of living, dancing light [body] | dazzling flare-and-vanish retreats [aura]
[concept] identity: Nib opens by slipping out of cover to palm exactly one interesting object — a coin, a key, a ring — with a lightning-quick larcenous touch, then wings away trailing fey light before anyone can close on her. Every round after, she circles just out of reach, feints with little thorn-pricks of distraction, and darts back in only for the next theft, always giggling and naming what she's already taken. Bloodied or cornered, she has no stomach for a real fight: she drops everything but her prize, bolts for the nearest crack or canopy, and vanishes into the light, only to torment the same party again from a new hiding place an hour later.
[concept] lore: A courtless fey pickpocket born from a stray gleam of light caught in a hedge-thorn, Nib lives to own for one glorious second whatever is shiniest in a traveler's pocket — and to hear them notice it missing.
[reskin] [path] class body: the rogue stands on the Scout — the class's own print block, nearest CR 0.5
[reskin] the concept outranks the alias: the Scout is a Humanoid and the concept reads Fey — the words RESEMBLE it, they do not name it, so the alias match stands down. Print canon is decided separately and may still run on this sheet
[reskin] print canon route: the Scout's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 22 -> 16, AC 14 -> 13 — the Scout's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 13 (leather) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 11, DEX 14, CON 12, INT 11, WIS 13, CHA 11 — the Scout's at its own CR; attack +4 -> +4, DC 12 (print's)
[reskin] donor: skirmisher-1 -> CR 0.5
[reskin] seats: action <- "steals exactly one thing and flees" | trait <- "a body of living, dancing light"
[reskin] [path] decides: class_npc on the Scout · class rogue (the matcher would have said homebrew)
[reskin] print canon: "Nib — pixie thief, steals one thing and runs" heads on the Scout — print's rows ride along; the seat stays
[reskin] claim gate: CR 0.5 but a Fey body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] class kit: evasion — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: rogue — "thief": Cunning Action (Assassin/Cunning Action)
[reskin] proper noun: "Nib" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Nib" — the call's own answer (person), built from the name
[reskin] inline form: "Nib" — the model's own reading of the name
[reskin] final price: the chassis's Multiattack: the round ran 10 against the card's 8 — the attack rows re-solve at 84% (2 attacks off one row after a supersede)
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Nib — pixie thief" -> has (descriptive), head | "steals one thing and runs" -> has (mechanical) [asked: condition] [askMechanic: relic]
[reskin] open asks handed to the idea call: "steals one thing and runs" [relic] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "Nib makes a melee attack roll against a creature's AC; on a hit, she s" answers the GM's "steals one thing and runs"
[reskin] idea unanchored: trait — "Nib's body is a mote of dancing light that sheds dim light in a small " names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 16 of 16 answered; not true of this body: spew, snare-bolt, blink, coating, phase-slip, false-appearance, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, mimicry, death-burst, kill-denial
[reskin] menu: taste stands down — action answers the GM's "steals one thing and runs", so role and style do not filter the menu (legality still does); 2 template(s) offered
[reskin] signature idea (action): "Nib makes a melee attack roll against a creature's AC; on a hit, she steals one visible object the target is holding or wearing (a coin, key, ring) and the target must make a Wisdom saving throw or be Frightened of Nib until the end of its next turn, as the sudden absence distracts it." [rider/on_hit/condition] [family: mark] — menu: contagion, pounce (+ shelf: lure, sensory-strike, disarm, thrown-burst-seed, delayed-brand, pacify, escalating-dread, terror-pulse, slow-bolt, push-prone, curse-debt, reveal, wind-up, patient-defense, aggro-curse, self-invisibility, focus, feint-slip)
[reskin] lead by this seat's own clause: action — "relic" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: contagion (on_hit/condition), pounce (on_hit/condition), sensory-strike (save/condition)
[reskin] keys would have bound: action — disarm (steal)
[reskin] classification handed to the fit call: shape=condition
[reskin] word match declined by the call: contagion, pounce, sensory-strike, pacify, thrown-burst-seed — the key word does not mean the mechanic here
[reskin] closest refused: action — "contagion" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: steals a held object from the target on a hit, then frightens it until)
[reskin] strike points at its attack: "Pilfer" makes one Needle attack and adds a Wisdom save — Multiattack offers it in place of one attack, which is the exchange and the whole limit (owner's ruling, 21 November)
[reskin] seat takes its clause: "Pilfer" is HANDED "Nib — pixie thief" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Pilfer" ("null")
[reskin] signature idea (trait): "Nib's body is a mote of dancing light that sheds dim light in a small radius and renders her invisible while she is in an area of dim light or darkness, though the light gutters and reveals her for a moment if she takes radiant damage." [trait/always/defense] [family: zone] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, shielded-mind, bound, undead-fortitude
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (always/defense): bloodied-fury, shielded-mind, undead-fortitude; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the zone family has no payload that does "defense" (it offers damage, condition, movement)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), shielded-mind (always/defense), undead-fortitude (always/defense)
[reskin] word match declined by the call: phobia, bound, undead-fortitude, shielded-mind — the key word does not mean the mechanic here
[reskin] closest refused: trait — "bloodied-fury" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: grants Invisibility while in dim light or darkness, and ends that Invi)
[reskin] seat answered, but: the call said "Nib's body is a mote of dancing light that sheds dim light in a small radius and renders her invisible while she is in a" is carried by "Guttering Mote", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("grants Invisibility while in dim light or darkness, and ends that Invi") and wrote a trait instead: "Guttering Mote" -> Traits. While Nib is in an area of Dim Light or Darkness, Nib sheds Dim Light in a 5-foot radius and has the Invisible condition
[reskin] authored row numbers: "Guttering Mote" — the call declared 1 number(s) promised
[reskin] free signature row: "Guttering Mote" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Guttering Mote" is HANDED "Nib — pixie thief" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Guttering Mote" ("Nib's body is a mote of dancing light that sheds dim light in a small radius and renders her invisible while she is in an area of dim light or darkness, though  [authored: the catalog held no shape for it]")
[reskin] weapons answered: Needle = none; Gleam = none
[reskin] weapon table: "Gleam" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] print canon modes: fly off — the Scout has no such mode and the words name none
[reskin] speed by concept: dropped Fly 30 ft. (hover) — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon type: the call answered type_source=user for fey, but the GM's words do not name it — the Scout's own type stands
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Scout's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Fey stays — the Scout is the class's BODY on this path, not this creature's kind (print's own NPC blocks are all Humanoid)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Scout's
[reskin] print canon attack: "Needle" -> "Shortsword" — the Scout's own row
[reskin] print canon multiattack: "Nib makes two attacks, using Shortsword and Longbow in any combination." — the Scout's own
[reskin] print canon attack: "Longbow" is print's own row — +4, 6 (1d8 + 2), range 150/600 ft. (an exact body at print's CR)
[reskin] print canon attack: "Gleam" -> "Longbow" — the Scout's own ranged row
[reskin] print canon saves: proficient in nothing — the Scout's own set, at this sheet's stats and PB 2 (changed DEX)
[reskin] print canon skills: "Perception +3, Stealth +4" -> "Nature +4, Perception +5, Stealth +6, Survival +5" — the Scout's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon: chassis row leaves — Traits/"Lightfoot" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] class weapon: "shortsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] class weapon: Actions/"Longbow" -> "Shortbow" — a rogue fights with a shortbow, not the Scout's
[reskin] multiattack replacement clause: It can replace one attack with a use of Pilfer.
[reskin] multiattack normalised: "Nib makes two attacks, using Shortsword or Shortbow in any combination. It can replace one a"
[reskin] free-row budget by card size: CR 0.5 sits in band 0-2, where print runs 1-4 rows (p20-p90, Multiattack excluded); this card already carries 4 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Guttering Mote" [no template]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 2 row(s) shown with the clause they were written for
[reskin] element expressed: Guttering Mote carries "a body of living, dancing light" — "Nib sheds Dim Light in a 5-foot radius"
[reskin] audit: [Guttering Mote: The trait's stated trigger (gutter…isible condition until the end of her next turn"), Pilfer: Pilfer is named for stealing and the GM as… creature is subjected to the following effect."), Pilfer: Frightened has no escape clause here — unl…tened condition until the end of its next turn.")]
[reskin] audit defect: Traits/"Guttering Mote" [model-written] medium untrackable — The trait's stated trigger (guttering on Radiant damage) never interacts with the Invisible condition the trait itself grants from Dim Light or Darkness, so losing Invisibility on Radiant damage is a dead clause unless the GM tracks that Nib was standing in Dim Light or Darkness at the moment of damage, which the block gives no way to adjudicate. — State the trigger in terms of what the GM can check: Nib's Invisible condition ends when she takes Radiant damage, regardless of the light she is standing in. (about: "if Nib takes Radiant damage, this light gutters and Nib loses the Invisible condition until the end of her next turn")
[reskin] audit defect: Actions/"Pilfer" [model-written] high undelivered — Pilfer is named for stealing and the GM asked for 'steals one thing and runs', but the row only imposes Frightened on a hit and steals nothing — no object, no possession, no theft of any kind occurs. — Rewrite the rider so that a successful Pilfer actually removes or grabs an item from the target, with the Frightened condition as a possible side-effect rather than the whole payload. (about: "If it hits a creature, that creature is subjected to the following effect.")
[reskin] audit defect: Actions/"Pilfer" [model-written] medium open_ended — Frightened has no escape clause here — unlike a standard Frightened effect, which allows a repeat save or an escape DC, this rider simply ends after one turn with no defined terms for the target to act on. — Add a repeat save or a stated end-condition that does not depend on the GM guessing when 'its next turn' began. (about: "The target has the Frightened condition until the end of its next turn.")
[reskin] clause id by substring: "Nimble Escape" carries "thief" which is not a whole clause — the seat surgery cut it; resolved to cl_i34sto
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] done: "Nib" — donor skirmisher-1, CR 0.5
[reskin] ledger: 1 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 06-nib.json — 1 recorded answer(s) unused
```

---

## 07-bramwel-coalspur

## 07. Bramwel Coalspur — CR 4

**Input:** `dwarf artificer`
**Donor:** skirmisher-8-hurler -> CR 4 (invented — no printed peer)
**Signature:** library

### Block
```
Bramwel Coalspur

Medium Construct, Neutral

AC 16
Initiative +4 (14)

HP 75 (10d8 + 30)

Speed 50 ft.

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

Immunities Fire, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Rammed Earth Gait. Bramwel ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Bramwel makes two attacks, using Clockwork Arm or Alchemical Hammer in any combination. It can replace one attack with a use of Deadfall Snare.

Clockwork Arm. Melee Attack Roll: +6, reach 5 ft. 7 (1d6 + 4) Bludgeoning damage plus 4 (1d8) Fire damage.

Alchemical Hammer. Ranged Attack Roll: +6, range 20/60 ft. 8 (1d8 + 4) Bludgeoning damage. Hit or Miss: Immediately after the attack, its alchemical hammer returns to Bramwel's grasp.

Cinder Grenade (Recharge 5-6). Bramwel hurls its alchemical hammer at a point it can see within 90 feet. Dexterity Saving Throw: DC 13, each creature in a 5-foot-radius Sphere centered on that point. Failure: 24 (7d6) Fire damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Deadfall Snare. Dexterity Saving Throw: DC 13, one creature within 30 feet. Failure: 10 (3d6) Bludgeoning damage, and the target is pushed up to 5 feet straight away from Bramwel, and the target has the Restrained condition until the end of its next turn. Success: Half damage only.

Bonus Actions

Fleet Agility. Bramwel takes the Dash or Disengage action.

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
!! [ENRICHMENT] Failed to enrich Nib: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 6 taken name(s) the recording carried
[concept] thin concept expanded before routing: dwarf artificer — A dwarf artificer opens combat by hurling an alchemically-charged hammer or a clockwork grenade from mid-range, then repositions behind cover to reload and re-arm while its clockwork servitor arms harass the front line. Every round it alternates suppressing thrown fire with tinkeri
[concept] expansion answered: type=Construct (type_source=inferred) material=iron size=Medium mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: thrown-weapon
[path] homebrew — "dwarf artificer" (call)
[route] skirmisher-hurler type=Construct mechanics=thrown-weapon, snare — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-hurler: ✓ ("opens combat by hurling an alchemically-") | brute-charger: the call read "charge" as not meaning that mechanic here — no override | skirmisher-hurler stands: every key that would override it was read as a figure of speech | skirmisher-hurler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Construct typeFrom=the route call themes=forged/armed mind=sapient style=hurler energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon, snare
[concept] signature elements: thrown alchemical hammers and clockwork grenades [object] | a re-arming, self-repairing iron chassis [body] | prepared tunnels and traps sprung in retreat [behavior]
[concept] identity: A dwarf artificer opens combat by hurling an alchemically-charged hammer or a clockwork grenade from mid-range, then repositions behind cover to reload and re-arm while its clockwork servitor arms harass the front line. Every round it alternates suppressing thrown fire with tinkering buffs on its own gear, and under pressure it fights to the last charge — retreating only to spring a mined tunnel or collapse a passage it prepared days ago.
[concept] lore: An exile from a fallen forge-citadel, the artificer wanders the under-road trading repairs for scrap, and wants nothing more than the components to rebuild the engine that will bring its city's furnaces back to life.
[reskin] mind tier held: WIS stays 14 against "capable" — the card's 14 is already capable
[reskin] mind tier held: CHA stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier: INT 10 -> 15 — the call read this creature as capable at CR 4
[reskin] donor: skirmisher-8-hurler -> CR 4 (invented — no printed peer)
[reskin] seats: action <- "prepared tunnels and traps sprung in retreat" | trait <- "a re-arming, self-repairing iron chassis"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "Bramwel" — the call's own answer (person), built from the name
[reskin] inline form: "Bramwel" — the model's own reading of the name
[reskin] the sheet's declared ask: burst — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "dwarf artificer" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "Bramwel triggers a hidden charge in a tunnel wall or floor it prepared" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "When Bramwel is reduced to half its hit points or fewer, its clockwork" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 29 of 29 answered; not true of this body: snare, shield-bash, snare-bolt, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — thrown-burst-seed, push-prone (the sheet cannot render them)
[reskin] signature idea (action): "Bramwel triggers a hidden charge in a tunnel wall or floor it prepared earlier, collapsing a section of passage. Each creature in a cube centered on a point Bramwel can see within a prepared tunnel must make a Dexterity saving throw; on a failure, it takes Bludgeoning damage and has the Restrained condition until it uses its action to dig free, and on a success it takes half damage and is pushed o" [action/save/condition] [family: zone] — menu: condition-payoff, throw-retrieve, sensory-strike, disarm, exploiter, gaze-single, seal, pacify, escalating-dread, terror-pulse (+ shelf: lure, delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, answering-strike, charge-push, pounce, isolation, bolt-mark)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] declared mechanic leads the menu: action — burst: throw-retrieve
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: throw-retrieve (always/damage), sensory-strike (save/condition), exploiter (save/condition)
[reskin] classification handed to the fit call: mechanic=thrown-weapon, snare
[reskin] word match declined by the call: sensory-strike, gaze-single, pacify, escalating-dread, terror-pulse, exploiter, throw-retrieve — the key word does not mean the mechanic here
[reskin] closest refused: action — "seal" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: area terrain collapse that restrains and must be dug free from)
[reskin] seat answered, but: the call said "Bramwel triggers a hidden charge in a tunnel wall or floor it prepared earlier, collapsing a section of passage. Each cr" is carried by "Deadfall Charge", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("area terrain collapse that restrains and must be dug free from") and wrote an action instead: "Deadfall Charge" -> Actions. *Dexterity Saving Throw*: DC 13, one creature within 30 feet. *Failure:* 11 (2d10) Bludgeoning damage, and the target is
[reskin] authored row numbers: "Deadfall Charge" — the call declared (unanswered) number(s) promised
[reskin] value check: "Deadfall Charge" EV 13.3 vs floor 5.2 (one attack of 2) — dice 11 → 10 (scaled down to the ceiling); a nova already stands — kept ungated, dice to 10 at the ceiling
[reskin] signature authored: no template — the seat wrote it -> Actions/"Deadfall Charge" ("Bramwel triggers a hidden charge in a tunnel wall or floor it prepared earlier, collapsing a section of passage. Each creature in a cube centered on a point Bra [authored: the catalog held no shape for it]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "When Bramwel is reduced to half its hit points or fewer, its clockwork servitor arm detaches and burrows into the nearest loose earth or rubble, spending its stored charge to re-arm Bramwel's alchemical hammer and vent searing steam in a small radius; until the end of its next turn, Bramwel's attacks deal extra Fire damage and it can use Cinder Grenade even if it is recharging." [trait/always/resource] [family: payoff] — menu: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does resource; leading: phobia (always/condition), terrain-walk (always/movement), bloodied-fury (always/defense)
[reskin] classification handed to the fit call: mechanic=thrown-weapon, snare
[reskin] word match declined by the call: relic-object, bloodied-fury, berserk, terrain-walk — the key word does not mean the mechanic here
[reskin] closest refused: trait — "relentless-pursuit" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: when reduced to half HP, the arm detaches to recharge the hammer and b)
[reskin] seat answered, but: the call said "When Bramwel is reduced to half its hit points or fewer, its clockwork servitor arm detaches and burrows into the neares" is carried by "Servitor Detachment", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "When Bramwel is reduced to half its hit points or fewer, its clockwork" and wrote no row of that kind (refused: "Servitor Detachment" — the call counts 3 number(s) the row promises and only 1 are written — a promised amount, area or bonus with no number cannot be run) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Servitor Detachment" — the call counts 3 number(s) the row promises and only 1 are written — a promised amoun); asking once more with the reason
[reskin] seat answered, but: the call said "When Bramwel is reduced to half its hit points or fewer, its clockwork servitor arm detaches and burrows into the neares" is carried by "Servitor Detachment", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "When Bramwel is reduced to half its hit points or fewer, its clockwork" and wrote no row of that kind (refused: "Servitor Detachment" — the call counts 2 number(s) the row promises and only 1 are written — a promised amount, area or bonus with no number cannot be run) (it belongs in the description)
[reskin] seat refused twice: trait — first: "Servitor Detachment" — the call counts 3 number(s) the row promises and only 1 are writte; second: "Servitor Detachment" — the call counts 2 number(s) the row promises and only 1 are writte; the seat stays empty
[reskin] closest refused — subject flipped: trait — the call named "relentless-pursuit" nearest and judged its subject FLIPPED against the clause (when reduced to half HP, the arm detaches to recharge the hammer and b); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "When Bramwel is reduced to half its hit points or fewer, its clockwork servitor arm detaches and burrows into the nearest loose earth or rubble, spending its stored charge to re-arm Bramwel's alchemical hammer and vent searing steam in a small radius; until the end of its next turn, Bramwel's attacks deal extra Fire damage and it can use Cinder Grenade even if it is recharging." [trait/always/resource] — the model found no template that holds it (offered: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, assassinate, truth-aura, fear-aura, resonant-body)
[reskin] weapons answered: Clockwork Arm = none; Hammer = warhammer; Cinder Grenade = none; Magnet Winch = none
[reskin] weapon table: "Hammer" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] chassis nova: "Cinder Grenade (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] attack name by anatomy: "Hammer" -> "Alchemical Hammer" — Hammer names a melee weapon on a ranged row
[reskin] rename propagated: "Hammer" -> "Alchemical Hammer" in "Multiattack"
[reskin] element immunity: Fire — the call read this creature's energy as Fire and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Fire (merged into the header write)
[reskin] immunities stamped for type: Construct -> Fire, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "dwarf artificer" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Deadfall Charge.
[reskin] free-row budget by card size: CR 4 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Deadfall Charge" [no template]
[reskin] name follows content: Actions/"Deadfall Charge" promises movement the row never delivers — "Deadfall Snare" (the call's modifier kept, the claim word swapped for a noun the row earns)
[reskin] citation follows the rename: "Multiattack" cited "Deadfall Charge", which is still on this sheet as "Deadfall Snare" — the citation re-points rather than going
[reskin] lint: 0 findings
[reskin] audit: [Cinder Grenade (Recharge 5-6): The recharge action…al hammer at a point it can see within 90 feet."), Deadfall Snare: On a successful save the snare doe…only snare. (about: "Success: Half damage only.")]
[reskin] audit defect: Actions/"Cinder Grenade" [catalog] medium other — The recharge action throws the 'alchemical hammer', but Alchemical Hammer's own text says the hammer returns to Bramwel's grasp immediately after the attack, so the thrown object was never lost and hurl-until-recharge fiction is undefined. — Reconcile the object: either Cinder Grenade uses a distinct grenade/charge that is spent, or drop the returning-hammer clause so the hammer is the thrown object until it comes back. (about: "Bramwel hurls its alchemical hammer at a point it can see within 90 feet.")
[reskin] audit defect: Actions/"Deadfall Snare" [model-written] low undelivered — On a successful save the snare does nothing but partial damage and applies no condition, so the target has no snare state at all and the row's fiction (deadfall, snare) is not delivered on the common success case. — Give the success line a residual no-condition effect or reframe the name to match a damage-only snare. (about: "Success: Half damage only.")
[reskin] clause unresolved: "Deadfall Snare" carries "Bramwel triggers a hidden charge in a tunnel wall or flo", which matches no clause on the sheet — no coverage credit by id
[reskin] [gap] when reduced to half HP, the arm detaches to recharge the hammer and boost Fire damage for a turn — a triggered self-buf — "When Bramwel is reduced to half its hit points or fewer, its clockwork servitor arm detaches and burrows into the nearest loose earth or rubble, spending its stored charge to re-arm Bramwel's alchemical hammer and vent searing steam in a small radius; until the end of its next turn, Bramwel's attacks deal extra Fire damage and it can use Cinder Grenade even if it is recharging." — Bramwel Coalspur [seat: trait [trait/always/resource]] (closest offered: relentless-pursuit) [effect: resource] [menu: phobia terrain-walk bloodied-fury blood-frenzy pack-tactics berserk shielded-mind evasion relentless-pursuit bound relic-object guarded-stance undead-fortitude assassinate truth-aura fear-aura resonant-body] [same-cell unoffered: lay-on-hands second-wind volley-order] [same-seat rejected: false-appearance:body-verdict adhesive:body-verdict spider-climb:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict death-restoration:cr-range uncanny-sense:body-verdict earth-glide:movement tunneler:movement marking-light:body-verdict sealed-body:role mimicry:body-verdict blurred-form:body-verdict death-burst:body-verdict kill-denial:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Bramwel Coalspur" — donor skirmisher-8-hurler, CR 4
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 07-bramwel-coalspur.json — 1 recorded answer(s) unused
```

---

## 08-sharptooth-whisper

## 08. Sharptooth Whisper — CR 6

**Input:** `tabaxi assassin`
**Donor:** skirmisher-3 -> CR 6
**Signature:** dropped

### Block
```
Sharptooth Whisper
Medium humanoid, neutral
Armor Class

15 (leather)

Hit Points: 

117 (18d8 + 36)

Speed: 

30 ft., climb 30 ft.

STR	DEX	CON	INT	WIS	CHA


11 (+0)

	

18 (+4)

	

14 (+2)

	

16 (+3)

	

11 (+0)

	

10 (+0)

Skills: 

Perception +3, Stealth +7

Saving Throws: 

DEX +7

Damage Resistances: 

poison

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Common, Thieves' cant

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Surprise Attack.During the first round of each combat, the whisper has advantage on attack rolls against any creature that hasn't taken a turn. If the whisper hits a creature during that round, the target takes an extra 10 (3d6) piercing damage.
Evasion.If the whisper is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the whisper instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it is incapacitated.
Sneak Attack.Once per turn, when the whisper hits a creature with an attack roll while it has advantage on the roll or while an ally of the whisper is within 5 feet of the target, the attack deals an extra 10 (3d6) damage.
Cunning Action (Bonus Action).The whisper takes the Dash, Disengage, or Hide action.

Actions
Multiattack: The whisper makes two attacks, using Shortsword or Shortbow.
Shortsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) piercing damage plus 17 (5d6) poison damage, and the target must succeed on a DC 15 Constitution saving throw or be poisoned until the start of the whisper's next turn.
Shortbow: Ranged Weapon Attack: +7 to hit, range 80/320 ft., one target. Hit: 18 (4d6 + 4) piercing damage.
```

### Trace
```
!! [ENRICHMENT] Failed to enrich Bramwel Coalspur: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 7 taken name(s) the recording carried
[concept] thin concept expanded before routing: tabaxi assassin — A tabaxi assassin opens from the dark — climbing, stalking, and holding its strike until the perfect kill-line presents itself — then commits to a short, brutal flurry of poisoned blade-work meant to end the fight in one exchange. Once bloodied or exposed, it breaks contact, re-cli
[concept] expansion answered: type=Humanoid (type_source=inferred) material=venom size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: snare
[path] class_npc — class rogue — species tabaxi — "assassin" (call)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-skulker: ✓ ("opens from the dark — climbing, stalking") | skirmisher-skulker: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause and the call did not claim one, so "Poison" is a guess from what the creature is, not the GM's ask
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=armed/venomous mind=sapient style=skulker energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: ambush strike from concealment [behavior] | poisoned blade-work [object] | climbing escape and re-approach [behavior]
[concept] identity: A tabaxi assassin opens from the dark — climbing, stalking, and holding its strike until the perfect kill-line presents itself — then commits to a short, brutal flurry of poisoned blade-work meant to end the fight in one exchange. Once bloodied or exposed, it breaks contact, re-climbs, and circles to re-open from a new blind angle, patient and cold rather than proud; it never brawls to the death it was paid to avoid. It toys with prey only as long as patience pays, and flees on its own terms when the odds turn.
[concept] lore: Sworn to a shadow-guild that trades in quiet deaths, the tabaxi assassin takes contracts it can finish unseen and vanishes over the rooftops with the coin before the body cools.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the rogue stands on the Assassin — the class's own print block, nearest CR 6
[reskin] print canon route: the Assassin's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 11, DEX 18, CON 14, INT 16, WIS 11, CHA 10 — the Assassin's; DEX 18 outranks the card's +6, so the sheet rolls +7 (raise-only)
[reskin] donor: skirmisher-3 -> CR 6
[reskin] seats: action <- "ambush strike from concealment" | trait <- "poisoned blade-work"
[reskin] [path] decides: class_npc on the Assassin · class rogue (the matcher would have said print-plain Assassin)
[reskin] print canon: "tabaxi assassin" heads on the Assassin — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear)
[reskin] features: Sneak Attack (trait) — the feature table, no call
[reskin] species kit: Cat's Dash — "Fleet Agility" already grants Dash; one mechanic, one row
[reskin] species kit: tabaxi — "assassin": header lines only; Climb 30 ft.; darkvision 60 ft.
[reskin] class kit: rogue — "assassin": Cunning Action (Assassin/Cunning Action), Evasion (evasion), Surprise Attack (assassinate)
[reskin] inline declared: "the whisper" — the call's own answer (kind), built from the name
[reskin] inline form: "the whisper" — the model's own reading of the name
[reskin] energy rider withheld: Poison on a Humanoid with no Poison in the concept's own words
[reskin] the sheet's declared ask: snare — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "tabaxi assassin" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "tabaxi assassin" -> has (mechanical) [asked: at_will/attack]
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "The whisper's hand bow fires a barbed, venom-beaded bolt that sinks in" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Every blade the whisper carries is already wet — when it hits with Cla" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 30 of 30 answered; not true of this body: hook-rider, gaze-single, shield-bash, random-ray, spew, blink, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, life-drain
[reskin] signature idea (action): "The whisper's hand bow fires a barbed, venom-beaded bolt that sinks into flesh and tethers the target on a length of shadow-silk line — a hit forces a Strength saving throw; on a failure the target has the Restrained condition, and it can end the condition by using its action to wrench the barb free (taking the bolt's piercing damage again)." [rider/on_hit/condition] [family: mark] — menu: affliction, contagion, stunning-strike, charge-push, pounce, isolation, bolt-mark, charge, bolt-restrain (+ shelf: thrown-burst, snare, throw-retrieve, ground-burst, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, answering-strike)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — snare: snare-bolt, snare
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: snare-bolt (save/condition), snare (save/condition), affliction (on_hit/condition)
[reskin] classification handed to the fit call: shape=attack when=at_will
[reskin] word match declined by the call: affliction, contagion, stunning-strike, bolt-restrain, pounce, bolt-mark — the key word does not mean the mechanic here
[reskin] fit declined: "Barbed Tether" — a print body takes only what the user's words ask, and the call named none of this creature's own elements for it; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] signature seat empty — no template held the idea and the seat wrote no row; nothing stands in (owner, 2026-11-23)
[reskin] condition rider rides the attack: trait — the payoff family composes a rider, so the idea is re-seated trait/always -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (trait): "Every blade the whisper carries is already wet — when it hits with Claw, the target must succeed on a Constitution saving throw or have the Poisoned condition, and while Poisoned this way the target can't regain hit points." [rider/on_hit/condition] [family: payoff] — menu: affliction, contagion, stunning-strike, charge-push, pounce, isolation, bolt-mark, charge, bolt-restrain (+ shelf: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura)
[reskin] composed candidates on the menu: trait — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_hit/does condition; leading: affliction (on_hit/condition), contagion (on_hit/condition), stunning-strike (on_hit/condition)
[reskin] classification handed to the fit call: shape=attack when=at_will
[reskin] word match declined by the call: affliction, stunning-strike, pounce, bolt-mark, bolt-restrain, composed:payoff:condition, charge-push, isolation, charge — the key word does not mean the mechanic here
[reskin] free signature row: trait — "contagion" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "poisoned blade-work" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] free signature row: "Wet Blade" — the trait seat cannot quote the GM, but the call names the element it expresses: "poisoned blade-work". Earns no clause credit; the twist/class path allows 1 and this is number 2
[reskin] trait ceiling: "Wet Blade" does not ship — 4 traits already, and print's ceiling for a meat body is 3
[reskin] weapons answered: Claw = none; Hand Bow = shortbow
[reskin] weapon declared: "Hand Bow" is a shortbow — the call's own answer (the name alone read bow)
[reskin] weapon dice follow the weapon: "Hand Bow" is a shortbow (d6) — "17 (3d8 + 4)" becomes "18 (4d6 + 4)", print's rule of keeping the die and scaling the count
[reskin] weapon table: "Hand Bow" — a launcher, never thrown, range 150/600
[reskin] print canon modes: climb off — the Assassin has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Neutral Evil -> Neutral — the Assassin's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Thieves' cant" — the Assassin's
[reskin] print canon attack: "Claw" -> "Shortsword" — the Assassin's own row
[reskin] print canon attack: "Hand Bow" -> "Light Crossbow" — the Assassin's own ranged row
[reskin] on-hit extra retyped: "Surprise Attack" adds Piercing, not Bludgeoning — the hit's own type (Shortsword)
[reskin] print canon defenses: resistances none -> Poison — the Assassin's own header lines
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon: chassis row leaves — Traits/"Rooftop Scuttle" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] class weapon: "shortsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] class weapon: Actions/"Light Crossbow" -> "Shortbow" — a rogue fights with a shortbow, not the Assassin's
[reskin] free-row budget by card size: CR 6 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] ask vs row MISMATCH: "tabaxi assassin" -> "Surprise Attack" — trigger: asked at_will, row reads on_hit
[reskin] lint: 0 findings
audit finding below confidence gate: Evasion The block's stat array and save line never give the whisper a Dexterity saving throw—its listed saves are STR +0 and DEX +7, but the encounter needs a DEX modifier of +4 from the stat line, which the sheet does have; however the trait is written as an official-style published row but lacks the concluding Incapacitated clause that makes the trait end, leaving it open-ended in a way this sheet's other rows don't mirror.
[reskin] audit: nothing flagged
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Evasion" carries "assassin" which is not a whole clause — the seat surgery cut it; resolved to cl_1vsnze0
[reskin] clause id by substring: "Cunning Action" carries "assassin" which is not a whole clause — the seat surgery cut it; resolved to cl_1vsnze0
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] species kit: Climb 30 ft. — a tabaxi's own
[reskin] done: "Sharptooth Whisper" — donor skirmisher-3, CR 6
[reskin] ledger: 1 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 1 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 08-sharptooth-whisper.json
```

---

## 09-thunderhide-warchief

## 09. Thunderhide Warchief — CR 5

**Input:** `bugbear barbarian chief`
**Donor:** defender-5 -> CR 5
**Signature:** library

### Block
```
Thunderhide Warchief

Medium Humanoid, Chaotic Evil

AC 19
Initiative +2 (12)

HP 77 (14d8 + 14)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+6
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
+0
MOD
SAVE
CON
13
+1
+4
CHA
9
-1
-1

Skills Athletics +6, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Goblin

CR 5 (XP 1,800; PB +3)

Traits

Storm-Drinking Mantle. When the warchief takes Thunder damage, the warchief instead regains Hit Points equal to half the Thunder damage, and its next Greataxe attack deals an extra 9 (2d8) Thunder damage.

Bloodied Frenzy. While Bloodied, the warchief has Advantage on attack rolls and saving throws.

Abduct. The warchief needn't spend extra movement to move a creature it is grappling.

Actions

Multiattack. The warchief makes two attacks, using Greataxe or Light Hammer in any combination.

Greataxe. Melee Attack Roll: +6, reach 5 ft. 16 (2d12 + 3) Slashing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 14).

Light Hammer. Melee or Ranged Attack Roll: +6, reach 10 ft. or range 30/120 ft. 17 (4d6 + 3) Bludgeoning damage.

War-Cry Blow (Recharge 5-6). Constitution Saving Throw: DC 13, each creature in a 15-foot Cone. Failure: 18 (4d8) Bludgeoning damage. Success: Half damage.

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
!! [ENRICHMENT] Failed to enrich Sharptooth Whisper: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 8 taken name(s) the recording carried
[concept] thin concept expanded before routing: bugbear barbarian chief — The chief opens a fight by hurling a javelin and then surfing a wave of thunderous rage into the thickest cluster of the party, its bellowing war-cry shoving foes back with concussive force. Every round after that it stays in the thick of it, alternating cleaving greataxe b
[concept] expansion answered: type=Humanoid (type_source=inferred) material=hide size=Large mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: aura
[path] filled: the head clause names the barbarian's "barbarian" and the call named no class — a Bugbear Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Bugbear Warrior (is) — class barbarian — "barbarian" (call)
[route] defender-leader type=Humanoid mechanics=thrown-weapon, aura — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("its bellowing war-cry shoving foes back ") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | defender-leader stands: every key that would override it was read as a figure of speech | defender-leader: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=bestial/elemental mind=sapient style=leader energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon, aura
[concept] signature elements: rage-fed war-cry that shoves and staggers [behavior] | cleaving greataxe and hurled javelin [object] | storm-mantle of hide and bone trophies [body]
[concept] identity: The chief opens a fight by hurling a javelin and then surfing a wave of thunderous rage into the thickest cluster of the party, its bellowing war-cry shoving foes back with concussive force. Every round after that it stays in the thick of it, alternating cleaving greataxe blows with a ground-shaking stomp that knocks smaller combatants prone, feeding off its own fury. Under pressure it becomes more terrible, not less — it fights to the death, roaring louder the worse it bleeds, and never once considers retreat.
[concept] lore: Bugbear war-chiefs are the strongest of their raiding band, and a chief wears a mantle of storm-taken hides and carries a drum of stretched hide into battle, believing the thunder is the voice of the storm-father claiming the field.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] the concept outranks the alias: the Bugbear Warrior is a Fey and the concept reads Humanoid — the words RESEMBLE it, they do not name it, so the alias match stands down. Print canon is decided separately and may still run on this sheet
[reskin] print canon route: the Bugbear Warrior's body outranks the leader seat — no verb in the words names it; the plain defender line
[reskin] print canon array: STR 16, DEX 14, CON 13, INT 8, WIS 11, CHA 9 — the Bugbear Warrior's, STR fitted to +6
[reskin] donor: defender-5 -> CR 5
[reskin] seats: action <- "rage-fed war-cry that shoves and staggers" | trait <- "storm-mantle of hide and bone trophies"
[reskin] [path] decides: class_npc on the Bugbear Warrior · class barbarian (the matcher would have said homebrew)
[reskin] print canon: "bugbear barbarian chief" heads on the Bugbear Warrior — print's rows ride along; the seat stays
[reskin] name_element answered: Storm-Father's Roar = imagery
[reskin] class kit: rampage — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: barbarian — "barbarian": Bloodied Frenzy (Berserker/Bloodied Frenzy)
[reskin] inline declared: "the warchief" — the call's own answer (kind), built from the name
[reskin] inline form: "the warchief" — the model's own reading of the name
[reskin] the sheet's declared ask: shove — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "bugbear barbarian chief" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "The warchief slams the butt of its greataxe against its hide drum and " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The warchief's mantle of storm-taken hides and bone trophies drinks th" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 27 of 27 answered; not true of this body: seal, shield-bash, active-toll, random-ray, shell-withdraw, false-appearance, absorption, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The warchief slams the butt of its greataxe against its hide drum and looses a thunderous war-cry. Each creature of its choice in a cone must succeed on a Constitution saving throw or take Thunder damage and be pushed back and knocked Prone, as the concussive bellow hurls smaller foes off their feet." [action/always/damage] [family: nova] — menu: throw-retrieve, ground-burst, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, zone-seed (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, self-invisibility, rally, coating, riposte, answering-strike, stunning-strike, charge-push)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — shove: disarm, push-prone
[reskin] menu ordered by the idea's stamps: action — idea fires always/does damage; leading: disarm (save/movement), push-prone (save/condition), throw-retrieve (always/damage)
[reskin] classification handed to the fit call: mechanic=thrown-weapon, aura
[reskin] word match declined by the call: throw-retrieve, rally, push-prone, herd, wind-up — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "ground-burst" has no key-table verb, but the call quotes "bugbear barbarian chief" from the description
[reskin] seat takes its clause: "Thunder War-Cry (Recharge 5-6)" is HANDED "bugbear barbarian chief" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] seat takes its clause: "Thunder War-Cry (Recharge 5-6)" is HANDED "bugbear barbarian chief" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: ground-burst -> Actions/"Thunder War-Cry (Recharge 5-6)" ("cone of thunder damage with a save and push/knock-prone from the warchief's war- [shape fit, no verb match]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The warchief's mantle of storm-taken hides and bone trophies drinks the storm's voice. When it takes Thunder damage, it instead regains Hit Points equal to half the damage and its next Greataxe attack deals extra Thunder damage." [trait/on_being_hit/resource] [family: heal] — menu: bloodied-burst, weapon-lodge (+ shelf: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura)
[reskin] verb gate stands down: trait — no template shares a verb, but 1 template(s) whose declared stamps match the idea (on_being_hit/resource): weapon-lodge; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the heal family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does resource; leading: weapon-lodge (on_being_hit/resource), bloodied-burst (on_being_hit/damage)
[reskin] classification handed to the fit call: mechanic=thrown-weapon, aura
[reskin] word match declined by the call: bloodied-burst, weapon-lodge — the key word does not mean the mechanic here
[reskin] closest refused: trait — "bloodied-burst" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: absorbs a damage type to heal and charge its next weapon strike)
[reskin] seat answered, but: the call said "The warchief's mantle of storm-taken hides and bone trophies drinks the storm's voice. When it takes Thunder damage, it " is carried by "Storm-Drinking Mantle", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("absorbs a damage type to heal and charge its next weapon strike") and wrote a trait instead: "Storm-Drinking Mantle" -> Traits. When the warchief takes Thunder damage, the warchief instead regains Hit Points equal to half the Thunder damage, and it
[reskin] authored row numbers: "Storm-Drinking Mantle" — the call declared 1 number(s) promised
[reskin] seat takes its clause: "Storm-Drinking Mantle" is HANDED "bugbear barbarian chief" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Storm-Drinking Mantle" ("The warchief's mantle of storm-taken hides and bone trophies drinks the storm's voice. When it takes Thunder damage, it instead regains Hit Points equal to half [authored: the catalog held no shape for it]")
[reskin] weapons answered: Greataxe = greataxe; Javelin = javelin
[reskin] weapon dice follow the weapon: "Greataxe" is a greataxe (d12) — "16 (3d8 + 3)" becomes "16 (2d12 + 3)", print's rule of keeping the die and scaling the count
[reskin] weapon dice follow the weapon: "Javelin" is a javelin (d6) — "16 (3d8 + 3)" becomes "17 (4d6 + 3)", print's rule of keeping the die and scaling the count
[reskin] print canon alignment: Chaotic Neutral -> Chaotic Evil — the Bugbear Warrior's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the Bugbear Warrior is the class's BODY on this path, not this creature's kind (print's own NPC blocks are all Humanoid)
[reskin] print canon attack: "Greataxe" -> "Grab" — the Bugbear Warrior's own row
[reskin] print canon attack: "Javelin" -> "Light Hammer" — the Bugbear Warrior's own row
[reskin] print canon trait: Abduct — "bugbear barbarian chief" is the Bugbear Warrior (print's own row)
[reskin] print canon: chassis row leaves — Traits/"Guard Aura" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] class weapon: Actions/"Grab" -> "Greataxe" — a barbarian fights with a greataxe, not the Bugbear Warrior's
[reskin] class weapon: Actions/"Light Hammer" keeps its own name — "greataxe" is already a row on this sheet (fix F: one name, one row)
[reskin] free-row budget by card size: CR 5 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Storm-Drinking Mantle" [no template]
[reskin] name follows content: Actions/"Thunder War-Cry" carries Thunder the row never deals — "War-Cry Blow" (the element word drops; the call's own noun stays)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 2 row(s) shown with the clause they were written for
audit finding below confidence gate: War-Cry Blow A 'War-Cry Blow' that only deals damage and imposes no condition does not deliver the fear, staggering, or rally that the name promises, so it is just a damage cone the Greataxe outclasses in feel.
audit finding below confidence gate: War-Cry Blow A Constitution save is used for a shout/blow whose fiction suggests a fear- or force-based effect, so the stat keying the save does not match what the effect represents.
[reskin] audit: [Storm-Drinking Mantle: The trait's payoff is keyed…named weapon. (about: "its next Greataxe attack"), Storm-Drinking Mantle: The trigger fires on taking…damage, the warchief instead regains Hit Points"), Storm-Drinking Mantle: The row was written as the …ins Hit Points equal to half the Thunder damage")]
[reskin] audit defect: Traits/"Storm-Drinking Mantle" [model-written] medium dead_reference — The trait's payoff is keyed to a specific named attack, so the reward is lost or ambiguous any time the warchief attacks with the Light Hammer or makes a non-Greataxe attack in the meantime. — Key the rider to the warchief's next attack roll rather than to a named weapon. (about: "its next Greataxe attack")
[reskin] audit defect: Traits/"Storm-Drinking Mantle" [model-written] medium open_ended — The trigger fires on taking damage but the replacement effect is regeneration with no stated timing relative to the damage event or the 'next Greataxe attack' window, so a GM cannot tell how long the banked rider persists. — State when the healing resolves and whether the banked bonus expires at end of turn if unused. (about: "When the warchief takes Thunder damage, the warchief instead regains Hit Points")
[reskin] audit defect: Traits/"Storm-Drinking Mantle" [model-written] medium undelivered — The row was written as the chief's signature identity but delivers nothing the creature can actually do — it depends entirely on opponents choosing Thunder damage, which nothing in the block creates, so it is a dead passive in most fights. — Give the mantle a self-contained Thunder source (its own attack or an aura) so the identity is expressed rather than conditional on enemy loadout. (about: "instead regains Hit Points equal to half the Thunder damage")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Bloodied Frenzy" carries "barbarian" which is not a whole clause — the seat surgery cut it; resolved to cl_1nqdwbn
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] escape dc: Greataxe → DC 14 (8 + PB + STR; a late row wore another number)
[reskin] done: "Thunderhide Warchief" — donor defender-5, CR 5
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 09-thunderhide-warchief.json — 1 recorded answer(s) unused
```

---

## 10-zharael-ruin-sworn

## 10. Zharael Ruin-Sworn — CR 9

**Input:** `fallen aasimar paladin`
**Donor:** defender-5 -> CR 9
**Signature:** library

### Block
```
Zharael Ruin-Sworn

Medium Humanoid, Neutral

AC 20
Initiative +2 (12)

HP 127 (17d8 + 51)

Speed 30 ft.

MOD
SAVE
STR
18
+4
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
+7
CHA
15
+2
+2

Skills Athletics +8, Perception +5

Resistances Necrotic, Radiant

Senses darkvision 60 ft.; Passive Perception 15

Languages Common, Celestial

CR 9 (XP 5,000; PB +4)

Traits

Halo's Brand. When a creature within the aura moves out of Zharael's reach, that creature is branded until the end of its next turn: it can't benefit from the Disengage action, and it can't be Hidden against Zharael.

Aura of Authority. While in a 10-foot Emanation originating from Zharael, Zharael and its allies have Advantage on attack rolls and saving throws, provided Zharael doesn't have the Incapacitated condition.

Actions

Multiattack. Zharael makes two Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +8, reach 5 ft. 31 (6d8 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Zharael can see. Failure: 28 (8d6) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

Reactions

Parry. Trigger: Zharael is hit by a melee attack roll while holding a weapon. Response: Zharael adds 3 to its AC against that attack, possibly causing it to miss.

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
!! [ENRICHMENT] Failed to enrich Thunderhide Warchief: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 9 taken name(s) the recording carried
[concept] thin but a print creature — keeping route-first: fallen aasimar paladin
[path] class_npc — class paladin — species aasimar — "paladin" (call)
[route] defender type=Celestial mechanics=none — casts: implied by the kind — "aasimar paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("paladin") | defender: key "paladin" (class verb)
[concept] hints: warpriest→style ✓ ("fallen aasimar paladin with shield and a")
[concept] resolve: archetype=defender type=Celestial typeFrom=the route call themes=celestial/armed mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: fallen halo that brands those who try to slip past [aura] | shield and longsword that punish movement [object] | refusal to yield ground [behavior]
[concept] identity: The fallen aasimar paladin does not charge; it plants itself as a radiant bulwark, spending its first turn advancing slowly so foes must choose between breaking upon its shield or trying to slip past its reach — and either choice is a mistake. Each round it holds a 10-foot line, using its fallen halo to mark whoever tries to flank or flee, then punishing that movement with a shield bash or longsword thrust that carries searing light. Under pressure it never gives ground; it fights to the death with the cold patience of one who believes its damnation is already sealed and its judgment is just.
[concept] lore: Cast down from the celestial host for a sin it will not name, this aasimar paladin now guards a ruined shrine or a mortal charge with a zeal that has outgrown its oath, convinced that unbroken vigilance is the only penance left.
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 9
[reskin] the concept outranks the alias: the Gladiator is a Humanoid and the concept reads Celestial — the words RESEMBLE it, they do not name it, so the alias match stands down. Print canon is decided separately and may still run on this sheet
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +8
[reskin] donor: defender-5 -> CR 9
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] seats: action <- "refusal to yield ground" | trait <- "fallen halo that brands those who try to slip past"
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "fallen aasimar paladin" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] name_element answered: Fallen Halo = literal
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] name_element answered: Fallen Halo = literal
[reskin] species kit: aasimar — "paladin": header lines only; darkvision 60 ft.; resistance Necrotic, Radiant
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "Zharael" — the call's own answer (person), built from the name
[reskin] inline form: "Zharael" — the model's own reading of the name
[reskin] damage type by the row's own noun: "Zealous Longsword Strike" Bludgeoning -> Slashing
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "fallen" names no absence — nothing in it takes anything away
[reskin] clauses: "fallen aasimar paladin" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "Zharael plants its shield and refuses to give an inch: each time a cre" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Zharael's fallen halo brands those who try to slip past it: whenever a" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 30 of 30 answered; not true of this body: seal, active-toll, random-ray, herd, shell-withdraw, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, sealed-body, relic-object, mimicry, gaze-aura, hook-rider, life-drain
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Zharael plants its shield and refuses to give an inch: each time a creature within its reach tries to leave its space or slip past it, Zharael can immediately make one Longsword attack against that creature, and on a hit the target's Speed becomes 0 until the end of the current turn." [reaction/on_being_hit/movement] [family: sentinel] — menu: riposte, answering-strike (+ shelf: throw-retrieve, shield-bash, ground-burst, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, self-invisibility, rally, stunning-strike, charge-push)
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_being_hit/does movement; leading: riposte (on_being_hit/damage), answering-strike (on_being_hit/damage), rally (always/movement)
[reskin] word match declined by the call: answering-strike, rally — the key word does not mean the mechanic here
[reskin] closest refused: action — "riposte" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: triggers on a creature leaving or slipping past its reach and zeroes t)
[reskin] seat answered, but: the call said "Zharael plants its shield and refuses to give an inch: each time a creature within its reach tries to leave its space or" is carried by "Unyielding Bulwark", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("triggers on a creature leaving or slipping past its reach and zeroes t") and wrote a reaction instead: "Unyielding Bulwark" -> Reactions. *Trigger:* A creature within Zharael's reach tries to leave its space or slip past it. *Response:* Zharael makes one Lon
[reskin] authored row numbers: "Unyielding Bulwark" — the call declared 0 number(s) promised
[reskin] seat takes its clause: "Unyielding Bulwark" is HANDED "fallen aasimar paladin" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Reactions/"Unyielding Bulwark" ("Zharael plants its shield and refuses to give an inch: each time a creature within its reach tries to leave its space or slip past it, Zharael can immediately m [authored: the catalog held no shape for it]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's 16 at CR 9, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Zharael's fallen halo brands those who try to slip past it: whenever a creature within the aura moves out of Zharael's reach, searing light clings to it, leaving it branded and unable to benefit from the Disengage action or from being Hidden against Zharael until the end of its next turn." [trait/always/condition] [family: mark] — menu: phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, truth-aura, fear-aura, kill-denial
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), berserk (always/condition), marking-light (always/condition)
[reskin] word match declined by the call: phobia, berserk, kill-denial — the key word does not mean the mechanic here
[reskin] closest refused: trait — "marking-light" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: marks a creature that moves out of the creature's reach, denying Disen)
[reskin] seat answered, but: the call said "Zharael's fallen halo brands those who try to slip past it: whenever a creature within the aura moves out of Zharael's r" is carried by "Halo's Brand", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("marks a creature that moves out of the creature's reach, denying Disen") and wrote a trait instead: "Halo's Brand" -> Traits. When a creature within the aura moves out of Zharael's reach, that creature is branded until the end of its next turn: i
[reskin] authored row numbers: "Halo's Brand" — the call declared 0 number(s) promised
[reskin] free signature row: "Halo's Brand" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Halo's Brand" is HANDED "fallen aasimar paladin" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Halo's Brand" ("Zharael's fallen halo brands those who try to slip past it: whenever a creature within the aura moves out of Zharael's reach, searing light clings to it, leavin [authored: the catalog held no shape for it]")
[reskin] weapons answered: Longsword = longsword; Shield Bash = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon type: the call answered type_source=user for celestial, but the GM's words do not name it — the Gladiator's own type stands
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] rider folded: "Longsword" keeps its budget — the chassis's rider half (13) folds into the base; the Gladiator pays no damage rider of its own
[reskin] print canon attack: "Longsword" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Zealous Longsword Strike leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon row priced: Shield Bash — dice 9 → 32
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] print canon row: Reactions/Parry — the Gladiator's own
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] free row over budget: Reactions/"Unyielding Bulwark" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Halo's Brand" [no template]
[reskin] lint: undefined-area: Traits/Halo's Brand: targets an area or zone ("within the aura") that is never defined — name the shape, size, and origin (e.g. "a 20-foot Emanation originating from it")
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Halo's Brand carries "fallen halo that brands those who try to slip past" — "When a creature within the aura moves out of Zharael's reach, that creature is b"
[reskin] audit: [Halo's Brand: Halo's Brand resolves against "the a…re within the aura moves out of Zharael's reach"), Halo's Brand: The brand denies the Disengage benef… action, and it can't be Hidden against Zharael")]
[reskin] audit defect: Traits/"Halo's Brand" [model-written] medium dead_reference — Halo's Brand resolves against "the aura," but no aura large enough to satisfy "moves out of Zharael's reach" is defined for this purpose — the only aura on the sheet is Aura of Authority, a 10-foot Emanation, which is exactly Zharael's reach, leaving the trigger's spatial reference dependent on an entry the trait never names. — Rewrite the trigger in terms of Zharael's reach directly (a creature that moves out of Zharael's reach) rather than referring to an unnamed "aura." (about: "When a creature within the aura moves out of Zharael's reach")
[reskin] audit defect: Traits/"Halo's Brand" [model-written] low weak — The brand denies the Disengage benefit and Hidden, but the trigger is a creature already leaving reach, so the branded creature's only interaction with the brand is on the following turn — and the brand has no clause stopping the creature from simply attacking, casting, or moving again; the effect is a nuisance with no teeth despite the "Brand" fiction. — Give the brand an actual consequence on the branded creature (a condition, damage, or attack-roll benefit for Zharael against it) rather than only barring two defensive options. (about: "it can't benefit from the Disengage action, and it can't be Hidden against Zharael")
[reskin] clause id by substring: "Aura of Authority" carries "paladin" which is not a whole clause — the seat surgery cut it; resolved to cl_1xfuhnz
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] single-target save capped: "Shield Bash" 32 -> 28 — it targets "one creature", and print's hardest single-target save row at CR 9 is 29
[reskin] species kit: Celestial — the aasimar's own
[reskin] species kit: resistance Necrotic — the aasimar's
[reskin] species kit: resistance Radiant — the aasimar's
[reskin] done: "Zharael Ruin-Sworn" — donor defender-5, CR 9
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 10-zharael-ruin-sworn.json — 1 recorded answer(s) unused
```

---

## 11-fennick-glimmergrin

## 11. Fennick Glimmergrin — CR 3

**Input:** `gnome illusionist`
**Donor:** caster-6 -> CR 3
**Signature:** library

### Block
```
Fennick Glimmergrin
Small humanoid, neutral
Armor Class

12

Hit Points: 

59 (17d6)

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

Arcana +5, Perception +3

Saving Throws: 

INT +5, WIS +3

Senses: 

passive Perception 13

Languages: 

Common and any three languages, Gnomish, Sylvan

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Misty Step (3/Day) (Bonus Action).Fennick casts Misty Step, using the same spellcasting ability as Spellcasting.
Protective Magic (3/Day) (Reaction).When Fennick is hit by an attack roll, Fennick casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Fennick makes two Arcane Burst attacks.
Arcane Burst: Melee or Ranged Spell Attack: +5 to hit, reach 5 ft. or range 120 ft., one target. Hit: 13 (3d6 + 3) force damage.
Spellcasting: Fennick casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 13): - At will: Minor Illusion, Disguise Self
1/day each: Mirror Image, Hypnotic Pattern
Shrieking Doubles (Recharge 5-6): One creature within 30 feet of Fennick must succeed on a DC 13 Constitution saving throw or be blinded until the end of its next turn.
```

### Trace
```
!! [ENRICHMENT] Failed to enrich Zharael Ruin-Sworn: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 10 taken name(s) the recording carried
[concept] thin concept expanded before routing: gnome illusionist — The gnome illusionist opens with a disorienting glamour — false walls, doubling images, a floor that isn't there — so the party wastes its first round swinging at figments while he repositions. Every round after, he layers a new illusion over the battlefield to herd and separate 
[concept] expansion answered: type=Fey (type_source=user) material=shadow size=Small mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: gaze
[path] class_npc — class mage — "illusionist" (call)
[route] skirmisher-skulker type=Humanoid mechanics=teleport — casts refused: the call answered yes but quoted "gnome illusionist opens with a", which is not in the GM's words — the word table decides | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-skulker: ✓ ("he vanishes behind one last screaming ph") | skirmisher-skulker: key "vanishes" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=beguiling/uncanny mind=sapient style=skulker energy=Psychic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: battlefield of false images and phantasms [behavior] | the doubled illusion of himself [behavior] | glamour that masks the real target [aura]
[concept] identity: The gnome illusionist opens with a disorienting glamour — false walls, doubling images, a floor that isn't there — so the party wastes its first round swinging at figments while he repositions. Every round after, he layers a new illusion over the battlefield to herd and separate foes, then drops it to stab from an angle no one is watching; he is a trickster who fights only on terms he has scripted. Bloodied, he does not flee — he vanishes behind one last screaming phantasm and runs the clock, betting the party can't tell which gnome is real before he finishes them.
[concept] lore: A gnome who traded the warmth of a burrow for a tower of mirrors and borrowed light, this illusionist wants nothing more than proof that cleverness outlives muscle — and he keeps visitors as witnesses to that argument, willing or otherwise.
[reskin] energy withheld: Psychic on a Humanoid with no Psychic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 3
[reskin] print canon route: the Mage's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from skirmisher, so the attack bonus and the spell DC key to one stat
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's; INT 17 outranks the card's +4, so the sheet rolls +5 (raise-only)
[reskin] donor: caster-6 -> CR 3
[reskin] seats: action <- "battlefield of false images and phantasms" | trait <- "glamour that masks the real target"
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said homebrew)
[reskin] print canon: "gnome illusionist" heads on the Mage — print's rows ride along; the seat stays
[reskin] anatomy on a humanoid: "Mirror Shard" -> "Staff" (Bludgeoning) — a Humanoid with no species claw swings a weapon; the magical stamp is for a body that has the part
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "illusionist": nothing to add — the sheet already answers it
[reskin] inline declared: "Fennick" — the call's own answer (person), built from the name
[reskin] inline form: "Fennick" — the model's own reading of the name
[reskin] the sheet's declared ask: dazzle — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "gnome illusionist" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "Fennick weaves a burst of shrieking, doubling phantoms around a point " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Fennick's glamour clings to him: whenever a creature misses him with a" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 34 of 34 answered; not true of this body: snare, zone, seal, active-toll, random-ray, spew, snare-bolt, drain, zone-seed, blighted-ground, rally, false-appearance, absorption, bloodied-burst, resonant-body, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, warded-mending, gaze-aura, death-burst, kill-denial
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Fennick weaves a burst of shrieking, doubling phantoms around a point he can see within range, peeling light into a dozen false edges. Each creature in the area must succeed on a Wisdom saving throw or be Blinded by the sensory flood until the end of its next turn; a creature that fails by a wide margin is also left unable to trust its own eyes, its attacks that turn taking a penalty as the illusi" [action/save/condition] [family: nova] — menu: execute, wail, lure, ground-burst, pacify, escalating-dread, slow-bolt, sensory-strike, herd, thrown-burst-seed, curse-debt, reveal, wind-up, shield-bash, terror-pulse, push-prone (+ shelf: gaze-single, delayed-brand, lay-on-hands, aggro-curse, self-invisibility, phase-slip, bolt-restrain, bolt-drag, bolt-mark)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — dazzle: sensory-strike, reveal
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: sensory-strike (save/condition), reveal (save/condition), lure (save/condition)
[reskin] classification handed to the fit call: mechanic=teleport
[reskin] word match declined by the call: sensory-strike, lure, pacify, escalating-dread, gaze-single, herd — the key word does not mean the mechanic here
[reskin] closest refused: action — "terror-pulse" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: an area burst that Blinds each creature in it (and penalizes the attac)
[reskin] seat answered, but: the call said "Fennick weaves a burst of shrieking, doubling phantoms around a point he can see within range, peeling light into a doze" is carried by "Shrieking Doubles", and no such row is on this sheet — the clause stays open
[reskin] seat answered, but: the call said "Each creature in the area must succeed on a Wisdom saving throw or be Blinded by the sensory flood until the end of its " is carried by "Shrieking Doubles", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("an area burst that Blinds each creature in it (and penalizes the attac") and wrote an action instead: "Shrieking Doubles (Recharge 5-6)" -> Actions. *Wisdom Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has the Blinded condition until the end
[reskin] authored row numbers: "Shrieking Doubles (Recharge 5-6)" — the call declared (unanswered) number(s) promised
[reskin] seat takes its clause: "Shrieking Doubles (Recharge 5-6)" is HANDED "gnome illusionist" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Shrieking Doubles (Recharge 5-6)" ("Fennick weaves a burst of shrieking, doubling phantoms around a point he can see within range, peeling light into a dozen false edges. Each creature in the area [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Fennick's glamour clings to him: whenever a creature misses him with an attack roll, the phantom it struck shatters and the true gnome is suddenly elsewhere in the same space, so the attacker must decide anew which image to swing at. While this shimmer lasts, the first creature that targets him each round is fooled and strikes at a figment." [trait/always/defense] [family: zone] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, mimicry, truth-aura, fear-aura, blurred-form, evasion, guarded-stance
[reskin] composed candidates: none trait — the zone family has no payload that does "defense" (it offers damage, condition, movement)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), shielded-mind (always/defense), relic-object (always/defense)
[reskin] classification handed to the fit call: mechanic=teleport
[reskin] closest refused: trait — "blurred-form" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: when an attacker misses, the target shifts the illusory image so the a)
[reskin] seat answered, but: the call said "Fennick's glamour clings to him: whenever a creature misses him with an attack roll, the phantom it struck shatters and " is carried by "Shifting Glamour", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("when an attacker misses, the target shifts the illusory image so the a") and wrote a trait instead: "Shifting Glamour" -> Traits. When a creature misses Fennick with an attack roll, the struck image shatters and Fennick is suddenly elsewhere in the s
[reskin] authored row numbers: "Shifting Glamour" — the call declared 0 number(s) promised
[reskin] seat takes its clause: "Shifting Glamour" is HANDED "gnome illusionist" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Shifting Glamour" ("Fennick's glamour clings to him: whenever a creature misses him with an attack roll, the phantom it struck shatters and the true gnome is suddenly elsewhere in  [authored: the catalog held no shape for it]")
[reskin] weapons answered: Mirror Shard = none
[reskin] weapon dice follow the weapon: "Staff" is a staff (d6) — "12 (2d8 + 3)" becomes "13 (3d6 + 3)", print's rule of keeping the die and scaling the count
[reskin] chassis nova: "Shrieking Doubles (Recharge 5-6)" — the caster-6's own nova row; geometry, cap and rider lines below are its edits
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Mage's own type stands
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Gnomish, Sylvan" -> "Common and any three languages, Gnomish, Sylvan" — the Mage's plus the concept's Gnomish, Sylvan
[reskin] print canon attack: "Staff" -> "Arcane Burst" — the Mage's own row
[reskin] print canon: the seat's own row STAYS — Actions/"Shrieking Doubles (Recharge 5-6)" answers "Fennick weaves a burst of shrieking, doubling phantoms aroun", which the GM typed; print's nova rides beside it rather than over it
[reskin] print canon: spell list withheld — the Mage's list is written for CR 6 and this sheet is CR 3 — too strong to paste (a CR 3 wizard with the Mage's Fireball); the chassis's own list, which is built for this CR, stands
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] free row over budget: Traits/"Shifting Glamour" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Shrieking Doubles" [no template]
[reskin] save re-derived after a retype: Actions/Shrieking Doubles — a Wisdom save for a condition the row IMPOSES, which calls for Constitution (A2: a condition the row merely requires does not pick the stat)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Shrieking Doubles carries "battlefield of false images and phantasms" — "The target has the Blinded condition until the end of its next turn."
[reskin] audit: [Shrieking Doubles (Recharge 5-6): The name promise…inded condition until the end of its next turn."), Shrieking Doubles (Recharge 5-6): The Recharge 5-6…inded condition until the end of its next turn.")]
[reskin] audit rename blocked — "Shrieking Doubles" -> "Flickering Phantasm" would drop the GM's own word "shrieking"
[reskin] audit defect: Actions/"Shrieking Doubles" [model-written] medium weak — The Recharge 5-6 slot resolves to a single condition existing only until the start of the same turn it lands, giving the signature action no teeth for a creature built around illusory threat. — Give the recurrence a payload that persists or an effect that affects more than a momentary single-target condition. (about: "The target has the Blinded condition until the end of its next turn.")
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "illusionist" which is not a whole clause — the seat surgery cut it; resolved to cl_f93221
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] done: "Fennick Glimmergrin" — donor caster-6, CR 3
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 11-fennick-glimmergrin.json — 1 recorded answer(s) unused
```

---

## 12-ogre

## 12. Ogre — CR 4

**Input:** `name: Ogre | wearing full plate looted from a knight`
**Donor:** brute-2 -> CR 4
**Signature:** library

### Block
```
Ogre

Large Giant, Chaotic Evil

AC 13
Initiative -1 (9)

HP 85 (10d10 + 30)

Speed 40 ft.

MOD
SAVE
STR
19
+4
+6
INT
5
-3
-3
MOD
SAVE
DEX
8
-1
-1
WIS
7
-2
-2
MOD
SAVE
CON
16
+3
+3
CHA
7
-2
-2

Skills Athletics +6, Perception +0

Immunities Frightened

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Giant

CR 4 (XP 1,100; PB +2)

Actions

Greatclub. Melee Attack Roll: +6, reach 5 ft. 26 (5d8 + 4) Bludgeoning damage.

Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 26 (5d8 + 4) Piercing damage.

Plated Shove (Recharge 5-6). Strength Saving Throw: DC 13, one creature within 5 feet. Failure: The target is pushed up to 10 feet straight away from the ogre, and the target has the Prone condition.

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
!! [ENRICHMENT] Failed to enrich Fennick Glimmergrin: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 11 taken name(s) the recording carried
[path] twist — Ogre (is) — "Name field: Ogre" (code)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("Ogre") | defender: the call read "knight" as not meaning that mechanic here — no override | brute stands: every key that would override it was read as a figure of speech | brute: no line key in the words — the model's read of its quote
[concept] name: "Ogre" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Giant typeFrom=the route call themes=armed/bestial mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Ogre"
[concept] mechanics: none claimed
[concept] signature elements: plate armor looted from a slain knight [object] | ogre bulk and brute strength [body] | wading in and trading blows to the death [behavior]
[concept] identity: The ogre armor is less a weapon than a borrowed shell: it wades in behind the salvaged knight's plate, trusting the steel to eat the first volley while it swings its huge limbs and whatever crooked blade it has strapped on. Once the fight is joined it trades blow for blow, using the plate as a shield-wall it can shrug behind, and it fights to the death — too dim and too proud of its stolen glitter to ever back away.
[concept] lore: A hill ogre that slew a mounted knight on a backroad and spent a week hammering the corpse's plate onto its own shoulders, it now struts the hills daring anyone to come take the shine from it.
[reskin] print canon array: STR 19, DEX 8, CON 16, INT 5, WIS 7, CHA 7 — the Ogre's, STR fitted to +6
[reskin] donor: brute-2 -> CR 4
[reskin] seats: action <- "wading in and trading blows to the death" | trait <- "plate armor looted from a slain knight"
[reskin] [path] decides: twist on the Ogre (the matcher agrees)
[reskin] print canon: "Ogre — wearing full plate looted from a knight" heads on the Ogre — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the ogre" — the call answered "the ogre" (kind), which the name does not support
[reskin] inline form: "the ogre" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] alignment by mind: "Neutral" -> Unaligned — a Giant the call reads as bestial at INT 5 holds no ethics (owner's ruling, 2026-11-15)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Ogre — wearing full plate looted from a knight" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "The ogre wades shoulder-first into the nearest creature, and the salva" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The looted plate is welded to the ogre's hide and bolted at every seam" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: active-toll, random-ray, spew, herd, drain, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] condition rider rides the attack: action — the payoff family composes a rider, so the idea is re-seated action/save -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (action): "The ogre wades shoulder-first into the nearest creature, and the salvaged plate does the work: the target must make a Strength saving throw or be shoved back, knocked Prone, and left with its guard split — every hit the ogre lands on a Prone or Grappled creature needing no attack roll to connect. The plate is a battering ram, not a shield; the ogre treats bodies on the ground as ground it has alre" [rider/on_hit/condition] [family: payoff] — menu: charge-push, pounce, charge (+ shelf: trample, leap, shield-bash, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, rampage, shell-withdraw, second-wind, aggro-curse, self-invisibility, focus, answering-strike)
[reskin] composed candidates on the menu: action — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: pounce (on_hit/condition), composed:payoff:condition (on_hit/condition), charge-push (on_hit/movement)
[reskin] word match declined by the call: pounce, charge, charge-push, composed:payoff:condition, trample, thrown-burst-seed — the key word does not mean the mechanic here
[reskin] closest refused: action — "push-prone" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a save-or-be-shoved-and-prone effect tied to the ogre's charge, plus a)
[reskin] seat answered, but: the call said "The ogre wades shoulder-first into the nearest creature, and the salvaged plate does the work: the target must make a St" is carried by "Plated Charge", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("a save-or-be-shoved-and-prone effect tied to the ogre's charge, plus a") and wrote an action instead: "Plated Charge" -> Actions. *Strength Saving Throw*: DC 13, one creature within 5 feet. *Failure:* The target is pushed up to 10 feet straight away 
[reskin] authored row numbers: "Plated Charge" — the call declared (unanswered) number(s) promised
[reskin] seat takes its clause: "Plated Charge" is HANDED "wearing full plate looted from a knight" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Plated Charge" ("The ogre wades shoulder-first into the nearest creature, and the salvaged plate does the work: the target must make a Strength saving throw or be shoved back, k [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The looted plate is welded to the ogre's hide and bolted at every seam, so the ogre treats its own armor as a second skin: it brushes off the frightened dithering of a fight with a headshake, and when it stands up from Prone the plate scrapes across the floor and it simply keeps going — nothing short of being dropped outright keeps the steel-shell from walking forward." [trait/always/defense] [family: payoff] — menu: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, relentless-pursuit, bound, sealed-body, relic-object, undead-fortitude, truth-aura, fear-aura, evasion, guarded-stance (+ shelf: resonant-body, weapon-lodge)
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), shielded-mind (always/defense), sealed-body (always/defense)
[reskin] word match declined by the call: relic-object, guarded-stance, shielded-mind, sealed-body — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: lets the creature ignore the Prone condition's movement cost and Advan)
[reskin] seat answered, but: the call said "it brushes off the frightened dithering of a fight with a headshake" is carried by "Bolted Hide", and no such row is on this sheet — the clause stays open
[reskin] seat answered, but: the call said "when it stands up from Prone the plate scrapes across the floor and it simply keeps going" is carried by "Bolted Hide", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("lets the creature ignore the Prone condition's movement cost and Advan") and wrote a trait instead: "Bolted Hide" -> Traits. The ogre is immune to the Frightened condition, and standing up from Prone costs it no movement.
[reskin] authored row numbers: "Bolted Hide" — the call declared 0 number(s) promised
[reskin] free signature row: "Bolted Hide" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Bolted Hide" is HANDED "wearing full plate looted from a knight" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Bolted Hide" ("The looted plate is welded to the ogre's hide and bolted at every seam, so the ogre treats its own armor as a second skin: it brushes off the frightened ditheri [authored: the catalog held no shape for it]")
[reskin] weapons answered: Gauntlet = none
[reskin] print canon alignment: Unaligned -> Chaotic Evil — the Ogre's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Common, Giant" — the Ogre's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Ogre's walk; the concept's other modes stay
[reskin] print canon row frame: "Javelin" keeps print's thrown frame — reach 5 ft. or range 30/120 ft.
[reskin] print canon row: Actions/Javelin — the Ogre's second melee row, beside the chassis's
[reskin] print canon attack: "Gauntlet" -> "Greatclub" — the Ogre's own row
[reskin] trait-granted condition immunity merged into header: Frightened
[reskin] emptied trait dropped — its only clause moved to the header
[reskin] dead control row: "Plated Charge (Recharge 5-6)" takes a Recharge — an at-will condition action with no Multiattack to join is a whole action for a condition, and print gates that shape
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Plated Charge" [no template]
[reskin] name follows content: Actions/"Plated Charge" promises movement the row never delivers — "Plated Shove" (the call's modifier kept, the claim word swapped for a noun the row earns)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element claim revoked: "Plated Shove" claims "plate armor looted from a slain knight" but the audit judged that nothing in the row carries it; the name carries "plate" and may not advertise what the rules do not do — flagged decoration for the rename pass
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Plated Shove")
[reskin] audit: [Plated Shove (Recharge 5-6): The row is written fo…doing something. (about: "Strength Saving Throw")]
[reskin] audit defect: Actions/"Plated Shove" [model-written] medium undelivered — The row is written for a plated ogre and does nothing with the plate: it shoves and knocks Prone with no heavier impact or weight behind it, so the plate is only in the name and the fiction does not land. — Give the shove's rules text a clause that expresses the armored weight — e.g., also dealing Bludgeoning damage or a stronger forced movement — so the plate is doing something. (about: "Strength Saving Throw")
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Ogre" — donor brute-2, CR 4
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 12-ogre.json — 1 recorded answer(s) unused
```

---

## 13-cinder-perch-spider

## 13. Cinder Perch Spider — CR 3

**Input:** `giant spider that spits fire instead of webs`
**Donor:** skirmisher-3 -> CR 3
**Signature:** library

### Block
```
Cinder Perch Spider
Large beast, unaligned
Armor Class

13

Hit Points: 

58 (9d10 + 9)

Speed: 

30 ft., climb 30 ft.

STR	DEX	CON	INT	WIS	CHA


14 (+2)

	

16 (+3)

	

12 (+1)

	

2 (-4)

	

11 (+0)

	

4 (-3)

Skills: 

Perception +2, Stealth +5

Saving Throws: 

DEX +5

Damage Immunities: 

fire

Senses: 

darkvision 60 ft., passive Perception 12

Languages: 

None

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Cinder Spit.The first time the perch spider has half its hit points or fewer in a fight, it releases a burst. Each creature in a 15-foot radius originating from the perch spider must make a DC 13 Constitution saving throw, taking 6 (1d12) fire damage on a failed save. On a failed save, the target is blinded until the end of its next turn.
Spider Climb.The perch spider can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Web Walker.The perch spider ignores movement restrictions caused by webs, and it knows the location of any other creature in contact with the same web.

Actions
Multiattack: The perch spider makes two Bite attacks.
Bite: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 7 (2d6) poison damage.
Cinder Spittle (1/Day): Each creature in a 15-foot cone must make a DC 13 Constitution saving throw, taking 11 (2d10) fire damage on a failed save, or half as much damage on a successful one. On a failed save, the target is poisoned until the end of its next turn.
Web (Recharge 5-6): One creature the perch spider can see within 60 feet must make a DC 13 Dexterity saving throw. On a failed save, the target is restrained until the web is destroyed (AC 10; HP 5; Vulnerability to fire damage; Immunity to Poison and psychic damage).
```

### Trace
```
!! [ENRICHMENT] Failed to enrich Ogre: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 12 taken name(s) the recording carried
[path] twist — Giant Spider (is) — "giant spider" (call)
[route] skirmisher-hurler type=Beast mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: reach on the GM's own words "spits fire instead of webs" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-archer: the call reads no shot of its own | skirmisher-hurler: ✓ ("spits fire instead of webs") | skirmisher: the call read "spits" as not meaning that mechanic here — no override | skirmisher-hurler stands: every key that would override it was read as a figure of speech | skirmisher-hurler: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "giant spider that spits fire instead of …" is the description, not a name
[concept] hints: spider→canon ✓ ("giant spider that spits fire")
[concept] resolve: archetype=skirmisher type=Beast typeFrom=the route call themes=bestial/venomous mind=bestial style=hurler energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: fire spat from the mouth instead of silk [body] | ceiling-hunting that repositions between burns [behavior] | smoldering fangs and a panic-flare when cornered [body]
[concept] identity: A chitinous ambush hunter that perches above trails and opens combat with a hissing gout of flame aimed at the lead target, driving prey into blind panic before it drops among them. Every round after, it scuttles along walls and ceilings, spitting fire from a safe angle, re-positioning whenever a target draws steel or closes distance; it never stands toe-to-toe if it can burn prey from an unexpected side. When bloodied it turns fully feral, scorching anything near it in a panic-flare and fleeing up the nearest vertical surface if it can — though a cornered one fights to the death with legs and fangs as readily as with fire.
[concept] lore: Brood-hollows of these spiders form in volcanic caverns and dry canyon walls, where the young hatch already smoldering and the colony's spitting matches its hunting grounds rather than any ordinary web.
[reskin] print canon route: the Giant Spider's body outranks the hurler seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 14, DEX 16, CON 12, INT 2, WIS 11, CHA 4 — the Giant Spider's; DEX 16 outranks the card's +4, so the sheet rolls +5 (raise-only)
[reskin] donor: skirmisher-3 -> CR 3
[reskin] seats: action <- "ceiling-hunting that repositions between burns" | trait <- "fire spat from the mouth instead of silk"
[reskin] [path] decides: twist on the Giant Spider (the matcher agrees)
[reskin] print canon: "giant spider that spits fire instead of webs" heads on the Giant Spider — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the perch spider" — the call's own answer (kind), built from the name
[reskin] inline form: "the perch spider" — the model's own reading of the name
[reskin] the sheet's declared ask: burst — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "giant spider" -> has (descriptive), head | "spits fire instead of webs" -> has (mechanical) [asked: save_single] [askMechanic: burst]
[reskin] open asks handed to the idea call: "spits fire instead of webs" [burst]
[reskin] idea anchored: action — "The perch spider hawks a gout of burning spittle in a cone from its mo" answers the GM's "spits fire instead of webs"
[reskin] idea unanchored: trait — "A fire-spitter's gullet swells with banked heat; when the perch spider" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: snare, shield-bash, random-ray, snare-bolt, blink, phase-slip, false-appearance, absorption, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "spits fire instead of webs", so role and style do not filter the menu (legality still does); 21 template(s) offered
[reskin] signature idea (action): "The perch spider hawks a gout of burning spittle in a cone from its mouth that splashes over every creature in the area; each creature that fails its save takes Fire damage and is Blinded until the end of its next turn as the clinging embers sear its eyes, while the spider scuttles back up the nearest wall on the same motion." [action/save/damage] [family: nova] — menu: trample, leap, reel, lure, ground-burst, spew, sensory-strike, disarm, thrown-burst-seed, execute, hook-drag, pull-through, obstacle-pull, pacify, escalating-dread, terror-pulse, slow-bolt, push-prone, curse-debt, reveal, wind-up (+ shelf: gaze-single, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, lay-on-hands, riposte, answering-strike, affliction, contagion, charge-push, pounce, isolation, charge)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — burst: ground-burst, thrown-burst-seed
[reskin] menu ordered by the idea's stamps: action — idea fires save/does damage; leading: ground-burst (save/damage), thrown-burst-seed (save/damage), trample (save/damage)
[reskin] keys would have bound: action — sensory-strike, spew (spit, spits)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=save_single
[reskin] word match declined by the call: thrown-burst-seed, ground-burst, sensory-strike, wind-up — the key word does not mean the mechanic here
[reskin] signature template: spew -> Actions/"Cinder Spittle (Recharge 5-6)" ("A cone of burning spittle from the mouth that forces a save and deals Fire damag [verb: spits:concept]")
[reskin] keys spent by the action: spits
[reskin] signature idea (trait): "A fire-spitter's gullet swells with banked heat; when the perch spider is first Bloodied, its throat ruptures in a panicked flare, scorching every creature within reach of it and leaving the spider wreathed in flame." [trait/always/damage] [family: nova] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate, death-burst, kill-denial (+ shelf: heated-body, bloodied-burst)
[reskin] composed candidates: none trait — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — burst: death-burst, bloodied-burst
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: death-burst (always/damage), bloodied-burst (on_being_hit/damage), blood-frenzy (always/damage)
[reskin] keys would have bound: trait — heated-body, spider-climb, terrain-walk (fire, spider, webs)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=save_single
[reskin] word match declined by the call: heated-body, blood-frenzy, death-burst — the key word does not mean the mechanic here
[reskin] closest refused: trait — "bloodied-burst" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: spits a ranged burst of fire at a single target in place of webbing it)
[reskin] seat answered, but: the call said "A fire-spitter's gullet swells with banked heat; when the perch spider is first Bloodied, its throat ruptures in a panic" is carried by "Panicked Flare", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "A fire-spitter's gullet swells with banked heat; when the perch spider" and wrote no row of that kind (refused: "Panicked Flare" — the call counts 2 mechanics in one row — one row, one mechanic) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Panicked Flare" — the call counts 2 mechanics in one row — one row, one mechanic); asking once more with the reason
[reskin] seat answered, but: the call said "A fire-spitter's gullet swells with banked heat; when the perch spider is first Bloodied, its throat ruptures in a panic" is carried by "Panicked Flare", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "A fire-spitter's gullet swells with banked heat; when the perch spider" and wrote no row of that kind (refused: "Panicked Flare" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat refused twice: trait — first: "Panicked Flare" — the call counts 2 mechanics in one row — one row, one mechanic; second: "Panicked Flare" — a trait is not a save — the save form takes stat, target and effect as ; the seat stays empty
[reskin] closest refused — subject flipped: trait — the call named "bloodied-burst" nearest and judged its subject FLIPPED against the clause (spits a ranged burst of fire at a single target in place of webbing it); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] the declared ask's own template lands: trait — the sheet's declared ask is "burst", the seat that carries it ended with no row, and "bloodied-burst" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] free signature row: "Cinder Spit" — the trait seat cannot quote the GM, but the call names the element it expresses: "fire spat from the mouth instead of silk". Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Cinder Spit" is HANDED "spits fire instead of webs" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): bloodied-burst -> Traits/"Cinder Spit" ("The idea is a first-Bloodied flare that scorches everything within its reach, bu [verb: bloodied:idea]")
[reskin] weapons answered: Bite = none
[reskin] print canon type: the call answered type_source=user for beast, but the GM's words do not name it — the Giant Spider's own type stands
[reskin] print canon speed: 40 ft. -> 30 ft. — the Giant Spider's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 2 on a Beast speaks nothing, whatever the mind read said
[reskin] element immunity: Fire — the call read this creature's energy as Fire and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Fire (merged into the header write)
[reskin] immunities stamped for type: Beast -> Fire
[reskin] name-canon trait stamped: Spider Climb (the name says so; print says what it does)
[reskin] print canon trait: Spider Climb — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Web Walker — "giant spider that spits fire instead of webs" is the Giant Spider (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Giant Spider's
[reskin] print canon: chassis row leaves — Traits/"Skittering Stalk" is the seat's, not the Giant Spider's
[reskin] print canon row: Actions/Web (Recharge 5-6) — the Giant Spider's own
[reskin] one recharge die: Actions/"Cinder Spittle (Recharge 5-6)" becomes "Cinder Spittle (1/Day)" — the Giant Spider already fields a Recharge row, and 0 of print's 329 blocks field two
[reskin] free-row budget by card size: CR 3 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] typed row kept over the budget: Traits/"Cinder Spit" stays — it was written for the typed clause "spits fire instead of webs", and the budget limits only rows the engine invents
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Cinder Spit" [trait/on_being_hit/damage]
[reskin] row binds its clause: "Cinder Spittle" answers "spits fire instead of webs" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] lint: spell-name-collision: "Web" is an SRD spell name on a non-spell entry — rename it
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Cinder Spit carries "fire spat from the mouth instead of silk" — "it releases a burst"
audit finding below confidence gate: Web Walker Nothing on this sheet creates a web or any web object (the Web action is a held target, not a persistent web), so the creature's web-sense refers to a state no entry establishes.
[reskin] audit: [Cinder Spit: The trait name promises a directional…lly projects fire. (about: "it releases a burst"), Cinder Spittle (1/Day): The creature is immune to …isoned condition until the end of its next turn")]
[reskin] audit rename held — "Cinder Spit" was written for the GM's own clause (cl_fk9pw5), so "Cinder Burst" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Cinder Spittle" [catalog] medium other — The creature is immune to Fire and burns its targets, yet its fire spittle imposes the Poisoned condition, an incongruous rider for spat flame. — Replace the Poisoned rider with a condition or effect consistent with searing fire, such as a brief Blinded or burning effect. (about: "the target has the Poisoned condition until the end of its next turn")
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] spits a ranged burst of fire at a single target in place of webbing it — "A fire-spitter's gullet swells with banked heat; when the perch spider is first Bloodied, its throat ruptures in a panicked flare, scorching every creature within reach of it and leaving the spider wreathed in flame." — Cinder Perch Spider [seat: trait [trait/always/damage]] (closest offered: bloodied-burst) [effect: damage] [menu: death-burst bloodied-burst blood-frenzy pack-tactics assassinate spider-climb phobia terrain-walk bloodied-fury berserk shielded-mind evasion relentless-pursuit bound marking-light guarded-stance undead-fortitude kill-denial heated-body truth-aura fear-aura] [same-cell unoffered: throw-retrieve zone-seed coating] [same-seat rejected: false-appearance:body-verdict adhesive:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict death-restoration:cr-range uncanny-sense:body-verdict earth-glide:movement tunneler:movement sealed-body:role relic-object:body-verdict mimicry:body-verdict blurred-form:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Cinder Perch Spider" — donor skirmisher-3, CR 3
[reskin] ledger: 1 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 13-cinder-perch-spider.json — 1 recorded answer(s) unused
```

---

## 14-mimic

## 14. Mimic — CR 9

**Input:** `name: Mimic | but it's a whole house`
**Donor:** lurker-8 -> CR 9
**Signature:** library

### Block
```
Mimic

Medium Monstrosity, Neutral

AC 16
Initiative +4 (14)

HP 130 (20d8 + 40)

Speed 20 ft.

MOD
SAVE
STR
17
+3
+3
INT
5
-3
+1
MOD
SAVE
DEX
18
+4
+8
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

Skills Perception +5, Stealth +12

Immunities Acid; Prone

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 9 (XP 5,000; PB +4)

Traits

Acidic Gullet. At the end of each of the mimic's turns, each creature in a 5-foot Emanation originating from the mimic takes 7 (2d6) Acid damage.

Adhesive (Object Form Only). The mimic adheres to anything that touches it. A Huge or smaller creature adhered to the mimic has the Grappled condition (escape DC 15). Ability checks made to escape this grapple have Disadvantage.

Actions

Multiattack. The mimic makes three attacks, using Bite or Pseudopod in any combination. It can replace one attack with a use of Swallow.

Bite. Melee Attack Roll: +8 (with Advantage if the target is Grappled by the mimic), reach 5 ft. 22 (4d8 + 4) Piercing damage—or 39 (8d8 + 3) Piercing damage if the target is Grappled by the mimic—plus 13 (3d8) Acid damage.

Pseudopod. Melee Attack Roll: +8, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 4 (1d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15). Ability checks made to escape this grapple have Disadvantage.

Swallow. Dexterity Saving Throw: DC 15, one Medium or smaller creature within 5 feet that the mimic hit with a melee attack this turn. Failure: The target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the mimic, and takes 14 (4d6) Acid damage at the start of each of the mimic's turns. If the mimic takes 20 damage or more on a single turn from a creature inside it, it must succeed on a DC 15 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the mimic and has the Prone condition. If the mimic dies, a swallowed creature is no longer Restrained and can escape from the corpse using 10 feet of movement, exiting with the Prone condition.

Bonus Actions

Shape-Shift. The mimic shape-shifts to resemble a Medium or Small object while retaining its game statistics, or it returns to its true blob form. Any equipment it is wearing or carrying isn't transformed.

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
!! [ENRICHMENT] Failed to enrich Cinder Perch Spider: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 13 taken name(s) the recording carried
[path] twist — Mimic (is) — "Name field: Mimic" (code)
[route] lurker-trap type=Monstrosity mechanics=grapple — casts: the call reads no worked magic here | hold_shape: contain on the GM's own words "a whole house" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-trap: ✓ ("it's a whole house") | lurker-trap: no line key in the words — the model's read of its quote
[concept] name: "Mimic" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: trap→style ✓ ("it IS the ambush")
[concept] resolve: archetype=lurker type=Monstrosity typeFrom=the route call themes=devouring/subterranean mind=sapient style=trap energy=Acid mix=both identity=✓ lore=✓
[concept] name: provided "Mimic"
[concept] mechanics: grapple
[concept] signature elements: the house that is really a mouth [body] | luring prey inside before sealing shut [behavior] | clenching walls and grinding floors [behavior]
[concept] identity: The House waits as a house — a slumped, roofed shell of hide and beam that lets prey walk under its eaves before its walls clench shut; the door is its mouth and the windows its eyes. Every round after, it grinds inward, swallowing the room by room, folding floorboards into a closing fist. It does not flee when bloodied; a wounded House simply drops its disguise a layer early and pulls the whole neighborhood in with it, toying with survivors by letting one corridor of daylight linger before sealing it.
[concept] lore: A House is a mimicked dwelling grown too large to move on, a Monstrosity that ate a homestead and wore it, now squatting along the trade roads waiting for travelers to mistake hunger for hospitality.
[reskin] print canon route: the Mimic's body outranks the trap seat — no verb in the words names it; the plain lurker line
[reskin] print canon array: STR 17, DEX 18, CON 15, INT 5, WIS 13, CHA 8 — the Mimic's, DEX fitted to +8
[reskin] donor: lurker-8 -> CR 9
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] seats: action <- "luring prey inside before sealing shut" | trait <- "the house that is really a mouth"
[reskin] [path] decides: twist on the Mimic (the matcher agrees)
[reskin] print canon: "Mimic — but it's a whole house" heads on the Mimic — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the mimic" — the call answered "the mimic" (kind), which the name does not support
[reskin] inline form: "the mimic" — the model's own reading of the name
[reskin] the sheet's declared ask: swallow — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Mimic —" -> has (descriptive), head | "it's a whole house" -> has (descriptive)
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "The House's door-mouth yawns wide and inhales — each creature of its c" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Anything the House swallows is dissolved in its acidic gullet: at the " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 38 of 38 answered; not true of this body: wail, active-toll, random-ray, snare-bolt, drain, zone-seed, blighted-ground, blink, phase-slip, heated-body, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, hook-rider, life-drain
[reskin] signature idea (action): "The House's door-mouth yawns wide and inhales — each creature of its choice within reach must succeed on a Strength save or be pulled inside the House and swallowed, becoming blinded and restrained within its clenching walls until it escapes by succeeding on a Strength check against the House's own grip." [action/save/condition] [family: drag] — menu: swallow, leap, execute, seal, lure, pull-through, ground-burst, spew, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, push-prone, reveal (+ shelf: gaze-single, delayed-brand, shell-withdraw, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, answering-strike, stunning-strike, charge-push, pounce, isolation)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — swallow: swallow
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: swallow (save/condition), seal (save/condition), lure (save/condition)
[reskin] keys would have bound: action — swallow (whole)
[reskin] classification handed to the fit call: mechanic=grapple
[reskin] word match declined by the call: pull-through, push-prone, leap, lure, terror-pulse — the key word does not mean the mechanic here
[reskin] signature template: swallow -> Actions/"Swallow Whole" ("creatures wrenched inside the House-mouth, blinded and restrained within its cle [verb: whole:concept, swallow:idea, swallows:idea, swallowed:idea]")
[reskin] keys spent by the action: whole
[reskin] signature idea (trait): "Anything the House swallows is dissolved in its acidic gullet: at the start of each of the House's turns, any creature swallowed by it takes acid damage as the mimic digests its meal." [trait/start_of_turn/damage] [family: zone] — menu: false-appearance, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial
[reskin] composed candidates on the menu: trait — composed:zone:damage (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does damage; leading: composed:zone:damage (start_of_turn/damage), truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition)
[reskin] keys would have bound: trait — false-appearance (mimic)
[reskin] classification handed to the fit call: mechanic=grapple
[reskin] row composed from the family's own options: trait — composed:zone:damage: the call picked it off the menu (what no printed template did: unstated)
[reskin] free signature row: trait — "composed:zone:damage" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "the house that is really a mouth" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] free signature row: "Acidic Gullet" — the trait seat cannot quote the GM, but the call names the element it expresses: "the house that is really a mouth". Earns no clause credit; the twist/class path allows 1 and this is number 2
[reskin] seat takes its clause: "Acidic Gullet" is HANDED "it's a whole house" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): composed:zone:damage -> Traits/"Acidic Gullet" ("at the start of each of the House's turns, any creature swallowed by it takes ac [shape fit, no verb match]")
[reskin] one mechanic, one name: Actions/"Swallow Whole" -> "Swallow" — this row is swallow and does what every swallow row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Door = none
[reskin] print canon size: Huge -> Medium — the Mimic's
[reskin] print canon type: the call answered type_source=user for monstrosity, but the GM's words do not name it — the Mimic's own type stands
[reskin] print canon speed: 30 ft. -> 20 ft. — the Mimic's walk; the concept's other modes stay
[reskin] print canon row: Actions/Pseudopod — the Mimic's second melee row, beside the chassis's
[reskin] print canon attack: "Door" -> "Bite" — the Mimic's own row
[reskin] languages held: None stands — INT 5 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] element immunity: Acid — the call read this creature's energy as Acid and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Acid (merged into the header write)
[reskin] immunities stamped for type: Monstrosity -> Acid
[reskin] print canon defenses: immunities Acid -> Acid; Prone — the Mimic's own header lines
[reskin] print canon trait: Adhesive (Object Form Only) — "Mimic — but it's a whole house" is the Mimic (print's own row)
[reskin] print canon row: Bonus Actions/Shape-Shift — the Mimic's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" yields to the Mimic's Shape-Shift
[reskin] multiattack replacement clause: It can replace one attack with a use of Swallow.
[reskin] free-row budget by card size: CR 9 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Acidic Gullet" [no template]
[reskin] row binds its clause: "Swallow" answers "it's a whole house" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Acidic Gullet carries "the house that is really a mouth" — "each creature in a 5-foot Emanation originating from the mimic takes 7 (2d6) Aci"
[reskin] audit: [Acidic Gullet: A 5-foot emanation from a Medium cr…ating from the mimic takes 7 (2d6) Acid damage.")]
[reskin] audit defect: Traits/"Acidic Gullet" [model-written] medium undelivered — A 5-foot emanation from a Medium creature hits only creatures sharing its own space or adjacent to it, so the gullet never meaningfully distinguishes an interior (swallowed) creature from an exterior one, and it makes the swallow's own 4d6-per-turn payload redundant with a second free damage tick. — Restrict the damage to a creature the mimic has swallowed (or another defined subset) so the trait expresses an interior mouth rather than an ambient aura. (about: "each creature in a 5-foot Emanation originating from the mimic takes 7 (2d6) Acid damage.")
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] escape dc: Pseudopod, Adhesive (Object Form Only) → DC 15 (8 + PB + STR; a late row wore another number)
[reskin] done: "Mimic" — donor lurker-8, CR 9
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 14-mimic.json
```

---

## 15-hollowmoor-alpha

## 15. Hollowmoor Alpha — CR 2

**Input:** `wolf pack leader, smarter than the rest, calls the pack`
**Donor:** skirmisher-1 -> CR 2
**Signature:** library

### Block
```
Hollowmoor Alpha

Medium Monstrosity, Neutral

AC 15
Initiative +3 (13)

HP 44 (8d8 + 8)

Speed 30 ft.

MOD
SAVE
STR
10
+0
+0
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
8
-1
-1

Skills Perception +4, Stealth +5

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 2 (XP 450; PB +2)

Traits

Pack Tactics. The alpha has Advantage on an attack roll against a target if at least one of the alpha's allies is within 5 feet of that target and the ally doesn't have the Incapacitated condition.

Pack Mobility. The alpha ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The alpha makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage.

Bonus Actions

Fleet Agility. The alpha takes the Dash or Disengage action.

Pack Call. Wisdom Saving Throw: DC 12, one creature within 30 feet. Failure: Until the start of the alpha's next turn, the target has Disadvantage on attack rolls against creatures other than the alpha.

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
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
!! [ENRICHMENT] Failed to enrich Mimic: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 14 taken name(s) the recording carried
[path] homebrew — Wolf (resembles) — "wolf pack leader, smarter than the rest, calls the pack" (call)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher: ✓ ("smarter than the rest") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Beast typeFrom=the route call themes=bestial/voice mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a howl that calls the pack to its side [behavior] | pack tactics that flank and harry a chosen prey [behavior] | battle-scarred alpha hide [body]
[concept] identity: The pack leader opens by circling at the edge of the fight and loosing a sharp, carrying howl that pulls its packmates in from the treeline, then darts in on the flank — nipping at a hamstring or the back of a knee — and peels away before the heavy answer lands. Every round after that it reads the fight and places its pack: it singles out the wounded or isolated target and runs it down with harrying bites while refusing to trade blows fair. Under pressure it is cold and patient, retreating into cover and calling the pack to finish what it started rather than fighting to the death alone.
[concept] lore: An old, scar-scarred wolf that has outlived three litters of ordinary packmates, it learned to hunt beside something that walks on two legs and now leads the forest's wolves as a single hunting mind — and it wants nothing more than a fresh, unwary pack to fold into its own.
[reskin] mind tier held: CHA stays 8 against "ordinary" — the card's 8 is already ordinary
[reskin] mind tier: INT 8 -> 15 — the call read this creature as capable at CR 2
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 2
[reskin] donor: skirmisher-1 -> CR 2
[reskin] seats: action <- "a howl that calls the pack to its side" | trait <- "battle-scarred alpha hide"
[reskin] [path] decides: homebrew (the matcher would have said homebrew)
[reskin] claim gate: CR 2 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the alpha" — the call's own answer (kind), built from the name
[reskin] inline form: "the alpha" — the model's own reading of the name
[reskin] the sheet's declared ask: command — the route call's one answer for the whole concept
[reskin] sapient is no Beast: Beast -> Monstrosity — the call reads this creature as sapient, and print's Beasts are Unaligned and speechless (owner's ruling, 2026-11-15)
[reskin] alignment by mind: Unaligned -> Neutral — a Beast with INT 15 can hold an ethic (print: 0 of 329 Unaligned blocks speak)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "wolf pack leader" -> has (descriptive), head | "smarter than the rest" -> has (descriptive) | "calls the pack" -> has (descriptive)
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (3 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "The alpha throws back its scarred head and looses a carrying, broken-t" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Centuries of surviving what killed its litters have made the alpha a r" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 32 of 32 answered; not true of this body: gaze-single, snare, shield-bash, spew, snare-bolt, blink, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, web-walker, energy-aura, noxious-aura, marking-light, relic-object, warded-mending, gaze-aura, blurred-form, death-burst, hook-rider, life-drain
[reskin] signature idea (action): "The alpha throws back its scarred head and looses a carrying, broken-toothed howl that binds every wolf within earshot into one hunting mind: each of the alpha's allies that can hear it may immediately use its Reaction to move up to its Speed toward a creature the alpha can see, ending that move in a position to flank if it can. The pack runs down what the alpha has chosen." [action/always/movement] [family: mark] — menu: lure, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, riposte, answering-strike, contagion, charge-push, pounce, isolation, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires always/does movement; leading: focus (always/movement), disarm (save/movement), aggro-curse (save/movement)
[reskin] keys would have bound: action — lure (call)
[reskin] word match declined by the call: focus, lure — the key word does not mean the mechanic here
[reskin] value check: "Pack Call" EV 2.1 vs floor 0 (a bonus action (free)) — worth the trade
[reskin] signature template: aggro-curse -> Bonus Actions/"Pack Call" ("binds the pack to one hunting mind that runs down what the alpha has chosen — al [verb: chosen:idea]")
[reskin] signature idea (trait): "Centuries of surviving what killed its litters have made the alpha a reader of the fight: it always knows which of its enemies is wounded or isolated, and its Bite deals its damage against a creature that is Bloodied or has no ally within reach as though the alpha had Advantage, patient and cold until the weak one is spent." [trait/always/damage] [family: payoff] — menu: phobia, terrain-walk, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, mimicry, truth-aura, fear-aura, assassinate, kill-denial
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] declared mechanic leads the menu: trait — command: pack-tactics
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: pack-tactics (always/damage), blood-frenzy (always/damage), assassinate (always/damage)
[reskin] keys would have bound: trait — pack-tactics (pack, wolf pack)
[reskin] word match declined by the call: blood-frenzy, assassinate — the key word does not mean the mechanic here
[reskin] signature template (trait): pack-tactics -> Traits/"Pack Tactics" ("It always reads which enemy is isolated — with no ally within 5 feet of the targ [verb: pack:concept, wolf pack:concept]")
[reskin] weapons answered: Bite = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] free-row budget by card size: CR 2 sits in band 0-2, where print runs 1-4 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] row binds its clause: "Pack Tactics" answers "calls the pack" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] lint: 0 findings
audit finding below confidence gate: Pack Call Pack Call's payload is redundant with the alpha's own Pack Tactics: the pack already attacks with Advantage, so forcing enemies to attack each other-but-not-the-alpha changes little and gives the wolf nothing the fantasy of 'calls the pack' implies (no repositioning, no pack benefit, no teeth against the alpha itself).
audit finding below confidence gate: Pack Call The effect names 'creatures other than the alpha' as a category with no defined membership or tracking, and the save's target is 'one creature within 30 feet' with no visibility or line-of-effect qualifier, so a GM cannot cleanly resolve who the rider applies to.
[reskin] audit: nothing flagged
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Hollowmoor Alpha" — donor skirmisher-1, CR 2
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 15-hollowmoor-alpha.json — 1 recorded answer(s) unused
```

---

## 16-gelatinous-cube

## 16. Gelatinous Cube — CR 5

**Input:** `name: Gelatinous Cube | full of the skeletons it ate and they fight for it`
**Donor:** ooze-4 -> CR 5
**Signature:** library

### Block
```
Gelatinous Cube
Large ooze, unaligned
Armor Class

8 (natural armor)

Hit Points: 

94 (9d10 + 45)

Speed: 

15 ft., climb 15 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

3 (-4)

	

20 (+5)

	

1 (-5)

	

6 (-2)

	

1 (-5)

Damage Immunities: 

acid

Condition Immunities: 

blinded, charmed, deafened, exhaustion, frightened, prone

Senses: 

blindsight 60 ft. (blind beyond this radius), passive Perception 8

Languages: 

None

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Cage of the Dead.When the cube reduces a creature to 0 hit points, the creature's bones rise inside the cube's gel as a skeleton under the cube's command (the cube's Pseudopod attack now comes from the skeleton), and the cube regains 9 (2d8) hit points as the skeleton is fitted into the cage.
Amorphous.The cube can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form.A creature that touches the cube or hits it with a melee attack while within 5 feet of it takes 5 (1d10) necrotic damage.
Spider Climb.The cube can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Ooze Cube.The cube fills its entire space and is transparent. Other creatures can enter that space, but a creature that does so is subjected to the cube's Engulf and has disadvantage on the saving throw.
Creatures inside the cube have Total Cover, and the cube can hold one Large creature or up to four Medium or Small creatures inside itself at a time.
As an action, a creature within 5 feet of the cube can pull a creature or an object out of the cube by succeeding on a DC 12 Strength (Athletics) check, and the puller takes 10 (3d6) acid damage.
Transparent.Even when the cube is in plain sight, a creature must succeed on a DC 15 Wisdom (Perception) check to notice the cube if the creature hasn't witnessed the cube move or otherwise act.

Actions
Multiattack: The cube makes two Pseudopod attacks. It can replace one attack with a use of Drowned Dead.
Pseudopod: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) acid damage.
Drowned Dead: One creature within 30 feet of the cube must succeed on a DC 16 Wisdom saving throw or be frightened of the cube until the end of its next turn.
Engulf: The cube moves up to its Speed without provoking Opportunity Attacks. The cube can move through the spaces of Large or smaller creatures if it has room inside itself to contain them (see the Ooze Cube trait). Each creature whose space the cube enters for the first time during this move must make a DC 16 Dexterity saving throw, taking 10 (3d6) acid damage on a failed save, or half as much damage on a successful one. On a failed save, the target is engulfed. An engulfed target is suffocating, can't cast spells with a Verbal component, is restrained, and takes 10 (3d6) acid damage at the start of each of the cube's turns. When the cube moves, the engulfed target moves with it. An engulfed target can try to escape by taking an action to make a DC 16 Strength (Athletics) check. On a successful check, the target escapes and enters the nearest unoccupied space.
```

### Trace
```
!! [ENRICHMENT] Failed to enrich Hollowmoor Alpha: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 15 taken name(s) the recording carried
[path] twist — Gelatinous Cube (is) — "Name field: Gelatinous Cube" (code)
[route] ooze type=Ooze mechanics=grapple — casts: the call reads no worked magic here | hold_shape: contain on the GM's own words "full of the skeletons it ate" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | ooze: ✓ ("Gelatinous Cube") | ooze: no line key in the words — the model's read of its quote
[concept] name: "Gelatinous Cube" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=ooze type=Ooze typeFrom=the route call themes=grave/devouring mind=mindless style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Gelatinous Cube"
[concept] mechanics: grapple
[concept] signature elements: engulfing everything it touches [behavior] | a transparent body full of digested skeletons [body] | the dead inside it fighting for it [behavior]
[concept] identity: The cube slides forward in silence, its clear rot-gel body packed with the jumbled skeletons of everything it has dissolved, and it opens with a slow engulf that folds prey into the amber dark. From that moment every round is the same terrible arithmetic: the drowned skeletons animate inside the body and strike at whoever is trapped or pressed against the glassy surface, so the creature is never fighting alone. It has no fear and no plan — it drifts toward the largest warmth, grinding its captive bones together harder as the fight drags on, and it fights until something in it finally dies.
[concept] lore: A gelatinous cube that fed too well in a bone-littered ossuary does not digest its skeletons so much as hire them, and now it wanders the corridors of the dead with a small army suspended in its gut, hungry for the fresh bones that might replace the worn ones.
[reskin] body type: ooze — the body outranks the role (recorded: ooze)
[reskin] print canon array: STR 16, DEX 3, CON 20, INT 1, WIS 6, CHA 1 — the Gelatinous Cube's, STR fitted to +6
[reskin] donor: ooze-4 -> CR 5
[reskin] row gated out: Engulf (engulf) — the concept did not claim this mechanic
[reskin] seats: action <- "engulfing everything it touches" | trait <- "a transparent body full of digested skeletons"
[reskin] [path] decides: twist on the Gelatinous Cube (the matcher agrees)
[reskin] print canon: "Gelatinous Cube — full of the skeletons it ate and they fight for it" heads on the Gelatinous Cube — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the cube" — the call answered "the cube" (kind), which the name does not support
[reskin] inline on stamped rows: "Cube" -> "the cube" on 0 rows — they were written before the name's form was settled
[reskin] inline form: "the cube" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] the sheet's declared ask: swallow — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "in silence" quotes nothing the user typed
[reskin] the clause is its own quote: limit "at_will" stands on "they fight for it" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Gelatinous Cube — full of the skeletons it ate" -> has (descriptive), head | "they fight for it" -> has (mechanical) [asked: at_will/attack]
[reskin] open asks handed to the idea call: "they fight for it" (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The cube folds a grappled creature into its gel and the skeletons with" answers the GM's "they fight for it"
[reskin] idea unanchored: trait — "Any skeleton or corpse the cube dissolves is taken into its body and r" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 38 of 38 answered; not true of this body: gaze-single, seal, shield-bash, wail, active-toll, random-ray, spew, snare-bolt, herd, blink, shell-withdraw, rally, phase-slip, absorption, bloodied-burst, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, hook-rider
[reskin] menu: taste stands down — action answers the GM's "they fight for it", so role and style do not filter the menu (legality still does); 5 template(s) offered
[reskin] menu pruned: action — pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, push-prone, thrown-burst-seed, drain, zone-seed, wind-up, blighted-ground, disarm, curse-debt, reveal, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating (the sheet cannot render them)
[reskin] signature idea (action): "The cube folds a grappled creature into its gel and the skeletons within crowd around it, striking from every side. At the start of each of the cube's turns, a creature engulfed by or grappled within the cube takes Bludgeoning damage as the drowned dead hammer at it with fists and skulls, and if it is not already Frightened it must succeed on a Wisdom saving throw or become Frightened of the cube " [action/always/damage] [family: payoff] — menu: trample, execute, lure, pull-through, ground-burst (+ shelf: leap, rampage, patient-defense, second-wind, lay-on-hands, riposte, affliction, contagion, stunning-strike, charge-push, pounce, isolation, life-drain, charge)
[reskin] composed candidates: none action — the payoff family composes a rider and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires always/does damage; leading: trample (save/damage), execute (save/damage), ground-burst (save/damage)
[reskin] classification handed to the fit call: mechanic=grapple shape=attack often=at_will
[reskin] word match declined by the call: trample, execute, lure, pull-through — the key word does not mean the mechanic here
[reskin] closest refused: action — "ground-burst" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a repeating turn-start damage-plus-fear effect on creatures already en)
[reskin] seat authored nothing: action — the call was asked to write an action for "The cube folds a grappled creature into its gel and the skeletons with" and wrote no row of that kind (refused: "Drowned Dead" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: action — the first answer was refused ("Drowned Dead" — a trait is not a save — the save form takes stat, target and effect as fields and the engine ); asking once more with the reason
[reskin] authored row answers the GM: action — "Drowned Dead" was written for "they fight for it", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a repeating turn-start damage-plus-fear effect on creatures already en") and wrote an action instead: "Drowned Dead" -> Actions. *Wisdom Saving Throw*: DC 16, one creature within 30 feet. *Failure:* The target has the Frightened condition until the 
[reskin] authored row numbers: "Drowned Dead" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Drowned Dead" after ""Drowned Dead" — a trait is not a save — the save form takes stat, target and ef"
[reskin] seat takes its clause: "Drowned Dead" is HANDED "they fight for it" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Drowned Dead" ("The cube folds a grappled creature into its gel and the skeletons within crowd around it, striking from every side. At the start of each of the cube's turns, a  [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Any skeleton or corpse the cube dissolves is taken into its body and rises to serve it; when the cube reduces a creature to 0 hit points, its bones animate within the gel, and the cube regains Hit Points as the new skeleton is fitted into its cage of the dead." [trait/always/damage] [family: heal] — menu: false-appearance, adhesive, phobia, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the heal family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), assassinate (always/damage)
[reskin] classification handed to the fit call: mechanic=grapple
[reskin] word match declined by the call: adhesive, blood-frenzy, pack-tactics, assassinate, false-appearance, phobia, bloodied-fury, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, noxious-aura, truth-aura, fear-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "kill-denial" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: raises the slain as skeletal servants bound to fight for it)
[reskin] seat answered, but: the call said "Any skeleton or corpse the cube dissolves is taken into its body and rises to serve it; when the cube reduces a creature" is carried by "Cage of the Dead", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("raises the slain as skeletal servants bound to fight for it") and wrote a trait instead: "Cage of the Dead" -> Traits. When the cube reduces a creature to 0 Hit Points, the creature's bones rise inside the cube's gel as a skeleton under th
[reskin] authored row numbers: "Cage of the Dead" — the call declared 1 number(s) promised
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Cage of the Dead" ("Any skeleton or corpse the cube dissolves is taken into its body and rises to serve it; when the cube reduces a creature to 0 hit points, its bones animate with [authored: the catalog held no shape for it]")
[reskin] weapons answered: Bone Shard = none; Amber Engulf = none
[reskin] speed by concept: dropped Climb 20 ft. — the concept's movement set decides
[reskin] print canon type: the call answered type_source=user for ooze, but the GM's words do not name it — the Gelatinous Cube's own type stands
[reskin] print canon speed: 20 ft. -> 15 ft. — the Gelatinous Cube's walk; the concept's other modes stay
[reskin] rider folded: "Bone Shard" keeps its budget — the chassis's rider half (7) folds into the base; the Gelatinous Cube pays no damage rider of its own
[reskin] print canon attack: "Bone Shard" -> "Pseudopod" — the Gelatinous Cube's own row
[reskin] climb speed: Climb 15 ft. — a creature that climbs difficult surfaces has a Climb Speed in print (the Vampire, the Giant Spider)
[reskin] languages held: None stands — INT 1 on a Ooze speaks nothing, whatever the mind read said
[reskin] element immunity: Necrotic (merged into the header write)
[reskin] immunities stamped for type: Ooze -> Acid, Necrotic; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained
[reskin] print canon defenses: immunities Acid, Necrotic; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained -> Acid; Blinded, Charmed, Deafened, Exhaustion, Frightened, Prone — the Gelatinous Cube's own header lines
[reskin] print canon trait: Ooze Cube — "Gelatinous Cube — full of the skeletons it ate and they fight for it" is the Gelatinous Cube (print's own row)
[reskin] print canon trait: Transparent — "Gelatinous Cube — full of the skeletons it ate and they fight for it" is the Gelatinous Cube (print's own row)
[reskin] print canon row: Actions/Engulf — the Gelatinous Cube's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Drowned Dead.
[reskin] free-row budget by card size: CR 5 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 8 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Cage of the Dead" [no template]
[reskin] ask vs row ok: "they fight for it" -> "Drowned Dead" — limit at_will
[reskin] lint: type-damage-affinity: Traits/Corrosive Form: Necrotic damage on Ooze — no official Ooze deals Necrotic; re-theme the damage to the creature's substance (or the type itself is wrong)
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Cage of the Dead carries "the dead inside it fighting for it" — "the creature's bones rise inside the cube's gel as a skeleton under the cube's c"
audit finding below confidence gate: Corrosive Form A corrosive form dealing Necrotic rather than Acid is a dead element — the cube is defined by acid and the trait answers a touch with a damage type its own fiction never uses.
[reskin] audit: [Cage of the Dead: The trait says the skeleton repl…'s Pseudopod attack now comes from the skeleton"), Drowned Dead: The row written for 'they fight for …tened condition until the end of its next turn."), Drowned Dead: The name invokes the drowned dead, b…ving Throw: DC 16, one creature within 30 feet.")]
[reskin] audit rename blocked — "Gel Chill" claims an element "Drowned Dead" does not pay (no damage)
[reskin] audit defect: Traits/"Cage of the Dead" [model-written] high untrackable — The trait says the skeleton replaces the source of the Pseudopod, but the cube can create multiple skeletons over time with no cap and nothing in the block addresses whether multiple skeletons coexist, whether each grants its own Pseudopod, or which one a given attack comes from — an ungoverned, growing state the GM must track. — Cap the number of skeletons the gel can hold and state that they do not each produce an attack. (about: "the cube's Pseudopod attack now comes from the skeleton")
[reskin] audit defect: Actions/"Drowned Dead" [model-written] high undelivered — The row written for 'they fight for it' delivers only a one-round Frightened, which neither makes a skeleton attack nor imposes anything the cube's Engulf does not already do better; the dead do not fight. — Give the row a payload where the risen dead actually strike or harm the target rather than only frightening it. (about: "The target has the Frightened condition until the end of its next turn.")
[reskin] clause unresolved: "Cage of the Dead" carries "Any skeleton or corpse the cube dissolves is taken into ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Gelatinous Cube" — donor ooze-4, CR 5
[reskin] ledger: 1 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 16-gelatinous-cube.json
```

---

## 17-young-black-dragon

## 17. Young Black Dragon — CR 9

**Input:** `name: Young Black Dragon | undead, breath is necrotic`
**Donor:** dragon-8 -> CR 9
**Signature:** dropped

### Block
```
Young Black Dragon

Large Undead, Chaotic Evil

AC 18
Initiative +2 (12)

HP 136 (16d10 + 48)

Speed 40 ft., Fly 80 ft., Swim 40 ft.

MOD
SAVE
STR
19
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
+6
WIS
11
+0
+4
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

Skills Perception +4, Stealth +6

Immunities Acid

Senses blindsight 30 ft., darkvision 120 ft.; Passive Perception 14

Languages Common, Draconic

CR 9 (XP 5,000; PB +4)

Traits

Amphibious. The dragon can breathe air and water.

Actions

Multiattack. The dragon makes three Rend attacks.

Rend. Melee Attack Roll: +8, reach 10 ft. 11 (2d6 + 4) Slashing damage plus 3 (1d6) Acid damage.

Acid Breath (Recharge 5-6). Dexterity Saving Throw: DC 15, each creature in a 30-foot-long, 5-foot-wide Line. Failure: 49 (14d6) Acid damage. Success: Half damage.

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
!! [ENRICHMENT] Failed to enrich Gelatinous Cube: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 16 taken name(s) the recording carried
[path] twist — Young Black Dragon (is) — "Name field: Young Black Dragon" (code)
[route] dragon type=Undead mechanics=breath — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | dragon: ✓ ("Young Black Dragon — undead, breath is n") | dragon: key "dragon" (class body)
[concept] name: "Young Black Dragon" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: dragon→body ✓ ("Young Black Dragon") | breath→mechanics ✓ ("breath is necrotic")
[concept] resolve: archetype=dragon type=Undead typeFrom=the route call themes=grave/draconic mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Young Black Dragon"
[concept] mechanics: breath
[concept] signature elements: necrotic breath that rots flesh [body] | deceptive death-feigning ambush [behavior] | frightful presence reeking of the grave [aura]
[concept] identity: A young black dragon whose flesh has gone carrion-wet, it announces itself with a frightful presence that stinks of the grave before gliding over a battlefield on tattered wings. It strafes with a cone of black necrosis-breath that rots flesh where it splashes, then drops into melee to seize and drag prey into its lair, spraying the same decay at close range. Wounded, it does not flee — it plays dead or melts into the ash and filth it calls home, only to rise again for a second ambush.
[concept] lore: An acid-bog dragon that refused to finish dying, it haunts its drowned lair and hungers to see everything that once feared it rot down to bone.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] the concept outranks the alias: the Young Black Dragon is a Dragon and the concept reads Undead — the words RESEMBLE it, they do not name it, so the alias match stands down. Print canon is decided separately and may still run on this sheet
[reskin] print canon array: STR 19, DEX 14, CON 17, INT 12, WIS 11, CHA 15 — the Young Black Dragon's, STR fitted to +8
[reskin] donor: dragon-8 -> CR 9
[reskin] seats: action <- "deceptive death-feigning ambush" | trait <- "necrotic breath that rots flesh"
[reskin] [path] decides: twist on the Young Black Dragon (the matcher would have said homebrew)
[reskin] print canon: "Young Black Dragon — undead, breath is necrotic" heads on the Young Black Dragon — print's rows ride along; the seat stays
[reskin] name_element answered: Necrotic Breath = literal
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the dragon" — the call answered "the dragon" (kind), which the name does not support
[reskin] inline form: "the dragon" — the model's own reading of the name
[reskin] the sheet's declared ask: breath — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "breath is necrotic" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Young Black Dragon — undead" -> has (descriptive), head | "breath is necrotic" -> has (mechanical) [asked: at_will/save_area] [askMechanic: breath]
[reskin] open asks handed to the idea call: "breath is necrotic" [breath] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The dragon's hide splits open and voids a hissing cloud of grave-rot t" answers the GM's "breath is necrotic"
[reskin] idea unanchored: trait — "Where the dragon walks, the bog dies with it: the ground it crosses be" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 35 of 35 answered; not true of this body: seal, shield-bash, herd, shell-withdraw, rally, heated-body, absorption, bloodied-burst, resonant-body, adhesive, web-walker, marking-light, sealed-body, relic-object, warded-mending, mimicry, blurred-form, death-burst
[reskin] menu: taste stands down — action answers the GM's "breath is necrotic", so role and style do not filter the menu (legality still does); 4 template(s) offered
[reskin] menu pruned: action — aggro-curse, self-invisibility, focus, coating, feint-slip, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, drain, pacify, slow-bolt, sensory-strike, disarm, delayed-brand, curse-debt, reveal (the sheet cannot render them)
[reskin] signature idea (action): "The dragon's hide splits open and voids a hissing cloud of grave-rot that clings to those it touches. Each creature of its choice within a short radius must succeed on a Constitution saving throw or be Poisoned; a Poisoned creature has the flesh begin to slough from its bones, taking Necrotic damage at the start of each of its turns and spreading the taint to any creature it touches." [bonus_action/save/condition] [family: zone] — menu: rampage, lay-on-hands, second-wind, patient-defense (+ shelf: gaze-single, snare, zone, execute, lure, answering-strike, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, life-drain, charge, isolation)
[reskin] composed candidates: none action — the zone family composes a trait and this is the bonus_action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: execute (save/damage), affliction (on_hit/condition), zone (once_per_fight/condition)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area when=at_will
[reskin] word match declined by the call: zone — the key word does not mean the mechanic here
[reskin] closest refused: action — "zone" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: damages those who touch a poisoned creature, spreading the rot)
[reskin] clause already answered: "breath is necrotic" is carried by "Necrotic Breath" — the seat read the sheet and declined to write a second row for it
[reskin] seat stands down: action — "breath is necrotic" is already carried by a row on this sheet; no second row is written for it
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The dragon's hide splits open and voids a hissing cloud of grave-rot that clings to those it touches. Each creature of its choice within a short radius must succeed on a Constitution saving throw or be Poisoned; a Poisoned creature has the flesh begin to slough from its bones, taking Necrotic damage at the start of each of its turns and spreading the taint to any creature it touches." [bonus_action/save/condition] — the model found no template that holds it (offered: execute, affliction, zone, rampage, lay-on-hands, second-wind, patient-defense, riposte)
[reskin] signature idea (trait): "Where the dragon walks, the bog dies with it: the ground it crosses becomes a reeking slough of carrion mud that counts as difficult terrain and leaves a stench no creature can mask. Any creature that starts its turn in that mire must succeed on a Constitution saving throw or retch, wasting its action — and the dragon itself is never slowed by it." [trait/always/movement] [family: zone] — menu: false-appearance, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, energy-aura, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, gaze-aura, kill-denial (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — breath: noxious-aura
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: noxious-aura (start_of_turn/condition), spider-climb (always/movement), terrain-walk (always/movement)
[reskin] classification handed to the fit call: mechanic=breath
[reskin] word match declined by the call: terrain-walk, noxious-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "aberrant-ground" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: creatures starting their turn in the mire must save or lose their acti)
[reskin] seat answered, but: the call said "Where the dragon walks, the bog dies with it: the ground it crosses becomes a reeking slough of carrion mud that counts " is carried by "Bogrot Trail", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Where the dragon walks, the bog dies with it: the ground it crosses be" and wrote no row of that kind (refused: "Bogrot Trail" — the call counts 1 number(s) the row promises and only 0 are written — a promised amount, area or bonus with no number cannot be run) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Bogrot Trail" — the call counts 1 number(s) the row promises and only 0 are written — a promised amount, area); asking once more with the reason
[reskin] seat answered, but: the call said "Where the dragon walks, the bog dies with it: the ground it crosses becomes a reeking slough of carrion mud that counts " is carried by "Bogrot Trail", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Where the dragon walks, the bog dies with it: the ground it crosses be" and wrote no row of that kind (refused: "Bogrot Trail" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat refused twice: trait — first: "Bogrot Trail" — the call counts 1 number(s) the row promises and only 0 are written — a p; second: "Bogrot Trail" — a trait is not a save — the save form takes stat, target and effect as fi; the seat stays empty
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Where the dragon walks, the bog dies with it: the ground it crosses becomes a reeking slough of carrion mud that counts as difficult terrain and leaves a stench no creature can mask. Any creature that starts its turn in that mire must succeed on a Constitution saving throw or retch, wasting its action — and the dragon itself is never slowed by it." [trait/always/movement] — the model found no template that holds it (offered: noxious-aura, spider-climb, terrain-walk, aberrant-ground, relentless-pursuit, bound, false-appearance, phobia, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, undead-fortitude, kill-denial, composed:zone:terrain, energy-aura, truth-aura, fear-aura, gaze-aura)
[reskin] weapons answered: Rotting Claw = none
[reskin] chassis nova: "Necrotic Breath (Recharge 5-6)" — the dragon-8's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral Evil -> Chaotic Evil — the Young Black Dragon's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Undead stays — the words say undead ("a dire wolf but undead", 2026-10-01)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common, Draconic" — the Young Black Dragon's
[reskin] print canon attack: "Rotting Claw" -> "Rend" — the Young Black Dragon's own row
[reskin] element immunity: Necrotic (merged into the header write)
[reskin] immunities stamped for type: Undead -> Necrotic, Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Necrotic, Poison; Exhaustion, Poisoned -> Acid — the Young Black Dragon's own header lines
[reskin] print canon trait: Amphibious — "Young Black Dragon — undead, breath is necrotic" is the Young Black Dragon (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Necrotic Breath (Recharge 5-6)" is the chassis's own nova (the model renamed it), not the Young Black Dragon's
[reskin] print canon row: Actions/Acid Breath (Recharge 5-6) — the Young Black Dragon's own
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] asked but unanswered: "breath is necrotic" asked for at_will and no row binds the clause
[reskin] lint: 0 findings
[reskin] audit: [Acid Breath (Recharge 5-6): The GM asked for a nec…ath to Necrotic. (about: "49 (14d6) Acid damage")]
[reskin] audit defect: Actions/"Acid Breath" [print] high undelivered — The GM asked for a necrotic breath, but the statblock's signature breath row still deals Acid damage, so the creature does not deliver the requested necrotic breath. — Change the damage type of Acid Breath to Necrotic. (about: "49 (14d6) Acid damage")
[reskin] [gap] damages those who touch a poisoned creature, spreading the rot — "The dragon's hide splits open and voids a hissing cloud of grave-rot that clings to those it touches. Each creature of its choice within a short radius must succeed on a Constitution saving throw or be Poisoned; a Poisoned creature has the flesh begin to slough from its bones, taking Necrotic damage at the start of each of its turns and spreading the taint to any creature it touches." — Young Black Dragon [seat: action [bonus_action/save/condition]] (closest offered: zone) [effect: damage] [menu: execute affliction zone rampage lay-on-hands second-wind patient-defense riposte] [same-cell unoffered: swallow gaze-single snare seal shield-bash lure random-ray pacify escalating-dread terror-pulse snare-bolt sensory-strike push-prone reveal exploiter] [same-seat rejected: none] [row dropped]
[reskin] [gap] creatures starting their turn in the mire must save or lose their action to retching — "Where the dragon walks, the bog dies with it: the ground it crosses becomes a reeking slough of carrion mud that counts as difficult terrain and leaves a stench no creature can mask. Any creature that starts its turn in that mire must succeed on a Constitution saving throw or retch, wasting its action — and the dragon itself is never slowed by it." — Young Black Dragon [seat: trait [trait/always/movement]] (closest offered: aberrant-ground) [effect: condition] [menu: noxious-aura spider-climb terrain-walk aberrant-ground relentless-pursuit bound false-appearance phobia faultless-tracker bloodied-fury blood-frenzy pack-tactics death-restoration uncanny-sense berserk shielded-mind undead-fortitude kill-denial composed:zone:terrain energy-aura truth-aura fear-aura gaze-aura] [same-cell unoffered: blink web-walker earth-glide tunneler self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: adhesive:body-verdict web-walker:body-verdict earth-glide:movement tunneler:movement evasion:role marking-light:body-verdict sealed-body:body-verdict relic-object:body-verdict guarded-stance:role mimicry:body-verdict assassinate:role blurred-form:body-verdict death-burst:body-verdict] [row dropped]
[reskin] signature outcome: 2 of 2 accepted signature pick(s) never reached the sheet — 2x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 2 of 2 (2x the call named no template for the pick) · path twist
[reskin] done: "Young Black Dragon" — donor dragon-8, CR 9
[reskin] ledger: 1 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 1 open (1 removed)
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 17-young-black-dragon.json — 1 recorded answer(s) unused
```

---

## 18-scarred-rook

## 18. Scarred Rook — CR 1

**Input:** `a bandit captain but for level 1 players, should not kill them`
**Donor:** defender-1 -> CR 1
**Signature:** library

### Block
```
Scarred Rook
Medium humanoid, neutral
Armor Class

15 (breastplate)

Hit Points: 

27 (5d8 + 5)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


14 (+2)

	

12 (+1)

	

12 (+1)

	

10 (+0)

	

11 (+0)

	

10 (+0)

Skills: 

Athletics +4, Perception +2

Saving Throws: 

CON +3

Senses: 

passive Perception 12

Languages: 

Common

Challenge

1 (200 XP)

Proficiency Bonus:

+2

Tuned to the Novice.When the rook is reduced to 0 hit points by a level 1 player character's attack, the rook instead drops to 1 hit point and is knocked prone, and its Longsword deals 6 (1d12) less damage until the end of its next turn.
Deflecting Guard (Reaction).When a creature the rook can see makes a melee attack roll against it while an ally of the rook is within 5 feet of the rook, the rook braces its weathered shield and deflects the blow into its ally's guard, imposing disadvantage on that attack roll.
Riposte (Reaction).When a creature within 5 feet of the rook misses it with a melee attack roll, the rook makes one Longsword attack against that creature.

Actions
Longsword: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 10 (2d8 + 1) slashing damage.
Driving Bellow: Each creature of the rook's choice in a 30-foot radius originating from the rook must make a DC 12 Dexterity saving throw, taking 3 (1d6) piercing damage on a failed save. On a failed save, the target immediately moves up to half its Speed in a direction of the rook's choice, using the safest available route.
```

### Trace
```
!! [ENRICHMENT] Failed to enrich Young Black Dragon: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 17 taken name(s) the recording carried
[path] class_npc — class fighter — "bandit captain" (call)
[route] defender-leader type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("a bandit captain") | defender-leader: key "captain" (class noun)
[concept] name: provided_name rejected — "<the proper name the input gave, copied …" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/voice mind=sapient style=leader energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a captain who directs his bandits into coordinated attacks [behavior] | a weathered shield and rusted blade he parries with [object] | a fighting retreat when the fight turns against him [behavior]
[concept] identity: A scarred bandit captain who opens by sizing up the weakest hero and shouting his crew into a coordinated rush, then wades in beside them with a rusted blade and a shield he knows how to use. Each round he barks a command to reposition a bandit or press an advantage, and parries the biggest swing aimed at him while his followers soak the front line. Under real pressure he is a pragmatic survivor, not a fanatic: he fights hard until bloodied, then calls a fighting retreat rather than risk hanging for murder.
[concept] lore: Once a hired guard on a failure of a caravan, he turned to the road when his wages ran dry and now runs a ragged band of desperate men who rob wagons to eat and drink the proceeds in roadside camps.
[reskin] [path] class body: the fighter stands on the Guard — the class's own print block, nearest CR 1
[reskin] print canon route: the Guard's body outranks the leader seat — no verb in the words names it; the plain defender line
[reskin] print canon array: STR 13, DEX 12, CON 12, INT 10, WIS 11, CHA 10 — the Guard's, STR fitted to +3
[reskin] donor: defender-1 -> CR 1
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] seats: action <- "a captain who directs his bandits into coordinated attacks" | trait <- "a weathered shield and rusted blade he parries with"
[reskin] class array: STR 13 -> 14 — a fighter carries its primary stat
[reskin] [path] decides: class_npc on the Guard · class fighter (the matcher would have said twist Bandit Captain)
[reskin] print canon: "a bandit captain but for level 1 players, should not kill them" heads on the Guard — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] class kit: fighter — "bandit captain": Riposte (riposte)
[reskin] inline declared: "the rook" — the call's own answer (kind), built from the name; the rules would have said "Rook"
[reskin] inline on stamped rows: "Rook" -> "the rook" on 1 row — they were written before the name's form was settled
[reskin] inline form: "the rook" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 12 (8 + PB 2 + the sheet's best 2) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "should not kill them" reads like a lack to the words, and the call's list did not name it
[reskin] the clause is its own quote: limit "once_per_fight" stands on "should not kill them" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a bandit captain" -> has (mechanical), head [asked: attack] [askMechanic: command] | "for level 1 players" -> has (descriptive) | "should not kill them" -> has (mechanical) [asked: when_bloodied/once_per_fight/movement]
[reskin] open asks handed to the idea call: "should not kill them" (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The Scarred Rook barks a command at a bandit who can hear him, pointin" answers the GM's "should not kill them"
[reskin] idea unanchored: trait — "The Rook braces his weathered shield against the biggest swing aimed a" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 26 of 26 answered; not true of this body: seal, active-toll, shell-withdraw, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "should not kill them", so role and style do not filter the menu (legality still does); 14 template(s) offered
[reskin] signature idea (action): "The Scarred Rook barks a command at a bandit who can hear him, pointing out a hero who is Prone, Grappled, or otherwise unable to defend. That bandit can immediately use its reaction to move up to its speed toward the hero and make one melee attack against them." [action/save/movement] [family: mark] — menu: shield-bash, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, lure, pacify, escalating-dread, sensory-strike, thrown-burst-seed (+ shelf: delayed-brand, patient-defense, lay-on-hands, second-wind, aggro-curse, self-invisibility, rally, rampage, focus, feint-slip, charge-push, contagion, pounce, isolation, charge)
[reskin] lead by this seat's own clause: action — "command" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — command: herd, rally
[reskin] menu ordered by the idea's stamps: action — idea fires save/does movement; leading: herd (save/damage), rally (always/movement), slow-bolt (save/movement)
[reskin] classification handed to the fit call: shape=movement when=when_bloodied often=once_per_fight
[reskin] word match declined by the call: slow-bolt, disarm — the key word does not mean the mechanic here
[reskin] closest refused: action — "rally" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: grants an ally a Reaction to move up to its Speed and make one melee a)
[reskin] seat authored nothing: action — the call was asked to write an action for "The Scarred Rook barks a command at a bandit who can hear him, pointin" and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
[reskin] seat authored nothing: action — the call was asked to write an action for "The Scarred Rook barks a command at a bandit who can hear him, pointin" and wrote no row of that kind (it belongs in the description)
[reskin] seat refused twice: action — first: you wrote no row of the kind asked for (an action); second: it belongs in the description; the seat stays empty
[reskin] the declared ask's own template lands: action — the sheet's declared ask is "command", the seat that carries it ended with no row, and "herd" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] row kept the template's own name: action — "Driving Bellow" is herd's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] seat takes its clause: "Driving Bellow" is HANDED "should not kill them" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: herd -> Actions/"Driving Bellow" ("The idea is a commander ordering a bandit to move and make an attack — no offere [verb: command:idea]")
[reskin] signature idea (trait): "The Rook braces his weathered shield against the biggest swing aimed at him. When a creature he can see makes a melee attack roll against him and another of his bandits is within 5 feet, the Rook imposes disadvantage on that attack as he deflects it into his ally's guard." [trait/always/defense] [family: sentinel] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (always/defense): bloodied-fury, shielded-mind, undead-fortitude; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), shielded-mind (always/defense), undead-fortitude (always/defense)
[reskin] classification handed to the fit call: shape=movement when=when_bloodied often=once_per_fight
[reskin] word match declined by the call: blood-frenzy, bloodied-fury, undead-fortitude — the key word does not mean the mechanic here
[reskin] closest refused: trait — "pack-tactics" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: imposes Disadvantage on an attack roll aimed at the creature itself wh)
[reskin] seat answered, but: the call said "The Rook braces his weathered shield against the biggest swing aimed at him. When a creature he can see makes a melee at" is carried by "Deflecting Guard", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("imposes Disadvantage on an attack roll aimed at the creature itself wh") and wrote a trait instead: "Deflecting Guard" -> Reactions. *Trigger:* A creature the rook can see makes a melee attack roll against it while an ally of the rook is within 5 feet o
[reskin] authored row numbers: "Deflecting Guard" — the call declared 1 number(s) promised
[reskin] free signature row: "Deflecting Guard" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Deflecting Guard" is HANDED "should not kill them" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Deflecting Guard" ("The Rook braces his weathered shield against the biggest swing aimed at him. When a creature he can see makes a melee attack roll against him and another of his [authored: the catalog held no shape for it]")
[reskin] repair: 2 clause(s) with no row — "for level 1 players", "should not kill them"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced []
[reskin] condition relation: "Tuned to the Novice" — the call reads its condition as self, so no condition is recorded against it
[reskin] repaired sheet: 0 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Rusted Blade = longsword
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Guard's own type stands
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Guard's weapon is thrown)
[reskin] print canon attack: "Rusted Blade" -> "Spear" — the Guard's own row
[reskin] save follows the effect: Actions/"Driving Bellow" Wisdom -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a fighter fights with a longsword, not the Guard's
[reskin] free-row budget by card size: CR 1 sits in band 0-2, where print runs 1-4 rows (p20-p90, Multiattack excluded); this card already carries 4 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] typed row kept over the budget: Reactions/"Deflecting Guard" stays — it was written for the typed clause "should not kill them", and the budget limits only rows the engine invents
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Deflecting Guard" [no template]
[reskin] 2024 caps: "Deflecting Guard" — a condition or game term shipped lowercase
[reskin] asked but unanswered: "should not kill them" asked for when_bloodied/once_per_fight and no row binds the clause
[reskin] lint fixed: prone-vocab — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] sheet lint: stock-template-name: Actions/Driving Bellow: is the stock name of the "herd" template
[reskin] lint: prone-vocab: Traits/Tuned to the Novice: "falls/knocked Prone" is 2014 phrasing — 2024 writes "has the Prone condition" | stock-template-name: Actions/Driving Bellow: is the stock name of the "herd" template
[reskin] audit sees the ask: 2 row(s) shown with the clause they were written for
[reskin] element expressed: Deflecting Guard carries "a weathered shield and rusted blade he parries with" — "The rook braces its weathered shield and deflects the blow into its ally's guard"
[reskin] audit: [Tuned to the Novice: The trigger depends on the ch…t Points by a level 1 player character's attack"), Tuned to the Novice: A flat subtraction of 6 from …d12) less damage until the end of its next turn"), Driving Bellow: A 'Bellow' is a shout, but the rid…f its Speed in a direction of the rook's choice"), Deflecting Guard: This was written to satisfy the …out: "imposing Disadvantage on that attack roll"), Driving Bellow: The forced movement is presented a…f its Speed in a direction of the rook's choice"), Tuned to the Novice: This was written for the 'sho…stead drops to 1 Hit Point and is knocked Prone")]
[reskin] audit rename blocked — "Shoving Roar" promises a push or a knockdown that "Driving Bellow" does not deliver
[reskin] audit defect: Traits/"Tuned to the Novice" [model-written] high untrackable — The trigger depends on the character's level, a fact the statblock never gives the GM and which has no in-world tell; the GM must know every attacker's level to adjudicate it. — Rephrase the trigger so it keys to something observable on the sheet or in play rather than the attacker's level. (about: "When the rook is reduced to 0 Hit Points by a level 1 player character's attack")
[reskin] audit defect: Traits/"Tuned to the Novice" [model-written] high other — A flat subtraction of 6 from a roll-based damage value is not a resolvable adjustment — 2d8+1 cannot be reduced by a variable die, and no floor is stated, so the GM cannot compute the Longsword's actual damage during that window. — Replace the subtraction with a concrete alternate damage expression or a condition the GM can apply directly. (about: "deals 6 (1d12) less damage until the end of its next turn")
[reskin] audit defect: Reactions/"Deflecting Guard" [model-written] high undelivered — This was written to satisfy the 'should not kill them' ask, but it resolves entirely before the attack roll, so it blocks nothing when it is actually needed; against a hit it changes nothing and the damage lands as normal. — Make the reaction reduce or absorb an incoming hit instead of granting Disadvantage before the roll — e.g., apply the defensive benefit after the attack roll hits or reduce the damage. (about: "imposing Disadvantage on that attack roll")
[reskin] audit defect: Actions/"Driving Bellow" [catalog] medium other — The forced movement is presented as an immediate repositioning, but no escape, save, or counterplay is written for the movement itself beyond the initial save — and the 'safest available route' leaves the GM parsing route safety mid-turn. — State the movement as ordinary forced movement to a stated destination/range so it resolves without route adjudication. (about: "the target immediately moves up to half its Speed in a direction of the rook's choice")
[reskin] audit defect: Traits/"Tuned to the Novice" [model-written] medium undelivered — This was written for the 'should not kill them' ask, but it only fires when a level 1 player lands the final blow on their own turn; the retaliation that would actually be dangerous to the player — the rook's next turn — is left fully intact, so the fiction of the mercy rule is not delivered where it matters. — Attach the mercy effect to the rook's subsequent action economy or attacks so the survival actually gives the player a safe window. (about: "the rook instead drops to 1 Hit Point and is knocked Prone")
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Riposte" carries "bandit captain" which is not a whole clause — the seat surgery cut it; resolved to cl_zjtww3
[reskin] [gap] grants an ally a Reaction to move up to its Speed and make one melee attack against a designated target — "The Scarred Rook barks a command at a bandit who can hear him, pointing out a hero who is Prone, Grappled, or otherwise unable to defend. That bandit can immediately use its reaction to move up to its speed toward the hero and make one melee attack against them." — Scarred Rook [seat: action [action/save/movement]] (closest offered: rally) [effect: movement] [menu: herd rally slow-bolt disarm shield-bash terror-pulse push-prone curse-debt reveal wind-up lure pacify escalating-dread sensory-strike thrown-burst-seed] [same-cell unoffered: reel hook-drag pull-through aggro-curse obstacle-pull] [same-seat rejected: swallow:deny-type trample:role leap:role thrown-burst:role gaze-single:role snare:role reel:role condition-payoff:role execute:role seal:body-verdict hook-drag:hold-shape active-toll:body-verdict pull-through:role random-ray:cr-range ground-burst:cr-range spew:role burrow-ambush:cr-range obstacle-pull:hold-shape snare-bolt:role drain:role exploiter:needs-imposed blighted-ground:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] done: "Scarred Rook" — donor defender-1, CR 1
[reskin] ledger: 1 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 1 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 18-scarred-rook.json — 1 recorded answer(s) unused
```

---

## 19-warden-halvek

## 19. Warden Halvek — CR 7

**Input:** `name: Warden Halvek | Runs the prison under the lighthouse. Used to be a paladin, broke his oath when he let a prisoner drown. Now he's bound to the place and can't leave. Fights with a ring of keys and a lantern that shows the truth. If the lantern goes out he gets weaker. The players need to get past him, not necessarily kill him.`
**Donor:** defender-5 -> CR 7
**Signature:** library

### Block
```
Warden Halvek

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

Bound. Halvek is bound to the lighthouse prison. It can't willingly move more than 120 feet from the lighthouse prison, and it always knows the direction and distance to the lighthouse prison.

Aura of Authority. While in a 10-foot Emanation originating from Halvek, Halvek and its allies have Advantage on attack rolls and saving throws, provided Halvek doesn't have the Incapacitated condition.

Actions

Multiattack. Halvek makes two Longsword attacks.

Longsword. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Speak Your Name. Wisdom Saving Throw: DC 14, each creature in a 30-foot Cone. Failure: The target has the Frightened condition until the end of its next turn.

Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet that Halvek can see. Failure: 24 (7d6) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

Reactions

Parry. Trigger: Halvek is hit by a melee attack roll while holding a weapon. Response: Halvek adds 3 to its AC against that attack, possibly causing it to miss.

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
!! [ENRICHMENT] Failed to enrich Scarred Rook: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 18 taken name(s) the recording carried
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("Runs the prison under the lighthouse") | defender: key "paladin" (class verb)
[concept] name: "Warden Halvek" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: warden→style ✓ ("bound to the place and can't leave") | warpriest→style ✓ ("used to be a paladin, fights with keys a")
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/grave mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Warden Halvek"
[concept] mechanics: none claimed
[concept] signature elements: the truth-showing lantern that weakens when doused [object] | rings of iron keys used as a flail and a ledger of names [object] | bound to the prison, cannot leave it [behavior]
[concept] identity: Halvek fights as a man who has made a fortress of his own guilt: he plants himself in the cell corridor with his lantern raised, ringing his keys to make the truth too loud to ignore, and punishes anyone who tries to slip past him rather than answer him. Every round he stays put, forcing intruders into his narrow field of light where his key-ring lays bare what they are hiding — but if the lantern is doused or smothered he grows slow, uncertain, and desperate, the oath-broken paladin reduced to a man swinging iron in the dark. He does not flee and does not chase — he holds the line until the light or his body fails, and he would rather die at his post than let a single soul walk out past him unanswered.
[concept] lore: Once a paladin of the harbor watch, Halvek let a drowned prisoner sink in the lighthouse cistern rather than break protocol, and the sea took his oath and bound him to the cell-block below the lamp; he now wants only to keep his ledger of names — everyone who passes him has to be counted and confessed first.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 7
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +7
[reskin] donor: defender-5 -> CR 7
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] seats: action <- "bound to the prison, cannot leave it" | trait <- "the truth-showing lantern that weakens when doused"
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "Warden Halvek — Runs the prison under the lighthouse. Used to be a paladin, broke his oath when he let a prisoner drown. Now he's bound to the place and can't leave. Fights with a ring of keys and a lantern that shows the truth. If the lantern goes out he gets weaker. The players need to get past him, not necessarily kill him." heads on the Gladiator — print's rows ride along; the seat stays
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] proper noun: "Warden Halvek" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Halvek" — the call's own answer (person), built from the name
[reskin] inline form: "Halvek" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "Now he's bound to the place and can't leave" reads like a lack to the words, and the call's list did not name it
[reskin] the clause is its own quote: trigger "at_will" stands on "Fights with a ring of keys" — the call offered no separate quote and needs none (1b)
[reskin] lacks not claimed: "not necessarily kill him" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "Warden Halvek — Runs the prison under the lighthouse" -> has (descriptive), head | "Used to be a paladin" -> has (descriptive) | "broke his oath when he let a prisoner drown" -> has (descriptive) | "Now he's bound to the place and can't leave" -> has (mechanical) [asked: condition] [askMechanic: harden] | "Fights with a ring of keys" -> has (mechanical) [asked: at_will/attack] | "a lantern that shows the truth" -> has (mechanical) [asked: save_single] [askMechanic: relic] | "If the lantern goes out he gets weaker" -> has (mechanical) [asked: buff_self] [askMechanic: relic] | "The players need to get past him" -> has (mechanical) [asked: buff_self] [askMechanic: relic] | "not necessarily kill him" -> has (descriptive)
[reskin] open asks handed to the idea call: "Now he's bound to the place and can't leave" [harden] · "Fights with a ring of keys" · "a lantern that shows the truth" [relic] · "If the lantern goes out he gets weaker" [relic] · "The players need to get past him" [relic] (3 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "Halvek levels his lantern and demands each creature within its light s" answers the GM's "a lantern that shows the truth"
[reskin] idea unanchored: trait — "While Halvek's lantern is lit, his oath-bound authority manifests as a" names none of the 5 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 27 of 27 answered; not true of this body: seal, shield-bash, random-ray, herd, shell-withdraw, rally, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, sealed-body, warded-mending, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "a lantern that shows the truth", so role and style do not filter the menu (legality still does); 18 template(s) offered
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Halvek levels his lantern and demands each creature within its light speak its true name. A creature that fails its save is Frightened and can't willingly move away from Halvek until the end of its next turn; on a success it is immune to this effect until the end of its next turn." [action/save/condition] [family: mark] — menu: throw-retrieve, active-toll, ground-burst, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up, thrown-burst, zone, execute, lure, pacify, escalating-dread, sensory-strike, thrown-burst-seed (+ shelf: delayed-brand, patient-defense, lay-on-hands, second-wind, aggro-curse, self-invisibility, rampage, focus, feint-slip, riposte, answering-strike, stunning-strike, charge-push, pounce, isolation, bolt-restrain, bolt-drag, bolt-mark, charge)
[reskin] lead by this seat's own clause: action — "harden" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: terror-pulse (save/condition), push-prone (save/condition), reveal (save/condition)
[reskin] keys would have bound: action — reveal, execute, lure, sensory-strike, active-toll, curse-debt, aggro-curse (lantern, kill, ring, oath)
[reskin] classification handed to the fit call: shape=condition
[reskin] word match declined by the call: terror-pulse, lure, pacify, escalating-dread, sensory-strike, slow-bolt — the key word does not mean the mechanic here
[reskin] closest refused: action — "zone" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a lasting bind on where the warden himself can go — none of the offere)
[reskin] authored row answers the GM: action — "Speak Your Name" was written for "a lantern that shows the truth", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a lasting bind on where the warden himself can go — none of the offere") and wrote an action instead: "Speak Your Name" -> Actions. *Wisdom Saving Throw*: DC 14, each creature in a 30-foot Cone. *Failure:* The target has the Frightened condition until 
[reskin] authored row numbers: "Speak Your Name" — the call declared (unanswered) number(s) promised
[reskin] seat takes its clause: "Speak Your Name" is HANDED "Now he's bound to the place and can't leave" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Speak Your Name" ("Halvek levels his lantern and demands each creature within its light speak its true name. A creature that fails its save is Frightened and can't willingly move  [authored: the catalog held no shape for it]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's 15 at CR 7, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "While Halvek's lantern is lit, his oath-bound authority manifests as an emanation of stark light. A creature that starts its turn in the light and is hiding, invisible, or disguised must make a Charisma saving throw or its true form or presence is revealed until the start of its next turn." [trait/always/condition] [family: zone] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, marking-light, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, evasion
[reskin] lead by this seat's own clause: trait — "relic" from the clause this seat serves, not the sheet's "none"
[reskin] declared mechanic leads the menu: trait — relic: relic-object
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: relic-object (always/defense), phobia (always/condition), berserk (always/condition)
[reskin] keys would have bound: trait — bound (bound to, can't leave)
[reskin] classification handed to the fit call: shape=condition
[reskin] word match declined by the call: relic-object, marking-light, relentless-pursuit, death-restoration — the key word does not mean the mechanic here
[reskin] row kept the template's own name: trait — "Bound" is bound's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] signature template (trait): bound -> Traits/"Bound" ("Halvek is oath-bound to the prison and cannot leave it; the anchor is the place  [verb: bound to:concept, can't leave:concept]")
[reskin] repair: 2 clause(s) with no row — "The players need to get past him", "not necessarily kill him"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced ["description:The players need to get past him","description:not necessarily kill him"]
[reskin] clause answered in prose: "The players need to get past him" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] clause answered in prose: "not necessarily kill him" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Key-Ring = none; Lantern Bludgeon = club
[reskin] weapon declared: "Lantern Bludgeon" is a club — the call's own answer
[reskin] weapon dice keep the budget's die: "Lantern Bludgeon" is a club (d4), but 9d4 passes print's largest d4 attack row (3d4) — "26 (5d8 + 4)" stands
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Gladiator's own type stands
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Key-Ring" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Lantern Bludgeon leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon row priced: Shield Bash — dice 9 → 24
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] print canon row: Reactions/Parry — the Gladiator's own
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] multiattack replacement clause: It can replace one attack with a use of Speak Your Name.
[reskin] free-row budget by card size: CR 7 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] row binds its clause: "Bound" answers "Now he's bound to the place and can't leave" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] asked but unanswered: "Fights with a ring of keys" asked for at_will and no row binds the clause
[reskin] lint fixed: second-person — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] sheet lint: uncited-replacement-row: Actions/Speak Your Name: a replacement clause was written for this row and the finished Multiattack does not name it — "Halvek makes two Longsword attacks. It can replace one attack with a use of Speak its Name"
[reskin] lint: undefined-attack-ref: Actions/Multiattack references a use of "Speak its Name", which is not defined anywhere in the statblock — rewrite the reference to name a real entry | uncited-replacement-row: Actions/Speak Your Name: a replacement clause was written for this row and the finished Multiattack does not name it — "Halvek makes two Longsword attacks. It can replace one attack with a use of Speak its Name"
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
audit finding below confidence gate: Aura of Authority Halvek is a solo warden with no allies on the sheet, so half the aura's benefit is unusable and the trait reduces to a self-buff the GM must still remember each roll.
[reskin] audit: [Speak Your Name: The lantern that 'shows the truth…htened condition until the end of its next turn"), Speak Your Name: The name promises that Halvek spe… name is the mechanic. (about: "Speak Your Name"), Bound: The bound creature has no written consequen…e more than 120 feet from the lighthouse prison")]
[reskin] audit rename blocked — "Speak Your Name" -> "Lantern of Truth" would drop the GM's own words "speak", "name"
[reskin] audit defect: Actions/"Speak Your Name" [model-written] high undelivered — The lantern that 'shows the truth' is asked to power a fear gaze, so the signature action delivers dread rather than revealed truth and never touches the lantern-to-weakening link. — Rework the action so its payload reveals something true about the target (its name, its crime, or its fear) in a way that ties to the lantern's truth-showing, rather than a plain Frightened rider. (about: "The target has the Frightened condition until the end of its next turn")
[reskin] audit defect: Traits/"Bound" [catalog] medium open_ended — The bound creature has no written consequence or state change for being forced or teleported beyond the limit, leaving the GM to improvise what the binding does when the players drag, shove, or banish it. — State what happens the moment Halvek is moved beyond the bound distance (e.g., Halvek is pulled back, gains a condition, or the movement fails). (about: "It can't willingly move more than 120 feet from the lighthouse prison")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Aura of Authority" carries "paladin" which is not a whole clause — the seat surgery cut it; resolved to cl_fvts3t
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] replacement clause re-read: "Speak its Name" is not on this sheet, so the clause leaves entirely — print's commonest Multiattack carries none
[reskin] sheet lint re-read at ship: 1 finding(s) stored before the audit and the derivation, 1 on the finished sheet
[reskin] done: "Warden Halvek" — donor defender-5, CR 7
[reskin] ledger: 5 ask(s) — 2 answered (1 by receipt or anchor, 1 handed), 0 mismatch, 3 open (3 never-written)
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 19-warden-halvek.json — 1 recorded answer(s) unused
```

---

## 20-lady-in-the-reeds

## 20. Lady in the Reeds — CR 5

**Input:** `name: The Lady in the Reeds | River spirit that takes the shape of whoever the victim misses most. Lures people into the water. Not evil exactly, just lonely. Can't leave the river. Should be a social encounter first and a fight only if it goes wrong. Charm, drowning, turns to mist when hurt.`
**Donor:** lurker-5-phantom -> CR 5
**Signature:** library

### Block
```
Lady in the Reeds
Medium fey, neutral
Armor Class

12

Hit Points: 

97 (13d8 + 39)

Speed: 

5 ft., fly 60 ft. (hover), swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


6 (-2)

	

16 (+3)

	

16 (+3)

	

15 (+2)

	

18 (+4)

	

18 (+4)

Skills: 

Stealth +6

Saving Throws: 

DEX +6

Damage Resistances: 

bludgeoning, piercing, slashing

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

Common

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Most-Missed Face.When a creature that can see or hear the lady fails its saving throw against Beloved's Face, until the end of the lady's next turn, the lady's face and form shift to resemble whoever that creature misses most, and the creature has disadvantage on attack rolls against the lady.
Incorporeal Movement.The lady can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
Sunlight Sensitivity.While in sunlight, the lady has disadvantage on ability checks and attack rolls.

Actions
Multiattack: The lady makes two Reaching Reed attacks. It can replace one attack with a use of Beloved's Face.
Reaching Reed: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) slashing damage.
Beloved's Face: One creature within 60 feet that can see or hear her must make a DC 15 Wisdom saving throw. On a failed save, the target is charmed until the end of the lady's next turn, and while charmed this way, it must move toward the lady by the safest available route on its turn.
```

### Trace
```
!! [ENRICHMENT] Failed to enrich Warden Halvek: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 19 taken name(s) the recording carried
[path] homebrew — title Lady — "River spirit that takes the shape of whoever the victim misses most. Lures peopl" (call)
[route] lurker-phantom type=Fey mechanics=teleport — casts: the call reads no worked magic here | hold_shape: contain on the GM's own words "Lures people into the water" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-phantom: ✓ ("turns to mist when hurt") | lurker-phantom: no line key in the words — the model's read of its quote
[concept] name: "Lady in the Reeds" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=lurker type=Fey typeFrom=the route call themes=fey/beguiling mind=sapient style=phantom energy=Psychic mix=both identity=✓ lore=✓
[concept] name: provided "Lady in the Reeds"
[concept] mechanics: teleport
[concept] signature elements: wearing the shape of whoever the victim misses most [behavior] | luring victims into the water to drown [behavior] | dissolving into mist when hurt [body]
[concept] identity: The Lady in the Reeds opens not with violence but with a face — she wears the shape of whoever the victim misses most and calls them toward the water with that beloved voice, and she never strikes first. Every round of a real fight she tries to take a mind rather than a life, drawing the charmed into the current to drown, and when she is bloodied she dissolves into reeds-mist and drifts out of reach, because she cannot bear to die and cannot bear to be alone.
[concept] lore: She was a river's grief given a body — a spirit of the reeds that could never leave the water and so learned to call the living into it, keeping the shape of anyone a drowning heart has ever ached for.
[reskin] mind tier: INT 12 -> 15 — the call read this creature as capable at CR 5
[reskin] mind tier: WIS 14 -> 18 — the call read this creature as formidable at CR 5
[reskin] mind tier: CHA 15 -> 18 — the call read this creature as formidable at CR 5
[reskin] donor: lurker-5-phantom -> CR 5
[reskin] seats: action <- "wearing the shape of whoever the victim misses most" | trait <- "dissolving into mist when hurt"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the lady" — the call answered "the lady in the reeds" (kind), which the name does not support
[reskin] the sheet's declared ask: charm — the route call's one answer for the whole concept
[reskin] lacks asked: "Can't leave the river"
[reskin] the clause is its own quote: trigger "at_will" stands on "Lures people into the water" — the call offered no separate quote and needs none (1b)
[reskin] lacks not claimed: "Not evil exactly" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "The Lady in the Reeds — River spirit" -> has (descriptive), head | "takes the shape of whoever the victim misses most" -> has (mechanical) [asked: condition] [askMechanic: disguise] | "Lures people into the water" -> has (mechanical) [asked: at_will/condition] [askMechanic: charm] | "Not evil exactly" -> has (descriptive) | "just lonely" -> has (descriptive) | "Can't leave the river" -> LACKS (mechanical) [asked: condition] [askMechanic: disguise] | "Should be a social encounter first" -> has (descriptive) | "a fight only if it goes wrong" -> has (descriptive) | "Charm" -> has (mechanical) [asked: condition] [askMechanic: charm] | "drowning" -> has (mechanical) [asked: condition] [askMechanic: snare] | "turns to mist when hurt" -> has (mechanical) [asked: on_being_hit/movement] [askMechanic: teleport]
[reskin] open asks handed to the idea call: "takes the shape of whoever the victim misses most" [disguise] · "Lures people into the water" [charm] · "Charm" [charm] · "drowning" [snare] · "turns to mist when hurt" [teleport] (5 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The lady fixes her gaze on one creature that can see her and shows it " answers the GM's "takes the shape of whoever the victim misses most"
[reskin] idea unanchored: trait — "When the lady is first reduced below half her hit points, her body los" names none of the 5 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 36 of 36 answered; not true of this body: seal, active-toll, random-ray, spew, snare-bolt, drain, zone-seed, blighted-ground, shell-withdraw, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "takes the shape of whoever the victim misses most", so role and style do not filter the menu (legality still does); 19 template(s) offered
[reskin] signature idea (action): "The lady fixes her gaze on one creature that can see her and shows it not her own face but the face of someone it has lost — the person it misses most. That target must succeed on a Wisdom saving throw or be Charmed by her, and while Charmed it sees the beloved face whenever it looks at her and is unwilling to leave her side or let her come to harm; on a successful save, the target is immune to th" [action/save/condition] [family: mark] — menu: swallow, wail, lure, pull-through, ground-burst, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, zone, execute, disarm, push-prone, herd, thrown-burst-seed, curse-debt, reveal, wind-up (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, phase-slip, rampage, lay-on-hands, second-wind, aggro-curse, riposte, answering-strike, affliction, contagion, stunning-strike, charge-push, pounce, isolation, charge)
[reskin] lead by this seat's own clause: action — "disguise" from the clause this seat serves, not the sheet's "charm"
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: swallow (save/condition), lure (save/condition), pacify (save/condition)
[reskin] keys would have bound: action — lure, pull-through, zone, disarm (lure, drown, mist, take)
[reskin] classification handed to the fit call: mechanic=teleport shape=condition
[reskin] word match declined by the call: swallow, pacify, escalating-dread, terror-pulse, sensory-strike, push-prone, reveal, pull-through, ground-burst, slow-bolt, execute, disarm, herd, thrown-burst-seed, curse-debt, wind-up, zone, wail — the key word does not mean the mechanic here
[reskin] value check: "Beloved's Face" EV 9.4 vs floor 8.8 (one attack of 2) — worth the trade
[reskin] signature template: lure -> Actions/"Beloved's Face" ("That target must succeed on a Wisdom saving throw or be Charmed by her, and whil [verb: lure:concept]")
[reskin] keys spent by the action: lure
[reskin] signature idea (trait): "When the lady is first reduced below half her hit points, her body loses its hold on its shape and dissolves into river-mist — she immediately becomes heavily obscured, can squeeze through any gap, and has advantage on Dexterity (Stealth) checks until she regains hit points or takes a long rest; the mist is her, and she drifts out of reach." [trait/always/defense] — menu: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, mimicry, truth-aura, fear-aura, assassinate, blurred-form, berserk, guarded-stance
[reskin] lead by this seat's own clause: trait — "teleport" from the clause this seat serves, not the sheet's "charm"
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] keys would have bound: trait — terrain-walk, bloodied-fury, bound (reeds, when hurt, can't leave)
[reskin] classification handed to the fit call: mechanic=teleport shape=condition
[reskin] word match declined by the call: bloodied-fury, death-restoration, shielded-mind, evasion, undead-fortitude, mimicry, guarded-stance, phobia, terrain-walk, blood-frenzy, pack-tactics, relentless-pursuit, bound, assassinate, berserk, truth-aura, fear-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "blurred-form" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: when first Bloodied it becomes heavily obscured and can squeeze throug)
[reskin] seat answered, but: the call said "When the lady is first reduced below half her hit points, her body loses its hold on its shape and dissolves into river-" is carried by "River-Mist Unbinding", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "When the lady is first reduced below half her hit points, her body los" and wrote no row of that kind (refused: "River-Mist Unbinding" — heal names no amount or no limit) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("River-Mist Unbinding" — heal names no amount or no limit); asking once more with the reason
[reskin] seat answered, but: the call said "When the lady is first reduced below half her hit points, her body loses its hold on its shape and dissolves into river-" is carried by "River-Mist Unbinding", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "When the lady is first reduced below half her hit points, her body los" and wrote no row of that kind (refused: "River-Mist Unbinding" — heal names no amount or no limit) (it belongs in the description)
[reskin] seat refused twice: trait — first: "River-Mist Unbinding" — heal names no amount or no limit; second: "River-Mist Unbinding" — heal names no amount or no limit; the seat stays empty
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key terrain-walk, bloodied-fury, bound, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "terrain-walk" is keyed by the GM's reeds and was on the call's menu, which the call read as a collision, not the mechanic; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "When the lady is first reduced below half her hit points, her body loses its hold on its shape and dissolves into river-mist — she immediately becomes heavily obscured, can squeeze through any gap, and has advantage on Dexterity (Stealth) checks until she regains hit points or takes a long rest; the mist is her, and she drifts out of reach." [trait/always/defense] — the model found no template that holds it (offered: bloodied-fury, death-restoration, shielded-mind, evasion, undead-fortitude, mimicry, blurred-form, guarded-stance, phobia, terrain-walk, blood-frenzy, pack-tactics, relentless-pursuit, bound, assassinate, berserk, truth-aura, fear-aura)
[reskin] concept-first trait skipped: bloodied-fury — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] concept-first trait skipped: bound — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] repair: 2 clause(s) with no row — "takes the shape of whoever the victim misses most", "drowning"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced ["description:drowning"]
[reskin] clause answered in prose: "drowning" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] condition relation: "Most-Missed Face" — the call reads its condition as none, so no condition is recorded against it
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 1 clause(s) unplaced
[reskin] weapons answered: Reaching Reed = none
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Fey + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] name-canon stands down: the path answered homebrew on "River spirit that takes the shape of who" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Beloved's Face.
[reskin] free-row budget by card size: CR 5 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] row binds its clause: "Beloved's Face" answers "Lures people into the water" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "Lures people into the water" -> "Beloved's Face" — trigger at_will
[reskin] asked but unanswered: "turns to mist when hurt" asked for on_being_hit and no row binds the clause
[reskin] lint: 0 findings
audit finding below confidence gate: Beloved's Face The Charmed condition by itself does not stop the target from attacking the lady, yet Most-Missed Face assumes a failed save compels a reaction of disadvantage — the two rows describe different consequences of the same save without cross-reference.
[reskin] audit: [Most-Missed Face: The trait's trigger is a failed …s Disadvantage on attack rolls against the lady"), Beloved's Face: The compelled movement has no expl… lady by the safest available route on its turn")]
[reskin] audit defect: Traits/"Most-Missed Face" [model-written] medium untrackable — The trait's trigger is a failed save against Beloved's Face, but nothing in the block states what happens if the same creature fails again or fails on a different turn — the duration is keyed to 'the lady's next turn' with no reference point other than the save, leaving the GM to reconstruct which turn the save occurred in. — Anchor the duration to a concrete point in the turn order (e.g., the end of the affected creature's next turn) so the GM can track expiry from the condition's own clock. (about: "until the end of the lady's next turn, the lady's face and form shift to resemble whoever that creature misses most, and the creature has Disadvantage on attack rolls against the lady")
[reskin] audit defect: Actions/"Beloved's Face" [catalog] medium untrackable — The compelled movement has no explicit 'on each of its turns' clause tied to a single affected turn and no per-turn save or save-at-end, and 'safest available route' is undefined adjudication the GM must invent mid-combat. — Specify whom the route is safest per (the target's own judgment) and whether the compulsion repeats or ends after one movement, so the GM has a rule rather than a judgment call. (about: "it must move toward the lady by the safest available route on its turn")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] when first Bloodied it becomes heavily obscured and can squeeze through any gap, gaining Stealth Advantage until it rega — "When the lady is first reduced below half her hit points, her body loses its hold on its shape and dissolves into river-mist — she immediately becomes heavily obscured, can squeeze through any gap, and has advantage on Dexterity (Stealth) checks until she regains hit points or takes a long rest; the mist is her, and she drifts out of reach." — Lady in the Reeds [seat: trait [trait/always/defense]] (closest offered: blurred-form) [effect: defense] [menu: bloodied-fury death-restoration shielded-mind evasion undead-fortitude mimicry blurred-form guarded-stance phobia terrain-walk blood-frenzy pack-tactics relentless-pursuit bound assassinate berserk truth-aura fear-aura] [same-cell unoffered: false-appearance shell-withdraw uncanny-sense patient-defense sealed-body relic-object] [same-seat rejected: false-appearance:body-verdict adhesive:body-verdict spider-climb:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement marking-light:body-verdict sealed-body:role relic-object:body-verdict death-burst:body-verdict kill-denial:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] lack took nothing: "Can't leave the river" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
[reskin] done: "Lady in the Reeds" — donor lurker-5-phantom, CR 5
[reskin] ledger: 6 ask(s) — 2 answered (2 by receipt or anchor, 0 handed), 0 mismatch, 4 open (4 never-written)
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 20-lady-in-the-reeds.json — 1 recorded answer(s) unused
```

---

## 21-gorrak-splitjaw

## 21. Gorrak Splitjaw — CR 8

**Input:** `name: Gorrak Splitjaw | Gnoll warlord for my level 6 party's boss fight. Has a pet hyena that fights next to him. Uses a flail and a longbow. Gets a free bite when he drops someone. I want him to feel scary when he's low on health, like he fights harder.`
**Donor:** defender-5 -> CR 8
**Signature:** library

### Block
```
Gorrak Splitjaw

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

Languages Common, Abyssal

CR 8 (XP 3,900; PB +3)

Traits

Snarling Commands. While Bloodied, each of Gorrak's attacks deals an extra 14 (4d6) damage as he fights faster and wilder.

Actions

Multiattack. Gorrak makes two attacks, using Flail or Longbow or Free Bite in any combination. It can replace one attack with a use of Shield Bash.

Flail. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Gorrak's next turn.

Longbow. Ranged Attack Roll: +5, range 150/600 ft. 20 (4d8 + 2) Piercing damage, and the target's Speed is reduced by 10 feet until the start of Gorrak's next turn.

Free Bite. Melee Attack Roll: +8, reach 5 ft. 23 (4d8 + 5) Piercing damage.

Gathering Ruin (Recharge 5-6). Gorrak begins gathering destructive power, its whole frame tensing. At the end of its next turn, after it has moved, the power erupts. Dexterity Saving Throw: DC 16, each creature in a 20-foot Emanation originating from Gorrak at that moment. Failure: 32 (5d12) Piercing damage. Success: Half damage.

Shield Bash. Strength Saving Throw: DC 16, one creature within 5 feet that Gorrak can see. Failure: 27 (6d8) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

Reactions

Riposte. Trigger: A creature within 5 feet of Gorrak misses it with a melee attack roll. Response: Gorrak makes one Flail attack against that creature.

Parry. Trigger: Gorrak is hit by a melee attack roll while holding a weapon. Response: Gorrak adds 3 to its AC against that attack, possibly causing it to miss.

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
!! [ENRICHMENT] Failed to enrich Lady in the Reeds: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 20 taken name(s) the recording carried
[path] class_npc — class fighter — "warlord" (call)
[route] defender-leader type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: on the GM's own words "Uses a flail and a longbow" | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("Gnoll warlord") | skirmisher-archer: "longbow" is a noun (a title), not a verb — no override | defender-leader: key "warlord" (class noun)
[concept] name: "Gorrak Splitjaw" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=bestial/terror mind=sapient style=leader energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Gorrak Splitjaw"
[concept] mechanics: none claimed
[concept] signature elements: the killing bite on any foe he drops [behavior] | pet hyena fighting at his side [behavior] | flail and longbow warlord's kit [object]
[concept] identity: Gorrak opens the hunt at range, loosing longbow shafts to soften the pack's prey while his hyena circles wide and closes for the hamstring. Each round after, he wades in behind the flail and badgering bite, and any foe who falls to him is torn again before it can rise — the pack leader feeding on what he drops. Bleeding and cornered, he does not break; his voice cracks into snarling commands and his blows come faster and wilder, fighting hardest with the most to lose.
[concept] lore: A gnoll warlord who rose by eating the chieftains who raised him, Gorrak now ranges the borderlands with his last true kin — the hyena that licks his wounds — collecting tribute in flesh for whichever master sends him out to hunt.
[reskin] [path] class body: the fighter stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] print canon route: the Gladiator's body outranks the leader seat — no verb in the words names it; the plain defender line
[reskin] print canon array: STR 20, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +8
[reskin] donor: defender-5 -> CR 8
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] seats: action <- "the killing bite on any foe he drops" | trait <- "flail and longbow warlord's kit"
[reskin] [path] decides: class_npc on the Gladiator · class fighter (the matcher would have said homebrew)
[reskin] print canon: "Gorrak Splitjaw — Gnoll warlord for my level 6 party's boss fight. Has a pet hyena that fights next to him. Uses a flail and a longbow. Gets a free bite when he drops someone. I want him to feel scary when he's low on health, like he fights harder." heads on the Gladiator — print's rows ride along; the seat stays
[reskin] named parts: Flail (slot), Longbow (slot, ranged), Free Bite (clone) — the user's words, the engine's numbers
[reskin] named parts landed: 3 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] named weapon leads: "Flail" takes 27 (5d8 + 5); "Longbow" takes 23 (4d8 + 5)
[reskin] features: Sap on Flail, Slow on Longbow — the feature table, no call
[reskin] class kit: fighter — "warlord": Riposte (riposte)
[reskin] proper noun: "Gorrak Splitjaw" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Gorrak" — the call's own answer (person), built from the name
[reskin] inline form: "Gorrak" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] the sheet's declared ask: escalate — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "Uses a flail and a longbow" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Gorrak Splitjaw — Gnoll warlord for my level 6 party's boss fight" -> has (descriptive), head | "Has a pet hyena that fights next to him" -> has (mechanical) [asked: when_bloodied/buff_self] [askMechanic: escalate] | "Uses a flail and a longbow" -> has (mechanical) [asked: at_will/attack] | "Gets a free bite when he drops someone" -> has (mechanical) [asked: on_hit/attack] | "I want him to feel scary when he's low on health" -> has (mechanical) [asked: when_bloodied/condition] [askMechanic: fear] | "like he fights harder" -> has (descriptive)
[reskin] open asks handed to the idea call: "Has a pet hyena that fights next to him" [escalate] · "I want him to feel scary when he's low on health" [fear] (2 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "When Gorrak reduces a creature to 0 hit points with an attack, he imme" answers the GM's "Has a pet hyena that fights next to him"
[reskin] idea unanchored: trait — "While Bloodied, Gorrak's voice cracks into snarling commands, and each" names none of the 2 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 27 of 27 answered; not true of this body: seal, shield-bash, active-toll, random-ray, herd, shell-withdraw, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "Has a pet hyena that fights next to him", so role and style do not filter the menu (legality still does); 10 template(s) offered
[reskin] signature idea (action): "When Gorrak reduces a creature to 0 hit points with an attack, he immediately makes one Free Bite attack against that creature before it falls, tearing the kill from it." [rider/on_hit/damage] [family: kill-growth] — menu: stunning-strike, charge-push, affliction, contagion, pounce, isolation, bolt-restrain, bolt-drag, bolt-mark, charge (+ shelf: throw-retrieve, ground-burst, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up, thrown-burst, execute, lure, pacify, escalating-dread, sensory-strike, thrown-burst-seed, delayed-brand, patient-defense, lay-on-hands, second-wind, aggro-curse, self-invisibility, rally, rampage, focus, feint-slip, snap-shot)
[reskin] composed candidates: none action — the kill-growth family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — escalate: isolation, execute
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does damage; leading: isolation (on_hit/damage), execute (save/damage), charge (on_hit/damage)
[reskin] classification handed to the fit call: shape=buff_self when=when_bloodied
[reskin] word match declined by the call: execute, isolation, charge, stunning-strike, charge-push, affliction, contagion, bolt-restrain, bolt-drag, bolt-mark — the key word does not mean the mechanic here
[reskin] closest refused: action — "pounce" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: grants the creature an extra attack or buff once it is bloodied)
[reskin] seat authored nothing: action — the call was asked to write an action for "When Gorrak reduces a creature to 0 hit points with an attack, he imme" and wrote no row of that kind (refused: "Cackling Consort" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: action — the first answer was refused ("Cackling Consort" — a trait is not a save — the save form takes stat, target and effect as fields and the eng); asking once more with the reason
[reskin] seat authored nothing: action — the call was asked to write an action for "When Gorrak reduces a creature to 0 hit points with an attack, he imme" and wrote no row of that kind (it belongs in the description)
[reskin] seat refused twice: action — first: "Cackling Consort" — a trait is not a save — the save form takes stat, target and effect a; second: it belongs in the description; the seat stays empty
[reskin] the declared ask's own template lands: action — the sheet's declared ask is "escalate", the seat that carries it ended with no row, and "wind-up" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] row kept the template's own name: action — "Gathering Ruin" is wind-up's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] free signature row: action — "wind-up" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "pet hyena fighting at his side" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Gathering Ruin (Recharge 5-6)" is HANDED "Has a pet hyena that fights next to him" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: wind-up -> Actions/"Gathering Ruin (Recharge 5-6)" ("The idea is a bonus bite upon dropping a foe, but the clause to answer is a bloo [shape fit, no verb match]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's 16 at CR 8, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "While Bloodied, Gorrak's voice cracks into snarling commands, and each of his attacks deals an extra 1d8 damage as he fights faster and wilder." [trait/always/damage] [family: kill-growth] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, kill-denial, evasion, assassinate
[reskin] composed candidates: none trait — the kill-growth family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — escalate: bloodied-fury, blood-frenzy, berserk, assassinate
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: bloodied-fury (always/defense), blood-frenzy (always/damage), berserk (always/condition)
[reskin] keys would have bound: trait — bloodied-fury (fights harder)
[reskin] classification handed to the fit call: shape=buff_self when=when_bloodied
[reskin] word match declined by the call: bloodied-fury, blood-frenzy, berserk, pack-tactics — the key word does not mean the mechanic here
[reskin] closest refused: trait — "pack-tactics" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a second creature on the battlefield that fights alongside and enables)
[reskin] seat answered, but: the call said "While Bloodied, Gorrak's voice cracks into snarling commands, and each of his attacks deals an extra 1d8 damage as he fi" is carried by "Snarling Commands", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("a second creature on the battlefield that fights alongside and enables") and wrote a trait instead: "Snarling Commands" -> Traits. While Bloodied, each of Gorrak's attacks deals an extra 14 (4d6) damage as he fights faster and wilder.
[reskin] authored row numbers: "Snarling Commands" — the call declared 1 number(s) promised
[reskin] free signature row: "Snarling Commands" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Snarling Commands" is HANDED "Has a pet hyena that fights next to him" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Snarling Commands" ("While Bloodied, Gorrak's voice cracks into snarling commands, and each of his attacks deals an extra 1d8 damage as he fights faster and wilder. [authored: the catalog held no shape for it]")
[reskin] weapons answered: Flail = flail; Longbow = longbow
[reskin] weapon table: "Longbow" rolls Dexterity — +8 → +5
[reskin] weapon table: "Longbow" damage off Dexterity — 23 (4d8 + 5) → 20 (4d8 + 2)
[reskin] weapon table: "Longbow" — a launcher, never thrown, range 150/600
[reskin] languages by mind: "Abyssal, Gnoll" -> "Common, Abyssal" (sapient)
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Gladiator's own type stands
[reskin] print canon alignment: Neutral Evil -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Abyssal" -> "Common, Abyssal" — the Gladiator's plus the concept's Abyssal
[reskin] print canon row priced: Shield Bash — dice 9 → 27
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] print canon row: Reactions/Parry — the Gladiator's own
[reskin] class weapon: "longbow" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] free-row budget by card size: CR 8 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row order: "Gathering Ruin" [clause, wind-up] > "Snarling Commands" [clause, no template] — a receipt row is never displaced by one without, and within a rank a templated row is never displaced by one without
[reskin] typed row kept over the budget: Actions/"Gathering Ruin" stays — it was written for the typed clause "Has a pet hyena that fights next to him", and the budget limits only rows the engine invents
[reskin] typed row kept over the budget: Traits/"Snarling Commands" stays — it was written for the typed clause "Has a pet hyena that fights next to him", and the budget limits only rows the engine invents
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 2 kept (budget 0) — "Gathering Ruin" [action/save/damage], "Snarling Commands" [no template]
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 14" -> "Passive Perception 14")
[reskin] asked but unanswered: "Has a pet hyena that fights next to him" asked for when_bloodied and no row binds the clause
[reskin] ask vs row ok: "Uses a flail and a longbow" -> "Flail" — trigger at_will
[reskin] ask vs row MISMATCH: "Gets a free bite when he drops someone" -> "Free Bite" — trigger: asked on_hit, row reads at_will
[reskin] asked but unanswered: "I want him to feel scary when he's low on health" asked for when_bloodied and no row binds the clause
[reskin] sheet lint: stock-template-name: Actions/Gathering Ruin: is the stock name of the "wind-up" template
[reskin] lint: stock-template-name: Actions/Gathering Ruin: is the stock name of the "wind-up" template
[reskin] audit sees the ask: 2 row(s) shown with the clause they were written for
[reskin] audit: [Snarling Commands: A trait named for commanding th…14 (4d6) damage as he fights faster and wilder."), Gathering Ruin (Recharge 5-6): The charge state is…ext turn, after it has moved, the power erupts."), Snarling Commands: The name and fiction describe a…n obey. (about: "as he fights faster and wilder")]
[reskin] audit rename blocked — "Snarling Commands" -> "Bloodied Fury" would drop the GM's own words "snarling", "commands"
[reskin] audit defect: Actions/"Gathering Ruin" [model-written] high untrackable — The charge state is never tied to an action cost or to the hyena ask it was written for, and 'after it has moved' implies a required movement the GM must remember across a whole round. — Make the charge an action that creates a trackable pending condition resolving at the start of Gorrak's next turn, and cut the 'after it has moved' requirement. (about: "Gorrak begins gathering destructive power, its whole frame tensing. At the end of its next turn, after it has moved, the power erupts.")
[reskin] audit defect: Traits/"Snarling Commands" [model-written] medium misnamed — The name and fiction describe a warlord issuing orders, but nothing in the text is a command, and 'faster and wilder' describes no speed or attacking change beyond flat damage. — Either rename to a rage/fury entry or add an actual command clause the hyena can obey. (about: "as he fights faster and wilder")
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Riposte" carries "warlord" which is not a whole clause — the seat surgery cut it; resolved to cl_qy24m3
[reskin] [gap] grants the creature an extra attack or buff once it is bloodied — "When Gorrak reduces a creature to 0 hit points with an attack, he immediately makes one Free Bite attack against that creature before it falls, tearing the kill from it." — Gorrak Splitjaw [seat: action [rider/on_hit/damage]] (closest offered: pounce) [effect: resource] [menu: isolation execute charge stunning-strike charge-push affliction contagion pounce bolt-restrain bolt-drag bolt-mark] [same-cell unoffered: none] [same-seat rejected: hook-rider:body-verdict life-drain:body-verdict snatch:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 2 expressed, 0 decoration, 2 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] multiattack re-read — "Longbow" joins the combination; "Gorrak makes two attacks, using Flail or Longbow in any combination. It can replace one at"
[reskin] multiattack re-read — "Free Bite" joins the combination; "Gorrak makes two attacks, using Flail or Longbow or Free Bite in any combination. It can r"
[reskin] done: "Gorrak Splitjaw" — donor defender-5, CR 8
[reskin] ledger: 4 ask(s) — 2 answered (1 by receipt or anchor, 1 handed), 1 mismatch, 1 open (1 never-written)
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 21-gorrak-splitjaw.json
```

---

## 22-scroll-fed-familiar

## 22. Scroll-Fed Familiar — CR 6

**Input:** `My players are going into a wizard's abandoned tower and I need the thing that's been living in the library. It was the wizard's familiar, a cat, but it's been eating spell scrolls for 50 years. Now it's the size of a horse and casts random spells when it attacks. Teleports short distances. Hates being looked at.`
**Donor:** skirmisher-3 -> CR 6
**Signature:** library

### Block
```
Scroll-Fed Familiar

Small Beast, Unaligned

AC 16
Initiative +4 (14)

HP 105 (30d6)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
3
-4
-4
INT
3
-4
-4
MOD
SAVE
DEX
18
+4
+7
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
7
-2
-2

Skills Perception +4, Stealth +7

Senses darkvision 60 ft.; Passive Perception 14

Languages None

CR 6 (XP 2,300; PB +3)

Traits

Library-Dweller. While the scroll-fed familiar is in a library, archive, or other place of stored books and scrolls, the scroll-fed familiar can hide without an action and gains a bonus to Dexterity (Stealth) checks made to conceal itself among shelves and stacks.

Jumper. The scroll-fed familiar's jump distance is determined using its Dexterity rather than its Strength.

Actions

Multiattack. The scroll-fed familiar makes two Scratch attacks.

Scratch. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Fifty-Year Purging (Recharge 5-6). The scroll-fed familiar begins gathering destructive power, its whole frame tensing. At the end of its next turn, after it has moved, the power erupts. Dexterity Saving Throw: DC 15, each creature in a 20-foot Emanation originating from the scroll-fed familiar at that moment. Failure: 24 (7d6) Force damage. Success: Half damage.

Reactions

Scripted Echo. Trigger: The scroll-fed familiar teleports, leaving a flickering afterimage of spell-script behind. Response—Wisdom Saving Throw: DC 15, each creature within 10 feet of the space it left. Failure: The target has the Frightened condition until the end of its next turn.

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
!! [ENRICHMENT] Failed to enrich Gorrak Splitjaw: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 21 taken name(s) the recording carried
[path] twist — Cat (is) — "a cat" (call)
[route] caster (artillery) type=Monstrosity mechanics=teleport — casts: on the GM's own words "casts random spells when it attacks" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher: ✓ ("Teleports short distances. Hates being l") | skirmisher -> caster: the concept's VERB outranks the noun (key "casts", class verb) | caster: key "casts" (class verb)
[concept] hints: teleport→mechanics ✓ ("Teleports short distances")
[concept] resolve: archetype=caster type=Monstrosity typeFrom=the route call themes=uncanny/arcane mind=sapient style=— energy=Force mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: horse-sized scroll-gorged cat [body] | random spells bursting off when it attacks [behavior] | short teleports and loathing of being looked at [behavior]
[concept] identity: The Scroll-Fed Familiar opens by teleporting out of sight-lines, hating every eye on it, then lashes with horse-sized claws while half-digested scroll-magic bursts out of its hide in random blasts. Round after round it flickers a short hop across the shelves to break line of sight and rake whatever gets close, reciting fragments of spell-words it doesn't understand. Cornered, it fights to the death in a panicked, yowling fury — it is not brave, it is trapped.
[concept] lore: A conjurer's familiar that learned to read by nibbling his scrolls, it has eaten fifty years of the library's magic and swallowed its own escape; it now guards the stacks out of habit and hunger, wanting only to be left unlooked-at.
[reskin] the concept outranks the alias: the Cat is a Beast and the concept reads Monstrosity — the words RESEMBLE it, they do not name it, so the alias match stands down. Print canon is decided separately and may still run on this sheet
[reskin] print canon route: the Cat is not a caster first and keys DEX 15 over STR 3 — it casts no spells — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 3, DEX 18, CON 10, INT 3, WIS 12, CHA 7 — the Cat's, DEX fitted to +7
[reskin] donor: skirmisher-3 -> CR 6
[reskin] seats: action <- "random spells bursting off when it attacks" | trait <- "horse-sized scroll-gorged cat"
[reskin] [path] decides: twist on the Cat (the matcher would have said homebrew)
[reskin] print canon: "My players are going into a wizard's abandoned tower and I need the thing that's been living in the library. It was the wizard's familiar, a cat, but it's been eating spell scrolls for 50 years. Now it's the size of a horse and casts random spells when it attacks. Teleports short distances. Hates being looked at." heads on the Cat — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the scroll-fed familiar" — the call's own answer (kind), built from the name
[reskin] inline form: "the scroll-fed familiar" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: teleport — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "My players are going into a wizard's abandoned tower" -> has (descriptive), head | "I need the thing that's been living in the library" -> has (descriptive) | "It was the wizard's familiar" -> has (descriptive) | "a cat" -> has (descriptive) | "but it's been eating spell scrolls for 50 years" -> has (mechanical) [asked: save_single] [askMechanic: burst] | "Now it's the size of a horse" -> has (descriptive) | "casts random spells when it attacks" -> has (mechanical) [asked: on_hit/save_single] [askMechanic: burst] | "Teleports short distances" -> has (mechanical) [asked: movement] [askMechanic: teleport] | "Hates being looked at" -> has (mechanical) [asked: save_single] [askMechanic: fear]
[reskin] open asks handed to the idea call: "but it's been eating spell scrolls for 50 years" [burst] · "casts random spells when it attacks" [burst] · "Teleports short distances" [teleport] · "Hates being looked at" [fear] (4 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The scroll-fed familiar's body shudders and half-digested scroll magic" answers the GM's "casts random spells when it attacks"
[reskin] idea unanchored: trait — "Whenever the scroll-fed familiar teleports, it leaves behind a momenta" names none of the 4 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: snare, shield-bash, random-ray, snare-bolt, coating, heated-body, false-appearance, absorption, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "casts random spells when it attacks", so role and style do not filter the menu (legality still does); 18 template(s) offered
[reskin] signature idea (action): "The scroll-fed familiar's body shudders and half-digested scroll magic erupts in a burst of force around it. Each creature it chooses within the burst must make a Dexterity saving throw, taking Force damage on a failure and half as much on a success; the familiar can choose to have the burst also randomly duplicate the effect of a scroll it has eaten, chosen by the GM or rolled from a table." [action/save/damage] [family: nova] — menu: trample, thrown-burst, gaze-single, lure, ground-burst, spew, sensory-strike, disarm, thrown-burst-seed, execute, pacify, escalating-dread, terror-pulse, slow-bolt, push-prone, curse-debt, reveal, wind-up (+ shelf: leap, delayed-brand, rampage, blink, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, phase-slip, lay-on-hands, riposte, answering-strike, affliction, contagion, stunning-strike, charge-push, pounce, isolation, charge)
[reskin] lead by this seat's own clause: action — "burst" from the clause this seat serves, not the sheet's "teleport"
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — burst: thrown-burst, ground-burst, thrown-burst-seed
[reskin] menu ordered by the idea's stamps: action — idea fires save/does damage; leading: thrown-burst (save/damage), ground-burst (save/damage), thrown-burst-seed (save/damage)
[reskin] keys would have bound: action — gaze-single, blink, phase-slip (look, teleport)
[reskin] classification handed to the fit call: mechanic=teleport shape=save_single
[reskin] word match declined by the call: thrown-burst, trample, execute, curse-debt, gaze-single, lure, sensory-strike, disarm, pacify, escalating-dread, terror-pulse, slow-bolt, push-prone, reveal, aggro-curse — the key word does not mean the mechanic here
[reskin] free signature row: action — "wind-up" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "random spells bursting off when it attacks" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Fifty-Year Purging (Recharge 5-6)" is HANDED "but it's been eating spell scrolls for 50 years" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: wind-up -> Actions/"Fifty-Year Purging (Recharge 5-6)" ("The scroll-fed familiar's body shudders and half-digested scroll magic erupts in [shape fit, no verb match]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Whenever the scroll-fed familiar teleports, it leaves behind a momentary afterimage of itself composed of flickering spell-script. This afterimage is not a creature and does not block movement, but until the end of the familiar's next turn, any creature that looks at it must succeed on a Wisdom saving throw or be Frightened of the familiar." [trait/always/condition] [family: mark] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, gaze-aura, assassinate
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), berserk (always/condition), spider-climb (always/movement)
[reskin] keys would have bound: trait — gaze-aura (looked at, being looked at)
[reskin] classification handed to the fit call: mechanic=teleport shape=save_single
[reskin] word match declined by the call: fear-aura, gaze-aura, phobia — the key word does not mean the mechanic here
[reskin] closest refused: trait — "gaze-aura" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: triggers when the creature teleports, leaving a fleeting afterimage th)
[reskin] seat answered, but: the call said "Whenever the scroll-fed familiar teleports, it leaves behind a momentary afterimage of itself composed of flickering spe" is carried by "Scripted Echo", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Whenever the scroll-fed familiar teleports, it leaves behind a momenta" and wrote no row of that kind (refused: "Scripted Echo" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Scripted Echo" — a trait is not a save — the save form takes stat, target and effect as fields and the engine); asking once more with the reason
[reskin] seat answered, but: the call said "Whenever the scroll-fed familiar teleports, it leaves behind a momentary afterimage of itself composed of flickering spe" is carried by "Scripted Echo", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("triggers when the creature teleports, leaving a fleeting afterimage th") and wrote a trait instead: "Scripted Echo" -> Reactions. *Trigger:* The scroll-fed familiar teleports, leaving a flickering afterimage of spell-script behind. *Response—Wisdom S
[reskin] authored row numbers: "Scripted Echo" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: trait — "Scripted Echo" after ""Scripted Echo" — a trait is not a save — the save form takes stat, target and e"
[reskin] free signature row: "Scripted Echo" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Scripted Echo" is HANDED "but it's been eating spell scrolls for 50 years" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Scripted Echo" ("Whenever the scroll-fed familiar teleports, it leaves behind a momentary afterimage of itself composed of flickering spell-script. This afterimage is not a crea [authored: the catalog held no shape for it]")
[reskin] repair: 2 clause(s) with no row — "I need the thing that's been living in the library", "a cat"; one targeted call with the sheet as context
[reskin] repair answer: attacks 1, saves 0, traits 1, reactions 0, answered [], unplaced []
[reskin] condition relation: "Library-Dweller" — the call reads its condition as none, so no condition is recorded against it
[reskin] repaired sheet: 2 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Claws = none
[reskin] print canon size: Large -> Small — the Cat's
[reskin] print canon type: Monstrosity -> Beast — the Cat's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon speed: Climb -> 40 ft. — the Cat's own
[reskin] rider folded: "Claws" keeps its budget — the chassis's rider half (7) folds into the base; the Cat pays no damage rider of its own
[reskin] print canon attack: "Claws" -> "Scratch" — the Cat's own row
[reskin] print canon rows: Library Cat's Bite leave — the Cat has one melee row (Scratch), and Multiattack reads print's
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Jumper — "My players are going into a wizard's abandoned tower and I need the thing that's been living in the library. It was the wizard's familiar, a cat, but it's been eating spell scrolls for 50 years. Now it's the size of a horse and casts random spells when it attacks. Teleports short distances. Hates being looked at." is the Cat (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Cat's
[reskin] print canon: chassis row leaves — Traits/"Feline Flicker" is the seat's, not the Cat's
[reskin] typed row kept over the budget: Actions/"Fifty-Year Purging" stays — it was written for the typed clause "but it's been eating spell scrolls for 50 years", and the budget limits only rows the engine invents
[reskin] typed row kept over the budget: Reactions/"Scripted Echo" stays — it was written for the typed clause "but it's been eating spell scrolls for 50 years", and the budget limits only rows the engine invents
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 2 kept (budget 1) — "Fifty-Year Purging" [action/save/damage], "Scripted Echo" [no template]
[reskin] asked but unanswered: "casts random spells when it attacks" asked for on_hit and no row binds the clause
[reskin] lint fixed: success-no-effect — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 2 row(s) shown with the clause they were written for
[reskin] element expressed: Scripted Echo carries "short teleports and loathing of being looked at" — "wisdom Saving Throw"
[reskin] audit: [Scripted Echo: The trigger presupposes a teleport …a flickering afterimage of spell-script behind."), Library-Dweller: The bonus amount is never stated,…made to conceal itself among shelves and stacks"), Fifty-Year Purging (Recharge 5-6): The name and th…ext turn, after it has moved, the power erupts."), Fifty-Year Purging (Recharge 5-6): The eruption po…ext turn, after it has moved, the power erupts.")]
[reskin] audit type correction refused: Beast stands — print's Cat owns it
[reskin] audit defect: Reactions/"Scripted Echo" [model-written] high dead_reference — The trigger presupposes a teleport that no entry on the sheet provides, so the reaction can never legally fire. — Either give the familiar a teleport action (e.g. a short-range bonus action teleport) or rewrite the trigger to an event the block actually produces. (about: "The scroll-fed familiar teleports, leaving a flickering afterimage of spell-script behind.")
[reskin] audit defect: Traits/"Library-Dweller" [model-written] high open_ended — The bonus amount is never stated, so a GM cannot adjudicate the check. — State the numeric bonus (or a flat clause such as advantage). (about: "gains a bonus to Dexterity (Stealth) checks made to conceal itself among shelves and stacks")
[reskin] audit defect: Actions/"Fifty-Year Purging" [model-written] medium undelivered — The name and the GM's brief promise released spell energy from eaten scrolls, but the text delivers a generic delayed Force burst with no spell-scroll or purging content. — Make the eruption express the consumed scrolls — e.g. describe spell-script/flash and have the damage type or wording carry the purge. (about: "The scroll-fed familiar begins gathering destructive power, its whole frame tensing. At the end of its next turn, after it has moved, the power erupts.")
[reskin] audit defect: Actions/"Fifty-Year Purging" [model-written] medium untrackable — The eruption point is defined as the familiar's space at end of next turn; the creature must move over a full round of combat, and 'after it has moved' forces the GM to track whether a move occurred, so the GM cannot resolve the row in time. — Anchor the area to a fixed, observable moment (start/end of its next turn) without a movement precondition. (about: "At the end of its next turn, after it has moved, the power erupts.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 2 expressed, 0 decoration, 2 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Scroll-Fed Familiar" — donor skirmisher-3, CR 6
[reskin] ledger: 4 ask(s) — 1 answered (0 by receipt or anchor, 1 handed), 0 mismatch, 3 open (3 never-written)
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 22-scroll-fed-familiar.json
```

---

## 23-captain-iress-vane

## 23. Captain Iress Vane — CR 9

**Input:** `name: Captain Iress Vane | Airship captain, half-elf, ex-navy. Rapier and pistol. She's a duelist who uses the terrain, swings on ropes, kicks barrels, that kind of thing. Has a crew but I'll stat them separately. AC 17, around 110 HP, should get 3 attacks.`
**Donor:** defender-8-leader -> CR 9 (invented — no printed peer)
**Signature:** dropped

### Block
```
Captain Iress Vane
Medium humanoid, neutral
Armor Class

17 (splint)

Hit Points: 

110 (15d8 + 45)

Speed: 

30 ft., swim 30 ft., climb 30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

14 (+2)

	

16 (+3)

	

15 (+2)

	

20 (+5)

	

18 (+4)

Skills: 

Athletics +7, Persuasion +8

Saving Throws: 

CON +7, CHA +8

Senses: 

passive Perception 15

Languages: 

Common, Elvish

Challenge

9 (5,000 XP)

Proficiency Bonus:

+4

Read the Guard.Once per turn, when Iress hits a creature that is prone, is below her, or is flanked by one of her allies, the hit is a critical hit, and Iress can move up to half her speed as part of the attack without provoking opportunity attacks.
Aura of Authority.While in a 10-foot radius originating from Iress, Iress and its allies have advantage on attack rolls and saving throws, provided Iress is not incapacitated.

Actions
Multiattack: Iress makes three attacks, using Rapier or Kick.
Rapier: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage, and Iress has advantage on its next attack roll against the target before the end of its next turn.
Kick: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage, and the target must succeed on a DC 17 Strength saving throw or be knocked prone.
```

### Trace
```
!! [ENRICHMENT] Failed to enrich Scroll-Fed Familiar: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 22 taken name(s) the recording carried
[path] refused: class receipt "Rapier and pistol. She's a duelist who uses the terrain, swings on ropes, kicks barrels, that kind of thing." names no class and is not in the head clause ("Captain Iress Vane Airship captain")
[path] homebrew — title Captain — "Airship captain, half-elf, ex-navy. Rapier and pistol. She's a duelist who uses " (call)
[route] defender-leader type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: on the GM's own words "Rapier and pistol" | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("Has a crew but I'll stat them separately") | brute-charger: the call read "barrels" as not meaning that mechanic here — no override | defender: the call read "duelist" as not meaning that mechanic here — no override | defender-leader stands: every key that would override it was read as a figure of speech | defender-leader: key "captain" (class noun)
[concept] name: "Captain Iress Vane" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/aerial mind=sapient style=leader energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Captain Iress Vane"
[concept] mechanics: thrown-weapon
[concept] signature elements: rapier and pistol duelist [object] | swinging on ropes and using terrain [behavior] | disciplined ex-navy captain [aura]
[concept] identity: Iress Vane opens by taking the high ground — a rigging line, a raised deck, a barrel — and firing her pistol to pin the party before her rapier enters the fight; every round after she uses the ship itself as a weapon, kicking loose cargo, swinging on ropes, and repositioning so her three attacks (pistol and two rapier thrusts) land from unexpected angles. She's a disciplined ex-navy duelist who treats the battlefield like a quarterdeck: she doesn't flee when bloodied — she retreats to favorable terrain, calls for her crew, and fights to the death with the same cold, calculating patience she'd use to board an enemy vessel.
[concept] lore: A half-elf who left the navy after a court-martial she calls politics, Iress Vane now commands the sky-ship Barrier Gale, taking contracts that let her duel the officers who ruined her and raid the ports that once cheered her. She wants a fleet of her own and the admiral's sash she believes was stolen from her.
[reskin] mind tier held: CHA stays 18 against "formidable" — the card's save DC 16 derives from CHA 18 and from no physical score
[reskin] mind tier: INT 12 -> 15 — the call read this creature as capable at CR 9
[reskin] mind tier: WIS 13 -> 20 — the call read this creature as formidable at CR 9
[reskin] donor: defender-8-leader -> CR 9 (invented — no printed peer)
[reskin] seats: action <- "swinging on ropes and using terrain" | trait <- "rapier and pistol duelist"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] named parts: Rapier (slot), Kick (slot, Prone) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] features: Vex on Rapier — the feature table, no call
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] proper noun: "Captain Iress Vane" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Iress" — the call's own answer (person), built from the name; the rules would have said "the captain"
[reskin] inline on stamped rows: "the captain" -> "Iress" on 1 row — they were written before the name's form was settled
[reskin] inline form: "Iress" — the model's own reading of the name
[reskin] the sheet's declared ask: command — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Captain Iress Vane — Airship captain" -> has (descriptive), head | "half-elf" -> has (descriptive) | "ex-navy" -> has (descriptive) | "Rapier and pistol" -> has (mechanical) [asked: attack] | "She's a duelist who uses the terrain" -> has (descriptive) | "swings on ropes" -> has (mechanical) [asked: movement] [askMechanic: climb] | "kicks barrels" -> has (mechanical) [asked: save_single] [askMechanic: shove] | "kind of thing" -> has (descriptive) | "Has a crew" -> has (mechanical) | "I'll stat them separately" -> has (descriptive) | "AC 17" -> has (header) | "around 110 HP" -> has (header) | "should get 3 attacks" -> has (header)
[reskin] extraction: 1 of 13 model clauses quote nothing the user typed and leave the record ("AC 17")
[reskin] open asks handed to the idea call: "swings on ropes" [climb] · "Has a crew" (6 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "Iress hurls her blade or pistol-shot into an anchor line and swings ac" answers the GM's "swings on ropes"
[reskin] idea unanchored: trait — "Iress reads a foe's guard like a quarterdeck chart: once per turn when" names none of the 2 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 28 of 28 answered; not true of this body: seal, shield-bash, active-toll, random-ray, herd, shell-withdraw, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "swings on ropes", so role and style do not filter the menu (legality still does); 18 template(s) offered
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "Iress hurls her blade or pistol-shot into an anchor line and swings across the deck in a sweeping arc, moving up to her Speed without provoking Opportunity Attacks; each creature of her choice she passes within reach of must succeed on a Dexterity saving throw or be knocked Prone as she cuts past it." [action/save/condition] [family: sentinel] — menu: throw-retrieve, ground-burst, terror-pulse, slow-bolt, disarm, curse-debt, reveal, wind-up, exploiter, thrown-burst, condition-payoff, zone, execute, lure, pacify, escalating-dread, sensory-strike, thrown-burst-seed (+ shelf: delayed-brand, patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, self-invisibility, rally, rampage, focus, feint-slip, riposte, answering-strike, stunning-strike, charge-push, affliction, contagion, pounce, isolation, charge)
[reskin] lead by this seat's own clause: action — "climb" from the clause this seat serves, not the sheet's "command"
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: terror-pulse (save/condition), reveal (save/condition), exploiter (save/condition)
[reskin] keys would have bound: action — riposte (rapier, duelist)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=attack
[reskin] word match declined by the call: thrown-burst, thrown-burst-seed, throw-retrieve, wind-up — the key word does not mean the mechanic here
[reskin] closest refused: action — "ground-burst" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: moves the creature up to its Speed without provoking Opportunity Attac)
[reskin] seat authoring refused: action — the authored row re-imposes Prone, which this sheet's own attack row already applies; that fiction belongs in the attack's rider and the nearest template stands in
[reskin] seat asked again: action — the first answer was refused (the row re-imposes a condition this sheet's own attack already applies); asking once more with the reason
[reskin] seat authored nothing: action — the call was asked to write an action for "Iress hurls her blade or pistol-shot into an anchor line and swings ac" and wrote no row of that kind
[reskin] seat refused twice: action — first: the row re-imposes a condition this sheet's own attack already applies; second: you wrote no row of the kind asked for (an action); the seat stays empty
[reskin] decline reason: action — the call answered none and names it "no_fit" — the GM's words key riposte, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: action — "riposte" is keyed by the GM's rapier+duelist and was on the call's menu, which the call read as no fit; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: action — "Iress hurls her blade or pistol-shot into an anchor line and swings across the deck in a sweeping arc, moving up to her Speed without provoking Opportunity Attacks; each creature of her choice she passes within reach of must succeed on a Dexterity saving throw or be knocked Prone as she cuts past it." [action/save/condition] — the model found no template that holds it (offered: terror-pulse, reveal, exploiter, lure, pacify, escalating-dread, sensory-strike, ground-burst, slow-bolt, disarm, curse-debt, wind-up, thrown-burst, condition-payoff, execute, thrown-burst-seed, aggro-curse, zone, throw-retrieve)
[reskin] signature seat empty — no template held the idea and the seat wrote no row; nothing stands in (owner, 2026-11-23)
[reskin] signature idea (trait): "Iress reads a foe's guard like a quarterdeck chart: once per turn when she hits a creature that has the Prone condition, stands below her, or is flanked by one of her allies, her strike is a Critical Hit and she repositions freely as part of the attack." [trait/always/damage] [family: payoff] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] declared mechanic leads the menu: trait — command: pack-tactics
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: pack-tactics (always/damage), blood-frenzy (always/damage), assassinate (always/damage)
[reskin] keys would have bound: trait — guarded-stance (duelist)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=attack
[reskin] word match declined by the call: pack-tactics, assassinate, blood-frenzy, guarded-stance — the key word does not mean the mechanic here
[reskin] closest refused: trait — "pack-tactics" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: turns a hit on an off-balance, prone, or flanked target into a critica)
[reskin] seat answered, but: the call said "once per turn when she hits a creature that has the Prone condition, stands below her, or is flanked by one of her allie" is carried by "Read the Guard", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("turns a hit on an off-balance, prone, or flanked target into a critica") and wrote a trait instead: "Read the Guard" -> Traits. Once per turn, when Iress hits a creature that has the Prone condition, is below her, or is flanked by one of her allies
[reskin] authored row numbers: "Read the Guard" — the call declared 1 number(s) promised
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Read the Guard" ("Iress reads a foe's guard like a quarterdeck chart: once per turn when she hits a creature that has the Prone condition, stands below her, or is flanked by one  [authored: the catalog held no shape for it]")
[reskin] repair: 2 clause(s) with no row — "swings on ropes", "Has a crew"; one targeted call with the sheet as context
[reskin] authored trait refused: "Rope-Swing Boarding" — the call counts 1 number(s) the row promises and only 0 are written — a promised amount, area or bonus with no number cannot be run; the clause folds to description
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced ["description:swings on ropes"]
[reskin] clause answered in prose: "swings on ropes" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] condition relation: "Ship's Crew" — the call reads its condition as none, so no condition is recorded against it
[reskin] repaired sheet: 2 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 1 clause(s) unplaced
[reskin] weapons answered: Rapier = rapier; Pistol = pistol; Rigging Line = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] name-canon stands down: the path answered homebrew on "Airship captain, half-elf, ex-navy. Rapi" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Read the Guard" [no template]
[reskin] lint actuator: dropped "Ship's Crew" — its only sentence minted "surprised"
[reskin] lint: 0 findings
[reskin] element expressed: Read the Guard carries "swinging on ropes and using terrain" — "Iress can move up to half her Speed as part of the attack without provoking Oppo"
[reskin] audit: [Read the Guard: The critical-hit trigger depends o…s below her, or is flanked by one of her allies"), Read the Guard: Upgrading any qualifying hit to a …to-critting. (about: "the hit is a Critical Hit"), Kick: Prone imposed by an attack with no size or s…up. (about: "the target has the Prone condition"), Rapier: The pronoun 'its' is ambiguous and the ref…inst the target before the end of its next turn"), Aura of Authority: The aura refers to Iress with a…y. (about: "Iress and its allies have Advantage")]
[reskin] audit defect: Traits/"Read the Guard" [model-written] medium untrackable — The critical-hit trigger depends on positional states (below her, flanked) the statblock never defines an altitude or facing for, so a GM cannot check the condition at the table. — Rewrite the trigger around a state the sheet tracks, such as a target Prone, Grappled, or one she has Advantage against, and drop the altitude/flanking clauses. (about: "is below her, or is flanked by one of her allies")
[reskin] audit defect: Traits/"Read the Guard" [model-written] low misnamed — Upgrading any qualifying hit to a Critical Hit on a plain attack with no resource cost makes the trait a free always-on damage spike whose fiction (terrain and rope play) the text never expresses. — Reframe so the trait grants a tactical benefit matching the terrain-duelist fantasy rather than auto-critting. (about: "the hit is a Critical Hit")
[reskin] audit defect: Actions/"Kick" [model-written] low open_ended — Prone imposed by an attack with no size or save restriction has no written counterplay clause in the entry, and the GM is left without a documented exit for large or sturdy targets. — Add a save or size limit so the state has a documented path out beyond standing up. (about: "the target has the Prone condition")
[reskin] audit defect: Actions/"Rapier" [model-written] high wording — The pronoun 'its' is ambiguous and the referent reads as the target rather than Iress, garbling who gains the Advantage. — Replace 'its' with a clear subject so the clause unambiguously attributes the Advantage. (about: "Iress has Advantage on its next attack roll against the target before the end of its next turn")
[reskin] audit defect: Traits/"Aura of Authority" [print] medium wording — The aura refers to Iress with a non-Humanoid pronoun ('its'), an internal referent inconsistency in a trait that grants the captain her own buff. — Use a pronoun that fits the captain's stated identity. (about: "Iress and its allies have Advantage")
[reskin] clause unresolved: "Read the Guard" carries "Iress reads a foe's guard like a quarterdeck chart: once", which matches no clause on the sheet — no coverage credit by id
[reskin] [gap] moves the creature up to its Speed without provoking Opportunity Attacks while sweeping creatures it passes into Prone — "Iress hurls her blade or pistol-shot into an anchor line and swings across the deck in a sweeping arc, moving up to her Speed without provoking Opportunity Attacks; each creature of her choice she passes within reach of must succeed on a Dexterity saving throw or be knocked Prone as she cuts past it." — Captain Iress Vane [seat: action [action/save/condition]] (closest offered: ground-burst) [effect: movement] [menu: terror-pulse reveal exploiter lure pacify escalating-dread sensory-strike ground-burst slow-bolt disarm curse-debt wind-up thrown-burst condition-payoff execute thrown-burst-seed aggro-curse zone throw-retrieve] [same-cell unoffered: swallow gaze-single snare seal shield-bash random-ray snare-bolt push-prone] [same-seat rejected: swallow:deny-type trample:role leap:role gaze-single:role snare:role reel:role seal:body-verdict shield-bash:body-verdict hook-drag:hold-shape active-toll:body-verdict pull-through:role random-ray:body-verdict spew:role burrow-ambush:movement obstacle-pull:hold-shape snare-bolt:role herd:body-verdict drain:role blighted-ground:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] user-set: AC 16 -> 17 — a declared field, not a derivation (Resolution 3)
[reskin] user-set: HP 157 -> 110 — a declared field (Resolution 3)
[reskin] done: "Captain Iress Vane" — donor defender-8-leader, CR 9
[reskin] ledger: 4 ask(s) — 2 answered (2 by receipt or anchor, 0 handed), 0 mismatch, 2 open (2 never-written)
[reskin] ledger facts: 3 typed fact(s) — 3 the sheet agrees with, 0 it does not
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 23-captain-iress-vane.json
```

---

## 24-rimewake-creeper

## 24. Rimewake Creeper — CR 7

**Input:** `ice elemental, cone of cold breath recharge 5-6, leaves difficult terrain, slows on hit`
**Donor:** dragon-2 -> CR 7
**Signature:** dropped

### Block
```
Rimewake Creeper

Large Elemental, Unaligned

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
3
-4
-4
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
10
+0
+0

Skills Perception +5, Stealth +4

Immunities Cold, Poison; Exhaustion, Poisoned

Senses blindsight 30 ft., darkvision 120 ft.; Passive Perception 15

Languages Draconic

CR 7 (XP 2,900; PB +3)

Traits

Black Rime Wake. When the creeper moves on its turn, the ground the creeper moves across becomes slick black rime: difficult terrain for other creatures until the start of its next turn, which the creeper ignores entirely.

Actions

Multiattack. The creeper makes two Slam attacks.

Slam. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Cold damage.

Cone of Cold (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Cold damage. Success: Half damage.

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
!! [ENRICHMENT] Failed to enrich Captain Iress Vane: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 23 taken name(s) the recording carried
[path] homebrew — "ice elemental, cone of cold breath recharge 5-6, leaves difficult terrain, slows" (call)
[route] dragon type=Elemental mechanics=breath — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | dragon: ✓ ("cone of cold breath recharge 5-6") | dragon: no line key in the words — the model's read of its quote
[concept] hints: breath→mechanics ✓ ("cone of cold breath recharge 5-6")
[concept] resolve: archetype=dragon type=Elemental typeFrom=the route call themes=elemental/breath mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: breath
[concept] signature elements: cone of killing cold breath [behavior] | body of jagged, freezing black ice [body] | a spreading field of rime and treacherous ground [aura]
[concept] identity: It announces itself with a rolling cone of killing cold, then wades into the frozen, treacherous ground it has made, striking with limbs of jagged black ice to drag down limbs that slow with every hit. It never retreats from its own fey — it flows back into the ice and snow to re-emerge a moment later, wearing foes down in a battle of attrition. Under pressure it becomes patient and deliberate, letting its slowing touch and shelf of rime do the work while it plies its breath again and again.
[concept] lore: Born in the deepest crevasses of the Frostfell, this elemental seeks to extend its killing winter outward from its glacier stronghold until the whole valley belongs to the cold.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] mind tier: INT 12 -> 3 — the call read this creature as feeble at CR 7
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 7
[reskin] mind tier: CHA 14 -> 10 — the call read this creature as ordinary at CR 7
[reskin] donor: dragon-2 -> CR 7
[reskin] seats: action <- "cone of killing cold breath" | trait <- "body of jagged, freezing black ice"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the creeper" — the call's own answer (kind), built from the name
[reskin] inline form: "the creeper" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: breath — the route call's one answer for the whole concept
[reskin] alignment by mind: "Neutral Evil" -> Unaligned — a Elemental the call reads as bestial at INT 3 holds no ethics (owner's ruling, 2026-11-15)
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: limit "at_will" stands on "leaves difficult terrain" — the call offered no separate quote and needs none (1b)
[reskin] asked field dropped: the call answered trigger "on_hit" for "slows on hit" but quoted "on hit", which is not the GM's own words
[reskin] the clause is its own quote: limit "at_will" stands on "slows on hit" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "ice elemental" -> has (descriptive), head | "cone of cold breath recharge 5-6" -> has (mechanical) [asked: recharge/save_area] [askMechanic: breath] | "leaves difficult terrain" -> has (mechanical) [asked: at_will] [askMechanic: zone] | "slows on hit" -> has (mechanical) [asked: at_will/condition]
[reskin] open asks handed to the idea call: "cone of cold breath recharge 5-6" [breath] · "leaves difficult terrain" [zone] · "slows on hit" (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The creeper exhales a gale of killing frost in its Cone of Cold; each " answers the GM's "cone of cold breath recharge 5-6"
[reskin] idea unanchored: trait — "The creeper leaves a wake of slick black rime; the ground it moves acr" names none of the 3 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 35 of 35 answered; not true of this body: gaze-single, snare, seal, shield-bash, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, life-drain
[reskin] menu: taste stands down — action answers the GM's "cone of cold breath recharge 5-6", so role and style do not filter the menu (legality still does); 3 template(s) offered
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, thrown-burst-seed, pacify, slow-bolt, sensory-strike, disarm, curse-debt, reveal, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip (the sheet cannot render them)
[reskin] signature idea (action): "The creeper exhales a gale of killing frost in its Cone of Cold; each creature that takes Cold damage from it is Rimebitten until the end of the creeper's next turn, its speed halved and its flesh sheathed in black rime. A Rimebitten creature that takes Cold damage again while already Rimebitten is Restrained as the ice locks its joints until it escapes." [action/save/condition] [family: zone] — menu: zone, execute, lure (+ shelf: rampage, lay-on-hands, second-wind, patient-defense, answering-strike, riposte, stunning-strike, charge-push, hook-rider, pounce, charge, isolation)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), execute (save/damage), zone (once_per_fight/condition)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area often=recharge
[reskin] word match declined by the call: lure, zone — the key word does not mean the mechanic here
[reskin] closest refused: action — "execute" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a save-area breath that deals damage and leaves the survivors slowed a)
[reskin] clause already answered: "cone of cold breath recharge 5-6" is carried by "Cone of Cold" — the seat read the sheet and declined to write a second row for it
[reskin] seat stands down: action — "cone of cold breath recharge 5-6" is already carried by a row on this sheet; no second row is written for it
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The creeper exhales a gale of killing frost in its Cone of Cold; each creature that takes Cold damage from it is Rimebitten until the end of the creeper's next turn, its speed halved and its flesh sheathed in black rime. A Rimebitten creature that takes Cold damage again while already Rimebitten is Restrained as the ice locks its joints until it escapes." [action/save/condition] — the model found no template that holds it (offered: lure, execute, zone)
[reskin] signature idea (trait): "The creeper leaves a wake of slick black rime; the ground it moves across on its turn becomes difficult terrain for other creatures until the start of its next turn, and it ignores that terrain entirely." [trait/always/movement] [family: zone] — menu: phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, sealed-body, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), relentless-pursuit (always/movement), bound (always/movement)
[reskin] keys would have bound: trait — terrain-walk (ice)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area often=recharge
[reskin] word match declined by the call: terrain-walk, composed:zone:terrain, energy-aura, relentless-pursuit — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:terrain" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: trail of difficult terrain laid behind the creature that it ignores, p)
[reskin] seat answered, but: the call said "The creeper leaves a wake of slick black rime; the ground it moves across on its turn becomes difficult terrain for othe" is carried by "Black Rime Wake", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("trail of difficult terrain laid behind the creature that it ignores, p") and wrote a trait instead: "Black Rime Wake" -> Traits. When the creeper moves on its turn, the ground the creeper moves across becomes slick black rime: difficult terrain for 
[reskin] authored row numbers: "Black Rime Wake" — the call declared 0 number(s) promised
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Black Rime Wake" ("The creeper leaves a wake of slick black rime; the ground it moves across on its turn becomes difficult terrain for other creatures until the start of its next  [authored: the catalog held no shape for it]")
[reskin] repair: 1 clause(s) with no row — "slows on hit"; one targeted call with the sheet as context
[reskin] authored trait refused: "Slam" — "Slam" is not an attack on this sheet — name one of: (none); the clause folds to description
[reskin] authored trait refused: "Rime-Clogged Limbs" — "Slam" is not an attack on this sheet — name one of: (none); the clause folds to description
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced []
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Slam = none; Cone of Cold = none; Numbslow Touch = none
[reskin] chassis nova: "Cone of Cold (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] defenses by material: an ice body is vulnerable to Fire and never resists, absorbs, or ignores it (named by the call's own material field) — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] element immunity: Cold (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Elemental -> Cold, Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "ice elemental, cone of cold breath recha" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Black Rime Wake" [no template]
[reskin] ask vs row ok: "cone of cold breath recharge 5-6" -> "Cone of Cold" — limit recharge
[reskin] asked but unanswered: "leaves difficult terrain" asked for at_will and no row binds the clause
[reskin] asked but unanswered: "slows on hit" asked for at_will and no row binds the clause
[reskin] lint: spell-name-collision: "Cone of Cold" is an SRD spell name on a non-spell entry — rename it
[reskin] element expressed: Black Rime Wake carries "a spreading field of rime and treacherous ground" — "the ground the creeper moves across becomes slick black rime: difficult terrain "
[reskin] audit: [Slam: The GM asked for the slam to slow on hit, bu…tually slows. (about: "17 (3d8 + 4) Cold damage"), Black Rime Wake: The difficult terrain is authored…ably. (about: "until the start of its next turn")]
[reskin] audit defect: Actions/"Slam" [catalog] high undelivered — The GM asked for the slam to slow on hit, but the row deals plain Cold damage with no movement reduction, so the requested slowing payload is entirely absent. — Add a rider to the hit that reduces the target's Speed until the end of its next turn, so a hit actually slows. (about: "17 (3d8 + 4) Cold damage")
[reskin] audit defect: Traits/"Black Rime Wake" [model-written] medium untrackable — The difficult terrain is authored as a modifier on existing ground with a one-turn expiry and no defined area, so the GM cannot tell whether a second move in the same turn refreshes, extends, or replaces the prior patch, nor how much ground counts. — State the field as the spaces the creeper passes through this turn and give it a single fixed expiry keyed to the creeper's turn, so separate trips accumulate predictably. (about: "until the start of its next turn")
[reskin] clause unresolved: "Black Rime Wake" carries "The creeper leaves a wake of slick black rime; the groun", which matches no clause on the sheet — no coverage credit by id
[reskin] [gap] a save-area breath that deals damage and leaves the survivors slowed and rime-locked — "The creeper exhales a gale of killing frost in its Cone of Cold; each creature that takes Cold damage from it is Rimebitten until the end of the creeper's next turn, its speed halved and its flesh sheathed in black rime. A Rimebitten creature that takes Cold damage again while already Rimebitten is Restrained as the ice locks its joints until it escapes." — Rimewake Creeper [seat: action [action/save/condition]] (closest offered: execute) [effect: condition] [menu: lure execute zone] [same-cell unoffered: swallow gaze-single snare seal shield-bash random-ray pacify escalating-dread terror-pulse snare-bolt sensory-strike push-prone reveal exploiter] [same-seat rejected: swallow:hold-shape trample:nova-taken leap:nova-taken thrown-burst:nova-taken gaze-single:body-verdict snare:body-verdict reel:hold-shape condition-payoff:needs-imposed seal:body-verdict shield-bash:body-verdict hook-drag:hold-shape active-toll:body-verdict pull-through:role random-ray:body-verdict ground-burst:nova-taken spew:body-verdict burrow-ambush:movement obstacle-pull:role pacify:role snare-bolt:role slow-bolt:role sensory-strike:role disarm:role herd:body-verdict drain:body-verdict curse-debt:role reveal:role wind-up:nova-taken exploiter:needs-imposed blighted-ground:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Rimewake Creeper" — donor dragon-2, CR 7
[reskin] ledger: 3 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 2 open (2 never-written)
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 24-rimewake-creeper.json — 1 recorded answer(s) unused
```

---

## 25-grumm

## 25. Grumm — CR 6

**Input:** `name: Grumm | troll shaman. 3/day he can heal another troll 2d8. totem that gives allies +2 to hit within 30 ft. spear.`
**Donor:** brute-5 -> CR 6
**Signature:** library

### Block
```
Grumm
Large giant, chaotic evil
Armor Class

15 (natural armor)

Hit Points: 

94 (9d10 + 45)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

13 (+1)

	

20 (+5)

	

7 (-2)

	

9 (-1)

	

7 (-2)

Skills: 

Perception +5

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Giant

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Pack Tactics.Grumm has advantage on an attack roll against a target if at least one of Grumm's allies is within 5 feet of that target and the ally is not incapacitated.
Regeneration.Grumm regains 15 hit points at the start of each of its turns. If Grumm takes acid or fire damage, this trait doesn't function on Grumm's next turn. Grumm dies only if it starts its turn with 0 hit points and doesn't regenerate.
Loathsome Limbs (4/Day).If Grumm ends any turn below half its hit point maximum and took 15+ slashing damage during that turn, one of Grumm's limbs is severed, falls into Grumm's space, and becomes a Troll Limb. The limb acts immediately after Grumm's turn. Grumm has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains hit points.
Totem of Striking (2/Day) (Bonus Action).Grumm regains 19 (3d12) hit points.
Charge (Bonus Action).Grumm moves up to half its Speed straight toward an enemy it can see.

Actions
Multiattack: Grumm makes three attacks, using Rend or Spear.
Spear: Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 13 (2d8 + 4) piercing damage, and the target has disadvantage on its next attack roll before the start of Grumm's next turn.
Rend: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) slashing damage.
```

### Trace
```
!! [ENRICHMENT] Failed to enrich Rimewake Creeper: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 24 taken name(s) the recording carried
[path] twist — Troll (is) — "troll shaman" (call)
[route] caster-warpriest (artillery) type=Giant mechanics=aura — casts: on the GM's own words "troll shaman" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("troll shaman") | caster-warpriest: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause and the call did not claim one, so "fire" is a guess from what the creature is, not the GM's ask
[concept] name: "Grumm" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: troll→canon ✓ ("Grumm — troll shaman")
[concept] resolve: archetype=caster type=Giant typeFrom=the route call themes=bestial/armed mind=sapient style=warpriest energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Grumm"
[concept] mechanics: aura
[concept] signature elements: totem that rallies trolls to strike true [object] | healing prayer for wounded trolls [behavior] | reached spear-thrust from behind his warband [object]
[concept] identity: A hulking troll shaman plants his totem before the first exchange — from then on every spear-thrust and every healed ally flows through that ground. Each round he jabs at reach while calling a wounded troll back to its feet, so the fight costs the party twice for every wound they deal a troll. He is patient and calculating, retreating to drag the totem with him rather than dying over it, and lasting until the last of his kin has no further use for him.
[concept] lore: Grumm carved his first totem from a storm-felled bough and has not set it down since, walking troll-country to gather a warband under a banner no troll will dare ignore.
[reskin] print canon route: the Troll's body outranks the warpriest seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Troll is not a caster first and keys STR 18 over DEX 13 — it casts no spells — the caster family stands down for the plain brute line
[reskin] print canon defenses: HP 114 -> 94, AC 13 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +6 -> +7, DC 16 (print's)
[reskin] donor: brute-5 -> CR 6
[reskin] seats: action <- "healing prayer for wounded trolls" | trait <- "totem that rallies trolls to strike true"
[reskin] [path] decides: twist on the Troll (the matcher would have said homebrew)
[reskin] print canon: "Grumm — troll shaman. 3/day he can heal another troll 2d8. totem that gives allies +2 to hit within 30 ft. spear." heads on the Troll — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] named parts: Spear (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] features: Sap on Spear — the feature table, no call
[reskin] class kit: none — the twist path takes no class kit
[reskin] proper noun: "Grumm" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Grumm" — the call's own answer (person), built from the name
[reskin] inline form: "Grumm" — the model's own reading of the name
[reskin] the sheet's declared ask: mend — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: limit "at_will" stands on "totem that gives allies +2 to hit within 30 ft. spear" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Grumm — troll shaman" -> has (descriptive), head | "3/day he can heal another troll 2d8" -> has (descriptive) | "totem that gives allies +2 to hit within 30 ft. spear" -> has (mechanical) [asked: at_will/buff_ally] [askMechanic: command]
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (2 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "Grumm plants his totem and calls a prayer over the wounded of his kin:" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "While Grumm's totem stands, trolls that can see it fight with a shaman" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 31 of 31 answered; not true of this body: shield-bash, active-toll, random-ray, spew, drain, shell-withdraw, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, mimicry, gaze-aura, death-burst, kill-denial
[reskin] signature idea (action): "Grumm plants his totem and calls a prayer over the wounded of his kin: one ally he can see that is missing hit points regains hit points, and the wounds knit closed with a green flare that ripples out from the totem to every troll standing within its shadow. The shaman's chant does not stop the fight — it restarts it." [action/always/resource] [family: heal] — menu: trample, leap, thrown-burst, ground-burst, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, wind-up (+ shelf: rampage, second-wind, aggro-curse, self-invisibility, rally, focus, lay-on-hands, patient-defense)
[reskin] composed candidates: none action — the heal family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires always/does resource; leading: rally (always/movement), trample (save/damage), leap (save/damage)
[reskin] keys would have bound: action — lay-on-hands (heal, heals, healing)
[reskin] classification handed to the fit call: mechanic=aura shape=buff_ally often=at_will
[reskin] word match declined by the call: herd, terror-pulse, escalating-dread — the key word does not mean the mechanic here
[reskin] closest refused: action — "rally" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: grants allies within 30 ft a flat bonus to their attack rolls)
[reskin] seat authored nothing: action — the call was asked to write an action for "Grumm plants his totem and calls a prayer over the wounded of his kin:" and wrote no row of that kind (it belongs in the description)
[reskin] the declared ask's own template lands: action — the sheet's declared ask is "mend", the seat that carries it ended with no row, and "second-wind" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] pick kept on the GM's own words: action — "second-wind" has no key-table verb, but the call quotes "totem that gives allies to hit within ft" from the description
[reskin] seat takes its clause: "Totem of Striking (2/Day)" is HANDED "Grumm — shaman" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: second-wind -> Bonus Actions/"Totem of Striking (2/Day)" ("The clause is an aura granting allies +2 to hit within 30 ft, an ongoing ally bu [shape fit, no verb match]")
[reskin] signature idea (trait): "While Grumm's totem stands, trolls that can see it fight with a shaman's certainty — each of them that is wounded strikes back harder, its spear-thrusts carrying the totem's spite. The banner is the shrine; break the totem and the warband's edge goes dull." [trait/always/damage] [family: payoff] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, warded-mending, undead-fortitude, truth-aura, fear-aura, evasion, guarded-stance, assassinate (+ shelf: weapon-lodge)
[reskin] lead by this seat's own clause: trait — "command" from the clause this seat serves, not the sheet's "mend"
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] declared mechanic leads the menu: trait — command: pack-tactics
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: pack-tactics (always/damage), blood-frenzy (always/damage), assassinate (always/damage)
[reskin] classification handed to the fit call: mechanic=aura shape=buff_ally often=at_will
[reskin] word match declined by the call: blood-frenzy, bloodied-fury, berserk, relic-object — the key word does not mean the mechanic here
[reskin] closest refused: trait — "blood-frenzy" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: buffs allies' attack rolls from a standing totem the party can smash)
[reskin] seat answered, but: the call said "While Grumm's totem stands, trolls that can see it fight with a shaman's certainty — each of them that is wounded strike" is carried by "Spite of the Standing Totem", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "While Grumm's totem stands, trolls that can see it fight with a shaman" and wrote no row of that kind (refused: "Spite of the Standing Totem" — the call counts 1 number(s) the row promises and only 0 are written — a promised amount, area or bonus with no number cannot be run) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Spite of the Standing Totem" — the call counts 1 number(s) the row promises and only 0 are written — a promis); asking once more with the reason
[reskin] seat authored nothing: trait — the call was asked to write a trait for "While Grumm's totem stands, trolls that can see it fight with a shaman" and wrote no row of that kind (it belongs in the description)
[reskin] seat refused twice: trait — first: "Spite of the Standing Totem" — the call counts 1 number(s) the row promises and only 0 ar; second: it belongs in the description; the seat stays empty
[reskin] closest refused — subject flipped: trait — the call named "blood-frenzy" nearest and judged its subject FLIPPED against the clause (buffs allies' attack rolls from a standing totem the party can smash); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] the declared ask's own template lands: trait — the sheet's declared ask is "command", the seat that carries it ended with no row, and "pack-tactics" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] pick kept on the GM's own words: trait — "pack-tactics" has no key-table verb, but the call quotes "totem that gives allies to hit within ft" from the description
[reskin] seat takes its clause: "Totem of Spite" is HANDED "Grumm — shaman" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): pack-tactics -> Traits/"Totem of Spite" ("The totem aura that gives allies +2 to hit is an always-on ally buff, not a self [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Totem of Spite" -> "Pack Tactics" — this row is pack-tactics and does what every pack-tactics row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Spear = spear
[reskin] weapon dice follow the weapon: the GM's "Spear" is a spear (d6) — "22 (4d8 + 4)" becomes "21 (5d6 + 4)"
[reskin] weapon reach follows the weapon: the GM's "Spear" is a spear — reach 10 ft becomes 5 ft
[reskin] print canon type: the call answered type_source=user for giant, but the GM's words do not name it — the Troll's own type stands
[reskin] print canon alignment: Neutral -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon row: Actions/Rend — the Troll's own melee row, added (the chassis carried none to rename)
[reskin] print canon multiattack: "Grumm makes three Rend attacks." — the Troll's own
[reskin] print canon saves: proficient in nothing — the Troll's own set, at this sheet's stats and PB 3 (changed STR, CON)
[reskin] print canon skills: "Athletics +7, Perception +2" -> "Perception +5" — the Troll's own skills, each derived from this sheet's stat and PB
[reskin] name-canon trait stamped: Regeneration (the name says so; print says what it does)
[reskin] print canon trait: Loathsome Limbs (4/Day) — "Grumm — troll shaman. 3/day he can heal another troll 2d8. totem that gives allies +2 to hit within 30 ft. spear." is the Troll (print's own row)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
[reskin] final price: print's Multiattack: the round ran 63 against the card's 42 — the attack rows re-solve at 70% (3 attacks off one row after a supersede)
[reskin] free-row budget by card size: CR 6 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 7 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] ask vs row ok: "totem that gives allies +2 to hit within 30 ft. spear" -> "Spear" — limit at_will
[reskin] lint: 0 findings
[reskin] audit sees the ask: 2 row(s) shown with the clause they were written for
audit finding below confidence gate: Pack Tactics This row was written to serve the GM's shaman ask, but it grants Grumm personal flanking advantage rather than anything shamanic for its allies.
[reskin] audit: [Spear: Spear is the row written for the GM's ask, …tack roll before the start of Grumm's next turn"), Totem of Striking (2/Day): The row was written for…s. (about: "Grumm regains 19 (3d12) Hit Points."), Totem of Striking (2/Day): The name promises a pla…king totem. (about: "Totem of Striking (2/Day)."), Totem of Striking (2/Day): Grumm already has Regen…r. (about: "Grumm regains 19 (3d12) Hit Points.")]
[reskin] audit rename blocked — "Totem of Striking" -> "Second Wind" would drop the GM's own word "totem"
[reskin] audit defect: Actions/"Spear" [model-written] medium weak — Spear is the row written for the GM's ask, but its only distinct payload is a next-attack Disadvantage rider that has nothing to do with Grumm as a troll shaman and is weaker than simply using Rend in melee. — Strip the off-theme rider and give Spear a shaman-appropriate effect or make it a clean ranged/thrown option that doesn't undercut Rend. (about: "and the target has Disadvantage on its next attack roll before the start of Grumm's next turn")
[reskin] audit defect: Bonus Actions/"Totem of Striking" [catalog] high undelivered — The row was written for the GM's ask of a totem granting allies +2 to hit within 30 ft, but the text heals Grumm himself and never creates a totem or buffs allies. — Rewrite as an ally-buffing totem effect: place a totem within range that grants nearby allies a bonus to attack rolls. (about: "Grumm regains 19 (3d12) Hit Points.")
[reskin] audit defect: Bonus Actions/"Totem of Striking" [catalog] medium other — Grumm already has Regeneration regaining 15 HP each turn, so a 2/day self-heal duplicates the chassis's existing recovery and is redundant at the table. — Trim the self-heal and route the bonus action into the ally-facing totem the GM asked for. (about: "Grumm regains 19 (3d12) Hit Points.")
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] grants allies within 30 ft a flat bonus to their attack rolls — "Grumm plants his totem and calls a prayer over the wounded of his kin: one ally he can see that is missing hit points regains hit points, and the wounds knit closed with a green flare that ripples out from the totem to every troll standing within its shadow. The shaman's chant does not stop the fight — it restarts it." — Grumm [seat: action [action/always/resource]] (closest offered: rally) [effect: resource] [menu: rally trample leap thrown-burst ground-burst escalating-dread terror-pulse push-prone herd thrown-burst-seed wind-up rampage] [same-cell unoffered: lay-on-hands second-wind volley-order] [same-seat rejected: throw-retrieve:engine-family zone-seed:role] [row dropped]
[reskin] [gap] buffs allies' attack rolls from a standing totem the party can smash — "While Grumm's totem stands, trolls that can see it fight with a shaman's certainty — each of them that is wounded strikes back harder, its spear-thrusts carrying the totem's spite. The banner is the shrine; break the totem and the warband's edge goes dull." — Grumm [seat: trait [trait/always/damage]] (closest offered: blood-frenzy) [effect: damage] [menu: pack-tactics blood-frenzy assassinate phobia bloodied-fury death-restoration berserk shielded-mind relentless-pursuit bound relic-object undead-fortitude evasion guarded-stance warded-mending truth-aura fear-aura] [same-cell unoffered: throw-retrieve death-burst zone-seed coating] [same-seat rejected: false-appearance:body-verdict adhesive:body-verdict spider-climb:body-verdict terrain-walk:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement marking-light:body-verdict sealed-body:body-verdict mimicry:body-verdict blurred-form:role death-burst:body-verdict kill-denial:body-verdict] [row dropped]
[reskin] signature outcome: 2 of 2 accepted signature pick(s) never reached the sheet — 2x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 2 of 2 (2x the call named no template for the pick) · path twist
[reskin] multiattack re-read — "Spear" joins the combination; "Grumm makes three attacks, using Rend or Spear in any combination."
[reskin] done: "Grumm" — donor brute-5, CR 6
[reskin] ledger: 1 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 25-grumm.json
```

---

## 26-fen-barbed-creeper

## 26. Fen-Barbed Creeper — CR 4

**Input:** `assassin vine that grapples on hit and pulls 10 ft, restrained while grappled, 2d6 poison at start of turn`
**Donor:** brute-2 -> CR 4
**Signature:** library

### Block
```
Fen-Barbed Creeper

Medium Humanoid, Neutral

AC 13
Initiative +4 (14)

HP 84 (13d8 + 26)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+6
INT
16
+3
+3
MOD
SAVE
DEX
18
+4
+4
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

Skills Athletics +6, Perception +2

Resistances Poison

Senses tremorsense 30 ft.; Passive Perception 12

Languages Common, Thieves' cant

CR 4 (XP 1,100; PB +2)

Traits

Evasion. If the creeper is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the creeper instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (3d8 + 4) Piercing damage plus 17 (5d6) Poison damage, and the target has the Poisoned condition until the start of the creeper's next turn.

Barbed Hook Drag. Strength Saving Throw: DC 13, one creature within 30 feet. Failure: The target is pulled up to 20 feet straight toward the creeper by barbed tendrils and has the Grappled condition (escape DC 14).

Light Crossbow. Ranged Attack Roll: +6, range 80/320 ft. 8 (1d8 + 4) Piercing damage.

Bonus Actions

Cunning Action. The creeper takes the Dash, Disengage, or Hide action.

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
!! [ENRICHMENT] Failed to enrich Grumm: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 25 taken name(s) the recording carried
[path] twist — Assassin (is) — "assassin vine" (call)
[route] brute-grappler type=Plant mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape: reach on the GM's own words "pulls 10 ft" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("grapples on hit and pulls 10 ft, restrai") | brute-grappler: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause and the call did not claim one, so "fire" is a guess from what the creature is, not the GM's ask
[concept] hints: grappler→style ✓ ("grapples on hit and pulls 10 ft")
[concept] resolve: archetype=brute type=Plant typeFrom=the route call themes=venomous/grasping mind=mindless style=grappler energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: grappling tendril that hooks and drags prey [behavior] | poisoned thorns that pump venom while it feeds [body] | ambush stillness among ordinary creepers [behavior]
[concept] identity: An assassin vine lies coiled and near-invisible among ordinary creepers until warm blood passes within reach, then lashes out with a thorned tendril that hooks and drags the victim ten feet into its waiting tangle. Each round it feeds, its barbs pump poison while it reels the prey tighter, restraining the struggling body against its fibrous bulk and never letting go of one meal to chase another. It has no cunning and no mercy — it is a patient ambush predator that fights only what it has already caught, ignoring prey that slips free of its reach.
[concept] lore: A hedge-witch's discarded cuttings took root in a poison fen and grew hungry; the assassin vine seeds itself along game trails, remembering nothing but the shape of a body that bled into its soil.
[reskin] the concept outranks the alias: the Assassin is a Humanoid and the concept reads Plant — the words RESEMBLE it, they do not name it, so the alias match stands down. Print canon is decided separately and may still run on this sheet
[reskin] print canon route: the Assassin's body outranks the grappler seat — no verb in the words names it; the plain brute line
[reskin] print canon array: STR 18, DEX 18, CON 14, INT 16, WIS 11, CHA 10 — the Assassin's, STR fitted to +6
[reskin] donor: brute-2 -> CR 4
[reskin] seats: action <- "grappling tendril that hooks and drags prey" | trait <- "poisoned thorns that pump venom while it feeds"
[reskin] [path] decides: twist on the Assassin (the matcher would have said homebrew)
[reskin] print canon: "assassin vine that grapples on hit and pulls 10 ft, restrained while grappled, 2d6 poison at start of turn" heads on the Assassin — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the creeper" — the call's own answer (kind), built from the name
[reskin] inline form: "the creeper" — the model's own reading of the name
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "assassin vine" -> has (descriptive), head | "grapples on hit" -> has (mechanical) [asked: on_hit/condition] [askMechanic: grapple] | "pulls 10 ft" -> has (mechanical) [asked: on_hit/movement] [askMechanic: grapple] | "restrained while grappled" -> has (mechanical) [asked: condition] [askMechanic: grapple] | "2d6 poison at start of turn" -> has (mechanical) [asked: start_of_turn/attack] [askMechanic: drain]
[reskin] open asks handed to the idea call: "grapples on hit" [grapple] · "pulls 10 ft" [grapple] · "restrained while grappled" [grapple] · "2d6 poison at start of turn" [drain]
[reskin] idea anchored: action — "The tendril's barbs are backward-set hooks: when it hits with Thorned " answers the GM's "grapples on hit"
[reskin] idea unanchored: trait — "Hooked barbs that have sunk in stay sunk: a creature grappled by the F" names none of the 4 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 34 of 34 answered; not true of this body: shield-bash, active-toll, random-ray, spew, herd, shell-withdraw, rally, heated-body, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, web-walker, energy-aura, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial
[reskin] menu: taste stands down — action answers the GM's "grapples on hit", so role and style do not filter the menu (legality still does); 8 template(s) offered
[reskin] signature idea (action): "The tendril's barbs are backward-set hooks: when it hits with Thorned Tendril, the target must succeed on a Strength (Athletics) or Dexterity (Acrobatics) check against the vine's grapple or be pulled into its tangle, grappled and dragged toward the creeper's bulk as the barbs catch fast in flesh and cloth alike." [rider/on_hit/condition] [family: drag] — menu: affliction, contagion, charge-push, hook-rider, pounce, life-drain, charge, isolation (+ shelf: hook-drag, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, drain, wind-up, snare, reel, execute, pull-through, obstacle-pull, pacify, snare-bolt, slow-bolt, sensory-strike, disarm, delayed-brand, curse-debt, reveal, rampage, second-wind, aggro-curse, self-invisibility, focus, coating, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — grapple: hook-rider, hook-drag, reel
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: hook-rider (on_hit/movement), hook-drag (save/movement), reel (save/movement)
[reskin] keys would have bound: action — hook-drag, snare-bolt (grapple, pull, vine, restrain)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition when=on_hit
[reskin] word match declined by the call: hook-rider, affliction, contagion, pounce, life-drain, snare-bolt, snare, obstacle-pull, reel, charge-push, charge, isolation — the key word does not mean the mechanic here
[reskin] closest refused: action — "hook-drag" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: applies Grappled on a hit and drags the target 10 feet in)
[reskin] seat authored nothing: action — the call was asked to write an action for "The tendril's barbs are backward-set hooks: when it hits with Thorned " and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
[reskin] strike refused: "Backward Barbs" — this creature has no Multiattack, and the exchange in Multiattack is the only thing that limits a strike to once a turn — write it as a save, a trait or a reaction instead
[reskin] seat authoring refused: action — this creature has no Multiattack, and the exchange in Multiattack is the only thing that limits a strike to once a turn — write it as a save, a trait or a reaction instead
[reskin] seat refused twice: action — first: you wrote no row of the kind asked for (an action); second: this creature has no Multiattack, and the exchange in Multiattack is the only thing that l; the seat stays empty
[reskin] the declared ask's own template lands: action — the sheet's declared ask is "grapple", the seat that carries it ended with no row, and "hook-drag" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] signature template: hook-drag -> Actions/"Barbed Hook Drag" ("The idea wants a hit to apply the Grappled condition and drag the target in, but [verb: grapple:concept, pull:concept, hook:idea, drag:idea]")
[reskin] keys spent by the action: grapple, pull
[reskin] signature idea (trait): "Hooked barbs that have sunk in stay sunk: a creature grappled by the Fen-Barbed Creeper's tendril is restrained, and the vine cannot be separated from its catch while it lives, only torn free by force." [trait/always/condition] [family: drag] — menu: false-appearance, spider-climb, phobia, terrain-walk, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, assassinate (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), faultless-tracker (always/condition), berserk (always/condition)
[reskin] keys would have bound: trait — assassinate (assassin)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition when=on_hit
[reskin] word match declined by the call: phobia, false-appearance, bound, assassinate — the key word does not mean the mechanic here
[reskin] closest refused: trait — "relentless-pursuit" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: on a hit, grapples the target and restrains it while grappled)
[reskin] seat answered, but: the call said "Hooked barbs that have sunk in stay sunk: a creature grappled by the Fen-Barbed Creeper's tendril is restrained, and the" is carried by "Sunk Barbs", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Hooked barbs that have sunk in stay sunk: a creature grappled by the F" and wrote no row of that kind
[reskin] seat asked again: trait — the first answer was refused (you wrote no row of the kind asked for (a trait)); asking once more with the reason
[reskin] seat answered, but: the call said "Hooked barbs that have sunk in stay sunk: a creature grappled by the Fen-Barbed Creeper's tendril is restrained, and the" is carried by "Sunk Barbs", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Hooked barbs that have sunk in stay sunk: a creature grappled by the F" and wrote no row of that kind (refused: "Sunk Barbs" — a trait cannot put the Restrained condition on another creature with no saving throw, and a trait has nowhere to hold one. Where it fires because the creature was HIT, answer in "reactions" with a trigger and a "save" object; where it fires on creatures NEAR it, answer in "auras") (it belongs in the description)
[reskin] seat refused twice: trait — first: you wrote no row of the kind asked for (a trait); second: "Sunk Barbs" — a trait cannot put the Restrained condition on another creature with no sav; the seat stays empty
[reskin] closest refused — subject flipped: trait — the call named "relentless-pursuit" nearest and judged its subject FLIPPED against the clause (on a hit, grapples the target and restrains it while grappled); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key assassinate, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "assassinate" is keyed by the GM's assassin and was on the call's menu, which the call read as a collision, not the mechanic; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "Hooked barbs that have sunk in stay sunk: a creature grappled by the Fen-Barbed Creeper's tendril is restrained, and the vine cannot be separated from its catch while it lives, only torn free by force." [trait/always/condition] — the model found no template that holds it (offered: phobia, faultless-tracker, berserk, false-appearance, spider-climb, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, relentless-pursuit, bound, undead-fortitude, assassinate, truth-aura, fear-aura)
[reskin] repair: 1 clause(s) with no row — "2d6 poison at start of turn"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced []
[reskin] repair: the answer held no rows for 1 owed clause(s) — "2d6 poison at start of turn": a print body plus a clause the sheet never answers is the stock monster (1e)
[reskin] weapons answered: Thorned Tendril = none
[reskin] print canon modes: climb off — the Assassin has no such mode and the words name none
[reskin] print canon type: the call answered type_source=user for plant, but the GM's words do not name it — the Assassin's own type stands
[reskin] print canon alignment: Unaligned -> Neutral — the Assassin's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Plant -> Humanoid — the Assassin's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon languages: "None" -> "Common, Thieves' cant" — the Assassin's
[reskin] print canon row: Actions/Light Crossbow — the Assassin's own ranged row, added (the chassis carried none to rename) — far from print's CR 8: print's dice, the sheet's +6
[reskin] print canon attack: "Thorned Tendril" -> "Shortsword" — the Assassin's own row
[reskin] print canon defenses: resistances none -> Poison — the Assassin's own header lines
[reskin] print canon trait: Evasion — "assassin vine that grapples on hit and pulls 10 ft, restrained while grappled, 2d6 poison at start of turn" is the Assassin (print's own row)
[reskin] print canon row: Bonus Actions/Cunning Action — the Assassin's own
[reskin] free-row budget by card size: CR 4 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] row binds its clause: "Barbed Hook Drag" answers "grapples on hit" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "grapples on hit" -> "Barbed Hook Drag" — trigger: asked on_hit, row reads at_will
[reskin] asked but unanswered: "pulls 10 ft" asked for on_hit and no row binds the clause
[reskin] asked but unanswered: "2d6 poison at start of turn" asked for start_of_turn and no row binds the clause
[reskin] lint: 0 findings
audit span not verbatim, dropped: Fen-Barbed Creeper Medium Humanoid, Neutral
audit finding below confidence gate: Barbed Hook Drag The signature action is a pure pull-and-grapple with no damage, while the creature's own ask was for damage on a grapple turn; the barbs promise a threat the row never delivers.
[reskin] audit: [Shortsword: A barbed tendril creeper cannot wield …tsword.*** *Melee Attack Roll:* +6, reach 5 ft."), Light Crossbow: A plant-like tendrilled creeper ha….*** *Ranged Attack Roll:* +6, range 80/320 ft."), Cunning Action: Cunning Action is a rogue's traine…eper takes the Dash, Disengage, or Hide action."), Barbed Hook Drag: The GM asked for the target to b…out: "has the Grappled condition (escape DC 13)")]
[reskin] audit type correction refused: Humanoid stands — the GM's words name the type
[reskin] audit rename blocked — "Shortsword" is the user's own part name, a kit feature's real name, or print's own row
[reskin] audit defect: Actions/"Light Crossbow" [print] high other — A plant-like tendrilled creeper has no hands or crossbow, so this ranged attack is a piece of equipment its body cannot plausibly operate. — Replace the weapon attack with a natural ranged option fitting a barbed plant, such as a flung thorn or barb. (about: "***Light Crossbow.*** *Ranged Attack Roll:* +6, range 80/320 ft.")
[reskin] audit defect: Bonus Actions/"Cunning Action" [print] medium misnamed — Cunning Action is a rogue's trained trick implying hands-on stealth and weapon finesse, which clashes with a stationary barbed fen creeper whose kit is tendrils and poison. — Remove the Cunning Action row or replace it with a plant-appropriate mobility/tendril bonus action. (about: "***Cunning Action.*** The creeper takes the Dash, Disengage, or Hide action.")
[reskin] audit defect: Actions/"Barbed Hook Drag" [catalog] high undelivered — The GM asked for the target to be Restrained while grappled, but the row only applies Grappled with no Restrained condition, so the requested lockdown is undelivered. — Add the Restrained condition to the grappled target with its own escape clause. (about: "has the Grappled condition (escape DC 13)")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] applies Grappled on a hit and drags the target 10 feet in — "The tendril's barbs are backward-set hooks: when it hits with Thorned Tendril, the target must succeed on a Strength (Athletics) or Dexterity (Acrobatics) check against the vine's grapple or be pulled into its tangle, grappled and dragged toward the creeper's bulk as the barbs catch fast in flesh and cloth alike." — Fen-Barbed Creeper [seat: action [rider/on_hit/condition]] (closest offered: hook-drag) [effect: condition] [menu: hook-rider hook-drag reel affliction contagion pounce life-drain charge-push charge isolation snare-bolt snare obstacle-pull] [same-cell unoffered: stunning-strike snatch bolt-restrain bolt-mark] [same-seat rejected: stunning-strike:cr-range snatch:movement bolt-restrain:role bolt-drag:role bolt-mark:role] [row dropped]
[reskin] [gap] on a hit, grapples the target and restrains it while grappled — "Hooked barbs that have sunk in stay sunk: a creature grappled by the Fen-Barbed Creeper's tendril is restrained, and the vine cannot be separated from its catch while it lives, only torn free by force." — Fen-Barbed Creeper [seat: trait [trait/always/condition]] (closest offered: relentless-pursuit) [effect: condition] [menu: phobia faultless-tracker berserk false-appearance spider-climb terrain-walk bloodied-fury blood-frenzy pack-tactics uncanny-sense shielded-mind relentless-pursuit bound undead-fortitude assassinate truth-aura fear-aura] [same-cell unoffered: adhesive marking-light kill-denial] [same-seat rejected: adhesive:body-verdict aberrant-ground:body-verdict web-walker:body-verdict death-restoration:cr-range earth-glide:movement tunneler:movement evasion:role marking-light:body-verdict sealed-body:body-verdict relic-object:body-verdict guarded-stance:role mimicry:body-verdict blurred-form:role death-burst:body-verdict kill-denial:body-verdict] [row dropped]
[reskin] signature outcome: 2 of 2 accepted signature pick(s) never reached the sheet — 2x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 2 of 2 (2x the call named no template for the pick) · path twist
[reskin] owed and unanswered: "2d6 poison at start of turn" — the checker fails this block (1e)
[reskin] record reconciled: "Barbed Hook Drag" keeps Grappled and drops Restrained — only those clauses left
[reskin] escape dc: Barbed Hook Drag → DC 14 (8 + PB + STR; a late row wore another number)
[reskin] done: "Fen-Barbed Creeper" — donor brute-2, CR 4
[reskin] ledger: 4 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 1 mismatch, 3 open (3 never-written)
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 26-fen-barbed-creeper.json
```

---

## 27-oathfallen-reeve

## 27. Oathfallen Reeve — CR 10

**Input:** `ghost knight, resistant to nonmagical weapons, lance attack does extra 3d8 on a charge, reaction to parry, frightens with a look`
**Donor:** lurker-5-phantom -> CR 10
**Signature:** library

### Block
```
Oathfallen Reeve

Medium Undead, Lawful Neutral

AC 14
Initiative +3 (13)

HP 142 (19d8 + 57)

Speed 5 ft., Fly 60 ft. (hover)

MOD
SAVE
STR
20
+5
+5
INT
12
+1
+1
MOD
SAVE
DEX
16
+3
+7
WIS
14
+2
+2
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

Skills Stealth +7

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 12

Languages Common plus the languages it knew in life

CR 10 (XP 5,900; PB +4)

Traits

Grave-Cold Charge. While the reeve is moving toward a creature it has damaged within the last 24 hours, the reeve's Speed can't be reduced and Difficult Terrain doesn't cost it extra movement.

Great Weapon Master. When the reeve hits a creature with its Lance, the attack deals an extra 4 damage.

Incorporeal Movement. The reeve can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the reeve has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The reeve makes two Lance attacks.

Lance. Melee Attack Roll: +9, reach 10 ft. 16 (2d10 + 5) Piercing damage plus 14 (4d6) Necrotic damage.

Bonus Actions

Dead Man's Oath. Wisdom Saving Throw: DC 17, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
!! [ENRICHMENT] Failed to enrich Fen-Barbed Creeper: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 26 taken name(s) the recording carried
[path] homebrew — title knight — "ghost knight, resistant to nonmagical weapons, lance attack does extra 3d8 on a " (call)
[route] lurker-phantom type=Undead mechanics=gaze — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-phantom: ✓ ("ghost knight") | lurker-phantom: key "ghost" (class body) | bane: the call says the GM named it — no "unless/except/only" in the words, so the quote below is the whole of the evidence | bane refused: "magical weapons" is not a damage type or a material the rules know
[concept] hints: phantom→style ✓ ("ghost knight, resistant to nonmagical we") | charger→style ✓ ("extra 3d8 on a charge")
[concept] resolve: archetype=lurker type=Undead typeFrom=the route call themes=grave/armed mind=sapient style=phantom energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: gaze
[concept] signature elements: spectral lance charge that skewers and chills [object] | parrying reaction with ghostly steel [behavior] | frightening hollow-visored glare [aura]
[concept] identity: The ghost knight is a duellist of the grave, opening with a thunderous lance charge down a corridor or through a wall it has no business crossing, the impact carrying a wave of necrotic cold. Every round after it circles at lance-length, spending its reaction to turn aside blades with a shimmer of spectral steel, and any foe who meets its visor is cowed by the hollow glare of a dead man's oath. It does not flee; it considers a fight a debt to be collected, and it toys with the living only long enough to make the lesson land.
[concept] lore: A knight who died with a sworn charge unfulfilled, bound to the field of that broken oath and condemned to ride it down forever until someone finishes the errand it could not.
[reskin] mind tier held: INT stays 12 against "ordinary" — the card's 12 is already ordinary
[reskin] mind tier held: WIS stays 14 against "capable" — the card's 14 is already capable
[reskin] mind tier: CHA 15 -> 20 — the call read this creature as formidable at CR 10
[reskin] donor: lurker-5-phantom -> CR 10
[reskin] seats: action <- "parrying reaction with ghostly steel" | trait <- "spectral lance charge that skewers and chills"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] named parts: Lance (slot) — the user's words, the engine's numbers
[reskin] energy rides the named weapon: "Lance" is a lance, so the blow stays Piercing and Necrotic rides it rather than folding into the blow (print: 11 of 53 weapon rows carry an energy rider)
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] features: Great Weapon Master (trait) — the feature table, no call
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the reeve" — the call's own answer (kind), built from the name; the rules would have said "Reeve"
[reskin] inline on stamped rows: "Reeve" -> "the reeve" on 1 row — they were written before the name's form was settled
[reskin] inline form: "the reeve" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 17 (8 + PB 4 + the sheet's best 5) — no stat on the sheet reached it
[reskin] the sheet's declared ask: fear — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "ghost knight" -> has (descriptive), head | "resistant to nonmagical weapons" -> has (header) | "lance attack does extra 3d8 on a charge" -> has (mechanical) [asked: attack] [askMechanic: charge] | "reaction to parry" -> has (mechanical) [asked: on_being_hit/buff_self] | "frightens with a look" -> has (mechanical) [asked: condition] [askMechanic: fear]
[reskin] open asks handed to the idea call: "reaction to parry" · "frightens with a look" [fear] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The reeve fixes its hollow visor on one creature it can see and speaks" answers the GM's "frightens with a look"
[reskin] idea unanchored: trait — "When the reeve flies in a straight line toward a creature and ends its" names none of the 2 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 36 of 36 answered; not true of this body: seal, wail, active-toll, random-ray, spew, snare-bolt, zone-seed, blighted-ground, shell-withdraw, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, blurred-form, death-burst, kill-denial, hook-rider
[reskin] menu: taste stands down — action answers the GM's "frightens with a look", so role and style do not filter the menu (legality still does); 8 template(s) offered
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The reeve fixes its hollow visor on one creature it can see and speaks a dead man's oath aloud; that creature must succeed on a Wisdom saving throw or be Frightened of the reeve until the end of its next turn, its knees locked as if the charge had already struck home." [bonus_action/save/condition] [family: mark] — menu: patient-defense, self-invisibility, focus, feint-slip, rampage, lay-on-hands, second-wind, aggro-curse (+ shelf: lure, ground-burst, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, drain, delayed-brand, thrown-burst, gaze-single, execute, throw-retrieve, disarm, push-prone, thrown-burst-seed, curse-debt, reveal, wind-up, riposte, answering-strike, affliction, contagion, stunning-strike, charge-push, pounce, isolation, life-drain, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: aggro-curse (save/movement), thrown-burst (save/damage), execute (save/damage)
[reskin] keys would have bound: action — charge (charge, lance)
[reskin] classification handed to the fit call: mechanic=gaze shape=attack
[reskin] word match declined by the call: execute, thrown-burst, thrown-burst-seed, curse-debt, rampage — the key word does not mean the mechanic here
[reskin] closest refused: action — "aggro-curse" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: frightens the target of the reeve's gaze with fear, not disadvantage o)
[reskin] authored row answers the GM: action — "Dead Man's Oath" was written for "frightens with a look", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("frightens the target of the reeve's gaze with fear, not disadvantage o") and wrote a bonus action instead: "Dead Man's Oath" -> Bonus Actions. *Wisdom Saving Throw*: DC 17, one creature within 30 feet. *Failure:* The target has the Frightened condition until the 
[reskin] authored row numbers: "Dead Man's Oath" — the call declared (unanswered) number(s) promised
[reskin] value check: "Dead Man's Oath" EV 4.7 vs floor 5.5 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature under the floor, and kept: "Dead Man's Oath" — the ladder could not lift it and nothing stands in, so the row the model wrote stays as written
[reskin] signature authored: no template — the seat wrote it -> Bonus Actions/"Dead Man's Oath" ("The reeve fixes its hollow visor on one creature it can see and speaks a dead man's oath aloud; that creature must succeed on a Wisdom saving throw or be Fright [authored: the catalog held no shape for it]")
[reskin] condition rider rides the attack: trait — the payoff family composes a rider, so the idea is re-seated trait/always -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (trait): "When the reeve flies in a straight line toward a creature and ends its move within reach, the first Lance attack it makes that turn is a charge: on a hit, necrotic frost blooms from the point of impact, and the target must succeed on a Constitution saving throw or have its Speed halved until the end of the reeve's next turn as the grave-cold seizes its limbs." [rider/on_hit/condition] [family: payoff] — menu: affliction, contagion, stunning-strike, charge-push, pounce, isolation, life-drain, charge (+ shelf: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, gaze-aura, assassinate, guarded-stance, berserk)
[reskin] lead by this seat's own clause: trait — "charge" from the clause this seat serves, not the sheet's "fear"
[reskin] composed candidates on the menu: trait — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — charge: pounce, charge
[reskin] menu ordered by the idea's stamps: trait — idea fires on_hit/does condition; leading: pounce (on_hit/condition), charge (on_hit/damage), affliction (on_hit/condition)
[reskin] keys would have bound: trait — charge, fear-aura (charge, lance, frightens, frightening)
[reskin] classification handed to the fit call: mechanic=gaze shape=attack
[reskin] word match declined by the call: charge, charge-push, pounce, contagion, affliction — the key word does not mean the mechanic here
[reskin] closest refused: trait — "charge" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: slows the target's Speed with a save on a charge hit)
[reskin] seat answered, but: the call said "When the reeve flies in a straight line toward a creature and ends its move within reach, the first Lance attack it make" is carried by "Grave-Cold Charge", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "When the reeve flies in a straight line toward a creature and ends its" and wrote no row of that kind (refused: "Grave-Cold Charge" — a strike says what the failed save costs: a condition, a forced movement, or a curse)
[reskin] seat asked again: trait — the first answer was refused ("Grave-Cold Charge" — a strike says what the failed save costs: a condition, a forced movement, or a curse); asking once more with the reason
[reskin] seat authored nothing: trait — the call was asked to write a trait for "When the reeve flies in a straight line toward a creature and ends its" and wrote no row of that kind (it belongs in the description)
[reskin] seat refused twice: trait — first: "Grave-Cold Charge" — a strike says what the failed save costs: a condition, a forced move; second: it belongs in the description; the seat stays empty
[reskin] the declared ask's own template lands: trait — the sheet's declared ask is "charge", the seat that carries it ended with no row, and "relentless-pursuit" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] free signature row: trait — "relentless-pursuit" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "spectral lance charge that skewers and chills" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] seat default withheld: phantom owes gaze-aura by print, and the sheet still has 2 unanswered ask(s) of the GM's own — print carries zero traits on 126 of 329 blocks, so the slot stays empty rather than shipping shape-picked filler
[reskin] free signature row: "Grave-Cold Charge" — the trait seat cannot quote the GM, but the call names the element it expresses: "spectral lance charge that skewers and chills". Earns no clause credit; the homebrew path allows 1 and this is number 2
[reskin] signature template (trait): relentless-pursuit -> Traits/"Grave-Cold Charge" ("The idea is a charge rider that on a hit blooms necrotic frost, forcing a CON sa [shape fit, no verb match]")
[reskin] weapons answered: Lance = lance
[reskin] weapon dice follow the weapon: the GM's "Lance" is a lance (d10) — "18 (3d8 + 5)" becomes "16 (2d10 + 5)"
[reskin] weapon reach follows the weapon: the GM's "Lance" is a lance — reach 5 ft becomes 10 ft
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] name-canon stands down: the path answered homebrew on "ghost knight, resistant to nonmagical we" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Grave-Cold Charge" [trait/always/movement]
[reskin] asked but unanswered: "reaction to parry" asked for on_being_hit and no row binds the clause
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element claim revoked: "Grave-Cold Charge" claims "spectral lance charge that skewers and chills" but the audit judged that nothing in the row carries it; the name carries "charge" and may not advertise what the rules do not do — flagged decoration for the rename pass
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Grave-Cold Charge")
[reskin] audit: [Incorporeal Movement: The creature is immune to Pr… and objects as if they were Difficult Terrain."), Grave-Cold Charge: The trigger requires the GM to …reature it has damaged within the last 24 hours"), Grave-Cold Charge: The GM asked for a lance charge…ifficult Terrain doesn't cost it extra movement"), Dead Man's Oath: Frightened until the end of the t…tened condition until the end of its next turn.")]
[reskin] audit defect: Traits/"Incorporeal Movement" [print] medium other — The creature is immune to Prone, Grappled, and Restrained but has a 5 ft. walking Speed and hover flight, yet this trait's 'difficult terrain' cost applies to a mover with no ground movement worth the label — the clause is inert on a hoverer and offers no counterplay distinction. — Trim or reframe the clause so it does not define terrain cost for a creature whose movement is hover flight. (about: "The reeve can move through other creatures and objects as if they were Difficult Terrain.")
[reskin] audit defect: Traits/"Grave-Cold Charge" [model-written] high untrackable — The trigger requires the GM to track which creatures the reeve damaged over the previous 24 hours and which way the reeve is currently moving relative to them — state the block gives no way to record or verify at the table. — Replace the damage-history and facing-dependent trigger with a self-contained condition the GM can read off the current turn. (about: "While the reeve is moving toward a creature it has damaged within the last 24 hours")
[reskin] audit defect: Traits/"Grave-Cold Charge" [model-written] high undelivered — The GM asked for a lance charge that deals extra 3d8, but this trait delivers only movement-mode immunities and no charge payload — the extra damage lives nowhere in the block. — Give the charge an actual attack payoff (extra damage or a rider on a charge) rather than only movement riders. (about: "the reeve's Speed can't be reduced and Difficult Terrain doesn't cost it extra movement")
[reskin] audit defect: Bonus Actions/"Dead Man's Oath" [model-written] medium weak — Frightened until the end of the target's next turn expires before the reeve's following turn can capitalize, and grants no other effect — the look frightens for a heartbeat and costs the reeve its bonus action. — Extend the duration or add teeth so the fright persists long enough to matter in the fight. (about: "The target has the Frightened condition until the end of its next turn.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] slows the target's Speed with a save on a charge hit — "When the reeve flies in a straight line toward a creature and ends its move within reach, the first Lance attack it makes that turn is a charge: on a hit, necrotic frost blooms from the point of impact, and the target must succeed on a Constitution saving throw or have its Speed halved until the end of the reeve's next turn as the grave-cold seizes its limbs." — Oathfallen Reeve [seat: trait [rider/on_hit/condition]] (closest offered: charge) [effect: condition] [menu: pounce charge affliction contagion stunning-strike life-drain composed:payoff:condition charge-push isolation] [same-cell unoffered: snatch bolt-restrain bolt-mark] [same-seat rejected: hook-rider:body-verdict snatch:movement bolt-restrain:role bolt-drag:host-row bolt-mark:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Oathfallen Reeve" — donor lurker-5-phantom, CR 10
[reskin] ledger: 3 ask(s) — 2 answered (2 by receipt or anchor, 0 handed), 0 mismatch, 1 open (1 never-written)
[reskin] ledger facts: 3 typed fact(s) — 3 the sheet agrees with, 0 it does not
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 27-oathfallen-reeve.json — 1 recorded answer(s) unused
```

---

## 28-madame-zolga

## 28. Madame Zolga — CR 8

**Input:** `name: Madame Zolga | fortune teller. legendary actions: 3. can reroll one attack against her per round. casts hold person and mirror image. immune to charm | role: caster`
**Donor:** caster-6 -> CR 8
**Signature:** dropped

### Block
```
Madame Zolga
Medium humanoid, neutral
Armor Class

15

Hit Points: 

135 (30d8)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


9 (-1)

	

14 (+2)

	

11 (+0)

	

18 (+4)

	

12 (+1)

	

11 (+0)

Skills: 

Arcana +7, Perception +4

Saving Throws: 

INT +7, WIS +4

Condition Immunities: 

charmed

Senses: 

passive Perception 14

Languages: 

Common and any three languages

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Fickle Fortune.When an attack roll is made against Madame Zolga, Madame Zolga can force the attacker to reroll the attack roll once per round, and the attacker must use the new roll.
Misty Step (3/Day) (Bonus Action).Madame Zolga casts Misty Step, using the same spellcasting ability as Spellcasting.
Protective Magic (3/Day) (Reaction).When Madame Zolga is hit by an attack roll, Madame Zolga casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Madame Zolga makes three Arcane Burst attacks.
Arcane Burst: Melee or Ranged Spell Attack: +7 to hit, reach 5 ft. or range 120 ft., one target. Hit: 17 (3d8 + 4) force damage.
Spellcasting: Madame Zolga casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 15): - At will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
2/day each: Fireball, Invisibility
1/day each: Cone of Cold, Fly
```

### Trace
```
!! [ENRICHMENT] Failed to enrich Oathfallen Reeve: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 27 taken name(s) the recording carried
[path] class_npc — class mage — "fortune teller" (call)
[route] caster (artillery) type=Humanoid mechanics=none — casts: on the GM's own words "casts hold person and mirror image" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: ✓ ("casts hold person and mirror image") | brute-grappler: the call read "hold" as not meaning that mechanic here — no override | caster-binder -> caster: the concept's VERB outranks the noun (key "casts", class verb) | caster: key "casts" (class verb)
[concept] name: "Madame Zolga" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=beguiling/uncanny mind=sapient style=— energy=Psychic mix=energy identity=✓ lore=✓
[concept] name: provided "Madame Zolga"
[concept] mechanics: none claimed
[concept] signature elements: rerolling an attack against her — fate refuses the strike [behavior] | mirror image as a deck of false selves [behavior] | the fortune teller's table and cards [object]
[concept] identity: Madame Zolga opens by letting the marks come to her — mirror images peeling off her like bad cards while she reads their fates and drops a hold person on the one who looks most dangerous. Every round after she keeps her distance, punishing the party with fate-bending accuracy while her duplicates soak the blows, and once per round she snatches a hit out of the air and rerolls it, because that strike was never in the cards. Cornered and bloodied, she does not flee; she turns cold and surgical, spending her legendary actions to fix the odds against whoever wounded her, certain she has already seen how this ends.
[concept] lore: Madame Zolga sold her true fortune to something that answers only when the cards are cut, and now she wanders the fairgrounds and back alleys telling paying customers a future she has already arranged for them.
[reskin] energy withheld: Psychic on a Humanoid with no Psychic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 8
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 18, WIS 12, CHA 11 — the Mage's, INT fitted to +7
[reskin] donor: caster-6 -> CR 8
[reskin] seats: action <- "rerolling an attack against her — fate refuses the strike" | trait <- "the fortune teller's table and cards"
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said homebrew)
[reskin] print canon: "Madame Zolga — fortune teller. legendary actions: 3. can reroll one attack against her per round. casts hold person and mirror image. immune to charm" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "fortune teller": nothing to add — the sheet already answers it
[reskin] proper noun: "Madame Zolga" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Madame Zolga" — the call's own answer (person), built from the name
[reskin] control spell gated to daily — Hold Person (level 2 control at will is print's CR 13+ shape; at CR 8 it is 1/Day)
[reskin] spell DC coherence: DC 16 -> 15 off Intelligence 18 (the stat makes the attack rolls)
[reskin] save dc derived: DC 16 -> 15 (8 + PB 3 + Intelligence's 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: charm — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Madame Zolga — fortune teller" -> has (descriptive), head | "legendary actions: 3" -> has (mechanical) [asked: at_will] | "can reroll one attack against her per round" -> has (mechanical) [asked: on_being_hit/once_per_turn/buff_self] | "casts hold person and mirror image" -> has (mechanical) [asked: at_will/condition] | "immune to charm" -> has (header)
[reskin] open asks handed to the idea call: "legendary actions: 3" · "can reroll one attack against her per round" · "casts hold person and mirror image" (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "Madame Zolga cuts the deck and deals one card face-down before a creat" answers the GM's "can reroll one attack against her per round"
[reskin] idea unanchored: trait — "Madame Zolga's table is always set: she carries a spread of glimmering" names none of the 3 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 34 of 34 answered; not true of this body: snare, zone, seal, active-toll, random-ray, spew, snare-bolt, herd, drain, zone-seed, blighted-ground, rally, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, warded-mending, gaze-aura, blurred-form, death-burst, kill-denial
[reskin] menu: taste stands down — action answers the GM's "can reroll one attack against her per round", so role and style do not filter the menu (legality still does); 18 template(s) offered
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Madame Zolga cuts the deck and deals one card face-down before a creature she can see; that creature must make a Wisdom saving throw. On a failure it is Charmed by her until the end of her next turn, believing every word she says about its future and unable to bring itself to strike the woman holding its fate in her hands — and while Charmed this way, the first attack it makes against her is made " [action/save/condition] [family: mark] — menu: thrown-burst, gaze-single, execute, wail, lure, ground-burst, pacify, escalating-dread, slow-bolt, sensory-strike, thrown-burst-seed, curse-debt, reveal, wind-up, throw-retrieve, terror-pulse, disarm, push-prone (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rampage, patient-defense, second-wind, focus, feint-slip, bolt-restrain, bolt-drag, bolt-mark)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — charm: lure, pacify
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), pacify (save/condition), gaze-single (save/condition)
[reskin] keys would have bound: action — pacify (hold)
[reskin] classification handed to the fit call: often=at_will
[reskin] word match declined by the call: lure, pacify, gaze-single, escalating-dread, terror-pulse — the key word does not mean the mechanic here
[reskin] closest refused: action — "lure" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: forces a reroll of an attack against her)
[reskin] clause already answered: "can reroll one attack against her per round" is carried by "Fated Fumble" — the seat read the sheet and declined to write a second row for it
[reskin] seat stands down: action — "can reroll one attack against her per round" is already carried by a row on this sheet; no second row is written for it
[reskin] closest refused — subject flipped: action — the call named "lure" nearest and judged its subject FLIPPED against the clause (forces a reroll of an attack against her); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] the declared ask's own template lands: action — the sheet's declared ask is "charm", the seat that carries it ended with no row, and "aggro-curse" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] signature miss: action — "aggro-curse" quotes nothing the GM typed, matches no key-table verb, and the call named none of this creature's own elements for it: decoration, not a signature
[reskin] signature seat empty — no template held the idea and the seat wrote no row; nothing stands in (owner, 2026-11-23)
[reskin] signature idea (trait): "Madame Zolga's table is always set: she carries a spread of glimmering cards that float and cut themselves in the air around her, and any creature that starts its turn within reach of that shuffling spread must succeed on a Wisdom saving throw or have the next attack roll it makes against her before the start of its next turn be rolled twice, with her choosing which result stands — the reading has" [trait/start_of_turn/condition] [family: zone] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, mimicry, truth-aura, fear-aura, berserk, evasion, guarded-stance
[reskin] verb gate stands down: trait — no template shares a verb, but 2 template(s) whose declared stamps match the idea (start_of_turn/condition): truth-aura, fear-aura; the declared data is the warrant and the call is worth making
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), phobia (always/condition)
[reskin] classification handed to the fit call: often=at_will
[reskin] word match declined by the call: truth-aura, fear-aura, phobia — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: forces a reroll of an attack made against her, choosing which result s)
[reskin] seat answered, but: the call said "Madame Zolga's table is always set: she carries a spread of glimmering cards that float and cut themselves in the air ar" is carried by "The Table Is Always Set", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Madame Zolga's table is always set: she carries a spread of glimmering" and wrote no row of that kind (refused: "The Table Is Always Set" — a trait is not a save, and this fires on creatures NEAR the creature at the start of their turns — that is an aura, which print writes as a trait (the Ghast's Stench). Answer in "auras" with "name", "stat", "radius" (5, 10, 20 or 30) and "condition" (one of Poisoned/Frightened/Charmed/Prone). The engine writes the sentence, the DC, the ending and the immunity line) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("The Table Is Always Set" — a trait is not a save, and this fires on creatures NEAR the creature at the start ); asking once more with the reason
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Madame Zolga's table is always set: she carries a spread of glimmering" and wrote no row of that kind (it belongs in the description)
[reskin] seat refused twice: trait — first: "The Table Is Always Set" — a trait is not a save, and this fires on creatures NEAR the cr; second: it belongs in the description; the seat stays empty
[reskin] closest refused — subject flipped: trait — the call named "guarded-stance" nearest and judged its subject FLIPPED against the clause (forces a reroll of an attack made against her, choosing which result s); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Madame Zolga's table is always set: she carries a spread of glimmering cards that float and cut themselves in the air around her, and any creature that starts its turn within reach of that shuffling spread must succeed on a Wisdom saving throw or have the next attack roll it makes against her before the start of its next turn be rolled twice, with her choosing which result stands — the reading has" [trait/start_of_turn/condition] — the model found no template that holds it (offered: truth-aura, fear-aura, phobia, berserk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, mimicry, evasion, guarded-stance)
[reskin] repair: 2 clause(s) with no row — "legendary actions: 3", "can reroll one attack against her per round"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [{"clause":"legendary actions: 3","row":"Spellcasting"}], unplaced []
[reskin] clause already answered: "legendary actions: 3" is carried by "Spellcasting" in different words — the call read the sheet and declined to answer it twice
[reskin] condition relation: "Fickle Fortune" — the call reads its condition as none, so no condition is recorded against it
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Glimmering Cards = none
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Glimmering Cards" -> "Arcane Burst" — the Mage's own row
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] free-row budget by card size: CR 8 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] ask vs row ok: "legendary actions: 3" -> "Spellcasting" — limit at_will
[reskin] ask vs row MISMATCH: "can reroll one attack against her per round" -> "Fickle Fortune" — trigger: asked on_being_hit, row reads at_will; limit: asked once_per_turn, row reads at_will
[reskin] asked but unanswered: "casts hold person and mirror image" asked for at_will and no row binds the clause
[reskin] lint: 0 findings
[reskin] audit: [Fickle Fortune: The GM asked for the attacker to r… round, and the attacker must use the new roll."), Fickle Fortune: The trigger fires on the roll bein…hen an attack roll is made against Madame Zolga"), Spellcasting: The GM asked for hold person and mir…bout: "2/Day Each:** *Fireball*, *Invisibility*"), Multiattack: The GM asked for legendary actions (3…"Madame Zolga makes three Arcane Burst attacks.")]
[reskin] audit defect: Traits/"Fickle Fortune" [model-written] high other — The GM asked for the attacker to reroll — 'must use the new roll' removes the attacker's agency and makes a reroll that can land higher, which is counter to every reroll-imposition in the game (the attacker should be made to take the worse of the two). — Rewrite so the attacker rerolls and uses the lower of the two rolls, matching the intended defensive fortune effect. (about: "Madame Zolga can force the attacker to reroll the attack roll once per round, and the attacker must use the new roll.")
[reskin] audit defect: Traits/"Fickle Fortune" [model-written] medium untrackable — The trigger fires on the roll being made, before the result is known, forcing the GM to interrupt every single attack against her mid-roll to decide whether to spend the once-per-round use. — Retime the trigger to after the attack roll hits or misses so the GM can resolve it in one step. (about: "When an attack roll is made against Madame Zolga")
[reskin] audit defect: Actions/"Spellcasting" [print] high undelivered — The GM asked for hold person and mirror image; neither spell appears in the Spellcasting list. — Add hold person and mirror image to the Spellcasting list at an appropriate frequency. (about: "2/Day Each:** *Fireball*, *Invisibility*")
[reskin] audit defect: Actions/"Multiattack" [catalog] high undelivered — The GM asked for legendary actions (3) and the block has no Legendary Actions section at all. — Add a Legendary Actions section with three legendary-action options. (about: "Madame Zolga makes three Arcane Burst attacks.")
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "fortune teller" which is not a whole clause — the seat surgery cut it; resolved to cl_1bqoqq7
[reskin] [gap] forces a reroll of an attack against her — "Madame Zolga cuts the deck and deals one card face-down before a creature she can see; that creature must make a Wisdom saving throw. On a failure it is Charmed by her until the end of her next turn, believing every word she says about its future and unable to bring itself to strike the woman holding its fate in her hands — and while Charmed this way, the first attack it makes against her is made " — Madame Zolga [seat: action [action/save/condition]] (closest offered: lure) [effect: defense] [menu: lure pacify gaze-single escalating-dread sensory-strike reveal terror-pulse push-prone thrown-burst execute ground-burst slow-bolt thrown-burst-seed curse-debt wind-up disarm wail throw-retrieve] [same-cell unoffered: swallow snare seal shield-bash random-ray snare-bolt exploiter] [same-seat rejected: swallow:role trample:role leap:role snare:body-verdict reel:hold-shape condition-payoff:needs-imposed seal:body-verdict shield-bash:role hook-drag:role active-toll:body-verdict pull-through:role random-ray:body-verdict spew:body-verdict burrow-ambush:movement obstacle-pull:hold-shape snare-bolt:body-verdict herd:body-verdict drain:body-verdict exploiter:role blighted-ground:body-verdict] [row dropped]
[reskin] [gap] forces a reroll of an attack made against her, choosing which result stands — "Madame Zolga's table is always set: she carries a spread of glimmering cards that float and cut themselves in the air around her, and any creature that starts its turn within reach of that shuffling spread must succeed on a Wisdom saving throw or have the next attack roll it makes against her before the start of its next turn be rolled twice, with her choosing which result stands — the reading has" — Madame Zolga [seat: trait [trait/start_of_turn/condition]] (closest offered: guarded-stance) [effect: defense] [menu: truth-aura fear-aura phobia berserk bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind relentless-pursuit bound relic-object undead-fortitude mimicry evasion guarded-stance] [same-cell unoffered: noxious-aura gaze-aura] [same-seat rejected: energy-aura:deny-type noxious-aura:deny-type warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] signature outcome: 2 of 2 accepted signature pick(s) never reached the sheet — 2x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 2 of 2 (2x the call named no template for the pick) · path class_npc
[reskin] header clause: immune to Charmed — "immune to charm"
[reskin] done: "Madame Zolga" — donor caster-6, CR 8
[reskin] ledger: 3 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 1 mismatch, 1 open (1 spell-missing)
[reskin] ledger facts: 1 typed fact(s) — 1 the sheet agrees with, 0 it does not
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 28-madame-zolga.json
```

---

## 29-cinder-crucible-golem

## 29. Cinder Crucible Golem — CR 5

**Input:** `golem that explodes when it dies, 30 ft radius, 6d6 fire, dex save half`
**Donor:** brute-5-juggernaut -> CR 5
**Signature:** library

### Block
```
Cinder Crucible Golem

Large Construct, Unaligned

AC 14
Initiative -1 (9)

HP 102 (12d10 + 36)

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

Immunities Fire, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Understands the languages of its creator but can't speak

CR 5 (XP 1,800; PB +3)

Traits

Death Burst. The crucible golem explodes when it dies. Dexterity Saving Throw: DC 14, each creature in a 10-foot Emanation originating from the crucible golem. Failure: 9 (2d8) Fire damage. Success: Half damage.

Fire Absorption. Whenever the crucible golem is subjected to Fire damage, it takes no damage and instead regains a number of Hit Points equal to the Fire damage dealt.

Immutable Form. The crucible golem can't shape-shift.

Magic Resistance. The crucible golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The crucible golem makes two Iron Fist attacks.

Iron Fist. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Fire damage.

Shattered Crucible Burst (Recharge 5-6). The crucible golem begins gathering destructive power, its whole frame tensing. At the end of its next turn, after it has moved, the power erupts. Dexterity Saving Throw: DC 14, each creature in a 20-foot Emanation originating from the crucible golem at that moment. Failure: 26 (4d12) Fire damage. Success: Half damage.

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
!! [ENRICHMENT] Failed to enrich Madame Zolga: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 28 taken name(s) the recording carried
[path] homebrew — "golem that explodes when it dies, 30 ft radius, 6d6 fire, dex save half" (call)
[route] brute-juggernaut type=Construct mechanics=aura, breath — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("golem") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] hints: golem→canon ✓ ("golem that explodes when it dies")
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=forged/elemental mind=mindless style=juggernaut energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura, breath
[concept] signature elements: death-rupture detonation in flame [behavior] | furnace-heart core [body] | sealed iron plating [body]
[concept] identity: A hulking iron-jointed construct that wades into the thickest knot of foes and grinds them down with crushing blows, saving its ruinous death for the moment it is surrounded — its furnace-heart overloading and detonating in a bloom of flame that leaves nothing standing near its shattered carcass. It does not retreat, does not negotiate, and cannot be reasoned out of its final eruption; every killing blow a foe lands simply arms the blast. Its maker's orders are the only voice it hears, and the last of them is always to die where it does the most damage.
[concept] lore: Forged in the deep foundries of a dying artificer cult, the cinder-golem is a walking crucible whose only remaining instruction is to deliver its furnace-heart to the enemy line — a suicide soldier that considers its own destruction a weapon.
[reskin] mind tier held: INT stays 6 against "feeble" — the call read this creature as mindless, and the card's 6 is already that dim
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] donor: brute-5-juggernaut -> CR 5
[reskin] seats: action <- "death-rupture detonation in flame" | trait <- "furnace-heart core"
[reskin] [path] decides: homebrew (the matcher would have said twist Flesh Golem)
[reskin] name_element answered: Cinder Crucible Golem = imagery
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the crucible golem" — the call's own answer (kind), built from the name
[reskin] inline form: "the crucible golem" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: burst — the route call's one answer for the whole concept
[reskin] alignment by mind: "Neutral" -> Unaligned — a Construct the call reads as mindless at INT 6 holds no ethics (owner's ruling, 2026-11-15)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "golem" -> has (descriptive), head | "explodes when it dies" -> has (descriptive) | "30 ft radius" -> has (descriptive) | "6d6 fire" -> has (descriptive) | "dex save half" -> has (descriptive)
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (5 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "When the golem's furnace-heart is torn open at its death, it does not " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The golem's furnace-heart blazes so hot that it sheds a wreath of sear" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 32 of 32 answered; not true of this body: shield-bash, active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, false-appearance, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, relic-object, warded-mending, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "When the golem's furnace-heart is torn open at its death, it does not merely erupt — it vents a roiling bloom of flame into everything around its shattered carcass. Each creature in the blooming fire must make a Dexterity saving throw, taking Fire damage on a failure and half as much on a success as the blast washes over it." [action/save/damage] [family: nova] — menu: throw-retrieve, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, trample, execute, curse-debt (+ shelf: leap, second-wind, aggro-curse, self-invisibility, focus, answering-strike, stunning-strike, charge-push, pounce)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — burst: throw-retrieve, ground-burst, thrown-burst-seed
[reskin] menu ordered by the idea's stamps: action — idea fires save/does damage; leading: throw-retrieve (always/damage), ground-burst (save/damage), thrown-burst-seed (save/damage)
[reskin] keys would have bound: action — thrown-burst-seed (explode)
[reskin] classification handed to the fit call: mechanic=aura, breath
[reskin] pick kept on the GM's own words: action — "wind-up" has no key-table verb, but the call quotes "golem that explodes when it dies ft radius d fire dex save half" from the description
[reskin] value check: "Shattered Crucible Burst (Recharge 5-6)" EV 20.2 vs floor 19.9 (the whole Multiattack (2 attacks)) — priced at the floor: dice 22 → 26
[reskin] signature template: wind-up -> Actions/"Shattered Crucible Burst (Recharge 5-6)" ("the golem's furnace-heart is torn open at its death and vents a roiling bloom of [shape fit, no verb match]")
[reskin] signature idea (trait): "The golem's furnace-heart blazes so hot that it sheds a wreath of searing air; a creature that starts its turn within the heat must make a Constitution saving throw or take Fire damage as the air scorches its lungs. The glow casts bright light around it." [trait/start_of_turn/damage] [family: zone] — menu: phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, truth-aura, fear-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:damage (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — burst: death-burst
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does damage; leading: death-burst (always/damage), energy-aura (start_of_turn/damage), composed:zone:damage (start_of_turn/damage)
[reskin] keys would have bound: trait — death-burst (explode, die)
[reskin] classification handed to the fit call: mechanic=aura, breath
[reskin] word match declined by the call: energy-aura, composed:zone:damage, heated-body — the key word does not mean the mechanic here
[reskin] signature template (trait): death-burst -> Traits/"Cinder Burst" ("The golem explodes when it dies, dealing 6d6 Fire damage to creatures in a 30-fo [verb: explode:concept, die:concept]")
[reskin] one mechanic, one name: Traits/"Cinder Burst" -> "Death Burst" — this row is death-burst and does what every death-burst row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Iron Fist = none; Overload Surge = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] absorption re-keyed: Lightning -> Fire (the donor organ obeys the concept energy)
[reskin] element immunity: Fire — the call read this creature's energy as Fire and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Fire (merged into the header write)
[reskin] immunities stamped for type: Construct -> Fire, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "golem that explodes when it dies, 30 ft " and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget by card size: CR 5 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] row binds its clause: "Death Burst" answers "explodes when it dies" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] lint: 0 findings
audit finding below confidence gate: Shattered Crucible Burst The eruption is anchored to 'that moment' one full turn after the action is spent, so the GM must remember which creature is charging, whether and where it moved, and re-measure a 20-foot emanation a round later — all while the creature's own Multiattack exists as an alternative, making the deferred payoff hard to run and easy to forget.
[reskin] audit: [Death Burst: The GM explicitly asked for a 30-foot…ity save for half. (about: "9 (2d8) Fire damage")]
[reskin] audit defect: Traits/"Death Burst" [catalog] high undelivered — The GM explicitly asked for a 30-foot, 6d6 explosion on death, and the assembled Death Burst delivers a 10-foot emanation for a meager 2d8 — the death explosion the creature is named and built around barely threatens anyone. — Rebuild the row to the requested 30-foot emanation and 6d6 Fire payload with the same DC-14 Dexterity save for half. (about: "9 (2d8) Fire damage")
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Cinder Crucible Golem" — donor brute-5-juggernaut, CR 5
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 29-cinder-crucible-golem.json — 1 recorded answer(s) unused
```

---

## 30-cliffroad-outrider

## 30. Cliffroad Outrider — CR 9

**Input:** `wyvern rider knight, mounted, lance and shield, wyvern has the stinger`
**Donor:** skirmisher-8-mounted -> CR 9 (invented — no printed peer)
**Signature:** dropped

### Block
```
Cliffroad Outrider

Large Dragon, Unaligned

AC 17
Initiative +0 (10)

HP 136 (16d10 + 48)

Speed 30 ft., Fly 80 ft. (hover)

MOD
SAVE
STR
19
+4
+4
INT
5
-3
-3
MOD
SAVE
DEX
10
+0
+4
WIS
12
+1
+5
MOD
SAVE
CON
16
+3
+3
CHA
6
-2
-2

Skills Perception +5, Stealth +4

Senses Passive Perception 15

Languages Common

CR 9 (XP 5,000; PB +4)

Traits

Lingering Venom. When the outrider hits a creature that has the Poisoned condition from its Stinger with its Lance, the Lance deals an extra 9 (2d8) Poison damage.

Great Weapon Master. When the outrider hits a creature with its Lance, the attack deals an extra 4 damage.

Actions

Multiattack. The outrider makes three attacks, using Lance or Stinger in any combination.

Lance. Melee Attack Roll: +8, reach 10 ft. 20 (3d10 + 4) Piercing damage. If the outrider moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 7 (2d6) Piercing damage and, if it is Large or smaller, has the Prone condition.

Stinger. Melee Attack Roll: +8, reach 5 ft. 22 (4d8 + 4) Piercing damage, and the target has the Poisoned condition until the end of its next turn.

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
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
!! [ENRICHMENT] Failed to enrich Cinder Crucible Golem: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 29 taken name(s) the recording carried
[path] twist — Wyvern (is) — class fighter — "wyvern" (call)
[route] skirmisher-mounted type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-mounted: ✓ ("wyvern rider knight, mounted") | skirmisher-mounted: key "rider" (class verb)
[concept] hints: mounted→style ✓ ("wyvern rider knight, mounted")
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=armed/aerial mind=sapient style=mounted energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: lance charge carried past the target [behavior] | the wyvern's venomous stinger [body] | rider's shield and lance [object]
[concept] identity: The knight opens with a screaming dive, lance levelled, and the wyvern's momentum carries the pair clean past the target — then the beast wheels and the stinger whips over the rider's shield to poison whatever survived. After the first pass it fights at the edge of reach, lance and sting trading strikes while the knight uses his shield to weather return blows, and the pair only breaks off when the wyvern is bloodied, circling to charge again rather than fleeing. Proud and disciplined, the rider is no berserker — he kills cleanly, tests a foe's guard before committing, and treats the duel as a craft.
[concept] lore: Outcast riders who tamed wyverns rather than swear to any crown, they haunt the cliff roads and want little more than the toll of a rich caravan — and the chance to prove their beast and their lance against anything worth the dive.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] the concept outranks the alias: the Wyvern is a Dragon and the concept reads Humanoid — the words RESEMBLE it, they do not name it, so the alias match stands down. Print canon is decided separately and may still run on this sheet
[reskin] print canon array: STR 19, DEX 10, CON 16, INT 5, WIS 12, CHA 6 — the Wyvern's, STR fitted to +8
[reskin] donor: skirmisher-8-mounted -> CR 9 (invented — no printed peer)
[reskin] seats: action <- "lance charge carried past the target" | trait <- "the wyvern's venomous stinger"
[reskin] [path] decides: twist on the Wyvern · class fighter (the matcher would have said homebrew)
[reskin] print canon: "wyvern rider knight, mounted, lance and shield, wyvern has the stinger" heads on the Wyvern — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] named parts: Lance (slot), Stinger (clone, Poisoned) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] features: Great Weapon Master (trait) — the feature table, no call
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the outrider" — the call's own answer (kind), built from the name
[reskin] inline form: "the outrider" — the model's own reading of the name
[reskin] final price: the chassis's Multiattack: the round ran 51 against the card's 70 — the attack rows re-solve at 137% (3 attacks on an authored sheet, under the card)
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "wyvern rider knight" -> has (descriptive), head | "mounted" -> has (mechanical) [asked: movement] [askMechanic: charge] | "lance and shield" -> has (mechanical) [asked: attack] [askMechanic: charge] | "wyvern has the stinger" -> has (mechanical) [asked: save_single] [askMechanic: curse]
[reskin] open asks handed to the idea call: "mounted" [charge] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "As a bonus action, the outrider chooses a creature it can see within 5" answers the GM's "mounted"
[reskin] idea unanchored: trait — "The wyvern's venom lingers—whenever a creature Poisoned by the outride" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 25 of 25 answered; not true of this body: snare-bolt, phase-slip, rally, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "mounted", so role and style do not filter the menu (legality still does); 4 template(s) offered
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "As a bonus action, the outrider chooses a creature it can see within 5 feet and makes a Lance attack against it; on a hit, the target is pushed 10 feet away and the outrider may immediately move up to 10 feet in the same direction without provoking Opportunity Attacks, riding the momentum of the blow to set up the next pass." [rider/on_hit/movement] [family: drag] — menu: affliction, contagion, stunning-strike, isolation (+ shelf: condition-payoff, throw-retrieve, lure, sensory-strike, disarm, delayed-brand, exploiter, execute, pacify, escalating-dread, terror-pulse, slow-bolt, curse-debt, reveal, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, lay-on-hands, riposte, answering-strike)
[reskin] lead by this seat's own clause: action — "charge" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does movement; leading: affliction (on_hit/condition), contagion (on_hit/condition), stunning-strike (on_hit/condition)
[reskin] keys would have bound: action — throw-retrieve (lance)
[reskin] classification handed to the fit call: shape=movement
[reskin] word match declined by the call: affliction, contagion, stunning-strike, isolation, aggro-curse — the key word does not mean the mechanic here
[reskin] closest refused: action — "stunning-strike" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: pushes the target away and lets the attacker move after it)
[reskin] seat authored nothing: action — the call was asked to write an action for "As a bonus action, the outrider chooses a creature it can see within 5" and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
[reskin] clause already answered: "mounted" is carried by "Screaming Pass" — the seat read the sheet and declined to write a second row for it
[reskin] seat stands down: action — "mounted" is already carried by a row on this sheet; no second row is written for it
[reskin] seat refused twice: action — first: you wrote no row of the kind asked for (an action); second: the sheet already answers that clause; the seat stays empty
[reskin] closest refused — subject flipped: action — the call named "stunning-strike" nearest and judged its subject FLIPPED against the clause (pushes the target away and lets the attacker move after it); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: action — the call answered none and names it "no_fit" — the GM's words key throw-retrieve, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: action — "throw-retrieve" is keyed by the GM's lance and was on the call's menu, which the call read as no fit; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: action — "As a bonus action, the outrider chooses a creature it can see within 5 feet and makes a Lance attack against it; on a hit, the target is pushed 10 feet away and the outrider may immediately move up to 10 feet in the same direction without provoking Opportunity Attacks, riding the momentum of the blow to set up the next pass." [rider/on_hit/movement] — the model found no template that holds it (offered: affliction, contagion, stunning-strike, isolation, aggro-curse)
[reskin] signature seat empty — no template held the idea and the seat wrote no row; nothing stands in (owner, 2026-11-23)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 17 already beats print's 16 at CR 9, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The wyvern's venom lingers—whenever a creature Poisoned by the outrider's Stinger takes damage from the outrider's Lance, that damage increases by 2d6 Poison." [trait/always/damage] [family: payoff] — menu: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (always/damage): blood-frenzy, pack-tactics, assassinate; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), assassinate (always/damage)
[reskin] word match declined by the call: assassinate, blood-frenzy — the key word does not mean the mechanic here
[reskin] closest refused: trait — "blood-frenzy" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: Lance hits on a creature the Stinger has Poisoned deal an extra 2d6 Po)
[reskin] seat answered, but: the call said "The wyvern's venom lingers—whenever a creature Poisoned by the outrider's Stinger takes damage from the outrider's Lance" is carried by "Lingering Venom", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("Lance hits on a creature the Stinger has Poisoned deal an extra 2d6 Po") and wrote a trait instead: "Lingering Venom" -> Traits. When the outrider hits a creature that has the Poisoned condition from its Stinger with its Lance, the Lance deals an ex
[reskin] authored row numbers: "Lingering Venom" — the call declared 1 number(s) promised
[reskin] free signature row: "Lingering Venom" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Lingering Venom" is HANDED "rider knight" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Lingering Venom" ("The wyvern's venom lingers—whenever a creature Poisoned by the outrider's Stinger takes damage from the outrider's Lance, that damage increases by 2d6 Poison. [authored: the catalog held no shape for it]")
[reskin] weapons answered: Lance = Lance; Screaming Pass = none
[reskin] weapon dice follow the weapon: the GM's "Lance" is a lance (d10) — "22 (4d8 + 4)" becomes "20 (3d10 + 4)"
[reskin] weapon reach follows the weapon: the GM's "Lance" is a lance — reach 5 ft becomes 10 ft
[reskin] chassis nova: "Screaming Pass (Recharge 5-6)" — the skirmisher-8-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon size: Medium -> Large — the Wyvern's
[reskin] print canon alignment: Neutral -> Unaligned — the Wyvern's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid -> Dragon — the Wyvern's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon languages: "Common" -> "None" — the Wyvern's
[reskin] print canon speed: 50 ft. -> 30 ft. — the Wyvern's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 80 ft. — the Wyvern's own
[reskin] languages defaulted for sapient: Common
[reskin] print canon: chassis row leaves — Actions/"Screaming Pass (Recharge 5-6)" is the chassis's own nova (the model renamed it), not the Wyvern's
[reskin] print canon: chassis row leaves — Bonus Actions/"Mounted Agility" is the seat's, not the Wyvern's
[reskin] print canon: chassis row leaves — Traits/"Wheeling Dive" is the seat's, not the Wyvern's
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Lingering Venom" [no template]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Lingering Venom carries "the wyvern's venomous stinger" — "has the Poisoned condition from its Stinger"
[reskin] audit: nothing flagged
[reskin] [gap] pushes the target away and lets the attacker move after it — "As a bonus action, the outrider chooses a creature it can see within 5 feet and makes a Lance attack against it; on a hit, the target is pushed 10 feet away and the outrider may immediately move up to 10 feet in the same direction without provoking Opportunity Attacks, riding the momentum of the blow to set up the next pass." — Cliffroad Outrider [seat: action [rider/on_hit/movement]] (closest offered: stunning-strike) [effect: movement] [menu: affliction contagion stunning-strike isolation aggro-curse] [same-cell unoffered: charge-push hook-rider bolt-drag] [same-seat rejected: charge-push:condition-three-ways hook-rider:body-verdict pounce:condition-three-ways life-drain:body-verdict snatch:engine-key bolt-restrain:role bolt-drag:role bolt-mark:host-row charge:condition-three-ways] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Cliffroad Outrider" — donor skirmisher-8-mounted, CR 9
[reskin] ledger: 3 ask(s) — 2 answered (2 by receipt or anchor, 0 handed), 0 mismatch, 1 open (1 removed)
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 30-cliffroad-outrider.json — 1 recorded answer(s) unused
```

---

## 31-skulktaker

## 31. Skulktaker — CR 9

**Input:** `like the predator, invisible hunter with a shoulder cannon, collects trophies`
**Donor:** lurker-8 -> CR 9
**Signature:** dropped

### Block
```
Skulktaker

Medium Monstrosity, Neutral

AC 16
Initiative +4 (14)

HP 127 (17d8 + 51)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
12
+1
+1
INT
15
+2
+6
MOD
SAVE
DEX
18
+4
+8
WIS
20
+5
+5
MOD
SAVE
CON
16
+3
+3
CHA
11
+0
+0

Skills Perception +9, Stealth +12

Senses darkvision 120 ft.; Passive Perception 19

Languages Common

CR 9 (XP 5,000; PB +4)

Actions

Multiattack. The skulktaker makes three attacks, using Claw or Force Cannon in any combination.

Claw. Melee Attack Roll: +8, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Force Cannon. Ranged Attack Roll: +8, range 80/320 ft. 17 (3d8 + 4) Force damage.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the skulktaker takes the Hide action.

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
!! [ENRICHMENT] Failed to enrich Cliffroad Outrider: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 30 taken name(s) the recording carried
[path] homebrew — "invisible hunter with a shoulder cannon, collects trophies" (call)
[route] lurker type=Monstrosity mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker: ✓ ("invisible hunter") | lurker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Monstrosity typeFrom=the route call themes=bestial/armed mind=sapient style=— energy=Force mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: invisibility that ends with a devastating opening strike [behavior] | shoulder-mounted force cannon [object] | trophy-taking from worthy kills [behavior]
[concept] identity: An ambush hunter that opens with a shoulder-mounted force cannon fired from perfect invisibility, then melts back into cover to circle and re-fire rather than trade blows. Between cannon shots it stalks with bone-blade claws, learning a victim's habits before committing, and it disengages bloodied to stalk again rather than fight to the death — but it never abandons the prey it has marked, and it takes a trophy from every kill it finishes.
[concept] lore: A hunting-thing grown from some world's killing instinct, it came across the dark between stars for worthy prey and wears the skulls and hides of its best kills as proof of its own worth.
[reskin] mind tier held: CHA stays 11 against "ordinary" — the card's 11 is already ordinary
[reskin] mind tier: INT 13 -> 15 — the call read this creature as capable at CR 9
[reskin] mind tier: WIS 14 -> 20 — the call read this creature as formidable at CR 9
[reskin] donor: lurker-8 -> CR 9
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] seats: action <- "invisibility that ends with a devastating opening strike" | trait <- "shoulder-mounted force cannon"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the skulktaker" — the call answered "the Skulktaker" (kind), which the name does not support
[reskin] the sheet's declared ask: burst — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "like the predator" -> has (descriptive), head | "invisible hunter with a shoulder cannon" -> has (mechanical) [asked: buff_self] [askMechanic: disguise] | "collects trophies" -> has (mechanical) [asked: on_death] [askMechanic: harvest]
[reskin] open asks handed to the idea call: "invisible hunter with a shoulder cannon" [disguise] · "collects trophies" [harvest] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The skulktaker's force cannon locks onto a target it can see, and on a" answers the GM's "invisible hunter with a shoulder cannon"
[reskin] idea unanchored: trait — "Every creature the skulktaker reduces to 0 hit points is stripped of a" names none of the 2 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 38 of 38 answered; not true of this body: seal, wail, active-toll, random-ray, spew, snare-bolt, drain, zone-seed, blighted-ground, blink, shell-withdraw, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, web-walker, energy-aura, noxious-aura, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, life-drain
[reskin] menu: taste stands down — action answers the GM's "invisible hunter with a shoulder cannon", so role and style do not filter the menu (legality still does); 18 template(s) offered
[reskin] signature idea (action): "The skulktaker's force cannon locks onto a target it can see, and on a failed saving throw the target is outlined in a shimmering force echo—giving away its position and leaving it vulnerable to the skulktaker's next strike, which deals extra force damage and ends the invisibility the skulktaker used to line up the shot." [action/save/condition] [family: mark] — menu: gaze-single, execute, lure, ground-burst, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, thrown-burst, zone, throw-retrieve, disarm, push-prone, thrown-burst-seed, curse-debt, reveal, wind-up (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, rampage, lay-on-hands, second-wind, aggro-curse, riposte, answering-strike, snap-shot, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-drag, bolt-restrain, bolt-mark, charge)
[reskin] lead by this seat's own clause: action — "disguise" from the clause this seat serves, not the sheet's "burst"
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: gaze-single (save/condition), lure (save/condition), pacify (save/condition)
[reskin] keys would have bound: action — self-invisibility (invisible)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=buff_self
[reskin] word match declined by the call: thrown-burst, throw-retrieve, gaze-single, lure, pacify, escalating-dread, terror-pulse, sensory-strike, push-prone, slow-bolt, execute, ground-burst, disarm, curse-debt, wind-up, zone, bolt-restrain, self-invisibility, riposte — the key word does not mean the mechanic here
[reskin] closest refused: action — "reveal" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: marks one target with an outline and empowers the creature's next atta)
[reskin] seat authored nothing: action — the call was asked to write an action for "The skulktaker's force cannon locks onto a target it can see, and on a" and wrote no row of that kind (refused: "Force Echo" — a strike says what the failed save costs: a condition, a forced movement, or a curse)
[reskin] seat asked again: action — the first answer was refused ("Force Echo" — a strike says what the failed save costs: a condition, a forced movement, or a curse); asking once more with the reason
[reskin] seat authored nothing: action — the call was asked to write an action for "The skulktaker's force cannon locks onto a target it can see, and on a" and wrote no row of that kind (refused: "Force Cannon" — a rider says what the hit does: a condition, a forced movement, or a curse)
[reskin] seat refused twice: action — first: "Force Echo" — a strike says what the failed save costs: a condition, a forced movement, o; second: "Force Cannon" — a rider says what the hit does: a condition, a forced movement, or a curs; the seat stays empty
[reskin] decline reason: action — the call answered none and names it "no_fit" — the GM's words key self-invisibility, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: action — "self-invisibility" is keyed by the GM's invisible and was on the call's menu, which the call read as a collision, not the mechanic; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: action — "The skulktaker's force cannon locks onto a target it can see, and on a failed saving throw the target is outlined in a shimmering force echo—giving away its position and leaving it vulnerable to the skulktaker's next strike, which deals extra force damage and ends the invisibility the skulktaker used to line up the shot." [action/save/condition] — the model found no template that holds it (offered: gaze-single, lure, pacify, escalating-dread, terror-pulse, sensory-strike, push-prone, reveal, execute, ground-burst, slow-bolt, thrown-burst, disarm, thrown-burst-seed, curse-debt, wind-up, zone, bolt-restrain, throw-retrieve, self-invisibility, riposte)
[reskin] signature seat empty — no template held the idea and the seat wrote no row; nothing stands in (owner, 2026-11-23)
[reskin] signature idea (trait): "Every creature the skulktaker reduces to 0 hit points is stripped of a trophy—a skull, a hide, a gleaming eye—which the skulktaker integrates into its carapace. For each trophy taken, the skulktaker's force cannon and claws carry a fragment of the victim's essence, adding a cumulative bonus to attack and damage rolls that lasts until it takes a long rest." [trait/always/resource] [family: kill-growth] — menu: spider-climb, phobia, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial, guarded-stance
[reskin] lead by this seat's own clause: trait — "disguise" from the clause this seat serves, not the sheet's "burst"
[reskin] signature miss: trait — "Every creature the skulktaker reduces to 0 hit points is stripped of a trophy—a skull, a hide, a gleaming eye—which the skulktaker integrates into its carapace. For each trophy taken, the skulktaker's force cannon and claws carry a fragment of the victim's essence, adding a cumulative bonus to attack and damage rolls that lasts until it takes a long rest." [trait/always/resource] — no template on the shelf shares a verb with the concept or the idea (offered: spider-climb, phobia, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial, guarded-stance)
[reskin] repair: 1 clause(s) with no row — "collects trophies"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced ["description:collects trophies"]
[reskin] clause answered in prose: "collects trophies" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Claw = none; Force Cannon = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "invisible hunter with a shoulder cannon," and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] asked but unanswered: "collects trophies" asked for on_death and no row binds the clause
[reskin] lint: 0 findings
[reskin] audit: nothing flagged
[reskin] [gap] marks one target with an outline and empowers the creature's next attack against it with bonus force damage — "The skulktaker's force cannon locks onto a target it can see, and on a failed saving throw the target is outlined in a shimmering force echo—giving away its position and leaving it vulnerable to the skulktaker's next strike, which deals extra force damage and ends the invisibility the skulktaker used to line up the shot." — Skulktaker [seat: action [action/save/condition]] (closest offered: reveal) [effect: damage] [menu: gaze-single lure pacify escalating-dread terror-pulse sensory-strike push-prone reveal execute ground-burst slow-bolt thrown-burst disarm thrown-burst-seed curse-debt wind-up zone bolt-restrain throw-retrieve self-invisibility riposte] [same-cell unoffered: swallow snare seal shield-bash random-ray snare-bolt exploiter] [same-seat rejected: swallow:hold-shape trample:role leap:size snare:role reel:role condition-payoff:needs-imposed seal:body-verdict shield-bash:role hook-drag:hold-shape active-toll:body-verdict pull-through:engine-key random-ray:body-verdict spew:body-verdict burrow-ambush:movement obstacle-pull:hold-shape snare-bolt:body-verdict herd:role drain:body-verdict exploiter:needs-imposed blighted-ground:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Skulktaker" — donor lurker-8, CR 9
[reskin] ledger: 2 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 2 open (2 never-written)
[harness] enrichment not run (3 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 31-skulktaker.json — 1 recorded answer(s) unused
```

---

## 32-drowned-shade

## 32. Drowned Shade — CR 6

**Input:** `jaws but its a lake and the shark is a ghost`
**Donor:** lurker-5 -> CR 6
**Signature:** dropped

### Block
```
Drowned Shade
Large undead, neutral
Armor Class

14 (natural armor)

Hit Points: 

112 (15d10 + 30)

Speed: 

40 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


12 (+1)

	

16 (+3)

	

15 (+2)

	

12 (+1)

	

15 (+2)

	

6 (-2)

Skills: 

Perception +5, Stealth +9

Saving Throws: 

DEX +6

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

None

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Spectral Predator.The shade's body is a drowned shark's ghost: it can move through other creatures and objects as if they were difficult terrain, and it takes no damage from nonmagical bludgeoning, piercing, or slashing attacks.
Still Water Lies.While the shade is submerged, its ripples, wake, and surface disturbance are indistinguishable from ordinary lake movement, so a creature can't tell it from the water itself until it breaches unless that creature has watched the surface without interruption for 1 minute.
Umbral Step (Bonus Action).While in Dim Light or Darkness, the shade takes the Hide action.

Actions
Multiattack: The shade makes two Jaws attacks.
Jaws: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) piercing damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 12).
```

### Trace
```
!! [ENRICHMENT] Failed to enrich Skulktaker: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 0 taken name(s) the recording carried
[path] homebrew — "jaws but its a lake and the shark is a ghost" (call)
[route] lurker type=Undead mechanics=grapple — casts: the call reads no worked magic here | hold_shape: medium on the GM's own words "its a lake and the shark is a ghost" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-phantom: a Huge body is not incorporeal — print's incorporeals are Medium and smaller | lurker-trap: ✓ ("jaws but its a lake") | lurker-trap: no line key in the words — the model's read of its quote | lurker-trap -> lurker: a trap is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] hints: phantom→style ✓ ("the shark is a ghost")
[concept] resolve: archetype=lurker type=Undead typeFrom=the route call themes=grave/aquatic mind=bestial style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple
[concept] signature elements: one breaching lunge from still, unmarked water [behavior] | a ripple that betrays nothing beneath it [aura] | the waterlogged dead-shark body [body]
[concept] identity: A drowned predator's shade that circles beneath the lake's surface as a ripple without a source, then erupts in one breaching lunge that takes a victim whole from the boat or the shore. Between strikes it sinks back into the black water and is gone — no fin, no silhouette, only a spreading ring and the sudden absence of sound — and it waits with the patience of deep water for the next body to lean too close. It does not flee; it merely sinks, and comes again, and a wounded one only grows more patient.
[concept] lore: A shark that fed on the drowned of a cursed lake until it drowned with them, it now rises from the depths to take one more soul for the water it can never leave.
[reskin] mind tier held: INT stays 12 against "ordinary" — the call read this creature as bestial, so only "feeble" could lower its INT
[reskin] mind tier: WIS 13 -> 15 — the call read this creature as capable at CR 6
[reskin] mind tier: CHA 10 -> 6 — the call read this creature as feeble at CR 6
[reskin] donor: lurker-5 -> CR 6
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] seats: action <- "one breaching lunge from still, unmarked water" | trait <- "a ripple that betrays nothing beneath it"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] named parts: Jaws (slot, Grappled) — the user's words, the engine's numbers
[reskin] energy rides the named weapon: "Jaws" is a Piercing, so the blow stays Piercing and Necrotic rides it rather than folding into the blow (print: 11 of 53 weapon rows carry an energy rider)
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the shade" — the call's own answer (kind), built from the name; the rules would have said "Shade"
[reskin] inline on stamped rows: "Shade" -> "the shade" on 0 rows — they were written before the name's form was settled
[reskin] inline form: "the shade" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "ghost" names no absence — nothing in it takes anything away
[reskin] clauses: "jaws" -> has (mechanical) [asked: attack] | "its a lake" -> has (mechanical) [askMechanic: zone] | "the shark is a ghost" -> has (mechanical) [asked: condition] [askMechanic: disguise]
[reskin] open asks handed to the idea call: "its a lake" [zone] · "the shark is a ghost" [disguise]
[reskin] idea anchored: action — "When the shade hits a Large or smaller creature with Jaws from water, " answers the GM's "its a lake"
[reskin] idea unanchored: trait — "Still water lies. While the shade is submerged, its ripples, wake and " names none of the 2 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 38 of 38 answered; not true of this body: gaze-single, seal, wail, active-toll, random-ray, snare-bolt, blighted-ground, shell-withdraw, coating, heated-body, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, marking-light, relic-object, warded-mending, mimicry, gaze-aura, death-burst
[reskin] menu: taste stands down — action answers the GM's "its a lake", so role and style do not filter the menu (legality still does); 9 template(s) offered
[reskin] menu pruned: action — push-prone, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the shade hits a Large or smaller creature with Jaws from water, it erupts wholly out of the lake, dragging the target down with it: the target is pulled into the shade's space and, if it was standing on a boat, dock, or shore, it is now in the water alongside the shade and has the Grappled condition as the two plunge beneath the surface in a spreading ring of silent black." [rider/on_hit/movement] [family: drag] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, life-drain, charge (+ shelf: leap, condition-payoff, execute, lure, pull-through, ground-burst, spew, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, exploiter, trample, thrown-burst, zone, disarm, thrown-burst-seed, curse-debt, reveal, wind-up, blink, patient-defense, self-invisibility, focus, feint-slip, rampage, lay-on-hands, second-wind, aggro-curse, riposte, answering-strike)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — grapple: hook-rider
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does movement; leading: hook-rider (on_hit/movement), charge-push (on_hit/movement), affliction (on_hit/condition)
[reskin] classification handed to the fit call: mechanic=grapple shape=attack
[reskin] word match declined by the call: charge-push, pounce, charge — the key word does not mean the mechanic here
[reskin] closest refused: action — "hook-rider" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: pulls the target into the creature's own space and into the water with)
[reskin] clause already answered: "jaws" is carried by "Jaws" — the seat read the sheet and declined to write a second row for it
[reskin] seat authored nothing: action — the call was asked to write an action for "When the shade hits a Large or smaller creature with Jaws from water, " and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
[reskin] seat authoring refused: action — the authored row re-imposes Grappled, which this sheet's own attack row already applies; that fiction belongs in the attack's rider and the nearest template stands in
[reskin] seat refused twice: action — first: you wrote no row of the kind asked for (an action); second: the row re-imposes a condition this sheet's own attack already applies; the seat stays empty
[reskin] the declared ask's own template lands: action — the sheet's declared ask is "grapple", the seat that carries it ended with no row, and "hook-rider" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] rider refused — duplicate trigger: "hook-rider" opens with "If the target is a Large or smaller creature…", which "Jaws" already carries; the slot leaves and the seat looks elsewhere
[reskin] signature seat empty — no template held the idea and the seat wrote no row; nothing stands in (owner, 2026-11-23)
[reskin] signature idea (trait): "Still water lies. While the shade is submerged, its ripples, wake and surface disturbance are indistinguishable from ordinary lake movement, so observers can't tell it from the water itself until it breaches — only a creature that has watched the surface without interruption for a long moment can pick out the wrongness beneath." [trait/always/defense] [family: breach] — menu: false-appearance, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, assassinate, blurred-form, kill-denial, berserk, guarded-stance
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: false-appearance (always/defense), bloodied-fury (always/defense), death-restoration (always/defense)
[reskin] keys would have bound: trait — blood-frenzy (shark)
[reskin] classification handed to the fit call: mechanic=grapple shape=attack
[reskin] word match declined by the call: death-restoration, uncanny-sense, bound, phobia, terrain-walk, evasion — the key word does not mean the mechanic here
[reskin] closest refused: trait — "false-appearance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: submerged creature is indistinguishable from ordinary water until it b)
[reskin] seat answered, but: the call said "Still water lies. While the shade is submerged, its ripples, wake and surface disturbance are indistinguishable from ord" is carried by "Still Water Lies", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("submerged creature is indistinguishable from ordinary water until it b") and wrote a trait instead: "Still Water Lies" -> Traits. While the shade is submerged, its ripples, wake, and surface disturbance are indistinguishable from ordinary lake moveme
[reskin] authored row numbers: "Still Water Lies" — the call declared 1 number(s) promised
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Still Water Lies" ("Still water lies. While the shade is submerged, its ripples, wake and surface disturbance are indistinguishable from ordinary lake movement, so observers can't  [authored: the catalog held no shape for it]")
[reskin] repair: 1 clause(s) with no row — "the shark is a ghost"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced []
[reskin] condition relation: "Spectral Predator" — the call reads its condition as none, so no condition is recorded against it
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Bite = none
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "jaws but its a lake and the shark is a g" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Still Water Lies" [no template]
[reskin] lint: 0 findings
[reskin] element expressed: Still Water Lies carries "a ripple that betrays nothing beneath it" — "its ripples, wake, and surface disturbance are indistinguishable from ordinary l"
[reskin] audit: [Still Water Lies: The end condition 'watched the s…d the surface without interruption for 1 minute"), Spectral Predator: Moving through objects as diffi…s and objects as if they were difficult terrain")]
[reskin] audit defect: Traits/"Still Water Lies" [model-written] high untrackable — The end condition 'watched the surface without interruption for 1 minute' requires the GM to track continuous observation over dozens of rounds with no stated check, range, or line-of-sight definition, which cannot be adjudicated mid-combat. — Replace the 1-minute uninterrupted-watching clause with an immediate check (such as a Wisdom (Perception) check against the shade's Stealth) triggered when the observer first looks at the water. (about: "until it breaches unless that creature has watched the surface without interruption for 1 minute")
[reskin] audit defect: Traits/"Spectral Predator" [model-written] medium open_ended — Moving through objects as difficult terrain gives no end condition or consequence for ending a turn inside solid matter, leaving the GM to invent whether the shade is expelled, takes damage, or is stuck. — Add a clause stating what happens when the shade ends its turn inside an object, mirroring the standard incorporeal-movement resolution. (about: "it can move through other creatures and objects as if they were difficult terrain")
[reskin] clause unresolved: "Still Water Lies" carries "Still water lies. While the shade is submerged, its ripp", which matches no clause on the sheet — no coverage credit by id
[reskin] [gap] pulls the target into the creature's own space and into the water with it, holding it there — "When the shade hits a Large or smaller creature with Jaws from water, it erupts wholly out of the lake, dragging the target down with it: the target is pulled into the shade's space and, if it was standing on a boat, dock, or shore, it is now in the water alongside the shade and has the Grappled condition as the two plunge beneath the surface in a spreading ring of silent black." — Drowned Shade [seat: action [rider/on_hit/movement]] (closest offered: hook-rider) [effect: movement] [menu: hook-rider charge-push affliction contagion stunning-strike pounce isolation life-drain charge ground-burst exploiter leap sensory-strike patient-defense] [same-cell unoffered: bolt-drag] [same-seat rejected: snatch:movement bolt-restrain:role bolt-drag:host-row bolt-mark:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Drowned Shade" — donor lurker-5, CR 6
[reskin] ledger: 3 ask(s) — 2 answered (2 by receipt or anchor, 0 handed), 0 mismatch, 1 open (1 never-written)
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 32-drowned-shade.json — 1 recorded answer(s) unused
```

---

## 33-witnessed

## 33. Witnessed — CR 7

**Input:** `weeping angel type statue, only moves when nobody is looking at it`
**Donor:** lurker-5 -> CR 7
**Signature:** library

### Block
```
Witnessed

Medium Construct, Neutral

AC 15
Initiative +4 (14)

HP 110 (17d8 + 34)

Speed 30 ft.

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
18
+4
+7
WIS
18
+4
+4
MOD
SAVE
CON
15
+2
+2
CHA
6
-2
-2

Skills Perception +7, Stealth +10

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 17

Languages Common

CR 7 (XP 2,900; PB +3)

Traits

Unobserved Motion. While a creature that can see the witnessed is observing it, the witnessed cannot move or take actions or reactions, and it has Advantage on Dexterity (Stealth) checks made to appear as an ordinary statue, until the start of its next turn.

Actions

Multiattack. The witnessed makes two Slap attacks. It can replace one attack with a use of Marble Stillness.

Slap. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage plus 10 (3d6) Necrotic damage.

Marble Stillness. Strength Saving Throw: DC 15, one creature within 60 feet. Failure: The target has the Restrained condition until the end of its next turn.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the witnessed takes the Hide action.

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
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
!! [ENRICHMENT] Failed to enrich Drowned Shade: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 1 taken name(s) the recording carried
[path] homebrew — "weeping angel type statue, only moves when nobody is looking at it" (call)
[route] lurker type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker: ✓ ("only moves when nobody is looking at it") | lurker: no line key in the words — the model's read of its quote
[concept] mind promoted to sapient — the identity asserts performance/taunting
[concept] hints: trap→style ✓ ("it IS the ambush — moves only when unobs")
[concept] resolve: archetype=lurker type=Construct typeFrom=the route call themes=grave/gaze mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: frozen while observed, moving only in unwatched moments [behavior] | weeping marble statue body [body] | restraining grip that turns prey to stone [behavior]
[concept] identity: The Weeping Angel is a statue of pale, weeping marble that holds utterly still under any observing eye, then flows forward in a silent, gliding rush the instant sight is broken, closing on its prey with hands outstretched. It does not duel: it stalks outside the edge of vision, waits for the party's attention to split, and lunges for a single devastating grip — snapping necks or dragging victims into its stone embrace — before freezing back into agonized stillness. It never flees and never toys; it is patient beyond reason and will follow prey for hours, one unobserved moment at a time, until every watcher falters.
[concept] lore: A memorial carved to hold a dying wizard's grief, the Weeping Angel was cursed to move only in the gaps of other minds' attention — it now wanders ruins it once adorned, seeking to share its sorrow by building new statues from the living.
[reskin] mind tier: INT 12 -> 15 — the call read this creature as capable at CR 7
[reskin] mind tier: WIS 13 -> 18 — the call read this creature as formidable at CR 7
[reskin] mind tier: CHA 10 -> 6 — the call read this creature as feeble at CR 7
[reskin] donor: lurker-5 -> CR 7
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] seats: action <- "frozen while observed, moving only in unwatched moments" | trait <- "weeping marble statue body"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the witnessed" — the call's own answer (kind), built from the name
[reskin] inline form: "the witnessed" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "weeping angel type statue" -> has (descriptive), head | "only moves when nobody is looking at it" -> has (mechanical) [asked: condition] [askMechanic: disguise]
[reskin] open asks handed to the idea call: "only moves when nobody is looking at it" [disguise] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The witnessed fixes its eyeless gaze on one creature it can see, and t" answers the GM's "only moves when nobody is looking at it"
[reskin] idea unanchored: trait — "While the witnessed remains motionless, it is indistinguishable from a" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 38 of 38 answered; not true of this body: gaze-single, seal, wail, active-toll, random-ray, spew, snare-bolt, drain, zone-seed, blighted-ground, blink, shell-withdraw, coating, phase-slip, heated-body, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial
[reskin] menu: taste stands down — action answers the GM's "only moves when nobody is looking at it", so role and style do not filter the menu (legality still does); 16 template(s) offered
[reskin] signature idea (action): "The witnessed fixes its eyeless gaze on one creature it can see, and that creature's eyes cloud with weeping marble dust. The target must make a Wisdom saving throw; on a failure, it is Blinded until the end of its next turn, its sight stolen by the statue's sorrow." [action/save/condition] [family: mark] — menu: execute, lure, ground-burst, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, thrown-burst, zone, disarm, push-prone, thrown-burst-seed, curse-debt, reveal, wind-up (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, rampage, lay-on-hands, second-wind, aggro-curse, riposte, answering-strike, stunning-strike, charge-push, hook-rider, pounce, isolation, life-drain, charge)
[reskin] lead by this seat's own clause: action — "disguise" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), pacify (save/condition), escalating-dread (save/condition)
[reskin] classification handed to the fit call: shape=condition
[reskin] word match declined by the call: sensory-strike, push-prone, slow-bolt — the key word does not mean the mechanic here
[reskin] closest refused: action — "sensory-strike" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: stops the creature from moving while any creature can see it, and lets)
[reskin] seat authored nothing: action — the call was asked to write an action for "The witnessed fixes its eyeless gaze on one creature it can see, and t" and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
[reskin] authored row answers the GM: action — "Marble Stillness" was written for "only moves when nobody is looking at it", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("stops the creature from moving while any creature can see it, and lets") and wrote an action instead: "Marble Stillness" -> Actions. *Wisdom Saving Throw*: DC 15, one creature within 60 feet. *Failure:* The target has the Restrained condition until the 
[reskin] authored row numbers: "Marble Stillness" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Marble Stillness" after "you wrote no row of the kind asked for (an action)"
[reskin] value check: "Marble Stillness" EV 13.8 vs floor 13 (one attack of 2) — worth the trade
[reskin] signature authored: no template — the seat wrote it -> Actions/"Marble Stillness" ("The witnessed fixes its eyeless gaze on one creature it can see, and that creature's eyes cloud with weeping marble dust. The target must make a Wisdom saving t [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "While the witnessed remains motionless, it is indistinguishable from an ordinary marble statue. A creature must take the Search action and succeed on a Wisdom (Perception) check to notice it is alive." [trait/always/defense] [family: body-reaction] — menu: false-appearance, spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, assassinate, berserk, guarded-stance
[reskin] composed candidates: none trait — the body-reaction family has no payload that does "defense" (it offers damage, condition, movement)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: false-appearance (always/defense), bloodied-fury (always/defense), death-restoration (always/defense)
[reskin] keys would have bound: trait — false-appearance (statue)
[reskin] classification handed to the fit call: shape=condition
[reskin] word match declined by the call: false-appearance — the key word does not mean the mechanic here
[reskin] closest refused: trait — "false-appearance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: freezes in place while any creature looks at it and moves freely when )
[reskin] seat answered, but: the call said "While the witnessed remains motionless, it is indistinguishable from an ordinary marble statue. A creature must take the" is carried by "Unobserved Motion", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("freezes in place while any creature looks at it and moves freely when ") and wrote a trait instead: "Unobserved Motion" -> Traits. While a creature that can see the witnessed is observing it, the witnessed cannot move or take actions or reactions, and
[reskin] authored row numbers: "Unobserved Motion" — the call declared 0 number(s) promised
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Unobserved Motion" ("While the witnessed remains motionless, it is indistinguishable from an ordinary marble statue. A creature must take the Search action and succeed on a Wisdom ( [authored: the catalog held no shape for it]")
[reskin] weapons answered: Slap = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "weeping angel type statue, only moves wh" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Marble Stillness.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Unobserved Motion" [no template]
[reskin] save re-derived after a retype: Actions/Marble Stillness — a Wisdom save for a condition the row IMPOSES, which calls for Strength or Dexterity (A2: a condition the row merely requires does not pick the stat)
[reskin] lint: type-damage-affinity: Actions/Slap: Necrotic damage on Construct — no official Construct deals Necrotic; re-theme the damage to the creature's substance (or the type itself is wrong)
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Unobserved Motion carries "frozen while observed, moving only in unwatched moments" — "While a creature that can see the witnessed is observing it, the witnessed canno"
[reskin] audit: [Unobserved Motion: The trigger asks the GM to trac…inary statue, until the start of its next turn."), Marble Stillness: A plainly named stillness/petrif…ained condition until the end of its next turn."), Marble Stillness: A creature restrained while a me…ving Throw: DC 15, one creature within 60 feet.")]
[reskin] audit rename held — "Marble Stillness" was written for the GM's own clause (cl_1sbpf9q: "only moves when nobody is looking at it"), so "Weight of Stone" does not land; the finding stands as logged
[reskin] audit defect: Traits/"Unobserved Motion" [model-written] medium untrackable — The trigger asks the GM to track which creatures are currently looking at the statue at every moment, a continuous table-wide gaze state nothing on the sheet or in play establishes or records. — Anchor the frozen state to a checkable, discrete event rather than ongoing observation, so the GM can determine the trigger from the last action taken. (about: "While a creature that can see the witnessed is observing it, the witnessed cannot move or take actions or reactions, and it has Advantage on Dexterity (Stealth) checks made to appear as an ordinary statue, until the start of its next turn.")
[reskin] audit defect: Actions/"Marble Stillness" [model-written] low other — A creature restrained while a mere 60 feet away and unmoving, with no reach or line of effect described, does not read as the same power as the statue's melee Slap and has no physical cause for holding a distant target. — Tie the restraint to a cause the creature can plausibly exert at that range, such as a gaze or a statue-anchored effect. (about: "Strength Saving Throw: DC 15, one creature within 60 feet.")
[reskin] clause unresolved: "Unobserved Motion" carries "The witnessed freezes in place whenever any creature can", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Witnessed" — donor lurker-5, CR 7
[reskin] ledger: 1 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 0 open
!! [ENRICHMENT] Failed to enrich Witnessed: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] enrichment not run (5 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 33-witnessed.json — 1 recorded answer(s) unused
```

---

## 34-bone-quiver-captain

## 34. Bone-Quiver Captain — CR 3

**Input:** `skelton archer capt`
**Donor:** defender-3 -> CR 3
**Signature:** library

### Block
```
Bone-Quiver Captain

Medium Undead, Lawful Evil

AC 18
Initiative +3 (13)

HP 52 (8d8 + 16)

Speed 30 ft.

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
16
+3
+3
WIS
8
-1
+1
MOD
SAVE
CON
15
+2
+4
CHA
5
-3
-3

Skills Athletics +5, Perception +1

Vulnerabilities Bludgeoning

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 11

Languages Understands Common plus one other language but can't speak

CR 3 (XP 700; PB +2)

Traits

Pack Tactics. The captain has Advantage on an attack roll against a target if at least one of the captain's allies is within 5 feet of that target and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The captain makes two attacks, using Shortsword or Shortbow in any combination. It can replace one attack with a use of Quiver Command.

Shortsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 12 (2d8 + 3) Piercing damage.

Quiver Command. Dexterity Saving Throw: DC 12, each creature of the captain's choice in a 30-foot Emanation originating from the captain. Failure: 4 (1d8) Necrotic damage, and the target immediately moves up to half its Speed in a direction of the captain's choice, using the safest available route.

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
[harness] restored 2 taken name(s) the recording carried
[concept] thin concept expanded before routing: skelton archer capt — The skeleton archer captain opens by loosing a ranging shot from behind its line of lesser archers, then spends every round repositioning its skeletons' fire to catch the party in crossfires and punish anyone who breaks cover. It never closes to melee while it has arrows and a 
[concept] expansion answered: type=Undead (type_source=user) material=bone size=Medium mind=sapient
[concept] expansion attack mode: ranged
[concept] expansion signature: summon
[path] twist — Skeleton (is) — "skelton" (call)
[route] defender-leader type=Undead mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots refused: the call answered yes but quoted "loosing a ranging shot from be", which is not in the GM's words — the word table decides | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("spends every round repositioning its ske") | skirmisher-archer: "archer" is a noun (a title), not a verb — no override | defender-leader: key "captain" (class noun)
[concept] resolve: archetype=defender type=Undead typeFrom=the route call themes=grave/armed mind=sapient style=leader energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: commands a rank of skeleton archers [behavior] | volleys of black-fletched arrows [object] | battle-line discipline that outlasts its death [behavior]
[concept] identity: The skeleton archer captain opens by loosing a ranging shot from behind its line of lesser archers, then spends every round repositioning its skeletons' fire to catch the party in crossfires and punish anyone who breaks cover. It never closes to melee while it has arrows and a wheel of bone-shielded fodder, but when its line collapses it falls back to the last narrow ground and spends its own shafts to the quiver's end rather than be taken alive.
[concept] lore: A captain who drilled its company through a siege it never survived, risen with its orders still unfilled and its archers still arrayed in the battle line it once commanded.
[reskin] print canon route: the Skeleton's body outranks the leader seat — no verb in the words names it; the plain defender line
[reskin] print canon array: STR 16, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +5
[reskin] donor: defender-3 -> CR 3
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] seats: action <- "commands a rank of skeleton archers" | trait <- "volleys of black-fletched arrows"
[reskin] [path] decides: twist on the Skeleton (the matcher would have said homebrew)
[reskin] print canon: "skelton archer capt" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the captain" — the call's own answer (kind), built from the name
[reskin] inline form: "the captain" — the model's own reading of the name
[reskin] the sheet's declared ask: command — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "skelton archer capt" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "The captain spits a command and points; one skeleton archer it can see" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Whenever the captain scores a hit with its Longbow, the target must su" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 30 of 30 answered; not true of this body: seal, shield-bash, active-toll, random-ray, shell-withdraw, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The captain spits a command and points; one skeleton archer it can see within range immediately uses its Reaction to make a Longbow attack against a target the captain designates. If no such archer is present, the captain looses a ranging shot itself." [action/always/damage] [family: mark] — menu: throw-retrieve, ground-burst, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, zone-seed (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, self-invisibility, rally, coating, snap-shot, riposte, answering-strike, charge-push)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — command: herd, rally
[reskin] menu ordered by the idea's stamps: action — idea fires always/does damage; leading: herd (save/damage), rally (always/movement), throw-retrieve (always/damage)
[reskin] word match declined by the call: throw-retrieve, zone-seed, rally — the key word does not mean the mechanic here
[reskin] closest refused: action — "throw-retrieve" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: lets an ally it can see make an immediate attack instead of the captai)
[reskin] seat answered, but: the call said "The captain spits a command and points; one skeleton archer it can see within range immediately uses its Reaction to mak" is carried by "Volley Order", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write an action for "The captain spits a command and points; one skeleton archer it can see" and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
[reskin] seat answered, but: the call said "The captain spits a command and points; one skeleton archer it can see within range immediately uses its Reaction to mak" is carried by "Volley Order", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write an action for "The captain spits a command and points; one skeleton archer it can see" and wrote no row of that kind
[reskin] seat refused twice: action — first: you wrote no row of the kind asked for (an action); second: you wrote no row of the kind asked for (an action); the seat stays empty
[reskin] the declared ask's own template lands: action — the sheet's declared ask is "command", the seat that carries it ended with no row, and "herd" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] seat takes its clause: "Quiver Command" is HANDED "skelton archer capt" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: herd -> Actions/"Quiver Command" ("The idea is a command that triggers an ally's Reaction attack, with a fallback r [verb: command:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 18 already beats print's 13 at CR 3, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Whenever the captain scores a hit with its Longbow, the target must succeed on a Wisdom saving throw or become Frightened of the captain until the end of its next turn. The target can repeat the save when it takes damage." [trait/always/condition] [family: mark] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — command: pack-tactics
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: pack-tactics (always/damage), phobia (always/condition), berserk (always/condition)
[reskin] word match declined by the call: phobia, berserk — the key word does not mean the mechanic here
[reskin] closest refused: trait — "fear-aura" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: on a hit with the Longbow, the target must make a Wisdom save against )
[reskin] seat answered, but: the call said "Whenever the captain scores a hit with its Longbow, the target must succeed on a Wisdom saving throw or become Frightene" is carried by "Quiver Command", and no such row is on this sheet — the clause stays open
[reskin] row refused — the name is taken: "Quiver Command" collides with a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one
[reskin] strike not landed — the name is taken: "Quiver Command" already names a row on this sheet and a strike carries no template name to fall back on; the seat is asked again rather than shipping two rows with one name
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Whenever the captain scores a hit with its Longbow, the target must su" and wrote no row of that kind
[reskin] seat asked again: trait — the first answer was refused (you wrote no row of the kind asked for (a trait)); asking once more with the reason
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Whenever the captain scores a hit with its Longbow, the target must su" and wrote no row of that kind (it belongs in the description)
[reskin] seat refused twice: trait — first: you wrote no row of the kind asked for (a trait); second: it belongs in the description; the seat stays empty
[reskin] the declared ask's own template lands: trait — the sheet's declared ask is "command", the seat that carries it ended with no row, and "pack-tactics" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] pick kept on the GM's own words: trait — "pack-tactics" has no key-table verb, but the call quotes "skelton archer capt" from the description
[reskin] seat takes its clause: "Quivering Fear" is HANDED "skelton archer capt" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): pack-tactics -> Traits/"Quivering Fear" ("The idea is a fear rider attached to the captain's Longbow hits, not an aura or  [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Quivering Fear" -> "Pack Tactics" — this row is pack-tactics and does what every pack-tactics row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Claw = none; Longbow = longbow
[reskin] weapon dice follow the weapon: "Longbow" is a longbow (d8) — "10 (2d6 + 3)" becomes "12 (2d8 + 3)", print's rule of keeping the die and scaling the count
[reskin] weapon table: "Longbow" — a launcher, never thrown, range 150/600
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon type: the call answered type_source=user for undead, but the GM's words do not name it — the Skeleton's own type stands
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon attack: "Claw" -> "Shortsword" — the Skeleton's own row
[reskin] print canon attack: "Longbow" -> "Shortbow" — the Skeleton's own ranged row
[reskin] save follows the effect: Actions/"Quiver Command" Wisdom -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] multiattack replacement clause: It can replace one attack with a use of Quiver Command.
[reskin] lint: 0 findings
[reskin] audit sees the ask: 2 row(s) shown with the clause they were written for
audit finding below confidence gate: Quiver Command Forcing each affected creature to move half its Speed along a GM-chosen 'safest available route' for an area of targets is a multi-creature repositioning the GM must resolve and track in a single action, more state than a turn allows.
[reskin] audit: [Quiver Command: The effect targets every creature … 30-foot Emanation originating from the captain")]
[reskin] audit defect: Actions/"Quiver Command" [catalog] medium other — The effect targets every creature the captain chooses in a self-centered Emanation, which includes its own skeleton allies, yet the fiction of a quiver command implies it marshals its archers rather than flinging friend and foe alike; as written the row reads as a burst, not a command. — Rework the targeting clause to name the creatures it actually commands (allies and/or one chosen enemy) so the effect matches a commanded volley. (about: "each creature of the captain's choice in a 30-foot Emanation originating from the captain")
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] lets an ally it can see make an immediate attack instead of the captain attacking — "The captain spits a command and points; one skeleton archer it can see within range immediately uses its Reaction to make a Longbow attack against a target the captain designates. If no such archer is present, the captain looses a ranging shot itself." — Bone-Quiver Captain [seat: action [action/always/damage]] (closest offered: throw-retrieve) [effect: resource] [menu: herd rally throw-retrieve zone-seed ground-burst curse-debt wind-up terror-pulse slow-bolt disarm push-prone reveal] [same-cell unoffered: blood-frenzy pack-tactics assassinate death-burst coating] [same-seat rejected: none] [row dropped]
[reskin] [gap] on a hit with the Longbow, the target must make a Wisdom save against being Frightened and can repeat the save when it t — "Whenever the captain scores a hit with its Longbow, the target must succeed on a Wisdom saving throw or become Frightened of the captain until the end of its next turn. The target can repeat the save when it takes damage." — Bone-Quiver Captain [seat: trait [trait/always/condition]] (closest offered: fear-aura) [effect: condition] [menu: pack-tactics phobia berserk bloodied-fury blood-frenzy shielded-mind relentless-pursuit bound relic-object guarded-stance undead-fortitude truth-aura fear-aura] [same-cell unoffered: adhesive faultless-tracker marking-light kill-denial] [same-seat rejected: false-appearance:body-verdict adhesive:body-verdict spider-climb:body-verdict terrain-walk:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict death-restoration:cr-range uncanny-sense:body-verdict earth-glide:movement tunneler:movement evasion:role marking-light:body-verdict sealed-body:body-verdict mimicry:body-verdict assassinate:role blurred-form:role death-burst:role kill-denial:body-verdict] [row dropped]
[reskin] signature outcome: 2 of 2 accepted signature pick(s) never reached the sheet — 2x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 2 of 2 (2x the call named no template for the pick) · path twist
[reskin] done: "Bone-Quiver Captain" — donor defender-3, CR 3
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 34-bone-quiver-captain.json
```

---

## 35-oathtaker-initiate

## 35. Oathtaker Initiate — CR 1/4

**Input:** `need a quick mook for a cult, 5 of them, knife guys`
**Donor:** skirmisher-1 -> CR 0.25
**Signature:** library

### Block
```
Oathtaker Initiate
Medium humanoid, neutral evil
Armor Class

13 (studded leather)

Hit Points: 

11 (2d8 + 2)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


10 (+0)

	

12 (+1)

	

12 (+1)

	

8 (-1)

	

12 (+1)

	

6 (-2)

Skills: 

Perception +3, Stealth +3

Saving Throws: 

DEX +3

Senses: 

passive Perception 13

Languages: 

Common

Challenge

1/4 (50 XP)

Proficiency Bonus:

+2

Wounded Fury.While below half its hit point maximum, the initiate has advantage on attack rolls.
Flitting Steps.The initiate ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility (Bonus Action).The initiate takes the Dash or Disengage action.

Actions
Knife: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 6 (2d4 + 1) piercing damage, and the initiate has advantage on its next attack roll against the target before the end of its next turn. If the target is a creature and isn't already poisoned by this creature, it is subjected to the following effect. The target must make a DC 11 Constitution saving throw. On a failed save, the target is poisoned. While poisoned this way, the target can't regain hit points. The condition lasts until the target finishes a Long Rest or is cured by the Lesser Restoration spell or similar magic. On a successful save, the target is immune to this creature's contagion for 24 hours.
Thrown Knife: Ranged Weapon Attack: +3 to hit, range 20/60 ft., one target. Hit: 6 (2d4 + 1) piercing damage.
```

### Trace
```
!! [ENRICHMENT] Failed to enrich Bone-Quiver Captain: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 3 taken name(s) the recording carried
[path] refused: class receipt "knife guys" names no class and is not in the head clause ("need a quick mook for a cult")
[path] homebrew — "cult, 5 of them, knife guys" (call)
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher: ✓ ("quick mook") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=armed/bestial mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: fanning out to flank in packs [behavior] | quick darting knife jabs and retreats [behavior] | the blood-oathed cult initiate's knife [object]
[concept] identity: Cult knifehands open by fanning wide around a target, then dart in one at a time to slash at flanks and ankles while the rest circle; each round they jab and retreat, never staying within reach long enough to be pinned. They are cowardly pack predators, breaking and scattering the moment two of their number drop or their leader falls, but viciously emboldened by weight of numbers.
[concept] lore: Sworn into the cult's outer circle with a blade pressed to their own throat, these initiates earn their place by cutting down the unworthy in alleys and back rooms, dreaming of the day the knife turns outward and they are the ones who hold it.
[reskin] mind tier held: INT stays 8 against "ordinary" — the card's 8 is already ordinary
[reskin] mind tier held: WIS stays 12 against "ordinary" — the card's 12 is already ordinary
[reskin] mind tier: CHA 8 -> 6 — the call read this creature as feeble at CR 0.25
[reskin] donor: skirmisher-1 -> CR 0.25
[reskin] seats: action <- "fanning out to flank in packs" | trait <- "the blood-oathed cult initiate's knife"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] claim gate: CR 0.25 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] named parts: Knife (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] features: Vex on Knife — the feature table, no call
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the initiate" — the call's own answer (kind), built from the name
[reskin] inline form: "the initiate" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 11 (8 + PB 2 + the sheet's best 1) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "need a quick mook for a cult" -> has (descriptive), head | "5 of them" -> has (descriptive) | "knife guys" -> has (mechanical) [asked: attack]
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (2 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "The initiate slashes at the tendons of a foe it has boxed in — until t" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The pack's courage rides on its numbers: while at least two of the ini" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 15 of 15 answered; not true of this body: spew, snare-bolt, blink, coating, phase-slip, false-appearance, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, mimicry
[reskin] signature idea (action): "The initiate slashes at the tendons of a foe it has boxed in — until the end of the target's next turn, the target's Speed is halved and it can't take Reactions. A body cut low and crowded never gets to run." [rider/on_hit/condition] [family: mark] — menu: contagion, pounce (+ shelf: lure, sensory-strike, disarm, thrown-burst-seed, delayed-brand, patient-defense, aggro-curse, self-invisibility, focus, feint-slip)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: contagion (on_hit/condition), pounce (on_hit/condition), disarm (save/movement)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: pounce, disarm — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "contagion" has no key-table verb, but the call quotes "need a quick mook for a cult of them knife guys" from the description
[reskin] signature rider: contagion -> Knife (appended; the hit leaves the target slowed (Speed halved) and unable to take Reactions unt [shape fit, no verb match])
[reskin] signature idea (trait): "The pack's courage rides on its numbers: while at least two of the initiate's allies are within reach of the initiate, it has Advantage on attack rolls and can't be Frightened. The knife is brave where the blades are many." [trait/always/defense] [family: kill-growth] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, shielded-mind, bound, undead-fortitude, kill-denial
[reskin] composed candidates: none trait — the kill-growth family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), shielded-mind (always/defense), undead-fortitude (always/defense)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: bloodied-fury, pack-tactics, blood-frenzy — the key word does not mean the mechanic here
[reskin] free signature row: trait — "bloodied-fury" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "fanning out to flank in packs" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] free signature row: "Pack Courage" — the trait seat cannot quote the GM, but the call names the element it expresses: "fanning out to flank in packs". Earns no clause credit; the homebrew path allows 1 and this is number 2
[reskin] signature template (trait): bloodied-fury -> Traits/"Pack Courage" ("The pack's courage rides on its numbers: while at least two allies are near, it  [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Pack Courage" -> "Bloodied Fury" — this row is bloodied-fury and does what every bloodied-fury row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Knife = dagger; Thrown Knife = dagger
[reskin] weapon dice follow the weapon: the GM's "Knife" is a dagger (d4) — "5 (1d8 + 1)" becomes "6 (2d4 + 1)"
[reskin] weapon dice follow the weapon: "Thrown Knife" is a dagger (d4) — "5 (1d8 + 1)" becomes "6 (2d4 + 1)", print's rule of keeping the die and scaling the count
[reskin] weapon table: "Thrown Knife" — thrown, range 20/60
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "cult, 5 of them, knife guys" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget by card size: CR 0.25 sits in band 0-2, where print runs 1-4 rows (p20-p90, Multiattack excluded); this card already carries 4 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Bloodied Fury" [trait/always/defense]
[reskin] lint: 0 findings
[reskin] element claim revoked: "Bloodied Fury" claims "fanning out to flank in packs" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Bloodied Fury")
[reskin] audit: [Knife: The Poisoned condition imposed by the Knife…he *Lesser Restoration* spell or similar magic."), Knife: The Knife grants the initiate Advantage on …inst the target before the end of its next turn")]
[reskin] audit defect: Actions/"Knife" [model-written] medium open_ended — The Poisoned condition imposed by the Knife has no in-combat escape: it ends only at a Long Rest or via a specific spell, giving an affected PC no save, action, or round-based path out during the fight. — Allow a repeat Constitution saving throw at the end of each of the target's turns (or a fixed duration) so the state has an in-combat exit. (about: "The condition lasts until the target finishes a Long Rest or is cured by the *Lesser Restoration* spell or similar magic.")
[reskin] audit defect: Actions/"Knife" [model-written] medium weak — The Knife grants the initiate Advantage on its own next attack, but the initiate's only other attack option is Thrown Knife at range and it has no Multiattack, so the rider is nearly dead on the one attack it can actually make. — Attach the Advantage rider to a clause that benefits the cult's other attackers (e.g., allies' attacks against the target), or drop it. (about: "the initiate has Advantage on its next attack roll against the target before the end of its next turn")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Oathtaker Initiate" — donor skirmisher-1, CR 0.25
[reskin] ledger: 1 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 35-oathtaker-initiate.json — 1 recorded answer(s) unused
```

---

## 36-dune-maw

## 36. Dune Maw — CR 5

**Input:** `something for a desert`
**Donor:** brute-5-grappler -> CR 5
**Signature:** dropped

### Block
```
Dune Maw

Large Elemental, Unaligned

AC 14
Initiative -1 (9)

HP 102 (12d10 + 36)

Speed 30 ft., Burrow 30 ft.

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
10
+0
+0
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

Skills Athletics +6, Perception +3

Immunities Poison; Exhaustion, Poisoned

Senses tremorsense 60 ft.; Passive Perception 13

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Sand Glide. The dune maw can burrow through nonmagical, unworked earth and stone. While doing so, the dune maw doesn't disturb the material it moves through. The dune maw can pinpoint the location of loose sand and open air within 60 feet of itself.

Actions

Multiattack. The dune maw makes two Bite attacks.

Bite. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Piercing damage plus 7 (2d6) Thunder damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

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
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
!! [ENRICHMENT] Failed to enrich Oathtaker Initiate: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 4 taken name(s) the recording carried
[concept] thin concept expanded before routing: something for a desert — The Sandmaw lies buried beneath dune crests with only a faint siphon-tip of grit showing, then erupts to engulf a victim's legs and drag it under in a churning whirlpool of sand; once the prey is submerged it seals the surface and slowly grinds, letting the desert's heat and
[concept] expansion answered: type=Elemental (type_source=user) material=sand size=Large mind=bestial
[concept] expansion attack mode: melee
[concept] expansion signature: engulf
[path] homebrew — "something for a desert" (call)
[route] brute-grappler type=Elemental mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape refused: the call answered contain but quoted "erupts to engulf a victim's le", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("erupts to engulf a victim's legs and dra") | brute-grappler: key "engulf" (class verb)
[concept] resolve: archetype=brute type=Elemental typeFrom=the route call themes=elemental/devouring mind=bestial style=grappler energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: buried ambush from beneath the dunes [behavior] | engulfing and submerging prey in churning sand [behavior] | a body of loose, grinding, abrasive sand [body]
[concept] identity: The Sandmaw lies buried beneath dune crests with only a faint siphon-tip of grit showing, then erupts to engulf a victim's legs and drag it under in a churning whirlpool of sand; once the prey is submerged it seals the surface and slowly grinds, letting the desert's heat and abrasion do the work before it surfaces fully. Every round it remains buried it repositions beneath the fight, erupting again where the ground moves, and it never fights above the sand for long—at half health it flees by diving and does not resurface unless cornered.
[concept] lore: A Sandmaw is a desert-born monstrosity grown from the swallowed remains of beasts and travelers in shifting sands; it seeks only the warmth and struggle of living prey to add to its grinding, ever-hungry mass.
[reskin] mind tier held: INT stays 4 against "capable" — the call read this creature as bestial, so only "feeble" could lower its INT
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] donor: brute-5-grappler -> CR 5
[reskin] seats: action <- "buried ambush from beneath the dunes" | trait <- "a body of loose, grinding, abrasive sand"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] engulf engine: Entomb — the body's own verb
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the dune maw" — the call's own answer (kind), built from the name
[reskin] inline form: "the dune maw" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] alignment by mind: "Neutral" -> Unaligned — a Elemental the call reads as bestial at INT 4 holds no ethics (owner's ruling, 2026-11-15)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "something for a desert" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "When the dune maw erupts, it chooses a point of loose sand it can sens" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "While buried beneath loose sand, the dune maw has the Invisible condit" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 32 of 32 answered; not true of this body: shield-bash, active-toll, random-ray, herd, drain, shell-withdraw, rally, coating, heated-body, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, web-walker, energy-aura, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst
[reskin] engulf engine withheld: Bonus Actions/"Entomb" leaves — the route call read this creature's hold as unanswered, not contain; the grapple stands and citations of the row are swept
[reskin] menu pruned: action — push-prone, exploiter (the sheet cannot render them)
[reskin] signature idea (action): "When the dune maw erupts, it chooses a point of loose sand it can sense within reach along the ground; each creature in a cylinder of churning grit centered there must succeed on a Dexterity saving throw or be pulled down into the collapsing ground and have the Grappled condition (escape DC 14), Restrained while Grappled. It then repositions to a new buried point it can burrow to before erupting a" [action/save/condition] [family: drag] — menu: condition-payoff, ground-burst, spew, burrow-ambush, escalating-dread, terror-pulse, thrown-burst-seed, wind-up, gaze-single, snare, seal, lure, pacify, snare-bolt (+ shelf: leap, second-wind, aggro-curse, self-invisibility, focus, answering-strike, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, life-drain)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: escalating-dread (save/condition), terror-pulse (save/condition), gaze-single (save/condition)
[reskin] classification handed to the fit call: mechanic=grapple, engulf
[reskin] word match declined by the call: escalating-dread, terror-pulse, gaze-single, lure, pacify, snare-bolt, condition-payoff, ground-burst, spew, burrow-ambush, leap, pounce, wind-up, thrown-burst-seed — the key word does not mean the mechanic here
[reskin] closest refused: action — "snare" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: an area Dexterity save that pulls multiple creatures into the ground a)
[reskin] seat answered, but: the call said "When the dune maw erupts, it chooses a point of loose sand it can sense within reach along the ground; each creature in " is carried by "Erupt", and no such row is on this sheet — the clause stays open
[reskin] seat authoring refused: action — the authored row re-imposes Grappled, which this sheet's own attack row already applies; that fiction belongs in the attack's rider and the nearest template stands in
[reskin] seat asked again: action — the first answer was refused (the row re-imposes a condition this sheet's own attack already applies); asking once more with the reason
[reskin] seat authored nothing: action — the call was asked to write an action for "When the dune maw erupts, it chooses a point of loose sand it can sens" and wrote no row of that kind (it belongs in the description)
[reskin] seat refused twice: action — first: the row re-imposes a condition this sheet's own attack already applies; second: it belongs in the description; the seat stays empty
[reskin] the declared ask's own template lands: action — the sheet's declared ask is "grapple", the seat that carries it ended with no row, and "hook-rider" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] pick kept on the GM's own words: action — "hook-rider" has no key-table verb, but the call quotes "something for a desert" from the description
[reskin] rider refused — duplicate trigger: "hook-rider" opens with "If the target is a Large or smaller creature…", which "Bite" already carries; the slot leaves and the seat looks elsewhere
[reskin] signature seat empty — no template held the idea and the seat wrote no row; nothing stands in (owner, 2026-11-23)
[reskin] signature idea (trait): "While buried beneath loose sand, the dune maw has the Invisible condition and leaves the ground subtly sinking and shifting where it passes; it can burrow through loose sand without leaving a tunnel and emerges wherever the ground has moved." [trait/always/movement] [family: breach] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), aberrant-ground (always/movement), earth-glide (always/movement)
[reskin] classification handed to the fit call: mechanic=grapple, engulf
[reskin] free signature row: trait — "earth-glide" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "buried ambush from beneath the dunes" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] free signature row: "Sand Glide" — the trait seat cannot quote the GM, but the call names the element it expresses: "buried ambush from beneath the dunes". Earns no clause credit; the homebrew path allows 1 and this is number 2
[reskin] signature template (trait): earth-glide -> Traits/"Sand Glide" ("burrow through loose sand without leaving a tunnel, moving through the ground un [shape fit, no verb match]")
[reskin] weapons answered: Bite = none
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "something for a desert" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Sand Glide" [trait/always/movement]
[reskin] lint: 0 findings
[reskin] element expressed: Sand Glide carries "buried ambush from beneath the dunes" — "can burrow through nonmagical, unworked earth and stone. While doing so, the dun"
[reskin] audit: [Sand Glide: Pinpointing loose sand and open air is…ose sand and open air within 60 feet of itself."), Sand Glide: The trait's name promises gliding thro…ow through nonmagical, unworked earth and stone")]
[reskin] audit defect: Traits/"Sand Glide" [model-written] medium open_ended — Pinpointing loose sand and open air is a sensory ability with no stated action cost, range basis, or use, and nothing in the block creates an effect that depends on knowing where sand or air is; the GM has no call to make with it. — Either fold this into the existing senses line as a defined sense, or cut it; if kept, tie it to a concrete mechanic (e.g., a trigger for ambush) rather than a free-standing awareness clause. (about: "The dune maw can pinpoint the location of loose sand and open air within 60 feet of itself.")
[reskin] audit defect: Traits/"Sand Glide" [model-written] medium undelivered — The trait's name promises gliding through sand/dunes and its donor claim is a buried ambush, but the rules let it tunnel through unworked stone and never give any concealment, surprise, or hidden-position benefit — it is a plain burrow speed with flavor, not a sand ambush. — Add an ambush-facing clause to the trait's text (e.g., while burrowed it is not seen, or it gains a benefit when it emerges) so the name and the feature are delivered, or rename to a plain burrow trait. (about: "burrow through nonmagical, unworked earth and stone")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] an area Dexterity save that pulls multiple creatures into the ground and applies Grappled (escape DC) with Restrained wh — "When the dune maw erupts, it chooses a point of loose sand it can sense within reach along the ground; each creature in a cylinder of churning grit centered there must succeed on a Dexterity saving throw or be pulled down into the collapsing ground and have the Grappled condition (escape DC 14), Restrained while Grappled. It then repositions to a new buried point it can burrow to before erupting a" — Dune Maw [seat: action [action/save/condition]] (closest offered: snare) [effect: condition] [menu: escalating-dread terror-pulse gaze-single snare seal lure pacify snare-bolt condition-payoff ground-burst spew burrow-ambush thrown-burst-seed wind-up leap pounce] [same-cell unoffered: swallow shield-bash random-ray sensory-strike push-prone reveal exploiter] [same-seat rejected: swallow:hold-shape trample:style thrown-burst:style reel:role execute:role shield-bash:body-verdict hook-drag:hold-shape active-toll:body-verdict pull-through:role random-ray:body-verdict obstacle-pull:role slow-bolt:role sensory-strike:role disarm:role herd:body-verdict drain:body-verdict curse-debt:role reveal:role blighted-ground:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Dune Maw" — donor brute-5-grappler, CR 5
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 36-dune-maw.json — 1 recorded answer(s) unused
```

---

## 37-cap-snatch-monkey

## 37. Cap-Snatch Monkey — CR 1

**Input:** `can you make a flying monkey that steals hats lol`
**Donor:** skirmisher-3-winged -> CR 1 (invented — no printed peer)
**Signature:** library

### Block
```
Cap-Snatch Monkey

Medium Monstrosity, Chaotic Neutral

AC 15
Initiative +2 (12)

HP 27 (5d8 + 5)

Speed 30 ft., Fly 60 ft., Climb 30 ft.

MOD
SAVE
STR
14
+2
+2
INT
15
+2
+2
MOD
SAVE
DEX
14
+2
+4
WIS
15
+2
+2
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

Skills Perception +4, Stealth +4

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 1 (XP 200; PB +2)

Traits

Leathery Wing-Flaps and Coiling Tail. The cap-snatch monkey can hang from, climb, or move along any surface, including ceilings and sheer walls, without an ability check, has Advantage on Strength (Athletics) checks made to climb or to hold onto a creature or object, and can glide when it falls, descending no faster than its normal fly Speed.

Skittering Flight. The cap-snatch monkey doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.

Actions

Multiattack. The cap-snatch monkey makes two Claw attacks. It can replace one attack with a use of Marked for Snatching if available.

Claw. Melee Attack Roll: +4, reach 5 ft. 5 (1d6 + 2) Slashing damage. If the cap-snatch monkey flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) Slashing damage and, if it is Medium or smaller, has the Prone condition.

Swooping Snatch (Recharge 5-6). The cap-snatch monkey flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Dexterity Saving Throw: DC 11. Failure: 6 (1d12) Bludgeoning damage, and the target has the Prone condition.

Marked for Snatching (Recharge 5-6). The cap-snatch monkey makes one Claw attack. If it hits a creature, that creature is subjected to the following effect. Dexterity Saving Throw: DC 11. Failure: The target has the Grappled condition (escape DC 12).

Bonus Actions

Aerial Agility. The cap-snatch monkey takes the Dash or Disengage action.

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
!! [ENRICHMENT] Failed to enrich Dune Maw: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 5 taken name(s) the recording carried
[path] homebrew — "can you make a flying monkey that steals hats lol" (call)
[route] skirmisher-winged type=Monstrosity mechanics=none — casts: the call reads no worked magic here | hold_shape: grip on the GM's own words "a flying monkey that steals hats" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-winged: ✓ ("a flying monkey") | skirmisher-winged: no line key in the words — the model's read of its quote
[concept] hints: winged→style ✓ ("a flying monkey that steals hats")
[concept] resolve: archetype=skirmisher type=Monstrosity typeFrom=the route call themes=bestial/aerial mind=sapient style=winged energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: snatching hats and headgear off heads [behavior] | leathery gliding wings and prehensile tail [body] | hoarding stolen hats as rank [behavior]
[concept] identity: A chattering, hide-winged monkey that shadows a party through canopy and cliff, waiting for the moment a hat lifts or a helm slips loose. Every round it dives to snatch the worn item off the best-dressed target, then spirals up to taunt and dangle the prize before dropping it into a ravine or a nest-hoard. It is a born thief, not a soldier: at the first sign of real blood or a drawn blade it screeches, flees skyward, and shadows the group from a safer distance, waiting to try again.
[concept] lore: These thieving monkeys nest in the cliff-forests where old trade roads pass, and they hoard stolen hats, helms, and plumed caps as their only currency of rank — a monkey with the tallest hat rules the troop.
[reskin] mind tier held: CHA stays 8 against "ordinary" — the card's 8 is already ordinary
[reskin] mind tier: INT 8 -> 15 — the call read this creature as capable at CR 1
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 1
[reskin] donor: skirmisher-3-winged -> CR 1 (invented — no printed peer)
[reskin] seats: action <- "snatching hats and headgear off heads" | trait <- "leathery gliding wings and prehensile tail"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] claim gate: CR 1 but the words claim a capability ("can") — the wildcard stays open
[reskin] claim gate: CR 1 but a Monstrosity body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the cap-snatch monkey" — the call's own answer (kind), built from the name
[reskin] inline form: "the cap-snatch monkey" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "on_hit" stands on "steals hats lol" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "steals hats lol" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "can you make a flying monkey" -> has (descriptive), head | "steals hats lol" -> has (mechanical) [asked: on_hit/at_will/condition] [askMechanic: dazzle]
[reskin] open asks handed to the idea call: "steals hats lol" [dazzle] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The cap-snatch monkey fixes its eye on one creature it can see within " answers the GM's "steals hats lol"
[reskin] idea unanchored: trait — "Leathery Wing-Flaps and Coiling Tail. The cap-snatch monkey has a preh" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 27 of 27 answered; not true of this body: snare-bolt, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, life-drain
[reskin] menu: taste stands down — action answers the GM's "steals hats lol", so role and style do not filter the menu (legality still does); 10 template(s) offered
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The cap-snatch monkey fixes its eye on one creature it can see within 60 feet that is wearing or carrying an item it could snatch. Until the end of its next turn, when the monkey hits that creature with a Claw attack, it can forgo the damage to tear the item free instead: the target must succeed on a Dexterity saving throw or the item is ripped from its grasp and the monkey is holding it. A creatu" [action/save/condition] [family: mark] — menu: lure, sensory-strike, disarm, exploiter, pacify, escalating-dread, terror-pulse, slow-bolt, curse-debt, reveal (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, rampage, lay-on-hands, riposte, answering-strike, contagion, hook-rider, isolation, snatch)
[reskin] lead by this seat's own clause: action — "dazzle" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — dazzle: sensory-strike, reveal
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: sensory-strike (save/condition), reveal (save/condition), lure (save/condition)
[reskin] keys would have bound: action — disarm (steal)
[reskin] classification handed to the fit call: shape=condition when=on_hit often=at_will
[reskin] word match declined by the call: snatch, disarm, reveal, exploiter — the key word does not mean the mechanic here
[reskin] closest refused: action — "disarm" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: marks one creature and lets a later Claw hit substitute item theft and)
[reskin] seat authored nothing: action — the call was asked to write an action for "The cap-snatch monkey fixes its eye on one creature it can see within " and wrote no row of that kind (refused: "Marked for Snatching" — a strike says what the failed save costs: a condition, a forced movement, or a curse)
[reskin] seat asked again: action — the first answer was refused ("Marked for Snatching" — a strike says what the failed save costs: a condition, a forced movement, or a curse); asking once more with the reason
[reskin] strike points at its attack: "Marked for Snatching" makes one Claw attack and adds a Dexterity save — Multiattack offers it in place of one attack, which is the exchange and the whole limit (owner's ruling, 21 November)
[reskin] seat landed on the second try: action — "Marked for Snatching" after ""Marked for Snatching" — a strike says what the failed save costs: a condition, "
[reskin] value check: "Marked for Snatching (Recharge 5-6)" EV 4.8 vs floor 0 (one attack of 2) — over the ceiling — gated Recharge 5-6
[reskin] signature authored: no template — the seat wrote it -> Actions/"Marked for Snatching (Recharge 5-6)" ("null")
[reskin] signature idea (trait): "Leathery Wing-Flaps and Coiling Tail. The cap-snatch monkey has a prehensile tail and broad gliding membranes. It can hang from, climb, or move along any surface — including ceilings and sheer walls — without an ability check, and it has Advantage on Strength (Athletics) checks made to climb or to hold onto a creature or object. When it falls, it can glide: it descends no faster than its normal fl" [trait/always/movement] [family: breach] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), relentless-pursuit (always/movement), bound (always/movement)
[reskin] classification handed to the fit call: shape=condition when=on_hit often=at_will
[reskin] word match declined by the call: spider-climb, relentless-pursuit, bound, relic-object — the key word does not mean the mechanic here
[reskin] closest refused: trait — "spider-climb" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: lets the creature glide on falls and keeps its grip on creatures and o)
[reskin] seat answered, but: the call said "Leathery Wing-Flaps and Coiling Tail. The cap-snatch monkey has a prehensile tail and broad gliding membranes. It can ha" is carried by "Leathery Wing-Flaps and Coiling Tail", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("lets the creature glide on falls and keeps its grip on creatures and o") and wrote a trait instead: "Leathery Wing-Flaps and Coiling Tail" -> Traits. The cap-snatch monkey can hang from, climb, or move along any surface, including ceilings and sheer walls, without an ab
[reskin] authored row numbers: "Leathery Wing-Flaps and Coiling Tail" — the call declared 0 number(s) promised
[reskin] free signature row: "Leathery Wing-Flaps and Coiling Tail" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Leathery Wing-Flaps and Coiling Tail" ("Leathery Wing-Flaps and Coiling Tail. The cap-snatch monkey has a prehensile tail and broad gliding membranes. It can hang from, climb, or move along any surfac [authored: the catalog held no shape for it]")
[reskin] weapons answered: Claw = none; Swooping Snatch = none
[reskin] chassis nova: "Swooping Snatch (Recharge 5-6)" — the skirmisher-3-winged's own nova row (its "Diving Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "can you make a flying monkey that steals" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Marked for Snatching (Recharge 5-6).
[reskin] free-row budget by card size: CR 1 sits in band 0-2, where print runs 1-4 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Leathery Wing-Flaps and Coiling Tail" [no template]
[reskin] ask vs row MISMATCH: "steals hats lol" -> "Marked for Snatching" — limit: asked at_will, row reads recharge
[reskin] save re-derived after a retype: Actions/Swooping Snatch — a Strength save for a condition the row IMPOSES, which calls for Dexterity or Constitution (A2: a condition the row merely requires does not pick the stat)
[reskin] sheet lint: citation-gate-mismatch: Multiattack: cites "Marked for Snatching", which is gated (Recharge 5-6), without "if available" | two-recharge-rows: "Swooping Snatch" and "Marked for Snatching": 2 rows on a Recharge — neither is a strike
[reskin] lint: dual-recharge: Two Recharge-gated entries (Swooping Snatch (Recharge 5-6), Marked for Snatching (Recharge 5-6)) — print never fields two; one should be 1/Day, ungated, or replaced | citation-gate-mismatch: Multiattack: cites "Marked for Snatching", which is gated (Recharge 5-6), without "if available" | two-recharge-rows: "Swooping Snatch" and "Marked for Snatching": 2 rows on a Recharge — neither is a strike
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Leathery Wing-Flaps and Coiling Tail carries "leathery gliding wings and prehensile tail" — "can glide when it falls, descending no faster than its normal fly Speed"
[reskin] audit: [Marked for Snatching (Recharge 5-6): The 'snatch' … creature is subjected to the following effect."), Marked for Snatching (Recharge 5-6): The name prom…lowing effect. *Dexterity Saving Throw*: DC 11."), Leathery Wing-Flaps and Coiling Tail: The first cl…lings and sheer walls, without an ability check"), Leathery Wing-Flaps and Coiling Tail: A creature w… descending no faster than its normal fly Speed")]
[reskin] audit rename held — "Marked for Snatching" was written for the GM's own clause (cl_1ot0ge5: "steals hats lol"), so "Snatching Claw" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Marked for Snatching" [model-written] medium undelivered — The 'snatch' row never removes anything — it deals no damage of its own and only adds a Grappled rider to a Claw hit, so it does not deliver the hat-stealing fantasy the GM asked for. — Give the named action its own payload (a steal/drag or possession effect keyed to the stolen object) rather than an extra condition stapled to a Claw hit. (about: "The cap-snatch monkey makes one Claw attack. If it hits a creature, that creature is subjected to the following effect.")
[reskin] audit defect: Traits/"Leathery Wing-Flaps and Coiling Tail" [model-written] medium other — The first clause just re-states the Climb speed in unstructured prose while a later clause also grants Advantage on climbing checks, forcing the GM to reconcile overlapping climb rules mid-turn. — Trim the free-climb clause that duplicates the Climb speed and keep only the Advantage and glide clauses. (about: "can hang from, climb, or move along any surface, including ceilings and sheer walls, without an ability check")
[reskin] audit defect: Traits/"Leathery Wing-Flaps and Coiling Tail" [model-written] low weak — A creature with a 60 ft. Fly speed gains nothing from a fall rate equal to its fly speed, so the gloss-wings clause reads as motion the body already performs better under its own power. — State the glide in terms that matter to a flying creature (e.g., horizontal travel while descending) or drop the clause. (about: "can glide when it falls, descending no faster than its normal fly Speed")
[reskin] clause unresolved: "Leathery Wing-Flaps and Coiling Tail" carries "Leathery Wing-Flaps and Coiling Tail. The cap-snatch mon", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] multiattack citation synced: "Multiattack" cites each row as the row is named — a gated row reads "if available" as print writes it, an ungated row reads bare
[reskin] sheet lint re-read at ship: 2 finding(s) stored before the audit and the derivation, 1 on the finished sheet
[reskin] done: "Cap-Snatch Monkey" — donor skirmisher-3-winged, CR 1
[reskin] ledger: 1 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 1 mismatch, 0 open
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 37-cap-snatch-monkey.json — 1 recorded answer(s) unused
```

---

## 38-hollow-king

## 38. Hollow King — CR 20

**Input:** `name: The Hollow King | final boss of a level 15 campaign, lich-like but not a lich, three phases`
**Donor:** caster-21 -> CR 20
**Signature:** library

### Block
```
Hollow King

Medium Undead, Neutral Evil

AC 20
Initiative +3 (13)

HP 283 (27d8 + 162)

Speed 30 ft., Fly 30 ft. (hover)

MOD
SAVE
STR
11
+0
+0
INT
26
+8
+14
MOD
SAVE
DEX
16
+3
+3
WIS
17
+3
+9
MOD
SAVE
CON
22
+6
+12
CHA
20
+5
+5

Skills Arcana +14, Perception +9

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 120 ft.; Passive Perception 19

Languages Common plus the languages it knew in life

CR 20 (XP 25,000; PB +6)

Traits

Lichlike. The hollow king has immunity to the Poisoned condition and cannot be put to sleep by magic.

Legendary Resistance (3/Day). If the hollow king fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The hollow king makes three attacks, using Grave Bolt or Scepter in any combination. It can replace one attack with a use of (A) Merciless Strike or (B) Spellcasting to cast Bestow Curse.

Grave Bolt. Ranged Attack Roll: +14, range 80/320 ft. 30 (5d8 + 8) Necrotic damage.

Scepter. Melee Attack Roll: +14, reach 5 ft. 18 (3d6 + 8) Bludgeoning damage plus 13 (3d8) Necrotic damage.

Hollowing (Recharge 5-6). Constitution Saving Throw: DC 22, each creature in a 20-foot Emanation originating from the hollow king. Failure: 66 (12d10) Necrotic damage. Success: Half damage only.

Spellcasting. The hollow king casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 22):

- At Will: Detect Magic, Mage Hand, Bestow Curse, Fear

Merciless Strike. The hollow king strikes where the target cannot guard. Dexterity Saving Throw: DC 22, one creature within 60 feet. Failure: 36 (8d8) Necrotic damage. Success: Half damage.

Reactions

Protective Magic (3/Day). Trigger: The hollow king is hit by an attack roll. Response: The hollow king casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the hollow king can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Lash. The hollow king makes one Grave Bolt attack.

Throne Step. The hollow king teleports up to 30 feet to an unoccupied space it can see. The hollow king can't take this action again until the start of its next turn.

Crown Terror. Wisdom Saving Throw: DC 22, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
!! [ENRICHMENT] Failed to enrich Cap-Snatch Monkey: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 6 taken name(s) the recording carried
[path] homebrew — title King — "lich-like but not a lich" (call)
[route] caster (artillery) type=Undead mechanics=none — casts: implied by the kind — "lich-like but not a lich" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("lich-like but not a lich") | caster: no line key in the words — the model's read of its quote
[concept] name: "Hollow King" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=caster type=Undead typeFrom=the route call themes=grave/terror mind=sapient style=— energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: provided "Hollow King"
[concept] mechanics: none claimed
[concept] signature elements: three-phase hollowing — each death sheds a husk into a worse form [behavior] | the shadow-throne of hollowed dead it raises and commands [behavior] | a body of crested shadow crowned around an emptiness [body]
[concept] identity: The Hollow King opens by seizing the field — raising hollowed dead from its own shadow and hurling bolts of grave-cold at whoever closes distance — then holds its throne at range, spending each round peeling apart the strongest enemy with curses and its draining gaze while its hollow servants eat the others. It never flees; when bloodied it sheds its first body, and when broken again it sheds the second, walking out of its own husk angrier, emptier, and more terrible each time, toying with prey it could finish earlier because it wants their fear more than their death.
[concept] lore: A king who refused to be buried and was instead emptied — his court hollowed him out bone by bone with their oaths and left a crowned absence on the throne; he wants a kingdom of nothing, subjects whose hearts are as gone as his.
[reskin] nova capped: "Area Nova" 76 → 66 (the chassis nova obeys the cap: 66 at CR 20)
[reskin] mind tier held: INT stays 26 against "formidable" — INT is the attacking score
[reskin] mind tier held: WIS stays 17 against "capable" — the card's 17 is already capable
[reskin] mind tier: CHA 16 -> 20 — the call read this creature as formidable at CR 20
[reskin] donor: caster-21 -> CR 20
[reskin] seats: action <- "three-phase hollowing — each death sheds a husk into a worse form" | trait <- "a body of crested shadow crowned around an emptiness"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] repair round 1: 1 defect(s) — name "Grave Bolt" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the hollow king" — the call answered "the hollow king" (kind), which the name does not support
[reskin] inline form: "the hollow king" — the model's own reading of the name
[reskin] fear unearned by the damage: "Scepter" would have imposed Frightened on a Bludgeoning row — print pairs Frightened with Psychic or Thunder damage and with nothing else; the clause leaves and the row keeps its damage
[reskin] spell DC coherence: DC 21 -> 22 off Intelligence 26 (the stat makes the attack rolls)
[reskin] save dc derived: DC 21 -> 22 (8 + PB 6 + Intelligence's 8) — no stat on the sheet reached it
[reskin] the sheet's declared ask: escalate — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "not a lich" is not the GM's own span — a lack quotes the words that take the thing away
[reskin] lacks not claimed: "not a lich" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "The Hollow King — final boss of a level 15 campaign" -> has (descriptive), head | "lich-like" -> has (mechanical) [asked: save_area] [askMechanic: escalate] | "not a lich" -> has (mechanical) [asked: resist] [askMechanic: resist] | "three phases" -> has (mechanical) [asked: when_bloodied/buff_self] [askMechanic: escalate]
[reskin] open asks handed to the idea call: "lich-like" [escalate] · "not a lich" [resist] · "three phases" [escalate] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "When the hollow king is reduced to its Bloodied threshold by an attack" answers the GM's "three phases"
[reskin] idea unanchored: trait — "The hollow king is crowned around an absence; its crested shadow-body " names none of the 3 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 32 of 32 answered; not true of this body: snare, seal, snare-bolt, herd, rally, heated-body, false-appearance, absorption, spider-climb, terrain-walk, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, warded-mending, mimicry, kill-denial
[reskin] menu: taste stands down — action answers the GM's "three phases", so role and style do not filter the menu (legality still does); 17 template(s) offered
[reskin] menu pruned: action — thrown-burst-seed, phase-slip, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When the hollow king is reduced to its Bloodied threshold by an attack or spell, it does not fall but instead collapses inward and erupts — a wave of grave-cold nothing washing out from its collapsing crown. Its husk splits and the next phase steps out of the ruin: the body on the sheet is replaced, at the same initiative, by the same creature restored to a fresh pool of hit points and shorn of it" [action/once_per_fight/resource] [family: kill-growth] — menu: gaze-single, condition-payoff, execute, lure, pacify, escalating-dread, slow-bolt, sensory-strike, drain, curse-debt, zone-seed, reveal, throw-retrieve, terror-pulse, disarm, push-prone, exploiter (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, patient-defense, second-wind, focus, feint-slip, riposte, answering-strike, life-drain, bolt-restrain, bolt-drag, bolt-mark, stunning-strike, charge-push, pounce, isolation, charge)
[reskin] composed candidates: none action — the kill-growth family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — escalate: condition-payoff, execute, exploiter
[reskin] menu ordered by the idea's stamps: action — idea fires once_per_fight/does resource; leading: condition-payoff (save/damage), execute (save/damage), exploiter (save/condition)
[reskin] classification handed to the fit call: shape=save_area
[reskin] word match declined by the call: drain, life-drain, execute — the key word does not mean the mechanic here
[reskin] closest refused: action — "drain" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: restores the creature itself to a fresh pool of hit points mid-fight w)
[reskin] seat authored nothing: action — the call was asked to write an action for "When the hollow king is reduced to its Bloodied threshold by an attack" and wrote no row of that kind (refused: "Phases of the Hollow Crown" — the call counts 1 number(s) the row promises and only 0 are written — a promised amount, area or bonus with no number cannot be run) (it belongs in the description)
[reskin] seat asked again: action — the first answer was refused ("Phases of the Hollow Crown" — the call counts 1 number(s) the row promises and only 0 are written — a promise); asking once more with the reason
[reskin] seat authored nothing: action — the call was asked to write an action for "When the hollow king is reduced to its Bloodied threshold by an attack" and wrote no row of that kind (refused: "Phases of the Hollow Crown" — the call counts 1 number(s) the row promises and only 0 are written — a promised amount, area or bonus with no number cannot be run) (it belongs in the description)
[reskin] seat refused twice: action — first: "Phases of the Hollow Crown" — the call counts 1 number(s) the row promises and only 0 are; second: "Phases of the Hollow Crown" — the call counts 1 number(s) the row promises and only 0 are; the seat stays empty
[reskin] closest refused — subject flipped: action — the call named "drain" nearest and judged its subject FLIPPED against the clause (restores the creature itself to a fresh pool of hit points mid-fight w); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] the declared ask's own template lands: action — the sheet's declared ask is "escalate", the seat that carries it ended with no row, and "condition-payoff" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] pick kept on the GM's own words: action — "condition-payoff" has no key-table verb, but the call quotes "three phases" from the description
[reskin] one nova: "Crown Collapse" arrived gated on a sheet whose chassis already carries a Recharge nova — the gate leaves and the row prices at the ceiling (the wyrm's Shattering Ice Snare, step 7)
[reskin] value check: "Crown Collapse" EV 38 vs floor 37.7 (one attack of 3) — dice 28 → 28; priced at the floor: dice 28 → 49
[reskin] signature template: condition-payoff -> Actions/"Crown Collapse" ("the idea is a phase-change rebirth at Bloodied that replaces the creature with a [shape fit, no verb match]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's 19 at CR 20, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The hollow king is crowned around an absence; its crested shadow-body is not wholly here. It passes through creatures and objects as if they were difficult terrain, and it can hide its presence from the living — creatures that rely on sight alone cannot perceive it until it attacks or casts. When a creature enters the space of its shadow, the shadow clings and darkens the target's sight (the Blind" [trait/always/movement] [family: zone] — menu: phobia, aberrant-ground, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, sealed-body, relic-object, undead-fortitude, truth-aura, fear-aura, blurred-form, death-burst, evasion, guarded-stance (+ shelf: bloodied-burst, resonant-body, gaze-aura)
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — escalate: bloodied-fury, blood-frenzy
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: bloodied-fury (always/defense), blood-frenzy (always/damage), aberrant-ground (always/movement)
[reskin] keys would have bound: trait — death-burst, resonant-body (final, hollow)
[reskin] classification handed to the fit call: shape=save_area
[reskin] word match declined by the call: aberrant-ground, relentless-pursuit, bound, composed:zone:terrain — the key word does not mean the mechanic here
[reskin] closest refused: trait — "energy-aura" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a sight/targeting debuff on creatures whose space the shadow passes th)
[reskin] seat answered, but: the call said "The hollow king is crowned around an absence; its crested shadow-body is not wholly here. It passes through creatures an" is carried by "Crested Absence", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The hollow king is crowned around an absence; its crested shadow-body " and wrote no row of that kind (refused: "Crested Absence" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Crested Absence" — a trait is not a save — the save form takes stat, target and effect as fields and the engi); asking once more with the reason
[reskin] seat answered, but: the call said "The hollow king is crowned around an absence; its crested shadow-body is not wholly here. It passes through creatures an" is carried by "Crested Absence", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The hollow king is crowned around an absence; its crested shadow-body " and wrote no row of that kind (refused: "Crested Absence" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat refused twice: trait — first: "Crested Absence" — a trait is not a save — the save form takes stat, target and effect as; second: "Crested Absence" — a trait is not a save — the save form takes stat, target and effect as; the seat stays empty
[reskin] the declared ask's own template lands: trait — the sheet's declared ask is "escalate", the seat that carries it ended with no row, and "bloodied-fury" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] signature miss: trait — "bloodied-fury" quotes nothing the GM typed, matches no key-table verb, and the call named none of this creature's own elements for it: decoration, not a signature
[reskin] one mechanic, one name: Actions/"Crown Collapse" -> "Merciless Strike" — this row is condition-payoff and does what every condition-payoff row does; a bespoke name would promise more than the text delivers
[reskin] repair: 2 clause(s) with no row — "lich-like", "not a lich"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced []
[reskin] condition relation: "Lichlike" — the call reads its condition as immune, so no condition is recorded against it
[reskin] repaired sheet: 2 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Grave Bolt = none; Scepter = mace; Hollowing = none
[reskin] weapon declined: "Grave Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon declared: "Scepter" is a mace — the call's own answer
[reskin] weapon dice follow the weapon: "Scepter" is a mace (d6) — "17 (2d8 + 8)" becomes "18 (3d6 + 8)", print's rule of keeping the die and scaling the count
[reskin] weapon table: "Grave Bolt" — a launcher, never thrown, range 80/320
[reskin] chassis nova: "Hollowing (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "lich-like but not a lich" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of (A) Merciless Strike or (B) Spellcasting to cast *Bestow Curse*.
[reskin] free-row budget by card size: CR 20 sits in band 17-20, where print runs 7-9 rows (p20-p90, Multiattack excluded); this card already carries 12 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] asked but unanswered: "three phases" asked for when_bloodied and no row binds the clause
[reskin] name follows content: Legendary Actions/"Cold Lash" carries Cold the row never deals — "Lash" (the element word drops; the call's own noun stays)
[reskin] lint: 0 findings
[reskin] audit: [Lichlike: The Poisoned immunity duplicates the blo… condition and cannot be put to sleep by magic.")]
[reskin] audit defect: Traits/"Lichlike" [model-written] high other — The Poisoned immunity duplicates the block's own Immunities line ("Poison; Exhaustion, Poisoned"), so the trait's first clause is dead text and the trait's name promises a full lich package it does not deliver. — Trim the redundant Poisoned clause and either drop the entry or keep only the magic-sleep clause. (about: "The hollow king has immunity to the Poisoned condition and cannot be put to sleep by magic.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] restores the creature itself to a fresh pool of hit points mid-fight when it is reduced to Bloodied, rather than drainin — "When the hollow king is reduced to its Bloodied threshold by an attack or spell, it does not fall but instead collapses inward and erupts — a wave of grave-cold nothing washing out from its collapsing crown. Its husk splits and the next phase steps out of the ruin: the body on the sheet is replaced, at the same initiative, by the same creature restored to a fresh pool of hit points and shorn of it" — Hollow King [seat: action [action/once_per_fight/resource]] (closest offered: drain) [effect: resource] [menu: condition-payoff execute exploiter lay-on-hands gaze-single lure pacify escalating-dread slow-bolt sensory-strike drain curse-debt zone-seed reveal throw-retrieve terror-pulse disarm push-prone life-drain] [same-cell unoffered: none] [same-seat rejected: zone:cr-range wail:body-verdict] [row dropped]
[reskin] [gap] a sight/targeting debuff on creatures whose space the shadow passes through, plus moving through creatures and objects — "The hollow king is crowned around an absence; its crested shadow-body is not wholly here. It passes through creatures and objects as if they were difficult terrain, and it can hide its presence from the living — creatures that rely on sight alone cannot perceive it until it attacks or casts. When a creature enters the space of its shadow, the shadow clings and darkens the target's sight (the Blind" — Hollow King [seat: trait [trait/always/movement]] (closest offered: energy-aura) [effect: condition] [menu: bloodied-fury blood-frenzy aberrant-ground relentless-pursuit bound phobia pack-tactics death-restoration shielded-mind sealed-body relic-object undead-fortitude blurred-form death-burst evasion guarded-stance composed:zone:terrain energy-aura truth-aura fear-aura] [same-cell unoffered: blink spider-climb terrain-walk web-walker earth-glide tunneler self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: false-appearance:body-verdict adhesive:role spider-climb:body-verdict terrain-walk:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement berserk:role marking-light:body-verdict mimicry:body-verdict assassinate:role kill-denial:body-verdict] [row dropped]
[reskin] signature outcome: 2 of 2 accepted signature pick(s) never reached the sheet — 2x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 2 of 2 (2x the call named no template for the pick) · path homebrew
[reskin] single-target save capped: "Merciless Strike" 49 -> 36 — it targets "one creature", and print's hardest single-target save row at CR 20 is 36
[reskin] done: "Hollow King" — donor caster-21, CR 20
[reskin] ledger: 3 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 2 open (2 never-written)
[harness] enrichment not run (3 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 38-hollow-king.json — 1 recorded answer(s) unused
```

---

## 39-crown-swallower-toad

## 39. Crown-Swallower Toad — CR 5

**Input:** `solo boss for 4 level 3 players, a giant toad with a crown`
**Donor:** brute-5 -> CR 5
**Signature:** library

### Block
```
Crown-Swallower Toad
Large beast, unaligned
Armor Class

13 (natural armor)

Hit Points: 

97 (15d10 + 15)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

13 (+1)

	

13 (+1)

	

2 (-4)

	

10 (+0)

	

3 (-4)

Skills: 

Athletics +6, Perception +3

Saving Throws: 

STR +6, CON +4

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

None

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Wounded Fury.While below half its hit point maximum, the toad has advantage on attack rolls.
Amphibious.The toad can breathe air and water.
Standing Leap.The toad's Long Jump is up to 20 feet and its High Jump is up to 10 feet with or without a running start.

Actions
Multiattack: The toad makes two Bite attacks. It can replace one attack with a use of Swallow.
Bite: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage plus 5 (2d4) poison damage. If the target is a Medium or smaller creature, it is grappled (escape DC 14).
Swallow: One Medium or smaller creature within 5 feet that the toad hit with a melee attack this turn must make a DC 14 Dexterity saving throw. On a failed save, the target is swallowed. A swallowed creature is blinded and restrained, has Total Cover against attacks and other effects outside the toad, and takes 7 (2d6) poison damage at the start of each of the toad's turns. If the toad takes 15 damage or more on a single turn from a creature inside it, it must succeed on a DC 14 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the toad and is knocked prone. If the toad dies, a swallowed creature is no longer restrained and can escape from the corpse using 10 feet of movement, exiting with the prone condition.
```

### Trace
```
!! [ENRICHMENT] Failed to enrich Hollow King: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795816686829:664:5)
[harness] restored 7 taken name(s) the recording carried
[path] twist — Giant Toad (is) — "giant toad" (call)
[route] brute-grappler type=Beast mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape: contain on the GM's own words "a giant toad with a crown" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("a giant toad") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a giant toad with a crown…" is the description, not a name
[concept] resolve: archetype=brute type=Beast typeFrom=the route call themes=bestial/grasping mind=sapient style=grappler energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: a crown grown into / resting on its hide [object] | swallowing prey whole into its gullet [behavior] | royal bog-tyrant dominance [aura]
[concept] identity: The Crowned Toad opens by bellowing a deep, crown-rung command that fixes the boldest hero in place, then lunges to seize and swamp them in its hide as wide as a wagon. Every round after that it swallows or crushes whatever it holds, using its bulk to pin prey against the mud while its crowned girth shrugs off blows, and it never flees — it fights to the death with the arrogant patience of a thing that believes the swamp already belongs to it.
[concept] lore: A toad that swallowed a drowned king's crown in some forgotten mire and grew fat on the authority it stole, it now rules a stretch of bog as a petty tyrant, demanding tribute from travelers and dragging the defiant down into the mud.
[reskin] print canon route: the Giant Toad's body outranks the grappler seat — no verb in the words names it; the plain brute line
[reskin] print canon array: STR 16, DEX 13, CON 13, INT 2, WIS 10, CHA 3 — the Giant Toad's, STR fitted to +6
[reskin] donor: brute-5 -> CR 5
[reskin] seats: action <- "swallowing prey whole into its gullet" | trait <- "a crown grown into / resting on its hide"
[reskin] [path] decides: twist on the Giant Toad (the matcher would have said homebrew)
[reskin] print canon: "solo boss for 4 level 3 players, a giant toad with a crown" heads on the Giant Toad — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the toad" — the call's own answer (kind), built from the name
[reskin] inline form: "the toad" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "solo boss for 4 level 3 players" -> has (descriptive), head | "a giant toad with a crown" -> has (descriptive)
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (2 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "The toad's tongue lashes out and, instead of striking, coils around a " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The toad's presence commands the swamp: while it is Bloodied, the crow" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: shield-bash, active-toll, random-ray, herd, drain, shell-withdraw, rally, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, spider-climb, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, death-burst, life-drain
[reskin] signature idea (action): "The toad's tongue lashes out and, instead of striking, coils around a victim — the target must make a Strength saving throw or be pulled to the toad and Grappled in its mouth, where it can be swallowed whole on the next turn." [action/save/condition] [family: drag] — menu: swallow, trample, leap, ground-burst, spew, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, lure, pacify, sensory-strike, reveal (+ shelf: rampage, second-wind, aggro-curse, self-invisibility, focus, coating, answering-strike, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: swallow (save/condition), escalating-dread (save/condition), terror-pulse (save/condition)
[reskin] classification handed to the fit call: mechanic=grapple, engulf
[reskin] word match declined by the call: escalating-dread, terror-pulse, push-prone, lure, pacify, sensory-strike, reveal, trample, leap, ground-burst, spew, thrown-burst-seed, wind-up — the key word does not mean the mechanic here
[reskin] seat takes its clause: "Swallow Whole" is HANDED "solo boss for 4 level 3 players" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: swallow -> Actions/"Swallow Whole" ("coils around a victim, pulled to the toad and Grappled in its mouth, swallowed w [verb: swallow:idea, swallows:idea, swallowed:idea, whole:idea]")
[reskin] condition rider rides the attack: trait — the payoff family composes a rider, so the idea is re-seated trait/always -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (trait): "The toad's presence commands the swamp: while it is Bloodied, the crowned authority in its hide rallies the mire itself, and the toad has Advantage on attack rolls against any creature Grappled by or Prone before it. Its kingdom answers only to a king still fighting." [rider/on_hit/condition] [family: payoff] — menu: stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: adhesive, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, weapon-lodge, kill-denial)
[reskin] composed candidates on the menu: trait — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — grapple: hook-rider
[reskin] menu ordered by the idea's stamps: trait — idea fires on_hit/does condition; leading: hook-rider (on_hit/movement), stunning-strike (on_hit/condition), pounce (on_hit/condition)
[reskin] classification handed to the fit call: mechanic=grapple, engulf
[reskin] word match declined by the call: stunning-strike, pounce, composed:payoff:condition, charge-push, charge, hook-rider — the key word does not mean the mechanic here
[reskin] free signature row: "Crowned Rally" — the trait seat cannot quote the GM, but the call names the element it expresses: "royal bog-tyrant dominance". Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Crowned Rally" is HANDED "solo boss for 4 level 3 players" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): bloodied-fury -> Traits/"Crowned Rally" ("while it is Bloodied, the crowned authority in its hide rallies the mire itself, [verb: bloodied:idea]")
[reskin] one mechanic, one name: Actions/"Swallow Whole" -> "Swallow" — this row is swallow and does what every swallow row does; a bespoke name would promise more than the text delivers
[reskin] one mechanic, one name: Traits/"Crowned Rally" -> "Bloodied Fury" — this row is bloodied-fury and does what every bloodied-fury row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Tongue Lash = none
[reskin] print canon size: Huge -> Large — the Giant Toad's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Giant Toad's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 30 ft. — the Giant Toad's own
[reskin] print canon attack: "Tongue Lash" -> "Bite" — the Giant Toad's own row
[reskin] languages held: None stands — INT 2 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Amphibious — "solo boss for 4 level 3 players, a giant toad with a crown" is the Giant Toad (print's own row)
[reskin] print canon trait: Standing Leap — "solo boss for 4 level 3 players, a giant toad with a crown" is the Giant Toad (print's own row)
[reskin] multiattack replacement clause: It can replace one attack with a use of Swallow.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Bloodied Fury" [trait/always/defense]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 2 row(s) shown with the clause they were written for
[reskin] element expressed: Bloodied Fury carries "royal bog-tyrant dominance" — "While Bloodied, the toad has Advantage on attack rolls."
[reskin] audit: [Swallow: The trigger references a melee hit made '…that the toad hit with a melee attack this turn"), Bloodied Fury: The row was written to express a ro…oodied, the toad has Advantage on attack rolls.")]
[reskin] audit defect: Actions/"Swallow" [catalog] medium untrackable — The trigger references a melee hit made 'this turn', but Swallow is used during Multiattack after a Bite, so the GM must remember which creature was hit earlier in the same turn rather than resolve it from the current action. — Rework the trigger so it comes off the Bite's own rider (e.g., target already Grappled by the toad) so no earlier-turn tracking is needed. (about: "one Medium or smaller creature within 5 feet that the toad hit with a melee attack this turn")
[reskin] audit defect: Traits/"Bloodied Fury" [model-written] medium undelivered — The row was written to express a royal bog-tyrant dominance, but the mechanics are a generic self-buff that would read identically on any brute and does not carry that fiction. — Recast the trigger/effect so the dominance shows in how it treats other creatures rather than only its own attack rolls. (about: "While Bloodied, the toad has Advantage on attack rolls.")
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] escape dc: Bite → DC 14 (8 + PB + STR; a late row wore another number)
[reskin] done: "Crown-Swallower Toad" — donor brute-5, CR 5
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 39-crown-swallower-toad.json — 1 recorded answer(s) unused
```

---
