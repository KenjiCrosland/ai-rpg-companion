# Four sheets from the sprint feature batch — for the critic's spot-check alongside the forty — 2026-10-12

The critic asked (green-light read, 2026-10-12) for four sheets from the frozen sprint batch (`features-2026-10-2026-10-12T18-06-23`, the reference run) so the fix round's claims can be read against rows: Okhra (the greataxe out of a header clause, Great Weapon Master), Dame Oriel (the block that stalled and was rerun; the silvered rapier beside one Crossbow, a Riposte that names a real row), the Gullet-Wyrm (the swallow; "that creature" as one target), and the hill giant archer (no melee row, the Multiattack re-read). Each block: its checker row, the sheet as saved, the engine trace. Not a gate.

---

## Okhra the Hewer

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Okhra the Hewer | 13 (2014) | 2014 | skirmisher-13-skulker | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 6/6 |


**Input:** `name: Okhra the Hewer | A Large ogre champion wielding a huge two-handed greataxe with crushing force; she has a tusked bite and shrugs off blows with a thick hide.`
**Donor:** skirmisher-13-skulker -> CR 13 (invented — no printed peer)
**Signature:** none · **elapsed** 20s

### Block
```
Okhra the Hewer
Large giant, neutral
Armor Class

18 (natural armor)

Hit Points: 

180 (19d10 + 76)

Speed: 

60 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

16 (+3)

	

18 (+4)

	

10 (+0)

	

16 (+3)

	

12 (+1)

Skills: 

Perception +8, Stealth +8

Saving Throws: 

DEX +8, WIS +8

Senses: 

darkvision 60 ft., passive Perception 18

Languages: 

Common

Challenge

13 (10,000 XP)

Proficiency Bonus:

+5

Great Weapon Master. When Okhra hits a creature with its greataxe, the attack deals an extra 5 damage.
Trailwise. Okhra ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Backstep. When a creature Okhra can see ends its turn within 5 feet of it, Okhra can move up to 10 feet without provoking opportunity attacks.
Nimble Escape. As a bonus action, Okhra takes the Disengage or Hide action.

Actions
Multiattack: Okhra makes three attacks, using Greataxe or Tusked Bite.
Greataxe: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 25 (5d8 + 3) slashing damage.
Tusked Bite: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
```

### Trace
```
[route] skirmisher-skulker type=Giant mechanics=none — brute: ✓ ("wielding a huge two-handed greataxe with") | brute -> skirmisher-skulker: the concept's VERB outranks the noun (key "hide", class verb) | skirmisher-skulker: key "hide" (class verb)
[concept] resolve: archetype=skirmisher type=Giant themes=armed/bestial mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Okhra the Hewer"
[concept] mechanics: none claimed
[concept] signature elements: ambush-and-vanish axe strikes [behavior] | massive two-handed greataxe [object] | thick hide that shrugs off blows [body]
[concept] identity: Okhra opens from ambush, bursting from cover to split a foe with a greataxe swing meant to pulp, then vanishes into the terrain before the survivors can answer. Every round she repeats this: a crushing rush, a tusked bite for anything left standing, then a shrug of her thick hide as she backs into shadow. She is not a skulking coward but a patient butcher — she toys with prey who panic, and she fights to the death only when cornered, preferring to bleed a party over ground she chose.
[concept] lore: Okhra the Hewer was the last champion of a broken ogre war-band, and she haunts the ruins of their stolen hill-fort, hunting anything that carries iron or fire.
[reskin] donor: skirmisher-13-skulker -> CR 13 (invented — no printed peer)
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] seats: action <- "ambush-and-vanish axe strikes" | trait <- "massive two-handed greataxe"
[reskin] named parts: Greataxe (slot), Tusked Bite (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] part supersedes: Actions/"Tusked Bite" leaves — the model named a chassis row for the user's Tusked Bite; the part is that row
[reskin] features: Great Weapon Master (trait) — the feature table, no call
[reskin] proper noun: "Okhra the Hewer" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline form: "Okhra" — the model's own reading of the name
[reskin] signature idea (trait): "The enormous crescent blade of Okhra's greataxe chips and splinters whatever it strikes, and she feeds the shattered remnants into her hide, thickening it against the next blows. Each time she lands a telling blow, her body knits over with jagged iron and fire-hardened timber, briefly turning her into a walking barricade." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The enormous crescent blade of Okhra's greataxe chips and splinters whatever it strikes, and she feeds the shattered remnants into her hide, thickening it against the next blows. Each time she lands a telling blow, her body knits over with jagged iron and fire-hardened timber, briefly turning her into a walking barricade." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] seat default: skulker owes assassinate by print — it seats before the idea
[reskin] trait ceiling: "Assassinate" does not ship — 3 traits already, and print's ceiling for a meat body is 3
[reskin] seat default: skulker owes evasion by print — it seats before the idea
[reskin] trait ceiling: "Evasion" does not ship — 3 traits already, and print's ceiling for a meat body is 3
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] lint: 0 findings
[reskin] audit: [Trailwise: This clause duplicates Nimble Escape, w… Attacks against it are made with Disadvantage."), Great Weapon Master: This entry name is a meta-ref…s Greataxe, the attack deals an extra 5 damage.")]
[reskin] audit rename blocked — "Great Weapon Master" is the user's own part name, a feature's real name, or print's own row
[reskin] done: "Okhra the Hewer" — donor skirmisher-13-skulker, CR 13
[reskin] 2014 conversion: one lint-gated call — both printings saved
```

---

## Dame Oriel Vance

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dame Oriel Vance | 7 (2014) | 2014 | skirmisher-3-archer | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/5 |


**Input:** `name: Dame Oriel Vance | a vampire hunter with a silvered rapier and a crossbow`
**Donor:** skirmisher-3-archer -> CR 7
**Signature:** library · **elapsed** 28s

### Block
```
Dame Oriel Vance
Medium humanoid, neutral
Armor Class

15 (chain shirt)

Hit Points: 

130 (20d8 + 40)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


11 (+0)

	

16 (+3)

	

15 (+2)

	

11 (+0)

	

14 (+2)

	

11 (+0)

Skills: 

Perception +5, Stealth +6

Saving Throws: 

DEX +6

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Common

Challenge

7 (2,900 XP)

Proficiency Bonus:

+3

Duelist's Step. Dame Oriel ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, Dame Oriel takes the Dash or Disengage action.
Riposte (Reaction). When a creature within 5 feet of Dame Oriel misses it with a melee attack, Dame Oriel makes one Silvered Rapier attack against that creature.

Actions
Multiattack: Dame Oriel makes two attacks: one with Silvered Rapier and one with Crossbow.
Silvered Rapier: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage, and Dame Oriel has advantage on its next attack roll against the target before the end of its next turn.
Crossbow: Ranged Weapon Attack: +6 to hit, range 80/320 ft., one target. Hit: 21 (4d8 + 3) piercing damage, and Dame Oriel has advantage on its next attack roll against the target before the end of its next turn.
```

### Trace
```
[route] skirmisher-archer type=Humanoid mechanics=thrown-weapon — skirmisher-archer: ✓ ("a crossbow") | skirmisher-archer: key "crossbow" (class noun)
[concept] resolve: archetype=skirmisher type=Humanoid themes=grave/armed mind=sapient style=archer energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Dame Oriel Vance"
[concept] mechanics: thrown-weapon
[concept] signature elements: silvered rapier precision [object] | hunting her own kind [behavior] | a vampire compelled by the hunt [behavior]
[concept] identity: Dame Oriel Vance opens at the edge of her crossbow's reach, planting a silvered bolt before she closes — then uses her silvered rapier to punish any vampire that tries to pin her in melee. She is a duelist above all: mobile, precise, and unhurried, preferring to bleed a predator across the room rather than stand and trade, and she disengages when wounded only to reappear at a better angle.
[concept] lore: A once-celebrated vampire-hunter of a fallen order, Oriel was turned by the very quarry she stalked; she now plies the old roads and ruined chapels, using her master's silvered techniques to hunt her own kind in a desperate bid for a cure that may not exist.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3-archer -> CR 7
[reskin] seats: action <- "hunting her own kind" | trait <- "silvered rapier precision"
[reskin] repair round 1: 1 defect(s) — "Silver Bolt" deals Radiant on a Humanoid whose concept names no Radiant — a name is not a warrant; use a physical type
[reskin] named parts: Silvered Rapier (slot), Crossbow (slot, ranged) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] features: Vex on Silvered Rapier, Vex on Crossbow — the feature table, no call
[reskin] proper noun: "Dame Oriel Vance" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline form: "Oriel" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "With a clear line to a foe that has been wounded this fight, Dame Oriel plants a silvered bolt through the old bite-scar, thigh, or wing-joint, then lets the pain do her hunting for her. Until that foe tears the bolt free at the cost of its own blood, it flinches at every cut, leaving her an opening to slip away and reappear where it is already looking the wrong way." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, throw-retrieve, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (rapier)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into riposte
[reskin] value check: "Silvered Riposte" EV 14.3 vs floor 3.6 (a reaction (free)) — worth the trade
[reskin] signature template: riposte -> Reactions/"Silvered Riposte" ("The concept's own verb is the rapier, and a vampire hunter's signature use of a  [verb: rapier:concept, opening:idea]")
[reskin] keys spent by the action: rapier
[reskin] signature idea (trait): "Against a foe that has wounded her first, her … finds the opening that only a hunter-turned-prey can see, and each such cut teaches her the angle for the next. She does not flinch from the thing that bit her; she measures it." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] trait declined: "Measured Retort" — bound only on the idea's own words (wounded:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] feature name: "Silvered Riposte" -> "Riposte"
[reskin] weapon table: "Crossbow" — a launcher, never thrown, range 80/320
[reskin] lint: 0 findings
[reskin] audit: [Duelist's Step: The antecedent of "it" is ambiguou… Attacks against it are made with Disadvantage.")]
[reskin] audit rewrite blocked — "Duelist's Step" is engine-authored chassis text
[reskin] done: "Dame Oriel Vance" — donor skirmisher-3-archer, CR 7
[reskin] 2014 conversion: one lint-gated call — both printings saved
```

---

## Gorget Gnawer

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gorget Gnawer | 16 | 2024 | brute-15-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/3 | 3/4 |


**Input:** `a gargantuan purple worm-thing that swallows horses whole and burrows under caravans`
**Donor:** brute-15-grappler -> CR 16
**Signature:** library · **elapsed** 16s

### Block
```
Gorget Gnawer

Gargantuan Monstrosity, Unaligned

AC 18
Initiative -1 (9)

HP 263 (17d20 + 85)

Speed 40 ft., Burrow 30 ft.

MOD
SAVE
STR
24
+7
+12
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
20
+5
+10
CHA
4
-3
-3

Skills Athletics +12, Perception +5

Senses darkvision 60 ft., tremorsense 120 ft.; Passive Perception 15

Languages Common

CR 16 (XP 15,000; PB +5)

Traits

Trenching Eruption. The gorget gnawer can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The gorget gnawer makes two Maw attacks.

Maw. Melee Attack Roll: +12, reach 10 ft. 54 (19d4 + 7) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 20). While Grappled, the target has the Restrained condition.

Tremor Eruption (Recharge 5-6). If the gorget gnawer is burrowing, it erupts from the ground at a point within 5 feet of one creature. Dexterity Saving Throw: DC 20, that creature. Failure: 78 (12d12) Bludgeoning damage, and the target has the Prone condition. The gorget gnawer then makes one Maw attack against the target. Success: Half damage only.

Bonus Actions

Swallow. The gorget gnawer swallows one Large or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the gorget gnawer, and takes 17 (5d6) Acid damage at the start of each of the gorget gnawer's turns. The gorget gnawer can have only one creature swallowed at a time. If the gorget gnawer takes 35 damage or more in a single turn from the swallowed creature, the gorget gnawer must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the gorget gnawer. If the gorget gnawer dies, a swallowed creature exits the body Prone by using 10 feet of movement.

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
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("swallows horses whole") | brute-grappler: key "swallows" (class verb)
[concept] name: provided_name rejected — "a gargantuan purple worm-thing that swal…" is the description, not a name
[concept] mind promoted to sapient — the identity asserts performance/taunting
[concept] hints: engulf→mechanics ✓ (""swallows horses whole"")
[concept] resolve: archetype=brute type=Monstrosity themes=subterranean/devouring mind=sapient style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: swallowing horses whole [behavior] | burrowing under caravans [behavior] | gargantuan purple worm body [body]
[concept] identity: The worm erupts beneath a caravan, jaws first, and swallows a horse whole to clear the field. Every round after, it loops back underground and re-emerges under the largest target, grappling and dragging prey into its burrow; it toys with isolated morsels but thrashes toward the deepest cluster of hooves and wheels, only withdrawing when its hide is truly breached.
[concept] lore: A devourer grown fat on the old caravan roads, it remembers the taste of horseflesh and now drags whole trains beneath the earth to feed its endless hunger.
[reskin] donor: brute-15-grappler -> CR 16
[reskin] seats: action <- "burrowing under caravans" | trait <- "gargantuan purple worm body"
[reskin] save dc derived: DC 19 -> 20 (8 + PB 5 + the sheet's best 7) — no stat on the sheet reached it
[reskin] signature idea (action): "The worm dives beneath the ground, leaving only churned earth behind, and travels unseen through the soil. It bursts up again at the start of its next turn directly beneath the largest cluster of creatures within a wide stretch of ground it can sense, showering the area with dirt and debris that staggers those caught in the upheaval." [action/always/movement] — menu: condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, burrow-ambush, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: herd, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — burrow-ambush, hook-drag (burrow, under)
[reskin] value check: "Tremor Eruption (Recharge 5-6)" EV 103 vs floor 91.3 (the whole Multiattack (2 attacks)) — added Success: Half; dice 54 → 78 (nova budget)
[reskin] signature template: burrow-ambush -> Actions/"Tremor Eruption (Recharge 5-6)" ("The worm burrows, travels unseen, erupts from the ground, and staggers those in  [verb: burrow:concept, beneath:idea, earth:idea]")
[reskin] keys spent by the action: burrow
[reskin] signature idea (trait): "The Gorget Gnawer's body is a living trench. When it erupts from the earth, the collapsing tunnel beneath it tears the ground open in a line behind it, leaving unstable, yawning …-mouths that can swallow creatures or vehicles that move over them carelessly." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — tunneler (worm, burrows, burrow)
[reskin] signature template (trait): tunneler -> Traits/"Trenching Eruption" ("The collapsing tunnel it carves through the earth is the ground torn open behind [verb: worm:concept, burrows:concept, burrow:concept, tunnel:idea, tunnels:idea, tunneling:idea]")
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] lint: 0 findings
[reskin] audit: nothing flagged
[reskin] done: "Gorget Gnawer" — donor brute-15-grappler, CR 16
```

---

## Ridgewaste

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ridgewaste | 7 | 2024 | skirmisher-3-archer | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 1/4 |


**Input:** `a hill giant archer who has no melee attack at all and shoots from the ridge`
**Donor:** skirmisher-3-archer -> CR 7
**Signature:** library · **elapsed** 19s

### Block
```
Ridgewaste

Huge Giant, Neutral

AC 16
Initiative +4 (14)

HP 119 (14d12 + 28)

Speed 30 ft., Climb 30 ft.

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
18
+4
+7
WIS
14
+2
+2
MOD
SAVE
CON
15
+2
+2
CHA
11
+0
+0

Skills Perception +5, Stealth +7

Senses darkvision 60 ft.; Passive Perception 15

Languages Common

CR 7 (XP 2,900; PB +3)

Traits

Ridge Stride. The ridgewaste ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The ridgewaste makes two Longbow attacks.

Longbow. Ranged Attack Roll: +7, range 150/600 ft. 22 (4d8 + 4) Piercing damage.

Bonus Actions

Fleet Agility. The ridgewaste takes the Dash or Disengage action.

Retaliating Slam. One creature within 5 feet that hit the ridgewaste with an attack roll since the end of the ridgewaste's last turn takes 10 (3d6) Bludgeoning damage.

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
[route] skirmisher-archer type=Giant mechanics=none — skirmisher-archer: ✓ ("shoots from the ridge") | skirmisher-archer: key "archer" (class noun)
[concept] resolve: archetype=skirmisher type=Giant themes=armed/subterranean mind=sapient style=archer energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: no melee attack—fights only at range [behavior] | shoots from elevated ridges [behavior] | giant longbow firing boulder-sized arrows [object]
[concept] identity: The ridge-archer opens by planting a boulder-sized arrow into the most exposed target from four hundred feet out, then repositions along elevated terrain every round to keep the high ground and a clean line, treating the battlefield as a vertical shooting gallery. It never closes to melee—if cornered or bloodied it abandons the position and sprints for a new ridge, using thrown boulders only as a parting screen while it withdraws. It is a patient, calculating skirmisher that fights at range until completely overwhelmed, then flees rather than brawl.
[concept] lore: Hill giant archers are exiles from their own kind, giants who traded boulder-throwing and club-swinging for the longbow after being driven from their tribe, and now they haunt ridgelines and cliff paths, picking off travelers and rival hunters for sport and supplies.
[reskin] donor: skirmisher-3-archer -> CR 7
[reskin] seats: action <- "no melee attack—fights only at range" | trait <- "giant longbow firing boulder-sized arrows"
[reskin] inline form: "the ridgewaste" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] extraction: 3 of 7 model clauses quote nothing the user typed and leave the record ("patient, calculating skirmisher that fights at range until completely overwhelmed, then flees rather than brawl", "repositions along elevated terrain every round to keep the high ground and a clean line", "opens by planting a boulder-sized arrow into the most exposed target from four hundred feet out")
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The ridgewaste looses a boulder-sized arrow that skewers its target and pins it to whatever is behind it. The pinned victim can tear itself free, but doing so costs it its next move and leaves it vulnerable as it wrenches loose. The ridgewaste can only pin one target at a time and must reload between shots." [rider/on_hit/movement] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: swallow, leap, throw-retrieve, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature miss: action — "The ridgewaste looses a boulder-sized arrow that skewers its target and pins it to whatever is behind it. The pinned victim can tear itself free, but doing so costs it its next move and leaves it vulnerable as it wrenches loose. The ridgewaste can only pin one target at a time and must reload between shots." [rider/on_hit/movement] — the model found no template that holds it (offered: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, disarm)
[reskin] fallback skipped by the floor: sensory-strike (EV 3.4 vs 13)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 13)
[reskin] value check: "Answering Sting" EV 5.5 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The ridgewaste's longbow is strung for giant arrows: any shot that misses its target continues on and can strike another creature directly behind the original target on the same line. The archer can deliberately aim through a crowded line, treating enemies as stepping stones for a single shot." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The ridgewaste's longbow is strung for giant arrows: any shot that misses its target continues on and can strike another creature directly behind the original target on the same line. The archer can deliberately aim through a crowded line, treating enemies as stepping stones for a single shot." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] vulnerability rejected — "Thunder" has no warrant in the concept's own text (print's default is none)
[reskin] lint: 0 findings
[reskin] audit: [Answering Sting: The name 'Sting' promises a pierc…t fits the ridgewaste. (about: "Answering Sting")]
[reskin] audit rename: "Answering Sting" -> "Retaliating Slam"
[reskin] lacks clause: Actions/"Fist" leaves — "has no melee attack at all" (no melee attack)
[reskin] done: "Ridgewaste" — donor skirmisher-3-archer, CR 7
```

