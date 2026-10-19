# Release table for the critic — 2014 blocks — 2026-10-19

The case is at the top of the 2024 file (RELEASE-for-critic-2024-2026-10-19-lurker.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

## Review batch — sweep-2026-10-19T14-03-35

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Silt Maw Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/4 |
| Owlbear | 3 (2014) | 2014 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Toll-Keeper | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Air Elemental | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Spoilheap Animist | 5 (2014) | 2014 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 1/4 |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Musterfall Golem | 8 | 2024 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/5 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Swarm of Drowned Nave Choirs | 10 (2014) | 2014 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Vampire | 13 (2014) | 2014 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 8/8 |
| Plague Choir | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Glacier Heart | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 6/6 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Brass Tyrant | 17 | 2024 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 7/9 |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Ossuar Sun-Throne | 20 (2014) | 2014 | caster-21 | ok | ok | ok | SOFT: rider-no-save, control-aoe-ungated | ok | ok | ok | ok | FAIL: name-mechanic | ok | FAIL (1) | 1/1 | 9/11 |
| Ancient Gold Dragon | 24 (2014) | 2014 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Trench Hymn | 24 | 2024 | brute-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 1/6 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Vashka the Red | 6 | 2024 | defender-5 | ok | ok | FAIL: duplicate-row | ok | ok | ok | FAIL: print-rows | ok | ok | ok | FAIL (2) | 2/2 | 6/7 |
| Sump-Molt Reaper | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 3/5 | 5/5 |
| Black Iron Sentinel | 11 (2014) | 2014 | defender-5 | ok | user-set: AC 20 · reads CR 9 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 3/3 | 3/4 |
| Mireth Thornwater | 7 | 2024 | caster-8-binder | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 2/2 | 4/6 |
| Brother Aldric | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | SOFT: kit-lands | soft (1) | 2/2 | 1/1 |
| Ilvareth Dusksong | 12 (2014) | 2014 | caster-12 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 4/5 |
| Swarm of Vesper Chimes | 13 | 2024 | swarm-9 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/3 |
| Nave Vault Ooze | 9 (2014) | 2014 | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Stormcrag Tyrant | 7 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Skarra Hurlstone | 9 (2014) | 2014 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/2 |
| Reedjaw Adept | 5 (2014) | 2014 | skirmisher-3 | ok | FAIL: per-attack-ceiling | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 7/7 |
| Krennik Skullstandard | 4 (2014) | 2014 | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/6 |
| Wellmouth | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/4 |
| Kkresh | 4 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 13/14 | 4/4 |
| Meshrin | 8 (2014) | 2014 | skirmisher-8-hurler | ok | user-set: AC 16, HP 120 · reads CR 6.5 | SOFT: lint:hp-formula | ok | ok | ok | ok | ok | ok | ok | soft (1) | 8/8 | 8/8 |
| Gravebound Greatsword | 6 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/3 |
| Wagebound Sellsword | 5 (2014) | 2014 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 2/2 | 4/4 |
| Brother Halric | 3 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: kit-lands | FAIL (1) | 1/1 | 4/4 |

**Dropped 9 of 71 user clauses** (coverage 87%); concept share 85% (165/194 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- caster-21 / reader: 1
- defender-5 / structure: 1
- defender-5 / donor: 1
- skirmisher-3 / bands: 1
- skirmisher-3 / class: 1



---


### Silt Maw Hound — a 2014 sheet

**Concept:** a mud-caked bog hound that drags fishermen under

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Silt Maw Hound | 1 (2014) | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "drags fishermen under"
- read: def 0 / off 1 → 0.5; sustained 10 (2 × Bite); nova none; dmg 10

```
Silt Maw Hound
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

Silt Stride. Difficult terrain composed of bog mud doesn't cost the maw hound extra movement, and the maw hound can move across bog mud without needing to make an ability check.
Whelm. As a bonus action, the maw hound whelms one Medium or smaller creature it is grappling. While whelmed, the target is blinded and restrained, has total cover against attacks and other effects outside the maw hound, and takes 3 (1d6) bludgeoning damage at the start of each of the maw hound's turns. The maw hound can have only one creature whelmed at a time. If the maw hound takes 5 damage or more in a single turn from the whelmed creature, the maw hound must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the maw hound. If the maw hound dies, a whelmed creature pulls free prone by using 5 feet of movement.

Actions
Multiattack: The maw hound makes two Bite attacks. It can replace one attack with a use of Drowning Thrash.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained.
Drowning Thrash: One creature within 30 feet that is grappled by the maw hound must make a DC 13 Strength saving throw, taking 5 (1d10) piercing damage on a failed save, or half as much damage on a successful one.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Bite — the chassis
- Actions/Drowning Thrash — library seed exploiter
- Bonus Actions/Whelm — binds the GM's words: whelm+swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon
- Traits/Silt Stride — template terrain-walk; library draw (seed unstamped); binds the GM's words: bog+mud

**Engine trace**

```
[path] homebrew — "a mud-caked bog hound that drags fishermen under" (call)
[route] brute-grappler type=Beast mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "drags fishermen under" | brute-grappler: ✓ ("drags fishermen under") | brute-grappler: no line key in the words — the model's read of its quote
[concept] hints: engulf→mechanics ✓ ("seizes and drags victims under")
[concept] resolve: archetype=brute type=Beast themes=aquatic/bestial mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: dragging prey down into the water [behavior] | mud-caked hide [body] | ambush from the shallows [behavior]
[concept] identity: The bog hound lies half-submerged in the muck until a fisherman's line or boot disturbs it, then lunges to seize a leg or wrist in its jaws and drops its full weight backward into the water, dragging the struggling victim down and under. Each round it keeps clamped on, worrying and rolling to drown and exhaust its prey, hauling it deeper toward the silt. It holds until the thrashing stops and does not break off a grip willingly even when wounded, fighting to the death over a catch.
[concept] lore: Born in the weedy shallows of a drowning bog, the mud-caked hound is a patient ambush predator that makes its den in the silt and wants only to fill its belly with whatever wanders to the water's edge.
[reskin] donor: brute-5-grappler -> CR 1
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] engulf engine: Whelm — the body's own verb
[reskin] engine interior scaled — CR 1 sits below the brute-5-grappler seat
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the maw hound" — the call's own answer (kind), built from the name
[reskin] inline form: "the maw hound" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a mud-caked bog hound" -> has (descriptive), head | "drags fishermen under" -> has (mechanical) [asked: on_hit/condition]
[reskin] signature idea (action): "Gripping a foe it has seized, the hound throws its whole weight backward and hauls the creature bodily toward the nearest water, mud, or soft low ground — and every step of that drag sinks the victim deeper into the muck. It only works on a creature already caught in its jaws, and the pull is short but brutal, meant to peel prey off dry footing and into the bog rather than to carry it far." [rider/on_hit/movement] — menu: contagion, charge-push, hook-rider, pounce (+ shelf: swallow, shield-bash, hook-drag, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — hook-drag, hook-rider (drag, under, drags)
[reskin] word match declined by the call: hook-drag, hook-rider — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown hook-drag, hook-rider, which the GM's words keyed
[reskin] key match declined: action — "hook-drag" was ranked first on the call's own menu for drag+under, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Gripping a foe it has seized, the hound throws its whole weight backward and hauls the creature bodily toward the nearest water, mud, or soft low ground — and every step of that drag sinks the victim deeper into the muck. It only works on a creature already caught in its jaws, and the pull is short but brutal, meant to peel prey off dry footing and into the bog rather than to carry it far." [rider/on_hit/movement] — the model found no template that holds it (offered: hook-drag, hook-rider, contagion, charge-push, pounce, exploiter, swallow, thrown-burst-seed)
[reskin] fallback respects the call: hook-drag left the shelf — the call declined it for this sheet
[reskin] value check: "Opportunist's Lash" EV 3.9 vs floor 3.1 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The hound's hide is a rippling coat of slick, clinging mud that has dried and cracked over generations in the silt; anyone who strikes it, grapples it, or is seized by it comes away smeared and blinded, their footing treacherous and their eyes stung. Wet muck sloughs off the hound to gum up blades and hands that touch it." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog, mud)
[reskin] word match declined by the call: adhesive, heated-body, bloodied-burst, resonant-body, weapon-lodge, absorption, aberrant-ground — the key word does not mean the mechanic here
[reskin] signature template (trait): terrain-walk -> Traits/"Silt Stride" ("The hound is caked in bog mud and moves through the silt without hindrance. [verb: bog:concept, mud:concept]")
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 4 on a Beast speaks nothing, whatever the mind read said
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
[reskin] asked but unanswered: "drags fishermen under" asked for on_hit and no row binds the clause
audit finding below confidence gate: Whelm The name describes a vague engulfing but does not name the mechanic (Blinded, Restrained, and total cover while held in the maw) the entry actually delivers.
[reskin] audit rename: "Opportunist's Lash" -> "Drowning Thrash"
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

Athletics +7, Perception +3

Saving Throws: 

STR +7

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

None

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Sheer Climber. The owlbear can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The owlbear makes two Rend attacks.
Rend: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.
```

**Where each row came from**

- Actions/Multiattack — print's own row
- Actions/Rend — print's own row, renamed
- Traits/Sheer Climber — template spider-climb; library draw (seed unstamped); the GM's clause "has learned to climb"; binds the GM's words: climb+climbs+climbing+walls+wall+cling+sheer

**Engine trace**

```
[path] twist — Owlbear (is) — "Name field: Owlbear" (code)
[route] brute type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("Owlbear") | brute: no line key in the words — the model's read of its quote
[concept] name: "Owlbear" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/grasping mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: none claimed
[concept] signature elements: learned climbing and ambush from above [behavior] | owl-bear hybrid body of hide, beak, and taloned limbs [body] | crashing pounce that pins prey with hooked claws [behavior]
[concept] identity: The owlbear opens by dropping from a ledge or tree trunk it has already scaled, driving its full bulk down onto the lead target in a crashing ambush, then wades in with beak and taloned forelimbs while using every boulder and tree as cover to reposition between blows. It fights like a bear that thinks in vertical structures, retreating up a trunk or cliff whenever it is hurt and raining back down once its pursuers commit — a patient, cunning predator that treats the third dimension as its private killing ground.
[concept] lore: A wizard's failed fusion of owl and bear that escaped into rocky highlands, the climbing owlbear learned that prey never looks up and has made a living in the trees and cliff faces ever since.
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
[reskin] signature idea (action): "The owlbear leaps down from a ledge, trunk, or cliff it has climbed, slamming its full weight into whatever it lands on and knocking nearby creatures off their feet with the shock of the impact. It can only do this from higher ground it reached under its own power, so prey that keeps it off the high spots never sees it fall." [action/once_per_fight/movement] — menu: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce, charge)
[reskin] fit declined: "Crashing Drop" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Owlbear's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Its taloned forelimbs grip bark, stone, and cliff face as easily as open ground, so it can scale sheer surfaces and cling in place, using trees and rock walls to reposition between blows." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — spider-climb (climb, climbs, climbing)
[reskin] signature template (trait): spider-climb -> Traits/"Sheer Climber" ("Its taloned forelimbs scale sheer surfaces and cling in place, letting it climb  [verb: climb:concept, climbs:concept, climbing:concept, walls:idea, wall:idea, cling:idea, sheer:idea]")
[reskin] weapons answered: Talons = none; Dropping Ambush = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon attack: "Talons" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "The owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] row binds its clause: "Sheer Climber" answers "has learned to climb" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Adult Red Dragon — a legendary

**Concept:** name: Adult Red Dragon | blind in one eye from an old lance

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Adult Red Dragon | 17 (2014) | dragon-15 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
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

Perception +7, Stealth +6

Saving Throws: 

DEX +6, WIS +7

Damage Immunities: 

fire

Senses: 

blindsight 60 ft., darkvision 120 ft., passive Perception 17

Languages: 

Common, Draconic

Challenge

17 (18,000 XP)

Proficiency Bonus:

+6

Legendary Resistance (3/Day). If the red dragon fails a saving throw, it can choose to succeed instead.

Actions
Multiattack: The red dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray.
Rend: Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 13 (1d10 + 8) slashing damage plus 5 (2d4) fire damage.
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

- Traits/Legendary Resistance — the chassis
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
[concept] hints: dragon→body ✓ ("Adult Red Dragon, blind in one eye")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/terror mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Adult Red Dragon"
[concept] mechanics: breath
[concept] signature elements: the blind eye from an old lance wound [body] | fire breath used to herd and blind prey [behavior] | hoard-lord's territorial fury [aura]
[concept] identity: An adult red dragon who lost the left half of its vision to a lance driven through the socket decades ago, so it now fights as a creature of forced angles — it sweeps into the open with a cone of fire laid down to its blind side's cover, then keeps its ruined eye toward nothing, banking and strafing so prey must enter the side it can actually see. It harries and circles instead of committing, using its breath to herd foes out of cover and refusing to close until the field is burnt flat, and when bloodied it does not flee — it goes berserk-prone, hammering the ground and anything near it with tail and claws while the scarred eye weeps smoke.
[concept] lore: A mountain-lord of the cinder peaks who has ruled its valley since before the lance that half-blinded it, and it wants only to be left alone atop its hoard — but it will hunt the descendants of the knight who took its eye, and it never forgets a smith's mark.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] print canon defenses: HP 256 -> 256, AC 20 -> 19 — the Adult Red Dragon's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 27, DEX 10, CON 25, INT 16, WIS 13, CHA 23 — the Adult Red Dragon's at its own CR; attack +10 -> +14, DC 21 (print's)
[reskin] donor: dragon-15 -> CR 17
[reskin] [path] decides: twist on the Adult Red Dragon (the matcher agrees)
[reskin] print canon: "Adult Red Dragon — blind in one eye from an old lance" heads on the Adult Red Dragon — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Blind-Side Bank" promises the Blinded condition but the row never delivers it — name what the rule does, or drop the claim word; this row earns Stride, Rush, Surge
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the red dragon" — the call answered "the red dragon" (kind), which the name does not support
[reskin] inline form: "the red dragon" — the model's own reading of the name
[reskin] spell DC coherence: DC 19 -> 20 off Charisma 23 (print's array stays)
[reskin] save dc derived: DC 19 -> 20 (8 + PB 6 + Charisma's 6) — no stat on the sheet reached it
[reskin] lacks asked: "blind in one eye"
[reskin] clauses: "Adult Red Dragon — blind in one eye from an old lance" -> LACKS (mechanical)
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, thrown-burst-seed, drain, exploiter, sensory-strike, herd, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (the sheet cannot render them)
[reskin] signature idea (action): "The dragon looses a low, crawling sheet of fire that skims the ground instead of blasting out — it spills wide to the dragon's ruined side and creeps around the edges of walls, rocks, and low cover, leaving open ground scorched and anyone hiding behind it driven out into the clear. It is fed by the same fire the dragon breathes, but this is the smoke and embers of it, cast wide and low to herd rat" [action/always/movement] — menu: snare, condition-payoff, execute, throw-retrieve, seal, shield-bash (+ shelf: lure, lay-on-hands, second-wind, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — throw-retrieve, charge (lance)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown throw-retrieve, charge, which the GM's words keyed
[reskin] key match declined: action — "throw-retrieve" was ranked first on the call's own menu for lance, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The dragon looses a low, crawling sheet of fire that skims the ground instead of blasting out — it spills wide to the dragon's ruined side and creeps around the edges of walls, rocks, and low cover, leaving open ground scorched and anyone hiding behind it driven out into the clear. It is fed by the same fire the dragon breathes, but this is the smoke and embers of it, cast wide and low to herd rat" [action/always/movement] — the model found no template that holds it (offered: throw-retrieve, charge, snare, condition-payoff, execute, seal, shield-bash)
[reskin] signature idea (trait): "The dragon's blind side is a wound that never healed true, and it reins itself in whenever prey crosses into it. If it takes a hit from a creature on that side, the shock of the old wound makes it recoil and give ground, so it keeps the ruined eye turned away and must swing the whole head round to find what struck it — the side is its tell and its temper." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, blurred-form, death-burst)
[reskin] word match declined by the call: heated-body, bloodied-burst, resonant-body, weapon-lodge, absorption — the key word does not mean the mechanic here
[reskin] trait declined: "Old Lance Fury" — bound only on the idea's own words (wounded:idea, temper:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Claw = none; Cinder Cone = none; Scar-Socket Stare = none; Scarred Lunge = none; Blind-Side Bank = none; Smoke-Wracked Roar = none
[reskin] chassis nova: "Cinder Cone (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] print canon alignment: Lawful Neutral -> Chaotic Evil — the Adult Red Dragon's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Draconic" -> "Common, Draconic" — the Adult Red Dragon's
[reskin] print canon attack: "Claw" -> "Rend" — the Adult Red Dragon's own row
[reskin] print canon multiattack: "The red dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast *Scorching Ray*." — the Adult Red Dragon's own
[reskin] element immunity: Fire (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 -> 60
[reskin] dragon spell DC derived: 20 (8 + PB + Cha mod — the breath keeps the card DC)
[reskin] dragon mental save DC derived: "Smoke-Wracked Roar" -> 20 (the Frightful Presence class keys to Charisma)
[reskin] immunities stamped for type: Dragon -> Fire
[reskin] print canon: chassis row leaves — Actions/"Cinder Cone (Recharge 5-6)" is the seat's nova, not the Adult Red Dragon's
[reskin] print canon legendary: Commanding Presence, Fiery Rays, Pounce — the Adult Red Dragon's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Fire Breath (Recharge 5-6) — the Adult Red Dragon's own
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
audit finding below confidence gate: Multiattack The Multiattack rider references casting Scorching Ray, but the Spellcasting entry lists Scorching Ray as At Will (which is fine) while the 1/Day Fireball is never usable in Multiattack — however the deeper inconsistency is that the Spells list formats '1/Day Each: Fireball' as if the spell name is a use-frequency label; the Spellcasting action's spell list has no 'Cast a Spell' action cost statement in the 2024 format, but this is a style issue, not adjudicability.
[reskin] audit rewrite blocked — "Commanding Presence" is engine-authored chassis text
[reskin] audit rewrite blocked — "Fiery Rays" is engine-authored chassis text
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Spoilheap Animist — one marked soft

**Concept:** a quarry-pit thing of living scree that buries what it catches

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Spoilheap Animist | 5 (2014) | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 3 (print at 5 reads 2.5–9.5, n=25)
- read: def 2 / off 4 → 3; sustained 32 (2 × Slam); nova none; dmg 32

```
Spoilheap Animist
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

Buries What It Catches. When the animist entombs a creature, the animist drags the entombed creature down into itself, and while entombed the target is buried in spoil and is blinded and restrained.
Entomb. As a bonus action, the animist entombs one Medium or smaller creature it is grappling. While entombed, the target is blinded and restrained, has total cover against attacks and other effects outside the animist, and takes 7 (2d6) bludgeoning damage at the start of each of the animist's turns. The animist can have only one creature entombed at a time. If the animist takes 15 damage or more in a single turn from the entombed creature, the animist must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the animist. If the animist dies, an entombed creature breaks free prone by using 5 feet of movement.

Actions
Multiattack: The animist makes two Slam attacks. It can replace one attack with a use of Hooked Lash.
Slam: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is also restrained.
Hooked Lash: One creature within 30 feet must succeed on a DC 14 Strength saving throw or be pulled up to 20 feet straight toward the animist by its grip and be grappled (escape DC 14).
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Slam — the chassis
- Actions/Hooked Lash — library seed hook-drag
- Bonus Actions/Entomb — binds the GM's words: entomb+swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+cocoon+whelm
- Traits/Buries What It Catches — authored for this sheet; the GM's clause "buries what it catches"

**Engine trace**

```
[path] homebrew — "a quarry-pit thing of living scree that buries what it catches" (call)
[route] brute-grappler type=Elemental mechanics=grapple, engulf, snare — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "buries what it catches" | brute-grappler: ✓ ("buries what it catches") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental themes=elemental/grasping mind=mindless style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf, snare
[concept] signature elements: burying prey under heaps of packed scree [behavior] | a body of loose living rubble and broken quarry stone [body] | the surge of a collapsing gravel slope [aura]
[concept] identity: The scree-pit opens a fight by surging up out of the quarry floor as a loose avalanche of jagged stone, then every round after tries to slam prey down and heave a wave of scree and rubble over it, packing the victim under until the pile goes still. It fights with the patience of settling gravel rather than hunger — a corpse in its slope is just another load-bearing stone — but once prey starts breaking free it doubles its burying weight and grinds down without pause.
[concept] lore: Born where a quarry's spoil heap was left to swallow its own dead, the mound-animist lives only to keep burying things, treating every struggling body as ballast it is owed.
[reskin] donor: brute-5-grappler -> CR 5
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] engulf engine: Entomb — the body's own verb
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the animist" — the call's own answer (kind), built from the name
[reskin] inline form: "the animist" — the model's own reading of the name
[reskin] save dc derived: DC 13, 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a quarry-pit thing of living scree" -> has (descriptive), head | "buries what it catches" -> has (mechanical) [asked: condition]
[reskin] signature idea (action): "When the animist slams a creature already pinned under its weight, the impact shakes the whole slope loose and a sheet of scree slides across the ground around it, dragging every nearby creature off its feet and burying them waist-deep in shifting stone. Those caught are stuck wading through rubble until they claw their way free, and the animist's own buried prey is shoved deeper by the same wave." [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider, pounce (+ shelf: swallow, leap, condition-payoff, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, burrow-ambush, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] nova declined: "Scree Slide (Recharge 5-6)" — a whole-round ability the GM never asked for: the call offered no quote, and the key table finds no verb either (the idea's own words: around it:idea); the fallback stands in (the cauldron's spill, 2026-09-29)
[reskin] value check: "Hooked Lash" EV 9.4 vs floor 8.8 (one attack of 2) — worth the trade
[reskin] library seed drawn: hook-drag -> Actions/"Hooked Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its body is a slope of loose scree that never stops settling: whenever it is struck, the blow knocks stones and grit loose that spray out at whoever hit it and pile up around its base, leaving the attacker mired in rubble. The more the animist is battered, the deeper the drifts grow, until the ground around it becomes a churning spoil pit that slows and swallows everyone standing in it." [trait/on_being_hit/movement] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — aberrant-ground, terrain-walk, faultless-tracker (scree, quarry)
[reskin] word match declined by the call: aberrant-ground, terrain-walk, faultless-tracker, false-appearance, earth-glide, relentless-pursuit — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown aberrant-ground, terrain-walk, faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "aberrant-ground" was ranked first on the call's own menu for scree, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Its body is a slope of loose scree that never stops settling: whenever it is struck, the blow knocks stones and grit loose that spray out at whoever hit it and pile up around its base, leaving the attacker mired in rubble. The more the animist is battered, the deeper the drifts grow, until the ground around it becomes a churning spoil pit that slows and swallows everyone standing in it." [trait/on_being_hit/movement] — the model found no template that holds it (offered: aberrant-ground, terrain-walk, faultless-tracker, heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, earth-glide, relentless-pursuit)
[reskin] concept-first trait skipped: terrain-walk — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] concept-first trait skipped: aberrant-ground — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] repair: 1 clause(s) with no row — "buries what it catches"; one targeted call with the sheet as context
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Slam = none
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] multiattack replacement clause: It can replace one attack with a use of Hooked Lash.
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Glacier Heart — bands soft

**Concept:** a glacier's heart given legs, trailing a wake of killing cold

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Glacier Heart | 15 (2014) | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 12.5 (print at 15 reads 7–15, n=12)
- **dropped clause:** "trailing a wake of killing cold"
- read: def 10 / off 15 → 12.5; sustained 70 (2 × Ice Leg); nova Killing Cold 71; dmg 94

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

Spreading Frost. A creature that touches the glacier heart or hits it with a melee attack while within 5 feet of it takes 10 (3d6) cold damage.
Cold Absorption. Whenever the glacier heart is subjected to cold damage, it takes no damage and instead regains a number of hit points equal to the cold damage dealt.
Siege Monster. The glacier heart deals double damage to objects and structures.

Actions
Multiattack: The glacier heart makes two Ice Leg attacks. It can replace one attack with a use of Glacial Dread.
Ice Leg: Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage plus 13 (3d8) cold damage.
Killing Cold (Recharge 5-6): Each creature in a 30-foot cone must make a DC 17 Strength saving throw, taking 71 (13d10) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone until the end of its next turn.
Glacial Dread: One creature within 60 feet of the glacier heart must succeed on a DC 17 Wisdom saving throw or be frightened of the glacier heart until the end of the glacier heart's next turn. If the target was already frightened by this ability, it also takes 32 (5d12) cold damage.
```

**Where each row came from**

- Traits/Spreading Frost — template heated-body; library draw (seed unstamped); binds the GM's words: touch+frost
- Traits/Cold Absorption — the chassis
- Traits/Siege Monster — the chassis
- Actions/Multiattack — the chassis
- Actions/Ice Leg — the chassis
- Actions/Killing Cold — the chassis
- Actions/Glacial Dread — library seed escalating-dread

**Engine trace**

```
[path] homebrew — "a glacier's heart given legs, trailing a wake of killing cold" (call)
[route] brute-juggernaut type=Elemental mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a glacier's heart given legs") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental themes=elemental/bestial mind=mindless style=juggernaut energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: the killing-cold wake it leaves behind it [aura] | a glacier's heart crawled out of the ice on legs [body] | walking straight through anything instead of around it [behavior]
[concept] identity: The glacier's heart strides forward on four legs of groaning blue ice, and it does not need to swing — everything within its reach simply freezes, the killing cold radiating out along its path. It walks in a straight line through whatever stands against it, crushing with its frozen mass and leaving a widening wake of frost-locked corpses and shattered terrain. It does not tire, cannot be reasoned with, and never retreats — it advances until nothing warm remains in front of it.
[concept] lore: Beneath a living glacier a heart of ice grew for ten thousand years; when the ice broke, a thing with legs crawled out of it — and it walks still, dragging the glacier's cold with it, trying to freeze the whole world back to the stillness it came from.
[reskin] donor: brute-9-juggernaut -> CR 15
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Glacier Heart = literal
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the glacier heart" — the call's own answer (kind), built from the name
[reskin] inline form: "the glacier heart" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 17 (8 + PB 5 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a glacier's heart given legs" -> has (descriptive), head | "trailing a wake of killing cold" -> has (mechanical)
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The glacier heart surges forward in one unbroken straight line, heedless of anything in its path — creatures, walls, standing stones. Everything it overruns is crushed beneath frozen mass and left pinned in the shattered wake, and the ground it crosses stays so bitterly cold that it keeps seeping into whoever lingers there. It never turns, never stops, and the cold trail it leaves spreads wider be" [action/always/movement] — menu: condition-payoff, shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] word match declined by the call: condition-payoff, exploiter — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The glacier heart surges forward in one unbroken straight line, heedless of anything in its path — creatures, walls, standing stones. Everything it overruns is crushed beneath frozen mass and left pinned in the shattered wake, and the ground it crosses stays so bitterly cold that it keeps seeping into whoever lingers there. It never turns, never stops, and the cold trail it leaves spreads wider be" [action/always/movement] — the model found no template that holds it (offered: condition-payoff, shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter)
[reskin] fallback respects the call: condition-payoff, exploiter left the shelf — the call declined them for this sheet
[reskin] value check: "Creeping Dread" EV 22 vs floor 16.6 (one attack of 2) — dice 16 → 32
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Anything that strikes the glacier heart's frozen body is doused in its crawling cold — the weapon, the limb, the spell, whatever touched it takes on the frost and keeps hurting its owner for a moment after contact. The creature's heart is ice that spreads itself through touch." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk, aberrant-ground, faultless-tracker (glacier, wake, trail)
[reskin] word match declined by the call: terrain-walk, aberrant-ground — the key word does not mean the mechanic here
[reskin] signature template (trait): heated-body -> Traits/"Spreading Frost" ("Anything that touches or strikes its frozen body is coated in its cold and takes [verb: touch:idea, frost:idea]")
[reskin] weapons answered: Ice Leg = none
[reskin] chassis nova: "Killing Cold (Recharge 5-6)" — the brute-9-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] trait stripped: Traits/Immutable Form — a golem's trait on a Elemental
[reskin] defenses by material: a ice body is vulnerable to Fire and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] absorption re-keyed: Acid -> Cold (the donor organ obeys the concept energy)
[reskin] immunities stamped for type: Elemental -> Cold, Poison; Exhaustion, Poisoned
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
[reskin] save re-derived after a retype: Actions/Killing Cold — a Constitution save for an effect that calls for Strength or Dexterity; the save follows the condition
[reskin] audit rename: "Creeping Dread" -> "Glacial Dread"
[reskin] size floor: STR 16 -> 18 — print prints no corporeal Huge body under 18 (the Archelon); the attack follows it, as print's own 49 do
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Nave Vault Ooze — bands soft

**Concept:** a cathedral-vault ooze that digests reliquaries

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Nave Vault Ooze | 9 (2014) | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6 (print at 9 reads 5.5–13, n=8)
- read: def 4 / off 8 → 6; sustained 54 (2 × Slam); nova none; dmg 54

```
Nave Vault Ooze
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

acid, necrotic

Condition Immunities: 

charmed, deafened, exhaustion, frightened, grappled, prone, restrained

Senses: 

blindsight 30 ft. (blind beyond this radius), passive Perception 9

Languages: 

None

Challenge

9 (5,000 XP)

Proficiency Bonus:

+4

Amorphous. The vault ooze can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form. A creature that touches the vault ooze or hits it with a melee attack while within 5 feet of it takes 9 (2d8) necrotic damage.
Spider Climb. The vault ooze can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The vault ooze makes two Slam attacks.
Slam: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 11 (2d10) necrotic damage.
```

**Where each row came from**

- Traits/Amorphous — the chassis
- Traits/Corrosive Form — the chassis
- Traits/Spider Climb — the chassis
- Actions/Multiattack — the chassis
- Actions/Slam — the chassis

**Engine trace**

```
[path] homebrew — "a cathedral-vault ooze that digests reliquaries" (call)
[route] ooze type=Ooze mechanics=grapple — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "digests reliquaries" | ooze: ✓ ("a cathedral-vault ooze") | ooze: no line key in the words — the model's read of its quote
[concept] hints: ooze→body ✓ ("cathedral-vault ooze") | engulf→mechanics ✓ ("digests reliquaries")
[concept] resolve: archetype=ooze type=Ooze themes=grave/devouring mind=mindless style=— energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple
[concept] signature elements: digesting reliquaries and consecrated bone [behavior] | the rotting corpse-vault body [body] | grave-stink that sickens the faithful [aura]
[concept] identity: A cathedral-vault ooze seeps down from the rafters and through the reliquary grates, first slathering a saint's casket in dissolving rot to soften the gilding before it folds the whole shrine into its body. Every round it rolls forward over altars and ossuaries, digesting consecrated bone and silver into more of itself while shedding clouds of grave-stink that make the faithful retch. It has no hunger to flee on — once it has tasted sanctity it fights to the last drop, mindlessly following the richest relic in the room.
[concept] lore: Born in the flooded crypt of a collapsed minster, the vault-ooze is the mingled rot of a hundred interred relic-pilgrims, and it wants only the next gilded casket to dissolve.
[reskin] body type: ooze — the body outranks the role (recorded: ooze)
[reskin] donor: ooze-9 -> CR 9 (invented — no printed peer)
[reskin] row gated out: Engulf (engulf) — the concept did not claim this mechanic
[reskin] [path] decides: homebrew (the matcher would have said twist Gray Ooze)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the vault ooze" — the call's own answer (kind), built from the name
[reskin] inline form: "the vault ooze" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a cathedral-vault ooze" -> has (descriptive), head | "digests reliquaries" -> has (descriptive)
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, push-prone, herd, thrown-burst-seed, drain, delayed-brand, zone-seed, wind-up, blighted-ground, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the vault ooze strikes a creature or object, it slathers the target in its digesting rot, and that rot keeps eating. The coating clings where the slam landed and gnaws at the target for a short while, growing worse if the ooze keeps pressing the same victim. A target already wearing this rot that gets struck again sees the gilding of whatever it carries flake away." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, rampage, patient-defense, second-wind, riposte)
[reskin] signature re-seated: action — no rider shares the verb; the idea "When the vault ooze strikes a creature or object, it slather…" is tried as an action
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, push-prone, herd, thrown-burst-seed, drain, zone-seed, wind-up, blighted-ground, delayed-brand, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the vault ooze strikes a creature or object, it slathers the target in its digesting rot, and that rot keeps eating. The coating clings where the slam landed and gnaws at the target for a short while, growing worse if the ooze keeps pressing the same victim. A target already wearing this rot that gets struck again sees the gilding of whatever it carries flake away." [action/save/damage] — menu: trample, leap, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew (+ shelf: rampage, patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature miss: action — "When the vault ooze strikes a creature or object, it slathers the target in its digesting rot, and that rot keeps eating. The coating clings where the slam landed and gnaws at the target for a short while, growing worse if the ooze keeps pressing the same victim. A target already wearing this rot that gets struck again sees the gilding of whatever it carries flake away." [action/save/damage] — no template on the shelf shares a verb with the concept or the idea (offered: trample, leap, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, rampage, patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature idea (trait): "Anything that dies inside the ooze's reach — a rat, a fallen pilgrim, a smashed ossuary's contents — is drawn into its body and digested, and this feeds the ooze enough that it mends and swells. Corpses and consecrated bone are its true food, so an ossuary or reliquary the ooze consumes leaves it stronger than before." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — aberrant-ground (ooze)
[reskin] word match declined by the call: absorption, warded-mending — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown aberrant-ground, which the GM's words keyed
[reskin] key match declined: trait — "aberrant-ground" was ranked first on the call's own menu for ooze, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Anything that dies inside the ooze's reach — a rat, a fallen pilgrim, a smashed ossuary's contents — is drawn into its body and digested, and this feeds the ooze enough that it mends and swells. Corpses and consecrated bone are its true food, so an ossuary or reliquary the ooze consumes leaves it stronger than before." [trait/always/resource] — the model found no template that holds it (offered: aberrant-ground, false-appearance, adhesive, phobia, terrain-walk, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, warded-mending)
[reskin] concept-first trait skipped: aberrant-ground — the GM's words key it, but the call was offered it against those words and declined
[reskin] weapons answered: Slam = none
[reskin] languages held: None stands — INT 2 on a Ooze speaks nothing, whatever the mind read said
[reskin] element immunity: Necrotic (merged into the header write)
[reskin] immunities stamped for type: Ooze -> Acid, Necrotic; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Skarra Hurlstone — bands soft

**Concept:** a stone giant exile who speaks only Giant and understands no Common

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Skarra Hurlstone | 9 (2014) | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-atk: attack +10 against the aim's +7
- read: def 7 / off 10 → 8.5; sustained 60 (2 × Stone Club); nova none; dmg 60

```
Skarra Hurlstone
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
Multiattack: Skarra makes two attacks: one with Stone Club and one with Boulder.
Stone Club: Melee Weapon Attack: +10 to hit, reach 15 ft., one target. Hit: 30 (7d6 + 6) bludgeoning damage.
Boulder: Ranged Weapon Attack: +10 to hit, range 60/240 ft., one target. Hit: 27 (6d6 + 6) bludgeoning damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Stone Club — print's own row, renamed; weapon club
- Actions/Boulder — print's own row, renamed

**Engine trace**

```
[path] twist — Stone Giant (is) — "stone giant" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a stone giant exile") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=elemental mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: hurls quarried stone slabs [object] | bellowing in Giant at everyone it meets [behavior] | exile's grudge against its own kin [behavior]
[concept] identity: The exile wades in with a slab of quarried stone hauled on one shoulder, opens by hurling it flat at the nearest speaker of a language it despises, then closes to trade blows with fists and slab until nothing moves. It never learns Common and never stops bellowing in Giant, fighting silent and methodical in the melee but screaming hoarse threats and pleas at anyone within earshot, mistaking every stranger for the kin that cast it out, and it fights to the death once the first stone leaves its hand.
[concept] lore: A stone giant driven from its clan's high halls for some old, unspoken transgression, it now prowls the lowlands hauling rubble it claims as its own, shouting apologies and curses in Giant at every traveler it meets because it cannot tell who has come to forgive it and who has come to drive it off again.
[reskin] print canon array: STR 23, DEX 15, CON 20, INT 10, WIS 12, CHA 9 — the Stone Giant's; STR 23 outranks the card's +7, so the sheet rolls +10 (raise-only)
[reskin] donor: brute-9 -> CR 9
[reskin] [path] decides: twist on the Stone Giant (the matcher would have said homebrew)
[reskin] print canon: "a stone giant exile who speaks only Giant and understands no Common" heads on the Stone Giant — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "Skarra" — the call's own answer (person), built from the name
[reskin] inline form: "Skarra" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: "understands no Common"
[reskin] lacks refused: "speaks only Giant" names no absence — nothing in it takes anything away
[reskin] clauses: "a stone giant exile" -> has (descriptive), head | "speaks only Giant" -> has (header) | "understands no Common" -> LACKS (mechanical)
[reskin] signature idea (action): "Skarra hauls its slab overhead and bellows a raw Giant word of grief and accusation at everyone around it — a roar that is half apology, half curse. Every creature near enough to hear is shaken and reels from the noise, and those who share its Giant tongue hear their own names in the cry and are hit hardest. Skarra can only pour its lungs out like this so often before its voice fails and must reco" [action/save/condition] — menu: trample, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: leap, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: terror-pulse, rally, escalating-dread, ground-burst — the key word does not mean the mechanic here
[reskin] fit declined: "Giant's Grief-Roar (Recharge 5-6)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: terror-pulse, rally, escalating-dread left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Stone Giant's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Every blow Skarra lands with fist or slab carries the thunder of its bellowing — the stone rings and the flesh it strikes keeps ringing, leaving its victim unable to stop hearing that shout until they gather themselves." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] word match declined by the call: resonant-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown false-appearance, which the GM's words keyed
[reskin] key match declined: trait — "false-appearance" was ranked first on the call's own menu for stone, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Every blow Skarra lands with fist or slab carries the thunder of its bellowing — the stone rings and the flesh it strikes keeps ringing, leaving its victim unable to stop hearing that shout until they gather themselves." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, bloodied-burst, resonant-body)
[reskin] weapons answered: Slab = none; Hurled Slab = none
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Stone Giant's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] rider folded: "Slab" keeps its budget — the chassis's rider half (11) folds into the base; the Stone Giant pays no damage rider of its own
[reskin] print canon attack: "Slab" -> "Stone Club" — the Stone Giant's own row
[reskin] print canon attack: "Hurled Slab" -> "Boulder" — the Stone Giant's own ranged row
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Reedjaw Adept — bands fail

**Concept:** lizardfolk monk

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Reedjaw Adept | 5 (2014) | skirmisher-3 | ok | FAIL: per-attack-ceiling | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 7.5 (print at 5 reads 2.5–9.5, n=25)
- bands · soft · hot-offense: offense alone reads CR 10, 5 over; the HP axis pulls the read to 7.5
- bands · fail · per-attack-ceiling: Shortsword: 34 a hit is the whole budget (36)
- read: def 5 / off 10 → 7.5; sustained 68 (2 × Shortsword); nova none; dmg 68

```
Reedjaw Adept
Medium humanoid, neutral
Armor Class

15 (chain shirt)

Hit Points: 

97 (15d8 + 30)

Speed: 

30 ft., swim 30 ft.

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

passive Perception 13

Languages: 

Common, Thieves' cant, Draconic

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Hold Breath. The reedjaw adept can hold its breath for 15 minutes.
Marsh Stride. Difficult terrain composed of mud doesn't cost the reedjaw adept extra movement, and the reedjaw adept can move across mud without needing to make an ability check.
Evasion. If the reedjaw adept is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the reedjaw adept instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it is incapacitated.
Patient Defense. As a bonus action, the reedjaw adept takes the Dodge action.
Cunning Action. As a bonus action, the reedjaw adept takes the Dash, Disengage, or Hide action.

Actions
Multiattack: The reedjaw adept makes two attacks, using Shortsword or Light Crossbow.
Shortsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (3d8 + 4) piercing damage plus 17 (5d6) poison damage, and the target is poisoned until the start of the assassin's next turn. Once on each of the reedjaw adept's turns when it hits with this attack, the target is subjected to the following effect. The target must succeed on a DC 15 Constitution saving throw or be stunned until the end of the reedjaw adept's next turn.
Light Crossbow: Ranged Weapon Attack: +7 to hit, range 80/320 ft., one target. Hit: 13 (2d8 + 4) piercing damage.
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
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("lizardfolk monk") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=venomous/grasping mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: venomous bite and claw flurry [behavior] | dart-in, dart-out skirmishing in pairs [behavior] | venom-slicked scaled hide [body]
[concept] identity: The lizardfolk monk circles the fight with reed-silent footwork, hunting in pairs so one drives prey onto the other's snapping jaws. Every round it darts in behind cover, lands a flurry of claw-and-tail blows weighted with its venomous bite, then slips back out of reach — though it would rather harry a foe for an hour than trade blows, and fights to the death only when cornered with clutchmates behind it.
[concept] lore: Raised in the wet reed-temples of the marsh clans, these monks walk the old discipline of the patient jaw: they hold a grudge for decades and repay it with a bite delivered from a shadow, never from the front.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the monk stands on the Assassin — the class's own print block, nearest CR 5
[reskin] print canon array: STR 11, DEX 18, CON 14, INT 16, WIS 11, CHA 10 — the Assassin's; DEX 18 outranks the card's +6, so the sheet rolls +7 (raise-only)
[reskin] donor: skirmisher-3 -> CR 5
[reskin] [path] decides: class_npc on the Assassin · class monk (the matcher would have said homebrew)
[reskin] print canon: "lizardfolk monk" heads on the Assassin — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear)
[reskin] row evicted for the cap: Traits/"Reed-Silence" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "monk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] row evicted for the cap: Bonus Actions/"Fleet Agility" (chassis filler) leaves so "Patient Defense" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Claw), Patient Defense (patient-defense)
[reskin] inline by rule: "the reedjaw adept" — the call answered "the jaw adept" (kind), which the name does not support
[reskin] energy rider withheld: Poison on a Humanoid with no Poison in the concept's own words
[reskin] lacks asked: nothing taken away
[reskin] clauses: "lizardfolk monk" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The adept spits a glob of venom-thickened reed paste at a spot within sight, slicking the ground and fouling the air around it. Anyone wading through that patch is slowed and has trouble keeping their feet, and a creature caught there finds the venom in its eyes and throat, so it veers and staggers where the adept wants it to go. The adept uses this to steer prey toward its partner's waiting jaws." [action/always/movement] — menu: trample, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, exploiter (+ shelf: leap, delayed-brand, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] word match declined by the call: snare-bolt, sensory-strike, spew — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The adept spits a glob of venom-thickened reed paste at a spot within sight, slicking the ground and fouling the air around it. Anyone wading through that patch is slowed and has trouble keeping their feet, and a creature caught there finds the venom in its eyes and throat, so it veers and staggers where the adept wants it to go. The adept uses this to steer prey toward its partner's waiting jaws." [action/always/movement] — the model found no template that holds it (offered: trample, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, exploiter, delayed-brand, focus, feint-slip, coating, affliction)
[reskin] fallback respects the call: sensory-strike left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Assassin's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Its scales are permanently slick with venomous marsh oil, so any creature that bites it, grapples it, or strikes it with a natural weapon gets the poison on itself and grows sluggish and sickened for a time. Likewise a creature it has already clawed carries that venom on its hide, making it easier for the adept's partner to find and finish." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] word match declined by the call: aberrant-ground, resonant-body, bloodied-burst, absorption, terrain-walk — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Its scales are permanently slick with venomous marsh oil, so any creature that bites it, grapples it, or strikes it with a natural weapon gets the poison on itself and grows sluggish and sickened for a time. Likewise a creature it has already clawed carries that venom on its hide, making it easier for the adept's partner to find and finish." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, terrain-walk, aberrant-ground)
[reskin] weapons answered: Claw = none; Spit Dart = none
[reskin] weapon declined: "Spit Dart" reads dart from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Spit Dart" — thrown, range 20/60
[reskin] print canon modes: swim, climb off — the Assassin has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft., Swim 40 ft. — the concept's movement set decides
[reskin] languages by mind: "Draconic" -> "Common, Draconic" (sapient)
[reskin] print canon languages: "Common, Draconic" -> "Common, Thieves' cant, Draconic" — the Assassin's plus the concept's Draconic
[reskin] print canon attack: "Claw" -> "Shortsword" — the Assassin's own row
[reskin] print canon attack: "Spit Dart" -> "Light Crossbow" — the Assassin's own ranged row
[reskin] print canon defenses: resistances none -> Poison — the Assassin's own header lines
[reskin] print canon trait: Evasion — "lizardfolk monk" is the Assassin (print's own row)
[reskin] print canon row: Bonus Actions/Cunning Action — the Assassin's own
[reskin] species kit: Swim 30 ft. — the lizardfolk's
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Krennik Skullstandard — bands soft

**Concept:** name: Krennik Skullstandard | riding a worg

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Krennik Skullstandard | 4 (2014) | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 2–6.5, n=13)
- read: def 1 / off 4 → 2.5; sustained 20 (2 × Skirling Axe); nova Ride-Down 22; dmg 28

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

Worg-Bred. Krennik ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Mounted Agility. As a bonus action, Krennik takes the Dash or Disengage action.

Actions
Multiattack: Krennik makes two attacks: one with Skirling Axe and one with Hand Axe. It can replace one attack with a use of Skull-Call.
Skirling Axe: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is knocked prone.
Hand Axe: Ranged Weapon Attack: +5 to hit, range 20/60 ft., one target. Hit: 7 (1d8 + 3) slashing damage.
Ride-Down (Recharge 5-6): Krennik moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Each creature whose space it enters must make a DC 13 Strength saving throw, taking 22 (5d8) slashing damage on a failed save and being knocked prone.
Skull-Call: One creature within 60 feet that can see or hear Krennik must succeed on a DC 13 Wisdom saving throw or be charmed until the start of Krennik's next turn. While charmed this way, it must move toward Krennik by the safest available route on its turn.
```

**Where each row came from**

- Traits/Worg-Bred — the chassis
- Actions/Multiattack — the chassis
- Actions/Skirling Axe — weapon battleaxe
- Actions/Hand Axe — weapon handaxe
- Actions/Ride-Down — the chassis
- Actions/Skull-Call — template lure; library draw (seed unstamped)
- Bonus Actions/Mounted Agility — the chassis

**Engine trace**

```
[path] homebrew — "riding a worg" (call)
[route] skirmisher-mounted type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] name: "Krennik Skullstandard" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: mounted→style ✓ ("riding a worg")
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/terror mind=sapient style=mounted energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Krennik Skullstandard"
[concept] mechanics: none claimed
[concept] signature elements: ride-down charge that carries him past the target [behavior] | skull-topped war standard of bone [object] | mocking, bellowed challenges [behavior]
[concept] identity: Krennik Skullstandard opens the fight with a hoarse, bellowed challenge, then spurs his worg into a ride-down charge that carries him past the target with a skirling axe-cut as he goes. Every round after is a wheeling re-pass — he circles wide, spits insults and orders in the same breath, and picks the angle that puts a body between him and the biggest threat. Under pressure he only fights harder, mocking anyone who bleeds, and he does not break until his mount is dead beneath him.
[concept] lore: Krennik took his standard from the skull-pile of a mercenary company that buried him with it, and now rides the old war roads collecting tribute from anyone too slow to outrun a worg.
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
[reskin] signature idea (action): "Krennik looses a hoarse, ringing challenge that names the foe and promises what the skulls will take from them. Any enemy who hears it is goaded into answering him — they must turn their attention to Krennik or lose their nerve. Krennik's own allies hear the same cry and are steadied by it, goading them toward the fight rather than away." [action/once_per_fight/condition] — menu: condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] word match declined by the call: aggro-curse — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "lure" has no key-table verb, but the call quotes "riding a worg" from the description
[reskin] value check: "Skull-Challenge" EV 5.5 vs floor 5.2 (one attack of 2) — worth the trade
[reskin] signature template: lure -> Actions/"Skull-Challenge" ("a ringing challenge that names the foe and goads enemies into answering him — fo [shape fit, no verb match]")
[reskin] signature idea (trait): "Krennik's standard is a tower of skulls lashed to a spear, and it moves with him — foes who fight within its shadow see only the bone-pile and the worg, not the axe, and find their guard slipping. The closer they press to the standard, the more Krennik's blows land where they meant to strike." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: bound — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Krennik's standard is a tower of skulls lashed to a spear, and it moves with him — foes who fight within its shadow see only the bone-pile and the worg, not the axe, and find their guard slipping. The closer they press to the standard, the more Krennik's blows land where they meant to strike." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] weapons answered: Skirling Axe = battleaxe; Hand Axe = handaxe; Ride-Down = none
[reskin] weapon declared: "Skirling Axe" is a battleaxe — the call's own answer (the name alone read handaxe)
[reskin] weapon table: "Hand Axe" — thrown, range 20/60
[reskin] chassis nova: "Ride-Down (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] multiattack replacement clause: It can replace one attack with a use of Skull-Challenge.
[reskin] audit rename: "Skull-Challenge" -> "Skull-Call"
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

Athletics +8, Perception +3

Saving Throws: 

STR +8, CON +8

Condition Immunities: 

blinded, charmed, deafened, frightened, stunned, unconscious

Senses: 

darkvision 60 ft., passive Perception 13

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
Bite: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Bite — the chassis
- Traits/Hold Breath — print's own row
- Traits/Multiple Heads — print's own row
- Traits/Reactive Heads — print's own row

**Engine trace**

```
[path] twist — Hydra (is) — "Name field: Hydra" (code)
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("whose stumps smoke instead of regrowing") | brute-regenerator: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "fire" answers a question nobody asked
[concept] name: "Hydra" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=venomous/bestial mind=bestial style=regenerator energy=Poison mix=both identity=✓ lore=✓
[concept] name: provided "Hydra"
[concept] mechanics: regeneration
[concept] signature elements: stumps that smoke instead of regrowing heads [body] | acrid poison-smokescreen from fresh wounds [aura] | many heads striking from every angle [behavior]
[concept] identity: The Hydra lunges in with a full split-screen volley of biting heads, always attacking from at least three angles to pin its prey between them. Every round it eats a wound, its stump vents acrid smoke that scalds the eyes and throat of whatever struck it, turning its own injuries into a concealing, punishing screen. When bloodied it does not flee — it fights harder and meaner, counting on the fact that its wounds close faster than they can be inflicted and that every cut it takes makes the air around it worse.
[concept] lore: Spawned in the smoking sinkholes where a dead volcanic vent once boiled with poisonous reek, this hydra's necks have forgotten how to regrow flesh — instead the cauterized stumps gush a hot, blinding ash that marks the beast as a walking warning to anything daring enough to wound it.
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
[reskin] clauses: "Hydra — whose stumps smoke instead of regrowing" -> LACKS (mechanical) [asked: resist]
[reskin] signature idea (action): "The hydra lashes out with every neck at once, biting from several directions so its prey is boxed in. Any foe it struck this turn finds the smoke-thick air hard to leave and hard to fight through until it can break away from the beast's reach." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, zone, zone-seed, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — zone, zone-seed (smoke)
[reskin] word match declined by the call: zone, zone-seed, own-turn-punisher, contagion, stunning-strike, charge-push, hook-rider, pounce, charge — the key word does not mean the mechanic here
[reskin] signature miss: action — "The hydra lashes out with every neck at once, biting from several directions so its prey is boxed in. Any foe it struck this turn finds the smoke-thick air hard to leave and hard to fight through until it can break away from the beast's reach." [rider/on_hit/condition] — the model picked "affliction" (no verb, and it quotes nothing the GM typed) over a concept-verb template (zone, zone-seed)
[reskin] fallback respects the call: zone, zone-seed, own-turn-punisher left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Hydra's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever the hydra is wounded, the cauterized stump vents scalding ash that clings to the attacker, blinding and choking them for a short while." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — warded-mending (regrows)
[reskin] word match declined by the call: warded-mending, heated-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown warded-mending, which the GM's words keyed
[reskin] key match declined: trait — "warded-mending" was ranked first on the call's own menu for regrows, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Whenever the hydra is wounded, the cauterized stump vents scalding ash that clings to the attacker, blinding and choking them for a short while." [trait/on_being_hit/condition] — the model found no template that holds it (offered: warded-mending, heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, terrain-walk, bloodied-fury)
[reskin] weapons answered: Bite = none
[reskin] speed by concept: added Swim 40 ft. — the concept's movement set decides
[reskin] print canon multiattack: "The hydra makes as many Bite attacks as it has heads." — the Hydra's own
[reskin] languages held: None stands — INT 2 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon defenses: immunities none -> Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious — the Hydra's own header lines
[reskin] print canon trait: Hold Breath — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Multiple Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Reactive Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] lacks clause: Traits/"Multiple Heads" keeps its blow, loses the regeneration — "Hydra — whose stumps smoke instead of regrowing"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Swarm of Drowned Nave Choirs — in the run

**Concept:** a drowned cathedral choir that sings in one voice

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Drowned Nave Choirs | 10 (2014) | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 12 / off 9 → 10.5; sustained 61 (1 × Hands); nova none; dmg 61

```
Swarm of Drowned Nave Choirs
Medium swarm of Tiny undead, neutral
Armor Class

14 (natural armor)

Hit Points: 

180 (24d8 + 72)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


8 (-1)

	

16 (+3)

	

17 (+3)

	

4 (-3)

	

10 (+0)

	

2 (-4)

Damage Resistances: 

bludgeoning, cold, piercing, slashing

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, frightened, grappled, paralyzed, petrified, poisoned, prone, restrained, stunned

Senses: 

blindsight 30 ft., passive Perception 10

Languages: 

Common plus the languages it knew in life

Challenge

10 (5,900 XP)

Proficiency Bonus:

+4

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain hit points or gain temporary hit points.

Actions
Hands: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 61 (13d8 + 3) cold damage, or 30 (6d8 + 3) cold damage if the swarm has half of its hit points or fewer.
```

**Where each row came from**

- Traits/Swarm — the chassis
- Actions/Hands — the chassis

**Engine trace**

```
[path] homebrew — "a drowned cathedral choir that sings in one voice" (call)
[route] swarm type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a drowned cathedral choir that sings in " | holds: the call reads none in these words | swarm: ✓ ("a drowned cathedral choir that sings in ") | lurker-phantom: the call read "drowned" as not meaning that mechanic here — no override | swarm stands: every key that would override it was read as a figure of speech | swarm: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "radiant" answers a question nobody asked
[concept] name: provided_name rejected — "a drowned cathedral choir that sings in …" is the description, not a name
[concept] resolve: archetype=swarm type=Undead themes=grave/voice mind=sapient style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: singing in one unified voice [behavior] | the drowned congregation fused into a tide of robed bodies [body] | a cold, drowning hymn that hangs in the flooded nave [aura]
[concept] identity: The choir opens by drawing breath as one drowned throat, releasing a slow chord that rolls across the flooded nave and leaves those who hear it cold and unsteady before any body touches them. Each round it presses forward as a tide of sodden robes and bloated mouths, surging around isolated targets to smother them in a hundred cold hands and joined voices. Once bloodied it sings faster and more wildly, splitting into answering currents of sound that hunt the loudest living thing until nothing is left to harmonize with.
[concept] lore: Born from a cathedral congregation drowned mid-hymn when the flood took the nave, the choir still sings the last verse it never finished, and it pulls the living down to add their voices to the chord.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] donor: swarm-9 -> CR 10 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] swarm name stamped: "Drowned Nave Choir" -> "Swarm of Drowned Nave Choirs" — print names all seven of its swarms "Swarm of X", and the rules text says "the swarm"
[reskin] swarm type stamped: Undead -> Swarm of Tiny Undead
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the swarm" — the call answered "the nave choir" (kind), which the name does not support
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a drowned cathedral choir" -> has (descriptive), head | "sings in one voice" -> has (descriptive)
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, zone-seed, blighted-ground, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The choir draws one slow breath as a single drowned throat and lets out a rolling chord that washes over everything near it. Anyone caught in that wash is left cold and unsteady, their balance and resolve shaken, and the sound lingers a moment so that they must fight to steady themselves again before the next verse. The chord can only be raised so often; between breaths the choir must press forwar" [action/save/condition] — menu: trample, leap, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: rampage, patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] nova declined: "Drowned Chord (Recharge 5-6)" — a whole-round ability the GM never asked for: the call offered no quote, and the key table finds no verb either; the fallback stands in (the cauldron's spill, 2026-09-29)
[reskin] signature idea (trait): "The congregation is fused into one tide of sodden robes and bloated mouths: whenever the swarm is wounded, the spilled voices rise as an answering current of sound that drags at the nearest living listeners and pulls them a step closer to the chord." [trait/on_being_hit/movement] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — noxious-aura, mimicry (voices)
[reskin] word match declined by the call: heated-body, absorption, bloodied-fury, bloodied-burst, mimicry, noxious-aura — the key word does not mean the mechanic here
[reskin] signature miss: trait — "The congregation is fused into one tide of sodden robes and bloated mouths: whenever the swarm is wounded, the spilled voices rise as an answering current of sound that drags at the nearest living listeners and pulls them a step closer to the chord." [trait/on_being_hit/movement] — the model picked "resonant-body" (no verb, and it quotes nothing the GM typed) over a concept-verb template (noxious-aura, mimicry)
[reskin] weapons answered: Hands = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Swarm of Tiny Undead + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Cold, Piercing, Slashing
[reskin] bloodied half re-derived: "Hands" — 14 (4d6) -> 30 (6d8 + 3), half of the main 61 on the main's own +3 (print's ratio and print's modifier)
audit finding below confidence gate: Swarm Occupying another creature's space is a swarm mechanic on a creature typed as a Swarm of Tiny Undead, but the block gives no rules for what transpires when it shares a space (no automatic damage, no engulf) — consistent with the Swarm pattern, but combined with no other trait the shared-space clause has no adjudicable consequence.
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

Perception +7, Stealth +14

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

Legendary Resistance. If the vampire fails a saving throw, it can choose to succeed instead.
Misty Escape. If the vampire drops to 0 hit points outside its resting place, the vampire uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 hit points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and is paralyzed until it regains any hit points, and it regains 1 hit point after spending 1 hour there.
Spider Climb. The vampire can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Vampire Weakness. The vampire has these weaknesses: Forbiddance: the vampire can't enter a residence without an invitation from an occupant.
Running Water: the vampire takes 20 acid damage if it ends its turn in running water.
Stake to the Heart: If a weapon that deals piercing damage is driven into the vampire's heart while the vampire is incapacitated in its resting place, the vampire is paralyzed until the weapon is removed.
Sunlight: the vampire takes 20 radiant damage if it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks.
Shape-Shift (Bonus Action). If the vampire isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the vampire can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the vampire can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has resistance to all damage, except the damage it takes from sunlight.
Charm (Recharge 5-6) (Bonus Action). The vampire casts charm person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The charmed target is a willing recipient of the vampire's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was charmed by the vampire.

Actions
Multiattack: The vampire makes two Grave Strike attacks and uses Bite.
Grave Strike: Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) by one of two hands.
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that is grappled, incapacitated, or restrained must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) piercing damage plus 13 (3d8) necrotic damage on a failed save. The target's hit point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a vampire spawn under the vampire's control.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Grave Strike — print's own row, renamed
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
[route] lurker type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: the call reads no worked magic in these words | lurker-trap: ✓ ("keeps a garden of thorns") | lurker-trap: no line key in the words — the model's read of its quote | lurker-trap -> lurker: a trap is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] name: "Vampire" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=lurker type=Undead themes=grave/grasping mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Vampire"
[concept] mechanics: none claimed
[concept] signature elements: hiding in a cultivated wall of thorns [behavior] | thorn-tendrils that snare and root prey [body] | the garden of briars it tends [object]
[concept] identity: A gaunt, thorn-shrouded vampire lurks motionless among its cultivated wall of briars, indistinguishable from the hedge until a tendril snaps out to impale and drag a victim into the thicket. Each round it hides again in its garden, striking from a new angle and seeding the wound with thorny growths that root the prey in place. It is a patient, proprietorial hunter that treats intruders as compost for its garden and fights to the death rather than abandon the thorns it has grown.
[concept] lore: Once a noble who buried its own heart beneath a briar patch to escape the sun, this vampire now feeds the garden that hides it and will not leave its soil for anything.
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
[reskin] signature idea (action): "The vampire flings a fistful of thorn seeds into a wounded creature it can see, and the seeds burrow and sprout inside the flesh. Until the victim tears them out—costing it its own action and hurting it—every step it takes wracks it with stabbing growth, and the vampire always knows exactly where it is." [rider/on_hit/condition] — menu: contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — drain (vampire)
[reskin] fit declined: "Thorn Seed Blight" — a print body takes only what the user's words ask; the call quotes "garden of thorns", which is no unanswered twist clause — a head, a header, a lack, or a clause the GM's own weapon already answers (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Vampire's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Thorn-vines knit themselves shut around the vampire whenever it stands within its briar garden, drinking the soil's rot to mend its wounds at the start of each of its turns there. Step outside the thorns, and the garden withholds its favor." [trait/start_of_turn/resource] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (thorns)
[reskin] word match declined by the call: heated-body, absorption, noxious-aura — the key word does not mean the mechanic here
[reskin] trait declined: "Briar Mending" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either
[reskin] weapons answered: Thorn = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Vampire's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Thorn" -> "Grave Strike" — the Vampire's own row
[reskin] print canon multiattack: "The vampire makes two Grave Strike attacks and uses Bite." — the Vampire's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause withheld: the Multiattack already uses it — "The vampire makes two Grave Strike attacks and uses Bite." (the Vampire's print line names Bite; a second clause named it again, twist-ten 2026-10-19)
audit finding below confidence gate: Bite (Bat or Vampire Form Only) The Grappled condition from Grave Strike is imposed 'from one of two hands' and gives escape DC 14, but Bite's Grappled recipient has no stated path to counter the bite beyond pre-existing conditions; this is fine as reach is 5 ft and grapple escape exists — no defect on counterplay; HOWEVER the effect 'A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Vampire Spawn under the vampire's control' has no duration or end condition for the created spawn's servitude.
audit finding names unknown entry, dropped: Running Water
audit finding names unknown entry, dropped: Stake to the Heart
audit finding below confidence gate: Misty Escape The Paralyzed condition it holds in its resting place has no stated end beyond 'until it regains any Hit Points' — this is fine — but the block never states whether the 1 hour is continuous, whether it can be interrupted, or what happens if interrupted, leaving the GM tracking an undefined 1-hour clock.
[reskin] escape dc: Grave Strike → DC 17 (8 + PB + STR; a late row wore another number)
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Ossuar Sun-Throne — in the run

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ossuar Sun-Throne | 20 (2014) | caster-21 | ok | ok | ok | SOFT: rider-no-save, control-aoe-ungated | ok | ok | ok | ok | FAIL: name-mechanic | ok |

- gates · soft · rider-no-save: Actions/Solar Reave: a Poisoned rider on every hit with no save
- gates · soft · control-aoe-ungated: Actions/Solar Compulsion: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- reader · fail · name-mechanic: Legendary Actions/Blinding Volley: the name promises the Blinded condition the text lacks
- read: def 17 / off 21 → 19; sustained 156 (3 × Solar Lance + legendary Blinding Volley); nova Corona 76; dmg 156

```
Ossuar Sun-Throne
Huge undead, neutral evil
Armor Class

19 (natural armor)

Hit Points: 

300 (24d12 + 144)

Speed: 

30 ft., fly 30 ft. (hover)

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

16 (+3)

	

22 (+6)

	

18 (+4)

	

17 (+3)

	

16 (+3)

Skills: 

Arcana +10, Perception +9

Saving Throws: 

CON +12, INT +10, WIS +9

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 120 ft., passive Perception 19

Languages: 

Common plus the languages it knew in life

Challenge

20 (25,000 XP)

Proficiency Bonus:

+6

Sun-Bitten Trail. The sun-throne knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.
Legendary Resistance (3/Day). If the sun-throne fails a saving throw, it can choose to succeed instead.
Protective Magic (3/Day) (Reaction). When the sun-throne is hit by an attack, the sun-throne casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: The sun-throne makes three attacks, using Solar Lance or Solar Reave. It can replace one attack with a use of (A) Solar Compulsion or (B) Spellcasting to cast Guiding Bolt.
Solar Lance: Melee or Ranged Weapon Attack: +10 to hit, reach 10 ft. or range 120 ft., one target. Hit: 26 (5d8 + 4) radiant damage.
Solar Reave: Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 26 (5d8 + 4) radiant damage, and the target is poisoned until the start of the sun-throne's next turn.
Corona (Recharge 5-6): Each creature within 20 feet of the sun-throne must make a DC 18 Constitution saving throw, taking 76 (17d8) radiant damage on a failed save, or half as much damage on a successful one.
Spellcasting: The sun-throne casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 18, +10 to hit with spell attacks): -

At will: guiding bolt, light, blindness/deafness

1/day each: hypnotic pattern
Solar Compulsion: Each creature of the sun-throne's choice within 90 feet that can see or hear the sun-throne must succeed on a DC 18 Wisdom saving throw or be charmed by the sun-throne until the start of the sun-throne's next turn. While charmed this way, the target must move toward the sun-throne by the safest available route on its turn and can't take reactions.
Legendary Actions

The sun-throne can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The sun-throne regains spent legendary actions at the start of its turn.

Blinding Volley: The sun-throne makes one Solar Lance attack.
Drift Throne: The sun-throne teleports up to 30 feet to an unoccupied space it can see. The sun-throne can't take this action again until the start of its next turn.
Contemptuous Gaze: One creature within 30 feet of the sun-throne must succeed on a DC 18 Wisdom saving throw or be frightened of the sun-throne until the end of its next turn.
```

**Where each row came from**

- Traits/Sun-Bitten Trail — template faultless-tracker; library draw (seed unstamped)
- Traits/Legendary Resistance — the chassis
- Actions/Multiattack — the chassis
- Actions/Solar Lance — the chassis
- Actions/Solar Reave — the chassis
- Actions/Corona — the chassis
- Actions/Spellcasting — the chassis
- Actions/Solar Compulsion — library seed lure
- Reactions/Protective Magic — the chassis
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Blinding Volley — the chassis
- Legendary Actions/Drift Throne — the chassis
- Legendary Actions/Contemptuous Gaze — the chassis

**Engine trace**

```
[path] homebrew — "an archlich enthroned on a sun of bone" (call)
[route] caster (artillery) type=Undead mechanics=aura — casts: on the GM's own words "archlich" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("archlich") | caster: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "archlich enthroned on a sun of bone…" is the description, not a name
[concept] resolve: archetype=caster type=Undead themes=grave/arcane mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: a throne that is a sun of bone [object] | blighting bolts of bone-light cast from the throne [behavior] | a radiating corona that sears all who draw near [aura]
[concept] identity: The archlich does not walk to war — it rises with its throne, the bone-sun kindling around it into a corona of searing light while it hurls bolts of blighting radiance down at anything that dares approach. Round after round it drifts its throne out of reach, scouring the field with lances of light and the hungry pull of its orbiting bone sparks, and only when cornered does it spend its own marrow in a blinding detonation. It is ancient, patient, and utterly contemptuous: it treats the fight as an audience, letting foes come close just to prove they cannot.
[concept] lore: Once a mortal sorcerer-king who bound his court to his corpse so death could never depose him, the archlich tore the bones of his own slain nation into a sun and enthroned himself at its heart, where he still hoards the ritual that will let his light swallow a living kingdom.
[reskin] donor: caster-21 -> CR 20
[reskin] [path] decides: homebrew (the matcher would have said twist Lich)
[reskin] repair round 1: 2 defect(s) — name "Blinding Volley" promises the Blinded condition but the row never delivers it — name what the rule does, or drop the claim word | "Bone Talon" is an anatomical name dealing Slashing on a mind-driven attacker (the attack bonus keys to INT) — print pays physical damage on mental strikes with implement names (the Dryad's Vine Lash, the Rakshasa's Cursed Touch) or carries a magical type (the Mage's Arcane Burst deals Force); rename to a conjured implement or pick a magical type
[reskin] mental-anatomy stamp: "Bone Talon" Slashing -> Radiant (repair exhausted; the engine picks the magical type)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the sun-throne" — the call's own answer (kind), built from the name
[reskin] inline form: "the sun-throne" — the model's own reading of the name
[reskin] spell DC coherence: DC 19 -> 18 off Intelligence 18 (the stat makes the attack rolls)
[reskin] save dc derived: DC 19 -> 18 (8 + PB 6 + Intelligence's 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an archlich enthroned on a sun of bone" -> has (descriptive), head
[reskin] menu pruned: action — thrown-burst-seed, phase-slip, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The sun-throne hurls a splinter of its own bone-light that buries itself in a foe and keeps burning from inside, a seed of the stolen sun lodged in living flesh. While that ember smolders in the target, every mote of the throne's radiance finds it more easily — its lances and its corona bleed hotter into the marked creature, which glows so bright that hiding from the throne's sight becomes pointle" [rider/on_hit/damage] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: gaze-single, snare, condition-payoff, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, delayed-brand, curse-debt, zone-seed, reveal, lay-on-hands, aggro-curse, self-invisibility, rally)
[reskin] word match declined by the call: bolt-mark, reveal — the key word does not mean the mechanic here
[reskin] value check: "Bone-Light Ember" EV 6.6 vs floor 13 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Bone-Light Ember" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: reveal left the shelf — the call declined it for this sheet
[reskin] value check: "Luring Presence (Recharge 5-6)" EV 27.5 vs floor 13 (one attack of 3) — over the ceiling — gated Recharge 5-6
[reskin] library seed drawn: lure -> Actions/"Luring Presence (Recharge 5-6)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The bone-sun's light does not stay where it lands: any radiance the throne sheds leaves a film of hungry afterglow clinging to the wounded, and that residue pulls the throne's orbiting bone sparks toward them. Foes still gleaming from its bolts find the throne's later light curving home even past cover, as though the sun remembers where it has already tasted blood." [trait/always/damage] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] word match declined by the call: uncanny-sense — the key word does not mean the mechanic here
[reskin] signature template (trait): faultless-tracker -> Traits/"Sun-Bitten Trail" ("The residue marks whoever it burns, and the throne's light curves home to them:  [shape fit, no verb match]")
[reskin] weapons answered: Solar Lance = none; Bone Talon = none
[reskin] weapon declined: "Solar Lance" reads lance from its name, but the call answered none — the row carries no weapon
[reskin] chassis nova: "Corona (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] dead control row: "Luring Presence" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of (A) Luring Presence or (B) Spellcasting to cast *Guiding Bolt*.
[reskin] audit rename: "Bone Talon" -> "Solar Reave"
[reskin] audit rename: "Luring Presence" -> "Solar Compulsion"
[reskin] weapon reach: "Solar Lance" reaches 10 ft. — print's lance has Reach
[reskin] size floor: STR 11 -> 18 — print prints no corporeal Huge body under 18 (the Archelon); the attack follows it, as print's own 49 do
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Ancient Gold Dragon — in the run

**Concept:** name: Ancient Gold Dragon | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ancient Gold Dragon | 24 (2014) | dragon-22 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 26 / off 25 → 25.5; sustained 168 (3 × Rend + legendary Pounce); nova Fire Breath 71; dmg 168

```
Ancient Gold Dragon
Gargantuan dragon, lawful good
Armor Class

22 (natural armor)

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

Perception +10, Stealth +9

Saving Throws: 

DEX +9, WIS +10

Damage Immunities: 

fire

Senses: 

blindsight 60 ft., darkvision 120 ft., passive Perception 20

Languages: 

Common, Draconic

Challenge

24 (62,000 XP)

Proficiency Bonus:

+7

Legendary Resistance (4/Day). If the gold dragon fails a saving throw, it can choose to succeed instead.
Amphibious. The gold dragon can breathe air and water.

Actions
Multiattack: The gold dragon makes three Rend attacks. It can replace one attack with a use of (A) Spellcasting to cast Guiding Bolt (level 4 version) or (B) Weakening Breath.
Rend: Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 19 (2d8 + 10) slashing damage plus 9 (2d8) fire damage.
Spellcasting: The gold dragon casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 24, +16 to hit with spell attacks): -

At will: detect magic, guiding bolt, shapechange

1/day each: flame strike, word of recall, zone of truth
Fire Breath (Recharge 5-6): Each creature in a 90-foot cone must make a DC 24 Dexterity saving throw, taking 71 (13d10) fire damage on a failed save, or half as much damage on a successful one.
Weakening Breath: Each creature that isn't currently affected by this breath in a 90-foot cone must make a DC 24 Strength saving throw. On a failed save, the target has disadvantage on Strength-based D20 tests and subtracts 5 (1d10) from its damage rolls. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.
Legendary Actions

The gold dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The gold dragon regains spent legendary actions at the start of its turn.

Banish: One creature the gold dragon can see within 120 feet of it must make a DC 24 Charisma saving throw. On a failed save, the target takes 24 (7d6) force damage, and the target is incapacitated and is transported to a harmless demiplane until the start of the gold dragon's next turn, at which point it reappears in an unoccupied space of the gold dragon's choice within 120 feet of the gold dragon. On a failed or successful save, the gold dragon can't take this action again until the start of its next turn.
Guiding Light: The gold dragon uses Spellcasting to cast guiding bolt (cast at 4th level).
Pounce: The gold dragon moves up to half its speed, and it makes one Rend attack.
```

**Where each row came from**

- Traits/Legendary Resistance — the chassis
- Traits/Amphibious — print's own row
- Actions/Multiattack — the chassis
- Actions/Rend — print's own row, renamed
- Actions/Spellcasting — print's own row
- Actions/Fire Breath — print's own row
- Actions/Weakening Breath — print's own row
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Banish — print's own row
- Legendary Actions/Guiding Light — print's own row
- Legendary Actions/Pounce — print's own row

**Engine trace**

```
[path] exact — Ancient Gold Dragon (is) — "Ancient Gold Dragon" (code)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | dragon: ✓ ("Ancient Gold Dragon") | dragon: key "dragon" (class body)
[concept] hints: dragon→body ✓ ("Ancient Gold Dragon")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/terror mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Ancient Gold Dragon"
[concept] mechanics: breath
[concept] signature elements: searing golden fire breath [body] | great wyrm hoarding treasure as bait and judgment [behavior] | frightful presence and imperious judgment [aura]
[concept] identity: An ancient gold dragon does not open with stealth — it descends into the middle of a battlefield, wings wide and scales molten-bright, and lets its frightful presence do the first round of work while it chooses which foe deserves its fire. Thereafter it fights like a myth made flesh: a full claw-claw-bite-and-tail sequence wrapped around a breath of searing golden fire, repositioning on the wing between passes so ground-bound foes can never pin it. It is patient and imperious, not rabid — it will toy with a weaker enemy to gauge its character, but once wounded or insulted it commits to annihilation and will not flee unless flight is the only way to survive the war, not just the fight.
[concept] lore: Ancient gold dragons hoard treasure not for greed but as bait and judgment, hoarding wealth in hidden mountain roosts where they wait out centuries to see which supplicants, thieves, or would-be heroes are worth their time — and which are worth burning.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] print canon defenses: HP 487 -> 546, AC 20 -> 22 — the Ancient Gold Dragon's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 14, CON 29, INT 18, WIS 17, CHA 28 — the Ancient Gold Dragon's at its own CR; attack +11 -> +17, DC 24 (print's)
[reskin] donor: dragon-22 -> CR 24
[reskin] [path] decides: exact on the Ancient Gold Dragon (the matcher agrees)
[reskin] print canon: "Ancient Gold Dragon" is a print creature — the seats stand down; print's own rows are the composition
[reskin] name_element answered: Golden Breath = literal
[reskin] repair round 1: 1 defect(s) — name "Tail Lash" promises a tail but the row makes a Bite attack — name the delegation honestly, or without anatomy
[reskin] class kit: none — the exact path takes no class kit
[reskin] inline by rule: "the gold dragon" — the call answered "the gold dragon" (kind), which the name does not support
[reskin] inline form: "the gold dragon" — the model's own reading of the name
[reskin] spell DC coherence: DC 21 -> 24 off Charisma 28 (print's array stays)
[reskin] save dc derived: DC 21 -> 24 (8 + PB 7 + Charisma's 9) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Ancient Gold Dragon" -> has (descriptive), head
[reskin] weapons answered: Bite = none
[reskin] chassis nova: "Golden Breath (Recharge 5-6)" — the dragon-22's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes fly, swim — the Ancient Gold Dragon's
[reskin] print canon senses: "blindsight 60 ft., darkvision 120 ft." — the Ancient Gold Dragon's
[reskin] speed by concept: added Swim 40 ft. — the concept's movement set decides
[reskin] print canon attack: "Bite" -> "Rend" — the Ancient Gold Dragon's own row
[reskin] print canon multiattack: "The gold dragon makes three Rend attacks. It can replace one attack with a use of (A) Spellcasting to cast *Guiding Bolt* (level 4 version) or (B) Weakening Breath." — the Ancient Gold Dragon's own
[reskin] element immunity: Fire (merged into the header write)
[reskin] dragon spell DC derived: 24 (8 + PB + Cha mod — the breath keeps the card DC)
[reskin] dragon mental save DC derived: "Dread Roar" -> 24 (the Frightful Presence class keys to Charisma)
[reskin] immunities stamped for type: Dragon -> Fire
[reskin] print canon trait: Amphibious — "Ancient Gold Dragon" is the Ancient Gold Dragon (print's own row)
[reskin] print canon legendary: Banish, Guiding Light, Pounce — the Ancient Gold Dragon's own kit stands where the chassis's stood
[reskin] print canon nova: "Golden Breath (Recharge 5-6)" leaves — at print's CR the Ancient Gold Dragon's own Fire Breath (Recharge 5-6) is the one breath, dice and all
[reskin] print canon row: Actions/Fire Breath (Recharge 5-6) — the Ancient Gold Dragon's own
[reskin] print canon row: Actions/Weakening Breath — the Ancient Gold Dragon's own
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] 2014 conversion: one lint-gated call — both printings saved
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

Perception +1, Stealth +4

Saving Throws: 

DEX +4

Senses: 

darkvision 60 ft., passive Perception 11

Languages: 

Common, Goblin

Challenge

1 (200 XP)

Proficiency Bonus:

+2

Nimble Escape. As a bonus action, the goblin takes the Disengage or Hide action.

Actions
Multiattack: The goblin makes two attacks, using Scimitar or Shortbow.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage plus 2 (1d4) slashing damage if the attack had advantage.
Shortbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Scimitar — weapon scimitar
- Actions/Shortbow — print's own row, renamed; weapon shortbow
- Bonus Actions/Nimble Escape — print's own row

**Engine trace**

```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs?t=1792202639880:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:1436:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:1275:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:657:5)
!! [ENRICHMENT] Failed to enrich Owlbear: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs?t=1792202639880:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:1436:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:1275:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:657:5)
[path] exact — Goblin Boss (is) — "Goblin Boss" (code)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("Goblin Boss") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/terror mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: strike from cover and vanish [behavior] | hurled weighted blade or javelin [object] | screeched orders to its rabble as it retreats [behavior]
[concept] identity: The goblin boss opens the fight from cover, hurling a weighted blade or javelin before ducking back out of sight; every round after, it darts from shadow to shadow, striking where the party is unguarded and melting away before steel can answer. It is a cunning, cowardly tyrant that will not die for a gang of grunts — when bloodied it screeches for its underlings to cover its retreat and scrambles for the dark.
[concept] lore: A goblin chieftain rules its rabble by being the meanest, quickest, and most paranoid creature in the warren, and it survives every ambush by being the last one in the open.
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
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Goblin Boss" -> has (descriptive), head
[reskin] weapons answered: Scimitar = scimitar; Javelin = javelin
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] print canon speed: modes walk only — the Goblin Boss's
[reskin] print canon senses: "darkvision 60 ft." — the Goblin Boss's
[reskin] print canon type: Humanoid stays — the Goblin Boss is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon alignment: Neutral Evil -> Chaotic Neutral — the Goblin Boss's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "The goblin makes two attacks, using Scimitar or Shortbow in any combination." — the Goblin Boss's own
[reskin] print canon attack: "Shortbow" is print's own row — +4, 5 (1d6 + 2), range 80/320 ft. (an exact body at print's CR)
[reskin] print canon attack: "Javelin" -> "Shortbow" — the Goblin Boss's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Skitter" is the seat's, not the Goblin Boss's
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Boss's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Goblin Boss's Nimble Escape
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Black Iron Sentinel — in the run

**Concept:** a sentinel of black iron, AC 20, Huge, speed 20 feet

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Black Iron Sentinel | 11 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 9 / off 9 → 9; sustained 62 (2 × War-Pick); nova none; dmg 62

```
Black Iron Sentinel
Huge construct, neutral
Armor Class

20 (natural armor)

Hit Points: 

171 (18d12 + 54)

Speed: 

20 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

12 (+1)

	

17 (+3)

	

11 (+0)

	

13 (+1)

	

14 (+2)

Skills: 

Athletics +8, Perception +5

Saving Throws: 

STR +8, CON +7

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

understands the languages of its creator but can't speak

Challenge

11 (7,200 XP)

Proficiency Bonus:

+4

Iron Retaliation. While it has half of its hit points or fewer, the iron sentinel has advantage on attack rolls.
Answering Sting. As a bonus action, the iron sentinel deals 13 (3d8) bludgeoning damage to one creature within 5 feet of it that hit the iron sentinel with an attack roll since the end of the iron sentinel's last turn.

Actions
Multiattack: The iron sentinel makes two War-Pick attacks.
War-Pick: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 31 (6d8 + 4) piercing damage.
Shield Bash: One creature within 5 feet of the iron sentinel that it can see must succeed on a DC 16 Strength saving throw or take 17 (5d6) bludgeoning damage, and if the target is Medium or smaller, it is knocked prone.
```

**Where each row came from**

- Traits/Iron Retaliation — template bloodied-fury; library draw (seed unstamped); binds the GM's words: wounded
- Actions/Multiattack — the chassis
- Actions/War-Pick — the chassis
- Actions/Shield Bash — template shield-bash
- Bonus Actions/Answering Sting — library seed own-turn-punisher

**Engine trace**

```
[path] homebrew — "a sentinel of black iron" (call)
[route] defender type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-warden: ✓ ("a sentinel of black iron") | defender-warden -> defender: the concept's VERB outranks the noun (key "sentinel", class verb) | defender: key "sentinel" (class verb)
[concept] hints: warden→style ✓ ("sentinel of black iron")
[concept] resolve: archetype=defender type=Construct themes=forged/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a tower shield held as a moving wall [object] | punishing anyone who tries to move past it [behavior] | black iron plating and riveted armor, scarred and heavy [body]
[concept] identity: The Black Iron Sentinel plants itself across the ground it is bound to and lets foes come to it, sweeping the reach of its tower shield and war-pick to punish any who try to slide past its guard. Every round it advances one stubborn step, refusing to be flanked, and its heavy blows are aimed not at killing quickly but at breaking the line — knocking shields aside, shoving bodies back, and grinding down whatever stands in front of it. It does not tire, does not taunt, and does not retreat: battered below half its iron it simply locks down harder, an armored wall that must be dismantled bolt by bolt.
[concept] lore: Forged in some forgotten armory as an eternal gate-ward, the Black Iron Sentinel still holds a post whose wall and war have long since crumbled away, and it will kill anything that crosses the invisible line it was made to keep.
[reskin] donor: defender-5 -> CR 11
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: "Hybrid Attack" keeps its melee half only
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] shield is not a weapon: "Tower Shield" takes print's Shield Bash shape beside War-Pick — it was "*Melee Attack Roll:* +8, reach 5 ft. 31 (6d8 + 4) {damage_ty…"
[reskin] inline declared: "the iron sentinel" — the call's own answer (kind), built from the name
[reskin] inline form: "the iron sentinel" — the model's own reading of the name
[reskin] save dc derived: DC 17 -> 16 (8 + PB 4 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a sentinel of black iron" -> has (descriptive), head | "AC 20" -> has (header) | "Huge" -> has (header) | "speed 20 feet" -> has (header)
[reskin] extraction: 1 of 4 model clauses quote nothing the user typed and leave the record ("AC 20")
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "The sentinel sweeps its shield in a wide grinding arc through every foe pressing close, and the blow does not end there — it drags each of them along the ground and shoves them back out of its shadow. Anyone caught is left off balance and out of reach, so the line re-forms behind the wall rather than pouring past it." [action/always/movement] — menu: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: hook-rider, obstacle-pull — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The sentinel sweeps its shield in a wide grinding arc through every foe pressing close, and the blow does not end there — it drags each of them along the ground and shoves them back out of its shadow. Anyone caught is left off balance and out of reach, so the line re-forms behind the wall rather than pouring past it." [action/always/movement] — the model found no template that holds it (offered: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, hook-rider, own-turn-punisher, rally)
[reskin] value check: "Answering Sting" EV 7.2 vs floor 5.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's AC 17 at CR 11, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Black iron scarred and riveted remembers its wounds. Each time the sentinel is struck, its plating settles tighter and it turns harder and meaner toward whoever hit it, so a foe who hammers at it finds the wall answering blows with blows until the attacker retreats or breaks." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — heated-body, resonant-body (iron)
[reskin] word match declined by the call: heated-body, resonant-body, bloodied-burst, absorption, weapon-lodge — the key word does not mean the mechanic here
[reskin] signature template (trait): bloodied-fury -> Traits/"Iron Retaliation" ("Each time the sentinel is struck it turns harder and meaner toward whoever hit i [verb: wounded:idea]")
[reskin] weapons answered: War-Pick = war pick; Tower Shield = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] multiattack normalised: "The iron sentinel makes two War-Pick attacks."
audit finding below confidence gate: Answering Sting The trigger references 'since the end of the iron sentinel's last turn,' requiring the GM to track every creature that hit it across the full round — a state the block gives no way to track, and 'Sting' does not match a War-Pick-wielding construct's bludgeoning retaliation.
[reskin] audit rename: "Tower Shield" -> "Shield Bash"
[reskin] header clause: speed 30 ft. -> 20 ft. — the user typed 20 feet
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Ilvareth Dusksong — in the run

**Concept:** name: Ilvareth Dusksong | An elf archmage who bends shadow and steps between places.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ilvareth Dusksong | 12 (2014) | caster-12 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Slam
- read: def 10 / off 11 → 10.5; sustained 72 (4 × Slam); nova none; dmg 72

```
Ilvareth Dusksong
Medium humanoid, neutral
Armor Class

17 (splint)

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

Arcana +9, Perception +6

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
Protective Magic (3/Day) (Reaction). When Ilvareth is hit by an attack, Ilvareth casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Ilvareth makes four Slam attacks.
Slam: Melee Spell Attack: +9 to hit, reach 5 ft., one target. Hit: 18 (3d8 + 5) necrotic damage.
Spellcasting: Ilvareth casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 17): -

At will: detect magic, detect thoughts, disguise self, invisibility, light, mage armor, mage hand, prestidigitation

2/day each: fly, lightning bolt

1/day each: cone of cold, mind blank, scrying, teleport
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Slam — the chassis
- Actions/Spellcasting — print's own row
- Reactions/Protective Magic — mage kit; the GM's clause "An elf archmage"
- Bonus Actions/Misty Step — mage kit; the GM's clause "bends shadow and steps between places"
- Traits/Magic Resistance — print's own row

**Engine trace**

```
[path] class_npc — class mage — "An elf archmage" (call)
[route] caster (artillery) type=Humanoid mechanics=teleport — casts: on the GM's own words "An elf archmage who bends shadow" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("An elf archmage") | caster: no line key in the words — the model's read of its quote
[concept] name: "Ilvareth Dusksong" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=caster type=Humanoid themes=arcane/uncanny mind=sapient style=— energy=Psychic mix=energy identity=✓ lore=✓
[concept] name: provided "Ilvareth Dusksong"
[concept] mechanics: teleport
[concept] signature elements: stepping between shadowed places [behavior] | shadow-woven spellcasting [body] | a body half-lit, half-consumed by gloom [aura]
[concept] identity: Ilvareth opens by folding the battlefield into gloom, raising a wall of clinging shadow between himself and the party while his arcane bolts begin to fly from angles no one is covering. Each round thereafter he steps through one patch of darkness to another, repositioning after every cast so that closing on him means chasing a silhouette that is already somewhere else, and he prefers to strike from the edge of the light where his counterspells and shadow-magic have room to work. Bloodied, he does not panic but withdraws into deepening shadow, trading ground for time and turning any pursuit into a slow, patient hunt through dark corridors where he is always the one who knows where the next step leads.
[concept] lore: Ilvareth Dusksong was a court archmage of the twilight elves who traded his name's warmth for mastery of the veil between places, and now he walks the margins of the world seeking shadow-paths no mortal has ever stepped through.
[reskin] energy withheld: Psychic on a Humanoid with no Psychic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Archmage — the class's own print block, nearest CR 12
[reskin] print canon defenses: HP 168 -> 170, AC 16 -> 17 — the Archmage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 10, DEX 14, CON 12, INT 20, WIS 15, CHA 16 — the Archmage's at its own CR; attack +8 -> +9, DC 17 (print's)
[reskin] donor: caster-12 -> CR 12
[reskin] [path] decides: class_npc on the Archmage · class mage (the matcher would have said twist Archmage)
[reskin] print canon: "Ilvareth Dusksong — An elf archmage who bends shadow and steps between places." heads on the Archmage — print's rows ride along; the seat stays
[reskin] repair round 1: 2 defect(s) — name "Shadow Bolt" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade | "Shadow Bolt" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "An elf archmage": Misty Step (3/Day) (Mage/Misty Step)
[reskin] proper noun: "Ilvareth Dusksong" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Ilvareth" — the call's own answer (person), built from the name
[reskin] inline form: "Ilvareth" — the model's own reading of the name
[reskin] spell DC coherence: DC 18 -> 17 off Intelligence 20 (print's array stays)
[reskin] save dc derived: DC 18 -> 17 (8 + PB 4 + Intelligence's 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Ilvareth Dusksong — An elf archmage" -> has (descriptive), head | "bends shadow and steps between places" -> has (mechanical) [asked: movement]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Ilvareth hurls a bolt of raw gloom that sinks into the target's shadow rather than the target itself, leaving a dusk-scar on the ground where they stand. Until the scar fades, any shadow-step he takes can be aimed at that spot instead of at other darkness, so the marked creature carries a doorway to him wherever it runs — and stepping through it lets him appear behind or beside the one who thought" [rider/on_hit/movement] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip)
[reskin] signature bound to the concept's verb: action — phase-slip (step, shadow)
[reskin] word match declined by the call: phase-slip, zone, zone-seed — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown phase-slip, which the GM's words keyed
[reskin] key match declined: action — "phase-slip" was ranked first on the call's own menu for step+shadow, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Ilvareth hurls a bolt of raw gloom that sinks into the target's shadow rather than the target itself, leaving a dusk-scar on the ground where they stand. Until the scar fades, any shadow-step he takes can be aimed at that spot instead of at other darkness, so the marked creature carries a doorway to him wherever it runs — and stepping through it lets him appear behind or beside the one who thought" [rider/on_hit/movement] — the model found no template that holds it (offered: phase-slip, bolt-restrain, bolt-drag, bolt-mark, thrown-burst, zone, snare-bolt, thrown-burst-seed, delayed-brand, zone-seed, reveal, blighted-ground, aggro-curse)
[reskin] fallback respects the call: phase-slip left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Archmage's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Ilvareth is never wholly in one place while standing in shadow: the gloom holds a half-lit echo of him that lags a breath behind his real motions. Striking the figure the attacker sees can land on the echo, forcing them to guess which silhouette is the archmage and giving him that breath to step clear." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature miss: trait — "Ilvareth is never wholly in one place while standing in shadow: the gloom holds a half-lit echo of him that lags a breath behind his real motions. Striking the figure the attacker sees can land on the echo, forcing them to guess which silhouette is the archmage and giving him that breath to step clear." [trait/on_being_hit/defense] — no template on the shelf shares a verb with the concept or the idea (offered: absorption, bloodied-burst, resonant-body, false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] weapons answered: Shadow Bolt = none
[reskin] weapon declined: "Shadow Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Shadow Bolt" — a launcher, never thrown, range 80/320
[reskin] print canon languages: "Common, Elvish, Undercommon" -> "Common plus five other languages, Elvish, Undercommon" — the Archmage's plus the concept's Elvish, Undercommon
[reskin] print canon multiattack: "Ilvareth makes four Arcane Burst attacks." — the Archmage's own
[reskin] ranged row narrowed, not removed: "Shadow Bolt" is the only attack on the sheet — the Archmage carries no ranged row, so the row becomes melee at reach 5 rather than leaving a sheet with nothing to attack with
[reskin] attack name by anatomy: "Shadow Bolt" -> "Slam" — bolt is a ranged noun on a melee row
[reskin] print canon defenses: immunities none -> Psychic; Charmed ((with Mind Blank)) — the Archmage's own header lines
[reskin] print canon trait: Magic Resistance — "Ilvareth Dusksong — An elf archmage who bends shadow and steps between places." is the Archmage (print's own row)
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 16" -> "Passive Perception 16")
[reskin] multiattack re-read — "Slam" joins the combination; "Ilvareth makes four attacks, using Arcane Burst or Slam in any combination."
[reskin] multiattack re-read: "Arcane Burst" is not on this sheet, so the combination now reads "Ilvareth makes four Slam attacks."
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Meshrin — in the run

**Concept:** name: Meshrin | Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages. Give him a frightening roar. AC 16, 120 hit points.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | skirmisher-8-hurler | ok | ok | SOFT: lint:hp-formula | ok | ok | ok | ok | ok | ok | ok |

- structure · soft · lint:hp-formula: HP listed 120 but formula 14d10 + 42 averages 119
- read: def 5 / off 8 → 6.5; sustained 51 (3 × Greataxe); nova none; dmg 51

```
Meshrin
Large humanoid, neutral
Armor Class

16 (chain mail)

Hit Points: 

120 (14d10 + 42)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

18 (+4)

	

16 (+3)

	

10 (+0)

	

14 (+2)

	

10 (+0)

Skills: 

Perception +5, Stealth +7

Saving Throws: 

DEX +7, WIS +5

Senses: 

passive Perception 15

Languages: 

Common, Draconic

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Hold Breath. Meshrin can hold its breath for 15 minutes.
Great Weapon Master. When Meshrin hits a creature with its Greataxe, the attack deals an extra 3 damage.
Marsh Stride. Difficult terrain composed of mud doesn't cost Meshrin extra movement, and Meshrin can move across mud without needing to make an ability check.
Fleet Agility. As a bonus action, Meshrin takes the Dash or Disengage action.
Dueling Bellow. As a bonus action, Meshrin targets one creature within 30 feet. That creature must succeed on a DC 15 Wisdom saving throw or have disadvantage on attack rolls against creatures other than Meshrin until the start of Meshrin's next turn.

Actions
Multiattack: Meshrin makes three attacks, using Greataxe or Javelin.
Greataxe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (3d8 + 4) slashing damage.
Javelin: Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 17 (3d8 + 4) piercing damage. Immediately after the attack, its javelin returns to Meshrin's grasp.
Frightening Roar (Recharge 5-6): Each creature within 30 feet of Meshrin must succeed on a DC 15 Wisdom saving throw or be frightened until the end of its next turn.
```

**Where each row came from**

- Traits/Hold Breath — lizardfolk kit; the GM's clause "Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages."
- Traits/Great Weapon Master — a declared feature; the GM's clause "Wields a greataxe two-handed"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages."
- Actions/Multiattack — the chassis
- Actions/Greataxe — authored for this sheet; a named part; the GM's clause "Wields a greataxe two-handed"; weapon greataxe
- Actions/Javelin — weapon javelin
- Actions/Frightening Roar — authored for this sheet; the GM's clause "Give him a frightening roar"
- Bonus Actions/Fleet Agility — the chassis
- Bonus Actions/Dueling Bellow — template aggro-curse; library draw (seed unstamped); binds the GM's words: challenge+duel

**Engine trace**

```
[path] refused: print_body "Lizardfolk" is not in the corpus
[path] refused: class receipt "barbarian" is not in the head clause ("Meshrin Large lizard folk")
[path] homebrew — species lizardfolk — "Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javel" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-hurler: ✓ ("a javelin for the throw") | skirmisher-hurler: key "throw" (class verb)
[concept] name: "Meshrin" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: hurler→style ✓ ("javelin for the throw")
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/armed mind=sapient style=hurler energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Meshrin"
[concept] mechanics: thrown-weapon
[concept] signature elements: two-handed greataxe and thrown javelin [object] | rage that plants him toe-to-toe [behavior] | frightening roar [aura]
[concept] identity: Meshrin lopes in at 30 feet, hurls his javelin to stagger the front rank, then closes with his greataxe already swinging as he drops into a rage that turns each miss into an invitation for a return cleave. His breath is a roaring challenge — a fresh, hide-bound berserker who brags mid-fight rather than feigning or hiding, so he will pick the biggest foe and scream at it until one of them stops moving. Wounded, he does not withdraw: he plants his feet, roars louder, and trades blow for blow to the death.
[concept] lore: Meshrin is a marsh-born lizardfolk raider who fights as a mercenary champion for whoever feeds his warband, and he wants only the roar of a worthy opponent answering his own.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] nova capped: "Hurled Burst" 49 → 44 (the chassis nova obeys the cap: 44 at CR 8)
[reskin] donor: skirmisher-8-hurler -> CR 8 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] repair round 1: 1 defect(s) — "Frightening Roar" deals Thunder on a Humanoid whose concept names no Thunder — a name is not a warrant; use a physical type
[reskin] named parts: Greataxe (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] row evicted for the cap: Traits/"Loping Stride" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages.": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] proper noun: "Meshrin" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Meshrin" — the call's own answer (person), built from the name
[reskin] inline form: "Meshrin" — the model's own reading of the name
[reskin] energy withheld on a base row: "Frightening Roar" Thunder -> Bludgeoning (the body's physical type; a Humanoid deals no Thunder its concept never gave it)
[reskin] save dc derived: DC 16 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] final price: the round ran 39 against the card's 54 — the attack rows re-solve at 138% (3 attacks on an authored sheet, under the card)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Meshrin — Large lizard folk" -> has (header) | "30 feet of movement" -> has (header) | "Wields a greataxe two-handed" -> has (mechanical) [asked: attack] | "a javelin for the throw" -> has (mechanical) [asked: attack] | "He is a barbarian who rages" -> has (mechanical) [asked: buff_self] | "Give him a frightening roar" -> has (mechanical) [asked: condition] | "AC 16" -> has (header) | "120 hit points" -> has (header)
[reskin] extraction: 1 of 8 model clauses quote nothing the user typed and leave the record ("AC 16")
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Meshrin picks the single biggest creature he can see and bellows a personal challenge at it; until one of them drops, that foe has his full attention, and Meshrin fights it harder and refuses to break off while it still stands. He can only devote himself to one rival at a time, and once that duel ends he must catch his breath before he can swear another." [trait/start_of_turn/condition] — menu: warded-mending (+ shelf: snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — throw-retrieve (javelin)
[reskin] value check: "Dueling Bellow" EV 4.2 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] signature template: aggro-curse -> Bonus Actions/"Dueling Bellow" ("bellows a personal challenge at one rival, forcing it to focus attacks on him an [verb: challenge:idea, duel:idea]")
[reskin] signature idea (trait): "When a foe lands a blow on Meshrin, the insult stokes him instead of cowing him, and he answers immediately with a lightning counter-swing of his greataxe before the enemy can pull back. He can only answer like this a handful of times between breaths, and never more than once against the same attack." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (rage)
[reskin] word match declined by the call: resonant-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-fury, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-fury" was ranked first on the call's own menu for rage, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "When a foe lands a blow on Meshrin, the insult stokes him instead of cowing him, and he answers immediately with a lightning counter-swing of his greataxe before the enemy can pull back. He can only answer like this a handful of times between breaths, and never more than once against the same attack." [trait/on_being_hit/damage] — the model found no template that holds it (offered: bloodied-fury, absorption, bloodied-burst, resonant-body)
[reskin] repair: 1 clause(s) with no row — "Give him a frightening roar"; one targeted call with the sheet as context
[reskin] slot yields: nova — the chassis's "Staggering Cast (Recharge 5-6)" leaves; "Frightening Roar (Recharge 5-6)" holds the slot
[reskin] repaired sheet: 1 attack row(s), 1 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Greataxe = greataxe; Javelin = javelin; Staggering Cast = javelin; Frightening Roar = none
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] chassis nova: "Frightening Roar (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Signature Slot", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "Draconic" -> "Common, Draconic" (sapient)
[reskin] audit rewrite blocked — "Javelin" is engine-authored chassis text
[reskin] user-set: HP 136 -> 120 — a declared field (Resolution 3)
[reskin] multiattack re-read — "Javelin" joins the combination; "Meshrin makes three attacks, using Greataxe or Javelin in any combination."
[reskin] species kit: Swim 30 ft. — the lizardfolk's
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Wagebound Sellsword — in the run

**Concept:** a sellsword who hurls a handaxe and closes with a shortsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Wagebound Sellsword | 5 (2014) | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Handaxe
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Shortsword); nova none; dmg 33

```
Wagebound Sellsword
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

Perception +4, Stealth +5

Saving Throws: 

DEX +5, WIS +4

Senses: 

passive Perception 14

Languages: 

Common

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Riposte (Reaction). When a creature within 5 feet of the sellsword misses it with a melee attack, the sellsword makes one shortsword attack against that creature.

Actions
Multiattack: The sellsword makes three attacks, using Shortsword or Handaxe. It can replace one attack with a use of Shield Bash.
Shortsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) piercing damage, and the sellsword has advantage on its next attack roll against the target before the end of its next turn.
Handaxe: Ranged Weapon Attack: +7 to hit, range 20/60 ft., one target. Hit: 8 (1d8 + 4) slashing damage. Immediately after the attack, its handaxe returns to the sellsword's grasp.
Shield Bash: One creature within 5 feet of the sellsword that it can see must make a DC 15 Strength saving throw, taking 9 (2d4 + 4) bludgeoning damage on a failed save. If the target is a Medium or smaller creature, it is knocked prone.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Shortsword — authored for this sheet; a named part; a declared feature; the GM's clause "closes with a shortsword"; weapon shortsword
- Actions/Handaxe — weapon handaxe
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
[concept] signature elements: hurling the handaxe before closing [behavior] | shortsword work at close quarters [behavior] | well-worn iron weapons [object]
[concept] identity: A hard-bitten mercenary who opens every fight by flinging a handaxe across the gap, then surges in behind it with shortsword drawn to finish what the throw began. Each round it paces the range — throw, close, cut, break off — and it reads a battlefield like a ledger, selling ground cheaply and buying kills dearly.
[concept] lore: A sellsword of the free companies who learned that a thrown axe earns the moment it takes to close, and now hires the blade to whoever pays the wage.
[reskin] [path] class body: the fighter stands on the Gladiator — the class's own print block, nearest CR 5
[reskin] nova capped: "Hurled Burst" 31 → 28 (the chassis nova obeys the cap: 28 at CR 5)
[reskin] print canon defenses: HP 95 -> 112, AC 15 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +7, DC 15 (print's)
[reskin] donor: skirmisher-8-hurler -> CR 5 (invented — no printed peer)
[reskin] [path] decides: class_npc on the Gladiator · class fighter (the matcher would have said twist Warrior Veteran)
[reskin] print canon: "a sellsword who hurls a handaxe and closes with a shortsword" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] named parts: Shortsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] row evicted for the cap: Traits/"Ledger Footwork" (chassis filler) leaves so "Riposte" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: fighter — "sellsword": Riposte (riposte)
[reskin] inline declared: "the sellsword" — the call's own answer (kind), built from the name; the rules would have said "Sellsword"
[reskin] inline on kit rows: "Sellsword" -> "the sellsword"
[reskin] inline form: "the sellsword" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "hurls a handaxe" but offered no quote
[reskin] asked field dropped: the call answered trigger "at_will" for "closes with a shortsword" but offered no quote
[reskin] clauses: "a sellsword" -> has (descriptive), head | "hurls a handaxe" -> has (mechanical) [asked: attack] | "closes with a shortsword" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The sellsword throws its shortsword at a creature it can see, then sprints after it — moving its full speed toward the target without provoking from the creature it threw at, shortsword already back in hand. Only works if the throw lands with room to close, and its speed to pursue is capped at a normal move." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The sellsword throws its shortsword at a creature it can see, then sprints after it — moving its full speed toward the target without provoking from the creature it threw at, shortsword already back in hand. Only works if the throw lands with room to close, and its speed to pursue is capped at a normal move." [rider/on_hit/movement] — the model found no template that holds it (offered: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, aggro-curse)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Well-worn iron weapons: the sellsword's handaxes and shortswords are taken back mid-fight, and whenever it breaks off from a foe it pressed with cold steel, the sight of that blade steadies its footing — the sellsword ignores the first stumble of a disengage, and its thrown axe strikes true before it leaves its hand." [trait/always/defense] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: aberrant-ground, resonant-body, terrain-walk, relentless-pursuit, guarded-stance — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Well-worn iron weapons: the sellsword's handaxes and shortswords are taken back mid-fight, and whenever it breaks off from a foe it pressed with cold steel, the sight of that blade steadies its footing — the sellsword ignores the first stumble of a disengage, and its thrown axe strikes true before it leaves its hand." [trait/always/defense] — the model found no template that holds it (offered: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, resonant-body)
[reskin] weapons answered: Shortsword = a shortsword; Handaxe = a handaxe
[reskin] weapon table: "Handaxe" — thrown, range 20/60
[reskin] chassis nova: "Opening Volley (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "Common, one free-company cant" -> "Common" (sapient)
[reskin] print canon multiattack: "The sellsword makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon: chassis row leaves — Actions/"Opening Volley (Recharge 5-6)" is the seat's nova, not the Gladiator's
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Gladiator's
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
audit finding below confidence gate: Shield Bash The double space after the colon is a stray formatting artifact and the sentence switches from 'the target' to 'it' without a clear antecedent within the clause.
[reskin] multiattack re-read — "Shortsword" joins the combination; "The sellsword makes three attacks, using Spear or Shortsword in any combination. It can re"
[reskin] multiattack re-read — "Handaxe" joins the combination; "The sellsword makes three attacks, using Spear or Shortsword or Handaxe in any combination"
[reskin] multiattack re-read: "Spear" is not on this sheet, so the combination now reads "The sellsword makes three attacks, using Shortsword or Handaxe in any combinatio"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Brother Halric — in the run

**Concept:** name: Brother Halric | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Brother Halric | 3 (2014) | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: kit-lands |

- class · fail · kit-lands: the cleric kit landed no row on a class-NPC sheet
- read: def 1/4 / off 3 → 1.625; sustained 22 (2 × Mace); nova none; dmg 22

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

Perception +5, Stealth +2

Saving Throws: 

DEX +2

Senses: 

passive Perception 15

Languages: 

Common plus one other language

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Divine Aid (3/Day). As a bonus action, Brother Halric casts bless, dispel magic, healing word, or lesser restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Brother Halric makes two attacks: one with Mace and one with Radiant Flame.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Spellcasting: Brother Halric casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 13):

At will: light, thaumaturgy
1/day each: spirit guardians
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Mace — print's own row, renamed; weapon mace
- Actions/Radiant Flame — print's own row, renamed
- Actions/Spellcasting — print's own row
- Bonus Actions/Divine Aid — print's own row

**Engine trace**

```
[path] class_npc — class cleric — "Brother" (call)
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: the call reads no worked magic in these words | caster: the family itself needs a magic word in the words — the fallback leaves it | fell to skirmisher's plain line | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=venomous/voice mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: provided "Brother Halric"
[concept] mechanics: none claimed
[concept] signature elements: brine-laced censer swung in darting strikes [object] | whispered false counsel that sows doubt and splits the enemy line [behavior] | an acrid incense shroud of brine-fog that saps and poisons those within [aura]
[concept] identity: Brother Halric fights as a circling skirmisher who feints with his censer and then darts in to hammer the distracted foe with it before retreating behind an ally. Every round he pairs that strike with a venomous whisper of false counsel, working to split the enemy line and pull one soul out of position. When bloodied he does not break but drapes himself in a shroud of acrid incense and slips away to rejoin the ring, sapping the strength of any who pursue.
[concept] lore: Brother Halric was once a poor friar who drank the brine from a drowned saint's reliquary, and now he wanders the roads carrying his censer to 'bless' those he meets — though the smoke he offers poisons the faithful and the doubt he whispers curdles brother against brother.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the cleric stands on the Priest — the class's own print block, nearest CR 3
[reskin] print canon defenses: HP 58 -> 38, AC 13 -> 13 — the Priest's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 13 (chain shirt) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 16, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's at its own CR; attack +4 -> +5, DC 13 (print's)
[reskin] donor: skirmisher-3 -> CR 3
[reskin] [path] decides: class_npc on the Priest · class cleric (the matcher would have said homebrew)
[reskin] print canon: "Brother Halric" heads on the Priest — print's rows ride along; the seat stays
[reskin] repair round 1: 2 defect(s) — "Censer" deals Poison on a Humanoid whose concept names no Poison — a name is not a warrant; use a physical type | "Swinging Censer" deals Poison on a Humanoid whose concept names no Poison — a name is not a warrant; use a physical type
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Brother": nothing to add — the sheet already answers it
[reskin] proper noun: "Brother Halric" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Brother Halric" — the call's own answer (person), built from the name; the rules would have said "the brother"
[reskin] inline on kit rows: "the brother" -> "Brother Halric"
[reskin] energy rider withheld: Poison on a Humanoid with no Poison in the concept's own words
[reskin] energy withheld on a base row: "Censer" Poison -> Bludgeoning (the body's physical type; a Humanoid deals no Poison its concept never gave it)
[reskin] energy withheld on a base row: "Swinging Censer" Poison -> Piercing (the body's physical type; a Humanoid deals no Poison its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Brother Halric" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Halric leans close and murmurs a poisoned confidence into a foe's ear, a scrap of false counsel that makes the target doubt the ally beside it. For a short while, the listener cannot bring itself to aid or defend that ally — it flinches from their help, refuses their cover, and shies from fighting shoulder-to-shoulder — and the more the ally tries to reach it, the more the doubt festers. The whisp" [action/save/condition] — menu: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] word match declined by the call: delayed-brand, affliction, coating, lure — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Halric leans close and murmurs a poisoned confidence into a foe's ear, a scrap of false counsel that makes the target doubt the ally beside it. For a short while, the listener cannot bring itself to aid or defend that ally — it flinches from their help, refuses their cover, and shies from fighting shoulder-to-shoulder — and the more the ally tries to reach it, the more the doubt festers. The whisp" [action/save/condition] — the model found no template that holds it (offered: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, affliction, coating)
[reskin] fallback respects the call: lure left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Priest's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The censer's smoke clings to those Halric strikes, and the brine in it lingers in the wound. Until the end of the victim's next turn, that foe is distracted — its guard drops and Halric's next darting blow against it lands more surely. Halric can only mark a foe this way that he actually hit, and the reek fades if he does not strike again before the moment passes." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: marking-light, faultless-tracker, aberrant-ground, relentless-pursuit — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The censer's smoke clings to those Halric strikes, and the brine in it lingers in the wound. Until the end of the victim's next turn, that foe is distracted — its guard drops and Halric's next darting blow against it lands more surely. Halric can only mark a foe this way that he actually hit, and the reek fades if he does not strike again before the moment passes." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] weapons answered: Censer = none; Swinging Censer = none
[reskin] weapon table: "Swinging Censer" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Neutral Evil -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon attack: "Censer" -> "Mace" — the Priest's own row
[reskin] print canon multiattack: "Brother Halric makes two attacks, using Mace or Radiant Flame in any combination." — the Priest's own
[reskin] print canon attack: "Radiant Flame" is print's own row — +5, 11 (2d10), range 60 ft. (an exact body at print's CR)
[reskin] print canon attack: "Swinging Censer" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Circling Step" is the seat's, not the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Priest's Divine Aid (3/Day)
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 13 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Review batch — classes-eight-2026-10-19T13-28-29

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

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


### Ser Aldric Vane — a 2014 sheet

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


### Thurivald — in the run

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


---

## Review batch — twist-ten-2026-10-19T04-56-15

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Suture Troll | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |
| Cinder-Choked Hydra | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Legion Halberdier | 2 | 2024 | skirmisher-1 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Glacier-Jarl Hoarfrost | 9 | 2024 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 3/3 |
| Gravewatch Archer | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Twin-Head Wolf | 2 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Scaldwell Keeper | 13 | 2024 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Tolling Chapel Wraith | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 7/7 |

**Dropped 3 of 11 user clauses** (coverage 73%); concept share 100% (40/40 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


_No 2014 blocks sampled in this run._

---

## Review batch — twist-five-2026-10-19T04-59-39

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gravebound Conscript | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Arena Oathbones | 4 | 2024 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/2 |
| Hillreach Ogre | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Warren Troll | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Unlistened | 9 | 2024 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/2 |

**Dropped 0 of 6 user clauses** (coverage 100%); concept share 100% (14/14 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


_No 2014 blocks sampled in this run._
