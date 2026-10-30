# Release table for the critic — 2014 blocks — 2026-10-30

The case is at the top of the 2024 file (RELEASE-for-critic-2024-2026-10-30-fixes.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

## Review batch — sweep-2026-10-30T02-34-52

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Bog Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |
| Owlbear | 3 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Chapel Bell-Ringer | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 7/7 |
| Air Elemental | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Scree-Wight | 5 (2014) | 2014 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Ramshackle Battering Golem | 8 | 2024 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 6/6 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Drowned Choirmaster | 10 (2014) | 2014 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 1/6 |
| Vampire | 13 (2014) | 2014 | brute-13 | ok | ok | ok | ok | ok | ok | ok | SOFT: orphan-condition-ref, orphan-condition-ref | ok | ok | soft (1) | 0/1 | 11/11 |
| Plague Archon | 13 | 2024 | skirmisher-13-winged | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 6/7 |
| Purple Worm | 15 | 2024 | brute-13 | ok | FAIL: single-target-ceiling | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 5/5 |
| Glacier Heart | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: single-target-ceiling, band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 6/6 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 0/1 | 9/9 |
| Brass Tyrant | 17 | 2024 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 7/9 |
| Pit Fiend | 20 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 9/9 |
| Bone Sun Archlich | 20 (2014) | 2014 | caster-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 11/11 |
| Ancient Gold Dragon | 24 (2014) | 2014 | — | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | — | — |
| Trench Bellower | 24 | 2024 | brute-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/8 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Vashka the Red | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/5 |
| Hive Rot Scyther | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 4/6 | 4/5 |
| Iron Gate Warden | 11 (2014) | 2014 | brute-9-juggernaut | ok | user-set: AC 20 · reads CR 10.5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 3/3 | 2/6 |
| Mirewitch Sable | 7 | 2024 | caster-8-binder | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 4/5 |
| Defrocked Templar | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 4/4 |
| Ilvareth Dusksong | 12 (2014) | 2014 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Swarm of Unmourned Tolls | 13 | 2024 | swarm-9 | ok | FAIL: single-target-ceiling | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/2 | 4/4 |
| Reliquary Ooze | 9 (2014) | 2014 | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 4/5 |
| Squallwing Drake | 7 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Boulder Exile | 9 (2014) | 2014 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 4/4 |
| Reed-Cloister Adept | 5 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | FAIL: damage-dice | ok | ok | FAIL (1) | 1/1 | 6/6 |
| Krennik Skullstandard | 4 (2014) | 2014 | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 5/6 |
| Wellthing | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/3 |
| Chok | 4 | 2024 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 7/14 | 4/4 |
| Meshrin | 8 (2014) | 2014 | skirmisher-8-hurler | ok | user-set: AC 16, HP 120 · reads CR 6.5 | SOFT: lint:hp-formula | ok | ok | ok | ok | ok | ok | ok | soft (1) | 8/8 | 7/7 |
| Oathsworn Remains | 6 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Garrick One-Axe | 5 (2014) | 2014 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 4/4 |
| Brother Halric | 3 (2014) | 2014 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |

**Dropped 17 of 60 GM clauses** (coverage 72%); concept share 86% (179/207 rows). A run with zero fails and 60% coverage is a failing run. 1 blank-path sheet(s) excluded — the engine writes their description, so scoring it is self-scoring (Chok 7/14).
**Fails by seat and gate:**
- brute-13 / bands: 1
- swarm-9 / bands: 1
- skirmisher-3 / adjudicability: 1



---


### Bog Hound — a 2014 sheet

**Concept:** a mud-caked bog hound that drags fishermen under

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bog Hound | 1 (2014) | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

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

Drag Under. While the hound is in water and has a creature grappled, the hound pulls the grappled creature beneath the surface, moving it with the hound and holding it under; the creature must hold its breath or begin suffocating as the hound drags it down.
Swallow. As a bonus action, the hound swallows one Medium or smaller creature it is grappling. While swallowed, the target is blinded and restrained, has total cover against attacks and other effects outside the hound, and takes 3 (1d6) acid damage at the start of each of the hound's turns. The hound can have only one creature swallowed at a time. If the hound takes 5 damage or more in a single turn from the swallowed creature, the hound must regurgitate the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the hound. If the hound dies, a swallowed creature exits the body prone by using 5 feet of movement.

Actions
Multiattack: The hound makes two Bite attacks.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Bite — the chassis
- Bonus Actions/Swallow — binds the GM's words: swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon+whelm
- Traits/Drag Under — authored for this sheet; the GM's clause "drags fishermen under"

**Engine trace**

```
[path] homebrew — "a mud-caked bog hound that drags fishermen under" (call)
[route] brute-grappler type=Beast mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "drags fishermen under" | brute-grappler: ✓ ("drags fishermen under") | brute-grappler: no line key in the words — the model's read of its quote
[concept] hints: engulf→mechanics ✓ ("drags fishermen under")
[concept] resolve: archetype=brute type=Beast themes=bestial/aquatic mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: drags prey under the water to drown it [behavior] | mud-caked hiding in the shallows [body] | crushing jaws that lock and do not let go [body]
[concept] identity: The bog hound stays submerged in the muck, only nostrils and muck-slicked eyes breaking the surface, until a fisherman's line or footfall comes within reach — then it lunges from below, jaws locking onto a leg or arm. Every round after that it works backward, dragging its thrashing victim toward deep water to drown and swallow them whole. It is patient and utterly bestial, holding its grip even as it is struck, and it will not abandon prey it has already bitten unless the pain is overwhelming.
[concept] lore: A mud-caked beast born from the drowned shallows where fishermen vanish, the bog hound is a living sinkhole that drags the living down to feed where it lairs.
[reskin] donor: brute-5-grappler -> CR 1
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] engine interior scaled — CR 1 sits below the brute-5-grappler seat
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the hound" — the call's own answer (kind), built from the name
[reskin] inline form: "the hound" — the model's own reading of the name
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a mud-caked bog hound" -> has (descriptive), head | "drags fishermen under" -> has (mechanical) [asked: on_hit/condition] [askMechanic: grapple]
[reskin] body verdicts: 29 of 29 answered; not true of this body: drain, sealed-body, noxious-aura, energy-aura, heated-body, bloodied-burst, death-burst, life-drain, shell-withdraw, resonant-body, marking-light, gaze-aura, mimicry, relic-object, warded-mending, herd, rally, active-toll, absorption, aberrant-ground, web-walker
[reskin] signature idea (action): "The bog hound sinks into the muck as a bonus action, becoming nearly indistinguishable from the mud, and any creature that moves within its reach while it lies submerged must succeed on a Wisdom saving throw or be Grappled as the jaws close on its leg." [bonus_action/save/condition] [family: mark] — menu: second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, coating (+ shelf: shield-bash, spew, thrown-burst-seed, wind-up, exploiter, lure, pacify, sensory-strike, reveal, contagion, charge-push, pounce)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: aggro-curse (save/movement), thrown-burst-seed (save/damage), exploiter (save/damage)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition when=on_hit
[reskin] word match declined by the call: aggro-curse, exploiter, own-turn-punisher — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "self-invisibility" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: grants hidden concealment in the terrain and grapples any creature that moves in)
[reskin] pick kept on the GM's own words: action — "self-invisibility" has no key-table verb, but the call quotes "a mud caked bog hound that drags fishermen under" from the description
[reskin] value check: "Muck Ambush (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Muck Ambush (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: exploiter, own-turn-punisher left the shelf — the call declined them for this sheet
[reskin] value check: "Driving Bellow (2/Day)" EV 1.2 vs floor 10.1 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The bog hound moves through mud, marsh, and shallow water without penalty, and its muck-slicked hide grants it advantage on Dexterity (Stealth) checks made to hide there; it leaves no visible trail through the muck, only stirred water." [trait/always/movement] [family: breach] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — grapple: adhesive
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: adhesive (always/condition), spider-climb (always/movement), terrain-walk (always/movement)
[reskin] keys would have bound: trait — terrain-walk (bog, mud)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition when=on_hit
[reskin] word match declined by the call: adhesive, terrain-walk, relentless-pursuit, false-appearance, faultless-tracker — the key word does not mean the mechanic here
[reskin] closest refused: trait — "terrain-walk" was named nearest, but the call declined it for collision ("collision") — the word suggests this mechanic and the row does not carry it; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: grapples and Restrains a creature it hits, then swallows and acid-burn)
[reskin] decline reason: trait — the call answered none and names it "collision" — the GM's words key terrain-walk, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "terrain-walk" is keyed by the GM's bog+mud and was on the call's menu, which the call read as a collision, not the mechanic; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "The bog hound moves through mud, marsh, and shallow water without penalty, and its muck-slicked hide grants it advantage on Dexterity (Stealth) checks made to hide there; it leaves no visible trail through the muck, only stirred water." [trait/always/movement] — the model found no template that holds it (offered: adhesive, spider-climb, terrain-walk, relentless-pursuit, bound, false-appearance, phobia, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, undead-fortitude, kill-denial, truth-aura, fear-aura)
[reskin] concept-first trait skipped: terrain-walk — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] repair: 1 clause(s) with no row — "drags fishermen under"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced []
[reskin] condition relation: "Drag Under" — the call reads its condition as requires, so no condition is recorded against it
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 4 on a Beast speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "a mud-caked bog hound that drags fisherm" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] ask vs row MISMATCH: "drags fishermen under" -> "Drag Under" — trigger: asked on_hit, row reads at_will
[reskin] [gap] grants hidden concealment in the terrain and grapples any creature that moves into its reach without requiring an attack — "The bog hound sinks into the muck as a bonus action, becoming nearly indistinguishable from the mud, and any creature that moves within its reach while it lies submerged must succeed on a Wisdom saving throw or be Grappled as the jaws close on its leg." — Bog Hound [seat: action [bonus_action/save/condition]] (closest offered: self-invisibility) [effect: condition] [menu: aggro-curse thrown-burst-seed exploiter second-wind own-turn-punisher self-invisibility focus coating] [same-cell unoffered: swallow gaze-single snare seal shield-bash lure random-ray pacify escalating-dread terror-pulse snare-bolt sensory-strike push-prone reveal] [same-seat rejected: none] [VETOED AFTER ACCEPTANCE: self-invisibility never reached the sheet — died at the value floor (EV under the bonus action it replaces)]
[reskin] [gap] grapples and Restrains a creature it hits, then swallows and acid-burns it — "The bog hound moves through mud, marsh, and shallow water without penalty, and its muck-slicked hide grants it advantage on Dexterity (Stealth) checks made to hide there; it leaves no visible trail through the muck, only stirred water." — Bog Hound [seat: trait [trait/always/movement]] (closest offered: terrain-walk) [effect: condition] [menu: adhesive spider-climb terrain-walk relentless-pursuit bound false-appearance phobia faultless-tracker bloodied-fury blood-frenzy pack-tactics uncanny-sense shielded-mind undead-fortitude kill-denial truth-aura fear-aura] [same-cell unoffered: blink aberrant-ground web-walker earth-glide tunneler zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: aberrant-ground:legality web-walker:legality death-restoration:legality earth-glide:legality tunneler:legality berserk:legality evasion:role marking-light:legality sealed-body:legality relic-object:legality guarded-stance:role mimicry:legality assassinate:role blurred-form:role death-burst:legality] [row dropped]
[reskin] signature outcome: 2 of 2 accepted signature pick(s) never reached the sheet — 1x the value floor, 1x the call named no template for the pick
[reskin] signature tally: 1 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 2 of 2 (1x the value floor, 1x the call named no template for the pick) · path homebrew
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

Spider Climb. The owlbear can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The owlbear makes two Rend attacks.
Rend: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.
```

**Where each row came from**

- Traits/Spider Climb — template spider-climb; library draw (seed unstamped); the GM's clause "has learned to climb"; binds the GM's words: climb+climbs+climbing+ceilings+walls+wall+cling+sheer
- Actions/Multiattack — the chassis
- Actions/Rend — print's own row, renamed

**Engine trace**

```
[path] twist — Owlbear (is) — "Name field: Owlbear" (code)
[route] skirmisher-skulker type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("learned to climb") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] name: "Owlbear" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Monstrosity themes=bestial/subterranean mind=bestial style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: none claimed
[concept] signature elements: cliff-clinging ambush from above [behavior] | hooked forelimbs built for climbing and seizing [body] | relentless scrabbling escalation to inaccessible height [behavior]
[concept] identity: An owlbear that has learned to climb opens a fight from above — a hooked-forelimb ambush dropping from rock or canopy onto prey's shoulder blades, then a scrabble of beak and claws before it breaks off and hauls itself back up out of reach. Every round after that it strikes and withdraws, using its climbing limbs to reposition along walls, ledges, and trunks, never trading blows where it can't get a grip. Under pressure it turns the terrain itself against pursuers, dragging and shaking them off its face; bloodied, it flees straight up and away rather than fight to the death, a cunning brute that knows the high ground is its kill-zone.
[concept] lore: A mountain-savaged owlbear born into cliff-clutching forests where food lives in the rocks, it learned to scale the crags its weaker kin could only roar at — and now hunts those same cliffs from above.
[reskin] print canon route: the Owlbear's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 58 -> 59, AC 13 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +4 -> +7, DC 15 (print's)
[reskin] donor: skirmisher-3 -> CR 3
[reskin] [path] decides: twist on the Owlbear (the matcher agrees)
[reskin] print canon: "Owlbear — that has learned to climb" heads on the Owlbear — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] repair round 1: 1 defect(s) — name "Cliff-Clutching" promises the Grappled condition but the row never delivers it — name what the rule does, or drop the claim word
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the owlbear" — the call answered "the owlbear" (kind), which the name does not support
[reskin] inline form: "the owlbear" — the model's own reading of the name
[reskin] the sheet's declared ask: climb — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Owlbear —" -> has (descriptive), head | "has learned to climb" -> has (mechanical) [asked: movement] [askMechanic: climb]
[reskin] body verdicts: 31 of 31 answered; not true of this body: snare, random-ray, snare-bolt, blink, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, life-drain
[reskin] signature idea (action): "When the owlbear drops from a ledge or wall onto a creature below, it lands on the target's back, and the target must succeed on a Dexterity saving throw or be knocked Prone as the owlbear's hooked forelimbs seize hold — and the owlbear can then use Fleet Agility to scramble back up the nearest sheer surface, having never stood in the open." [rider/on_hit/condition] [family: sentinel] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, shield-bash, lure, ground-burst, spew, sensory-strike, disarm, thrown-burst-seed, delayed-brand, obstacle-pull, slow-bolt, herd, zone-seed, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, rally, riposte)
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: affliction (on_hit/condition), contagion (on_hit/condition), pounce (on_hit/condition)
[reskin] classification handed to the fit call: shape=movement
[reskin] word match declined by the call: pounce, hook-rider, charge-push, leap, charge — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "hook-rider" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: lets the creature climb a sheer surface as part of the move instead of dragging )
[reskin] seat takes its clause: "Cliff Scramble" is HANDED "has learned to climb" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] rider refused — a push that undoes its own row: "hook-rider" moves the target away from "Claws", which swings 2x a round; the slot leaves and the seat looks elsewhere
[reskin] fallback stands down: the twist path has no shelf — the Owlbear's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The owlbear's forelimbs end in hooked climbing claws; it can move across sheer vertical faces and ceilings at its climb speed without a check, and it can cling in place there with no hands free, so it can strike from a wall or overhead perch while its prey must reach up to answer." [trait/always/movement] [family: breach] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — climb: spider-climb, terrain-walk
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), terrain-walk (always/movement), relentless-pursuit (always/movement)
[reskin] keys would have bound: trait — spider-climb (climb, climbs, climbing)
[reskin] classification handed to the fit call: shape=movement
[reskin] signature template (trait): spider-climb -> Traits/"Spider Climb" ("The owlbear's hooked climbing claws let it move across sheer vertical faces and  [verb: climb:concept, climbs:concept, climbing:concept, ceilings:idea, walls:idea, wall:idea, cling:idea, sheer:idea]")
[reskin] weapons answered: Claws = none
[reskin] print canon attack: "Claws" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "the owlbear makes two Rend attacks." — the Owlbear's own
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon skills: "Perception +3, Stealth +3" -> "Perception +5" — the Owlbear's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Owlbear's
[reskin] print canon: chassis row leaves — Traits/"Cliff-Clutching" is the seat's, not the Owlbear's
[reskin] row binds its clause: "Spider Climb" answers "has learned to climb" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Rend Lowercase word starts a sentence.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] lets the creature climb a sheer surface as part of the move instead of dragging the target — "When the owlbear drops from a ledge or wall onto a creature below, it lands on the target's back, and the target must succeed on a Dexterity saving throw or be knocked Prone as the owlbear's hooked forelimbs seize hold — and the owlbear can then use Fleet Agility to scramble back up the nearest sheer surface, having never stood in the open." — Owlbear [seat: action [rider/on_hit/condition]] (closest offered: hook-rider) [effect: movement] [menu: affliction contagion pounce charge-push hook-rider isolation charge leap thrown-burst-seed riposte] [same-cell unoffered: stunning-strike life-drain snatch bolt-restrain bolt-mark] [same-seat rejected: stunning-strike:legality life-drain:legality snatch:legality bolt-restrain:role bolt-drag:role bolt-mark:legality] [VETOED AFTER ACCEPTANCE: hook-rider never reached the sheet — died at no legal template or seed (no template held the idea and no seed is legal on this sheet)]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x no legal template or seed
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x no legal template or seed) · path twist
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Vampire — a legendary

**Concept:** name: Vampire | who keeps a garden of thorns

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vampire | 13 (2014) | brute-13 | ok | ok | ok | ok | ok | ok | ok | SOFT: orphan-condition-ref, orphan-condition-ref | ok | ok |

- adjudicability · soft · orphan-condition-ref: the 2024 model: orphan-condition-ref: "Charmed" is referenced as a state but nothing on the sheet applies it
- adjudicability · soft · orphan-condition-ref: the 2024 model: orphan-condition-ref: "Restrained" is referenced as a state but nothing on the sheet applies it
- **dropped clause:** "keeps a garden of thorns"
- read: def 10 / off 12 → 11; sustained 75 (2 × Grave Strike + legendary Deathless Strike); nova none; dmg 75

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

Legendary Resistance (3/Day, or 4/Day in Lair). If the vampire fails a saving throw, it can choose to succeed instead.
Misty Escape. If the vampire drops to 0 hit points outside its resting place, the vampire uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 hit points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and is paralyzed until it regains any hit points, and it regains 1 hit point after spending 1 hour there.
Spider Climb. The vampire can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Vampire Weakness. The vampire has these weaknesses: Forbiddance: the vampire can't enter a residence without an invitation from an occupant.
Running Water: the vampire takes 20 acid damage if it ends its turn in running water.
Stake to the Heart: If a weapon that deals piercing damage is driven into the vampire's heart while the vampire is incapacitated in its resting place, the vampire is paralyzed until the weapon is removed.
Sunlight: the vampire takes 20 radiant damage if it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks.
Shape-Shift. As a bonus action, if the vampire isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., fly speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., fly speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the vampire can't speak. Its game statistics, other than its size and speed, are unchanged.
While in mist form, the vampire can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has resistance to all damage, except the damage it takes from sunlight.
Charm (Recharge 5-6). As a bonus action, the vampire casts charm person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The charmed target is a willing recipient of the vampire's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was charmed by the vampire.

Actions
Multiattack: The vampire makes two Grave Strike attacks and uses Bite. It can replace one attack with a use of Thorned Shear Bleed.
Grave Strike: Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) by one of two hands.
Thorned Shear Bleed: One creature within 30 feet must make a DC 17 Constitution saving throw, taking 17 (5d6) necrotic damage on a failed save, and the vampire regains hit points equal to half the damage dealt.
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that is grappled, incapacitated, or restrained must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) piercing damage plus 13 (3d8) necrotic damage on a failed save. The target's hit point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a vampire spawn under the vampire's control.
Legendary Actions

The vampire can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The vampire regains spent legendary actions at the start of its turn.

Deathless Strike: The vampire moves up to half its speed, and it makes one Grave Strike attack.
Beguile: The vampire casts command, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17). The vampire can't take this action again until the start of its next turn.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Grave Strike — print's own row, renamed
- Actions/Thorned Shear Bleed — template drain; library draw (seed unstamped); binds the GM's words: vampire
- Actions/Bite — print's own row
- Traits/Legendary Resistance — print's own row
- Traits/Misty Escape — print's own row
- Traits/Spider Climb — print's own row
- Traits/Vampire Weakness — print's own row
- Legendary Actions/Deathless Strike — print's own row
- Legendary Actions/Beguile — print's own row
- Bonus Actions/Shape-Shift — print's own row
- Bonus Actions/Charm — print's own row

**Engine trace**

```
[path] twist — Vampire (is) — "Name field: Vampire" (code)
[route] brute type=Undead mechanics=gaze — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-grappler: ✓ ("garden of thorns") | brute-grappler: no line key in the words — the model's read of its quote | brute-grappler -> brute: a grappler is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] name: "Vampire" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Undead themes=grave/grasping mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Vampire"
[concept] mechanics: gaze
[concept] signature elements: the thorn garden it tends [object] | staking prey in place to bleed them dry [behavior] | blood-fed briars growing from its own flesh [body]
[concept] identity: The Thorn-Gardener opens by hurling a fan of blood-fed briars to stake prey in place, then strides in to work its hooked shears and thorned gauntlets on whatever cannot pull free. It tends its victims like its garden: patient, deliberate, and fond of pinning one target for hours while it leisurely bleeds another. Wounded, it retreats behind a wall of clutching thorns and fights to the death before it abandons a single cutting.
[concept] lore: A vampire who tended roses for a century before the grave took it now believes every throat is a flowerbed, and it prunes only what it means to keep.
[reskin] print canon defenses: HP 184 -> 195, AC 17 -> 16 — the Vampire's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 18, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's at its own CR; attack +8 -> +9, DC 17 (print's)
[reskin] donor: brute-13 -> CR 13 (invented — no printed peer)
[reskin] [path] decides: twist on the Vampire (the matcher agrees)
[reskin] print canon: "Vampire — who keeps a garden of thorns" heads on the Vampire — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the vampire" — the call answered "the vampire" (kind), which the name does not support
[reskin] inline form: "the vampire" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 17 (8 + PB 5 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: snare — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Vampire —" -> has (descriptive), head | "keeps a garden of thorns" -> has (mechanical) [asked: attack] [askMechanic: zone]
[reskin] body verdicts: 28 of 28 answered; not true of this body: herd, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, death-burst, kill-denial
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The vampire works its hooked shears with a gardener's patience: one creature within reach must make a Wisdom saving throw. On a failure, it takes Necrotic damage and begins to bleed — at the start of each of its turns it takes that Necrotic damage again until it or an ally uses an action to staunch the wound, wherever it runs." [action/save/damage] [family: mark] — menu: condition-payoff, shield-bash, escalating-dread, terror-pulse, drain, exploiter, execute, curse-debt (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, contagion, stunning-strike, charge-push, hook-rider, pounce, life-drain, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does damage; leading: condition-payoff (save/damage), drain (save/damage), exploiter (save/damage)
[reskin] keys would have bound: action — drain (vampire)
[reskin] classification handed to the fit call: mechanic=gaze shape=attack
[reskin] word match declined by the call: condition-payoff, drain, exploiter, curse-debt, escalating-dread, terror-pulse — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "drain" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: a lingering bleed that repeats its damage at the start of the target's turns unt)
[reskin] seat takes its clause: "Thorned Shear Bleed" is HANDED "keeps a garden of thorns" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: drain -> Actions/"Thorned Shear Bleed" ("The vampire works its hooked shears with a gardener's patience: one creature within reach must make a Wisdom saving throw. On a failure, it takes Necrotic damag [verb: vampire:concept]")
[reskin] signature idea (trait): "The thorn garden travels with its gardener: invisible spectral briars trail in the vampire's wake, so ground it has moved across this turn is difficult terrain for other creatures, and a creature that ends its turn in that growth is pricked for Necrotic damage." [trait/always/movement] [family: zone] — menu: spider-climb, phobia, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] lead by this seat's own clause: trait — "zone" from the clause this seat serves, not the sheet's "snare"
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — zone: aberrant-ground
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: aberrant-ground (always/movement), spider-climb (always/movement), relentless-pursuit (always/movement)
[reskin] classification handed to the fit call: mechanic=gaze shape=attack
[reskin] word match declined by the call: aberrant-ground, bound, phobia — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "aberrant-ground" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: trailing difficult terrain in the vampire's wake that pricks creatures ending th)
[reskin] free signature row: "Thorn Garden Trail" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Thorn Garden Trail" is HANDED "keeps a garden of thorns" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): aberrant-ground -> Traits/"Thorn Garden Trail" ("The thorn garden travels with its gardener: invisible spectral briars trail in the vampire's wake, so ground it has moved across this turn is difficult terrain  [verb: wake:idea]")
[reskin] one mechanic, one name: Traits/"Thorn Garden Trail" -> "Aberrant Ground" — this row is aberrant-ground and does what every aberrant-ground row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Thorned Gauntlet = none; Briar Fan = none; Staking Briars = none
[reskin] chassis nova: "Briar Fan (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral -> Lawful Evil — the Vampire's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus two other languages" — the Vampire's
[reskin] print canon attack: "Thorned Gauntlet" -> "Grave Strike" — the Vampire's own row
[reskin] print canon multiattack: "the vampire makes two Grave Strike attacks and uses Bite." — the Vampire's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon skills: "Athletics +9, Perception +7" -> "Perception +7, Stealth +9" — the Vampire's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance (3/Day, or 4/Day in Lair) — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Briar Fan (Recharge 5-6)" is the seat's nova, not the Vampire's
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
[reskin] print canon legendary: Deathless Strike, Beguile — the Vampire's own kit stands where the chassis's stood
[reskin] multiattack replacement clause: It can replace one attack with a use of Thorned Shear Bleed.
[reskin] free-row budget by card size: CR 13 sits in band 13-16, where print runs 5-10 rows (p20-p90, Multiattack excluded); this card already carries 11 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free row over budget: Traits/"Aberrant Ground" leaves at ship — this sheet's free-row budget (0) is spent by a row that SHIPPED
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 0 kept (budget 0)
audit span not verbatim, dropped: Multiattack uses Thorned Shear Bleed
audit finding below confidence gate: Grave Strike The Grappled rider specifies the grapple comes 'from one of two hands,' implying a two-hand anatomy and a hand-tracking requirement that the block never otherwise uses, so the GM cannot adjudicate the second hand's state or reach.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a lingering bleed that repeats its damage at the start of the target's turns until an action staunches it — "The vampire works its hooked shears with a gardener's patience: one creature within reach must make a Wisdom saving throw. On a failure, it takes Necrotic damage and begins to bleed — at the start of each of its turns it takes that Necrotic damage again until it or an ally uses an action to staunch the wound, wherever it runs." — Vampire [seat: action [action/save/damage]] (closest offered: drain) [effect: damage] [menu: condition-payoff drain exploiter execute curse-debt shield-bash escalating-dread terror-pulse hook-rider focus] [same-cell unoffered: trample leap thrown-burst active-toll ground-burst spew burrow-ambush thrown-burst-seed wind-up blighted-ground] [same-seat rejected: swallow:legality trample:legality leap:legality thrown-burst:legality gaze-single:role snare:role reel:role seal:role lure:role hook-drag:legality active-toll:legality pull-through:role random-ray:legality ground-burst:legality spew:legality burrow-ambush:legality obstacle-pull:role pacify:role snare-bolt:role slow-bolt:role sensory-strike:role disarm:role herd:legality reveal:role wind-up:legality blighted-ground:role] [landed: drain]
[reskin] [gap] trailing difficult terrain in the vampire's wake that pricks creatures ending their turn there for Necrotic damage — "The thorn garden travels with its gardener: invisible spectral briars trail in the vampire's wake, so ground it has moved across this turn is difficult terrain for other creatures, and a creature that ends its turn in that growth is pricked for Necrotic damage." — Vampire [seat: trait [trait/always/movement]] (closest offered: aberrant-ground) [effect: damage] [menu: aberrant-ground spider-climb relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind relic-object undead-fortitude composed:zone:terrain truth-aura fear-aura] [same-cell unoffered: blink terrain-walk web-walker earth-glide tunneler zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality evasion:role marking-light:legality sealed-body:legality guarded-stance:role mimicry:legality assassinate:role blurred-form:role death-burst:legality kill-denial:legality] [VETOED AFTER ACCEPTANCE: aberrant-ground never reached the sheet — died at the free-row budget (only 0 free row(s) allowed on this sheet)]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the free-row budget
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 2 (1x the free-row budget) · path twist
[reskin] escape dc: Grave Strike → DC 17 (8 + PB + STR; a late row wore another number)
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Scree-Wight — one marked soft

**Concept:** a quarry-pit thing of living scree that buries what it catches

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Scree-Wight | 5 (2014) | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 3 (print at 5 reads 2.5–9.5, n=25)
- read: def 2 / off 4 → 3; sustained 32 (2 × Slam); nova none; dmg 32

```
Scree-Wight
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

tremorsense 60 ft., passive Perception 13

Languages: 

None

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Aberrant Ground. The ground in a 10-foot radius emanating from the scree-wight is difficult terrain.
Entomb. As a bonus action, the scree-wight entombs one Medium or smaller creature it is grappling. While entombed, the target is blinded and restrained, has total cover against attacks and other effects outside the scree-wight, and takes 7 (2d6) bludgeoning damage at the start of each of the scree-wight's turns. The scree-wight can have only one creature entombed at a time. If the scree-wight takes 15 damage or more in a single turn from the entombed creature, the scree-wight must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the scree-wight. If the scree-wight dies, an entombed creature breaks free prone by using 5 feet of movement.

Actions
Multiattack: The scree-wight makes two Slam attacks. It can replace one attack with a use of Shield Bash.
Slam: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained.
Shield Bash: One creature within 5 feet of the scree-wight that it can see must make a DC 14 Strength saving throw, taking 9 (2d8) bludgeoning damage on a failed save, or half as much damage on a successful one. If the target is Medium or smaller, it is also knocked prone on a failed save.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Slam — the chassis
- Actions/Shield Bash — template shield-bash; library draw (seed unstamped)
- Bonus Actions/Entomb — the GM's clause "buries what it catches"; binds the GM's words: entomb+swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+cocoon+whelm
- Traits/Aberrant Ground — template aberrant-ground; library draw (seed unstamped); binds the GM's words: scree+rubble

**Engine trace**

```
[path] homebrew — "a quarry-pit thing of living scree that buries what it catches" (call)
[route] brute-grappler type=Elemental mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "buries what it catches" | brute-grappler: ✓ ("buried what it catches") | brute-grappler: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "thunder" answers a question nobody asked
[concept] resolve: archetype=brute type=Elemental themes=elemental/subterranean mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: buries what it catches under living scree [behavior] | a pit of loose, shifting stone-rubble [body] | the avalanche collapse that pulls prey under [behavior]
[concept] identity: The scree-wight opens by sliding downhill as a loose, rattling slope of living stone, letting prey underestimate the open ground until it collapses into a crushing embrace that drags them under the rubble. Every round after, it stays half-buried and lashes out with stone-limbs and a choking fall of gravel, heaving its victims deeper into its own body until they are packed silent beneath the scree. It is patient and implacable rather than cruel, fighting to the death and never abandoning a buried catch, but it will withdraw uphill only to reposition and avalanche again.
[concept] lore: Born when a quarry's slag heaps were left to swallow the dead and the discarded, the scree-wight is the pit's grudge made mobile, forever hungry to add another body to its own rising mound.
[reskin] donor: brute-5-grappler -> CR 5
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] engulf engine: Entomb — the body's own verb
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the scree-wight" — the call's own answer (kind), built from the name
[reskin] inline form: "the scree-wight" — the model's own reading of the name
[reskin] save dc derived: DC 13, 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: snare — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a quarry-pit thing of living scree" -> has (descriptive), head | "buries what it catches" -> has (mechanical) [asked: on_hit/condition] [askMechanic: grapple]
[reskin] body verdicts: 30 of 30 answered; not true of this body: active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, heated-body, absorption, bloodied-burst, resonant-body, adhesive, faultless-tracker, web-walker, energy-aura, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, life-drain
[reskin] signature idea (action): "The scree-wight hurls a fistful of its own loose stone at a creature it can see within range, and the rubble bursts across the ground around the target. The target must succeed on a Dexterity saving throw or be knocked Prone, its legs buried to the knee in a spreading drift of scree that clings and shifts whenever it tries to rise." [action/save/condition] [family: zone] — menu: condition-payoff, shield-bash, ground-burst, burrow-ambush, thrown-burst-seed, wind-up, exploiter, lure, pacify, sensory-strike, reveal (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, stunning-strike, charge-push, pounce)
[reskin] lead by this seat's own clause: action — "grapple" from the clause this seat serves, not the sheet's "snare"
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), lure (save/condition), pacify (save/condition)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition when=on_hit
[reskin] word match declined by the call: lure, pacify, sensory-strike, reveal, condition-payoff, ground-burst, burrow-ambush, thrown-burst-seed, wind-up, exploiter — the key word does not mean the mechanic here
[reskin] free signature row: action — "shield-bash" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "buries what it catches under living scree" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] value check: "Scree Burst" EV 9.3 vs floor 8.8 (one attack of 2) — added Success: Half
[reskin] signature template: shield-bash -> Actions/"Scree Burst" ("The target must succeed on a Dexterity saving throw or be knocked Prone, its leg [shape fit, no verb match]")
[reskin] signature idea (trait): "Loose scree and gravel rise and set around the scree-wight, so the ground within reach of it is difficult terrain for other creatures, and a creature that starts its turn in that ground has its Speed reduced; the scree-wight itself ignores this difficult terrain, gliding over its own rubble as over a slope." [trait/always/movement] [family: zone] — menu: false-appearance, spider-climb, phobia, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), terrain-walk (always/movement), aberrant-ground (always/movement)
[reskin] keys would have bound: trait — terrain-walk, aberrant-ground (scree)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition when=on_hit
[reskin] word match declined by the call: aberrant-ground, terrain-walk — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "aberrant-ground" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: makes the ground around the creature difficult terrain for others while the crea)
[reskin] row kept the template's own name: trait — "Aberrant Ground" is aberrant-ground's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] signature template (trait): aberrant-ground -> Traits/"Aberrant Ground" ("The idea describes loose scree making ground around the scree-wight difficult te [verb: scree:concept, rubble:idea]")
[reskin] one mechanic, one name: Actions/"Scree Burst" -> "Shield Bash" — this row is shield-bash and does what every shield-bash row does; a bespoke name would promise more than the text delivers
[reskin] repair: 1 clause(s) with no row — "buries what it catches"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [{"clause":"buries what it catches","row":"Entomb"}], unplaced []
[reskin] clause already answered: "buries what it catches" is carried by "Entomb" in different words — the call read the sheet and declined to answer it twice
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Slam = none; Gravel Fall = none
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a quarry-pit thing of living scree that " and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Shield Bash" [action/save/condition]
[reskin] ask vs row MISMATCH: "buries what it catches" -> "Entomb" — trigger: asked on_hit, row reads at_will
audit finding below confidence gate: Entomb Entomb removal from play has no escape written for the entrapped creature: granting release or dying only happens by the monster's choice or death, and the damage-threshold release requires the entombed creature to be able to deal damage while Blind and Restrained with Total Cover against effects from outside.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] makes the ground around the creature difficult terrain for others while the creature ignores it — "Loose scree and gravel rise and set around the scree-wight, so the ground within reach of it is difficult terrain for other creatures, and a creature that starts its turn in that ground has its Speed reduced; the scree-wight itself ignores this difficult terrain, gliding over its own rubble as over a slope." — Scree-Wight [seat: trait [trait/always/movement]] (closest offered: aberrant-ground) [effect: movement] [menu: spider-climb terrain-walk aberrant-ground earth-glide tunneler relentless-pursuit bound false-appearance phobia bloodied-fury blood-frenzy pack-tactics death-restoration uncanny-sense berserk shielded-mind undead-fortitude composed:zone:terrain truth-aura fear-aura] [same-cell unoffered: blink web-walker zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: adhesive:legality faultless-tracker:legality web-walker:legality evasion:role marking-light:legality sealed-body:legality relic-object:legality guarded-stance:role mimicry:legality assassinate:role blurred-form:role death-burst:legality kill-denial:legality] [landed: aberrant-ground]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 1 · path homebrew
[reskin] record reconciled: "Shield Bash" no longer imposes Prone — the clause left, so the record goes with it
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Drowned Choirmaster — bands soft

**Concept:** a drowned cathedral choir that sings in one voice

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Drowned Choirmaster | 10 (2014) | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 8.5 (print at 10 reads 7–13.5, n=6)
- **dropped clause:** "sings in one voice"
- read: def 8 / off 9 → 8.5; sustained 57 (3 × Hymnal); nova none; dmg 57

```
Drowned Choirmaster
Medium undead, neutral
Armor Class

16 (natural armor)

Hit Points: 

180 (24d8 + 72)

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

Drowned Choir. If the choirmaster dies, it returns to life in 1d6 days and regains all its hit points unless its remains are burned and the ashes scattered.

Actions
Multiattack: The choirmaster makes three attacks, using Hymnal or Chantry Toll. It can replace one attack with a use of Deafening Verse.
Hymnal: Melee Spell Attack: +7 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage plus 7 (2d6) thunder damage.
Chantry Toll: Ranged Spell Attack: +7 to hit, range 60 ft., one target. Hit: 16 (3d8 + 3) thunder damage.
Deafening Verse: One creature within 60 feet of the choirmaster must make a DC 15 Constitution saving throw, taking 18 (4d8) thunder damage on a failed save, and the target is deafened until the end of its next turn.
Spellcasting: The choirmaster casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 15):

1/day each:: thunderwave (cast at 3rd level), shatter (cast at 3rd level), blindness/deafness, hold person
Binding Note: Each creature of the choirmaster's choice within 60 feet of it that can see or hear the choirmaster must make a DC 15 Wisdom saving throw. On a failed save, the target is charmed until the end of the choirmaster's next turn, and while charmed this way, it must move toward the choirmaster by the safest available route on its turn and can't take reactions. On a successful save, the target is immune to this creature's lure for 24 hours.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Hymnal — the chassis
- Actions/Chantry Toll — the chassis
- Actions/Deafening Verse — the chassis
- Actions/Spellcasting — the chassis
- Actions/Binding Note — template lure; library draw (seed unstamped)
- Traits/Drowned Choir — template death-restoration; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "a drowned cathedral choir that sings in one voice" (call)
[route] caster-binder (controller) type=Undead mechanics=none — casts: implied by the kind — "sings in one voice" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: a Huge body is not incorporeal — print's incorporeals are Medium and smaller | caster-binder: ✓ ("sings in one voice") | caster-binder: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Undead themes=grave/voice mind=sapient style=binder energy=Thunder mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: singing in one voice as a binding hymn [behavior] | drowned bodies in waterlogged choir robes [body] | the sunken cathedral congregation's presence [aura]
[concept] identity: The Choir opens by raising one impossible chord from fifty drowned throats, a binding hymn that roots the nearest foes in place and pins their tongues; each round after it rotates verses, layering curses and blinding rays on anyone still standing or fleeing, tuning its harmonies to whatever condition the battle lacks. It never closes for melee — it glides back through flooded nave and choir stalls, and under pressure it does not break; it swells louder and darker until its enemies are deafened, silenced, and finally still, a patient performer that intends to leave no one able to answer back.
[concept] lore: When the cathedral sank beneath the flood, its choir kept the final service going underwater; now the drowned congregation sings to add every lost soul to its unbroken harmony, because a hymn sung by one voice is the only prayer that survives the deep.
[reskin] donor: caster-8-binder -> CR 10
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the choirmaster" — the call's own answer (kind), built from the name; the rules would have said "Choirmaster"
[reskin] inline on kit rows: "Choirmaster" -> "the choirmaster"
[reskin] inline form: "the choirmaster" — the model's own reading of the name
[reskin] control spell gated to daily — Blindness/Deafness (level 2 control at will is print's CR 13+ shape; at CR 10 it is 1/Day)
[reskin] control spell gated to daily — Hold Person (level 2 control at will is print's CR 13+ shape; at CR 10 it is 1/Day)
[reskin] spell DC coherence: DC 16 -> 15 off Charisma 16 (the stat makes the attack rolls)
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + Charisma's 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: charm — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "sings in one voice" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a drowned cathedral choir" -> has (descriptive), head | "sings in one voice" -> has (mechanical) [asked: at_will/save_single] [askMechanic: escalate]
[reskin] body verdicts: 34 of 34 answered; not true of this body: seal, active-toll, random-ray, spew, snare-bolt, drain, zone-seed, blighted-ground, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, gaze-aura, blurred-form, death-burst, kill-denial, life-drain
[reskin] signature idea (action): "The choirmaster sounds the single binding note of the deep: each creature of its choice within range that can hear it must make a Wisdom save or be Charmed, standing rapt and humming in harmony with the choir — unable to attack the choirmaster, which can sing a second voice through the enchanted throat so one of its attacks this turn strikes from that charmed creature's space." [action/save/condition] [family: mark] — menu: condition-payoff, wail, lure, ground-burst, obstacle-pull, pacify, escalating-dread, slow-bolt, sensory-strike, herd, thrown-burst-seed, curse-debt, reveal, wind-up, thrown-burst, execute, shield-bash, terror-pulse, push-prone, exploiter (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] lead by this seat's own clause: action — "escalate" from the clause this seat serves, not the sheet's "charm"
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — escalate: condition-payoff, wind-up, execute, exploiter
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: condition-payoff (save/damage), wind-up (save/damage), execute (save/damage)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] word match declined by the call: terror-pulse, herd, pacify — the key word does not mean the mechanic here
[reskin] free signature row: action — "lure" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "singing in one voice as a binding hymn" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] value check: "Binding Note (Recharge 5-6)" EV 22 vs floor 10.4 (one attack of 3) — over the ceiling — gated Recharge 5-6
[reskin] signature template: lure -> Actions/"Binding Note (Recharge 5-6)" ("each creature of its choice within range that can hear it must make a Wisdom sav [shape fit, no verb match]")
[reskin] signature idea (trait): "The drowned congregation is always with it — spectral choir members the choirmaster may draw a voice from: whenever it spends one of its limited spells, it can instead spend a nearby drowned soul, but each is spent forever and leaves one fewer throat in the choir." [trait/always/resource] [family: heal] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, mimicry, truth-aura, fear-aura
[reskin] composed candidates: none trait — the heal family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does resource; leading: spider-climb (always/movement), phobia (always/condition), bloodied-fury (always/defense)
[reskin] keys would have bound: trait — mimicry (voices)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] word match declined by the call: pack-tactics, blood-frenzy, bloodied-fury, mimicry, bound — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "death-restoration" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: spends a stored spectral singer to fuel a limited spell instead of expending the)
[reskin] pick kept on the GM's own words: trait — "death-restoration" has no key-table verb, but the call quotes "a drowned cathedral choir that sings in one voice" from the description
[reskin] signature template (trait): death-restoration -> Traits/"Drowned Choir" ("The idea is a spendable spectral choir that substitutes for the choirmaster's li [shape fit, no verb match]")
[reskin] repair: 1 clause(s) with no row — "sings in one voice"; one targeted call with the sheet as context
[reskin] authored trait refused: "One Voice" — no mechanic in the effect; the clause folds to description
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced ["description:sings in one voice"]
[reskin] clause answered in prose: "sings in one voice" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Hymnal = none; Chantry Toll = none; Deafening Verse = none; Binding Hymn = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a drowned cathedral choir that sings in " and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] dead control row: "Binding Note" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Deafening Verse.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Binding Note" [action/save/condition]
[reskin] asked but unanswered: "sings in one voice" asked for at_will and no row binds the clause
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] spends a stored spectral singer to fuel a limited spell instead of expending the spell slot, each singer gone for good — "The drowned congregation is always with it — spectral choir members the choirmaster may draw a voice from: whenever it spends one of its limited spells, it can instead spend a nearby drowned soul, but each is spent forever and leaves one fewer throat in the choir." — Drowned Choirmaster [seat: trait [trait/always/resource]] (closest offered: death-restoration) [effect: resource] [menu: spider-climb phobia bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind relentless-pursuit bound undead-fortitude mimicry truth-aura fear-aura] [same-cell unoffered: lay-on-hands second-wind volley-order] [same-seat rejected: false-appearance:legality adhesive:role terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality berserk:role evasion:role marking-light:legality sealed-body:legality relic-object:legality guarded-stance:role assassinate:role blurred-form:legality death-burst:legality kill-denial:legality] [landed: death-restoration]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 1 · path homebrew
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Glacier Heart — bands soft

**Concept:** a glacier's heart given legs, trailing a wake of killing cold

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Glacier Heart [seed 1/2] | 15 (2014) | brute-9-juggernaut | ok | SOFT: single-target-ceiling, band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · single-target-ceiling: Actions/Frozen Rebuke: 54 damage to one target in one action at CR 15 — print's hardest in this band is 51 (1.06x), and a gate does not excuse it (print's are ungated)
- bands · soft · band: reads CR 12.5 (print at 15 reads 7–15, n=12)
- **dropped clause:** "a glacier's heart given legs"
- read: def 10 / off 15 → 12.5; sustained 70 (2 × Ice-Sheathed Slam); nova Killing Wake 71; dmg 94

```
Glacier Heart
Huge elemental, unaligned
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

darkvision 60 ft., passive Perception 15

Languages: 

None

Challenge

15 (13,000 XP)

Proficiency Bonus:

+5

Sure Footing. Difficult terrain composed of ice, snow, and rubble doesn't cost the glacier heart extra movement, and the glacier heart can move across ice, snow, and rubble without needing to make an ability check.
Cold Absorption. Whenever the glacier heart is subjected to cold damage, it takes no damage and instead regains a number of hit points equal to the cold damage dealt.
Siege Monster. The glacier heart deals double damage to objects and structures.

Actions
Multiattack: The glacier heart makes two Ice-Sheathed Slam attacks. It can replace one attack with a use of Frozen Rebuke.
Ice-Sheathed Slam: Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage plus 13 (3d8) cold damage.
Killing Wake (Recharge 5-6): Each creature in a 30-foot cone must make a DC 17 Constitution saving throw, taking 71 (13d10) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also poisoned until the end of its next turn.
Frozen Rebuke: One creature within 30 feet of the glacier heart that is poisoned must make a DC 17 Strength saving throw, taking 54 (12d8) cold damage on a failed save, or half as much damage on a successful one.
```

**Where each row came from**

- Traits/Sure Footing — template terrain-walk; library draw (seed unstamped); the GM's clause "a glacier's heart given legs"; binds the GM's words: glacier+ice+snow+frozen+rubble
- Traits/Cold Absorption — the chassis
- Traits/Siege Monster — the chassis
- Actions/Multiattack — the chassis
- Actions/Ice-Sheathed Slam — the chassis
- Actions/Killing Wake — the chassis
- Actions/Frozen Rebuke — library seed exploiter

**Engine trace**

```
[path] homebrew — "a glacier's heart given legs, trailing a wake of killing cold" (call)
[route] brute-juggernaut type=Elemental mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a glacier's heart given legs") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental themes=elemental/terror mind=mindless style=juggernaut energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: trailing wake of killing cold [aura] | a glacier's heart on legs [body] | breaks what it walks through [behavior]
[concept] identity: The glacier's heart opens by simply walking: its bulk shatters the ground and its wake of killing cold stiffens anything within reach, so the first round is a wall of ice-mailed flesh closing the distance. Every round after, it wades through the front line to reach spellcasters and archers, shrugging off shaping magic and freezing wounds shut while it hammers with its mass and a slam of glacial force. Under pressure it does not retreat — it plants itself and fights to the death, its heart-beat slowing the air until the whole field is its killing wake.
[concept] lore: When a dying glacier's core is cut free and dragged onto carved legs by those who would bottle winter, the heart keeps beating and the mountain keeps coming home.
[reskin] donor: brute-9-juggernaut -> CR 15
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Ice-Sheathed Slam = literal
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the glacier heart" — the call's own answer (kind), built from the name
[reskin] inline form: "the glacier heart" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 17 (8 + PB 5 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: zone — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a glacier's heart given legs" -> has (mechanical) [asked: save_area] [askMechanic: zone] | "trailing a wake of killing cold" -> has (mechanical) [asked: save_area] [askMechanic: zone]
[reskin] body verdicts: 27 of 27 answered; not true of this body: herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The glacier heart grinds forward and the frozen ground it has already passed over becomes a wake of rime that clutches at the feet of any creature standing in it — the ice-mailing stiffens and slows those who try to wade through the heart's trail instead of fleeing it. A creature that enters that rime or starts its turn there has its Speed halved and can't take Reactions until the start of its nex" [trait/start_of_turn/condition] [family: zone] — menu: spider-climb, phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: condition-payoff, shield-bash, escalating-dread, terror-pulse, push-prone, exploiter, execute, lure, pacify, sensory-strike, curse-debt, reveal, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, stunning-strike, charge-push, pounce)
[reskin] composed candidates on the menu: action — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: action — zone: energy-aura
[reskin] menu ordered by the idea's stamps: action — idea fires start_of_turn/does condition; leading: energy-aura (start_of_turn/damage), truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition)
[reskin] keys would have bound: action — terrain-walk, execute (glacier, kill)
[reskin] classification handed to the fit call: mechanic=aura shape=save_area
[reskin] word match declined by the call: energy-aura, truth-aura, fear-aura, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded — the key word does not mean the mechanic here
[reskin] closest refused: action — "composed:zone:condition:poisoned" was named closest but was never on this sheet's menu (a gate refused it, or the pool did not offer it for this idea's declared trigger)
[reskin] decline reason: action — the call answered none and names it "no_fit" — the GM's words key terrain-walk, execute, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: action — "terrain-walk" is keyed by the GM's glacier and was on the call's menu, which the call read as no fit; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: action — "The glacier heart grinds forward and the frozen ground it has already passed over becomes a wake of rime that clutches at the feet of any creature standing in it — the ice-mailing stiffens and slows those who try to wade through the heart's trail instead of fleeing it. A creature that enters that rime or starts its turn there has its Speed halved and can't take Reactions until the start of its nex" [trait/start_of_turn/condition] — the model found no template that holds it (offered: energy-aura, truth-aura, fear-aura, composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded, phobia, berserk, spider-climb, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, condition-payoff)
[reskin] value check: "Opportunist's Lash" EV 41.9 vs floor 41.6 (one attack of 2) — dice 26 → 32; priced at the floor: dice 32 → 54
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The glacier heart doesn't break stride for the ground beneath it — it walks straight through ice, snow, and rubble as if it were open floor, and its own bulk shatters the terrain it crosses into a slick of frozen rubble behind it." [trait/always/movement] [family: breach] — menu: spider-climb, phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: absorption, weapon-lodge)
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — zone: energy-aura
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: energy-aura (start_of_turn/damage), spider-climb (always/movement), terrain-walk (always/movement)
[reskin] keys would have bound: trait — terrain-walk (glacier)
[reskin] classification handed to the fit call: mechanic=aura shape=save_area
[reskin] word match declined by the call: energy-aura, spider-climb, relentless-pursuit — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "terrain-walk" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: damages creatures that enter the trail left behind it)
[reskin] trait renamed: "Killing Wake" already names a row — the trait ships as "Sure Footing"
[reskin] signature template (trait): terrain-walk -> Traits/"Sure Footing" ("The idea is a terrain-crossing trait that leaves a damaging slick behind; no pri [verb: glacier:concept, ice:idea, snow:idea, frozen:idea, rubble:idea]")
[reskin] weapons answered: Ice-Sheathed Slam = none
[reskin] chassis nova: "Killing Wake (Recharge 5-6)" — the brute-9-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] trait stripped: Traits/Immutable Form — a golem's trait on a Elemental
[reskin] defenses by material: an ice body is vulnerable to Fire and never resists, absorbs, or ignores it (named by the call's own material field) — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] absorption re-keyed: Acid -> Cold (the donor organ obeys the concept energy)
[reskin] immunities stamped for type: Elemental -> Cold, Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a glacier's heart given legs, trailing a" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
[reskin] row binds its clause: "Sure Footing" answers "a glacier's heart given legs" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rename: "Opportunist's Lash" -> "Frozen Rebuke"
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Frozen Rebuke) — the sameness metric
[reskin] [gap] halves the target's Speed and strips its Reactions while it wades through the rime — "The glacier heart grinds forward and the frozen ground it has already passed over becomes a wake of rime that clutches at the feet of any creature standing in it — the ice-mailing stiffens and slows those who try to wade through the heart's trail instead of fleeing it. A creature that enters that rime or starts its turn there has its Speed halved and can't take Reactions until the start of its nex" — Glacier Heart [seat: action [trait/start_of_turn/condition]] (closest offered: composed:zone:condition:poisoned) [effect: movement] [menu: energy-aura truth-aura fear-aura composed:zone:condition:poisoned composed:zone:condition:frightened composed:zone:condition:deafened composed:zone:condition:blinded phobia berserk spider-climb terrain-walk bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind relentless-pursuit bound undead-fortitude condition-payoff] [same-cell unoffered: noxious-aura gaze-aura] [same-seat rejected: noxious-aura:legality warded-mending:legality gaze-aura:legality] [row dropped]
[reskin] [gap] damages creatures that enter the trail left behind it — "The glacier heart doesn't break stride for the ground beneath it — it walks straight through ice, snow, and rubble as if it were open floor, and its own bulk shatters the terrain it crosses into a slick of frozen rubble behind it." — Glacier Heart [seat: trait [trait/always/movement]] (closest offered: terrain-walk) [effect: damage] [menu: energy-aura spider-climb terrain-walk relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind undead-fortitude truth-aura fear-aura] [same-cell unoffered: blink aberrant-ground web-walker earth-glide tunneler zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: false-appearance:legality adhesive:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality evasion:role marking-light:legality sealed-body:legality relic-object:legality guarded-stance:role mimicry:legality assassinate:role blurred-form:role death-burst:legality kill-denial:legality] [landed: terrain-walk]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 2 (1x the call named no template for the pick) · path homebrew
[reskin] size floor: STR 16 -> 18 — print prints no corporeal Huge body under 18 (the Archelon); the attack follows it, as print's own 49 do
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Reliquary Ooze — bands soft

**Concept:** a cathedral-vault ooze that digests reliquaries

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Reliquary Ooze | 9 (2014) | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6 (print at 9 reads 5.5–13, n=8)
- **dropped clause:** "digests reliquaries"
- read: def 4 / off 8 → 6; sustained 54 (2 × Corrosive Slam); nova none; dmg 54

```
Reliquary Ooze
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

Amorphous. The ooze can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form. A creature that touches the ooze or hits it with a melee attack while within 5 feet of it takes 9 (2d8) acid damage.
Spider Climb. The ooze can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The ooze makes two Corrosive Slam attacks. It can replace one attack with a use of Corrosive Daub.
Corrosive Slam: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 11 (2d10) acid damage.
Corrosive Daub: One creature within 30 feet must succeed on a DC 15 Strength saving throw or be pulled up to 25 feet straight toward the ooze by a tarry daub of its own mass and be grappled (escape DC 15).
```

**Where each row came from**

- Traits/Amorphous — the chassis
- Traits/Corrosive Form — the chassis
- Traits/Spider Climb — the chassis
- Actions/Multiattack — the chassis
- Actions/Corrosive Slam — the chassis
- Actions/Corrosive Daub — template hook-drag; library draw (seed unstamped); binds the GM's words: grapple

**Engine trace**

```
[path] homebrew — "a cathedral-vault ooze that digests reliquaries" (call)
[route] ooze type=Ooze mechanics=grapple — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "digests reliquaries" | ooze: ✓ ("cathedral-vault ooze") | ooze: no line key in the words — the model's read of its quote
[concept] hints: ooze→body ✓ ("cathedral-vault ooze") | engulf→mechanics ✓ ("digests reliquaries")
[concept] resolve: archetype=ooze type=Ooze themes=amorphous/grave mind=mindless style=— energy=Acid mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple
[concept] signature elements: digesting reliquaries and sacred vessels [behavior] | tar-thick cathedral seepage spreading across the nave [body] | bone and gold dissolved inside its mass [object]
[concept] identity: The reliquary ooze seeps down from the vault ceiling as a slow black rain, coating shrines and holy vessels in a corrosive film that dissolves gold, bone, and saintly bone alike. Every round it spreads its tar-thick body across the nave in widening pools, engulfing relics and the faithful who guard them, its mass swelling with each dissolved miracle. Under pressure it does not retreat but contracts into a bone-littered tide that surges over the nearest warm body, patient and hungry as a tide that has all night.
[concept] lore: Born from centuries of spilled chrism, candle ash, and the dissolved marrow of saints, the reliquary ooze is a cathedral's hoarded sanctity turned to appetite — it remembers only that holy things are food.
[reskin] body type: ooze — the body outranks the role (recorded: ooze)
[reskin] donor: ooze-9 -> CR 9 (invented — no printed peer)
[reskin] row gated out: Engulf (engulf) — the concept did not claim this mechanic
[reskin] [path] decides: homebrew (the matcher would have said twist Gray Ooze)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the ooze" — the call's own answer (kind), built from the name
[reskin] inline form: "the ooze" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "digests reliquaries" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "digests reliquaries" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a cathedral-vault ooze" -> has (descriptive), head | "digests reliquaries" -> has (mechanical) [asked: at_will/at_will/attack] [askMechanic: drain]
[reskin] body verdicts: 37 of 37 answered; not true of this body: gaze-single, seal, wail, active-toll, random-ray, spew, snare-bolt, herd, blink, shell-withdraw, rally, phase-slip, false-appearance, absorption, bloodied-burst, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, mimicry, gaze-aura, blurred-form, death-burst, hook-rider, life-drain
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, push-prone, thrown-burst-seed, drain, zone-seed, wind-up, blighted-ground, reveal, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating (the sheet cannot render them)
[reskin] signature idea (action): "When the ooze uses its Corrosive Slam and the target is a creature, it can instead smear a dollop of itself across the target's limbs and gear: the target must make a Strength saving throw or be Grappled (escape DC), the tarry daub hardening around them as it corrodes what they hold. A creature that escapes or starts its turn Grappled by this has its holy symbols, reliquaries, and sanctified raime" [action/save/condition] [family: mark] — menu: trample, leap, thrown-burst, execute, shield-bash, lure, hook-drag, pull-through, ground-burst (+ shelf: rampage, patient-defense, second-wind, riposte, stunning-strike, charge-push, pounce, isolation, charge)
[reskin] lead by this seat's own clause: action — "drain" from the clause this seat serves, not the sheet's "grapple"
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), lure (save/condition), trample (save/damage)
[reskin] classification handed to the fit call: mechanic=grapple shape=attack when=at_will often=at_will
[reskin] word match declined by the call: shield-bash, lure, trample, leap, thrown-burst, execute, pull-through, ground-burst — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "hook-drag" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: grapples a creature it just hit with its slam and corrodes the gear on it)
[reskin] value check: "Corrosive Daub" EV 14.9 vs floor 14 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Corrosive Daub" ("The idea is a grapple-on-hit rider that smears corrosive daub on the target and  [verb: grapple:idea]")
[reskin] signature idea (trait): "The ooze's whole body pulses a slow, spreading seep: at the start of each of its turns, every surface it occupies is left coated in a slick clinging film. A creature that enters that film-covered ground or ends its turn there is Slowed to half speed and leaves a glistening, tar-thick trail behind it — a trail the ooze can find and follow with its blindsight for as long as the film remains." [trait/start_of_turn/movement] [family: zone] — menu: adhesive, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, warded-mending, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — grapple: adhesive
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does movement; leading: adhesive (always/condition), composed:zone:terrain (start_of_turn/movement), warded-mending (start_of_turn/resource)
[reskin] classification handed to the fit call: mechanic=grapple shape=attack when=at_will often=at_will
[reskin] word match declined by the call: adhesive — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:terrain" was named closest but was never on this sheet's menu (a gate refused it, or the pool did not offer it for this idea's declared trigger)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The ooze's whole body pulses a slow, spreading seep: at the start of each of its turns, every surface it occupies is left coated in a slick clinging film. A creature that enters that film-covered ground or ends its turn there is Slowed to half speed and leaves a glistening, tar-thick trail behind it — a trail the ooze can find and follow with its blindsight for as long as the film remains." [trait/start_of_turn/movement] — the model found no template that holds it (offered: adhesive, composed:zone:terrain, warded-mending, truth-aura, fear-aura, terrain-walk, relentless-pursuit, bound, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, undead-fortitude, assassinate, kill-denial)
[reskin] repair: 1 clause(s) with no row — "digests reliquaries"; one targeted call with the sheet as context
[reskin] authored trait refused: "Reliquary Digestion" — heal names no amount or no limit; the clause folds to description
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced ["description:digests reliquaries"]
[reskin] clause answered in prose: "digests reliquaries" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Corrosive Slam = none
[reskin] speed by concept: dropped Climb 20 ft. — the concept's movement set decides
[reskin] climb speed: Climb 20 ft. — a creature that climbs difficult surfaces has a Climb Speed in print (the Vampire, the Giant Spider)
[reskin] languages held: None stands — INT 2 on a Ooze speaks nothing, whatever the mind read said
[reskin] element immunity: Acid (merged into the header write)
[reskin] immunities stamped for type: Ooze -> Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained
[reskin] name-canon stands down: the path answered homebrew on "a cathedral-vault ooze that digests reli" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Corrosive Daub.
[reskin] free-row budget by card size: CR 9 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] asked but unanswered: "digests reliquaries" asked for at_will/at_will and no row binds the clause
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] grapples a creature it just hit with its slam and corrodes the gear on it — "When the ooze uses its Corrosive Slam and the target is a creature, it can instead smear a dollop of itself across the target's limbs and gear: the target must make a Strength saving throw or be Grappled (escape DC), the tarry daub hardening around them as it corrodes what they hold. A creature that escapes or starts its turn Grappled by this has its holy symbols, reliquaries, and sanctified raime" — Reliquary Ooze [seat: action [action/save/condition]] (closest offered: hook-drag) [effect: condition] [menu: shield-bash lure trample leap thrown-burst execute hook-drag pull-through ground-burst] [same-cell unoffered: swallow gaze-single snare seal random-ray pacify escalating-dread terror-pulse snare-bolt sensory-strike push-prone reveal] [same-seat rejected: swallow:legality gaze-single:legality snare:role reel:role condition-payoff:legality seal:legality active-toll:legality random-ray:legality spew:legality burrow-ambush:legality snare-bolt:legality disarm:role herd:legality curse-debt:role reveal:role exploiter:legality] [landed: hook-drag]
[reskin] [gap] coats the ground so creatures entering or ending their turn there are slowed and leave a trackable trail — "The ooze's whole body pulses a slow, spreading seep: at the start of each of its turns, every surface it occupies is left coated in a slick clinging film. A creature that enters that film-covered ground or ends its turn there is Slowed to half speed and leaves a glistening, tar-thick trail behind it — a trail the ooze can find and follow with its blindsight for as long as the film remains." — Reliquary Ooze [seat: trait [trait/start_of_turn/movement]] (closest offered: composed:zone:terrain) [effect: movement] [menu: adhesive composed:zone:terrain warded-mending truth-aura fear-aura terrain-walk relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind evasion undead-fortitude assassinate kill-denial] [same-cell unoffered: none] [same-seat rejected: energy-aura:legality noxious-aura:legality gaze-aura:legality] [row dropped]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 2 (1x the call named no template for the pick) · path homebrew
[reskin] record reconciled: "Corrosive Daub" keeps Grappled and drops Restrained — only those clauses left
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Boulder Exile — bands soft

**Concept:** a stone giant exile who speaks only Giant and understands no Common

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Boulder Exile | 9 (2014) | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-atk: attack +10 against the aim's +7
- read: def 7 / off 10 → 8.5; sustained 62 (2 × Stone Club); nova none; dmg 62

```
Boulder Exile
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

Weapon Lodge. When a creature hits the exile with a nonmagical weapon, the weapon lodges in the exile's body. A lodged weapon can be pulled free by a creature within reach that succeeds on a DC 18 Strength (Athletics) check as an action; while lodged, the exile can use it: its Stone Club attacks deal an extra 14 (4d6) bludgeoning damage per lodged weapon (maximum two).

Actions
Multiattack: The exile makes two attacks: one with its Stone Club and one with its Boulder. It can replace one attack with a use of Grinding Sweep.
Stone Club: Melee Weapon Attack: +10 to hit, reach 15 ft., one target. Hit: 31 (10d4 + 6) bludgeoning damage.
Boulder: Ranged Weapon Attack: +10 to hit, range 60/240 ft., one target. Hit: 27 (6d6 + 6) bludgeoning damage.
Grinding Sweep: One creature within 5 feet of the exile must succeed on a DC 18 Strength saving throw or be pushed up to 15 feet away from the exile and knocked prone.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Stone Club — print's own row; weapon club
- Actions/Boulder — print's own row
- Actions/Grinding Sweep — template push-prone; library draw (seed unstamped); binds the GM's words: knock
- Traits/Weapon Lodge — template weapon-lodge; library draw (seed unstamped)

**Engine trace**

```
[path] twist — Stone Giant (is) — "stone giant" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a stone giant exile") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=elemental/bestial mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: hurling boulders from range [behavior] | stone body that shrugs off blows [body] | knobbed stone club and boulder sack [object]
[concept] identity: A stone giant exile quarried out of his own clan, this hulking brute speaks only Giant and answers only in stone — he opens a fight by hurling a fist-sized boulder from range, then closes with a knobbed stone club and grinds the fight into a standing trade of blows. He fights to the death when cornered and never flees, since no road leads back to a clan that cast him out; under pressure he simply plants his feet, takes the hit, and swings harder, roaring in Giant at foes who cannot understand a word of it.
[concept] lore: Stripped of name and hearth for some offense the clan will not forgive, the exile wanders the high passes with his boulder sack and stone club, wanting only a fight he can win and an enemy who will stand still long enough to matter.
[reskin] print canon array: STR 23, DEX 15, CON 20, INT 10, WIS 12, CHA 9 — the Stone Giant's; STR 23 outranks the card's +7, so the sheet rolls +10 (raise-only)
[reskin] donor: brute-9 -> CR 9
[reskin] [path] decides: twist on the Stone Giant (the matcher would have said homebrew)
[reskin] print canon: "a stone giant exile who speaks only Giant and understands no Common" heads on the Stone Giant — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the exile" — the call's own answer (kind), built from the name
[reskin] inline form: "the exile" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: "understands no Common"
[reskin] lacks refused: "speaks only Giant" names no absence — nothing in it takes anything away
[reskin] clauses: "a stone giant exile" -> has (descriptive), head | "speaks only Giant" -> has (header) | "understands no Common" -> LACKS (mechanical)
[reskin] extraction: 4 of 9 model clauses quote nothing the user typed and leave the record ("hurling a fist-sized boulder", "fights to the death", "takes the hit", …)
[reskin] body verdicts: 31 of 31 answered; not true of this body: active-toll, random-ray, spew, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The exile sets his feet and swings his knobbed club in a wide, grinding arc — every creature of his choosing within reach must make a Strength saving throw or be knocked Prone as the blow crashes through their guard. He then has advantage against any creature he just knocked down, roaring in Giant at the ones who can't understand him." [action/save/condition] [family: nova] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, ground-burst, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, wind-up, lure, pacify, sensory-strike, reveal (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), escalating-dread (save/condition), terror-pulse (save/condition)
[reskin] seat takes its clause: "Grinding Sweep" is HANDED "a exile" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: push-prone -> Actions/"Grinding Sweep" ("every creature within reach must make a Strength saving throw or be knocked Pron [verb: knock:idea]")
[reskin] signature idea (trait): "Stone grinds stone: when the exile takes Bludgeoning or Piercing damage, he can shift his stance and recover from one condition afflicting him (such as Prone, Grappled, or Restrained) as he plants his feet and takes the hit. He answers pain by swinging harder, never by yielding ground." [trait/on_being_hit/defense] [family: body-reaction] — menu: weapon-lodge (+ shelf: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura)
[reskin] verb gate stands down: trait — no template shares a verb, but "a exile" is a clause the sheet has not answered; the GM's own words are the warrant
[reskin] composed candidates: none trait — the body-reaction family has no payload that does "defense" (it offers damage, condition, movement)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does defense; leading: weapon-lodge (on_being_hit/resource)
[reskin] word match declined by the call: weapon-lodge — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "weapon-lodge" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: shed a condition (Prone, Grappled, Restrained) when it takes bludgeoning or pier)
[reskin] free signature row: trait — "weapon-lodge" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] decoration renamed: "Stone Grinds Stone" borrowed the GM's own words "stone, stone" for a row that expresses nothing — it takes "Weapon Lodge", the template's own name
[reskin] free signature row: "Weapon Lodge" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Weapon Lodge" is HANDED "a exile" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): weapon-lodge -> Traits/"Weapon Lodge" ("Stone grinds stone: when the exile takes Bludgeoning or Piercing damage, he can shift his stance and recover from one condition afflicting him (such as Prone, G [shape fit, no verb match]")
[reskin] weapons answered: Stone Club = club; Boulder = none
[reskin] weapon dice follow the weapon: "Stone Club" is a club (d4) — "30 (7d6 + 6)" becomes "31 (10d4 + 6)", print's rule of keeping the die and scaling the count
[reskin] weapon reach follows the weapon: "Stone Club" is a club — reach 10 ft becomes 5 ft (the table's own)
[reskin] multiattack replacement clause: It can replace one attack with a use of Grinding Sweep.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Weapon Lodge" [trait/on_being_hit/resource]
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Weapon Lodge")
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] shed a condition (Prone, Grappled, Restrained) when it takes bludgeoning or piercing damage — "Stone grinds stone: when the exile takes Bludgeoning or Piercing damage, he can shift his stance and recover from one condition afflicting him (such as Prone, Grappled, or Restrained) as he plants his feet and takes the hit. He answers pain by swinging harder, never by yielding ground." — Boulder Exile [seat: trait [trait/on_being_hit/defense]] (closest offered: weapon-lodge) [effect: condition] [menu: weapon-lodge] [same-cell unoffered: absorption interpose] [same-seat rejected: heated-body:legality absorption:legality bloodied-burst:legality resonant-body:legality] [landed: weapon-lodge]
[reskin] signature tally: 1 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 1 · path twist
[reskin] lack took nothing: "understands no Common" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Krennik Skullstandard — bands soft

**Concept:** name: Krennik Skullstandard | riding a worg

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Krennik Skullstandard [seed 1/1] | 4 (2014) | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 2–6.5, n=13)
- **dropped clause:** "Krennik Skullstandard — riding a worg"
- read: def 1 / off 4 → 2.5; sustained 20 (2 × Scimitar); nova Trampling Charge 24; dmg 29

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

Ride-By. Krennik ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Mounted Agility. As a bonus action, Krennik takes the Dash or Disengage action.
Rampage (1/Day). As a bonus action, immediately after dealing damage to a creature that has half of its hit points or fewer, Krennik moves up to half its speed, and it makes one scimitar attack.

Actions
Multiattack: Krennik makes two attacks: one with Scimitar and one with Javelin.
Scimitar: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is knocked prone.
Javelin: Ranged Weapon Attack: +5 to hit, range 30/120 ft., one target. Hit: 7 (1d8 + 3) piercing damage.
Trampling Charge (Recharge 5-6): Krennik moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters must make a DC 13 Dexterity saving throw, taking 24 (7d6) bludgeoning damage on a failed save. On a failed save, the target is also knocked prone.
```

**Where each row came from**

- Traits/Ride-By — the chassis
- Actions/Multiattack — the chassis
- Actions/Scimitar — weapon scimitar
- Actions/Javelin — weapon javelin
- Actions/Trampling Charge — the chassis
- Bonus Actions/Mounted Agility — the chassis
- Bonus Actions/Rampage — library seed rampage

**Engine trace**

```
[path] homebrew — "Krennik Skullstandard" (call)
[route] skirmisher-mounted type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] name: "Krennik Skullstandard" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: mounted→style ✓ ("riding a worg")
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/armed mind=sapient style=mounted energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Krennik Skullstandard"
[concept] mechanics: none claimed
[concept] signature elements: worg-mounted rider [body] | ride-down pass attacks [behavior] | wolf-partner bond [aura]
[concept] identity: Krennik opens by wheeling his worg into a thunderous ride-down, aiming to clip a foe once and carry past before any blade can answer. Each round he loops back for another pass, using his mount's speed to choose when and where the collision happens, and he never stays engaged long enough to trade blows fairly. Cornered, he fights to the death—a wolf-riding reaver with no honor to shield him.
[concept] lore: Krennik Skullstandard was a mounted enforcer for a marauding warband who took a worg as his steed and his standard, and he now rides the borderlands for the simple love of the charge.
[reskin] donor: skirmisher-3-mounted -> CR 4 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] proper noun: "Krennik Skullstandard" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Krennik" — the call's own answer (person), built from the name
[reskin] inline form: "Krennik" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: charge — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Krennik Skullstandard — riding a worg" -> has (mechanical) [asked: movement] [askMechanic: charge]
[reskin] body verdicts: 23 of 23 answered; not true of this body: snare-bolt, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, web-walker, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, hook-rider, life-drain
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "When Krennik's Scimitar hits a creature, he can urge the worg to seize it: the target must succeed on a Strength saving throw or have the Grappled condition as the worg's jaws close, and Krennik's next Scimitar attack against that Grappled creature is made with Advantage as he leans down to finish it. The worg drags its catch alongside the running beast instead of slowing." [rider/on_hit/condition] [family: mark] — menu: affliction, contagion, charge-push, pounce, isolation, bolt-mark, charge, bolt-restrain, bolt-drag (+ shelf: condition-payoff, throw-retrieve, shield-bash, lure, sensory-strike, disarm, delayed-brand, exploiter, obstacle-pull, slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, snap-shot, riposte)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — charge: pounce, charge
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: pounce (on_hit/condition), charge (on_hit/damage), affliction (on_hit/condition)
[reskin] classification handed to the fit call: shape=movement
[reskin] word match declined by the call: pounce, charge, affliction, contagion, bolt-mark, isolation, bolt-drag, exploiter, condition-payoff, obstacle-pull, slow-bolt — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "bolt-restrain" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: a Strength save that Grapples the target and grants Advantage on the rider's nex)
[reskin] free signature row: action — "bolt-restrain" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] rider declined: "Worg Seize" — a rider rides the user's own attack, so it needs the user's own ask; the call offered no quote, and the key table finds no verb either (the gong's bandaged concussion, 2026-10-01)
[reskin] fallback respects the call: condition-payoff, exploiter left the shelf — the call declined them for this sheet
[reskin] value check: "Rampage (1/Day)" EV 8.5 vs floor 1.6 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Krennik and his worg fight as one animal: while mounted, if Krennik is subjected to an effect that would give him the Frightened or Charmed condition, the worg's snarl steadies him and he can use his Reaction to have the worg make a bite attack against the source instead. The beast answers for its rider." [trait/on_being_hit/defense] [family: sentinel] — menu: EMPTY (+ shelf: spider-climb, phobia, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial)
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does defense; leading: fear-aura (start_of_turn/condition)
[reskin] classification handed to the fit call: shape=movement
[reskin] word match declined by the call: fear-aura — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "fear-aura" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: a reaction that redirects the condition's source into the worg's bite attack)
[reskin] free signature row: "Worg's Snarl" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): fear-aura -> Traits/"Worg's Snarl" ("Krennik and his worg fight as one animal: while mounted, if Krennik is subjected to an effect that would give him the Frightened or Charmed condition, the worg' [verb: frightens:idea, frightening:idea]")
[reskin] one mechanic, one name: Traits/"Worg's Snarl" -> "Fear Aura" — this row is fear-aura and does what every fear-aura row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Scimitar = scimitar; Javelin = javelin
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] chassis nova: "Worg Charge (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "Krennik Skullstandard" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget by card size: CR 4 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free row over budget: Traits/"Fear Aura" leaves at ship — this sheet's free-row budget (0) is spent by a row that SHIPPED
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 0 kept (budget 0)
[reskin] save re-derived after a retype: Actions/Worg Charge — a Strength save for a condition the row IMPOSES, which calls for Dexterity or Constitution (A2: a condition the row merely requires does not pick the stat)
audit finding below confidence gate: Ride-By The block is titled Krennik Skullstandard but every entry refers to it as Krennik, a referent the statblock header never establishes as a short form; the name in the block is the full name.
[reskin] audit rename: "Worg Charge (Recharge 5-6)" -> "Trampling Charge (Recharge 5-6)"
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Rampage (1/Day)) — the sameness metric
[reskin] [gap] a Strength save that Grapples the target and grants Advantage on the rider's next attack against it, rather than a fixed — "When Krennik's Scimitar hits a creature, he can urge the worg to seize it: the target must succeed on a Strength saving throw or have the Grappled condition as the worg's jaws close, and Krennik's next Scimitar attack against that Grappled creature is made with Advantage as he leans down to finish it. The worg drags its catch alongside the running beast instead of slowing." — Krennik Skullstandard [seat: action [rider/on_hit/condition]] (closest offered: bolt-restrain) [effect: condition] [menu: pounce charge affliction contagion bolt-mark bolt-restrain charge-push isolation bolt-drag exploiter condition-payoff obstacle-pull slow-bolt] [same-cell unoffered: stunning-strike life-drain snatch] [same-seat rejected: stunning-strike:legality hook-rider:legality life-drain:legality snatch:legality] [VETOED AFTER ACCEPTANCE: bolt-restrain never reached the sheet — died at the weld (a rider needs the GM's own ask) (Worg Seize)]
[reskin] [gap] a reaction that redirects the condition's source into the worg's bite attack — "Krennik and his worg fight as one animal: while mounted, if Krennik is subjected to an effect that would give him the Frightened or Charmed condition, the worg's snarl steadies him and he can use his Reaction to have the worg make a bite attack against the source instead. The beast answers for its rider." — Krennik Skullstandard [seat: trait [trait/on_being_hit/defense]] (closest offered: fear-aura) [effect: condition] [menu: fear-aura] [same-cell unoffered: absorption interpose] [same-seat rejected: heated-body:legality absorption:legality bloodied-burst:legality resonant-body:legality weapon-lodge:role] [VETOED AFTER ACCEPTANCE: fear-aura never reached the sheet — died at the free-row budget (only 0 free row(s) allowed on this sheet)]
[reskin] signature outcome: 2 of 2 accepted signature pick(s) never reached the sheet — 1x the weld (a rider needs the GM's own ask), 1x the free-row budget
[reskin] signature tally: 1 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 2 of 2 (1x the weld (a rider needs the GM's own ask), 1x the free-row budget) · path homebrew
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

darkvision 60 ft., passive Perception 16

Languages: 

None

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Choking Fumes. Any creature that starts its turn within 10 feet of the hydra must make a DC 16 Constitution saving throw. On a failed save, the target is poisoned until the start of its next turn. On a successful save, the target is immune to this creature's aura for 24 hours.
Hold Breath. The hydra can hold its breath for 1 hour.
Multiple Heads. The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead.
Reactive Heads. For each head the hydra has beyond one, it gets an extra reaction that can be used only for opportunity attacks.

Actions
Multiattack: The hydra makes as many Bite attacks as it has heads.
Bite: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Bite — print's own row
- Traits/Choking Fumes — template composed:zone:condition:poisoned; library draw (seed unstamped)
- Traits/Hold Breath — print's own row
- Traits/Multiple Heads — print's own row
- Traits/Reactive Heads — print's own row

**Engine trace**

```
[path] twist — Hydra (is) — "Name field: Hydra" (code)
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("stumps smoke instead of regrowing") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] name: "Hydra" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=venomous/bestial mind=bestial style=regenerator energy=Poison mix=both identity=✓ lore=✓
[concept] name: provided "Hydra"
[concept] mechanics: regeneration
[concept] signature elements: stumps that smoke instead of regrowing [body] | choking fume shroud of its own burning wounds [aura] | flailing sweep of remaining heads [behavior]
[concept] identity: A hydra of waxen, tallow-fleshed necks that does not regrow its severed heads — each stump crusts over and smolders, venting a greasy black smoke that clings and chokes. It wades into a fight swinging its remaining heads in a wide, flailing sweep while the smoking wounds hide its bulk behind a drifting shroud, and it never retreats: the more heads it loses, the hotter and thicker its smoke burns, until it is a walking bonfire of its own ruin. It presses forward relentlessly, driven by a dull, dumb fury that only wants the offending thing within reach of its jaws.
[concept] lore: Spawned where a hydra's regenerative flesh was cursed to burn instead of heal, it wanders the smoking marshes of its birth seeking warmth and flesh to smother in its fumes.
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
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: "instead of regrowing"
[reskin] clauses: "Hydra — whose stumps smoke instead of regrowing" -> LACKS (mechanical) [asked: save_single] [askMechanic: zone]
[reskin] body verdicts: 33 of 33 answered; not true of this body: active-toll, random-ray, herd, drain, shell-withdraw, rally, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The hydra sweeps its surviving necks in a wide, flailing arc, and each creature in its path must make a Dexterity saving throw as the smoking stumps drag a choking shroud across the battlefield. On a failure, the target takes Poison damage and is Blinded until the end of its next turn as greasy tallow-ash clings to its eyes and throat." [action/save/condition] [family: zone] — menu: trample, leap, thrown-burst, shield-bash, ground-burst, spew, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, zone, zone-seed, execute, lure, pacify, sensory-strike, curse-debt, reveal (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, coating, affliction, contagion, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), escalating-dread (save/condition), terror-pulse (save/condition)
[reskin] keys would have bound: action — zone-seed, zone (smoke)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: sensory-strike, shield-bash, push-prone — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "spew" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: a wide sweep hitting every creature in its path, blinding those who fail for a t)
[reskin] free signature row: action — "spew" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Smoking Sweep (Recharge 5-6)" is HANDED "Hydra — whose stumps smoke instead of regrowing" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] seat takes its clause: "Smoking Sweep (Recharge 5-6)" is HANDED "Hydra — whose stumps smoke instead of regrowing" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: spew -> Actions/"Smoking Sweep (Recharge 5-6)" ("The idea is a Dexterity-save area effect that deals Poison damage and Blinds unt [shape fit, no verb match]")
[reskin] signature idea (trait): "The hydra's crusted stumps never regrow — instead they smolder hotter the more heads it loses. While the hydra is Bloodied, the smoke pouring from its wounds thickens: each creature that starts its turn within reach of it must succeed on a Constitution saving throw or be Poisoned until the start of its next turn, as the fumes sear its lungs and blur its senses." [trait/start_of_turn/condition] [family: zone] — menu: spider-climb, phobia, terrain-walk, energy-aura, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: heated-body, weapon-lodge)
[reskin] lead by this seat's own clause: trait — "zone" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — zone: energy-aura
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: energy-aura (start_of_turn/damage), noxious-aura (start_of_turn/condition), truth-aura (start_of_turn/condition)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: fear-aura, truth-aura, energy-aura, phobia, berserk — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:zone:condition:poisoned: the call picked it off the menu (what no printed template did: unstated)
[reskin] free signature row: trait — "composed:zone:condition:poisoned" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "choking fume shroud of its own burning wounds" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 2
[reskin] free signature row: "Smoldering Stumps" — the trait seat cannot quote the GM, but the call names the element it expresses: "choking fume shroud of its own burning wounds". Earns no clause credit; the twist/class path allows 1 and this is number 3
[reskin] seat takes its clause: "Smoldering Stumps" is HANDED "Hydra — whose stumps smoke instead of regrowing" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): composed:zone:condition:poisoned -> Traits/"Smoldering Stumps" ("Each creature that starts its turn in the smoke/aura must succeed on a Constitut [shape fit, no verb match]")
[reskin] one mechanic, one name: Actions/"Smoking Sweep (Recharge 5-6)" -> "Noxious Spew (Recharge 5-6)" — this row is spew and does what every spew row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Bite = none
[reskin] speed by concept: added Swim 40 ft. — the concept's movement set decides
[reskin] print canon multiattack: "the hydra makes as many Bite attacks as it has heads." — the Hydra's own
[reskin] languages held: None stands — INT 2 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon skills: "Athletics +8, Perception +3" -> "Perception +6" — the Hydra's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities none -> Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious — the Hydra's own header lines
[reskin] print canon trait: Hold Breath — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Multiple Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Reactive Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] free-row order: "Smoldering Stumps" [element] > "Noxious Spew" [undefined] — a receipt row is never displaced by one without
[reskin] free row over budget: Actions/"Noxious Spew" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Smoldering Stumps" [no template]
[reskin] element expressed: Smoldering Stumps carries "choking fume shroud of its own burning wounds" — "any creature that starts its turn in a 10-foot Emanation originating from the hy"
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rename: "Smoldering Stumps" -> "Choking Fumes"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a wide sweep hitting every creature in its path, blinding those who fail for a turn — "The hydra sweeps its surviving necks in a wide, flailing arc, and each creature in its path must make a Dexterity saving throw as the smoking stumps drag a choking shroud across the battlefield. On a failure, the target takes Poison damage and is Blinded until the end of its next turn as greasy tallow-ash clings to its eyes and throat." — Hydra [seat: action [action/save/condition]] (closest offered: spew) [effect: condition] [menu: shield-bash escalating-dread terror-pulse push-prone lure pacify sensory-strike reveal trample leap thrown-burst ground-burst spew thrown-burst-seed wind-up execute curse-debt zone affliction zone-seed coating] [same-cell unoffered: swallow gaze-single snare seal random-ray snare-bolt] [same-seat rejected: swallow:legality gaze-single:role snare:role reel:role condition-payoff:legality seal:role hook-drag:legality active-toll:legality pull-through:role random-ray:legality burrow-ambush:legality obstacle-pull:role snare-bolt:role slow-bolt:role disarm:role herd:legality drain:legality exploiter:legality blighted-ground:role] [VETOED AFTER ACCEPTANCE: spew never reached the sheet — died at the free-row budget (only 1 free row(s) allowed on this sheet)]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the free-row budget
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the free-row budget) · path twist
[reskin] lacks clause: Traits/"Multiple Heads" keeps its blow, loses the regeneration — "Hydra — whose stumps smoke instead of regrowing"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Adult Red Dragon — in the run

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

Wounded Fury. While it has half of its hit points or fewer, the dragon has advantage on attack rolls.
Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead.
Sight Weakness. The dragon has disadvantage on Wisdom (Perception) checks that rely on sight.

Actions
Multiattack: The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray.
Rend: Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 13 (1d10 + 8) slashing damage plus 5 (2d4) fire damage. If the target is a creature, it must make a DC 21 Constitution saving throw. On a failed save, the target is poisoned. While poisoned this way, the target can't regain hit points. The condition lasts until the target finishes a long rest or is cured by the lesser restoration spell or similar magic. On a successful save, the target is immune to this creature's contagion for 24 hours.
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

- Traits/Bloodied Fury — template bloodied-fury; library draw (seed unstamped)
- Traits/Legendary Resistance — the chassis
- Traits/Sight Weakness — the GM's clause "Adult Red Dragon — blind in one eye from an old lance"
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
[concept] hints: dragon→body ✓ ("Adult Red Dragon — a true dragon body")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/terror mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Adult Red Dragon"
[concept] mechanics: breath
[concept] signature elements: blind in one eye from a lance wound [body] | fire-breath strafing runs [behavior] | roaring terror that scatters formations [aura]
[concept] identity: A titanic red dragon, its left eye a lanced ruin, opens with a strafing flyby that favors its blind side as a feint and a fire-breath sweep that scours the ground where prey thought it was safe. Every round after is a cycle of climbing, banking, and diving to break formations, landing only to crush and bite when its breath recharges. Under pressure it remembers the lance: it fixates on archers and pikemen, roars to scatter them, and refuses to flee until it has burned the wound's memory out of the world.
[concept] lore: It once held the Cinder Peaks as a wyrm-king, until a mortal lance drove through its eye and its pride; it now hunts that same mountain road, wanting the humiliating smallfolk to kneel and the memory of the wound to die with them.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] print canon defenses: HP 256 -> 256, AC 20 -> 19 — the Adult Red Dragon's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 27, DEX 10, CON 25, INT 16, WIS 13, CHA 23 — the Adult Red Dragon's at its own CR; attack +10 -> +14, DC 21 (print's)
[reskin] donor: dragon-15 -> CR 17
[reskin] [path] decides: twist on the Adult Red Dragon (the matcher agrees)
[reskin] print canon: "Adult Red Dragon — blind in one eye from an old lance" heads on the Adult Red Dragon — print's rows ride along; the seat stays
[reskin] name_element answered: Fire Breath = literal
[reskin] repair round 1: 1 defect(s) — name "Wing Sweep" promises the Prone condition but the row never delivers it — name what the rule does, or drop the claim word; this row earns Stride, Rush, Surge
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the dragon" — the call answered "the adult red dragon" (kind), which the name does not support
[reskin] spell DC coherence: DC 19 -> 20 off Charisma 23 (print's array stays)
[reskin] save dc derived: DC 19 -> 20 (8 + PB 6 + Charisma's 6) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: "blind in one eye"
[reskin] lacks refused: "from an old lance" names no absence — nothing in it takes anything away
[reskin] clauses: "Adult Red Dragon — blind in one eye from an old lance" -> LACKS (mechanical)
[reskin] body verdicts: 32 of 32 answered; not true of this body: snare, seal, drain, shell-withdraw, rally, coating, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, blurred-form, death-burst, hook-rider, life-drain
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, exploiter, sensory-strike, aggro-curse, own-turn-punisher, self-invisibility, focus (the sheet cannot render them)
[reskin] signature idea (action): "The dragon fixes its one good eye on a creature it can see and marks it as the wound's heir: until the dragon's next turn, the first time that creature moves, the dragon can use its reaction to fly up to its Speed toward it without provoking Opportunity Attacks, and its next Bite against the marked creature on this turn scores a critical hit." [rider/on_hit/condition] [family: mark] — menu: contagion, stunning-strike, charge-push, pounce, charge (+ shelf: condition-payoff, execute, throw-retrieve, shield-bash, lure, lay-on-hands, second-wind)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: contagion (on_hit/condition), stunning-strike (on_hit/condition), pounce (on_hit/condition)
[reskin] keys would have bound: action — charge, throw-retrieve (lance)
[reskin] classification handed to the fit call: mechanic=breath
[reskin] word match declined by the call: contagion, stunning-strike, pounce, charge-push, charge — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "contagion" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: marks one seen creature so that when it moves the dragon can react with flight a)
[reskin] free signature row: action — "contagion" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Heir Mark" is HANDED "Adult Red Dragon — blind in one eye from an old lance" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] seat takes its clause: "Heir Mark" is HANDED "Adult Red Dragon — blind in one eye from an old lance" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature rider: contagion -> Bite (appended; The idea is a mark-and-react rider that: marks a visible creature, lets the drag [shape fit, no verb match])
[reskin] signature idea (trait): "The dragon's ruined eye socket sees nothing but the lance that made it. When a creature within its blindsight deals piercing damage to the dragon, the dragon has advantage on its next attack roll against that creature before the end of its next turn, and its Bite ignores the creature's Resistance to piercing damage." [trait/on_being_hit/condition] [family: payoff] — menu: heated-body, weapon-lodge (+ shelf: spider-climb, phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial)
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does condition; leading: heated-body (on_being_hit/damage), weapon-lodge (on_being_hit/resource), bloodied-fury (always/defense)
[reskin] classification handed to the fit call: mechanic=breath
[reskin] word match declined by the call: heated-body, weapon-lodge, bloodied-fury — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "bloodied-fury" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: targets one attacker who wounded it and gives its Bite advantage plus ignores Re)
[reskin] free signature row: trait — "bloodied-fury" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Ruined Eye Vendetta" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Ruined Eye Vendetta" is HANDED "Adult Red Dragon — blind in one eye from an old lance" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): bloodied-fury -> Traits/"Ruined Eye Vendetta" ("The idea is conditional advantage and ignoring Resistance on the Bite against a  [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Ruined Eye Vendetta" -> "Bloodied Fury" — this row is bloodied-fury and does what every bloodied-fury row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Bite = none; Wing Buffet = none; Wing Sweep = none; Fire Breath = none; Lance-Memory Roar = none; Terror Roar = none
[reskin] chassis nova: "Fire Breath (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] print canon alignment: Neutral Evil -> Chaotic Evil — the Adult Red Dragon's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Bite" -> "Rend" — the Adult Red Dragon's own row
[reskin] print canon multiattack: "the dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast *Scorching Ray*." — the Adult Red Dragon's own
[reskin] element immunity: Fire (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 -> 60
[reskin] dragon spell DC derived: 20 (8 + PB + Cha mod — the breath keeps the card DC)
[reskin] dragon mental save DC derived: "Terror Roar" -> 20 (the Frightful Presence class keys to Charisma)
[reskin] immunities stamped for type: Dragon -> Fire
[reskin] print canon skills: "Perception +7, Stealth +6" -> "Perception +13, Stealth +6" — the Adult Red Dragon's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Fire Breath (Recharge 5-6)" is the seat's nova, not the Adult Red Dragon's
[reskin] print canon row: Actions/Fire Breath (Recharge 5-6) — the Adult Red Dragon's own
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon legendary: Commanding Presence, Fiery Rays, Pounce — the Adult Red Dragon's own kit stands where the chassis's stood
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Bloodied Fury" [trait/always/defense]
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Bloodied Fury")
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rewrite blocked — "Commanding Presence" is engine-authored chassis text
[reskin] audit rewrite blocked — "Fiery Rays" is engine-authored chassis text
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] marks one seen creature so that when it moves the dragon can react with flight and crit its next Bite — "The dragon fixes its one good eye on a creature it can see and marks it as the wound's heir: until the dragon's next turn, the first time that creature moves, the dragon can use its reaction to fly up to its Speed toward it without provoking Opportunity Attacks, and its next Bite against the marked creature on this turn scores a critical hit." — Adult Red Dragon [seat: action [rider/on_hit/condition]] (closest offered: contagion) [effect: condition] [menu: contagion stunning-strike pounce charge-push charge] [same-cell unoffered: affliction life-drain snatch bolt-restrain bolt-mark] [same-seat rejected: affliction:legality hook-rider:legality isolation:role life-drain:legality snatch:legality bolt-restrain:legality bolt-drag:legality bolt-mark:legality] [landed: contagion]
[reskin] [gap] targets one attacker who wounded it and gives its Bite advantage plus ignores Resistance to piercing — "The dragon's ruined eye socket sees nothing but the lance that made it. When a creature within its blindsight deals piercing damage to the dragon, the dragon has advantage on its next attack roll against that creature before the end of its next turn, and its Bite ignores the creature's Resistance to piercing damage." — Adult Red Dragon [seat: trait [trait/on_being_hit/condition]] (closest offered: bloodied-fury) [effect: defense] [menu: heated-body weapon-lodge bloodied-fury] [same-cell unoffered: none] [same-seat rejected: absorption:legality bloodied-burst:legality resonant-body:legality] [landed: bloodied-fury]
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 2 decoration, 1 free · accepted picks lost: 0 of 2 · path twist
[reskin] flaw row: "Sight Weakness" — "Adult Red Dragon — blind in one eye from an old lance" removed no row, so the absence costs the creature something instead (print's grammar: 11 of 329 blocks carry one; owner's ruling 1f)
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Bone Sun Archlich — in the run

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bone Sun Archlich | 20 (2014) | caster-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 19 / off 20 → 19.5; sustained 126 (3 × Eldritch Burst + legendary Deathly Teleport); nova none; dmg 126

```
Bone Sun Archlich
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

truesight 120 ft., passive Perception 18

Languages: 

All

Challenge

20 (25,000 XP)

Proficiency Bonus:

+6

Bone Shard Orbit. At the end of each of the archlich's turns, each creature within 5 feet of the archlich takes 13 (3d8) fire damage.
Legendary Resistance (3/Day). If the archlich fails a saving throw, it can choose to succeed instead.
Spirit Jar. If destroyed, the archlich reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the archlich's lair.
Sunbone Root (2/Day). As a bonus action, the archlich fills a 15-foot-radius sphere centered on a point it can see within 60 feet. The area is lightly obscured and difficult terrain until the start of the archlich's next turn.
Protective Magic (3/Day) (Reaction). When the archlich is hit by an attack, the archlich casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: The archlich makes three attacks, using Eldritch Burst or Paralyzing Touch. It can replace one attack with a use of Spellcasting to cast Scorching Ray.
Eldritch Burst: Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 31 (4d12 + 5) force damage.
Paralyzing Touch: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed until the start of the archlich's next turn.
Spellcasting: The archlich casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 19): -

At will: detect magic, detect thoughts, dispel magic, fireball, invisibility, lightning bolt, mage hand, prestidigitation

2/day each: animate dead, dimension door, plane shift

1/day each: chain lightning, finger of death, power word kill, scrying
Legendary Actions

The archlich can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The archlich regains spent legendary actions at the start of its turn.

Deathly Teleport: The archlich teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an undead within 20 feet of the archlich must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one. Regardless of the result, the archlich can't take this action again until the start of its next turn.
Frightening Gaze: The archlich casts fear, using the same spellcasting ability as Spellcasting. The archlich can't take this action again until the start of its next turn.
```

**Where each row came from**

- Traits/Bone Shard Orbit — template energy-aura; library draw (seed unstamped)
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
- Bonus Actions/Sunbone Root — template zone-seed; library draw (seed unstamped)

**Engine trace**

```
[path] twist — Lich (is) — "an archlich" (call)
[route] caster (artillery) type=Undead mechanics=aura — casts: implied by the kind — "archlich" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("archlich") | caster: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "Sketch this D&D monster concept's combat…" is the description, not a name
[concept] resolve: archetype=caster type=Undead themes=grave/arcane mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: a throne of burning bone [body] | hurls and regrows rib-shards as ammunition [behavior] | a corona of scorching bone-light [aura]
[concept] identity: The Bone Sun opens with a fusillade of scorching bone-shards thrown across the battlefield from its throne, then hovers above the carnage feeding spent fragments back into its blazing corona to re-arm. It fights to the death with the patient contempt of something that has already outlived every enemy it has ever faced, plucking and re-planting its own ribs as ammunition rather than ever deigning to close to melee.
[concept] lore: An archlich who traded its mortal flesh to kindle a small dying star from the bones of a slaughtered empire, it now orbits the burning skeleton of that world and wants only to find the last living witnesses to its ascension and add their marrow to its fire.
[reskin] print canon pb: print's +12 on PB +7 reads +11 on this sheet's PB +6; DCs follow
[reskin] print canon defenses: HP 300 -> 315, AC 19 -> 20 — the Lich's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 21, WIS 14, CHA 16 — the Lich's at its own CR; attack +10 -> +11, DC 19 (print's, on this sheet's PB)
[reskin] donor: caster-21 -> CR 20
[reskin] [path] decides: twist on the Lich (the matcher agrees)
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Skeletal Grasp" promises the Grappled condition but the row never delivers it — name what the rule does, or drop the claim word; this row earns Strike, Blow, Lash
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the archlich" — the call's own answer (kind), built from the name
[reskin] inline form: "the archlich" — the model's own reading of the name
[reskin] fear unearned by the damage: "Skeletal Grasp" would have imposed Frightened on a Bludgeoning row — print pairs Frightened with Psychic or Thunder damage and with nothing else; the clause leaves and the row keeps its damage
[reskin] the sheet's declared ask: zone — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an archlich enthroned on a sun of bone" -> has (descriptive), head
[reskin] body verdicts: 31 of 31 answered; not true of this body: snare, seal, snare-bolt, herd, rally, phase-slip, false-appearance, terrain-walk, web-walker, noxious-aura, uncanny-sense, sealed-body, warded-mending, mimicry, gaze-aura, blurred-form, life-drain
[reskin] menu pruned: action — thrown-burst-seed, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The archlich wrenches free a burning rib and plants it in an unoccupied space it can see, where it takes root and grows a shard of the bone sun: the ground within a short range of the planted rib is scorched consecrated terrain that is difficult terrain for its enemies and which the archlich and its Bone Shard salvos treat as open line. The rib stands until it is destroyed or the archlich plants a" [action/always/movement] [family: zone] — menu: gaze-single, condition-payoff, execute, lure, obstacle-pull, pacify, escalating-dread, slow-bolt, sensory-strike, drain, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, focus, feint-slip, bolt-restrain, bolt-drag, bolt-mark)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] declared mechanic leads the menu: action — zone: zone-seed
[reskin] menu ordered by the idea's stamps: action — idea fires always/does movement; leading: zone-seed (always/movement), obstacle-pull (save/movement), slow-bolt (save/movement)
[reskin] classification handed to the fit call: mechanic=aura
[reskin] word match declined by the call: zone-seed — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "zone-seed" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: persistent consecrated terrain anchored at a planted point that also extends the)
[reskin] pick kept on the GM's own words: action — "zone-seed" has no key-table verb, but the call quotes "an archlich enthroned on a sun of bone" from the description
[reskin] seat takes its clause: "Sunbone Root (2/Day)" is HANDED "an archlich enthroned on a sun of bone" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: zone-seed -> Actions/"Sunbone Root (2/Day)" ("The idea describes a planted rib that creates a persistent scorched, consecrated [shape fit, no verb match]")
[reskin] signature idea (trait): "The Bone Sun is not a body but an orbit: chunks of the dead world it kindled drift around it, and any creature that comes within reach of it is pelted and seared by the turning shards as it moves through its own emanation — the archlich ignores the hurt, and there is no safe standing beside the throne." [trait/start_of_turn/damage] [family: zone] — menu: spider-climb, phobia, aberrant-ground, faultless-tracker, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, marking-light, relic-object, undead-fortitude, truth-aura, fear-aura, death-burst, kill-denial (+ shelf: heated-body, absorption, bloodied-burst, resonant-body)
[reskin] composed candidates on the menu: trait — composed:zone:damage (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — zone: aberrant-ground, energy-aura
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does damage; leading: aberrant-ground (always/movement), energy-aura (start_of_turn/damage), composed:zone:damage (start_of_turn/damage)
[reskin] classification handed to the fit call: mechanic=aura
[reskin] free signature row: trait — "energy-aura" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "a corona of scorching bone-light" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] free signature row: "Bone Shard Orbit" — the trait seat cannot quote the GM, but the call names the element it expresses: "a corona of scorching bone-light". Earns no clause credit; the twist/class path allows 1 and this is number 2
[reskin] seat takes its clause: "Bone Shard Orbit" is HANDED "an archlich enthroned on a sun of bone" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): energy-aura -> Traits/"Bone Shard Orbit" ("the drifting shards around the archlich sear any creature that comes within reac [shape fit, no verb match]")
[reskin] weapons answered: Bone Shard = none; Skeletal Grasp = none
[reskin] chassis nova: "Corona Burst (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] speed by concept: dropped Fly 30 ft. (hover) — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon size: Gargantuan -> Medium — the Lich's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon attack: "Bone Shard" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon attack: "Skeletal Grasp" -> "Paralyzing Touch" — the Lich's own row
[reskin] print canon multiattack: "the archlich makes three attacks, using Eldritch Burst or Paralyzing Touch in any combination." — the Lich's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon skills: "Arcana +11, Perception +8" -> "Arcana +17, History +11, Insight +8, Perception +8" — the Lich's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] resistances derived withheld: print's Lich owns the line (Cold, Lightning)
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Corona Burst (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] dead control row: "Sunbone Root (2/Day)" moves to Bonus Actions — no damage, no save, no KO condition
[reskin] multiattack replacement clause: It can replace one attack with a use of Spellcasting to cast *Scorching Ray*.
[reskin] free-row budget by card size: CR 20 sits in band 17-20, where print runs 7-9 rows (p20-p90, Multiattack excluded); this card already carries 11 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Bone Shard Orbit" [trait/start_of_turn/damage]
[reskin] element expressed: Bone Shard Orbit carries "a corona of scorching bone-light" — "takes 13 (3d8) Fire damage"
audit finding below confidence gate: Eldritch Burst Eldritch is invented-sounding register rather than plain English describing the attack; the entry is a generic Force-damage attack.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rewrite blocked — "Frightening Gaze" is engine-authored chassis text
[reskin] audit rename blocked — "Bone Shard Orbit" -> "Scorching Halo" would drop the GM's own word "bone" from a row bound to "a corona of scorching bone-light"; the mechanic would stay and the receipt would not
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] persistent consecrated terrain anchored at a planted point that also extends the archlich's line of effect and shields i — "The archlich wrenches free a burning rib and plants it in an unoccupied space it can see, where it takes root and grows a shard of the bone sun: the ground within a short range of the planted rib is scorched consecrated terrain that is difficult terrain for its enemies and which the archlich and its Bone Shard salvos treat as open line. The rib stands until it is destroyed or the archlich plants a" — Bone Sun Archlich [seat: action [action/always/movement]] (closest offered: zone-seed) [effect: movement] [menu: zone-seed obstacle-pull slow-bolt gaze-single condition-payoff execute lure pacify escalating-dread sensory-strike drain curse-debt reveal bolt-restrain] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: throw-retrieve:role] [landed: zone-seed]
[reskin] signature tally: 1 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 1 · path twist
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
[concept] hints: dragon→body ✓ ("Ancient Gold Dragon")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/aerial mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Ancient Gold Dragon"
[concept] mechanics: breath
[concept] signature elements: molten gold breath weapon [behavior] | gilded scales [body] | overwhelming frightful presence [aura]
[concept] identity: An ancient gold dragon descends on the battlefield in a storm of molten gold and searing fire, opening with its overwhelming Frightful Presence and a devastating cone of flame before closing to shred anything that stands with claws, teeth, and sweeping tail. Every round it alternates breath and melee, using its wings to reposition and its legendary resistance to shrug off the few spells that could threaten it. It is imperious and patient, but once bloodied it fights to the death rather than retreat, because surrender is beneath its ancient dignity.
[concept] lore: A gold dragon that has lived for millennia, hoarding treasure and knowledge in a mountain lair, and it shelters the mortals and lesser creatures of its territory even as it judges them from on high.
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
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1793327489576:1468:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1793327489576:1307:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1793327489576:657:5)
!! [ENRICHMENT] Failed to enrich Owlbear: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1793327489576:1468:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1793327489576:1307:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1793327489576:657:5)
[path] exact — Goblin Boss (is) — "Goblin Boss" (code)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("Goblin Boss") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] resolve: archetype=skirmisher type=Humanoid themes=terror/grasping mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Goblin Boss"
[concept] mechanics: none claimed
[concept] signature elements: ambush from hiding [behavior] | barking command that repositions allies [behavior] | cowardly retreat when bloodied [behavior]
[concept] identity: The Goblin Boss opens by melting into the clutter and shadows of its lair, then lunges out with advantage to stab and shove a victim into the open for its gang to swarm. Each round it darts and cowers, using its small body and a sudden, barking command to reposition an ally or itself, always striking from the rear before slipping back into cover. It is a bully that taunts and toys with prey but turns and runs when bloodied, abandoning its followers without a second thought.
[concept] lore: A goblin boss is the meanest and cleverest survivor of a goblin warren, a scarred schemer who clawed to the top of the heap through ambush, backstabbing, and sheer ruthlessness and now guards that perch with paranoid cunning.
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
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Goblin Boss" -> has (descriptive), head
[reskin] body verdicts: 26 of 26 answered; not true of this body: snare, spew, snare-bolt, blink, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] weapons answered: Rusty Shiv = dagger; Sling = sling
[reskin] weapon declared: "Rusty Shiv" is a dagger — the call's own answer
[reskin] weapon dice follow the weapon: "Rusty Shiv" is a dagger (d4) — "6 (1d8 + 2)" becomes "7 (2d4 + 2)", print's rule of keeping the die and scaling the count
[reskin] weapon table: "Sling" — a launcher, never thrown, range 30/120
[reskin] print canon speed: modes walk only — the Goblin Boss's
[reskin] print canon senses: "darkvision 60 ft." — the Goblin Boss's
[reskin] print canon type: Humanoid stays — the Goblin Boss is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon alignment: Neutral Evil -> Chaotic Neutral — the Goblin Boss's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Rusty Shiv" -> "Scimitar" — the Goblin Boss's own row
[reskin] print canon multiattack: "the goblin boss makes two attacks, using Scimitar or Shortbow in any combination." — the Goblin Boss's own
[reskin] print canon attack: "Shortbow" is print's own row — +4, 5 (1d6 + 2), range 80/320 ft. (an exact body at print's CR)
[reskin] print canon attack: "Sling" -> "Shortbow" — the Goblin Boss's own ranged row
[reskin] print canon skills: "Perception +1, Stealth +4" -> "Stealth +6" — the Goblin Boss's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Traits/"Skittering Cunning" is the seat's, not the Goblin Boss's
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Boss's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Goblin Boss's Nimble Escape
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] signature tally: 1 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path exact
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Iron Gate Warden — in the run

**Concept:** a sentinel of black iron, AC 20, Huge, speed 20 feet

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Iron Gate Warden | 11 (2014) | brute-9-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 9 / off 12 → 10.5; sustained 50 (2 × Iron Fist); nova Crushing Advance 66; dmg 77

```
Iron Gate Warden
Huge construct, neutral
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

darkvision 60 ft., passive Perception 14

Languages: 

Common

Challenge

11 (7,200 XP)

Proficiency Bonus:

+4

Relentless Pursuit. While the warden is moving toward a creature it has damaged within the last 24 hours, the warden's speed can't be reduced and difficult terrain doesn't cost it extra movement.
Acid Absorption. Whenever the warden is subjected to acid damage, it takes no damage and instead regains a number of hit points equal to the acid damage dealt.
Immutable Form. The warden can't shape-shift.
Siege Monster. The warden deals double damage to objects and structures.

Actions
Multiattack: The warden makes two Iron Fist attacks.
Iron Fist: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 25 (6d6 + 4) bludgeoning damage.
Crushing Advance (Recharge 5-6): Each creature in a 30-foot cone must make a DC 16 Constitution saving throw, taking 66 (12d10) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
```

**Where each row came from**

- Traits/Relentless Pursuit — template relentless-pursuit; library draw (seed unstamped)
- Traits/Acid Absorption — the chassis
- Traits/Immutable Form — the chassis
- Traits/Siege Monster — the chassis
- Actions/Multiattack — the chassis
- Actions/Iron Fist — the chassis
- Actions/Crushing Advance — the chassis

**Engine trace**

```
[path] homebrew — "a sentinel of black iron" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("sentinel of black iron") | defender: the call read "sentinel" as not meaning that mechanic here — no override | brute-juggernaut stands: every key that would override it was read as a figure of speech | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] hints: warden→style ✓ ("a sentinel of black iron")
[concept] resolve: archetype=brute type=Construct themes=forged/terror mind=sapient style=juggernaut energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: black iron bulk that breaks what it walks through [body] | grinding iron fists that pin and crush prey [behavior] | unbreakable, unyielding stillness of a bound guardian [aura]
[concept] identity: The sentinel opens by walking straight through cover and terrain, its black iron mass shattering stone and barring escape with a slam that pins prey against the rubble. Every round it advances a single implacable step and hammers the grappled target with pile-driver fists, grinding the snared body against its own torn ground. It does not tire, does not flee, and does not negotiate — it fights until its charge is broken or every intruder is reduced to ruin underfoot.
[concept] lore: A siege-forge's final order given iron flesh, it still paces the ruined gate it was cast to hold, crushing anything that crosses the threshold it remembers.
[reskin] donor: brute-9-juggernaut -> CR 11
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the warden" — the call's own answer (kind), built from the name
[reskin] inline form: "the warden" — the model's own reading of the name
[reskin] save dc derived: DC 17 -> 16 (8 + PB 4 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] alignment by mind: Unaligned -> Neutral — a Construct with INT 6 can hold an ethic (print: 0 of 329 Unaligned blocks speak)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a sentinel of black iron" -> has (descriptive), head | "AC 20" -> has (header) | "Huge" -> has (header) | "speed 20 feet" -> has (header)
[reskin] extraction: 1 of 4 model clauses quote nothing the user typed and leave the record ("AC 20")
[reskin] body verdicts: 27 of 27 answered; not true of this body: herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, bloodied-burst, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The warden grinds its black iron bulk through the ground in a straight line, leaving a trench of shattered stone in its wake. Each creature in that line must make a Dexterity saving throw; on a failure, it takes Bludgeoning damage and has the Prone condition as the churned rubble drags it down." [action/save/condition] [family: zone] — menu: condition-payoff, shield-bash, escalating-dread, terror-pulse, exploiter, lure, pacify, sensory-strike, reveal (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, stunning-strike, charge-push, pounce)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), escalating-dread (save/condition), terror-pulse (save/condition)
[reskin] word match declined by the call: shield-bash, escalating-dread, terror-pulse, lure, pacify, sensory-strike, reveal, condition-payoff, exploiter — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "shield-bash" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: an area line or cone Dexterity save that knocks targets prone and deals bludgeon)
[reskin] free signature row: action — "shield-bash" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] value check: "Iron Trench Grind" EV 13.4 vs floor 12.5 (one attack of 2) — added Success: Half
[reskin] signature template: shield-bash -> Actions/"Iron Trench Grind" ("The idea is a line-shaped Dexterity-save that knocks creatures prone — an area d [shape fit, no verb match]")
[reskin] signature idea (trait): "The warden ignores Difficult Terrain and moves through spaces occupied by other creatures as if they were unoccupied, crushing a path through any obstacle that is not iron." [trait/always/movement] [family: breach] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: absorption, resonant-body, weapon-lodge)
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), relentless-pursuit (always/movement), bound (always/movement)
[reskin] keys would have bound: trait — resonant-body (iron)
[reskin] word match declined by the call: spider-climb, bound, phobia, relentless-pursuit — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "relentless-pursuit" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: ignores Difficult Terrain and passes through occupied spaces, crushing non-iron )
[reskin] free signature row: trait — "relentless-pursuit" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Crushing Advance" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] trait renamed: "Crushing Advance" already names a row — the trait ships as "Relentless Pursuit"
[reskin] signature template (trait): relentless-pursuit -> Traits/"Relentless Pursuit" ("The idea is a creature that ignores Difficult Terrain and moves through other cr [shape fit, no verb match]")
[reskin] one mechanic, one name: Actions/"Iron Trench Grind" -> "Shield Bash" — this row is shield-bash and does what every shield-bash row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Iron Fist = none; Crushing Advance = none
[reskin] chassis nova: "Crushing Advance (Recharge 5-6)" — the brute-9-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Construct -> Acid, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a sentinel of black iron" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] free row over budget: Actions/"Shield Bash" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] multiattack re-read — "Shield Bash" left; "Multiattack" now reads "The warden makes two Iron Fist attacks."
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Relentless Pursuit" [trait/always/movement]
[reskin] lint fixed: prone-duration — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Relentless Pursuit")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] an area line or cone Dexterity save that knocks targets prone and deals bludgeoning damage — "The warden grinds its black iron bulk through the ground in a straight line, leaving a trench of shattered stone in its wake. Each creature in that line must make a Dexterity saving throw; on a failure, it takes Bludgeoning damage and has the Prone condition as the churned rubble drags it down." — Iron Gate Warden [seat: action [action/save/condition]] (closest offered: shield-bash) [effect: condition] [menu: shield-bash escalating-dread terror-pulse lure pacify sensory-strike reveal condition-payoff exploiter] [same-cell unoffered: swallow gaze-single snare seal random-ray snare-bolt push-prone] [same-seat rejected: swallow:legality trample:style leap:legality thrown-burst:style gaze-single:role snare:role reel:role execute:role seal:role hook-drag:legality active-toll:legality pull-through:role random-ray:legality ground-burst:legality spew:legality burrow-ambush:legality obstacle-pull:role snare-bolt:role slow-bolt:role disarm:role herd:legality drain:legality curse-debt:role wind-up:legality blighted-ground:role] [VETOED AFTER ACCEPTANCE: shield-bash never reached the sheet — died at the free-row budget (only 1 free row(s) allowed on this sheet)]
[reskin] [gap] ignores Difficult Terrain and passes through occupied spaces, crushing non-iron obstacles in its path — "The warden ignores Difficult Terrain and moves through spaces occupied by other creatures as if they were unoccupied, crushing a path through any obstacle that is not iron." — Iron Gate Warden [seat: trait [trait/always/movement]] (closest offered: relentless-pursuit) [effect: movement] [menu: spider-climb relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind undead-fortitude truth-aura fear-aura] [same-cell unoffered: blink terrain-walk aberrant-ground web-walker earth-glide tunneler zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality evasion:role marking-light:legality sealed-body:legality relic-object:legality guarded-stance:role mimicry:legality assassinate:role blurred-form:role death-burst:legality kill-denial:legality] [landed: relentless-pursuit]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the free-row budget
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 1 of 2 (1x the free-row budget) · path homebrew
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
Protective Magic (3/Day) (Reaction). When Ilvareth is hit by an attack, Ilvareth casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Ilvareth makes four Arcane Burst attacks. It can replace one attack with a use of Dusk Veil.
Arcane Burst: Melee or Ranged Spell Attack: +9 to hit, reach 5 ft. or range 150 ft., one target. Hit: 27 (4d10 + 5) force damage.
Spellcasting: Ilvareth casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17): -

At will: detect magic, detect thoughts, disguise self, invisibility, light, mage armor, mage hand, prestidigitation

2/day each: fly, lightning bolt

1/day each: cone of cold, mind blank, scrying, teleport
Dusk Veil: One creature within 60 feet of Ilvareth must succeed on a DC 17 Constitution saving throw or be blinded until the end of its next turn.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Arcane Burst — print's own row, renamed
- Actions/Spellcasting — print's own row
- Actions/Dusk Veil — template sensory-strike; library draw (seed unstamped); binds the GM's words: blind+light
- Reactions/Protective Magic — mage kit; the GM's clause "archmage"
- Bonus Actions/Misty Step — mage kit; the GM's clause "bends shadow and steps between places"
- Traits/Magic Resistance — print's own row

**Engine trace**

```
[path] class_npc — class mage — "archmage" (call)
[route] caster (artillery) type=Humanoid mechanics=teleport — casts: on the GM's own words "an elf archmage who bends shadow" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("an elf archmage") | caster: no line key in the words — the model's read of its quote
[concept] name: "Ilvareth Dusksong" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=caster type=Humanoid themes=arcane/uncanny mind=sapient style=— energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: provided "Ilvareth Dusksong"
[concept] mechanics: teleport
[concept] signature elements: stepping between places through shadow [behavior] | a body draped in living shadow [body] | a spell list of shadow and blasting magic [object]
[concept] identity: Ilvareth Dusksong opens a fight by folding the lantern-light shut, stepping through a pocket of shadow to a flank no one is watching, and unloading a volley of shadowfire before anyone can fix his position. Each round he blinks between the gaps in the fight — behind the wizard, above the archer, out of the paladin's reach — trading single heavy bolts for repositioning, and letting his shadow writhe into a wall of grasping dark between himself and danger. Under pressure he does not panic; he retreats further into the dark, thinning the battlefield and picking off whoever is left isolated, and he will happily spend a whole fight toying with a foe who thinks they have cornered him.
[concept] lore: An elf archmage who traded centuries of sunlit scholarship for the shadow paths between places, Ilvareth now haunts the seams of the world, collecting the secrets of anyone foolish enough to walk alone after dusk.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Archmage — the class's own print block, nearest CR 12
[reskin] print canon defenses: HP 168 -> 170, AC 16 -> 17 — the Archmage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 10, DEX 14, CON 12, INT 20, WIS 15, CHA 16 — the Archmage's at its own CR; attack +8 -> +9, DC 17 (print's)
[reskin] donor: caster-12 -> CR 12
[reskin] [path] decides: class_npc on the Archmage · class mage (the matcher would have said twist Archmage)
[reskin] print canon: "Ilvareth Dusksong — An elf archmage who bends shadow and steps between places." heads on the Archmage — print's rows ride along; the seat stays
[reskin] repair round 1: 2 defect(s) — "Shadowfire" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type | "Shadow Step" is not on the spell menu — pick from: Detect Magic, Mage Hand, Minor Illusion, Prestidigitation, Light, Disguise Self, Invisibility, Misty Step, Fog Cloud, Darkness, Dispel Magic, Mirror Image, Blur, Hold Person, Web, Fly, Fireball, Lightning Bolt, Scorching Ray, Shatter, Magic Missile, Guiding Bolt, Mind Spike, Acid Arrow, Ice Knife, Cone of Cold, Blight, Vampiric Touch, Ray of Sickness, Thunderwave, Burning Hands, Ice Storm, Wall of Fire, Cloudkill, Fear, Sleep, Charm Person, Suggestion, Slow, Blindness/Deafness, Bestow Curse, Hypnotic Pattern
[reskin] repair round 2: 1 defect(s) — "Shadowfire" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "archmage": Misty Step (3/Day) (Mage/Misty Step)
[reskin] proper noun: "Ilvareth Dusksong" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Ilvareth" — the call's own answer (person), built from the name
[reskin] inline form: "Ilvareth" — the model's own reading of the name
[reskin] energy withheld on a base row: "Shadowfire" Necrotic -> Piercing (the body's physical type; a Humanoid deals no Necrotic its concept never gave it)
[reskin] spell DC coherence: DC 18 -> 17 off Intelligence 20 (print's array stays)
[reskin] save dc derived: DC 18 -> 17 (8 + PB 4 + Intelligence's 5) — no stat on the sheet reached it
[reskin] the sheet's declared ask: teleport — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "bends shadow and steps between places" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "bends shadow and steps between places" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Ilvareth Dusksong — An elf archmage" -> has (descriptive), head | "bends shadow and steps between places" -> has (mechanical) [asked: at_will/at_will/movement] [askMechanic: teleport]
[reskin] body verdicts: 34 of 34 answered; not true of this body: snare, seal, wail, active-toll, random-ray, spew, snare-bolt, herd, drain, blighted-ground, rally, false-appearance, absorption, bloodied-burst, resonant-body, terrain-walk, aberrant-ground, faultless-tracker, web-walker, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Ilvareth steps into any patch of shadow he can see and out of another, folding the intervening dark like a curtain; a creature within reach of the place he left is caught in the collapsing gloom, left Blinded until the end of its next turn as the light does not return with him. He is not running — he is choosing the ground of the next exchange." [action/save/movement] [family: breach] — menu: thrown-burst, zone, execute, lure, ground-burst, obstacle-pull, pacify, escalating-dread, slow-bolt, sensory-strike, thrown-burst-seed, curse-debt, zone-seed, reveal, wind-up, disarm (+ shelf: gaze-single, delayed-brand, lay-on-hands, aggro-curse, self-invisibility, phase-slip, blink, focus, feint-slip, bolt-restrain, bolt-drag, bolt-mark)
[reskin] composed candidates: none action — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does movement; leading: obstacle-pull (save/movement), slow-bolt (save/movement), disarm (save/movement)
[reskin] keys would have bound: action — phase-slip (step, shadow)
[reskin] classification handed to the fit call: mechanic=teleport
[reskin] word match declined by the call: obstacle-pull, slow-bolt, disarm, zone-seed — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "sensory-strike" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: teleports the creature itself to another patch of shadow and blinds those it lef)
[reskin] seat takes its clause: "Shadow Step" is HANDED "Ilvareth Dusksong — An elf" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: sensory-strike -> Actions/"Shadow Step" ("Ilvareth steps into any patch of shadow he can see and out of another, folding the intervening dark like a curtain; a creature within reach of the place he left [verb: blind:idea, light:idea]")
[reskin] signature idea (trait): "Where Ilvareth has stood, the shadow lingers: the space he leaves behind is webbed with living dark, and any creature that ends its turn in that patch is Grappled by the writhing shade until it tears free. Ilvareth can step through his own shadow-paths unimpeded, leaving the dark to hold the ground he has abandoned." [trait/always/condition] [family: zone] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, blurred-form, berserk
[reskin] verb gate stands down: trait — no template shares a verb, but 2 template(s) whose declared stamps match the idea (always/condition): phobia, berserk; the declared data is the warrant and the call is worth making
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), berserk (always/condition), spider-climb (always/movement)
[reskin] classification handed to the fit call: mechanic=teleport
[reskin] word match declined by the call: phobia, berserk, spider-climb, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, shielded-mind, relentless-pursuit, bound, undead-fortitude, blurred-form, truth-aura, fear-aura, composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:blinded" was named closest but was never on this sheet's menu (a gate refused it, or the pool did not offer it for this idea's declared trigger)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Where Ilvareth has stood, the shadow lingers: the space he leaves behind is webbed with living dark, and any creature that ends its turn in that patch is Grappled by the writhing shade until it tears free. Ilvareth can step through his own shadow-paths unimpeded, leaving the dark to hold the ground he has abandoned." [trait/always/condition] — the model found no template that holds it (offered: phobia, berserk, spider-climb, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, shielded-mind, relentless-pursuit, bound, undead-fortitude, blurred-form, truth-aura, fear-aura, composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded)
[reskin] weapons answered: Shadowfire = none
[reskin] print canon modes: fly off — the Archmage has no such mode and the words name none
[reskin] speed by concept: dropped Fly 30 ft. (hover) — the concept's movement set decides
[reskin] print canon alignment: Neutral Evil -> Neutral — the Archmage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Elvish, Undercommon" -> "Common plus five other languages, Elvish, Undercommon" — the Archmage's plus the concept's Elvish, Undercommon
[reskin] print canon attack: "Shadowfire" -> "Arcane Burst" — the Archmage's own row
[reskin] print canon skills: "Arcana +9, Perception +6" -> "Arcana +13, History +9, Perception +6" — the Archmage's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities none -> Psychic; Charmed ((with Mind Blank)) — the Archmage's own header lines
[reskin] print canon trait: Magic Resistance — "Ilvareth Dusksong — An elf archmage who bends shadow and steps between places." is the Archmage (print's own row)
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] multiattack replacement clause: It can replace one attack with a use of Shadow Step.
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 120 ft.; Passive Perception 16" -> "Passive Perception 16")
[reskin] ask vs row MISMATCH: "bends shadow and steps between places" -> "Misty Step" — limit: asked at_will, row reads per_day
audit finding names unknown entry, dropped: Immunities
audit finding below confidence gate: Shadow Step The entry is formatted as a save effect but omits the standard 'saving throw' phrasing and target range clause structure, reading as a stat name followed by an orphaned save notation.
[reskin] audit rename: "Shadow Step" -> "Dusk Veil"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "archmage" which is not a whole clause — the seat surgery cut it; resolved to cl_176teih
[reskin] [gap] teleports the creature itself to another patch of shadow and blinds those it left behind — "Ilvareth steps into any patch of shadow he can see and out of another, folding the intervening dark like a curtain; a creature within reach of the place he left is caught in the collapsing gloom, left Blinded until the end of its next turn as the light does not return with him. He is not running — he is choosing the ground of the next exchange." — Ilvareth Dusksong [seat: action [action/save/movement]] (closest offered: sensory-strike) [effect: movement] [menu: obstacle-pull slow-bolt disarm thrown-burst execute lure ground-burst pacify escalating-dread sensory-strike thrown-burst-seed curse-debt reveal wind-up zone-seed zone] [same-cell unoffered: reel hook-drag pull-through aggro-curse herd] [same-seat rejected: swallow:role trample:role leap:role gaze-single:legality snare:legality reel:legality condition-payoff:legality seal:legality shield-bash:role hook-drag:role active-toll:legality pull-through:role random-ray:legality spew:legality burrow-ambush:legality terror-pulse:role snare-bolt:legality push-prone:role herd:legality drain:legality exploiter:role blighted-ground:legality] [landed: sensory-strike]
[reskin] [gap] creates a lingering patch on the ground that grapples creatures ending their turn there — "Where Ilvareth has stood, the shadow lingers: the space he leaves behind is webbed with living dark, and any creature that ends its turn in that patch is Grappled by the writhing shade until it tears free. Ilvareth can step through his own shadow-paths unimpeded, leaving the dark to hold the ground he has abandoned." — Ilvareth Dusksong [seat: trait [trait/always/condition]] (closest offered: composed:zone:condition:blinded) [effect: condition] [menu: phobia berserk spider-climb bloodied-fury blood-frenzy pack-tactics death-restoration uncanny-sense shielded-mind relentless-pursuit bound undead-fortitude blurred-form truth-aura fear-aura composed:zone:condition:poisoned composed:zone:condition:frightened composed:zone:condition:deafened composed:zone:condition:blinded] [same-cell unoffered: adhesive faultless-tracker marking-light kill-denial] [same-seat rejected: false-appearance:legality adhesive:role terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality earth-glide:legality tunneler:legality evasion:role marking-light:legality sealed-body:legality relic-object:legality guarded-stance:role mimicry:legality assassinate:role death-burst:legality kill-denial:legality] [row dropped]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 2 (1x the call named no template for the pick) · path class_npc
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Reed-Cloister Adept — in the run

**Concept:** lizardfolk monk

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Reed-Cloister Adept | 5 (2014) | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | FAIL: damage-dice | ok | ok |

- adjudicability · fail · damage-dice: the 2024 model: damage-dice: Actions/Unarmed Strike: "23 (3d8 + 3)" — 3d8 + 3 averages 16
- read: def 5 / off 7 → 6; sustained 46 (2 × Unarmed Strike); nova none; dmg 46

```
Reed-Cloister Adept
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

Hold Breath. The adept can hold its breath for 15 minutes.
Marsh Stride. Difficult terrain composed of mud doesn't cost the adept extra movement, and the adept can move across mud without needing to make an ability check.
Patient Defense. As a bonus action, the adept takes the Dodge action.
Cunning Action. As a bonus action, the adept takes the Dash, Disengage, or Hide action.

Actions
Multiattack: The adept makes two attacks: one with its Unarmed Strike and one with its Dart.
Unarmed Strike: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 23 (3d8 + 3) bludgeoning damage. Once on each of the adept's turns when it hits with this attack, the target is subjected to the following effect. The target must succeed on a DC 14 Constitution saving throw or be stunned until the end of the adept's next turn.
Dart: Ranged Weapon Attack: +6 to hit, range 20/60 ft., one target. Hit: 12 (2d8 + 3) piercing damage.
```

**Where each row came from**

- Traits/Hold Breath — lizardfolk kit; the GM's clause "monk"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "monk"
- Actions/Multiattack — the chassis
- Actions/Unarmed Strike — print's own row, renamed; a declared feature; the GM's clause "monk"
- Actions/Dart — print's own row, renamed; weapon dart
- Bonus Actions/Patient Defense — template patient-defense; monk kit; the GM's clause "monk"
- Bonus Actions/Cunning Action — print's own row

**Engine trace**

```
[path] class_npc — class monk — species lizardfolk — "monk" (call)
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("lizardfolk monk") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: scaled, whip-fast monk strikes [behavior] | darting in and out of reach [behavior] | a marsh clan's cloister discipline [aura]
[concept] identity: A lizardfolk monk opens by stalking the edge of the fight, patient and cold-eyed, then explodes inward with a sudden flurry of scaled fists and whip-fast tail sweeps. Every round after that it circles, feints, and darts back out of reach, striking twice and vanishing before retaliation can land. Under pressure it does not break — it recedes like water, and if the pack is thinning it chooses escape over death, but a cornered one fights with unnerving, methodical calm.
[concept] lore: Raised in the reed-temple cloisters of a marsh clan, a lizardfolk monk trains its whole life to turn breath into stillness and stillness into violence, and it leaves the cloister only to execute the judgments its elders will not name aloud.
[reskin] [path] class body: the monk stands on the Spy — the class's own print block, nearest CR 5
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 5
[reskin] [path] decides: class_npc on the Spy · class monk (the matcher would have said homebrew)
[reskin] print canon: "lizardfolk monk" heads on the Spy — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear)
[reskin] row evicted for the cap: Traits/"Reed Stride" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "monk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Claw), Patient Defense (patient-defense)
[reskin] inline declared: "the adept" — the call's own answer (kind), built from the name
[reskin] inline form: "the adept" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "lizardfolk monk" -> has (descriptive), head
[reskin] body verdicts: 28 of 28 answered; not true of this body: snare, random-ray, snare-bolt, blink, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, relic-object, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, life-drain
[reskin] signature idea (action): "The adept exhales its long-held breath into a measured palm strike, and every mote of stillness it has stored all fight pours out at once — the monk spends its stillness, and violence answers. When it hits with a Claw, the target must make a Constitution saving throw or be knocked Prone and have its Speed halved by the jarring, breath-stealing impact until the end of the adept's next turn." [rider/on_hit/condition] [family: payoff] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, bolt-restrain (+ shelf: gaze-single, condition-payoff, throw-retrieve, shield-bash, lure, ground-burst, spew, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, snap-shot, riposte)
[reskin] composed candidates on the menu: action — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: affliction (on_hit/condition), contagion (on_hit/condition), pounce (on_hit/condition)
[reskin] word match declined by the call: affliction, contagion, bolt-mark, bolt-restrain, charge-push, hook-rider, isolation, charge, spew, exploiter, condition-payoff, disarm, thrown-burst-seed — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: action — composed:payoff:condition: the call picked it off the menu (what no printed template did: knocks the target Prone and halves its Speed until the adept's next tu)
[reskin] signature miss: action — "composed:payoff:condition" quotes nothing the GM typed, matches no key-table verb, and the call named none of this creature's own elements for it: decoration, not a signature
[reskin] fallback respects the call: condition-payoff, disarm, exploiter left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Spy's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Reed-Cloister discipline: the adept never triggers opportunity attacks when it moves out of a creature's reach, so long as it ends that move closer to water, mud, or dense reeds — it withdraws into the marsh as water recedes, and foes grasp at nothing." [trait/always/movement] [family: breach] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, warded-mending, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), terrain-walk (always/movement), relentless-pursuit (always/movement)
[reskin] word match declined by the call: spider-climb — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "terrain-walk" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: leaving a creature's reach without provoking an opportunity attack)
[reskin] free signature row: "Marsh Withdrawal" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Marsh Withdrawal" is HANDED "lizardfolk monk" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): terrain-walk -> Traits/"Marsh Withdrawal" ("Reed-Cloister discipline: the adept never triggers opportunity attacks when it moves out of a creature's reach, so long as it ends that move closer to water, mu [verb: marsh:idea, mud:idea, reeds:idea]")
[reskin] weapons answered: Claw = none; Tail Dart = none
[reskin] weapon declined: "Tail Dart" reads dart from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Tail Dart" — thrown, range 20/60
[reskin] print canon modes: swim off — the Spy has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Swim 40 ft. — the concept's movement set decides
[reskin] languages by mind: "Draconic" -> "Common, Draconic" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Spy's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Draconic" -> "Common plus one other language, Draconic" — the Spy's plus the concept's Draconic
[reskin] print canon attack: "Claw" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Tail Dart" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Bonus Actions/Cunning Action — the Spy's own
[reskin] class weapon: Actions/"Shortsword" -> "Unarmed Strike" — a monk fights with its hands, not the Spy's; the body's rider folds in (+7)
[reskin] class weapon: Actions/"Hand Crossbow" -> "Dart" — a monk fights with a dart, not the Spy's
[reskin] free-row budget by card size: CR 5 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free row over budget: Traits/"Marsh Withdrawal" leaves at ship — this sheet's free-row budget (0) is spent by a row that SHIPPED
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 0 kept (budget 0)
audit finding below confidence gate: Unarmed Strike A Stunned rider on the adept's single-target Unarmed Strike lets it chain-lock the same target each turn (two attacks per turn, one rider per turn), leaving the target unable to act with no repeated save offered and only a fixed one-round duration as exit; on a martial artist this reads as a lockdown the target cannot respond to.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Hold Breath" carries "monk" which is not a whole clause — the seat surgery cut it; resolved to cl_xxau9
[reskin] clause id by substring: "Marsh Stride" carries "monk" which is not a whole clause — the seat surgery cut it; resolved to cl_xxau9
[reskin] clause id by substring: "Unarmed Strike" carries "monk" which is not a whole clause — the seat surgery cut it; resolved to cl_xxau9
[reskin] clause id by substring: "Patient Defense" carries "monk" which is not a whole clause — the seat surgery cut it; resolved to cl_xxau9
[reskin] [gap] leaving a creature's reach without provoking an opportunity attack — "Reed-Cloister discipline: the adept never triggers opportunity attacks when it moves out of a creature's reach, so long as it ends that move closer to water, mud, or dense reeds — it withdraws into the marsh as water recedes, and foes grasp at nothing." — Reed-Cloister Adept [seat: trait [trait/always/movement]] (closest offered: terrain-walk) [effect: movement] [menu: spider-climb terrain-walk relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind evasion guarded-stance undead-fortitude assassinate warded-mending truth-aura fear-aura] [same-cell unoffered: blink aberrant-ground web-walker earth-glide tunneler zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: false-appearance:legality adhesive:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality marking-light:legality sealed-body:role relic-object:legality mimicry:legality blurred-form:legality death-burst:legality kill-denial:legality] [VETOED AFTER ACCEPTANCE: terrain-walk never reached the sheet — died at the free-row budget (only 0 free row(s) allowed on this sheet)]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the free-row budget
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the free-row budget) · path class_npc
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
Multiattack: Meshrin makes three attacks, using Greataxe or Javelin. It can replace one attack with a use of Frightening Roar.
Greataxe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (3d8 + 4) slashing damage.
Javelin: Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 17 (3d8 + 4) piercing damage. Immediately after the attack, a javelin returns to Meshrin's grasp, and the target's speed is reduced by 10 feet until the start of Meshrin's next turn.
Frightening Roar: Each creature of Meshrin's choice within 30 feet of it that can see or hear it must make a DC 15 Wisdom saving throw. On a failed save, the target is frightened until the end of its next turn. On a successful save, the target is immune to this creature's terror for 24 hours.
```

**Where each row came from**

- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "barbarian"
- Traits/Hold Breath — lizardfolk kit; the GM's clause "barbarian"
- Traits/Great Weapon Master — a declared feature; the GM's clause "Wields a greataxe two-handed"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "barbarian"
- Actions/Multiattack — the chassis
- Actions/Greataxe — authored for this sheet; a named part; the GM's clause "Wields a greataxe two-handed"; weapon greataxe
- Actions/Javelin — authored for this sheet; a named part; a declared feature; the GM's clause "a javelin for the throw"; weapon javelin
- Actions/Frightening Roar — template terror-pulse; library draw (seed unstamped); the GM's clause "Give him a frightening roar"; binds the GM's words: roar

**Engine trace**

```
[path] class_npc — class barbarian — species lizardfolk — "barbarian" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-hurler: ✓ ("a javelin for the throw") | skirmisher-hurler: key "throw" (class verb)
[concept] name: "Meshrin" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: hurler→style ✓ ("javelin for the throw")
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/terror mind=sapient style=hurler energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Meshrin"
[concept] mechanics: thrown-weapon
[concept] signature elements: greataxe swung two-handed in a rage [object] | frightening roar that shakes his enemies [behavior] | thrown javelins on the approach [object]
[concept] identity: Meshrin opens the fight by loosing a javelin on the approach, roaring to shake lesser foes before he closes to greataxe range. Once in reach he rages and swings the axe two-handed in wide, driving arcs, hurling his last javelin whenever an enemy tries to peel away. Under pressure he does not flee — he roars louder, soaks the punishment on his hide, and fights to the death.
[concept] lore: Meshrin is a lizardfolk war-chief of the drowned marsh warrens, who fights only for the roar of a worthy kill and the trophies he drags back to his tribe.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the barbarian stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +7
[reskin] donor: skirmisher-8-hurler -> CR 8 (invented — no printed peer)
[reskin] [path] decides: class_npc on the Gladiator · class barbarian (the matcher would have said homebrew)
[reskin] print canon: "Meshrin — Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages. Give him a frightening roar. AC 16, 120 hit points." heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Frightening Roar" deals Thunder on a Humanoid whose concept names no Thunder — a name is not a warrant; use a physical type
[reskin] named parts: Greataxe (slot), Javelin (slot, ranged) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] row evicted for the cap: Traits/"Marsh Stride" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "barbarian": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: rampage — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: barbarian — "barbarian": Bloodied Frenzy (Berserker/Bloodied Frenzy)
[reskin] proper noun: "Meshrin" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Meshrin" — the call's own answer (person), built from the name
[reskin] inline form: "Meshrin" — the model's own reading of the name
[reskin] energy withheld on a base row: "Frightening Roar" Thunder -> Bludgeoning (the body's physical type; a Humanoid deals no Thunder its concept never gave it)
[reskin] save dc derived: DC 16 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] final price: the chassis's Multiattack: the round ran 39 against the card's 54 — the attack rows re-solve at 138% (3 attacks on an authored sheet, under the card)
[reskin] the sheet's declared ask: fear — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Meshrin — Large lizard folk" -> has (header) | "30 feet of movement" -> has (header) | "Wields a greataxe two-handed" -> has (mechanical) [asked: attack] | "a javelin for the throw" -> has (mechanical) [asked: attack] | "He is a barbarian who rages" -> has (mechanical) [askMechanic: escalate] | "Give him a frightening roar" -> has (mechanical) [asked: save_single] [askMechanic: fear] | "AC 16" -> has (header) | "120 hit points" -> has (header)
[reskin] extraction: 1 of 9 model clauses quote nothing the user typed and leave the record ("AC 16")
[reskin] body verdicts: 24 of 24 answered; not true of this body: snare, snare-bolt, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "Meshrin looses a bone-shaking roar that rolls out from him in a spreading ring. Each creature caught in it that can hear him must succeed on a Wisdom saving throw or take the Frightened condition until the end of its next turn, and a Frightened creature must use its movement to move away from Meshrin on its turn." [action/save/condition] [family: nova] — menu: throw-retrieve, shield-bash, lure, sensory-strike, disarm, execute, pacify, escalating-dread, terror-pulse, push-prone, curse-debt (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, pounce, isolation, bolt-mark)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — fear: escalating-dread, terror-pulse
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: escalating-dread (save/condition), terror-pulse (save/condition), shield-bash (save/condition)
[reskin] keys would have bound: action — terror-pulse, throw-retrieve (roar, javelin)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=save_single
[reskin] word match declined by the call: escalating-dread, shield-bash, lure, sensory-strike, pacify, push-prone, disarm, execute, curse-debt, throw-retrieve — the key word does not mean the mechanic here
[reskin] signature template: terror-pulse -> Actions/"Frightening Roar (2/Day)" ("a bone-shaking roar that rolls out from him in a spreading ring; each creature c [verb: roar:concept]")
[reskin] keys spent by the action: roar
[reskin] signature idea (trait): "The first time Meshrin is Bloodied in a fight, his fury breaks over the marsh in a defiant bellow: each creature of his choice within a short radius that can hear him must succeed on a Wisdom saving throw or have the Frightened condition until the end of its next turn, while Meshrin himself cannot be Frightened for the rest of the fight." [trait/always/condition] [family: nova] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] composed candidates: none trait — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — fear: phobia, fear-aura
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), fear-aura (start_of_turn/condition), berserk (always/condition)
[reskin] keys would have bound: trait — fear-aura (frightens, frightening)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=save_single
[reskin] word match declined by the call: phobia, berserk — the key word does not mean the mechanic here
[reskin] seat takes its clause: "Dreadful Bellow" is HANDED "Give him a frightening roar" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] trait ceiling: "Dreadful Bellow" does not ship — 4 traits already, and print's ceiling for a meat body is 3
[reskin] weapons answered: Greataxe = greataxe; Javelin = javelin; Hurled Javelin = javelin
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] chassis nova: "Hurled Javelin (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "Draconic" -> "Common, Draconic" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Draconic" -> "Common, Draconic" — the Gladiator's plus the concept's Draconic
[reskin] print canon: chassis row leaves — Actions/"Hurled Javelin (Recharge 5-6)" is the seat's nova, not the Gladiator's
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Shield Bash" leaves with the shield — a greataxe is two-handed and print pairs a shield with no heavy melee weapon (0 of 329 gear lines)
[reskin] dead control row: "Frightening Roar" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Frightening Roar.
[reskin] free-row budget by card size: CR 8 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 7 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] row binds its clause: "Frightening Roar" answers "Give him a frightening roar" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Hold Breath No timing or end condition relative to combat (suffocation rules) is stated; a GM must guess when the clock starts.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Bloodied Frenzy" carries "barbarian" which is not a whole clause — the seat surgery cut it; resolved to cl_jeugdk
[reskin] clause id by substring: "Hold Breath" carries "barbarian" which is not a whole clause — the seat surgery cut it; resolved to cl_jeugdk
[reskin] clause id by substring: "Marsh Stride" carries "barbarian" which is not a whole clause — the seat surgery cut it; resolved to cl_jeugdk
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] user-set: HP 136 -> 120 — a declared field (Resolution 3)
[reskin] species kit: Swim 30 ft. — a lizardfolk's own
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Garrick One-Axe — in the run

**Concept:** a sellsword who hurls a handaxe and closes with a shortsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Garrick One-Axe | 5 (2014) | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "closes with a shortsword"
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Handaxe); nova none; dmg 33

```
Garrick One-Axe
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

Riposte (Reaction). When a creature within 5 feet of Garrick misses it with a melee attack, Garrick makes one Handaxe attack against that creature.

Actions
Multiattack: Garrick makes three Handaxe attacks. It can replace one attack with a use of Quarry Hurl.
Handaxe: Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) slashing damage, and Garrick has advantage on its next attack roll against the target before the end of its next turn.
Quarry Hurl: Garrick hurls its handaxe. Ranged Weapon Attack: +7 to hit, range 20/60 ft., one target. Hit: 9 (2d6 + 2) slashing damage. The weapon lands in an unoccupied space within 5 feet of the target; until Garrick spends 5 feet of movement in that space to recover it, Garrick's speed is halved and it can't use this action.
Shield Bash: One creature within 5 feet of Garrick that it can see must make a DC 15 Strength saving throw, taking 9 (2d4 + 4) bludgeoning damage on a failed save. If the target is a Medium or smaller creature, it is knocked prone.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Handaxe — authored for this sheet; a named part; a declared feature; the GM's clause "hurls a handaxe"; weapon handaxe
- Actions/Quarry Hurl — template throw-retrieve; library draw (seed unstamped); the GM's clause "hurls a handaxe"; binds the GM's words: axe
- Actions/Shield Bash — print's own row
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "sellsword"

**Engine trace**

```
[path] class_npc — class fighter — "sellsword" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-hurler: ✓ ("hurls a handaxe") | skirmisher-hurler: key "hurls" (class verb)
[concept] hints: hurler→style ✓ ("hurls a handaxe")
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/bestial mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: hurled handaxe opening strike [behavior] | handaxe and shortsword pair [object] | mercenary's wary disengage when bloodied [behavior]
[concept] identity: The sellsword opens by hurling its handaxe at the nearest foe, then charges in behind the spinning blade to finish the job with its shortsword. Every round it repeats the rhythm — fling, close, cut, break off when the fight turns against it — fighting with the wary economy of a mercenary who knows a lost fight means no pay. It is no fanatic: bloodied, it disengages and runs, spending lives and ammunition rather than its own.
[concept] lore: A veteran of a hundred petty border wars, this sellsword sells its arm to whichever lord pays in coin and drinks away the rest in garrison towns, always keeping one handaxe oiled for the throw that buys its escape.
[reskin] [path] class body: the fighter stands on the Gladiator — the class's own print block, nearest CR 5
[reskin] print canon defenses: HP 95 -> 112, AC 15 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +7, DC 15 (print's)
[reskin] donor: skirmisher-8-hurler -> CR 5 (invented — no printed peer)
[reskin] [path] decides: class_npc on the Gladiator · class fighter (the matcher would have said twist Warrior Veteran)
[reskin] print canon: "a sellsword who hurls a handaxe and closes with a shortsword" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] named parts: Handaxe (slot), Shortsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: fighter — "sellsword": Riposte (riposte)
[reskin] inline declared: "Garrick" — the call's own answer (person), built from the name
[reskin] inline form: "Garrick" — the model's own reading of the name
[reskin] the sheet's declared ask: burst — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "hurls a handaxe" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: trigger "at_will" stands on "closes with a shortsword" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a sellsword" -> has (descriptive), head | "hurls a handaxe" -> has (mechanical) [asked: at_will/attack] [askMechanic: burst] | "closes with a shortsword" -> has (mechanical) [asked: at_will/attack]
[reskin] body verdicts: 24 of 24 answered; not true of this body: snare, snare-bolt, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — thrown-burst-seed, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Garrick marks one creature it can see as its quarry: until the end of its next turn, the first time the quarry moves, Garrick can use its reaction to hurl its handaxe at it, and the axe returns to Garrick's hand immediately after the attack." [bonus_action/always/condition] [family: mark] — menu: patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip (+ shelf: throw-retrieve, shield-bash, lure, sensory-strike, disarm, delayed-brand, affliction, contagion, stunning-strike, charge-push, pounce, isolation, bolt-mark)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — burst: throw-retrieve
[reskin] menu ordered by the idea's stamps: action — idea fires always/does condition; leading: throw-retrieve (always/damage), patient-defense (always/defense), second-wind (always/resource)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=attack when=at_will
[reskin] word match declined by the call: patient-defense, second-wind, self-invisibility, focus, feint-slip, bolt-mark, aggro-curse, delayed-brand — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "throw-retrieve" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: marks one creature as quarry and makes a reaction ranged handaxe attack against )
[reskin] free signature row: "Quarry Hurl" — a print body takes only what the user's words ask, but the call names the element it expresses: "hurled handaxe opening strike". Earns no clause credit; the budget settles on the finished sheet
[reskin] row superseded: Actions/"Shortsword" leaves — "Quarry Hurl" owns the throw now
[reskin] dead name still carried — "Shortsword" names a row that is still on the sheet; no sweep
[reskin] signature template: throw-retrieve -> Actions/"Quarry Hurl" ("The idea marks a quarry and lets Garrick hurl its returning handaxe as a reactio [verb: axe:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "When Garrick is bloodied, it can take the Disengage action as a bonus action, and its speed increases by 10 feet until the end of its turn." [trait/always/movement] [family: sentinel] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), relentless-pursuit (always/movement), bound (always/movement)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=attack when=at_will
[reskin] word match declined by the call: spider-climb, bound, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relic-object, guarded-stance, undead-fortitude, assassinate, truth-aura, fear-aura — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "relentless-pursuit" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: grants a bonus-action Disengage and +10 ft Speed while Bloodied, plus a thrown-t)
[reskin] free signature row: trait — "relentless-pursuit" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Bloodied Celerity" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Bloodied Celerity" is HANDED "closes with a shortsword" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): relentless-pursuit -> Traits/"Bloodied Celerity" ("The idea is a bloodied-only bonus-action Disengage plus a speed increase, and th [shape fit, no verb match]")
[reskin] weapons answered: Shortsword = shortsword; Handaxe = handaxe; Spinning Hurl = handaxe; Hook and Drag = handaxe
[reskin] chassis nova: "Spinning Hurl (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon multiattack: "Garrick makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon yields: "Quarry Hurl" is the seat's own row — print's name never lands on a template's body (see the melee loop)
[reskin] print canon skills: "Perception +4, Stealth +5" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Spinning Hurl (Recharge 5-6)" is the seat's nova, not the Gladiator's
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon: chassis row leaves — Traits/"Wary Footwork" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Quarry Hurl" keeps its own weapon — throw-retrieve writes the projectile and its range
[reskin] multiattack reconciled: "Spear" is no row on this sheet — the Multiattack cites "Handaxe" instead
[reskin] multiattack reconciled: "Shield Bash" is no row on this sheet — the Multiattack cites "Quarry Hurl" instead
[reskin] free-row order: "Quarry Hurl" [quote] > "Bloodied Celerity" [undefined] — a receipt row is never displaced by one without
[reskin] free row over budget: Traits/"Bloodied Celerity" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Quarry Hurl" [action/always/damage]
[reskin] row binds its clause: "Quarry Hurl" answers "hurls a handaxe" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "hurls a handaxe" -> "Handaxe" — trigger at_will
[reskin] asked but unanswered: "closes with a shortsword" asked for at_will and no row binds the clause
[reskin] element expressed: Quarry Hurl carries "hurled handaxe opening strike" — "Garrick hurls its handaxe."
audit finding below confidence gate: Shield Bash Save-based action uses non-standard capitalized phrasing; 2014/2024 statblock language for a save action should be a lowercase parenthetical such as '(Str. Save)' or 'Strength Saving Throw: DC 15' with the save type not title-cased as a defined game term.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Riposte" carries "sellsword" which is not a whole clause — the seat surgery cut it; resolved to cl_16u4r8s
[reskin] [gap] marks one creature as quarry and makes a reaction ranged handaxe attack against it when it moves, with the axe returning — "Garrick marks one creature it can see as its quarry: until the end of its next turn, the first time the quarry moves, Garrick can use its reaction to hurl its handaxe at it, and the axe returns to Garrick's hand immediately after the attack." — Garrick One-Axe [seat: action [bonus_action/always/condition]] (closest offered: throw-retrieve) [effect: damage] [menu: throw-retrieve patient-defense second-wind self-invisibility focus feint-slip bolt-mark aggro-curse delayed-brand] [same-cell unoffered: adhesive phobia faultless-tracker berserk marking-light kill-denial] [same-seat rejected: blink:style shell-withdraw:role lay-on-hands:role volley-order:role own-turn-punisher:role rally:role coating:legality phase-slip:legality] [landed: throw-retrieve]
[reskin] [gap] grants a bonus-action Disengage and +10 ft Speed while Bloodied, plus a thrown-then-melee closing attack — "When Garrick is bloodied, it can take the Disengage action as a bonus action, and its speed increases by 10 feet until the end of its turn." — Garrick One-Axe [seat: trait [trait/always/movement]] (closest offered: relentless-pursuit) [effect: movement] [menu: spider-climb relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind evasion relic-object guarded-stance undead-fortitude assassinate truth-aura fear-aura] [same-cell unoffered: blink terrain-walk aberrant-ground web-walker earth-glide tunneler zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality marking-light:legality sealed-body:role mimicry:legality blurred-form:legality death-burst:legality kill-denial:legality] [VETOED AFTER ACCEPTANCE: relentless-pursuit never reached the sheet — died at the free-row budget (only 1 free row(s) allowed on this sheet)]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the free-row budget
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 2 (1x the free-row budget) · path class_npc
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Brother Halric — in the run

**Concept:** name: Brother Halric | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Brother Halric | 3 (2014) | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 3 → 1.625; sustained 26 (2 × Mace); nova none; dmg 26

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

Actions
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame.
Mace: Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 120 ft., one target. Hit: 13 (3d6 + 3) bludgeoning damage.
Spellcasting: Halric casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 13): -

At will: light, thaumaturgy

1/day each: spirit guardians
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Mace — print's own row; weapon mace
- Actions/Spellcasting — print's own row
- Actions/Radiant Flame — print's own row
- Bonus Actions/Divine Aid — cleric kit; the GM's clause "Brother"

**Engine trace**

```
[path] class_npc — class cleric — "Brother" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "Brother Halric" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("Brother Halric") | caster-warpriest: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid themes=armed/grave mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Brother Halric"
[concept] mechanics: none claimed
[concept] signature elements: the iron-shod mace swung in patient arcs [object] | battle-prayers that mend and bolster his flesh [behavior] | sanctified conviction that refuses retreat [aura]
[concept] identity: Brother Halric opens with a prayer shouted like an order, then wades into the melee with a heavy mace swinging in wide, patient arcs while his battle-prayers mend his wounds and bolster his flagging flesh. Each round he strikes and intones, trading blows and casting short prayers that keep him upright, his iron skin turning aside blades meant for softer men. Under pressure he does not flee — he fights on to the death, absolute in the conviction that his cause is sanctified.
[concept] lore: Brother Halric was a parish battle-priest who kept his chapel standing through a siege by sanctifying every last blow he struck, and he never stopped; he now wanders looking for a war in which to be righteous.
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
[reskin] the sheet's declared ask: command — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Brother Halric" -> has (descriptive), head
[reskin] extraction: 9 of 10 model clauses quote nothing the user typed and leave the record ("opens with a prayer shouted like an order", "wades into the melee with a heavy mace swinging in wide, patient arcs", "battle-prayers mend his wounds", …)
[reskin] body verdicts: 33 of 33 answered; not true of this body: snare, zone, seal, active-toll, random-ray, spew, snare-bolt, drain, zone-seed, blighted-ground, rally, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, mimicry, gaze-aura, blurred-form, death-burst
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Halric's spoken battle-prayer is an order the world obeys: each creature of his choice within reach that can hear him must succeed on a Wisdom saving throw or be Frightened of him until the end of its next turn, its nerve broken by the certainty of his cause." [action/save/condition] [family: nova] — menu: gaze-single, execute, wail, lure, ground-burst, obstacle-pull, pacify, escalating-dread, slow-bolt, sensory-strike, herd, thrown-burst-seed, curse-debt, reveal, wind-up, shield-bash, terror-pulse, push-prone (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, bolt-restrain, bolt-drag, bolt-mark)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — command: herd
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: herd (save/movement), gaze-single (save/condition), lure (save/condition)
[reskin] word match declined by the call: gaze-single, lure, pacify, escalating-dread, sensory-strike, reveal, shield-bash, push-prone — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "terror-pulse" has no key-table verb, but the call quotes "brother halric" from the description
[reskin] fit declined: "Battle Prayer (2/Day)" — a print body takes only what the user's words ask, and the call named none of this creature's own elements for it; the call quotes "brother halric", which is the creature itself, a header directive, the half of a clause the lack sweep takes away, or the weapon a part row already carries (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: gaze-single, pacify, escalating-dread, sensory-strike left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Priest's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Halric's mace-swing is a preached sentence, not a flail: when he hits a creature already Frightened, the blow lands with the weight of his conviction and knocks the target Prone." [trait/always/condition] [family: payoff] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, shielded-mind, relentless-pursuit, bound, relic-object, warded-mending, undead-fortitude, truth-aura, fear-aura, kill-denial, adhesive, berserk
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] declared mechanic leads the menu: trait — command: pack-tactics
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: pack-tactics (always/damage), phobia (always/condition), kill-denial (always/condition)
[reskin] word match declined by the call: phobia, pack-tactics, blood-frenzy — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "fear-aura" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: rides on the creature's own attack hit to knock an already-Frightened target Pro)
[reskin] trait declined: "Weight Of Conviction" — a print body takes only what the user's words ask; the call quotes "brother halric", which is the creature itself, a header directive, the half of a clause the lack sweep takes away, or the weapon a part row already carries
[reskin] weapons answered: Mace = mace
[reskin] weapon dice follow the weapon: "Mace" is a mace (d6) — "12 (2d8 + 3)" becomes "13 (3d6 + 3)", print's rule of keeping the die and scaling the count
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Radiant Flame — the Priest's own ranged row, added (the chassis carried none to rename)
[reskin] print canon row: Actions/Mace — a chassis row already carries the Priest's own row name, so it IS that row: claimed as print's rather than skipped (it would otherwise leave as filler on a closed path)
[reskin] print canon multiattack: "Halric makes two attacks, using Mace or Radiant Flame in any combination." — the Priest's own
[reskin] print canon attack kept: "Mace" stays — "Radiant Flame" is already an attack row on this sheet
[reskin] print canon skills: "Arcana +3, Perception +5" -> "Medicine +7, Perception +5, Religion +5" — the Priest's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Reactions/"Protective Magic (3/Day)" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 13 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] clause id by substring: "Divine Aid (3/Day)" carries "Brother" which is not a whole clause — the seat surgery cut it; resolved to cl_pdo4e1
[reskin] [gap] rides on the creature's own attack hit to knock an already-Frightened target Prone — "Halric's mace-swing is a preached sentence, not a flail: when he hits a creature already Frightened, the blow lands with the weight of his conviction and knocks the target Prone." — Brother Halric [seat: trait [trait/always/condition]] (closest offered: fear-aura) [effect: condition] [menu: pack-tactics phobia kill-denial adhesive berserk spider-climb bloodied-fury blood-frenzy shielded-mind relentless-pursuit bound relic-object undead-fortitude truth-aura fear-aura warded-mending] [same-cell unoffered: faultless-tracker marking-light] [same-seat rejected: false-appearance:legality terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality death-restoration:legality uncanny-sense:legality earth-glide:legality tunneler:legality evasion:role marking-light:legality sealed-body:legality guarded-stance:role mimicry:legality assassinate:role blurred-form:legality death-burst:legality] [VETOED AFTER ACCEPTANCE: fear-aura never reached the sheet — died at an UNRECORDED drop site]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x an UNRECORDED drop site
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x an UNRECORDED drop site) · path class_npc
[reskin] 2014 conversion: one lint-gated call — both printings saved
```

