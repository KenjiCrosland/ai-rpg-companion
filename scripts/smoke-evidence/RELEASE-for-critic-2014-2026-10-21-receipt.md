# Release table for the critic — 2014 blocks — 2026-10-21

The case is at the top of the 2024 file (RELEASE-for-critic-2024-2026-10-21-receipt.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

## Review batch — sweep-2026-10-21T22-17-49

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Bog Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/4 |
| Owlbear | 3 (2014) | 2014 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Knell Warden | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/8 |
| Air Elemental | 5 | 2024 | lurker-5 | ok | ok | FAIL: two-novas | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 5/5 |
| Scree Slide Thing | 5 (2014) | 2014 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 0/4 |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Siege-Timber Golem | 8 | 2024 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 6/6 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Drowned Choir | 10 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | FAIL: condition-duration | ok | ok | FAIL (1) | 1/1 | 4/5 |
| Vampire | 13 (2014) | 2014 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 9/9 |
| Plague Archon | 13 | 2024 | skirmisher-13-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | FAIL: duplicate-mechanic | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 5/5 |
| Rimeheart Stalker | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | FAIL: two-novas | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 5/6 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | FAIL: control-aoe-ungated | ok | ok | SOFT: print-rows | ok | FAIL: name-mechanic | ok | FAIL (2) | 0/1 | 10/10 |
| Brass Tyrant | 17 | 2024 | defender-17-leader | ok | SOFT: aim-dpr, hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 7/8 |
| Pit Fiend | 20 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 10/10 |
| Bone Sun Lich | 20 (2014) | 2014 | caster-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 11/11 |
| Ancient Gold Dragon | 24 (2014) | 2014 | — | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | — | — |
| Trench Antiphon | 24 | 2024 | brute-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 0/7 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Vashka the Red | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/2 | 5/5 |
| Thresher of the Dead Hive | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/5 | 4/4 |
| Iron Oath Sentinel | 11 (2014) | 2014 | defender-7-warden | ok | user-set: AC 20 · reads CR 9 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 3/3 | 7/7 |
| Merebog Yaga | 7 | 2024 | caster-8-binder | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 4/6 |
| Renounced Templar | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Ilvareth Dusksong | 12 (2014) | 2014 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Swarm of Tolling Revenants | 13 | 2024 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Sanctum Rot | 9 (2014) | 2014 | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 0/6 |
| Thunderwall Drake | 7 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Old Quarry | 9 (2014) | 2014 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/3 |
| Elder Scalesheen | 5 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/7 |
| Krennik Skullstandard | 4 (2014) | 2014 | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/5 |
| Well Drownedthing | 5 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 0/3 |
| Klahk | 4 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 10/12 | 5/5 |
| Meshrin | 8 (2014) | 2014 | skirmisher-8-hurler | ok | user-set: AC 16, HP 120 · reads CR 6.5 | SOFT: lint:hp-formula | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (2) | 7/7 | 7/7 |
| Greatsword Skeleton | 6 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Toll-Road Sellsword | 5 (2014) | 2014 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/5 |
| Brother Halric | 3 (2014) | 2014 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |

**Dropped 15 of 67 user clauses** (coverage 78%); concept share 86% (187/218 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- lurker-5 / structure: 1
- lurker-5-phantom / adjudicability: 1
- brute-13 / structure: 1
- brute-9-juggernaut / structure: 1
- dragon-15 / gates: 1
- dragon-15 / reader: 1



---


### Bog Hound — a 2014 sheet

**Concept:** a mud-caked bog hound that drags fishermen under

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bog Hound | 1 (2014) | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "drags fishermen under"
- read: def 0 / off 1 → 0.5; sustained 10 (2 × Jaws); nova none; dmg 10

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

Faultless Tracker. The bog hound knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.
Whelm. As a bonus action, the bog hound whelms one Medium or smaller creature it is grappling. While whelmed, the target is blinded and restrained, has total cover against attacks and other effects outside the bog hound, and takes 3 (1d6) bludgeoning damage at the start of each of the bog hound's turns. The bog hound can have only one creature whelmed at a time. If the bog hound takes 5 damage or more in a single turn from the whelmed creature, the bog hound must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the bog hound. If the bog hound dies, a whelmed creature pulls free prone by using 5 feet of movement.

Actions
Multiattack: The bog hound makes two Jaws attacks. It can replace one attack with a use of Muck Drag.
Jaws: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained.
Muck Drag: One creature within 30 feet that is grappled by the bog hound must make a DC 13 Strength saving throw, taking 11 (2d10) piercing damage on a failed save, or half as much damage on a successful one.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Jaws — the chassis
- Actions/Muck Drag — template exploiter; library draw (seed unstamped); binds the GM's words: downed+caught
- Bonus Actions/Whelm — binds the GM's words: whelm+swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon
- Traits/Faultless Tracker — template faultless-tracker; library draw (seed unstamped); binds the GM's words: hound

**Engine trace**

```
[path] homebrew — "a mud-caked bog hound that drags fishermen under" (call)
[route] brute-grappler type=Beast mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "drags fishermen under" | brute-grappler: ✓ ("drags fishermen under") | brute-grappler: no line key in the words — the model's read of its quote
[concept] mind promoted to sapient — the identity asserts performance/taunting
[concept] hints: engulf→mechanics ✓ ("drags fishermen under")
[concept] resolve: archetype=brute type=Beast themes=bestial/aquatic mind=sapient style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: jaw-locked drag toward deep water [behavior] | mud-caked bog hound's hide [body] | ambush from the shallows [behavior]
[concept] identity: A low, mud-slick hound that rushes from the shallows to clamp its jaws into a fisherman's leg and drags backward toward deep water, using its own bog-caked bulk as an anchor. Every round it holds and worries its catch, hauling the victim deeper and lower until the water does the killing; it does not toy with prey but will abandon a grip and melt back into the muck when badly bloodied.
[concept] lore: Born wherever drowned men and river silt settle, the bog hound haunts shallow margins waiting for a lone fisherman's footing to slip, because it can only feed on what it pulls beneath the surface.
[reskin] donor: brute-5-grappler -> CR 1
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] engulf engine: Whelm — the body's own verb
[reskin] engine interior scaled — CR 1 sits below the brute-5-grappler seat
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the bog hound" — the call's own answer (kind), built from the name
[reskin] inline form: "the bog hound" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a mud-caked bog hound" -> has (descriptive), head | "drags fishermen under" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "While it has a creature in its jaws, the hound hauls backward and down toward the nearest deeper water, dragging its catch with it. Onlookers who try to pull the victim free or stand in the way find themselves caught in the same churned muck and foul footing, so the rescue turns into a second struggle." [action/always/movement] — menu: swallow, shield-bash, active-toll, spew, herd, thrown-burst-seed, drain, wind-up, exploiter, zone-seed (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, feint-slip, contagion, charge-push, pounce)
[reskin] closest accepted: action — the call refused every template but named "exploiter" as nearest; it lands rather than the row being dropped (what it wanted: moves the grappled victim (and any rescuer who intervenes) to a forced location,)
[reskin] value check: "Muck Drag" EV 8.5 vs floor 7.8 (one attack of 2) — dice 5 → 6; priced at the floor: dice 6 → 11
[reskin] signature template: exploiter -> Actions/"Muck Drag" ("The idea is a drag toward deep water that pulls rescuers into the same struggle, [verb: downed:idea, caught:idea]")
[reskin] signature idea (trait): "Its hide is packed with river muck and drowned-silt that stays slick and clings. Anything that grabs, pins, or strikes it up close comes away fouled and off-balance for a moment, and the ground where it has lain stays treacherous." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog, mud)
[reskin] word match declined by the call: terrain-walk, aberrant-ground, noxious-aura, heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "heated-body" as nearest; it lands rather than the row being dropped (what it wanted: applies a condition to a creature that hits or grapples it, not damage or a terr)
[reskin] free signature row: trait — "heated-body" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "mud-caked bog hound's hide" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] trait declined: "Silt-Slick Hide" — no receipt, and this sheet's free-row allowance (1) is spent (1d: a receipt decides credit, not existence)
[reskin] concept-first trait skipped: terrain-walk — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] trait bound to the concept's verb (concept-first): faultless-tracker — hound in the user's words; the idea path had nothing
[reskin] signature template (trait): faultless-tracker -> Traits/"Faultless Tracker" ("exact concept match [verb: hound:concept]")
[reskin] weapons answered: Jaws = none; Mire Weight = none
[reskin] languages held: None stands — INT 4 on a Beast speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "a mud-caked bog hound that drags fisherm" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Muck Drag.
audit finding below confidence gate: Whelm No action or bonus-action cost is given for Whelm as an activity—the section header implies it, but the entry itself states no timing trigger for when the whelming begins or what the hound spends.
audit finding below confidence gate: Jaws The Restrained condition is granted to any grappled target with no separate end condition of its own; it terminates only when the grapple ends, but the entry never states that linkage, leaving Restrained's duration undefined beyond 'while Grappled.'
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] moves the grappled victim (and any rescuer who intervenes) to a forced location, tugging creatures out of their space to — "While it has a creature in its jaws, the hound hauls backward and down toward the nearest deeper water, dragging its catch with it. Onlookers who try to pull the victim free or stand in the way find themselves caught in the same churned muck and foul footing, so the rescue turns into a second struggle." — Bog Hound [seat: action [action/always/movement]] (closest offered: exploiter) [effect: movement] [menu: swallow shield-bash active-toll spew herd thrown-burst-seed drain wind-up exploiter zone-seed] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: throw-retrieve:legality] [landed: exploiter]
[reskin] [gap] applies a condition to a creature that hits or grapples it, not damage or a terrain effect — "Its hide is packed with river muck and drowned-silt that stays slick and clings. Anything that grabs, pins, or strikes it up close comes away fouled and off-balance for a moment, and the ground where it has lain stays treacherous." — Bog Hound [seat: trait [trait/on_being_hit/condition]] (closest offered: heated-body) [effect: condition] [menu: terrain-walk heated-body absorption bloodied-burst resonant-body weapon-lodge aberrant-ground noxious-aura] [same-cell unoffered: none] [same-seat rejected: none] [VETOED AFTER ACCEPTANCE: heated-body never reached the sheet]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — the seat shipped a fallback or nothing
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Owlbear — a print donor

**Concept:** name: Owlbear | that has learned to climb

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 (2014) | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
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

Wall Clamber. The owlbear can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The owlbear makes two Rend attacks. It can replace one attack with a use of Pouncing Lunge.
Rend: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.
Pouncing Lunge: The owlbear spends 5 feet of movement to jump to a space within 15 feet that contains one or more Large or smaller creatures. Each creature in the destination space must make a DC 15 Dexterity saving throw, taking 22 (5d8) slashing damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone. On a successful save, the target is pushed 5 feet straight away.
```

**Where each row came from**

- Actions/Multiattack — print's own row
- Actions/Rend — print's own row, renamed
- Actions/Pouncing Lunge — template leap; library draw (seed unstamped)
- Traits/Wall Clamber — template spider-climb; library draw (seed unstamped); the GM's clause "has learned to climb"; binds the GM's words: climb+climbs+climbing+walls+wall+cling

**Engine trace**

```
[path] twist — Owlbear (is) — "Name field: Owlbear" (code)
[route] brute type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("Owlbear") | brute: no line key in the words — the model's read of its quote
[concept] name: "Owlbear" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/grasping mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: none claimed
[concept] signature elements: climbing pursuit up walls and cliffs [behavior] | hooked climbing claws and crushing beak [body] | feathered owlbear hide [body]
[concept] identity: A climbing owlbear opens by scaling the arena's walls, trees, or pillars to drop onto prey from above, using its hooked forelimbs to grip stone and trunk alike. Once grounded it stays locked in close quarters, raking with those same climbing claws and crushing with its beak, refusing to yield ground. It fights to the death rather than flee, its predatory patience replaced by a cornered animal's relentless fury.
[concept] lore: An owlbear that survived its first winters in a cliff-cut valley learned to hunt up the rock faces, and its cubs now inherit the knack — a breed of climbers that treats every wall as a road to dinner.
[reskin] print canon defenses: HP 58 -> 59, AC 10 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +4 -> +7, DC 15 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] [path] decides: twist on the Owlbear (the matcher agrees)
[reskin] print canon: "Owlbear — that has learned to climb" heads on the Owlbear — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the owlbear" — the call answered "the owlbear" (kind), which the name does not support
[reskin] inline form: "the owlbear" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Owlbear —" -> has (descriptive), head | "has learned to climb" -> has (mechanical) [asked: movement]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The owlbear launches itself up a vertical surface in a single hooked lunge, driving its climbing claws into stone, bark, or pillar to haul itself high — then throws its whole weight back down onto a foe beneath it. The target is knocked off its feet and pinned under the beast, with the owlbear landing astride it still clinging and crushing." [action/always/movement] — menu: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, obstacle-pull, slow-bolt, disarm, zone-seed (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, feint-slip, affliction, contagion, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: obstacle-pull — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "leap" has no key-table verb, but the call quotes "owlbear that has learned to climb" from the description
[reskin] seat takes its clause: "Pouncing Lunge" answers "has learned to climb" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: leap -> Actions/"Pouncing Lunge" ("launches itself up a vertical surface in a single hooked lunge ... then throws i [shape fit, no verb match]")
[reskin] signature idea (trait): "Wherever it can dig those hooked foreclaws into a surface — cliff face, tree trunk, cracked masonry — the owlbear simply climbs, clinging to the wall with no effort and never losing its grip on prey it has already seized." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — spider-climb (climb, climbs, climbing)
[reskin] signature template (trait): spider-climb -> Traits/"Wall Clamber" ("the owlbear digs its hooked foreclaws into cliff face, tree trunk, or cracked ma [verb: climb:concept, climbs:concept, climbing:concept, walls:idea, wall:idea, cling:idea]")
[reskin] weapons answered: Claw = none; Crushing Beak = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "the owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon skills: "Athletics +7, Perception +3" -> "Perception +5" — the Owlbear's own skills, each derived from this sheet's stat and PB
[reskin] multiattack replacement clause: It can replace one attack with a use of Pouncing Lunge.
[reskin] row binds its clause: "Wall Clamber" answers "has learned to climb" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Adult Red Dragon — a legendary

**Concept:** name: Adult Red Dragon | blind in one eye from an old lance

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Adult Red Dragon | 17 (2014) | dragon-15 | ok | ok | ok | FAIL: control-aoe-ungated | ok | ok | SOFT: print-rows | ok | FAIL: name-mechanic | ok |

- gates · fail · control-aoe-ungated: Actions/Come Hither: at-will multi-target control, no damage, no gate, and nothing traded for it — print's 13 breaths of this shape all cost an attack
- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Sight Weakness
- reader · fail · name-mechanic: Traits/Blindside Lash: the name promises the Blinded condition the text lacks
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

Blindside Lash. A creature that touches the dragon or hits it with a melee attack while within 5 feet of it takes 10 (3d6) fire damage.
Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead.
Sight Weakness. The dragon has disadvantage on Wisdom (Perception) checks that rely on sight.

Actions
Multiattack: The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray.
Rend: Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 13 (1d10 + 8) slashing damage plus 5 (2d4) fire damage.
Spellcasting: The dragon casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 20, +12 to hit with spell attacks): -

At will: command, detect magic, scorching ray

1/day each: fireball
Come Hither: Each creature of the dragon's choice within 90 feet that can see or hear the dragon must succeed on a DC 20 Wisdom saving throw or be charmed until the start of the dragon's next turn, and while charmed this way, it must move toward the dragon by the safest available route on its turn and can't take reactions.
Fire Breath (Recharge 5-6): Each creature in a 60-foot cone must make a DC 21 Dexterity saving throw, taking 59 (17d6) fire damage on a failed save, or half as much damage on a successful one.
Legendary Actions

The dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The dragon regains spent legendary actions at the start of its turn.

Commanding Presence: The dragon uses Spellcasting to cast command (cast at 2nd level). The dragon can't take this action again until the start of its next turn.
Fiery Rays: The dragon uses Spellcasting to cast scorching ray. The dragon can't take this action again until the start of its next turn.
Pounce: The dragon moves up to half its speed, and it makes one Rend attack.
```

**Where each row came from**

- Traits/Blindside Lash — template heated-body; library draw (seed unstamped)
- Traits/Legendary Resistance — the chassis
- Traits/Sight Weakness — the chassis
- Actions/Multiattack — the chassis
- Actions/Rend — print's own row, renamed
- Actions/Spellcasting — print's own row
- Actions/Come Hither — template lure; library draw (seed unstamped)
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
[concept] resolve: archetype=dragon type=Dragon themes=draconic/breath mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Adult Red Dragon"
[concept] mechanics: breath
[concept] signature elements: a blinded eye from an old lance [body] | one-eyed grudge that forbids retreat [behavior] | fire that covers the blind side [body]
[concept] identity: An old adult red dragon whose ruined left eye makes every approach a blind spot it covers with fire — it opens with its frightful presence and a sweeping breath line that forces prey to choose between cover and the side it can't see. Every round after, it flies wide arcing passes to keep the blind side turned away from the thickest threat, then crashes down to seize and crush whatever survives, tail-lashing the flank it can't watch. It does not flee; cornered and bloodied, it fixes its good eye on the one who took its eye long ago and fights to the death rather than lose the other.
[concept] lore: It once held a mountain pass until a knight's lance found its eye, and now it hunts that same pass for the lance's mate, hoarding the one-eyed grudge as fiercely as its gold.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] print canon defenses: HP 256 -> 256, AC 20 -> 19 — the Adult Red Dragon's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 27, DEX 10, CON 25, INT 16, WIS 13, CHA 23 — the Adult Red Dragon's at its own CR; attack +10 -> +14, DC 21 (print's)
[reskin] donor: dragon-15 -> CR 17
[reskin] [path] decides: twist on the Adult Red Dragon (the matcher agrees)
[reskin] print canon: "Adult Red Dragon — blind in one eye from an old lance" heads on the Adult Red Dragon — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Sweeping Tail" promises a tail but the row makes a Bite attack — name the delegation honestly, or without anatomy
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the dragon" — the call answered "the dragon" (kind), which the name does not support
[reskin] inline form: "the dragon" — the model's own reading of the name
[reskin] spell DC coherence: DC 19 -> 20 off Charisma 23 (print's array stays)
[reskin] save dc derived: DC 19 -> 20 (8 + PB 6 + Charisma's 6) — no stat on the sheet reached it
[reskin] lacks asked: "blind in one eye"
[reskin] clauses: "Adult Red Dragon — blind in one eye from an old lance" -> LACKS (mechanical)
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, exploiter, sensory-strike, zone-seed, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, feint-slip, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The dragon fixes its good eye on one foe and refuses to let it slip away — while that quarry runs from the dragon, the dragon's pursuit never falters and its jaws find the mark even at a dead sprint. The mark lasts until the quarry stands its ground and fights back, which is the only thing that breaks the gaze." [action/always/movement] — menu: snare, condition-payoff, execute, throw-retrieve, seal, shield-bash, lure (+ shelf: lay-on-hands, second-wind, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — throw-retrieve, charge (lance)
[reskin] word match declined by the call: throw-retrieve, charge — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "lure" as nearest; it lands rather than the row being dropped (what it wanted: marks one quarry, punishes it for fleeing and ends only when it stands and fight)
[reskin] pick kept on the GM's own words: action — "lure" has no key-table verb, but the call quotes "adult red dragon blind in one eye from an old lance" from the description
[reskin] seat takes its clause: "One-Eyed Grudge" answers "Adult Red Dragon — from an old lance" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: lure -> Actions/"One-Eyed Grudge" ("The dragon fixes its good eye on one foe and refuses to let it slip away — while that quarry runs from the dragon, the dragon's pursuit never falters and its ja [shape fit, no verb match]")
[reskin] signature idea (trait): "Its blinded left side is a dead zone it has learned to punish: when a creature it cannot see strikes it from there, the dragon whirls and answers with a lash of its tail, so the blind flank is never a safe place to stand." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, blurred-form, death-burst)
[reskin] verb gate stands down: trait — no template shares a verb, but "Adult Red Dragon — from an old lance" is a clause the sheet has not answered; the GM's own words are the warrant
[reskin] closest accepted: trait — the call refused every template but named "heated-body" as nearest; it lands rather than the row being dropped (what it wanted: triggers only when hit by an attacker the dragon cannot see, and answers with an)
[reskin] free signature row: "Blindside Lash" — the trait seat cannot quote the GM, but the call names the element it expresses: "a blinded eye from an old lance". Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Blindside Lash" answers "Adult Red Dragon — from an old lance" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): heated-body -> Traits/"Blindside Lash" ("The idea wants a retaliation triggered by being struck from the dragon's blinded [shape fit, no verb match]")
[reskin] weapons answered: Bite = none; Fire Breath = none; Blindside Crush = none; Sweeping Tail = none; Flyby = none; Frightful Presence = none
[reskin] chassis nova: "Fire Breath (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] print canon alignment: Neutral Evil -> Chaotic Evil — the Adult Red Dragon's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Bite" -> "Rend" — the Adult Red Dragon's own row
[reskin] print canon multiattack: "the dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast *Scorching Ray*." — the Adult Red Dragon's own
[reskin] element immunity: Fire (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 -> 60
[reskin] dragon spell DC derived: 20 (8 + PB + Cha mod — the breath keeps the card DC)
[reskin] dragon mental save DC derived: "One-Eyed Grudge" -> 20 (the Frightful Presence class keys to Charisma)
[reskin] dragon mental save DC derived: "Frightful Presence" -> 20 (the Frightful Presence class keys to Charisma)
[reskin] immunities stamped for type: Dragon -> Fire
[reskin] print canon skills: "Perception +7, Stealth +6" -> "Perception +13, Stealth +6" — the Adult Red Dragon's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Fire Breath (Recharge 5-6)" is the seat's nova, not the Adult Red Dragon's
[reskin] print canon legendary: Commanding Presence, Fiery Rays, Pounce — the Adult Red Dragon's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Fire Breath (Recharge 5-6) — the Adult Red Dragon's own
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] audit rewrite blocked — "Commanding Presence" is engine-authored chassis text
[reskin] audit rewrite blocked — "Fiery Rays" is engine-authored chassis text
[reskin] audit rename: "One-Eyed Grudge" -> "Come Hither"
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] marks one quarry, punishes it for fleeing and ends only when it stands and fights — "The dragon fixes its good eye on one foe and refuses to let it slip away — while that quarry runs from the dragon, the dragon's pursuit never falters and its jaws find the mark even at a dead sprint. The mark lasts until the quarry stands its ground and fights back, which is the only thing that breaks the gaze." — Adult Red Dragon [seat: action [action/always/movement]] (closest offered: lure) [effect: condition] [menu: throw-retrieve charge snare condition-payoff execute seal shield-bash lure] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: zone-seed:role] [landed: lure]
[reskin] [gap] triggers only when hit by an attacker the dragon cannot see, and answers with an attack rather than static damage — "Its blinded left side is a dead zone it has learned to punish: when a creature it cannot see strikes it from there, the dragon whirls and answers with a lash of its tail, so the blind flank is never a safe place to stand." — Adult Red Dragon [seat: trait [trait/on_being_hit/damage]] (closest offered: heated-body) [effect: damage] [menu: heated-body absorption bloodied-burst resonant-body weapon-lodge] [same-cell unoffered: ward-retaliation snap-shot riposte] [same-seat rejected: none] [landed: heated-body]
[reskin] flaw row: "Sight Weakness" — "Adult Red Dragon — blind in one eye from an old lance" removed no row, so the absence costs the creature something instead (print's grammar: 11 of 329 blocks carry one; owner's ruling 1f)
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Scree Slide Thing — one marked soft

**Concept:** a quarry-pit thing of living scree that buries what it catches

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Scree Slide Thing [seed 1/2] | 5 (2014) | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 3 (print at 5 reads 2.5–9.5, n=25)
- read: def 2 / off 4 → 3; sustained 32 (2 × Rubble Slam); nova none; dmg 32

```
Scree Slide Thing
Large elemental, unaligned
Armor Class

13 (natural armor)

Hit Points: 

93 (11d10 + 33)

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

tremorsense 60 ft., passive Perception 13

Languages: 

None

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Grinding Shingle. The slide thing adheres to anything that touches it. A Huge or smaller creature adhered to the slide thing is also grappled by it (escape DC 14). Ability checks made to escape this grapple have disadvantage.
Entomb. As a bonus action, the slide thing entombs one Medium or smaller creature it is grappling. While entombed, the target is blinded and restrained, has total cover against attacks and other effects outside the slide thing, and takes 7 (2d6) bludgeoning damage at the start of each of the slide thing's turns. The slide thing can have only one creature entombed at a time. If the slide thing takes 15 damage or more in a single turn from the entombed creature, the slide thing must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the slide thing. If the slide thing dies, an entombed creature breaks free prone by using 5 feet of movement.
Rasping Rebuke. As a bonus action, the slide thing targets one creature within 5 feet that hit it with an attack since the end of the slide thing's last turn. The target takes 7 (2d6) bludgeoning damage.

Actions
Multiattack: The slide thing makes two Rubble Slam attacks.
Rubble Slam: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Rubble Slam — the chassis
- Bonus Actions/Entomb — the GM's clause "buries what it catches"; binds the GM's words: entomb+swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+cocoon+whelm
- Bonus Actions/Rasping Rebuke — library seed own-turn-punisher
- Traits/Grinding Shingle — template adhesive; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "a quarry-pit thing of living scree that buries what it catches" (call)
[route] brute-grappler type=Elemental mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "buries what it catches" | brute-grappler: ✓ ("buries what it catches") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental themes=elemental/subterranean mind=mindless style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: sliding wave of living scree that buries what it catches [behavior] | a churning body of tumbling broken stone [body] | the abandoned quarry pit it haunts [aura]
[concept] identity: A living scree-slide that waits beneath the quarry pit's lip, then surges up and over its prey as a wave of grinding shingle, opening the fight by burying a target under a mass of tumbling stone and pinning it against the pit floor. Every round after, it pours itself forward in slow, deliberate sheets of grinding rubble, rolling over fallen foes to smother and swallow them deeper into its own sliding body, and it never stops moving once roused — no retreat, no cunning, just an endless, remorseless avalanche that grinds itself against anything still struggling.
[concept] lore: Long after the quarrymen abandoned the cut, the heaps of broken rubble at the pit's bottom took on a slow, hungry life of their own and began to shift — it wants nothing but more stone, more earth, and anything it can bury beneath it.
[reskin] donor: brute-5-grappler -> CR 5
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] engulf engine: Entomb — the body's own verb
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the slide thing" — the call's own answer (kind), built from the name
[reskin] inline form: "the slide thing" — the model's own reading of the name
[reskin] save dc derived: DC 13, 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a quarry-pit thing of living scree" -> has (descriptive), head | "buries what it catches" -> has (mechanical) [asked: condition]
[reskin] signature idea (action): "The slide thing lurches forward in a wide, grinding sheet of rubble, pouring over everything in its path rather than striking one foe. Every creature caught in that sliding flood is dragged along with the tumbling stone, shoved across the ground and slammed into whatever lies in the wave's way, and the creature itself ends the surge wherever the wave finishes rolling, with the push carrying it fur" [action/save/movement] — menu: swallow, leap, condition-payoff, shield-bash, active-toll, random-ray, ground-burst, spew, burrow-ambush, herd, thrown-burst-seed, drain, wind-up, exploiter, seal, lure, pull-through, pacify, snare-bolt, slow-bolt (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, pounce)
[reskin] nova declined: "Grinding Surge" — a whole-round ability the GM never asked for: the call offered no quote, and the key table finds no verb either; the fallback stands in (the cauldron's spill, 2026-09-29)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 2.8 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The slide thing is never still; its body churns and tumbles constantly, so any creature that clings to it or presses against it is raked and ground by shifting shingle. Whenever something is close enough to be in contact with the living stone, the rubble grinds against it and wears it down." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, assassinate (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — aberrant-ground, terrain-walk, faultless-tracker (scree, quarry)
[reskin] word match declined by the call: terrain-walk, false-appearance, faultless-tracker, aberrant-ground, earth-glide — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "adhesive" has no key-table verb, but the call quotes "buries what it catches" from the description
[reskin] signature template (trait): adhesive -> Traits/"Grinding Shingle" ("Living scree that churns and tumbles constantly grinds and rakes anything clingi [shape fit, no verb match]")
[reskin] repair: 1 clause(s) with no row — "buries what it catches"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [{"clause":"buries what it catches","row":"Entomb"}], unplaced []
[reskin] clause already answered: "buries what it catches" is carried by "Entomb" in different words — the call read the sheet and declined to answer it twice
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Rubble Slam = none
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a quarry-pit thing of living scree that " and named no print body — no published trait lands on a word alone (owner's ruling)
audit finding below confidence gate: Entomb The release procedure branches across damage thresholds, end-of-turn timing, and forced prone exit, requiring the GM to track per-turn damage from a blinded creature and resolve a placement that isn't reconciled with the underlying grapple.
[reskin] audit rename: "Answering Sting" -> "Rasping Rebuke"
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Rasping Rebuke) — the sameness metric
[reskin] record reconciled: "Grinding Shingle" no longer imposes Grappled — the clause left, so the record goes with it
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Rimeheart Stalker — bands soft

**Concept:** a glacier's heart given legs, trailing a wake of killing cold

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Rimeheart Stalker | 15 (2014) | brute-9-juggernaut | ok | SOFT: band | FAIL: two-novas | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 12.5 (print at 15 reads 7–15, n=12)
- structure · fail · two-novas: two Recharge novas on one sheet: "Killing Cold" and "Threshold Execute"
- read: def 10 / off 15 → 12.5; sustained 68 (2 × Slam); nova Killing Cold 71; dmg 93

```
Rimeheart Stalker
Large elemental, unaligned
Armor Class

16 (natural armor)

Hit Points: 

209 (22d10 + 88)

Speed: 

30 ft., burrow 30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

8 (-1)

	

19 (+4)

	

6 (-2)

	

10 (+0)

	

4 (-3)

Skills: 

Athletics +8, Perception +5

Saving Throws: 

STR +8, CON +9

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

Rime Trailing. The ground within 10 feet of the stalker is difficult terrain.
Cold Absorption. Whenever the stalker is subjected to cold damage, it takes no damage and instead regains a number of hit points equal to the cold damage dealt.
Siege Monster. The stalker deals double damage to objects and structures.

Actions
Multiattack: The stalker makes two Slam attacks.
Slam: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage plus 13 (3d8) cold damage.
Killing Cold (Recharge 5-6): Each creature in a 30-foot cone must make a DC 17 Strength saving throw, taking 71 (13d10) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
Threshold Execute (Recharge 5-6): One creature the stalker can see within 90 feet that has half of its hit points or fewer must make a DC 17 Constitution saving throw. On a failed save, if the target has 32 hit points or fewer, it drops to 0 hit points; otherwise, it takes 32 (5d12) cold damage, or half as much damage on a successful save.
```

**Where each row came from**

- Traits/Rime Trailing — template aberrant-ground; library draw (seed unstamped); the GM's clause "trailing a wake of killing cold"; binds the GM's words: wake+slick+treacherous
- Traits/Cold Absorption — the chassis
- Traits/Siege Monster — the chassis
- Actions/Multiattack — the chassis
- Actions/Slam — the chassis
- Actions/Killing Cold — the chassis
- Actions/Threshold Execute — template execute; library draw (seed unstamped); the GM's clause "trailing a wake of killing cold"; binds the GM's words: kill

**Engine trace**

```
[path] homebrew — "a glacier's heart given legs, trailing a wake of killing cold" (call)
[route] brute-juggernaut type=Elemental mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a glacier's heart given legs") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental themes=elemental/terror mind=mindless style=juggernaut energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: glacier's heart made flesh given legs [body] | trailing wake of killing cold [aura] | implacable glacial advance that crushes what it walks through [behavior]
[concept] identity: A walking glacier-heart strides into battle and drags a channel of killing cold behind it — the ground it crosses frosts, cracks, and kills, so the fight is as much about the terrain it leaves as the fists it swings. Every round it simply advances and slams, letting its freezing wake and its glacial bulk do the work of herding and breaking prey. It never flees and never hurries; pressure only makes it grind forward harder, implacable as the ice it was born from.
[concept] lore: A glacier's heart torn from the ice and given legs by some deep-winter power, it walks south because it remembers being cold and wants everything else to be cold too.
[reskin] donor: brute-9-juggernaut -> CR 15
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Rimeheart = literal
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the stalker" — the call's own answer (kind), built from the name
[reskin] inline form: "the stalker" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 17 (8 + PB 5 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "glacier's heart" names no absence — nothing in it takes anything away
[reskin] clauses: "a glacier's heart given legs" -> has (descriptive), head | "trailing a wake of killing cold" -> has (mechanical) [asked: save_area]
[reskin] menu pruned: action — push-prone, thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The stalker grinds forward along the path it has already frozen, and the ground shrieks and splits into a blade of ice that runs ahead of it, turning the cold it has laid down into a single surging wave of freezing force that batters and drags at anything in its wake, shoving creatures with it as it advances and leaving them exposed on spoiled footing. Only the stretch it has already walked can pr" [action/always/movement] — menu: condition-payoff, shield-bash, burrow-ambush, escalating-dread, terror-pulse, herd, drain, exploiter, gaze-single, snare, execute, seal, lure, pacify (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, feint-slip, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — execute (kill)
[reskin] word match declined by the call: hook-rider, condition-payoff, burrow-ambush — the key word does not mean the mechanic here
[reskin] value check: "Killing Cold (1/Day)" EV 42.4 vs floor 54.1 (the whole Multiattack (2 attacks)) — added Success: Half; still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature re-slotted: "Killing Cold" moves to one attack of the Multiattack — EV 42.4 vs floor 16.6 there; the GM's verb keeps its row
[reskin] row renamed for uniqueness: "Killing Cold (Recharge 5-6)" collides with a row on the sheet — "Threshold Execute (Recharge 5-6)"
[reskin] signature template: execute -> Actions/"Threshold Execute (Recharge 5-6)" ("The template's concept verb is kill, which matches the user's phrase 'killing co [verb: kill:concept]")
[reskin] keys spent by the action: kill
[reskin] signature idea (trait): "Wherever it passes, the earth itself remembers the glacier: the ground it steps on thickens and rimes over, turning solid terrain into treacherous, slick ice that spreads out behind it and grips the feet of anything crossing it. The longer it walks a place, the wider the killing cold it leaves, so standing your ground only gets you deeper into its frozen country." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk, aberrant-ground, faultless-tracker (glacier, wake, trail)
[reskin] word match declined by the call: terrain-walk, faultless-tracker, heated-body, earth-glide, relentless-pursuit, tunneler — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "aberrant-ground" as nearest; it lands rather than the row being dropped (what it wanted: a wake of icy terrain that spreads out behind the creature as it moves and grips)
[reskin] signature template (trait): aberrant-ground -> Traits/"Rime Trailing" ("The idea is a spreading, persistent icy wake that turns the ground behind it tre [verb: wake:concept, slick:idea, treacherous:idea]")
[reskin] weapons answered: Slam = none
[reskin] chassis nova: "Killing Cold (Recharge 5-6)" — the brute-9-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] trait stripped: Traits/Immutable Form — a golem's trait on a Elemental
[reskin] defenses by material: a ice body is vulnerable to Fire and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] absorption re-keyed: Acid -> Cold (the donor organ obeys the concept energy)
[reskin] immunities stamped for type: Elemental -> Cold, Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a glacier's heart given legs, trailing a" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] threshold re-derived after the cap: Actions/Threshold Execute (Recharge 5-6) — 75 over the row's own 32 damage, so the kill branch beat the damage branch; threshold to 32
[reskin] row binds its clause: "Rime Trailing" answers "trailing a wake of killing cold" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Threshold Execute" answers "trailing a wake of killing cold" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] save stat from print grammar: Actions/Killing Cold imposes Prone by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] save re-derived after a retype: Actions/Killing Cold — a Constitution save for a condition the row IMPOSES, which calls for Strength or Dexterity (A2: a condition the row merely requires does not pick the stat)
[reskin] lint fixed: prone-duration — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a wake of icy terrain that spreads out behind the creature as it moves and grips creatures that cross it — "Wherever it passes, the earth itself remembers the glacier: the ground it steps on thickens and rimes over, turning solid terrain into treacherous, slick ice that spreads out behind it and grips the feet of anything crossing it. The longer it walks a place, the wider the killing cold it leaves, so standing your ground only gets you deeper into its frozen country." — Rimeheart Stalker [seat: trait [trait/always/condition]] (closest offered: aberrant-ground) [effect: movement] [menu: terrain-walk aberrant-ground faultless-tracker false-appearance adhesive phobia web-walker noxious-aura bloodied-fury uncanny-sense earth-glide tunneler berserk shielded-mind relentless-pursuit bound marking-light undead-fortitude mimicry truth-aura gaze-aura death-burst heated-body] [same-cell unoffered: none] [same-seat rejected: spider-climb:legality evasion:role sealed-body:legality guarded-stance:role assassinate:role blurred-form:role] [landed: aberrant-ground]
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Sanctum Rot — bands soft

**Concept:** a cathedral-vault ooze that digests reliquaries

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sanctum Rot | 9 (2014) | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6 (print at 9 reads 5.5–13, n=8)
- read: def 4 / off 8 → 6; sustained 54 (2 × Pseudopod); nova none; dmg 54

```
Sanctum Rot
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

blindsight 60 ft. (blind beyond this radius), passive Perception 9

Languages: 

None

Challenge

9 (5,000 XP)

Proficiency Bonus:

+4

Aberrant Ground. The ground within 10 feet of the sanctum rot is difficult terrain.
Amorphous. The sanctum rot can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form. A creature that touches the sanctum rot or hits it with a melee attack while within 5 feet of it takes 9 (2d8) acid damage.
Spider Climb. The sanctum rot can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The sanctum rot makes two Pseudopod attacks. It can replace one attack with a use of Relic Lure.
Pseudopod: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 11 (2d10) acid damage.
Relic Lure: One creature within 30 feet of the sanctum rot must succeed on a DC 15 Strength saving throw or be pulled up to 25 feet straight toward the sanctum rot by the relic's pull and be grappled (escape DC 15).
```

**Where each row came from**

- Traits/Aberrant Ground — template aberrant-ground; library draw (seed unstamped); binds the GM's words: ooze
- Traits/Amorphous — the chassis
- Traits/Corrosive Form — the chassis
- Traits/Spider Climb — the chassis
- Actions/Multiattack — the chassis
- Actions/Pseudopod — the chassis
- Actions/Relic Lure — template hook-drag; library draw (seed unstamped); binds the GM's words: pull

**Engine trace**

```
[path] homebrew — "a cathedral-vault ooze that digests reliquaries" (call)
[route] ooze type=Ooze mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "digests reliquaries" | ooze: ✓ ("cathedral-vault ooze") | ooze: no line key in the words — the model's read of its quote
[concept] hints: ooze→body ✓ ("a cathedral-vault ooze") | engulf→mechanics ✓ ("digests reliquaries")
[concept] resolve: archetype=ooze type=Ooze themes=amorphous/devouring mind=mindless style=— energy=Acid mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: dissolving and swallowing reliquaries [behavior] | a tide of black cathedral rot [body] | the vault-cracks it seeps through [aura]
[concept] identity: The Sanctum Rot slides through the vault-cracks of abandoned cathedrals as a slow tide of black decay, dissolving the gilded reliquaries it was consecrated to guard and growing fat on their holiness. It opens a fight by pouring under doors and around relic-shrines to engulf the nearest body whole, then flows at any creature still carrying consecrated matter, its hunger tracking sanctity like a scent. It never breaks from a meal and never negotiates — the only escape is to strip yourself of relics and leave the stained glass to it.
[concept] lore: It was the sealant between the cathedral's vault stones, quickened by centuries of spilled chrism and the death-echoes of relic-keepers, and it wants only to taste every holy thing ever sealed away.
[reskin] body type: ooze — the body outranks the role (recorded: ooze)
[reskin] donor: ooze-9 -> CR 9 (invented — no printed peer)
[reskin] row gated out: Engulf (engulf) — the concept did not claim this mechanic
[reskin] [path] decides: homebrew (the matcher would have said twist Gray Ooze)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the sanctum rot" — the call's own answer (kind), built from the name
[reskin] inline form: "the sanctum rot" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "never negotiates" quotes nothing the user typed
[reskin] clauses: "a cathedral-vault ooze" -> has (descriptive), head | "digests reliquaries" -> has (descriptive)
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, push-prone, herd, thrown-burst-seed, drain, delayed-brand, zone-seed, wind-up, blighted-ground, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The rot marks the holiest thing it can sense and flows toward it, abandoning all other prey. Any creature nearby carrying or wearing consecrated matter — relics, holy symbols, blessed vestments, anointed flesh — becomes its quarry, and the rot pours across the ground toward that creature with terrifying speed, sliding up walls and ceilings to reach it. The pull breaks only if the quarry casts off " [trait/start_of_turn/movement] — menu: warded-mending (+ shelf: trample, leap, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, rampage, patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] word match declined by the call: warded-mending, hook-drag — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "hook-drag" as nearest; it lands rather than the row being dropped (what it wanted: forces the creature itself to move toward a designated carrier of consecrated ma)
[reskin] value check: "Relic Lure" EV 14.9 vs floor 14 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Relic Lure" ("The idea is a lure: the rot is drawn to consecrated matter and surges toward tha [verb: pull:idea]")
[reskin] signature idea (trait): "Anything the rot has dissolved leaves a slick, black stain that spreads across the floor around it, and the ooze can feel every footfall on that stain as if it were its own skin. When a creature bearing traces of the rot's acid moves across that stain, the rot senses exactly where it is and where it is heading, no matter how far it has fled through the cathedral." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, guarded-stance (+ shelf: absorption, bloodied-burst, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — aberrant-ground (ooze)
[reskin] signature miss: trait — "web-walker" quotes nothing the GM typed, matches no key-table verb, and the call named none of this creature's own elements for it: decoration, not a signature
[reskin] trait bound to the concept's verb (concept-first): aberrant-ground — ooze in the user's words; the idea path had nothing
[reskin] signature template (trait): aberrant-ground -> Traits/"Aberrant Ground" ("exact concept match [verb: ooze:concept]")
[reskin] weapons answered: Pseudopod = none; Sanctity Lure = none
[reskin] speed by concept: dropped Climb 20 ft. — the concept's movement set decides
[reskin] climb speed: Climb 20 ft. — a creature that climbs difficult surfaces has a Climb Speed in print (the Vampire, the Giant Spider)
[reskin] languages held: None stands — INT 2 on a Ooze speaks nothing, whatever the mind read said
[reskin] element immunity: Acid (merged into the header write)
[reskin] immunities stamped for type: Ooze -> Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained
[reskin] name-canon stands down: the path answered homebrew on "a cathedral-vault ooze that digests reli" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Relic Lure.
audit finding below confidence gate: Relic Lure Grappled is a standard condition with the supplied escape DC, but the pull is a forced 25-foot displacement with no reaction or save beyond the initial Strength save; the escape DC does provide a legal path out, so this is not the defect — the undefined relic referent is.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] forces the creature itself to move toward a designated carrier of consecrated matter each turn, ignoring other targets — "The rot marks the holiest thing it can sense and flows toward it, abandoning all other prey. Any creature nearby carrying or wearing consecrated matter — relics, holy symbols, blessed vestments, anointed flesh — becomes its quarry, and the rot pours across the ground toward that creature with terrifying speed, sliding up walls and ceilings to reach it. The pull breaks only if the quarry casts off " — Sanctum Rot [seat: action [trait/start_of_turn/movement]] (closest offered: hook-drag) [effect: movement] [menu: warded-mending hook-drag] [same-cell unoffered: none] [same-seat rejected: fire-aura:legality] [landed: hook-drag]
[reskin] record reconciled: "Relic Lure" no longer imposes Grappled,Restrained — the clause left, so the record goes with it
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Old Quarry — bands soft

**Concept:** a stone giant exile who speaks only Giant and understands no Common

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Old Quarry | 9 (2014) | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-atk: attack +10 against the aim's +7
- read: def 7 / off 10 → 8.5; sustained 60 (2 × Stone Club); nova Deafening Bellow 27; dmg 60

```
Old Quarry
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

Actions
Multiattack: The quarry makes two attacks: one with its Stone Club and one with its Boulder.
Stone Club: Melee Weapon Attack: +10 to hit, reach 15 ft., one target. Hit: 30 (7d6 + 6) bludgeoning damage.
Boulder: Ranged Weapon Attack: +10 to hit, range 60/240 ft., one target. Hit: 27 (6d6 + 6) bludgeoning damage.
Deafening Bellow (Recharge 5-6): Each creature within 20 feet of the quarry must make a DC 18 Constitution saving throw, taking 27 (6d8) thunder damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also deafened until the end of its next turn.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Stone Club — print's own row, renamed; weapon club
- Actions/Boulder — print's own row
- Actions/Deafening Bellow — template active-toll; library draw (seed unstamped); binds the GM's words: deafen

**Engine trace**

```
[path] twist — Stone Giant (is) — "stone giant" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a stone giant exile") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=elemental/terror mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: hurling boulders and stone rubble at range [behavior] | a body of living stone [body] | speaks only Giant and understands no Common [behavior]
[concept] identity: A stone giant exile opens by hurling a boulder the size of a cart, then wades in swinging a slab of broken pillar while roaring in Giant at foes it knows cannot answer. It understands no Common, so it reads every noise and gesture as mockery or threat and meets both with stone fists; it does not flee, but drives forward until nothing stands or the ground takes it.
[concept] lore: Cast out of its mountain hold for some quarrel no one left alive can translate, this giant now walks the lowlands carrying its grudge in a language no neighbor speaks, and it wants only to be spoken to properly or left wholly alone.
[reskin] print canon array: STR 23, DEX 15, CON 20, INT 10, WIS 12, CHA 9 — the Stone Giant's; STR 23 outranks the card's +7, so the sheet rolls +10 (raise-only)
[reskin] donor: brute-9 -> CR 9
[reskin] [path] decides: twist on the Stone Giant (the matcher would have said homebrew)
[reskin] print canon: "a stone giant exile who speaks only Giant and understands no Common" heads on the Stone Giant — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the quarry" — the call's own answer (kind), built from the name; the rules would have said "Quarry"
[reskin] inline on kit rows: "Quarry" -> "the quarry"
[reskin] inline form: "the quarry" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: "understands no Common"
[reskin] clauses: "a stone giant exile" -> has (descriptive), head | "speaks only Giant" -> has (header) | "understands no Common" -> LACKS (mechanical)
[reskin] signature idea (action): "The quarry bellows a demand, a warning, or a jeer in Giant at everyone within earshot — and the sheer force of the words lands like a physical blow, rattling anyone who hears it regardless of whether they understand. Those who fail to shrug it off are left staggering and deafened by the roar, unable to answer back in kind. It can only pour this much voice into one shout before it must draw breath " [action/save/condition] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, gaze-single, snare, seal, lure, pacify, snare-bolt (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: terror-pulse, rally, lure, own-turn-punisher — the key word does not mean the mechanic here
[reskin] seat takes its clause: "Deafening Bellow (Recharge 5-6)" answers "a exile" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: active-toll -> Actions/"Deafening Bellow (Recharge 5-6)" ("The shout strikes everyone who hears it as a physical blow, rattling and deafeni [verb: deafen:idea]")
[reskin] signature idea (trait): "Its fists and the pillars it swings are simply more of the same living rock it is made of, so every stone blow it lands sinks a little of that quarry-cold weight into the target and leaves the ground ringing. A foe it has just struck carries that echo in its bones, making the giant's next stone strike against it land harder." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, assassinate (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] word match declined by the call: false-appearance, faultless-tracker, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, assassinate — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "already_answered" after being shown false-appearance, which the GM's words keyed
[reskin] [gap] UNNAMED trait declined with no missing mechanic named — the schema asks for one; "Its fists and the pillars it swings are simply more of the same living" — Old Quarry
[reskin] key match declined: trait — "false-appearance" was ranked first on the call's own menu for stone, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Its fists and the pillars it swings are simply more of the same living rock it is made of, so every stone blow it lands sinks a little of that quarry-cold weight into the target and leaves the ground ringing. A foe it has just struck carries that echo in its bones, making the giant's next stone strike against it land harder." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, assassinate, bloodied-burst, resonant-body)
[reskin] weapons answered: Stone Slab = a slab of broken pillar used as a club; Boulder = none
[reskin] weapon declared: "Stone Slab" is a club — the call's own answer
[reskin] rider folded: "Stone Slab" keeps its budget — the chassis's rider half (11) folds into the base; the Stone Giant pays no damage rider of its own
[reskin] print canon attack: "Stone Slab" -> "Stone Club" — the Stone Giant's own row
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] lack took nothing: "understands no Common" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Krennik Skullstandard — bands soft

**Concept:** name: Krennik Skullstandard | riding a worg

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Krennik Skullstandard | 4 (2014) | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 2–6.5, n=13)
- read: def 1 / off 4 → 2.5; sustained 20 (2 × Saber); nova Worg Gallop 22; dmg 28

```
Krennik Skullstandard
Medium humanoid, neutral
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

Common

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Outrider's Seat. Krennik ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Mounted Agility. As a bonus action, Krennik takes the Dash or Disengage action.

Actions
Multiattack: Krennik makes two attacks: one with Saber and one with Hurled Scythe.
Saber: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is prone. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 5 (1d10) slashing damage and, if it is Medium or smaller, is prone.
Hurled Scythe: Ranged Weapon Attack: +5 to hit, range 20/60 ft., one target. Hit: 7 (1d8 + 3) slashing damage.
Worg Gallop (Recharge 5-6): Krennik moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Each creature whose space it enters must make a DC 13 Strength saving throw, taking 22 (5d8) bludgeoning damage on a failed save and being knocked prone on a failed save.
```

**Where each row came from**

- Traits/Outrider's Seat — the chassis
- Actions/Multiattack — the chassis
- Actions/Saber — binds the GM's words: charge; weapon scimitar
- Actions/Hurled Scythe — the chassis
- Actions/Worg Gallop — the chassis
- Bonus Actions/Mounted Agility — the chassis

**Engine trace**

```
[path] homebrew — Worg (resembles) — "riding a worg" (call)
[route] skirmisher-mounted type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] name: "Krennik Skullstandard" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: mounted→style ✓ ("riding a worg")
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/armed mind=sapient style=mounted energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Krennik Skullstandard"
[concept] mechanics: none claimed
[concept] signature elements: riding down prey on a worg at full gallop [behavior] | charge-and-pass attacks that carry past the target [behavior] | iron blade and skull-totem standard [object]
[concept] identity: Krennik Skullstandard opens by loosing his worg into a full gallop, angling the charge so it carries him past a chosen target and lets his swung blade rake the length of it. Every round after that is a re-pass: the worg wheels, circles, and comes back through the gap he opens, rider leaning out to strike while the beast harries heels and flanks. He is a pressuring skirmisher who trusts momentum over armor — when bloodied he does not disengage so much as break contact, reform, and charge again from a new angle, wearing prey down rather than standing to trade blows.
[concept] lore: Krennik Skullstandard was once a border-outrider of some hill warband, and now he and his worg live by riding down stragglers on open roads, claiming the skull-totem standard at his back marks every mile he has made his own.
[reskin] nova capped: "Trampling Rush" 24 → 22 (the chassis nova obeys the cap: 22 at CR 4)
[reskin] donor: skirmisher-3-mounted -> CR 4 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher would have said homebrew)
[reskin] repair round 1: 1 defect(s) — renames for "Melee Attack" and "Ranged Attack" are both "Saber" — every row needs its own name (give the thrown twin its own word: Scythe / Hurled Scythe)
[reskin] repair round 2: 1 defect(s) — no damage type for "Saber"
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] proper noun: "Krennik Skullstandard" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Krennik" — the call's own answer (person), built from the name
[reskin] inline form: "Krennik" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Krennik Skullstandard — riding a worg" -> has (descriptive), head
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "A swept, skidding cut meant to catch whoever is in the worg's path. When charging past, Krennik drags his saber across every foe he passes alongside, so a line of defenders gets opened up rather than just one. It works only when he is carrying real speed into the pass, and each enemy can be caught only once per pass." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] word match declined by the call: hook-rider, riposte, charge-push, pounce, isolation, bolt-mark, condition-payoff, exploiter, affliction, contagion — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "charge" as nearest; it lands rather than the row being dropped (what it wanted: a movement-linked attack that hits every creature passed beside once per pass, r)
[reskin] signature rider: charge -> Saber (appended; The idea is a passing sweep that drags the saber across every foe alongside the  [verb: charge:idea])
[reskin] signature idea (trait): "The skull-totem standard is not decoration — Krennik plants its mark on prey he has already drawn blood from. From then on he and his worg take the measure of that quarry, reading its footwork and keeping its position known while it stays in sight; if it escapes his sight, the mark goes stale and must be earned again." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] trait declined: "Skull Mark" — no receipt of any kind: no quote, no concept key, and the call named none of this creature's own elements for it (decoration, not a signature)
[reskin] weapons answered: Saber = saber; Worg Gallop = none
[reskin] weapon table: "Hurled Scythe" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] chassis nova: "Worg Gallop (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] [gap] a movement-linked attack that hits every creature passed beside once per pass, rather than one target it charged straigh — "A swept, skidding cut meant to catch whoever is in the worg's path. When charging past, Krennik drags his saber across every foe he passes alongside, so a line of defenders gets opened up rather than just one. It works only when he is carrying real speed into the pass, and each enemy can be caught only once per pass." — Krennik Skullstandard [seat: action [rider/on_hit/damage]] (closest offered: charge) [effect: damage] [menu: affliction contagion charge-push hook-rider pounce isolation bolt-mark charge riposte condition-payoff exploiter] [same-cell unoffered: none] [same-seat rejected: stunning-strike:legality snatch:legality bolt-restrain:role bolt-drag:role] [VETOED AFTER ACCEPTANCE: charge never reached the sheet]
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
- read: def 8 / off 5 → 6.5; sustained 10 (1 × Bite); nova Smoldering Stumps 24; dmg 23

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

Damage Resistances: 

fire

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

Smoldering Stumps. The first time the hydra has half of its hit points or fewer in a fight, it releases a burst. Each creature within 15 feet of the hydra must make a DC 16 Constitution saving throw, taking 24 (7d6) fire damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also blinded until the end of its next turn.
Hold Breath. The hydra can hold its breath for 1 hour.
Multiple Heads. The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead.
Reactive Heads. For each head the hydra has beyond one, it gets an extra reaction that can be used only for opportunity attacks.
Smoking Stumps (1/Day). As a bonus action, the hydra creates a scalding, choking smoke in a 20-foot-radius sphere centered on itself. The effect lasts while the hydra maintains concentration on it, up to 10 minutes. Each creature in the area has disadvantage on attack rolls.

Actions
Multiattack: The hydra makes as many Bite attacks as it has heads.
Bite: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Bite — print's own row
- Traits/Smoldering Stumps — template bloodied-burst; library draw (seed unstamped); binds the GM's words: wounded+erupt
- Traits/Hold Breath — print's own row
- Traits/Multiple Heads — print's own row
- Traits/Reactive Heads — print's own row
- Bonus Actions/Smoking Stumps — template zone; library draw (seed unstamped); binds the GM's words: smoke+cloud

**Engine trace**

```
[path] twist — Hydra (is) — "Name field: Hydra" (code)
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("stumps smoke instead of regrowing") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] name: "Hydra" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/breath mind=bestial style=regenerator energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Hydra"
[concept] mechanics: regeneration
[concept] signature elements: smoking stumps where severed necks should regrow [body] | a scalding, blinding smoke shroud that thickens as it is wounded [aura] | a many-headed lunging assault that fights to the death [behavior]
[concept] identity: The smoking hydra is a regenerator gone wrong: it charges in behind a wall of biting heads, and every wound it suffers seals over with a hiss of hot vapor rather than muscle and bone. Each round it lunges and lashes with its remaining necks while fresh stumps pour scalding smoke, building a blinding, choking shroud that hides its true head count and punishes anything that stays close. It never breaks off — a wounded hydra simply makes more smoke, fighting to the death and leaving its prey to guess which necks are real.
[concept] lore: Sparked in the ash-choked calderas where an old hydra was burned down to its roots, this beast regrew wrong — the flesh knits, but the severed necks seal into smoking vents that it now hunts to fuel.
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
[reskin] clauses: "Hydra — whose stumps smoke instead of regrowing" -> LACKS (mechanical)
[reskin] signature idea (action): "Its necks strike in a frenzy, and each bite that finds flesh tears loose in a gout of scalding smoke, searing the target and everyone pressed close around it. The more necks it still has, the wider the choking cloud spreads, so the wounded beast becomes more dangerous the longer the fight drags." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge, isolation (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, zone, zone-seed, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — zone, zone-seed (smoke)
[reskin] closest accepted: action — the call refused every template but named "zone" as nearest; it lands rather than the row being dropped (what it wanted: an aura that grows wider and lingers from the creature's own stump-wounds, seari)
[reskin] signature template: zone -> Actions/"Smoking Stumps (1/Day)" ("The idea is a smoking aura from the hydra's severed necks that widens with damag [verb: smoke:concept, cloud:idea]")
[reskin] signature idea (trait): "Every wound that would kill it instead seals into a smoking vent: when it is badly hurt, searing smoke erupts from its stumps, scorching and blinding everything within reach of it. The more damage it has taken, the thicker the shroud around it grows." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — warded-mending (regrows)
[reskin] word match declined by the call: warded-mending, heated-body, sealed-body — the key word does not mean the mechanic here
[reskin] free signature row: "Smoldering Stumps" — the trait seat cannot quote the GM, but the call names the element it expresses: "a scalding, blinding smoke shroud that thickens as it is wounded". Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Smoldering Stumps" answers "Hydra — whose stumps smoke" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): bloodied-burst -> Traits/"Smoldering Stumps" ("The first time it is wounded (Bloodied), searing smoke erupts from its stumps, s [verb: wounded:idea, erupt:idea]")
[reskin] weapons answered: Bite = none
[reskin] speed by concept: added Swim 40 ft. — the concept's movement set decides
[reskin] print canon multiattack: "the hydra makes as many Bite attacks as it has heads." — the Hydra's own
[reskin] languages held: None stands — INT 2 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon skills: "Athletics +8, Perception +3" -> "Perception +6" — the Hydra's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities none -> Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious — the Hydra's own header lines
[reskin] resistances derived: Fire
[reskin] print canon trait: Hold Breath — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Multiple Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Reactive Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] dead control row: "Smoking Stumps (1/Day)" moves to Bonus Actions — no damage, no save, no KO condition
audit finding below confidence gate: Smoking Stumps (1/Day) The 20-foot emanation of scalding choking smoke imposes Disadvantage but creates no obscurement or mechanical effect beyond that clause and provides no path for affected creatures to escape the condition, relying only on a 1/Day gate.
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] an aura that grows wider and lingers from the creature's own stump-wounds, searing creatures near it, tied to its wound  — "Its necks strike in a frenzy, and each bite that finds flesh tears loose in a gout of scalding smoke, searing the target and everyone pressed close around it. The more necks it still has, the wider the choking cloud spreads, so the wounded beast becomes more dangerous the longer the fight drags." — Hydra [seat: action [rider/on_hit/damage]] (closest offered: zone) [effect: damage] [menu: zone zone-seed affliction contagion stunning-strike charge-push hook-rider pounce charge isolation rampage ground-burst spew rally] [same-cell unoffered: none] [same-seat rejected: snatch:legality bolt-restrain:role bolt-drag:role bolt-mark:role] [landed: zone]
[reskin] lacks clause: Traits/"Multiple Heads" keeps its blow, loses the regeneration — "Hydra — whose stumps smoke instead of regrowing"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Drowned Choir — in the run

**Concept:** a drowned cathedral choir that sings in one voice

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Drowned Choir | 10 (2014) | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | FAIL: condition-duration | ok | ok |

- adjudicability · fail · condition-duration: Traits/One Voice: imposes Deafened and never says when it ends — print bounds every Deafened it hands out (0 of its rows bare)
- read: def 12 / off 9 → 10.5; sustained 60 (2 × Mouths); nova none; dmg 60

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

darkvision 60 ft., passive Perception 12

Languages: 

Common plus the languages it knew in life

Challenge

10 (5,900 XP)

Proficiency Bonus:

+4

One Voice. When the drowned choir would be deafened or silenced, it sings through every throat it has drowned; a single failing voice does not stop the chord, and it is immune to being deafened.
Incorporeal Movement. The drowned choir can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
Sunlight Sensitivity. While in sunlight, the drowned choir has disadvantage on ability checks and attack rolls.
Ringing Chord (2/Day). As a bonus action, the drowned choir charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 14 (4d6) necrotic damage.

Actions
Multiattack: The drowned choir makes two Mouths attacks.
Mouths: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 30 (6d8 + 3) necrotic damage.
```

**Where each row came from**

- Traits/One Voice — authored for this sheet; the GM's clause "sings in one voice"
- Traits/Incorporeal Movement — the chassis
- Traits/Sunlight Sensitivity — the chassis
- Actions/Multiattack — the chassis
- Actions/Mouths — the chassis
- Bonus Actions/Ringing Chord — template coating; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "a drowned cathedral choir that sings in one voice" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("a drowned cathedral choir that sings in ") | lurker-phantom: key "drowned" (class body)
[concept] resolve: archetype=lurker type=Undead themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: singing in one voice [behavior] | drowned congregation of mouths [body] | hymn that drags the living under [aura]
[concept] identity: The Drowned Choir opens with a single unified note that rolls through stone and water, drowning out speech and thought until the air itself seems to sing along. Every round after, it drifts through walls and floors to surround prey, its countless mouths striking from every side in perfect unison while its hymn drags the living down into the silence of the flood. When pressed by light or hurting, it does not scatter — it closes ranks, singing louder, trying to swallow the offending light in one enormous chord.
[concept] lore: A cathedral congregation that drowned together in a single flooded nave, its hymn never ending, the Drowned Choir now drifts through drowned places to gather new voices into its eternal unison.
[reskin] donor: lurker-5-phantom -> CR 10
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the drowned choir" — the call's own answer (kind), built from the name; the rules would have said "Choir"
[reskin] inline on kit rows: "Choir" -> "the drowned choir"
[reskin] inline form: "the drowned choir" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a drowned cathedral choir" -> has (descriptive), head | "sings in one voice" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The choir draws a breath it does not need and lets out one enormous unified chord that hangs in the air around it. Until the chord breaks, whenever the choir strikes a creature, the note rings on inside that victim's head, and a victim with the note already ringing in them feels the next strike land harder, as though it struck twice. The note dies on its own after a short while, or the choir can b" [bonus_action/always/damage] — menu: patient-defense, self-invisibility, focus, feint-slip, coating, own-turn-punisher (+ shelf: leap, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] value check: "Ringing Chord (2/Day)" EV 7.7 vs floor 4.9 (a bonus action (free)) — worth the trade
[reskin] signature template: coating -> Bonus Actions/"Ringing Chord (2/Day)" ("the strike lands harder, as though it struck twice — the next hit carries an ext [shape fit, no verb match]")
[reskin] signature idea (trait): "Every wound the choir takes is another voice joining the hymn: when a blow lands on it, the pain comes back out as sound, and creatures close enough to hear are briefly deafened to everything but the choir's voice." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — noxious-aura, mimicry (voices)
[reskin] word match declined by the call: mimicry — the key word does not mean the mechanic here
[reskin] free signature row: trait — "resonant-body" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "drowned congregation of mouths" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] trait declined: "Answering Hymn" — no receipt, and this sheet's free-row allowance (1) is spent (1d: a receipt decides credit, not existence)
[reskin] repair: 1 clause(s) with no row — "sings in one voice"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced []
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Mouths = none
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] name-canon stands down: the path answered homebrew on "a drowned cathedral choir that sings in " and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] audit rename blocked — "One Voice" -> "Deafening Chorus" would drop the GM's own word "voice" from a row bound to "sings in one voice"; the mechanic would stay and the receipt would not
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Vampire — in the run

**Concept:** name: Vampire | who keeps a garden of thorns

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vampire | 13 (2014) | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

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

STR +9, CON +9

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

Briar Regrowth. The vampire regains 20 hit points at the start of each of its turns if it has at least 1 hit point and thorns is within 30 feet of it.
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
Multiattack: The vampire makes two Grave Strike attacks and uses Bite.
Grave Strike: Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) by one of two hands. If the target is a Large or smaller creature, it is pulled up to 10 feet straight toward the vampire.
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that is grappled, incapacitated, or restrained must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) piercing damage plus 13 (3d8) necrotic damage on a failed save. The target's hit point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a Vampire Spawn under the vampire's control.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Grave Strike — print's own row, renamed; binds the GM's words: hook+hooks+drag+drags
- Actions/Bite — print's own row
- Traits/Briar Regrowth — template warded-mending; library draw (seed unstamped); binds the GM's words: knits
- Traits/Legendary Resistance — print's own row
- Traits/Misty Escape — print's own row
- Traits/Spider Climb — print's own row
- Traits/Vampire Weakness — print's own row
- Bonus Actions/Shape-Shift — print's own row
- Bonus Actions/Charm — print's own row

**Engine trace**

```
[path] twist — Vampire (is) — "Name field: Vampire" (code)
[route] brute-regenerator type=Undead mechanics=regeneration, snare — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: the call reads no worked magic in these words | brute-regenerator: ✓ ("Vampire") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] name: "Vampire" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Undead themes=grave/grasping mind=sapient style=regenerator energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Vampire"
[concept] mechanics: regeneration, snare
[concept] signature elements: a garden of hooked thorns it prunes and commands [object] | bleeding vines and blood-fed roses that reknit its flesh [body] | luring prey into the briar rows and binding them there [behavior]
[concept] identity: The Thorn-Gardener opens a fight by letting its prey come to it, striding through its briar rows while lashing thorns dig and tear at anyone within reach. Every round it flays with hooked thorn-whips and bleeding vine lashes, then kneels among the roses and lets punctured flesh knit shut, so attackers must cut faster than it heals. Wounded to its heart-thorn it does not flee — it drags itself deeper into the garden, pruning its attackers one by one with patient, delighted cruelty.
[concept] lore: A vampire who, rather than sleep in a crypt, rooted itself among its roses and fed the hedge on its own spilled blood, so the garden now grows from a single undying heart and it cannot leave the briars that keep it whole.
[reskin] print canon route: the Vampire's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon route: the regenerator seat's organ leaves too — the Vampire has no Regeneration of its own
[reskin] print canon defenses: HP 184 -> 195, AC 17 -> 16 — the Vampire's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 18, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's at its own CR; attack +8 -> +9, DC 17 (print's)
[reskin] donor: brute-13 -> CR 13 (invented — no printed peer)
[reskin] [path] decides: twist on the Vampire (the matcher agrees)
[reskin] print canon: "Vampire — who keeps a garden of thorns" heads on the Vampire — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] repair round 1: 1 defect(s) — name "Briar Sweep" promises the Prone condition but the row never delivers it — name what the rule does, or drop the claim word
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the vampire" — the call answered "the vampire" (kind), which the name does not support
[reskin] inline form: "the vampire" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 17 (8 + PB 5 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Vampire —" -> has (descriptive), head | "keeps a garden of thorns" -> has (descriptive)
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The vampire sinks its fingers into its own briar rows and commands them, and the whole hedge comes alive around the prey it already wounded — every thorn within reach hooks into flesh and drags the bleeding toward the vampire, feeding its garden and knitting its hurts. Creatures it has already poisoned or torn are the ones the thorns find first, so the wounded are pulled deeper in rather than let " [action/always/movement] — menu: condition-payoff, shield-bash, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter, zone-seed (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, feint-slip, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — drain (vampire)
[reskin] seat takes its clause: "Thorn Drag" answers "keeps a garden of thorns" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature rider: hook-rider -> Thorn Whip (appended; the living hedge's thorns hook into flesh and drag the bleeding wounded prey tow [verb: hook:idea, hooks:idea, drag:idea, drags:idea])
[reskin] signature idea (trait): "The garden is the vampire: any wound it takes is fed straight into the briars, so while it stands among its thorns its flesh knits shut faster the more blood has been spilled into the rows. Cutting it down means outpacing the hedge, not the vampire." [trait/start_of_turn/resource] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, weapon-lodge, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (thorns)
[reskin] word match declined by the call: heated-body — the key word does not mean the mechanic here
[reskin] free signature row: "Briar Regrowth" — the trait seat cannot quote the GM, but the call names the element it expresses: "bleeding vines and blood-fed roses that reknit its flesh". Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Briar Regrowth" answers "keeps a garden of thorns" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): warded-mending -> Traits/"Briar Regrowth" ("its flesh knits shut faster while it stands among its thorns — regeneration tied [verb: knits:idea]")
[reskin] weapons answered: Thorn Whip = none; Briar Sweep = none
[reskin] weapon declined: "Thorn Whip" reads whip from its name, but the call answered none — the row carries no weapon
[reskin] chassis nova: "Briar Sweep (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Vampire's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus two other languages" — the Vampire's
[reskin] print canon attack: "Thorn Whip" -> "Grave Strike" — the Vampire's own row
[reskin] print canon multiattack: "the vampire makes two Grave Strike attacks and uses Bite." — the Vampire's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon skills: "Athletics +9, Perception +7" -> "Perception +7, Stealth +9" — the Vampire's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance (3/Day, or 4/Day in Lair) — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Briar Sweep (Recharge 5-6)" is the seat's nova, not the Vampire's
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause withheld: the Multiattack already uses it — "the vampire makes two Grave Strike attacks and uses Bite." (the Vampire's print line names Bite; a second clause named it again, twist-ten 2026-10-19)
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] escape dc: Grave Strike → DC 17 (8 + PB + STR; a late row wore another number)
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Bone Sun Lich — in the run

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bone Sun Lich | 20 (2014) | caster-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 19 / off 20 → 19.5; sustained 126 (3 × Eldritch Burst + legendary Deathly Teleport); nova none; dmg 126

```
Bone Sun Lich
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

Shard Retort. A creature that touches the sun lich or hits it with a melee attack while within 5 feet of it takes 10 (3d6) necrotic damage.
Legendary Resistance (3/Day). If the sun lich fails a saving throw, it can choose to succeed instead.
Spirit Jar. If destroyed, the sun lich reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the sun lich's lair.
Protective Magic (3/Day) (Reaction). When the sun lich is hit by an attack roll, the sun lich casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: The sun lich makes three attacks, using Eldritch Burst or Paralyzing Touch. It can replace one attack with a use of (A) Bone Rain or (B) Spellcasting to cast Ray of Sickness.
Eldritch Burst: Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 31 (4d12 + 5) force damage.
Paralyzing Touch: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed.
Spellcasting: The sun lich casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 19): -

At will: detect magic, detect thoughts, dispel magic, fireball, invisibility, lightning bolt, mage hand, prestidigitation

2/day each: animate dead, dimension door, plane shift

1/day each: chain lightning, finger of death, power word kill, scrying
Bone Rain: One creature within 30 feet that is frightened of the sun lich must make a DC 19 Strength saving throw, taking 21 (6d6) necrotic damage on a failed save, or half as much damage on a successful one.
Legendary Actions

The sun lich can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The sun lich regains spent legendary actions at the start of its turn.

Deathly Teleport: The sun lich teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an undead within 20 feet of the sun lich must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one. The sun lich can't take this action again until the start of its next turn.
Frightening Gaze: The sun lich casts fear, using the same spellcasting ability as Spellcasting. The sun lich can't take this action again until the start of its next turn.
```

**Where each row came from**

- Traits/Shard Retort — template heated-body; library draw (seed unstamped); binds the GM's words: splinter+shard
- Traits/Legendary Resistance — the chassis
- Traits/Spirit Jar — print's own row
- Actions/Multiattack — the chassis
- Actions/Eldritch Burst — print's own row, renamed
- Actions/Paralyzing Touch — print's own row
- Actions/Spellcasting — print's own row
- Actions/Bone Rain — template exploiter; library draw (seed unstamped); binds the GM's words: downed+pinned+caught
- Reactions/Protective Magic — the chassis
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Deathly Teleport — print's own row
- Legendary Actions/Disrupt Life — print's own row
- Legendary Actions/Frightening Gaze — print's own row

**Engine trace**

```
[path] twist — Lich (is) — "archlich" (call)
[route] caster (artillery) type=Undead mechanics=none — casts: implied by the kind — "archlich" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("archlich") | caster: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "an archlich enthroned on a sun of bone…" is the description, not a name
[concept] resolve: archetype=caster type=Undead themes=grave/arcane mind=sapient style=— energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a throne-core sun of splintered bone [body] | spiral coronas of femurs and ribs re-grown each round [aura] | grave-bolts rained from its seat upon trespassers [behavior]
[concept] identity: The Bone Sun Lich does not walk to battle — it arrives already seated, its throne bursting up through the floor as a spiraling corona of splintered femurs and ribs, and from that fixed height it rains grave-bolts and bone-withering blasts down on anything that tries to close. Each round it re-knits the sun's shattered bones into new facets and lance-formations, so the fight is a siege against a growing skeletal star rather than a duel, and it never leaves its throne willingly. Under real pressure it turns cold and theatrical, spending its crown-bones as ablative shields and holding its best spells to punish whatever broke through, fighting to the last shard with contemptuous patience.
[concept] lore: An archlich who could not bear to die in the dark forged its own sun of the dead, seating itself at its core so that it might rule a lightless realm from the only light it permits to shine.
[reskin] print canon pb: print's +12 on PB +7 reads +11 on this sheet's PB +6; DCs follow
[reskin] print canon defenses: HP 300 -> 315, AC 19 -> 20 — the Lich's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 21, WIS 14, CHA 16 — the Lich's at its own CR; attack +10 -> +11, DC 19 (print's, on this sheet's PB)
[reskin] donor: caster-21 -> CR 20
[reskin] [path] decides: twist on the Lich (the matcher agrees)
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Rib Bolt" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the sun lich" — the call's own answer (kind), built from the name
[reskin] inline form: "the sun lich" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an archlich enthroned on a sun of bone" -> has (descriptive), head
[reskin] menu pruned: action — thrown-burst-seed, phase-slip, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The lich tears the bones from its throne in a ragged fan and rains them down on a line of trespassers, splinters bursting outward on impact. Anyone caught in that falling line is staggered and pinned under broken bone until they wrench free. The throne visibly thins where the bolts came from, but it re-knits itself turn by turn, so the barrage can't be repeated immediately." [action/save/damage] — menu: gaze-single, snare, condition-payoff, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal, exploiter (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, bolt-restrain, bolt-drag, bolt-mark)
[reskin] closest accepted: action — the call refused every template but named "exploiter" as nearest; it lands rather than the row being dropped (what it wanted: a line-area barrage that deals damage and pins those it hits under broken bone u)
[reskin] seat takes its clause: "Bone Rain" answers "an arch enthroned on a sun of bone" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: exploiter -> Actions/"Bone Rain" ("The lich tears the bones from its throne in a ragged fan and rains them down on a line of trespassers, splinters bursting outward on impact. Anyone caught in th [verb: downed:idea, pinned:idea, caught:idea]")
[reskin] signature idea (trait): "Its body is a sun-core of splintered bone, and every close blow knocks free a spray of daggered shards that bites the attacker and any ally pressed near it. The lich spends these shards as ablative armor, so each hit it weathers leaves the crown-bone thinner and the next attack deadlier down its length." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] free signature row: "Shard Retort" — the trait seat cannot quote the GM, but the call names the element it expresses: "a throne-core sun of splintered bone". Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Shard Retort" answers "an arch enthroned on a sun of bone" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): heated-body -> Traits/"Shard Retort" ("every close blow knocks free a spray of daggered shards that bites the attacker  [verb: splinter:idea, shard:idea]")
[reskin] weapons answered: Rib Bolt = none; Crown-Bone = none; Corona Blast = none
[reskin] weapon declined: "Rib Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Rib Bolt" — a launcher, never thrown, range 80/320
[reskin] chassis nova: "Corona Blast (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] speed by concept: dropped Fly 30 ft. (hover) — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon size: Large -> Medium — the Lich's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Eldritch Burst" keeps print's hybrid frame — reach 5 ft. or range 120 ft. (the Lich's weapon is thrown)
[reskin] print canon attack: "Crown-Bone" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon multiattack: "the sun lich makes three attacks, using Eldritch Burst or Paralyzing Touch in any combination." — the Lich's own
[reskin] ranged row off: "Rib Bolt" leaves — the Lich carries no ranged row and the words name none
[reskin] dead wildcard name swept — "Grave Volley" was only about "Rib Bolt"; the row drops
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon skills: "Arcana +11, Perception +8" -> "Arcana +17, History +11, Insight +8, Perception +8" — the Lich's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] resistances derived withheld: print's Lich owns the line (Cold, Lightning)
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Corona Blast (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of (A) Bone Rain or (B) Spellcasting to cast *Ray of Sickness*.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rewrite blocked — "Frightening Gaze" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a line-area barrage that deals damage and pins those it hits under broken bone until they wrench free, with the ability  — "The lich tears the bones from its throne in a ragged fan and rains them down on a line of trespassers, splinters bursting outward on impact. Anyone caught in that falling line is staggered and pinned under broken bone until they wrench free. The throne visibly thins where the bolts came from, but it re-knits itself turn by turn, so the barrage can't be repeated immediately." — Bone Sun Lich [seat: action [action/save/damage]] (closest offered: exploiter) [effect: condition] [menu: gaze-single snare condition-payoff execute seal lure obstacle-pull pacify escalating-dread snare-bolt slow-bolt sensory-strike herd drain curse-debt zone-seed reveal exploiter bolt-restrain bolt-drag bolt-mark] [same-cell unoffered: trample leap thrown-burst active-toll ground-burst spew burrow-ambush thrown-burst-seed wind-up blighted-ground] [same-seat rejected: swallow:role trample:role leap:role thrown-burst:legality reel:legality shield-bash:role hook-drag:role active-toll:legality pull-through:role random-ray:legality ground-burst:legality spew:legality burrow-ambush:legality terror-pulse:role disarm:role push-prone:role wind-up:legality blighted-ground:legality] [landed: exploiter]
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
[concept] hints: dragon→body ✓ ("Ancient Gold Dragon names a true dragon ")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/terror mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Ancient Gold Dragon"
[concept] mechanics: breath
[concept] signature elements: searing fire breath [body] | frightful presence that saps the will to fight [aura] | hoard-obsessed tyrant that fights to the death [behavior]
[concept] identity: The Ancient Gold Dragon opens by announcing itself — a molten roar that shakes the will of armies before its glowing golden hide even clears the clouds — then descends in sweeping passes, choosing between its searing breath and the crushing weight of claws and tail as the battlefield demands. Every round it takes it repositions to catch foes in a cone of fire, and it toys with prey from the air rather than committing to a single spot. When bloodied it does not flee but grows colder and more deliberate, using its fire to herd, corner, and finish rather than to open — a tyrant that fights to the death and considers restraint a personal insult.
[concept] lore: An Ancient Gold Dragon is a living horde that has outlived every empire it ever taxed, and it wants above all else for its hoard to keep growing — new treasures brought or burned from the world, either way.
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

Nimble Escape. As a bonus action, the boss takes the Disengage or Hide action.

Actions
Multiattack: The boss makes two attacks, using Scimitar or Shortbow.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage plus 2 (1d4) slashing damage if the attack had advantage.
Shortbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Scimitar — print's own row; weapon scimitar
- Actions/Shortbow — print's own row, renamed; weapon shortbow
- Bonus Actions/Nimble Escape — print's own row

**Engine trace**

```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792619969391:1465:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792619969391:1304:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792619969391:657:5)
!! [ENRICHMENT] Failed to enrich Owlbear: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792619969391:1465:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792619969391:1304:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792619969391:657:5)
[path] exact — Goblin Boss (is) — "Goblin Boss" (code)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("Goblin Boss") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/grasping mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Goblin Boss"
[concept] mechanics: none claimed
[concept] signature elements: striking from hiding with advantage [behavior] | the boss who commands a goblin band [behavior] | a rusty, well-used blade [object]
[concept] identity: A small, wiry goblin with a rusted blade, it darts from cover to strike at the exposed back of a distracted foe, then melts back into the shadows before anyone can aim a return blow. Every round it skulks, hides, and stabs from an unexpected angle, always looking for a weaker or more distracted target. When bloodied it does not stand and trade blows — it runs, hides, and comes back for whoever separated from the pack.
[concept] lore: The strongest, meanest goblin of a warren, it holds its rank by being the first to strike and the first to flee, and its whole band follows whichever of those it does next.
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
[reskin] inline by rule: "the boss" — the call answered "the boss" (kind), which the name does not support
[reskin] inline form: "the boss" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 12 (8 + PB 2 + the sheet's best 2) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Goblin Boss" -> has (descriptive), head
[reskin] weapons answered: Scimitar = scimitar; Sling = sling
[reskin] weapon table: "Sling" — a launcher, never thrown, range 30/120
[reskin] print canon speed: modes walk only — the Goblin Boss's
[reskin] print canon senses: "darkvision 60 ft." — the Goblin Boss's
[reskin] print canon type: Humanoid stays — the Goblin Boss is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon alignment: Neutral Evil -> Chaotic Neutral — the Goblin Boss's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "the boss makes two attacks, using Scimitar or Shortbow in any combination." — the Goblin Boss's own
[reskin] print canon attack: "Shortbow" is print's own row — +4, 5 (1d6 + 2), range 80/320 ft. (an exact body at print's CR)
[reskin] print canon attack: "Sling" -> "Shortbow" — the Goblin Boss's own ranged row
[reskin] print canon skills: "Perception +1, Stealth +4" -> "Stealth +6" — the Goblin Boss's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Traits/"Skulker" is the seat's, not the Goblin Boss's
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Boss's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Goblin Boss's Nimble Escape
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Iron Oath Sentinel — in the run

**Concept:** a sentinel of black iron, AC 20, Huge, speed 20 feet

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Iron Oath Sentinel | 11 (2014) | defender-7-warden | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 8 → 9; sustained 46 (2 × Iron Fist); nova none; dmg 46

```
Iron Oath Sentinel
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

darkvision 120 ft., passive Perception 14

Languages: 

Common

Challenge

11 (7,200 XP)

Proficiency Bonus:

+4

Ringing Recoil. A creature that hits the oath sentinel with a melee attack while within 5 feet of it takes 10 (3d6) thunder damage and is deafened until the end of its next turn.
Ward Bond. The oath sentinel is magically bound to a ward of its choosing, and it can have only one ward at a time. While the oath sentinel is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the oath sentinel.
Regeneration. The oath sentinel regains 10 hit points at the start of each of its turns if it has at least 1 hit point.
Interpose (Reaction). When a creature within 5 feet of the oath sentinel that it guards is hit by an attack roll, the attack hits the oath sentinel instead, and the oath sentinel has resistance to the attack's damage.
Oath Seam (Reaction). When a creature within 30 feet that the oath sentinel guards is hit by an attack roll, the oath sentinel moves up to half its speed toward the attacker without provoking opportunity attacks and makes one Iron Fist attack against it if it is within reach.

Actions
Multiattack: The oath sentinel makes two Iron Fist attacks.
Iron Fist: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage plus 10 (3d6) force damage.
Warding Bulwark (2/Day): The oath sentinel targets itself or one creature it can see within 60 feet. The target gains 24 (7d6) temporary hit points, and it gains a +2 bonus to AC until the end of the oath sentinel's next turn.
```

**Where each row came from**

- Traits/Ringing Recoil — template resonant-body; library draw (seed unstamped); binds the GM's words: iron+bell
- Traits/Ward Bond — the chassis
- Traits/Regeneration — the chassis
- Actions/Multiattack — the chassis
- Actions/Iron Fist — the chassis
- Actions/Warding Bulwark — the chassis
- Reactions/Interpose — template interpose; library draw (seed unstamped)
- Reactions/Oath Seam — template ward-retaliation; library draw (seed unstamped); binds the GM's words: sentinel+guard+guards+ward

**Engine trace**

```
[path] homebrew — "a sentinel of black iron, AC 20, Huge, speed 20 feet" (call)
[route] defender-warden type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-warden: ✓ ("a sentinel of black iron") | defender-warden stands on the homebrew path: the call ranked it and quoted "a sentinel of black iron" — the key "sentinel" is the menu, not the decision (step 7) | defender-warden: no line key in the words — the model's read of its quote
[concept] hints: warden→style ✓ ("a sentinel of black iron")
[concept] resolve: archetype=defender type=Construct themes=forged/armed mind=sapient style=warden energy=Force mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a body of riveted black iron that turns aside blows [body] | an unbreakable vow to guard one thing [behavior] | an immovable planted stance it will not surrender [behavior]
[concept] identity: The sentinel wades into reach at a ponderous twenty feet and stays there, planting itself between its charge and the world with a body of riveted black iron that turns aside nearly every blow. Every round after the first it simply fights where it stands — hammering limbs of dense iron, bodying smaller foes aside, and refusing to yield ground it has claimed. It is bound, not enraged: it does not flee, does not pursue, does not tire, and will grind itself to slag in place before abandoning what it was made to guard.
[concept] lore: Forged in some dead smithy and bound by oath or geas to a single charge, the sentinel of black iron has stood unmoving in the dark for centuries, waiting for the one intruder foolish enough to test that vow.
[reskin] donor: defender-7-warden -> CR 11
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the oath sentinel" — the call's own answer (kind), built from the name
[reskin] inline form: "the oath sentinel" — the model's own reading of the name
[reskin] save dc derived: DC 17 -> 16 (8 + PB 4 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a sentinel of black iron" -> has (descriptive), head | "AC 20" -> has (header) | "Huge" -> has (header) | "speed 20 feet" -> has (header)
[reskin] extraction: 1 of 4 model clauses quote nothing the user typed and leave the record ("AC 20")
[reskin] signature idea (action): "The sentinel slams a fist down and drives a seam of force through the ground toward its ward's attacker, so the thing it guards hits back through it. Any enemy that struck or threatened its ward since the sentinel's last turn gets struck by that buried force and shoved back out of reach, and the sentinel's own planted stance lets it follow up without giving up the spot it holds." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider, isolation, charge (+ shelf: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, ward-retaliation, riposte, interpose)
[reskin] signature bound to the concept's verb: action — ward-retaliation (sentinel)
[reskin] closest accepted: action — the call refused every template but named "ward-retaliation" as nearest; it lands rather than the row being dropped (what it wanted: strikes the enemy that hit the ward and shoves it back out of reach)
[reskin] value check: "Oath Seam" EV 20.3 vs floor 3.9 (a reaction (free)) — worth the trade
[reskin] signature template: ward-retaliation -> Reactions/"Oath Seam" ("The idea is a reaction triggered by an enemy striking or threatening the ward, h [verb: sentinel:concept, guard:idea, guards:idea, ward:idea]")
[reskin] keys spent by the action: sentinel
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 18 already beats print's 17 at CR 11, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "When a blow lands on the …, the riveted iron rings like a struck bell and the shock travels along its ward bond: the attacker feels the recoil in its own body, and the … can feel exactly where that enemy is standing and how badly it hurt." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — heated-body, resonant-body (iron)
[reskin] seat default: warden owes interpose by print — it seats before the idea
[reskin] signature template (trait): interpose -> Reactions/"Interpose" ("the seat owes it by print")
[reskin] signature template (trait): resonant-body -> Traits/"Ringing Recoil" ("a blow landing makes the riveted iron ring like a struck bell, and the shock (th [verb: iron:concept, bell:idea]")
[reskin] weapons answered: Iron Fist = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a sentinel of black iron, AC 20, Huge, s" and named no print body — no published trait lands on a word alone (owner's ruling)
audit span not verbatim, dropped: Oath Seam one creature within 30 feet that the oath sentinel guards
[reskin] seed share: 0 of 3 signature row(s) came from a seed — the sameness metric
[reskin] [gap] strikes the enemy that hit the ward and shoves it back out of reach — "The sentinel slams a fist down and drives a seam of force through the ground toward its ward's attacker, so the thing it guards hits back through it. Any enemy that struck or threatened its ward since the sentinel's last turn gets struck by that buried force and shoved back out of reach, and the sentinel's own planted stance lets it follow up without giving up the spot it holds." — Iron Oath Sentinel [seat: action [rider/on_hit/damage]] (closest offered: ward-retaliation) [effect: movement] [menu: ward-retaliation stunning-strike charge-push hook-rider isolation charge interpose push-prone herd rally] [same-cell unoffered: none] [same-seat rejected: affliction:role contagion:role pounce:role snatch:role bolt-restrain:role bolt-drag:role bolt-mark:role] [landed: ward-retaliation]
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
- read: def 11 / off 17 → 14; sustained 108 (4 × Arcane Burst); nova none; dmg 108

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

Warded Mending. Ilvareth regains 15 hit points at the start of each of its turns if it has at least 1 hit point and its ward is within 30 feet of it.
Magic Resistance. Ilvareth has advantage on saving throws against spells and other magical effects.
Misty Step (3/Day). As a bonus action, Ilvareth casts misty step, using the same spellcasting ability as Spellcasting.
Shadow Step (2/Day). As a bonus action, Ilvareth teleports up to 30 feet to an unoccupied space it can see.
Protective Magic (3/Day) (Reaction). When Ilvareth is hit by an attack roll, Ilvareth casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Ilvareth makes four Arcane Burst attacks.
Arcane Burst: Melee or Ranged Spell Attack: +9 to hit, reach 5 ft. or range 150 ft., one target. Hit: 27 (4d10 + 5) force damage.
Spellcasting: Ilvareth casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17): -

At will: detect magic, detect thoughts, disguise self, invisibility, light, mage armor, mage hand, prestidigitation

2/day each: fly, lightning bolt

1/day each: cone of cold, mind blank, scrying, teleport
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Arcane Burst — print's own row, renamed
- Actions/Spellcasting — print's own row
- Reactions/Protective Magic — mage kit; the GM's clause "archmage"
- Bonus Actions/Misty Step — mage kit; the GM's clause "bends shadow and steps between places"
- Bonus Actions/Shadow Step — template phase-slip; library draw (seed unstamped); the GM's clause "bends shadow and steps between places"; binds the GM's words: step+shadow+vanish
- Traits/Warded Mending — template warded-mending; library draw (seed unstamped); binds the GM's words: knits
- Traits/Magic Resistance — print's own row

**Engine trace**

```
[path] class_npc — class mage — "archmage" (call)
[route] caster (artillery) type=Humanoid mechanics=teleport — casts: on the GM's own words "An elf archmage who bends shadow and ste" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("An elf archmage who bends shadow and ste") | caster: no line key in the words — the model's read of its quote
[concept] name: "Ilvareth Dusksong" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=caster type=Humanoid themes=arcane/uncanny mind=sapient style=— energy=Force mix=energy identity=✓ lore=✓
[concept] name: provided "Ilvareth Dusksong"
[concept] mechanics: teleport
[concept] signature elements: stepping between shadows to reposition [behavior] | a body woven of living shadow [body] | bending darkness to blind and silence [aura]
[concept] identity: Ilvareth Dusksong opens by peeling the light from the room, dropping a curtain of shadow that blinds and silences her foes before the first bolt of dusksong force cracks home. Each round she steps from one patch of darkness to another, striking from a new angle with shadow-wreathed spells and never letting an enemy close the distance she has already abandoned. When bloodied she does not flee — she folds herself into the deepest shadow and returns, patient and amused, to toy with what remains of the party's nerve.
[concept] lore: An archmage who traded her reflection to the shadow beneath the world, Ilvareth now walks between every dark corner at once, harvesting the secrets and lives of those who forget to light a lamp.
[reskin] energy withheld: Force on a Humanoid with no Force in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Archmage — the class's own print block, nearest CR 12
[reskin] print canon defenses: HP 168 -> 170, AC 16 -> 17 — the Archmage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 10, DEX 14, CON 12, INT 20, WIS 15, CHA 16 — the Archmage's at its own CR; attack +8 -> +9, DC 17 (print's)
[reskin] donor: caster-12 -> CR 12
[reskin] [path] decides: class_npc on the Archmage · class mage (the matcher would have said twist Archmage)
[reskin] print canon: "Ilvareth Dusksong — An elf archmage who bends shadow and steps between places." heads on the Archmage — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Duskbolt" deals Force on a Humanoid whose concept names no Force — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "archmage": Misty Step (3/Day) (Mage/Misty Step)
[reskin] proper noun: "Ilvareth Dusksong" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Ilvareth" — the call's own answer (person), built from the name
[reskin] inline form: "Ilvareth" — the model's own reading of the name
[reskin] energy withheld on a base row: "Duskbolt" Force -> Piercing (the body's physical type; a Humanoid deals no Force its concept never gave it)
[reskin] control spell gated to daily — Fear (level 3 control at will is print's CR 13+ shape; at CR 12 it is 1/Day)
[reskin] spell DC coherence: DC 18 -> 17 off Intelligence 20 (print's array stays)
[reskin] save dc derived: DC 18 -> 17 (8 + PB 4 + Intelligence's 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Ilvareth Dusksong — An elf archmage" -> has (descriptive), head | "bends shadow and steps between places" -> has (mechanical) [asked: movement]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Ilvareth flings a thread of her own living shadow across the battlefield, stitching it to every darkened spot she has already made or stepped through. She then steps along that thread, vanishing from where she stands and reappearing inside any patch of darkness she has claimed this fight, arriving whole and ready to strike. The thread holds only a short while and only reaches her own shadows, so a" [bonus_action/always/movement] — menu: lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, focus, feint-slip (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, disarm, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — phase-slip (step, shadow)
[reskin] word match declined by the call: snare, zone, zone-seed — the key word does not mean the mechanic here
[reskin] signature template: phase-slip -> Bonus Actions/"Shadow Step (2/Day)" ("vanishes from where she stands and reappears inside any patch of darkness she ha [verb: step:concept, shadow:concept, vanish:idea]")
[reskin] keys spent by the action: step, shadow
[reskin] signature idea (trait): "Ilvareth's body is woven of …, so wherever she stands in dim or darkened space she draws herself back together, knitting wounds into the dark and pulling strength from whatever darkness her foes have brought with them. She cannot do this in bright light, and forcing her into open brightness denies her the mending." [trait/start_of_turn/resource] — menu: warded-mending (+ shelf: false-appearance, absorption, bloodied-burst, resonant-body, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] closest accepted: trait — the call refused every template but named "warded-mending" as nearest; it lands rather than the row being dropped (what it wanted: regains Hit Points at the start of its turn only while in dim light or darkness,)
[reskin] free signature row: "Warded Mending" — the trait seat cannot quote the GM, but the call names the element it expresses: "a body woven of living shadow". Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Warded Mending" answers "Ilvareth Dusksong — An elf" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): warded-mending -> Traits/"Warded Mending" ("The idea is a regeneration-in-darkness trait, but every offered template is eith [verb: knits:idea]")
[reskin] weapons answered: Duskbolt = none
[reskin] print canon modes: fly off — the Archmage has no such mode and the words name none
[reskin] speed by concept: dropped Fly 30 ft. (hover) — the concept's movement set decides
[reskin] print canon alignment: Neutral Evil -> Neutral — the Archmage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Elvish" -> "Common plus five other languages, Elvish" — the Archmage's plus the concept's Elvish
[reskin] print canon attack: "Duskbolt" -> "Arcane Burst" — the Archmage's own row
[reskin] print canon skills: "Arcana +9, Perception +6" -> "Arcana +13, History +9, Perception +6" — the Archmage's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities none -> Psychic; Charmed ((with Mind Blank)) — the Archmage's own header lines
[reskin] print canon trait: Magic Resistance — "Ilvareth Dusksong — An elf archmage who bends shadow and steps between places." is the Archmage (print's own row)
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 120 ft.; Passive Perception 16" -> "Passive Perception 16")
[reskin] row binds its clause: "Shadow Step" answers "bends shadow and steps between places" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] regains Hit Points at the start of its turn only while in dim light or darkness, losing the mending in bright light — "Ilvareth's body is woven of …, so wherever she stands in dim or darkened space she draws herself back together, knitting wounds into the dark and pulling strength from whatever darkness her foes have brought with them. She cannot do this in bright light, and forcing her into open brightness denies her the mending." — Ilvareth Dusksong [seat: trait [trait/start_of_turn/resource]] (closest offered: warded-mending) [effect: defense] [menu: warded-mending bloodied-burst bloodied-fury] [same-cell unoffered: none] [same-seat rejected: fire-aura:legality] [landed: warded-mending]
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Elder Scalesheen — in the run

**Concept:** lizardfolk monk

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Elder Scalesheen | 5 (2014) | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 7 → 6; sustained 46 (2 × Unarmed Strike); nova Tail-Blow Drag 17; dmg 46

```
Elder Scalesheen
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

Hold Breath. The scalesheen can hold its breath for 15 minutes.
Marsh Stride. Difficult terrain composed of mud doesn't cost the scalesheen extra movement, and the scalesheen can move across mud without needing to make an ability check.
Patient Defense. As a bonus action, the scalesheen takes the Dodge action.
Cunning Action. As a bonus action, the scalesheen takes the Dash, Disengage, or Hide action.

Actions
Multiattack: The scalesheen makes two attacks: one with its Unarmed Strike and one with its Dart.
Unarmed Strike: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 23 (3d8 + 3) bludgeoning damage. Once on each of the elder's turns when it hits with this attack, the target is subjected to the following effect. The target must succeed on a DC 14 Constitution saving throw or be stunned until the end of the elder's next turn.
Dart: Ranged Weapon Attack: +6 to hit, range 20/60 ft., one target. Hit: 12 (2d8 + 3) piercing damage.
Tail-Blow Drag (Recharge 5-6): Each creature within 10 feet of the scalesheen must make a DC 14 Dexterity saving throw, taking 17 (5d6) bludgeoning damage on a failed save, or half as much damage on a successful one.
```

**Where each row came from**

- Traits/Hold Breath — lizardfolk kit; the GM's clause "monk"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "monk"
- Actions/Multiattack — the chassis
- Actions/Unarmed Strike — print's own row, renamed; a declared feature; the GM's clause "monk"
- Actions/Dart — print's own row, renamed; weapon dart
- Actions/Tail-Blow Drag — template ground-burst; library draw (seed unstamped); binds the GM's words: around it
- Bonus Actions/Patient Defense — template patient-defense; monk kit; the GM's clause "monk"
- Bonus Actions/Cunning Action — print's own row

**Engine trace**

```
[path] class_npc — class monk — species lizardfolk — "monk" (call)
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("lizardfolk monk") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/uncanny mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: sweeping tail-whip takedown [behavior] | strike-and-fade footwork through reed and shallows [behavior] | scale-hardened fists and shins [body]
[concept] identity: The lizardfolk monk opens with a lunging tail-whip that sweeps a foe off its feet, then circles to keep its back to water and reeds while it hammers with scaled fists and feet. Every round it strikes, retreats half its speed, and dares a pursuer to follow onto ground it knows better than they do. Bloodied and cornered, it does not break — it goes silent, gives ground patiently, and waits for the one overextended swing it can punish.
[concept] lore: A marsh-dwelling lizardfolk who mortified its own scales smooth in the reedy shallows and now stalks the waterline of its tribe's territory, testing every stranger by how badly they want to cross it.
[reskin] [path] class body: the monk stands on the Spy — the class's own print block, nearest CR 5
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 5
[reskin] [path] decides: class_npc on the Spy · class monk (the matcher would have said homebrew)
[reskin] print canon: "lizardfolk monk" heads on the Spy — print's rows ride along; the seat stays
[reskin] row evicted for the cap: Traits/"Smooth Stepping" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "monk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Scales), Patient Defense (patient-defense)
[reskin] inline declared: "the scalesheen" — the call's own answer (kind), built from the name; the rules would have said "the elder"
[reskin] inline on kit rows: "the elder" -> "the scalesheen"
[reskin] inline form: "the scalesheen" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "lizardfolk monk" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The scalesheen lashes its tail low in a wide arc, sweeping every enemy around it off their feet and dragging them along the ground toward the water. Anyone caught on the wrong footing is thrown down and left sprawled at the marsh's edge, where the scalesheen's reach and footing are surest." [rider/on_hit/movement] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, bolt-drag (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] word match declined by the call: hook-rider, bolt-drag, condition-payoff, exploiter — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "ground-burst" as nearest; it lands rather than the row being dropped (what it wanted: knocks creatures around it Prone and pulls them toward the creature instead of o)
[reskin] seat takes its clause: "Tail-Sweep Drag (Recharge 5-6)" answers "lizardfolk" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: ground-burst -> Actions/"Tail-Sweep Drag (Recharge 5-6)" ("The idea is a wide-arc tail sweep that knocks down and drags every nearby enemy  [verb: around it:idea]")
[reskin] signature idea (trait): "When a foe's swing misses the scalesheen, it slips the blow into a patient counter, letting the attacker's momentum carry them past and into the marsh's mud. The scalesheen reads every overextension and answers it in kind." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] closest accepted: trait — the call refused every template but named "resonant-body" as nearest; it lands rather than the row being dropped (what it wanted: reacts to a missed melee attack by shoving the attacker back and down into mud)
[reskin] trait declined: "Overstep Rebuke" — no receipt of any kind: no quote, no concept key, and the call named none of this creature's own elements for it (decoration, not a signature)
[reskin] weapons answered: Scales = none; Reed Dart = none
[reskin] weapon declined: "Reed Dart" reads dart from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Reed Dart" — thrown, range 20/60
[reskin] print canon modes: swim off — the Spy has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Swim 40 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Draconic — the concept names the species; print's NPCs of it speak it
[reskin] print canon languages: "Common, Draconic" -> "Common plus one other language, Draconic" — the Spy's plus the concept's Draconic
[reskin] print canon attack: "Scales" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Reed Dart" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] save follows the effect: Actions/"Tail-Sweep Drag (Recharge 5-6)" Wisdom -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Bonus Actions/Cunning Action — the Spy's own
[reskin] class weapon: Actions/"Shortsword" -> "Unarmed Strike" — a monk fights with its hands, not the Spy's; the body's rider folds in (+7)
[reskin] class weapon: Actions/"Hand Crossbow" -> "Dart" — a monk fights with a dart, not the Spy's
[reskin] name follows content: Actions/"Tail-Sweep Drag" promises the Prone condition the row never delivers — "Tail-Blow Drag" (the call's modifier kept, the claim word swapped for a noun the row earns)
[reskin] audit rename blocked — "Tail Sweep" promises the Prone condition that "Tail-Blow Drag (Recharge 5-6)" does not deliver
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] knocks creatures around it Prone and pulls them toward the creature instead of only dealing damage — "The scalesheen lashes its tail low in a wide arc, sweeping every enemy around it off their feet and dragging them along the ground toward the water. Anyone caught on the wrong footing is thrown down and left sprawled at the marsh's edge, where the scalesheen's reach and footing are surest." — Elder Scalesheen [seat: action [rider/on_hit/movement]] (closest offered: ground-burst) [effect: movement] [menu: affliction contagion charge-push hook-rider pounce isolation bolt-mark charge bolt-drag exploiter condition-payoff ground-burst] [same-cell unoffered: none] [same-seat rejected: stunning-strike:legality snatch:legality bolt-restrain:role] [landed: ground-burst]
[reskin] [gap] reacts to a missed melee attack by shoving the attacker back and down into mud — "When a foe's swing misses the scalesheen, it slips the blow into a patient counter, letting the attacker's momentum carry them past and into the marsh's mud. The scalesheen reads every overextension and answers it in kind." — Elder Scalesheen [seat: trait [trait/on_being_hit/movement]] (closest offered: resonant-body) [effect: movement] [menu: absorption bloodied-burst resonant-body terrain-walk] [same-cell unoffered: none] [same-seat rejected: heated-body:legality weapon-lodge:role] [VETOED AFTER ACCEPTANCE: resonant-body never reached the sheet]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — the seat shipped a fallback or nothing
[reskin] species kit: Swim 30 ft. — a lizardfolk's own
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Meshrin — in the run

**Concept:** name: Meshrin | Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages. Give him a frightening roar. AC 16, 120 hit points.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | skirmisher-8-hurler | ok | ok | SOFT: lint:hp-formula | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok |

- structure · soft · lint:hp-formula: HP listed 120 but formula 14d10 + 42 averages 119
- gates · soft · control-aoe-ungated: Actions/Rattling War-Roar: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
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

Wounded Frenzy. While it has half of its hit points or fewer, Meshrin has advantage on attack rolls and saving throws.
Hold Breath. Meshrin can hold its breath for 15 minutes.
Great Weapon Master. When Meshrin hits a creature with its Greataxe, the attack deals an extra 3 damage.
Marsh Stride. Difficult terrain composed of mud doesn't cost Meshrin extra movement, and Meshrin can move across mud without needing to make an ability check.

Actions
Multiattack: Meshrin makes three attacks, using Greataxe or Javelin. It can replace one attack with a use of Rattling War-Roar.
Greataxe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (3d8 + 4) slashing damage.
Javelin: Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 17 (3d8 + 4) piercing damage. Immediately after the attack, a javelin returns to Meshrin's grasp, and the target's speed is reduced by 10 feet until the start of Meshrin's next turn.
Rattling War-Roar: Each creature of Meshrin's choice within 30 feet of it that can see or hear it must succeed on a DC 15 Wisdom saving throw or be frightened of Meshrin until the end of its next turn.
```

**Where each row came from**

- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "barbarian"
- Traits/Hold Breath — lizardfolk kit; the GM's clause "barbarian"
- Traits/Great Weapon Master — a declared feature; the GM's clause "Wields a greataxe two-handed"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "barbarian"
- Actions/Multiattack — the chassis
- Actions/Greataxe — authored for this sheet; a named part; the GM's clause "Wields a greataxe two-handed"; weapon greataxe
- Actions/Javelin — authored for this sheet; a named part; a declared feature; the GM's clause "a javelin for the throw"; weapon javelin
- Actions/Rattling War-Roar — template terror-pulse; library draw (seed unstamped); the GM's clause "Give him a frightening roar"; binds the GM's words: roar

**Engine trace**

```
[path] class_npc — class barbarian — species lizardfolk — "barbarian" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("Wields a greataxe two-handed") | brute -> skirmisher-hurler: the concept's VERB outranks the noun (key "throw", class verb) | skirmisher-hurler: key "throw" (class verb)
[concept] name: "Meshrin" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: hurler→style ✓ ("a javelin for the throw")
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/terror mind=sapient style=hurler energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Meshrin"
[concept] mechanics: thrown-weapon
[concept] signature elements: raging greataxe assault [behavior] | the frightening roar [behavior] | hurled javelins [object]
[concept] identity: Meshrin wades in with his greataxe already swinging, using his long stride and reach to stay at the edge of a foe's threat while his roar scatters and freezes the nerve of anyone in front of him. Each round he cycles between two-handed greataxe sweeps and a hurled javelin at anyone who breaks away, throwing himself into a rage the moment blows start landing. Pressure only sharpens him: he keeps the fight close and personal, relentless and contemptuous of pain, never retreating from a wound he can answer.
[concept] lore: A hulking lizardfolk reaver from the flooded marches, Meshrin left his clutch to earn a name in blood and now hires his axe to whatever war pays in plunder and glory.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the barbarian stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] nova capped: "Hurled Burst" 49 → 44 (the chassis nova obeys the cap: 44 at CR 8)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +7
[reskin] donor: skirmisher-8-hurler -> CR 8 (invented — no printed peer)
[reskin] [path] decides: class_npc on the Gladiator · class barbarian (the matcher would have said homebrew)
[reskin] print canon: "Meshrin — Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages. Give him a frightening roar. AC 16, 120 hit points." heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Terrifying Roar" deals Psychic on a Humanoid whose concept names no Psychic — a name is not a warrant; use a physical type
[reskin] named parts: Greataxe (slot), Javelin (slot, ranged) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] row evicted for the cap: Traits/"Long Stride" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "barbarian": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: rampage — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: barbarian — "barbarian": Bloodied Frenzy (Berserker/Bloodied Frenzy)
[reskin] proper noun: "Meshrin" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Meshrin" — the call's own answer (person), built from the name
[reskin] inline form: "Meshrin" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] final price: the chassis's Multiattack: the round ran 39 against the card's 54 — the attack rows re-solve at 138% (3 attacks on an authored sheet, under the card)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Meshrin — Large lizard folk" -> has (header) | "30 feet of movement" -> has (header) | "Wields a greataxe two-handed" -> has (mechanical) [asked: attack] | "a javelin for the throw" -> has (mechanical) [asked: attack] | "He is a barbarian who rages" -> has (descriptive) | "Give him a frightening roar" -> has (mechanical) [asked: save_area] | "AC 16" -> has (header) | "120 hit points" -> has (header)
[reskin] extraction: 1 of 10 model clauses quote nothing the user typed and leave the record ("AC 16")
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Meshrin lets out a rattling war-roar and charges straight through the space his enemies are standing in, greataxe sweeping in a wide, heedless arc as he goes. Anyone in his path who doesn't scramble clear gets caught on the blade and knocked sprawling, and the roar leaves those who hear it shaken and slow to answer. The fury of the charge grows stronger the more wounds Meshrin is already carrying." [action/always/condition] — menu: snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, gaze-single, execute, seal, pacify, escalating-dread, terror-pulse (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — throw-retrieve, terror-pulse (javelin, roar)
[reskin] signature template: terror-pulse -> Actions/"Rattling War-Roar (2/Day)" ("the roar leaves those who hear it shaken and slow to answer — a fear effect on c [verb: roar:concept]")
[reskin] keys spent by the action: roar
[reskin] signature idea (trait): "Meshrin's rage feeds on punishment — every time a blow actually lands on him, his … deepens and the axe comes back around faster, so hurting him only winds him up further. He grows meaner and harder to put down the longer a fight drags on." [trait/on_being_hit/resource] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (rage)
[reskin] word match declined by the call: bloodied-fury, absorption, resonant-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "bloodied-burst" has no key-table verb, but the call quotes "give him a frightening" from the description
[reskin] trait ceiling: "Terrifying Bellow" does not ship — 4 traits already, and print's ceiling for a meat body is 3
[reskin] weapons answered: Greataxe = a greataxe; Javelin = a javelin; Skullsplitter Throw = a javelin; Terrifying Roar = none
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] chassis nova: "Skullsplitter Throw (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "Draconic" -> "Common, Draconic" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Draconic" -> "Common, Draconic" — the Gladiator's plus the concept's Draconic
[reskin] print canon: chassis row leaves — Actions/"Skullsplitter Throw (Recharge 5-6)" is the seat's nova, not the Gladiator's
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Shield Bash" leaves with the shield — a greataxe is two-handed and print pairs a shield with no heavy melee weapon (0 of 329 gear lines)
[reskin] dead control row: "Rattling War-Roar" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Rattling War-Roar.
[reskin] row binds its clause: "Rattling War-Roar" answers "Give him a frightening roar" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] user-set: HP 136 -> 120 — a declared field (Resolution 3)
[reskin] species kit: Swim 30 ft. — a lizardfolk's own
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Toll-Road Sellsword — in the run

**Concept:** a sellsword who hurls a handaxe and closes with a shortsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Toll-Road Sellsword | 5 (2014) | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "closes with a shortsword"
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Handaxe); nova none; dmg 33

```
Toll-Road Sellsword
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

DEX +5, WIS +4

Senses: 

passive Perception 11

Languages: 

Common

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Axefall Advance. While the sellsword is moving toward a creature it has damaged within the last 24 hours, the sellsword's speed can't be reduced and difficult terrain doesn't cost it extra movement.
Riposte (Reaction). When a creature within 5 feet of the sellsword misses it with a melee attack roll, the sellsword makes one Handaxe attack against that creature.

Actions
Multiattack: The sellsword makes three Handaxe attacks. It can replace one attack with a use of Longbow.
Handaxe: Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) slashing damage, and the sellsword has advantage on its next attack roll against the target before the end of its next turn.
Longbow: The sellsword hurls a handaxe. Ranged Weapon Attack: +5 to hit, range 150/600 ft., one target. Hit: 9 (2d6 + 2) piercing damage. The weapon lands in an unoccupied space within 5 feet of the target; until the sellsword spends 5 feet of movement in that space to recover it, the sellsword's speed is halved and it can't use this action.
Shield Bash: One creature within 5 feet of the sellsword that the sellsword can see must succeed on a DC 15 Strength saving throw or take 9 (2d4 + 4) bludgeoning damage. If the target is a Medium or smaller creature, it is prone.
```

**Where each row came from**

- Traits/Axefall Advance — template relentless-pursuit; library draw (seed unstamped); binds the GM's words: walking toward+closes on
- Actions/Multiattack — the chassis
- Actions/Handaxe — authored for this sheet; a named part; a declared feature; the GM's clause "hurls a handaxe"; weapon handaxe
- Actions/Longbow — template throw-retrieve; library draw (seed unstamped); weapon longbow
- Actions/Shield Bash — print's own row
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "sellsword"

**Engine trace**

```
[path] class_npc — class fighter — "sellsword" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-hurler: ✓ ("hurls a handaxe") | skirmisher-hurler: key "hurls" (class verb)
[concept] hints: hurler→style ✓ ("hurls a handaxe and closes")
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/forged mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: hurled handaxe opening [object] | closing with a shortsword [object] | professional retreat when bloodied [behavior]
[concept] identity: A disciplined sellsword who opens every fight at range, hurling a handaxe to stagger and bleed the quarry, then closes the distance with a shortsword while the axe arm recovers. Every round after that it circles, feinting a throw to keep prey at bay before driving in with short, economical cuts; it fights with a professional's patience and will break off bloodied rather than die for a contract. Its iron cap and bracers mark a mercenary who has survived long enough to know that the throw is a threat, not a finisher.
[concept] lore: A sellsword of the free companies, this fighter takes coin from whoever holds the local road and fights only as long as the pay (and blood) keeps its arithmetic favorable.
[reskin] [path] class body: the fighter stands on the Gladiator — the class's own print block, nearest CR 5
[reskin] nova capped: "Hurled Burst" 31 → 28 (the chassis nova obeys the cap: 28 at CR 5)
[reskin] print canon defenses: HP 95 -> 112, AC 15 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +7, DC 15 (print's)
[reskin] donor: skirmisher-8-hurler -> CR 5 (invented — no printed peer)
[reskin] [path] decides: class_npc on the Gladiator · class fighter (the matcher would have said twist Warrior Veteran)
[reskin] print canon: "a sellsword who hurls a handaxe and closes with a shortsword" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] named parts: Handaxe (slot), Shortsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: fighter — "sellsword": Riposte (riposte)
[reskin] inline declared: "the sellsword" — the call's own answer (kind), built from the name
[reskin] inline form: "the sellsword" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a sellsword" -> has (descriptive), head | "hurls a handaxe" -> has (mechanical) [asked: attack] | "closes with a shortsword" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — thrown-burst-seed, phase-slip, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When the fight is going badly and the sellsword is badly hurt, it stops pretending the contract is worth dying for: it backs away from the melee, turning as it goes, and hurls a handaxe to keep the nearest threat honest and buy itself room to run. It only does this once the blood is flowing and only while it can still see a way out, and it takes that way — a wounded professional leaves rather than" [action/once_per_fight/movement] — menu: snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] pick kept on the GM's own words: action — "throw-retrieve" has no key-table verb, but the call quotes "hurls a handaxe" from the description
[reskin] row superseded: Actions/"Shortsword" leaves — "Parting Hurl" owns the throw now
[reskin] dead name still carried — "Shortsword" names a row that is still on the sheet; no sweep
[reskin] signature template: throw-retrieve -> Actions/"Parting Hurl" ("the sellsword backs away and hurls a handaxe at the nearest threat, and the retu [shape fit, no verb match]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The sellsword fights at two distances as one habit: whenever it closes on a foe it has just unsettled with a thrown axe, it presses the shortsword straight into that opening. Whatever it staggers with a hurl, it is already walking toward." [trait/always/movement] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: relentless-pursuit — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "relentless-pursuit" as nearest; it lands rather than the row being dropped (what it wanted: grants a melee attack roll or follow-up strike against a creature the sellsword )
[reskin] seat takes its clause: "Axefall Advance" answers "closes with a shortsword" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): relentless-pursuit -> Traits/"Axefall Advance" ("The idea is a sequenced combo — unsettle with a hurled axe, then close and press [verb: walking toward:idea, closes on:idea]")
[reskin] weapons answered: Shortsword = a shortsword; Handaxe = a handaxe; Hurled Axe = a handaxe; Feint and Knife = a shortsword
[reskin] chassis nova: "Hurled Axe (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon multiattack: "the sellsword makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon yields: "Parting Hurl" is the seat's own row — print's name never lands on a template's body (see the melee loop)
[reskin] print canon skills: "Perception +4, Stealth +5" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Hurled Axe (Recharge 5-6)" is the seat's nova, not the Gladiator's
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon: chassis row leaves — Traits/"Disciplined Footwork" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: "Longbow" rolls Dexterity — a launcher is DEX in print: +7 -> +5
[reskin] class weapon: Actions/"Parting Hurl" -> "Longbow" — a fighter fights with a longbow, not the Gladiator's
[reskin] multiattack reconciled: "Spear" is no row on this sheet — the Multiattack cites "Handaxe" instead
[reskin] multiattack reconciled: "Shield Bash" is no row on this sheet — the Multiattack cites "Longbow" instead
audit finding below confidence gate: Shield Bash The Prone condition is applied without a stated duration or end clause, though Prone carries its own exit only for a creature that can stand.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rename blocked — "Thrown Handaxe" is a handaxe and "Longbow" is a longbow; the row's numbers are the longbow's and a rename may not re-weapon it
[reskin] seed share: 0 of 3 signature row(s) came from a seed — the sameness metric
[reskin] [gap] grants a melee attack roll or follow-up strike against a creature the sellsword has just damaged at range — "The sellsword fights at two distances as one habit: whenever it closes on a foe it has just unsettled with a thrown axe, it presses the shortsword straight into that opening. Whatever it staggers with a hurl, it is already walking toward." — Toll-Road Sellsword [seat: trait [trait/always/movement]] (closest offered: relentless-pursuit) [effect: damage] [menu: adhesive phobia terrain-walk aberrant-ground faultless-tracker web-walker bloodied-fury uncanny-sense berserk shielded-mind evasion relentless-pursuit bound marking-light guarded-stance undead-fortitude mimicry truth-aura gaze-aura assassinate blurred-form death-burst] [same-cell unoffered: blink spider-climb earth-glide tunneler zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: false-appearance:legality spider-climb:legality earth-glide:legality tunneler:legality sealed-body:role] [landed: relentless-pursuit]
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Brother Halric — in the run

**Concept:** name: Brother Halric | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Brother Halric | 3 (2014) | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 3 → 1.75; sustained 22 (2 × Radiant Flame); nova none; dmg 22

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

Battlefield Prayer. Halric regains 10 hit points at the start of each of its turns if it has at least 1 hit point and a wounded ally is within 30 feet of it.
Divine Aid (3/Day). As a bonus action, Halric casts bless, dispel magic, healing word, or lesser restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame. It can replace one attack with a use of Answered Prayer.
Spellcasting: Halric casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 13): -

At will: light, thaumaturgy

1/day each: spirit guardians
Answered Prayer: One creature within 60 feet of Halric must succeed on a DC 13 Dexterity saving throw or be cursed until the end of Halric's next turn. The first time the cursed target deals damage to any creature before then, it takes 7 (2d6) necrotic damage.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Spellcasting — print's own row
- Actions/Answered Prayer — template curse-debt; library draw (seed unstamped); binds the GM's words: judgment
- Actions/Radiant Flame — print's own row
- Actions/Mace — print's own row; weapon mace
- Bonus Actions/Divine Aid — cleric kit; the GM's clause "Brother"
- Traits/Battlefield Prayer — template warded-mending; library draw (seed unstamped); binds the GM's words: knits+prayer+prayers

**Engine trace**

```
[path] class_npc — class cleric — "Brother" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "Brother Halric" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("Brother Halric") | caster-warpriest: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid themes=armed/grave mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Brother Halric"
[concept] mechanics: none claimed
[concept] signature elements: hammer-and-shield war-priest melee [behavior] | battlefield prayers that mend and harden [behavior] | iron plate and war-hammer [object]
[concept] identity: Brother Halric opens by closing to melee behind his shield, hammer swinging, then settles into a grinding trade of blows where each hit he lands on himself or an ally is answered with a muttered battlefield prayer that mends flesh and hardens his guard. Under pressure he digs in rather than retreat, fighting to the death with the steady, unnerving calm of a man who believes every wound he takes is a ledger being settled.
[concept] lore: Brother Halric was a crusading war-priest who fell on a battlefield no one came to claim, and he now walks the old campaign roads offering a last prayer to the dying and a hammer to anyone who won't kneel for it.
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
[reskin] control spell gated to daily — Hold Person (level 2 control at will is print's CR 13+ shape; at CR 3 it is 1/Day)
[reskin] spell DC coherence: DC 13 -> 11 off Intelligence 13 (print's array stays)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Brother Halric" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Halric drives his warhammer into the ground and calls down a brief field of judgment around himself, and the strike that follows is aimed at whoever among his foes has drawn blood from him or his allies most recently. The weight of the unanswered prayer presses on that one target hardest, staggering it where it stands." [action/always/damage] — menu: gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground, throw-retrieve (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, own-turn-punisher, coating, bolt-restrain, bolt-drag, bolt-mark)
[reskin] seat takes its clause: "Answered Prayer" answers "Halric" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: curse-debt -> Actions/"Answered Prayer" ("The judgment marks the one who drew blood, pressing hardest on that target once  [verb: judgment:idea]")
[reskin] signature idea (trait): "Every time Halric lands a blow or an enemy's strike bites into him, a scrap of battlefield prayer mutters out of him and the nearest wounded ally's flesh knits a little tighter, and his own shield arm settles firmer. The calm grows with each exchange, as though the ledger balances deeper the longer the fight runs." [trait/always/defense] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion, guarded-stance (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] free signature row: "Battlefield Prayer" — the trait seat cannot quote the GM, but the call names the element it expresses: "battlefield prayers that mend and harden". Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Battlefield Prayer" answers "Halric" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): warded-mending -> Traits/"Battlefield Prayer" ("Each blow Halric lands or takes draws a scrap of battlefield prayer that knits t [verb: knits:idea, prayer:idea, prayers:idea]")
[reskin] weapons answered: Warhammer = warhammer
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Radiant Flame — the Priest's own ranged row, added (the chassis carried none to rename)
[reskin] print canon row: Actions/Mace — the Priest's own melee row, added (the chassis carried none to rename)
[reskin] print canon multiattack: "Halric makes two attacks, using Mace or Radiant Flame in any combination." — the Priest's own
[reskin] save follows the effect: Actions/"Answered Prayer" Charisma -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] print canon skills: "Arcana +3, Perception +5" -> "Medicine +7, Perception +5, Religion +5" — the Priest's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Warhammer" — the Priest prints no row for it and no path stage claimed it
[reskin] print canon: chassis row leaves — Reactions/"Protective Magic (3/Day)" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] multiattack replacement clause: It can replace one attack with a use of Answered Prayer.
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 13 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] 2014 conversion: one lint-gated call — both printings saved
```

