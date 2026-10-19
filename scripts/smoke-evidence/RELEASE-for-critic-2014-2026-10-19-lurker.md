# Release table for the critic — 2014 blocks — 2026-10-19

The case is at the top of the 2024 file (RELEASE-for-critic-2024-2026-10-19-lurker.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

## Review batch — sweep-2026-10-18T23-43-43

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Bog Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Owlbear | 3 (2014) | 2014 | brute-2 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 1/1 | 2/2 |
| Chapel Bell-Ringer | 3 | 2024 | lurker-1-phantom | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Air Elemental | 5 | 2024 | lurker-5 | ok | ok | FAIL: two-novas | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 5/5 |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Siege-Timber Golem | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 7/7 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Drowned Choir | 10 (2014) | 2014 | caster-8-binder | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/7 |
| Vampire | 13 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 9/9 |
| Mercyblight Archon | 13 | 2024 | skirmisher-13-winged | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 6/6 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Glacier's Heart | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 5/5 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: lack-honored | FAIL (1) | 0/1 | 7/7 |
| Brass Tyrant | 17 | 2024 | skirmisher-18 | ok | SOFT: aim-dpr, hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 10/11 |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Ossein Heliarch | 20 (2014) | 2014 | caster-21 | ok | ok | ok | FAIL: ko-ungated | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 9/9 |
| Ancient Gold Dragon | 24 (2014) | 2014 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Drowning Leviathan | 24 | 2024 | brute-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 5/7 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Vashka the Red | 6 | 2024 | defender-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 4/6 |
| Caustic Broodling | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/3 | 4/4 |
| Black-Iron Sentinel | 11 (2014) | 2014 | defender-5 | ok | user-set: AC 20 · reads CR 9 | ok | ok | ok | ok | ok | ok | ok | clean | 3/3 | 2/2 |
| Mire Hagsight | 7 | 2024 | caster-8-binder | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 2/2 | 2/7 |
| Ironwrit Templar | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Ilvareth Dusksong | 12 (2014) | 2014 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Swarm of Knell of the Dyings | 13 | 2024 | swarm-9 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Reliquary Vault Ooze | 9 (2014) | 2014 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 1/1 | 6/6 |
| Squallmaw Drake | 7 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/3 |
| Quarried Exile | 9 (2014) | 2014 | brute-9 | FAIL: attack-stat, lint:attack-mod-coherence | SOFT: band | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 2/2 | 1/3 |
| Cold Fury Monk | 5 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (2) | 1/1 | 4/6 |
| Krennik Skullstandard | 4 (2014) | 2014 | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/6 |
| Well Drowner | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Sludgeshell Priest | 4 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 10/15 | 5/5 |
| Meshrin | 8 (2014) | 2014 | skirmisher-8-hurler | ok | user-set: AC 16, HP 120 · reads CR 6.5 | SOFT: payoff-producer, lint:hp-formula | ok | ok | ok | ok | ok | ok | soft (1) | 7/8 | 9/9 |
| Skeleton | 6 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/3 |
| Scarred Sellsword | 5 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 3/3 |
| Brother Halric | 3 (2014) | 2014 | caster-2-warpriest | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/5 |

**Dropped 16 of 69 user clauses** (coverage 77%); concept share 89% (180/203 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- lurker-5 / structure: 1
- dragon-15 / reader: 1
- caster-21 / gates: 1
- caster-8-binder / derivation: 1
- brute-9 / derivation: 1



---


### Bog Hound — a 2014 sheet

**Concept:** a mud-caked bog hound that drags fishermen under

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Bog Hound | 1 (2014) | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 0 / off 1 → 0.5; sustained 10 (2 × Bite); nova none; dmg 10

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

Mire Lurker. While the hound remains motionless, it is indistinguishable from a patch of soggy bank.
Whelm. As a bonus action, the hound whelms one Medium or smaller creature it is grappling. While whelmed, the target is blinded and restrained, has total cover against attacks and other effects outside the hound, and takes 3 (1d6) bludgeoning damage at the start of each of the hound's turns. The hound can have only one creature whelmed at a time. If the hound takes 5 damage or more in a single turn from the whelmed creature, the hound must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the hound. If the hound dies, a whelmed creature pulls free prone by using 5 feet of movement.

Actions
Multiattack: The hound makes two Bite attacks. It can replace one attack with a use of Mire Drag.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained.
Mire Drag: One creature within 20 feet of the hound must succeed on a DC 13 Strength saving throw or be pulled up to 15 feet straight toward the hound by its jaws and be grappled (escape DC 11).
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Bite — the chassis
- Actions/Mire Drag — template hook-drag; library draw (seed unstamped); the GM's clause "drags fishermen under"; binds the GM's words: drag+under+pull+haul
- Bonus Actions/Whelm — binds the GM's words: whelm+swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon
- Traits/Mire Lurker — template false-appearance; library draw (seed unstamped)

**Engine trace**

```
[route] brute-grappler type=Beast mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "drags fishermen under" | brute-grappler: ✓ ("drags fishermen under") | brute-grappler: no line key in the words — the model's read of its quote
[concept] hints: engulf→mechanics ✓ ("drags fishermen under")
[concept] resolve: archetype=brute type=Beast themes=bestial/grasping mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: lying hidden as mud at the water's edge [behavior] | dragging seized prey into deep water [behavior] | mud-caked hound hide [body]
[concept] identity: The bog hound lies half-sunk in the muck at the waterline, a mat of hide and weed indistinguishable from the shore, then lunges to seize a fisherman by the leg and haul him shin-deep into clinging mud. Once its jaws are set it never bites and retreats; it braces, thrashes, and drags backward along the bottom, trading the weight of its body against everything its prey can pull with. Wounded, it only hauls harder — the drag toward deeper water is the only retreat it knows.
[concept] lore: A starving cur that drowned in the reed beds and never stopped hunting, it wants nothing but to pull warm bodies down into the muck where it can finish them at its leisure.
[reskin] donor: brute-5-grappler -> CR 1
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] engulf engine: Whelm — the body's own verb
[reskin] engine interior scaled — CR 1 sits below the brute-5-grappler seat
[reskin] inline declared: "the hound" — the call's own answer (kind), built from the name
[reskin] inline form: "the hound" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a mud-caked bog hound" -> has (descriptive), head | "drags fishermen under" -> has (mechanical) [asked: on_hit/condition]
[reskin] signature idea (action): "Once the hound has a creature gripped in its jaws, its only tactic is to haul backward along the streambed, putting the weight of its sunk, braced body against the prey. The grabbed creature is dragged with it toward the deepest muck the hound can reach, and every inch closer to open water is a fight against the mud itself. The hound never lets go to strike again; it just keeps pulling, and the gr" [action/always/movement] — menu: swallow, shield-bash, hook-drag, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — hook-drag, hook-rider (drag, under, drags)
[reskin] word match declined by the call: hook-rider — the key word does not mean the mechanic here
[reskin] value check: "Mire Drag" EV 3.3 vs floor 3.1 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Mire Drag" ("Once the hound has a creature gripped, it hauls backward and drags the grabbed c [verb: drag:concept, under:concept, pull:idea, haul:idea]")
[reskin] keys spent by the action: drag, under
[reskin] signature idea (trait): "The hound lies half-sunk in the shoreline muck, and its hide of matted weed and caked mud makes it read as a patch of soggy bank rather than a living thing — it is easy to walk right past it until the jaws close. It can raise itself from that resting lie almost instantly when prey comes within reach, and it can sink back into the mud it came from whenever it wants." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog, mud)
[reskin] word match declined by the call: terrain-walk, faultless-tracker — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "false-appearance" has no key-table verb, but the call quotes "mud caked bog hound" from the description
[reskin] signature template (trait): false-appearance -> Traits/"Mire Lurker" ("The hound lies half-sunk in the shoreline muck, its hide of matted weed and cake [shape fit, no verb match]")
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 4 on a Beast speaks nothing, whatever the mind read said
[reskin] multiattack replacement clause: It can replace one attack with a use of Mire Drag.
[reskin] row binds its clause: "Mire Drag" answers "drags fishermen under" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "drags fishermen under" -> "Mire Drag" — trigger: asked on_hit, row reads at_will
audit finding below confidence gate: Whelm The entry imposes Prone on the released target, but nothing in the block creates or explains that Prone state as a function of the whelm, and the hound is medium-sized with no space rules permitting the target to exit there while it is still grappled.
[reskin] escape dc: Mire Drag → DC 11 (8 + PB + STR; a late row wore another number)
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Owlbear — a print donor

**Concept:** name: Owlbear | that has learned to climb

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 (2014) | brute-2 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Learned Climber
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

Learned Climber. The owlbear has a climb speed equal to its walking speed and can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.

Actions
Multiattack: The owlbear makes two Rend attacks.
Rend: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.
```

**Where each row came from**

- Actions/Multiattack — print's own row
- Actions/Rend — print's row, renamed
- Traits/Learned Climber — authored for this sheet; the GM's clause "has learned to climb"

**Engine trace**

```
[route] brute type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("Owlbear") | brute: no line key in the words — the model's read of its quote
[concept] name: "Owlbear" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/grasping mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: none claimed
[concept] signature elements: ambush from above [behavior] | hooked foreclaws for climbing and pinning [body] | grinding beak [body]
[concept] identity: An owlbear that has learned to climb does not lumber into a fight—it drops from the canopy onto its prey, hooked foreclaws raking and pinning, then plants its broad, shaggy bulk and trades blows with the same beak that tears bark from trees. Every round it weathers counterattacks while using its climbing limbs to drag the fight toward trunk and rock, herding foes into corners where its mass matters. It is a territorial brute with just enough cunning to know that high ground is an ambush, and it fights to the death over a fresh kill or a threatened den.
[concept] lore: A mated pair of owlbears raised in the cliff forests learned to scale the old pines, and their descendants now own the treeline—hunting anything warm that walks beneath the branches.
[reskin] print canon defenses: HP 58 -> 59, AC 10 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +4 -> +7, DC 15 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] print canon: "Owlbear — that has learned to climb" heads on the Owlbear — print's rows ride along; the seat stays
[reskin] inline by rule: "the owlbear" — the call answered "the owlbear" (kind), which the name does not support
[reskin] inline form: "the owlbear" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Owlbear —" -> has (descriptive), head | "has learned to climb" -> has (mechanical)
[reskin] signature idea (action): "The owlbear launches itself from a trunk or overhead branch, crashing down onto a foe beneath it with all its weight and hooked foreclaws. The first strike out of the air rakes deep and drags the victim down under the beast, leaving it sprawled and pinned beneath the owlbear's bulk. It can only pull this off when it has height to leap from, and once it has dropped it must win its way back up to a " [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] word match declined by the call: hook-rider, leap — the key word does not mean the mechanic here
[reskin] fit declined: "Falling Pounce" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: "Owlbear — that has learned to climb" heads on the Owlbear and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Its hooked foreclaws are made for gripping, and they grip living things as readily as bark: anything the owlbear has its claws in is held fast and dragged along as it hauls the victim back toward trunk or den, and it does not let go to trade blows elsewhere." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — spider-climb (climb, climbs, climbing)
[reskin] word match declined by the call: adhesive, spider-climb — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown spider-climb, which the GM's words keyed
[reskin] key match declined: trait — "spider-climb" was ranked first on the call's own menu for climb+climbs+climbing, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Its hooked foreclaws are made for gripping, and they grip living things as readily as bark: anything the owlbear has its claws in is held fast and dragged along as it hauls the victim back toward trunk or den, and it does not let go to trade blows elsewhere." [trait/always/movement] — the model found no template that holds it (offered: spider-climb, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] concept-first trait skipped: spider-climb — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] repair: 1 clause(s) with no row — "has learned to climb"; one targeted call with the sheet as context
[reskin] repaired sheet: 0 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Talons = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon attack: "Talons" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "The owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] lint actuator: capitalized "speed" -> "Speed" in "Learned Climber"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Adult Red Dragon — a legendary

**Concept:** name: Adult Red Dragon | blind in one eye from an old lance

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Adult Red Dragon | 17 (2014) | dragon-15 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: lack-honored |

- reader · fail · lack-honored: the GM asked for an absence — "Adult Red Dragon — blind in one eye from an old lance" — and the sheet still carries it
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
- Actions/Rend — print's row, renamed
- Actions/Spellcasting — print's own row
- Actions/Fire Breath — print's own row
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Commanding Presence — print's own row
- Legendary Actions/Fiery Rays — print's own row
- Legendary Actions/Pounce — print's own row

**Engine trace**

```
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | dragon: ✓ ("Adult Red Dragon") | dragon: key "dragon" (class body)
[concept] name: "Adult Red Dragon" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: dragon→body ✓ ("Adult Red Dragon, blind in one eye")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/terror mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Adult Red Dragon"
[concept] mechanics: breath
[concept] signature elements: the blind left eye and the lance scar [body] | predatory fire breath in strafing runs [behavior] | two-century hoard-territory grudge [aura]
[concept] identity: An old adult red dragon whose left side is a blind spot ringed by old scar tissue, it opens by wheeling on its good eye to find the largest threat, then pins that quarter with a strafing breath run and a diving bite-and-claw pass. Every round it keeps its ruined side angled away and uses the terrain, never letting prey slip behind it; wounded and half-blind, it does not flee — it grows crueler, feinting with its head to bait a flank it can hear coming and answering with fire at claw range.
[concept] lore: Scarred by a knight's lance that took its eye and left the steel tip embedded in its skull, this crimson wyrm has ruled its crag for two centuries and wants nothing more than to find every lance that ever dared touch it and burn the hands that hold them.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] print canon defenses: HP 256 -> 256, AC 20 -> 19 — the Adult Red Dragon's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 27, DEX 10, CON 25, INT 16, WIS 13, CHA 23 — the Adult Red Dragon's at its own CR; attack +10 -> +14, DC 21 (print's)
[reskin] donor: dragon-15 -> CR 17
[reskin] print canon: "Adult Red Dragon — blind in one eye from an old lance" heads on the Adult Red Dragon — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Wheeling Claw" promises a claw but the row makes a Bite attack — name the delegation honestly, or without anatomy
[reskin] inline by rule: "the red dragon" — the call answered "the red dragon" (kind), which the name does not support
[reskin] inline form: "the red dragon" — the model's own reading of the name
[reskin] spell DC coherence: DC 19 -> 20 off Charisma 23 (print's array stays)
[reskin] save dc derived: DC 19 -> 20 (8 + PB 6 + Charisma's 6) — no stat on the sheet reached it
[reskin] lacks asked: "blind in one eye"
[reskin] clauses: "Adult Red Dragon — blind in one eye from an old lance" -> LACKS (mechanical)
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, exploiter, sensory-strike, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (the sheet cannot render them)
[reskin] signature idea (action): "When the dragon whips its ruined blind side toward a foe to bait a strike, the old lance wound in its skull catches the light and the scar tissue splits open, vomiting a short, searing gout of fire from the very wound that half-blinded it. Anyone who took the bait and pressed in from that flank is caught at close range, and the pain of the wound makes the beast crueler rather than weaker, so the a" [action/always/damage] — menu: snare, condition-payoff, execute, throw-retrieve, seal, shield-bash, lure (+ shelf: lay-on-hands, second-wind, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — throw-retrieve, charge (lance)
[reskin] word match declined by the call: throw-retrieve, charge — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown throw-retrieve, charge, which the GM's words keyed
[reskin] key match declined: action — "throw-retrieve" was ranked first on the call's own menu for lance, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the dragon whips its ruined blind side toward a foe to bait a strike, the old lance wound in its skull catches the light and the scar tissue splits open, vomiting a short, searing gout of fire from the very wound that half-blinded it. Anyone who took the bait and pressed in from that flank is caught at close range, and the pain of the wound makes the beast crueler rather than weaker, so the a" [action/always/damage] — the model found no template that holds it (offered: throw-retrieve, charge, snare, condition-payoff, execute, seal, shield-bash, lure)
[reskin] signature idea (trait): "The dragon always keeps its scarred left side angled away and hunts by ear and scent on that flank; anything that slips behind its ruined side finds the wyrm has already heard it coming and is turning its good eye to meet it, so the blind spot is never truly a safe place to strike from." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: uncanny-sense, faultless-tracker, relentless-pursuit — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "already_answered"
[reskin] signature miss: trait — "The dragon always keeps its scarred left side angled away and hunts by ear and scent on that flank; anything that slips behind its ruined side finds the wyrm has already heard it coming and is turning its good eye to meet it, so the blind spot is never truly a safe place to strike from." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, blurred-form, death-burst)
[reskin] weapons answered: Bite = none; Strafe of Fire = none; Guttering Roar = none; Wheeling Claw = none; Wing Over = none; Dire Glare = none
[reskin] chassis nova: "Strafe of Fire (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] print canon alignment: Neutral Evil -> Chaotic Evil — the Adult Red Dragon's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Draconic, Common" -> "Common, Draconic" — the Adult Red Dragon's
[reskin] print canon attack: "Bite" -> "Rend" — the Adult Red Dragon's own row
[reskin] print canon multiattack: "The red dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast *Scorching Ray*." — the Adult Red Dragon's own
[reskin] element immunity: Fire (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 -> 60
[reskin] dragon spell DC derived: 20 (8 + PB + Cha mod — the breath keeps the card DC)
[reskin] dragon mental save DC derived: "Dire Glare" -> 20 (the Frightful Presence class keys to Charisma)
[reskin] immunities stamped for type: Dragon -> Fire
[reskin] print canon legendary: Commanding Presence, Fiery Rays, Pounce — the Adult Red Dragon's own kit stands where the chassis's stood
[reskin] print canon nova: "Strafe of Fire (Recharge 5-6)" leaves — at print's CR the Adult Red Dragon's own Fire Breath (Recharge 5-6) is the one breath, dice and all
[reskin] print canon row: Actions/Fire Breath (Recharge 5-6) — the Adult Red Dragon's own
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] audit rewrite blocked — "Commanding Presence" is engine-authored chassis text
[reskin] audit rewrite blocked — "Fiery Rays" is engine-authored chassis text
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Glacier's Heart — one marked soft

**Concept:** a glacier's heart given legs, trailing a wake of killing cold

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Glacier's Heart | 15 (2014) | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 12.5 (print at 15 reads 7–15, n=12)
- **dropped clause:** "trailing a wake of killing cold"
- read: def 10 / off 15 → 12.5; sustained 70 (2 × Slam); nova Killing Cold 71; dmg 94

```
Glacier's Heart
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

Cold Absorption. Whenever the glacier's heart is subjected to cold damage, it takes no damage and instead regains a number of hit points equal to the cold damage dealt.
Siege Monster. The glacier's heart deals double damage to objects and structures.

Actions
Multiattack: The glacier's heart makes two Slam attacks. It can replace one attack with a use of Heartchill Lash.
Slam: Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage plus 13 (3d8) cold damage.
Killing Cold (Recharge 5-6): Each creature in a 30-foot cone must make a DC 17 Constitution saving throw, taking 71 (13d10) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also poisoned until the end of its next turn.
Heartchill Lash: One creature within 30 feet that is poisoned must make a DC 17 Constitution saving throw, taking 26 (4d12) cold damage on a failed save, or half as much damage on a successful one.
```

**Where each row came from**

- Traits/Cold Absorption — the chassis
- Traits/Siege Monster — the chassis
- Actions/Multiattack — the chassis
- Actions/Slam — the chassis
- Actions/Killing Cold — the chassis
- Actions/Heartchill Lash — library seed exploiter

**Engine trace**

```
[route] brute-juggernaut type=Elemental mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a glacier's heart given legs") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental themes=elemental/terror mind=bestial style=juggernaut energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: a trail of killing cold left in its wake [aura] | a glacier's heart walking on limbs of ice [body] | relentless crushing advance that never breaks off [behavior]
[concept] identity: A heart of glacial ice strides forward on limbs of fractured blue glacier, opening every fight by simply walking into the enemy line — its passing leaves a spreading wake of killing cold that frosts the ground and slows any who follow. Each round it hammers with crushing fists of packed ice while the chill radiating from its mass saps the warmth from everything nearby, and when bloodied it does not flee or relent but redoubles its advance, grinding forward to bury hunters in the cold it drags behind it.
[concept] lore: The living core torn from a dying glacier and goaded into legs by a god of winter's deep places, it longs only to return to the ice shelf it was cut from — and it will walk over anything standing between it and the sea.
[reskin] donor: brute-9-juggernaut -> CR 15
[reskin] name_element answered: Killing Cold = literal
[reskin] inline by rule: "the glacier's heart" — the call answered "the glacier's heart" (kind), which the name does not support
[reskin] inline form: "the glacier's heart" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 17 (8 + PB 5 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a glacier's heart given legs" -> has (descriptive), head | "trailing a wake of killing cold" -> has (mechanical) [asked: condition]
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The glacier's heart grinds straight ahead in a line, trampling over anything in its path — creatures it passes take crushing cold damage and are left slow and shivering, clinging to the frozen trail it leaves behind. It never stops to fight the things it treads under, only plows forward, and everything in that line feels the killing wake." [action/save/damage] — menu: condition-payoff, shield-bash, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] word match declined by the call: condition-payoff, shield-bash, push-prone — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The glacier's heart grinds straight ahead in a line, trampling over anything in its path — creatures it passes take crushing cold damage and are left slow and shivering, clinging to the frozen trail it leaves behind. It never stops to fight the things it treads under, only plows forward, and everything in that line feels the killing wake." [action/save/damage] — the model found no template that holds it (offered: condition-payoff, shield-bash, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter)
[reskin] fallback respects the call: condition-payoff, push-prone left the shelf — the call declined them for this sheet
[reskin] fallback skipped by the floor: terror-pulse (EV 35.2 vs 54.1)
[reskin] fallback skipped by the floor: herd (EV 12.5 vs 54.1)
[reskin] value check: "Opportunist's Lash" EV 20.2 vs floor 16.6 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The ground itself freezes in its wake; the trail of killing cold behind it lingers, and any creature standing in or crossing that frozen trail is slowed by the spreading chill as long as the heart keeps walking." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk, aberrant-ground, faultless-tracker (glacier, wake, trail)
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown terrain-walk, aberrant-ground, faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "terrain-walk" was ranked first on the call's own menu for glacier, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The ground itself freezes in its wake; the trail of killing cold behind it lingers, and any creature standing in or crossing that frozen trail is slowed by the spreading chill as long as the heart keeps walking." [trait/always/movement] — the model found no template that holds it (offered: terrain-walk, aberrant-ground, faultless-tracker, false-appearance, adhesive, phobia, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] weapons answered: Slam = none
[reskin] chassis nova: "Killing Cold (Recharge 5-6)" — the brute-9-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] trait stripped: Traits/Immutable Form — a golem's trait on a Elemental
[reskin] defenses by material: a ice body is vulnerable to Fire and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] absorption re-keyed: Acid -> Cold (the donor organ obeys the concept energy)
[reskin] immunities stamped for type: Elemental -> Cold, Poison; Exhaustion, Poisoned
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
[reskin] save re-derived after a retype: Actions/Opportunist's Lash — a Strength save for an effect that calls for Constitution; the save follows the condition
[reskin] audit rename: "Opportunist's Lash" -> "Heartchill Lash"
[reskin] size floor: STR 16 -> 18 — print prints no corporeal Huge body under 18 (the Archelon); the attack follows it, as print's own 49 do
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Quarried Exile — bands soft

**Concept:** a stone giant exile who speaks only Giant and understands no Common

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Quarried Exile | 9 (2014) | brute-9 | FAIL: attack-stat, lint:attack-mod-coherence | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- derivation · fail · attack-stat: Boulder: +7 derives from CON, but a weapon row rolls STR/DEX
- derivation · fail · lint:attack-mod-coherence: Actions/Boulder: flat damage bonus +3 matches none of the creature's STR/DEX/INT/WIS/CHA modifiers — attack damage bonuses derive from the attack ability
- bands · soft · band: reads CR 7.5 (print at 9 reads 5.5–13, n=8)
- read: def 7 / off 8 → 7.5; sustained 56 (2 × Fist); nova none; dmg 56

```
Quarried Exile
Huge giant, chaotic neutral
Armor Class

14 (natural armor)

Hit Points: 

161 (17d12 + 51)

Speed: 

40 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

8 (-1)

	

17 (+3)

	

8 (-1)

	

10 (+0)

	

8 (-1)

Skills: 

Athletics +8, Perception +4

Saving Throws: 

STR +8, CON +7

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

Giant

Challenge

9 (5,000 XP)

Proficiency Bonus:

+4

Retaliating Heave. As a bonus action, the quarried exile deals 11 (2d10) bludgeoning damage to one creature within 5 feet of it that hit it with an attack roll since the end of its last turn.

Actions
Multiattack: The quarried exile makes two attacks: one with its Fist and one with its Boulder.
Fist: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 28 (7d6 + 4) bludgeoning damage.
Boulder: Ranged Weapon Attack: +7 to hit, range 60/240 ft., one target. Hit: 24 (6d6 + 3) bludgeoning damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Fist — the chassis
- Actions/Boulder — the chassis
- Bonus Actions/Retaliating Heave — library seed own-turn-punisher

**Engine trace**

```
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a stone giant exile") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "stone giant exile who speaks only Giant …" is the description, not a name
[concept] resolve: archetype=brute type=Giant themes=elemental/bestial mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: boulder hurled before the charge [behavior] | body of quarried stone [body] | Giant speech and no Common [behavior]
[concept] identity: It announces itself with a low bellow in Giant and hurls a head-sized boulder down the road before closing, then plants its feet and trades swings with whatever survives — heavy stone fists and a slab of quarry-wrested rock. Every round it seeks to pin a foe against a wall or wagon and pound it flat, heedless of its own wounds; bloodied, it bellows louder and redoubles, never fleeing. It understands no Common and will not parley, though a clever Giant-speaker can make it pause and listen.
[concept] lore: Cast out of a mountain clan for some quarrel it will not explain — even in Giant it speaks haltingly, as though words themselves were beaten out of it — it wanders the lowlands striking at anything that stands its ground, wanting only a fight that ends decisively.
[reskin] donor: brute-9 -> CR 9
[reskin] inline declared: "the quarried exile" — the call's own answer (kind), built from the name; the rules would have said "Exile"
[reskin] inline on kit rows: "Exile" -> "the quarried exile"
[reskin] inline form: "the quarried exile" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: "understands no Common"
[reskin] lacks refused: "speaks only Giant" names no absence — nothing in it takes anything away
[reskin] clauses: "a stone giant exile" -> has (descriptive), head | "speaks only Giant" -> has (header) | "understands no Common" -> LACKS (mechanical)
[reskin] signature idea (action): "When the exile fights something that stands its ground, it drives it backward with a shoulder of quarry stone, shoving the foe across the ground until it slams into a wall, wagon, or cliff. The pinned creature is trapped against that surface, and the exile's next blows against it land harder while it has nowhere to retreat. A Giant-speaker who calls out to it in its own tongue can make it pause mi" [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] word match declined by the call: push-prone, charge-push, charge, pounce, hook-rider — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When the exile fights something that stands its ground, it drives it backward with a shoulder of quarry stone, shoving the foe across the ground until it slams into a wall, wagon, or cliff. The pinned creature is trapped against that surface, and the exile's next blows against it land harder while it has nowhere to retreat. A Giant-speaker who calls out to it in its own tongue can make it pause mi" [rider/on_hit/movement] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, pounce, charge, herd, push-prone)
[reskin] fallback respects the call: push-prone left the shelf — the call declined it for this sheet
[reskin] value check: "Answering Sting" EV 6.1 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The exile's body is raw quarried rock, and every wound it takes chips loose a spray of stone shards at whoever struck it. Its flesh seems to remember the quarry: each new gash sheds grit and fragments that punish foes for pressing close." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] word match declined by the call: false-appearance, heated-body, bloodied-burst, bloodied-fury, faultless-tracker — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown false-appearance, which the GM's words keyed
[reskin] key match declined: trait — "false-appearance" was ranked first on the call's own menu for stone, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The exile's body is raw quarried rock, and every wound it takes chips loose a spray of stone shards at whoever struck it. Its flesh seems to remember the quarry: each new gash sheds grit and fragments that punish foes for pressing close." [trait/on_being_hit/damage] — the model found no template that holds it (offered: false-appearance, heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, faultless-tracker, bloodied-fury)
[reskin] weapons answered: Fist = none; Boulder = none
[reskin] audit rename: "Answering Sting" -> "Retaliating Heave"
[reskin] size floor: STR 16 -> 18 — print prints no corporeal Huge body under 18 (the Archelon); the attack follows it, as print's own 49 do
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Cold Fury Monk — bands soft

**Concept:** lizardfolk monk

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cold Fury Monk | 5 (2014) | skirmisher-3 | ok | SOFT: band | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 3.5 (print at 5 reads 2.5–9.5, n=25)
- gates · soft · ko-at-will: Actions/Claw: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 4 → 3.5; sustained 32 (2 × Claw); nova none; dmg 32

```
Cold Fury Monk
Medium humanoid, neutral
Armor Class

15 (chain shirt)

Hit Points: 

97 (15d8 + 30)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


12 (+1)

	

16 (+3)

	

14 (+2)

	

8 (-1)

	

12 (+1)

	

8 (-1)

Skills: 

Perception +4, Stealth +6

Saving Throws: 

DEX +6

Senses: 

passive Perception 14

Languages: 

Common, Draconic

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Hold Breath. The monk can hold its breath for 15 minutes.
Marsh Stride. Difficult terrain composed of mud doesn't cost the monk extra movement, and the monk can move across mud without needing to make an ability check.
Patient Defense. As a bonus action, the monk takes the Dodge action.

Actions
Multiattack: The monk makes two attacks: one with its Claw and one with its Spit. It can replace one attack with a use of Merciless Strike.
Claw: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) slashing damage. Once on each of the monk's turns when it hits with this attack, the target is subjected to the following effect. The target must succeed on a DC 14 Constitution saving throw or be stunned until the end of the monk's next turn.
Spit: Ranged Weapon Attack: +6 to hit, range 20/60 ft., one target. Hit: 12 (2d8 + 3) piercing damage.
Merciless Strike: One creature within 30 feet of the monk that is stunned must make a DC 14 Wisdom saving throw, taking 21 (6d6) bludgeoning damage on a failed save, or half as much damage on a successful one.
```

**Where each row came from**

- Traits/Hold Breath — lizardfolk kit; the GM's clause "lizardfolk monk"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "lizardfolk monk"
- Actions/Multiattack — the chassis
- Actions/Claw — a declared feature; the GM's clause "lizardfolk monk"
- Actions/Spit — the chassis
- Actions/Merciless Strike — library seed condition-payoff
- Bonus Actions/Patient Defense — template patient-defense; monk kit; the GM's clause "lizardfolk monk"

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("lizardfolk monk") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: scaled hide and reptilian reflexes [body] | pack flanking and hit-and-run strikes [behavior] | disciplined martial arts [behavior]
[concept] identity: The lizardfolk monk opens by stalking the perimeter, using pack tactics to flank and probe with lightning-fast unarmed strikes before darting back beyond reach. Every round it weaves in and out of melee, exploiting its scaled hide and reptilian reflexes to punish overextension while its allies close in. When bloodied, it does not flee—it fights with cold, methodical fury, retreating only to reposition for a killing angle.
[concept] lore: Born in the humid warrens of the scaled folk, this monk perfects a reptilian martial art that turns its own hide and sinew into a weapon, seeking to prove its discipline against the soft-skinned world.
[reskin] donor: skirmisher-3 -> CR 5
[reskin] repair round 1: 1 defect(s) — name "Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear)
[reskin] row evicted for the cap: Traits/"Reptilian Reflexes" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "lizardfolk monk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] row evicted for the cap: Bonus Actions/"Fleet Agility" (chassis filler) leaves so "Patient Defense" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: monk — "lizardfolk monk": Stunning Strike (stunning-strike, rides Claw), Patient Defense (patient-defense)
[reskin] inline declared: "the monk" — the call's own answer (kind), built from the name
[reskin] inline form: "the monk" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "lizardfolk monk" -> has (descriptive), head
[reskin] extraction: 10 of 11 model clauses quote nothing the user typed and leave the record ("openstby stalking the perimeter", "using pack tactics to flank and probe", "lightning-fast unarmed strikes", …)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "After the monk strikes a foe, it flows backward out of reach along any path it likes, slipping past the reach of others as it goes; a creature whose guard it has already broken—wobbling from the monk's claw—cannot bring its weapon to bear as the monk withdraws, so the retreat itself is the killing angle being set." [rider/on_hit/movement] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] word match declined by the call: feint-slip, hook-rider, pounce, charge, charge-push, isolation, bolt-mark, affliction, contagion, disarm, throw-retrieve — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "After the monk strikes a foe, it flows backward out of reach along any path it likes, slipping past the reach of others as it goes; a creature whose guard it has already broken—wobbling from the monk's claw—cannot bring its weapon to bear as the monk withdraws, so the retreat itself is the killing angle being set." [rider/on_hit/movement] — the model found no template that holds it (offered: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, throw-retrieve, disarm, feint-slip)
[reskin] fallback respects the call: disarm left the shelf — the call declined it for this sheet
[reskin] value check: "Merciless Strike" EV 16.3 vs floor 8.8 (one attack of 2) — dice 35 → 21 (scaled down to the ceiling)
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The monk reads the tension in another's body and moves the instant it snaps—when a nearby enemy commits to a strike against it or its pack, the monk twists a half-step aside, and the attacker's overextension leaves it swinging at empty air and off balance." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "The monk reads the tension in another's body and moves the instant it snaps—when a nearby enemy commits to a strike against it or its pack, the monk twists a half-step aside, and the attacker's overextension leaves it swinging at empty air and off balance." [trait/on_being_hit/defense] — no template on the shelf shares a verb with the concept or the idea (offered: absorption, bloodied-burst, resonant-body, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] weapons answered: Claw = none; Spit = none
[reskin] weapon table: "Spit" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Draconic — the concept names the species; print's NPCs of it speak it
[reskin] multiattack replacement clause: It can replace one attack with a use of Merciless Strike.
[reskin] audit rename blocked — "Frozen Finish" claims an element "Merciless Strike" does not pay (Bludgeoning)
[reskin] species kit: Swim 30 ft. — the lizardfolk's
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Krennik Skullstandard — bands soft

**Concept:** name: Krennik Skullstandard | riding a worg

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Krennik Skullstandard | 4 (2014) | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 2–6.5, n=13)
- read: def 1 / off 4 → 2.5; sustained 20 (2 × War Spear); nova Ride-Down 22; dmg 28

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

Common

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Mounted Agility. As a bonus action, Krennik takes the Dash or Disengage action.
Skullbanner Glare (Bonus Action). One creature within 30 feet must make a DC 13 Wisdom saving throw. On a failed save, until the start of Krennik's next turn, the target has disadvantage on attack rolls against creatures other than Krennik.
Riposte (Reaction). When a creature within 5 feet of Krennik misses it with a melee attack roll, Krennik makes one War Spear attack against that creature.

Actions
Multiattack: Krennik makes two attacks: one with War Spear and one with Javelin.
War Spear: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) piercing damage and, if it is Medium or smaller, is knocked prone.
Javelin: Ranged Weapon Attack: +5 to hit, range 30/120 ft., one target. Hit: 7 (1d8 + 3) piercing damage.
Ride-Down (Recharge 5-6): Krennik moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Each such creature must make a DC 13 Strength saving throw, taking 22 (5d8) bludgeoning damage and being knocked prone on a failed save.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/War Spear — weapon spear
- Actions/Javelin — weapon javelin
- Actions/Ride-Down — the chassis
- Bonus Actions/Mounted Agility — the chassis
- Bonus Actions/Skullbanner Glare — template aggro-curse; library draw (seed unstamped); binds the GM's words: mark
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "riding a worg"

**Engine trace**

```
[route] skirmisher-mounted type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] name: "Krennik Skullstandard" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: mounted→style ✓ ("riding a worg")
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/bestial mind=sapient style=mounted energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Krennik Skullstandard"
[concept] mechanics: none claimed
[concept] signature elements: a mounted rider who wheels and charges [behavior] | a worg mount that fights alongside him [body] | a skull-topped standard [object]
[concept] identity: Krennik Skullstandard opens by driving his worg in a straight-line ride-down, spear lowered, aiming to trample and carry past the front rank. Each round after, he wheels the beast to set up another charge, using short withdrawals to avoid being pinned, and he fights to the death once bloodied rather than abandoning his mount — the worg's ferocity and his own stubborn cruelty hold him in the fight even as he bleeds.
[concept] lore: A border-raid standard-bearer whose warband was broken and scattered, Krennik now rides a half-starved worg along the old trade road, taking skulls to rebuild his reputation one terrified caravan at a time.
[reskin] the concept outranks the alias: the Worg is a Fey and the concept reads Humanoid — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] nova capped: "Trampling Rush" 24 → 22 (the chassis nova obeys the cap: 22 at CR 4)
[reskin] donor: skirmisher-3-mounted -> CR 4 (invented — no printed peer)
[reskin] implied class kept: "fighter" on the GM's own words "riding a worg" — the key table found none
[reskin] row evicted for the cap: Traits/"Wheeling Rider" (chassis filler) leaves so "Riposte" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: fighter — "riding a worg": Riposte (riposte)
[reskin] proper noun: "Krennik Skullstandard" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Krennik" — the call's own answer (person), built from the name
[reskin] inline form: "Krennik" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Krennik Skullstandard — riding a worg" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "Krennik drives the butt of his skull-topped standard into the ground and lets the torn banner snap and shriek in the wind, cowing beasts and breaking nerve. Whenever his worg tramples or knocks a creature sprawling, the standard dips toward the fallen foe and the skulls rattle, cowing it so that Krennik's next pass has an easier mark." [bonus_action/save/condition] — menu: rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating (+ shelf: condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, snap-shot, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] value check: "Skullbanner Cow" EV 3 vs floor 1.6 (a bonus action (free)) — worth the trade
[reskin] signature template: aggro-curse -> Bonus Actions/"Skullbanner Cow" ("The standard dips toward the fallen foe and the skulls rattle, cowing it so that [verb: mark:idea]")
[reskin] signature idea (trait): "The worg is half-starved and savage, and pain only makes it hunt harder — every wound Krennik's mount takes and every drop of blood spilled on the road whips the beast into a faster, more reckless frenzy." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] word match declined by the call: bloodied-fury, berserk — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The worg is half-starved and savage, and pain only makes it hunt harder — every wound Krennik's mount takes and every drop of blood spilled on the road whips the beast into a faster, more reckless frenzy." [trait/on_being_hit/movement] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, bloodied-fury, faultless-tracker, uncanny-sense, berserk)
[reskin] weapons answered: War Spear = spear; Javelin = javelin; Ride-Down = none
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] chassis nova: "Ride-Down (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] audit rename: "Skullbanner Cow" -> "Skullbanner Glare"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Scarred Sellsword — bands soft

**Concept:** a sellsword who hurls a handaxe and closes with a shortsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Scarred Sellsword | 5 (2014) | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 3.5 (print at 5 reads 2.5–9.5, n=25)
- **dropped clause:** "hurls a handaxe"
- read: def 3 / off 4 → 3.5; sustained 32 (2 × Shortsword); nova none; dmg 32

```
Scarred Sellsword
Medium humanoid, neutral
Armor Class

15 (chain shirt)

Hit Points: 

97 (15d8 + 30)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

16 (+3)

	

14 (+2)

	

10 (+0)

	

11 (+0)

	

10 (+0)

Skills: 

Perception +3, Stealth +6

Saving Throws: 

DEX +6

Senses: 

passive Perception 13

Languages: 

Common plus one other language

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Riposte (Reaction). When a creature within 5 feet of the sellsword misses it with a melee attack roll, the sellsword makes one Shortsword attack against that creature.

Actions
Multiattack: The sellsword makes two attacks: one with its Shortsword and one with its Handaxe.
Shortsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) piercing damage, and the sellsword has advantage on its next attack roll against the target before the end of its next turn.
Handaxe: Ranged Weapon Attack: +6 to hit, range 20/60 ft., one target. Hit: 12 (2d8 + 3) slashing damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Shortsword — authored for this sheet; a named part; a declared feature; the GM's clause "closes with a shortsword"; weapon shortsword
- Actions/Handaxe — print's own row; weapon handaxe
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "a sellsword"

**Engine trace**

```
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-hurler: ✓ ("hurls a handaxe") | skirmisher-hurler: key "hurls" (class verb)
[concept] hints: hurler→style ✓ ("hurls a handaxe and closes")
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/bestial mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: hurled handaxe before closing [behavior] | shortsword follow-up on the rush [object] | veteran who cuts and runs when bloodied [behavior]
[concept] identity: A scarred sellsword who opens with a hurled handaxe to stagger a mark, then sprints in behind the throw to finish with a shortsword before the target recovers footing. Every round it works the gap, backing out to lob steel again whenever the blade gets tied up, and it will cut and run once badly bloodied — but only after dragging a wounded foe down with it.
[concept] lore: A veteran of losing companies, it sells its axe-arm to whoever pays and fights only as long as the contract stays worth its hide.
[reskin] print canon route: "a sellsword who hurls a handaxe and closes with a shortsword" is the Warrior Veteran, a bow-user — the hurler seat stands down for the plain line
[reskin] print canon array: STR 16, DEX 16, CON 14, INT 10, WIS 11, CHA 10 — the Warrior Veteran's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 5
[reskin] style unserved: "hurler" has no skirmisher line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] print canon: "a sellsword who hurls a handaxe and closes with a shortsword" heads on the Warrior Veteran — print's rows ride along; the seat stays
[reskin] named parts: Shortsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] row evicted for the cap: Traits/"Work the Gap" (chassis filler) leaves so "Riposte" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: fighter — "a sellsword": Riposte (riposte)
[reskin] inline declared: "the sellsword" — the call's own answer (kind), built from the name; the rules would have said "Sellsword"
[reskin] inline on kit rows: "Sellsword" -> "the sellsword"
[reskin] inline form: "the sellsword" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a sellsword" -> has (descriptive), head | "hurls a handaxe" -> has (mechanical) [asked: attack] | "closes with a shortsword" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the sellsword's thrown handaxe strikes a mark, the veteran is already moving — it immediately slips toward that foe without spending its own turn, closing the ground the throw opened. This rush only works against a target the axe actually hit, and only so far in a single fight before its legs give out from the effort." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot)
[reskin] signature bound to the concept's verb: action — thrown-burst-seed (hurl)
[reskin] word match declined by the call: throw-retrieve, trample, bolt-mark, delayed-brand, hook-rider — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown thrown-burst-seed, which the GM's words keyed
[reskin] key match declined: action — "thrown-burst-seed" was ranked first on the call's own menu for hurl, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the sellsword's thrown handaxe strikes a mark, the veteran is already moving — it immediately slips toward that foe without spending its own turn, closing the ground the throw opened. This rush only works against a target the axe actually hit, and only so far in a single fight before its legs give out from the effort." [rider/on_hit/movement] — the model found no template that holds it (offered: thrown-burst-seed, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, rampage, trample, throw-retrieve, delayed-brand, aggro-curse, feint-slip)
[reskin] fallback respects the call: thrown-burst-seed left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "a sellsword who hurls a handaxe and closes with a shortsword" heads on the Warrior Veteran and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The sellsword fights as long as the contract is worth its hide, but once it is badly bloodied it turns to flee — and it drags a wounded enemy down with it, lashing out at the most hurt foe nearby as it breaks away, then cutting and running." [trait/always/damage] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The sellsword fights as long as the contract is worth its hide, but once it is badly bloodied it turns to flee — and it drags a wounded enemy down with it, lashing out at the most hurt foe nearby as it breaks away, then cutting and running." [trait/always/damage] — the model found no template that holds it (offered: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] weapons answered: Shortsword = shortsword; Handaxe = handaxe; Staggering Throw = none
[reskin] weapon table: "Handaxe" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Warrior Veteran's
[reskin] print canon yields: "Handaxe" keeps its handaxe — the GM typed it; the Warrior Veteran's Heavy Crossbow prices the row but does not replace the weapon
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Warrior Veteran's
[reskin] multiattack re-read — "Handaxe" joins the combination; "The sellsword makes two attacks, using Shortsword or Handaxe in any combination."
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Brother Halric — bands soft

**Concept:** name: Brother Halric | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Brother Halric | 3 (2014) | caster-2-warpriest | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.625 (print at 3 reads 0.125–6.5, n=23)
- read: def 1/4 / off 3 → 1.625; sustained 22 (2 × Mace); nova none; dmg 22

```
Brother Halric
Medium humanoid, lawful neutral
Armor Class

11 (leather)

Hit Points: 

60 (11d8 + 11)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


14 (+2)

	

10 (+0)

	

13 (+1)

	

11 (+0)

	

16 (+3)

	

13 (+1)

Skills: 

Perception +5, Religion +4

Saving Throws: 

WIS +5

Damage Resistances: 

fire

Senses: 

passive Perception 15

Languages: 

Common

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Divine Aid (3/Day). As a bonus action, Halric casts bless, dispel magic, healing word, or lesser restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Halric makes two attacks: one with Mace and one with Sanctified Flame. It can replace one attack with a use of Lash of Censure.
Mace: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 11 (2d8 + 2) bludgeoning damage.
Sanctified Flame: Ranged Weapon Attack: +4 to hit, range 60 ft., one target. Hit: 9 (2d6 + 2) fire damage.
Spellcasting: Halric casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 13, +5 to hit with spell attacks): -

At will: light

1/day each: guiding bolt, burning hands, wall of fire
Lash of Censure: One creature within 60 feet of Halric must succeed on a DC 13 Dexterity saving throw or be restrained until the end of Halric's next turn.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Mace — weapon mace
- Actions/Sanctified Flame — the chassis
- Actions/Spellcasting — the chassis
- Actions/Lash of Censure — library seed snare-bolt
- Bonus Actions/Divine Aid — cleric kit; the GM's clause "brother halric"

**Engine trace**

```
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "Brother Halric" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("Brother Halric") | caster-warpriest: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid themes=armed/grave mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Brother Halric"
[concept] mechanics: none claimed
[concept] signature elements: iron-shod mace trailing holy fire [object] | war-prayers chanted aloud as battle rites [behavior] | refusal to yield while the faithful stand [behavior]
[concept] identity: Brother Halric opens by planting himself in the doorway and calling down a war-prayer, then wades forward with a heavy mace whose every swing trails smoldering sanctity; he never leaves the wounded behind and never retreats from the unholy, fighting to the death with the calm certainty of a man who has already been judged and found worthy.
[concept] lore: Once a battlefield chaplain of a crusading order, Halric was burned with his congregation and rose again as iron-shod ash held together by his last unfinished benediction, still seeking the heretics who lit the fire.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] donor: caster-2-warpriest -> CR 3
[reskin] repair round 1: 1 defect(s) — "Sanctified Flame" deals Fire on a Humanoid whose concept names no Fire — a name is not a warrant; use a physical type
[reskin] implied class kept: "cleric" on the GM's own words "brother halric" — the key table found none
[reskin] class kit: cleric — "brother halric": Divine Aid (3/Day) (Priest/Divine Aid)
[reskin] proper noun: "Brother Halric" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Halric" — the call's own answer (person), built from the name; the rules would have said "the brother"
[reskin] inline on kit rows: "the brother" -> "Halric"
[reskin] inline form: "Halric" — the model's own reading of the name
[reskin] energy rider withheld: Fire on a Humanoid with no Fire in the concept's own words
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Brother Halric" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Halric plants his feet and chants the old war-prayer aloud, the words he never finished before the fire. Every ally who can hear the chant finds their aim guided and their wounds sealing a little as the prayer names them; enemies who hear it instead feel the words burning against them and are drawn to strike at him rather than the wounded he stands over. The chant only holds while he keeps it up —" [trait/start_of_turn/condition] — menu: warded-mending (+ shelf: seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] word match declined by the call: warded-mending, seal, pacify, rally — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Halric plants his feet and chants the old war-prayer aloud, the words he never finished before the fire. Every ally who can hear the chant finds their aim guided and their wounds sealing a little as the prayer names them; enemies who hear it instead feel the words burning against them and are drawn to strike at him rather than the wounded he stands over. The chant only holds while he keeps it up —" [trait/start_of_turn/condition] — the model found no template that holds it (offered: warded-mending, seal, pacify, rally)
[reskin] fallback respects the call: rally, seal, pacify left the shelf — the call declined them for this sheet
[reskin] value check: "Binding Lash" EV 6.1 vs floor 5.7 (one attack of 2) — worth the trade
[reskin] library seed drawn: snare-bolt -> Actions/"Binding Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The iron-shod mace never cools; whatever it strikes keeps smoldering with sanctity for a moment. Anyone it hits is left marked and burning, and the next thing that happens to that mark — whether another blow of his, his flame, or a prayer landing on them — bites deeper because the fire has already opened them up." [trait/always/damage] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The iron-shod mace never cools; whatever it strikes keeps smoldering with sanctity for a moment. Anyone it hits is left marked and burning, and the next thing that happens to that mark — whether another blow of his, his flame, or a prayer landing on them — bites deeper because the fire has already opened them up." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, warded-mending, resonant-body)
[reskin] weapons answered: Mace = mace; Sanctified Flame = none
[reskin] resistances derived: Fire
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Binding Lash.
[reskin] audit rename: "Binding Lash" -> "Lash of Censure"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Hydra — in the run

**Concept:** name: Hydra | whose stumps smoke instead of regrowing

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hydra | 8 (2014) | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

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
Multiple Heads. The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead. The hydra regains 20 hit points when it grows new heads.
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
!! Failed to load resource: the server responded with a status of 500 (OK)
!! Error generating response: Error: HTTP 500: 
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:266:25)
    at async routeOn (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792366287307:920:19)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792366287307:959:26)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792366287307:656:5)
!! [route] call failed: HTTP 500: 
[route] nothing routed — the call failed; random artillery plain line ships
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792366287307:970:31)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792366287307:656:5)
!! ⚠️ Circuit breaker opened for DeepSeek V4 Flash — generations run in degraded mode for 60 minutes
!! [concept] identity call failed — the routed line ships without prose: Failed to fetch
[concept] resolve: archetype=artillery type=? themes=none mind=? style=— energy=— mix=—
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("whose stumps smoke instead of regrowing") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] name: "Hydra" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/devouring mind=bestial style=regenerator energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Hydra"
[concept] mechanics: regeneration
[concept] signature elements: severed stumps that smoke instead of regrowing [body] | flesh that clots and reknits as fast as it is cut [body] | suffocating umbral smoke pouring from its wounds [aura]
[concept] identity: The smoking hydra is a brute that wades into the thick of a fight with a wall of snapping heads, trusting its reknitting flesh to soak the first blows while it seizes and tears. Every wound it takes seals shut in a hiss of hot smoke, and every head it loses leaves a blackened, smouldering stump rather than a fresh neck — so it fights all the more savagely as its own body dims and chokes, battering prey with bloodied jaws and suffocating them in the fumes rising from its cauterised wounds. Cornered or half-consumed, it does not retreat; it presses the assault, snarling through the smoke, as though the fire in its stumps is all that is left of its rage.
[concept] lore: A hydra that swallowed a dying ember-drake's heart still heals every wound — but its severed necks no longer regrow flesh, only smoulder, so it seeks to bury its burning stumps in living prey before the smoke eats it whole.
[reskin] print canon route: the Hydra's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon route: the regenerator seat's organ leaves too — the Hydra has no Regeneration of its own
[reskin] print canon defenses: HP 136 -> 184, AC 14 -> 15 — the Hydra's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 20, INT 2, WIS 10, CHA 7 — the Hydra's at its own CR; attack +7 -> +8, DC 16 (print's)
[reskin] donor: brute-5 -> CR 8
[reskin] print canon: "Hydra — whose stumps smoke instead of regrowing" heads on the Hydra — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline by rule: "the hydra" — the call answered "the hydra" (kind), which the name does not support
[reskin] inline form: "the hydra" — the model's own reading of the name
[reskin] lacks asked: "instead of regrowing"
[reskin] clauses: "Hydra — whose stumps smoke instead of regrowing" -> LACKS (mechanical)
[reskin] signature idea (action): "The hydra drives one of its smouldering stumps down onto a foe and holds it there, grinding the burning black flesh into them. The victim is pinned and choking in the hot smoke pouring off the wound, and the hydra keeps them trapped in that gagging cloud as long as it can hold them down. If they tear free the stump is left raw and smoking worse, and the hydra lashes out harder in its pain." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, zone, zone-seed, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — zone, zone-seed (smoke)
[reskin] word match declined by the call: contagion, stunning-strike — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown zone, zone-seed, which the GM's words keyed
[reskin] key match declined: action — "zone" was ranked first on the call's own menu for smoke, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The hydra drives one of its smouldering stumps down onto a foe and holds it there, grinding the burning black flesh into them. The victim is pinned and choking in the hot smoke pouring off the wound, and the hydra keeps them trapped in that gagging cloud as long as it can hold them down. If they tear free the stump is left raw and smoking worse, and the hydra lashes out harder in its pain." [rider/on_hit/condition] — the model found no template that holds it (offered: zone, zone-seed, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge, herd, rampage, own-turn-punisher)
[reskin] fallback respects the call: zone, zone-seed left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "Hydra — whose stumps smoke instead of regrowing" heads on the Hydra and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Every time a head is severed the stump cauterises into a smoking ruin rather than regrowing, and the fumes billow out around the hydra, wracking anything close with a rasping, blinding cough. The more heads it has lost, the thicker the smoke and the more savage its remaining jaws become." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, gaze-aura, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — warded-mending (regrows)
[reskin] word match declined by the call: warded-mending — the key word does not mean the mechanic here
[reskin] trait declined: "Choking Stumps" — bound only on the idea's own words (fumes:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Bite = none
[reskin] speed by concept: added Swim 40 ft. — the concept's movement set decides
[reskin] print canon multiattack: "The hydra makes as many Bite attacks as it has heads." — the Hydra's own
[reskin] languages held: None stands — INT 2 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon defenses: immunities none -> Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious — the Hydra's own header lines
[reskin] print canon trait: Hold Breath — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Multiple Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Reactive Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] lacks clause: Traits/"Multiple Heads" keeps its blow, loses the regeneration — "Hydra — whose stumps smoke instead of regrowing"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Drowned Choir — in the run

**Concept:** a drowned cathedral choir that sings in one voice

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Drowned Choir | 10 (2014) | caster-8-binder | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 8 / off 10 → 9; sustained 63 (3 × Chorus); nova Swelling Hymn 21; dmg 63

```
Drowned Choir
Large undead, neutral evil
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

Swelling Hymn. The first time the drowned choir has half of its hit points or fewer in a fight, it releases a burst. Each creature within 20 feet of the drowned choir must make a DC 15 Constitution saving throw, taking 21 (6d6) necrotic damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also deafened until the end of its next turn.
Captain's Charm. As a bonus action, the drowned choir targets one creature it can see within 30 feet of it. That creature must succeed on a DC 15 Wisdom saving throw or be charmed by the drowned choir until the start of the drowned choir's next turn.

Actions
Multiattack: The drowned choir makes three attacks, using Chorus or Hymnal Bolt. It can replace one attack with a use of Descant.
Chorus: Melee Spell Attack: +7 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) necrotic damage.
Hymnal Bolt: Ranged Spell Attack: +7 to hit, range 80/320 ft., one target. Hit: 16 (3d8 + 3) necrotic damage.
Descant: One creature within 60 feet must make a DC 15 Constitution saving throw, taking 18 (4d8) necrotic damage on a failed save. On a failed save, the target is also deafened until the end of its next turn.
Spellcasting: The drowned choir casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 15): -

At will: detect magic, mage hand

1/day each: fear, hypnotic pattern
Creeping Dread: One creature within 60 feet must succeed on a DC 15 Wisdom saving throw or be frightened of the drowned choir until the end of its next turn. If the target was already frightened by this ability, it also takes 21 (6d6) necrotic damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Chorus — the chassis
- Actions/Hymnal Bolt — the chassis
- Actions/Descant — the chassis
- Actions/Spellcasting — the chassis
- Actions/Creeping Dread — library seed escalating-dread
- Bonus Actions/Captain's Charm — bard kit; the GM's clause "sings in one voice"
- Traits/Swelling Hymn — template bloodied-burst; library draw (seed unstamped); binds the GM's words: wounded

**Engine trace**

```
[route] caster-binder (controller) type=Undead mechanics=aura — casts: implied by the kind — "sings in one voice" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: ✓ ("sings in one voice") | lurker-phantom: the call read "drowned" as not meaning that mechanic here — no override | caster-binder stands: every key that would override it was read as a figure of speech | caster-binder: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Undead themes=grave/aquatic mind=sapient style=binder energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: singing as one voice, harmonies that steal action [behavior] | a drowned choir of many bodies bound into one [body] | the sunken cathedral hymn that draws listeners down [aura]
[concept] identity: The Choir opens by raising one seamless hymn that drags at the minds of all who hear it, threading confusion and dread through the air before a single note is spent on harm. Each round thereafter it layers harmonies that steal actions — a verse to stun, a descant to lure a listener closer, a low pedal tone to pin a foe in place — while drifting through flooded nave and nave as a single vast corpse-voice. It does not flee; wounded, it simply sings louder, gathering the drowned faithful in its chorus until nothing near can hear its own thoughts.
[concept] lore: When the cathedral sank beneath the flood, the choir kept singing to hold back the dark water — and the dark water kept them, so now the drowned congregation sings in one borrowed voice, dragging the living down to join the verse.
[reskin] donor: caster-8-binder -> CR 10
[reskin] implied class kept: "bard" on the GM's own words "sings in one voice" — the key table found none
[reskin] class kit: bard — "sings in one voice": Captain's Charm (Pirate Captain/Captain's Charm); Bolstering Cry yielded to print's row cap 6
[reskin] inline declared: "the drowned choir" — the call's own answer (kind), built from the name; the rules would have said "Choir"
[reskin] inline on kit rows: "Choir" -> "the drowned choir"
[reskin] inline form: "the drowned choir" — the model's own reading of the name
[reskin] control spell gated to daily — Fear (level 3 control at will is print's CR 13+ shape; at CR 10 it is 1/Day)
[reskin] spell DC coherence: DC 16 -> 15 off Charisma 16 (the stat makes the attack rolls)
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + Charisma's 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a drowned cathedral choir" -> has (descriptive), head | "sings in one voice" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The choir bends its many throats around a single wounded listener and sings that one soul's note back at it, so the target hears its own voice in the hymn and cannot tell which thoughts are its own. Until the choir's next turn the target must keep its distance from the choir or the verse tightens and drags it stumbling back toward the water, and any ally who tries to call out to it hears only the " [action/save/movement] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The choir bends its many throats around a single wounded listener and sings that one soul's note back at it, so the target hears its own voice in the hymn and cannot tell which thoughts are its own. Until the choir's next turn the target must keep its distance from the choir or the verse tightens and drags it stumbling back toward the water, and any ally who tries to call out to it hears only the " [action/save/movement] — the model found no template that holds it (offered: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground, rally, bolt-drag)
[reskin] value check: "Creeping Dread" EV 14.3 vs floor 10.4 (one attack of 3) — dice 10 → 21
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The drowned faithful answer when the hymn is sung: whenever the choir is wounded, more of the sunken congregation rise from the water and join the verse, swelling the chorus until the sound of it is thick enough to smother thought. Those it has already deafened or lured hear the swelling as their own heartbeat and cannot shake it." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — noxious-aura, mimicry (voices)
[reskin] word match declined by the call: noxious-aura, mimicry — the key word does not mean the mechanic here
[reskin] signature template (trait): bloodied-burst -> Traits/"Swelling Hymn" ("whenever the choir is wounded, more of the sunken congregation rise and swell th [verb: wounded:idea]")
[reskin] weapons answered: Chorus = none; Hymnal Bolt = none; Descant = none
[reskin] weapon declined: "Hymnal Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Hymnal Bolt" — a launcher, never thrown, range 80/320
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] multiattack replacement clause: It can replace one attack with a use of Descant.
audit finding below confidence gate: Creeping Dread Adjacent parentheses and colon formatting differ from the block's other save entries (Descant uses a space after the colon and no trailing space before the target clause), producing inconsistent statblock formatting.
audit finding below confidence gate: Captain's Charm The entry is listed under Bonus Actions but requires no action cost wording such as 'The drowned choir targets...', leaving the GM to infer the activation verb that other entries provide implicitly through their save phrasing; the sentence is a fragment with no subject or verb.
[reskin] audit rewrite blocked — "Swelling Hymn" is engine-authored chassis text
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Vampire — in the run

**Concept:** name: Vampire | who keeps a garden of thorns

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vampire | 13 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

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

Athletics +9, Perception +7

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

Legendary Resistance. If the vampire fails a saving throw, it can choose to succeed instead.
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
Multiattack: The vampire makes two Grave Strike attacks. It can replace one attack with a use of Vitality Leech.
Grave Strike: Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) by one of two hands.
Vitality Leech: One creature within 30 feet of the vampire must make a DC 17 Constitution saving throw, taking 38 (11d6) necrotic damage on a failed save, or half as much damage on a successful one. The vampire regains hit points equal to half the damage dealt.
Bite (Bat or Vampire Form Only): One creature within 5 feet of the vampire that is willing or that is grappled, incapacitated, or restrained must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) piercing damage plus 13 (3d8) necrotic damage on a failed save. The target's hit point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a Vampire Spawn under the vampire's control.
```

**Where each row came from**

- Traits/Legendary Resistance — print's own row
- Traits/Misty Escape — print's own row
- Traits/Spider Climb — print's own row
- Traits/Vampire Weakness — print's own row
- Actions/Multiattack — the chassis
- Actions/Grave Strike — print's row, renamed
- Actions/Vitality Leech — library seed drain; binds the GM's words: vampire
- Actions/Bite — print's own row
- Bonus Actions/Shape-Shift — print's own row
- Bonus Actions/Charm — print's own row

**Engine trace**

```
[route] caster-binder (controller) type=Undead mechanics=snare — casts: implied by the kind — "Vampire" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: ✓ ("keeps a garden of thorns") | caster-binder: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "radiant" answers a question nobody asked
[concept] name: "Vampire" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=caster type=Undead themes=grave/verdant mind=sapient style=binder energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Vampire"
[concept] mechanics: snare
[concept] signature elements: binding thorn-snares that steal a victim's movement [behavior] | a coffin-hedge of bloody roses grown from gravesoil [body] | curses that wither a hero's next action [aura]
[concept] identity: A vampire who tends a living thorn-garden, she opens by seeding a wall of bloody briars between herself and the party, penning them in shadows she can step through. Every round after, she prunes and binds: snare-thorns erupt under the most dangerous foe while her curse-weaving fingers steal a victim's next action, and she never closes to melee unless a victim is already tangled and bleeding. Haughty and patient, she retreats into her hedge when bloodied, letting the garden bleed with her rather than stand and die.
[concept] lore: She was a gardener's widow who buried her heart in the hedge she planted over her husband's grave, and now she feeds the thorns with the blood of trespassers who wander her moonlit bloom.
[reskin] print canon route: the Vampire's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Vampire is not a caster first and keys STR 18 over DEX 18 — it casts no spells — the caster family stands down for the plain defender line
[reskin] print canon defenses: HP 184 -> 195, AC 21 -> 16 — the Vampire's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 18, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's at its own CR; attack +8 -> +9, DC 17 (print's)
[reskin] donor: defender-5 -> CR 13
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "Vampire — who keeps a garden of thorns" heads on the Vampire — print's rows ride along; the seat stays
[reskin] ranged row off: "Hybrid Attack" keeps its melee half only
[reskin] inline by rule: "the vampire" — the call answered "the vampire" (kind), which the name does not support
[reskin] inline form: "the vampire" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 17 (8 + PB 5 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Vampire —" -> has (descriptive), head | "keeps a garden of thorns" -> has (descriptive)
[reskin] signature idea (action): "She drives thorn-stakes from the ground beneath one foe she can see, snaring whichever of its limbs bear its weapons or spells — the vines knot around arms, claws, and casting hands, and refuse to let go. So long as it stays snared the victim can barely move from where it stands, and its own blood feeds the garden each time it tears free or struggles; the snare loosens only if she is gravely hurt " [action/save/condition] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, drain (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — drain (vampire)
[reskin] pick kept on the GM's own words: action — "obstacle-pull" has no key-table verb, but the call quotes "keeps a garden of thorns" from the description
[reskin] value check: "Thorn Snare" EV 5.2 vs floor 19.8 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Thorn Snare" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vitality Leech" EV 29.5 vs floor 19.8 (one attack of 2) — added Success: Half; dice 24 → 38
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Blood spilled on her garden answers her: whenever a bleeding or snared creature is hurt near her hedge, the roses drink and the thorns surge outward, dragging every tangled or wounded foe a step closer to the briars. If she is gravely wounded she sinks back into the hedge, and the garden bleeds in her place until she chooses to emerge." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (thorns)
[reskin] word match declined by the call: heated-body, uncanny-sense, bloodied-burst, bloodied-fury, adhesive, bound, terrain-walk, noxious-aura, false-appearance — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown heated-body, which the GM's words keyed
[reskin] key match declined: trait — "heated-body" was ranked first on the call's own menu for thorns, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Blood spilled on her garden answers her: whenever a bleeding or snared creature is hurt near her hedge, the roses drink and the thorns surge outward, dragging every tangled or wounded foe a step closer to the briars. If she is gravely wounded she sinks back into the hedge, and the garden bleeds in her place until she chooses to emerge." [trait/always/movement] — the model found no template that holds it (offered: heated-body, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst, absorption)
[reskin] weapons answered: Thorn Claw = none; Cursed Caress = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Vampire's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "the languages it knew in life" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Thorn Claw" -> "Grave Strike" — the Vampire's own row
[reskin] print canon rows: Cursed Caress leave — the Vampire has one melee row (Grave Strike), and Multiattack reads print's
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Vitality Leech.
audit finding below confidence gate: Vampire Weakness The list item begins with a lowercase word after the hyphen in a sentence-start position; the defined weakness label is followed by a lowercase continuation, which is a grammar/capitalization defect under format integrity.
[reskin] audit rewrite blocked — "Bite (Bat or Vampire Form Only)" is engine-authored chassis text
[reskin] escape dc: Grave Strike → DC 17 (8 + PB + STR; a late row wore another number)
[reskin] 2014 conversion: one lint-gated call — both printings saved
(enrichment did not settle within 20s — moving on)
```


---


### Ossein Heliarch — in the run

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ossein Heliarch | 20 (2014) | caster-21 | ok | ok | ok | FAIL: ko-ungated | ok | ok | ok | ok | ok |

- gates · fail · ko-ungated: Actions/Paralyzing Touch: Paralyzed at will on each creature
- gates · soft · rider-no-save: Actions/Paralyzing Touch: a Paralyzed rider on every hit with no save
- read: def 19 / off 20 → 19.5; sustained 126 (3 × Eldritch Burst + legendary Deathly Teleport); nova none; dmg 126

```
Ossein Heliarch
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

Arcana +11, Perception +8

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

Legendary Resistance (3/Day). If the heliarch fails a saving throw, it can choose to succeed instead.
Spirit Jar. If destroyed, the heliarch reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the heliarch's lair.
Protective Magic (3/Day) (Reaction). When the heliarch is hit by an attack, the heliarch casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: The heliarch makes three attacks, using Eldritch Burst or Paralyzing Touch. It can replace one attack with a use of Spellcasting to cast Bestow Curse.
Eldritch Burst: Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 31 (4d12 + 5) force damage.
Paralyzing Touch: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target is paralyzed until the start of the heliarch's next turn.
Spellcasting: The heliarch casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 19): -

At will: detect magic, detect thoughts, dispel magic, fireball, invisibility, lightning bolt, mage hand, prestidigitation

2/day each: animate dead, dimension door, plane shift

1/day each: chain lightning, finger of death, power word kill, scrying
Legendary Actions

The heliarch can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The heliarch regains spent legendary actions at the start of its turn.

Deathly Teleport: The heliarch teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an undead within 20 feet of the heliarch must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one. Whether it succeeds or fails, the heliarch can't take this action again until the start of its next turn.
Frightening Gaze: The heliarch casts fear, using the same spellcasting ability as Spellcasting. The heliarch can't take this action again until the start of its next turn.
```

**Where each row came from**

- Traits/Legendary Resistance — the chassis
- Traits/Spirit Jar — print's own row
- Actions/Multiattack — the chassis
- Actions/Eldritch Burst — print's own row, renamed
- Actions/Paralyzing Touch — print's row, renamed
- Actions/Spellcasting — print's own row
- Reactions/Protective Magic — mage kit; the GM's clause "archlich"
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Deathly Teleport — print's own row
- Legendary Actions/Disrupt Life — print's own row
- Legendary Actions/Frightening Gaze — print's own row

**Engine trace**

```
[route] caster (artillery) type=Undead mechanics=aura — casts: implied by the kind — "archlich" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("archlich") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Undead themes=grave/arcane mind=sapient style=— energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: a throne woven from the dead sitting atop a sun of fused bone [body] | annihilating bolt-casting from its high seat [behavior] | the whirling ossuary that turns and flings its own bones [aura]
[concept] identity: The archlich does not rise to meet intruders — it lets them climb the drifting ossuary-sun, its bone throne slowly turning a face of fused skulls and ribs toward them, and answers the first hostile move with a single annihilating bolt from across the cratered surface. Every round after that it keeps the throne between itself and the living, pivoting the great sphere to shear its own bone-plates into shrapnel and hurling the splinters out as a devouring volley, all while it picks apart the party's strongest mind with muttered words older than the sun it sits on. When finally bloodied it does not flee — it sets the whole ossuary spinning to fling lesser bones free and fight to the last, coldly certain that the dead have nothing left to lose.
[concept] lore: An archlich who refused the grave of dust and instead spent its final centuries welding the bones of a fallen age into a small sun around its throne, so that it might watch over the still-living dead from a height undying eyes cannot reach.
[reskin] print canon pb: print's +12 on PB +7 reads +11 on this sheet's PB +6; DCs follow
[reskin] print canon defenses: HP 300 -> 315, AC 19 -> 20 — the Lich's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 21, WIS 14, CHA 16 — the Lich's at its own CR; attack +10 -> +11, DC 19 (print's, on this sheet's PB)
[reskin] donor: caster-21 -> CR 20
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Claw" is an anatomical name dealing Slashing on a mind-driven attacker (the attack bonus keys to INT) — print pays physical damage on mental strikes with implement names (the Dryad's Vine Lash, the Rakshasa's Cursed Touch) or carries a magical type (the Mage's Arcane Burst deals Force); rename to a conjured implement or pick a magical type
[reskin] mental-anatomy stamp: "Claw" Slashing -> Necrotic (repair exhausted; the engine picks the magical type)
[reskin] implied class kept: "mage" on the GM's own words "archlich" — the key table found none
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "archlich": nothing to add — the sheet already answers it
[reskin] inline declared: "the heliarch" — the call's own answer (kind), built from the name
[reskin] inline form: "the heliarch" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an archlich enthroned on a sun of bone" -> has (descriptive), head
[reskin] menu pruned: action — thrown-burst-seed, phase-slip, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The heliarch draws a hunter's bead on a single creature it can see and speaks a word too old to hear, and the bone sun answers with one thin, unerring lance of cold light that leaps the whole battlefield. The beam crosses any distance and ignores cover, striking that one quarry alone — it feels the bolt arrive inside its own chest and the wound does not close while the heliarch's gaze remains on i" [rider/on_hit/damage] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: gaze-single, snare, condition-payoff, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, delayed-brand, curse-debt, zone-seed, reveal, lay-on-hands, aggro-curse, self-invisibility, rally)
[reskin] word match declined by the call: bolt-mark, lure, bolt-restrain, bolt-drag, gaze-single, obstacle-pull, snare-bolt, slow-bolt, sensory-strike, reveal — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The heliarch draws a hunter's bead on a single creature it can see and speaks a word too old to hear, and the bone sun answers with one thin, unerring lance of cold light that leaps the whole battlefield. The beam crosses any distance and ignores cover, striking that one quarry alone — it feels the bolt arrive inside its own chest and the wound does not close while the heliarch's gaze remains on i" [rider/on_hit/damage] — the model found no template that holds it (offered: bolt-restrain, bolt-drag, bolt-mark, lure, gaze-single, obstacle-pull, snare-bolt, slow-bolt, sensory-strike, reveal)
[reskin] fallback respects the call: snare-bolt, gaze-single, slow-bolt, sensory-strike left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "an archlich enthroned on a sun of bone" heads on the Lich and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The bone sun itself is the throne's armor: any blow struck against the heliarch draws the mass of the ossuary into the wound, and the attacker's own warmth is pulled out through the contact to feed the dead star. Whoever lands a hit finds their limbs stiffening with cold and the heliarch's ruined frame knitting as they bleed their heat into it." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] trait declined: "Ossuary Retort" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either
[reskin] weapons answered: Bone Shard = none; Claw = none
[reskin] chassis nova: "Shardfall (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] speed by concept: dropped Fly 30 ft. (hover) — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon size: Huge -> Medium — the Lich's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon attack: "Bone Shard" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon attack: "Claw" -> "Paralyzing Touch" — the Lich's own row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] resistances derived withheld: print's Lich owns the line (Cold, Lightning)
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Shardfall (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Spellcasting to cast *Bestow Curse*.
[reskin] audit rewrite blocked — "Frightening Gaze" is engine-authored chassis text
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Ancient Gold Dragon — in the run

**Concept:** name: Ancient Gold Dragon | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ancient Gold Dragon | 24 (2014) | dragon-22 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

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

Banish: One creature the gold dragon can see within 120 feet of it must make a DC 24 Charisma saving throw. On a failed save, it takes 24 (7d6) force damage, and it is incapacitated and transported to a harmless demiplane until the start of the gold dragon's next turn, at which point it reappears in an unoccupied space of the gold dragon's choice within 120 feet of the gold dragon. Whether it succeeds or fails, the gold dragon can't take this action again until the start of its next turn.
Guiding Light: The gold dragon uses Spellcasting to cast guiding bolt (cast at 4th level).
Pounce: The gold dragon moves up to half its speed, and it makes one Rend attack.
```

**Where each row came from**

- Traits/Legendary Resistance — the chassis
- Traits/Amphibious — print's own row
- Actions/Multiattack — the chassis
- Actions/Rend — print's row, renamed
- Actions/Spellcasting — print's own row
- Actions/Fire Breath — print's own row
- Actions/Weakening Breath — print's own row
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Banish — print's own row
- Legendary Actions/Guiding Light — print's own row
- Legendary Actions/Pounce — print's own row

**Engine trace**

```
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | dragon: ✓ ("Ancient Gold Dragon") | dragon: key "dragon" (class body)
[concept] hints: dragon→body ✓ ("Ancient Gold Dragon named creature")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/terror mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Ancient Gold Dragon"
[concept] mechanics: breath
[concept] signature elements: searing molten breath [behavior] | gilded scales and enormous body [body] | terror of a living myth [aura]
[concept] identity: An ancient gold dragon opens with a roar that turns lesser foes to stone-still terror, then descends in a blaze of molten radiance — its breath scouring a battlefield into glass while it chooses its moment to land with claws and jaws. Every round it pairs a sweeping breath blast with crushing melee, preferring to break the strongest foe's nerve before committing its weight. It fights with the patient arrogance of a being that has outlived kingdoms: it toys with prey it judges unworthy and fights to annihilation only when its hoard, lair, or pride is truly threatened.
[concept] lore: Hatched before mortal calendars were carved, this wyrm lairs atop a mountain of gold that is both hoard and armor, and it descends only to remind the world that its patience and its fire are equally absolute.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] print canon defenses: HP 487 -> 546, AC 20 -> 22 — the Ancient Gold Dragon's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 14, CON 29, INT 18, WIS 17, CHA 28 — the Ancient Gold Dragon's at its own CR; attack +11 -> +17, DC 24 (print's)
[reskin] donor: dragon-22 -> CR 24
[reskin] print canon: "Ancient Gold Dragon" is a print creature — the seats stand down; print's own rows are the composition
[reskin] name_element answered: Ancient Gold Dragon = literal; Molten Breath = literal
[reskin] repair round 1: 1 defect(s) — name "Rend and Seize" promises the Grappled condition but the row never delivers it — name what the rule does, or drop the claim word
[reskin] inline by rule: "the gold dragon" — the call answered "the gold dragon" (kind), which the name does not support
[reskin] inline form: "the gold dragon" — the model's own reading of the name
[reskin] spell DC coherence: DC 21 -> 24 off Charisma 28 (print's array stays)
[reskin] save dc derived: DC 21 -> 24 (8 + PB 7 + Charisma's 9) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Ancient Gold Dragon" -> has (descriptive), head
[reskin] weapons answered: Claw = none; Molten Breath = none
[reskin] chassis nova: "Molten Breath (Recharge 5-6)" — the dragon-22's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes fly, swim — the Ancient Gold Dragon's
[reskin] print canon senses: "blindsight 60 ft., darkvision 120 ft." — the Ancient Gold Dragon's
[reskin] speed by concept: added Swim 40 ft. — the concept's movement set decides
[reskin] print canon attack: "Claw" -> "Rend" — the Ancient Gold Dragon's own row
[reskin] print canon multiattack: "The gold dragon makes three Rend attacks. It can replace one attack with a use of (A) Spellcasting to cast *Guiding Bolt* (level 4 version) or (B) Weakening Breath." — the Ancient Gold Dragon's own
[reskin] element immunity: Fire (merged into the header write)
[reskin] dragon spell DC derived: 24 (8 + PB + Cha mod — the breath keeps the card DC)
[reskin] dragon mental save DC derived: "Terrifying Presence" -> 24 (the Frightful Presence class keys to Charisma)
[reskin] immunities stamped for type: Dragon -> Fire
[reskin] print canon trait: Amphibious — "Ancient Gold Dragon" is the Ancient Gold Dragon (print's own row)
[reskin] print canon legendary: Banish, Guiding Light, Pounce — the Ancient Gold Dragon's own kit stands where the chassis's stood
[reskin] print canon nova: "Molten Breath (Recharge 5-6)" leaves — at print's CR the Ancient Gold Dragon's own Fire Breath (Recharge 5-6) is the one breath, dice and all
[reskin] print canon row: Actions/Fire Breath (Recharge 5-6) — the Ancient Gold Dragon's own
[reskin] print canon row: Actions/Weakening Breath — the Ancient Gold Dragon's own
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
audit finding below confidence gate: Banish A failed save removes the target from play and the dragon chooses the return point, so the effect cannot strand a creature in a wall; the fixed return to an unoccupied space is the interior escape clause satisfying counterplay, but the 'harmless' demiplane and 'unoccupied space of the gold dragon's choice' is fully adjudicable. No defect.
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Goblin Boss — in the run

**Concept:** name: Goblin Boss | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Boss | 1 (2014) | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

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
- Actions/Scimitar — print's row, renamed; weapon scimitar
- Actions/Shortbow — print's own row, renamed; weapon shortbow
- Bonus Actions/Nimble Escape — print's own row

**Engine trace**

```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs?t=1792202639880:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792366287307:1413:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792366287307:1252:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792366287307:656:5)
!! [ENRICHMENT] Failed to enrich Owlbear: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs?t=1792202639880:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792366287307:1413:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792366287307:1252:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792366287307:656:5)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("Goblin Boss") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] name: the Name field "Goblin Boss" is the name — the model named none
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/grasping mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Goblin Boss"
[concept] mechanics: none claimed
[concept] signature elements: striking from hiding with advantage then vanishing [behavior] | wiry, springy goblin body built for darting and climbing [body] | a jagged blade kept close and low [object]
[concept] identity: The goblin boss opens by slipping out of cover — a hidden knife in the back of the loudest threat — then uses its springy, small frame to dart between hiding spots, striking only when it has an angle and vanishing before the retaliation lands. Every round it trades ground for a better ambush, herding the party toward its cringing underlings while it circles behind. Wounded and cornered, it does not fight to the death: it bolts for the nearest bolt-hole, hooting for its goblins to cover the retreat, and will happily abandon them to save its own hide.
[concept] lore: A goblin boss is the meanest, quickest survivor of a warren, and it keeps its crown by showing the tribe exactly who can strike first and slip away clean.
[reskin] print canon route: "Goblin Boss" is the Goblin Boss — the skulker seat stands down for the plain line
[reskin] print canon defenses: HP 26 -> 21, AC 13 -> 17 — the Goblin Boss's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 17 (chain shirt, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 10, DEX 15, CON 10, INT 10, WIS 8, CHA 10 — the Goblin Boss's at its own CR; attack +3 -> +4, DC 12 (print's)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] print canon: "Goblin Boss" is a print creature — the seats stand down; print's own rows are the composition
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] inline by rule: "the boss" — the call answered "the boss" (kind), which the name does not support
[reskin] inline form: "the boss" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 12 (8 + PB 2 + the sheet's best 2) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Goblin Boss" -> has (descriptive), head
[reskin] weapons answered: Knife = dagger; Sling = sling
[reskin] weapon table: "Sling" — a launcher, never thrown, range 30/120
[reskin] print canon modes: climb off — the Goblin Boss has no such mode and the words name none
[reskin] print canon speed: modes walk only — the Goblin Boss's
[reskin] print canon senses: "darkvision 60 ft." — the Goblin Boss's
[reskin] print canon type: Humanoid stays — the Goblin Boss is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon alignment: Neutral Evil -> Chaotic Neutral — the Goblin Boss's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Knife" -> "Scimitar" — the Goblin Boss's own row
[reskin] print canon multiattack: "The goblin makes two attacks, using Scimitar or Shortbow in any combination." — the Goblin Boss's own
[reskin] print canon attack: "Shortbow" is print's own row — +4, 5 (1d6 + 2), range 80/320 ft. (an exact body at print's CR)
[reskin] print canon attack: "Sling" -> "Shortbow" — the Goblin Boss's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Slippery" is the seat's, not the Goblin Boss's
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Boss's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Goblin Boss's Nimble Escape
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Black-Iron Sentinel — in the run

**Concept:** a sentinel of black iron, AC 20, Huge, speed 20 feet

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Black-Iron Sentinel | 11 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 9 / off 9 → 9; sustained 62 (2 × Iron Fist); nova none; dmg 62

```
Black-Iron Sentinel
Huge construct, lawful neutral
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

Common

Challenge

11 (7,200 XP)

Proficiency Bonus:

+4

Iron Retort. As a bonus action, the sentinel targets one creature within 5 feet of it that hit it with an attack roll since the end of the sentinel's last turn. The target takes 13 (3d8) bludgeoning damage.

Actions
Multiattack: The sentinel makes two Iron Fist attacks.
Iron Fist: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 31 (6d8 + 4) bludgeoning damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Iron Fist — the chassis
- Bonus Actions/Iron Retort — library seed own-turn-punisher

**Engine trace**

```
[route] defender type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-warden: ✓ ("a sentinel of black iron") | defender-warden -> defender: the concept's VERB outranks the noun (key "sentinel", class verb) | defender: key "sentinel" (class verb)
[concept] hints: warden→style ✗ ("routed onto defender template, but it is")
[concept] resolve: archetype=defender type=Construct themes=forged/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: immovable iron-bulwark stance [behavior] | shield-slam that punishes line-breakers [object] | black-iron chassis [body]
[concept] identity: A towering black-iron sentinel anchors itself on the battlefield like a wall of forged metal, interposing its great shield and daring foes to slip past. Each round it grinds forward only to re-plant, hammering anyone who tries to break its line with a shield-slam that drives them back, and it never retreats — its iron will holds until the last rivet is broken.
[concept] lore: Forged in a dead empire's foundry to guard a gate that no longer exists, the black-iron sentinel still stands its post, grinding forward to crush any who would cross the line it was built to hold.
[reskin] donor: defender-5 -> CR 11
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] ranged row off: "Hybrid Attack" keeps its melee half only
[reskin] inline declared: "the sentinel" — the call's own answer (kind), built from the name
[reskin] inline form: "the sentinel" — the model's own reading of the name
[reskin] save dc derived: DC 17 -> 16 (8 + PB 4 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a sentinel of black iron" -> has (descriptive), head | "AC 20" -> has (header) | "Huge" -> has (header) | "speed 20 feet" -> has (header)
[reskin] extraction: 1 of 5 model clauses quote nothing the user typed and leave the record ("AC 20")
[reskin] signature idea (action): "The sentinel plants its great shield and becomes an immovable wall of forged iron, sinking its weight into the ground so it cannot be pushed, pulled, or knocked off its spot by anything. While planted it refuses to give ground, and any foe who strikes it or presses against its front is shoved bodily away from the shield line and left off balance for a moment. The stance costs it all movement for t" [trait/start_of_turn/movement] — menu: fire-aura, warded-mending (+ shelf: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: push-prone, obstacle-pull, rally, fire-aura, warded-mending — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The sentinel plants its great shield and becomes an immovable wall of forged iron, sinking its weight into the ground so it cannot be pushed, pulled, or knocked off its spot by anything. While planted it refuses to give ground, and any foe who strikes it or presses against its front is shoved bodily away from the shield line and left off balance for a moment. The stance costs it all movement for t" [trait/start_of_turn/movement] — the model found no template that holds it (offered: fire-aura, warded-mending, push-prone, obstacle-pull, rally)
[reskin] fallback respects the call: push-prone left the shelf — the call declined it for this sheet
[reskin] value check: "Answering Sting" EV 7.2 vs floor 5.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's AC 17 at CR 11, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Anyone who tries to slip past or through the sentinel's shield line instead of meeting it head-on gets a brutal shield-slam for their trouble, the iron edge driving them back the way they came. The lane the sentinel guards is genuinely punishing to cross, so breaking its line means taking the hit." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — heated-body, resonant-body (iron)
[reskin] word match declined by the call: heated-body, resonant-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown heated-body, resonant-body, which the GM's words keyed
[reskin] key match declined: trait — "heated-body" was ranked first on the call's own menu for iron, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Anyone who tries to slip past or through the sentinel's shield line instead of meeting it head-on gets a brutal shield-slam for their trouble, the iron edge driving them back the way they came. The lane the sentinel guards is genuinely punishing to cross, so breaking its line means taking the hit." [trait/on_being_hit/damage] — the model found no template that holds it (offered: heated-body, resonant-body, absorption, bloodied-burst, weapon-lodge)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] audit rename: "Answering Sting" -> "Iron Retort"
[reskin] dead name still carried — "Shield-Slam" names a row that is still on the sheet; no sweep
[reskin] identical row leaves: Actions/"Shield-Slam" reads word for word as Actions/"Iron Fist" — one ability, one name
[reskin] header clause: speed 30 ft. -> 20 ft. — the user typed 20 feet
[reskin] multiattack re-read: "Shield-Slam" is not on this sheet, so the combination now reads "The sentinel makes two Iron Fist attacks."
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Ilvareth Dusksong — in the run

**Concept:** name: Ilvareth Dusksong | An elf archmage who bends shadow and steps between places.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ilvareth Dusksong | 12 (2014) | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 9 / off 17 → 13; sustained 108 (4 × Arcane Burst); nova none; dmg 108

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

Common plus five other languages, Elvish

Challenge

12 (8,400 XP)

Proficiency Bonus:

+4

Misty Step (3/Day). As a bonus action, Ilvareth casts misty step, using the same spellcasting ability as Spellcasting.
Arcane Jaunt (2/Day). As a bonus action, Ilvareth teleports up to 30 feet to an unoccupied space it can see.
Protective Magic (3/Day) (Reaction). When Ilvareth is hit by an attack roll, Ilvareth casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Ilvareth makes four Arcane Burst attacks.
Arcane Burst: Melee or Ranged Spell Attack: +9 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 27 (4d10 + 5) force damage.
Spellcasting: Ilvareth casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17): -

At will: detect magic, detect thoughts, disguise self, invisibility, light, mage armor, mage hand, prestidigitation

2/day each: fly, lightning bolt

1/day each: cone of cold, mind blank, scrying, teleport
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Arcane Burst — print's own row, renamed
- Actions/Spellcasting — print's own row
- Reactions/Protective Magic — mage kit; the GM's clause "Ilvareth Dusksong — An elf archmage"
- Bonus Actions/Misty Step — mage kit; the GM's clause "bends shadow and steps between places"
- Bonus Actions/Arcane Jaunt — library seed phase-slip; the GM's clause "bends shadow and steps between places"; binds the GM's words: step+shadow

**Engine trace**

```
[route] caster (artillery) type=Humanoid mechanics=teleport — casts: on the GM's own words "archmage" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("bends shadow") | caster: no line key in the words — the model's read of its quote
[concept] name: "Ilvareth Dusksong" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=caster type=Humanoid themes=arcane/uncanny mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Ilvareth Dusksong"
[concept] mechanics: teleport
[concept] signature elements: stepping between places through shadow [behavior] | a body of living, bending shadow [body] | the archmage's spell list, bent to darkness [object]
[concept] identity: Ilvareth Dusksong opens by stepping through a shadow into a spot no one is watching, then lances the most dangerous foe with a bolt of clinging darkness before folding back out of reach. Every round he fights as a duelist of distances — blink, blast, retreat — spending his spell list to peel apart a party's formation while never standing where a blade can find him. Under pressure he grows cold and surgical rather than desperate, trading ground for shadows and only slipping fully away when the fight stops amusing him.
[concept] lore: Once a court archmage of the dusk-touched elven halls, Ilvareth stepped too often between places until the shadow between them began stepping back — now he walks the seams of the world, hunting secrets and hapless travelers who stray where the light thins.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] print canon defenses: HP 168 -> 170, AC 16 -> 17 — the Archmage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 10, DEX 14, CON 12, INT 20, WIS 15, CHA 16 — the Archmage's at its own CR; attack +8 -> +9, DC 17 (print's)
[reskin] donor: caster-12 -> CR 12
[reskin] print canon: "Ilvareth Dusksong — An elf archmage who bends shadow and steps between places." heads on the Archmage — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Umbralspear" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "Ilvareth Dusksong — An elf archmage": Misty Step (3/Day) (Mage/Misty Step)
[reskin] proper noun: "Ilvareth Dusksong" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Ilvareth" — the call's own answer (person), built from the name
[reskin] inline form: "Ilvareth" — the model's own reading of the name
[reskin] energy withheld on a base row: "Umbralspear" Necrotic -> Piercing (the body's physical type; a Humanoid deals no Necrotic its concept never gave it)
[reskin] spell DC coherence: DC 18 -> 17 off Intelligence 20 (print's array stays)
[reskin] save dc derived: DC 18 -> 17 (8 + PB 4 + Intelligence's 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "bends shadow and steps between places" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "bends shadow and steps between places" but offered no quote
[reskin] clauses: "Ilvareth Dusksong — An elf archmage" -> has (descriptive), head | "bends shadow and steps between places" -> has (mechanical) [asked: movement]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Ilvareth casts his bolt of clinging darkness along a seam of shadow that runs from him to a point he can see, so the strike ignores the space between and threads around anything standing in the way. Anyone the bolt passes through on its way is dragged a step off their footing, stumbling toward the shadow it carved, and finds the patch of gloom stuck to them — a mark that shows Ilvareth exactly whe" [rider/on_hit/condition] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip)
[reskin] signature bound to the concept's verb: action — phase-slip (step, shadow)
[reskin] word match declined by the call: bolt-mark, bolt-restrain, snare-bolt, delayed-brand, reveal, aggro-curse — the key word does not mean the mechanic here
[reskin] fit declined: "Shadowseam Bolt" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: snare-bolt, delayed-brand, aggro-curse left the shelf — the call declined them for this sheet
[reskin] value check: "Phase Slip (2/Day)" EV 3.5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: phase-slip -> Bonus Actions/"Phase Slip (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Wherever Ilvareth stands, the shadows bend toward him and stretch a little farther than they should, so dim light around him deepens into true gloom. Any foe who steps into that gathered darkness is slowed and turned around, finding the floor and the way out less certain than they were a moment ago — the seam between places quietly reclaiming the ground he has claimed." [trait/always/movement] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Wherever Ilvareth stands, the shadows bend toward him and stretch a little farther than they should, so dim light around him deepens into true gloom. Any foe who steps into that gathered darkness is slowed and turned around, finding the floor and the way out less certain than they were a moment ago — the seam between places quietly reclaiming the ground he has claimed." [trait/always/movement] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] weapons answered: Umbralspear = none
[reskin] weapon declined: "Umbralspear" reads spear from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Umbralspear" — thrown, range 20/60
[reskin] print canon alignment: Neutral Evil -> Neutral — the Archmage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Elvish, telepathy 60 ft." -> "Common plus five other languages, Elvish" — the Archmage's plus the concept's Elvish
[reskin] print canon attack: "Umbralspear" -> "Arcane Burst" — the Archmage's own row
[reskin] print canon defenses: immunities none -> Psychic; Charmed ((with Mind Blank)) — the Archmage's own header lines
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 16" -> "Passive Perception 16")
[reskin] row binds its clause: "Phase Slip" answers "bends shadow and steps between places" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding names unknown entry, dropped: Immunities
[reskin] audit rename: "Phase Slip (2/Day)" -> "Arcane Jaunt (2/Day)"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Reliquary Vault Ooze — in the run

**Concept:** a cathedral-vault ooze that digests reliquaries

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Reliquary Vault Ooze | 9 (2014) | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Reliquary Digestion, Traits/Spider Climb
- read: def 9 / off 8 → 8.5; sustained 54 (2 × Pseudopod); nova none; dmg 54

```
Reliquary Vault Ooze
Medium ooze, unaligned
Armor Class

10 (natural armor)

Hit Points: 

157 (21d8 + 63)

Speed: 

10 ft., climb 10 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

6 (-2)

	

16 (+3)

	

1 (-5)

	

6 (-2)

	

2 (-4)

Damage Resistances: 

acid, cold, fire

Condition Immunities: 

blinded, charmed, deafened, exhaustion, frightened, grappled, prone, restrained

Senses: 

blindsight 60 ft. (blind beyond this radius), passive Perception 8

Languages: 

None

Challenge

9 (5,000 XP)

Proficiency Bonus:

+4

Reliquary Digestion. When the vault ooze is in contact with a reliquary or similar consecrated object, the vault ooze corrodes the object, destroying it after is dealt to it, and regains 14 (4d6) hit points.
Aberrant Ground. The ground in a 10-foot-radius sphere centered on the vault ooze is difficult terrain.
Amorphous. The vault ooze can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form. A creature that touches the vault ooze or hits it with a melee attack while within 5 feet of it takes 9 (2d8) acid damage.
Spider Climb. The vault ooze can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The vault ooze makes two Pseudopod attacks.
Pseudopod: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 27 (7d6 + 3) acid damage. Nonmagical armor worn by the target takes a -1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10. The penalty can be removed by casting the mending spell on the armor.
```

**Where each row came from**

- Traits/Reliquary Digestion — authored for this sheet; the GM's clause "digests reliquaries"
- Traits/Aberrant Ground — template aberrant-ground; library draw (seed unstamped); binds the GM's words: ooze
- Traits/Amorphous — the chassis
- Traits/Corrosive Form — the chassis
- Traits/Spider Climb — the chassis
- Actions/Multiattack — the chassis
- Actions/Pseudopod — the chassis

**Engine trace**

```
[route] ooze type=Ooze mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "cathedral-vault ooze that digests reliqu" | ooze: ✓ ("cathedral-vault ooze that digests reliqu") | ooze: no line key in the words — the model's read of its quote
[concept] hints: ooze→body ✓ ("cathedral-vault ooze that digests") | engulf→mechanics ✓ ("digests reliquaries")
[concept] resolve: archetype=ooze type=Ooze themes=amorphous/grasping mind=bestial style=— energy=Acid mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: crawls along cathedral vaults and drops from ceilings [behavior] | black tar body that dissolves blessed objects [body] | hunger for reliquaries [behavior]
[concept] identity: The Reliquary Vault Ooze seeps through the masonry of cathedrals until it hangs from the vaulted ceiling above the altar, then drops in a single black sheet to swallow the reliquaries whole, dissolving gold, bone, and saintly marrow alike. Every round after, it spreads and re-engulfs, prioritizing holy relics and anything that glints with sanctity, annealing digested sanctity into its own mass as a faint luminescence. It is patient and acquisitive rather than savage — it retreats up through cracks when pierced, but never fully flees a room that still holds unconsumed reliquaries.
[concept] lore: Born from dissolved censer soot and the runoff of a thousand relic-washings, the Vault Ooze haunts cathedral vaults it once seeped into as a stain, seeking to swallow every holy object it can reach and hold their sanctity inside its unlit body.
[reskin] body type: ooze — the body outranks the role (recorded: ooze)
[reskin] print canon array: STR 16, DEX 6, CON 16, INT 1, WIS 6, CHA 2 — the Gray Ooze's, STR fitted to +7
[reskin] donor: ooze-9 -> CR 9 (invented — no printed peer)
[reskin] row gated out: Engulf (engulf) — the concept did not claim this mechanic
[reskin] print canon: "a cathedral-vault ooze that digests reliquaries" heads on the Gray Ooze — print's rows ride along; the seat stays
[reskin] alignment by body: Neutral -> Unaligned — a Ooze at INT 1 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] inline declared: "the vault ooze" — the call's own answer (kind), built from the name
[reskin] inline form: "the vault ooze" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a cathedral-vault ooze" -> has (descriptive), head | "digests reliquaries" -> has (mechanical)
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, push-prone, herd, thrown-burst-seed, drain, zone-seed, wind-up, blighted-ground, delayed-brand, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The ooze suddenly collapses its whole hanging mass into a black sheet and drops straight down, coming down on everything beneath it and dragging anyone caught up in the fall along with it to the floor. Anything it lands on that glints with sanctity is left stuck fast to its surface, pinned there and slowly sinking through its tar-like body." [action/save/movement] — menu: trample, leap, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew (+ shelf: rampage, patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] word match declined by the call: hook-rider, hook-drag, trample, thrown-burst, pull-through, ground-burst — the key word does not mean the mechanic here
[reskin] fit declined: "Vault Collapse" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] signature idea (trait): "Whenever blessed or holy objects, or the consecrated ground of a cathedral, are near, the ooze's faint inner luminescence brightens and steadies, and it subtly turns its crawling toward them, orienting on relics it cannot see as though they call to it through the stone." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — aberrant-ground (ooze)
[reskin] signature miss: trait — "Whenever blessed or holy objects, or the consecrated ground of a cathedral, are near, the ooze's faint inner luminescence brightens and steadies, and it subtly turns its crawling toward them, orienting on relics it cannot see as though they call to it through the stone." [trait/always/movement] — the model picked "uncanny-sense" (no verb, and it quotes nothing the GM typed) over a concept-verb template (aberrant-ground)
[reskin] trait bound to the concept's verb (concept-first): aberrant-ground — ooze in the user's words; the idea path had nothing
[reskin] signature template (trait): aberrant-ground -> Traits/"Aberrant Ground" ("exact concept match [verb: ooze:concept]")
[reskin] repair: 1 clause(s) with no row — "digests reliquaries"; one targeted call with the sheet as context
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Pseudopod = none; Auramundane Glare = none
[reskin] print canon size: Large -> Medium — the Gray Ooze's
[reskin] print canon speed: 20 ft. -> 10 ft. — the Gray Ooze's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 10 ft. — the Gray Ooze's own
[reskin] rider folded: "Pseudopod" keeps its budget — the chassis's rider half (11) folds into the base; the Gray Ooze pays no damage rider of its own (its "Nonmagical armor worn by the…" costs no damage)
[reskin] languages held: None stands — INT 1 on a Ooze speaks nothing, whatever the mind read said
[reskin] element immunity: Acid (merged into the header write)
[reskin] immunities stamped for type: Ooze -> Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained
[reskin] print canon defenses: immunities Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained -> Blinded, Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained; resistances none -> Acid, Cold, Fire — the Gray Ooze's own header lines
[reskin] 2024 caps: "Reliquary Digestion" — a condition or game term shipped lowercase
[reskin] audit rewrite blocked — "Reliquary Digestion" is engine-authored chassis text
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Meshrin — in the run

**Concept:** name: Meshrin | Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages. Give him a frightening roar. AC 16, 120 hit points.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | skirmisher-8-hurler | ok | ok | SOFT: payoff-producer, lint:hp-formula | ok | ok | ok | ok | ok | ok |

- structure · soft · payoff-producer: Actions/Downed Strike pays off the Prone condition but nothing on the sheet imposes it
- structure · soft · lint:hp-formula: HP listed 120 but formula 14d10 + 42 averages 119
- **dropped clause:** "a javelin for the throw"
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

Wounded Frenzy. While Meshrin has half of its hit points or fewer, it has advantage on attack rolls and saving throws.
Hold Breath. Meshrin can hold its breath for 15 minutes.
Great Weapon Master. When Meshrin hits a creature with its greataxe, the attack deals an extra 3 damage.
Marsh Stride. Difficult terrain composed of mud doesn't cost Meshrin extra movement, and Meshrin can move across mud without needing to make an ability check.
Fleet Agility. As a bonus action, Meshrin takes the Dash or Disengage action.

Actions
Multiattack: Meshrin makes three attacks, using Greataxe or Javelin. It can replace one attack with a use of Downed Strike.
Greataxe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (3d8 + 4) slashing damage.
Javelin: Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 17 (3d8 + 4) piercing damage. Immediately after the attack, a javelin returns to Meshrin's grasp.
Downed Strike: One creature within 30 feet that is prone must make a DC 15 Wisdom saving throw, taking 17 (5d6) bludgeoning damage on a failed save, or half as much damage on a successful one.
Frightening Roar (Recharge 5-6): Each creature in a 30-foot cone must succeed on a DC 15 Wisdom saving throw or be frightened of Meshrin until the end of its next turn.
```

**Where each row came from**

- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "He is a barbarian who rages"
- Traits/Hold Breath — lizardfolk kit; the GM's clause "Meshrin — Large lizard folk"
- Traits/Great Weapon Master — a declared feature; the GM's clause "Wields a greataxe two-handed"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "Meshrin — Large lizard folk"
- Actions/Multiattack — the chassis
- Actions/Greataxe — authored for this sheet; a named part; the GM's clause "Wields a greataxe two-handed"; weapon greataxe
- Actions/Javelin — weapon javelin
- Actions/Downed Strike — library seed condition-payoff
- Actions/Frightening Roar — authored for this sheet; the GM's clause "Give him a frightening roar"
- Bonus Actions/Fleet Agility — the chassis

**Engine trace**

```
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("Wields a greataxe two-handed") | brute -> skirmisher-hurler: the concept's VERB outranks the noun (key "throw", class verb) | skirmisher-hurler: key "throw" (class verb)
[concept] name: "Meshrin" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: hurler→style ✓ ("javelin for the throw")
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/armed mind=sapient style=hurler energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Meshrin"
[concept] mechanics: thrown-weapon
[concept] signature elements: hurled javelin opener [behavior] | two-handed greataxe [object] | barbarian rage [behavior]
[concept] identity: Meshrin opens with a hurled javelin to soften a target, then closes to two-handed greataxe work while his rage boils over. Each round he leers and bellows, using a frightening roar to break the nerve of anyone who thought distance would save them. When bloodied he does not flee — he fights to the death, raging harder and swinging wider, because surrender is a word his kind never learned.
[concept] lore: Meshrin is a hulking lizardfolk berserker from the steaming marsh-edge tribes, exiled for a rage he could not leash, who now sells his axe and his roar to whoever points him at a fight.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] nova capped: "Hurled Burst" 49 → 44 (the chassis nova obeys the cap: 44 at CR 8)
[reskin] donor: skirmisher-8-hurler -> CR 8 (invented — no printed peer)
[reskin] repair round 1: 1 defect(s) — "Dread Roar" deals Thunder on a Humanoid whose concept names no Thunder — a name is not a warrant; use a physical type
[reskin] named parts: Greataxe (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] row evicted for the cap: Traits/"Marsh Stride" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "Meshrin — Large lizard folk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: rampage — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: barbarian — "He is a barbarian who rages": Bloodied Frenzy (Berserker/Bloodied Frenzy)
[reskin] proper noun: "Meshrin" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Meshrin" — the call's own answer (person), built from the name
[reskin] inline form: "Meshrin" — the model's own reading of the name
[reskin] energy withheld on a base row: "Dread Roar" Thunder -> Bludgeoning (the body's physical type; a Humanoid deals no Thunder its concept never gave it)
[reskin] save dc derived: DC 16 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] final price: the round ran 39 against the card's 54 — the attack rows re-solve at 138% (3 attacks on an authored sheet, under the card)
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "Wields a greataxe two-handed" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "Wields a greataxe two-handed" but offered no quote
[reskin] asked field dropped: the call answered trigger "at_will" for "a javelin for the throw" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "a javelin for the throw" but offered no quote
[reskin] asked field dropped: the call answered trigger "at_will" for "Give him a frightening roar" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "Give him a frightening roar" but offered no quote
[reskin] clauses: "Meshrin — Large lizard folk" -> has (header) | "30 feet of movement" -> has (header) | "Wields a greataxe two-handed" -> has (mechanical) [asked: attack] | "a javelin for the throw" -> has (mechanical) [asked: attack] | "He is a barbarian who rages" -> has (mechanical) [asked: buff_self] | "Give him a frightening roar" -> has (mechanical) [asked: condition] | "AC 16" -> has (header) | "120 hit points" -> has (header)
[reskin] extraction: 1 of 9 model clauses quote nothing the user typed and leave the record ("AC 16")
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Meshrin throws his head back and lets out a roaring bellow that washes over everyone near him, shaking their nerve and making their hands falter. Anyone caught in the roar who was already hurt or rattled finds their footing slip entirely, leaving them exposed and easy to strike until they can pull themselves together. He can only summon that full-throated terror so often, but it costs him nothing " [action/once_per_fight/condition] — menu: snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — throw-retrieve (javelin)
[reskin] word match declined by the call: stunning-strike — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown throw-retrieve, which the GM's words keyed
[reskin] key match declined: action — "throw-retrieve" was ranked first on the call's own menu for javelin, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Meshrin throws his head back and lets out a roaring bellow that washes over everyone near him, shaking their nerve and making their hands falter. Anyone caught in the roar who was already hurt or rattled finds their footing slip entirely, leaving them exposed and easy to strike until they can pull themselves together. He can only summon that full-throated terror so often, but it costs him nothing " [action/once_per_fight/condition] — the model found no template that holds it (offered: throw-retrieve, snare, condition-payoff, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, feint-slip, stunning-strike)
[reskin] fallback respects the call: throw-retrieve left the shelf — the call declined it for this sheet
[reskin] fallback skipped: thrown-burst-seed (the sheet cannot render it)
[reskin] value check: "Merciless Strike" EV 13.2 vs floor 7.3 (one attack of 3) — dice 28 → 17 (scaled down to the ceiling)
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Meshrin swings his greataxe two-handed with all his weight behind it, and a blow that lands cleanly leaves the target reeling and off balance rather than merely cut. Against a foe who is already hurt, that wide swing carries through with even more brutal force, as if the smell of blood steadies his aim instead of spoiling it." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (rage)
[reskin] word match declined by the call: bloodied-fury, uncanny-sense, bloodied-burst — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-fury, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-fury" was ranked first on the call's own menu for rage, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Meshrin swings his greataxe two-handed with all his weight behind it, and a blow that lands cleanly leaves the target reeling and off balance rather than merely cut. Against a foe who is already hurt, that wide swing carries through with even more brutal force, as if the smell of blood steadies his aim instead of spoiling it." [trait/always/condition] — the model found no template that holds it (offered: bloodied-fury, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] feature name: "Merciless Strike" -> "Trip Attack" — the card that is this feature takes its name
[reskin] repair: 1 clause(s) with no row — "Give him a frightening roar"; one targeted call with the sheet as context
[reskin] slot yields: nova — the chassis's "Javelin Toss (Recharge 5-6)" leaves; "Frightening Roar (Recharge 5-6)" holds the slot
[reskin] repaired sheet: 1 attack row(s), 1 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Greataxe = greataxe; Javelin = javelin; Javelin Toss = javelin
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] chassis nova: "Frightening Roar (Recharge 5-6)" — the skirmisher-8-hurler's own nova row; geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "Draconic" -> "Common, Draconic" (sapient)
[reskin] multiattack replacement clause: It can replace one attack with a use of Trip Attack.
audit finding below confidence gate: Frightening Roar No repeat save or escape is offered; the Frightened condition is only escapable via the fixed duration, which is present, so this is the sole condition without counterplay only if the duration were absent — verify duration wording is applied to each affected creature.
audit finding below confidence gate: Javelin Meshrin has no listed javelins or thrown-weapon supply, and the returning clause implies an unlimited ranged resource with no defined limit or ammunition, which is unadjudicable for a GM tracking thrown weapons.
[reskin] audit rename: "Trip Attack" -> "Downed Strike"
[reskin] user-set: HP 136 -> 120 — a declared field (Resolution 3)
[reskin] multiattack re-read — "Javelin" joins the combination; "Meshrin makes three attacks, using Greataxe or Javelin in any combination. It can replace "
[reskin] species kit: Swim 30 ft. — the lizardfolk's
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


---

## Review batch — features-2026-10-18-2026-10-19T00-46-58

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Blind Scent-Stalker | 5 | 2024 | lurker-5 | ok | ok | ok | ok | SOFT: lint:beast-intelligence | ok | ok | ok | ok | soft (1) | 2/2 | 4/5 |
| Drowned Supplicant | 5 | 2024 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/8 |
| Hollow Barrow Wight | 4 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Gustreaver | 6 (2014) | 2014 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/9 |
| Pip Burrowwise | 3 (2014) | 2014 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/5 |
| Druid | 2 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Ashvowed Cinder Priest | 4 (2014) | 2014 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 5/5 |
| Expelled Staff Wizard | 3 | 2024 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 1/1 |
| Skeleton | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Sandlot Champion | 4 (2014) | 2014 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Ogre | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Mummy | 3 | 2024 | brute-2 | SOFT: hit-die | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/2 |
| Nave Drowned Choir | 4 | 2024 | lurker-1-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Cold Lamp Widow | 3 | 2024 | lurker-1-phantom | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | FAIL: no-type-in-name | FAIL (1) | 2/2 | 4/4 |
| Stray Mountain | 17 (2014) | 2014 | brute-17-juggernaut | ok | SOFT: aim-atk, band, hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/3 | 7/9 |
| Slagmire Regrowth | 6 | 2024 | brute-5-regenerator | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/3 |
| Rage-Blooded Pitborn | 8 (2014) | 2014 | brute-5 | SOFT: duplicate-mechanic | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (2) | 1/1 | 3/4 |
| Ironhold Inquisitor | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |
| Coil-Bodied Lurker | 7 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 4/4 |
| Quarry Stamp | 6 (2014) | 2014 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/6 |
| Chamber Breaker | 5 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (2) | 0/1 | 3/5 |
| Deep Lake Toller | 6 | 2024 | caster-2-warpriest | ok | SOFT: band | ok | SOFT: rider-no-save | ok | ok | ok | ok | ok | soft (2) | 2/2 | 5/6 |
| Tolling Bell-Diver | 4 (2014) | 2014 | lurker-1-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Dame Oriel | 5 | 2024 | brute-5 | ok | SOFT: band | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (2) | 1/1 | 1/3 |
| Gravechant Swarm | 4 (2014) | 2014 | swarm-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |

**Dropped 4 of 35 user clauses** (coverage 89%); concept share 82% (93/114 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- lurker-1-phantom / reader: 1



---


### Stray Mountain — highest CR

**Concept:** a mountain that has begun to walk and does not know why

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Stray Mountain | 17 (2014) | brute-17-juggernaut | ok | SOFT: aim-atk, band, hot-offense | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-atk: attack +13 against the aim's +10
- bands · soft · band: reads CR 18.5 (print at 17 reads 9–17.5, n=9)
- bands · soft · hot-offense: offense alone reads CR 23, 6 over; the HP axis pulls the read to 18.5
- **dropped clause:** "a mountain"
- **dropped clause:** "has begun to walk"
- read: def 14 / off 23 → 18.5; sustained 165 (2 × Boulder Fist + legendary Plunge Strike); nova Avalanche Crush 72; dmg 165

```
Stray Mountain
Gargantuan elemental, neutral
Armor Class

19 (natural armor)

Hit Points: 

263 (17d20 + 85)

Speed: 

30 ft., climb 30 ft.

STR	DEX	CON	INT	WIS	CHA


25 (+7)

	

8 (-1)

	

20 (+5)

	

6 (-2)

	

10 (+0)

	

4 (-3)

Skills: 

Athletics +13, Perception +6

Saving Throws: 

STR +13, CON +11

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

tremorsense 120 ft., passive Perception 16

Languages: 

None

Challenge

17 (18,000 XP)

Proficiency Bonus:

+6

Giving Slope. Any creature that starts its turn within 20 feet of the stray mountain must succeed on a DC 19 Strength saving throw or be knocked prone until the start of its next turn. A creature that succeeds on the save is immune to this creature's aura for 24 hours.
Legendary Resistance (3/Day). If the stray mountain fails a saving throw, it can choose to succeed instead.
Siege Monster. The stray mountain deals double damage to objects and structures.

Actions
Multiattack: The stray mountain makes two Boulder Fist attacks. It can replace one attack with a use of Mountainside Dread.
Boulder Fist: Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 20 (3d8 + 7) bludgeoning damage plus 13 (3d8) thunder damage.
Avalanche Crush (Recharge 5-6): Each creature in a 30-foot cone must make a DC 19 Strength saving throw, taking 72 (16d8) thunder damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone until the end of its next turn.
Mountainside Dread: One creature within 60 feet of the stray mountain must succeed on a DC 19 Wisdom saving throw or be frightened of the stray mountain until the end of the stray mountain's next turn. If the target was already frightened by this ability, it also takes 28 (8d6) thunder damage.
Legendary Actions

The stray mountain can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The stray mountain regains spent legendary actions at the start of its turn.

Plunge Strike: The stray mountain moves up to half its speed without provoking opportunity attacks, and it makes one Boulder Fist attack.
Blunder Forth: The stray mountain moves up to half its speed without provoking opportunity attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.
Quaking Shove: Each creature within 10 feet of the stray mountain must succeed on a DC 19 Strength saving throw or be knocked prone.
```

**Where each row came from**

- Traits/Giving Slope — template noxious-aura; library draw (seed unstamped)
- Traits/Legendary Resistance — the chassis
- Traits/Siege Monster — the chassis
- Actions/Multiattack — the chassis
- Actions/Boulder Fist — the chassis
- Actions/Avalanche Crush — the chassis
- Actions/Mountainside Dread — library seed escalating-dread
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Plunge Strike — the chassis
- Legendary Actions/Blunder Forth — the chassis
- Legendary Actions/Quaking Shove — the chassis

**Engine trace**

```
[route] brute-juggernaut type=Elemental mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a mountain that has begun to walk") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental themes=elemental/terror mind=mindless style=juggernaut energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a mountain that walks [body] | blind, unstoppable forward motion [behavior] | quaking, grinding earth [aura]
[concept] identity: The walking mountain opens by simply continuing its slow, inevitable course, crushing terrain and creatures alike under grinding stone before anyone realizes the slope is a footfall. Every round it swings a limb of fused boulders in a blind, heedless arc and grinds forward without regard for what it breaks, its element-body indifferent to harm. It does not flee and it does not scheme — pressured, it only becomes more frantic and more terrible, redoubling its stumbling stride until it is quaking in a motion it cannot understand.
[concept] lore: Born when a mountain's root-stone was sundered from the earth by some deep elemental rupture, it now wanders in a waking dream, forever unknowing and unable to stop, seeking the summit-height it was and can never be again.
[reskin] donor: brute-17-juggernaut -> CR 17
[reskin] repair round 1: 1 defect(s) — name "Quaking Stride" promises movement but the row never delivers it — name what the rule does, or drop the claim word; this row earns Shove, Slam, Sweep
[reskin] inline declared: "the stray mountain" — the call's own answer (kind), built from the name
[reskin] inline form: "the stray mountain" — the model's own reading of the name
[reskin] lacks asked: "does not know why"
[reskin] clauses: "a mountain" -> has (mechanical) [asked: movement] | "has begun to walk" -> has (mechanical) [asked: movement] | "does not know why" -> LACKS (mechanical)
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The stray mountain simply keeps walking, and whatever stands in the way gets carried along or ground to pieces against it. Anyone it shoves into runs with a rising, blinded panic, stumbling toward it instead of away as the trembling earth confuses which way is safe." [action/always/movement] — menu: condition-payoff, shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] word match declined by the call: terror-pulse — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "herd" has no key-table verb, but the call quotes "a mountain that has begun to walk and does not know why" from the description
[reskin] value check: "Blind Pilgrimage (2/Day)" EV 11.3 vs floor 49 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Blind Pilgrimage (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: terror-pulse left the shelf — the call declined it for this sheet
[reskin] value check: "Creeping Dread" EV 19.4 vs floor 15.1 (one attack of 2) — dice 14 → 28
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its body is a walking slope: firm, climbable stone near its crown and loose, shifting scree everywhere else. Creatures scrambling over it find their footing give way, and the deeper they try to climb, the more the mountain grinds and pours beneath them, hurling them back down." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: spider-climb, terrain-walk, false-appearance, aberrant-ground — the key word does not mean the mechanic here
[reskin] signature template (trait): noxious-aura -> Traits/"Giving Slope" ("Loose shifting scree underfoot makes climbers lose footing and fall Prone; a Str [shape fit, no verb match]")
[reskin] repair: 1 clause(s) with no row — "has begun to walk"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Boulder Fist = none; Avalanche Crush = none; Roiling Stone = none; Plunge Strike = none; Blunder Forth = none; Quaking Stride = none
[reskin] chassis nova: "Avalanche Crush (Recharge 5-6)" — the brute-17-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] trait stripped: Traits/Immutable Form — a golem's trait on a Elemental
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
[reskin] name follows content: Legendary Actions/"Quaking Stride" promises movement the row never delivers — "Quaking Shove" (the call's modifier kept, the claim word swapped for a noun the row earns)
[reskin] save re-derived after a retype: Actions/Avalanche Crush — a Constitution save for an effect that calls for Strength or Dexterity; the save follows the condition
[reskin] audit rename: "Creeping Dread" -> "Mountainside Dread"
[reskin] size floor: STR 18 -> 25 — print prints no corporeal Gargantuan body under 25 (the Dragon Turtle); the attack follows it, as print's own 49 do
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Gustreaver — a 2014 sheet

**Concept:** an unseen stalker of living wind that is invisible at all times

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Gustreaver | 6 (2014) | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 9 / off 5 → 7; sustained 33 (3 × Wind Swipe); nova none; dmg 33

```
Gustreaver
Large elemental, neutral
Armor Class

14

Hit Points: 

97 (13d10 + 26)

Speed: 

50 ft., fly 50 ft. (hover)

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

19 (+4)

	

14 (+2)

	

10 (+0)

	

15 (+2)

	

11 (+0)

Skills: 

Perception +5, Stealth +10

Saving Throws: 

DEX +7

Damage Resistances: 

bludgeoning, piercing, slashing

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Common, Primordial (Auran)

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Assassinate. During the first round of each combat, the gustreaver has advantage on attack rolls against any creature that hasn't taken a turn. If the gustreaver hits a creature during that round, the target takes an extra 10 (3d6) thunder damage.
Evasion. If the gustreaver is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the gustreaver instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it is incapacitated.
Windborne. The gustreaver ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Air Form. The gustreaver can enter an enemy's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.
Invisibility. The gustreaver is invisible.
Nimble Escape. As a bonus action, the gustreaver takes the Disengage or Hide action.
Vanish (1/Day). As a bonus action, the gustreaver casts invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

Actions
Multiattack: The gustreaver makes three Wind Swipe attacks. It can replace one attack with a use of Vortex.
Wind Swipe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) force damage.
Vortex: One Large or smaller creature in the gustreaver's space must succeed on a DC 14 Constitution saving throw or take 7 (1d8 + 3) thunder damage and be grappled (escape DC 14). Until the grapple ends, the target can't cast spells with a verbal component and takes 7 (2d6) thunder damage at the start of each of the gustreaver's turns.
```

**Where each row came from**

- Traits/Assassinate — template assassinate; rogue kit; the GM's clause "unseen stalker"
- Traits/Evasion — template evasion; rogue kit; the GM's clause "unseen stalker"
- Traits/Windborne — the chassis
- Traits/Air Form — print's own row
- Traits/Invisibility — print's own row
- Actions/Multiattack — the chassis
- Actions/Wind Swipe — print's own row, renamed
- Actions/Vortex — print's own row
- Bonus Actions/Nimble Escape — rogue kit; the GM's clause "unseen stalker"
- Bonus Actions/Vanish — library seed self-invisibility; the GM's clause "is invisible at all times"; binds the GM's words: invisible+unseen

**Engine trace**

```
[route] skirmisher-skulker type=Elemental mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker: ✓ ("an unseen stalker of living wind that is") | lurker -> skirmisher-skulker: the concept's VERB outranks the noun (key "unseen", class verb) | skirmisher-skulker: key "unseen" (class verb)
[concept] resolve: archetype=skirmisher type=Elemental themes=elemental/aerial mind=sapient style=skulker energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: invisible at all times [behavior] | living wind given body [body] | patient unseen stalking [behavior]
[concept] identity: The Unseen Stalker is a bodied, living body of wind made flesh enough to lunge and claw; it opens every fight as a sudden shrieking gust that tears into a target it has already chosen, then slides out of sight on the air it rode in on. Every round thereafter it circles invisibly, waits for the moment a foe is distracted, and strikes once from a direction no one is watching, hounding the wounded with patient, deliberate pressure rather than raw savagery. It is not mindless air but a sly, scheming predator that toys with prey, retreats when badly hurt, and comes back again and again rather than meeting strength head-on.
[concept] lore: Born in the screaming gales of the high crags, these creatures are living air given appetite and malice by the fury of storms, and they hunt anything that breathes in order to savor the moment a throat closes against the unseen wind that slipped over it.
[reskin] print canon defenses: HP 114 -> 97, AC 15 -> 14 — the Invisible Stalker's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 16, DEX 19, CON 14, INT 10, WIS 15, CHA 11 — the Invisible Stalker's at its own CR; attack +6 -> +7, DC 14 (print's)
[reskin] donor: skirmisher-3-skulker -> CR 6
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] print canon: "an unseen stalker of living wind that is invisible at all times" heads on the Invisible Stalker — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] implied class kept: "rogue" on the GM's own words "unseen stalker" — the key table found none
[reskin] class kit: Cunning Action — the sheet already carries it, so the rogue kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: rogue — "unseen stalker": Evasion (evasion), Assassinate (assassinate)
[reskin] inline declared: "the gustreaver" — the call's own answer (kind), built from the name
[reskin] inline form: "the gustreaver" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "is invisible at all times" but offered no quote
[reskin] clauses: "an unseen stalker of living wind" -> has (descriptive), head | "is invisible at all times" -> has (mechanical) [asked: condition]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The gustreaver vanishes into the air and then reappears as a screaming squall that lunges at one wounded foe it can see. It hurls itself at that target through the intervening air, riding the wind to close the distance and rake it with claws as it arrives, and the shriek of its passage leaves the victim's ears ringing so hard they cannot hear warnings afterward. It can only call up this screaming " [action/always/damage] — menu: leap, gaze-single, snare, condition-payoff, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, exploiter (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — self-invisibility (invisible, unseen)
[reskin] word match declined by the call: sensory-strike — the key word does not mean the mechanic here
[reskin] value check: "Living Wind Cloak (1/Day)" EV 0 vs floor 3.1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Living Wind Cloak (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: sensory-strike left the shelf — the call declined it for this sheet
[reskin] fallback floor waived: self-invisibility — a self-buff the user's words ask for is its own worth (print: the Imp's Invisibility)
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 3.1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "While the gustreaver's body is unseen, the living wind inside it stirs the air around it, so that leaves, dust, and loose cloth twist and eddy near its hiding spot and the tell of its presence is a swirl of disturbed air rather than nothing at all. Anyone who watches for it can catch the ripple of its passage, and once a watcher has marked the swirl it does not easily lose it." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] word match declined by the call: false-appearance — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "While the gustreaver's body is unseen, the living wind inside it stirs the air around it, so that leaves, dust, and loose cloth twist and eddy near its hiding spot and the tell of its presence is a swirl of disturbed air rather than nothing at all. Anyone who watches for it can catch the ripple of its passage, and once a watcher has marked the swirl it does not easily lose it." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] weapons answered: Claw = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Primordial" (sapient)
[reskin] print canon size: Medium -> Large — the Invisible Stalker's
[reskin] print canon alignment: Neutral Evil -> Neutral — the Invisible Stalker's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Primordial" -> "Common, Primordial (Auran)" — the Invisible Stalker's
[reskin] print canon speed: 40 ft. -> 50 ft. — the Invisible Stalker's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 50 ft. — the Invisible Stalker's own
[reskin] print canon attack: "Claw" -> "Wind Swipe" — the Invisible Stalker's own row
[reskin] print canon multiattack: "The gustreaver makes three Wind Swipe attacks. It can replace one attack with a use of Vortex." — the Invisible Stalker's own
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Poison; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious; resistances none -> Bludgeoning, Piercing, Slashing — the Invisible Stalker's own header lines
[reskin] print canon trait: Air Form — "an unseen stalker of living wind that is invisible at all times" is the Invisible Stalker (print's own row)
[reskin] print canon trait: Invisibility — "an unseen stalker of living wind that is invisible at all times" is the Invisible Stalker (print's own row)
[reskin] print canon row: Actions/Vortex — the Invisible Stalker's own
[reskin] row binds its clause: "Vanish" answers "is invisible at all times" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Ashvowed Cinder Priest — one marked soft

**Concept:** a priest who heals the faithful and burns the heretic with holy fire

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ashvowed Cinder Priest | 4 (2014) | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2 (print at 4 reads 2–6.5, n=13)
- read: def 1 / off 3 → 2; sustained 24 (2 × Radiant Flame); nova none; dmg 24

```
Ashvowed Cinder Priest
Medium humanoid, neutral
Armor Class

13 (chain shirt)

Hit Points: 

77 (14d8 + 14)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

10 (+0)

	

12 (+1)

	

18 (+4)

	

16 (+3)

	

13 (+1)

Skills: 

Arcana +6, Perception +5

Saving Throws: 

INT +6, WIS +5

Senses: 

passive Perception 15

Languages: 

Common plus one other language

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Divine Aid (3/Day). As a bonus action, the cinder priest casts bless, dispel magic, healing word, or lesser restoration, using the same spellcasting ability as Spellcasting.
Lay on Hands (2/Day). As a bonus action, the cinder priest touches a creature within 5 feet of itself and restores 14 (4d6) hit points to it.

Actions
Multiattack: The cinder priest makes two attacks: one with its Radiant Flame and one with its Holy Fire.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 120 ft., one target. Hit: 12 (2d8 + 3) radiant damage.
Spellcasting: The cinder priest casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): -

At will: light, thaumaturgy

1/day each: spirit guardians
Holy Fire: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 12 (2d8 + 3) radiant damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Radiant Flame — print's own row, renamed
- Actions/Spellcasting — print's own row
- Actions/Holy Fire — print's own row; authored for this sheet; the GM's clause "burns the heretic with holy fire"
- Bonus Actions/Divine Aid — cleric kit; the GM's clause "a priest"
- Bonus Actions/Lay on Hands — library seed lay-on-hands; the GM's clause "heals the faithful"; binds the GM's words: heal+heals+healing

**Engine trace**

```
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "a priest who heals the faithful and burn" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("a priest who heals the faithful and burn") | caster-warpriest: key "priest" (class noun)
[concept] resolve: archetype=caster type=Humanoid themes=fiendish/grave mind=sapient style=warpriest energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: branding heretics with holy fire [behavior] | healing the faithful with prayer [behavior] | the ash-choked censer it swings [object]
[concept] identity: The Ash Priest wades forward in soot-stained vestments, branding heretics with a censer-swing of clinging embers while chanting a benediction that knits the wounds of any ally still standing in the smoke. Each round it chooses one soul to sear and one to mend, its ash-lungs rasping louder the more it burns, and it fights to the last breath — never fleeing, since every fallen ally feeds the pyre it carries.
[concept] lore: A priest who burned with the congregation it failed to save, risen from the ash-choked sanctuary to decide which of the faithful are worth saving and which are fuel.
[reskin] print canon route: the Priest's body outranks the warpriest seat — no verb in the words names it; the plain caster line
[reskin] print canon casting stat: the Priest casts with WIS; the caster line's INT striker reseats there
[reskin] print canon array: STR 16, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, WIS fitted to +5
[reskin] donor: caster-6 -> CR 4
[reskin] print canon: "a priest who heals the faithful and burns the heretic with holy fire" heads on the Priest — print's rows ride along; the seat stays
[reskin] name_element answered: Ashvowed Cinder Priest = literal; Censer = literal
[reskin] class kit: cleric — "a priest": Divine Aid (3/Day) (Priest/Divine Aid)
[reskin] inline declared: "the cinder priest" — the call's own answer (kind), built from the name
[reskin] inline form: "the cinder priest" — the model's own reading of the name
[reskin] spell DC coherence: Intelligence 13 -> 18 so DC 14 derives
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a priest" -> has (descriptive), head | "heals the faithful" -> has (descriptive) | "burns the heretic with holy fire" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The priest hurls a smear of burning censer-ash that clings to one foe, marking them as fuel for the pyre. While the ash clings, every spark of fire the priest touches that foe with clings deeper, and if they die still smoldering the ash leaps to the nearest heretic beside them, chaining the burning on. The ash fades on its own after a short while or when the priest marks someone new." [rider/on_hit/condition] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally)
[reskin] signature bound to the concept's verb: action — lay-on-hands (heal, heals, healing)
[reskin] word match declined by the call: bolt-mark, aggro-curse, reveal, blighted-ground, snare, obstacle-pull — the key word does not mean the mechanic here
[reskin] fit declined: "Smearing Ash" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: aggro-curse left the shelf — the call declined it for this sheet
[reskin] value check: "Lay on Hands (2/Day)" EV 7.7 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: lay-on-hands -> Bonus Actions/"Lay on Hands (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The priest's censer never empties: every time it swings, the smoldering coal-basket breathes out a haze of embers that clings to the priest and lingers about it, and the longer the fight rages the thicker the smoke grows around its shoulders, faintly scalding anyone who stands close at the start of their turn." [trait/always/damage] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The priest's censer never empties: every time it swings, the smoldering coal-basket breathes out a haze of embers that clings to the priest and lingers about it, and the longer the fight rages the thicker the smoke grows around its shoulders, faintly scalding anyone who stands close at the start of their turn." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] repair: 1 clause(s) with no row — "burns the heretic with holy fire"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Censer = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon attack: "Censer" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon attack kept: "Holy Fire" stays — "Radiant Flame" is already a row on this sheet
[reskin] print canon: chassis row leaves — Reactions/"Protective Magic (3/Day)" is the seat's, not the Priest's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] row binds its clause: "Lay on Hands" answers "heals the faithful" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rename blocked — "Ember Benediction" claims an element "Lay on Hands (2/Day)" does not pay (no damage)
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 13 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Rage-Blooded Pitborn — bands soft

**Concept:** a berserker who flies into an unstoppable rage once per day when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Rage-Blooded Pitborn | 8 (2014) | brute-5 | SOFT: duplicate-mechanic | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- derivation · soft · duplicate-mechanic: Traits/Bursting Fury: every part of this row is already in "Bloodied Frenzy" — two rows, one mechanic
- bands · soft · band: reads CR 6.5 (print at 8 reads 2–8.5, n=10)
- read: def 5 / off 8 → 6.5; sustained 52 (2 × Greataxe); nova none; dmg 52

```
Rage-Blooded Pitborn
Medium humanoid, neutral
Armor Class

14 (chain shirt)

Hit Points: 

135 (18d8 + 54)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

12 (+1)

	

17 (+3)

	

9 (-1)

	

11 (+0)

	

9 (-1)

Skills: 

Athletics +7, Perception +3

Saving Throws: 

STR +7, CON +6

Senses: 

passive Perception 13

Languages: 

Common

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Bursting Fury. While it has half of its hit points or fewer, the pitborn has advantage on attack rolls.
Wounded Frenzy. While it has half of its hit points or fewer, the pitborn has advantage on attack rolls and saving throws.
Rage-Blood Charge (1/Day). As a bonus action, immediately after dealing damage to a creature that has half of its hit points or fewer, the pitborn moves up to half its speed without provoking opportunity attacks, and it makes one Greataxe attack.

Actions
Multiattack: The pitborn makes two Greataxe attacks.
Greataxe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 26 (5d8 + 4) slashing damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Greataxe — weapon greataxe
- Bonus Actions/Rage-Blood Charge — template rampage; library draw (seed unstamped); the GM's clause "flies into an unstoppable rage once per day when wounded"; binds the GM's words: rage+wound+bloodied+blood
- Traits/Bursting Fury — template bloodied-fury; library draw (seed unstamped); the GM's clause "flies into an unstoppable rage once per day when wounded"; binds the GM's words: wounded+fury+rage
- Traits/Bloodied Frenzy — print's own row

**Engine trace**

```
[route] brute type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a berserker who flies into an unstoppabl") | skirmisher-winged: the call read "flies" as not meaning that mechanic here — no override | brute stands: every key that would override it was read as a figure of speech | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a berserker who flies into an unstoppabl…" is the description, not a name
[concept] hints: winged→style ✗ ("flies into an unstoppable rage")
[concept] resolve: archetype=brute type=Humanoid themes=bestial/armed mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the wound-triggered unstoppable rage [behavior] | heaving rage-swollen muscle and split hide [body] | a heavy melee weapon swung without guard [object]
[concept] identity: A broad-shouldered humanoid brute wades into melee with a heavy axe or club, opening by charging the largest threat and trading blows without flinching. Once per day, when the first real wound lands, it erupts into a screaming rage — its hide flushing and its skin splitting over surging muscle — and for the rest of that fight it fights on, faster and harder, ignoring pain until nothing stands. Under pressure it never retreats; it targets whoever hurt it last and grinds the fight to the death.
[concept] lore: These rage-blooded warriors are taken as children by the scar-priests of the fighting pits, raised on ritual wounding so that the first cut a foe lands unlocks the fury bred into their veins.
[reskin] print canon array: STR 18, DEX 12, CON 17, INT 9, WIS 11, CHA 9 — the Berserker's, STR fitted to +7
[reskin] donor: brute-5 -> CR 8
[reskin] print canon: "a berserker who flies into an unstoppable rage once per day when wounded" heads on the Berserker — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] implied class refused: the call answered "barbarian" but this body takes no class kit — a beast or a mind too simple to train
[reskin] inline declared: "the pitborn" — the call's own answer (kind), built from the name
[reskin] inline form: "the pitborn" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a berserker" -> has (descriptive), head | "flies into an unstoppable rage once per day when wounded" -> has (mechanical) [asked: on_being_hit/per_day/buff_self]
[reskin] signature idea (action): "When the blood rage erupts, the pitborn bellows and hurls itself at the foe who wounded it, closing the distance heedlessly to reach that enemy. Anyone standing in the path is simply shoved aside or trampled as it barrels through, and it ends its charge right beside the one who drew first blood." [reaction/on_being_hit/movement] — menu: EMPTY (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — rampage (rage, wound)
[reskin] word match declined by the call: trample, ground-burst, terror-pulse, rally, charge — the key word does not mean the mechanic here
[reskin] value check: "Rage-Blood Charge (1/Day)" EV 21.1 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] signature template: rampage -> Bonus Actions/"Rage-Blood Charge (1/Day)" ("When wounded and enraged, the pitborn immediately moves to close on the creature [verb: rage:concept, wound:concept, bloodied:idea, blood:idea]")
[reskin] keys spent by the action: rage, wound
[reskin] signature idea (trait): "The moment the … takes hold, its hide splits open and muscle surges through the cracks, so every blow it lands afterward rides on that bursting strength. The angrier the … makes it, the harder its axe bites, until the fury burns itself out." [trait/always/damage] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury, bloodied-burst, relentless-pursuit (wounded, unstoppable)
[reskin] word match declined by the call: bloodied-burst, relentless-pursuit, aberrant-ground — the key word does not mean the mechanic here
[reskin] signature template (trait): bloodied-fury -> Traits/"Bursting Fury" ("once the rage takes hold and it is wounded, fury makes every axe blow bite harde [verb: wounded:concept, fury:idea]")
[reskin] weapons answered: Greataxe = greataxe
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (bestial)
[reskin] print canon trait: Bloodied Frenzy — "a berserker who flies into an unstoppable rage once per day when wounded" is the Berserker (print's own row)
[reskin] row binds its clause: "Rage-Blood Charge" answers "flies into an unstoppable rage once per day when wounded" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Bursting Fury" answers "flies into an unstoppable rage once per day when wounded" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "flies into an unstoppable rage once per day when wounded" -> "Rage-Blood Charge" — trigger: asked on_being_hit, row reads at_will
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Chamber Breaker — bands soft

**Concept:** a monk of the open hand who strikes pressure points

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Chamber Breaker | 5 (2014) | skirmisher-3 | ok | SOFT: band | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 3.5 (print at 5 reads 2.5–9.5, n=25)
- gates · soft · ko-at-will: Actions/Two-Finger Strike: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- **dropped clause:** "strikes pressure points"
- read: def 3 / off 4 → 3.5; sustained 32 (2 × Two-Finger Strike); nova none; dmg 32

```
Chamber Breaker
Medium humanoid, lawful neutral
Armor Class

15 (chain shirt)

Hit Points: 

97 (15d8 + 30)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


12 (+1)

	

16 (+3)

	

14 (+2)

	

8 (-1)

	

12 (+1)

	

8 (-1)

Skills: 

Perception +4, Stealth +6

Saving Throws: 

DEX +6

Senses: 

passive Perception 14

Languages: 

Common

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Fleet Agility. As a bonus action, the breaker takes the Dash or Disengage action.
Patient Defense. As a bonus action, the breaker takes the Dodge action.
Riposte (Reaction). When a creature within 5 feet of the breaker misses it with a melee attack, the breaker makes one Two-Finger Strike attack against that creature.

Actions
Multiattack: The breaker makes two attacks: one with its Two-Finger Strike and one with its Tossed Needle.
Two-Finger Strike: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) piercing damage. Once on each of the breaker's turns when it hits with this attack, the target is subjected to the following effect. The target must succeed on a DC 14 Constitution saving throw or be stunned until the end of the breaker's next turn.
Tossed Needle: Ranged Weapon Attack: +6 to hit, range 20/60 ft., one target. Hit: 12 (2d8 + 3) piercing damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Two-Finger Strike — a declared feature; the GM's clause "a monk of the open hand"
- Actions/Tossed Needle — the chassis
- Bonus Actions/Fleet Agility — the chassis
- Bonus Actions/Patient Defense — template patient-defense; monk kit; the GM's clause "a monk of the open hand"
- Reactions/Riposte — template riposte; library draw (seed unstamped); binds the GM's words: opening

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=grapple — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("monk of the open hand who strikes pressu") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/mind mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple
[concept] signature elements: pressure-point strikes that numb and paralyze limbs [behavior] | dart-in, dart-out pack tactics [behavior] | two-finger nerve strike [body]
[concept] identity: This pressure-point monk opens with a feint, then darts in along a flank to land a two-finger strike on a joint or nerve cluster that leaves its target numb and staggering, retreating before the return blow can fall. Every round after that it circles with packmates, hunting for the moment a victim's guard drops so it can shut down a limb and let the others finish the work. Focused and disciplined, it fights until badly bloodied (below half its hits) and then disengages rather than die for a fight it cannot win.
[concept] lore: Raised in a monastery whose open-hand forms were built to disable rather than kill, these monks wander as hired subduers and debt-collectors, breaking a target's body at the joints so the message is carried home alive.
[reskin] donor: skirmisher-3 -> CR 5
[reskin] row evicted for the cap: Traits/"Flowing Step" (chassis filler) leaves so "Patient Defense" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: monk — "a monk of the open hand": Stunning Strike (stunning-strike, rides Two-Finger Strike), Patient Defense (patient-defense)
[reskin] inline declared: "the breaker" — the call's own answer (kind), built from the name
[reskin] inline form: "the breaker" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a monk of the open hand" -> has (descriptive), head | "strikes pressure points" -> has (mechanical) [asked: on_hit/condition]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The breaker reads the way its victim's guard has slipped — a swing that missed, a stumble, a blow from a packmate — and surges forward, pushing off a wall or a fallen foe to close the distance in a single lunge. The movement is a dart, not a charge: it ends right at the target's open side, and every foe who was crowding that target suddenly finds the breaker among them, striking the exposed joint." [reaction/on_being_hit/movement] — menu: snap-shot, riposte (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] value check: "Slipped-Guard Lunge" EV 11.1 vs floor 2.8 (a reaction (free)) — worth the trade
[reskin] signature template: riposte -> Reactions/"Slipped-Guard Lunge" ("the breaker reads the slipped guard and surges forward to strike the exposed joi [verb: opening:concept]")
[reskin] keys spent by the action: opening
[reskin] signature idea (trait): "The breaker's discipline is a bodily one: it never overcommits. Spending itself fully in one exchange leaves it winded, so it paces its blows and its footwork in a measured rhythm, always keeping enough in reserve to slip back out of reach the moment the fight turns." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: guarded-stance — the key word does not mean the mechanic here
[reskin] trait declined: "Measured Withdrawal" — a shape fit with no verb match on a Humanoid body; a meat body earns its trait by a verb
[reskin] feature name: "Slipped-Guard Lunge" -> "Riposte"
[reskin] weapons answered: Two-Finger Strike = none; Tossed Needle = none
[reskin] weapon table: "Tossed Needle" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] asked but unanswered: "strikes pressure points" asked for on_hit and no row binds the clause
audit finding below confidence gate: Two-Finger Strike The Stunned condition here has a fixed duration (until end of the breaker's next turn), which is rules-legal counterplay, but the once-per-turn hit requirement combined with no repeat save is gated only by frequency — verify the target has agency; the duration clause does provide a fixed end, so this is likely fine. Re-reading: duration is stated, so counterplay exists.
audit finding below confidence gate: Two-Finger Strike The nested conditional (on hit, once per turn, then a saving throw, then a condition) requires the GM to track a per-turn bookkeeping flag mid-combat for a low-cost melee attack; the resolution chain is awkward but arguably resolvable.
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Pip Burrowwise — in the run

**Concept:** a halfling scout who ducks behind her allies and hides between shots

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Pip Burrowwise | 3 (2014) | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 3 → 2.5; sustained 22 (2 × Shortsword); nova none; dmg 22

```
Pip Burrowwise
Small humanoid, neutral
Armor Class

13 (leather)

Hit Points: 

58 (13d6 + 13)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


11 (+0)

	

14 (+2)

	

12 (+1)

	

11 (+0)

	

13 (+1)

	

11 (+0)

Skills: 

Perception +3, Stealth +6

Saving Throws: 

DEX +4

Senses: 

passive Perception 13

Languages: 

Common plus one other language, Halfling

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Ducks Behind Her Allies. While Pip is within 5 feet of an ally who is not incapacitated, Pip has half cover against ranged attacks made by creatures that are not within 5 feet of that ally.
Evasion. If Pip is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Pip instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it is incapacitated.
Cunning Action. As a bonus action, Pip takes the Dash, Disengage, or Hide action.

Actions
Multiattack: Pip makes two attacks, using Shortsword or Longbow.
Shortsword: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 11 (2d8 + 2) piercing damage.
Longbow: Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 9 (2d6 + 2) piercing damage.
```

**Where each row came from**

- Traits/Ducks Behind Her Allies — authored for this sheet; the GM's clause "ducks behind her allies"
- Traits/Evasion — template evasion; rogue kit; the GM's clause "hides between shots"
- Actions/Multiattack — the chassis
- Actions/Shortsword — print's own row, renamed; weapon shortsword
- Actions/Longbow — print's own row, renamed; weapon longbow
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "hides between shots"

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("ducks behind her allies and hides betwee") | skirmisher-skulker: key "hides" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/grasping mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: ducking behind allies for cover [behavior] | hiding between shots to strike with advantage [behavior] | sling and short blade of a halfling scout [object]
[concept] identity: A small halfling skulker who opens by slipping behind a larger ally's back, then snap-shooting from cover the moment a target turns its attention away. Every round she fires once and re-stows herself in the lee of a body or shadow, so enemies must fight her friends to reach her; cornered and bloodied, she bolts for the nearest hole rather than trade blows.
[concept] lore: She was the youngest scout of a halfling border-militia and learned that the burrow-wise survive by letting the tall folk take the blows, and now sells that cowardly, effective skill to whoever pays.
[reskin] print canon array: STR 11, DEX 14, CON 12, INT 11, WIS 13, CHA 11 — the Scout's, DEX fitted to +4
[reskin] donor: skirmisher-3-skulker -> CR 3
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] print canon: "a halfling scout who ducks behind her allies and hides between shots" heads on the Scout — print's rows ride along; the seat stays
[reskin] implied class kept: "rogue" on the GM's own words "hides between shots" — the key table found none
[reskin] class kit: Cunning Action — the sheet already carries it, so the rogue kit adopts that row: the cap may no longer read it as filler
[reskin] row evicted for the cap: Traits/"Scurry" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "hides between shots": Evasion (evasion)
[reskin] inline declared: "Pip" — the call's own answer (person), built from the name
[reskin] inline form: "Pip" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 12 (8 + PB 2 + the sheet's best 2) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a halfling scout" -> has (descriptive), head | "ducks behind her allies" -> has (mechanical) [asked: buff_self] | "hides between shots" -> has (mechanical) [asked: buff_self]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When Pip fires from hiding at a foe that is focused on one of her allies, the shot lands where it hurts and staggers the target's footing, so it stumbles a step off its mark. The trick only works while that ally is still standing and drawing attention; against a foe with no one else to watch, Pip gets nothing but an ordinary arrow." [rider/on_hit/movement] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] word match declined by the call: bolt-mark, delayed-brand, patient-defense, aggro-curse, feint-slip, affliction, contagion, charge-push, hook-rider, pounce, isolation — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When Pip fires from hiding at a foe that is focused on one of her allies, the shot lands where it hurts and staggers the target's footing, so it stumbles a step off its mark. The trick only works while that ally is still standing and drawing attention; against a foe with no one else to watch, Pip gets nothing but an ordinary arrow." [rider/on_hit/movement] — the model found no template that holds it (offered: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, delayed-brand, patient-defense, aggro-curse, feint-slip)
[reskin] fallback stands down: "a halfling scout who ducks behind her allies and hides between shots" heads on the Scout and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Pip reads the room before anyone else moves, and the first time a fight turns against her she is already gone — slipping away from the nearest threat before blows land and putting a body, a corner, or a hole between herself and danger. She gets this one clean escape per fight and must earn the rest with her feet." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Pip reads the room before anyone else moves, and the first time a fight turns against her she is already gone — slipping away from the nearest threat before blows land and putting a body, a corner, or a hole between herself and danger. She gets this one clean escape per fight and must earn the rest with her feet." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] repair: 1 clause(s) with no row — "ducks behind her allies"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Dagger = dagger; Sling = sling
[reskin] weapon table: "Sling" — a launcher, never thrown, range 30/120
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] print canon languages: "Common, Halfling" -> "Common plus one other language, Halfling" — the Scout's plus the concept's Halfling
[reskin] print canon attack: "Dagger" -> "Shortsword" — the Scout's own row
[reskin] print canon attack: "Sling" -> "Longbow" — the Scout's own ranged row
[reskin] 2024 caps: "Ducks Behind Her Allies" — a condition or game term shipped lowercase
[reskin] lint actuator: "adjacent" -> "within 5 feet" in "Ducks Behind Her Allies"
audit finding below confidence gate: Ducks Behind Her Allies The cover condition's dependence on the attacker's position relative to the ally is adjudicable but the trait's benefit never states it requires the attacker to be at range (cover vs ranged only) while the fiction name promises ducking behind allies generally; more concretely, half cover against ranged attacks is already a valid cover rule, but the clause mixes attacker-proximity qualifier oddly—however, the true defect is that this is a non-issue; remove finding.
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Sandlot Champion — in the run

**Concept:** a skeleton who was a gladiator in a former life

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sandlot Champion | 4 (2014) | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 3 → 3; sustained 24 (2 × Shortsword); nova none; dmg 24

```
Sandlot Champion
Medium undead, lawful evil
Armor Class

17 (natural armor)

Hit Points: 

78 (12d8 + 24)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

16 (+3)

	

15 (+2)

	

6 (-2)

	

8 (-1)

	

5 (-3)

Skills: 

Athletics +5, Perception +1

Saving Throws: 

CON +4, WIS +1

Damage Vulnerabilities: 

bludgeoning

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 60 ft., passive Perception 11

Languages: 

understands Common plus one other language but can't speak

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Riposte (Reaction). When a creature within 5 feet of the champion misses it with a melee attack, the champion makes one shortsword attack against that creature.

Actions
Multiattack: The champion makes two attacks, using Shortsword or Shortbow.
Shortsword: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) piercing damage.
Shortbow: Ranged Weapon Attack: +5 to hit, range 80/320 ft., one target. Hit: 12 (2d8 + 3) piercing damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Shortsword — print's own row, renamed; weapon shortsword
- Actions/Shortbow — print's own row, renamed; weapon shortbow
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "gladiator"

**Engine trace**

```
[route] defender type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a skeleton who was a gladiator in a form") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Undead themes=grave/armed mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shield-and-blade gladiator stance [object] | holding the line as a champion of the arena [behavior] | punishing anyone who tries to slip past [behavior]
[concept] identity: The Coliseum's Champion rises by planting its shield and letting the fight come to it, then lashing out with a gladius on the first opening. Every round after that it works the crowd's rhythm — probing with measured sword-lunges and using its shield wrist to lock down anything that tries to slip past toward whatever it is guarding. It does not break and does not run; it fights like the match is still being scored, patient and pitiless, punishing retreat as readily as advance.
[concept] lore: A gladiator who fought to the death in the arena and was raised again — still wearing the shield and blade of the sandpit, still moving by the champion's rules, standing guard over ground it considers its own. It wants an opponent worthy of the roar of the crowd, and it never surrenders the sand.
[reskin] print canon array: STR 16, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +5
[reskin] donor: defender-3 -> CR 4
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "a skeleton who was a gladiator in a former life" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Ranged Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] implied class kept: "fighter" on the GM's own words "gladiator" — the key table found none
[reskin] class kit: fighter — "gladiator": Riposte (riposte)
[reskin] inline declared: "the champion" — the call's own answer (kind), built from the name
[reskin] inline form: "the champion" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton" -> has (descriptive), head | "was a gladiator in a former life" -> has (descriptive)
[reskin] signature idea (action): "The champion slams its shield into the ground and plants itself, daring the enemy to come onto its sand. Until the start of its next turn, any foe that moves toward it or tries to slip past it gets cut — the gladius lashes out at the first creature that closes in or turns its back to run, and again at anyone who tries to go around rather than through. It cannot chase while planted; the line holds " [trait/start_of_turn/condition] — menu: fire-aura, warded-mending (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, charge-push, hook-rider)
[reskin] word match declined by the call: shield-bash, push-prone, herd, own-turn-punisher, rally, fire-aura, warded-mending — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The champion slams its shield into the ground and plants itself, daring the enemy to come onto its sand. Until the start of its next turn, any foe that moves toward it or tries to slip past it gets cut — the gladius lashes out at the first creature that closes in or turns its back to run, and again at anyone who tries to go around rather than through. It cannot chase while planted; the line holds " [trait/start_of_turn/condition] — the model found no template that holds it (offered: fire-aura, warded-mending, shield-bash, push-prone, herd, own-turn-punisher, rally)
[reskin] fallback respects the call: push-prone, herd, own-turn-punisher left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "a skeleton who was a gladiator in a former life" heads on the Skeleton and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 17 already beats print's AC 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The champion fights to the roar of a crowd only it can hear, and the crowd rewards aggression against a wounded foe. Whenever it strikes a creature that is already hurt, the sand and the dead register it as a scoring blow, and the champion presses harder, following up with another quick cut at the same target." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, guarded-stance, berserk, terrain-walk — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The champion fights to the roar of a crowd only it can hear, and the crowd rewards aggression against a wounded foe. Whenever it strikes a creature that is already hurt, the sand and the dead register it as a scoring blow, and the champion presses harder, following up with another quick cut at the same target." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
[reskin] weapons answered: Gladius = shortsword; Shield Bash = none
[reskin] weapon declared: "Gladius" is a shortsword — the call's own answer
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon attack: "Gladius" -> "Shortsword" — the Skeleton's own row
[reskin] print canon attack: "Thrown Gladius" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Quarry Stamp — in the run

**Concept:** a crushing press of stone that squeezes but never holds

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Quarry Stamp | 6 (2014) | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Slam); nova none; dmg 42

```
Quarry Stamp
Large construct, unaligned
Armor Class

13 (natural armor)

Hit Points: 

110 (13d10 + 39)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

8 (-1)

	

16 (+3)

	

6 (-2)

	

10 (+0)

	

4 (-3)

Skills: 

Athletics +6, Perception +3

Saving Throws: 

STR +6, CON +6

Damage Immunities: 

lightning, poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

understands the languages of its creator but can't speak

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Squeeze. When the stamp moves through a space at least 5 feet wide, the stamp can squeeze through a space at least 5 feet wide without spending extra movement, and it doesn't treat such a space as difficult terrain.
Lightning Absorption. Whenever the stamp is subjected to lightning damage, it takes no damage and instead regains a number of hit points equal to the lightning damage dealt.
Immutable Form. The stamp can't shape-shift.
Magic Resistance. The stamp has advantage on saving throws against spells and other magical effects.
Crushing Rebuke. As a bonus action, the stamp chooses one creature within 5 feet that hit the stamp with an attack roll since the end of the stamp's last turn; the creature takes 7 (2d6) bludgeoning damage.

Actions
Multiattack: The stamp makes two Slam attacks.
Slam: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage.
```

**Where each row came from**

- Traits/Squeeze — authored for this sheet; the GM's clause "squeezes"
- Traits/Lightning Absorption — the chassis
- Traits/Immutable Form — the chassis
- Traits/Magic Resistance — the chassis
- Actions/Multiattack — the chassis
- Actions/Slam — the chassis
- Bonus Actions/Crushing Rebuke — library seed own-turn-punisher

**Engine trace**

```
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a crushing press of stone") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Construct themes=forged/grasping mind=mindless style=juggernaut energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: squeezing stone jaws that release and re-strike [behavior] | a piled, slab-built press of a body [body]
[concept] identity: A stone press animated by an impatient, grinding will, it lurches forward and slams both of its great paws around a target to crush and squeeze — then, unable to hold, it releases and rears back to strike again rather than keep a grip. Every round after the first it winds up and slams shut on whatever is nearest, shifting its footing to trap foes against walls and terrain where its bulk can do the work. It has no notion of mercy or retreat; when badly damaged it simply squeezes faster and harder, fighting to the last chip of itself.
[concept] lore: Poured in an old quarry's ritual mold to pack ore and rubble into transportable blocks, the press outlived its makers and now crushes anything between it and the road it was never meant to leave.
[reskin] donor: brute-5-juggernaut -> CR 6
[reskin] inline declared: "the stamp" — the call's own answer (kind), built from the name
[reskin] inline form: "the stamp" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: "never holds"
[reskin] clauses: "a crushing press of stone" -> has (descriptive), head | "squeezes" -> has (mechanical) [asked: on_hit/condition] | "never holds" -> LACKS (mechanical) [asked: condition]
[reskin] signature idea (action): "The stamp winds up and slams both paws shut on a target it can reach, crushing it and driving it backward to smash into whatever wall, boulder, or terrain lies behind it — the strike gains teeth only when the victim has nowhere left to go. If something is pinned against an obstacle by that shove, the press keeps grinding down on it for extra damage before the jaws spring open." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider, pounce (+ shelf: leap, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] word match declined by the call: push-prone, charge-push, hook-rider, stunning-strike — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The stamp winds up and slams both paws shut on a target it can reach, crushing it and driving it backward to smash into whatever wall, boulder, or terrain lies behind it — the strike gains teeth only when the victim has nowhere left to go. If something is pinned against an obstacle by that shove, the press keeps grinding down on it for extra damage before the jaws spring open." [rider/on_hit/damage] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, pounce, push-prone, leap, ground-burst, wind-up)
[reskin] fallback respects the call: push-prone left the shelf — the call declined it for this sheet
[reskin] fallback skipped by the floor: herd (EV 7.4 vs 32.1)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 3.1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The quarry press grinds faster the more stone it loses: once it has been badly chipped, its jammed slabs scrape together with a shriek and it lunges into its next slams with fresh speed, squeezing harder as it comes apart." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] pick kept on the GM's own words: trait — "adhesive" has no key-table verb, but the call quotes "squeezes but never holds" from the description
[reskin] signature template (trait): adhesive -> Traits/"Grinding Press" ("The press squeezes but never holds — it grips anything that touches it and traps [shape fit, no verb match]")
[reskin] repair: 1 clause(s) with no row — "squeezes"; one targeted call with the sheet as context
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Slam = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] immunities stamped for type: Construct -> Lightning, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] ask vs row MISMATCH: "squeezes" -> "Squeeze" — trigger: asked on_hit, row reads at_will
[reskin] audit rename: "Answering Sting" -> "Crushing Rebuke"
[reskin] lacks clause: Traits/"Grinding Press" leaves — "never holds" takes grapple
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Tolling Bell-Diver — in the run

**Concept:** a drowned bell-diver who rises from the harbour mud

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Tolling Bell-Diver | 4 (2014) | lurker-1-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 4 → 4; sustained 27 (1 × Chain); nova none; dmg 27

```
Tolling Bell-Diver
Medium undead, neutral
Armor Class

11

Hit Points: 

78 (12d8 + 24)

Speed: 

5 ft., fly 50 ft. (hover), burrow 30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


1 (-5)

	

16 (+3)

	

14 (+2)

	

10 (+0)

	

10 (+0)

	

11 (+0)

Skills: 

Stealth +5

Saving Throws: 

DEX +5

Damage Resistances: 

bludgeoning, piercing, slashing

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained

Senses: 

darkvision 60 ft., passive Perception 10

Languages: 

Common plus the languages it knew in life

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Rises from the Harbour Mud. While the bell-diver is in contact with mud, silt, or shallow harbour water, the bell-diver can hide in the muck as a bonus action, and creatures that fail a DC 13 Wisdom check do not notice it until it rises.
Incorporeal Movement. The bell-diver can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
Sunlight Sensitivity. While in sunlight, the bell-diver has disadvantage on ability checks and attack rolls.

Actions
Chain: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 11 (2d10) necrotic damage.
Creeping Dread: One creature within 60 feet of the bell-diver must succeed on a DC 13 Wisdom saving throw or be frightened of the bell-diver until the end of the bell-diver's next turn. If the target was already frightened by this ability, it also takes 27 (6d8) necrotic damage.
```

**Where each row came from**

- Traits/Rises from the Harbour Mud — authored for this sheet; the GM's clause "rises from the harbour mud"
- Traits/Incorporeal Movement — the chassis
- Traits/Sunlight Sensitivity — the chassis
- Actions/Chain — the chassis
- Actions/Creeping Dread — library seed escalating-dread

**Engine trace**

```
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("a drowned bell-diver who rises from the ") | lurker-phantom: key "drowned" (class body)
[concept] resolve: archetype=lurker type=Undead themes=grave/aquatic mind=sapient style=phantom energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: rises from the harbour mud [behavior] | drowned dive-bell and chain [object] | choking silt and rot cloud [aura]
[concept] identity: The bell-diver rises out of harbour mud with its drowned dive-bell still chained to it, opening the fight by engulfing prey in a choking cloud of silt and rot while it drags them down toward water. Each round it lurches forward on bloated limbs to seize a target, pulling them into the murk where its bilge-heavy fists and crushing chain work, then sinking back into the muck when cornered to strike again from the water. When bloodied it fights to the death, ringing its bell in a slow, taunting toll as it tries to drag one last victim down with it.
[concept] lore: A bell-diver drowned when the chain of their dive-bell caught on harbour wreckage, and the mud keeps them, tolling their bell to lure the living down to where the water is deep and dark.
[reskin] donor: lurker-1-phantom -> CR 4
[reskin] inline declared: "the bell-diver" — the call's own answer (kind), built from the name
[reskin] inline form: "the bell-diver" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "drowned" names no absence — nothing in it takes anything away
[reskin] clauses: "a drowned bell-diver" -> has (descriptive), head | "rises from the harbour mud" -> has (mechanical) [asked: movement]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The bell-diver hauls on its chain and drags a foe it has already caught in the chain's links straight down into the muck, pulling them off their feet and partly under the harbour silt. Anyone pulled this way is left struggling in the mud, their footing gone and their voice choked with filth, so the diver can lurch in after them on its bloated limbs. It only works on someone the chain has actually " [rider/on_hit/movement] — menu: charge-push, hook-rider, pounce, isolation (+ shelf: leap, seal, wail, lure, active-toll, random-ray, ground-burst, spew, burrow-ambush, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — active-toll, slow-bolt, sensory-strike (bell, mud)
[reskin] word match declined by the call: active-toll, sensory-strike, charge-push, pounce, isolation, hook-rider — the key word does not mean the mechanic here
[reskin] value check: "Silt-Drag Haul" EV 3.7 vs floor 14 (one attack of 1) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Silt-Drag Haul" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: sensory-strike left the shelf — the call declined it for this sheet
[reskin] fallback skipped by the floor: slow-bolt (EV 3.7 vs 14)
[reskin] value check: "Creeping Dread" EV 18.6 vs floor 14 (one attack of 1) — dice 14 → 27
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The drowned dive-bell still tolls with the diver's every lurch, and its slow note sinks into the heads of those nearby, making the deep water feel like the only answer and pulling them a step closer to it. The toll works on anyone close enough to hear it, and those already dragged into the murk feel it strongest." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst, resonant-body, terrain-walk (bell, mud)
[reskin] word match declined by the call: resonant-body, bloodied-burst — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-burst, resonant-body, terrain-walk, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-burst" was ranked first on the call's own menu for bell, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The drowned dive-bell still tolls with the diver's every lurch, and its slow note sinks into the heads of those nearby, making the deep water feel like the only answer and pulling them a step closer to it. The toll works on anyone close enough to hear it, and those already dragged into the murk feel it strongest." [trait/always/movement] — the model found no template that holds it (offered: bloodied-burst, resonant-body, terrain-walk, false-appearance, adhesive, phobia, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] concept-first trait skipped: bloodied-burst — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] concept-first trait skipped: resonant-body — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] repair: 1 clause(s) with no row — "rises from the harbour mud"; one targeted call with the sheet as context
[reskin] repaired sheet: 0 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Chain = none
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
audit finding below confidence gate: Creeping Dread The save is presented as 'Wisdom Saving Throw: DC 13' rather than the 2024 'Wisdom Saving Throw' with a separate DC, but more importantly the Frightened condition here expires at the end of the bell-diver's next turn, which is fine — however, the entry has no failure/success rider for the repeat-save-or-damage clause's timing, leaving the 'already Frightened by this ability' branch with no clear adjudication window.
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Gravechant Swarm — in the run

**Concept:** a swarm of carrion beetles that strips a corpse in a minute

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Gravechant Swarm | 4 (2014) | swarm-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "strips a corpse in a minute"
- read: def 4 / off 4 → 4; sustained 27 (1 × Mandibles); nova none; dmg 27

```
Gravechant Swarm
Medium swarm of Tiny beasts, unaligned
Armor Class

11

Hit Points: 

78 (12d8 + 24)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


8 (-1)

	

16 (+3)

	

14 (+2)

	

4 (-3)

	

10 (+0)

	

2 (-4)

Damage Resistances: 

bludgeoning, piercing, slashing

Condition Immunities: 

charmed, frightened, grappled, paralyzed, petrified, prone, restrained, stunned

Senses: 

tremorsense 30 ft., passive Perception 10

Languages: 

None

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Carrion Miasma. Any creature that starts its turn within 5 feet of the swarm must make a DC 13 Constitution saving throw. On a failed save, the target is poisoned until the start of its next turn. On a successful save, the target is immune to this creature's aura for 24 hours.
Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain hit points or gain temporary hit points.
Carrion Frenzy (1/Day). As a bonus action, immediately after dealing damage to a creature that has half of its hit points or fewer, the swarm moves up to half its speed, and it makes one Mandibles attack.

Actions
Mandibles: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 27 (7d6 + 3) slashing damage, or 12 (2d8 + 3) slashing damage if the swarm has half of its hit points or fewer.
```

**Where each row came from**

- Traits/Carrion Miasma — template noxious-aura; library draw (seed unstamped); binds the GM's words: carrion
- Traits/Swarm — the chassis
- Actions/Mandibles — the chassis
- Bonus Actions/Carrion Frenzy — template rampage; library draw (seed unstamped); binds the GM's words: frenzy

**Engine trace**

```
[route] swarm type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a swarm of carrion beetles" | holds: the call reads none in these words | swarm: ✓ ("a swarm of carrion beetles") | swarm: no line key in the words — the model's read of its quote
[concept] hints: swarm→body ✓ ("a swarm of carrion beetles")
[concept] resolve: archetype=swarm type=Beast themes=devouring/bestial mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: stripping a corpse in a minute [behavior] | a crawling carpet of beetles [body] | splitting into two swarms when bloodied [behavior]
[concept] identity: The swarm opens by surging over the nearest corpse or fallen foe, stripping it to bone in under a minute so the feast-frenzy carries it straight at the living. Every round it flows across flesh as a biting carpet, seeking seams, wounds, and armor gaps; it does not stop, does not tire, and does not retreat — bloodied, the mass simply splits into two starved courts still crawling forward. It has no plan beyond consumption, and this is the whole strategy.
[concept] lore: These beetles are bred in the bone-yards of carrion cults and released where a body must vanish before the sun rises, and their only want is the next meal, moving and screaming.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] donor: swarm-3 -> CR 4
[reskin] swarm type stamped: Beast -> Swarm of Tiny Beasts
[reskin] inline declared: "the swarm" — the call's own answer (kind), built from the name
[reskin] inline form: "the swarm" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a swarm of carrion beetles" -> has (descriptive), head | "strips a corpse in a minute" -> has (mechanical)
[reskin] menu pruned: action — aggro-curse, self-invisibility, focus, feint-slip, coating, phase-slip, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, delayed-brand, zone-seed, blighted-ground (the sheet cannot render them)
[reskin] signature idea (action): "The swarm pours over a corpse, a dying creature, or a heap of offal and strips it in a blur of mandibles, tearing it down to bare bone in moments. That frantic feeding whips the whole mass into a frenzy, letting it surge forward in a sudden crawl across the ground toward the nearest living thing before the bones even stop rattling." [bonus_action/always/movement] — menu: rampage, patient-defense, second-wind (+ shelf: trample, leap, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] value check: "Carrion Frenzy (1/Day)" EV 22.8 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] signature template: rampage -> Bonus Actions/"Carrion Frenzy (1/Day)" ("The feeding frenzy whips the swarm into a surge toward the nearest living thing, [verb: frenzy:idea]")
[reskin] signature idea (trait): "The beetles never stop crawling over whatever they are devouring, seeking seams and wounds and armor gaps; a creature that shares its space with the swarm finds them pouring into every opening, so the longer it stays among them the worse the biting gets, and tearing one away only reveals another already burrowing." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — noxious-aura, undead-fortitude (carrion, corpse)
[reskin] word match declined by the call: undead-fortitude, absorption — the key word does not mean the mechanic here
[reskin] signature template (trait): noxious-aura -> Traits/"Burrowing Tide" ("the beetles crawl into every seam and wound, so a creature sharing the swarm's s [verb: carrion:concept]")
[reskin] repair: 1 clause(s) with no row — "strips a corpse in a minute"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Mandibles = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] immunities stamped for type: Swarm of Tiny Beasts + donor suite -> Charmed, Frightened, Grappled, Paralyzed, Petrified, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] bloodied half re-derived: "Mandibles" — 11 (2d8 + 2) -> 12 (2d8 + 3), half of the main 27 on the main's own +3 (print's ratio and print's modifier)
audit finding below confidence gate: Burrowing Tide The aura has no duration or end condition beyond the immediate save, so Poisoned is the only persisting state and it already ends at the start of the target's next turn — but the trait never states whether the aura is always active, when the emanation is anchored, or whether it persists while the swarm moves; a GM cannot adjudicate when a creature 'starts its turn' relative to a moving emanation.
[reskin] audit rename: "Burrowing Tide" -> "Carrion Miasma"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Review batch — features-tail-2026-10-19T01-10-38

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

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


### Black Fletching Archer — a 2014 sheet

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


### Sinkhole Troll — one marked soft

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

