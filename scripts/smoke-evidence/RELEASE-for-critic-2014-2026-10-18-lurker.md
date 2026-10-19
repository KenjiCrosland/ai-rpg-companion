# Release table for the critic — 2014 blocks — 2026-10-18

The case is at the top of the 2024 file (RELEASE-for-critic-2024-2026-10-18-lurker.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

## Review batch — sweep-2026-10-18T17-44-39

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Bog Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |
| Owlbear | 3 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Vesperil the Sexton | 3 | 2024 | lurker-1-phantom | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/4 |
| Chorus of the Drowned | 5 | 2024 | lurker-5 | ok | ok | FAIL: two-novas | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 4/4 |
| Scree-Burier | 5 (2014) | 2014 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 3/4 |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 1/1 | 5/5 |
| Lashed Siege-Golem | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Nave Requiem | 10 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/5 |
| Vampire | 13 (2014) | 2014 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 9/9 |
| Hive-Priest of Flies | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/5 |
| Gutforge | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Glacier Heart | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 5/5 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Brass Tyrant | 17 | 2024 | defender-17-leader | ok | SOFT: aim-dpr, hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 7/8 |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 12/12 |
| Bone Sun Archlich | 20 (2014) | 2014 | caster-21 | ok | ok | ok | SOFT: ko-at-will, rider-no-save | ok | ok | ok | ok | ok | soft (1) | 1/1 | 10/10 |
| Ancient Gold Dragon | 24 (2014) | 2014 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Trenchsong Leviathan | 24 | 2024 | lurker-17-phantom | ok | SOFT: under | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 7/9 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Goblin Boss | 1 (2014) | 2014 | defender-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Vashka the Red | 6 | 2024 | defender-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 3/5 |
| Hive-Husk Scythewretch | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 5/6 | 5/5 |
| Black-Iron Warden | 11 (2014) | 2014 | defender-5 | ok | user-set: AC 20 · reads CR 9 | ok | ok | ok | ok | ok | ok | ok | clean | 3/3 | 1/2 |
| Brine-Witch of the Fen | 7 | 2024 | caster-8-binder | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 2/2 | 4/7 |
| Ashvowed Brannor | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Ilvareth Dusksong | 12 (2014) | 2014 | caster-12 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 1/1 | 3/4 |
| Swarm of Graveknell Hosts | 13 | 2024 | swarm-9 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Reliquary Vault-Ooze | 9 (2014) | 2014 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 0/1 | 5/5 |
| Squallchaser Drake | 7 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Gromm Cragbreaker | 9 (2014) | 2014 | brute-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 0/3 |
| Sethra Reedsong | 5 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (2) | 1/1 | 4/6 |
| Krennik Skullstandard | 4 (2014) | 2014 | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/6 |
| Well Drowned | 5 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Cinder Stalker | 4 | 2024 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 6/8 | 4/4 |
| Meshrin | 8 (2014) | 2014 | skirmisher-8-hurler | ok | user-set: AC 16, HP 120 · reads CR 6.5 | SOFT: lint:hp-formula | ok | ok | ok | ok | ok | ok | soft (1) | 6/7 | 9/9 |
| Skeleton | 6 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Axehand Sellsword | 5 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 3/3 |
| Brother Halric | 3 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/5 |

**Dropped 15 of 65 user clauses** (coverage 77%); concept share 84% (168/199 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- lurker-5 / structure: 1
- caster-8-binder / derivation: 1



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

Whelm. As a bonus action, the bog hound whelms one Medium or smaller creature it is grappling. While whelmed, the target is blinded and restrained, has total cover against attacks and other effects outside the bog hound, and takes 3 (1d6) bludgeoning damage at the start of each of the bog hound's turns. The bog hound can have only one creature whelmed at a time. If the bog hound takes 5 damage or more in a single turn from the whelmed creature, the bog hound must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the bog hound. If the bog hound dies, a whelmed creature pulls free prone by using 5 feet of movement.

Actions
Multiattack: The bog hound makes two Bite attacks. It can replace one attack with a use of Mire Drag.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained.
Mire Drag: One creature within 20 feet must succeed on a DC 13 Strength saving throw or be pulled up to 15 feet straight toward the bog hound by its jaws and be grappled (escape DC 11).
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Bite — the chassis
- Actions/Mire Drag — template hook-drag; library draw (seed unstamped); the GM's clause "drags fishermen under"; binds the GM's words: drag+under+pull+haul
- Bonus Actions/Whelm — binds the GM's words: whelm+swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon

**Engine trace**

```
[route] brute-grappler type=Beast mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "drags fishermen under" | brute-grappler: ✓ ("drags fishermen under") | brute-grappler: no line key in the words — the model's read of its quote
[concept] hints: engulf→mechanics ✓ ("drags fishermen under")
[concept] resolve: archetype=brute type=Beast themes=bestial/aquatic mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: dragging prey under the mud [behavior] | mud-caked hide that blends with the bog [body] | ambushing from submerged shallows [behavior]
[concept] identity: The bog hound waits submerged in the mud, only its eyes and nostrils breaking the surface, then lunges to seize a fisherman by the leg and drags him down into the muck to drown. Every round after, it thrashes and rolls in the shallows, keeping its prey pinned beneath the water and mud until the struggling stops. It is a patient ambush predator that never flees once its jaws close, trying to drag prey into deeper ooze even when wounded.
[concept] lore: A mud-caked beast that haunts the reed beds where fishermen wade, it is drawn to the splashing of nets and will drag a grown man under the bog to store him in the muck for later.
[reskin] donor: brute-5-grappler -> CR 1
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] engulf engine: Whelm — the body's own verb
[reskin] engine interior scaled — CR 1 sits below the brute-5-grappler seat
[reskin] inline declared: "the bog hound" — the call's own answer (kind), built from the name
[reskin] inline form: "the bog hound" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a mud-caked bog hound" -> has (descriptive), head | "drags fishermen under" -> has (mechanical) [asked: on_hit/condition]
[reskin] signature idea (action): "When the hound has a creature seized, it can surge backward through the shallows and muck, hauling its prey with it toward deeper water and soft ooze. Both of them move together as the hound retreats, and the dragging is rough and disorienting for whatever it is pulling." [bonus_action/always/movement] — menu: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (+ shelf: swallow, shield-bash, hook-drag, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — hook-drag, hook-rider (drag, under, drags)
[reskin] value check: "Mire Drag" EV 3.3 vs floor 3.1 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Mire Drag" ("the hound seizes a creature and hauls it bodily along as it retreats through the [verb: drag:concept, under:concept, pull:idea, haul:idea]")
[reskin] keys spent by the action: drag, under
[reskin] signature idea (trait): "Mud-caked hide lets it lie half-buried in the bog with only eyes and nostrils showing, so anything searching for it must look closely or it simply reads as a hummock of wet earth. Its patience is rewarded: those who miss it are caught off guard when it finally strikes." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog, mud)
[reskin] word match declined by the call: terrain-walk, faultless-tracker — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Mud-caked hide lets it lie half-buried in the bog with only eyes and nostrils showing, so anything searching for it must look closely or it simply reads as a hummock of wet earth. Its patience is rewarded: those who miss it are caught off guard when it finally strikes." [trait/always/defense] — the model picked "false-appearance" (no verb, and it quotes nothing the GM typed) over a concept-verb template (terrain-walk, faultless-tracker)
[reskin] concept-first trait skipped: terrain-walk — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 4 on a Beast speaks nothing, whatever the mind read said
[reskin] multiattack replacement clause: It can replace one attack with a use of Mire Drag.
[reskin] row binds its clause: "Mire Drag" answers "drags fishermen under" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "drags fishermen under" -> "Mire Drag" — trigger: asked on_hit, row reads at_will
[reskin] escape dc: Mire Drag → DC 11 (8 + PB + STR; a late row wore another number)
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Owlbear — a print donor

**Concept:** name: Owlbear | that has learned to climb

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 (2014) | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

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

Perception +3, Stealth +3

Saving Throws: 

DEX +3

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

None

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Stoneclinging Climb. The owlbear can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The owlbear makes two Rend attacks.
Rend: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.
```

**Where each row came from**

- Traits/Stoneclinging Climb — template spider-climb; library draw (seed unstamped); the GM's clause "has learned to climb"; binds the GM's words: climb+climbs+climbing+walls+wall+cling+clings
- Actions/Multiattack — the chassis
- Actions/Rend — print's row, renamed

**Engine trace**

```
[route] skirmisher type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("has learned to climb") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Monstrosity themes=bestial/grasping mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: none claimed
[concept] signature elements: cliff-scrambling pursuit [behavior] | dive from above onto prey [behavior] | bear-and-owl fused hide and beak [body]
[concept] identity: The owlbear opens by circling overhead on the cliff face, then drops onto prey from above with a two-toned scream and a crushing beak-strike before scrambling back up out of reach. Every round it repeats the dive-and-retreat from a new angle, using claws to pin and beak to finish, retreating up vertical stone whenever it is bloodied to lure pursuers into a climbing fight it always wins. Under pressure it is not a berserker but a patient ambusher, harrying from ledges and never letting a wounded target leave its sight.
[concept] lore: Bred from a wizard's collapsed menagerie and a mountain that gave it nowhere to run but up, this owlbear learned to hunt the vertical world — and now treats every cliff, tower, and cave wall as a road to its next meal.
[reskin] print canon defenses: HP 58 -> 59, AC 13 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +4 -> +7, DC 15 (print's)
[reskin] donor: skirmisher-3 -> CR 3
[reskin] print canon: "Owlbear — that has learned to climb" heads on the Owlbear — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline by rule: "the owlbear" — the call answered "the owlbear" (kind), which the name does not support
[reskin] inline form: "the owlbear" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Owlbear —" -> has (descriptive), head | "has learned to climb" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The owlbear flings itself from any height, kicking off rock or wall as it comes, and lands on its chosen prey with a two-toned scream and a crushing strike. Prey that scatters from its landing gets run down anyway — the owlbear fixes on a target and hurtles after it, scrambling over whatever lies between them, and it can keep up this pursuit as long as it stays in sight of the thing it is chasing." [rider/on_hit/movement] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] fit declined: "Crushing Pounce" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: "Owlbear — that has learned to climb" heads on the Owlbear and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Horrid Display (2/Day)" EV 12.1 vs floor 18.6 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Its owl-bear body was shaped by a life on stone: claws and hooked toes catch even slick vertical faces, so walls, ruins, and cliffsides are open floors to it while everyone else is slowed or stopped by them. It can cling to such a surface without needing hands, and anything below its perch that clings, climbs, or hides there is seen coming from above." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — spider-climb (climb, climbs, climbing)
[reskin] signature template (trait): spider-climb -> Traits/"Stoneclinging Climb" ("Its claws and hooked toes catch even slick vertical faces, so walls, ruins, and  [verb: climb:concept, climbs:concept, climbing:concept, walls:idea, wall:idea, cling:idea, clings:idea]")
[reskin] weapons answered: Beak = none
[reskin] print canon attack: "Beak" -> "Rend" — the Owlbear's own row
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Owlbear's
[reskin] print canon: chassis row leaves — Traits/"Cliffwalker" is the seat's, not the Owlbear's
[reskin] row binds its clause: "Stoneclinging Climb" answers "has learned to climb" — the keys it matched came from that clause, so the coverage credit has a receipt
!! [reskin] 2014 conversion failed — the deterministic shape ships with 2024 phrasing: Failed to generate a valid response. Please try again later.
```


---


### Nave Requiem — a homebrew with a nova

**Concept:** a drowned cathedral choir that sings in one voice

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Nave Requiem | 10 (2014) | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 12 / off 9 → 10.5; sustained 60 (2 × Hands); nova Drowning Hymn 31; dmg 61

```
Nave Requiem
Huge undead, neutral
Armor Class

14 (natural armor)

Hit Points: 

180 (19d12 + 57)

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

blindsight 60 ft., passive Perception 12

Languages: 

Common plus the languages it knew in life

Challenge

10 (5,900 XP)

Proficiency Bonus:

+4

Incorporeal Movement. The requiem can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
Sunlight Sensitivity. While in sunlight, the requiem has disadvantage on ability checks and attack rolls.
Captain's Charm. As a bonus action, the requiem targets one creature it can see within 30 feet of it. The target must succeed on a DC 15 Wisdom saving throw or be charmed until the start of the requiem's next turn.

Actions
Multiattack: The requiem makes two Hands attacks.
Hands: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 30 (6d8 + 3) necrotic damage.
Drowning Hymn (Recharge 5-6): Each creature within 30 feet of the requiem must make a DC 15 Constitution saving throw, taking 31 (9d6) thunder damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also deafened until the end of its next turn.
```

**Where each row came from**

- Traits/Incorporeal Movement — the chassis
- Traits/Sunlight Sensitivity — the chassis
- Actions/Multiattack — the chassis
- Actions/Hands — the chassis
- Actions/Drowning Hymn — template active-toll; library draw (seed unstamped)
- Bonus Actions/Captain's Charm — bard kit; the GM's clause "sings in one voice"

**Engine trace**

```
[route] lurker-phantom type=Undead mechanics=aura — casts: on the GM's own words "sings in one voice" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("drowned cathedral choir that sings in on") | lurker-phantom: key "drowned" (class body) | bane refused: the words carry no weakness clause, so "radiant" answers a question nobody asked
[concept] name: provided_name rejected — "drowned cathedral choir that sings in on…" is the description, not a name
[concept] resolve: archetype=lurker type=Undead themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: a multitude singing as one voice [behavior] | the drowned congregation [body] | hymn-song that drains the living [aura]
[concept] identity: The choir opens with a single chord of drowning hymn-song that rolls through walls and stone, pulling the life out of anyone who hears it before a single ghostly hand is laid on them. Each round it advances as one body of many voices, seeking to surround and mingle with the living so its buried horde can drain them dry in a chorus of cold, wet breath. It does not flee when bloodied — it sings louder, dragging the dying down into the flooded nave to join the eternal congregation.
[concept] lore: Beneath a sunken cathedral the whole drowned congregation still keeps its final service, singing in one voice to pull the living down into the flooded pews and swell its choir.
[reskin] donor: lurker-5-phantom -> CR 10
[reskin] implied class kept: "bard" on the GM's own words "sings in one voice" — the key table found none
[reskin] class kit: rally — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: bard — "sings in one voice": Captain's Charm (Pirate Captain/Captain's Charm)
[reskin] inline declared: "the requiem" — the call's own answer (kind), built from the name
[reskin] inline form: "the requiem" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a drowned cathedral choir" -> has (descriptive), head | "sings in one voice" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The requiem's many voices swell into one sustained drowning hymn that sweeps outward from it through stone and water alike, so cover and walls offer no shelter from the sound. Every living creature caught in the rolling chord feels its breath pulled toward its lungs' bottom and its strength bleed away as the choir's whole congregation joins the note. It cannot keep the hymn going once the chord ha" [action/save/damage] — menu: leap, condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] word match declined by the call: condition-payoff, wail, lure, spew, obstacle-pull, exploiter — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "active-toll" has no key-table verb, but the call quotes "a drowned cathedral choir that sings in one voice" from the description
[reskin] value check: "Drowning Hymn (Recharge 5-6)" EV 81.1 vs floor 50.7 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: active-toll -> Actions/"Drowning Hymn (Recharge 5-6)" ("A sustained outward hymn of many voices affecting all creatures around it, with  [shape fit, no verb match]")
[reskin] signature idea (trait): "Whenever the requiem lays its hands on a living creature, the drowned congregation crowds into the wound behind the touch, and the victim's next breath comes out as a mouthful of cold black water. So long as that choking water sits in their chest, every further touch of the choir digs deeper and pulls more of them down toward the flooded pews." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — noxious-aura, mimicry (voices)
[reskin] word match declined by the call: mimicry, heated-body, adhesive — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown noxious-aura, mimicry, which the GM's words keyed
[reskin] key match declined: trait — "noxious-aura" was ranked first on the call's own menu for voices, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Whenever the requiem lays its hands on a living creature, the drowned congregation crowds into the wound behind the touch, and the victim's next breath comes out as a mouthful of cold black water. So long as that choking water sits in their chest, every further touch of the choir digs deeper and pulls more of them down toward the flooded pews." [trait/always/damage] — the model found no template that holds it (offered: noxious-aura, mimicry, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body, bloodied-burst)
[reskin] weapons answered: Hands = none
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Adult Red Dragon — a legendary

**Concept:** name: Adult Red Dragon | blind in one eye from an old lance

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Adult Red Dragon | 17 (2014) | dragon-15 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 14 / off 22 → 18; sustained 132 (3 × Rend + legendary Pounce); nova Fire Breath 72; dmg 136

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

Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead.

Actions
Multiattack: The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray.
Rend: Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 17 (2d8 + 8) slashing damage plus 5 (2d4) fire damage.
Fire Breath (Recharge 5-6): Each creature in a 60-foot cone must make a DC 20 Dexterity saving throw, taking 72 (16d8) fire damage on a failed save, or half as much damage on a successful one.
Spellcasting: The dragon casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 20, +12 to hit with spell attacks): -

At will: command, detect magic, scorching ray

1/day each: fireball
Legendary Actions

The dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The dragon regains spent legendary actions at the start of its turn.

Commanding Presence: The dragon uses Spellcasting to cast command (cast at 2nd level). The dragon can't take this action again until the start of its next turn.
Fiery Rays: The dragon uses Spellcasting to cast scorching ray. The dragon can't take this action again until the start of its next turn.
Pounce: The dragon moves up to half its speed, and it makes one Rend attack.
```

**Where each row came from**

- Traits/Legendary Resistance — the chassis
- Actions/Multiattack — the chassis
- Actions/Rend — print's row, renamed
- Actions/Fire Breath — the chassis
- Actions/Spellcasting — print's own row
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Commanding Presence — print's own row
- Legendary Actions/Fiery Rays — print's own row
- Legendary Actions/Pounce — print's own row

**Engine trace**

```
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | dragon: ✓ ("Adult Red Dragon") | dragon: key "dragon" (class body)
[concept] hints: dragon→body ✓ ("Adult Red Dragon — true dragon body")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/terror mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Adult Red Dragon"
[concept] mechanics: breath
[concept] signature elements: fire breath scouring a ridgeline [behavior] | old lanced and blinded eye [body] | hoard she can no longer fully watch [aura]
[concept] identity: A scarred adult red dragon that lost an eye to a knight's lance, she opens with a single banking pass of her breath across the nearest cluster of foes, then circles wide on her one good side before landing to pin the boldest survivor in a rake of claw and bite. Wary of her blind flank, she favors high ground and punished angles, breaking off only when truly bloodied, and never admits to any eye that she cannot see it tracking her.
[concept] lore: She once raided the lance-road's keeps for hoard and tribute, and the old lance wound left her half-blind and twice as covetous, now brooding over the treasure she can no longer fully watch and torching anything that creeps up on her shadowed side.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] print canon defenses: HP 256 -> 256, AC 20 -> 19 — the Adult Red Dragon's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 27, DEX 10, CON 25, INT 16, WIS 13, CHA 23 — the Adult Red Dragon's at its own CR; attack +10 -> +14, DC 21 (print's)
[reskin] donor: dragon-15 -> CR 17
[reskin] print canon: "Adult Red Dragon — blind in one eye from an old lance" heads on the Adult Red Dragon — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Blindside Glare" promises the Blinded condition but the row never delivers it — name what the rule does, or drop the claim word; this row earns Glare, Dread, Menace
[reskin] inline by rule: "the dragon" — the call answered "the dragon" (kind), which the name does not support
[reskin] inline form: "the dragon" — the model's own reading of the name
[reskin] spell DC coherence: DC 19 -> 20 off Charisma 23 (print's array stays)
[reskin] save dc derived: DC 19 -> 20 (8 + PB 6 + Charisma's 6) — no stat on the sheet reached it
[reskin] lacks asked: "blind in one eye"
[reskin] clauses: "Adult Red Dragon — blind in one eye from an old lance" -> LACKS (mechanical)
[reskin] menu pruned: action — aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, exploiter, sensory-strike (the sheet cannot render them)
[reskin] signature idea (action): "She hunts by sound and heat when the treasure light fails, sweeping her blind flank with a low crooning growl that makes the men creeping up on that shadowed side stumble into the open. Those who truly believe they are unseen by her are the ones she hears loudest, and the more carefully they sneak, the more surely she turns her scarred head and pins them with the eye that still works. She can only" [bonus_action/always/condition] — menu: lay-on-hands, second-wind (+ shelf: snare, condition-payoff, execute, throw-retrieve, seal, shield-bash, lure, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — throw-retrieve, charge (lance)
[reskin] word match declined by the call: throw-retrieve, charge, pounce, lure, lay-on-hands, second-wind — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown throw-retrieve, charge, which the GM's words keyed
[reskin] key match declined: action — "throw-retrieve" was ranked first on the call's own menu for lance, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "She hunts by sound and heat when the treasure light fails, sweeping her blind flank with a low crooning growl that makes the men creeping up on that shadowed side stumble into the open. Those who truly believe they are unseen by her are the ones she hears loudest, and the more carefully they sneak, the more surely she turns her scarred head and pins them with the eye that still works. She can only" [bonus_action/always/condition] — the model found no template that holds it (offered: throw-retrieve, charge, lay-on-hands, second-wind, pounce, lure)
[reskin] signature idea (trait): "Her ruined eye never blinks and never turns, and anything that shelters in that dead quarter of her vision grows cocky and careless, pressing its luck and drawing closer than good sense allows. The longer a creature lingers where her scarred side cannot see, the more surely she finds it there — with claw, with breath, or with the glare of the one eye left." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Her ruined eye never blinks and never turns, and anything that shelters in that dead quarter of her vision grows cocky and careless, pressing its luck and drawing closer than good sense allows. The longer a creature lingers where her scarred side cannot see, the more surely she finds it there — with claw, with breath, or with the glare of the one eye left." [trait/always/condition] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, blurred-form, death-burst, heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] weapons answered: Claw = none
[reskin] chassis nova: "Fire Breath (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] print canon alignment: Neutral Evil -> Chaotic Evil — the Adult Red Dragon's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Claw" -> "Rend" — the Adult Red Dragon's own row
[reskin] print canon multiattack: "The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast *Scorching Ray*." — the Adult Red Dragon's own
[reskin] element immunity: Fire (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 -> 60
[reskin] dragon spell DC derived: 20 (8 + PB + Cha mod — the breath keeps the card DC)
[reskin] dragon mental save DC derived: "Blindside Glare" -> 20 (the Frightful Presence class keys to Charisma)
[reskin] immunities stamped for type: Dragon -> Fire
[reskin] print canon legendary: Commanding Presence, Fiery Rays, Pounce — the Adult Red Dragon's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] audit rewrite blocked — "Commanding Presence" is engine-authored chassis text
[reskin] audit rewrite blocked — "Fiery Rays" is engine-authored chassis text
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Scree-Burier — one marked soft

**Concept:** a quarry-pit thing of living scree that buries what it catches

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Scree-Burier | 5 (2014) | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 3 (print at 5 reads 2.5–9.5, n=25)
- **dropped clause:** "buries what it catches"
- read: def 2 / off 4 → 3; sustained 32 (2 × Slam); nova none; dmg 32

```
Scree-Burier
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

tremorsense 30 ft., passive Perception 13

Languages: 

None

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Shedding Scree. The ground within 10 feet of the scree-burier is difficult terrain.
Entomb. As a bonus action, the scree-burier entombs one Medium or smaller creature it is grappling. While entombed, the target is blinded and restrained, has total cover against attacks and other effects outside the scree-burier, and takes 7 (2d6) bludgeoning damage at the start of each of the scree-burier's turns. The scree-burier can have only one creature entombed at a time. If the scree-burier takes 15 damage or more in a single turn from the entombed creature, the scree-burier must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the scree-burier. If the scree-burier dies, an entombed creature breaks free prone by using 5 feet of movement.

Actions
Multiattack: The scree-burier makes two Slam attacks. It can replace one attack with a use of Scree Slide.
Slam: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained.
Scree Slide: One creature within 30 feet of the scree-burier must succeed on a DC 14 Strength saving throw or be pulled up to 20 feet straight toward the scree-burier by a spreading apron of loose stone and be grappled (escape DC 14).
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Slam — the chassis
- Actions/Scree Slide — template hook-drag; library draw (seed unstamped); binds the GM's words: drag+pull
- Bonus Actions/Entomb — binds the GM's words: entomb+swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+cocoon+whelm
- Traits/Shedding Scree — template aberrant-ground; library draw (seed unstamped); binds the GM's words: scree+rubble+treacherous+wherever it moves

**Engine trace**

```
[route] brute-grappler type=Elemental mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "buries what it catches" | brute-grappler: ✓ ("buries what it catches") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental themes=elemental/grasping mind=mindless style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: burying prey in loose scree [behavior] | a body of living quarry scree [body] | sliding downslope onto victims [behavior]
[concept] identity: The Scree-Burier opens by sloughing a wedge of its own loose stone down over the nearest foe, dragging them knee-deep into the loose shale, then keeps grinding forward each round to press victims deeper into the pit while talus rains from its crest. It never chases a fleeing quarry far from its pit, but anything still caught when the slide settles is buried alive rather than slain outright, and under pressure it simply collapses into its own rubble and re-forms somewhere downslope.
[concept] lore: When a quarry was abandoned mid-cut, the hillside's loose stone drifted into the empty pit until it came awake wanting only to fill every hollow it could find, travelers included.
[reskin] donor: brute-5-grappler -> CR 5
[reskin] engulf engine: Entomb — the body's own verb
[reskin] inline declared: "the scree-burier" — the call's own answer (kind), built from the name
[reskin] inline form: "the scree-burier" — the model's own reading of the name
[reskin] save dc derived: DC 13, 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a quarry-pit thing of living scree" -> has (descriptive), head | "buries what it catches" -> has (mechanical) [asked: on_hit/condition]
[reskin] signature idea (action): "The scree-burier sags and spills a whole flank of itself down the slope in a spreading apron of loose stone that drags everything standing on it downhill and inward toward the creature. Anyone caught in the slide is pulled off their feet and skidded to the creature's edge, ending up lying among the rubble at its feet. It can only do this while it still has rubble to spend, so it rears back and ref" [action/save/movement] — menu: swallow, leap, condition-payoff, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, burrow-ambush, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] word match declined by the call: hook-rider, exploiter, condition-payoff, swallow — the key word does not mean the mechanic here
[reskin] value check: "Scree Slide" EV 9.4 vs floor 8.8 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Scree Slide" ("the slide drags everything standing on it downhill and inward toward the creatur [verb: drag:idea, pull:idea]")
[reskin] signature idea (trait): "Its body is nothing but loose scree held awake, so wherever it moves it leaves a fresh apron of sliding rubble behind it that keeps gently crawling and slumping, dragging any creature standing or lying in it downslope a little each moment and sliding them toward the creature. It cannot stand still without shedding; the ground it walks over stays treacherous and shifting well after it has ground pa" [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — aberrant-ground, terrain-walk, faultless-tracker (scree, quarry)
[reskin] word match declined by the call: terrain-walk, faultless-tracker, false-appearance — the key word does not mean the mechanic here
[reskin] signature template (trait): aberrant-ground -> Traits/"Shedding Scree" ("wherever it moves it leaves a fresh apron of sliding rubble behind it that keeps [verb: scree:concept, rubble:idea, treacherous:idea, wherever it moves:idea]")
[reskin] repair: 1 clause(s) with no row — "buries what it catches"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Slam = none; Sloughing Scree = none
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] multiattack replacement clause: It can replace one attack with a use of Scree Slide.
[reskin] asked but unanswered: "buries what it catches" asked for on_hit and no row binds the clause
audit finding below confidence gate: Shedding Scree The Difficult Terrain aura has no stated exemption for the burier itself or its movement, and since Burrow 30 ft. is used, the Emanation would need to track a moving 10-foot sphere through the ground, but nothing defines how the aura behaves while the creature is burrowed.
audit finding below confidence gate: Slam The Restrained condition applies only while the target is Grappled by the Slam, but the Scree Slide grapple does not carry this Restrained rider, so identical Grappled conditions from two entries behave inconsistently with no rules reason.
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Glacier Heart — bands soft

**Concept:** a glacier's heart given legs, trailing a wake of killing cold

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Glacier Heart | 15 (2014) | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 12.5 (print at 15 reads 6.75–15, n=12)
- **dropped clause:** "trailing a wake of killing cold"
- read: def 10 / off 15 → 12.5; sustained 68 (2 × Slam); nova Cold Front 71; dmg 93

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

Killing Frost. A creature that touches the glacier heart or hits it with a melee attack while within 5 feet of it takes 10 (3d6) cold damage.
Cold Absorption. Whenever the glacier heart is subjected to cold damage, it takes no damage and instead regains a number of hit points equal to the cold damage dealt.
Siege Monster. The glacier heart deals double damage to objects and structures.

Actions
Multiattack: The glacier heart makes two Slam attacks.
Slam: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage plus 13 (3d8) cold damage. If the glacier heart moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 16 (3d10) cold damage and, if it is Large or smaller, is pushed up to 10 feet straight away from the glacier heart and is knocked prone.
Cold Front (Recharge 5-6): Each creature in a 30-foot cone must make a DC 17 Wisdom saving throw, taking 71 (13d10) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also frightened of the glacier heart until the end of its next turn.
```

**Where each row came from**

- Traits/Killing Frost — template heated-body; library draw (seed unstamped); binds the GM's words: frost
- Traits/Cold Absorption — the chassis
- Traits/Siege Monster — the chassis
- Actions/Multiattack — the chassis
- Actions/Slam — binds the GM's words: plows through
- Actions/Cold Front — the chassis

**Engine trace**

```
[route] brute-juggernaut type=Elemental mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a glacier's heart given legs") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental themes=elemental/terror mind=bestial style=juggernaut energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: trailing a wake of killing cold [behavior] | a glacier's heart given legs [body] | crushing, ground-freezing charge [behavior]
[concept] identity: The glacier's heart strides into battle as a walking ice-shelf, opening with a crushing slam that leaves a killing-cold wake of rime and frozen earth behind it. Each round it bull-rushes the nearest foe or drags its cold front across the field, turning the ground itself into an ally; the deep heart at its center flares to re-rim its limbs when chipped. It is patient and utterly joyless, grinding to the death rather than fleeing, since the cold it trails only grows stronger as it is wounded.
[concept] lore: Ripped from the living core of a melting glacier by desperate thaw-cultists, the Heart walks to bury every warm thing beneath the winter it can no longer keep.
[reskin] donor: brute-9-juggernaut -> CR 15
[reskin] name_element answered: Cold Front = literal
[reskin] inline declared: "the glacier heart" — the call's own answer (kind), built from the name
[reskin] inline form: "the glacier heart" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 17 (8 + PB 5 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "trailing a wake of killing cold" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "trailing a wake of killing cold" but offered no quote
[reskin] clauses: "a glacier's heart given legs" -> has (descriptive), head | "trailing a wake of killing cold" -> has (mechanical) [asked: save_area]
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The glacier heart grinds forward in a straight line, plowing through everything in its path and leaving a wake of frozen, rimed ground behind it. Creatures it plows through are battered and numbed by the crushing passage, and the ice it leaves behind turns the battlefield into a frozen hazard that slows and hurts anyone who follows it. It can only make this crushing charge after a brief pause to g" [action/always/movement] — menu: condition-payoff, shield-bash, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature rider: charge-push -> Slam (appended; The glacier heart grinds in a straight line toward its target, plowing through c [verb: plows through:idea])
[reskin] signature idea (trait): "The colder the glacier heart grows, the harder it fights: as it takes wounds, its core flares and it moves faster, striking sooner, and the frost it trails spreads farther from its body. The wounds that should slow a mortal thing only make its winter deeper." [trait/on_being_hit/movement] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk, aberrant-ground, faultless-tracker (glacier, wake, trail)
[reskin] word match declined by the call: terrain-walk, aberrant-ground, faultless-tracker — the key word does not mean the mechanic here
[reskin] signature template (trait): heated-body -> Traits/"Killing Frost" ("Carries the ever-spreading killing cold around its body: anything that touches i [verb: frost:idea]")
[reskin] weapons answered: Slam = none
[reskin] chassis nova: "Cold Front (Recharge 5-6)" — the brute-9-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] trait stripped: Traits/Immutable Form — a golem's trait on a Elemental
[reskin] defenses by material: a ice body is vulnerable to Fire and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] absorption re-keyed: Acid -> Cold (the donor organ obeys the concept energy)
[reskin] immunities stamped for type: Elemental -> Cold, Poison; Exhaustion, Poisoned
[reskin] save re-derived after a retype: Actions/Cold Front — a Constitution save for an effect that calls for Wisdom or Charisma; the save follows the condition
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Gromm Cragbreaker — bands soft

**Concept:** a stone giant exile who speaks only Giant and understands no Common

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Gromm Cragbreaker | 9 (2014) | brute-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 7.5 (print at 9 reads 5.5–13, n=8)
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Slam); nova none; dmg 54

```
Gromm Cragbreaker
Huge giant, chaotic neutral
Armor Class

14 (natural armor)

Hit Points: 

161 (17d12 + 51)

Speed: 

40 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

8 (-1)

	

17 (+3)

	

8 (-1)

	

10 (+0)

	

8 (-1)

Skills: 

Athletics +7, Perception +4

Saving Throws: 

STR +7, CON +7

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

Giant

Challenge

9 (5,000 XP)

Proficiency Bonus:

+4

Rampage (1/Day). As a bonus action, immediately after dealing damage to a creature that has half of its hit points or fewer, Gromm moves up to half its speed without provoking opportunity attacks, and it makes one Slam attack.

Actions
Multiattack: Gromm makes two attacks: one with Slam and one with Rock.
Slam: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 27 (7d6 + 3) bludgeoning damage.
Rock: Ranged Weapon Attack: +7 to hit, range 60/240 ft., one target. Hit: 24 (6d6 + 3) bludgeoning damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Slam — the chassis
- Actions/Rock — the chassis
- Bonus Actions/Rampage — library seed rampage

**Engine trace**

```
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a stone giant exile") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=elemental/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: slab of mountain rock swung as a club [object] | stone-skinned giant exile [body] | uncomprehending, silent brawling [behavior]
[concept] identity: A hulking stone giant exile wades in swinging a jagged slab of mountain rock, opening with a ground-shaking overhead blow that he follows with relentless, earth-shaking sweeps of its weapon and fists. It fights silent and uncomprehending of any tongue but Giant, trading blows toe-to-toe without finesse or trickery and never backing down, even as it bleeds. Cornered, it simply swings harder, trusting in its stony hide and raw mass to outlast whatever stands against it.
[concept] lore: Cast out from its clan's high crags for crimes it cannot plead in any common tongue, this stone giant wanders the lowlands, mute to all but Giant, seeking a way back to the mountains or a worthy foe to end its exile.
[reskin] donor: brute-9 -> CR 9
[reskin] implied class refused: the call answered "barbarian" but quoted "swinging a jagged slab of mountain rock", which is not the GM's own words
[reskin] inline declared: "Gromm" — the call's own answer (person), built from the name
[reskin] inline form: "Gromm" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: "understands no Common"
[reskin] lacks refused: "speaks only Giant" names no absence — nothing in it takes anything away
[reskin] clauses: "a stone giant exile" -> has (descriptive), head | "speaks only Giant" -> has (header) | "understands no Common" -> LACKS (mechanical)
[reskin] signature idea (action): "Gromm hauls his slab overhead with both hands and brings it down on everything in front of him, driving a shockwave through the ground that buckles knees and staggers everyone standing near the impact — not just the one he aimed at. The blow also numbs the legs of anyone caught in the quake, leaving them dragging behind as he wades toward them. He can only wind up for this when he plants his feet," [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] nova declined: "Slab Quake (Recharge 5-6)" — a whole-round ability the GM never asked for: the call offered no quote, and the key table finds no verb either (the idea's own words: shockwave:idea, quake:idea); the fallback stands in (the cauldron's spill, 2026-09-29)
[reskin] fallback skipped by the floor: push-prone (EV 3.7 vs 14)
[reskin] fallback skipped by the floor: herd (EV 10.5 vs 45.6)
[reskin] value check: "Rampage (1/Day)" EV 22.8 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Gromm's slab is a chunk of the mountain itself, and it drinks the blows that strike it — when something wounds him at close range, he wrenches the weapon free and the stone drinks the hit, letting him swing back with the borrowed force. This works only against an enemy already bleeding from him, the stone refusing to answer to anything that hasn't earned its fury." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] word match declined by the call: false-appearance, absorption — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Gromm's slab is a chunk of the mountain itself, and it drinks the blows that strike it — when something wounds him at close range, he wrenches the weapon free and the stone drinks the hit, letting him swing back with the borrowed force. This works only against an enemy already bleeding from him, the stone refusing to answer to anything that hasn't earned its fury." [trait/on_being_hit/damage] — the model picked "weapon-lodge" (no verb, and it quotes nothing the GM typed) over a concept-verb template (false-appearance)
[reskin] weapons answered: Slab = none; Rock = none
[reskin] attack name by anatomy: "Slab" -> "Slam" — slab is a ranged noun on a melee row
[reskin] rename propagated: "Slab" -> "Slam" in "Multiattack"
[reskin] rename propagated: "Slab" -> "Slam" in "Rampage (1/Day)"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Sethra Reedsong — bands soft

**Concept:** lizardfolk monk

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sethra Reedsong | 5 (2014) | skirmisher-3 | ok | SOFT: band | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 3.5 (print at 5 reads 2.5–9.5, n=25)
- gates · soft · ko-at-will: Actions/Bite: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 4 → 3.5; sustained 32 (2 × Bite); nova none; dmg 32

```
Sethra Reedsong
Medium humanoid, lawful neutral
Armor Class

15 (chain shirt)

Hit Points: 

97 (15d8 + 30)

Speed: 

30 ft., swim 40 ft.

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

Hold Breath. Sethra can hold its breath for 15 minutes.
Marsh Stride. Difficult terrain composed of mud doesn't cost Sethra extra movement, and Sethra can move across mud without needing to make an ability check.
Patient Defense. As a bonus action, Sethra takes the Dodge action.
Reed-Slip. As a bonus action, Sethra takes the Disengage action, and the next attack roll made against it before the start of its next turn has disadvantage.

Actions
Multiattack: Sethra makes two attacks: one with Bite and one with Spine Shot.
Bite: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) piercing damage. Once on each of Sethra's turns when it hits with this attack, the target is subjected to the following effect. The target must succeed on a DC 14 Constitution saving throw or be stunned until the end of Sethra's next turn.
Spine Shot: Ranged Weapon Attack: +6 to hit, range 20/60 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage.
```

**Where each row came from**

- Traits/Hold Breath — lizardfolk kit; the GM's clause "lizardfolk monk"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "lizardfolk monk"
- Actions/Multiattack — the chassis
- Actions/Bite — a declared feature; the GM's clause "lizardfolk monk"
- Actions/Spine Shot — the chassis
- Bonus Actions/Patient Defense — template patient-defense; monk kit; the GM's clause "lizardfolk monk"
- Bonus Actions/Reed-Slip — library seed feint-slip

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("monk") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: scaled, darting hit-and-run strikes [behavior] | a disciplined monk's flowing evasion [behavior] | pebbled hide and lashing tail [body]
[concept] identity: A lizardfolk monk opens a fight by circling in a low, silent stalk, then explodes forward to strike with scaled fists and a lashing tail before slipping back out of reach — its hide dull and pebbled like river stone. Every round after, it flows through the press of battle, snapping quick two-hit combinations while keeping a wall or ally at its back, and it toys with slower prey rather than finishing it quickly. Wounded, it does not flee outright but retreats into cover, hisses a challenge, and waits to punish the first pursuer who overcommits.
[concept] lore: Hatched in the reedy shallows of a marsh temple, the lizardfolk monk left its clutch to test its discipline against the soft-skinned peoples of the dry lands, treating every fight as a lesson in patience and breath.
[reskin] donor: skirmisher-3 -> CR 5
[reskin] row evicted for the cap: Traits/"Reed Step" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "lizardfolk monk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] row evicted for the cap: Bonus Actions/"Fleet Agility" (chassis filler) leaves so "Patient Defense" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: monk — "lizardfolk monk": Stunning Strike (stunning-strike, rides Fist), Patient Defense (patient-defense)
[reskin] inline declared: "Sethra" — the call's own answer (person), built from the name
[reskin] inline form: "Sethra" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "lizardfolk monk" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When Sethra lands a hit and then slips back out of reach, it turns the retreat itself into a lesson: the wounded foe who chases it into open ground finds its footing stolen and its breath cut short as Sethra coils and hisses a challenge from cover. This only works if Sethra actually gives ground after striking, and only on the first pursuer foolish enough to follow." [reaction/on_being_hit/movement] — menu: snap-shot, riposte (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When Sethra lands a hit and then slips back out of reach, it turns the retreat itself into a lesson: the wounded foe who chases it into open ground finds its footing stolen and its breath cut short as Sethra coils and hisses a challenge from cover. This only works if Sethra actually gives ground after striking, and only on the first pursuer foolish enough to follow." [reaction/on_being_hit/movement] — the model found no template that holds it (offered: snap-shot, riposte, feint-slip, spew, rampage, aggro-curse)
[reskin] value check: "Feinting Step" EV 8.4 vs floor 2.8 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: feint-slip -> Bonus Actions/"Feinting Step" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Sethra's tail is never truly idle — even while it holds a guard or stalks low, the lashing tail keeps harrying whatever stands beside or behind it, making it costly for slower foes to crowd the monk's flanks." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: faultless-tracker, guarded-stance, assassinate — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Sethra's tail is never truly idle — even while it holds a guard or stalks low, the lashing tail keeps harrying whatever stands beside or behind it, making it costly for slower foes to crowd the monk's flanks." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] weapons answered: Fist = none; Tail Lash = none
[reskin] weapon table: "Tail Lash" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] audit rename: "Tail Lash" -> "Spine Shot"
[reskin] audit rename: "Feinting Step" -> "Reed-Slip"
[reskin] species kit: "Fist" -> "Bite" (Piercing, not Bludgeoning) — a lizardfolk strikes with its own
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Krennik Skullstandard — bands soft

**Concept:** name: Krennik Skullstandard | riding a worg

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Krennik Skullstandard | 4 (2014) | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 1.0625–6.5, n=13)
- read: def 1 / off 4 → 2.5; sustained 20 (2 × Saber); nova Ride-Down 22; dmg 28

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

Mounted Agility (Bonus Action). Krennik takes the Dash or Disengage action.
Rampage (1/Day) (Bonus Action). Immediately after dealing damage to a creature that is already below half its hit point maximum, Krennik moves up to half its Speed, and it makes one Saber attack.
Riposte (Reaction). Trigger: A creature within 5 feet of Krennik misses it with a melee attack roll. Response: Krennik makes one Saber attack against that creature.

Actions
Multiattack: Krennik makes two attacks, using Saber or Javelin.
Saber: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is knocked prone.
Javelin: Ranged Weapon Attack: +5 to hit, range 30/120 ft., one target. Hit: 7 (1d8 + 3) piercing damage.
Ride-Down (Recharge 5-6): Krennik moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters must make a DC 13 Strength saving throw, taking 22 (5d8) bludgeoning damage on a failed save. On a failed save, the target is knocked prone.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Saber — weapon scimitar
- Actions/Javelin — weapon javelin
- Actions/Ride-Down — the chassis
- Bonus Actions/Mounted Agility — the chassis
- Bonus Actions/Rampage — library seed rampage
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "riding a worg"

**Engine trace**

```
[route] skirmisher-mounted type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] hints: mounted→style ✓ ("riding a worg")
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/bestial mind=sapient style=mounted energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Krennik Skullstandard"
[concept] mechanics: none claimed
[concept] signature elements: ride-down charge that carries him past the target [behavior] | the worg mount striking alongside him [body] | iron standard and blade [object]
[concept] identity: Krennik Skullstandard fights as a mounted skirmisher: he spurs his worg into a ride-down charge that carries him through and past the target, then wheels for a second pass rather than closing to a standstill. Each round he keeps the beast circling at speed, slashing from its back and using its momentum so the worg's jaws and his blade land on the same victim. He is a calculating raider who toys with isolated prey, and once bloodied he breaks off into the warg's gallop to regroup rather than die on foot.
[concept] lore: A border-raider who took the Skullstandard as his banner after his warband was broken, Krennik rides down travelers on the frontier road to gather plunder and the fear that keeps rival bands in line.
[reskin] the concept outranks the alias: the Worg is a Fey and the concept reads Humanoid — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] nova capped: "Trampling Rush" 24 → 22 (the chassis nova obeys the cap: 22 at CR 4)
[reskin] donor: skirmisher-3-mounted -> CR 4 (invented — no printed peer)
[reskin] implied class kept: "fighter" on the GM's own words "riding a worg" — the key table found none
[reskin] row evicted for the cap: Traits/"Skirmish Ride" (chassis filler) leaves so "Riposte" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: fighter — "riding a worg": Riposte (riposte)
[reskin] proper noun: "Krennik Skullstandard" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Krennik" — the call's own answer (person), built from the name
[reskin] inline form: "Krennik" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Krennik Skullstandard — riding a worg" -> has (descriptive), head
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When Krennik spurs past a foe mid-charge, the worg's jaws snap at whatever he just slashed, letting blade and beast tear at the same victim in one blurred pass. After the bite lands, the worg's grip drags the victim along for a step, keeping it off balance and stuck in the saddle-side melee rather than free to run." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot)
[reskin] rider declined: "Pounce" — a rider rides the user's own attack, so it needs the user's own ask; the call offered no quote, and the key table finds no verb either (the gong's bandaged concussion, 2026-10-01)
[reskin] value check: "Rampage (1/Day)" EV 8.5 vs floor 1.6 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Krennik fights with one eye on the road behind him: whenever he breaks away from melee, his banner marks the pursuer for the warband, and the first creature that chases him is thrown wide by the circling worg's shoulder. A foe that runs him down finds itself flat and alone instead of at his back." [trait/start_of_turn/movement] — menu: warded-mending (+ shelf: false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Krennik fights with one eye on the road behind him: whenever he breaks away from melee, his banner marks the pursuer for the warband, and the first creature that chases him is thrown wide by the circling worg's shoulder. A foe that runs him down finds itself flat and alone instead of at his back." [trait/start_of_turn/movement] — the model found no template that holds it (offered: warded-mending, resonant-body, faultless-tracker)
[reskin] weapons answered: Saber = saber; Javelin = javelin; Ride-Down = none
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] chassis nova: "Ride-Down (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
audit finding below confidence gate: Ride-Down (Recharge 5-6) Nothing caps how many creatures share the charged line, so the GM must resolve an unbounded number of DC 13 saves mid-move with no area or count limit stated.
audit finding below confidence gate: Rampage (1/Day) The trigger lets Krennik move up to half its Speed with no target or repositioning restriction stated, and the Saber attack that follows gives the target no adjudicated recourse to the movement.
!! [reskin] 2014 conversion failed — the deterministic shape ships with 2024 phrasing: Failed to generate a valid response. Please try again later.
```


---


### Axehand Sellsword — bands soft

**Concept:** a sellsword who hurls a handaxe and closes with a shortsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Axehand Sellsword | 5 (2014) | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 3.5 (print at 5 reads 2.5–9.5, n=25)
- **dropped clause:** "hurls a handaxe"
- read: def 3 / off 4 → 3.5; sustained 32 (2 × Shortsword); nova none; dmg 32

```
Axehand Sellsword
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

Riposte (Reaction). Trigger: A creature within 5 feet of the sellsword misses it with a melee attack roll. Response: The sellsword makes one Shortsword attack against that creature.

Actions
Multiattack: The sellsword makes two attacks, using Shortsword or Handaxe.
Shortsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) piercing damage, and the sellsword has Advantage on its next attack roll against the target before the end of its next turn.
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
[concept] signature elements: the thrown handaxe [object] | the closing shortsword follow-up [behavior] | hit-and-run footwork [behavior]
[concept] identity: A sellsword opens by sending a handaxe spinning across the gap, then sprints in behind it to finish the wounded mark with a shortsword before they can reset their guard. Every round after that is a stutter-step rhythm — throw, close, cut, break off a pace — always angling for the moment the target is distracted by the incoming axe. Bloodied but not broken, it keeps circling for an opening, and only quits the field for good when it's paid to.
[concept] lore: Free blades of the border towns sell their arm to whoever pays first, and their reputation is built on a handaxe that leaves the hand before the target knows the fight has started.
[reskin] print canon route: "a sellsword who hurls a handaxe and closes with a shortsword" is the Warrior Veteran, a bow-user — the hurler seat stands down for the plain line
[reskin] print canon array: STR 16, DEX 16, CON 14, INT 10, WIS 11, CHA 10 — the Warrior Veteran's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 5
[reskin] style unserved: "hurler" has no skirmisher line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] print canon: "a sellsword who hurls a handaxe and closes with a shortsword" heads on the Warrior Veteran — print's rows ride along; the seat stays
[reskin] named parts: Shortsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] row evicted for the cap: Traits/"Stutter-Step" (chassis filler) leaves so "Riposte" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: fighter — "a sellsword": Riposte (riposte)
[reskin] inline declared: "the sellsword" — the call's own answer (kind), built from the name
[reskin] inline form: "the sellsword" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "hurls a handaxe" but offered no quote
[reskin] asked field dropped: the call answered trigger "at_will" for "closes with a shortsword" but offered no quote
[reskin] clauses: "a sellsword" -> has (descriptive), head | "hurls a handaxe" -> has (mechanical) [asked: attack] | "closes with a shortsword" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The sellsword hurls its handaxe and uses the target's effort of dodging it as a feint, springing across the distance in the same motion and arriving sword-first. The thrown axe doesn't need to land to draw the eye, so it can be loosed even at a foe already engaged, and whoever it flies past is the one caught flat-footed by the shortsword a heartbeat later." [action/always/movement] — menu: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — thrown-burst-seed (hurl)
[reskin] word match declined by the call: throw-retrieve, leap, feint-slip, pounce — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown thrown-burst-seed, which the GM's words keyed
[reskin] key match declined: action — "thrown-burst-seed" was ranked first on the call's own menu for hurl, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The sellsword hurls its handaxe and uses the target's effort of dodging it as a feint, springing across the distance in the same motion and arriving sword-first. The thrown axe doesn't need to land to draw the eye, so it can be loosed even at a foe already engaged, and whoever it flies past is the one caught flat-footed by the shortsword a heartbeat later." [action/always/movement] — the model found no template that holds it (offered: thrown-burst-seed, trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, feint-slip, pounce)
[reskin] fallback respects the call: thrown-burst-seed left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "a sellsword who hurls a handaxe and closes with a shortsword" heads on the Warrior Veteran and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Horrid Display (2/Day)" EV 18.7 vs floor 28.7 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "A sellsword always keeps a second axe where the first one came from, and its hand seems to replace a thrown blade without anyone seeing the motion. The first time an enemy closes in expecting an empty hand, the sellsword already has steel out to meet them." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "A sellsword always keeps a second axe where the first one came from, and its hand seems to replace a thrown blade without anyone seeing the motion. The first time an enemy closes in expecting an empty hand, the sellsword already has steel out to meet them." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, faultless-tracker)
[reskin] weapons answered: Shortsword = shortsword; Handaxe = handaxe
[reskin] weapon table: "Handaxe" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Warrior Veteran's
[reskin] print canon yields: "Handaxe" keeps its handaxe — the GM typed it; the Warrior Veteran's Heavy Crossbow prices the row but does not replace the weapon
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Warrior Veteran's
[reskin] multiattack re-read — "Handaxe" joins the combination; "The sellsword makes two attacks, using Shortsword or Handaxe in any combination."
!! [reskin] 2014 conversion failed — the deterministic shape ships with 2024 phrasing: Failed to generate a valid response. Please try again later.
```


---


### Brother Halric — bands soft

**Concept:** name: Brother Halric | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Brother Halric | 3 (2014) | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.125–6.5, n=23)
- read: def 1/2 / off 3 → 1.75; sustained 22 (2 × Hammer); nova none; dmg 22

```
Brother Halric
Medium humanoid, neutral
Armor Class

13 (leather)

Hit Points: 

60 (11d8 + 11)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


12 (+1)

	

14 (+2)

	

13 (+1)

	

8 (-1)

	

12 (+1)

	

8 (-1)

Skills: 

Perception +3, Stealth +4

Saving Throws: 

DEX +4

Senses: 

passive Perception 13

Languages: 

Common

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Fleet Agility (Bonus Action). Halric takes the Dash or Disengage action.
Rampage (1/Day) (Bonus Action). Immediately after dealing damage to a creature that is already below half its hit point maximum, Halric moves up to half its Speed, and it makes one Hammer attack.
Riposte (Reaction). Trigger: A creature within 5 feet of Halric misses it with a melee attack roll. Response: Halric makes one Hammer attack against that creature.

Actions
Multiattack: Halric makes two attacks, using Hammer or Thrown Mace.
Hammer: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 11 (2d8 + 2) bludgeoning damage.
Thrown Mace: Ranged Weapon Attack: +4 to hit, range 20/60 ft., one target. Hit: 9 (2d6 + 2) bludgeoning damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Hammer — weapon maul
- Actions/Thrown Mace — weapon mace
- Bonus Actions/Fleet Agility — the chassis
- Bonus Actions/Rampage — library seed rampage
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "brother halric"

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: the call reads no worked magic in these words | caster: the family itself needs a magic word in the words — the fallback leaves it | fell to skirmisher's plain line | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Brother Halric"
[concept] mechanics: none claimed
[concept] signature elements: iron-hardened lay brother in dented plate [body] | dart in, strike, give ground [behavior] | holy warhammer and thrown iron mace [object]
[concept] identity: Brother Halric opens by circling the edge of the fight, a knot of hard-pressed iron closing to shove and hammer before he wheels back out of reach, always keeping an ally or a wall at his shoulder so his blows land where the target can't answer. Every round after he darts in on whoever an ally has marked or staggered, lands one iron-heavy strike, and gives ground again, wearing the fight down in short brutal passes. Under pressure he does not break and run — he goes cold and patient, backing off to bleed a wounded foe out over another several exchanges, and he only turns and flees when his own blood runs thin and no ally is left to trade against the enemy's attention.
[concept] lore: Brother Halric was a lay brother of a militant order broken at the old siege; his god never answered and the iron of his brothers never rusted, so he walks the ruin-road still, offering the last rites to any stranger who can hold a weapon long enough to be judged.
[reskin] donor: skirmisher-3 -> CR 3
[reskin] implied class kept: "fighter" on the GM's own words "brother halric" — the key table found none
[reskin] row evicted for the cap: Traits/"Iron Circle" (chassis filler) leaves so "Riposte" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: fighter — "brother halric": Riposte (riposte)
[reskin] proper noun: "Brother Halric" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Halric" — the call's own answer (person), built from the name; the rules would have said "the brother"
[reskin] inline on kit rows: "the brother" -> "Halric"
[reskin] inline form: "Halric" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 12 (8 + PB 2 + the sheet's best 2) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Brother Halric" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When Halric lands a hammer blow on a foe, he leans his weight through the swing and shoves the stunned thing a stride backward, then pivots to put his own shoulder toward the nearest wall or ally so the return swing comes at his guard instead of his back. The foe has to spend a moment scrambling back to reach him, and anyone who follows Halric too eagerly finds itself out of line with its friends," [rider/on_hit/movement] — menu: charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot)
[reskin] word match declined by the call: throw-retrieve, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, feint-slip — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When Halric lands a hammer blow on a foe, he leans his weight through the swing and shoves the stunned thing a stride backward, then pivots to put his own shoulder toward the nearest wall or ally so the return swing comes at his guard instead of his back. The foe has to spend a moment scrambling back to reach him, and anyone who follows Halric too eagerly finds itself out of line with its friends," [rider/on_hit/movement] — the model found no template that holds it (offered: charge-push, hook-rider, pounce, isolation, bolt-mark, charge, throw-retrieve, feint-slip)
[reskin] fallback respects the call: feint-slip left the shelf — the call declined it for this sheet
[reskin] fallback skipped by the floor: gaze-single (EV 1.5 vs 5.7)
[reskin] fallback skipped by the floor: sensory-strike (EV 1.5 vs 5.7)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 5.7)
[reskin] value check: "Rampage (1/Day)" EV 9.3 vs floor 1.8 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The old iron of Halric's dented plate spreads his blows wide: whatever he hits with that hammer stays marked by the cold, ringing ache of it, and as long as the wound is fresh his mind reads the fight through it — he knows where the marked one is and answers its openings with a little more weight behind his iron." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: bloodied-burst, resonant-body, shielded-mind — the key word does not mean the mechanic here
[reskin] trait declined: "Ringing Mark" — bound only on the idea's own words (knows where:idea, marked:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Hammer = maul; Thrown Mace = mace
[reskin] weapon declared: "Hammer" is a maul — the call's own answer (the name alone read warhammer)
[reskin] weapon table: "Thrown Mace" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
!! [reskin] 2014 conversion failed — the deterministic shape ships with 2024 phrasing: Failed to generate a valid response. Please try again later.
```


---


### Hydra — in the run

**Concept:** name: Hydra | whose stumps smoke instead of regrowing

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hydra | 8 (2014) | brute-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Regeneration
- read: def 9 / off 1/4 → 4.625; sustained NaN (NaN × Bite); nova none; dmg NaN

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

Regeneration. The hydra regains 10 hit points at the start of each of its turns. If the hydra takes cold damage, this trait doesn't function on the hydra's next turn. The hydra dies only if it starts its turn with 0 hit points and doesn't regenerate.
Hold Breath. The hydra can hold its breath for 1 hour.
Multiple Heads. The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead. At the end of each of its turns when it has at least one living head, the hydra grows two heads for each of its heads that died since its last turn, unless it has taken fire damage since its last turn. The hydra regains 20 hit points when it grows new heads.
Reactive Heads. For each head the hydra has beyond one, it gets an extra reaction that can be used only for opportunity attacks.

Actions
Multiattack: The hydra makes as many Bite attacks as it has heads.
Bite: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 23 (4d8 + 5) piercing damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Bite — the chassis
- Traits/Regeneration — the chassis
- Traits/Hold Breath — print's own row
- Traits/Multiple Heads — print's own row
- Traits/Reactive Heads — print's own row

**Engine trace**

```
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("stumps smoke instead of regrowing") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/devouring mind=bestial style=regenerator energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Hydra"
[concept] mechanics: regeneration
[concept] signature elements: stumps that smoke instead of regrowing [body] | many biting heads striking in concert [behavior] | searing blinding haze [aura]
[concept] identity: Smoke-hydra fights as a many-headed avalanche of biting necks, lunging to pin prey between two or three jaws before the rest hammer down. Every neck it loses leaves a stump that vents searing, blinding smoke into the melee, so the more it is carved the more the battlefield disappears into hot haze. It fights to the death with relentless, spiteful hunger, never retreating — a wound is simply another mouthful of fog to drown its enemies in.
[concept] lore: Hatched in volcanic sinkholes where the air itself is half ash, the smoke-hydra is a living wound of the caldera: it wants only to eat, and its bodies' ruined necks bleed the mountain's breath wherever it wanders.
[reskin] print canon route: the Hydra's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 136 -> 184, AC 14 -> 15 — the Hydra's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 20, INT 2, WIS 10, CHA 7 — the Hydra's at its own CR; attack +7 -> +8, DC 16 (print's)
[reskin] regeneration organ injected — 10/turn
[reskin] regeneration off-switch: Cold (foil of Fire)
[reskin] donor: brute-5 -> CR 8
[reskin] print canon: "Hydra — whose stumps smoke instead of regrowing" heads on the Hydra — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline by rule: "the hydra" — the call answered "the hydra" (kind), which the name does not support
[reskin] inline form: "the hydra" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Hydra — whose stumps smoke instead of regrowing" -> has (descriptive), head
[reskin] signature idea (action): "With two or more heads still burning, it lunges at once in a fan, each head taking its own target in reach — so a pack of enemies gets bitten everywhere at once. Each head that lands sinks in and keeps a grip, dragging the victim in line with another neck that strikes again." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, zone, zone-seed, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — zone, zone-seed (smoke)
[reskin] word match declined by the call: zone, zone-seed — the key word does not mean the mechanic here
[reskin] fit declined: "Gripping Fan" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: zone, zone-seed left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "Hydra — whose stumps smoke instead of regrowing" heads on the Hydra and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Disarming Twist" EV 0 vs floor 13 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever one of its necks is ruined, the stump bursts into a rolling cloud of searing smoke that clings around the hydra — anybody caught close enough to bite it is blinded and scorched by the haze until they get clear of it. The more necks it loses, the thicker and wider the cloud swells." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — warded-mending (regrows)
[reskin] word match declined by the call: heated-body, bloodied-burst, death-burst, warded-mending — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown warded-mending, which the GM's words keyed
[reskin] key match declined: trait — "warded-mending" was ranked first on the call's own menu for regrows, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Whenever one of its necks is ruined, the stump bursts into a rolling cloud of searing smoke that clings around the hydra — anybody caught close enough to bite it is blinded and scorched by the haze until they get clear of it. The more necks it loses, the thicker and wider the cloud swells." [trait/on_being_hit/condition] — the model found no template that holds it (offered: warded-mending, heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, death-burst)
[reskin] weapons answered: Bite = none
[reskin] speed by concept: added Swim 40 ft. — the concept's movement set decides
[reskin] rider folded: "Bite" keeps its budget — the chassis's rider half (10) folds into the base; the Hydra pays no damage rider of its own
[reskin] print canon multiattack: "The hydra makes as many Bite attacks as it has heads." — the Hydra's own
[reskin] languages held: None stands — INT 2 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon defenses: immunities none -> Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious — the Hydra's own header lines
[reskin] print canon trait: Hold Breath — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Multiple Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Reactive Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Vampire — in the run

**Concept:** name: Vampire | who keeps a garden of thorns

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vampire | 13 (2014) | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "keeps a garden of thorns"
- read: def 10 / off 11 → 10.5; sustained 72 (3 × Grave Strike); nova none; dmg 72

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

darkvision 60 ft., passive Perception 17

Languages: 

Common plus two other languages

Challenge

13 (10,000 XP)

Proficiency Bonus:

+5

Legendary Resistance (3/Day). If the vampire fails a saving throw, it can choose to succeed instead.
Misty Escape. If the vampire drops to 0 hit points outside its resting place, the vampire uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 hit points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and is paralyzed until it regains any hit points, and it regains 1 hit point after spending 1 hour there.
Spider Climb. The vampire can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Vampire Weakness. The vampire has these weaknesses: Forbiddance: the vampire can't enter a residence without an invitation from an occupant.
Running Water: the vampire takes 20 acid damage if it ends its turn in running water.
Stake to the Heart: If a weapon that deals piercing damage is driven into the vampire's heart while the vampire is incapacitated in its resting place, the vampire is paralyzed until the weapon is removed.
Sunlight: the vampire takes 20 radiant damage if it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks.
Shape-Shift. As a bonus action, if the vampire isn't in sunlight or running water, it shape-shifts into a Tiny bat (speed 5 ft., fly speed 30 ft.) or a Medium cloud of mist (speed 5 ft., fly speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the vampire can't speak. Its game statistics, other than its size and speed, are unchanged.
While in mist form, the vampire can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has resistance to all damage, except the damage it takes from sunlight.
Charm (Recharge 5-6). As a bonus action, the vampire casts charm person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The charmed target is a willing recipient of the vampire's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was charmed by the vampire.

Actions
Multiattack: The vampire makes three Grave Strike attacks. It can replace one attack with a use of Binding Lash.
Grave Strike: Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 17 (3d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) by one of two hands.
Binding Lash: One creature within 60 feet of the vampire must succeed on a DC 17 Dexterity saving throw or be restrained until the end of the vampire's next turn.
Bite (Bat or Vampire Form Only): One creature within 5 feet of the vampire that is willing or that is grappled, incapacitated, or restrained must make a DC 17 Constitution saving throw, taking 26 (4d12) piercing damage plus 13 (3d8) necrotic damage on a failed save, or half as much damage on a successful one. The target's hit point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a vampire spawn under the vampire's control.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Grave Strike — print's row, renamed
- Actions/Binding Lash — library seed snare-bolt
- Actions/Bite — print's own row
- Bonus Actions/Shape-Shift — print's own row
- Bonus Actions/Charm — print's own row
- Traits/Legendary Resistance — print's own row
- Traits/Misty Escape — print's own row
- Traits/Spider Climb — print's own row
- Traits/Vampire Weakness — print's own row

**Engine trace**

```
[route] lurker type=Undead mechanics=snare — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-trap: ✓ ("keeps a garden of thorns") | lurker-trap: no line key in the words — the model's read of its quote | lurker-trap -> lurker: a trap is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] resolve: archetype=lurker type=Undead themes=grave/grasping mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Vampire"
[concept] mechanics: snare
[concept] signature elements: a garden of thorns it hides within and commands [aura] | hooked thorn-lances driven into prey before the hidden lunge [behavior] | undead grave-sap that feeds the briars [body]
[concept] identity: The Thorn Gardener rots in wait inside its bramble maze, striking from the undergrowth with a single blood-bloated lunge that leaves hooked thorn-lances buried in the victim; every round after it flits back into the thicket, its grave-sap blood feeding the roses while it bleeds the prey dry. It is patient and cruel rather than desperate — bloodied, it withdraws into its deepest hedge and croons through the vines, letting the garden's thorns finish what its fangs began.
[concept] lore: A vampire who buried its own coffin beneath a rose garden and watered it with centuries of victims, the Thorn Gardener now can no longer leave the briars it has grown into and wants only to see them flower again.
[reskin] print canon defenses: HP 184 -> 195, AC 17 -> 16 — the Vampire's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 18, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's at its own CR; attack +8 -> +9, DC 17 (print's)
[reskin] donor: lurker-8 -> CR 13
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] print canon: "Vampire — who keeps a garden of thorns" heads on the Vampire — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline by rule: "the vampire" — the call answered "the vampire" (kind), which the name does not support
[reskin] inline form: "the vampire" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 17 (8 + PB 5 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no longer leave the briars" quotes nothing the user typed
[reskin] clauses: "Vampire —" -> has (descriptive), head | "keeps a garden of thorns" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The vampire drives a lance of living thorn deep into a foe it can see, and the barbed head stays planted in the wound, trailing a thin vine back toward the briars. While the thorn remains buried, the victim is tethered to the garden: the vampire can drag the rooted prey toward itself through the vine whenever it wills, and the vine slowly drinks the victim's blood, knitting the vampire's own wound" [rider/on_hit/damage] — menu: contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — drain (vampire)
[reskin] word match declined by the call: drain, obstacle-pull, snare-bolt, pacify — the key word does not mean the mechanic here
[reskin] fit declined: "Thorn Tether" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: drain left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "Vampire — who keeps a garden of thorns" heads on the Vampire and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Binding Lash" EV 14.3 vs floor 13.5 (one attack of 3) — worth the trade
[reskin] library seed drawn: snare-bolt -> Actions/"Binding Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The briar maze answers its gardener. Whenever a creature the vampire has wounded tries to slip away, flee, or hide from it, the thorns of the hedge stir and reach for that creature on their own, snagging it and holding it fast until it tears itself loose. The deeper into the garden the vampire is wounded, the more fiercely the roses lash out at those who spilled its sap." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — heated-body (thorns)
[reskin] word match declined by the call: heated-body, adhesive, bloodied-fury, bloodied-burst — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown heated-body, which the GM's words keyed
[reskin] key match declined: trait — "heated-body" was ranked first on the call's own menu for thorns, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The briar maze answers its gardener. Whenever a creature the vampire has wounded tries to slip away, flee, or hide from it, the thorns of the hedge stir and reach for that creature on their own, snagging it and holding it fast until it tears itself loose. The deeper into the garden the vampire is wounded, the more fiercely the roses lash out at those who spilled its sap." [trait/always/condition] — the model found no template that holds it (offered: heated-body, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] weapons answered: Thorn Lance = none
[reskin] weapon declined: "Thorn Lance" reads lance from its name, but the call answered none — the row carries no weapon
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral -> Lawful Evil — the Vampire's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Thorn Lance" -> "Grave Strike" — the Vampire's own row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon row priced: Bite (Bat or Vampire Form Only) — dice 6 → 26
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Binding Lash.
[reskin] lint actuator rename: "Legendary Resistance" -> "Legendary Resistance (3/Day)"
[reskin] escape dc: Grave Strike → DC 17 (8 + PB + STR; a late row wore another number)
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Bone Sun Archlich — in the run

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Bone Sun Archlich | 20 (2014) | caster-21 | ok | ok | ok | SOFT: ko-at-will, rider-no-save | ok | ok | ok | ok | ok |

- gates · soft · ko-at-will: Actions/Paralyzing Touch: Paralyzed at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- gates · soft · rider-no-save: Actions/Paralyzing Touch: a Paralyzed rider on every hit with no save
- read: def 19 / off 18 → 18.5; sustained 114 (3 × Eldritch Burst + legendary Deathly Teleport); nova Deathly Burst 24; dmg 114

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

Arcana +11, Perception +8

Saving Throws: 

CON +9, INT +11, WIS +8

Damage Resistances: 

cold

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

Deathly Burst. The first time the archlich has half of its hit points or fewer in a fight, it releases a burst. Each creature within 30 feet of the archlich must make a DC 19 Constitution saving throw, taking 24 (7d6) necrotic damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also poisoned until the end of its next turn.
Legendary Resistance (3/Day). If the archlich fails a saving throw, it can choose to succeed instead.
Spirit Jar. If destroyed, the archlich reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the archlich's lair.
Protective Magic (3/Day) (Reaction). When the archlich is hit by an attack roll, the archlich casts shield, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: The archlich makes three attacks, using Eldritch Burst or Paralyzing Touch. It can replace one attack with a use of Spellcasting to cast Bestow Curse.
Eldritch Burst: Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 27 (5d8 + 5) force damage.
Paralyzing Touch: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 23 (4d8 + 5) cold damage, and the target is paralyzed until the start of the archlich's next turn.
Spellcasting: The archlich casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 19): -

At will: detect magic, detect thoughts, dispel magic, fireball, invisibility, lightning bolt, mage hand, prestidigitation

2/day each: animate dead, dimension door, plane shift

1/day each: chain lightning, finger of death, power word kill, scrying
Legendary Actions

The archlich can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The archlich regains spent legendary actions at the start of its turn.

Deathly Teleport: The archlich teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an undead within 20 feet of the archlich must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one. Whether it succeeds or fails, the archlich can't take this action again until the start of its next turn.
Frightening Gaze: The archlich casts fear, using the same spellcasting ability as Spellcasting. The archlich can't take this action again until the start of its next turn.
```

**Where each row came from**

- Traits/Deathly Burst — template bloodied-burst; library draw (seed unstamped); binds the GM's words: wounded+crack
- Traits/Legendary Resistance — the chassis
- Traits/Spirit Jar — print's own row
- Actions/Multiattack — the chassis
- Actions/Eldritch Burst — print's own row, renamed
- Actions/Paralyzing Touch — print's row, renamed
- Actions/Spellcasting — print's own row
- Reactions/Protective Magic — the chassis
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Deathly Teleport — print's own row
- Legendary Actions/Disrupt Life — print's own row
- Legendary Actions/Frightening Gaze — print's own row

**Engine trace**

```
[route] caster (artillery) type=Undead mechanics=aura — casts: implied by the kind — "archlich" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("archlich enthroned") | caster: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "an archlich enthroned on a sun of bone…" is the description, not a name
[concept] resolve: archetype=caster type=Undead themes=grave/arcane mind=sapient style=— energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: a throne carved from a sun of bone [object] | radial tides of dead starlight [aura] | spending the sun's mass on bone-shard detonations [behavior]
[concept] identity: The archlich does not stand to fight — it sits enthroned at the heart of a hollow sun of bone, and its opening move is to let the throne act: a slow radial tide of necrotic light sweeps the field as rib-vaults crack open and spill crawling marrow. Each round it hurls bone-shard bolts and detonates segments of its own orbit, spending the sun's mass to keep hunters at bay, while it keeps a spell in reserve for anyone who reaches the dais. It is contemptuous rather than desperate: it toys with prey from its seat, and only bothers to rise when the bone sun itself is threatened.
[concept] lore: A lich who bound its mortality not to a phylactery but to a captured star's corpse, and now sits inside it, gnawing the last heat from the bones to hold off the day it finally has to die.
[reskin] print canon pb: print's +12 on PB +7 reads +11 on this sheet's PB +6; DCs follow
[reskin] print canon defenses: HP 300 -> 315, AC 19 -> 20 — the Lich's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 21, WIS 14, CHA 16 — the Lich's at its own CR; attack +10 -> +11, DC 19 (print's, on this sheet's PB)
[reskin] donor: caster-21 -> CR 20
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Grasp" promises the Grappled condition but the row never delivers it — name what the rule does, or drop the claim word; this row earns Strike, Blow, Lash
[reskin] inline declared: "the archlich" — the call's own answer (kind), built from the name
[reskin] inline form: "the archlich" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an archlich enthroned on a sun of bone" -> has (descriptive), head
[reskin] menu pruned: action — thrown-burst-seed, phase-slip, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The archlich tears loose a burning rib from its own throne and drives it into the battlefield as a shard that lodges in a creature. That shard keeps smoldering with stolen necrotic heat, and at the start of the archlich's next turn it bursts open in a small bloom of bone splinters, wounding the bearer and everyone pressed close around it. Anyone who pries the shard free or shoves the bearer away c" [rider/on_hit/damage] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: gaze-single, snare, condition-payoff, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, delayed-brand, curse-debt, zone-seed, reveal, lay-on-hands, aggro-curse, self-invisibility, rally)
[reskin] word match declined by the call: herd — the key word does not mean the mechanic here
[reskin] fit declined: "Smoldering Rib Brand" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: herd left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "an archlich enthroned on a sun of bone" heads on the Lich and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Leaden Touch" EV 3.4 vs floor 13 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Leaden Touch" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The throne is the archlich's true body: its ribcage spreads outward as the hollow bone sun around it, and whenever the archlich suffers harm, cracked segments of that shell flood the light with rot. Every creature near the archlich feels its warmth sour into creeping cold, and the more wounded the archlich becomes, the wider the sickly halo around its seat burns." [trait/always/damage] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] word match declined by the call: heated-body, resonant-body, noxious-aura — the key word does not mean the mechanic here
[reskin] signature template (trait): bloodied-burst -> Traits/"Sour Halo" ("When the wounded archlich's cracked bone-sun shell is broken in a fight, it floo [verb: wounded:idea, crack:idea]")
[reskin] weapons answered: Bone Shard = none; Grasp = none
[reskin] chassis nova: "Rib-Vault Tide (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] speed by concept: dropped Fly 30 ft. (hover) — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon attack: "Bone Shard" -> "Eldritch Burst" — the Lich's own row
[reskin] rider folded: "Grasp" keeps its budget — the chassis's rider half (10) folds into the base; the Lich pays no damage rider of its own (its "and the target has the Paral…" costs no damage)
[reskin] print canon attack: "Grasp" -> "Paralyzing Touch" — the Lich's own row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] resistances derived: Cold
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Rib-Vault Tide (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Spellcasting to cast *Bestow Curse*.
[reskin] audit rewrite blocked — "Frightening Gaze" is engine-authored chassis text
[reskin] audit rename: "Sour Halo" -> "Deathly Burst"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Ancient Gold Dragon — in the run

**Concept:** name: Ancient Gold Dragon | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ancient Gold Dragon | 24 (2014) | dragon-22 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 26 / off 25 → 25.5; sustained 168 (3 × Rend + legendary Pounce); nova Fire Breath 78; dmg 168

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
Fire Breath (Recharge 5-6): Each creature in a 90-foot cone must make a DC 24 Dexterity saving throw, taking 78 (12d12) fire damage on a failed save, or half as much damage on a successful one.
Spellcasting: The gold dragon casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 24, +16 to hit with spell attacks):

At will: detect magic, guiding bolt, shapechange
1/day each: flame strike, word of recall, zone of truth
Weakening Breath: Each creature that isn't currently affected by this breath in a 90-foot cone must make a DC 24 Strength saving throw. On a failed save, the target has disadvantage on Strength-based d20 tests and subtracts 5 (1d10) from its damage rolls. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.
Legendary Actions

The gold dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The gold dragon regains spent legendary actions at the start of its turn.

Banish: One creature the gold dragon can see within 120 feet must make a DC 24 Charisma saving throw, taking 24 (7d6) force damage on a failed save, and the target is incapacitated and is transported to a harmless demiplane until the start of the gold dragon's next turn, at which point it reappears in an unoccupied space of the gold dragon's choice within 120 feet of the gold dragon. On a failed save, the gold dragon can't take this action again until the start of its next turn.
Guiding Light: The gold dragon uses Spellcasting to cast guiding bolt (cast at 4th level).
Pounce: The gold dragon moves up to half its speed, and it makes one Rend attack.
```

**Where each row came from**

- Traits/Legendary Resistance — the chassis
- Traits/Amphibious — print's own row
- Actions/Multiattack — the chassis
- Actions/Rend — print's row, renamed
- Actions/Fire Breath — print's own row
- Actions/Spellcasting — print's own row
- Actions/Weakening Breath — print's own row
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Banish — print's own row
- Legendary Actions/Guiding Light — print's own row
- Legendary Actions/Pounce — print's own row

**Engine trace**

```
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | dragon: ✓ ("Ancient Gold Dragon") | dragon: key "dragon" (class body)
[concept] hints: dragon→body ✓ ("Ancient Gold Dragon — a true dragon body")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/terror mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Ancient Gold Dragon"
[concept] mechanics: breath
[concept] signature elements: molten gold body [body] | searing fire breath [behavior] | frightful presence [aura]
[concept] identity: The Ancient Gold Dragon opens a fight by hovering above the battlefield on vast, molten-gold wings, exhaling a cone of searing flame that melts armor and stone alike before descending to crush survivors in its claws. Every round thereafter it alternates between sweeping fiery breath and devastating melee strikes, its body of fused, glowing gold flowing and re-forming around wounds as it presses an unrelenting assault. When bloodied it does not flee but ascends in a spiral of radiant heat, roaring its frightful presence to scatter lesser foes before diving back in to toy with any who dare stand.
[concept] lore: Forged in the heart of a dying star and drawn to mortal realms by the scent of crumbling empires, the Ancient Gold Dragon hoards not coins but the last embers of fallen civilizations, which it swallows whole to keep its molten heart burning.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] print canon defenses: HP 487 -> 546, AC 20 -> 22 — the Ancient Gold Dragon's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 14, CON 29, INT 18, WIS 17, CHA 28 — the Ancient Gold Dragon's at its own CR; attack +11 -> +17, DC 24 (print's)
[reskin] donor: dragon-22 -> CR 24
[reskin] print canon: "Ancient Gold Dragon" is a print creature — the seats stand down; print's own rows are the composition
[reskin] name_element answered: Molten Breath = literal
[reskin] repair round 1: 1 defect(s) — name "Rend and Claw" promises a claw but the row makes a Talons attack — name the delegation honestly, or without anatomy
[reskin] inline by rule: "the gold dragon" — the call answered "the gold dragon" (kind), which the name does not support
[reskin] inline form: "the gold dragon" — the model's own reading of the name
[reskin] spell DC coherence: DC 21 -> 24 off Charisma 28 (print's array stays)
[reskin] save dc derived: DC 21 -> 24 (8 + PB 7 + Charisma's 9) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Ancient Gold Dragon" -> has (descriptive), head
[reskin] weapons answered: Talons = none
[reskin] chassis nova: "Molten Breath (Recharge 5-6)" — the dragon-22's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes fly, swim — the Ancient Gold Dragon's
[reskin] print canon senses: "blindsight 60 ft., darkvision 120 ft." — the Ancient Gold Dragon's
[reskin] speed by concept: added Swim 40 ft. — the concept's movement set decides
[reskin] print canon alignment: Neutral -> Lawful Good — the Ancient Gold Dragon's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Draconic, Common" -> "Common, Draconic" — the Ancient Gold Dragon's
[reskin] print canon attack: "Talons" -> "Rend" — the Ancient Gold Dragon's own row
[reskin] print canon multiattack: "The gold dragon makes three Rend attacks. It can replace one attack with a use of (A) Spellcasting to cast *Guiding Bolt* (level 4 version) or (B) Weakening Breath." — the Ancient Gold Dragon's own
[reskin] element immunity: Fire (merged into the header write)
[reskin] dragon spell DC derived: 24 (8 + PB + Cha mod — the breath keeps the card DC)
[reskin] dragon mental save DC derived: "Roaring Fright" -> 24 (the Frightful Presence class keys to Charisma)
[reskin] immunities stamped for type: Dragon -> Fire
[reskin] print canon trait: Amphibious — "Ancient Gold Dragon" is the Ancient Gold Dragon (print's own row)
[reskin] print canon legendary: Banish, Guiding Light, Pounce — the Ancient Gold Dragon's own kit stands where the chassis's stood
[reskin] print canon nova: "Molten Breath (Recharge 5-6)" -> "Fire Breath (Recharge 5-6)" — one breath: the chassis nova at this sheet's CR carries the Ancient Gold Dragon's name; print's own row stays out
[reskin] print canon row: Actions/Weakening Breath — the Ancient Gold Dragon's own
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Goblin Boss — in the run

**Concept:** name: Goblin Boss | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Boss | 1 (2014) | defender-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

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

Athletics +2, Perception +1

Saving Throws: 

CON +2

Senses: 

darkvision 60 ft., passive Perception 11

Languages: 

Common, Goblin

Challenge

1 (200 XP)

Proficiency Bonus:

+2

Nimble Escape (Bonus Action). The goblin takes the Disengage or Hide action.

Actions
Multiattack: The goblin makes two Scimitar attacks.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had Advantage.
```

**Where each row came from**

- Actions/Multiattack — print's own row
- Actions/Scimitar — weapon scimitar
- Bonus Actions/Nimble Escape — print's own row

**Engine trace**

```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs?t=1792202639880:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792345364080:1394:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792345364080:1233:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792345364080:656:5)
!! [ENRICHMENT] Failed to enrich Owlbear: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs?t=1792202639880:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792345364080:1394:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792345364080:1233:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792345364080:656:5)
[route] defender-leader type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("Goblin Boss") | defender-leader: no line key in the words — the model's read of its quote
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] resolve: archetype=defender type=Humanoid themes=armed/terror mind=sapient style=leader energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: barked orders that stiffen the warren [behavior] | a coward's bolt-hole at its back [behavior] | tatterhide and rank warren stink [body]
[concept] identity: A goblin boss opens by barking orders from the back rank, keeping its skittering kin between itself and danger while it jabs with a jagged blade whenever a foe closes. Each round it repositions to stay near at least one ally, using a snapping parry to turn a blow aside and shoving the nearest goblin into the attacker's path. Cornered and bloodied, it squeals for its underlings to cover its retreat and flees down a bolt-hole — it rules by dread of what its kin fear, and fights only what it can win.
[concept] lore: A goblin boss is the meanest survivor of a scrapping warren, who holds its rank by being the loudest and fastest to punish dissent and now wants a bigger fear-name to ransom, raid, and hoard under.
[reskin] print canon route: "Goblin Boss" is the Goblin Boss — the leader seat stands down for the plain line
[reskin] print canon defenses: HP 26 -> 21, AC 15 -> 17 — the Goblin Boss's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 17 (chain shirt, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 10, DEX 15, CON 10, INT 10, WIS 8, CHA 10 — the Goblin Boss's at its own CR; attack +3 -> +4, DC 12 (print's)
[reskin] donor: defender-1 -> CR 1
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "Goblin Boss" is a print creature — the seats stand down; print's own rows are the composition
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] inline declared: "Skab" — the call's own answer (person), built from the name
[reskin] inline form: "Skab" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 12 (8 + PB 2 + the sheet's best 2) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Goblin Boss" -> has (descriptive), head
[reskin] weapons answered: Scimitar = scimitar
[reskin] print canon speed: modes walk only — the Goblin Boss's
[reskin] print canon senses: "darkvision 60 ft." — the Goblin Boss's
[reskin] print canon type: Humanoid stays — the Goblin Boss is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon alignment: Neutral Evil -> Chaotic Neutral — the Goblin Boss's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon name: "Skab Snagtooth" -> "Goblin Boss" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] inline follows the print name: "Skab" -> "the goblin boss"
[reskin] print canon multiattack: "The goblin makes two attacks, using Scimitar or Shortbow in any combination." — the Goblin Boss's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Boss's own
[reskin] multiattack normalised: "The goblin makes two Scimitar attacks."
!! [reskin] 2014 conversion failed — the deterministic shape ships with 2024 phrasing: Failed to generate a valid response. Please try again later.
```


---


### Black-Iron Warden — in the run

**Concept:** a sentinel of black iron, AC 20, Huge, speed 20 feet

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Black-Iron Warden | 11 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 9 / off 9 → 9; sustained 62 (2 × Iron Fist); nova none; dmg 62

```
Black-Iron Warden
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

Retaliatory Backhand (Bonus Action). One creature within 5 feet that hit the warden with an attack roll since the end of the warden's last turn takes 13 (3d8) bludgeoning damage.

Actions
Multiattack: The warden makes two Iron Fist attacks.
Iron Fist: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 31 (6d8 + 4) bludgeoning damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Iron Fist — the chassis
- Bonus Actions/Retaliatory Backhand — library seed own-turn-punisher

**Engine trace**

```
[route] defender type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-warden: ✓ ("a sentinel of black iron") | defender-warden -> defender: the concept's VERB outranks the noun (key "sentinel", class verb) | defender: key "sentinel" (class verb)
[concept] hints: warden→style ✓ ("a sentinel of black iron")
[concept] resolve: archetype=defender type=Construct themes=forged/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: riveted black-iron plating [body] | shield wall that holds the line [object] | punishes anyone who slips past [behavior]
[concept] identity: The Sentinel of Black Iron is a towering construct of riveted iron plates that anchors itself in place and grinds forward at a deliberate, unstoppable pace. It opens a fight by presenting its shield and absorbing blows, then punishes any foe that tries to slip past its reach with brutal, measured strikes. When bloodied it does not retreat; it locks down and fights to the last bolt, sealed to its charge.
[concept] lore: Forged in some collapsed foundry as a tireless warden, the black-iron sentinel still holds a gate that no longer exists, crushing anything that dares cross its patch of rust.
[reskin] donor: defender-5 -> CR 11
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] ranged row off: "Hybrid Attack" keeps its melee half only
[reskin] repair round 1: 1 defect(s) — rename for "Melee Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] inline declared: "the warden" — the call's own answer (kind), built from the name
[reskin] inline form: "the warden" — the model's own reading of the name
[reskin] save dc derived: DC 17 -> 16 (8 + PB 4 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a sentinel of black iron" -> has (descriptive), head | "AC 20" -> has (header) | "Huge" -> has (header) | "speed 20 feet" -> has (header)
[reskin] extraction: 1 of 4 model clauses quote nothing the user typed and leave the record ("AC 20")
[reskin] signature idea (action): "When a foe inside the warden's reach tries to slip away from it, the warden reads the movement and drives a riveted gauntlet into their back before they clear its arc, catching them mid-flight. A creature that stays and fights never eats this blow; only those who turn their backs to flee earn it." [reaction/on_being_hit/damage] — menu: riposte (+ shelf: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When a foe inside the warden's reach tries to slip away from it, the warden reads the movement and drives a riveted gauntlet into their back before they clear its arc, catching them mid-flight. A creature that stays and fights never eats this blow; only those who turn their backs to flee earn it." [reaction/on_being_hit/damage] — the model found no template that holds it (offered: riposte, herd, own-turn-punisher)
[reskin] value check: "Answering Sting" EV 7.2 vs floor 5.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's AC 17 at CR 11, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The warden's black-iron plates are riveted to catch and hold on to whatever strikes them — a weapon or limb that bites into the iron is dragged in and wrenched, and the warden's counterstrikes swat it aside more surely for the trouble. The harder something hits it head-on, the more firmly it is pinned to the iron." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — heated-body, resonant-body (iron)
[reskin] word match declined by the call: heated-body, resonant-body — the key word does not mean the mechanic here
[reskin] signature miss: trait — "The warden's black-iron plates are riveted to catch and hold on to whatever strikes them — a weapon or limb that bites into the iron is dragged in and wrenched, and the warden's counterstrikes swat it aside more surely for the trouble. The harder something hits it head-on, the more firmly it is pinned to the iron." [trait/on_being_hit/condition] — the model picked "weapon-lodge" (no verb, and it quotes nothing the GM typed) over a concept-verb template (heated-body, resonant-body)
[reskin] weapons answered: Shield Bash = none; Iron Fist = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] audit rename: "Answering Sting" -> "Retaliatory Backhand"
[reskin] dead name still carried — "Riveted Gauntlet Slam" names a row that is still on the sheet; no sweep
[reskin] identical row leaves: Actions/"Riveted Gauntlet Slam" reads word for word as Actions/"Iron Fist" — one ability, one name
[reskin] header clause: speed 30 ft. -> 20 ft. — the user typed 20 feet
[reskin] multiattack re-read: "Riveted Gauntlet Slam" is not on this sheet, so the combination now reads "The warden makes two Iron Fist attacks."
!! [reskin] 2014 conversion failed — the deterministic shape ships with 2024 phrasing: Failed to generate a valid response. Please try again later.
```


---


### Ilvareth Dusksong — in the run

**Concept:** name: Ilvareth Dusksong | An elf archmage who bends shadow and steps between places.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ilvareth Dusksong | 12 (2014) | caster-12 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Frost Touch
- read: def 9 / off 11 → 10; sustained 72 (4 × Frost Touch); nova none; dmg 72

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

Damage Resistances: 

cold

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

Misty Step (3/Day). As a bonus action, Ilvareth casts misty step, using the same spellcasting ability as Spellcasting.
Protective Magic (3/Day) (Reaction). When Ilvareth is hit by an attack roll, Ilvareth casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Ilvareth makes four Frost Touch attacks.
Frost Touch: Melee Spell Attack: +9 to hit, reach 5 ft., one target. Hit: 18 (3d8 + 5) cold damage.
Spellcasting: Ilvareth casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 17): -

At will: detect magic, detect thoughts, disguise self, invisibility, light, mage armor, mage hand, prestidigitation

2/day each: fly, lightning bolt

1/day each: cone of cold, mind blank, scrying, teleport
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Frost Touch — the chassis
- Actions/Spellcasting — print's own row
- Reactions/Protective Magic — mage kit; the GM's clause "Ilvareth Dusksong — An elf archmage"
- Bonus Actions/Misty Step — mage kit; the GM's clause "bends shadow and steps between places"

**Engine trace**

```
[route] caster (artillery) type=Humanoid mechanics=teleport — casts: implied by the kind — "archmage who bends shadow and steps betw" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("archmage who bends shadow") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid themes=arcane/uncanny mind=sapient style=— energy=Force mix=energy identity=✓ lore=✓
[concept] name: provided "Ilvareth Dusksong"
[concept] mechanics: teleport
[concept] signature elements: stepping between shadowed places [behavior] | shadow-woven elven archmage [body] | caustic, theatrical taunting [behavior]
[concept] identity: Ilvareth Dusksong opens from the edge of the fight — a shadow-step puts him behind cover or atop a ledge, and a bolt of force or cold flame answers the first attacker before they finish their charge. Each round he shadowslips away from anyone who closes, leaving a shadow-addled echo in his place, and punishes the bold with gathered-shadow blasts from a distance he never lets them shorten. Under pressure he grows colder and more theatrical, trading taunts through the dark and refusing to die in the open — if truly broken, he retreats into shadow to fight another dusk rather than sell his life cheaply.
[concept] lore: Ilvareth Dusksong was once the court archmage of a sunlit elven spire, and when it burned he slipped whole into the shadow between places, where he now gathers echoes of that city and lures the curious into the dark to hear him unmake it.
[reskin] energy withheld: Force on a Humanoid with no Force in the concept's own words (fixed phrases read first)
[reskin] print canon defenses: HP 168 -> 170, AC 16 -> 17 — the Archmage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 10, DEX 14, CON 12, INT 20, WIS 15, CHA 16 — the Archmage's at its own CR; attack +8 -> +9, DC 17 (print's)
[reskin] donor: caster-12 -> CR 12
[reskin] print canon: "Ilvareth Dusksong — An elf archmage who bends shadow and steps between places." heads on the Archmage — print's rows ride along; the seat stays
[reskin] repair round 1: 2 defect(s) — name "Shadow Bolt" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade | "Shadow Bolt" deals Cold on a Humanoid whose concept names no Cold — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "Ilvareth Dusksong — An elf archmage": Misty Step (3/Day) (Mage/Misty Step)
[reskin] proper noun: "Ilvareth Dusksong" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Ilvareth" — the call's own answer (person), built from the name
[reskin] inline form: "Ilvareth" — the model's own reading of the name
[reskin] spell DC coherence: DC 18 -> 17 off Intelligence 20 (print's array stays)
[reskin] save dc derived: DC 18 -> 17 (8 + PB 4 + Intelligence's 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Ilvareth Dusksong — An elf archmage" -> has (descriptive), head | "bends shadow and steps between places" -> has (mechanical) [asked: movement]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Ilvareth speaks to his enemies as though they were already dead, naming their fear aloud in a voice that carries through the dark. Whenever he taunts something, it hears the burning spire cracking behind his words, and the shadow around it grows hungry and close. Those who cannot shake the sound find every step heavy and every escape longer than it should be, as though the dark itself were holding" [action/save/condition] — menu: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — phase-slip (step, shadow)
[reskin] word match declined by the call: phase-slip, ground-burst, pacify — the key word does not mean the mechanic here
[reskin] fit declined: "Binding Mark" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: phase-slip, pacify left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "Ilvareth Dusksong — An elf archmage who bends shadow and steps between places." heads on the Archmage and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Disarming Twist" EV 0 vs floor 9.4 (one attack of 4) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Ilvareth is never truly where the blow lands; the shadow he casts is a half-real echo of him, and wounds meant for him sometimes pass through the echo instead. When something strikes him and the dark is near, it may find only cold air and a fading silhouette, and Ilvareth has already stepped a breath away." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] word match declined by the call: bloodied-burst, bloodied-fury, absorption, resonant-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Ilvareth is never truly where the blow lands; the shadow he casts is a half-real echo of him, and wounds meant for him sometimes pass through the echo instead. When something strikes him and the dark is near, it may find only cold air and a fading silhouette, and Ilvareth has already stepped a breath away." [trait/on_being_hit/movement] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, bloodied-fury)
[reskin] weapons answered: Shadow Bolt = none
[reskin] weapon declined: "Shadow Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Shadow Bolt" — a launcher, never thrown, range 80/320
[reskin] print canon alignment: Neutral Evil -> Neutral — the Archmage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Elvish, Undercommon" -> "Common plus five other languages, Elvish, Undercommon" — the Archmage's plus the concept's Elvish, Undercommon
[reskin] print canon multiattack: "Ilvareth makes four Arcane Burst attacks." — the Archmage's own
[reskin] ranged row narrowed, not removed: "Shadow Bolt" is the only attack on the sheet — the Archmage carries no ranged row, so the row becomes melee at reach 5 rather than leaving a sheet with nothing to attack with
[reskin] attack name by anatomy: "Shadow Bolt" -> "Slam" — bolt is a ranged noun on a melee row
[reskin] print canon defenses: immunities none -> Psychic; Charmed ((with Mind Blank)) — the Archmage's own header lines
[reskin] resistances derived: Cold
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 16" -> "Passive Perception 16")
audit finding names unknown entry, dropped: Immunities
audit finding names unknown entry, dropped: Languages
[reskin] audit rename: "Slam" -> "Frost Touch"
[reskin] multiattack re-read — "Frost Touch" joins the combination; "Ilvareth makes four attacks, using Arcane Burst or Frost Touch in any combination."
[reskin] multiattack re-read: "Arcane Burst" is not on this sheet, so the combination now reads "Ilvareth makes four Frost Touch attacks."
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Reliquary Vault-Ooze — in the run

**Concept:** a cathedral-vault ooze that digests reliquaries

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Reliquary Vault-Ooze | 9 (2014) | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Spider Climb
- **dropped clause:** "digests reliquaries"
- read: def 9 / off 8 → 8.5; sustained 54 (2 × Pseudopod); nova Acid Burst 27; dmg 54

```
Reliquary Vault-Ooze
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

Acid Burst. The first time the vault-ooze has half of its hit points or fewer in a fight, it releases a burst. Each creature within 15 feet of the vault-ooze must make a DC 15 Constitution saving throw, taking 27 (6d8) acid damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also poisoned until the end of its next turn.
Amorphous. The vault-ooze can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form. A creature that touches the vault-ooze or hits it with a melee attack while within 5 feet of it takes 9 (2d8) acid damage.
Spider Climb. The vault-ooze can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The vault-ooze makes two Pseudopod attacks.
Pseudopod: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 27 (7d6 + 3) acid damage. Nonmagical armor worn by the target takes a -1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10. The penalty can be removed by casting the mending spell on the armor.
```

**Where each row came from**

- Traits/Acid Burst — template bloodied-burst; library draw (seed unstamped); binds the GM's words: wounded
- Traits/Amorphous — the chassis
- Traits/Corrosive Form — the chassis
- Traits/Spider Climb — the chassis
- Actions/Multiattack — the chassis
- Actions/Pseudopod — the chassis

**Engine trace**

```
[route] ooze type=Ooze mechanics=grapple — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "digests reliquaries" | ooze: ✓ ("a cathedral-vault ooze") | ooze: no line key in the words — the model's read of its quote
[concept] hints: ooze→body ✓ ("cathedral-vault ooze") | engulf→mechanics ✓ ("digests reliquaries")
[concept] resolve: archetype=ooze type=Ooze themes=amorphous/devouring mind=mindless style=— energy=Acid mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple
[concept] signature elements: dissolves reliquaries and holy vessels [behavior] | tar body shot through with half-digested gold leaf and bone [body] | steals the sacred weight of consecrated places [aura]
[concept] identity: The vault-ooze seeps across the cathedral floor, oillike tar shot through with a thousand half-digested gold-leaf and bone fragments, spreading to engulf any reliquary it can reach. Every round it presses forward, forming temporary pseudopods of tar that clamp and drag sacred vessels inward, staying silent and unhurried as it consumes. Under pressure it does not flee — it collapses flat, bleeds into the cracks, then reforms behind its attacker with the patience of a thing that has outlasted empire and god.
[concept] lore: Born in the dripping dark beneath a drowned cathedral, its tar became hungry after swallowing a thousand consecrated relics, and it now wanders the ruined nave seeking one last holy object to finish the meal.
[reskin] body type: ooze — the body outranks the role (recorded: ooze)
[reskin] print canon array: STR 16, DEX 6, CON 16, INT 1, WIS 6, CHA 2 — the Gray Ooze's, STR fitted to +7
[reskin] donor: ooze-9 -> CR 9 (invented — no printed peer)
[reskin] row gated out: Engulf (engulf) — the concept did not claim this mechanic
[reskin] print canon: "a cathedral-vault ooze that digests reliquaries" heads on the Gray Ooze — print's rows ride along; the seat stays
[reskin] alignment by body: Neutral -> Unaligned — a Ooze at INT 1 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] inline declared: "the vault-ooze" — the call's own answer (kind), built from the name
[reskin] inline form: "the vault-ooze" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "silent" quotes nothing the user typed
[reskin] lacks refused: "no haste" quotes nothing the user typed
[reskin] clauses: "a cathedral-vault ooze" -> has (descriptive), head | "digests reliquaries" -> has (descriptive)
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, push-prone, herd, thrown-burst-seed, drain, zone-seed, wind-up, blighted-ground, delayed-brand, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The ooze chooses a holy vessel, shrine, or blessed object it can see and begins digesting it; the relic visibly blackens, cracks, and sheds its consecration, and for as long as the ooze keeps feeding on it, anyone who wishes to use that object's holy power feels it answered only faintly, if at all. If the relic is destroyed or the ooze is driven off it, the suffusion ends and whatever was lost of " [action/always/resource] — menu: trample, leap, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew (+ shelf: rampage, patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The ooze chooses a holy vessel, shrine, or blessed object it can see and begins digesting it; the relic visibly blackens, cracks, and sheds its consecration, and for as long as the ooze keeps feeding on it, anyone who wishes to use that object's holy power feels it answered only faintly, if at all. If the relic is destroyed or the ooze is driven off it, the suffusion ends and whatever was lost of " [action/always/resource] — the model found no template that holds it (offered: trample, leap, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew)
[reskin] signature idea (trait): "Its tar is thick with half-digested gold leaf, bone splinters, and other consecrated debris, and when it is wounded those fragments come spilling out around it — anyone close enough to be splashed by the leak is cut and sickened by the sacred metal and marrow. The more it has recently eaten of a holy thing, the worse the spill burns." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — aberrant-ground (ooze)
[reskin] word match declined by the call: adhesive, terrain-walk, uncanny-sense, aberrant-ground — the key word does not mean the mechanic here
[reskin] signature template (trait): bloodied-burst -> Traits/"Reliquary Spill" ("When wounded it spills consecrated debris around it that cuts and sickens nearby [verb: wounded:idea]")
[reskin] weapons answered: Pseudopod = none; Engulfing Clamp = none
[reskin] print canon size: Large -> Medium — the Gray Ooze's
[reskin] print canon speed: 20 ft. -> 10 ft. — the Gray Ooze's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 10 ft. — the Gray Ooze's own
[reskin] languages held: None stands — INT 1 on a Ooze speaks nothing, whatever the mind read said
[reskin] element immunity: Acid (merged into the header write)
[reskin] immunities stamped for type: Ooze -> Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained
[reskin] print canon defenses: immunities Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained -> Blinded, Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained; resistances none -> Acid, Cold, Fire — the Gray Ooze's own header lines
audit finding below confidence gate: Reliquary Spill The save entry omits the trigger's standard wording but, more importantly, the Prose uses the 2014-format structure implied by 'Saving Throw' phrasing rather than 2014's 'must succeed on a DC X ... saving throw or' — however, the real defect is that the failure clause applies a condition with no stated save at the end of the turn; the Poisoned condition ends at the end of the target's next turn with no escape clause, but this is not a defect under the calibration. No mechanical defect here.
[reskin] audit rename: "Reliquary Spill" -> "Acid Burst"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Meshrin — in the run

**Concept:** name: Meshrin | Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages. Give him a frightening roar. AC 16, 120 hit points.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | skirmisher-8-hurler | ok | ok | SOFT: lint:hp-formula | ok | ok | ok | ok | ok | ok |

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
Multiattack: Meshrin makes three attacks, using Greataxe or Javelin. It can replace one attack with a use of Skewer.
Greataxe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (3d8 + 4) slashing damage.
Javelin: Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 17 (3d8 + 4) piercing damage. Immediately after the attack, a javelin returns to Meshrin's grasp.
Skewer: One creature within 30 feet that is prone must make a DC 15 Strength saving throw, taking 11 (2d10) piercing damage on a failed save, or half as much damage on a successful one.
Frightening Roar (Recharge 5-6): Each creature within 30 feet of Meshrin must succeed on a DC 15 Wisdom saving throw or be frightened of Meshrin until the end of its next turn.
```

**Where each row came from**

- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "He is a barbarian who rages"
- Traits/Hold Breath — lizardfolk kit; the GM's clause "Meshrin — Large lizard folk"
- Traits/Great Weapon Master — a declared feature; the GM's clause "Wields a greataxe two-handed"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "Meshrin — Large lizard folk"
- Actions/Multiattack — the chassis
- Actions/Greataxe — authored for this sheet; a named part; the GM's clause "Wields a greataxe two-handed"; weapon greataxe
- Actions/Javelin — weapon javelin
- Actions/Skewer — library seed exploiter
- Actions/Frightening Roar — authored for this sheet; the GM's clause "Give him a frightening roar"
- Bonus Actions/Fleet Agility — the chassis

**Engine trace**

```
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("Wields a greataxe two-handed") | brute -> skirmisher-hurler: the concept's VERB outranks the noun (key "throw", class verb) | skirmisher-hurler: key "throw" (class verb)
[concept] hints: hurler→style ✓ ("javelin for the throw")
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/terror mind=sapient style=hurler energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Meshrin"
[concept] mechanics: thrown-weapon
[concept] signature elements: enormous two-handed greataxe [object] | thrown javelin before closing in [behavior] | rage that ignores pain and backs down from nothing [behavior]
[concept] identity: Meshrin opens by hurling a javelin as he closes, then plants his feet and carves with the greataxe in wide two-handed arcs while his rage soaks up punishment. Every few rounds he throws back his head and lets out a bone-shaking roar that rattles the nerve of anyone in reach, and if his rage is on him he does not care about fleeing. He is a killing calm under a screaming hide, and he fights until the axe is dull or he is down to his knees.
[concept] lore: Meshrin is a river-marsh lizardfolk war-leader who keeps the skulls of dead raiders nailed to the mangrove stakes of his home water, and he roars to summon his warband and to tell the swamp-gods that meat is coming.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] nova capped: "Hurled Burst" 49 → 44 (the chassis nova obeys the cap: 44 at CR 8)
[reskin] donor: skirmisher-8-hurler -> CR 8 (invented — no printed peer)
[reskin] repair round 1: 1 defect(s) — "Screaming Hide" deals Thunder on a Humanoid whose concept names no Thunder — a name is not a warrant; use a physical type
[reskin] named parts: Greataxe (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] row evicted for the cap: Traits/"Warrior's Stride" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "Meshrin — Large lizard folk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: rampage — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: barbarian — "He is a barbarian who rages": Bloodied Frenzy (Berserker/Bloodied Frenzy)
[reskin] proper noun: "Meshrin" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Meshrin" — the call's own answer (person), built from the name
[reskin] inline form: "Meshrin" — the model's own reading of the name
[reskin] energy withheld on a base row: "Screaming Hide" Thunder -> Bludgeoning (the body's physical type; a Humanoid deals no Thunder its concept never gave it)
[reskin] save dc derived: DC 16 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] final price: the round ran 39 against the card's 54 — the attack rows re-solve at 138% (3 attacks on an authored sheet, under the card)
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered limit "at_will" for "Wields a greataxe two-handed" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "a javelin for the throw" but offered no quote
[reskin] clauses: "Meshrin — Large lizard folk" -> has (header) | "30 feet of movement" -> has (header) | "Wields a greataxe two-handed" -> has (mechanical) [asked: attack] | "a javelin for the throw" -> has (mechanical) [asked: attack] | "He is a barbarian who rages" -> has (descriptive) | "Give him a frightening roar" -> has (mechanical) [asked: save_area] | "AC 16" -> has (header) | "120 hit points" -> has (header)
[reskin] extraction: 1 of 9 model clauses quote nothing the user typed and leave the record ("AC 16")
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Meshrin throws back his head and lets out the bone-shaking roar that tells the swamp-gods meat is coming. Every enemy near him hears it and cannot help flinching — they freeze up for a moment and cannot bring themselves to close in, as if the sound has rooted them where they stand. It works once, and then his throat needs time before it can call again." [action/save/condition] — menu: snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — throw-retrieve (javelin)
[reskin] word match declined by the call: lure, snare-bolt, snare — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown throw-retrieve, which the GM's words keyed
[reskin] key match declined: action — "throw-retrieve" was ranked first on the call's own menu for javelin, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Meshrin throws back his head and lets out the bone-shaking roar that tells the swamp-gods meat is coming. Every enemy near him hears it and cannot help flinching — they freeze up for a moment and cannot bring themselves to close in, as if the sound has rooted them where they stand. It works once, and then his throat needs time before it can call again." [action/save/condition] — the model found no template that holds it (offered: throw-retrieve, snare, condition-payoff, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter)
[reskin] fallback respects the call: throw-retrieve left the shelf — the call declined it for this sheet
[reskin] fallback skipped: thrown-burst-seed (the sheet cannot render it)
[reskin] value check: "Opportunist's Lash" EV 8.5 vs floor 7.3 (one attack of 3) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When Meshrin is wounded and raging, the killing calm takes him: the axe comes around in wider and wilder arcs, and anything that steps inside his reach to exploit the gap finds the greataxe already swinging to meet it. Pain only makes him swing harder." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (rage)
[reskin] word match declined by the call: bloodied-fury — the key word does not mean the mechanic here
[reskin] trait declined: "Terrifying Roar" — bound only on the idea's own words (wounded:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] feature name: "Opportunist's Lash" -> "Trip Attack" — the card that is this feature takes its name
[reskin] repair: 1 clause(s) with no row — "Give him a frightening roar"; one targeted call with the sheet as context
[reskin] slot yields: nova — the chassis's "Skull-Splitter (Recharge 5-6)" leaves; "Frightening Roar (Recharge 5-6)" holds the slot
[reskin] repaired sheet: 1 attack row(s), 1 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Greataxe = greataxe; Javelin = javelin; Skull-Splitter = javelin; Screaming Hide = none
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] chassis nova: "Frightening Roar (Recharge 5-6)" — the skirmisher-8-hurler's own nova row; geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] multiattack replacement clause: It can replace one attack with a use of Trip Attack.
audit finding below confidence gate: Javelin The javelin-return rider is a novel nonstandard clause with no defined interaction with the attack roll or with Disarm/grapple states, forcing the GM to improvise whether the weapon is available, lost, or recoverable.
[reskin] audit rename: "Trip Attack" -> "Skewer"
[reskin] audit rename blocked — "Great Weapon Master" is the user's own part name, a kit feature's real name, or print's own row
[reskin] user-set: HP 136 -> 120 — a declared field (Resolution 3)
[reskin] multiattack re-read — "Javelin" joins the combination; "Meshrin makes three attacks, using Greataxe or Javelin in any combination. It can replace "
[reskin] species kit: Swim 30 ft. — the lizardfolk's
[reskin] species kit: Draconic — the lizardfolk's own
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


---

## Review batch — features-2026-10-18-2026-10-18T15-49-53

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Scent-Stalker | 5 | 2024 | lurker-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: alignment-fit | FAIL (1) | 2/2 | 3/4 |
| Drowned Keeper | 5 | 2024 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/7 |
| Barrow Wight | 4 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Gale-Wrack | 6 (2014) | 2014 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/7 |
| Pip Thistlewisp | 3 (2014) | 2014 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 4/5 |
| Druid | 2 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Ember Almoner | 4 (2014) | 2014 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (2) | 2/2 | 5/5 |
| Old Master Vellum | 3 | 2024 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 1/1 |
| Skeleton | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Champion of the Sands | 4 (2014) | 2014 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 1/2 |
| Ogre | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Mummy | 3 | 2024 | defender-3 | SOFT: hit-die | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/2 |
| Sexton of the Flooded Nave | 4 | 2024 | lurker-1-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/8 |
| Widow Alderkin | 3 | 2024 | lurker-1-phantom | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 5/5 |
| Stone That Walks | 17 (2014) | 2014 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 6/9 |
| Mire-Gorge Troll | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |
| Scarred Linebreaker | 8 (2014) | 2014 | brute-5 | SOFT: duplicate-mechanic | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (2) | 1/1 | 3/4 |
| Iron Inquisitor | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |
| Coil-Bound Keeper | 7 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 2/3 |
| Vice-Rock Griever | 6 (2014) | 2014 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 0/7 |
| Ilyn Surestrike | 5 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | SOFT: ko-at-will, ko-at-will, rider-no-save | ok | ok | ok | ok | ok | soft (2) | 1/1 | 3/6 |
| Brine-Priest of the Congregation | 6 | 2024 | caster-2-warpriest | ok | SOFT: band | ok | SOFT: rider-no-save | ok | ok | ok | ok | ok | soft (2) | 1/2 | 6/6 |
| Hose-Fouled Diver | 4 (2014) | 2014 | lurker-1-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Dame Oriel | 5 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Grave-Pit Swarm | 4 (2014) | 2014 | swarm-3 | FAIL: lint:attack-mod-coherence | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 2/2 |
| Marrow Quill | 6 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 5/5 |
| Ssith | 4 | 2024 | lurker-2 | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | ok | soft (1) | 9/16 | 7/7 |
| Grik | 1 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/2 |
| Tunnel Cave Troll | 3 (2014) | 2014 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/3 |
| Thurivald | 9 | 2024 | skirmisher-8-hurler | ok | user-set: AC 17, HP 180 · reads CR 9 | ok | ok | ok | ok | ok | ok | ok | clean | 6/7 | 7/7 |

**Dropped 14 of 61 user clauses** (coverage 77%); concept share 79% (109/138 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- lurker-5 / reader: 1
- swarm-3 / derivation: 1



---


### Stone That Walks — highest CR

**Concept:** a mountain that has begun to walk and does not know why

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Stone That Walks | 17 (2014) | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 21, 4 over; the HP axis pulls the read to 17.5
- **dropped clause:** "has begun to walk"
- read: def 14 / off 21 → 17.5; sustained 150 (2 × Fist + legendary Grind Forward); nova Landslide 72; dmg 150

```
Stone That Walks
Gargantuan elemental, unaligned
Armor Class

19 (natural armor)

Hit Points: 

263 (17d20 + 85)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

8 (-1)

	

20 (+5)

	

6 (-2)

	

10 (+0)

	

4 (-3)

Skills: 

Athletics +10, Perception +6

Saving Throws: 

STR +10, CON +11

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

tremorsense 60 ft., passive Perception 16

Languages: 

None

Challenge

17 (18,000 XP)

Proficiency Bonus:

+6

Grinding Hide. A creature that touches the stone that walks or hits it with a melee attack while within 5 feet of it takes 10 (3d6) thunder damage.
Legendary Resistance (3/Day). If the stone that walks fails a saving throw, it can choose to succeed instead.
Siege Monster. The stone that walks deals double damage to objects and structures.

Actions
Multiattack: The stone that walks makes two Fist attacks. It can replace one attack with a use of Stone Mallet.
Fist: Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 17 (3d8 + 4) bludgeoning damage plus 13 (3d8) thunder damage.
Landslide (Recharge 5-6): Each creature in a 30-foot cone must make a DC 19 Strength saving throw, taking 72 (16d8) thunder damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone until the end of its next turn.
Stone Mallet: One creature within 60 feet that is prone must make a DC 19 Strength saving throw, taking 31 (9d6) thunder damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone until the end of its next turn.
Legendary Actions

The stone that walks can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The stone that walks regains spent legendary actions at the start of its turn.

Grind Forward: The stone that walks moves up to half its speed without provoking opportunity attacks, and it makes one Fist attack.
Shoulder Through: The stone that walks moves up to half its speed without provoking opportunity attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.
Settle Down: Each creature within 10 feet of the stone that walks must succeed on a DC 19 Strength saving throw or be knocked prone.
```

**Where each row came from**

- Traits/Grinding Hide — template heated-body; library draw (seed unstamped); binds the GM's words: touch
- Traits/Legendary Resistance — the chassis
- Traits/Siege Monster — the chassis
- Actions/Multiattack — the chassis
- Actions/Fist — the chassis
- Actions/Landslide — the chassis
- Actions/Stone Mallet — template condition-payoff; library draw (seed unstamped)
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Grind Forward — the chassis
- Legendary Actions/Shoulder Through — the chassis
- Legendary Actions/Settle Down — the chassis

**Engine trace**

```
[route] brute-juggernaut type=Elemental mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a mountain that has begun to walk") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental themes=elemental/forged mind=mindless style=juggernaut energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a mountain that walks, quaking the ground with every step [behavior] | a body of living mountain-stone and scree [body] | wordless, purposeless motion it cannot explain [aura]
[concept] identity: The Walking Mountain crosses the battlefield at a crawl, each step a localized earthquake, and simply walks through fortifications, formations, and anything else in its path because it has no other way to move. Every round it brings down a landslide of stone fists, rubble, and collapsing terrain, grinding whatever survives beneath its weight. It does not flee, does not tire, and cannot be reasoned with — not from malice, but because nothing inside it has yet understood that the walking is a choice it could stop making.
[concept] lore: Some deep appointment of stone was granted movement before it was granted purpose, and now it wanders the ranges it once anchored, trying to remember what it was told to do.
[reskin] donor: brute-17-juggernaut -> CR 17
[reskin] inline declared: "the stone that walks" — the call's own answer (kind), built from the name; the rules would have said "the stone"
[reskin] inline on kit rows: "the stone" -> "the stone that walks"
[reskin] lacks asked: "does not know why"
[reskin] clauses: "a mountain" -> has (descriptive), head | "has begun to walk" -> has (mechanical) | "does not know why" -> LACKS (mechanical)
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The stone that walks brings its foot down and the ground forgets it was solid. The shake travels outward from the impact in a spreading ring, and anyone standing on that ground is thrown off balance and left stumbling — but the true bite is what remains: the ground beneath them stays broken and heaving for a time, so anyone who stays put near the creature keeps getting knocked around and slowed, w" [action/always/condition] — menu: condition-payoff, shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] word match declined by the call: exploiter, shield-bash, escalating-dread, terror-pulse, herd, drain — the key word does not mean the mechanic here
[reskin] value check: "Broken Ground" EV 28 vs floor 15.1 (one attack of 2) — dice 58 → 31 (scaled down to the ceiling)
[reskin] signature template: condition-payoff -> Actions/"Broken Ground" ("The ground stays broken and heaving, so anyone who stays put near the creature k [shape fit, no verb match]")
[reskin] signature idea (trait): "Nothing that touches its hide stays whole: any weapon, limb, or body that strikes the stone that walks is answered by a scree-slide of grinding mountain-stone, and the fragments kicked loose keep rattling and crushing around it, harming attackers in the moment and punishing anyone foolish enough to linger in contact with the walking mountain." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: false-appearance, terrain-walk, aberrant-ground — the key word does not mean the mechanic here
[reskin] signature template (trait): heated-body -> Traits/"Grinding Retort" ("anything that strikes the stone that walks is answered by grinding mountain-ston [verb: touch:idea]")
[reskin] weapons answered: Fist = none
[reskin] chassis nova: "Landslide (Recharge 5-6)" — the brute-17-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] trait stripped: Traits/Immutable Form — a golem's trait on a Elemental
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] multiattack replacement clause: It can replace one attack with a use of Broken Ground.
[reskin] save re-derived after a retype: Actions/Landslide — a Constitution save for an effect that calls for Strength or Dexterity; the save follows the condition
[reskin] audit rename: "Grinding Retort" -> "Grinding Hide"
[reskin] audit rename: "Broken Ground" -> "Stone Mallet"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Gale-Wrack — a 2014 sheet

**Concept:** an unseen stalker of living wind that is invisible at all times

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Gale-Wrack | 6 (2014) | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 7 / off 10 → 8.5; sustained 66 (3 × Wind Swipe); nova none; dmg 66

```
Gale-Wrack
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

Hidden Current. While the gale-wrack remains motionless, it is indistinguishable from empty air.
Windborne. The gale-wrack ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Air Form. The gale-wrack can enter an enemy's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.
Invisibility. The gale-wrack is invisible.
Slip the Wind (1/Day). As a bonus action, the gale-wrack casts invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

Actions
Multiattack: The gale-wrack makes three Wind Swipe attacks. It can replace one attack with a use of Vortex.
Wind Swipe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) force damage.
Vortex: One Large or smaller creature in the gale-wrack's space must succeed on a DC 14 Constitution saving throw or take 7 (1d8 + 3) thunder damage and be grappled (escape DC 14). Until the grapple ends, the target can't cast spells with a verbal component and takes 7 (2d6) thunder damage at the start of each of the gale-wrack's turns.
```

**Where each row came from**

- Traits/Hidden Current — template false-appearance; library draw (seed unstamped)
- Traits/Windborne — the chassis
- Traits/Air Form — print's own row
- Traits/Invisibility — print's own row
- Actions/Multiattack — the chassis
- Actions/Wind Swipe — print's row, renamed
- Actions/Vortex — print's own row
- Bonus Actions/Slip the Wind — library seed self-invisibility; the GM's clause "is invisible at all times"; binds the GM's words: invisible+unseen

**Engine trace**

```
[route] skirmisher-skulker type=Elemental mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker: ✓ ("an unseen stalker") | lurker -> skirmisher-skulker: the concept's VERB outranks the noun (key "unseen", class verb) | skirmisher-skulker: key "unseen" (class verb)
[concept] resolve: archetype=skirmisher type=Elemental themes=elemental/aerial mind=bestial style=skulker energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: invisible at all times [body] | strikes from nowhere and vanishes [behavior] | living wind body [body]
[concept] identity: The stalker opens a fight as nothing but a stirring of air, then folds its wind-body into the target's blind side and strikes with ghostly talons that scatter its form into a violent gust. Each round it recedes into invisibility, harrying with screaming drafts and flinging debris until it can strike from cover again. Cornered, it does not flee — it becomes a howling whirlwind that batters everything near it, fighting to the last breath of air.
[concept] lore: Born where a gale died screaming against a cliff of storm-stone, the stalker is a living eddy of that wind that hunts warm bodies to feel their heat scatter on its currents.
[reskin] print canon defenses: HP 114 -> 97, AC 15 -> 14 — the Invisible Stalker's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 16, DEX 19, CON 14, INT 10, WIS 15, CHA 11 — the Invisible Stalker's at its own CR; attack +6 -> +7, DC 14 (print's)
[reskin] donor: skirmisher-3-skulker -> CR 6
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] print canon: "an unseen stalker of living wind that is invisible at all times" heads on the Invisible Stalker — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline declared: "the gale-wrack" — the call's own answer (kind), built from the name
[reskin] inline form: "the gale-wrack" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "unseen" names no absence — nothing in it takes anything away
[reskin] lacks refused: "invisible at all times" names no absence — nothing in it takes anything away
[reskin] clauses: "an unseen stalker of living wind" -> has (descriptive), head | "is invisible at all times" -> has (mechanical) [asked: at_will/condition]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the gale-wrack strikes a foe it has just slipped up on unseen, the wound doesn't stay a wound — the air in the target's chest and the air around it tear loose of each other and keep tearing, a screaming draft that drags at the victim for a short while so that every further blow from the stalker bites deeper and the victim's own movements choke on the buffeting. The stalker only needs to land " [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: leap, gaze-single, snare, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — self-invisibility (invisible, unseen)
[reskin] word match declined by the call: hook-rider, affliction, feint-slip — the key word does not mean the mechanic here
[reskin] value check: "Living Wind (1/Day)" EV 0 vs floor 3.1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Living Wind (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] fallback floor waived: self-invisibility — a self-buff the user's words ask for is its own worth (print: the Imp's Invisibility)
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 3.1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The gale-wrack is not merely hard to see — while it is unseen it is genuinely nowhere until its wind chooses a spot, and any wound it inflicts leaves a shrieking tag of storm-air on the victim so its currents can find that body again through the din of battle even after the stalker washes back into nothing." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — assassinate (unseen)
[reskin] word match declined by the call: assassinate — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "false-appearance" has no key-table verb, but the call quotes "invisible at all times" from the description
[reskin] signature template (trait): false-appearance -> Traits/"Hidden Current" ("An unseen stalker of living wind that is invisible — this carries the invisibili [shape fit, no verb match]")
[reskin] weapons answered: Talons = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] print canon size: Medium -> Large — the Invisible Stalker's
[reskin] print canon languages: "None" -> "Common, Primordial (Auran)" — the Invisible Stalker's
[reskin] print canon speed: 40 ft. -> 50 ft. — the Invisible Stalker's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 50 ft. — the Invisible Stalker's own
[reskin] rider folded: "Talons" keeps its budget — the chassis's rider half (7) folds into the base; the Invisible Stalker pays no damage rider of its own
[reskin] print canon attack: "Talons" -> "Wind Swipe" — the Invisible Stalker's own row
[reskin] print canon multiattack: "The gale-wrack makes three Wind Swipe attacks. It can replace one attack with a use of Vortex." — the Invisible Stalker's own
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Poison; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious; resistances none -> Bludgeoning, Piercing, Slashing — the Invisible Stalker's own header lines
[reskin] print canon trait: Air Form — "an unseen stalker of living wind that is invisible at all times" is the Invisible Stalker (print's own row)
[reskin] print canon trait: Invisibility — "an unseen stalker of living wind that is invisible at all times" is the Invisible Stalker (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Nimble Escape" is the seat's, not the Invisible Stalker's
[reskin] print canon row: Actions/Vortex — the Invisible Stalker's own
[reskin] row binds its clause: "Vanish" answers "is invisible at all times" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "is invisible at all times" -> "Vanish" — limit: asked at_will, row reads per_day
audit finding below confidence gate: Vortex The persistent clause has no explicit end beyond 'the grapple ends,' and the Grappled escape DC is stated but the ongoing thunder damage has no stated condition for removal other than escape—adjudicable but the escape path should be clearly the sole exit.
[reskin] audit rename: "Vanish (1/Day)" -> "Slip the Wind (1/Day)"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Ember Almoner — one marked soft

**Concept:** a priest who heals the faithful and burns the heretic with holy fire

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ember Almoner | 4 (2014) | caster-6 | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | ok | ok |

- bands · soft · band: reads CR 2 (print at 4 reads 1.0625–6.5, n=13)
- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Heal the Faithful
- read: def 1 / off 3 → 2; sustained 24 (2 × Radiant Flame); nova none; dmg 24

```
Ember Almoner
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

Heal the Faithful. When the almoner or an ally it can see within 30 feet of it is wounded, the almoner restores hit points to that creature, which must not be a heretic.
Divine Aid (3/Day) (Bonus Action). The almoner casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: The almoner makes two attacks, using Radiant Flame or Holy. It can replace one attack with a use of Spellcasting to cast Guiding Bolt.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 120 ft., one target. Hit: 12 (2d8 + 3) radiant damage.
Spellcasting: The almoner casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): At Will: Light, Thaumaturgy
1/Day Each: Spirit Guardians
Holy: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 12 (2d8 + 3) radiant damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Radiant Flame — print's own row, renamed
- Actions/Spellcasting — print's own row
- Actions/Holy — print's own row; authored for this sheet; the GM's clause "burns the heretic with holy fire"
- Bonus Actions/Divine Aid — cleric kit; the GM's clause "a priest"
- Traits/Heal the Faithful — authored for this sheet; the GM's clause "heals the faithful"

**Engine trace**

```
[route] caster-warpriest (artillery) type=Humanoid mechanics=aura — casts: implied by the kind — "heals the faithful and burns the heretic" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("heals the faithful and burns the heretic") | caster-warpriest: key "priest" (class noun)
[concept] resolve: archetype=caster type=Humanoid themes=fiendish/elemental mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: healing the faithful with prayer [behavior] | burning heretics in holy fire [behavior] | a censer that showers cinders on the unworthy [object]
[concept] identity: A battle-priest in fire-blackened plate who opens combat by raising a censer and calling down a pillar of holy flame on the unfaithful, then wades in with a mace that sheds embers at every blow. Round after round it heals its wounded allies with muttered prayers while burning heretics alive, fighting with the cold certainty of a martyr who believes the fire is mercy. It never flees — a bloodied priest only prays louder, certain that dying in this work is the point.
[concept] lore: Once an ordinary village cleric, it was burned at the stake by a mob and crawled out of the ashes convinced that the flame had chosen it to sort the faithful from the damned.
[reskin] print canon route: the Priest's body outranks the warpriest seat — no verb in the words names it; the plain caster line
[reskin] print canon casting stat: the Priest casts with WIS; the caster line's INT striker reseats there
[reskin] print canon array: STR 16, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, WIS fitted to +5
[reskin] donor: caster-6 -> CR 4
[reskin] print canon: "a priest who heals the faithful and burns the heretic with holy fire" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: cleric — "a priest": Divine Aid (3/Day) (Priest/Divine Aid)
[reskin] inline declared: "the almoner" — the call's own answer (kind), built from the name
[reskin] inline form: "the almoner" — the model's own reading of the name
[reskin] spell DC coherence: Intelligence 13 -> 18 so DC 14 derives
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "heals the faithful" but offered no quote
[reskin] clauses: "a priest" -> has (descriptive), head | "heals the faithful" -> has (mechanical) [asked: heal] | "burns the heretic with holy fire" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The almoner bows its head and prays aloud over the wounded, and cinders rain from its censer onto every enemy it can see nearby while the prayer lasts. Each faithful ally near it knits closed a little; every heretic near it keeps catching alight as long as the priest keeps praying. It takes all the priest's concentration, so the censer mace and the rest of its magic go silent until the prayer ends" [action/always/condition] — menu: gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — lay-on-hands (heal, heals, healing)
[reskin] word match declined by the call: lay-on-hands, rally — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "zone" has no key-table verb, but the call quotes "a priest who heals the faithful and burns the heretic with holy fire" from the description
[reskin] value check: "Almsgiving Pyre (1/Day)" EV 4.2 vs floor 23.7 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Almsgiving Pyre (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: lay-on-hands, rally left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "a priest who heals the faithful and burns the heretic with holy fire" heads on the Priest and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Clinging Murk (2/Day)" EV 0 vs floor 23.7 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Clinging Murk (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever the almoner's censer mace strikes a foe, the holy fire clings to them — they keep smoldering for a short while, and while they burn, the almoner's healing prayers land harder on its own side. The fire is the proof of heresy, and the priest works faster where sin is burning." [trait/always/damage] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Whenever the almoner's censer mace strikes a foe, the holy fire clings to them — they keep smoldering for a short while, and while they burn, the almoner's healing prayers land harder on its own side. The fire is the proof of heresy, and the priest works faster where sin is burning." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, warded-mending)
[reskin] repair: 2 clause(s) with no row — "heals the faithful", "burns the heretic with holy fire"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Censer Mace = mace
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon attack: "Censer Mace" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon attack kept: "Holy Fire" stays — "Radiant Flame" is already a row on this sheet
[reskin] print canon: chassis row leaves — Reactions/"Protective Magic (3/Day)" is the seat's, not the Priest's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Spellcasting to cast *Guiding Bolt*.
[reskin] lint actuator rename: "Holy Fire" -> "Holy"
- **1/Day Each:** *Spirit Guardians*"), Divine Aid (3/Day): No target, range, or timing is… the same spellcasting ability as Spellcasting.")]
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 13 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
!! [reskin] 2014 conversion failed — the deterministic shape ships with 2024 phrasing: Failed to generate a valid response. Please try again later.
```


---


### Champion of the Sands — bands soft

**Concept:** a skeleton who was a gladiator in a former life

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Champion of the Sands | 4 (2014) | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.25 (print at 4 reads 1.0625–6.5, n=13)
- read: def 1/2 / off 4 → 2.25; sustained 27 (1 × Shortsword); nova none; dmg 27

```
Champion of the Sands
Medium undead, lawful evil
Armor Class

11

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

STR +5

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

Shattered Gristle. A creature that touches the champion or hits it with a melee attack while within 5 feet of it takes 5 (1d10) piercing damage.

Actions
Shortsword: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 27 (7d6 + 3) piercing damage.
```

**Where each row came from**

- Actions/Shortsword — print's row, renamed; weapon shortsword
- Traits/Shattered Gristle — template heated-body; library draw (seed unstamped); binds the GM's words: shard

**Engine trace**

```
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a skeleton who was a gladiator in a form") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: bone-dry arena blade work [behavior] | the skeletal gladiator's frame [body] | old gladiator blade and shield [object]
[concept] identity: The gladiator skeleton opens by striding forward and meeting the nearest foe head-on, hefting its old arena blade for a sweeping cut. Every round it fights as it did in the pits — trading blows, crowding opponents, and stepping back only to line up the next swing — and it never yields: a creature of dead muscle memory and showmanship, it presses the attack to the last bone rather than flee.
[concept] lore: Raised from the sand of a forgotten arena, the skeleton remembers only the roar of the crowd and the promise of a final victory, and it seeks fresh challengers to finish a bout it never got to win.
[reskin] print canon array: STR 16, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +5
[reskin] donor: brute-2 -> CR 4
[reskin] print canon: "a skeleton who was a gladiator in a former life" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] implied class kept: "fighter" on the GM's own words "a gladiator in a former life" — the key table found none
[reskin] class kit: riposte — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: fighter — "a gladiator in a former life": nothing to add — the sheet already answers it
[reskin] inline by rule: "the champion" — the call answered "the sands" (kind), which the name does not support
[reskin] save dc derived: DC 14 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: "lost its life"
[reskin] lacks refused: "no tongue" quotes nothing the user typed
[reskin] lacks refused: "no memory beyond the arena" quotes nothing the user typed
[reskin] clauses: "a skeleton" -> has (descriptive), head | "was a gladiator in a former life" -> LACKS (mechanical)
[reskin] signature idea (action): "Hungry for the crowd's roar, the champion opens each bout by bellowing a challenge at every enemy near it. Those who answer by shoving forward into its reach find the blade already swinging, while those who cringe or skulk away give the skeleton a chance to stride after them and press the attack harder." [action/save/condition] — menu: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — drain (life)
[reskin] value check: "Gladiator's Answer" EV 6.1 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] signature template: own-turn-punisher -> Bonus Actions/"Gladiator's Answer" ("Those who shove forward into its reach find the blade already swinging — a creat [verb: answer:idea]")
[reskin] signature idea (trait): "Bone and old gristle cling to the killer-hit of an arena bout: whenever a challenger's blow lands on the champion, shards of its own shattered frame spray back at them, and a strike that would drop a living fighter only seems to enrage the dead thing more." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature template (trait): heated-body -> Traits/"Shattered Gristle" ("shards of its shattered frame spray back at a challenger whose melee blow lands  [verb: shard:idea]")
[reskin] weapons answered: Scimitar = scimitar
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon attack: "Scimitar" -> "Shortsword" — the Skeleton's own row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] lacks clause: Bonus Actions/"Gladiator's Answer" leaves — "was a gladiator in a former life"
!! [reskin] 2014 conversion failed — the deterministic shape ships with 2024 phrasing: Failed to generate a valid response. Please try again later.
```


---


### Scarred Linebreaker — bands soft

**Concept:** a berserker who flies into an unstoppable rage once per day when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Scarred Linebreaker | 8 (2014) | brute-5 | SOFT: duplicate-mechanic | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- derivation · soft · duplicate-mechanic: Traits/Bloodied Fury: every part of this row is already in "Bloodied Frenzy" — two rows, one mechanic
- bands · soft · band: reads CR 6.5 (print at 8 reads 2–8.5, n=10)
- read: def 5 / off 8 → 6.5; sustained 52 (2 × Greataxe); nova none; dmg 52

```
Scarred Linebreaker
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

Wounded Fury. While it has half of its hit points or fewer, the linebreaker has advantage on attack rolls.
Wounded Frenzy. While it has half of its hit points or fewer, the linebreaker has advantage on attack rolls and saving throws.
Rampage (1/Day). As a bonus action, immediately after dealing damage to a creature that already has half of its hit points or fewer, the linebreaker moves up to half its speed without provoking opportunity attacks, and it makes one Greataxe attack.

Actions
Multiattack: The linebreaker makes two Greataxe attacks.
Greataxe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 26 (5d8 + 4) slashing damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Greataxe — weapon greataxe
- Traits/Bloodied Fury — template bloodied-fury; library draw (seed unstamped); the GM's clause "flies into an unstoppable rage once per day when wounded"; binds the GM's words: wounded+rage
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "a berserker"
- Bonus Actions/Rampage — template rampage; barbarian kit; the GM's clause "a berserker"

**Engine trace**

```
[route] brute type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-charger: ✓ ("flies into an unstoppable rage") | skirmisher-winged: the call read "flies" as not meaning that mechanic here — no override | brute-charger stands: every key that would override it was read as a figure of speech | brute-charger: no line key in the words — the model's read of its quote | brute-charger -> brute: a charger is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] hints: winged→style ✗ ("flies into a rage")
[concept] resolve: archetype=brute type=Humanoid themes=bestial/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: uncontrollable rage once wounded [behavior] | two-handed cleaver [object] | fights to the death, never retreats [behavior]
[concept] identity: A scarred humanoid warrior wades in behind a two-handed cleaver, trading blows until the first real wound lands — then the rage takes over and it stops defending entirely, swinging harder and faster the more blood it has spilled, heedless of its own. Once enraged it never disengages or flees, pressing the fight to the death and turning on whatever struck it last, so the only safe answer is to put it down before it is bloodied.
[concept] lore: A veteran of a hundred losing wars, this berserker has survived only by surrendering to the fury that rises when steel first bites flesh — and it now seeks out fights it cannot win just to feel that rush again.
[reskin] print canon array: STR 18, DEX 12, CON 17, INT 9, WIS 11, CHA 9 — the Berserker's, STR fitted to +7
[reskin] donor: brute-5 -> CR 8
[reskin] print canon: "a berserker who flies into an unstoppable rage once per day when wounded" heads on the Berserker — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: barbarian — "a berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Rampage (1/Day) (rampage)
[reskin] inline declared: "the linebreaker" — the call's own answer (kind), built from the name; the rules would have said "Linebreaker"
[reskin] inline on kit rows: "Linebreaker" -> "the linebreaker"
[reskin] inline form: "the linebreaker" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered limit "once_per_fight" for "flies into an unstoppable rage once per day when wounded" but offered no quote
[reskin] clauses: "a berserker" -> has (descriptive), head | "flies into an unstoppable rage once per day when wounded" -> has (mechanical) [asked: when_bloodied/buff_self]
[reskin] signature idea (action): "When the linebreaker is wounded, the fury hijacks its body: instead of acting normally it lurches toward whatever struck it last and makes one huge, wild cleaver swing. It cannot choose a different target while that foe is still standing, and the blow leaves it wide open — its guard is gone until its next turn begins." [action/once_per_fight/damage] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — affliction (wound)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown affliction, which the GM's words keyed
[reskin] key match declined: action — "affliction" was ranked first on the call's own menu for wound, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the linebreaker is wounded, the fury hijacks its body: instead of acting normally it lurches toward whatever struck it last and makes one huge, wild cleaver swing. It cannot choose a different target while that foe is still standing, and the blow leaves it wide open — its guard is gone until its next turn begins." [action/once_per_fight/damage] — the model found no template that holds it (offered: affliction, trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up)
[reskin] fallback stands down: "a berserker who flies into an unstoppable rage once per day when wounded" heads on the Berserker and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Horrid Display (2/Day)" EV 27.5 vs floor 42.3 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Its two-handed cleaver is not swung so much as driven through — every hit lands with the full weight of the berserker behind it, so anything it connects with is staggered and struggles to strike back cleanly. The heavier the wound it has taken, the more recklessly the cleaver comes down." [trait/always/condition] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (wounded, rage)
[reskin] word match declined by the call: relentless-pursuit — the key word does not mean the mechanic here
[reskin] signature template (trait): bloodied-fury -> Traits/"Bloodied Fury" ("While Bloodied the creature rages, gaining Advantage on attack rolls — the berse [verb: wounded:concept, rage:concept]")
[reskin] weapons answered: Greataxe = greataxe
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] row binds its clause: "Bloodied Fury" answers "flies into an unstoppable rage once per day when wounded" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "flies into an unstoppable rage once per day when wounded" -> "Bloodied Fury" — trigger when_bloodied
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Ilyn Surestrike — bands soft

**Concept:** a monk of the open hand who strikes pressure points

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ilyn Surestrike | 5 (2014) | skirmisher-3 | ok | SOFT: band | ok | SOFT: ko-at-will, ko-at-will, rider-no-save | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 3.5 (print at 5 reads 2.5–9.5, n=25)
- gates · soft · ko-at-will: Actions/Open Palm: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- gates · soft · ko-at-will: Actions/Pressure Point Strike: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- gates · soft · rider-no-save: Actions/Pressure Point Strike: a Stunned rider on every hit with no save
- read: def 3 / off 4 → 3.5; sustained 32 (2 × Open Palm); nova none; dmg 32

```
Ilyn Surestrike
Medium humanoid, neutral
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

Fleet Agility (Bonus Action). Ilyn takes the Dash or Disengage action.
Patient Defense (Bonus Action). Ilyn takes the Dodge action.

Actions
Multiattack: Ilyn makes two attacks, using Open Palm, Ki Dart, or Pressure Point Strike. It can replace one attack with a use of Punishing Palm.
Open Palm: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. Once on each of Ilyn's turns when it hits with this attack, the target is subjected to the following effect. The target must make a DC 14 Constitution saving throw. On a failed save, the target is stunned until the end of Ilyn's next turn.
Ki Dart: Ranged Weapon Attack: +6 to hit, range 20/60 ft., one target. Hit: 12 (2d8 + 3) force damage.
Punishing Palm: One creature within 30 feet that is Stunned must make a DC 14 Strength saving throw, taking 14 (4d6) piercing damage on a failed save, or half as much damage on a successful one.
Pressure Point Strike: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage, and the target is stunned until the end of its next turn.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Open Palm — a declared feature; the GM's clause "a monk of the open hand"
- Actions/Ki Dart — the chassis
- Actions/Punishing Palm — library seed exploiter
- Actions/Pressure Point Strike — authored for this sheet; the GM's clause "strikes pressure points"
- Bonus Actions/Fleet Agility — the chassis
- Bonus Actions/Patient Defense — template patient-defense; monk kit; the GM's clause "a monk of the open hand"

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("strikes pressure points") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/uncanny mind=sapient style=— energy=Psychic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: precise strikes to pressure points that numb and paralyze limbs [behavior] | hit-and-run darting in and out of reach [behavior] | an ascetic monk's hardened iron-conditioned body [body]
[concept] identity: The Pressure-Point Monk opens by circling at the edge of reach, reading a target's stance for the joint, nerve, or vessel it leaves open. Every round after that it darts in for one precise, crippling touch — paralyzing a sword arm or numbing a leg — then slips back out before the answer comes. It fights with a duelist's patience, never bloodied into a rout but willing to disengage, reset, and pick apart a foe one struck nerve at a time.
[concept] lore: A wandering ascetic who left a mountain cloister with the forbidden nerve-strike scrolls, it now seeks out worthy opponents to prove its mastery over their own bodies, one pressure point at a time.
[reskin] energy withheld: Psychic on a Humanoid with no Psychic in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3 -> CR 5
[reskin] repair round 1: 1 defect(s) — "Ki Dart" deals Force on a Humanoid whose concept names no Force — a name is not a warrant; use a physical type
[reskin] row evicted for the cap: Traits/"Circling Stance" (chassis filler) leaves so "Patient Defense" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: monk — "a monk of the open hand": Stunning Strike (stunning-strike, rides Open Palm), Patient Defense (patient-defense)
[reskin] inline declared: "Ilyn" — the call's own answer (person), built from the name
[reskin] inline form: "Ilyn" — the model's own reading of the name
[reskin] energy rider withheld: Psychic on a Humanoid with no Psychic in the concept's own words
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered limit "at_will" for "strikes pressure points" but offered no quote
[reskin] clauses: "a monk of the open hand" -> has (descriptive), head | "strikes pressure points" -> has (mechanical) [asked: on_hit/condition]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "After Ilyn lands its unarmed strike, the struck limb goes dead and heavy rather than merely hurting — the target's arm or leg numbs and drags, slowing its movement and spoiling its next swing until the nerve wakes. It is the follow-through to the pinpoint blow, the crippling that outlasts the moment of contact, applied to whoever the open palm touches." [rider/on_hit/condition] — menu: charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] word match declined by the call: riposte, hook-rider, charge-push, pounce, isolation, bolt-mark, charge — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown riposte, which the GM's words keyed
[reskin] key match declined: action — "riposte" was ranked first on the call's own menu for opening, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "After Ilyn lands its unarmed strike, the struck limb goes dead and heavy rather than merely hurting — the target's arm or leg numbs and drags, slowing its movement and spoiling its next swing until the nerve wakes. It is the follow-through to the pinpoint blow, the crippling that outlasts the moment of contact, applied to whoever the open palm touches." [rider/on_hit/condition] — the model found no template that holds it (offered: riposte, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] fallback skipped by the floor: sensory-strike (EV 2.3 vs 8.8)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 8.8)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 8.8 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Ilyn has trained its body to turn aside the shock of blows, letting force slide off conditioned bone and sinew, so it can stand inside an enemy's reach and trade a touch for a hit. When a foe commits to striking it, the blow lands softened, and Ilyn is already set to answer with its own open palm." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Ilyn has trained its body to turn aside the shock of blows, letting force slide off conditioned bone and sinew, so it can stand inside an enemy's reach and trade a touch for a hit. When a foe commits to striking it, the blow lands softened, and Ilyn is already set to answer with its own open palm." [trait/on_being_hit/defense] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, guarded-stance)
[reskin] repair: 1 clause(s) with no row — "strikes pressure points"; one targeted call with the sheet as context
[reskin] repaired sheet: 3 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Open Palm = none; Ki Dart = none
[reskin] weapon declined: "Ki Dart" reads dart from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Ki Dart" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
[reskin] multiattack normalised: "Ilyn makes two attacks, using Open Palm, Ki Dart, or Pressure Point Strike in any combinatio"
[reskin] ask vs row MISMATCH: "strikes pressure points" -> "Pressure Point Strike" — trigger: asked on_hit, row reads at_will
[reskin] audit rename: "Opportunist's Lash" -> "Punishing Palm"
!! [reskin] 2014 conversion failed — the deterministic shape ships with 2024 phrasing: Failed to generate a valid response. Please try again later.
```


---


### Tunnel Cave Troll — bands soft

**Concept:** a cave troll that speaks only Giant and understands no Common

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Tunnel Cave Troll | 3 (2014) | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.125–6.5, n=23)
- read: def 1/2 / off 3 → 1.75; sustained 23 (1 × Club); nova none; dmg 23

```
Tunnel Cave Troll
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

Giant

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Regeneration. The cave troll regains 10 hit points at the start of each of its turns. If the cave troll takes acid or fire damage, this trait doesn't function on the cave troll's next turn. The cave troll dies only if it starts its turn with 0 hit points and doesn't regenerate.
Tunnel Lunge (1/Day). As a bonus action, immediately after dealing damage to a creature that has half of its hit points or fewer, the cave troll moves up to half its speed, and it makes one Club attack.

Actions
Club: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 23 (6d6 + 2) bludgeoning damage.
```

**Where each row came from**

- Actions/Club — weapon club
- Bonus Actions/Tunnel Lunge — library seed rampage
- Traits/Regeneration — the chassis

**Engine trace**

```
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("cave troll") | brute: no line key in the words — the model's read of its quote
[concept] hints: troll→canon ✓ ("a cave troll that speaks only Giant")
[concept] resolve: archetype=brute type=Giant themes=subterranean/bestial mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: limestone-boned cave body [body] | uncomprehending, never-parleying assault [behavior] | blocks the tunnel and pins prey [behavior]
[concept] identity: A cave troll closes the distance shoulder-first and then simply keeps swinging — a boulder-muscled brute that never stops coming once it has your scent. It can't understand a word you say, so it never parleys, never taunts, and never flees; it reads a fight only through Giant-voiced grunts and the swing of a club, and bloodied, it just goes faster. Every round after the first is the same round: it puts its body between you and the tunnel back, then beats down whoever is closest until the shape stops moving.
[concept] lore: Hatched deep in the wet limestone dark, the cave troll speaks only the Giant tongue of the tunnels it was born in and wants nothing from the surface world but meat and the echo of its own fists on stone.
[reskin] donor: brute-2 -> CR 3
[reskin] inline declared: "the cave troll" — the call's own answer (kind), built from the name
[reskin] inline form: "the cave troll" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 12 (8 + PB 2 + the sheet's best 2) — no stat on the sheet reached it
[reskin] lacks asked: "understands no Common"
[reskin] lacks refused: "never parleys" quotes nothing the user typed
[reskin] lacks refused: "never taunts" quotes nothing the user typed
[reskin] lacks refused: "never flees" quotes nothing the user typed
[reskin] clauses: "a cave troll" -> has (descriptive), head | "speaks only Giant" -> has (header) | "understands no Common" -> LACKS (mechanical)
[reskin] signature idea (action): "The troll slams into a foe shoulder-first, driving them backward and leaving them winded and reeling; if that foe is already worn down or bleeding, the shove is strong enough to throw them off their feet and send them sprawling, so the troll's continued advance crushes them where they land. It always follows the charge with the club, never pausing to gloat." [rider/on_hit/movement] — menu: charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] word match declined by the call: push-prone, charge, trample, wind-up — the key word does not mean the mechanic here
[reskin] rider declined: "Shoulder Charge" — a rider rides the user's own attack, so it needs the user's own ask; the call offered no quote, and the key table finds no verb either (the gong's bandaged concussion, 2026-10-01)
[reskin] fallback respects the call: push-prone left the shelf — the call declined it for this sheet
[reskin] value check: "Rampage (1/Day)" EV 18.6 vs floor 3.6 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its limestone-boned hide is so dense that every blow landed on it rings through the tunnel and knocks the attacker's weapon arm numb, making it harder for them to strike true again this fight. The harder they hit it, the more the echo punishes them." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature miss: trait — "Its limestone-boned hide is so dense that every blow landed on it rings through the tunnel and knocks the attacker's weapon arm numb, making it harder for them to strike true again this fight. The harder they hit it, the more the echo punishes them." [trait/on_being_hit/condition] — no template on the shelf shares a verb with the concept or the idea (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] weapons answered: Club = club
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] name-canon trait stamped: Regeneration (the name says so; print says what it does)
[reskin] audit rename: "Rampage (1/Day)" -> "Tunnel Lunge (1/Day)"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Pip Thistlewisp — in the run

**Concept:** a halfling scout who ducks behind her allies and hides between shots

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Pip Thistlewisp | 3 (2014) | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 3 → 2.5; sustained 22 (2 × Shortsword); nova none; dmg 22

```
Pip Thistlewisp
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

Evasion. If Pip is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Pip instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it is incapacitated.
Cunning Action. As a bonus action, Pip takes the Dash, Disengage, or Hide action.
Retaliating Bash. As a bonus action, Pip deals 4 (1d8) bludgeoning damage to one creature within 5 feet of it that hit it with an attack roll since the end of Pip's last turn.

Actions
Multiattack: Pip makes two attacks, using Shortsword or Longbow.
Shortsword: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 11 (2d8 + 2) piercing damage.
Longbow: Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 9 (2d6 + 2) piercing damage.
```

**Where each row came from**

- Traits/Evasion — template evasion; rogue kit; the GM's clause "ducks behind her allies and hides between shots"
- Actions/Multiattack — the chassis
- Actions/Shortsword — print's row, renamed; weapon shortsword
- Actions/Longbow — print's own row, renamed; weapon longbow
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "ducks behind her allies and hides between shots"
- Bonus Actions/Retaliating Bash — library seed own-turn-punisher

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: on the GM's own words "hides between shots" | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("ducks behind her allies and hides betwee") | skirmisher-skulker: key "hides" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/terror mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: hiding behind allies between shots [behavior] | sling and shortbow volleys from cover [object] | a halfling's small, nimble frame [body]
[concept] identity: A small halfling scout who opens combat from behind her front line, popping out to loose a sling stone or shortbow arrow at advantage and then ducking back into an ally's shadow before the enemy can answer. Every round she cycles a shot and a vanish, using her companions as living cover and always keeping a bigger body between herself and the nearest threat. Under pressure she is cool and evasive, never fighting to the death — she disengages and leads pursuers into the rest of her party, coordinating ambushes until the odds swing, then melting away again.
[concept] lore: A halfling scout of the border levies who learned early that the safest shield is a companion's back — she earns her keep as a skirmishing outrider, trading bold shots for the chance to slip free of every fight she can't win outright.
[reskin] print canon array: STR 11, DEX 14, CON 12, INT 11, WIS 13, CHA 11 — the Scout's, DEX fitted to +4
[reskin] donor: skirmisher-3-skulker -> CR 3
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] print canon: "a halfling scout who ducks behind her allies and hides between shots" heads on the Scout — print's rows ride along; the seat stays
[reskin] implied class kept: "rogue" on the GM's own words "ducks behind her allies and hides between shots" — the key table found none
[reskin] class kit: Cunning Action — the sheet already carries it, so the rogue kit adopts that row: the cap may no longer read it as filler
[reskin] row evicted for the cap: Traits/"Lightfoot" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "ducks behind her allies and hides between shots": Evasion (evasion)
[reskin] inline declared: "Pip" — the call's own answer (person), built from the name
[reskin] inline form: "Pip" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 12 (8 + PB 2 + the sheet's best 2) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "ducks behind her allies" but offered no quote
[reskin] asked field dropped: the call answered trigger "at_will" for "hides between shots" but offered no quote
[reskin] clauses: "a halfling scout" -> has (descriptive), head | "ducks behind her allies" -> has (mechanical) [asked: movement] | "hides between shots" -> has (mechanical) [asked: condition]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When Pip looses a stone or arrow at a foe that an ally is pressing in melee, she sights along her friend's shoulder and the shot lands with uncanny certainty, and the struck enemy is thrown off balance — its next swing or shot goes wide. She must be able to see her ally standing right beside the target, and once that shot is away the same trick won't fool that foe again that fight." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] word match declined by the call: gaze-single, focus, feint-slip, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When Pip looses a stone or arrow at a foe that an ally is pressing in melee, she sights along her friend's shoulder and the shot lands with uncanny certainty, and the struck enemy is thrown off balance — its next swing or shot goes wide. She must be able to see her ally standing right beside the target, and once that shot is away the same trick won't fool that foe again that fight." [rider/on_hit/condition] — the model found no template that holds it (offered: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, gaze-single, focus, feint-slip)
[reskin] fallback respects the call: gaze-single left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "a halfling scout who ducks behind her allies and hides between shots" heads on the Scout and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Answering Sting" EV 2.2 vs floor 1.8 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Pip reads the gaps in a melee like a map: as long as a larger ally stands between her and the nearest threat, her sling and bow shots find their mark more reliably and slip past the enemy's guard. The moment she's the closest thing to swing at, the gift evaporates." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: guarded-stance, false-appearance, blurred-form — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Pip reads the gaps in a melee like a map: as long as a larger ally stands between her and the nearest threat, her sling and bow shots find their mark more reliably and slip past the enemy's guard. The moment she's the closest thing to swing at, the gift evaporates." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] weapons answered: Dagger = Dagger; Sling = Sling
[reskin] weapon table: "Sling" — a launcher, never thrown, range 30/120
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] print canon languages: "Common, Halfling" -> "Common plus one other language, Halfling" — the Scout's plus the concept's Halfling
[reskin] print canon attack: "Dagger" -> "Shortsword" — the Scout's own row
[reskin] print canon attack: "Sling" -> "Longbow" — the Scout's own ranged row
[reskin] audit rename: "Answering Sting" -> "Retaliating Bash"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Vice-Rock Griever — in the run

**Concept:** a crushing press of stone that squeezes but never holds

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vice-Rock Griever | 6 (2014) | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Slam); nova none; dmg 42

```
Vice-Rock Griever
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

force, poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

tremorsense 30 ft., passive Perception 13

Languages: 

understands the languages of its creator but can't speak

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Jawed Casing. A creature that touches the vice-rock griever or hits it with a melee attack while within 5 feet of it takes 7 (2d6) force damage.
Force Absorption. Whenever the vice-rock griever is subjected to force damage, it takes no damage and instead regains a number of hit points equal to the force damage dealt.
Immutable Form. The vice-rock griever can't shape-shift.
Magic Resistance. The vice-rock griever has advantage on saving throws against spells and other magical effects.
Retaliatory Grind. As a bonus action, the vice-rock griever deals 7 (2d6) force damage to one creature within 5 feet of it that hit it with an attack roll since the end of the vice-rock griever's last turn.

Actions
Multiattack: The vice-rock griever makes two attacks: one with its Slam and one with its Squeeze.
Slam: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage.
Squeeze: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 14).
```

**Where each row came from**

- Traits/Jawed Casing — template heated-body; library draw (seed unstamped)
- Traits/Force Absorption — the chassis
- Traits/Immutable Form — the chassis
- Traits/Magic Resistance — the chassis
- Actions/Multiattack — the chassis
- Actions/Slam — the chassis
- Actions/Squeeze — authored for this sheet; the GM's clause "squeezes"
- Bonus Actions/Retaliatory Grind — library seed own-turn-punisher

**Engine trace**

```
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a crushing press of stone") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Construct themes=forged/grasping mind=mindless style=juggernaut energy=Force mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: crushing stone embrace [behavior] | ribbed slab-body that never holds its grip [body] | relentless, tireless pursuit [behavior]
[concept] identity: The Stone Squeezer lumbers into reach and draws prey into its ribbed slab-body, clamping down in a grinding embrace that crushes bone and armor alike, but every vice it forms is built to slip free — victims slide out at the seam before the full weight settles, so it must lumber after them and seize again. It fights in patient cycles of grab, crush, and release, never holding long enough to pin a kill, and it does not flee or tire: it simply keeps advancing and closing, indifferent to pain, until its quarry stops moving or the body gives out entirely.
[concept] lore: Quarried from a seam of living rock and bound with a mason's unfinished vow, the Stone Squeezer exists to press the unworthy flat — but the oath was never sealed, so its hold always gives way at the final instant.
[reskin] donor: brute-5-juggernaut -> CR 6
[reskin] inline declared: "the vice-rock griever" — the call's own answer (kind), built from the name
[reskin] inline form: "the vice-rock griever" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: "never holds"
[reskin] lacks refused: "does not flee or tire" quotes nothing the user typed
[reskin] lacks refused: "indifferent to pain" quotes nothing the user typed
[reskin] lacks refused: "unfinished vow" quotes nothing the user typed
[reskin] lacks refused: "never sealed" quotes nothing the user typed
[reskin] asked field dropped: the call answered limit "at_will" for "never holds" but quoted "never", which is not the GM's own words
[reskin] clauses: "a crushing press of stone" -> has (descriptive), head | "squeezes" -> has (mechanical) [asked: save_single] | "never holds" -> LACKS (mechanical) [asked: condition]
[reskin] signature idea (action): "The griever lurches forward and wraps a foe in a grinding stone embrace, crushing them for heavy damage — but the seam of its ribbed slab gives way at the last instant, and the victim is shoved free a short distance, left staggered and off-balance from the near-miss. The griever is left briefly exposed as its slab hangs open, so it must lumber in again to close the vice." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider, pounce (+ shelf: leap, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature re-seated: action — no rider shares the verb; the idea "The griever lurches forward and wraps a foe in a grinding st…" is tried as an action
[reskin] signature idea (action): "The griever lurches forward and wraps a foe in a grinding stone embrace, crushing them for heavy damage — but the seam of its ribbed slab gives way at the last instant, and the victim is shoved free a short distance, left staggered and off-balance from the near-miss. The griever is left briefly exposed as its slab hangs open, so it must lumber in again to close the vice." [action/save/damage] — menu: leap, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature miss: action — "The griever lurches forward and wraps a foe in a grinding stone embrace, crushing them for heavy damage — but the seam of its ribbed slab gives way at the last instant, and the victim is shoved free a short distance, left staggered and off-balance from the near-miss. The griever is left briefly exposed as its slab hangs open, so it must lumber in again to close the vice." [action/save/damage] — no template on the shelf shares a verb with the concept or the idea (offered: leap, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] fallback skipped by the floor: push-prone (EV 2.6 vs 9.9)
[reskin] fallback skipped by the floor: herd (EV 7.4 vs 32.1)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 3.1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever something strikes the griever hard enough to hurt it, unsealed stone ribs flex and clamp reflexively around the attacker, grinding them for a moment before slipping loose again — the same unfinished vow that frees its prey turns every blow into a brief, painful squeeze." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] pick kept on the GM's own words: trait — "heated-body" has no key-table verb, but the call quotes "a crushing press of stone that squeezes but never holds" from the description
[reskin] signature template (trait): heated-body -> Traits/"Vice Grip" ("Unsealed stone ribs flex and clamp reflexively around an attacker who hits it in [shape fit, no verb match]")
[reskin] repair: 1 clause(s) with no row — "squeezes"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Ribbed Slab = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] attack name by anatomy: "Ribbed Slab" -> "Slam" — slab is a ranged noun on a melee row
[reskin] rename propagated: "Ribbed Slab" -> "Slam" in "Multiattack"
[reskin] absorption re-keyed: Lightning -> Force (the donor organ obeys the concept energy)
[reskin] immunities stamped for type: Construct -> Force, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] vulnerability rejected — "Thunder" has no warrant in the concept's own text (print's default is none)
[reskin] audit rename: "Vice Grip" -> "Jawed Casing"
[reskin] audit rename: "Answering Sting" -> "Retaliatory Grind"
[reskin] 2014 conversion: one lint-gated call — both printings saved
!! Failed to load resource: the server responded with a status of 500 (OK)
!! Error generating response: Error: HTTP 500: 
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:266:25)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs?t=1792202639880:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792336652099:1394:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792336652099:1233:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792336652099:656:5)
!! [ENRICHMENT] Failed to enrich Vice-Rock Griever: Error: HTTP 500: 
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:266:25)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs?t=1792202639880:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792336652099:1394:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792336652099:1233:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792336652099:656:5)
(enrichment did not settle within 20s — moving on)
```


---


### Hose-Fouled Diver — in the run

**Concept:** a drowned bell-diver who rises from the harbour mud

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hose-Fouled Diver | 4 (2014) | lurker-1-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 4 → 4; sustained 27 (1 × Mud-Chill Slam); nova none; dmg 27

```
Hose-Fouled Diver
Medium undead, neutral
Armor Class

11

Hit Points: 

78 (12d8 + 24)

Speed: 

5 ft., fly 50 ft. (hover), swim 30 ft.

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

bludgeoning, cold, piercing, slashing

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained

Senses: 

darkvision 60 ft., passive Perception 10

Languages: 

None

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Harbour-Mud Rising. When the diver is reduced to 0 hit points by cold damage, the diver dissolves into the harbour mud and returns to life after minutes, rising again with its hit points fully restored unless its remains are doused with holy water or scattered onto dry land.
Incorporeal Movement. The diver can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
Sunlight Sensitivity. While in sunlight, the diver has disadvantage on ability checks and attack rolls.

Actions
Mud-Chill Slam: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 27 (7d6 + 3) cold damage.
Brine-Siphon: One creature within 30 feet must make a DC 13 Constitution saving throw, taking 27 (6d8) cold damage on a failed save, or half as much damage on a successful one. The diver regains hit points equal to half the damage dealt.
```

**Where each row came from**

- Traits/Harbour-Mud Rising — authored for this sheet; the GM's clause "rises from the harbour mud"
- Traits/Incorporeal Movement — the chassis
- Traits/Sunlight Sensitivity — the chassis
- Actions/Mud-Chill Slam — the chassis
- Actions/Brine-Siphon — library seed drain

**Engine trace**

```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs?t=1792202639880:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792336652099:1394:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792336652099:1233:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792336652099:656:5)
!! [ENRICHMENT] Failed to enrich Brine-Priest of the Congregation: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs?t=1792202639880:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792336652099:1394:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792336652099:1233:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792336652099:656:5)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("a drowned bell-diver who rises from the ") | lurker-phantom: key "drowned" (class body)
[concept] resolve: archetype=lurker type=Undead themes=grave/aquatic mind=bestial style=phantom energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: dragging the living down into harbour silt [behavior] | drowned diver's sealed brass helmet [body] | fouled air-hose tether trailing murk [object]
[concept] identity: It surfaces from the harbour mud without a ripple, the drowned diver still sealed in its brass helmet, dragging a tether of cold green water behind it like a lure. Every round it lunges for a limb, trying to drag the living down into the silt and hold them there until the tide fills their lungs; when the light finds it, it shrinks back hissing and sinks into the mud, retreating only to rise again behind the next breathless swimmer.
[concept] lore: A bell-diver who drowned when the air-hose fouled during a harbour salvage job, still trying to finish the dive — and willing to share its last lungful of black water with anyone who comes near the quay.
[reskin] donor: lurker-1-phantom -> CR 4
[reskin] inline declared: "the diver" — the call's own answer (kind), built from the name
[reskin] inline form: "the diver" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no ripple" quotes nothing the user typed
[reskin] lacks refused: "lost its air" quotes nothing the user typed
[reskin] lacks refused: "no voice" quotes nothing the user typed
[reskin] clauses: "a drowned bell-diver" -> has (descriptive), head | "rises from the harbour mud" -> has (mechanical) [asked: movement]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The diver lunges and seizes a swimmer, and the fetid green water streaming from its fouled hose wraps the victim like a second tether. For as long as the diver keeps its grip the victim is dragged along with it, pulled down toward the silt whenever the diver sinks, so the surface grows further away with every round they stay caught." [rider/on_hit/movement] — menu: charge-push, hook-rider, pounce, isolation (+ shelf: leap, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — active-toll, slow-bolt, sensory-strike (bell, mud)
[reskin] rider declined: "Fouled Tether" — a rider rides the user's own attack, so it needs the user's own ask; the call offered no quote, and the key table finds no verb either (the gong's bandaged concussion, 2026-10-01)
[reskin] fallback skipped by the floor: slow-bolt (EV 3.7 vs 14)
[reskin] fallback skipped by the floor: sensory-strike (EV 3.7 vs 14)
[reskin] fallback skipped by the floor: obstacle-pull (EV 3.7 vs 14)
[reskin] value check: "Vitality Leech" EV 20.9 vs floor 14 (one attack of 1) — added Success: Half; dice 16 → 27
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The drowned diver still wears its brass helmet, and the visor never quite clears: black harbour water seeps out of it constantly, dripping onto anyone who grapples it or is pressed close. Those caught nearest the helmet breathe that fouled, silt-thick water and begin to drown on dry quay air, weakening the longer they stay in its reach." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — resonant-body, terrain-walk, bloodied-burst (bell, mud)
[reskin] word match declined by the call: resonant-body, bloodied-burst, terrain-walk, heated-body, noxious-aura — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown resonant-body, terrain-walk, bloodied-burst, which the GM's words keyed
[reskin] key match declined: trait — "resonant-body" was ranked first on the call's own menu for bell, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The drowned diver still wears its brass helmet, and the visor never quite clears: black harbour water seeps out of it constantly, dripping onto anyone who grapples it or is pressed close. Those caught nearest the helmet breathe that fouled, silt-thick water and begin to drown on dry quay air, weakening the longer they stay in its reach." [trait/always/condition] — the model found no template that holds it (offered: resonant-body, terrain-walk, bloodied-burst, false-appearance, adhesive, phobia, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body)
[reskin] concept-first trait skipped: bloodied-burst — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] concept-first trait skipped: resonant-body — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] repair: 1 clause(s) with no row — "rises from the harbour mud"; one targeted call with the sheet as context
[reskin] repaired sheet: 0 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Grab = none
[reskin] speed by concept:  — the concept's movement set decides
[reskin] immunities stamped for type: Undead + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] resistances derived: Bludgeoning, Cold, Piercing, Slashing
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
audit finding below confidence gate: Harbour-Mud Rising The diver is repeatedly restored to full HP with its destruction only preventable by a cleanup procedure no creature is told how to perform or whether they have time to perform.
[reskin] audit rename: "Grab" -> "Mud-Chill Slam"
[reskin] audit rename: "Vitality Leech" -> "Brine-Siphon"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Grave-Pit Swarm — in the run

**Concept:** a swarm of carrion beetles that strips a corpse in a minute

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Grave-Pit Swarm | 4 (2014) | swarm-3 | FAIL: lint:attack-mod-coherence | ok | ok | ok | ok | ok | ok | ok | ok |

- derivation · fail · lint:attack-mod-coherence: Actions/Mandibles: flat damage bonus +2 matches none of the creature's STR/DEX/INT/WIS/CHA modifiers — attack damage bonuses derive from the attack ability
- read: def 4 / off 4 → 4; sustained 27 (1 × Mandibles); nova none; dmg 27

```
Grave-Pit Swarm
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

tremorsense 60 ft., passive Perception 10

Languages: 

None

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain hit points or gain temporary hit points.

Actions
Mandibles: Melee Weapon Attack: +5 to hit, reach 0 ft., one target in the swarm's space. Hit: 27 (7d6 + 3) slashing damage, or 11 (2d8 + 2) slashing damage if the swarm has half of its hit points or fewer.
```

**Where each row came from**

- Traits/Swarm — the chassis
- Actions/Mandibles — the chassis

**Engine trace**

```
[route] swarm type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a swarm of carrion beetles" | holds: the call reads none in these words | swarm: ✓ ("a swarm of carrion beetles") | swarm: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "carrion beetles that strips a corpse in …" is the description, not a name
[concept] hints: swarm→body ✓ ("a swarm of carrion beetles")
[concept] resolve: archetype=swarm type=Beast themes=devouring/grave mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: stripping a corpse in a minute [behavior] | a crawling mass of biting beetles [body] | the smell of carrion and the dying [aura]
[concept] identity: The carrion-beetle swarm does not charge; it flows across the ground toward the nearest corpse or the nearest bleeding thing, and a wound, once opened, becomes a door it pours through. Each round it presses into flesh as a single crawling mass, stripping hide from bone in a red minute while the still-living host is eaten from beneath. It has no fear in it, only hunger — but a bloodied swarm breaks into two lesser tides that circle and rejoin rather than die.
[concept] lore: These beetles breed in the grave-pits of old battlefields, and they follow the smell of the dying because a corpse is a minute's work and a screaming body is slower to strip.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] donor: swarm-3 -> CR 4
[reskin] swarm type stamped: Beast -> Swarm of Tiny Beasts
[reskin] inline declared: "the grave-pit swarm" — the call's own answer (kind), built from the name; the rules would have said "the swarm"
[reskin] inline on kit rows: "the grave-pit swarm" -> "the swarm"
[reskin] inline form: "the grave-pit swarm" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a swarm of carrion beetles" -> has (descriptive), head | "strips a corpse in a minute" -> has (descriptive)
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, zone-seed, blighted-ground, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The swarm pours itself over a corpse or a badly wounded creature in reach and strips it bare, flensing hide and flesh away as it feeds. If it is gnawing a fallen body, it does not need to be beside anyone to keep eating — the meal is the action. It only works on something already down or already badly torn open; a hale, upright creature shrugs the beetles off." [action/save/damage] — menu: trample, leap, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: rampage, patient-defense, second-wind, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The swarm pours itself over a corpse or a badly wounded creature in reach and strips it bare, flensing hide and flesh away as it feeds. If it is gnawing a fallen body, it does not need to be beside anyone to keep eating — the meal is the action. It only works on something already down or already badly torn open; a hale, upright creature shrugs the beetles off." [action/save/damage] — the model found no template that holds it (offered: trample, leap, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew, rampage, riposte, affliction)
[reskin] signature idea (trait): "When the mass is torn apart badly enough to break, it does not scatter and die — it splits into two smaller crawling tides that keep biting, skitter apart, and find each other again to rejoin as one. While split, each half is weaker but no less hungry, and they circle the wounded rather than flee." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — noxious-aura, undead-fortitude (carrion, corpse)
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown noxious-aura, undead-fortitude, which the GM's words keyed
[reskin] key match declined: trait — "noxious-aura" was ranked first on the call's own menu for carrion, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "When the mass is torn apart badly enough to break, it does not scatter and die — it splits into two smaller crawling tides that keep biting, skitter apart, and find each other again to rejoin as one. While split, each half is weaker but no less hungry, and they circle the wounded rather than flee." [trait/always/resource] — the model found no template that holds it (offered: noxious-aura, undead-fortitude, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] weapons answered: Mandibles = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] immunities stamped for type: Swarm of Tiny Beasts + donor suite -> Charmed, Frightened, Grappled, Paralyzed, Petrified, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Marrow Quill — in the run

**Concept:** an archer of the black fletching who never misses the eye

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Marrow Quill | 6 (2014) | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "never misses the eye"
- read: def 6 / off 6 → 6; sustained 42 (2 × Shortsword); nova none; dmg 42

```
Marrow Quill
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

Evasion. If Marrow is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Marrow instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it is incapacitated.
Cunning Action. As a bonus action, Marrow takes the Dash, Disengage, or Hide action.
Black Mark (Bonus Action). One creature within 30 feet of Marrow must succeed on a DC 14 Wisdom saving throw or have disadvantage on attack rolls against creatures other than Marrow until the start of Marrow's next turn.

Actions
Multiattack: Marrow makes two attacks, using Shortsword or Longbow.
Shortsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
Longbow: Ranged Weapon Attack: +6 to hit, range 150/600 ft., one target. Hit: 16 (3d8 + 3) piercing damage.
```

**Where each row came from**

- Traits/Evasion — template evasion; rogue kit; the GM's clause "an archer"
- Actions/Multiattack — the chassis
- Actions/Shortsword — print's row, renamed; weapon shortsword
- Actions/Longbow — print's own row; weapon longbow
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "an archer"
- Bonus Actions/Black Mark — template aggro-curse; library draw (seed unstamped); binds the GM's words: mark

**Engine trace**

```
[route] skirmisher-archer type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: on the GM's own words "an archer of the black fletching" | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-archer: ✓ ("an archer of the black fletching") | skirmisher-archer: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "an archer of the black fletching who nev…" is the description, not a name
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/gaze mind=sapient style=archer energy=— mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: called shots that always find the eye [behavior] | black-fletched arrows [object] | the patient hunt from a hidden perch [behavior]
[concept] identity: A patient marksman of the black-fletched arrow, it opens by finding a perch and loosing a single called shot at whatever passes for an eye, then spends every round repositioning and firing before any blade can close. It treats a fight as a slowly pruned list of targets, darting away bloodied but never abandoning its vantage until the last arrow is spent, and it seems to take quiet satisfaction in the moment a shot finds the socket.
[concept] lore: Sworn to a guild that marks each kill with black feathers, this archer haunts rooftops, tree-limbs and bell towers, waiting for the one clean line to an eye that ends a war before it starts.
[reskin] print canon route: the Scout's body outranks the archer seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 11, DEX 16, CON 12, INT 11, WIS 13, CHA 11 — the Scout's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 6
[reskin] print canon: "an archer of the black fletching who never misses the eye" heads on the Scout — print's rows ride along; the seat stays
[reskin] implied class kept: "rogue" on the GM's own words "an archer" — the key table found none
[reskin] row evicted for the cap: Traits/"Slippery" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "an archer": Cunning Action (Assassin/Cunning Action), Evasion (evasion)
[reskin] inline declared: "Marrow" — the call's own answer (person), built from the name
[reskin] inline form: "Marrow" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "never misses the eye" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "an archer of the black fletching" -> has (descriptive), head | "never misses the eye" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Marrow spends a moment sighting down a black-fletched shaft at one foe it can see, reading how that foe moves and blinks. The next arrow it looses at that foe is guided to the eye, and the wound bleeds and stings so badly that the target can't hold its aim or attention steady — its own attacks come wild and its guard frays until it shakes the sting. Marking a new target drops the old one." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, thrown-burst, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — gaze-single (eye, eyes)
[reskin] value check: "Blackfletch Mark" EV 5.7 vs floor 3.1 (a bonus action (free)) — worth the trade
[reskin] signature template: aggro-curse -> Bonus Actions/"Blackfletch Mark" ("Marrow marks one foe it can see; while marked, that foe's attacks against other  [verb: mark:idea]")
[reskin] signature idea (trait): "Every arrow Marrow looses bears the black guild feather, and a struck foe can't simply shrug the shaft off — the fletching tells the guild exactly where the kill was made, so those it has wounded can be tracked and pressed by Marrow and its sworn kin while the wounds are fresh. It never loses a wounded target's trail." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] trait declined: "Black Fletching Trail" — bound only on the idea's own words (track:idea, tracks:idea, tracking:idea, trail:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Stiletto = dagger; Longbow = longbow
[reskin] weapon declared: "Stiletto" is a dagger — the call's own answer
[reskin] weapon table: "Longbow" — a launcher, never thrown, range 150/600
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Scout's
[reskin] print canon attack: "Stiletto" -> "Shortsword" — the Scout's own row
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Scout's
[reskin] audit rename: "Blackfletch Mark" -> "Black Mark"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

