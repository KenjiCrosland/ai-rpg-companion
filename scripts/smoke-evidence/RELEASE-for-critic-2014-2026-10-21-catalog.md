# Release table for the critic — 2014 blocks — 2026-10-21

The case is at the top of the 2024 file (RELEASE-for-critic-2024-2026-10-21-catalog.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

## Review batch — sweep-2026-10-21T18-15-11

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Mire Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Owlbear | 3 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Chapel Bell-Wraith | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 8/8 |
| Air Elemental | 5 | 2024 | lurker-5 | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Scree-Pit | 5 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Lash-Bound Siege | 8 | 2024 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/5 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Hymn Drowned | 10 (2014) | 2014 | caster-8-binder | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Vampire | 13 (2014) | 2014 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 9/9 |
| Plaguefather | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/5 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Glacier Heart | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 6/6 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 0/1 | 8/8 |
| Brass Tyrant | 17 | 2024 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 8/10 |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 10/10 |
| Ossuar the Bone Sun | 20 (2014) | 2014 | caster-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/10 |
| Ancient Gold Dragon | 24 (2014) | 2014 | — | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | — | — |
| Ka'ruun Trench-Singer | 24 | 2024 | lurker-17 | ok | SOFT: under | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (2) | 1/1 | 7/9 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Goblin Boss | 1 (2014) | 2014 | defender-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Vashka the Red | 6 | 2024 | defender-5 | ok | ok | FAIL: lint:dangling-use-ref, lint:undefined-attack-ref | ok | ok | ok | SOFT: print-rows | ok | ok | ok | FAIL (1) | 2/2 | 4/4 |
| Acidmaw Scytheling | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/4 | 4/4 |
| Iron Vault Sentinel | 11 (2014) | 2014 | brute-9-juggernaut | ok | user-set: AC 20 · reads CR 10 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 3/3 | 4/6 |
| Bog Widow | 7 | 2024 | caster-8-binder | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 2/2 | 5/6 |
| Templar Reeve | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Ilvareth Dusksong | 12 (2014) | 2014 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Swarm of Plague-Knell Carols | 13 | 2024 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Chrism-Fed Reliquivore | 9 (2014) | 2014 | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 0/5 |
| Cumulus Whelp | 7 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Grum the Cast-Out | 9 (2014) | 2014 | skirmisher-8 | ok | SOFT: band | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (2) | 2/2 | 2/3 |
| Reedmarch Sap-Keeper | 5 (2014) | 2014 | skirmisher-3 | ok | SOFT: band, hot | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 6/8 |
| Krennik Skullstandard | 4 (2014) | 2014 | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/6 |
| Brinewretch | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/3 |
| Bileglazed Wardener | 4 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | FAIL: speaks-by-int | ok | FAIL (1) | 13/14 | 6/7 |
| Meshrin | 8 (2014) | 2014 | skirmisher-8-hurler | ok | user-set: AC 16, HP 120 · reads CR 6.5 | SOFT: lint:hp-formula | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (2) | 8/8 | 7/7 |
| Ossuary Greatsword | 6 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/3 |
| Garrison Sellsword | 5 (2014) | 2014 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 4/4 |
| Brother Halric | 3 (2014) | 2014 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |

**Dropped 10 of 69 user clauses** (coverage 86%); concept share 86% (179/208 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- defender-5 / structure: 1
- brute-5-grappler / reader: 1



---


### Mire Hound — a 2014 sheet

**Concept:** a mud-caked bog hound that drags fishermen under

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Mire Hound | 1 (2014) | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 0 / off 1 → 0.5; sustained 10 (2 × Bite); nova none; dmg 10

```
Mire Hound
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

Sucking Mud. When a creature hits the mire hound with a nonmagical weapon, the weapon lodges in the mire hound's body. A lodged weapon can be pulled free by a creature within reach that succeeds on a DC 13 Strength (Athletics) check as an action; while lodged, the mire hound can use it: its bite attacks deal an extra 3 (1d6) bludgeoning damage per lodged weapon (maximum two).
Whelm. As a bonus action, the mire hound whelms one Medium or smaller creature it is grappling. While whelmed, the target is blinded and restrained, has total cover against attacks and other effects outside the mire hound, and takes 3 (1d6) bludgeoning damage at the start of each of the mire hound's turns. The mire hound can have only one creature whelmed at a time. If the mire hound takes 5 damage or more in a single turn from the whelmed creature, the mire hound must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the mire hound. If the mire hound dies, a whelmed creature pulls free prone by using 5 feet of movement.

Actions
Multiattack: The mire hound makes two Bite attacks.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained. If the mire hound moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 3 (1d6) piercing damage and, if it is Large or smaller, is pushed up to 10 feet straight away from the mire hound and is prone.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Bite — the chassis
- Bonus Actions/Whelm — the GM's clause "drags fishermen under"; binds the GM's words: whelm+swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon
- Traits/Sucking Mud — template weapon-lodge; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "a mud-caked bog hound that drags fishermen under" (call)
[route] brute-grappler type=Beast mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "drags fishermen under" | brute-grappler: ✓ ("drags fishermen under") | brute-grappler: no line key in the words — the model's read of its quote
[concept] hints: engulf→mechanics ✓ ("drags fishermen under")
[concept] resolve: archetype=brute type=Beast themes=aquatic/grasping mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: drag prey down into the water [behavior] | mud-caked hound's hide [body] | ambush from beneath the muck [behavior]
[concept] identity: The bog hound lies half-submerged in the silt, only its mud-slicked back and nostrils breaking the surface, and waits for a fisherman to wade within reach. Then it lunges, jaws locking onto a leg or net-line, and heaves backward to haul the thrashing prey down into the black water and mire where it has the advantage. Once blood is in the water it sulks and circles, dragging the body into deeper mud to gorge and cache, never letting go of a catch it has already sunk its teeth into.
[concept] lore: A drowned hound that took to the marsh and never came out, it haunts the mudflats of fishing villages and wants only to add another body to the mire it calls home.
[reskin] donor: brute-5-grappler -> CR 1
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] engulf engine: Whelm — the body's own verb
[reskin] engine interior scaled — CR 1 sits below the brute-5-grappler seat
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the mire hound" — the call's own answer (kind), built from the name
[reskin] inline form: "the mire hound" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "on_hit" stands on "drags fishermen under" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a mud-caked bog hound" -> has (descriptive), head | "drags fishermen under" -> has (mechanical) [asked: on_hit/condition]
[reskin] signature idea (action): "When the hound bites a creature and the mud beneath it is soft, it plants its feet and heaves backward, hauling the bitten creature toward and into the deeper water and silt. Anyone it drags this way ends up bogged and slower to escape the muck, and the hound may pull its catch along with it as it retreats toward the deep. It cannot do this on dry, firm ground." [rider/on_hit/movement] — menu: contagion, charge-push, pounce (+ shelf: swallow, shield-bash, active-toll, spew, herd, thrown-burst-seed, drain, wind-up, exploiter, seal, lure, pacify, snare-bolt, sensory-strike, reveal, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] closest accepted: action — the call refused every template but named "charge-push" as nearest; it lands rather than the row being dropped (what it wanted: on a hit, pulls the bitten creature toward the hound and into deep water, with a)
[reskin] [gap] on a hit, pulls the bitten creature toward the hound and into deep water, with a lingering slowed escape in mud — "When the hound bites a creature and the mud beneath it is soft, it plants its feet and heaves backward, hauling the bitten creature toward and into the deeper water and silt. Anyone it drags this way ends up bogged and slower to escape the muck, and the hound may pull its catch along with it as it retreats toward the deep. It cannot do this on dry, firm ground." — Mire Hound [seat: action [rider/on_hit/movement]] (closest offered: charge-push) [effect: movement] [nearest landed] [menu: contagion charge-push pounce exploiter] [same-cell unoffered: hook-rider bolt-drag] [same-seat rejected: affliction:legality stunning-strike:legality hook-rider:legality isolation:role snatch:legality bolt-restrain:role bolt-drag:role bolt-mark:role charge:style]
[reskin] pick kept on the GM's own words: action — "charge-push" has no key-table verb, but the call quotes "a mud caked bog hound that drags fishermen under" from the description
[reskin] signature rider: charge-push -> Bite (appended; The hound drags a bitten creature toward and into deep water, leaving it bogged  [shape fit, no verb match])
[reskin] signature idea (trait): "The hound's hide is caked in wet, sucking mud that clings to whatever strikes it — a weapon or grasping hand comes away fouled and heavy, leaving the attacker mired and clumsy until they scrape it off. The hound, born to the bog, is never slowed by mud, water, or mire of any kind." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog, mud)
[reskin] word match declined by the call: terrain-walk — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "weapon-lodge" has no key-table verb, but the call quotes "mud caked" from the description
[reskin] signature template (trait): weapon-lodge -> Traits/"Sucking Mud" ("mud clings to whatever strikes the hound — a weapon comes away fouled and heavy, [shape fit, no verb match]")
[reskin] repair: 1 clause(s) with no row — "drags fishermen under"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [{"clause":"drags fishermen under","row":"Whelm"}], unplaced []
[reskin] clause already answered: "drags fishermen under" is carried by "Whelm" in different words — the call read the sheet and declined to answer it twice
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 4 on a Beast speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "a mud-caked bog hound that drags fisherm" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] ask vs row MISMATCH: "drags fishermen under" -> "Whelm" — trigger: asked on_hit, row reads at_will
audit finding below confidence gate: Sucking Mud The lodged weapon grants bonus damage but the entry never states whether the lodged weapon is destroyed, retained, or still usable by its owner, and nothing defines whether pulling it free consumes the creature's only action or can be attempted by the wielder while the hound moves away; the GM cannot tell if the weapon remains lodged after the hound dies or after the owner is Grappled.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Owlbear — a print donor

**Concept:** name: Owlbear | that has learned to climb

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 (2014) | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

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

DEX +3

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

None

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Silent Clamber. The owlbear can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The owlbear makes two Rend attacks. It can replace one attack with a use of Talon Pin.
Rend: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.
Talon Pin: The owlbear spends 5 feet of movement to jump to a space within 15 feet that contains one or more Large or smaller creatures. Each creature in the destination space must make a DC 15 Dexterity saving throw, taking 11 (2d10) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone. On a successful save, the target is pushed 5 feet straight away.
```

**Where each row came from**

- Traits/Silent Clamber — template spider-climb; library draw (seed unstamped); the GM's clause "has learned to climb"; binds the GM's words: climb+climbs+climbing+walls+wall+cling
- Actions/Multiattack — the chassis
- Actions/Rend — print's own row, renamed
- Actions/Talon Pin — template leap; library draw (seed unstamped)

**Engine trace**

```
[path] twist — Owlbear (is) — "Name field: Owlbear" (code)
[route] skirmisher type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("has learned to climb") | skirmisher: no line key in the words — the model's read of its quote
[concept] name: "Owlbear" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Monstrosity themes=bestial/grasping mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: none claimed
[concept] signature elements: vertical ambush pouncing from tree or ledge [behavior] | claw-ledge climbing that carry it up sheer surfaces [behavior] | shaggy bear-owl hide and hooked talons [body]
[concept] identity: The Clawing Owlbear opens the fight from above, dropping out of a tree or off a ledge in a silent, feather-muffled pounce that pins its victim against the ground before the rest of the pack swarms in. Every round after, it strikes and scrambles back up the nearest trunk or rock face, forcing prey to split its attention between the beast in front and the shrieking bulk about to land on it from behind. Cornered or bloodied, it does not run — it bellows, hooks its talons into the attacker, and drags itself and its foe up the climbable surface, fighting to the last with a bear's fury and a predator's spite.
[concept] lore: A cave-dwelling owl-bear that learned to nest in the high forks of old-growth forest and ruined tower walls, it now claims the vertical world as its hunting ground and defends the canopy territory it has clawed from everything beneath it.
[reskin] print canon defenses: HP 58 -> 59, AC 13 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +4 -> +7, DC 15 (print's)
[reskin] donor: skirmisher-3 -> CR 3
[reskin] [path] decides: twist on the Owlbear (the matcher agrees)
[reskin] print canon: "Owlbear — that has learned to climb" heads on the Owlbear — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the owlbear" — the call answered "the owlbear" (kind), which the name does not support
[reskin] inline form: "the owlbear" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Owlbear —" -> has (descriptive), head | "has learned to climb" -> has (mechanical) [asked: movement]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The owlbear hurls itself down onto a foe from a height it has climbed to, slamming them to the ground under its weight and pinning them beneath its hooked talons so they cannot rise while it mauls them. This only works when it can launch from a climbable surface or ledge above its victim, and the pinned prey can wrench itself free by main strength before the beast drags it upward." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, obstacle-pull, slow-bolt, herd, zone-seed, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, rally, riposte)
[reskin] closest accepted: action — the call refused every template but named "leap" as nearest; it lands rather than the row being dropped (what it wanted: a condition that pins the target in place so it cannot rise while the owlbear ma)
[reskin] [gap] a condition that pins the target in place so it cannot rise while the owlbear mauls it — "The owlbear hurls itself down onto a foe from a height it has climbed to, slamming them to the ground under its weight and pinning them beneath its hooked talons so they cannot rise while it mauls them. This only works when it can launch from a climbable surface or ledge above its victim, and the pinned prey can wrench itself free by main strength before the beast drags it upward." — Owlbear [seat: action [rider/on_hit/condition]] (closest offered: leap) [effect: condition] [nearest landed] [menu: affliction contagion charge-push hook-rider pounce isolation charge leap disarm thrown-burst-seed obstacle-pull] [same-cell unoffered: stunning-strike snatch bolt-restrain bolt-mark] [same-seat rejected: stunning-strike:legality snatch:legality bolt-restrain:role bolt-drag:role bolt-mark:legality]
[reskin] seat takes its clause: "Talon Pin" answers "has learned to climb" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: leap -> Actions/"Talon Pin" ("The owlbear hurls itself down onto a foe from a height it has climbed to, slamming them to the ground under its weight and pinning them beneath its hooked talon [shape fit, no verb match]")
[reskin] signature idea (trait): "Its shaggy bear-owl hide muffles sound and its gripping talons catch any surface, so it moves through trees and over stone without a whisper and can cling to a trunk or wall as easily as stand on flat ground. Prey rarely hears it coming until the feathers are already on them, and once latched onto a climbable surface it cannot be shaken loose by shoving or striking." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — spider-climb (climb, climbs, climbing)
[reskin] signature template (trait): spider-climb -> Traits/"Silent Clamber" ("Its gripping talons let it move over stone and cling to a trunk or wall as easil [verb: climb:concept, climbs:concept, climbing:concept, walls:idea, wall:idea, cling:idea]")
[reskin] weapons answered: Talons = none
[reskin] print canon attack: "Talons" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "the owlbear makes two Rend attacks." — the Owlbear's own
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon skills: "Perception +3, Stealth +3" -> "Perception +5" — the Owlbear's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Owlbear's
[reskin] print canon: chassis row leaves — Traits/"Canopy Brawler" is the seat's, not the Owlbear's
[reskin] multiattack replacement clause: It can replace one attack with a use of Talon Pin.
[reskin] row binds its clause: "Silent Clamber" answers "has learned to climb" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Scree-Pit — a homebrew with a nova

**Concept:** a quarry-pit thing of living scree that buries what it catches

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Scree-Pit | 5 (2014) | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 6 → 4; sustained 32 (2 × Slam); nova Grinding Avalanche 28; dmg 40

```
Scree-Pit
Large elemental, neutral
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

Buried in the Scree. When the scree-pit engulfs a creature, the engulfed creature is buried within the mass, remaining blinded and restrained and unable to breathe or speak while engulfed.
Engulfing Scree. The ground within 10 feet of the scree-pit is difficult terrain.
Engulf. As a bonus action, the scree-pit engulfs one Medium or smaller creature it is grappling. While engulfed, the target is blinded and restrained, has total cover against attacks and other effects outside the scree-pit, and takes 7 (2d6) acid damage at the start of each of the scree-pit's turns. The scree-pit can have only one creature engulfed at a time. If the scree-pit takes 15 damage or more in a single turn from the engulfed creature, the scree-pit must expel the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the scree-pit. If the scree-pit dies, an engulfed creature pulls free of the mass prone by using 5 feet of movement.

Actions
Multiattack: The scree-pit makes two Slam attacks.
Slam: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained.
Grinding Avalanche (Recharge 5-6): Each creature within 10 feet of the scree-pit must make a DC 14 Strength saving throw, taking 28 (8d6) bludgeoning damage on a failed save, or half as much damage on a successful one.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Slam — the chassis
- Actions/Grinding Avalanche — template ground-burst; library draw (seed unstamped); binds the GM's words: around it
- Bonus Actions/Engulf — binds the GM's words: engulf+swallow+swallows+engulfs+devour+devours+gulp+smother+entomb+cocoon+whelm
- Traits/Buried in the Scree — authored for this sheet; the GM's clause "buries what it catches"
- Traits/Engulfing Scree — template aberrant-ground; library draw (seed unstamped); binds the GM's words: scree+rubble+footing+ground around it

**Engine trace**

```
[path] homebrew — "a quarry-pit thing of living scree that buries what it catches" (call)
[route] brute-grappler type=Elemental mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "buries what it catches" | brute-grappler: ✓ ("buries what it catches") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental themes=elemental/grasping mind=mindless style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: rises from a heap of loose scree to strike [behavior] | pours itself over prey to bury and grind them [behavior] | body of living quarry rubble [body]
[concept] identity: The scree-slide lurks at the bottom of its quarry pit, coiled in plain sight as an ordinary heap of loose stone until prey wanders within reach — then the heap rises, pours itself over the victim, and grinds it down into the rubble that makes up its own body. Every round after, it drags its half-buried catch deeper into its stony mass while adding fresh scree to its bulk, and it never flees: the pit is its body, its larder, and its grave all at once. It fights without malice or tactics beyond patience — a rockslide that has learned to wait.
[concept] lore: Born when a quarry's dead were left beneath the spoil and the mountain's irritation woke, the scree-pit keeps what it catches, adding bones and all to the ever-growing heap it wears as a body.
[reskin] donor: brute-5-grappler -> CR 5
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] engulf engine: Engulf — the body's own verb
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the scree-pit" — the call's own answer (kind), built from the name
[reskin] inline form: "the scree-pit" — the model's own reading of the name
[reskin] save dc derived: DC 13, 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a quarry-pit thing of living scree" -> has (descriptive), head | "buries what it catches" -> has (mechanical) [asked: on_hit/condition]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The scree-pit heaves itself up in a grinding avalanche of stone, spilling a choking tide of loose scree across the ground around it. Everyone caught in the slide is dragged down and shoved back, feet skidding and sliding on the shifting rubble, and the heap settles higher and bulkier where it falls, making the pit's ground treacherous for anyone trying to cross or climb it." [action/always/movement] — menu: swallow, condition-payoff, shield-bash, active-toll, random-ray, ground-burst, spew, burrow-ambush, herd, thrown-burst-seed, drain, wind-up, exploiter, seal, lure, pacify, snare-bolt, sensory-strike, zone-seed (+ shelf: leap, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, feint-slip, stunning-strike, charge-push, pounce)
[reskin] value check: "Grinding Avalanche (Recharge 5-6)" EV 43.4 vs floor 28.7 (the whole Multiattack (2 attacks)) — dice 17 → 28 (nova budget)
[reskin] signature template: ground-burst -> Actions/"Grinding Avalanche (Recharge 5-6)" ("The scree-pit heaves up and spills scree around it, catching everyone nearby in  [verb: around it:idea]")
[reskin] signature idea (trait): "The scree-pit's body is an ever-grinding heap of loose quarry rubble: every stone that strikes it knocks fresh gravel loose, and the ground around it slowly fills with sliding scree that makes footing uncertain for anything that walks. It wears whatever it catches — bone, gear, and all — as part of its bulk, and the heap grows heavier and broader the longer it goes unkilled." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, assassinate (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — aberrant-ground, terrain-walk, faultless-tracker (scree, quarry)
[reskin] word match declined by the call: terrain-walk, faultless-tracker, false-appearance, earth-glide — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "aberrant-ground" as nearest; it lands rather than the row being dropped (what it wanted: catches and buries a creature inside its own bulk, holding it there and crushing)
[reskin] [gap] catches and buries a creature inside its own bulk, holding it there and crushing it over time — "The scree-pit's body is an ever-grinding heap of loose quarry rubble: every stone that strikes it knocks fresh gravel loose, and the ground around it slowly fills with sliding scree that makes footing uncertain for anything that walks. It wears whatever it catches — bone, gear, and all — as part of its bulk, and the heap grows heavier and broader the longer it goes unkilled." — Scree-Pit [seat: trait [trait/always/damage]] (closest offered: aberrant-ground) [effect: condition] [nearest landed] [menu: aberrant-ground terrain-walk faultless-tracker false-appearance adhesive phobia web-walker noxious-aura bloodied-fury uncanny-sense earth-glide tunneler berserk shielded-mind relentless-pursuit bound marking-light sealed-body undead-fortitude mimicry truth-aura gaze-aura death-burst assassinate] [same-cell unoffered: throw-retrieve own-turn-punisher coating] [same-seat rejected: spider-climb:legality evasion:role guarded-stance:role assassinate:role blurred-form:role]
[reskin] signature template (trait): aberrant-ground -> Traits/"Engulfing Scree" ("The scree-pit's body is an ever-grinding heap of loose quarry rubble: every stone that strikes it knocks fresh gravel loose, and the ground around it slowly fil [verb: scree:concept, rubble:idea, footing:idea, ground around it:idea]")
[reskin] repair: 1 clause(s) with no row — "buries what it catches"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced []
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Slam = none
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a quarry-pit thing of living scree that " and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] ask vs row MISMATCH: "buries what it catches" -> "Buried in the Scree" — trigger: asked on_hit, row reads at_will
audit finding below confidence gate: Engulf. Three separate expulsion/release procedures (repeat-expel threshold, death release, and the earlier Blinded/Restrained state) must be tracked mid-combat, and the death clause 'pulls free ... by using 5 feet of movement' has no timing anchor and conflates free movement with an action.
audit finding below confidence gate: Slam. Restrained on a Grappled target is redundant with the existing Grappled escape DC 14, but the block presents it as a separate condition with no listed exit, inviting a GM to look for a missing save.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] record reconciled: "Buried in the Scree" no longer imposes Restrained — the clause left, so the record goes with it
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

Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead.
Sight Weakness. The dragon has disadvantage on Wisdom (Perception) checks that rely on sight.

Actions
Multiattack: The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray.
Rend: Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 13 (1d10 + 8) slashing damage plus 5 (2d4) fire damage. If the dragon moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 13 (3d8) fire damage and, if it is Large or smaller, is pushed up to 10 feet straight away from the dragon and is knocked prone.
Spellcasting: The dragon casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 20, +12 to hit with spell attacks): -

At will: command, detect magic, scorching ray

1/day each: fireball
Fire Breath (Recharge 5-6): Each creature in a 60-foot cone must make a DC 21 Dexterity saving throw, taking 59 (17d6) fire damage on a failed save, or half as much damage on a successful one.
Legendary Actions

The dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The dragon regains spent legendary actions at the start of its turn.

Commanding Presence: The dragon uses Spellcasting to cast command (cast at 2nd level). The dragon can't take this action again until the start of its next turn.
Fiery Rays: The dragon uses Spellcasting to cast scorching ray. The dragon can't take this action again until the start of its next turn.
Pounce: The dragon moves up to half its speed, and it makes one Rend attack.
```

**Where each row came from**

- Traits/Legendary Resistance — the chassis
- Traits/Sight Weakness — the chassis
- Actions/Multiattack — the chassis
- Actions/Rend — print's own row, renamed
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
[concept] hints: dragon→body ✓ ("Adult Red Dragon")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/terror mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Adult Red Dragon"
[concept] mechanics: breath
[concept] signature elements: the ruined lanced eye it baits prey with [body] | cone of flame as opening and pressure [behavior] | hoard-guarding fury that never flees [behavior]
[concept] identity: An old adult red dragon whose left eye is a lanced ruin, it opens by strafing the field with fire breath from its blind side, then crashes down to fight half by feel and half by fury — snapping at whatever noise betrays a target, deliberately using its dead eye as bait by turning it toward prey so they strike the wrong flank. Wounded, it does not flee but turns methodical, wreathed in flame and pressing the attack to force foes into its one good line of sight, fighting to the death with the patience of a creature that has already survived worse.
[concept] lore: It took a knight's lance through the eye defending its mountain hoard and has burned away every village within sight of the wound ever since, keeping the old iron shaft-joint as a grim trophy in its lair.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] print canon defenses: HP 256 -> 256, AC 20 -> 19 — the Adult Red Dragon's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 27, DEX 10, CON 25, INT 16, WIS 13, CHA 23 — the Adult Red Dragon's at its own CR; attack +10 -> +14, DC 21 (print's)
[reskin] donor: dragon-15 -> CR 17
[reskin] [path] decides: twist on the Adult Red Dragon (the matcher agrees)
[reskin] print canon: "Adult Red Dragon — blind in one eye from an old lance" heads on the Adult Red Dragon — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the dragon" — the call answered "the dragon" (kind), which the name does not support
[reskin] inline form: "the dragon" — the model's own reading of the name
[reskin] spell DC coherence: DC 19 -> 20 off Charisma 23 (print's array stays)
[reskin] save dc derived: DC 19 -> 20 (8 + PB 6 + Charisma's 6) — no stat on the sheet reached it
[reskin] lacks asked: "blind in one eye"
[reskin] clauses: "Adult Red Dragon — blind in one eye from an old lance" -> LACKS (mechanical)
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, exploiter, sensory-strike, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (the sheet cannot render them)
[reskin] signature idea (action): "The dragon swings its ruined, lance-scarred eye socket toward a cluster of foes and lets them commit to striking the dead side, then whips its whole neck around in a quarter-circle sweep of its good eye and its jaws. Anything caught in that sweeping arc is snapped at and shoved hard off its feet in the direction the dragon is turning, herded like cattle toward the dragon's one seeing flank. It is " [rider/on_hit/movement] — menu: contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: snare, condition-payoff, execute, throw-retrieve, seal, shield-bash, lure, lay-on-hands, second-wind)
[reskin] signature bound to the concept's verb: action — charge, throw-retrieve (lance)
[reskin] word match declined by the call: charge, throw-retrieve, condition-payoff — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "charge-push" as nearest; it lands rather than the row being dropped (what it wanted: hits multiple creatures in a sweeping arc and pushes them in the direction of th)
[reskin] [gap] hits multiple creatures in a sweeping arc and pushes them in the direction of the dragon's turn, not one target away fro — "The dragon swings its ruined, lance-scarred eye socket toward a cluster of foes and lets them commit to striking the dead side, then whips its whole neck around in a quarter-circle sweep of its good eye and its jaws. Anything caught in that sweeping arc is snapped at and shoved hard off its feet in the direction the dragon is turning, herded like cattle toward the dragon's one seeing flank. It is " — Adult Red Dragon [seat: action [rider/on_hit/movement]] (closest offered: charge-push) [effect: movement] [nearest landed] [menu: charge throw-retrieve contagion stunning-strike charge-push hook-rider pounce condition-payoff] [same-cell unoffered: bolt-drag] [same-seat rejected: affliction:legality isolation:role snatch:legality bolt-restrain:legality bolt-drag:legality bolt-mark:legality]
[reskin] pick kept on the GM's own words: action — "charge-push" has no key-table verb, but the call quotes "adult red dragon blind in one eye from an old lance" from the description
[reskin] seat takes its clause: "Blinded-Side Sweep" answers "Adult Red Dragon — from an old lance" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature rider: charge-push -> Bite (appended; The idea is a deceptive head-turn that catches foes in a sweeping jaw arc and sh [shape fit, no verb match])
[reskin] signature idea (trait): "The dead eye is bait that the dragon offers on purpose. Whenever foes press in on the blind side and swing at it, the dragon pivots on the wound at the last instant and answers from its good side, so the strikes that seemed safe land on scarred scale and iron-hard neck while its counterattack comes out of the flank they thought was covered." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, blurred-form, death-burst)
[reskin] word match declined by the call: heated-body, resonant-body — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "weapon-lodge" as nearest; it lands rather than the row being dropped (what it wanted: turns a missed or baited strike into a reposition and counterattack from the oth)
[reskin] [gap] turns a missed or baited strike into a reposition and counterattack from the other side — "The dead eye is bait that the dragon offers on purpose. Whenever foes press in on the blind side and swing at it, the dragon pivots on the wound at the last instant and answers from its good side, so the strikes that seemed safe land on scarred scale and iron-hard neck while its counterattack comes out of the flank they thought was covered." — Adult Red Dragon [seat: trait [trait/on_being_hit/damage]] (closest offered: weapon-lodge) [effect: movement] [nearest landed] [menu: heated-body absorption bloodied-burst resonant-body weapon-lodge bloodied-fury shielded-mind] [same-cell unoffered: ward-retaliation snap-shot riposte] [same-seat rejected: none]
[reskin] trait declined: "Blindside Feint" — no receipt: the call quoted none of the GM's words for it and it bound on no concept key (1d: the receipt is the gate, not the body's substance)
[reskin] weapons answered: Bite = none; Fire Breath = none; Dead-Eye Feint = none; Snapping Lunge = none; Crippled Wingbeats = none; Scarrending Roar = none
[reskin] chassis nova: "Fire Breath (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] print canon alignment: Neutral Evil -> Chaotic Evil — the Adult Red Dragon's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Bite" -> "Rend" — the Adult Red Dragon's own row
[reskin] print canon multiattack: "the dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast *Scorching Ray*." — the Adult Red Dragon's own
[reskin] element immunity: Fire (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 -> 60
[reskin] dragon spell DC derived: 20 (8 + PB + Cha mod — the breath keeps the card DC)
[reskin] dragon mental save DC derived: "Scarrending Roar" -> 20 (the Frightful Presence class keys to Charisma)
[reskin] immunities stamped for type: Dragon -> Fire
[reskin] print canon skills: "Perception +7, Stealth +6" -> "Perception +13, Stealth +6" — the Adult Red Dragon's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Fire Breath (Recharge 5-6)" is the seat's nova, not the Adult Red Dragon's
[reskin] print canon legendary: Commanding Presence, Fiery Rays, Pounce — the Adult Red Dragon's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Fire Breath (Recharge 5-6) — the Adult Red Dragon's own
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rewrite blocked — "Commanding Presence" is engine-authored chassis text
[reskin] audit rewrite blocked — "Fiery Rays" is engine-authored chassis text
[reskin] flaw row: "Sight Weakness" — "Adult Red Dragon — blind in one eye from an old lance" removed no row, so the absence costs the creature something instead (print's grammar: 11 of 329 blocks carry one; owner's ruling 1f)
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Glacier Heart — bands soft

**Concept:** a glacier's heart given legs, trailing a wake of killing cold

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Glacier Heart [seed 1/2] | 15 (2014) | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 12.5 (print at 15 reads 7–15, n=12)
- **dropped clause:** "trailing a wake of killing cold"
- read: def 10 / off 15 → 12.5; sustained 68 (2 × Ice Leg); nova Freezing Gale 71; dmg 93

```
Glacier Heart
Large elemental, neutral
Armor Class

16 (natural armor)

Hit Points: 

209 (22d10 + 88)

Speed: 

30 ft.

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

darkvision 60 ft., passive Perception 15

Languages: 

None

Challenge

15 (13,000 XP)

Proficiency Bonus:

+5

Glacial Step. Difficult terrain composed of ice or snow doesn't cost the glacier heart extra movement, and the glacier heart can move across ice or snow without needing to make an ability check.
Cold Absorption. Whenever the glacier heart is subjected to cold damage, it takes no damage and instead regains a number of hit points equal to the cold damage dealt.
Siege Monster. The glacier heart deals double damage to objects and structures.

Actions
Multiattack: The glacier heart makes two Ice Leg attacks. It can replace one attack with a use of Rime Strike.
Ice Leg: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage plus 13 (3d8) cold damage.
Freezing Gale (Recharge 5-6): Each creature in a 30-foot cone must make a DC 17 Constitution saving throw, taking 71 (13d10) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also poisoned until the end of its next turn.
Rime Strike: One creature within 60 feet of the glacier heart that is poisoned must make a DC 17 Constitution saving throw, taking 63 (14d8) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also poisoned until the end of its next turn.
```

**Where each row came from**

- Traits/Glacial Step — template terrain-walk; library draw (seed unstamped); binds the GM's words: glacier+ice+frozen+wades
- Traits/Cold Absorption — the chassis
- Traits/Siege Monster — the chassis
- Actions/Multiattack — the chassis
- Actions/Ice Leg — the chassis
- Actions/Freezing Gale — the chassis
- Actions/Rime Strike — library seed condition-payoff

**Engine trace**

```
[path] homebrew — "a glacier's heart given legs, trailing a wake of killing cold" (call)
[route] brute-juggernaut type=Elemental mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a glacier's heart given legs") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental themes=elemental/terror mind=mindless style=juggernaut energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: a glacier's heart walking on legs of black ice [body] | a trailing wake of killing cold [aura] | breaking off slabs of itself to crush what stands in its way [behavior]
[concept] identity: The glacier's heart strides into battle already trailing its killing cold, so the first thing foes feel is the wake — a widening lane of frostbitten ground and numbed limbs that rewards it for simply advancing. Every round after that it wades forward on legs of blue-black ice, shouldering through anything shaped like an obstacle and letting great slabs of itself break off and crash down on whoever stands closest, then grinding the fallen into the frozen floor. It does not flee and it does not scheme; it is a slow, patient pressure of cold and mass that ends when the terrain around it is flat, silent, and still.
[concept] lore: Ripped from the basal ice of a living glacier by a power that wanted a heart it could walk around in, it wanders the high country trying to return to the ice sheet it was carved from, freezing the ground behind it so the path back never thaws.
[reskin] donor: brute-9-juggernaut -> CR 15
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Cold Wake = literal
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the glacier heart" — the call's own answer (kind), built from the name
[reskin] inline form: "the glacier heart" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 17 (8 + PB 5 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a glacier's heart given legs" -> has (descriptive), head | "trailing a wake of killing cold" -> has (mechanical) [asked: at_will/save_area]
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The glacier heart spends a beat of stillness, then drives a foot down and lets a shoulder-sized slab shear off its own flank and crash to the ground beside it. The slab hits whatever it lands on with the full weight of the ice it was cut from, and it shatters into a field of jagged shards that stay where they fell. The shards make that patch of ground treacherous; anyone moving through it has to s" [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider, pounce, isolation, charge (+ shelf: condition-payoff, shield-bash, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter, gaze-single, snare, execute, seal, lure, pacify, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — execute (kill)
[reskin] closest refused: action — "charge [Rider]" was named closest but was never on this sheet's menu
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown execute, which the GM's words keyed
[reskin] [gap] leaves a persistent difficult-terrain shard field where the slab lands rather than just adding damage or knocking the ta — "The glacier heart spends a beat of stillness, then drives a foot down and lets a shoulder-sized slab shear off its own flank and crash to the ground beside it. The slab hits whatever it lands on with the full weight of the ice it was cut from, and it shatters into a field of jagged shards that stay where they fell. The shards make that patch of ground treacherous; anyone moving through it has to s" — Glacier Heart [seat: action [rider/on_hit/damage]] (closest offered: charge [Rider] — NOT ON THE MENU) [effect: movement] [row dropped] [menu: execute stunning-strike charge-push hook-rider pounce isolation charge condition-payoff herd exploiter pacify] [same-cell unoffered: none] [same-seat rejected: affliction:legality contagion:legality isolation:role snatch:legality bolt-restrain:role bolt-drag:role bolt-mark:role charge:style]
[reskin] key match declined: action — "execute" was ranked first on the call's own menu for kill, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The glacier heart spends a beat of stillness, then drives a foot down and lets a shoulder-sized slab shear off its own flank and crash to the ground beside it. The slab hits whatever it lands on with the full weight of the ice it was cut from, and it shatters into a field of jagged shards that stay where they fell. The shards make that patch of ground treacherous; anyone moving through it has to s" [rider/on_hit/damage] — the model found no template that holds it (offered: execute, stunning-strike, charge-push, hook-rider, pounce, isolation, charge, condition-payoff, herd, exploiter, pacify)
[reskin] value check: "Merciless Strike" EV 53.2 vs floor 41.6 (one attack of 2) — worth the trade
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The glacier heart's legs are sheer black ice, and whatever it wades through gets numbed where it stood, not pushed aside. Ground it walks across becomes slick and frozen while the heart remains sure-footed on it, turning the field itself into part of its slow, patient advance." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk, aberrant-ground, faultless-tracker (glacier, wake, trail)
[reskin] word match declined by the call: aberrant-ground — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "terrain-walk" as nearest; it lands rather than the row being dropped (what it wanted: leaves behind a slick frozen patch of terrain that slows other creatures while t)
[reskin] [gap] leaves behind a slick frozen patch of terrain that slows other creatures while the creature moves at full speed through  — "The glacier heart's legs are sheer black ice, and whatever it wades through gets numbed where it stood, not pushed aside. Ground it walks across becomes slick and frozen while the heart remains sure-footed on it, turning the field itself into part of its slow, patient advance." — Glacier Heart [seat: trait [trait/always/movement]] (closest offered: terrain-walk) [effect: movement] [nearest landed] [menu: terrain-walk aberrant-ground faultless-tracker false-appearance adhesive phobia web-walker noxious-aura bloodied-fury uncanny-sense berserk shielded-mind relentless-pursuit bound marking-light undead-fortitude mimicry truth-aura gaze-aura death-burst] [same-cell unoffered: blink spider-climb earth-glide tunneler zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: spider-climb:legality earth-glide:legality tunneler:legality evasion:role sealed-body:legality guarded-stance:role assassinate:role blurred-form:role]
[reskin] signature template (trait): terrain-walk -> Traits/"Killing Cold Wake" ("The heart numbs the ground it crosses into slick, frozen terrain it alone can tr [verb: glacier:concept, ice:idea, frozen:idea, wades:idea]")
[reskin] weapons answered: Ice Leg = none
[reskin] chassis nova: "Cold Wake (Recharge 5-6)" — the brute-9-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] trait stripped: Traits/Immutable Form — a golem's trait on a Elemental
[reskin] defenses by material: a ice body is vulnerable to Fire and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] absorption re-keyed: Acid -> Cold (the donor organ obeys the concept energy)
[reskin] immunities stamped for type: Elemental -> Cold, Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a glacier's heart given legs, trailing a" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Merciless Strike.
[reskin] asked but unanswered: "trailing a wake of killing cold" asked for at_will and no row binds the clause
[reskin] name follows content: Traits/"Killing Cold Wake" carries Cold the row never deals — "Killing Wake" (the element word drops; the call's own noun stays)
[reskin] save stat from print grammar: Actions/Cold Wake imposes Poisoned by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] audit rename: "Cold Wake (Recharge 5-6)" -> "Freezing Gale (Recharge 5-6)"
[reskin] audit rename: "Merciless Strike" -> "Rime Strike"
[reskin] audit rename: "Killing Wake" -> "Glacial Step"
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Rime Strike) — the sameness metric
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Chrism-Fed Reliquivore — bands soft

**Concept:** a cathedral-vault ooze that digests reliquaries

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Chrism-Fed Reliquivore | 9 (2014) | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6.5 (print at 9 reads 5.5–13, n=8)
- read: def 5 / off 8 → 6.5; sustained 56 (2 × Pseudopod); nova none; dmg 56

```
Chrism-Fed Reliquivore
Huge ooze, unaligned
Armor Class

10 (natural armor)

Hit Points: 

161 (17d12 + 51)

Speed: 

20 ft., climb 20 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

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

Amorphous. The reliquivore can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form. A creature that touches the reliquivore or hits it with a melee attack while within 5 feet of it takes 9 (2d8) acid damage.
Spider Climb. The reliquivore can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The reliquivore makes two Pseudopod attacks. It can replace one attack with a use of Chrism Lash.
Pseudopod: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 28 (7d6 + 4) acid damage.
Chrism Lash: One Large or smaller creature within 30 feet of the reliquivore must make a DC 15 Strength saving throw, taking 14 (4d6) acid damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also pulled up to 20 feet straight toward the reliquivore.
```

**Where each row came from**

- Traits/Amorphous — the chassis
- Traits/Corrosive Form — the chassis
- Traits/Spider Climb — the chassis
- Actions/Multiattack — the chassis
- Actions/Pseudopod — the chassis
- Actions/Chrism Lash — template reel; library draw (seed unstamped); binds the GM's words: pull+drag+yank

**Engine trace**

```
[path] homebrew — "a cathedral-vault ooze that digests reliquaries" (call)
[route] ooze type=Ooze mechanics=grapple — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "digests reliquaries" | ooze: ✓ ("cathedral-vault ooze") | ooze: no line key in the words — the model's read of its quote
[concept] hints: ooze→body ✓ ("a cathedral-vault ooze") | engulf→mechanics ✓ ("digests reliquaries")
[concept] resolve: archetype=ooze type=Ooze themes=grave/devouring mind=mindless style=— energy=Acid mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple
[concept] signature elements: digesting reliquaries and gilded shrines [behavior] | a slick of rot-resin that was a cathedral vault [body] | the grave-cold hush of a flooded crypt [aura]
[concept] identity: The cathedral-vault ooze does not lurk in a crypt — it *is* the vault, spreading a slick of rot-slick resin across the ossuary floor until reliquaries sink into it and are slowly dissolved out of their gold. Every round it presses forward to engulf the next shrine and whatever guards it, digesting consecrated bone and gilded casing alike, and it does not flee when bloodied — it simply closes over the wound and pulls the fight deeper into itself.
[concept] lore: Born where a collapsed cathedral's crypt flooded with centuries of decayed saints and spilled chrism, the vault-ooze has learned that holiness is edible and now roams ruined sanctuaries searching for the next relic to swallow.
[reskin] body type: ooze — the body outranks the role (recorded: ooze)
[reskin] donor: ooze-9 -> CR 9 (invented — no printed peer)
[reskin] row gated out: Engulf (engulf) — the concept did not claim this mechanic
[reskin] [path] decides: homebrew (the matcher would have said twist Gray Ooze)
[reskin] alignment by body: Neutral -> Unaligned — a Ooze at INT 2 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the reliquivore" — the call's own answer (kind), built from the name
[reskin] inline form: "the reliquivore" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "digests reliquaries" names no absence — nothing in it takes anything away
[reskin] clauses: "a cathedral-vault ooze" -> has (descriptive), head | "digests reliquaries" -> has (descriptive)
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, push-prone, herd, thrown-burst-seed, drain, zone-seed, wind-up, blighted-ground, disarm, delayed-brand, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The reliquivore floods a wide patch of the ossuary floor ahead of itself in rot-slick resin, a spreading shrine-stain that clings to gilded things and holy things first and drags them down. Anyone standing in it is slowed and pulled toward the ooze's body, and anything carried that is gilded or consecrated is yanked free and slid into the ooze by the same pull." [action/save/movement] — menu: trample, leap, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, reel (+ shelf: rampage, patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] closest accepted: action — the call refused every template but named "reel" as nearest; it lands rather than the row being dropped (what it wanted: creates a lasting patch of ground that slows creatures standing in it and pulls )
[reskin] [gap] creates a lasting patch of ground that slows creatures standing in it and pulls both creatures and their consecrated car — "The reliquivore floods a wide patch of the ossuary floor ahead of itself in rot-slick resin, a spreading shrine-stain that clings to gilded things and holy things first and drags them down. Anyone standing in it is slowed and pulled toward the ooze's body, and anything carried that is gilded or consecrated is yanked free and slid into the ooze by the same pull." — Chrism-Fed Reliquivore [seat: action [action/save/movement]] (closest offered: reel) [effect: movement] [nearest landed] [menu: trample leap thrown-burst gaze-single execute seal shield-bash wail lure hook-drag active-toll pull-through random-ray ground-burst spew reel hook-rider] [same-cell unoffered: aggro-curse obstacle-pull slow-bolt disarm herd] [same-seat rejected: swallow:legality snare:role reel:role condition-payoff:legality burrow-ambush:legality disarm:role curse-debt:role reveal:role exploiter:legality]
[reskin] value check: "Chrism Sluice" EV 14.6 vs floor 14 (one attack of 2) — added Success: Half
[reskin] signature template: reel -> Actions/"Chrism Sluice" ("The idea is an area floor hazard that slows, pulls creatures, and strips gilded  [verb: pull:idea, drag:idea, yank:idea]")
[reskin] signature idea (trait): "The rot-resin slick trails behind the reliquivore wherever it crawls, pooling in the space it leaves. Its own touch is what dissolves gold and bone alike, so any gilded or consecrated object that touches the slick — dropped, set down, or left by a sinking shrine — is quietly consumed, up the slick, into the ooze." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — aberrant-ground (ooze)
[reskin] word match declined by the call: aberrant-ground, adhesive, uncanny-sense, warded-mending — the key word does not mean the mechanic here
[reskin] trait declined: "Relic Rot" — no receipt: the call quoted none of the GM's words for it and it bound on no concept key (1d: the receipt is the gate, not the body's substance)
[reskin] concept-first trait skipped: aberrant-ground — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Pseudopod = none; Consecrated Sink = none
[reskin] speed by concept: dropped Climb 20 ft. — the concept's movement set decides
[reskin] climb speed: Climb 20 ft. — a creature that climbs difficult surfaces has a Climb Speed in print (the Vampire, the Giant Spider)
[reskin] languages held: None stands — INT 2 on a Ooze speaks nothing, whatever the mind read said
[reskin] element immunity: Acid (merged into the header write)
[reskin] immunities stamped for type: Ooze -> Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained
[reskin] name-canon stands down: the path answered homebrew on "a cathedral-vault ooze that digests reli" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Chrism Sluice.
[reskin] audit rename: "Chrism Sluice" -> "Chrism Lash"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] size floor: STR 16 -> 18 — print prints no corporeal Huge body under 18 (the Archelon); the attack follows it, as print's own 49 do
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Grum the Cast-Out — bands soft

**Concept:** a stone giant exile who speaks only Giant and understands no Common

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Grum the Cast-Out | 9 (2014) | skirmisher-8 | ok | SOFT: band | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 7 (print at 9 reads 5.5–13, n=8)
- gates · soft · control-aoe-ungated: Actions/Horrid Display: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- read: def 7 / off 7 → 7; sustained 48 (3 × Stone Club); nova none; dmg 48

```
Grum the Cast-Out
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

Actions
Multiattack: Grum makes three attacks, using Stone Club or Boulder. It can replace one attack with a use of Horrid Display.
Stone Club: Melee Weapon Attack: +7 to hit, reach 15 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage.
Boulder: Ranged Weapon Attack: +7 to hit, range 60/240 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage.
Horrid Display: Each creature of Grum's choice within 30 feet of it that can see or hear it must succeed on a DC 18 Wisdom saving throw or be frightened of Grum until the end of its next turn.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Stone Club — print's own row, renamed; weapon club
- Actions/Boulder — print's own row
- Actions/Horrid Display — template terror-pulse; library draw (seed unstamped); binds the GM's words: roar+bellow

**Engine trace**

```
[path] twist — Stone Giant (is) — "stone giant" (call)
[route] skirmisher-hurler type=Giant mechanics=thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-hurler: ✓ ("a stone giant exile") | skirmisher-hurler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Giant themes=armed/terror mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: hurling boulders and heavy javelins [behavior] | a body of living stone [body] | roaring in a tongue no one understands [behavior]
[concept] identity: A stone giant cast out from its clan, it opens a fight by hurling boulders and heavy javelins from beyond reach, shouting its challenge in Giant to foes who cannot understand a word. Each round it keeps its distance while it can, then wades in with stone fists when cornered, and it never softens — it fights with the cold patience of an exile who has nothing left to lose and will not retreat from a fight it started. Because no one can talk to it, it reads every approach as a threat and starts every fight on its own terms.
[concept] lore: Driven from its clan for a crime the elders would not forgive, this exile haunts the badlands and throws down any traveler who strays into its territory, roaring its grievance in a tongue no one around it can answer.
[reskin] print canon route: the Stone Giant's body outranks the hurler seat — no verb in the words names it; the plain skirmisher line
[reskin] nova capped: "Sweeping Area Attack" 54 → 49 (the chassis nova obeys the cap: 50 at CR 9)
[reskin] print canon array: STR 23, DEX 16, CON 20, INT 10, WIS 12, CHA 9 — the Stone Giant's, DEX fitted to +7
[reskin] donor: skirmisher-8 -> CR 9
[reskin] [path] decides: twist on the Stone Giant (the matcher would have said homebrew)
[reskin] print canon: "a stone giant exile who speaks only Giant and understands no Common" heads on the Stone Giant — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "Grum" — the call's own answer (person), built from the name
[reskin] inline form: "Grum" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: "understands no Common"
[reskin] clauses: "a stone giant exile" -> has (descriptive), head | "speaks only Giant" -> has (header) | "understands no Common" -> LACKS (mechanical)
[reskin] menu pruned: action — thrown-burst-seed, push-prone, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Grum plants his feet and bellows a challenge in Giant — a roar that lands on everyone who couldn't answer him. Foes who can't understand the language are shaken by the sheer wrongness of it and break off their approach or stumble in their guard, while anyone who answers back in Giant is spared the worst of it; it can only be raised once before his voice gives out for the fight." [action/save/condition] — menu: gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, seal, pacify, escalating-dread, terror-pulse, reveal (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] word match declined by the call: terror-pulse, aggro-curse — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "terror-pulse" as nearest; it lands rather than the row being dropped (what it wanted: spares creatures who answer in Giant and is usable only once per fight)
[reskin] [gap] spares creatures who answer in Giant and is usable only once per fight — "Grum plants his feet and bellows a challenge in Giant — a roar that lands on everyone who couldn't answer him. Foes who can't understand the language are shaken by the sheer wrongness of it and break off their approach or stumble in their guard, while anyone who answers back in Giant is spared the worst of it; it can only be raised once before his voice gives out for the fight." — Grum the Cast-Out [seat: action [action/save/condition]] (closest offered: terror-pulse) [effect: resource] [nearest landed] [menu: gaze-single snare condition-payoff throw-retrieve shield-bash lure snare-bolt sensory-strike disarm exploiter seal pacify escalating-dread terror-pulse reveal aggro-curse] [same-cell unoffered: swallow noxious-aura truth-aura gaze-aura random-ray push-prone] [same-seat rejected: swallow:legality trample:legality leap:legality thrown-burst:legality reel:legality execute:role seal:role hook-drag:role active-toll:role pull-through:role random-ray:legality ground-burst:legality spew:legality burrow-ambush:legality obstacle-pull:role pacify:role escalating-dread:role terror-pulse:role slow-bolt:role push-prone:role herd:role drain:role curse-debt:role reveal:role wind-up:role blighted-ground:role]
[reskin] seat takes its clause: "Horrid Display (2/Day)" answers "a exile" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: terror-pulse -> Actions/"Horrid Display (2/Day)" ("Grum plants his feet and bellows a challenge in Giant — a roar that lands on everyone who couldn't answer him. Foes who can't understand the language are shaken [verb: roar:idea, bellow:idea]")
[reskin] signature idea (trait): "Grum reads every approach as an ambush. The first time each fight that a foe moves into reach of him, he reacts with his stone fist before that foe can act, punishing the one who dared come close." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] trait declined: "Ambush Reflex" — no receipt: the call quoted none of the GM's words for it and it bound on no concept key (1d: the receipt is the gate, not the body's substance)
[reskin] weapons answered: Stone Fist = none; Boulder = none; Javelin Volley = javelin
[reskin] weapon table: "Boulder" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] chassis nova: "Javelin Volley (Recharge 5-6)" — the skirmisher-8's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 50 ft. -> 40 ft. — the Stone Giant's walk; the concept's other modes stay
[reskin] print canon attack: "Stone Fist" -> "Stone Club" — the Stone Giant's own row
[reskin] print canon: chassis row leaves — Actions/"Javelin Volley (Recharge 5-6)" is the seat's nova, not the Stone Giant's
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Stone Giant's
[reskin] print canon: chassis row leaves — Traits/"Badlands Stride" is the seat's, not the Stone Giant's
[reskin] dead control row: "Horrid Display" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrid Display.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] lack took nothing: "understands no Common" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Reedmarch Sap-Keeper — bands soft

**Concept:** lizardfolk monk

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Reedmarch Sap-Keeper | 5 (2014) | skirmisher-3 | ok | SOFT: band, hot | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6.5 (print at 5 reads 2.5–9.5, n=25)
- bands · soft · hot: reads CR 6.5 (hot, within three)
- read: def 6 / off 7 → 6.5; sustained 46 (2 × Unarmed Strike); nova none; dmg 46

```
Reedmarch Sap-Keeper
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

Guarded Stance. While the sap-keeper doesn't have half of its hit points or fewer, melee attack rolls against it are made with disadvantage.
Hold Breath. The sap-keeper can hold its breath for 15 minutes.
Marsh Stride. Difficult terrain composed of mud doesn't cost the sap-keeper extra movement, and the sap-keeper can move across mud without needing to make an ability check.
Patient Defense. As a bonus action, the sap-keeper takes the Dodge action.
Marsh Ambush (1/Day). As a bonus action, the sap-keeper casts invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.
Cunning Action. As a bonus action, the sap-keeper takes the Dash, Disengage, or Hide action.

Actions
Multiattack: The sap-keeper makes two attacks: one with its Unarmed Strike and one with its Dart.
Unarmed Strike: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 23 (3d8 + 3) bludgeoning damage. Once on each of the sap-keeper's turns when it hits with this attack, the target is subjected to the following effect. The target must succeed on a DC 14 Constitution saving throw or be stunned until the end of the sap-keeper's next turn.
Dart: Ranged Weapon Attack: +6 to hit, range 20/60 ft., one target. Hit: 12 (2d8 + 3) piercing damage.
```

**Where each row came from**

- Traits/Guarded Stance — template guarded-stance; library draw (seed unstamped); binds the GM's words: guard
- Traits/Hold Breath — lizardfolk kit; the GM's clause "monk"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "monk"
- Actions/Multiattack — the chassis
- Actions/Unarmed Strike — print's own row, renamed; a declared feature; the GM's clause "monk"
- Actions/Dart — print's own row, renamed; weapon dart
- Bonus Actions/Patient Defense — template patient-defense; monk kit; the GM's clause "monk"
- Bonus Actions/Marsh Ambush — template self-invisibility; library draw (seed unstamped); binds the GM's words: unseen
- Bonus Actions/Cunning Action — print's own row

**Engine trace**

```
[path] class_npc — class monk — species lizardfolk — "monk" (call)
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("lizardfolk monk") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/aquatic mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: amphibious hit-and-run strikes [behavior] | scaled, tail-driven body [body] | coiled patience under pressure [behavior]
[concept] identity: A scale-clad lizardfolk monk that shadows prey from reed and rock, breaking cover to land a flurry of claw-and-tail strikes before melting back into the water it came from; every round it circles, waits for an ally to flank, and punishes overreach. Bloodied, it does not flee but slows into a coiled, patient guard, trading reach for footing and lashing out at anyone who closes — a swamp duelist to the last.
[concept] lore: Born of the drowned reed-temples, a lizardfolk monk trains its body into a weapon and guards the spawning shallows, judging intruders with the cold patience of a heron.
[reskin] [path] class body: the monk stands on the Spy — the class's own print block, nearest CR 5
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 5
[reskin] [path] decides: class_npc on the Spy · class monk (the matcher would have said homebrew)
[reskin] print canon: "lizardfolk monk" heads on the Spy — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear)
[reskin] row evicted for the cap: Traits/"Slick Skin" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "monk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Claw), Patient Defense (patient-defense)
[reskin] inline declared: "the sap-keeper" — the call's own answer (kind), built from the name
[reskin] inline form: "the sap-keeper" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "lizardfolk monk" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The sap-keeper slips beneath the surface of marsh water and mud, hiding completely from sight, then surges up at a foe that comes within reach, its first claw strike out of the water landing before the prey can gather itself and leaving that target unsettled and sloppy until its next breath. It can pull this ambush from hiding only when it has gone unseen first, so foes who catch it in the open ne" [trait/start_of_turn/condition] — menu: warded-mending (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] word match declined by the call: self-invisibility — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "self-invisibility" as nearest; it lands rather than the row being dropped (what it wanted: hiding in mud and water and landing a first strike from concealment that leaves )
[reskin] [gap] hiding in mud and water and landing a first strike from concealment that leaves the target Stunned — "The sap-keeper slips beneath the surface of marsh water and mud, hiding completely from sight, then surges up at a foe that comes within reach, its first claw strike out of the water landing before the prey can gather itself and leaving that target unsettled and sloppy until its next breath. It can pull this ambush from hiding only when it has gone unseen first, so foes who catch it in the open ne" — Reedmarch Sap-Keeper [seat: action [trait/start_of_turn/condition]] (closest offered: self-invisibility) [effect: condition] [nearest landed] [menu: warded-mending leap gaze-single spew self-invisibility focus feint-slip snap-shot riposte pounce] [same-cell unoffered: none] [same-seat rejected: fire-aura:legality]
[reskin] seat takes its clause: "Marsh Ambush (1/Day)" answers "lizardfolk" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: self-invisibility -> Bonus Actions/"Marsh Ambush (1/Day)" ("The idea is an unseen-ambush trait that stuns or unsettles a target hit by the f [verb: unseen:idea]")
[reskin] signature idea (trait): "Whenever a creature slips inside the sap-keeper's guard to strike it, the long tail snaps around and answers immediately, a sweeping lash that shoves the attacker back a step and opens the distance again. It cannot lash the same foe twice in a row, so pressing the attack still works — just never cheaply." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] word match declined by the call: adhesive, false-appearance, resonant-body, bloodied-burst, absorption — the key word does not mean the mechanic here
[reskin] seat takes its clause: "Guarded Stance" answers "lizardfolk" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): guarded-stance -> Traits/"Guarded Stance" ("Whenever a creature slips inside the sap-keeper's guard to strike it — melee att [verb: guard:idea]")
[reskin] weapons answered: Claw = none; Scale = none
[reskin] weapon table: "Scale" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] print canon modes: swim off — the Spy has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Swim 40 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Draconic — the concept names the species; print's NPCs of it speak it
[reskin] print canon languages: "Common, Draconic" -> "Common plus one other language, Draconic" — the Spy's plus the concept's Draconic
[reskin] print canon attack: "Claw" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Scale" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Bonus Actions/Cunning Action — the Spy's own
[reskin] class weapon: Actions/"Shortsword" -> "Unarmed Strike" — a monk fights with its hands, not the Spy's; the body's rider folds in (+7)
[reskin] class weapon: Actions/"Hand Crossbow" -> "Dart" — a monk fights with a dart, not the Spy's
[reskin] seed share: 0 of 3 signature row(s) came from a seed — the sameness metric
[reskin] species kit: Swim 30 ft. — a lizardfolk's own
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Krennik Skullstandard — bands soft

**Concept:** name: Krennik Skullstandard | riding a worg

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Krennik Skullstandard | 4 (2014) | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 2–6.5, n=13)
- read: def 1 / off 4 → 2.5; sustained 20 (2 × Scimitar); nova Ride-Down 22; dmg 28

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

Common, Orc

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Cavalry Pace. Krennik ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Mounted Agility. As a bonus action, Krennik takes the Dash or Disengage action.
Binding Mark (Bonus Action). One creature within 30 feet of Krennik must succeed on a DC 13 Wisdom saving throw or have disadvantage on attack rolls against creatures other than Krennik until the start of Krennik's next turn.

Actions
Multiattack: Krennik makes two attacks: one with Scimitar and one with Javelin.
Scimitar: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is knocked prone.
Javelin: Ranged Weapon Attack: +5 to hit, range 30/120 ft., one target. Hit: 7 (1d8 + 3) piercing damage.
Ride-Down (Recharge 5-6): Krennik moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Each creature whose space it enters must succeed on a DC 13 Strength saving throw or take 22 (5d8) bludgeoning damage and be knocked prone.
```

**Where each row came from**

- Traits/Cavalry Pace — the chassis
- Actions/Multiattack — the chassis
- Actions/Scimitar — weapon scimitar
- Actions/Javelin — weapon javelin
- Actions/Ride-Down — the chassis
- Bonus Actions/Mounted Agility — the chassis
- Bonus Actions/Binding Mark — template aggro-curse; library draw (seed unstamped); binds the GM's words: goad

**Engine trace**

```
[path] homebrew — "riding a worg" (call)
[route] skirmisher-mounted type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] name: "Krennik Skullstandard" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: mounted→style ✓ ("riding a worg")
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/armed mind=sapient style=mounted energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Krennik Skullstandard"
[concept] mechanics: none claimed
[concept] signature elements: ride-down charge that carries him past the target [behavior] | the skull standard banner on the long pole [object] | the worg mount he fights from [body]
[concept] identity: Krennik Skullstandard opens by spurring his worg into a full gallop and slamming through the nearest enemy line, a ride-down charge that leaves him a dozen paces past the last body. Every round he wheels, re-lines on stragglers and casters, and breaks their formation with another momentum-driven strike before the battle can set — always in motion, never in a stand-up fight. Under pressure he bleeds ground and calls the wolf off only when the odds are truly lost; a cornered Krennik fights to the death rather than surrender his standard.
[concept] lore: Krennik Skullstandard is a war-captain of the orc frontier clans who earns his rank by carrying his carved skull-totem into the thickest fighting, wanting booty, a famous name, and the fear that follows a banner that never falls back.
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
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Krennik plants the skull standard and lets out a war-cry that rolls across the field, goading enemies into breaking cover and charging him so his wolf can run them down in the open. Until the end of the fight, anyone who can see the banner is baited toward the nearest open ground — and if they fail to press the attack, they lose heart and stumble, unable to attack cleanly." [trait/start_of_turn/condition] — menu: warded-mending (+ shelf: condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] closest accepted: action — the call refused every template but named "aggro-curse" as nearest; it lands rather than the row being dropped (what it wanted: forces targets to move toward the banner's open ground and stumble if they refus)
[reskin] [gap] forces targets to move toward the banner's open ground and stumble if they refuse to attack — "Krennik plants the skull standard and lets out a war-cry that rolls across the field, goading enemies into breaking cover and charging him so his wolf can run them down in the open. Until the end of the fight, anyone who can see the banner is baited toward the nearest open ground — and if they fail to press the attack, they lose heart and stumble, unable to attack cleanly." — Krennik Skullstandard [seat: action [trait/start_of_turn/condition]] (closest offered: aggro-curse) [effect: movement] [nearest landed] [menu: warded-mending exploiter aggro-curse riposte charge] [same-cell unoffered: none] [same-seat rejected: fire-aura:legality]
[reskin] value check: "Binding Mark" EV 3 vs floor 1.6 (a bonus action (free)) — worth the trade
[reskin] signature template: aggro-curse -> Bonus Actions/"Binding Mark" ("The idea is a banner war-cry that goads enemies into open ground and punishes th [verb: goad:idea]")
[reskin] signature idea (trait): "Whoever knocks Krennik's banner-pole aside or grapples him mid-gallop is dragged along in the wolf's momentum, carried out of their own formation and deposited sprawling where the worg runs. The standard never falls: every time Krennik is struck while mounted, the totem whips around and lashes the striker in return." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "Whoever knocks Krennik's banner-pole aside or grapples him mid-gallop is dragged along in the wolf's momentum, carried out of their own formation and deposited sprawling where the worg runs. The standard never falls: every time Krennik is struck while mounted, the totem whips around and lashes the striker in return." [trait/on_being_hit/movement] — no template on the shelf shares a verb with the concept or the idea (offered: absorption, bloodied-burst, resonant-body, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] weapons answered: Scimitar = scimitar; Javelin = javelin
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] chassis nova: "Ride-Down (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] name-canon stands down: the path answered homebrew on "riding a worg" and named no print body — no published trait lands on a word alone (owner's ruling)
audit finding below confidence gate: Mounted Agility The entry name promises mounted movement, but the block never establishes Krennik as mounted and the mechanic is a plain Dash/Disengage; the name's framing has no mechanic to deliver.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Hydra — in the run

**Concept:** name: Hydra | whose stumps smoke instead of regrowing

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hydra | 8 (2014) | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 8 / off 3 → 5.5; sustained 10 (1 × Bite); nova none; dmg 10

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

darkvision 60 ft., tremorsense 30 ft., passive Perception 16

Languages: 

None

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Hold Breath. The hydra can hold its breath for 1 hour.
Multiple Heads. The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead.
Reactive Heads. For each head the hydra has beyond one, it gets an extra reaction that can be used only for opportunity attacks.

Actions
Multiattack: The hydra makes as many Bite attacks as it has heads.
Bite: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage. If the target is a creature, it is subjected to the following effect. The target must make a DC 16 Constitution saving throw. On a failure, the target is poisoned. While poisoned this way, the target can't regain hit points. The condition lasts until the target finishes a long rest or is cured by the lesser restoration spell or similar magic. On a success, the target is immune to this creature's contagion for 24 hours.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Bite — print's own row
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
[concept] signature elements: many heads biting in a press [behavior] | smoking stumps where severed necks will not regrow [body] | knitting hide that seals its wounds [body]
[concept] identity: The Hydra is a many-headed Monstrosity of living hide, and it fights by wading in and setting its broad jaws to work: each bite tears and, worse, leaves a smoking stump where the flesh knits too fast, fuming a churning veil around the body. Every round after that it presses forward, working the front with lashing necks as the smoke thickens, trading blows it can afford to take. Under pressure it does not withdraw — cauterized stumps furious, it doubles down and bites for the throat, fighting to the death unless driven off by true fire or its bane.
[concept] lore: Drawn up from a fen where the veil smolds underground, the Hydra gorges to keep its ever-closing flesh fed; each wound it is given vents smoke from a stump that will not regrow, but seals over in steaming hide.
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
[reskin] clauses: "Hydra — whose stumps smoke instead of regrowing" -> LACKS (mechanical) [asked: on_being_hit]
[reskin] signature idea (action): "The Hydra drives forward with every neck it has left, biting all around itself at once and leaving smoking stumps behind. Any foe still standing near it after that flurry finds its wounds have begun to knit shut with hot fuming hide, closing up the harm it just took." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge, isolation (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, zone, zone-seed, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — zone, zone-seed (smoke)
[reskin] word match declined by the call: zone, zone-seed — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "contagion" as nearest; it lands rather than the row being dropped (what it wanted: prevents the hydra's severed necks/stumps from regenerating and instead vents th)
[reskin] [gap] prevents the hydra's severed necks/stumps from regenerating and instead vents them as smoke, denying it its regrowth — "The Hydra drives forward with every neck it has left, biting all around itself at once and leaving smoking stumps behind. Any foe still standing near it after that flurry finds its wounds have begun to knit shut with hot fuming hide, closing up the harm it just took." — Hydra [seat: action [rider/on_hit/damage]] (closest offered: contagion) [effect: defense] [nearest landed] [menu: zone zone-seed affliction contagion stunning-strike charge-push hook-rider pounce charge isolation ground-burst herd rampage] [same-cell unoffered: none] [same-seat rejected: isolation:role snatch:legality bolt-restrain:role bolt-drag:role bolt-mark:role]
[reskin] pick kept on the GM's own words: action — "contagion" has no key-table verb, but the call quotes "smoke instead of regrowing" from the description
[reskin] seat takes its clause: "Smoking Stumps" answers "Hydra — whose stumps smoke" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature rider: contagion -> Bite (appended; The idea's aftermath clause — wounds knitting shut with hot fuming hide — is reg [shape fit, no verb match])
[reskin] signature idea (trait): "Each cut that doesn't kill the Hydra seals over in steaming hide rather than regrowing a head, and the smoke pouring off those stumps blinds and chokes anything that stays close. The more it's wounded, the thicker the veil, until attackers at arm's reach are wheezing and swinging blind." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — warded-mending (regrows)
[reskin] word match declined by the call: warded-mending, sealed-body — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "bloodied-burst" as nearest; it lands rather than the row being dropped (what it wanted: A persistent aura from the creature's smoking stumps that grows stronger the mor)
[reskin] [gap] A persistent aura from the creature's smoking stumps that grows stronger the more wounded it is, imposing blinded or poi — "Each cut that doesn't kill the Hydra seals over in steaming hide rather than regrowing a head, and the smoke pouring off those stumps blinds and chokes anything that stays close. The more it's wounded, the thicker the veil, until attackers at arm's reach are wheezing and swinging blind." — Hydra [seat: trait [trait/on_being_hit/condition]] (closest offered: bloodied-burst) [effect: condition] [nearest landed] [menu: warded-mending heated-body absorption bloodied-burst resonant-body weapon-lodge bloodied-fury sealed-body] [same-cell unoffered: none] [same-seat rejected: none]
[reskin] trait declined: "Smoke-Sealed Stumps" — no receipt: the call quoted none of the GM's words for it and it bound on no concept key (1d: the receipt is the gate, not the body's substance)
[reskin] weapons answered: Bite = none
[reskin] speed by concept: added Swim 40 ft. — the concept's movement set decides
[reskin] print canon multiattack: "the hydra makes as many Bite attacks as it has heads." — the Hydra's own
[reskin] languages held: None stands — INT 2 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon skills: "Athletics +8, Perception +3" -> "Perception +6" — the Hydra's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities none -> Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious — the Hydra's own header lines
[reskin] print canon trait: Hold Breath — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Multiple Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Reactive Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] asked but unanswered: "Hydra — whose stumps smoke instead of regrowing" asked for on_being_hit and no row binds the clause
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] lacks clause: Traits/"Multiple Heads" keeps its blow, loses the regeneration — "Hydra — whose stumps smoke instead of regrowing"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Hymn Drowned — in the run

**Concept:** a drowned cathedral choir that sings in one voice

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hymn Drowned | 10 (2014) | caster-8-binder | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 8 / off 10 → 9; sustained 63 (3 × Choir Claw); nova Drowning Hymn 21; dmg 63

```
Hymn Drowned
Large undead, neutral
Armor Class

16 (natural armor)

Hit Points: 

178 (21d10 + 63)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


14 (+2)

	

15 (+2)

	

17 (+3)

	

14 (+2)

	

15 (+2)

	

16 (+3)

Skills: 

Perception +6, Deception +7

Saving Throws: 

WIS +6, CHA +7

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 60 ft., passive Perception 16

Languages: 

Common plus the languages it knew in life

Challenge

10 (5,900 XP)

Proficiency Bonus:

+4

Actions
Multiattack: The drowned makes three attacks, using Choir Claw or Drowned Hymn. It can replace one attack with a use of Silencing Wave.
Choir Claw: Melee Spell Attack: +7 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) psychic damage.
Drowned Hymn: Ranged Spell Attack: +7 to hit, range 60 ft., one target. Hit: 16 (3d8 + 3) psychic damage.
Silencing Wave: One creature within 60 feet of the drowned must succeed on a DC 15 Constitution saving throw or take 18 (4d8) psychic damage and be deafened until the end of its next turn.
Spellcasting: The drowned casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 15): -

At will: minor illusion, misty step

1/day each: hypnotic pattern, fear
Drowning Hymn (Recharge 5-6): Each creature within 30 feet of the drowned must make a DC 15 Constitution saving throw, taking 21 (6d6) thunder damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also deafened until the end of its next turn.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Choir Claw — the chassis
- Actions/Drowned Hymn — the chassis
- Actions/Silencing Wave — the chassis
- Actions/Spellcasting — the chassis
- Actions/Drowning Hymn — template active-toll; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "a drowned cathedral choir that sings in one voice" (call)
[route] caster-binder (controller) type=Undead mechanics=none — casts: implied by the kind — "sings in one voice" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: ✓ ("a drowned cathedral choir that sings in ") | caster-binder: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a drowned cathedral choir that sings in …" is the description, not a name
[concept] resolve: archetype=caster type=Undead themes=grave/voice mind=sapient style=binder energy=Psychic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: one voice sung by many drowned throats [behavior] | drowned shadow-stuff bodies drifting in flooded aisles [body] | a hymn that takes away an enemy's actions [aura]
[concept] identity: The choir opens by drawing a single drowning hymn from its collective throat — a chord that floods the mind with pressure and leaves one foe unable to act at all. Every round after, it re-lays its curses in layered harmony, silencing, blinding, and confounding the living while it drifts through sunken aisles and refuses to stay at arm's length. Under pressure it does not scatter or flee — it swells its voice into a crushing decree and fights to the last throat.
[concept] lore: When the cathedral sank and the congregation drowned mid-psalm, the flooded choir kept singing, and now it haunts the drowned nave, calling the living into its drowned congregation one voice at a time, one silenced throat at a time.
[reskin] donor: caster-8-binder -> CR 10
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] repair round 1: 2 defect(s) — name "Drowned Hymn" repeats the creature's own name — the sheet already says who acts; give the row its own word | "Choir Claw" is an anatomical name dealing Slashing on a mind-driven attacker (the attack bonus keys to CHA) — print pays physical damage on mental strikes with implement names (the Dryad's Vine Lash, the Rakshasa's Cursed Touch) or carries a magical type (the Mage's Arcane Burst deals Force); rename to a conjured implement or pick a magical type
[reskin] mental-anatomy stamp: "Choir Claw" Slashing -> Psychic (repair exhausted; the engine picks the magical type)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the drowned" — the call's own answer (kind), built from the name
[reskin] inline form: "the drowned" — the model's own reading of the name
[reskin] control spell gated to daily — Fear (level 3 control at will is print's CR 13+ shape; at CR 10 it is 1/Day)
[reskin] spell DC coherence: DC 16 -> 15 off Charisma 16 (the stat makes the attack rolls)
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + Charisma's 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a drowned cathedral choir" -> has (descriptive), head | "sings in one voice" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The drowned choir splits its harmony apart for a moment and each voice picks a different living listener, singing to a whole cluster at once so no one within the reach of the hymn escapes the pressure alone. Every enemy it sings at around the same time is dragged into the same drowning note — and whichever of them fails to withstand it suffers far worse than the others, as if the choir's many thro" [action/save/damage] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground, trample, leap, thrown-burst, execute, exploiter (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] pick kept on the GM's own words: action — "active-toll" has no key-table verb, but the call quotes "sings in one voice" from the description
[reskin] value check: "Drowning Hymn (Recharge 5-6)" EV 54.6 vs floor 50.7 (the whole Multiattack (3 attacks)) — worth the trade
[reskin] signature template: active-toll -> Actions/"Drowning Hymn (Recharge 5-6)" ("the choir sings in one voice, washing over every creature around it and leaving  [shape fit, no verb match]")
[reskin] signature idea (trait): "The drowned are not solid bodies but shadow-stuff thick with sunken water, and every fresh wound of their own lets the choir's voice swell louder through the opening — each time the creature is struck, its next hymn comes faster and heavier, as if grief makes the singing stronger." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — noxious-aura, mimicry (voices)
[reskin] word match declined by the call: noxious-aura, mimicry, absorption, bloodied-burst, false-appearance, heated-body, resonant-body — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "bloodied-fury" as nearest; it lands rather than the row being dropped (what it wanted: every wound taken makes the creature's own attacks land harder or swing faster a)
[reskin] [gap] every wound taken makes the creature's own attacks land harder or swing faster afterward, rather than only when it is ne — "The drowned are not solid bodies but shadow-stuff thick with sunken water, and every fresh wound of their own lets the choir's voice swell louder through the opening — each time the creature is struck, its next hymn comes faster and heavier, as if grief makes the singing stronger." — Hymn Drowned [seat: trait [trait/on_being_hit/damage]] (closest offered: bloodied-fury) [effect: damage] [nearest landed] [menu: noxious-aura mimicry heated-body absorption bloodied-burst resonant-body false-appearance bloodied-fury] [same-cell unoffered: ward-retaliation snap-shot riposte] [same-seat rejected: weapon-lodge:role]
[reskin] trait declined: "Swelled Hymn" — no receipt: the call quoted none of the GM's words for it and it bound on no concept key (1d: the receipt is the gate, not the body's substance)
[reskin] weapons answered: Choir Claw = none; Drowned Hymn = none; Silencing Wave = none; Crushing Decree = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a drowned cathedral choir that sings in " and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Silencing Wave.
[reskin] save stat from print grammar: Actions/Silencing Wave imposes Deafened by its own text — no record on the row, so the grammar stood in (A2 gap)
audit finding below confidence gate: Drowning Hymn The entry is named a Hymn but is written as a Constitution save with Thunder damage, while the creature's Choir Claw and Drowned Hymn are Psychic and its identity is a psychic singer; a thunder-damage burst named 'Hymn' is not inconsistent enough to be mechanical, but the real adjudication issue is that no clause connects the Deafened condition to the name's singing, yet the text is fully adjudicable — this is a flavor mismatch, not a mechanical defect.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
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
- read: def 10 / off 6 → 8; sustained 30 (2 × Grave Strike); nova none; dmg 30

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

Legendary Resistance (3/Day, or 4/Day in Lair). If the vampire fails a saving throw, it can choose to succeed instead.
Misty Escape. If the vampire drops to 0 hit points outside its resting place, the vampire uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 hit points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and is paralyzed until it regains any hit points, and it regains 1 hit point after spending 1 hour there.
Spider Climb. The vampire can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Vampire Weakness. The vampire has these weaknesses: Forbiddance: the vampire can't enter a residence without an invitation from an occupant.
Running Water: the vampire takes 20 acid damage if it ends its turn in running water.
Stake to the Heart: If a weapon that deals piercing damage is driven into the vampire's heart while the vampire is incapacitated in its resting place, the vampire is paralyzed until the weapon is removed.
Sunlight: the vampire takes 20 radiant damage if it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks.
Shape-Shift. As a bonus action, if the vampire isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the vampire can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the vampire can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has resistance to all damage, except the damage it takes from sunlight.
Charm (Recharge 5-6). As a bonus action, the vampire casts charm person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The charmed target is a willing recipient of the vampire's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was charmed by the vampire.

Actions
Multiattack: The vampire makes two Grave Strike attacks and uses Bite. It can replace one attack with a use of Rooting Thorns.
Grave Strike: Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) by one of two hands.
Rooting Thorns: One creature within 60 feet of the vampire must succeed on a DC 17 Dexterity saving throw or be restrained until the end of the vampire's next turn.
Bite (Bat or Vampire Form Only): One creature within 5 feet of the vampire that is willing or that is grappled, incapacitated, or restrained must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) piercing damage plus 13 (3d8) necrotic damage on a failed save, or half as much damage on a successful one. The target's hit point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a vampire spawn under the vampire's control.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Grave Strike — print's own row, renamed
- Actions/Rooting Thorns — template snare-bolt; library draw (seed unstamped); binds the GM's words: root
- Actions/Bite — print's own row
- Bonus Actions/Shape-Shift — print's own row
- Bonus Actions/Charm — print's own row
- Traits/Legendary Resistance — print's own row
- Traits/Misty Escape — print's own row
- Traits/Spider Climb — print's own row
- Traits/Vampire Weakness — print's own row

**Engine trace**

```
[path] twist — Vampire (is) — "Name field: Vampire" (code)
[route] lurker type=Undead mechanics=snare — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-shifter: a shifter is named by its words (shape-shifts, turns into, a were-) — none here | caster-binder: the call reads no worked magic in these words | lurker-trap: ✓ ("garden of thorns") | lurker-trap: no line key in the words — the model's read of its quote | lurker-trap -> lurker: a trap is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it | bane refused: the words carry no weakness clause, so "radiant" answers a question nobody asked
[concept] name: "Vampire" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=lurker type=Undead themes=grave/verdant mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Vampire"
[concept] mechanics: snare
[concept] signature elements: a briar garden fed on blood [aura] | lurking strike from the thorns [behavior] | thorn-wrapped blood-soaked hands [body]
[concept] identity: The Thorn-Gardener waits beneath its briar wall, veiled in shadow until a victim wanders within reach, then erupts with a single bloodletting strike from a thorn-wrapped hand. Every round after it melts back into the hedge and strikes again from an unseen angle, husbanding its garden of impaled prey and feeding the roots. Pressed and wounded, it does not flee — it drags the fight into the densest thicket of its own making, where the thorns bleed for it and the ground remembers every corpse it has planted.
[concept] lore: Once a vampire lord who murdered its own gardener and took up the shears, it now tends a walled briar garden where every rose is fed on the blood of trespassers, and it wants only to see the garden grow.
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
[reskin] signature idea (action): "When the vampire strikes a foe that is already bleeding, the thorn in its hand drinks deep and erupts into a writhing bramble that pins the victim to the ground, roots threading through the wound. The rooted victim can tear free, but every moment spent struggling feeds the garden and leaves them weaker, while the vampire draws strength from the rooted prey each passing moment." [rider/on_hit/condition] — menu: contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — drain (vampire)
[reskin] closest accepted: action — the call refused every template but named "snare-bolt" as nearest; it lands rather than the row being dropped (what it wanted: an on-hit rider that Restrains the victim and drains Hit Points to the vampire e)
[reskin] [gap] an on-hit rider that Restrains the victim and drains Hit Points to the vampire each turn while rooted — "When the vampire strikes a foe that is already bleeding, the thorn in its hand drinks deep and erupts into a writhing bramble that pins the victim to the ground, roots threading through the wound. The rooted victim can tear free, but every moment spent struggling feeds the garden and leaves them weaker, while the vampire draws strength from the rooted prey each passing moment." — Vampire [seat: action [rider/on_hit/condition]] (closest offered: snare-bolt) [effect: condition] [nearest landed] [menu: drain contagion stunning-strike charge-push hook-rider pounce isolation ground-burst lure obstacle-pull pacify snare-bolt blighted-ground] [same-cell unoffered: affliction snatch bolt-restrain bolt-mark] [same-seat rejected: affliction:legality snatch:legality bolt-restrain:role bolt-drag:legality bolt-mark:role charge:role]
[reskin] seat takes its clause: "Rooting Thorns" answers "keeps a garden of thorns" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: snare-bolt -> Actions/"Rooting Thorns" ("The idea is a rider on an already-bleeding foe that roots it in place and drains [verb: root:idea]")
[reskin] signature idea (trait): "The vampire's briar garden remembers every corpse planted in it: whenever a creature dies in the vampire's presence, thorny growth bursts from the ground where it fell, and the vampire regains vitality as the roots drink the fresh blood. If the vampire is later wounded within reach of one of these blood-fed thickets, the thorns lash out at whatever harmed it." [trait/always/resource] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — heated-body (thorns)
[reskin] word match declined by the call: heated-body, terrain-walk, aberrant-ground, absorption, undead-fortitude — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "death-burst" as nearest; it lands rather than the row being dropped (what it wanted: thorns sprout at the spot a creature dies, the vampire regains hit points, and l)
[reskin] [gap] thorns sprout at the spot a creature dies, the vampire regains hit points, and later the thicket attacks whoever wounds  — "The vampire's briar garden remembers every corpse planted in it: whenever a creature dies in the vampire's presence, thorny growth bursts from the ground where it fell, and the vampire regains vitality as the roots drink the fresh blood. If the vampire is later wounded within reach of one of these blood-fed thickets, the thorns lash out at whatever harmed it." — Vampire [seat: trait [trait/always/resource]] (closest offered: death-burst) [effect: resource] [nearest landed] [menu: heated-body false-appearance adhesive spider-climb phobia terrain-walk aberrant-ground faultless-tracker web-walker noxious-aura bloodied-fury uncanny-sense shielded-mind evasion relentless-pursuit bound marking-light undead-fortitude mimicry truth-aura gaze-aura assassinate blurred-form death-burst bloodied-burst absorption] [same-cell unoffered: lay-on-hands second-wind volley-order] [same-seat rejected: earth-glide:legality tunneler:legality berserk:role sealed-body:role guarded-stance:role]
[reskin] trait declined: "Gravebriar Garden" — no receipt: the call quoted none of the GM's words for it and it bound on no concept key (1d: the receipt is the gate, not the body's substance)
[reskin] weapons answered: Thorn Claw = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Vampire's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Thorn Claw" -> "Grave Strike" — the Vampire's own row
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
[reskin] multiattack replacement clause: It can replace one attack with a use of Rooting Thorns.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rename blocked — "Grasping Shadow" promises the Grappled condition that "Rooting Thorns" does not deliver
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] escape dc: Grave Strike → DC 17 (8 + PB + STR; a late row wore another number)
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Ossuar the Bone Sun — in the run

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ossuar the Bone Sun | 20 (2014) | caster-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 19 / off 20 → 19.5; sustained 126 (3 × Eldritch Burst + legendary Deathly Teleport); nova none; dmg 126

```
Ossuar the Bone Sun
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

truesight 60 ft., passive Perception 18

Languages: 

All

Challenge

20 (25,000 XP)

Proficiency Bonus:

+6

Legendary Resistance (3/Day). If Ossuar fails a saving throw, it can choose to succeed instead.
Spirit Jar. If destroyed, Ossuar reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within Ossuar's lair.
Blink Step (Recharge 4-6). As a bonus action, Ossuar teleports up to 120 feet to an unoccupied space it can see.
Protective Magic (3/Day) (Reaction). When Ossuar is hit by an attack, Ossuar casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Ossuar makes three attacks, using Eldritch Burst or Paralyzing Touch. It can replace one attack with a use of Spellcasting to cast Fear.
Eldritch Burst: Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 31 (4d12 + 5) force damage.
Paralyzing Touch: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed.
Spellcasting: Ossuar casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19): -

At will: detect magic, detect thoughts, dispel magic, fireball, invisibility, lightning bolt, mage hand, prestidigitation

2/day each: animate dead, dimension door, plane shift

1/day each: chain lightning, finger of death, power word kill, scrying
Legendary Actions

Ossuar can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. Ossuar regains spent legendary actions at the start of its turn.

Deathly Teleport: Ossuar teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an undead within 20 feet of Ossuar must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one. Ossuar can't take this action again until the start of its next turn.
Frightening Gaze: Ossuar casts fear, using the same spellcasting ability as Spellcasting. Ossuar can't take this action again until the start of its next turn.
```

**Where each row came from**

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
- Bonus Actions/Blink Step — template blink; library draw (seed unstamped); binds the GM's words: vanish

**Engine trace**

```
[path] twist — Lich (is) — "archlich" (call)
[route] caster (artillery) type=Undead mechanics=aura — casts: implied by the kind — "archlich" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("archlich") | caster: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "archlich enthroned on a sun of bone…" is the description, not a name
[concept] resolve: archetype=caster type=Undead themes=grave/arcane mind=sapient style=— energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: bone sun throne [object] | necrotic corona [aura] | grave-step repositioning [behavior]
[concept] identity: The Bone Sun Lich opens by igniting its throne into a blinding corona of necrotic fire, forcing foes to fight through radiant-tinged darkness as it hurls bone-shard bolts from its skeletal regalia. Every round it repositions with grave-step teleports across its skeletal sun, using its throne's orbit to keep prey at range while it weaves a withering spell list and raises bone pillars to shape the battlefield. It is a patient, contemptuous tactician—never fleeing, it toys with intruders until its corona flares, then annihilates them with focused cosmic decay.
[concept] lore: Once a mortal archmage who bound their soul to a dying star of ossified light, the Bone Sun Lich now drifts through the void seeking the last fragments of its shattered phylactery, drawing power from the bone-sun it has enthroned itself upon.
[reskin] print canon pb: print's +12 on PB +7 reads +11 on this sheet's PB +6; DCs follow
[reskin] print canon defenses: HP 300 -> 315, AC 19 -> 20 — the Lich's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 21, WIS 14, CHA 16 — the Lich's at its own CR; attack +10 -> +11, DC 19 (print's, on this sheet's PB)
[reskin] donor: caster-21 -> CR 20
[reskin] [path] decides: twist on the Lich (the matcher agrees)
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "Ossuar" — the call's own answer (person), built from the name
[reskin] inline form: "Ossuar" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an archlich enthroned on a sun of bone" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip, thrown-burst-seed, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Ossuar steps into the bones of its throne and vanishes, then erupts upward out of any bone surface it can see nearby — or, when there is none, out of the ground itself — carrying the bolt of the corona with it. Wherever it emerges, the ossified light of the throne lingers in a pillar of fused bone for a short while, a blind spot in the battlefield that the lich can use to pin foes and pick them ap" [bonus_action/always/movement] — menu: lay-on-hands, aggro-curse, self-invisibility, rally, blink, focus, feint-slip (+ shelf: gaze-single, snare, condition-payoff, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, delayed-brand, curse-debt, zone-seed, reveal, bolt-restrain, bolt-drag, bolt-mark)
[reskin] word match declined by the call: self-invisibility, sensory-strike, bolt-restrain, lure, snare-bolt, reveal, bolt-drag, bolt-mark — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "blink" as nearest; it lands rather than the row being dropped (what it wanted: leaves behind a temporary bone pillar / blind spot on the battlefield that persi)
[reskin] [gap] leaves behind a temporary bone pillar / blind spot on the battlefield that persists after the teleport and affects creat — "Ossuar steps into the bones of its throne and vanishes, then erupts upward out of any bone surface it can see nearby — or, when there is none, out of the ground itself — carrying the bolt of the corona with it. Wherever it emerges, the ossified light of the throne lingers in a pillar of fused bone for a short while, a blind spot in the battlefield that the lich can use to pin foes and pick them ap" — Ossuar the Bone Sun [seat: action [bonus_action/always/movement]] (closest offered: blink) [effect: condition] [nearest landed] [menu: lay-on-hands aggro-curse self-invisibility rally blink focus feint-slip sensory-strike bolt-restrain lure snare-bolt reveal bolt-drag bolt-mark] [same-cell unoffered: spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound zone-seed phase-slip] [same-seat rejected: blink:role shell-withdraw:role patient-defense:role second-wind:role volley-order:role own-turn-punisher:role focus:role feint-slip:role coating:role]
[reskin] seat takes its clause: "Blink Step (Recharge 4-6)" answers "an arch enthroned on a sun of bone" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: blink -> Bonus Actions/"Blink Step (Recharge 4-6)" ("The idea is a teleporting vanish-and-erupt reposition that leaves a lingering bo [verb: vanish:idea]")
[reskin] signature idea (trait): "The throne's corona is never fully dark: any foe that dares step within arm's reach of Ossuar is seared by the necrotic radiance of its skeletal sun, and the bones of the throne drink the dying heat of creatures that fall near it, mending the lich as they perish." [trait/always/damage] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, assassinate (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] trait declined: "Bone Corona" — no receipt: the call quoted none of the GM's words for it and it bound on no concept key (1d: the receipt is the gate, not the body's substance)
[reskin] weapons answered: Bone Shard = none; Scepter = mace; Corona Flare = none
[reskin] weapon declared: "Scepter" is a mace — the call's own answer
[reskin] chassis nova: "Corona Flare (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] speed by concept: dropped Fly 30 ft. (hover) — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon size: Huge -> Medium — the Lich's
[reskin] print canon alignment: Lawful Evil -> Neutral Evil — the Lich's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon attack: "Bone Shard" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon attack: "Scepter" -> "Paralyzing Touch" — the Lich's own row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon skills: "Arcana +11, Perception +8" -> "Arcana +17, History +11, Insight +8, Perception +8" — the Lich's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] resistances derived withheld: print's Lich owns the line (Cold, Lightning)
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Corona Flare (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Spellcasting to cast *Fear*.
audit finding below confidence gate: Deathly Teleport The name promises teleportation but the entry's own text already delivers that; more importantly the teleport is a bonus action on Blink Step, so this replicates a movement the creature already has rather than a teleport-keyed effect — the entry is named for the movement rather than the necrotic burst it deals.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
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
[concept] hints: dragon→body ✓ ("Ancient Gold Dragon is a true dragon bod")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/fiendish mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Ancient Gold Dragon"
[concept] mechanics: breath
[concept] signature elements: molten gold breath that clings and burns [behavior] | scales fused with hoarded treasure [body] | ancient pride that never retreats [behavior]
[concept] identity: The ancient gold dragon opens with a cone of searing, molten-gold fire that clings and burns, then closes to crush with gilded claws and a bite that melts armor. Each round it alternates breath and brutal melee, using its massive golden wings to reposition while keeping prey within the burning aura of its hoard. Under pressure it fights to the death, too proud and too ancient to flee, its temper flaring into radiant wrath that scorches those who dare strike it.
[concept] lore: A hoard-keeper whose scales have fused with the treasures it guards, it stirs only when its gold is threatened, hoarding its molten breath as jealously as its coins.
[reskin] 2014 exact: "Ancient Gold Dragon" served from the SRD 5.1 corpus — no call, nothing rephrased (owner's ruling; the 2014 book's own creature)
```


---


### Goblin Boss — in the run

**Concept:** name: Goblin Boss | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Boss | 1 (2014) | defender-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

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

CON +2

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

- Actions/Multiattack — print's own row
- Actions/Scimitar — print's own row, renamed; weapon scimitar
- Actions/Shortbow — print's own row; weapon shortbow
- Bonus Actions/Nimble Escape — print's own row

**Engine trace**

```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792606384095:1465:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792606384095:1304:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792606384095:657:5)
!! [ENRICHMENT] Failed to enrich Owlbear: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792606384095:1465:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792606384095:1304:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792606384095:657:5)
[path] exact — Goblin Boss (is) — "Goblin Boss" (code)
[route] defender-leader type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("Goblin Boss") | defender-leader: no line key in the words — the model's read of its quote
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] resolve: archetype=defender type=Humanoid themes=voice/bestial mind=sapient style=leader energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Goblin Boss"
[concept] mechanics: none claimed
[concept] signature elements: barking orders that rally its warren [behavior] | a cackling, snapping scimitar-and-claw assault [behavior] | a whip-scarred hide that has outlived its rivals [body]
[concept] identity: The Goblin Boss opens by barking a crackling command that rallies its scrawny kin into a shrieking, flanking mob, then wades in beside them to gut whoever looks strongest. Every round it fights shoulder-to-shoulder with its grunts, shoving weaker goblins between itself and danger while it picks its moment for a mean, snapping blow. Bloodied, it does not break — it screams its followers into a frenzy and fights to the last goblin standing before it saves its own hide.
[concept] lore: A goblin warren spawns a boss only after one of its kind survives enough murder to cow the rest — and it wants nothing more than to keep the fear flowing.
[reskin] 2014 exact: "Goblin Boss" is not in the SRD 5.1 corpus — the 5.2 block converts as before
[reskin] print canon route: "Goblin Boss" is the Goblin Boss — the leader seat stands down for the plain line
[reskin] print canon defenses: HP 26 -> 21, AC 15 -> 17 — the Goblin Boss's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 17 (chain shirt, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 10, DEX 15, CON 10, INT 10, WIS 8, CHA 10 — the Goblin Boss's at its own CR; attack +3 -> +4, DC 12 (print's)
[reskin] donor: defender-1 -> CR 1
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: exact on the Goblin Boss (the matcher agrees)
[reskin] print canon: "Goblin Boss" is a print creature — the seats stand down; print's own rows are the composition
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] class kit: none — the exact path takes no class kit
[reskin] inline by rule: "the boss" — the call answered "the boss" (kind), which the name does not support
[reskin] inline form: "the boss" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 12 (8 + PB 2 + the sheet's best 2) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Goblin Boss" -> has (descriptive), head
[reskin] weapons answered: Jagged Cleaver = cleaver
[reskin] print canon speed: modes walk only — the Goblin Boss's
[reskin] print canon senses: "darkvision 60 ft." — the Goblin Boss's
[reskin] print canon type: Humanoid stays — the Goblin Boss is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon alignment: Neutral Evil -> Chaotic Neutral — the Goblin Boss's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon row: Actions/Shortbow — the Goblin Boss's own ranged row, added (the chassis carried none to rename)
[reskin] print canon attack: "Jagged Cleaver" -> "Scimitar" — the Goblin Boss's own row
[reskin] print canon multiattack: "the boss makes two attacks, using Scimitar or Shortbow in any combination." — the Goblin Boss's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] print canon attack: "Shortbow" is print's own row — +4, 5 (1d6 + 2), range 80/320 ft. (an exact body at print's CR)
[reskin] print canon skills: "Athletics +2, Perception +1" -> "Stealth +6" — the Goblin Boss's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Boss's own
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Iron Vault Sentinel — in the run

**Concept:** a sentinel of black iron, AC 20, Huge, speed 20 feet

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Iron Vault Sentinel | 11 (2014) | brute-9-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 9 / off 11 → 10; sustained 50 (2 × Iron Fist); nova Trampling Advance 59; dmg 73

```
Iron Vault Sentinel
Huge construct, lawful neutral
Armor Class

20 (natural armor)

Hit Points: 

171 (18d12 + 54)

Speed: 

20 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

8 (-1)

	

17 (+3)

	

6 (-2)

	

10 (+0)

	

4 (-3)

Skills: 

Athletics +8, Perception +4

Saving Throws: 

STR +8, CON +7

Damage Immunities: 

acid, poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

darkvision 120 ft., passive Perception 14

Languages: 

understands the languages of its creator but can't speak

Challenge

11 (7,200 XP)

Proficiency Bonus:

+4

Acid Absorption. Whenever the sentinel is subjected to acid damage, it takes no damage and instead regains a number of hit points equal to the acid damage dealt.
Immutable Form. The sentinel can't shape-shift.
Siege Monster. The sentinel deals double damage to objects and structures.

Actions
Multiattack: The sentinel makes two Iron Fist attacks. It can replace one attack with a use of Unstoppable Advance.
Iron Fist: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 25 (6d6 + 4) bludgeoning damage.
Trampling Advance (Recharge 5-6): Each creature in a 30-foot cone must make a DC 16 Strength saving throw, taking 59 (17d6) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
Unstoppable Advance: One creature within 60 feet of the sentinel that is prone must make a DC 16 Strength saving throw, taking 49 (14d6) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
```

**Where each row came from**

- Traits/Acid Absorption — the chassis
- Traits/Immutable Form — the chassis
- Traits/Siege Monster — the chassis
- Actions/Multiattack — the chassis
- Actions/Iron Fist — the chassis
- Actions/Trampling Advance — the chassis
- Actions/Unstoppable Advance — template condition-payoff; library draw (seed unstamped); binds the GM's words: grind

**Engine trace**

```
[path] homebrew — "a sentinel of black iron, AC 20, Huge, speed 20 feet" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a sentinel of black iron") | defender: the call read "sentinel" as not meaning that mechanic here — no override | brute-juggernaut stands: every key that would override it was read as a figure of speech | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] hints: warden→style ✓ ("a sentinel of black iron")
[concept] resolve: archetype=brute type=Construct themes=forged/armed mind=mindless style=juggernaut energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: black iron plating it pours, forged, or animates as its body [body] | an implacable forward grind that breaks what it walks through [behavior] | the bound charge of a guardian holding a line it will not abandon [aura]
[concept] identity: A walking wall of black iron, the sentinel opens by simply advancing — twenty feet of implacable mass that crushes barricades, bends pikes, and drives the front rank backward by sheer presence before it ever swings. Every round after, it grinds forward along the same line it chose, hammering the nearest obstacle with a fused iron fist and refusing to be turned, flanked, or slowed by anything short of magic. It has no blood to lose and no fear to feel; reduced to a cracked and smoldering shell, it keeps closing until its charge is met or its body fails, never fleeing and never sparing a fallen foe.
[concept] lore: Poured in a forgotten foundry as the final seal on a vault-road it still walks, the black-iron sentinel grinds down its old patrol line, and anything not inscribed with its maker's mark is a trespass to be crushed.
[reskin] nova capped: "Area Nova" 66 → 59 (the chassis nova obeys the cap: 59 at CR 11)
[reskin] donor: brute-9-juggernaut -> CR 11
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the sentinel" — the call's own answer (kind), built from the name
[reskin] inline form: "the sentinel" — the model's own reading of the name
[reskin] save dc derived: DC 17 -> 16 (8 + PB 4 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a sentinel of black iron" -> has (descriptive), head | "AC 20" -> has (header) | "Huge" -> has (header) | "speed 20 feet" -> has (header)
[reskin] extraction: 1 of 4 model clauses quote nothing the user typed and leave the record ("AC 20")
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The sentinel locks its stride and grinds straight forward in a straight line, unstoppable until it meets a wall it cannot break. Every creature in the path must scramble aside or be swept out of its way and dumped flat behind it, and it keeps pushing through until its movement is spent. It cannot steer this push and cannot be turned aside by anything lighter than the magic that made it." [trait/start_of_turn/movement] — menu: fire-aura, warded-mending (+ shelf: condition-payoff, shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] closest accepted: action — the call refused every template but named "condition-payoff" as nearest; it lands rather than the row being dropped (what it wanted: an unstoppable straight-line push that moves creatures aside and leaves them pro)
[reskin] [gap] an unstoppable straight-line push that moves creatures aside and leaves them prone behind it — "The sentinel locks its stride and grinds straight forward in a straight line, unstoppable until it meets a wall it cannot break. Every creature in the path must scramble aside or be swept out of its way and dumped flat behind it, and it keeps pushing through until its movement is spent. It cannot steer this push and cannot be turned aside by anything lighter than the magic that made it." — Iron Vault Sentinel [seat: action [trait/start_of_turn/movement]] (closest offered: condition-payoff) [effect: movement] [nearest landed] [menu: fire-aura warded-mending condition-payoff] [same-cell unoffered: none] [same-seat rejected: none]
[reskin] value check: "Unstoppable Advance" EV 41.3 vs floor 31.2 (one attack of 2) — worth the trade
[reskin] signature template: condition-payoff -> Actions/"Unstoppable Advance" ("The sentinel locks its stride and grinds straight forward in a straight line, unstoppable until it meets a wall it cannot break. Every creature in the path must [verb: grind:idea]")
[reskin] signature idea (trait): "Struck iron rings, it does not yield: whenever a foe's blow lands, the black plating answers by dragging that weapon or attacker off its line, opening a small gap the sentinel presses into. It simply cannot be shoved off its chosen path by strength or shove; only magic turns it." [trait/on_being_hit/movement] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body, resonant-body (iron)
[reskin] closest accepted: trait — the call refused every template but named "weapon-lodge" as nearest; it lands rather than the row being dropped (what it wanted: when a blow lands, displaces the attacker's line and prevents the sentinel from )
[reskin] [gap] when a blow lands, displaces the attacker's line and prevents the sentinel from being shoved off its path — "Struck iron rings, it does not yield: whenever a foe's blow lands, the black plating answers by dragging that weapon or attacker off its line, opening a small gap the sentinel presses into. It simply cannot be shoved off its chosen path by strength or shove; only magic turns it." — Iron Vault Sentinel [seat: trait [trait/on_being_hit/movement]] (closest offered: weapon-lodge) [effect: defense] [nearest landed] [menu: heated-body resonant-body absorption bloodied-burst weapon-lodge uncanny-sense] [same-cell unoffered: none] [same-seat rejected: none]
[reskin] signature miss: trait — "Struck iron rings, it does not yield: whenever a foe's blow lands, the black plating answers by dragging that weapon or attacker off its line, opening a small gap the sentinel presses into. It simply cannot be shoved off its chosen path by strength or shove; only magic turns it." [trait/on_being_hit/movement] — the model picked "weapon-lodge" (no verb, and it quotes nothing the GM typed) over a concept-verb template (heated-body, resonant-body)
[reskin] weapons answered: Iron Fist = none; Trampling Advance = none
[reskin] chassis nova: "Trampling Advance (Recharge 5-6)" — the brute-9-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] immunities stamped for type: Construct -> Acid, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a sentinel of black iron, AC 20, Huge, s" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Unstoppable Advance.
[reskin] save stat from print grammar: Actions/Trampling Advance imposes Prone by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] save re-derived after a retype: Actions/Trampling Advance — a Constitution save for a condition the row IMPOSES, which calls for Strength or Dexterity (A2: a condition the row merely requires does not pick the stat)
[reskin] lint fixed: prone-duration — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] audit rename blocked — "Vault Shockwave" claims an element "Trampling Advance (Recharge 5-6)" does not pay (Bludgeoning)
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] header clause: speed 30 ft. -> 20 ft. — the user typed 20 feet
[reskin] user-set: AC 15 -> 20 — a declared field, not a derivation (Resolution 3)
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

Common plus five other languages, Elvish, Undercommon

Challenge

12 (8,400 XP)

Proficiency Bonus:

+4

Magic Resistance. Ilvareth has advantage on saving throws against spells and other magical effects.
Misty Step (3/Day). As a bonus action, Ilvareth casts misty step, using the same spellcasting ability as Spellcasting.
Shadow Step (2/Day). As a bonus action, Ilvareth teleports up to 30 feet to an unoccupied space it can see.
Protective Magic (3/Day) (Reaction). When Ilvareth is hit by an attack roll, it casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
- Bonus Actions/Shadow Step — template phase-slip; library draw (seed unstamped); the GM's clause "bends shadow and steps between places"; binds the GM's words: step+shadow
- Traits/Magic Resistance — print's own row

**Engine trace**

```
[path] class_npc — class mage — "archmage" (call)
[route] caster (artillery) type=Humanoid mechanics=teleport — casts: on the GM's own words "An elf archmage who bends shadow" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("An elf archmage who bends shadow") | caster: no line key in the words — the model's read of its quote
[concept] name: "Ilvareth Dusksong" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=caster type=Humanoid themes=arcane/uncanny mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Ilvareth Dusksong"
[concept] mechanics: teleport
[concept] signature elements: stepping between places through shadow [behavior] | shadow-bending archmagery and spellcraft [behavior] | a body woven of living dusk [body]
[concept] identity: Ilvareth opens by folding the room's shadow around herself, stepping through it to a vantage no blade can reach, then answers with a volley of shadowfire and a spell chosen to unmake whatever closed on her. Every round she relocates through darkness and punishes pursuit at range, never letting the fight settle into a straight line. Cornered and bloodied, she does not flee — she grows crueler, trading safe distance for a killing step between places to finish the nearest threat.
[concept] lore: An elf archmage who gave up her household and her name to the long study of shadow, Ilvareth walks the seams of the world collecting the secrets hidden in dark places and leaving behind rivals who never quite saw her move.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Archmage — the class's own print block, nearest CR 12
[reskin] print canon defenses: HP 168 -> 170, AC 16 -> 17 — the Archmage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 10, DEX 14, CON 12, INT 20, WIS 15, CHA 16 — the Archmage's at its own CR; attack +8 -> +9, DC 17 (print's)
[reskin] donor: caster-12 -> CR 12
[reskin] [path] decides: class_npc on the Archmage · class mage (the matcher would have said twist Archmage)
[reskin] print canon: "Ilvareth Dusksong — An elf archmage who bends shadow and steps between places." heads on the Archmage — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Shadow Lance" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "archmage": Misty Step (3/Day) (Mage/Misty Step)
[reskin] proper noun: "Ilvareth Dusksong" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Ilvareth" — the call's own answer (person), built from the name
[reskin] inline form: "Ilvareth" — the model's own reading of the name
[reskin] energy withheld on a base row: "Shadow Lance" Necrotic -> Piercing (the row's own noun; a Humanoid deals no Necrotic its concept never gave it)
[reskin] control spell gated to daily — Blindness/Deafness (level 2 control at will is print's CR 13+ shape; at CR 12 it is 1/Day)
[reskin] control spell gated to daily — Hold Person (level 2 control at will is print's CR 13+ shape; at CR 12 it is 1/Day)
[reskin] spell DC coherence: DC 18 -> 17 off Intelligence 20 (print's array stays)
[reskin] save dc derived: DC 18 -> 17 (8 + PB 4 + Intelligence's 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Ilvareth Dusksong — An elf archmage" -> has (descriptive), head | "bends shadow and steps between places" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When Ilvareth is in dim light or darkness, she may plunge her lance into her own shadow and pull it free as a second, hungry copy of herself that unfolds out of the floor beside a foe she can see. The dusk-double fights alongside her — striking, shadow-lancing, and drawing blades and eyes away from the archmage herself — until it spends itself or she calls it back. She cannot do this again until t" [action/always/damage] — menu: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground, throw-retrieve (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, own-turn-punisher, coating, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — phase-slip (step, shadow)
[reskin] closest accepted: action — the call refused every template but named "phase-slip" as nearest; it lands rather than the row being dropped (what it wanted: summons a shadow duplicate that fights as a separate second creature)
[reskin] [gap] summons a shadow duplicate that fights as a separate second creature — "When Ilvareth is in dim light or darkness, she may plunge her lance into her own shadow and pull it free as a second, hungry copy of herself that unfolds out of the floor beside a foe she can see. The dusk-double fights alongside her — striking, shadow-lancing, and drawing blades and eyes away from the archmage herself — until it spends itself or she calls it back. She cannot do this again until t" — Ilvareth Dusksong [seat: action [action/always/damage]] (closest offered: phase-slip) [effect: resource] [nearest landed] [menu: phase-slip thrown-burst gaze-single snare zone execute seal wail lure active-toll random-ray ground-burst spew obstacle-pull pacify escalating-dread snare-bolt slow-bolt sensory-strike herd thrown-burst-seed drain curse-debt zone-seed reveal wind-up blighted-ground throw-retrieve bolt-drag] [same-cell unoffered: assassinate death-burst own-turn-punisher coating] [same-seat rejected: throw-retrieve:role]
[reskin] signature template: phase-slip -> Bonus Actions/"Dusk Double (2/Day)" ("When Ilvareth is in dim light or darkness, she may plunge her lance into her own shadow and pull it free as a second, hungry copy of herself that unfolds out of [verb: step:concept, shadow:concept]")
[reskin] keys spent by the action: step, shadow
[reskin] signature idea (trait): "Ilvareth's body is woven of living dusk, so any wound dealt to her bleeds … instead of blood: a piece of that dusk peels away and clings to the attacker, dulling their sight and senses for a while so their next blows go wide. This …-cling leaves her no room to be caught twice — it only answers a foe who wounds her when she is the one bleeding, not one she merely brushes past." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] word match declined by the call: bloodied-burst, bloodied-fury, uncanny-sense, absorption, resonant-body — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "resonant-body" as nearest; it lands rather than the row being dropped (what it wanted: when hit by an attack, the attacker takes a condition that imposes disadvantage )
[reskin] [gap] when hit by an attack, the attacker takes a condition that imposes disadvantage on its attacks until the end of its next — "Ilvareth's body is woven of living dusk, so any wound dealt to her bleeds … instead of blood: a piece of that dusk peels away and clings to the attacker, dulling their sight and senses for a while so their next blows go wide. This …-cling leaves her no room to be caught twice — it only answers a foe who wounds her when she is the one bleeding, not one she merely brushes past." — Ilvareth Dusksong [seat: trait [trait/on_being_hit/condition]] (closest offered: resonant-body) [effect: condition] [nearest landed] [menu: absorption bloodied-burst resonant-body bloodied-fury uncanny-sense] [same-cell unoffered: none] [same-seat rejected: heated-body:legality weapon-lodge:role]
[reskin] trait declined: "Duskcling" — no receipt: the call quoted none of the GM's words for it and it bound on no concept key (1d: the receipt is the gate, not the body's substance)
[reskin] weapons answered: Shadow Lance = none
[reskin] weapon declined: "Shadow Lance" reads lance from its name, but the call answered none — the row carries no weapon
[reskin] print canon languages: "Common, Elvish, Undercommon" -> "Common plus five other languages, Elvish, Undercommon" — the Archmage's plus the concept's Elvish, Undercommon
[reskin] print canon attack: "Shadow Lance" -> "Arcane Burst" — the Archmage's own row
[reskin] print canon skills: "Arcana +9, Perception +6" -> "Arcana +13, History +9, Perception +6" — the Archmage's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities none -> Psychic; Charmed ((with Mind Blank)) — the Archmage's own header lines
[reskin] print canon trait: Magic Resistance — "Ilvareth Dusksong — An elf archmage who bends shadow and steps between places." is the Archmage (print's own row)
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 120 ft.; Passive Perception 16" -> "Passive Perception 16")
[reskin] row binds its clause: "Dusk Double" answers "bends shadow and steps between places" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding names unknown entry, dropped: Immunities
audit finding below confidence gate: Magic Resistance Magic Resistance is implied by Mind Blank's spell suite in theme but more concretely the trait duplicates no chassis grant; however, the Spellcasting entry lists Mind Blank 1/Day, and the Immunities line already keys Charmed immunity to Mind Blank, making the defensive package internally contradictory (a caster who has not yet cast Mind Blank is still immune per the immunity line).
audit finding names unknown entry, dropped: Immunities
[reskin] audit rename: "Dusk Double (2/Day)" -> "Shadow Step (2/Day)"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Meshrin — in the run

**Concept:** name: Meshrin | Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages. Give him a frightening roar. AC 16, 120 hit points.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | skirmisher-8-hurler | ok | ok | SOFT: lint:hp-formula | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok |

- structure · soft · lint:hp-formula: HP listed 120 but formula 14d10 + 42 averages 119
- gates · soft · control-aoe-ungated: Actions/Terrifying Bellow: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
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
Multiattack: Meshrin makes three attacks, using Greataxe or Javelin. It can replace one attack with a use of Terrifying Bellow.
Greataxe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (3d8 + 4) slashing damage.
Javelin: Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 17 (3d8 + 4) piercing damage. Immediately after the attack, a javelin returns to Meshrin's grasp, and the target's speed is reduced by 10 feet until the start of Meshrin's next turn.
Terrifying Bellow: Each creature of Meshrin's choice within 30 feet of it that can see or hear it must succeed on a DC 15 Wisdom saving throw or be frightened until the end of its next turn.
```

**Where each row came from**

- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "barbarian"
- Traits/Hold Breath — lizardfolk kit; the GM's clause "barbarian"
- Traits/Great Weapon Master — a declared feature; the GM's clause "Wields a greataxe two-handed"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "barbarian"
- Actions/Multiattack — the chassis
- Actions/Greataxe — authored for this sheet; a named part; the GM's clause "Wields a greataxe two-handed"; weapon greataxe
- Actions/Javelin — authored for this sheet; a named part; a declared feature; the GM's clause "a javelin for the throw"; weapon javelin
- Actions/Terrifying Bellow — template terror-pulse; library draw (seed unstamped); the GM's clause "Give him a frightening roar"; binds the GM's words: roar+bellow

**Engine trace**

```
[path] class_npc — class barbarian — species lizardfolk — "barbarian" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("Wields a greataxe two-handed") | brute -> skirmisher-hurler: the concept's VERB outranks the noun (key "throw", class verb) | skirmisher-hurler: key "throw" (class verb)
[concept] name: "Meshrin" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: hurler→style ✓ ("a javelin for the throw")
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/armed mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Meshrin"
[concept] mechanics: thrown-weapon
[concept] signature elements: two-handed greataxe sweeps while raging [object] | hurled javelin opening throw [object] | terrifying roar [behavior]
[concept] identity: Meshrin opens by hurling a javelin with a reptilian snap, then charges in to bury his greataxe in the nearest skull while his rage makes every swing a double-handed cleave. Those who spread out draw his roar — a bone-shaking bellow that roots the timid in place — and he spends each round looping the loop of throw, close, and cleave. He is a territorial butcher who fights to the last hit point, never fleeing, swinging harder the more wounded he gets.
[concept] lore: Meshrin is a lizardfolk war-chieftain whose tribe was broken by an iron-wielding company, and he has carried that company's scars and its stolen axe into a blood-feud that will not end until either he is buried or every last one of them is.
[reskin] [path] class body: the barbarian stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] nova capped: "Hurled Burst" 49 → 44 (the chassis nova obeys the cap: 44 at CR 8)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +7
[reskin] donor: skirmisher-8-hurler -> CR 8 (invented — no printed peer)
[reskin] [path] decides: class_npc on the Gladiator · class barbarian (the matcher would have said homebrew)
[reskin] print canon: "Meshrin — Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages. Give him a frightening roar. AC 16, 120 hit points." heads on the Gladiator — print's rows ride along; the seat stays
[reskin] named parts: Greataxe (slot), Javelin (slot, ranged) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] row evicted for the cap: Traits/"Raging Stride" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "barbarian": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: rampage — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: barbarian — "barbarian": Bloodied Frenzy (Berserker/Bloodied Frenzy)
[reskin] proper noun: "Meshrin" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Meshrin" — the call's own answer (person), built from the name
[reskin] inline form: "Meshrin" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] final price: the chassis's Multiattack: the round ran 39 against the card's 54 — the attack rows re-solve at 138% (3 attacks on an authored sheet, under the card)
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "Wields a greataxe two-handed" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "Wields a greataxe two-handed" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: trigger "at_will" stands on "a javelin for the throw" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "a javelin for the throw" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Meshrin — Large lizard folk" -> has (header) | "30 feet of movement" -> has (header) | "Wields a greataxe two-handed" -> has (mechanical) [asked: at_will/at_will/attack] | "a javelin for the throw" -> has (mechanical) [asked: at_will/at_will/attack] | "He is a barbarian who rages" -> has (mechanical) [asked: buff_self] | "Give him a frightening roar" -> has (mechanical) [asked: save_single] | "AC 16" -> has (header) | "120 hit points" -> has (header)
[reskin] extraction: 1 of 9 model clauses quote nothing the user typed and leave the record ("AC 16")
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Meshrin throws his head back and lets out a bone-shaking bellow that rolls over everything in front of him, rattling the nerve of anyone who hears it. The timid freeze where they stand, too terrified to close on him, while the roar also goads Meshrin's own blood so his next axe swings come faster and heavier. He can only bellow like this once in a fight, and only when he is already hurt or enraged" [action/save/condition] — menu: snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, gaze-single, execute, seal, pacify, escalating-dread, terror-pulse (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, rampage, lay-on-hands, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — rampage, throw-retrieve, terror-pulse (rage, javelin, roar)
[reskin] signature template: terror-pulse -> Actions/"Terrifying Bellow (2/Day)" ("a bone-shaking bellow rattles the nerve of anyone who hears it and leaves the ti [verb: roar:concept, bellow:idea]")
[reskin] keys spent by the action: roar
[reskin] signature idea (trait): "When Meshrin is wounded and raging, every greataxe swing he makes carries through its first target into whoever stands beside or behind it, so crowding him is worse than facing him. The deeper his wounds, the more of the battlefield his sweeping axe reaches." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (rage)
[reskin] pick kept on the GM's own words: trait — "gaze-aura" has no key-table verb, but the call quotes "give him a frightening roar" from the description
[reskin] trait ceiling: "Terrifying Roar" does not ship — 4 traits already, and print's ceiling for a meat body is 3
[reskin] weapons answered: Greataxe = greataxe; Javelin = javelin; Javelin Throw = javelin; Frightening Roar = none
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] chassis nova: "Javelin Throw (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "Draconic" -> "Common, Draconic" (sapient)
[reskin] print canon languages: "Common, Draconic" -> "Common, Draconic" — the Gladiator's plus the concept's Draconic
[reskin] print canon: chassis row leaves — Actions/"Javelin Throw (Recharge 5-6)" is the seat's nova, not the Gladiator's
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Shield Bash" leaves with the shield — a greataxe is two-handed and print pairs a shield with no heavy melee weapon (0 of 329 gear lines)
[reskin] dead control row: "Terrifying Bellow" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Terrifying Bellow.
[reskin] row binds its clause: "Terrifying Bellow" answers "Give him a frightening roar" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "Wields a greataxe two-handed" -> "Great Weapon Master" — trigger: asked at_will, row reads on_hit
[reskin] ask vs row ok: "a javelin for the throw" -> "Javelin" — trigger at_will, limit at_will
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
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Handaxe); nova none; dmg 33

```
Garrison Sellsword
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

Riposte (Reaction). When a creature within 5 feet of the sellsword misses it with a melee attack, the sellsword makes one Handaxe attack against that creature.

Actions
Multiattack: The sellsword makes three Handaxe attacks. It can replace one attack with a use of Shortsword.
Handaxe: Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) slashing damage, and the sellsword has advantage on its next attack roll against the target before the end of its next turn.
Shortsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage. Immediately after the attack, a handaxe returns to the sellsword's grasp, and the sellsword has advantage on its next attack roll against the target before the end of its next turn.
Shield Bash: One creature within 5 feet of the sellsword that it can see must succeed on a DC 15 Strength saving throw or take 9 (2d4 + 4) bludgeoning damage. If the target is a Medium or smaller creature, it is knocked prone.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Handaxe — authored for this sheet; a named part; a declared feature; the GM's clause "hurls a handaxe"; weapon handaxe
- Actions/Shortsword — authored for this sheet; a named part; a declared feature; the GM's clause "closes with a shortsword"; weapon shortsword
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
[concept] signature elements: hurled handaxe before the charge [behavior] | closing with the shortsword [behavior] | belt of iron handaxes [object]
[concept] identity: A sellsword who opens every fight by burying a handaxe in the nearest target, already sprinting in behind the throw — the axe is a down payment, the closing rush is collection. Once inside reach it works the shortsword in tight, economical cuts, always angling to recover the thrown axe or get a fresh one free; it stays mobile, never trading blows it can sidestep. Under pressure it turns cold and professional rather than wild — it disengages, reopens the gap, and hurls again on its own terms, and it flees only when the contract is clearly lost, not out of panic.
[concept] lore: A sellsword out of the border garrisons who sells axe-work by the day and keeps a brace of handaxes at the belt, fighting to fund the next contract and to be seen winning it.
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
[reskin] clauses: "a sellsword" -> has (mechanical), head [asked: attack] | "hurls a handaxe" -> has (mechanical) [asked: attack] | "closes with a shortsword" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — thrown-burst-seed, phase-slip, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "After the sellsword has thrown a handaxe, its next attack with the shortsword on that same turn ends with it already closing the distance — if the shortsword strikes the creature the thrown axe was aimed at, the sellsword rips the axe free or drives the target back a step as the throw's momentum carries home. It only works once per throw, and only against the creature the axe last bit into. On a h" [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, bolt-drag (+ shelf: snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating)
[reskin] word match declined by the call: throw-retrieve, bolt-drag — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "hook-rider" as nearest; it lands rather than the row being dropped (what it wanted: After a thrown axe hits, a follow-up shortsword hit drags the thrown-axe target )
[reskin] [gap] After a thrown axe hits, a follow-up shortsword hit drags the thrown-axe target in or reels the thrower's momentum home, — "After the sellsword has thrown a handaxe, its next attack with the shortsword on that same turn ends with it already closing the distance — if the shortsword strikes the creature the thrown axe was aimed at, the sellsword rips the axe free or drives the target back a step as the throw's momentum carries home. It only works once per throw, and only against the creature the axe last bit into. On a h" — Garrison Sellsword [seat: action [rider/on_hit/movement]] (closest offered: hook-rider) [effect: movement] [nearest landed] [menu: affliction contagion stunning-strike charge-push hook-rider pounce isolation bolt-mark bolt-drag throw-retrieve focus] [same-cell unoffered: none] [same-seat rejected: snatch:legality bolt-restrain:role bolt-drag:role charge:style]
[reskin] fit declined: "Axe Follow-Through" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The sellsword never runs short on handaxes: a brace hangs at the belt, and any axe it has thrown — whether it bit flesh or clattered off — can be called back into its grasp as the shortsword finishes its cut. If an enemy snatches or breaks a thrown axe, the sellsword simply draws a fresh one from the belt, so the volley is never spent for long." [trait/always/resource] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] closest accepted: trait — the call refused every template but named "faultless-tracker" as nearest; it lands rather than the row being dropped (what it wanted: thrown axes returning to the wielder's hand automatically)
[reskin] [gap] thrown axes returning to the wielder's hand automatically — "The sellsword never runs short on handaxes: a brace hangs at the belt, and any axe it has thrown — whether it bit flesh or clattered off — can be called back into its grasp as the shortsword finishes its cut. If an enemy snatches or breaks a thrown axe, the sellsword simply draws a fresh one from the belt, so the volley is never spent for long." — Garrison Sellsword [seat: trait [trait/always/resource]] (closest offered: faultless-tracker) [effect: resource] [nearest landed] [menu: adhesive phobia terrain-walk aberrant-ground faultless-tracker web-walker bloodied-fury uncanny-sense berserk shielded-mind evasion relentless-pursuit bound marking-light guarded-stance undead-fortitude mimicry truth-aura gaze-aura assassinate blurred-form death-burst resonant-body] [same-cell unoffered: lay-on-hands second-wind volley-order] [same-seat rejected: false-appearance:legality spider-climb:legality earth-glide:legality tunneler:legality sealed-body:role]
[reskin] trait declined: "Returning Axe" — no receipt: the call quoted none of the GM's words for it and it bound on no concept key (1d: the receipt is the gate, not the body's substance)
[reskin] weapons answered: Shortsword = shortsword; Handaxe = handaxe; Axe Volley = handaxe; Recovering Cast = none
[reskin] chassis nova: "Axe Volley (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] print canon multiattack: "the sellsword makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Perception +4, Stealth +5" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Axe Volley (Recharge 5-6)" is the seat's nova, not the Gladiator's
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon: chassis row leaves — Traits/"Footwork" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack reconciled: "Spear" is no row on this sheet — the Multiattack cites "Handaxe" instead
[reskin] multiattack reconciled: "Shield Bash" is no row on this sheet — the Multiattack cites "Shortsword" instead
audit finding below confidence gate: Shortsword The Hit-or-Miss rider carries a nested tracking burden (return timing plus next-attack Advantage) that the block gives no way to anchor, slowing mid-combat resolution.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
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

Divine Aid (3/Day). As a bonus action, Halric casts bless, dispel magic, healing word, or lesser restoration, using the same spellcasting ability as Spellcasting.
Litany of Ruin (1/Day). As a bonus action, Halric creates a choking haze in a 15-foot-radius sphere centered on itself. The effect lasts while Halric maintains concentration on it, up to 10 minutes. Each creature in the area has disadvantage on attack rolls.

Actions
Multiattack: Halric makes two Radiant Flame attacks.
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): -

At will: light, thaumaturgy

1/day each: spirit guardians
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Spellcasting — print's own row
- Actions/Radiant Flame — print's own row
- Bonus Actions/Divine Aid — cleric kit; the GM's clause "Brother"
- Bonus Actions/Litany of Ruin — template zone; library draw (seed unstamped)

**Engine trace**

```
[path] class_npc — class cleric — "Brother" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "Brother Halric" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("Brother Halric") | caster-warpriest: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid themes=armed/grave mind=sapient style=warpriest energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Brother Halric"
[concept] mechanics: none claimed
[concept] signature elements: corrupted battlefield prayers [behavior] | rusted iron plate and mace [object] | profane benediction that saps the willful [aura]
[concept] identity: Brother Halric opens with a raised mace and a battlefield prayer, then wades into the front line, his iron-shod blows carrying a cold, profane benediction that saps the will of the faithful. He fights to the death in grim certainty, never fleeing, and answers pressure with a harder, more relentless advance as his prayers turn to litanies of ruin.
[concept] lore: Once a crusading war-priest who broke his vows on the eve of a holy siege, Halric now wanders the old roads in rusted plate, offering a corrupted benediction to any who meet his gaze and demanding they kneel.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
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
[reskin] control spell gated to daily — Fear (level 3 control at will is print's CR 13+ shape; at CR 3 it is 1/Day)
[reskin] spell DC coherence: DC 13 -> 11 off Intelligence 13 (print's array stays)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Brother Halric" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Halric speaks a litany of ruin over the battlefield, and every enemy who can see or hear him feels the prayer settle on them like a weight — dampening their strikes and slowing their advance. The more he presses the fight, the heavier the litany grows, so those who stand and trade blows with him find their blows landing softer the longer they stay near." [action/always/condition] — menu: gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, bolt-restrain, bolt-drag, bolt-mark)
[reskin] word match declined by the call: rally, slow-bolt, wail — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "zone" as nearest; it lands rather than the row being dropped (what it wanted: an expanding emanation that applies a growing penalty to attack rolls and Speed )
[reskin] [gap] an expanding emanation that applies a growing penalty to attack rolls and Speed of enemies who remain near the speaker — "Halric speaks a litany of ruin over the battlefield, and every enemy who can see or hear him feels the prayer settle on them like a weight — dampening their strikes and slowing their advance. The more he presses the fight, the heavier the litany grows, so those who stand and trade blows with him find their blows landing softer the longer they stay near." — Brother Halric [seat: action [action/always/condition]] (closest offered: zone) [effect: condition] [nearest landed] [menu: gaze-single snare zone execute seal wail lure active-toll random-ray ground-burst spew obstacle-pull pacify escalating-dread snare-bolt slow-bolt sensory-strike herd thrown-burst-seed drain curse-debt zone-seed reveal wind-up blighted-ground rally] [same-cell unoffered: adhesive phobia faultless-tracker berserk marking-light] [same-seat rejected: throw-retrieve:role]
[reskin] seat takes its clause: "Litany of Ruin (1/Day)" answers "Halric" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: zone -> Actions/"Litany of Ruin (1/Day)" ("A litany that dampens enemies' strikes and slows them over time is an escalating [shape fit, no verb match]")
[reskin] signature idea (trait): "Rusted iron clings to Halric: anyone who strikes him in close combat has their weapon or grip fouled by clinging flakes of corroded plate, making their next swing clumsy and uncertain. The flaking worsens each time he takes a hit, so pressing him in melee hands the fight to him." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] closest accepted: trait — the call refused every template but named "resonant-body" as nearest; it lands rather than the row being dropped (what it wanted: penalizes the attacker's next attack roll (fouled grip) after hitting Halric in )
[reskin] [gap] penalizes the attacker's next attack roll (fouled grip) after hitting Halric in melee, stacking as he takes hits — "Rusted iron clings to Halric: anyone who strikes him in close combat has their weapon or grip fouled by clinging flakes of corroded plate, making their next swing clumsy and uncertain. The flaking worsens each time he takes a hit, so pressing him in melee hands the fight to him." — Brother Halric [seat: trait [trait/on_being_hit/condition]] (closest offered: resonant-body) [effect: condition] [nearest landed] [menu: absorption bloodied-burst resonant-body] [same-cell unoffered: none] [same-seat rejected: heated-body:legality weapon-lodge:role]
[reskin] trait declined: "Rusted Retort" — no receipt: the call quoted none of the GM's words for it and it bound on no concept key (1d: the receipt is the gate, not the body's substance)
[reskin] weapons answered: Mace = mace
[reskin] print canon alignment: Neutral Evil -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Radiant Flame — the Priest's own ranged row, added (the chassis carried none to rename)
[reskin] print canon multiattack: "Halric makes two attacks, using Mace or Radiant Flame in any combination." — the Priest's own
[reskin] print canon skills: "Arcana +3, Perception +5" -> "Medicine +7, Perception +5, Religion +5" — the Priest's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Mace" — the Priest prints no row for it and no path stage claimed it
[reskin] multiattack re-read — "Mace" left; "Multiattack" now reads "Halric makes two Radiant Flame attacks."
[reskin] print canon: chassis row leaves — Reactions/"Protective Magic (3/Day)" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] dead control row: "Litany of Ruin (1/Day)" moves to Bonus Actions — no damage, no save, no KO condition
audit finding below confidence gate: Litany of Ruin The ability is a bonus action but grants no explicit Concentration save/breakoff mechanics tying it to the spellcasting rules, and it does not state that creatures can leave the emanation or what happens when a creature exits and re-enters, leaving the GM unable to adjudicate persistence for moving targets.
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 13 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] 2014 conversion: one lint-gated call — both printings saved
```

