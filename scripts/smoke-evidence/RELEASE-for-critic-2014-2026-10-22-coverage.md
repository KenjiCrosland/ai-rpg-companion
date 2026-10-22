# Release table for the critic — 2014 blocks — 2026-10-22

The case is at the top of the 2024 file (RELEASE-for-critic-2024-2026-10-22-coverage.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

## Review batch — sweep-2026-10-22T03-29-45

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Silt Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/4 |
| Owlbear | 3 (2014) | 2014 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/3 |
| Loft Bell | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/8 |
| Air Elemental | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Scree-Pit Thing | 5 (2014) | 2014 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Breaching Frame | 8 | 2024 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/5 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Drowned Choir | 10 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 5/5 |
| Vampire | 13 (2014) | 2014 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 10/10 |
| Hive-Archon | 13 | 2024 | skirmisher-13-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 6/6 |
| Glacier Heart | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 0/1 | 9/9 |
| Brass Tyrant | 17 | 2024 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 8/10 |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Marrowsun Lich | 20 (2014) | 2014 | caster-21 | ok | ok | ok | ok | ok | FAIL: conversion-dropped-duration | ok | ok | ok | ok | FAIL (1) | 1/1 | 9/10 |
| Ancient Gold Dragon | 24 (2014) | 2014 | — | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | — | — |
| Trenchwake Leviathan | 24 | 2024 | brute-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 7/8 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Vashka the Red | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/5 |
| Caustic Scythe Horror | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/4 | 4/4 |
| Iron-Bound Sentinel | 11 (2014) | 2014 | defender-7-warden | ok | user-set: AC 20 · reads CR 9 | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic | ok | FAIL (1) | 3/3 | 7/7 |
| Fenrot Hexcrone | 7 | 2024 | caster-8-binder | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/6 |
| Ser Aldric Vane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Ilvareth Dusksong | 12 (2014) | 2014 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Swarm of Tolling Pyres | 13 | 2024 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Cathedral-Vault Ooze | 9 (2014) | 2014 | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 5/6 |
| Cragwake Drake | 7 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/3 |
| Passexile | 9 (2014) | 2014 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/3 |
| Reedsong Adept | 5 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/7 |
| Krennik Skullstandard | 4 (2014) | 2014 | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 6/7 |
| Well Drowned | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Uulgh | 4 | 2024 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 7/15 | 6/7 |
| Meshrin | 8 (2014) | 2014 | skirmisher-8-hurler | ok | user-set: AC 16, HP 120 · reads CR 6.5 | SOFT: lint:hp-formula | ok | ok | ok | ok | ok | ok | ok | soft (1) | 7/8 | 7/7 |
| Grave-Warden's Champion | 6 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/3 |
| Garrison Sellsword | 5 (2014) | 2014 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 6/6 |
| Brother Halric | 3 (2014) | 2014 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |

**Dropped 22 of 70 user clauses** (coverage 69%); concept share 92% (203/220 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- caster-21 / edition: 1
- defender-7-warden / reader: 1



---


### Silt Hound — a 2014 sheet

**Concept:** a mud-caked bog hound that drags fishermen under

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Silt Hound [seed 1/2] | 1 (2014) | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "drags fishermen under"
- read: def 0 / off 1 → 0.5; sustained 10 (2 × Bite); nova none; dmg 10

```
Silt Hound
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

	

10 (+0)

	

4 (-3)

Skills: 

Athletics +3, Perception +2

Saving Throws: 

STR +3

Senses: 

darkvision 60 ft., passive Perception 12

Languages: 

None

Challenge

1 (200 XP)

Proficiency Bonus:

+2

Bog Step. Difficult terrain composed of mud and reeds doesn't cost the silt hound extra movement, and the silt hound can move across mud and reeds without needing to make an ability check.
Whelm. As a bonus action, the silt hound whelms one Medium or smaller creature it is grappling. While whelmed, the target is blinded and restrained, has total cover against attacks and other effects outside the silt hound, and takes 3 (1d6) bludgeoning damage at the start of each of the silt hound's turns. The silt hound can have only one creature whelmed at a time. If the silt hound takes 5 damage or more in a single turn from the whelmed creature, the silt hound must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the silt hound. If the silt hound dies, a whelmed creature pulls free prone by using 5 feet of movement.
Mud-Slam Retort. As a bonus action, the silt hound retaliates against one creature within 5 feet of it that hit it with an attack since the end of the silt hound's last turn, dealing 3 (1d6) bludgeoning damage to that creature.

Actions
Multiattack: The silt hound makes two Bite attacks.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Bite — the chassis
- Bonus Actions/Whelm — binds the GM's words: whelm+swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon
- Bonus Actions/Mud-Slam Retort — library seed own-turn-punisher
- Traits/Bog Step — template terrain-walk; library draw (seed unstamped); binds the GM's words: bog+mud+reeds+wading

**Engine trace**

```
[path] homebrew — "a mud-caked bog hound that drags fishermen under" (call)
[route] brute-grappler type=Beast mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "drags fishermen under" | brute-grappler: ✓ ("drags fishermen under") | brute-grappler: no line key in the words — the model's read of its quote
[concept] hints: engulf→mechanics ✓ ("drags fishermen under")
[concept] resolve: archetype=brute type=Beast themes=bestial/aquatic mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: drags prey underwater to drown it [behavior] | mud-caked hide blending with the bank [body] | ambush from the reed-beds [behavior]
[concept] identity: The bog hound lies half-submerged in the muck, mud-caked hide indistinguishable from the bank, and lunges when a fisherman wades close, jaws locking onto a limb or boot. Every round after that it sets its weight backward and hauls, dragging its catch down the slick bank toward deep water while its claws churn the mud for purchase. It is a patient, hungry ambusher that does not flee once it has a grip — it only bites down harder and pulls, drowning its prey rather than mauling it.
[concept] lore: A hound drowned in the bog mud and risen hungry, it haunts reed-beds and fishing banks, dragging the living under to keep them company in the silt.
[reskin] donor: brute-5-grappler -> CR 1
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] engulf engine: Whelm — the body's own verb
[reskin] engine interior scaled — CR 1 sits below the brute-5-grappler seat
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the silt hound" — the call's own answer (kind), built from the name
[reskin] inline form: "the silt hound" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a mud-caked bog hound" -> has (descriptive), head | "drags fishermen under" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The silt hound keeps its weight back, low and half-buried, then heaves its whole body into one sodden backward haul, dragging everything still clamped in its jaws along with it and down the bank toward deep water. It uses this to tear its catch off firm ground and into the slick mud where the bank drops away. The pull only reaches as far as the mud and water let it, so it moves nothing when it has" [action/always/movement] — menu: swallow, shield-bash, active-toll, spew, herd, thrown-burst-seed, drain, wind-up, exploiter, zone-seed (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, feint-slip, contagion, charge-push, pounce)
[reskin] word match declined by the call: swallow, exploiter, shield-bash, active-toll, spew, herd, thrown-burst-seed, drain, wind-up, zone-seed, pounce — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "herd" as nearest; it lands rather than the row being dropped (what it wanted: grabs the creature it is already holding and hauls it and itself backward into t)
[reskin] free signature row: action — "herd" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] value check: "Sodden Backhaul (2/Day)" EV 2.3 vs floor 10.1 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sodden Backhaul (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: herd, exploiter left the shelf — the call declined them for this sheet
[reskin] value check: "Answering Sting" EV 1.7 vs floor 1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Mud clings to the silt hound and sloughs around it as it moves, so the muck and reeds never slow it or hold it fast, and it can lie unseen in the bank wherever it is mired. Prey wading through that same mud find the ground sucking at their boots and slipping beneath them while the hound closes." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog, mud)
[reskin] word match declined by the call: faultless-tracker — the key word does not mean the mechanic here
[reskin] signature template (trait): terrain-walk -> Traits/"Bog Step" ("The muck and reeds never slow it or hold it fast, while prey wading through that [verb: bog:concept, mud:concept, reeds:idea, wading:idea]")
[reskin] weapons answered: Bite = none; Mire Drag = none
[reskin] languages held: None stands — INT 4 on a Beast speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "a mud-caked bog hound that drags fisherm" and named no print body — no published trait lands on a word alone (owner's ruling)
audit finding below confidence gate: Bog Step The trait suppresses checks to move across mud and reeds, but no rule in the block or base movement rules requires such a check, so the clause references an ability check nothing defines.
[reskin] audit rename: "Answering Sting" -> "Mud-Slam Retort"
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Mud-Slam Retort) — the sameness metric
[reskin] [gap] grabs the creature it is already holding and hauls it and itself backward into the water, moving the target against its  — "The silt hound keeps its weight back, low and half-buried, then heaves its whole body into one sodden backward haul, dragging everything still clamped in its jaws along with it and down the bank toward deep water. It uses this to tear its catch off firm ground and into the slick mud where the bank drops away. The pull only reaches as far as the mud and water let it, so it moves nothing when it has" — Silt Hound [seat: action [action/always/movement]] (closest offered: herd) [effect: movement] [menu: swallow shield-bash active-toll spew herd thrown-burst-seed drain wind-up exploiter zone-seed pounce] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: throw-retrieve:legality] [VETOED AFTER ACCEPTANCE: herd never reached the sheet]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — the seat shipped a fallback or nothing
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Owlbear — a print donor

**Concept:** name: Owlbear | that has learned to climb

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 (2014) | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "has learned to climb"
- read: def 1/2 / off 5 → 2.75; sustained 28 (2 × Rend); nova none; dmg 28

```
Owlbear
Large monstrosity, unaligned
Armor Class

13 (natural armor)

Hit Points: 

59 (7d10 + 21)

Speed: 

40 ft., climb 30 ft.

STR	DEX	CON	INT	WIS	CHA


20 (+5)

	

12 (+1)

	

17 (+3)

	

3 (-4)

	

12 (+1)

	

7 (-2)

Skills: 

Perception +5

Saving Throws: 

STR +7

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

None

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Adhesive. The owlbear adheres to anything that touches it. A Huge or smaller creature adhered to the owlbear is also grappled by it (escape DC 15). Ability checks made to escape this grapple have disadvantage.

Actions
Multiattack: The owlbear makes two Rend attacks. It can replace one attack with a use of Climbing Ambush.
Rend: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.
Climbing Ambush: The owlbear spends 5 feet of movement to jump to a space within 15 feet that contains one or more Large or smaller creatures. Each creature in the destination space must make a DC 15 Dexterity saving throw, taking 22 (5d8) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone. On a successful save, the target is pushed 5 feet straight away.
```

**Where each row came from**

- Actions/Multiattack — print's own row
- Actions/Rend — print's own row, renamed
- Actions/Climbing Ambush — template leap; library draw (seed unstamped); binds the GM's words: drop+perch
- Traits/Adhesive — template adhesive; library draw (seed unstamped); binds the GM's words: grip+chest

**Engine trace**

```
[path] twist — Owlbear (is) — "Name field: Owlbear" (code)
[route] brute type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("Owlbear") | brute: no line key in the words — the model's read of its quote
[concept] name: "Owlbear" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/grasping mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: none claimed
[concept] signature elements: climbing ambusher that drops onto prey [behavior] | crushing hooked-beak and forelimb grip [body] | feathered-owl-and-bear hideform [body]
[concept] identity: The owlbear climbs the fight, not the ground — it goes up trees, cliff faces and ruin walls to drop onto prey from above, then locks in with crushing forelimbs and a hooked beak. Every round it pins and tears, using its weight and grip rather than chasing; when bloodied it hauls itself up the nearest vertical surface and waits to drop again. It is a patient ambusher with animal cunning, not a berserk charger.
[concept] lore: Owlbears are already bad-tempered hybrids of bear and owl; this one grew up among cliff-dwelling prey and taught itself to scale, and now it haunts the high ruins of its territory, dropping on anything that wanders beneath its perch.
[reskin] print canon defenses: HP 58 -> 59, AC 10 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +4 -> +7, DC 15 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] [path] decides: twist on the Owlbear (the matcher agrees)
[reskin] print canon: "Owlbear — that has learned to climb" heads on the Owlbear — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the owlbear" — the call answered "the owlbear" (kind), which the name does not support
[reskin] inline form: "the owlbear" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Owlbear —" -> has (descriptive), head | "has learned to climb" -> has (mechanical)
[reskin] signature idea (action): "The owlbear launches itself from a high perch and comes down beak-first onto prey beneath it, driving the hooked beak deep and bearing the target to the ground under its weight. The strike is only possible when it drops from a height onto something it climbed above, so the beast must first reach a perch and line the target up below. Anyone caught directly under the fall is bowled over and pinned f" [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] word match declined by the call: leap — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "leap" as nearest; it lands rather than the row being dropped (what it wanted: requires the creature to climb to a perch first and then drop from height onto a)
[reskin] seat takes its clause: "Climbing Ambush" answers "has learned to climb" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: leap -> Actions/"Climbing Ambush" ("The owlbear launches itself from a high perch and comes down beak-first onto prey beneath it, driving the hooked beak deep and bearing the target to the ground  [verb: drop:idea, perch:idea]")
[reskin] signature idea (trait): "When the owlbear gets its forelimbs locked around a creature, the grip does not let go on its own; the victim is hauled against its chest and held there while the hooked beak works, and the beast's weight makes prying free a real struggle. It only holds one creature so, preferring to quarry what it already has rather than chase new prey." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — spider-climb (climb, climbs, climbing)
[reskin] word match declined by the call: adhesive, spider-climb, faultless-tracker, sealed-body — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "adhesive" as nearest; it lands rather than the row being dropped (what it wanted: grapples and pins the target it touches, hauling it against the creature's chest)
[reskin] free signature row: "Adhesive" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Adhesive" answers "has learned to climb" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): adhesive -> Traits/"Adhesive" ("The idea is a forelimb grapple that holds one creature and hauls it in — none of [verb: grip:idea, chest:idea]")
[reskin] weapons answered: Beak = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon attack: "Beak" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "the owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon skills: "Athletics +7, Perception +3" -> "Perception +5" — the Owlbear's own skills, each derived from this sheet's stat and PB
[reskin] multiattack replacement clause: It can replace one attack with a use of Climbing Ambush.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Adhesive" [trait/always/condition]
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Adhesive")
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] requires the creature to climb to a perch first and then drop from height onto a target below, gating the attack on prio — "The owlbear launches itself from a high perch and comes down beak-first onto prey beneath it, driving the hooked beak deep and bearing the target to the ground under its weight. The strike is only possible when it drops from a height onto something it climbed above, so the beast must first reach a perch and line the target up below. Anyone caught directly under the fall is bowled over and pinned f" — Owlbear [seat: action [rider/on_hit/condition]] (closest offered: leap) [effect: movement] [menu: affliction contagion charge-push hook-rider pounce charge leap push-prone] [same-cell unoffered: stunning-strike snatch bolt-restrain bolt-mark] [same-seat rejected: stunning-strike:legality isolation:role snatch:legality bolt-restrain:role bolt-drag:role bolt-mark:role] [landed: leap]
[reskin] [gap] grapples and pins the target it touches, hauling it against the creature's chest with a real escape DC — "When the owlbear gets its forelimbs locked around a creature, the grip does not let go on its own; the victim is hauled against its chest and held there while the hooked beak works, and the beast's weight makes prying free a real struggle. It only holds one creature so, preferring to quarry what it already has rather than chase new prey." — Owlbear [seat: trait [trait/always/condition]] (closest offered: adhesive) [effect: condition] [menu: spider-climb false-appearance adhesive phobia terrain-walk aberrant-ground faultless-tracker web-walker noxious-aura bloodied-fury uncanny-sense berserk shielded-mind relentless-pursuit bound marking-light sealed-body undead-fortitude mimicry truth-aura gaze-aura death-burst] [same-cell unoffered: none] [same-seat rejected: earth-glide:legality tunneler:legality evasion:role guarded-stance:role assassinate:role blurred-form:role] [landed: adhesive]
[reskin] record reconciled: "Adhesive" no longer imposes Grappled — the clause left, so the record goes with it
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Scree-Pit Thing — a homebrew with a nova

**Concept:** a quarry-pit thing of living scree that buries what it catches

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Scree-Pit Thing | 5 (2014) | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 3 (print at 5 reads 2.5–9.5, n=25)
- read: def 2 / off 4 → 3; sustained 32 (2 × Slam); nova Scree Entombment 17; dmg 32

```
Scree-Pit Thing
Medium elemental, neutral
Armor Class

13 (natural armor)

Hit Points: 

97 (13d8 + 39)

Speed: 

30 ft., burrow 30 ft.

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

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

tremorsense 30 ft., passive Perception 13

Languages: 

None

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Clotting Scree. The scree-pit thing adheres to anything that touches it. A Huge or smaller creature adhered to the scree-pit thing is also grappled by it (escape DC 14). Ability checks made to escape this grapple have disadvantage.
Entomb. As a bonus action, the scree-pit thing entombs one Medium or smaller creature it is grappling. While entombed, the target is blinded and restrained, has total cover against attacks and other effects outside the scree-pit thing, and takes 7 (2d6) bludgeoning damage at the start of each of the scree-pit thing's turns. The scree-pit thing can have only one creature entombed at a time. If the scree-pit thing takes 15 damage or more in a single turn from the entombed creature, the scree-pit thing must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the scree-pit thing. If the scree-pit thing dies, an entombed creature breaks free prone by using 5 feet of movement.

Actions
Multiattack: The scree-pit thing makes two Slam attacks.
Slam: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained.
Scree Entombment (Recharge 5-6): One Medium or smaller creature within 5 feet of the scree-pit thing that it hit with a melee attack this turn must make a DC 14 Dexterity saving throw, taking 17 (5d6) bludgeoning damage on a failed save and being swallowed. A swallowed creature is blinded and restrained, has total cover against attacks and other effects outside the scree-pit thing, and takes 9 (2d8) acid damage at the start of each of the scree-pit thing's turns. If the scree-pit thing takes 15 damage or more on a single turn from a creature inside it, it must succeed on a DC 14 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the scree-pit thing and is prone. If the scree-pit thing dies, a swallowed creature is no longer restrained and can escape from the corpse using 10 feet of movement, exiting prone.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Slam — the chassis
- Actions/Scree Entombment — template swallow; library draw (seed unstamped)
- Bonus Actions/Entomb — the GM's clause "buries what it catches"; binds the GM's words: entomb+swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+cocoon+whelm
- Traits/Clotting Scree — template adhesive; library draw (seed unstamped); binds the GM's words: stick+sticky

**Engine trace**

```
[path] homebrew — "a quarry-pit thing of living scree that buries what it catches" (call)
[route] brute-grappler type=Elemental mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "buries what it catches" | brute-grappler: ✓ ("buries what it catches") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental themes=elemental/grasping mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: seizing prey and burying it alive under loose scree [behavior] | a body of living gravel and broken quarry stone [body] | lying dormant as a heap of ordinary rubble [aura]
[concept] identity: The scree-pit lies dormant as an ordinary heap of quarry rubble until prey steps onto it, then erupts upward as a grinding, man-shaped mass of loose stone that seizes the nearest victim and folds its body over them, packing broken rock into every gap until they stop moving and vanish beneath the surface. Round after round it drags whoever it has caught downward, pulverizing and interring them alive in the same motion, and it never gives up a held body — wounded, it simply collapses into a harmless-looking pile and waits for the next footfall.
[concept] lore: Some quarry-pit was abandoned mid-cut with its dead and its debts still in it, and the loosened scree gathered itself a will: it wants nothing but to fill its own hollow with warm, breathing weight.
[reskin] donor: brute-5-grappler -> CR 5
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] engulf engine: Entomb — the body's own verb
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the scree-pit thing" — the call's own answer (kind), built from the name
[reskin] inline form: "the scree-pit thing" — the model's own reading of the name
[reskin] save dc derived: DC 13, 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "quarry-pit thing" names no absence — nothing in it takes anything away
[reskin] clauses: "a quarry-pit thing of living scree" -> has (descriptive), head | "buries what it catches" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The scree-pit thing shudders and the ground around it loosens, then it plunges both arms into the earth and drags a fresh slurry of broken quarrry stone up over itself. That churned scree spreads outward from it, and any creature standing in it that moves has the footing torn out from under it as the loose stone rolls and slides, pulling it down toward the creature. The scree stays churned and tre" [action/always/movement] — menu: swallow, condition-payoff, shield-bash, active-toll, random-ray, ground-burst, spew, burrow-ambush, herd, thrown-burst-seed, drain, wind-up, exploiter, zone-seed (+ shelf: leap, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, feint-slip, stunning-strike, charge-push, pounce)
[reskin] pick kept on the GM's own words: action — "swallow" has no key-table verb, but the call quotes "buries what it catches" from the description
[reskin] value check: "Scree Entombment (Recharge 5-6)" EV 18.7 vs floor 8.8 (one attack of 2) — over the ceiling — gated Recharge 5-6
[reskin] signature template: swallow -> Actions/"Scree Entombment (Recharge 5-6)" ("the thing buries what it catches — dragging a creature down into its own body of [shape fit, no verb match]")
[reskin] signature idea (trait): "Any blow that strikes the scree-pit thing knocks loose chips and grabs of stone that stick to the attacker, packing grit into armor joints and eyes. Each later hit sheds more, so a foe that keeps trading blows with it slowly stiffens under the weight of its own broken-off hide. A healthy body of living gravel can also slough the gathered debris off itself when it burrows, meaning a wounded attacke" [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk, aberrant-ground, faultless-tracker (scree, quarry)
[reskin] word match declined by the call: terrain-walk, aberrant-ground, faultless-tracker, tunneler, bloodied-burst, false-appearance, bloodied-fury, earth-glide, heated-body, absorption, resonant-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "adhesive" as nearest; it lands rather than the row being dropped (what it wanted: a hit that strikes the creature leaves clinging grit on the attacker, building u)
[reskin] free signature row: "Clotting Scree" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): adhesive -> Traits/"Clotting Scree" ("Any blow that strikes the scree-pit thing knocks loose chips and grabs of stone that stick to the attacker, packing grit into armor joints and eyes. Each later  [verb: stick:idea, sticky:idea]")
[reskin] repair: 1 clause(s) with no row — "buries what it catches"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [{"clause":"buries what it catches","row":"Entomb"}], unplaced []
[reskin] clause already answered: "buries what it catches" is carried by "Entomb" in different words — the call read the sheet and declined to answer it twice
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Slam = none
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a quarry-pit thing of living scree that " and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Clotting Scree" [trait/always/condition]
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Clotting Scree")
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a hit that strikes the creature leaves clinging grit on the attacker, building up across repeated hits to restrain or sl — "Any blow that strikes the scree-pit thing knocks loose chips and grabs of stone that stick to the attacker, packing grit into armor joints and eyes. Each later hit sheds more, so a foe that keeps trading blows with it slowly stiffens under the weight of its own broken-off hide. A healthy body of living gravel can also slough the gathered debris off itself when it burrows, meaning a wounded attacke" — Scree-Pit Thing [seat: trait [trait/on_being_hit/condition]] (closest offered: adhesive) [effect: condition] [menu: terrain-walk aberrant-ground faultless-tracker heated-body absorption bloodied-burst resonant-body weapon-lodge adhesive tunneler false-appearance bloodied-fury earth-glide] [same-cell unoffered: none] [same-seat rejected: none] [landed: adhesive]
[reskin] record reconciled: "Scree Entombment (Recharge 5-6)" no longer imposes Prone,Blinded,Restrained — the clause left, so the record goes with it
[reskin] record reconciled: "Clotting Scree" no longer imposes Grappled — the clause left, so the record goes with it
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Adult Red Dragon — a legendary

**Concept:** name: Adult Red Dragon | blind in one eye from an old lance

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Adult Red Dragon | 17 (2014) | dragon-15 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Sight Weakness
- **dropped clause:** "Adult Red Dragon — blind in one eye from an old lance"
- read: def 14 / off 20 → 17; sustained 108 (3 × Rend + legendary Pounce); nova Fire Breath 59; dmg 111

```
Adult Red Dragon
Huge dragon, chaotic evil
Armor Class

19 (natural armor)

Hit Points: 

256 (19d12 + 133)

Speed: 

40 ft., fly 80 ft., climb 40 ft.

STR	DEX	CON	INT	WIS	CHA


27 (+8)

	

10 (+0)

	

25 (+7)

	

16 (+3)

	

13 (+1)

	

23 (+6)

Skills: 

Perception +13, Stealth +6

Saving Throws: 

DEX +6, WIS +7

Damage Immunities: 

fire

Senses: 

blindsight 60 ft., darkvision 120 ft., passive Perception 23

Languages: 

Common, Draconic

Challenge

17 (18,000 XP)

Proficiency Bonus:

+6

Wounded Fury. While it has half of its hit points or fewer, the red dragon has advantage on attack rolls.
Legendary Resistance (3/Day). If the red dragon fails a saving throw, it can choose to succeed instead.
Sight Weakness. The red dragon has disadvantage on Wisdom (Perception) checks that rely on sight.

Actions
Multiattack: The red dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray.
Rend: Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 13 (1d10 + 8) slashing damage plus 5 (2d4) fire damage. If the target is a Large or smaller creature, it is pulled up to 10 feet straight toward the red dragon.
Spellcasting: The red dragon casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 20, +12 to hit with spell attacks): -

At will: command, detect magic, scorching ray

1/day each: fireball
Fire Breath (Recharge 5-6): Each creature in a 60-foot cone must make a DC 21 Dexterity saving throw, taking 59 (17d6) fire damage on a failed save, or half as much damage on a successful one.
Legendary Actions

The red dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The red dragon regains spent legendary actions at the start of its turn.

Commanding Presence: The red dragon uses Spellcasting to cast command (cast at 2nd level). The red dragon can't take this action again until the start of its next turn.
Fiery Rays: The red dragon uses Spellcasting to cast scorching ray. The red dragon can't take this action again until the start of its next turn.
Pounce: The red dragon moves up to half its speed, and it makes one Rend attack.
```

**Where each row came from**

- Traits/Bloodied Fury — template bloodied-fury; library draw (seed unstamped); binds the GM's words: wounded
- Traits/Legendary Resistance — the chassis
- Traits/Sight Weakness — the chassis
- Actions/Multiattack — the chassis
- Actions/Rend — print's own row, renamed; binds the GM's words: drag+drags
- Actions/Spellcasting — print's own row
- Actions/Fire Breath — print's own row
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Commanding Presence — print's own row
- Legendary Actions/Fiery Rays — print's own row
- Legendary Actions/Pounce — print's own row

**Engine trace**

```
[path] twist — Adult Red Dragon (is) — "Name field: Adult Red Dragon" (code)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | dragon: ✓ ("Adult Red Dragon") | dragon: key "dragon" (class body)
[concept] name: "Adult Red Dragon" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: dragon→body ✓ ("Adult Red Dragon — a true dragon body")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/terror mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Adult Red Dragon"
[concept] mechanics: breath
[concept] signature elements: one-eyed from an old lance wound [body] | fire-breath strafing runs [behavior] | shepherding prey with tail and claws [behavior]
[concept] identity: A scarred adult red dragon that opens with a thunderous strafing pass of fire-breath timed to its one good eye, keeping the lance-blinded left side turned away from the party. Every round after it circles to its blind side's advantage, using claw-and-tail sweeps to shepherd prey into a killing corridor before committing to a full bite — those who flank blindly left earn a whip-fast reaction. Under pressure it grows crueler and more calculating, feigning a stumble toward its blind side to bait the overconfident, and it never flees a fight it started, preferring to die burning.
[concept] lore: It lost the eye to a knight's lance decades ago and has since made its lair in the lance's broken-off head, hoarding grudges and coin in equal measure while it hunts the descendants of the one who blinded it.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] print canon defenses: HP 256 -> 256, AC 20 -> 19 — the Adult Red Dragon's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 27, DEX 10, CON 25, INT 16, WIS 13, CHA 23 — the Adult Red Dragon's at its own CR; attack +10 -> +14, DC 21 (print's)
[reskin] donor: dragon-15 -> CR 17
[reskin] [path] decides: twist on the Adult Red Dragon (the matcher agrees)
[reskin] print canon: "Adult Red Dragon — blind in one eye from an old lance" heads on the Adult Red Dragon — print's rows ride along; the seat stays
[reskin] repair round 1: 2 defect(s) — name "Tail Lash" promises a tail but the row makes a Bite attack — name the delegation honestly, or without anatomy | name "Wing Sweep" promises the Prone condition but the row never delivers it — name what the rule does, or drop the claim word; this row earns Stride, Rush, Surge
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the red dragon" — the call answered "the red dragon" (kind), which the name does not support
[reskin] inline form: "the red dragon" — the model's own reading of the name
[reskin] spell DC coherence: DC 19 -> 20 off Charisma 23 (print's array stays)
[reskin] save dc derived: DC 19 -> 20 (8 + PB 6 + Charisma's 6) — no stat on the sheet reached it
[reskin] lacks asked: "blind in one eye"
[reskin] clauses: "Adult Red Dragon — blind in one eye from an old lance" -> LACKS (mechanical)
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, exploiter, sensory-strike, zone-seed, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, feint-slip, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When it commits to a full bite, it first feints a stumble toward its blind left side and drags its claws and tail in a wide scoop, shoving everyone caught into a single line directly in front of its good eye. It then lunges down that corridor; anything shoved into place instead of scattering gets torn. The shove only works on creatures on its blind side or directly in front of it — prey already be" [action/always/movement] — menu: snare, condition-payoff, execute, throw-retrieve, seal, shield-bash, lure (+ shelf: lay-on-hands, second-wind, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — throw-retrieve, charge (lance)
[reskin] word match declined by the call: throw-retrieve, charge — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "hook-rider" as nearest; it lands rather than the row being dropped (what it wanted: scoops creatures into a line in front of it before its bite, repositioning them )
[reskin] seat takes its clause: "Lance-Blind Sweep" answers "Adult Red Dragon — from an old lance" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature rider: hook-rider -> Bite (appended; When it commits to a full bite, it first feints a stumble toward its blind left side and drags its claws and tail in a wide scoop, shoving everyone caught into  [verb: drag:idea, drags:idea])
[reskin] signature idea (trait): "The blinded left side is a dead spot it has learned to weaponize: whatever strikes from that flank thinks it has found an opening, but the dragon twists its whole neck and snaps at anything that commits there, catching the attacker in the follow-through. When it takes a wound from that side it grows crueler, turning its ruined eye toward the offender and making its next bites heavier and slower to" [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, blurred-form, death-burst)
[reskin] word match declined by the call: bloodied-burst, bloodied-fury, weapon-lodge — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "bloodied-fury" as nearest; it lands rather than the row being dropped (what it wanted: when hit from the wounded flank, immediately make a retaliatory Bite against the)
[reskin] free signature row: "Lance-Scar Riposte" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Lance-Scar Riposte" answers "Adult Red Dragon — from an old lance" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): bloodied-fury -> Traits/"Lance-Scar Riposte" ("The idea is a counterattack triggered by taking a wound on the blinded side, pun [verb: wounded:idea]")
[reskin] weapons answered: Bite = none
[reskin] chassis nova: "Fire Breath (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] print canon alignment: Lawful Evil -> Chaotic Evil — the Adult Red Dragon's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Draconic, Common" -> "Common, Draconic" — the Adult Red Dragon's
[reskin] print canon attack: "Bite" -> "Rend" — the Adult Red Dragon's own row
[reskin] print canon multiattack: "the red dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast *Scorching Ray*." — the Adult Red Dragon's own
[reskin] element immunity: Fire (merged into the header write)
[reskin] dragon spell DC derived: 20 (8 + PB + Cha mod — the breath keeps the card DC)
[reskin] dragon mental save DC derived: "Scarred Roar" -> 20 (the Frightful Presence class keys to Charisma)
[reskin] immunities stamped for type: Dragon -> Fire
[reskin] print canon skills: "Perception +7, Stealth +6" -> "Perception +13, Stealth +6" — the Adult Red Dragon's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Fire Breath (Recharge 5-6)" is the seat's nova, not the Adult Red Dragon's
[reskin] print canon legendary: Commanding Presence, Fiery Rays, Pounce — the Adult Red Dragon's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Fire Breath (Recharge 5-6) — the Adult Red Dragon's own
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Lance-Scar Riposte" [trait/always/defense]
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Lance-Scar Riposte")
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rewrite blocked — "Commanding Presence" is engine-authored chassis text
[reskin] audit rewrite blocked — "Fiery Rays" is engine-authored chassis text
[reskin] audit rename: "Lance-Scar Riposte" -> "Bloodied Fury"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] scoops creatures into a line in front of it before its bite, repositioning them rather than pulling one target toward it — "When it commits to a full bite, it first feints a stumble toward its blind left side and drags its claws and tail in a wide scoop, shoving everyone caught into a single line directly in front of its good eye. It then lunges down that corridor; anything shoved into place instead of scattering gets torn. The shove only works on creatures on its blind side or directly in front of it — prey already be" — Adult Red Dragon [seat: action [action/always/movement]] (closest offered: hook-rider) [effect: movement] [menu: throw-retrieve charge snare condition-payoff execute seal shield-bash lure hook-rider] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: zone-seed:role] [landed: hook-rider]
[reskin] [gap] when hit from the wounded flank, immediately make a retaliatory Bite against the attacker and gain a rage-style boost to — "The blinded left side is a dead spot it has learned to weaponize: whatever strikes from that flank thinks it has found an opening, but the dragon twists its whole neck and snaps at anything that commits there, catching the attacker in the follow-through. When it takes a wound from that side it grows crueler, turning its ruined eye toward the offender and making its next bites heavier and slower to" — Adult Red Dragon [seat: trait [trait/on_being_hit/damage]] (closest offered: bloodied-fury) [effect: resource] [menu: heated-body absorption bloodied-burst resonant-body weapon-lodge faultless-tracker bloodied-fury] [same-cell unoffered: ward-retaliation snap-shot riposte] [same-seat rejected: none] [landed: bloodied-fury]
[reskin] flaw row: "Sight Weakness" — "Adult Red Dragon — blind in one eye from an old lance" removed no row, so the absence costs the creature something instead (print's grammar: 11 of 329 blocks carry one; owner's ruling 1f)
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Glacier Heart — one marked soft

**Concept:** a glacier's heart given legs, trailing a wake of killing cold

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Glacier Heart [seed 1/2] | 15 (2014) | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 12.5 (print at 15 reads 7–15, n=12)
- read: def 10 / off 15 → 12.5; sustained 70 (2 × Ice Limb); nova Killing Cold 71; dmg 94

```
Glacier Heart
Huge elemental, neutral
Armor Class

16 (natural armor)

Hit Points: 

210 (20d12 + 80)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

8 (-1)

	

19 (+4)

	

6 (-2)

	

10 (+0)

	

4 (-3)

Skills: 

Athletics +9, Perception +5

Saving Throws: 

STR +9, CON +9

Damage Immunities: 

cold, poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

tremorsense 60 ft., passive Perception 15

Languages: 

None

Challenge

15 (13,000 XP)

Proficiency Bonus:

+5

Heaving Limbs. The ground within 10 feet of the glacier heart is difficult terrain.
Cold Absorption. Whenever the glacier heart is subjected to cold damage, it takes no damage and instead regains a number of hit points equal to the cold damage dealt.
Siege Monster. The glacier heart deals double damage to objects and structures.

Actions
Multiattack: The glacier heart makes two Ice Limb attacks. It can replace one attack with a use of Rime Execution.
Ice Limb: Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) slashing damage plus 13 (3d8) cold damage.
Killing Cold (Recharge 5-6): Each creature in a 30-foot cone must make a DC 17 Strength saving throw, taking 71 (13d10) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
Rime Execution: One creature within 60 feet that is prone must make a DC 17 Strength saving throw, taking 63 (14d8) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
```

**Where each row came from**

- Traits/Heaving Limbs — template aberrant-ground; library draw (seed unstamped); the GM's clause "trailing a wake of killing cold"; binds the GM's words: wake
- Traits/Cold Absorption — the chassis
- Traits/Siege Monster — the chassis
- Actions/Multiattack — the chassis
- Actions/Ice Limb — the chassis
- Actions/Killing Cold — the chassis
- Actions/Rime Execution — library seed condition-payoff

**Engine trace**

```
[path] homebrew — "a glacier's heart given legs, trailing a wake of killing cold" (call)
[route] brute-juggernaut type=Elemental mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a glacier's heart given legs") | brute-juggernaut: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "fire" answers a question nobody asked
[concept] resolve: archetype=brute type=Elemental themes=elemental/terror mind=mindless style=juggernaut energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: killing cold wake that freezes the ground [aura] | a glacier's heart made mobile on colossal limbs [body] | relentless crushing advance through obstacles [behavior]
[concept] identity: A walking heart of ancient glacier strides forward implacably, its footfalls exhaling a killing cold that glazes the ground behind it into razor-slick ice. Every round it simply advances through what stands before it, shattering frozen foes with crushing limbs of blue-black ice while the lethal wake widens and deepens — retreat is the only defense. Under pressure it never flees and never gloats; it grinds on to the last, a slow apocalypse that does not know it is being fought.
[concept] lore: Born where a glacier's pressure forged its core into a living diamond of ice, the walking heart seeks to spread the ancient cold of its birth across the warm and living world.
[reskin] donor: brute-9-juggernaut -> CR 15
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Glacier Heart = literal
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the glacier heart" — the call's own answer (kind), built from the name
[reskin] inline form: "the glacier heart" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 17 (8 + PB 5 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a glacier's heart given legs" -> has (descriptive), head | "trailing a wake of killing cold" -> has (mechanical) [asked: save_area]
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The glacier heart lurches forward in a single grinding stride, shouldering through anything smaller than itself without slowing. Creatures and loose barriers caught in that path are shoved aside and crushed beneath its advancing mass; the cold it drags with it leaves the ground behind glazed and treacherous, so the space it just left becomes an obstacle you must cross to follow or flee." [action/save/movement] — menu: condition-payoff, shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter, gaze-single, snare, execute, seal, lure, obstacle-pull (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — execute (kill)
[reskin] word match declined by the call: hook-rider, obstacle-pull — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "obstacle-pull" as nearest; it lands rather than the row being dropped (what it wanted: moves the creature itself in a straight line and damages/knocks prone everything)
[reskin] value check: "Grinding Advance" EV 4.4 vs floor 16.6 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Grinding Advance" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Merciless Strike" EV 53.2 vs floor 41.6 (one attack of 2) — worth the trade
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its colossal limbs do not merely bear it; they plant and heave, so each blow it lands drives the target backward along the ground rather than letting them stand and trade. Anything it knocks away skids across the freezing wake it has already laid down." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk, aberrant-ground, faultless-tracker (glacier, wake, trail)
[reskin] word match declined by the call: terrain-walk — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "aberrant-ground" as nearest; it lands rather than the row being dropped (what it wanted: a creature hit by the glacier heart's attack is shoved back and knocked to the g)
[reskin] signature template (trait): aberrant-ground -> Traits/"Heaving Limbs" ("The idea is a hit that drives targets backward and leaves them skidding on freez [verb: wake:concept]")
[reskin] weapons answered: Ice Limb = none; Killing Cold = none; Glacial Advance = none
[reskin] chassis nova: "Killing Cold (Recharge 5-6)" — the brute-9-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] trait stripped: Traits/Immutable Form — a golem's trait on a Elemental
[reskin] defenses by material: a ice body is vulnerable to Fire and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] absorption re-keyed: Acid -> Cold (the donor organ obeys the concept energy)
[reskin] immunities stamped for type: Elemental -> Cold, Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a glacier's heart given legs, trailing a" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Merciless Strike.
[reskin] row binds its clause: "Heaving Limbs" answers "trailing a wake of killing cold" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] save stat from print grammar: Actions/Killing Cold imposes Prone by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] save re-derived after a retype: Actions/Killing Cold — a Constitution save for a condition the row IMPOSES, which calls for Strength or Dexterity (A2: a condition the row merely requires does not pick the stat)
[reskin] lint fixed: prone-duration — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] audit rename: "Merciless Strike" -> "Rime Execution"
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Rime Execution) — the sameness metric
[reskin] [gap] moves the creature itself in a straight line and damages/knocks prone everything smaller in that path, plus glazes the v — "The glacier heart lurches forward in a single grinding stride, shouldering through anything smaller than itself without slowing. Creatures and loose barriers caught in that path are shoved aside and crushed beneath its advancing mass; the cold it drags with it leaves the ground behind glazed and treacherous, so the space it just left becomes an obstacle you must cross to follow or flee." — Glacier Heart [seat: action [action/save/movement]] (closest offered: obstacle-pull) [effect: movement] [menu: execute condition-payoff shield-bash escalating-dread terror-pulse herd drain exploiter gaze-single snare seal lure obstacle-pull hook-rider] [same-cell unoffered: reel hook-drag pull-through aggro-curse slow-bolt disarm] [same-seat rejected: swallow:legality trample:style leap:legality thrown-burst:style reel:role hook-drag:legality active-toll:legality pull-through:role random-ray:legality ground-burst:legality spew:legality burrow-ambush:legality pacify:role snare-bolt:role slow-bolt:role sensory-strike:role disarm:role curse-debt:role reveal:role wind-up:legality blighted-ground:role] [VETOED AFTER ACCEPTANCE: obstacle-pull never reached the sheet]
[reskin] [gap] a creature hit by the glacier heart's attack is shoved back and knocked to the ground — "Its colossal limbs do not merely bear it; they plant and heave, so each blow it lands drives the target backward along the ground rather than letting them stand and trade. Anything it knocks away skids across the freezing wake it has already laid down." — Glacier Heart [seat: trait [trait/always/movement]] (closest offered: aberrant-ground) [effect: movement] [menu: terrain-walk aberrant-ground faultless-tracker false-appearance adhesive phobia web-walker noxious-aura bloodied-fury uncanny-sense berserk shielded-mind relentless-pursuit bound marking-light undead-fortitude mimicry truth-aura gaze-aura death-burst] [same-cell unoffered: blink spider-climb earth-glide tunneler zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: spider-climb:legality earth-glide:legality tunneler:legality evasion:role sealed-body:legality guarded-stance:role assassinate:role blurred-form:role] [landed: aberrant-ground]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — the seat shipped a fallback or nothing
[reskin] size floor: STR 16 -> 18 — print prints no corporeal Huge body under 18 (the Archelon); the attack follows it, as print's own 49 do
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Cathedral-Vault Ooze — bands soft

**Concept:** a cathedral-vault ooze that digests reliquaries

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Cathedral-Vault Ooze | 9 (2014) | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6 (print at 9 reads 5.5–13, n=8)
- **dropped clause:** "digests reliquaries"
- read: def 4 / off 8 → 6; sustained 54 (2 × Slam); nova none; dmg 54

```
Cathedral-Vault Ooze
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

	

8 (-1)

	

1 (-5)

Damage Immunities: 

acid

Condition Immunities: 

charmed, deafened, exhaustion, frightened, grappled, prone, restrained

Senses: 

blindsight 30 ft., passive Perception 9

Languages: 

None

Challenge

9 (5,000 XP)

Proficiency Bonus:

+4

Luminous Mark. A creature the cathedral-vault ooze damages sheds dim light in a 5-foot radius until the end of the cathedral-vault ooze's next turn and can't benefit from being invisible while it does.
Amorphous. The cathedral-vault ooze can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form. A creature that touches the cathedral-vault ooze or hits it with a melee attack while within 5 feet of it takes 9 (2d8) acid damage.
Spider Climb. The cathedral-vault ooze can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The cathedral-vault ooze makes two Slam attacks. It can replace one attack with a use of Vessel Devouring.
Slam: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 11 (2d10) acid damage.
Vessel Devouring: One creature within 30 feet must succeed on a DC 15 Strength saving throw or be pulled up to 25 feet straight toward the cathedral-vault ooze by a pseudopod of tar-black ooze and be grappled (escape DC 15).
```

**Where each row came from**

- Traits/Luminous Mark — template marking-light; library draw (seed unstamped); binds the GM's words: glow+glowing
- Traits/Amorphous — the chassis
- Traits/Corrosive Form — the chassis
- Traits/Spider Climb — the chassis
- Actions/Multiattack — the chassis
- Actions/Slam — the chassis
- Actions/Vessel Devouring — template hook-drag; library draw (seed unstamped); binds the GM's words: drag+pull

**Engine trace**

```
[path] homebrew — "a cathedral-vault ooze that digests reliquaries" (call)
[route] ooze type=Ooze mechanics=grapple — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "digests reliquaries" | ooze: ✓ ("cathedral-vault ooze") | ooze: no line key in the words — the model's read of its quote
[concept] hints: ooze→body ✓ ("cathedral-vault ooze") | engulf→mechanics ✓ ("digests reliquaries")
[concept] resolve: archetype=ooze type=Ooze themes=amorphous/devouring mind=mindless style=— energy=Acid mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple
[concept] signature elements: digesting reliquaries and their bearers [behavior] | tar-black amorphous mass that squeezes through crypt cracks [body] | half-dissolved gilded reliquaries and saintly bones inside it [object]
[concept] identity: The reliquary-vault ooze waits in the shadow of a desecrated nave, swelling upward to engulf any pilgrim who clasps a holy relic, then grinding the vessel down over hours while the stolen consecration feeds its growth. Every round it presses its tar-black mass forward to swallow another armoured chest or gilded casket, sloughing off blades and hammer-strikes so it can tighten its grip. When bloodied it does not retreat; it collapses into the crypt-cracks, drags its hoard of half-dissolved saints down with it, and re-emerges engorged and angrier from a passage its enemies cannot follow.
[concept] lore: Born where a collapsed cathedral vault let consecrated dust mingle with something older in the earth, the ooze has learned that reliquaries are the richest food in the world and now hunts them, and the pious who carry them, with an unholy patience.
[reskin] body type: ooze — the body outranks the role (recorded: ooze)
[reskin] donor: ooze-9 -> CR 9 (invented — no printed peer)
[reskin] row gated out: Engulf (engulf) — the concept did not claim this mechanic
[reskin] [path] decides: homebrew (the matcher would have said twist Gray Ooze)
[reskin] alignment by body: Neutral -> Unaligned — a Ooze at INT 2 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the cathedral-vault ooze" — the call answered "the ooze" (kind), which the name does not support
[reskin] inline on kit rows: "the ooze" -> "the cathedral-vault ooze"
[reskin] inline form: "the ooze" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a cathedral-vault ooze" -> has (descriptive), head | "digests reliquaries" -> has (descriptive)
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, push-prone, herd, thrown-burst-seed, drain, delayed-brand, zone-seed, wind-up, blighted-ground, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the ooze strikes a foe it is holding or that bears a holy object, it drags that creature partly into its mass and begins dissolving the vessel and the flesh together, and it keeps eating this way round after round until the thing is gone. It gains strength from each reliquary or consecrated bearer it consumes, swelling a little larger and hungrier, but this feeding pull only works on things i" [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, rampage, patient-defense, second-wind, riposte)
[reskin] closest accepted: action — the call refused every template but named "hook-drag" as nearest; it lands rather than the row being dropped (what it wanted: grapples and holds the target adjacent while the ooze feeds, gaining strength an)
[reskin] value check: "Vessel Devouring" EV 14.9 vs floor 14 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Vessel Devouring" ("The ooze's feeding drag pulls a held or holy-bearing creature partly into its ma [verb: drag:idea, pull:idea]")
[reskin] signature idea (trait): "Half-dissolved gilded reliquaries and saintly bones turn slowly inside its tar-black body, and whenever it has swallowed holy matter it glows faintly through its mass and moves and strikes with greater force for a time afterward. The stolen consecration fades if the ooze goes long without fresh relics." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — aberrant-ground (ooze)
[reskin] word match declined by the call: adhesive, marking-light — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "marking-light" as nearest; it lands rather than the row being dropped (what it wanted: grants the creature a temporary bonus to its attacks and movement after it consu)
[reskin] signature template (trait): marking-light -> Traits/"Reliquary Glut" ("The idea is a glow-and-empower-from-swallowed-holy-matter buff with a fading res [verb: glow:idea, glowing:idea]")
[reskin] weapons answered: Slam = none; Reliquary Grip = none
[reskin] languages held: None stands — INT 2 on a Ooze speaks nothing, whatever the mind read said
[reskin] element immunity: Acid (merged into the header write)
[reskin] immunities stamped for type: Ooze -> Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained
[reskin] name-canon stands down: the path answered homebrew on "a cathedral-vault ooze that digests reli" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Vessel Devouring.
[reskin] audit rename: "Reliquary Glut" -> "Luminous Mark"
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] grapples and holds the target adjacent while the ooze feeds, gaining strength and size each round it continues — "When the ooze strikes a foe it is holding or that bears a holy object, it drags that creature partly into its mass and begins dissolving the vessel and the flesh together, and it keeps eating this way round after round until the thing is gone. It gains strength from each reliquary or consecrated bearer it consumes, swelling a little larger and hungrier, but this feeding pull only works on things i" — Cathedral-Vault Ooze [seat: action [rider/on_hit/damage]] (closest offered: hook-drag) [effect: resource] [menu: stunning-strike charge-push hook-rider pounce isolation charge hook-drag] [same-cell unoffered: none] [same-seat rejected: affliction:legality contagion:legality snatch:legality bolt-restrain:role bolt-drag:legality bolt-mark:role] [landed: hook-drag]
[reskin] [gap] grants the creature a temporary bonus to its attacks and movement after it consumes holy objects, fading when it goes wi — "Half-dissolved gilded reliquaries and saintly bones turn slowly inside its tar-black body, and whenever it has swallowed holy matter it glows faintly through its mass and moves and strikes with greater force for a time afterward. The stolen consecration fades if the ooze goes long without fresh relics." — Cathedral-Vault Ooze [seat: trait [trait/always/resource]] (closest offered: marking-light) [effect: resource] [menu: aberrant-ground false-appearance adhesive phobia terrain-walk faultless-tracker web-walker noxious-aura bloodied-fury uncanny-sense berserk shielded-mind evasion relentless-pursuit bound marking-light sealed-body undead-fortitude mimicry truth-aura gaze-aura assassinate blurred-form death-burst] [same-cell unoffered: lay-on-hands second-wind volley-order] [same-seat rejected: spider-climb:legality earth-glide:legality tunneler:legality guarded-stance:role] [landed: marking-light]
[reskin] record reconciled: "Vessel Devouring" no longer imposes Grappled,Restrained — the clause left, so the record goes with it
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Passexile — bands soft

**Concept:** a stone giant exile who speaks only Giant and understands no Common

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Passexile | 9 (2014) | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-atk: attack +10 against the aim's +7
- read: def 7 / off 10 → 8.5; sustained 60 (2 × Stone Club); nova none; dmg 60

```
Passexile
Huge giant, neutral
Armor Class

14 (natural armor)

Hit Points: 

161 (14d12 + 70)

Speed: 

40 ft.

STR	DEX	CON	INT	WIS	CHA


23 (+6)

	

15 (+2)

	

20 (+5)

	

10 (+0)

	

12 (+1)

	

9 (-1)

Skills: 

Athletics +10, Perception +5

Saving Throws: 

STR +10, CON +9

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Giant

Challenge

9 (5,000 XP)

Proficiency Bonus:

+4

Wound Tracker. The passexile knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Actions
Multiattack: The passexile makes two attacks: one with its Stone Club and one with its Boulder.
Stone Club: Melee Weapon Attack: +10 to hit, reach 15 ft., one target. Hit: 30 (7d6 + 6) bludgeoning damage. If the target is a Large or smaller creature, it is pulled up to 10 feet straight toward the passexile.
Boulder: Ranged Weapon Attack: +10 to hit, range 60/240 ft., one target. Hit: 27 (6d6 + 6) bludgeoning damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Stone Club — print's own row, renamed; binds the GM's words: drag+drags+tears free; weapon club
- Actions/Boulder — print's own row
- Traits/Wound Tracker — template faultless-tracker; library draw (seed unstamped)

**Engine trace**

```
[path] twist — Stone Giant (is) — "stone giant" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a stone giant exile") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=bestial/terror mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: stone-hard fists and crushing club [body] | speaks only Giant, comprehends no Common [behavior] | seizes and hurls smaller foes [behavior]
[concept] identity: A towering stone giant steps forward and opens with a two-handed club blow meant to break formation, then simply keeps walking into the fight — grappling and hurling smaller foes, and hammering whoever is left standing with boulder-hard fists. It fights in grim silence, understanding no Common and answering only in Giant, and it does not flee: bloodied, it bellows and digs in harder, treating the scrap as a grudge it intends to settle.
[concept] lore: Cast out of its clan for some debt of honor it refuses to name, the exile wanders the high passes alone, answering questions in Giant and settling every insult with its fists until the mountain itself lets it come home.
[reskin] print canon array: STR 23, DEX 15, CON 20, INT 10, WIS 12, CHA 9 — the Stone Giant's; STR 23 outranks the card's +7, so the sheet rolls +10 (raise-only)
[reskin] donor: brute-9 -> CR 9
[reskin] [path] decides: twist on the Stone Giant (the matcher would have said homebrew)
[reskin] print canon: "a stone giant exile who speaks only Giant and understands no Common" heads on the Stone Giant — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the passexile" — the call's own answer (kind), built from the name
[reskin] inline form: "the passexile" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: "understands no Common"
[reskin] lacks refused: "speaks only Giant" names no absence — nothing in it takes anything away
[reskin] clauses: "a stone giant exile" -> has (descriptive), head | "speaks only Giant" -> has (header) | "understands no Common" -> LACKS (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The passexile answers an insult by gripping a foe and simply walking them along, dragging the grabbed creature with it as it moves. A creature it has seized can be carried bodily in this way, hauled out of formation and into its reach, and it keeps hold of the burden until the captured one tears free or it chooses to let go." [bonus_action/always/movement] — menu: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, feint-slip (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, zone-seed, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: hook-rider — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "hook-rider" as nearest; it lands rather than the row being dropped (what it wanted: grabs a creature and carries it along when the creature moves, keeping hold unti)
[reskin] seat takes its clause: "Hauling Grip" answers "a exile" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature rider: hook-rider -> Club (appended; The idea is a bonus-action grab-and-carry that hauls a seized foe along with the [verb: drag:idea, drags:idea, tears free:idea])
[reskin] signature idea (trait): "Its fists are the mountain itself: whenever it lands a blow with its club or fists, the struck foe is left reeling and unsteady, stumbling as though grinding against bare stone. This happens on every solid hit it makes, so the longer a fight drags on the harder it is to stand against the exile." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] closest accepted: trait — the call refused every template but named "faultless-tracker" as nearest; it lands rather than the row being dropped (what it wanted: each solid hit leaves the target unsteady/stumbling, a stacking or repeated to-h)
[reskin] pick kept on the GM's own words: trait — "faultless-tracker" has no key-table verb, but the call quotes "a stone giant exile who speaks only giant and understands no common" from the description
[reskin] seat takes its clause: "Grinding Impact" answers "a exile" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): faultless-tracker -> Traits/"Grinding Impact" ("No offered template carries the reeling, unsteady-on-every-hit mechanic; the clo [shape fit, no verb match]")
[reskin] weapons answered: Club = club; Boulder = none
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Stone Giant's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Club" -> "Stone Club" — the Stone Giant's own row
[reskin] audit rename: "Grinding Impact" -> "Wound Tracker"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] grabs a creature and carries it along when the creature moves, keeping hold until it tears free — "The passexile answers an insult by gripping a foe and simply walking them along, dragging the grabbed creature with it as it moves. A creature it has seized can be carried bodily in this way, hauled out of formation and into its reach, and it keeps hold of the burden until the captured one tears free or it chooses to let go." — Passexile [seat: action [bonus_action/always/movement]] (closest offered: hook-rider) [effect: movement] [menu: rampage second-wind aggro-curse own-turn-punisher self-invisibility rally focus coating feint-slip hook-rider] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound zone-seed phase-slip] [same-seat rejected: blink:role shell-withdraw:legality patient-defense:role lay-on-hands:role volley-order:role phase-slip:role] [landed: hook-rider]
[reskin] [gap] each solid hit leaves the target unsteady/stumbling, a stacking or repeated to-hit debuff — "Its fists are the mountain itself: whenever it lands a blow with its club or fists, the struck foe is left reeling and unsteady, stumbling as though grinding against bare stone. This happens on every solid hit it makes, so the longer a fight drags on the harder it is to stand against the exile." — Passexile [seat: trait [trait/always/condition]] (closest offered: faultless-tracker) [effect: condition] [menu: false-appearance adhesive phobia terrain-walk aberrant-ground faultless-tracker web-walker noxious-aura bloodied-fury uncanny-sense berserk shielded-mind relentless-pursuit bound marking-light sealed-body undead-fortitude mimicry truth-aura gaze-aura death-burst] [same-cell unoffered: none] [same-seat rejected: spider-climb:legality earth-glide:legality tunneler:legality evasion:role guarded-stance:role assassinate:role blurred-form:role] [landed: faultless-tracker]
[reskin] lack took nothing: "understands no Common" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Krennik Skullstandard — bands soft

**Concept:** name: Krennik Skullstandard | riding a worg

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Krennik Skullstandard [seed 1/2] | 4 (2014) | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 2–6.5, n=13)
- read: def 1 / off 4 → 2.5; sustained 20 (2 × Saber); nova Saddle Charge 22; dmg 28

```
Krennik Skullstandard
Medium humanoid, neutral evil
Armor Class

14 (leather)

Hit Points: 

78 (12d8 + 24)

Speed: 

50 ft.

STR	DEX	CON	INT	WIS	CHA


14 (+2)

	

16 (+3)

	

14 (+2)

	

8 (-1)

	

12 (+1)

	

8 (-1)

Skills: 

Perception +3, Stealth +5

Saving Throws: 

DEX +5

Senses: 

passive Perception 13

Languages: 

Common, Goblin

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Skull-Marked Pursuit. Krennik knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.
Skirmisher's Grace. Krennik ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Mounted Agility. As a bonus action, Krennik takes the Dash or Disengage action.
Rampage (1/Day) (Bonus Action). Immediately after dealing damage to a creature that has half of its hit points or fewer, Krennik moves up to half its speed, and it makes one Saber attack.

Actions
Multiattack: Krennik makes two attacks: one with Saber and one with Javelin.
Saber: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is knocked prone.
Javelin: Ranged Weapon Attack: +5 to hit, range 30/120 ft., one target. Hit: 7 (1d8 + 3) piercing damage.
Saddle Charge (Recharge 5-6): Krennik moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters must make a DC 13 Strength saving throw, taking 22 (5d8) bludgeoning damage on a failed save. On a failed save, the target is also knocked prone.
```

**Where each row came from**

- Traits/Skull-Marked Pursuit — template faultless-tracker; library draw (seed unstamped); binds the GM's words: follows+marked
- Traits/Skirmisher's Grace — the chassis
- Actions/Multiattack — the chassis
- Actions/Saber — weapon scimitar
- Actions/Javelin — weapon javelin
- Actions/Saddle Charge — the chassis
- Bonus Actions/Mounted Agility — the chassis
- Bonus Actions/Rampage — library seed rampage

**Engine trace**

```
[path] homebrew — "riding a worg" (call)
[route] skirmisher-mounted type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] name: "Krennik Skullstandard" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: mounted→style ✓ ("riding a worg")
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/terror mind=sapient style=mounted energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Krennik Skullstandard"
[concept] mechanics: none claimed
[concept] signature elements: worg-mounted cavalry charges [behavior] | trophy-skull standard [object] | iron-studded harness and blades [body]
[concept] identity: Krennik Skullstandard opens by loosing a javelin from worg-back, then spurs in to ride down the nearest mark, trampling with the worg's mass before wheeling past to set up another pass. Every round he circles, hurls, and charges again, using momentum and reach to keep foes off balance. He is a canny raider who break off when bloodied, only to regroup and harry a weakened line.
[concept] lore: A frontier raider who traded his clan's honor for a worg's loyalty, Krennik Skullstandard stalks the trade roads to collect skulls as standards and tribute as proof of his warband's reach.
[reskin] nova capped: "Trampling Rush" 24 → 22 (the chassis nova obeys the cap: 22 at CR 4)
[reskin] donor: skirmisher-3-mounted -> CR 4 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] proper noun: "Krennik Skullstandard" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Krennik" — the call's own answer (person), built from the name
[reskin] inline form: "Krennik" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Krennik Skullstandard — riding a worg" -> has (descriptive), head
[reskin] menu pruned: action — thrown-burst-seed, push-prone, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Krennik hurls a skull-token torn from his standard at a foe, and it bursts into a shrieking, blinding cloud of bone dust and old grave-matter that clings and confuses. Anyone caught in the cloud is thrown off balance and picks up the worg's scent as if marked, so that his next rush toward them lands harder and their flight is already known to the beast." [action/save/condition] — menu: condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, snare, seal, pacify, escalating-dread, terror-pulse (+ shelf: delayed-brand, gaze-single, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] word match declined by the call: sensory-strike, condition-payoff, exploiter, terror-pulse, delayed-brand, aggro-curse, bolt-mark — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "delayed-brand" as nearest; it lands rather than the row being dropped (what it wanted: marks the target so Krennik's next charge against it hits harder and the worg ca)
[reskin] value check: "Skull Scent-Mark" EV 3.3 vs floor 5.2 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Skull Scent-Mark" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: condition-payoff, sensory-strike, exploiter left the shelf — the call declined them for this sheet
[reskin] value check: "Rampage (1/Day)" EV 8.5 vs floor 1.6 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Every skull lashed to Krennik's standard whispers to the worg — when a marked or wounded foe tries to slip away or flank him, the beast's ears flatten and Krennik turns the charge to follow, so retreating from him costs more than standing." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] free signature row: "Skull-Marked Pursuit" — the trait seat cannot quote the GM, but the call names the element it expresses: "worg-mounted cavalry charges". Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] signature template (trait): faultless-tracker -> Traits/"Skull-Marked Pursuit" ("The standard's whispers let the worg and Krennik turn the charge to follow a foe [verb: follows:idea, marked:idea]")
[reskin] weapons answered: Saber = saber; Javelin = javelin
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] chassis nova: "Saddle Charge (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] name-canon stands down: the path answered homebrew on "riding a worg" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Skull-Marked Pursuit" [trait/always/condition]
[reskin] element claim revoked: "Skull-Marked Pursuit" claims "worg-mounted cavalry charges" but the audit returned no verdict for this row; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Skull-Marked Pursuit")
[reskin] audit rename: "Worg-Borne" -> "Skirmisher's Grace"
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Rampage (1/Day)) — the sameness metric
[reskin] [gap] marks the target so Krennik's next charge against it hits harder and the worg can track it — "Krennik hurls a skull-token torn from his standard at a foe, and it bursts into a shrieking, blinding cloud of bone dust and old grave-matter that clings and confuses. Anyone caught in the cloud is thrown off balance and picks up the worg's scent as if marked, so that his next rush toward them lands harder and their flight is already known to the beast." — Krennik Skullstandard [seat: action [action/save/condition]] (closest offered: delayed-brand) [effect: damage] [menu: condition-payoff throw-retrieve shield-bash lure snare-bolt sensory-strike disarm exploiter snare seal pacify escalating-dread terror-pulse delayed-brand aggro-curse bolt-mark] [same-cell unoffered: swallow gaze-single noxious-aura truth-aura gaze-aura random-ray push-prone reveal] [same-seat rejected: swallow:legality trample:legality leap:legality thrown-burst:style gaze-single:style reel:style execute:role hook-drag:role active-toll:role pull-through:role random-ray:legality ground-burst:legality spew:legality burrow-ambush:legality obstacle-pull:role slow-bolt:role push-prone:role herd:role drain:role curse-debt:role reveal:role wind-up:role blighted-ground:role] [VETOED AFTER ACCEPTANCE: delayed-brand never reached the sheet]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — the seat shipped a fallback or nothing
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Hydra — in the run

**Concept:** name: Hydra | whose stumps smoke instead of regrowing

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hydra | 8 (2014) | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 8 / off 5 → 6.5; sustained 10 (1 × Bite); nova Smoking Stumps 24; dmg 23

```
Hydra
Huge monstrosity, unaligned
Armor Class

15 (natural armor)

Hit Points: 

184 (16d12 + 80)

Speed: 

40 ft., swim 40 ft.

STR	DEX	CON	INT	WIS	CHA


20 (+5)

	

12 (+1)

	

20 (+5)

	

2 (-4)

	

10 (+0)

	

7 (-2)

Skills: 

Perception +6

Saving Throws: 

STR +8, CON +8

Condition Immunities: 

blinded, charmed, deafened, frightened, stunned, unconscious

Senses: 

darkvision 60 ft., passive Perception 16

Languages: 

None

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Wounded Fury. While it has half of its hit points or fewer, the hydra has advantage on attack rolls.
Hold Breath. The hydra can hold its breath for 1 hour.
Multiple Heads. The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead.
Reactive Heads. For each head the hydra has beyond one, it gets an extra reaction that can be used only for opportunity attacks.

Actions
Multiattack: The hydra makes as many Bite attacks as it has heads.
Bite: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.
Smoking Stumps (Recharge 5-6): Each creature in a 30-foot cone must make a DC 16 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also blinded until the end of its next turn.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Bite — print's own row
- Actions/Smoking Stumps — template spew; library draw (seed unstamped); binds the GM's words: choking cloud
- Traits/Bloodied Fury — template bloodied-fury; library draw (seed unstamped); binds the GM's words: frenzy
- Traits/Hold Breath — print's own row
- Traits/Multiple Heads — print's own row
- Traits/Reactive Heads — print's own row

**Engine trace**

```
[path] twist — Hydra (is) — "Name field: Hydra" (code)
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("stumps smoke instead of regrowing") | brute-regenerator: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "fire" answers a question nobody asked
[concept] name: "Hydra" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/venomous mind=bestial style=regenerator energy=Poison mix=both identity=✓ lore=✓
[concept] name: provided "Hydra"
[concept] mechanics: regeneration
[concept] signature elements: smoking stumps instead of regrown heads [behavior] | multiple lashing necks and biting heads [body] | choking acidic smoke from its wounds [aura]
[concept] identity: The Hydra fights as a writhing knot of snapping necks, its many heads lashing out in a concert of bites while its wounds seal shut almost as fast as they are cut. But every severed neck leaves a stump that does not regrow — instead it smokes, hissing a blinding, choking vapor that cloaks the beast and punishes anyone who thinks to exploit its damage. It is an aggressive, methodical predator that presses its advantage relentlessly, never retreating until its bane finds it.
[concept] lore: A Hydra that has been cursed or alchemically altered, its regenerative gift inverted so that each wound becomes a smoking wound that never fully heals — it haunts the swamps and ruin-filled valleys where it was made, searching for a way to quench the smoldering within.
[reskin] print canon route: the Hydra's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon route: the regenerator seat's organ leaves too — the Hydra has no Regeneration of its own
[reskin] print canon defenses: HP 136 -> 184, AC 14 -> 15 — the Hydra's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 20, INT 2, WIS 10, CHA 7 — the Hydra's at its own CR; attack +7 -> +8, DC 16 (print's)
[reskin] donor: brute-5 -> CR 8
[reskin] [path] decides: twist on the Hydra (the matcher agrees)
[reskin] print canon: "Hydra — whose stumps smoke instead of regrowing" heads on the Hydra — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the hydra" — the call answered "the hydra" (kind), which the name does not support
[reskin] inline form: "the hydra" — the model's own reading of the name
[reskin] lacks asked: "instead of regrowing"
[reskin] the clause is its own quote: trigger "on_being_hit" stands on "Hydra — whose stumps smoke instead of regrowing" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Hydra — whose stumps smoke instead of regrowing" -> LACKS (mechanical) [asked: on_being_hit/save_area]
[reskin] signature idea (action): "When the hydra takes a wound that would have regrown on any other of its kind, the stump bursts open in a hissing plume of poisoned smoke that clings to the beast and the space around it. Anyone caught in the choking cloud is blinded and wracked with coughing fits for a short while, and the haze hangs in the air until it thins out or the hydra moves on. It can only cough up so much smoke before th" [action/once_per_fight/condition] — menu: trample, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, zone, zone-seed, snare, execute, seal, lure, pacify, snare-bolt (+ shelf: leap, gaze-single, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — zone, zone-seed (smoke)
[reskin] signature template: spew -> Actions/"Smoking Stumps (Recharge 5-6)" ("hissing plume of poisoned smoke that blinds and leaves creatures coughing — the  [verb: choking cloud:idea]")
[reskin] signature idea (trait): "Every head it loses is a loss it never gets back, so the hydra grows more frantic and aggressive as the fight drags on, lashing out with all its remaining necks at once in a widening frenzy. The fewer heads it has, the more savagely the survivors strike, and it never turns to flee until its curse is quenched or it is dead." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, assassinate (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — warded-mending (regrows)
[reskin] closest accepted: trait — the call refused every template but named "bloodied-fury" as nearest; it lands rather than the row being dropped (what it wanted: each lost head makes the surviving heads strike harder, a scaling attack bonus t)
[reskin] free signature row: "Smoking Stumps" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Smoking Stumps" answers "Hydra — whose stumps smoke" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] trait renamed: "Smoking Stumps" already names a row — the trait ships as "Bloodied Fury"
[reskin] signature template (trait): bloodied-fury -> Traits/"Bloodied Fury" ("Every head it loses is a loss it never gets back, so the hydra grows more frantic and aggressive as the fight drags on, lashing out with all its remaining necks [verb: frenzy:idea]")
[reskin] weapons answered: Bite = none
[reskin] speed by concept: added Swim 40 ft. — the concept's movement set decides
[reskin] print canon alignment: Neutral -> Unaligned — the Hydra's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "the hydra makes as many Bite attacks as it has heads." — the Hydra's own
[reskin] languages held: None stands — INT 2 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon skills: "Athletics +8, Perception +3" -> "Perception +6" — the Hydra's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities none -> Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious — the Hydra's own header lines
[reskin] print canon trait: Hold Breath — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Multiple Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Reactive Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Bloodied Fury" [trait/always/defense]
[reskin] asked but unanswered: "Hydra — whose stumps smoke instead of regrowing" asked for on_being_hit and no row binds the clause
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Bloodied Fury")
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] each lost head makes the surviving heads strike harder, a scaling attack bonus that rises as its own resource is spent — "Every head it loses is a loss it never gets back, so the hydra grows more frantic and aggressive as the fight drags on, lashing out with all its remaining necks at once in a widening frenzy. The fewer heads it has, the more savagely the survivors strike, and it never turns to flee until its curse is quenched or it is dead." — Hydra [seat: trait [trait/always/damage]] (closest offered: bloodied-fury) [effect: damage] [menu: warded-mending false-appearance adhesive phobia terrain-walk aberrant-ground faultless-tracker web-walker noxious-aura bloodied-fury uncanny-sense berserk shielded-mind relentless-pursuit bound marking-light sealed-body undead-fortitude mimicry truth-aura gaze-aura death-burst assassinate] [same-cell unoffered: throw-retrieve own-turn-punisher coating] [same-seat rejected: spider-climb:legality earth-glide:legality tunneler:legality evasion:role guarded-stance:role blurred-form:role] [landed: bloodied-fury]
[reskin] lacks clause: Traits/"Multiple Heads" keeps its blow, loses the regeneration — "Hydra — whose stumps smoke instead of regrowing"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Drowned Choir — in the run

**Concept:** a drowned cathedral choir that sings in one voice

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Drowned Choir [seed 1/2] | 10 (2014) | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "sings in one voice"
- read: def 12 / off 9 → 10.5; sustained 60 (2 × Voice); nova none; dmg 60

```
Drowned Choir
Medium undead, neutral
Armor Class

14 (natural armor)

Hit Points: 

180 (24d8 + 72)

Speed: 

5 ft., fly 60 ft. (hover), swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


6 (-2)

	

16 (+3)

	

17 (+3)

	

12 (+1)

	

14 (+2)

	

15 (+2)

Skills: 

Stealth +7

Saving Throws: 

DEX +7

Damage Resistances: 

bludgeoning, piercing, slashing

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained

Senses: 

blindsight 30 ft. (blind beyond this radius), passive Perception 12

Languages: 

Common plus the languages it knew in life

Challenge

10 (5,900 XP)

Proficiency Bonus:

+4

Breathstealing Hymn. Any creature that starts its turn within 10 feet of the drowned choir must make a DC 15 Constitution saving throw. On a failed save, the target is poisoned until the start of its next turn. On a successful save, the target is immune to this creature's aura for 24 hours.
Incorporeal Movement. The drowned choir can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
Sunlight Sensitivity. While in sunlight, the drowned choir has disadvantage on ability checks and attack rolls.

Actions
Multiattack: The drowned choir makes two Voice attacks. It can replace one attack with a use of Drowning Draught.
Voice: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 30 (6d8 + 3) necrotic damage.
Drowning Draught: One creature within 30 feet of the drowned choir must make a DC 15 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one. The drowned choir regains hit points equal to half the damage dealt.
```

**Where each row came from**

- Traits/Breathstealing Hymn — template noxious-aura; library draw (seed unstamped); binds the GM's words: voices+hymn
- Traits/Incorporeal Movement — the chassis
- Traits/Sunlight Sensitivity — the chassis
- Actions/Multiattack — the chassis
- Actions/Voice — the chassis
- Actions/Drowning Draught — library seed drain

**Engine trace**

```
[path] homebrew — "a drowned cathedral choir that sings in one voice" (call)
[route] lurker-phantom type=Undead mechanics=aura — casts: implied by the kind — "sings in one voice" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("drowned cathedral choir") | lurker-phantom: key "drowned" (class body)
[concept] resolve: archetype=lurker type=Undead themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: one voice sung by many drowned throats [behavior] | a hymn that drains the breath of the living [aura] | drowned cathedral masonry and grave-water [body]
[concept] identity: The Choir opens with its dirge-hymn — a single, sweet, drowning chord that rolls through stone and marrow, pulling the living toward a cathedral that no longer stands above water. Every round it re-sings the anthem, layering voice on voice until each struck note saps warmth and breath from those still breathing, drifting through drowned walls to find the next listener, and it never breaks the hymn to flee: bloodied, it only sings louder, believing every voice it takes makes the chord more perfect.
[concept] lore: When the flood took the cathedral and its choir with it, the singers never stopped — one unbroken anthem bound their drowning breath into a single voice that still gathers new throat-singers to swell its verse.
[reskin] donor: lurker-5-phantom -> CR 10
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] repair round 1: 1 defect(s) — "Voice" deals Thunder but this creature's energy is Necrotic — use Necrotic or a physical type
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the drowned choir" — the call's own answer (kind), built from the name; the rules would have said "Choir"
[reskin] inline on kit rows: "Choir" -> "the drowned choir"
[reskin] inline form: "the drowned choir" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a drowned cathedral choir" -> has (descriptive), head | "sings in one voice" -> has (mechanical) [asked: save_single]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The choir draws a long breath and lets the hymn swell, and every living creature that can hear it feels its own breath pulled toward the singers, dragged a short way across the ground toward the choir as if wading into deep water. Those caught by the pull can feel their warmth leaking out along the note, leaving them chilled and slow to act until the verse moves on." [action/save/movement] — menu: leap, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground, trample, thrown-burst, gaze-single, snare, execute, shield-bash (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, aggro-curse, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] value check: "Breath-Drawn Hymn" EV 4.1 vs floor 15.6 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Breath-Drawn Hymn" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vitality Leech" EV 24 vs floor 15.6 (one attack of 2) — added Success: Half; dice 18 → 31
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Every living creature that can hear the hymn has its breathing slowly stolen by it — warmth and air seep away in time with the singing, and the longer a listener stays within earshot the more the anthem drinks from them." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — noxious-aura, mimicry (voices)
[reskin] word match declined by the call: absorption — the key word does not mean the mechanic here
[reskin] signature template (trait): noxious-aura -> Traits/"Breathstealing Hymn" ("The hymn steals breath from every living listener in earshot, sickening them in  [verb: voices:concept, hymn:idea]")
[reskin] weapons answered: Voice = none
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] name-canon stands down: the path answered homebrew on "a drowned cathedral choir that sings in " and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Vitality Leech.
[reskin] audit rename: "Vitality Leech" -> "Drowning Draught"
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Drowning Draught) — the sameness metric
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Vampire — in the run

**Concept:** name: Vampire | who keeps a garden of thorns

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vampire | 13 (2014) | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "keeps a garden of thorns"
- read: def 11 / off 6 → 8.5; sustained 30 (2 × Grave Strike); nova none; dmg 30

```
Vampire
Medium undead, lawful evil
Armor Class

16 (natural armor)

Hit Points: 

195 (23d8 + 92)

Speed: 

40 ft., climb 40 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

18 (+4)

	

18 (+4)

	

17 (+3)

	

15 (+2)

	

18 (+4)

Skills: 

Perception +7, Stealth +9

Saving Throws: 

DEX +9, INT +8

Damage Resistances: 

necrotic

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 120 ft., passive Perception 17

Languages: 

Common plus two other languages

Challenge

13 (10,000 XP)

Proficiency Bonus:

+5

Warded Mending. The vampire regains 20 hit points at the start of each of its turns if it has at least 1 hit point and its ward is within 30 feet of it.
Legendary Resistance (3/Day, or 4/Day in Lair). If the vampire fails a saving throw, it can choose to succeed instead.
Misty Escape. If the vampire drops to 0 hit points outside its resting place, the vampire uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 hit points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and is paralyzed until it regains any hit points, and it regains 1 hit point after spending 1 hour there.
Spider Climb. The vampire can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Vampire Weakness. The vampire has these weaknesses: Forbiddance: the vampire can't enter a residence without an invitation from an occupant.
Running Water: the vampire takes 20 acid damage if it ends its turn in running water.
Stake to the Heart: If a weapon that deals piercing damage is driven into the vampire's heart while the vampire is incapacitated in its resting place, the vampire is paralyzed until the weapon is removed.
Sunlight: the vampire takes 20 radiant damage if it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks.
Shape-Shift. As a bonus action, if the vampire isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., fly speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., fly speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the vampire can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the vampire can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has resistance to all damage, except the damage it takes from sunlight.
Charm (Recharge 5-6). As a bonus action, the vampire casts charm person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The charmed target is a willing recipient of the vampire's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was charmed by the vampire.

Actions
Multiattack: The vampire makes two Grave Strike attacks and uses Bite. It can replace one attack with a use of Thorn Garden.
Grave Strike: Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) by one of two hands.
Thorn Garden: One creature within 60 feet of the vampire must succeed on a DC 17 Dexterity saving throw or be restrained until the end of the vampire's next turn.
Bite (Bat or Vampire Form Only): One creature within 5 feet of the vampire that is willing or that is grappled, incapacitated, or restrained must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) piercing damage plus 13 (3d8) necrotic damage on a failed save. The target's hit point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a vampire spawn under the vampire's control.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Grave Strike — print's own row, renamed
- Actions/Thorn Garden — template snare-bolt; library draw (seed unstamped); binds the GM's words: root+vine
- Actions/Bite — print's own row
- Bonus Actions/Shape-Shift — print's own row
- Bonus Actions/Charm — print's own row
- Traits/Warded Mending — template warded-mending; library draw (seed unstamped); binds the GM's words: knits
- Traits/Legendary Resistance — print's own row
- Traits/Misty Escape — print's own row
- Traits/Spider Climb — print's own row
- Traits/Vampire Weakness — print's own row

**Engine trace**

```
[path] twist — Vampire (is) — "Name field: Vampire" (code)
[route] lurker type=Undead mechanics=snare — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "garden of thorns" | lurker-trap: ✓ ("keeps a garden of thorns") | lurker-trap: no line key in the words — the model's read of its quote | lurker-trap -> lurker: a trap is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] name: "Vampire" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=lurker type=Undead themes=grave/grasping mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Vampire"
[concept] mechanics: snare
[concept] signature elements: garden of thorn-vines it hides in and commands [object] | erupting from the briars for a single devastating fang-strike [behavior] | blood-fed grave brambles that pin and drain the wounded [aura]
[concept] identity: The Thorn-Gardener is a vampire of grave-soil and old blood who tends a walled garden of briars as a stalking blind, opening every fight by erupting from the thorns to bury a single fang-strike in an intruder's throat. Each round after, it retreats into the hedge and re-hides, splitting the garden's thorn-vines to bleed and pin prey while it circles for the next opening, and it never fights fair — it drags the wounded into the briars and taunts what remains until the garden is quiet. Under pressure it toys with prey rather than flee, retreating only to its deepest thicket of blood-fed brambles to heal and return for another pass.
[concept] lore: A country lord buried in unconsecrated soil beneath his own hedge maze rose again as the garden's keeper, and now he roots his dead heart in the briars and waters them with the blood of anyone who steps through the gate.
[reskin] print canon defenses: HP 184 -> 195, AC 17 -> 16 — the Vampire's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 18, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's at its own CR; attack +8 -> +9, DC 17 (print's)
[reskin] donor: lurker-8 -> CR 13
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Vampire (the matcher agrees)
[reskin] print canon: "Vampire — who keeps a garden of thorns" heads on the Vampire — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the vampire" — the call answered "the vampire" (kind), which the name does not support
[reskin] inline form: "the vampire" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 17 (8 + PB 5 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Vampire —" -> has (descriptive), head | "keeps a garden of thorns" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The vampire whirls and bids the briars he has rooted through the whole garden lash out at every creature near him, not just the one he faces — thorned vines whip up from the soil and hedges to rake everyone standing close, dragging the bitten and the bleeding down into the thicket where they are held among the thorns until they tear free. It is the garden itself striking for its keeper, so it can " [action/save/damage] — menu: swallow, gaze-single, execute, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground, trample, thrown-burst, thrown-burst-seed, curse-debt, wind-up (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — drain (vampire)
[reskin] closest accepted: action — the call refused every template but named "snare-bolt" as nearest; it lands rather than the row being dropped (what it wanted: an area effect lashing every creature near the vampire and restraining them in t)
[reskin] seat takes its clause: "Thorn Garden" answers "keeps a garden of thorns" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: snare-bolt -> Actions/"Thorn Garden" ("The row is for the vampire's garden of thorns — its command of the briars, not a [verb: root:idea, vine:idea]")
[reskin] signature idea (trait): "The vampire's roots run through the soil of his garden, so any wound he takes while standing among his thorns feeds them: the briars drink the spilt blood and knit harmlessly over him, while anyone who strikes him or lingers in his thicket finds the vines turning on them, pricking and clawing at flesh they can taste. This only holds where the hedge grows — away from the garden he is only a lean an" [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (thorns)
[reskin] word match declined by the call: heated-body, terrain-walk, aberrant-ground, uncanny-sense — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "warded-mending" as nearest; it lands rather than the row being dropped (what it wanted: regains Hit Points when wounded while within his thorn garden, and thorns lash a)
[reskin] free signature row: "Warded Mending" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Warded Mending" answers "keeps a garden of thorns" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): warded-mending -> Traits/"Warded Mending" ("The garden is a presence he commands and draws from, not a body that harms those [verb: knits:idea]")
[reskin] weapons answered: Fang-Strike = none; Thorn-Crown Snare = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Vampire's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Fang-Strike" -> "Grave Strike" — the Vampire's own row
[reskin] print canon multiattack: "the vampire makes two Grave Strike attacks and uses Bite." — the Vampire's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon skills: "Perception +7, Stealth +14" -> "Perception +7, Stealth +9" — the Vampire's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance (3/Day, or 4/Day in Lair) — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Thorn Garden.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Warded Mending" [trait/start_of_turn/resource]
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Warded Mending")
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] an area effect lashing every creature near the vampire and restraining them in the thorns — "The vampire whirls and bids the briars he has rooted through the whole garden lash out at every creature near him, not just the one he faces — thorned vines whip up from the soil and hedges to rake everyone standing close, dragging the bitten and the bleeding down into the thicket where they are held among the thorns until they tear free. It is the garden itself striking for its keeper, so it can " — Vampire [seat: action [action/save/damage]] (closest offered: snare-bolt) [effect: condition] [menu: drain swallow gaze-single execute seal wail lure hook-drag active-toll pull-through random-ray ground-burst spew obstacle-pull pacify escalating-dread terror-pulse snare-bolt slow-bolt sensory-strike zone-seed blighted-ground trample thrown-burst thrown-burst-seed curse-debt wind-up hook-rider] [same-cell unoffered: leap condition-payoff burrow-ambush exploiter] [same-seat rejected: leap:legality snare:role reel:role condition-payoff:legality shield-bash:role burrow-ambush:legality disarm:role push-prone:role herd:role reveal:role exploiter:legality] [landed: snare-bolt]
[reskin] [gap] regains Hit Points when wounded while within his thorn garden, and thorns lash at whoever wounds him there — "The vampire's roots run through the soil of his garden, so any wound he takes while standing among his thorns feeds them: the briars drink the spilt blood and knit harmlessly over him, while anyone who strikes him or lingers in his thicket finds the vines turning on them, pricking and clawing at flesh they can taste. This only holds where the hedge grows — away from the garden he is only a lean an" — Vampire [seat: trait [trait/on_being_hit/damage]] (closest offered: warded-mending) [effect: resource] [menu: heated-body absorption bloodied-burst resonant-body bloodied-fury terrain-walk aberrant-ground uncanny-sense warded-mending] [same-cell unoffered: ward-retaliation snap-shot riposte] [same-seat rejected: weapon-lodge:role] [landed: warded-mending]
[reskin] escape dc: Grave Strike → DC 17 (8 + PB + STR; a late row wore another number)
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Marrowsun Lich — in the run

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Marrowsun Lich | 20 (2014) | caster-21 | ok | ok | ok | ok | ok | FAIL: conversion-dropped-duration | ok | ok | ok | ok |

- edition · fail · conversion-dropped-duration: Actions/Paralyzing Touch: the 2024 row bounds Paralyzed; the 2014 sheet dropped the duration and imposes it indefinitely
- read: def 19 / off 20 → 19.5; sustained 126 (3 × Eldritch Burst + legendary Deathly Teleport); nova Marrow Rise 24; dmg 126

```
Marrowsun Lich
Medium undead, neutral evil
Armor Class

20 (natural armor)

Hit Points: 

315 (42d8 + 126)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


11 (+0)

	

16 (+3)

	

16 (+3)

	

21 (+5)

	

14 (+2)

	

16 (+3)

Skills: 

Arcana +17, History +11, Insight +8, Perception +8

Saving Throws: 

CON +9, INT +11, WIS +8

Damage Resistances: 

cold, lightning

Damage Immunities: 

necrotic, poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, poisoned

Senses: 

darkvision 120 ft., passive Perception 18

Languages: 

All

Challenge

20 (25,000 XP)

Proficiency Bonus:

+6

Marrow Rise. The lich explodes when it dies. Each creature within 30 feet of the lich must make a DC 19 Dexterity saving throw, taking 24 (7d6) radiant damage on a failed save, or half as much damage on a successful one. The explosion destroys the lich's body.
Legendary Resistance (3/Day). If the lich fails a saving throw, it can choose to succeed instead.
Spirit Jar. If destroyed, the lich reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the lich's lair.
Protective Magic (3/Day) (Reaction). When the lich is hit by an attack roll, it casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: The lich makes three attacks, using Eldritch Burst or Paralyzing Touch. It can replace one attack with a use of Spellcasting to cast Guiding Bolt.
Eldritch Burst: Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 31 (4d12 + 5) force damage.
Paralyzing Touch: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed.
Spellcasting: The lich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19): -

At will: detect magic, detect thoughts, dispel magic, fireball, invisibility, lightning bolt, mage hand, prestidigitation

2/day each: animate dead, dimension door, plane shift

1/day each: chain lightning, finger of death, power word kill, scrying
Legendary Actions

The lich can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The lich regains spent legendary actions at the start of its turn.

Deathly Teleport: The lich teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an undead within 20 feet of the lich must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one. Whether the saving throw succeeds or fails, the lich can't take this action again until the start of its next turn.
Frightening Gaze: The lich casts fear, using the same spellcasting ability as Spellcasting. The lich can't take this action again until the start of its next turn.
```

**Where each row came from**

- Traits/Marrow Rise — template death-burst; library draw (seed unstamped)
- Traits/Legendary Resistance — the chassis
- Traits/Spirit Jar — print's own row
- Actions/Multiattack — the chassis
- Actions/Eldritch Burst — print's own row, renamed
- Actions/Paralyzing Touch — print's own row, renamed
- Actions/Spellcasting — print's own row
- Reactions/Protective Magic — the chassis
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Deathly Teleport — print's own row
- Legendary Actions/Disrupt Life — print's own row
- Legendary Actions/Frightening Gaze — print's own row

**Engine trace**

```
[path] twist — Lich (is) — "archlich" (call)
[route] caster (artillery) type=Undead mechanics=aura — casts: implied by the kind — "archlich" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("archlich") | caster: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "radiant" answers a question nobody asked
[concept] name: provided_name rejected — "archlich enthroned on a sun of bone…" is the description, not a name
[concept] resolve: archetype=caster type=Undead themes=grave/arcane mind=sapient style=— energy=Radiant mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: the sun of bone it is enthroned upon [body] | searing bone-white radiance that punishes the living [aura] | raising slain bone into servants mid-fight [behavior]
[concept] identity: The Bone Sun Lich opens by anchoring its throne-sun overhead, bathing the field in a slow bone-white radiance while it strikes from on high with grave-cold bolts of marrow-light; every round it taxes the living with that searing halo and reshapes fallen bone into fresh servitors, never once stepping down from its seat. It does not flee and it does not hurry — it has outlived better challengers, and it toys with them by letting the sun rise a little brighter each round.
[concept] lore: Once a mortal archmage who bound its own death into a throne carved from the marrow-sun of a dead god, the lich now drifts between worlds looking for the last living thing that remembers its name, so it can watch that memory burn out.
[reskin] print canon pb: print's +12 on PB +7 reads +11 on this sheet's PB +6; DCs follow
[reskin] print canon defenses: HP 300 -> 315, AC 19 -> 20 — the Lich's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 21, WIS 14, CHA 16 — the Lich's at its own CR; attack +10 -> +11, DC 19 (print's, on this sheet's PB)
[reskin] donor: caster-21 -> CR 20
[reskin] [path] decides: twist on the Lich (the matcher agrees)
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the lich" — the call's own answer (kind), built from the name
[reskin] inline form: "the lich" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an archlich enthroned on a sun of bone" -> has (descriptive), head
[reskin] menu pruned: action — thrown-burst-seed, phase-slip, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The lich reaches into the marrow-sun overhead and wrings free a wisp of its light, then hurls it as a slow-falling cinder at a spot it can see. The cinder lingers where it lands, shedding grave-cold radiance that clings to anything living that strays near it, searing and halting them; any creature that has already suffered from one of the lich's radiant attacks is drawn to the cinder's light and s" [action/always/damage] — menu: gaze-single, snare, condition-payoff, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal, throw-retrieve (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, own-turn-punisher, coating, bolt-restrain, bolt-drag, bolt-mark)
[reskin] free signature row: action — "zone-seed" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "the sun of bone it is enthroned upon" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Marrowsun Cinder (2/Day)" answers "an arch enthroned on a sun of bone" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: zone-seed -> Actions/"Marrowsun Cinder (2/Day)" ("the lich wrings a cinder from the marrow-sun and hurls it to a spot it can see,  [shape fit, no verb match]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's 19 at CR 20, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Splinters and slivers of bone cannot lie still in the sun's halo — whenever the lich or one of its blows brings a living creature low, the fallen shards rise and knit themselves into a small skeletal servitor that obeys the throne. The servitor is a weak, temporary thing of marrow-light, and only so many can rise at once before the throne's light is spent." [trait/always/defense] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion, guarded-stance (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] word match declined by the call: heated-body, warded-mending, bound, false-appearance — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "death-burst" as nearest; it lands rather than the row being dropped (what it wanted: creates a temporary servitor when it drops a living creature, limited to a few a)
[reskin] free signature row: trait — "death-burst" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Marrow Rise" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Marrow Rise" answers "an arch enthroned on a sun of bone" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): death-burst -> Traits/"Marrow Rise" ("The idea is a summon/spawn mechanic — fallen living creatures become temporary s [shape fit, no verb match]")
[reskin] weapons answered: Marrowlight = none; Bone Scepter = mace; Bone Radiance = none
[reskin] weapon declared: "Bone Scepter" is a mace — the call's own answer
[reskin] chassis nova: "Bone Radiance (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] speed by concept: dropped Fly 30 ft. (hover) — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon attack: "Marrowlight" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon attack: "Bone Scepter" -> "Paralyzing Touch" — the Lich's own row
[reskin] print canon multiattack: "the lich makes three attacks, using Eldritch Burst or Paralyzing Touch in any combination." — the Lich's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon skills: "Arcana +11, Perception +8" -> "Arcana +17, History +11, Insight +8, Perception +8" — the Lich's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] resistances derived withheld: print's Lich owns the line (Cold, Lightning)
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Bone Radiance (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] dead control row: "Marrowsun Cinder (2/Day)" moves to Bonus Actions — no damage, no save, no KO condition
[reskin] multiattack replacement clause: It can replace one attack with a use of Spellcasting to cast *Guiding Bolt*.
[reskin] free row over budget: Bonus Actions/"Marrowsun Cinder" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Marrow Rise" [trait/always/damage]
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Marrow Rise")
audit finding below confidence gate: Legendary Resistance (3/Day) Entry name duplicates a standard 2024 statblock trait but the text here is model-written and identical in function; no defect in text itself, but the d20 number format ('3/Day') matches standard phrasing — flagged only if chassis already provides it; otherwise consistent.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rewrite blocked — "Frightening Gaze" is engine-authored chassis text
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] creates a temporary servitor when it drops a living creature, limited to a few at once — "Splinters and slivers of bone cannot lie still in the sun's halo — whenever the lich or one of its blows brings a living creature low, the fallen shards rise and knit themselves into a small skeletal servitor that obeys the throne. The servitor is a weak, temporary thing of marrow-light, and only so many can rise at once before the throne's light is spent." — Marrowsun Lich [seat: trait [trait/always/defense]] (closest offered: death-burst) [effect: resource] [menu: false-appearance phobia terrain-walk aberrant-ground faultless-tracker web-walker noxious-aura bloodied-fury uncanny-sense shielded-mind relentless-pursuit bound marking-light sealed-body undead-fortitude mimicry truth-aura gaze-aura blurred-form death-burst evasion guarded-stance heated-body warded-mending] [same-cell unoffered: shell-withdraw patient-defense] [same-seat rejected: adhesive:role spider-climb:legality earth-glide:legality tunneler:legality berserk:role assassinate:role] [landed: death-burst]
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Ancient Gold Dragon — in the run

**Concept:** name: Ancient Gold Dragon | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ancient Gold Dragon | 24 (2014) | — | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 26 / off 20 → 23; sustained 80 (3 × Bite + legendary Wing Attack); nova Breath Weapons 71; dmg 101

```
Ancient Gold Dragon
Gargantuan dragon, lawful good
Armor Class

22 (Natural Armor)

Hit Points: 

546 (28d20 + 252)

Speed: 

40 ft., fly 80 ft., swim 40 ft.

STR	DEX	CON	INT	WIS	CHA


30 (+10)

	

14 (+2)

	

29 (+9)

	

18 (+4)

	

17 (+3)

	

28 (+9)

Skills: 

Insight +10, Perception +17, Persuasion +16, Stealth +9

Saving Throws: 

DEX +9, CON +16, WIS +10, CHA +16

Damage Immunities: 

Fire

Senses: 

Blindsight 60 ft., Darkvision 120 ft., Passive Perception 27

Languages: 

Common, Draconic

Challenge

24

Proficiency Bonus:

+7

Amphibious. The dragon can breathe air and water.
Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead.

Actions
Multiattack: The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.
Bite: Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10 + 10) piercing damage.
Claw: Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 17 (2d6 + 10) slashing damage.
Tail: Melee Weapon Attack: +17 to hit, reach 20 ft., one target. Hit: 19 (2d8 + 10) bludgeoning damage.
Frightful Presence: Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 24 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.
Breath Weapons (Recharge 5–6): The dragon uses one of the following breath weapons.
Fire Breath: The dragon exhales fire in a 90-foot cone. Each creature in that area must make a DC 24 Dexterity saving throw, taking 71 (13d10) fire damage on a failed save, or half as much damage on a successful one.
Weakening Breath: The dragon exhales gas in a 90-foot cone. Each creature in that area must succeed on a DC 24 Strength saving throw or have disadvantage on Strength-based attack rolls, Strength checks, and Strength saving throws for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
Change Shape: The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice).

In a new form, the dragon retains its alignment, hit points, Hit Dice, ability to speak, proficiencies, Legendary Resistance, lair actions, and Intelligence, Wisdom, and Charisma scores, as well as this action. Its statistics and capabilities are otherwise replaced by those of the new form, except any class features or legendary actions of that form.
Legendary Actions

The ancient gold dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The ancient gold dragon regains spent legendary actions at the start of its turn.

Detect: The dragon makes a Wisdom (Perception) check.
Tail Attack: The dragon makes a tail attack.
Wing Attack (Costs 2 Actions): The dragon beats its wings. Each creature within 15 feet of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.
```

**Where each row came from**

- (no rows)

**Engine trace**

```
[path] exact — Ancient Gold Dragon (is) — "Ancient Gold Dragon" (code)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | dragon: ✓ ("Ancient Gold Dragon") | dragon: key "dragon" (class body)
[concept] hints: dragon→body ✓ ("Ancient Gold Dragon — a true dragon body")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/elemental mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Ancient Gold Dragon"
[concept] mechanics: breath
[concept] signature elements: molten-gold flame breath [behavior] | gilded scales that flare with light [body] | centuries of hoarded treasure [object]
[concept] identity: The ancient gold dragon opens with its frightful presence and a cone of searing, molten-gold flame, then closes to rend with claws and fangs while its gilded scales shed blinding flares of light. Every round it alternates between strafing breath runs and full attacks, using its wings to reposition and its tail to sweep away those who crowd it. When bloodied, it does not flee — it ascends, hovers just out of reach, and rains fire until the field is a mirror of its own brilliance, then descends to finish what remains.
[concept] lore: An ancient gold dragon is a living hoard of sunlit metal and wyrmfire, sleeping beneath desert ruins for centuries until its treasure is disturbed or its territory profaned.
[reskin] 2014 exact: "Ancient Gold Dragon" served from the SRD 5.1 corpus — no call, nothing rephrased (owner's ruling; the 2014 book's own creature)
```


---


### Goblin Boss — in the run

**Concept:** name: Goblin Boss | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Boss | 1 (2014) | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 1 → 1.5; sustained 10 (2 × Scimitar); nova none; dmg 10

```
Goblin Boss
Small humanoid, chaotic neutral
Armor Class

17 (chain shirt, shield)

Hit Points: 

21 (6d6)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


10 (+0)

	

15 (+2)

	

10 (+0)

	

10 (+0)

	

8 (-1)

	

10 (+0)

Skills: 

Stealth +6

Saving Throws: 

DEX +4

Senses: 

darkvision 60 ft., passive Perception 9

Languages: 

Common, Goblin

Challenge

1 (200 XP)

Proficiency Bonus:

+2

Nimble Escape. As a bonus action, the goblin boss takes the Disengage or Hide action.

Actions
Multiattack: The goblin boss makes two attacks, using Scimitar or Shortbow.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage plus 2 (1d4) slashing damage if the attack had advantage.
Shortbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Scimitar — print's own row, renamed; weapon scimitar
- Actions/Shortbow — print's own row, renamed; weapon shortbow
- Bonus Actions/Nimble Escape — print's own row

**Engine trace**

```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792639584558:1465:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792639584558:1304:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792639584558:657:5)
!! [ENRICHMENT] Failed to enrich Owlbear: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792639584558:1465:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792639584558:1304:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792639584558:657:5)
[path] exact — Goblin Boss (is) — "Goblin Boss" (code)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("Goblin Boss") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/grasping mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Goblin Boss"
[concept] mechanics: none claimed
[concept] signature elements: skulking ambush from cover [behavior] | hurled jagged blade [object] | comand over a cowering warband [behavior]
[concept] identity: A wiry goblin warlord who fights from the back of the pack, slipping behind cover, hurling a jagged blade or barking a shove that sends an ally into the fray, then diving back into the dark before the retaliation lands. Every round after the surprise is spent repositioning — ducking behind a bigger brute, baiting a hero's swing, and stabbing the opening that greed creates. Bloodied, it does not stand and die; it scampers through a crack in the warband and lives to scheme another ambush.
[concept] lore: A goblin chief holds its warband through fear, hoarded scraps, and the promise of loot, and it wants nothing more than to live long enough to grow fat on someone else's plunder.
[reskin] 2014 exact: "Goblin Boss" is not in the SRD 5.1 corpus — the 5.2 block converts as before
[reskin] print canon route: "Goblin Boss" is the Goblin Boss — the skulker seat stands down for the plain line
[reskin] print canon defenses: HP 26 -> 21, AC 13 -> 17 — the Goblin Boss's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 17 (chain shirt, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 10, DEX 15, CON 10, INT 10, WIS 8, CHA 10 — the Goblin Boss's at its own CR; attack +3 -> +4, DC 12 (print's)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] [path] decides: exact on the Goblin Boss (the matcher agrees)
[reskin] print canon: "Goblin Boss" is a print creature — the seats stand down; print's own rows are the composition
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] class kit: none — the exact path takes no class kit
[reskin] inline by rule: "the goblin boss" — the call answered "the goblin boss" (kind), which the name does not support
[reskin] inline form: "the goblin boss" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 12 (8 + PB 2 + the sheet's best 2) — no stat on the sheet reached it
[reskin] damage type by the row's own noun: "Knife" Slashing -> Piercing
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Goblin Boss" -> has (descriptive), head
[reskin] weapons answered: Knife = dagger; Dart = dart
[reskin] weapon table: "Dart" — thrown, range 20/60
[reskin] print canon speed: modes walk only — the Goblin Boss's
[reskin] print canon senses: "darkvision 60 ft." — the Goblin Boss's
[reskin] languages by mind: "Goblin" -> "Common, Goblin" (sapient)
[reskin] print canon type: Humanoid stays — the Goblin Boss is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon alignment: Neutral Evil -> Chaotic Neutral — the Goblin Boss's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Knife" -> "Scimitar" — the Goblin Boss's own row
[reskin] print canon multiattack: "the goblin boss makes two attacks, using Scimitar or Shortbow in any combination." — the Goblin Boss's own
[reskin] print canon attack: "Shortbow" is print's own row — +4, 5 (1d6 + 2), range 80/320 ft. (an exact body at print's CR)
[reskin] print canon attack: "Dart" -> "Shortbow" — the Goblin Boss's own ranged row
[reskin] print canon skills: "Perception +1, Stealth +4" -> "Stealth +6" — the Goblin Boss's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Traits/"Slippery" is the seat's, not the Goblin Boss's
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Boss's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Goblin Boss's Nimble Escape
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Iron-Bound Sentinel — in the run

**Concept:** a sentinel of black iron, AC 20, Huge, speed 20 feet

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Iron-Bound Sentinel [seed 1/3] | 11 (2014) | defender-7-warden | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic | ok |

- reader · fail · name-mechanic: Actions/Ward the Charge: the name promises movement the text lacks
- read: def 10 / off 8 → 9; sustained 46 (2 × Iron Fist); nova none; dmg 46

```
Iron-Bound Sentinel
Huge construct, lawful neutral
Armor Class

20 (natural armor)

Hit Points: 

168 (16d12 + 64)

Speed: 

20 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

8 (-1)

	

18 (+4)

	

7 (-2)

	

10 (+0)

	

3 (-4)

Skills: 

Perception +4

Saving Throws: 

CON +8

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

Common

Challenge

11 (7,200 XP)

Proficiency Bonus:

+4

Numbing Iron Rebuke. A creature that hits the sentinel with a melee attack while within 5 feet of it takes 10 (3d6) thunder damage and is deafened until the end of its next turn.
Ward Bond. The sentinel is magically bound to a ward of its choosing, and it can have only one ward at a time. While the sentinel is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the sentinel.
Regeneration. The sentinel regains 10 hit points at the start of each of its turns if it has at least 1 hit point.
Iron Reprisal. As a bonus action, the sentinel deals 10 (3d6) force damage to one creature within 5 feet that hit it with an attack roll since the end of the sentinel's last turn.
Interpose (Reaction). When a creature within 5 feet of the sentinel that it guards is hit by an attack roll, the attack hits the sentinel instead, and the sentinel has resistance to the attack's damage.

Actions
Multiattack: The sentinel makes two Iron Fist attacks.
Iron Fist: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage plus 10 (3d6) force damage.
Ward the Charge (2/Day): The sentinel targets itself or one creature it can see within 60 feet. The target gains 24 (7d6) temporary hit points, and it gains a +2 bonus to AC until the end of the sentinel's next turn.
```

**Where each row came from**

- Traits/Numbing Iron Rebuke — template resonant-body; library draw (seed unstamped); binds the GM's words: iron
- Traits/Ward Bond — the chassis
- Traits/Regeneration — the chassis
- Actions/Multiattack — the chassis
- Actions/Iron Fist — the chassis
- Actions/Ward the Charge — the chassis
- Bonus Actions/Iron Reprisal — library seed own-turn-punisher
- Reactions/Interpose — template interpose; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "a sentinel of black iron" (call)
[route] defender-warden type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-warden: ✓ ("a sentinel of black iron") | defender: the call read "sentinel" as not meaning that mechanic here — no override | defender-warden stands: every key that would override it was read as a figure of speech | defender-warden: no line key in the words — the model's read of its quote
[concept] hints: warden→style ✓ ("a sentinel of black iron")
[concept] resolve: archetype=defender type=Construct themes=forged/grave mind=sapient style=warden energy=Force mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: bound guardian aura that redirects attacks to itself [aura] | black iron hide that turns blades [body] | relentless slow advance that ends in a crushing slam [behavior]
[concept] identity: The sentinel of black iron does not chase; it chooses its ground and becomes a wall between its charge and the world, opening with a grinding 20-foot advance that ends in a single, crushing slam meant to drive foes back rather than kill. Every round after, it weathers blows that would fell a giant, redirecting attention to itself until enemies either break against its iron hide or give up. Under pressure it never flees and never toys—its temper is a closed gate, and it will fight to the death with the same slow, deliberate patience it showed on the first round.
[concept] lore: Forged in a black-iron foundry whose furnaces were quenched with oath-silver, each sentinel is bound to a single charge—a tomb, a threshold, a sleeping heir—and has stood so long that rust has become its only memory of time.
[reskin] donor: defender-7-warden -> CR 11
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] repair round 1: 1 defect(s) — name "Ward the Charge" promises movement but the row never delivers it — name what the rule does, or drop the claim word
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the sentinel" — the call's own answer (kind), built from the name
[reskin] inline form: "the sentinel" — the model's own reading of the name
[reskin] save dc derived: DC 17 -> 16 (8 + PB 4 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no chasing" quotes nothing the user typed
[reskin] clauses: "a sentinel of black iron" -> has (descriptive), head | "AC 20" -> has (header) | "Huge" -> has (header) | "speed 20 feet" -> has (header)
[reskin] extraction: 1 of 4 model clauses quote nothing the user typed and leave the record ("AC 20")
[reskin] signature idea (action): "The sentinel plants its feet and drives one iron fist down into the ground ahead of it, and the impact travels outward as a grinding shockwave. Every creature in front of it is shoved back and knocked off balance, and the force of the blow lingers in the cracked ground, punishing enemies who try to close in on its charge from that side for a short while." [action/save/movement] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, ward-retaliation, riposte, interpose, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — ward-retaliation (sentinel)
[reskin] nova declined: "Iron Shockwave (Recharge 5-6)" — a whole-round ability the GM never asked for and the call named none of this creature's own elements for it: the call offered no quote, and the key table finds no verb either (the idea's own words: shockwave:idea); the fallback stands in (the cauldron's spill, 2026-09-29)
[reskin] fallback skipped by the floor: slow-bolt (EV 3.3 vs 12.5)
[reskin] fallback skipped by the floor: push-prone (EV 3.3 vs 12.5)
[reskin] fallback skipped by the floor: herd (EV 9.4 vs 40.6)
[reskin] value check: "Answering Sting" EV 5.5 vs floor 3.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 18 already beats print's 17 at CR 11, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Striking the sentinel's iron hide leaves a jolt of force crawling back up the attacker's arms, so anyone who lands a blow on it feels their own assault turned back against them in a brief, numbing surge." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — heated-body, resonant-body (iron)
[reskin] word match declined by the call: heated-body — the key word does not mean the mechanic here
[reskin] seat default: warden owes interpose by print — it seats before the idea
[reskin] signature template (trait): interpose -> Reactions/"Interpose" ("the seat owes it by print")
[reskin] signature template (trait): resonant-body -> Traits/"Numbing Iron Rebuke" ("Striking the sentinel's iron hide leaves a jolt crawling back up the attacker's  [verb: iron:concept]")
[reskin] weapons answered: Iron Fist = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a sentinel of black iron" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] audit rename: "Answering Sting" -> "Iron Reprisal"
[reskin] seed share: 1 of 3 signature row(s) came from a seed (Iron Reprisal) — the sameness metric
[reskin] header clause: speed 30 ft. -> 20 ft. — the user typed 20 feet
[reskin] user-set: AC 18 -> 20 — a declared field, not a derivation (Resolution 3)
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Ilvareth Dusksong — in the run

**Concept:** name: Ilvareth Dusksong | An elf archmage who bends shadow and steps between places.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ilvareth Dusksong | 12 (2014) | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 17 → 13.5; sustained 108 (4 × Arcane Burst); nova none; dmg 108

```
Ilvareth Dusksong
Medium humanoid, neutral
Armor Class

17

Hit Points: 

170 (31d8 + 31)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


10 (+0)

	

14 (+2)

	

12 (+1)

	

20 (+5)

	

15 (+2)

	

16 (+3)

Skills: 

Arcana +13, History +9, Perception +6

Saving Throws: 

INT +9, WIS +6

Damage Immunities: 

psychic, charmed ((with mind blank))

Senses: 

passive Perception 16

Languages: 

Common plus five other languages, Elvish

Challenge

12 (8,400 XP)

Proficiency Bonus:

+4

Dusk Brand. A creature Ilvareth damages sheds dim light in a 5-foot radius until the end of Ilvareth's next turn and can't benefit from the invisible condition while it does.
Magic Resistance. Ilvareth has advantage on saving throws against spells and other magical effects.
Misty Step (3/Day). As a bonus action, Ilvareth casts misty step, using the same spellcasting ability as Spellcasting.
Protective Magic (3/Day) (Reaction). When Ilvareth is hit by an attack roll, Ilvareth casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Ilvareth makes four Arcane Burst attacks.
Spellcasting: The Ilvareth casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 17): -

At will: detect magic, detect thoughts, disguise self, invisibility, light, mage armor, mage hand, prestidigitation

2/day each: fly, lightning bolt

1/day each: cone of cold, mind blank, scrying, teleport
Arcane Burst: Melee or Ranged Spell Attack: +9 to hit, reach 5 ft. or range 150 ft., one target. Hit: 27 (4d10 + 5) force damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Spellcasting — print's own row
- Actions/Arcane Burst — print's own row
- Reactions/Protective Magic — mage kit; the GM's clause "archmage"
- Bonus Actions/Misty Step — mage kit; the GM's clause "bends shadow and steps between places"
- Traits/Dusk Brand — template marking-light; library draw (seed unstamped)
- Traits/Magic Resistance — print's own row

**Engine trace**

```
[path] class_npc — class mage — "archmage" (call)
[route] caster (artillery) type=Humanoid mechanics=teleport — casts: implied by the kind — "An elf archmage who bends shadow and ste" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("An elf archmage who bends shadow and ste") | caster: no line key in the words — the model's read of its quote
[concept] name: "Ilvareth Dusksong" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=caster type=Humanoid themes=arcane/uncanny mind=sapient style=— energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: provided "Ilvareth Dusksong"
[concept] mechanics: teleport
[concept] signature elements: stepping between places through shadow [behavior] | a body woven of clinging dusk [body] | shadow-binding bolts that chill and hold [behavior]
[concept] identity: Ilvareth Dusksong opens by folding the battlefield into gloom, blinking from shadow to shadow while loosing bolts of cold, clinging darkness at range. Every round he repositions through any patch of shadow, keeping walls and allies between himself and anyone who closes, and answers pressure by stepping away rather than trading blows. He is a patient, cruel duelist who toys with prey until bloodied, then spends his last reserves escaping through the deepest shadow he can find.
[concept] lore: A high-elven archmage who traded centuries of study for mastery of the border-realm where light casts no shadow, Ilvareth now walks between those seams hunting the one spell that will let him step out of the world entirely.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Archmage — the class's own print block, nearest CR 12
[reskin] print canon defenses: HP 168 -> 170, AC 16 -> 17 — the Archmage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 10, DEX 14, CON 12, INT 20, WIS 15, CHA 16 — the Archmage's at its own CR; attack +8 -> +9, DC 17 (print's)
[reskin] donor: caster-12 -> CR 12
[reskin] [path] decides: class_npc on the Archmage · class mage (the matcher would have said twist Archmage)
[reskin] print canon: "Ilvareth Dusksong — An elf archmage who bends shadow and steps between places." heads on the Archmage — print's rows ride along; the seat stays
[reskin] repair round 1: 2 defect(s) — name "Umbral Bolt" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade | "Umbral Bolt" deals Cold on a Humanoid whose concept names no Cold — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "archmage": Misty Step (3/Day) (Mage/Misty Step)
[reskin] proper noun: "Ilvareth Dusksong" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Ilvareth" — the call's own answer (person), built from the name
[reskin] inline form: "Ilvareth" — the model's own reading of the name
[reskin] spell DC coherence: DC 18 -> 17 off Intelligence 20 (print's array stays)
[reskin] save dc derived: DC 18 -> 17 (8 + PB 4 + Intelligence's 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Ilvareth Dusksong — An elf archmage" -> has (descriptive), head | "bends shadow and steps between places" -> has (mechanical) [asked: movement]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When Ilvareth looses an Umbral Bolt, some of the clinging dark comes away with the strike and stays on the target, weaving a thread of shadow between them. As long as that thread lasts, Ilvareth can pull on it to drag the victim toward him or step along it to that victim's shadow — and while it holds, the victim cannot fully hide from him, no matter the gloom. The thread frays and dies if Ilvareth" [rider/on_hit/movement] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, disarm, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, focus, feint-slip)
[reskin] signature bound to the concept's verb: action — phase-slip (step, shadow)
[reskin] closest accepted: action — the call refused every template but named "bolt-drag" as nearest; it lands rather than the row being dropped (what it wanted: leaves a lasting tether on the target that later lets the creature pull it in or)
[reskin] seat takes its clause: "Shadow Thread" answers "Ilvareth Dusksong — An elf" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature rider: bolt-drag -> Umbral Bolt (appended; The thread that pulls the victim and lets Ilvareth step along it is movement tie [verb: bolt:idea, drags:idea, pulls:idea])
[reskin] signature idea (trait): "Ilvareth's body is woven of clinging dusk, and shadow clings back: any darkness or shade in his space deepens and reaches for those within it, so that fleeing or circling him through gloom leaves its mark on the body — a lingering chill that makes the next shadow he steps through fall heavier and closer." [trait/always/condition] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, adhesive, berserk (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] closest accepted: trait — the call refused every template but named "marking-light" as nearest; it lands rather than the row being dropped (what it wanted: marks a creature that moves through shadow with a lingering chill that makes his)
[reskin] free signature row: trait — "marking-light" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Dusk Brand" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Dusk Brand" answers "Ilvareth Dusksong — An elf" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): marking-light -> Traits/"Dusk Brand" ("The idea is a clinging-shade mark on creatures that flee through Ilvareth's gloo [shape fit, no verb match]")
[reskin] weapons answered: Umbral Bolt = none
[reskin] weapon declined: "Umbral Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Umbral Bolt" — a launcher, never thrown, range 80/320
[reskin] print canon alignment: Neutral Evil -> Neutral — the Archmage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Elvish" -> "Common plus five other languages, Elvish" — the Archmage's plus the concept's Elvish
[reskin] print canon row: Actions/Arcane Burst — the Archmage's own melee row, added (the chassis carried none to rename)
[reskin] print canon multiattack: "Ilvareth makes four Arcane Burst attacks." — the Archmage's own
[reskin] ranged row off: "Umbral Bolt" leaves — the Archmage carries no ranged row and the words name none
[reskin] print canon skills: "Arcana +9, Perception +6" -> "Arcana +13, History +9, Perception +6" — the Archmage's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities none -> Psychic; Charmed ((with Mind Blank)) — the Archmage's own header lines
[reskin] print canon trait: Magic Resistance — "Ilvareth Dusksong — An elf archmage who bends shadow and steps between places." is the Archmage (print's own row)
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Dusk Brand" [trait/always/condition]
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 120 ft.; Passive Perception 16" -> "Passive Perception 16")
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Dusk Brand")
audit finding names unknown entry, dropped: Immunities
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] leaves a lasting tether on the target that later lets the creature pull it in or teleport to it — "When Ilvareth looses an Umbral Bolt, some of the clinging dark comes away with the strike and stays on the target, weaving a thread of shadow between them. As long as that thread lasts, Ilvareth can pull on it to drag the victim toward him or step along it to that victim's shadow — and while it holds, the victim cannot fully hide from him, no matter the gloom. The thread frays and dies if Ilvareth" — Ilvareth Dusksong [seat: action [rider/on_hit/movement]] (closest offered: bolt-drag) [effect: movement] [menu: phase-slip bolt-restrain bolt-drag bolt-mark snare obstacle-pull snare-bolt pacify slow-bolt] [same-cell unoffered: charge-push hook-rider] [same-seat rejected: affliction:role contagion:role stunning-strike:role charge-push:role hook-rider:role pounce:role isolation:role snatch:role charge:role] [VETOED AFTER ACCEPTANCE: bolt-drag never reached the sheet]
[reskin] [gap] marks a creature that moves through shadow with a lingering chill that makes his next shadow-step heavier and closer — "Ilvareth's body is woven of clinging dusk, and shadow clings back: any darkness or shade in his space deepens and reaches for those within it, so that fleeing or circling him through gloom leaves its mark on the body — a lingering chill that makes the next shadow he steps through fall heavier and closer." — Ilvareth Dusksong [seat: trait [trait/always/condition]] (closest offered: marking-light) [effect: condition] [menu: false-appearance phobia terrain-walk aberrant-ground faultless-tracker web-walker bloodied-fury uncanny-sense shielded-mind relentless-pursuit bound marking-light sealed-body undead-fortitude mimicry truth-aura gaze-aura blurred-form death-burst adhesive berserk] [same-cell unoffered: none] [same-seat rejected: spider-climb:legality earth-glide:legality tunneler:legality evasion:role guarded-stance:role assassinate:role] [landed: marking-light]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — the seat shipped a fallback or nothing
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Reedsong Adept — in the run

**Concept:** lizardfolk monk

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Reedsong Adept | 5 (2014) | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 7 → 6; sustained 46 (2 × Unarmed Strike); nova none; dmg 46

```
Reedsong Adept
Medium humanoid, neutral
Armor Class

15

Hit Points: 

94 (21d8)

Speed: 

30 ft., climb 30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


10 (+0)

	

16 (+3)

	

10 (+0)

	

12 (+1)

	

14 (+2)

	

16 (+3)

Skills: 

Perception +5, Stealth +6

Saving Throws: 

DEX +6

Senses: 

passive Perception 15

Languages: 

Common plus one other language, Draconic

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Shrieking Scales. A creature that hits the adept with a melee attack while within 5 feet of it takes 5 (1d10) thunder damage and is deafened until the end of its next turn.
Hold Breath. The adept can hold its breath for 15 minutes.
Marsh Stride. Difficult terrain composed of mud doesn't cost the adept extra movement, and the adept can move across mud without needing to make an ability check.
Patient Defense. As a bonus action, the adept takes the Dodge action.
Cunning Action. As a bonus action, the adept takes the Dash, Disengage, or Hide action.

Actions
Multiattack: The adept makes two attacks: one with its Unarmed Strike and one with its Dart.
Unarmed Strike: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 23 (3d8 + 3) bludgeoning damage. Once on each of the adept's turns when it hits with this attack, the target is subjected to the following effect. The target must succeed on a DC 14 Constitution saving throw or be stunned until the end of the adept's next turn. If the target is a creature and doesn't already have a venom-wet claw wound, it is subjected to the following effect. The target must succeed on a DC 14 Constitution saving throw or receive a venom-wet claw wound. While wounded, the target loses 5 (1d10) hit points at the start of each of its turns. The wound closes after 1 minute, after a spell restores hit points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, succeeding on a DC 14 Wisdom (Medicine) check.
Dart: Ranged Weapon Attack: +6 to hit, range 20/60 ft., one target. Hit: 12 (2d8 + 3) piercing damage.
```

**Where each row came from**

- Traits/Shrieking Scales — template resonant-body; library draw (seed unstamped)
- Traits/Hold Breath — lizardfolk kit; the GM's clause "monk"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "monk"
- Actions/Multiattack — the chassis
- Actions/Unarmed Strike — print's own row, renamed; a declared feature; the GM's clause "monk"; binds the GM's words: venom
- Actions/Dart — print's own row, renamed; weapon dart
- Bonus Actions/Patient Defense — template patient-defense; monk kit; the GM's clause "monk"
- Bonus Actions/Cunning Action — print's own row

**Engine trace**

```
[path] class_npc — class monk — species lizardfolk — "monk" (call)
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("lizardfolk monk") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=venomous/aquatic mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: venom-coated fists and claws [behavior] | marsh hunter's dart-and-circle melee [behavior] | venom-brewing lizardfolk body [body]
[concept] identity: A lizardfolk monk that swims through reeds and shallows with a hunter's patience, opening with a flurry of dew-slick scale and claw before its venom-coated fists drive home. Every round after it circles the prey, striking twice then breaking contact half a step beyond reach, using the marsh's cover as a third limb. Under pressure it never fights to the death — it spits venom, lures its pursuer into water it knows, and finishes the duel on its own ground or withdraws to strike again.
[concept] lore: Born into a reeds-dwelling tribe whose monks brew venom from marsh vipers and coat scale and knuckle alike, it walks the shallows as a silent enforcer of its people's riverine hunting grounds.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the monk stands on the Spy — the class's own print block, nearest CR 5
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 5
[reskin] [path] decides: class_npc on the Spy · class monk (the matcher would have said homebrew)
[reskin] print canon: "lizardfolk monk" heads on the Spy — print's rows ride along; the seat stays
[reskin] repair round 1: 2 defect(s) — name "Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear) | "Venom Spit" deals Poison on a Humanoid whose concept names no Poison — a name is not a warrant; use a physical type
[reskin] row evicted for the cap: Traits/"Reed-Walker" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "monk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Claw), Patient Defense (patient-defense)
[reskin] inline declared: "the adept" — the call's own answer (kind), built from the name
[reskin] inline form: "the adept" — the model's own reading of the name
[reskin] energy rider withheld: Poison on a Humanoid with no Poison in the concept's own words
[reskin] energy withheld on a base row: "Venom Spit" Poison -> Piercing (the body's physical type; a Humanoid deals no Poison its concept never gave it)
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "lizardfolk monk" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The adept vanishes into the reeds and shallows, then bursts out at a chosen prey with a venom-wet claw strike from an unexpected angle. If the ambush lands, that prey's limbs go slack with marsh-viper venom, dragging its speed down while the adept slips back out of reach. It can only spring this once before needing to circle and reposition." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, bolt-restrain (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] word match declined by the call: pounce, leap — the key word does not mean the mechanic here
[reskin] seat takes its clause: "Marsh Viper Strike" answers "lizardfolk" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature rider: affliction -> Claw (appended; venom-wet claw strike whose land causes limbs to go slack [verb: venom:idea])
[reskin] signature idea (trait): "Marsh viper venom seeps from the adept's scales and knuckles, so anyone who grabs, grapples, or presses it in close combat gets the venom on their skin and sickens for it. The adept itself is long inured to its own brew and never suffers from it." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] word match declined by the call: terrain-walk, absorption, bloodied-burst, resonant-body — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "resonant-body" as nearest; it lands rather than the row being dropped (what it wanted: a creature that grabs or grapples the adept must make a Constitution save or be )
[reskin] free signature row: trait — "resonant-body" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Reeking Scales" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Reeking Scales" answers "lizardfolk" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): resonant-body -> Traits/"Reeking Scales" ("The idea is a venomous contact effect that sickens anyone who grapples or presse [shape fit, no verb match]")
[reskin] weapons answered: Claw = none; Venom Spit = none
[reskin] weapon table: "Venom Spit" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] print canon modes: swim off — the Spy has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Swim 40 ft.; added Climb 50 ft. — the concept's movement set decides
[reskin] languages by mind: "Draconic" -> "Common, Draconic" (sapient)
[reskin] print canon languages: "Common, Draconic" -> "Common plus one other language, Draconic" — the Spy's plus the concept's Draconic
[reskin] print canon speed: Climb -> 30 ft. — the Spy's own
[reskin] print canon attack: "Claw" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Venom Spit" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Bonus Actions/Cunning Action — the Spy's own
[reskin] class weapon: Actions/"Shortsword" -> "Unarmed Strike" — a monk fights with its hands, not the Spy's; the body's rider folds in (+7)
[reskin] class weapon: Actions/"Hand Crossbow" -> "Dart" — a monk fights with a dart, not the Spy's
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Reeking Scales" [trait/on_being_hit/damage]
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Reeking Scales")
audit finding below confidence gate: Unarmed Strike The venom-wet claw wound is a persistent damage-over-time state whose only removal is a 1-minute timer, a healing spell, or an action+DC 14 Medicine check by the target or an adjacent creature; the target itself can act (its own action is a listed escape), so counterplay exists, but the block omits a duration/end timing for the recurring damage relative to the wound's closure.
[reskin] audit rename: "Reeking Scales" -> "Shrieking Scales"
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a creature that grabs or grapples the adept must make a Constitution save or be Poisoned (with the adept immune to its o — "Marsh viper venom seeps from the adept's scales and knuckles, so anyone who grabs, grapples, or presses it in close combat gets the venom on their skin and sickens for it. The adept itself is long inured to its own brew and never suffers from it." — Reedsong Adept [seat: trait [trait/on_being_hit/condition]] (closest offered: resonant-body) [effect: condition] [menu: absorption bloodied-burst resonant-body terrain-walk] [same-cell unoffered: none] [same-seat rejected: heated-body:legality weapon-lodge:role] [landed: resonant-body]
[reskin] species kit: Swim 30 ft. — a lizardfolk's own
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Meshrin — in the run

**Concept:** name: Meshrin | Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages. Give him a frightening roar. AC 16, 120 hit points.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | skirmisher-8-hurler | ok | ok | SOFT: lint:hp-formula | ok | ok | ok | ok | ok | ok | ok |

- structure · soft · lint:hp-formula: HP listed 120 but formula 14d10 + 42 averages 119
- **dropped clause:** "Give him a frightening roar"
- read: def 5 / off 8 → 6.5; sustained 51 (3 × Greataxe); nova none; dmg 51

```
Meshrin
Large humanoid, neutral
Armor Class

16 (breastplate)

Hit Points: 

120 (14d10 + 42)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

15 (+2)

	

16 (+3)

	

10 (+0)

	

12 (+1)

	

15 (+2)

Skills: 

Perception +4, Stealth +5

Saving Throws: 

DEX +5, WIS +4

Senses: 

passive Perception 14

Languages: 

Common, Draconic

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Wounded Frenzy. While Meshrin has half of its hit points or fewer, it has advantage on attack rolls and saving throws.
Hold Breath. Meshrin can hold its breath for 15 minutes.
Great Weapon Master. When Meshrin hits a creature with its greataxe, the attack deals an extra 3 damage.
Marsh Stride. Difficult terrain composed of mud doesn't cost Meshrin extra movement, and Meshrin can move across mud without needing to make an ability check.

Actions
Multiattack: Meshrin makes three attacks, using Greataxe or Javelin. It can replace one attack with a use of Marsh-Quaking Roar.
Greataxe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (3d8 + 4) slashing damage.
Javelin: Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 17 (3d8 + 4) piercing damage. Immediately after the attack, its javelin returns to Meshrin's grasp, and the target's speed is reduced by 10 feet until the start of Meshrin's next turn.
Marsh-Quaking Roar: One creature within 60 feet of Meshrin must succeed on a DC 15 Wisdom saving throw or be frightened of Meshrin until the end of Meshrin's next turn. If the target was already frightened by this ability, it also takes 7 (2d6) psychic damage.
```

**Where each row came from**

- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "barbarian"
- Traits/Hold Breath — lizardfolk kit; the GM's clause "barbarian"
- Traits/Great Weapon Master — a declared feature; the GM's clause "Wields a greataxe two-handed"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "barbarian"
- Actions/Multiattack — the chassis
- Actions/Greataxe — authored for this sheet; a named part; the GM's clause "Wields a greataxe two-handed"; weapon greataxe
- Actions/Javelin — authored for this sheet; a named part; a declared feature; the GM's clause "a javelin for the throw"; weapon javelin
- Actions/Marsh-Quaking Roar — template escalating-dread; library draw (seed unstamped)

**Engine trace**

```
[path] class_npc — class barbarian — species lizardfolk — "barbarian" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-hurler: ✓ ("a javelin for the throw") | skirmisher-hurler: key "throw" (class verb)
[concept] name: "Meshrin" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: hurler→style ✓ ("javelin for the throw")
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/bestial mind=sapient style=hurler energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Meshrin"
[concept] mechanics: thrown-weapon
[concept] signature elements: two-handed greataxe [object] | raging barbarian fury [behavior] | frightening roar [behavior]
[concept] identity: Meshrin opens by hurling his javelin to stagger the nearest foe, then closes the gap with a roaring charge and a two-handed greataxe swing before the fight is even joined. Once in melee he rages, trading axe blows for hits and growing more dangerous the longer he is wounded, and when pressed he tends to answer with a bone-rattling roar meant to break formation rather than flee. He fights to the finish — a scarred, stubborn brute who only backs off to line up another javelin throw.
[concept] lore: A blooded barbarian of the marsh-born lizard folk, Meshrin left his tribe after a chieftain's challenge and now sells his axe to any war band that will feed his rage and let him roar.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the barbarian stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] nova capped: "Hurled Burst" 49 → 44 (the chassis nova obeys the cap: 44 at CR 8)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +7
[reskin] donor: skirmisher-8-hurler -> CR 8 (invented — no printed peer)
[reskin] [path] decides: class_npc on the Gladiator · class barbarian (the matcher would have said homebrew)
[reskin] print canon: "Meshrin — Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages. Give him a frightening roar. AC 16, 120 hit points." heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Bone-Rattling Roar" deals Thunder on a Humanoid whose concept names no Thunder — a name is not a warrant; use a physical type
[reskin] named parts: Greataxe (slot), Javelin (slot, ranged) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] row evicted for the cap: Traits/"Marshfoot" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "barbarian": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: rampage — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: barbarian — "barbarian": Bloodied Frenzy (Berserker/Bloodied Frenzy)
[reskin] proper noun: "Meshrin" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Meshrin" — the call's own answer (person), built from the name
[reskin] inline form: "Meshrin" — the model's own reading of the name
[reskin] energy withheld on a base row: "Bone-Rattling Roar" Thunder -> Bludgeoning (the body's physical type; a Humanoid deals no Thunder its concept never gave it)
[reskin] save dc derived: DC 16 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] final price: the chassis's Multiattack: the round ran 39 against the card's 54 — the attack rows re-solve at 138% (3 attacks on an authored sheet, under the card)
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: limit "at_will" stands on "Wields a greataxe two-handed" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "a javelin for the throw" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Meshrin — Large lizard folk" -> has (header) | "30 feet of movement" -> has (header) | "Wields a greataxe two-handed" -> has (mechanical) [asked: at_will/attack] | "a javelin for the throw" -> has (mechanical) [asked: at_will/attack] | "He is a barbarian who rages" -> has (mechanical) [asked: buff_self] | "Give him a frightening roar" -> has (mechanical) [asked: save_area] | "AC 16" -> has (header) | "120 hit points" -> has (header)
[reskin] extraction: 1 of 8 model clauses quote nothing the user typed and leave the record ("AC 16")
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Meshrin rears back and looses a bone-rattling roar that rolls out from him across the marsh. Every foe caught in that shout is shaken to the marrow — their nerve breaks, they falter and flinch away from him and each other, and they cannot steady themselves while the echo hangs in the air, leaving them wide open to the axe and javelin that follow. He cannot roar again until he has had a moment to d" [action/once_per_fight/condition] — menu: snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, gaze-single, zone, execute, seal, pacify, escalating-dread (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, rampage, lay-on-hands, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — throw-retrieve, rampage (javelin, rage)
[reskin] word match declined by the call: lure — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "escalating-dread" has no key-table verb, but the call quotes "give him a frightening roar" from the description
[reskin] signature template: escalating-dread -> Actions/"Marsh-Quaking Roar" ("a bone-rattling roar that breaks the nerve of foes caught in it, leaving them Fr [shape fit, no verb match]")
[reskin] signature idea (trait): "Meshrin grips his greataxe in both scarred hands and swings it with his whole fury behind the blow, so the axe bites deeper than its size suggests and leaves wounds that keep bleeding after the strike. The heavier he is wounded, the harder he drives the haft through his enemies." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (rage)
[reskin] word match declined by the call: bloodied-fury — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "gaze-aura" has no key-table verb, but the call quotes "give him a frightening roar" from the description
[reskin] trait ceiling: "Terrifying Roar" does not ship — 4 traits already, and print's ceiling for a meat body is 3
[reskin] weapons answered: Greataxe = greataxe; Javelin = javelin; Javelin Hurl = javelin; Bone-Rattling Roar = none
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] chassis nova: "Javelin Hurl (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "Draconic; understands Common but doesn't speak it" -> "Common, Draconic" (sapient)
[reskin] print canon languages: "Common, Draconic" -> "Common, Draconic" — the Gladiator's plus the concept's Draconic
[reskin] print canon: chassis row leaves — Actions/"Javelin Hurl (Recharge 5-6)" is the seat's nova, not the Gladiator's
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Shield Bash" leaves with the shield — a greataxe is two-handed and print pairs a shield with no heavy melee weapon (0 of 329 gear lines)
[reskin] multiattack replacement clause: It can replace one attack with a use of Marsh-Quaking Roar.
[reskin] ask vs row ok: "Wields a greataxe two-handed" -> "Great Weapon Master" — limit at_will
[reskin] ask vs row ok: "a javelin for the throw" -> "Javelin" — limit at_will
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] user-set: HP 136 -> 120 — a declared field (Resolution 3)
[reskin] species kit: Swim 30 ft. — a lizardfolk's own
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Garrison Sellsword — in the run

**Concept:** a sellsword who hurls a handaxe and closes with a shortsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Garrison Sellsword | 5 (2014) | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 6 → 4.5; sustained 30 (3 × Handaxe); nova Thrown Handaxe 28; dmg 39

```
Garrison Sellsword
Medium humanoid, neutral
Armor Class

15 (chain shirt)

Hit Points: 

97 (13d8 + 39)

Speed: 

30 ft.

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

Senses: 

passive Perception 15

Languages: 

Common

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Cheapest Contract. During the first round of each combat, the sellsword has advantage on attack rolls against any creature that hasn't taken a turn. If the sellsword hits a creature during that round, the target takes an extra 5 (1d10) slashing damage.
Steady Footing. The sellsword ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, the sellsword takes the Dash or Disengage action.

Actions
Multiattack: The sellsword makes three attacks, using Handaxe or Shortsword.
Handaxe: Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 10 (2d6 + 3) slashing damage, and the sellsword has advantage on its next attack roll against the target before the end of its next turn.
Shortsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage. Immediately after the attack, a handaxe returns to the sellsword's grasp, and the sellsword has advantage on its next attack roll against the target before the end of its next turn. If the target is a Large or smaller creature, it is pulled up to 10 feet straight toward the sellsword.
Thrown Handaxe (Recharge 5-6): The sellsword hurls a handaxe at a point it can see within 90 feet. Each creature in a 5-foot-radius sphere centered on that point must make a DC 15 Dexterity saving throw, taking 28 (8d6) slashing damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone if it is a Large or smaller creature.
```

**Where each row came from**

- Traits/Cheapest Contract — template assassinate; library draw (seed unstamped)
- Traits/Steady Footing — the chassis
- Actions/Multiattack — the chassis
- Actions/Handaxe — authored for this sheet; a named part; a declared feature; the GM's clause "hurls a handaxe"; weapon handaxe
- Actions/Shortsword — authored for this sheet; a named part; a declared feature; the GM's clause "closes with a shortsword"; weapon shortsword
- Actions/Thrown Handaxe — the chassis
- Bonus Actions/Fleet Agility — the chassis

**Engine trace**

```
[path] homebrew — "a sellsword who hurls a handaxe and closes with a shortsword" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-hurler: ✓ ("hurls a handaxe") | skirmisher-hurler: key "hurls" (class verb)
[concept] hints: hurler→style ✓ ("hurls a handaxe and closes")
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/forged mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: hurled handaxe before closing [behavior] | shortsword drawn for close work [object] | drilled, mercenary patience under pressure [behavior]
[concept] identity: A scar-handed sellsword who opens every fight by flinging a handaxe across the gap, then strides in behind the throw with shortsword already drawn, using the moment of flinch and dodge to close to blade range. Each round it alternates: a hurled edge to keep foes cowed and bleeding at distance, then a shove forward into shortsword work until it is toe-to-toe. Bloodied, it does not break — it gets colder, backing off a step only to reload its throw and pick the weakest target, treating the fight as a contract to be finished rather than a duel to be enjoyed.
[concept] lore: A professional blade-for-hire from the frontier garrisons, this sellsword fights the way it was drilled: soften the line with thrown steel, then sell the close work at a price. It wants the fight over and the purse paid, so it measures every foe for how little risk it can spend.
[reskin] nova capped: "Hurled Burst" 31 → 28 (the chassis nova obeys the cap: 28 at CR 5)
[reskin] donor: skirmisher-8-hurler -> CR 5 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher would have said twist Warrior Veteran)
[reskin] named parts: Handaxe (slot), Shortsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the sellsword" — the call's own answer (kind), built from the name
[reskin] inline form: "the sellsword" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a sellsword" -> has (descriptive), head | "hurls a handaxe" -> has (mechanical) [asked: attack] | "closes with a shortsword" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — thrown-burst-seed, phase-slip, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When the sellsword's thrown handaxe forces a foe to duck or flinch, it uses that moment to stride straight in and sell the close work — the target's scrambling dodge lets the sellsword close the distance and put steel on it before it recovers. This only works against a foe it just hit with a thrown handaxe, the instinct drilled from years of 'throw, then take the gap.'" [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, bolt-drag (+ shelf: snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] closest accepted: action — the call refused every template but named "hook-rider" as nearest; it lands rather than the row being dropped (what it wanted: lets the sellsword move toward the target it just hit and then strike it, a repo)
[reskin] pick kept on the GM's own words: action — "hook-rider" has no key-table verb, but the call quotes "a sellsword who hurls a handaxe and closes with a shortsword" from the description
[reskin] signature rider: hook-rider -> Shortsword (appended; The idea is a rider that lets the sellsword close in after a thrown handaxe hits [shape fit, no verb match])
[reskin] signature idea (trait): "The sellsword reads every foe like a ledger line — the weakest, most wounded target gets its hurled steel first, because a professional finishes the cheapest contract before the hardest one. It never wastes a throw on the healthiest body in the room." [trait/always/damage] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] closest accepted: trait — the call refused every template but named "assassinate" as nearest; it lands rather than the row being dropped (what it wanted: the creature picks out the most wounded foe and directs its ranged attacks at th)
[reskin] free signature row: trait — "assassinate" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Cheapest Contract" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): assassinate -> Traits/"Cheapest Contract" ("The sellsword reads every foe like a ledger line — the weakest, most wounded target gets its hurled steel first, because a professional finishes the cheapest co [shape fit, no verb match]")
[reskin] weapons answered: Shortsword = shortsword; Handaxe = handaxe; Hurled Drums = handaxe; Hook and Heave = none
[reskin] chassis nova: "Hurled Drums (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] on-hit extra retyped: "Cheapest Contract" adds Slashing, not Piercing — the hit's own type (Handaxe)
[reskin] name-canon stands down: the path answered homebrew on "a sellsword who hurls a handaxe and clos" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Cheapest Contract" [trait/always/damage]
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Cheapest Contract")
audit finding below confidence gate: Cheapest Contract The trigger references a creature that hasn't taken a turn in the first round of combat, a state that is not stable across initiative (a creature can have taken its turn or not depending on the order), and the extra-damage clause applies if the sellsword hits a creature during that round without requiring the hit to be against a creature that hasn't taken a turn, decoupling the two conditions.
[reskin] audit rename: "Hurled Drums (Recharge 5-6)" -> "Thrown Handaxe (Recharge 5-6)"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] lets the sellsword move toward the target it just hit and then strike it, a repositioning follow-up rather than pulling  — "When the sellsword's thrown handaxe forces a foe to duck or flinch, it uses that moment to stride straight in and sell the close work — the target's scrambling dodge lets the sellsword close the distance and put steel on it before it recovers. This only works against a foe it just hit with a thrown handaxe, the instinct drilled from years of 'throw, then take the gap.'" — Garrison Sellsword [seat: action [rider/on_hit/movement]] (closest offered: hook-rider) [effect: movement] [menu: affliction contagion stunning-strike charge-push hook-rider pounce isolation bolt-mark bolt-drag throw-retrieve disarm second-wind focus feint-slip] [same-cell unoffered: none] [same-seat rejected: snatch:legality bolt-restrain:role charge:style] [landed: hook-rider]
[reskin] [gap] the creature picks out the most wounded foe and directs its ranged attacks at that target rather than the healthiest one — "The sellsword reads every foe like a ledger line — the weakest, most wounded target gets its hurled steel first, because a professional finishes the cheapest contract before the hardest one. It never wastes a throw on the healthiest body in the room." — Garrison Sellsword [seat: trait [trait/always/damage]] (closest offered: assassinate) [effect: damage] [menu: adhesive phobia terrain-walk aberrant-ground faultless-tracker web-walker bloodied-fury uncanny-sense berserk shielded-mind evasion relentless-pursuit bound marking-light guarded-stance undead-fortitude mimicry truth-aura gaze-aura assassinate blurred-form death-burst bloodied-burst] [same-cell unoffered: throw-retrieve own-turn-punisher coating] [same-seat rejected: false-appearance:legality spider-climb:legality earth-glide:legality tunneler:legality sealed-body:role] [landed: assassinate]
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Brother Halric — in the run

**Concept:** name: Brother Halric | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Brother Halric | 3 (2014) | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 3 → 1.625; sustained 22 (2 × Radiant Flame); nova none; dmg 22

```
Brother Halric
Medium humanoid, neutral
Armor Class

13 (chain shirt)

Hit Points: 

38 (7d8 + 7)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

10 (+0)

	

12 (+1)

	

13 (+1)

	

16 (+3)

	

13 (+1)

Skills: 

Medicine +7, Perception +5, Religion +5

Saving Throws: 

INT +3, WIS +5

Senses: 

passive Perception 15

Languages: 

Common plus one other language

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Searing Brand. A creature Halric damages sheds dim light in a 5-foot radius until the end of Halric's next turn and can't benefit from being invisible while it does.
Divine Aid (3/Day). As a bonus action, Halric casts bless, dispel magic, healing word, or lesser restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame. It can replace one attack with a use of Clinging Sermon.
Spellcasting: Halric casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 13): -

At will: light, thaumaturgy

1/day each: spirit guardians
Clinging Sermon: One creature within 60 feet of Halric must succeed on a DC 13 Dexterity saving throw or, until the end of Halric's next turn, shed dim light in a 10-foot radius, be unable to benefit from being invisible, and grant advantage on attack rolls against it.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Spellcasting — print's own row
- Actions/Clinging Sermon — template reveal; library draw (seed unstamped); binds the GM's words: glow
- Actions/Radiant Flame — print's own row
- Actions/Mace — print's own row; weapon mace
- Bonus Actions/Divine Aid — cleric kit; the GM's clause "Brother"
- Traits/Searing Brand — template marking-light; library draw (seed unstamped); binds the GM's words: burning mark

**Engine trace**

```
[path] class_npc — class cleric — "Brother" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "Brother Halric" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("Brother Halric") | caster-warpriest: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid themes=armed/fiendish mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Brother Halric"
[concept] mechanics: none claimed
[concept] signature elements: armored war-priest who fights with mace and battle-prayers [behavior] | holy fire that clings to his iron weapon [body] | an aura of scorching conviction he preaches into [aura]
[concept] identity: Brother Halric is a mailed preacher who opens with a leveled mace blow trailing sacred fire, then works the room — striking, backing off to invoke a war-prayer, and striking again — so the fight becomes a grinding sermon he intends to finish. Under pressure he does not flee: he plants himself, trades blows openly, and answers wounds with louder invocations, treating pain as proof of his cause.
[concept] lore: Halric was a parish battle-priest whose crusade outlived its god; he now walks the roads in armor still warm with a fire no altar answers, seeking a congregation he can convince — or convert — before the flame inside him gutters.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the cleric stands on the Priest — the class's own print block, nearest CR 3
[reskin] print canon route: the Priest's body outranks the warpriest seat — no verb in the words names it; the plain caster line
[reskin] print canon defenses: HP 58 -> 38, AC 12 -> 13 — the Priest's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 13 (chain shirt) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 16, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's at its own CR; attack +4 -> +5, DC 13 (print's)
[reskin] donor: caster-6 -> CR 3
[reskin] [path] decides: class_npc on the Priest · class cleric (the matcher would have said homebrew)
[reskin] print canon: "Brother Halric" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: cleric — "Brother": Divine Aid (3/Day) (Priest/Divine Aid)
[reskin] proper noun: "Brother Halric" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Halric" — the call's own answer (person), built from the name; the rules would have said "the brother"
[reskin] inline on kit rows: "the brother" -> "Halric"
[reskin] inline form: "Halric" — the model's own reading of the name
[reskin] control spell gated to daily — Bestow Curse (level 3 control at will is print's CR 13+ shape; at CR 3 it is 1/Day)
[reskin] spell DC coherence: DC 13 -> 11 off Intelligence 13 (print's array stays)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Brother Halric" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Halric swings his mace and the sacred fire still clinging to it leaps across to a foe he recently struck, so his sermon spreads from one target to the next. The fire only jumps from someone he has already hit this fight, and each new body it touches gives off the same warm glow he carries in his armor." [rider/on_hit/damage] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally)
[reskin] closest accepted: action — the call refused every template but named "reveal" as nearest; it lands rather than the row being dropped (what it wanted: lets the effect jump from a creature already struck this fight to one nearby cre)
[reskin] seat takes its clause: "Clinging Sermon (2/Day)" answers "Halric" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: reveal -> Actions/"Clinging Sermon (2/Day)" ("The idea is a chained fire leap from an already-struck foe to a new target — spr [verb: glow:idea]")
[reskin] signature idea (trait): "The holy fire never leaves his iron. Whenever Halric strikes with his mace, the wound keeps smoldering and he can lean on that burning mark to steady his next prayer or swing, feeding off the pain he has already dealt." [trait/always/damage] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, assassinate (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] free signature row: "Searing Brand" — the trait seat cannot quote the GM, but the call names the element it expresses: "holy fire that clings to his iron weapon". Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Searing Brand" answers "Halric" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): marking-light -> Traits/"Searing Brand" ("Striking with the mace leaves a wound that keeps smoldering — a burning mark on  [verb: burning mark:idea]")
[reskin] weapons answered: Heavy Mace = heavy mace
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Radiant Flame — the Priest's own ranged row, added (the chassis carried none to rename)
[reskin] print canon row: Actions/Mace — the Priest's own melee row, added (the chassis carried none to rename)
[reskin] print canon multiattack: "Halric makes two attacks, using Mace or Radiant Flame in any combination." — the Priest's own
[reskin] print canon skills: "Arcana +3, Perception +5" -> "Medicine +7, Perception +5, Religion +5" — the Priest's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Heavy Mace" — the Priest prints no row for it and no path stage claimed it
[reskin] print canon: chassis row leaves — Reactions/"Protective Magic (3/Day)" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] dead control row: "Clinging Sermon" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Clinging Sermon.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Searing Brand" [trait/always/condition]
[reskin] element claim revoked: "Searing Brand" claims "holy fire that clings to his iron weapon" but the audit returned no verdict for this row; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Searing Brand")
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 13 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] lets the effect jump from a creature already struck this fight to one nearby creature, applying the same glowing mark to — "Halric swings his mace and the sacred fire still clinging to it leaps across to a foe he recently struck, so his sermon spreads from one target to the next. The fire only jumps from someone he has already hit this fight, and each new body it touches gives off the same warm glow he carries in his armor." — Brother Halric [seat: action [rider/on_hit/damage]] (closest offered: reveal) [effect: condition] [menu: bolt-restrain bolt-drag bolt-mark seal lure herd reveal rally] [same-cell unoffered: isolation charge] [same-seat rejected: affliction:role contagion:role stunning-strike:role charge-push:role hook-rider:role pounce:role isolation:role snatch:role charge:role] [landed: reveal]
[reskin] 2014 conversion: one lint-gated call — both printings saved
```

